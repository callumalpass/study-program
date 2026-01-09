/**
 * Quiz Utils Null Answer Edge Cases
 *
 * Additional tests for null value handling in quiz answer checking.
 * Ensures null values from runtime (JSON parsing, API, etc.) are
 * treated consistently as "no answer" rather than the string "null".
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer } from '../src/core/types';

// Helper to create test questions
const createFillBlank = (id: string, correctAnswer: string): QuizQuestion => ({
  id,
  type: 'fill_blank',
  prompt: `Fill in the blank: ${id}`,
  correctAnswer,
  explanation: 'Explanation',
});

const createCodeOutput = (id: string, correctAnswer: string | number): QuizQuestion => ({
  id,
  type: 'code_output',
  prompt: `What is the output?`,
  codeSnippet: `print("test")`,
  correctAnswer,
  explanation: 'Explanation',
});

const createTrueFalse = (id: string, correctAnswer: boolean): QuizQuestion => ({
  id,
  type: 'true_false',
  prompt: `True or false: ${id}`,
  correctAnswer,
  explanation: 'Explanation',
});

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

describe('normalizeAnswer - null vs undefined consistency', () => {
  it('treats null the same as undefined', () => {
    expect(normalizeAnswer(null as unknown as string)).toBe(normalizeAnswer(undefined));
  });

  it('both null and undefined return empty string', () => {
    expect(normalizeAnswer(null as unknown as string)).toBe('');
    expect(normalizeAnswer(undefined)).toBe('');
  });

  it('null does not match the string "null"', () => {
    // This is important: if someone typed "null" as an answer, it should NOT match a null value
    const nullResult = normalizeAnswer(null as unknown as string);
    const stringNullResult = normalizeAnswer('null');
    expect(nullResult).not.toBe(stringNullResult);
  });
});

describe('checkAnswer - null answer handling', () => {
  describe('fill_blank questions', () => {
    it('null answer does not match non-empty correct answer', () => {
      const question = createFillBlank('q1', 'correct');
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });

    it('null answer matches empty string correct answer', () => {
      const question = createFillBlank('q1', '');
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(true);
    });

    it('null answer does NOT match the string "null"', () => {
      const question = createFillBlank('q1', 'null');
      // Previously this was a bug - null would become "null" and match
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('code_output questions', () => {
    it('null answer does not match numeric correct answer', () => {
      const question = createCodeOutput('q1', 42);
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });

    it('null answer does not match string correct answer', () => {
      const question = createCodeOutput('q1', 'output');
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });

    it('null answer does NOT match the string "null"', () => {
      const question = createCodeOutput('q1', 'null');
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('true_false questions', () => {
    it('null answer does not match true', () => {
      const question = createTrueFalse('q1', true);
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });

    it('null answer does not match false', () => {
      const question = createTrueFalse('q1', false);
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('multiple_choice questions', () => {
    it('null answer does not match any option', () => {
      const question = createMultipleChoice('q1', 0);
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });

    it('null answer does not match index 0', () => {
      // Edge case: null could potentially be coerced to 0 in some contexts
      const question = createMultipleChoice('q1', 0);
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
    });
  });
});

describe('calculateScore - null answers in record', () => {
  it('counts null answers as incorrect', () => {
    const questions = [
      createFillBlank('q1', 'a'),
      createFillBlank('q2', 'b'),
      createFillBlank('q3', 'c'),
    ];
    const answers: Record<string, QuizAnswer | null> = {
      q1: 'a',           // correct
      q2: null,          // null - should be wrong
      q3: 'c',           // correct
    };

    expect(calculateScore(questions, answers as Record<string, QuizAnswer>)).toBe(67); // 2/3 rounded
  });

  it('mixed null and undefined answers', () => {
    const questions = [
      createFillBlank('q1', 'a'),
      createFillBlank('q2', 'b'),
      createFillBlank('q3', 'c'),
      createFillBlank('q4', 'd'),
    ];
    const answers: Record<string, QuizAnswer | null | undefined> = {
      q1: 'a',           // correct
      q2: null,          // null - wrong
      q3: undefined,     // undefined - wrong
      // q4 missing - wrong
    };

    expect(calculateScore(questions, answers as Record<string, QuizAnswer>)).toBe(25); // 1/4
  });

  it('all null answers should give 0%', () => {
    const questions = [
      createFillBlank('q1', 'a'),
      createFillBlank('q2', 'b'),
    ];
    const answers: Record<string, QuizAnswer | null> = {
      q1: null,
      q2: null,
    };

    expect(calculateScore(questions, answers as Record<string, QuizAnswer>)).toBe(0);
  });
});

describe('edge cases - special null-like values', () => {
  it('string "null" is a valid answer (not treated as null)', () => {
    const question = createFillBlank('q1', 'null');
    expect(checkAnswer(question, 'null')).toBe(true);
  });

  it('string "undefined" is a valid answer', () => {
    const question = createFillBlank('q1', 'undefined');
    expect(checkAnswer(question, 'undefined')).toBe(true);
  });

  it('string "none" is a valid answer', () => {
    const question = createFillBlank('q1', 'none');
    expect(checkAnswer(question, 'none')).toBe(true);
  });

  it('empty string is valid when correct answer is empty', () => {
    const question = createFillBlank('q1', '');
    expect(checkAnswer(question, '')).toBe(true);
  });
});

describe('JSON parsing simulation - null values from external sources', () => {
  it('simulates null value from JSON.parse', () => {
    // When JSON has null values, they become actual null in JS
    const jsonData = JSON.parse('{"answer": null}');
    const question = createFillBlank('q1', 'expected');
    expect(checkAnswer(question, jsonData.answer)).toBe(false);
  });

  it('simulates missing property (undefined) from JSON', () => {
    const jsonData = JSON.parse('{}');
    const question = createFillBlank('q1', 'expected');
    expect(checkAnswer(question, jsonData.answer)).toBe(false);
  });

  it('handles array of answers with some nulls', () => {
    const jsonData = JSON.parse('{"answers": {"q1": "a", "q2": null, "q3": "c"}}');
    const questions = [
      createFillBlank('q1', 'a'),
      createFillBlank('q2', 'b'),
      createFillBlank('q3', 'c'),
    ];

    expect(calculateScore(questions, jsonData.answers)).toBe(67); // 2/3 rounded
  });
});
