import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';

const makeStorage = () => new ProgressStorage();

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('ProgressStorage subtopic views', () => {
  it('records and increments subtopic views', () => {
    const storage = makeStorage();
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));

    storage.recordSubtopicView('cs101', 'sub-1');
    const first = storage.getSubtopicView('cs101', 'sub-1');

    expect(first?.viewCount).toBe(1);
    expect(first?.firstViewedAt).toBe('2024-01-01T00:00:00.000Z');
    expect(first?.lastViewedAt).toBe('2024-01-01T00:00:00.000Z');

    vi.setSystemTime(new Date('2024-01-02T00:00:00.000Z'));
    storage.recordSubtopicView('cs101', 'sub-1');

    const second = storage.getSubtopicView('cs101', 'sub-1');
    expect(second?.viewCount).toBe(2);
    expect(second?.firstViewedAt).toBe('2024-01-01T00:00:00.000Z');
    expect(second?.lastViewedAt).toBe('2024-01-02T00:00:00.000Z');
  });

  it('checks if all subtopics are viewed', () => {
    const storage = makeStorage();
    storage.recordSubtopicView('cs101', 'sub-1');

    expect(storage.areAllSubtopicsViewed('cs101', ['sub-1'])).toBe(true);
    expect(storage.areAllSubtopicsViewed('cs101', ['sub-1', 'sub-2'])).toBe(false);
  });

  it('returns the most recently viewed subtopic', () => {
    const storage = makeStorage();

    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
    storage.recordSubtopicView('cs101', 'sub-1');

    vi.setSystemTime(new Date('2024-01-03T00:00:00.000Z'));
    storage.recordSubtopicView('cs101', 'sub-2');

    const recent = storage.getLastViewedSubtopicForSubject('cs101');
    expect(recent?.subtopicId).toBe('sub-2');
    expect(recent?.lastViewedAt.toISOString()).toBe('2024-01-03T00:00:00.000Z');
  });

  it('returns null when no subtopics have been viewed', () => {
    const storage = makeStorage();
    expect(storage.getLastViewedSubtopicForSubject('cs101')).toBeNull();
  });
});

describe('ProgressStorage exercise and project helpers', () => {
  it('reports exercise pass status', () => {
    const storage = makeStorage();
    storage.updateSubjectProgress('cs101', { status: 'in_progress' });
    storage.addExerciseCompletion('cs101', 'ex-1', {
      completionId: 'c1',
      timestamp: '2024-01-01T00:00:00.000Z',
      code: 'print("hi")',
      passed: true,
      timeSpentSeconds: 10,
    });

    expect(storage.isExercisePassed('cs101', 'ex-1')).toBe(true);
    expect(storage.getExerciseCompletion('cs101', 'ex-1')?.passed).toBe(true);
  });

  it('stores project submissions', () => {
    const storage = makeStorage();
    storage.addProjectSubmission('cs101', 'proj-1', {
      submissionId: 'p1',
      timestamp: '2024-01-01T00:00:00.000Z',
      description: 'submission',
      selfAssessment: {},
      notes: '',
    });

    const submissions = storage.getProjectSubmissions('cs101', 'proj-1');
    expect(submissions).toHaveLength(1);
    expect(submissions[0].submissionId).toBe('p1');
  });
});
