/**
 * Progress Storage Comprehensive Tests
 *
 * Extended tests for the progress storage module, focusing on edge cases
 * in quiz attempt tracking, exercise completions, and review queue management.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';
import type { QuizAttempt, ExerciseCompletion, SubjectProgress } from '../src/core/types';

const now = new Date('2024-06-15T12:00:00.000Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('ProgressStorage - Quiz Attempts', () => {
  describe('addQuizAttempt edge cases', () => {
    it('creates subject progress if it does not exist', () => {
      const storage = new ProgressStorage();
      const attempt: QuizAttempt = {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: { q1: 0 },
        score: 80,
        timeSpentSeconds: 120,
      };

      storage.addQuizAttempt('cs101', 'quiz-1', attempt);

      const subjectProgress = storage.getSubjectProgress('cs101');
      expect(subjectProgress).toBeDefined();
      expect(subjectProgress?.status).toBe('in_progress');
    });

    it('creates quiz array if it does not exist', () => {
      const storage = new ProgressStorage();
      const attempt: QuizAttempt = {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 100,
        timeSpentSeconds: 60,
      };

      storage.addQuizAttempt('cs101', 'quiz-1', attempt);
      const attempts = storage.getQuizAttempts('cs101', 'quiz-1');

      expect(attempts).toHaveLength(1);
      expect(attempts[0].attemptId).toBe('a1');
    });

    it('appends to existing quiz attempts', () => {
      const storage = new ProgressStorage();

      const attempt1: QuizAttempt = {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 60,
        timeSpentSeconds: 60,
      };

      const attempt2: QuizAttempt = {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 45,
      };

      storage.addQuizAttempt('cs101', 'quiz-1', attempt1);
      storage.addQuizAttempt('cs101', 'quiz-1', attempt2);

      const attempts = storage.getQuizAttempts('cs101', 'quiz-1');
      expect(attempts).toHaveLength(2);
      expect(attempts[0].score).toBe(60);
      expect(attempts[1].score).toBe(80);
    });

    it('adds to review queue if score below passing', () => {
      const storage = new ProgressStorage();
      const attempt: QuizAttempt = {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 65, // Below 70% passing score
        timeSpentSeconds: 60,
      };

      storage.addQuizAttempt('cs101', 'quiz-1', attempt);

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].itemId).toBe('quiz-1');
      expect(queue[0].itemType).toBe('quiz');
    });

    it('updates review interval if score is passing', () => {
      const storage = new ProgressStorage();

      // First: failing attempt adds to queue
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 50,
        timeSpentSeconds: 60,
      });

      // Second: passing attempt should update interval
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 45,
      });

      const queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(1);
      expect(queue[0].interval).toBe(3);
    });
  });

  describe('getBestQuizAttempt edge cases', () => {
    it('returns undefined for no attempts', () => {
      const storage = new ProgressStorage();
      const best = storage.getBestQuizAttempt('cs101', 'quiz-1');
      expect(best).toBeUndefined();
    });

    it('returns undefined for non-existent subject', () => {
      const storage = new ProgressStorage();
      const best = storage.getBestQuizAttempt('nonexistent', 'quiz-1');
      expect(best).toBeUndefined();
    });

    it('returns the highest scoring attempt', () => {
      const storage = new ProgressStorage();

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 60,
        timeSpentSeconds: 60,
      });

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 90,
        timeSpentSeconds: 45,
      });

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a3',
        timestamp: now.toISOString(),
        answers: {},
        score: 75,
        timeSpentSeconds: 50,
      });

      const best = storage.getBestQuizAttempt('cs101', 'quiz-1');
      expect(best?.attemptId).toBe('a2');
      expect(best?.score).toBe(90);
    });

    it('returns first attempt when all scores are equal', () => {
      const storage = new ProgressStorage();

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 60,
      });

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 45,
      });

      const best = storage.getBestQuizAttempt('cs101', 'quiz-1');
      expect(best?.attemptId).toBe('a1');
    });
  });
});

describe('ProgressStorage - Exercise Completions', () => {
  describe('addExerciseCompletion edge cases', () => {
    it('creates subject progress if it does not exist', () => {
      const storage = new ProgressStorage();
      const completion: ExerciseCompletion = {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def solution(): pass',
        passed: true,
        passedTestCases: 5,
        totalTestCases: 5,
        timeSpentSeconds: 300,
      };

      storage.addExerciseCompletion('cs101', 'ex-1', completion);

      const subjectProgress = storage.getSubjectProgress('cs101');
      expect(subjectProgress).toBeDefined();
      expect(subjectProgress?.status).toBe('in_progress');
    });

    it('replaces when new passed and old failed', () => {
      const storage = new ProgressStorage();

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def solution(): return None',
        passed: false,
        passedTestCases: 2,
        totalTestCases: 5,
        timeSpentSeconds: 300,
      });

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        timestamp: now.toISOString(),
        code: 'def solution(): return 42',
        passed: true,
        passedTestCases: 5,
        totalTestCases: 5,
        timeSpentSeconds: 200,
      });

      const completion = storage.getExerciseCompletion('cs101', 'ex-1');
      expect(completion?.completionId).toBe('c2');
      expect(completion?.passed).toBe(true);
    });

    it('replaces when both passed but new has more test cases', () => {
      const storage = new ProgressStorage();

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def solution(): return 42',
        passed: true,
        passedTestCases: 3,
        totalTestCases: 5,
        timeSpentSeconds: 300,
      });

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        timestamp: now.toISOString(),
        code: 'def solution(): return 42',
        passed: true,
        passedTestCases: 5,
        totalTestCases: 5,
        timeSpentSeconds: 200,
      });

      const completion = storage.getExerciseCompletion('cs101', 'ex-1');
      expect(completion?.completionId).toBe('c2');
      expect(completion?.passedTestCases).toBe(5);
    });

    it('accumulates time spent across attempts', () => {
      const storage = new ProgressStorage();

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def solution(): return None',
        passed: false,
        passedTestCases: 2,
        totalTestCases: 5,
        timeSpentSeconds: 300,
      });

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        timestamp: now.toISOString(),
        code: 'def solution(): return 42',
        passed: true,
        passedTestCases: 5,
        totalTestCases: 5,
        timeSpentSeconds: 200,
      });

      const completion = storage.getExerciseCompletion('cs101', 'ex-1');
      // Time should be accumulated: 300 + 200 = 500
      expect(completion?.timeSpentSeconds).toBe(500);
    });

    it('does not replace when new is worse than existing', () => {
      const storage = new ProgressStorage();

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def solution(): return 42',
        passed: true,
        passedTestCases: 5,
        totalTestCases: 5,
        timeSpentSeconds: 300,
      });

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        timestamp: now.toISOString(),
        code: 'def solution(): return None',
        passed: false,
        passedTestCases: 2,
        totalTestCases: 5,
        timeSpentSeconds: 200,
      });

      const completion = storage.getExerciseCompletion('cs101', 'ex-1');
      // Should keep the better (passed) completion
      expect(completion?.completionId).toBe('c1');
      expect(completion?.passed).toBe(true);
    });

    it('adds to review queue on failure', () => {
      const storage = new ProgressStorage();

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def solution(): return None',
        passed: false,
        timeSpentSeconds: 300,
      });

      const queue = storage.getReviewQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].itemId).toBe('ex-1');
      expect(queue[0].itemType).toBe('exercise');
    });

    it('updates review interval on pass', () => {
      const storage = new ProgressStorage();

      // First: failing attempt
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'def solution(): return None',
        passed: false,
        timeSpentSeconds: 300,
      });

      // Second: passing attempt
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        timestamp: now.toISOString(),
        code: 'def solution(): return 42',
        passed: true,
        timeSpentSeconds: 200,
      });

      const queue = storage.getReviewQueue();
      expect(queue[0].streak).toBe(1);
      expect(queue[0].interval).toBe(3);
    });
  });

  describe('written exercise handling', () => {
    it('always updates for written exercises with content', () => {
      const storage = new ProgressStorage();

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        timestamp: now.toISOString(),
        code: 'First attempt answer',
        passed: false,
        timeSpentSeconds: 300,
        type: 'written',
      });

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        timestamp: now.toISOString(),
        code: 'Updated answer with more content',
        passed: false,
        timeSpentSeconds: 200,
        type: 'written',
      });

      const completion = storage.getExerciseCompletion('cs101', 'ex-1');
      // Written exercises always update if new has content
      expect(completion?.completionId).toBe('c2');
      expect(completion?.code).toBe('Updated answer with more content');
    });
  });
});

describe('ProgressStorage - Review Queue Due Items', () => {
  describe('getDueReviewItems', () => {
    it('returns empty array when queue is empty', () => {
      const storage = new ProgressStorage();
      const due = storage.getDueReviewItems();
      expect(due).toEqual([]);
    });

    it('returns only items with nextReviewAt <= now', () => {
      const storage = new ProgressStorage();

      // Add item due now
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Add item due in the future by manipulating it
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
      storage.updateReviewItem('q2', 'quiz', true); // Sets to 3 days in future

      const due = storage.getDueReviewItems();
      expect(due).toHaveLength(1);
      expect(due[0].itemId).toBe('q1');
    });

    it('sorts by nextReviewAt (oldest first)', () => {
      const storage = new ProgressStorage();

      // Add items with different due dates
      vi.setSystemTime(new Date('2024-06-15T10:00:00.000Z'));
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      vi.setSystemTime(new Date('2024-06-15T08:00:00.000Z'));
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });

      vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'));
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 's1' });

      // Set current time to after all items
      vi.setSystemTime(new Date('2024-06-15T14:00:00.000Z'));

      const due = storage.getDueReviewItems();
      expect(due.map(item => item.itemId)).toEqual(['q2', 'q1', 'q3']);
    });

    it('respects limit parameter', () => {
      const storage = new ProgressStorage();

      for (let i = 1; i <= 10; i++) {
        storage.addToReviewQueue({ itemType: 'quiz', itemId: `q${i}`, subjectId: 's1' });
      }

      const due = storage.getDueReviewItems(3);
      expect(due).toHaveLength(3);
    });

    it('defaults to limit of 10', () => {
      const storage = new ProgressStorage();

      for (let i = 1; i <= 15; i++) {
        storage.addToReviewQueue({ itemType: 'quiz', itemId: `q${i}`, subjectId: 's1' });
      }

      const due = storage.getDueReviewItems();
      expect(due).toHaveLength(10);
    });
  });

  describe('getDueReviewCount', () => {
    it('returns 0 for empty queue', () => {
      const storage = new ProgressStorage();
      expect(storage.getDueReviewCount()).toBe(0);
    });

    it('counts only due items', () => {
      const storage = new ProgressStorage();

      // Add item due now
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });

      // Move one item to future
      storage.updateReviewItem('q2', 'quiz', true);

      expect(storage.getDueReviewCount()).toBe(1);
    });
  });
});

describe('ProgressStorage - Subject Progress', () => {
  describe('updateSubjectProgress', () => {
    it('creates new subject progress with defaults', () => {
      const storage = new ProgressStorage();
      storage.updateSubjectProgress('cs101', { status: 'in_progress' });

      const progress = storage.getSubjectProgress('cs101');
      expect(progress).toBeDefined();
      expect(progress?.status).toBe('in_progress');
      expect(progress?.quizAttempts).toEqual({});
      expect(progress?.examAttempts).toEqual({});
      expect(progress?.exerciseCompletions).toEqual({});
      expect(progress?.projectSubmissions).toEqual({});
    });

    it('merges updates with existing progress', () => {
      const storage = new ProgressStorage();
      storage.updateSubjectProgress('cs101', { status: 'in_progress' });
      storage.updateSubjectProgress('cs101', { startedAt: now.toISOString() });

      const progress = storage.getSubjectProgress('cs101');
      expect(progress?.status).toBe('in_progress');
      expect(progress?.startedAt).toBe(now.toISOString());
    });

    it('preserves existing data when updating', () => {
      const storage = new ProgressStorage();

      // Add quiz attempt to create subject progress
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 60,
      });

      // Update status
      storage.updateSubjectProgress('cs101', { status: 'completed' });

      const progress = storage.getSubjectProgress('cs101');
      expect(progress?.status).toBe('completed');
      expect(progress?.quizAttempts['quiz-1']).toHaveLength(1);
    });
  });

  describe('clearSubjectProgress', () => {
    it('removes all progress for a subject', () => {
      const storage = new ProgressStorage();

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 60,
      });

      storage.clearSubjectProgress('cs101');

      expect(storage.getSubjectProgress('cs101')).toBeUndefined();
    });

    it('does not affect other subjects', () => {
      const storage = new ProgressStorage();

      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'a1',
        timestamp: now.toISOString(),
        answers: {},
        score: 80,
        timeSpentSeconds: 60,
      });

      storage.addQuizAttempt('cs102', 'quiz-1', {
        attemptId: 'a2',
        timestamp: now.toISOString(),
        answers: {},
        score: 90,
        timeSpentSeconds: 45,
      });

      storage.clearSubjectProgress('cs101');

      expect(storage.getSubjectProgress('cs101')).toBeUndefined();
      expect(storage.getSubjectProgress('cs102')).toBeDefined();
    });
  });
});

describe('ProgressStorage - Course Selection', () => {
  describe('getSelectedSubjects', () => {
    it('returns empty array for new users', () => {
      const storage = new ProgressStorage();
      expect(storage.getSelectedSubjects()).toEqual([]);
    });
  });

  describe('setSelectedSubjects', () => {
    it('sets the complete list', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101', 'cs102', 'math101']);

      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs102', 'math101']);
    });

    it('replaces existing selection', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101', 'cs102']);
      storage.setSelectedSubjects(['math101', 'math102']);

      expect(storage.getSelectedSubjects()).toEqual(['math101', 'math102']);
    });
  });

  describe('addToSelection', () => {
    it('adds new subject to empty selection', () => {
      const storage = new ProgressStorage();
      storage.addToSelection('cs101');

      expect(storage.getSelectedSubjects()).toEqual(['cs101']);
    });

    it('adds new subject to existing selection', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101']);
      storage.addToSelection('cs102');

      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs102']);
    });

    it('does not add duplicate', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101']);
      storage.addToSelection('cs101');

      expect(storage.getSelectedSubjects()).toEqual(['cs101']);
    });
  });

  describe('removeFromSelection', () => {
    it('removes existing subject', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101', 'cs102', 'math101']);
      storage.removeFromSelection('cs102');

      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'math101']);
    });

    it('does nothing for non-existent subject', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101', 'cs102']);
      storage.removeFromSelection('math101');

      expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs102']);
    });

    it('handles empty selection', () => {
      const storage = new ProgressStorage();
      storage.removeFromSelection('cs101');

      expect(storage.getSelectedSubjects()).toEqual([]);
    });
  });

  describe('isSubjectSelected', () => {
    it('returns true for selected subject', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101', 'cs102']);

      expect(storage.isSubjectSelected('cs101')).toBe(true);
      expect(storage.isSubjectSelected('cs102')).toBe(true);
    });

    it('returns false for unselected subject', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101']);

      expect(storage.isSubjectSelected('cs102')).toBe(false);
    });

    it('returns false for empty selection', () => {
      const storage = new ProgressStorage();

      expect(storage.isSubjectSelected('cs101')).toBe(false);
    });
  });

  describe('hasSelectedSubjects', () => {
    it('returns false for new users', () => {
      const storage = new ProgressStorage();
      expect(storage.hasSelectedSubjects()).toBe(false);
    });

    it('returns true when subjects are selected', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101']);

      expect(storage.hasSelectedSubjects()).toBe(true);
    });

    it('returns false after clearing selection', () => {
      const storage = new ProgressStorage();
      storage.setSelectedSubjects(['cs101']);
      storage.setSelectedSubjects([]);

      expect(storage.hasSelectedSubjects()).toBe(false);
    });
  });
});

describe('ProgressStorage - Subtopic Views', () => {
  describe('recordSubtopicView', () => {
    it('records first view correctly', () => {
      const storage = new ProgressStorage();
      storage.recordSubtopicView('cs101', 'subtopic-1');

      const view = storage.getSubtopicView('cs101', 'subtopic-1');
      expect(view).toBeDefined();
      expect(view?.viewCount).toBe(1);
      expect(view?.firstViewedAt).toBe(now.toISOString());
      expect(view?.lastViewedAt).toBe(now.toISOString());
    });

    it('increments view count on subsequent views', () => {
      const storage = new ProgressStorage();

      storage.recordSubtopicView('cs101', 'subtopic-1');

      vi.advanceTimersByTime(60000); // 1 minute later
      storage.recordSubtopicView('cs101', 'subtopic-1');

      vi.advanceTimersByTime(60000); // Another minute
      storage.recordSubtopicView('cs101', 'subtopic-1');

      const view = storage.getSubtopicView('cs101', 'subtopic-1');
      expect(view?.viewCount).toBe(3);
    });

    it('updates lastViewedAt on each view', () => {
      const storage = new ProgressStorage();

      storage.recordSubtopicView('cs101', 'subtopic-1');
      const firstViewedAt = storage.getSubtopicView('cs101', 'subtopic-1')?.lastViewedAt;

      vi.advanceTimersByTime(3600000); // 1 hour later
      storage.recordSubtopicView('cs101', 'subtopic-1');

      const view = storage.getSubtopicView('cs101', 'subtopic-1');
      expect(view?.firstViewedAt).toBe(firstViewedAt);
      expect(view?.lastViewedAt).not.toBe(firstViewedAt);
    });

    it('creates subject progress if needed', () => {
      const storage = new ProgressStorage();
      storage.recordSubtopicView('cs101', 'subtopic-1');

      const progress = storage.getSubjectProgress('cs101');
      expect(progress).toBeDefined();
      expect(progress?.status).toBe('in_progress');
    });
  });

  describe('areAllSubtopicsViewed', () => {
    it('returns false for no views', () => {
      const storage = new ProgressStorage();
      expect(storage.areAllSubtopicsViewed('cs101', ['s1', 's2', 's3'])).toBe(false);
    });

    it('returns false for partial views', () => {
      const storage = new ProgressStorage();
      storage.recordSubtopicView('cs101', 's1');
      storage.recordSubtopicView('cs101', 's2');

      expect(storage.areAllSubtopicsViewed('cs101', ['s1', 's2', 's3'])).toBe(false);
    });

    it('returns true for all views', () => {
      const storage = new ProgressStorage();
      storage.recordSubtopicView('cs101', 's1');
      storage.recordSubtopicView('cs101', 's2');
      storage.recordSubtopicView('cs101', 's3');

      expect(storage.areAllSubtopicsViewed('cs101', ['s1', 's2', 's3'])).toBe(true);
    });

    it('returns false for empty subtopic list when no views exist', () => {
      // The implementation requires views to exist first, so empty list with no views returns false
      const storage = new ProgressStorage();
      expect(storage.areAllSubtopicsViewed('cs101', [])).toBe(false);
    });

    it('returns true for empty subtopic list when views exist', () => {
      // When there are views and the subtopic list is empty, every() returns true for empty array
      const storage = new ProgressStorage();
      storage.recordSubtopicView('cs101', 's1'); // Create some views first
      expect(storage.areAllSubtopicsViewed('cs101', [])).toBe(true);
    });
  });

  describe('getLastViewedSubtopicForSubject', () => {
    it('returns null for no views', () => {
      const storage = new ProgressStorage();
      expect(storage.getLastViewedSubtopicForSubject('cs101')).toBeNull();
    });

    it('returns the most recently viewed subtopic', () => {
      const storage = new ProgressStorage();

      storage.recordSubtopicView('cs101', 's1');
      vi.advanceTimersByTime(60000);
      storage.recordSubtopicView('cs101', 's2');
      vi.advanceTimersByTime(60000);
      storage.recordSubtopicView('cs101', 's3');

      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result?.subtopicId).toBe('s3');
    });

    it('handles revisiting older subtopics', () => {
      const storage = new ProgressStorage();

      storage.recordSubtopicView('cs101', 's1');
      vi.advanceTimersByTime(60000);
      storage.recordSubtopicView('cs101', 's2');
      vi.advanceTimersByTime(60000);
      storage.recordSubtopicView('cs101', 's1'); // Revisit s1

      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result?.subtopicId).toBe('s1');
    });
  });
});
