/**
 * Progress Helpers Comprehensive Tests
 *
 * Tests for progress module helper functions including:
 * - Subject completion calculations
 * - Prerequisite checking
 * - Progress details retrieval
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

// Helper to create mock subjects
function createMockSubject(overrides: Partial<Subject> = {}): Subject {
  return {
    id: 'test-subject',
    name: 'Test Subject',
    code: 'TEST101',
    description: 'A test subject',
    year: 1,
    semester: 1,
    credits: 3,
    estimatedHours: 45,
    topics: [],
    prerequisites: [],
    ...overrides,
  };
}

// Helper to create mock progress
function createMockProgress(overrides: Partial<SubjectProgress> = {}): SubjectProgress {
  return {
    status: 'in_progress',
    ...overrides,
  };
}

describe('isQuizCompleted', () => {
  it('returns false for undefined progress', () => {
    expect(isQuizCompleted('quiz-1', undefined)).toBe(false);
  });

  it('returns false for progress without quizAttempts', () => {
    const progress = createMockProgress({});
    expect(isQuizCompleted('quiz-1', progress)).toBe(false);
  });

  it('returns false for quiz with no attempts', () => {
    const progress = createMockProgress({
      quizAttempts: {},
    });
    expect(isQuizCompleted('quiz-1', progress)).toBe(false);
  });

  it('returns false for quiz with empty attempts array', () => {
    const progress = createMockProgress({
      quizAttempts: { 'quiz-1': [] },
    });
    expect(isQuizCompleted('quiz-1', progress)).toBe(false);
  });

  it('returns false for quiz with failing score', () => {
    const progress = createMockProgress({
      quizAttempts: {
        'quiz-1': [{ score: 50, completedAt: '2024-01-01', answers: {} }],
      },
    });
    expect(isQuizCompleted('quiz-1', progress)).toBe(false);
  });

  it('returns true for quiz with passing score (70)', () => {
    const progress = createMockProgress({
      quizAttempts: {
        'quiz-1': [{ score: 70, completedAt: '2024-01-01', answers: {} }],
      },
    });
    expect(isQuizCompleted('quiz-1', progress)).toBe(true);
  });

  it('returns true for quiz with best score passing', () => {
    const progress = createMockProgress({
      quizAttempts: {
        'quiz-1': [
          { score: 50, completedAt: '2024-01-01', answers: {} },
          { score: 75, completedAt: '2024-01-02', answers: {} },
          { score: 60, completedAt: '2024-01-03', answers: {} },
        ],
      },
    });
    expect(isQuizCompleted('quiz-1', progress)).toBe(true);
  });

  it('returns false when all attempts are below passing', () => {
    const progress = createMockProgress({
      quizAttempts: {
        'quiz-1': [
          { score: 50, completedAt: '2024-01-01', answers: {} },
          { score: 65, completedAt: '2024-01-02', answers: {} },
          { score: 69, completedAt: '2024-01-03', answers: {} },
        ],
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
    const progress = createMockProgress({
      quizAttempts: {},
    });
    expect(getQuizBestScore('quiz-1', progress)).toBeNull();
  });

  it('returns null for quiz with empty attempts', () => {
    const progress = createMockProgress({
      quizAttempts: { 'quiz-1': [] },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBeNull();
  });

  it('returns the only score for single attempt', () => {
    const progress = createMockProgress({
      quizAttempts: {
        'quiz-1': [{ score: 85, completedAt: '2024-01-01', answers: {} }],
      },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBe(85);
  });

  it('returns the highest score from multiple attempts', () => {
    const progress = createMockProgress({
      quizAttempts: {
        'quiz-1': [
          { score: 50, completedAt: '2024-01-01', answers: {} },
          { score: 95, completedAt: '2024-01-02', answers: {} },
          { score: 70, completedAt: '2024-01-03', answers: {} },
        ],
      },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBe(95);
  });

  it('handles score of 0', () => {
    const progress = createMockProgress({
      quizAttempts: {
        'quiz-1': [{ score: 0, completedAt: '2024-01-01', answers: {} }],
      },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBe(0);
  });

  it('handles score of 100', () => {
    const progress = createMockProgress({
      quizAttempts: {
        'quiz-1': [{ score: 100, completedAt: '2024-01-01', answers: {} }],
      },
    });
    expect(getQuizBestScore('quiz-1', progress)).toBe(100);
  });
});

describe('isExerciseCompleted', () => {
  it('returns false for undefined progress', () => {
    expect(isExerciseCompleted('ex-1', undefined)).toBe(false);
  });

  it('returns false for progress without exerciseCompletions', () => {
    const progress = createMockProgress({});
    expect(isExerciseCompleted('ex-1', progress)).toBe(false);
  });

  it('returns false for exercise not in completions', () => {
    const progress = createMockProgress({
      exerciseCompletions: {},
    });
    expect(isExerciseCompleted('ex-1', progress)).toBe(false);
  });

  it('returns false for exercise with passed=false', () => {
    const progress = createMockProgress({
      exerciseCompletions: {
        'ex-1': { passed: false, completedAt: '2024-01-01' },
      },
    });
    expect(isExerciseCompleted('ex-1', progress)).toBe(false);
  });

  it('returns true for exercise with passed=true', () => {
    const progress = createMockProgress({
      exerciseCompletions: {
        'ex-1': { passed: true, completedAt: '2024-01-01' },
      },
    });
    expect(isExerciseCompleted('ex-1', progress)).toBe(true);
  });
});

describe('isExamCompleted', () => {
  it('returns false for undefined progress', () => {
    expect(isExamCompleted('exam-1', undefined)).toBe(false);
  });

  it('returns false for progress without examAttempts', () => {
    const progress = createMockProgress({});
    expect(isExamCompleted('exam-1', progress)).toBe(false);
  });

  it('returns false for exam with no attempts', () => {
    const progress = createMockProgress({
      examAttempts: {},
    });
    expect(isExamCompleted('exam-1', progress)).toBe(false);
  });

  it('returns true for exam with passing score', () => {
    const progress = createMockProgress({
      examAttempts: {
        'exam-1': [{ score: 75, completedAt: '2024-01-01', answers: {} }],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(true);
  });

  it('returns true for exam with best score passing', () => {
    const progress = createMockProgress({
      examAttempts: {
        'exam-1': [
          { score: 50, completedAt: '2024-01-01', answers: {} },
          { score: 80, completedAt: '2024-01-02', answers: {} },
        ],
      },
    });
    expect(isExamCompleted('exam-1', progress)).toBe(true);
  });
});

describe('getExamBestScore', () => {
  it('returns null for undefined progress', () => {
    expect(getExamBestScore('exam-1', undefined)).toBeNull();
  });

  it('returns null for exam with no attempts', () => {
    const progress = createMockProgress({
      examAttempts: {},
    });
    expect(getExamBestScore('exam-1', progress)).toBeNull();
  });

  it('returns the highest score', () => {
    const progress = createMockProgress({
      examAttempts: {
        'exam-1': [
          { score: 60, completedAt: '2024-01-01', answers: {} },
          { score: 90, completedAt: '2024-01-02', answers: {} },
        ],
      },
    });
    expect(getExamBestScore('exam-1', progress)).toBe(90);
  });
});

describe('isProjectCompleted', () => {
  it('returns false for undefined progress', () => {
    expect(isProjectCompleted('proj-1', undefined)).toBe(false);
  });

  it('returns false for progress without projectSubmissions', () => {
    const progress = createMockProgress({});
    expect(isProjectCompleted('proj-1', progress)).toBe(false);
  });

  it('returns false for project with no submissions', () => {
    const progress = createMockProgress({
      projectSubmissions: {},
    });
    expect(isProjectCompleted('proj-1', progress)).toBe(false);
  });

  it('returns false for project with empty submissions array', () => {
    const progress = createMockProgress({
      projectSubmissions: { 'proj-1': [] },
    });
    expect(isProjectCompleted('proj-1', progress)).toBe(false);
  });

  it('returns true for project with submission (no AI evaluation)', () => {
    const progress = createMockProgress({
      projectSubmissions: {
        'proj-1': [{ submittedAt: '2024-01-01', content: 'My project' }],
      },
    });
    expect(isProjectCompleted('proj-1', progress)).toBe(true);
  });

  it('returns true for project with passing AI evaluation', () => {
    const progress = createMockProgress({
      projectSubmissions: {
        'proj-1': [{
          submittedAt: '2024-01-01',
          content: 'My project',
          aiEvaluation: { score: 85, feedback: 'Good work' },
        }],
      },
    });
    expect(isProjectCompleted('proj-1', progress)).toBe(true);
  });

  it('returns false for project with failing AI evaluation', () => {
    const progress = createMockProgress({
      projectSubmissions: {
        'proj-1': [{
          submittedAt: '2024-01-01',
          content: 'My project',
          aiEvaluation: { score: 50, feedback: 'Needs improvement' },
        }],
      },
    });
    expect(isProjectCompleted('proj-1', progress)).toBe(false);
  });

  it('returns true when best submission passes', () => {
    const progress = createMockProgress({
      projectSubmissions: {
        'proj-1': [
          {
            submittedAt: '2024-01-01',
            content: 'First attempt',
            aiEvaluation: { score: 50, feedback: 'Needs work' },
          },
          {
            submittedAt: '2024-01-02',
            content: 'Second attempt',
            aiEvaluation: { score: 80, feedback: 'Good!' },
          },
        ],
      },
    });
    expect(isProjectCompleted('proj-1', progress)).toBe(true);
  });
});

describe('getProjectBestSubmission', () => {
  it('returns undefined for undefined progress', () => {
    expect(getProjectBestSubmission('proj-1', undefined)).toBeUndefined();
  });

  it('returns undefined for project with no submissions', () => {
    const progress = createMockProgress({
      projectSubmissions: {},
    });
    expect(getProjectBestSubmission('proj-1', progress)).toBeUndefined();
  });

  it('returns undefined for project with empty submissions', () => {
    const progress = createMockProgress({
      projectSubmissions: { 'proj-1': [] },
    });
    expect(getProjectBestSubmission('proj-1', progress)).toBeUndefined();
  });

  it('returns the only submission when single', () => {
    const submission = { submittedAt: '2024-01-01', content: 'My project' };
    const progress = createMockProgress({
      projectSubmissions: { 'proj-1': [submission] },
    });
    expect(getProjectBestSubmission('proj-1', progress)).toEqual(submission);
  });

  it('returns submission with highest AI score', () => {
    const submissions = [
      {
        submittedAt: '2024-01-01',
        content: 'First',
        aiEvaluation: { score: 60, feedback: 'OK' },
      },
      {
        submittedAt: '2024-01-02',
        content: 'Best',
        aiEvaluation: { score: 90, feedback: 'Great' },
      },
      {
        submittedAt: '2024-01-03',
        content: 'Third',
        aiEvaluation: { score: 70, feedback: 'Good' },
      },
    ];
    const progress = createMockProgress({
      projectSubmissions: { 'proj-1': submissions },
    });
    expect(getProjectBestSubmission('proj-1', progress)).toEqual(submissions[1]);
  });

  it('returns first submission when none have AI evaluation', () => {
    const submissions = [
      { submittedAt: '2024-01-01', content: 'First' },
      { submittedAt: '2024-01-02', content: 'Second' },
    ];
    const progress = createMockProgress({
      projectSubmissions: { 'proj-1': submissions },
    });
    expect(getProjectBestSubmission('proj-1', progress)).toEqual(submissions[0]);
  });
});

describe('getDependentSubjects', () => {
  it('returns empty array when no subjects depend on given subject', () => {
    const subjects = [
      createMockSubject({ id: 'cs101', prerequisites: [] }),
      createMockSubject({ id: 'cs102', prerequisites: [] }),
    ];
    expect(getDependentSubjects('cs101', subjects)).toEqual([]);
  });

  it('returns subjects that have the given subject as prerequisite', () => {
    const subjects = [
      createMockSubject({ id: 'cs101', prerequisites: [] }),
      createMockSubject({ id: 'cs201', prerequisites: ['cs101'] }),
      createMockSubject({ id: 'cs301', prerequisites: ['cs201'] }),
    ];
    const dependents = getDependentSubjects('cs101', subjects);
    expect(dependents).toHaveLength(1);
    expect(dependents[0].id).toBe('cs201');
  });

  it('returns multiple dependents', () => {
    const subjects = [
      createMockSubject({ id: 'cs101', prerequisites: [] }),
      createMockSubject({ id: 'cs201', prerequisites: ['cs101'] }),
      createMockSubject({ id: 'cs202', prerequisites: ['cs101'] }),
      createMockSubject({ id: 'cs301', prerequisites: ['cs201', 'cs202'] }),
    ];
    const dependents = getDependentSubjects('cs101', subjects);
    expect(dependents).toHaveLength(2);
    expect(dependents.map(s => s.id)).toContain('cs201');
    expect(dependents.map(s => s.id)).toContain('cs202');
  });

  it('handles subjects with undefined prerequisites', () => {
    const subjects = [
      createMockSubject({ id: 'cs101' }),
      { ...createMockSubject({ id: 'cs102' }), prerequisites: undefined as unknown as string[] },
    ];
    expect(getDependentSubjects('cs101', subjects)).toEqual([]);
  });
});

describe('getPrerequisiteSubjects', () => {
  it('returns empty array for subject with no prerequisites', () => {
    const subjects = [
      createMockSubject({ id: 'cs101', prerequisites: [] }),
    ];
    expect(getPrerequisiteSubjects(subjects[0], subjects)).toEqual([]);
  });

  it('returns prerequisite subjects', () => {
    const subjects = [
      createMockSubject({ id: 'cs101', prerequisites: [] }),
      createMockSubject({ id: 'cs201', prerequisites: ['cs101'] }),
    ];
    const prereqs = getPrerequisiteSubjects(subjects[1], subjects);
    expect(prereqs).toHaveLength(1);
    expect(prereqs[0].id).toBe('cs101');
  });

  it('returns multiple prerequisites', () => {
    const subjects = [
      createMockSubject({ id: 'cs101', prerequisites: [] }),
      createMockSubject({ id: 'math101', prerequisites: [] }),
      createMockSubject({ id: 'cs201', prerequisites: ['cs101', 'math101'] }),
    ];
    const prereqs = getPrerequisiteSubjects(subjects[2], subjects);
    expect(prereqs).toHaveLength(2);
    expect(prereqs.map(s => s.id)).toContain('cs101');
    expect(prereqs.map(s => s.id)).toContain('math101');
  });

  it('filters out non-existent prerequisites', () => {
    const subjects = [
      createMockSubject({ id: 'cs101', prerequisites: [] }),
      createMockSubject({ id: 'cs201', prerequisites: ['cs101', 'nonexistent'] }),
    ];
    const prereqs = getPrerequisiteSubjects(subjects[1], subjects);
    expect(prereqs).toHaveLength(1);
    expect(prereqs[0].id).toBe('cs101');
  });

  it('handles subject with undefined prerequisites', () => {
    const subject = { ...createMockSubject({ id: 'cs101' }), prerequisites: undefined as unknown as string[] };
    const subjects = [subject];
    expect(getPrerequisiteSubjects(subject, subjects)).toEqual([]);
  });
});

describe('getSubjectsByYearAndSemester', () => {
  it('returns empty map for empty subjects array', () => {
    const result = getSubjectsByYearAndSemester([]);
    expect(result.size).toBe(0);
  });

  it('groups subjects by year and semester', () => {
    const subjects = [
      createMockSubject({ id: 'cs101', year: 1, semester: 1 }),
      createMockSubject({ id: 'cs102', year: 1, semester: 1 }),
      createMockSubject({ id: 'cs103', year: 1, semester: 2 }),
      createMockSubject({ id: 'cs201', year: 2, semester: 1 }),
    ];
    const result = getSubjectsByYearAndSemester(subjects);

    expect(result.size).toBe(2); // 2 years
    expect(result.get(1)?.size).toBe(2); // 2 semesters in year 1
    expect(result.get(2)?.size).toBe(1); // 1 semester in year 2

    expect(result.get(1)?.get(1)).toHaveLength(2); // 2 subjects in year 1, semester 1
    expect(result.get(1)?.get(2)).toHaveLength(1); // 1 subject in year 1, semester 2
    expect(result.get(2)?.get(1)).toHaveLength(1); // 1 subject in year 2, semester 1
  });

  it('handles non-sequential years and semesters', () => {
    const subjects = [
      createMockSubject({ id: 'cs401', year: 4, semester: 2 }),
      createMockSubject({ id: 'cs101', year: 1, semester: 1 }),
    ];
    const result = getSubjectsByYearAndSemester(subjects);

    expect(result.has(1)).toBe(true);
    expect(result.has(4)).toBe(true);
    expect(result.has(2)).toBe(false);
    expect(result.has(3)).toBe(false);
  });
});

describe('calculateSubjectCompletion edge cases', () => {
  it('returns 0 for undefined progress', () => {
    const subject = createMockSubject({
      topics: [{ id: 'topic-1', title: 'Topic 1', quizIds: ['q1'], exerciseIds: [], subtopics: [] }],
    });
    expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
  });

  it('returns 0 for not_started status', () => {
    const subject = createMockSubject({
      topics: [{ id: 'topic-1', title: 'Topic 1', quizIds: ['q1'], exerciseIds: [], subtopics: [] }],
    });
    const progress = createMockProgress({ status: 'not_started' });
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('returns 100 for completed status', () => {
    const subject = createMockSubject({
      topics: [{ id: 'topic-1', title: 'Topic 1', quizIds: ['q1'], exerciseIds: [], subtopics: [] }],
    });
    const progress = createMockProgress({ status: 'completed' });
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);
  });

  it('returns 0 for subject with no items to complete', () => {
    const subject = createMockSubject({
      topics: [{ id: 'topic-1', title: 'Topic 1', quizIds: [], exerciseIds: [], subtopics: [] }],
      examIds: [],
      projectIds: [],
    });
    const progress = createMockProgress({ status: 'in_progress' });
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);
  });

  it('calculates partial completion correctly', () => {
    const subject = createMockSubject({
      topics: [{
        id: 'topic-1',
        title: 'Topic 1',
        quizIds: ['q1', 'q2'],
        exerciseIds: ['ex1', 'ex2'],
        subtopics: [],
      }],
    });
    const progress = createMockProgress({
      status: 'in_progress',
      quizAttempts: {
        'q1': [{ score: 80, completedAt: '2024-01-01', answers: {} }],
      },
      exerciseCompletions: {
        'ex1': { passed: true, completedAt: '2024-01-01' },
      },
    });
    // 2 of 4 items completed = 50%
    expect(calculateSubjectCompletion(subject, progress)).toBe(50);
  });
});
