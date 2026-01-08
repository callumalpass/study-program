/**
 * Quiz Answer Boundary Cases Tests
 *
 * Tests for edge cases and boundary conditions in quiz answer validation
 * that may not be covered by other test files.
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  getCorrectOptionIndex,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer } from '../src/core/types';

// Test helper to create quiz questions
const createMultipleChoice = (
  id: string,
  correctAnswer: number | string,
  options = ['A', 'B', 'C', 'D']
): QuizQuestion => ({
  id,
  type: 'multiple_choice',
  prompt: `Question ${id}`,
  options,
  correctAnswer,
  explanation: 'Explanation',
});

const createFillBlank = (id: string, correctAnswer: string | number | boolean): QuizQuestion => ({
  id,
  type: 'fill_blank',
  prompt: `Question ${id}`,
  correctAnswer,
  explanation: 'Explanation',
});

const createCodeOutput = (id: string, correctAnswer: string | number): QuizQuestion => ({
  id,
  type: 'code_output',
  prompt: `Question ${id}`,
  codeSnippet: 'print("test")',
  correctAnswer,
  explanation: 'Explanation',
});

describe('getCorrectOptionIndex boundary cases', () => {
  describe('out of bounds numeric indices', () => {
    it('returns -1 for negative numeric correctAnswer', () => {
      const question = createMultipleChoice('q1', -1);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 for index equal to options length', () => {
      const question = createMultipleChoice('q1', 4, ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 for index greater than options length', () => {
      const question = createMultipleChoice('q1', 100, ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns valid index for index at last position', () => {
      const question = createMultipleChoice('q1', 3, ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(3);
    });

    it('returns valid index for index 0', () => {
      const question = createMultipleChoice('q1', 0, ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });
  });

  describe('empty options array', () => {
    it('returns -1 for empty options with numeric index 0', () => {
      const question = createMultipleChoice('q1', 0, []);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 for empty options with string correctAnswer', () => {
      const question = createMultipleChoice('q1', 'A', []);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });
  });

  describe('single option arrays', () => {
    it('returns 0 for single option with index 0', () => {
      const question = createMultipleChoice('q1', 0, ['Only Option']);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('returns -1 for single option with index 1', () => {
      const question = createMultipleChoice('q1', 1, ['Only Option']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('finds matching string in single option array', () => {
      const question = createMultipleChoice('q1', 'Only Option', ['Only Option']);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });
  });

  describe('string matching edge cases', () => {
    it('handles option with leading/trailing whitespace', () => {
      const question = createMultipleChoice('q1', '  spaced  ', ['  spaced  ', 'normal']);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('does not match option when trimming differs', () => {
      // correctAnswer has spaces, option doesn't
      const question = createMultipleChoice('q1', '  spaced  ', ['spaced', 'other']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('handles empty string option', () => {
      const question = createMultipleChoice('q1', '', ['', 'not empty']);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('handles option with special regex characters', () => {
      const question = createMultipleChoice('q1', '[a-z]+', ['[a-z]+', 'other']);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('handles unicode characters in options', () => {
      const question = createMultipleChoice('q1', 'π ≈ 3.14', ['π ≈ 3.14', 'e ≈ 2.72']);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('handles emoji in options', () => {
      const question = createMultipleChoice('q1', '😀 Happy', ['😀 Happy', '😢 Sad']);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });
  });
});

describe('checkAnswer with invalid correctAnswer', () => {
  describe('multiple choice with invalid correct index', () => {
    it('returns false for any answer when correctAnswer is out of bounds', () => {
      const question = createMultipleChoice('q1', 10); // index 10 doesn't exist
      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 2)).toBe(false);
      expect(checkAnswer(question, 10)).toBe(false);
    });

    it('returns false when correctAnswer is negative', () => {
      const question = createMultipleChoice('q1', -1);
      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, -1)).toBe(false);
    });

    it('returns false when correctAnswer string does not match any option', () => {
      const question = createMultipleChoice('q1', 'Not In Options', ['A', 'B', 'C']);
      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 2)).toBe(false);
    });
  });
});

describe('normalizeAnswer special characters', () => {
  describe('unicode normalization', () => {
    it('lowercases unicode letters', () => {
      expect(normalizeAnswer('ÑOÑO')).toBe('ñoño');
      expect(normalizeAnswer('ÜBER')).toBe('über');
    });

    it('preserves non-letter unicode symbols', () => {
      expect(normalizeAnswer('π ≈ 3.14')).toBe('π ≈ 3.14');
      expect(normalizeAnswer('∑ = sum')).toBe('∑ = sum');
    });

    it('handles combining characters', () => {
      // é as single character vs e + combining acute
      expect(normalizeAnswer('café')).toBe('café');
    });
  });

  describe('numeric edge cases', () => {
    it('handles very large numbers', () => {
      expect(normalizeAnswer(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991');
    });

    it('handles very small numbers', () => {
      expect(normalizeAnswer(Number.MIN_SAFE_INTEGER)).toBe('-9007199254740991');
    });

    it('handles Infinity', () => {
      expect(normalizeAnswer(Infinity)).toBe('infinity');
    });

    it('handles negative Infinity', () => {
      expect(normalizeAnswer(-Infinity)).toBe('-infinity');
    });

    it('handles NaN', () => {
      expect(normalizeAnswer(NaN)).toBe('nan');
    });

    it('handles scientific notation', () => {
      expect(normalizeAnswer(1e10)).toBe('10000000000');
    });

    it('handles small decimal fractions', () => {
      expect(normalizeAnswer(0.0001)).toBe('0.0001');
    });
  });

  describe('string edge cases', () => {
    it('handles strings with only whitespace', () => {
      expect(normalizeAnswer('   ')).toBe('');
      expect(normalizeAnswer('\t\n\r')).toBe('');
    });

    it('handles strings with null character', () => {
      expect(normalizeAnswer('before\0after')).toBe('before\0after');
    });

    it('handles very long strings', () => {
      const longString = 'a'.repeat(10000);
      expect(normalizeAnswer(longString)).toBe(longString);
    });
  });
});

describe('checkAnswer fill_blank with numeric correctAnswer', () => {
  it('matches string answer "42" with numeric correctAnswer 42', () => {
    const question = createFillBlank('q1', 42);
    expect(checkAnswer(question, '42')).toBe(true);
  });

  it('matches numeric answer 42 with string correctAnswer "42"', () => {
    const question = createFillBlank('q1', '42');
    expect(checkAnswer(question, 42)).toBe(true);
  });

  it('matches with leading/trailing whitespace in answer', () => {
    const question = createFillBlank('q1', 42);
    expect(checkAnswer(question, '  42  ')).toBe(true);
  });

  it('handles zero correctly', () => {
    const question = createFillBlank('q1', 0);
    expect(checkAnswer(question, '0')).toBe(true);
    expect(checkAnswer(question, 0)).toBe(true);
  });

  it('handles negative numbers correctly', () => {
    const question = createFillBlank('q1', -5);
    expect(checkAnswer(question, '-5')).toBe(true);
    expect(checkAnswer(question, -5)).toBe(true);
  });

  it('handles decimal numbers correctly', () => {
    const question = createFillBlank('q1', '3.14');
    expect(checkAnswer(question, 3.14)).toBe(true);
    expect(checkAnswer(question, '3.14')).toBe(true);
  });
});

describe('checkAnswer code_output with numeric answers', () => {
  it('matches string answer with numeric correctAnswer', () => {
    const question = createCodeOutput('q1', 100);
    expect(checkAnswer(question, '100')).toBe(true);
  });

  it('matches numeric answer with string correctAnswer', () => {
    const question = createCodeOutput('q1', '100');
    expect(checkAnswer(question, 100)).toBe(true);
  });

  it('handles floating point output', () => {
    const question = createCodeOutput('q1', '2.5');
    expect(checkAnswer(question, '2.5')).toBe(true);
    expect(checkAnswer(question, 2.5)).toBe(true);
  });
});

describe('calculateScore edge cases', () => {
  describe('single question scenarios', () => {
    it('returns 100 for correct single answer', () => {
      const questions = [createMultipleChoice('q1', 0)];
      expect(calculateScore(questions, { q1: 0 })).toBe(100);
    });

    it('returns 0 for incorrect single answer', () => {
      const questions = [createMultipleChoice('q1', 0)];
      expect(calculateScore(questions, { q1: 1 })).toBe(0);
    });

    it('returns 0 for missing single answer', () => {
      const questions = [createMultipleChoice('q1', 0)];
      expect(calculateScore(questions, {})).toBe(0);
    });
  });

  describe('rounding edge cases', () => {
    it('rounds 33.33% to 33', () => {
      const questions = [
        createMultipleChoice('q1', 0),
        createMultipleChoice('q2', 0),
        createMultipleChoice('q3', 0),
      ];
      expect(calculateScore(questions, { q1: 0 })).toBe(33);
    });

    it('rounds 66.67% to 67', () => {
      const questions = [
        createMultipleChoice('q1', 0),
        createMultipleChoice('q2', 0),
        createMultipleChoice('q3', 0),
      ];
      expect(calculateScore(questions, { q1: 0, q2: 0 })).toBe(67);
    });

    it('handles 1/7 correctly (14.29% rounds to 14)', () => {
      const questions = Array.from({ length: 7 }, (_, i) =>
        createMultipleChoice(`q${i}`, 0)
      );
      expect(calculateScore(questions, { q0: 0 })).toBe(14);
    });

    it('handles 3/7 correctly (42.86% rounds to 43)', () => {
      const questions = Array.from({ length: 7 }, (_, i) =>
        createMultipleChoice(`q${i}`, 0)
      );
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0 })).toBe(43);
    });

    it('handles 4/7 correctly (57.14% rounds to 57)', () => {
      const questions = Array.from({ length: 7 }, (_, i) =>
        createMultipleChoice(`q${i}`, 0)
      );
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0, q3: 0 })).toBe(57);
    });

    it('handles 5/7 correctly (71.43% rounds to 71)', () => {
      const questions = Array.from({ length: 7 }, (_, i) =>
        createMultipleChoice(`q${i}`, 0)
      );
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0 })).toBe(71);
    });
  });

  describe('large quiz handling', () => {
    it('handles quiz with 100 questions', () => {
      const questions = Array.from({ length: 100 }, (_, i) =>
        createMultipleChoice(`q${i}`, 0)
      );
      const answers: Record<string, QuizAnswer> = {};
      for (let i = 0; i < 75; i++) {
        answers[`q${i}`] = 0;
      }
      expect(calculateScore(questions, answers)).toBe(75);
    });

    it('handles quiz with exactly 1 question where correctAnswer is invalid', () => {
      const questions = [createMultipleChoice('q1', 100)]; // invalid index
      // Any answer should be wrong since correctAnswer is invalid
      expect(calculateScore(questions, { q1: 0 })).toBe(0);
      expect(calculateScore(questions, { q1: 100 })).toBe(0);
    });
  });
});

describe('answer validation with special types', () => {
  describe('answers as objects (non-coding)', () => {
    it('returns false for object answer on fill_blank question', () => {
      const question = createFillBlank('q1', 'answer');
      expect(checkAnswer(question, {} as unknown as QuizAnswer)).toBe(false);
    });

    it('returns false for array answer on multiple_choice question', () => {
      const question = createMultipleChoice('q1', 0);
      expect(checkAnswer(question, [] as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('null and undefined handling', () => {
    it('handles null answers gracefully', () => {
      const question = createMultipleChoice('q1', 0);
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });

    it('handles undefined answers gracefully', () => {
      const question = createMultipleChoice('q1', 0);
      expect(checkAnswer(question, undefined)).toBe(false);
    });
  });
});

describe('question with undefined fields', () => {
  it('handles question with undefined options', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test',
      correctAnswer: 0,
      explanation: 'Test',
      // options is undefined
    };
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('handles code_output question with undefined codeSnippet', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'Test',
      correctAnswer: '42',
      explanation: 'Test',
      // codeSnippet is undefined
    };
    // Should still check answer correctly
    expect(checkAnswer(question, '42')).toBe(true);
  });
});

describe('cross-type answer coercion', () => {
  describe('boolean-like strings', () => {
    it('does not coerce string "true" to boolean true for true_false', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'true_false',
        prompt: 'Test',
        correctAnswer: true,
        explanation: 'Test',
      };
      expect(checkAnswer(question, 'true')).toBe(false);
    });

    it('does not coerce string "false" to boolean false for true_false', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'true_false',
        prompt: 'Test',
        correctAnswer: false,
        explanation: 'Test',
      };
      expect(checkAnswer(question, 'false')).toBe(false);
    });
  });

  describe('numeric-like strings', () => {
    it('treats "1" and 1 as equivalent for fill_blank', () => {
      const question = createFillBlank('q1', 1);
      expect(checkAnswer(question, '1')).toBe(true);
    });

    it('does not coerce "1" to 1 for multiple_choice index', () => {
      const question = createMultipleChoice('q1', 1);
      // String "1" should not match numeric index 1
      expect(checkAnswer(question, '1')).toBe(false);
      // Numeric 1 should match
      expect(checkAnswer(question, 1)).toBe(true);
    });
  });
});
