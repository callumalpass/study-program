/**
 * Quiz Utilities Tests
 *
 * Comprehensive tests for the shared quiz utility functions.
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  isCodingAnswer,
  getCorrectOptionIndex,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer, CodingAnswer } from '../src/core/types';

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

const createTrueFalse = (id: string, correctAnswer: boolean): QuizQuestion => ({
  id,
  type: 'true_false',
  prompt: `Question ${id}`,
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

const createCodeOutput = (
  id: string,
  correctAnswer: string,
  codeSnippet = 'print("test")'
): QuizQuestion => ({
  id,
  type: 'code_output',
  prompt: `Question ${id}`,
  codeSnippet,
  correctAnswer,
  explanation: 'Explanation',
});

const createCoding = (id: string): QuizQuestion => ({
  id,
  type: 'coding',
  prompt: `Question ${id}`,
  correctAnswer: '',
  explanation: 'Explanation',
  starterCode: 'def solution():',
  testCases: [],
});

const createWritten = (id: string, correctAnswer: string): QuizQuestion => ({
  id,
  type: 'written',
  prompt: `Question ${id}`,
  correctAnswer,
  explanation: 'Explanation',
});

describe('normalizeAnswer', () => {
  describe('string normalization', () => {
    it('converts to lowercase', () => {
      expect(normalizeAnswer('HELLO')).toBe('hello');
      expect(normalizeAnswer('Hello')).toBe('hello');
      expect(normalizeAnswer('hElLo')).toBe('hello');
    });

    it('trims whitespace', () => {
      expect(normalizeAnswer('  hello  ')).toBe('hello');
      expect(normalizeAnswer('\thello\n')).toBe('hello');
      expect(normalizeAnswer('   ')).toBe('');
    });

    it('handles empty string', () => {
      expect(normalizeAnswer('')).toBe('');
    });

    it('preserves internal whitespace', () => {
      expect(normalizeAnswer('hello world')).toBe('hello world');
      expect(normalizeAnswer('  hello world  ')).toBe('hello world');
    });

    it('handles multi-line strings', () => {
      expect(normalizeAnswer('hello\nworld')).toBe('hello\nworld');
      expect(normalizeAnswer('  hello\nWORLD  ')).toBe('hello\nworld');
    });
  });

  describe('number conversion', () => {
    it('converts numbers to strings', () => {
      expect(normalizeAnswer(42)).toBe('42');
      expect(normalizeAnswer(0)).toBe('0');
      expect(normalizeAnswer(-5)).toBe('-5');
    });

    it('handles floating point numbers', () => {
      expect(normalizeAnswer(3.14)).toBe('3.14');
      expect(normalizeAnswer(0.5)).toBe('0.5');
    });
  });

  describe('boolean conversion', () => {
    it('converts booleans to strings', () => {
      expect(normalizeAnswer(true)).toBe('true');
      expect(normalizeAnswer(false)).toBe('false');
    });
  });

  describe('undefined and null handling', () => {
    it('returns empty string for undefined', () => {
      expect(normalizeAnswer(undefined)).toBe('');
    });

    it('returns empty string for null', () => {
      expect(normalizeAnswer(null)).toBe('');
    });
  });

  describe('case-insensitive comparison', () => {
    it('allows case-insensitive matching', () => {
      expect(normalizeAnswer('HELLO') === normalizeAnswer('hello')).toBe(true);
      expect(normalizeAnswer('Paris') === normalizeAnswer('PARIS')).toBe(true);
    });

    it('allows whitespace-trimmed matching', () => {
      expect(normalizeAnswer('  42  ') === normalizeAnswer('42')).toBe(true);
    });

    it('does not match different values', () => {
      expect(normalizeAnswer('hello') === normalizeAnswer('world')).toBe(false);
    });
  });
});

describe('isCodingAnswer', () => {
  it('returns true for valid CodingAnswer objects', () => {
    const answer: CodingAnswer = { code: 'def foo(): pass', passed: true };
    expect(isCodingAnswer(answer)).toBe(true);
  });

  it('returns true for CodingAnswer with empty code', () => {
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
    expect(isCodingAnswer('code')).toBe(false);
  });

  it('returns false for number', () => {
    expect(isCodingAnswer(42)).toBe(false);
  });

  it('returns false for boolean', () => {
    expect(isCodingAnswer(true)).toBe(false);
    expect(isCodingAnswer(false)).toBe(false);
  });

  it('returns false for object without code property', () => {
    expect(isCodingAnswer({ passed: true } as unknown as QuizAnswer)).toBe(false);
  });

  it('returns false for empty object', () => {
    expect(isCodingAnswer({} as unknown as QuizAnswer)).toBe(false);
  });
});

describe('getCorrectOptionIndex', () => {
  describe('numeric correctAnswer', () => {
    it('returns the index directly for numeric correctAnswer', () => {
      const question = createMultipleChoice('q1', 2);
      expect(getCorrectOptionIndex(question)).toBe(2);
    });

    it('returns 0 for first option', () => {
      const question = createMultipleChoice('q1', 0);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('returns index for last option', () => {
      const question = createMultipleChoice('q1', 3);
      expect(getCorrectOptionIndex(question)).toBe(3);
    });
  });

  describe('string correctAnswer', () => {
    it('finds index for string matching first option', () => {
      const question = createMultipleChoice('q1', 'A', ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('finds index for string matching last option', () => {
      const question = createMultipleChoice('q1', 'D', ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(3);
    });

    it('finds index for string with special characters', () => {
      const options = ['x² + y²', 'x + y', '2x', 'x/y'];
      const question = createMultipleChoice('q1', 'x² + y²', options);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('returns -1 for non-matching string', () => {
      const question = createMultipleChoice('q1', 'NotInOptions', ['A', 'B', 'C']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });
  });

  describe('edge cases', () => {
    it('handles question without options', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        correctAnswer: 'A',
        explanation: 'Test',
      };
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('handles boolean correctAnswer', () => {
      const question = createTrueFalse('q1', true);
      // For true_false questions, this function is not meant to be used,
      // but it should handle it gracefully
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });
  });
});

describe('checkAnswer', () => {
  describe('multiple_choice questions', () => {
    it('returns true for correct numeric answer', () => {
      const question = createMultipleChoice('q1', 2);
      expect(checkAnswer(question, 2)).toBe(true);
    });

    it('returns false for incorrect numeric answer', () => {
      const question = createMultipleChoice('q1', 2);
      expect(checkAnswer(question, 0)).toBe(false);
    });

    it('handles string correctAnswer', () => {
      const question = createMultipleChoice('q1', 'B', ['A', 'B', 'C', 'D']);
      expect(checkAnswer(question, 1)).toBe(true);
      expect(checkAnswer(question, 0)).toBe(false);
    });

    it('returns false for undefined answer', () => {
      const question = createMultipleChoice('q1', 2);
      expect(checkAnswer(question, undefined)).toBe(false);
    });
  });

  describe('true_false questions', () => {
    it('returns true for matching true answer', () => {
      const question = createTrueFalse('q1', true);
      expect(checkAnswer(question, true)).toBe(true);
    });

    it('returns true for matching false answer', () => {
      const question = createTrueFalse('q1', false);
      expect(checkAnswer(question, false)).toBe(true);
    });

    it('returns false for non-matching answer', () => {
      const question = createTrueFalse('q1', true);
      expect(checkAnswer(question, false)).toBe(false);
    });

    it('rejects string "true" or "false"', () => {
      const question = createTrueFalse('q1', true);
      expect(checkAnswer(question, 'true')).toBe(false);
      expect(checkAnswer(question, 'True')).toBe(false);
    });

    it('rejects numeric values', () => {
      const question = createTrueFalse('q1', true);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 0)).toBe(false);
    });
  });

  describe('fill_blank questions', () => {
    it('returns true for exact match', () => {
      const question = createFillBlank('q1', 'Paris');
      expect(checkAnswer(question, 'Paris')).toBe(true);
    });

    it('performs case-insensitive comparison', () => {
      const question = createFillBlank('q1', 'Paris');
      expect(checkAnswer(question, 'PARIS')).toBe(true);
      expect(checkAnswer(question, 'paris')).toBe(true);
      expect(checkAnswer(question, 'pArIs')).toBe(true);
    });

    it('trims whitespace', () => {
      const question = createFillBlank('q1', 'answer');
      expect(checkAnswer(question, '  answer  ')).toBe(true);
      expect(checkAnswer(question, '\tanswer\n')).toBe(true);
    });

    it('returns false for incorrect answer', () => {
      const question = createFillBlank('q1', 'Paris');
      expect(checkAnswer(question, 'London')).toBe(false);
    });

    it('handles empty string correctAnswer', () => {
      const question = createFillBlank('q1', '');
      expect(checkAnswer(question, '')).toBe(true);
      expect(checkAnswer(question, '   ')).toBe(true);
    });
  });

  describe('code_output questions', () => {
    it('returns true for exact match', () => {
      const question = createCodeOutput('q1', '42');
      expect(checkAnswer(question, '42')).toBe(true);
    });

    it('performs case-insensitive comparison', () => {
      const question = createCodeOutput('q1', 'Hello');
      expect(checkAnswer(question, 'hello')).toBe(true);
      expect(checkAnswer(question, 'HELLO')).toBe(true);
    });

    it('handles multi-line output', () => {
      const question = createCodeOutput('q1', 'hello\nworld');
      expect(checkAnswer(question, 'hello\nworld')).toBe(true);
      expect(checkAnswer(question, 'HELLO\nWORLD')).toBe(true);
    });

    it('returns false for incorrect answer', () => {
      const question = createCodeOutput('q1', '42');
      expect(checkAnswer(question, '43')).toBe(false);
    });
  });

  describe('written questions', () => {
    it('performs case-insensitive comparison', () => {
      const question = createWritten('q1', 'answer');
      expect(checkAnswer(question, 'ANSWER')).toBe(true);
    });
  });

  describe('coding questions', () => {
    it('returns true for passed CodingAnswer', () => {
      const question = createCoding('q1');
      expect(checkAnswer(question, { code: 'def foo(): pass', passed: true })).toBe(true);
    });

    it('returns false for failed CodingAnswer', () => {
      const question = createCoding('q1');
      expect(checkAnswer(question, { code: 'def foo(): pass', passed: false })).toBe(false);
    });

    it('returns false for non-CodingAnswer', () => {
      const question = createCoding('q1');
      expect(checkAnswer(question, 'code')).toBe(false);
      expect(checkAnswer(question, 42)).toBe(false);
      expect(checkAnswer(question, true)).toBe(false);
    });

    it('returns true for empty code with passed=true', () => {
      const question = createCoding('q1');
      expect(checkAnswer(question, { code: '', passed: true })).toBe(true);
    });
  });

  describe('undefined answer', () => {
    it('returns false for all question types', () => {
      expect(checkAnswer(createMultipleChoice('q1', 0), undefined)).toBe(false);
      expect(checkAnswer(createTrueFalse('q1', true), undefined)).toBe(false);
      expect(checkAnswer(createFillBlank('q1', 'test'), undefined)).toBe(false);
      expect(checkAnswer(createCodeOutput('q1', '42'), undefined)).toBe(false);
      expect(checkAnswer(createCoding('q1'), undefined)).toBe(false);
      expect(checkAnswer(createWritten('q1', 'test'), undefined)).toBe(false);
    });
  });
});

describe('calculateScore', () => {
  describe('basic scoring', () => {
    it('returns 100 for all correct answers', () => {
      const questions = [
        createMultipleChoice('q1', 0),
        createMultipleChoice('q2', 1),
        createMultipleChoice('q3', 2),
      ];
      const answers = { q1: 0, q2: 1, q3: 2 };
      expect(calculateScore(questions, answers)).toBe(100);
    });

    it('returns 0 for all incorrect answers', () => {
      const questions = [
        createMultipleChoice('q1', 0),
        createMultipleChoice('q2', 1),
        createMultipleChoice('q3', 2),
      ];
      const answers = { q1: 3, q2: 0, q3: 1 };
      expect(calculateScore(questions, answers)).toBe(0);
    });

    it('calculates partial scores correctly', () => {
      const questions = [
        createMultipleChoice('q1', 0),
        createMultipleChoice('q2', 1),
        createMultipleChoice('q3', 2),
        createMultipleChoice('q4', 3),
      ];
      const answers = { q1: 0, q2: 1, q3: 0, q4: 0 };
      // 2 correct out of 4 = 50%
      expect(calculateScore(questions, answers)).toBe(50);
    });
  });

  describe('mixed question types', () => {
    it('scores quiz with all question types correctly', () => {
      const questions: QuizQuestion[] = [
        createMultipleChoice('q1', 1),
        createTrueFalse('q2', true),
        createFillBlank('q3', 'Paris'),
        createCodeOutput('q4', '10'),
        createCoding('q5'),
        createWritten('q6', 'answer'),
      ];
      const answers: Record<string, QuizAnswer> = {
        q1: 1,
        q2: true,
        q3: 'paris',
        q4: '10',
        q5: { code: 'x', passed: true },
        q6: 'answer',
      };
      expect(calculateScore(questions, answers)).toBe(100);
    });
  });

  describe('edge cases', () => {
    it('returns 0 for empty questions array', () => {
      expect(calculateScore([], {})).toBe(0);
      expect(calculateScore([], { q1: 1, q2: 'test' })).toBe(0);
    });

    it('returns 0 when all answers are missing', () => {
      const questions = [
        createMultipleChoice('q1', 0),
        createTrueFalse('q2', true),
      ];
      expect(calculateScore(questions, {})).toBe(0);
    });

    it('handles single question quiz', () => {
      const questions = [createMultipleChoice('q1', 0)];
      expect(calculateScore(questions, { q1: 0 })).toBe(100);
      expect(calculateScore(questions, { q1: 1 })).toBe(0);
    });

    it('rounds percentage correctly', () => {
      // 1 out of 3 = 33.33... rounds to 33
      const questions = [
        createMultipleChoice('q1', 0),
        createMultipleChoice('q2', 0),
        createMultipleChoice('q3', 0),
      ];
      expect(calculateScore(questions, { q1: 0, q2: 1, q3: 1 })).toBe(33);
    });

    it('handles 1 out of 7 correctly (14.28%)', () => {
      const questions = Array.from({ length: 7 }, (_, i) =>
        createMultipleChoice(`q${i}`, 0)
      );
      const answers = { q0: 0 };
      expect(calculateScore(questions, answers)).toBe(14);
    });

    it('handles 6 out of 7 correctly (85.71%)', () => {
      const questions = Array.from({ length: 7 }, (_, i) =>
        createMultipleChoice(`q${i}`, 0)
      );
      const answers = { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 1 };
      expect(calculateScore(questions, answers)).toBe(86);
    });

    it('ignores extra answers not in questions', () => {
      const questions = [createMultipleChoice('q1', 0)];
      const answers = { q1: 0, q2: 1, q3: 2, q99: 'extra' };
      expect(calculateScore(questions, answers)).toBe(100);
    });
  });
});

describe('real-world scenarios', () => {
  it('handles typical CS101 quiz', () => {
    const questions: QuizQuestion[] = [
      createMultipleChoice('q1', 2, ['int', 'float', 'char', 'str']),
      createCodeOutput('q2', '2.5'),
      createTrueFalse('q3', false),
      createMultipleChoice('q4', 1, ['int x = 25', 'x = 25', 'var x = 25', 'let x = 25']),
      createCodeOutput('q5', 'str'),
    ];

    const perfectAnswers: Record<string, QuizAnswer> = {
      q1: 2,
      q2: '2.5',
      q3: false,
      q4: 1,
      q5: 'str',
    };
    expect(calculateScore(questions, perfectAnswers)).toBe(100);

    const partialAnswers: Record<string, QuizAnswer> = {
      q1: 2,
      q2: '2.5',
      q3: true, // incorrect
      q4: 0, // incorrect
      q5: 'str',
    };
    expect(calculateScore(questions, partialAnswers)).toBe(60);
  });

  it('handles multi-line code output', () => {
    const question = createCodeOutput('q1', 'hello\nHELLO');
    // Normalized: both become "hello\nhello"
    expect(checkAnswer(question, 'hello\nhello')).toBe(true);
    expect(checkAnswer(question, 'HELLO\nHELLO')).toBe(true);
  });
});

describe('numeric answer handling', () => {
  describe('code_output with numeric answers', () => {
    it('accepts numeric user input matching string correct answer', () => {
      // Correct answer is "42" as a string, but user provides 42 as a number
      const question = createCodeOutput('q1', '42');
      expect(checkAnswer(question, 42)).toBe(true);
    });

    it('accepts string user input matching string correct answer', () => {
      const question = createCodeOutput('q1', '42');
      expect(checkAnswer(question, '42')).toBe(true);
    });

    it('handles floating point answers', () => {
      const question = createCodeOutput('q1', '3.14');
      expect(checkAnswer(question, 3.14)).toBe(true);
      expect(checkAnswer(question, '3.14')).toBe(true);
    });

    it('handles negative numbers', () => {
      const question = createCodeOutput('q1', '-5');
      expect(checkAnswer(question, -5)).toBe(true);
      expect(checkAnswer(question, '-5')).toBe(true);
    });

    it('handles zero', () => {
      const question = createCodeOutput('q1', '0');
      expect(checkAnswer(question, 0)).toBe(true);
      expect(checkAnswer(question, '0')).toBe(true);
    });

    it('rejects numeric mismatches', () => {
      const question = createCodeOutput('q1', '42');
      expect(checkAnswer(question, 43)).toBe(false);
      expect(checkAnswer(question, '43')).toBe(false);
    });
  });

  describe('fill_blank with numeric answers', () => {
    it('accepts numeric user input matching string correct answer', () => {
      const question = createFillBlank('q1', '100');
      expect(checkAnswer(question, 100)).toBe(true);
    });

    it('handles floating point in fill_blank', () => {
      const question = createFillBlank('q1', '2.5');
      expect(checkAnswer(question, 2.5)).toBe(true);
      expect(checkAnswer(question, '2.5')).toBe(true);
    });

    it('handles math quiz numeric answers', () => {
      // Typical math quiz question: "What is 5 + 3?"
      const question = createFillBlank('q1', '8');
      expect(checkAnswer(question, 8)).toBe(true);
      expect(checkAnswer(question, '8')).toBe(true);
      expect(checkAnswer(question, '  8  ')).toBe(true);
    });
  });
});

describe('multiple choice bounds checking', () => {
  it('returns false for out-of-bounds positive index', () => {
    const question = createMultipleChoice('q1', 0, ['A', 'B', 'C']);
    expect(checkAnswer(question, 10)).toBe(false);
    expect(checkAnswer(question, 3)).toBe(false);
  });

  it('returns false for negative index', () => {
    const question = createMultipleChoice('q1', 0, ['A', 'B', 'C']);
    expect(checkAnswer(question, -1)).toBe(false);
    expect(checkAnswer(question, -999)).toBe(false);
  });

  it('handles question with empty options array', () => {
    const question = createMultipleChoice('q1', 0, []);
    expect(checkAnswer(question, 0)).toBe(false);
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('handles question with out-of-bounds correct answer', () => {
    const question = createMultipleChoice('q1', 10, ['A', 'B', 'C']);
    // The correct answer index is invalid, so no answer can be correct
    expect(checkAnswer(question, 0)).toBe(false);
    expect(checkAnswer(question, 10)).toBe(false);
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('handles negative correct answer index', () => {
    const question = createMultipleChoice('q1', -1, ['A', 'B', 'C']);
    expect(checkAnswer(question, 0)).toBe(false);
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });
});

describe('edge cases for answer normalization', () => {
  it('handles boolean answers to fill_blank questions', () => {
    const questionTrue = createFillBlank('q1', 'true');
    const questionFalse = createFillBlank('q2', 'false');

    // Boolean true should match string "true"
    expect(checkAnswer(questionTrue, true)).toBe(true);
    expect(checkAnswer(questionFalse, false)).toBe(true);
  });

  it('handles scientific notation', () => {
    const question = createCodeOutput('q1', '1e10');
    // Note: JavaScript's String(1e10) = "10000000000", not "1e10"
    // This test documents expected behavior
    expect(checkAnswer(question, '1e10')).toBe(true);
  });

  it('handles very large numbers', () => {
    const question = createCodeOutput('q1', '999999999999');
    expect(checkAnswer(question, 999999999999)).toBe(true);
  });

  it('handles answers with special characters preserved', () => {
    const question = createCodeOutput('q1', '[1, 2, 3]');
    expect(checkAnswer(question, '[1, 2, 3]')).toBe(true);
    expect(checkAnswer(question, '[1,2,3]')).toBe(false); // Different spacing matters
  });

  it('handles empty code_output answer', () => {
    const question = createCodeOutput('q1', '');
    expect(checkAnswer(question, '')).toBe(true);
    expect(checkAnswer(question, '   ')).toBe(true);
  });
});
