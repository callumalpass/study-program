// Assessment pages (Quiz, Exercise, Project)
import type { Subject, Quiz, CodingExercise, WrittenExercise, Exercise, Project, QuizAttempt, ExerciseCompletion, ProjectSubmission } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject, navigateToExercise, navigateToTopic } from '@/core/router';
import { Icons } from '@/components/icons';
import { createCodeEditor, type CodeEditor } from '@/components/code-editor';
import { createProofEditor, type ProofEditor } from '@/components/proof-editor';
import type { TestResult } from '@/components/code-runner';

// Helper to find adjacent exercises within the same topic
function findAdjacentExercises(
  exercises: Exercise[],
  currentExerciseId: string,
  subjectId: string
): { prev: Exercise | null; next: Exercise | null; current: Exercise | null; topicExercises: Exercise[] } {
  const currentExercise = exercises.find(e => e.id === currentExerciseId);
  if (!currentExercise) {
    return { prev: null, next: null, current: null, topicExercises: [] };
  }

  // Get all exercises for this topic in order
  const topicExercises = exercises.filter(
    e => e.subjectId === subjectId && e.topicId === currentExercise.topicId
  );

  const currentIndex = topicExercises.findIndex(e => e.id === currentExerciseId);

  return {
    prev: currentIndex > 0 ? topicExercises[currentIndex - 1] : null,
    next: currentIndex < topicExercises.length - 1 ? topicExercises[currentIndex + 1] : null,
    current: currentExercise,
    topicExercises
  };
}

// Type guard for CodingExercise
function isCodingExercise(exercise: Exercise): exercise is CodingExercise {
  return 'testCases' in exercise && 'starterCode' in exercise;
}

/**
 * Render quiz page
 */
export function renderQuizPage(
  container: HTMLElement,
  subjects: Subject[],
  quizzes: Quiz[],
  subjectId: string,
  quizId: string
): void {
  const subject = subjects.find(s => s.id === subjectId);
  const quiz = quizzes.find(q => q.id === quizId);

  if (!subject || !quiz) {
    renderNotFound(container, 'Quiz', subjectId);
    return;
  }

  const attempts = progressStorage.getQuizAttempts(subjectId, quizId);
  const bestAttempt = attempts.length > 0
    ? attempts.reduce((best, current) => current.score > best.score ? current : best)
    : null;

  container.innerHTML = `
    <div class="quiz-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">/</span>
        <a href="#/subject/${subjectId}">${subject.title}</a>
        <span class="separator">/</span>
        <span class="current">${quiz.title}</span>
      </nav>

      <header class="quiz-header">
        <div class="quiz-title-section">
          <h1>${quiz.title}</h1>
          ${bestAttempt ? `
            <div class="best-score">
              <span class="label">Best Score:</span>
              <span class="score ${bestAttempt.score >= 70 ? 'passed' : 'failed'}">${bestAttempt.score}%</span>
            </div>
          ` : ''}
        </div>
        <div class="quiz-info">
          <span class="info-item">
            <span class="icon">${Icons.Help}</span>
            ${quiz.questions.length} questions
          </span>
          ${attempts.length > 0 ? `
            <span class="info-item">
              <span class="icon">${Icons.Refresh}</span>
              ${attempts.length} attempt${attempts.length > 1 ? 's' : ''}
            </span>
          ` : ''}
        </div>
      </header>

      ${attempts.length > 0 ? `
        <section class="previous-attempts">
          <h2>Previous Attempts</h2>
          <div class="attempts-list">
            ${attempts.slice(-5).reverse().map((attempt, index) => `
              <div class="attempt-card ${attempt.score >= 70 ? 'passed' : 'failed'}">
                <div class="attempt-info">
                  <span class="attempt-number">Attempt ${attempts.length - index}</span>
                  <span class="attempt-date">${formatDate(attempt.timestamp)}</span>
                </div>
                <div class="attempt-score">${attempt.score}%</div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <section class="quiz-content">
        <div id="quiz-container">
          <div class="quiz-start">
            <h2>Ready to ${attempts.length > 0 ? 'try again' : 'start'}?</h2>
            <p>This quiz contains ${quiz.questions.length} questions. Take your time and good luck!</p>
            <button class="btn btn-primary btn-large" id="start-quiz-btn">
              ${attempts.length > 0 ? 'Start New Attempt' : 'Start Quiz'}
            </button>
          </div>
        </div>
      </section>

      <div class="quiz-actions">
        <button class="btn btn-secondary" id="back-to-subject">
          ${Icons.ChevronLeft} Back to Subject
        </button>
      </div>
    </div>
  `;

  attachQuizEventListeners(container, subjectId, quiz);
}

/**
 * Render exercise page
 */
export function renderExercisePage(
  container: HTMLElement,
  subjects: Subject[],
  exercises: Exercise[],
  subjectId: string,
  exerciseId: string
): void {
  const subject = subjects.find(s => s.id === subjectId);
  const exercise = exercises.find(e => e.id === exerciseId);

  if (!subject || !exercise) {
    renderNotFound(container, 'Exercise', subjectId);
    return;
  }

  // Find adjacent exercises for navigation
  const { prev, next, topicExercises } = findAdjacentExercises(exercises, exerciseId, subjectId);
  const currentIndex = topicExercises.findIndex(e => e.id === exerciseId);

  // Render different views based on exercise type
  if (isCodingExercise(exercise)) {
    renderCodingExercisePage(container, subject, exercise, subjectId, exerciseId, prev, next, currentIndex, topicExercises.length);
  } else {
    renderWrittenExercisePage(container, subject, exercise, subjectId, prev, next, currentIndex, topicExercises.length);
  }
}

/**
 * Render a coding exercise page
 */
function renderCodingExercisePage(
  container: HTMLElement,
  subject: Subject,
  exercise: CodingExercise,
  subjectId: string,
  exerciseId: string,
  prevExercise: Exercise | null,
  nextExercise: Exercise | null,
  currentIndex: number,
  totalExercises: number
): void {
  const completion = progressStorage.getExerciseCompletion(subjectId, exerciseId);
  const isPassed = completion?.passed ?? false;

  container.innerHTML = `
    <div class="exercise-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">/</span>
        <a href="#/subject/${subjectId}">${subject.title}</a>
        <span class="separator">/</span>
        <a href="#/subject/${subjectId}/topic/${exercise.topicId}">Topic</a>
        <span class="separator">/</span>
        <span class="current">${exercise.title}</span>
      </nav>

      <header class="exercise-header">
        <h1>${exercise.title}</h1>
        <div class="exercise-meta-row">
          <span class="exercise-counter">Exercise ${currentIndex + 1} of ${totalExercises}</span>
          <span class="meta-separator"></span>
          <span class="info-item">
            <span class="icon">${Icons.StatCode}</span>
            ${formatLanguage(exercise.language)}
          </span>
          <span class="info-item">
            <span class="icon">${Icons.Beaker}</span>
            ${exercise.testCases.length} test cases
          </span>
          ${isPassed ? `
            <span class="completion-badge passed">${Icons.Check} Completed</span>
          ` : completion ? `
            <span class="completion-badge partial">
              ${completion.passedTestCases ?? 0}/${completion.totalTestCases ?? 0} passed
            </span>
          ` : ''}
        </div>
      </header>

      <section class="exercise-description">
        <h2>Description</h2>
        <div class="description-content">
          ${renderMarkdown(exercise.description)}
        </div>
      </section>

      <section class="exercise-workspace">
        <h2>Code Editor</h2>
        <div id="monaco-editor-container"></div>
      </section>

      <nav class="exercise-navigation">
        <div class="nav-left">
          ${prevExercise ? `
            <button class="btn btn-secondary" id="prev-exercise" data-exercise-id="${prevExercise.id}">
              ${Icons.ChevronLeft} Previous
            </button>
          ` : `
            <button class="btn btn-secondary" id="back-to-topic">
              ${Icons.ChevronLeft} Back to Topic
            </button>
          `}
        </div>
        <div class="nav-center">
          <span class="nav-counter">${currentIndex + 1} / ${totalExercises}</span>
        </div>
        <div class="nav-right">
          ${nextExercise ? `
            <button class="btn btn-primary" id="next-exercise" data-exercise-id="${nextExercise.id}">
              Next ${Icons.ChevronRight}
            </button>
          ` : `
            <button class="btn btn-primary" id="back-to-topic-done">
              Done ${Icons.Check}
            </button>
          `}
        </div>
      </nav>
    </div>
  `;

  // Initialize Monaco code editor
  const editorContainer = container.querySelector('#monaco-editor-container') as HTMLElement;
  if (editorContainer) {
    const startTime = Date.now();

    const codeEditor = createCodeEditor(editorContainer, {
      language: exercise.language,
      initialValue: exercise.starterCode,
      starterCode: exercise.starterCode,
      testCases: exercise.testCases,
      hints: exercise.hints,
      solution: exercise.solution,
      storageKey: `exercise_${subjectId}_${exerciseId}`,
      height: '400px',
      onTestResults: (results: TestResult[], allPassed: boolean) => {
        const endTime = Date.now();
        const timeSpent = Math.round((endTime - startTime) / 1000);

        // Save completion to progress storage
        const completion: ExerciseCompletion = {
          completionId: `completion_${Date.now()}`,
          timestamp: new Date().toISOString(),
          code: codeEditor.getValue(),
          passed: allPassed,
          passedTestCases: results.filter(r => r.passed).length,
          totalTestCases: results.length,
          timeSpentSeconds: timeSpent,
        };

        progressStorage.addExerciseCompletion(subjectId, exerciseId, completion);

        // Update the header badge if passed
        if (allPassed) {
          const titleSection = container.querySelector('.exercise-title-section');
          const existingBadge = titleSection?.querySelector('.completion-badge');
          if (existingBadge) {
            existingBadge.className = 'completion-badge passed';
            existingBadge.innerHTML = `${Icons.Check} Completed`;
          } else if (titleSection) {
            const badge = document.createElement('span');
            badge.className = 'completion-badge passed';
            badge.innerHTML = `${Icons.Check} Completed`;
            titleSection.appendChild(badge);
          }
        }
      },
    });

    // Store editor reference for cleanup
    (container as HTMLElement & { _codeEditor?: CodeEditor })._codeEditor = codeEditor;
  }

  // Navigation event handlers
  const disposeAndNavigate = (callback: () => void) => {
    const editorRef = (container as HTMLElement & { _codeEditor?: CodeEditor })._codeEditor;
    if (editorRef) {
      editorRef.dispose();
    }
    callback();
  };

  // Previous exercise button
  const prevBtn = container.querySelector('#prev-exercise');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const prevId = (prevBtn as HTMLElement).dataset.exerciseId;
      if (prevId) {
        disposeAndNavigate(() => navigateToExercise(subjectId, prevId));
      }
    });
  }

  // Next exercise button
  const nextBtn = container.querySelector('#next-exercise');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextId = (nextBtn as HTMLElement).dataset.exerciseId;
      if (nextId) {
        disposeAndNavigate(() => navigateToExercise(subjectId, nextId));
      }
    });
  }

  // Back to topic button (when at first exercise)
  const backToTopicBtn = container.querySelector('#back-to-topic');
  if (backToTopicBtn) {
    backToTopicBtn.addEventListener('click', () => {
      disposeAndNavigate(() => navigateToTopic(subjectId, exercise.topicId));
    });
  }

  // Done button (when at last exercise)
  const doneBtn = container.querySelector('#back-to-topic-done');
  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      disposeAndNavigate(() => navigateToTopic(subjectId, exercise.topicId));
    });
  }
}

/**
 * Render a written exercise page
 */
function renderWrittenExercisePage(
  container: HTMLElement,
  subject: Subject,
  exercise: WrittenExercise,
  subjectId: string,
  prevExercise: Exercise | null,
  nextExercise: Exercise | null,
  currentIndex: number,
  totalExercises: number
): void {
  const exerciseId = exercise.id;
  const completion = progressStorage.getExerciseCompletion(subjectId, exerciseId);
  const hasSavedProof = completion?.type === 'written' && completion.code.trim().length > 0;

  container.innerHTML = `
    <div class="exercise-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">/</span>
        <a href="#/subject/${subjectId}">${subject.title}</a>
        <span class="separator">/</span>
        <a href="#/subject/${subjectId}/topic/${exercise.topicId}">Topic</a>
        <span class="separator">/</span>
        <span class="current">${exercise.title}</span>
      </nav>

      <header class="exercise-header">
        <h1>${exercise.title}</h1>
        <div class="exercise-meta-row">
          <span class="exercise-counter">Exercise ${currentIndex + 1} of ${totalExercises}</span>
          <span class="meta-separator"></span>
          <span class="exercise-type-badge">Written</span>
          ${hasSavedProof ? `
            <span class="completion-badge saved">${Icons.Check} Proof Saved</span>
          ` : ''}
        </div>
      </header>

      <section class="exercise-description">
        <h2>Problem</h2>
        <div class="description-content">
          ${renderMarkdown(exercise.description)}
        </div>
      </section>

      <section class="exercise-workspace">
        <h2>Your Proof</h2>
        <p class="proof-instructions">Write your proof below. You can use Markdown formatting and LaTeX notation (e.g., <code>$x^2$</code> for inline math). Your work is auto-saved as a draft, but click "Save Proof" to save it to your progress.</p>
        <div id="proof-editor-container"></div>
      </section>

      <nav class="exercise-navigation">
        <div class="nav-left">
          ${prevExercise ? `
            <button class="btn btn-secondary" id="prev-exercise" data-exercise-id="${prevExercise.id}">
              ${Icons.ChevronLeft} Previous
            </button>
          ` : `
            <button class="btn btn-secondary" id="back-to-topic">
              ${Icons.ChevronLeft} Back to Topic
            </button>
          `}
        </div>
        <div class="nav-center">
          <span class="nav-counter">${currentIndex + 1} / ${totalExercises}</span>
        </div>
        <div class="nav-right">
          ${nextExercise ? `
            <button class="btn btn-primary" id="next-exercise" data-exercise-id="${nextExercise.id}">
              Next ${Icons.ChevronRight}
            </button>
          ` : `
            <button class="btn btn-primary" id="back-to-topic-done">
              Done ${Icons.Check}
            </button>
          `}
        </div>
      </nav>
    </div>
  `;

  // Initialize proof editor
  const editorContainer = container.querySelector('#proof-editor-container') as HTMLElement;
  if (editorContainer) {
    const proofEditor = createProofEditor(editorContainer, {
      initialValue: completion?.code || '',
      height: '300px',
      storageKey: `proof_${subjectId}_${exerciseId}`,
      hints: exercise.hints,
      solution: exercise.solution,
      onSave: (content: string, timeSpentSeconds: number) => {
        const completion: ExerciseCompletion = {
          completionId: `completion_${Date.now()}`,
          timestamp: new Date().toISOString(),
          code: content,
          passed: content.trim().length > 0,
          timeSpentSeconds,
          type: 'written',
        };

        progressStorage.addExerciseCompletion(subjectId, exerciseId, completion);

        // Update the header badge
        const metaRow = container.querySelector('.exercise-meta-row');
        if (metaRow && content.trim().length > 0) {
          const existingBadge = metaRow.querySelector('.completion-badge');
          if (!existingBadge) {
            const badge = document.createElement('span');
            badge.className = 'completion-badge saved';
            badge.innerHTML = `${Icons.Check} Proof Saved`;
            metaRow.appendChild(badge);
          }
        }
      },
    });

    // Store editor reference for cleanup
    (container as HTMLElement & { _proofEditor?: ProofEditor })._proofEditor = proofEditor;
  }

  // Navigation event handlers with cleanup
  const disposeAndNavigate = (callback: () => void) => {
    const editorRef = (container as HTMLElement & { _proofEditor?: ProofEditor })._proofEditor;
    if (editorRef) {
      editorRef.dispose();
    }
    callback();
  };

  const prevBtn = container.querySelector('#prev-exercise');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const prevId = (prevBtn as HTMLElement).dataset.exerciseId;
      if (prevId) {
        disposeAndNavigate(() => navigateToExercise(subjectId, prevId));
      }
    });
  }

  const nextBtn = container.querySelector('#next-exercise');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextId = (nextBtn as HTMLElement).dataset.exerciseId;
      if (nextId) {
        disposeAndNavigate(() => navigateToExercise(subjectId, nextId));
      }
    });
  }

  const backToTopicBtn = container.querySelector('#back-to-topic');
  if (backToTopicBtn) {
    backToTopicBtn.addEventListener('click', () => {
      disposeAndNavigate(() => navigateToTopic(subjectId, exercise.topicId));
    });
  }

  const doneBtn = container.querySelector('#back-to-topic-done');
  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      disposeAndNavigate(() => navigateToTopic(subjectId, exercise.topicId));
    });
  }
}

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

/**
 * Render not found page
 */
function renderNotFound(container: HTMLElement, itemType: string, subjectId: string): void {
  container.innerHTML = `
    <div class="error-page">
      <h1>${itemType} Not Found</h1>
      <p>The ${itemType.toLowerCase()} you're looking for doesn't exist.</p>
      <button class="btn btn-primary" id="back-to-subject">Back to Subject</button>
    </div>
  `;

  const backBtn = container.querySelector('#back-to-subject');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateToSubject(subjectId));
  }
}

/**
 * Render markdown (simple implementation)
 */
function renderMarkdown(content: string): string {
  return content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('\n');
}

/**
 * Format date for display
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString();
}

/**
 * Format programming language
 */
function formatLanguage(lang: string): string {
  const languageMap: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    rust: 'Rust',
    go: 'Go',
  };
  return languageMap[lang] || lang;
}

/**
 * Attach event listeners for quiz page
 */
function attachQuizEventListeners(container: HTMLElement, subjectId: string, quiz: Quiz): void {
  const backBtn = container.querySelector('#back-to-subject');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateToSubject(subjectId));
  }

  const startBtn = container.querySelector('#start-quiz-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // TODO: Implement quiz component rendering
      alert('Quiz functionality will be implemented with the Quiz component');
    });
  }
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
