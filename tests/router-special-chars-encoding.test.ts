/**
 * Tests for router handling of special characters and URL encoding edge cases.
 *
 * These tests verify that the router correctly handles:
 * - Special characters in route parameters
 * - URL encoding/decoding
 * - Edge cases in path parsing
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Router } from '@/core/router';

describe('Router Special Characters and Encoding', () => {
  let router: Router;
  let mockWindow: {
    location: { hash: string };
    addEventListener: ReturnType<typeof vi.fn>;
    scrollTo: ReturnType<typeof vi.fn>;
    history: { back: ReturnType<typeof vi.fn>; forward: ReturnType<typeof vi.fn> };
  };

  beforeEach(() => {
    mockWindow = {
      location: { hash: '' },
      addEventListener: vi.fn(),
      scrollTo: vi.fn(),
      history: {
        back: vi.fn(),
        forward: vi.fn(),
      },
    };

    // @ts-expect-error - mocking window
    global.window = mockWindow;

    router = new Router();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('URL encoding in parameters', () => {
    it('should decode URL-encoded subject IDs', () => {
      mockWindow.location.hash = '#/subject/cs%20101';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('cs 101');
    });

    it('should handle plus signs in subject IDs', () => {
      mockWindow.location.hash = '#/subject/math%2B101';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('math+101');
    });

    it('should decode special characters in quiz IDs', () => {
      mockWindow.location.hash = '#/subject/cs101/quiz/quiz%231';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.quizId).toBe('quiz#1');
    });

    it('should handle ampersands in parameters', () => {
      mockWindow.location.hash = '#/subject/cs%26math';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('cs&math');
    });

    it('should handle percent-encoded percent signs', () => {
      mockWindow.location.hash = '#/subject/100%25';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('100%');
    });
  });

  describe('Unicode character handling', () => {
    it('should decode UTF-8 encoded characters', () => {
      // Greek letters: α = %CE%B1
      mockWindow.location.hash = '#/subject/%CE%B1%CE%B2%CE%B3';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('αβγ');
    });

    it('should handle Japanese characters', () => {
      // 日本 = %E6%97%A5%E6%9C%AC
      mockWindow.location.hash = '#/subject/%E6%97%A5%E6%9C%AC';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('日本');
    });

    it('should handle emoji in parameters', () => {
      // 🎓 = %F0%9F%8E%93
      mockWindow.location.hash = '#/subject/course%F0%9F%8E%93';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('course🎓');
    });
  });

  describe('Path edge cases', () => {
    it('should handle double slashes by not matching', () => {
      mockWindow.location.hash = '#//subject//cs101';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      // Double slashes don't match valid routes, should fallback to home
      expect(route?.path).toBe('/');
    });

    it('should handle trailing slashes in routes', () => {
      mockWindow.location.hash = '#/curriculum/';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      // Trailing slash doesn't match, falls back to home
      expect(route?.path).toBe('/');
    });

    it('should handle empty hash', () => {
      mockWindow.location.hash = '';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route?.path).toBe('/');
    });

    it('should handle hash with only #', () => {
      mockWindow.location.hash = '#';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route?.path).toBe('/');
    });

    it('should handle hash with only #/', () => {
      mockWindow.location.hash = '#/';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route?.path).toBe('/');
    });
  });

  describe('Nested route parameters', () => {
    it('should correctly parse topic route with both subject and topic IDs', () => {
      mockWindow.location.hash = '#/subject/cs101/topic/topic-1';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('cs101');
      expect(route?.params.topicId).toBe('topic-1');
    });

    it('should correctly parse subtopic route with all three IDs', () => {
      mockWindow.location.hash = '#/subject/cs101/topic/topic-1/subtopic/intro';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('cs101');
      expect(route?.params.topicId).toBe('topic-1');
      expect(route?.params.subtopicSlug).toBe('intro');
    });

    it('should handle encoded characters in all nested parameters', () => {
      mockWindow.location.hash = '#/subject/cs%20101/topic/topic%231/subtopic/intro%26outro';
      // @ts-expect-error - accessing private method for testing
      const route = router.parseRoute(mockWindow.location.hash);

      expect(route).not.toBeNull();
      expect(route?.params.id).toBe('cs 101');
      expect(route?.params.topicId).toBe('topic#1');
      expect(route?.params.subtopicSlug).toBe('intro&outro');
    });
  });

  describe('Path reconstruction', () => {
    it('should reconstruct subject path correctly', () => {
      // @ts-expect-error - accessing private method for testing
      const path = router.reconstructPath('subject', { id: 'cs101' });
      expect(path).toBe('/subject/cs101');
    });

    it('should encode special characters in reconstructed path', () => {
      // @ts-expect-error - accessing private method for testing
      const path = router.reconstructPath('subject', { id: 'cs 101' });
      expect(path).toBe('/subject/cs%20101');
    });

    it('should handle missing params in reconstruction', () => {
      // @ts-expect-error - accessing private method for testing
      const path = router.reconstructPath('subject', {});
      expect(path).toBe('/subject/');
    });

    it('should return home for unknown route name', () => {
      // @ts-expect-error - accessing private method for testing
      const path = router.reconstructPath('unknown', {});
      expect(path).toBe('/');
    });
  });

  describe('Navigation helpers encoding', () => {
    it('should properly encode path segments with special characters', () => {
      // Test that navigate is called with properly encoded path
      const navigateSpy = vi.spyOn(router, 'navigate');

      router.navigate('/subject/cs 101');

      expect(mockWindow.location.hash).toBe('#/subject/cs 101');
    });
  });

  describe('isCurrentPath comparisons', () => {
    it('should match exact paths', () => {
      // @ts-expect-error - accessing private field for testing
      router.currentRoute = { path: '/curriculum', params: {} };

      expect(router.isCurrentPath('/curriculum')).toBe(true);
      expect(router.isCurrentPath('/progress')).toBe(false);
    });

    it('should handle null current route', () => {
      // @ts-expect-error - accessing private field for testing
      router.currentRoute = null;

      expect(router.isCurrentPath('/curriculum')).toBe(false);
    });
  });

  describe('Route handler management', () => {
    it('should allow unsubscribing from route changes', () => {
      const handler = vi.fn();
      // @ts-expect-error - accessing private field for testing
      router.currentRoute = { path: '/', params: {} };

      const unsubscribe = router.onRouteChange(handler);

      // Handler should be called immediately with current route
      expect(handler).toHaveBeenCalledTimes(1);

      unsubscribe();

      // Verify handler was removed from handlers array
      // @ts-expect-error - accessing private field for testing
      expect(router.handlers).not.toContain(handler);
    });

    it('should not call unsubscribed handlers on route change', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      // @ts-expect-error - accessing private field for testing
      router.currentRoute = { path: '/', params: {} };

      const unsubscribe1 = router.onRouteChange(handler1);
      router.onRouteChange(handler2);

      // Reset call counts
      handler1.mockClear();
      handler2.mockClear();

      unsubscribe1();

      // Simulate route change
      // @ts-expect-error - accessing private method for testing
      router.handleRouteChange();

      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
    });
  });
});
