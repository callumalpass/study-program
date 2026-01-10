/**
 * Extended Progress Calculation Tests
 *
 * Tests for progress calculation edge cases including:
 * - Partial completion states
 * - Mixed passing/failing attempts
 * - Project submission edge cases
 * - Overall degree progress calculation
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateSubjectCompletion,
  calculateOverallProgress,
  arePrerequisitesMet,
  getAvailableSubjects,
  getInProgressSubjects,
  getCompletedSubjects,
  getNextRecommendedSubject,
  canStartSubject,
  isQuizCompleted,
  isExerciseCompleted,
  isExamCompleted,
  isProjectCompleted,
  getQuizBestScore,
  getExamBestScore,
  getProjectBestSubmission,
  getDependentSubjects,
  getPrerequisiteSubjects,
} from '../src/core/progress';
import type { Subject, SubjectProgress, UserProgress, QuizAttempt, ExamAttempt, ProjectSubmission } from '../src/core/types';

// Helper to create a minimal subject
function createSubject(
  id: string,
  options: {
    prerequisites?: string[];
    year?: number;
    semester?: number;
    quizIds?: string[][];
    exerciseIds?: string[][];
    examIds?: string[];
    projectIds?: string[];
  } = {}
): Subject {
  const {
    prerequisites = [],
    year = 1,
    semester = 1,
    quizIds = [['quiz-1'], ['quiz-2']],
    exerciseIds = [['ex-1'], ['ex-2']],
    examIds = ['exam-1'],
    projectIds = ['project-1'],
  } = options;

  return {
    id,
    name: `Subject ${id}`,
    description: `Description for ${id}`,
    year,
    semester,
    prerequisites,
    estimatedHours: 100,
    topics: quizIds.map((qids, i) => ({
      id: `${id}-topic-${i + 1}`,
      title: `Topic ${i + 1}`,
      content: '',
      subtopics: [],
      quizIds: qids,
      exerciseIds: exerciseIds[i] || [],
    })),
    examIds,
    projectIds,
  };
}

// Helper to create a quiz attempt
function createQuizAttempt(score: number): QuizAttempt {
  return {
    score,
    completedAt: new Date().toISOString(),
    answers: {},
  };
}

// Helper to create an exam attempt
function createExamAttempt(score: number): ExamAttempt {
  return {
    score,
    completedAt: new Date().toISOString(),
    answers: {},
    timeSpent: 3600,
  };
}

// Helper to create a project submission
function createProjectSubmission(aiScore?: number): ProjectSubmission {
  return {
    submittedAt: new Date().toISOString(),
    code: 'def solution(): pass',
    aiEvaluation: aiScore !== undefined ? { score: aiScore, feedback: 'Good work' } : undefined,
  };
}

// Helper to create subject progress
function createProgress(overrides: Partial<SubjectProgress> = {}): SubjectProgress {
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

describe('Progress Calculation Extended', () => {
  describe('calculateSubjectCompletion', () => {
    it('returns 0 for undefined progress', () => {
      const subject = createSubject('cs101');
      expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
    });

    it('returns 0 for not_started status', () => {
      const subject = createSubject('cs101');
      const progress = createProgress({ status: 'not_started' });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('returns 100 for completed status', () => {
      const subject = createSubject('cs101');
      const progress = createProgress({ status: 'completed' });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('calculates partial completion based on passed quizzes', () => {
      const subject = createSubject('cs101', {
        quizIds: [['q1'], ['q2']],
        exerciseIds: [[], []],
        examIds: [],
        projectIds: [],
      });
      const progress = createProgress({
        quizAttempts: {
          'q1': [createQuizAttempt(80)], // Passed (70+ threshold)
        },
      });

      // 1 of 2 quizzes passed = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('only counts best score for quiz completion', () => {
      const subject = createSubject('cs101', {
        quizIds: [['q1']],
        exerciseIds: [[]],
        examIds: [],
        projectIds: [],
      });
      const progress = createProgress({
        quizAttempts: {
          'q1': [
            createQuizAttempt(50), // Failed
            createQuizAttempt(30), // Failed
            createQuizAttempt(75), // Passed - best score
          ],
        },
      });

      // Best score is 75 >= 70, so quiz is complete
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('does not count quiz as complete if best score below threshold', () => {
      const subject = createSubject('cs101', {
        quizIds: [['q1']],
        exerciseIds: [[]],
        examIds: [],
        projectIds: [],
      });
      const progress = createProgress({
        quizAttempts: {
          'q1': [
            createQuizAttempt(60),
            createQuizAttempt(65),
            createQuizAttempt(69), // Best but still below 70
          ],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('calculates completion including exercises', () => {
      const subject = createSubject('cs101', {
        quizIds: [['q1']],
        exerciseIds: [['ex1']],
        examIds: [],
        projectIds: [],
      });
      const progress = createProgress({
        quizAttempts: {
          'q1': [createQuizAttempt(80)],
        },
        exerciseCompletions: {
          'ex1': { passed: true, completedAt: new Date().toISOString() },
        },
      });

      // Both quiz and exercise complete = 100%
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('does not count exercise as complete if not passed', () => {
      const subject = createSubject('cs101', {
        quizIds: [[]],
        exerciseIds: [['ex1']],
        examIds: [],
        projectIds: [],
      });
      const progress = createProgress({
        exerciseCompletions: {
          'ex1': { passed: false, completedAt: new Date().toISOString() },
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('includes exams in completion calculation', () => {
      const subject = createSubject('cs101', {
        quizIds: [[]],
        exerciseIds: [[]],
        examIds: ['exam1'],
        projectIds: [],
      });
      const progress = createProgress({
        examAttempts: {
          'exam1': [createExamAttempt(75)],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('includes projects with passing AI score in completion', () => {
      const subject = createSubject('cs101', {
        quizIds: [[]],
        exerciseIds: [[]],
        examIds: [],
        projectIds: ['proj1'],
      });
      const progress = createProgress({
        projectSubmissions: {
          'proj1': [createProjectSubmission(80)],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts project as complete if submitted without AI evaluation', () => {
      const subject = createSubject('cs101', {
        quizIds: [[]],
        exerciseIds: [[]],
        examIds: [],
        projectIds: ['proj1'],
      });
      const progress = createProgress({
        projectSubmissions: {
          'proj1': [createProjectSubmission()], // No AI score
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('does not count project with failing AI score', () => {
      const subject = createSubject('cs101', {
        quizIds: [[]],
        exerciseIds: [[]],
        examIds: [],
        projectIds: ['proj1'],
      });
      const progress = createProgress({
        projectSubmissions: {
          'proj1': [createProjectSubmission(50)], // Below 70 threshold
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('returns 0 for subject with no items', () => {
      const subject = createSubject('cs101', {
        quizIds: [[]],
        exerciseIds: [[]],
        examIds: [],
        projectIds: [],
      });
      const progress = createProgress();

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('arePrerequisitesMet', () => {
    it('returns true for subject with no prerequisites', () => {
      const subject = createSubject('cs101', { prerequisites: [] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {},
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('returns false when prerequisite not completed', () => {
      const subject = createSubject('cs201', { prerequisites: ['cs101'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'cs101': createProgress({ status: 'in_progress' }),
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });

    it('returns true when all prerequisites completed', () => {
      const subject = createSubject('cs301', { prerequisites: ['cs101', 'cs201'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'cs101': createProgress({ status: 'completed' }),
          'cs201': createProgress({ status: 'completed' }),
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('returns false when prerequisite does not exist in progress', () => {
      const subject = createSubject('cs201', { prerequisites: ['cs101'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {}, // cs101 not even started
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });
  });

  describe('calculateOverallProgress', () => {
    it('returns zeros for empty subjects list', () => {
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {},
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const result = calculateOverallProgress([], userProgress);

      expect(result.totalSubjects).toBe(0);
      expect(result.completedSubjects).toBe(0);
      expect(result.inProgressSubjects).toBe(0);
      expect(result.percentageComplete).toBe(0);
    });

    it('calculates completed subjects correctly', () => {
      const subjects = [
        createSubject('cs101'),
        createSubject('cs102'),
        createSubject('cs103'),
      ];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'cs101': createProgress({ status: 'completed' }),
          'cs102': createProgress({ status: 'in_progress' }),
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const result = calculateOverallProgress(subjects, userProgress);

      expect(result.totalSubjects).toBe(3);
      expect(result.completedSubjects).toBe(1);
      expect(result.inProgressSubjects).toBe(1);
    });

    it('calculates hours-based percentage', () => {
      const subjects = [
        { ...createSubject('cs101'), estimatedHours: 100 },
        { ...createSubject('cs102'), estimatedHours: 100 },
      ];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'cs101': createProgress({ status: 'completed' }), // 100% of 100 hours = 100 hours
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const result = calculateOverallProgress(subjects, userProgress);

      // 100 hours completed out of 200 total = 50%
      expect(result.totalHours).toBe(200);
      expect(result.completedHours).toBe(100);
      expect(result.percentageComplete).toBe(50);
    });
  });

  describe('getNextRecommendedSubject', () => {
    it('returns null for empty subjects list', () => {
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {},
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      expect(getNextRecommendedSubject([], userProgress)).toBeNull();
    });

    it('returns in-progress subject first', () => {
      const subjects = [
        createSubject('cs101', { year: 1, semester: 1 }),
        createSubject('cs102', { year: 1, semester: 2 }),
      ];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'cs102': createProgress({ status: 'in_progress' }),
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const result = getNextRecommendedSubject(subjects, userProgress);
      expect(result?.id).toBe('cs102');
    });

    it('returns earliest year/semester available subject when none in progress', () => {
      const subjects = [
        createSubject('cs201', { year: 2, semester: 1 }),
        createSubject('cs101', { year: 1, semester: 1 }),
        createSubject('cs102', { year: 1, semester: 2 }),
      ];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {},
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      const result = getNextRecommendedSubject(subjects, userProgress);
      expect(result?.id).toBe('cs101');
    });

    it('returns null when all subjects completed', () => {
      const subjects = [createSubject('cs101')];
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'cs101': createProgress({ status: 'completed' }),
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };

      expect(getNextRecommendedSubject(subjects, userProgress)).toBeNull();
    });
  });

  describe('isQuizCompleted', () => {
    it('returns false for undefined progress', () => {
      expect(isQuizCompleted('quiz-1', undefined)).toBe(false);
    });

    it('returns false for quiz with no attempts', () => {
      const progress = createProgress();
      expect(isQuizCompleted('quiz-1', progress)).toBe(false);
    });

    it('returns true when best score meets threshold', () => {
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(50), createQuizAttempt(75)],
        },
      });
      expect(isQuizCompleted('quiz-1', progress)).toBe(true);
    });

    it('returns false when best score below threshold', () => {
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [createQuizAttempt(50), createQuizAttempt(65)],
        },
      });
      expect(isQuizCompleted('quiz-1', progress)).toBe(false);
    });
  });

  describe('getQuizBestScore', () => {
    it('returns null for undefined progress', () => {
      expect(getQuizBestScore('quiz-1', undefined)).toBeNull();
    });

    it('returns null for quiz with no attempts', () => {
      const progress = createProgress();
      expect(getQuizBestScore('quiz-1', progress)).toBeNull();
    });

    it('returns best score from multiple attempts', () => {
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [
            createQuizAttempt(50),
            createQuizAttempt(85),
            createQuizAttempt(70),
          ],
        },
      });
      expect(getQuizBestScore('quiz-1', progress)).toBe(85);
    });
  });

  describe('isProjectCompleted', () => {
    it('returns false for undefined progress', () => {
      expect(isProjectCompleted('proj-1', undefined)).toBe(false);
    });

    it('returns false for project with no submissions', () => {
      const progress = createProgress();
      expect(isProjectCompleted('proj-1', progress)).toBe(false);
    });

    it('returns true for submission without AI evaluation', () => {
      const progress = createProgress({
        projectSubmissions: {
          'proj-1': [createProjectSubmission()],
        },
      });
      expect(isProjectCompleted('proj-1', progress)).toBe(true);
    });

    it('returns true for submission with passing AI score', () => {
      const progress = createProgress({
        projectSubmissions: {
          'proj-1': [createProjectSubmission(80)],
        },
      });
      expect(isProjectCompleted('proj-1', progress)).toBe(true);
    });

    it('returns false for submission with failing AI score', () => {
      const progress = createProgress({
        projectSubmissions: {
          'proj-1': [createProjectSubmission(60)],
        },
      });
      expect(isProjectCompleted('proj-1', progress)).toBe(false);
    });

    it('uses best submission when multiple exist', () => {
      const progress = createProgress({
        projectSubmissions: {
          'proj-1': [
            createProjectSubmission(50),
            createProjectSubmission(80), // Best
            createProjectSubmission(65),
          ],
        },
      });
      expect(isProjectCompleted('proj-1', progress)).toBe(true);
    });
  });

  describe('getDependentSubjects', () => {
    it('returns empty array when no subjects depend on the given subject', () => {
      const subjects = [
        createSubject('cs101'),
        createSubject('cs102'),
      ];
      expect(getDependentSubjects('cs101', subjects)).toEqual([]);
    });

    it('returns subjects that have the given subject as prerequisite', () => {
      const subjects = [
        createSubject('cs101'),
        createSubject('cs201', { prerequisites: ['cs101'] }),
        createSubject('cs301', { prerequisites: ['cs201'] }),
      ];
      const dependents = getDependentSubjects('cs101', subjects);
      expect(dependents).toHaveLength(1);
      expect(dependents[0].id).toBe('cs201');
    });

    it('returns multiple dependents', () => {
      const subjects = [
        createSubject('cs101'),
        createSubject('cs201', { prerequisites: ['cs101'] }),
        createSubject('cs202', { prerequisites: ['cs101'] }),
      ];
      const dependents = getDependentSubjects('cs101', subjects);
      expect(dependents).toHaveLength(2);
      expect(dependents.map(s => s.id).sort()).toEqual(['cs201', 'cs202']);
    });
  });

  describe('getPrerequisiteSubjects', () => {
    it('returns empty array for subject with no prerequisites', () => {
      const subjects = [createSubject('cs101')];
      const subject = subjects[0];
      expect(getPrerequisiteSubjects(subject, subjects)).toEqual([]);
    });

    it('returns prerequisite subjects', () => {
      const subjects = [
        createSubject('cs101'),
        createSubject('cs102'),
        createSubject('cs201', { prerequisites: ['cs101', 'cs102'] }),
      ];
      const prereqs = getPrerequisiteSubjects(subjects[2], subjects);
      expect(prereqs).toHaveLength(2);
      expect(prereqs.map(s => s.id).sort()).toEqual(['cs101', 'cs102']);
    });

    it('filters out prerequisites not in subject list', () => {
      const subjects = [
        createSubject('cs201', { prerequisites: ['cs101', 'cs102'] }),
        createSubject('cs101'),
        // cs102 not in list
      ];
      const prereqs = getPrerequisiteSubjects(subjects[0], subjects);
      expect(prereqs).toHaveLength(1);
      expect(prereqs[0].id).toBe('cs101');
    });
  });
});
