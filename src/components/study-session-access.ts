import { Icons } from './icons';
import type { Subject } from '@/core/types';
import { progressStorage } from '@/core/storage';
import {
  advanceStudySession,
  createStudySessionHistoryEntry,
  getActiveStudySession,
  getCurrentStudySessionItem,
  startStudySession,
  type StudySessionItem,
} from '@/core/study-session';
import { escapeHtml } from '@/utils/html';

function getScopedSubjects(subjects: Subject[]): Subject[] {
  const selectedIds = progressStorage.getSelectedSubjects();
  return selectedIds.length > 0
    ? subjects.filter(subject => selectedIds.includes(subject.id))
    : subjects;
}

function getItemIcon(item: StudySessionItem): string {
  switch (item.itemType) {
    case 'read':
      return Icons.BookOpen || Icons.Curriculum;
    case 'exercise':
      return Icons.StatCode;
    case 'project':
      return Icons.StatProject;
    case 'quiz':
    case 'review':
    case 'exam':
      return Icons.StatQuiz;
    default:
      return Icons.Progress;
  }
}

const DISMISS_KEY = 'study_session_access_dismissed_for';

function isDismissedForPath(path: string): boolean {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem(DISMISS_KEY) === path;
}

function setDismissedForPath(path: string): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(DISMISS_KEY, path);
}

function clearDismissedForPath(): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(DISMISS_KEY);
}

function renderActiveSessionAccess(
  container: HTMLElement,
  item: StudySessionItem,
  completed: number,
  total: number,
  path: string
): void {
  container.innerHTML = `
    <aside class="study-session-access active" aria-label="Active study session">
      <a class="study-session-access-card" href="#/study-session">
        <span class="study-session-access-icon" aria-hidden="true">${getItemIcon(item)}</span>
        <span class="study-session-access-copy">
          <span class="study-session-access-kicker">Study session · ${completed}/${total}</span>
          <span class="study-session-access-title">${escapeHtml(item.title)}</span>
          <span class="study-session-access-context">${escapeHtml(item.context)}</span>
        </span>
        <span class="study-session-access-action">
          <span>Open</span>
          ${Icons.ArrowRight}
        </span>
      </a>
      <button
        class="study-session-access-dismiss"
        type="button"
        aria-label="Hide study session card"
      >${Icons.Cross || '×'}</button>
    </aside>
  `;

  container.querySelector('.study-session-access-dismiss')?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDismissedForPath(path);
    container.innerHTML = '';
  });
}

function renderStartSessionAccess(container: HTMLElement, subjects: Subject[]): void {
  container.innerHTML = `
    <aside class="study-session-access idle" aria-label="Study session access">
      <button class="study-session-access-card" type="button" id="global-start-study-session">
        <span class="study-session-access-icon" aria-hidden="true">${Icons.Progress}</span>
        <span class="study-session-access-copy">
          <span class="study-session-access-kicker">Study session</span>
          <span class="study-session-access-title">Start a guided queue</span>
        </span>
        <span class="study-session-access-action">
          <span>Start</span>
          ${Icons.ArrowRight}
        </span>
      </button>
    </aside>
  `;

  container.querySelector('#global-start-study-session')?.addEventListener('click', () => {
    startStudySession(getScopedSubjects(subjects), progressStorage.getProgress());
    window.location.hash = '#/study-session';
  });
}

export function renderStudySessionAccess(container: HTMLElement, path: string, subjects: Subject[]): void {
  if (path === '/study-session') {
    clearDismissedForPath();
    container.innerHTML = '';
    return;
  }

  if (isDismissedForPath(path)) {
    container.innerHTML = '';
    return;
  }
  clearDismissedForPath();

  const progress = progressStorage.getProgress();
  const session = getActiveStudySession();

  if (session) {
    const advancedSession = advanceStudySession(session, progress);
    const currentItem = getCurrentStudySessionItem(advancedSession);

    if (currentItem) {
      renderActiveSessionAccess(
        container,
        currentItem,
        advancedSession.completedItemIds.length,
        advancedSession.queue.length,
        path
      );
      return;
    }

    progressStorage.recordStudySessionCompletion(createStudySessionHistoryEntry(advancedSession, progress));
  }

  renderStartSessionAccess(container, subjects);
}
