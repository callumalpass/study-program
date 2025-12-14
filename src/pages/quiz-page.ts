// Quiz page rendering
import type { Subject, Quiz } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';
import { renderQuiz } from '@/components/quiz';
import { renderNotFound, formatDate } from './assessment-utils';

function getQuizStartTemplate(quiz: Quiz, attemptsCount: number): string {
  return `
    <div class="quiz-start">
      <h2>Ready to ${attemptsCount > 0 ? 'try again' : 'start'}?</h2>
      <p>This quiz contains ${quiz.questions.length} questions. Take your time and good luck!</p>
      <button class="btn btn-primary btn-large" id="start-quiz-btn">
        ${attemptsCount > 0 ? 'Start New Attempt' : 'Start Quiz'}
      </button>
    </div>
  `;
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
        <div id="quiz-container">${getQuizStartTemplate(quiz, attempts.length)}</div>
      </section>

      <div class="quiz-actions">
        <button class="btn btn-secondary" id="restart-quiz-btn" style="display: ${attempts.length > 0 ? 'inline-flex' : 'none'}">
          ${Icons.Refresh} Retry Quiz
        </button>
        <button class="btn btn-secondary" id="back-to-subject">
          ${Icons.ChevronLeft} Back to Subject
        </button>
      </div>
    </div>
  `;

  attachQuizEventListeners(container, subjectId, quiz);
}

/**
 * Attach event listeners for quiz page
 */
function attachQuizEventListeners(container: HTMLElement, subjectId: string, quiz: Quiz): void {
  const backBtn = container.querySelector('#back-to-subject');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateToSubject(subjectId));
  }

  wireStartButton(container, subjectId, quiz);

  const restartBtn = container.querySelector('#restart-quiz-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => resetQuiz(container, subjectId, quiz));
  }
}

function wireStartButton(container: HTMLElement, subjectId: string, quiz: Quiz): void {
  const startBtn = container.querySelector('#start-quiz-btn');
  if (!startBtn) return;

  startBtn.addEventListener('click', () => startQuizAttempt(container, subjectId, quiz));
}

function startQuizAttempt(container: HTMLElement, subjectId: string, quiz: Quiz): void {
  const quizContainer = container.querySelector('#quiz-container');
  if (!quizContainer) return;

  // Clear start prompt and render interactive quiz
  quizContainer.innerHTML = '';
  renderQuiz(quizContainer as HTMLElement, quiz, (attempt) => {
    progressStorage.addQuizAttempt(subjectId, quiz.id, attempt);
    handleQuizCompletion(container, subjectId, quiz);
  });
}

function handleQuizCompletion(container: HTMLElement, subjectId: string, quiz: Quiz): void {
  const attempts = progressStorage.getQuizAttempts(subjectId, quiz.id);

  updateBestScore(container, attempts);
  updateAttemptsSection(container, attempts);
  updateQuizInfo(container, quiz, attempts.length);

  const restartBtn = container.querySelector('#restart-quiz-btn') as HTMLElement | null;
  if (restartBtn) {
    restartBtn.style.display = 'inline-flex';
  }
}

function resetQuiz(container: HTMLElement, subjectId: string, quiz: Quiz): void {
  const quizContainer = container.querySelector('#quiz-container');
  if (!quizContainer) return;

  const attempts = progressStorage.getQuizAttempts(subjectId, quiz.id);
  quizContainer.innerHTML = getQuizStartTemplate(quiz, attempts.length);
  wireStartButton(container, subjectId, quiz);
  quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateBestScore(container: HTMLElement, attempts: ReturnType<typeof progressStorage.getQuizAttempts>): void {
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

function updateAttemptsSection(container: HTMLElement, attempts: ReturnType<typeof progressStorage.getQuizAttempts>): void {
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

function updateQuizInfo(container: HTMLElement, quiz: Quiz, attemptsCount: number): void {
  const infoEl = container.querySelector('.quiz-info');
  if (!infoEl) return;

  infoEl.innerHTML = `
    <span class="info-item">
      <span class="icon">${Icons.Help}</span>
      ${quiz.questions.length} questions
    </span>
    ${attemptsCount > 0 ? `
      <span class="info-item">
        <span class="icon">${Icons.Refresh}</span>
        ${attemptsCount} attempt${attemptsCount > 1 ? 's' : ''}
      </span>
    ` : ''}
  `;
}
