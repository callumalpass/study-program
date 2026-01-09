/**
 * Timeline Schedule - Comprehensive Edge Case Tests
 *
 * Additional edge case tests for the calculateSchedule function and related
 * timeline utilities, covering scenarios not addressed in timeline-utils.test.ts.
 */

import { describe, it, expect } from 'vitest';
import type {
  Subject,
  SubjectProgress,
  UserProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  SubjectScheduleOverride,
  ProjectSubmission,
} from '../src/core/types';
import {
  topologicalSort,
  calculateSchedule,
  getTimelineBounds,
  daysBetween,
  type ScheduledSubject,
} from '../src/components/timeline/timeline-utils';

const now = new Date('2024-01-01T00:00:00.000Z').toISOString();

// Helper to create a subject with minimal required fields
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
  topics: [
    { id: 't1', title: 'Topic 1', content: '', quizIds: ['q1'], exerciseIds: ['e1'] },
    { id: 't2', title: 'Topic 2', content: '', quizIds: ['q2'], exerciseIds: ['e2'] },
  ],
  estimatedHours: 10,
  ...overrides,
});

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

// ============================================================================
// topologicalSort additional edge cases
// ============================================================================
describe('topologicalSort - additional edge cases', () => {
  it('handles self-referencing prerequisites gracefully', () => {
    // Subject that lists itself as a prerequisite (corrupted data)
    const subjects = [
      makeSubject({ id: 'self-ref', prerequisites: ['self-ref'] }),
    ];

    // Should not throw or hang
    const sorted = topologicalSort(subjects);
    expect(sorted).toHaveLength(1);
    expect(sorted[0].id).toBe('self-ref');
  });

  it('handles empty prerequisites array correctly', () => {
    const subjects = [
      makeSubject({ id: 'a', prerequisites: [], year: 2 }),
      makeSubject({ id: 'b', prerequisites: [], year: 1 }),
    ];

    const sorted = topologicalSort(subjects);
    // Both at level 0, should be sorted by year
    expect(sorted.map(s => s.id)).toEqual(['b', 'a']);
  });

  it('handles diamond dependency pattern', () => {
    // Diamond: a -> b, a -> c, b -> d, c -> d
    const subjects = [
      makeSubject({ id: 'd', prerequisites: ['b', 'c'], year: 1, semester: 1 }),
      makeSubject({ id: 'c', prerequisites: ['a'], year: 1, semester: 1 }),
      makeSubject({ id: 'b', prerequisites: ['a'], year: 1, semester: 1 }),
      makeSubject({ id: 'a', prerequisites: [], year: 1, semester: 1 }),
    ];

    const sorted = topologicalSort(subjects);
    const order = sorted.map(s => s.id);

    // a must come before b and c, b and c must come before d
    expect(order.indexOf('a')).toBeLessThan(order.indexOf('b'));
    expect(order.indexOf('a')).toBeLessThan(order.indexOf('c'));
    expect(order.indexOf('b')).toBeLessThan(order.indexOf('d'));
    expect(order.indexOf('c')).toBeLessThan(order.indexOf('d'));
  });

  it('handles three-way circular dependency', () => {
    const subjects = [
      makeSubject({ id: 'a', prerequisites: ['c'] }),
      makeSubject({ id: 'b', prerequisites: ['a'] }),
      makeSubject({ id: 'c', prerequisites: ['b'] }),
    ];

    // Should not throw or hang
    const sorted = topologicalSort(subjects);
    expect(sorted).toHaveLength(3);
  });

  it('sorts by semester within same year at same level', () => {
    const subjects = [
      makeSubject({ id: 'c', prerequisites: [], year: 1, semester: 2 }),
      makeSubject({ id: 'a', prerequisites: [], year: 1, semester: 1 }),
      makeSubject({ id: 'b', prerequisites: [], year: 1, semester: 1 }),
    ];

    const sorted = topologicalSort(subjects);
    const order = sorted.map(s => s.id);

    // a and b (semester 1) should come before c (semester 2)
    expect(order.indexOf('c')).toBe(2);
  });
});

// ============================================================================
// calculateSchedule additional edge cases
// ============================================================================
describe('calculateSchedule - additional edge cases', () => {
  const startDate = new Date('2024-01-01');

  it('handles subject with undefined quizAttempts in progress', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] },
      ],
    })];

    const userProgress = makeUserProgress({
      cs101: {
        status: 'in_progress',
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      } as unknown as SubjectProgress,
    });

    // Should not throw when quizAttempts is undefined
    expect(() => calculateSchedule(subjects, userProgress, startDate, 'standard')).not.toThrow();

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');
    expect(schedule.get('cs101')!.completionPercentage).toBe(0);
  });

  it('handles subject with undefined exerciseCompletions in progress', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: ['e1'] },
      ],
    })];

    const userProgress = makeUserProgress({
      cs101: {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        projectSubmissions: {},
      } as unknown as SubjectProgress,
    });

    expect(() => calculateSchedule(subjects, userProgress, startDate, 'standard')).not.toThrow();

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');
    expect(schedule.get('cs101')!.completionPercentage).toBe(0);
  });

  it('handles status transition from not_started with some progress', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1', 'q2'], exerciseIds: [] },
      ],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'not_started',
        quizAttempts: {
          q1: [makeQuizAttempt(100)], // Has a passing attempt but status is not_started
        },
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // Should return 0% because status is not_started
    expect(schedule.get('cs101')!.completionPercentage).toBe(0);
  });

  it('returns 100% for completed status regardless of actual progress', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1', 'q2', 'q3'], exerciseIds: [] },
      ],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'completed',
        // Only one quiz attempted, but status is completed
        quizAttempts: { q1: [makeQuizAttempt(80)] },
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.get('cs101')!.completionPercentage).toBe(100);
  });

  it('handles multiple quiz attempts selecting best score', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] },
      ],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'in_progress',
        quizAttempts: {
          q1: [
            makeQuizAttempt(50),
            makeQuizAttempt(65),
            makeQuizAttempt(75), // Best attempt - passing
            makeQuizAttempt(60),
          ],
        },
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // Should count as complete since best attempt (75) >= 70
    expect(schedule.get('cs101')!.completionPercentage).toBe(100);
  });

  it('handles exercise completion with passed=false', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: ['e1'] },
      ],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'in_progress',
        exerciseCompletions: {
          e1: makeExerciseCompletion(false), // Attempted but not passed
        },
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.get('cs101')!.completionPercentage).toBe(0);
  });

  it('handles complex completion with mixed items', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: ['e1'] },
        { id: 't2', title: 'T2', content: '', quizIds: ['q2'], exerciseIds: ['e2'] },
      ],
      examIds: ['exam1'],
      projectIds: ['proj1'],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'in_progress',
        quizAttempts: {
          q1: [makeQuizAttempt(80)], // passed
          q2: [makeQuizAttempt(50)], // failed
        },
        exerciseCompletions: {
          e1: makeExerciseCompletion(true), // passed
          // e2 not attempted
        },
        examAttempts: {
          exam1: [makeExamAttempt(70)], // passed
        },
        projectSubmissions: {
          proj1: [makeProjectSubmission(80)], // passed
        },
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // Total items: 2 quizzes + 2 exercises + 1 exam + 1 project = 6
    // Passed: q1, e1, exam1, proj1 = 4
    // Percentage: 4/6 = 67%
    expect(schedule.get('cs101')!.completionPercentage).toBe(67);
  });

  it('handles exam at exactly passing threshold', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [],
      examIds: ['exam1'],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'in_progress',
        examAttempts: {
          exam1: [makeExamAttempt(70)], // Exactly at threshold
        },
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.get('cs101')!.completionPercentage).toBe(100);
  });

  it('handles exam just below passing threshold', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [],
      examIds: ['exam1'],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'in_progress',
        examAttempts: {
          exam1: [makeExamAttempt(69)], // Just below threshold
        },
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.get('cs101')!.completionPercentage).toBe(0);
  });

  it('handles both custom start date and duration override', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [{ id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: [] }],
    })];

    const userProgress = makeUserProgress({});
    const overrides: Record<string, SubjectScheduleOverride> = {
      cs101: {
        customStartDate: '2024-06-01',
        customDurationWeeks: 8,
      },
    };

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard', overrides);
    const scheduled = schedule.get('cs101')!;

    expect(scheduled.hasOverride).toBe(true);
    expect(scheduled.startDate).toEqual(new Date('2024-06-01'));
    // 8 weeks * 7 days = 56 days
    expect(daysBetween(scheduled.startDate, scheduled.endDate)).toBe(56);
  });

  it('handles override start date before earliest valid start', () => {
    const subjects = [
      makeSubject({ id: 'prereq', prerequisites: [] }),
      makeSubject({ id: 'dependent', prerequisites: ['prereq'] }),
    ];

    const userProgress = makeUserProgress({});
    // Set dependent to start before prereq ends (invalid but allowed by override)
    const overrides: Record<string, SubjectScheduleOverride> = {
      dependent: { customStartDate: '2024-01-01' }, // Same as start date
    };

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard', overrides);
    const dependent = schedule.get('dependent')!;

    // Override is applied even if it's before prerequisites end
    expect(dependent.startDate).toEqual(new Date('2024-01-01'));
    expect(dependent.hasOverride).toBe(true);
    // But earliestValidStart should still reflect prerequisite constraint
    expect(dependent.earliestValidStart.getTime())
      .toBeGreaterThanOrEqual(schedule.get('prereq')!.endDate.getTime());
  });

  it('handles subjects with only projectIds (no topics)', () => {
    const subjects = [makeSubject({
      id: 'project-only',
      topics: [],
      examIds: [],
      projectIds: ['proj1', 'proj2'],
    })];

    const userProgress = makeUserProgress({
      'project-only': makeProgress({
        status: 'in_progress',
        projectSubmissions: {
          proj1: [makeProjectSubmission(85)], // passed
        },
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // 2 projects, 1 passed = 50%
    expect(schedule.get('project-only')!.completionPercentage).toBe(50);
  });

  it('handles row assignment with many overlapping subjects', () => {
    // Create 5 subjects with no dependencies - all should overlap
    const subjects = Array.from({ length: 5 }, (_, i) =>
      makeSubject({
        id: `subject-${i}`,
        prerequisites: [],
        year: 1,
        semester: 1,
      })
    );

    const userProgress = makeUserProgress({});
    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // Each subject should have a unique row
    const rows = Array.from(schedule.values()).map(s => s.row);
    const uniqueRows = new Set(rows);
    expect(uniqueRows.size).toBe(5);
  });
});

// ============================================================================
// getTimelineBounds additional edge cases
// ============================================================================
describe('getTimelineBounds - additional edge cases', () => {
  it('handles schedule with single subject', () => {
    const schedule = new Map<string, ScheduledSubject>();
    const start = new Date('2024-03-15');
    const end = new Date('2024-05-15');

    schedule.set('single', {
      subject: makeSubject({ id: 'single' }),
      startDate: start,
      endDate: end,
      status: 'scheduled',
      completionPercentage: 0,
      row: 0,
      hasOverride: false,
      earliestValidStart: start,
    });

    const bounds = getTimelineBounds(schedule);

    expect(bounds.start).toEqual(start);
    expect(bounds.end).toEqual(end);
  });

  it('handles schedule where all subjects are completed', () => {
    const schedule = new Map<string, ScheduledSubject>();

    schedule.set('a', {
      subject: makeSubject({ id: 'a' }),
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-03-01'),
      status: 'completed',
      completionPercentage: 100,
      row: 0,
      hasOverride: false,
      earliestValidStart: new Date('2023-01-01'),
    });

    schedule.set('b', {
      subject: makeSubject({ id: 'b' }),
      startDate: new Date('2023-03-01'),
      endDate: new Date('2023-06-01'),
      status: 'completed',
      completionPercentage: 100,
      row: 0,
      hasOverride: false,
      earliestValidStart: new Date('2023-03-01'),
    });

    const bounds = getTimelineBounds(schedule);

    expect(bounds.start).toEqual(new Date('2023-01-01'));
    expect(bounds.end).toEqual(new Date('2023-06-01'));
  });

  it('handles subjects with same start and end dates', () => {
    const date = new Date('2024-06-01');
    const schedule = new Map<string, ScheduledSubject>();

    schedule.set('zero-duration', {
      subject: makeSubject({ id: 'zero-duration' }),
      startDate: date,
      endDate: date,
      status: 'scheduled',
      completionPercentage: 0,
      row: 0,
      hasOverride: false,
      earliestValidStart: date,
    });

    const bounds = getTimelineBounds(schedule);

    expect(bounds.start).toEqual(date);
    expect(bounds.end).toEqual(date);
  });
});

// ============================================================================
// daysBetween additional edge cases
// ============================================================================
describe('daysBetween - additional edge cases', () => {
  it('handles dates at midnight precisely', () => {
    const start = new Date('2024-01-01T00:00:00.000Z');
    const end = new Date('2024-01-02T00:00:00.000Z');

    expect(daysBetween(start, end)).toBe(1);
  });

  it('handles dates spanning multiple years', () => {
    const start = new Date('2020-01-01');
    const end = new Date('2025-01-01');

    // 5 years with 1 leap year (2020) + normal leap year (2024)
    // 2020: 366 days, 2021-2023: 365*3 = 1095 days, 2024: 366 days = 1827 days
    expect(daysBetween(start, end)).toBe(1827);
  });

  it('handles end of month to start of month', () => {
    const start = new Date('2024-01-31');
    const end = new Date('2024-02-01');

    expect(daysBetween(start, end)).toBe(1);
  });

  it('handles year boundary', () => {
    const start = new Date('2023-12-31');
    const end = new Date('2024-01-01');

    expect(daysBetween(start, end)).toBe(1);
  });

  it('handles negative date range consistently', () => {
    const start = new Date('2024-01-10');
    const end = new Date('2024-01-01');

    expect(daysBetween(start, end)).toBe(-9);
  });
});

// ============================================================================
// Integration tests - complete workflow scenarios
// ============================================================================
describe('integration - complete workflow scenarios', () => {
  it('simulates a student completing subjects over time', () => {
    const subjects = [
      makeSubject({ id: 'cs101', prerequisites: [], year: 1, semester: 1 }),
      makeSubject({ id: 'cs102', prerequisites: ['cs101'], year: 1, semester: 2 }),
      makeSubject({ id: 'cs201', prerequisites: ['cs102'], year: 2, semester: 1 }),
    ];

    // Student has completed cs101, is working on cs102
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
      cs102: makeProgress({
        status: 'in_progress',
        quizAttempts: {
          q1: [makeQuizAttempt(80)],
        },
      }),
    });

    const startDate = new Date('2024-01-01');
    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.get('cs101')!.status).toBe('completed');
    expect(schedule.get('cs102')!.status).toBe('in-progress');
    expect(schedule.get('cs201')!.status).toBe('blocked'); // cs102 not completed yet

    // cs102 completion should be 50% (1 of 2 quizzes, 0 of 2 exercises)
    expect(schedule.get('cs102')!.completionPercentage).toBe(25); // 1/4 items
  });

  it('handles large curriculum with multiple dependency chains', () => {
    // Simulate a realistic curriculum structure
    const subjects = [
      // Year 1
      makeSubject({ id: 'cs101', prerequisites: [], year: 1, semester: 1 }),
      makeSubject({ id: 'math101', prerequisites: [], year: 1, semester: 1 }),
      makeSubject({ id: 'cs102', prerequisites: ['cs101'], year: 1, semester: 2 }),
      makeSubject({ id: 'math102', prerequisites: ['math101'], year: 1, semester: 2 }),
      // Year 2
      makeSubject({ id: 'cs201', prerequisites: ['cs102', 'math102'], year: 2, semester: 1 }),
      makeSubject({ id: 'cs202', prerequisites: ['cs102'], year: 2, semester: 1 }),
    ];

    const userProgress = makeUserProgress({});
    const startDate = new Date('2024-01-01');
    const schedule = calculateSchedule(subjects, userProgress, startDate, 'accelerated');

    // All first semester courses should start at the same time
    expect(schedule.get('cs101')!.startDate).toEqual(startDate);
    expect(schedule.get('math101')!.startDate).toEqual(startDate);

    // cs201 should wait for both cs102 and math102
    const cs201Start = schedule.get('cs201')!.startDate.getTime();
    const cs102End = schedule.get('cs102')!.endDate.getTime();
    const math102End = schedule.get('math102')!.endDate.getTime();

    expect(cs201Start).toBeGreaterThanOrEqual(cs102End);
    expect(cs201Start).toBeGreaterThanOrEqual(math102End);

    // cs202 only waits for cs102
    const cs202Start = schedule.get('cs202')!.startDate.getTime();
    expect(cs202Start).toBeGreaterThanOrEqual(cs102End);
  });
});
