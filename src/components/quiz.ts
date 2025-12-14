import type { Quiz, QuizQuestion, QuizAttempt } from '@/core/types';
import Prism from 'prismjs';
import { renderMarkdown } from './markdown';
import { Icons } from './icons';

interface QuizConfig {
  oneAtATime?: boolean;
}

interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string | number | boolean>;
  submitted: boolean;
  startTime: number;
  showExplanations: boolean;
}

function createQuestionElement(
  question: QuizQuestion,
  index: number,
  answer?: string | number | boolean,
  showFeedback = false
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
    case 'code_output':
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

function checkAnswer(
  question: QuizQuestion,
  answer?: string | number | boolean
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
    default:
      return false;
  }
}

function normalizeAnswer(value: string | number | boolean | undefined): string {
  if (value === undefined) {
    return '';
  }
  return String(value).trim().toLowerCase();
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function collectAnswer(questionElement: HTMLElement, question: QuizQuestion): string | number | boolean | undefined {
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
    default:
      return undefined;
  }
}

function calculateScore(quiz: Quiz, answers: Record<string, string | number | boolean>): number {
  let correct = 0;
  quiz.questions.forEach((question) => {
    if (checkAnswer(question, answers[question.id])) {
      correct++;
    }
  });
  return Math.round((correct / quiz.questions.length) * 100);
}

function createScoreSummary(quiz: Quiz, answers: Record<string, string | number | boolean>): HTMLElement {
  const summary = document.createElement('div');
  summary.className = 'quiz-summary';

  const correct = quiz.questions.filter((q) => checkAnswer(q, answers[q.id])).length;
  const total = quiz.questions.length;
  const percentage = calculateScore(quiz, answers);

  summary.innerHTML = `
    <div class="summary-header">Quiz Complete!</div>
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

export function renderQuiz(
  container: HTMLElement,
  quiz: Quiz,
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

  const questionsContainer = document.createElement('div');
  questionsContainer.className = 'questions-container';
  container.appendChild(questionsContainer);

  function render() {
    questionsContainer.innerHTML = '';

    if (config.oneAtATime) {
      // Show one question at a time
      const question = quiz.questions[state.currentQuestionIndex];
      const questionElement = createQuestionElement(
        question,
        state.currentQuestionIndex,
        state.answers[question.id],
        state.showExplanations
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
          state.showExplanations
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
  submitButton.onclick = () => {
    // Collect all answers
    const questionElements = questionsContainer.querySelectorAll('.quiz-question');
    questionElements.forEach((element, index) => {
      const question = quiz.questions[index];
      const answer = collectAnswer(element as HTMLElement, question);
      if (answer !== undefined) {
        state.answers[question.id] = answer;
      }
    });

    // Calculate score
    const timeSpent = Math.floor((Date.now() - state.startTime) / 1000);
    const score = calculateScore(quiz, state.answers);

    // Show feedback
    state.showExplanations = true;
    state.submitted = true;
    render();

    // Add summary
    const summary = createScoreSummary(quiz, state.answers);
    container.insertBefore(summary, questionsContainer);

    // Hide submit button
    submitButton.style.display = 'none';

    // Call completion callback
    const attempt: QuizAttempt = {
      attemptId: `${quiz.id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      answers: state.answers,
      score,
      timeSpentSeconds: timeSpent,
    };
    onComplete(attempt);
  };

  container.appendChild(submitButton);
}
