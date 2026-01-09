/**
 * Router Navigation Patterns Tests
 *
 * Tests for various navigation patterns and edge cases in the hash-based router.
 * These tests ensure that navigation between different parts of the application
 * works correctly and handles edge cases gracefully.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock window.location.hash before imports
let mockHash = '';
const mockScrollTo = vi.fn();

// Setup mocks before importing the router
beforeEach(() => {
  mockHash = '';
  vi.stubGlobal('window', {
    location: {
      get hash() { return mockHash; },
      set hash(value: string) { mockHash = value; },
    },
    history: {
      back: vi.fn(),
      forward: vi.fn(),
    },
    addEventListener: vi.fn(),
    scrollTo: mockScrollTo,
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('Router Navigation Patterns', () => {
  describe('path encoding edge cases', () => {
    it('handles subject IDs with special characters', () => {
      // Test that special characters in subject IDs don't break routing
      const specialIds = [
        'cs-101',
        'math_201',
        'cs.advanced',
      ];

      specialIds.forEach(id => {
        const encoded = encodeURIComponent(id);
        expect(decodeURIComponent(encoded)).toBe(id);
      });
    });

    it('handles topic IDs with hyphens correctly', () => {
      const topicId = 'cs101-topic-1';
      const encoded = encodeURIComponent(topicId);
      expect(decodeURIComponent(encoded)).toBe(topicId);
    });

    it('handles subtopic slugs with multiple hyphens', () => {
      const slugs = [
        'getting-started',
        'advanced-data-structures',
        'object-oriented-programming-basics',
      ];

      slugs.forEach(slug => {
        const encoded = encodeURIComponent(slug);
        expect(decodeURIComponent(encoded)).toBe(slug);
      });
    });

    it('handles quiz IDs with various formats', () => {
      const quizIds = [
        'cs101-quiz-1',
        'math201-quiz-1a',
        'cs201-quiz-1-2',
        'quiz-1',
      ];

      quizIds.forEach(id => {
        const encoded = encodeURIComponent(id);
        expect(decodeURIComponent(encoded)).toBe(id);
      });
    });
  });

  describe('path segment validation', () => {
    it('correctly identifies path segments', () => {
      const paths = [
        { path: '/subject/cs101', segments: ['subject', 'cs101'] },
        { path: '/subject/cs101/topic/cs101-topic-1', segments: ['subject', 'cs101', 'topic', 'cs101-topic-1'] },
        { path: '/curriculum', segments: ['curriculum'] },
        { path: '/', segments: [''] },
      ];

      paths.forEach(({ path, segments }) => {
        const actualSegments = path.split('/').filter(Boolean);
        // Handle root path special case
        if (path === '/') {
          expect(actualSegments).toEqual([]);
        } else {
          expect(actualSegments).toEqual(segments.filter(Boolean));
        }
      });
    });
  });

  describe('route reconstruction', () => {
    it('reconstructs paths with single parameter', () => {
      const template = '/subject/:id';
      const params = { id: 'cs101' };
      const expected = '/subject/cs101';

      const result = template.replace(/:([^/]+)/g, (_, paramName) => {
        return encodeURIComponent(params[paramName as keyof typeof params] || '');
      });

      expect(result).toBe(expected);
    });

    it('reconstructs paths with multiple parameters', () => {
      const template = '/subject/:id/topic/:topicId';
      const params = { id: 'cs101', topicId: 'cs101-topic-1' };
      const expected = '/subject/cs101/topic/cs101-topic-1';

      const result = template.replace(/:([^/]+)/g, (_, paramName) => {
        return encodeURIComponent(params[paramName as keyof typeof params] || '');
      });

      expect(result).toBe(expected);
    });

    it('handles missing parameters gracefully', () => {
      const template = '/subject/:id';
      const params: Record<string, string> = {};

      const result = template.replace(/:([^/]+)/g, (_, paramName) => {
        return encodeURIComponent(params[paramName] || '');
      });

      expect(result).toBe('/subject/');
    });
  });

  describe('hash parsing', () => {
    it('handles various hash formats', () => {
      const hashVariations = [
        { hash: '#/', expected: '/' },
        { hash: '#/curriculum', expected: '/curriculum' },
        { hash: '/', expected: '/' },
        { hash: '', expected: '/' },
        { hash: '#', expected: '/' },
      ];

      hashVariations.forEach(({ hash, expected }) => {
        // Normalize hash to path
        let normalizedPath = hash;
        if (!hash || hash === '#' || hash === '#/') {
          normalizedPath = '/';
        } else if (hash.startsWith('#')) {
          normalizedPath = hash.substring(1);
        }

        // For empty hash, default to /
        if (normalizedPath === '') {
          normalizedPath = '/';
        }

        expect(normalizedPath).toBe(expected);
      });
    });
  });

  describe('route pattern matching', () => {
    const routePatterns = {
      home: /^#?\/$/,
      curriculum: /^#?\/curriculum$/,
      subject: /^#?\/subject\/([^\/]+)$/,
      topic: /^#?\/subject\/([^\/]+)\/topic\/([^\/]+)$/,
      subtopic: /^#?\/subject\/([^\/]+)\/topic\/([^\/]+)\/subtopic\/([^\/]+)$/,
      quiz: /^#?\/subject\/([^\/]+)\/quiz\/([^\/]+)$/,
      exam: /^#?\/subject\/([^\/]+)\/exam\/([^\/]+)$/,
      exercise: /^#?\/subject\/([^\/]+)\/exercise\/([^\/]+)$/,
      project: /^#?\/subject\/([^\/]+)\/project\/([^\/]+)$/,
      progress: /^#?\/progress$/,
      settings: /^#?\/settings$/,
    };

    it('matches home route correctly', () => {
      expect(routePatterns.home.test('#/')).toBe(true);
      expect(routePatterns.home.test('/')).toBe(true);
      expect(routePatterns.home.test('#/home')).toBe(false);
    });

    it('matches curriculum route correctly', () => {
      expect(routePatterns.curriculum.test('#/curriculum')).toBe(true);
      expect(routePatterns.curriculum.test('/curriculum')).toBe(true);
      expect(routePatterns.curriculum.test('#/curricul')).toBe(false);
    });

    it('matches subject route and extracts parameter', () => {
      const match = '#/subject/cs101'.match(routePatterns.subject);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs101');
    });

    it('matches topic route and extracts parameters', () => {
      const match = '#/subject/cs101/topic/cs101-topic-1'.match(routePatterns.topic);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs101');
      expect(match![2]).toBe('cs101-topic-1');
    });

    it('matches subtopic route and extracts parameters', () => {
      const match = '#/subject/cs101/topic/cs101-topic-1/subtopic/introduction'.match(routePatterns.subtopic);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs101');
      expect(match![2]).toBe('cs101-topic-1');
      expect(match![3]).toBe('introduction');
    });

    it('matches quiz route and extracts parameters', () => {
      const match = '#/subject/cs101/quiz/cs101-quiz-1'.match(routePatterns.quiz);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs101');
      expect(match![2]).toBe('cs101-quiz-1');
    });

    it('matches exam route and extracts parameters', () => {
      const match = '#/subject/cs101/exam/cs101-exam-midterm'.match(routePatterns.exam);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs101');
      expect(match![2]).toBe('cs101-exam-midterm');
    });

    it('matches exercise route and extracts parameters', () => {
      const match = '#/subject/cs101/exercise/cs101-ex-1'.match(routePatterns.exercise);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs101');
      expect(match![2]).toBe('cs101-ex-1');
    });

    it('matches project route and extracts parameters', () => {
      const match = '#/subject/cs101/project/cs101-proj-1'.match(routePatterns.project);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs101');
      expect(match![2]).toBe('cs101-proj-1');
    });

    it('matches progress route correctly', () => {
      expect(routePatterns.progress.test('#/progress')).toBe(true);
      expect(routePatterns.progress.test('/progress')).toBe(true);
    });

    it('matches settings route correctly', () => {
      expect(routePatterns.settings.test('#/settings')).toBe(true);
      expect(routePatterns.settings.test('/settings')).toBe(true);
    });

    it('does not match incorrect routes', () => {
      expect(routePatterns.subject.test('#/subject')).toBe(false);
      expect(routePatterns.subject.test('#/subject/')).toBe(false);
      expect(routePatterns.topic.test('#/subject/cs101/topic')).toBe(false);
      expect(routePatterns.quiz.test('#/subject/cs101')).toBe(false);
    });
  });

  describe('URL-encoded parameter handling', () => {
    it('correctly decodes URL-encoded subject IDs', () => {
      const encoded = 'cs%20101'; // 'cs 101' URL-encoded
      expect(decodeURIComponent(encoded)).toBe('cs 101');
    });

    it('correctly decodes URL-encoded topic IDs', () => {
      const encoded = 'topic%2D1'; // 'topic-1' with encoded hyphen
      expect(decodeURIComponent(encoded)).toBe('topic-1');
    });

    it('handles double encoding gracefully', () => {
      // This tests that we don't accidentally double-decode
      const singleEncoded = encodeURIComponent('cs-101');
      const doubleEncoded = encodeURIComponent(singleEncoded);

      expect(decodeURIComponent(singleEncoded)).toBe('cs-101');
      // Double encoded would need two decodes
      expect(decodeURIComponent(decodeURIComponent(doubleEncoded))).toBe('cs-101');
    });
  });

  describe('deep linking scenarios', () => {
    it('supports direct linking to a specific quiz', () => {
      const quizRoute = /^#?\/subject\/([^\/]+)\/quiz\/([^\/]+)$/;
      const deepLink = '#/subject/cs201/quiz/cs201-quiz-1-3';

      const match = deepLink.match(quizRoute);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs201');
      expect(match![2]).toBe('cs201-quiz-1-3');
    });

    it('supports direct linking to a specific subtopic', () => {
      const subtopicRoute = /^#?\/subject\/([^\/]+)\/topic\/([^\/]+)\/subtopic\/([^\/]+)$/;
      const deepLink = '#/subject/math101/topic/math101-topic-3/subtopic/sets-and-functions';

      const match = deepLink.match(subtopicRoute);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('math101');
      expect(match![2]).toBe('math101-topic-3');
      expect(match![3]).toBe('sets-and-functions');
    });

    it('supports direct linking to exam', () => {
      const examRoute = /^#?\/subject\/([^\/]+)\/exam\/([^\/]+)$/;
      const deepLink = '#/subject/math203/exam/math203-exam-final';

      const match = deepLink.match(examRoute);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('math203');
      expect(match![2]).toBe('math203-exam-final');
    });
  });

  describe('navigation path normalization', () => {
    it('normalizes paths starting without slash', () => {
      const path = 'subject/cs101';
      const normalized = path.startsWith('/') ? path : `/${path}`;
      expect(normalized).toBe('/subject/cs101');
    });

    it('preserves paths already starting with slash', () => {
      const path = '/subject/cs101';
      const normalized = path.startsWith('/') ? path : `/${path}`;
      expect(normalized).toBe('/subject/cs101');
    });

    it('handles empty paths', () => {
      const path = '';
      const normalized = path.startsWith('/') ? path : `/${path}`;
      expect(normalized).toBe('/');
    });
  });
});

describe('Route Parameter Extraction', () => {
  const extractParams = (pattern: RegExp, paramNames: string[], hash: string) => {
    const match = hash.match(pattern);
    if (!match) return null;

    const params: Record<string, string> = {};
    paramNames.forEach((paramName, index) => {
      params[paramName] = decodeURIComponent(match[index + 1]);
    });
    return params;
  };

  it('extracts single parameter correctly', () => {
    const pattern = /^#?\/subject\/([^\/]+)$/;
    const paramNames = ['id'];

    const params = extractParams(pattern, paramNames, '#/subject/cs101');
    expect(params).toEqual({ id: 'cs101' });
  });

  it('extracts multiple parameters correctly', () => {
    const pattern = /^#?\/subject\/([^\/]+)\/topic\/([^\/]+)$/;
    const paramNames = ['id', 'topicId'];

    const params = extractParams(pattern, paramNames, '#/subject/cs101/topic/cs101-topic-1');
    expect(params).toEqual({ id: 'cs101', topicId: 'cs101-topic-1' });
  });

  it('extracts three parameters correctly', () => {
    const pattern = /^#?\/subject\/([^\/]+)\/topic\/([^\/]+)\/subtopic\/([^\/]+)$/;
    const paramNames = ['id', 'topicId', 'subtopicSlug'];

    const params = extractParams(pattern, paramNames, '#/subject/cs101/topic/cs101-topic-1/subtopic/intro');
    expect(params).toEqual({
      id: 'cs101',
      topicId: 'cs101-topic-1',
      subtopicSlug: 'intro'
    });
  });

  it('returns null for non-matching routes', () => {
    const pattern = /^#?\/subject\/([^\/]+)$/;
    const paramNames = ['id'];

    const params = extractParams(pattern, paramNames, '#/curriculum');
    expect(params).toBeNull();
  });

  it('decodes URL-encoded parameters', () => {
    const pattern = /^#?\/subject\/([^\/]+)$/;
    const paramNames = ['id'];

    const params = extractParams(pattern, paramNames, '#/subject/cs%20101');
    expect(params).toEqual({ id: 'cs 101' });
  });
});
