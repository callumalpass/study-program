import { describe, expect, it } from 'vitest';
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
  xPositionToDate,
  getTimelineBounds,
  formatMonthYear,
  daysBetween,
  getEstimatedCompletionDate,
  PACE_WEEKS_PER_TOPIC,
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
// topologicalSort tests
// ============================================================================
describe('topologicalSort', () => {
  it('returns empty array for empty input', () => {
    expect(topologicalSort([])).toEqual([]);
  });

  it('returns subjects unchanged when there are no prerequisites', () => {
    const subjects = [
      makeSubject({ id: 'a', year: 1, semester: 1 }),
      makeSubject({ id: 'b', year: 1, semester: 2 }),
    ];
    const sorted = topologicalSort(subjects);
    expect(sorted.map(s => s.id)).toEqual(['a', 'b']);
  });

  it('sorts subjects with prerequisites after their dependencies', () => {
    const subjects = [
      makeSubject({ id: 'c', prerequisites: ['b'] }),
      makeSubject({ id: 'a', prerequisites: [] }),
      makeSubject({ id: 'b', prerequisites: ['a'] }),
    ];
    const sorted = topologicalSort(subjects);
    const order = sorted.map(s => s.id);

    // 'a' should come before 'b', 'b' should come before 'c'
    expect(order.indexOf('a')).toBeLessThan(order.indexOf('b'));
    expect(order.indexOf('b')).toBeLessThan(order.indexOf('c'));
  });

  it('handles complex dependency chains', () => {
    // Graph: a -> b -> d
    //        a -> c -> d
    const subjects = [
      makeSubject({ id: 'd', prerequisites: ['b', 'c'] }),
      makeSubject({ id: 'c', prerequisites: ['a'] }),
      makeSubject({ id: 'b', prerequisites: ['a'] }),
      makeSubject({ id: 'a', prerequisites: [] }),
    ];
    const sorted = topologicalSort(subjects);
    const order = sorted.map(s => s.id);

    expect(order.indexOf('a')).toBeLessThan(order.indexOf('b'));
    expect(order.indexOf('a')).toBeLessThan(order.indexOf('c'));
    expect(order.indexOf('b')).toBeLessThan(order.indexOf('d'));
    expect(order.indexOf('c')).toBeLessThan(order.indexOf('d'));
  });

  it('uses year/semester as secondary sort for subjects at same dependency level', () => {
    const subjects = [
      makeSubject({ id: 'b', year: 2, semester: 1, prerequisites: [] }),
      makeSubject({ id: 'c', year: 1, semester: 2, prerequisites: [] }),
      makeSubject({ id: 'a', year: 1, semester: 1, prerequisites: [] }),
    ];
    const sorted = topologicalSort(subjects);
    const order = sorted.map(s => s.id);

    // All at level 0, should be sorted by year then semester
    expect(order).toEqual(['a', 'c', 'b']);
  });

  it('handles prerequisites that reference subjects not in the input list', () => {
    const subjects = [
      makeSubject({ id: 'b', prerequisites: ['missing-subject'] }),
      makeSubject({ id: 'a', prerequisites: [] }),
    ];
    // Should not throw, should handle gracefully
    const sorted = topologicalSort(subjects);
    expect(sorted.map(s => s.id)).toContain('a');
    expect(sorted.map(s => s.id)).toContain('b');
  });

  it('handles subject where all prerequisites are filtered out (not in input)', () => {
    // This tests the fix for Math.max(...[]) returning -Infinity
    const subjects = [
      makeSubject({ id: 'a', prerequisites: [] }),
      makeSubject({ id: 'b', prerequisites: ['missing1', 'missing2', 'missing3'] }),
    ];

    // Should treat 'b' as level 0 (no valid prerequisites)
    const sorted = topologicalSort(subjects);
    expect(sorted.map(s => s.id)).toEqual(['a', 'b']);
  });

  it('handles mixed valid and invalid prerequisites', () => {
    const subjects = [
      makeSubject({ id: 'a', prerequisites: [] }),
      makeSubject({ id: 'b', prerequisites: ['a', 'missing'] }),
    ];

    const sorted = topologicalSort(subjects);
    const order = sorted.map(s => s.id);

    // 'a' should come before 'b' since 'a' is a valid prerequisite
    expect(order.indexOf('a')).toBeLessThan(order.indexOf('b'));
  });

  it('handles circular dependencies gracefully (guard against infinite loop)', () => {
    // This tests the circular dependency guard in the code
    const subjects = [
      makeSubject({ id: 'a', prerequisites: ['b'] }),
      makeSubject({ id: 'b', prerequisites: ['a'] }),
    ];
    // Should not throw or hang
    const sorted = topologicalSort(subjects);
    expect(sorted.length).toBe(2);
  });
});

// ============================================================================
// calculateSchedule tests
// ============================================================================
describe('calculateSchedule', () => {
  const startDate = new Date('2024-01-01');

  it('returns empty map for empty subjects array', () => {
    const userProgress = makeUserProgress({});
    const schedule = calculateSchedule([], userProgress, startDate, 'standard');
    expect(schedule.size).toBe(0);
  });

  it('calculates schedule for a single subject', () => {
    const subjects = [makeSubject({ id: 'cs101', topics: [
      { id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: [] },
      { id: 't2', title: 'T2', content: '', quizIds: [], exerciseIds: [] },
      { id: 't3', title: 'T3', content: '', quizIds: [], exerciseIds: [] },
    ]})];
    const userProgress = makeUserProgress({});

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.size).toBe(1);
    const scheduled = schedule.get('cs101');
    expect(scheduled).toBeDefined();
    expect(scheduled!.startDate).toEqual(startDate);
    // 3 topics * 2 weeks/topic * 7 days = 42 days
    const expectedEnd = new Date(startDate);
    expectedEnd.setDate(expectedEnd.getDate() + 42);
    expect(scheduled!.endDate).toEqual(expectedEnd);
  });

  it('schedules prerequisites before dependent subjects', () => {
    const subjects = [
      makeSubject({ id: 'cs102', prerequisites: ['cs101'] }),
      makeSubject({ id: 'cs101', prerequisites: [] }),
    ];
    const userProgress = makeUserProgress({});

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    const cs101 = schedule.get('cs101')!;
    const cs102 = schedule.get('cs102')!;

    // cs102 should start after cs101 ends
    expect(cs102.startDate.getTime()).toBeGreaterThanOrEqual(cs101.endDate.getTime());
  });

  it('applies different paces correctly', () => {
    const subjects = [makeSubject({ id: 'test', topics: [
      { id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: [] },
    ]})];
    const userProgress = makeUserProgress({});

    const standard = calculateSchedule(subjects, userProgress, startDate, 'standard');
    const accelerated = calculateSchedule(subjects, userProgress, startDate, 'accelerated');
    const intensive = calculateSchedule(subjects, userProgress, startDate, 'intensive');

    // Standard: 1 topic * 2 weeks = 14 days
    // Accelerated: 1 topic * 1 week = 7 days
    // Intensive: 1 topic * 0.5 weeks = 4 days (rounded up)
    expect(daysBetween(standard.get('test')!.startDate, standard.get('test')!.endDate)).toBe(14);
    expect(daysBetween(accelerated.get('test')!.startDate, accelerated.get('test')!.endDate)).toBe(7);
    expect(daysBetween(intensive.get('test')!.startDate, intensive.get('test')!.endDate)).toBe(4);
  });

  it('sets status to completed for completed subjects', () => {
    const subjects = [makeSubject({ id: 'cs101' })];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.get('cs101')!.status).toBe('completed');
  });

  it('sets status to in-progress for in-progress subjects', () => {
    const subjects = [makeSubject({ id: 'cs101' })];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'in_progress' }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.get('cs101')!.status).toBe('in-progress');
  });

  it('sets status to scheduled when prerequisites are met', () => {
    const subjects = [
      makeSubject({ id: 'cs101', prerequisites: [] }),
      makeSubject({ id: 'cs102', prerequisites: ['cs101'] }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'completed' }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.get('cs102')!.status).toBe('scheduled');
  });

  it('sets status to blocked when prerequisites are not met', () => {
    const subjects = [
      makeSubject({ id: 'cs101', prerequisites: [] }),
      makeSubject({ id: 'cs102', prerequisites: ['cs101'] }),
    ];
    const userProgress = makeUserProgress({
      cs101: makeProgress({ status: 'not_started' }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    expect(schedule.get('cs102')!.status).toBe('blocked');
  });

  it('calculates completion percentage based on quizzes and exercises', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: ['e1'] },
        { id: 't2', title: 'T2', content: '', quizIds: ['q2'], exerciseIds: ['e2'] },
      ],
      examIds: [],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'in_progress',
        quizAttempts: { q1: [makeQuizAttempt(80)] }, // passed (>= 70)
        exerciseCompletions: { e1: makeExerciseCompletion(true) }, // passed
        // q2 and e2 not attempted
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // 2 out of 4 items completed = 50%
    expect(schedule.get('cs101')!.completionPercentage).toBe(50);
  });

  it('includes exams in completion percentage calculation', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: [] },
      ],
      examIds: ['exam1', 'exam2'],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'in_progress',
        examAttempts: { exam1: [makeExamAttempt(75)] }, // passed
        // exam2 not attempted
      }),
    });

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // 1 out of 2 exams passed = 50%
    expect(schedule.get('cs101')!.completionPercentage).toBe(50);
  });

  it('applies custom start date override', () => {
    const subjects = [makeSubject({ id: 'cs101' })];
    const userProgress = makeUserProgress({});
    const customDate = '2024-03-15';
    const overrides: Record<string, SubjectScheduleOverride> = {
      cs101: { customStartDate: customDate },
    };

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard', overrides);
    const scheduled = schedule.get('cs101')!;

    expect(scheduled.startDate).toEqual(new Date(customDate));
    expect(scheduled.hasOverride).toBe(true);
  });

  it('applies custom duration override', () => {
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [{ id: 't1', title: 'T1', content: '', quizIds: [], exerciseIds: [] }],
    })];
    const userProgress = makeUserProgress({});
    const overrides: Record<string, SubjectScheduleOverride> = {
      cs101: { customDurationWeeks: 4 },
    };

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard', overrides);
    const scheduled = schedule.get('cs101')!;

    // 4 weeks * 7 days = 28 days
    expect(daysBetween(scheduled.startDate, scheduled.endDate)).toBe(28);
    expect(scheduled.hasOverride).toBe(true);
  });

  it('tracks earliestValidStart based on prerequisite completion', () => {
    const subjects = [
      makeSubject({ id: 'cs101', prerequisites: [] }),
      makeSubject({ id: 'cs102', prerequisites: ['cs101'] }),
    ];
    const userProgress = makeUserProgress({});

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');
    const cs101 = schedule.get('cs101')!;
    const cs102 = schedule.get('cs102')!;

    // earliestValidStart for cs102 should be after cs101 ends
    expect(cs102.earliestValidStart.getTime()).toBeGreaterThanOrEqual(cs101.endDate.getTime());
  });

  it('assigns row numbers for overlapping subjects', () => {
    // Two subjects with no dependencies should overlap and get different rows
    const subjects = [
      makeSubject({ id: 'a', prerequisites: [], year: 1, semester: 1 }),
      makeSubject({ id: 'b', prerequisites: [], year: 1, semester: 1 }),
    ];
    const userProgress = makeUserProgress({});

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    const rowA = schedule.get('a')!.row;
    const rowB = schedule.get('b')!.row;

    // They should get different row assignments since they overlap
    expect(rowA).not.toBe(rowB);
  });

  it('uses default topic count of 7 when subject has no topics', () => {
    const subjects = [makeSubject({ id: 'cs101', topics: [] })];
    const userProgress = makeUserProgress({});

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');
    const scheduled = schedule.get('cs101')!;

    // 7 topics * 2 weeks * 7 days = 98 days
    expect(daysBetween(scheduled.startDate, scheduled.endDate)).toBe(98);
  });
});

// ============================================================================
// xPositionToDate tests
// ============================================================================
describe('xPositionToDate', () => {
  it('converts x position to corresponding date', () => {
    const bounds = {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31'),
    };
    const labelWidth = 100;
    const dayWidth = 10;

    // x = 100 (labelWidth) should be day 0 (start date)
    const date0 = xPositionToDate(100, bounds, labelWidth, dayWidth);
    expect(date0).toEqual(new Date('2024-01-01'));

    // x = 110 should be day 1
    const date1 = xPositionToDate(110, bounds, labelWidth, dayWidth);
    expect(date1).toEqual(new Date('2024-01-02'));

    // x = 200 should be day 10
    const date10 = xPositionToDate(200, bounds, labelWidth, dayWidth);
    expect(date10).toEqual(new Date('2024-01-11'));
  });

  it('rounds to nearest day', () => {
    const bounds = {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31'),
    };
    const labelWidth = 0;
    const dayWidth = 10;

    // x = 5 should round to day 1
    const date = xPositionToDate(5, bounds, labelWidth, dayWidth);
    expect(date).toEqual(new Date('2024-01-02'));
  });

  it('handles positions before label width', () => {
    const bounds = {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31'),
    };
    const labelWidth = 100;
    const dayWidth = 10;

    // x = 50 is before labelWidth, should give negative days from start
    const date = xPositionToDate(50, bounds, labelWidth, dayWidth);
    expect(date).toEqual(new Date('2023-12-27')); // 5 days before Jan 1
  });
});

// ============================================================================
// getTimelineBounds tests
// ============================================================================
describe('getTimelineBounds', () => {
  it('returns current date for empty schedule', () => {
    const schedule = new Map<string, ScheduledSubject>();
    const bounds = getTimelineBounds(schedule);

    // Should return current date for both start and end
    expect(bounds.start).toEqual(bounds.end);
  });

  it('returns correct bounds for single subject', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-02-01');

    const schedule = new Map<string, ScheduledSubject>();
    schedule.set('test', {
      subject: makeSubject({ id: 'test' }),
      startDate,
      endDate,
      status: 'scheduled',
      completionPercentage: 0,
      row: 0,
      hasOverride: false,
      earliestValidStart: startDate,
    });

    const bounds = getTimelineBounds(schedule);

    expect(bounds.start).toEqual(startDate);
    expect(bounds.end).toEqual(endDate);
  });

  it('returns min start and max end for multiple subjects', () => {
    const schedule = new Map<string, ScheduledSubject>();

    schedule.set('early', {
      subject: makeSubject({ id: 'early' }),
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      status: 'scheduled',
      completionPercentage: 0,
      row: 0,
      hasOverride: false,
      earliestValidStart: new Date('2024-01-01'),
    });

    schedule.set('late', {
      subject: makeSubject({ id: 'late' }),
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-06-01'),
      status: 'scheduled',
      completionPercentage: 0,
      row: 1,
      hasOverride: false,
      earliestValidStart: new Date('2024-03-01'),
    });

    const bounds = getTimelineBounds(schedule);

    expect(bounds.start).toEqual(new Date('2024-01-01'));
    expect(bounds.end).toEqual(new Date('2024-06-01'));
  });
});

// ============================================================================
// formatMonthYear tests
// ============================================================================
describe('formatMonthYear', () => {
  it('formats date as short month and year', () => {
    expect(formatMonthYear(new Date('2024-01-15'))).toBe('Jan 2024');
    expect(formatMonthYear(new Date('2024-06-01'))).toBe('Jun 2024');
    expect(formatMonthYear(new Date('2024-12-31'))).toBe('Dec 2024');
  });

  it('handles different years', () => {
    expect(formatMonthYear(new Date('2023-03-15'))).toBe('Mar 2023');
    expect(formatMonthYear(new Date('2025-11-20'))).toBe('Nov 2025');
  });
});

// ============================================================================
// daysBetween tests
// ============================================================================
describe('daysBetween', () => {
  it('returns 0 for same date', () => {
    const date = new Date('2024-01-01');
    expect(daysBetween(date, date)).toBe(0);
  });

  it('returns positive number for dates in order', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-01-10');
    expect(daysBetween(start, end)).toBe(9);
  });

  it('returns negative number for dates in reverse order', () => {
    const start = new Date('2024-01-10');
    const end = new Date('2024-01-01');
    expect(daysBetween(start, end)).toBe(-9);
  });

  it('handles dates across months', () => {
    const start = new Date('2024-01-15');
    const end = new Date('2024-02-15');
    expect(daysBetween(start, end)).toBe(31);
  });

  it('handles dates across years', () => {
    const start = new Date('2023-12-01');
    const end = new Date('2024-01-01');
    expect(daysBetween(start, end)).toBe(31);
  });
});

// ============================================================================
// getEstimatedCompletionDate tests
// ============================================================================
describe('getEstimatedCompletionDate', () => {
  it('returns end bound of timeline', () => {
    const schedule = new Map<string, ScheduledSubject>();

    schedule.set('test', {
      subject: makeSubject({ id: 'test' }),
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-06-01'),
      status: 'scheduled',
      completionPercentage: 0,
      row: 0,
      hasOverride: false,
      earliestValidStart: new Date('2024-01-01'),
    });

    const completionDate = getEstimatedCompletionDate(schedule);
    expect(completionDate).toEqual(new Date('2024-06-01'));
  });

  it('returns latest end date across all subjects', () => {
    const schedule = new Map<string, ScheduledSubject>();

    schedule.set('early', {
      subject: makeSubject({ id: 'early' }),
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-01'),
      status: 'completed',
      completionPercentage: 100,
      row: 0,
      hasOverride: false,
      earliestValidStart: new Date('2024-01-01'),
    });

    schedule.set('late', {
      subject: makeSubject({ id: 'late' }),
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-12-01'),
      status: 'scheduled',
      completionPercentage: 0,
      row: 0,
      hasOverride: false,
      earliestValidStart: new Date('2024-03-01'),
    });

    const completionDate = getEstimatedCompletionDate(schedule);
    expect(completionDate).toEqual(new Date('2024-12-01'));
  });
});

// ============================================================================
// PACE_WEEKS_PER_TOPIC constant tests
// ============================================================================
describe('PACE_WEEKS_PER_TOPIC', () => {
  it('has correct values for each pace', () => {
    expect(PACE_WEEKS_PER_TOPIC.standard).toBe(2);
    expect(PACE_WEEKS_PER_TOPIC.accelerated).toBe(1);
    expect(PACE_WEEKS_PER_TOPIC.intensive).toBe(0.5);
  });
});

// ============================================================================
// Edge case and integration tests
// ============================================================================
describe('edge cases and integration', () => {
  it('handles subject with many prerequisites', () => {
    const subjects = [
      makeSubject({ id: 'a', prerequisites: [] }),
      makeSubject({ id: 'b', prerequisites: [] }),
      makeSubject({ id: 'c', prerequisites: [] }),
      makeSubject({ id: 'd', prerequisites: ['a', 'b', 'c'] }),
    ];
    const userProgress = makeUserProgress({});
    const startDate = new Date('2024-01-01');

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');
    const d = schedule.get('d')!;

    // d should start after all of a, b, c end
    const latestPrereqEnd = Math.max(
      schedule.get('a')!.endDate.getTime(),
      schedule.get('b')!.endDate.getTime(),
      schedule.get('c')!.endDate.getTime()
    );

    expect(d.startDate.getTime()).toBeGreaterThanOrEqual(latestPrereqEnd);
  });

  it('handles deep prerequisite chain', () => {
    const subjects = [
      makeSubject({ id: 'level1', prerequisites: [] }),
      makeSubject({ id: 'level2', prerequisites: ['level1'] }),
      makeSubject({ id: 'level3', prerequisites: ['level2'] }),
      makeSubject({ id: 'level4', prerequisites: ['level3'] }),
    ];
    const userProgress = makeUserProgress({});
    const startDate = new Date('2024-01-01');

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'accelerated');

    // Each level should start after the previous ends
    expect(schedule.get('level2')!.startDate.getTime())
      .toBeGreaterThanOrEqual(schedule.get('level1')!.endDate.getTime());
    expect(schedule.get('level3')!.startDate.getTime())
      .toBeGreaterThanOrEqual(schedule.get('level2')!.endDate.getTime());
    expect(schedule.get('level4')!.startDate.getTime())
      .toBeGreaterThanOrEqual(schedule.get('level3')!.endDate.getTime());
  });

  it('correctly identifies completion percentage edge cases', () => {
    // Subject with no trackable items
    const subjects = [makeSubject({
      id: 'empty',
      topics: [],
      examIds: [],
    })];
    const userProgress = makeUserProgress({
      empty: makeProgress({ status: 'in_progress' }),
    });
    const startDate = new Date('2024-01-01');

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // Should return 0% (not NaN or error) when there are no items
    expect(schedule.get('empty')!.completionPercentage).toBe(0);
  });

  it('handles quiz attempts below passing threshold', () => {
    const subjects = [makeSubject({
      id: 'test',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] },
      ],
      examIds: [],
    })];
    const userProgress = makeUserProgress({
      test: makeProgress({
        status: 'in_progress',
        quizAttempts: {
          q1: [makeQuizAttempt(60), makeQuizAttempt(69)] // Both below 70 threshold
        },
      }),
    });
    const startDate = new Date('2024-01-01');

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // Should be 0% since no quiz passed the 70% threshold
    expect(schedule.get('test')!.completionPercentage).toBe(0);
  });

  it('handles mixed override scenarios', () => {
    const subjects = [
      makeSubject({ id: 'a', prerequisites: [] }),
      makeSubject({ id: 'b', prerequisites: ['a'] }),
    ];
    const userProgress = makeUserProgress({});
    const startDate = new Date('2024-01-01');

    // Override only subject b's start date
    const overrides: Record<string, SubjectScheduleOverride> = {
      b: { customStartDate: '2024-06-01' },
    };

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard', overrides);

    expect(schedule.get('a')!.hasOverride).toBe(false);
    expect(schedule.get('b')!.hasOverride).toBe(true);
    expect(schedule.get('b')!.startDate).toEqual(new Date('2024-06-01'));
  });

  it('includes project submissions in completion percentage calculation', () => {
    // This test verifies that timeline uses the same completion calculation as progress.ts
    // which includes project submissions (bug fix: previously timeline had its own
    // implementation that didn't include projects)
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [
        { id: 't1', title: 'T1', content: '', quizIds: ['q1'], exerciseIds: [] },
      ],
      examIds: [],
      projectIds: ['proj1', 'proj2'],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'in_progress',
        quizAttempts: { q1: [makeQuizAttempt(80)] }, // passed (>= 70)
        projectSubmissions: {
          proj1: [makeProjectSubmission(75)], // passed AI evaluation (>= 70)
          proj2: [makeProjectSubmission(50)], // failed AI evaluation (< 70)
        },
      }),
    });
    const startDate = new Date('2024-01-01');

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // 3 total items: quiz (passed), proj1 (passed), proj2 (failed) = 2/3 = 67%
    expect(schedule.get('cs101')!.completionPercentage).toBe(67);
  });

  it('counts project submissions without AI evaluation as complete', () => {
    // Verify that projects without AI evaluation are counted as complete
    // (consistent with progress.ts behavior)
    const subjects = [makeSubject({
      id: 'cs101',
      topics: [],
      examIds: [],
      projectIds: ['proj1'],
    })];

    const userProgress = makeUserProgress({
      cs101: makeProgress({
        status: 'in_progress',
        projectSubmissions: {
          proj1: [makeProjectSubmission()], // No AI evaluation
        },
      }),
    });
    const startDate = new Date('2024-01-01');

    const schedule = calculateSchedule(subjects, userProgress, startDate, 'standard');

    // Project without AI evaluation should count as complete
    expect(schedule.get('cs101')!.completionPercentage).toBe(100);
  });
});
