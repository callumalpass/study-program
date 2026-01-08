/**
 * Quiz Utils Null Handling Edge Cases
 *
 * Tests for edge cases involving null values in quiz answer handling.
 * While TypeScript types specify undefined, runtime may encounter null values
 * from JSON parsing, API responses, or other sources.
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  checkAnswer,
  calculateScore,
  getCorrectOptionIndex,
} from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer } from '../src/core/types';

// Helper to create test questions
const createMultipleChoice = (
  id: string,
  correctAnswer: number,
  options = ['A', 'B', 'C', 'D']
): QuizQuestion => ({
  id,
  type: 'multiple_choice',
  prompt: `Question ${id}`,
  options,
  correctAnswer,
  explanation: 'Explanation',
});

const createFillBlank = (id: string, correctAnswer: string): QuizQuestion => ({
  id,
  type: 'fill_blank',
  prompt: `Question ${id}`,
  correctAnswer,
  explanation: 'Explanation',
});

describe('normalizeAnswer null handling', () => {
  it('handles null value by converting to string "null"', () => {
    // When null is passed (cast to bypass TypeScript), String(null) = "null"
    const result = normalizeAnswer(null as unknown as string);
    expect(result).toBe('null');
  });

  it('handles empty string', () => {
    expect(normalizeAnswer('')).toBe('');
  });

  it('handles whitespace-only string', () => {
    expect(normalizeAnswer('   ')).toBe('');
  });

  it('handles numeric zero', () => {
    expect(normalizeAnswer(0)).toBe('0');
  });

  it('handles boolean false', () => {
    expect(normalizeAnswer(false)).toBe('false');
  });

  it('handles NaN by converting to string', () => {
    // NaN.toString() = "NaN"
    const result = normalizeAnswer(NaN as unknown as number);
    expect(result).toBe('nan');
  });

  it('handles Infinity by converting to string', () => {
    const result = normalizeAnswer(Infinity as unknown as number);
    expect(result).toBe('infinity');
  });
});

describe('checkAnswer with edge case values', () => {
  describe('multiple choice with boundary values', () => {
    it('handles answer of -1 (invalid index)', () => {
      const question = createMultipleChoice('q1', 0);
      expect(checkAnswer(question, -1)).toBe(false);
    });

    it('handles answer greater than options length', () => {
      const question = createMultipleChoice('q1', 0, ['A', 'B']);
      expect(checkAnswer(question, 5)).toBe(false);
    });

    it('handles answer of NaN', () => {
      const question = createMultipleChoice('q1', 0);
      expect(checkAnswer(question, NaN as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('fill_blank with edge case answers', () => {
    it('handles answer with only whitespace when correct is not empty', () => {
      const question = createFillBlank('q1', 'answer');
      expect(checkAnswer(question, '   ')).toBe(false);
    });

    it('handles answer with only whitespace when correct is empty', () => {
      const question = createFillBlank('q1', '');
      expect(checkAnswer(question, '   ')).toBe(true);
    });

    it('handles numeric answer for string question', () => {
      const question = createFillBlank('q1', '42');
      // normalizeAnswer converts 42 to "42", which matches "42"
      expect(checkAnswer(question, 42 as unknown as QuizAnswer)).toBe(true);
    });

    it('handles boolean answer for string question', () => {
      const question = createFillBlank('q1', 'true');
      // normalizeAnswer converts true to "true"
      expect(checkAnswer(question, true as unknown as QuizAnswer)).toBe(true);
    });
  });
});

describe('calculateScore edge cases', () => {
  it('throws when questions array contains null elements', () => {
    const questions = [
      createMultipleChoice('q1', 0),
      null as unknown as QuizQuestion,
      createMultipleChoice('q3', 0),
    ];

    // Null elements in questions array is a programming error
    // The function will throw when trying to access question.id
    expect(() => calculateScore(questions, { q1: 0, q3: 0 })).toThrow();
  });

  it('handles answers object with null values', () => {
    const questions = [
      createMultipleChoice('q1', 0),
      createMultipleChoice('q2', 1),
    ];
    const answers = { q1: 0, q2: null as unknown as QuizAnswer };

    // q1 is correct, q2 is null (treated as wrong)
    expect(calculateScore(questions, answers)).toBe(50);
  });

  it('handles very large question arrays', () => {
    const questions = Array.from({ length: 1000 }, (_, i) =>
      createMultipleChoice(`q${i}`, 0)
    );
    const answers: Record<string, QuizAnswer> = {};
    for (let i = 0; i < 1000; i++) {
      answers[`q${i}`] = 0;
    }

    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles questions with numeric string IDs', () => {
    const questions = [
      createMultipleChoice('123', 0),
      createMultipleChoice('456', 1),
    ];
    const answers = { '123': 0, '456': 1 };

    expect(calculateScore(questions, answers)).toBe(100);
  });
});

describe('getCorrectOptionIndex edge cases', () => {
  it('returns -1 for out of bounds positive index', () => {
    const question = createMultipleChoice('q1', 10, ['A', 'B']);
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns -1 for negative index', () => {
    const question = createMultipleChoice('q1', -1 as number, ['A', 'B']);
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns -1 for empty options array with numeric answer', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test',
      options: [],
      correctAnswer: 0,
      explanation: 'Test',
    };
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns -1 for empty options array with string answer', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test',
      options: [],
      correctAnswer: 'A',
      explanation: 'Test',
    };
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('handles options with empty string correctly', () => {
    const question = createMultipleChoice('q1', '', ['', 'B', 'C']);
    // Empty string should match first option
    expect(getCorrectOptionIndex(question)).toBe(0);
  });

  it('handles duplicate options by returning first match', () => {
    const question = createMultipleChoice('q1', 'A', ['A', 'A', 'B']);
    // Should return index of first 'A'
    expect(getCorrectOptionIndex(question)).toBe(0);
  });
});

describe('answer type coercion', () => {
  it('compares numeric answer to numeric correctAnswer correctly', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What is 2+2?',
      codeSnippet: 'print(2+2)',
      correctAnswer: 4,
      explanation: 'Basic math',
    };

    // Both numeric should match via normalizeAnswer
    expect(checkAnswer(question, 4)).toBe(true);
    expect(checkAnswer(question, '4')).toBe(true);
    expect(checkAnswer(question, ' 4 ')).toBe(true);
  });

  it('compares string answer to numeric correctAnswer correctly', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What is 2+2?',
      codeSnippet: 'print(2+2)',
      correctAnswer: 4,
      explanation: 'Basic math',
    };

    // String "4" should match numeric 4
    expect(checkAnswer(question, '4')).toBe(true);
  });

  it('handles float precision in answers', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What is 1/3?',
      codeSnippet: 'print(1/3)',
      correctAnswer: '0.333',
      explanation: 'Division',
    };

    // Exact match
    expect(checkAnswer(question, '0.333')).toBe(true);
    // Different precision won't match
    expect(checkAnswer(question, '0.33333333')).toBe(false);
  });
});
