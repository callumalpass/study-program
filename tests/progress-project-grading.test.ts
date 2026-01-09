/**
 * Progress Project Grading Edge Case Tests
 *
 * Tests for edge cases in project grading calculations, including:
 * - AI evaluation scoring
 * - Self-assessment handling
 * - Multiple submission scenarios
 * - Score boundary conditions
 */

import { describe, it, expect } from 'vitest';
import type {
  Subject,
  SubjectProgress,
  UserProgress,
  ProjectSubmission,
  AIEvaluation,
} from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';
import { calculateSubjectCompletion } from '../src/core/progress';

// Helper to create a project submission with AI evaluation
function makeProjectSubmission(
  score?: number,
  overrides?: Partial<ProjectSubmission>
): ProjectSubmission {
  const submission: ProjectSubmission = {
    submissionId: `sub-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    description: 'Test project submission',
    selfAssessment: {},
    notes: 'Test submission',
    ...overrides,
  };

  if (score !== undefined) {
    submission.aiEvaluation = {
      score,
      feedback: 'Test feedback',
      rubricScores: {},
      strengths: ['Good work'],
      improvements: ['Could improve'],
    };
  }

  return submission;
}

// Helper to create a subject with only projects (no quizzes/exercises/exams)
function makeProjectOnlySubject(projectIds: string[]): Subject {
  return {
    id: 'proj-subject',
    code: 'PROJ101',
    title: 'Project Subject',
    description: 'A subject with only projects',
    category: 'cs',
    year: 1,
    semester: 1,
    estimatedHours: 40,
    prerequisites: [],
    topics: [],
    examIds: [],
    projectIds,
  };
}

// Helper to create subject progress
function makeProgress(
  projectSubmissions: Record<string, ProjectSubmission[]>,
  status: 'not_started' | 'in_progress' | 'completed' = 'in_progress'
): SubjectProgress {
  return {
    status,
    quizAttempts: {},
    examAttempts: {},
    exerciseCompletions: {},
    projectSubmissions,
  };
}

describe('Project Grading Edge Cases', () => {
  describe('single project scoring', () => {
    it('counts project as complete when AI score >= 70', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(70)],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('counts project as incomplete when AI score < 70', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(69)],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('counts project as complete when submission has no AI evaluation', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission()], // No AI score
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles AI score of exactly 0', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(0)],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles AI score of 100', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(100)],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('multiple submissions for same project', () => {
    it('uses best score from multiple submissions', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [
          makeProjectSubmission(50), // First attempt - failing
          makeProjectSubmission(65), // Second attempt - still failing
          makeProjectSubmission(75), // Third attempt - passing
          makeProjectSubmission(60), // Fourth attempt - lower than best
        ],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles submissions in any order', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [
          makeProjectSubmission(80), // Best first
          makeProjectSubmission(50),
          makeProjectSubmission(60),
        ],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles mix of AI-evaluated and non-evaluated submissions', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [
          makeProjectSubmission(), // No AI score (treated as score 0 for comparison)
          makeProjectSubmission(50), // Has AI score below passing
        ],
      });

      // getBestProjectSubmission uses aiEvaluation?.score ?? 0
      // So the submission with score 50 is "best" since 50 > 0
      // But 50 < 70 so it's still failing
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('prefers AI-evaluated passing submission over non-evaluated', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [
          makeProjectSubmission(), // No AI score
          makeProjectSubmission(85), // Has passing AI score
        ],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles empty submissions array', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('multiple projects', () => {
    it('calculates completion across multiple projects', () => {
      const subject = makeProjectOnlySubject(['proj1', 'proj2', 'proj3', 'proj4']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(80)], // Pass
        proj2: [makeProjectSubmission(50)], // Fail
        proj3: [makeProjectSubmission(70)], // Pass (at threshold)
        proj4: [makeProjectSubmission(69)], // Fail (below threshold)
      });

      // 2 out of 4 passing = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('handles projects with no submissions', () => {
      const subject = makeProjectOnlySubject(['proj1', 'proj2']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(80)], // Pass
        // proj2 has no submissions
      });

      // 1 out of 2 = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('handles all projects passing', () => {
      const subject = makeProjectOnlySubject(['proj1', 'proj2', 'proj3']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(80)],
        proj2: [makeProjectSubmission(90)],
        proj3: [makeProjectSubmission(70)],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles all projects failing', () => {
      const subject = makeProjectOnlySubject(['proj1', 'proj2', 'proj3']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(60)],
        proj2: [makeProjectSubmission(50)],
        proj3: [makeProjectSubmission(69)],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('AI evaluation edge cases', () => {
    it('handles AI evaluation with undefined score', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const submission: ProjectSubmission = {
        submissionId: 'test',
        timestamp: new Date().toISOString(),
        description: 'Test',
        selfAssessment: {},
        notes: '',
        aiEvaluation: {
          score: undefined as unknown as number,
          feedback: 'Test',
          rubricScores: {},
          strengths: [],
          improvements: [],
        },
      };
      const progress = makeProgress({ proj1: [submission] });

      // Should handle gracefully
      expect(() => calculateSubjectCompletion(subject, progress)).not.toThrow();
    });

    it('handles AI evaluation with null score', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const submission: ProjectSubmission = {
        submissionId: 'test',
        timestamp: new Date().toISOString(),
        description: 'Test',
        selfAssessment: {},
        notes: '',
        aiEvaluation: {
          score: null as unknown as number,
          feedback: 'Test',
          rubricScores: {},
          strengths: [],
          improvements: [],
        },
      };
      const progress = makeProgress({ proj1: [submission] });

      expect(() => calculateSubjectCompletion(subject, progress)).not.toThrow();
    });

    it('handles AI evaluation with negative score', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(-10)],
      });

      // Negative score should be treated as failing
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles AI evaluation with score > 100', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(150)],
      });

      // Score > 100 should still be treated as passing
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles AI evaluation with decimal scores', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(69.9)],
      });

      // 69.9 < 70 should be failing
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles AI evaluation with score at threshold boundary', () => {
      const subject = makeProjectOnlySubject(['proj1']);

      // Exactly at threshold
      const progressAt = makeProgress({
        proj1: [makeProjectSubmission(QUIZ_PASSING_SCORE)],
      });
      expect(calculateSubjectCompletion(subject, progressAt)).toBe(100);

      // Just below threshold
      const progressBelow = makeProgress({
        proj1: [makeProjectSubmission(QUIZ_PASSING_SCORE - 0.001)],
      });
      expect(calculateSubjectCompletion(subject, progressBelow)).toBe(0);
    });
  });

  describe('subject status interaction', () => {
    it('returns 100 when subject status is completed regardless of actual scores', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress(
        { proj1: [makeProjectSubmission(50)] }, // Failing score
        'completed' // But marked as completed
      );

      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('returns 0 when subject status is not_started', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress = makeProgress({ proj1: [makeProjectSubmission(90)] }, 'not_started');

      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('calculates actual completion when status is in_progress', () => {
      const subject = makeProjectOnlySubject(['proj1', 'proj2']);
      const progress = makeProgress({
        proj1: [makeProjectSubmission(80)],
        proj2: [makeProjectSubmission(50)],
      });

      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });
  });

  describe('self-assessment handling', () => {
    it('ignores self-assessment when AI evaluation exists', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const submission: ProjectSubmission = {
        submissionId: 'test',
        timestamp: new Date().toISOString(),
        description: 'Test',
        selfAssessment: { criterion1: 5, criterion2: 5 }, // High self-assessment
        notes: '',
        aiEvaluation: {
          score: 50, // But low AI score
          feedback: 'Test',
          rubricScores: {},
          strengths: [],
          improvements: [],
        },
      };
      const progress = makeProgress({ proj1: [submission] });

      // Should use AI score (50), not self-assessment
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('edge cases with undefined/null progress', () => {
    it('handles undefined progress for subject', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
    });

    it('handles undefined projectSubmissions in progress', () => {
      const subject = makeProjectOnlySubject(['proj1']);
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: undefined as unknown as Record<string, ProjectSubmission[]>,
      };

      expect(() => calculateSubjectCompletion(subject, progress)).not.toThrow();
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });
});

describe('Project completion with mixed assessment items', () => {
  it('correctly weighs projects alongside quizzes and exercises', () => {
    const subject: Subject = {
      id: 'mixed',
      code: 'MIXED101',
      title: 'Mixed Subject',
      description: 'Subject with various assessment types',
      category: 'cs',
      year: 1,
      semester: 1,
      estimatedHours: 40,
      prerequisites: [],
      topics: [
        {
          id: 't1',
          title: 'Topic 1',
          content: '',
          quizIds: ['q1'],
          exerciseIds: ['ex1'],
        },
      ],
      examIds: ['exam1'],
      projectIds: ['proj1'],
    };

    // 4 items total: quiz, exercise, exam, project
    // All passing
    const allPassingProgress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: { q1: [{ attemptId: 'a1', timestamp: '', answers: {}, score: 80, timeSpentSeconds: 60 }] },
      examAttempts: { exam1: [{ attemptId: 'e1', timestamp: '', answers: {}, score: 75, timeSpentSeconds: 120 }] },
      exerciseCompletions: { ex1: { completionId: 'c1', timestamp: '', code: '', passed: true, timeSpentSeconds: 30 } },
      projectSubmissions: { proj1: [makeProjectSubmission(85)] },
    };
    expect(calculateSubjectCompletion(subject, allPassingProgress)).toBe(100);

    // 2 passing (quiz, exercise), 2 failing (exam, project) = 50%
    const halfPassingProgress: SubjectProgress = {
      status: 'in_progress',
      quizAttempts: { q1: [{ attemptId: 'a1', timestamp: '', answers: {}, score: 80, timeSpentSeconds: 60 }] },
      examAttempts: { exam1: [{ attemptId: 'e1', timestamp: '', answers: {}, score: 60, timeSpentSeconds: 120 }] },
      exerciseCompletions: { ex1: { completionId: 'c1', timestamp: '', code: '', passed: true, timeSpentSeconds: 30 } },
      projectSubmissions: { proj1: [makeProjectSubmission(65)] },
    };
    expect(calculateSubjectCompletion(subject, halfPassingProgress)).toBe(50);
  });
});
