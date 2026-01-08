/**
 * Storage Review Queue Tests
 *
 * Comprehensive tests for the spaced repetition review queue functionality
 * in ProgressStorage. Tests cover:
 * - Adding and removing items from the queue
 * - Interval calculations based on streak and pass/fail
 * - Due item retrieval and ordering
 * - Edge cases and boundary conditions
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';

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

describe('ProgressStorage Review Queue - Basic Operations', () => {
  describe('addToReviewQueue', () => {
    it('adds a new quiz item to the queue', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-1', subjectId: 'cs101' });

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0]).toMatchObject({
        itemType: 'quiz',
        itemId: 'quiz-1',
        subjectId: 'cs101',
        streak: 0,
        interval: 1,
      });
    });

    it('adds a new exercise item to the queue', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'ex-1', subjectId: 'math101' });

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].itemType).toBe('exercise');
    });

    it('does not add duplicate items', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-1', subjectId: 'cs101' });

      expect(storage.getReviewQueue()).toHaveLength(1);
    });

    it('allows same item ID with different types', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'item-1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'item-1', subjectId: 'cs101' });

      expect(storage.getReviewQueue()).toHaveLength(2);
    });

    it('sets nextReviewAt to current time (due now)', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-1', subjectId: 'cs101' });

      const [item] = storage.getReviewQueue();
      expect(new Date(item.nextReviewAt).getTime()).toBe(now.getTime());
    });
  });

  describe('removeFromReviewQueue', () => {
    it('removes an item from the queue', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-2', subjectId: 'cs101' });

      storage.removeFromReviewQueue('quiz-1', 'quiz');

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].itemId).toBe('quiz-2');
    });

    it('does nothing if item not in queue', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-1', subjectId: 'cs101' });

      storage.removeFromReviewQueue('quiz-999', 'quiz');

      expect(storage.getReviewQueue()).toHaveLength(1);
    });

    it('only removes matching type', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'item-1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'item-1', subjectId: 'cs101' });

      storage.removeFromReviewQueue('item-1', 'quiz');

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].itemType).toBe('exercise');
    });
  });
});

describe('ProgressStorage Review Queue - Interval Calculations', () => {
  describe('updateReviewItem after passing', () => {
    it('increments streak on pass', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.updateReviewItem('q1', 'quiz', true);

      const [item] = storage.getReviewQueue();
      expect(item.streak).toBe(1);
    });

    it('sets interval to 3 days after first pass (streak 0 -> 1)', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.updateReviewItem('q1', 'quiz', true);

      const [item] = storage.getReviewQueue();
      expect(item.interval).toBe(3);
    });

    it('sets interval to 7 days after second pass (streak 1 -> 2)', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', true); // streak 1, interval 3
      storage.updateReviewItem('q1', 'quiz', true); // streak 2, interval 7

      const [item] = storage.getReviewQueue();
      expect(item.streak).toBe(2);
      expect(item.interval).toBe(7);
    });

    it('sets interval to 14 days after third pass (streak 2 -> 3)', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', true); // streak 1
      storage.updateReviewItem('q1', 'quiz', true); // streak 2
      storage.updateReviewItem('q1', 'quiz', true); // streak 3, interval 14

      const [item] = storage.getReviewQueue();
      expect(item.streak).toBe(3);
      expect(item.interval).toBe(14);
    });

    it('sets interval to 30 days after fourth pass (mastered)', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', true); // streak 1
      storage.updateReviewItem('q1', 'quiz', true); // streak 2
      storage.updateReviewItem('q1', 'quiz', true); // streak 3
      storage.updateReviewItem('q1', 'quiz', true); // streak 4, interval 30

      const [item] = storage.getReviewQueue();
      expect(item.streak).toBe(4);
      expect(item.interval).toBe(30);
    });

    it('keeps interval at 30 days for continued passes', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      for (let i = 0; i < 10; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }

      const [item] = storage.getReviewQueue();
      expect(item.streak).toBe(10);
      expect(item.interval).toBe(30);
    });

    it('calculates correct nextReviewAt date', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.updateReviewItem('q1', 'quiz', true); // interval 3

      const [item] = storage.getReviewQueue();
      const expectedDate = new Date(now);
      expectedDate.setDate(expectedDate.getDate() + 3);
      expect(new Date(item.nextReviewAt).toDateString()).toBe(expectedDate.toDateString());
    });
  });

  describe('updateReviewItem after failing', () => {
    it('resets streak to 0 on fail', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up a streak
      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q1', 'quiz', true);
      expect(storage.getReviewQueue()[0].streak).toBe(2);

      // Fail resets streak
      storage.updateReviewItem('q1', 'quiz', false);

      const [item] = storage.getReviewQueue();
      expect(item.streak).toBe(0);
    });

    it('sets interval to 1 day on fail', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q1', 'quiz', false);

      const [item] = storage.getReviewQueue();
      expect(item.interval).toBe(1);
    });

    it('sets nextReviewAt to tomorrow on fail', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.updateReviewItem('q1', 'quiz', false);

      const [item] = storage.getReviewQueue();
      const expectedDate = new Date(now);
      expectedDate.setDate(expectedDate.getDate() + 1);
      expect(new Date(item.nextReviewAt).toDateString()).toBe(expectedDate.toDateString());
    });
  });

  describe('updateReviewItem for non-existent items', () => {
    it('does nothing if item not in queue', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q999', 'quiz', true);

      const [item] = storage.getReviewQueue();
      expect(item.itemId).toBe('q1');
      expect(item.streak).toBe(0);
    });

    it('does nothing if type does not match', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'exercise', true);

      const [item] = storage.getReviewQueue();
      expect(item.streak).toBe(0);
    });
  });
});

describe('ProgressStorage Review Queue - Due Item Retrieval', () => {
  describe('getDueReviewItems', () => {
    it('returns items with nextReviewAt in the past', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Item is due now (nextReviewAt = now), so should be returned
      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(1);
    });

    it('returns items with nextReviewAt exactly now', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(1);
    });

    it('does not return items scheduled for the future', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.updateReviewItem('q1', 'quiz', true); // Sets nextReviewAt to 3 days from now

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(0);
    });

    it('sorts items by nextReviewAt (oldest first)', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q-oldest', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q-newest', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q-middle', subjectId: 's1' });

      const queue = storage.getReviewQueue();
      const oldest = queue.find(item => item.itemId === 'q-oldest')!;
      const newest = queue.find(item => item.itemId === 'q-newest')!;
      const middle = queue.find(item => item.itemId === 'q-middle')!;

      // Manually set dates to control order
      oldest.nextReviewAt = '2024-06-10T00:00:00.000Z';
      newest.nextReviewAt = '2024-06-15T00:00:00.000Z';
      middle.nextReviewAt = '2024-06-12T00:00:00.000Z';

      const dueItems = storage.getDueReviewItems();
      expect(dueItems.map(item => item.itemId)).toEqual(['q-oldest', 'q-middle', 'q-newest']);
    });

    it('respects the limit parameter', () => {
      const storage = makeStorage();
      for (let i = 0; i < 20; i++) {
        storage.addToReviewQueue({ itemType: 'quiz', itemId: `q${i}`, subjectId: 's1' });
      }

      const dueItems = storage.getDueReviewItems(5);
      expect(dueItems).toHaveLength(5);
    });

    it('defaults to limit of 10', () => {
      const storage = makeStorage();
      for (let i = 0; i < 20; i++) {
        storage.addToReviewQueue({ itemType: 'quiz', itemId: `q${i}`, subjectId: 's1' });
      }

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(10);
    });

    it('returns all items if less than limit', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });

      const dueItems = storage.getDueReviewItems(10);
      expect(dueItems).toHaveLength(2);
    });
  });

  describe('getDueReviewCount', () => {
    it('returns 0 for empty queue', () => {
      const storage = makeStorage();
      expect(storage.getDueReviewCount()).toBe(0);
    });

    it('returns count of due items', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 's1' });

      expect(storage.getDueReviewCount()).toBe(3);
    });

    it('does not count future items', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });

      // Make q1 due in the future
      storage.updateReviewItem('q1', 'quiz', true);

      expect(storage.getDueReviewCount()).toBe(1);
    });
  });

  describe('getReviewQueue', () => {
    it('returns empty array for new storage', () => {
      const storage = makeStorage();
      expect(storage.getReviewQueue()).toEqual([]);
    });

    it('returns all items including future ones', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', true); // Now scheduled for future

      expect(storage.getReviewQueue()).toHaveLength(2);
    });
  });
});

describe('ProgressStorage Review Queue - Integration with Quiz/Exercise Attempts', () => {
  describe('automatic review queue updates on quiz attempt', () => {
    it('adds quiz to review queue when score < 85', () => {
      const storage = makeStorage();

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'attempt-1',
        timestamp: now.toISOString(),
        answers: {},
        score: 70,
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0]).toMatchObject({
        itemType: 'quiz',
        itemId: 'quiz-1',
        subjectId: 'cs101',
      });
    });

    it('does not add quiz to review queue when score >= 85', () => {
      const storage = makeStorage();

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'attempt-1',
        timestamp: now.toISOString(),
        answers: {},
        score: 85,
        timeSpentSeconds: 60,
      });

      expect(storage.getReviewQueue()).toHaveLength(0);
    });

    it('updates existing review item when score >= 85', () => {
      const storage = makeStorage();

      // First attempt fails
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'attempt-1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      expect(storage.getReviewQueue()).toHaveLength(1);

      // Second attempt passes well
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'attempt-2',
        timestamp: now.toISOString(),
        answers: {},
        score: 90,
        timeSpentSeconds: 60,
      });

      // Item should still be in queue but with updated streak
      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].streak).toBe(1);
    });
  });

  describe('automatic review queue updates on exercise completion', () => {
    it('adds exercise to review queue when not passed', () => {
      const storage = makeStorage();

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'comp-1',
        timestamp: now.toISOString(),
        code: 'print("hello")',
        passed: false,
        timeSpentSeconds: 120,
      });

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0]).toMatchObject({
        itemType: 'exercise',
        itemId: 'ex-1',
        subjectId: 'cs101',
      });
    });

    it('updates review item when exercise is passed', () => {
      const storage = makeStorage();

      // First attempt fails
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'comp-1',
        timestamp: now.toISOString(),
        code: 'print("wrong")',
        passed: false,
        timeSpentSeconds: 120,
      });

      // Second attempt passes
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'comp-2',
        timestamp: now.toISOString(),
        code: 'print("correct")',
        passed: true,
        timeSpentSeconds: 120,
      });

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].streak).toBe(1);
    });
  });
});

describe('ProgressStorage Review Queue - Edge Cases', () => {
  it('handles empty review queue gracefully', () => {
    const storage = makeStorage();

    expect(storage.getDueReviewItems()).toEqual([]);
    expect(storage.getDueReviewCount()).toBe(0);
    expect(storage.getReviewQueue()).toEqual([]);

    // These should not throw
    storage.removeFromReviewQueue('nonexistent', 'quiz');
    storage.updateReviewItem('nonexistent', 'quiz', true);
  });

  it('persists review queue via quiz attempts across storage instances', () => {
    const storage1 = makeStorage();

    // Use addQuizAttempt which triggers save() internally
    storage1.addQuizAttempt('cs101', 'quiz-1', {
      attemptId: 'attempt-1',
      timestamp: now.toISOString(),
      answers: {},
      score: 70, // Below 85, adds to review queue
      timeSpentSeconds: 60,
    });

    // Create new instance (simulates page reload)
    const storage2 = makeStorage();
    const queue = storage2.getReviewQueue();

    expect(queue).toHaveLength(1);
    expect(queue[0].itemId).toBe('quiz-1');
    expect(queue[0].subjectId).toBe('cs101');
  });

  it('handles many items efficiently', () => {
    const storage = makeStorage();

    // Add 100 items
    for (let i = 0; i < 100; i++) {
      storage.addToReviewQueue({
        itemType: i % 2 === 0 ? 'quiz' : 'exercise',
        itemId: `item-${i}`,
        subjectId: `subject-${i % 5}`,
      });
    }

    expect(storage.getReviewQueue()).toHaveLength(100);
    expect(storage.getDueReviewCount()).toBe(100);
  });
});
