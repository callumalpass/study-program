/**
 * Progress Last Viewed Subtopic Tests
 *
 * Comprehensive tests for the getLastViewedSubtopicForSubject function
 * in the ProgressStorage class. This feature tracks which subtopic
 * was most recently viewed in a subject for navigation purposes.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ProgressStorage } from '../src/core/storage';

describe('getLastViewedSubtopicForSubject', () => {
  let storage: ProgressStorage;

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    storage = new ProgressStorage();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('when no subtopics have been viewed', () => {
    it('returns null for subject with no progress', () => {
      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result).toBeNull();
    });

    it('returns null for subject with progress but no subtopic views', () => {
      storage.updateSubjectProgress('cs101', { status: 'in_progress' });
      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result).toBeNull();
    });

    it('returns null for subject with empty subtopicViews object', () => {
      storage.updateSubjectProgress('cs101', {
        status: 'in_progress',
        subtopicViews: {},
      });
      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result).toBeNull();
    });
  });

  describe('when a single subtopic has been viewed', () => {
    it('returns the only viewed subtopic', () => {
      const viewTime = new Date('2024-06-15T10:00:00.000Z');
      vi.setSystemTime(viewTime);

      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result).not.toBeNull();
      expect(result?.subtopicId).toBe('cs101-t1-intro');
      expect(result?.lastViewedAt.toISOString()).toBe(viewTime.toISOString());
    });

    it('returns correct result after viewing same subtopic multiple times', () => {
      const firstView = new Date('2024-06-15T10:00:00.000Z');
      vi.setSystemTime(firstView);
      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      const secondView = new Date('2024-06-15T14:00:00.000Z');
      vi.setSystemTime(secondView);
      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result?.subtopicId).toBe('cs101-t1-intro');
      expect(result?.lastViewedAt.toISOString()).toBe(secondView.toISOString());
    });
  });

  describe('when multiple subtopics have been viewed', () => {
    it('returns the most recently viewed subtopic', () => {
      vi.setSystemTime(new Date('2024-06-15T10:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      vi.setSystemTime(new Date('2024-06-15T11:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-variables');

      vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-types');

      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result?.subtopicId).toBe('cs101-t1-types');
    });

    it('handles re-viewing an older subtopic after viewing newer ones', () => {
      vi.setSystemTime(new Date('2024-06-15T10:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      vi.setSystemTime(new Date('2024-06-15T11:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-variables');

      // Go back and re-view the first subtopic
      vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result?.subtopicId).toBe('cs101-t1-intro');
    });

    it('correctly identifies most recent among many subtopics', () => {
      const subtopics = [
        'cs101-t1-intro',
        'cs101-t1-variables',
        'cs101-t1-types',
        'cs101-t2-if',
        'cs101-t2-loops',
        'cs101-t3-functions',
      ];

      // View all subtopics in order
      subtopics.forEach((subtopicId, index) => {
        vi.setSystemTime(new Date(`2024-06-15T${10 + index}:00:00.000Z`));
        storage.recordSubtopicView('cs101', subtopicId);
      });

      // Now re-view one from the middle
      vi.setSystemTime(new Date('2024-06-15T20:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t2-if');

      const result = storage.getLastViewedSubtopicForSubject('cs101');
      expect(result?.subtopicId).toBe('cs101-t2-if');
    });
  });

  describe('isolation between subjects', () => {
    it('returns correct subtopic for each subject', () => {
      vi.setSystemTime(new Date('2024-06-15T10:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      vi.setSystemTime(new Date('2024-06-15T11:00:00.000Z'));
      storage.recordSubtopicView('math101', 'math101-t1-sets');

      vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-variables');

      const cs101Result = storage.getLastViewedSubtopicForSubject('cs101');
      const math101Result = storage.getLastViewedSubtopicForSubject('math101');

      expect(cs101Result?.subtopicId).toBe('cs101-t1-variables');
      expect(math101Result?.subtopicId).toBe('math101-t1-sets');
    });

    it('returns null for subject with no views even if other subjects have views', () => {
      vi.setSystemTime(new Date('2024-06-15T10:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      const result = storage.getLastViewedSubtopicForSubject('math101');
      expect(result).toBeNull();
    });
  });

  describe('view count tracking', () => {
    it('increments view count on multiple views', () => {
      const subtopicId = 'cs101-t1-intro';

      storage.recordSubtopicView('cs101', subtopicId);
      storage.recordSubtopicView('cs101', subtopicId);
      storage.recordSubtopicView('cs101', subtopicId);

      const view = storage.getSubtopicView('cs101', subtopicId);
      expect(view?.viewCount).toBe(3);
    });

    it('tracks firstViewedAt separately from lastViewedAt', () => {
      const subtopicId = 'cs101-t1-intro';
      const firstTime = new Date('2024-06-15T10:00:00.000Z');
      const secondTime = new Date('2024-06-16T14:00:00.000Z');

      vi.setSystemTime(firstTime);
      storage.recordSubtopicView('cs101', subtopicId);

      vi.setSystemTime(secondTime);
      storage.recordSubtopicView('cs101', subtopicId);

      const view = storage.getSubtopicView('cs101', subtopicId);
      expect(view?.firstViewedAt).toBe(firstTime.toISOString());
      expect(view?.lastViewedAt).toBe(secondTime.toISOString());
    });
  });

  describe('persistence across storage instances', () => {
    it('persists subtopic views to localStorage', () => {
      const viewTime = new Date('2024-06-15T10:00:00.000Z');
      vi.setSystemTime(viewTime);

      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      // Create a new storage instance (simulates page reload)
      const newStorage = new ProgressStorage();
      const result = newStorage.getLastViewedSubtopicForSubject('cs101');

      expect(result?.subtopicId).toBe('cs101-t1-intro');
    });

    it('maintains correct ordering after reload', () => {
      vi.setSystemTime(new Date('2024-06-15T10:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-intro');

      vi.setSystemTime(new Date('2024-06-15T11:00:00.000Z'));
      storage.recordSubtopicView('cs101', 'cs101-t1-variables');

      // Create new instance
      const newStorage = new ProgressStorage();
      const result = newStorage.getLastViewedSubtopicForSubject('cs101');

      expect(result?.subtopicId).toBe('cs101-t1-variables');
    });
  });

  describe('areAllSubtopicsViewed', () => {
    it('returns false when no subtopics have been viewed', () => {
      storage.updateSubjectProgress('cs101', { status: 'in_progress' });
      const result = storage.areAllSubtopicsViewed('cs101', ['st1', 'st2', 'st3']);
      expect(result).toBe(false);
    });

    it('returns false when only some subtopics have been viewed', () => {
      storage.recordSubtopicView('cs101', 'st1');
      storage.recordSubtopicView('cs101', 'st2');
      const result = storage.areAllSubtopicsViewed('cs101', ['st1', 'st2', 'st3']);
      expect(result).toBe(false);
    });

    it('returns true when all subtopics have been viewed', () => {
      storage.recordSubtopicView('cs101', 'st1');
      storage.recordSubtopicView('cs101', 'st2');
      storage.recordSubtopicView('cs101', 'st3');
      const result = storage.areAllSubtopicsViewed('cs101', ['st1', 'st2', 'st3']);
      expect(result).toBe(true);
    });

    it('returns true for empty subtopic list', () => {
      storage.updateSubjectProgress('cs101', { status: 'in_progress' });
      const result = storage.areAllSubtopicsViewed('cs101', []);
      expect(result).toBe(true);
    });

    it('returns false when subject has no progress', () => {
      const result = storage.areAllSubtopicsViewed('cs101', ['st1']);
      expect(result).toBe(false);
    });
  });
});
