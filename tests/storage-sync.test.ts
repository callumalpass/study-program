import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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

// Store original fetch to restore later
const originalFetch = globalThis.fetch;

beforeEach(() => {
  localStorage.clear();
  loadGistMock.mockReset();
  // Reset fetch mock
  globalThis.fetch = originalFetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
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

describe('ProgressStorage flushSync', () => {
  it('skips sync when githubToken is missing', () => {
    const storage = makeStorage();
    storage.updateSettings({ gistId: 'gist123' });
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock;

    storage.flushSync();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('skips sync when gistId is missing', () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token123' });
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock;

    storage.flushSync();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('calls fetch with correct URL and method', () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'mytoken', gistId: 'mygist' });
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    globalThis.fetch = fetchMock;

    storage.flushSync();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.github.com/gists/mygist');
    expect(options.method).toBe('PATCH');
  });

  it('uses correct authorization header format (token, not Bearer)', () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'ghp_testtoken123', gistId: 'abc123' });
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    globalThis.fetch = fetchMock;

    storage.flushSync();

    const [, options] = fetchMock.mock.calls[0];
    // Critical: Must use 'token' format, not 'Bearer'
    expect(options.headers['Authorization']).toBe('token ghp_testtoken123');
    expect(options.headers['Authorization']).not.toContain('Bearer');
  });

  it('sets keepalive option for reliable delivery during unload', () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token', gistId: 'gist' });
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    globalThis.fetch = fetchMock;

    storage.flushSync();

    const [, options] = fetchMock.mock.calls[0];
    expect(options.keepalive).toBe(true);
  });

  it('sends progress data in the request body', () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token', gistId: 'gist' });
    storage.addToSelection('cs101');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    globalThis.fetch = fetchMock;

    storage.flushSync();

    const [, options] = fetchMock.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.files).toBeDefined();
    expect(body.files['study-program-progress.json']).toBeDefined();
    const content = JSON.parse(body.files['study-program-progress.json'].content);
    expect(content.selectedSubjectIds).toContain('cs101');
  });

  it('excludes sensitive settings from sync payload', () => {
    const storage = makeStorage();
    storage.updateSettings({
      githubToken: 'secret-token',
      gistId: 'gist-id',
      geminiApiKey: 'secret-api-key',
      theme: 'dark',
    });
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    globalThis.fetch = fetchMock;

    storage.flushSync();

    const [, options] = fetchMock.mock.calls[0];
    const body = JSON.parse(options.body);
    const content = JSON.parse(body.files['study-program-progress.json'].content);
    // Sensitive settings should be excluded
    expect(content.settings.githubToken).toBeUndefined();
    expect(content.settings.gistId).toBeUndefined();
    expect(content.settings.geminiApiKey).toBeUndefined();
    // Non-sensitive settings should be included
    expect(content.settings.theme).toBe('dark');
  });

  it('cancels pending debounced sync when flushSync is called', () => {
    vi.useFakeTimers();
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token', gistId: 'gist' });
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    globalThis.fetch = fetchMock;

    // Trigger a debounced sync via save()
    storage.addToSelection('cs101');
    expect(fetchMock).not.toHaveBeenCalled(); // Debounced, not called yet

    // Call flushSync - should cancel the pending debounce
    storage.flushSync();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Advance timers past debounce period - should NOT trigger another call
    vi.advanceTimersByTime(10000);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('silently handles fetch errors', () => {
    const storage = makeStorage();
    storage.updateSettings({ githubToken: 'token', gistId: 'gist' });
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network error'));
    globalThis.fetch = fetchMock;

    // Should not throw
    expect(() => storage.flushSync()).not.toThrow();
  });
});
