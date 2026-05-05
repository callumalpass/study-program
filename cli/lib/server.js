import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { loadResolvedContentGraph, validateContentPack } from './content-pack.js';
import {
  appendLearnerEvent,
  appendLearnerEvents,
  deriveAndSaveLearnerProfile,
  ensureLearnerHome,
  loadLearnerProfile,
  readLearnerEvents,
} from './learner-core.js';
import { loadActivePlan, validatePlan } from './plans.js';

function sendJson(res, status, value) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(`${JSON.stringify(value, null, 2)}\n`);
}

function sendText(res, status, value) {
  res.writeHead(status, {
    'content-type': 'text/plain; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(value);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function writeValidationCache(cacheHome, graph) {
  fs.mkdirSync(cacheHome, { recursive: true });
  const filePath = path.join(cacheHome, 'content-validation-cache.json');
  const payload = {
    generatedAt: new Date().toISOString(),
    packs: graph.packs.map((pack) => ({ id: pack.id, version: pack.version, packDir: pack.packDir })),
    validation: graph.validation,
  };
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  return filePath;
}

function subjectAssessments(graph, subjectId) {
  return {
    quizzes: graph.quizzes.filter((item) => item.subjectId === subjectId),
    exercises: graph.exercises.filter((item) => item.subjectId === subjectId),
    exams: graph.exams.filter((item) => item.subjectId === subjectId),
    projects: graph.projects.filter((item) => item.subjectId === subjectId),
  };
}

function allAssessments(graph) {
  return {
    quizzes: graph.quizzes,
    exercises: graph.exercises,
    exams: graph.exams,
    projects: graph.projects,
  };
}

function validationSummary(graph) {
  const issues = graph.validation.flatMap((result) => result.issues);
  const errors = issues.filter((issue) => issue.severity === 'error');
  const warnings = issues.filter((issue) => issue.severity === 'warning');
  return {
    ok: errors.length === 0,
    errors,
    warnings,
    issues,
    packs: graph.validation,
  };
}

export function createApiHandler(config) {
  ensureLearnerHome(config.learnerHome);
  let graph = loadResolvedContentGraph(config.contentPackDirs);
  let validationCachePath = writeValidationCache(config.cacheHome, graph);

  function reindex() {
    graph = loadResolvedContentGraph(config.contentPackDirs);
    validationCachePath = writeValidationCache(config.cacheHome, graph);
    return graph;
  }

  async function handle(req, res) {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = decodeURIComponent(url.pathname);

    if (!pathname.startsWith('/api/')) return false;

    try {
      if (req.method === 'GET' && pathname === '/api/packs') {
        sendJson(res, 200, {
          packs: graph.packs,
          contentHomes: config.contentHomes,
          contentPackDirs: config.contentPackDirs,
          authoringPack: config.authoringPack,
          learnerHome: config.learnerHome,
        });
        return true;
      }

      if (req.method === 'GET' && pathname === '/api/concepts') {
        sendJson(res, 200, graph.concepts);
        return true;
      }

      if (req.method === 'GET' && pathname === '/api/subjects') {
        sendJson(res, 200, graph.subjects);
        return true;
      }

      const subjectAssessmentsMatch = pathname.match(/^\/api\/subjects\/([^/]+)\/assessments$/);
      if (req.method === 'GET' && subjectAssessmentsMatch) {
        sendJson(res, 200, subjectAssessments(graph, subjectAssessmentsMatch[1]));
        return true;
      }

      const subjectMatch = pathname.match(/^\/api\/subjects\/([^/]+)$/);
      if (req.method === 'GET' && subjectMatch) {
        const subject = graph.subjects.find((item) => item.id === subjectMatch[1]);
        if (!subject) sendJson(res, 404, { error: 'subject_not_found' });
        else sendJson(res, 200, { ...subject, assessments: subjectAssessments(graph, subject.id) });
        return true;
      }

      const topicMatch = pathname.match(/^\/api\/topics\/([^/]+)$/);
      if (req.method === 'GET' && topicMatch) {
        const topic = graph.topics.find((item) => item.id === topicMatch[1]);
        if (!topic) sendJson(res, 404, { error: 'topic_not_found' });
        else sendJson(res, 200, topic);
        return true;
      }

      if (req.method === 'GET' && pathname === '/api/activities') {
        const subjectId = url.searchParams.get('subjectId');
        if (subjectId) {
          sendJson(res, 200, {
            ...subjectAssessments(graph, subjectId),
            activities: graph.activities.filter((item) => item.subjectId === subjectId),
          });
        } else {
          sendJson(res, 200, { ...allAssessments(graph), activities: graph.activities });
        }
        return true;
      }

      const activityMatch = pathname.match(/^\/api\/activities\/([^/]+)$/);
      if (req.method === 'GET' && activityMatch) {
        const activity = graph.activities.find((item) => item.id === activityMatch[1]);
        if (!activity) sendJson(res, 404, { error: 'activity_not_found' });
        else sendJson(res, 200, activity);
        return true;
      }

      if (req.method === 'GET' && pathname === '/api/tracks') {
        sendJson(res, 200, graph.tracks);
        return true;
      }

      if (req.method === 'GET' && pathname === '/api/plans/active') {
        const plan = loadActivePlan(config.learnerHome, graph, { writeDefault: true });
        sendJson(res, 200, { plan, validation: validatePlan(plan, graph) });
        return true;
      }

      if (req.method === 'GET' && pathname === '/api/learner/profile') {
        const profile = loadLearnerProfile(config.learnerHome) || deriveAndSaveLearnerProfile(config.learnerHome, graph);
        sendJson(res, 200, profile);
        return true;
      }

      if (req.method === 'GET' && pathname === '/api/learner/events') {
        const limit = Number(url.searchParams.get('limit') || 0);
        const events = readLearnerEvents(config.learnerHome);
        sendJson(res, 200, limit > 0 ? events.slice(-limit) : events);
        return true;
      }

      if (req.method === 'POST' && pathname === '/api/learner/events') {
        const body = await readBody(req);
        const events = Array.isArray(body?.events)
          ? appendLearnerEvents(config.learnerHome, body.events)
          : [appendLearnerEvent(config.learnerHome, body)];
        sendJson(res, 201, { ok: true, events });
        return true;
      }

      if (req.method === 'POST' && pathname === '/api/learner/derive') {
        const profile = deriveAndSaveLearnerProfile(config.learnerHome, graph);
        sendJson(res, 200, profile);
        return true;
      }

      if (req.method === 'POST' && pathname === '/api/content/reindex') {
        reindex();
        sendJson(res, 200, {
          ok: true,
          generatedAt: graph.generatedAt,
          validationCachePath,
          validation: validationSummary(graph),
        });
        return true;
      }

      if (req.method === 'GET' && pathname === '/api/content/validation') {
        sendJson(res, 200, {
          validationCachePath,
          ...validationSummary(graph),
        });
        return true;
      }

      if (req.method === 'POST' && pathname === '/api/content/validate') {
        const validation = config.contentPackDirs.map((packDir) => validateContentPack(packDir));
        sendJson(res, 200, {
          ok: validation.every((result) => result.ok),
          packs: validation,
        });
        return true;
      }

      sendJson(res, 404, { error: 'not_found' });
      return true;
    } catch (error) {
      sendJson(res, 500, {
        error: 'internal_error',
        message: error instanceof Error ? error.message : String(error),
      });
      return true;
    }
  }

  return {
    handle,
    getGraph: () => graph,
    reindex,
  };
}

export async function startStupServer(config, options = {}) {
  const api = createApiHandler(config);
  let vite = null;

  if (!options.apiOnly) {
    const { createServer } = await import('vite');
    vite = await createServer({
      root: options.rootDir,
      server: { middlewareMode: true },
      appType: 'spa',
      logLevel: 'warn',
    });
  }

  const server = http.createServer(async (req, res) => {
    const handled = await api.handle(req, res);
    if (handled) return;
    if (vite) {
      vite.middlewares(req, res);
      return;
    }
    sendText(res, 404, 'not found');
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(options.port, options.host, () => {
      server.off('error', reject);
      resolve();
    });
  });

  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : options.port;
  const host = options.host || '127.0.0.1';

  return {
    server,
    api,
    url: `http://${host}:${port}`,
    async close() {
      if (vite) await vite.close();
      await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    },
  };
}
