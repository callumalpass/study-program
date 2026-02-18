import { QUIZ_PASSING_SCORE } from './constants.js';
import { ensureSubjectProgress } from './fs-state.js';
import { nowIso } from './utils.js';

export function getSyncableSettings(settings = {}) {
  return {
    theme: settings.theme || 'auto',
    codeEditorFontSize: Number.isFinite(settings.codeEditorFontSize) ? settings.codeEditorFontSize : 14,
    showCompletedItems: settings.showCompletedItems !== false,
    studyPlan: settings.studyPlan,
  };
}

export function stripSensitiveForGist(progress) {
  const { settings = {}, ...rest } = progress;
  return {
    ...rest,
    settings: getSyncableSettings(settings),
  };
}

export function mergeRemoteIntoLocalProgress(localProgress, remoteProgress) {
  const localLastUpdated = localProgress.lastUpdated ? Date.parse(localProgress.lastUpdated) : 0;
  const remoteLastUpdated = remoteProgress.lastUpdated ? Date.parse(remoteProgress.lastUpdated) : 0;

  if (remoteLastUpdated > localLastUpdated) {
    const localSettings = localProgress.settings || {};
    return {
      ...remoteProgress,
      settings: {
        ...(remoteProgress.settings || {}),
        githubToken: localSettings.githubToken,
        gistId: localSettings.gistId,
        geminiApiKey: localSettings.geminiApiKey,
      },
    };
  }

  return localProgress;
}

export function recordQuizAttempt(progress, quiz, attemptPayload) {
  const subjectProgress = ensureSubjectProgress(progress, quiz.subjectId);
  subjectProgress.quizAttempts[quiz.id] ||= [];
  subjectProgress.quizAttempts[quiz.id].push({
    attemptId: attemptPayload.attemptId,
    timestamp: nowIso(),
    answers: attemptPayload.answers,
    score: attemptPayload.score,
    timeSpentSeconds: attemptPayload.timeSpentSeconds,
  });

  if (attemptPayload.score >= QUIZ_PASSING_SCORE) {
    if (subjectProgress.status === 'not_started') {
      subjectProgress.status = 'in_progress';
    }
  }

  return progress;
}

export function recordExerciseCompletion(progress, exercise, completionPayload) {
  const subjectProgress = ensureSubjectProgress(progress, exercise.subjectId);

  const existing = subjectProgress.exerciseCompletions[exercise.id];
  const shouldReplace = !existing
    || (completionPayload.passed && !existing.passed)
    || ((completionPayload.passedTestCases ?? 0) > (existing.passedTestCases ?? 0))
    || completionPayload.type === 'written';

  if (!shouldReplace) {
    return progress;
  }

  subjectProgress.exerciseCompletions[exercise.id] = {
    completionId: completionPayload.attemptId,
    timestamp: nowIso(),
    code: completionPayload.code,
    passed: completionPayload.passed,
    passedTestCases: completionPayload.passedTestCases,
    totalTestCases: completionPayload.totalTestCases,
    timeSpentSeconds: completionPayload.timeSpentSeconds,
    type: completionPayload.type,
  };

  return progress;
}

export function getProgressSummary(progress) {
  const selectedIds = Array.isArray(progress.selectedSubjectIds) ? progress.selectedSubjectIds : [];
  const selectedSet = new Set(selectedIds);
  const entries = Object.entries(progress.subjects || {})
    .filter(([subjectId]) => selectedSet.size === 0 || selectedSet.has(subjectId));

  const subjects = entries.map(([, value]) => value);
  let quizAttempts = 0;
  let quizzesCompleted = 0;
  let exerciseCompletions = 0;
  let exercisesSolved = 0;
  let projectsSubmitted = 0;
  let bestQuizScore = 0;
  let totalQuizScore = 0;
  let quizScoreCount = 0;

  for (const subjectProgress of subjects) {
    const quizMap = subjectProgress.quizAttempts || {};
    for (const attempts of Object.values(quizMap)) {
      quizAttempts += attempts.length;
      if (attempts.length > 0) {
        const best = Math.max(...attempts.map((a) => a.score ?? 0));
        if (best >= QUIZ_PASSING_SCORE) {
          quizzesCompleted += 1;
        }
      }
      for (const attempt of attempts) {
        const score = attempt.score ?? 0;
        if (score > bestQuizScore) {
          bestQuizScore = score;
        }
        totalQuizScore += score;
        quizScoreCount += 1;
      }
    }

    const exerciseMap = subjectProgress.exerciseCompletions || {};
    for (const completion of Object.values(exerciseMap)) {
      exerciseCompletions += 1;
      if (completion.passed) exercisesSolved += 1;
    }

    const projectMap = subjectProgress.projectSubmissions || {};
    for (const submissions of Object.values(projectMap)) {
      if (Array.isArray(submissions)) {
        projectsSubmitted += submissions.length;
      }
    }
  }

  const averageQuizScore = quizScoreCount > 0
    ? Math.round(totalQuizScore / quizScoreCount)
    : 0;

  return {
    subjectsTracked: subjects.length,
    quizAttempts,
    quizzesCompleted,
    exerciseCompletions,
    exercisesSolved,
    projectsSubmitted,
    averageQuizScore,
    bestQuizScore,
    lastUpdated: progress.lastUpdated || progress.startedAt,
  };
}

export function hasAnyRecordedProgress(progress) {
  for (const subjectProgress of Object.values(progress.subjects || {})) {
    const quizAttempts = subjectProgress.quizAttempts || {};
    const examAttempts = subjectProgress.examAttempts || {};
    const exerciseCompletions = subjectProgress.exerciseCompletions || {};
    const projectSubmissions = subjectProgress.projectSubmissions || {};
    const subtopicViews = subjectProgress.subtopicViews || {};

    if (Object.keys(quizAttempts).length > 0) return true;
    if (Object.keys(examAttempts).length > 0) return true;
    if (Object.keys(exerciseCompletions).length > 0) return true;
    if (Object.keys(projectSubmissions).length > 0) return true;
    if (Object.keys(subtopicViews).length > 0) return true;
  }

  return false;
}

export function applyRemoteProgress(remoteProgress, localProgress) {
  const localSettings = localProgress.settings || {};
  return {
    ...remoteProgress,
    settings: {
      ...(remoteProgress.settings || {}),
      githubToken: localSettings.githubToken,
      gistId: localSettings.gistId,
      geminiApiKey: localSettings.geminiApiKey,
    },
  };
}

export function recordSubtopicView(progress, subjectId, subtopicId, viewedAt = nowIso()) {
  const subjectProgress = ensureSubjectProgress(progress, subjectId);
  subjectProgress.subtopicViews ||= {};

  const existing = subjectProgress.subtopicViews[subtopicId];
  if (existing) {
    existing.lastViewedAt = viewedAt;
    existing.viewCount = (existing.viewCount || 0) + 1;
  } else {
    subjectProgress.subtopicViews[subtopicId] = {
      firstViewedAt: viewedAt,
      lastViewedAt: viewedAt,
      viewCount: 1,
    };
  }

  return progress;
}
