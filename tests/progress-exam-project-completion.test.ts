/**
 * Tests for exam and project helper functions in progress.ts
 *
 * These tests verify the new helper functions:
 * - isExamCompleted: Check if an exam has a passing best score
 * - getExamBestScore: Get the best score from exam attempts
 * - isProjectCompleted: Check if a project has a valid submission
 * - getProjectBestSubmission: Get the best project submission
 */

import { describe, it, expect } from 'vitest';
import {
  isExamCompleted,
  getExamBestScore,
  isProjectCompleted,
  getProjectBestSubmission,
} from '@/core/progress';
import type { SubjectProgress, ExamAttempt, ProjectSubmission, ProjectAiEvaluation } from '@/core/types';
import { QUIZ_PASSING_SCORE } from '@/core/types';

// Helper to create a minimal SubjectProgress object
function createProgress(overrides: Partial<SubjectProgress> = {}): SubjectProgress {
  return {
    status: 'in_progress',
    quizAttempts: {},
    examAttempts: {},
    exerciseCompletions: {},
    projectSubmissions: {},
    ...overrides,
  };
}

// Helper to create an exam attempt
function createExamAttempt(score: number, overrides: Partial<ExamAttempt> = {}): ExamAttempt {
  return {
    attemptId: `attempt-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 300,
    ...overrides,
  };
}

// Helper to create a project submission
function createProjectSubmission(overrides: Partial<ProjectSubmission> = {}): ProjectSubmission {
  return {
    submissionId: `sub-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: new Date().toISOString(),
    description: 'Test submission',
    selfAssessment: {},
    notes: '',
    ...overrides,
  };
}

// Helper to create an AI evaluation
function createAiEvaluation(score: number): ProjectAiEvaluation {
  return {
    score,
    feedback: 'Test feedback',
    rubricScores: {},
    strengths: [],
    improvements: [],
  };
}

describe('isExamCompleted', () => {
  it('returns false for undefined progress', () => {
    expect(isExamCompleted('exam-1', undefined)).toBe(false);
  });

  it('returns false for progress with no exam attempts', () => {
    const progress = createProgress();
    expect(isExamCompleted('exam-1', progress)).toBe(false);
  });

  it('returns false for non-existent exam ID', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [createExamAttempt(80)],
      },
    });
    expect(isExamCompleted('exam-2', progress)).toBe(false);
  });

  it('returns false for empty exam attempts array', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(false);
  });

  it('returns false when best score is below passing threshold', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [
          createExamAttempt(50),
          createExamAttempt(60),
          createExamAttempt(65),
        ],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(false);
  });

  it('returns true when best score equals passing threshold', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [
          createExamAttempt(50),
          createExamAttempt(QUIZ_PASSING_SCORE),
        ],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(true);
  });

  it('returns true when best score exceeds passing threshold', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [
          createExamAttempt(40),
          createExamAttempt(95),
          createExamAttempt(60),
        ],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(true);
  });

  it('returns true with a single passing attempt', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [createExamAttempt(85)],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(true);
  });

  it('works correctly when examAttempts is undefined', () => {
    const progress = createProgress();
    delete (progress as Record<string, unknown>).examAttempts;
    expect(isExamCompleted('exam-1', progress)).toBe(false);
  });
});

describe('getExamBestScore', () => {
  it('returns null for undefined progress', () => {
    expect(getExamBestScore('exam-1', undefined)).toBeNull();
  });

  it('returns null for progress with no exam attempts', () => {
    const progress = createProgress();
    expect(getExamBestScore('exam-1', progress)).toBeNull();
  });

  it('returns null for non-existent exam ID', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [createExamAttempt(80)],
      },
    });
    expect(getExamBestScore('exam-2', progress)).toBeNull();
  });

  it('returns null for empty exam attempts array', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [],
      },
    });
    expect(getExamBestScore('exam-1', progress)).toBeNull();
  });

  it('returns the score from a single attempt', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [createExamAttempt(75)],
      },
    });
    expect(getExamBestScore('exam-1', progress)).toBe(75);
  });

  it('returns the highest score from multiple attempts', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [
          createExamAttempt(60),
          createExamAttempt(85),
          createExamAttempt(70),
        ],
      },
    });
    expect(getExamBestScore('exam-1', progress)).toBe(85);
  });

  it('returns 0 when all attempts have score 0', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [
          createExamAttempt(0),
          createExamAttempt(0),
        ],
      },
    });
    expect(getExamBestScore('exam-1', progress)).toBe(0);
  });

  it('returns 100 for perfect score', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [
          createExamAttempt(50),
          createExamAttempt(100),
        ],
      },
    });
    expect(getExamBestScore('exam-1', progress)).toBe(100);
  });

  it('handles multiple exams independently', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [createExamAttempt(80)],
        'exam-2': [createExamAttempt(90)],
        'exam-3': [createExamAttempt(70)],
      },
    });
    expect(getExamBestScore('exam-1', progress)).toBe(80);
    expect(getExamBestScore('exam-2', progress)).toBe(90);
    expect(getExamBestScore('exam-3', progress)).toBe(70);
  });
});

describe('isProjectCompleted', () => {
  it('returns false for undefined progress', () => {
    expect(isProjectCompleted('project-1', undefined)).toBe(false);
  });

  it('returns false for progress with no project submissions', () => {
    const progress = createProgress();
    expect(isProjectCompleted('project-1', progress)).toBe(false);
  });

  it('returns false for non-existent project ID', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [createProjectSubmission()],
      },
    });
    expect(isProjectCompleted('project-2', progress)).toBe(false);
  });

  it('returns false for empty project submissions array', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [],
      },
    });
    expect(isProjectCompleted('project-1', progress)).toBe(false);
  });

  it('returns true for submission without AI evaluation', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [createProjectSubmission()],
      },
    });
    expect(isProjectCompleted('project-1', progress)).toBe(true);
  });

  it('returns true for submission with passing AI evaluation', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(80),
          }),
        ],
      },
    });
    expect(isProjectCompleted('project-1', progress)).toBe(true);
  });

  it('returns false for submission with failing AI evaluation', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(50),
          }),
        ],
      },
    });
    expect(isProjectCompleted('project-1', progress)).toBe(false);
  });

  it('returns true when best submission has passing AI evaluation', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(40),
          }),
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(85),
          }),
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(60),
          }),
        ],
      },
    });
    expect(isProjectCompleted('project-1', progress)).toBe(true);
  });

  it('returns false when no submission has passing AI evaluation', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(40),
          }),
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(60),
          }),
        ],
      },
    });
    expect(isProjectCompleted('project-1', progress)).toBe(false);
  });

  it('returns true when AI score equals passing threshold', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(QUIZ_PASSING_SCORE),
          }),
        ],
      },
    });
    expect(isProjectCompleted('project-1', progress)).toBe(true);
  });
});

describe('getProjectBestSubmission', () => {
  it('returns undefined for undefined progress', () => {
    expect(getProjectBestSubmission('project-1', undefined)).toBeUndefined();
  });

  it('returns undefined for progress with no project submissions', () => {
    const progress = createProgress();
    expect(getProjectBestSubmission('project-1', progress)).toBeUndefined();
  });

  it('returns undefined for non-existent project ID', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [createProjectSubmission()],
      },
    });
    expect(getProjectBestSubmission('project-2', progress)).toBeUndefined();
  });

  it('returns undefined for empty project submissions array', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [],
      },
    });
    expect(getProjectBestSubmission('project-1', progress)).toBeUndefined();
  });

  it('returns the single submission when only one exists', () => {
    const submission = createProjectSubmission({ submissionId: 'sub-1' });
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [submission],
      },
    });
    expect(getProjectBestSubmission('project-1', progress)?.submissionId).toBe('sub-1');
  });

  it('returns submission with highest AI score', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({
            submissionId: 'sub-1',
            aiEvaluation: createAiEvaluation(60),
          }),
          createProjectSubmission({
            submissionId: 'sub-2',
            aiEvaluation: createAiEvaluation(90),
          }),
          createProjectSubmission({
            submissionId: 'sub-3',
            aiEvaluation: createAiEvaluation(75),
          }),
        ],
      },
    });
    expect(getProjectBestSubmission('project-1', progress)?.submissionId).toBe('sub-2');
  });

  it('returns first submission when none have AI evaluations', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({ submissionId: 'sub-1' }),
          createProjectSubmission({ submissionId: 'sub-2' }),
          createProjectSubmission({ submissionId: 'sub-3' }),
        ],
      },
    });
    // When no AI evaluations, all scores are 0, so first one wins
    expect(getProjectBestSubmission('project-1', progress)?.submissionId).toBe('sub-1');
  });

  it('prefers submission with AI evaluation over one without', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({ submissionId: 'sub-1' }), // No AI, treated as score 0
          createProjectSubmission({
            submissionId: 'sub-2',
            aiEvaluation: createAiEvaluation(50), // Has AI score > 0
          }),
        ],
      },
    });
    expect(getProjectBestSubmission('project-1', progress)?.submissionId).toBe('sub-2');
  });

  it('handles multiple projects independently', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({
            submissionId: 'sub-1a',
            aiEvaluation: createAiEvaluation(80),
          }),
        ],
        'project-2': [
          createProjectSubmission({
            submissionId: 'sub-2a',
            aiEvaluation: createAiEvaluation(90),
          }),
        ],
      },
    });
    expect(getProjectBestSubmission('project-1', progress)?.submissionId).toBe('sub-1a');
    expect(getProjectBestSubmission('project-2', progress)?.submissionId).toBe('sub-2a');
  });

  it('returns the full submission object with all properties', () => {
    const submission = createProjectSubmission({
      submissionId: 'sub-1',
      description: 'My project',
      repositoryUrl: 'https://github.com/user/repo',
      demoUrl: 'https://demo.example.com',
      notes: 'Some notes',
      aiEvaluation: createAiEvaluation(85),
    });
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [submission],
      },
    });
    const result = getProjectBestSubmission('project-1', progress);
    expect(result).toBeDefined();
    expect(result?.submissionId).toBe('sub-1');
    expect(result?.description).toBe('My project');
    expect(result?.repositoryUrl).toBe('https://github.com/user/repo');
    expect(result?.demoUrl).toBe('https://demo.example.com');
    expect(result?.notes).toBe('Some notes');
    expect(result?.aiEvaluation?.score).toBe(85);
  });
});

describe('Edge cases and boundary conditions', () => {
  it('exam passing threshold is exactly 70', () => {
    expect(QUIZ_PASSING_SCORE).toBe(70);
  });

  it('isExamCompleted with score 69 returns false', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [createExamAttempt(69)],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(false);
  });

  it('isExamCompleted with score 70 returns true', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': [createExamAttempt(70)],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(true);
  });

  it('isProjectCompleted with AI score 69 returns false', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(69),
          }),
        ],
      },
    });
    expect(isProjectCompleted('project-1', progress)).toBe(false);
  });

  it('isProjectCompleted with AI score 70 returns true', () => {
    const progress = createProgress({
      projectSubmissions: {
        'project-1': [
          createProjectSubmission({
            aiEvaluation: createAiEvaluation(70),
          }),
        ],
      },
    });
    expect(isProjectCompleted('project-1', progress)).toBe(true);
  });

  it('handles progress with null-ish values safely', () => {
    const progress = createProgress({
      examAttempts: {
        'exam-1': undefined as unknown as ExamAttempt[],
      },
      projectSubmissions: {
        'project-1': undefined as unknown as ProjectSubmission[],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(false);
    expect(getExamBestScore('exam-1', progress)).toBeNull();
    expect(isProjectCompleted('project-1', progress)).toBe(false);
    expect(getProjectBestSubmission('project-1', progress)).toBeUndefined();
  });
});

describe('Consistency with quiz/exercise helper functions', () => {
  it('exam helpers follow same pattern as quiz helpers', () => {
    // Test that exam helpers behave consistently with quiz helpers
    const progressWithExam = createProgress({
      examAttempts: {
        'exam-1': [createExamAttempt(85)],
      },
    });

    // isExamCompleted should match isQuizCompleted behavior
    expect(isExamCompleted('exam-1', progressWithExam)).toBe(true);
    expect(getExamBestScore('exam-1', progressWithExam)).toBe(85);

    // Non-existent IDs should return false/null
    expect(isExamCompleted('exam-nonexistent', progressWithExam)).toBe(false);
    expect(getExamBestScore('exam-nonexistent', progressWithExam)).toBeNull();
  });

  it('project helpers follow same pattern as exercise helpers', () => {
    const progressWithProject = createProgress({
      projectSubmissions: {
        'project-1': [createProjectSubmission()],
      },
    });

    // isProjectCompleted should match isExerciseCompleted behavior pattern
    expect(isProjectCompleted('project-1', progressWithProject)).toBe(true);
    expect(getProjectBestSubmission('project-1', progressWithProject)).toBeDefined();

    // Non-existent IDs should return false/undefined
    expect(isProjectCompleted('project-nonexistent', progressWithProject)).toBe(false);
    expect(getProjectBestSubmission('project-nonexistent', progressWithProject)).toBeUndefined();
  });
});
