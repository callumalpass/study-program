/**
 * Storage Interval Calculation Edge Case Tests
 *
 * Additional tests for the spaced repetition interval calculation,
 * focusing on edge cases and boundary conditions not covered by
 * storage-review-queue.test.ts.
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

describe('ProgressStorage - Interval Calculation Edge Cases', () => {
  describe('streak progression sequence', () => {
    it('follows exact progression: 1 -> 3 -> 7 -> 14 -> 30 days', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Initial state: interval = 1, streak = 0
      let item = storage.getReviewQueue()[0];
      expect(item.interval).toBe(1);
      expect(item.streak).toBe(0);

      // After 1st pass: streak = 1, interval = 3
      storage.updateReviewItem('q1', 'quiz', true);
      item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(1);
      expect(item.interval).toBe(3);

      // After 2nd pass: streak = 2, interval = 7
      storage.updateReviewItem('q1', 'quiz', true);
      item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(2);
      expect(item.interval).toBe(7);

      // After 3rd pass: streak = 3, interval = 14
      storage.updateReviewItem('q1', 'quiz', true);
      item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(3);
      expect(item.interval).toBe(14);

      // After 4th pass: streak = 4, interval = 30 (mastered)
      storage.updateReviewItem('q1', 'quiz', true);
      item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(4);
      expect(item.interval).toBe(30);
    });

    it('caps interval at 30 days for streak >= 4', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up to mastery
      for (let i = 0; i < 4; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }

      // Continue passing - interval should stay at 30
      for (let i = 0; i < 10; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
        const item = storage.getReviewQueue()[0];
        expect(item.interval).toBe(30);
      }

      // Final streak should be 14 (4 to mastery + 10 more)
      expect(storage.getReviewQueue()[0].streak).toBe(14);
    });
  });

  describe('fail at different streak levels', () => {
    it('resets to interval 1 when failing at streak 1', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', true); // streak 1, interval 3
      storage.updateReviewItem('q1', 'quiz', false); // fail

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);
    });

    it('resets to interval 1 when failing at streak 2', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', true); // streak 1
      storage.updateReviewItem('q1', 'quiz', true); // streak 2, interval 7
      storage.updateReviewItem('q1', 'quiz', false); // fail

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);
    });

    it('resets to interval 1 when failing at streak 3', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', true); // streak 1
      storage.updateReviewItem('q1', 'quiz', true); // streak 2
      storage.updateReviewItem('q1', 'quiz', true); // streak 3, interval 14
      storage.updateReviewItem('q1', 'quiz', false); // fail

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);
    });

    it('resets to interval 1 when failing at mastery (streak >= 4)', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Reach mastery
      for (let i = 0; i < 5; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }

      expect(storage.getReviewQueue()[0].streak).toBe(5);
      expect(storage.getReviewQueue()[0].interval).toBe(30);

      // Fail at mastery
      storage.updateReviewItem('q1', 'quiz', false);

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);
    });
  });

  describe('recovery after failure', () => {
    it('rebuilds streak correctly after failure', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up streak
      storage.updateReviewItem('q1', 'quiz', true); // streak 1, interval 3
      storage.updateReviewItem('q1', 'quiz', true); // streak 2, interval 7

      // Fail
      storage.updateReviewItem('q1', 'quiz', false); // streak 0, interval 1

      // Rebuild
      storage.updateReviewItem('q1', 'quiz', true); // streak 1, interval 3

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(1);
      expect(item.interval).toBe(3);
    });

    it('can reach mastery again after failure', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Reach mastery
      for (let i = 0; i < 4; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }
      expect(storage.getReviewQueue()[0].interval).toBe(30);

      // Fail
      storage.updateReviewItem('q1', 'quiz', false);
      expect(storage.getReviewQueue()[0].interval).toBe(1);

      // Rebuild to mastery
      for (let i = 0; i < 4; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(4);
      expect(item.interval).toBe(30);
    });
  });

  describe('multiple items independence', () => {
    it('maintains separate streaks for different items', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });

      // Progress q1 more than q2
      storage.updateReviewItem('q1', 'quiz', true); // q1: streak 1
      storage.updateReviewItem('q1', 'quiz', true); // q1: streak 2
      storage.updateReviewItem('q2', 'quiz', true); // q2: streak 1

      const queue = storage.getReviewQueue();
      const q1 = queue.find(item => item.itemId === 'q1')!;
      const q2 = queue.find(item => item.itemId === 'q2')!;

      expect(q1.streak).toBe(2);
      expect(q1.interval).toBe(7);
      expect(q2.streak).toBe(1);
      expect(q2.interval).toBe(3);
    });

    it('failing one item does not affect others', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });

      // Build both up
      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q1', 'quiz', true);
      storage.updateReviewItem('q2', 'quiz', true);
      storage.updateReviewItem('q2', 'quiz', true);

      // Fail q1 only
      storage.updateReviewItem('q1', 'quiz', false);

      const queue = storage.getReviewQueue();
      const q1 = queue.find(item => item.itemId === 'q1')!;
      const q2 = queue.find(item => item.itemId === 'q2')!;

      expect(q1.streak).toBe(0);
      expect(q1.interval).toBe(1);
      expect(q2.streak).toBe(2); // Unaffected
      expect(q2.interval).toBe(7); // Unaffected
    });
  });

  describe('quiz vs exercise item types', () => {
    it('applies same interval logic to exercises', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'ex1', subjectId: 's1' });

      // Same progression as quizzes
      storage.updateReviewItem('ex1', 'exercise', true);
      expect(storage.getReviewQueue()[0].interval).toBe(3);

      storage.updateReviewItem('ex1', 'exercise', true);
      expect(storage.getReviewQueue()[0].interval).toBe(7);

      storage.updateReviewItem('ex1', 'exercise', true);
      expect(storage.getReviewQueue()[0].interval).toBe(14);

      storage.updateReviewItem('ex1', 'exercise', true);
      expect(storage.getReviewQueue()[0].interval).toBe(30);
    });

    it('exercises reset to interval 1 on failure', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'ex1', subjectId: 's1' });

      storage.updateReviewItem('ex1', 'exercise', true);
      storage.updateReviewItem('ex1', 'exercise', true);
      storage.updateReviewItem('ex1', 'exercise', false);

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);
    });
  });

  describe('nextReviewAt date calculation', () => {
    it('sets nextReviewAt correctly based on interval', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Initial: due now
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).getTime()).toBe(now.getTime());

      // After pass: due in 3 days
      storage.updateReviewItem('q1', 'quiz', true);
      const expected3Days = new Date(now);
      expected3Days.setDate(expected3Days.getDate() + 3);
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).toDateString()).toBe(expected3Days.toDateString());

      // After second pass: due in 7 days from now
      storage.updateReviewItem('q1', 'quiz', true);
      const expected7Days = new Date(now);
      expected7Days.setDate(expected7Days.getDate() + 7);
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).toDateString()).toBe(expected7Days.toDateString());
    });

    it('sets nextReviewAt to tomorrow on failure regardless of previous interval', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up to 14-day interval
      for (let i = 0; i < 3; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }
      expect(storage.getReviewQueue()[0].interval).toBe(14);

      // Fail - should be due tomorrow
      storage.updateReviewItem('q1', 'quiz', false);
      const expectedTomorrow = new Date(now);
      expectedTomorrow.setDate(expectedTomorrow.getDate() + 1);
      expect(new Date(storage.getReviewQueue()[0].nextReviewAt).toDateString()).toBe(expectedTomorrow.toDateString());
    });
  });

  describe('consecutive failures', () => {
    it('stays at interval 1 with consecutive failures', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Multiple consecutive failures
      storage.updateReviewItem('q1', 'quiz', false);
      storage.updateReviewItem('q1', 'quiz', false);
      storage.updateReviewItem('q1', 'quiz', false);

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);
    });

    it('streak stays at 0 with consecutive failures', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up, then fail multiple times
      storage.updateReviewItem('q1', 'quiz', true); // streak 1
      storage.updateReviewItem('q1', 'quiz', false); // streak 0
      storage.updateReviewItem('q1', 'quiz', false); // streak 0
      storage.updateReviewItem('q1', 'quiz', false); // streak 0

      expect(storage.getReviewQueue()[0].streak).toBe(0);
    });
  });

  describe('alternating pass/fail patterns', () => {
    it('handles pass-fail-pass pattern correctly', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', true);  // streak 1, interval 3
      storage.updateReviewItem('q1', 'quiz', false); // streak 0, interval 1
      storage.updateReviewItem('q1', 'quiz', true);  // streak 1, interval 3

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(1);
      expect(item.interval).toBe(3);
    });

    it('handles fail-pass-fail pattern correctly', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      storage.updateReviewItem('q1', 'quiz', false); // streak 0, interval 1
      storage.updateReviewItem('q1', 'quiz', true);  // streak 1, interval 3
      storage.updateReviewItem('q1', 'quiz', false); // streak 0, interval 1

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);
    });
  });

  describe('high streak values', () => {
    it('handles very high streak values', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up to a very high streak
      for (let i = 0; i < 100; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(100);
      expect(item.interval).toBe(30); // Still capped at 30
    });

    it('resets correctly from very high streak', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up to a high streak
      for (let i = 0; i < 50; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }

      // Single failure resets everything
      storage.updateReviewItem('q1', 'quiz', false);

      const item = storage.getReviewQueue()[0];
      expect(item.streak).toBe(0);
      expect(item.interval).toBe(1);
    });
  });
});
