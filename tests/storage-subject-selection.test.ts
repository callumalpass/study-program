/**
 * Storage Subject Selection Tests
 *
 * Tests for the subject selection functionality in storage,
 * including getSelectedSubjects, setSelectedSubjects, and related methods.
 */

import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { ProgressStorage } from '../src/core/storage';

describe('Storage Subject Selection', () => {
  let storage: ProgressStorage;
  const STORAGE_KEY = 'study_program_progress';

  beforeEach(() => {
    localStorage.clear();
    storage = new ProgressStorage();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getSelectedSubjects', () => {
    it('returns empty array for new users', () => {
      const selected = storage.getSelectedSubjects();
      expect(selected).toEqual([]);
    });

    it('returns selected subjects after setting them', () => {
      storage.setSelectedSubjects(['cs101', 'math101']);
      const selected = storage.getSelectedSubjects();
      expect(selected).toEqual(['cs101', 'math101']);
    });
  });

  describe('setSelectedSubjects', () => {
    it('sets complete list of subjects', () => {
      storage.setSelectedSubjects(['cs101', 'cs102', 'cs103']);
      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs102', 'cs103']);
    });

    it('replaces previous selection', () => {
      storage.setSelectedSubjects(['cs101', 'cs102']);
      storage.setSelectedSubjects(['math101', 'math102']);
      expect(storage.getSelectedSubjects()).toEqual(['math101', 'math102']);
    });

    it('handles empty array', () => {
      storage.setSelectedSubjects(['cs101']);
      storage.setSelectedSubjects([]);
      expect(storage.getSelectedSubjects()).toEqual([]);
    });

    it('persists to localStorage', () => {
      storage.setSelectedSubjects(['cs101', 'math101']);

      // Create new storage instance to verify persistence
      const newStorage = new ProgressStorage();
      expect(newStorage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });
  });

  describe('addToSelection', () => {
    it('adds subject to empty selection', () => {
      storage.addToSelection('cs101');
      expect(storage.getSelectedSubjects()).toEqual(['cs101']);
    });

    it('adds subject to existing selection', () => {
      storage.setSelectedSubjects(['cs101']);
      storage.addToSelection('math101');
      expect(storage.getSelectedSubjects()).toContain('cs101');
      expect(storage.getSelectedSubjects()).toContain('math101');
    });

    it('does not add duplicate subject', () => {
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.addToSelection('cs101');
      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });
  });

  describe('removeFromSelection', () => {
    it('removes subject from selection', () => {
      storage.setSelectedSubjects(['cs101', 'math101', 'cs102']);
      storage.removeFromSelection('math101');
      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs102']);
    });

    it('handles removing non-existent subject', () => {
      storage.setSelectedSubjects(['cs101']);
      storage.removeFromSelection('math101');
      expect(storage.getSelectedSubjects()).toEqual(['cs101']);
    });

    it('handles removing from empty selection', () => {
      storage.removeFromSelection('cs101');
      expect(storage.getSelectedSubjects()).toEqual([]);
    });
  });

  describe('isSubjectSelected', () => {
    it('returns true for selected subject', () => {
      storage.setSelectedSubjects(['cs101', 'math101']);
      expect(storage.isSubjectSelected('cs101')).toBe(true);
      expect(storage.isSubjectSelected('math101')).toBe(true);
    });

    it('returns false for non-selected subject', () => {
      storage.setSelectedSubjects(['cs101']);
      expect(storage.isSubjectSelected('math101')).toBe(false);
    });

    it('returns false when no subjects selected', () => {
      expect(storage.isSubjectSelected('cs101')).toBe(false);
    });
  });

  describe('hasSelectedSubjects', () => {
    it('returns false for new user', () => {
      expect(storage.hasSelectedSubjects()).toBe(false);
    });

    it('returns true when subjects are selected', () => {
      storage.setSelectedSubjects(['cs101']);
      expect(storage.hasSelectedSubjects()).toBe(true);
    });

    it('returns false after clearing selection', () => {
      storage.setSelectedSubjects(['cs101']);
      storage.setSelectedSubjects([]);
      expect(storage.hasSelectedSubjects()).toBe(false);
    });
  });

  describe('migration of selectedSubjectIds', () => {
    it('migrates old data without selectedSubjectIds to include all subjects', () => {
      // Simulate old data without selectedSubjectIds
      const oldData = {
        version: 3,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14 },
        reviewQueue: [],
        // No selectedSubjectIds
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(oldData));

      // Create new storage instance which should trigger migration
      const migratedStorage = new ProgressStorage();
      const selected = migratedStorage.getSelectedSubjects();

      // Old users should get all subjects
      expect(selected.length).toBeGreaterThan(0);
      expect(selected).toContain('cs101');
      expect(selected).toContain('math101');
    });
  });

  describe('integration with progress reset', () => {
    it('resets subject selection on full reset', () => {
      storage.setSelectedSubjects(['cs101', 'math101']);
      storage.resetProgress();
      expect(storage.getSelectedSubjects()).toEqual([]);
    });
  });

  describe('subject selection with progress updates', () => {
    it('subject progress works independently of selection', () => {
      // Subject can have progress even if not in selectedSubjectIds
      storage.updateSubjectProgress('cs101', { status: 'in_progress' });

      // Subject is not selected but has progress
      expect(storage.isSubjectSelected('cs101')).toBe(false);
      expect(storage.getSubjectProgress('cs101')).toBeDefined();
      expect(storage.getSubjectProgress('cs101')?.status).toBe('in_progress');
    });
  });
});

describe('Subject selection edge cases', () => {
  let storage: ProgressStorage;

  beforeEach(() => {
    localStorage.clear();
    storage = new ProgressStorage();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('handles many subjects efficiently', () => {
    const manySubjects = Array.from({ length: 50 }, (_, i) => `subject-${i}`);
    storage.setSelectedSubjects(manySubjects);
    expect(storage.getSelectedSubjects()).toHaveLength(50);
    expect(storage.isSubjectSelected('subject-25')).toBe(true);
  });

  it('preserves order of selected subjects', () => {
    const orderedSubjects = ['cs301', 'math101', 'cs101', 'math301'];
    storage.setSelectedSubjects(orderedSubjects);
    expect(storage.getSelectedSubjects()).toEqual(orderedSubjects);
  });

  it('handles subjects with special characters in IDs', () => {
    storage.addToSelection('cs-101');
    storage.addToSelection('math_101');
    expect(storage.isSubjectSelected('cs-101')).toBe(true);
    expect(storage.isSubjectSelected('math_101')).toBe(true);
  });
});
