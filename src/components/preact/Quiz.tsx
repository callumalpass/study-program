import { h, Fragment } from 'preact';
import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import type { Quiz as QuizType, Exam, QuizQuestion, QuizAttempt, QuizAnswer, CodingAnswer } from '@/core/types';
import { Icons } from '@/components/icons';
import { Question } from './Question';

interface QuizProps {
  quiz: QuizType | Exam;
  onComplete: (attempt: QuizAttempt) => void;
  durationMinutes?: number;
  isExam?: boolean;
}

interface QuizState {
  answers: Record<string, QuizAnswer>;
  submitted: boolean;
  showExplanations: boolean;
}

function formatTimeRemaining(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function isCodingAnswer(answer: QuizAnswer | undefined): answer is CodingAnswer {
  return typeof answer === 'object' && answer !== null && 'code' in answer;
}

/**
 * Get the correct option index for a multiple choice question.
 * Handles both numeric indices and string values that match an option.
 */
function getCorrectOptionIndex(question: QuizQuestion): number {
  const correctAnswer = question.correctAnswer;

  // If already a number, return it directly
  if (typeof correctAnswer === 'number') {
    return correctAnswer;
  }

  // If a string, find the matching option index
  if (typeof correctAnswer === 'string' && question.options) {
    const index = question.options.indexOf(correctAnswer);
    if (index !== -1) {
      return index;
    }
  }

  // Fallback: return -1 to indicate no valid answer found
  return -1;
}

function checkAnswer(question: QuizQuestion, answer: QuizAnswer | undefined): boolean {
  if (answer === undefined) return false;

  switch (question.type) {
    case 'multiple_choice': {
      // For multiple choice, compare the selected index to the correct index
      const correctIndex = getCorrectOptionIndex(question);
      return answer === correctIndex;
    }
    case 'true_false':
      return answer === question.correctAnswer;
    case 'fill_blank':
    case 'code_output':
    case 'written': {
      const textAnswer = typeof answer === 'string' ? answer : '';
      return normalizeAnswer(textAnswer) === normalizeAnswer(question.correctAnswer);
    }
    case 'coding':
      return isCodingAnswer(answer) && answer.passed === true;
    default:
      return false;
  }
}

function normalizeAnswer(value: string | number | boolean | undefined): string {
  if (value === undefined) return '';
  return String(value).trim().toLowerCase();
}

function calculateScore(quiz: QuizType | Exam, answers: Record<string, QuizAnswer>): number {
  if (quiz.questions.length === 0) return 0;
  let correct = 0;
  quiz.questions.forEach((question) => {
    if (checkAnswer(question, answers[question.id])) {
      correct++;
    }
  });
  return Math.round((correct / quiz.questions.length) * 100);
}

export function Quiz({ quiz, onComplete, durationMinutes, isExam = false }: QuizProps) {
  const startTimeRef = useRef(Date.now());
  const [state, setState] = useState<QuizState>({
    answers: {},
    submitted: false,
    showExplanations: false,
  });
  const [timeRemaining, setTimeRemaining] = useState(
    durationMinutes ? durationMinutes * 60 : 0
  );
  const [timedOut, setTimedOut] = useState(false);

  const handleAnswerChange = useCallback((questionId: string, answer: QuizAnswer) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  }, []);

  const handleSubmit = useCallback((wasTimedOut = false) => {
    if (state.submitted) return;

    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const score = calculateScore(quiz, state.answers);

    setState((prev) => ({
      ...prev,
      submitted: true,
      showExplanations: true,
    }));

    if (wasTimedOut) {
      setTimedOut(true);
    }

    const attempt: QuizAttempt = {
      attemptId: `${quiz.id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      answers: state.answers,
      score,
      timeSpentSeconds: timeSpent,
    };

    onComplete(attempt);
  }, [quiz, state.answers, state.submitted, onComplete]);

  // Timer effect
  useEffect(() => {
    if (!durationMinutes || state.submitted) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [durationMinutes, state.submitted, handleSubmit]);

  const score = state.submitted ? calculateScore(quiz, state.answers) : 0;
  const correctCount = state.submitted
    ? quiz.questions.filter((q) => checkAnswer(q, state.answers[q.id])).length
    : 0;

  const timerClass = timeRemaining <= 60
    ? 'timer-critical'
    : timeRemaining <= 300
    ? 'timer-warning'
    : '';

  return (
    <div class="quiz-container">
      <div class="quiz-header">
        <h2 class="quiz-title">{quiz.title}</h2>
        <div class="quiz-info">
          {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
        </div>
        {durationMinutes && (
          <div class={`quiz-timer ${timerClass} ${state.submitted ? 'timer-finished' : ''}`}>
            <span class="timer-icon" dangerouslySetInnerHTML={{ __html: Icons.StatusInProgress }} />
            <span class="timer-value">
              {state.submitted
                ? timedOut
                  ? "Time's up!"
                  : 'Submitted'
                : formatTimeRemaining(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      {state.submitted && (
        <div class="quiz-summary">
          <div class="summary-header">
            {timedOut ? "Time's Up!" : isExam ? 'Exam Complete!' : 'Quiz Complete!'}
          </div>
          <div class="summary-score">
            <div class={`score-circle ${score >= 70 ? 'pass' : 'fail'}`}>
              <span class="score-value">{score}%</span>
            </div>
            <div class="score-details">
              <div>{correctCount} out of {quiz.questions.length} correct</div>
              <div class="score-label">
                {score >= 70 ? 'Passed' : 'Keep practicing'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div class="questions-container">
        {quiz.questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            index={index}
            answer={state.answers[question.id]}
            showFeedback={state.showExplanations}
            isExam={isExam && !state.submitted}
            onAnswerChange={handleAnswerChange}
            isCorrect={state.submitted ? checkAnswer(question, state.answers[question.id]) : undefined}
          />
        ))}
      </div>

      {!state.submitted && (
        <button
          class="btn btn-primary submit-button"
          onClick={() => handleSubmit(false)}
        >
          Submit {isExam ? 'Exam' : 'Quiz'}
        </button>
      )}
    </div>
  );
}
