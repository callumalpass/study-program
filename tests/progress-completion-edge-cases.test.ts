/**
 * Progress Completion Edge Cases Tests
 *
 * Comprehensive tests for subject completion calculation edge cases,
 * including subjects with no content, partial completions, and
 * complex combinations of quizzes, exercises, exams, and projects.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  calculateSubjectCompletion,
  getSubjectProgressDetails,
  isQuizCompleted,
  isExerciseCompleted,
  getQuizBestScore,
} from '../src/core/progress';
import { ProgressStorage } from '../src/core/storage';
import type { Subject, SubjectProgress } from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

const now = new Date('2024-06-15T12:00:00.000Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('calculateSubjectCompletion edge cases', () => {
  describe('subject with no progress', () => {
    it('returns 0 for undefined progress', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [],
      };

      const completion = calculateSubjectCompletion(subject, undefined);
      expect(completion).toBe(0);
    });

    it('returns 0 for not_started status', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [],
      };

      const progress: SubjectProgress = {
        status: 'not_started',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('returns 100 for completed status', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [],
      };

      const progress: SubjectProgress = {
        status: 'completed',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });
  });

  describe('subject with only quizzes', () => {
    it('calculates completion based on passed quizzes', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [
          {
            id: 'topic-1',
            title: 'Topic 1',
            subtopics: [],
            quizIds: ['q1', 'q2', 'q3', 'q4'],
            exerciseIds: [],
          },
        ],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'q1': [{ attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 80, timeSpentSeconds: 60 }],
          'q2': [{ attemptId: 'a2', timestamp: now.toISOString(), answers: {}, score: 90, timeSpentSeconds: 60 }],
          // q3 and q4 not attempted
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(50); // 2 out of 4 quizzes passed
    });

    it('only counts quizzes with passing score', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [
          {
            id: 'topic-1',
            title: 'Topic 1',
            subtopics: [],
            quizIds: ['q1', 'q2'],
            exerciseIds: [],
          },
        ],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'q1': [{ attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 65, timeSpentSeconds: 60 }], // Below passing
          'q2': [{ attemptId: 'a2', timestamp: now.toISOString(), answers: {}, score: 70, timeSpentSeconds: 60 }], // At passing
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(50); // Only q2 passes
    });

    it('uses best score from multiple attempts', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [
          {
            id: 'topic-1',
            title: 'Topic 1',
            subtopics: [],
            quizIds: ['q1'],
            exerciseIds: [],
          },
        ],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'q1': [
            { attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 40, timeSpentSeconds: 60 },
            { attemptId: 'a2', timestamp: now.toISOString(), answers: {}, score: 50, timeSpentSeconds: 60 },
            { attemptId: 'a3', timestamp: now.toISOString(), answers: {}, score: 80, timeSpentSeconds: 60 }, // Best
            { attemptId: 'a4', timestamp: now.toISOString(), answers: {}, score: 60, timeSpentSeconds: 60 },
          ],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100); // Best score (80) passes
    });
  });

  describe('subject with only exercises', () => {
    it('calculates completion based on passed exercises', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [
          {
            id: 'topic-1',
            title: 'Topic 1',
            subtopics: [],
            quizIds: [],
            exerciseIds: ['ex1', 'ex2', 'ex3'],
          },
        ],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {
          'ex1': { completionId: 'c1', timestamp: now.toISOString(), code: '', passed: true, timeSpentSeconds: 60 },
          'ex2': { completionId: 'c2', timestamp: now.toISOString(), code: '', passed: false, timeSpentSeconds: 60 },
          // ex3 not attempted
        },
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(33); // 1 out of 3 exercises passed
    });
  });

  describe('subject with exams', () => {
    it('includes exams in completion calculation', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [],
        examIds: ['midterm', 'final'],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {
          'midterm': [{ attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 75, timeSpentSeconds: 3600 }],
          // final not attempted
        },
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(50); // 1 out of 2 exams passed
    });

    it('uses best exam score from multiple attempts', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [],
        examIds: ['final'],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {
          'final': [
            { attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 50, timeSpentSeconds: 3600 },
            { attemptId: 'a2', timestamp: now.toISOString(), answers: {}, score: 85, timeSpentSeconds: 3600 },
          ],
        },
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100); // Best score passes
    });
  });

  describe('subject with projects', () => {
    it('counts project submission without AI evaluation as complete', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [],
        projectIds: ['proj1'],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'proj1': [{
            submissionId: 's1',
            timestamp: now.toISOString(),
            content: 'My project',
            // No AI evaluation
          }],
        },
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100); // Submission counts as complete
    });

    it('requires passing AI score when evaluation exists', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [],
        projectIds: ['proj1', 'proj2'],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'proj1': [{
            submissionId: 's1',
            timestamp: now.toISOString(),
            content: 'Project 1',
            aiEvaluation: { score: 80, feedback: 'Good', evaluatedAt: now.toISOString() },
          }],
          'proj2': [{
            submissionId: 's2',
            timestamp: now.toISOString(),
            content: 'Project 2',
            aiEvaluation: { score: 50, feedback: 'Needs work', evaluatedAt: now.toISOString() }, // Below passing
          }],
        },
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(50); // Only proj1 passes
    });

    it('uses best AI score from multiple submissions', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [],
        projectIds: ['proj1'],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'proj1': [
            {
              submissionId: 's1',
              timestamp: now.toISOString(),
              content: 'First attempt',
              aiEvaluation: { score: 40, feedback: 'Poor', evaluatedAt: now.toISOString() },
            },
            {
              submissionId: 's2',
              timestamp: now.toISOString(),
              content: 'Second attempt',
              aiEvaluation: { score: 85, feedback: 'Good', evaluatedAt: now.toISOString() }, // Best
            },
          ],
        },
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100); // Best submission passes
    });
  });

  describe('mixed content subject', () => {
    it('calculates completion correctly with all content types', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Test Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [
          {
            id: 'topic-1',
            title: 'Topic 1',
            subtopics: [],
            quizIds: ['q1', 'q2'],
            exerciseIds: ['ex1', 'ex2'],
          },
        ],
        examIds: ['final'],
        projectIds: ['proj1'],
      };

      // Total items: 2 quizzes + 2 exercises + 1 exam + 1 project = 6
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'q1': [{ attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 90, timeSpentSeconds: 60 }], // Pass
          'q2': [{ attemptId: 'a2', timestamp: now.toISOString(), answers: {}, score: 60, timeSpentSeconds: 60 }], // Fail
        },
        examAttempts: {
          'final': [{ attemptId: 'a3', timestamp: now.toISOString(), answers: {}, score: 75, timeSpentSeconds: 3600 }], // Pass
        },
        exerciseCompletions: {
          'ex1': { completionId: 'c1', timestamp: now.toISOString(), code: '', passed: true, timeSpentSeconds: 60 }, // Pass
          'ex2': { completionId: 'c2', timestamp: now.toISOString(), code: '', passed: false, timeSpentSeconds: 60 }, // Fail
        },
        projectSubmissions: {
          'proj1': [{ submissionId: 's1', timestamp: now.toISOString(), content: '' }], // Pass (no AI)
        },
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      // Passed: q1, final, ex1, proj1 = 4 out of 6
      expect(completion).toBe(67); // Math.round(4/6 * 100)
    });
  });

  describe('empty subject', () => {
    it('returns 0 for subject with no content', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Empty Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('returns 0 for subject with topics but no quizzes or exercises', () => {
      const subject: Subject = {
        id: 'cs101',
        name: 'Reading Only Subject',
        description: '',
        year: 1,
        semester: 1,
        credits: 3,
        estimatedHours: 40,
        topics: [
          {
            id: 'topic-1',
            title: 'Topic 1',
            subtopics: [],
            quizIds: [],
            exerciseIds: [],
          },
          {
            id: 'topic-2',
            title: 'Topic 2',
            subtopics: [],
            quizIds: [],
            exerciseIds: [],
          },
        ],
      };

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });
  });
});

describe('isQuizCompleted', () => {
  it('returns false for undefined progress', () => {
    expect(isQuizCompleted('q1', undefined)).toBe(false);
  });

  it('returns false for quiz with no attempts', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(isQuizCompleted('q1', progress)).toBe(false);
  });

  it('returns false for quiz with failing attempts only', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [
          { attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 50, timeSpentSeconds: 60 },
          { attemptId: 'a2', timestamp: now.toISOString(), answers: {}, score: 65, timeSpentSeconds: 60 },
        ],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(isQuizCompleted('q1', progress)).toBe(false);
  });

  it('returns true for quiz with at least one passing attempt', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [
          { attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 50, timeSpentSeconds: 60 },
          { attemptId: 'a2', timestamp: now.toISOString(), answers: {}, score: 85, timeSpentSeconds: 60 }, // Passing
        ],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(isQuizCompleted('q1', progress)).toBe(true);
  });

  it('returns true for quiz with score exactly at passing threshold', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [
          { attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 60 },
        ],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(isQuizCompleted('q1', progress)).toBe(true);
  });
});

describe('isExerciseCompleted', () => {
  it('returns false for undefined progress', () => {
    expect(isExerciseCompleted('ex1', undefined)).toBe(false);
  });

  it('returns false for exercise not in completions', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(isExerciseCompleted('ex1', progress)).toBe(false);
  });

  it('returns false for exercise with passed: false', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {
        'ex1': { completionId: 'c1', timestamp: now.toISOString(), code: '', passed: false, timeSpentSeconds: 60 },
      },
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(isExerciseCompleted('ex1', progress)).toBe(false);
  });

  it('returns true for exercise with passed: true', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {
        'ex1': { completionId: 'c1', timestamp: now.toISOString(), code: '', passed: true, timeSpentSeconds: 60 },
      },
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(isExerciseCompleted('ex1', progress)).toBe(true);
  });
});

describe('getQuizBestScore', () => {
  it('returns null for undefined progress', () => {
    expect(getQuizBestScore('q1', undefined)).toBeNull();
  });

  it('returns null for quiz with no attempts', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(getQuizBestScore('q1', progress)).toBeNull();
  });

  it('returns null for quiz with empty attempts array', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(getQuizBestScore('q1', progress)).toBeNull();
  });

  it('returns the best score from multiple attempts', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [
          { attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 40, timeSpentSeconds: 60 },
          { attemptId: 'a2', timestamp: now.toISOString(), answers: {}, score: 85, timeSpentSeconds: 60 },
          { attemptId: 'a3', timestamp: now.toISOString(), answers: {}, score: 70, timeSpentSeconds: 60 },
        ],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(getQuizBestScore('q1', progress)).toBe(85);
  });

  it('returns single score when only one attempt', () => {
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [
          { attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 75, timeSpentSeconds: 60 },
        ],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(getQuizBestScore('q1', progress)).toBe(75);
  });
});

describe('passing score threshold consistency', () => {
  it('uses consistent passing threshold of 70', () => {
    expect(QUIZ_PASSING_SCORE).toBe(70);
  });

  it('69 is failing, 70 is passing', () => {
    const subject: Subject = {
      id: 'cs101',
      name: 'Test',
      description: '',
      year: 1,
      semester: 1,
      credits: 3,
      estimatedHours: 40,
      topics: [{
        id: 't1',
        title: 'Topic',
        subtopics: [],
        quizIds: ['q1', 'q2'],
        exerciseIds: [],
      }],
    };

    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {
        'q1': [{ attemptId: 'a1', timestamp: now.toISOString(), answers: {}, score: 69, timeSpentSeconds: 60 }],
        'q2': [{ attemptId: 'a2', timestamp: now.toISOString(), answers: {}, score: 70, timeSpentSeconds: 60 }],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };

    expect(isQuizCompleted('q1', progress)).toBe(false);
    expect(isQuizCompleted('q2', progress)).toBe(true);
    expect(calculateSubjectCompletion(subject, progress)).toBe(50); // 1 of 2 passed
  });
});
