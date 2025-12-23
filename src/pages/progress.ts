// Progress/Statistics page
import type { Subject, UserProgress, SubjectProgress, QuizAttempt, ExerciseCompletion } from '@/core/types';
import { progressStorage, exportProgress, importProgress } from '@/core/storage';
import {
  calculateOverallProgress,
  getSubjectsByYearAndSemester,
  getSubjectProgressDetails,
} from '@/core/progress';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';

interface ExpandedYears {
  [key: number]: boolean;
}

let expandedYears: ExpandedYears = {
  1: true,
  2: false,
  3: false,
  4: false,
};

/**
 * Render the progress/statistics page
 */
export function renderProgressPage(container: HTMLElement, subjects: Subject[]): void {
  const userProgress = progressStorage.getProgress();

  // Filter subjects by user selection (if they have selected subjects)
  const selectedIds = progressStorage.getSelectedSubjects();
  const filteredSubjects = selectedIds.length > 0
    ? subjects.filter(s => selectedIds.includes(s.id))
    : subjects;

  const overallProgress = calculateOverallProgress(filteredSubjects, userProgress);
  const groupedSubjects = getSubjectsByYearAndSemester(filteredSubjects);

  // Calculate per-year statistics
  const yearStats = calculateYearStatistics(filteredSubjects, userProgress);

  // Calculate achievements
  const achievements = calculateAchievements(filteredSubjects, userProgress);

  container.innerHTML = `
    <div class="page-container progress-page">
      <header class="page-header">
        <div class="page-header-content">
          <h1>Your Progress</h1>
          <p class="subtitle">Track your journey through the curriculum</p>
        </div>
      </header>

      <div class="page-content">
        <section class="overall-progress">
          <h2>Overall Degree Progress</h2>
          <div class="progress-overview-card">
            <div class="circular-progress">
              <svg class="progress-ring" width="200" height="200">
                <circle
                  class="progress-ring-circle-bg"
                  stroke="#e5e7eb"
                  stroke-width="20"
                  fill="transparent"
                  r="80"
                  cx="100"
                  cy="100"
                />
                <circle
                  class="progress-ring-circle"
                  stroke="#3b82f6"
                  stroke-width="20"
                  fill="transparent"
                  r="80"
                  cx="100"
                  cy="100"
                  stroke-dasharray="${2 * Math.PI * 80}"
                  stroke-dashoffset="${2 * Math.PI * 80 * (1 - overallProgress.percentageComplete / 100)}"
                  transform="rotate(-90 100 100)"
                />
                <text x="100" y="100" class="progress-text" text-anchor="middle" dy=".3em">
                  ${overallProgress.percentageComplete}%
                </text>
              </svg>
            </div>
            <div class="progress-stats-grid">
              <div class="stat-box">
                <div class="stat-value">${overallProgress.completedSubjects}</div>
                <div class="stat-label">Subjects Completed</div>
              </div>
              <div class="stat-box">
                <div class="stat-value">${overallProgress.inProgressSubjects}</div>
                <div class="stat-label">In Progress</div>
              </div>
              <div class="stat-box">
                <div class="stat-value">${overallProgress.totalSubjects - overallProgress.completedSubjects - overallProgress.inProgressSubjects}</div>
                <div class="stat-label">Not Started</div>
              </div>
              <div class="stat-box">
                <div class="stat-value">${overallProgress.completedHours}</div>
                <div class="stat-label">Hours Completed</div>
              </div>
            </div>
          </div>
        </section>

        <section class="year-breakdown">
          <h2>Progress by Year</h2>
          <div class="year-cards">
            ${Array.from({ length: 4 }, (_, i) => i + 1).map(year => {
              const stats = yearStats[year];
              return `
                <div class="year-card">
                  <div class="year-card-header">
                    <h3>Year ${year}</h3>
                    <div class="year-progress-bar">
                      <div class="progress-bar" style="width: ${stats.percentComplete}%"></div>
                    </div>
                  </div>
                  <div class="year-card-stats">
                    <span>${stats.completed} / ${stats.total} subjects</span>
                    <span class="year-percentage">${stats.percentComplete}%</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <section class="subject-breakdown">
          <h2>Detailed Progress</h2>
          ${renderSubjectBreakdown(groupedSubjects, userProgress)}
        </section>

        ${achievements.length > 0 ? `
          <section class="achievements">
            <h2>Achievements & Milestones</h2>
            <div class="achievements-grid">
              ${achievements.map(achievement => `
                <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                  <div class="achievement-icon">${achievement.icon}</div>
                  <div class="achievement-content">
                    <h3>${achievement.title}</h3>
                    <p>${achievement.description}</p>
                    ${achievement.unlocked && achievement.unlockedDate ? `
                      <span class="achievement-date">Unlocked ${formatDate(achievement.unlockedDate)}</span>
                    ` : achievement.unlocked ? '' : `
                      <div class="achievement-progress">
                        <div class="progress-bar-small">
                          <div class="progress-bar" style="width: ${achievement.progress}%"></div>
                        </div>
                        <span>${achievement.progress}%</span>
                      </div>
                    `}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <section class="data-management">
          <h2>Data Management</h2>
          <div class="data-actions">
            <div class="action-group">
              <h3>Export Progress</h3>
              <p>Download your progress data as a JSON file for backup</p>
              <button class="btn btn-primary" id="export-progress-btn">
                <span class="icon">${Icons.Download}</span>
                Export Progress
              </button>
            </div>
            <div class="action-group">
              <h3>Import Progress</h3>
              <p>Restore your progress from a previously exported file</p>
              <input type="file" id="import-file-input" accept=".json" style="display: none">
              <button class="btn btn-primary" id="import-progress-btn">
                <span class="icon">${Icons.Upload}</span>
                Import Progress
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

  attachEventListeners(container, subjects);
}

/**
 * Render subject breakdown by year
 */
function renderSubjectBreakdown(
  groupedSubjects: Map<number, Map<number, Subject[]>>,
  userProgress: UserProgress
): string {
  const years = Array.from(groupedSubjects.keys()).sort();

  return years.map(year => {
    const isExpanded = expandedYears[year];
    const semesters = groupedSubjects.get(year);
    if (!semesters) return '';

    return `
      <div class="year-breakdown-section">
        <div class="year-breakdown-header" data-year="${year}">
          <h3>
            <span class="expand-icon">${isExpanded ? Icons.ChevronDown : Icons.ChevronRight}</span>
            Year ${year}
          </h3>
        </div>
        <div class="year-breakdown-content" style="display: ${isExpanded ? 'block' : 'none'}">
          ${Array.from(semesters.keys()).sort().map(semester => {
            const subjects = semesters.get(semester) ?? [];
            return `
              <div class="semester-breakdown">
                <h4>Semester ${semester}</h4>
                <div class="subjects-breakdown-list">
                  ${subjects.map(subject => {
                    const details = getSubjectProgressDetails(subject);
                    return `
                      <div class="subject-breakdown-item" data-subject-id="${subject.id}">
                          <div class="subject-breakdown-header">
                            <div class="subject-info">
                              <h5>${subject.title}</h5>
                              <span class="subject-code">${subject.code}</span>
                            </div>
                            <span class="subject-status-pill status-${details.status.replace('_', '-')}">
                              ${formatStatus(details.status)}
                            </span>
                          </div>
                        ${details.status !== 'not_started' ? `
                          <div class="subject-breakdown-progress">
                            <div class="progress-bar-container">
                              <div class="progress-bar" style="width: ${details.completionPercentage}%"></div>
                            </div>
                            <div class="progress-details">
                              <span>Quizzes: ${details.quizzesCompleted}/${details.totalQuizzes}</span>
                              <span>Exercises: ${details.exercisesCompleted}/${details.totalExercises}</span>
                              <span>${details.completionPercentage}%</span>
                            </div>
                          </div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Calculate statistics per year
 */
interface YearStats {
  total: number;
  completed: number;
  inProgress: number;
  percentComplete: number;
}

function calculateYearStatistics(subjects: Subject[], userProgress: UserProgress): Record<number, YearStats> {
  const stats: Record<number, YearStats> = {
    1: { total: 0, completed: 0, inProgress: 0, percentComplete: 0 },
    2: { total: 0, completed: 0, inProgress: 0, percentComplete: 0 },
    3: { total: 0, completed: 0, inProgress: 0, percentComplete: 0 },
    4: { total: 0, completed: 0, inProgress: 0, percentComplete: 0 },
  };

  subjects.forEach(subject => {
    const year = subject.year;
    stats[year].total++;

    const progress = userProgress.subjects[subject.id];
    if (progress) {
      if (progress.status === 'completed') {
        stats[year].completed++;
      } else if (progress.status === 'in_progress') {
        stats[year].inProgress++;
      }
    }
  });

  // Calculate percentages
  Object.keys(stats).forEach(year => {
    const yearNum = parseInt(year, 10);
    stats[yearNum].percentComplete = stats[yearNum].total > 0
      ? Math.round((stats[yearNum].completed / stats[yearNum].total) * 100)
      : 0;
  });

  return stats;
}

/**
 * Calculate achievements
 */
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
}

function calculateAchievements(subjects: Subject[], userProgress: UserProgress): Achievement[] {
  const overallProgress = calculateOverallProgress(subjects, userProgress);

  // Count total quizzes and exercises completed
  let totalQuizzesPassed = 0;
  let totalExercisesPassed = 0;

  Object.values(userProgress.subjects).forEach((subjectProgress: SubjectProgress) => {
    Object.values(subjectProgress.quizAttempts).forEach((attempts: QuizAttempt[]) => {
      if (attempts && attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a: QuizAttempt) => a.score));
        if (bestScore >= 70) totalQuizzesPassed++;
      }
    });

    Object.values(subjectProgress.exerciseCompletions).forEach((completion: ExerciseCompletion) => {
      if (completion && completion.passed) {
        totalExercisesPassed++;
      }
    });
  });

  return [
    {
      id: 'first_subject',
      title: 'Getting Started',
      description: 'Complete your first subject',
      icon: Icons.StatTarget,
      unlocked: overallProgress.completedSubjects >= 1,
      unlockedDate: overallProgress.completedSubjects >= 1 ? userProgress.startedAt : undefined,
      progress: Math.min(100, (overallProgress.completedSubjects / 1) * 100),
    },
    {
      id: 'year_one',
      title: 'First Year Complete',
      description: 'Complete all Year 1 subjects',
      icon: Icons.AcademicCap,
      unlocked: isYearComplete(subjects, userProgress, 1),
      progress: calculateYearProgress(subjects, userProgress, 1),
    },
    {
      id: 'quiz_master',
      title: 'Quiz Master',
      description: 'Pass 25 quizzes',
      icon: Icons.StatQuiz,
      unlocked: totalQuizzesPassed >= 25,
      progress: Math.min(100, (totalQuizzesPassed / 25) * 100),
    },
    {
      id: 'code_warrior',
      title: 'Code Warrior',
      description: 'Complete 50 coding exercises',
      icon: Icons.StatCode,
      unlocked: totalExercisesPassed >= 50,
      progress: Math.min(100, (totalExercisesPassed / 50) * 100),
    },
    {
      id: 'halfway',
      title: 'Halfway There',
      description: 'Complete 50% of the degree',
      icon: Icons.StatProject,
      unlocked: overallProgress.percentageComplete >= 50,
      progress: Math.min(100, overallProgress.percentageComplete * 2),
    },
    {
      id: 'graduation',
      title: 'Graduate',
      description: 'Complete all subjects',
      icon: Icons.AcademicCap,
      unlocked: overallProgress.percentageComplete === 100,
      progress: overallProgress.percentageComplete,
    },
  ];
}

/**
 * Check if a year is complete
 */
function isYearComplete(subjects: Subject[], userProgress: UserProgress, year: number): boolean {
  const yearSubjects = subjects.filter(s => s.year === year);
  return yearSubjects.every(subject => {
    const progress = userProgress.subjects[subject.id];
    return progress?.status === 'completed';
  });
}

/**
 * Calculate progress for a specific year
 */
function calculateYearProgress(subjects: Subject[], userProgress: UserProgress, year: number): number {
  const yearSubjects = subjects.filter(s => s.year === year);
  if (yearSubjects.length === 0) return 0;

  const completed = yearSubjects.filter(subject => {
    const progress = userProgress.subjects[subject.id];
    return progress?.status === 'completed';
  }).length;

  return Math.round((completed / yearSubjects.length) * 100);
}

/**
 * Format status for display
 */
function formatStatus(status: string): string {
  return status.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

/**
 * Format date for display
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString();
}

/**
 * Download progress as JSON file
 */
function downloadProgress(): void {
  const progressJson = exportProgress();
  const blob = new Blob([progressJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `study-program-progress-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Import progress from file
 */
function handleImportProgress(file: File, container: HTMLElement, subjects: Subject[]): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const success = importProgress(content);

      if (success) {
        alert('Progress imported successfully!');
        renderProgressPage(container, subjects);
      } else {
        alert('Failed to import progress. Please check the file format.');
      }
    } catch (error) {
      alert('Error reading file. Please try again.');
      console.error(error);
    }
  };
  reader.readAsText(file);
}

/**
 * Attach event listeners
 */
function attachEventListeners(container: HTMLElement, subjects: Subject[]): void {
  // Year breakdown toggle
  container.querySelectorAll('.year-breakdown-header').forEach(header => {
    header.addEventListener('click', () => {
      const yearStr = (header as HTMLElement).dataset.year;
      if (!yearStr) return;
      const year = parseInt(yearStr, 10);
      expandedYears[year] = !expandedYears[year];
      renderProgressPage(container, subjects);
    });
  });

  // Subject navigation
  container.querySelectorAll('.subject-breakdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const subjectId = (item as HTMLElement).dataset.subjectId;
      if (subjectId) navigateToSubject(subjectId);
    });
  });

  // Export progress
  const exportBtn = container.querySelector('#export-progress-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', downloadProgress);
  }

  // Import progress
  const importBtn = container.querySelector('#import-progress-btn');
  const importInput = container.querySelector('#import-file-input') as HTMLInputElement;
  if (importBtn && importInput) {
    importBtn.addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleImportProgress(file, container, subjects);
      }
    });
  }
}
