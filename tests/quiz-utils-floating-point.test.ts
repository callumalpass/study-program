/**
 * Quiz Utils Floating Point Edge Cases Tests
 *
 * Tests for edge cases involving floating point number handling
 * in quiz answer validation, including:
 * - Scientific notation
 * - Very small/large numbers
 * - Precision edge cases
 * - Special float values
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  normalizeCodeOutput,
  checkAnswer,
} from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

// Helper to create quiz questions
function createQuestion(overrides: Partial<QuizQuestion>): QuizQuestion {
  return {
    id: 'test-q1',
    type: 'fill_blank',
    prompt: 'Test question',
    correctAnswer: '0',
    explanation: 'Test explanation',
    ...overrides,
  };
}

describe('Quiz Utils - Floating Point Edge Cases', () => {
  describe('normalizeAnswer with floats', () => {
    it('handles basic floating point numbers', () => {
      expect(normalizeAnswer(3.14)).toBe('3.14');
      expect(normalizeAnswer(2.5)).toBe('2.5');
      expect(normalizeAnswer(0.5)).toBe('0.5');
    });

    it('handles very small numbers', () => {
      expect(normalizeAnswer(0.001)).toBe('0.001');
      expect(normalizeAnswer(0.0001)).toBe('0.0001');
    });

    it('handles very large numbers', () => {
      expect(normalizeAnswer(1000000)).toBe('1000000');
      expect(normalizeAnswer(999999.99)).toBe('999999.99');
    });

    it('handles negative floating point numbers', () => {
      expect(normalizeAnswer(-3.14)).toBe('-3.14');
      expect(normalizeAnswer(-0.5)).toBe('-0.5');
    });

    it('handles zero', () => {
      expect(normalizeAnswer(0)).toBe('0');
      expect(normalizeAnswer(0.0)).toBe('0');
      expect(normalizeAnswer(-0)).toBe('0');
    });

    it('handles numbers that convert to exponential notation', () => {
      // JavaScript converts very small/large numbers to exponential notation
      expect(normalizeAnswer(0.0000001)).toBe('1e-7');
      expect(normalizeAnswer(10000000000000000)).toBe('10000000000000000');
    });

    it('handles Infinity', () => {
      expect(normalizeAnswer(Infinity)).toBe('infinity');
      expect(normalizeAnswer(-Infinity)).toBe('-infinity');
    });

    it('handles NaN', () => {
      expect(normalizeAnswer(NaN)).toBe('nan');
    });
  });

  describe('normalizeCodeOutput with numeric strings', () => {
    it('handles numeric code output strings', () => {
      expect(normalizeCodeOutput('3.14159')).toBe('3.14159');
      expect(normalizeCodeOutput(' 42.0 ')).toBe('42.0');
    });

    it('handles lists with floating point numbers', () => {
      expect(normalizeCodeOutput('[1.5, 2.5, 3.5]')).toBe('[1.5, 2.5, 3.5]');
      expect(normalizeCodeOutput('[1.5,2.5,3.5]')).toBe('[1.5, 2.5, 3.5]');
    });

    it('handles dicts with floating point values', () => {
      expect(normalizeCodeOutput("{'pi': 3.14}")).toBe("{'pi': 3.14}");
      expect(normalizeCodeOutput("{'pi':3.14}")).toBe("{'pi': 3.14}");
    });

    it('handles negative floats in data structures', () => {
      expect(normalizeCodeOutput('[-1.5, -2.5]')).toBe('[-1.5, -2.5]');
    });

    it('handles mixed integer and float lists', () => {
      expect(normalizeCodeOutput('[1, 2.5, 3]')).toBe('[1, 2.5, 3]');
    });
  });

  describe('checkAnswer with numeric correctAnswers', () => {
    it('matches integer string with numeric correctAnswer', () => {
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: 42,
      });
      expect(checkAnswer(q, '42')).toBe(true);
      expect(checkAnswer(q, ' 42 ')).toBe(true);
    });

    it('matches float string with numeric correctAnswer', () => {
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: 3.14,
      });
      expect(checkAnswer(q, '3.14')).toBe(true);
    });

    it('does not match different precision', () => {
      // normalizeAnswer converts both to string, so exact match required
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: 3.14,
      });
      // '3.140' !== '3.14' after normalization
      expect(checkAnswer(q, '3.140')).toBe(false);
    });

    it('handles zero edge case', () => {
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: 0,
      });
      expect(checkAnswer(q, '0')).toBe(true);
      expect(checkAnswer(q, '0.0')).toBe(false); // '0.0' !== '0'
    });

    it('handles negative numbers', () => {
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: -5,
      });
      expect(checkAnswer(q, '-5')).toBe(true);
      expect(checkAnswer(q, '- 5')).toBe(false); // Space changes the string
    });
  });

  describe('checkAnswer code_output with numeric values', () => {
    it('matches integer output', () => {
      const q = createQuestion({
        type: 'code_output',
        correctAnswer: '42',
      });
      expect(checkAnswer(q, '42')).toBe(true);
      expect(checkAnswer(q, ' 42 ')).toBe(true);
    });

    it('matches float output', () => {
      const q = createQuestion({
        type: 'code_output',
        correctAnswer: '3.14159',
      });
      expect(checkAnswer(q, '3.14159')).toBe(true);
    });

    it('matches list of numbers output', () => {
      const q = createQuestion({
        type: 'code_output',
        correctAnswer: '[1, 2, 3]',
      });
      expect(checkAnswer(q, '[1,2,3]')).toBe(true);
      expect(checkAnswer(q, '[ 1 , 2 , 3 ]')).toBe(true);
    });

    it('matches float list output', () => {
      const q = createQuestion({
        type: 'code_output',
        correctAnswer: '[1.5, 2.5]',
      });
      expect(checkAnswer(q, '[1.5,2.5]')).toBe(true);
    });
  });

  describe('mathematical expression edge cases', () => {
    it('handles mathematical notation in fill_blank', () => {
      // Students might answer math questions with common forms
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: '2x',
      });
      expect(checkAnswer(q, '2x')).toBe(true);
      expect(checkAnswer(q, '2X')).toBe(true); // Case insensitive
      expect(checkAnswer(q, ' 2x ')).toBe(true);
    });

    it('handles fraction-like answers', () => {
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: '1/2',
      });
      expect(checkAnswer(q, '1/2')).toBe(true);
      expect(checkAnswer(q, ' 1/2 ')).toBe(true);
    });

    it('handles percentage answers', () => {
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: '50%',
      });
      expect(checkAnswer(q, '50%')).toBe(true);
      expect(checkAnswer(q, '50 %')).toBe(false); // Space changes the string
    });
  });

  describe('special numeric string edge cases', () => {
    it('handles string "infinity"', () => {
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: 'infinity',
      });
      expect(checkAnswer(q, 'Infinity')).toBe(true);
      expect(checkAnswer(q, 'INFINITY')).toBe(true);
    });

    it('handles string "nan"', () => {
      const q = createQuestion({
        type: 'fill_blank',
        correctAnswer: 'nan',
      });
      expect(checkAnswer(q, 'NaN')).toBe(true);
      expect(checkAnswer(q, 'NAN')).toBe(true);
    });

    it('handles Python None vs null', () => {
      const qNone = createQuestion({
        type: 'code_output',
        correctAnswer: 'none',
      });
      expect(checkAnswer(qNone, 'None')).toBe(true);
      expect(checkAnswer(qNone, 'NONE')).toBe(true);

      const qNull = createQuestion({
        type: 'code_output',
        correctAnswer: 'null',
      });
      expect(checkAnswer(qNull, 'null')).toBe(true);
      expect(checkAnswer(qNull, 'NULL')).toBe(true);
    });
  });
});
