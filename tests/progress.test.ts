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
import {
  arePrerequisitesMet,
  calculateOverallProgress,
  calculateSubjectCompletion,
  getAvailableSubjects,
  getCompletedSubjects,
  getDependentSubjects,
  getInProgressSubjects,
  getNextRecommendedSubject,
  getPrerequisiteSubjects,
  getQuizBestScore,
  getSubjectsByYearAndSemester,
  canStartSubject,
  isExerciseCompleted,
  isQuizCompleted,
} from '../src/core/progress';

const now = new Date('2024-01-01T00:00:00.000Z').toISOString();

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
  topics: [
    {
      id: 't1',
      title: 'Topic 1',
      content: '',
      quizIds: ['q1'],
      exerciseIds: ['e1'],
    },
  ],
  estimatedHours: 10,
  examIds: ['exam1'],
  projectIds: ['proj1'],
  ...overrides,
});

describe('calculateSubjectCompletion', () => {
  it('returns 0 for missing or not-started progress', () => {
    const subject = subjectTemplate({});
    expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
    expect(calculateSubjectCompletion(subject, makeProgress())).toBe(0);
  });

  it('returns 0 when there are no trackable items', () => {
    const subject = subjectTemplate({
      topics: [],
      examIds: [],
      projectIds: [],
    });
    const progress = makeProgress({ status: 'in_progress' });
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('returns 100 for completed progress', () => {
    const subject = subjectTemplate({});
    const progress = makeProgress({ status: 'completed' });
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('calculates completion based on items and scores', () => {
    const subject = subjectTemplate({});
    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: { q1: [makeQuizAttempt(80)] },
      exerciseCompletions: { e1: makeExerciseCompletion(false) },
      examAttempts: { exam1: [makeExamAttempt(65)] },
      projectSubmissions: { proj1: [makeProjectSubmission(90)] },
    });

    // 4 total items: quiz passed, exercise failed, exam failed, project passed => 50%
    expect(calculateSubjectCompletion(subject, progress)).toBe(50);
  });

  it('counts project submissions without AI evaluation as completed', () => {
    const subject = subjectTemplate({});
    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: {},
      exerciseCompletions: {},
      examAttempts: {},
      projectSubmissions: { proj1: [makeProjectSubmission()] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(25);
  });
});

describe('subject availability and filtering', () => {
  const subjectA = subjectTemplate({ id: 'a', year: 1, semester: 1 });
  const subjectB = subjectTemplate({ id: 'b', year: 1, semester: 2, prerequisites: ['a'] });

  it('checks prerequisites and available subjects', () => {
    const progress = makeUserProgress({
      a: makeProgress({ status: 'completed' }),
    });

    expect(arePrerequisitesMet(subjectB, progress)).toBe(true);
    expect(getAvailableSubjects([subjectA, subjectB], progress)).toEqual([subjectA, subjectB]);
  });

  it('blocks subjects when prerequisites are not met', () => {
    const progress = makeUserProgress({
      a: makeProgress({ status: 'in_progress' }),
    });

    expect(arePrerequisitesMet(subjectB, progress)).toBe(false);
    expect(getAvailableSubjects([subjectA, subjectB], progress)).toEqual([subjectA]);
  });

  it('filters by progress status', () => {
    const progress = makeUserProgress({
      a: makeProgress({ status: 'in_progress' }),
      b: makeProgress({ status: 'completed' }),
    });

    expect(getInProgressSubjects([subjectA, subjectB], progress)).toEqual([subjectA]);
    expect(getCompletedSubjects([subjectA, subjectB], progress)).toEqual([subjectB]);
  });
});

describe('overall progress and recommendations', () => {
  it('calculates overall progress based on completed subjects', () => {
    const subjectA = subjectTemplate({ id: 'a', year: 1, semester: 1, estimatedHours: 10 });
    const subjectB = subjectTemplate({ id: 'b', year: 1, semester: 2, estimatedHours: 20 });

    const progress = makeUserProgress({
      a: makeProgress({ status: 'completed' }),
      b: makeProgress({
        status: 'in_progress',
        quizAttempts: { q1: [makeQuizAttempt(70)] },
        exerciseCompletions: { e1: makeExerciseCompletion(false) },
        examAttempts: {},
        projectSubmissions: {},
      }),
    });

    const summary = calculateOverallProgress([subjectA, subjectB], progress);
    expect(summary.totalSubjects).toBe(2);
    expect(summary.completedSubjects).toBe(1);
    expect(summary.inProgressSubjects).toBe(1);
    expect(summary.totalHours).toBe(30);
    expect(summary.completedHours).toBe(15);
    expect(summary.percentageComplete).toBe(50);
  });

  it('returns zeroed totals when there are no subjects', () => {
    const progress = makeUserProgress({});
    const summary = calculateOverallProgress([], progress);

    expect(summary.totalSubjects).toBe(0);
    expect(summary.completedSubjects).toBe(0);
    expect(summary.inProgressSubjects).toBe(0);
    expect(summary.totalHours).toBe(0);
    expect(summary.completedHours).toBe(0);
    expect(summary.percentageComplete).toBe(0);
  });

  it('recommends earliest in-progress subject first', () => {
    const subjectA = subjectTemplate({ id: 'a', year: 2, semester: 2 });
    const subjectB = subjectTemplate({ id: 'b', year: 1, semester: 2 });

    const progress = makeUserProgress({
      a: makeProgress({ status: 'in_progress' }),
      b: makeProgress({ status: 'in_progress' }),
    });

    expect(getNextRecommendedSubject([subjectA, subjectB], progress)).toEqual(subjectB);
  });

  it('recommends earliest available subject when none are in progress', () => {
    const subjectA = subjectTemplate({ id: 'a', year: 1, semester: 2 });
    const subjectB = subjectTemplate({ id: 'b', year: 1, semester: 1, prerequisites: ['a'] });
    const progress = makeUserProgress({
      a: makeProgress({ status: 'not_started' }),
    });

    expect(getNextRecommendedSubject([subjectA, subjectB], progress)).toEqual(subjectA);
  });
});

describe('quiz and exercise helpers', () => {
  it('determines quiz completion and best score', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(60), makeQuizAttempt(75)] },
    });

    expect(isQuizCompleted('q1', progress)).toBe(true);
    expect(getQuizBestScore('q1', progress)).toBe(75);
  });

  it('returns null best score when there are no attempts', () => {
    const progress = makeProgress();
    expect(getQuizBestScore('q1', progress)).toBeNull();
    expect(isQuizCompleted('q1', progress)).toBe(false);
  });

  it('determines exercise completion', () => {
    const progress = makeProgress({
      exerciseCompletions: { e1: makeExerciseCompletion(true) },
    });

    expect(isExerciseCompleted('e1', progress)).toBe(true);
  });
});

describe('subject grouping and relationships', () => {
  it('groups subjects by year and semester', () => {
    const subjectA = subjectTemplate({ id: 'a', year: 1, semester: 1 });
    const subjectB = subjectTemplate({ id: 'b', year: 1, semester: 2 });
    const subjectC = subjectTemplate({ id: 'c', year: 2, semester: 1 });

    const grouped = getSubjectsByYearAndSemester([subjectA, subjectB, subjectC]);

    expect(grouped.get(1)?.get(1)).toEqual([subjectA]);
    expect(grouped.get(1)?.get(2)).toEqual([subjectB]);
    expect(grouped.get(2)?.get(1)).toEqual([subjectC]);
  });

  it('finds dependent and prerequisite subjects', () => {
    const subjectA = subjectTemplate({ id: 'a', prerequisites: [] });
    const subjectB = subjectTemplate({ id: 'b', prerequisites: ['a'] });
    const subjectC = subjectTemplate({ id: 'c', prerequisites: ['a'] });

    expect(getDependentSubjects('a', [subjectA, subjectB, subjectC])).toEqual([subjectB, subjectC]);
    expect(getPrerequisiteSubjects(subjectB, [subjectA, subjectB, subjectC])).toEqual([subjectA]);
  });

  it('handles subjects with undefined prerequisites in getDependentSubjects', () => {
    const subjectA = subjectTemplate({ id: 'a', prerequisites: [] });
    // Simulate a malformed subject with undefined prerequisites at runtime
    const subjectB = {
      ...subjectTemplate({ id: 'b' }),
      prerequisites: undefined as unknown as string[],
    };
    const subjectC = subjectTemplate({ id: 'c', prerequisites: ['a'] });

    // Should not crash and should only return subjects with valid prerequisites
    expect(getDependentSubjects('a', [subjectA, subjectB, subjectC])).toEqual([subjectC]);
  });

  it('handles subject with undefined prerequisites in getPrerequisiteSubjects', () => {
    const subjectA = subjectTemplate({ id: 'a', prerequisites: [] });
    // Simulate a malformed subject with undefined prerequisites at runtime
    const subjectB = {
      ...subjectTemplate({ id: 'b' }),
      prerequisites: undefined as unknown as string[],
    };

    // Should not crash and should return empty array
    expect(getPrerequisiteSubjects(subjectB, [subjectA, subjectB])).toEqual([]);
  });
});

describe('canStartSubject', () => {
  it('prevents starting completed subjects', () => {
    const subject = subjectTemplate({ id: 'a' });
    const progress = makeUserProgress({
      a: makeProgress({ status: 'completed' }),
    });

    expect(canStartSubject(subject, progress)).toBe(false);
  });

  it('allows starting when prerequisites are met', () => {
    const subjectA = subjectTemplate({ id: 'a' });
    const subjectB = subjectTemplate({ id: 'b', prerequisites: ['a'] });
    const progress = makeUserProgress({
      a: makeProgress({ status: 'completed' }),
    });

    expect(canStartSubject(subjectB, progress)).toBe(true);
  });
});

describe('project submission edge cases', () => {
  it('handles empty project submissions gracefully', () => {
    const subject = subjectTemplate({
      projectIds: ['proj1'],
      topics: [],
      examIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      projectSubmissions: { proj1: [] },
    });

    // Empty submissions array should not crash and should return 0% completion
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('handles missing project submissions object', () => {
    const subject = subjectTemplate({
      projectIds: ['proj1'],
      topics: [],
      examIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      projectSubmissions: {},
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('selects best project submission by AI score', () => {
    const subject = subjectTemplate({
      projectIds: ['proj1'],
      topics: [],
      examIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      projectSubmissions: {
        proj1: [
          makeProjectSubmission(50),  // First submission - failing score
          makeProjectSubmission(75),  // Second submission - passing score
          makeProjectSubmission(60),  // Third submission - failing score
        ],
      },
    });

    // Best score is 75 (passing), so project should be counted as complete
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles mixed AI-evaluated and non-AI-evaluated submissions', () => {
    const subject = subjectTemplate({
      projectIds: ['proj1'],
      topics: [],
      examIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      projectSubmissions: {
        proj1: [
          makeProjectSubmission(),     // No AI evaluation
          makeProjectSubmission(50),   // Low AI score
        ],
      },
    });

    // Best submission has AI score 50 (> 0), but it's below passing threshold
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('treats undefined projectSubmissions property as empty', () => {
    const subject = subjectTemplate({
      projectIds: ['proj1'],
      topics: [],
      examIds: [],
    });
    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: undefined as unknown as Record<string, ProjectSubmission[]>,
    };

    // Should not crash
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });
});

describe('quiz and exam scoring edge cases', () => {
  it('handles multiple quiz attempts with all failing scores', () => {
    const subject = subjectTemplate({
      topics: [{
        id: 't1',
        title: 'Topic 1',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
      examIds: [],
      projectIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: {
        q1: [makeQuizAttempt(50), makeQuizAttempt(60), makeQuizAttempt(69)],
      },
    });

    // Best score is 69, which is below 70 threshold
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    expect(isQuizCompleted('q1', progress)).toBe(false);
    expect(getQuizBestScore('q1', progress)).toBe(69);
  });

  it('correctly identifies passing score at threshold', () => {
    const progress = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(70)] },
    });

    expect(isQuizCompleted('q1', progress)).toBe(true);
    expect(getQuizBestScore('q1', progress)).toBe(70);
  });

  it('handles subject with multiple topics and partial completion', () => {
    const subject = subjectTemplate({
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1', 'q2'], exerciseIds: ['e1'] },
        { id: 't2', title: 'T2', content: '', quizIds: ['q3'], exerciseIds: ['e2', 'e3'] },
      ],
      examIds: ['midterm', 'final'],
      projectIds: ['proj1'],
    });

    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: {
        q1: [makeQuizAttempt(80)],  // passed
        q2: [makeQuizAttempt(50)],  // failed
        q3: [makeQuizAttempt(90)],  // passed
      },
      exerciseCompletions: {
        e1: makeExerciseCompletion(true),  // passed
        e2: makeExerciseCompletion(false), // failed
        // e3 not attempted
      },
      examAttempts: {
        midterm: [makeExamAttempt(75)], // passed
        // final not attempted
      },
      projectSubmissions: {
        proj1: [makeProjectSubmission(80)], // passed
      },
    });

    // 9 total items: q1(p), q2(f), q3(p), e1(p), e2(f), e3(na), midterm(p), final(na), proj1(p)
    // Passed: q1, q3, e1, midterm, proj1 = 5
    // 5/9 = 55.56% rounds to 56%
    expect(calculateSubjectCompletion(subject, progress)).toBe(56);
  });
});

describe('prerequisite chain validation', () => {
  it('handles deep prerequisite chains', () => {
    const subjectA = subjectTemplate({ id: 'a', prerequisites: [] });
    const subjectB = subjectTemplate({ id: 'b', prerequisites: ['a'] });
    const subjectC = subjectTemplate({ id: 'c', prerequisites: ['b'] });
    const subjectD = subjectTemplate({ id: 'd', prerequisites: ['c'] });

    const progress = makeUserProgress({
      a: makeProgress({ status: 'completed' }),
      b: makeProgress({ status: 'completed' }),
      c: makeProgress({ status: 'in_progress' }),
    });

    // D requires C, but C is not completed
    expect(arePrerequisitesMet(subjectD, progress)).toBe(false);
    expect(canStartSubject(subjectD, progress)).toBe(false);
  });

  it('handles multiple prerequisites all needing completion', () => {
    const subjectA = subjectTemplate({ id: 'a', prerequisites: [] });
    const subjectB = subjectTemplate({ id: 'b', prerequisites: [] });
    const subjectC = subjectTemplate({ id: 'c', prerequisites: ['a', 'b'] });

    const progressPartial = makeUserProgress({
      a: makeProgress({ status: 'completed' }),
      b: makeProgress({ status: 'in_progress' }),
    });

    expect(arePrerequisitesMet(subjectC, progressPartial)).toBe(false);

    const progressComplete = makeUserProgress({
      a: makeProgress({ status: 'completed' }),
      b: makeProgress({ status: 'completed' }),
    });

    expect(arePrerequisitesMet(subjectC, progressComplete)).toBe(true);
  });

  it('handles subject with no prerequisites', () => {
    const subject = subjectTemplate({ id: 'a', prerequisites: [] });
    const progress = makeUserProgress({});

    expect(arePrerequisitesMet(subject, progress)).toBe(true);
    expect(canStartSubject(subject, progress)).toBe(true);
  });
});

describe('QUIZ_PASSING_SCORE threshold consistency', () => {
  // These tests verify that the passing score threshold (70%) is consistently
  // applied across all completion checks, using the shared QUIZ_PASSING_SCORE constant

  it('uses 70% as the passing threshold for quizzes', () => {
    const progress69 = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(69)] },
    });
    const progress70 = makeProgress({
      quizAttempts: { q1: [makeQuizAttempt(70)] },
    });

    expect(isQuizCompleted('q1', progress69)).toBe(false);
    expect(isQuizCompleted('q1', progress70)).toBe(true);
  });

  it('uses 70% as the passing threshold for exams in subject completion', () => {
    const subject = subjectTemplate({
      topics: [],
      projectIds: [],
      examIds: ['exam1'],
    });

    const progress69 = makeProgress({
      status: 'in_progress',
      examAttempts: { exam1: [makeExamAttempt(69)] },
    });
    const progress70 = makeProgress({
      status: 'in_progress',
      examAttempts: { exam1: [makeExamAttempt(70)] },
    });

    expect(calculateSubjectCompletion(subject, progress69)).toBe(0);
    expect(calculateSubjectCompletion(subject, progress70)).toBe(100);
  });

  it('uses 70% as the passing threshold for projects with AI evaluation', () => {
    const subject = subjectTemplate({
      topics: [],
      examIds: [],
      projectIds: ['proj1'],
    });

    const progress69 = makeProgress({
      status: 'in_progress',
      projectSubmissions: { proj1: [makeProjectSubmission(69)] },
    });
    const progress70 = makeProgress({
      status: 'in_progress',
      projectSubmissions: { proj1: [makeProjectSubmission(70)] },
    });

    expect(calculateSubjectCompletion(subject, progress69)).toBe(0);
    expect(calculateSubjectCompletion(subject, progress70)).toBe(100);
  });

  it('considers best score across multiple attempts for quizzes', () => {
    const subject = subjectTemplate({
      topics: [{
        id: 't1',
        title: 'Topic 1',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
      examIds: [],
      projectIds: [],
    });

    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: {
        q1: [makeQuizAttempt(50), makeQuizAttempt(65), makeQuizAttempt(75), makeQuizAttempt(60)],
      },
    });

    // Best score is 75, which passes
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    expect(isQuizCompleted('q1', progress)).toBe(true);
    expect(getQuizBestScore('q1', progress)).toBe(75);
  });

  it('considers best score across multiple attempts for exams', () => {
    const subject = subjectTemplate({
      topics: [],
      projectIds: [],
      examIds: ['exam1'],
    });

    const progress = makeProgress({
      status: 'in_progress',
      examAttempts: {
        exam1: [makeExamAttempt(55), makeExamAttempt(68), makeExamAttempt(72)],
      },
    });

    // Best score is 72, which passes
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('considers best AI score across multiple project submissions', () => {
    const subject = subjectTemplate({
      topics: [],
      examIds: [],
      projectIds: ['proj1'],
    });

    const progress = makeProgress({
      status: 'in_progress',
      projectSubmissions: {
        proj1: [
          makeProjectSubmission(50),
          makeProjectSubmission(65),
          makeProjectSubmission(80),
          makeProjectSubmission(55),
        ],
      },
    });

    // Best AI score is 80, which passes
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });
});

describe('getNextRecommendedSubject edge cases', () => {
  it('returns null when all subjects are completed', () => {
    const subjectA = subjectTemplate({ id: 'a', year: 1, semester: 1 });
    const subjectB = subjectTemplate({ id: 'b', year: 1, semester: 2, prerequisites: ['a'] });

    const progress = makeUserProgress({
      a: makeProgress({ status: 'completed' }),
      b: makeProgress({ status: 'completed' }),
    });

    expect(getNextRecommendedSubject([subjectA, subjectB], progress)).toBeNull();
  });

  it('returns null when all remaining subjects are blocked by prerequisites', () => {
    const subjectA = subjectTemplate({ id: 'a', year: 1, semester: 1 });
    const subjectB = subjectTemplate({ id: 'b', year: 1, semester: 2, prerequisites: ['a'] });
    const subjectC = subjectTemplate({ id: 'c', year: 2, semester: 1, prerequisites: ['b'] });

    const progress = makeUserProgress({
      a: makeProgress({ status: 'in_progress' }),
      // b and c are blocked because a is not completed
    });

    // Should return the in-progress subject
    expect(getNextRecommendedSubject([subjectA, subjectB, subjectC], progress)).toEqual(subjectA);
  });

  it('returns null when no subjects are provided', () => {
    const progress = makeUserProgress({});
    expect(getNextRecommendedSubject([], progress)).toBeNull();
  });
});

describe('empty and edge case handling', () => {
  it('handles subject with undefined examIds', () => {
    const subject = subjectTemplate({
      examIds: undefined,
      projectIds: [],
    });

    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: { q1: [makeQuizAttempt(80)] },
      exerciseCompletions: { e1: makeExerciseCompletion(true) },
    });

    // Should not crash and should calculate based on quiz and exercise only
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles subject with undefined projectIds', () => {
    const subject = subjectTemplate({
      examIds: [],
      projectIds: undefined,
    });

    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: { q1: [makeQuizAttempt(80)] },
      exerciseCompletions: { e1: makeExerciseCompletion(true) },
    });

    // Should not crash
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles progress with undefined examAttempts', () => {
    const subject = subjectTemplate({
      examIds: ['exam1'],
      projectIds: [],
    });

    const progress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: { q1: [makeQuizAttempt(80)] },
      exerciseCompletions: { e1: makeExerciseCompletion(true) },
      examAttempts: undefined as unknown as Record<string, ExamAttempt[]>,
      projectSubmissions: {},
    };

    // Should not crash, exam should count as not completed
    // 2 items completed (quiz, exercise) out of 3 (quiz, exercise, exam) = 67%
    expect(calculateSubjectCompletion(subject, progress)).toBe(67);
  });
});

describe('completion percentage boundary conditions', () => {
  it('handles exactly 70% quiz score as passing', () => {
    const subject = subjectTemplate({
      topics: [{
        id: 't1',
        title: 'Topic 1',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
      examIds: [],
      projectIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: { q1: [makeQuizAttempt(70)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles 69% quiz score as failing', () => {
    const subject = subjectTemplate({
      topics: [{
        id: 't1',
        title: 'Topic 1',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      }],
      examIds: [],
      projectIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: { q1: [makeQuizAttempt(69)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('handles exactly 70% project AI score as passing', () => {
    const subject = subjectTemplate({
      topics: [],
      examIds: [],
      projectIds: ['proj1'],
    });
    const progress = makeProgress({
      status: 'in_progress',
      projectSubmissions: { proj1: [makeProjectSubmission(70)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles 69% project AI score as failing', () => {
    const subject = subjectTemplate({
      topics: [],
      examIds: [],
      projectIds: ['proj1'],
    });
    const progress = makeProgress({
      status: 'in_progress',
      projectSubmissions: { proj1: [makeProjectSubmission(69)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('handles exactly 70% exam score as passing', () => {
    const subject = subjectTemplate({
      topics: [],
      examIds: ['exam1'],
      projectIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      examAttempts: { exam1: [makeExamAttempt(70)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles 69% exam score as failing', () => {
    const subject = subjectTemplate({
      topics: [],
      examIds: ['exam1'],
      projectIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      examAttempts: { exam1: [makeExamAttempt(69)] },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('handles a combination of passing and failing scores at boundary', () => {
    const subject = subjectTemplate({
      topics: [{
        id: 't1',
        title: 'Topic 1',
        content: '',
        quizIds: ['q1', 'q2'],
        exerciseIds: [],
      }],
      examIds: ['exam1'],
      projectIds: ['proj1'],
    });
    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: {
        q1: [makeQuizAttempt(70)],  // exactly passing
        q2: [makeQuizAttempt(69)],  // exactly failing
      },
      examAttempts: { exam1: [makeExamAttempt(70)] },  // exactly passing
      projectSubmissions: { proj1: [makeProjectSubmission(69)] },  // exactly failing
    });

    // 4 total items: q1(pass), q2(fail), exam1(pass), proj1(fail) = 2/4 = 50%
    expect(calculateSubjectCompletion(subject, progress)).toBe(50);
  });
});

describe('exercise completion edge cases', () => {
  it('handles exercise marked as failed', () => {
    const subject = subjectTemplate({
      topics: [{
        id: 't1',
        title: 'Topic 1',
        content: '',
        quizIds: [],
        exerciseIds: ['e1'],
      }],
      examIds: [],
      projectIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      exerciseCompletions: { e1: makeExerciseCompletion(false) },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    expect(isExerciseCompleted('e1', progress)).toBe(false);
  });

  it('handles exercise marked as passed', () => {
    const subject = subjectTemplate({
      topics: [{
        id: 't1',
        title: 'Topic 1',
        content: '',
        quizIds: [],
        exerciseIds: ['e1'],
      }],
      examIds: [],
      projectIds: [],
    });
    const progress = makeProgress({
      status: 'in_progress',
      exerciseCompletions: { e1: makeExerciseCompletion(true) },
    });

    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    expect(isExerciseCompleted('e1', progress)).toBe(true);
  });

  it('handles missing exercise completion entry', () => {
    const progress = makeProgress({
      exerciseCompletions: {},
    });

    expect(isExerciseCompleted('nonexistent', progress)).toBe(false);
  });
});
