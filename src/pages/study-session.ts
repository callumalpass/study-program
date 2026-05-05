import type { Subject, UserProgress } from '@/core/types';
import { progressStorage } from '@/core/storage';
import {
  advanceStudySession,
  clearStudySession,
  createStudySessionHistoryEntry,
  getDefaultStudySessionSubject,
  getActiveStudySession,
  getCurrentStudySessionItem,
  getStudySessionSummary,
  isStudySessionItemSatisfied,
  skipCurrentStudySessionItem,
  startStudySession,
  type StudySession,
  type StudySessionItem,
} from '@/core/study-session';
import { Icons } from '@/components/icons';
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

function getQueueStatus(
  item: StudySessionItem,
  index: number,
  session: StudySession,
  progress: UserProgress
): 'completed' | 'current' | 'queued' {
  if (
    session.completedItemIds.includes(item.id)
    || isStudySessionItemSatisfied(item, progress, session.startedAt)
  ) {
    return 'completed';
  }

  return index === session.currentIndex ? 'current' : 'queued';
}

function renderQueueItem(
  item: StudySessionItem,
  index: number,
  session: StudySession,
  progress: UserProgress
): string {
  const status = getQueueStatus(item, index, session, progress);
  const statusLabel = status === 'completed' ? 'Done' : status === 'current' ? 'Now' : 'Next';
  const actionLabel = status === 'completed' ? 'Review' : status === 'current' ? 'Resume' : 'Open';
  const statusIcon = status === 'completed'
    ? Icons.Check
    : status === 'current'
      ? Icons.ArrowRight
      : Icons.StatusNotStarted;

  return `
    <li class="study-session-queue-item ${status}">
      <a
        class="study-session-queue-link"
        href="${escapeHtml(item.href)}"
        aria-label="${escapeHtml(`${actionLabel}: ${item.title}`)}"
      >
        <span class="queue-status" aria-label="${statusLabel}">${statusIcon}</span>
        <span class="queue-icon" aria-hidden="true">${getItemIcon(item)}</span>
        <span class="queue-copy">
          <span class="queue-title">${escapeHtml(item.title)}</span>
          <span class="queue-context">${escapeHtml(item.context)}</span>
        </span>
        <span class="queue-open" aria-hidden="true">${Icons.ArrowRight}</span>
      </a>
    </li>
  `;
}

function renderSubjectOptions(subjects: Subject[], progress: UserProgress): string {
  const defaultSubject = getDefaultStudySessionSubject(subjects, progress) || subjects[0];

  return subjects.map(subject => `
    <option value="${escapeHtml(subject.id)}" ${subject.id === defaultSubject?.id ? 'selected' : ''}>
      ${escapeHtml(`${subject.code} - ${subject.title}`)}
    </option>
  `).join('');
}

function renderStartState(container: HTMLElement, subjects: Subject[]): void {
  const scopedSubjects = getScopedSubjects(subjects);
  const progress = progressStorage.getProgress();
  const hasSubjects = scopedSubjects.length > 0;

  container.innerHTML = `
    <div class="page-container study-session-page">
      <header class="page-header">
        <div class="page-header-content">
          <h1>Study Session</h1>
          <p class="subtitle">Work through a guided queue built from your current progress.</p>
        </div>
      </header>
      <div class="page-content">
        <section class="study-session-empty">
          <div class="study-session-empty-icon">${Icons.Progress}</div>
          <h2>No active session</h2>
          <p>Start a session to combine due reviews, reading, and practice into one queue.</p>
          <form class="study-session-start-form" id="study-session-start-form">
            <div class="form-group">
              <label class="form-label" for="study-session-subject">Subject</label>
              <select class="form-select" id="study-session-subject" ${hasSubjects ? '' : 'disabled'}>
                ${hasSubjects
                  ? renderSubjectOptions(scopedSubjects, progress)
                  : '<option value="">No subjects available</option>'}
              </select>
              <span class="form-error" id="study-session-start-error" hidden></span>
            </div>
            <div class="study-session-start-actions">
              <button class="btn btn-primary" id="start-study-session" type="submit" ${hasSubjects ? '' : 'disabled'}>Start Study Session</button>
              <a class="btn btn-secondary" href="#/">Back to Dashboard</a>
            </div>
          </form>
        </section>
      </div>
    </div>
  `;

  const form = container.querySelector<HTMLFormElement>('#study-session-start-form');
  const subjectSelect = container.querySelector<HTMLSelectElement>('#study-session-subject');
  const error = container.querySelector<HTMLElement>('#study-session-start-error');

  subjectSelect?.addEventListener('change', () => {
    if (!error) return;
    error.hidden = true;
    error.textContent = '';
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const subjectId = subjectSelect?.value;
    if (!subjectId) return;

    const session = startStudySession(
      getScopedSubjects(subjects),
      progressStorage.getProgress(),
      { subjectId }
    );

    if (!session) {
      if (error) {
        error.textContent = 'No queued study items for this subject right now.';
        error.hidden = false;
      }
      return;
    }

    renderStudySessionPage(container, subjects);
  });
}

function renderEndState(container: HTMLElement, subjects: Subject[], session: StudySession, progress: UserProgress): void {
  const summary = getStudySessionSummary(session, progress);

  container.innerHTML = `
    <div class="page-container study-session-page">
      <header class="page-header">
        <div class="page-header-content">
          <h1>Study Session Complete</h1>
          <p class="subtitle">${escapeHtml(session.subjectCode)} session summary.</p>
        </div>
      </header>
      <div class="page-content">
        <section class="study-session-complete">
          <div class="study-session-complete-icon">${Icons.Check}</div>
          <h2>Session finished</h2>
          <div class="study-session-summary-grid">
            <div class="summary-stat">
              <span class="summary-value">${summary.sectionsCompleted}</span>
              <span class="summary-label">sections completed</span>
            </div>
            <div class="summary-stat">
              <span class="summary-value">${summary.quizzesAttempted}</span>
              <span class="summary-label">quizzes attempted</span>
            </div>
            <div class="summary-stat">
              <span class="summary-value">${summary.quizzesPassed}</span>
              <span class="summary-label">quizzes passed</span>
            </div>
            <div class="summary-stat">
              <span class="summary-value">${summary.exercisesPassed}</span>
              <span class="summary-label">exercises passed</span>
            </div>
            <div class="summary-stat">
              <span class="summary-value">${summary.reviewItemsCompleted}</span>
              <span class="summary-label">reviews completed</span>
            </div>
          </div>
          <div class="study-session-actions">
            <button class="btn btn-primary" id="start-new-study-session">Start New Session</button>
            <a class="btn btn-secondary" href="#/">Back to Dashboard</a>
          </div>
        </section>
      </div>
    </div>
  `;

  container.querySelector('#start-new-study-session')?.addEventListener('click', () => {
    clearStudySession();
    renderStartState(container, subjects);
  });
}

function renderActiveState(
  container: HTMLElement,
  subjects: Subject[],
  session: StudySession,
  currentItem: StudySessionItem,
  progress: UserProgress
): void {
  const completedCount = session.completedItemIds.length;
  const remainingCount = session.queue.length - session.currentIndex;
  const canSkip = remainingCount > 1;

  container.innerHTML = `
    <div class="page-container study-session-page">
      <header class="page-header">
        <div class="page-header-content">
          <h1>Study Session: ${escapeHtml(session.subjectCode)}</h1>
          <p class="subtitle">${completedCount} / ${session.queue.length} complete</p>
        </div>
        <div class="page-header-actions">
          <button class="btn btn-secondary" id="end-study-session">End Session</button>
        </div>
      </header>

      <div class="page-content">
        <section class="study-session-current">
          <div class="study-session-current-icon">${getItemIcon(currentItem)}</div>
          <div class="study-session-current-copy">
            <span class="study-session-phase">${escapeHtml(currentItem.phase)}</span>
            <h2>${escapeHtml(currentItem.title)}</h2>
            <p>${escapeHtml(currentItem.context)}</p>
            <span class="study-session-rationale">${escapeHtml(currentItem.rationale)}</span>
          </div>
          <div class="study-session-current-actions">
            <a class="btn btn-primary study-session-current-cta" href="${escapeHtml(currentItem.href)}">Continue</a>
            ${canSkip ? `<button class="btn btn-secondary study-session-skip" type="button" id="skip-study-session-item">Skip for now</button>` : ''}
          </div>
        </section>

        <section class="study-session-queue">
          <h2>Queue</h2>
          <ol>
            ${session.queue.map((item, index) => renderQueueItem(item, index, session, progress)).join('')}
          </ol>
        </section>
      </div>
    </div>
  `;

  container.querySelector('#end-study-session')?.addEventListener('click', () => {
    const remaining = session.queue.length - session.completedItemIds.length;
    const message = remaining > 0
      ? `End this session? ${remaining} item${remaining === 1 ? '' : 's'} still in your queue.`
      : 'End this session?';
    if (!window.confirm(message)) return;
    clearStudySession();
    window.location.hash = '#/';
  });

  container.querySelector('#skip-study-session-item')?.addEventListener('click', () => {
    skipCurrentStudySessionItem(session);
    renderStudySessionPage(container, subjects);
  });
}

export function renderStudySessionPage(container: HTMLElement, subjects: Subject[]): void {
  const scopedSubjects = getScopedSubjects(subjects);
  let progress = progressStorage.getProgress();
  let session = getActiveStudySession();

  if (!session) {
    renderStartState(container, subjects);
    return;
  }

  session = advanceStudySession(session, progress);
  progress = progressStorage.getProgress();
  const currentItem = getCurrentStudySessionItem(session);

  if (!currentItem) {
    progressStorage.recordStudySessionCompletion(createStudySessionHistoryEntry(session, progress));
    renderEndState(container, subjects, session, progress);
    return;
  }

  if (!scopedSubjects.some(subject => subject.id === currentItem.subjectId)) {
    clearStudySession();
    renderStartState(container, subjects);
    return;
  }

  renderActiveState(container, subjects, session, currentItem, progress);
}
