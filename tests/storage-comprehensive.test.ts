/**
 * Comprehensive Storage Tests
 *
 * These tests cover edge cases and additional scenarios for the ProgressStorage class,
 * including migration, quiz/exam attempts, exercise completions, and subtopic tracking.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';
import type { QuizAttempt, ExamAttempt, ExerciseCompletion, ProjectSubmission } from '../src/core/types';

const now = new Date('2024-01-01T12:00:00.000Z');

const makeStorage = () => new ProgressStorage();

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('ProgressStorage initialization', () => {
  it('creates default progress when localStorage is empty', () => {
    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress.version).toBe(4);
    expect(progress.subjects).toEqual({});
    expect(progress.settings.theme).toBe('auto');
    expect(progress.settings.codeEditorFontSize).toBe(14);
    expect(progress.settings.showCompletedItems).toBe(true);
  });

  it('loads existing progress from localStorage', () => {
    const existingProgress = {
      version: 4,
      startedAt: '2023-06-01T00:00:00.000Z',
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
        codeEditorFontSize: 16,
        showCompletedItems: false,
      },
    };
    localStorage.setItem('study_program_progress', JSON.stringify(existingProgress));

    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress.version).toBe(4);
    expect(progress.subjects.cs101.status).toBe('in_progress');
    expect(progress.settings.theme).toBe('dark');
    expect(progress.settings.codeEditorFontSize).toBe(16);
  });

  it('handles corrupted localStorage data gracefully', () => {
    localStorage.setItem('study_program_progress', 'not valid json {{{');
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress.version).toBe(4);
    expect(progress.subjects).toEqual({});
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});

describe('ProgressStorage migration', () => {
  it('migrates from version 1 to current version', () => {
    const v1Progress = {
      version: 1,
      startedAt: '2023-01-01T00:00:00.000Z',
      subjects: {
        cs101: {
          status: 'in_progress',
          quizAttempts: {},
          exerciseCompletions: {},
        },
      },
      settings: {
        theme: 'light',
        codeEditorFontSize: 12,
        showCompletedItems: true,
      },
    };
    localStorage.setItem('study_program_progress', JSON.stringify(v1Progress));

    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress.version).toBe(4);
    expect(progress.reviewQueue).toEqual([]);
    expect(progress.selectedSubjectIds).toBeDefined();
    expect(progress.selectedSubjectIds!.length).toBeGreaterThan(0);
    // Migrated users get all subjects
    expect(progress.selectedSubjectIds).toContain('cs101');
    expect(progress.selectedSubjectIds).toContain('math101');
  });

  it('migrates from version 2 (adds reviewQueue)', () => {
    const v2Progress = {
      version: 2,
      startedAt: '2023-01-01T00:00:00.000Z',
      subjects: {},
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
    };
    localStorage.setItem('study_program_progress', JSON.stringify(v2Progress));

    const storage = makeStorage();
    const progress = storage.getProgress();

    expect(progress.version).toBe(4);
    expect(progress.reviewQueue).toEqual([]);
  });

  it('migrates from version 3 (adds selectedSubjectIds)', () => {
    const v3Progress = {
      version: 3,
      startedAt: '2023-01-01T00:00:00.000Z',
      subjects: {},
      settings: {
        theme: 'auto',
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
    expect(progress.selectedSubjectIds!.length).toBeGreaterThan(0);
  });

  it('fills in missing subject properties during migration', () => {
    const oldProgress = {
      version: 1,
      startedAt: '2023-01-01T00:00:00.000Z',
      subjects: {
        cs101: {
          status: 'in_progress',
          // Missing: quizAttempts, examAttempts, exerciseCompletions, projectSubmissions, subtopicViews
        },
      },
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
    };
    localStorage.setItem('study_program_progress', JSON.stringify(oldProgress));

    const storage = makeStorage();
    const subjectProgress = storage.getSubjectProgress('cs101');

    expect(subjectProgress).toBeDefined();
    expect(subjectProgress!.quizAttempts).toEqual({});
    expect(subjectProgress!.examAttempts).toEqual({});
    expect(subjectProgress!.exerciseCompletions).toEqual({});
    expect(subjectProgress!.projectSubmissions).toEqual({});
    expect(subjectProgress!.subtopicViews).toEqual({});
  });
});

describe('ProgressStorage quiz attempts', () => {
  it('adds first quiz attempt and creates subject progress', () => {
    const storage = makeStorage();
    const attempt: QuizAttempt = {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      answers: { q1: 0, q2: true },
      score: 80,
      timeSpentSeconds: 120,
    };

    storage.addQuizAttempt('cs101', 'quiz1', attempt);

    const subjectProgress = storage.getSubjectProgress('cs101');
    expect(subjectProgress).toBeDefined();
    expect(subjectProgress!.status).toBe('in_progress');
    expect(subjectProgress!.quizAttempts['quiz1']).toHaveLength(1);
    expect(subjectProgress!.quizAttempts['quiz1'][0].score).toBe(80);
  });

  it('adds multiple quiz attempts for the same quiz', () => {
    const storage = makeStorage();

    storage.addQuizAttempt('cs101', 'quiz1', {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      answers: {},
      score: 60,
      timeSpentSeconds: 100,
    });

    vi.advanceTimersByTime(60000); // Advance 1 minute

    storage.addQuizAttempt('cs101', 'quiz1', {
      attemptId: 'a2',
      timestamp: new Date().toISOString(),
      answers: {},
      score: 85,
      timeSpentSeconds: 120,
    });

    const attempts = storage.getQuizAttempts('cs101', 'quiz1');
    expect(attempts).toHaveLength(2);
    expect(attempts[0].score).toBe(60);
    expect(attempts[1].score).toBe(85);
  });

  it('returns best quiz attempt correctly', () => {
    const storage = makeStorage();

    storage.addQuizAttempt('cs101', 'quiz1', {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      answers: {},
      score: 70,
      timeSpentSeconds: 100,
    });

    storage.addQuizAttempt('cs101', 'quiz1', {
      attemptId: 'a2',
      timestamp: now.toISOString(),
      answers: {},
      score: 90,
      timeSpentSeconds: 120,
    });

    storage.addQuizAttempt('cs101', 'quiz1', {
      attemptId: 'a3',
      timestamp: now.toISOString(),
      answers: {},
      score: 75,
      timeSpentSeconds: 90,
    });

    const best = storage.getBestQuizAttempt('cs101', 'quiz1');
    expect(best).toBeDefined();
    expect(best!.score).toBe(90);
    expect(best!.attemptId).toBe('a2');
  });

  it('returns undefined for best attempt when no attempts exist', () => {
    const storage = makeStorage();
    expect(storage.getBestQuizAttempt('cs101', 'quiz1')).toBeUndefined();
  });

  it('returns empty array for quiz attempts when subject has no progress', () => {
    const storage = makeStorage();
    expect(storage.getQuizAttempts('cs101', 'quiz1')).toEqual([]);
  });

  it('adds quiz to review queue when score is below passing threshold (70%)', () => {
    const storage = makeStorage();

    storage.addQuizAttempt('cs101', 'quiz1', {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      answers: {},
      score: 65, // Below QUIZ_PASSING_SCORE (70)
      timeSpentSeconds: 100,
    });

    const reviewQueue = storage.getReviewQueue();
    expect(reviewQueue).toHaveLength(1);
    expect(reviewQueue[0].itemId).toBe('quiz1');
    expect(reviewQueue[0].itemType).toBe('quiz');
    expect(reviewQueue[0].subjectId).toBe('cs101');
  });

  it('does not add quiz to review queue when score is at or above passing threshold (70%)', () => {
    const storage = makeStorage();

    storage.addQuizAttempt('cs101', 'quiz1', {
      attemptId: 'a1',
      timestamp: now.toISOString(),
      answers: {},
      score: 70, // At QUIZ_PASSING_SCORE
      timeSpentSeconds: 100,
    });

    const reviewQueue = storage.getReviewQueue();
    expect(reviewQueue).toHaveLength(0);
  });
});

describe('ProgressStorage exam attempts', () => {
  it('adds exam attempt and creates subject progress', () => {
    const storage = makeStorage();
    const attempt: ExamAttempt = {
      attemptId: 'e1',
      timestamp: now.toISOString(),
      answers: { q1: 0, q2: 'answer' },
      score: 72,
      timeSpentSeconds: 3600,
    };

    storage.addExamAttempt('cs101', 'exam1', attempt);

    const subjectProgress = storage.getSubjectProgress('cs101');
    expect(subjectProgress).toBeDefined();
    expect(subjectProgress!.status).toBe('in_progress');
    expect(subjectProgress!.examAttempts['exam1']).toHaveLength(1);
    expect(subjectProgress!.examAttempts['exam1'][0].score).toBe(72);
  });

  it('returns best exam attempt correctly', () => {
    const storage = makeStorage();

    storage.addExamAttempt('cs101', 'exam1', {
      attemptId: 'e1',
      timestamp: now.toISOString(),
      answers: {},
      score: 65,
      timeSpentSeconds: 3600,
    });

    storage.addExamAttempt('cs101', 'exam1', {
      attemptId: 'e2',
      timestamp: now.toISOString(),
      answers: {},
      score: 78,
      timeSpentSeconds: 3600,
    });

    const best = storage.getBestExamAttempt('cs101', 'exam1');
    expect(best).toBeDefined();
    expect(best!.score).toBe(78);
  });

  it('updates AI grade for exam question', () => {
    const storage = makeStorage();

    storage.addExamAttempt('cs101', 'exam1', {
      attemptId: 'e1',
      timestamp: now.toISOString(),
      answers: { q1: 'written answer' },
      score: 70,
      timeSpentSeconds: 3600,
    });

    storage.updateExamAiGrade('cs101', 'exam1', 'q1', {
      score: 85,
      passed: true,
    });

    const attempts = storage.getExamAttempts('cs101', 'exam1');
    expect(attempts[0].aiGrades).toBeDefined();
    expect(attempts[0].aiGrades!['q1'].score).toBe(85);
    expect(attempts[0].aiGrades!['q1'].passed).toBe(true);
  });

  it('does not crash when updating AI grade for non-existent exam', () => {
    const storage = makeStorage();

    // This should not throw
    expect(() => {
      storage.updateExamAiGrade('cs101', 'exam1', 'q1', {
        score: 85,
        passed: true,
      });
    }).not.toThrow();
  });
});

describe('ProgressStorage exercise completions', () => {
  it('adds first exercise completion', () => {
    const storage = makeStorage();
    const completion: ExerciseCompletion = {
      completionId: 'c1',
      timestamp: now.toISOString(),
      code: 'def solve(): pass',
      passed: true,
      passedTestCases: 5,
      totalTestCases: 5,
      timeSpentSeconds: 300,
    };

    storage.addExerciseCompletion('cs101', 'ex1', completion);

    const result = storage.getExerciseCompletion('cs101', 'ex1');
    expect(result).toBeDefined();
    expect(result!.passed).toBe(true);
    expect(result!.passedTestCases).toBe(5);
  });

  it('replaces failed completion with passing one', () => {
    const storage = makeStorage();

    // First attempt: failed
    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c1',
      timestamp: now.toISOString(),
      code: 'def solve(): return None',
      passed: false,
      passedTestCases: 2,
      totalTestCases: 5,
      timeSpentSeconds: 100,
    });

    // Second attempt: passed
    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c2',
      timestamp: now.toISOString(),
      code: 'def solve(): return 42',
      passed: true,
      passedTestCases: 5,
      totalTestCases: 5,
      timeSpentSeconds: 200,
    });

    const result = storage.getExerciseCompletion('cs101', 'ex1');
    expect(result!.passed).toBe(true);
    expect(result!.passedTestCases).toBe(5);
    // Time should accumulate
    expect(result!.timeSpentSeconds).toBe(300);
  });

  it('keeps passing completion when new attempt fails', () => {
    const storage = makeStorage();

    // First attempt: passed
    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c1',
      timestamp: now.toISOString(),
      code: 'def solve(): return 42',
      passed: true,
      passedTestCases: 5,
      totalTestCases: 5,
      timeSpentSeconds: 200,
    });

    // Second attempt: failed (should not replace)
    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c2',
      timestamp: now.toISOString(),
      code: 'def solve(): return None',
      passed: false,
      passedTestCases: 1,
      totalTestCases: 5,
      timeSpentSeconds: 100,
    });

    const result = storage.getExerciseCompletion('cs101', 'ex1');
    expect(result!.passed).toBe(true);
    expect(result!.passedTestCases).toBe(5);
  });

  it('updates with better passing attempt (more test cases)', () => {
    const storage = makeStorage();

    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c1',
      timestamp: now.toISOString(),
      code: 'v1',
      passed: true,
      passedTestCases: 3,
      totalTestCases: 5,
      timeSpentSeconds: 100,
    });

    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c2',
      timestamp: now.toISOString(),
      code: 'v2',
      passed: true,
      passedTestCases: 5,
      totalTestCases: 5,
      timeSpentSeconds: 150,
    });

    const result = storage.getExerciseCompletion('cs101', 'ex1');
    expect(result!.passedTestCases).toBe(5);
    expect(result!.code).toBe('v2');
  });

  it('adds failed exercise to review queue', () => {
    const storage = makeStorage();

    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c1',
      timestamp: now.toISOString(),
      code: 'failed code',
      passed: false,
      passedTestCases: 0,
      totalTestCases: 5,
      timeSpentSeconds: 100,
    });

    const reviewQueue = storage.getReviewQueue();
    expect(reviewQueue).toHaveLength(1);
    expect(reviewQueue[0].itemId).toBe('ex1');
    expect(reviewQueue[0].itemType).toBe('exercise');
  });

  it('checks if exercise is passed', () => {
    const storage = makeStorage();

    expect(storage.isExercisePassed('cs101', 'ex1')).toBe(false);

    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c1',
      timestamp: now.toISOString(),
      code: 'code',
      passed: true,
      timeSpentSeconds: 100,
    });

    expect(storage.isExercisePassed('cs101', 'ex1')).toBe(true);
  });

  it('handles written exercise completions', () => {
    const storage = makeStorage();

    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c1',
      timestamp: now.toISOString(),
      code: 'Proof: By induction...',
      passed: true,
      type: 'written',
      timeSpentSeconds: 600,
    });

    const result = storage.getExerciseCompletion('cs101', 'ex1');
    expect(result!.type).toBe('written');
    expect(result!.passed).toBe(true);
  });

  it('merges AI evaluations across submissions', () => {
    const storage = makeStorage();

    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c1',
      timestamp: now.toISOString(),
      code: 'first',
      passed: false,
      timeSpentSeconds: 100,
      aiEvaluations: [{ score: 60, passed: false, timestamp: now.toISOString() }],
    });

    storage.addExerciseCompletion('cs101', 'ex1', {
      completionId: 'c2',
      timestamp: now.toISOString(),
      code: 'second',
      passed: true,
      timeSpentSeconds: 150,
      aiEvaluations: [{ score: 85, passed: true, timestamp: now.toISOString() }],
    });

    const result = storage.getExerciseCompletion('cs101', 'ex1');
    expect(result!.aiEvaluations).toHaveLength(2);
    expect(result!.aiEvaluations![0].score).toBe(60);
    expect(result!.aiEvaluations![1].score).toBe(85);
  });
});

describe('ProgressStorage project submissions', () => {
  it('adds project submission', () => {
    const storage = makeStorage();
    const submission: ProjectSubmission = {
      submissionId: 'p1',
      timestamp: now.toISOString(),
      description: 'My project submission',
      repositoryUrl: 'https://github.com/user/project',
      demoUrl: 'https://project.demo.com',
      selfAssessment: { quality: 8, completeness: 9 },
      notes: 'Proud of this work',
    };

    storage.addProjectSubmission('cs101', 'proj1', submission);

    const submissions = storage.getProjectSubmissions('cs101', 'proj1');
    expect(submissions).toHaveLength(1);
    expect(submissions[0].description).toBe('My project submission');
    expect(submissions[0].repositoryUrl).toBe('https://github.com/user/project');
  });

  it('allows multiple project submissions', () => {
    const storage = makeStorage();

    storage.addProjectSubmission('cs101', 'proj1', {
      submissionId: 'p1',
      timestamp: now.toISOString(),
      description: 'First attempt',
      selfAssessment: {},
      notes: '',
    });

    storage.addProjectSubmission('cs101', 'proj1', {
      submissionId: 'p2',
      timestamp: now.toISOString(),
      description: 'Revised submission',
      selfAssessment: {},
      notes: 'Fixed bugs',
    });

    const submissions = storage.getProjectSubmissions('cs101', 'proj1');
    expect(submissions).toHaveLength(2);
    expect(submissions[0].description).toBe('First attempt');
    expect(submissions[1].description).toBe('Revised submission');
  });

  it('returns empty array for non-existent project', () => {
    const storage = makeStorage();
    expect(storage.getProjectSubmissions('cs101', 'proj1')).toEqual([]);
  });
});

describe('ProgressStorage subtopic views', () => {
  it('records first subtopic view', () => {
    const storage = makeStorage();

    storage.recordSubtopicView('cs101', 'topic1-sub1');

    const view = storage.getSubtopicView('cs101', 'topic1-sub1');
    expect(view).toBeDefined();
    expect(view!.viewCount).toBe(1);
    expect(view!.firstViewedAt).toBe(now.toISOString());
    expect(view!.lastViewedAt).toBe(now.toISOString());
  });

  it('increments view count on subsequent views', () => {
    const storage = makeStorage();

    storage.recordSubtopicView('cs101', 'topic1-sub1');

    vi.advanceTimersByTime(3600000); // 1 hour later

    storage.recordSubtopicView('cs101', 'topic1-sub1');

    const view = storage.getSubtopicView('cs101', 'topic1-sub1');
    expect(view!.viewCount).toBe(2);
    expect(view!.firstViewedAt).toBe(now.toISOString());
    expect(view!.lastViewedAt).toBe(new Date(now.getTime() + 3600000).toISOString());
  });

  it('creates subject progress when recording subtopic view', () => {
    const storage = makeStorage();

    storage.recordSubtopicView('cs101', 'topic1-sub1');

    const subjectProgress = storage.getSubjectProgress('cs101');
    expect(subjectProgress).toBeDefined();
    expect(subjectProgress!.status).toBe('in_progress');
  });

  it('checks if all subtopics are viewed', () => {
    const storage = makeStorage();

    storage.recordSubtopicView('cs101', 'sub1');
    storage.recordSubtopicView('cs101', 'sub2');

    expect(storage.areAllSubtopicsViewed('cs101', ['sub1', 'sub2'])).toBe(true);
    expect(storage.areAllSubtopicsViewed('cs101', ['sub1', 'sub2', 'sub3'])).toBe(false);
  });

  it('returns false when no subtopic views exist', () => {
    const storage = makeStorage();
    expect(storage.areAllSubtopicsViewed('cs101', ['sub1', 'sub2'])).toBe(false);
  });

  it('finds most recently viewed subtopic', () => {
    const storage = makeStorage();

    storage.recordSubtopicView('cs101', 'sub1');

    vi.advanceTimersByTime(60000);
    storage.recordSubtopicView('cs101', 'sub2');

    vi.advanceTimersByTime(60000);
    storage.recordSubtopicView('cs101', 'sub3');

    const lastViewed = storage.getLastViewedSubtopicForSubject('cs101');
    expect(lastViewed).not.toBeNull();
    expect(lastViewed!.subtopicId).toBe('sub3');
  });

  it('returns null when no subtopics viewed', () => {
    const storage = makeStorage();
    expect(storage.getLastViewedSubtopicForSubject('cs101')).toBeNull();
  });
});

describe('ProgressStorage settings', () => {
  it('updates individual settings', () => {
    const storage = makeStorage();

    storage.updateSettings({ theme: 'dark' });
    expect(storage.getSettings().theme).toBe('dark');
    expect(storage.getSettings().codeEditorFontSize).toBe(14); // unchanged

    storage.updateSettings({ codeEditorFontSize: 18 });
    expect(storage.getSettings().codeEditorFontSize).toBe(18);
    expect(storage.getSettings().theme).toBe('dark'); // still dark
  });

  it('updates multiple settings at once', () => {
    const storage = makeStorage();

    storage.updateSettings({
      theme: 'light',
      codeEditorFontSize: 12,
      showCompletedItems: false,
    });

    const settings = storage.getSettings();
    expect(settings.theme).toBe('light');
    expect(settings.codeEditorFontSize).toBe(12);
    expect(settings.showCompletedItems).toBe(false);
  });

  it('preserves sensitive settings separately', () => {
    const storage = makeStorage();

    storage.updateSettings({
      githubToken: 'secret-token',
      gistId: 'gist-id-123',
      geminiApiKey: 'gemini-key',
    });

    const settings = storage.getSettings();
    expect(settings.githubToken).toBe('secret-token');
    expect(settings.gistId).toBe('gist-id-123');
    expect(settings.geminiApiKey).toBe('gemini-key');
  });

  it('stores study plan settings', () => {
    const storage = makeStorage();

    storage.updateSettings({
      studyPlan: {
        startDate: '2024-02-01',
        pace: 'accelerated',
        subjectOverrides: {
          cs101: { customDurationWeeks: 3 },
        },
      },
    });

    const settings = storage.getSettings();
    expect(settings.studyPlan).toBeDefined();
    expect(settings.studyPlan!.pace).toBe('accelerated');
    expect(settings.studyPlan!.subjectOverrides?.cs101.customDurationWeeks).toBe(3);
  });
});

describe('ProgressStorage subject progress management', () => {
  it('updates subject progress merging with existing', () => {
    const storage = makeStorage();

    storage.updateSubjectProgress('cs101', {
      status: 'in_progress',
      startedAt: now.toISOString(),
    });

    storage.updateSubjectProgress('cs101', {
      completedAt: now.toISOString(),
      status: 'completed',
    });

    const progress = storage.getSubjectProgress('cs101');
    expect(progress!.status).toBe('completed');
    expect(progress!.startedAt).toBe(now.toISOString());
    expect(progress!.completedAt).toBe(now.toISOString());
  });

  it('clears specific subject progress', () => {
    const storage = makeStorage();

    storage.updateSubjectProgress('cs101', { status: 'in_progress' });
    storage.updateSubjectProgress('cs102', { status: 'completed' });

    storage.clearSubjectProgress('cs101');

    expect(storage.getSubjectProgress('cs101')).toBeUndefined();
    expect(storage.getSubjectProgress('cs102')).toBeDefined();
  });

  it('returns undefined for non-existent subject', () => {
    const storage = makeStorage();
    expect(storage.getSubjectProgress('nonexistent')).toBeUndefined();
  });
});

describe('ProgressStorage export and import', () => {
  it('exports progress as formatted JSON', () => {
    const storage = makeStorage();
    storage.updateSubjectProgress('cs101', { status: 'in_progress' });

    const exported = storage.exportProgress();
    const parsed = JSON.parse(exported);

    expect(parsed.version).toBe(4);
    expect(parsed.subjects.cs101.status).toBe('in_progress');
  });

  it('imports valid progress data', () => {
    const storage = makeStorage();

    const importData = {
      version: 4,
      startedAt: '2023-01-01T00:00:00.000Z',
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
      selectedSubjectIds: ['cs101', 'cs102'],
    };

    const result = storage.importProgress(JSON.stringify(importData));

    expect(result).toBe(true);
    expect(storage.getSubjectProgress('cs101')?.status).toBe('completed');
    expect(storage.getSettings().theme).toBe('dark');
    expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs102']);
  });

  it('migrates old version during import', () => {
    const storage = makeStorage();

    const oldData = {
      version: 2,
      startedAt: '2023-01-01T00:00:00.000Z',
      subjects: {},
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
    };

    const result = storage.importProgress(JSON.stringify(oldData));

    expect(result).toBe(true);
    expect(storage.getProgress().version).toBe(4);
    expect(storage.getProgress().reviewQueue).toEqual([]);
    expect(storage.getProgress().selectedSubjectIds).toBeDefined();
  });
});

describe('ProgressStorage spaced repetition intervals', () => {
  it('progresses through interval tiers on consecutive passes', () => {
    const storage = makeStorage();

    // Add to queue
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    // First pass: 1 -> 3 days
    storage.updateReviewItem('q1', 'quiz', true);
    let item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item!.interval).toBe(3);
    expect(item!.streak).toBe(1);

    // Second pass: 3 -> 7 days
    storage.updateReviewItem('q1', 'quiz', true);
    item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item!.interval).toBe(7);
    expect(item!.streak).toBe(2);

    // Third pass: 7 -> 14 days
    storage.updateReviewItem('q1', 'quiz', true);
    item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item!.interval).toBe(14);
    expect(item!.streak).toBe(3);

    // Fourth pass: 14 -> 30 days
    storage.updateReviewItem('q1', 'quiz', true);
    item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item!.interval).toBe(30);
    expect(item!.streak).toBe(4);

    // Fifth pass: stays at 30 days
    storage.updateReviewItem('q1', 'quiz', true);
    item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item!.interval).toBe(30);
    expect(item!.streak).toBe(5);
  });

  it('resets streak on failure', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    // Build up streak
    storage.updateReviewItem('q1', 'quiz', true);
    storage.updateReviewItem('q1', 'quiz', true);

    let item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item!.streak).toBe(2);
    expect(item!.interval).toBe(7);

    // Fail - resets to 1 day, streak 0
    storage.updateReviewItem('q1', 'quiz', false);

    item = storage.getReviewQueue().find(i => i.itemId === 'q1');
    expect(item!.streak).toBe(0);
    expect(item!.interval).toBe(1);
  });
});

describe('ProgressStorage lastUpdated tracking', () => {
  it('updates lastUpdated on save', () => {
    const storage = makeStorage();

    storage.updateSubjectProgress('cs101', { status: 'in_progress' });

    const progress = storage.getProgress();
    expect(progress.lastUpdated).toBe(now.toISOString());
  });

  it('updates lastUpdated on settings change', () => {
    const storage = makeStorage();

    vi.advanceTimersByTime(1000);
    storage.updateSettings({ theme: 'dark' });

    const progress = storage.getProgress();
    expect(new Date(progress.lastUpdated!).getTime()).toBe(now.getTime() + 1000);
  });
});
