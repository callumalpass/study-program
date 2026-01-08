/**
 * Quiz Answer Type Coercion Tests
 *
 * Tests for improved answer handling where numeric and boolean values
 * are properly coerced to strings for comparison in fill_blank, code_output,
 * and written question types.
 *
 * This addresses the bug where numeric answers (e.g., 5) would be rejected
 * for fill_blank/code_output questions expecting "5" as the answer.
 */

import { describe, expect, it } from 'vitest';
import { checkAnswer, normalizeAnswer, calculateScore } from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer } from '../src/core/types';

// Helper functions to create test questions
const createFillBlankQuestion = (id: string, correctAnswer: string | number): QuizQuestion => ({
  id,
  type: 'fill_blank',
  prompt: `Fill in the blank for ${id}`,
  correctAnswer,
  explanation: 'Test explanation',
});

const createCodeOutputQuestion = (id: string, correctAnswer: string | number): QuizQuestion => ({
  id,
  type: 'code_output',
  prompt: `What is the output?`,
  codeSnippet: 'print("test")',
  correctAnswer,
  explanation: 'Test explanation',
});

const createWrittenQuestion = (id: string, correctAnswer: string): QuizQuestion => ({
  id,
  type: 'written',
  prompt: `Write your answer`,
  correctAnswer,
  explanation: 'Test explanation',
});

describe('Type coercion in answer checking', () => {
  describe('fill_blank questions', () => {
    it('accepts string answer matching string correctAnswer', () => {
      const question = createFillBlankQuestion('q1', '42');
      expect(checkAnswer(question, '42')).toBe(true);
    });

    it('accepts numeric answer matching string correctAnswer', () => {
      const question = createFillBlankQuestion('q1', '42');
      // This was the bug: numeric 42 should match string "42"
      expect(checkAnswer(question, 42 as unknown as QuizAnswer)).toBe(true);
    });

    it('accepts string answer matching numeric correctAnswer', () => {
      const question = createFillBlankQuestion('q1', 42);
      expect(checkAnswer(question, '42')).toBe(true);
    });

    it('accepts numeric answer matching numeric correctAnswer', () => {
      const question = createFillBlankQuestion('q1', 42);
      expect(checkAnswer(question, 42 as unknown as QuizAnswer)).toBe(true);
    });

    it('rejects non-matching numeric answer', () => {
      const question = createFillBlankQuestion('q1', '42');
      expect(checkAnswer(question, 43 as unknown as QuizAnswer)).toBe(false);
    });

    it('handles floating point numbers', () => {
      const question = createFillBlankQuestion('q1', '3.14');
      expect(checkAnswer(question, 3.14 as unknown as QuizAnswer)).toBe(true);
      expect(checkAnswer(question, '3.14')).toBe(true);
    });

    it('handles negative numbers', () => {
      const question = createFillBlankQuestion('q1', '-5');
      expect(checkAnswer(question, -5 as unknown as QuizAnswer)).toBe(true);
      expect(checkAnswer(question, '-5')).toBe(true);
    });

    it('handles zero', () => {
      const question = createFillBlankQuestion('q1', '0');
      expect(checkAnswer(question, 0 as unknown as QuizAnswer)).toBe(true);
      expect(checkAnswer(question, '0')).toBe(true);
    });
  });

  describe('code_output questions', () => {
    it('accepts numeric answer matching expected output', () => {
      const question = createCodeOutputQuestion('q1', '1024');
      expect(checkAnswer(question, 1024 as unknown as QuizAnswer)).toBe(true);
    });

    it('accepts boolean answer when output is boolean-like string', () => {
      const question = createCodeOutputQuestion('q1', 'True');
      // Boolean true normalizes to "true" which matches "True" case-insensitively
      expect(checkAnswer(question, true as unknown as QuizAnswer)).toBe(true);
    });

    it('accepts boolean false when output is False', () => {
      const question = createCodeOutputQuestion('q1', 'False');
      expect(checkAnswer(question, false as unknown as QuizAnswer)).toBe(true);
    });

    it('rejects boolean when output is different value', () => {
      const question = createCodeOutputQuestion('q1', 'Yes');
      // "true" !== "yes"
      expect(checkAnswer(question, true as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('written questions', () => {
    it('accepts string answer matching correctly', () => {
      const question = createWrittenQuestion('q1', 'recursion');
      expect(checkAnswer(question, 'recursion')).toBe(true);
      expect(checkAnswer(question, 'RECURSION')).toBe(true); // case-insensitive
    });

    it('handles numeric answers when applicable', () => {
      const question = createWrittenQuestion('q1', '42');
      expect(checkAnswer(question, 42 as unknown as QuizAnswer)).toBe(true);
    });
  });

  describe('calculateScore with mixed answer types', () => {
    it('correctly scores quiz with numeric and string answers', () => {
      const questions: QuizQuestion[] = [
        createFillBlankQuestion('q1', '255'),
        createCodeOutputQuestion('q2', '1024'),
        createFillBlankQuestion('q3', 'hello'),
      ];

      const answers: Record<string, QuizAnswer> = {
        q1: 255 as unknown as QuizAnswer, // numeric answer for string correctAnswer
        q2: '1024', // string answer for string correctAnswer
        q3: 'HELLO', // case-insensitive match
      };

      expect(calculateScore(questions, answers)).toBe(100);
    });

    it('correctly handles partial correct with mixed types', () => {
      const questions: QuizQuestion[] = [
        createFillBlankQuestion('q1', '42'),
        createFillBlankQuestion('q2', '43'),
      ];

      const answers: Record<string, QuizAnswer> = {
        q1: 42 as unknown as QuizAnswer, // correct
        q2: 44 as unknown as QuizAnswer, // incorrect
      };

      expect(calculateScore(questions, answers)).toBe(50);
    });
  });

  describe('normalizeAnswer helper', () => {
    it('converts numbers to strings', () => {
      expect(normalizeAnswer(42)).toBe('42');
      expect(normalizeAnswer(0)).toBe('0');
      expect(normalizeAnswer(-1)).toBe('-1');
      expect(normalizeAnswer(3.14159)).toBe('3.14159');
    });

    it('converts booleans to lowercase strings', () => {
      expect(normalizeAnswer(true)).toBe('true');
      expect(normalizeAnswer(false)).toBe('false');
    });

    it('handles undefined', () => {
      expect(normalizeAnswer(undefined)).toBe('');
    });

    it('lowercases and trims strings', () => {
      expect(normalizeAnswer('  HELLO  ')).toBe('hello');
      expect(normalizeAnswer('World')).toBe('world');
    });
  });

  describe('edge cases', () => {
    it('does not accept CodingAnswer objects for fill_blank', () => {
      const question = createFillBlankQuestion('q1', 'test');
      const codingAnswer = { code: 'test', passed: true };
      expect(checkAnswer(question, codingAnswer)).toBe(false);
    });

    it('handles empty string correctly', () => {
      const question = createFillBlankQuestion('q1', '');
      expect(checkAnswer(question, '')).toBe(true);
      expect(checkAnswer(question, '   ')).toBe(true); // whitespace-only normalizes to empty
    });

    it('handles undefined answer', () => {
      const question = createFillBlankQuestion('q1', '42');
      expect(checkAnswer(question, undefined)).toBe(false);
    });

    it('handles whitespace in numeric answers', () => {
      const question = createFillBlankQuestion('q1', '42');
      expect(checkAnswer(question, '  42  ')).toBe(true);
    });
  });
});
