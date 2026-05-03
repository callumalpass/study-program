import type {
  ProjectSubmission,
  ReviewItem,
  Subject,
  SubjectProgress,
  StudySessionHistoryEntry,
  UserProgress,
} from './types';
import { QUIZ_PASSING_SCORE } from './types';

const STUDY_SESSION_KEY = 'study_program_active_session';
const MAX_REVIEW_ITEMS = 3;

export type StudySessionItemKind = 'review' | 'read' | 'quiz' | 'exercise' | 'exam' | 'project';
export type StudySessionPhase = 'learning' | 'practicing' | 'reviewing' | 'assessing';

export interface StudySessionItem {
  id: string;
  itemType: StudySessionItemKind;
  phase: StudySessionPhase;
  subjectId: string;
  subjectCode: string;
  topicId?: string;
  topicTitle?: string;
  targetId: string;
  subtopicId?: string;
  subtopicSlug?: string;
  title: string;
  context: string;
  rationale: string;
  href: string;
  reviewItemType?: ReviewItem['itemType'];
}

export interface StudySession {
  id: string;
  subjectId: string;
  subjectCode: string;
  startedAt: string;
  currentIndex: number;
  queue: StudySessionItem[];
  completedItemIds: string[];
}

export interface StudySessionSummary {
  sectionsCompleted: number;
  quizzesAttempted: number;
  quizzesPassed: number;
  exercisesPassed: number;
  reviewItemsCompleted: number;
}

function getSessionStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

function parseDate(value: string | undefined): number {
  if (!value) return 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function sortSubjectsByCourseOrder(subjects: Subject[]): Subject[] {
  return [...subjects].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.semester !== b.semester) return a.semester - b.semester;
    return a.code.localeCompare(b.code);
  });
}

export function getSubjectLastActivityAt(progress: UserProgress, subjectId: string): number {
  const subjectProgress = progress.subjects[subjectId];
  if (!subjectProgress) return 0;

  let latest = Math.max(
    parseDate(subjectProgress.startedAt),
    parseDate(subjectProgress.completedAt)
  );

  Object.values(subjectProgress.subtopicViews || {}).forEach(view => {
    latest = Math.max(latest, parseDate(view.lastViewedAt));
  });

  Object.values(subjectProgress.subtopicCompletions || {}).forEach(completion => {
    latest = Math.max(latest, parseDate(completion.completedAt));
  });

  Object.values(subjectProgress.quizAttempts || {}).forEach(attempts => {
    attempts.forEach(attempt => {
      latest = Math.max(latest, parseDate(attempt.timestamp));
    });
  });

  Object.values(subjectProgress.examAttempts || {}).forEach(attempts => {
    attempts.forEach(attempt => {
      latest = Math.max(latest, parseDate(attempt.timestamp));
    });
  });

  Object.values(subjectProgress.exerciseCompletions || {}).forEach(completion => {
    latest = Math.max(latest, parseDate(completion.timestamp));
  });

  Object.values(subjectProgress.projectSubmissions || {}).forEach(submissions => {
    submissions.forEach((submission: ProjectSubmission) => {
      latest = Math.max(latest, parseDate(submission.timestamp));
    });
  });

  return latest;
}

function chooseSessionSubject(subjects: Subject[], progress: UserProgress): Subject | null {
  const inProgress = subjects
    .filter(subject => progress.subjects[subject.id]?.status === 'in_progress')
    .sort((a, b) => getSubjectLastActivityAt(progress, b.id) - getSubjectLastActivityAt(progress, a.id));

  if (inProgress.length > 0) {
    return inProgress[0];
  }

  return sortSubjectsByCourseOrder(subjects)
    .find(subject => progress.subjects[subject.id]?.status !== 'completed') || null;
}

function formatAssessmentTitle(subject: Subject, itemType: 'quiz' | 'exercise' | 'exam' | 'project', itemId: string): string {
  const subjectCode = subject.code;

  if (itemType === 'quiz') {
    const shortMatch = itemId.match(/-q(\d+)(?:-([a-c]))?-(\d+)/i);
    if (shortMatch) {
      return `${subjectCode} Quiz ${shortMatch[1]}${(shortMatch[2] || '').toUpperCase()}`;
    }

    const topicSubquizMatch = itemId.match(/quiz-(\d+)-(\d+)/i);
    if (topicSubquizMatch) {
      return `${subjectCode} Quiz ${topicSubquizMatch[1]}-${topicSubquizMatch[2]}`;
    }

    const levelMatch = itemId.match(/quiz-(\d+)([a-c])?(?:-([a-c]))?/i);
    if (levelMatch) {
      return `${subjectCode} Quiz ${levelMatch[1]}${(levelMatch[2] || levelMatch[3] || '').toUpperCase()}`;
    }

    return `${subjectCode} Quiz`;
  }

  if (itemType === 'exercise') {
    const topicMatch = itemId.match(/-t(\d+)-/i);
    const exerciseMatch = itemId.match(/ex(?:ercise-)?(\d+)/i);
    const topic = topicMatch ? ` Topic ${topicMatch[1]}` : '';
    const exercise = exerciseMatch ? ` Exercise ${parseInt(exerciseMatch[1], 10)}` : ' Exercise';
    return `${subjectCode}${topic}${exercise}`;
  }

  if (itemType === 'exam') {
    return `${subjectCode} Exam`;
  }

  return `${subjectCode} Project`;
}

function getReviewItemUrl(item: ReviewItem): string {
  return item.itemType === 'quiz'
    ? `#/subject/${item.subjectId}/quiz/${item.itemId}`
    : `#/subject/${item.subjectId}/exercise/${item.itemId}`;
}

function getDueReviewItems(progress: UserProgress, subjects: Subject[]): ReviewItem[] {
  const subjectIds = new Set(subjects.map(subject => subject.id));
  const now = Date.now();

  return (progress.reviewQueue || [])
    .filter(item => subjectIds.has(item.subjectId))
    .filter(item => parseDate(item.nextReviewAt) <= now)
    .sort((a, b) => parseDate(a.nextReviewAt) - parseDate(b.nextReviewAt));
}

function isQuizPassed(progress: SubjectProgress | undefined, quizId: string): boolean {
  return Boolean(progress?.quizAttempts?.[quizId]?.some(attempt => attempt.score >= QUIZ_PASSING_SCORE));
}

function isExercisePassed(progress: SubjectProgress | undefined, exerciseId: string): boolean {
  return Boolean(progress?.exerciseCompletions?.[exerciseId]?.passed);
}

function isExamPassed(progress: SubjectProgress | undefined, examId: string): boolean {
  return Boolean(progress?.examAttempts?.[examId]?.some(attempt => attempt.score >= QUIZ_PASSING_SCORE));
}

function isProjectComplete(progress: SubjectProgress | undefined, projectId: string): boolean {
  const submissions = progress?.projectSubmissions?.[projectId] || [];
  if (submissions.length === 0) return false;
  return submissions.some(submission => !submission.aiEvaluation || submission.aiEvaluation.score >= QUIZ_PASSING_SCORE);
}

function getCompletedSectionCount(subjectProgress: SubjectProgress | undefined, subtopicIds: string[]): number {
  const completions = subjectProgress?.subtopicCompletions || {};
  return subtopicIds.filter(id => completions[id]).length;
}

function makeReviewSessionItem(item: ReviewItem, subject: Subject): StudySessionItem {
  const itemTitle = formatAssessmentTitle(subject, item.itemType, item.itemId);

  return {
    id: `review:${item.subjectId}:${item.itemType}:${item.itemId}`,
    itemType: 'review',
    phase: 'reviewing',
    subjectId: item.subjectId,
    subjectCode: subject.code,
    targetId: item.itemId,
    title: `Review: ${itemTitle}`,
    context: `${subject.code} review`,
    rationale: `Due now. Current streak: ${item.streak}.`,
    href: getReviewItemUrl(item),
    reviewItemType: item.itemType,
  };
}

function makeReadingSessionItem(
  subject: Subject,
  topic: Subject['topics'][number],
  subtopic: NonNullable<Subject['topics'][number]['subtopics']>[number],
  completed: number,
  total: number
): StudySessionItem {
  return {
    id: `read:${subject.id}:${subtopic.id}`,
    itemType: 'read',
    phase: 'learning',
    subjectId: subject.id,
    subjectCode: subject.code,
    topicId: topic.id,
    topicTitle: topic.title,
    targetId: subtopic.id,
    subtopicId: subtopic.id,
    subtopicSlug: subtopic.slug,
    title: `Read: ${subtopic.title}`,
    context: `${subject.code} · ${topic.title}`,
    rationale: `You completed ${completed} of ${total} sections in this topic.`,
    href: `#/subject/${subject.id}/topic/${topic.id}/subtopic/${subtopic.slug}`,
  };
}

function makePracticeSessionItem(
  subject: Subject,
  topic: Subject['topics'][number],
  itemType: 'quiz' | 'exercise',
  itemId: string
): StudySessionItem {
  const title = formatAssessmentTitle(subject, itemType, itemId);

  return {
    id: `${itemType}:${subject.id}:${itemId}`,
    itemType,
    phase: 'practicing',
    subjectId: subject.id,
    subjectCode: subject.code,
    topicId: topic.id,
    topicTitle: topic.title,
    targetId: itemId,
    title: `${itemType === 'quiz' ? 'Quiz' : 'Exercise'}: ${title}`,
    context: `${subject.code} · ${topic.title}`,
    rationale: itemType === 'quiz' ? 'Next unpassed topic quiz.' : 'Next unsolved topic exercise.',
    href: itemType === 'quiz'
      ? `#/subject/${subject.id}/quiz/${itemId}`
      : `#/subject/${subject.id}/exercise/${itemId}`,
  };
}

function makeAssessmentSessionItem(
  subject: Subject,
  itemType: 'exam' | 'project',
  itemId: string
): StudySessionItem {
  const title = formatAssessmentTitle(subject, itemType, itemId);

  return {
    id: `${itemType}:${subject.id}:${itemId}`,
    itemType,
    phase: 'assessing',
    subjectId: subject.id,
    subjectCode: subject.code,
    targetId: itemId,
    title: `${itemType === 'exam' ? 'Exam' : 'Project'}: ${title}`,
    context: subject.code,
    rationale: itemType === 'exam' ? 'Reading and practice are complete enough to assess.' : 'Next major project work.',
    href: itemType === 'exam'
      ? `#/subject/${subject.id}/exam/${itemId}`
      : `#/subject/${subject.id}/project/${itemId}`,
  };
}

function getNextPracticeItem(subject: Subject, progress: SubjectProgress | undefined, topic: Subject['topics'][number]): StudySessionItem | null {
  const quizId = topic.quizIds.find(id => !isQuizPassed(progress, id));
  if (quizId) return makePracticeSessionItem(subject, topic, 'quiz', quizId);

  const exerciseId = topic.exerciseIds.find(id => !isExercisePassed(progress, id));
  if (exerciseId) return makePracticeSessionItem(subject, topic, 'exercise', exerciseId);

  return null;
}

function getPracticeReadyTopic(subject: Subject, progress: SubjectProgress | undefined): Subject['topics'][number] | null {
  for (const topic of subject.topics) {
    const subtopicIds = (topic.subtopics || []).map(subtopic => subtopic.id);
    const completed = getCompletedSectionCount(progress, subtopicIds);
    const hasNoReading = subtopicIds.length === 0;
    const readingStartedOrDone = hasNoReading || completed > 0 || completed === subtopicIds.length;
    const hasPracticeBacklog = topic.quizIds.some(id => !isQuizPassed(progress, id))
      || topic.exerciseIds.some(id => !isExercisePassed(progress, id));

    if (readingStartedOrDone && hasPracticeBacklog) {
      return topic;
    }
  }

  return null;
}

function getNextReadingItem(subject: Subject, progress: SubjectProgress | undefined): StudySessionItem | null {
  for (const topic of subject.topics) {
    const subtopics = topic.subtopics || [];
    if (subtopics.length === 0) continue;

    const subtopicIds = subtopics.map(subtopic => subtopic.id);
    const completed = getCompletedSectionCount(progress, subtopicIds);
    const nextSubtopic = subtopics.find(subtopic => !progress?.subtopicCompletions?.[subtopic.id]);

    if (nextSubtopic) {
      return makeReadingSessionItem(subject, topic, nextSubtopic, completed, subtopics.length);
    }
  }

  return null;
}

function addUnique(queue: StudySessionItem[], item: StudySessionItem | null): void {
  if (!item) return;
  if (queue.some(existing => existing.id === item.id)) return;
  queue.push(item);
}

export function buildStudySessionQueue(subjects: Subject[], progress: UserProgress): StudySessionItem[] {
  const queue: StudySessionItem[] = [];
  const subjectById = new Map(subjects.map(subject => [subject.id, subject] as const));

  getDueReviewItems(progress, subjects).slice(0, MAX_REVIEW_ITEMS).forEach(reviewItem => {
    const subject = subjectById.get(reviewItem.subjectId);
    if (subject) addUnique(queue, makeReviewSessionItem(reviewItem, subject));
  });

  const subject = chooseSessionSubject(subjects, progress);
  if (!subject) return queue;

  const subjectProgress = progress.subjects[subject.id];
  const readingItem = getNextReadingItem(subject, subjectProgress);
  addUnique(queue, readingItem);

  const readingTopic = readingItem
    ? subject.topics.find(topic => topic.id === readingItem.topicId) || null
    : null;
  const practiceTopic = readingTopic && getCompletedSectionCount(
    subjectProgress,
    (readingTopic.subtopics || []).map(subtopic => subtopic.id)
  ) > 0
    ? readingTopic
    : getPracticeReadyTopic(subject, subjectProgress);

  if (practiceTopic) {
    addUnique(queue, getNextPracticeItem(subject, subjectProgress, practiceTopic));
  }

  if (!readingItem && !practiceTopic) {
    const examId = subject.examIds?.find(id => !isExamPassed(subjectProgress, id));
    if (examId) addUnique(queue, makeAssessmentSessionItem(subject, 'exam', examId));

    const projectId = subject.projectIds?.find(id => !isProjectComplete(subjectProgress, id));
    if (projectId) addUnique(queue, makeAssessmentSessionItem(subject, 'project', projectId));
  }

  return queue.slice(0, 6);
}

export function getActiveStudySession(): StudySession | null {
  const storage = getSessionStorage();
  if (!storage) return null;

  const raw = storage.getItem(STUDY_SESSION_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as StudySession;
    if (!session.id || !Array.isArray(session.queue)) return null;
    return session;
  } catch {
    storage.removeItem(STUDY_SESSION_KEY);
    return null;
  }
}

export function saveStudySession(session: StudySession): void {
  const storage = getSessionStorage();
  if (!storage) return;
  storage.setItem(STUDY_SESSION_KEY, JSON.stringify(session));
}

export function clearStudySession(): void {
  const storage = getSessionStorage();
  if (!storage) return;
  storage.removeItem(STUDY_SESSION_KEY);
}

export function startStudySession(subjects: Subject[], progress: UserProgress): StudySession | null {
  const queue = buildStudySessionQueue(subjects, progress);
  if (queue.length === 0) return null;

  const primarySubject = subjects.find(subject => subject.id === queue[0].subjectId) || subjects[0];
  const session: StudySession = {
    id: `study-session-${Date.now()}`,
    subjectId: primarySubject?.id || queue[0].subjectId,
    subjectCode: primarySubject?.code || queue[0].subjectCode,
    startedAt: new Date().toISOString(),
    currentIndex: 0,
    queue,
    completedItemIds: [],
  };

  saveStudySession(session);
  return session;
}

function hasQuizAttemptSince(progress: SubjectProgress | undefined, quizId: string, since: string): boolean {
  const sinceTime = parseDate(since);
  return Boolean(progress?.quizAttempts?.[quizId]?.some(attempt => parseDate(attempt.timestamp) >= sinceTime));
}

function hasExerciseWorkSince(progress: SubjectProgress | undefined, exerciseId: string, since: string): boolean {
  const sinceTime = parseDate(since);
  const completion = progress?.exerciseCompletions?.[exerciseId];
  return Boolean(completion && parseDate(completion.timestamp) >= sinceTime);
}

export function isStudySessionItemSatisfied(item: StudySessionItem, progress: UserProgress, sessionStartedAt: string): boolean {
  const subjectProgress = progress.subjects[item.subjectId];

  switch (item.itemType) {
    case 'read':
      return Boolean(subjectProgress?.subtopicCompletions?.[item.targetId]);
    case 'quiz':
      return isQuizPassed(subjectProgress, item.targetId);
    case 'exercise':
      return isExercisePassed(subjectProgress, item.targetId);
    case 'exam':
      return isExamPassed(subjectProgress, item.targetId);
    case 'project':
      return isProjectComplete(subjectProgress, item.targetId);
    case 'review':
      return item.reviewItemType === 'quiz'
        ? hasQuizAttemptSince(subjectProgress, item.targetId, sessionStartedAt)
        : hasExerciseWorkSince(subjectProgress, item.targetId, sessionStartedAt);
    default:
      return false;
  }
}

export function advanceStudySession(session: StudySession, progress: UserProgress): StudySession {
  let currentIndex = session.currentIndex;
  const completedIds = new Set(session.completedItemIds);

  while (currentIndex < session.queue.length) {
    const item = session.queue[currentIndex];
    if (!isStudySessionItemSatisfied(item, progress, session.startedAt)) {
      break;
    }

    completedIds.add(item.id);
    currentIndex += 1;
  }

  const advanced = {
    ...session,
    currentIndex,
    completedItemIds: Array.from(completedIds),
  };

  saveStudySession(advanced);
  return advanced;
}

export function getCurrentStudySessionItem(session: StudySession): StudySessionItem | null {
  return session.queue[session.currentIndex] || null;
}

export function skipCurrentStudySessionItem(session: StudySession): StudySession {
  const current = session.queue[session.currentIndex];
  if (!current) return session;

  const remaining = session.queue.slice(session.currentIndex + 1);
  const queueAhead = session.queue.slice(0, session.currentIndex);
  const updated: StudySession = {
    ...session,
    queue: [...queueAhead, ...remaining, current],
  };

  saveStudySession(updated);
  return updated;
}

export function getStudySessionSummary(session: StudySession, progress: UserProgress): StudySessionSummary {
  const completedIds = new Set(session.completedItemIds);
  const completedItems = session.queue.filter(item => completedIds.has(item.id));
  const quizItems = session.queue.filter(item =>
    item.itemType === 'quiz' || (item.itemType === 'review' && item.reviewItemType === 'quiz')
  );

  let quizzesAttempted = 0;
  let quizzesPassed = 0;

  quizItems.forEach(item => {
    const subjectProgress = progress.subjects[item.subjectId];
    if (hasQuizAttemptSince(subjectProgress, item.targetId, session.startedAt)) {
      quizzesAttempted += 1;
    }
    if (isQuizPassed(subjectProgress, item.targetId)) {
      quizzesPassed += 1;
    }
  });

  return {
    sectionsCompleted: completedItems.filter(item => item.itemType === 'read').length,
    quizzesAttempted,
    quizzesPassed,
    exercisesPassed: session.queue.filter(item =>
      (item.itemType === 'exercise' || (item.itemType === 'review' && item.reviewItemType === 'exercise'))
      && isExercisePassed(progress.subjects[item.subjectId], item.targetId)
    ).length,
    reviewItemsCompleted: completedItems.filter(item => item.itemType === 'review').length,
  };
}

export function createStudySessionHistoryEntry(
  session: StudySession,
  progress: UserProgress,
  completedAt: string = new Date().toISOString()
): StudySessionHistoryEntry {
  const startedAtTime = parseDate(session.startedAt);
  const completedAtTime = parseDate(completedAt);

  return {
    sessionId: session.id,
    subjectId: session.subjectId,
    subjectCode: session.subjectCode,
    startedAt: session.startedAt,
    completedAt,
    durationSeconds: startedAtTime && completedAtTime
      ? Math.max(0, Math.round((completedAtTime - startedAtTime) / 1000))
      : 0,
    itemCount: session.queue.length,
    completedItemIds: [...session.completedItemIds],
    summary: getStudySessionSummary(session, progress),
  };
}
