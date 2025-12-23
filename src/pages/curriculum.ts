// Curriculum overview page
import type { Subject, UserProgress } from '@/core/types';
import { progressStorage } from '@/core/storage';
import {
  getSubjectsByYearAndSemester,
  calculateSubjectCompletion,
} from '@/core/progress';
import { navigateToSubject, navigateToCourseBuilder } from '@/core/router';
import { Icons } from '@/components/icons';
import { CurriculumGraph } from '@/components/curriculum-graph';

interface CurriculumFilters {
  selectedYear: number | null;
  showCompleted: boolean;
  viewMode: 'list' | 'graph';
}

let currentFilters: CurriculumFilters = {
  selectedYear: null,
  showCompleted: true,
  viewMode: 'list',
};

/**
 * Render the curriculum overview page
 */
export function renderCurriculumPage(container: HTMLElement, subjects: Subject[]): void {
  const userProgress = progressStorage.getProgress();

  // Filter subjects by user selection (if they have selected subjects)
  const selectedIds = progressStorage.getSelectedSubjects();
  const filteredSubjects = selectedIds.length > 0
    ? subjects.filter(s => selectedIds.includes(s.id))
    : subjects;

  const groupedSubjects = getSubjectsByYearAndSemester(filteredSubjects);
  const totalSubjectCount = subjects.length;
  const selectedCount = filteredSubjects.length;
  const isFiltered = selectedIds.length > 0 && selectedCount < totalSubjectCount;

  container.innerHTML = `
    <div class="page-container ${currentFilters.viewMode === 'graph' ? 'wide ' : ''}curriculum-page">
      <header class="page-header">
        <div class="page-header-content">
          <h1>Curriculum</h1>
          <p class="subtitle">
            ${isFiltered
              ? `${selectedCount} of ${totalSubjectCount} subjects selected`
              : `${totalSubjectCount} subjects in your program`}
          </p>
        </div>
        <div class="page-header-actions">
          <div class="curriculum-filters">
            <div class="view-toggle">
              <button class="toggle-btn ${currentFilters.viewMode === 'list' ? 'active' : ''}" data-view="list">
                ${Icons.Curriculum} List
              </button>
              <button class="toggle-btn ${currentFilters.viewMode === 'graph' ? 'active' : ''}" data-view="graph">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                  <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                  <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                </svg> Graph
              </button>
            </div>
            <div class="filter-group">
              <label for="year-filter">Year:</label>
              <select id="year-filter" class="filter-select">
                <option value="">All Years</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>
            </div>
            <div class="filter-group">
              <label class="checkbox-label">
                <input type="checkbox" id="show-completed-filter" ${currentFilters.showCompleted ? 'checked' : ''}>
                <span>Show completed</span>
              </label>
            </div>
            <button class="btn btn-secondary btn-sm" id="edit-selection-btn">
              ${Icons.CourseBuilder} Edit Selection
            </button>
          </div>
        </div>
      </header>

      <div class="page-content">
        <div class="curriculum-legend">
          <div class="legend-item">
            <span class="status-badge status-not-started"></span>
            <span>Not Started</span>
          </div>
          <div class="legend-item">
            <span class="status-badge status-in-progress"></span>
            <span>In Progress</span>
          </div>
          <div class="legend-item">
            <span class="status-badge status-completed"></span>
            <span>Completed</span>
          </div>
        </div>

        <div class="curriculum-content" id="curriculum-content-area">
          ${currentFilters.viewMode === 'list' 
            ? renderCurriculumTree(groupedSubjects, subjects, userProgress, currentFilters)
            : ''}
        </div>
      </div>
    </div>
  `;

  if (currentFilters.viewMode === 'graph') {
    const contentArea = container.querySelector('#curriculum-content-area');
    if (contentArea) {
      // Filter subjects based on year if selected
      let displaySubjects = filteredSubjects;
      if (currentFilters.selectedYear) {
        displaySubjects = filteredSubjects.filter(s => s.year === currentFilters.selectedYear);
      }

      const graph = new CurriculumGraph(displaySubjects, userProgress);
      contentArea.appendChild(graph.render());
    }
  }

  attachEventListeners(container, subjects, filteredSubjects);
}

/**
 * Render the curriculum tree view
 */
function renderCurriculumTree(
  groupedSubjects: Map<number, Map<number, Subject[]>>,
  allSubjects: Subject[],
  userProgress: UserProgress,
  filters: CurriculumFilters
): string {
  const years = Array.from(groupedSubjects.keys()).sort();

  return years
    .filter(year => !filters.selectedYear || year === filters.selectedYear)
    .map(year => {
      const semesters = groupedSubjects.get(year)!;
      const semesterNumbers = Array.from(semesters.keys()).sort();

      return `
        <div class="year-section">
          <h2 class="year-title">Year ${year}</h2>
          <div class="semesters-container">
            ${semesterNumbers.map(semester => {
              const subjects = semesters.get(semester)!;
              const filteredSubjects = subjects.filter(subject => {
                const progress = userProgress.subjects[subject.id];
                const isCompleted = progress?.status === 'completed';
                return filters.showCompleted || !isCompleted;
              });

              if (filteredSubjects.length === 0) return '';

              return `
                <div class="semester-section">
                  <h3 class="semester-title">Semester ${semester}</h3>
                  <div class="subjects-grid">
                    ${filteredSubjects.map(subject => renderSubjectCard(subject, allSubjects, userProgress)).join('')}
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
 * Render a single subject card
 */
function renderSubjectCard(subject: Subject, allSubjects: Subject[], userProgress: UserProgress): string {
  const progress = userProgress.subjects[subject.id];
  const status = getSubjectStatus(subject, userProgress);
  const completion = progress ? calculateSubjectCompletion(subject, progress) : 0;

  // Get prerequisite names
  const prerequisiteNames = subject.prerequisites
    .map(prereqId => {
      const prereq = allSubjects.find(s => s.id === prereqId);
      return prereq ? prereq.title : prereqId;
    });

  return `
    <div class="subject-card" data-subject-id="${subject.id}">
      <div class="subject-status">
        <span class="status-badge status-${status}"></span>
      </div>
      <div class="subject-content">
        <div class="subject-header">
          <h4>${subject.title}</h4>
          <span class="subject-code">${subject.code}</span>
        </div>
        <p class="subject-description">${truncateText(subject.description, 100)}</p>

        ${progress && progress.status !== 'not_started' ? `
          <div class="subject-progress">
            <div class="progress-bar-small">
              <div class="progress-bar" style="width: ${completion}%"></div>
            </div>
            <span class="progress-text">${completion}%</span>
          </div>
        ` : ''}

        ${subject.prerequisites.length > 0 ? `
          <div class="subject-prerequisites">
            <span class="prereq-label">Prerequisites:</span>
            <div class="prereq-list">
              ${prerequisiteNames.map(name => `
                <span class="prereq-tag ${isPrerequisiteMet(subject.id, userProgress) ? 'met' : 'unmet'}">${name}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="subject-meta">
          <span class="meta-item">
            <span class="meta-icon">${Icons.Clock}</span>
            ${subject.estimatedHours} hours
          </span>
          <span class="meta-item">
            <span class="meta-icon">${Icons.Curriculum}</span>
            ${subject.topics.length} topics
          </span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Get the status of a subject
 */
function getSubjectStatus(subject: Subject, userProgress: UserProgress): string {
  const progress = userProgress.subjects[subject.id];

  if (!progress) {
    return 'not-started';
  }

  return progress.status.replace('_', '-');
}

/**
 * Check if all prerequisites for a subject are met
 */
function isPrerequisiteMet(subjectId: string, userProgress: UserProgress): boolean {
  const progress = userProgress.subjects[subjectId];
  return progress?.status === 'completed';
}

/**
 * Truncate text to a maximum length
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Attach event listeners
 */
function attachEventListeners(container: HTMLElement, allSubjects: Subject[], filteredSubjects: Subject[]): void {
  // Subject card clicks
  container.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', () => {
      const subjectId = (card as HTMLElement).dataset.subjectId;
      if (subjectId) navigateToSubject(subjectId);
    });
  });

  // View toggle
  container.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = (e.currentTarget as HTMLElement).dataset.view as 'list' | 'graph';
      currentFilters.viewMode = view;
      renderCurriculumPage(container, allSubjects);
    });
  });

  // Year filter
  const yearFilter = container.querySelector('#year-filter') as HTMLSelectElement;
  if (yearFilter) {
    yearFilter.addEventListener('change', (e) => {
      const value = (e.target as HTMLSelectElement).value;
      currentFilters.selectedYear = value ? parseInt(value, 10) : null;
      renderCurriculumPage(container, allSubjects);
    });
  }

  // Show completed filter
  const showCompletedFilter = container.querySelector('#show-completed-filter') as HTMLInputElement;
  if (showCompletedFilter) {
    showCompletedFilter.addEventListener('change', (e) => {
      currentFilters.showCompleted = (e.target as HTMLInputElement).checked;
      renderCurriculumPage(container, allSubjects);
    });
  }

  // Edit selection button
  const editSelectionBtn = container.querySelector('#edit-selection-btn');
  if (editSelectionBtn) {
    editSelectionBtn.addEventListener('click', () => {
      navigateToCourseBuilder();
    });
  }
}
