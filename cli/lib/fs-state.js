import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { ANSWERS_DIR, CONFIG_PATH, CONTENT_DIR, CURRENT_PROGRESS_VERSION, PROGRESS_PATH, STATE_DIR, STUP_DIR } from './constants.js';
import { nowIso } from './utils.js';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export function resolveWorkspaceRoot(cwd = process.cwd()) {
  const marker = path.join(cwd, 'src', 'subjects');
  if (!fs.existsSync(marker)) {
    throw new Error(`expected src/subjects under ${cwd}`);
  }
  return cwd;
}

export function ensureStupDirs(rootDir) {
  for (const rel of [STUP_DIR, STATE_DIR, ANSWERS_DIR, CONTENT_DIR]) {
    fs.mkdirSync(path.join(rootDir, rel), { recursive: true });
  }
}

export function loadSubjectIds(rootDir) {
  const filePath = path.join(rootDir, 'docs', 'SUBJECTS_LIST.json');
  const parsed = readJson(filePath);
  return Array.isArray(parsed.subjects) ? parsed.subjects.map((s) => s.id) : [];
}

export function defaultProgress(rootDir) {
  const allSubjectIds = loadSubjectIds(rootDir);
  return {
    version: CURRENT_PROGRESS_VERSION,
    startedAt: nowIso(),
    lastUpdated: nowIso(),
    subjects: {},
    settings: {
      theme: 'auto',
      codeEditorFontSize: 14,
      showCompletedItems: true,
    },
    reviewQueue: [],
    selectedSubjectIds: allSubjectIds,
  };
}

export function migrateProgress(progress, rootDir) {
  const migrated = { ...progress };
  if (!migrated.version || migrated.version < CURRENT_PROGRESS_VERSION) {
    migrated.version = CURRENT_PROGRESS_VERSION;
  }

  if (!migrated.startedAt) {
    migrated.startedAt = nowIso();
  }

  if (!migrated.subjects || typeof migrated.subjects !== 'object') {
    migrated.subjects = {};
  }

  if (!migrated.settings || typeof migrated.settings !== 'object') {
    migrated.settings = {
      theme: 'auto',
      codeEditorFontSize: 14,
      showCompletedItems: true,
    };
  }

  if (!Array.isArray(migrated.reviewQueue)) {
    migrated.reviewQueue = [];
  }

  if (!Array.isArray(migrated.selectedSubjectIds)) {
    migrated.selectedSubjectIds = loadSubjectIds(rootDir);
  }

  for (const [subjectId, subjectProgress] of Object.entries(migrated.subjects)) {
    const base = subjectProgress || {};
    migrated.subjects[subjectId] = {
      status: base.status || 'not_started',
      startedAt: base.startedAt,
      completedAt: base.completedAt,
      quizAttempts: base.quizAttempts || {},
      examAttempts: base.examAttempts || {},
      exerciseCompletions: base.exerciseCompletions || {},
      projectSubmissions: base.projectSubmissions || {},
      subtopicViews: base.subtopicViews || {},
    };
  }

  return migrated;
}

export function loadProgress(rootDir) {
  const filePath = path.join(rootDir, PROGRESS_PATH);
  if (!fs.existsSync(filePath)) {
    const progress = defaultProgress(rootDir);
    writeJson(filePath, progress);
    return progress;
  }
  return migrateProgress(readJson(filePath), rootDir);
}

export function saveProgress(rootDir, progress) {
  const filePath = path.join(rootDir, PROGRESS_PATH);
  const next = { ...progress, lastUpdated: nowIso() };
  writeJson(filePath, next);
  return next;
}

export function loadConfig(rootDir) {
  const filePath = path.join(rootDir, CONFIG_PATH);
  if (!fs.existsSync(filePath)) {
    return {};
  }
  return readJson(filePath);
}

export function saveConfig(rootDir, config) {
  const filePath = path.join(rootDir, CONFIG_PATH);
  writeJson(filePath, config);
  return config;
}

export function ensureSubjectProgress(progress, subjectId) {
  if (!progress.subjects[subjectId]) {
    progress.subjects[subjectId] = {
      status: 'in_progress',
      startedAt: nowIso(),
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
      subtopicViews: {},
    };
  }

  const subjectProgress = progress.subjects[subjectId];
  subjectProgress.quizAttempts ||= {};
  subjectProgress.examAttempts ||= {};
  subjectProgress.exerciseCompletions ||= {};
  subjectProgress.projectSubmissions ||= {};
  subjectProgress.subtopicViews ||= {};

  if (subjectProgress.status === 'not_started') {
    subjectProgress.status = 'in_progress';
  }

  if (!subjectProgress.startedAt) {
    subjectProgress.startedAt = nowIso();
  }

  return subjectProgress;
}

export function writeText(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

export function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

export function pathExists(filePath) {
  return fs.existsSync(filePath);
}

export function listDirectories(dirPath) {
  return fs.readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function listFilesRecursive(baseDir) {
  const out = [];
  const stack = [baseDir];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
      } else if (entry.isFile()) {
        out.push(abs);
      }
    }
  }

  return out;
}

export function copyDir(sourceDir, targetDir) {
  fs.mkdirSync(path.dirname(targetDir), { recursive: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });
}
