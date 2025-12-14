import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';

import { onRouteChange } from './core/router';
import { progressStorage } from './core/storage';
import { curriculum } from './data/curriculum';
import type { Theme } from './core/types';
import { renderSidebar } from './components/sidebar';
import { renderHomePage } from './pages/home';
import { renderCurriculumPage } from './pages/curriculum';
import { renderSubjectPage } from './pages/subject';
import { renderProgressPage } from './pages/progress';
import { renderSettingsPage } from './pages/settings';
import { renderQuizPage, renderExercisePage, renderProjectPage } from './pages/assessment';
import { renderExportPage } from './pages/export';

// Import all subject content for assessments
import { cs101Quizzes, cs101Exercises, cs101Projects } from './data/subjects/cs101';
import { math101Quizzes, math101Exercises, math101Projects } from './data/subjects/math101';
import { cs102Quizzes, cs102Exercises, cs102Projects } from './data/subjects/cs102';
import { cs103Quizzes, cs103Exercises, cs103Projects } from './data/subjects/cs103';
import { math102Quizzes, math102Exercises, math102Projects } from './data/subjects/math102';
import { cs104Quizzes, cs104Exercises, cs104Projects } from './data/subjects/cs104';
import { cs105Quizzes, cs105Exercises, cs105Projects } from './data/subjects/cs105';
import { math203Quizzes, math203Exercises, math203Projects } from './data/subjects/math203';

import type { Quiz, Exercise, Project } from './core/types';

// Aggregate all content
const allQuizzes: Quiz[] = [
  ...cs101Quizzes,
  ...math101Quizzes,
  ...cs102Quizzes,
  ...cs103Quizzes,
  ...math102Quizzes,
  ...cs104Quizzes,
  ...cs105Quizzes,
  ...math203Quizzes,
];

const allExercises: Exercise[] = [
  ...cs101Exercises,
  ...math101Exercises,
  ...cs102Exercises,
  ...cs103Exercises,
  ...math102Exercises,
  ...cs104Exercises,
  ...cs105Exercises,
  ...math203Exercises,
];

const allProjects: Project[] = [
  ...cs101Projects,
  ...math101Projects,
  ...cs102Projects,
  ...cs103Projects,
  ...math102Projects,
  ...cs104Projects,
  ...cs105Projects,
  ...math203Projects,
];

/**
 * Apply the theme to the document
 */
function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

/**
 * Initialize theme on app startup and listen for system changes
 */
function initTheme(): void {
  const settings = progressStorage.getSettings();
  applyTheme(settings.theme);

  // Listen for system theme changes when in 'auto' mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const currentSettings = progressStorage.getSettings();
    if (currentSettings.theme === 'auto') {
      applyTheme('auto');
    }
  });
}

/**
 * Render an error page when something goes wrong
 */
function renderErrorPage(container: HTMLElement, error: Error, path: string): void {
  console.error('Page rendering error:', error);

  container.innerHTML = `
    <div class="error-boundary">
      <div class="error-icon">⚠️</div>
      <h1>Something went wrong</h1>
      <p class="error-message">An error occurred while rendering this page.</p>
      <details class="error-details">
        <summary>Technical details</summary>
        <p><strong>Path:</strong> <code>${path}</code></p>
        <p><strong>Error:</strong> <code>${error.message}</code></p>
        ${error.stack ? `<pre class="error-stack">${error.stack}</pre>` : ''}
      </details>
      <div class="error-actions">
        <button class="btn btn-primary" onclick="location.reload()">Reload Page</button>
        <a href="#/" class="btn btn-secondary">Go Home</a>
      </div>
    </div>
  `;
}

/**
 * Safely render a page with error boundary
 */
function safeRender(
  container: HTMLElement,
  path: string,
  renderFn: () => void
): void {
  try {
    renderFn();
  } catch (error) {
    renderErrorPage(
      container,
      error instanceof Error ? error : new Error(String(error)),
      path
    );
  }
}

// Initialize the application
function initApp(): void {
  // Initialize theme first to prevent flash of wrong theme
  initTheme();

  const sidebarEl = document.getElementById('sidebar');
  const mainEl = document.getElementById('main-content');

  if (!sidebarEl || !mainEl) {
    console.error('Required DOM elements not found');
    return;
  }

  // Set up route change handler
  onRouteChange((route) => {
    const { path, params } = route;

    // Get fresh progress for each route change
    const userProgress = progressStorage.getProgress();

    // Render sidebar (wrapped in error boundary)
    safeRender(sidebarEl, path, () => {
      renderSidebar(sidebarEl, path, curriculum, userProgress.subjects);
    });

    // Route to appropriate page (wrapped in error boundary)
    safeRender(mainEl, path, () => {
      if (path === '/' || path === '') {
        renderHomePage(mainEl, curriculum);
      } else if (path === '/curriculum') {
        renderCurriculumPage(mainEl, curriculum);
      } else if (path === '/progress') {
        renderProgressPage(mainEl, curriculum);
      } else if (path === '/settings') {
        renderSettingsPage(mainEl);
      } else if (path === '/export') {
        renderExportPage(mainEl, curriculum, allQuizzes, allExercises, allProjects);
      } else if (path.startsWith('/subject/')) {
        const subjectId = params.id;

        if (params.topicId) {
          renderSubjectPage(mainEl, curriculum, subjectId, params.topicId, allProjects);
        } else if (params.quizId) {
          renderQuizPage(mainEl, curriculum, allQuizzes, subjectId, params.quizId);
        } else if (params.exId) {
          renderExercisePage(mainEl, curriculum, allExercises, subjectId, params.exId);
        } else if (params.projId) {
          renderProjectPage(mainEl, curriculum, allProjects, subjectId, params.projId);
        } else {
          renderSubjectPage(mainEl, curriculum, subjectId, undefined, allProjects);
        }
      }
    });
  });

  // Router initializes itself via constructor - no need to call init()
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
