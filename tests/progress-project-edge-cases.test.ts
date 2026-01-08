/**
 * Progress Project Edge Cases Tests
 *
 * Tests for edge cases in project completion calculation,
 * particularly around AI evaluation scoring scenarios.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calculateSubjectCompletion,
  getSubjectProgressDetails,
} from '../src/core/progress';
import { progressStorage } from '../src/core/storage';
import type { Subject, SubjectProgress, ProjectSubmission } from '../src/core/types';

// Mock storage module
vi.mock('../src/core/storage', () => ({
  progressStorage: {
    getSubjectProgress: vi.fn(),
    updateSubjectProgress: vi.fn(),
    getProgress: vi.fn(() => ({ subjects: {} })),
  },
}));

describe('project completion edge cases', () => {
  const createMockSubject = (overrides: Partial<Subject> = {}): Subject => ({
    id: 'test-subject',
    title: 'Test Subject',
    description: 'A test subject',
    year: 1,
    semester: 1,
    estimatedHours: 40,
    prerequisites: [],
    topics: [],
    projectIds: ['proj-1'],
    examIds: [],
    ...overrides,
  });

  const createMockProgress = (overrides: Partial<SubjectProgress> = {}): SubjectProgress => ({
    status: 'in_progress',
    quizAttempts: {},
    exerciseCompletions: {},
    examAttempts: {},
    projectSubmissions: {},
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('calculateSubjectCompletion with projects', () => {
    it('counts project as complete when submission has no AI evaluation', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [{ name: 'main.py', content: 'print("hello")' }],
          }],
        },
      });

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('counts project as complete when AI evaluation passes', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [{ name: 'main.py', content: 'print("hello")' }],
            aiEvaluation: {
              score: 85,
              feedback: 'Good work',
              rubricScores: {},
              strengths: [],
              improvements: [],
            },
          }],
        },
      });

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('does not count project as complete when AI evaluation fails', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [{ name: 'main.py', content: 'print("hello")' }],
            aiEvaluation: {
              score: 50,
              feedback: 'Needs improvement',
              rubricScores: {},
              strengths: [],
              improvements: [],
            },
          }],
        },
      });

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('uses best submission when multiple submissions exist', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [
            {
              timestamp: '2024-01-01',
              files: [],
              aiEvaluation: {
                score: 50,
                feedback: 'First try',
                rubricScores: {},
                strengths: [],
                improvements: [],
              },
            },
            {
              timestamp: '2024-01-02',
              files: [],
              aiEvaluation: {
                score: 85,
                feedback: 'Better',
                rubricScores: {},
                strengths: [],
                improvements: [],
              },
            },
            {
              timestamp: '2024-01-03',
              files: [],
              aiEvaluation: {
                score: 65,
                feedback: 'Regression',
                rubricScores: {},
                strengths: [],
                improvements: [],
              },
            },
          ],
        },
      });

      // Best score is 85, which passes
      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('handles empty project submissions array', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [],
        },
      });

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles missing projectSubmissions key', () => {
      const subject = createMockSubject();
      const progress = createMockProgress();
      // projectSubmissions exists but proj-1 key is missing

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles multiple projects with mixed completion states', () => {
      const subject = createMockSubject({
        projectIds: ['proj-1', 'proj-2', 'proj-3'],
      });
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [],
            aiEvaluation: { score: 90, feedback: '', rubricScores: {}, strengths: [], improvements: [] },
          }],
          'proj-2': [{
            timestamp: '2024-01-01',
            files: [],
            // No AI evaluation - counts as complete
          }],
          // proj-3 has no submissions
        },
      });

      // 2 out of 3 projects complete = 67%
      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(67);
    });

    it('handles project with undefined aiEvaluation score', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [],
            aiEvaluation: {
              score: undefined as unknown as number,
              feedback: '',
              rubricScores: {},
              strengths: [],
              improvements: [],
            },
          }],
        },
      });

      // Undefined score treated as 0, which fails
      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles project with zero AI evaluation score', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [],
            aiEvaluation: {
              score: 0,
              feedback: 'Not submitted properly',
              rubricScores: {},
              strengths: [],
              improvements: [],
            },
          }],
        },
      });

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles project with exactly passing score (70)', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [],
            aiEvaluation: {
              score: 70,
              feedback: 'Just passing',
              rubricScores: {},
              strengths: [],
              improvements: [],
            },
          }],
        },
      });

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('handles project with score just below passing (69)', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [],
            aiEvaluation: {
              score: 69,
              feedback: 'Almost passing',
              rubricScores: {},
              strengths: [],
              improvements: [],
            },
          }],
        },
      });

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });
  });

  describe('getSubjectProgressDetails with projects', () => {
    it('returns correct project counts for completed projects', () => {
      const subject = createMockSubject({
        projectIds: ['proj-1', 'proj-2'],
      });

      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue({
        status: 'in_progress',
        quizAttempts: {},
        exerciseCompletions: {},
        examAttempts: {},
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [],
            aiEvaluation: { score: 85, feedback: '', rubricScores: {}, strengths: [], improvements: [] },
          }],
        },
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.totalProjects).toBe(2);
      expect(details.projectsCompleted).toBe(1);
    });

    it('counts submission without AI eval as complete', () => {
      const subject = createMockSubject();

      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue({
        status: 'in_progress',
        quizAttempts: {},
        exerciseCompletions: {},
        examAttempts: {},
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [{ name: 'test.py', content: 'pass' }],
          }],
        },
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.projectsCompleted).toBe(1);
    });

    it('does not count failing AI eval as complete', () => {
      const subject = createMockSubject();

      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue({
        status: 'in_progress',
        quizAttempts: {},
        exerciseCompletions: {},
        examAttempts: {},
        projectSubmissions: {
          'proj-1': [{
            timestamp: '2024-01-01',
            files: [],
            aiEvaluation: { score: 40, feedback: 'Failed', rubricScores: {}, strengths: [], improvements: [] },
          }],
        },
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.projectsCompleted).toBe(0);
    });

    it('handles subject with no projects', () => {
      const subject = createMockSubject({
        projectIds: undefined,
      });

      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue({
        status: 'in_progress',
        quizAttempts: {},
        exerciseCompletions: {},
        examAttempts: {},
        projectSubmissions: {},
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.totalProjects).toBe(0);
      expect(details.projectsCompleted).toBe(0);
    });

    it('handles subject with empty projectIds array', () => {
      const subject = createMockSubject({
        projectIds: [],
      });

      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue({
        status: 'in_progress',
        quizAttempts: {},
        exerciseCompletions: {},
        examAttempts: {},
        projectSubmissions: {},
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.totalProjects).toBe(0);
      expect(details.projectsCompleted).toBe(0);
    });
  });

  describe('best project submission selection', () => {
    it('selects submission with highest AI score', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [
            {
              timestamp: '2024-01-01',
              files: [],
              aiEvaluation: { score: 60, feedback: '', rubricScores: {}, strengths: [], improvements: [] },
            },
            {
              timestamp: '2024-01-02',
              files: [],
              aiEvaluation: { score: 80, feedback: '', rubricScores: {}, strengths: [], improvements: [] },
            },
            {
              timestamp: '2024-01-03',
              files: [],
              aiEvaluation: { score: 70, feedback: '', rubricScores: {}, strengths: [], improvements: [] },
            },
          ],
        },
      });

      // Best is 80, which passes
      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(100);
    });

    it('prefers submission without AI eval if all AI scores fail', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [
            {
              timestamp: '2024-01-01',
              files: [],
              aiEvaluation: { score: 50, feedback: '', rubricScores: {}, strengths: [], improvements: [] },
            },
            {
              timestamp: '2024-01-02',
              files: [{ name: 'solution.py', content: 'print("hello")' }],
              // No AI evaluation
            },
          ],
        },
      });

      // The submission without AI eval has score 0 (treated as such in comparison)
      // but submission without aiEvaluation is counted as complete regardless
      // getBestProjectSubmission returns the one with higher score (50 > 0)
      // Since that has failing score, project is not complete
      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });

    it('handles all submissions having zero scores', () => {
      const subject = createMockSubject();
      const progress = createMockProgress({
        projectSubmissions: {
          'proj-1': [
            {
              timestamp: '2024-01-01',
              files: [],
              aiEvaluation: { score: 0, feedback: '', rubricScores: {}, strengths: [], improvements: [] },
            },
            {
              timestamp: '2024-01-02',
              files: [],
              aiEvaluation: { score: 0, feedback: '', rubricScores: {}, strengths: [], improvements: [] },
            },
          ],
        },
      });

      const completion = calculateSubjectCompletion(subject, progress);
      expect(completion).toBe(0);
    });
  });
});
