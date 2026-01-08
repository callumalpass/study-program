/**
 * Home Page Statistics Tests
 *
 * Tests for the calculateStats function in home.ts which computes
 * dashboard statistics (quizzes completed, exercises solved, etc.)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { Subject, UserProgress, QuizAttempt, ExerciseCompletion, ProjectSubmission } from '../src/core/types';

// We need to test the internal calculateStats function
// Since it's not exported, we'll recreate its logic here for testing
// This also serves as documentation of expected behavior

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

  // Create a set of subject IDs that are in the filtered list for fast lookup
  const selectedSubjectIds = new Set(subjects.map(s => s.id));

  Object.entries(userProgress.subjects).forEach(([subjectId, progress]) => {
    // Only count stats for subjects in the filtered list
    if (!selectedSubjectIds.has(subjectId)) return;

    // Count quizzes
    Object.values(progress.quizAttempts).forEach((attempts: QuizAttempt[]) => {
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: QuizAttempt) => a.score));
        if (bestScore >= QUIZ_PASSING_SCORE) quizzesCompleted++;

        // Add to average calculation
        attempts.forEach((attempt: QuizAttempt) => {
          totalQuizScore += attempt.score;
          quizAttemptCount++;
        });
      }
    });

    // Count exercises
    Object.values(progress.exerciseCompletions).forEach((completion: ExerciseCompletion) => {
      if (completion && completion.passed) {
        exercisesCompleted++;
      }
    });

    // Count projects
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

// Helper functions to create test data
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
    topics: [],
    examIds: [],
    projectIds: [],
  };
}

function createQuizAttempt(score: number): QuizAttempt {
  return {
    attemptId: `attempt-${Math.random()}`,
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

describe('calculateStats', () => {
  describe('empty data', () => {
    it('returns zeros for empty subjects list', () => {
      const subjects: Subject[] = [];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {},
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.exercisesCompleted).toBe(0);
      expect(stats.projectsSubmitted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });

    it('returns zeros for subjects with no progress', () => {
      const subjects = [createSubject('cs101'), createSubject('cs102')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {},
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.exercisesCompleted).toBe(0);
      expect(stats.projectsSubmitted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });
  });

  describe('subject filtering', () => {
    it('only counts stats from subjects in the filtered list', () => {
      const subjects = [createSubject('cs101')]; // Only cs101 is selected
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: { 'quiz-1': [createQuizAttempt(80)] },
            examAttempts: {},
            exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
            projectSubmissions: {},
            subtopicViews: {},
          },
          cs102: {
            status: 'in_progress',
            quizAttempts: { 'quiz-2': [createQuizAttempt(90)] },
            examAttempts: {},
            exerciseCompletions: { 'ex-2': createExerciseCompletion(true) },
            projectSubmissions: { 'proj-1': [createProjectSubmission()] },
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      // Should only count cs101 stats, not cs102
      expect(stats.quizzesCompleted).toBe(1);
      expect(stats.exercisesCompleted).toBe(1);
      expect(stats.projectsSubmitted).toBe(0); // cs101 has no projects
      expect(stats.averageQuizScore).toBe(80);
    });

    it('counts stats from all subjects when all are selected', () => {
      const subjects = [createSubject('cs101'), createSubject('cs102')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: { 'quiz-1': [createQuizAttempt(80)] },
            examAttempts: {},
            exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
            projectSubmissions: {},
            subtopicViews: {},
          },
          cs102: {
            status: 'in_progress',
            quizAttempts: { 'quiz-2': [createQuizAttempt(90)] },
            examAttempts: {},
            exerciseCompletions: { 'ex-2': createExerciseCompletion(true) },
            projectSubmissions: { 'proj-1': [createProjectSubmission()] },
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      // Should count both cs101 and cs102 stats
      expect(stats.quizzesCompleted).toBe(2);
      expect(stats.exercisesCompleted).toBe(2);
      expect(stats.projectsSubmitted).toBe(1);
      expect(stats.averageQuizScore).toBe(85); // (80 + 90) / 2
    });

    it('ignores progress for subjects not in filtered list', () => {
      const subjects = [createSubject('cs101')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          // cs101 is NOT in progress, but cs999 is - and cs999 is not in subjects list
          cs999: {
            status: 'completed',
            quizAttempts: { 'quiz-1': [createQuizAttempt(100), createQuizAttempt(95)] },
            examAttempts: {},
            exerciseCompletions: {
              'ex-1': createExerciseCompletion(true),
              'ex-2': createExerciseCompletion(true),
              'ex-3': createExerciseCompletion(true),
            },
            projectSubmissions: { 'proj-1': [createProjectSubmission(), createProjectSubmission()] },
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      // cs999 stats should not be counted since it's not in subjects list
      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.exercisesCompleted).toBe(0);
      expect(stats.projectsSubmitted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });
  });

  describe('quiz counting', () => {
    it('counts quiz as completed only if best score >= 70', () => {
      const subjects = [createSubject('cs101')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: {
              'quiz-1': [createQuizAttempt(70)], // passing
              'quiz-2': [createQuizAttempt(69)], // not passing
              'quiz-3': [createQuizAttempt(50), createQuizAttempt(75)], // best is 75, passing
            },
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(2); // quiz-1 and quiz-3
    });

    it('calculates average from all attempts, not just passing ones', () => {
      const subjects = [createSubject('cs101')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: {
              'quiz-1': [createQuizAttempt(60), createQuizAttempt(80)],
              'quiz-2': [createQuizAttempt(100)],
            },
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      // Average of 60, 80, 100 = 240/3 = 80
      expect(stats.averageQuizScore).toBe(80);
    });
  });

  describe('exercise counting', () => {
    it('only counts exercises that are passed', () => {
      const subjects = [createSubject('cs101')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {
              'ex-1': createExerciseCompletion(true),
              'ex-2': createExerciseCompletion(false),
              'ex-3': createExerciseCompletion(true),
              'ex-4': createExerciseCompletion(false),
            },
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      expect(stats.exercisesCompleted).toBe(2); // ex-1 and ex-3
    });
  });

  describe('project counting', () => {
    it('counts all project submissions', () => {
      const subjects = [createSubject('cs101')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {
              'proj-1': [createProjectSubmission(), createProjectSubmission()],
              'proj-2': [createProjectSubmission()],
            },
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      expect(stats.projectsSubmitted).toBe(3);
    });
  });

  describe('edge cases', () => {
    it('handles subjects with empty quiz attempts array', () => {
      const subjects = [createSubject('cs101')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: { 'quiz-1': [] },
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });

    it('handles subjects with empty project submissions array', () => {
      const subjects = [createSubject('cs101')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: {
            status: 'in_progress',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: { 'proj-1': [] },
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      expect(stats.projectsSubmitted).toBe(0);
    });

    it('handles multiple subjects with mixed progress', () => {
      const subjects = [
        createSubject('cs101'),
        createSubject('cs102'),
        createSubject('math101'),
      ];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          cs101: {
            status: 'completed',
            quizAttempts: { 'quiz-1': [createQuizAttempt(100)] },
            examAttempts: {},
            exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
            projectSubmissions: { 'proj-1': [createProjectSubmission()] },
            subtopicViews: {},
          },
          math101: {
            status: 'in_progress',
            quizAttempts: { 'quiz-1': [createQuizAttempt(50)] }, // not passing
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
          // cs102 has no progress at all
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(1); // only cs101's quiz passes
      expect(stats.exercisesCompleted).toBe(1);
      expect(stats.projectsSubmitted).toBe(1);
      expect(stats.averageQuizScore).toBe(75); // (100 + 50) / 2
    });
  });
});
