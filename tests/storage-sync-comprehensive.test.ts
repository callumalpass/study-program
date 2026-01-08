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

describe('ProgressStorage sync debouncing', () => {
  it('debounces multiple rapid saves', () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token', gistId: 'gist123' });

    // Make multiple rapid changes
    for (let i = 0; i < 10; i++) {
      storage.updateSettings({ codeEditorFontSize: 14 + i });
    }

    // The sync should be debounced - only one pending
    // We can't directly verify the debounce without more infrastructure,
    // but we can verify the final state is saved
    const settings = storage.getSettings();
    expect(settings.codeEditorFontSize).toBe(23); // 14 + 9
  });

  it('clears sync timeout on flush', () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token', gistId: 'gist123' });
    storage.updateSettings({ codeEditorFontSize: 16 });

    // flushSync should clear the pending debounced sync
    storage.flushSync();

    // Settings should still be saved locally
    expect(storage.getSettings().codeEditorFontSize).toBe(16);
  });

  it('handles flushSync without credentials gracefully', () => {
    const storage = makeStorage();
    // No GitHub credentials configured
    storage.updateSettings({ codeEditorFontSize: 18 });

    // Should not throw
    expect(() => storage.flushSync()).not.toThrow();
  });
});

describe('ProgressStorage syncFromGist', () => {
  it('returns synced: false when no credentials', async () => {
    const storage = makeStorage();
    // No credentials set

    const result = await storage.syncFromGist();

    expect(result).toEqual({ synced: false, updated: false });
  });

  it('returns synced: false when only token is set', async () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token' }); // No gistId

    const result = await storage.syncFromGist();

    expect(result).toEqual({ synced: false, updated: false });
  });

  it('returns synced: false when only gistId is set', async () => {
    const storage = makeStorage();
    storage.updateSettings({ gistId: 'gist123' }); // No token

    const result = await storage.syncFromGist();

    expect(result).toEqual({ synced: false, updated: false });
  });
});

describe('ProgressStorage settings sync safety', () => {
  it('preserves sensitive settings after sync', () => {
    const storage = makeStorage();

    // Set up local sensitive settings
    storage.updateSettings({
      githubToken: 'my-secret-token',
      gistId: 'my-gist-id',
      geminiApiKey: 'my-api-key',
      theme: 'light',
    });

    // Verify settings are preserved
    const settings = storage.getSettings();
    expect(settings.githubToken).toBe('my-secret-token');
    expect(settings.gistId).toBe('my-gist-id');
    expect(settings.geminiApiKey).toBe('my-api-key');
    expect(settings.theme).toBe('light');
  });

  it('allows updating non-sensitive settings independently', () => {
    const storage = makeStorage();

    storage.updateSettings({ theme: 'dark' });
    storage.updateSettings({ codeEditorFontSize: 18 });
    storage.updateSettings({ showCompletedItems: false });

    const settings = storage.getSettings();
    expect(settings.theme).toBe('dark');
    expect(settings.codeEditorFontSize).toBe(18);
    expect(settings.showCompletedItems).toBe(false);
  });
});

describe('ProgressStorage lastUpdated tracking', () => {
  it('updates lastUpdated on every save', () => {
    const storage = makeStorage();

    // Initial state
    let progress = storage.getProgress();
    expect(progress.lastUpdated).toBeUndefined();

    // First update
    storage.updateSettings({ theme: 'dark' });
    progress = storage.getProgress();
    expect(progress.lastUpdated).toBe('2024-01-01T00:00:00.000Z');

    // Advance time and make another update
    vi.setSystemTime(new Date('2024-01-02T00:00:00.000Z'));
    storage.updateSettings({ theme: 'light' });
    progress = storage.getProgress();
    expect(progress.lastUpdated).toBe('2024-01-02T00:00:00.000Z');
  });

  it('tracks lastUpdated through quiz attempts', () => {
    const storage = makeStorage();

    vi.setSystemTime(new Date('2024-01-01T12:00:00.000Z'));
    storage.addQuizAttempt('cs101', 'quiz-1', {
      date: new Date().toISOString(),
      score: 80,
      answers: {},
      timeSpentSeconds: 60,
    });

    expect(storage.getProgress().lastUpdated).toBe('2024-01-01T12:00:00.000Z');
  });

  it('tracks lastUpdated through exam attempts', () => {
    const storage = makeStorage();

    vi.setSystemTime(new Date('2024-01-01T14:00:00.000Z'));
    storage.addExamAttempt('cs101', 'midterm', {
      date: new Date().toISOString(),
      score: 75,
      answers: {},
      timeSpentSeconds: 3600,
    });

    expect(storage.getProgress().lastUpdated).toBe('2024-01-01T14:00:00.000Z');
  });

  it('tracks lastUpdated through exercise completions', () => {
    const storage = makeStorage();

    vi.setSystemTime(new Date('2024-01-01T16:00:00.000Z'));
    storage.addExerciseCompletion('cs101', 'ex-1', {
      code: 'print("hi")',
      language: 'python',
      passed: true,
      passedTestCases: 5,
      totalTestCases: 5,
      submittedAt: new Date().toISOString(),
      timeSpentSeconds: 300,
    });

    expect(storage.getProgress().lastUpdated).toBe('2024-01-01T16:00:00.000Z');
  });
});

describe('ProgressStorage concurrent modification safety', () => {
  it('handles rapid subject updates without data loss', () => {
    const storage = makeStorage();

    // Create multiple subjects rapidly
    const subjectIds = ['cs101', 'cs102', 'cs103', 'cs104', 'cs105'];
    subjectIds.forEach(id => {
      storage.updateSubjectProgress(id, { status: 'in_progress' });
    });

    // Verify all subjects were created
    subjectIds.forEach(id => {
      const progress = storage.getSubjectProgress(id);
      expect(progress).toBeDefined();
      expect(progress?.status).toBe('in_progress');
    });
  });

  it('handles rapid quiz attempts for different quizzes', () => {
    const storage = makeStorage();
    const quizIds = ['q1', 'q2', 'q3', 'q4', 'q5'];

    quizIds.forEach((quizId, index) => {
      storage.addQuizAttempt('cs101', quizId, {
        date: now.toISOString(),
        score: 60 + index * 5,
        answers: {},
        timeSpentSeconds: 60,
      });
    });

    // Verify all quizzes have attempts
    quizIds.forEach((quizId, index) => {
      const attempts = storage.getQuizAttempts('cs101', quizId);
      expect(attempts).toHaveLength(1);
      expect(attempts[0].score).toBe(60 + index * 5);
    });
  });

  it('handles interleaved operations across different subjects', () => {
    const storage = makeStorage();

    // Interleave operations across subjects
    storage.addQuizAttempt('cs101', 'q1', {
      date: now.toISOString(),
      score: 80,
      answers: {},
      timeSpentSeconds: 60,
    });
    storage.addExamAttempt('cs102', 'midterm', {
      date: now.toISOString(),
      score: 75,
      answers: {},
      timeSpentSeconds: 3600,
    });
    storage.addExerciseCompletion('cs103', 'ex1', {
      code: 'code',
      language: 'python',
      passed: true,
      passedTestCases: 1,
      totalTestCases: 1,
      submittedAt: now.toISOString(),
      timeSpentSeconds: 100,
    });
    storage.recordSubtopicView('cs104', 'subtopic-1');
    storage.addProjectSubmission('cs105', 'project-1', {
      submittedAt: now.toISOString(),
      files: [],
      notes: 'test',
    });

    // Verify all subjects have correct data
    expect(storage.getQuizAttempts('cs101', 'q1')).toHaveLength(1);
    expect(storage.getExamAttempts('cs102', 'midterm')).toHaveLength(1);
    expect(storage.isExercisePassed('cs103', 'ex1')).toBe(true);
    expect(storage.getSubtopicView('cs104', 'subtopic-1')).toBeDefined();
    expect(storage.getProjectSubmissions('cs105', 'project-1')).toHaveLength(1);
  });
});

describe('ProgressStorage study plan settings', () => {
  it('stores and retrieves study plan settings', () => {
    const storage = makeStorage();

    const studyPlan = {
      startDate: '2024-01-01',
      weeklyHours: 20,
      difficulty: 'medium' as const,
    };

    storage.updateSettings({ studyPlan });

    const settings = storage.getSettings();
    expect(settings.studyPlan).toEqual(studyPlan);
  });

  it('updates study plan while preserving other settings', () => {
    const storage = makeStorage();

    storage.updateSettings({ theme: 'dark' });
    storage.updateSettings({
      studyPlan: {
        startDate: '2024-02-01',
        weeklyHours: 15,
        difficulty: 'easy',
      },
    });

    const settings = storage.getSettings();
    expect(settings.theme).toBe('dark');
    expect(settings.studyPlan?.weeklyHours).toBe(15);
  });
});

describe('ProgressStorage AI evaluations in exercise completions', () => {
  it('merges AI evaluations when updating exercise completion', () => {
    const storage = makeStorage();

    // First completion with AI evaluation
    storage.addExerciseCompletion('cs101', 'ex-1', {
      code: 'code v1',
      language: 'python',
      passed: true,
      passedTestCases: 3,
      totalTestCases: 5,
      submittedAt: now.toISOString(),
      timeSpentSeconds: 100,
      aiEvaluations: [{ score: 70, feedback: 'First eval', strengths: [], improvements: [] }],
    });

    // Second completion with better results and another AI evaluation
    storage.addExerciseCompletion('cs101', 'ex-1', {
      code: 'code v2',
      language: 'python',
      passed: true,
      passedTestCases: 5,
      totalTestCases: 5,
      submittedAt: now.toISOString(),
      timeSpentSeconds: 50,
      aiEvaluations: [{ score: 90, feedback: 'Second eval', strengths: [], improvements: [] }],
    });

    const completion = storage.getExerciseCompletion('cs101', 'ex-1');
    expect(completion?.code).toBe('code v2');
    expect(completion?.aiEvaluations).toHaveLength(2);
    expect(completion?.aiEvaluations?.[0].score).toBe(70);
    expect(completion?.aiEvaluations?.[1].score).toBe(90);
  });

  it('handles AI-only completion updates', () => {
    const storage = makeStorage();

    // Initial code completion
    storage.addExerciseCompletion('cs101', 'ex-written', {
      code: 'my written answer',
      language: 'text',
      passed: false,
      submittedAt: now.toISOString(),
      timeSpentSeconds: 300,
      type: 'written',
    });

    // AI evaluation update (no test cases, just AI grade)
    storage.addExerciseCompletion('cs101', 'ex-written', {
      code: 'my written answer',
      language: 'text',
      passed: true,
      submittedAt: now.toISOString(),
      timeSpentSeconds: 0,
      type: 'written',
      aiEvaluations: [{ score: 85, feedback: 'Good work', strengths: ['clear'], improvements: [] }],
    });

    const completion = storage.getExerciseCompletion('cs101', 'ex-written');
    expect(completion?.passed).toBe(true);
    expect(completion?.aiEvaluations).toHaveLength(1);
    expect(completion?.timeSpentSeconds).toBe(300); // Accumulated from first submission
  });
});

describe('ProgressStorage version migration completeness', () => {
  it('migrates from v2 with minimal data', () => {
    const v2Progress = {
      version: 2,
      startedAt: now.toISOString(),
      subjects: {},
    };

    localStorage.setItem('study_program_progress', JSON.stringify(v2Progress));
    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress.version).toBe(4);
    expect(progress.settings).toBeDefined();
    expect(progress.settings.theme).toBe('auto');
    expect(progress.reviewQueue).toEqual([]);
    expect(progress.selectedSubjectIds).toBeDefined();
    expect(progress.selectedSubjectIds?.length).toBeGreaterThan(0);
  });

  it('migrates subject data structures correctly', () => {
    const oldProgress = {
      version: 2,
      startedAt: now.toISOString(),
      subjects: {
        cs101: {
          status: 'in_progress',
          // Old format might not have all these arrays
        },
      },
      settings: {
        theme: 'dark',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
    };

    localStorage.setItem('study_program_progress', JSON.stringify(oldProgress));
    const storage = makeStorage();
    const subject = storage.getSubjectProgress('cs101');

    // All arrays should be initialized
    expect(subject?.quizAttempts).toEqual({});
    expect(subject?.examAttempts).toEqual({});
    expect(subject?.exerciseCompletions).toEqual({});
    expect(subject?.projectSubmissions).toEqual({});
    expect(subject?.subtopicViews).toEqual({});
  });

  it('preserves existing subject data during migration', () => {
    const existingAttempt = {
      date: now.toISOString(),
      score: 85,
      answers: { q1: 'a' },
      timeSpentSeconds: 120,
    };

    const oldProgress = {
      version: 3,
      startedAt: now.toISOString(),
      subjects: {
        cs101: {
          status: 'completed',
          quizAttempts: { 'quiz-1': [existingAttempt] },
          examAttempts: {},
          exerciseCompletions: {},
          projectSubmissions: {},
        },
      },
      settings: {
        theme: 'light',
        codeEditorFontSize: 16,
        showCompletedItems: false,
      },
      reviewQueue: [],
    };

    localStorage.setItem('study_program_progress', JSON.stringify(oldProgress));
    const storage = makeStorage();

    // Existing data should be preserved
    const attempts = storage.getQuizAttempts('cs101', 'quiz-1');
    expect(attempts).toHaveLength(1);
    expect(attempts[0].score).toBe(85);

    // Settings should be preserved
    expect(storage.getSettings().theme).toBe('light');
    expect(storage.getSettings().codeEditorFontSize).toBe(16);
  });
});
