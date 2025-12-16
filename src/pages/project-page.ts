// Project page rendering
import type { Subject, Project, ProjectSubmission, StarterResource, ProjectAiEvaluation } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';
import { renderMarkdown } from '@/components/markdown';
import { renderNotFound, formatDate } from './assessment-utils';
import { evaluateProject, type ProjectFile } from '@/utils/gemini-eval';

const MAX_TOTAL_FILE_SIZE = 200 * 1024; // 200KB total limit

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
              ${latestSubmission.aiEvaluation ? `
                <span class="ai-score ${getScoreClass(latestSubmission.aiEvaluation.score)}">
                  AI Score: ${latestSubmission.aiEvaluation.score}%
                </span>
              ` : ''}
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
            ${latestSubmission.aiEvaluation ? renderAiEvaluation(latestSubmission.aiEvaluation, project) : ''}
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

          <div class="form-group file-upload-group">
            <label for="project-files">Upload Project Files for AI Evaluation (optional)</label>
            <p class="form-hint">Upload your key source files to receive AI-powered feedback against the rubric. Max 200KB total.</p>
            <input type="file" id="project-files" multiple accept=".js,.ts,.jsx,.tsx,.py,.java,.c,.cpp,.h,.hpp,.cs,.go,.rs,.rb,.php,.html,.css,.scss,.json,.md,.txt,.sql,.sh,.yml,.yaml">
            <div id="file-list" class="file-list"></div>
            <div id="file-error" class="file-error"></div>
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

function getScoreClass(score: number): string {
  if (score >= 90) return 'score-excellent';
  if (score >= 70) return 'score-good';
  if (score >= 50) return 'score-satisfactory';
  return 'score-needs-improvement';
}

function renderAiEvaluation(evaluation: ProjectAiEvaluation, project: Project): string {
  return `
    <div class="ai-evaluation">
      <h3>AI Evaluation</h3>
      <div class="evaluation-feedback">
        <p>${evaluation.feedback}</p>
      </div>

      <div class="rubric-scores">
        <h4>Rubric Breakdown</h4>
        ${project.rubric.map(criterion => {
          const score = evaluation.rubricScores[criterion.name];
          if (!score) return '';
          return `
            <div class="rubric-score-item">
              <div class="rubric-score-header">
                <span class="criterion-name">${criterion.name}</span>
                <span class="criterion-weight">(${criterion.weight}%)</span>
                <span class="criterion-score ${getScoreClass(score.score)}">${score.score} - ${score.level}</span>
              </div>
              <p class="criterion-justification">${score.justification}</p>
            </div>
          `;
        }).join('')}
      </div>

      ${evaluation.strengths.length > 0 ? `
        <div class="evaluation-strengths">
          <h4>Strengths</h4>
          <ul>
            ${evaluation.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${evaluation.improvements.length > 0 ? `
        <div class="evaluation-improvements">
          <h4>Areas for Improvement</h4>
          <ul>
            ${evaluation.improvements.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
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
 * Read files and return their contents
 */
async function readFiles(files: FileList): Promise<ProjectFile[]> {
  const projectFiles: ProjectFile[] = [];

  for (const file of Array.from(files)) {
    const content = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
    projectFiles.push({ name: file.name, content });
  }

  return projectFiles;
}

/**
 * Format file size for display
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Attach event listeners for project page
 */
function attachProjectEventListeners(container: HTMLElement, subjectId: string, project: Project): void {
  const backBtn = container.querySelector('#back-to-subject');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateToSubject(subjectId));
  }

  // File upload handling
  const fileInput = container.querySelector('#project-files') as HTMLInputElement;
  const fileListEl = container.querySelector('#file-list') as HTMLElement;
  const fileErrorEl = container.querySelector('#file-error') as HTMLElement;

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const files = fileInput.files;
      fileErrorEl.textContent = '';
      fileListEl.innerHTML = '';

      if (!files || files.length === 0) return;

      const totalSize = Array.from(files).reduce((sum, f) => sum + f.size, 0);

      if (totalSize > MAX_TOTAL_FILE_SIZE) {
        fileErrorEl.textContent = `Total file size (${formatFileSize(totalSize)}) exceeds limit of ${formatFileSize(MAX_TOTAL_FILE_SIZE)}. Please select fewer or smaller files.`;
        fileInput.value = '';
        return;
      }

      // Display selected files
      fileListEl.innerHTML = `
        <div class="selected-files">
          <strong>Selected files (${formatFileSize(totalSize)}):</strong>
          <ul>
            ${Array.from(files).map(f => `<li>${f.name} (${formatFileSize(f.size)})</li>`).join('')}
          </ul>
        </div>
      `;
    });
  }

  const form = container.querySelector('#project-submission-form') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      const originalBtnText = submitBtn.textContent;

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

      // Check if files were uploaded for AI evaluation
      const files = fileInput?.files;
      if (files && files.length > 0) {
        const apiKey = progressStorage.getSettings().geminiApiKey;

        if (!apiKey) {
          const proceed = confirm(
            'No Gemini API key configured. Your project will be submitted without AI evaluation.\n\n' +
            'To enable AI evaluation, add your Gemini API key in Settings.\n\n' +
            'Submit without AI evaluation?'
          );
          if (!proceed) return;
        } else {
          // Run AI evaluation
          submitBtn.textContent = 'Evaluating...';
          submitBtn.disabled = true;

          try {
            const projectFiles = await readFiles(files);
            const evaluation = await evaluateProject(apiKey, project, projectFiles);
            submission.aiEvaluation = evaluation;
          } catch (error) {
            console.error('AI evaluation failed:', error);
            const proceed = confirm(
              `AI evaluation failed: ${error instanceof Error ? error.message : 'Unknown error'}\n\n` +
              'Submit without AI evaluation?'
            );
            if (!proceed) {
              submitBtn.textContent = originalBtnText;
              submitBtn.disabled = false;
              return;
            }
          }
        }
      }

      progressStorage.addProjectSubmission(subjectId, project.id, submission);

      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;

      alert(submission.aiEvaluation
        ? `Project submitted successfully! AI Score: ${submission.aiEvaluation.score}%`
        : 'Project submitted successfully!'
      );

      // Refresh the page to show the new submission
      window.location.reload();
    });
  }
}
