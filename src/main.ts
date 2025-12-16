import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';

import { onRouteChange } from './core/router';
import { progressStorage } from './core/storage';
import { curriculum } from './data/curriculum';
import type { Theme } from './core/types';
import { renderSidebar } from './components/preact/sidebar';
import { renderHomePage } from './pages/home';
import { renderCurriculumPage } from './pages/curriculum';
import { renderSubjectPage } from './pages/subject';
import { renderProgressPage } from './pages/progress';
import { renderSettingsPage } from './pages/settings';
import { renderQuizPage, renderExercisePage, renderProjectPage, renderExamPage } from './pages/assessment';
import { renderExportPage } from './pages/export';
import { renderTimelinePage } from './pages/timeline';

// Import all subject content for assessments
import { cs101Quizzes, cs101Exercises, cs101Projects, cs101Exams } from './data/subjects/cs101';
import { math101Quizzes, math101Exercises, math101Exams } from './data/subjects/math101';
import { cs102Quizzes, cs102Exercises, cs102Projects } from './data/subjects/cs102';
import { cs103Quizzes, cs103Exercises, cs103Projects, cs103Exams } from './data/subjects/cs103';
import { math102Quizzes, math102Exercises, math102Projects } from './data/subjects/math102';
import { cs104Quizzes, cs104Exercises, cs104Projects } from './data/subjects/cs104';
import { cs105Quizzes, cs105Exercises, cs105Projects } from './data/subjects/cs105';
import { cs201Quizzes, cs201Exercises, cs201Projects, cs201Exams } from './data/subjects/cs201';
import { cs202Quizzes, cs202Exercises, cs202Projects, cs202Exams } from './data/subjects/cs202';
import { cs203Quizzes, cs203Exercises, cs203Exams, cs203Projects } from './data/subjects/cs203';
import { math203Quizzes, math203Exercises, math203Projects, math203Exams } from './data/subjects/math203';

import type { Quiz, Exercise, Project, Exam } from './core/types';

// Aggregate all content
const allQuizzes: Quiz[] = [
  ...cs101Quizzes,
  ...math101Quizzes,
  ...cs102Quizzes,
  ...cs103Quizzes,
  ...math102Quizzes,
  ...cs104Quizzes,
  ...cs105Quizzes,
  ...cs201Quizzes,
  ...cs202Quizzes,
  ...cs203Quizzes,
  ...math203Quizzes,
];

const allExams: Exam[] = [
  ...cs101Exams,
  ...math101Exams,
  ...cs103Exams,
  ...cs201Exams,
  ...cs202Exams,
  ...cs203Exams,
  ...math203Exams,
];

const allExercises: Exercise[] = [
  ...cs101Exercises,
  ...math101Exercises,
  ...cs102Exercises,
  ...cs103Exercises,
  ...math102Exercises,
  ...cs104Exercises,
  ...cs105Exercises,
  ...cs201Exercises,
  ...cs202Exercises,
  ...cs203Exercises,
  ...math203Exercises,
];

const allProjects: Project[] = [
  ...cs101Projects,
  // math101 projects retired - uses exams instead
  ...cs102Projects,
  ...cs103Projects,
  ...math102Projects,
  ...cs104Projects,
  ...cs105Projects,
  ...cs201Projects,
  ...cs202Projects,
  ...cs203Projects,
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

/**
 * Initialize mobile navigation
 */
function initMobileNav(): void {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('sidebar-close-btn');

  if (!hamburgerBtn || !sidebar || !overlay) {
    return;
  }

  const openMenu = () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close menu when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close menu when clicking a nav link (on mobile)
  sidebar.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.sidebar-nav-link') || target.closest('.subject-link')) {
      // Small delay to allow navigation to start
      setTimeout(closeMenu, 100);
    }
  });

  // Close menu on window resize if becoming desktop
  let resizeTimer: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
        closeMenu();
      }
    }, 100);
  });
}

// Initialize the application
function initApp(): void {
  // Initialize theme first to prevent flash of wrong theme
  initTheme();

  // Initialize mobile navigation
  initMobileNav();

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
      renderSidebar(sidebarEl, path, curriculum, userProgress.subjects, allQuizzes, allExercises, allExams, allProjects);
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
      } else if (path === '/timeline') {
        renderTimelinePage(mainEl, curriculum);
      } else if (path.startsWith('/subject/')) {
        const subjectId = params.id;

        if (params.subtopicSlug) {
          // Subtopic view
          renderSubjectPage(mainEl, curriculum, subjectId, params.topicId, allProjects, allExams, params.subtopicSlug, allQuizzes, allExercises);
        } else if (params.topicId) {
          // Topic view (may redirect to subtopic if topic has subtopics)
          renderSubjectPage(mainEl, curriculum, subjectId, params.topicId, allProjects, allExams, undefined, allQuizzes, allExercises);
        } else if (params.quizId) {
          renderQuizPage(mainEl, curriculum, allQuizzes, subjectId, params.quizId, allExercises, allExams, allProjects);
        } else if (params.examId) {
          renderExamPage(mainEl, curriculum, allExams, subjectId, params.examId, allQuizzes, allExercises, allProjects);
        } else if (params.exId) {
          renderExercisePage(mainEl, curriculum, allExercises, subjectId, params.exId, allQuizzes, allExams, allProjects);
        } else if (params.projId) {
          renderProjectPage(mainEl, curriculum, allProjects, subjectId, params.projId);
        } else {
          renderSubjectPage(mainEl, curriculum, subjectId, undefined, allProjects, allExams, undefined, allQuizzes, allExercises);
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
