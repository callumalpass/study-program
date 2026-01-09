// Progress calculation and subject availability logic

import type {
  Subject,
  SubjectProgress,
  UserProgress,
  SubjectStatus,
  QuizAttempt,
  ExamAttempt,
  ProjectSubmission,
} from './types';
import { QUIZ_PASSING_SCORE } from './types';
import { progressStorage } from './storage';

/**
 * Get the best (highest) score from a list of quiz or exam attempts.
 * Returns 0 if the array is empty.
 */
function getBestScore(attempts: QuizAttempt[] | ExamAttempt[]): number {
  if (attempts.length === 0) return 0;
  return Math.max(...attempts.map(a => a.score));
}

/**
 * Check if a score meets the passing threshold.
 */
function isScorePassing(score: number): boolean {
  return score >= QUIZ_PASSING_SCORE;
}

/**
 * Get the best project submission by AI evaluation score.
 * Returns the submission with the highest AI score, or the first submission if none have AI evaluations.
 * Returns undefined if the submissions array is empty.
 */
function getBestProjectSubmission(submissions: ProjectSubmission[]): ProjectSubmission | undefined {
  if (submissions.length === 0) {
    return undefined;
  }
  return submissions.reduce((best, sub) => {
    const score = sub.aiEvaluation?.score ?? 0;
    const bestScore = best.aiEvaluation?.score ?? 0;
    return score > bestScore ? sub : best;
  });
}

/**
 * Calculate completion percentage for a subject
 */
export function calculateSubjectCompletion(
  subject: Subject,
  progress: SubjectProgress | undefined
): number {
  if (!progress || progress.status === 'not_started') {
    return 0;
  }

  if (progress.status === 'completed') {
    return 100;
  }

  // Calculate completion based on quizzes, exercises, and topics
  let totalItems = 0;
  let completedItems = 0;

  // Count topics with content read (if they have quizzes or exercises)
  subject.topics.forEach(topic => {
    // Count quizzes
    topic.quizIds.forEach(quizId => {
      totalItems++;
      const attempts = progress.quizAttempts?.[quizId];
      // Consider quiz completed if best score meets passing threshold
      if (attempts && attempts.length > 0 && isScorePassing(getBestScore(attempts))) {
        completedItems++;
      }
    });

    // Count exercises
    topic.exerciseIds.forEach(exerciseId => {
      totalItems++;
      const completion = progress.exerciseCompletions?.[exerciseId];
      // Consider exercise completed if passed
      if (completion?.passed) {
        completedItems++;
      }
    });
  });

  // Count exams if present
  const examIds = subject.examIds || [];
  examIds.forEach(examId => {
    totalItems++;
    const attempts = progress.examAttempts?.[examId];
    if (attempts && attempts.length > 0 && isScorePassing(getBestScore(attempts))) {
      completedItems++;
    }
  });

  // Count projects if present
  const projectIds = subject.projectIds || [];
  projectIds.forEach(projectId => {
    totalItems++;
    const submissions = progress.projectSubmissions?.[projectId];
    if (submissions && submissions.length > 0) {
      const bestSubmission = getBestProjectSubmission(submissions);

      if (bestSubmission) {
        if (bestSubmission.aiEvaluation) {
          // Has AI evaluation - require passing score
          if (isScorePassing(bestSubmission.aiEvaluation.score)) {
            completedItems++;
          }
        } else {
          // No AI evaluation - count submission as complete
          completedItems++;
        }
      }
    }
  });

  // If no items, return 0
  if (totalItems === 0) {
    return 0;
  }

  return Math.round((completedItems / totalItems) * 100);
}

/**
 * Check if all prerequisites for a subject are met
 */
export function arePrerequisitesMet(
  subject: Subject,
  userProgress: UserProgress
): boolean {
  if (!subject.prerequisites || subject.prerequisites.length === 0) {
    return true;
  }

  return subject.prerequisites.every(prereqId => {
    const prereqProgress = userProgress.subjects[prereqId];
    return prereqProgress && prereqProgress.status === 'completed';
  });
}

/**
 * Get all subjects that are available (prerequisites met)
 */
export function getAvailableSubjects(
  subjects: Subject[],
  userProgress: UserProgress
): Subject[] {
  return subjects.filter(subject => arePrerequisitesMet(subject, userProgress));
}

/**
 * Get subjects that are currently in progress
 */
export function getInProgressSubjects(
  subjects: Subject[],
  userProgress: UserProgress
): Subject[] {
  return subjects.filter(subject => {
    const progress = userProgress.subjects[subject.id];
    return progress && progress.status === 'in_progress';
  });
}

/**
 * Get completed subjects
 */
export function getCompletedSubjects(
  subjects: Subject[],
  userProgress: UserProgress
): Subject[] {
  return subjects.filter(subject => {
    const progress = userProgress.subjects[subject.id];
    return progress && progress.status === 'completed';
  });
}

/**
 * Calculate overall degree progress
 */
export function calculateOverallProgress(
  subjects: Subject[],
  userProgress: UserProgress
): {
  totalSubjects: number;
  completedSubjects: number;
  inProgressSubjects: number;
  totalHours: number;
  completedHours: number;
  percentageComplete: number;
} {
  const totalSubjects = subjects.length;
  const completedSubjects = getCompletedSubjects(subjects, userProgress).length;
  const inProgressSubjects = getInProgressSubjects(subjects, userProgress).length;

  const totalHours = subjects.reduce((sum, subject) => sum + subject.estimatedHours, 0);

  const completedHours = subjects.reduce((sum, subject) => {
    const progress = userProgress.subjects[subject.id];
    if (!progress) return sum;

    const completion = calculateSubjectCompletion(subject, progress);
    return sum + (subject.estimatedHours * completion) / 100;
  }, 0);

  const percentageComplete = totalSubjects > 0
    ? Math.round((completedSubjects / totalSubjects) * 100)
    : 0;

  return {
    totalSubjects,
    completedSubjects,
    inProgressSubjects,
    totalHours,
    completedHours: Math.round(completedHours),
    percentageComplete,
  };
}

/**
 * Get the next recommended subject to study
 */
export function getNextRecommendedSubject(
  subjects: Subject[],
  userProgress: UserProgress
): Subject | null {
  // First, check if there are any in-progress subjects
  const inProgress = getInProgressSubjects(subjects, userProgress);
  if (inProgress.length > 0) {
    // Return the earliest year/semester in-progress subject
    return inProgress.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.semester - b.semester;
    })[0];
  }

  // If no in-progress, find available subjects not yet started
  const available = getAvailableSubjects(subjects, userProgress).filter(subject => {
    const progress = userProgress.subjects[subject.id];
    return !progress || progress.status === 'not_started';
  });

  if (available.length === 0) {
    return null; // All subjects completed or blocked by prerequisites
  }

  // Return the earliest year/semester available subject
  return available.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.semester - b.semester;
  })[0];
}

/**
 * Get subjects grouped by year and semester
 */
export function getSubjectsByYearAndSemester(
  subjects: Subject[]
): Map<number, Map<number, Subject[]>> {
  const grouped = new Map<number, Map<number, Subject[]>>();

  subjects.forEach(subject => {
    if (!grouped.has(subject.year)) {
      grouped.set(subject.year, new Map());
    }

    const yearMap = grouped.get(subject.year)!;
    if (!yearMap.has(subject.semester)) {
      yearMap.set(subject.semester, []);
    }

    yearMap.get(subject.semester)!.push(subject);
  });

  return grouped;
}

/**
 * Check if a subject can be started (prerequisites met and not completed)
 */
export function canStartSubject(
  subject: Subject,
  userProgress: UserProgress
): boolean {
  const progress = userProgress.subjects[subject.id];

  // Can't start if already completed
  if (progress && progress.status === 'completed') {
    return false;
  }

  // Can start if prerequisites are met
  return arePrerequisitesMet(subject, userProgress);
}

/**
 * Mark a subject as started
 */
export function startSubject(subjectId: string): void {
  const existing = progressStorage.getSubjectProgress(subjectId);

  if (existing && existing.status !== 'not_started') {
    return; // Already started or completed
  }

  progressStorage.updateSubjectProgress(subjectId, {
    status: 'in_progress',
    startedAt: new Date().toISOString(),
  });
}

/**
 * Mark a subject as completed
 */
export function completeSubject(subjectId: string): void {
  const existing = progressStorage.getSubjectProgress(subjectId);

  if (existing && existing.status === 'completed') {
    return; // Already completed
  }

  progressStorage.updateSubjectProgress(subjectId, {
    status: 'completed',
    completedAt: new Date().toISOString(),
  });
}

/**
 * Auto-complete a subject if all requirements are met
 */
export function autoCompleteSubjectIfReady(subject: Subject): void {
  const progress = progressStorage.getSubjectProgress(subject.id);

  if (!progress || progress.status === 'completed') {
    return;
  }

  const completion = calculateSubjectCompletion(subject, progress);

  // Auto-complete if 100% completion reached
  if (completion >= 100) {
    completeSubject(subject.id);
  }
}

/**
 * Get detailed progress for a specific subject
 */
export function getSubjectProgressDetails(subject: Subject): {
  status: SubjectStatus;
  completionPercentage: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  examsCompleted: number;
  totalExams: number;
  exercisesCompleted: number;
  totalExercises: number;
  projectsCompleted: number;
  totalProjects: number;
  startedAt?: string;
  completedAt?: string;
} {
  const progress = progressStorage.getSubjectProgress(subject.id);

  let totalQuizzes = 0;
  let quizzesCompleted = 0;
  let totalExams = subject.examIds?.length ?? 0;
  let examsCompleted = 0;
  let totalExercises = 0;
  let exercisesCompleted = 0;
  let totalProjects = subject.projectIds?.length ?? 0;
  let projectsCompleted = 0;

  subject.topics.forEach(topic => {
    totalQuizzes += topic.quizIds.length;
    totalExercises += topic.exerciseIds.length;

    if (progress) {
      // Count completed quizzes (passing score)
      topic.quizIds.forEach(quizId => {
        const attempts = progress.quizAttempts?.[quizId];
        if (attempts && attempts.length > 0 && isScorePassing(getBestScore(attempts))) {
          quizzesCompleted++;
        }
      });

      // Count completed exercises
      topic.exerciseIds.forEach(exerciseId => {
        const completion = progress.exerciseCompletions?.[exerciseId];
        if (completion?.passed) {
          exercisesCompleted++;
        }
      });
    }
  });

  // Count exams
  if (progress && subject.examIds) {
    subject.examIds.forEach(examId => {
      const attempts = progress.examAttempts?.[examId];
      if (attempts && attempts.length > 0 && isScorePassing(getBestScore(attempts))) {
        examsCompleted++;
      }
    });
  }

  // Count projects
  if (progress && subject.projectIds) {
    subject.projectIds.forEach(projectId => {
      const submissions = progress.projectSubmissions?.[projectId];
      if (submissions && submissions.length > 0) {
        const bestSubmission = getBestProjectSubmission(submissions);

        if (bestSubmission) {
          if (bestSubmission.aiEvaluation) {
            if (isScorePassing(bestSubmission.aiEvaluation.score)) {
              projectsCompleted++;
            }
          } else {
            // No AI evaluation - count submission as complete
            projectsCompleted++;
          }
        }
      }
    });
  }

  return {
    status: progress?.status || 'not_started',
    completionPercentage: calculateSubjectCompletion(subject, progress),
    quizzesCompleted,
    totalQuizzes,
    examsCompleted,
    totalExams,
    exercisesCompleted,
    totalExercises,
    projectsCompleted,
    totalProjects,
    startedAt: progress?.startedAt,
    completedAt: progress?.completedAt,
  };
}

/**
 * Check if a quiz is completed (passed with a passing score)
 */
export function isQuizCompleted(
  quizId: string,
  progress: SubjectProgress | undefined
): boolean {
  if (!progress) return false;
  const attempts = progress.quizAttempts?.[quizId];
  if (!attempts || attempts.length === 0) return false;
  return isScorePassing(getBestScore(attempts));
}

/**
 * Get the best score for a quiz (or null if no attempts)
 */
export function getQuizBestScore(
  quizId: string,
  progress: SubjectProgress | undefined
): number | null {
  if (!progress) return null;
  const attempts = progress.quizAttempts?.[quizId];
  if (!attempts || attempts.length === 0) return null;
  return getBestScore(attempts);
}

/**
 * Check if an exercise is completed (passed)
 */
export function isExerciseCompleted(
  exerciseId: string,
  progress: SubjectProgress | undefined
): boolean {
  if (!progress) return false;
  const completion = progress.exerciseCompletions?.[exerciseId];
  return completion?.passed ?? false;
}

/**
 * Check if an exam is completed (passed with a passing score)
 */
export function isExamCompleted(
  examId: string,
  progress: SubjectProgress | undefined
): boolean {
  if (!progress) return false;
  const attempts = progress.examAttempts?.[examId];
  if (!attempts || attempts.length === 0) return false;
  return isScorePassing(getBestScore(attempts));
}

/**
 * Get the best score for an exam (or null if no attempts)
 */
export function getExamBestScore(
  examId: string,
  progress: SubjectProgress | undefined
): number | null {
  if (!progress) return null;
  const attempts = progress.examAttempts?.[examId];
  if (!attempts || attempts.length === 0) return null;
  return getBestScore(attempts);
}

/**
 * Check if a project is completed (has a submission with passing AI evaluation, or any submission if no AI evaluation)
 */
export function isProjectCompleted(
  projectId: string,
  progress: SubjectProgress | undefined
): boolean {
  if (!progress) return false;
  const submissions = progress.projectSubmissions?.[projectId];
  if (!submissions || submissions.length === 0) return false;

  const bestSubmission = getBestProjectSubmission(submissions);
  if (!bestSubmission) return false;

  if (bestSubmission.aiEvaluation) {
    return isScorePassing(bestSubmission.aiEvaluation.score);
  }
  // No AI evaluation - count submission as complete
  return true;
}

/**
 * Get the best project submission (highest AI score, or first if no AI evaluations)
 * Returns undefined if no submissions exist.
 */
export function getProjectBestSubmission(
  projectId: string,
  progress: SubjectProgress | undefined
): ProjectSubmission | undefined {
  if (!progress) return undefined;
  const submissions = progress.projectSubmissions?.[projectId];
  if (!submissions || submissions.length === 0) return undefined;
  return getBestProjectSubmission(submissions);
}

/**
 * Get subjects that directly depend on this subject (immediate dependents only)
 */
export function getDependentSubjects(
  subjectId: string,
  subjects: Subject[]
): Subject[] {
  return subjects.filter(s => s.prerequisites && s.prerequisites.includes(subjectId));
}

/**
 * Get the prerequisite subjects for a given subject (immediate only)
 */
export function getPrerequisiteSubjects(
  subject: Subject,
  subjects: Subject[]
): Subject[] {
  if (!subject.prerequisites) return [];
  return subject.prerequisites
    .map(prereqId => subjects.find(s => s.id === prereqId))
    .filter((s): s is Subject => s !== undefined);
}

// Export convenience functions that use the singleton storage
export const getProgress = () => progressStorage.getProgress();
export const getSubjectProgress = (id: string) => progressStorage.getSubjectProgress(id);
