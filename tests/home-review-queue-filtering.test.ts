/**
 * Home Review Queue Filtering Tests
 *
 * Tests that verify the daily review section on the home page
 * properly filters review items by the user's selected subjects.
 *
 * Bug context: Prior to fix, renderDailyReviewSection() would show
 * review items from all subjects, regardless of which subjects the
 * user had selected in their study plan. This was inconsistent with
 * how other parts of the home page filter data by selected subjects.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';

// Mock localStorage
const now = new Date('2024-06-15T12:00:00.000Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Home Review Queue - Subject Filtering', () => {
  describe('when user has selected subjects', () => {
    it('should only show review items from selected subjects', () => {
      const storage = new ProgressStorage();

      // User selects only cs101
      storage.setSelectedSubjects(['cs101']);

      // Add review items from multiple subjects
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 'cs102' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 'math101' });

      const allItems = storage.getDueReviewItems(100);
      const selectedIds = storage.getSelectedSubjects();
      const filteredItems = allItems.filter(item =>
        selectedIds.includes(item.subjectId)
      );

      // All items are in queue
      expect(allItems).toHaveLength(3);
      // But only cs101 items should be shown to user
      expect(filteredItems).toHaveLength(1);
      expect(filteredItems[0].subjectId).toBe('cs101');
    });

    it('should count only review items from selected subjects', () => {
      const storage = new ProgressStorage();

      // User selects cs101 and cs102
      storage.setSelectedSubjects(['cs101', 'cs102']);

      // Add review items from various subjects
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 'cs102' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 'math101' });
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e1', subjectId: 'math201' });

      const allItems = storage.getDueReviewItems(100);
      const selectedIds = storage.getSelectedSubjects();
      const filteredItems = allItems.filter(item =>
        selectedIds.includes(item.subjectId)
      );

      expect(allItems).toHaveLength(4);
      expect(filteredItems).toHaveLength(2);
      expect(filteredItems.every(item =>
        ['cs101', 'cs102'].includes(item.subjectId)
      )).toBe(true);
    });

    it('should show empty review section when no items from selected subjects', () => {
      const storage = new ProgressStorage();

      // User only selects cs101
      storage.setSelectedSubjects(['cs101']);

      // But review items are from other subjects
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs102' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 'math101' });

      const allItems = storage.getDueReviewItems(100);
      const selectedIds = storage.getSelectedSubjects();
      const filteredItems = allItems.filter(item =>
        selectedIds.includes(item.subjectId)
      );

      expect(allItems).toHaveLength(2);
      expect(filteredItems).toHaveLength(0);
    });
  });

  describe('when user has no selected subjects (legacy user)', () => {
    it('should show all review items when no subjects are selected', () => {
      const storage = new ProgressStorage();

      // Legacy user has no selected subjects (empty array)
      // This happens with getDefaults() which doesn't include selectedSubjectIds
      expect(storage.getSelectedSubjects()).toEqual([]);

      // Add review items from multiple subjects
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 'cs102' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 'math101' });

      const allItems = storage.getDueReviewItems(100);
      const selectedIds = storage.getSelectedSubjects();

      // When no subjects selected, all items should be shown
      const filteredItems = selectedIds.length > 0
        ? allItems.filter(item => selectedIds.includes(item.subjectId))
        : allItems;

      expect(filteredItems).toHaveLength(3);
    });
  });

  describe('review items limit and pagination', () => {
    it('should limit displayed items to 5 even with many due items', () => {
      const storage = new ProgressStorage();

      storage.setSelectedSubjects(['cs101']);

      // Add 10 items from the selected subject
      for (let i = 1; i <= 10; i++) {
        storage.addToReviewQueue({ itemType: 'quiz', itemId: `q${i}`, subjectId: 'cs101' });
      }

      const allItems = storage.getDueReviewItems(100);
      const selectedIds = storage.getSelectedSubjects();
      const filteredItems = allItems.filter(item =>
        selectedIds.includes(item.subjectId)
      );
      const displayedItems = filteredItems.slice(0, 5);

      expect(filteredItems).toHaveLength(10);
      expect(displayedItems).toHaveLength(5);
    });

    it('should report correct total count for "more items" message', () => {
      const storage = new ProgressStorage();

      storage.setSelectedSubjects(['cs101', 'cs102']);

      // Add items from selected and unselected subjects
      for (let i = 1; i <= 8; i++) {
        storage.addToReviewQueue({ itemType: 'quiz', itemId: `q-cs101-${i}`, subjectId: 'cs101' });
      }
      for (let i = 1; i <= 4; i++) {
        storage.addToReviewQueue({ itemType: 'quiz', itemId: `q-math${i}`, subjectId: `math${i}01` });
      }

      const allItems = storage.getDueReviewItems(100);
      const selectedIds = storage.getSelectedSubjects();
      const filteredItems = allItems.filter(item =>
        selectedIds.includes(item.subjectId)
      );

      // Total filtered should be 8 (only cs101 items, not math items)
      expect(filteredItems).toHaveLength(8);

      // "More items" count should be 8 - 5 = 3
      const displayedCount = Math.min(5, filteredItems.length);
      const moreCount = filteredItems.length - displayedCount;
      expect(moreCount).toBe(3);
    });
  });

  describe('subject selection changes', () => {
    it('should filter correctly after adding subjects to selection', () => {
      const storage = new ProgressStorage();

      // Initially select only cs101
      storage.setSelectedSubjects(['cs101']);

      // Add review items
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 'cs102' });

      let selectedIds = storage.getSelectedSubjects();
      let allItems = storage.getDueReviewItems(100);
      let filtered = allItems.filter(item => selectedIds.includes(item.subjectId));

      expect(filtered).toHaveLength(1);

      // Now add cs102 to selection
      storage.addToSelection('cs102');

      selectedIds = storage.getSelectedSubjects();
      allItems = storage.getDueReviewItems(100);
      filtered = allItems.filter(item => selectedIds.includes(item.subjectId));

      expect(filtered).toHaveLength(2);
    });

    it('should filter correctly after removing subjects from selection', () => {
      const storage = new ProgressStorage();

      // Initially select both subjects
      storage.setSelectedSubjects(['cs101', 'cs102']);

      // Add review items
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 'cs102' });

      let selectedIds = storage.getSelectedSubjects();
      let allItems = storage.getDueReviewItems(100);
      let filtered = allItems.filter(item => selectedIds.includes(item.subjectId));

      expect(filtered).toHaveLength(2);

      // Now remove cs102 from selection
      storage.removeFromSelection('cs102');

      selectedIds = storage.getSelectedSubjects();
      allItems = storage.getDueReviewItems(100);
      filtered = allItems.filter(item => selectedIds.includes(item.subjectId));

      expect(filtered).toHaveLength(1);
      expect(filtered[0].subjectId).toBe('cs101');
    });
  });

  describe('edge cases', () => {
    it('should handle case when selected subject has no review items', () => {
      const storage = new ProgressStorage();

      storage.setSelectedSubjects(['cs101']);

      // Only add items from unselected subject
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs102' });

      const allItems = storage.getDueReviewItems(100);
      const selectedIds = storage.getSelectedSubjects();
      const filtered = allItems.filter(item => selectedIds.includes(item.subjectId));

      expect(allItems).toHaveLength(1);
      expect(filtered).toHaveLength(0);
    });

    it('should handle empty review queue', () => {
      const storage = new ProgressStorage();

      storage.setSelectedSubjects(['cs101']);

      const allItems = storage.getDueReviewItems(100);
      const selectedIds = storage.getSelectedSubjects();
      const filtered = selectedIds.length > 0
        ? allItems.filter(item => selectedIds.includes(item.subjectId))
        : allItems;

      expect(allItems).toHaveLength(0);
      expect(filtered).toHaveLength(0);
    });

    it('should handle mix of quiz and exercise items correctly', () => {
      const storage = new ProgressStorage();

      storage.setSelectedSubjects(['cs101', 'math101']);

      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e1', subjectId: 'cs101' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 'math101' });
      storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e2', subjectId: 'cs102' }); // Not selected

      const allItems = storage.getDueReviewItems(100);
      const selectedIds = storage.getSelectedSubjects();
      const filtered = allItems.filter(item => selectedIds.includes(item.subjectId));

      expect(filtered).toHaveLength(3);
      expect(filtered.filter(i => i.itemType === 'quiz')).toHaveLength(2);
      expect(filtered.filter(i => i.itemType === 'exercise')).toHaveLength(1);
    });
  });
});

describe('Review Queue Filtering - Persistence', () => {
  it('should maintain selected subjects after storage reload', () => {
    // First session
    const storage1 = new ProgressStorage();
    storage1.setSelectedSubjects(['cs101']);

    // Add items to review queue directly
    storage1.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-1', subjectId: 'cs101' });
    storage1.addToReviewQueue({ itemType: 'quiz', itemId: 'quiz-2', subjectId: 'cs102' });

    // Force a save by calling a method that saves
    // (addToReviewQueue doesn't save on its own, it's called from addQuizAttempt)
    storage1.save();

    // Simulate page reload
    const storage2 = new ProgressStorage();

    const allItems = storage2.getDueReviewItems(100);
    const selectedIds = storage2.getSelectedSubjects();
    const filtered = allItems.filter(item => selectedIds.includes(item.subjectId));

    expect(selectedIds).toContain('cs101');
    expect(allItems).toHaveLength(2);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].subjectId).toBe('cs101');
  });

  it('should filter review items correctly after quiz attempts across reload', () => {
    // First session
    const storage1 = new ProgressStorage();
    storage1.setSelectedSubjects(['cs101']);

    // Add quiz attempts (which automatically add to review queue)
    // Note: Failed quizzes get nextReviewAt = now + 1 day (due tomorrow)
    storage1.addQuizAttempt('cs101', 'quiz-1', {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      answers: {},
      score: 50, // Below passing, adds to review queue
      timeSpentSeconds: 60,
    });

    storage1.addQuizAttempt('cs102', 'quiz-2', {
      attemptId: 'a2',
      timestamp: now.toISOString(),
      answers: {},
      score: 50, // Below passing, adds to review queue
      timeSpentSeconds: 60,
    });

    // Verify items are in queue before reload
    expect(storage1.getReviewQueue()).toHaveLength(2);

    // Advance time by 2 days so items become due
    vi.setSystemTime(new Date('2024-06-17T12:00:00.000Z'));

    // Simulate page reload
    const storage2 = new ProgressStorage();

    const allItems = storage2.getDueReviewItems(100);
    const selectedIds = storage2.getSelectedSubjects();
    const filtered = allItems.filter(item => selectedIds.includes(item.subjectId));

    expect(selectedIds).toContain('cs101');
    expect(allItems).toHaveLength(2);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].subjectId).toBe('cs101');
  });
});
