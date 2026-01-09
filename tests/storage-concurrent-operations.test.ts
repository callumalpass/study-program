/**
 * Tests for storage concurrent operation handling and race condition prevention.
 *
 * These tests verify that the storage module correctly handles:
 * - Multiple rapid updates
 * - Edge cases in progress tracking
 * - Data integrity during migrations
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ProgressStorage } from '@/core/storage';

describe('Storage Concurrent Operations', () => {
  let storage: ProgressStorage;
  let mockLocalStorage: Record<string, string>;

  beforeEach(() => {
    mockLocalStorage = {};

    // Mock localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => mockLocalStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        mockLocalStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockLocalStorage[key];
      }),
      clear: vi.fn(() => {
        mockLocalStorage = {};
      }),
    });

    storage = new ProgressStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('Multiple rapid quiz attempts', () => {
    it('should preserve all quiz attempts when added rapidly', () => {
      const subjectId = 'cs101';
      const quizId = 'quiz-1';

      // Add multiple attempts in rapid succession
      for (let i = 0; i < 5; i++) {
        storage.addQuizAttempt(subjectId, quizId, {
          attemptId: `attempt-${i}`,
          timestamp: new Date().toISOString(),
          answers: { q1: i },
          score: 60 + i * 10,
          timeSpentSeconds: 100 + i * 10,
        });
      }

      const attempts = storage.getQuizAttempts(subjectId, quizId);
      expect(attempts).toHaveLength(5);

      // Verify all attempts are preserved in order
      attempts.forEach((attempt, index) => {
        expect(attempt.attemptId).toBe(`attempt-${index}`);
        expect(attempt.score).toBe(60 + index * 10);
      });
    });

    it('should correctly identify best attempt after multiple submissions', () => {
      const subjectId = 'cs101';
      const quizId = 'quiz-1';

      // Add attempts with varying scores
      const scores = [75, 85, 65, 95, 80];
      scores.forEach((score, i) => {
        storage.addQuizAttempt(subjectId, quizId, {
          attemptId: `attempt-${i}`,
          timestamp: new Date().toISOString(),
          answers: {},
          score,
          timeSpentSeconds: 100,
        });
      });

      const bestAttempt = storage.getBestQuizAttempt(subjectId, quizId);
      expect(bestAttempt?.score).toBe(95);
      expect(bestAttempt?.attemptId).toBe('attempt-3');
    });
  });

  describe('Exercise completion updates', () => {
    it('should replace exercise completion when new one is better', () => {
      const subjectId = 'cs101';
      const exerciseId = 'ex-1';

      // First attempt - failed
      storage.addExerciseCompletion(subjectId, exerciseId, {
        completionId: 'comp-1',
        timestamp: new Date().toISOString(),
        code: 'print("hello")',
        passed: false,
        passedTestCases: 1,
        totalTestCases: 3,
        timeSpentSeconds: 60,
      });

      // Second attempt - passed
      storage.addExerciseCompletion(subjectId, exerciseId, {
        completionId: 'comp-2',
        timestamp: new Date().toISOString(),
        code: 'print("hello world")',
        passed: true,
        passedTestCases: 3,
        totalTestCases: 3,
        timeSpentSeconds: 30,
      });

      const completion = storage.getExerciseCompletion(subjectId, exerciseId);
      expect(completion?.passed).toBe(true);
      expect(completion?.passedTestCases).toBe(3);
      // Time should accumulate
      expect(completion?.timeSpentSeconds).toBe(90);
    });

    it('should not replace better completion with worse one', () => {
      const subjectId = 'cs101';
      const exerciseId = 'ex-1';

      // First attempt - passed
      storage.addExerciseCompletion(subjectId, exerciseId, {
        completionId: 'comp-1',
        timestamp: new Date().toISOString(),
        code: 'correct code',
        passed: true,
        passedTestCases: 3,
        totalTestCases: 3,
        timeSpentSeconds: 60,
      });

      // Second attempt - failed (worse)
      storage.addExerciseCompletion(subjectId, exerciseId, {
        completionId: 'comp-2',
        timestamp: new Date().toISOString(),
        code: 'broken code',
        passed: false,
        passedTestCases: 0,
        totalTestCases: 3,
        timeSpentSeconds: 30,
      });

      const completion = storage.getExerciseCompletion(subjectId, exerciseId);
      expect(completion?.passed).toBe(true);
      expect(completion?.completionId).toBe('comp-1');
    });

    it('should accumulate AI evaluations across submissions', () => {
      const subjectId = 'cs101';
      const exerciseId = 'ex-1';

      // First submission with AI evaluation
      storage.addExerciseCompletion(subjectId, exerciseId, {
        completionId: 'comp-1',
        timestamp: new Date().toISOString(),
        code: 'initial code',
        passed: false,
        timeSpentSeconds: 60,
        type: 'written',
        aiEvaluations: [{
          score: 60,
          passed: false,
          timestamp: new Date().toISOString(),
        }],
      });

      // Second submission with better AI evaluation
      storage.addExerciseCompletion(subjectId, exerciseId, {
        completionId: 'comp-2',
        timestamp: new Date().toISOString(),
        code: 'improved code',
        passed: true,
        timeSpentSeconds: 30,
        type: 'written',
        aiEvaluations: [{
          score: 85,
          passed: true,
          timestamp: new Date().toISOString(),
        }],
      });

      const completion = storage.getExerciseCompletion(subjectId, exerciseId);
      expect(completion?.aiEvaluations).toHaveLength(2);
      expect(completion?.aiEvaluations?.[0].score).toBe(60);
      expect(completion?.aiEvaluations?.[1].score).toBe(85);
    });
  });

  describe('Subject progress initialization', () => {
    it('should auto-initialize subject progress when adding quiz attempt', () => {
      const subjectId = 'new-subject';

      storage.addQuizAttempt(subjectId, 'quiz-1', {
        attemptId: 'attempt-1',
        timestamp: new Date().toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 100,
      });

      const progress = storage.getSubjectProgress(subjectId);
      expect(progress).toBeDefined();
      expect(progress?.status).toBe('in_progress');
    });

    it('should auto-initialize subject progress when adding exercise completion', () => {
      const subjectId = 'new-subject';

      storage.addExerciseCompletion(subjectId, 'ex-1', {
        completionId: 'comp-1',
        timestamp: new Date().toISOString(),
        code: 'code',
        passed: true,
        timeSpentSeconds: 100,
      });

      const progress = storage.getSubjectProgress(subjectId);
      expect(progress).toBeDefined();
      expect(progress?.status).toBe('in_progress');
    });

    it('should preserve existing progress when auto-initializing', () => {
      const subjectId = 'cs101';

      // First set some progress
      storage.updateSubjectProgress(subjectId, {
        status: 'in_progress',
        startedAt: '2024-01-01',
      });

      // Add quiz attempt (should not reset progress)
      storage.addQuizAttempt(subjectId, 'quiz-1', {
        attemptId: 'attempt-1',
        timestamp: new Date().toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 100,
      });

      const progress = storage.getSubjectProgress(subjectId);
      expect(progress?.startedAt).toBe('2024-01-01');
    });
  });

  describe('Review queue operations', () => {
    it('should not duplicate items in review queue', () => {
      const item = {
        itemType: 'quiz' as const,
        itemId: 'quiz-1',
        subjectId: 'cs101',
      };

      // Add same item multiple times
      storage.addToReviewQueue(item);
      storage.addToReviewQueue(item);
      storage.addToReviewQueue(item);

      // Force save to update the progress
      // @ts-expect-error - accessing private method for testing
      storage.save();

      const queue = storage.getReviewQueue();
      const matchingItems = queue.filter(
        r => r.itemId === item.itemId && r.itemType === item.itemType
      );

      expect(matchingItems).toHaveLength(1);
    });

    it('should correctly update streak on pass/fail', () => {
      const itemId = 'quiz-1';
      const itemType = 'quiz' as const;

      storage.addToReviewQueue({
        itemType,
        itemId,
        subjectId: 'cs101',
      });

      // Simulate passing multiple times
      storage.updateReviewItem(itemId, itemType, true);
      storage.updateReviewItem(itemId, itemType, true);
      storage.updateReviewItem(itemId, itemType, true);

      let queue = storage.getReviewQueue();
      let item = queue.find(r => r.itemId === itemId);
      expect(item?.streak).toBe(3);

      // Fail - should reset streak
      storage.updateReviewItem(itemId, itemType, false);

      queue = storage.getReviewQueue();
      item = queue.find(r => r.itemId === itemId);
      expect(item?.streak).toBe(0);
    });

    it('should correctly calculate next review intervals', () => {
      const itemId = 'quiz-1';
      const itemType = 'quiz' as const;

      storage.addToReviewQueue({
        itemType,
        itemId,
        subjectId: 'cs101',
      });

      // Pass once -> interval should be 3 days
      storage.updateReviewItem(itemId, itemType, true);
      let queue = storage.getReviewQueue();
      let item = queue.find(r => r.itemId === itemId);
      expect(item?.interval).toBe(3);

      // Pass twice -> interval should be 7 days
      storage.updateReviewItem(itemId, itemType, true);
      queue = storage.getReviewQueue();
      item = queue.find(r => r.itemId === itemId);
      expect(item?.interval).toBe(7);

      // Pass three times -> interval should be 14 days
      storage.updateReviewItem(itemId, itemType, true);
      queue = storage.getReviewQueue();
      item = queue.find(r => r.itemId === itemId);
      expect(item?.interval).toBe(14);

      // Pass four times -> interval should be 30 days (mastered)
      storage.updateReviewItem(itemId, itemType, true);
      queue = storage.getReviewQueue();
      item = queue.find(r => r.itemId === itemId);
      expect(item?.interval).toBe(30);
    });
  });

  describe('Migration handling', () => {
    it('should migrate old progress format with missing fields', () => {
      const oldProgress = {
        version: 1,
        startedAt: '2024-01-01',
        subjects: {
          cs101: {
            status: 'in_progress',
            // Missing quizAttempts, examAttempts, etc.
          },
        },
        settings: {
          theme: 'dark',
          codeEditorFontSize: 14,
          showCompletedItems: true,
        },
      };

      // @ts-expect-error - testing with incomplete data
      const migrated = storage.migrate(oldProgress);

      expect(migrated.version).toBe(4); // Current version
      expect(migrated.reviewQueue).toEqual([]);
      expect(migrated.selectedSubjectIds).toBeDefined();
      expect(migrated.subjects.cs101.quizAttempts).toEqual({});
      expect(migrated.subjects.cs101.examAttempts).toEqual({});
      expect(migrated.subjects.cs101.exerciseCompletions).toEqual({});
      expect(migrated.subjects.cs101.projectSubmissions).toEqual({});
    });

    it('should preserve existing data during migration', () => {
      const oldProgress = {
        version: 2,
        startedAt: '2024-01-01',
        subjects: {
          cs101: {
            status: 'completed',
            quizAttempts: {
              'quiz-1': [{ attemptId: 'a1', score: 90 }],
            },
            examAttempts: {},
            exerciseCompletions: {
              'ex-1': { passed: true },
            },
            projectSubmissions: {},
          },
        },
        settings: {
          theme: 'light',
          codeEditorFontSize: 16,
          showCompletedItems: false,
        },
      };

      // @ts-expect-error - testing with old version data
      const migrated = storage.migrate(oldProgress);

      // Existing data should be preserved
      expect(migrated.subjects.cs101.status).toBe('completed');
      expect(migrated.subjects.cs101.quizAttempts['quiz-1']).toHaveLength(1);
      expect(migrated.subjects.cs101.exerciseCompletions['ex-1'].passed).toBe(true);
      expect(migrated.settings.theme).toBe('light');
      expect(migrated.settings.codeEditorFontSize).toBe(16);
    });
  });

  describe('Settings updates', () => {
    it('should merge settings without overwriting existing ones', () => {
      // Initial settings
      storage.updateSettings({
        theme: 'dark',
        codeEditorFontSize: 14,
      });

      // Update only theme
      storage.updateSettings({
        theme: 'light',
      });

      const settings = storage.getSettings();
      expect(settings.theme).toBe('light');
      expect(settings.codeEditorFontSize).toBe(14);
    });

    it('should preserve sensitive settings on update', () => {
      storage.updateSettings({
        githubToken: 'token123',
        gistId: 'gist123',
        geminiApiKey: 'key123',
      });

      storage.updateSettings({
        theme: 'auto',
      });

      const settings = storage.getSettings();
      expect(settings.githubToken).toBe('token123');
      expect(settings.gistId).toBe('gist123');
      expect(settings.geminiApiKey).toBe('key123');
    });
  });

  describe('Subject selection', () => {
    it('should track selected subjects correctly', () => {
      storage.setSelectedSubjects(['cs101', 'math101']);

      expect(storage.isSubjectSelected('cs101')).toBe(true);
      expect(storage.isSubjectSelected('math101')).toBe(true);
      expect(storage.isSubjectSelected('cs102')).toBe(false);
    });

    it('should add and remove subjects from selection', () => {
      storage.setSelectedSubjects(['cs101']);

      storage.addToSelection('math101');
      expect(storage.isSubjectSelected('math101')).toBe(true);

      storage.removeFromSelection('cs101');
      expect(storage.isSubjectSelected('cs101')).toBe(false);
    });

    it('should not duplicate subjects when adding', () => {
      storage.setSelectedSubjects(['cs101']);

      storage.addToSelection('cs101');
      storage.addToSelection('cs101');

      const selected = storage.getSelectedSubjects();
      expect(selected.filter(s => s === 'cs101')).toHaveLength(1);
    });

    it('should report hasSelectedSubjects correctly', () => {
      expect(storage.hasSelectedSubjects()).toBe(false);

      storage.addToSelection('cs101');
      expect(storage.hasSelectedSubjects()).toBe(true);

      storage.removeFromSelection('cs101');
      expect(storage.hasSelectedSubjects()).toBe(false);
    });
  });

  describe('Import/Export functionality', () => {
    it('should export progress as valid JSON', () => {
      storage.updateSubjectProgress('cs101', {
        status: 'completed',
      });

      const exported = storage.exportProgress();
      const parsed = JSON.parse(exported);

      expect(parsed.subjects.cs101.status).toBe('completed');
    });

    it('should import valid progress data', () => {
      const importData = JSON.stringify({
        version: 4,
        startedAt: '2024-01-01',
        subjects: {
          cs101: {
            status: 'completed',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
          },
        },
        settings: {
          theme: 'dark',
          codeEditorFontSize: 16,
          showCompletedItems: true,
        },
      });

      const result = storage.importProgress(importData);
      expect(result).toBe(true);

      const progress = storage.getSubjectProgress('cs101');
      expect(progress?.status).toBe('completed');
    });

    it('should reject invalid import data', () => {
      const invalidData = '{ invalid json }';
      const result = storage.importProgress(invalidData);
      expect(result).toBe(false);
    });

    it('should reject import data missing required fields', () => {
      const incompleteData = JSON.stringify({
        // Missing version, subjects, settings
        someField: 'value',
      });

      const result = storage.importProgress(incompleteData);
      expect(result).toBe(false);
    });
  });
});
