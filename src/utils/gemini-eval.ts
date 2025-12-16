// Gemini AI evaluation service for written exercises and projects

import type { QuizQuestion, Project, ProjectAiEvaluation } from '@/core/types';

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

/**
 * Generate a practice question based on an original exam question
 */
export async function generatePracticeQuestion(
  apiKey: string,
  originalQuestion: QuizQuestion,
  subjectContext: string,
  previousQuestions: QuizQuestion[]
): Promise<QuizQuestion> {
  const prompt = buildPracticeQuestionPrompt(originalQuestion, subjectContext, previousQuestions);

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

  const textContent = data.candidates?.[0]?.content?.parts?.find(
    (part: { text?: string }) => part.text
  )?.text;

  if (!textContent) {
    throw new Error('No text content in Gemini response');
  }

  try {
    const result = JSON.parse(textContent) as QuizQuestion;
    // Ensure required fields are present
    return {
      id: `practice-${Date.now()}`,
      type: result.type || originalQuestion.type,
      prompt: result.prompt || '',
      correctAnswer: result.correctAnswer,
      explanation: result.explanation || '',
      options: result.options,
      codeSnippet: result.codeSnippet,
      starterCode: result.starterCode,
      testCases: result.testCases,
      language: result.language,
      solution: result.solution,
      modelAnswer: result.modelAnswer,
    };
  } catch {
    throw new Error('Failed to parse practice question response');
  }
}

/**
 * Build the prompt for generating a practice question
 */
function buildPracticeQuestionPrompt(
  originalQuestion: QuizQuestion,
  subjectContext: string,
  previousQuestions: QuizQuestion[]
): string {
  const typeSpecificInstructions = getTypeSpecificInstructions(originalQuestion.type);

  const previousQuestionsSection = previousQuestions.length > 0
    ? `
## Previously Generated Questions (avoid repetition)
${JSON.stringify(previousQuestions.map(q => ({ prompt: q.prompt, correctAnswer: q.correctAnswer })), null, 2)}

IMPORTANT: Generate a question that is different from all the questions listed above. Use different values, scenarios, or examples.`
    : '';

  return `You are generating a practice question for a computer science student. Create a question similar in style and difficulty to the original, but with different specific content.

## Subject Context
${subjectContext}

## Original Question
${JSON.stringify(originalQuestion, null, 2)}
${previousQuestionsSection}

## Requirements
- Question type must be: ${originalQuestion.type}
- Similar difficulty level to the original
- Different specific values, examples, or scenarios
- The question must have a clear, unambiguous correct answer
${typeSpecificInstructions}

## Response Format
Return a JSON object with these fields:
{
  "type": "${originalQuestion.type}",
  "prompt": "The question text",
  "correctAnswer": <correct answer - type depends on question type>,
  "explanation": "Clear explanation of why this is correct"${getTypeSpecificFields(originalQuestion.type)}
}

## Important Notes
- For multiple_choice: correctAnswer is the 0-based index of the correct option
- For true_false: correctAnswer is boolean (true or false)
- For fill_blank and code_output: correctAnswer is a string (case-insensitive matching will be used)
- For coding: provide working Python code with test cases that will actually pass
- For written: provide a comprehensive modelAnswer for AI evaluation

Return ONLY the JSON object, no other text.`;
}

/**
 * Get type-specific instructions for the prompt
 */
function getTypeSpecificInstructions(type: string): string {
  switch (type) {
    case 'multiple_choice':
      return '- Provide exactly 4 options\n- Ensure only one option is correct\n- Make distractors plausible but clearly wrong';
    case 'true_false':
      return '- Create a statement that is clearly true or false\n- Avoid ambiguous phrasing';
    case 'fill_blank':
      return '- The blank should have a single, clear answer\n- Use ____ to indicate where the blank goes in the prompt';
    case 'code_output':
      return '- Provide a Python code snippet that produces a specific output\n- The code must be valid and runnable\n- The expected output should be exactly what print() would produce';
    case 'coding':
      return '- Provide starterCode with a function signature\n- Provide testCases array with input, expectedOutput, isHidden, and description\n- Provide a working solution\n- Ensure the test cases actually work with the solution';
    case 'written':
      return '- Create a conceptual or theoretical question\n- Provide a comprehensive modelAnswer that covers all key points\n- The question should test understanding, not just recall';
    default:
      return '';
  }
}

/**
 * Get type-specific fields for the response format
 */
function getTypeSpecificFields(type: string): string {
  switch (type) {
    case 'multiple_choice':
      return ',\n  "options": ["option1", "option2", "option3", "option4"]';
    case 'code_output':
      return ',\n  "codeSnippet": "python code here"';
    case 'coding':
      return `,
  "starterCode": "def function_name(params):\\n    # Your code here\\n    pass",
  "testCases": [
    {"input": "test input", "expectedOutput": "expected output", "isHidden": false, "description": "Test description"}
  ],
  "solution": "working solution code",
  "language": "python"`;
    case 'written':
      return ',\n  "modelAnswer": "comprehensive model answer for evaluation"';
    default:
      return '';
  }
}

/**
 * Represents a file uploaded for project evaluation
 */
export interface ProjectFile {
  name: string;
  content: string;
}

/**
 * Evaluate a project submission using Gemini AI
 */
export async function evaluateProject(
  apiKey: string,
  project: Project,
  files: ProjectFile[]
): Promise<ProjectAiEvaluation> {
  const prompt = buildProjectEvaluationPrompt(project, files);

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

  const textContent = data.candidates?.[0]?.content?.parts?.find(
    (part: { text?: string }) => part.text
  )?.text;

  if (!textContent) {
    throw new Error('No text content in Gemini response');
  }

  try {
    const result = JSON.parse(textContent);

    // Calculate weighted overall score from rubric scores
    let weightedScore = 0;
    const rubricScores: ProjectAiEvaluation['rubricScores'] = {};

    for (const criterion of project.rubric) {
      const criterionResult = result.rubricScores?.[criterion.name];
      if (criterionResult) {
        rubricScores[criterion.name] = {
          score: criterionResult.score ?? 0,
          level: criterionResult.level ?? 'Unknown',
          justification: criterionResult.justification ?? '',
        };
        weightedScore += (criterionResult.score ?? 0) * (criterion.weight / 100);
      }
    }

    return {
      score: Math.round(weightedScore),
      feedback: result.feedback ?? 'Unable to generate feedback.',
      rubricScores,
      strengths: result.strengths ?? [],
      improvements: result.improvements ?? [],
    };
  } catch {
    throw new Error('Failed to parse project evaluation response');
  }
}

/**
 * Build the prompt for project evaluation
 */
function buildProjectEvaluationPrompt(project: Project, files: ProjectFile[]): string {
  const rubricSection = project.rubric.map(criterion => {
    const levelsDescription = criterion.levels
      .map(level => `  - ${level.label} (${level.score}): ${level.description}`)
      .join('\n');
    return `**${criterion.name}** (Weight: ${criterion.weight}%)\n${levelsDescription}`;
  }).join('\n\n');

  const filesSection = files.map(file =>
    `=== FILE: ${file.name} ===\n${file.content}`
  ).join('\n\n');

  const rubricScoresFormat = project.rubric.map(criterion =>
    `    "${criterion.name}": { "score": <0-100>, "level": "<level label>", "justification": "<specific feedback>" }`
  ).join(',\n');

  return `You are evaluating a student programming project. Assess the submitted code against the provided rubric.

## Project: ${project.title}

### Description
${project.description}

### Requirements
${project.requirements.map((req, i) => `${i + 1}. ${req}`).join('\n')}

### Rubric
${rubricSection}

## Submitted Files

${filesSection}

## Instructions

Evaluate the project against each rubric criterion. For each criterion:
1. Review the code and determine which rubric level best describes the submission
2. Assign a score (0-100) based on the rubric levels
3. Provide specific justification referencing the actual code

Be fair but thorough. Look for:
- Code correctness and functionality
- Code quality, organization, and style
- Completeness relative to requirements
- Best practices and documentation

## Response Format

Return your evaluation as JSON in this exact format:
{
  "rubricScores": {
${rubricScoresFormat}
  },
  "feedback": "Overall assessment in 2-3 sentences summarizing the submission quality",
  "strengths": ["specific strength 1", "specific strength 2"],
  "improvements": ["specific suggestion 1", "specific suggestion 2"]
}

## Scoring Guidelines
- 90-100: Excellent - exceeds expectations, professional quality
- 70-89: Good - meets requirements with minor issues
- 50-69: Satisfactory - partially meets requirements, notable gaps
- Below 50: Needs improvement - significant issues or missing requirements

Return ONLY the JSON object, no other text.`;
}
