/**
 * Home Page calculateStats Function Tests
 *
 * Tests for the calculateStats function used on the dashboard
 * to display user statistics. These tests verify correct counting
 * of quizzes, exercises, projects, and average score calculation.
 */

import { describe, it, expect } from 'vitest';
import type {
  Subject,
  UserProgress,
  QuizAttempt,
  ExerciseCompletion,
  ProjectSubmission,
  SubjectProgress,
} from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

/**
 * Calculate statistics for the dashboard
 * (Implementation matching src/pages/home.ts)
 */
function calculateStats(
  subjects: Subject[],
  userProgress: UserProgress
): {
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

  const selectedSubjectIds = new Set(subjects.map((s) => s.id));

  Object.entries(userProgress.subjects).forEach(([subjectId, progress]) => {
    if (!selectedSubjectIds.has(subjectId)) return;

    Object.values(progress.quizAttempts || {}).forEach(
      (attempts: QuizAttempt[]) => {
        if (attempts && attempts.length > 0) {
          const bestScore = Math.max(...attempts.map((a: QuizAttempt) => a.score));
          if (bestScore >= QUIZ_PASSING_SCORE) quizzesCompleted++;

          attempts.forEach((attempt: QuizAttempt) => {
            totalQuizScore += attempt.score;
            quizAttemptCount++;
          });
        }
      }
    );

    Object.values(progress.exerciseCompletions || {}).forEach(
      (completion: ExerciseCompletion) => {
        if (completion && completion.passed) {
          exercisesCompleted++;
        }
      }
    );

    Object.values(progress.projectSubmissions || {}).forEach(
      (submissions: ProjectSubmission[]) => {
        if (submissions && submissions.length > 0) {
          projectsSubmitted += submissions.length;
        }
      }
    );
  });

  const averageQuizScore =
    quizAttemptCount > 0 ? Math.round(totalQuizScore / quizAttemptCount) : 0;

  return {
    quizzesCompleted,
    exercisesCompleted,
    projectsSubmitted,
    averageQuizScore,
  };
}

// =============================================================================
// Helper Functions
// =============================================================================

function createSubject(id: string, overrides: Partial<Subject> = {}): Subject {
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
    ...overrides,
  };
}

function createQuizAttempt(
  score: number,
  overrides: Partial<QuizAttempt> = {}
): QuizAttempt {
  return {
    attemptId: `attempt-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 60,
    ...overrides,
  };
}

function createExerciseCompletion(
  passed: boolean,
  overrides: Partial<ExerciseCompletion> = {}
): ExerciseCompletion {
  return {
    completionId: `completion-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    code: 'def solution(): pass',
    passed,
    type: 'coding',
    passedTestCases: passed ? 5 : 2,
    totalTestCases: 5,
    timeSpentSeconds: 120,
    ...overrides,
  };
}

function createProjectSubmission(
  overrides: Partial<ProjectSubmission> = {}
): ProjectSubmission {
  return {
    submissionId: `submission-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    description: 'Test project submission',
    selfAssessment: {},
    notes: 'Test submission',
    ...overrides,
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

function createSubjectProgress(
  overrides: Partial<SubjectProgress> = {}
): SubjectProgress {
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

// =============================================================================
// Test Suites
// =============================================================================

describe('calculateStats - Quiz Counting', () => {
  describe('single quiz scenarios', () => {
    it('counts quiz as completed when best score meets passing threshold', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        quizAttempts: { 'quiz-1': [createQuizAttempt(70)] },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(1);
      expect(stats.averageQuizScore).toBe(70);
    });

    it('does not count quiz as completed when best score below threshold', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        quizAttempts: { 'quiz-1': [createQuizAttempt(69)] },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.averageQuizScore).toBe(69);
    });

    it('counts quiz with exactly passing score', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        quizAttempts: { 'quiz-1': [createQuizAttempt(QUIZ_PASSING_SCORE)] },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(1);
    });
  });

  describe('multiple attempts per quiz', () => {
    it('uses best score to determine if quiz is completed', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [
            createQuizAttempt(50),
            createQuizAttempt(60),
            createQuizAttempt(80),
          ],
        },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(1);
      // Average of all attempts: (50+60+80)/3 = 63.33... rounds to 63
      expect(stats.averageQuizScore).toBe(63);
    });

    it('includes all attempts in average calculation', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(70), createQuizAttempt(80)],
        },
      });

      const stats = calculateStats(subjects, userProgress);

      // (70+80)/2 = 75
      expect(stats.averageQuizScore).toBe(75);
    });
  });

  describe('multiple quizzes', () => {
    it('counts each passing quiz separately', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)],
          'quiz-2': [createQuizAttempt(75)],
          'quiz-3': [createQuizAttempt(90)],
        },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(3);
      // (80+75+90)/3 = 81.66... rounds to 82
      expect(stats.averageQuizScore).toBe(82);
    });

    it('only counts passing quizzes in completed count', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)], // passing
          'quiz-2': [createQuizAttempt(50)], // failing
          'quiz-3': [createQuizAttempt(70)], // passing
        },
      });

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(2);
      // All scores still count toward average
      expect(stats.averageQuizScore).toBe(67); // (80+50+70)/3 = 66.66 -> 67
    });
  });
});

describe('calculateStats - Exercise Counting', () => {
  it('counts passed exercises', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      exerciseCompletions: {
        'ex-1': createExerciseCompletion(true),
        'ex-2': createExerciseCompletion(true),
      },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.exercisesCompleted).toBe(2);
  });

  it('does not count failed exercises', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      exerciseCompletions: {
        'ex-1': createExerciseCompletion(true),
        'ex-2': createExerciseCompletion(false),
        'ex-3': createExerciseCompletion(false),
      },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.exercisesCompleted).toBe(1);
  });

  it('handles mixed pass/fail exercises', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      exerciseCompletions: {
        'ex-1': createExerciseCompletion(true),
        'ex-2': createExerciseCompletion(false),
        'ex-3': createExerciseCompletion(true),
        'ex-4': createExerciseCompletion(false),
        'ex-5': createExerciseCompletion(true),
      },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.exercisesCompleted).toBe(3);
  });
});

describe('calculateStats - Project Counting', () => {
  it('counts all project submissions', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      projectSubmissions: {
        'proj-1': [createProjectSubmission()],
        'proj-2': [createProjectSubmission()],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.projectsSubmitted).toBe(2);
  });

  it('counts multiple submissions per project', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      projectSubmissions: {
        'proj-1': [
          createProjectSubmission(),
          createProjectSubmission(),
          createProjectSubmission(),
        ],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.projectsSubmitted).toBe(3);
  });

  it('handles projects with empty submission arrays', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      projectSubmissions: {
        'proj-1': [],
        'proj-2': [createProjectSubmission()],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.projectsSubmitted).toBe(1);
  });
});

describe('calculateStats - Subject Filtering', () => {
  it('only counts stats from subjects in the filtered list', () => {
    const subjects = [createSubject('cs101')]; // Only cs101 in list
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(80)] },
    });
    userProgress.subjects.cs102 = createSubjectProgress({
      // cs102 NOT in filtered list
      quizAttempts: { 'quiz-1': [createQuizAttempt(90)] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(1);
    expect(stats.averageQuizScore).toBe(80); // Only cs101 quiz counted
  });

  it('handles empty subjects list', () => {
    const subjects: Subject[] = [];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(100)] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(0);
    expect(stats.exercisesCompleted).toBe(0);
    expect(stats.projectsSubmitted).toBe(0);
    expect(stats.averageQuizScore).toBe(0);
  });

  it('counts stats from multiple subjects in filtered list', () => {
    const subjects = [createSubject('cs101'), createSubject('cs102')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(80)] },
      exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
    });
    userProgress.subjects.cs102 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(90)] },
      exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(2);
    expect(stats.exercisesCompleted).toBe(2);
    expect(stats.averageQuizScore).toBe(85); // (80+90)/2
  });
});

describe('calculateStats - Edge Cases', () => {
  it('returns zeros for empty progress', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(0);
    expect(stats.exercisesCompleted).toBe(0);
    expect(stats.projectsSubmitted).toBe(0);
    expect(stats.averageQuizScore).toBe(0);
  });

  it('handles subject with empty attempts objects', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(0);
    expect(stats.exercisesCompleted).toBe(0);
    expect(stats.projectsSubmitted).toBe(0);
    expect(stats.averageQuizScore).toBe(0);
  });

  it('correctly rounds average scores', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: {
        'quiz-1': [createQuizAttempt(33)],
        'quiz-2': [createQuizAttempt(33)],
        'quiz-3': [createQuizAttempt(34)],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    // (33+33+34)/3 = 33.33... rounds to 33
    expect(stats.averageQuizScore).toBe(33);
  });

  it('handles score of 100', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(100)] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(1);
    expect(stats.averageQuizScore).toBe(100);
  });

  it('handles score of 0', () => {
    const subjects = [createSubject('cs101')];
    const userProgress = createBaseProgress();
    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: { 'quiz-1': [createQuizAttempt(0)] },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(0);
    expect(stats.averageQuizScore).toBe(0);
  });
});

describe('calculateStats - Combined Scenarios', () => {
  it('calculates all stats correctly for realistic data', () => {
    const subjects = [createSubject('cs101'), createSubject('cs102')];
    const userProgress = createBaseProgress();

    userProgress.subjects.cs101 = createSubjectProgress({
      quizAttempts: {
        'quiz-1': [createQuizAttempt(65), createQuizAttempt(75)], // Best 75, passes
        'quiz-2': [createQuizAttempt(80)], // Passes
        'quiz-3': [createQuizAttempt(60)], // Fails
      },
      exerciseCompletions: {
        'ex-1': createExerciseCompletion(true),
        'ex-2': createExerciseCompletion(true),
        'ex-3': createExerciseCompletion(false),
      },
      projectSubmissions: {
        'proj-1': [createProjectSubmission(), createProjectSubmission()],
      },
    });

    userProgress.subjects.cs102 = createSubjectProgress({
      quizAttempts: {
        'quiz-1': [createQuizAttempt(90)], // Passes
      },
      exerciseCompletions: {
        'ex-1': createExerciseCompletion(true),
      },
      projectSubmissions: {
        'proj-1': [createProjectSubmission()],
      },
    });

    const stats = calculateStats(subjects, userProgress);

    expect(stats.quizzesCompleted).toBe(3); // quiz-1 (cs101), quiz-2 (cs101), quiz-1 (cs102)
    expect(stats.exercisesCompleted).toBe(3); // 2 from cs101, 1 from cs102
    expect(stats.projectsSubmitted).toBe(3); // 2 from cs101, 1 from cs102

    // Average: (65+75+80+60+90) / 5 = 370/5 = 74
    expect(stats.averageQuizScore).toBe(74);
  });
});
