import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { loadResolvedContentGraph } from '../cli/lib/content-pack.js';
import { startStupServer } from '../cli/lib/server.js';
import { resolveRuntimeConfig } from '../cli/lib/runtime-config.js';
import { readLearnerEvents } from '../cli/lib/learner-core.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packDir = path.join(rootDir, 'content', 'bundled-packs', 'cs-degree');

describe('v2 local server mode', () => {
  let tmpDir: string;
  let server: Awaited<ReturnType<typeof startStupServer>>;

  beforeAll(async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stup-v2-server-'));
    const config = resolveRuntimeConfig({
      rootDir,
      options: {
        'content-pack': packDir,
        'learner-home': path.join(tmpDir, 'learner'),
        'cache-home': path.join(tmpDir, 'cache'),
      },
    });
    server = await startStupServer(config, {
      rootDir,
      host: '127.0.0.1',
      port: 0,
      apiOnly: true,
    });
  });

  afterAll(async () => {
    await server?.close();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('resolves full pack content for API use', () => {
    const graph = loadResolvedContentGraph([packDir]);
    const cs101 = graph.subjects.find((subject) => subject.id === 'cs101');
    const topic1 = cs101?.topics.find((topic) => topic.id === 'cs101-topic-1');

    expect(graph.packs[0].id).toBe('cs-degree');
    expect(graph.subjects).toHaveLength(38);
    expect(Object.keys(graph.concepts)).toHaveLength(307);
    expect(topic1?.title).toBe('Variables and Data Types');
    expect(topic1?.content).toContain('Welcome to your first step');
    expect(topic1?.subtopics).toHaveLength(7);
    expect(graph.activities.length).toBe(5309);
  });

  it('serves resolved subjects, assessments, tracks, and plan validation', async () => {
    const subjects = await fetch(`${server.url}/api/subjects`).then((response) => response.json());
    const cs101 = await fetch(`${server.url}/api/subjects/cs101`).then((response) => response.json());
    const tracks = await fetch(`${server.url}/api/tracks`).then((response) => response.json());
    const plan = await fetch(`${server.url}/api/plans/active`).then((response) => response.json());

    expect(subjects).toHaveLength(38);
    expect(cs101.assessments.quizzes).toHaveLength(21);
    expect(tracks.map((track: { id: string }) => track.id)).toContain('full-cs-degree');
    expect(plan.validation.ok).toBe(true);
  });

  it('writes learner events outside the pack and derives a profile', async () => {
    const event = {
      type: 'answer_submitted',
      activityId: 'cs101-quiz-1',
      questionId: 'q-smoke',
      correct: false,
      conceptTags: ['programming.variables'],
    };

    const append = await fetch(`${server.url}/api/learner/events`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(event),
    }).then((response) => response.json());
    const profile = await fetch(`${server.url}/api/learner/derive`, {
      method: 'POST',
    }).then((response) => response.json());

    expect(append.ok).toBe(true);
    expect(readLearnerEvents(path.join(tmpDir, 'learner'))).toHaveLength(1);
    expect(profile.conceptMastery['programming.variables']).toBe(0);
    expect(profile.recommendedActions[0].type).toBe('remediation');
    expect(fs.existsSync(path.join(tmpDir, 'learner', 'events.jsonl'))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, 'learner', 'profile.json'))).toBe(true);
  });

  it('reindexes and exposes validation cache state', async () => {
    const reindex = await fetch(`${server.url}/api/content/reindex`, {
      method: 'POST',
    }).then((response) => response.json());
    const validation = await fetch(`${server.url}/api/content/validation`).then((response) => response.json());

    expect(reindex.ok).toBe(true);
    expect(validation.ok).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, 'cache', 'content-validation-cache.json'))).toBe(true);
  });
});
