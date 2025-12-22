import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressStorage } from '../src/core/storage';

const now = new Date('2024-01-01T00:00:00.000Z');

const makeStorage = () => new ProgressStorage();

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('ProgressStorage review queue', () => {
  it('adds review items once', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });

    expect(storage.getReviewQueue()).toHaveLength(1);
  });

  it('updates review interval after a passing attempt', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.updateReviewItem('q1', 'quiz', true);

    const [item] = storage.getReviewQueue();
    expect(item.streak).toBe(1);
    expect(item.interval).toBe(3);
    expect(new Date(item.nextReviewAt).toISOString()).toBe('2024-01-04T00:00:00.000Z');
  });

  it('keeps failed items due the next day', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e1', subjectId: 's1' });
    storage.updateReviewItem('e1', 'exercise', false);

    const [item] = storage.getReviewQueue();
    expect(item.streak).toBe(0);
    expect(item.interval).toBe(1);
    expect(new Date(item.nextReviewAt).toISOString()).toBe('2024-01-02T00:00:00.000Z');
  });

  it('returns due items ordered by date', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q-late', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q-soon', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e-future', subjectId: 's1' });

    const queue = storage.getReviewQueue();
    const late = queue.find(item => item.itemId === 'q-late');
    const soon = queue.find(item => item.itemId === 'q-soon');
    const future = queue.find(item => item.itemId === 'e-future');

    if (!late || !soon || !future) {
      throw new Error('Missing review items');
    }

    late.nextReviewAt = '2024-01-01T00:00:00.000Z';
    late.interval = 3;
    late.streak = 1;

    soon.nextReviewAt = '2023-12-31T00:00:00.000Z';
    soon.interval = 1;
    soon.streak = 0;

    future.nextReviewAt = '2024-02-01T00:00:00.000Z';
    future.interval = 30;
    future.streak = 4;

    const due = storage.getDueReviewItems();
    expect(due.map(item => item.itemId)).toEqual(['q-soon', 'q-late']);
  });

  it('respects the due items limit', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q2', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q3', subjectId: 's1' });

    const queue = storage.getReviewQueue();
    const q1 = queue.find(item => item.itemId === 'q1');
    const q2 = queue.find(item => item.itemId === 'q2');
    const q3 = queue.find(item => item.itemId === 'q3');

    if (!q1 || !q2 || !q3) {
      throw new Error('Missing review items');
    }

    q1.nextReviewAt = '2023-12-30T00:00:00.000Z';
    q2.nextReviewAt = '2023-12-31T00:00:00.000Z';
    q3.nextReviewAt = '2023-12-29T00:00:00.000Z';

    const due = storage.getDueReviewItems(2);
    expect(due.map(item => item.itemId)).toEqual(['q3', 'q1']);
  });

  it('removes items from the review queue', () => {
    const storage = makeStorage();

    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q1', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e1', subjectId: 's1' });
    storage.removeFromReviewQueue('q1', 'quiz');

    expect(storage.getReviewQueue().map(item => item.itemId)).toEqual(['e1']);
  });

  it('counts due review items', () => {
    const storage = makeStorage();
    storage.addToReviewQueue({ itemType: 'quiz', itemId: 'q-due', subjectId: 's1' });
    storage.addToReviewQueue({ itemType: 'exercise', itemId: 'e-future', subjectId: 's1' });

    const queue = storage.getReviewQueue();
    const due = queue.find(item => item.itemId === 'q-due');
    const future = queue.find(item => item.itemId === 'e-future');

    if (!due || !future) {
      throw new Error('Missing review items');
    }

    due.nextReviewAt = '2023-12-31T00:00:00.000Z';
    future.nextReviewAt = '2024-02-01T00:00:00.000Z';

    expect(storage.getDueReviewCount()).toBe(1);
  });
});

describe('ProgressStorage selections', () => {
  it('adds and removes selected subjects', () => {
    const storage = makeStorage();

    storage.addToSelection('cs101');
    storage.addToSelection('cs101');
    storage.addToSelection('cs102');

    expect(storage.getSelectedSubjects()).toEqual(['cs101', 'cs102']);
    expect(storage.isSubjectSelected('cs101')).toBe(true);

    storage.removeFromSelection('cs101');
    expect(storage.getSelectedSubjects()).toEqual(['cs102']);
    expect(storage.isSubjectSelected('cs101')).toBe(false);
  });

  it('reports if any subjects are selected', () => {
    const storage = makeStorage();
    expect(storage.hasSelectedSubjects()).toBe(false);

    storage.setSelectedSubjects(['cs101']);
    expect(storage.hasSelectedSubjects()).toBe(true);
  });
});

describe('ProgressStorage import', () => {
  it('rejects invalid JSON', () => {
    const storage = makeStorage();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(storage.importProgress('not json')).toBe(false);
    errorSpy.mockRestore();
  });

  it('rejects malformed progress data', () => {
    const storage = makeStorage();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const malformed = JSON.stringify({ version: 4, subjects: {} });
    expect(storage.importProgress(malformed)).toBe(false);
    errorSpy.mockRestore();
  });

  it('migrates legacy progress data', () => {
    const storage = makeStorage();

    const legacy = {
      version: 3,
      startedAt: now.toISOString(),
      subjects: {},
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
    };

    const result = storage.importProgress(JSON.stringify(legacy));
    expect(result).toBe(true);

    const migrated = storage.getProgress();
    expect(migrated.reviewQueue).toEqual([]);
    expect(migrated.selectedSubjectIds?.length).toBeGreaterThan(0);
    expect(migrated.selectedSubjectIds).toContain('cs101');
  });

  it('round-trips export and import with current version', () => {
    const storage = makeStorage();
    storage.addToSelection('cs101');

    const exported = storage.exportProgress();
    const next = makeStorage();

    expect(next.importProgress(exported)).toBe(true);
    expect(next.getSelectedSubjects()).toEqual(['cs101']);
  });
});

describe('ProgressStorage reset', () => {
  it('clears subjects and selections', () => {
    const storage = makeStorage();
    storage.addToSelection('cs101');
    storage.updateSubjectProgress('cs101', { status: 'in_progress' });

    storage.resetProgress();

    expect(storage.getSelectedSubjects()).toEqual([]);
    expect(storage.getProgress().subjects).toEqual({});
  });
});
