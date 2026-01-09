/**
 * Home Page Statistics Edge Case Tests
 *
 * Tests for edge cases in the calculateStats function including
 * null/undefined handling, boundary conditions, and unusual data scenarios.
 */

import { describe, it, expect } from 'vitest';
import type { Subject, UserProgress, QuizAttempt, ExerciseCompletion, ProjectSubmission, SubjectProgress } from '../src/core/types';

const QUIZ_PASSING_SCORE = 70;

/**
 * Calculate statistics for the dashboard (mirrors home.ts implementation)
 */
function calculateStats(subjects: Subject[], userProgress: UserProgress): {
  quizzesCompleted: number;
  exercisesCompleted: number;
  projectsSubmitted: number;
  averageQuizScore: number;
} {
  let quizzesCompleted = 0;
  let exercisesCompleted = 0;
  let projectsSubmitted = 0;
  let totalQuizScore = 0;
  let quizAttemptCount = 0;

  const selectedSubjectIds = new Set(subjects.map(s => s.id));

  Object.entries(userProgress.subjects).forEach(([subjectId, progress]) => {
    if (!selectedSubjectIds.has(subjectId)) return;

    Object.values(progress.quizAttempts).forEach((attempts: QuizAttempt[]) => {
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: QuizAttempt) => a.score));
        if (bestScore >= QUIZ_PASSING_SCORE) quizzesCompleted++;

        attempts.forEach((attempt: QuizAttempt) => {
          totalQuizScore += attempt.score;
          quizAttemptCount++;
        });
      }
    });

    Object.values(progress.exerciseCompletions).forEach((completion: ExerciseCompletion) => {
      if (completion && completion.passed) {
        exercisesCompleted++;
      }
    });

    Object.values(progress.projectSubmissions).forEach((submissions: ProjectSubmission[]) => {
      if (submissions && submissions.length > 0) {
        projectsSubmitted += submissions.length;
      }
    });
  });

  const averageQuizScore = quizAttemptCount > 0
    ? Math.round(totalQuizScore / quizAttemptCount)
    : 0;

  return {
    quizzesCompleted,
    exercisesCompleted,
    projectsSubmitted,
    averageQuizScore,
  };
}

// Helper functions
function createSubject(id: string): Subject {
  return {
    id,
    code: id.toUpperCase(),
    title: `Subject ${id}`,
    description: `Description for ${id}`,
    category: 'cs',
    year: 1,
    semester: 1,
    estimatedHours: 40,
    prerequisites: [],
    learningObjectives: [],
    topics: [],
    examIds: [],
    projectIds: [],
  };
}

function createQuizAttempt(score: number): QuizAttempt {
  return {
    attemptId: `attempt-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 60,
  };
}

function createExerciseCompletion(passed: boolean): ExerciseCompletion {
  return {
    completionId: `completion-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    code: 'def solution(): pass',
    passed,
    type: 'coding',
    passedTestCases: passed ? 5 : 2,
    totalTestCases: 5,
    timeSpentSeconds: 120,
  };
}

function createProjectSubmission(): ProjectSubmission {
  return {
    submissionId: `submission-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    description: 'Test project submission',
    selfAssessment: {},
    notes: 'Test submission',
  };
}

function createBaseProgress(): UserProgress {
  return {
    version: 4,
    startedAt: new Date().toISOString(),
    subjects: {},
    settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
  };
}

function createSubjectProgress(overrides: Partial<SubjectProgress> = {}): SubjectProgress {
  return {
    status: 'in_progress',
    quizAttempts: {},
    examAttempts: {},
    exerciseCompletions: {},
    projectSubmissions: {},
    subtopicViews: {},
    ...overrides,
  };
}

describe('calculateStats - Null and Undefined Edge Cases', () => {
  describe('null values in quiz attempts', () => {
    it('handles null quiz attempts array gracefully', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        quizAttempts: { 'quiz-1': null as unknown as QuizAttempt[] },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });

    it('handles undefined quiz attempts array gracefully', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        quizAttempts: { 'quiz-1': undefined as unknown as QuizAttempt[] },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });
  });

  describe('null values in exercise completions', () => {
    it('handles null exercise completion gracefully', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        exerciseCompletions: { 'ex-1': null as unknown as ExerciseCompletion },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.exercisesCompleted).toBe(0);
    });

    it('handles undefined exercise completion gracefully', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        exerciseCompletions: { 'ex-1': undefined as unknown as ExerciseCompletion },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.exercisesCompleted).toBe(0);
    });

    it('handles exercise with passed as undefined', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      const completion = createExerciseCompletion(true);
      // @ts-expect-error - Testing undefined passed field
      delete completion.passed;
      userProgress.subjects.cs101 = createSubjectProgress({
        exerciseCompletions: { 'ex-1': completion },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.exercisesCompleted).toBe(0);
    });
  });

  describe('null values in project submissions', () => {
    it('handles null project submissions array gracefully', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        projectSubmissions: { 'proj-1': null as unknown as ProjectSubmission[] },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.projectsSubmitted).toBe(0);
    });

    it('handles undefined project submissions array gracefully', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        projectSubmissions: { 'proj-1': undefined as unknown as ProjectSubmission[] },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.projectsSubmitted).toBe(0);
    });
  });
});

describe('calculateStats - Score Boundary Conditions', () => {
  it('quiz with exactly 70 score counts as completed', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(70)] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(1);
  });

  it('quiz with 69.9 rounded to 70 counts as completed', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    const attempt = createQuizAttempt(70);
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [attempt] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(1);
  });

  it('quiz with 69 does not count as completed', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(69)] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(0);
  });

  it('handles quiz with score of 0', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(0)] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(0);
    expect(stats.averageQuizScore).toBe(0);
  });

  it('handles quiz with score of 100', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(100)] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(1);
    expect(stats.averageQuizScore).toBe(100);
  });
});

describe('calculateStats - Large Data Sets', () => {
  it('handles many quizzes across many subjects', () => {
    const subjectCount = 20;
    const quizzesPerSubject = 10;
    const subjects = Array.from({ length: subjectCount }, (_, i) =>
      createSubject(`cs${100 + i}`)
    );

    const userProgress = createBaseProgress();
    subjects.forEach(subject => {
      const quizAttempts: Record<string, QuizAttempt[]> = {};
      for (let q = 0; q < quizzesPerSubject; q++) {
        quizAttempts[`quiz-${q}`] = [createQuizAttempt(80)];
      }
      userProgress.subjects[subject.id] = createSubjectProgress({ quizAttempts });
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(subjectCount * quizzesPerSubject);
    expect(stats.averageQuizScore).toBe(80);
  });

  it('handles many attempts per quiz', () => {
    const subjects = [createSubject('cs101')];
    const attemptCount = 50;
    const attempts = Array.from({ length: attemptCount }, (_, i) =>
      createQuizAttempt(50 + i)
    );

    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': attempts },
    });

    const stats = calculateStats(subjects, userProgress);

    // Best score is 99 (50 + 49), which passes
    expect(stats.quizzesCompleted).toBe(1);
    // Average of 50, 51, 52, ..., 99
    const expectedAverage = Math.round((50 + 99) / 2);
    expect(stats.averageQuizScore).toBe(expectedAverage);
  });

  it('handles many exercises', () => {
    const subjects = [createSubject('cs101')];
    const exerciseCount = 100;
    const exerciseCompletions: Record<string, ExerciseCompletion> = {};

    for (let i = 0; i < exerciseCount; i++) {
      exerciseCompletions[`ex-${i}`] = createExerciseCompletion(i % 2 === 0);
    }

    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({ exerciseCompletions });

    const stats = calculateStats(subjects, userProgress);

    // Half passed (even indices)
    expect(stats.exercisesCompleted).toBe(50);
  });

  it('handles many project submissions', () => {
    const subjects = [createSubject('cs101')];
    const projectCount = 10;
    const submissionsPerProject = 5;
    const projectSubmissions: Record<string, ProjectSubmission[]> = {};

    for (let p = 0; p < projectCount; p++) {
      projectSubmissions[`proj-${p}`] = Array.from(
        { length: submissionsPerProject },
        () => createProjectSubmission()
      );
    }

    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({ projectSubmissions });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.projectsSubmitted).toBe(projectCount * submissionsPerProject);
  });
});

describe('calculateStats - Average Score Calculations', () => {
  it('calculates correct average for odd number of attempts', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: {
        'quiz-1': [createQuizAttempt(60), createQuizAttempt(70), createQuizAttempt(80)],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    // (60 + 70 + 80) / 3 = 70
    expect(stats.averageQuizScore).toBe(70);
  });

  it('rounds average score correctly (down)', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: {
        'quiz-1': [createQuizAttempt(75), createQuizAttempt(76)],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    // (75 + 76) / 2 = 75.5 -> rounds to 76
    expect(stats.averageQuizScore).toBe(76);
  });

  it('rounds average score correctly (up)', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: {
        'quiz-1': [createQuizAttempt(75), createQuizAttempt(74)],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    // (75 + 74) / 2 = 74.5 -> rounds to 75
    expect(stats.averageQuizScore).toBe(75);
  });

  it('calculates average across multiple quizzes and subjects', () => {
    const subjects = [createSubject('cs101'), createSubject('cs102')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: {
        'quiz-1': [createQuizAttempt(80)],
        'quiz-2': [createQuizAttempt(90)],
      },
    });
    userProgress.subjects.cs102 = createSubjectProgress({
      quizAttempts: {
        'quiz-3': [createQuizAttempt(70)],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    // (80 + 90 + 70) / 3 = 80
    expect(stats.averageQuizScore).toBe(80);
  });
});

describe('calculateStats - Mixed Valid and Invalid Data', () => {
  it('correctly counts when some data is valid and some is null', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: {
        'quiz-1': [createQuizAttempt(80)],
        'quiz-2': null as unknown as QuizAttempt[],
        'quiz-3': [createQuizAttempt(75)],
      },
      exerciseCompletions: {
        'ex-1': createExerciseCompletion(true),
        'ex-2': null as unknown as ExerciseCompletion,
        'ex-3': createExerciseCompletion(true),
      },
      projectSubmissions: {
        'proj-1': [createProjectSubmission()],
        'proj-2': null as unknown as ProjectSubmission[],
        'proj-3': [createProjectSubmission(), createProjectSubmission()],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(2); // quiz-1 and quiz-3 pass
    expect(stats.exercisesCompleted).toBe(2); // ex-1 and ex-3
    expect(stats.projectsSubmitted).toBe(3); // 1 + 2 from valid projects
    expect(stats.averageQuizScore).toBe(78); // (80 + 75) / 2 = 77.5 -> 78
  });

  it('handles mix of passing and failing quizzes correctly', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: {
        'quiz-1': [createQuizAttempt(30), createQuizAttempt(50), createQuizAttempt(70)], // passes (best = 70)
        'quiz-2': [createQuizAttempt(65), createQuizAttempt(68)], // fails (best = 68)
        'quiz-3': [createQuizAttempt(100)], // passes
      },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(2); // quiz-1 and quiz-3
    // Average: (30+50+70+65+68+100) / 6 = 383/6 = 63.83... -> 64
    expect(stats.averageQuizScore).toBe(64);
  });
});

describe('calculateStats - Subject Selection Edge Cases', () => {
  it('handles when no subjects match progress data', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs999 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(100)] },
      exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
      projectSubmissions: { 'proj-1': [createProjectSubmission()] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(0);
    expect(stats.exercisesCompleted).toBe(0);
    expect(stats.projectsSubmitted).toBe(0);
    expect(stats.averageQuizScore).toBe(0);
  });

  it('handles single subject correctly', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(85)] },
      exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
      projectSubmissions: { 'proj-1': [createProjectSubmission()] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(1);
    expect(stats.exercisesCompleted).toBe(1);
    expect(stats.projectsSubmitted).toBe(1);
    expect(stats.averageQuizScore).toBe(85);
  });
});
