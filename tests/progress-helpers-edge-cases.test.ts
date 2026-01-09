/**
 * Progress Helper Functions Edge Cases Tests
 *
 * Additional edge case tests for progress helper functions, focusing on:
 * - Boundary conditions for scoring
 * - Empty and malformed data handling
 * - Subject dependency edge cases
 * - Completion status transitions
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Subject, SubjectProgress, UserProgress, QuizAttempt, ExamAttempt, ProjectSubmission } from '../src/core/types';
import {
  calculateSubjectCompletion,
  arePrerequisitesMet,
  getAvailableSubjects,
  getInProgressSubjects,
  getCompletedSubjects,
  calculateOverallProgress,
  getNextRecommendedSubject,
  getSubjectsByYearAndSemester,
  canStartSubject,
  isQuizCompleted,
  getQuizBestScore,
  isExerciseCompleted,
  isExamCompleted,
  getExamBestScore,
  isProjectCompleted,
  getProjectBestSubmission,
  getDependentSubjects,
  getPrerequisiteSubjects,
} from '../src/core/progress';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

// Helper to create a minimal subject for testing
function createSubject(overrides: Partial<Subject> = {}): Subject {
  return {
    id: 'test-subject',
    code: 'TEST101',
    title: 'Test Subject',
    category: 'cs',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'Test description',
    learningObjectives: ['Learn testing'],
    topics: [],
    estimatedHours: 40,
    ...overrides,
  };
}

// Helper to create a quiz attempt
function createQuizAttempt(score: number, overrides: Partial<QuizAttempt> = {}): QuizAttempt {
  return {
    attemptId: `attempt-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 300,
    ...overrides,
  };
}

// Helper to create an exam attempt
function createExamAttempt(score: number): ExamAttempt {
  return {
    attemptId: `attempt-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 3600,
  };
}

// Helper to create a project submission
function createProjectSubmission(aiScore?: number): ProjectSubmission {
  return {
    submissionId: `sub-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString(),
    description: 'Test submission',
    selfAssessment: {},
    notes: '',
    aiEvaluation: aiScore !== undefined ? {
      score: aiScore,
      feedback: 'Test feedback',
      rubricScores: {},
      strengths: [],
      improvements: [],
    } : undefined,
  };
}

describe('progress helpers edge cases', () => {
  describe('calculateSubjectCompletion edge cases', () => {
    it('returns 0 for undefined progress', () => {
      const subject = createSubject({
        topics: [{ id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] }],
      });

      expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
    });

    it('returns 100 for completed status regardless of actual completion', () => {
      const subject = createSubject({
        topics: [{ id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] }],
      });
      const progress: SubjectProgress = {
        status: 'completed',
        quizAttempts: {},  // Empty - but status is completed
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('returns 0 for subject with no assessments', () => {
      const subject = createSubject({
        topics: [{ id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: [] }],
        examIds: [],
        projectIds: [],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('calculates partial completion with mixed passing and failing scores', () => {
      const subject = createSubject({
        topics: [
          { id: 't1', title: 'T1', content: '', quizIds: ['q1', 'q2'], exerciseIds: [] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'q1': [createQuizAttempt(85)],  // Passing
          'q2': [createQuizAttempt(50)],  // Failing
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      expect(calculateSubjectCompletion(subject, progress)).toBe(50);  // 1/2 = 50%
    });

    it('uses best score from multiple attempts', () => {
      const subject = createSubject({
        topics: [
          { id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'q1': [
            createQuizAttempt(50),  // Failing
            createQuizAttempt(75),  // Passing - best
            createQuizAttempt(60),  // Lower than best
          ],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);  // Best is passing
    });
  });

  describe('arePrerequisitesMet edge cases', () => {
    it('returns true for subject with empty prerequisites array', () => {
      const subject = createSubject({ prerequisites: [] });
      const userProgress: UserProgress = {
        version: 1,
        subjects: {},
        settings: { theme: 'auto' },
      };

      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('returns true for subject with undefined prerequisites', () => {
      const subject = createSubject();
      delete (subject as Record<string, unknown>).prerequisites;
      const userProgress: UserProgress = {
        version: 1,
        subjects: {},
        settings: { theme: 'auto' },
      };

      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('returns false when prerequisite exists but is not completed', () => {
      const subject = createSubject({ prerequisites: ['prereq-1'] });
      const userProgress: UserProgress = {
        version: 1,
        subjects: {
          'prereq-1': {
            status: 'in_progress',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto' },
      };

      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });

    it('returns false when prerequisite is not_started', () => {
      const subject = createSubject({ prerequisites: ['prereq-1'] });
      const userProgress: UserProgress = {
        version: 1,
        subjects: {
          'prereq-1': {
            status: 'not_started',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto' },
      };

      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });

    it('requires all prerequisites to be completed', () => {
      const subject = createSubject({ prerequisites: ['prereq-1', 'prereq-2'] });
      const userProgress: UserProgress = {
        version: 1,
        subjects: {
          'prereq-1': {
            status: 'completed',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
          'prereq-2': {
            status: 'in_progress',  // Not completed
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto' },
      };

      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });
  });

  describe('getSubjectsByYearAndSemester edge cases', () => {
    it('returns empty map for empty subject list', () => {
      const result = getSubjectsByYearAndSemester([]);
      expect(result.size).toBe(0);
    });

    it('groups subjects correctly by year and semester', () => {
      const subjects = [
        createSubject({ id: 's1', year: 1, semester: 1 }),
        createSubject({ id: 's2', year: 1, semester: 1 }),
        createSubject({ id: 's3', year: 1, semester: 2 }),
        createSubject({ id: 's4', year: 2, semester: 1 }),
      ];

      const result = getSubjectsByYearAndSemester(subjects);

      expect(result.get(1)?.get(1)?.length).toBe(2);
      expect(result.get(1)?.get(2)?.length).toBe(1);
      expect(result.get(2)?.get(1)?.length).toBe(1);
    });

    it('handles subjects with same year different semesters', () => {
      const subjects = [
        createSubject({ id: 's1', year: 1, semester: 1 }),
        createSubject({ id: 's2', year: 1, semester: 2 }),
        createSubject({ id: 's3', year: 1, semester: 3 }),
      ];

      const result = getSubjectsByYearAndSemester(subjects);
      const year1 = result.get(1);

      expect(year1?.size).toBe(3);
      expect(year1?.get(1)?.length).toBe(1);
      expect(year1?.get(2)?.length).toBe(1);
      expect(year1?.get(3)?.length).toBe(1);
    });
  });

  describe('getNextRecommendedSubject edge cases', () => {
    it('returns null when all subjects are completed', () => {
      const subjects = [createSubject({ id: 's1' })];
      const userProgress: UserProgress = {
        version: 1,
        subjects: {
          's1': {
            status: 'completed',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto' },
      };

      expect(getNextRecommendedSubject(subjects, userProgress)).toBeNull();
    });

    it('returns earliest in-progress subject when multiple are in progress', () => {
      const subjects = [
        createSubject({ id: 's1', year: 2, semester: 1 }),
        createSubject({ id: 's2', year: 1, semester: 2 }),
        createSubject({ id: 's3', year: 1, semester: 1 }),  // Earliest
      ];
      const userProgress: UserProgress = {
        version: 1,
        subjects: {
          's1': { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {}, subtopicViews: {} },
          's2': { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {}, subtopicViews: {} },
          's3': { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {}, subtopicViews: {} },
        },
        settings: { theme: 'auto' },
      };

      const result = getNextRecommendedSubject(subjects, userProgress);
      expect(result?.id).toBe('s3');  // Year 1, Semester 1 is earliest
    });

    it('returns null when all available subjects are blocked by prerequisites', () => {
      const subjects = [
        createSubject({ id: 's1', prerequisites: ['prereq-not-completed'] }),
      ];
      const userProgress: UserProgress = {
        version: 1,
        subjects: {},
        settings: { theme: 'auto' },
      };

      expect(getNextRecommendedSubject(subjects, userProgress)).toBeNull();
    });
  });

  describe('getDependentSubjects and getPrerequisiteSubjects', () => {
    it('getDependentSubjects returns empty for subject with no dependents', () => {
      const subjects = [
        createSubject({ id: 's1' }),
        createSubject({ id: 's2', prerequisites: ['other'] }),
      ];

      const result = getDependentSubjects('s1', subjects);
      expect(result).toHaveLength(0);
    });

    it('getDependentSubjects finds direct dependents', () => {
      const subjects = [
        createSubject({ id: 's1' }),
        createSubject({ id: 's2', prerequisites: ['s1'] }),
        createSubject({ id: 's3', prerequisites: ['s1'] }),
        createSubject({ id: 's4', prerequisites: ['s2'] }),  // Indirect - not included
      ];

      const result = getDependentSubjects('s1', subjects);
      expect(result).toHaveLength(2);
      expect(result.map(s => s.id)).toContain('s2');
      expect(result.map(s => s.id)).toContain('s3');
    });

    it('getPrerequisiteSubjects returns empty for subject with no prerequisites', () => {
      const subject = createSubject({ prerequisites: [] });
      const subjects = [subject, createSubject({ id: 'other' })];

      const result = getPrerequisiteSubjects(subject, subjects);
      expect(result).toHaveLength(0);
    });

    it('getPrerequisiteSubjects finds prerequisite subjects', () => {
      const prereq1 = createSubject({ id: 'prereq1' });
      const prereq2 = createSubject({ id: 'prereq2' });
      const subject = createSubject({ id: 'main', prerequisites: ['prereq1', 'prereq2'] });
      const subjects = [subject, prereq1, prereq2];

      const result = getPrerequisiteSubjects(subject, subjects);
      expect(result).toHaveLength(2);
      expect(result.map(s => s.id)).toContain('prereq1');
      expect(result.map(s => s.id)).toContain('prereq2');
    });

    it('getPrerequisiteSubjects filters out non-existent prerequisites', () => {
      const prereq = createSubject({ id: 'prereq' });
      const subject = createSubject({ id: 'main', prerequisites: ['prereq', 'missing'] });
      const subjects = [subject, prereq];

      const result = getPrerequisiteSubjects(subject, subjects);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('prereq');
    });
  });

  describe('canStartSubject edge cases', () => {
    it('returns false for already completed subject', () => {
      const subject = createSubject({ id: 's1', prerequisites: [] });
      const userProgress: UserProgress = {
        version: 1,
        subjects: {
          's1': {
            status: 'completed',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto' },
      };

      expect(canStartSubject(subject, userProgress)).toBe(false);
    });

    it('returns true for in_progress subject (can continue)', () => {
      const subject = createSubject({ id: 's1', prerequisites: [] });
      const userProgress: UserProgress = {
        version: 1,
        subjects: {
          's1': {
            status: 'in_progress',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto' },
      };

      expect(canStartSubject(subject, userProgress)).toBe(true);
    });

    it('returns true for not_started subject with met prerequisites', () => {
      const subject = createSubject({ id: 's1', prerequisites: ['prereq'] });
      const userProgress: UserProgress = {
        version: 1,
        subjects: {
          's1': {
            status: 'not_started',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
          'prereq': {
            status: 'completed',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto' },
      };

      expect(canStartSubject(subject, userProgress)).toBe(true);
    });
  });

  describe('project completion edge cases', () => {
    it('isProjectCompleted returns true for submission without AI evaluation', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'proj1': [createProjectSubmission()],  // No AI eval
        },
        subtopicViews: {},
      };

      expect(isProjectCompleted('proj1', progress)).toBe(true);
    });

    it('isProjectCompleted uses best AI score from multiple submissions', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'proj1': [
            createProjectSubmission(50),   // Failing
            createProjectSubmission(80),   // Passing - best
            createProjectSubmission(60),   // Lower
          ],
        },
        subtopicViews: {},
      };

      expect(isProjectCompleted('proj1', progress)).toBe(true);
    });

    it('getProjectBestSubmission returns submission with highest AI score', () => {
      const sub1 = createProjectSubmission(50);
      const sub2 = createProjectSubmission(90);  // Best
      const sub3 = createProjectSubmission(70);

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'proj1': [sub1, sub2, sub3],
        },
        subtopicViews: {},
      };

      const best = getProjectBestSubmission('proj1', progress);
      expect(best?.aiEvaluation?.score).toBe(90);
    });

    it('getProjectBestSubmission returns first submission when none have AI eval', () => {
      const sub1 = createProjectSubmission();  // No AI
      const sub2 = createProjectSubmission();  // No AI

      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'proj1': [sub1, sub2],
        },
        subtopicViews: {},
      };

      const best = getProjectBestSubmission('proj1', progress);
      expect(best?.submissionId).toBe(sub1.submissionId);
    });
  });

  describe('calculateOverallProgress edge cases', () => {
    it('returns zeros for empty subject list', () => {
      const userProgress: UserProgress = {
        version: 1,
        subjects: {},
        settings: { theme: 'auto' },
      };

      const result = calculateOverallProgress([], userProgress);

      expect(result.totalSubjects).toBe(0);
      expect(result.completedSubjects).toBe(0);
      expect(result.inProgressSubjects).toBe(0);
      expect(result.totalHours).toBe(0);
      expect(result.completedHours).toBe(0);
      expect(result.percentageComplete).toBe(0);
    });

    it('calculates hours correctly for partial completion', () => {
      const subject = createSubject({
        id: 's1',
        estimatedHours: 100,
        topics: [
          { id: 't1', title: 'T1', content: '', quizIds: ['q1', 'q2'], exerciseIds: [] },
        ],
      });

      const userProgress: UserProgress = {
        version: 1,
        subjects: {
          's1': {
            status: 'in_progress',
            quizAttempts: {
              'q1': [createQuizAttempt(80)],  // Passing
              // q2 not attempted - 50% complete
            },
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
            subtopicViews: {},
          },
        },
        settings: { theme: 'auto' },
      };

      const result = calculateOverallProgress([subject], userProgress);

      expect(result.totalHours).toBe(100);
      expect(result.completedHours).toBe(50);  // 50% of 100 hours
    });
  });
});
