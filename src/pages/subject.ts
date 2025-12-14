// Subject detail page
import type { Subject, Topic, Project } from '@/core/types';
import { progressStorage } from '@/core/storage';
import {
  arePrerequisitesMet,
  startSubject,
  getSubjectProgressDetails,
} from '@/core/progress';
import {
  navigateToQuiz,
  navigateToExercise,
  navigateToProject,
  navigateToCurriculum,
} from '@/core/router';

// Store projects globally for access
let currentProjects: Project[] = [];

/**
 * Render the subject detail page
 */
export function renderSubjectPage(
  container: HTMLElement,
  subjects: Subject[],
  subjectId: string,
  topicId?: string,
  projects?: Project[]
): void {
  const subject = subjects.find(s => s.id === subjectId);

  // Store projects for this subject
  if (projects) {
    currentProjects = projects.filter(p => p.subjectId === subjectId);
  }

  if (!subject) {
    container.innerHTML = `
      <div class="error-page">
        <h1>Subject Not Found</h1>
        <p>The subject you're looking for doesn't exist.</p>
        <button class="btn btn-primary" id="back-to-curriculum">Back to Curriculum</button>
      </div>
    `;

    const backBtn = container.querySelector('#back-to-curriculum');
    if (backBtn) {
      backBtn.addEventListener('click', () => navigateToCurriculum());
    }
    return;
  }

  const userProgress = progressStorage.getProgress();
  const prerequisitesMet = arePrerequisitesMet(subject, userProgress);
  const progressDetails = getSubjectProgressDetails(subject);

  // Auto-start subject if viewing it and prerequisites are met
  if (prerequisitesMet && progressDetails.status === 'not_started') {
    startSubject(subjectId);
  }

  if (topicId) {
    renderTopicView(container, subject, topicId, subjects, userProgress);
  } else {
    renderSubjectOverview(container, subject, subjects, userProgress, prerequisitesMet, progressDetails);
  }
}

/**
 * Render the subject overview (main view)
 */
function renderSubjectOverview(
  container: HTMLElement,
  subject: Subject,
  allSubjects: Subject[],
  userProgress: any,
  prerequisitesMet: boolean,
  progressDetails: any
): void {
  const prerequisiteSubjects = subject.prerequisites.map(prereqId =>
    allSubjects.find(s => s.id === prereqId)
  ).filter(Boolean) as Subject[];

  const subjectProjects = currentProjects;

  container.innerHTML = `
    <div class="subject-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">›</span>
        <span class="current">${subject.title}</span>
      </nav>

      <header class="subject-header">
        <div class="subject-title-row">
          <div>
            <span class="subject-code">${subject.code}</span>
            <h1>${subject.title}</h1>
          </div>
          <div class="subject-status-badge status-${progressDetails.status.replace('_', '-')}">
            ${formatStatus(progressDetails.status)}
          </div>
        </div>

        <p class="subject-description">${subject.description}</p>

        <div class="subject-meta">
          <span class="meta-item">Year ${subject.year}, Semester ${subject.semester}</span>
          <span class="meta-item">${subject.estimatedHours} hours</span>
          <span class="meta-item">${subject.topics.length} topics</span>
          ${subjectProjects.length > 0 ? `<span class="meta-item">${subjectProjects.length} projects</span>` : ''}
        </div>
      </header>

      ${!prerequisitesMet ? `
        <section class="prerequisites-warning">
          <h3>Prerequisites Required</h3>
          <p>Complete these subjects first:</p>
          <ul class="prerequisite-list">
            ${prerequisiteSubjects.map(prereq => {
              const prereqProgress = userProgress.subjects[prereq.id];
              const isCompleted = prereqProgress?.status === 'completed';
              return `
                <li class="${isCompleted ? 'completed' : ''}">
                  <span class="checkbox">${isCompleted ? '✓' : '○'}</span>
                  ${prereq.title} (${prereq.code})
                </li>
              `;
            }).join('')}
          </ul>
        </section>
      ` : ''}

      <section class="section">
        <h2>Learning Objectives</h2>
        <ul class="objectives-list">
          ${subject.learningObjectives.map(objective => `<li>${objective}</li>`).join('')}
        </ul>
      </section>

      <section class="section">
        <h2>Topics</h2>
        <div class="topics-list">
          ${subject.topics.map((topic, index) => renderTopicItem(topic, index + 1, subject.id, userProgress)).join('')}
        </div>
      </section>

      ${subjectProjects.length > 0 ? `
        <section class="section">
          <h2>Projects</h2>
          <div class="projects-list">
            ${subjectProjects.map(project => renderProjectItem(project, subject.id, userProgress)).join('')}
          </div>
        </section>
      ` : ''}
    </div>
  `;

  attachSubjectEventListeners(container, subject.id);
}

/**
 * Render a topic item in the list
 */
function renderTopicItem(topic: Topic, number: number, subjectId: string, userProgress: any): string {
  const progress = userProgress.subjects[subjectId];
  const quizzesCompleted = topic.quizIds.filter(quizId => {
    const attempts = progress?.quizAttempts[quizId];
    if (!attempts || attempts.length === 0) return false;
    const bestScore = Math.max(...attempts.map((a: any) => a.score));
    return bestScore >= 70;
  }).length;

  const exercisesCompleted = topic.exerciseIds.filter(exerciseId => {
    const completions = progress?.exerciseCompletions[exerciseId];
    return completions && completions.some((c: any) => c.passed);
  }).length;

  const totalAssessments = topic.quizIds.length + topic.exerciseIds.length;
  const completedAssessments = quizzesCompleted + exercisesCompleted;
  const isCompleted = totalAssessments > 0 && completedAssessments === totalAssessments;

  return `
    <div class="topic-item ${isCompleted ? 'completed' : ''}">
      <div class="topic-number">${number}</div>
      <div class="topic-info">
        <h3>${topic.title}</h3>
        <div class="topic-meta">
          ${topic.quizIds.length > 0 ? `<span>${quizzesCompleted}/${topic.quizIds.length} quizzes</span>` : ''}
          ${topic.exerciseIds.length > 0 ? `<span>${exercisesCompleted}/${topic.exerciseIds.length} exercises</span>` : ''}
          ${isCompleted ? '<span class="completed-tag">✓ Complete</span>' : ''}
        </div>
      </div>
      <button class="btn btn-secondary btn-sm view-topic-btn" data-topic-id="${topic.id}">
        View
      </button>
    </div>
  `;
}

/**
 * Render a project item in the list
 */
function renderProjectItem(project: Project, subjectId: string, userProgress: any): string {
  const progress = userProgress.subjects[subjectId];
  const submissions = progress?.projectSubmissions?.[project.id] || [];
  const hasSubmission = submissions.length > 0;

  return `
    <div class="project-item ${hasSubmission ? 'submitted' : ''}">
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}</p>
        <div class="project-meta">
          <span>${project.estimatedHours} hours</span>
          <span>${project.requirements.length} requirements</span>
          ${hasSubmission ? `<span class="submitted-tag">✓ Submitted</span>` : ''}
        </div>
      </div>
      <button class="btn btn-primary btn-sm view-project-btn" data-project-id="${project.id}">
        ${hasSubmission ? 'View' : 'Start'}
      </button>
    </div>
  `;
}

/**
 * Render the topic detail view
 */
function renderTopicView(
  container: HTMLElement,
  subject: Subject,
  topicId: string,
  allSubjects: Subject[],
  userProgress: any
): void {
  const topic = subject.topics.find(t => t.id === topicId);

  if (!topic) {
    renderSubjectOverview(
      container,
      subject,
      allSubjects,
      userProgress,
      arePrerequisitesMet(subject, userProgress),
      getSubjectProgressDetails(subject)
    );
    return;
  }

  const progress = userProgress.subjects[subject.id];

  container.innerHTML = `
    <div class="topic-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">›</span>
        <a href="#/subject/${subject.id}">${subject.code}</a>
        <span class="separator">›</span>
        <span class="current">${topic.title}</span>
      </nav>

      <header class="page-header">
        <h1>${topic.title}</h1>
      </header>

      <section class="content-section">
        ${renderMarkdown(topic.content)}
      </section>

      ${topic.quizIds.length > 0 || topic.exerciseIds.length > 0 ? `
        <section class="section">
          <h2>Practice</h2>
          <div class="assessment-list">
            ${topic.quizIds.map((quizId, index) => {
              const attempts = progress?.quizAttempts[quizId] || [];
              const bestScore = attempts.length > 0
                ? Math.max(...attempts.map((a: any) => a.score))
                : null;
              const passed = bestScore !== null && bestScore >= 70;

              return `
                <div class="assessment-item ${passed ? 'passed' : ''}">
                  <div class="assessment-info">
                    <span class="assessment-type">Quiz</span>
                    <span class="assessment-title">Quiz ${index + 1}</span>
                    ${bestScore !== null ? `<span class="assessment-score ${passed ? 'passed' : ''}">${bestScore}%</span>` : ''}
                  </div>
                  <button class="btn btn-primary btn-sm" data-quiz-id="${quizId}">
                    ${attempts.length > 0 ? 'Retry' : 'Start'}
                  </button>
                </div>
              `;
            }).join('')}

            ${topic.exerciseIds.map((exerciseId, index) => {
              const completions = progress?.exerciseCompletions[exerciseId] || [];
              const passed = completions.some((c: any) => c.passed);

              return `
                <div class="assessment-item ${passed ? 'passed' : ''}">
                  <div class="assessment-info">
                    <span class="assessment-type">Exercise</span>
                    <span class="assessment-title">Exercise ${index + 1}</span>
                    ${passed ? '<span class="assessment-score passed">✓</span>' : ''}
                  </div>
                  <button class="btn btn-primary btn-sm" data-exercise-id="${exerciseId}">
                    ${completions.length > 0 ? 'Retry' : 'Start'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : ''}

      <div class="page-actions">
        <button class="btn btn-secondary" id="back-to-subject">← Back to ${subject.code}</button>
      </div>
    </div>
  `;

  attachTopicEventListeners(container, subject.id);
}

/**
 * Simple markdown renderer
 */
function renderMarkdown(content: string): string {
  if (!content) return '<p>No content available yet.</p>';

  return content
    .split('\n\n')
    .map(paragraph => {
      if (paragraph.startsWith('# ')) return `<h1>${paragraph.slice(2)}</h1>`;
      if (paragraph.startsWith('## ')) return `<h2>${paragraph.slice(3)}</h2>`;
      if (paragraph.startsWith('### ')) return `<h3>${paragraph.slice(4)}</h3>`;

      if (paragraph.startsWith('```')) {
        const lines = paragraph.split('\n');
        const code = lines.slice(1, -1).join('\n');
        return `<pre><code>${escapeHtml(code)}</code></pre>`;
      }

      if (paragraph.includes('\n- ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
        return `<ul>${items.map(item => `<li>${item.slice(2)}</li>`).join('')}</ul>`;
      }

      return `<p>${paragraph}</p>`;
    })
    .join('\n');
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatStatus(status: string): string {
  return status.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function attachSubjectEventListeners(container: HTMLElement, subjectId: string): void {
  container.querySelectorAll('.view-topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const topicId = (btn as HTMLElement).dataset.topicId;
      if (topicId) {
        window.location.hash = `#/subject/${subjectId}/topic/${topicId}`;
      }
    });
  });

  container.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = (btn as HTMLElement).dataset.projectId;
      if (projectId) {
        navigateToProject(subjectId, projectId);
      }
    });
  });
}

function attachTopicEventListeners(container: HTMLElement, subjectId: string): void {
  const backBtn = container.querySelector('#back-to-subject');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.hash = `#/subject/${subjectId}`;
    });
  }

  container.querySelectorAll('[data-quiz-id]').forEach(btn => {
    const quizId = (btn as HTMLElement).dataset.quizId;
    if (quizId) {
      btn.addEventListener('click', () => navigateToQuiz(subjectId, quizId));
    }
  });

  container.querySelectorAll('[data-exercise-id]').forEach(btn => {
    const exerciseId = (btn as HTMLElement).dataset.exerciseId;
    if (exerciseId) {
      btn.addEventListener('click', () => navigateToExercise(subjectId, exerciseId));
    }
  });
}
