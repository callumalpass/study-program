// Home/Dashboard page
import type {
  Subject,
  ReviewItem,
  SubjectProgress,
  UserProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
} from '@/core/types';
import { progressStorage } from '@/core/storage';
import {
  calculateOverallProgress,
  getInProgressSubjects,
  getNextRecommendedSubject,
} from '@/core/progress';
import { navigateToSubject, navigateToCurriculum } from '@/core/router';
import { Icons } from '../components/icons';

/**
 * Format a review item ID into a human-readable title
 * e.g., "cs101-t1-quiz-a" -> "CS101 Topic 1 Quiz A"
 */
function formatReviewItemTitle(item: ReviewItem): string {
  const id = item.itemId;

  // Extract subject code (e.g., "cs101" or "math201")
  const subjectMatch = id.match(/^([a-z]+\d+)/i);
  const subjectCode = subjectMatch ? subjectMatch[1].toUpperCase() : '';

  // Extract topic number
  const topicMatch = id.match(/-t(\d+)-/);
  const topicNum = topicMatch ? `Topic ${topicMatch[1]}` : '';

  if (item.itemType === 'quiz') {
    // Format: cs101-t1-quiz-a -> CS101 Topic 1 Quiz A
    const quizMatch = id.match(/quiz-([abc])/i);
    const quizLevel = quizMatch ? `Quiz ${quizMatch[1].toUpperCase()}` : 'Quiz';
    return `${subjectCode} ${topicNum} ${quizLevel}`.trim();
  } else {
    // Format: cs101-t1-ex01 -> CS101 Topic 1 Exercise 1
    const exMatch = id.match(/ex(\d+)/i);
    const exNum = exMatch ? `Exercise ${parseInt(exMatch[1])}` : 'Exercise';
    return `${subjectCode} ${topicNum} ${exNum}`.trim();
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
 * Render the daily review section
 */
function renderDailyReviewSection(): string {
  const dueItems = progressStorage.getDueReviewItems(5);
  const totalDue = progressStorage.getDueReviewCount();

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
 * Calculate completion percentage for a subject (helper function)
 */
function calculateSubjectCompletion(subject: Subject, progress: SubjectProgress): number {
  if (!progress || progress.status === 'not_started') return 0;
  if (progress.status === 'completed') return 100;

  let totalItems = 0;
  let completedItems = 0;

  subject.topics.forEach(topic => {
    topic.quizIds.forEach(quizId => {
      totalItems++;
      const attempts = progress.quizAttempts[quizId];
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: QuizAttempt) => a.score));
        if (bestScore >= 70) completedItems++;
      }
    });

    topic.exerciseIds.forEach(exerciseId => {
      totalItems++;
      const completion = progress.exerciseCompletions[exerciseId];
      if (completion?.passed) completedItems++;
    });
  });

  const examIds = subject.examIds || [];
  examIds.forEach(examId => {
    totalItems++;
    const attempts = progress.examAttempts?.[examId];
    if (attempts && attempts.length > 0) {
      const bestScore = Math.max(...attempts.map((a: ExamAttempt) => a.score));
      if (bestScore >= 70) completedItems++;
    }
  });

  const projectIds = subject.projectIds || [];
  projectIds.forEach(projectId => {
    totalItems++;
    const submissions = progress.projectSubmissions?.[projectId];
    if (submissions && submissions.length > 0) {
      const bestSubmission = submissions.reduce((best: ProjectSubmission, sub: ProjectSubmission) => {
        const score = sub.aiEvaluation?.score ?? 0;
        const bestScore = best.aiEvaluation?.score ?? 0;
        return score > bestScore ? sub : best;
      });

      if (bestSubmission.aiEvaluation) {
        if (bestSubmission.aiEvaluation.score >= 70) completedItems++;
      } else {
        completedItems++;
      }
    }
  });

  return totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
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

  Object.entries(userProgress.subjects).forEach(([_subjectId, progress]) => {
    // Count quizzes
    Object.values(progress.quizAttempts).forEach((attempts: QuizAttempt[]) => {
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: QuizAttempt) => a.score));
        if (bestScore >= 70) quizzesCompleted++;

        // Add to average calculation
        attempts.forEach((attempt: QuizAttempt) => {
          totalQuizScore += attempt.score;
          quizAttemptCount++;
        });
      }
    });

    // Count exercises
    Object.values(progress.exerciseCompletions).forEach((completion: ExerciseCompletion) => {
      if (completion && completion.passed) {
        exercisesCompleted++;
      }
    });

    // Count projects
    Object.values(progress.projectSubmissions).forEach((submissions: ProjectSubmission[]) => {
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
