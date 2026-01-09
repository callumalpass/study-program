/**
 * Progress Module Helper Functions Tests
 *
 * Tests for internal helper functions used in progress calculation:
 * - getBestScore for quiz/exam attempts
 * - getBestProjectSubmission for project evaluations
 * - isScorePassing threshold checks
 * - Edge cases in subject completion calculations
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calculateSubjectCompletion,
  getSubjectProgressDetails,
  isQuizCompleted,
  getQuizBestScore,
  isExerciseCompleted,
} from '../src/core/progress';
import { QUIZ_PASSING_SCORE } from '../src/core/types';
import type {
  Subject,
  SubjectProgress,
  QuizAttempt,
  ExamAttempt,
  ProjectSubmission,
  ExerciseCompletion,
  ProjectAiEvaluation,
} from '../src/core/types';

// Mock the storage module
vi.mock('../src/core/storage', () => ({
  progressStorage: {
    getProgress: vi.fn(),
    getSubjectProgress: vi.fn(),
    updateSubjectProgress: vi.fn(),
  },
}));

// Helper to create a minimal subject
function createSubject(overrides: Partial<Subject> = {}): Subject {
  return {
    id: 'test-subject',
    code: 'TEST101',
    title: 'Test Subject',
    category: 'cs',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'A test subject',
    learningObjectives: ['Learn testing'],
    topics: [],
    estimatedHours: 40,
    examIds: [],
    projectIds: [],
    ...overrides,
  };
}

// Helper to create a quiz attempt
function createQuizAttempt(score: number, overrides: Partial<QuizAttempt> = {}): QuizAttempt {
  return {
    attemptId: `attempt-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 60,
    ...overrides,
  };
}

// Helper to create an exam attempt
function createExamAttempt(score: number, overrides: Partial<ExamAttempt> = {}): ExamAttempt {
  return {
    attemptId: `exam-attempt-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 1800,
    ...overrides,
  };
}

// Helper to create a project submission
function createProjectSubmission(
  aiScore?: number,
  overrides: Partial<ProjectSubmission> = {}
): ProjectSubmission {
  const base: ProjectSubmission = {
    submissionId: `sub-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    description: 'Test submission',
    selfAssessment: {},
    notes: '',
    ...overrides,
  };

  if (aiScore !== undefined) {
    base.aiEvaluation = createAiEvaluation(aiScore);
  }

  return base;
}

// Helper to create AI evaluation
function createAiEvaluation(score: number): ProjectAiEvaluation {
  return {
    score,
    feedback: 'Test feedback',
    rubricScores: {},
    strengths: [],
    improvements: [],
  };
}

// Helper to create exercise completion
function createExerciseCompletion(passed: boolean): ExerciseCompletion {
  return {
    completionId: `completion-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    code: 'test code',
    passed,
    passedTestCases: passed ? 5 : 2,
    totalTestCases: 5,
    timeSpentSeconds: 300,
    type: 'coding',
  };
}

describe('QUIZ_PASSING_SCORE constant', () => {
  it('should be 70', () => {
    expect(QUIZ_PASSING_SCORE).toBe(70);
  });
});

describe('calculateSubjectCompletion - Exam handling', () => {
  describe('exam attempt scoring', () => {
    it('counts exam as completed when best score meets passing threshold', () => {
      const subject = createSubject({
        topics: [],
        examIds: ['exam-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {
          'exam-1': [createExamAttempt(70)], // Exactly at threshold
        },
        exerciseCompletions: {},
        projectSubmissions: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('does not count exam as completed when best score is below threshold', () => {
      const subject = createSubject({
        topics: [],
        examIds: ['exam-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {
          'exam-1': [createExamAttempt(69)], // Just below threshold
        },
        exerciseCompletions: {},
        projectSubmissions: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('uses best score from multiple exam attempts', () => {
      const subject = createSubject({
        topics: [],
        examIds: ['exam-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {
          'exam-1': [
            createExamAttempt(50), // First attempt
            createExamAttempt(65), // Second attempt
            createExamAttempt(75), // Third attempt - passing
            createExamAttempt(60), // Fourth attempt - lower but doesn't matter
          ],
        },
        exerciseCompletions: {},
        projectSubmissions: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('handles empty exam attempts array', () => {
      const subject = createSubject({
        topics: [],
        examIds: ['exam-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {
          'exam-1': [], // Empty array
        },
        exerciseCompletions: {},
        projectSubmissions: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles undefined exam attempts', () => {
      const subject = createSubject({
        topics: [],
        examIds: ['exam-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {}, // No entry for exam-1
        exerciseCompletions: {},
        projectSubmissions: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles multiple exams with mixed completion', () => {
      const subject = createSubject({
        topics: [],
        examIds: ['midterm', 'final'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {
          'midterm': [createExamAttempt(80)], // Passing
          'final': [createExamAttempt(50)], // Not passing
        },
        exerciseCompletions: {},
        projectSubmissions: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(50); // 1/2 exams completed
    });
  });
});

describe('calculateSubjectCompletion - Project handling', () => {
  describe('project submission with AI evaluation', () => {
    it('counts project as completed when AI score meets threshold', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [createProjectSubmission(70)],
        },
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('does not count project when AI score is below threshold', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [createProjectSubmission(69)],
        },
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('uses best AI score from multiple submissions', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [
            createProjectSubmission(50),
            createProjectSubmission(75), // Best score
            createProjectSubmission(60),
          ],
        },
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('counts submission as complete when no AI evaluation exists', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [createProjectSubmission()], // No AI score
        },
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('prefers submission with AI evaluation over submission without', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [
            createProjectSubmission(), // No AI - score defaults to 0
            createProjectSubmission(80), // Has AI score
          ],
        },
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });
  });

  describe('project submission edge cases', () => {
    it('handles empty project submissions array', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [],
        },
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles undefined project submissions', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles AI evaluation with score of 0', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [createProjectSubmission(0)],
        },
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles AI evaluation with score of 100', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [createProjectSubmission(100)],
        },
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });
  });
});

describe('calculateSubjectCompletion - Combined items', () => {
  it('calculates correct percentage with quizzes, exams, exercises, and projects', () => {
    const subject = createSubject({
      topics: [
        {
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: ['quiz-1', 'quiz-2'],
          exerciseIds: ['ex-1', 'ex-2'],
        },
      ],
      examIds: ['midterm', 'final'],
      projectIds: ['project-1', 'project-2'],
    });

    // 8 total items: 2 quizzes + 2 exercises + 2 exams + 2 projects
    // Let's complete 4 of them
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'quiz-1': [createQuizAttempt(80)], // Passing
        'quiz-2': [createQuizAttempt(50)], // Not passing
      },
      examAttempts: {
        'midterm': [createExamAttempt(75)], // Passing
        'final': [], // Not attempted
      },
      exerciseCompletions: {
        'ex-1': createExerciseCompletion(true), // Passed
        'ex-2': createExerciseCompletion(false), // Not passed
      },
      projectSubmissions: {
        'project-1': [createProjectSubmission(70)], // Passing AI score
        'project-2': [], // No submission
      },
    };

    const completion = calculateSubjectCompletion(subject, progress);
    // 4/8 = 50%
    expect(completion).toBe(50);
  });

  it('returns 0 when no items exist', () => {
    const subject = createSubject({
      topics: [],
      examIds: [],
      projectIds: [],
    });

    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    const completion = calculateSubjectCompletion(subject, progress);
    expect(completion).toBe(0);
  });
});

describe('calculateSubjectCompletion - Status handling', () => {
  it('returns 0 for not_started status', () => {
    const subject = createSubject({
      topics: [{
        id: 't1',
        title: 'Topic',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
    });

    const progress: SubjectProgress = {
      status: 'not_started',
      quizAttempts: {
        'q1': [createQuizAttempt(100)], // Even with perfect score
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    const completion = calculateSubjectCompletion(subject, progress);
    expect(completion).toBe(0);
  });

  it('returns 100 for completed status regardless of actual items', () => {
    const subject = createSubject({
      topics: [{
        id: 't1',
        title: 'Topic',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
    });

    const progress: SubjectProgress = {
      status: 'completed',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    const completion = calculateSubjectCompletion(subject, progress);
    expect(completion).toBe(100);
  });

  it('returns 0 for undefined progress', () => {
    const subject = createSubject();
    const completion = calculateSubjectCompletion(subject, undefined);
    expect(completion).toBe(0);
  });
});

describe('isQuizCompleted', () => {
  it('returns true when best score meets threshold', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'quiz-1': [createQuizAttempt(70)],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(isQuizCompleted('quiz-1', progress)).toBe(true);
  });

  it('returns false when best score is below threshold', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'quiz-1': [createQuizAttempt(69)],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(isQuizCompleted('quiz-1', progress)).toBe(false);
  });

  it('returns false when no attempts exist', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(isQuizCompleted('quiz-1', progress)).toBe(false);
  });

  it('returns false for undefined progress', () => {
    expect(isQuizCompleted('quiz-1', undefined)).toBe(false);
  });

  it('considers best score from multiple attempts', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'quiz-1': [
          createQuizAttempt(40),
          createQuizAttempt(50),
          createQuizAttempt(71), // Passing
        ],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(isQuizCompleted('quiz-1', progress)).toBe(true);
  });
});

describe('getQuizBestScore', () => {
  it('returns highest score from attempts', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'quiz-1': [
          createQuizAttempt(60),
          createQuizAttempt(85),
          createQuizAttempt(75),
        ],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(getQuizBestScore('quiz-1', progress)).toBe(85);
  });

  it('returns null when no attempts exist', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(getQuizBestScore('quiz-1', progress)).toBeNull();
  });

  it('returns null for undefined progress', () => {
    expect(getQuizBestScore('quiz-1', undefined)).toBeNull();
  });

  it('returns score from single attempt', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'quiz-1': [createQuizAttempt(42)],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(getQuizBestScore('quiz-1', progress)).toBe(42);
  });

  it('handles empty attempts array', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'quiz-1': [],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(getQuizBestScore('quiz-1', progress)).toBeNull();
  });
});

describe('isExerciseCompleted', () => {
  it('returns true when exercise is passed', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {
        'ex-1': createExerciseCompletion(true),
      },
      projectSubmissions: {},
    };

    expect(isExerciseCompleted('ex-1', progress)).toBe(true);
  });

  it('returns false when exercise is not passed', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {
        'ex-1': createExerciseCompletion(false),
      },
      projectSubmissions: {},
    };

    expect(isExerciseCompleted('ex-1', progress)).toBe(false);
  });

  it('returns false when exercise has no completion', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(isExerciseCompleted('ex-1', progress)).toBe(false);
  });

  it('returns false for undefined progress', () => {
    expect(isExerciseCompleted('ex-1', undefined)).toBe(false);
  });
});

describe('Score boundary tests', () => {
  it('handles score exactly at boundary (70)', () => {
    const subject = createSubject({
      topics: [{
        id: 't1',
        title: 'Topic',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
    });

    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [createQuizAttempt(70)],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles score one below boundary (69)', () => {
    const subject = createSubject({
      topics: [{
        id: 't1',
        title: 'Topic',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
    });

    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [createQuizAttempt(69)],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('handles perfect score (100)', () => {
    const subject = createSubject({
      topics: [{
        id: 't1',
        title: 'Topic',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
    });

    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [createQuizAttempt(100)],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles zero score', () => {
    const subject = createSubject({
      topics: [{
        id: 't1',
        title: 'Topic',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
    });

    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [createQuizAttempt(0)],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });
});
