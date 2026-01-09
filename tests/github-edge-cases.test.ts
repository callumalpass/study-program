/**
 * Edge Case Tests for GitHub Service
 *
 * Additional tests for rate limiting, API response variations,
 * and unusual input handling in the GitHub Gist sync service.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GitHubService } from '../src/services/github';
import type { UserProgress } from '../src/core/types';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('GitHubService - Edge Cases', () => {
  let service: GitHubService;
  const testToken = 'ghp_test_token_12345';
  const testGistId = 'abc123gistid';

  const minimalProgress: UserProgress = {
    version: 1,
    startedAt: '2024-01-01T00:00:00.000Z',
    subjects: {},
    settings: { theme: 'light', codeEditorFontSize: 14, showCompletedItems: true },
  };

  beforeEach(() => {
    service = new GitHubService();
    mockFetch.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rate Limiting Handling', () => {
    it('should return false when rate limited on validateToken', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        headers: new Headers({
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Date.now() / 1000 + 3600),
        }),
      });

      const result = await service.validateToken(testToken);
      expect(result).toBe(false);
    });

    it('should return null when rate limited on findGist', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
      });

      const result = await service.findGist(testToken);
      expect(result).toBeNull();
    });

    it('should return null when rate limited on createGist', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
      });

      const result = await service.createGist(testToken, minimalProgress);
      expect(result).toBeNull();
    });

    it('should return false when rate limited on updateGist', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
      });

      const result = await service.updateGist(testToken, testGistId, minimalProgress);
      expect(result).toBe(false);
    });

    it('should return null when rate limited on loadGist', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
      });

      const result = await service.loadGist(testToken, testGistId);
      expect(result).toBeNull();
    });
  });

  describe('Server Error Handling', () => {
    it('should handle 500 Internal Server Error on validateToken', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await service.validateToken(testToken);
      expect(result).toBe(false);
    });

    it('should handle 502 Bad Gateway on findGist', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 502,
      });

      const result = await service.findGist(testToken);
      expect(result).toBeNull();
    });

    it('should handle 503 Service Unavailable on createGist', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
      });

      const result = await service.createGist(testToken, minimalProgress);
      expect(result).toBeNull();
    });

    it('should handle 504 Gateway Timeout on updateGist', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 504,
      });

      const result = await service.updateGist(testToken, testGistId, minimalProgress);
      expect(result).toBe(false);
    });
  });

  describe('Unusual Token Formats', () => {
    it('should handle token with leading/trailing whitespace', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'testuser' }),
      });

      // Token with spaces (simulating user copy-paste error)
      const spacedToken = '  ghp_abc123  ';
      await service.validateToken(spacedToken);

      // The service sends the token as-is; validation happens on GitHub's end
      expect(mockFetch).toHaveBeenCalledWith('https://api.github.com/user', {
        headers: {
          Authorization: `token ${spacedToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
    });

    it('should handle very long tokens gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const longToken = 'a'.repeat(1000);
      const result = await service.validateToken(longToken);

      expect(result).toBe(false);
      expect(mockFetch).toHaveBeenCalled();
    });

    it('should handle tokens with special characters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'testuser' }),
      });

      // Fine-grained tokens can have different patterns
      const fineGrainedToken = 'github_pat_123ABC_xyz789';
      const result = await service.validateToken(fineGrainedToken);

      expect(result).toBe(true);
    });
  });

  describe('Unusual Gist ID Formats', () => {
    it('should handle gist ID with only numbers', async () => {
      const numericGistId = '1234567890';
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: numericGistId,
          files: {
            'study-program-progress.json': {
              content: JSON.stringify(minimalProgress),
              truncated: false,
            },
          },
        }),
      });

      const result = await service.loadGist(testToken, numericGistId);
      expect(result).toBeDefined();
    });

    it('should handle very long gist ID', async () => {
      const longGistId = 'a'.repeat(100);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await service.loadGist(testToken, longGistId);
      expect(result).toBeNull();
    });

    it('should handle gist ID with mixed case', async () => {
      const mixedCaseGistId = 'AbCdEf123456';
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: mixedCaseGistId,
          files: {
            'study-program-progress.json': {
              content: JSON.stringify(minimalProgress),
              truncated: false,
            },
          },
        }),
      });

      const result = await service.loadGist(testToken, mixedCaseGistId);
      expect(result).toBeDefined();
    });
  });

  describe('Progress Data Edge Cases', () => {
    it('should handle progress with deeply nested quiz attempts', async () => {
      const deepProgress: UserProgress = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {
          'cs101': {
            status: 'in_progress',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
          },
        },
        settings: { theme: 'dark', codeEditorFontSize: 14, showCompletedItems: true },
      };

      // Add many quiz attempts
      for (let i = 0; i < 50; i++) {
        deepProgress.subjects['cs101'].quizAttempts[`quiz-${i}`] = [
          {
            score: 85 + (i % 15),
            totalQuestions: 10,
            correctAnswers: 8,
            completedAt: new Date(Date.now() - i * 86400000).toISOString(),
            answers: {},
          },
        ];
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const result = await service.createGist(testToken, deepProgress);
      expect(result).toBe(testGistId);

      // Verify the content was serialized correctly
      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const content = JSON.parse(body.files['study-program-progress.json'].content);
      expect(Object.keys(content.subjects['cs101'].quizAttempts)).toHaveLength(50);
    });

    it('should handle progress with special characters in subject IDs', async () => {
      const specialProgress: UserProgress = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {
          'cs-101-intro': {
            status: 'completed',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
          },
          'math_201': {
            status: 'in_progress',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
          },
        },
        settings: { theme: 'light', codeEditorFontSize: 12, showCompletedItems: false },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const result = await service.createGist(testToken, specialProgress);
      expect(result).toBe(testGistId);
    });

    it('should handle progress with very old dates', async () => {
      const oldProgress: UserProgress = {
        version: 1,
        startedAt: '1970-01-01T00:00:00.000Z',
        subjects: {},
        settings: { theme: 'light', codeEditorFontSize: 14, showCompletedItems: true },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const result = await service.createGist(testToken, oldProgress);
      expect(result).toBe(testGistId);
    });

    it('should handle progress with future dates', async () => {
      const futureProgress: UserProgress = {
        version: 1,
        startedAt: '2099-12-31T23:59:59.999Z',
        subjects: {},
        settings: { theme: 'dark', codeEditorFontSize: 16, showCompletedItems: true },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const result = await service.createGist(testToken, futureProgress);
      expect(result).toBe(testGistId);
    });
  });

  describe('API Response Variations', () => {
    it('should handle gist response with extra fields', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          url: 'https://api.github.com/gists/abc123',
          forks_url: 'https://api.github.com/gists/abc123/forks',
          commits_url: 'https://api.github.com/gists/abc123/commits',
          node_id: 'G_kwDOABcdef',
          owner: { login: 'testuser' },
          files: {
            'study-program-progress.json': {
              filename: 'study-program-progress.json',
              type: 'application/json',
              language: 'JSON',
              raw_url: 'https://gist.githubusercontent.com/...',
              size: 1234,
              content: JSON.stringify(minimalProgress),
              truncated: false,
            },
          },
          public: false,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-12-01T00:00:00Z',
        }),
      });

      const result = await service.loadGist(testToken, testGistId);
      expect(result).toEqual(minimalProgress);
    });

    it('should handle gist list response with many gists', async () => {
      const manyGists = Array.from({ length: 100 }, (_, i) => ({
        id: `gist-${i}`,
        files: i === 50 ? { 'study-program-progress.json': {} } : { 'other.txt': {} },
      }));

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => manyGists,
      });

      const result = await service.findGist(testToken);
      expect(result).toBe('gist-50');
    });

    it('should handle gist with multiple files', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          files: {
            'readme.md': { content: '# Progress Backup' },
            'study-program-progress.json': {
              content: JSON.stringify(minimalProgress),
              truncated: false,
            },
            'backup.json': { content: '{}' },
          },
        }),
      });

      const result = await service.loadGist(testToken, testGistId);
      expect(result).toEqual(minimalProgress);
    });
  });

  describe('Network Error Scenarios', () => {
    it('should handle timeout error on validateToken', async () => {
      mockFetch.mockRejectedValueOnce(new Error('The operation timed out'));

      const result = await service.validateToken(testToken);
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle DNS resolution error on findGist', async () => {
      mockFetch.mockRejectedValueOnce(new Error('getaddrinfo ENOTFOUND api.github.com'));

      const result = await service.findGist(testToken);
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle connection refused error on createGist', async () => {
      mockFetch.mockRejectedValueOnce(new Error('connect ECONNREFUSED'));

      const result = await service.createGist(testToken, minimalProgress);
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle connection reset error on updateGist', async () => {
      mockFetch.mockRejectedValueOnce(new Error('read ECONNRESET'));

      const result = await service.updateGist(testToken, testGistId, minimalProgress);
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle SSL/TLS error on loadGist', async () => {
      mockFetch.mockRejectedValueOnce(new Error('SSL_ERROR_HANDSHAKE_FAILURE_ALERT'));

      const result = await service.loadGist(testToken, testGistId);
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Malformed Response Handling', () => {
    it('should handle non-JSON response from gist list', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Unexpected token');
        },
      });

      const result = await service.findGist(testToken);
      expect(result).toBeNull();
    });

    it('should handle response where files is an array instead of object', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          files: [], // Incorrect type
        }),
      });

      const result = await service.loadGist(testToken, testGistId);
      expect(result).toBeNull();
    });

    it('should handle response where content is not a string', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          files: {
            'study-program-progress.json': {
              content: { invalid: 'object instead of string' },
              truncated: false,
            },
          },
        }),
      });

      const result = await service.loadGist(testToken, testGistId);
      expect(result).toBeNull();
    });
  });

  describe('Settings Filtering Verification', () => {
    it('should never include geminiApiKey in synced data', async () => {
      const progressWithApiKey: UserProgress = {
        ...minimalProgress,
        settings: {
          ...minimalProgress.settings,
          geminiApiKey: 'sk-secret-api-key-12345',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      await service.createGist(testToken, progressWithApiKey);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const content = JSON.parse(body.files['study-program-progress.json'].content);

      expect(content.settings.geminiApiKey).toBeUndefined();
    });

    it('should never include githubToken in synced data', async () => {
      const progressWithToken: UserProgress = {
        ...minimalProgress,
        settings: {
          ...minimalProgress.settings,
          githubToken: 'ghp_sensitive_token',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      await service.createGist(testToken, progressWithToken);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const content = JSON.parse(body.files['study-program-progress.json'].content);

      expect(content.settings.githubToken).toBeUndefined();
    });

    it('should never include gistId in synced data', async () => {
      const progressWithGistId: UserProgress = {
        ...minimalProgress,
        settings: {
          ...minimalProgress.settings,
          gistId: 'existing-gist-id',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      await service.createGist(testToken, progressWithGistId);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const content = JSON.parse(body.files['study-program-progress.json'].content);

      expect(content.settings.gistId).toBeUndefined();
    });

    it('should preserve studyPlan in synced data', async () => {
      const progressWithStudyPlan: UserProgress = {
        ...minimalProgress,
        settings: {
          ...minimalProgress.settings,
          studyPlan: {
            startDate: '2024-06-01',
            pace: 'accelerated',
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      await service.createGist(testToken, progressWithStudyPlan);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const content = JSON.parse(body.files['study-program-progress.json'].content);

      expect(content.settings.studyPlan).toEqual({
        startDate: '2024-06-01',
        pace: 'accelerated',
      });
    });
  });
});
