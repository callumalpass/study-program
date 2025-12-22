import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/animations.css';

import { onRouteChange } from './core/router';
import { progressStorage } from './core/storage';
import { curriculum } from './data/curriculum';
import type { Theme } from './core/types';
import { showToast } from './components/toast';
import { renderSidebar } from './components/preact/sidebar';
import { renderHomePage } from './pages/home';
import { renderCurriculumPage } from './pages/curriculum';
import { renderSubjectPage } from './pages/subject';
import { renderProgressPage } from './pages/progress';
import { renderSettingsPage } from './pages/settings';
import { renderQuizPage, renderExercisePage, renderProjectPage, renderExamPage } from './pages/assessment';
import { renderExportPage } from './pages/export';
import { renderTimelinePage } from './pages/timeline';
import { renderCourseBuilderPage } from './pages/course-builder';
import { updateMermaidTheme } from './components/markdown';

// Import all subject content from central registry
import { allQuizzes, allExercises, allProjects, allExams } from './subjects';

/**
 * Apply the theme to the document
 */
function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  let isDark = false;

  if (theme === 'auto') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    isDark = theme === 'dark';
    root.setAttribute('data-theme', theme);
  }

  updateMermaidTheme(isDark);
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
 * Initialize sidebar toggle (desktop)
 */
function initSidebarToggle(): void {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const appContainer = document.getElementById('app');

  if (!toggleBtn || !appContainer) return;

  // Check for saved state
  const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
  if (isCollapsed) {
    appContainer.classList.add('sidebar-collapsed');
  }

  toggleBtn.addEventListener('click', () => {
    appContainer.classList.toggle('sidebar-collapsed');
    const collapsed = appContainer.classList.contains('sidebar-collapsed');
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  });
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
    if (
      target.closest('.sidebar-nav-link') ||
      target.closest('.subject-link') ||
      target.closest('.subject-header-new')
    ) {
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
async function initApp(): Promise<void> {
  // Initialize theme first to prevent flash of wrong theme
  initTheme();

  // Sync progress from GitHub Gist on startup (non-blocking for UI)
  progressStorage.syncFromGist().then((result) => {
    if (result.updated) {
      showToast('Progress synced from cloud', 'success');
      // Trigger a re-render by navigating to the current route
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  });

  // Initialize navigation
  initSidebarToggle();
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
      } else if (path === '/course-builder') {
        renderCourseBuilderPage(mainEl);
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

  // Flush sync on page unload to ensure remote sync completes
  window.addEventListener('beforeunload', () => {
    progressStorage.flushSync();
  });

  // Also flush when tab becomes hidden (user switches tabs)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      progressStorage.flushSync();
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
