/**
 * Quiz Answer Matching Tests
 *
 * Tests for edge cases in quiz answer matching, including:
 * - String vs numeric correctAnswer handling for multiple choice
 * - Unicode and special character handling in answers
 * - Whitespace normalization in answers
 * - Case sensitivity handling
 */

import { describe, expect, it } from 'vitest';
import {
  normalizeAnswer,
  checkAnswer,
  getCorrectOptionIndex,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

describe('Multiple choice with string correctAnswer', () => {
  const createMCQuestion = (
    id: string,
    correctAnswer: string | number,
    options: string[]
  ): QuizQuestion => ({
    id,
    type: 'multiple_choice',
    prompt: 'Test question',
    options,
    correctAnswer,
    explanation: 'Test explanation',
  });

  it('handles correctAnswer as string matching an option exactly', () => {
    const question = createMCQuestion('q1', 'Option B', [
      'Option A',
      'Option B',
      'Option C',
      'Option D',
    ]);
    const index = getCorrectOptionIndex(question);
    expect(index).toBe(1);
    expect(checkAnswer(question, 1)).toBe(true);
    expect(checkAnswer(question, 0)).toBe(false);
  });

  it('handles correctAnswer as numeric index', () => {
    const question = createMCQuestion('q1', 2, [
      'Option A',
      'Option B',
      'Option C',
      'Option D',
    ]);
    const index = getCorrectOptionIndex(question);
    expect(index).toBe(2);
    expect(checkAnswer(question, 2)).toBe(true);
    expect(checkAnswer(question, 0)).toBe(false);
  });

  it('handles options with special characters', () => {
    const question = createMCQuestion('q1', 'O(n²)', [
      'O(1)',
      'O(n)',
      'O(n²)',
      'O(2^n)',
    ]);
    const index = getCorrectOptionIndex(question);
    expect(index).toBe(2);
    expect(checkAnswer(question, 2)).toBe(true);
  });

  it('handles options with mathematical notation', () => {
    const question = createMCQuestion('q1', '$\\frac{1}{2}$', [
      '$\\frac{1}{4}$',
      '$\\frac{1}{2}$',
      '$\\frac{3}{4}$',
      '$1$',
    ]);
    const index = getCorrectOptionIndex(question);
    expect(index).toBe(1);
  });

  it('returns -1 for string correctAnswer not matching any option', () => {
    const question = createMCQuestion('q1', 'Non-existent option', [
      'Option A',
      'Option B',
      'Option C',
      'Option D',
    ]);
    const index = getCorrectOptionIndex(question);
    expect(index).toBe(-1);
  });

  it('returns -1 for out-of-bounds numeric correctAnswer', () => {
    const question = createMCQuestion('q1', 10, [
      'Option A',
      'Option B',
      'Option C',
      'Option D',
    ]);
    const index = getCorrectOptionIndex(question);
    expect(index).toBe(-1);
  });

  it('returns -1 for negative numeric correctAnswer', () => {
    const question = createMCQuestion('q1', -1, [
      'Option A',
      'Option B',
      'Option C',
      'Option D',
    ]);
    const index = getCorrectOptionIndex(question);
    expect(index).toBe(-1);
  });
});

describe('Fill blank answer normalization', () => {
  const createFillBlankQuestion = (
    id: string,
    correctAnswer: string
  ): QuizQuestion => ({
    id,
    type: 'fill_blank',
    prompt: 'Test question with ____',
    correctAnswer,
    explanation: 'Test explanation',
  });

  it('matches answers case-insensitively', () => {
    const question = createFillBlankQuestion('q1', 'Algorithm');
    expect(checkAnswer(question, 'algorithm')).toBe(true);
    expect(checkAnswer(question, 'ALGORITHM')).toBe(true);
    expect(checkAnswer(question, 'AlGoRiThM')).toBe(true);
  });

  it('ignores leading and trailing whitespace', () => {
    const question = createFillBlankQuestion('q1', 'recursion');
    expect(checkAnswer(question, '  recursion  ')).toBe(true);
    expect(checkAnswer(question, '\trecursion\n')).toBe(true);
  });

  it('preserves internal whitespace for multi-word answers', () => {
    const question = createFillBlankQuestion('q1', 'binary search');
    expect(checkAnswer(question, 'binary search')).toBe(true);
    expect(checkAnswer(question, 'Binary Search')).toBe(true);
    // Multiple spaces should not match single space
    expect(normalizeAnswer('binary  search')).toBe('binary  search');
    expect(normalizeAnswer('binary search')).toBe('binary search');
  });

  it('handles numeric string answers', () => {
    const question = createFillBlankQuestion('q1', '42');
    expect(checkAnswer(question, '42')).toBe(true);
    expect(checkAnswer(question, ' 42 ')).toBe(true);
    expect(checkAnswer(question, 42 as any)).toBe(true);
  });

  it('handles answers with special characters', () => {
    const question = createFillBlankQuestion('q1', 'O(n)');
    expect(checkAnswer(question, 'O(n)')).toBe(true);
    expect(checkAnswer(question, 'o(n)')).toBe(true);
  });
});

describe('Code output answer matching', () => {
  const createCodeOutputQuestion = (
    id: string,
    correctAnswer: string,
    codeSnippet: string
  ): QuizQuestion => ({
    id,
    type: 'code_output',
    prompt: 'What is the output?',
    codeSnippet,
    correctAnswer,
    explanation: 'Test explanation',
  });

  it('matches exact output', () => {
    const question = createCodeOutputQuestion('q1', 'Hello, World!', 'print("Hello, World!")');
    expect(checkAnswer(question, 'Hello, World!')).toBe(true);
  });

  it('handles case-insensitive matching', () => {
    const question = createCodeOutputQuestion('q1', 'True', 'print(True)');
    expect(checkAnswer(question, 'true')).toBe(true);
    expect(checkAnswer(question, 'TRUE')).toBe(true);
  });

  it('handles numeric output', () => {
    const question = createCodeOutputQuestion('q1', '42', 'print(42)');
    expect(checkAnswer(question, '42')).toBe(true);
  });

  it('handles multi-line output with normalization', () => {
    const question = createCodeOutputQuestion('q1', 'Line1\nLine2', 'print("Line1\\nLine2")');
    expect(checkAnswer(question, 'Line1\nLine2')).toBe(true);
    expect(checkAnswer(question, 'line1\nline2')).toBe(true);
  });

  it('handles empty output', () => {
    const question = createCodeOutputQuestion('q1', '', 'pass');
    expect(checkAnswer(question, '')).toBe(true);
    expect(checkAnswer(question, '  ')).toBe(true);
  });
});

describe('True/false answer matching', () => {
  const createTrueFalseQuestion = (
    id: string,
    correctAnswer: boolean
  ): QuizQuestion => ({
    id,
    type: 'true_false',
    prompt: 'Is this statement true?',
    correctAnswer,
    explanation: 'Test explanation',
  });

  it('matches boolean true correctly', () => {
    const question = createTrueFalseQuestion('q1', true);
    expect(checkAnswer(question, true)).toBe(true);
    expect(checkAnswer(question, false)).toBe(false);
  });

  it('matches boolean false correctly', () => {
    const question = createTrueFalseQuestion('q1', false);
    expect(checkAnswer(question, false)).toBe(true);
    expect(checkAnswer(question, true)).toBe(false);
  });

  it('handles undefined answer as incorrect', () => {
    const question = createTrueFalseQuestion('q1', true);
    expect(checkAnswer(question, undefined)).toBe(false);
  });
});

describe('Score calculation with mixed question types', () => {
  it('calculates score with multiple question types', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'MC question',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: '',
      },
      {
        id: 'q2',
        type: 'true_false',
        prompt: 'TF question',
        correctAnswer: true,
        explanation: '',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        prompt: 'FB question',
        correctAnswer: 'answer',
        explanation: '',
      },
      {
        id: 'q4',
        type: 'code_output',
        prompt: 'CO question',
        codeSnippet: 'print(1)',
        correctAnswer: '1',
        explanation: '',
      },
    ];

    const allCorrect = {
      q1: 1,
      q2: true,
      q3: 'answer',
      q4: '1',
    };
    expect(calculateScore(questions, allCorrect)).toBe(100);

    const halfCorrect = {
      q1: 1,
      q2: true,
      q3: 'wrong',
      q4: '2',
    };
    expect(calculateScore(questions, halfCorrect)).toBe(50);

    const noneCorrect = {
      q1: 0,
      q2: false,
      q3: 'wrong',
      q4: '2',
    };
    expect(calculateScore(questions, noneCorrect)).toBe(0);
  });

  it('handles empty questions array', () => {
    expect(calculateScore([], {})).toBe(0);
  });

  it('handles missing answers as incorrect', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'MC question',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: '',
      },
      {
        id: 'q2',
        type: 'true_false',
        prompt: 'TF question',
        correctAnswer: true,
        explanation: '',
      },
    ];

    // Only q1 answered, q2 missing
    const answers = { q1: 1 };
    expect(calculateScore(questions, answers)).toBe(50);

    // No answers
    expect(calculateScore(questions, {})).toBe(0);
  });
});

describe('Unicode and international characters in answers', () => {
  it('handles Greek letters in answers', () => {
    expect(normalizeAnswer('Ω(n)')).toBe('ω(n)');
    expect(normalizeAnswer('Θ(n)')).toBe('θ(n)');
    expect(normalizeAnswer('λ')).toBe('λ');
  });

  it('handles accented characters', () => {
    expect(normalizeAnswer('Naïve')).toBe('naïve');
    expect(normalizeAnswer('Café')).toBe('café');
  });

  it('handles Chinese characters', () => {
    expect(normalizeAnswer('算法')).toBe('算法');
  });

  it('handles emoji (if present in answers)', () => {
    expect(normalizeAnswer('✓')).toBe('✓');
    expect(normalizeAnswer('→')).toBe('→');
  });
});

describe('Edge cases in answer normalization', () => {
  it('handles very long strings', () => {
    const longString = 'a'.repeat(10000);
    expect(normalizeAnswer(longString)).toBe(longString);
  });

  it('handles string with only newlines', () => {
    expect(normalizeAnswer('\n\n\n')).toBe('');
  });

  it('handles string with mixed whitespace types', () => {
    expect(normalizeAnswer('\t\n \r')).toBe('');
  });

  it('handles floating point numbers', () => {
    expect(normalizeAnswer(3.14159)).toBe('3.14159');
    expect(normalizeAnswer(0.0)).toBe('0');
  });

  it('handles negative numbers', () => {
    expect(normalizeAnswer(-42)).toBe('-42');
    expect(normalizeAnswer(-3.14)).toBe('-3.14');
  });

  it('handles scientific notation numbers', () => {
    expect(normalizeAnswer(1e10)).toBe('10000000000');
    expect(normalizeAnswer(1.5e-3)).toBe('0.0015');
  });
});
