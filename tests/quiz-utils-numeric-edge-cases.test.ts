/**
 * Quiz Utils Numeric Edge Cases Tests
 *
 * Tests for edge cases involving numeric answers in quiz questions.
 * These tests cover scenarios where answers may be numbers, numeric strings,
 * or special numeric values that need careful handling.
 */

import { describe, expect, it } from 'vitest';
import {
  normalizeAnswer,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion } from '@/core/types';

describe('Numeric answer handling in fill_blank questions', () => {
  it('matches numeric string answer to number correctAnswer', () => {
    const question: QuizQuestion = {
      id: 'num1',
      type: 'fill_blank',
      prompt: 'What is 2 + 2?',
      correctAnswer: '4',
      explanation: 'Basic addition',
    };
    expect(checkAnswer(question, '4')).toBe(true);
    expect(checkAnswer(question, 4 as unknown as string)).toBe(true);
    expect(checkAnswer(question, ' 4 ')).toBe(true);
  });

  it('handles decimal number answers', () => {
    const question: QuizQuestion = {
      id: 'dec1',
      type: 'fill_blank',
      prompt: 'What is 1 / 4?',
      correctAnswer: '0.25',
      explanation: 'Division result',
    };
    expect(checkAnswer(question, '0.25')).toBe(true);
    expect(checkAnswer(question, 0.25 as unknown as string)).toBe(true);
    expect(checkAnswer(question, '.25')).toBe(false); // Different format
  });

  it('handles negative number answers', () => {
    const question: QuizQuestion = {
      id: 'neg1',
      type: 'fill_blank',
      prompt: 'What is 5 - 10?',
      correctAnswer: '-5',
      explanation: 'Negative result',
    };
    expect(checkAnswer(question, '-5')).toBe(true);
    expect(checkAnswer(question, -5 as unknown as string)).toBe(true);
  });

  it('handles zero as an answer', () => {
    const question: QuizQuestion = {
      id: 'zero1',
      type: 'fill_blank',
      prompt: 'What is any number times zero?',
      correctAnswer: '0',
      explanation: 'Multiplication by zero',
    };
    expect(checkAnswer(question, '0')).toBe(true);
    expect(checkAnswer(question, 0 as unknown as string)).toBe(true);
    expect(checkAnswer(question, '00')).toBe(false); // Different string
  });

  it('distinguishes between similar numeric strings', () => {
    const question: QuizQuestion = {
      id: 'similar1',
      type: 'fill_blank',
      prompt: 'What is the value?',
      correctAnswer: '10',
      explanation: 'Ten',
    };
    expect(checkAnswer(question, '10')).toBe(true);
    expect(checkAnswer(question, '1')).toBe(false);
    expect(checkAnswer(question, '100')).toBe(false);
    expect(checkAnswer(question, '010')).toBe(false);
  });
});

describe('Numeric answer handling in code_output questions', () => {
  it('matches integer output', () => {
    const question: QuizQuestion = {
      id: 'co1',
      type: 'code_output',
      prompt: 'What does print(2**10) output?',
      codeSnippet: 'print(2**10)',
      correctAnswer: '1024',
      explanation: 'Power of 2',
    };
    expect(checkAnswer(question, '1024')).toBe(true);
    expect(checkAnswer(question, 1024 as unknown as string)).toBe(true);
  });

  it('handles floating point output', () => {
    const question: QuizQuestion = {
      id: 'co2',
      type: 'code_output',
      prompt: 'What does print(1/3) output?',
      codeSnippet: 'print(round(1/3, 2))',
      correctAnswer: '0.33',
      explanation: 'Rounded division',
    };
    expect(checkAnswer(question, '0.33')).toBe(true);
    expect(checkAnswer(question, 0.33 as unknown as string)).toBe(true);
  });

  it('handles large numbers', () => {
    const question: QuizQuestion = {
      id: 'co3',
      type: 'code_output',
      prompt: 'What is 10 factorial?',
      codeSnippet: 'import math; print(math.factorial(10))',
      correctAnswer: '3628800',
      explanation: 'Factorial of 10',
    };
    expect(checkAnswer(question, '3628800')).toBe(true);
  });

  it('handles scientific notation in answer string', () => {
    // Note: normalizeAnswer converts 1e6 to '1000000'
    const question: QuizQuestion = {
      id: 'co4',
      type: 'code_output',
      prompt: 'What is the output?',
      codeSnippet: 'print(1000000)',
      correctAnswer: '1000000',
      explanation: 'Million',
    };
    expect(checkAnswer(question, '1000000')).toBe(true);
    // Scientific notation number gets converted to full string
    expect(checkAnswer(question, 1e6 as unknown as string)).toBe(true);
  });
});

describe('Edge cases with NaN and Infinity', () => {
  it('normalizes NaN correctly', () => {
    expect(normalizeAnswer(NaN)).toBe('nan');
  });

  it('normalizes Infinity correctly', () => {
    expect(normalizeAnswer(Infinity)).toBe('infinity');
    expect(normalizeAnswer(-Infinity)).toBe('-infinity');
  });

  it('matches NaN answer if expected', () => {
    const question: QuizQuestion = {
      id: 'nan1',
      type: 'code_output',
      prompt: 'What does print(float("nan")) output?',
      codeSnippet: 'print(float("nan"))',
      correctAnswer: 'nan',
      explanation: 'Not a number',
    };
    expect(checkAnswer(question, 'nan')).toBe(true);
    expect(checkAnswer(question, 'NaN')).toBe(true);
  });
});

describe('Multiple choice with numeric-looking options', () => {
  it('correctly handles options that are numeric strings', () => {
    const question: QuizQuestion = {
      id: 'mc_num1',
      type: 'multiple_choice',
      prompt: 'What is the result of 2^3?',
      options: ['4', '6', '8', '9'],
      correctAnswer: 2, // Index of '8'
      explanation: 'Power calculation',
    };
    expect(checkAnswer(question, 2)).toBe(true);
    expect(checkAnswer(question, 0)).toBe(false);
  });

  it('correctly handles string correctAnswer matching numeric option', () => {
    const question: QuizQuestion = {
      id: 'mc_num2',
      type: 'multiple_choice',
      prompt: 'Select the prime number',
      options: ['4', '6', '7', '9'],
      correctAnswer: '7',
      explanation: 'Seven is prime',
    };
    // getCorrectOptionIndex should find index 2
    expect(checkAnswer(question, 2)).toBe(true);
    expect(checkAnswer(question, 0)).toBe(false);
  });

  it('handles negative number options', () => {
    const question: QuizQuestion = {
      id: 'mc_neg',
      type: 'multiple_choice',
      prompt: 'What is -3 + 1?',
      options: ['-4', '-2', '2', '4'],
      correctAnswer: 1, // Index of '-2'
      explanation: 'Negative addition',
    };
    expect(checkAnswer(question, 1)).toBe(true);
  });

  it('handles decimal number options', () => {
    const question: QuizQuestion = {
      id: 'mc_dec',
      type: 'multiple_choice',
      prompt: 'What is 1/4 as a decimal?',
      options: ['0.2', '0.25', '0.3', '0.5'],
      correctAnswer: '0.25',
      explanation: 'One quarter',
    };
    expect(checkAnswer(question, 1)).toBe(true);
  });
});

describe('Score calculation with numeric answers', () => {
  it('correctly scores fill_blank questions with numeric answers', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'fill_blank',
        prompt: '2 + 2 = ____',
        correctAnswer: '4',
        explanation: 'Addition',
      },
      {
        id: 'q2',
        type: 'fill_blank',
        prompt: '5 - 8 = ____',
        correctAnswer: '-3',
        explanation: 'Subtraction',
      },
    ];

    const answers = {
      q1: '4',
      q2: '-3',
    };
    expect(calculateScore(questions, answers)).toBe(100);

    const wrongAnswers = {
      q1: '5',
      q2: '3', // Missing negative sign
    };
    expect(calculateScore(questions, wrongAnswers)).toBe(0);
  });

  it('correctly scores code_output questions with numeric answers', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'code_output',
        prompt: 'What does print(len([1,2,3])) output?',
        codeSnippet: 'print(len([1,2,3]))',
        correctAnswer: '3',
        explanation: 'List length',
      },
      {
        id: 'q2',
        type: 'code_output',
        prompt: 'What does print(2.5 * 2) output?',
        codeSnippet: 'print(2.5 * 2)',
        correctAnswer: '5.0',
        explanation: 'Float multiplication',
      },
    ];

    const answers = {
      q1: '3',
      q2: '5.0',
    };
    expect(calculateScore(questions, answers)).toBe(100);
  });
});

describe('Whitespace handling in numeric answers', () => {
  it('trims whitespace from numeric answers', () => {
    const question: QuizQuestion = {
      id: 'ws1',
      type: 'fill_blank',
      prompt: 'What is 1 + 1?',
      correctAnswer: '2',
      explanation: 'Basic addition',
    };
    expect(checkAnswer(question, ' 2 ')).toBe(true);
    expect(checkAnswer(question, '\t2\n')).toBe(true);
    expect(checkAnswer(question, '  2  ')).toBe(true);
  });

  it('does not normalize internal whitespace in multi-word numeric answers', () => {
    const question: QuizQuestion = {
      id: 'ws2',
      type: 'code_output',
      prompt: 'What is the output?',
      codeSnippet: 'print(1, 2)',
      correctAnswer: '1 2',
      explanation: 'Print with spaces',
    };
    expect(checkAnswer(question, '1 2')).toBe(true);
    expect(checkAnswer(question, '1  2')).toBe(false); // Double space
    expect(checkAnswer(question, '12')).toBe(false); // No space
  });
});

describe('Boolean-like string answers', () => {
  it('handles True/False as code output strings', () => {
    const question: QuizQuestion = {
      id: 'bool1',
      type: 'code_output',
      prompt: 'What does print(5 > 3) output?',
      codeSnippet: 'print(5 > 3)',
      correctAnswer: 'True',
      explanation: 'Comparison',
    };
    // String comparison should be case-insensitive
    expect(checkAnswer(question, 'True')).toBe(true);
    expect(checkAnswer(question, 'true')).toBe(true);
    expect(checkAnswer(question, 'TRUE')).toBe(true);
  });

  it('distinguishes between boolean true_false and string code_output', () => {
    const tfQuestion: QuizQuestion = {
      id: 'tf1',
      type: 'true_false',
      prompt: 'Is 5 > 3?',
      correctAnswer: true,
      explanation: 'Yes',
    };
    // true_false expects actual boolean
    expect(checkAnswer(tfQuestion, true)).toBe(true);
    expect(checkAnswer(tfQuestion, 'true')).toBe(false);

    const coQuestion: QuizQuestion = {
      id: 'co1',
      type: 'code_output',
      prompt: 'What does print(True) output?',
      codeSnippet: 'print(True)',
      correctAnswer: 'True',
      explanation: 'Print boolean',
    };
    // code_output expects string
    expect(checkAnswer(coQuestion, 'True')).toBe(true);
    expect(checkAnswer(coQuestion, 'true')).toBe(true);
    // Note: actual boolean gets normalized to string for code_output
    expect(checkAnswer(coQuestion, true as unknown as string)).toBe(true);
  });
});

describe('Empty and None answers', () => {
  it('handles empty string as correct answer', () => {
    const question: QuizQuestion = {
      id: 'empty1',
      type: 'code_output',
      prompt: 'What does this code print?',
      codeSnippet: 'pass',
      correctAnswer: '',
      explanation: 'No output',
    };
    expect(checkAnswer(question, '')).toBe(true);
    expect(checkAnswer(question, '   ')).toBe(true); // Whitespace normalizes to empty
  });

  it('handles None as code output', () => {
    const question: QuizQuestion = {
      id: 'none1',
      type: 'code_output',
      prompt: 'What does print(None) output?',
      codeSnippet: 'print(None)',
      correctAnswer: 'None',
      explanation: 'None value',
    };
    expect(checkAnswer(question, 'None')).toBe(true);
    expect(checkAnswer(question, 'none')).toBe(true);
  });
});
