/**
 * Progress Project Submission Comparison Tests
 *
 * Tests for edge cases in comparing project submissions,
 * particularly around mixed scenarios where some submissions
 * have AI evaluations and others don't.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calculateSubjectCompletion,
  isProjectCompleted,
  getProjectBestSubmission,
} from '../src/core/progress';
import type { Subject, SubjectProgress, ProjectSubmission } from '../src/core/types';

// Helper to create a minimal subject for testing
function createSubject(overrides: Partial<Subject> = {}): Subject {
  return {
    id: 'test-subject',
    code: 'TEST101',
    title: 'Test Subject',
    category: 'cs',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'Test description',
    learningObjectives: ['Learn testing'],
    topics: [],
    estimatedHours: 40,
    projectIds: ['proj-1'],
    ...overrides,
  };
}

// Helper to create a project submission
function createProjectSubmission(options: {
  id?: string;
  aiScore?: number;
  hasAiEval?: boolean;
} = {}): ProjectSubmission {
  const { id, aiScore, hasAiEval = aiScore !== undefined } = options;
  return {
    submissionId: id ?? `sub-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString(),
    description: 'Test submission',
    selfAssessment: {},
    notes: '',
    aiEvaluation: hasAiEval
      ? {
          score: aiScore ?? 0,
          feedback: 'Test feedback',
          rubricScores: {},
          strengths: [],
          improvements: [],
        }
      : undefined,
  };
}

// Helper to create subject progress with project submissions
function createProgress(
  projectSubmissions: Record<string, ProjectSubmission[]>
): SubjectProgress {
  return {
    status: 'in_progress',
    quizAttempts: {},
    examAttempts: {},
    exerciseCompletions: {},
    projectSubmissions,
    subtopicViews: {},
  };
}

describe('Project Submission Comparison Edge Cases', () => {
  describe('getBestProjectSubmission internal behavior', () => {
    it('prefers higher AI score over no AI evaluation', () => {
      // When one submission has a passing AI score and another has no AI eval,
      // the one with the passing AI score should be considered "best"
      const sub1 = createProjectSubmission({ id: 'sub1', aiScore: 85 });
      const sub2 = createProjectSubmission({ id: 'sub2', hasAiEval: false });

      const progress = createProgress({
        'proj-1': [sub1, sub2],
      });

      const best = getProjectBestSubmission('proj-1', progress);
      expect(best?.submissionId).toBe('sub1');
    });

    it('treats submission without AI eval as score 0 in comparison', () => {
      // A submission with score 50 should be considered "better" than one without AI eval
      // because 50 > 0 (the effective score for no AI eval)
      const subWithLowScore = createProjectSubmission({ id: 'low', aiScore: 50 });
      const subWithoutAi = createProjectSubmission({ id: 'noai', hasAiEval: false });

      const progress = createProgress({
        'proj-1': [subWithLowScore, subWithoutAi],
      });

      const best = getProjectBestSubmission('proj-1', progress);
      expect(best?.submissionId).toBe('low');
    });

    it('returns first submission when all have no AI evaluation', () => {
      const sub1 = createProjectSubmission({ id: 'first', hasAiEval: false });
      const sub2 = createProjectSubmission({ id: 'second', hasAiEval: false });
      const sub3 = createProjectSubmission({ id: 'third', hasAiEval: false });

      const progress = createProgress({
        'proj-1': [sub1, sub2, sub3],
      });

      const best = getProjectBestSubmission('proj-1', progress);
      expect(best?.submissionId).toBe('first');
    });

    it('returns submission with highest score among equal AI scores', () => {
      const sub1 = createProjectSubmission({ id: 'first', aiScore: 75 });
      const sub2 = createProjectSubmission({ id: 'second', aiScore: 75 });

      const progress = createProgress({
        'proj-1': [sub1, sub2],
      });

      // When scores are equal, reduce returns the first one (best stays as accumulator)
      const best = getProjectBestSubmission('proj-1', progress);
      expect(best?.submissionId).toBe('first');
    });

    it('handles single submission correctly', () => {
      const sub = createProjectSubmission({ id: 'only', aiScore: 80 });

      const progress = createProgress({
        'proj-1': [sub],
      });

      const best = getProjectBestSubmission('proj-1', progress);
      expect(best?.submissionId).toBe('only');
    });
  });

  describe('isProjectCompleted with mixed submissions', () => {
    it('returns true when best submission has passing AI score', () => {
      const subFailing = createProjectSubmission({ aiScore: 50 });
      const subPassing = createProjectSubmission({ aiScore: 80 });
      const subNoAi = createProjectSubmission({ hasAiEval: false });

      const progress = createProgress({
        'proj-1': [subFailing, subPassing, subNoAi],
      });

      // Best is subPassing with score 80, which passes
      expect(isProjectCompleted('proj-1', progress)).toBe(true);
    });

    it('returns false when best submission has failing AI score', () => {
      // If all submissions with AI eval have failing scores,
      // and the "best" is the one with highest score (which still fails),
      // the project should not be considered complete
      const sub1 = createProjectSubmission({ aiScore: 50 });
      const sub2 = createProjectSubmission({ aiScore: 60 });
      const sub3 = createProjectSubmission({ aiScore: 65 }); // Best but still failing

      const progress = createProgress({
        'proj-1': [sub1, sub2, sub3],
      });

      expect(isProjectCompleted('proj-1', progress)).toBe(false);
    });

    it('returns true for submission without AI eval (counts as complete)', () => {
      const subNoAi = createProjectSubmission({ hasAiEval: false });

      const progress = createProgress({
        'proj-1': [subNoAi],
      });

      expect(isProjectCompleted('proj-1', progress)).toBe(true);
    });

    it('returns false when best is failing and there is also a no-AI submission', () => {
      // This tests a subtle case: if we have a failing AI score and a no-AI submission,
      // the failing AI score (50) is considered "better" than no-AI (0 in comparison).
      // Since the best (50) has AI eval but fails, project is incomplete.
      const subFailing = createProjectSubmission({ aiScore: 50 });
      const subNoAi = createProjectSubmission({ hasAiEval: false });

      const progress = createProgress({
        'proj-1': [subFailing, subNoAi],
      });

      expect(isProjectCompleted('proj-1', progress)).toBe(false);
    });
  });

  describe('calculateSubjectCompletion with project edge cases', () => {
    it('correctly counts project with only no-AI submission as complete', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [createProjectSubmission({ hasAiEval: false })],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('correctly counts project with best passing AI score as complete', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [
          createProjectSubmission({ aiScore: 40 }),
          createProjectSubmission({ aiScore: 75 }),
          createProjectSubmission({ aiScore: 60 }),
        ],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('correctly counts project with all failing AI scores as incomplete', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [
          createProjectSubmission({ aiScore: 40 }),
          createProjectSubmission({ aiScore: 55 }),
          createProjectSubmission({ aiScore: 69 }),
        ],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles multiple projects with different completion states', () => {
      const subject = createSubject({
        projectIds: ['proj-1', 'proj-2', 'proj-3', 'proj-4'],
      });

      const progress = createProgress({
        'proj-1': [createProjectSubmission({ aiScore: 85 })], // Complete (passing AI)
        'proj-2': [createProjectSubmission({ hasAiEval: false })], // Complete (no AI)
        'proj-3': [createProjectSubmission({ aiScore: 50 })], // Incomplete (failing AI)
        // proj-4: no submissions at all - incomplete
      });

      // 2 out of 4 complete = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('handles project exactly at passing threshold (70)', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [createProjectSubmission({ aiScore: 70 })],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles project just below passing threshold (69)', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [createProjectSubmission({ aiScore: 69 })],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('empty and edge case scenarios', () => {
    it('returns undefined for non-existent project', () => {
      const progress = createProgress({});
      expect(getProjectBestSubmission('non-existent', progress)).toBeUndefined();
    });

    it('returns undefined for project with empty submissions array', () => {
      const progress = createProgress({
        'proj-1': [],
      });
      expect(getProjectBestSubmission('proj-1', progress)).toBeUndefined();
    });

    it('returns undefined for undefined progress', () => {
      expect(getProjectBestSubmission('proj-1', undefined)).toBeUndefined();
    });

    it('isProjectCompleted returns false for empty submissions', () => {
      const progress = createProgress({
        'proj-1': [],
      });
      expect(isProjectCompleted('proj-1', progress)).toBe(false);
    });

    it('isProjectCompleted returns false for non-existent project', () => {
      const progress = createProgress({});
      expect(isProjectCompleted('non-existent', progress)).toBe(false);
    });

    it('handles submission with AI score of exactly 0', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [createProjectSubmission({ aiScore: 0 })],
      });

      // Score of 0 fails the passing threshold
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles submission with AI score of 100', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [createProjectSubmission({ aiScore: 100 })],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('order independence', () => {
    it('finds best submission regardless of array order (best first)', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [
          createProjectSubmission({ aiScore: 90 }),
          createProjectSubmission({ aiScore: 60 }),
          createProjectSubmission({ aiScore: 40 }),
        ],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('finds best submission regardless of array order (best last)', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [
          createProjectSubmission({ aiScore: 40 }),
          createProjectSubmission({ aiScore: 60 }),
          createProjectSubmission({ aiScore: 90 }),
        ],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('finds best submission regardless of array order (best middle)', () => {
      const subject = createSubject();
      const progress = createProgress({
        'proj-1': [
          createProjectSubmission({ aiScore: 40 }),
          createProjectSubmission({ aiScore: 90 }),
          createProjectSubmission({ aiScore: 60 }),
        ],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });
});
