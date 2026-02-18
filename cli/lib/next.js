import fs from 'node:fs';
import path from 'node:path';
import { QUIZ_PASSING_SCORE } from './constants.js';
import { listFilesRecursive } from './fs-state.js';

function parseFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, content: markdown };
  }

  const [, yamlBlock, content] = match;
  const frontmatter = {};

  for (const line of yamlBlock.split('\n')) {
    const idx = line.indexOf(':');
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (/^(0|[1-9]\d*)$/.test(value)) {
      frontmatter[key] = Number.parseInt(value, 10);
    } else {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content };
}

function extractTitleFromContent(content) {
  const withoutFencedCode = content.replace(/^(```|~~~)[\s\S]*?^\1/gm, '');
  const match = withoutFencedCode.match(/^#[ \t]+(.+)$/m);
  return match ? match[1].trim() : null;
}

function slugFromFilename(filename) {
  return filename
    .replace(/^\d+-/, '')
    .replace(/\.md$/, '')
    .toLowerCase();
}

function parseTopicNumberFromPath(filePath) {
  const match = filePath.match(/topic-(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function parseOrderFromFilename(filename) {
  const match = filename.match(/^(\d+)-/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function parseTopicNumber(topicId) {
  if (!topicId || typeof topicId !== 'string') return 0;
  let match = topicId.match(/-topic-(\d+)$/);
  if (!match) {
    match = topicId.match(/-(\d+)$/);
  }
  return match ? Number.parseInt(match[1], 10) : 0;
}

function sortByTopicAndId(a, b) {
  const ta = parseTopicNumber(a.topicId);
  const tb = parseTopicNumber(b.topicId);
  if (ta !== tb) return ta - tb;
  return String(a.id).localeCompare(String(b.id));
}

function hasQuizPassed(subjectProgress, quizId) {
  const attempts = subjectProgress?.quizAttempts?.[quizId] || [];
  if (attempts.length === 0) return false;
  const best = Math.max(...attempts.map((a) => a.score ?? 0));
  return best >= QUIZ_PASSING_SCORE;
}

function hasExercisePassed(subjectProgress, exerciseId) {
  return Boolean(subjectProgress?.exerciseCompletions?.[exerciseId]?.passed);
}

function listSubtopicsForSubject(rootDir, subjectId) {
  const contentDir = path.join(rootDir, 'src', 'subjects', subjectId, 'content');
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = listFilesRecursive(contentDir)
    .filter((filePath) => filePath.endsWith('.md'))
    .filter((filePath) => /topic-\d+\/.+\.md$/.test(filePath))
    .sort();

  const subtopics = [];

  for (const filePath of files) {
    const filename = path.basename(filePath);
    const markdown = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content } = parseFrontmatter(markdown);

    const topicNumber = parseTopicNumberFromPath(filePath);
    const order = Number.isInteger(frontmatter.order)
      ? frontmatter.order
      : parseOrderFromFilename(filename);

    const slug = typeof frontmatter.slug === 'string' && frontmatter.slug
      ? frontmatter.slug
      : slugFromFilename(filename);

    const title = typeof frontmatter.title === 'string' && frontmatter.title
      ? frontmatter.title
      : (extractTitleFromContent(content) || slug);

    const id = typeof frontmatter.id === 'string' && frontmatter.id
      ? frontmatter.id
      : `${subjectId}-t${topicNumber}-${slug.replace(/-/g, '')}`;

    subtopics.push({
      id,
      title,
      topicNumber,
      order,
      filePath,
    });
  }

  subtopics.sort((a, b) => {
    if (a.topicNumber !== b.topicNumber) return a.topicNumber - b.topicNumber;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  return subtopics;
}

function orderedSubjects(subjects, progress) {
  const selected = Array.isArray(progress.selectedSubjectIds) ? progress.selectedSubjectIds : [];
  const selectedSet = new Set(selected);
  return subjects.filter((subject) => selectedSet.size === 0 || selectedSet.has(subject.id));
}

export function getNextStudyItems({ rootDir, subjects, index, progress }) {
  const ordered = orderedSubjects(subjects, progress);

  let nextReading = null;
  let nextQuiz = null;
  let nextExercise = null;

  for (const subject of ordered) {
    const subjectProgress = progress.subjects?.[subject.id] || {};

    if (!nextReading) {
      const subtopics = listSubtopicsForSubject(rootDir, subject.id);
      for (const subtopic of subtopics) {
        if (!subjectProgress.subtopicViews?.[subtopic.id]) {
          nextReading = {
            kind: 'reading',
            subjectId: subject.id,
            subjectCode: subject.code,
            subjectTitle: subject.title,
            subtopicId: subtopic.id,
            title: subtopic.title,
            topicNumber: subtopic.topicNumber,
            filePath: subtopic.filePath,
          };
          break;
        }
      }
    }

    if (!nextQuiz) {
      const subjectQuizzes = index.quizzes
        .filter((quiz) => quiz.subjectId === subject.id)
        .sort(sortByTopicAndId);

      for (const quiz of subjectQuizzes) {
        if (!hasQuizPassed(subjectProgress, quiz.id)) {
          nextQuiz = {
            kind: 'quiz',
            subjectId: subject.id,
            subjectCode: subject.code,
            subjectTitle: subject.title,
            quizId: quiz.id,
            title: quiz.title,
            topicId: quiz.topicId,
          };
          break;
        }
      }
    }

    if (!nextExercise) {
      const subjectExercises = index.exercises
        .filter((exercise) => exercise.subjectId === subject.id)
        .sort(sortByTopicAndId);

      for (const exercise of subjectExercises) {
        if (!hasExercisePassed(subjectProgress, exercise.id)) {
          nextExercise = {
            kind: 'exercise',
            subjectId: subject.id,
            subjectCode: subject.code,
            subjectTitle: subject.title,
            exerciseId: exercise.id,
            title: exercise.title,
            topicId: exercise.topicId,
          };
          break;
        }
      }
    }

    if (nextReading && nextQuiz && nextExercise) {
      break;
    }
  }

  return {
    reading: nextReading,
    quiz: nextQuiz,
    exercise: nextExercise,
  };
}
