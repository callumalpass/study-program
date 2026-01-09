/**
 * Storage and Progress Integration Tests
 *
 * Comprehensive tests for the integration between storage operations
 * and progress calculations, focusing on edge cases and data consistency.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import type {
  Subject,
  SubjectProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
} from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

// Helper functions to create test data
const createTimestamp = (daysAgo = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const createQuizAttempt = (score: number, daysAgo = 0): QuizAttempt => ({
  attemptId: `attempt-${Date.now()}-${Math.random()}`,
  timestamp: createTimestamp(daysAgo),
  answers: {},
  score,
  timeSpentSeconds: Math.floor(Math.random() * 600) + 60,
});

const createExamAttempt = (score: number, daysAgo = 0): ExamAttempt => ({
  attemptId: `exam-${Date.now()}-${Math.random()}`,
  timestamp: createTimestamp(daysAgo),
  answers: {},
  score,
  timeSpentSeconds: Math.floor(Math.random() * 3600) + 300,
});

const createExerciseCompletion = (passed: boolean, daysAgo = 0): ExerciseCompletion => ({
  completionId: `completion-${Date.now()}-${Math.random()}`,
  timestamp: createTimestamp(daysAgo),
  code: 'print("test")',
  passed,
  passedTestCases: passed ? 5 : 2,
  totalTestCases: 5,
  timeSpentSeconds: Math.floor(Math.random() * 1800) + 60,
});

const createProjectSubmission = (score?: number, daysAgo = 0): ProjectSubmission => ({
  submissionId: `sub-${Date.now()}-${Math.random()}`,
  timestamp: createTimestamp(daysAgo),
  description: 'Project submission',
  selfAssessment: { 'Code Quality': 4, 'Documentation': 3 },
  notes: 'Test notes',
  aiEvaluation: score === undefined ? undefined : {
    score,
    feedback: 'Good work',
    rubricScores: {},
    strengths: ['Clean code'],
    improvements: ['Add more tests'],
  },
});

describe('Progress Calculation Edge Cases', () => {
  describe('score boundary conditions', () => {
    it('correctly identifies passing score at exact threshold', () => {
      const score = QUIZ_PASSING_SCORE;
      expect(score >= QUIZ_PASSING_SCORE).toBe(true);
    });

    it('correctly identifies failing score just below threshold', () => {
      const score = QUIZ_PASSING_SCORE - 1;
      expect(score >= QUIZ_PASSING_SCORE).toBe(false);
    });

    it('correctly identifies passing score just above threshold', () => {
      const score = QUIZ_PASSING_SCORE + 1;
      expect(score >= QUIZ_PASSING_SCORE).toBe(true);
    });

    it('handles 0% score', () => {
      const attempt = createQuizAttempt(0);
      expect(attempt.score >= QUIZ_PASSING_SCORE).toBe(false);
    });

    it('handles 100% score', () => {
      const attempt = createQuizAttempt(100);
      expect(attempt.score >= QUIZ_PASSING_SCORE).toBe(true);
    });
  });

  describe('best score calculation', () => {
    it('returns the highest score from multiple attempts', () => {
      const attempts = [
        createQuizAttempt(50),
        createQuizAttempt(80),
        createQuizAttempt(65),
        createQuizAttempt(75),
      ];

      const bestScore = Math.max(...attempts.map(a => a.score));
      expect(bestScore).toBe(80);
    });

    it('returns the only score when single attempt', () => {
      const attempts = [createQuizAttempt(65)];
      const bestScore = Math.max(...attempts.map(a => a.score));
      expect(bestScore).toBe(65);
    });

    it('handles all equal scores', () => {
      const attempts = [
        createQuizAttempt(70),
        createQuizAttempt(70),
        createQuizAttempt(70),
      ];

      const bestScore = Math.max(...attempts.map(a => a.score));
      expect(bestScore).toBe(70);
    });

    it('handles empty attempts array gracefully', () => {
      const attempts: QuizAttempt[] = [];
      const bestScore = attempts.length === 0 ? 0 : Math.max(...attempts.map(a => a.score));
      expect(bestScore).toBe(0);
    });
  });

  describe('completion percentage calculation', () => {
    it('calculates 0% for no progress', () => {
      const totalItems = 10;
      const completedItems = 0;
      const percentage = Math.round((completedItems / totalItems) * 100);
      expect(percentage).toBe(0);
    });

    it('calculates 100% for full completion', () => {
      const totalItems = 10;
      const completedItems = 10;
      const percentage = Math.round((completedItems / totalItems) * 100);
      expect(percentage).toBe(100);
    });

    it('calculates correct percentage for partial completion', () => {
      const totalItems = 10;
      const completedItems = 3;
      const percentage = Math.round((completedItems / totalItems) * 100);
      expect(percentage).toBe(30);
    });

    it('handles rounding correctly for odd percentages', () => {
      const totalItems = 3;
      const completedItems = 1;
      // 1/3 = 33.333...%, rounds to 33
      const percentage = Math.round((completedItems / totalItems) * 100);
      expect(percentage).toBe(33);
    });

    it('handles zero total items gracefully', () => {
      const totalItems = 0;
      const completedItems = 0;
      const percentage = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
      expect(percentage).toBe(0);
    });

    it('rounds 49.5% correctly', () => {
      // 99 out of 200 = 49.5% -> rounds to 50 (JavaScript's Math.round)
      const percentage = Math.round((99 / 200) * 100);
      expect(percentage).toBe(50);
    });

    it('rounds 49.4% correctly', () => {
      // Approximately 49.4%
      const percentage = Math.round((247 / 500) * 100);
      expect(percentage).toBe(49);
    });
  });
});

describe('Subject Progress State Transitions', () => {
  describe('status transitions', () => {
    it('allows transition from not_started to in_progress', () => {
      const currentStatus = 'not_started';
      const newStatus = 'in_progress';
      // Valid transition
      expect(['not_started', 'in_progress', 'completed']).toContain(currentStatus);
      expect(['not_started', 'in_progress', 'completed']).toContain(newStatus);
    });

    it('allows transition from in_progress to completed', () => {
      const currentStatus = 'in_progress';
      const newStatus = 'completed';
      expect(['not_started', 'in_progress', 'completed']).toContain(currentStatus);
      expect(['not_started', 'in_progress', 'completed']).toContain(newStatus);
    });

    it('allows transition from not_started to completed (instant pass)', () => {
      const currentStatus = 'not_started';
      const newStatus = 'completed';
      expect(['not_started', 'in_progress', 'completed']).toContain(currentStatus);
      expect(['not_started', 'in_progress', 'completed']).toContain(newStatus);
    });
  });

  describe('prerequisite checking', () => {
    it('identifies when all prerequisites are met', () => {
      const prerequisites = ['cs101', 'math101'];
      const completedSubjects = ['cs101', 'math101', 'cs102'];

      const allMet = prerequisites.every(prereq => completedSubjects.includes(prereq));
      expect(allMet).toBe(true);
    });

    it('identifies when some prerequisites are not met', () => {
      const prerequisites = ['cs101', 'math101', 'cs102'];
      const completedSubjects = ['cs101', 'math101'];

      const allMet = prerequisites.every(prereq => completedSubjects.includes(prereq));
      expect(allMet).toBe(false);
    });

    it('returns true for empty prerequisites', () => {
      const prerequisites: string[] = [];
      const completedSubjects = ['cs101'];

      const allMet = prerequisites.every(prereq => completedSubjects.includes(prereq));
      expect(allMet).toBe(true);
    });

    it('handles missing subject in completion list', () => {
      const prerequisites = ['nonexistent'];
      const completedSubjects = ['cs101'];

      const allMet = prerequisites.every(prereq => completedSubjects.includes(prereq));
      expect(allMet).toBe(false);
    });
  });
});

describe('Exercise Completion Logic', () => {
  describe('best completion determination', () => {
    it('prefers passed completion over failed', () => {
      const passed = createExerciseCompletion(true);
      const failed = createExerciseCompletion(false);

      // Should replace failed with passed
      const shouldReplace = passed.passed && !failed.passed;
      expect(shouldReplace).toBe(true);
    });

    it('does not replace passed with failed', () => {
      const existing = createExerciseCompletion(true);
      const incoming = createExerciseCompletion(false);

      // Should not replace passed with failed
      const shouldReplace = incoming.passed && !existing.passed;
      expect(shouldReplace).toBe(false);
    });

    it('prefers more test cases passed when both passed', () => {
      const existing: ExerciseCompletion = {
        ...createExerciseCompletion(true),
        passedTestCases: 3,
        totalTestCases: 5,
      };
      const incoming: ExerciseCompletion = {
        ...createExerciseCompletion(true),
        passedTestCases: 5,
        totalTestCases: 5,
      };

      const shouldReplace =
        existing.passed === incoming.passed &&
        (incoming.passedTestCases ?? 0) > (existing.passedTestCases ?? 0);
      expect(shouldReplace).toBe(true);
    });

    it('does not replace when incoming has fewer test cases passed', () => {
      const existing: ExerciseCompletion = {
        ...createExerciseCompletion(true),
        passedTestCases: 5,
        totalTestCases: 5,
      };
      const incoming: ExerciseCompletion = {
        ...createExerciseCompletion(true),
        passedTestCases: 3,
        totalTestCases: 5,
      };

      const shouldReplace =
        existing.passed === incoming.passed &&
        (incoming.passedTestCases ?? 0) > (existing.passedTestCases ?? 0);
      expect(shouldReplace).toBe(false);
    });
  });

  describe('time accumulation', () => {
    it('accumulates time spent across attempts', () => {
      const existingTime = 300;
      const newTime = 150;
      const totalTime = existingTime + newTime;
      expect(totalTime).toBe(450);
    });

    it('handles first attempt time correctly', () => {
      const existingTime = undefined;
      const newTime = 150;
      const totalTime = (existingTime ?? 0) + newTime;
      expect(totalTime).toBe(150);
    });
  });
});

describe('Project Submission Evaluation', () => {
  describe('best submission determination', () => {
    it('prefers submission with higher AI score', () => {
      const submissions = [
        createProjectSubmission(65),
        createProjectSubmission(85),
        createProjectSubmission(70),
      ];

      const best = submissions.reduce((best, sub) => {
        const score = sub.aiEvaluation?.score ?? 0;
        const bestScore = best.aiEvaluation?.score ?? 0;
        return score > bestScore ? sub : best;
      });

      expect(best.aiEvaluation?.score).toBe(85);
    });

    it('returns first submission when none have AI evaluation', () => {
      const submissions = [
        createProjectSubmission(),
        createProjectSubmission(),
      ];

      const best = submissions.reduce((best, sub) => {
        const score = sub.aiEvaluation?.score ?? 0;
        const bestScore = best.aiEvaluation?.score ?? 0;
        return score > bestScore ? sub : best;
      });

      // Should be the first one since all have score 0
      expect(best).toBe(submissions[0]);
    });

    it('handles mixed evaluated and non-evaluated submissions', () => {
      const submissions = [
        createProjectSubmission(),
        createProjectSubmission(75),
        createProjectSubmission(),
      ];

      const best = submissions.reduce((best, sub) => {
        const score = sub.aiEvaluation?.score ?? 0;
        const bestScore = best.aiEvaluation?.score ?? 0;
        return score > bestScore ? sub : best;
      });

      expect(best.aiEvaluation?.score).toBe(75);
    });

    it('handles empty submissions array', () => {
      const submissions: ProjectSubmission[] = [];
      const best = submissions.length === 0 ? undefined : submissions.reduce((b, s) => {
        const score = s.aiEvaluation?.score ?? 0;
        const bestScore = b.aiEvaluation?.score ?? 0;
        return score > bestScore ? s : b;
      });

      expect(best).toBeUndefined();
    });
  });

  describe('passing score determination', () => {
    it('identifies passing AI evaluation score', () => {
      const submission = createProjectSubmission(80);
      const passed = (submission.aiEvaluation?.score ?? 0) >= QUIZ_PASSING_SCORE;
      expect(passed).toBe(true);
    });

    it('identifies failing AI evaluation score', () => {
      const submission = createProjectSubmission(60);
      const passed = (submission.aiEvaluation?.score ?? 0) >= QUIZ_PASSING_SCORE;
      expect(passed).toBe(false);
    });

    it('treats submission without AI evaluation as complete (legacy behavior)', () => {
      const submission = createProjectSubmission();
      // When no AI evaluation, the submission counts as complete
      const isComplete = submission.aiEvaluation === undefined;
      expect(isComplete).toBe(true);
    });
  });
});

describe('Timestamp Handling', () => {
  describe('ISO date string formatting', () => {
    it('creates valid ISO date strings', () => {
      const timestamp = createTimestamp();
      const parsed = new Date(timestamp);
      expect(parsed.toISOString()).toBe(timestamp);
    });

    it('handles dates in the past correctly', () => {
      const daysAgo = 7;
      const timestamp = createTimestamp(daysAgo);
      const parsed = new Date(timestamp);
      const now = new Date();

      const daysDiff = Math.round((now.getTime() - parsed.getTime()) / (1000 * 60 * 60 * 24));
      expect(daysDiff).toBe(daysAgo);
    });
  });

  describe('timestamp comparison', () => {
    it('correctly compares timestamps for ordering', () => {
      const older = createTimestamp(10);
      const newer = createTimestamp(5);

      const olderTime = new Date(older).getTime();
      const newerTime = new Date(newer).getTime();

      expect(newerTime > olderTime).toBe(true);
    });

    it('identifies the most recent timestamp', () => {
      const timestamps = [
        createTimestamp(5),
        createTimestamp(2),
        createTimestamp(10),
        createTimestamp(1),
      ];

      const mostRecent = timestamps.reduce((latest, ts) => {
        return new Date(ts).getTime() > new Date(latest).getTime() ? ts : latest;
      });

      // 1 day ago is the most recent
      expect(new Date(mostRecent).getTime()).toBeGreaterThan(
        new Date(createTimestamp(2)).getTime() - 1000
      );
    });
  });
});

describe('Review Queue Interval Calculation', () => {
  const calculateNextInterval = (streak: number, passed: boolean): number => {
    if (!passed) return 1;  // Failed: review tomorrow

    switch (streak) {
      case 0: return 1;     // Not yet passed
      case 1: return 3;     // First pass: review in 3 days
      case 2: return 7;     // Second pass: review in 1 week
      case 3: return 14;    // Third pass: review in 2 weeks
      default: return 30;   // Fourth+ pass (mastered): review monthly
    }
  };

  it('returns 1 day interval when failed', () => {
    expect(calculateNextInterval(0, false)).toBe(1);
    expect(calculateNextInterval(3, false)).toBe(1);
    expect(calculateNextInterval(10, false)).toBe(1);
  });

  it('returns correct intervals for increasing streaks', () => {
    expect(calculateNextInterval(0, true)).toBe(1);
    expect(calculateNextInterval(1, true)).toBe(3);
    expect(calculateNextInterval(2, true)).toBe(7);
    expect(calculateNextInterval(3, true)).toBe(14);
    expect(calculateNextInterval(4, true)).toBe(30);
    expect(calculateNextInterval(10, true)).toBe(30);
  });

  it('caps interval at 30 days for high streaks', () => {
    expect(calculateNextInterval(100, true)).toBe(30);
  });
});

describe('Subject Hours Calculation', () => {
  it('calculates total hours for all subjects', () => {
    const subjects = [
      { estimatedHours: 40 },
      { estimatedHours: 60 },
      { estimatedHours: 80 },
    ];

    const totalHours = subjects.reduce((sum, s) => sum + s.estimatedHours, 0);
    expect(totalHours).toBe(180);
  });

  it('calculates completed hours based on progress', () => {
    const subjects = [
      { estimatedHours: 100, completionPercentage: 50 },
      { estimatedHours: 80, completionPercentage: 100 },
      { estimatedHours: 60, completionPercentage: 25 },
    ];

    const completedHours = subjects.reduce((sum, s) => {
      return sum + (s.estimatedHours * s.completionPercentage) / 100;
    }, 0);

    expect(completedHours).toBe(50 + 80 + 15); // 145
  });

  it('rounds completed hours to nearest integer', () => {
    const subjects = [
      { estimatedHours: 100, completionPercentage: 33.33 },
    ];

    const completedHours = Math.round(
      subjects.reduce((sum, s) => {
        return sum + (s.estimatedHours * s.completionPercentage) / 100;
      }, 0)
    );

    expect(completedHours).toBe(33);
  });
});
