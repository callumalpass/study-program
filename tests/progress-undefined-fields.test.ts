/**
 * Progress Module - Undefined Fields Edge Case Tests
 *
 * Tests that progress calculation functions handle undefined or missing
 * fields in SubjectProgress gracefully, preventing runtime errors.
 *
 * These tests cover scenarios where:
 * - quizAttempts is undefined
 * - exerciseCompletions is undefined
 * - projectSubmissions is undefined
 * - examAttempts is undefined
 *
 * This can happen with:
 * - Corrupted localStorage data
 * - Incomplete data migration
 * - Manual data manipulation
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Subject, SubjectProgress, UserProgress } from '../src/core/types';
import {
  calculateSubjectCompletion,
  getSubjectProgressDetails,
  isQuizCompleted,
  getQuizBestScore,
  isExerciseCompleted,
} from '../src/core/progress';

// Mock the storage module since getSubjectProgressDetails uses it
vi.mock('../src/core/storage', () => ({
  progressStorage: {
    getSubjectProgress: vi.fn(),
    getProgress: vi.fn(),
    updateSubjectProgress: vi.fn(),
  },
}));

import { progressStorage } from '../src/core/storage';

// Helper to create a minimal subject for testing
function createSubject(overrides: Partial<Subject> = {}): Subject {
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
    learningObjectives: [],
    topics: [
      {
        id: 'test-topic-1',
        title: 'Topic 1',
        content: 'Topic content',
        quizIds: ['quiz-1', 'quiz-2'],
        exerciseIds: ['ex-1', 'ex-2'],
      },
    ],
    examIds: ['exam-1'],
    projectIds: ['proj-1'],
    ...overrides,
  };
}

// Helper to create a progress object with specific fields missing
function createProgressWithMissingFields(
  options: {
    includeQuizAttempts?: boolean;
    includeExerciseCompletions?: boolean;
    includeProjectSubmissions?: boolean;
    includeExamAttempts?: boolean;
  } = {}
): SubjectProgress {
  const progress: Partial<SubjectProgress> = {
    status: 'in_progress',
  };

  if (options.includeQuizAttempts) {
    progress.quizAttempts = {
      'quiz-1': [{
        attemptId: 'a1',
        timestamp: new Date().toISOString(),
        answers: {},
        score: 85,
        timeSpentSeconds: 60,
      }],
    };
  }

  if (options.includeExerciseCompletions) {
    progress.exerciseCompletions = {
      'ex-1': {
        completionId: 'c1',
        timestamp: new Date().toISOString(),
        code: 'code',
        passed: true,
        timeSpentSeconds: 120,
      },
    };
  }

  if (options.includeProjectSubmissions) {
    progress.projectSubmissions = {
      'proj-1': [{
        submissionId: 's1',
        timestamp: new Date().toISOString(),
        description: 'submission',
        selfAssessment: {},
        notes: '',
      }],
    };
  }

  if (options.includeExamAttempts) {
    progress.examAttempts = {
      'exam-1': [{
        attemptId: 'e1',
        timestamp: new Date().toISOString(),
        answers: {},
        score: 90,
        timeSpentSeconds: 3600,
      }],
    };
  }

  return progress as SubjectProgress;
}

describe('Progress Module - Undefined Fields Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('calculateSubjectCompletion', () => {
    it('handles progress with undefined quizAttempts', () => {
      const subject = createSubject();
      const progress = createProgressWithMissingFields({
        includeExerciseCompletions: true,
        includeProjectSubmissions: true,
        includeExamAttempts: true,
      });

      // Should not throw
      expect(() => calculateSubjectCompletion(subject, progress)).not.toThrow();

      const completion = calculateSubjectCompletion(subject, progress);
      expect(typeof completion).toBe('number');
      expect(completion).toBeGreaterThanOrEqual(0);
      expect(completion).toBeLessThanOrEqual(100);
    });

    it('handles progress with undefined exerciseCompletions', () => {
      const subject = createSubject();
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
        includeProjectSubmissions: true,
        includeExamAttempts: true,
      });

      expect(() => calculateSubjectCompletion(subject, progress)).not.toThrow();

      const completion = calculateSubjectCompletion(subject, progress);
      expect(typeof completion).toBe('number');
    });

    it('handles progress with undefined projectSubmissions', () => {
      const subject = createSubject();
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
        includeExerciseCompletions: true,
        includeExamAttempts: true,
      });

      expect(() => calculateSubjectCompletion(subject, progress)).not.toThrow();

      const completion = calculateSubjectCompletion(subject, progress);
      expect(typeof completion).toBe('number');
    });

    it('handles progress with undefined examAttempts', () => {
      const subject = createSubject();
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
        includeExerciseCompletions: true,
        includeProjectSubmissions: true,
      });

      expect(() => calculateSubjectCompletion(subject, progress)).not.toThrow();

      const completion = calculateSubjectCompletion(subject, progress);
      expect(typeof completion).toBe('number');
    });

    it('handles progress with all fields undefined', () => {
      const subject = createSubject();
      const progress = createProgressWithMissingFields({});

      expect(() => calculateSubjectCompletion(subject, progress)).not.toThrow();

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('calculates correctly when some fields present and others missing', () => {
      const subject = createSubject({
        topics: [
          {
            id: 'topic-1',
            title: 'Topic 1',
            content: '',
            quizIds: ['quiz-1'],
            exerciseIds: ['ex-1'],
          },
        ],
        examIds: [],
        projectIds: [],
      });

      // Only quiz attempts present, with a passing score
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
      });

      const completion = calculateSubjectCompletion(subject, progress);
      // 1 quiz passed out of 2 items (1 quiz + 1 exercise)
      expect(completion).toBe(50);
    });
  });

  describe('getSubjectProgressDetails', () => {
    it('handles undefined progress from storage', () => {
      const subject = createSubject();
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(undefined);

      expect(() => getSubjectProgressDetails(subject)).not.toThrow();

      const details = getSubjectProgressDetails(subject);
      expect(details.status).toBe('not_started');
      expect(details.quizzesCompleted).toBe(0);
      expect(details.exercisesCompleted).toBe(0);
    });

    it('handles progress with undefined quizAttempts', () => {
      const subject = createSubject();
      const progress = createProgressWithMissingFields({
        includeExerciseCompletions: true,
      });
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);

      expect(() => getSubjectProgressDetails(subject)).not.toThrow();

      const details = getSubjectProgressDetails(subject);
      expect(details.quizzesCompleted).toBe(0);
      expect(details.exercisesCompleted).toBe(1);
    });

    it('handles progress with undefined exerciseCompletions', () => {
      const subject = createSubject();
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
      });
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);

      expect(() => getSubjectProgressDetails(subject)).not.toThrow();

      const details = getSubjectProgressDetails(subject);
      expect(details.quizzesCompleted).toBe(1);
      expect(details.exercisesCompleted).toBe(0);
    });

    it('handles progress with undefined projectSubmissions', () => {
      const subject = createSubject();
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
        includeExerciseCompletions: true,
        includeExamAttempts: true,
      });
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);

      expect(() => getSubjectProgressDetails(subject)).not.toThrow();

      const details = getSubjectProgressDetails(subject);
      expect(details.projectsCompleted).toBe(0);
    });

    it('handles progress with undefined examAttempts', () => {
      const subject = createSubject();
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
        includeExerciseCompletions: true,
        includeProjectSubmissions: true,
      });
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);

      expect(() => getSubjectProgressDetails(subject)).not.toThrow();

      const details = getSubjectProgressDetails(subject);
      expect(details.examsCompleted).toBe(0);
    });
  });

  describe('isQuizCompleted', () => {
    it('returns false for undefined progress', () => {
      expect(isQuizCompleted('quiz-1', undefined)).toBe(false);
    });

    it('returns false for progress with undefined quizAttempts', () => {
      const progress = createProgressWithMissingFields({});

      expect(() => isQuizCompleted('quiz-1', progress)).not.toThrow();
      expect(isQuizCompleted('quiz-1', progress)).toBe(false);
    });

    it('returns false for non-existent quiz in valid quizAttempts', () => {
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
      });

      expect(isQuizCompleted('non-existent-quiz', progress)).toBe(false);
    });

    it('returns true for completed quiz', () => {
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
      });

      expect(isQuizCompleted('quiz-1', progress)).toBe(true);
    });
  });

  describe('getQuizBestScore', () => {
    it('returns null for undefined progress', () => {
      expect(getQuizBestScore('quiz-1', undefined)).toBeNull();
    });

    it('returns null for progress with undefined quizAttempts', () => {
      const progress = createProgressWithMissingFields({});

      expect(() => getQuizBestScore('quiz-1', progress)).not.toThrow();
      expect(getQuizBestScore('quiz-1', progress)).toBeNull();
    });

    it('returns null for non-existent quiz', () => {
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
      });

      expect(getQuizBestScore('non-existent-quiz', progress)).toBeNull();
    });

    it('returns score for existing quiz', () => {
      const progress = createProgressWithMissingFields({
        includeQuizAttempts: true,
      });

      expect(getQuizBestScore('quiz-1', progress)).toBe(85);
    });
  });

  describe('isExerciseCompleted', () => {
    it('returns false for undefined progress', () => {
      expect(isExerciseCompleted('ex-1', undefined)).toBe(false);
    });

    it('returns false for progress with undefined exerciseCompletions', () => {
      const progress = createProgressWithMissingFields({});

      expect(() => isExerciseCompleted('ex-1', progress)).not.toThrow();
      expect(isExerciseCompleted('ex-1', progress)).toBe(false);
    });

    it('returns false for non-existent exercise', () => {
      const progress = createProgressWithMissingFields({
        includeExerciseCompletions: true,
      });

      expect(isExerciseCompleted('non-existent-ex', progress)).toBe(false);
    });

    it('returns true for completed exercise', () => {
      const progress = createProgressWithMissingFields({
        includeExerciseCompletions: true,
      });

      expect(isExerciseCompleted('ex-1', progress)).toBe(true);
    });
  });
});
