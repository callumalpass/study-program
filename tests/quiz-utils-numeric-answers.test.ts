/**
 * Quiz Utils Numeric Answers Tests
 *
 * Tests edge cases where numeric values might be used for code_output/fill_blank questions.
 * These tests ensure the answer comparison logic handles type coercion correctly.
 */

import { describe, expect, it } from 'vitest';
import { checkAnswer, normalizeAnswer, calculateScore } from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer, CodingAnswer } from '../src/core/types';

describe('checkAnswer with numeric correctAnswer values', () => {
  describe('code_output questions with numeric expected output', () => {
    const codeOutputQuestion: QuizQuestion = {
      id: 'code-numeric',
      type: 'code_output',
      prompt: 'What does print(2 + 3) output?',
      codeSnippet: 'print(2 + 3)',
      correctAnswer: '5', // Stored as string
      explanation: 'Basic addition',
    };

    it('accepts string answer matching numeric correctAnswer', () => {
      expect(checkAnswer(codeOutputQuestion, '5')).toBe(true);
    });

    it('accepts string answer with whitespace', () => {
      expect(checkAnswer(codeOutputQuestion, '  5  ')).toBe(true);
    });

    it('accepts numeric answer type when it matches', () => {
      // Although UI typically sends strings, numeric answers should be
      // accepted when they match the expected value (more robust)
      expect(checkAnswer(codeOutputQuestion, 5)).toBe(true);
    });

    it('rejects boolean answer type', () => {
      expect(checkAnswer(codeOutputQuestion, true)).toBe(false);
      expect(checkAnswer(codeOutputQuestion, false)).toBe(false);
    });

    it('rejects CodingAnswer object', () => {
      const codingAnswer: CodingAnswer = { code: '5', passed: true };
      expect(checkAnswer(codeOutputQuestion, codingAnswer)).toBe(false);
    });
  });

  describe('fill_blank questions with numeric expected answer', () => {
    const fillNumericQuestion: QuizQuestion = {
      id: 'fill-numeric',
      type: 'fill_blank',
      prompt: 'The time complexity of binary search is O(log ___)',
      correctAnswer: 'n',
      explanation: 'Binary search has O(log n) complexity',
    };

    it('accepts case-insensitive string match', () => {
      expect(checkAnswer(fillNumericQuestion, 'n')).toBe(true);
      expect(checkAnswer(fillNumericQuestion, 'N')).toBe(true);
    });

    it('rejects partial matches', () => {
      expect(checkAnswer(fillNumericQuestion, 'n2')).toBe(false);
      expect(checkAnswer(fillNumericQuestion, 'log n')).toBe(false);
    });
  });

  describe('code_output with boolean-like output', () => {
    const boolOutputQuestion: QuizQuestion = {
      id: 'bool-output',
      type: 'code_output',
      prompt: 'What does print(5 > 3) output?',
      codeSnippet: 'print(5 > 3)',
      correctAnswer: 'True',
      explanation: 'Comparison returns boolean',
    };

    it('accepts case-insensitive True match', () => {
      expect(checkAnswer(boolOutputQuestion, 'True')).toBe(true);
      expect(checkAnswer(boolOutputQuestion, 'true')).toBe(true);
      expect(checkAnswer(boolOutputQuestion, 'TRUE')).toBe(true);
    });

    it('accepts boolean type when normalized value matches', () => {
      // Boolean true normalizes to "true" which matches "True" (case-insensitive)
      // This is more robust - accepting semantically correct answers
      expect(checkAnswer(boolOutputQuestion, true)).toBe(true);
    });
  });

  describe('code_output with list/array output', () => {
    const listOutputQuestion: QuizQuestion = {
      id: 'list-output',
      type: 'code_output',
      prompt: 'What does list(range(3)) output?',
      codeSnippet: 'print(list(range(3)))',
      correctAnswer: '[0, 1, 2]',
      explanation: 'Range creates 0 to n-1',
    };

    it('accepts exact match', () => {
      expect(checkAnswer(listOutputQuestion, '[0, 1, 2]')).toBe(true);
    });

    it('is case-insensitive (though lists are already lowercase)', () => {
      expect(checkAnswer(listOutputQuestion, '[0, 1, 2]')).toBe(true);
    });

    it('accepts different spacing (whitespace normalized)', () => {
      // Whitespace is now normalized for code_output questions
      expect(checkAnswer(listOutputQuestion, '[0,1,2]')).toBe(true);
    });
  });
});

describe('normalizeAnswer type handling', () => {
  it('converts number to string', () => {
    expect(normalizeAnswer(42)).toBe('42');
    expect(normalizeAnswer(0)).toBe('0');
    expect(normalizeAnswer(-5)).toBe('-5');
    expect(normalizeAnswer(3.14)).toBe('3.14');
  });

  it('converts boolean to lowercase string', () => {
    expect(normalizeAnswer(true)).toBe('true');
    expect(normalizeAnswer(false)).toBe('false');
  });

  it('handles undefined', () => {
    expect(normalizeAnswer(undefined)).toBe('');
  });

  it('preserves unicode characters while lowercasing', () => {
    expect(normalizeAnswer('O(N)')).toBe('o(n)');
    expect(normalizeAnswer('O(n log n)')).toBe('o(n log n)');
    expect(normalizeAnswer('FIFO')).toBe('fifo');
  });

  it('handles newlines in answers', () => {
    expect(normalizeAnswer('hello\nworld')).toBe('hello\nworld');
    expect(normalizeAnswer('  Hello\nWorld  ')).toBe('hello\nworld');
  });
});

describe('calculateScore with edge cases', () => {
  it('handles quiz with all fill_blank questions', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'f1',
        type: 'fill_blank',
        prompt: 'A stack follows ____ principle',
        correctAnswer: 'LIFO',
        explanation: 'Last In First Out',
      },
      {
        id: 'f2',
        type: 'fill_blank',
        prompt: 'A queue follows ____ principle',
        correctAnswer: 'FIFO',
        explanation: 'First In First Out',
      },
    ];

    const answers: Record<string, QuizAnswer> = {
      f1: 'lifo', // case-insensitive match
      f2: 'FIFO', // exact match
    };

    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles quiz with all code_output questions', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'c1',
        type: 'code_output',
        prompt: 'What is 2**10?',
        codeSnippet: 'print(2**10)',
        correctAnswer: '1024',
        explanation: 'Power of 2',
      },
      {
        id: 'c2',
        type: 'code_output',
        prompt: 'What is len("hello")?',
        codeSnippet: 'print(len("hello"))',
        correctAnswer: '5',
        explanation: 'String length',
      },
    ];

    const answers: Record<string, QuizAnswer> = {
      c1: '1024',
      c2: '5',
    };

    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles mixed types with all correct answers', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'mc1',
        type: 'multiple_choice',
        prompt: 'Pick B',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
        explanation: 'B is correct',
      },
      {
        id: 'tf1',
        type: 'true_false',
        prompt: 'True or False?',
        correctAnswer: true,
        explanation: 'It is true',
      },
      {
        id: 'fb1',
        type: 'fill_blank',
        prompt: 'Fill: ____',
        correctAnswer: 'answer',
        explanation: 'The answer',
      },
      {
        id: 'co1',
        type: 'code_output',
        prompt: 'Output?',
        codeSnippet: 'print(42)',
        correctAnswer: '42',
        explanation: 'Prints 42',
      },
      {
        id: 'cd1',
        type: 'coding',
        prompt: 'Write code',
        correctAnswer: 'code',
        explanation: 'Code it',
        starterCode: 'def f():',
        testCases: [],
        language: 'python',
        solution: 'code',
      },
    ];

    const answers: Record<string, QuizAnswer> = {
      mc1: 1,
      tf1: true,
      fb1: '  ANSWER  ', // with whitespace and uppercase
      co1: '42',
      cd1: { code: 'def f(): pass', passed: true } as CodingAnswer,
    };

    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles quiz where all answers are wrong', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Q1',
        options: ['A', 'B'],
        correctAnswer: 0,
        explanation: 'A',
      },
      {
        id: 'q2',
        type: 'fill_blank',
        prompt: 'Q2',
        correctAnswer: 'right',
        explanation: 'Right',
      },
    ];

    const answers: Record<string, QuizAnswer> = {
      q1: 1, // wrong
      q2: 'wrong', // wrong
    };

    expect(calculateScore(questions, answers)).toBe(0);
  });

  it('handles single question quiz', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'solo',
        type: 'fill_blank',
        prompt: 'Only question',
        correctAnswer: 'correct',
        explanation: 'Solo',
      },
    ];

    expect(calculateScore(questions, { solo: 'correct' })).toBe(100);
    expect(calculateScore(questions, { solo: 'wrong' })).toBe(0);
    expect(calculateScore(questions, {})).toBe(0);
  });
});

describe('checkAnswer for coding questions edge cases', () => {
  const codingQuestion: QuizQuestion = {
    id: 'coding1',
    type: 'coding',
    prompt: 'Write a function',
    correctAnswer: '',
    explanation: 'Explanation',
    starterCode: 'def f():',
    testCases: [],
    language: 'python',
    solution: 'def f(): return 42',
  };

  it('returns false for empty CodingAnswer with passed=false', () => {
    const answer: CodingAnswer = { code: '', passed: false };
    expect(checkAnswer(codingQuestion, answer)).toBe(false);
  });

  it('returns true for empty CodingAnswer with passed=true', () => {
    const answer: CodingAnswer = { code: '', passed: true };
    expect(checkAnswer(codingQuestion, answer)).toBe(true);
  });

  it('ignores the code content, only checks passed flag', () => {
    const wrongCode: CodingAnswer = { code: 'completely wrong', passed: true };
    const rightCode: CodingAnswer = { code: 'def f(): return 42', passed: false };

    expect(checkAnswer(codingQuestion, wrongCode)).toBe(true);
    expect(checkAnswer(codingQuestion, rightCode)).toBe(false);
  });
});

describe('checkAnswer for written questions', () => {
  const writtenQuestion: QuizQuestion = {
    id: 'written1',
    type: 'written',
    prompt: 'Explain something',
    correctAnswer: 'key concept',
    modelAnswer: 'A detailed explanation...',
    explanation: 'Looking for key concept',
  };

  it('matches case-insensitively', () => {
    expect(checkAnswer(writtenQuestion, 'Key Concept')).toBe(true);
    expect(checkAnswer(writtenQuestion, 'KEY CONCEPT')).toBe(true);
    expect(checkAnswer(writtenQuestion, 'key concept')).toBe(true);
  });

  it('trims whitespace', () => {
    expect(checkAnswer(writtenQuestion, '  key concept  ')).toBe(true);
    expect(checkAnswer(writtenQuestion, '\tkey concept\n')).toBe(true);
  });

  it('rejects non-matching answers', () => {
    expect(checkAnswer(writtenQuestion, 'wrong concept')).toBe(false);
    expect(checkAnswer(writtenQuestion, 'key')).toBe(false);
    expect(checkAnswer(writtenQuestion, 'concept')).toBe(false);
  });

  it('handles empty answer', () => {
    expect(checkAnswer(writtenQuestion, '')).toBe(false);
    expect(checkAnswer(writtenQuestion, '   ')).toBe(false);
  });
});
