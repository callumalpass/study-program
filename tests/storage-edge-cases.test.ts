/**
 * Storage Edge Cases Tests
 *
 * Tests edge cases in the ProgressStorage class including:
 * - Concurrent operations
 * - Data migration edge cases
 * - Boundary conditions for scores and intervals
 * - Invalid data handling
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';

const now = new Date('2024-01-15T12:00:00.000Z');

const makeStorage = () => new ProgressStorage();

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Storage boundary conditions', () => {
  describe('Quiz scores at boundaries', () => {
    it('adds quiz to review queue when score is exactly 84', () => {
      const storage = makeStorage();
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'attempt-1',
        timestamp: now.toISOString(),
        score: 84,
        answers: {},
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      expect(queue.some(item => item.itemId === 'quiz-1')).toBe(true);
    });

    it('does not add quiz to review queue when score is exactly 85', () => {
      const storage = makeStorage();
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'attempt-1',
        timestamp: now.toISOString(),
        score: 85,
        answers: {},
        timeSpentSeconds: 60,
      });

      const queue = storage.getReviewQueue();
      expect(queue.some(item => item.itemId === 'quiz-1')).toBe(false);
    });

    it('handles quiz score of 0', () => {
      const storage = makeStorage();
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'attempt-1',
        timestamp: now.toISOString(),
        score: 0,
        answers: {},
        timeSpentSeconds: 30,
      });

      expect(storage.getQuizAttempts('cs101', 'quiz-1')).toHaveLength(1);
      const queue = storage.getReviewQueue();
      expect(queue.some(item => item.itemId === 'quiz-1')).toBe(true);
    });

    it('handles quiz score of 100', () => {
      const storage = makeStorage();
      storage.addQuizAttempt('cs101', 'quiz-1', {
        attemptId: 'attempt-1',
        timestamp: now.toISOString(),
        score: 100,
        answers: {},
        timeSpentSeconds: 120,
      });

      expect(storage.getQuizAttempts('cs101', 'quiz-1')).toHaveLength(1);
      const queue = storage.getReviewQueue();
      expect(queue.some(item => item.itemId === 'quiz-1')).toBe(false);
    });
  });

  describe('Spaced repetition interval boundaries', () => {
    it('reaches maximum interval of 30 days', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Pass 5 times to reach max interval
      for (let i = 0; i < 5; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }

      const item = storage.getReviewQueue().find(i => i.itemId === 'q1');
      expect(item?.interval).toBe(30);
    });

    it('interval stays at 30 days on continued success beyond streak 4', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Pass many times
      for (let i = 0; i < 10; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }

      const item = storage.getReviewQueue().find(i => i.itemId === 'q1');
      expect(item?.interval).toBe(30);
      expect(item?.streak).toBe(10);
    });

    it('resets to 1 day interval immediately after failure', () => {
      const storage = makeStorage();
      storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

      // Build up to 30 day interval
      for (let i = 0; i < 5; i++) {
        storage.updateReviewItem('q1', 'quiz', true);
      }

      // Fail once
      storage.updateReviewItem('q1', 'quiz', false);

      const item = storage.getReviewQueue().find(i => i.itemId === 'q1');
      expect(item?.interval).toBe(1);
      expect(item?.streak).toBe(0);
    });
  });

  describe('Exercise completion edge cases', () => {
    it('keeps passed submission when new submission has same test cases', () => {
      const storage = makeStorage();
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        code: 'first solution',
        passed: true,
        passedTestCases: 5,
        totalTestCases: 5,
        timestamp: now.toISOString(),
        timeSpentSeconds: 100,
      });

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        code: 'second solution',
        passed: true,
        passedTestCases: 5,
        totalTestCases: 5,
        timestamp: now.toISOString(),
        timeSpentSeconds: 50,
      });

      const completion = storage.getExerciseCompletion('cs101', 'ex-1');
      // Should keep first since equal test cases (not a better submission)
      expect(completion?.code).toBe('first solution');
      // Time does NOT accumulate since submission was not replaced
      expect(completion?.timeSpentSeconds).toBe(100);
    });

    it('replaces failed submission with passed submission even with fewer test cases', () => {
      const storage = makeStorage();
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        code: 'failed solution',
        passed: false,
        passedTestCases: 4,
        totalTestCases: 5,
        timestamp: now.toISOString(),
        timeSpentSeconds: 100,
      });

      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c2',
        code: 'passed solution',
        passed: true,
        passedTestCases: 3,
        totalTestCases: 5,
        timestamp: now.toISOString(),
        timeSpentSeconds: 50,
      });

      const completion = storage.getExerciseCompletion('cs101', 'ex-1');
      expect(completion?.passed).toBe(true);
      expect(completion?.code).toBe('passed solution');
    });

    it('accumulates time across all submissions', () => {
      const storage = makeStorage();

      for (let i = 0; i < 5; i++) {
        storage.addExerciseCompletion('cs101', 'ex-1', {
          completionId: `c${i}`,
          code: `attempt ${i}`,
          passed: i === 4,
          passedTestCases: i,
          totalTestCases: 5,
          timestamp: now.toISOString(),
          timeSpentSeconds: 60,
        });
      }

      const completion = storage.getExerciseCompletion('cs101', 'ex-1');
      expect(completion?.timeSpentSeconds).toBe(300);
    });

    it('handles exercise completion with zero time spent', () => {
      const storage = makeStorage();
      storage.addExerciseCompletion('cs101', 'ex-1', {
        completionId: 'c1',
        code: 'instant solution',
        passed: true,
        passedTestCases: 5,
        totalTestCases: 5,
        timestamp: now.toISOString(),
        timeSpentSeconds: 0,
      });

      const completion = storage.getExerciseCompletion('cs101', 'ex-1');
      expect(completion?.timeSpentSeconds).toBe(0);
    });
  });

  describe('Written exercise special handling', () => {
    it('updates written exercise with non-empty content', () => {
      const storage = makeStorage();
      storage.addExerciseCompletion('math101', 'written-1', {
        completionId: 'c1',
        code: 'First proof attempt',
        passed: false,
        timestamp: now.toISOString(),
        timeSpentSeconds: 300,
        type: 'written',
      });

      storage.addExerciseCompletion('math101', 'written-1', {
        completionId: 'c2',
        code: 'Better proof attempt',
        passed: false,
        timestamp: now.toISOString(),
        timeSpentSeconds: 200,
        type: 'written',
      });

      const completion = storage.getExerciseCompletion('math101', 'written-1');
      expect(completion?.code).toBe('Better proof attempt');
    });

    it('does not update written exercise with empty content', () => {
      const storage = makeStorage();
      storage.addExerciseCompletion('math101', 'written-1', {
        completionId: 'c1',
        code: 'Good proof',
        passed: true,
        timestamp: now.toISOString(),
        timeSpentSeconds: 300,
        type: 'written',
      });

      storage.addExerciseCompletion('math101', 'written-1', {
        completionId: 'c2',
        code: '',
        passed: false,
        timestamp: now.toISOString(),
        timeSpentSeconds: 100,
        type: 'written',
      });

      const completion = storage.getExerciseCompletion('math101', 'written-1');
      expect(completion?.code).toBe('Good proof');
    });

    it('does not update written exercise with whitespace-only content', () => {
      const storage = makeStorage();
      storage.addExerciseCompletion('math101', 'written-1', {
        completionId: 'c1',
        code: 'Good proof',
        passed: true,
        timestamp: now.toISOString(),
        timeSpentSeconds: 300,
        type: 'written',
      });

      storage.addExerciseCompletion('math101', 'written-1', {
        completionId: 'c2',
        code: '   \n\t  ',
        passed: false,
        timestamp: now.toISOString(),
        timeSpentSeconds: 100,
        type: 'written',
      });

      const completion = storage.getExerciseCompletion('math101', 'written-1');
      expect(completion?.code).toBe('Good proof');
    });
  });
});

describe('AI evaluation merging', () => {
  it('accumulates AI evaluations across submissions', () => {
    const storage = makeStorage();

    storage.addExerciseCompletion('math101', 'written-1', {
      completionId: 'c1',
      code: 'Proof v1',
      passed: true,
      timestamp: now.toISOString(),
      timeSpentSeconds: 300,
      type: 'written',
      aiEvaluations: [
        { score: 70, passed: true, timestamp: now.toISOString() }
      ],
    });

    vi.setSystemTime(new Date('2024-01-16T12:00:00.000Z'));

    storage.addExerciseCompletion('math101', 'written-1', {
      completionId: 'c2',
      code: 'Proof v2',
      passed: true,
      timestamp: new Date().toISOString(),
      timeSpentSeconds: 200,
      type: 'written',
      aiEvaluations: [
        { score: 85, passed: true, timestamp: new Date().toISOString() }
      ],
    });

    const completion = storage.getExerciseCompletion('math101', 'written-1');
    expect(completion?.aiEvaluations).toHaveLength(2);
    expect(completion?.aiEvaluations?.[0].score).toBe(70);
    expect(completion?.aiEvaluations?.[1].score).toBe(85);
  });

  it('preserves AI evaluations when new submission has none', () => {
    const storage = makeStorage();

    storage.addExerciseCompletion('math101', 'written-1', {
      completionId: 'c1',
      code: 'Proof v1',
      passed: true,
      timestamp: now.toISOString(),
      timeSpentSeconds: 300,
      type: 'written',
      aiEvaluations: [
        { score: 70, passed: true, timestamp: now.toISOString() }
      ],
    });

    storage.addExerciseCompletion('math101', 'written-1', {
      completionId: 'c2',
      code: 'Proof v2',
      passed: true,
      timestamp: now.toISOString(),
      timeSpentSeconds: 200,
      type: 'written',
    });

    const completion = storage.getExerciseCompletion('math101', 'written-1');
    expect(completion?.aiEvaluations).toHaveLength(1);
  });
});

describe('Subject progress initialization', () => {
  it('initializes all collections when creating new subject', () => {
    const storage = makeStorage();
    storage.addQuizAttempt('newsubject', 'quiz-1', {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      score: 80,
      answers: {},
      timeSpentSeconds: 60,
    });

    const progress = storage.getSubjectProgress('newsubject');
    expect(progress?.quizAttempts).toBeDefined();
    expect(progress?.examAttempts).toBeDefined();
    expect(progress?.exerciseCompletions).toBeDefined();
    expect(progress?.projectSubmissions).toBeDefined();
    expect(progress?.subtopicViews).toBeDefined();
  });

  it('ensures collections exist after updateSubjectProgress', () => {
    const storage = makeStorage();
    storage.updateSubjectProgress('test', { status: 'completed' });

    const progress = storage.getSubjectProgress('test');
    expect(progress?.quizAttempts).toBeDefined();
    expect(progress?.examAttempts).toBeDefined();
    expect(progress?.exerciseCompletions).toBeDefined();
    expect(progress?.projectSubmissions).toBeDefined();
  });
});

describe('Review queue edge cases', () => {
  it('handles multiple items due at exact same time', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e1', subjectId: 's1' });

    const due = storage.getDueReviewItems();
    expect(due).toHaveLength(3);
  });

  it('returns empty array when no items are due', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    // Pass it so it's scheduled for later
    storage.updateReviewItem('q1', 'quiz', true);

    // Still at same time, so next review is in future
    const due = storage.getDueReviewItems();
    expect(due).toHaveLength(0);
  });

  it('getDueReviewCount matches getDueReviewItems length', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e1', subjectId: 's1' });

    expect(storage.getDueReviewCount()).toBe(storage.getDueReviewItems().length);
  });

  it('handles removing non-existent item from review queue', () => {
    const storage = makeStorage();

    // Should not throw
    storage.removeFromReviewQueue('nonexistent', 'quiz');
    expect(storage.getReviewQueue()).toHaveLength(0);
  });

  it('distinguishes between quiz and exercise with same ID', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'item-1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'item-1', subjectId: 's1' });

    expect(storage.getReviewQueue()).toHaveLength(2);

    storage.removeFromReviewQueue('item-1', 'quiz');

    const remaining = storage.getReviewQueue();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].itemType).toBe('exercise');
  });
});

describe('Subtopic view edge cases', () => {
  it('tracks views across multiple subjects independently', () => {
    const storage = makeStorage();

    storage.recordSubtopicView('cs101', 'subtopic-1');
    storage.recordSubtopicView('cs102', 'subtopic-1');

    expect(storage.getSubtopicView('cs101', 'subtopic-1')?.viewCount).toBe(1);
    expect(storage.getSubtopicView('cs102', 'subtopic-1')?.viewCount).toBe(1);
  });

  it('handles areAllSubtopicsViewed with empty array', () => {
    const storage = makeStorage();
    storage.recordSubtopicView('cs101', 'subtopic-1');

    // Empty array should return true (vacuously true)
    expect(storage.areAllSubtopicsViewed('cs101', [])).toBe(true);
  });

  it('getLastViewedSubtopicForSubject returns correct subtopic with many views', () => {
    const storage = makeStorage();

    storage.recordSubtopicView('cs101', 'subtopic-1');
    vi.setSystemTime(new Date('2024-01-15T13:00:00.000Z'));
    storage.recordSubtopicView('cs101', 'subtopic-2');
    vi.setSystemTime(new Date('2024-01-15T14:00:00.000Z'));
    storage.recordSubtopicView('cs101', 'subtopic-3');
    vi.setSystemTime(new Date('2024-01-15T15:00:00.000Z'));
    storage.recordSubtopicView('cs101', 'subtopic-1'); // Update first one again

    const lastViewed = storage.getLastViewedSubtopicForSubject('cs101');
    expect(lastViewed?.subtopicId).toBe('subtopic-1');
    expect(lastViewed?.lastViewedAt.toISOString()).toBe('2024-01-15T15:00:00.000Z');
  });
});

describe('Settings persistence', () => {
  it('preserves all settings fields when updating one', () => {
    const storage = makeStorage();

    storage.updateSettings({ theme: 'dark' });
    storage.updateSettings({ codeEditorFontSize: 18 });
    storage.updateSettings({ showCompletedItems: false });

    const settings = storage.getSettings();
    expect(settings.theme).toBe('dark');
    expect(settings.codeEditorFontSize).toBe(18);
    expect(settings.showCompletedItems).toBe(false);
  });

  it('handles undefined optional settings', () => {
    const storage = makeStorage();

    const settings = storage.getSettings();
    expect(settings.githubToken).toBeUndefined();
    expect(settings.gistId).toBeUndefined();
    expect(settings.geminiApiKey).toBeUndefined();
    expect(settings.studyPlan).toBeUndefined();
  });
});

describe('Data integrity after operations', () => {
  it('maintains lastUpdated timestamp after each save', () => {
    const storage = makeStorage();

    storage.addQuizAttempt('cs101', 'quiz-1', {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      score: 80,
      answers: {},
      timeSpentSeconds: 60,
    });

    const progress1 = storage.getProgress();
    expect(progress1.lastUpdated).toBe(now.toISOString());

    vi.setSystemTime(new Date('2024-01-16T12:00:00.000Z'));
    storage.addQuizAttempt('cs101', 'quiz-2', {
      attemptId: 'a2',
      timestamp: new Date().toISOString(),
      score: 90,
      answers: {},
      timeSpentSeconds: 45,
    });

    const progress2 = storage.getProgress();
    expect(progress2.lastUpdated).toBe('2024-01-16T12:00:00.000Z');
  });

  it('maintains version number through all operations', () => {
    const storage = makeStorage();

    storage.addQuizAttempt('cs101', 'quiz-1', {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      score: 80,
      answers: {},
      timeSpentSeconds: 60,
    });
    storage.updateSettings({ theme: 'dark' });
    storage.addToSelection('cs102');

    expect(storage.getProgress().version).toBe(4);
  });
});

describe('Course selection edge cases', () => {
  it('handles duplicate add attempts silently', () => {
    const storage = makeStorage();

    storage.addToSelection('cs101');
    storage.addToSelection('cs101');
    storage.addToSelection('cs101');

    expect(storage.getSelectedSubjects()).toEqual(['cs101']);
  });

  it('handles remove from empty selection', () => {
    const storage = makeStorage();

    // Should not throw
    storage.removeFromSelection('cs101');
    expect(storage.getSelectedSubjects()).toEqual([]);
  });

  it('setSelectedSubjects creates a copy of the array', () => {
    const storage = makeStorage();
    const subjects = ['cs101', 'cs102'];

    storage.setSelectedSubjects(subjects);
    subjects.push('cs103');

    expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs102']);
  });
});
