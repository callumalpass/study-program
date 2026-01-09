/**
 * Quiz Scoring Import Verification Tests
 *
 * Verifies that the quiz-scoring tests use the actual quiz-utils implementation
 * instead of duplicate local implementations. This ensures that:
 * 1. Tests reflect actual production behavior
 * 2. Bounds checking in getCorrectOptionIndex is properly validated
 * 3. checkAnswer correctly handles invalid correctAnswer values
 */

import { describe, it, expect } from 'vitest';
import type { QuizQuestion, QuizAnswer } from '@/core/types';
import {
  getCorrectOptionIndex,
  checkAnswer,
  calculateScore,
} from '@/utils/quiz-utils';

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

describe('Quiz Utils Import Verification', () => {
  describe('getCorrectOptionIndex bounds checking', () => {
    it('returns -1 for out-of-bounds positive index', () => {
      // This test would FAIL if using the old duplicate implementation
      // which didn't have bounds checking
      const question = createMultipleChoice('q1', 5, ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 for negative index', () => {
      const question = createMultipleChoice('q1', -1, ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 for index exactly equal to options length', () => {
      // This is a classic off-by-one error that the bounds check catches
      const question = createMultipleChoice('q1', 4, ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns valid index when within bounds', () => {
      const question = createMultipleChoice('q1', 3, ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(3);
    });
  });

  describe('checkAnswer with invalid correctAnswer', () => {
    it('returns false when correctAnswer index is out of bounds', () => {
      // This test verifies checkAnswer properly handles -1 from getCorrectOptionIndex
      const question = createMultipleChoice('q1', 10, ['A', 'B', 'C', 'D']);

      // No answer should be correct when the correctAnswer itself is invalid
      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 2)).toBe(false);
      expect(checkAnswer(question, 3)).toBe(false);
      expect(checkAnswer(question, 10)).toBe(false);
    });

    it('correctly validates answer when correctAnswer is in bounds', () => {
      const question = createMultipleChoice('q1', 2, ['A', 'B', 'C', 'D']);

      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 2)).toBe(true);  // This is the correct answer
      expect(checkAnswer(question, 3)).toBe(false);
    });
  });

  describe('calculateScore with edge cases', () => {
    it('scores 0% when all questions have invalid correctAnswers', () => {
      const questions = [
        createMultipleChoice('q1', 100),  // invalid: index out of bounds
        createMultipleChoice('q2', -1),   // invalid: negative index
        createMultipleChoice('q3', 4),    // invalid: off-by-one
      ];
      // Even if user "guesses" the invalid indices, they should be marked wrong
      const answers: Record<string, QuizAnswer> = {
        q1: 100,
        q2: -1,
        q3: 4,
      };
      expect(calculateScore(questions, answers)).toBe(0);
    });

    it('correctly scores mix of valid and invalid questions', () => {
      const questions = [
        createMultipleChoice('q1', 0),    // valid
        createMultipleChoice('q2', 100),  // invalid: out of bounds
        createMultipleChoice('q3', 2),    // valid
      ];
      const answers: Record<string, QuizAnswer> = {
        q1: 0,   // correct
        q2: 100, // can't be correct (invalid question)
        q3: 2,   // correct
      };
      // 2 out of 3 = 67%
      expect(calculateScore(questions, answers)).toBe(67);
    });
  });

  describe('string correctAnswer handling', () => {
    it('finds correct index when correctAnswer is matching option string', () => {
      const question = createMultipleChoice('q1', 'C', ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(2);
    });

    it('returns -1 when string correctAnswer does not match any option', () => {
      const question = createMultipleChoice('q1', 'E', ['A', 'B', 'C', 'D']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('validates answers correctly with string correctAnswer', () => {
      const question = createMultipleChoice('q1', 'B', ['A', 'B', 'C', 'D']);

      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 1)).toBe(true);  // 'B' is at index 1
      expect(checkAnswer(question, 2)).toBe(false);
      expect(checkAnswer(question, 3)).toBe(false);
    });
  });
});
