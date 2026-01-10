/**
 * Comprehensive Timeline Utilities Tests
 *
 * Tests for timeline calculation functions including:
 * - Topological sorting with various dependency graphs
 * - Schedule calculation edge cases
 * - Date manipulation edge cases (DST, leap years)
 * - Empty and single-subject scenarios
 */

import { describe, it, expect } from 'vitest';
import {
  topologicalSort,
  calculateSchedule,
  xPositionToDate,
  getTimelineBounds,
  formatMonthYear,
  daysBetween,
  getEstimatedCompletionDate,
  PACE_WEEKS_PER_TOPIC,
} from '../src/components/timeline/timeline-utils';
import type { Subject, UserProgress } from '../src/core/types';

// Helper to create a minimal subject for testing
function createSubject(id: string, prerequisites: string[] = [], year = 1, semester = 1): Subject {
  return {
    id,
    name: `Subject ${id}`,
    description: `Description for ${id}`,
    year,
    semester,
    prerequisites,
    estimatedHours: 100,
    topics: [
      { id: `${id}-topic-1`, title: 'Topic 1', content: '', subtopics: [], quizIds: [], exerciseIds: [] },
      { id: `${id}-topic-2`, title: 'Topic 2', content: '', subtopics: [], quizIds: [], exerciseIds: [] },
    ],
    examIds: [],
    projectIds: [],
  };
}

// Helper to create empty user progress
function createEmptyProgress(): UserProgress {
  return {
    version: 4,
    startedAt: new Date().toISOString(),
    subjects: {},
    settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
  };
}

describe('Timeline Utilities', () => {
  describe('topologicalSort', () => {
    it('returns empty array for empty input', () => {
      const result = topologicalSort([]);
      expect(result).toEqual([]);
    });

    it('returns single subject unchanged', () => {
      const subject = createSubject('cs101');
      const result = topologicalSort([subject]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('cs101');
    });

    it('sorts independent subjects by year and semester', () => {
      const subjects = [
        createSubject('cs201', [], 2, 1),
        createSubject('cs101', [], 1, 1),
        createSubject('cs102', [], 1, 2),
      ];
      const result = topologicalSort(subjects);
      expect(result.map(s => s.id)).toEqual(['cs101', 'cs102', 'cs201']);
    });

    it('respects simple prerequisite chain', () => {
      const subjects = [
        createSubject('cs301', ['cs201']),
        createSubject('cs101', []),
        createSubject('cs201', ['cs101']),
      ];
      const result = topologicalSort(subjects);
      const ids = result.map(s => s.id);
      expect(ids.indexOf('cs101')).toBeLessThan(ids.indexOf('cs201'));
      expect(ids.indexOf('cs201')).toBeLessThan(ids.indexOf('cs301'));
    });

    it('handles multiple prerequisites', () => {
      const subjects = [
        createSubject('cs301', ['cs101', 'cs102']),
        createSubject('cs101', []),
        createSubject('cs102', []),
      ];
      const result = topologicalSort(subjects);
      const ids = result.map(s => s.id);
      expect(ids.indexOf('cs101')).toBeLessThan(ids.indexOf('cs301'));
      expect(ids.indexOf('cs102')).toBeLessThan(ids.indexOf('cs301'));
    });

    it('handles diamond dependency pattern', () => {
      // cs101 -> cs201, cs202 -> cs301
      const subjects = [
        createSubject('cs301', ['cs201', 'cs202']),
        createSubject('cs201', ['cs101']),
        createSubject('cs202', ['cs101']),
        createSubject('cs101', []),
      ];
      const result = topologicalSort(subjects);
      const ids = result.map(s => s.id);

      expect(ids.indexOf('cs101')).toBeLessThan(ids.indexOf('cs201'));
      expect(ids.indexOf('cs101')).toBeLessThan(ids.indexOf('cs202'));
      expect(ids.indexOf('cs201')).toBeLessThan(ids.indexOf('cs301'));
      expect(ids.indexOf('cs202')).toBeLessThan(ids.indexOf('cs301'));
    });

    it('handles prerequisite not in the list (filter out)', () => {
      const subjects = [
        createSubject('cs201', ['cs101']),  // cs101 not in list
      ];
      const result = topologicalSort(subjects);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('cs201');
    });

    it('handles circular dependency gracefully (guard)', () => {
      // cs101 -> cs102 -> cs101 (circular)
      const subjects = [
        createSubject('cs101', ['cs102']),
        createSubject('cs102', ['cs101']),
      ];
      // Should not throw, returns some order
      const result = topologicalSort(subjects);
      expect(result).toHaveLength(2);
    });
  });

  describe('calculateSchedule', () => {
    it('returns empty map for empty subjects', () => {
      const progress = createEmptyProgress();
      const schedule = calculateSchedule([], progress, new Date(), 'standard');
      expect(schedule.size).toBe(0);
    });

    it('schedules single subject starting at start date', () => {
      const subjects = [createSubject('cs101')];
      const progress = createEmptyProgress();
      const startDate = new Date('2024-01-01');

      const schedule = calculateSchedule(subjects, progress, startDate, 'standard');

      expect(schedule.size).toBe(1);
      const cs101 = schedule.get('cs101')!;
      expect(cs101.startDate.toDateString()).toBe(startDate.toDateString());
      expect(cs101.status).toBe('scheduled');
    });

    it('respects different paces', () => {
      const subjects = [createSubject('cs101')];
      subjects[0].topics = Array(7).fill(null).map((_, i) => ({
        id: `cs101-topic-${i + 1}`,
        title: `Topic ${i + 1}`,
        content: '',
        subtopics: [],
        quizIds: [],
        exerciseIds: [],
      }));
      const progress = createEmptyProgress();
      const startDate = new Date('2024-01-01');

      const standardSchedule = calculateSchedule(subjects, progress, startDate, 'standard');
      const acceleratedSchedule = calculateSchedule(subjects, progress, startDate, 'accelerated');
      const intensiveSchedule = calculateSchedule(subjects, progress, startDate, 'intensive');

      const standardDuration = daysBetween(
        standardSchedule.get('cs101')!.startDate,
        standardSchedule.get('cs101')!.endDate
      );
      const acceleratedDuration = daysBetween(
        acceleratedSchedule.get('cs101')!.startDate,
        acceleratedSchedule.get('cs101')!.endDate
      );
      const intensiveDuration = daysBetween(
        intensiveSchedule.get('cs101')!.startDate,
        intensiveSchedule.get('cs101')!.endDate
      );

      // Standard should take longest, intensive shortest
      expect(standardDuration).toBeGreaterThan(acceleratedDuration);
      expect(acceleratedDuration).toBeGreaterThan(intensiveDuration);
    });

    it('chains prerequisites correctly', () => {
      const subjects = [
        createSubject('cs101', []),
        createSubject('cs201', ['cs101']),
      ];
      const progress = createEmptyProgress();
      const startDate = new Date('2024-01-01');

      const schedule = calculateSchedule(subjects, progress, startDate, 'standard');

      const cs101 = schedule.get('cs101')!;
      const cs201 = schedule.get('cs201')!;

      // cs201 should start when or after cs101 ends
      expect(cs201.startDate.getTime()).toBeGreaterThanOrEqual(cs101.endDate.getTime());
    });

    it('marks subject as completed when progress shows completed', () => {
      const subjects = [createSubject('cs101')];
      const progress = createEmptyProgress();
      progress.subjects['cs101'] = {
        status: 'completed',
        completedAt: new Date().toISOString(),
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };
      const startDate = new Date('2024-01-01');

      const schedule = calculateSchedule(subjects, progress, startDate, 'standard');

      expect(schedule.get('cs101')!.status).toBe('completed');
    });

    it('marks subject as in-progress when progress shows in_progress', () => {
      const subjects = [createSubject('cs101')];
      const progress = createEmptyProgress();
      progress.subjects['cs101'] = {
        status: 'in_progress',
        startedAt: new Date().toISOString(),
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
        subtopicViews: {},
      };
      const startDate = new Date('2024-01-01');

      const schedule = calculateSchedule(subjects, progress, startDate, 'standard');

      expect(schedule.get('cs101')!.status).toBe('in-progress');
    });

    it('marks subject as blocked when prerequisites not completed', () => {
      const subjects = [
        createSubject('cs101', []),
        createSubject('cs201', ['cs101']),
      ];
      const progress = createEmptyProgress();
      // cs101 is not completed, so cs201 should be blocked
      const startDate = new Date('2024-01-01');

      const schedule = calculateSchedule(subjects, progress, startDate, 'standard');

      expect(schedule.get('cs201')!.status).toBe('blocked');
    });

    it('applies custom start date override', () => {
      const subjects = [createSubject('cs101')];
      const progress = createEmptyProgress();
      const startDate = new Date('2024-01-01');
      const customStart = '2024-06-01';

      const schedule = calculateSchedule(subjects, progress, startDate, 'standard', {
        'cs101': { customStartDate: customStart },
      });

      const cs101 = schedule.get('cs101')!;
      expect(cs101.startDate.toISOString().slice(0, 10)).toBe(customStart);
      expect(cs101.hasOverride).toBe(true);
    });

    it('applies custom duration override', () => {
      const subjects = [createSubject('cs101')];
      const progress = createEmptyProgress();
      const startDate = new Date('2024-01-01');

      const schedule = calculateSchedule(subjects, progress, startDate, 'standard', {
        'cs101': { customDurationWeeks: 10 },
      });

      const cs101 = schedule.get('cs101')!;
      const duration = daysBetween(cs101.startDate, cs101.endDate);
      expect(duration).toBe(70); // 10 weeks * 7 days
      expect(cs101.hasOverride).toBe(true);
    });
  });

  describe('xPositionToDate', () => {
    it('returns start date at label width position', () => {
      const bounds = { start: new Date('2024-01-01'), end: new Date('2024-12-31') };
      const labelWidth = 100;
      const dayWidth = 5;

      const date = xPositionToDate(100, bounds, labelWidth, dayWidth);
      expect(date.toDateString()).toBe(bounds.start.toDateString());
    });

    it('correctly calculates date at offset position', () => {
      const bounds = { start: new Date('2024-01-01'), end: new Date('2024-12-31') };
      const labelWidth = 100;
      const dayWidth = 5;

      // 100 (label width) + 5 (one day) = 105
      const date = xPositionToDate(105, bounds, labelWidth, dayWidth);
      const expected = new Date('2024-01-02');
      expect(date.toDateString()).toBe(expected.toDateString());
    });

    it('handles fractional positions with rounding', () => {
      const bounds = { start: new Date('2024-01-01'), end: new Date('2024-12-31') };
      const labelWidth = 100;
      const dayWidth = 5;

      // 100 + 2.4 = 102.4 -> rounds to 0 days
      const date1 = xPositionToDate(102.4, bounds, labelWidth, dayWidth);
      expect(date1.toDateString()).toBe(new Date('2024-01-01').toDateString());

      // 100 + 2.6 = 102.6 -> rounds to 1 day
      const date2 = xPositionToDate(102.6, bounds, labelWidth, dayWidth);
      expect(date2.toDateString()).toBe(new Date('2024-01-02').toDateString());
    });
  });

  describe('getTimelineBounds', () => {
    it('returns current date for empty schedule', () => {
      const schedule = new Map();
      const bounds = getTimelineBounds(schedule);
      const now = new Date();
      // Should be same day
      expect(bounds.start.toDateString()).toBe(now.toDateString());
      expect(bounds.end.toDateString()).toBe(now.toDateString());
    });

    it('returns correct bounds for single subject', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-03-01');
      const schedule = new Map([
        ['cs101', {
          subject: createSubject('cs101'),
          startDate: start,
          endDate: end,
          status: 'scheduled' as const,
          completionPercentage: 0,
          row: 0,
          hasOverride: false,
          earliestValidStart: start,
        }],
      ]);

      const bounds = getTimelineBounds(schedule);
      expect(bounds.start.toDateString()).toBe(start.toDateString());
      expect(bounds.end.toDateString()).toBe(end.toDateString());
    });

    it('returns overall min/max for multiple subjects', () => {
      const schedule = new Map([
        ['cs101', {
          subject: createSubject('cs101'),
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-04-01'),
          status: 'scheduled' as const,
          completionPercentage: 0,
          row: 0,
          hasOverride: false,
          earliestValidStart: new Date('2024-02-01'),
        }],
        ['cs102', {
          subject: createSubject('cs102'),
          startDate: new Date('2024-01-01'),  // Earlier start
          endDate: new Date('2024-06-01'),    // Later end
          status: 'scheduled' as const,
          completionPercentage: 0,
          row: 1,
          hasOverride: false,
          earliestValidStart: new Date('2024-01-01'),
        }],
      ]);

      const bounds = getTimelineBounds(schedule);
      expect(bounds.start.toDateString()).toBe(new Date('2024-01-01').toDateString());
      expect(bounds.end.toDateString()).toBe(new Date('2024-06-01').toDateString());
    });
  });

  describe('formatMonthYear', () => {
    it('formats January 2024', () => {
      const date = new Date('2024-01-15');
      expect(formatMonthYear(date)).toBe('Jan 2024');
    });

    it('formats December 2025', () => {
      const date = new Date('2025-12-31');
      expect(formatMonthYear(date)).toBe('Dec 2025');
    });
  });

  describe('daysBetween', () => {
    it('returns 0 for same day', () => {
      const date = new Date('2024-01-15');
      expect(daysBetween(date, date)).toBe(0);
    });

    it('returns 1 for consecutive days', () => {
      const start = new Date('2024-01-15');
      const end = new Date('2024-01-16');
      expect(daysBetween(start, end)).toBe(1);
    });

    it('returns correct count for a week', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-08');
      expect(daysBetween(start, end)).toBe(7);
    });

    it('returns correct count for a month (31 days)', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-02-01');
      expect(daysBetween(start, end)).toBe(31);
    });

    it('handles leap year correctly', () => {
      // 2024 is a leap year
      const start = new Date('2024-02-01');
      const end = new Date('2024-03-01');
      expect(daysBetween(start, end)).toBe(29); // Feb has 29 days in 2024
    });

    it('returns negative for end before start', () => {
      const start = new Date('2024-01-15');
      const end = new Date('2024-01-10');
      expect(daysBetween(start, end)).toBe(-5);
    });

    it('handles year boundary', () => {
      const start = new Date('2023-12-31');
      const end = new Date('2024-01-01');
      expect(daysBetween(start, end)).toBe(1);
    });
  });

  describe('getEstimatedCompletionDate', () => {
    it('returns latest end date from schedule', () => {
      const schedule = new Map([
        ['cs101', {
          subject: createSubject('cs101'),
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-03-01'),
          status: 'scheduled' as const,
          completionPercentage: 0,
          row: 0,
          hasOverride: false,
          earliestValidStart: new Date('2024-01-01'),
        }],
        ['cs201', {
          subject: createSubject('cs201'),
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-06-01'),
          status: 'scheduled' as const,
          completionPercentage: 0,
          row: 0,
          hasOverride: false,
          earliestValidStart: new Date('2024-03-01'),
        }],
      ]);

      const completion = getEstimatedCompletionDate(schedule);
      expect(completion.toDateString()).toBe(new Date('2024-06-01').toDateString());
    });
  });

  describe('PACE_WEEKS_PER_TOPIC constants', () => {
    it('standard pace is 2 weeks per topic', () => {
      expect(PACE_WEEKS_PER_TOPIC.standard).toBe(2);
    });

    it('accelerated pace is 1 week per topic', () => {
      expect(PACE_WEEKS_PER_TOPIC.accelerated).toBe(1);
    });

    it('intensive pace is 0.5 weeks per topic', () => {
      expect(PACE_WEEKS_PER_TOPIC.intensive).toBe(0.5);
    });
  });
});
