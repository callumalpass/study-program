/**
 * Spaced Repetition Edge Cases Tests
 *
 * Tests edge cases in the spaced repetition system that aren't covered
 * by the main storage-review-queue.test.ts file. Focuses on:
 * - Boundary conditions for streak values
 * - Multiple rapid updates
 * - Review queue integrity after various operations
 * - Integration with quiz/exercise score thresholds
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

const now = new Date('2024-06-15T12:00:00.000Z');

const makeStorage = () => new ProgressStorage();

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Spaced Repetition Edge Cases', () => {
  describe('streak boundary conditions', () => {
    it('handles streak progression from 0 through mastery (streak 4+)', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Initial state
      let item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);

      // Pass 1: streak 0 -> 1, interval 3
      storage.updateReviewItem('q1', 'quiz', true);
      item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(1);
      expect(item.interval).toBe(3);

      // Pass 2: streak 1 -> 2, interval 7
      storage.updateReviewItem('q1', 'quiz', true);
      item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(2);
      expect(item.interval).toBe(7);

      // Pass 3: streak 2 -> 3, interval 14
      storage.updateReviewItem('q1', 'quiz', true);
      item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(3);
      expect(item.interval).toBe(14);

      // Pass 4: streak 3 -> 4, interval 30 (mastered)
      storage.updateReviewItem('q1', 'quiz', true);
      item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(4);
      expect(item.interval).toBe(30);

      // Pass 5+: streak continues but interval stays at 30
      storage.updateReviewItem('q1', 'quiz', true);
      item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(5);
      expect(item.interval).toBe(30);
    });

    it('resets streak to 0 on failure at any streak level', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up to streak 3
      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q1', 'quiz', true);
      expect(storage.getReviewQueue()[0].streak).toBe(3);

      // Fail resets to 0
      storage.updateReviewItem('q1', 'quiz', false);
      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);
    });

    it('handles alternating pass/fail pattern', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Pass -> streak 1
      storage.updateReviewItem('q1', 'quiz', true);
      expect(storage.getReviewQueue()[0].streak).toBe(1);

      // Fail -> streak 0
      storage.updateReviewItem('q1', 'quiz', false);
      expect(storage.getReviewQueue()[0].streak).toBe(0);

      // Pass -> streak 1
      storage.updateReviewItem('q1', 'quiz', true);
      expect(storage.getReviewQueue()[0].streak).toBe(1);

      // Pass -> streak 2
      storage.updateReviewItem('q1', 'quiz', true);
      expect(storage.getReviewQueue()[0].streak).toBe(2);

      // Fail -> streak 0
      storage.updateReviewItem('q1', 'quiz', false);
      expect(storage.getReviewQueue()[0].streak).toBe(0);
    });
  });

  describe('multiple items in queue', () => {
    it('updates correct item when queue has multiple items', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e1', subjectId: 's1' });

      // Update only q2
      storage.updateReviewItem('q2', 'quiz', true);

      const queue = storage.getReviewQueue();
      const q1 = queue.find(item => item.itemId === 'q1');
      const q2 = queue.find(item => item.itemId === 'q2');
      const e1 = queue.find(item => item.itemId === 'e1');

      expect(q1?.streak).toBe(0);
      expect(q2?.streak).toBe(1);
      expect(e1?.streak).toBe(0);
    });

    it('maintains queue integrity after removing middle item', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 's1' });

      storage.removeFromReviewQueue('q2', 'quiz');

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(2);
      expect(queue.map(item => item.itemId)).toEqual(['q1', 'q3']);
    });

    it('handles same itemId with different itemTypes independently', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'item1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'item1', subjectId: 's1' });

      // Update only the quiz
      storage.updateReviewItem('item1', 'quiz', true);

      const queue = storage.getReviewQueue();
      const quizItem = queue.find(item => item.itemId === 'item1' && item.itemType === 'quiz');
      const exerciseItem = queue.find(item => item.itemId === 'item1' && item.itemType === 'exercise');

      expect(quizItem?.streak).toBe(1);
      expect(exerciseItem?.streak).toBe(0);
    });
  });

  describe('quiz attempt integration', () => {
    it('adds item to queue only on first failing attempt', () => {
      const storage = makeStorage();

      // First failing attempt - should add to queue
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: QUIZ_PASSING_SCORE - 1,
        timeSpentSeconds: 60,
      });
      expect(storage.getReviewQueue()).toHaveLength(1);

      // Second failing attempt - should not add duplicate
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: QUIZ_PASSING_SCORE - 10,
        timeSpentSeconds: 60,
      });
      expect(storage.getReviewQueue()).toHaveLength(1);
    });

    it('updates streak correctly when quiz score fluctuates around threshold', () => {
      const storage = makeStorage();

      // Fail (adds to queue, streak 0)
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: QUIZ_PASSING_SCORE - 1,
        timeSpentSeconds: 60,
      });
      expect(storage.getReviewQueue()[0].streak).toBe(0);

      // Pass (streak 1)
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: QUIZ_PASSING_SCORE,
        timeSpentSeconds: 60,
      });
      expect(storage.getReviewQueue()[0].streak).toBe(1);

      // Fail again (streak 0)
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a3',
        timestamp: now.toISOString(),
        answers: {},
        score: QUIZ_PASSING_SCORE - 1,
        timeSpentSeconds: 60,
      });
      expect(storage.getReviewQueue()[0].streak).toBe(0);
    });

    it('handles score exactly at passing threshold as pass', () => {
      const storage = makeStorage();

      // First add to queue with failing score
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: QUIZ_PASSING_SCORE - 1,
        timeSpentSeconds: 60,
      });
      expect(storage.getReviewQueue()[0].streak).toBe(0);

      // Score exactly at threshold should count as pass
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: QUIZ_PASSING_SCORE,
        timeSpentSeconds: 60,
      });
      expect(storage.getReviewQueue()[0].streak).toBe(1);
    });

    it('handles perfect score (100) correctly', () => {
      const storage = makeStorage();

      // First fail to add to queue
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      // Perfect score should increment streak
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 100,
        timeSpentSeconds: 60,
      });

      expect(storage.getReviewQueue()[0].streak).toBe(1);
    });

    it('handles score of 0 correctly', () => {
      const storage = makeStorage();

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
  });

  describe('exercise completion integration', () => {
    it('adds exercise to queue on failure and updates on pass', () => {
      const storage = makeStorage();

      // Fail - should add to queue
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'print("wrong")',
        passed: false,
        timeSpentSeconds: 120,
      });
      expect(storage.getReviewQueue()).toHaveLength(1);
      expect(storage.getReviewQueue()[0].streak).toBe(0);

      // Pass - should update streak
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        timestamp: now.toISOString(),
        code: 'print("correct")',
        passed: true,
        timeSpentSeconds: 120,
      });
      expect(storage.getReviewQueue()[0].streak).toBe(1);
    });

    it('handles mixed quiz and exercise in queue from same subject', () => {
      const storage = makeStorage();

      // Add failing quiz
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      // Add failing exercise
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'print("wrong")',
        passed: false,
        timeSpentSeconds: 120,
      });

      expect(storage.getReviewQueue()).toHaveLength(2);

      // Pass quiz
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 85,
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      const quizItem = queue.find(item => item.itemType === 'quiz');
      const exerciseItem = queue.find(item => item.itemType === 'exercise');

      expect(quizItem?.streak).toBe(1);
      expect(exerciseItem?.streak).toBe(0);
    });
  });

  describe('due date calculations', () => {
    it('calculates nextReviewAt correctly for each interval level', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Initial: due now
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).getTime()).toBe(now.getTime());

      // Pass 1: due in 3 days
      storage.updateReviewItem('q1', 'quiz', true);
      let expectedDate = new Date(now);
      expectedDate.setDate(expectedDate.getDate() + 3);
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).toDateString()).toBe(expectedDate.toDateString());

      // Pass 2: due in 7 days from now
      storage.updateReviewItem('q1', 'quiz', true);
      expectedDate = new Date(now);
      expectedDate.setDate(expectedDate.getDate() + 7);
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).toDateString()).toBe(expectedDate.toDateString());

      // Pass 3: due in 14 days from now
      storage.updateReviewItem('q1', 'quiz', true);
      expectedDate = new Date(now);
      expectedDate.setDate(expectedDate.getDate() + 14);
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).toDateString()).toBe(expectedDate.toDateString());

      // Pass 4: due in 30 days from now
      storage.updateReviewItem('q1', 'quiz', true);
      expectedDate = new Date(now);
      expectedDate.setDate(expectedDate.getDate() + 30);
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).toDateString()).toBe(expectedDate.toDateString());
    });

    it('resets nextReviewAt to 1 day on failure', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up streak
      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q1', 'quiz', true);

      // Fail
      storage.updateReviewItem('q1', 'quiz', false);

      const expectedDate = new Date(now);
      expectedDate.setDate(expectedDate.getDate() + 1);
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).toDateString()).toBe(expectedDate.toDateString());
    });
  });

  describe('getDueReviewItems edge cases', () => {
    it('returns empty array when all items are scheduled for future', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.updateReviewItem('q1', 'quiz', true); // Now scheduled for 3 days later

      expect(storage.getDueReviewItems()).toHaveLength(0);
    });

    it('returns items in correct order when some have passed due dates', () => {
      const storage = makeStorage();

      // Add items
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 's1' });

      // Manually set different due dates
      const queue = storage.getReviewQueue();
      queue.find(item => item.itemId === 'q1')!.nextReviewAt = '2024-06-10T00:00:00.000Z'; // 5 days ago
      queue.find(item => item.itemId === 'q2')!.nextReviewAt = '2024-06-14T00:00:00.000Z'; // 1 day ago
      queue.find(item => item.itemId === 'q3')!.nextReviewAt = '2024-06-20T00:00:00.000Z'; // 5 days from now (not due)

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(2);
      expect(dueItems[0].itemId).toBe('q1'); // Most overdue first
      expect(dueItems[1].itemId).toBe('q2');
    });

    it('respects limit parameter correctly', () => {
      const storage = makeStorage();

      // Add 15 items all due now
      for (let i = 0; i < 15; i++) {
        storage.addToReviewQueue({ itemType: 'quiz', itemId: `q${i}`, subjectId: 's1' });
      }

      expect(storage.getDueReviewItems(5)).toHaveLength(5);
      expect(storage.getDueReviewItems(10)).toHaveLength(10); // Default
      expect(storage.getDueReviewItems(20)).toHaveLength(15); // All available
      expect(storage.getDueReviewItems()).toHaveLength(10); // Default limit
    });
  });

  describe('persistence across storage instances', () => {
    it('preserves review queue after creating new storage instance', () => {
      const storage1 = makeStorage();

      // Add items and update them
      storage1.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      storage1.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 85,
        timeSpentSeconds: 60,
      });

      // Create new instance (simulates page reload)
      const storage2 = makeStorage();
      const queue = storage2.getReviewQueue();

      expect(queue).toHaveLength(1);
      expect(queue[0].streak).toBe(1);
      expect(queue[0].interval).toBe(3);
    });
  });
});
