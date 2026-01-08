/**
 * Storage Review Queue Edge Case Tests
 *
 * Additional edge case tests for the spaced repetition review queue functionality.
 * These tests complement storage-review-queue.test.ts with additional scenarios.
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

describe('Review Queue - Time-based Due Item Edge Cases', () => {
  it('items become due after time advances past their nextReviewAt', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    // Pass the item - now due in 3 days
    storage.updateReviewItem('q1', 'quiz', true);
    expect(storage.getDueReviewCount()).toBe(0);

    // Advance time by 2 days - still not due
    vi.setSystemTime(new Date('2024-06-17T12:00:00.000Z'));
    expect(storage.getDueReviewCount()).toBe(0);

    // Advance time by 3 days total - now due
    vi.setSystemTime(new Date('2024-06-18T12:00:00.000Z'));
    expect(storage.getDueReviewCount()).toBe(1);
  });

  it('items due exactly at midnight boundary', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.updateReviewItem('q1', 'quiz', true); // Due in 3 days

    // Set time to exactly 3 days later, same time
    const threeDaysLater = new Date(now);
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    vi.setSystemTime(threeDaysLater);

    expect(storage.getDueReviewCount()).toBe(1);
  });

  it('items due 1 millisecond before scheduled time are not returned', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.updateReviewItem('q1', 'quiz', true); // Due in 3 days

    // Set time to 1 millisecond before the scheduled time
    const threeDaysLater = new Date(now);
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    threeDaysLater.setTime(threeDaysLater.getTime() - 1);
    vi.setSystemTime(threeDaysLater);

    expect(storage.getDueReviewCount()).toBe(0);
  });
});

describe('Review Queue - Multiple Items with Different Streaks', () => {
  it('maintains independent streaks for items from different subjects', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs101' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 'math201' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 'cs302' });

    // Progress each item differently
    storage.updateReviewItem('q1', 'quiz', true); // streak 1
    storage.updateReviewItem('q2', 'quiz', true); // streak 1
    storage.updateReviewItem('q2', 'quiz', true); // streak 2
    storage.updateReviewItem('q3', 'quiz', false); // streak 0 (failed)

    const queue = storage.getReviewQueue();
    const q1 = queue.find(i => i.itemId === 'q1')!;
    const q2 = queue.find(i => i.itemId === 'q2')!;
    const q3 = queue.find(i => i.itemId === 'q3')!;

    expect(q1.streak).toBe(1);
    expect(q1.interval).toBe(3);
    expect(q2.streak).toBe(2);
    expect(q2.interval).toBe(7);
    expect(q3.streak).toBe(0);
    expect(q3.interval).toBe(1);
  });

  it('handles mixed quiz and exercise items correctly', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'item-1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'item-1', subjectId: 's1' }); // Same ID, different type

    // Update only the quiz
    storage.updateReviewItem('item-1', 'quiz', true);

    const queue = storage.getReviewQueue();
    const quiz = queue.find(i => i.itemType === 'quiz')!;
    const exercise = queue.find(i => i.itemType === 'exercise')!;

    expect(quiz.streak).toBe(1);
    expect(exercise.streak).toBe(0);
  });
});

describe('Review Queue - Streak Recovery Patterns', () => {
  it('streak rebuilds from zero after a failure', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    // Build up to streak 3
    storage.updateReviewItem('q1', 'quiz', true);
    storage.updateReviewItem('q1', 'quiz', true);
    storage.updateReviewItem('q1', 'quiz', true);
    expect(storage.getReviewQueue()[0].streak).toBe(3);

    // Fail
    storage.updateReviewItem('q1', 'quiz', false);
    expect(storage.getReviewQueue()[0].streak).toBe(0);

    // Start rebuilding
    storage.updateReviewItem('q1', 'quiz', true);
    expect(storage.getReviewQueue()[0].streak).toBe(1);
    expect(storage.getReviewQueue()[0].interval).toBe(3);
  });

  it('alternating pass/fail pattern keeps streak low', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    // Alternating pass/fail 5 times
    for (let i = 0; i < 5; i++) {
      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q1', 'quiz', false);
    }

    const item = storage.getReviewQueue()[0];
    expect(item.streak).toBe(0);
    expect(item.interval).toBe(1);
  });
});

describe('Review Queue - Due Item Ordering Edge Cases', () => {
  it('orders items correctly when they become due at different times', () => {
    const storage = makeStorage();

    // Add items
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 's1' });

    // q1 passes -> due in 3 days
    storage.updateReviewItem('q1', 'quiz', true);
    // q2 fails -> due in 1 day
    storage.updateReviewItem('q2', 'quiz', false);
    // q3 stays at now

    // Advance time so all are due
    vi.setSystemTime(new Date('2024-06-25T12:00:00.000Z'));

    const dueItems = storage.getDueReviewItems();
    // q3 was originally due at now (June 15)
    // q2 was due at June 16 (1 day after)
    // q1 was due at June 18 (3 days after)
    expect(dueItems[0].itemId).toBe('q3');
    expect(dueItems[1].itemId).toBe('q2');
    expect(dueItems[2].itemId).toBe('q1');
  });
});

describe('Review Queue - Persistence Edge Cases', () => {
  it('preserves all review item fields after storage reload', () => {
    const storage1 = makeStorage();
    storage1.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs101' });
    storage1.updateReviewItem('q1', 'quiz', true);
    storage1.updateReviewItem('q1', 'quiz', true);

    // Force save
    storage1.addQuizAttempt('cs101', 'other-quiz', {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      answers: {},
      score: 100,
      timeSpentSeconds: 60,
    });

    // Create new instance
    const storage2 = makeStorage();
    const item = storage2.getReviewQueue().find(i => i.itemId === 'q1')!;

    expect(item.itemType).toBe('quiz');
    expect(item.itemId).toBe('q1');
    expect(item.subjectId).toBe('cs101');
    expect(item.streak).toBe(2);
    expect(item.interval).toBe(7);
    expect(item.nextReviewAt).toBeDefined();
  });
});

describe('Review Queue - Boundary Conditions', () => {
  it('getDueReviewItems with limit of 0 returns empty array', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    expect(storage.getDueReviewItems(0)).toEqual([]);
  });

  it('handles very large limit gracefully', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });

    const dueItems = storage.getDueReviewItems(1000000);
    expect(dueItems).toHaveLength(2);
  });

  it('handles negative limit as zero', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    // Negative limit should behave like zero (implementation-dependent)
    const dueItems = storage.getDueReviewItems(-5);
    expect(dueItems.length).toBeLessThanOrEqual(0);
  });
});

describe('Review Queue - Subject ID Consistency', () => {
  it('maintains correct subjectId association when item IDs overlap across subjects', () => {
    const storage = makeStorage();

    // Same quiz ID in different subjects (unlikely but possible)
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-1', subjectId: 'cs101' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-1', subjectId: 'cs102' });

    // Should be treated as same item (itemId + itemType is the key)
    // Second add should not create duplicate
    expect(storage.getReviewQueue()).toHaveLength(1);
    expect(storage.getReviewQueue()[0].subjectId).toBe('cs101'); // First one wins
  });
});
