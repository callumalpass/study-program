/**
 * Progress Subject State Tests
 *
 * Tests for startSubject, completeSubject, and autoCompleteSubjectIfReady functions
 * which manage subject state transitions in the progress system.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type {
  Subject,
  SubjectProgress,
  QuizAttempt,
  ExerciseCompletion,
} from '../src/core/types';
import {
  startSubject,
  completeSubject,
  autoCompleteSubjectIfReady,
  calculateSubjectCompletion,
} from '../src/core/progress';
import { progressStorage } from '../src/core/storage';

const now = new Date('2024-06-15T12:00:00.000Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
  // Recreate the storage to clear state
  (progressStorage as unknown as { progress: unknown }).progress = progressStorage.load();
});

afterEach(() => {
  vi.useRealTimers();
});

const makeQuizAttempt = (score: number): QuizAttempt => ({
  attemptId: `attempt-${score}`,
  timestamp: now.toISOString(),
  answers: {},
  score,
  timeSpentSeconds: 42,
});

const makeExerciseCompletion = (passed: boolean): ExerciseCompletion => ({
  completionId: passed ? 'pass' : 'fail',
  timestamp: now.toISOString(),
  code: 'print("hi")',
  passed,
  timeSpentSeconds: 30,
});

const subjectTemplate = (overrides: Partial<Subject>): Subject => ({
  id: 'cs101',
  code: 'CS101',
  title: 'Intro',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'desc',
  learningObjectives: [],
  topics: [
    {
      id: 't1',
      title: 'Topic 1',
      content: '',
      quizIds: ['q1'],
      exerciseIds: ['e1'],
    },
  ],
  estimatedHours: 10,
  examIds: [],
  projectIds: [],
  ...overrides,
});

describe('startSubject', () => {
  it('starts a subject that has not been started yet', () => {
    startSubject('cs101');

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress).toBeDefined();
    expect(progress?.status).toBe('in_progress');
    expect(progress?.startedAt).toBe(now.toISOString());
  });

  it('creates new progress entry for subject without existing progress', () => {
    // Verify no progress exists initially
    expect(progressStorage.getSubjectProgress('cs101')).toBeUndefined();

    startSubject('cs101');

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress).toBeDefined();
    expect(progress?.status).toBe('in_progress');
  });

  it('does not modify subject already in progress', () => {
    // Start the subject first
    startSubject('cs101');
    const firstProgress = progressStorage.getSubjectProgress('cs101');
    const firstStartedAt = firstProgress?.startedAt;

    // Advance time
    vi.advanceTimersByTime(60000); // 1 minute later

    // Try to start again
    startSubject('cs101');

    const secondProgress = progressStorage.getSubjectProgress('cs101');
    expect(secondProgress?.status).toBe('in_progress');
    expect(secondProgress?.startedAt).toBe(firstStartedAt); // Should not change
  });

  it('does not modify completed subject', () => {
    // Complete the subject first
    completeSubject('cs101');
    const completedProgress = progressStorage.getSubjectProgress('cs101');

    // Try to start it
    startSubject('cs101');

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('completed');
    expect(progress?.completedAt).toBe(completedProgress?.completedAt);
  });

  it('works with subject that has existing progress data but not_started status', () => {
    // Create a subject with not_started status and some data
    progressStorage.updateSubjectProgress('cs101', {
      status: 'not_started',
      quizAttempts: {},
      exerciseCompletions: {},
    });

    startSubject('cs101');

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('in_progress');
    expect(progress?.startedAt).toBe(now.toISOString());
  });

  it('starts different subjects independently', () => {
    startSubject('cs101');
    startSubject('cs102');

    const progress101 = progressStorage.getSubjectProgress('cs101');
    const progress102 = progressStorage.getSubjectProgress('cs102');

    expect(progress101?.status).toBe('in_progress');
    expect(progress102?.status).toBe('in_progress');
  });
});

describe('completeSubject', () => {
  it('completes a subject', () => {
    completeSubject('cs101');

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('completed');
    expect(progress?.completedAt).toBe(now.toISOString());
  });

  it('completes a subject that was in progress', () => {
    startSubject('cs101');

    vi.advanceTimersByTime(3600000); // 1 hour later
    const laterTime = new Date(now.getTime() + 3600000);
    vi.setSystemTime(laterTime);

    completeSubject('cs101');

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('completed');
    expect(progress?.startedAt).toBe(now.toISOString());
    expect(progress?.completedAt).toBe(laterTime.toISOString());
  });

  it('completes a subject that was never started (creates progress)', () => {
    expect(progressStorage.getSubjectProgress('cs101')).toBeUndefined();

    completeSubject('cs101');

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('completed');
    expect(progress?.completedAt).toBe(now.toISOString());
  });

  it('does not modify already completed subject', () => {
    completeSubject('cs101');
    const firstProgress = progressStorage.getSubjectProgress('cs101');
    const firstCompletedAt = firstProgress?.completedAt;

    // Advance time
    vi.advanceTimersByTime(60000);

    // Try to complete again
    completeSubject('cs101');

    const secondProgress = progressStorage.getSubjectProgress('cs101');
    expect(secondProgress?.status).toBe('completed');
    expect(secondProgress?.completedAt).toBe(firstCompletedAt); // Should not change
  });

  it('preserves existing progress data when completing', () => {
    // Add some quiz attempts first
    const attempt = makeQuizAttempt(85);
    progressStorage.addQuizAttempt('cs101', 'q1', attempt);

    completeSubject('cs101');

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('completed');
    expect(progress?.quizAttempts['q1']).toHaveLength(1);
    expect(progress?.quizAttempts['q1'][0].score).toBe(85);
  });
});

describe('autoCompleteSubjectIfReady', () => {
  it('auto-completes subject when completion is 100%', () => {
    const subject = subjectTemplate({
      id: 'cs101',
      topics: [
        {
          id: 't1',
          title: 'Topic 1',
          content: '',
          quizIds: ['q1'],
          exerciseIds: ['e1'],
        },
      ],
      examIds: [],
      projectIds: [],
    });

    // Start the subject and complete all requirements
    startSubject('cs101');
    progressStorage.addQuizAttempt('cs101', 'q1', makeQuizAttempt(80));
    progressStorage.addExerciseCompletion('cs101', 'e1', makeExerciseCompletion(true));

    // Verify 100% completion
    const progress = progressStorage.getSubjectProgress('cs101');
    expect(calculateSubjectCompletion(subject, progress)).toBe(100);

    autoCompleteSubjectIfReady(subject);

    const updatedProgress = progressStorage.getSubjectProgress('cs101');
    expect(updatedProgress?.status).toBe('completed');
    expect(updatedProgress?.completedAt).toBe(now.toISOString());
  });

  it('does not auto-complete subject when completion is less than 100%', () => {
    const subject = subjectTemplate({
      id: 'cs101',
      topics: [
        {
          id: 't1',
          title: 'Topic 1',
          content: '',
          quizIds: ['q1', 'q2'],
          exerciseIds: ['e1'],
        },
      ],
      examIds: [],
      projectIds: [],
    });

    // Start the subject and complete only some requirements
    startSubject('cs101');
    progressStorage.addQuizAttempt('cs101', 'q1', makeQuizAttempt(80));
    // q2 and e1 not completed

    // Verify less than 100% completion
    const progress = progressStorage.getSubjectProgress('cs101');
    expect(calculateSubjectCompletion(subject, progress)).toBeLessThan(100);

    autoCompleteSubjectIfReady(subject);

    const updatedProgress = progressStorage.getSubjectProgress('cs101');
    expect(updatedProgress?.status).toBe('in_progress');
    expect(updatedProgress?.completedAt).toBeUndefined();
  });

  it('does not modify already completed subject', () => {
    const subject = subjectTemplate({ id: 'cs101' });

    // Complete the subject first
    completeSubject('cs101');
    const firstProgress = progressStorage.getSubjectProgress('cs101');
    const firstCompletedAt = firstProgress?.completedAt;

    vi.advanceTimersByTime(60000);

    autoCompleteSubjectIfReady(subject);

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('completed');
    expect(progress?.completedAt).toBe(firstCompletedAt);
  });

  it('does nothing when subject has no progress', () => {
    const subject = subjectTemplate({ id: 'cs101' });

    expect(progressStorage.getSubjectProgress('cs101')).toBeUndefined();

    autoCompleteSubjectIfReady(subject);

    expect(progressStorage.getSubjectProgress('cs101')).toBeUndefined();
  });

  it('handles subject with no trackable items (returns to caller without completing)', () => {
    const subject = subjectTemplate({
      id: 'cs101',
      topics: [],
      examIds: [],
      projectIds: [],
    });

    startSubject('cs101');

    // A subject with no items has 0% completion when in_progress
    const progress = progressStorage.getSubjectProgress('cs101');
    expect(calculateSubjectCompletion(subject, progress)).toBe(0);

    autoCompleteSubjectIfReady(subject);

    const updatedProgress = progressStorage.getSubjectProgress('cs101');
    expect(updatedProgress?.status).toBe('in_progress');
  });

  it('auto-completes when quiz passes threshold exactly at 70%', () => {
    const subject = subjectTemplate({
      id: 'cs101',
      topics: [
        {
          id: 't1',
          title: 'Topic 1',
          content: '',
          quizIds: ['q1'],
          exerciseIds: [],
        },
      ],
      examIds: [],
      projectIds: [],
    });

    startSubject('cs101');
    progressStorage.addQuizAttempt('cs101', 'q1', makeQuizAttempt(70)); // Exactly passing

    autoCompleteSubjectIfReady(subject);

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('completed');
  });

  it('does not auto-complete when quiz is at 69%', () => {
    const subject = subjectTemplate({
      id: 'cs101',
      topics: [
        {
          id: 't1',
          title: 'Topic 1',
          content: '',
          quizIds: ['q1'],
          exerciseIds: [],
        },
      ],
      examIds: [],
      projectIds: [],
    });

    startSubject('cs101');
    progressStorage.addQuizAttempt('cs101', 'q1', makeQuizAttempt(69)); // Just below passing

    autoCompleteSubjectIfReady(subject);

    const progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('in_progress');
  });
});

describe('startSubject and completeSubject integration', () => {
  it('handles full lifecycle: not_started -> in_progress -> completed', () => {
    const subject = subjectTemplate({ id: 'cs101' });

    // Step 1: Not started
    expect(progressStorage.getSubjectProgress('cs101')).toBeUndefined();

    // Step 2: Start
    startSubject('cs101');
    let progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('in_progress');
    expect(progress?.startedAt).toBe(now.toISOString());
    expect(progress?.completedAt).toBeUndefined();

    // Step 3: Complete (advance time to make timestamps different)
    vi.advanceTimersByTime(86400000); // 1 day later
    const completionTime = new Date(now.getTime() + 86400000);
    vi.setSystemTime(completionTime);

    completeSubject('cs101');
    progress = progressStorage.getSubjectProgress('cs101');
    expect(progress?.status).toBe('completed');
    expect(progress?.startedAt).toBe(now.toISOString());
    expect(progress?.completedAt).toBe(completionTime.toISOString());
  });

  it('tracks multiple subjects with different states', () => {
    // Subject 1: completed
    startSubject('cs101');
    completeSubject('cs101');

    // Subject 2: in progress
    startSubject('cs102');

    // Subject 3: not started (no action needed)

    const progress101 = progressStorage.getSubjectProgress('cs101');
    const progress102 = progressStorage.getSubjectProgress('cs102');
    const progress103 = progressStorage.getSubjectProgress('cs103');

    expect(progress101?.status).toBe('completed');
    expect(progress102?.status).toBe('in_progress');
    expect(progress103).toBeUndefined();
  });
});

describe('autoCompleteSubjectIfReady integration', () => {
  it('auto-completes after adding final passing quiz attempt', () => {
    const subject = subjectTemplate({
      id: 'cs101',
      topics: [
        {
          id: 't1',
          title: 'Topic 1',
          content: '',
          quizIds: ['q1'],
          exerciseIds: [],
        },
      ],
      examIds: [],
      projectIds: [],
    });

    startSubject('cs101');

    // First attempt - failing
    progressStorage.addQuizAttempt('cs101', 'q1', makeQuizAttempt(60));

    // Check - should not be completed
    autoCompleteSubjectIfReady(subject);
    expect(progressStorage.getSubjectProgress('cs101')?.status).toBe('in_progress');

    // Second attempt - passing
    progressStorage.addQuizAttempt('cs101', 'q1', makeQuizAttempt(75));

    // Now should auto-complete
    autoCompleteSubjectIfReady(subject);
    expect(progressStorage.getSubjectProgress('cs101')?.status).toBe('completed');
  });

  it('auto-completes after adding final passing exercise', () => {
    const subject = subjectTemplate({
      id: 'cs101',
      topics: [
        {
          id: 't1',
          title: 'Topic 1',
          content: '',
          quizIds: ['q1'],
          exerciseIds: ['e1'],
        },
      ],
      examIds: [],
      projectIds: [],
    });

    startSubject('cs101');

    // Complete quiz
    progressStorage.addQuizAttempt('cs101', 'q1', makeQuizAttempt(80));

    // Check - should not be completed (exercise missing)
    autoCompleteSubjectIfReady(subject);
    expect(progressStorage.getSubjectProgress('cs101')?.status).toBe('in_progress');

    // Complete exercise - failing first
    progressStorage.addExerciseCompletion('cs101', 'e1', makeExerciseCompletion(false));
    autoCompleteSubjectIfReady(subject);
    expect(progressStorage.getSubjectProgress('cs101')?.status).toBe('in_progress');

    // Complete exercise - passing
    progressStorage.addExerciseCompletion('cs101', 'e1', makeExerciseCompletion(true));
    autoCompleteSubjectIfReady(subject);
    expect(progressStorage.getSubjectProgress('cs101')?.status).toBe('completed');
  });
});
