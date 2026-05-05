import fs from 'node:fs';
import path from 'node:path';
import { listFilesRecursive } from './fs-state.js';
import {
  defaultBundledPackDir,
  loadPackContentIndex,
  loadPackSubjects,
} from './content-pack.js';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function fallbackLoadSubjects(rootDir) {
  const filePath = path.join(rootDir, 'docs', 'SUBJECTS_LIST.json');
  const parsed = readJson(filePath);
  return Array.isArray(parsed.subjects) ? parsed.subjects : [];
}

export function loadSubjects(rootDir) {
  const packDir = defaultBundledPackDir(rootDir);
  if (fs.existsSync(path.join(packDir, 'pack.yaml'))) {
    return loadPackSubjects(packDir);
  }
  return fallbackLoadSubjects(rootDir);
}

export function loadSubjectContentIndex(rootDir) {
  const packDir = defaultBundledPackDir(rootDir);
  if (fs.existsSync(path.join(packDir, 'pack.yaml'))) {
    return loadPackContentIndex(packDir);
  }
  return { quizzes: [], exercises: [], exams: [], projects: [] };
}

export function buildLookupMaps(index) {
  const quizById = new Map(index.quizzes.map((q) => [q.id, q]));
  const exerciseById = new Map(index.exercises.map((e) => [e.id, e]));
  const examById = new Map(index.exams.map((e) => [e.id, e]));
  const projectById = new Map(index.projects.map((p) => [p.id, p]));
  return { quizById, exerciseById, examById, projectById };
}

export function subjectSourceDir(rootDir, subjectId) {
  return path.join(defaultBundledPackDir(rootDir), 'subjects', subjectId);
}

export function collectMarkdownFiles(rootDir, subjectId) {
  const sourceDir = subjectSourceDir(rootDir, subjectId);
  const contentDir = path.join(sourceDir, 'content');
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return listFilesRecursive(contentDir)
    .filter((filePath) => filePath.endsWith('.md'))
    .sort();
}
