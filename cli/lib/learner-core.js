import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const LEARNER_PROFILE_ALGORITHM_VERSION = 'stup-v2-mastery-v1';

export function ensureLearnerHome(learnerHome) {
  for (const rel of ['', 'plans', 'plans/proposed', 'review', 'exports']) {
    fs.mkdirSync(path.join(learnerHome, rel), { recursive: true });
  }
}

export function learnerEventsPath(learnerHome) {
  return path.join(learnerHome, 'events.jsonl');
}

export function learnerProfilePath(learnerHome) {
  return path.join(learnerHome, 'profile.json');
}

function nowIso() {
  return new Date().toISOString();
}

function stableEvent(event) {
  return {
    ...event,
    at: event.at || event.timestamp || nowIso(),
  };
}

export function appendLearnerEvent(learnerHome, event) {
  ensureLearnerHome(learnerHome);
  const next = stableEvent(event);
  fs.appendFileSync(learnerEventsPath(learnerHome), `${JSON.stringify(next)}\n`, 'utf8');
  return next;
}

export function appendLearnerEvents(learnerHome, events) {
  return events.map((event) => appendLearnerEvent(learnerHome, event));
}

export function readLearnerEvents(learnerHome) {
  ensureLearnerHome(learnerHome);
  const filePath = learnerEventsPath(learnerHome);
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function hashEvents(events) {
  const hash = crypto.createHash('sha256');
  for (const event of events) {
    hash.update(JSON.stringify(event));
    hash.update('\n');
  }
  return `sha256:${hash.digest('hex')}`;
}

function activityConceptTags(graph) {
  const tags = new Map();
  for (const activity of graph?.activities || []) {
    tags.set(activity.id, activity.conceptTags || []);
  }
  for (const subject of graph?.subjects || []) {
    for (const topic of subject.topics || []) {
      for (const activityId of [...(topic.quizIds || []), ...(topic.exerciseIds || [])]) {
        if (!tags.has(activityId)) {
          tags.set(activityId, topic.conceptTags || subject.conceptTags || []);
        }
      }
    }
  }
  return tags;
}

function eventConceptTags(event, tagsByActivity) {
  const explicit = Array.isArray(event.conceptTags) ? event.conceptTags : [];
  if (explicit.length > 0) return explicit;
  const inferred = tagsByActivity.get(event.activityId) || tagsByActivity.get(event.itemId) || [];
  return inferred.length > 0 ? inferred : ['general'];
}

function emptyConceptStats() {
  return {
    observations: 0,
    scoreTotal: 0,
    struggleCount: 0,
    hardReviews: 0,
  };
}

function addObservation(stats, conceptId, value) {
  if (!stats.has(conceptId)) stats.set(conceptId, emptyConceptStats());
  const entry = stats.get(conceptId);
  entry.observations += 1;
  entry.scoreTotal += Math.max(0, Math.min(1, value));
}

function addStruggle(stats, conceptId) {
  if (!stats.has(conceptId)) stats.set(conceptId, emptyConceptStats());
  stats.get(conceptId).struggleCount += 1;
}

function addHardReview(stats, conceptId) {
  if (!stats.has(conceptId)) stats.set(conceptId, emptyConceptStats());
  stats.get(conceptId).hardReviews += 1;
}

function masteryFromStats(entry) {
  if (entry.observations === 0) return 0.35;
  const base = entry.scoreTotal / entry.observations;
  const strugglePenalty = Math.min(0.25, entry.struggleCount * 0.08);
  const memoryPenalty = Math.min(0.2, entry.hardReviews * 0.05);
  return Number(Math.max(0, Math.min(1, base - strugglePenalty - memoryPenalty)).toFixed(2));
}

export function deriveLearnerProfile(events, graph = {}) {
  const tagsByActivity = activityConceptTags(graph);
  const stats = new Map();
  const recentStruggles = [];

  for (const event of events) {
    if (event.type === 'answer_submitted') {
      const value = event.correct ? (event.hintUsed ? 0.75 : 1) : 0;
      for (const conceptId of eventConceptTags(event, tagsByActivity)) {
        addObservation(stats, conceptId, value);
      }
      continue;
    }

    if (event.type === 'activity_completed') {
      const score = Number.isFinite(Number(event.score))
        ? Number(event.score) / (Number(event.score) > 1 ? 100 : 1)
        : (event.passed ? 0.8 : 0.25);
      for (const conceptId of eventConceptTags(event, tagsByActivity)) {
        addObservation(stats, conceptId, score);
      }
      continue;
    }

    if (event.type === 'flashcard_reviewed') {
      const rating = String(event.rating || '').toLowerCase();
      const value = rating === 'easy' ? 0.9 : rating === 'good' ? 0.7 : rating === 'hard' ? 0.4 : 0.2;
      for (const conceptId of eventConceptTags(event, tagsByActivity)) {
        addObservation(stats, conceptId, value);
        if (rating === 'hard' || rating === 'again') addHardReview(stats, conceptId);
      }
      continue;
    }

    if (event.type === 'struggle_reported') {
      const conceptTags = eventConceptTags(event, tagsByActivity);
      for (const conceptId of conceptTags) addStruggle(stats, conceptId);
      recentStruggles.push({
        at: event.at,
        conceptTags,
        evidence: event.note || 'Learner reported struggle.',
      });
    }
  }

  const conceptMastery = {};
  for (const [conceptId, entry] of Array.from(stats.entries()).sort((a, b) => a[0].localeCompare(b[0]))) {
    conceptMastery[conceptId] = masteryFromStats(entry);
  }

  const recommendedActions = Object.entries(conceptMastery)
    .filter(([, mastery]) => mastery < 0.6)
    .map(([conceptId, mastery]) => ({
      type: 'remediation',
      conceptTags: [conceptId],
      reason: `Mastery is ${mastery}; add targeted review before dependent work.`,
    }));

  return {
    algorithmVersion: LEARNER_PROFILE_ALGORITHM_VERSION,
    generatedAt: nowIso(),
    sourceEventsHash: hashEvents(events),
    eventCount: events.length,
    conceptMastery,
    recentStruggles: recentStruggles.slice(-20),
    recommendedActions,
  };
}

export function loadLearnerProfile(learnerHome) {
  const filePath = learnerProfilePath(learnerHome);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function saveLearnerProfile(learnerHome, profile) {
  ensureLearnerHome(learnerHome);
  fs.writeFileSync(learnerProfilePath(learnerHome), `${JSON.stringify(profile, null, 2)}\n`, 'utf8');
  return profile;
}

export function deriveAndSaveLearnerProfile(learnerHome, graph = {}) {
  const events = readLearnerEvents(learnerHome);
  const profile = deriveLearnerProfile(events, graph);
  return saveLearnerProfile(learnerHome, profile);
}

export function legacyProgressToEvents(progress, packId = 'cs-degree', contentVersion = '1.0.0') {
  const events = [];
  for (const [subjectId, subjectProgress] of Object.entries(progress?.subjects || {})) {
    for (const [quizId, attempts] of Object.entries(subjectProgress.quizAttempts || {})) {
      for (const attempt of attempts || []) {
        events.push({
          type: 'activity_completed',
          activityId: quizId,
          subjectId,
          packId,
          contentVersion,
          score: attempt.score,
          passed: Number(attempt.score) >= 70,
          at: attempt.timestamp,
        });
      }
    }
    for (const [examId, attempts] of Object.entries(subjectProgress.examAttempts || {})) {
      for (const attempt of attempts || []) {
        events.push({
          type: 'activity_completed',
          activityId: examId,
          subjectId,
          packId,
          contentVersion,
          score: attempt.score,
          passed: Number(attempt.score) >= 70,
          at: attempt.timestamp,
        });
      }
    }
    for (const [exerciseId, completion] of Object.entries(subjectProgress.exerciseCompletions || {})) {
      events.push({
        type: 'activity_completed',
        activityId: exerciseId,
        subjectId,
        packId,
        contentVersion,
        passed: Boolean(completion.passed),
        at: completion.timestamp,
      });
    }
    for (const [projectId, submissions] of Object.entries(subjectProgress.projectSubmissions || {})) {
      for (const submission of submissions || []) {
        events.push({
          type: 'activity_completed',
          activityId: projectId,
          subjectId,
          packId,
          contentVersion,
          passed: true,
          at: submission.timestamp,
        });
      }
    }
    for (const [subtopicId, completion] of Object.entries(subjectProgress.subtopicCompletions || {})) {
      events.push({
        type: 'activity_completed',
        activityId: subtopicId,
        subjectId,
        packId,
        contentVersion,
        passed: true,
        at: completion.completedAt,
      });
    }
  }
  return events.sort((a, b) => new Date(a.at || 0).getTime() - new Date(b.at || 0).getTime());
}
