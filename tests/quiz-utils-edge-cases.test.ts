/**
 * Quiz Utils Edge Cases Tests
 *
 * Tests edge cases in quiz utility functions including:
 * - Answer normalization
 * - Correct option index finding
 * - Answer checking across question types
 * - Score calculation
 */

import { describe, expect, it } from 'vitest';
import {
  normalizeAnswer,
  isCodingAnswer,
  getCorrectOptionIndex,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion, CodingAnswer } from '@/core/types';

describe('normalizeAnswer', () => {
  it('converts number to lowercase string', () => {
    expect(normalizeAnswer(42)).toBe('42');
    expect(normalizeAnswer(0)).toBe('0');
    expect(normalizeAnswer(-1)).toBe('-1');
  });

  it('converts boolean to lowercase string', () => {
    expect(normalizeAnswer(true)).toBe('true');
    expect(normalizeAnswer(false)).toBe('false');
  });

  it('returns empty string for undefined', () => {
    expect(normalizeAnswer(undefined)).toBe('');
  });

  it('lowercases and trims string answers', () => {
    expect(normalizeAnswer('  HELLO  ')).toBe('hello');
    expect(normalizeAnswer('\n\tMixed Case\t\n')).toBe('mixed case');
  });

  it('preserves internal whitespace when lowercasing', () => {
    expect(normalizeAnswer('Hello World')).toBe('hello world');
    expect(normalizeAnswer('Multiple   Spaces')).toBe('multiple   spaces');
  });

  it('handles empty string', () => {
    expect(normalizeAnswer('')).toBe('');
  });

  it('handles string with only whitespace', () => {
    expect(normalizeAnswer('   ')).toBe('');
    expect(normalizeAnswer('\t\n  ')).toBe('');
  });

  it('handles special characters', () => {
    expect(normalizeAnswer('O(n²)')).toBe('o(n²)');
    expect(normalizeAnswer('λ-calculus')).toBe('λ-calculus');
  });

  it('handles numeric strings', () => {
    expect(normalizeAnswer('42')).toBe('42');
    expect(normalizeAnswer('3.14159')).toBe('3.14159');
  });
});

describe('isCodingAnswer', () => {
  it('returns true for valid CodingAnswer object', () => {
    const answer: CodingAnswer = {
      code: 'def foo(): pass',
      passed: true,
    };
    expect(isCodingAnswer(answer)).toBe(true);
  });

  it('returns false for string answer', () => {
    expect(isCodingAnswer('def foo(): pass')).toBe(false);
  });

  it('returns false for number answer', () => {
    expect(isCodingAnswer(42)).toBe(false);
  });

  it('returns false for boolean answer', () => {
    expect(isCodingAnswer(true)).toBe(false);
    expect(isCodingAnswer(false)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isCodingAnswer(undefined)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isCodingAnswer(null as any)).toBe(false);
  });

  it('returns false for object without code property', () => {
    const answer = { passed: true, other: 'value' };
    expect(isCodingAnswer(answer as any)).toBe(false);
  });

  it('returns true for CodingAnswer with additional properties', () => {
    const answer: CodingAnswer = {
      code: 'print("hi")',
      passed: true,
      results: [],
    };
    expect(isCodingAnswer(answer)).toBe(true);
  });

  it('returns true for CodingAnswer with empty code', () => {
    const answer: CodingAnswer = {
      code: '',
      passed: false,
    };
    expect(isCodingAnswer(answer)).toBe(true);
  });
});

describe('getCorrectOptionIndex', () => {
  it('returns numeric correctAnswer directly', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test question?',
      correctAnswer: 2,
      explanation: 'Test',
      options: ['A', 'B', 'C', 'D'],
    };
    expect(getCorrectOptionIndex(question)).toBe(2);
  });

  it('finds index when correctAnswer is the exact string value', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test question?',
      correctAnswer: 'C',
      explanation: 'Test',
      options: ['A', 'B', 'C', 'D'],
    };
    expect(getCorrectOptionIndex(question)).toBe(2);
  });

  it('returns -1 when string correctAnswer not found in options', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test question?',
      correctAnswer: 'E',
      explanation: 'Test',
      options: ['A', 'B', 'C', 'D'],
    };
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns -1 when options is undefined', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'fill_blank',
      prompt: 'Test ____',
      correctAnswer: 'answer',
      explanation: 'Test',
    };
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns first match index when duplicate options exist', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test?',
      correctAnswer: 'Same',
      explanation: 'Test',
      options: ['Same', 'Different', 'Same', 'Other'],
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
  });

  it('handles index 0 correctly', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test?',
      correctAnswer: 0,
      explanation: 'Test',
      options: ['First', 'Second', 'Third', 'Fourth'],
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
  });

  it('returns -1 for boolean correctAnswer (non-multiple_choice)', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'true_false',
      prompt: 'Is this true?',
      correctAnswer: true,
      explanation: 'Test',
    };
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });
});

describe('checkAnswer for multiple_choice questions', () => {
  const mcQuestion: QuizQuestion = {
    id: 'mc1',
    type: 'multiple_choice',
    prompt: 'What is 2+2?',
    correctAnswer: 1,
    explanation: 'Basic math',
    options: ['3', '4', '5', '6'],
  };

  it('returns true for correct index', () => {
    expect(checkAnswer(mcQuestion, 1)).toBe(true);
  });

  it('returns false for wrong index', () => {
    expect(checkAnswer(mcQuestion, 0)).toBe(false);
    expect(checkAnswer(mcQuestion, 2)).toBe(false);
    expect(checkAnswer(mcQuestion, 3)).toBe(false);
  });

  it('returns false for undefined answer', () => {
    expect(checkAnswer(mcQuestion, undefined)).toBe(false);
  });

  it('returns false for string answer (should be index)', () => {
    expect(checkAnswer(mcQuestion, '4')).toBe(false);
  });

  it('returns false for out-of-bounds index', () => {
    expect(checkAnswer(mcQuestion, 10)).toBe(false);
    expect(checkAnswer(mcQuestion, -1)).toBe(false);
  });
});

describe('checkAnswer for true_false questions', () => {
  const tfQuestionTrue: QuizQuestion = {
    id: 'tf1',
    type: 'true_false',
    prompt: 'Python is a programming language',
    correctAnswer: true,
    explanation: 'Yes it is',
  };

  const tfQuestionFalse: QuizQuestion = {
    id: 'tf2',
    type: 'true_false',
    prompt: 'JavaScript is compiled',
    correctAnswer: false,
    explanation: 'It is interpreted',
  };

  it('returns true for correct boolean answer (true)', () => {
    expect(checkAnswer(tfQuestionTrue, true)).toBe(true);
  });

  it('returns true for correct boolean answer (false)', () => {
    expect(checkAnswer(tfQuestionFalse, false)).toBe(true);
  });

  it('returns false for wrong boolean answer', () => {
    expect(checkAnswer(tfQuestionTrue, false)).toBe(false);
    expect(checkAnswer(tfQuestionFalse, true)).toBe(false);
  });

  it('returns false for undefined answer', () => {
    expect(checkAnswer(tfQuestionTrue, undefined)).toBe(false);
  });

  it('returns false for string "true" (strict comparison)', () => {
    expect(checkAnswer(tfQuestionTrue, 'true')).toBe(false);
  });
});

describe('checkAnswer for fill_blank questions', () => {
  const fillQuestion: QuizQuestion = {
    id: 'fill1',
    type: 'fill_blank',
    prompt: 'The time complexity of binary search is ____ in the worst case.',
    correctAnswer: 'O(log n)',
    explanation: 'Binary search halves the search space each iteration',
  };

  it('returns true for exact match', () => {
    expect(checkAnswer(fillQuestion, 'O(log n)')).toBe(true);
  });

  it('returns true for case-insensitive match', () => {
    expect(checkAnswer(fillQuestion, 'o(log n)')).toBe(true);
    expect(checkAnswer(fillQuestion, 'O(LOG N)')).toBe(true);
  });

  it('returns true for match with extra whitespace', () => {
    expect(checkAnswer(fillQuestion, '  O(log n)  ')).toBe(true);
  });

  it('returns false for wrong answer', () => {
    expect(checkAnswer(fillQuestion, 'O(n)')).toBe(false);
  });

  it('returns false for partial match', () => {
    expect(checkAnswer(fillQuestion, 'O(log')).toBe(false);
  });

  it('returns false for undefined answer', () => {
    expect(checkAnswer(fillQuestion, undefined)).toBe(false);
  });
});

describe('checkAnswer for code_output questions', () => {
  const codeOutputQuestion: QuizQuestion = {
    id: 'code1',
    type: 'code_output',
    prompt: 'What does this code print?',
    codeSnippet: 'print(2 ** 3)',
    correctAnswer: '8',
    explanation: 'Exponentiation',
  };

  it('returns true for correct output', () => {
    expect(checkAnswer(codeOutputQuestion, '8')).toBe(true);
  });

  it('returns true for case-insensitive match', () => {
    // Numbers should match regardless
    expect(checkAnswer(codeOutputQuestion, '8')).toBe(true);
  });

  it('returns false for wrong answer', () => {
    expect(checkAnswer(codeOutputQuestion, '6')).toBe(false);
  });

  it('handles string output with special characters', () => {
    const stringOutputQuestion: QuizQuestion = {
      id: 'code2',
      type: 'code_output',
      prompt: 'What does this print?',
      codeSnippet: 'print("Hello, World!")',
      correctAnswer: 'Hello, World!',
      explanation: 'Basic print',
    };
    expect(checkAnswer(stringOutputQuestion, 'Hello, World!')).toBe(true);
    expect(checkAnswer(stringOutputQuestion, 'hello, world!')).toBe(true);
  });
});

describe('checkAnswer for written questions', () => {
  const writtenQuestion: QuizQuestion = {
    id: 'written1',
    type: 'written',
    prompt: 'Explain recursion.',
    correctAnswer: 'recursion',
    modelAnswer: 'Recursion is when a function calls itself...',
    explanation: 'Self-reference in functions',
  };

  it('returns true for normalized match', () => {
    expect(checkAnswer(writtenQuestion, 'recursion')).toBe(true);
    expect(checkAnswer(writtenQuestion, 'RECURSION')).toBe(true);
    expect(checkAnswer(writtenQuestion, '  recursion  ')).toBe(true);
  });

  it('returns false for non-match', () => {
    expect(checkAnswer(writtenQuestion, 'iteration')).toBe(false);
  });
});

describe('checkAnswer for coding questions', () => {
  const codingQuestion: QuizQuestion = {
    id: 'coding1',
    type: 'coding',
    prompt: 'Write a function to add two numbers',
    starterCode: 'def add(a, b):\n    pass',
    correctAnswer: 'def add(a, b):\n    return a + b',
    explanation: 'Simple addition',
    testCases: [
      { input: '1, 2', expectedOutput: '3', isHidden: false, description: 'Basic test' },
    ],
    language: 'python',
    solution: 'def add(a, b):\n    return a + b',
  };

  it('returns true for passed CodingAnswer', () => {
    const answer: CodingAnswer = {
      code: 'def add(a, b): return a + b',
      passed: true,
    };
    expect(checkAnswer(codingQuestion, answer)).toBe(true);
  });

  it('returns false for failed CodingAnswer', () => {
    const answer: CodingAnswer = {
      code: 'def add(a, b): return a - b',
      passed: false,
    };
    expect(checkAnswer(codingQuestion, answer)).toBe(false);
  });

  it('returns false for string answer (not CodingAnswer)', () => {
    expect(checkAnswer(codingQuestion, 'def add(a, b): return a + b')).toBe(false);
  });

  it('returns false for undefined answer', () => {
    expect(checkAnswer(codingQuestion, undefined)).toBe(false);
  });
});

describe('checkAnswer for unknown question types', () => {
  it('returns false for unknown question type', () => {
    const unknownQuestion = {
      id: 'unknown1',
      type: 'essay' as any,
      prompt: 'Write an essay',
      correctAnswer: 'anything',
      explanation: 'Test',
    };
    expect(checkAnswer(unknownQuestion, 'anything')).toBe(false);
  });
});

describe('calculateScore', () => {
  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Q1?',
      correctAnswer: 0,
      explanation: 'Test',
      options: ['A', 'B', 'C', 'D'],
    },
    {
      id: 'q2',
      type: 'true_false',
      prompt: 'Q2?',
      correctAnswer: true,
      explanation: 'Test',
    },
    {
      id: 'q3',
      type: 'fill_blank',
      prompt: 'Q3: ____',
      correctAnswer: 'answer',
      explanation: 'Test',
    },
    {
      id: 'q4',
      type: 'multiple_choice',
      prompt: 'Q4?',
      correctAnswer: 2,
      explanation: 'Test',
      options: ['X', 'Y', 'Z', 'W'],
    },
  ];

  it('returns 100 for all correct answers', () => {
    const answers = {
      q1: 0,
      q2: true,
      q3: 'answer',
      q4: 2,
    };
    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('returns 0 for all wrong answers', () => {
    const answers = {
      q1: 1,
      q2: false,
      q3: 'wrong',
      q4: 0,
    };
    expect(calculateScore(questions, answers)).toBe(0);
  });

  it('returns 50 for half correct', () => {
    const answers = {
      q1: 0,
      q2: true,
      q3: 'wrong',
      q4: 0,
    };
    expect(calculateScore(questions, answers)).toBe(50);
  });

  it('returns 25 for one correct out of four', () => {
    const answers = {
      q1: 0,
      q2: false,
      q3: 'wrong',
      q4: 0,
    };
    expect(calculateScore(questions, answers)).toBe(25);
  });

  it('returns 75 for three correct out of four', () => {
    const answers = {
      q1: 0,
      q2: true,
      q3: 'answer',
      q4: 0,
    };
    expect(calculateScore(questions, answers)).toBe(75);
  });

  it('returns 0 for empty questions array', () => {
    expect(calculateScore([], {})).toBe(0);
  });

  it('handles missing answers as wrong', () => {
    const answers = {
      q1: 0,
      // q2, q3, q4 missing
    };
    expect(calculateScore(questions, answers)).toBe(25);
  });

  it('rounds score to nearest integer', () => {
    const threeQuestions = questions.slice(0, 3);
    const answers = { q1: 0 };
    // 1/3 = 33.33...
    expect(calculateScore(threeQuestions, answers)).toBe(33);
  });

  it('handles coding answers correctly', () => {
    const codingQuestions: QuizQuestion[] = [
      {
        id: 'c1',
        type: 'coding',
        prompt: 'Code',
        correctAnswer: 'code',
        explanation: 'Test',
        starterCode: 'def f():',
        testCases: [],
        language: 'python',
        solution: 'code',
      },
      {
        id: 'c2',
        type: 'multiple_choice',
        prompt: 'MC?',
        correctAnswer: 1,
        explanation: 'Test',
        options: ['A', 'B'],
      },
    ];
    const answers = {
      c1: { code: 'solution', passed: true } as CodingAnswer,
      c2: 1,
    };
    expect(calculateScore(codingQuestions, answers)).toBe(100);
  });
});

describe('Integration: mixed question types scoring', () => {
  it('correctly scores a realistic quiz', () => {
    const mixedQuiz: QuizQuestion[] = [
      {
        id: 'mc1',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of quicksort on average?',
        correctAnswer: 2,
        explanation: 'Average case is O(n log n)',
        options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'],
      },
      {
        id: 'tf1',
        type: 'true_false',
        prompt: 'Binary search requires a sorted array',
        correctAnswer: true,
        explanation: 'Yes, binary search needs sorted input',
      },
      {
        id: 'fill1',
        type: 'fill_blank',
        prompt: 'A queue follows ____ principle',
        correctAnswer: 'FIFO',
        explanation: 'First In First Out',
      },
      {
        id: 'code1',
        type: 'code_output',
        prompt: 'What does list(range(3)) return?',
        codeSnippet: 'print(list(range(3)))',
        correctAnswer: '[0, 1, 2]',
        explanation: 'Range is exclusive of end',
      },
    ];

    // Student gets 3/4 correct
    const answers = {
      mc1: 2, // correct
      tf1: true, // correct
      fill1: 'fifo', // correct (case insensitive)
      code1: '[0,1,2]', // wrong (different formatting)
    };

    expect(calculateScore(mixedQuiz, answers)).toBe(75);
  });
});
