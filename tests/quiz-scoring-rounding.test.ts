/**
 * Quiz Scoring Rounding Tests
 *
 * Comprehensive tests for verifying that quiz score calculation
 * rounds correctly for all edge cases involving fractions.
 */

import { describe, it, expect } from 'vitest';
import { calculateScore } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

// Helper to create multiple choice questions for testing
const createQuestion = (id: string, correctAnswer: number): QuizQuestion => ({
  id,
  type: 'multiple_choice',
  prompt: `Question ${id}`,
  options: ['A', 'B', 'C', 'D'],
  correctAnswer,
  explanation: 'Explanation',
});

describe('calculateScore rounding behavior', () => {
  describe('common fractional scores', () => {
    it('rounds 1/3 (33.33%) to 33', () => {
      const questions = [
        createQuestion('q1', 0),
        createQuestion('q2', 0),
        createQuestion('q3', 0),
      ];
      expect(calculateScore(questions, { q1: 0 })).toBe(33);
    });

    it('rounds 2/3 (66.67%) to 67', () => {
      const questions = [
        createQuestion('q1', 0),
        createQuestion('q2', 0),
        createQuestion('q3', 0),
      ];
      expect(calculateScore(questions, { q1: 0, q2: 0 })).toBe(67);
    });

    it('rounds 1/6 (16.67%) to 17', () => {
      const questions = Array.from({ length: 6 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0 })).toBe(17);
    });

    it('rounds 5/6 (83.33%) to 83', () => {
      const questions = Array.from({ length: 6 }, (_, i) => createQuestion(`q${i}`, 0));
      const answers = { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0 };
      expect(calculateScore(questions, answers)).toBe(83);
    });
  });

  describe('boundary rounding cases', () => {
    it('rounds 1/7 (14.29%) to 14', () => {
      const questions = Array.from({ length: 7 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0 })).toBe(14);
    });

    it('rounds 2/7 (28.57%) to 29', () => {
      const questions = Array.from({ length: 7 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0, q1: 0 })).toBe(29);
    });

    it('rounds 3/7 (42.86%) to 43', () => {
      const questions = Array.from({ length: 7 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0 })).toBe(43);
    });

    it('rounds 4/7 (57.14%) to 57', () => {
      const questions = Array.from({ length: 7 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0, q3: 0 })).toBe(57);
    });

    it('rounds 5/7 (71.43%) to 71', () => {
      const questions = Array.from({ length: 7 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0 })).toBe(71);
    });

    it('rounds 6/7 (85.71%) to 86', () => {
      const questions = Array.from({ length: 7 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 })).toBe(86);
    });
  });

  describe('exact percentages (no rounding needed)', () => {
    it('returns 0 for 0/n', () => {
      const questions = Array.from({ length: 5 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, {})).toBe(0);
    });

    it('returns 100 for n/n', () => {
      const questions = Array.from({ length: 5 }, (_, i) => createQuestion(`q${i}`, 0));
      const answers = { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0 };
      expect(calculateScore(questions, answers)).toBe(100);
    });

    it('returns 50 for 1/2', () => {
      const questions = [createQuestion('q0', 0), createQuestion('q1', 0)];
      expect(calculateScore(questions, { q0: 0 })).toBe(50);
    });

    it('returns 25 for 1/4', () => {
      const questions = Array.from({ length: 4 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0 })).toBe(25);
    });

    it('returns 75 for 3/4', () => {
      const questions = Array.from({ length: 4 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0 })).toBe(75);
    });

    it('returns 20 for 1/5', () => {
      const questions = Array.from({ length: 5 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0 })).toBe(20);
    });

    it('returns 40 for 2/5', () => {
      const questions = Array.from({ length: 5 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0, q1: 0 })).toBe(40);
    });

    it('returns 60 for 3/5', () => {
      const questions = Array.from({ length: 5 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0 })).toBe(60);
    });

    it('returns 80 for 4/5', () => {
      const questions = Array.from({ length: 5 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0, q3: 0 })).toBe(80);
    });

    it('returns 10 for 1/10', () => {
      const questions = Array.from({ length: 10 }, (_, i) => createQuestion(`q${i}`, 0));
      expect(calculateScore(questions, { q0: 0 })).toBe(10);
    });
  });

  describe('passing score threshold verification', () => {
    // QUIZ_PASSING_SCORE is 70, so we verify scores around that threshold
    const PASSING_SCORE = 70;

    it('7/10 (70%) is exactly passing', () => {
      const questions = Array.from({ length: 10 }, (_, i) => createQuestion(`q${i}`, 0));
      const answers = Object.fromEntries(
        Array.from({ length: 7 }, (_, i) => [`q${i}`, 0])
      );
      const score = calculateScore(questions, answers);
      expect(score).toBe(70);
      expect(score >= PASSING_SCORE).toBe(true);
    });

    it('5/7 (71.43% rounds to 71) is passing', () => {
      const questions = Array.from({ length: 7 }, (_, i) => createQuestion(`q${i}`, 0));
      const answers = Object.fromEntries(
        Array.from({ length: 5 }, (_, i) => [`q${i}`, 0])
      );
      const score = calculateScore(questions, answers);
      expect(score).toBe(71);
      expect(score >= PASSING_SCORE).toBe(true);
    });

    it('4/6 (66.67% rounds to 67) is not passing', () => {
      const questions = Array.from({ length: 6 }, (_, i) => createQuestion(`q${i}`, 0));
      const answers = Object.fromEntries(
        Array.from({ length: 4 }, (_, i) => [`q${i}`, 0])
      );
      const score = calculateScore(questions, answers);
      expect(score).toBe(67);
      expect(score >= PASSING_SCORE).toBe(false);
    });

    it('7/10 passes but 6/10 does not', () => {
      const questions = Array.from({ length: 10 }, (_, i) => createQuestion(`q${i}`, 0));

      const passingAnswers = Object.fromEntries(
        Array.from({ length: 7 }, (_, i) => [`q${i}`, 0])
      );
      expect(calculateScore(questions, passingAnswers) >= PASSING_SCORE).toBe(true);

      const failingAnswers = Object.fromEntries(
        Array.from({ length: 6 }, (_, i) => [`q${i}`, 0])
      );
      expect(calculateScore(questions, failingAnswers) >= PASSING_SCORE).toBe(false);
    });
  });

  describe('large quiz scoring', () => {
    it('handles 20-question quiz correctly', () => {
      const questions = Array.from({ length: 20 }, (_, i) => createQuestion(`q${i}`, 0));

      // 15/20 = 75%
      const answers = Object.fromEntries(
        Array.from({ length: 15 }, (_, i) => [`q${i}`, 0])
      );
      expect(calculateScore(questions, answers)).toBe(75);
    });

    it('handles 50-question quiz correctly', () => {
      const questions = Array.from({ length: 50 }, (_, i) => createQuestion(`q${i}`, 0));

      // 37/50 = 74%
      const answers = Object.fromEntries(
        Array.from({ length: 37 }, (_, i) => [`q${i}`, 0])
      );
      expect(calculateScore(questions, answers)).toBe(74);
    });

    it('handles 100-question quiz correctly', () => {
      const questions = Array.from({ length: 100 }, (_, i) => createQuestion(`q${i}`, 0));

      // 73/100 = 73%
      const answers = Object.fromEntries(
        Array.from({ length: 73 }, (_, i) => [`q${i}`, 0])
      );
      expect(calculateScore(questions, answers)).toBe(73);
    });
  });

  describe('consistency with Math.round behavior', () => {
    // Verify that Math.round's "round half away from zero" behavior is used
    it('0.5 rounds to 1 (half up)', () => {
      // 1/2 = 0.5 should round to 1, but percentage is 50, not affected
      const questions = [createQuestion('q0', 0), createQuestion('q1', 0)];
      expect(calculateScore(questions, { q0: 0 })).toBe(50);
    });

    it('rounds 2.5% (1/40) to 3', () => {
      const questions = Array.from({ length: 40 }, (_, i) => createQuestion(`q${i}`, 0));
      // 1/40 = 2.5%, Math.round(2.5) = 3
      expect(calculateScore(questions, { q0: 0 })).toBe(3);
    });

    it('rounds 7.5% (3/40) to 8', () => {
      const questions = Array.from({ length: 40 }, (_, i) => createQuestion(`q${i}`, 0));
      // 3/40 = 7.5%, Math.round(7.5) = 8
      expect(calculateScore(questions, { q0: 0, q1: 0, q2: 0 })).toBe(8);
    });
  });
});
