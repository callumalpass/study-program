/**
 * Progress Overall Hours Edge Cases Tests
 *
 * Tests for edge cases in the calculateOverallProgress function,
 * specifically around the completedHours calculation which involves
 * partial completion percentages and rounding.
 */

import { describe, it, expect } from 'vitest';
import type { Subject, SubjectProgress, UserProgress } from '../src/core/types';
import { calculateOverallProgress } from '../src/core/progress';

// Helper to create a minimal subject
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
    topics: [
      {
        id: 'topic-1',
        title: 'Topic 1',
        content: 'Content',
        quizIds: ['quiz-1'],
        exerciseIds: ['ex-1'],
      },
    ],
    estimatedHours: 40,
    examIds: [],
    projectIds: [],
    ...overrides,
  };
}

// Helper to create a basic user progress
function createUserProgress(
  subjects: Record<string, Partial<SubjectProgress>>
): UserProgress {
  const subjectProgress: Record<string, SubjectProgress> = {};
  for (const [id, progress] of Object.entries(subjects)) {
    subjectProgress[id] = {
      status: 'not_started',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      ...progress,
    };
  }

  return {
    version: 4,
    startedAt: new Date().toISOString(),
    subjects: subjectProgress,
    settings: {
      theme: 'auto',
      codeEditorFontSize: 14,
      showCompletedItems: true,
    },
  };
}

describe('calculateOverallProgress completedHours edge cases', () => {
  describe('partial completion calculations', () => {
    it('calculates partial hours for in_progress subject at 50%', () => {
      const subjects = [
        createSubject({
          id: 'cs101',
          estimatedHours: 100,
          topics: [
            { id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] },
            { id: 't2', title: 'T2', content: '', quizIds: ['q2'], exerciseIds: [] },
          ],
        }),
      ];

      const userProgress = createUserProgress({
        cs101: {
          status: 'in_progress',
          quizAttempts: {
            q1: [
              {
                attemptId: 'a1',
                timestamp: new Date().toISOString(),
                answers: {},
                score: 80,
                timeSpentSeconds: 300,
              },
            ],
            // q2 not attempted = 1/2 = 50%
          },
        },
      });

      const result = calculateOverallProgress(subjects, userProgress);
      // 100 hours * 50% = 50 hours
      expect(result.completedHours).toBe(50);
    });

    it('rounds completedHours to nearest integer', () => {
      const subjects = [
        createSubject({
          id: 'cs101',
          estimatedHours: 10,
          topics: [
            { id: 't1', title: 'T1', content: '', quizIds: ['q1', 'q2', 'q3'], exerciseIds: [] },
          ],
        }),
      ];

      const userProgress = createUserProgress({
        cs101: {
          status: 'in_progress',
          quizAttempts: {
            q1: [
              {
                attemptId: 'a1',
                timestamp: new Date().toISOString(),
                answers: {},
                score: 80,
                timeSpentSeconds: 300,
              },
            ],
            // 1/3 = 33.33% of 10 hours = 3.33 hours, rounds to 3
          },
        },
      });

      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.completedHours).toBe(3);
    });

    it('combines partial hours across multiple subjects', () => {
      const subjects = [
        createSubject({
          id: 'cs101',
          estimatedHours: 100,
          topics: [
            { id: 't1', title: 'T1', content: '', quizIds: ['q1', 'q2'], exerciseIds: [] },
          ],
        }),
        createSubject({
          id: 'cs102',
          estimatedHours: 50,
          topics: [
            { id: 't1', title: 'T1', content: '', quizIds: ['q3', 'q4'], exerciseIds: [] },
          ],
        }),
      ];

      const userProgress = createUserProgress({
        cs101: {
          status: 'in_progress',
          quizAttempts: {
            q1: [
              {
                attemptId: 'a1',
                timestamp: new Date().toISOString(),
                answers: {},
                score: 80,
                timeSpentSeconds: 300,
              },
            ],
            // cs101: 1/2 = 50% of 100 = 50 hours
          },
        },
        cs102: {
          status: 'in_progress',
          quizAttempts: {
            q3: [
              {
                attemptId: 'a2',
                timestamp: new Date().toISOString(),
                answers: {},
                score: 80,
                timeSpentSeconds: 300,
              },
            ],
            // cs102: 1/2 = 50% of 50 = 25 hours
          },
        },
      });

      const result = calculateOverallProgress(subjects, userProgress);
      // 50 + 25 = 75 hours
      expect(result.completedHours).toBe(75);
    });
  });

  describe('completed subjects contribute full hours', () => {
    it('counts full hours for completed subjects', () => {
      const subjects = [
        createSubject({ id: 'cs101', estimatedHours: 40 }),
        createSubject({ id: 'cs102', estimatedHours: 60 }),
      ];

      const userProgress = createUserProgress({
        cs101: { status: 'completed' },
        cs102: { status: 'completed' },
      });

      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.completedHours).toBe(100);
    });

    it('mixes completed and partial hours correctly', () => {
      const subjects = [
        createSubject({ id: 'cs101', estimatedHours: 100 }),
        createSubject({
          id: 'cs102',
          estimatedHours: 100,
          topics: [
            { id: 't1', title: 'T1', content: '', quizIds: ['q1', 'q2', 'q3', 'q4'], exerciseIds: [] },
          ],
        }),
      ];

      const userProgress = createUserProgress({
        cs101: { status: 'completed' }, // 100 hours
        cs102: {
          status: 'in_progress',
          quizAttempts: {
            q1: [
              {
                attemptId: 'a1',
                timestamp: new Date().toISOString(),
                answers: {},
                score: 80,
                timeSpentSeconds: 300,
              },
            ],
            // cs102: 1/4 = 25% of 100 = 25 hours
          },
        },
      });

      const result = calculateOverallProgress(subjects, userProgress);
      // 100 + 25 = 125 hours
      expect(result.completedHours).toBe(125);
    });
  });

  describe('zero and edge cases', () => {
    it('returns 0 completedHours when no progress exists', () => {
      const subjects = [
        createSubject({ id: 'cs101', estimatedHours: 100 }),
      ];

      const userProgress = createUserProgress({});

      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.completedHours).toBe(0);
    });

    it('returns 0 completedHours for not_started subjects', () => {
      const subjects = [
        createSubject({ id: 'cs101', estimatedHours: 100 }),
      ];

      const userProgress = createUserProgress({
        cs101: { status: 'not_started' },
      });

      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.completedHours).toBe(0);
    });

    it('handles subject with 0 estimatedHours', () => {
      const subjects = [
        createSubject({ id: 'cs101', estimatedHours: 0 }),
      ];

      const userProgress = createUserProgress({
        cs101: { status: 'completed' },
      });

      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.completedHours).toBe(0);
      expect(result.totalHours).toBe(0);
    });

    it('handles large hour values without overflow', () => {
      const subjects = [
        createSubject({ id: 'cs101', estimatedHours: 10000 }),
        createSubject({ id: 'cs102', estimatedHours: 10000 }),
        createSubject({ id: 'cs103', estimatedHours: 10000 }),
      ];

      const userProgress = createUserProgress({
        cs101: { status: 'completed' },
        cs102: { status: 'completed' },
        cs103: { status: 'completed' },
      });

      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.completedHours).toBe(30000);
      expect(result.totalHours).toBe(30000);
    });
  });

  describe('percentage calculations', () => {
    it('calculates percentageComplete based on subject count not hours', () => {
      const subjects = [
        createSubject({ id: 'cs101', estimatedHours: 100 }),
        createSubject({ id: 'cs102', estimatedHours: 10 }),
      ];

      const userProgress = createUserProgress({
        cs101: { status: 'completed' }, // 100 hours but only 1/2 subjects
      });

      const result = calculateOverallProgress(subjects, userProgress);
      // 1 out of 2 subjects = 50%, regardless of hours
      expect(result.percentageComplete).toBe(50);
    });

    it('rounds percentage correctly', () => {
      const subjects = [
        createSubject({ id: 'cs101' }),
        createSubject({ id: 'cs102' }),
        createSubject({ id: 'cs103' }),
      ];

      const userProgress = createUserProgress({
        cs101: { status: 'completed' },
        // 1/3 = 33.33%, rounds to 33%
      });

      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.percentageComplete).toBe(33);
    });

    it('returns 100% when all subjects completed', () => {
      const subjects = [
        createSubject({ id: 'cs101' }),
        createSubject({ id: 'cs102' }),
      ];

      const userProgress = createUserProgress({
        cs101: { status: 'completed' },
        cs102: { status: 'completed' },
      });

      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.percentageComplete).toBe(100);
    });

    it('returns 0% for empty subjects array', () => {
      const userProgress = createUserProgress({});
      const result = calculateOverallProgress([], userProgress);
      expect(result.percentageComplete).toBe(0);
    });
  });

  describe('in-progress counting', () => {
    it('correctly counts in-progress subjects separate from completed', () => {
      const subjects = [
        createSubject({ id: 'cs101' }),
        createSubject({ id: 'cs102' }),
        createSubject({ id: 'cs103' }),
        createSubject({ id: 'cs104' }),
      ];

      const userProgress = createUserProgress({
        cs101: { status: 'completed' },
        cs102: { status: 'in_progress' },
        cs103: { status: 'in_progress' },
        // cs104: not started
      });

      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.completedSubjects).toBe(1);
      expect(result.inProgressSubjects).toBe(2);
      // percentageComplete is based on completed subjects only
      expect(result.percentageComplete).toBe(25);
    });
  });
});
