// Quiz page rendering
import type { Subject, Quiz } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';
import { renderNotFound, formatDate } from './assessment-utils';

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

  attachQuizEventListeners(container, subjectId);
}

/**
 * Attach event listeners for quiz page
 */
function attachQuizEventListeners(container: HTMLElement, subjectId: string): void {
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
