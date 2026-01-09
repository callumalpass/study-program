/**
 * Progress Passing Score Boundary Tests
 *
 * Tests that verify the exact boundary behavior around the QUIZ_PASSING_SCORE (70%)
 * threshold for quizzes, exams, and projects.
 */

import { describe, expect, it } from 'vitest';
import type { Subject, SubjectProgress, QuizAttempt, ExamAttempt, ProjectSubmission } from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';
import {
  calculateSubjectCompletion,
  isQuizCompleted,
  isExamCompleted,
  isProjectCompleted,
  getQuizBestScore,
  getExamBestScore,
} from '../src/core/progress';

const now = new Date().toISOString();

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
  timeSpentSeconds: 3600,
});

const makeProjectSubmission = (aiScore?: number): ProjectSubmission => ({
  submissionId: `sub-${Math.random()}`,
  timestamp: now,
  description: 'Test submission',
  selfAssessment: {},
  notes: '',
  aiEvaluation: aiScore !== undefined
    ? {
        score: aiScore,
        feedback: 'Test feedback',
        rubricScores: {},
        strengths: [],
        improvements: [],
      }
    : undefined,
});

const makeSubject = (overrides?: Partial<Subject>): Subject => ({
  id: 'test-subject',
  code: 'TEST100',
  title: 'Test Subject',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'Test description',
  learningObjectives: [],
  topics: [
    { id: 't1', title: 'Topic 1', content: '', quizIds: ['q1'], exerciseIds: [] },
  ],
  estimatedHours: 10,
  examIds: [],
  projectIds: [],
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

describe('QUIZ_PASSING_SCORE constant verification', () => {
  it('should be exactly 70', () => {
    expect(QUIZ_PASSING_SCORE).toBe(70);
  });
});

describe('Quiz passing score boundary tests', () => {
  it('score of 70 (exactly at threshold) should pass', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(70)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(true);
  });

  it('score of 69 (one below threshold) should fail', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(69)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(false);
  });

  it('score of 71 (one above threshold) should pass', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(71)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(true);
  });

  it('score of 69.9 (fractional just below) should fail', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(69.9)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(false);
  });

  it('score of 70.1 (fractional just above) should pass', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(70.1)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(true);
  });

  it('getQuizBestScore returns highest score regardless of pass/fail', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(50), makeQuizAttempt(69), makeQuizAttempt(65)] },
    });
    expect(getQuizBestScore('q1', progress)).toBe(69);
  });

  it('multiple attempts with best at exactly 70 should pass', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(50), makeQuizAttempt(65), makeQuizAttempt(70)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(true);
  });

  it('multiple attempts with best at 69 should fail', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(50), makeQuizAttempt(65), makeQuizAttempt(69)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(false);
  });
});

describe('Exam passing score boundary tests', () => {
  it('exam score of 70 (exactly at threshold) should pass', () => {
    const progress = makeProgress({
      examAttempts: { exam1: [makeExamAttempt(70)] },
    });
    expect(isExamCompleted('exam1', progress)).toBe(true);
  });

  it('exam score of 69 (one below threshold) should fail', () => {
    const progress = makeProgress({
      examAttempts: { exam1: [makeExamAttempt(69)] },
    });
    expect(isExamCompleted('exam1', progress)).toBe(false);
  });

  it('getExamBestScore returns highest score regardless of pass/fail', () => {
    const progress = makeProgress({
      examAttempts: { exam1: [makeExamAttempt(40), makeExamAttempt(65), makeExamAttempt(69)] },
    });
    expect(getExamBestScore('exam1', progress)).toBe(69);
  });
});

describe('Project passing score boundary tests', () => {
  it('project with AI score of 70 (exactly at threshold) should pass', () => {
    const progress = makeProgress({
      projectSubmissions: { proj1: [makeProjectSubmission(70)] },
    });
    expect(isProjectCompleted('proj1', progress)).toBe(true);
  });

  it('project with AI score of 69 (one below threshold) should fail', () => {
    const progress = makeProgress({
      projectSubmissions: { proj1: [makeProjectSubmission(69)] },
    });
    expect(isProjectCompleted('proj1', progress)).toBe(false);
  });

  it('project without AI evaluation should pass (any submission counts)', () => {
    const progress = makeProgress({
      projectSubmissions: { proj1: [makeProjectSubmission()] }, // No AI score
    });
    expect(isProjectCompleted('proj1', progress)).toBe(true);
  });

  it('multiple project submissions - best AI score of exactly 70 should pass', () => {
    const progress = makeProgress({
      projectSubmissions: {
        proj1: [makeProjectSubmission(50), makeProjectSubmission(65), makeProjectSubmission(70)],
      },
    });
    expect(isProjectCompleted('proj1', progress)).toBe(true);
  });

  it('multiple project submissions - best AI score of 69 should fail', () => {
    const progress = makeProgress({
      projectSubmissions: {
        proj1: [makeProjectSubmission(50), makeProjectSubmission(65), makeProjectSubmission(69)],
      },
    });
    expect(isProjectCompleted('proj1', progress)).toBe(false);
  });
});

describe('calculateSubjectCompletion boundary tests', () => {
  it('quiz at exactly 70 should contribute to completion', () => {
    const subject = makeSubject({
      topics: [{ id: 't1', title: 'Topic 1', content: '', quizIds: ['q1'], exerciseIds: [] }],
    });
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(70)] },
    });
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('quiz at 69 should not contribute to completion', () => {
    const subject = makeSubject({
      topics: [{ id: 't1', title: 'Topic 1', content: '', quizIds: ['q1'], exerciseIds: [] }],
    });
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(69)] },
    });
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('exam at exactly 70 should contribute to completion', () => {
    const subject = makeSubject({
      topics: [],
      examIds: ['exam1'],
    });
    const progress = makeProgress({
      examAttempts: { exam1: [makeExamAttempt(70)] },
    });
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('exam at 69 should not contribute to completion', () => {
    const subject = makeSubject({
      topics: [],
      examIds: ['exam1'],
    });
    const progress = makeProgress({
      examAttempts: { exam1: [makeExamAttempt(69)] },
    });
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('project with AI score at exactly 70 should contribute to completion', () => {
    const subject = makeSubject({
      topics: [],
      projectIds: ['proj1'],
    });
    const progress = makeProgress({
      projectSubmissions: { proj1: [makeProjectSubmission(70)] },
    });
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('project with AI score at 69 should not contribute to completion', () => {
    const subject = makeSubject({
      topics: [],
      projectIds: ['proj1'],
    });
    const progress = makeProgress({
      projectSubmissions: { proj1: [makeProjectSubmission(69)] },
    });
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });
});

describe('Edge case score values', () => {
  it('score of 0 should not pass', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(0)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(false);
    expect(getQuizBestScore('q1', progress)).toBe(0);
  });

  it('score of 100 should pass', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(100)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(true);
    expect(getQuizBestScore('q1', progress)).toBe(100);
  });

  it('negative score should not pass (edge case)', () => {
    // This shouldn't happen in practice, but test defensive behavior
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(-10)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(false);
  });

  it('score above 100 should pass (edge case)', () => {
    // This shouldn't happen in practice, but test defensive behavior
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(110)] },
    });
    expect(isQuizCompleted('q1', progress)).toBe(true);
  });
});
