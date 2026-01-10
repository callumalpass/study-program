/**
 * Storage Course Selection Edge Cases Tests
 *
 * Tests for edge cases in the course selection functionality,
 * including:
 * - Duplicate handling
 * - Empty array handling
 * - Migration scenarios
 * - Selection state persistence
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

describe('ProgressStorage - Course Selection Edge Cases', () => {
  describe('getSelectedSubjects', () => {
    it('returns empty array for new users', () => {
      const storage = makeStorage();
      expect(storage.getSelectedSubjects()).toEqual([]);
    });

    it('returns empty array when selectedSubjectIds is undefined', () => {
      const storage = makeStorage();
      // Manually manipulate internal state to simulate undefined
      const progress = storage.getProgress();
      delete (progress as { selectedSubjectIds?: string[] }).selectedSubjectIds;
      expect(storage.getSelectedSubjects()).toEqual([]);
    });
  });

  describe('setSelectedSubjects', () => {
    it('sets subjects correctly', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });

    it('replaces existing selection completely', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.setSelectedSubjects(['cs201']);
      expect(storage.getSelectedSubjects()).toEqual(['cs201']);
    });

    it('handles empty array', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.setSelectedSubjects([]);
      expect(storage.getSelectedSubjects()).toEqual([]);
    });

    it('creates a copy of the input array', () => {
      const storage = makeStorage();
      const subjects = ['cs101', 'math101'];
      storage.setSelectedSubjects(subjects);

      // Mutating original array should not affect stored array
      subjects.push('cs201');
      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });

    it('persists to localStorage', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);

      // Create new storage instance to verify persistence
      const storage2 = makeStorage();
      expect(storage2.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });
  });

  describe('addToSelection', () => {
    it('adds subject to empty selection', () => {
      const storage = makeStorage();
      storage.addToSelection('cs101');
      expect(storage.getSelectedSubjects()).toEqual(['cs101']);
    });

    it('adds subject to existing selection', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101']);
      storage.addToSelection('math101');
      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });

    it('does not add duplicate subjects', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.addToSelection('cs101');
      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });

    it('initializes array when undefined', () => {
      const storage = makeStorage();
      const progress = storage.getProgress();
      delete (progress as { selectedSubjectIds?: string[] }).selectedSubjectIds;

      storage.addToSelection('cs101');
      expect(storage.getSelectedSubjects()).toEqual(['cs101']);
    });
  });

  describe('removeFromSelection', () => {
    it('removes subject from selection', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101', 'cs201']);
      storage.removeFromSelection('math101');
      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs201']);
    });

    it('handles removing non-existent subject gracefully', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.removeFromSelection('cs999');
      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });

    it('handles empty selection gracefully', () => {
      const storage = makeStorage();
      storage.removeFromSelection('cs101');
      expect(storage.getSelectedSubjects()).toEqual([]);
    });

    it('handles undefined selectedSubjectIds gracefully', () => {
      const storage = makeStorage();
      const progress = storage.getProgress();
      delete (progress as { selectedSubjectIds?: string[] }).selectedSubjectIds;

      // Should not throw
      storage.removeFromSelection('cs101');
      expect(storage.getSelectedSubjects()).toEqual([]);
    });

    it('can remove all subjects one by one', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.removeFromSelection('cs101');
      storage.removeFromSelection('math101');
      expect(storage.getSelectedSubjects()).toEqual([]);
    });
  });

  describe('isSubjectSelected', () => {
    it('returns true for selected subject', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      expect(storage.isSubjectSelected('cs101')).toBe(true);
    });

    it('returns false for non-selected subject', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      expect(storage.isSubjectSelected('cs201')).toBe(false);
    });

    it('returns false when no subjects selected', () => {
      const storage = makeStorage();
      expect(storage.isSubjectSelected('cs101')).toBe(false);
    });

    it('returns false when selectedSubjectIds is undefined', () => {
      const storage = makeStorage();
      const progress = storage.getProgress();
      delete (progress as { selectedSubjectIds?: string[] }).selectedSubjectIds;

      expect(storage.isSubjectSelected('cs101')).toBe(false);
    });
  });

  describe('hasSelectedSubjects', () => {
    it('returns false for new users', () => {
      const storage = makeStorage();
      expect(storage.hasSelectedSubjects()).toBe(false);
    });

    it('returns true when subjects are selected', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101']);
      expect(storage.hasSelectedSubjects()).toBe(true);
    });

    it('returns false after clearing all selections', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101']);
      storage.setSelectedSubjects([]);
      expect(storage.hasSelectedSubjects()).toBe(false);
    });

    it('returns false when selectedSubjectIds is undefined', () => {
      const storage = makeStorage();
      const progress = storage.getProgress();
      delete (progress as { selectedSubjectIds?: string[] }).selectedSubjectIds;

      expect(storage.hasSelectedSubjects()).toBe(false);
    });
  });

  describe('persistence and reload', () => {
    it('maintains selection after reload', () => {
      const storage1 = makeStorage();
      storage1.setSelectedSubjects(['cs101', 'math101', 'cs201']);

      const storage2 = makeStorage();
      expect(storage2.getSelectedSubjects()).toEqual(['cs101', 'math101', 'cs201']);
    });

    it('maintains selection after add/remove operations', () => {
      const storage1 = makeStorage();
      storage1.setSelectedSubjects(['cs101', 'math101']);
      storage1.addToSelection('cs201');
      storage1.removeFromSelection('math101');

      const storage2 = makeStorage();
      expect(storage2.getSelectedSubjects()).toEqual(['cs101', 'cs201']);
    });
  });

  describe('interaction with other storage operations', () => {
    it('preserves selection when updating subject progress', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.updateSubjectProgress('cs101', { status: 'in_progress' });

      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });

    it('preserves selection when adding quiz attempts', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 60,
      });

      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });

    it('preserves selection when updating settings', () => {
      const storage = makeStorage();
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.updateSettings({ theme: 'dark' });

      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });
  });
});
