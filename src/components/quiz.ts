import type { Quiz, Exam, QuizQuestion, QuizAttempt } from '@/core/types';
import Prism from 'prismjs';
import { renderMarkdown } from './markdown';
import { Icons } from './icons';
import { escapeHtml } from '@/utils/html';
import { createCodeEditor } from './code-editor';
import { createProofEditor, type ProofEditor } from './proof-editor';
import type { TestResult } from './code-runner';
import { evaluateWrittenExercise } from '@/utils/gemini-eval';
import { progressStorage } from '@/core/storage';

interface QuizConfig {
  oneAtATime?: boolean;
  durationMinutes?: number;
  isExam?: boolean; // When true, hides feedback during the exam
  subjectId?: string; // Required for exam AI grading storage
  examId?: string; // Required for exam AI grading storage
}

interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, any>;
  submitted: boolean;
  startTime: number;
  showExplanations: boolean;
}

export function createQuestionElement(
  question: QuizQuestion,
  index: number,
  answer?: any,
  showFeedback = false,
  isExam = false
): HTMLElement {
  const questionDiv = document.createElement('div');
  questionDiv.className = 'quiz-question';
  questionDiv.dataset.questionId = question.id;

  const questionHeader = document.createElement('div');
  questionHeader.className = 'question-header';
  questionHeader.innerHTML = `<span class="question-number">Question ${index + 1}</span>`;
  questionDiv.appendChild(questionHeader);

  const questionPrompt = document.createElement('div');
  questionPrompt.className = 'question-prompt';
  questionPrompt.innerHTML = renderMarkdown(question.prompt);
  questionDiv.appendChild(questionPrompt);

  // Code snippet if present
  if (question.codeSnippet) {
    const codeBlock = document.createElement('pre');
    codeBlock.className = 'code-snippet';
    codeBlock.innerHTML = `<code class="language-python">${escapeHtml(question.codeSnippet)}</code>`;
    questionDiv.appendChild(codeBlock);

    // Apply Prism highlighting if available
    if (typeof Prism !== 'undefined') {
      Prism.highlightElement(codeBlock.querySelector('code')!);
    }
  }

  // Answer input based on question type
  const answerContainer = document.createElement('div');
  answerContainer.className = 'answer-container';

  switch (question.type) {
    case 'multiple_choice':
      if (question.options) {
        question.options.forEach((option, i) => {
          const label = document.createElement('label');
          label.className = 'option-label';

          const input = document.createElement('input');
          input.type = 'radio';
          input.name = `question-${question.id}`;
          input.value = String(i);
          input.checked = answer === i;

          if (showFeedback) {
            input.disabled = true;
            if (i === question.correctAnswer) {
              label.classList.add('correct');
            } else if (answer === i) {
              label.classList.add('incorrect');
            }
          }

          label.appendChild(input);
          label.appendChild(document.createTextNode(` ${option}`));
          answerContainer.appendChild(label);
        });
      }
      break;

    case 'true_false':
      ['True', 'False'].forEach((option) => {
        const label = document.createElement('label');
        label.className = 'option-label';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question-${question.id}`;
        input.value = option.toLowerCase();
        input.checked = answer === (option === 'True');

        if (showFeedback) {
          input.disabled = true;
          const isCorrect = question.correctAnswer === (option === 'True');
          if (isCorrect) {
            label.classList.add('correct');
          } else if (answer === (option === 'True')) {
            label.classList.add('incorrect');
          }
        }

        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${option}`));
        answerContainer.appendChild(label);
      });
      break;

    case 'fill_blank':
    case 'code_output': {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'text-input';
      input.placeholder = question.type === 'code_output'
        ? 'Enter the expected output...'
        : 'Enter your answer...';
      input.value = answer !== undefined ? String(answer) : '';

      if (showFeedback) {
        input.disabled = true;
        const isCorrect = normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
        input.classList.add(isCorrect ? 'correct' : 'incorrect');
      }

      answerContainer.appendChild(input);
      break;
    }

    case 'written': {
      if (showFeedback) {
        // After submission: show answer as read-only text
        const answerDisplay = document.createElement('div');
        answerDisplay.className = 'written-answer-display';
        answerDisplay.innerHTML = answer ? renderMarkdown(String(answer)) : '<em>No answer provided</em>';
        answerContainer.appendChild(answerDisplay);
      } else {
        // During exam: use proof editor (without AI evaluate button)
        const editorContainer = document.createElement('div');
        editorContainer.className = 'proof-editor-shell';
        answerContainer.appendChild(editorContainer);

        const initialValue = answer !== undefined ? String(answer) : '';

        const proofEditor = createProofEditor(editorContainer, {
          initialValue,
          height: '250px',
          storageKey: `quiz_written_${question.id}`,
          // Don't pass problem/solution - this disables the AI evaluate button during exam
          // AI evaluation happens after submission via runWrittenQuestionEvaluation
        });

        // Store initial value and track changes
        questionDiv.dataset.writtenContent = initialValue;
        proofEditor.editor.onDidChangeModelContent(() => {
          questionDiv.dataset.writtenContent = proofEditor.getValue();
        });

        // Store editor reference for disposal
        (questionDiv as HTMLElement & { _proofEditor?: ProofEditor })._proofEditor = proofEditor;
      }
      break;
    }

    case 'coding': {
      const hint = document.createElement('div');
      hint.className = 'form-hint';
      hint.textContent = isExam
        ? 'Write code and run to see output. Test results will be shown after submission.'
        : 'Write code and run tests to validate.';
      answerContainer.appendChild(hint);

      const editorContainer = document.createElement('div');
      editorContainer.className = 'code-editor-shell';
      answerContainer.appendChild(editorContainer);

      const status = document.createElement('div');
      status.className = 'form-hint';
      status.textContent = 'Code not run yet.';
      answerContainer.appendChild(status);

      const initialCode = answer && typeof answer === 'object' && 'code' in answer
        ? (answer as any).code
        : (question.starterCode || '');

      const editor = createCodeEditor(editorContainer, {
        language: question.language || 'python',
        initialValue: initialCode,
        starterCode: question.starterCode || '',
        testCases: question.testCases,
        solution: question.solution,
        showRunButton: true,
        hideTestResults: isExam && !showFeedback, // Hide pass/fail during exam
        onTestResults: (results: TestResult[], allPassed: boolean) => {
          questionDiv.dataset.codingPassed = allPassed ? 'true' : 'false';
          questionDiv.dataset.codingCode = editor.getValue();

          // In exam mode (without feedback), only show that code was run
          if (isExam && !showFeedback) {
            status.textContent = 'Code executed. Results shown after submission.';
            status.className = 'form-hint';
          } else {
            status.textContent = allPassed
              ? `${Icons.Check} All tests passed`
              : `${results.filter(r => r.passed).length}/${results.length} tests passed`;
            status.className = `form-hint ${allPassed ? 'text-success' : ''}`;
          }
        },
      });

      // Persist code edits even if tests are not run
      questionDiv.dataset.codingCode = initialCode;
      editor.editor.onDidChangeModelContent(() => {
        questionDiv.dataset.codingCode = editor.getValue();
      });

      break;
    }
  }

  questionDiv.appendChild(answerContainer);

  // Feedback section
  if (showFeedback) {
    const isCorrect = checkAnswer(question, answer);
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.innerHTML = `
      <div class="feedback-header">
        ${isCorrect ? `${Icons.Check} Correct!` : `${Icons.Cross} Incorrect`}
      </div>
      <div class="feedback-explanation">
        ${renderMarkdown(question.explanation)}
      </div>
    `;
    questionDiv.appendChild(feedbackDiv);
  }

  return questionDiv;
}

export function checkAnswer(
  question: QuizQuestion,
  answer?: any
): boolean {
  if (answer === undefined) {
    return false;
  }

  switch (question.type) {
    case 'multiple_choice':
      return answer === question.correctAnswer;
    case 'true_false':
      return answer === question.correctAnswer;
    case 'fill_blank':
    case 'code_output':
      return normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
    case 'written':
      return normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
    case 'coding':
      return typeof answer === 'object' && (answer as any).passed === true;
    default:
      return false;
  }
}

export function normalizeAnswer(value: string | number | boolean | undefined): string {
  if (value === undefined) {
    return '';
  }
  return String(value).trim().toLowerCase();
}

/**
 * Dispose all proof editors in a container to prevent memory leaks
 */
function disposeWrittenEditors(container: HTMLElement): void {
  const questionElements = container.querySelectorAll('.quiz-question');
  questionElements.forEach((element) => {
    const proofEditor = (element as HTMLElement & { _proofEditor?: ProofEditor })._proofEditor;
    if (proofEditor) {
      proofEditor.dispose();
      delete (element as HTMLElement & { _proofEditor?: ProofEditor })._proofEditor;
    }
  });
}

export function collectAnswer(questionElement: HTMLElement, question: QuizQuestion): any {
  const answerContainer = questionElement.querySelector('.answer-container');
  if (!answerContainer) {
    return undefined;
  }

  switch (question.type) {
    case 'multiple_choice': {
      const selected = answerContainer.querySelector('input[type="radio"]:checked') as HTMLInputElement;
      return selected ? parseInt(selected.value, 10) : undefined;
    }
    case 'true_false': {
      const selected = answerContainer.querySelector('input[type="radio"]:checked') as HTMLInputElement;
      return selected ? selected.value === 'true' : undefined;
    }
    case 'fill_blank':
    case 'code_output': {
      const input = answerContainer.querySelector('input[type="text"]') as HTMLInputElement;
      return input ? input.value : undefined;
    }
    case 'written': {
      // Get value from dataset (set by proof editor's onDidChangeModelContent)
      return questionElement.dataset.writtenContent || undefined;
    }
    case 'coding': {
      const code = questionElement.dataset.codingCode || '';
      const passed = questionElement.dataset.codingPassed === 'true';
      return { code, passed };
    }
    default:
      return undefined;
  }
}

function formatTimeRemaining(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function calculateScore(quiz: Quiz | Exam, answers: Record<string, any>): number {
  let correct = 0;
  quiz.questions.forEach((question) => {
    if (checkAnswer(question, answers[question.id])) {
      correct++;
    }
  });
  return Math.round((correct / quiz.questions.length) * 100);
}

function createScoreSummary(quiz: Quiz | Exam, answers: Record<string, any>, timedOut = false): HTMLElement {
  const summary = document.createElement('div');
  summary.className = 'quiz-summary';

  const correct = quiz.questions.filter((q) => checkAnswer(q, answers[q.id])).length;
  const total = quiz.questions.length;
  const percentage = calculateScore(quiz, answers);

  // Determine if this is an exam based on presence of durationMinutes
  const isExam = 'durationMinutes' in quiz;
  const completeText = timedOut
    ? "Time's Up!"
    : isExam ? 'Exam Complete!' : 'Quiz Complete!';

  summary.innerHTML = `
    <div class="summary-header">${completeText}</div>
    <div class="summary-score">
      <div class="score-circle ${percentage >= 70 ? 'pass' : 'fail'}">
        <span class="score-value">${percentage}%</span>
      </div>
      <div class="score-details">
        <div>${correct} out of ${total} correct</div>
        <div class="score-label">${percentage >= 70 ? 'Passed' : 'Keep practicing'}</div>
      </div>
    </div>
  `;

  return summary;
}

/**
 * Delay helper for sequential processing
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Run AI evaluation on written questions after exam submission.
 * Processes questions sequentially with delays to avoid rate limiting.
 * Saves grades to storage as they complete.
 */
async function runWrittenQuestionEvaluation(
  quiz: Quiz | Exam,
  answers: Record<string, any>,
  questionsContainer: HTMLElement,
  subjectId: string,
  examId: string
): Promise<void> {
  const geminiApiKey = progressStorage.getSettings().geminiApiKey;
  if (!geminiApiKey) {
    return; // No API key configured, skip AI evaluation
  }

  const writtenQuestions = quiz.questions.filter(q => q.type === 'written');
  if (writtenQuestions.length === 0) {
    return; // No written questions to evaluate
  }

  // Process questions sequentially with delays to avoid rate limiting
  let isFirst = true;
  for (const question of writtenQuestions) {
    const answer = answers[question.id];
    if (!answer || typeof answer !== 'string' || !answer.trim()) {
      continue; // Skip empty answers
    }

    // Add delay between API calls (skip for first question)
    if (!isFirst) {
      await delay(1500); // 1.5 second delay between requests
    }
    isFirst = false;

    const questionElement = questionsContainer.querySelector(
      `.quiz-question[data-question-id="${question.id}"]`
    );
    if (!questionElement) continue;

    // Add loading indicator
    const aiSection = document.createElement('div');
    aiSection.className = 'ai-evaluation-section';
    aiSection.innerHTML = `
      <div class="ai-evaluation-header">
        <span class="ai-icon">${Icons.Beaker}</span>
        <span>AI Evaluation</span>
      </div>
      <div class="ai-evaluation-content loading">
        Analyzing your answer...
      </div>
    `;
    questionElement.appendChild(aiSection);

    try {
      // Use modelAnswer if available, fall back to explanation
      const modelAnswer = question.modelAnswer || question.explanation;

      const result = await evaluateWrittenExercise(
        geminiApiKey,
        question.prompt,
        modelAnswer,
        answer
      );

      // Save grade to storage
      progressStorage.updateExamAiGrade(subjectId, examId, question.id, {
        score: result.score,
        passed: result.passed,
      });

      const contentEl = aiSection.querySelector('.ai-evaluation-content');
      if (contentEl) {
        const passedClass = result.passed ? 'passed' : 'not-passed';
        const passedIcon = result.passed ? Icons.Check : Icons.Cross;
        const passedText = result.passed ? 'Passed' : 'Needs Work';

        contentEl.className = 'ai-evaluation-content';
        contentEl.innerHTML = `
          <div class="evaluation-result ${passedClass}">
            <div class="result-header">
              <span class="result-badge ${passedClass}">${passedIcon} ${passedText}</span>
              <span class="result-score">Score: ${result.score}/100</span>
            </div>
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
        `;
      }
    } catch (error) {
      const contentEl = aiSection.querySelector('.ai-evaluation-content');
      if (contentEl) {
        contentEl.className = 'ai-evaluation-content error';
        contentEl.innerHTML = `
          <div class="evaluation-error">
            Unable to get AI feedback: ${error instanceof Error ? error.message : 'Unknown error'}
          </div>
        `;
      }
    }
  }
}

export function renderQuiz(
  container: HTMLElement,
  quiz: Quiz | Exam,
  onComplete: (attempt: QuizAttempt) => void,
  config: QuizConfig = {}
): void {
  container.innerHTML = '';
  container.className = 'quiz-container';

  const state: QuizState = {
    currentQuestionIndex: 0,
    answers: {},
    submitted: false,
    startTime: Date.now(),
    showExplanations: false,
  };

  const quizHeader = document.createElement('div');
  quizHeader.className = 'quiz-header';
  quizHeader.innerHTML = `
    <h2 class="quiz-title">${quiz.title}</h2>
    <div class="quiz-info">
      ${quiz.questions.length} question${quiz.questions.length !== 1 ? 's' : ''}
    </div>
  `;
  container.appendChild(quizHeader);

  // Timer setup
  let timerInterval: ReturnType<typeof setInterval> | null = null;
  let timerElement: HTMLElement | null = null;
  let timeRemaining = config.durationMinutes ? config.durationMinutes * 60 : 0;

  if (config.durationMinutes) {
    timerElement = document.createElement('div');
    timerElement.className = 'quiz-timer';
    timerElement.innerHTML = `
      <span class="timer-icon">${Icons.StatusInProgress}</span>
      <span class="timer-value">${formatTimeRemaining(timeRemaining)}</span>
    `;
    quizHeader.appendChild(timerElement);
  }

  const questionsContainer = document.createElement('div');
  questionsContainer.className = 'questions-container';
  container.appendChild(questionsContainer);

  function render() {
    // Dispose any existing proof editors before clearing
    disposeWrittenEditors(questionsContainer);
    questionsContainer.innerHTML = '';

    if (config.oneAtATime) {
      // Show one question at a time
      const question = quiz.questions[state.currentQuestionIndex];
      const questionElement = createQuestionElement(
        question,
        state.currentQuestionIndex,
        state.answers[question.id],
        state.showExplanations,
        config.isExam
      );
      questionsContainer.appendChild(questionElement);

      // Navigation buttons
      const navButtons = document.createElement('div');
      navButtons.className = 'question-nav';

      if (state.currentQuestionIndex > 0) {
        const prevButton = document.createElement('button');
        prevButton.className = 'btn btn-secondary';
        prevButton.innerHTML = `${Icons.ChevronLeft} Previous`;
        prevButton.onclick = () => {
          state.currentQuestionIndex--;
          render();
        };
        navButtons.appendChild(prevButton);
      }

      if (state.currentQuestionIndex < quiz.questions.length - 1) {
        const nextButton = document.createElement('button');
        nextButton.className = 'btn btn-primary';
        nextButton.innerHTML = `Next ${Icons.ChevronRight}`;
        nextButton.onclick = () => {
          // Collect current answer
          const answer = collectAnswer(questionElement, question);
          if (answer !== undefined) {
            state.answers[question.id] = answer;
          }
          state.currentQuestionIndex++;
          render();
        };
        navButtons.appendChild(nextButton);
      }

      questionsContainer.appendChild(navButtons);
    } else {
      // Show all questions at once
      quiz.questions.forEach((question, index) => {
        const questionElement = createQuestionElement(
          question,
          index,
          state.answers[question.id],
          state.showExplanations,
          config.isExam
        );
        questionsContainer.appendChild(questionElement);
      });
    }
  }

  render();

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.className = 'btn btn-primary submit-button';
  submitButton.textContent = 'Submit Quiz';

  // Extracted submit logic so it can be called by button or timer
  function submitQuiz(timedOut = false) {
    // Prevent double submission
    if (state.submitted) return;

    // Stop the timer
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    // Collect all answers (need to handle oneAtATime mode)
    if (config.oneAtATime) {
      // Collect current question's answer before submitting
      const currentQuestionEl = questionsContainer.querySelector('.quiz-question') as HTMLElement;
      if (currentQuestionEl) {
        const currentQuestion = quiz.questions[state.currentQuestionIndex];
        const answer = collectAnswer(currentQuestionEl, currentQuestion);
        if (answer !== undefined) {
          state.answers[currentQuestion.id] = answer;
        }
      }
    } else {
      const questionElements = questionsContainer.querySelectorAll('.quiz-question');
      questionElements.forEach((element, index) => {
        const question = quiz.questions[index];
        const answer = collectAnswer(element as HTMLElement, question);
        if (answer !== undefined) {
          state.answers[question.id] = answer;
        }
      });
    }

    // Calculate score
    const timeSpent = Math.floor((Date.now() - state.startTime) / 1000);
    const score = calculateScore(quiz, state.answers);

    // Show feedback
    state.showExplanations = true;
    state.submitted = true;

    // For oneAtATime mode, show all questions in review mode
    if (config.oneAtATime) {
      disposeWrittenEditors(questionsContainer);
      questionsContainer.innerHTML = '';
      quiz.questions.forEach((question, index) => {
        const questionElement = createQuestionElement(
          question,
          index,
          state.answers[question.id],
          true, // showFeedback
          false // isExam - false here since we're in review mode showing results
        );
        questionsContainer.appendChild(questionElement);
      });
    } else {
      render();
    }

    // Add summary
    const summary = createScoreSummary(quiz, state.answers, timedOut);
    container.insertBefore(summary, questionsContainer);

    // For exams, run AI evaluation on written questions
    if (config.isExam && config.subjectId && config.examId) {
      runWrittenQuestionEvaluation(quiz, state.answers, questionsContainer, config.subjectId, config.examId);
    }

    // Hide submit button and update timer display
    submitButton.style.display = 'none';
    if (timerElement) {
      timerElement.classList.add('timer-finished');
      const timerValueEl = timerElement.querySelector('.timer-value');
      if (timerValueEl) {
        timerValueEl.textContent = timedOut ? "Time's up!" : 'Submitted';
      }
    }

    // Call completion callback
    const attempt: QuizAttempt = {
      attemptId: `${quiz.id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      answers: state.answers,
      score,
      timeSpentSeconds: timeSpent,
    };
    onComplete(attempt);
  }

  submitButton.onclick = () => submitQuiz(false);
  container.appendChild(submitButton);

  // Start timer countdown if duration is set
  if (config.durationMinutes && timerElement) {
    timerInterval = setInterval(() => {
      timeRemaining--;

      const timerValueEl = timerElement!.querySelector('.timer-value');
      if (timerValueEl) {
        timerValueEl.textContent = formatTimeRemaining(timeRemaining);
      }

      // Add warning classes based on time remaining
      if (timeRemaining <= 60) {
        timerElement!.classList.add('timer-critical');
        timerElement!.classList.remove('timer-warning');
      } else if (timeRemaining <= 300) {
        timerElement!.classList.add('timer-warning');
      }

      // Auto-submit when time runs out
      if (timeRemaining <= 0) {
        submitQuiz(true);
      }
    }, 1000);
  }
}
