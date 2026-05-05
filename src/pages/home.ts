// Home/Dashboard page
import type {
  Subject,
  SubjectProgress,
  ReviewItem,
  UserProgress,
  QuizAttempt,
  ExerciseCompletion,
  ProjectSubmission,
} from '@/core/types';
import { QUIZ_PASSING_SCORE } from '@/core/types';
import { progressStorage } from '@/core/storage';
import {
  calculateOverallProgress,
  calculateSubjectCompletion,
  getInProgressSubjects,
  getNextRecommendedSubject,
} from '@/core/progress';
import { navigateToSubject, navigateToCurriculum } from '@/core/router';
import {
  advanceStudySession,
  getActiveStudySession,
  getCurrentStudySessionItem,
  getSubjectLastActivityAt,
  type StudySessionItemKind,
} from '@/core/study-session';
import { Icons } from '../components/icons';
import { escapeHtml } from '@/utils/html';

/**
 * Format a review item ID into a human-readable title
 * Quiz IDs support multiple formats:
 *   - "cs101-quiz-1" -> "CS101 Quiz 1"
 *   - "cs101-quiz-1b" -> "CS101 Quiz 1B"
 *   - "cs402-quiz-1-2" -> "CS402 Quiz 1-2" (topic-subquiz format)
 *   - "cs304-t1-quiz-1" -> "CS304 Topic 1 Quiz 1" (topic prefix format)
 *   - "cs102-q1-1" -> "CS102 Quiz 1" (short q format)
 * Exercise IDs: "cs101-t1-ex02" -> "CS101 Topic 1 Exercise 2"
 */
// Regex patterns for parsing review item IDs
const SUBJECT_CODE_PATTERN = /^([a-z]+\d+)/i; // Matches subject code at start (e.g., "cs101", "math201")
const TOPIC_NUMBER_PATTERN = /-t(\d+)-/; // Matches "-t{number}-" to extract topic number
// Quiz ID formats:
// 1. Level letter format: "cs101-quiz-1", "cs101-quiz-1b", "cs102-quiz-2-c"
// 2. Topic-subquiz format: "cs402-quiz-1-2", "math302-quiz-3-1"
// 3. Topic prefix format: "cs304-t1-quiz-1", "cs304-t1-quiz-2"
// 4. Short format: "cs102-q1-1", "cs102-q1-b-1"
const QUIZ_LEVEL_PATTERN = /quiz-(\d+)([a-c])?(?:-([a-c]))?/i; // Matches "quiz-{number}" with optional level letter
const QUIZ_SUBQUIZ_PATTERN = /quiz-(\d+)-(\d+)/i; // Matches "quiz-{topic}-{subquiz}" format
const SHORT_QUIZ_PATTERN = /-q(\d+)(?:-([a-c]))?-(\d+)/i; // Matches short "-q{N}-{M}" or "-q{N}-{level}-{M}" format
const EXERCISE_NUMBER_PATTERN = /ex(\d+)/i; // Matches "ex{number}" for exercise number (e.g., "ex01")

interface DashboardAction {
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  cta: string;
}

export function formatReviewItemTitle(item: ReviewItem): string {
  const id = item.itemId;

  const subjectMatch = id.match(SUBJECT_CODE_PATTERN);
  const subjectCode = subjectMatch ? subjectMatch[1].toUpperCase() : '';

  const topicMatch = id.match(TOPIC_NUMBER_PATTERN);
  const topicNum = topicMatch ? `Topic ${topicMatch[1]}` : '';

  if (item.itemType === 'quiz') {
    // Try short quiz format (e.g., cs102-q1-1, cs102-q1-b-1)
    const shortMatch = id.match(SHORT_QUIZ_PATTERN);
    if (shortMatch) {
      const quizNumber = shortMatch[1];
      const level = (shortMatch[2] || '').toUpperCase();
      return [subjectCode, topicNum, `Quiz ${quizNumber}${level}`].filter(Boolean).join(' ');
    }

    // Try topic-subquiz format (e.g., cs402-quiz-1-2)
    const subquizMatch = id.match(QUIZ_SUBQUIZ_PATTERN);
    if (subquizMatch) {
      const topicNumber = subquizMatch[1];
      const subquizNumber = subquizMatch[2];
      return [subjectCode, topicNum, `Quiz ${topicNumber}-${subquizNumber}`].filter(Boolean).join(' ');
    }

    // Fall back to level letter format (e.g., cs101-quiz-1b)
    const levelMatch = id.match(QUIZ_LEVEL_PATTERN);
    let quizLabel = 'Quiz';
    if (levelMatch) {
      const quizNumber = levelMatch[1];
      // Level can be in group 2 (attached: "1b") or group 3 (separated: "1-b")
      const quizLevel = (levelMatch[2] || levelMatch[3] || '').toUpperCase();
      quizLabel = `Quiz ${quizNumber}${quizLevel}`;
    }
    return [subjectCode, topicNum, quizLabel].filter(Boolean).join(' ');
  } else {
    // Format: cs101-t1-ex01 -> CS101 Topic 1 Exercise 1
    const exMatch = id.match(EXERCISE_NUMBER_PATTERN);
    const exNum = exMatch ? `Exercise ${parseInt(exMatch[1], 10)}` : 'Exercise';
    return [subjectCode, topicNum, exNum].filter(Boolean).join(' ');
  }
}

/**
 * Get the navigation URL for a review item
 */
function getReviewItemUrl(item: ReviewItem): string {
  if (item.itemType === 'quiz') {
    return `#/subject/${item.subjectId}/quiz/${item.itemId}`;
  } else {
    return `#/subject/${item.subjectId}/exercise/${item.itemId}`;
  }
}

/**
 * Render the daily review section.
 * Only shows review items from subjects the user has selected.
 */
function renderDailyReviewSection(): string {
  const selectedIds = progressStorage.getSelectedSubjects();

  // If user has selected subjects, filter review items to only those subjects
  // If no subjects selected (legacy user or new user without selection), show all
  const allDueItems = progressStorage.getDueReviewItems(100); // Get more items so we can filter
  const filteredItems = selectedIds.length > 0
    ? allDueItems.filter(item => selectedIds.includes(item.subjectId))
    : allDueItems;

  const dueItems = filteredItems.slice(0, 5);
  const totalDue = filteredItems.length;

  if (dueItems.length === 0) {
    return '';
  }

  return `
    <section class="daily-review">
      <h2>
        ${Icons.Review || '📚'} Due for Review
        <span class="review-count">${totalDue} item${totalDue !== 1 ? 's' : ''}</span>
      </h2>
      <p class="review-description">These items need reinforcement based on your previous performance.</p>
      <div class="review-list">
        ${dueItems.map(item => `
          <a href="${getReviewItemUrl(item)}" class="review-item" data-item-id="${item.itemId}" data-item-type="${item.itemType}">
            <div class="review-item-icon">
              ${item.itemType === 'quiz' ? Icons.Quiz || '📝' : Icons.Code || '💻'}
            </div>
            <div class="review-item-content">
              <span class="review-item-title">${formatReviewItemTitle(item)}</span>
              <span class="review-item-meta">
                Streak: ${item.streak} · Next interval: ${item.interval} day${item.interval !== 1 ? 's' : ''}
              </span>
            </div>
            <div class="review-item-arrow">→</div>
          </a>
        `).join('')}
      </div>
      ${totalDue > 5 ? `
        <p class="review-more">+ ${totalDue - 5} more items due for review</p>
      ` : ''}
    </section>
  `;
}

function getSelectedDueReviewItems(limit: number): ReviewItem[] {
  const selectedIds = progressStorage.getSelectedSubjects();
  const allDueItems = progressStorage.getDueReviewItems(100);
  const filteredItems = selectedIds.length > 0
    ? allDueItems.filter(item => selectedIds.includes(item.subjectId))
    : allDueItems;

  return filteredItems.slice(0, limit);
}

function getAssessmentTitle(itemType: ReviewItem['itemType'], subjectId: string, itemId: string): string {
  return formatReviewItemTitle({
    itemType,
    subjectId,
    itemId,
    nextReviewAt: '',
    interval: 0,
    streak: 0,
  });
}

function isQuizPassed(progress: SubjectProgress | undefined, quizId: string): boolean {
  return Boolean(
    progress?.quizAttempts?.[quizId]?.some(attempt => attempt.score >= QUIZ_PASSING_SCORE)
  );
}

function isExercisePassed(progress: SubjectProgress | undefined, exerciseId: string): boolean {
  return Boolean(progress?.exerciseCompletions?.[exerciseId]?.passed);
}

function getTopicReadingProgress(topic: Subject['topics'][number], progress: SubjectProgress | undefined): { completed: number; total: number } {
  const subtopics = topic.subtopics || [];
  const completions = progress?.subtopicCompletions || {};
  return {
    completed: subtopics.filter(subtopic => completions[subtopic.id]).length,
    total: subtopics.length,
  };
}

function getReadingActionForTopic(
  subject: Subject,
  progress: SubjectProgress | undefined,
  topic: Subject['topics'][number]
): DashboardAction | null {
  const subtopics = topic.subtopics || [];
  if (subtopics.length === 0) return null;

  const readingProgress = getTopicReadingProgress(topic, progress);
  const nextIncomplete = subtopics.find(subtopic => !progress?.subtopicCompletions?.[subtopic.id]);

  if (!nextIncomplete) return null;

  return {
    icon: Icons.BookOpen || Icons.Curriculum,
    eyebrow: 'Next Up',
    title: `Read: ${nextIncomplete.title}`,
    description: `${subject.code} · ${topic.title}`,
    meta: `You completed ${readingProgress.completed} of ${readingProgress.total} sections in this topic.`,
    href: `#/subject/${subject.id}/topic/${topic.id}/subtopic/${nextIncomplete.slug}`,
    cta: 'Continue',
  };
}

function getNextReadingAction(
  subject: Subject,
  progress: SubjectProgress | undefined,
  focusTopicId?: string
): DashboardAction | null {
  const topics = focusTopicId
    ? [
        ...subject.topics.filter(topic => topic.id === focusTopicId),
        ...subject.topics.filter(topic => topic.id !== focusTopicId),
      ]
    : subject.topics;

  for (const topic of topics) {
    const action = getReadingActionForTopic(subject, progress, topic);
    if (action) return action;
  }

  return null;
}

function getPracticeActionForTopic(
  subject: Subject,
  progress: SubjectProgress | undefined,
  topic: Subject['topics'][number]
): DashboardAction | null {
  const nextQuizId = topic.quizIds.find(quizId => !isQuizPassed(progress, quizId));
  if (nextQuizId) {
    return {
      icon: Icons.StatQuiz,
      eyebrow: 'Next Up',
      title: `Quiz: ${getAssessmentTitle('quiz', subject.id, nextQuizId)}`,
      description: `${subject.code} · ${topic.title}`,
      meta: 'Next unpassed quiz for this topic.',
      href: `#/subject/${subject.id}/quiz/${nextQuizId}`,
      cta: 'Continue',
    };
  }

  const nextExerciseId = topic.exerciseIds.find(exerciseId => !isExercisePassed(progress, exerciseId));
  if (nextExerciseId) {
    return {
      icon: Icons.StatCode,
      eyebrow: 'Next Up',
      title: `Exercise: ${getAssessmentTitle('exercise', subject.id, nextExerciseId)}`,
      description: `${subject.code} · ${topic.title}`,
      meta: 'Next unsolved exercise for this topic.',
      href: `#/subject/${subject.id}/exercise/${nextExerciseId}`,
      cta: 'Continue',
    };
  }

  return null;
}

function getNextPracticeAction(
  subject: Subject,
  progress: SubjectProgress | undefined,
  focusTopicId?: string
): DashboardAction | null {
  const topics = focusTopicId
    ? [
        ...subject.topics.filter(topic => topic.id === focusTopicId),
        ...subject.topics.filter(topic => topic.id !== focusTopicId),
      ]
    : subject.topics;

  for (const topic of topics) {
    const action = getPracticeActionForTopic(subject, progress, topic);
    if (action) return action;
  }

  return null;
}

function getSessionItemIcon(itemType: StudySessionItemKind): string {
  switch (itemType) {
    case 'read':
      return Icons.BookOpen || Icons.Curriculum;
    case 'quiz':
    case 'review':
    case 'exam':
      return Icons.StatQuiz;
    case 'exercise':
      return Icons.StatCode;
    case 'project':
      return Icons.StatProject;
    default:
      return Icons.Progress;
  }
}

function getStudySessionAction(userProgress: UserProgress): DashboardAction | null {
  const session = getActiveStudySession();
  if (!session) return null;

  const advancedSession = advanceStudySession(session, userProgress);
  const item = getCurrentStudySessionItem(advancedSession);
  if (!item) return null;

  return {
    icon: getSessionItemIcon(item.itemType),
    eyebrow: 'Next Up',
    title: item.title,
    description: item.context,
    meta: `Study session · ${item.rationale}`,
    href: item.href,
    cta: 'Continue',
  };
}

function getLastActiveSubjectContext(
  subjects: Subject[],
  userProgress: UserProgress
): { subject: Subject; topicId?: string } | null {
  let bestSubject: Subject | null = null;
  let bestTopicId: string | undefined;
  let bestTimestamp = 0;

  subjects.forEach(subject => {
    const timestamp = getSubjectLastActivityAt(userProgress, subject.id);
    if (!timestamp) return;

    const progress = userProgress.subjects[subject.id];
    let topicId: string | undefined;
    let topicTimestamp = 0;

    subject.topics.forEach(topic => {
      (topic.subtopics || []).forEach(subtopic => {
        const viewTime = new Date(progress?.subtopicViews?.[subtopic.id]?.lastViewedAt || '').getTime();
        const completedTime = new Date(progress?.subtopicCompletions?.[subtopic.id]?.completedAt || '').getTime();
        const latestSubtopicTime = Math.max(
          Number.isNaN(viewTime) ? 0 : viewTime,
          Number.isNaN(completedTime) ? 0 : completedTime
        );
        if (latestSubtopicTime > topicTimestamp) {
          topicTimestamp = latestSubtopicTime;
          topicId = topic.id;
        }
      });
    });

    if (timestamp > bestTimestamp) {
      bestSubject = subject;
      bestTopicId = topicId;
      bestTimestamp = timestamp;
    }
  });

  return bestSubject ? { subject: bestSubject, topicId: bestTopicId } : null;
}

function getDashboardAction(
  subjects: Subject[],
  userProgress: UserProgress,
  nextRecommended: Subject | null
): DashboardAction | null {
  const studySessionAction = getStudySessionAction(userProgress);
  if (studySessionAction) return studySessionAction;

  const dueReview = getSelectedDueReviewItems(1)[0];
  if (dueReview) {
    return {
      icon: dueReview.itemType === 'quiz' ? Icons.StatQuiz : Icons.StatCode,
      eyebrow: 'Next Up',
      title: `Review: ${formatReviewItemTitle(dueReview)}`,
      description: 'Reinforce an item that is due based on your previous attempts.',
      meta: `Streak ${dueReview.streak} · ${dueReview.interval} day interval`,
      href: getReviewItemUrl(dueReview),
      cta: 'Continue',
    };
  }

  const lastActiveContext = getLastActiveSubjectContext(subjects, userProgress);
  if (lastActiveContext?.topicId) {
    const activeProgress = userProgress.subjects[lastActiveContext.subject.id];
    const activeTopic = lastActiveContext.subject.topics.find(topic => topic.id === lastActiveContext.topicId);

    if (activeTopic && activeProgress?.status !== 'completed') {
      const focusedReadingAction = getReadingActionForTopic(lastActiveContext.subject, activeProgress, activeTopic);
      if (focusedReadingAction) return focusedReadingAction;

      const focusedPracticeAction = getPracticeActionForTopic(lastActiveContext.subject, activeProgress, activeTopic);
      if (focusedPracticeAction) return focusedPracticeAction;
    }
  }

  const candidateSubjects = [
    ...(lastActiveContext ? [lastActiveContext.subject] : []),
    ...(nextRecommended ? [nextRecommended] : []),
    ...subjects,
  ].filter((subject, index, all) => all.findIndex(candidate => candidate.id === subject.id) === index);

  for (const subject of candidateSubjects) {
    const progress = userProgress.subjects[subject.id];
    if (progress?.status === 'completed') continue;

    const readingAction = getNextReadingAction(
      subject,
      progress,
      subject.id === lastActiveContext?.subject.id ? lastActiveContext.topicId : undefined
    );
    if (readingAction) return readingAction;

    const practiceAction = getNextPracticeAction(
      subject,
      progress,
      subject.id === lastActiveContext?.subject.id ? lastActiveContext.topicId : undefined
    );
    if (practiceAction) return practiceAction;
  }

  if (nextRecommended && !userProgress.subjects[nextRecommended.id]) {
    return {
      icon: Icons.Curriculum,
      eyebrow: 'Next Up',
      title: `Start: ${nextRecommended.title}`,
      description: nextRecommended.code,
      meta: 'Next recommended subject in your course plan.',
      href: `#/subject/${nextRecommended.id}`,
      cta: 'Start',
    };
  }

  return null;
}

function renderDashboardAction(action: DashboardAction): string {
  return `
    <section class="dashboard-next-action">
      <div class="next-action-card">
        <div class="next-action-icon">${action.icon}</div>
        <div class="next-action-content">
          <span class="next-action-eyebrow">${escapeHtml(action.eyebrow)}</span>
          <h2>${escapeHtml(action.title)}</h2>
          <p>${escapeHtml(action.description)}</p>
          <span class="next-action-meta">${escapeHtml(action.meta)}</span>
        </div>
        <a class="btn btn-primary next-action-cta" href="${escapeHtml(action.href)}">${escapeHtml(action.cta)}</a>
      </div>
    </section>
  `;
}

/**
 * Render the home/dashboard page
 */
export function renderHomePage(container: HTMLElement, subjects: Subject[]): void {
  const userProgress = progressStorage.getProgress();

  // Filter subjects by user selection (if they have selected subjects)
  const selectedIds = progressStorage.getSelectedSubjects();
  const filteredSubjects = selectedIds.length > 0
    ? subjects.filter(s => selectedIds.includes(s.id))
    : subjects;

  const overallProgress = calculateOverallProgress(filteredSubjects, userProgress);
  const inProgressSubjects = getInProgressSubjects(filteredSubjects, userProgress);
  const nextRecommended = getNextRecommendedSubject(filteredSubjects, userProgress);
  const dashboardAction = getDashboardAction(filteredSubjects, userProgress, nextRecommended);

  // Calculate stats
  const stats = calculateStats(filteredSubjects, userProgress);

  container.innerHTML = `
    <div class="page-container home-page">
      <header class="page-header">
        <div class="page-header-content">
          <h1>Dashboard</h1>
          <p class="subtitle">Welcome back to your study program.</p>
        </div>
      </header>

      <div class="page-content">
        <section class="progress-summary">
          <h2>Overall Progress</h2>
          <div class="progress-card">
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${overallProgress.percentageComplete}%"></div>
              <span class="progress-percentage">${overallProgress.percentageComplete}%</span>
            </div>
            <div class="progress-stats">
              <div class="stat">
                <span class="stat-value">${overallProgress.completedSubjects}</span>
                <span class="stat-label">Completed</span>
              </div>
              <div class="stat">
                <span class="stat-value">${overallProgress.inProgressSubjects}</span>
                <span class="stat-label">In Progress</span>
              </div>
              <div class="stat">
                <span class="stat-value">${overallProgress.totalSubjects - overallProgress.completedSubjects - overallProgress.inProgressSubjects}</span>
                <span class="stat-label">Remaining</span>
              </div>
              <div class="stat">
                <span class="stat-value">${overallProgress.completedHours} / ${overallProgress.totalHours}</span>
                <span class="stat-label">Hours</span>
              </div>
            </div>
          </div>
        </section>

        ${dashboardAction ? renderDashboardAction(dashboardAction) : ''}

        ${nextRecommended ? `
          <section class="current-subject">
            <h2>Continue Learning</h2>
            <div class="subject-card featured" data-subject-id="${nextRecommended.id}">
              <div class="subject-header">
                <div>
                  <h3>${nextRecommended.title}</h3>
                  <p class="subject-code">${nextRecommended.code}</p>
                </div>
                <button class="btn btn-primary continue-btn" data-subject-id="${nextRecommended.id}">
                  Continue
                </button>
              </div>
              <p class="subject-description">${nextRecommended.description}</p>
              <div class="subject-meta">
                <span class="meta-item">Year ${nextRecommended.year}, Semester ${nextRecommended.semester}</span>
                <span class="meta-item">${nextRecommended.estimatedHours} hours</span>
              </div>
            </div>
          </section>
        ` : `
          <section class="current-subject">
            <div class="completion-message">
              <h2>Congratulations!</h2>
              <p>You've completed all available subjects. Check the curriculum for more information.</p>
              <button class="btn btn-primary" id="view-curriculum-btn">View Curriculum</button>
            </div>
          </section>
        `}

        ${renderDailyReviewSection()}

        ${inProgressSubjects.length > 0 ? `
          <section class="recent-subjects">
            <h2>Subjects in Progress</h2>
            <div class="subjects-grid">
              ${inProgressSubjects.slice(0, 4).map(subject => {
                const progress = progressStorage.getSubjectProgress(subject.id);
                const completion = progress ? calculateSubjectCompletion(subject, progress) : 0;

                return `
                  <div class="subject-card" data-subject-id="${subject.id}">
                    <div class="subject-header">
                      <div>
                        <h3>${subject.title}</h3>
                        <p class="subject-code">${subject.code}</p>
                      </div>
                    </div>
                    <div class="subject-progress">
                      <div class="progress-bar-small">
                        <div class="progress-bar" style="width: ${completion}%"></div>
                      </div>
                      <span class="progress-text">${completion}%</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </section>
        ` : ''}

        <section class="quick-stats">
          <h2>Your Statistics</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">${Icons.StatQuiz}</div>
              <div class="stat-content">
                <span class="stat-number">${stats.quizzesCompleted}</span>
                <span class="stat-description">Quizzes Completed</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">${Icons.StatCode}</div>
              <div class="stat-content">
                <span class="stat-number">${stats.exercisesCompleted}</span>
                <span class="stat-description">Exercises Solved</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">${Icons.StatProject}</div>
              <div class="stat-content">
                <span class="stat-number">${stats.projectsSubmitted}</span>
                <span class="stat-description">Projects Submitted</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">${Icons.StatTarget}</div>
              <div class="stat-content">
                <span class="stat-number">${stats.averageQuizScore}%</span>
                <span class="stat-description">Average Quiz Score</span>
              </div>
            </div>
          </div>
        </section>

        <section class="quick-actions">
          <h2>Quick Actions</h2>
          <div class="actions-grid">
            <button class="action-card" id="start-study-session-action">
              <span class="action-icon">${Icons.Progress}</span>
              <span class="action-label">Start Study Session</span>
            </button>
            <button class="action-card" id="view-curriculum-action">
              <span class="action-icon">${Icons.Curriculum}</span>
              <span class="action-label">View Curriculum</span>
            </button>
            <button class="action-card" id="view-progress-action">
              <span class="action-icon">${Icons.Progress}</span>
              <span class="action-label">View Progress</span>
            </button>
            <button class="action-card" id="view-settings-action">
              <span class="action-icon">${Icons.Settings}</span>
              <span class="action-label">Settings</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  `;

  // Attach event listeners
  attachEventListeners(container);
}

/**
 * Calculate statistics for the dashboard
 */
function calculateStats(subjects: Subject[], userProgress: UserProgress): {
  quizzesCompleted: number;
  exercisesCompleted: number;
  projectsSubmitted: number;
  averageQuizScore: number;
} {
  let quizzesCompleted = 0;
  let exercisesCompleted = 0;
  let projectsSubmitted = 0;
  let totalQuizScore = 0;
  let quizAttemptCount = 0;

  // Create a set of subject IDs that are in the filtered list for fast lookup
  const selectedSubjectIds = new Set(subjects.map(s => s.id));

  Object.entries(userProgress.subjects).forEach(([subjectId, progress]) => {
    // Only count stats for subjects in the filtered list
    if (!selectedSubjectIds.has(subjectId)) return;
    // Count quizzes
    Object.values(progress.quizAttempts || {}).forEach((attempts: QuizAttempt[]) => {
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: QuizAttempt) => a.score));
        if (bestScore >= QUIZ_PASSING_SCORE) quizzesCompleted++;

        // Add to average calculation
        attempts.forEach((attempt: QuizAttempt) => {
          totalQuizScore += attempt.score;
          quizAttemptCount++;
        });
      }
    });

    // Count exercises
    Object.values(progress.exerciseCompletions || {}).forEach((completion: ExerciseCompletion) => {
      if (completion && completion.passed) {
        exercisesCompleted++;
      }
    });

    // Count projects
    Object.values(progress.projectSubmissions || {}).forEach((submissions: ProjectSubmission[]) => {
      if (submissions && submissions.length > 0) {
        projectsSubmitted += submissions.length;
      }
    });
  });

  const averageQuizScore = quizAttemptCount > 0
    ? Math.round(totalQuizScore / quizAttemptCount)
    : 0;

  return {
    quizzesCompleted,
    exercisesCompleted,
    projectsSubmitted,
    averageQuizScore,
  };
}

/**
 * Attach event listeners to the home page
 */
function attachEventListeners(container: HTMLElement): void {
  // Subject card clicks
  container.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('button')) {
        const subjectId = (card as HTMLElement).dataset.subjectId;
        if (subjectId) navigateToSubject(subjectId);
      }
    });
  });

  // Continue button clicks
  container.querySelectorAll('.continue-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const subjectId = (btn as HTMLElement).dataset.subjectId;
      if (subjectId) navigateToSubject(subjectId);
    });
  });

  // View curriculum button
  const viewCurriculumBtn = container.querySelector('#view-curriculum-btn');
  if (viewCurriculumBtn) {
    viewCurriculumBtn.addEventListener('click', () => navigateToCurriculum());
  }

  // Quick action buttons
  const startStudySessionAction = container.querySelector('#start-study-session-action');
  if (startStudySessionAction) {
    startStudySessionAction.addEventListener('click', () => {
      window.location.hash = '#/study-session';
    });
  }

  const curriculumAction = container.querySelector('#view-curriculum-action');
  if (curriculumAction) {
    curriculumAction.addEventListener('click', () => navigateToCurriculum());
  }

  const progressAction = container.querySelector('#view-progress-action');
  if (progressAction) {
    progressAction.addEventListener('click', () => {
      window.location.hash = '#/progress';
    });
  }

  const settingsAction = container.querySelector('#view-settings-action');
  if (settingsAction) {
    settingsAction.addEventListener('click', () => {
      window.location.hash = '#/settings';
    });
  }
}
