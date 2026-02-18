import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { ANSWERS_DIR } from './constants.js';
import { makeAttemptId, nowIso } from './utils.js';
import { writeText } from './fs-state.js';

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeYaml(filePath, value) {
  writeText(filePath, YAML.stringify(value));
}

function readYaml(filePath) {
  return YAML.parse(fs.readFileSync(filePath, 'utf8'));
}

function sortedAttemptIds(baseDir) {
  if (!fs.existsSync(baseDir)) {
    return [];
  }

  return fs.readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function getQuizAttemptRoot(rootDir, quizId) {
  return path.join(rootDir, ANSWERS_DIR, 'quizzes', quizId);
}

export function getExerciseAttemptRoot(rootDir, exerciseId) {
  return path.join(rootDir, ANSWERS_DIR, 'exercises', exerciseId);
}

export function resolveLatestAttemptDir(baseDir) {
  const ids = sortedAttemptIds(baseDir);
  if (ids.length === 0) {
    return null;
  }
  const latest = ids[ids.length - 1];
  return path.join(baseDir, latest);
}

export function resolveAttemptDir(baseDir, attemptId) {
  if (attemptId) {
    const candidate = path.join(baseDir, attemptId);
    if (!fs.existsSync(candidate)) {
      throw new Error(`attempt not found: ${attemptId}`);
    }
    return candidate;
  }

  const latest = resolveLatestAttemptDir(baseDir);
  if (!latest) {
    throw new Error(`no attempts found in ${baseDir}`);
  }
  return latest;
}

function inferExtensionForLanguage(language) {
  switch ((language || '').toLowerCase()) {
    case 'python': return 'py';
    case 'javascript': return 'js';
    case 'typescript': return 'ts';
    case 'c': return 'c';
    case 'cpp': return 'cpp';
    case 'java': return 'java';
    case 'rust': return 'rs';
    case 'go': return 'go';
    case 'sql': return 'sql';
    case 'bash': return 'sh';
    default: return 'txt';
  }
}

export function createQuizAttempt(rootDir, quiz) {
  const attemptId = makeAttemptId();
  const attemptDir = path.join(getQuizAttemptRoot(rootDir, quiz.id), attemptId);
  const codeDir = path.join(attemptDir, 'code');
  const resultsDir = path.join(attemptDir, 'results');

  ensureDir(codeDir);
  ensureDir(resultsDir);

  const answers = {};

  for (const question of quiz.questions || []) {
    const entry = {
      type: question.type,
    };

    if (question.type === 'coding') {
      const ext = inferExtensionForLanguage(question.language);
      const relativePath = path.posix.join('code', `${question.id}.${ext}`);
      entry.language = question.language || 'python';
      entry.file = relativePath;

      const codeFilePath = path.join(attemptDir, relativePath);
      const starter = question.starterCode || question.solution || '';
      writeText(codeFilePath, `${starter}\n`);
    } else {
      entry.answer = null;
    }

    answers[question.id] = entry;
  }

  const attempt = {
    version: 1,
    kind: 'quiz_attempt',
    quizId: quiz.id,
    attemptId,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: 'in_progress',
    answers,
    notes: '',
  };

  const attemptPath = path.join(attemptDir, 'attempt.yaml');
  writeYaml(attemptPath, attempt);

  return {
    attemptId,
    attemptDir,
    attemptPath,
  };
}

export function createExerciseAttempt(rootDir, exercise) {
  const attemptId = makeAttemptId();
  const attemptDir = path.join(getExerciseAttemptRoot(rootDir, exercise.id), attemptId);
  const resultsDir = path.join(attemptDir, 'results');

  ensureDir(attemptDir);
  ensureDir(resultsDir);

  const isWritten = exercise.type === 'written';
  let answerFilePath = null;
  let solutionFilePath = null;

  const attempt = {
    version: 1,
    kind: 'exercise_attempt',
    exerciseId: exercise.id,
    attemptId,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: 'in_progress',
    exerciseType: isWritten ? 'written' : 'coding',
    notes: '',
  };

  if (isWritten) {
    answerFilePath = path.join(attemptDir, 'answer.md');
    writeText(answerFilePath, `# ${exercise.title}\n\n${exercise.description}\n\n## My Answer\n\n`);
    attempt.answerFile = 'answer.md';
  } else {
    const language = exercise.language || 'python';
    const ext = inferExtensionForLanguage(language);
    solutionFilePath = path.join(attemptDir, `solution.${ext}`);
    writeText(solutionFilePath, `${exercise.starterCode || ''}\n`);
    attempt.language = language;
    attempt.solutionFile = `solution.${ext}`;
    attempt.runtime = {
      timeoutSeconds: 8,
      memoryMb: 256,
    };
  }

  const attemptPath = path.join(attemptDir, 'attempt.yaml');
  writeYaml(attemptPath, attempt);

  return {
    attemptId,
    attemptDir,
    attemptPath,
    answerFilePath,
    solutionFilePath,
  };
}

export function loadQuizAttempt(attemptDir) {
  const attemptPath = path.join(attemptDir, 'attempt.yaml');
  if (!fs.existsSync(attemptPath)) {
    throw new Error(`missing attempt.yaml in ${attemptDir}`);
  }
  return {
    attemptPath,
    attempt: readYaml(attemptPath),
  };
}

export function loadExerciseAttempt(attemptDir) {
  const attemptPath = path.join(attemptDir, 'attempt.yaml');
  if (!fs.existsSync(attemptPath)) {
    throw new Error(`missing attempt.yaml in ${attemptDir}`);
  }
  return {
    attemptPath,
    attempt: readYaml(attemptPath),
  };
}

export function updateAttemptStatus(attemptPath, attempt, status) {
  const next = {
    ...attempt,
    status,
    updatedAt: nowIso(),
  };
  writeYaml(attemptPath, next);
  return next;
}

export function writeLatestCheckResult(attemptDir, result) {
  const filePath = path.join(attemptDir, 'results', 'latest-check.json');
  writeText(filePath, `${JSON.stringify(result, null, 2)}\n`);
  return filePath;
}

export function readCodeReference(attemptDir, entry) {
  if (typeof entry.code === 'string' && entry.code.trim()) {
    return entry.code;
  }

  if (typeof entry.file === 'string' && entry.file.trim()) {
    const filePath = path.join(attemptDir, entry.file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`missing code file: ${entry.file}`);
    }
    return fs.readFileSync(filePath, 'utf8');
  }

  throw new Error('coding answer missing both code and file fields');
}

export function readExerciseAnswerCode(attemptDir, attempt) {
  if (attempt.exerciseType === 'written') {
    const answerFile = attempt.answerFile;
    if (!answerFile) {
      throw new Error('written exercise attempt missing answerFile');
    }
    const filePath = path.join(attemptDir, answerFile);
    if (!fs.existsSync(filePath)) {
      throw new Error(`missing answer file: ${answerFile}`);
    }
    return fs.readFileSync(filePath, 'utf8');
  }

  const solutionFile = attempt.solutionFile;
  if (!solutionFile) {
    throw new Error('coding exercise attempt missing solutionFile');
  }

  const filePath = path.join(attemptDir, solutionFile);
  if (!fs.existsSync(filePath)) {
    throw new Error(`missing solution file: ${solutionFile}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}
