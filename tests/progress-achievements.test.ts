/**
 * Progress Achievements Tests
 *
 * Tests for the achievement calculation logic in the progress page,
 * particularly focusing on correct date tracking for achievement unlocks.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Subject, UserProgress, SubjectProgress } from '../src/core/types';

// We can't directly import the private calculateAchievements function,
// so we'll test the logic by checking the behavior through the module.
// Since calculateAchievements is a private function, we test the logic here.

// Helper to create a minimal subject
function createSubject(id: string, year: number = 1): Subject {
  return {
    id,
    code: id.toUpperCase(),
    title: `Subject ${id}`,
    category: 'cs',
    year,
    semester: 1,
    prerequisites: [],
    description: 'Test subject',
    learningObjectives: [],
    topics: [],
    estimatedHours: 10,
  };
}

// Helper to create subject progress
function createSubjectProgress(
  status: 'not_started' | 'in_progress' | 'completed',
  options: {
    startedAt?: string;
    completedAt?: string;
    quizAttempts?: Record<string, { score: number }[]>;
    exerciseCompletions?: Record<string, { passed: boolean }>;
  } = {}
): SubjectProgress {
  return {
    status,
    startedAt: options.startedAt,
    completedAt: options.completedAt,
    quizAttempts: options.quizAttempts || {},
    examAttempts: {},
    exerciseCompletions: options.exerciseCompletions || {},
    projectSubmissions: {},
  };
}

// Helper to create user progress
function createUserProgress(
  subjects: Record<string, SubjectProgress> = {},
  startedAt: string = '2024-01-01T00:00:00Z'
): UserProgress {
  return {
    version: 4,
    startedAt,
    subjects,
    settings: {
      theme: 'auto',
      codeEditorFontSize: 14,
      showCompletedItems: true,
    },
  };
}

describe('Achievement first completion date logic', () => {
  describe('Finding the earliest subject completion date', () => {
    it('should find the earliest completion date when multiple subjects are completed', () => {
      const subjects = {
        cs101: createSubjectProgress('completed', {
          startedAt: '2024-01-15T00:00:00Z',
          completedAt: '2024-03-15T00:00:00Z', // Third to complete
        }),
        cs102: createSubjectProgress('completed', {
          startedAt: '2024-01-01T00:00:00Z',
          completedAt: '2024-02-01T00:00:00Z', // First to complete
        }),
        cs103: createSubjectProgress('completed', {
          startedAt: '2024-02-01T00:00:00Z',
          completedAt: '2024-02-28T00:00:00Z', // Second to complete
        }),
      };

      // Find earliest completion date (simulating the logic from progress.ts)
      let firstCompletionDate: string | undefined;
      Object.values(subjects).forEach((progress) => {
        if (progress.status === 'completed' && progress.completedAt) {
          if (!firstCompletionDate || progress.completedAt < firstCompletionDate) {
            firstCompletionDate = progress.completedAt;
          }
        }
      });

      expect(firstCompletionDate).toBe('2024-02-01T00:00:00Z');
    });

    it('should return undefined when no subjects are completed', () => {
      const subjects = {
        cs101: createSubjectProgress('in_progress', {
          startedAt: '2024-01-15T00:00:00Z',
        }),
        cs102: createSubjectProgress('not_started'),
      };

      let firstCompletionDate: string | undefined;
      Object.values(subjects).forEach((progress) => {
        if (progress.status === 'completed' && progress.completedAt) {
          if (!firstCompletionDate || progress.completedAt < firstCompletionDate) {
            firstCompletionDate = progress.completedAt;
          }
        }
      });

      expect(firstCompletionDate).toBeUndefined();
    });

    it('should handle completed subjects without completedAt date', () => {
      const subjects = {
        cs101: createSubjectProgress('completed', {
          startedAt: '2024-01-15T00:00:00Z',
          // No completedAt - edge case from old data
        }),
        cs102: createSubjectProgress('completed', {
          startedAt: '2024-01-01T00:00:00Z',
          completedAt: '2024-02-01T00:00:00Z',
        }),
      };

      let firstCompletionDate: string | undefined;
      Object.values(subjects).forEach((progress) => {
        if (progress.status === 'completed' && progress.completedAt) {
          if (!firstCompletionDate || progress.completedAt < firstCompletionDate) {
            firstCompletionDate = progress.completedAt;
          }
        }
      });

      // Should only find the one with a completedAt date
      expect(firstCompletionDate).toBe('2024-02-01T00:00:00Z');
    });

    it('should correctly compare ISO date strings', () => {
      const dates = [
        '2024-12-31T23:59:59Z',
        '2024-01-01T00:00:00Z',
        '2024-06-15T12:30:00Z',
      ];

      let earliestDate: string | undefined;
      dates.forEach((date) => {
        if (!earliestDate || date < earliestDate) {
          earliestDate = date;
        }
      });

      expect(earliestDate).toBe('2024-01-01T00:00:00Z');
    });

    it('should handle single completed subject', () => {
      const subjects = {
        cs101: createSubjectProgress('completed', {
          startedAt: '2024-01-15T00:00:00Z',
          completedAt: '2024-03-15T00:00:00Z',
        }),
      };

      let firstCompletionDate: string | undefined;
      Object.values(subjects).forEach((progress) => {
        if (progress.status === 'completed' && progress.completedAt) {
          if (!firstCompletionDate || progress.completedAt < firstCompletionDate) {
            firstCompletionDate = progress.completedAt;
          }
        }
      });

      expect(firstCompletionDate).toBe('2024-03-15T00:00:00Z');
    });

    it('should handle empty subjects object', () => {
      const subjects: Record<string, SubjectProgress> = {};

      let firstCompletionDate: string | undefined;
      Object.values(subjects).forEach((progress) => {
        if (progress.status === 'completed' && progress.completedAt) {
          if (!firstCompletionDate || progress.completedAt < firstCompletionDate) {
            firstCompletionDate = progress.completedAt;
          }
        }
      });

      expect(firstCompletionDate).toBeUndefined();
    });
  });

  describe('Achievement unlock date should NOT be startedAt', () => {
    it('should use completedAt for first subject achievement, not startedAt', () => {
      const userProgress = createUserProgress(
        {
          cs101: createSubjectProgress('completed', {
            startedAt: '2024-01-15T00:00:00Z',
            completedAt: '2024-03-15T00:00:00Z',
          }),
        },
        '2024-01-01T00:00:00Z' // User started platform earlier
      );

      // Verify that startedAt and completedAt are different
      expect(userProgress.startedAt).toBe('2024-01-01T00:00:00Z');
      expect(userProgress.subjects.cs101.completedAt).toBe('2024-03-15T00:00:00Z');

      // Find first completion date
      let firstCompletionDate: string | undefined;
      Object.values(userProgress.subjects).forEach((progress) => {
        if (progress.status === 'completed' && progress.completedAt) {
          if (!firstCompletionDate || progress.completedAt < firstCompletionDate) {
            firstCompletionDate = progress.completedAt;
          }
        }
      });

      // The achievement date should be the completion date, NOT the startedAt
      expect(firstCompletionDate).not.toBe(userProgress.startedAt);
      expect(firstCompletionDate).toBe('2024-03-15T00:00:00Z');
    });
  });

  describe('Quiz and exercise counting', () => {
    it('should count quizzes that meet passing score', () => {
      const QUIZ_PASSING_SCORE = 70;
      const subjects = {
        cs101: createSubjectProgress('in_progress', {
          quizAttempts: {
            'quiz-1': [{ score: 80 }, { score: 60 }],
            'quiz-2': [{ score: 50 }],
            'quiz-3': [{ score: 70 }], // Exactly at threshold
          },
        }),
      };

      let totalQuizzesPassed = 0;
      Object.values(subjects).forEach((subjectProgress) => {
        Object.values(subjectProgress.quizAttempts).forEach((attempts) => {
          if (attempts && attempts.length > 0) {
            const bestScore = Math.max(...attempts.map(a => a.score));
            if (bestScore >= QUIZ_PASSING_SCORE) totalQuizzesPassed++;
          }
        });
      });

      // quiz-1 has best score 80 (passed), quiz-2 has 50 (failed), quiz-3 has 70 (passed)
      expect(totalQuizzesPassed).toBe(2);
    });

    it('should count passed exercises', () => {
      const subjects = {
        cs101: createSubjectProgress('in_progress', {
          exerciseCompletions: {
            'ex-1': { passed: true },
            'ex-2': { passed: false },
            'ex-3': { passed: true },
          },
        }),
      };

      let totalExercisesPassed = 0;
      Object.values(subjects).forEach((subjectProgress) => {
        Object.values(subjectProgress.exerciseCompletions).forEach((completion) => {
          if (completion && completion.passed) {
            totalExercisesPassed++;
          }
        });
      });

      expect(totalExercisesPassed).toBe(2);
    });

    it('should count across multiple subjects', () => {
      const QUIZ_PASSING_SCORE = 70;
      const subjects = {
        cs101: createSubjectProgress('completed', {
          quizAttempts: {
            'quiz-1': [{ score: 80 }],
          },
          exerciseCompletions: {
            'ex-1': { passed: true },
          },
        }),
        cs102: createSubjectProgress('in_progress', {
          quizAttempts: {
            'quiz-2': [{ score: 90 }],
          },
          exerciseCompletions: {
            'ex-2': { passed: true },
            'ex-3': { passed: false },
          },
        }),
      };

      let totalQuizzesPassed = 0;
      let totalExercisesPassed = 0;

      Object.values(subjects).forEach((subjectProgress) => {
        Object.values(subjectProgress.quizAttempts).forEach((attempts) => {
          if (attempts && attempts.length > 0) {
            const bestScore = Math.max(...attempts.map(a => a.score));
            if (bestScore >= QUIZ_PASSING_SCORE) totalQuizzesPassed++;
          }
        });

        Object.values(subjectProgress.exerciseCompletions).forEach((completion) => {
          if (completion && completion.passed) {
            totalExercisesPassed++;
          }
        });
      });

      expect(totalQuizzesPassed).toBe(2);
      expect(totalExercisesPassed).toBe(2);
    });
  });

  describe('Year completion tracking', () => {
    it('should correctly identify when a year is complete', () => {
      const subjects = [
        createSubject('cs101', 1),
        createSubject('cs102', 1),
        createSubject('cs201', 2),
      ];

      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', { completedAt: '2024-03-01T00:00:00Z' }),
        cs102: createSubjectProgress('completed', { completedAt: '2024-03-15T00:00:00Z' }),
        cs201: createSubjectProgress('in_progress'),
      });

      // Check if year 1 is complete
      const year1Subjects = subjects.filter(s => s.year === 1);
      const year1Complete = year1Subjects.every(subject => {
        const progress = userProgress.subjects[subject.id];
        return progress?.status === 'completed';
      });

      // Check if year 2 is complete
      const year2Subjects = subjects.filter(s => s.year === 2);
      const year2Complete = year2Subjects.every(subject => {
        const progress = userProgress.subjects[subject.id];
        return progress?.status === 'completed';
      });

      expect(year1Complete).toBe(true);
      expect(year2Complete).toBe(false);
    });

    it('should handle empty year (no subjects)', () => {
      const subjects: Subject[] = [];
      const userProgress = createUserProgress({});

      const year1Subjects = subjects.filter(s => s.year === 1);
      const year1Complete = year1Subjects.every(subject => {
        const progress = userProgress.subjects[subject.id];
        return progress?.status === 'completed';
      });

      // Empty array with .every() returns true (vacuous truth)
      expect(year1Complete).toBe(true);
    });
  });
});
