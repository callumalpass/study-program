import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GitHubService } from '../src/services/github';
import type { UserProgress } from '../src/core/types';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('GitHubService', () => {
  let service: GitHubService;
  const testToken = 'ghp_test_token_12345';
  const testGistId = 'abc123gistid';

  // Sample user progress for testing
  const sampleProgress: UserProgress = {
    version: 1,
    startedAt: '2024-01-15T10:00:00.000Z',
    lastUpdated: '2024-12-20T15:30:00.000Z',
    subjects: {
      'cs101': {
        status: 'in_progress',
        startedAt: '2024-01-15T10:00:00.000Z',
        quizAttempts: {
          'quiz-1': [{ score: 85, totalQuestions: 10, correctAnswers: 8, completedAt: '2024-01-16T14:00:00.000Z', answers: {} }],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      },
    },
    settings: {
      theme: 'dark',
      studyPace: 'standard',
      weeklyGoalHours: 10,
      github: {},
    },
  };

  beforeEach(() => {
    service = new GitHubService();
    mockFetch.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('validateToken', () => {
    it('should return true for valid token', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'testuser' }),
      });

      const result = await service.validateToken(testToken);

      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith('https://api.github.com/user', {
        headers: {
          Authorization: `token ${testToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
    });

    it('should return false for invalid token', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const result = await service.validateToken(testToken);

      expect(result).toBe(false);
    });

    it('should return false when fetch throws an error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await service.validateToken(testToken);

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalledWith(
        'Error validating GitHub token:',
        expect.any(Error)
      );
    });

    it('should handle empty token gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const result = await service.validateToken('');

      expect(result).toBe(false);
    });
  });

  describe('findGist', () => {
    it('should find existing gist with correct filename', async () => {
      const mockGists = [
        { id: 'other123', files: { 'other-file.json': {} } },
        { id: testGistId, files: { 'cs-degree-progress.json': {} } },
        { id: 'another456', files: { 'notes.md': {} } },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGists,
      });

      const result = await service.findGist(testToken);

      expect(result).toBe(testGistId);
      expect(mockFetch).toHaveBeenCalledWith('https://api.github.com/gists', {
        headers: {
          Authorization: `token ${testToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
    });

    it('should return null when no matching gist found', async () => {
      const mockGists = [
        { id: 'other123', files: { 'other-file.json': {} } },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGists,
      });

      const result = await service.findGist(testToken);

      expect(result).toBeNull();
    });

    it('should return null for empty gist list', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const result = await service.findGist(testToken);

      expect(result).toBeNull();
    });

    it('should return null when API returns error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const result = await service.findGist(testToken);

      expect(result).toBeNull();
    });

    it('should return null when fetch throws an error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await service.findGist(testToken);

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Error finding gist:',
        expect.any(Error)
      );
    });

    it('should handle gists without files property', async () => {
      const mockGists = [
        { id: 'broken1' },
        { id: 'broken2', files: null },
        { id: testGistId, files: { 'cs-degree-progress.json': {} } },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGists,
      });

      const result = await service.findGist(testToken);

      expect(result).toBe(testGistId);
    });
  });

  describe('createGist', () => {
    it('should create gist and return gist id', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const result = await service.createGist(testToken, sampleProgress);

      expect(result).toBe(testGistId);
      expect(mockFetch).toHaveBeenCalledWith('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          Authorization: `token ${testToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: expect.any(String),
      });

      // Verify the body structure
      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.description).toBe('CS Degree Learning Platform Progress');
      expect(body.public).toBe(false);
      expect(body.files['cs-degree-progress.json']).toBeDefined();
    });

    it('should exclude settings from gist content', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      await service.createGist(testToken, sampleProgress);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const savedProgress = JSON.parse(body.files['cs-degree-progress.json'].content);

      expect(savedProgress.settings).toBeUndefined();
      expect(savedProgress.subjects).toBeDefined();
      expect(savedProgress.version).toBe(1);
    });

    it('should return null when API returns error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
      });

      const result = await service.createGist(testToken, sampleProgress);

      expect(result).toBeNull();
    });

    it('should return null when fetch throws an error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await service.createGist(testToken, sampleProgress);

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Error creating gist:',
        expect.any(Error)
      );
    });

    it('should handle progress with empty subjects', async () => {
      const emptyProgress: UserProgress = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {},
        settings: { theme: 'light', studyPace: 'standard', weeklyGoalHours: 5, github: {} },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const result = await service.createGist(testToken, emptyProgress);

      expect(result).toBe(testGistId);
    });
  });

  describe('updateGist', () => {
    it('should update gist and return true on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const result = await service.updateGist(testToken, testGistId, sampleProgress);

      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.github.com/gists/${testGistId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `token ${testToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: expect.any(String),
        }
      );
    });

    it('should exclude settings from update', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      await service.updateGist(testToken, testGistId, sampleProgress);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const savedProgress = JSON.parse(body.files['cs-degree-progress.json'].content);

      expect(savedProgress.settings).toBeUndefined();
      expect(savedProgress.subjects).toBeDefined();
    });

    it('should return false when API returns error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await service.updateGist(testToken, testGistId, sampleProgress);

      expect(result).toBe(false);
    });

    it('should return false when fetch throws an error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await service.updateGist(testToken, testGistId, sampleProgress);

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalledWith(
        'Error updating gist:',
        expect.any(Error)
      );
    });

    it('should handle special characters in gist id', async () => {
      const specialGistId = 'abc-123_def';
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: specialGistId }),
      });

      const result = await service.updateGist(testToken, specialGistId, sampleProgress);

      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.github.com/gists/${specialGistId}`,
        expect.any(Object)
      );
    });
  });

  describe('loadGist', () => {
    it('should load and parse gist content', async () => {
      const progressWithoutSettings = { ...sampleProgress };
      delete (progressWithoutSettings as any).settings;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          files: {
            'cs-degree-progress.json': {
              content: JSON.stringify(progressWithoutSettings),
              truncated: false,
            },
          },
        }),
      });

      const result = await service.loadGist(testToken, testGistId);

      expect(result).toEqual(progressWithoutSettings);
      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.github.com/gists/${testGistId}`,
        {
          headers: {
            Authorization: `token ${testToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
    });

    it('should fetch raw content when file is truncated', async () => {
      const progressWithoutSettings = { ...sampleProgress };
      delete (progressWithoutSettings as any).settings;

      const rawUrl = 'https://gist.githubusercontent.com/raw/content';

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            id: testGistId,
            files: {
              'cs-degree-progress.json': {
                content: '{}', // Truncated content
                truncated: true,
                raw_url: rawUrl,
              },
            },
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => progressWithoutSettings,
        });

      const result = await service.loadGist(testToken, testGistId);

      expect(result).toEqual(progressWithoutSettings);
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockFetch).toHaveBeenNthCalledWith(2, rawUrl);
    });

    it('should return null when raw content fetch fails', async () => {
      const rawUrl = 'https://gist.githubusercontent.com/raw/content';

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            id: testGistId,
            files: {
              'cs-degree-progress.json': {
                content: '{}',
                truncated: true,
                raw_url: rawUrl,
              },
            },
          }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
        });

      const result = await service.loadGist(testToken, testGistId);

      expect(result).toBeNull();
    });

    it('should return null when API returns error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await service.loadGist(testToken, testGistId);

      expect(result).toBeNull();
    });

    it('should return null when fetch throws an error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await service.loadGist(testToken, testGistId);

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Error loading gist:',
        expect.any(Error)
      );
    });

    it('should return null when gist file is missing', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          files: {
            'other-file.json': { content: '{}' },
          },
        }),
      });

      const result = await service.loadGist(testToken, testGistId);

      expect(result).toBeNull();
    });

    it('should return null when file content is empty', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          files: {
            'cs-degree-progress.json': {
              content: '',
              truncated: false,
            },
          },
        }),
      });

      const result = await service.loadGist(testToken, testGistId);

      expect(result).toBeNull();
    });

    it('should return null when file object is null', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          files: {
            'cs-degree-progress.json': null,
          },
        }),
      });

      const result = await service.loadGist(testToken, testGistId);

      expect(result).toBeNull();
    });

    it('should handle JSON parse errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          files: {
            'cs-degree-progress.json': {
              content: 'invalid json {{{',
              truncated: false,
            },
          },
        }),
      });

      const result = await service.loadGist(testToken, testGistId);

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Error loading gist:',
        expect.any(Error)
      );
    });
  });

  describe('Integration scenarios', () => {
    it('should handle full sync workflow: find -> update', async () => {
      // First, find the gist
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: testGistId, files: { 'cs-degree-progress.json': {} } },
        ],
      });

      const gistId = await service.findGist(testToken);
      expect(gistId).toBe(testGistId);

      // Then update it
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const updated = await service.updateGist(testToken, gistId!, sampleProgress);
      expect(updated).toBe(true);
    });

    it('should handle first-time sync: find (null) -> create', async () => {
      // Find returns null (no existing gist)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const gistId = await service.findGist(testToken);
      expect(gistId).toBeNull();

      // Create new gist
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const newGistId = await service.createGist(testToken, sampleProgress);
      expect(newGistId).toBe(testGistId);
    });

    it('should handle load -> merge scenario', async () => {
      const remoteProgress = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {
          'cs102': {
            status: 'completed',
            completedAt: '2024-06-01T00:00:00.000Z',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: testGistId,
          files: {
            'cs-degree-progress.json': {
              content: JSON.stringify(remoteProgress),
              truncated: false,
            },
          },
        }),
      });

      const loaded = await service.loadGist(testToken, testGistId);
      expect(loaded).toEqual(remoteProgress);
      expect(loaded?.subjects['cs102']).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    it('should handle very large progress data', async () => {
      // Create progress with many subjects
      const largeProgress: UserProgress = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {},
        settings: { theme: 'dark', studyPace: 'standard', weeklyGoalHours: 10, github: {} },
      };

      for (let i = 0; i < 100; i++) {
        largeProgress.subjects[`subject-${i}`] = {
          status: 'completed',
          quizAttempts: {},
          examAttempts: {},
          exerciseCompletions: {},
          projectSubmissions: {},
        };
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const result = await service.createGist(testToken, largeProgress);
      expect(result).toBe(testGistId);
    });

    it('should handle concurrent API calls', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ login: 'user' }) })
        .mockResolvedValueOnce({ ok: true, json: async () => [] })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ id: testGistId }) });

      const [validateResult, findResult, createResult] = await Promise.all([
        service.validateToken(testToken),
        service.findGist(testToken),
        service.createGist(testToken, sampleProgress),
      ]);

      expect(validateResult).toBe(true);
      expect(findResult).toBeNull();
      expect(createResult).toBe(testGistId);
    });

    it('should handle unicode content in progress data', async () => {
      const unicodeProgress: UserProgress = {
        version: 1,
        startedAt: '2024-01-01T00:00:00.000Z',
        subjects: {
          'cs-émoji-test-🎓': {
            status: 'in_progress',
            quizAttempts: {},
            examAttempts: {},
            exerciseCompletions: {},
            projectSubmissions: {},
          },
        },
        settings: { theme: 'dark', studyPace: 'standard', weeklyGoalHours: 10, github: {} },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: testGistId }),
      });

      const result = await service.createGist(testToken, unicodeProgress);
      expect(result).toBe(testGistId);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const content = body.files['cs-degree-progress.json'].content;
      expect(content).toContain('cs-émoji-test-🎓');
    });
  });
});
