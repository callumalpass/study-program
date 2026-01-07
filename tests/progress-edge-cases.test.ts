/**
 * Progress Edge Cases Tests
 *
 * Comprehensive tests for edge cases in progress calculation,
 * subject availability, and prerequisite handling.
 */

import { describe, expect, it, beforeEach } from 'vitest';
import type {
  Subject,
  SubjectProgress,
  UserProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
} from '../src/core/types';
import {
  calculateSubjectCompletion,
  arePrerequisitesMet,
  getAvailableSubjects,
  getCompletedSubjects,
  getInProgressSubjects,
  getNextRecommendedSubject,
  getDependentSubjects,
  getPrerequisiteSubjects,
  getSubjectsByYearAndSemester,
  calculateOverallProgress,
  canStartSubject,
  isQuizCompleted,
  isExerciseCompleted,
  getQuizBestScore,
} from '../src/core/progress';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

const now = new Date('2024-01-01T00:00:00.000Z').toISOString();

// Factory functions for test data
const makeQuizAttempt = (score: number, overrides?: Partial<QuizAttempt>): QuizAttempt => ({
  attemptId: `attempt-${Math.random().toString(36).slice(2)}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 60,
  ...overrides,
});

const makeExamAttempt = (score: number): ExamAttempt => ({
  attemptId: `exam-${Math.random().toString(36).slice(2)}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 1800,
});

const makeExerciseCompletion = (passed: boolean): ExerciseCompletion => ({
  completionId: `comp-${Math.random().toString(36).slice(2)}`,
  timestamp: now,
  code: 'console.log("test")',
  passed,
  timeSpentSeconds: 300,
});

const makeProjectSubmission = (aiScore?: number): ProjectSubmission => ({
  submissionId: `sub-${Math.random().toString(36).slice(2)}`,
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

const makeSubjectProgress = (overrides?: Partial<SubjectProgress>): SubjectProgress => ({
  status: 'not_started',
  quizAttempts: {},
  examAttempts: {},
  exerciseCompletions: {},
  projectSubmissions: {},
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

const makeSubject = (overrides: Partial<Subject>): Subject => ({
  id: 'test-subject',
  code: 'TEST100',
  title: 'Test Subject',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'Test description',
  learningObjectives: [],
  topics: [],
  estimatedHours: 10,
  ...overrides,
});

describe('calculateSubjectCompletion boundary cases', () => {
  it('returns 0% when status is not_started even with data', () => {
    const subject = makeSubject({
      topics: [{ id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] }],
    });
    const progress = makeSubjectProgress({
      status: 'not_started',
      quizAttempts: { q1: [makeQuizAttempt(100)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('returns 100% when status is completed regardless of data', () => {
    const subject = makeSubject({
      topics: [{ id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: ['e1'] }],
      examIds: ['exam1'],
      projectIds: ['proj1'],
    });
    const progress = makeSubjectProgress({
      status: 'completed',
      // No quiz attempts, exercise completions, etc.
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('calculates 50% when half items pass threshold', () => {
    const subject = makeSubject({
      topics: [{
        id: 't1',
        title: 'T1',
        content: '',
        quizIds: ['q1', 'q2'],
        exerciseIds: []
      }],
      examIds: [],
      projectIds: [],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      quizAttempts: {
        q1: [makeQuizAttempt(70)], // passes
        q2: [makeQuizAttempt(69)], // fails
      },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(50);
  });

  it('rounds completion percentage correctly', () => {
    const subject = makeSubject({
      topics: [{
        id: 't1',
        title: 'T1',
        content: '',
        quizIds: ['q1', 'q2', 'q3'],
        exerciseIds: []
      }],
      examIds: [],
      projectIds: [],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      quizAttempts: {
        q1: [makeQuizAttempt(70)], // passes (1/3 = 33.33%)
      },
    });

    // 1/3 = 33.33... should round to 33
    expect(calculateSubjectCompletion(subject, progress)).toBe(33);
  });

  it('uses best score from multiple quiz attempts', () => {
    const subject = makeSubject({
      topics: [{ id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] }],
      examIds: [],
      projectIds: [],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      quizAttempts: {
        q1: [
          makeQuizAttempt(50),
          makeQuizAttempt(65),
          makeQuizAttempt(75), // best, passes
          makeQuizAttempt(60),
        ],
      },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles subjects with zero items gracefully', () => {
    const subject = makeSubject({
      topics: [],
      examIds: [],
      projectIds: [],
    });
    const progress = makeSubjectProgress({ status: 'in_progress' });

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('handles undefined optional arrays', () => {
    const subject = makeSubject({
      topics: [{ id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] }],
      examIds: undefined,
      projectIds: undefined,
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      quizAttempts: { q1: [makeQuizAttempt(80)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });
});

describe('passing threshold consistency', () => {
  it('uses QUIZ_PASSING_SCORE constant consistently', () => {
    expect(QUIZ_PASSING_SCORE).toBe(70);
  });

  it('exactly at threshold (70) counts as passing', () => {
    const subject = makeSubject({
      topics: [{ id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] }],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      quizAttempts: { q1: [makeQuizAttempt(70)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    expect(isQuizCompleted('q1', progress)).toBe(true);
  });

  it('one below threshold (69) does not count as passing', () => {
    const subject = makeSubject({
      topics: [{ id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] }],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      quizAttempts: { q1: [makeQuizAttempt(69)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    expect(isQuizCompleted('q1', progress)).toBe(false);
  });
});

describe('exercise completion edge cases', () => {
  it('only counts passed exercises', () => {
    const subject = makeSubject({
      topics: [{
        id: 't1',
        title: 'T1',
        content: '',
        quizIds: [],
        exerciseIds: ['e1', 'e2']
      }],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      exerciseCompletions: {
        e1: makeExerciseCompletion(true),
        e2: makeExerciseCompletion(false),
      },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    expect(isExerciseCompleted('e1', progress)).toBe(true);
    expect(isExerciseCompleted('e2', progress)).toBe(false);
  });

  it('handles missing exercise completions gracefully', () => {
    const subject = makeSubject({
      topics: [{ id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: ['e1'] }],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      exerciseCompletions: {},
    });

    expect(isExerciseCompleted('e1', progress)).toBe(false);
  });
});

describe('project submission edge cases', () => {
  it('counts project without AI evaluation as complete', () => {
    const subject = makeSubject({
      topics: [],
      projectIds: ['proj1'],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      projectSubmissions: {
        proj1: [makeProjectSubmission()], // No AI evaluation
      },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('requires passing AI score when AI evaluation exists', () => {
    const subject = makeSubject({
      topics: [],
      projectIds: ['proj1'],
    });

    const failingProgress = makeSubjectProgress({
      status: 'in_progress',
      projectSubmissions: {
        proj1: [makeProjectSubmission(69)], // Failing AI score
      },
    });
    expect(calculateSubjectCompletion(subject, failingProgress)).toBe(0);

    const passingProgress = makeSubjectProgress({
      status: 'in_progress',
      projectSubmissions: {
        proj1: [makeProjectSubmission(70)], // Passing AI score
      },
    });
    expect(calculateSubjectCompletion(subject, passingProgress)).toBe(100);
  });

  it('uses best AI score from multiple submissions', () => {
    const subject = makeSubject({
      topics: [],
      projectIds: ['proj1'],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      projectSubmissions: {
        proj1: [
          makeProjectSubmission(50),
          makeProjectSubmission(65),
          makeProjectSubmission(75), // Best, passes
          makeProjectSubmission(60),
        ],
      },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles empty submissions array', () => {
    const subject = makeSubject({
      topics: [],
      projectIds: ['proj1'],
    });
    const progress = makeSubjectProgress({
      status: 'in_progress',
      projectSubmissions: {
        proj1: [],
      },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });
});

describe('prerequisite handling edge cases', () => {
  it('handles empty prerequisites array', () => {
    const subject = makeSubject({ id: 'a', prerequisites: [] });
    const progress = makeUserProgress({});

    expect(arePrerequisitesMet(subject, progress)).toBe(true);
    expect(canStartSubject(subject, progress)).toBe(true);
  });

  it('handles undefined prerequisites', () => {
    const subject: Subject = {
      ...makeSubject({ id: 'a' }),
      prerequisites: undefined as unknown as string[],
    };
    const progress = makeUserProgress({});

    // Should not crash and treat as no prerequisites
    expect(arePrerequisitesMet(subject, progress)).toBe(true);
  });

  it('requires ALL prerequisites to be completed', () => {
    const subjectC = makeSubject({ id: 'c', prerequisites: ['a', 'b'] });

    const partialProgress = makeUserProgress({
      a: makeSubjectProgress({ status: 'completed' }),
      b: makeSubjectProgress({ status: 'in_progress' }),
    });
    expect(arePrerequisitesMet(subjectC, partialProgress)).toBe(false);

    const fullProgress = makeUserProgress({
      a: makeSubjectProgress({ status: 'completed' }),
      b: makeSubjectProgress({ status: 'completed' }),
    });
    expect(arePrerequisitesMet(subjectC, fullProgress)).toBe(true);
  });

  it('handles non-existent prerequisite subjects', () => {
    const subject = makeSubject({ id: 'b', prerequisites: ['nonexistent'] });
    const progress = makeUserProgress({});

    // Missing prerequisite progress = not met
    expect(arePrerequisitesMet(subject, progress)).toBe(false);
  });

  it('blocks starting completed subjects', () => {
    const subject = makeSubject({ id: 'a' });
    const progress = makeUserProgress({
      a: makeSubjectProgress({ status: 'completed' }),
    });

    expect(canStartSubject(subject, progress)).toBe(false);
  });
});

describe('subject filtering and grouping', () => {
  const subjects = [
    makeSubject({ id: 'a', year: 1, semester: 1 }),
    makeSubject({ id: 'b', year: 1, semester: 2 }),
    makeSubject({ id: 'c', year: 2, semester: 1 }),
    makeSubject({ id: 'd', year: 2, semester: 2 }),
  ];

  it('groups subjects by year and semester correctly', () => {
    const grouped = getSubjectsByYearAndSemester(subjects);

    expect(grouped.get(1)?.get(1)?.length).toBe(1);
    expect(grouped.get(1)?.get(2)?.length).toBe(1);
    expect(grouped.get(2)?.get(1)?.length).toBe(1);
    expect(grouped.get(2)?.get(2)?.length).toBe(1);
  });

  it('handles empty subject array', () => {
    const grouped = getSubjectsByYearAndSemester([]);
    expect(grouped.size).toBe(0);
  });

  it('filters in-progress subjects correctly', () => {
    const progress = makeUserProgress({
      a: makeSubjectProgress({ status: 'in_progress' }),
      b: makeSubjectProgress({ status: 'completed' }),
    });

    const inProgress = getInProgressSubjects(subjects, progress);
    expect(inProgress.length).toBe(1);
    expect(inProgress[0].id).toBe('a');
  });

  it('filters completed subjects correctly', () => {
    const progress = makeUserProgress({
      a: makeSubjectProgress({ status: 'completed' }),
      b: makeSubjectProgress({ status: 'completed' }),
      c: makeSubjectProgress({ status: 'in_progress' }),
    });

    const completed = getCompletedSubjects(subjects, progress);
    expect(completed.length).toBe(2);
    expect(completed.map(s => s.id).sort()).toEqual(['a', 'b']);
  });

  it('returns all available subjects when no prerequisites blocked', () => {
    const progress = makeUserProgress({});
    const available = getAvailableSubjects(subjects, progress);
    expect(available.length).toBe(4);
  });
});

describe('getNextRecommendedSubject', () => {
  it('prioritizes in-progress over not-started', () => {
    const subjects = [
      makeSubject({ id: 'a', year: 1, semester: 1 }),
      makeSubject({ id: 'b', year: 1, semester: 2 }),
    ];
    const progress = makeUserProgress({
      b: makeSubjectProgress({ status: 'in_progress' }),
    });

    const next = getNextRecommendedSubject(subjects, progress);
    expect(next?.id).toBe('b');
  });

  it('returns earliest year/semester for in-progress', () => {
    const subjects = [
      makeSubject({ id: 'a', year: 2, semester: 1 }),
      makeSubject({ id: 'b', year: 1, semester: 2 }),
      makeSubject({ id: 'c', year: 1, semester: 1 }),
    ];
    const progress = makeUserProgress({
      a: makeSubjectProgress({ status: 'in_progress' }),
      b: makeSubjectProgress({ status: 'in_progress' }),
      c: makeSubjectProgress({ status: 'in_progress' }),
    });

    const next = getNextRecommendedSubject(subjects, progress);
    expect(next?.id).toBe('c');
  });

  it('returns earliest available when none in-progress', () => {
    const subjects = [
      makeSubject({ id: 'a', year: 2, semester: 1 }),
      makeSubject({ id: 'b', year: 1, semester: 1 }),
    ];
    const progress = makeUserProgress({});

    const next = getNextRecommendedSubject(subjects, progress);
    expect(next?.id).toBe('b');
  });

  it('returns null when all completed', () => {
    const subjects = [
      makeSubject({ id: 'a' }),
      makeSubject({ id: 'b' }),
    ];
    const progress = makeUserProgress({
      a: makeSubjectProgress({ status: 'completed' }),
      b: makeSubjectProgress({ status: 'completed' }),
    });

    const next = getNextRecommendedSubject(subjects, progress);
    expect(next).toBeNull();
  });

  it('returns null for empty subjects array', () => {
    const progress = makeUserProgress({});
    expect(getNextRecommendedSubject([], progress)).toBeNull();
  });
});

describe('subject relationships', () => {
  const subjects = [
    makeSubject({ id: 'a', prerequisites: [] }),
    makeSubject({ id: 'b', prerequisites: ['a'] }),
    makeSubject({ id: 'c', prerequisites: ['a'] }),
    makeSubject({ id: 'd', prerequisites: ['b', 'c'] }),
  ];

  it('finds all dependent subjects', () => {
    const dependents = getDependentSubjects('a', subjects);
    expect(dependents.length).toBe(2);
    expect(dependents.map(s => s.id).sort()).toEqual(['b', 'c']);
  });

  it('finds prerequisite subjects', () => {
    const subjectD = subjects[3];
    const prereqs = getPrerequisiteSubjects(subjectD, subjects);
    expect(prereqs.length).toBe(2);
    expect(prereqs.map(s => s.id).sort()).toEqual(['b', 'c']);
  });

  it('handles subject with no dependents', () => {
    const dependents = getDependentSubjects('d', subjects);
    expect(dependents.length).toBe(0);
  });

  it('handles subject with no prerequisites', () => {
    const subjectA = subjects[0];
    const prereqs = getPrerequisiteSubjects(subjectA, subjects);
    expect(prereqs.length).toBe(0);
  });
});

describe('calculateOverallProgress', () => {
  it('returns zeros for empty subjects', () => {
    const progress = makeUserProgress({});
    const overall = calculateOverallProgress([], progress);

    expect(overall.totalSubjects).toBe(0);
    expect(overall.completedSubjects).toBe(0);
    expect(overall.inProgressSubjects).toBe(0);
    expect(overall.totalHours).toBe(0);
    expect(overall.completedHours).toBe(0);
    expect(overall.percentageComplete).toBe(0);
  });

  it('calculates completed percentage based on subjects not hours', () => {
    const subjects = [
      makeSubject({ id: 'a', estimatedHours: 100 }),
      makeSubject({ id: 'b', estimatedHours: 10 }),
    ];
    const progress = makeUserProgress({
      a: makeSubjectProgress({ status: 'completed' }),
    });

    const overall = calculateOverallProgress(subjects, progress);
    expect(overall.percentageComplete).toBe(50); // 1/2 subjects
    expect(overall.completedHours).toBe(100);
  });

  it('calculates partial hours for in-progress subjects', () => {
    const subject = makeSubject({
      id: 'a',
      estimatedHours: 100,
      topics: [{
        id: 't1',
        title: 'T1',
        content: '',
        quizIds: ['q1', 'q2'],
        exerciseIds: []
      }],
      examIds: [],
      projectIds: [],
    });

    const progress = makeUserProgress({
      a: makeSubjectProgress({
        status: 'in_progress',
        quizAttempts: { q1: [makeQuizAttempt(80)] }, // 1/2 = 50%
      }),
    });

    const overall = calculateOverallProgress([subject], progress);
    expect(overall.completedHours).toBe(50); // 50% of 100 hours
  });
});

describe('quiz helper functions', () => {
  it('returns null for non-existent quiz', () => {
    const progress = makeSubjectProgress();
    expect(getQuizBestScore('nonexistent', progress)).toBeNull();
    expect(isQuizCompleted('nonexistent', progress)).toBe(false);
  });

  it('returns null for undefined progress', () => {
    expect(getQuizBestScore('q1', undefined)).toBeNull();
    expect(isQuizCompleted('q1', undefined)).toBe(false);
  });

  it('returns best score from multiple attempts', () => {
    const progress = makeSubjectProgress({
      quizAttempts: {
        q1: [
          makeQuizAttempt(50),
          makeQuizAttempt(90),
          makeQuizAttempt(75),
        ],
      },
    });

    expect(getQuizBestScore('q1', progress)).toBe(90);
  });

  it('handles single attempt', () => {
    const progress = makeSubjectProgress({
      quizAttempts: { q1: [makeQuizAttempt(85)] },
    });

    expect(getQuizBestScore('q1', progress)).toBe(85);
    expect(isQuizCompleted('q1', progress)).toBe(true);
  });
});
