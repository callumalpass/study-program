/**
 * Additional edge case tests for the progress module
 *
 * This file covers edge cases and boundary conditions for progress
 * tracking, calculation, and display functions.
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

const makeQuizAttempt = (score: number, overrides?: Partial<QuizAttempt>): QuizAttempt => ({
  attemptId: `attempt-${score}-${Date.now()}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 42,
  ...overrides,
});

const makeExamAttempt = (score: number, overrides?: Partial<ExamAttempt>): ExamAttempt => ({
  attemptId: `exam-${score}-${Date.now()}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 120,
  ...overrides,
});

const makeExerciseCompletion = (passed: boolean, overrides?: Partial<ExerciseCompletion>): ExerciseCompletion => ({
  completionId: passed ? 'pass' : 'fail',
  timestamp: now,
  code: 'print("hi")',
  passed,
  timeSpentSeconds: 30,
  ...overrides,
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
    { id: 't1', title: 'Topic 1', content: '', quizIds: ['q1'], exerciseIds: ['e1'] },
    { id: 't2', title: 'Topic 2', content: '', quizIds: ['q2'], exerciseIds: ['e2'] },
  ],
  estimatedHours: 10,
  ...overrides,
});

describe('getQuizBestScore edge cases', () => {
  it('returns null for empty quiz attempts array', () => {
    const progress = makeProgress({
      quizAttempts: { 'quiz-1': [] },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBeNull();
  });

  it('returns null when quiz not found in attempts', () => {
    const progress = makeProgress({
      quizAttempts: { 'other-quiz': [makeQuizAttempt(80)] },
    });
    expect(getQuizBestScore('missing-quiz', progress)).toBeNull();
  });

  it('returns highest score from multiple attempts', () => {
    const progress = makeProgress({
      quizAttempts: {
        'quiz-1': [
          makeQuizAttempt(60),
          makeQuizAttempt(90),
          makeQuizAttempt(75),
        ],
      },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBe(90);
  });

  it('handles single attempt correctly', () => {
    const progress = makeProgress({
      quizAttempts: {
        'quiz-1': [makeQuizAttempt(85)],
      },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBe(85);
  });

  it('handles score of 0 correctly', () => {
    const progress = makeProgress({
      quizAttempts: {
        'quiz-1': [makeQuizAttempt(0)],
      },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBe(0);
  });

  it('handles perfect score of 100', () => {
    const progress = makeProgress({
      quizAttempts: {
        'quiz-1': [makeQuizAttempt(100)],
      },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBe(100);
  });

  it('returns null for undefined progress', () => {
    expect(getQuizBestScore('quiz-1', undefined)).toBeNull();
  });
});

describe('isQuizCompleted edge cases', () => {
  it('returns false for exactly 69 (below 70 threshold)', () => {
    const progress = makeProgress({
      quizAttempts: {
        'quiz-1': [makeQuizAttempt(69)],
      },
    });
    expect(isQuizCompleted('quiz-1', progress)).toBe(false);
  });

  it('returns true for exactly 70 (at threshold)', () => {
    const progress = makeProgress({
      quizAttempts: {
        'quiz-1': [makeQuizAttempt(70)],
      },
    });
    expect(isQuizCompleted('quiz-1', progress)).toBe(true);
  });

  it('returns true if any attempt meets threshold', () => {
    const progress = makeProgress({
      quizAttempts: {
        'quiz-1': [
          makeQuizAttempt(50),
          makeQuizAttempt(65),
          makeQuizAttempt(71),
        ],
      },
    });
    expect(isQuizCompleted('quiz-1', progress)).toBe(true);
  });

  it('returns false for undefined progress', () => {
    expect(isQuizCompleted('quiz-1', undefined)).toBe(false);
  });
});

describe('isExerciseCompleted edge cases', () => {
  it('returns false when exercise completion does not exist', () => {
    const progress = makeProgress({
      exerciseCompletions: {},
    });
    expect(isExerciseCompleted('ex-1', progress)).toBe(false);
  });

  it('returns false when exercise is marked as not passed', () => {
    const progress = makeProgress({
      exerciseCompletions: {
        'ex-1': makeExerciseCompletion(false),
      },
    });
    expect(isExerciseCompleted('ex-1', progress)).toBe(false);
  });

  it('returns true when exercise is marked as passed', () => {
    const progress = makeProgress({
      exerciseCompletions: {
        'ex-1': makeExerciseCompletion(true),
      },
    });
    expect(isExerciseCompleted('ex-1', progress)).toBe(true);
  });

  it('returns false for undefined progress', () => {
    expect(isExerciseCompleted('ex-1', undefined)).toBe(false);
  });
});

describe('calculateSubjectCompletion boundary cases', () => {
  it('returns 0 for subject with no topics, quizzes, exercises, or exams', () => {
    const subject = subjectTemplate({
      id: 'empty',
      topics: [],
      examIds: [],
      projectIds: [],
    });
    const progress = makeProgress({ status: 'in_progress' });
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('handles subject with only exams', () => {
    const subject = subjectTemplate({
      id: 'exam-only',
      topics: [],
      examIds: ['midterm', 'final'],
    });
    const progress = makeProgress({
      status: 'in_progress',
      examAttempts: {
        'midterm': [makeExamAttempt(75)],
        // final not attempted
      },
    });
    // 1 out of 2 exams passed = 50%
    expect(calculateSubjectCompletion(subject, progress)).toBe(50);
  });

  it('handles subject with only quizzes', () => {
    const subject = subjectTemplate({
      id: 'quiz-only',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1', 'q2'], exerciseIds: [] },
      ],
    });
    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: {
        'q1': [makeQuizAttempt(85)],
        'q2': [makeQuizAttempt(90)],
      },
    });
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('handles subject with only exercises', () => {
    const subject = subjectTemplate({
      id: 'exercise-only',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: ['e1', 'e2'] },
      ],
    });
    const progress = makeProgress({
      status: 'in_progress',
      exerciseCompletions: {
        'e1': makeExerciseCompletion(true),
        // e2 not completed
      },
    });
    expect(calculateSubjectCompletion(subject, progress)).toBe(50);
  });

  it('handles mixed completion states correctly', () => {
    const subject = subjectTemplate({
      id: 'mixed',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: ['e1'] },
      ],
      examIds: ['midterm'],
    });
    const progress = makeProgress({
      status: 'in_progress',
      quizAttempts: {
        'q1': [makeQuizAttempt(85)], // passed
      },
      exerciseCompletions: {
        'e1': makeExerciseCompletion(false), // not passed
      },
      examAttempts: {
        'midterm': [makeExamAttempt(80)], // passed
      },
    });
    // 2 out of 3 items passed = 66.67% -> 67% rounded
    expect(calculateSubjectCompletion(subject, progress)).toBe(67);
  });

  it('returns 0 for undefined progress', () => {
    const subject = subjectTemplate({ id: 'test' });
    expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
  });

  it('returns 0 for not_started status', () => {
    const subject = subjectTemplate({ id: 'test' });
    const progress = makeProgress({ status: 'not_started' });
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('returns 100 for completed status', () => {
    const subject = subjectTemplate({ id: 'test' });
    const progress = makeProgress({ status: 'completed' });
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });
});

describe('arePrerequisitesMet edge cases', () => {
  it('returns true when subject has no prerequisites', () => {
    const subject = subjectTemplate({ id: 'cs101', prerequisites: [] });
    const userProgress = makeUserProgress({});
    expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
  });

  it('returns false when prerequisite is not started', () => {
    const subject = subjectTemplate({ id: 'cs102', prerequisites: ['cs101'] });
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'not_started' }),
    });
    expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
  });

  it('returns false when prerequisite is in progress', () => {
    const subject = subjectTemplate({ id: 'cs102', prerequisites: ['cs101'] });
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'in_progress' }),
    });
    expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
  });

  it('returns true when all prerequisites are completed', () => {
    const subject = subjectTemplate({ id: 'cs201', prerequisites: ['cs101', 'math101'] });
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
      math101: makeProgress({ status: 'completed' }),
    });
    expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
  });

  it('returns false when only some prerequisites are completed', () => {
    const subject = subjectTemplate({ id: 'cs201', prerequisites: ['cs101', 'math101'] });
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
      math101: makeProgress({ status: 'in_progress' }),
    });
    expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
  });

  it('returns false for missing prerequisite in progress', () => {
    const subject = subjectTemplate({ id: 'cs102', prerequisites: ['missing-subject'] });
    const userProgress = makeUserProgress({});
    expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
  });
});

describe('canStartSubject edge cases', () => {
  it('returns true for subject without prerequisites', () => {
    const subject = subjectTemplate({ id: 'cs101', prerequisites: [] });
    const userProgress = makeUserProgress({});
    expect(canStartSubject(subject, userProgress)).toBe(true);
  });

  it('returns false for subject that is already completed', () => {
    const subject = subjectTemplate({ id: 'cs101', prerequisites: [] });
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
    });
    expect(canStartSubject(subject, userProgress)).toBe(false);
  });

  it('returns true for subject that is already in progress', () => {
    const subject = subjectTemplate({ id: 'cs101', prerequisites: [] });
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'in_progress' }),
    });
    expect(canStartSubject(subject, userProgress)).toBe(true);
  });
});

describe('getDependentSubjects edge cases', () => {
  it('returns empty array when no subjects depend on the given subject', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', prerequisites: [] }),
      subjectTemplate({ id: 'cs102', prerequisites: [] }),
    ];
    expect(getDependentSubjects('cs101', subjects)).toEqual([]);
  });

  it('returns multiple dependents when subject is a common prerequisite', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', prerequisites: [] }),
      subjectTemplate({ id: 'cs201', prerequisites: ['cs101'] }),
      subjectTemplate({ id: 'cs202', prerequisites: ['cs101'] }),
      subjectTemplate({ id: 'cs203', prerequisites: ['cs101'] }),
    ];
    const dependents = getDependentSubjects('cs101', subjects);
    expect(dependents).toHaveLength(3);
    expect(dependents.map(s => s.id).sort()).toEqual(['cs201', 'cs202', 'cs203']);
  });

  it('includes subjects with partial dependency', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', prerequisites: [] }),
      subjectTemplate({ id: 'math101', prerequisites: [] }),
      subjectTemplate({ id: 'cs201', prerequisites: ['cs101', 'math101'] }),
    ];
    // cs201 depends on cs101, so it should be in the list
    const dependents = getDependentSubjects('cs101', subjects);
    expect(dependents.map(s => s.id)).toContain('cs201');
  });
});

describe('getPrerequisiteSubjects edge cases', () => {
  it('returns empty array for subject with no prerequisites', () => {
    const subject = subjectTemplate({ id: 'cs101', prerequisites: [] });
    const subjects = [subject];
    expect(getPrerequisiteSubjects(subject, subjects)).toEqual([]);
  });

  it('returns all prerequisite subjects', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', prerequisites: [] }),
      subjectTemplate({ id: 'math101', prerequisites: [] }),
      subjectTemplate({ id: 'cs201', prerequisites: ['cs101', 'math101'] }),
    ];
    const prereqs = getPrerequisiteSubjects(subjects[2], subjects);
    expect(prereqs).toHaveLength(2);
    expect(prereqs.map(s => s.id).sort()).toEqual(['cs101', 'math101']);
  });

  it('handles missing prerequisite ID gracefully', () => {
    const subject = subjectTemplate({ id: 'cs201', prerequisites: ['missing-subject'] });
    const subjects = [subject];
    const prereqs = getPrerequisiteSubjects(subject, subjects);
    expect(prereqs).toEqual([]);
  });
});

describe('getSubjectsByYearAndSemester edge cases', () => {
  it('returns empty map for no subjects', () => {
    const result = getSubjectsByYearAndSemester([]);
    expect(result.size).toBe(0);
  });

  it('groups subjects correctly by year and semester', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', year: 1, semester: 1 }),
      subjectTemplate({ id: 'math101', year: 1, semester: 1 }),
      subjectTemplate({ id: 'cs102', year: 1, semester: 2 }),
    ];
    const result = getSubjectsByYearAndSemester(subjects);
    expect(result.size).toBe(1); // 1 year
    expect(result.get(1)?.size).toBe(2); // 2 semesters
    expect(result.get(1)?.get(1)?.length).toBe(2); // 2 subjects in year 1 sem 1
    expect(result.get(1)?.get(2)?.length).toBe(1); // 1 subject in year 1 sem 2
  });
});

describe('getCompletedSubjects edge cases', () => {
  it('returns empty array when no subjects are completed', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101' }),
      subjectTemplate({ id: 'cs102' }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'in_progress' }),
    });
    expect(getCompletedSubjects(subjects, userProgress)).toEqual([]);
  });

  it('returns only completed subjects', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101' }),
      subjectTemplate({ id: 'cs102' }),
      subjectTemplate({ id: 'cs103' }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
      cs102: makeProgress({ status: 'in_progress' }),
      cs103: makeProgress({ status: 'completed' }),
    });
    const completed = getCompletedSubjects(subjects, userProgress);
    expect(completed).toHaveLength(2);
    expect(completed.map(s => s.id).sort()).toEqual(['cs101', 'cs103']);
  });
});

describe('getInProgressSubjects edge cases', () => {
  it('returns empty array when no subjects are in progress', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101' }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
    });
    expect(getInProgressSubjects(subjects, userProgress)).toEqual([]);
  });

  it('returns only in-progress subjects', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101' }),
      subjectTemplate({ id: 'cs102' }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'in_progress' }),
      cs102: makeProgress({ status: 'completed' }),
    });
    const inProgress = getInProgressSubjects(subjects, userProgress);
    expect(inProgress).toHaveLength(1);
    expect(inProgress[0].id).toBe('cs101');
  });
});

describe('getAvailableSubjects edge cases', () => {
  it('returns subjects with no prerequisites when no progress exists', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', prerequisites: [] }),
      subjectTemplate({ id: 'cs201', prerequisites: ['cs101'] }),
    ];
    const userProgress = makeUserProgress({});
    const available = getAvailableSubjects(subjects, userProgress);
    expect(available).toHaveLength(1);
    expect(available[0].id).toBe('cs101');
  });

  it('includes subjects whose prerequisites are complete', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', prerequisites: [] }),
      subjectTemplate({ id: 'cs201', prerequisites: ['cs101'] }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
    });
    const available = getAvailableSubjects(subjects, userProgress);
    expect(available.map(s => s.id)).toContain('cs201');
  });

  it('includes completed subjects in available list', () => {
    // Note: getAvailableSubjects returns subjects where prerequisites are met
    // It does NOT exclude completed subjects
    const subjects = [
      subjectTemplate({ id: 'cs101', prerequisites: [] }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
    });
    const available = getAvailableSubjects(subjects, userProgress);
    expect(available).toHaveLength(1);
  });
});

describe('getNextRecommendedSubject edge cases', () => {
  it('returns null when all subjects are completed', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', prerequisites: [] }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
    });
    expect(getNextRecommendedSubject(subjects, userProgress)).toBeNull();
  });

  it('returns in-progress subject first if one exists', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', prerequisites: [] }),
      subjectTemplate({ id: 'cs102', prerequisites: [] }),
    ];
    const userProgress = makeUserProgress({
      cs102: makeProgress({ status: 'in_progress' }),
    });
    const recommended = getNextRecommendedSubject(subjects, userProgress);
    expect(recommended?.id).toBe('cs102');
  });

  it('returns earliest available subject when nothing is in progress', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101', year: 1, semester: 1, prerequisites: [] }),
      subjectTemplate({ id: 'cs102', year: 1, semester: 2, prerequisites: [] }),
    ];
    const userProgress = makeUserProgress({});
    const recommended = getNextRecommendedSubject(subjects, userProgress);
    expect(recommended?.id).toBe('cs101');
  });
});

describe('calculateOverallProgress edge cases', () => {
  it('returns object with 0 percentage when no subjects have progress', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101' }),
      subjectTemplate({ id: 'cs102' }),
    ];
    const userProgress = makeUserProgress({});
    const result = calculateOverallProgress(subjects, userProgress);
    expect(result.percentageComplete).toBe(0);
    expect(result.totalSubjects).toBe(2);
  });

  it('returns 100% when all subjects are completed', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101' }),
      subjectTemplate({ id: 'cs102' }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
      cs102: makeProgress({ status: 'completed' }),
    });
    const result = calculateOverallProgress(subjects, userProgress);
    expect(result.percentageComplete).toBe(100);
    expect(result.completedSubjects).toBe(2);
  });

  it('calculates partial progress correctly', () => {
    const subjects = [
      subjectTemplate({ id: 'cs101' }),
      subjectTemplate({ id: 'cs102' }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
      cs102: makeProgress({ status: 'not_started' }),
    });
    const result = calculateOverallProgress(subjects, userProgress);
    expect(result.percentageComplete).toBe(50);
    expect(result.completedSubjects).toBe(1);
  });

  it('handles empty subjects array', () => {
    const userProgress = makeUserProgress({});
    const result = calculateOverallProgress([], userProgress);
    expect(result.percentageComplete).toBe(0);
    expect(result.totalSubjects).toBe(0);
  });
});
