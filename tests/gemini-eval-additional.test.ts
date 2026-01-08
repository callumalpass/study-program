/**
 * Additional tests for Gemini evaluation utilities
 *
 * These tests focus on edge cases, boundary conditions, and additional
 * scenarios not covered in the main test file.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  evaluateWrittenExercise,
  evaluateCodeExercise,
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

describe('evaluateCodeExercise language-specific notes', () => {
  const apiKey = 'test-api-key';
  const problem = 'Write a function to sum two numbers';
  const referenceSolution = 'def add(a, b): return a + b';
  const studentCode = 'def add(x, y): return x + y';

  const mockSuccessResult: EvaluationResult = {
    passed: true,
    score: 85,
    feedback: 'Good work',
    strengths: ['Correct logic'],
    improvements: [],
  };

  it('includes memory management notes for C language', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockSuccessResult));

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'c');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    expect(prompt).toContain('Memory Management');
    expect(prompt).toContain('memory leaks');
  });

  it('includes memory management notes for C++ language', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockSuccessResult));

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'c++');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    expect(prompt).toContain('Memory Management');
  });

  it('includes memory management notes for CPP language variant', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockSuccessResult));

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'CPP');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    expect(prompt).toContain('Memory Management');
  });

  it('includes Pythonic notes for Python language', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockSuccessResult));

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'Python');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    expect(prompt).toContain('Pythonic');
    expect(prompt).toContain('Idiomatic Python');
  });

  it('includes ES6+ notes for JavaScript language', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockSuccessResult));

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'JavaScript');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    expect(prompt).toContain('ES6+');
    expect(prompt).toContain('Modern Syntax');
  });

  it('includes ES6+ notes for TypeScript language', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockSuccessResult));

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'TypeScript');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    expect(prompt).toContain('ES6+');
  });

  it('includes no language-specific notes for unknown languages like Java', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockSuccessResult));

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, 'java');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    // Should NOT contain language-specific notes for Java
    expect(prompt).not.toContain('Memory Management');
    expect(prompt).not.toContain('Pythonic');
    expect(prompt).not.toContain('ES6+');
  });

  it('handles empty language string', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse(mockSuccessResult));

    await evaluateCodeExercise(apiKey, problem, referenceSolution, studentCode, '');

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;
    // Should not crash and should not include language-specific notes
    expect(prompt).not.toContain('Memory Management');
    expect(prompt).not.toContain('Pythonic');
    expect(prompt).not.toContain('ES6+');
  });
});

describe('evaluateWrittenExercise score boundary conditions', () => {
  const apiKey = 'test-api-key';
  const problem = 'Explain Big-O notation';
  const solution = 'Big-O describes algorithm complexity';
  const answer = 'Big-O measures time complexity';

  it('clamps extremely high scores to 100', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      passed: true,
      score: 500,
      feedback: 'Good',
      strengths: [],
      improvements: [],
    }));

    const result = await evaluateWrittenExercise(apiKey, problem, solution, answer);
    expect(result.score).toBe(100);
  });

  it('clamps extremely negative scores to 0', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      passed: false,
      score: -100,
      feedback: 'Needs work',
      strengths: [],
      improvements: [],
    }));

    const result = await evaluateWrittenExercise(apiKey, problem, solution, answer);
    expect(result.score).toBe(0);
  });

  it('handles score at exactly 0', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      passed: false,
      score: 0,
      feedback: 'Incomplete',
      strengths: [],
      improvements: [],
    }));

    const result = await evaluateWrittenExercise(apiKey, problem, solution, answer);
    expect(result.score).toBe(0);
  });

  it('handles score at exactly 100', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      passed: true,
      score: 100,
      feedback: 'Perfect',
      strengths: ['All correct'],
      improvements: [],
    }));

    const result = await evaluateWrittenExercise(apiKey, problem, solution, answer);
    expect(result.score).toBe(100);
  });

  it('handles float scores by preserving them within bounds', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      passed: true,
      score: 85.7,
      feedback: 'Good work',
      strengths: [],
      improvements: [],
    }));

    const result = await evaluateWrittenExercise(apiKey, problem, solution, answer);
    expect(result.score).toBe(85.7);
  });

  it('handles NaN score by defaulting to 0', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      passed: false,
      score: NaN,
      feedback: 'Error',
      strengths: [],
      improvements: [],
    }));

    const result = await evaluateWrittenExercise(apiKey, problem, solution, answer);
    // NaN comparisons: Math.min(100, NaN) = NaN, Math.max(0, NaN) = NaN
    // Due to how the code handles this, score defaults to 0 via ?? 0
    expect(result.score).toBe(0);
  });
});

describe('generatePracticeQuestion with various question types', () => {
  const apiKey = 'test-api-key';
  const subjectContext = 'Data Structures and Algorithms';

  it('generates multiple choice question with options', async () => {
    const originalQuestion: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is the time complexity of binary search?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      correctAnswer: 1,
      explanation: 'Binary search halves the search space.',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      type: 'multiple_choice',
      prompt: 'What is the space complexity of merge sort?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      correctAnswer: 2,
      explanation: 'Merge sort uses O(n) auxiliary space.',
    }));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.type).toBe('multiple_choice');
    expect(result.options).toHaveLength(4);
    expect(result.correctAnswer).toBe(2);
    expect(result.id).toMatch(/^practice-\d+$/);
  });

  it('generates true_false question', async () => {
    const originalQuestion: QuizQuestion = {
      id: 'tf1',
      type: 'true_false',
      prompt: 'Arrays have O(1) access time.',
      correctAnswer: true,
      explanation: 'Arrays use index-based access.',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      type: 'true_false',
      prompt: 'Linked lists have O(1) access time.',
      correctAnswer: false,
      explanation: 'Linked lists require traversal.',
    }));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.type).toBe('true_false');
    expect(result.correctAnswer).toBe(false);
  });

  it('generates fill_blank question', async () => {
    const originalQuestion: QuizQuestion = {
      id: 'fb1',
      type: 'fill_blank',
      prompt: 'The time complexity of bubble sort is O(____)',
      correctAnswer: 'n^2',
      explanation: 'Bubble sort has nested loops.',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      type: 'fill_blank',
      prompt: 'The time complexity of insertion sort is O(____)',
      correctAnswer: 'n^2',
      explanation: 'Insertion sort has nested loops.',
    }));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.type).toBe('fill_blank');
    expect(result.correctAnswer).toBe('n^2');
  });

  it('generates code_output question with codeSnippet', async () => {
    const originalQuestion: QuizQuestion = {
      id: 'co1',
      type: 'code_output',
      prompt: 'What is the output?',
      codeSnippet: 'print(1 + 2)',
      correctAnswer: '3',
      explanation: 'Simple addition.',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      type: 'code_output',
      prompt: 'What is the output of this code?',
      codeSnippet: 'print(5 * 3)',
      correctAnswer: '15',
      explanation: 'Simple multiplication.',
    }));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.type).toBe('code_output');
    expect(result.codeSnippet).toBe('print(5 * 3)');
    expect(result.correctAnswer).toBe('15');
  });

  it('generates coding question with testCases and solution', async () => {
    const originalQuestion: QuizQuestion = {
      id: 'coding1',
      type: 'coding',
      prompt: 'Write a function to reverse a string.',
      correctAnswer: 'def reverse(s): return s[::-1]',
      explanation: 'Uses slicing.',
      starterCode: 'def reverse(s):\n    pass',
      testCases: [{ input: '"hello"', expectedOutput: '"olleh"', isHidden: false, description: 'Basic test' }],
      language: 'python',
      solution: 'def reverse(s): return s[::-1]',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      type: 'coding',
      prompt: 'Write a function to check if a string is a palindrome.',
      correctAnswer: 'def is_palindrome(s): return s == s[::-1]',
      explanation: 'Compares string with its reverse.',
      starterCode: 'def is_palindrome(s):\n    pass',
      testCases: [{ input: '"radar"', expectedOutput: 'True', isHidden: false, description: 'Palindrome test' }],
      language: 'python',
      solution: 'def is_palindrome(s): return s == s[::-1]',
    }));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.type).toBe('coding');
    expect(result.starterCode).toContain('is_palindrome');
    expect(result.testCases).toHaveLength(1);
    expect(result.language).toBe('python');
    expect(result.solution).toContain('is_palindrome');
  });

  it('generates written question with modelAnswer', async () => {
    const originalQuestion: QuizQuestion = {
      id: 'w1',
      type: 'written',
      prompt: 'Explain the difference between a stack and a queue.',
      correctAnswer: '',
      explanation: '',
      modelAnswer: 'A stack is LIFO, a queue is FIFO.',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      type: 'written',
      prompt: 'Explain the difference between a binary tree and a binary search tree.',
      correctAnswer: '',
      explanation: 'BST has ordering property.',
      modelAnswer: 'A BST maintains the ordering property where left < parent < right.',
    }));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.type).toBe('written');
    expect(result.modelAnswer).toContain('BST');
  });

  it('includes previous questions in prompt to avoid repetition', async () => {
    const originalQuestion: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is O(1)?',
      options: ['Constant', 'Linear', 'Quadratic', 'Logarithmic'],
      correctAnswer: 0,
      explanation: 'Constant time.',
    };

    const previousQuestions: QuizQuestion[] = [
      {
        id: 'prev1',
        type: 'multiple_choice',
        prompt: 'What is O(n)?',
        correctAnswer: 1,
        explanation: 'Linear time.',
      },
      {
        id: 'prev2',
        type: 'multiple_choice',
        prompt: 'What is O(log n)?',
        correctAnswer: 3,
        explanation: 'Logarithmic time.',
      },
    ];

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      type: 'multiple_choice',
      prompt: 'What is O(n^2)?',
      options: ['Constant', 'Linear', 'Quadratic', 'Logarithmic'],
      correctAnswer: 2,
      explanation: 'Quadratic time.',
    }));

    await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, previousQuestions);

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;

    expect(prompt).toContain('Previously Generated Questions');
    expect(prompt).toContain('What is O(n)?');
    expect(prompt).toContain('What is O(log n)?');
    expect(prompt).toContain('avoid repetition');
  });

  it('falls back to original type when response type is missing', async () => {
    const originalQuestion: QuizQuestion = {
      id: 'q1',
      type: 'fill_blank',
      prompt: 'The data structure that uses LIFO is ____.',
      correctAnswer: 'stack',
      explanation: 'Stacks are LIFO.',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      // Missing type field
      prompt: 'The data structure that uses FIFO is ____.',
      correctAnswer: 'queue',
      explanation: 'Queues are FIFO.',
    }));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    expect(result.type).toBe('fill_blank');
  });

  it('handles empty correctAnswer in response', async () => {
    const originalQuestion: QuizQuestion = {
      id: 'q1',
      type: 'written',
      prompt: 'Explain recursion.',
      correctAnswer: '',
      explanation: '',
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      type: 'written',
      prompt: 'Explain iteration.',
      correctAnswer: undefined,
      explanation: 'Iteration uses loops.',
    }));

    const result = await generatePracticeQuestion(apiKey, originalQuestion, subjectContext, []);

    // Should not crash and correctAnswer should be undefined
    expect(result.type).toBe('written');
  });
});

describe('evaluateProject with complex rubrics', () => {
  const apiKey = 'test-api-key';

  it('handles project with single rubric criterion', async () => {
    const rubric: RubricCriterion[] = [
      {
        name: 'Functionality',
        weight: 100,
        levels: [
          { score: 100, label: 'Complete', description: 'All features work' },
          { score: 50, label: 'Partial', description: 'Some features work' },
        ],
      },
    ];

    const project: Project = {
      id: 'proj1',
      subjectId: 'cs101',
      title: 'Simple Project',
      description: 'A simple project',
      requirements: ['Feature 1'],
      rubric,
      estimatedHours: 2,
    };

    const files: ProjectFile[] = [
      { name: 'main.py', content: 'print("hello")' },
    ];

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      rubricScores: {
        'Functionality': { score: 80, level: 'Complete', justification: 'Works well' },
      },
      feedback: 'Good.',
      strengths: [],
      improvements: [],
    }));

    const result = await evaluateProject(apiKey, project, files);

    // 80 * 1.0 = 80
    expect(result.score).toBe(80);
  });

  it('handles project with many rubric criteria', async () => {
    const rubric: RubricCriterion[] = [
      { name: 'Code Quality', weight: 25, levels: [{ score: 100, label: 'Excellent', description: '' }] },
      { name: 'Functionality', weight: 25, levels: [{ score: 100, label: 'Complete', description: '' }] },
      { name: 'Documentation', weight: 25, levels: [{ score: 100, label: 'Thorough', description: '' }] },
      { name: 'Testing', weight: 25, levels: [{ score: 100, label: 'Comprehensive', description: '' }] },
    ];

    const project: Project = {
      id: 'proj1',
      subjectId: 'cs101',
      title: 'Complex Project',
      description: 'A complex project',
      requirements: ['Req 1', 'Req 2'],
      rubric,
      estimatedHours: 10,
    };

    const files: ProjectFile[] = [{ name: 'main.py', content: 'code' }];

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      rubricScores: {
        'Code Quality': { score: 90, level: 'Excellent', justification: '' },
        'Functionality': { score: 80, level: 'Complete', justification: '' },
        'Documentation': { score: 70, level: 'Good', justification: '' },
        'Testing': { score: 60, level: 'Partial', justification: '' },
      },
      feedback: 'Mixed results.',
      strengths: [],
      improvements: [],
    }));

    const result = await evaluateProject(apiKey, project, files);

    // (90 * 0.25) + (80 * 0.25) + (70 * 0.25) + (60 * 0.25) = 22.5 + 20 + 17.5 + 15 = 75
    expect(result.score).toBe(75);
  });

  it('handles project with unequal weights', async () => {
    const rubric: RubricCriterion[] = [
      { name: 'Functionality', weight: 70, levels: [{ score: 100, label: 'Complete', description: '' }] },
      { name: 'Style', weight: 30, levels: [{ score: 100, label: 'Clean', description: '' }] },
    ];

    const project: Project = {
      id: 'proj1',
      subjectId: 'cs101',
      title: 'Project',
      description: 'Desc',
      requirements: [],
      rubric,
      estimatedHours: 5,
    };

    const files: ProjectFile[] = [{ name: 'main.py', content: 'code' }];

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      rubricScores: {
        'Functionality': { score: 100, level: 'Complete', justification: '' },
        'Style': { score: 50, level: 'Okay', justification: '' },
      },
      feedback: 'Functional but not stylish.',
      strengths: [],
      improvements: [],
    }));

    const result = await evaluateProject(apiKey, project, files);

    // (100 * 0.70) + (50 * 0.30) = 70 + 15 = 85
    expect(result.score).toBe(85);
  });

  it('handles empty files array', async () => {
    const rubric: RubricCriterion[] = [
      { name: 'Code', weight: 100, levels: [{ score: 100, label: 'Good', description: '' }] },
    ];

    const project: Project = {
      id: 'proj1',
      subjectId: 'cs101',
      title: 'Empty Project',
      description: 'No files submitted',
      requirements: [],
      rubric,
      estimatedHours: 1,
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      rubricScores: {
        'Code': { score: 0, level: 'None', justification: 'No code submitted' },
      },
      feedback: 'Nothing to evaluate.',
      strengths: [],
      improvements: ['Submit code'],
    }));

    const result = await evaluateProject(apiKey, project, []);

    expect(result.score).toBe(0);
    expect(result.improvements).toContain('Submit code');
  });

  it('handles files with special characters in names', async () => {
    const rubric: RubricCriterion[] = [
      { name: 'Code', weight: 100, levels: [{ score: 100, label: 'Good', description: '' }] },
    ];

    const project: Project = {
      id: 'proj1',
      subjectId: 'cs101',
      title: 'Project',
      description: 'Desc',
      requirements: [],
      rubric,
      estimatedHours: 1,
    };

    const files: ProjectFile[] = [
      { name: 'my file (1).py', content: 'print("hi")' },
      { name: 'config.json', content: '{"key": "value"}' },
    ];

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      rubricScores: { 'Code': { score: 80, level: 'Good', justification: '' } },
      feedback: 'Works.',
      strengths: [],
      improvements: [],
    }));

    await evaluateProject(apiKey, project, files);

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    const prompt = requestBody.contents[0].parts[0].text;

    expect(prompt).toContain('FILE: my file (1).py');
    expect(prompt).toContain('FILE: config.json');
  });

  it('handles empty rubricScores in response', async () => {
    const rubric: RubricCriterion[] = [
      { name: 'Code', weight: 100, levels: [{ score: 100, label: 'Good', description: '' }] },
    ];

    const project: Project = {
      id: 'proj1',
      subjectId: 'cs101',
      title: 'Project',
      description: 'Desc',
      requirements: [],
      rubric,
      estimatedHours: 1,
    };

    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      rubricScores: {},
      feedback: 'Could not evaluate.',
      strengths: [],
      improvements: [],
    }));

    const result = await evaluateProject(apiKey, project, []);

    // No rubric scores, so weighted score is 0
    expect(result.score).toBe(0);
    expect(result.rubricScores).toEqual({});
  });
});

describe('API error handling details', () => {
  const apiKey = 'test-api-key';

  it('includes HTTP status code in error message for 400 errors', async () => {
    mockFetch.mockResolvedValueOnce(new Response('Bad Request', { status: 400 }));

    await expect(
      evaluateWrittenExercise(apiKey, 'problem', 'solution', 'answer')
    ).rejects.toThrow('Gemini API error: 400 - Bad Request');
  });

  it('includes HTTP status code in error message for 403 errors', async () => {
    mockFetch.mockResolvedValueOnce(new Response('Forbidden', { status: 403 }));

    await expect(
      evaluateWrittenExercise(apiKey, 'problem', 'solution', 'answer')
    ).rejects.toThrow('Gemini API error: 403 - Forbidden');
  });

  it('includes HTTP status code in error message for 500 errors', async () => {
    mockFetch.mockResolvedValueOnce(new Response('Internal Server Error', { status: 500 }));

    await expect(
      evaluateWrittenExercise(apiKey, 'problem', 'solution', 'answer')
    ).rejects.toThrow('Gemini API error: 500 - Internal Server Error');
  });

  it('includes HTTP status code in error message for 503 errors', async () => {
    mockFetch.mockResolvedValueOnce(new Response('Service Unavailable', { status: 503 }));

    await expect(
      evaluateCodeExercise(apiKey, 'problem', 'solution', 'code', 'python')
    ).rejects.toThrow('Gemini API error: 503 - Service Unavailable');
  });

  it('handles JSON error responses from API', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ error: { message: 'Quota exceeded' } }), { status: 429 })
    );

    await expect(
      evaluateWrittenExercise(apiKey, 'problem', 'solution', 'answer')
    ).rejects.toThrow('Gemini API error: 429');
  });
});

describe('response content edge cases', () => {
  const apiKey = 'test-api-key';

  it('handles response with only whitespace in text field', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [{ text: '   \n\t  ' }],
              },
            },
          ],
        }),
        { status: 200 }
      )
    );

    // Empty/whitespace JSON should fail to parse
    await expect(
      evaluateWrittenExercise(apiKey, 'problem', 'solution', 'answer')
    ).rejects.toThrow('Failed to parse');
  });

  it('handles response with markdown code block wrapping JSON', async () => {
    // Sometimes LLMs wrap JSON in markdown code blocks
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [{ text: '```json\n{"passed": true, "score": 90, "feedback": "Good", "strengths": [], "improvements": []}\n```' }],
              },
            },
          ],
        }),
        { status: 200 }
      )
    );

    // This will fail because the code wraps JSON in markdown
    await expect(
      evaluateWrittenExercise(apiKey, 'problem', 'solution', 'answer')
    ).rejects.toThrow('Failed to parse');
  });

  it('handles response with extra whitespace around JSON', async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [{ text: '\n\n{"passed": true, "score": 85, "feedback": "Good", "strengths": [], "improvements": []}\n\n' }],
              },
            },
          ],
        }),
        { status: 200 }
      )
    );

    // JSON.parse handles whitespace around valid JSON
    const result = await evaluateWrittenExercise(apiKey, 'problem', 'solution', 'answer');
    expect(result.score).toBe(85);
  });

  it('handles deeply nested empty objects in response', async () => {
    mockFetch.mockResolvedValueOnce(createGeminiResponse({
      passed: null,
      score: null,
      feedback: null,
      strengths: null,
      improvements: null,
    }));

    const result = await evaluateWrittenExercise(apiKey, 'problem', 'solution', 'answer');

    // Should use defaults for null values
    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
    expect(result.feedback).toBe('Unable to evaluate.');
    expect(result.strengths).toEqual([]);
    expect(result.improvements).toEqual([]);
  });
});
