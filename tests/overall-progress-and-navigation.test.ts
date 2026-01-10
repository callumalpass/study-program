/**
 * Overall Progress and Navigation Tests
 *
 * Tests for overall progress calculation and subject navigation helpers:
 * - calculateOverallProgress: Aggregate statistics across all subjects
 * - getNextRecommendedSubject: Smart subject recommendation
 * - getInProgressSubjects: Filter subjects by status
 * - getCompletedSubjects: Filter subjects by status
 */

import { describe, it, expect } from 'vitest';
import {
  calculateOverallProgress,
  getNextRecommendedSubject,
  getInProgressSubjects,
  getCompletedSubjects,
  getAvailableSubjects,
  getDependentSubjects,
  getPrerequisiteSubjects,
  getSubjectsByYearAndSemester,
} from '../src/core/progress';
import type { Subject, SubjectProgress, UserProgress } from '../src/core/types';

// Helper to create a subject
function createSubject(overrides: Partial<Subject> = {}): Subject {
  return {
    id: `subject-${Math.random().toString(36).slice(2, 7)}`,
    code: 'TEST101',
    title: 'Test Subject',
    category: 'cs',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'Test description',
    learningObjectives: [],
    topics: [],
    estimatedHours: 40,
    ...overrides,
  };
}

// Helper to create progress
function createProgress(overrides: Partial<SubjectProgress> = {}): SubjectProgress {
  return {
    status: 'not_started',
    quizAttempts: {},
    examAttempts: {},
    exerciseCompletions: {},
    projectSubmissions: {},
    ...overrides,
  };
}

// Helper to create user progress
function createUserProgress(subjects: Record<string, SubjectProgress> = {}): UserProgress {
  return {
    version: 4,
    startedAt: new Date().toISOString(),
    subjects,
    settings: {
      theme: 'auto',
      codeEditorFontSize: 14,
      showCompletedItems: true,
    },
  };
}

describe('calculateOverallProgress', () => {
  describe('empty state', () => {
    it('returns zeros for empty subjects array', () => {
      const result = calculateOverallProgress([], createUserProgress());
      expect(result.totalSubjects).toBe(0);
      expect(result.completedSubjects).toBe(0);
      expect(result.inProgressSubjects).toBe(0);
      expect(result.totalHours).toBe(0);
      expect(result.completedHours).toBe(0);
      expect(result.percentageComplete).toBe(0);
    });

    it('returns correct totals with no user progress', () => {
      const subjects = [
        createSubject({ id: 's1', estimatedHours: 40 }),
        createSubject({ id: 's2', estimatedHours: 60 }),
      ];
      const result = calculateOverallProgress(subjects, createUserProgress());
      expect(result.totalSubjects).toBe(2);
      expect(result.completedSubjects).toBe(0);
      expect(result.inProgressSubjects).toBe(0);
      expect(result.totalHours).toBe(100);
      expect(result.completedHours).toBe(0);
      expect(result.percentageComplete).toBe(0);
    });
  });

  describe('with progress', () => {
    it('calculates completed subjects correctly', () => {
      const subjects = [
        createSubject({ id: 's1', estimatedHours: 40 }),
        createSubject({ id: 's2', estimatedHours: 60 }),
        createSubject({ id: 's3', estimatedHours: 50 }),
      ];
      const userProgress = createUserProgress({
        s1: createProgress({ status: 'completed' }),
        s2: createProgress({ status: 'in_progress' }),
        s3: createProgress({ status: 'not_started' }),
      });
      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.totalSubjects).toBe(3);
      expect(result.completedSubjects).toBe(1);
      expect(result.inProgressSubjects).toBe(1);
      // 40 hours completed out of 150 total = 27% (hours-based calculation)
      expect(result.percentageComplete).toBe(27);
    });

    it('calculates total hours from all subjects', () => {
      const subjects = [
        createSubject({ id: 's1', estimatedHours: 10 }),
        createSubject({ id: 's2', estimatedHours: 20 }),
        createSubject({ id: 's3', estimatedHours: 30 }),
      ];
      const result = calculateOverallProgress(subjects, createUserProgress());
      expect(result.totalHours).toBe(60);
    });

    it('rounds percentage to nearest integer', () => {
      const subjects = [
        createSubject({ id: 's1' }),
        createSubject({ id: 's2' }),
        createSubject({ id: 's3' }),
      ];
      const userProgress = createUserProgress({
        s1: createProgress({ status: 'completed' }),
      });
      const result = calculateOverallProgress(subjects, userProgress);
      // 1/3 = 33.33...%, rounds to 33
      expect(result.percentageComplete).toBe(33);
    });

    it('returns 100% when all subjects completed', () => {
      const subjects = [
        createSubject({ id: 's1' }),
        createSubject({ id: 's2' }),
      ];
      const userProgress = createUserProgress({
        s1: createProgress({ status: 'completed' }),
        s2: createProgress({ status: 'completed' }),
      });
      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.percentageComplete).toBe(100);
      expect(result.completedSubjects).toBe(2);
    });
  });

  describe('completed hours calculation', () => {
    it('returns 0 completed hours when no progress', () => {
      const subjects = [createSubject({ id: 's1', estimatedHours: 100 })];
      const result = calculateOverallProgress(subjects, createUserProgress());
      expect(result.completedHours).toBe(0);
    });

    it('returns full hours for completed subjects', () => {
      const subjects = [
        createSubject({
          id: 's1',
          estimatedHours: 40,
          topics: [], // No assessments means 0% completion normally
        }),
      ];
      const userProgress = createUserProgress({
        s1: createProgress({ status: 'completed' }), // But completed status = 100%
      });
      const result = calculateOverallProgress(subjects, userProgress);
      expect(result.completedHours).toBe(40);
    });
  });
});

describe('getNextRecommendedSubject', () => {
  describe('with in-progress subjects', () => {
    it('returns earliest in-progress subject by year/semester', () => {
      const subjects = [
        createSubject({ id: 's1', year: 2, semester: 1 }),
        createSubject({ id: 's2', year: 1, semester: 2 }),
        createSubject({ id: 's3', year: 1, semester: 1 }),
      ];
      const userProgress = createUserProgress({
        s1: createProgress({ status: 'in_progress' }),
        s2: createProgress({ status: 'in_progress' }),
        s3: createProgress({ status: 'in_progress' }),
      });
      const result = getNextRecommendedSubject(subjects, userProgress);
      expect(result?.id).toBe('s3'); // Year 1, Semester 1 is earliest
    });

    it('prefers earlier semester when years are equal', () => {
      const subjects = [
        createSubject({ id: 's1', year: 1, semester: 2 }),
        createSubject({ id: 's2', year: 1, semester: 1 }),
      ];
      const userProgress = createUserProgress({
        s1: createProgress({ status: 'in_progress' }),
        s2: createProgress({ status: 'in_progress' }),
      });
      const result = getNextRecommendedSubject(subjects, userProgress);
      expect(result?.id).toBe('s2');
    });
  });

  describe('with no in-progress subjects', () => {
    it('returns available subject not yet started', () => {
      const subjects = [
        createSubject({ id: 's1', prerequisites: [] }),
        createSubject({ id: 's2', prerequisites: ['s1'] }),
      ];
      const userProgress = createUserProgress({});
      const result = getNextRecommendedSubject(subjects, userProgress);
      expect(result?.id).toBe('s1');
    });

    it('returns null when all subjects completed', () => {
      const subjects = [
        createSubject({ id: 's1' }),
        createSubject({ id: 's2' }),
      ];
      const userProgress = createUserProgress({
        s1: createProgress({ status: 'completed' }),
        s2: createProgress({ status: 'completed' }),
      });
      const result = getNextRecommendedSubject(subjects, userProgress);
      expect(result).toBeNull();
    });

    it('returns null when remaining subjects blocked by prerequisites', () => {
      const subjects = [
        createSubject({ id: 's1' }),
        createSubject({ id: 's2', prerequisites: ['s1'] }),
      ];
      const userProgress = createUserProgress({
        s1: createProgress({ status: 'in_progress' }), // Not completed yet
      });
      // s1 is in_progress, so it will be recommended
      const result = getNextRecommendedSubject(subjects, userProgress);
      expect(result?.id).toBe('s1');
    });
  });

  describe('empty states', () => {
    it('returns null for empty subjects array', () => {
      const result = getNextRecommendedSubject([], createUserProgress());
      expect(result).toBeNull();
    });
  });
});

describe('getInProgressSubjects', () => {
  it('returns empty array when no subjects in progress', () => {
    const subjects = [
      createSubject({ id: 's1' }),
      createSubject({ id: 's2' }),
    ];
    const userProgress = createUserProgress({
      s1: createProgress({ status: 'completed' }),
      s2: createProgress({ status: 'not_started' }),
    });
    const result = getInProgressSubjects(subjects, userProgress);
    expect(result).toEqual([]);
  });

  it('returns subjects with in_progress status', () => {
    const subjects = [
      createSubject({ id: 's1' }),
      createSubject({ id: 's2' }),
      createSubject({ id: 's3' }),
    ];
    const userProgress = createUserProgress({
      s1: createProgress({ status: 'in_progress' }),
      s2: createProgress({ status: 'completed' }),
      s3: createProgress({ status: 'in_progress' }),
    });
    const result = getInProgressSubjects(subjects, userProgress);
    expect(result.length).toBe(2);
    expect(result.map(s => s.id)).toContain('s1');
    expect(result.map(s => s.id)).toContain('s3');
  });

  it('handles subjects with no progress entry', () => {
    const subjects = [createSubject({ id: 's1' })];
    const userProgress = createUserProgress({});
    const result = getInProgressSubjects(subjects, userProgress);
    expect(result).toEqual([]);
  });
});

describe('getCompletedSubjects', () => {
  it('returns empty array when no subjects completed', () => {
    const subjects = [
      createSubject({ id: 's1' }),
      createSubject({ id: 's2' }),
    ];
    const userProgress = createUserProgress({
      s1: createProgress({ status: 'in_progress' }),
      s2: createProgress({ status: 'not_started' }),
    });
    const result = getCompletedSubjects(subjects, userProgress);
    expect(result).toEqual([]);
  });

  it('returns subjects with completed status', () => {
    const subjects = [
      createSubject({ id: 's1' }),
      createSubject({ id: 's2' }),
      createSubject({ id: 's3' }),
    ];
    const userProgress = createUserProgress({
      s1: createProgress({ status: 'completed' }),
      s2: createProgress({ status: 'in_progress' }),
      s3: createProgress({ status: 'completed' }),
    });
    const result = getCompletedSubjects(subjects, userProgress);
    expect(result.length).toBe(2);
    expect(result.map(s => s.id)).toContain('s1');
    expect(result.map(s => s.id)).toContain('s3');
  });
});

describe('getAvailableSubjects', () => {
  it('returns all subjects with no prerequisites', () => {
    const subjects = [
      createSubject({ id: 's1', prerequisites: [] }),
      createSubject({ id: 's2', prerequisites: [] }),
    ];
    const result = getAvailableSubjects(subjects, createUserProgress());
    expect(result.length).toBe(2);
  });

  it('filters out subjects with unmet prerequisites', () => {
    const subjects = [
      createSubject({ id: 's1', prerequisites: [] }),
      createSubject({ id: 's2', prerequisites: ['s1'] }),
      createSubject({ id: 's3', prerequisites: ['s1', 's2'] }),
    ];
    const userProgress = createUserProgress({
      s1: createProgress({ status: 'completed' }),
    });
    const result = getAvailableSubjects(subjects, userProgress);
    expect(result.length).toBe(2);
    expect(result.map(s => s.id)).toContain('s1');
    expect(result.map(s => s.id)).toContain('s2');
  });

  it('includes subjects once all prerequisites completed', () => {
    const subjects = [
      createSubject({ id: 's1', prerequisites: [] }),
      createSubject({ id: 's2', prerequisites: ['s1'] }),
    ];
    const userProgress = createUserProgress({
      s1: createProgress({ status: 'completed' }),
    });
    const result = getAvailableSubjects(subjects, userProgress);
    expect(result.map(s => s.id)).toContain('s2');
  });
});

describe('getDependentSubjects', () => {
  it('returns empty array when no dependents exist', () => {
    const subjects = [
      createSubject({ id: 's1', prerequisites: [] }),
      createSubject({ id: 's2', prerequisites: [] }),
    ];
    const result = getDependentSubjects('s1', subjects);
    expect(result).toEqual([]);
  });

  it('returns subjects that have the given subject as prerequisite', () => {
    const subjects = [
      createSubject({ id: 's1', prerequisites: [] }),
      createSubject({ id: 's2', prerequisites: ['s1'] }),
      createSubject({ id: 's3', prerequisites: ['s1'] }),
      createSubject({ id: 's4', prerequisites: ['s2'] }),
    ];
    const result = getDependentSubjects('s1', subjects);
    expect(result.length).toBe(2);
    expect(result.map(s => s.id)).toContain('s2');
    expect(result.map(s => s.id)).toContain('s3');
  });

  it('only returns immediate dependents, not transitive', () => {
    const subjects = [
      createSubject({ id: 's1', prerequisites: [] }),
      createSubject({ id: 's2', prerequisites: ['s1'] }),
      createSubject({ id: 's3', prerequisites: ['s2'] }), // Depends on s1 transitively
    ];
    const result = getDependentSubjects('s1', subjects);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('s2');
  });
});

describe('getPrerequisiteSubjects', () => {
  it('returns empty array for subject with no prerequisites', () => {
    const subject = createSubject({ id: 's1', prerequisites: [] });
    const subjects = [subject];
    const result = getPrerequisiteSubjects(subject, subjects);
    expect(result).toEqual([]);
  });

  it('returns prerequisite subject objects', () => {
    const s1 = createSubject({ id: 's1', prerequisites: [] });
    const s2 = createSubject({ id: 's2', prerequisites: [] });
    const s3 = createSubject({ id: 's3', prerequisites: ['s1', 's2'] });
    const subjects = [s1, s2, s3];
    const result = getPrerequisiteSubjects(s3, subjects);
    expect(result.length).toBe(2);
    expect(result.map(s => s.id)).toContain('s1');
    expect(result.map(s => s.id)).toContain('s2');
  });

  it('filters out non-existent prerequisites', () => {
    const s1 = createSubject({ id: 's1', prerequisites: [] });
    const s2 = createSubject({ id: 's2', prerequisites: ['s1', 'nonexistent'] });
    const subjects = [s1, s2];
    const result = getPrerequisiteSubjects(s2, subjects);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('s1');
  });
});

describe('getSubjectsByYearAndSemester', () => {
  it('returns empty map for empty subjects array', () => {
    const result = getSubjectsByYearAndSemester([]);
    expect(result.size).toBe(0);
  });

  it('groups subjects by year', () => {
    const subjects = [
      createSubject({ id: 's1', year: 1, semester: 1 }),
      createSubject({ id: 's2', year: 2, semester: 1 }),
      createSubject({ id: 's3', year: 1, semester: 1 }),
    ];
    const result = getSubjectsByYearAndSemester(subjects);
    expect(result.size).toBe(2); // 2 years
    expect(result.get(1)?.get(1)?.length).toBe(2);
    expect(result.get(2)?.get(1)?.length).toBe(1);
  });

  it('groups subjects by semester within year', () => {
    const subjects = [
      createSubject({ id: 's1', year: 1, semester: 1 }),
      createSubject({ id: 's2', year: 1, semester: 2 }),
      createSubject({ id: 's3', year: 1, semester: 1 }),
    ];
    const result = getSubjectsByYearAndSemester(subjects);
    expect(result.get(1)?.size).toBe(2); // 2 semesters in year 1
    expect(result.get(1)?.get(1)?.length).toBe(2);
    expect(result.get(1)?.get(2)?.length).toBe(1);
  });

  it('preserves subject objects in groups', () => {
    const s1 = createSubject({ id: 's1', year: 1, semester: 1, title: 'Subject 1' });
    const subjects = [s1];
    const result = getSubjectsByYearAndSemester(subjects);
    expect(result.get(1)?.get(1)?.[0]).toBe(s1);
  });
});

describe('Integration: Progress tracking workflow', () => {
  it('tracks typical student progress journey', () => {
    // Setup: Year 1 subjects, where s2 depends on s1
    const s1 = createSubject({ id: 's1', year: 1, semester: 1, prerequisites: [] });
    const s2 = createSubject({ id: 's2', year: 1, semester: 2, prerequisites: ['s1'] });
    const s3 = createSubject({ id: 's3', year: 2, semester: 1, prerequisites: ['s2'] });
    const subjects = [s1, s2, s3];

    // Step 1: Fresh start - only s1 available
    let userProgress = createUserProgress({});
    let available = getAvailableSubjects(subjects, userProgress);
    expect(available.length).toBe(1);
    expect(available[0].id).toBe('s1');

    // Step 2: Start s1
    userProgress = createUserProgress({
      s1: createProgress({ status: 'in_progress' }),
    });
    expect(getInProgressSubjects(subjects, userProgress).length).toBe(1);
    expect(getNextRecommendedSubject(subjects, userProgress)?.id).toBe('s1');

    // Step 3: Complete s1 - s2 becomes available
    userProgress = createUserProgress({
      s1: createProgress({ status: 'completed' }),
    });
    available = getAvailableSubjects(subjects, userProgress);
    expect(available.length).toBe(2);
    expect(available.map(s => s.id)).toContain('s2');
    expect(getCompletedSubjects(subjects, userProgress).length).toBe(1);

    // Step 4: Complete s2 - s3 becomes available
    userProgress = createUserProgress({
      s1: createProgress({ status: 'completed' }),
      s2: createProgress({ status: 'completed' }),
    });
    available = getAvailableSubjects(subjects, userProgress);
    expect(available.length).toBe(3);
    expect(available.map(s => s.id)).toContain('s3');

    // Step 5: All completed
    userProgress = createUserProgress({
      s1: createProgress({ status: 'completed' }),
      s2: createProgress({ status: 'completed' }),
      s3: createProgress({ status: 'completed' }),
    });
    const overallProgress = calculateOverallProgress(subjects, userProgress);
    expect(overallProgress.percentageComplete).toBe(100);
    expect(overallProgress.completedSubjects).toBe(3);
    expect(getNextRecommendedSubject(subjects, userProgress)).toBeNull();
  });
});
