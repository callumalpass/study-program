import type {
  ActivityEvent,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
  QuizAttempt,
  Subject,
  SubjectProgress,
  SubtopicCompletion,
  UserProgress,
} from './types';
import { QUIZ_PASSING_SCORE } from './types';

interface SubjectActivityMeta {
  subject: Subject;
  topicTitleById: Map<string, string>;
  subtopicById: Map<string, { title: string; topicId: string; topicTitle: string }>;
}

function parseTime(value: string | undefined): number {
  if (!value) return 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function buildSubjectMeta(subjects: Subject[]): Map<string, SubjectActivityMeta> {
  const meta = new Map<string, SubjectActivityMeta>();

  subjects.forEach(subject => {
    const topicTitleById = new Map<string, string>();
    const subtopicById = new Map<string, { title: string; topicId: string; topicTitle: string }>();

    subject.topics.forEach(topic => {
      topicTitleById.set(topic.id, topic.title);
      (topic.subtopics || []).forEach(subtopic => {
        subtopicById.set(subtopic.id, {
          title: subtopic.title,
          topicId: topic.id,
          topicTitle: topic.title,
        });
      });
    });

    meta.set(subject.id, { subject, topicTitleById, subtopicById });
  });

  return meta;
}

function getSubjectCode(subjectId: string, meta: Map<string, SubjectActivityMeta>): string {
  return meta.get(subjectId)?.subject.code || subjectId.toUpperCase();
}

function pushReadingCompletions(
  events: ActivityEvent[],
  subjectId: string,
  subjectProgress: SubjectProgress,
  meta: Map<string, SubjectActivityMeta>
): void {
  const subjectMeta = meta.get(subjectId);
  const subjectCode = getSubjectCode(subjectId, meta);
  const completions = subjectProgress.subtopicCompletions || {};

  Object.entries(completions).forEach(([subtopicId, completion]: [string, SubtopicCompletion]) => {
    const subtopic = subjectMeta?.subtopicById.get(subtopicId);

    events.push({
      id: `reading:${subjectId}:${subtopicId}`,
      type: 'reading_completed',
      timestamp: completion.completedAt,
      subjectId,
      subjectCode,
      topicId: subtopic?.topicId,
      itemId: subtopicId,
      title: subtopic ? `Completed ${subtopic.title}` : 'Completed reading section',
      detail: subtopic ? `${subjectCode} - ${subtopic.topicTitle}` : subjectCode,
    });
  });
}

function pushQuizAttempts(
  events: ActivityEvent[],
  subjectId: string,
  subjectProgress: SubjectProgress,
  meta: Map<string, SubjectActivityMeta>
): void {
  const subjectCode = getSubjectCode(subjectId, meta);

  Object.entries(subjectProgress.quizAttempts || {}).forEach(([quizId, attempts]: [string, QuizAttempt[]]) => {
    attempts.forEach(attempt => {
      events.push({
        id: `quiz:${subjectId}:${quizId}:${attempt.attemptId || attempt.timestamp}`,
        type: 'quiz_attempted',
        timestamp: attempt.timestamp,
        subjectId,
        subjectCode,
        itemId: quizId,
        title: 'Quiz attempted',
        detail: `${subjectCode} - ${quizId}`,
        score: attempt.score,
        passed: attempt.score >= QUIZ_PASSING_SCORE,
        durationSeconds: attempt.timeSpentSeconds,
      });
    });
  });
}

function pushExamAttempts(
  events: ActivityEvent[],
  subjectId: string,
  subjectProgress: SubjectProgress,
  meta: Map<string, SubjectActivityMeta>
): void {
  const subjectCode = getSubjectCode(subjectId, meta);

  Object.entries(subjectProgress.examAttempts || {}).forEach(([examId, attempts]: [string, ExamAttempt[]]) => {
    attempts.forEach(attempt => {
      events.push({
        id: `exam:${subjectId}:${examId}:${attempt.attemptId || attempt.timestamp}`,
        type: 'exam_attempted',
        timestamp: attempt.timestamp,
        subjectId,
        subjectCode,
        itemId: examId,
        title: 'Exam attempted',
        detail: `${subjectCode} - ${examId}`,
        score: attempt.score,
        passed: attempt.score >= QUIZ_PASSING_SCORE,
        durationSeconds: attempt.timeSpentSeconds,
      });
    });
  });
}

function pushExerciseCompletions(
  events: ActivityEvent[],
  subjectId: string,
  subjectProgress: SubjectProgress,
  meta: Map<string, SubjectActivityMeta>
): void {
  const subjectCode = getSubjectCode(subjectId, meta);

  Object.entries(subjectProgress.exerciseCompletions || {}).forEach(
    ([exerciseId, completion]: [string, ExerciseCompletion]) => {
      events.push({
        id: `exercise:${subjectId}:${exerciseId}:${completion.completionId || completion.timestamp}`,
        type: 'exercise_completed',
        timestamp: completion.timestamp,
        subjectId,
        subjectCode,
        itemId: exerciseId,
        title: completion.passed ? 'Exercise completed' : 'Exercise worked',
        detail: `${subjectCode} - ${exerciseId}`,
        passed: completion.passed,
        durationSeconds: completion.timeSpentSeconds,
      });
    }
  );
}

function pushProjectSubmissions(
  events: ActivityEvent[],
  subjectId: string,
  subjectProgress: SubjectProgress,
  meta: Map<string, SubjectActivityMeta>
): void {
  const subjectCode = getSubjectCode(subjectId, meta);

  Object.entries(subjectProgress.projectSubmissions || {}).forEach(
    ([projectId, submissions]: [string, ProjectSubmission[]]) => {
      submissions.forEach(submission => {
        events.push({
          id: `project:${subjectId}:${projectId}:${submission.submissionId || submission.timestamp}`,
          type: 'project_submitted',
          timestamp: submission.timestamp,
          subjectId,
          subjectCode,
          itemId: projectId,
          title: 'Project submitted',
          detail: `${subjectCode} - ${projectId}`,
          score: submission.aiEvaluation?.score,
          passed: submission.aiEvaluation ? submission.aiEvaluation.score >= QUIZ_PASSING_SCORE : undefined,
        });
      });
    }
  );
}

export function getActivityEvents(progress: UserProgress, subjects: Subject[] = []): ActivityEvent[] {
  const meta = buildSubjectMeta(subjects);
  const events: ActivityEvent[] = [];

  Object.entries(progress.subjects || {}).forEach(([subjectId, subjectProgress]) => {
    pushReadingCompletions(events, subjectId, subjectProgress, meta);
    pushQuizAttempts(events, subjectId, subjectProgress, meta);
    pushExerciseCompletions(events, subjectId, subjectProgress, meta);
    pushExamAttempts(events, subjectId, subjectProgress, meta);
    pushProjectSubmissions(events, subjectId, subjectProgress, meta);
  });

  (progress.studySessionHistory || []).forEach(session => {
    events.push({
      id: `study-session:${session.sessionId}`,
      type: 'study_session_completed',
      timestamp: session.completedAt,
      subjectId: session.subjectId,
      subjectCode: session.subjectCode,
      sessionId: session.sessionId,
      title: 'Study session completed',
      detail: `${session.subjectCode} - ${session.itemCount} item${session.itemCount === 1 ? '' : 's'}`,
      durationSeconds: session.durationSeconds,
      count: session.itemCount,
    });
  });

  return events.sort((a, b) => {
    const timeDelta = parseTime(b.timestamp) - parseTime(a.timestamp);
    return timeDelta !== 0 ? timeDelta : a.id.localeCompare(b.id);
  });
}

export function getRecentActivityEvents(
  progress: UserProgress,
  subjects: Subject[] = [],
  limit: number = 10
): ActivityEvent[] {
  return getActivityEvents(progress, subjects).slice(0, limit);
}
