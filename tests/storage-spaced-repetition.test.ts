/**
 * Storage Spaced Repetition Tests
 *
 * Tests for spaced repetition interval calculations, review queue management,
 * and edge cases in the spaced repetition system.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';
import type { QuizAttempt, ExerciseCompletion } from '../src/core/types';

const now = new Date('2024-06-15T12:00:00.000Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Spaced Repetition - Interval Calculations', () => {
  describe('interval progression on consecutive passes', () => {
    it('progresses through 1 -> 3 -> 7 -> 14 -> 30 day intervals', () => {
      const storage = new ProgressStorage();

      // First fail - adds to queue with interval 1
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      let queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(0);
      expect(queue[0].interval).toBe(1);

      // First pass - streak 1, interval 3
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 60,
      });

      queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(1);
      expect(queue[0].interval).toBe(3);

      // Advance time and pass again - streak 2, interval 7
      vi.advanceTimersByTime(3 * 24 * 60 * 60 * 1000);
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a3',
        timestamp: new Date().toISOString(),
        answers: {},
        score: 85,
        timeSpentSeconds: 60,
      });

      queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(2);
      expect(queue[0].interval).toBe(7);

      // Advance time and pass again - streak 3, interval 14
      vi.advanceTimersByTime(7 * 24 * 60 * 60 * 1000);
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a4',
        timestamp: new Date().toISOString(),
        answers: {},
        score: 90,
        timeSpentSeconds: 60,
      });

      queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(3);
      expect(queue[0].interval).toBe(14);

      // Advance time and pass again - streak 4, interval 30 (mastered)
      vi.advanceTimersByTime(14 * 24 * 60 * 60 * 1000);
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a5',
        timestamp: new Date().toISOString(),
        answers: {},
        score: 95,
        timeSpentSeconds: 60,
      });

      queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(4);
      expect(queue[0].interval).toBe(30);
    });

    it('maintains 30 day interval for high streaks', () => {
      const storage = new ProgressStorage();

      // Build up to streak 5+
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      // Pass multiple times to build streak
      for (let i = 0; i < 6; i++) {
        vi.advanceTimersByTime(30 * 24 * 60 * 60 * 1000);
        storage.addQuizAttempt('cs101', 'quiz-1', {
          attemptId: `pass-${i}`,
          timestamp: new Date().toISOString(),
          answers: {},
          score: 80,
          timeSpentSeconds: 60,
        });
      }

      const queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(6);
      expect(queue[0].interval).toBe(30); // Caps at 30 days
    });
  });

  describe('interval reset on failure', () => {
    it('resets streak to 0 and interval to 1 on failure', () => {
      const storage = new ProgressStorage();

      // Build up a streak
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50, // fail to add to queue
        timeSpentSeconds: 60,
      });

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 80, // pass - streak 1
        timeSpentSeconds: 60,
      });

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a3',
        timestamp: now.toISOString(),
        answers: {},
        score: 85, // pass - streak 2
        timeSpentSeconds: 60,
      });

      let queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(2);
      expect(queue[0].interval).toBe(7);

      // Now fail
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a4',
        timestamp: now.toISOString(),
        answers: {},
        score: 50, // fail
        timeSpentSeconds: 60,
      });

      queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(0);
      expect(queue[0].interval).toBe(1);
    });
  });

  describe('nextReviewAt date calculation', () => {
    it('sets nextReviewAt correctly based on interval', () => {
      const storage = new ProgressStorage();

      // Add to queue
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      // Pass to update interval to 3
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      const nextReview = new Date(queue[0].nextReviewAt);
      const expectedDate = new Date(now);
      expectedDate.setDate(expectedDate.getDate() + 3);

      // Allow 1 second tolerance for timing
      expect(Math.abs(nextReview.getTime() - expectedDate.getTime())).toBeLessThan(1000);
    });
  });
});

describe('Spaced Repetition - Review Queue Management', () => {
  describe('addToReviewQueue', () => {
    it('does not add duplicate items', () => {
      const storage = new ProgressStorage();

      // Fail twice on the same quiz
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 60,
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      expect(queue.filter(item => item.itemId === 'quiz-1')).toHaveLength(1);
    });

    it('allows same ID for different item types', () => {
      const storage = new ProgressStorage();

      // Fail a quiz
      storage.addQuizAttempt('cs101', 'item-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      // Fail an exercise with same ID
      storage.addExerciseCompletion('cs101', 'item-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def foo(): pass',
        passed: false,
        timeSpentSeconds: 300,
      });

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(2);

      const quizItem = queue.find(item => item.itemType === 'quiz');
      const exerciseItem = queue.find(item => item.itemType === 'exercise');

      expect(quizItem).toBeDefined();
      expect(exerciseItem).toBeDefined();
    });
  });

  describe('removeFromReviewQueue', () => {
    it('removes specific item from queue', () => {
      const storage = new ProgressStorage();

      // Add items to queue
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      storage.addQuizAttempt('cs101', 'quiz-2', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      expect(storage.getReviewQueue()).toHaveLength(2);

      storage.removeFromReviewQueue('quiz-1', 'quiz');

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].itemId).toBe('quiz-2');
    });

    it('only removes matching type', () => {
      const storage = new ProgressStorage();

      // Add quiz and exercise with same ID
      storage.addQuizAttempt('cs101', 'item-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      storage.addExerciseCompletion('cs101', 'item-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def foo(): pass',
        passed: false,
        timeSpentSeconds: 300,
      });

      expect(storage.getReviewQueue()).toHaveLength(2);

      storage.removeFromReviewQueue('item-1', 'quiz');

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].itemType).toBe('exercise');
    });

    it('handles non-existent item gracefully', () => {
      const storage = new ProgressStorage();

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      // Try to remove non-existent item
      storage.removeFromReviewQueue('non-existent', 'quiz');

      expect(storage.getReviewQueue()).toHaveLength(1);
    });

    it('handles empty queue gracefully', () => {
      const storage = new ProgressStorage();

      // Should not throw
      storage.removeFromReviewQueue('quiz-1', 'quiz');

      expect(storage.getReviewQueue()).toHaveLength(0);
    });
  });

  describe('updateReviewItem', () => {
    it('does nothing for non-existent item', () => {
      const storage = new ProgressStorage();

      // Should not throw
      storage.updateReviewItem('non-existent', 'quiz', true);

      expect(storage.getReviewQueue()).toHaveLength(0);
    });

    it('does nothing when queue is undefined/null', () => {
      const storage = new ProgressStorage();

      // Directly test with no items - queue should be empty array, not undefined
      storage.updateReviewItem('quiz-1', 'quiz', true);

      // Should not throw and queue should still be empty
      expect(storage.getReviewQueue()).toHaveLength(0);
    });
  });
});

describe('Spaced Repetition - Exercise Integration', () => {
  describe('exercise pass/fail tracking', () => {
    it('adds exercise to review queue on failure', () => {
      const storage = new ProgressStorage();

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def foo(): return None',
        passed: false,
        passedTestCases: 1,
        totalTestCases: 5,
        timeSpentSeconds: 300,
      });

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].itemId).toBe('ex-1');
      expect(queue[0].itemType).toBe('exercise');
      expect(queue[0].streak).toBe(0);
    });

    it('updates exercise review interval on pass', () => {
      const storage = new ProgressStorage();

      // First fail
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def foo(): return None',
        passed: false,
        timeSpentSeconds: 300,
      });

      // Then pass
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        timestamp: now.toISOString(),
        code: 'def foo(): return 42',
        passed: true,
        timeSpentSeconds: 200,
      });

      const queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(1);
      expect(queue[0].interval).toBe(3);
    });

    it('tracks quiz and exercise reviews independently', () => {
      const storage = new ProgressStorage();

      // Fail quiz
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      // Fail exercise
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def foo(): pass',
        passed: false,
        timeSpentSeconds: 300,
      });

      // Pass quiz
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      const quizItem = queue.find(item => item.itemType === 'quiz');
      const exerciseItem = queue.find(item => item.itemType === 'exercise');

      expect(quizItem?.streak).toBe(1);
      expect(quizItem?.interval).toBe(3);
      expect(exerciseItem?.streak).toBe(0);
      expect(exerciseItem?.interval).toBe(1);
    });
  });
});

describe('Spaced Repetition - Boundary Conditions', () => {
  describe('passing threshold boundaries', () => {
    it('score of exactly 70 is considered passing', () => {
      const storage = new ProgressStorage();

      // Fail first to add to queue
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      // Score of exactly 70 should pass
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 70,
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(1);
    });

    it('score of 69 is considered failing', () => {
      const storage = new ProgressStorage();

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 69,
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(0);
    });
  });

  describe('score edge cases', () => {
    it('handles 0% score', () => {
      const storage = new ProgressStorage();

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 0,
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].streak).toBe(0);
    });

    it('handles 100% score', () => {
      const storage = new ProgressStorage();

      // Fail first to add to queue
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 100,
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(1);
    });
  });
});

describe('Storage Migration - Review Queue', () => {
  it('initializes reviewQueue to empty array on migration', () => {
    // Simulate old progress data without reviewQueue
    const oldProgress = {
      version: 2,
      startedAt: now.toISOString(),
      subjects: {},
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
    };

    localStorage.setItem('study_program_progress', JSON.stringify(oldProgress));

    const storage = new ProgressStorage();
    const queue = storage.getReviewQueue();

    expect(queue).toEqual([]);
  });

  it('preserves existing reviewQueue during migration', () => {
    // Simulate progress with existing reviewQueue
    const existingProgress = {
      version: 3,
      startedAt: now.toISOString(),
      subjects: {},
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
      reviewQueue: [
        {
          itemType: 'quiz',
          itemId: 'quiz-1',
          subjectId: 'cs101',
          nextReviewAt: now.toISOString(),
          interval: 3,
          streak: 1,
        },
      ],
    };

    localStorage.setItem('study_program_progress', JSON.stringify(existingProgress));

    const storage = new ProgressStorage();
    const queue = storage.getReviewQueue();

    expect(queue).toHaveLength(1);
    expect(queue[0].itemId).toBe('quiz-1');
  });
});

describe('Storage Migration - Selected Subjects', () => {
  it('initializes selectedSubjectIds with all subjects for migrated users', () => {
    // Simulate old progress data without selectedSubjectIds
    const oldProgress = {
      version: 3,
      startedAt: now.toISOString(),
      subjects: {
        cs101: { status: 'in_progress' },
      },
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
      reviewQueue: [],
    };

    localStorage.setItem('study_program_progress', JSON.stringify(oldProgress));

    const storage = new ProgressStorage();
    const selectedSubjects = storage.getSelectedSubjects();

    // Migrated users should have all subjects selected
    expect(selectedSubjects.length).toBeGreaterThan(0);
    expect(selectedSubjects).toContain('cs101');
  });

  it('preserves existing selectedSubjectIds during migration', () => {
    const existingProgress = {
      version: 4,
      startedAt: now.toISOString(),
      subjects: {},
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
      reviewQueue: [],
      selectedSubjectIds: ['cs101', 'math101'],
    };

    localStorage.setItem('study_program_progress', JSON.stringify(existingProgress));

    const storage = new ProgressStorage();
    const selectedSubjects = storage.getSelectedSubjects();

    expect(selectedSubjects).toEqual(['cs101', 'math101']);
  });

  it('returns empty array for new users (no migration)', () => {
    // No data in localStorage - new user
    const storage = new ProgressStorage();
    const selectedSubjects = storage.getSelectedSubjects();

    expect(selectedSubjects).toEqual([]);
  });
});
