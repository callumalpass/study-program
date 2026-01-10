/**
 * Storage Review Due Items Tests
 *
 * Comprehensive tests for the getDueReviewItems and getDueReviewCount functions,
 * verifying correct sorting, filtering, and boundary handling of review items.
 *
 * Note: When a quiz/exercise is failed, it's added to the review queue with
 * nextReviewAt set to tomorrow (now + 1 day), not immediately. This is the
 * intended spaced repetition behavior - you should wait before reviewing.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';

const baseTime = new Date('2024-06-15T12:00:00.000Z');

// Helper to create a quiz attempt that adds to review queue
function failQuiz(storage: ProgressStorage, quizId: string): void {
  storage.addQuizAttempt('cs101', quizId, {
    attemptId: `fail-${quizId}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score: 50,
    timeSpentSeconds: 60,
  });
}

// Helper to pass a quiz (updates review interval)
function passQuiz(storage: ProgressStorage, quizId: string): void {
  storage.addQuizAttempt('cs101', quizId, {
    attemptId: `pass-${quizId}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score: 80,
    timeSpentSeconds: 60,
  });
}

// Helper to add an item directly to review queue (due immediately)
function addDueItem(storage: ProgressStorage, itemId: string, itemType: 'quiz' | 'exercise' = 'quiz'): void {
  storage.addToReviewQueue({ itemType, itemId, subjectId: 'cs101' });
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(baseTime);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('getDueReviewItems', () => {
  describe('basic filtering', () => {
    it('returns empty array when no items are due', () => {
      const storage = new ProgressStorage();

      // Add an item directly and pass it - nextReviewAt will be in the future
      addDueItem(storage, 'quiz-1');
      passQuiz(storage, 'quiz-1');

      // Immediately check - item should not be due yet (due in 3 days after first pass)
      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(0);
    });

    it('returns items that are due now (added directly to queue)', () => {
      const storage = new ProgressStorage();

      // Add item directly - this sets nextReviewAt = now (due immediately)
      addDueItem(storage, 'quiz-1');

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(1);
      expect(dueItems[0].itemId).toBe('quiz-1');
    });

    it('returns items that are past their review date', () => {
      const storage = new ProgressStorage();

      // Fail a quiz - this sets nextReviewAt = now + 1 day
      failQuiz(storage, 'quiz-1');

      // Not due yet
      expect(storage.getDueReviewItems()).toHaveLength(0);

      // Advance 1 day - now it's due
      vi.advanceTimersByTime(24 * 60 * 60 * 1000);

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(1);
      expect(dueItems[0].itemId).toBe('quiz-1');
    });

    it('does not return items scheduled for the future', () => {
      const storage = new ProgressStorage();

      // Add item and pass it (sets nextReviewAt to +3 days)
      addDueItem(storage, 'quiz-1');
      passQuiz(storage, 'quiz-1');

      // Advance time only 2 days (not yet due)
      vi.advanceTimersByTime(2 * 24 * 60 * 60 * 1000);

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(0);
    });
  });

  describe('sorting behavior', () => {
    it('sorts items by due date (oldest first)', () => {
      const storage = new ProgressStorage();

      // Create items with different due dates by staggering additions
      addDueItem(storage, 'quiz-1');  // Due at T+0

      vi.advanceTimersByTime(1 * 60 * 60 * 1000);  // 1 hour later
      addDueItem(storage, 'quiz-2');  // Due at T+1h

      vi.advanceTimersByTime(1 * 60 * 60 * 1000);  // 2 hours later
      addDueItem(storage, 'quiz-3');  // Due at T+2h

      // Reset to a time where all are due
      vi.setSystemTime(new Date(baseTime.getTime() + 3 * 60 * 60 * 1000));

      const dueItems = storage.getDueReviewItems();

      expect(dueItems).toHaveLength(3);
      expect(dueItems[0].itemId).toBe('quiz-1');  // Oldest
      expect(dueItems[1].itemId).toBe('quiz-2');  // Middle
      expect(dueItems[2].itemId).toBe('quiz-3');  // Newest
    });

    it('handles items with same due date deterministically', () => {
      const storage = new ProgressStorage();

      // Create multiple items at exact same time (all due now)
      addDueItem(storage, 'quiz-a');
      addDueItem(storage, 'quiz-b');
      addDueItem(storage, 'quiz-c');

      const dueItems = storage.getDueReviewItems();

      expect(dueItems).toHaveLength(3);
      // Items added in order should maintain that order when due dates are equal
      expect(dueItems.map(i => i.itemId)).toEqual(['quiz-a', 'quiz-b', 'quiz-c']);
    });
  });

  describe('limit parameter', () => {
    it('respects the limit parameter', () => {
      const storage = new ProgressStorage();

      // Add 5 items (due immediately)
      for (let i = 1; i <= 5; i++) {
        addDueItem(storage, `quiz-${i}`);
      }

      const dueItems = storage.getDueReviewItems(3);
      expect(dueItems).toHaveLength(3);
    });

    it('returns all items when count is less than limit', () => {
      const storage = new ProgressStorage();

      // Add 2 items
      addDueItem(storage, 'quiz-1');
      addDueItem(storage, 'quiz-2');

      const dueItems = storage.getDueReviewItems(10);
      expect(dueItems).toHaveLength(2);
    });

    it('uses default limit of 10 when not specified', () => {
      const storage = new ProgressStorage();

      // Add 15 items
      for (let i = 1; i <= 15; i++) {
        addDueItem(storage, `quiz-${i}`);
      }

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(10);
    });

    it('handles limit of 0 gracefully', () => {
      const storage = new ProgressStorage();

      addDueItem(storage, 'quiz-1');

      const dueItems = storage.getDueReviewItems(0);
      expect(dueItems).toHaveLength(0);
    });

    it('returns oldest items first when limited', () => {
      const storage = new ProgressStorage();

      // Create items with different due dates
      for (let i = 1; i <= 5; i++) {
        addDueItem(storage, `quiz-${i}`);
        vi.advanceTimersByTime(1000);  // 1 second between each
      }

      // Move to a time where all are due
      vi.advanceTimersByTime(24 * 60 * 60 * 1000);

      const dueItems = storage.getDueReviewItems(3);

      // Should get the 3 oldest items
      expect(dueItems.map(i => i.itemId)).toEqual(['quiz-1', 'quiz-2', 'quiz-3']);
    });
  });

  describe('mixed item types', () => {
    it('returns both quiz and exercise items', () => {
      const storage = new ProgressStorage();

      // Add quiz and exercise directly to queue
      addDueItem(storage, 'quiz-1', 'quiz');
      addDueItem(storage, 'ex-1', 'exercise');

      const dueItems = storage.getDueReviewItems();

      expect(dueItems).toHaveLength(2);
      const types = dueItems.map(i => i.itemType);
      expect(types).toContain('quiz');
      expect(types).toContain('exercise');
    });

    it('sorts mixed items by due date regardless of type', () => {
      const storage = new ProgressStorage();

      addDueItem(storage, 'quiz-1', 'quiz');
      vi.advanceTimersByTime(1000);

      addDueItem(storage, 'ex-1', 'exercise');
      vi.advanceTimersByTime(1000);

      addDueItem(storage, 'quiz-2', 'quiz');

      vi.advanceTimersByTime(24 * 60 * 60 * 1000);

      const dueItems = storage.getDueReviewItems();

      expect(dueItems[0].itemId).toBe('quiz-1');
      expect(dueItems[1].itemId).toBe('ex-1');
      expect(dueItems[2].itemId).toBe('quiz-2');
    });
  });

  describe('empty and edge cases', () => {
    it('returns empty array when queue is empty', () => {
      const storage = new ProgressStorage();

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toEqual([]);
    });

    it('handles queue with only future items', () => {
      const storage = new ProgressStorage();

      // Add items and pass them (sets nextReviewAt to future)
      addDueItem(storage, 'quiz-1');
      passQuiz(storage, 'quiz-1');

      addDueItem(storage, 'quiz-2');
      passQuiz(storage, 'quiz-2');

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toEqual([]);
    });
  });
});

describe('getDueReviewCount', () => {
  describe('counting accuracy', () => {
    it('returns 0 when no items are due', () => {
      const storage = new ProgressStorage();

      // Add item and pass it - not due yet
      addDueItem(storage, 'quiz-1');
      passQuiz(storage, 'quiz-1');

      const count = storage.getDueReviewCount();
      expect(count).toBe(0);
    });

    it('counts all due items correctly', () => {
      const storage = new ProgressStorage();

      addDueItem(storage, 'quiz-1');
      addDueItem(storage, 'quiz-2');
      addDueItem(storage, 'quiz-3');

      const count = storage.getDueReviewCount();
      expect(count).toBe(3);
    });

    it('excludes items not yet due', () => {
      const storage = new ProgressStorage();

      // Add 3 items, pass 2 (they'll be due in future)
      addDueItem(storage, 'quiz-1');  // Due now
      addDueItem(storage, 'quiz-2');
      passQuiz(storage, 'quiz-2');  // Due in 3 days
      addDueItem(storage, 'quiz-3');
      passQuiz(storage, 'quiz-3');  // Due in 3 days

      const count = storage.getDueReviewCount();
      expect(count).toBe(1);  // Only quiz-1 is due
    });

    it('counts mixed quiz and exercise items', () => {
      const storage = new ProgressStorage();

      addDueItem(storage, 'quiz-1', 'quiz');
      addDueItem(storage, 'ex-1', 'exercise');

      const count = storage.getDueReviewCount();
      expect(count).toBe(2);
    });
  });

  describe('boundary conditions', () => {
    it('returns 0 for empty queue', () => {
      const storage = new ProgressStorage();
      const count = storage.getDueReviewCount();
      expect(count).toBe(0);
    });

    it('handles large number of items', () => {
      const storage = new ProgressStorage();

      for (let i = 1; i <= 100; i++) {
        addDueItem(storage, `quiz-${i}`);
      }

      const count = storage.getDueReviewCount();
      expect(count).toBe(100);
    });

    it('updates count after passing items', () => {
      const storage = new ProgressStorage();

      addDueItem(storage, 'quiz-1');
      addDueItem(storage, 'quiz-2');

      expect(storage.getDueReviewCount()).toBe(2);

      passQuiz(storage, 'quiz-1');

      expect(storage.getDueReviewCount()).toBe(1);
    });

    it('updates count after items become due', () => {
      const storage = new ProgressStorage();

      addDueItem(storage, 'quiz-1');
      passQuiz(storage, 'quiz-1');  // Due in 3 days

      expect(storage.getDueReviewCount()).toBe(0);

      // Advance 3 days
      vi.advanceTimersByTime(3 * 24 * 60 * 60 * 1000);

      expect(storage.getDueReviewCount()).toBe(1);
    });
  });

  describe('consistency with getDueReviewItems', () => {
    it('count matches getDueReviewItems length for small queues', () => {
      const storage = new ProgressStorage();

      for (let i = 1; i <= 5; i++) {
        addDueItem(storage, `quiz-${i}`);
      }

      const count = storage.getDueReviewCount();
      const items = storage.getDueReviewItems(100);  // High limit

      expect(count).toBe(items.length);
    });

    it('count is independent of getDueReviewItems limit', () => {
      const storage = new ProgressStorage();

      for (let i = 1; i <= 20; i++) {
        addDueItem(storage, `quiz-${i}`);
      }

      const count = storage.getDueReviewCount();
      const limitedItems = storage.getDueReviewItems(5);

      expect(count).toBe(20);  // Count is all due items
      expect(limitedItems).toHaveLength(5);  // Limited items
    });
  });
});

describe('Review Queue Date Handling', () => {
  describe('timezone edge cases', () => {
    it('handles items added across midnight', () => {
      const storage = new ProgressStorage();

      // Set time to just before midnight
      vi.setSystemTime(new Date('2024-06-15T23:59:00.000Z'));
      addDueItem(storage, 'quiz-1');

      // Move to just after midnight
      vi.setSystemTime(new Date('2024-06-16T00:01:00.000Z'));
      addDueItem(storage, 'quiz-2');

      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(2);
      // quiz-1 should be older
      expect(dueItems[0].itemId).toBe('quiz-1');
    });

    it('handles items with very close due dates', () => {
      const storage = new ProgressStorage();

      // Add items 1ms apart
      addDueItem(storage, 'quiz-1');
      vi.advanceTimersByTime(1);
      addDueItem(storage, 'quiz-2');
      vi.advanceTimersByTime(1);
      addDueItem(storage, 'quiz-3');

      const dueItems = storage.getDueReviewItems();

      expect(dueItems).toHaveLength(3);
      // Should maintain order even with millisecond differences
      expect(dueItems[0].itemId).toBe('quiz-1');
      expect(dueItems[1].itemId).toBe('quiz-2');
      expect(dueItems[2].itemId).toBe('quiz-3');
    });
  });

  describe('failed quiz review timing', () => {
    it('failed quiz is due in 1 day, not immediately', () => {
      const storage = new ProgressStorage();

      failQuiz(storage, 'quiz-1');

      // Should not be due immediately
      expect(storage.getDueReviewItems()).toHaveLength(0);

      // Advance 23 hours - still not due
      vi.advanceTimersByTime(23 * 60 * 60 * 1000);
      expect(storage.getDueReviewItems()).toHaveLength(0);

      // Advance 1 more hour (total 24 hours) - now due
      vi.advanceTimersByTime(1 * 60 * 60 * 1000);
      expect(storage.getDueReviewItems()).toHaveLength(1);
    });

    it('subsequent fail resets interval back to 1 day', () => {
      const storage = new ProgressStorage();

      // Fail and advance to due
      failQuiz(storage, 'quiz-1');
      vi.advanceTimersByTime(24 * 60 * 60 * 1000);

      // Pass to extend interval
      passQuiz(storage, 'quiz-1');  // Now due in 3 days

      // Fail again
      failQuiz(storage, 'quiz-1');  // Resets to 1 day

      // Should not be due now (reset to 1 day)
      expect(storage.getDueReviewItems()).toHaveLength(0);

      // Advance 1 day - now due
      vi.advanceTimersByTime(24 * 60 * 60 * 1000);
      expect(storage.getDueReviewItems()).toHaveLength(1);
    });
  });

  describe('interval progression edge cases', () => {
    it('handles rapid consecutive passes correctly', () => {
      const storage = new ProgressStorage();

      // Add item directly to queue (due now)
      addDueItem(storage, 'quiz-1');

      // Pass multiple times rapidly (within the same "due window")
      passQuiz(storage, 'quiz-1');  // streak 1, interval 3
      passQuiz(storage, 'quiz-1');  // streak 2, interval 7
      passQuiz(storage, 'quiz-1');  // streak 3, interval 14

      const queue = storage.getReviewQueue();
      const item = queue.find(i => i.itemId === 'quiz-1');

      expect(item?.streak).toBe(3);
      expect(item?.interval).toBe(14);
    });

    it('preserves streak after long period without review', () => {
      const storage = new ProgressStorage();

      // Add item and build up streak
      addDueItem(storage, 'quiz-1');
      passQuiz(storage, 'quiz-1');  // streak 1
      passQuiz(storage, 'quiz-1');  // streak 2
      passQuiz(storage, 'quiz-1');  // streak 3

      // Wait a very long time (longer than any interval)
      vi.advanceTimersByTime(365 * 24 * 60 * 60 * 1000);  // 1 year

      // Item should still be due and streak preserved
      const dueItems = storage.getDueReviewItems();
      expect(dueItems).toHaveLength(1);
      expect(dueItems[0].streak).toBe(3);

      // Pass again
      passQuiz(storage, 'quiz-1');  // streak 4

      const queue = storage.getReviewQueue();
      const item = queue.find(i => i.itemId === 'quiz-1');
      expect(item?.streak).toBe(4);
      expect(item?.interval).toBe(30);
    });
  });
});

describe('Spaced Repetition Flow Integration', () => {
  it('complete review cycle from fail to mastery', () => {
    const storage = new ProgressStorage();

    // Day 0: Fail quiz
    failQuiz(storage, 'quiz-1');
    expect(storage.getDueReviewCount()).toBe(0);  // Not due yet

    // Day 1: Due, pass it
    vi.advanceTimersByTime(24 * 60 * 60 * 1000);
    expect(storage.getDueReviewCount()).toBe(1);
    passQuiz(storage, 'quiz-1');  // streak 1, due in 3 days
    expect(storage.getDueReviewCount()).toBe(0);

    // Day 4: Due again, pass
    vi.advanceTimersByTime(3 * 24 * 60 * 60 * 1000);
    expect(storage.getDueReviewCount()).toBe(1);
    passQuiz(storage, 'quiz-1');  // streak 2, due in 7 days
    expect(storage.getDueReviewCount()).toBe(0);

    // Day 11: Due again, pass
    vi.advanceTimersByTime(7 * 24 * 60 * 60 * 1000);
    expect(storage.getDueReviewCount()).toBe(1);
    passQuiz(storage, 'quiz-1');  // streak 3, due in 14 days
    expect(storage.getDueReviewCount()).toBe(0);

    // Day 25: Due again, pass - now mastered
    vi.advanceTimersByTime(14 * 24 * 60 * 60 * 1000);
    expect(storage.getDueReviewCount()).toBe(1);
    passQuiz(storage, 'quiz-1');  // streak 4, due in 30 days
    expect(storage.getDueReviewCount()).toBe(0);

    // Verify mastery state
    const item = storage.getReviewQueue().find(i => i.itemId === 'quiz-1');
    expect(item?.streak).toBe(4);
    expect(item?.interval).toBe(30);
  });
});
