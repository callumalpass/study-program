#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import {
  createExerciseAttempt,
  createQuizAttempt,
  getExerciseAttemptRoot,
  getQuizAttemptRoot,
  loadExerciseAttempt,
  loadQuizAttempt,
  readCodeReference,
  readExerciseAnswerCode,
  resolveAttemptDir,
  updateAttemptStatus,
  writeLatestCheckResult,
} from './lib/attempts.js';
import {
  buildLookupMaps,
  loadSubjectContentIndex,
  loadSubjects,
  subjectSourceDir,
} from './lib/content-loader.js';
import { QUIZ_PASSING_SCORE } from './lib/constants.js';
import {
  copyDir,
  ensureStupDirs,
  loadConfig,
  loadProgress,
  migrateProgress,
  resolveWorkspaceRoot,
  saveConfig,
  saveProgress,
} from './lib/fs-state.js';
import {
  createProgressGist,
  findProgressGist,
  loadProgressGist,
  updateProgressGist,
  validateToken,
} from './lib/gist.js';
import {
  applyRemoteProgress,
  getProgressSummary,
  hasAnyRecordedProgress,
  mergeRemoteIntoLocalProgress,
  recordSubtopicView,
  recordExerciseCompletion,
  recordQuizAttempt,
  stripSensitiveForGist,
} from './lib/progress-ops.js';
import { getNextStudyItems } from './lib/next.js';
import { runTestSuite } from './lib/runtime.js';
import { calculateScore, isCorrectNonCoding } from './lib/scoring.js';
import {
  ensureOption,
  fail,
  openInEditor,
  parseCliArgs,
  relativeFromCwd,
} from './lib/utils.js';

const HELP_TEXT = `stup CLI

Usage:
  stup init
  stup subject list
  stup content pull [--subject <id>|--all]
  stup quiz start --id <quiz-id> [--open]
  stup quiz check --id <quiz-id> [--attempt <attempt-id>] [--json]
  stup quiz submit --id <quiz-id> [--attempt <attempt-id>]
  stup exercise start --id <exercise-id> [--open]
  stup exercise check --id <exercise-id> [--attempt <attempt-id>] [--json]
  stup exercise submit --id <exercise-id> [--attempt <attempt-id>]
  stup progress show
  stup next [--type reading|quiz|exercise] [--open]
  stup sync init --token <github-token> [--gist <gist-id>]
  stup sync status
  stup sync push
  stup sync pull [--force]

Notes:
  - All local state lives under .stup/
  - Gist sync uses study-program-progress.json (same backend contract as web app)
`;

function commandPath(positional) {
  const [c1, c2] = positional;
  return `${c1 || ''}:${c2 || ''}`;
}

function loadContext() {
  const rootDir = resolveWorkspaceRoot(process.cwd());
  ensureStupDirs(rootDir);

  const subjects = loadSubjects(rootDir);
  const index = loadSubjectContentIndex(rootDir);
  const maps = buildLookupMaps(index);

  return {
    rootDir,
    subjects,
    index,
    maps,
  };
}

function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function getAttemptSeconds(attempt) {
  const created = attempt.createdAt ? Date.parse(attempt.createdAt) : Date.now();
  return Math.max(1, Math.round((Date.now() - created) / 1000));
}

function formatQuestionResult(result) {
  if (result.type === 'coding') {
    return `${result.questionId}: ${result.passed ? 'PASS' : 'FAIL'} (${result.passedTests}/${result.totalTests})`;
  }
  return `${result.questionId}: ${result.correct ? 'PASS' : 'FAIL'}`;
}

function assertQuiz(maps, quizId) {
  const quiz = maps.quizById.get(quizId);
  if (!quiz) {
    fail(`quiz not found: ${quizId}`);
  }
  return quiz;
}

function assertExercise(maps, exerciseId) {
  const exercise = maps.exerciseById.get(exerciseId);
  if (!exercise) {
    fail(`exercise not found: ${exerciseId}`);
  }
  return exercise;
}

function readCheckResultIfExists(attemptDir) {
  const resultPath = path.join(attemptDir, 'results', 'latest-check.json');
  if (!fs.existsSync(resultPath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(resultPath, 'utf8'));
}

function runQuizCheck(rootDir, quiz, attemptDir, options = {}) {
  const { attemptPath, attempt } = loadQuizAttempt(attemptDir);

  if (attempt.quizId !== quiz.id) {
    throw new Error(`attempt quizId (${attempt.quizId}) does not match ${quiz.id}`);
  }

  const questionResults = [];
  const progressAnswers = {};
  let correctCount = 0;

  for (const question of quiz.questions || []) {
    const entry = attempt.answers?.[question.id];

    if (!entry) {
      questionResults.push({
        questionId: question.id,
        type: question.type,
        correct: false,
        error: 'missing answer entry',
      });
      continue;
    }

    if (question.type === 'coding') {
      let code;
      try {
        code = readCodeReference(attemptDir, entry);
      } catch (error) {
        questionResults.push({
          questionId: question.id,
          type: question.type,
          passed: false,
          passedTests: 0,
          totalTests: Array.isArray(question.testCases) ? question.testCases.length : 0,
          error: error instanceof Error ? error.message : String(error),
        });
        progressAnswers[question.id] = { code: '', passed: false };
        continue;
      }

      const tests = Array.isArray(question.testCases) ? question.testCases : [];
      const language = question.language || entry.language || 'python';
      let suite;

      if (tests.length === 0) {
        suite = {
          summary: {
            passed: code.trim() ? 1 : 0,
            total: 1,
            failed: code.trim() ? 0 : 1,
            allPassed: Boolean(code.trim()),
          },
          tests: [],
        };
      } else {
        suite = runTestSuite({
          language,
          studentCode: code,
          solutionCode: question.solution || '',
          tests,
          timeoutSeconds: 8,
        });
      }

      const passed = suite.summary.allPassed;
      progressAnswers[question.id] = { code, passed };
      if (passed) correctCount += 1;

      questionResults.push({
        questionId: question.id,
        type: question.type,
        passed,
        passedTests: suite.summary.passed,
        totalTests: suite.summary.total,
        failedTests: suite.summary.failed,
        tests: suite.tests,
      });
      continue;
    }

    const answer = entry.answer;
    const correct = isCorrectNonCoding(question, answer);
    progressAnswers[question.id] = answer;

    if (correct) {
      correctCount += 1;
    }

    questionResults.push({
      questionId: question.id,
      type: question.type,
      correct,
      answer,
      expected: question.correctAnswer,
    });
  }

  const score = calculateScore((quiz.questions || []).length, correctCount);
  const pass = score >= QUIZ_PASSING_SCORE;

  const checkResult = {
    kind: 'quiz_check',
    quizId: quiz.id,
    attemptId: attempt.attemptId,
    checkedAt: new Date().toISOString(),
    score,
    passingScore: QUIZ_PASSING_SCORE,
    passed: pass,
    correctCount,
    totalQuestions: (quiz.questions || []).length,
    questionResults,
    progressAnswers,
    timeSpentSeconds: getAttemptSeconds(attempt),
  };

  writeLatestCheckResult(attemptDir, checkResult);
  updateAttemptStatus(attemptPath, attempt, 'checked');

  if (options.printJson) {
    printJson(checkResult);
  } else {
    console.log(`Quiz ${quiz.id}: ${score}% (${correctCount}/${checkResult.totalQuestions}) ${pass ? 'PASS' : 'FAIL'}`);
    for (const result of questionResults) {
      console.log(`  - ${formatQuestionResult(result)}`);
    }
    console.log(`Check result: ${relativeFromCwd(path.join(attemptDir, 'results', 'latest-check.json'))}`);
  }

  return checkResult;
}

function runExerciseCheck(rootDir, exercise, attemptDir, options = {}) {
  const { attemptPath, attempt } = loadExerciseAttempt(attemptDir);

  if (attempt.exerciseId !== exercise.id) {
    throw new Error(`attempt exerciseId (${attempt.exerciseId}) does not match ${exercise.id}`);
  }

  const answerCode = readExerciseAnswerCode(attemptDir, attempt);

  let checkResult;

  if (attempt.exerciseType === 'written') {
    const nonEmpty = answerCode.trim().length > 0;
    checkResult = {
      kind: 'exercise_check',
      exerciseId: exercise.id,
      attemptId: attempt.attemptId,
      checkedAt: new Date().toISOString(),
      exerciseType: 'written',
      passed: nonEmpty,
      message: nonEmpty
        ? 'Written answer captured (manual/AI evaluation can happen separately).'
        : 'Answer is empty.',
      answerLength: answerCode.trim().length,
      timeSpentSeconds: getAttemptSeconds(attempt),
    };
  } else {
    const tests = Array.isArray(exercise.testCases) ? exercise.testCases : [];
    const language = attempt.language || exercise.language || 'python';
    const suite = runTestSuite({
      language,
      studentCode: answerCode,
      solutionCode: exercise.solution || '',
      tests,
      timeoutSeconds: attempt.runtime?.timeoutSeconds || 8,
    });

    checkResult = {
      kind: 'exercise_check',
      exerciseId: exercise.id,
      attemptId: attempt.attemptId,
      checkedAt: new Date().toISOString(),
      exerciseType: 'coding',
      language,
      passed: suite.summary.allPassed,
      passedTests: suite.summary.passed,
      totalTests: suite.summary.total,
      failedTests: suite.summary.failed,
      tests: suite.tests,
      timeSpentSeconds: getAttemptSeconds(attempt),
    };
  }

  writeLatestCheckResult(attemptDir, checkResult);
  updateAttemptStatus(attemptPath, attempt, 'checked');

  if (options.printJson) {
    printJson(checkResult);
  } else if (attempt.exerciseType === 'written') {
    console.log(`Exercise ${exercise.id}: ${checkResult.passed ? 'captured' : 'empty answer'}`);
  } else {
    console.log(`Exercise ${exercise.id}: ${checkResult.passed ? 'PASS' : 'FAIL'} (${checkResult.passedTests}/${checkResult.totalTests})`);
  }
  console.log(`Check result: ${relativeFromCwd(path.join(attemptDir, 'results', 'latest-check.json'))}`);

  return { checkResult, answerCode };
}

async function run() {
  const parsed = parseCliArgs(process.argv.slice(2));
  const command = commandPath(parsed.positional);

  if (parsed.positional.length === 0 || parsed.options.help || parsed.options.h) {
    process.stdout.write(HELP_TEXT);
    return;
  }

  switch (command) {
    case 'init:': {
      const rootDir = resolveWorkspaceRoot(process.cwd());
      ensureStupDirs(rootDir);
      const progress = loadProgress(rootDir);
      saveProgress(rootDir, progress);
      const config = loadConfig(rootDir);
      saveConfig(rootDir, config);
      console.log('Initialized .stup workspace');
      console.log(`Progress: ${relativeFromCwd(path.join(rootDir, '.stup/state/progress.json'))}`);
      console.log(`Config: ${relativeFromCwd(path.join(rootDir, '.stup/state/config.json'))}`);
      return;
    }

    case 'subject:list': {
      const ctx = loadContext();
      for (const subject of ctx.subjects) {
        console.log(`${subject.id.padEnd(8)} ${subject.code.padEnd(8)} ${subject.title}`);
      }
      return;
    }

    case 'content:pull': {
      const ctx = loadContext();
      const rootDir = ctx.rootDir;

      const targets = [];
      if (parsed.options.subject) {
        targets.push(String(parsed.options.subject));
      } else {
        targets.push(...ctx.subjects.map((s) => s.id));
      }

      for (const subjectId of targets) {
        const sourceDir = subjectSourceDir(rootDir, subjectId);
        if (!fs.existsSync(sourceDir)) {
          fail(`subject source not found: ${subjectId}`);
        }
        const targetDir = path.join(rootDir, '.stup/content/subjects', subjectId);
        copyDir(sourceDir, targetDir);
        console.log(`Pulled content for ${subjectId} -> ${relativeFromCwd(targetDir)}`);
      }
      return;
    }

    case 'quiz:start': {
      const ctx = loadContext();
      const quizId = ensureOption(parsed.options, 'id', 'quiz start requires --id <quiz-id>');
      const quiz = assertQuiz(ctx.maps, quizId);
      const created = createQuizAttempt(ctx.rootDir, quiz);
      console.log(`Created quiz attempt ${created.attemptId}`);
      console.log(`Attempt file: ${relativeFromCwd(created.attemptPath)}`);
      if (parsed.options.open) {
        openInEditor(created.attemptPath);
      }
      return;
    }

    case 'quiz:check': {
      const ctx = loadContext();
      const quizId = ensureOption(parsed.options, 'id', 'quiz check requires --id <quiz-id>');
      const quiz = assertQuiz(ctx.maps, quizId);
      const attemptRoot = getQuizAttemptRoot(ctx.rootDir, quiz.id);
      const attemptDir = resolveAttemptDir(attemptRoot, parsed.options.attempt ? String(parsed.options.attempt) : undefined);
      runQuizCheck(ctx.rootDir, quiz, attemptDir, { printJson: Boolean(parsed.options.json) });
      return;
    }

    case 'quiz:submit': {
      const ctx = loadContext();
      const quizId = ensureOption(parsed.options, 'id', 'quiz submit requires --id <quiz-id>');
      const quiz = assertQuiz(ctx.maps, quizId);
      const attemptRoot = getQuizAttemptRoot(ctx.rootDir, quiz.id);
      const attemptDir = resolveAttemptDir(attemptRoot, parsed.options.attempt ? String(parsed.options.attempt) : undefined);

      const checkResult = runQuizCheck(ctx.rootDir, quiz, attemptDir, { printJson: false });
      const progress = loadProgress(ctx.rootDir);
      recordQuizAttempt(progress, quiz, {
        attemptId: checkResult.attemptId,
        answers: checkResult.progressAnswers,
        score: checkResult.score,
        timeSpentSeconds: checkResult.timeSpentSeconds,
      });
      saveProgress(ctx.rootDir, progress);

      const { attemptPath, attempt } = loadQuizAttempt(attemptDir);
      updateAttemptStatus(attemptPath, attempt, 'submitted');

      console.log(`Submitted quiz ${quiz.id}. Score: ${checkResult.score}%`);
      return;
    }

    case 'exercise:start': {
      const ctx = loadContext();
      const exerciseId = ensureOption(parsed.options, 'id', 'exercise start requires --id <exercise-id>');
      const exercise = assertExercise(ctx.maps, exerciseId);
      const created = createExerciseAttempt(ctx.rootDir, exercise);
      console.log(`Created exercise attempt ${created.attemptId}`);
      console.log(`Attempt file: ${relativeFromCwd(created.attemptPath)}`);
      if (parsed.options.open) {
        const toOpen = created.solutionFilePath || created.answerFilePath || created.attemptPath;
        openInEditor(toOpen);
      }
      return;
    }

    case 'exercise:check': {
      const ctx = loadContext();
      const exerciseId = ensureOption(parsed.options, 'id', 'exercise check requires --id <exercise-id>');
      const exercise = assertExercise(ctx.maps, exerciseId);
      const attemptRoot = getExerciseAttemptRoot(ctx.rootDir, exercise.id);
      const attemptDir = resolveAttemptDir(attemptRoot, parsed.options.attempt ? String(parsed.options.attempt) : undefined);
      runExerciseCheck(ctx.rootDir, exercise, attemptDir, { printJson: Boolean(parsed.options.json) });
      return;
    }

    case 'exercise:submit': {
      const ctx = loadContext();
      const exerciseId = ensureOption(parsed.options, 'id', 'exercise submit requires --id <exercise-id>');
      const exercise = assertExercise(ctx.maps, exerciseId);
      const attemptRoot = getExerciseAttemptRoot(ctx.rootDir, exercise.id);
      const attemptDir = resolveAttemptDir(attemptRoot, parsed.options.attempt ? String(parsed.options.attempt) : undefined);

      const { checkResult, answerCode } = runExerciseCheck(ctx.rootDir, exercise, attemptDir, { printJson: false });

      const progress = loadProgress(ctx.rootDir);
      recordExerciseCompletion(progress, exercise, {
        attemptId: checkResult.attemptId,
        code: answerCode,
        passed: checkResult.passed,
        passedTestCases: checkResult.passedTests,
        totalTestCases: checkResult.totalTests,
        timeSpentSeconds: checkResult.timeSpentSeconds,
        type: checkResult.exerciseType,
      });
      saveProgress(ctx.rootDir, progress);

      const { attemptPath, attempt } = loadExerciseAttempt(attemptDir);
      updateAttemptStatus(attemptPath, attempt, 'submitted');

      if (checkResult.exerciseType === 'coding') {
        console.log(`Submitted exercise ${exercise.id}: ${checkResult.passedTests}/${checkResult.totalTests} tests passed`);
      } else {
        console.log(`Submitted written exercise ${exercise.id}`);
      }
      return;
    }

    case 'progress:show': {
      const ctx = loadContext();
      const progress = loadProgress(ctx.rootDir);
      const summary = getProgressSummary(progress);
      console.log('Progress Summary');
      console.log(`  Subjects tracked:    ${summary.subjectsTracked}`);
      console.log(`  Quiz attempts:       ${summary.quizAttempts}`);
      console.log(`  Quizzes completed:   ${summary.quizzesCompleted}`);
      console.log(`  Exercise completions:${summary.exerciseCompletions}`);
      console.log(`  Exercises solved:    ${summary.exercisesSolved}`);
      console.log(`  Projects submitted:  ${summary.projectsSubmitted}`);
      console.log(`  Avg quiz score:      ${summary.averageQuizScore}%`);
      console.log(`  Best quiz score:     ${summary.bestQuizScore}%`);
      console.log(`  Last updated:        ${summary.lastUpdated}`);
      return;
    }

    case 'next:': {
      const ctx = loadContext();
      const progress = loadProgress(ctx.rootDir);
      const next = getNextStudyItems({
        rootDir: ctx.rootDir,
        subjects: ctx.subjects,
        index: ctx.index,
        progress,
      });

      const typeOption = parsed.options.type ? String(parsed.options.type).toLowerCase() : '';
      if (typeOption && !['reading', 'quiz', 'exercise'].includes(typeOption)) {
        fail('invalid --type. expected one of: reading, quiz, exercise');
      }

      const effectiveType = typeOption || (parsed.options.open ? 'reading' : '');

      const printReading = (reading) => {
        if (!reading) {
          console.log('Next reading: none');
          return;
        }
        console.log(`Next reading: ${reading.subjectCode} Topic ${reading.topicNumber} - ${reading.title}`);
        console.log(`  Subtopic ID: ${reading.subtopicId}`);
        console.log(`  File: ${relativeFromCwd(reading.filePath)}`);
        console.log('  Open: stup next --type reading --open');
      };

      const printQuiz = (quiz) => {
        if (!quiz) {
          console.log('Next quiz: none');
          return;
        }
        console.log(`Next quiz: ${quiz.subjectCode} - ${quiz.title}`);
        console.log(`  Quiz ID: ${quiz.quizId}`);
        console.log(`  Start: stup quiz start --id ${quiz.quizId} --open`);
      };

      const printExercise = (exercise) => {
        if (!exercise) {
          console.log('Next exercise: none');
          return;
        }
        console.log(`Next exercise: ${exercise.subjectCode} - ${exercise.title}`);
        console.log(`  Exercise ID: ${exercise.exerciseId}`);
        console.log(`  Start: stup exercise start --id ${exercise.exerciseId} --open`);
      };

      if (!effectiveType) {
        printReading(next.reading);
        printQuiz(next.quiz);
        printExercise(next.exercise);
        return;
      }

      if (effectiveType === 'reading') {
        if (!next.reading) {
          console.log('No next reading found.');
          return;
        }
        printReading(next.reading);
        if (parsed.options.open) {
          openInEditor(next.reading.filePath);
          recordSubtopicView(progress, next.reading.subjectId, next.reading.subtopicId);
          saveProgress(ctx.rootDir, progress);
          console.log(`Marked viewed: ${next.reading.subtopicId}`);
        }
        return;
      }

      if (effectiveType === 'quiz') {
        if (!next.quiz) {
          console.log('No next quiz found.');
          return;
        }
        printQuiz(next.quiz);
        if (parsed.options.open) {
          const quiz = assertQuiz(ctx.maps, next.quiz.quizId);
          const created = createQuizAttempt(ctx.rootDir, quiz);
          openInEditor(created.attemptPath);
          console.log(`Opened new quiz attempt: ${created.attemptId}`);
        }
        return;
      }

      if (!next.exercise) {
        console.log('No next exercise found.');
        return;
      }
      printExercise(next.exercise);
      if (parsed.options.open) {
        const exercise = assertExercise(ctx.maps, next.exercise.exerciseId);
        const created = createExerciseAttempt(ctx.rootDir, exercise);
        const toOpen = created.solutionFilePath || created.answerFilePath || created.attemptPath;
        openInEditor(toOpen);
        console.log(`Opened new exercise attempt: ${created.attemptId}`);
      }
      return;
    }

    case 'sync:init': {
      const ctx = loadContext();
      const token = ensureOption(parsed.options, 'token', 'sync init requires --token <github-token>');
      const valid = await validateToken(token);
      if (!valid) {
        fail('invalid GitHub token or missing gist scope');
      }

      const progress = loadProgress(ctx.rootDir);
      const config = loadConfig(ctx.rootDir);

      let gistId = parsed.options.gist ? String(parsed.options.gist) : (config.gistId || null);

      if (!gistId) {
        gistId = await findProgressGist(token);
      }

      if (!gistId) {
        gistId = await createProgressGist(token, stripSensitiveForGist(progress));
        console.log(`Created new gist: ${gistId}`);
      }

      saveConfig(ctx.rootDir, {
        ...config,
        githubToken: token,
        gistId,
      });

      console.log(`Sync configured. Gist: ${gistId}`);
      return;
    }

    case 'sync:status': {
      const ctx = loadContext();
      const config = loadConfig(ctx.rootDir);
      const progress = loadProgress(ctx.rootDir);
      const hasToken = Boolean(config.githubToken || process.env.GITHUB_TOKEN);
      console.log(`Token configured: ${hasToken ? 'yes' : 'no'}`);
      console.log(`Gist ID: ${config.gistId || '(none)'}`);
      console.log(`Local lastUpdated: ${progress.lastUpdated || progress.startedAt}`);
      return;
    }

    case 'sync:push': {
      const ctx = loadContext();
      const config = loadConfig(ctx.rootDir);
      const token = config.githubToken || process.env.GITHUB_TOKEN;
      if (!token) {
        fail('sync push requires configured token (run sync init --token ...)');
      }

      let gistId = config.gistId || null;
      const progress = loadProgress(ctx.rootDir);
      const safeProgress = stripSensitiveForGist(progress);

      if (!gistId) {
        gistId = await findProgressGist(token);
      }

      if (!gistId) {
        gistId = await createProgressGist(token, safeProgress);
        console.log(`Created gist: ${gistId}`);
      } else {
        await updateProgressGist(token, gistId, safeProgress);
      }

      saveConfig(ctx.rootDir, {
        ...config,
        githubToken: token,
        gistId,
      });

      console.log(`Pushed progress to gist ${gistId}`);
      return;
    }

    case 'sync:pull': {
      const ctx = loadContext();
      const config = loadConfig(ctx.rootDir);
      const token = config.githubToken || process.env.GITHUB_TOKEN;
      const gistId = config.gistId;

      if (!token || !gistId) {
        fail('sync pull requires configured token and gist (run sync init first)');
      }

      const localProgress = loadProgress(ctx.rootDir);
      const remoteProgress = await loadProgressGist(token, gistId);
      const migratedRemote = migrateProgress(remoteProgress, ctx.rootDir);
      let merged;
      if (parsed.options.force) {
        merged = applyRemoteProgress(migratedRemote, localProgress);
      } else if (!hasAnyRecordedProgress(localProgress) && hasAnyRecordedProgress(migratedRemote)) {
        merged = applyRemoteProgress(migratedRemote, localProgress);
      } else {
        merged = mergeRemoteIntoLocalProgress(localProgress, migratedRemote);
      }
      saveProgress(ctx.rootDir, merged);
      console.log(`Pulled progress from gist ${gistId}`);
      return;
    }

    default:
      process.stdout.write(HELP_TEXT);
      process.exitCode = 1;
  }
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  fail(message);
});
