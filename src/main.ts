import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/animations.css';

import { onRouteChange } from './core/router';
import { PROGRESS_UPDATED_EVENT, progressStorage } from './core/storage';
import type { Route, Subject, Theme } from './core/types';
import { showToast } from './components/toast';
import { renderSidebar } from './components/preact/sidebar';
import { renderMobileHeaderMascot } from './components/preact/mobile-header';
import { renderStudySessionAccess } from './components/study-session-access';
import { escapeHtml } from './utils/html';
import { registerPwa } from './pwa';
import { loadAllAssessments, loadSubjectAssessments } from './subjects/registry';
import { loadApiCurriculum } from './content-core/api-client';

/** Delay before closing mobile menu after navigation click (ms) */
const MENU_CLOSE_DELAY_MS = 100;

/** Debounce delay for window resize handler (ms) */
const RESIZE_DEBOUNCE_MS = 100;

/** Breakpoint width below which mobile navigation is used (px) */
const MOBILE_BREAKPOINT_PX = 768;

/** Minimum vertical scroll delta before hiding or showing mobile chrome (px) */
const MOBILE_CHROME_SCROLL_DELTA_PX = 10;

/** Keep mobile chrome visible near the top of the page (px) */
const MOBILE_CHROME_TOP_THRESHOLD_PX = 24;

let curriculumPromise: Promise<Subject[]> | null = null;
let routeRenderToken = 0;
let studySessionAccessRefreshScheduled = false;

function loadCurriculum(): Promise<Subject[]> {
  if (!curriculumPromise) {
    curriculumPromise = loadApiCurriculum().then(async (apiCurriculum) => {
      if (apiCurriculum) return apiCurriculum;
      const module = await import('./data/curriculum');
      return module.curriculum;
    });
  }
  return curriculumPromise;
}

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
        <p><strong>Path:</strong> <code>${escapeHtml(path)}</code></p>
        <p><strong>Error:</strong> <code>${escapeHtml(error.message)}</code></p>
        ${error.stack ? `<pre class="error-stack">${escapeHtml(error.stack)}</pre>` : ''}
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
 * Safely render a page with async lazy-loaded modules.
 */
async function safeRenderAsync(
  container: HTMLElement,
  path: string,
  renderFn: () => Promise<void>
): Promise<void> {
  try {
    await renderFn();
  } catch (error) {
    renderErrorPage(
      container,
      error instanceof Error ? error : new Error(String(error)),
      path
    );
  }
}

function renderLoadingPage(container: HTMLElement): void {
  container.innerHTML = `
    <div class="page-container loading-page">
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  `;
}

function getCurrentHashPath(): string {
  return window.location.hash.replace(/^#/, '') || '/';
}

function refreshStudySessionAccess(studySessionAccessEl: HTMLElement | null): void {
  if (!studySessionAccessEl || studySessionAccessRefreshScheduled) return;

  studySessionAccessRefreshScheduled = true;
  window.requestAnimationFrame(() => {
    studySessionAccessRefreshScheduled = false;
    const path = getCurrentHashPath();

    loadCurriculum()
      .then((curriculum) => {
        safeRender(studySessionAccessEl, path, () => {
          renderStudySessionAccess(studySessionAccessEl, path, curriculum);
        });
      })
      .catch((error) => {
        renderErrorPage(
          studySessionAccessEl,
          error instanceof Error ? error : new Error(String(error)),
          path
        );
      });
  });
}

async function renderRoute(
  route: Route,
  sidebarEl: HTMLElement,
  mainEl: HTMLElement,
  mobileMascotEl: HTMLElement | null,
  studySessionAccessEl: HTMLElement | null,
  renderToken: number
): Promise<void> {
  const { path, params } = route;

  renderLoadingPage(mainEl);

  await safeRenderAsync(mainEl, path, async () => {
    const curriculum = await loadCurriculum();
    if (renderToken !== routeRenderToken) return;

    const userProgress = progressStorage.getProgress();

    safeRender(sidebarEl, path, () => {
      renderSidebar(sidebarEl, path, curriculum, userProgress.subjects);
    });

    if (mobileMascotEl) {
      renderMobileHeaderMascot(mobileMascotEl, path);
    }

    if (studySessionAccessEl) {
      safeRender(studySessionAccessEl, path, () => {
        renderStudySessionAccess(studySessionAccessEl, path, curriculum);
      });
    }

    if (path === '/' || path === '') {
      const { renderHomePage } = await import('./pages/home');
      if (renderToken !== routeRenderToken) return;
      renderHomePage(mainEl, curriculum);
    } else if (path === '/curriculum') {
      const { renderCurriculumPage } = await import('./pages/curriculum');
      if (renderToken !== routeRenderToken) return;
      renderCurriculumPage(mainEl, curriculum);
    } else if (path === '/progress') {
      const { renderProgressPage } = await import('./pages/progress');
      if (renderToken !== routeRenderToken) return;
      renderProgressPage(mainEl, curriculum);
    } else if (path === '/study-session') {
      const { renderStudySessionPage } = await import('./pages/study-session');
      if (renderToken !== routeRenderToken) return;
      renderStudySessionPage(mainEl, curriculum);
    } else if (path === '/settings') {
      const { renderSettingsPage } = await import('./pages/settings');
      if (renderToken !== routeRenderToken) return;
      renderSettingsPage(mainEl);
    } else if (path === '/export') {
      const [{ renderExportPage }, assessments] = await Promise.all([
        import('./pages/export'),
        loadAllAssessments(),
      ]);
      if (renderToken !== routeRenderToken) return;
      renderExportPage(mainEl, curriculum, assessments.quizzes, assessments.exercises, assessments.projects);
    } else if (path === '/timeline') {
      const { renderTimelinePage } = await import('./pages/timeline');
      if (renderToken !== routeRenderToken) return;
      renderTimelinePage(mainEl, curriculum);
    } else if (path === '/course-builder') {
      const { renderCourseBuilderPage } = await import('./pages/course-builder');
      if (renderToken !== routeRenderToken) return;
      renderCourseBuilderPage(mainEl, curriculum);
    } else if (path.startsWith('/subject/')) {
      const subjectId = params.id;
      const assessments = await loadSubjectAssessments(subjectId);
      if (renderToken !== routeRenderToken) return;

      if (mobileMascotEl) {
        renderMobileHeaderMascot(mobileMascotEl, path, assessments.exercises);
      }

      if (params.quizId) {
        const { renderQuizPage } = await import('./pages/quiz-page.tsx');
        if (renderToken !== routeRenderToken) return;
        renderQuizPage(mainEl, curriculum, assessments.quizzes, subjectId, params.quizId, assessments.exercises, assessments.exams, assessments.projects);
      } else if (params.examId) {
        const { renderExamPage } = await import('./pages/exam-page.tsx');
        if (renderToken !== routeRenderToken) return;
        renderExamPage(mainEl, curriculum, assessments.exams, subjectId, params.examId, assessments.quizzes, assessments.exercises, assessments.projects);
      } else if (params.exId) {
        const { renderExercisePage } = await import('./pages/exercise-page.tsx');
        if (renderToken !== routeRenderToken) return;
        renderExercisePage(mainEl, curriculum, assessments.exercises, subjectId, params.exId, assessments.quizzes, assessments.exams, assessments.projects);
      } else if (params.projId) {
        const { renderProjectPage } = await import('./pages/project-page');
        if (renderToken !== routeRenderToken) return;
        renderProjectPage(mainEl, curriculum, assessments.projects, subjectId, params.projId);
      } else {
        const { renderSubjectPage } = await import('./pages/subject');
        if (renderToken !== routeRenderToken) return;
        renderSubjectPage(
          mainEl,
          curriculum,
          subjectId,
          params.topicId,
          assessments.projects,
          assessments.exams,
          params.subtopicSlug,
          assessments.quizzes,
          assessments.exercises
        );
      }
    }
  });
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
  const bottomNav = document.getElementById('mobile-bottom-nav');

  if (!hamburgerBtn || !sidebar || !overlay) {
    return;
  }

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  let lastFocusedElement: HTMLElement | null = null;

  const openMenu = () => {
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const firstFocusable = sidebar.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();
  };

  const closeMenu = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocusedElement?.focus();
    lastFocusedElement = null;
  };

  const updateBottomNav = () => {
    if (!bottomNav) return;
    const currentPath = window.location.hash.replace(/^#/, '') || '/';
    bottomNav.querySelectorAll<HTMLElement>('.mobile-bottom-nav-link').forEach((link) => {
      const route = link.dataset.route || '/';
      const isActive = route === '/'
        ? currentPath === '/' || currentPath === ''
        : currentPath === route || currentPath.startsWith(`${route}/`);
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  sidebar.setAttribute('aria-hidden', 'true');
  updateBottomNav();

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
      return;
    }

    if (e.key === 'Tab' && sidebar.classList.contains('open')) {
      const focusable = Array.from(sidebar.querySelectorAll<HTMLElement>(focusableSelector))
        .filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
      setTimeout(closeMenu, MENU_CLOSE_DELAY_MS);
    }
  });

  window.addEventListener('hashchange', () => {
    updateBottomNav();
    if (sidebar.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close menu on window resize if becoming desktop
  let resizeTimer: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (window.innerWidth > MOBILE_BREAKPOINT_PX && sidebar.classList.contains('open')) {
        closeMenu();
      }
    }, RESIZE_DEBOUNCE_MS);
  });
}

/**
 * Hide mobile navigation chrome while scrolling down so reading content has more room.
 */
function initMobileScrollChrome(): void {
  let lastScrollY = window.scrollY;
  let ticking = false;

  const showChrome = () => {
    document.body.classList.remove('mobile-chrome-hidden');
  };

  const updateChrome = () => {
    ticking = false;

    if (window.innerWidth > MOBILE_BREAKPOINT_PX) {
      showChrome();
      lastScrollY = window.scrollY;
      return;
    }

    const currentScrollY = Math.max(0, window.scrollY);
    const delta = currentScrollY - lastScrollY;
    const sidebarOpen = document.getElementById('sidebar')?.classList.contains('open') ?? false;
    const subjectMenuOpen = document.getElementById('subject-mobile-nav-panel')?.classList.contains('open') ?? false;

    if (sidebarOpen || subjectMenuOpen || currentScrollY <= MOBILE_CHROME_TOP_THRESHOLD_PX) {
      showChrome();
    } else if (delta > MOBILE_CHROME_SCROLL_DELTA_PX) {
      document.body.classList.add('mobile-chrome-hidden');
    } else if (delta < -MOBILE_CHROME_SCROLL_DELTA_PX) {
      showChrome();
    }

    lastScrollY = currentScrollY;
  };

  const requestChromeUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateChrome);
  };

  window.addEventListener('scroll', requestChromeUpdate, { passive: true });
  window.addEventListener('resize', requestChromeUpdate);
  window.addEventListener('hashchange', () => {
    showChrome();
    lastScrollY = window.scrollY;
  });
}

// Initialize the application
async function initApp(): Promise<void> {
  registerPwa();

  // Initialize theme first to prevent flash of wrong theme
  initTheme();
  initMobileScrollChrome();

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
  const mobileMascotEl = document.getElementById('mobile-mascot');
  const studySessionAccessEl = document.getElementById('study-session-access');

  if (!sidebarEl || !mainEl) {
    console.error('Required DOM elements not found');
    return;
  }

  // Set up route change handler
  onRouteChange((route) => {
    routeRenderToken++;
    void renderRoute(route, sidebarEl, mainEl, mobileMascotEl, studySessionAccessEl, routeRenderToken);
  });

  window.addEventListener(PROGRESS_UPDATED_EVENT, () => {
    refreshStudySessionAccess(studySessionAccessEl);
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
