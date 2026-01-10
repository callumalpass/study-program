/**
 * Progress Achievements Filtering Tests
 *
 * Tests for verifying that achievement calculations only count stats
 * from subjects that are in the filtered/selected subjects list.
 * This ensures achievements are consistent with the user's course selection.
 */

import { describe, it, expect } from 'vitest';
import type { Subject, UserProgress, SubjectProgress, QuizAttempt, ExerciseCompletion } from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

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

// Helper to create subject progress with quiz and exercise data
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
    subtopicViews: {},
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

/**
 * Simulates the achievement calculation logic from progress.ts
 * This allows us to test the filtering behavior without needing to render the page
 */
function calculateAchievementStats(
  subjects: Subject[],
  userProgress: UserProgress
): {
  totalQuizzesPassed: number;
  totalExercisesPassed: number;
  firstCompletionDate: string | undefined;
} {
  const selectedSubjectIds = new Set(subjects.map(s => s.id));
  let totalQuizzesPassed = 0;
  let totalExercisesPassed = 0;
  let firstCompletionDate: string | undefined;

  Object.entries(userProgress.subjects).forEach(([subjectId, subjectProgress]) => {
    // Only count stats for subjects in the filtered list
    if (!selectedSubjectIds.has(subjectId)) return;

    if (subjectProgress.status === 'completed' && subjectProgress.completedAt) {
      if (!firstCompletionDate || subjectProgress.completedAt < firstCompletionDate) {
        firstCompletionDate = subjectProgress.completedAt;
      }
    }

    Object.values(subjectProgress.quizAttempts).forEach((attempts) => {
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: { score: number }) => a.score));
        if (bestScore >= QUIZ_PASSING_SCORE) totalQuizzesPassed++;
      }
    });

    Object.values(subjectProgress.exerciseCompletions).forEach((completion) => {
      if (completion && completion.passed) {
        totalExercisesPassed++;
      }
    });
  });

  return { totalQuizzesPassed, totalExercisesPassed, firstCompletionDate };
}

describe('Achievement calculations with subject filtering', () => {
  describe('Quiz counting respects subject filter', () => {
    it('should only count quizzes from selected subjects', () => {
      // Create user progress with quizzes in multiple subjects
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          completedAt: '2024-02-01T00:00:00Z',
          quizAttempts: {
            'cs101-quiz-1': [{ score: 80 }],
            'cs101-quiz-2': [{ score: 90 }],
          },
        }),
        cs102: createSubjectProgress('in_progress', {
          quizAttempts: {
            'cs102-quiz-1': [{ score: 85 }],
          },
        }),
        cs103: createSubjectProgress('completed', {
          completedAt: '2024-03-01T00:00:00Z',
          quizAttempts: {
            'cs103-quiz-1': [{ score: 75 }],
            'cs103-quiz-2': [{ score: 95 }],
          },
        }),
      });

      // Only include cs101 and cs102 in the filtered subjects
      const filteredSubjects = [
        createSubject('cs101'),
        createSubject('cs102'),
      ];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);

      // Should only count 3 quizzes (2 from cs101, 1 from cs102)
      // cs103's quizzes should be excluded
      expect(stats.totalQuizzesPassed).toBe(3);
    });

    it('should count zero quizzes when no subjects are selected', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          quizAttempts: {
            'cs101-quiz-1': [{ score: 80 }],
          },
        }),
      });

      // Empty filtered subjects list
      const filteredSubjects: Subject[] = [];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);
      expect(stats.totalQuizzesPassed).toBe(0);
    });

    it('should handle subjects with no quiz data gracefully', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          completedAt: '2024-02-01T00:00:00Z',
          // No quiz attempts
        }),
      });

      const filteredSubjects = [createSubject('cs101')];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);
      expect(stats.totalQuizzesPassed).toBe(0);
    });
  });

  describe('Exercise counting respects subject filter', () => {
    it('should only count exercises from selected subjects', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          exerciseCompletions: {
            'cs101-ex-1': { passed: true },
            'cs101-ex-2': { passed: true },
            'cs101-ex-3': { passed: false },
          },
        }),
        cs102: createSubjectProgress('in_progress', {
          exerciseCompletions: {
            'cs102-ex-1': { passed: true },
          },
        }),
        cs103: createSubjectProgress('completed', {
          exerciseCompletions: {
            'cs103-ex-1': { passed: true },
            'cs103-ex-2': { passed: true },
          },
        }),
      });

      // Only include cs101 and cs102
      const filteredSubjects = [
        createSubject('cs101'),
        createSubject('cs102'),
      ];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);

      // Should count 3 passed exercises (2 from cs101, 1 from cs102)
      // cs103's exercises should be excluded
      expect(stats.totalExercisesPassed).toBe(3);
    });

    it('should not count failed exercises', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('in_progress', {
          exerciseCompletions: {
            'cs101-ex-1': { passed: false },
            'cs101-ex-2': { passed: false },
          },
        }),
      });

      const filteredSubjects = [createSubject('cs101')];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);
      expect(stats.totalExercisesPassed).toBe(0);
    });
  });

  describe('First completion date respects subject filter', () => {
    it('should only find completion date from selected subjects', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          completedAt: '2024-03-15T00:00:00Z', // Later
        }),
        cs102: createSubjectProgress('completed', {
          completedAt: '2024-01-15T00:00:00Z', // Earlier but excluded
        }),
        cs103: createSubjectProgress('completed', {
          completedAt: '2024-02-15T00:00:00Z', // Middle
        }),
      });

      // Only include cs101 and cs103 (exclude cs102 which has the earliest date)
      const filteredSubjects = [
        createSubject('cs101'),
        createSubject('cs103'),
      ];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);

      // Should find cs103's date as earliest among filtered subjects
      expect(stats.firstCompletionDate).toBe('2024-02-15T00:00:00Z');
    });

    it('should return undefined when no filtered subjects are completed', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          completedAt: '2024-02-01T00:00:00Z',
        }),
        cs102: createSubjectProgress('in_progress'),
      });

      // Only include cs102 (which is not completed)
      const filteredSubjects = [createSubject('cs102')];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);
      expect(stats.firstCompletionDate).toBeUndefined();
    });

    it('should handle completed subjects without completedAt date', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          // No completedAt - legacy data
        }),
        cs102: createSubjectProgress('completed', {
          completedAt: '2024-02-01T00:00:00Z',
        }),
      });

      const filteredSubjects = [
        createSubject('cs101'),
        createSubject('cs102'),
      ];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);

      // Should only find cs102's date since cs101 has no completedAt
      expect(stats.firstCompletionDate).toBe('2024-02-01T00:00:00Z');
    });
  });

  describe('Mixed filtering scenarios', () => {
    it('should handle user progress with subjects not in curriculum', () => {
      // User has progress for subjects that don't exist in current curriculum
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          completedAt: '2024-02-01T00:00:00Z',
          quizAttempts: { 'quiz-1': [{ score: 85 }] },
        }),
        'old-subject': createSubjectProgress('completed', {
          completedAt: '2024-01-01T00:00:00Z',
          quizAttempts: { 'quiz-1': [{ score: 90 }] },
          exerciseCompletions: { 'ex-1': { passed: true } },
        }),
      });

      // Only cs101 is in the filtered subjects
      const filteredSubjects = [createSubject('cs101')];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);

      expect(stats.totalQuizzesPassed).toBe(1);
      expect(stats.totalExercisesPassed).toBe(0);
      expect(stats.firstCompletionDate).toBe('2024-02-01T00:00:00Z');
    });

    it('should handle empty user progress with subjects defined', () => {
      const userProgress = createUserProgress({});
      const filteredSubjects = [
        createSubject('cs101'),
        createSubject('cs102'),
      ];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);

      expect(stats.totalQuizzesPassed).toBe(0);
      expect(stats.totalExercisesPassed).toBe(0);
      expect(stats.firstCompletionDate).toBeUndefined();
    });

    it('should correctly aggregate stats across multiple selected subjects', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          completedAt: '2024-03-01T00:00:00Z',
          quizAttempts: {
            'q1': [{ score: 80 }],
            'q2': [{ score: 60 }], // Failed
          },
          exerciseCompletions: {
            'e1': { passed: true },
            'e2': { passed: true },
          },
        }),
        cs102: createSubjectProgress('completed', {
          completedAt: '2024-02-01T00:00:00Z', // Earliest
          quizAttempts: {
            'q1': [{ score: 75 }],
          },
          exerciseCompletions: {
            'e1': { passed: true },
          },
        }),
        cs103: createSubjectProgress('in_progress', {
          quizAttempts: {
            'q1': [{ score: 90 }],
          },
          exerciseCompletions: {
            'e1': { passed: true },
            'e2': { passed: false },
          },
        }),
      });

      const filteredSubjects = [
        createSubject('cs101'),
        createSubject('cs102'),
        createSubject('cs103'),
      ];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);

      // Quizzes: cs101 has 1 passed (80), cs102 has 1 (75), cs103 has 1 (90) = 3
      expect(stats.totalQuizzesPassed).toBe(3);

      // Exercises: cs101 has 2, cs102 has 1, cs103 has 1 = 4
      expect(stats.totalExercisesPassed).toBe(4);

      // First completion: cs102's 2024-02-01
      expect(stats.firstCompletionDate).toBe('2024-02-01T00:00:00Z');
    });
  });

  describe('Edge cases', () => {
    it('should handle quiz with exactly passing score', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('in_progress', {
          quizAttempts: {
            'quiz-1': [{ score: QUIZ_PASSING_SCORE }], // Exactly at threshold
            'quiz-2': [{ score: QUIZ_PASSING_SCORE - 1 }], // Just below
          },
        }),
      });

      const filteredSubjects = [createSubject('cs101')];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);
      expect(stats.totalQuizzesPassed).toBe(1);
    });

    it('should use best score from multiple quiz attempts', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('in_progress', {
          quizAttempts: {
            'quiz-1': [
              { score: 50 },  // Failed
              { score: 65 },  // Failed
              { score: 75 },  // Passed - best
              { score: 70 },  // Passed but not best
            ],
          },
        }),
      });

      const filteredSubjects = [createSubject('cs101')];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);

      // Should count as 1 passed quiz (best score is 75)
      expect(stats.totalQuizzesPassed).toBe(1);
    });

    it('should handle subjects array with duplicates', () => {
      const userProgress = createUserProgress({
        cs101: createSubjectProgress('completed', {
          completedAt: '2024-02-01T00:00:00Z',
          quizAttempts: { 'q1': [{ score: 80 }] },
          exerciseCompletions: { 'e1': { passed: true } },
        }),
      });

      // Duplicate subject in the list (shouldn't happen but should be handled)
      const filteredSubjects = [
        createSubject('cs101'),
        createSubject('cs101'),
      ];

      const stats = calculateAchievementStats(filteredSubjects, userProgress);

      // Should still only count once
      expect(stats.totalQuizzesPassed).toBe(1);
      expect(stats.totalExercisesPassed).toBe(1);
    });
  });
});
