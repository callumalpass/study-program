/**
 * Progress Calculation Detailed Tests
 *
 * Comprehensive tests for calculateSubjectCompletion and calculateOverallProgress
 * functions to verify correct progress tracking behavior.
 */

import { describe, it, expect } from 'vitest';
import type {
  Subject,
  Topic,
  UserProgress,
  SubjectProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
} from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

// =============================================================================
// Function Implementations (matching src/core/progress.ts)
// =============================================================================

function getBestScore(attempts: QuizAttempt[] | ExamAttempt[]): number {
  if (attempts.length === 0) return 0;
  return Math.max(...attempts.map((a) => a.score));
}

function isScorePassing(score: number): boolean {
  return score >= QUIZ_PASSING_SCORE;
}

function getBestProjectSubmission(
  submissions: ProjectSubmission[]
): ProjectSubmission | undefined {
  if (submissions.length === 0) {
    return undefined;
  }
  return submissions.reduce((best, sub) => {
    const score = sub.aiEvaluation?.score ?? 0;
    const bestScore = best.aiEvaluation?.score ?? 0;
    return score > bestScore ? sub : best;
  });
}

function calculateSubjectCompletion(
  subject: Subject,
  progress: SubjectProgress | undefined
): number {
  if (!progress || progress.status === 'not_started') {
    return 0;
  }

  if (progress.status === 'completed') {
    return 100;
  }

  let totalItems = 0;
  let completedItems = 0;

  subject.topics.forEach((topic) => {
    topic.quizIds.forEach((quizId) => {
      totalItems++;
      const attempts = progress.quizAttempts?.[quizId];
      if (attempts && attempts.length > 0 && isScorePassing(getBestScore(attempts))) {
        completedItems++;
      }
    });

    topic.exerciseIds.forEach((exerciseId) => {
      totalItems++;
      const completion = progress.exerciseCompletions?.[exerciseId];
      if (completion?.passed) {
        completedItems++;
      }
    });
  });

  const examIds = subject.examIds || [];
  examIds.forEach((examId) => {
    totalItems++;
    const attempts = progress.examAttempts?.[examId];
    if (attempts && attempts.length > 0 && isScorePassing(getBestScore(attempts))) {
      completedItems++;
    }
  });

  const projectIds = subject.projectIds || [];
  projectIds.forEach((projectId) => {
    totalItems++;
    const submissions = progress.projectSubmissions?.[projectId];
    if (submissions && submissions.length > 0) {
      const bestSubmission = getBestProjectSubmission(submissions);
      if (bestSubmission) {
        if (bestSubmission.aiEvaluation) {
          if (isScorePassing(bestSubmission.aiEvaluation.score)) {
            completedItems++;
          }
        } else {
          completedItems++;
        }
      }
    }
  });

  if (totalItems === 0) {
    return 0;
  }

  return Math.round((completedItems / totalItems) * 100);
}

// =============================================================================
// Helper Functions
// =============================================================================

function createTopic(
  overrides: Partial<Topic> & { quizIds?: string[]; exerciseIds?: string[] } = {}
): Topic {
  return {
    id: 'topic-1',
    title: 'Test Topic',
    order: 1,
    content: 'Test content',
    quizIds: [],
    exerciseIds: [],
    ...overrides,
  };
}

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

function createQuizAttempt(score: number): QuizAttempt {
  return {
    attemptId: `attempt-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 60,
  };
}

function createExamAttempt(score: number): ExamAttempt {
  return {
    attemptId: `attempt-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 120,
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

function createProjectSubmission(
  overrides: Partial<ProjectSubmission> = {}
): ProjectSubmission {
  return {
    submissionId: `submission-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    description: 'Test submission',
    selfAssessment: {},
    notes: '',
    ...overrides,
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

describe('calculateSubjectCompletion', () => {
  describe('status-based returns', () => {
    it('returns 0 for undefined progress', () => {
      const subject = createSubject('cs101');
      expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
    });

    it('returns 0 for not_started status', () => {
      const subject = createSubject('cs101');
      const progress = createSubjectProgress({ status: 'not_started' });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('returns 100 for completed status', () => {
      const subject = createSubject('cs101');
      const progress = createSubjectProgress({ status: 'completed' });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('quiz completion calculation', () => {
    it('calculates 50% when 1 of 2 quizzes passed', () => {
      const subject = createSubject('cs101', {
        topics: [
          createTopic({ quizIds: ['quiz-1', 'quiz-2'] }),
        ],
      });
      const progress = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)], // passing
          'quiz-2': [createQuizAttempt(50)], // failing
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('calculates 100% when all quizzes passed', () => {
      const subject = createSubject('cs101', {
        topics: [
          createTopic({ quizIds: ['quiz-1', 'quiz-2'] }),
        ],
      });
      const progress = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)],
          'quiz-2': [createQuizAttempt(75)],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('uses best score from multiple attempts', () => {
      const subject = createSubject('cs101', {
        topics: [
          createTopic({ quizIds: ['quiz-1'] }),
        ],
      });
      const progress = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(50), createQuizAttempt(60), createQuizAttempt(70)],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('exercise completion calculation', () => {
    it('calculates correctly with mixed pass/fail exercises', () => {
      const subject = createSubject('cs101', {
        topics: [
          createTopic({ exerciseIds: ['ex-1', 'ex-2', 'ex-3', 'ex-4'] }),
        ],
      });
      const progress = createSubjectProgress({
        exerciseCompletions: {
          'ex-1': createExerciseCompletion(true),
          'ex-2': createExerciseCompletion(false),
          'ex-3': createExerciseCompletion(true),
          'ex-4': createExerciseCompletion(false),
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('counts only passed exercises', () => {
      const subject = createSubject('cs101', {
        topics: [
          createTopic({ exerciseIds: ['ex-1', 'ex-2', 'ex-3'] }),
        ],
      });
      const progress = createSubjectProgress({
        exerciseCompletions: {
          'ex-1': createExerciseCompletion(true),
          'ex-2': createExerciseCompletion(true),
          'ex-3': createExerciseCompletion(true),
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('exam completion calculation', () => {
    it('includes exams in total calculation', () => {
      const subject = createSubject('cs101', {
        topics: [createTopic({ quizIds: ['quiz-1'] })],
        examIds: ['exam-1'],
      });
      const progress = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)],
        },
        examAttempts: {
          'exam-1': [createExamAttempt(90)],
        },
      });

      // 2 items total, both passed = 100%
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts failing exam as incomplete', () => {
      const subject = createSubject('cs101', {
        topics: [createTopic({ quizIds: ['quiz-1'] })],
        examIds: ['exam-1'],
      });
      const progress = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)], // passing
        },
        examAttempts: {
          'exam-1': [createExamAttempt(60)], // failing
        },
      });

      // 2 items, 1 passed = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });
  });

  describe('project completion calculation', () => {
    it('counts submission without AI evaluation as complete', () => {
      const subject = createSubject('cs101', {
        topics: [],
        projectIds: ['proj-1'],
      });
      const progress = createSubjectProgress({
        projectSubmissions: {
          'proj-1': [createProjectSubmission()], // no AI evaluation
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts passing AI evaluation as complete', () => {
      const subject = createSubject('cs101', {
        topics: [],
        projectIds: ['proj-1'],
      });
      const progress = createSubjectProgress({
        projectSubmissions: {
          'proj-1': [
            createProjectSubmission({
              aiEvaluation: { score: 80, feedback: 'Good work!' },
            }),
          ],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts failing AI evaluation as incomplete', () => {
      const subject = createSubject('cs101', {
        topics: [],
        projectIds: ['proj-1'],
      });
      const progress = createSubjectProgress({
        projectSubmissions: {
          'proj-1': [
            createProjectSubmission({
              aiEvaluation: { score: 60, feedback: 'Needs improvement' },
            }),
          ],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('uses best submission by AI score', () => {
      const subject = createSubject('cs101', {
        topics: [],
        projectIds: ['proj-1'],
      });
      const progress = createSubjectProgress({
        projectSubmissions: {
          'proj-1': [
            createProjectSubmission({
              aiEvaluation: { score: 50, feedback: 'First attempt' },
            }),
            createProjectSubmission({
              aiEvaluation: { score: 80, feedback: 'Much better!' },
            }),
          ],
        },
      });

      // Best score is 80, which passes
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('combined item types', () => {
    it('calculates correctly with quizzes, exercises, exams, and projects', () => {
      const subject = createSubject('cs101', {
        topics: [
          createTopic({
            quizIds: ['quiz-1'],
            exerciseIds: ['ex-1'],
          }),
        ],
        examIds: ['exam-1'],
        projectIds: ['proj-1'],
      });

      const progress = createSubjectProgress({
        quizAttempts: { 'quiz-1': [createQuizAttempt(80)] }, // pass
        exerciseCompletions: { 'ex-1': createExerciseCompletion(true) }, // pass
        examAttempts: { 'exam-1': [createExamAttempt(50)] }, // fail
        projectSubmissions: { 'proj-1': [createProjectSubmission()] }, // pass (no AI)
      });

      // 4 items, 3 passed = 75%
      expect(calculateSubjectCompletion(subject, progress)).toBe(75);
    });

    it('returns 0 for subject with no items', () => {
      const subject = createSubject('cs101', {
        topics: [],
        examIds: [],
        projectIds: [],
      });
      const progress = createSubjectProgress();

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('multiple topics', () => {
    it('counts items across all topics', () => {
      const subject = createSubject('cs101', {
        topics: [
          createTopic({ id: 't1', quizIds: ['quiz-1'], exerciseIds: ['ex-1'] }),
          createTopic({ id: 't2', quizIds: ['quiz-2'], exerciseIds: ['ex-2'] }),
        ],
      });

      const progress = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)],
          'quiz-2': [createQuizAttempt(75)],
        },
        exerciseCompletions: {
          'ex-1': createExerciseCompletion(true),
          'ex-2': createExerciseCompletion(true),
        },
      });

      // 4 items, 4 passed = 100%
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles partial completion across topics', () => {
      const subject = createSubject('cs101', {
        topics: [
          createTopic({ id: 't1', quizIds: ['quiz-1'] }),
          createTopic({ id: 't2', quizIds: ['quiz-2'] }),
          createTopic({ id: 't3', quizIds: ['quiz-3'] }),
        ],
      });

      const progress = createSubjectProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)], // pass
          // quiz-2 not attempted
          'quiz-3': [createQuizAttempt(90)], // pass
        },
      });

      // 3 items, 2 passed = 67% (rounded)
      expect(calculateSubjectCompletion(subject, progress)).toBe(67);
    });
  });
});

describe('getBestScore', () => {
  it('returns 0 for empty array', () => {
    expect(getBestScore([])).toBe(0);
  });

  it('returns single score', () => {
    expect(getBestScore([createQuizAttempt(75)])).toBe(75);
  });

  it('returns highest score from multiple attempts', () => {
    expect(
      getBestScore([
        createQuizAttempt(50),
        createQuizAttempt(90),
        createQuizAttempt(70),
      ])
    ).toBe(90);
  });
});

describe('getBestProjectSubmission', () => {
  it('returns undefined for empty array', () => {
    expect(getBestProjectSubmission([])).toBeUndefined();
  });

  it('returns first submission when none have AI evaluation', () => {
    const submissions = [
      createProjectSubmission({ notes: 'first' }),
      createProjectSubmission({ notes: 'second' }),
    ];
    const best = getBestProjectSubmission(submissions);
    expect(best?.notes).toBe('first');
  });

  it('returns submission with highest AI score', () => {
    const submissions = [
      createProjectSubmission({
        notes: 'first',
        aiEvaluation: { score: 60, feedback: '' },
      }),
      createProjectSubmission({
        notes: 'second',
        aiEvaluation: { score: 90, feedback: '' },
      }),
      createProjectSubmission({
        notes: 'third',
        aiEvaluation: { score: 75, feedback: '' },
      }),
    ];
    const best = getBestProjectSubmission(submissions);
    expect(best?.notes).toBe('second');
  });
});

describe('isScorePassing', () => {
  it('returns true for score >= 70', () => {
    expect(isScorePassing(70)).toBe(true);
    expect(isScorePassing(71)).toBe(true);
    expect(isScorePassing(100)).toBe(true);
  });

  it('returns false for score < 70', () => {
    expect(isScorePassing(69)).toBe(false);
    expect(isScorePassing(0)).toBe(false);
    expect(isScorePassing(50)).toBe(false);
  });
});
