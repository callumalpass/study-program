// Project page rendering
import type { Subject, Project, ProjectSubmission, StarterResource } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';
import { renderMarkdown } from '@/components/markdown';
import { renderNotFound, formatDate } from './assessment-utils';

/**
 * Render project page
 */
export function renderProjectPage(
  container: HTMLElement,
  subjects: Subject[],
  projects: Project[],
  subjectId: string,
  projectId: string
): void {
  const subject = subjects.find(s => s.id === subjectId);
  const project = projects.find(p => p.id === projectId);

  if (!subject || !project) {
    renderNotFound(container, 'Project', subjectId);
    return;
  }

  const submissions = progressStorage.getProjectSubmissions(subjectId, projectId);
  const latestSubmission = submissions.length > 0 ? submissions[submissions.length - 1] : null;

  container.innerHTML = `
    <div class="project-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">/</span>
        <a href="#/subject/${subjectId}">${subject.title}</a>
        <span class="separator">/</span>
        <span class="current">${project.title}</span>
      </nav>

      <header class="project-header">
        <div class="project-title-section">
          <h1>${project.title}</h1>
          ${submissions.length > 0 ? `
            <span class="submission-count">${submissions.length} submission${submissions.length > 1 ? 's' : ''}</span>
          ` : ''}
        </div>
        <div class="project-info">
          <span class="info-item">
            <span class="icon">${Icons.Clock}</span>
            ~${project.estimatedHours} hours
          </span>
        </div>
      </header>

      <section class="project-description">
        <h2>Description</h2>
        <div class="description-content">
          ${renderMarkdown(project.description)}
        </div>
      </section>

      ${project.scaffolding ? renderProjectScaffolding(project) : ''}

      <section class="project-requirements">
        <h2>Requirements</h2>
        <ul class="requirements-list">
          ${project.requirements.map(req => `<li>${req}</li>`).join('')}
        </ul>
      </section>

      <section class="project-rubric">
        <h2>Grading Rubric</h2>
        <div class="rubric-table">
          ${project.rubric.map(criterion => `
            <div class="rubric-criterion">
              <div class="criterion-header">
                <h3>${criterion.name}</h3>
                <span class="criterion-weight">${criterion.weight}%</span>
              </div>
              <div class="criterion-levels">
                ${criterion.levels.map(level => `
                  <div class="rubric-level">
                    <div class="level-score">${level.score}</div>
                    <div class="level-content">
                      <div class="level-label">${level.label}</div>
                      <div class="level-description">${level.description}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      ${latestSubmission ? `
        <section class="latest-submission">
          <h2>Your Latest Submission</h2>
          <div class="submission-card">
            <div class="submission-meta">
              <span class="submission-date">${formatDate(latestSubmission.timestamp)}</span>
            </div>
            ${latestSubmission.repositoryUrl ? `
              <div class="submission-link">
                <span class="label">Repository:</span>
                <a href="${latestSubmission.repositoryUrl}" target="_blank" rel="noopener">${latestSubmission.repositoryUrl}</a>
              </div>
            ` : ''}
            ${latestSubmission.demoUrl ? `
              <div class="submission-link">
                <span class="label">Demo:</span>
                <a href="${latestSubmission.demoUrl}" target="_blank" rel="noopener">${latestSubmission.demoUrl}</a>
              </div>
            ` : ''}
            <div class="submission-description">
              <span class="label">Description:</span>
              <p>${latestSubmission.description}</p>
            </div>
            ${latestSubmission.notes ? `
              <div class="submission-notes">
                <span class="label">Notes:</span>
                <p>${latestSubmission.notes}</p>
              </div>
            ` : ''}
          </div>
        </section>
      ` : ''}

      <section class="project-submission-form">
        <h2>${submissions.length > 0 ? 'Submit New Version' : 'Submit Project'}</h2>
        <form id="project-submission-form" class="submission-form">
          <div class="form-group">
            <label for="description">Description *</label>
            <textarea id="description" required placeholder="Describe what you've built..."></textarea>
          </div>

          <div class="form-group">
            <label for="repository-url">Repository URL</label>
            <input type="url" id="repository-url" placeholder="https://github.com/...">
          </div>

          <div class="form-group">
            <label for="demo-url">Demo URL</label>
            <input type="url" id="demo-url" placeholder="https://...">
          </div>

          <div class="form-group">
            <label>Self-Assessment</label>
            <div class="self-assessment-grid">
              ${project.rubric.map(criterion => `
                <div class="assessment-item">
                  <label>${criterion.name}</label>
                  <select class="self-assessment-select" data-criterion="${criterion.name}">
                    ${criterion.levels.map(level => `
                      <option value="${level.score}">${level.label} (${level.score})</option>
                    `).join('')}
                  </select>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="form-group">
            <label for="notes">Additional Notes</label>
            <textarea id="notes" placeholder="Any additional comments or reflections..."></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" id="back-to-subject">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Project</button>
          </div>
        </form>
      </section>
    </div>
  `;

  attachProjectEventListeners(container, subjectId, project);
}

function renderProjectScaffolding(project: Project): string {
  const { scaffolding } = project;
  if (!scaffolding) return '';

  const hasContent = [
    scaffolding.overview,
    scaffolding.gettingStarted,
    scaffolding.milestones,
    scaffolding.starterResources,
    scaffolding.tips,
  ].some(Boolean);

  if (!hasContent) return '';

  return `
    <section class="project-scaffolding">
      <div class="project-scaffolding-header">
        <h2>Scaffolding & Milestones</h2>
        ${scaffolding.overview ? `<p class="scaffolding-overview">${scaffolding.overview}</p>` : ''}
      </div>
      <div class="scaffolding-grid">
        ${renderScaffoldingList('Getting Started', scaffolding.gettingStarted)}
        ${renderScaffoldingList('Milestones', scaffolding.milestones)}
        ${renderScaffoldingResources(scaffolding.starterResources)}
        ${renderScaffoldingList('Tips', scaffolding.tips)}
      </div>
    </section>
  `;
}

function renderScaffoldingList(title: string, items?: string[]): string {
  if (!items || items.length === 0) return '';
  return `
    <div class="scaffolding-card">
      <h3>${title}</h3>
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
}

function renderScaffoldingResources(resources?: StarterResource[]): string {
  if (!resources || resources.length === 0) return '';

  return `
    <div class="scaffolding-card">
      <h3>Starter Resources</h3>
      <ul class="resource-list">
        ${resources.map(res => `
          <li>
            <div class="resource-label">${res.label}${res.link ? ` <a href="${res.link}" target="_blank" rel="noopener">Open</a>` : ''}</div>
            ${res.description ? `<div class="resource-description">${res.description}</div>` : ''}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

/**
 * Attach event listeners for project page
 */
function attachProjectEventListeners(container: HTMLElement, subjectId: string, project: Project): void {
  const backBtn = container.querySelector('#back-to-subject');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateToSubject(subjectId));
  }

  const form = container.querySelector('#project-submission-form') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const description = (container.querySelector('#description') as HTMLTextAreaElement).value;
      const repositoryUrl = (container.querySelector('#repository-url') as HTMLInputElement).value;
      const demoUrl = (container.querySelector('#demo-url') as HTMLInputElement).value;
      const notes = (container.querySelector('#notes') as HTMLTextAreaElement).value;

      // Collect self-assessment scores
      const selfAssessment: Record<string, number> = {};
      container.querySelectorAll('.self-assessment-select').forEach(select => {
        const criterion = (select as HTMLElement).dataset.criterion!;
        const score = parseInt((select as HTMLSelectElement).value);
        selfAssessment[criterion] = score;
      });

      const submission: ProjectSubmission = {
        submissionId: `submission_${Date.now()}`,
        timestamp: new Date().toISOString(),
        description,
        repositoryUrl: repositoryUrl || undefined,
        demoUrl: demoUrl || undefined,
        selfAssessment,
        notes,
      };

      progressStorage.addProjectSubmission(subjectId, project.id, submission);

      alert('Project submitted successfully!');
      navigateToSubject(subjectId);
    });
  }
}
