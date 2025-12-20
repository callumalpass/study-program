// Course Builder page - allows users to select subjects for their learning path
import type { Subject, SubjectCategory } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { courseTemplates, getTemplateById } from '@/data/templates';
import { curriculum } from '@/data/curriculum';
import { navigate } from '@/core/router';

interface CourseBuilderFilters {
  category: SubjectCategory | 'all';
  year: number | null;
  search: string;
}

let currentFilters: CourseBuilderFilters = {
  category: 'all',
  year: null,
  search: '',
};

/**
 * Get prerequisite subjects that are not selected
 */
function getMissingPrerequisites(subjectId: string, selectedIds: string[]): string[] {
  const subject = curriculum.find(s => s.id === subjectId);
  if (!subject) return [];
  return subject.prerequisites.filter(prereqId => !selectedIds.includes(prereqId));
}

/**
 * Get subjects that would be orphaned if this subject is removed
 */
function getDependentSubjects(subjectId: string, selectedIds: string[]): Subject[] {
  return curriculum.filter(s =>
    selectedIds.includes(s.id) &&
    s.prerequisites.includes(subjectId)
  );
}

/**
 * Filter subjects based on current filters
 */
function filterSubjects(subjects: Subject[], filters: CourseBuilderFilters): Subject[] {
  return subjects.filter(subject => {
    // Category filter
    if (filters.category !== 'all' && subject.category !== filters.category) {
      return false;
    }

    // Year filter
    if (filters.year !== null && subject.year !== filters.year) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesCode = subject.code.toLowerCase().includes(searchLower);
      const matchesTitle = subject.title.toLowerCase().includes(searchLower);
      const matchesDesc = subject.description.toLowerCase().includes(searchLower);
      if (!matchesCode && !matchesTitle && !matchesDesc) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Render the course builder page
 */
export function renderCourseBuilderPage(container: HTMLElement): void {
  const selectedIds = progressStorage.getSelectedSubjects();
  const selectedCount = selectedIds.length;
  const totalHours = curriculum
    .filter(s => selectedIds.includes(s.id))
    .reduce((sum, s) => sum + s.estimatedHours, 0);

  const filteredSubjects = filterSubjects(curriculum, currentFilters);

  container.innerHTML = `
    <div class="course-builder-page">
      <header class="course-builder-header">
        <h1>Course Builder</h1>
        <p class="subtitle">Build your personalized learning path</p>
        <div class="selection-summary">
          <span class="summary-stat">
            <strong>${selectedCount}</strong> subjects selected
          </span>
          <span class="summary-stat">
            <strong>${totalHours.toLocaleString()}</strong> estimated hours
          </span>
        </div>
      </header>

      <section class="templates-section">
        <h2>Start from a Template</h2>
        <p class="section-description">Choose a pre-built learning path or customize your own below.</p>
        <div class="templates-grid">
          ${courseTemplates.map(template => `
            <div class="template-card" data-template-id="${template.id}">
              <h3 class="template-name">${template.name}</h3>
              <p class="template-description">${template.description}</p>
              <div class="template-meta">
                <span>${template.subjectIds.length} subjects</span>
                <span>${template.estimatedHours.toLocaleString()} hours</span>
              </div>
              <button class="btn btn-secondary apply-template-btn" data-template-id="${template.id}">
                Apply Template
              </button>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="catalog-section">
        <h2>Subject Catalog</h2>
        <p class="section-description">Select individual subjects to add to your learning path.</p>

        <div class="catalog-controls">
          <div class="search-box">
            <input
              type="text"
              id="subject-search"
              placeholder="Search subjects..."
              value="${currentFilters.search}"
            />
          </div>

          <div class="filter-controls">
            <select id="category-filter">
              <option value="all" ${currentFilters.category === 'all' ? 'selected' : ''}>All Categories</option>
              <option value="cs" ${currentFilters.category === 'cs' ? 'selected' : ''}>Computer Science</option>
              <option value="math" ${currentFilters.category === 'math' ? 'selected' : ''}>Mathematics</option>
            </select>

            <select id="year-filter">
              <option value="" ${currentFilters.year === null ? 'selected' : ''}>All Years</option>
              <option value="1" ${currentFilters.year === 1 ? 'selected' : ''}>Year 1</option>
              <option value="2" ${currentFilters.year === 2 ? 'selected' : ''}>Year 2</option>
              <option value="3" ${currentFilters.year === 3 ? 'selected' : ''}>Year 3</option>
              <option value="4" ${currentFilters.year === 4 ? 'selected' : ''}>Year 4</option>
            </select>
          </div>

          <div class="bulk-actions">
            <button class="btn btn-small" id="select-all-btn">Select All Visible</button>
            <button class="btn btn-small btn-secondary" id="deselect-all-btn">Deselect All Visible</button>
            <button class="btn btn-small btn-danger" id="clear-selection-btn">Clear All</button>
          </div>
        </div>

        <div class="subject-list">
          ${filteredSubjects.length === 0 ? `
            <div class="empty-state">
              <p>No subjects match your filters.</p>
            </div>
          ` : filteredSubjects.map(subject => {
            const isSelected = selectedIds.includes(subject.id);
            const missingPrereqs = getMissingPrerequisites(subject.id, selectedIds);
            const hasMissingPrereqs = missingPrereqs.length > 0 && !isSelected;

            return `
              <div class="subject-item ${isSelected ? 'selected' : ''} ${hasMissingPrereqs ? 'has-warning' : ''}"
                   data-subject-id="${subject.id}">
                <div class="subject-checkbox">
                  <input
                    type="checkbox"
                    id="subject-${subject.id}"
                    ${isSelected ? 'checked' : ''}
                  />
                </div>
                <div class="subject-info">
                  <div class="subject-header">
                    <span class="subject-code">${subject.code}</span>
                    <span class="category-badge category-${subject.category}">${subject.category.toUpperCase()}</span>
                    <span class="year-badge">Year ${subject.year}</span>
                  </div>
                  <h4 class="subject-title">${subject.title}</h4>
                  <div class="subject-meta">
                    <span>${subject.estimatedHours} hours</span>
                    <span>${subject.topics.length} topics</span>
                    ${subject.prerequisites.length > 0 ? `
                      <span class="prereq-count">${subject.prerequisites.length} prerequisite${subject.prerequisites.length > 1 ? 's' : ''}</span>
                    ` : ''}
                  </div>
                  ${hasMissingPrereqs ? `
                    <div class="prereq-warning">
                      Missing prerequisites: ${missingPrereqs.map(id => {
                        const prereq = curriculum.find(s => s.id === id);
                        return prereq?.code || id;
                      }).join(', ')}
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <div class="course-builder-footer">
        <div class="footer-summary">
          <strong>${selectedCount}</strong> subjects · <strong>${totalHours.toLocaleString()}</strong> hours
        </div>
        <div class="footer-actions">
          <button class="btn btn-primary" id="view-curriculum-btn" ${selectedCount === 0 ? 'disabled' : ''}>
            View My Curriculum →
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  attachEventHandlers(container);
}

/**
 * Attach event handlers to the page
 */
function attachEventHandlers(container: HTMLElement): void {
  // Template apply buttons
  container.querySelectorAll('.apply-template-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const templateId = (btn as HTMLElement).dataset.templateId;
      if (templateId) {
        applyTemplate(templateId, container);
      }
    });
  });

  // Subject checkboxes
  container.querySelectorAll('.subject-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // Don't trigger if clicking the checkbox itself (it handles its own event)
      if ((e.target as HTMLElement).tagName === 'INPUT') return;

      const subjectId = (item as HTMLElement).dataset.subjectId;
      if (subjectId) {
        toggleSubject(subjectId, container);
      }
    });

    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        const subjectId = (item as HTMLElement).dataset.subjectId;
        if (subjectId) {
          toggleSubject(subjectId, container);
        }
      });
    }
  });

  // Search input
  const searchInput = container.querySelector('#subject-search') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentFilters.search = searchInput.value;
      renderCourseBuilderPage(container);
    });
  }

  // Category filter
  const categoryFilter = container.querySelector('#category-filter') as HTMLSelectElement;
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      currentFilters.category = categoryFilter.value as SubjectCategory | 'all';
      renderCourseBuilderPage(container);
    });
  }

  // Year filter
  const yearFilter = container.querySelector('#year-filter') as HTMLSelectElement;
  if (yearFilter) {
    yearFilter.addEventListener('change', () => {
      currentFilters.year = yearFilter.value ? parseInt(yearFilter.value) : null;
      renderCourseBuilderPage(container);
    });
  }

  // Bulk actions
  const selectAllBtn = container.querySelector('#select-all-btn');
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', () => {
      const filteredSubjects = filterSubjects(curriculum, currentFilters);
      const selectedIds = progressStorage.getSelectedSubjects();
      const newIds = [...new Set([...selectedIds, ...filteredSubjects.map(s => s.id)])];
      progressStorage.setSelectedSubjects(newIds);
      renderCourseBuilderPage(container);
    });
  }

  const deselectAllBtn = container.querySelector('#deselect-all-btn');
  if (deselectAllBtn) {
    deselectAllBtn.addEventListener('click', () => {
      const filteredSubjects = filterSubjects(curriculum, currentFilters);
      const filteredIds = new Set(filteredSubjects.map(s => s.id));
      const selectedIds = progressStorage.getSelectedSubjects();
      const newIds = selectedIds.filter(id => !filteredIds.has(id));
      progressStorage.setSelectedSubjects(newIds);
      renderCourseBuilderPage(container);
    });
  }

  const clearSelectionBtn = container.querySelector('#clear-selection-btn');
  if (clearSelectionBtn) {
    clearSelectionBtn.addEventListener('click', () => {
      if (confirm('Clear all selected subjects? This cannot be undone.')) {
        progressStorage.setSelectedSubjects([]);
        renderCourseBuilderPage(container);
      }
    });
  }

  // View curriculum button
  const viewCurriculumBtn = container.querySelector('#view-curriculum-btn');
  if (viewCurriculumBtn) {
    viewCurriculumBtn.addEventListener('click', () => {
      navigate('/curriculum');
    });
  }
}

/**
 * Apply a template to the selection
 */
function applyTemplate(templateId: string, container: HTMLElement): void {
  const template = getTemplateById(templateId);
  if (!template) return;

  const currentSelection = progressStorage.getSelectedSubjects();

  if (currentSelection.length > 0) {
    const confirmed = confirm(
      `This will replace your current selection (${currentSelection.length} subjects) with the "${template.name}" template (${template.subjectIds.length} subjects). Continue?`
    );
    if (!confirmed) return;
  }

  progressStorage.setSelectedSubjects([...template.subjectIds]);
  renderCourseBuilderPage(container);
}

/**
 * Toggle a subject's selection status
 */
function toggleSubject(subjectId: string, container: HTMLElement): void {
  const selectedIds = progressStorage.getSelectedSubjects();
  const isSelected = selectedIds.includes(subjectId);

  if (isSelected) {
    // Check for dependent subjects before removing
    const dependents = getDependentSubjects(subjectId, selectedIds);
    if (dependents.length > 0) {
      const dependentCodes = dependents.map(s => s.code).join(', ');
      const confirmed = confirm(
        `Removing ${curriculum.find(s => s.id === subjectId)?.code} will leave these subjects without prerequisites: ${dependentCodes}. Continue?`
      );
      if (!confirmed) return;
    }
    progressStorage.removeFromSelection(subjectId);
  } else {
    progressStorage.addToSelection(subjectId);
  }

  renderCourseBuilderPage(container);
}
