/**
 * Storage Migration Comprehensive Tests
 *
 * Tests for the storage migration system ensuring backward compatibility
 * and data integrity when upgrading from older versions.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { UserProgress, SubjectProgress, QuizAttempt } from '../src/core/types';

// Mock localStorage for testing
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value;
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

// Import after mocking
import { ProgressStorage } from '../src/core/storage';

const STORAGE_KEY = 'study_program_progress';

describe('Storage Migration', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  describe('fresh install defaults', () => {
    it('creates default progress structure on first load', () => {
      const storage = new ProgressStorage();
      const progress = storage.getProgress();

      expect(progress.version).toBe(4);
      expect(progress.subjects).toEqual({});
      expect(progress.settings.theme).toBe('auto');
      expect(progress.settings.codeEditorFontSize).toBe(14);
      expect(progress.settings.showCompletedItems).toBe(true);
    });

    it('sets startedAt timestamp on first load', () => {
      const storage = new ProgressStorage();
      const progress = storage.getProgress();

      expect(progress.startedAt).toBeDefined();
      const timestamp = new Date(progress.startedAt!);
      expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('v1 to v4 migration', () => {
    it('migrates v1 progress adding reviewQueue', () => {
      const v1Progress: Partial<UserProgress> = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: {
              'q1': [{
                attemptId: 'a1',
                timestamp: '2024-01-01T00:00:00.000Z',
                answers: { 'q1-1': 1 },
                score: 80,
                timeSpentSeconds: 120,
              }],
            },
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
          },
        },
        settings: {
          theme: 'dark',
          codeEditorFontSize: 16,
          showCompletedItems: false,
        },
      };

      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(v1Progress));

      const storage = new ProgressStorage();
      const migrated = storage.getProgress();

      expect(migrated.version).toBe(4);
      expect(migrated.reviewQueue).toBeDefined();
      expect(migrated.reviewQueue).toEqual([]);
      expect(migrated.selectedSubjectIds).toBeDefined();
      // Existing users get all subjects selected
      expect(migrated.selectedSubjectIds!.length).toBeGreaterThan(0);
    });

    it('preserves existing subject progress during migration', () => {
      const v1Progress: Partial<UserProgress> = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {
          cs101: {
            status: 'completed',
            startedAt: '2024-01-01T00:00:00.000Z',
            completedAt: '2024-02-01T00:00:00.000Z',
            quizAttempts: {
              'q1': [{
                attemptId: 'a1',
                timestamp: '2024-01-01T00:00:00.000Z',
                answers: { 'q1-1': 1 },
                score: 95,
                timeSpentSeconds: 120,
              }],
            },
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
          },
        },
        settings: {
          theme: 'light',
          codeEditorFontSize: 14,
          showCompletedItems: true,
        },
      };

      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(v1Progress));

      const storage = new ProgressStorage();
      const migrated = storage.getProgress();

      expect(migrated.subjects.cs101.status).toBe('completed');
      expect(migrated.subjects.cs101.startedAt).toBe('2024-01-01T00:00:00.000Z');
      expect(migrated.subjects.cs101.completedAt).toBe('2024-02-01T00:00:00.000Z');
      expect(migrated.subjects.cs101.quizAttempts['q1'][0].score).toBe(95);
    });

    it('preserves user settings during migration', () => {
      const v1Progress: Partial<UserProgress> = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {},
        settings: {
          theme: 'dark',
          codeEditorFontSize: 18,
          showCompletedItems: false,
        },
      };

      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(v1Progress));

      const storage = new ProgressStorage();
      const migrated = storage.getProgress();

      expect(migrated.settings.theme).toBe('dark');
      expect(migrated.settings.codeEditorFontSize).toBe(18);
      expect(migrated.settings.showCompletedItems).toBe(false);
    });
  });

  describe('v3 to v4 migration', () => {
    it('adds selectedSubjectIds for existing users', () => {
      const v3Progress: Partial<UserProgress> = {
        version: 3,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
          },
        },
        reviewQueue: [],
        settings: {
          theme: 'auto',
          codeEditorFontSize: 14,
          showCompletedItems: true,
        },
      };

      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(v3Progress));

      const storage = new ProgressStorage();
      const migrated = storage.getProgress();

      expect(migrated.version).toBe(4);
      expect(migrated.selectedSubjectIds).toBeDefined();
      expect(migrated.selectedSubjectIds!.length).toBeGreaterThan(0);
      // Should include cs101
      expect(migrated.selectedSubjectIds).toContain('cs101');
    });

    it('preserves reviewQueue during v3 to v4 migration', () => {
      const v3Progress: Partial<UserProgress> = {
        version: 3,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {},
        reviewQueue: [
          {
            itemId: 'quiz-1',
            itemType: 'quiz',
            subjectId: 'cs101',
            nextReviewDate: '2024-01-15T00:00:00.000Z',
            streak: 2,
            lastReviewDate: '2024-01-10T00:00:00.000Z',
          },
        ],
        settings: {
          theme: 'auto',
          codeEditorFontSize: 14,
          showCompletedItems: true,
        },
      };

      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(v3Progress));

      const storage = new ProgressStorage();
      const migrated = storage.getProgress();

      expect(migrated.reviewQueue).toHaveLength(1);
      expect(migrated.reviewQueue![0].itemId).toBe('quiz-1');
      expect(migrated.reviewQueue![0].streak).toBe(2);
    });
  });

  describe('missing field migrations', () => {
    it('adds subtopicViews to existing subject progress', () => {
      const oldProgress: Partial<UserProgress> = {
        version: 2,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: { 'q1': [] },
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            // Missing subtopicViews
          } as SubjectProgress,
        },
        settings: {
          theme: 'auto',
          codeEditorFontSize: 14,
          showCompletedItems: true,
        },
      };

      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(oldProgress));

      const storage = new ProgressStorage();
      const migrated = storage.getProgress();

      expect(migrated.subjects.cs101.subtopicViews).toBeDefined();
    });

    it('adds examAttempts when missing from subject', () => {
      const oldProgress = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: {},
            // Missing examAttempts, exerciseCompletions, projectSubmissions
          },
        },
        settings: {
          theme: 'auto',
          codeEditorFontSize: 14,
          showCompletedItems: true,
        },
      };

      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(oldProgress));

      const storage = new ProgressStorage();
      const migrated = storage.getProgress();

      expect(migrated.subjects.cs101.examAttempts).toBeDefined();
      expect(migrated.subjects.cs101.exerciseCompletions).toBeDefined();
      expect(migrated.subjects.cs101.projectSubmissions).toBeDefined();
    });

    it('creates default settings when missing', () => {
      const oldProgress = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {},
        // Missing settings entirely
      };

      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(oldProgress));

      const storage = new ProgressStorage();
      const migrated = storage.getProgress();

      expect(migrated.settings).toBeDefined();
      expect(migrated.settings.theme).toBe('auto');
      expect(migrated.settings.codeEditorFontSize).toBe(14);
      expect(migrated.settings.showCompletedItems).toBe(true);
    });
  });

  describe('corrupt data handling', () => {
    it('returns defaults for invalid JSON', () => {
      localStorageMock.setItem(STORAGE_KEY, 'not valid json {{{');

      const storage = new ProgressStorage();
      const progress = storage.getProgress();

      expect(progress.version).toBe(4);
      expect(progress.subjects).toEqual({});
    });

    it('returns defaults for empty string', () => {
      localStorageMock.setItem(STORAGE_KEY, '');

      const storage = new ProgressStorage();
      const progress = storage.getProgress();

      expect(progress.version).toBe(4);
    });

    it('handles null stored value gracefully', () => {
      // Clear ensures null return from getItem
      localStorageMock.clear();

      const storage = new ProgressStorage();
      const progress = storage.getProgress();

      expect(progress.version).toBe(4);
      expect(progress.subjects).toEqual({});
    });
  });

  describe('data persistence', () => {
    it('persists progress updates to localStorage', () => {
      const storage = new ProgressStorage();

      storage.updateSubjectProgress('cs101', {
        status: 'in_progress',
        startedAt: new Date().toISOString(),
      });

      const stored = JSON.parse(localStorageMock.getItem(STORAGE_KEY)!);
      expect(stored.subjects.cs101.status).toBe('in_progress');
    });

    it('updates lastUpdated timestamp on save', () => {
      const storage = new ProgressStorage();
      const beforeUpdate = Date.now();

      storage.updateSubjectProgress('cs101', {
        status: 'in_progress',
      });

      const stored = JSON.parse(localStorageMock.getItem(STORAGE_KEY)!);
      const updateTime = new Date(stored.lastUpdated).getTime();

      expect(updateTime).toBeGreaterThanOrEqual(beforeUpdate);
    });

    it('preserves existing quiz attempts when updating subject', () => {
      const storage = new ProgressStorage();

      // First, add a quiz attempt
      storage.updateSubjectProgress('cs101', {
        status: 'in_progress',
        quizAttempts: {
          'q1': [{
            attemptId: 'a1',
            timestamp: new Date().toISOString(),
            answers: {},
            score: 85,
            timeSpentSeconds: 100,
          }],
        },
      });

      // Then update status without quiz attempts
      storage.updateSubjectProgress('cs101', {
        status: 'completed',
      });

      const progress = storage.getProgress();
      expect(progress.subjects.cs101.status).toBe('completed');
      expect(progress.subjects.cs101.quizAttempts.q1).toBeDefined();
      expect(progress.subjects.cs101.quizAttempts.q1[0].score).toBe(85);
    });
  });

  describe('multiple quiz attempts tracking', () => {
    it('stores multiple attempts for the same quiz', () => {
      const storage = new ProgressStorage();

      const attempt1: QuizAttempt = {
        attemptId: 'a1',
        timestamp: '2024-01-01T10:00:00.000Z',
        answers: { 'q1': 0 },
        score: 60,
        timeSpentSeconds: 120,
      };

      const attempt2: QuizAttempt = {
        attemptId: 'a2',
        timestamp: '2024-01-02T10:00:00.000Z',
        answers: { 'q1': 1 },
        score: 85,
        timeSpentSeconds: 100,
      };

      storage.updateSubjectProgress('cs101', {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [attempt1, attempt2],
        },
      });

      const progress = storage.getProgress();
      expect(progress.subjects.cs101.quizAttempts['quiz-1']).toHaveLength(2);
      expect(progress.subjects.cs101.quizAttempts['quiz-1'][0].score).toBe(60);
      expect(progress.subjects.cs101.quizAttempts['quiz-1'][1].score).toBe(85);
    });
  });

  describe('subject progress initialization', () => {
    it('creates full progress structure for new subject', () => {
      const storage = new ProgressStorage();

      storage.updateSubjectProgress('math101', {
        status: 'in_progress',
      });

      const progress = storage.getProgress();
      const mathProgress = progress.subjects.math101;

      expect(mathProgress.status).toBe('in_progress');
      expect(mathProgress.quizAttempts).toEqual({});
      expect(mathProgress.examAttempts).toEqual({});
      expect(mathProgress.exerciseCompletions).toEqual({});
      expect(mathProgress.projectSubmissions).toEqual({});
    });

    it('does not overwrite existing collections on update', () => {
      const storage = new ProgressStorage();

      // Initial setup
      storage.updateSubjectProgress('cs101', {
        status: 'in_progress',
        quizAttempts: {
          'q1': [{
            attemptId: 'a1',
            timestamp: new Date().toISOString(),
            answers: {},
            score: 75,
            timeSpentSeconds: 60,
          }],
        },
      });

      // Update with partial data (no quizAttempts)
      storage.updateSubjectProgress('cs101', {
        status: 'completed',
        completedAt: new Date().toISOString(),
      });

      const progress = storage.getProgress();
      expect(progress.subjects.cs101.quizAttempts.q1).toBeDefined();
      expect(progress.subjects.cs101.quizAttempts.q1[0].score).toBe(75);
    });
  });
});
