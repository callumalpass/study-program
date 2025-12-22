import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getCurrentRoute,
  isCurrentPath,
  navigate,
  onRouteChange,
  navigateToSubject,
  navigateToTopic,
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
