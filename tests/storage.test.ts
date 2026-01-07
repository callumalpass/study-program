import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';

const now = new Date('2024-01-01T00:00:00.000Z');

const makeStorage = () => new ProgressStorage();

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('ProgressStorage review queue', () => {
  it('adds review items once', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    expect(storage.getReviewQueue()).toHaveLength(1);
  });

  it('updates review interval after a passing attempt', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.updateReviewItem('q1', 'quiz', true);

    const [item] = storage.getReviewQueue();
    expect(item.streak).toBe(1);
    expect(item.interval).toBe(3);
    expect(new Date(item.nextReviewAt).toISOString()).toBe('2024-01-04T00:00:00.000Z');
  });

  it('keeps failed items due the next day', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e1', subjectId: 's1' });
    storage.updateReviewItem('e1', 'exercise', false);

    const [item] = storage.getReviewQueue();
    expect(item.streak).toBe(0);
    expect(item.interval).toBe(1);
    expect(new Date(item.nextReviewAt).toISOString()).toBe('2024-01-02T00:00:00.000Z');
  });

  it('returns due items ordered by date', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q-late', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q-soon', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e-future', subjectId: 's1' });

    const queue = storage.getReviewQueue();
    const late = queue.find(item => item.itemId === 'q-late');
    const soon = queue.find(item => item.itemId === 'q-soon');
    const future = queue.find(item => item.itemId === 'e-future');

    if (!late || !soon || !future) {
      throw new Error('Missing review items');
    }

    late.nextReviewAt = '2024-01-01T00:00:00.000Z';
    late.interval = 3;
    late.streak = 1;

    soon.nextReviewAt = '2023-12-31T00:00:00.000Z';
    soon.interval = 1;
    soon.streak = 0;

    future.nextReviewAt = '2024-02-01T00:00:00.000Z';
    future.interval = 30;
    future.streak = 4;

    const due = storage.getDueReviewItems();
    expect(due.map(item => item.itemId)).toEqual(['q-soon', 'q-late']);
  });

  it('respects the due items limit', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 's1' });

    const queue = storage.getReviewQueue();
    const q1 = queue.find(item => item.itemId === 'q1');
    const q2 = queue.find(item => item.itemId === 'q2');
    const q3 = queue.find(item => item.itemId === 'q3');

    if (!q1 || !q2 || !q3) {
      throw new Error('Missing review items');
    }

    q1.nextReviewAt = '2023-12-30T00:00:00.000Z';
    q2.nextReviewAt = '2023-12-31T00:00:00.000Z';
    q3.nextReviewAt = '2023-12-29T00:00:00.000Z';

    const due = storage.getDueReviewItems(2);
    expect(due.map(item => item.itemId)).toEqual(['q3', 'q1']);
  });

  it('removes items from the review queue', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e1', subjectId: 's1' });
    storage.removeFromReviewQueue('q1', 'quiz');

    expect(storage.getReviewQueue().map(item => item.itemId)).toEqual(['e1']);
  });

  it('counts due review items', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q-due', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e-future', subjectId: 's1' });

    const queue = storage.getReviewQueue();
    const due = queue.find(item => item.itemId === 'q-due');
    const future = queue.find(item => item.itemId === 'e-future');

    if (!due || !future) {
      throw new Error('Missing review items');
    }

    due.nextReviewAt = '2023-12-31T00:00:00.000Z';
    future.nextReviewAt = '2024-02-01T00:00:00.000Z';

    expect(storage.getDueReviewCount()).toBe(1);
  });
});

describe('ProgressStorage selections', () => {
  it('adds and removes selected subjects', () => {
    const storage = makeStorage();

    storage.addToSelection('cs101');
    storage.addToSelection('cs101');
    storage.addToSelection('cs102');

    expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs102']);
    expect(storage.isSubjectSelected('cs101')).toBe(true);

    storage.removeFromSelection('cs101');
    expect(storage.getSelectedSubjects()).toEqual(['cs102']);
    expect(storage.isSubjectSelected('cs101')).toBe(false);
  });

  it('reports if any subjects are selected', () => {
    const storage = makeStorage();
    expect(storage.hasSelectedSubjects()).toBe(false);

    storage.setSelectedSubjects(['cs101']);
    expect(storage.hasSelectedSubjects()).toBe(true);
  });
});

describe('ProgressStorage import', () => {
  it('rejects invalid JSON', () => {
    const storage = makeStorage();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(storage.importProgress('not json')).toBe(false);
    errorSpy.mockRestore();
  });

  it('rejects malformed progress data', () => {
    const storage = makeStorage();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const malformed = JSON.stringify({ version: 4, subjects: {} });
    expect(storage.importProgress(malformed)).toBe(false);
    errorSpy.mockRestore();
  });

  it('migrates legacy progress data', () => {
    const storage = makeStorage();

    const legacy = {
      version: 3,
      startedAt: now.toISOString(),
      subjects: {},
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
    };

    const result = storage.importProgress(JSON.stringify(legacy));
    expect(result).toBe(true);

    const migrated = storage.getProgress();
    expect(migrated.reviewQueue).toEqual([]);
    expect(migrated.selectedSubjectIds?.length).toBeGreaterThan(0);
    expect(migrated.selectedSubjectIds).toContain('cs101');
  });

  it('round-trips export and import with current version', () => {
    const storage = makeStorage();
    storage.addToSelection('cs101');

    const exported = storage.exportProgress();
    const next = makeStorage();

    expect(next.importProgress(exported)).toBe(true);
    expect(next.getSelectedSubjects()).toEqual(['cs101']);
  });
});

describe('ProgressStorage reset', () => {
  it('clears subjects and selections', () => {
    const storage = makeStorage();
    storage.addToSelection('cs101');
    storage.updateSubjectProgress('cs101', { status: 'in_progress' });

    storage.resetProgress();

    expect(storage.getSelectedSubjects()).toEqual([]);
    expect(storage.getProgress().subjects).toEqual({});
  });
});

describe('ProgressStorage quiz attempts', () => {
  it('adds quiz attempts and creates subject progress if not exists', () => {
    const storage = makeStorage();
    const attempt = {
      date: now.toISOString(),
      score: 80,
      answers: { q1: 'a', q2: 'b' },
      timeSpentSeconds: 120,
    };

    storage.addQuizAttempt('cs101', 'quiz-1', attempt);

    const progress = storage.getSubjectProgress('cs101');
    expect(progress).toBeDefined();
    expect(progress?.status).toBe('in_progress');
    expect(storage.getQuizAttempts('cs101', 'quiz-1')).toHaveLength(1);
  });

  it('adds quiz to review queue when score is below 85%', () => {
    const storage = makeStorage();
    storage.addQuizAttempt('cs101', 'quiz-1', {
      date: now.toISOString(),
      score: 70,
      answers: {},
      timeSpentSeconds: 60,
    });

    const queue = storage.getReviewQueue();
    expect(queue.some(item => item.itemId === 'quiz-1')).toBe(true);
  });

  it('does not add quiz to review queue when score is 85% or above', () => {
    const storage = makeStorage();
    storage.addQuizAttempt('cs101', 'quiz-1', {
      date: now.toISOString(),
      score: 85,
      answers: {},
      timeSpentSeconds: 60,
    });

    const queue = storage.getReviewQueue();
    expect(queue.some(item => item.itemId === 'quiz-1')).toBe(false);
  });

  it('returns best quiz attempt based on score', () => {
    const storage = makeStorage();
    storage.addQuizAttempt('cs101', 'quiz-1', {
      date: now.toISOString(),
      score: 60,
      answers: {},
      timeSpentSeconds: 60,
    });
    storage.addQuizAttempt('cs101', 'quiz-1', {
      date: now.toISOString(),
      score: 90,
      answers: {},
      timeSpentSeconds: 45,
    });
    storage.addQuizAttempt('cs101', 'quiz-1', {
      date: now.toISOString(),
      score: 75,
      answers: {},
      timeSpentSeconds: 50,
    });

    const best = storage.getBestQuizAttempt('cs101', 'quiz-1');
    expect(best?.score).toBe(90);
  });

  it('returns undefined for best attempt when no attempts exist', () => {
    const storage = makeStorage();
    expect(storage.getBestQuizAttempt('cs101', 'quiz-1')).toBeUndefined();
  });

  it('returns empty array for quiz attempts when subject does not exist', () => {
    const storage = makeStorage();
    expect(storage.getQuizAttempts('nonexistent', 'quiz-1')).toEqual([]);
  });
});

describe('ProgressStorage exam attempts', () => {
  it('adds exam attempts and creates subject progress if not exists', () => {
    const storage = makeStorage();
    const attempt = {
      date: now.toISOString(),
      score: 75,
      answers: { q1: 'a' },
      timeSpentSeconds: 3600,
    };

    storage.addExamAttempt('cs101', 'midterm', attempt);

    const progress = storage.getSubjectProgress('cs101');
    expect(progress).toBeDefined();
    expect(storage.getExamAttempts('cs101', 'midterm')).toHaveLength(1);
  });

  it('returns best exam attempt based on score', () => {
    const storage = makeStorage();
    storage.addExamAttempt('cs101', 'midterm', {
      date: now.toISOString(),
      score: 50,
      answers: {},
      timeSpentSeconds: 3600,
    });
    storage.addExamAttempt('cs101', 'midterm', {
      date: now.toISOString(),
      score: 85,
      answers: {},
      timeSpentSeconds: 3000,
    });

    const best = storage.getBestExamAttempt('cs101', 'midterm');
    expect(best?.score).toBe(85);
  });

  it('returns undefined for best exam attempt when no attempts exist', () => {
    const storage = makeStorage();
    expect(storage.getBestExamAttempt('cs101', 'midterm')).toBeUndefined();
  });

  it('updates AI grade for exam question', () => {
    const storage = makeStorage();
    storage.addExamAttempt('cs101', 'midterm', {
      date: now.toISOString(),
      score: 70,
      answers: { q1: 'answer' },
      timeSpentSeconds: 3600,
    });

    storage.updateExamAiGrade('cs101', 'midterm', 'q1', {
      score: 85,
      feedback: 'Good answer',
      strengths: ['clarity'],
      improvements: ['add examples'],
    });

    const attempts = storage.getExamAttempts('cs101', 'midterm');
    expect(attempts[0].aiGrades?.['q1'].score).toBe(85);
  });

  it('handles AI grade update when no attempts exist', () => {
    const storage = makeStorage();
    // Should not throw
    storage.updateExamAiGrade('cs101', 'midterm', 'q1', {
      score: 80,
      feedback: 'Good',
      strengths: [],
      improvements: [],
    });
    expect(storage.getExamAttempts('cs101', 'midterm')).toEqual([]);
  });
});

describe('ProgressStorage exercise completions', () => {
  it('adds exercise completion and creates subject progress if not exists', () => {
    const storage = makeStorage();
    const completion = {
      code: 'print("hello")',
      language: 'python' as const,
      passed: true,
      passedTestCases: 5,
      totalTestCases: 5,
      submittedAt: now.toISOString(),
      timeSpentSeconds: 300,
    };

    storage.addExerciseCompletion('cs101', 'ex-1', completion);

    expect(storage.isExercisePassed('cs101', 'ex-1')).toBe(true);
    expect(storage.getExerciseCompletion('cs101', 'ex-1')).toBeDefined();
  });

  it('replaces completion when new one is better (more test cases passed)', () => {
    const storage = makeStorage();
    storage.addExerciseCompletion('cs101', 'ex-1', {
      code: 'v1',
      language: 'python',
      passed: false,
      passedTestCases: 2,
      totalTestCases: 5,
      submittedAt: now.toISOString(),
      timeSpentSeconds: 100,
    });
    storage.addExerciseCompletion('cs101', 'ex-1', {
      code: 'v2',
      language: 'python',
      passed: false,
      passedTestCases: 4,
      totalTestCases: 5,
      submittedAt: now.toISOString(),
      timeSpentSeconds: 150,
    });

    const completion = storage.getExerciseCompletion('cs101', 'ex-1');
    expect(completion?.code).toBe('v2');
    expect(completion?.passedTestCases).toBe(4);
    // Time should accumulate
    expect(completion?.timeSpentSeconds).toBe(250);
  });

  it('adds failed exercise to review queue', () => {
    const storage = makeStorage();
    storage.addExerciseCompletion('cs101', 'ex-1', {
      code: 'bad code',
      language: 'python',
      passed: false,
      passedTestCases: 0,
      totalTestCases: 5,
      submittedAt: now.toISOString(),
      timeSpentSeconds: 60,
    });

    const queue = storage.getReviewQueue();
    expect(queue.some(item => item.itemId === 'ex-1' && item.itemType === 'exercise')).toBe(true);
  });

  it('returns false for isExercisePassed when no completion exists', () => {
    const storage = makeStorage();
    expect(storage.isExercisePassed('cs101', 'ex-1')).toBe(false);
  });

  it('returns undefined for getExerciseCompletion when subject does not exist', () => {
    const storage = makeStorage();
    expect(storage.getExerciseCompletion('nonexistent', 'ex-1')).toBeUndefined();
  });
});

describe('ProgressStorage subtopic views', () => {
  it('records first subtopic view', () => {
    const storage = makeStorage();
    storage.recordSubtopicView('cs101', 'subtopic-1');

    const view = storage.getSubtopicView('cs101', 'subtopic-1');
    expect(view).toBeDefined();
    expect(view?.viewCount).toBe(1);
    expect(view?.firstViewedAt).toBe(now.toISOString());
    expect(view?.lastViewedAt).toBe(now.toISOString());
  });

  it('increments view count on subsequent views', () => {
    const storage = makeStorage();
    storage.recordSubtopicView('cs101', 'subtopic-1');

    vi.setSystemTime(new Date('2024-01-02T00:00:00.000Z'));
    storage.recordSubtopicView('cs101', 'subtopic-1');

    const view = storage.getSubtopicView('cs101', 'subtopic-1');
    expect(view?.viewCount).toBe(2);
    expect(view?.firstViewedAt).toBe(now.toISOString());
    expect(view?.lastViewedAt).toBe('2024-01-02T00:00:00.000Z');
  });

  it('checks if all subtopics are viewed', () => {
    const storage = makeStorage();
    storage.recordSubtopicView('cs101', 'subtopic-1');
    storage.recordSubtopicView('cs101', 'subtopic-2');

    expect(storage.areAllSubtopicsViewed('cs101', ['subtopic-1', 'subtopic-2'])).toBe(true);
    expect(storage.areAllSubtopicsViewed('cs101', ['subtopic-1', 'subtopic-2', 'subtopic-3'])).toBe(false);
  });

  it('returns false for areAllSubtopicsViewed when no views exist', () => {
    const storage = makeStorage();
    expect(storage.areAllSubtopicsViewed('cs101', ['subtopic-1'])).toBe(false);
  });

  it('gets last viewed subtopic for subject', () => {
    const storage = makeStorage();
    storage.recordSubtopicView('cs101', 'subtopic-1');

    vi.setSystemTime(new Date('2024-01-02T00:00:00.000Z'));
    storage.recordSubtopicView('cs101', 'subtopic-2');

    const lastViewed = storage.getLastViewedSubtopicForSubject('cs101');
    expect(lastViewed?.subtopicId).toBe('subtopic-2');
  });

  it('returns null for getLastViewedSubtopicForSubject when no views exist', () => {
    const storage = makeStorage();
    expect(storage.getLastViewedSubtopicForSubject('cs101')).toBeNull();
  });

  it('returns undefined for getSubtopicView when subject does not exist', () => {
    const storage = makeStorage();
    expect(storage.getSubtopicView('nonexistent', 'subtopic-1')).toBeUndefined();
  });
});

describe('ProgressStorage project submissions', () => {
  it('adds project submission', () => {
    const storage = makeStorage();
    const submission = {
      submittedAt: now.toISOString(),
      files: [{ name: 'main.py', content: 'print("hi")' }],
      notes: 'First attempt',
    };

    storage.addProjectSubmission('cs101', 'project-1', submission);

    const submissions = storage.getProjectSubmissions('cs101', 'project-1');
    expect(submissions).toHaveLength(1);
    expect(submissions[0].notes).toBe('First attempt');
  });

  it('allows multiple project submissions', () => {
    const storage = makeStorage();
    storage.addProjectSubmission('cs101', 'project-1', {
      submittedAt: now.toISOString(),
      files: [],
      notes: 'v1',
    });
    storage.addProjectSubmission('cs101', 'project-1', {
      submittedAt: now.toISOString(),
      files: [],
      notes: 'v2',
    });

    expect(storage.getProjectSubmissions('cs101', 'project-1')).toHaveLength(2);
  });

  it('returns empty array for getProjectSubmissions when subject does not exist', () => {
    const storage = makeStorage();
    expect(storage.getProjectSubmissions('nonexistent', 'project-1')).toEqual([]);
  });
});

describe('ProgressStorage settings', () => {
  it('updates settings', () => {
    const storage = makeStorage();
    storage.updateSettings({ theme: 'dark', codeEditorFontSize: 16 });

    const settings = storage.getSettings();
    expect(settings.theme).toBe('dark');
    expect(settings.codeEditorFontSize).toBe(16);
  });

  it('preserves existing settings when updating', () => {
    const storage = makeStorage();
    storage.updateSettings({ theme: 'dark' });
    storage.updateSettings({ codeEditorFontSize: 18 });

    const settings = storage.getSettings();
    expect(settings.theme).toBe('dark');
    expect(settings.codeEditorFontSize).toBe(18);
    expect(settings.showCompletedItems).toBe(true); // default preserved
  });
});

describe('ProgressStorage clearSubjectProgress', () => {
  it('clears a specific subject progress', () => {
    const storage = makeStorage();
    storage.updateSubjectProgress('cs101', { status: 'completed' });
    storage.updateSubjectProgress('cs102', { status: 'in_progress' });

    storage.clearSubjectProgress('cs101');

    expect(storage.getSubjectProgress('cs101')).toBeUndefined();
    expect(storage.getSubjectProgress('cs102')).toBeDefined();
  });
});

describe('ProgressStorage localStorage error handling', () => {
  it('handles localStorage read errors gracefully', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress).toBeDefined();
    expect(progress.version).toBe(4);

    getItemSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('handles localStorage write errors gracefully', () => {
    const storage = makeStorage();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage full');
    });

    // Should not throw
    storage.updateSubjectProgress('cs101', { status: 'in_progress' });

    setItemSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('handles corrupted localStorage data', () => {
    localStorage.setItem('study_program_progress', 'invalid{json');
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress).toBeDefined();
    expect(progress.version).toBe(4);

    errorSpy.mockRestore();
  });
});

describe('ProgressStorage spaced repetition intervals', () => {
  it('calculates correct intervals for increasing streaks', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    // First pass: streak 0 -> 1, interval 1 -> 3
    storage.updateReviewItem('q1', 'quiz', true);
    let item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item?.streak).toBe(1);
    expect(item?.interval).toBe(3);

    // Second pass: streak 1 -> 2, interval 3 -> 7
    vi.setSystemTime(new Date('2024-01-04T00:00:00.000Z'));
    storage.updateReviewItem('q1', 'quiz', true);
    item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item?.streak).toBe(2);
    expect(item?.interval).toBe(7);

    // Third pass: streak 2 -> 3, interval 7 -> 14
    vi.setSystemTime(new Date('2024-01-11T00:00:00.000Z'));
    storage.updateReviewItem('q1', 'quiz', true);
    item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item?.streak).toBe(3);
    expect(item?.interval).toBe(14);

    // Fourth pass: streak 3 -> 4, interval 14 -> 30
    vi.setSystemTime(new Date('2024-01-25T00:00:00.000Z'));
    storage.updateReviewItem('q1', 'quiz', true);
    item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item?.streak).toBe(4);
    expect(item?.interval).toBe(30);
  });

  it('resets streak on failure', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    // Build up streak
    storage.updateReviewItem('q1', 'quiz', true);
    storage.updateReviewItem('q1', 'quiz', true);

    let item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item?.streak).toBe(2);

    // Fail
    storage.updateReviewItem('q1', 'quiz', false);
    item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item?.streak).toBe(0);
    expect(item?.interval).toBe(1);
  });
});

describe('ProgressStorage migration', () => {
  it('migrates v3 progress to v4', () => {
    const v3Progress = {
      version: 3,
      startedAt: now.toISOString(),
      subjects: {
        cs101: {
          status: 'in_progress',
          quizAttempts: {},
          examAttempts: {},
          exerciseCompletions: {},
          projectSubmissions: {},
        },
      },
      settings: {
        theme: 'dark',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
      reviewQueue: [],
    };

    localStorage.setItem('study_program_progress', JSON.stringify(v3Progress));
    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress.version).toBe(4);
    expect(progress.selectedSubjectIds).toBeDefined();
    expect(progress.selectedSubjectIds?.length).toBeGreaterThan(0);
    expect(progress.subjects['cs101'].subtopicViews).toEqual({});
  });

  it('handles missing settings during migration', () => {
    const oldProgress = {
      version: 2,
      startedAt: now.toISOString(),
      subjects: {},
    };

    localStorage.setItem('study_program_progress', JSON.stringify(oldProgress));
    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress.settings).toBeDefined();
    expect(progress.settings.theme).toBe('auto');
  });
});
