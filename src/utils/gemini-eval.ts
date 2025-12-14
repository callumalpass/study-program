// Gemini AI evaluation service for written exercises

export interface EvaluationResult {
  passed: boolean;
  score: number; // 0-100
  feedback: string;
  strengths: string[];
  improvements: string[];
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent';

/**
 * Evaluate a written exercise submission using Gemini AI
 */
export async function evaluateWrittenExercise(
  apiKey: string,
  problem: string,
  referenceSolution: string,
  studentAnswer: string
): Promise<EvaluationResult> {
  const prompt = buildEvaluationPrompt(problem, referenceSolution, studentAnswer);

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        thinkingConfig: { thinkingLevel: 'high' },
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  // Extract the text content from Gemini's response
  const textContent = data.candidates?.[0]?.content?.parts?.find(
    (part: { text?: string }) => part.text
  )?.text;

  if (!textContent) {
    throw new Error('No text content in Gemini response');
  }

  // Parse the JSON response
  try {
    const result = JSON.parse(textContent) as EvaluationResult;
    return {
      passed: result.passed ?? false,
      score: Math.max(0, Math.min(100, result.score ?? 0)),
      feedback: result.feedback ?? 'Unable to evaluate.',
      strengths: result.strengths ?? [],
      improvements: result.improvements ?? [],
    };
  } catch {
    throw new Error('Failed to parse Gemini evaluation response');
  }
}

/**
 * Build the evaluation prompt
 */
function buildEvaluationPrompt(
  problem: string,
  referenceSolution: string,
  studentAnswer: string
): string {
  return `You are evaluating a student's written answer to an academic question in computer science, mathematics, or a related technical field.

## Question
${problem}

## Model Answer
${referenceSolution}

## Student's Answer
${studentAnswer}

## Evaluation Criteria
Evaluate the student's answer for:
1. **Correctness**: Is the answer accurate? For math: is the logic/reasoning valid? For CS: are technical concepts correct?
2. **Completeness**: Does it address all parts of the question? Are key steps or points covered?
3. **Clarity**: Is the explanation or proof well-structured and easy to follow?

The student does NOT need to match the model answer exactly. Accept:
- Alternative valid proofs or approaches
- Different but equivalent notation or terminology
- Correct examples not in the model answer
- Valid reasoning that reaches the same conclusion differently

## Response Format
Return your evaluation as JSON in this exact format:
{
  "passed": boolean,
  "score": number (0-100),
  "feedback": "Overall assessment in 2-3 sentences",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["suggestion 1", "suggestion 2"]
}

## Scoring Guidelines
- 90-100: Excellent - comprehensive, accurate, well-explained
- 70-89: Good - correct with minor gaps or clarity issues (passing)
- 50-69: Partial - some correct elements but significant gaps
- Below 50: Insufficient - major errors or missing key concepts

A passing score (70+) requires the core concept or proof to be correct. Minor notation differences, stylistic variations, or missing optional details should not cause failure.

Return ONLY the JSON object, no other text.`;
}

/**
 * Validate that a Gemini API key works
 */
export async function validateGeminiApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Hello' }] }],
        generationConfig: {
          maxOutputTokens: 10,
        },
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
