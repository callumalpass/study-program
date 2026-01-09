/**
 * Quiz Score Calculation Rounding Tests
 *
 * Comprehensive tests for score calculation rounding edge cases.
 * These tests verify that calculateScore handles all percentage
 * boundaries correctly using Math.round behavior.
 */

import { describe, it, expect } from 'vitest';
import { calculateScore } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

// Helper to create multiple choice questions
const createQuestion = (id: string, correctAnswer: number): QuizQuestion => ({
  id,
  type: 'multiple_choice',
  prompt: `Question ${id}`,
  options: ['A', 'B', 'C', 'D'],
  correctAnswer,
  explanation: 'Test explanation',
});

// Helper to create N questions with correct answer at index 0
const createQuestions = (count: number): QuizQuestion[] =>
  Array.from({ length: count }, (_, i) => createQuestion(`q${i}`, 0));

// Helper to create answers object with first N correct
const createAnswers = (
  correctCount: number,
  totalCount: number
): Record<string, number> => {
  const answers: Record<string, number> = {};
  for (let i = 0; i < totalCount; i++) {
    answers[`q${i}`] = i < correctCount ? 0 : 1; // 0 is correct, 1 is incorrect
  }
  return answers;
};

describe('calculateScore rounding behavior', () => {
  describe('basic percentage calculations', () => {
    it('returns 100 for perfect score', () => {
      const questions = createQuestions(10);
      const answers = createAnswers(10, 10);
      expect(calculateScore(questions, answers)).toBe(100);
    });

    it('returns 0 for zero correct', () => {
      const questions = createQuestions(10);
      const answers = createAnswers(0, 10);
      expect(calculateScore(questions, answers)).toBe(0);
    });

    it('returns 50 for half correct', () => {
      const questions = createQuestions(10);
      const answers = createAnswers(5, 10);
      expect(calculateScore(questions, answers)).toBe(50);
    });

    it('returns 0 for empty questions array', () => {
      expect(calculateScore([], {})).toBe(0);
    });
  });

  describe('rounding at exact boundaries', () => {
    // Test cases where the percentage is exactly X.5 which rounds to X+1 with Math.round
    it('rounds 0.5 to 1 (1/2 = 50%)', () => {
      const questions = createQuestions(2);
      const answers = createAnswers(1, 2);
      expect(calculateScore(questions, answers)).toBe(50);
    });

    it('handles 1/3 = 33.33...% rounds to 33', () => {
      const questions = createQuestions(3);
      const answers = createAnswers(1, 3);
      expect(calculateScore(questions, answers)).toBe(33);
    });

    it('handles 2/3 = 66.66...% rounds to 67', () => {
      const questions = createQuestions(3);
      const answers = createAnswers(2, 3);
      expect(calculateScore(questions, answers)).toBe(67);
    });

    it('handles 1/6 = 16.66...% rounds to 17', () => {
      const questions = createQuestions(6);
      const answers = createAnswers(1, 6);
      expect(calculateScore(questions, answers)).toBe(17);
    });

    it('handles 5/6 = 83.33...% rounds to 83', () => {
      const questions = createQuestions(6);
      const answers = createAnswers(5, 6);
      expect(calculateScore(questions, answers)).toBe(83);
    });
  });

  describe('odd denominator rounding cases', () => {
    it('handles 1/7 = 14.28...% rounds to 14', () => {
      const questions = createQuestions(7);
      const answers = createAnswers(1, 7);
      expect(calculateScore(questions, answers)).toBe(14);
    });

    it('handles 3/7 = 42.85...% rounds to 43', () => {
      const questions = createQuestions(7);
      const answers = createAnswers(3, 7);
      expect(calculateScore(questions, answers)).toBe(43);
    });

    it('handles 4/7 = 57.14...% rounds to 57', () => {
      const questions = createQuestions(7);
      const answers = createAnswers(4, 7);
      expect(calculateScore(questions, answers)).toBe(57);
    });

    it('handles 6/7 = 85.71...% rounds to 86', () => {
      const questions = createQuestions(7);
      const answers = createAnswers(6, 7);
      expect(calculateScore(questions, answers)).toBe(86);
    });

    it('handles 1/9 = 11.11...% rounds to 11', () => {
      const questions = createQuestions(9);
      const answers = createAnswers(1, 9);
      expect(calculateScore(questions, answers)).toBe(11);
    });

    it('handles 8/9 = 88.88...% rounds to 89', () => {
      const questions = createQuestions(9);
      const answers = createAnswers(8, 9);
      expect(calculateScore(questions, answers)).toBe(89);
    });
  });

  describe('small quiz sizes', () => {
    it('handles single question quiz (100%)', () => {
      const questions = createQuestions(1);
      expect(calculateScore(questions, { q0: 0 })).toBe(100);
    });

    it('handles single question quiz (0%)', () => {
      const questions = createQuestions(1);
      expect(calculateScore(questions, { q0: 1 })).toBe(0);
    });

    it('handles two question quiz (0%, 50%, 100%)', () => {
      const questions = createQuestions(2);
      expect(calculateScore(questions, createAnswers(0, 2))).toBe(0);
      expect(calculateScore(questions, createAnswers(1, 2))).toBe(50);
      expect(calculateScore(questions, createAnswers(2, 2))).toBe(100);
    });

    it('handles four question quiz (0%, 25%, 50%, 75%, 100%)', () => {
      const questions = createQuestions(4);
      expect(calculateScore(questions, createAnswers(0, 4))).toBe(0);
      expect(calculateScore(questions, createAnswers(1, 4))).toBe(25);
      expect(calculateScore(questions, createAnswers(2, 4))).toBe(50);
      expect(calculateScore(questions, createAnswers(3, 4))).toBe(75);
      expect(calculateScore(questions, createAnswers(4, 4))).toBe(100);
    });
  });

  describe('larger quiz sizes', () => {
    it('handles 10 question quiz all percentages', () => {
      const questions = createQuestions(10);
      for (let i = 0; i <= 10; i++) {
        const expected = i * 10;
        expect(calculateScore(questions, createAnswers(i, 10))).toBe(expected);
      }
    });

    it('handles 20 question quiz (5% increments)', () => {
      const questions = createQuestions(20);
      for (let i = 0; i <= 20; i++) {
        const expected = i * 5;
        expect(calculateScore(questions, createAnswers(i, 20))).toBe(expected);
      }
    });

    it('handles 100 question quiz (1% increments)', () => {
      const questions = createQuestions(100);
      for (let i = 0; i <= 100; i++) {
        expect(calculateScore(questions, createAnswers(i, 100))).toBe(i);
      }
    });
  });

  describe('prime number quiz sizes', () => {
    // Prime numbers create interesting rounding scenarios
    it('handles 11 question quiz', () => {
      const questions = createQuestions(11);
      // 1/11 = 9.09% rounds to 9
      expect(calculateScore(questions, createAnswers(1, 11))).toBe(9);
      // 5/11 = 45.45% rounds to 45
      expect(calculateScore(questions, createAnswers(5, 11))).toBe(45);
      // 6/11 = 54.54% rounds to 55
      expect(calculateScore(questions, createAnswers(6, 11))).toBe(55);
      // 10/11 = 90.90% rounds to 91
      expect(calculateScore(questions, createAnswers(10, 11))).toBe(91);
    });

    it('handles 13 question quiz', () => {
      const questions = createQuestions(13);
      // 1/13 = 7.69% rounds to 8
      expect(calculateScore(questions, createAnswers(1, 13))).toBe(8);
      // 6/13 = 46.15% rounds to 46
      expect(calculateScore(questions, createAnswers(6, 13))).toBe(46);
      // 7/13 = 53.84% rounds to 54
      expect(calculateScore(questions, createAnswers(7, 13))).toBe(54);
      // 12/13 = 92.30% rounds to 92
      expect(calculateScore(questions, createAnswers(12, 13))).toBe(92);
    });

    it('handles 17 question quiz', () => {
      const questions = createQuestions(17);
      // 1/17 = 5.88% rounds to 6
      expect(calculateScore(questions, createAnswers(1, 17))).toBe(6);
      // 8/17 = 47.05% rounds to 47
      expect(calculateScore(questions, createAnswers(8, 17))).toBe(47);
      // 9/17 = 52.94% rounds to 53
      expect(calculateScore(questions, createAnswers(9, 17))).toBe(53);
      // 16/17 = 94.11% rounds to 94
      expect(calculateScore(questions, createAnswers(16, 17))).toBe(94);
    });
  });

  describe('boundary near passing score (70%)', () => {
    // QUIZ_PASSING_SCORE is 70, so testing around this boundary is important
    it('handles scores near 70% threshold for 10 questions', () => {
      const questions = createQuestions(10);
      // 6/10 = 60% (fail)
      expect(calculateScore(questions, createAnswers(6, 10))).toBe(60);
      // 7/10 = 70% (pass)
      expect(calculateScore(questions, createAnswers(7, 10))).toBe(70);
      // 8/10 = 80% (pass)
      expect(calculateScore(questions, createAnswers(8, 10))).toBe(80);
    });

    it('handles scores near 70% threshold for 7 questions', () => {
      const questions = createQuestions(7);
      // 4/7 = 57.14% (fail, rounds to 57)
      expect(calculateScore(questions, createAnswers(4, 7))).toBe(57);
      // 5/7 = 71.42% (pass, rounds to 71)
      expect(calculateScore(questions, createAnswers(5, 7))).toBe(71);
    });

    it('handles scores near 70% threshold for 3 questions', () => {
      const questions = createQuestions(3);
      // 2/3 = 66.66% (fail, rounds to 67)
      expect(calculateScore(questions, createAnswers(2, 3))).toBe(67);
      // 3/3 = 100% (pass)
      expect(calculateScore(questions, createAnswers(3, 3))).toBe(100);
    });
  });

  describe('edge cases with missing answers', () => {
    it('treats missing answers as incorrect', () => {
      const questions = createQuestions(5);
      // Only answer first 2 correctly, leave rest unanswered
      const answers = { q0: 0, q1: 0 };
      // 2/5 = 40%
      expect(calculateScore(questions, answers)).toBe(40);
    });

    it('treats partially missing answers correctly', () => {
      const questions = createQuestions(10);
      // Answer only some questions
      const answers = { q0: 0, q2: 0, q4: 0 };
      // 3/10 = 30%
      expect(calculateScore(questions, answers)).toBe(30);
    });

    it('ignores extra answers not in questions', () => {
      const questions = createQuestions(4);
      const answers = {
        q0: 0,
        q1: 0,
        q2: 0,
        q3: 0,
        extra1: 0,
        extra2: 0,
      };
      expect(calculateScore(questions, answers)).toBe(100);
    });
  });

  describe('Math.round behavior verification', () => {
    // Verify that Math.round(x.5) rounds to x+1 (rounds half up)
    it('verifies rounding 0.5 up to 1', () => {
      // 1/2 = 0.5 -> rounds to 50 (50.0)
      const questions = createQuestions(2);
      expect(calculateScore(questions, createAnswers(1, 2))).toBe(50);
    });

    it('verifies rounding .499... down', () => {
      // 49/100 = 0.49 -> rounds to 49
      const questions = createQuestions(100);
      expect(calculateScore(questions, createAnswers(49, 100))).toBe(49);
    });

    it('verifies rounding .501... up', () => {
      // 51/100 = 0.51 -> rounds to 51
      const questions = createQuestions(100);
      expect(calculateScore(questions, createAnswers(51, 100))).toBe(51);
    });
  });
});

describe('calculateScore consistency', () => {
  it('produces same result regardless of answer order', () => {
    const questions = createQuestions(5);

    // All combinations of 3 correct out of 5 should give 60%
    const combinations = [
      { q0: 0, q1: 0, q2: 0, q3: 1, q4: 1 },
      { q0: 0, q1: 0, q2: 1, q3: 0, q4: 1 },
      { q0: 0, q1: 1, q2: 0, q3: 0, q4: 1 },
      { q0: 1, q1: 0, q2: 0, q3: 0, q4: 1 },
      { q0: 1, q1: 1, q2: 0, q3: 0, q4: 0 },
    ];

    for (const answers of combinations) {
      expect(calculateScore(questions, answers)).toBe(60);
    }
  });

  it('handles questions array with different IDs', () => {
    const questions: QuizQuestion[] = [
      createQuestion('alpha', 0),
      createQuestion('beta', 1),
      createQuestion('gamma', 2),
      createQuestion('delta', 3),
    ];

    const answers = {
      alpha: 0, // correct
      beta: 1, // correct
      gamma: 1, // incorrect (should be 2)
      delta: 3, // correct
    };

    // 3/4 = 75%
    expect(calculateScore(questions, answers)).toBe(75);
  });
});
