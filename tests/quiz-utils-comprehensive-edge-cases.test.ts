/**
 * Comprehensive Quiz Utils Edge Cases Tests
 *
 * These tests cover additional edge cases for quiz answer validation and scoring,
 * particularly around:
 * - Unicode and special character handling
 * - Very large/small numbers
 * - Empty and whitespace variations
 * - Type coercion edge cases
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

// Helper function to create questions
const createQuestion = (type: QuizQuestion['type'], overrides: Partial<QuizQuestion> = {}): QuizQuestion => ({
  id: 'test-q',
  type,
  prompt: 'Test prompt',
  correctAnswer: type === 'multiple_choice' ? 0 : type === 'true_false' ? true : 'answer',
  explanation: 'Test explanation',
  ...overrides,
});

describe('normalizeAnswer comprehensive edge cases', () => {
  describe('unicode and special characters', () => {
    it('handles unicode strings', () => {
      expect(normalizeAnswer('カタカナ')).toBe('カタカナ');
      expect(normalizeAnswer('émojis 🎉')).toBe('émojis 🎉');
      expect(normalizeAnswer('中文字符')).toBe('中文字符');
    });

    it('handles mathematical symbols', () => {
      expect(normalizeAnswer('π')).toBe('π');
      expect(normalizeAnswer('√2')).toBe('√2');
      expect(normalizeAnswer('∑')).toBe('∑');
      expect(normalizeAnswer('≤')).toBe('≤');
    });

    it('handles currency symbols', () => {
      expect(normalizeAnswer('$100')).toBe('$100');
      expect(normalizeAnswer('€50')).toBe('€50');
      expect(normalizeAnswer('£25')).toBe('£25');
    });

    it('handles backslash in answers', () => {
      expect(normalizeAnswer('a\\b')).toBe('a\\b');
      expect(normalizeAnswer('path\\to\\file')).toBe('path\\to\\file');
    });

    it('handles quotes in answers', () => {
      expect(normalizeAnswer("it's")).toBe("it's");
      expect(normalizeAnswer('"quoted"')).toBe('"quoted"');
      expect(normalizeAnswer('`backtick`')).toBe('`backtick`');
    });
  });

  describe('numeric edge cases', () => {
    it('handles very large numbers', () => {
      expect(normalizeAnswer(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991');
      expect(normalizeAnswer(1e15)).toBe('1000000000000000');
    });

    it('handles very small numbers', () => {
      expect(normalizeAnswer(0.000001)).toBe('0.000001');
      expect(normalizeAnswer(1e-10)).toBe('1e-10');
    });

    it('handles negative numbers', () => {
      expect(normalizeAnswer(-42)).toBe('-42');
      expect(normalizeAnswer(-0)).toBe('0');
    });

    it('handles scientific notation', () => {
      expect(normalizeAnswer(1.23e5)).toBe('123000');
      expect(normalizeAnswer(1.23e-5)).toBe('0.0000123');
    });
  });

  describe('whitespace variations', () => {
    it('trims leading whitespace', () => {
      expect(normalizeAnswer('   answer')).toBe('answer');
    });

    it('trims trailing whitespace', () => {
      expect(normalizeAnswer('answer   ')).toBe('answer');
    });

    it('trims both leading and trailing whitespace', () => {
      expect(normalizeAnswer('   answer   ')).toBe('answer');
    });

    it('preserves internal whitespace', () => {
      expect(normalizeAnswer('hello world')).toBe('hello world');
      expect(normalizeAnswer('a  b')).toBe('a  b'); // Multiple spaces
    });

    it('handles tab characters', () => {
      expect(normalizeAnswer('\tanswer\t')).toBe('answer');
    });

    it('handles newline characters', () => {
      expect(normalizeAnswer('\nanswer\n')).toBe('answer');
    });

    it('handles mixed whitespace', () => {
      expect(normalizeAnswer(' \t\n answer \t\n ')).toBe('answer');
    });
  });

  describe('case normalization', () => {
    it('converts uppercase to lowercase', () => {
      expect(normalizeAnswer('ANSWER')).toBe('answer');
    });

    it('handles mixed case', () => {
      expect(normalizeAnswer('AnSwEr')).toBe('answer');
    });

    it('handles CamelCase', () => {
      expect(normalizeAnswer('camelCase')).toBe('camelcase');
    });
  });
});

describe('checkAnswer comprehensive edge cases', () => {
  describe('multiple choice edge cases', () => {
    it('handles question with only 2 options', () => {
      const question = createQuestion('multiple_choice', {
        options: ['Yes', 'No'],
        correctAnswer: 0,
      });
      expect(checkAnswer(question, 0)).toBe(true);
      expect(checkAnswer(question, 1)).toBe(false);
    });

    it('handles string correctAnswer that matches option', () => {
      const question = createQuestion('multiple_choice', {
        options: ['Apple', 'Banana', 'Cherry'],
        correctAnswer: 'Banana',
      });
      expect(checkAnswer(question, 1)).toBe(true);
      expect(checkAnswer(question, 0)).toBe(false);
    });

    it('returns false when correctAnswer index is invalid', () => {
      const question = createQuestion('multiple_choice', {
        options: ['A', 'B'],
        correctAnswer: 5, // Out of bounds
      });
      expect(checkAnswer(question, 5)).toBe(false);
    });

    it('returns false when correctAnswer string does not match any option', () => {
      const question = createQuestion('multiple_choice', {
        options: ['A', 'B', 'C'],
        correctAnswer: 'D', // Not in options
      });
      expect(checkAnswer(question, 3)).toBe(false);
    });

    it('handles options with special characters', () => {
      const question = createQuestion('multiple_choice', {
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n!)'],
        correctAnswer: 1,
      });
      expect(checkAnswer(question, 1)).toBe(true);
    });
  });

  describe('true_false edge cases', () => {
    it('requires exact boolean match for true', () => {
      const question = createQuestion('true_false', { correctAnswer: true });
      expect(checkAnswer(question, true)).toBe(true);
      expect(checkAnswer(question, false)).toBe(false);
    });

    it('requires exact boolean match for false', () => {
      const question = createQuestion('true_false', { correctAnswer: false });
      expect(checkAnswer(question, false)).toBe(true);
      expect(checkAnswer(question, true)).toBe(false);
    });

    it('does not accept string "true" for boolean true', () => {
      const question = createQuestion('true_false', { correctAnswer: true });
      // String answer won't match boolean correctAnswer via strict equality
      expect(checkAnswer(question, 'true' as unknown as boolean)).toBe(false);
    });
  });

  describe('fill_blank edge cases', () => {
    it('is case-insensitive', () => {
      const question = createQuestion('fill_blank', { correctAnswer: 'ANSWER' });
      expect(checkAnswer(question, 'answer')).toBe(true);
      expect(checkAnswer(question, 'Answer')).toBe(true);
      expect(checkAnswer(question, 'ANSWER')).toBe(true);
    });

    it('trims whitespace from answer', () => {
      const question = createQuestion('fill_blank', { correctAnswer: 'answer' });
      expect(checkAnswer(question, '  answer  ')).toBe(true);
    });

    it('handles numeric correctAnswer and string answer', () => {
      const question = createQuestion('fill_blank', { correctAnswer: 42 as unknown as string });
      expect(checkAnswer(question, '42')).toBe(true);
      expect(checkAnswer(question, '42.0')).toBe(false); // Different string representation
    });

    it('handles empty string answer', () => {
      const question = createQuestion('fill_blank', { correctAnswer: '' });
      expect(checkAnswer(question, '')).toBe(true);
      expect(checkAnswer(question, '   ')).toBe(true); // Whitespace trims to empty
    });

    it('handles answer with leading/trailing spaces in correctAnswer', () => {
      const question = createQuestion('fill_blank', { correctAnswer: '  answer  ' });
      expect(checkAnswer(question, 'answer')).toBe(true);
    });
  });

  describe('code_output edge cases', () => {
    it('compares output exactly after normalization', () => {
      const question = createQuestion('code_output', {
        codeSnippet: 'print(5)',
        correctAnswer: '5',
      });
      expect(checkAnswer(question, '5')).toBe(true);
      expect(checkAnswer(question, ' 5 ')).toBe(true); // Whitespace trimmed
      expect(checkAnswer(question, '5.0')).toBe(false); // Different
    });

    it('handles multi-line output normalization', () => {
      const question = createQuestion('code_output', {
        codeSnippet: 'print("a\\nb")',
        correctAnswer: 'a\nb',
      });
      expect(checkAnswer(question, 'a\nb')).toBe(true);
    });

    it('is case-insensitive', () => {
      const question = createQuestion('code_output', {
        codeSnippet: 'print("Hello")',
        correctAnswer: 'Hello',
      });
      expect(checkAnswer(question, 'hello')).toBe(true);
      expect(checkAnswer(question, 'HELLO')).toBe(true);
    });
  });

  describe('coding question edge cases', () => {
    it('checks passed flag for coding answers', () => {
      const question = createQuestion('coding', {
        starterCode: 'def f(): pass',
        solution: 'def f(): return 1',
        testCases: [],
      });

      const passedAnswer: CodingAnswer = { code: 'def f(): return 1', passed: true };
      const failedAnswer: CodingAnswer = { code: 'def f(): return 0', passed: false };

      expect(checkAnswer(question, passedAnswer)).toBe(true);
      expect(checkAnswer(question, failedAnswer)).toBe(false);
    });

    it('returns false for non-CodingAnswer on coding questions', () => {
      const question = createQuestion('coding', {
        starterCode: 'def f(): pass',
        solution: 'def f(): return 1',
        testCases: [],
      });
      expect(checkAnswer(question, 'def f(): return 1')).toBe(false);
      expect(checkAnswer(question, 42)).toBe(false);
    });
  });

  describe('undefined and null answers', () => {
    it('returns false for undefined answer', () => {
      const question = createQuestion('fill_blank', { correctAnswer: 'answer' });
      expect(checkAnswer(question, undefined)).toBe(false);
    });

    it('returns false for null answer', () => {
      const question = createQuestion('fill_blank', { correctAnswer: 'answer' });
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('unknown question types', () => {
    it('returns false for unknown question type', () => {
      const question = createQuestion('fill_blank', { correctAnswer: 'answer' });
      (question as { type: string }).type = 'unknown_type';
      expect(checkAnswer(question, 'answer')).toBe(false);
    });
  });
});

describe('calculateScore comprehensive edge cases', () => {
  it('handles all correct answers', () => {
    const questions = [
      createQuestion('multiple_choice', { id: 'q1', options: ['A', 'B'], correctAnswer: 0 }),
      createQuestion('true_false', { id: 'q2', correctAnswer: true }),
      createQuestion('fill_blank', { id: 'q3', correctAnswer: 'answer' }),
    ];
    const answers = { q1: 0, q2: true, q3: 'answer' };
    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles all incorrect answers', () => {
    const questions = [
      createQuestion('multiple_choice', { id: 'q1', options: ['A', 'B'], correctAnswer: 0 }),
      createQuestion('true_false', { id: 'q2', correctAnswer: true }),
      createQuestion('fill_blank', { id: 'q3', correctAnswer: 'answer' }),
    ];
    const answers = { q1: 1, q2: false, q3: 'wrong' };
    expect(calculateScore(questions, answers)).toBe(0);
  });

  it('handles mixed answers', () => {
    const questions = [
      createQuestion('multiple_choice', { id: 'q1', options: ['A', 'B'], correctAnswer: 0 }),
      createQuestion('true_false', { id: 'q2', correctAnswer: true }),
    ];
    const answers = { q1: 0, q2: false }; // 1 correct, 1 wrong
    expect(calculateScore(questions, answers)).toBe(50);
  });

  it('handles missing answers as incorrect', () => {
    const questions = [
      createQuestion('multiple_choice', { id: 'q1', options: ['A', 'B'], correctAnswer: 0 }),
      createQuestion('true_false', { id: 'q2', correctAnswer: true }),
    ];
    const answers = { q1: 0 }; // q2 not answered
    expect(calculateScore(questions, answers)).toBe(50);
  });

  it('handles empty questions array', () => {
    expect(calculateScore([], {})).toBe(0);
  });

  it('handles single question', () => {
    const questions = [
      createQuestion('true_false', { id: 'q1', correctAnswer: true }),
    ];
    expect(calculateScore(questions, { q1: true })).toBe(100);
    expect(calculateScore(questions, { q1: false })).toBe(0);
  });

  it('rounds percentage correctly', () => {
    const questions = [
      createQuestion('true_false', { id: 'q1', correctAnswer: true }),
      createQuestion('true_false', { id: 'q2', correctAnswer: true }),
      createQuestion('true_false', { id: 'q3', correctAnswer: true }),
    ];
    const answers = { q1: true }; // 1 out of 3 = 33.33%
    expect(calculateScore(questions, answers)).toBe(33);
  });

  it('rounds 66.67% to 67%', () => {
    const questions = [
      createQuestion('true_false', { id: 'q1', correctAnswer: true }),
      createQuestion('true_false', { id: 'q2', correctAnswer: true }),
      createQuestion('true_false', { id: 'q3', correctAnswer: true }),
    ];
    const answers = { q1: true, q2: true }; // 2 out of 3 = 66.67%
    expect(calculateScore(questions, answers)).toBe(67);
  });
});

describe('getCorrectOptionIndex comprehensive edge cases', () => {
  it('returns correct index for numeric correctAnswer', () => {
    const question = createQuestion('multiple_choice', {
      options: ['A', 'B', 'C'],
      correctAnswer: 1,
    });
    expect(getCorrectOptionIndex(question)).toBe(1);
  });

  it('returns correct index for string correctAnswer', () => {
    const question = createQuestion('multiple_choice', {
      options: ['Apple', 'Banana', 'Cherry'],
      correctAnswer: 'Banana',
    });
    expect(getCorrectOptionIndex(question)).toBe(1);
  });

  it('returns -1 for out of bounds numeric index', () => {
    const question = createQuestion('multiple_choice', {
      options: ['A', 'B'],
      correctAnswer: 5,
    });
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns -1 for negative index', () => {
    const question = createQuestion('multiple_choice', {
      options: ['A', 'B'],
      correctAnswer: -1,
    });
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns -1 for string that does not match any option', () => {
    const question = createQuestion('multiple_choice', {
      options: ['A', 'B', 'C'],
      correctAnswer: 'D',
    });
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns -1 when options is undefined', () => {
    const question = createQuestion('multiple_choice', {
      correctAnswer: 0,
    });
    delete question.options;
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('handles case-sensitive string matching', () => {
    const question = createQuestion('multiple_choice', {
      options: ['apple', 'APPLE', 'Apple'],
      correctAnswer: 'Apple',
    });
    expect(getCorrectOptionIndex(question)).toBe(2); // Exact match at index 2
  });
});

describe('isCodingAnswer type guard', () => {
  it('returns true for valid CodingAnswer', () => {
    const answer: CodingAnswer = { code: 'print(1)', passed: true };
    expect(isCodingAnswer(answer)).toBe(true);
  });

  it('returns true for CodingAnswer with passed=false', () => {
    const answer: CodingAnswer = { code: 'print(1)', passed: false };
    expect(isCodingAnswer(answer)).toBe(true);
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

  it('returns false for undefined', () => {
    expect(isCodingAnswer(undefined)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isCodingAnswer(null as unknown as QuizAnswer)).toBe(false);
  });

  it('returns false for object without code property', () => {
    expect(isCodingAnswer({ passed: true } as unknown as QuizAnswer)).toBe(false);
  });

  it('returns true for object with code property (even without passed)', () => {
    expect(isCodingAnswer({ code: 'test' } as unknown as QuizAnswer)).toBe(true);
  });

  it('returns false for empty object', () => {
    expect(isCodingAnswer({} as unknown as QuizAnswer)).toBe(false);
  });

  it('returns false for array', () => {
    expect(isCodingAnswer(['code'] as unknown as QuizAnswer)).toBe(false);
  });
});
