/**
 * Progress Calculation Edge Cases Tests
 *
 * These tests focus on edge cases in progress calculation that might not be
 * covered by the main progress.test.ts file, particularly around:
 * - Boundary conditions for passing scores
 * - Mixed completion states
 * - Edge cases with empty/undefined data
 */

import { describe, expect, it } from 'vitest';
import type {
  Subject,
  SubjectProgress,
  UserProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
} from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';
import {
  calculateSubjectCompletion,
  arePrerequisitesMet,
  getAvailableSubjects,
  canStartSubject,
  isQuizCompleted,
  isExerciseCompleted,
  getQuizBestScore,
} from '../src/core/progress';

const now = new Date('2024-01-01T00:00:00.000Z').toISOString();

// Helper functions
const makeQuizAttempt = (score: number): QuizAttempt => ({
  attemptId: `attempt-${score}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 42,
});

const makeExamAttempt = (score: number): ExamAttempt => ({
  attemptId: `exam-${score}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 120,
});

const makeExerciseCompletion = (passed: boolean): ExerciseCompletion => ({
  completionId: passed ? 'pass' : 'fail',
  timestamp: now,
  code: 'print("hi")',
  passed,
  timeSpentSeconds: 30,
});

const makeProjectSubmission = (score?: number): ProjectSubmission => ({
  submissionId: `sub-${score ?? 'na'}`,
  timestamp: now,
  description: 'submission',
  selfAssessment: {},
  notes: '',
  aiEvaluation: score === undefined
    ? undefined
    : {
        score,
        feedback: 'ok',
        rubricScores: {},
        strengths: [],
        improvements: [],
      },
});

const makeProgress = (overrides?: Partial<SubjectProgress>): SubjectProgress => ({
  status: 'not_started',
  quizAttempts: {},
  examAttempts: {},
  exerciseCompletions: {},
  projectSubmissions: {},
  subtopicViews: {},
  ...overrides,
});

const makeUserProgress = (subjects: Record<string, SubjectProgress>): UserProgress => ({
  version: 4,
  startedAt: now,
  subjects,
  settings: {
    theme: 'auto',
    codeEditorFontSize: 14,
    showCompletedItems: true,
  },
});

const subjectTemplate = (overrides: Partial<Subject>): Subject => ({
  id: 'cs101',
  code: 'CS101',
  title: 'Intro',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'desc',
  learningObjectives: [],
  estimatedHours: 40,
  topics: [
    {
      id: 'topic-1',
      title: 'Topic 1',
      subtopics: [{ id: 'subtopic-1', title: 'Subtopic 1' }],
      quizIds: ['quiz-1'],
      exerciseIds: ['exercise-1'],
    },
  ],
  ...overrides,
});

describe('Progress Calculation Edge Cases', () => {
  describe('calculateSubjectCompletion boundary conditions', () => {
    it('returns 0 for undefined progress', () => {
      const subject = subjectTemplate({});
      expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
    });

    it('returns 0 for not_started status even with some attempts', () => {
      const subject = subjectTemplate({});
      const progress = makeProgress({
        status: 'not_started',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(100)] },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('returns 100 for completed status regardless of actual items', () => {
      const subject = subjectTemplate({});
      const progress = makeProgress({
        status: 'completed',
        quizAttempts: {},  // No attempts
        exerciseCompletions: {},  // No completions
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('correctly calculates when score is exactly at passing threshold', () => {
      const subject = subjectTemplate({});
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(QUIZ_PASSING_SCORE)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      // Both quiz and exercise passed, so 100%
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('correctly calculates when score is just below passing threshold', () => {
      const subject = subjectTemplate({});
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [makeQuizAttempt(QUIZ_PASSING_SCORE - 1)],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      // Quiz not passed, exercise passed: 1/2 = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('returns 0 for subject with no quizzes, exercises, exams, or projects', () => {
      const subject = subjectTemplate({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          subtopics: [],
          quizIds: [],
          exerciseIds: [],
        }],
        examIds: undefined,
        projectIds: undefined,
      });
      const progress = makeProgress({ status: 'in_progress' });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('considers best score among multiple attempts', () => {
      const subject = subjectTemplate({});
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [
            makeQuizAttempt(30),  // Failed
            makeQuizAttempt(80),  // Passed
            makeQuizAttempt(50),  // Failed
          ],
        },
        exerciseCompletions: {
          'exercise-1': makeExerciseCompletion(true),
        },
      });
      // Best score is 80 (passing), so quiz counts as completed
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('exam completion calculation', () => {
    it('includes exams in completion calculation', () => {
      const subject = subjectTemplate({
        examIds: ['exam-1'],
      });
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(100)] },
        exerciseCompletions: { 'exercise-1': makeExerciseCompletion(true) },
        examAttempts: { 'exam-1': [makeExamAttempt(100)] },
      });
      // 3 items, all passed
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles exam with failing score', () => {
      const subject = subjectTemplate({
        examIds: ['exam-1'],
      });
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(100)] },
        exerciseCompletions: { 'exercise-1': makeExerciseCompletion(true) },
        examAttempts: { 'exam-1': [makeExamAttempt(50)] },
      });
      // 3 items, 2 passed: 67%
      expect(calculateSubjectCompletion(subject, progress)).toBe(67);
    });

    it('handles missing examAttempts property', () => {
      const subject = subjectTemplate({
        examIds: ['exam-1'],
      });
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(100)] },
        exerciseCompletions: { 'exercise-1': makeExerciseCompletion(true) },
        // examAttempts is undefined
      });
      // 3 items, 2 passed: 67%
      expect(calculateSubjectCompletion(subject, progress)).toBe(67);
    });
  });

  describe('project completion calculation', () => {
    it('counts project with AI evaluation as complete when passing', () => {
      const subject = subjectTemplate({
        projectIds: ['project-1'],
      });
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(100)] },
        exerciseCompletions: { 'exercise-1': makeExerciseCompletion(true) },
        projectSubmissions: { 'project-1': [makeProjectSubmission(80)] },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts project without AI evaluation as complete', () => {
      const subject = subjectTemplate({
        projectIds: ['project-1'],
      });
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(100)] },
        exerciseCompletions: { 'exercise-1': makeExerciseCompletion(true) },
        projectSubmissions: { 'project-1': [makeProjectSubmission(undefined)] },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('does not count project with failing AI evaluation', () => {
      const subject = subjectTemplate({
        projectIds: ['project-1'],
      });
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(100)] },
        exerciseCompletions: { 'exercise-1': makeExerciseCompletion(true) },
        projectSubmissions: { 'project-1': [makeProjectSubmission(50)] },
      });
      // 3 items, 2 passed: 67%
      expect(calculateSubjectCompletion(subject, progress)).toBe(67);
    });

    it('picks best project submission', () => {
      const subject = subjectTemplate({
        projectIds: ['project-1'],
      });
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(100)] },
        exerciseCompletions: { 'exercise-1': makeExerciseCompletion(true) },
        projectSubmissions: {
          'project-1': [
            makeProjectSubmission(30),
            makeProjectSubmission(90),
            makeProjectSubmission(60),
          ],
        },
      });
      // Best project score is 90 (passing)
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('isQuizCompleted', () => {
    it('returns false for undefined progress', () => {
      expect(isQuizCompleted('quiz-1', undefined)).toBe(false);
    });

    it('returns false for quiz with no attempts', () => {
      const progress = makeProgress({ status: 'in_progress' });
      expect(isQuizCompleted('quiz-1', progress)).toBe(false);
    });

    it('returns false for quiz with empty attempts array', () => {
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [] },
      });
      expect(isQuizCompleted('quiz-1', progress)).toBe(false);
    });

    it('returns true when best score is exactly passing', () => {
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(QUIZ_PASSING_SCORE)] },
      });
      expect(isQuizCompleted('quiz-1', progress)).toBe(true);
    });

    it('returns false when best score is just below passing', () => {
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(QUIZ_PASSING_SCORE - 1)] },
      });
      expect(isQuizCompleted('quiz-1', progress)).toBe(false);
    });
  });

  describe('getQuizBestScore', () => {
    it('returns null for undefined progress', () => {
      expect(getQuizBestScore('quiz-1', undefined)).toBe(null);
    });

    it('returns null for quiz with no attempts', () => {
      const progress = makeProgress({ status: 'in_progress' });
      expect(getQuizBestScore('quiz-1', progress)).toBe(null);
    });

    it('returns null for quiz with empty attempts array', () => {
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [] },
      });
      expect(getQuizBestScore('quiz-1', progress)).toBe(null);
    });

    it('returns highest score among multiple attempts', () => {
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [
            makeQuizAttempt(30),
            makeQuizAttempt(100),
            makeQuizAttempt(50),
          ],
        },
      });
      expect(getQuizBestScore('quiz-1', progress)).toBe(100);
    });

    it('returns 0 when all attempts have score 0', () => {
      const progress = makeProgress({
        status: 'in_progress',
        quizAttempts: { 'quiz-1': [makeQuizAttempt(0), makeQuizAttempt(0)] },
      });
      expect(getQuizBestScore('quiz-1', progress)).toBe(0);
    });
  });

  describe('isExerciseCompleted', () => {
    it('returns false for undefined progress', () => {
      expect(isExerciseCompleted('exercise-1', undefined)).toBe(false);
    });

    it('returns false for exercise with no completion', () => {
      const progress = makeProgress({ status: 'in_progress' });
      expect(isExerciseCompleted('exercise-1', progress)).toBe(false);
    });

    it('returns true for passed exercise', () => {
      const progress = makeProgress({
        status: 'in_progress',
        exerciseCompletions: { 'exercise-1': makeExerciseCompletion(true) },
      });
      expect(isExerciseCompleted('exercise-1', progress)).toBe(true);
    });

    it('returns false for failed exercise', () => {
      const progress = makeProgress({
        status: 'in_progress',
        exerciseCompletions: { 'exercise-1': makeExerciseCompletion(false) },
      });
      expect(isExerciseCompleted('exercise-1', progress)).toBe(false);
    });
  });

  describe('prerequisites edge cases', () => {
    it('returns true for subject with no prerequisites', () => {
      const subject = subjectTemplate({ prerequisites: [] });
      const userProgress = makeUserProgress({});
      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('returns true for subject with undefined prerequisites', () => {
      const subject = subjectTemplate({});
      delete (subject as any).prerequisites;
      const userProgress = makeUserProgress({});
      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('returns false when one of multiple prerequisites is not completed', () => {
      const subject = subjectTemplate({
        prerequisites: ['prereq-1', 'prereq-2', 'prereq-3'],
      });
      const userProgress = makeUserProgress({
        'prereq-1': makeProgress({ status: 'completed' }),
        'prereq-2': makeProgress({ status: 'in_progress' }),
        'prereq-3': makeProgress({ status: 'completed' }),
      });
      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });

    it('returns true when all prerequisites are completed', () => {
      const subject = subjectTemplate({
        prerequisites: ['prereq-1', 'prereq-2'],
      });
      const userProgress = makeUserProgress({
        'prereq-1': makeProgress({ status: 'completed' }),
        'prereq-2': makeProgress({ status: 'completed' }),
      });
      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('returns false when prerequisite has no progress entry', () => {
      const subject = subjectTemplate({
        prerequisites: ['prereq-1'],
      });
      const userProgress = makeUserProgress({});
      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });
  });

  describe('getAvailableSubjects', () => {
    it('returns empty array when all subjects have unmet prerequisites', () => {
      const subjects = [
        subjectTemplate({ id: 'cs201', prerequisites: ['cs101'] }),
        subjectTemplate({ id: 'cs202', prerequisites: ['cs101'] }),
      ];
      const userProgress = makeUserProgress({});
      expect(getAvailableSubjects(subjects, userProgress)).toEqual([]);
    });

    it('returns subjects with no prerequisites', () => {
      const subjects = [
        subjectTemplate({ id: 'cs101', prerequisites: [] }),
        subjectTemplate({ id: 'cs201', prerequisites: ['cs101'] }),
      ];
      const userProgress = makeUserProgress({});
      const available = getAvailableSubjects(subjects, userProgress);
      expect(available.length).toBe(1);
      expect(available[0].id).toBe('cs101');
    });

    it('returns empty array for empty subjects list', () => {
      const userProgress = makeUserProgress({});
      expect(getAvailableSubjects([], userProgress)).toEqual([]);
    });
  });

  describe('canStartSubject', () => {
    it('returns false for already completed subject', () => {
      const subject = subjectTemplate({ prerequisites: [] });
      const userProgress = makeUserProgress({
        cs101: makeProgress({ status: 'completed' }),
      });
      expect(canStartSubject(subject, userProgress)).toBe(false);
    });

    it('returns true for subject with no progress and met prerequisites', () => {
      const subject = subjectTemplate({ prerequisites: [] });
      const userProgress = makeUserProgress({});
      expect(canStartSubject(subject, userProgress)).toBe(true);
    });

    it('returns true for in_progress subject with met prerequisites', () => {
      const subject = subjectTemplate({ prerequisites: [] });
      const userProgress = makeUserProgress({
        cs101: makeProgress({ status: 'in_progress' }),
      });
      expect(canStartSubject(subject, userProgress)).toBe(true);
    });

    it('returns false for subject with unmet prerequisites', () => {
      const subject = subjectTemplate({ prerequisites: ['prereq-1'] });
      const userProgress = makeUserProgress({});
      expect(canStartSubject(subject, userProgress)).toBe(false);
    });
  });
});
