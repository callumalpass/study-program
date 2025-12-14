// Exam page rendering
import type { Subject, Exam } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';
import { renderQuiz } from '@/components/quiz';
import { renderNotFound, formatDate } from './assessment-utils';

function getExamStartTemplate(exam: Exam, attemptsCount: number): string {
  return `
    <div class="quiz-start">
      <h2>${attemptsCount > 0 ? 'Ready for another attempt?' : 'Ready to start the exam?'}</h2>
      <p>${exam.instructions?.[0] || 'This is a timed assessment. Answer carefully before submitting.'}</p>
      <button class="btn btn-primary btn-large" id="start-exam-btn">
        ${attemptsCount > 0 ? 'Start New Attempt' : 'Start Exam'}
      </button>
    </div>
  `;
}

export function renderExamPage(
  container: HTMLElement,
  subjects: Subject[],
  exams: Exam[],
  subjectId: string,
  examId: string
): void {
  const subject = subjects.find(s => s.id === subjectId);
  const exam = exams.find(e => e.id === examId);

  if (!subject || !exam) {
    renderNotFound(container, 'Exam', subjectId);
    return;
  }

  const attempts = progressStorage.getExamAttempts(subjectId, examId);
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
        <span class="current">${exam.title}</span>
      </nav>

      <header class="quiz-header">
        <div class="quiz-title-section">
          <h1>${exam.title}</h1>
          ${bestAttempt ? `
            <div class="best-score">
              <span class="label">Best Score:</span>
              <span class="score ${bestAttempt.score >= 70 ? 'passed' : 'failed'}">${bestAttempt.score}%</span>
            </div>
          ` : ''}
        </div>
        <div class="quiz-info">
          <span class="info-item">
            <span class="icon">${Icons.Progress}</span>
            ${exam.questions.length} questions
          </span>
          ${exam.durationMinutes ? `
            <span class="info-item">
              <span class="icon">${Icons.StatusInProgress}</span>
              ~${exam.durationMinutes} min
            </span>
          ` : ''}
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
        <div id="quiz-container">${getExamStartTemplate(exam, attempts.length)}</div>
      </section>

      <div class="quiz-actions">
        <button class="btn btn-secondary" id="restart-exam-btn" style="display: ${attempts.length > 0 ? 'inline-flex' : 'none'}">
          ${Icons.Refresh} Retry Exam
        </button>
        <button class="btn btn-secondary" id="back-to-subject">
          ${Icons.ChevronLeft} Back to Subject
        </button>
      </div>
    </div>
  `;

  attachExamEventListeners(container, subjectId, exam);
}

function attachExamEventListeners(container: HTMLElement, subjectId: string, exam: Exam): void {
  const backBtn = container.querySelector('#back-to-subject');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateToSubject(subjectId));
  }

  wireStartButton(container, subjectId, exam);

  const restartBtn = container.querySelector('#restart-exam-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => resetExam(container, subjectId, exam));
  }
}

function wireStartButton(container: HTMLElement, subjectId: string, exam: Exam): void {
  const startBtn = container.querySelector('#start-exam-btn');
  if (!startBtn) return;

  startBtn.addEventListener('click', () => startExamAttempt(container, subjectId, exam));
}

function startExamAttempt(container: HTMLElement, subjectId: string, exam: Exam): void {
  const quizContainer = container.querySelector('#quiz-container');
  if (!quizContainer) return;

  quizContainer.innerHTML = '';
  renderQuiz(quizContainer as HTMLElement, exam, (attempt) => {
    progressStorage.addExamAttempt(subjectId, exam.id, attempt);
    handleExamCompletion(container, subjectId, exam);
  }, {
    oneAtATime: true,
    durationMinutes: exam.durationMinutes,
    isExam: true,
    subjectId,
    examId: exam.id,
  });
}

function handleExamCompletion(container: HTMLElement, subjectId: string, exam: Exam): void {
  const attempts = progressStorage.getExamAttempts(subjectId, exam.id);

  updateBestScore(container, attempts);
  updateAttemptsSection(container, attempts);
  updateExamInfo(container, exam, attempts.length);

  const restartBtn = container.querySelector('#restart-exam-btn') as HTMLElement | null;
  if (restartBtn) {
    restartBtn.style.display = 'inline-flex';
  }
}

function resetExam(container: HTMLElement, subjectId: string, exam: Exam): void {
  const quizContainer = container.querySelector('#quiz-container');
  if (!quizContainer) return;

  const attempts = progressStorage.getExamAttempts(subjectId, exam.id);
  quizContainer.innerHTML = getExamStartTemplate(exam, attempts.length);
  wireStartButton(container, subjectId, exam);
  quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateBestScore(container: HTMLElement, attempts: ReturnType<typeof progressStorage.getExamAttempts>): void {
  const bestAttempt = attempts.length > 0
    ? attempts.reduce((best, current) => current.score > best.score ? current : best)
    : null;

  const titleSection = container.querySelector('.quiz-title-section');
  if (!titleSection) return;

  let bestScoreEl = titleSection.querySelector('.best-score') as HTMLElement | null;

  if (!bestAttempt) {
    if (bestScoreEl) {
      bestScoreEl.remove();
    }
    return;
  }

  if (!bestScoreEl) {
    bestScoreEl = document.createElement('div');
    bestScoreEl.className = 'best-score';
    titleSection.appendChild(bestScoreEl);
  }

  const passedClass = bestAttempt.score >= 70 ? 'passed' : 'failed';
  bestScoreEl.innerHTML = `
    <span class="label">Best Score:</span>
    <span class="score ${passedClass}">${bestAttempt.score}%</span>
  `;
}

function updateAttemptsSection(container: HTMLElement, attempts: ReturnType<typeof progressStorage.getExamAttempts>): void {
  const existingSection = container.querySelector('.previous-attempts');
  if (attempts.length === 0) {
    if (existingSection) {
      existingSection.remove();
    }
    return;
  }

  const sectionContent = `
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
  `;

  if (existingSection) {
    existingSection.innerHTML = sectionContent;
    return;
  }

  const section = document.createElement('section');
  section.className = 'previous-attempts';
  section.innerHTML = sectionContent;

  const quizContent = container.querySelector('.quiz-content');
  if (quizContent && quizContent.parentElement) {
    quizContent.parentElement.insertBefore(section, quizContent);
  }
}

function updateExamInfo(container: HTMLElement, exam: Exam, attemptsCount: number): void {
  const infoEl = container.querySelector('.quiz-info');
  if (!infoEl) return;

  infoEl.innerHTML = `
    <span class="info-item">
      <span class="icon">${Icons.Progress}</span>
      ${exam.questions.length} questions
    </span>
    ${exam.durationMinutes ? `
      <span class="info-item">
        <span class="icon">${Icons.StatusInProgress}</span>
        ~${exam.durationMinutes} min
      </span>
    ` : ''}
    ${attemptsCount > 0 ? `
      <span class="info-item">
        <span class="icon">${Icons.Refresh}</span>
        ${attemptsCount} attempt${attemptsCount > 1 ? 's' : ''}
      </span>
    ` : ''}
  `;
}
