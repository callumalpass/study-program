import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  evaluateWrittenExercise,
  evaluateCodeExercise,
  validateGeminiApiKey,
  generatePracticeQuestion,
  evaluateProject,
  type EvaluationResult,
  type ProjectFile,
} from '../src/utils/gemini-eval';
import type { QuizQuestion, Project, RubricCriterion } from '../src/core/types';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// Helper to create a successful Gemini API response
function createGeminiResponse(content: object): Response {
  return new Response(
    JSON.stringify({
      candidates: [
        {
          content: {
            parts: [{ text: JSON.stringify(content) }],
          },
        },
      ],
    }),
    { status: 200 }
  );
}

// Helper to create an error response
function createErrorResponse(status: number, message: string): Response {
  return new Response(message, { status });
}

describe('Gemini API URL configuration', () => {
  it('uses the correct Gemini model (gemini-1.5-pro)', async () => {
    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        passed: true,
        score: 80,
        feedback: 'Good',
        strengths: [],
        improvements: [],
      })
    );

    await evaluateWrittenExercise('test-key', 'problem', 'solution', 'answer');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('gemini-1.5-pro'),
      expect.any(Object)
    );
  });
});

describe('evaluateWrittenExercise', () => {
  const apiKey = 'test-api-key';
  const problem = 'Explain the difference between a stack and a queue.';
  const referenceSolution = 'A stack is LIFO, a queue is FIFO.';
  const studentAnswer = 'Stack: last in first out. Queue: first in first out.';

  it('returns evaluation result for valid response', async () => {
    const mockResult: EvaluationResult = {
      passed: true,
      score: 85,
      feedback: 'Good understanding of both data structures.',
      strengths: ['Correct terminology', 'Clear explanation'],
      improvements: ['Could add examples'],
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateWrittenExercise(apiKey, problem, referenceSolution, studentAnswer);

    expect(result).toEqual(mockResult);
    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('generativelanguage.googleapis.com'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'x-goog-api-key': apiKey,
        }),
      })
    );
  });

  it('clamps score to valid range (0-100)', async () => {
    const mockResult = {
      passed: true,
      score: 150, // Invalid: above 100
      feedback: 'Excellent work',
      strengths: [],
      improvements: [],
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateWrittenExercise(apiKey, problem, referenceSolution, studentAnswer);
    expect(result.score).toBe(100);
  });

  it('clamps negative scores to 0', async () => {
    const mockResult = {
      passed: false,
      score: -10, // Invalid: below 0
      feedback: 'Needs improvement',
      strengths: [],
      improvements: [],
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateWrittenExercise(apiKey, problem, referenceSolution, studentAnswer);
    expect(result.score).toBe(0);
  });

  it('provides defaults for missing fields', async () => {
    const mockResult = {
      // Missing passed, score, feedback, strengths, improvements
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateWrittenExercise(apiKey, problem, referenceSolution, studentAnswer);

    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
    expect(result.feedback).toBe('Unable to evaluate.');
    expect(result.strengths).toEqual([]);
    expect(result.improvements).toEqual([]);
  });

  it('throws error on API failure', async () => {
    mockFetch.mockResolvedValueOnce(createErrorResponse(401, 'Invalid API key'));

    await expect(
      evaluateWrittenExercise(apiKey, problem, referenceSolution, studentAnswer)
    ).rejects.toThrow('Gemini API error: 401 - Invalid API key');
  });

  it('throws error when response has no text content', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [{ content: { parts: [] } }],
        }),
        { status: 200 }
      )
    );

    await expect(
      evaluateWrittenExercise(apiKey, problem, referenceSolution, studentAnswer)
    ).rejects.toThrow('No text content in Gemini response');
  });

  it('throws error when response is not valid JSON', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [{ text: 'This is not JSON' }],
              },
            },
          ],
        }),
        { status: 200 }
      )
    );

    await expect(
      evaluateWrittenExercise(apiKey, problem, referenceSolution, studentAnswer)
    ).rejects.toThrow('Failed to parse Gemini evaluation response');
  });

  it('sends correct prompt structure in request body', async () => {
    const mockResult: EvaluationResult = {
      passed: true,
      score: 80,
      feedback: 'Good',
      strengths: [],
      improvements: [],
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    await evaluateWrittenExercise(apiKey, problem, referenceSolution, studentAnswer);

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.contents[0].parts[0].text).toContain(problem);
    expect(requestBody.contents[0].parts[0].text).toContain(referenceSolution);
    expect(requestBody.contents[0].parts[0].text).toContain(studentAnswer);
    expect(requestBody.generationConfig.responseMimeType).toBe('application/json');
  });
});

describe('evaluateCodeExercise', () => {
  const apiKey = 'test-api-key';
  const problem = 'Write a function that returns the sum of two numbers.';
  const referenceSolution = 'def add(a, b):\n    return a + b';
  const studentCode = 'def add(x, y):\n    return x + y';
  const language = 'python';

  it('returns evaluation result for valid response', async () => {
    const mockResult: EvaluationResult = {
      passed: true,
      score: 95,
      feedback: 'Correct implementation.',
      strengths: ['Clear variable names', 'Correct logic'],
      improvements: [],
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, language);

    expect(result).toEqual(mockResult);
  });

  it('includes language in the request', async () => {
    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        passed: true,
        score: 80,
        feedback: 'Good',
        strengths: [],
        improvements: [],
      })
    );

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, language);

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.contents[0].parts[0].text).toContain('python');
  });

  it('includes C-specific notes for C language', async () => {
    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        passed: true,
        score: 80,
        feedback: 'Good',
        strengths: [],
        improvements: [],
      })
    );

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'c');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.contents[0].parts[0].text).toContain('Memory Management');
  });

  it('includes C++ notes for cpp language', async () => {
    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        passed: true,
        score: 80,
        feedback: 'Good',
        strengths: [],
        improvements: [],
      })
    );

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'cpp');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.contents[0].parts[0].text).toContain('Memory Management');
  });

  it('includes Python-specific notes', async () => {
    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        passed: true,
        score: 80,
        feedback: 'Good',
        strengths: [],
        improvements: [],
      })
    );

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'python');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.contents[0].parts[0].text).toContain('Pythonic');
  });

  it('includes JavaScript/TypeScript notes', async () => {
    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        passed: true,
        score: 80,
        feedback: 'Good',
        strengths: [],
        improvements: [],
      })
    );

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'javascript');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.contents[0].parts[0].text).toContain('ES6+');
  });

  it('throws error on API failure', async () => {
    mockFetch.mockResolvedValueOnce(createErrorResponse(500, 'Server error'));

    await expect(
      evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, language)
    ).rejects.toThrow('Gemini API error: 500 - Server error');
  });

  it('throws error when response is invalid JSON', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [{ text: 'invalid json {{{' }],
              },
            },
          ],
        }),
        { status: 200 }
      )
    );

    await expect(
      evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, language)
    ).rejects.toThrow('Failed to parse Gemini code evaluation response');
  });
});

describe('validateGeminiApiKey', () => {
  it('returns true for valid API key', async () => {
    mockFetch.mockResolvedValueOnce(new Response('{}', { status: 200 }));

    const result = await validateGeminiApiKey('valid-key');

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('generativelanguage.googleapis.com'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'x-goog-api-key': 'valid-key',
        }),
      })
    );
  });

  it('returns false for invalid API key', async () => {
    mockFetch.mockResolvedValueOnce(new Response('Unauthorized', { status: 401 }));

    const result = await validateGeminiApiKey('invalid-key');

    expect(result).toBe(false);
  });

  it('returns false when fetch throws', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await validateGeminiApiKey('any-key');

    expect(result).toBe(false);
  });

  it('sends minimal validation request', async () => {
    mockFetch.mockResolvedValueOnce(new Response('{}', { status: 200 }));

    await validateGeminiApiKey('test-key');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.contents[0].parts[0].text).toBe('Hello');
    expect(requestBody.generationConfig.maxOutputTokens).toBe(10);
  });
});

describe('generatePracticeQuestion', () => {
  const apiKey = 'test-api-key';
  const subjectContext = 'Introduction to Algorithms';

  const originalQuestion: QuizQuestion = {
    id: 'q1',
    type: 'multiple_choice',
    prompt: 'What is the time complexity of binary search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    correctAnswer: 1,
    explanation: 'Binary search halves the search space each time.',
  };

  it('returns generated practice question', async () => {
    const mockQuestion = {
      type: 'multiple_choice',
      prompt: 'What is the time complexity of linear search?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      correctAnswer: 2,
      explanation: 'Linear search checks each element once.',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockQuestion));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.type).toBe('multiple_choice');
    expect(result.prompt).toBe(mockQuestion.prompt);
    expect(result.correctAnswer).toBe(2);
    expect(result.id).toMatch(/^practice-\d+$/);
  });

  it('uses original type if not provided in response', async () => {
    const mockQuestion = {
      prompt: 'What is the time complexity of merge sort?',
      correctAnswer: 1,
      explanation: 'Merge sort is O(n log n).',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockQuestion));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.type).toBe('multiple_choice'); // Falls back to original type
  });

  it('includes previous questions to avoid repetition', async () => {
    const previousQuestions: QuizQuestion[] = [
      {
        id: 'prev-1',
        type: 'multiple_choice',
        prompt: 'Previous question?',
        correctAnswer: 0,
        explanation: 'Previous explanation',
      },
    ];

    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        type: 'multiple_choice',
        prompt: 'New unique question?',
        correctAnswer: 1,
        explanation: 'New explanation',
      })
    );

    await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, previousQuestions);

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(requestBody.contents[0].parts[0].text).toContain('Previously Generated Questions');
    expect(requestBody.contents[0].parts[0].text).toContain('Previous question?');
  });

  it('handles true_false question type', async () => {
    const tfQuestion: QuizQuestion = {
      id: 'tf1',
      type: 'true_false',
      prompt: 'A binary tree can have at most two children per node.',
      correctAnswer: true,
      explanation: 'By definition.',
    };

    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        type: 'true_false',
        prompt: 'A linked list provides O(1) access to elements.',
        correctAnswer: false,
        explanation: 'Linked lists require traversal.',
      })
    );

    const result = await generatePracticeQuestion(apiKey, tfQuestion, subjectContext, []);

    expect(result.type).toBe('true_false');
    expect(result.correctAnswer).toBe(false);
  });

  it('handles coding question type with all fields', async () => {
    const codingQuestion: QuizQuestion = {
      id: 'code1',
      type: 'coding',
      prompt: 'Write a function to reverse a string.',
      correctAnswer: 'def reverse(s): return s[::-1]',
      explanation: 'Uses Python slicing.',
      starterCode: 'def reverse(s):\n    pass',
      testCases: [{ input: 'hello', expectedOutput: 'olleh', isHidden: false, description: 'Basic test' }],
      language: 'python',
      solution: 'def reverse(s): return s[::-1]',
    };

    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        type: 'coding',
        prompt: 'Write a function to check if string is palindrome.',
        correctAnswer: 'def is_palindrome(s): return s == s[::-1]',
        explanation: 'Compare with reversed.',
        starterCode: 'def is_palindrome(s):\n    pass',
        testCases: [{ input: 'radar', expectedOutput: 'True', isHidden: false, description: 'Palindrome test' }],
        language: 'python',
        solution: 'def is_palindrome(s): return s == s[::-1]',
      })
    );

    const result = await generatePracticeQuestion(apiKey, codingQuestion, subjectContext, []);

    expect(result.type).toBe('coding');
    expect(result.starterCode).toContain('is_palindrome');
    expect(result.testCases).toHaveLength(1);
    expect(result.language).toBe('python');
  });

  it('throws error on API failure', async () => {
    mockFetch.mockResolvedValueOnce(createErrorResponse(403, 'Forbidden'));

    await expect(
      generatePracticeQuestion(apiKey, originalQuestion, subjectContext, [])
    ).rejects.toThrow('Gemini API error: 403 - Forbidden');
  });

  it('throws error when response is not valid JSON', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [{ content: { parts: [{ text: 'not valid json' }] } }],
        }),
        { status: 200 }
      )
    );

    await expect(
      generatePracticeQuestion(apiKey, originalQuestion, subjectContext, [])
    ).rejects.toThrow('Failed to parse practice question response');
  });

  it('handles empty prompt gracefully', async () => {
    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        type: 'multiple_choice',
        correctAnswer: 0,
        explanation: 'Some explanation',
      })
    );

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.prompt).toBe('');
  });
});

describe('evaluateProject', () => {
  const apiKey = 'test-api-key';

  const rubric: RubricCriterion[] = [
    {
      name: 'Code Quality',
      weight: 50,
      levels: [
        { score: 100, label: 'Excellent', description: 'Clean, well-documented code' },
        { score: 70, label: 'Good', description: 'Mostly clean code' },
        { score: 40, label: 'Fair', description: 'Some issues' },
      ],
    },
    {
      name: 'Functionality',
      weight: 50,
      levels: [
        { score: 100, label: 'Complete', description: 'All features working' },
        { score: 70, label: 'Partial', description: 'Most features working' },
        { score: 40, label: 'Incomplete', description: 'Few features working' },
      ],
    },
  ];

  const project: Project = {
    id: 'proj1',
    subjectId: 'cs101',
    title: 'Calculator App',
    description: 'Build a simple calculator',
    requirements: ['Addition', 'Subtraction', 'Error handling'],
    rubric,
    estimatedHours: 5,
  };

  const files: ProjectFile[] = [
    { name: 'main.py', content: 'def add(a, b): return a + b' },
    { name: 'test.py', content: 'assert add(1, 2) == 3' },
  ];

  it('returns project evaluation with weighted score', async () => {
    const mockResult = {
      rubricScores: {
        'Code Quality': { score: 80, level: 'Good', justification: 'Clean code' },
        'Functionality': { score: 90, level: 'Complete', justification: 'All tests pass' },
      },
      feedback: 'Well done overall.',
      strengths: ['Good structure', 'Good tests'],
      improvements: ['Add more comments'],
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateProject(apiKey, project, files);

    // Weighted score: 80 * 0.5 + 90 * 0.5 = 85
    expect(result.score).toBe(85);
    expect(result.feedback).toBe('Well done overall.');
    expect(result.rubricScores['Code Quality'].score).toBe(80);
    expect(result.rubricScores['Functionality'].score).toBe(90);
    expect(result.strengths).toEqual(['Good structure', 'Good tests']);
    expect(result.improvements).toEqual(['Add more comments']);
  });

  it('handles missing rubric scores gracefully', async () => {
    const mockResult = {
      rubricScores: {
        'Code Quality': { score: 70, level: 'Good', justification: 'Okay' },
        // Missing 'Functionality'
      },
      feedback: 'Incomplete evaluation.',
      strengths: [],
      improvements: [],
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateProject(apiKey, project, files);

    // Only Code Quality counted: 70 * 0.5 = 35
    expect(result.score).toBe(35);
  });

  it('handles missing fields in criterion result', async () => {
    const mockResult = {
      rubricScores: {
        'Code Quality': {}, // Empty object
        'Functionality': { score: 80 }, // Missing level and justification
      },
      feedback: 'Partial evaluation.',
      strengths: [],
      improvements: [],
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateProject(apiKey, project, files);

    expect(result.rubricScores['Code Quality'].score).toBe(0);
    expect(result.rubricScores['Code Quality'].level).toBe('Unknown');
    expect(result.rubricScores['Code Quality'].justification).toBe('');
    expect(result.rubricScores['Functionality'].level).toBe('Unknown');
  });

  it('rounds weighted score to nearest integer', async () => {
    const mockResult = {
      rubricScores: {
        'Code Quality': { score: 73, level: 'Good', justification: '' },
        'Functionality': { score: 88, level: 'Complete', justification: '' },
      },
      feedback: 'Good work.',
      strengths: [],
      improvements: [],
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateProject(apiKey, project, files);

    // Weighted: 73 * 0.5 + 88 * 0.5 = 36.5 + 44 = 80.5 -> 81
    expect(result.score).toBe(81);
  });

  it('includes file contents in prompt', async () => {
    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        rubricScores: {},
        feedback: '',
        strengths: [],
        improvements: [],
      })
    );

    await evaluateProject(apiKey, project, files);

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    expect(prompt).toContain('FILE: main.py');
    expect(prompt).toContain('def add(a, b)');
    expect(prompt).toContain('FILE: test.py');
    expect(prompt).toContain('assert add(1, 2)');
  });

  it('includes project requirements in prompt', async () => {
    mockFetch.mockResolvedValueOnce(
      createGeminiResponse({
        rubricScores: {},
        feedback: '',
        strengths: [],
        improvements: [],
      })
    );

    await evaluateProject(apiKey, project, files);

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    expect(prompt).toContain('1. Addition');
    expect(prompt).toContain('2. Subtraction');
    expect(prompt).toContain('3. Error handling');
  });

  it('throws error on API failure', async () => {
    mockFetch.mockResolvedValueOnce(createErrorResponse(429, 'Rate limited'));

    await expect(evaluateProject(apiKey, project, files)).rejects.toThrow(
      'Gemini API error: 429 - Rate limited'
    );
  });

  it('throws error when response is not valid JSON', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [{ content: { parts: [{ text: 'invalid json' }] } }],
        }),
        { status: 200 }
      )
    );

    await expect(evaluateProject(apiKey, project, files)).rejects.toThrow(
      'Failed to parse project evaluation response'
    );
  });

  it('provides defaults for missing feedback fields', async () => {
    const mockResult = {
      rubricScores: {},
      // Missing feedback, strengths, improvements
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockResult));

    const result = await evaluateProject(apiKey, project, files);

    expect(result.feedback).toBe('Unable to generate feedback.');
    expect(result.strengths).toEqual([]);
    expect(result.improvements).toEqual([]);
  });
});

describe('edge cases and error handling', () => {
  it('handles empty candidates array', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ candidates: [] }), { status: 200 })
    );

    await expect(
      evaluateWrittenExercise('key', 'problem', 'solution', 'answer')
    ).rejects.toThrow('No text content in Gemini response');
  });

  it('handles null candidates', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ candidates: null }), { status: 200 })
    );

    await expect(
      evaluateWrittenExercise('key', 'problem', 'solution', 'answer')
    ).rejects.toThrow('No text content in Gemini response');
  });

  it('handles undefined content parts', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [{ content: { parts: undefined } }],
        }),
        { status: 200 }
      )
    );

    await expect(
      evaluateWrittenExercise('key', 'problem', 'solution', 'answer')
    ).rejects.toThrow('No text content in Gemini response');
  });

  it('finds text part among non-text parts', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  { inlineData: 'some data' },
                  { text: JSON.stringify({ passed: true, score: 75, feedback: 'OK', strengths: [], improvements: [] }) },
                ],
              },
            },
          ],
        }),
        { status: 200 }
      )
    );

    const result = await evaluateWrittenExercise('key', 'problem', 'solution', 'answer');
    expect(result.passed).toBe(true);
    expect(result.score).toBe(75);
  });

  it('handles network errors gracefully in validateGeminiApiKey', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    const result = await validateGeminiApiKey('test-key');
    expect(result).toBe(false);
  });
});
