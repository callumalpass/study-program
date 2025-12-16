import type { Subject, UserProgress, StudyPace, SubjectScheduleOverride } from '@/core/types';

// Weeks per topic based on pace
export const PACE_WEEKS_PER_TOPIC: Record<StudyPace, number> = {
  standard: 2,      // ~14 weeks per subject (7 topics)
  accelerated: 1,   // ~7 weeks per subject
  intensive: 0.5,   // ~3.5 weeks per subject
};

export const PACE_LABELS: Record<StudyPace, string> = {
  standard: 'Standard (~4 years)',
  accelerated: 'Accelerated (~2 years)',
  intensive: 'Intensive (~1 year)',
};

export const PACE_DESCRIPTIONS: Record<StudyPace, string> = {
  standard: '2 weeks per topic. Steady pace with time for deep understanding.',
  accelerated: '1 week per topic. Faster pace for dedicated learners.',
  intensive: '2 topics per week. Full-time study commitment.',
};

export interface ScheduledSubject {
  subject: Subject;
  startDate: Date;
  endDate: Date;
  status: 'completed' | 'in-progress' | 'scheduled' | 'blocked';
  completionPercentage: number;
  row: number;
  hasOverride: boolean;
  earliestValidStart: Date;  // Earliest date respecting prerequisites
}

/**
 * Topologically sort subjects by their prerequisite dependencies.
 * Subjects with fewer/no prerequisites come first.
 */
export function topologicalSort(subjects: Subject[]): Subject[] {
  const levels = new Map<string, number>();
  const processing = new Set<string>();
  const subjectMap = new Map(subjects.map(s => [s.id, s]));

  const getLevel = (subjectId: string): number => {
    if (levels.has(subjectId)) return levels.get(subjectId)!;
    if (processing.has(subjectId)) return 0; // Circular dependency guard

    processing.add(subjectId);
    const subject = subjectMap.get(subjectId);

    if (!subject || subject.prerequisites.length === 0) {
      levels.set(subjectId, 0);
      processing.delete(subjectId);
      return 0;
    }

    const maxPrereqLevel = Math.max(
      ...subject.prerequisites
        .filter(p => subjectMap.has(p))
        .map(p => getLevel(p))
    );
    const level = maxPrereqLevel + 1;

    levels.set(subjectId, level);
    processing.delete(subjectId);
    return level;
  };

  subjects.forEach(s => getLevel(s.id));

  return [...subjects].sort((a, b) => {
    const levelDiff = (levels.get(a.id) || 0) - (levels.get(b.id) || 0);
    if (levelDiff !== 0) return levelDiff;
    // Secondary sort by year/semester
    if (a.year !== b.year) return a.year - b.year;
    return a.semester - b.semester;
  });
}

/**
 * Check if all prerequisites for a subject are completed
 */
function arePrerequisitesCompleted(
  subject: Subject,
  userProgress: UserProgress
): boolean {
  return subject.prerequisites.every(prereqId => {
    const progress = userProgress.subjects[prereqId];
    return progress?.status === 'completed';
  });
}

/**
 * Calculate completion percentage for a subject based on quizzes and exercises
 */
function calculateSubjectCompletion(
  subject: Subject,
  userProgress: UserProgress
): number {
  const subjectProgress = userProgress.subjects[subject.id];
  if (!subjectProgress) return 0;

  let completed = 0;
  let total = 0;

  // Count quizzes
  for (const topic of subject.topics) {
    for (const quizId of topic.quizIds) {
      total++;
      const attempts = subjectProgress.quizAttempts[quizId];
      if (attempts && attempts.some(a => a.score >= 70)) {
        completed++;
      }
    }

    // Count exercises
    for (const exerciseId of topic.exerciseIds) {
      total++;
      const completion = subjectProgress.exerciseCompletions[exerciseId];
      if (completion?.passed) {
        completed++;
      }
    }
  }

  // Count exams
  if (subject.examIds) {
    for (const examId of subject.examIds) {
      total++;
      const attempts = subjectProgress.examAttempts[examId];
      if (attempts && attempts.some(a => a.score >= 70)) {
        completed++;
      }
    }
  }

  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

/**
 * Determine the status of a subject based on progress and prerequisites
 */
function determineSubjectStatus(
  subject: Subject,
  userProgress: UserProgress
): ScheduledSubject['status'] {
  const subjectProgress = userProgress.subjects[subject.id];

  if (subjectProgress?.status === 'completed') {
    return 'completed';
  }

  if (subjectProgress?.status === 'in_progress') {
    return 'in-progress';
  }

  if (arePrerequisitesCompleted(subject, userProgress)) {
    return 'scheduled';
  }

  return 'blocked';
}

/**
 * Calculate the full schedule for all subjects based on the study plan
 */
export function calculateSchedule(
  subjects: Subject[],
  userProgress: UserProgress,
  startDate: Date,
  pace: StudyPace,
  subjectOverrides?: Record<string, SubjectScheduleOverride>
): Map<string, ScheduledSubject> {
  const schedule = new Map<string, ScheduledSubject>();
  const sortedSubjects = topologicalSort(subjects);
  const weeksPerTopic = PACE_WEEKS_PER_TOPIC[pace];

  for (const subject of sortedSubjects) {
    const override = subjectOverrides?.[subject.id];

    // Calculate earliest possible start (after all prerequisites end)
    let earliestValidStart = new Date(startDate);

    for (const prereqId of subject.prerequisites) {
      const prereq = schedule.get(prereqId);
      if (prereq && prereq.endDate > earliestValidStart) {
        earliestValidStart = new Date(prereq.endDate);
      }
    }

    // Use override start date if provided, otherwise use earliest valid
    let actualStart: Date;
    let hasOverride = false;

    if (override?.customStartDate) {
      actualStart = new Date(override.customStartDate);
      hasOverride = true;
    } else {
      actualStart = new Date(earliestValidStart);
    }

    // Calculate duration based on topic count (or override)
    const topicCount = subject.topics.length || 7;
    let durationDays: number;

    if (override?.customDurationWeeks) {
      durationDays = Math.ceil(override.customDurationWeeks * 7);
      hasOverride = true;
    } else {
      durationDays = Math.ceil(topicCount * weeksPerTopic * 7);
    }

    const endDate = new Date(actualStart);
    endDate.setDate(endDate.getDate() + durationDays);

    // Determine status and completion
    const status = determineSubjectStatus(subject, userProgress);
    const completionPercentage = calculateSubjectCompletion(subject, userProgress);

    // Simple row allocation: count overlapping subjects
    const row = Array.from(schedule.values()).filter(
      s => s.startDate < endDate && s.endDate > actualStart
    ).length;

    schedule.set(subject.id, {
      subject,
      startDate: actualStart,
      endDate,
      status,
      completionPercentage,
      row,
      hasOverride,
      earliestValidStart,
    });
  }

  return schedule;
}

/**
 * Calculate what date corresponds to an x-position on the timeline
 */
export function xPositionToDate(
  x: number,
  bounds: { start: Date; end: Date },
  labelWidth: number,
  dayWidth: number
): Date {
  const daysFromStart = Math.round((x - labelWidth) / dayWidth);
  const date = new Date(bounds.start);
  date.setDate(date.getDate() + daysFromStart);
  return date;
}

/**
 * Get the timeline bounds (earliest start, latest end)
 */
export function getTimelineBounds(
  schedule: Map<string, ScheduledSubject>
): { start: Date; end: Date } {
  const subjects = Array.from(schedule.values());

  if (subjects.length === 0) {
    const now = new Date();
    return { start: now, end: now };
  }

  const start = new Date(Math.min(...subjects.map(s => s.startDate.getTime())));
  const end = new Date(Math.max(...subjects.map(s => s.endDate.getTime())));

  return { start, end };
}

/**
 * Format a date as a short string (e.g., "Jan 2024")
 */
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Calculate the number of days between two dates
 */
export function daysBetween(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((end.getTime() - start.getTime()) / msPerDay);
}

/**
 * Get estimated completion date for the entire degree
 */
export function getEstimatedCompletionDate(
  schedule: Map<string, ScheduledSubject>
): Date {
  const bounds = getTimelineBounds(schedule);
  return bounds.end;
}
