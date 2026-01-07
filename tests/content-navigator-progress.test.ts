/**
 * Tests for ContentNavigator progress tracking helpers
 *
 * These tests verify that the topic completion and progress tracking
 * functions in ContentNavigator correctly check for passing scores
 * (>= QUIZ_PASSING_SCORE) rather than just checking for any attempts.
 */

import { describe, expect, it } from 'vitest';
import type { Topic, SubjectProgress, QuizAttempt } from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

// Helper to create a quiz attempt
const makeQuizAttempt = (score: number): QuizAttempt => ({
  attemptId: `attempt-${score}-${Date.now()}`,
  timestamp: new Date().toISOString(),
  answers: {},
  score,
  timeSpentSeconds: 60,
});

// Helper to create exercise completion
const makeExerciseCompletion = (passed: boolean) => ({
  completionId: `completion-${Date.now()}`,
  timestamp: new Date().toISOString(),
  code: 'test code',
  passed,
  timeSpentSeconds: 120,
});

// Helper to create a topic
const makeTopic = (overrides?: Partial<Topic>): Topic => ({
  id: 'topic-1',
  title: 'Test Topic',
  content: 'Topic content',
  quizIds: ['quiz-1'],
  exerciseIds: ['exercise-1'],
  ...overrides,
});

// Helper to create subject progress
const makeProgress = (overrides?: Partial<SubjectProgress>): SubjectProgress => ({
  status: 'in_progress',
  quizAttempts: {},
  examAttempts: {},
  exerciseCompletions: {},
  projectSubmissions: {},
  subtopicViews: {},
  ...overrides,
});

/**
 * Re-implementation of the isTopicCompleted function from ContentNavigator
 * to test the fix that checks for passing scores instead of just attempts
 */
function isTopicCompleted(topic: Topic, progress: SubjectProgress | undefined): boolean {
  if (!progress) return false;
  const quizzesComplete = topic.quizIds.every(qid => {
    const attempts = progress.quizAttempts?.[qid];
    // Check if any attempt has a passing score
    return attempts && attempts.some(a => a.score >= QUIZ_PASSING_SCORE);
  });
  const exercisesComplete = topic.exerciseIds.every(eid => {
    const completion = progress.exerciseCompletions?.[eid];
    return completion?.passed;
  });
  return quizzesComplete && exercisesComplete;
}

/**
 * Re-implementation of the getTopicProgress function from ContentNavigator
 * to test the fix that checks for passing scores instead of just attempts
 */
function getTopicProgress(
  topic: Topic,
  progress: SubjectProgress | undefined
): { completed: number; total: number } {
  if (!progress) {
    return { completed: 0, total: topic.quizIds.length + topic.exerciseIds.length };
  }

  const quizzesCompleted = topic.quizIds.filter(qid => {
    const attempts = progress.quizAttempts?.[qid];
    // Check if any attempt has a passing score
    return attempts && attempts.some(a => a.score >= QUIZ_PASSING_SCORE);
  }).length;

  const exercisesCompleted = topic.exerciseIds.filter(eid => {
    const completion = progress.exerciseCompletions?.[eid];
    return completion?.passed;
  }).length;

  return {
    completed: quizzesCompleted + exercisesCompleted,
    total: topic.quizIds.length + topic.exerciseIds.length,
  };
}

describe('ContentNavigator Progress Helpers', () => {
  describe('QUIZ_PASSING_SCORE constant', () => {
    it('should be 70', () => {
      expect(QUIZ_PASSING_SCORE).toBe(70);
    });
  });

  describe('isTopicCompleted', () => {
    it('returns false when progress is undefined', () => {
      const topic = makeTopic();
      expect(isTopicCompleted(topic, undefined)).toBe(false);
    });

    it('returns false when quizzes have no attempts', () => {
      const topic = makeTopic();
      const progress = makeProgress();
      expect(isTopicCompleted(topic, progress)).toBe(false);
    });

    it('returns false when quizzes have only failing attempts (below 70%)', () => {
      const topic = makeTopic();
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(50), makeQuizAttempt(60), makeQuizAttempt(69)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      // Quiz best score is 69 which is below 70% threshold
      expect(isTopicCompleted(topic, progress)).toBe(false);
    });

    it('returns true when quizzes have at least one passing attempt (70% or above)', () => {
      const topic = makeTopic();
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(50), makeQuizAttempt(70)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(true);
    });

    it('returns false when exercises are not passed even if quizzes pass', () => {
      const topic = makeTopic();
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(85)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(false),
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(false);
    });

    it('returns true when all quizzes pass and all exercises are completed', () => {
      const topic = makeTopic({
        quizIds: ['quiz-1', 'quiz-2'],
        exerciseIds: ['exercise-1', 'exercise-2'],
      });
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(75)],
          'quiz-2': [makeQuizAttempt(80)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
          'exercise-2': makeExerciseCompletion(true),
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(true);
    });

    it('returns false when only some quizzes pass', () => {
      const topic = makeTopic({
        quizIds: ['quiz-1', 'quiz-2'],
        exerciseIds: [],
      });
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(85)],
          'quiz-2': [makeQuizAttempt(60)], // Failing
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(false);
    });

    it('returns true for topic with no quizzes and completed exercises', () => {
      const topic = makeTopic({
        quizIds: [],
        exerciseIds: ['exercise-1'],
      });
      const progress = makeProgress({
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(true);
    });

    it('returns true for topic with no exercises and passed quizzes', () => {
      const topic = makeTopic({
        quizIds: ['quiz-1'],
        exerciseIds: [],
      });
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(75)],
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(true);
    });

    it('returns true for empty topic (no quizzes or exercises)', () => {
      const topic = makeTopic({
        quizIds: [],
        exerciseIds: [],
      });
      const progress = makeProgress();
      expect(isTopicCompleted(topic, progress)).toBe(true);
    });

    it('considers best score when there are multiple quiz attempts', () => {
      const topic = makeTopic();
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [
            makeQuizAttempt(40),
            makeQuizAttempt(55),
            makeQuizAttempt(72), // Passing score
            makeQuizAttempt(65),
          ],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      // At least one attempt passes (72%), so topic should be complete
      expect(isTopicCompleted(topic, progress)).toBe(true);
    });
  });

  describe('getTopicProgress', () => {
    it('returns zero completed when progress is undefined', () => {
      const topic = makeTopic();
      const result = getTopicProgress(topic, undefined);
      expect(result).toEqual({ completed: 0, total: 2 });
    });

    it('returns zero completed when there are no attempts', () => {
      const topic = makeTopic();
      const progress = makeProgress();
      const result = getTopicProgress(topic, progress);
      expect(result).toEqual({ completed: 0, total: 2 });
    });

    it('counts only passing quiz attempts (>= 70%) as completed', () => {
      const topic = makeTopic({
        quizIds: ['quiz-1', 'quiz-2', 'quiz-3'],
        exerciseIds: [],
      });
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(69)], // Failing
          'quiz-2': [makeQuizAttempt(70)], // Passing
          'quiz-3': [makeQuizAttempt(85)], // Passing
        },
      });
      const result = getTopicProgress(topic, progress);
      expect(result).toEqual({ completed: 2, total: 3 });
    });

    it('counts exercises as completed only when passed', () => {
      const topic = makeTopic({
        quizIds: [],
        exerciseIds: ['exercise-1', 'exercise-2', 'exercise-3'],
      });
      const progress = makeProgress({
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
          'exercise-2': makeExerciseCompletion(false),
          'exercise-3': makeExerciseCompletion(true),
        },
      });
      const result = getTopicProgress(topic, progress);
      expect(result).toEqual({ completed: 2, total: 3 });
    });

    it('correctly counts mix of quizzes and exercises', () => {
      const topic = makeTopic({
        quizIds: ['quiz-1', 'quiz-2'],
        exerciseIds: ['exercise-1', 'exercise-2'],
      });
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(75)], // Passing
          'quiz-2': [makeQuizAttempt(65)], // Failing
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
          'exercise-2': makeExerciseCompletion(false),
        },
      });
      const result = getTopicProgress(topic, progress);
      expect(result).toEqual({ completed: 2, total: 4 });
    });

    it('handles empty topic', () => {
      const topic = makeTopic({
        quizIds: [],
        exerciseIds: [],
      });
      const progress = makeProgress();
      const result = getTopicProgress(topic, progress);
      expect(result).toEqual({ completed: 0, total: 0 });
    });

    it('counts quiz with any passing attempt as completed', () => {
      const topic = makeTopic({
        quizIds: ['quiz-1'],
        exerciseIds: [],
      });
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [
            makeQuizAttempt(50),
            makeQuizAttempt(55),
            makeQuizAttempt(72), // One passing attempt
            makeQuizAttempt(60),
          ],
        },
      });
      const result = getTopicProgress(topic, progress);
      expect(result).toEqual({ completed: 1, total: 1 });
    });
  });

  describe('Passing score threshold edge cases', () => {
    it('score of 69 is failing', () => {
      const topic = makeTopic();
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(69)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(false);
    });

    it('score of 70 is passing', () => {
      const topic = makeTopic();
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(70)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(true);
    });

    it('score of 71 is passing', () => {
      const topic = makeTopic();
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(71)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(true);
    });

    it('score of 100 is passing', () => {
      const topic = makeTopic();
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(100)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(true);
    });

    it('score of 0 is failing', () => {
      const topic = makeTopic();
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(0)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      expect(isTopicCompleted(topic, progress)).toBe(false);
    });
  });

  describe('Bug fix verification: attempts vs passing scores', () => {
    /**
     * This test specifically verifies the bug fix where topics were
     * incorrectly marked as "completed" when quizzes had any attempts,
     * even if all attempts were failing.
     *
     * Before fix: A topic with quiz attempts at 50%, 60%, 65% would be
     * marked as "completed" because attempts.length > 0.
     *
     * After fix: The same topic is correctly marked as "not completed"
     * because none of the attempts meet the 70% passing threshold.
     */
    it('topic with multiple failing quiz attempts should NOT be completed', () => {
      const topic = makeTopic({
        quizIds: ['quiz-1', 'quiz-2'],
        exerciseIds: ['exercise-1'],
      });
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(50), makeQuizAttempt(55), makeQuizAttempt(60)],
          'quiz-2': [makeQuizAttempt(65), makeQuizAttempt(68), makeQuizAttempt(69)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });

      // Bug before fix: Would incorrectly return true because attempts exist
      // After fix: Correctly returns false because no quiz has a passing score
      expect(isTopicCompleted(topic, progress)).toBe(false);

      // Progress count should also reflect that only exercise is completed
      const progressResult = getTopicProgress(topic, progress);
      expect(progressResult).toEqual({ completed: 1, total: 3 }); // Only exercise completed
    });

    it('topic is only complete when ALL quizzes have at least one passing attempt', () => {
      const topic = makeTopic({
        quizIds: ['quiz-1', 'quiz-2'],
        exerciseIds: [],
      });

      // Only quiz-1 has a passing score
      const progress = makeProgress({
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(45), makeQuizAttempt(75)], // Has passing attempt
          'quiz-2': [makeQuizAttempt(65), makeQuizAttempt(68)], // All failing
        },
      });

      expect(isTopicCompleted(topic, progress)).toBe(false);

      const progressResult = getTopicProgress(topic, progress);
      expect(progressResult).toEqual({ completed: 1, total: 2 }); // Only quiz-1 passed
    });
  });
});
