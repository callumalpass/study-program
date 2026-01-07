import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getCurrentRoute,
  isCurrentPath,
  navigate,
  onRouteChange,
  navigateToSubject,
  navigateToTopic,
  navigateToSubtopic,
  navigateToQuiz,
  navigateToExam,
  navigateToExercise,
  navigateToProject,
  navigateToProgress,
  navigateToSettings,
  navigateToExport,
  navigateToTimeline,
  navigateToCourseBuilder,
  navigateToCurriculum,
  navigateToHome,
} from '../src/core/router';

const flushHashChange = () => new Promise(resolve => setTimeout(resolve, 0));

describe('router navigation', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('handles the home route by default', async () => {
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.path).toBe('/');
    expect(route?.params).toEqual({});
  });

  it('navigates to a subject and decodes params', async () => {
    const changes: string[] = [];
    const unsubscribe = onRouteChange(route => {
      changes.push(route.path);
    });

    navigateToSubject('CS 101');
    await flushHashChange();

    const route = getCurrentRoute();
    expect(route?.params.id).toBe('CS 101');
    expect(route?.path).toBe('/subject/CS%20101');
    expect(changes).toContain('/subject/CS%20101');

    unsubscribe();
  });

  it('navigates to a topic route with two params', async () => {
    navigateToTopic('cs101', 't-1');
    await flushHashChange();

    const route = getCurrentRoute();
    expect(route?.params).toEqual({ id: 'cs101', topicId: 't-1' });
    expect(route?.path).toBe('/subject/cs101/topic/t-1');
  });

  it('normalizes navigate paths without a leading slash', async () => {
    navigate('curriculum');
    await flushHashChange();

    expect(getCurrentRoute()?.path).toBe('/curriculum');
    expect(isCurrentPath('/curriculum')).toBe(true);
  });

  it('falls back to home for unknown routes', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    window.location.hash = '#/not-a-route';
    await flushHashChange();

    expect(getCurrentRoute()?.path).toBe('/');
    warnSpy.mockRestore();
  });

  it('unsubscribes route handlers', async () => {
    let calls = 0;
    const unsubscribe = onRouteChange(() => {
      calls += 1;
    });

    await flushHashChange();
    const baseline = calls;
    expect(baseline).toBeGreaterThan(0);

    unsubscribe();
    navigate('progress');
    await flushHashChange();

    expect(calls).toBe(baseline);
  });
});

describe('convenience navigation functions', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('navigateToHome navigates to /', async () => {
    navigateToHome();
    await flushHashChange();
    expect(getCurrentRoute()?.path).toBe('/');
  });

  it('navigateToCurriculum navigates to /curriculum', async () => {
    navigateToCurriculum();
    await flushHashChange();
    expect(getCurrentRoute()?.path).toBe('/curriculum');
  });

  it('navigateToSubtopic navigates with three params', async () => {
    navigateToSubtopic('cs101', 'topic-1', 'intro');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.path).toBe('/subject/cs101/topic/topic-1/subtopic/intro');
    expect(route?.params).toEqual({
      id: 'cs101',
      topicId: 'topic-1',
      subtopicSlug: 'intro',
    });
  });

  it('navigateToQuiz navigates to quiz route', async () => {
    navigateToQuiz('cs101', 'quiz-1');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.path).toBe('/subject/cs101/quiz/quiz-1');
    expect(route?.params).toEqual({ id: 'cs101', quizId: 'quiz-1' });
  });

  it('navigateToExam navigates to exam route', async () => {
    navigateToExam('cs101', 'midterm');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.path).toBe('/subject/cs101/exam/midterm');
    expect(route?.params).toEqual({ id: 'cs101', examId: 'midterm' });
  });

  it('navigateToExercise navigates to exercise route', async () => {
    navigateToExercise('cs101', 'ex-1');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.path).toBe('/subject/cs101/exercise/ex-1');
    expect(route?.params).toEqual({ id: 'cs101', exId: 'ex-1' });
  });

  it('navigateToProject navigates to project route', async () => {
    navigateToProject('cs101', 'proj-1');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.path).toBe('/subject/cs101/project/proj-1');
    expect(route?.params).toEqual({ id: 'cs101', projId: 'proj-1' });
  });

  it('navigateToProgress navigates to /progress', async () => {
    navigateToProgress();
    await flushHashChange();
    expect(getCurrentRoute()?.path).toBe('/progress');
  });

  it('navigateToSettings navigates to /settings', async () => {
    navigateToSettings();
    await flushHashChange();
    expect(getCurrentRoute()?.path).toBe('/settings');
  });

  it('navigateToExport navigates to /export', async () => {
    navigateToExport();
    await flushHashChange();
    expect(getCurrentRoute()?.path).toBe('/export');
  });

  it('navigateToTimeline navigates to /timeline', async () => {
    navigateToTimeline();
    await flushHashChange();
    expect(getCurrentRoute()?.path).toBe('/timeline');
  });

  it('navigateToCourseBuilder navigates to /course-builder', async () => {
    navigateToCourseBuilder();
    await flushHashChange();
    expect(getCurrentRoute()?.path).toBe('/course-builder');
  });
});

describe('URL encoding and decoding', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('properly encodes special characters in subject ID', async () => {
    navigateToSubject('intro&basics');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.id).toBe('intro&basics');
    expect(route?.path).toBe('/subject/intro%26basics');
  });

  it('handles percent-encoded forward slashes in params', async () => {
    // Forward slashes in params need to be pre-encoded to avoid path confusion
    // The router correctly decodes %2F back to / in params
    window.location.hash = '#/subject/cs101%2Fadvanced';
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.id).toBe('cs101/advanced');
  });

  it('handles unicode characters in params', async () => {
    navigateToSubject('算法');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.id).toBe('算法');
  });
});

describe('isCurrentPath', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('returns true for matching path', async () => {
    navigate('/curriculum');
    await flushHashChange();
    expect(isCurrentPath('/curriculum')).toBe(true);
  });

  it('returns false for non-matching path', async () => {
    navigate('/curriculum');
    await flushHashChange();
    expect(isCurrentPath('/progress')).toBe(false);
  });

  it('returns false for partial matches', async () => {
    navigate('/curriculum');
    await flushHashChange();
    expect(isCurrentPath('/curric')).toBe(false);
  });
});
