/**
 * Quiz Answer Checking Tests
 *
 * These tests verify the correctness of quiz answer validation logic,
 * ensuring that all question types are scored correctly.
 *
 * NOTE: This file imports helper functions directly from the source to ensure
 * tests stay in sync with the actual implementation.
 */

import { describe, it, expect } from 'vitest';
import type { QuizQuestion, QuizAnswer, CodingAnswer } from '@/core/types';
import {
  normalizeAnswer,
  isCodingAnswer,
  getCorrectOptionIndex,
  checkAnswer,
  calculateScore,
} from '@/utils/quiz-utils';

describe('Quiz Answer Checking', () => {
  describe('normalizeAnswer', () => {
    it('converts string to lowercase', () => {
      expect(normalizeAnswer('Hello World')).toBe('hello world');
    });

    it('trims whitespace', () => {
      expect(normalizeAnswer('  answer  ')).toBe('answer');
    });

    it('handles numbers', () => {
      expect(normalizeAnswer(42)).toBe('42');
    });

    it('handles booleans', () => {
      expect(normalizeAnswer(true)).toBe('true');
      expect(normalizeAnswer(false)).toBe('false');
    });

    it('handles undefined', () => {
      expect(normalizeAnswer(undefined)).toBe('');
    });

    it('handles empty string', () => {
      expect(normalizeAnswer('')).toBe('');
    });

    it('handles string with only whitespace', () => {
      expect(normalizeAnswer('   ')).toBe('');
    });
  });

  describe('isCodingAnswer', () => {
    it('identifies valid coding answer', () => {
      const answer: CodingAnswer = { code: 'print("hello")', passed: true };
      expect(isCodingAnswer(answer)).toBe(true);
    });

    it('rejects string answer', () => {
      expect(isCodingAnswer('print("hello")')).toBe(false);
    });

    it('rejects number answer', () => {
      expect(isCodingAnswer(42)).toBe(false);
    });

    it('rejects boolean answer', () => {
      expect(isCodingAnswer(true)).toBe(false);
    });

    it('rejects undefined', () => {
      expect(isCodingAnswer(undefined)).toBe(false);
    });

    it('rejects null', () => {
      expect(isCodingAnswer(null as unknown as QuizAnswer)).toBe(false);
    });

    it('rejects object without code property', () => {
      const answer = { passed: true } as unknown as QuizAnswer;
      expect(isCodingAnswer(answer)).toBe(false);
    });
  });

  describe('checkAnswer - multiple_choice', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1, // Index 1 = "4"
      explanation: '2 + 2 = 4',
    };

    it('returns true for correct option index', () => {
      expect(checkAnswer(question, 1)).toBe(true);
    });

    it('returns false for incorrect option index', () => {
      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 2)).toBe(false);
      expect(checkAnswer(question, 3)).toBe(false);
    });

    it('returns false for undefined answer', () => {
      expect(checkAnswer(question, undefined)).toBe(false);
    });

    it('returns false for string answer (wrong type)', () => {
      expect(checkAnswer(question, '4')).toBe(false);
    });
  });

  describe('checkAnswer - multiple_choice with string correctAnswer', () => {
    // Tests for multiple_choice questions where correctAnswer is a string (option text)
    // instead of a numeric index - common in math/science quizzes

    const questionWithStringAnswer: QuizQuestion = {
      id: 'q-string',
      type: 'multiple_choice',
      prompt: 'What is the dot product of u = <2, -3, 1> and v = <1, 4, -2>?',
      options: ['-12', '-8', '8', '12'],
      correctAnswer: '-12', // String value matching first option
      explanation: 'The dot product is -12',
    };

    it('returns true when user selects the index matching the string correctAnswer', () => {
      // '-12' is at index 0, so selecting index 0 should be correct
      expect(checkAnswer(questionWithStringAnswer, 0)).toBe(true);
    });

    it('returns false when user selects wrong index', () => {
      expect(checkAnswer(questionWithStringAnswer, 1)).toBe(false);
      expect(checkAnswer(questionWithStringAnswer, 2)).toBe(false);
      expect(checkAnswer(questionWithStringAnswer, 3)).toBe(false);
    });

    it('returns false for undefined answer', () => {
      expect(checkAnswer(questionWithStringAnswer, undefined)).toBe(false);
    });

    const questionWithComplexStringAnswer: QuizQuestion = {
      id: 'q-complex',
      type: 'multiple_choice',
      prompt: 'Which equation represents a line through (1, 2, 3)?',
      options: [
        'r(t) = <1+2t, 2-t, 3+4t>',
        'r(t) = <2+t, -1+2t, 4+3t>',
        'r(t) = <1, 2, 3> + t',
        'r(t) = t<2, -1, 4>',
      ],
      correctAnswer: 'r(t) = <1+2t, 2-t, 3+4t>', // String matching first option
      explanation: 'The parametric equation',
    };

    it('handles complex string correctAnswers with special characters', () => {
      // 'r(t) = <1+2t, 2-t, 3+4t>' is at index 0
      expect(checkAnswer(questionWithComplexStringAnswer, 0)).toBe(true);
      expect(checkAnswer(questionWithComplexStringAnswer, 1)).toBe(false);
    });

    const questionWithNumericStringAnswer: QuizQuestion = {
      id: 'q-numeric-string',
      type: 'multiple_choice',
      prompt: 'What is cos(60°)?',
      options: ['0', '0.5', '0.866', '1'],
      correctAnswer: '0.5', // String value at index 1
      explanation: 'cos(60°) = 0.5',
    };

    it('handles numeric string correctAnswers', () => {
      // '0.5' is at index 1
      expect(checkAnswer(questionWithNumericStringAnswer, 1)).toBe(true);
      expect(checkAnswer(questionWithNumericStringAnswer, 0)).toBe(false);
      expect(checkAnswer(questionWithNumericStringAnswer, 2)).toBe(false);
    });
  });

  describe('getCorrectOptionIndex', () => {
    it('returns the index directly when correctAnswer is a number', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B', 'C'],
        correctAnswer: 2,
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(2);
    });

    it('finds the matching index when correctAnswer is a string', () => {
      const question: QuizQuestion = {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['Alpha', 'Beta', 'Gamma'],
        correctAnswer: 'Beta',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(1);
    });

    it('returns -1 when string correctAnswer does not match any option', () => {
      const question: QuizQuestion = {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B', 'C'],
        correctAnswer: 'Delta', // Not in options
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 when options are undefined', () => {
      const question: QuizQuestion = {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Test',
        correctAnswer: 'A',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('handles first option as correctAnswer', () => {
      const question: QuizQuestion = {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['-12', '-8', '8', '12'],
        correctAnswer: '-12',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('handles last option as correctAnswer', () => {
      const question: QuizQuestion = {
        id: 'q6',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'D',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(3);
    });
  });

  describe('checkAnswer - true_false', () => {
    const trueQuestion: QuizQuestion = {
      id: 'q1',
      type: 'true_false',
      prompt: 'The sky is blue.',
      correctAnswer: true,
      explanation: 'The sky appears blue due to Rayleigh scattering.',
    };

    const falseQuestion: QuizQuestion = {
      id: 'q2',
      type: 'true_false',
      prompt: 'The earth is flat.',
      correctAnswer: false,
      explanation: 'The earth is roughly spherical.',
    };

    it('returns true for correct true answer', () => {
      expect(checkAnswer(trueQuestion, true)).toBe(true);
    });

    it('returns false for incorrect false answer to true question', () => {
      expect(checkAnswer(trueQuestion, false)).toBe(false);
    });

    it('returns true for correct false answer', () => {
      expect(checkAnswer(falseQuestion, false)).toBe(true);
    });

    it('returns false for incorrect true answer to false question', () => {
      expect(checkAnswer(falseQuestion, true)).toBe(false);
    });

    it('returns false for undefined answer', () => {
      expect(checkAnswer(trueQuestion, undefined)).toBe(false);
    });

    it('returns false for string "true" (wrong type - must be boolean)', () => {
      expect(checkAnswer(trueQuestion, 'true')).toBe(false);
    });

    it('returns false for string "True" (wrong type - must be boolean)', () => {
      expect(checkAnswer(trueQuestion, 'True')).toBe(false);
    });

    it('returns false for number 1 (wrong type)', () => {
      expect(checkAnswer(trueQuestion, 1)).toBe(false);
    });
  });

  describe('checkAnswer - fill_blank', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'fill_blank',
      prompt: 'The capital of France is ____.',
      correctAnswer: 'Paris',
      explanation: 'Paris is the capital and largest city of France.',
    };

    it('returns true for exact match', () => {
      expect(checkAnswer(question, 'Paris')).toBe(true);
    });

    it('returns true for lowercase match', () => {
      expect(checkAnswer(question, 'paris')).toBe(true);
    });

    it('returns true for uppercase match', () => {
      expect(checkAnswer(question, 'PARIS')).toBe(true);
    });

    it('returns true for mixed case match', () => {
      expect(checkAnswer(question, 'pArIs')).toBe(true);
    });

    it('returns true for match with extra whitespace', () => {
      expect(checkAnswer(question, '  Paris  ')).toBe(true);
    });

    it('returns false for wrong answer', () => {
      expect(checkAnswer(question, 'London')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(checkAnswer(question, '')).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(checkAnswer(question, undefined)).toBe(false);
    });
  });

  describe('checkAnswer - code_output', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What will this code print?',
      codeSnippet: 'print("Hello, World!")',
      correctAnswer: 'Hello, World!',
      explanation: 'The print function outputs the string.',
    };

    it('returns true for exact match', () => {
      expect(checkAnswer(question, 'Hello, World!')).toBe(true);
    });

    it('returns true for case-insensitive match', () => {
      expect(checkAnswer(question, 'hello, world!')).toBe(true);
    });

    it('returns true for match with extra whitespace', () => {
      expect(checkAnswer(question, '  Hello, World!  ')).toBe(true);
    });

    it('returns false for wrong answer', () => {
      expect(checkAnswer(question, 'Hello World')).toBe(false);
    });

    describe('numeric output', () => {
      const numericQuestion: QuizQuestion = {
        id: 'q2',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'print(2 + 2)',
        correctAnswer: '4',
        explanation: '2 + 2 = 4',
      };

      it('returns true for numeric string match', () => {
        expect(checkAnswer(numericQuestion, '4')).toBe(true);
      });

      it('returns true with whitespace', () => {
        expect(checkAnswer(numericQuestion, ' 4 ')).toBe(true);
      });
    });

    describe('Python boolean output', () => {
      const boolQuestion: QuizQuestion = {
        id: 'q3',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'print(5 > 3)',
        correctAnswer: 'True',
        explanation: '5 is greater than 3',
      };

      it('returns true for "True" (Python format)', () => {
        expect(checkAnswer(boolQuestion, 'True')).toBe(true);
      });

      it('returns true for "true" (case insensitive)', () => {
        expect(checkAnswer(boolQuestion, 'true')).toBe(true);
      });

      it('returns true for "TRUE"', () => {
        expect(checkAnswer(boolQuestion, 'TRUE')).toBe(true);
      });
    });

    describe('multiline output', () => {
      const multilineQuestion: QuizQuestion = {
        id: 'q4',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'print("Hello")\\nprint("World")',
        correctAnswer: 'Hello\nWorld',
        explanation: 'Two print statements output on separate lines.',
      };

      it('returns true for multiline match', () => {
        expect(checkAnswer(multilineQuestion, 'Hello\nWorld')).toBe(true);
      });

      it('returns true for case-insensitive multiline match', () => {
        expect(checkAnswer(multilineQuestion, 'hello\nworld')).toBe(true);
      });
    });
  });

  describe('checkAnswer - coding', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'coding',
      prompt: 'Write a function that returns the square of a number.',
      starterCode: 'def square(n):\n    pass',
      solution: 'def square(n):\n    return n * n',
      correctAnswer: '', // Not used for coding questions
      explanation: 'Multiply the number by itself.',
      testCases: [
        { input: '2', expectedOutput: '4', isHidden: false, description: 'Square of 2' },
        { input: '5', expectedOutput: '25', isHidden: false, description: 'Square of 5' },
      ],
    };

    it('returns true when all tests pass', () => {
      const answer: CodingAnswer = {
        code: 'def square(n):\n    return n * n',
        passed: true,
      };
      expect(checkAnswer(question, answer)).toBe(true);
    });

    it('returns false when tests fail', () => {
      const answer: CodingAnswer = {
        code: 'def square(n):\n    return n + n',
        passed: false,
      };
      expect(checkAnswer(question, answer)).toBe(false);
    });

    it('returns false for string answer (wrong type)', () => {
      expect(checkAnswer(question, 'def square(n):\n    return n * n')).toBe(false);
    });

    it('returns false for undefined answer', () => {
      expect(checkAnswer(question, undefined)).toBe(false);
    });
  });

  describe('checkAnswer - written', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'written',
      prompt: 'What is the capital of France?',
      correctAnswer: 'Paris',
      modelAnswer: 'Paris is the capital and largest city of France.',
      explanation: 'Paris has been the capital since 987 AD.',
    };

    it('returns true for exact match', () => {
      expect(checkAnswer(question, 'Paris')).toBe(true);
    });

    it('returns true for case-insensitive match', () => {
      expect(checkAnswer(question, 'paris')).toBe(true);
    });

    it('returns false for wrong answer', () => {
      expect(checkAnswer(question, 'London')).toBe(false);
    });

    it('returns false for empty answer', () => {
      expect(checkAnswer(question, '')).toBe(false);
    });
  });

  describe('calculateScore', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is 2 + 2?',
        options: ['3', '4', '5'],
        correctAnswer: 1,
        explanation: '',
      },
      {
        id: 'q2',
        type: 'true_false',
        prompt: 'The sky is blue.',
        correctAnswer: true,
        explanation: '',
      },
      {
        id: 'q3',
        type: 'fill_blank',
        prompt: 'The capital of France is ____.',
        correctAnswer: 'Paris',
        explanation: '',
      },
      {
        id: 'q4',
        type: 'code_output',
        prompt: 'What does print(2+2) output?',
        correctAnswer: '4',
        explanation: '',
      },
    ];

    it('calculates 100% for all correct answers', () => {
      const answers: Record<string, QuizAnswer> = {
        q1: 1,
        q2: true,
        q3: 'Paris',
        q4: '4',
      };
      expect(calculateScore(questions, answers)).toBe(100);
    });

    it('calculates 0% for all wrong answers', () => {
      const answers: Record<string, QuizAnswer> = {
        q1: 0,
        q2: false,
        q3: 'London',
        q4: '5',
      };
      expect(calculateScore(questions, answers)).toBe(0);
    });

    it('calculates 50% for half correct', () => {
      const answers: Record<string, QuizAnswer> = {
        q1: 1,
        q2: true,
        q3: 'London',
        q4: '5',
      };
      expect(calculateScore(questions, answers)).toBe(50);
    });

    it('calculates 75% for 3 out of 4 correct', () => {
      const answers: Record<string, QuizAnswer> = {
        q1: 1,
        q2: true,
        q3: 'Paris',
        q4: '5',
      };
      expect(calculateScore(questions, answers)).toBe(75);
    });

    it('handles missing answers as wrong', () => {
      const answers: Record<string, QuizAnswer> = {
        q1: 1,
        // q2 missing
        q3: 'Paris',
        q4: '4',
      };
      expect(calculateScore(questions, answers)).toBe(75);
    });

    it('handles empty answers object', () => {
      expect(calculateScore(questions, {})).toBe(0);
    });

    it('handles empty questions array without division by zero', () => {
      expect(calculateScore([], {})).toBe(0);
    });

    it('handles empty questions array with some answers', () => {
      expect(calculateScore([], { q1: 1, q2: 'test' })).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('handles question with no options (should not crash, returns false)', () => {
      // A multiple choice question with no options is invalid -
      // the answer should be false because there's no valid option at index 0
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        correctAnswer: 0,
        explanation: '',
        // options is undefined
      };
      expect(checkAnswer(question, 0)).toBe(false);
    });

    it('handles empty string correct answer', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'Leave blank: ____',
        correctAnswer: '',
        explanation: '',
      };
      expect(checkAnswer(question, '')).toBe(true);
    });

    it('handles special characters in fill_blank', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'O(n²) is pronounced: ____',
        correctAnswer: 'O(n²)',
        explanation: '',
      };
      expect(checkAnswer(question, 'O(n²)')).toBe(true);
      expect(checkAnswer(question, 'o(n²)')).toBe(true);
    });

    it('handles numeric answer as string', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'What is 5 × 5?',
        correctAnswer: '25',
        explanation: '',
      };
      expect(checkAnswer(question, '25')).toBe(true);
      expect(checkAnswer(question, ' 25 ')).toBe(true);
    });

    it('handles out-of-bounds correctAnswer index', () => {
      // When correctAnswer is a numeric index that's out of bounds
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B', 'C'],
        correctAnswer: 5, // Out of bounds (only indices 0-2 are valid)
        explanation: '',
      };
      // getCorrectOptionIndex should return -1, so no answer can be correct
      expect(getCorrectOptionIndex(question)).toBe(-1);
      expect(checkAnswer(question, 5)).toBe(false);
      expect(checkAnswer(question, 0)).toBe(false);
    });

    it('handles negative correctAnswer index', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B', 'C'],
        correctAnswer: -1, // Negative index is invalid
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(-1);
      expect(checkAnswer(question, -1)).toBe(false);
      expect(checkAnswer(question, 0)).toBe(false);
    });

    it('returns false for multiple choice when getCorrectOptionIndex returns -1', () => {
      // This tests the safeguard in checkAnswer that prevents
      // false positives when correctIndex is -1
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B', 'C'],
        correctAnswer: 'NonExistentOption', // String that doesn't match any option
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(-1);
      // Even though user might answer with -1 (invalid), it shouldn't be "correct"
      expect(checkAnswer(question, -1)).toBe(false);
    });

    it('handles coding answer with passed=false', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'coding',
        prompt: 'Write code',
        correctAnswer: '',
        explanation: '',
        starterCode: 'def foo(): pass',
        testCases: [],
      };
      const answer: CodingAnswer = { code: 'def foo(): return 1', passed: false };
      expect(checkAnswer(question, answer)).toBe(false);
    });

    it('handles unknown question type gracefully', () => {
      const question = {
        id: 'q1',
        type: 'unknown_type' as any,
        prompt: 'Test',
        correctAnswer: 'answer',
        explanation: '',
      };
      expect(checkAnswer(question, 'answer')).toBe(false);
    });
  });
});
