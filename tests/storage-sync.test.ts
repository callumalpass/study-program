import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/services/github', () => ({
  githubService: {
    loadGist: vi.fn(),
    updateGist: vi.fn(),
  },
}));

import { ProgressStorage } from '../src/core/storage';
import { githubService } from '../src/services/github';

const loadGistMock = githubService.loadGist as unknown as ReturnType<typeof vi.fn>;

const now = new Date('2024-01-01T00:00:00.000Z').toISOString();
const later = new Date('2024-01-02T00:00:00.000Z').toISOString();

const makeStorage = () => new ProgressStorage();

beforeEach(() => {
  localStorage.clear();
  loadGistMock.mockReset();
});

describe('ProgressStorage syncFromGist', () => {
  it('skips sync when credentials are missing', async () => {
    const storage = makeStorage();
    const result = await storage.syncFromGist();

    expect(result).toEqual({ synced: false, updated: false });
    expect(loadGistMock).not.toHaveBeenCalled();
  });

  it('returns synced false when remote progress is unavailable', async () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token', gistId: 'gist' });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    loadGistMock.mockResolvedValue(null);

    const result = await storage.syncFromGist();
    expect(result).toEqual({ synced: false, updated: false });
    logSpy.mockRestore();
  });

  it('updates local progress when remote is newer and preserves tokens', async () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token', gistId: 'gist' });
    storage.getProgress().lastUpdated = now;
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    loadGistMock.mockResolvedValue({
      version: 4,
      startedAt: now,
      lastUpdated: later,
      subjects: {},
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
      selectedSubjectIds: [],
      reviewQueue: [],
    });

    const result = await storage.syncFromGist();
    expect(result).toEqual({ synced: true, updated: true });

    const settings = storage.getSettings();
    expect(settings.githubToken).toBe('token');
    expect(settings.gistId).toBe('gist');
    logSpy.mockRestore();
  });
});
