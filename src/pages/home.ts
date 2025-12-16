// Home/Dashboard page
import type { Subject } from '@/core/types';
import { progressStorage } from '@/core/storage';
import {
  calculateOverallProgress,
  getInProgressSubjects,
  getNextRecommendedSubject,
} from '@/core/progress';
import { navigateToSubject, navigateToCurriculum } from '@/core/router';
import { Icons } from '../components/icons';

/**
 * Render the home/dashboard page
 */
export function renderHomePage(container: HTMLElement, subjects: Subject[]): void {
  const userProgress = progressStorage.getProgress();
  const overallProgress = calculateOverallProgress(subjects, userProgress);
  const inProgressSubjects = getInProgressSubjects(subjects, userProgress);
  const nextRecommended = getNextRecommendedSubject(subjects, userProgress);

  // Calculate stats
  const stats = calculateStats(subjects, userProgress);

  container.innerHTML = `
    <div class="home-page">
      <header class="home-header">
        <h1>Groundwork</h1>
        <p class="subtitle">A self-study platform covering a 4-year undergraduate CS and mathematics curriculum. 28 subjects with lessons, quizzes, coding exercises, projects, and practice exams. Code runs in the browser via Pyodide.</p>
      </header>

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
  `;

  // Attach event listeners
  attachEventListeners(container);
}

/**
 * Calculate completion percentage for a subject (helper function)
 */
function calculateSubjectCompletion(subject: Subject, progress: any): number {
  if (!progress || progress.status === 'not_started') return 0;
  if (progress.status === 'completed') return 100;

  let totalItems = 0;
  let completedItems = 0;

  subject.topics.forEach(topic => {
    topic.quizIds.forEach(quizId => {
      totalItems++;
      const attempts = progress.quizAttempts[quizId];
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: any) => a.score));
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
      const bestScore = Math.max(...attempts.map((a: any) => a.score));
      if (bestScore >= 70) completedItems++;
    }
  });

  return totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
}

/**
 * Calculate statistics for the dashboard
 */
function calculateStats(subjects: Subject[], userProgress: any): {
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

  Object.entries(userProgress.subjects).forEach(([subjectId, progress]: [string, any]) => {
    // Count quizzes
    Object.values(progress.quizAttempts).forEach((attempts: any) => {
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: any) => a.score));
        if (bestScore >= 70) quizzesCompleted++;

        // Add to average calculation
        attempts.forEach((attempt: any) => {
          totalQuizScore += attempt.score;
          quizAttemptCount++;
        });
      }
    });

    // Count exercises
    Object.values(progress.exerciseCompletions).forEach((completion: any) => {
      if (completion && completion.passed) {
        exercisesCompleted++;
      }
    });

    // Count projects
    Object.values(progress.projectSubmissions).forEach((submissions: any) => {
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
