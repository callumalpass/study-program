// Exam page rendering
import type { Subject, Exam, QuizQuestion } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';
import { renderQuiz, createQuestionElement, collectAnswer, checkAnswer } from '@/components/quiz';
import { renderNotFound, formatDate } from './assessment-utils';
import { generatePracticeQuestion, evaluateWrittenExercise } from '@/utils/gemini-eval';
import { runTests } from '@/components/code-runner';

// Practice mode state
interface PracticeState {
  active: boolean;
  currentQuestion: QuizQuestion | null;
  previousQuestions: QuizQuestion[];
  questionCount: number;
  isLoading: boolean;
  hasAnswered: boolean;
  lastAnswer: any;
  isEvaluating: boolean;
}

function getExamStartTemplate(exam: Exam, attemptsCount: number, hasApiKey: boolean): string {
  return `
    <div class="quiz-start">
      <h2>${attemptsCount > 0 ? 'Ready for another attempt?' : 'Ready to start the exam?'}</h2>
      <p>${exam.instructions?.[0] || 'This is a timed assessment. Answer carefully before submitting.'}</p>
      <div class="exam-start-buttons">
        <button class="btn btn-primary btn-large" id="start-exam-btn">
          ${attemptsCount > 0 ? 'Start New Attempt' : 'Start Exam'}
        </button>
        <button class="btn btn-secondary btn-large" id="start-practice-btn" ${!hasApiKey ? 'disabled title="Configure Gemini API key in Settings to use Practice Mode"' : ''}>
          ${Icons.Beaker} Practice Mode
        </button>
      </div>
      ${!hasApiKey ? '<p class="form-hint">Practice Mode requires a Gemini API key. <a href="#/settings">Configure in Settings</a></p>' : ''}
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
  const hasApiKey = !!progressStorage.getSettings().geminiApiKey;

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
        <div id="quiz-container">${getExamStartTemplate(exam, attempts.length, hasApiKey)}</div>
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

  attachExamEventListeners(container, subject, exam);
}

function attachExamEventListeners(container: HTMLElement, subject: Subject, exam: Exam): void {
  const backBtn = container.querySelector('#back-to-subject');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateToSubject(subject.id));
  }

  wireStartButton(container, subject.id, exam);
  wirePracticeButton(container, subject, exam);

  const restartBtn = container.querySelector('#restart-exam-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => resetExam(container, subject, exam));
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

function resetExam(container: HTMLElement, subject: Subject, exam: Exam): void {
  const quizContainer = container.querySelector('#quiz-container');
  if (!quizContainer) return;

  const attempts = progressStorage.getExamAttempts(subject.id, exam.id);
  const hasApiKey = !!progressStorage.getSettings().geminiApiKey;
  quizContainer.innerHTML = getExamStartTemplate(exam, attempts.length, hasApiKey);
  wireStartButton(container, subject.id, exam);
  wirePracticeButton(container, subject, exam);
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

// ============================================
// Practice Mode Functions
// ============================================

function wirePracticeButton(container: HTMLElement, subject: Subject, exam: Exam): void {
  const practiceBtn = container.querySelector('#start-practice-btn');
  if (!practiceBtn) return;

  practiceBtn.addEventListener('click', () => {
    const state: PracticeState = {
      active: true,
      currentQuestion: null,
      previousQuestions: [],
      questionCount: 0,
      isLoading: false,
      hasAnswered: false,
      lastAnswer: undefined,
      isEvaluating: false,
    };
    startPracticeMode(container, subject, exam, state);
  });
}

function startPracticeMode(
  container: HTMLElement,
  subject: Subject,
  exam: Exam,
  state: PracticeState
): void {
  const quizContainer = container.querySelector('#quiz-container');
  if (!quizContainer) return;

  // Hide the restart button during practice mode
  const restartBtn = container.querySelector('#restart-exam-btn') as HTMLElement | null;
  if (restartBtn) {
    restartBtn.style.display = 'none';
  }

  renderPracticeMode(quizContainer as HTMLElement, subject, exam, state);
  generateNextQuestion(quizContainer as HTMLElement, subject, exam, state);
}

function renderPracticeMode(
  quizContainer: HTMLElement,
  subject: Subject,
  exam: Exam,
  state: PracticeState
): void {
  quizContainer.innerHTML = `
    <div class="practice-mode">
      <div class="practice-header">
        <span class="practice-badge">${Icons.Beaker} Practice Mode</span>
        <span class="practice-count">Question ${state.questionCount + 1}</span>
        <button class="btn btn-ghost btn-small" id="exit-practice-btn">
          ${Icons.Cross} Exit Practice
        </button>
      </div>
      <div id="practice-question-container">
        ${state.isLoading ? getPracticeLoadingTemplate() : ''}
      </div>
      <div id="practice-actions" style="display: none;">
        <button class="btn btn-primary" id="check-practice-btn">Check Answer</button>
      </div>
      <div id="practice-feedback" style="display: none;"></div>
      <div id="practice-next-actions" style="display: none;">
        <button class="btn btn-primary" id="next-practice-btn">Generate Another</button>
        <button class="btn btn-secondary" id="exit-practice-btn-2">Exit Practice</button>
      </div>
    </div>
  `;

  // Wire up exit buttons
  const exitBtns = quizContainer.querySelectorAll('#exit-practice-btn, #exit-practice-btn-2');
  exitBtns.forEach(btn => {
    btn.addEventListener('click', () => exitPracticeMode(quizContainer, subject, exam));
  });
}

function getPracticeLoadingTemplate(): string {
  return `
    <div class="practice-loading">
      <div class="loading-spinner"></div>
      <p>Generating practice question...</p>
    </div>
  `;
}

function exitPracticeMode(quizContainer: HTMLElement, subject: Subject, exam: Exam): void {
  const attempts = progressStorage.getExamAttempts(subject.id, exam.id);
  const hasApiKey = !!progressStorage.getSettings().geminiApiKey;
  quizContainer.innerHTML = getExamStartTemplate(exam, attempts.length, hasApiKey);

  // Re-wire buttons
  const container = quizContainer.closest('.quiz-page');
  if (container) {
    wireStartButton(container as HTMLElement, subject.id, exam);
    wirePracticeButton(container as HTMLElement, subject, exam);

    // Show restart button if there are attempts
    const restartBtn = container.querySelector('#restart-exam-btn') as HTMLElement | null;
    if (restartBtn && attempts.length > 0) {
      restartBtn.style.display = 'inline-flex';
    }
  }
}

async function generateNextQuestion(
  quizContainer: HTMLElement,
  subject: Subject,
  exam: Exam,
  state: PracticeState
): Promise<void> {
  state.isLoading = true;
  state.hasAnswered = false;
  state.lastAnswer = undefined;

  const questionContainer = quizContainer.querySelector('#practice-question-container');
  const actionsContainer = quizContainer.querySelector('#practice-actions') as HTMLElement;
  const feedbackContainer = quizContainer.querySelector('#practice-feedback') as HTMLElement;
  const nextActionsContainer = quizContainer.querySelector('#practice-next-actions') as HTMLElement;

  if (!questionContainer) return;

  // Show loading state
  questionContainer.innerHTML = getPracticeLoadingTemplate();
  if (actionsContainer) actionsContainer.style.display = 'none';
  if (feedbackContainer) feedbackContainer.style.display = 'none';
  if (nextActionsContainer) nextActionsContainer.style.display = 'none';

  const apiKey = progressStorage.getSettings().geminiApiKey;
  if (!apiKey) {
    questionContainer.innerHTML = `
      <div class="practice-error">
        <p>Gemini API key not configured. <a href="#/settings">Configure in Settings</a></p>
      </div>
    `;
    return;
  }

  // Pick a random question from the exam to base the practice question on
  const randomIndex = Math.floor(Math.random() * exam.questions.length);
  const originalQuestion = exam.questions[randomIndex];

  try {
    const practiceQuestion = await generatePracticeQuestion(
      apiKey,
      originalQuestion,
      `${subject.code}: ${subject.title}`,
      state.previousQuestions
    );

    state.currentQuestion = practiceQuestion;
    state.questionCount++;
    state.isLoading = false;

    // Update the question count display
    const countEl = quizContainer.querySelector('.practice-count');
    if (countEl) {
      countEl.textContent = `Question ${state.questionCount}`;
    }

    // Render the question
    const questionElement = createQuestionElement(practiceQuestion, 0, undefined, false, false);
    questionContainer.innerHTML = '';
    questionContainer.appendChild(questionElement);

    // Show check button
    if (actionsContainer) {
      actionsContainer.style.display = 'flex';

      // Wire up check button
      const checkBtn = actionsContainer.querySelector('#check-practice-btn');
      if (checkBtn) {
        // Remove old listener by cloning
        const newCheckBtn = checkBtn.cloneNode(true);
        checkBtn.parentNode?.replaceChild(newCheckBtn, checkBtn);
        newCheckBtn.addEventListener('click', () => {
          checkPracticeAnswer(quizContainer, subject, exam, state);
        });
      }
    }

    // Wire up next button
    const nextBtn = quizContainer.querySelector('#next-practice-btn');
    if (nextBtn) {
      const newNextBtn = nextBtn.cloneNode(true);
      nextBtn.parentNode?.replaceChild(newNextBtn, nextBtn);
      newNextBtn.addEventListener('click', () => {
        generateNextQuestion(quizContainer, subject, exam, state);
      });
    }

  } catch (error) {
    state.isLoading = false;
    questionContainer.innerHTML = `
      <div class="practice-error">
        <p>Failed to generate practice question: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button class="btn btn-secondary" id="retry-generate-btn">Try Again</button>
      </div>
    `;

    const retryBtn = questionContainer.querySelector('#retry-generate-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        generateNextQuestion(quizContainer, subject, exam, state);
      });
    }
  }
}

async function checkPracticeAnswer(
  quizContainer: HTMLElement,
  subject: Subject,
  exam: Exam,
  state: PracticeState
): Promise<void> {
  if (!state.currentQuestion || state.hasAnswered) return;

  const questionContainer = quizContainer.querySelector('#practice-question-container');
  const questionElement = questionContainer?.querySelector('.quiz-question') as HTMLElement;
  const actionsContainer = quizContainer.querySelector('#practice-actions') as HTMLElement;
  const feedbackContainer = quizContainer.querySelector('#practice-feedback') as HTMLElement;
  const nextActionsContainer = quizContainer.querySelector('#practice-next-actions') as HTMLElement;

  if (!questionElement) return;

  // Collect the answer
  const answer = collectAnswer(questionElement, state.currentQuestion);
  state.lastAnswer = answer;
  state.hasAnswered = true;

  // Hide check button
  if (actionsContainer) actionsContainer.style.display = 'none';

  // Handle different question types
  const question = state.currentQuestion;

  if (question.type === 'written') {
    // Written questions need AI evaluation
    await evaluateWrittenAnswer(quizContainer, state, feedbackContainer, nextActionsContainer);
  } else if (question.type === 'coding') {
    // Coding questions need to run tests
    await evaluateCodingAnswer(quizContainer, state, feedbackContainer, nextActionsContainer);
  } else {
    // Other question types can be checked directly
    const isCorrect = checkAnswer(question, answer);
    renderPracticeFeedback(feedbackContainer, nextActionsContainer, isCorrect, question, answer);
  }

  // Add to previous questions for context
  state.previousQuestions.push(state.currentQuestion);
  // Keep only last 5 questions to avoid context overflow
  if (state.previousQuestions.length > 5) {
    state.previousQuestions.shift();
  }
}

async function evaluateWrittenAnswer(
  quizContainer: HTMLElement,
  state: PracticeState,
  feedbackContainer: HTMLElement,
  nextActionsContainer: HTMLElement
): Promise<void> {
  const question = state.currentQuestion;
  const answer = state.lastAnswer;

  if (!question || !answer) {
    renderPracticeFeedback(feedbackContainer, nextActionsContainer, false, question!, answer);
    return;
  }

  state.isEvaluating = true;

  // Show loading state
  feedbackContainer.innerHTML = `
    <div class="practice-evaluating">
      <div class="loading-spinner"></div>
      <p>Evaluating your answer...</p>
    </div>
  `;
  feedbackContainer.style.display = 'block';

  const apiKey = progressStorage.getSettings().geminiApiKey;
  if (!apiKey) {
    feedbackContainer.innerHTML = `
      <div class="practice-error">
        <p>Cannot evaluate: Gemini API key not configured.</p>
      </div>
    `;
    nextActionsContainer.style.display = 'flex';
    return;
  }

  try {
    const modelAnswer = question.modelAnswer || question.explanation;
    const result = await evaluateWrittenExercise(apiKey, question.prompt, modelAnswer, answer);

    state.isEvaluating = false;

    const passedClass = result.passed ? 'passed' : 'not-passed';
    const passedIcon = result.passed ? Icons.Check : Icons.Cross;
    const passedText = result.passed ? 'Passed' : 'Needs Work';

    feedbackContainer.innerHTML = `
      <div class="feedback ${result.passed ? 'correct' : 'incorrect'}">
        <div class="feedback-header">
          ${passedIcon} ${passedText} (Score: ${result.score}/100)
        </div>
        <div class="ai-evaluation-content">
          <div class="evaluation-result ${passedClass}">
            <div class="result-feedback">
              <p>${result.feedback}</p>
            </div>
            ${result.strengths.length > 0 ? `
              <div class="result-section strengths">
                <h4>Strengths</h4>
                <ul>
                  ${result.strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            ${result.improvements.length > 0 ? `
              <div class="result-section improvements">
                <h4>Suggestions for Improvement</h4>
                <ul>
                  ${result.improvements.map(i => `<li>${i}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>
        ${question.modelAnswer ? `
          <div class="feedback-explanation">
            <h4>Model Answer</h4>
            <p>${question.modelAnswer}</p>
          </div>
        ` : ''}
      </div>
    `;
    feedbackContainer.style.display = 'block';
    nextActionsContainer.style.display = 'flex';

  } catch (error) {
    state.isEvaluating = false;
    feedbackContainer.innerHTML = `
      <div class="feedback incorrect">
        <div class="feedback-header">
          ${Icons.Cross} Evaluation Error
        </div>
        <div class="feedback-explanation">
          <p>Failed to evaluate your answer: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    `;
    feedbackContainer.style.display = 'block';
    nextActionsContainer.style.display = 'flex';
  }
}

async function evaluateCodingAnswer(
  quizContainer: HTMLElement,
  state: PracticeState,
  feedbackContainer: HTMLElement,
  nextActionsContainer: HTMLElement
): Promise<void> {
  const question = state.currentQuestion;
  const answer = state.lastAnswer;

  if (!question || !answer || typeof answer !== 'object') {
    renderPracticeFeedback(feedbackContainer, nextActionsContainer, false, question!, answer);
    return;
  }

  state.isEvaluating = true;

  // Show loading state
  feedbackContainer.innerHTML = `
    <div class="practice-evaluating">
      <div class="loading-spinner"></div>
      <p>Running tests...</p>
    </div>
  `;
  feedbackContainer.style.display = 'block';

  try {
    const code = (answer as { code: string }).code;
    const testCases = question.testCases || [];

    if (testCases.length === 0) {
      // No test cases - just check if there's code
      const passed = !!(code && code.trim().length > 0);
      renderPracticeFeedback(feedbackContainer, nextActionsContainer, passed, question, answer);
      return;
    }

    const solution = question.solution || '';
    const results = await runTests(code, testCases, solution);
    const allPassed = results.every(r => r.passed);

    state.isEvaluating = false;

    const passedCount = results.filter(r => r.passed).length;

    feedbackContainer.innerHTML = `
      <div class="feedback ${allPassed ? 'correct' : 'incorrect'}">
        <div class="feedback-header">
          ${allPassed ? Icons.Check : Icons.Cross} ${allPassed ? 'All Tests Passed!' : `${passedCount}/${results.length} Tests Passed`}
        </div>
        <div class="test-results">
          ${results.map((r, i) => `
            <div class="test-result ${r.passed ? 'passed' : 'failed'}">
              <span class="test-icon">${r.passed ? Icons.Check : Icons.Cross}</span>
              <span class="test-desc">${testCases[i]?.description || `Test ${i + 1}`}</span>
              ${!r.passed && r.error ? `<span class="test-error">${r.error}</span>` : ''}
            </div>
          `).join('')}
        </div>
        <div class="feedback-explanation">
          <p>${question.explanation}</p>
        </div>
        ${question.solution ? `
          <details class="solution-details">
            <summary>View Solution</summary>
            <pre><code>${question.solution}</code></pre>
          </details>
        ` : ''}
      </div>
    `;
    feedbackContainer.style.display = 'block';
    nextActionsContainer.style.display = 'flex';

  } catch (error) {
    state.isEvaluating = false;
    feedbackContainer.innerHTML = `
      <div class="feedback incorrect">
        <div class="feedback-header">
          ${Icons.Cross} Execution Error
        </div>
        <div class="feedback-explanation">
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    `;
    feedbackContainer.style.display = 'block';
    nextActionsContainer.style.display = 'flex';
  }
}

function renderPracticeFeedback(
  feedbackContainer: HTMLElement,
  nextActionsContainer: HTMLElement,
  isCorrect: boolean,
  question: QuizQuestion,
  answer: any
): void {
  let correctAnswerDisplay = '';

  if (question.type === 'multiple_choice' && question.options) {
    const correctIndex = question.correctAnswer as number;
    correctAnswerDisplay = question.options[correctIndex] || '';
  } else if (question.type === 'true_false') {
    correctAnswerDisplay = question.correctAnswer ? 'True' : 'False';
  } else {
    correctAnswerDisplay = String(question.correctAnswer);
  }

  feedbackContainer.innerHTML = `
    <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
      <div class="feedback-header">
        ${isCorrect ? `${Icons.Check} Correct!` : `${Icons.Cross} Incorrect`}
      </div>
      ${!isCorrect ? `
        <div class="correct-answer">
          <strong>Correct answer:</strong> ${correctAnswerDisplay}
        </div>
      ` : ''}
      <div class="feedback-explanation">
        <p>${question.explanation}</p>
      </div>
    </div>
  `;
  feedbackContainer.style.display = 'block';
  nextActionsContainer.style.display = 'flex';
}
