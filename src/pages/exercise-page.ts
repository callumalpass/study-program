// Exercise page rendering
import type { Subject, CodingExercise, WrittenExercise, Exercise, ExerciseCompletion } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToExercise, navigateToTopic } from '@/core/router';
import { Icons } from '@/components/icons';
import { createCodeEditor, type CodeEditor } from '@/components/code-editor';
import { createProofEditor, type ProofEditor } from '@/components/proof-editor';
import type { TestResult } from '@/components/code-runner';
import { renderMarkdown } from '@/components/markdown';
import { renderNotFound, formatLanguage } from './assessment-utils';

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
