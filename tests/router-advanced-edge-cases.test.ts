/**
 * Router Advanced Edge Cases Tests
 *
 * Tests for advanced edge cases in the router including:
 * - Multiple consecutive slashes handling
 * - URL fragment handling
 * - Query string handling
 * - Back/forward navigation simulation
 * - Handler cleanup on unsubscribe
 * - Edge cases with very long URLs and special characters
 */

import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { Router } from '../src/core/router';

describe('Router Advanced Edge Cases', () => {
  let router: Router;
  let originalLocation: Location;
  let originalHistory: History;
  let hashChangeListeners: EventListener[] = [];

  beforeEach(() => {
    // Store original window properties
    originalLocation = window.location;
    originalHistory = window.history;

    // Mock window.location
    const mockLocation = {
      hash: '#/',
      href: 'http://localhost/#/',
    };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    // Capture event listeners
    hashChangeListeners = [];
    const originalAddEventListener = window.addEventListener;
    vi.spyOn(window, 'addEventListener').mockImplementation((type, listener) => {
      if (type === 'hashchange') {
        hashChangeListeners.push(listener as EventListener);
      }
      return originalAddEventListener.call(window, type, listener);
    });

    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    router = new Router();
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
    Object.defineProperty(window, 'history', {
      value: originalHistory,
      writable: true,
    });
    vi.restoreAllMocks();
    hashChangeListeners = [];
  });

  describe('Multiple slash handling', () => {
    it('handles trailing slashes', () => {
      // Note: Current implementation treats trailing slashes as part of the path
      // This test documents the behavior
      const route = (router as any).parseRoute('#/curriculum/');
      // Trailing slash doesn't match the curriculum pattern, so it falls back to home
      expect(route.path).toBe('/');
    });

    it('handles double slashes in path', () => {
      const route = (router as any).parseRoute('#//subject//cs101');
      // Double slashes don't match patterns, so falls back to home
      expect(route.path).toBe('/');
    });
  });

  describe('Query string and fragment handling', () => {
    it('treats query strings as part of the path segment', () => {
      // Query strings in hash are included as part of the ID
      const route = (router as any).parseRoute('#/subject/cs101?foo=bar');
      // The query string becomes part of the subject ID (URL encoded in path)
      expect(route.params.id).toBe('cs101?foo=bar');
    });

    it('treats hash within hash as part of the path segment', () => {
      const route = (router as any).parseRoute('#/subject/cs101#section');
      // Nested hash becomes part of the ID
      expect(route.params.id).toBe('cs101#section');
    });
  });

  describe('Empty and null parameter handling', () => {
    it('handles empty subject ID gracefully', () => {
      const route = (router as any).parseRoute('#/subject/');
      // Empty ID still matches the pattern with empty string
      expect(route.path).toBe('/');
    });

    it('handles whitespace-only subject ID', () => {
      const route = (router as any).parseRoute('#/subject/%20%20%20');
      expect(route.params.id).toBe('   ');
      expect(route.path).toBe('/subject/%20%20%20');
    });
  });

  describe('Very long URLs', () => {
    it('handles very long subject ID', () => {
      const longId = 'a'.repeat(1000);
      const route = (router as any).parseRoute(`#/subject/${longId}`);
      expect(route.params.id).toBe(longId);
      expect(route.params.id.length).toBe(1000);
    });

    it('handles deeply nested path (subtopic)', () => {
      const route = (router as any).parseRoute(
        '#/subject/verylongsubjectid123/topic/verylongtopicid456/subtopic/verylongsubtopicslug789'
      );
      expect(route.params.id).toBe('verylongsubjectid123');
      expect(route.params.topicId).toBe('verylongtopicid456');
      expect(route.params.subtopicSlug).toBe('verylongsubtopicslug789');
    });
  });

  describe('Special character edge cases', () => {
    it('handles percent signs in IDs', () => {
      const route = (router as any).parseRoute('#/subject/cs%25101');
      expect(route.params.id).toBe('cs%101');
    });

    it('handles ampersands in IDs', () => {
      const route = (router as any).parseRoute('#/subject/cs%26amp%26101');
      expect(route.params.id).toBe('cs&amp&101');
    });

    it('handles equals signs in IDs', () => {
      const route = (router as any).parseRoute('#/subject/cs%3D101');
      expect(route.params.id).toBe('cs=101');
    });

    it('handles slashes encoded in IDs', () => {
      const route = (router as any).parseRoute('#/subject/cs%2F101');
      expect(route.params.id).toBe('cs/101');
    });

    it('handles question marks encoded in IDs', () => {
      const route = (router as any).parseRoute('#/subject/cs%3F101');
      expect(route.params.id).toBe('cs?101');
    });

    it('handles hash signs encoded in IDs', () => {
      const route = (router as any).parseRoute('#/subject/cs%23101');
      expect(route.params.id).toBe('cs#101');
    });
  });

  describe('Unicode edge cases', () => {
    it('handles emoji in subject ID', () => {
      const route = (router as any).parseRoute('#/subject/%F0%9F%93%9A%F0%9F%8E%93');
      expect(route.params.id).toBe('📚🎓');
    });

    it('handles Chinese characters in subject ID', () => {
      const route = (router as any).parseRoute('#/subject/%E8%AE%A1%E7%AE%97%E6%9C%BA');
      expect(route.params.id).toBe('计算机');
    });

    it('handles Arabic characters in subject ID', () => {
      const route = (router as any).parseRoute('#/subject/%D8%AD%D8%A7%D8%B3%D9%88%D8%A8');
      expect(route.params.id).toBe('حاسوب');
    });

    it('handles Japanese characters in topic ID', () => {
      const route = (router as any).parseRoute(
        '#/subject/cs101/topic/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0'
      );
      expect(route.params.topicId).toBe('プログラミング');
    });
  });

  describe('Handler management edge cases', () => {
    it('handles multiple unsubscribe calls gracefully', () => {
      const handler = vi.fn();
      const unsubscribe = router.onRouteChange(handler);

      // First unsubscribe should work
      unsubscribe();

      // Second unsubscribe should not throw
      expect(() => unsubscribe()).not.toThrow();
    });

    it('handles unsubscribe of non-existent handler gracefully', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      router.onRouteChange(handler1);
      const unsubscribe2 = router.onRouteChange(handler2);

      // Unsubscribe handler2
      unsubscribe2();

      // Manually trigger route change
      (router as any).handleRouteChange();

      // handler1 should still be called (once for initial, once for route change)
      expect(handler1).toHaveBeenCalled();
    });

    it('notifies all handlers on route change', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      const handler3 = vi.fn();

      router.onRouteChange(handler1);
      router.onRouteChange(handler2);
      router.onRouteChange(handler3);

      // Clear mocks after initial calls
      handler1.mockClear();
      handler2.mockClear();
      handler3.mockClear();

      // Trigger route change
      (router as any).handleRouteChange();

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler3).toHaveBeenCalledTimes(1);
    });

    it('propagates handler exceptions', () => {
      // Handlers that throw will propagate the error when first registered
      // (since onRouteChange calls the handler immediately with current route)
      const badHandler = vi.fn(() => {
        throw new Error('Handler error');
      });

      // Registering a handler that throws should propagate the error
      expect(() => router.onRouteChange(badHandler)).toThrow('Handler error');
    });
  });

  describe('getCurrentRoute edge cases', () => {
    it('returns null before any route change', () => {
      // Create a new router without triggering init
      const newRouter = Object.create(Router.prototype);
      newRouter.currentRoute = null;
      expect(newRouter.getCurrentRoute()).toBeNull();
    });

    it('isCurrentPath returns false when currentRoute is null', () => {
      (router as any).currentRoute = null;
      expect(router.isCurrentPath('/anything')).toBe(false);
    });
  });

  describe('navigate edge cases', () => {
    it('handles empty path', () => {
      router.navigate('');
      expect(window.location.hash).toBe('#/');
    });

    it('handles path with only spaces', () => {
      router.navigate('   ');
      expect(window.location.hash).toBe('#/   ');
    });

    it('preserves multiple leading slashes (no normalization)', () => {
      // The router does not normalize multiple leading slashes
      router.navigate('///curriculum');
      expect(window.location.hash).toBe('#///curriculum');
    });

    it('preserves single leading slash', () => {
      router.navigate('/settings');
      expect(window.location.hash).toBe('#/settings');
    });
  });

  describe('History navigation', () => {
    it('back calls window.history.back', () => {
      const backSpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});
      router.back();
      expect(backSpy).toHaveBeenCalled();
    });

    it('forward calls window.history.forward', () => {
      const forwardSpy = vi.spyOn(window.history, 'forward').mockImplementation(() => {});
      router.forward();
      expect(forwardSpy).toHaveBeenCalled();
    });
  });

  describe('reconstructPath edge cases', () => {
    it('handles undefined param values as empty string', () => {
      const path = (router as any).reconstructPath('subject', { id: undefined });
      // When param is undefined, the fallback '' is used
      expect(path).toBe('/subject/');
    });

    it('handles null param values as empty string', () => {
      const path = (router as any).reconstructPath('topic', { id: 'cs101', topicId: null });
      // When param is null/undefined, the fallback '' is used
      expect(path).toBe('/subject/cs101/topic/');
    });

    it('encodes newlines in params', () => {
      const path = (router as any).reconstructPath('subject', { id: 'cs\n101' });
      expect(path).toBe('/subject/cs%0A101');
    });

    it('encodes tabs in params', () => {
      const path = (router as any).reconstructPath('subject', { id: 'cs\t101' });
      expect(path).toBe('/subject/cs%09101');
    });
  });

  describe('Pattern matching edge cases', () => {
    it('distinguishes between similar routes', () => {
      const subjectRoute = (router as any).parseRoute('#/subject/cs101');
      const topicRoute = (router as any).parseRoute('#/subject/cs101/topic/t1');

      expect(subjectRoute.path).toBe('/subject/cs101');
      expect(topicRoute.path).toBe('/subject/cs101/topic/t1');

      // They should have different params
      expect(subjectRoute.params.topicId).toBeUndefined();
      expect(topicRoute.params.topicId).toBe('t1');
    });

    it('matches exam vs exercise correctly', () => {
      const examRoute = (router as any).parseRoute('#/subject/cs101/exam/mid');
      const exerciseRoute = (router as any).parseRoute('#/subject/cs101/exercise/ex1');

      expect(examRoute.params.examId).toBe('mid');
      expect(examRoute.params.exId).toBeUndefined();

      expect(exerciseRoute.params.exId).toBe('ex1');
      expect(exerciseRoute.params.examId).toBeUndefined();
    });
  });

  describe('Route parsing with various hash formats', () => {
    it('handles hash with just #', () => {
      const route = (router as any).parseRoute('#');
      expect(route.path).toBe('/');
    });

    it('handles hash with #/', () => {
      const route = (router as any).parseRoute('#/');
      expect(route.path).toBe('/');
    });

    it('handles no hash at all', () => {
      const route = (router as any).parseRoute('');
      expect(route.path).toBe('/');
    });

    it('handles null input', () => {
      const route = (router as any).parseRoute(null);
      expect(route.path).toBe('/');
    });

    it('handles undefined input', () => {
      const route = (router as any).parseRoute(undefined);
      expect(route.path).toBe('/');
    });
  });

  describe('All defined routes', () => {
    const testCases = [
      { hash: '#/', expectedPath: '/' },
      { hash: '#/curriculum', expectedPath: '/curriculum' },
      { hash: '#/progress', expectedPath: '/progress' },
      { hash: '#/settings', expectedPath: '/settings' },
      { hash: '#/export', expectedPath: '/export' },
      { hash: '#/timeline', expectedPath: '/timeline' },
      { hash: '#/course-builder', expectedPath: '/course-builder' },
    ];

    testCases.forEach(({ hash, expectedPath }) => {
      it(`correctly parses ${hash}`, () => {
        const route = (router as any).parseRoute(hash);
        expect(route.path).toBe(expectedPath);
      });
    });
  });
});
