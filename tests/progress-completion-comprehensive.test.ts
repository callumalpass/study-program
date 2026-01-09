/**
 * Comprehensive Tests for Progress Completion Calculation
 *
 * Tests the calculateSubjectCompletion function with various
 * edge cases and scenarios to ensure accurate progress tracking.
 */

import { describe, expect, it } from 'vitest';
import type {
  Subject,
  SubjectProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
  Topic,
} from '../src/core/types';
import { calculateSubjectCompletion } from '../src/core/progress';

// Import the constant for verification
import { QUIZ_PASSING_SCORE } from '../src/core/types';

const now = new Date().toISOString();

// Helper factories
const makeQuizAttempt = (score: number): QuizAttempt => ({
  attemptId: `attempt-${Math.random()}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 60,
});

const makeExamAttempt = (score: number): ExamAttempt => ({
  attemptId: `exam-${Math.random()}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 120,
});

const makeExerciseCompletion = (passed: boolean): ExerciseCompletion => ({
  completionId: `ex-${Math.random()}`,
  timestamp: now,
  code: 'print("hello")',
  passed,
  timeSpentSeconds: 30,
});

const makeProjectSubmission = (aiScore?: number): ProjectSubmission => ({
  submissionId: `proj-${Math.random()}`,
  timestamp: now,
  description: 'My project',
  selfAssessment: {},
  notes: '',
  aiEvaluation: aiScore === undefined
    ? undefined
    : {
        score: aiScore,
        feedback: 'Good work',
        rubricScores: {},
        strengths: [],
        improvements: [],
      },
});

const makeTopic = (id: string, quizIds: string[], exerciseIds: string[]): Topic => ({
  id,
  title: `Topic ${id}`,
  content: '',
  quizIds,
  exerciseIds,
});

const makeSubject = (overrides: Partial<Subject>): Subject => ({
  id: 'test-subject',
  code: 'TEST101',
  title: 'Test Subject',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'A test subject',
  learningObjectives: [],
  topics: [],
  estimatedHours: 10,
  ...overrides,
});

const makeProgress = (overrides?: Partial<SubjectProgress>): SubjectProgress => ({
  status: 'in_progress',
  quizAttempts: {},
  examAttempts: {},
  exerciseCompletions: {},
  projectSubmissions: {},
  ...overrides,
});

describe('calculateSubjectCompletion', () => {
  describe('basic calculations', () => {
    it('returns 0 for subject with no trackable items', () => {
      const subject = makeSubject({
        topics: [],
        examIds: [],
        projectIds: [],
      });
      const progress = makeProgress();

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('returns 0 for undefined progress', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], ['e1'])],
      });

      expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
    });

    it('returns 100 when all items are completed', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], ['e1'])],
        examIds: ['exam1'],
        projectIds: ['proj1'],
      });
      const progress = makeProgress({
        quizAttempts: { q1: [makeQuizAttempt(QUIZ_PASSING_SCORE)] },
        exerciseCompletions: { e1: makeExerciseCompletion(true) },
        examAttempts: { exam1: [makeExamAttempt(QUIZ_PASSING_SCORE)] },
        projectSubmissions: { proj1: [makeProjectSubmission()] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('quiz completion', () => {
    it('counts quiz as complete when score meets passing threshold', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: { q1: [makeQuizAttempt(QUIZ_PASSING_SCORE)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts quiz as incomplete when score is below passing threshold', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: { q1: [makeQuizAttempt(QUIZ_PASSING_SCORE - 1)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('uses best attempt score when multiple attempts exist', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: {
          q1: [
            makeQuizAttempt(50),
            makeQuizAttempt(QUIZ_PASSING_SCORE), // Passing attempt
            makeQuizAttempt(60),
          ],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles multiple quizzes', () => {
      const subject = makeSubject({
        topics: [
          makeTopic('t1', ['q1', 'q2'], []),
          makeTopic('t2', ['q3', 'q4'], []),
        ],
      });
      const progress = makeProgress({
        quizAttempts: {
          q1: [makeQuizAttempt(QUIZ_PASSING_SCORE)],
          q2: [makeQuizAttempt(QUIZ_PASSING_SCORE)],
          // q3 and q4 not attempted
        },
      });

      // 2 out of 4 quizzes passed = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('handles quiz at exactly passing threshold', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: { q1: [makeQuizAttempt(QUIZ_PASSING_SCORE)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles quiz one point below passing threshold', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: { q1: [makeQuizAttempt(QUIZ_PASSING_SCORE - 1)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles quiz one point above passing threshold', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: { q1: [makeQuizAttempt(QUIZ_PASSING_SCORE + 1)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('exercise completion', () => {
    it('counts passed exercise as complete', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', [], ['e1'])],
      });
      const progress = makeProgress({
        exerciseCompletions: { e1: makeExerciseCompletion(true) },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts failed exercise as incomplete', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', [], ['e1'])],
      });
      const progress = makeProgress({
        exerciseCompletions: { e1: makeExerciseCompletion(false) },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles multiple exercises', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', [], ['e1', 'e2', 'e3', 'e4'])],
      });
      const progress = makeProgress({
        exerciseCompletions: {
          e1: makeExerciseCompletion(true),
          e2: makeExerciseCompletion(true),
          e3: makeExerciseCompletion(false),
          // e4 not attempted
        },
      });

      // 2 out of 4 exercises passed = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });
  });

  describe('exam completion', () => {
    it('counts exam as complete when score meets passing threshold', () => {
      const subject = makeSubject({
        topics: [],
        examIds: ['exam1'],
      });
      const progress = makeProgress({
        examAttempts: { exam1: [makeExamAttempt(QUIZ_PASSING_SCORE)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts exam as incomplete when score is below passing threshold', () => {
      const subject = makeSubject({
        topics: [],
        examIds: ['exam1'],
      });
      const progress = makeProgress({
        examAttempts: { exam1: [makeExamAttempt(QUIZ_PASSING_SCORE - 1)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('uses best attempt score for exams', () => {
      const subject = makeSubject({
        topics: [],
        examIds: ['exam1'],
      });
      const progress = makeProgress({
        examAttempts: {
          exam1: [
            makeExamAttempt(40),
            makeExamAttempt(QUIZ_PASSING_SCORE),
            makeExamAttempt(50),
          ],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles midterm and final exams', () => {
      const subject = makeSubject({
        topics: [],
        examIds: ['midterm', 'final'],
      });
      const progress = makeProgress({
        examAttempts: {
          midterm: [makeExamAttempt(QUIZ_PASSING_SCORE)],
          // final not attempted
        },
      });

      // 1 out of 2 exams = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });
  });

  describe('project completion', () => {
    it('counts project with AI evaluation above threshold as complete', () => {
      const subject = makeSubject({
        topics: [],
        projectIds: ['proj1'],
      });
      const progress = makeProgress({
        projectSubmissions: { proj1: [makeProjectSubmission(QUIZ_PASSING_SCORE)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts project with AI evaluation below threshold as incomplete', () => {
      const subject = makeSubject({
        topics: [],
        projectIds: ['proj1'],
      });
      const progress = makeProgress({
        projectSubmissions: { proj1: [makeProjectSubmission(QUIZ_PASSING_SCORE - 1)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('counts project without AI evaluation as complete (self-assessed)', () => {
      const subject = makeSubject({
        topics: [],
        projectIds: ['proj1'],
      });
      const progress = makeProgress({
        projectSubmissions: { proj1: [makeProjectSubmission()] }, // No AI score
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('uses best AI evaluation score when multiple submissions exist', () => {
      const subject = makeSubject({
        topics: [],
        projectIds: ['proj1'],
      });
      const progress = makeProgress({
        projectSubmissions: {
          proj1: [
            makeProjectSubmission(50),
            makeProjectSubmission(QUIZ_PASSING_SCORE),
            makeProjectSubmission(60),
          ],
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles multiple projects', () => {
      const subject = makeSubject({
        topics: [],
        projectIds: ['proj1', 'proj2'],
      });
      const progress = makeProgress({
        projectSubmissions: {
          proj1: [makeProjectSubmission(QUIZ_PASSING_SCORE)],
          // proj2 not submitted
        },
      });

      // 1 out of 2 projects = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });
  });

  describe('combined items', () => {
    it('calculates correct percentage with all item types', () => {
      const subject = makeSubject({
        topics: [
          makeTopic('t1', ['q1'], ['e1']),
          makeTopic('t2', ['q2'], ['e2']),
        ],
        examIds: ['exam1'],
        projectIds: ['proj1'],
      });
      const progress = makeProgress({
        quizAttempts: {
          q1: [makeQuizAttempt(QUIZ_PASSING_SCORE)],
          q2: [makeQuizAttempt(50)], // Failed
        },
        exerciseCompletions: {
          e1: makeExerciseCompletion(true),
          // e2 not attempted
        },
        examAttempts: {
          exam1: [makeExamAttempt(QUIZ_PASSING_SCORE)],
        },
        projectSubmissions: {
          proj1: [makeProjectSubmission(80)],
        },
      });

      // Items: q1(pass), q2(fail), e1(pass), e2(none), exam1(pass), proj1(pass)
      // Passed: 4 out of 6 = 67%
      expect(calculateSubjectCompletion(subject, progress)).toBe(67);
    });

    it('handles subject with no projects or exams', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], ['e1'])],
        examIds: undefined,
        projectIds: undefined,
      });
      const progress = makeProgress({
        quizAttempts: { q1: [makeQuizAttempt(QUIZ_PASSING_SCORE)] },
        exerciseCompletions: { e1: makeExerciseCompletion(true) },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles subject with empty arrays', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', [], [])],
        examIds: [],
        projectIds: [],
      });
      const progress = makeProgress();

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('rounds percentage correctly', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1', 'q2', 'q3'], [])],
      });
      const progress = makeProgress({
        quizAttempts: {
          q1: [makeQuizAttempt(QUIZ_PASSING_SCORE)],
          // q2 and q3 not attempted
        },
      });

      // 1/3 = 33.33... should round to 33
      expect(calculateSubjectCompletion(subject, progress)).toBe(33);
    });

    it('handles empty quiz attempts array', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: { q1: [] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles empty exam attempts array', () => {
      const subject = makeSubject({
        topics: [],
        examIds: ['exam1'],
      });
      const progress = makeProgress({
        examAttempts: { exam1: [] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles empty project submissions array', () => {
      const subject = makeSubject({
        topics: [],
        projectIds: ['proj1'],
      });
      const progress = makeProgress({
        projectSubmissions: { proj1: [] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('ignores extra quiz attempts not in subject', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: {
          q1: [makeQuizAttempt(QUIZ_PASSING_SCORE)],
          extra: [makeQuizAttempt(100)], // Not in subject
        },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles large number of items', () => {
      const quizIds = Array.from({ length: 100 }, (_, i) => `q${i}`);
      const subject = makeSubject({
        topics: [makeTopic('t1', quizIds, [])],
      });

      const quizAttempts: Record<string, QuizAttempt[]> = {};
      for (let i = 0; i < 75; i++) {
        quizAttempts[`q${i}`] = [makeQuizAttempt(QUIZ_PASSING_SCORE)];
      }

      const progress = makeProgress({ quizAttempts });

      // 75 out of 100 = 75%
      expect(calculateSubjectCompletion(subject, progress)).toBe(75);
    });
  });

  describe('passing score consistency', () => {
    it('uses consistent passing score from types', () => {
      // Verify the passing score constant exists and is 70
      expect(QUIZ_PASSING_SCORE).toBe(70);
    });

    it('handles score of 0', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: { q1: [makeQuizAttempt(0)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles perfect score of 100', () => {
      const subject = makeSubject({
        topics: [makeTopic('t1', ['q1'], [])],
      });
      const progress = makeProgress({
        quizAttempts: { q1: [makeQuizAttempt(100)] },
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });
});
