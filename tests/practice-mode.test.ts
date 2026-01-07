/**
 * Practice Mode Tests
 *
 * These tests verify the answer checking and display logic in PracticeMode.tsx,
 * particularly focusing on:
 * - Multiple choice questions with string correctAnswers
 * - Proper handling of correct option index resolution
 * - Edge cases in answer display
 *
 * These tests use the shared quiz-utils functions that PracticeMode.tsx imports.
 */

import { describe, it, expect } from 'vitest';
import type { QuizQuestion, CodingAnswer } from '@/core/types';
import { isCodingAnswer, getCorrectOptionIndex, checkAnswer } from '@/utils/quiz-utils';

/**
 * Get the correct answer text for display in feedback.
 * Handles both numeric indices and string correctAnswers for multiple choice.
 */
function getCorrectAnswerText(question: QuizQuestion): string {
  if (question.type === 'multiple_choice' && question.options) {
    const correctIndex = getCorrectOptionIndex(question);
    if (correctIndex >= 0 && correctIndex < question.options.length) {
      return question.options[correctIndex];
    } else {
      // Fallback if correctAnswer is the actual option text
      return String(question.correctAnswer);
    }
  } else if (question.type === 'true_false') {
    return question.correctAnswer ? 'True' : 'False';
  } else {
    return String(question.correctAnswer);
  }
}

describe('Practice Mode Answer Checking', () => {
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
        correctAnswer: 'Delta',
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

    it('handles complex string correctAnswers with special characters', () => {
      const question: QuizQuestion = {
        id: 'q7',
        type: 'multiple_choice',
        prompt: 'Which is the Möbius transformation?',
        options: [
          'f(z) = az + b',
          'f(z) = z²',
          'f(z) = (az+b)/(cz+d)',
          'f(z) = e^z',
        ],
        correctAnswer: 'f(z) = (az+b)/(cz+d)',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(2);
    });

    it('handles zero as a valid index', () => {
      const question: QuizQuestion = {
        id: 'q8',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['Zero', 'One', 'Two'],
        correctAnswer: 0,
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(0);
    });
  });

  describe('checkAnswer - multiple_choice with string correctAnswer', () => {
    const questionWithStringAnswer: QuizQuestion = {
      id: 'q-string',
      type: 'multiple_choice',
      prompt: 'What is conformal at z₀?',
      options: ['Constant', 'Conformal at z₀', 'Zero', 'Unbounded'],
      correctAnswer: 'Conformal at z₀',
      explanation: '',
    };

    it('returns true when user selects the index matching the string correctAnswer', () => {
      expect(checkAnswer(questionWithStringAnswer, 1)).toBe(true);
    });

    it('returns false when user selects wrong index', () => {
      expect(checkAnswer(questionWithStringAnswer, 0)).toBe(false);
      expect(checkAnswer(questionWithStringAnswer, 2)).toBe(false);
      expect(checkAnswer(questionWithStringAnswer, 3)).toBe(false);
    });

    it('returns false for undefined answer', () => {
      expect(checkAnswer(questionWithStringAnswer, undefined)).toBe(false);
    });

    const questionWithNumericIndex: QuizQuestion = {
      id: 'q-numeric',
      type: 'multiple_choice',
      prompt: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: '',
    };

    it('works correctly with numeric index correctAnswer', () => {
      expect(checkAnswer(questionWithNumericIndex, 1)).toBe(true);
      expect(checkAnswer(questionWithNumericIndex, 0)).toBe(false);
    });
  });

  describe('checkAnswer - true_false', () => {
    const trueQuestion: QuizQuestion = {
      id: 'q-true',
      type: 'true_false',
      prompt: 'The sky is blue.',
      correctAnswer: true,
      explanation: '',
    };

    const falseQuestion: QuizQuestion = {
      id: 'q-false',
      type: 'true_false',
      prompt: 'The earth is flat.',
      correctAnswer: false,
      explanation: '',
    };

    it('returns true for correct true answer', () => {
      expect(checkAnswer(trueQuestion, true)).toBe(true);
    });

    it('returns false for incorrect answer to true question', () => {
      expect(checkAnswer(trueQuestion, false)).toBe(false);
    });

    it('returns true for correct false answer', () => {
      expect(checkAnswer(falseQuestion, false)).toBe(true);
    });

    it('returns false for incorrect answer to false question', () => {
      expect(checkAnswer(falseQuestion, true)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(checkAnswer(trueQuestion, undefined)).toBe(false);
    });
  });

  describe('checkAnswer - fill_blank and code_output', () => {
    const fillBlankQuestion: QuizQuestion = {
      id: 'q-fill',
      type: 'fill_blank',
      prompt: 'The capital of France is ____.',
      correctAnswer: 'Paris',
      explanation: '',
    };

    const codeOutputQuestion: QuizQuestion = {
      id: 'q-code',
      type: 'code_output',
      prompt: 'What does print(2+2) output?',
      correctAnswer: '4',
      explanation: '',
    };

    it('fill_blank: returns true for case-insensitive match', () => {
      expect(checkAnswer(fillBlankQuestion, 'paris')).toBe(true);
      expect(checkAnswer(fillBlankQuestion, 'PARIS')).toBe(true);
      expect(checkAnswer(fillBlankQuestion, 'Paris')).toBe(true);
    });

    it('fill_blank: returns true with extra whitespace', () => {
      expect(checkAnswer(fillBlankQuestion, '  Paris  ')).toBe(true);
    });

    it('fill_blank: returns false for wrong answer', () => {
      expect(checkAnswer(fillBlankQuestion, 'London')).toBe(false);
    });

    it('code_output: returns true for exact match', () => {
      expect(checkAnswer(codeOutputQuestion, '4')).toBe(true);
    });

    it('code_output: returns true with whitespace', () => {
      expect(checkAnswer(codeOutputQuestion, ' 4 ')).toBe(true);
    });
  });

  describe('getCorrectAnswerText', () => {
    it('returns option text for multiple choice with numeric index', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['Alpha', 'Beta', 'Gamma'],
        correctAnswer: 1,
        explanation: '',
      };
      expect(getCorrectAnswerText(question)).toBe('Beta');
    });

    it('returns option text for multiple choice with string correctAnswer', () => {
      const question: QuizQuestion = {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['Alpha', 'Beta', 'Gamma'],
        correctAnswer: 'Beta',
        explanation: '',
      };
      expect(getCorrectAnswerText(question)).toBe('Beta');
    });

    it('returns the correctAnswer as fallback when no matching option found', () => {
      const question: QuizQuestion = {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B', 'C'],
        correctAnswer: 'NonExistent',
        explanation: '',
      };
      expect(getCorrectAnswerText(question)).toBe('NonExistent');
    });

    it('returns "True" for true_false with true correctAnswer', () => {
      const question: QuizQuestion = {
        id: 'q4',
        type: 'true_false',
        prompt: 'Test',
        correctAnswer: true,
        explanation: '',
      };
      expect(getCorrectAnswerText(question)).toBe('True');
    });

    it('returns "False" for true_false with false correctAnswer', () => {
      const question: QuizQuestion = {
        id: 'q5',
        type: 'true_false',
        prompt: 'Test',
        correctAnswer: false,
        explanation: '',
      };
      expect(getCorrectAnswerText(question)).toBe('False');
    });

    it('returns string for other question types', () => {
      const question: QuizQuestion = {
        id: 'q6',
        type: 'fill_blank',
        prompt: 'Test',
        correctAnswer: 'Paris',
        explanation: '',
      };
      expect(getCorrectAnswerText(question)).toBe('Paris');
    });

    it('handles numeric correctAnswer for code_output', () => {
      const question: QuizQuestion = {
        id: 'q7',
        type: 'code_output',
        prompt: 'Test',
        correctAnswer: '42',
        explanation: '',
      };
      expect(getCorrectAnswerText(question)).toBe('42');
    });
  });

  describe('edge cases', () => {
    it('handles multiple choice with no options gracefully', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        correctAnswer: 0,
        explanation: '',
      };
      // Should not crash, returns the index as answer
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('handles empty options array', () => {
      const question: QuizQuestion = {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Test',
        options: [],
        correctAnswer: 'A',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('handles coding answer type check', () => {
      const codingAnswer: CodingAnswer = { code: 'print("hello")', passed: true };
      expect(isCodingAnswer(codingAnswer)).toBe(true);
      expect(isCodingAnswer('string answer')).toBe(false);
      expect(isCodingAnswer(42)).toBe(false);
      expect(isCodingAnswer(undefined)).toBe(false);
    });

    it('handles boundary index values', () => {
      const question: QuizQuestion = {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['Only option'],
        correctAnswer: 0,
        explanation: '',
      };
      expect(checkAnswer(question, 0)).toBe(true);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, -1)).toBe(false);
    });
  });
});
