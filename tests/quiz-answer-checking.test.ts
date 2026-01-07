/**
 * Quiz Answer Checking Tests
 *
 * These tests verify the correctness of quiz answer validation logic,
 * ensuring that all question types are scored correctly.
 */

import { describe, it, expect } from 'vitest';
import type { QuizQuestion, QuizAnswer, CodingAnswer } from '@/core/types';

// Helper functions mirroring Quiz.tsx implementation

function normalizeAnswer(value: string | number | boolean | undefined): string {
  if (value === undefined) return '';
  return String(value).trim().toLowerCase();
}

function isCodingAnswer(answer: QuizAnswer | undefined): answer is CodingAnswer {
  return typeof answer === 'object' && answer !== null && 'code' in answer;
}

function checkAnswer(question: QuizQuestion, answer: QuizAnswer | undefined): boolean {
  if (answer === undefined) return false;

  switch (question.type) {
    case 'multiple_choice':
    case 'true_false':
      return answer === question.correctAnswer;
    case 'fill_blank':
    case 'code_output':
    case 'written': {
      const textAnswer = typeof answer === 'string' ? answer : '';
      return normalizeAnswer(textAnswer) === normalizeAnswer(question.correctAnswer);
    }
    case 'coding':
      return isCodingAnswer(answer) && answer.passed === true;
    default:
      return false;
  }
}

function calculateScore(questions: QuizQuestion[], answers: Record<string, QuizAnswer>): number {
  let correct = 0;
  questions.forEach((question) => {
    if (checkAnswer(question, answers[question.id])) {
      correct++;
    }
  });
  return Math.round((correct / questions.length) * 100);
}

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
  });

  describe('edge cases', () => {
    it('handles question with no options (should not crash)', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        correctAnswer: 0,
        explanation: '',
      };
      expect(checkAnswer(question, 0)).toBe(true);
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
  });
});
