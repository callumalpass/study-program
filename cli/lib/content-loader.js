import fs from 'node:fs';
import path from 'node:path';
import { listDirectories, listFilesRecursive } from './fs-state.js';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizeExercise(exercise, subjectId) {
  return {
    ...exercise,
    subjectId: exercise.subjectId || subjectId,
  };
}

function normalizeQuiz(quiz, subjectId, topicId) {
  return {
    ...quiz,
    subjectId: quiz.subjectId || subjectId,
    topicId: quiz.topicId || topicId,
  };
}

function inferTopicId(subjectId, topicDirName) {
  const match = topicDirName.match(/topic-(\d+)/);
  if (!match) {
    return `${subjectId}-${topicDirName}`;
  }
  return `${subjectId}-topic-${Number(match[1])}`;
}

export function loadSubjects(rootDir) {
  const filePath = path.join(rootDir, 'docs', 'SUBJECTS_LIST.json');
  const parsed = readJson(filePath);
  return Array.isArray(parsed.subjects) ? parsed.subjects : [];
}

export function loadSubjectContentIndex(rootDir) {
  const subjectsDir = path.join(rootDir, 'src', 'subjects');
  const subjectDirs = listDirectories(subjectsDir);

  const quizzes = [];
  const exercises = [];
  const exams = [];
  const projects = [];

  for (const subjectId of subjectDirs) {
    const subjectDir = path.join(subjectsDir, subjectId);

    const examsPath = path.join(subjectDir, 'exams.json');
    if (fs.existsSync(examsPath)) {
      const data = readJson(examsPath);
      if (Array.isArray(data)) {
        for (const exam of data) {
          exams.push({ ...exam, subjectId: exam.subjectId || subjectId });
        }
      }
    }

    const projectsPath = path.join(subjectDir, 'projects.json');
    if (fs.existsSync(projectsPath)) {
      const data = readJson(projectsPath);
      if (Array.isArray(data)) {
        for (const project of data) {
          projects.push({ ...project, subjectId: project.subjectId || subjectId });
        }
      }
    }

    const contentDir = path.join(subjectDir, 'content');
    if (!fs.existsSync(contentDir)) {
      continue;
    }

    const topicDirs = listDirectories(contentDir).filter((d) => d.startsWith('topic-'));

    for (const topicDirName of topicDirs) {
      const topicDir = path.join(contentDir, topicDirName);
      const topicId = inferTopicId(subjectId, topicDirName);

      const quizzesPath = path.join(topicDir, 'quizzes.json');
      if (fs.existsSync(quizzesPath)) {
        const data = readJson(quizzesPath);
        if (Array.isArray(data)) {
          for (const quiz of data) {
            quizzes.push(normalizeQuiz(quiz, subjectId, topicId));
          }
        }
      }

      const exercisesPath = path.join(topicDir, 'exercises.json');
      if (fs.existsSync(exercisesPath)) {
        const data = readJson(exercisesPath);
        if (Array.isArray(data)) {
          for (const exercise of data) {
            exercises.push(normalizeExercise(exercise, subjectId));
          }
        }
      }
    }
  }

  return { quizzes, exercises, exams, projects };
}

export function buildLookupMaps(index) {
  const quizById = new Map(index.quizzes.map((q) => [q.id, q]));
  const exerciseById = new Map(index.exercises.map((e) => [e.id, e]));
  const examById = new Map(index.exams.map((e) => [e.id, e]));
  const projectById = new Map(index.projects.map((p) => [p.id, p]));
  return { quizById, exerciseById, examById, projectById };
}

export function subjectSourceDir(rootDir, subjectId) {
  return path.join(rootDir, 'src', 'subjects', subjectId);
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
