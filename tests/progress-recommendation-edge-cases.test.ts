/**
 * Progress Recommendation Edge Cases Tests
 *
 * Tests for edge cases in the getNextRecommendedSubject function,
 * specifically focusing on sorting tie-breakers and priority logic.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getNextRecommendedSubject,
  getInProgressSubjects,
  getAvailableSubjects,
  arePrerequisitesMet,
  getSubjectsByYearAndSemester,
  getDependentSubjects,
  getPrerequisiteSubjects,
} from '../src/core/progress';
import type { Subject, UserProgress, SubjectProgress } from '../src/core/types';

// Helper to create a subject
function makeSubject(overrides: Partial<Subject> = {}): Subject {
  return {
    id: 'test-subject',
    code: 'TEST101',
    title: 'Test Subject',
    description: 'A test subject',
    category: 'cs',
    year: 1,
    semester: 1,
    estimatedHours: 40,
    prerequisites: [],
    topics: [],
    examIds: [],
    projectIds: [],
    ...overrides,
  };
}

// Helper to create user progress
function makeUserProgress(
  subjects: Record<string, Partial<SubjectProgress>> = {}
): UserProgress {
  const subjectProgress: Record<string, SubjectProgress> = {};
  for (const [id, progress] of Object.entries(subjects)) {
    subjectProgress[id] = {
      status: 'not_started',
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      ...progress,
    };
  }

  return {
    version: 4,
    startedAt: new Date().toISOString(),
    subjects: subjectProgress,
    settings: {
      theme: 'auto',
      codeEditorFontSize: 14,
      showCompletedItems: true,
    },
  };
}

describe('getNextRecommendedSubject', () => {
  describe('in-progress subject priority', () => {
    it('returns in-progress subject over available subjects', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 1 }),
        makeSubject({ id: 's2', year: 1, semester: 1 }),
      ];
      const progress = makeUserProgress({
        s2: { status: 'in_progress' },
      });

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s2');
    });

    it('sorts multiple in-progress by year then semester', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 2, semester: 1 }),
        makeSubject({ id: 's2', year: 1, semester: 2 }),
        makeSubject({ id: 's3', year: 1, semester: 1 }),
      ];
      const progress = makeUserProgress({
        s1: { status: 'in_progress' },
        s2: { status: 'in_progress' },
        s3: { status: 'in_progress' },
      });

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s3'); // Year 1, Semester 1 first
    });

    it('handles tie in year and semester for in-progress subjects', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 1 }),
        makeSubject({ id: 's2', year: 1, semester: 1 }),
      ];
      const progress = makeUserProgress({
        s1: { status: 'in_progress' },
        s2: { status: 'in_progress' },
      });

      const recommended = getNextRecommendedSubject(subjects, progress);
      // Should return one of them (first in sorted order)
      expect(['s1', 's2']).toContain(recommended?.id);
    });
  });

  describe('available subjects when no in-progress', () => {
    it('returns earliest available subject when nothing in progress', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 2, semester: 1 }),
        makeSubject({ id: 's2', year: 1, semester: 2 }),
        makeSubject({ id: 's3', year: 1, semester: 1 }),
      ];
      const progress = makeUserProgress({});

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s3');
    });

    it('skips completed subjects', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 1 }),
        makeSubject({ id: 's2', year: 1, semester: 2 }),
      ];
      const progress = makeUserProgress({
        s1: { status: 'completed' },
      });

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s2');
    });

    it('returns null when all subjects completed', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 1 }),
        makeSubject({ id: 's2', year: 1, semester: 2 }),
      ];
      const progress = makeUserProgress({
        s1: { status: 'completed' },
        s2: { status: 'completed' },
      });

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended).toBeNull();
    });
  });

  describe('prerequisite handling', () => {
    it('skips subjects with unmet prerequisites', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 1, prerequisites: [] }),
        makeSubject({ id: 's2', year: 1, semester: 1, prerequisites: ['s1'] }),
      ];
      const progress = makeUserProgress({});

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s1');
    });

    it('recommends subject when prerequisites are completed', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 1, prerequisites: [] }),
        makeSubject({ id: 's2', year: 1, semester: 2, prerequisites: ['s1'] }),
      ];
      const progress = makeUserProgress({
        s1: { status: 'completed' },
      });

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s2');
    });

    it('handles deep prerequisite chains', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 1, prerequisites: [] }),
        makeSubject({ id: 's2', year: 1, semester: 2, prerequisites: ['s1'] }),
        makeSubject({ id: 's3', year: 2, semester: 1, prerequisites: ['s2'] }),
        makeSubject({ id: 's4', year: 2, semester: 2, prerequisites: ['s3'] }),
      ];
      const progress = makeUserProgress({
        s1: { status: 'completed' },
        s2: { status: 'completed' },
        s3: { status: 'completed' },
      });

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s4');
    });

    it('returns null when only blocked subjects remain', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 1, prerequisites: ['nonexistent'] }),
        makeSubject({ id: 's2', year: 1, semester: 2, prerequisites: ['s1'] }),
      ];
      const progress = makeUserProgress({});

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended).toBeNull();
    });

    it('handles multiple prerequisites', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 1 }),
        makeSubject({ id: 's2', year: 1, semester: 2 }),
        makeSubject({ id: 's3', year: 2, semester: 1, prerequisites: ['s1', 's2'] }),
      ];

      // Only one prerequisite completed
      const partialProgress = makeUserProgress({
        s1: { status: 'completed' },
      });
      expect(getNextRecommendedSubject(subjects, partialProgress)?.id).toBe('s2');

      // Both prerequisites completed
      const fullProgress = makeUserProgress({
        s1: { status: 'completed' },
        s2: { status: 'completed' },
      });
      expect(getNextRecommendedSubject(subjects, fullProgress)?.id).toBe('s3');
    });
  });

  describe('edge cases', () => {
    it('returns null for empty subjects array', () => {
      const progress = makeUserProgress({});
      const recommended = getNextRecommendedSubject([], progress);
      expect(recommended).toBeNull();
    });

    it('handles single subject', () => {
      const subjects = [makeSubject({ id: 's1' })];
      const progress = makeUserProgress({});

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s1');
    });

    it('handles subjects with same year but different semesters', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 1, semester: 2 }),
        makeSubject({ id: 's2', year: 1, semester: 1 }),
      ];
      const progress = makeUserProgress({});

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s2'); // Lower semester first
    });

    it('handles year 0 edge case', () => {
      const subjects = [
        makeSubject({ id: 's1', year: 0, semester: 1 }),
        makeSubject({ id: 's2', year: 1, semester: 1 }),
      ];
      const progress = makeUserProgress({});

      const recommended = getNextRecommendedSubject(subjects, progress);
      expect(recommended?.id).toBe('s1'); // Year 0 first
    });
  });
});

describe('getInProgressSubjects', () => {
  it('returns empty array when no subjects are in progress', () => {
    const subjects = [makeSubject({ id: 's1' })];
    const progress = makeUserProgress({});

    expect(getInProgressSubjects(subjects, progress)).toEqual([]);
  });

  it('returns only in-progress subjects', () => {
    const subjects = [
      makeSubject({ id: 's1' }),
      makeSubject({ id: 's2' }),
      makeSubject({ id: 's3' }),
    ];
    const progress = makeUserProgress({
      s1: { status: 'completed' },
      s2: { status: 'in_progress' },
    });

    const inProgress = getInProgressSubjects(subjects, progress);
    expect(inProgress.map(s => s.id)).toEqual(['s2']);
  });

  it('returns all in-progress subjects', () => {
    const subjects = [
      makeSubject({ id: 's1' }),
      makeSubject({ id: 's2' }),
      makeSubject({ id: 's3' }),
    ];
    const progress = makeUserProgress({
      s1: { status: 'in_progress' },
      s3: { status: 'in_progress' },
    });

    const inProgress = getInProgressSubjects(subjects, progress);
    expect(inProgress.map(s => s.id).sort()).toEqual(['s1', 's3']);
  });
});

describe('getAvailableSubjects', () => {
  it('returns all subjects when none have prerequisites', () => {
    const subjects = [
      makeSubject({ id: 's1' }),
      makeSubject({ id: 's2' }),
    ];
    const progress = makeUserProgress({});

    const available = getAvailableSubjects(subjects, progress);
    expect(available).toHaveLength(2);
  });

  it('excludes subjects with unmet prerequisites', () => {
    const subjects = [
      makeSubject({ id: 's1' }),
      makeSubject({ id: 's2', prerequisites: ['s1'] }),
    ];
    const progress = makeUserProgress({});

    const available = getAvailableSubjects(subjects, progress);
    expect(available.map(s => s.id)).toEqual(['s1']);
  });

  it('includes subjects whose prerequisites are completed', () => {
    const subjects = [
      makeSubject({ id: 's1' }),
      makeSubject({ id: 's2', prerequisites: ['s1'] }),
    ];
    const progress = makeUserProgress({
      s1: { status: 'completed' },
    });

    const available = getAvailableSubjects(subjects, progress);
    expect(available.map(s => s.id).sort()).toEqual(['s1', 's2']);
  });
});

describe('arePrerequisitesMet', () => {
  it('returns true for subjects with no prerequisites', () => {
    const subject = makeSubject({ prerequisites: [] });
    const progress = makeUserProgress({});

    expect(arePrerequisitesMet(subject, progress)).toBe(true);
  });

  it('returns true for subjects with undefined prerequisites', () => {
    const subject = makeSubject();
    subject.prerequisites = undefined as unknown as string[];
    const progress = makeUserProgress({});

    expect(arePrerequisitesMet(subject, progress)).toBe(true);
  });

  it('returns false when prerequisite not started', () => {
    const subject = makeSubject({ prerequisites: ['prereq1'] });
    const progress = makeUserProgress({});

    expect(arePrerequisitesMet(subject, progress)).toBe(false);
  });

  it('returns false when prerequisite is in_progress', () => {
    const subject = makeSubject({ prerequisites: ['prereq1'] });
    const progress = makeUserProgress({
      prereq1: { status: 'in_progress' },
    });

    expect(arePrerequisitesMet(subject, progress)).toBe(false);
  });

  it('returns true when all prerequisites are completed', () => {
    const subject = makeSubject({ prerequisites: ['prereq1', 'prereq2'] });
    const progress = makeUserProgress({
      prereq1: { status: 'completed' },
      prereq2: { status: 'completed' },
    });

    expect(arePrerequisitesMet(subject, progress)).toBe(true);
  });

  it('returns false when one of multiple prerequisites is not completed', () => {
    const subject = makeSubject({ prerequisites: ['prereq1', 'prereq2'] });
    const progress = makeUserProgress({
      prereq1: { status: 'completed' },
      prereq2: { status: 'in_progress' },
    });

    expect(arePrerequisitesMet(subject, progress)).toBe(false);
  });
});

describe('getSubjectsByYearAndSemester', () => {
  it('returns empty map for empty subjects array', () => {
    const result = getSubjectsByYearAndSemester([]);
    expect(result.size).toBe(0);
  });

  it('groups subjects by year and semester', () => {
    const subjects = [
      makeSubject({ id: 's1', year: 1, semester: 1 }),
      makeSubject({ id: 's2', year: 1, semester: 1 }),
      makeSubject({ id: 's3', year: 1, semester: 2 }),
      makeSubject({ id: 's4', year: 2, semester: 1 }),
    ];

    const result = getSubjectsByYearAndSemester(subjects);

    expect(result.size).toBe(2); // 2 years
    expect(result.get(1)?.size).toBe(2); // Year 1 has 2 semesters
    expect(result.get(2)?.size).toBe(1); // Year 2 has 1 semester
    expect(result.get(1)?.get(1)?.length).toBe(2); // Year 1, Semester 1 has 2 subjects
    expect(result.get(1)?.get(2)?.length).toBe(1); // Year 1, Semester 2 has 1 subject
  });

  it('handles single subject', () => {
    const subjects = [makeSubject({ id: 's1', year: 3, semester: 2 })];

    const result = getSubjectsByYearAndSemester(subjects);

    expect(result.size).toBe(1);
    expect(result.get(3)?.get(2)?.length).toBe(1);
    expect(result.get(3)?.get(2)?.[0].id).toBe('s1');
  });
});

describe('getDependentSubjects', () => {
  it('returns empty array when no subjects depend on the given subject', () => {
    const subjects = [
      makeSubject({ id: 's1' }),
      makeSubject({ id: 's2' }),
    ];

    const dependents = getDependentSubjects('s1', subjects);
    expect(dependents).toEqual([]);
  });

  it('returns subjects that have the given subject as a prerequisite', () => {
    const subjects = [
      makeSubject({ id: 's1' }),
      makeSubject({ id: 's2', prerequisites: ['s1'] }),
      makeSubject({ id: 's3', prerequisites: ['s1'] }),
    ];

    const dependents = getDependentSubjects('s1', subjects);
    expect(dependents.map(s => s.id).sort()).toEqual(['s2', 's3']);
  });

  it('does not return subjects with the given subject not in prerequisites', () => {
    const subjects = [
      makeSubject({ id: 's1' }),
      makeSubject({ id: 's2', prerequisites: ['s1'] }),
      makeSubject({ id: 's3', prerequisites: ['other'] }),
    ];

    const dependents = getDependentSubjects('s1', subjects);
    expect(dependents.map(s => s.id)).toEqual(['s2']);
  });

  it('handles subjects with multiple prerequisites including the given subject', () => {
    const subjects = [
      makeSubject({ id: 's1' }),
      makeSubject({ id: 's2' }),
      makeSubject({ id: 's3', prerequisites: ['s1', 's2', 's4'] }),
    ];

    const dependents = getDependentSubjects('s1', subjects);
    expect(dependents.map(s => s.id)).toEqual(['s3']);
  });
});

describe('getPrerequisiteSubjects', () => {
  it('returns empty array for subjects with no prerequisites', () => {
    const subject = makeSubject({ id: 's1', prerequisites: [] });
    const subjects = [subject];

    const prereqs = getPrerequisiteSubjects(subject, subjects);
    expect(prereqs).toEqual([]);
  });

  it('returns empty array for subjects with undefined prerequisites', () => {
    const subject = makeSubject({ id: 's1' });
    subject.prerequisites = undefined as unknown as string[];
    const subjects = [subject];

    const prereqs = getPrerequisiteSubjects(subject, subjects);
    expect(prereqs).toEqual([]);
  });

  it('returns prerequisite subjects', () => {
    const s1 = makeSubject({ id: 's1' });
    const s2 = makeSubject({ id: 's2' });
    const s3 = makeSubject({ id: 's3', prerequisites: ['s1', 's2'] });
    const subjects = [s1, s2, s3];

    const prereqs = getPrerequisiteSubjects(s3, subjects);
    expect(prereqs.map(s => s.id).sort()).toEqual(['s1', 's2']);
  });

  it('filters out non-existent prerequisite IDs', () => {
    const s1 = makeSubject({ id: 's1' });
    const s2 = makeSubject({ id: 's2', prerequisites: ['s1', 'nonexistent'] });
    const subjects = [s1, s2];

    const prereqs = getPrerequisiteSubjects(s2, subjects);
    expect(prereqs.map(s => s.id)).toEqual(['s1']);
  });
});
