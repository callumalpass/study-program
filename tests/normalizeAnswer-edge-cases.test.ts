/**
 * Additional edge case tests for normalizeAnswer function
 *
 * These tests cover edge cases related to special characters,
 * unicode, and unusual input values that might occur in quiz answers.
 */

import { describe, it, expect } from 'vitest';
import { normalizeAnswer, checkAnswer, calculateScore } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

describe('normalizeAnswer - special characters', () => {
  it('handles mathematical symbols', () => {
    expect(normalizeAnswer('π')).toBe('π');
    expect(normalizeAnswer('∞')).toBe('∞');
    expect(normalizeAnswer('≤')).toBe('≤');
    expect(normalizeAnswer('∑')).toBe('∑');
  });

  it('handles special unicode characters', () => {
    expect(normalizeAnswer('café')).toBe('café');
    expect(normalizeAnswer('naïve')).toBe('naïve');
    expect(normalizeAnswer('日本語')).toBe('日本語');
  });

  it('handles mathematical expressions', () => {
    expect(normalizeAnswer('x² + y²')).toBe('x² + y²');
    expect(normalizeAnswer('  X² + Y²  ')).toBe('x² + y²');
  });

  it('handles code-like strings', () => {
    expect(normalizeAnswer('def foo():')).toBe('def foo():');
    expect(normalizeAnswer('{ "key": "value" }')).toBe('{ "key": "value" }');
  });

  it('handles strings with tabs', () => {
    expect(normalizeAnswer('\tanswer\t')).toBe('answer');
  });

  it('handles strings with carriage returns', () => {
    expect(normalizeAnswer('line1\r\nline2')).toBe('line1\r\nline2');
  });
});

describe('normalizeAnswer - numeric edge cases', () => {
  it('handles NaN', () => {
    expect(normalizeAnswer(NaN)).toBe('nan');
  });

  it('handles Infinity', () => {
    expect(normalizeAnswer(Infinity)).toBe('infinity');
  });

  it('handles negative Infinity', () => {
    expect(normalizeAnswer(-Infinity)).toBe('-infinity');
  });

  it('handles very large numbers', () => {
    expect(normalizeAnswer(1e308)).toBe('1e+308');
  });

  it('handles very small numbers', () => {
    expect(normalizeAnswer(1e-308)).toBe('1e-308');
  });

  it('handles negative zero', () => {
    // JavaScript represents -0 as "0" when converted to string
    expect(normalizeAnswer(-0)).toBe('0');
  });
});

describe('checkAnswer - fill_blank with numeric correctAnswer', () => {
  it('handles numeric correctAnswer matching numeric user answer', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'fill_blank',
      prompt: 'What is 5 + 5?',
      correctAnswer: 10,
      explanation: 'Basic addition',
    };

    // User types "10" as string
    expect(checkAnswer(question, '10')).toBe(true);
    expect(checkAnswer(question, ' 10 ')).toBe(true);
    expect(checkAnswer(question, '10.0')).toBe(false); // "10.0" !== "10"
  });

  it('handles string correctAnswer matching numeric-looking user answer', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'fill_blank',
      prompt: 'What is the answer?',
      correctAnswer: '42',
      explanation: 'The answer to everything',
    };

    expect(checkAnswer(question, '42')).toBe(true);
    expect(checkAnswer(question, 42)).toBe(true);
    expect(checkAnswer(question, ' 42 ')).toBe(true);
  });
});

describe('checkAnswer - code_output with special output', () => {
  it('matches empty output', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What does print() output?',
      codeSnippet: 'print()',
      correctAnswer: '',
      explanation: 'Empty string',
    };

    expect(checkAnswer(question, '')).toBe(true);
    expect(checkAnswer(question, '   ')).toBe(true);
  });

  it('matches None output', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What does this return?',
      codeSnippet: 'print(None)',
      correctAnswer: 'None',
      explanation: 'Python None value',
    };

    expect(checkAnswer(question, 'None')).toBe(true);
    expect(checkAnswer(question, 'none')).toBe(true);
    expect(checkAnswer(question, 'NONE')).toBe(true);
  });

  it('matches True/False output', () => {
    const questionTrue: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'Output?',
      codeSnippet: 'print(True)',
      correctAnswer: 'True',
      explanation: 'Boolean true',
    };

    expect(checkAnswer(questionTrue, 'True')).toBe(true);
    expect(checkAnswer(questionTrue, 'true')).toBe(true);
    expect(checkAnswer(questionTrue, 'TRUE')).toBe(true);
  });

  it('handles floating point output', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What does 5/2 output?',
      codeSnippet: 'print(5/2)',
      correctAnswer: '2.5',
      explanation: 'Floating point division',
    };

    expect(checkAnswer(question, '2.5')).toBe(true);
    expect(checkAnswer(question, ' 2.5 ')).toBe(true);
    expect(checkAnswer(question, '2.50')).toBe(false); // Exact match required
  });
});

describe('calculateScore - edge cases with unusual questions', () => {
  it('handles questions with empty string correctAnswer', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'Leave blank if unknown',
        correctAnswer: '',
        explanation: 'Empty answer is correct',
      },
    ];

    expect(calculateScore(questions, { q1: '' })).toBe(100);
    expect(calculateScore(questions, { q1: '   ' })).toBe(100);
    expect(calculateScore(questions, { q1: 'something' })).toBe(0);
  });

  it('handles mix of question types with 0% score', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Pick A',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'A is correct',
      },
      {
        id: 'q2',
        type: 'true_false',
        prompt: 'True?',
        correctAnswer: true,
        explanation: 'It is true',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        prompt: 'Say hello',
        correctAnswer: 'hello',
        explanation: 'Hello',
      },
    ];

    // All wrong answers
    const wrongAnswers = { q1: 1, q2: false, q3: 'goodbye' };
    expect(calculateScore(questions, wrongAnswers)).toBe(0);
  });

  it('handles very long quiz with precise percentage calculation', () => {
    // Create 97 questions
    const questions: QuizQuestion[] = Array.from({ length: 97 }, (_, i) => ({
      id: `q${i}`,
      type: 'multiple_choice' as const,
      prompt: `Question ${i}`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'A is correct',
    }));

    // Answer 73 correct, 24 wrong
    const answers: Record<string, number> = {};
    for (let i = 0; i < 97; i++) {
      answers[`q${i}`] = i < 73 ? 0 : 1; // First 73 correct
    }

    // 73/97 = 75.26% rounds to 75%
    expect(calculateScore(questions, answers)).toBe(75);
  });
});

describe('multiple_choice - out of bounds handling', () => {
  it('returns -1 for correctAnswer index out of bounds', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Pick one',
      options: ['A', 'B', 'C'],
      correctAnswer: 5, // Out of bounds
      explanation: 'Invalid',
    };

    // Should not match any answer since correct index is invalid
    expect(checkAnswer(question, 0)).toBe(false);
    expect(checkAnswer(question, 1)).toBe(false);
    expect(checkAnswer(question, 2)).toBe(false);
    expect(checkAnswer(question, 5)).toBe(false);
  });

  it('returns -1 for negative correctAnswer index', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Pick one',
      options: ['A', 'B', 'C'],
      correctAnswer: -1, // Negative
      explanation: 'Invalid',
    };

    expect(checkAnswer(question, 0)).toBe(false);
    expect(checkAnswer(question, -1)).toBe(false);
  });
});
