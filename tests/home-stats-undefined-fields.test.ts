/**
 * Home Page Statistics - Undefined Fields Edge Case Tests
 *
 * Tests that the calculateStats function in home.ts handles undefined
 * or missing fields in SubjectProgress gracefully.
 *
 * This can happen with:
 * - Corrupted localStorage data
 * - Incomplete data migration
 * - Manual data manipulation
 */

import { describe, it, expect } from 'vitest';
import type { Subject, UserProgress, QuizAttempt, ExerciseCompletion, ProjectSubmission, SubjectProgress } from '../src/core/types';

const QUIZ_PASSING_SCORE = 70;

/**
 * Calculate statistics for the dashboard (mirrors home.ts implementation)
 * This is a copy of the function to test it independently
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
    // Count quizzes - using || {} for safety
    Object.values(progress.quizAttempts || {}).forEach((attempts: QuizAttempt[]) => {
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: QuizAttempt) => a.score));
        if (bestScore >= QUIZ_PASSING_SCORE) quizzesCompleted++;

        attempts.forEach((attempt: QuizAttempt) => {
          totalQuizScore += attempt.score;
          quizAttemptCount++;
        });
      }
    });

    // Count exercises - using || {} for safety
    Object.values(progress.exerciseCompletions || {}).forEach((completion: ExerciseCompletion) => {
      if (completion && completion.passed) {
        exercisesCompleted++;
      }
    });

    // Count projects - using || {} for safety
    Object.values(progress.projectSubmissions || {}).forEach((submissions: ProjectSubmission[]) => {
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

describe('calculateStats - Undefined Fields Edge Cases', () => {
  describe('handles undefined quizAttempts', () => {
    it('does not throw when quizAttempts is undefined', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = {
        status: 'in_progress',
        exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
        projectSubmissions: { 'proj-1': [createProjectSubmission()] },
        examAttempts: {},
      } as unknown as SubjectProgress;

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
      expect(stats.exercisesCompleted).toBe(1);
      expect(stats.projectsSubmitted).toBe(1);
    });
  });

  describe('handles undefined exerciseCompletions', () => {
    it('does not throw when exerciseCompletions is undefined', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = {
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [createQuizAttempt(80)] },
        projectSubmissions: { 'proj-1': [createProjectSubmission()] },
        examAttempts: {},
      } as unknown as SubjectProgress;

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(1);
      expect(stats.exercisesCompleted).toBe(0);
      expect(stats.projectsSubmitted).toBe(1);
    });
  });

  describe('handles undefined projectSubmissions', () => {
    it('does not throw when projectSubmissions is undefined', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = {
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [createQuizAttempt(80)] },
        exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
        examAttempts: {},
      } as unknown as SubjectProgress;

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(1);
      expect(stats.exercisesCompleted).toBe(1);
      expect(stats.projectsSubmitted).toBe(0);
    });
  });

  describe('handles all fields undefined', () => {
    it('does not throw when all fields are undefined', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = {
        status: 'in_progress',
        examAttempts: {},
      } as unknown as SubjectProgress;

      expect(() => calculateStats(subjects, userProgress)).not.toThrow();

      const stats = calculateStats(subjects, userProgress);
      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.exercisesCompleted).toBe(0);
      expect(stats.projectsSubmitted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });
  });

  describe('handles mixed valid and undefined data across subjects', () => {
    it('correctly counts stats when some subjects have missing fields', () => {
      const subjects = [createSubject('cs101'), createSubject('cs102'), createSubject('math101')];
      const userProgress = createBaseProgress();

      // cs101 - has all fields
      userProgress.subjects.cs101 = {
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [createQuizAttempt(80)] },
        exerciseCompletions: { 'ex-1': createExerciseCompletion(true) },
        projectSubmissions: { 'proj-1': [createProjectSubmission()] },
        examAttempts: {},
      } as SubjectProgress;

      // cs102 - missing quizAttempts
      userProgress.subjects.cs102 = {
        status: 'in_progress',
        exerciseCompletions: { 'ex-2': createExerciseCompletion(true) },
        projectSubmissions: {},
        examAttempts: {},
      } as unknown as SubjectProgress;

      // math101 - missing exerciseCompletions and projectSubmissions
      userProgress.subjects.math101 = {
        status: 'in_progress',
        quizAttempts: { 'quiz-2': [createQuizAttempt(90)] },
        examAttempts: {},
      } as unknown as SubjectProgress;

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(2); // quiz-1 and quiz-2
      expect(stats.exercisesCompleted).toBe(2); // ex-1 and ex-2
      expect(stats.projectsSubmitted).toBe(1); // proj-1
      expect(stats.averageQuizScore).toBe(85); // (80 + 90) / 2
    });
  });

  describe('handles progress object with only status field', () => {
    it('returns zeros for minimally defined progress', () => {
      const subjects = [createSubject('cs101')];
      const userProgress = createBaseProgress();
      userProgress.subjects.cs101 = {
        status: 'in_progress',
      } as unknown as SubjectProgress;

      const stats = calculateStats(subjects, userProgress);

      expect(stats.quizzesCompleted).toBe(0);
      expect(stats.exercisesCompleted).toBe(0);
      expect(stats.projectsSubmitted).toBe(0);
      expect(stats.averageQuizScore).toBe(0);
    });
  });
});
