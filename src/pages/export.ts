import type { Subject, Quiz, Exercise, Project } from '../core/types';
import { generateSubjectPDF, getSubjectContentStats } from '../services/pdf-export';
import { Icons } from '../components/icons';

interface ExportPageState {
  selectedSubjectId: string | null;
  includeSolutions: boolean;
  isGenerating: boolean;
  progress: string;
}

const state: ExportPageState = {
  selectedSubjectId: null,
  includeSolutions: true,
  isGenerating: false,
  progress: '',
};

function getImplementedSubjects(subjects: Subject[]): Subject[] {
  // Only show subjects that have actual content (topics with content)
  return subjects.filter(subject =>
    subject.topics.some(topic => topic.content && topic.content.trim().length > 0)
  );
}

export function renderExportPage(
  container: HTMLElement,
  subjects: Subject[],
  quizzes: Quiz[],
  exercises: Exercise[],
  projects: Project[]
): void {
  const implementedSubjects = getImplementedSubjects(subjects);

  // Set default selection if not set
  if (!state.selectedSubjectId && implementedSubjects.length > 0) {
    state.selectedSubjectId = implementedSubjects[0].id;
  }

  const selectedSubject = implementedSubjects.find(s => s.id === state.selectedSubjectId);
  const stats = selectedSubject
    ? getSubjectContentStats(selectedSubject, quizzes, exercises, projects)
    : null;

  container.innerHTML = `
    <div class="export-page">
      <header class="page-header">
        <h1>Export to PDF</h1>
        <p class="page-description">
          Download course materials as a PDF document for offline study or printing.
        </p>
      </header>

      <div class="export-container">
        <div class="export-card">
          <div class="export-section">
            <label class="export-label" for="subject-select">Select Subject</label>
            <select id="subject-select" class="export-select" ${state.isGenerating ? 'disabled' : ''}>
              ${implementedSubjects.map(subject => `
                <option value="${subject.id}" ${subject.id === state.selectedSubjectId ? 'selected' : ''}>
                  ${subject.code} - ${subject.title}
                </option>
              `).join('')}
            </select>
          </div>

          ${selectedSubject ? `
            <div class="export-preview">
              <h3>Content Preview</h3>
              <div class="preview-stats">
                <div class="stat-item">
                  <span class="stat-value">${stats?.topics || 0}</span>
                  <span class="stat-label">Topics</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">${stats?.quizzes || 0}</span>
                  <span class="stat-label">Quizzes</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">${stats?.exercises || 0}</span>
                  <span class="stat-label">Exercises</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">${stats?.projects || 0}</span>
                  <span class="stat-label">Projects</span>
                </div>
              </div>
              <p class="preview-description">${selectedSubject.description}</p>
            </div>
          ` : ''}

          <div class="export-section">
            <label class="export-label">Options</label>
            <div class="export-checkbox">
              <input
                type="checkbox"
                id="include-solutions"
                ${state.includeSolutions ? 'checked' : ''}
                ${state.isGenerating ? 'disabled' : ''}
              >
              <label for="include-solutions">
                <span class="checkbox-title">Include Solutions & Answers</span>
                <span class="checkbox-description">
                  Show quiz answers, exercise solutions, and explanations
                </span>
              </label>
            </div>
          </div>

          <div class="export-actions">
            <button
              id="generate-pdf-btn"
              class="btn btn-primary btn-large"
              ${state.isGenerating || !selectedSubject ? 'disabled' : ''}
            >
              ${state.isGenerating ? `
                <span class="btn-spinner"></span>
                <span>${state.progress || 'Generating...'}</span>
              ` : `
                <span class="btn-icon">${Icons.Export}</span>
                <span>Generate PDF</span>
              `}
            </button>
          </div>

          ${state.isGenerating ? `
            <div class="export-progress">
              <div class="progress-bar">
                <div class="progress-bar-indeterminate"></div>
              </div>
              <p class="progress-text">${state.progress}</p>
            </div>
          ` : ''}
        </div>

        <div class="export-info">
          <h3>What's Included</h3>
          <ul class="info-list">
            <li>
              <strong>Cover Page</strong>
              <span>Subject title, description, and learning objectives</span>
            </li>
            <li>
              <strong>Topic Content</strong>
              <span>Full lecture notes and explanations for each topic</span>
            </li>
            <li>
              <strong>Exercises</strong>
              <span>All coding and written exercises with test cases</span>
            </li>
            <li>
              <strong>Projects</strong>
              <span>Project descriptions with requirements and grading rubrics</span>
            </li>
            <li>
              <strong>Quizzes</strong>
              <span>Quiz questions ${state.includeSolutions ? 'with answers and explanations' : '(answers hidden)'}</span>
            </li>
          </ul>

          <div class="info-note">
            <strong>Note:</strong> PDF generation may take a few moments for subjects with extensive content.
          </div>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  const subjectSelect = container.querySelector('#subject-select') as HTMLSelectElement;
  const solutionsCheckbox = container.querySelector('#include-solutions') as HTMLInputElement;
  const generateBtn = container.querySelector('#generate-pdf-btn') as HTMLButtonElement;

  subjectSelect?.addEventListener('change', () => {
    state.selectedSubjectId = subjectSelect.value;
    renderExportPage(container, subjects, quizzes, exercises, projects);
  });

  solutionsCheckbox?.addEventListener('change', () => {
    state.includeSolutions = solutionsCheckbox.checked;
    renderExportPage(container, subjects, quizzes, exercises, projects);
  });

  generateBtn?.addEventListener('click', async () => {
    if (!selectedSubject || state.isGenerating) return;

    state.isGenerating = true;
    state.progress = 'Preparing...';
    renderExportPage(container, subjects, quizzes, exercises, projects);

    try {
      await generateSubjectPDF(
        selectedSubject,
        quizzes,
        exercises,
        projects,
        { includeSolutions: state.includeSolutions },
        (progress) => {
          state.progress = progress;
          // Update progress text without full re-render
          const progressText = container.querySelector('.progress-text');
          if (progressText) {
            progressText.textContent = progress;
          }
        }
      );
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      state.isGenerating = false;
      state.progress = '';
      renderExportPage(container, subjects, quizzes, exercises, projects);
    }
  });
}
