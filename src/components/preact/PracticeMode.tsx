import { h, Fragment } from 'preact';
import { useState, useCallback, useRef } from 'preact/hooks';
import type { Subject, Exam, QuizQuestion, QuizAnswer, CodingAnswer } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { Icons } from '@/components/icons';
import { Question } from './Question';
import { generatePracticeQuestion, evaluateWrittenExercise } from '@/utils/gemini-eval';
import { runTests } from '@/components/code-runner';

interface PracticeModeProps {
  subject: Subject;
  exam: Exam;
  onExit: () => void;
}

interface PracticeState {
  currentQuestion: QuizQuestion | null;
  previousQuestions: QuizQuestion[];
  questionCount: number;
  isLoading: boolean;
  hasAnswered: boolean;
  answer: QuizAnswer | undefined;
  isEvaluating: boolean;
  feedback: FeedbackState | null;
  error: string | null;
}

interface FeedbackState {
  isCorrect: boolean;
  message: string;
  details?: string;
}

function isCodingAnswer(answer: QuizAnswer | undefined): answer is CodingAnswer {
  return typeof answer === 'object' && answer !== null && 'code' in answer;
}

function checkSimpleAnswer(question: QuizQuestion, answer: QuizAnswer | undefined): boolean {
  if (answer === undefined) return false;

  switch (question.type) {
    case 'multiple_choice':
    case 'true_false':
      return answer === question.correctAnswer;
    case 'fill_blank':
    case 'code_output': {
      const textAnswer = typeof answer === 'string' ? answer : '';
      return textAnswer.trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
    }
    default:
      return false;
  }
}

export function PracticeMode({ subject, exam, onExit }: PracticeModeProps) {
  const [state, setState] = useState<PracticeState>({
    currentQuestion: null,
    previousQuestions: [],
    questionCount: 0,
    isLoading: true,
    hasAnswered: false,
    answer: undefined,
    isEvaluating: false,
    feedback: null,
    error: null,
  });

  const startedRef = useRef(false);

  // Generate first question on mount
  if (!startedRef.current) {
    startedRef.current = true;
    generateNextQuestion();
  }

  async function generateNextQuestion() {
    setState(prev => ({
      ...prev,
      isLoading: true,
      hasAnswered: false,
      answer: undefined,
      feedback: null,
      error: null,
    }));

    const apiKey = progressStorage.getSettings().geminiApiKey;
    if (!apiKey) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Gemini API key not configured.',
      }));
      return;
    }

    // Pick a random question from the exam as a template
    const randomIndex = Math.floor(Math.random() * exam.questions.length);
    const originalQuestion = exam.questions[randomIndex];

    try {
      const practiceQuestion = await generatePracticeQuestion(
        apiKey,
        originalQuestion,
        `${subject.code}: ${subject.title}`,
        state.previousQuestions
      );

      setState(prev => ({
        ...prev,
        currentQuestion: practiceQuestion,
        questionCount: prev.questionCount + 1,
        isLoading: false,
        previousQuestions: [...prev.previousQuestions.slice(-4), practiceQuestion],
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to generate practice question',
      }));
    }
  }

  const handleAnswerChange = useCallback((questionId: string, answer: QuizAnswer) => {
    setState(prev => ({ ...prev, answer }));
  }, []);

  const handleCheckAnswer = useCallback(async () => {
    const { currentQuestion, answer } = state;
    if (!currentQuestion || state.hasAnswered) return;

    setState(prev => ({ ...prev, hasAnswered: true, isEvaluating: true }));

    try {
      let isCorrect = false;
      let message = '';
      let details = '';

      if (currentQuestion.type === 'written') {
        // Written questions need AI evaluation
        const apiKey = progressStorage.getSettings().geminiApiKey;
        if (apiKey) {
          const writtenAnswer = typeof answer === 'string' ? answer : '';
          const modelAnswer = currentQuestion.modelAnswer || currentQuestion.explanation;
          const result = await evaluateWrittenExercise(apiKey, currentQuestion.prompt, modelAnswer, writtenAnswer);

          isCorrect = result.passed;
          message = result.passed ? 'Good answer!' : 'Needs improvement';
          details = result.feedback;

          if (result.strengths.length > 0) {
            details += '\n\nStrengths: ' + result.strengths.join(', ');
          }
          if (result.improvements.length > 0) {
            details += '\n\nSuggestions: ' + result.improvements.join(', ');
          }
        }
      } else if (currentQuestion.type === 'coding') {
        // Coding questions run tests
        const code = isCodingAnswer(answer) ? answer.code : (typeof answer === 'string' ? answer : '');
        const testCases = currentQuestion.testCases || [];

        if (testCases.length > 0 && currentQuestion.solution) {
          const results = await runTests(code || '', testCases, currentQuestion.solution);
          const allPassed = results.every(r => r.passed);
          const passedCount = results.filter(r => r.passed).length;

          isCorrect = allPassed;
          message = allPassed ? 'All tests passed!' : `${passedCount}/${results.length} tests passed`;

          if (!allPassed) {
            const failedTest = results.find(r => !r.passed);
            if (failedTest) {
              details = `Failed test: ${failedTest.testCase.description || 'Test case'}`;
              if (failedTest.error) {
                details += `\nError: ${failedTest.error}`;
              }
            }
          }
        } else {
          isCorrect = !!(code && code.trim().length > 0);
          message = isCorrect ? 'Code submitted' : 'No code provided';
        }
      } else {
        // Simple answer checking
        isCorrect = checkSimpleAnswer(currentQuestion, answer);
        message = isCorrect ? 'Correct!' : 'Incorrect';

        if (!isCorrect) {
          if (currentQuestion.type === 'multiple_choice' && currentQuestion.options) {
            const correctIndex = currentQuestion.correctAnswer as number;
            details = `Correct answer: ${currentQuestion.options[correctIndex]}`;
          } else if (currentQuestion.type === 'true_false') {
            details = `Correct answer: ${currentQuestion.correctAnswer ? 'True' : 'False'}`;
          } else {
            details = `Correct answer: ${currentQuestion.correctAnswer}`;
          }
        }
      }

      setState(prev => ({
        ...prev,
        isEvaluating: false,
        feedback: { isCorrect, message, details },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isEvaluating: false,
        feedback: {
          isCorrect: false,
          message: 'Error checking answer',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  }, [state.currentQuestion, state.answer, state.hasAnswered]);

  const handleNextQuestion = useCallback(() => {
    generateNextQuestion();
  }, []);

  return (
    <div class="practice-mode">
      <div class="practice-header">
        <span class="practice-badge">
          <span dangerouslySetInnerHTML={{ __html: Icons.Beaker }} /> Practice Mode
        </span>
        <span class="practice-count">Question {state.questionCount || 1}</span>
        <button class="btn btn-ghost btn-small" onClick={onExit}>
          <span dangerouslySetInnerHTML={{ __html: Icons.Cross }} /> Exit Practice
        </button>
      </div>

      <div class="practice-question-container">
        {state.isLoading && (
          <div class="practice-loading">
            <div class="loading-spinner" />
            <p>Generating practice question...</p>
          </div>
        )}

        {state.error && (
          <div class="practice-error">
            <p>{state.error}</p>
            <button class="btn btn-secondary" onClick={handleNextQuestion}>
              Try Again
            </button>
          </div>
        )}

        {state.currentQuestion && !state.isLoading && (
          <Question
            question={state.currentQuestion}
            index={0}
            answer={state.answer}
            showFeedback={state.hasAnswered}
            isExam={false}
            onAnswerChange={handleAnswerChange}
            isCorrect={state.feedback?.isCorrect}
          />
        )}
      </div>

      {/* Check Answer / Evaluating */}
      {state.currentQuestion && !state.hasAnswered && !state.isLoading && (
        <div class="practice-actions">
          <button class="btn btn-primary" onClick={handleCheckAnswer}>
            Check Answer
          </button>
        </div>
      )}

      {state.isEvaluating && (
        <div class="practice-evaluating">
          <div class="loading-spinner" />
          <p>Evaluating your answer...</p>
        </div>
      )}

      {/* Feedback */}
      {state.feedback && !state.isEvaluating && (
        <div class={`practice-feedback ${state.feedback.isCorrect ? 'correct' : 'incorrect'}`}>
          <div class="feedback-header">
            <span dangerouslySetInnerHTML={{ __html: state.feedback.isCorrect ? Icons.Check : Icons.Cross }} />
            {' '}{state.feedback.message}
          </div>
          {state.feedback.details && (
            <div class="feedback-details">
              <p>{state.feedback.details}</p>
            </div>
          )}
          {state.currentQuestion?.explanation && (
            <div class="feedback-explanation">
              <p>{state.currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Next Question */}
      {state.hasAnswered && !state.isEvaluating && (
        <div class="practice-next-actions">
          <button class="btn btn-primary" onClick={handleNextQuestion}>
            Generate Another
          </button>
          <button class="btn btn-secondary" onClick={onExit}>
            Exit Practice
          </button>
        </div>
      )}
    </div>
  );
}
