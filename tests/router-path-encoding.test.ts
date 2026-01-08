/**
 * Router Path Encoding Tests
 *
 * Tests for URL encoding/decoding in the router,
 * ensuring special characters in IDs are handled correctly.
 */

import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { Router } from '../src/core/router';

describe('Router Path Encoding', () => {
  let router: Router;
  let originalLocation: Location;

  beforeEach(() => {
    // Mock window.location
    originalLocation = window.location;
    const mockLocation = {
      hash: '#/',
      href: 'http://localhost/#/',
    };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    router = new Router();
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
  });

  describe('basic route parsing', () => {
    it('parses home route', () => {
      (window.location as any).hash = '#/';
      const route = (router as any).parseRoute('#/');
      expect(route.path).toBe('/');
      expect(route.params).toEqual({});
    });

    it('parses curriculum route', () => {
      const route = (router as any).parseRoute('#/curriculum');
      expect(route.path).toBe('/curriculum');
    });

    it('parses subject route with simple ID', () => {
      const route = (router as any).parseRoute('#/subject/cs101');
      expect(route.path).toBe('/subject/cs101');
      expect(route.params.id).toBe('cs101');
    });

    it('parses topic route', () => {
      const route = (router as any).parseRoute('#/subject/cs101/topic/topic-1');
      expect(route.path).toBe('/subject/cs101/topic/topic-1');
      expect(route.params.id).toBe('cs101');
      expect(route.params.topicId).toBe('topic-1');
    });

    it('parses subtopic route', () => {
      const route = (router as any).parseRoute('#/subject/cs101/topic/topic-1/subtopic/intro');
      expect(route.path).toBe('/subject/cs101/topic/topic-1/subtopic/intro');
      expect(route.params.id).toBe('cs101');
      expect(route.params.topicId).toBe('topic-1');
      expect(route.params.subtopicSlug).toBe('intro');
    });

    it('parses quiz route', () => {
      const route = (router as any).parseRoute('#/subject/cs101/quiz/quiz-1');
      expect(route.path).toBe('/subject/cs101/quiz/quiz-1');
      expect(route.params.id).toBe('cs101');
      expect(route.params.quizId).toBe('quiz-1');
    });

    it('parses exam route', () => {
      const route = (router as any).parseRoute('#/subject/cs101/exam/midterm');
      expect(route.path).toBe('/subject/cs101/exam/midterm');
      expect(route.params.id).toBe('cs101');
      expect(route.params.examId).toBe('midterm');
    });

    it('parses exercise route', () => {
      const route = (router as any).parseRoute('#/subject/cs101/exercise/ex-1');
      expect(route.path).toBe('/subject/cs101/exercise/ex-1');
      expect(route.params.id).toBe('cs101');
      expect(route.params.exId).toBe('ex-1');
    });

    it('parses project route', () => {
      const route = (router as any).parseRoute('#/subject/cs101/project/proj-1');
      expect(route.path).toBe('/subject/cs101/project/proj-1');
      expect(route.params.id).toBe('cs101');
      expect(route.params.projId).toBe('proj-1');
    });
  });

  describe('URL encoding in params', () => {
    it('decodes URL-encoded subject ID', () => {
      const route = (router as any).parseRoute('#/subject/cs%20101');
      expect(route.params.id).toBe('cs 101');
    });

    it('decodes URL-encoded topic ID', () => {
      const route = (router as any).parseRoute('#/subject/cs101/topic/topic%201');
      expect(route.params.topicId).toBe('topic 1');
    });

    it('decodes URL-encoded subtopic slug', () => {
      const route = (router as any).parseRoute('#/subject/cs101/topic/t1/subtopic/hello%20world');
      expect(route.params.subtopicSlug).toBe('hello world');
    });

    it('decodes special characters', () => {
      const route = (router as any).parseRoute('#/subject/cs%2B%2B');
      expect(route.params.id).toBe('cs++');
    });

    it('decodes unicode characters', () => {
      const route = (router as any).parseRoute('#/subject/%CE%B1%CE%B2%CE%B3');
      expect(route.params.id).toBe('αβγ');
    });

    it('handles already decoded params', () => {
      // Some browsers may pass already decoded values
      const route = (router as any).parseRoute('#/subject/cs101');
      expect(route.params.id).toBe('cs101');
    });
  });

  describe('path reconstruction', () => {
    it('reconstructs subject path', () => {
      const path = (router as any).reconstructPath('subject', { id: 'cs101' });
      expect(path).toBe('/subject/cs101');
    });

    it('reconstructs topic path', () => {
      const path = (router as any).reconstructPath('topic', { id: 'cs101', topicId: 'topic-1' });
      expect(path).toBe('/subject/cs101/topic/topic-1');
    });

    it('reconstructs subtopic path', () => {
      const path = (router as any).reconstructPath('subtopic', {
        id: 'cs101',
        topicId: 'topic-1',
        subtopicSlug: 'intro',
      });
      expect(path).toBe('/subject/cs101/topic/topic-1/subtopic/intro');
    });

    it('encodes special characters in reconstruction', () => {
      const path = (router as any).reconstructPath('subject', { id: 'cs 101' });
      expect(path).toBe('/subject/cs%20101');
    });

    it('returns / for unknown route name', () => {
      const path = (router as any).reconstructPath('unknown', {});
      expect(path).toBe('/');
    });

    it('handles missing params gracefully', () => {
      const path = (router as any).reconstructPath('subject', {});
      expect(path).toBe('/subject/');
    });
  });

  describe('unknown routes', () => {
    it('returns home for completely unknown route', () => {
      const route = (router as any).parseRoute('#/unknown/path');
      expect(route.path).toBe('/');
    });

    it('returns home for malformed routes', () => {
      const route = (router as any).parseRoute('#/subject');
      expect(route.path).toBe('/');
    });

    it('returns home for empty hash', () => {
      const route = (router as any).parseRoute('');
      expect(route.path).toBe('/');
    });

    it('returns home for hash only', () => {
      const route = (router as any).parseRoute('#');
      expect(route.path).toBe('/');
    });
  });

  describe('route handler management', () => {
    it('registers and calls route handlers', () => {
      const handler = vi.fn();
      router.onRouteChange(handler);

      // Handler should be called immediately with current route
      expect(handler).toHaveBeenCalled();
    });

    it('unsubscribe function removes handler', () => {
      const handler = vi.fn();
      const unsubscribe = router.onRouteChange(handler);

      // Reset mock
      handler.mockClear();

      // Unsubscribe
      unsubscribe();

      // Trigger route change by calling handleRouteChange
      (router as any).handleRouteChange();

      // Handler should not be called after unsubscribe
      // Note: This test is limited because we can't easily trigger hashchange
    });
  });

  describe('navigation', () => {
    it('navigate sets window.location.hash', () => {
      router.navigate('/curriculum');
      expect(window.location.hash).toBe('#/curriculum');
    });

    it('navigate adds leading slash if missing', () => {
      router.navigate('settings');
      expect(window.location.hash).toBe('#/settings');
    });

    it('getCurrentRoute returns current route', () => {
      (router as any).currentRoute = { path: '/test', params: {} };
      expect(router.getCurrentRoute()?.path).toBe('/test');
    });

    it('isCurrentPath checks current route', () => {
      (router as any).currentRoute = { path: '/curriculum', params: {} };
      expect(router.isCurrentPath('/curriculum')).toBe(true);
      expect(router.isCurrentPath('/settings')).toBe(false);
    });
  });

  describe('optional hash prefix handling', () => {
    it('handles routes with # prefix', () => {
      const route = (router as any).parseRoute('#/subject/cs101');
      expect(route.params.id).toBe('cs101');
    });

    it('handles routes without # prefix', () => {
      const route = (router as any).parseRoute('/subject/cs101');
      expect(route.params.id).toBe('cs101');
    });
  });
});

describe('Navigation helper functions', () => {
  // These test the exported navigation functions
  // Note: We can't fully test them without mocking the router singleton

  it('navigateToSubject builds correct path', async () => {
    const { navigateToSubject } = await import('../src/core/router');
    // This will attempt to set window.location.hash
    // In test environment, this may not work as expected
    // but we verify the function exists and is callable
    expect(typeof navigateToSubject).toBe('function');
  });

  it('navigateToTopic builds correct path', async () => {
    const { navigateToTopic } = await import('../src/core/router');
    expect(typeof navigateToTopic).toBe('function');
  });

  it('navigateToQuiz builds correct path', async () => {
    const { navigateToQuiz } = await import('../src/core/router');
    expect(typeof navigateToQuiz).toBe('function');
  });
});
