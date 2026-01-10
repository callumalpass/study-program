/**
 * Subject Completion Calculation Edge Cases Tests
 *
 * Comprehensive tests for the calculateSubjectCompletion function
 * focusing on edge cases and boundary conditions that may not be
 * covered in other test files.
 */

import { describe, it, expect } from 'vitest';
import { calculateSubjectCompletion } from '../src/core/progress';
import type { Subject, SubjectProgress } from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

// Helper to create a minimal subject
const createSubject = (overrides: Partial<Subject> = {}): Subject => ({
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
  estimatedHours: 10,
  ...overrides,
});

// Helper to create a minimal subject progress
const createProgress = (overrides: Partial<SubjectProgress> = {}): SubjectProgress => ({
  status: 'in_progress',
  quizAttempts: {},
  examAttempts: {},
  exerciseCompletions: {},
  projectSubmissions: {},
  ...overrides,
});

describe('calculateSubjectCompletion', () => {
  describe('empty or not started subjects', () => {
    it('returns 0 for undefined progress', () => {
      const subject = createSubject();
      expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
    });

    it('returns 0 for not_started status', () => {
      const subject = createSubject();
      const progress = createProgress({ status: 'not_started' });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('returns 100 for completed status', () => {
      const subject = createSubject();
      const progress = createProgress({ status: 'completed' });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('returns 0 for subject with no topics, quizzes, or exercises', () => {
      const subject = createSubject({ topics: [] });
      const progress = createProgress();
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('quiz completion', () => {
    it('counts quiz as complete when best score meets passing threshold', () => {
      const subject = createSubject({
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: 'Content',
          quizIds: ['quiz-1'],
          exerciseIds: [],
        }],
      });
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [
            { attemptId: 'a1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 60 },
          ],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts quiz as incomplete when best score is below passing threshold', () => {
      const subject = createSubject({
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: 'Content',
          quizIds: ['quiz-1'],
          exerciseIds: [],
        }],
      });
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [
            { attemptId: 'a1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE - 1, timeSpentSeconds: 60 },
          ],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('uses best score from multiple attempts', () => {
      const subject = createSubject({
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: 'Content',
          quizIds: ['quiz-1'],
          exerciseIds: [],
        }],
      });
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [
            { attemptId: 'a1', timestamp: new Date().toISOString(), answers: {}, score: 40, timeSpentSeconds: 60 },
            { attemptId: 'a2', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 60 },
            { attemptId: 'a3', timestamp: new Date().toISOString(), answers: {}, score: 50, timeSpentSeconds: 60 },
          ],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles quiz with empty attempts array', () => {
      const subject = createSubject({
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: 'Content',
          quizIds: ['quiz-1'],
          exerciseIds: [],
        }],
      });
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles quiz with no attempts recorded', () => {
      const subject = createSubject({
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: 'Content',
          quizIds: ['quiz-1'],
          exerciseIds: [],
        }],
      });
      const progress = createProgress({
        quizAttempts: {},
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('exercise completion', () => {
    it('counts exercise as complete when passed is true', () => {
      const subject = createSubject({
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: 'Content',
          quizIds: [],
          exerciseIds: ['ex-1'],
        }],
      });
      const progress = createProgress({
        exerciseCompletions: {
          'ex-1': {
            completionId: 'c1',
            timestamp: new Date().toISOString(),
            code: 'print("test")',
            passed: true,
            timeSpentSeconds: 120,
          },
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts exercise as incomplete when passed is false', () => {
      const subject = createSubject({
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: 'Content',
          quizIds: [],
          exerciseIds: ['ex-1'],
        }],
      });
      const progress = createProgress({
        exerciseCompletions: {
          'ex-1': {
            completionId: 'c1',
            timestamp: new Date().toISOString(),
            code: 'print("test")',
            passed: false,
            timeSpentSeconds: 120,
          },
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('exam completion', () => {
    it('counts exam as complete when best score meets passing threshold', () => {
      const subject = createSubject({
        topics: [],
        examIds: ['midterm'],
      });
      const progress = createProgress({
        examAttempts: {
          'midterm': [
            { attemptId: 'e1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 3600 },
          ],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts exam as incomplete when best score is below passing threshold', () => {
      const subject = createSubject({
        topics: [],
        examIds: ['midterm'],
      });
      const progress = createProgress({
        examAttempts: {
          'midterm': [
            { attemptId: 'e1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE - 1, timeSpentSeconds: 3600 },
          ],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('project completion', () => {
    it('counts project as complete when any submission exists without AI evaluation', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });
      const progress = createProgress({
        projectSubmissions: {
          'project-1': [
            {
              submissionId: 'p1',
              timestamp: new Date().toISOString(),
              description: 'My project',
              selfAssessment: {},
              notes: 'Done',
            },
          ],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts project as complete when AI evaluation score meets passing threshold', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });
      const progress = createProgress({
        projectSubmissions: {
          'project-1': [
            {
              submissionId: 'p1',
              timestamp: new Date().toISOString(),
              description: 'My project',
              selfAssessment: {},
              notes: 'Done',
              aiEvaluation: {
                score: QUIZ_PASSING_SCORE,
                feedback: 'Good work',
                rubricScores: {},
                strengths: [],
                improvements: [],
              },
            },
          ],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts project as incomplete when AI evaluation score is below passing threshold', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });
      const progress = createProgress({
        projectSubmissions: {
          'project-1': [
            {
              submissionId: 'p1',
              timestamp: new Date().toISOString(),
              description: 'My project',
              selfAssessment: {},
              notes: 'Done',
              aiEvaluation: {
                score: QUIZ_PASSING_SCORE - 1,
                feedback: 'Needs work',
                rubricScores: {},
                strengths: [],
                improvements: [],
              },
            },
          ],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('uses best AI evaluation score from multiple submissions', () => {
      const subject = createSubject({
        topics: [],
        projectIds: ['project-1'],
      });
      const progress = createProgress({
        projectSubmissions: {
          'project-1': [
            {
              submissionId: 'p1',
              timestamp: new Date().toISOString(),
              description: 'First attempt',
              selfAssessment: {},
              notes: 'First',
              aiEvaluation: {
                score: 50,
                feedback: 'Needs work',
                rubricScores: {},
                strengths: [],
                improvements: [],
              },
            },
            {
              submissionId: 'p2',
              timestamp: new Date().toISOString(),
              description: 'Second attempt',
              selfAssessment: {},
              notes: 'Second',
              aiEvaluation: {
                score: QUIZ_PASSING_SCORE,
                feedback: 'Good',
                rubricScores: {},
                strengths: [],
                improvements: [],
              },
            },
          ],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('mixed completion', () => {
    it('calculates correct percentage with multiple quizzes and exercises', () => {
      const subject = createSubject({
        topics: [
          {
            id: 't1',
            title: 'Topic 1',
            content: 'Content',
            quizIds: ['quiz-1', 'quiz-2'],
            exerciseIds: ['ex-1', 'ex-2'],
          },
        ],
      });
      // 2 out of 4 items complete = 50%
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [{ attemptId: 'a1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 60 }],
          'quiz-2': [{ attemptId: 'a2', timestamp: new Date().toISOString(), answers: {}, score: 40, timeSpentSeconds: 60 }],
        },
        exerciseCompletions: {
          'ex-1': { completionId: 'c1', timestamp: new Date().toISOString(), code: '', passed: true, timeSpentSeconds: 120 },
          'ex-2': { completionId: 'c2', timestamp: new Date().toISOString(), code: '', passed: false, timeSpentSeconds: 120 },
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('calculates correct percentage with quizzes, exercises, exams, and projects', () => {
      const subject = createSubject({
        topics: [
          {
            id: 't1',
            title: 'Topic 1',
            content: 'Content',
            quizIds: ['quiz-1'],
            exerciseIds: ['ex-1'],
          },
        ],
        examIds: ['midterm'],
        projectIds: ['project-1'],
      });
      // 2 out of 4 items complete = 50%
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [{ attemptId: 'a1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 60 }],
        },
        exerciseCompletions: {
          'ex-1': { completionId: 'c1', timestamp: new Date().toISOString(), code: '', passed: false, timeSpentSeconds: 120 },
        },
        examAttempts: {
          'midterm': [{ attemptId: 'e1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 3600 }],
        },
        projectSubmissions: {
          'project-1': [],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('handles multiple topics correctly', () => {
      const subject = createSubject({
        topics: [
          {
            id: 't1',
            title: 'Topic 1',
            content: 'Content',
            quizIds: ['quiz-1'],
            exerciseIds: [],
          },
          {
            id: 't2',
            title: 'Topic 2',
            content: 'Content',
            quizIds: ['quiz-2'],
            exerciseIds: [],
          },
        ],
      });
      // 1 out of 2 quizzes complete = 50%
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [{ attemptId: 'a1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 60 }],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });
  });

  describe('rounding behavior', () => {
    it('rounds to nearest integer', () => {
      const subject = createSubject({
        topics: [
          {
            id: 't1',
            title: 'Topic 1',
            content: 'Content',
            quizIds: ['quiz-1', 'quiz-2', 'quiz-3'],
            exerciseIds: [],
          },
        ],
      });
      // 1 out of 3 items complete = 33.33...% -> rounds to 33%
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [{ attemptId: 'a1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 60 }],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(33);
    });

    it('rounds 66.66% correctly', () => {
      const subject = createSubject({
        topics: [
          {
            id: 't1',
            title: 'Topic 1',
            content: 'Content',
            quizIds: ['quiz-1', 'quiz-2', 'quiz-3'],
            exerciseIds: [],
          },
        ],
      });
      // 2 out of 3 items complete = 66.66...% -> rounds to 67%
      const progress = createProgress({
        quizAttempts: {
          'quiz-1': [{ attemptId: 'a1', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 60 }],
          'quiz-2': [{ attemptId: 'a2', timestamp: new Date().toISOString(), answers: {}, score: QUIZ_PASSING_SCORE, timeSpentSeconds: 60 }],
        },
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(67);
    });
  });

  describe('boundary conditions', () => {
    it('handles subject with empty examIds array', () => {
      const subject = createSubject({
        topics: [],
        examIds: [],
      });
      const progress = createProgress();
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles subject with empty projectIds array', () => {
      const subject = createSubject({
        topics: [],
        projectIds: [],
      });
      const progress = createProgress();
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles progress with undefined quizAttempts', () => {
      const subject = createSubject({
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: 'Content',
          quizIds: ['quiz-1'],
          exerciseIds: [],
        }],
      });
      const progress = createProgress({
        quizAttempts: undefined as unknown as Record<string, never>,
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles progress with undefined exerciseCompletions', () => {
      const subject = createSubject({
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: 'Content',
          quizIds: [],
          exerciseIds: ['ex-1'],
        }],
      });
      const progress = createProgress({
        exerciseCompletions: undefined as unknown as Record<string, never>,
      });
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });
});
