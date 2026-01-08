/**
 * Quiz Utils Comprehensive Tests
 *
 * Additional comprehensive tests for quiz answer validation and scoring edge cases,
 * including unusual inputs, type coercion scenarios, and boundary conditions.
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  checkAnswer,
  calculateScore,
  getCorrectOptionIndex,
  isCodingAnswer,
} from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer, CodingAnswer } from '../src/core/types';

// Helper to create quiz questions
function createQuestion(overrides: Partial<QuizQuestion>): QuizQuestion {
  return {
    id: 'test-q1',
    type: 'multiple_choice',
    prompt: 'Test question',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Test explanation',
    ...overrides,
  };
}

describe('normalizeAnswer - Extended Edge Cases', () => {
  describe('whitespace handling', () => {
    it('trims leading whitespace', () => {
      expect(normalizeAnswer('   answer')).toBe('answer');
    });

    it('trims trailing whitespace', () => {
      expect(normalizeAnswer('answer   ')).toBe('answer');
    });

    it('trims mixed whitespace', () => {
      expect(normalizeAnswer('  answer  ')).toBe('answer');
    });

    it('handles tabs', () => {
      expect(normalizeAnswer('\tanswer\t')).toBe('answer');
    });

    it('handles newlines', () => {
      expect(normalizeAnswer('\nanswer\n')).toBe('answer');
    });

    it('handles mixed whitespace types', () => {
      expect(normalizeAnswer(' \t\n answer \n\t ')).toBe('answer');
    });

    it('preserves internal whitespace', () => {
      // Note: normalizeAnswer only trims, doesn't collapse internal whitespace
      expect(normalizeAnswer('  hello world  ')).toBe('hello world');
    });
  });

  describe('case handling', () => {
    it('lowercases uppercase', () => {
      expect(normalizeAnswer('ANSWER')).toBe('answer');
    });

    it('lowercases mixed case', () => {
      expect(normalizeAnswer('AnSwEr')).toBe('answer');
    });

    it('handles unicode uppercase', () => {
      expect(normalizeAnswer('CAFÉ')).toBe('café');
    });
  });

  describe('type coercion', () => {
    it('converts number 0 to string', () => {
      expect(normalizeAnswer(0)).toBe('0');
    });

    it('converts negative numbers to string', () => {
      expect(normalizeAnswer(-5)).toBe('-5');
    });

    it('converts floating point numbers', () => {
      expect(normalizeAnswer(3.14159)).toBe('3.14159');
    });

    it('converts boolean true', () => {
      expect(normalizeAnswer(true)).toBe('true');
    });

    it('converts boolean false', () => {
      expect(normalizeAnswer(false)).toBe('false');
    });

    it('handles undefined', () => {
      expect(normalizeAnswer(undefined)).toBe('');
    });
  });

  describe('special string values', () => {
    it('handles empty string', () => {
      expect(normalizeAnswer('')).toBe('');
    });

    it('handles whitespace-only string', () => {
      expect(normalizeAnswer('   ')).toBe('');
    });

    it('handles string "undefined"', () => {
      expect(normalizeAnswer('undefined')).toBe('undefined');
    });

    it('handles string "null"', () => {
      expect(normalizeAnswer('null')).toBe('null');
    });

    it('handles string "true"', () => {
      expect(normalizeAnswer('True')).toBe('true');
    });

    it('handles string "false"', () => {
      expect(normalizeAnswer('FALSE')).toBe('false');
    });
  });
});

describe('getCorrectOptionIndex - Extended Cases', () => {
  describe('numeric correctAnswer', () => {
    it('returns valid index 0', () => {
      const q = createQuestion({ correctAnswer: 0, options: ['A', 'B', 'C'] });
      expect(getCorrectOptionIndex(q)).toBe(0);
    });

    it('returns valid index at end', () => {
      const q = createQuestion({ correctAnswer: 2, options: ['A', 'B', 'C'] });
      expect(getCorrectOptionIndex(q)).toBe(2);
    });

    it('returns -1 for negative index', () => {
      const q = createQuestion({ correctAnswer: -1, options: ['A', 'B', 'C'] });
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('returns -1 for index equal to length', () => {
      const q = createQuestion({ correctAnswer: 3, options: ['A', 'B', 'C'] });
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('returns -1 for large out-of-bounds index', () => {
      const q = createQuestion({ correctAnswer: 100, options: ['A', 'B', 'C'] });
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });
  });

  describe('string correctAnswer', () => {
    it('finds matching option at start', () => {
      const q = createQuestion({ correctAnswer: 'First', options: ['First', 'Second', 'Third'] });
      expect(getCorrectOptionIndex(q)).toBe(0);
    });

    it('finds matching option at end', () => {
      const q = createQuestion({ correctAnswer: 'Third', options: ['First', 'Second', 'Third'] });
      expect(getCorrectOptionIndex(q)).toBe(2);
    });

    it('returns -1 for non-matching string', () => {
      const q = createQuestion({ correctAnswer: 'Fourth', options: ['First', 'Second', 'Third'] });
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('is case-sensitive for exact matching', () => {
      const q = createQuestion({ correctAnswer: 'FIRST', options: ['First', 'Second', 'Third'] });
      // String matching is exact, so 'FIRST' !== 'First'
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });
  });

  describe('edge cases', () => {
    it('handles empty options array', () => {
      const q = createQuestion({ correctAnswer: 0, options: [] });
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('handles undefined options', () => {
      const q = createQuestion({ correctAnswer: 0 });
      delete (q as { options?: string[] }).options;
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('handles single option', () => {
      const q = createQuestion({ correctAnswer: 0, options: ['Only'] });
      expect(getCorrectOptionIndex(q)).toBe(0);
    });
  });
});

describe('isCodingAnswer - Type Guard', () => {
  it('returns true for valid CodingAnswer', () => {
    const answer: CodingAnswer = { code: 'print("hello")', passed: true };
    expect(isCodingAnswer(answer)).toBe(true);
  });

  it('returns true for CodingAnswer with passed=false', () => {
    const answer: CodingAnswer = { code: '', passed: false };
    expect(isCodingAnswer(answer)).toBe(true);
  });

  it('returns false for undefined', () => {
    expect(isCodingAnswer(undefined)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isCodingAnswer(null as unknown as QuizAnswer)).toBe(false);
  });

  it('returns false for string', () => {
    expect(isCodingAnswer('answer')).toBe(false);
  });

  it('returns false for number', () => {
    expect(isCodingAnswer(42)).toBe(false);
  });

  it('returns false for boolean', () => {
    expect(isCodingAnswer(true)).toBe(false);
  });

  it('returns false for object without code property', () => {
    const obj = { passed: true } as unknown as QuizAnswer;
    expect(isCodingAnswer(obj)).toBe(false);
  });

  it('returns true for object with code property (even if passed is missing)', () => {
    // The type guard only checks for 'code' property
    const obj = { code: 'test' } as unknown as QuizAnswer;
    expect(isCodingAnswer(obj)).toBe(true);
  });
});

describe('checkAnswer - Extended Question Types', () => {
  describe('multiple_choice edge cases', () => {
    it('returns false when correctIndex is -1 (invalid question)', () => {
      const q = createQuestion({ correctAnswer: 10, options: ['A', 'B'] }); // Out of bounds
      expect(checkAnswer(q, 0)).toBe(false);
    });

    it('handles answer exactly matching index', () => {
      const q = createQuestion({ correctAnswer: 1, options: ['A', 'B', 'C'] });
      expect(checkAnswer(q, 1)).toBe(true);
      expect(checkAnswer(q, 0)).toBe(false);
      expect(checkAnswer(q, 2)).toBe(false);
    });

    it('rejects string answer for numeric correctAnswer', () => {
      const q = createQuestion({ correctAnswer: 0, options: ['A', 'B'] });
      // Answer must be number for multiple_choice
      expect(checkAnswer(q, '0' as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('true_false edge cases', () => {
    it('accepts boolean true correctly', () => {
      const q = createQuestion({ type: 'true_false', correctAnswer: true });
      expect(checkAnswer(q, true)).toBe(true);
      expect(checkAnswer(q, false)).toBe(false);
    });

    it('accepts boolean false correctly', () => {
      const q = createQuestion({ type: 'true_false', correctAnswer: false });
      expect(checkAnswer(q, false)).toBe(true);
      expect(checkAnswer(q, true)).toBe(false);
    });

    it('rejects string "true" for boolean true', () => {
      const q = createQuestion({ type: 'true_false', correctAnswer: true });
      // Direct comparison: 'true' !== true
      expect(checkAnswer(q, 'true' as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('fill_blank normalization', () => {
    it('matches case-insensitively', () => {
      const q = createQuestion({ type: 'fill_blank', correctAnswer: 'Answer' });
      expect(checkAnswer(q, 'answer')).toBe(true);
      expect(checkAnswer(q, 'ANSWER')).toBe(true);
      expect(checkAnswer(q, 'AnSwEr')).toBe(true);
    });

    it('matches with whitespace variations', () => {
      const q = createQuestion({ type: 'fill_blank', correctAnswer: 'answer' });
      expect(checkAnswer(q, '  answer  ')).toBe(true);
      expect(checkAnswer(q, '\tanswer\n')).toBe(true);
    });

    it('matches numeric strings', () => {
      const q = createQuestion({ type: 'fill_blank', correctAnswer: '42' });
      expect(checkAnswer(q, '42')).toBe(true);
      expect(checkAnswer(q, ' 42 ')).toBe(true);
    });

    it('matches numeric correctAnswer with string answer', () => {
      const q = createQuestion({ type: 'fill_blank', correctAnswer: 42 as unknown as string });
      expect(checkAnswer(q, '42')).toBe(true);
    });
  });

  describe('code_output normalization', () => {
    it('matches output case-insensitively', () => {
      const q = createQuestion({ type: 'code_output', correctAnswer: 'Hello World' });
      expect(checkAnswer(q, 'hello world')).toBe(true);
    });

    it('matches numeric output', () => {
      const q = createQuestion({ type: 'code_output', correctAnswer: '3' });
      expect(checkAnswer(q, '3')).toBe(true);
      expect(checkAnswer(q, ' 3 ')).toBe(true);
    });
  });

  describe('coding questions', () => {
    it('accepts passed CodingAnswer', () => {
      const q = createQuestion({ type: 'coding', correctAnswer: '' });
      const answer: CodingAnswer = { code: 'def solution(): pass', passed: true };
      expect(checkAnswer(q, answer)).toBe(true);
    });

    it('rejects failed CodingAnswer', () => {
      const q = createQuestion({ type: 'coding', correctAnswer: '' });
      const answer: CodingAnswer = { code: 'def solution(): pass', passed: false };
      expect(checkAnswer(q, answer)).toBe(false);
    });

    it('rejects non-CodingAnswer for coding question', () => {
      const q = createQuestion({ type: 'coding', correctAnswer: '' });
      expect(checkAnswer(q, 'print("hello")')).toBe(false);
    });
  });

  describe('written questions', () => {
    it('matches written answers case-insensitively', () => {
      const q = createQuestion({ type: 'written', correctAnswer: 'Essay Answer' });
      expect(checkAnswer(q, 'essay answer')).toBe(true);
    });
  });

  describe('undefined and unknown types', () => {
    it('returns false for undefined answer', () => {
      const q = createQuestion({});
      expect(checkAnswer(q, undefined)).toBe(false);
    });

    it('returns false for unknown question type', () => {
      const q = createQuestion({ type: 'unknown' as QuizQuestion['type'] });
      expect(checkAnswer(q, 'answer')).toBe(false);
    });
  });
});

describe('calculateScore - Extended Cases', () => {
  describe('empty and edge cases', () => {
    it('returns 0 for empty questions array', () => {
      expect(calculateScore([], {})).toBe(0);
    });

    it('returns 0 when no answers provided', () => {
      const questions = [createQuestion({ id: 'q1' })];
      expect(calculateScore(questions, {})).toBe(0);
    });

    it('returns 0 when all answers are undefined', () => {
      const questions = [
        createQuestion({ id: 'q1' }),
        createQuestion({ id: 'q2' }),
      ];
      expect(calculateScore(questions, { q1: undefined as unknown as QuizAnswer, q2: undefined as unknown as QuizAnswer })).toBe(0);
    });
  });

  describe('scoring accuracy', () => {
    it('calculates 100% for all correct', () => {
      const questions = [
        createQuestion({ id: 'q1', correctAnswer: 0 }),
        createQuestion({ id: 'q2', correctAnswer: 1 }),
        createQuestion({ id: 'q3', correctAnswer: 2 }),
      ];
      expect(calculateScore(questions, { q1: 0, q2: 1, q3: 2 })).toBe(100);
    });

    it('calculates 0% for all incorrect', () => {
      const questions = [
        createQuestion({ id: 'q1', correctAnswer: 0 }),
        createQuestion({ id: 'q2', correctAnswer: 1 }),
        createQuestion({ id: 'q3', correctAnswer: 2 }),
      ];
      expect(calculateScore(questions, { q1: 3, q2: 3, q3: 3 })).toBe(0);
    });

    it('calculates 50% for half correct', () => {
      const questions = [
        createQuestion({ id: 'q1', correctAnswer: 0 }),
        createQuestion({ id: 'q2', correctAnswer: 1 }),
      ];
      expect(calculateScore(questions, { q1: 0, q2: 3 })).toBe(50);
    });

    it('rounds to nearest integer', () => {
      const questions = [
        createQuestion({ id: 'q1', correctAnswer: 0 }),
        createQuestion({ id: 'q2', correctAnswer: 1 }),
        createQuestion({ id: 'q3', correctAnswer: 2 }),
      ];
      // 1/3 = 33.333...%, should round to 33
      expect(calculateScore(questions, { q1: 0, q2: 3, q3: 3 })).toBe(33);
      // 2/3 = 66.666...%, should round to 67
      expect(calculateScore(questions, { q1: 0, q2: 1, q3: 3 })).toBe(67);
    });
  });

  describe('mixed question types', () => {
    it('scores mixed question types correctly', () => {
      const questions = [
        createQuestion({ id: 'q1', type: 'multiple_choice', correctAnswer: 0 }),
        createQuestion({ id: 'q2', type: 'true_false', correctAnswer: true }),
        createQuestion({ id: 'q3', type: 'fill_blank', correctAnswer: 'answer' }),
        createQuestion({ id: 'q4', type: 'code_output', correctAnswer: '42' }),
      ];
      const answers = {
        q1: 0,
        q2: true,
        q3: 'ANSWER', // case-insensitive match
        q4: '42',
      };
      expect(calculateScore(questions, answers)).toBe(100);
    });

    it('handles partial answers in mixed types', () => {
      const questions = [
        createQuestion({ id: 'q1', type: 'multiple_choice', correctAnswer: 0 }),
        createQuestion({ id: 'q2', type: 'true_false', correctAnswer: true }),
        createQuestion({ id: 'q3', type: 'fill_blank', correctAnswer: 'answer' }),
        createQuestion({ id: 'q4', type: 'code_output', correctAnswer: '42' }),
      ];
      const answers = {
        q1: 0, // correct
        q2: false, // incorrect
        q3: 'wrong', // incorrect
        q4: '42', // correct
      };
      expect(calculateScore(questions, answers)).toBe(50);
    });
  });

  describe('extra answers handling', () => {
    it('ignores extra answers not in questions', () => {
      const questions = [
        createQuestion({ id: 'q1', correctAnswer: 0 }),
      ];
      const answers = {
        q1: 0,
        q2: 1, // Extra answer, should be ignored
        q3: 2, // Extra answer, should be ignored
      };
      expect(calculateScore(questions, answers)).toBe(100);
    });
  });
});

describe('Answer Validation Integration', () => {
  describe('realistic quiz scenarios', () => {
    it('validates a typical CS quiz', () => {
      const questions: QuizQuestion[] = [
        {
          id: 'q1',
          type: 'multiple_choice',
          prompt: 'What is 1+1?',
          options: ['1', '2', '3', '4'],
          correctAnswer: 1,
          explanation: '1+1=2',
        },
        {
          id: 'q2',
          type: 'true_false',
          prompt: 'Python is dynamically typed.',
          correctAnswer: true,
          explanation: 'Python determines types at runtime.',
        },
        {
          id: 'q3',
          type: 'code_output',
          prompt: 'What does print(2+2) output?',
          correctAnswer: '4',
          explanation: '2+2=4',
        },
        {
          id: 'q4',
          type: 'fill_blank',
          prompt: 'The ___ function prints to stdout.',
          correctAnswer: 'print',
          explanation: 'print() outputs to stdout.',
        },
      ];

      const allCorrect = { q1: 1, q2: true, q3: '4', q4: 'print' };
      expect(calculateScore(questions, allCorrect)).toBe(100);

      const halfCorrect = { q1: 1, q2: false, q3: '5', q4: 'print' };
      expect(calculateScore(questions, halfCorrect)).toBe(50);

      const noneCorrect = { q1: 0, q2: false, q3: '5', q4: 'echo' };
      expect(calculateScore(questions, noneCorrect)).toBe(0);
    });

    it('validates a math quiz with numeric answers', () => {
      const questions: QuizQuestion[] = [
        {
          id: 'q1',
          type: 'code_output',
          prompt: 'What is 2^3?',
          correctAnswer: '8',
          explanation: '2^3 = 8',
        },
        {
          id: 'q2',
          type: 'fill_blank',
          prompt: 'The derivative of x^2 is ___x',
          correctAnswer: '2',
          explanation: 'd/dx(x^2) = 2x',
        },
      ];

      const correct = { q1: '8', q2: '2' };
      expect(calculateScore(questions, correct)).toBe(100);

      // Test with whitespace variations
      const withWhitespace = { q1: ' 8 ', q2: '  2  ' };
      expect(calculateScore(questions, withWhitespace)).toBe(100);
    });
  });
});
