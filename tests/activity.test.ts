import { describe, expect, it } from 'vitest';
import type { Subject, UserProgress } from '../src/core/types';
import { getActivityEvents } from '../src/core/activity';

const subject: Subject = {
  id: 'cs101',
  code: 'CS101',
  title: 'Introduction to Computer Science',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'Foundations.',
  learningObjectives: [],
  estimatedHours: 120,
  examIds: ['cs101-final'],
  projectIds: ['cs101-project'],
  topics: [
    {
      id: 'topic-1',
      title: 'Foundations',
      content: '',
      quizIds: ['cs101-quiz-1'],
      exerciseIds: ['cs101-exercise-1'],
      subtopics: [
        { id: 'cs101-intro', slug: 'intro', title: 'Introduction', content: '', order: 1 },
      ],
    },
  ],
};

function makeProgress(): UserProgress {
  return {
    version: 4,
    startedAt: '2026-01-01T00:00:00.000Z',
    settings: {
      theme: 'auto',
      codeEditorFontSize: 14,
      showCompletedItems: true,
    },
    subjects: {
      cs101: {
        status: 'in_progress',
        quizAttempts: {
          'cs101-quiz-1': [
            {
              attemptId: 'quiz-attempt-1',
              timestamp: '2026-01-03T10:00:00.000Z',
              answers: {},
              score: 80,
              timeSpentSeconds: 300,
            },
          ],
        },
        examAttempts: {
          'cs101-final': [
            {
              attemptId: 'exam-attempt-1',
              timestamp: '2026-01-05T10:00:00.000Z',
              answers: {},
              score: 68,
              timeSpentSeconds: 1800,
            },
          ],
        },
        exerciseCompletions: {
          'cs101-exercise-1': {
            completionId: 'exercise-completion-1',
            timestamp: '2026-01-04T10:00:00.000Z',
            code: 'print("ok")',
            passed: true,
            passedTestCases: 3,
            totalTestCases: 3,
            timeSpentSeconds: 600,
          },
        },
        projectSubmissions: {
          'cs101-project': [
            {
              submissionId: 'project-submission-1',
              timestamp: '2026-01-06T10:00:00.000Z',
              description: 'Project work',
              selfAssessment: {},
              notes: '',
            },
          ],
        },
        subtopicViews: {},
        subtopicCompletions: {
          'cs101-intro': {
            completedAt: '2026-01-02T10:00:00.000Z',
          },
        },
      },
    },
    studySessionHistory: [
      {
        sessionId: 'study-session-1',
        subjectId: 'cs101',
        subjectCode: 'CS101',
        startedAt: '2026-01-07T09:00:00.000Z',
        completedAt: '2026-01-07T10:00:00.000Z',
        durationSeconds: 3600,
        itemCount: 3,
        completedItemIds: ['read:cs101:cs101-intro'],
        summary: {
          sectionsCompleted: 1,
          quizzesAttempted: 1,
          quizzesPassed: 1,
          exercisesPassed: 1,
          reviewItemsCompleted: 0,
        },
      },
    ],
  };
}

describe('activity events', () => {
  it('derives a recent activity feed from existing progress and completed sessions', () => {
    const events = getActivityEvents(makeProgress(), [subject]);

    expect(events.map(event => event.type)).toEqual([
      'study_session_completed',
      'project_submitted',
      'exam_attempted',
      'exercise_completed',
      'quiz_attempted',
      'reading_completed',
    ]);
    expect(events[0]).toMatchObject({
      sessionId: 'study-session-1',
      durationSeconds: 3600,
      count: 3,
    });
    expect(events.find(event => event.type === 'reading_completed')).toMatchObject({
      title: 'Completed Introduction',
      detail: 'CS101 - Foundations',
    });
  });

  it('uses the stored exercise completion as a single activity item', () => {
    const exerciseEvents = getActivityEvents(makeProgress(), [subject])
      .filter(event => event.type === 'exercise_completed');

    expect(exerciseEvents).toHaveLength(1);
    expect(exerciseEvents[0]).toMatchObject({
      itemId: 'cs101-exercise-1',
      passed: true,
      durationSeconds: 600,
    });
  });
});
