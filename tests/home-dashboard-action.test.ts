import { beforeEach, describe, expect, it } from 'vitest';
import type { Subject } from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';
import { progressStorage } from '../src/core/storage';
import { renderHomePage } from '../src/pages/home';

const subject: Subject = {
  id: 'cs101',
  code: 'CS101',
  title: 'Introduction to Computer Science',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'Foundations of computer science.',
  learningObjectives: [],
  estimatedHours: 120,
  examIds: ['cs101-midterm'],
  projectIds: ['cs101-project'],
  topics: [
    {
      id: 'topic-1',
      title: 'Foundations',
      content: '',
      quizIds: ['cs101-quiz-1'],
      exerciseIds: ['cs101-t1-ex01'],
      subtopics: [
        {
          id: 'cs101-t1-intro',
          slug: 'intro',
          title: 'Introduction',
          content: '',
          order: 1,
        },
        {
          id: 'cs101-t1-logic',
          slug: 'logic',
          title: 'Logic',
          content: '',
          order: 2,
        },
      ],
    },
  ],
};

function renderDashboard(): HTMLElement {
  const container = document.createElement('div');
  renderHomePage(container, [subject]);
  return container;
}

describe('dashboard next action', () => {
  beforeEach(() => {
    progressStorage.resetProgress();
  });

  it('suggests the next unread reading before practice work', () => {
    const container = renderDashboard();

    const action = container.querySelector('.dashboard-next-action');
    expect(action?.textContent).toContain('Read Next');
    expect(action?.textContent).toContain('Introduction');
    expect(action?.querySelector('a')?.getAttribute('href')).toBe(
      '#/subject/cs101/topic/topic-1/subtopic/intro'
    );
  });

  it('suggests quizzes after all readings are viewed', () => {
    progressStorage.updateSubjectProgress('cs101', {
      status: 'in_progress',
      subtopicViews: {
        'cs101-t1-intro': {
          firstViewedAt: '2026-01-01T00:00:00.000Z',
          lastViewedAt: '2026-01-01T00:00:00.000Z',
          viewCount: 1,
        },
        'cs101-t1-logic': {
          firstViewedAt: '2026-01-01T00:00:00.000Z',
          lastViewedAt: '2026-01-01T00:00:00.000Z',
          viewCount: 1,
        },
      },
    });

    const container = renderDashboard();

    const action = container.querySelector('.dashboard-next-action');
    expect(action?.textContent).toContain('Practice Next');
    expect(action?.textContent).toContain('CS101 Quiz 1');
    expect(action?.querySelector('a')?.getAttribute('href')).toBe(
      '#/subject/cs101/quiz/cs101-quiz-1'
    );
  });

  it('does not suggest exams or projects after readings and practice are complete', () => {
    progressStorage.updateSubjectProgress('cs101', {
      status: 'in_progress',
      subtopicViews: {
        'cs101-t1-intro': {
          firstViewedAt: '2026-01-01T00:00:00.000Z',
          lastViewedAt: '2026-01-01T00:00:00.000Z',
          viewCount: 1,
        },
        'cs101-t1-logic': {
          firstViewedAt: '2026-01-01T00:00:00.000Z',
          lastViewedAt: '2026-01-01T00:00:00.000Z',
          viewCount: 1,
        },
      },
      quizAttempts: {
        'cs101-quiz-1': [{
          attemptId: 'attempt-1',
          timestamp: '2026-01-01T00:00:00.000Z',
          answers: {},
          score: QUIZ_PASSING_SCORE,
          timeSpentSeconds: 60,
        }],
      },
      exerciseCompletions: {
        'cs101-t1-ex01': {
          completionId: 'completion-1',
          timestamp: '2026-01-01T00:00:00.000Z',
          code: '',
          passed: true,
          timeSpentSeconds: 60,
        },
      },
    });

    const container = renderDashboard();

    expect(container.querySelector('.dashboard-next-action')).toBeNull();
    expect(container.textContent).not.toContain('Assessment Next');
    expect(container.textContent).not.toContain('Project Next');
  });
});
