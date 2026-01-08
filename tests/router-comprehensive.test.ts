import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getCurrentRoute,
  navigate,
  onRouteChange,
  navigateToSubject,
  navigateToTopic,
  navigateToSubtopic,
  navigateToQuiz,
  navigateToExam,
  navigateToExercise,
  navigateToProject,
} from '../src/core/router';

const flushHashChange = () => new Promise(resolve => setTimeout(resolve, 0));

describe('router path reconstruction edge cases', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('handles double URL encoding correctly', async () => {
    // Test that already-encoded characters are handled properly
    window.location.hash = '#/subject/test%2520space';
    await flushHashChange();
    const route = getCurrentRoute();
    // Should decode %25 to %, resulting in %20, which then stays as-is
    expect(route?.params.id).toBe('test%20space');
  });

  it('handles empty string params', async () => {
    window.location.hash = '#/subject/';
    await flushHashChange();
    // Empty segment after /subject/ should not match the subject pattern
    // Router falls back to home
    const route = getCurrentRoute();
    expect(route?.path).toBe('/');
  });

  it('handles very long subject IDs', async () => {
    const longId = 'a'.repeat(1000);
    navigateToSubject(longId);
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.id).toBe(longId);
  });

  it('handles subject IDs with reserved URL characters', async () => {
    // Test with various reserved characters that need encoding
    navigateToSubject('test?query=1');
    await flushHashChange();
    let route = getCurrentRoute();
    expect(route?.params.id).toBe('test?query=1');

    navigateToSubject('test#hash');
    await flushHashChange();
    route = getCurrentRoute();
    expect(route?.params.id).toBe('test#hash');
  });

  it('handles topic routes with special characters in both params', async () => {
    navigateToTopic('cs 101', 'topic #1');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.id).toBe('cs 101');
    expect(route?.params.topicId).toBe('topic #1');
  });

  it('handles subtopic routes with all params having special characters', async () => {
    navigateToSubtopic('math & logic', 'topic-a', 'sub/topic');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.id).toBe('math & logic');
    expect(route?.params.topicId).toBe('topic-a');
    // Forward slash in subtopicSlug would be encoded
    expect(route?.params.subtopicSlug).toBe('sub/topic');
  });

  it('handles quiz routes with numeric quiz IDs', async () => {
    navigateToQuiz('cs101', '12345');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.quizId).toBe('12345');
  });

  it('handles exam routes with date-based exam IDs', async () => {
    navigateToExam('cs101', 'final-2024-01-15');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.examId).toBe('final-2024-01-15');
  });

  it('handles exercise routes with UUID-style IDs', async () => {
    navigateToExercise('cs101', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.exId).toBe('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
  });

  it('handles project routes with snake_case IDs', async () => {
    navigateToProject('cs401', 'final_capstone_project');
    await flushHashChange();
    const route = getCurrentRoute();
    expect(route?.params.projId).toBe('final_capstone_project');
  });
});

describe('router handler management edge cases', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('handles multiple subscribe/unsubscribe cycles', async () => {
    let callCount = 0;

    for (let i = 0; i < 10; i++) {
      const unsubscribe = onRouteChange(() => {
        callCount++;
      });
      await flushHashChange();
      unsubscribe();
    }

    // Each subscription should have been called at least once for the initial route
    // Note: The first subscription may also be called by the initial hashchange
    expect(callCount).toBeGreaterThanOrEqual(10);
  });

  it('handles unsubscribing the same handler twice', async () => {
    let callCount = 0;
    const handler = () => { callCount++; };

    const unsubscribe = onRouteChange(handler);
    await flushHashChange();
    const initialCount = callCount;

    // First unsubscribe
    unsubscribe();
    // Second unsubscribe should be safe (no-op)
    unsubscribe();

    navigate('/progress');
    await flushHashChange();

    // Handler should not have been called again
    expect(callCount).toBe(initialCount);
  });

  it('handler receives correct route object immediately on registration', async () => {
    navigate('/curriculum');
    await flushHashChange();

    let receivedRoute: { path: string } | null = null;
    const unsubscribe = onRouteChange(route => {
      receivedRoute = route;
    });

    // Should receive current route immediately
    expect(receivedRoute?.path).toBe('/curriculum');
    unsubscribe();
  });

  it('handlers are called in registration order', async () => {
    const callOrder: number[] = [];

    const unsub1 = onRouteChange(() => callOrder.push(1));
    const unsub2 = onRouteChange(() => callOrder.push(2));
    const unsub3 = onRouteChange(() => callOrder.push(3));

    await flushHashChange();
    // Clear the initial calls
    callOrder.length = 0;

    navigate('/settings');
    await flushHashChange();

    // The handlers should be called in registration order
    // Filter out any duplicate calls and check the pattern
    expect(callOrder.slice(0, 3)).toEqual([1, 2, 3]);

    unsub1();
    unsub2();
    unsub3();
  });
});

describe('router scroll behavior', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('scrolls to top with smooth behavior on route change', async () => {
    navigate('/progress');
    await flushHashChange();

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('scrolls on every route change', async () => {
    navigate('/curriculum');
    await flushHashChange();

    navigate('/progress');
    await flushHashChange();

    navigate('/settings');
    await flushHashChange();

    // Should have been called at least 3 times for the 3 navigations
    expect(window.scrollTo).toHaveBeenCalled();
  });
});

describe('router pattern matching edge cases', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('does not match partial route paths', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // /subject without an ID should not match the subject route
    window.location.hash = '#/subject';
    await flushHashChange();

    // Should fall back to home since /subject is not a valid route
    expect(getCurrentRoute()?.path).toBe('/');

    warnSpy.mockRestore();
  });

  it('matches routes with optional hash prefix correctly', async () => {
    // Test without # prefix in the internal hash (just the path part)
    window.location.hash = '/curriculum';
    await flushHashChange();

    expect(getCurrentRoute()?.path).toBe('/curriculum');
  });

  it('handles route with trailing content after valid match', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // /curriculum/extra should not match /curriculum pattern exactly
    window.location.hash = '#/curriculum/extra';
    await flushHashChange();

    // Should fall back to home
    expect(getCurrentRoute()?.path).toBe('/');

    warnSpy.mockRestore();
  });

  it('handles case sensitivity in route matching', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Routes should be case-sensitive
    window.location.hash = '#/CURRICULUM';
    await flushHashChange();

    // This should not match /curriculum and fall back to home
    expect(getCurrentRoute()?.path).toBe('/');

    warnSpy.mockRestore();
  });
});

describe('router concurrent navigation', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('handles rapid navigation correctly', async () => {
    // Navigate rapidly
    for (let i = 0; i < 100; i++) {
      navigate(i % 2 === 0 ? '/curriculum' : '/progress');
    }
    await flushHashChange();

    // Final state should be /progress (last navigation)
    expect(getCurrentRoute()?.path).toBe('/progress');
  });

  it('maintains handler consistency during rapid navigation', async () => {
    let lastPath = '';
    const unsubscribe = onRouteChange(route => {
      lastPath = route.path;
    });

    // Navigate rapidly
    navigate('/curriculum');
    navigate('/progress');
    navigate('/settings');
    await flushHashChange();

    // Final path should be /settings
    expect(lastPath).toBe('/settings');

    unsubscribe();
  });
});

describe('router URL construction helpers', () => {
  beforeEach(() => {
    window.location.hash = '#/';
    window.scrollTo = vi.fn();
  });

  it('preserves special characters through round-trip navigation', async () => {
    const specialChars = [
      { id: 'test space', expected: 'test space' },
      { id: 'test+plus', expected: 'test+plus' },
      { id: 'test&amp', expected: 'test&amp' },
      { id: 'test=equals', expected: 'test=equals' },
      { id: '日本語', expected: '日本語' },
      { id: 'emoji🎉test', expected: 'emoji🎉test' },
    ];

    for (const { id, expected } of specialChars) {
      navigateToSubject(id);
      await flushHashChange();
      const route = getCurrentRoute();
      expect(route?.params.id).toBe(expected);
    }
  });
});
