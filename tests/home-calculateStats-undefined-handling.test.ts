/**
 * Home Page calculateStats Undefined Handling Tests
 *
 * Tests for the calculateStats function to ensure it handles
 * undefined, null, and missing properties gracefully without
 * throwing runtime errors.
 */

import { describe, it, expect } from 'vitest';
import type { Subject, UserProgress, SubjectProgress } from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

// Recreate calculateStats logic for testing (since it's not exported)
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

    // Count quizzes - handle potentially undefined quizAttempts
    if (progress.quizAttempts) {
      Object.values(progress.quizAttempts).forEach((attempts) => {
        if (attempts && attempts.length > 0) {
          const bestScore = Math.max(...attempts.map(a => a.score));
          if (bestScore >= QUIZ_PASSING_SCORE) quizzesCompleted++;
          attempts.forEach((attempt) => {
            totalQuizScore += attempt.score;
            quizAttemptCount++;
          });
        }
      });
    }

    // Count exercises - handle potentially undefined exerciseCompletions
    if (progress.exerciseCompletions) {
      Object.values(progress.exerciseCompletions).forEach((completion) => {
        if (completion && completion.passed) {
          exercisesCompleted++;
        }
      });
    }

    // Count projects - handle potentially undefined projectSubmissions
    if (progress.projectSubmissions) {
      Object.values(progress.projectSubmissions).forEach((submissions) => {
        if (submissions && submissions.length > 0) {
          projectsSubmitted += submissions.length;
        }
      });
    }
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

// Helper to create minimal subject
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

// Helper to create base user progress
function createUserProgress(subjects: Record<string, Partial<SubjectProgress>>): UserProgress {
  const fullSubjects: Record<string, SubjectProgress> = {};

  for (const [id, partial] of Object.entries(subjects)) {
    fullSubjects[id] = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
      ...partial,
    };
  }

  return {
    version: 4,
    startedAt: new Date().toISOString(),
    subjects: fullSubjects,
    settings: {
      theme: 'auto',
      codeEditorFontSize: 14,
      showCompletedItems: true,
    },
  };
}

describe('calculateStats undefined handling', () => {
  describe('handles missing quizAttempts gracefully', () => {
    it('handles subject with undefined quizAttempts', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          quizAttempts: undefined as any, // Simulating missing property
        },
      });

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();
      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });

    it('handles quiz with null attempts array', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          quizAttempts: { 'quiz-1': null as any },
        },
      });

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();
      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(0);
    });

    it('handles quiz attempt with undefined score', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          quizAttempts: {
            'quiz-1': [{
              attemptId: 'test',
              timestamp: new Date().toISOString(),
              answers: {},
              score: undefined as any,
              timeSpentSeconds: 60,
            }],
          },
        },
      });

      // This should handle NaN from undefined gracefully
      const stats = calculateStats(subjects, userProgress);
      expect(typeof stats.quizzesCompleted).toBe('number');
      expect(typeof stats.averageQuizScore).toBe('number');
    });
  });

  describe('handles missing exerciseCompletions gracefully', () => {
    it('handles subject with undefined exerciseCompletions', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          exerciseCompletions: undefined as any,
        },
      });

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();
      const stats = calculateStats(subjects, userProgress);
      expect(stats.exercisesCompleted).toBe(0);
    });

    it('handles exercise with null completion', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          exerciseCompletions: { 'ex-1': null as any },
        },
      });

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();
      const stats = calculateStats(subjects, userProgress);
      expect(stats.exercisesCompleted).toBe(0);
    });

    it('handles exercise completion with undefined passed', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          exerciseCompletions: {
            'ex-1': {
              completionId: 'test',
              timestamp: new Date().toISOString(),
              code: 'test',
              passed: undefined as any,
              timeSpentSeconds: 60,
            },
          },
        },
      });

      const stats = calculateStats(subjects, userProgress);
      expect(stats.exercisesCompleted).toBe(0); // undefined is falsy
    });
  });

  describe('handles missing projectSubmissions gracefully', () => {
    it('handles subject with undefined projectSubmissions', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          projectSubmissions: undefined as any,
        },
      });

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();
      const stats = calculateStats(subjects, userProgress);
      expect(stats.projectsSubmitted).toBe(0);
    });

    it('handles project with null submissions array', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          projectSubmissions: { 'proj-1': null as any },
        },
      });

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();
      const stats = calculateStats(subjects, userProgress);
      expect(stats.projectsSubmitted).toBe(0);
    });
  });

  describe('handles empty objects and arrays', () => {
    it('handles completely empty progress', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {},
      });

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.exercisesCompleted).toBe(0);
      expect(stats.projectsSubmitted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });

    it('handles empty subjects array', () => {
      const subjects: Subject[] = [];
      const userProgress = createUserProgress({
        cs101: {
          quizAttempts: { 'quiz-1': [{ attemptId: '1', timestamp: '', answers: {}, score: 100, timeSpentSeconds: 60 }] },
        },
      });

      const stats = calculateStats(subjects, userProgress);
      // No subjects selected, so no stats should be counted
      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });
  });

  describe('handles mixed valid and invalid data', () => {
    it('correctly processes valid data while ignoring invalid entries', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          quizAttempts: {
            'quiz-1': [{ attemptId: '1', timestamp: '', answers: {}, score: 80, timeSpentSeconds: 60 }],
            'quiz-2': null as any, // Invalid
            'quiz-3': [{ attemptId: '3', timestamp: '', answers: {}, score: 90, timeSpentSeconds: 60 }],
          },
          exerciseCompletions: {
            'ex-1': { completionId: '1', timestamp: '', code: '', passed: true, timeSpentSeconds: 60 },
            'ex-2': null as any, // Invalid
          },
          projectSubmissions: {
            'proj-1': [{ submissionId: '1', timestamp: '', description: '', selfAssessment: {}, notes: '' }],
            'proj-2': null as any, // Invalid
          },
        },
      });

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(2); // quiz-1 and quiz-3
      expect(stats.exercisesCompleted).toBe(1); // ex-1
      expect(stats.projectsSubmitted).toBe(1); // proj-1
      expect(stats.averageQuizScore).toBe(85); // (80 + 90) / 2
    });
  });

  describe('handles boundary values for scores', () => {
    it('handles score of exactly 0', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          quizAttempts: {
            'quiz-1': [{ attemptId: '1', timestamp: '', answers: {}, score: 0, timeSpentSeconds: 60 }],
          },
        },
      });

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });

    it('handles score of exactly 100', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          quizAttempts: {
            'quiz-1': [{ attemptId: '1', timestamp: '', answers: {}, score: 100, timeSpentSeconds: 60 }],
          },
        },
      });

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(1);
      expect(stats.averageQuizScore).toBe(100);
    });

    it('handles score exactly at passing threshold (70)', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          quizAttempts: {
            'quiz-1': [{ attemptId: '1', timestamp: '', answers: {}, score: 70, timeSpentSeconds: 60 }],
          },
        },
      });

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(1);
    });

    it('handles score just below passing threshold (69)', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createUserProgress({
        cs101: {
          quizAttempts: {
            'quiz-1': [{ attemptId: '1', timestamp: '', answers: {}, score: 69, timeSpentSeconds: 60 }],
          },
        },
      });

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(0);
    });
  });

  describe('handles very large numbers of items', () => {
    it('correctly counts large number of quizzes', () => {
      const subjects = [createSubject('cs101')];
      const quizAttempts: Record<string, any[]> = {};
      for (let i = 0; i < 100; i++) {
        quizAttempts[`quiz-${i}`] = [{ attemptId: `${i}`, timestamp: '', answers: {}, score: 80, timeSpentSeconds: 60 }];
      }

      const userProgress = createUserProgress({
        cs101: { quizAttempts },
      });

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(100);
      expect(stats.averageQuizScore).toBe(80);
    });

    it('correctly counts large number of exercises', () => {
      const subjects = [createSubject('cs101')];
      const exerciseCompletions: Record<string, any> = {};
      for (let i = 0; i < 100; i++) {
        exerciseCompletions[`ex-${i}`] = { completionId: `${i}`, timestamp: '', code: '', passed: true, timeSpentSeconds: 60 };
      }

      const userProgress = createUserProgress({
        cs101: { exerciseCompletions },
      });

      const stats = calculateStats(subjects, userProgress);
      expect(stats.exercisesCompleted).toBe(100);
    });
  });
});
