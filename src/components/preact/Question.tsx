import { h } from 'preact';
import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import type { QuizQuestion, QuizAnswer, CodingAnswer } from '@/core/types';
import { renderMarkdown } from '@/components/markdown';
import { escapeHtml } from '@/utils/html';
import { Icons } from '@/components/icons';
import { CompactCodeEditor } from './CodeEditor';
import type { TestResult } from '@/components/code-runner';
import Prism from 'prismjs';

interface QuestionProps {
  question: QuizQuestion;
  index: number;
  answer: QuizAnswer | undefined;
  showFeedback: boolean;
  isExam: boolean;
  onAnswerChange: (questionId: string, answer: QuizAnswer) => void;
  isCorrect?: boolean;
}

function normalizeAnswer(value: string | number | boolean | undefined): string {
  if (value === undefined) return '';
  return String(value).trim().toLowerCase();
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

export function Question({
  question,
  index,
  answer,
  showFeedback,
  isExam,
  onAnswerChange,
  isCorrect,
}: QuestionProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [codingTestsPassed, setCodingTestsPassed] = useState<boolean | null>(null);

  // Apply syntax highlighting to code snippets
  useEffect(() => {
    if (codeRef.current && question.codeSnippet) {
      Prism.highlightElement(codeRef.current);
    }
  }, [question.codeSnippet, question.language]);

  const handleMultipleChoice = (optionIndex: number) => {
    if (!showFeedback) {
      onAnswerChange(question.id, optionIndex);
    }
  };

  const handleTrueFalse = (value: boolean) => {
    if (!showFeedback) {
      onAnswerChange(question.id, value);
    }
  };

  const handleTextInput = (value: string) => {
    if (!showFeedback) {
      onAnswerChange(question.id, value);
    }
  };

  const handleCodeChange = useCallback((code: string) => {
    if (!showFeedback) {
      const codingAnswer: CodingAnswer = { code, passed: codingTestsPassed ?? false };
      onAnswerChange(question.id, codingAnswer);
    }
  }, [question.id, showFeedback, codingTestsPassed, onAnswerChange]);

  const isCodingAnswer = (ans: QuizAnswer | undefined): ans is CodingAnswer =>
    typeof ans === 'object' && ans !== null && 'code' in ans;

  const handleTestResults = useCallback((results: TestResult[], allPassed: boolean) => {
    setCodingTestsPassed(allPassed);
    // Update answer with test results
    const currentCode = isCodingAnswer(answer) ? answer.code : (typeof answer === 'string' ? answer : question.starterCode || '');
    const codingAnswer: CodingAnswer = { code: currentCode, passed: allPassed };
    onAnswerChange(question.id, codingAnswer);
  }, [question.id, question.starterCode, answer, onAnswerChange]);

  const renderAnswerInput = () => {
    switch (question.type) {
      case 'multiple_choice': {
        const correctIndex = getCorrectOptionIndex(question);
        return (
          <div class="answer-container">
            {question.options?.map((option, i) => {
              const isSelected = answer === i;
              const isCorrectOption = i === correctIndex;
              let labelClass = 'option-label';

              if (showFeedback) {
                if (isCorrectOption) labelClass += ' correct';
                else if (isSelected) labelClass += ' incorrect';
              }

              return (
                <label key={i} class={labelClass}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={isSelected}
                    disabled={showFeedback}
                    onChange={() => handleMultipleChoice(i)}
                  />
                  {' '}{option}
                </label>
              );
            })}
          </div>
        );
      }

      case 'true_false':
        return (
          <div class="answer-container">
            {[true, false].map((value) => {
              const isSelected = answer === value;
              const isCorrectOption = question.correctAnswer === value;
              let labelClass = 'option-label';

              if (showFeedback) {
                if (isCorrectOption) labelClass += ' correct';
                else if (isSelected) labelClass += ' incorrect';
              }

              return (
                <label key={String(value)} class={labelClass}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={isSelected}
                    disabled={showFeedback}
                    onChange={() => handleTrueFalse(value)}
                  />
                  {' '}{value ? 'True' : 'False'}
                </label>
              );
            })}
          </div>
        );

      case 'fill_blank':
      case 'code_output': {
        // For fill_blank and code_output, answer is always a string
        const textAnswer = typeof answer === 'string' ? answer : '';
        const isTextCorrect = showFeedback &&
          normalizeAnswer(textAnswer) === normalizeAnswer(question.correctAnswer);
        const inputClass = showFeedback
          ? `text-input ${isTextCorrect ? 'correct' : 'incorrect'}`
          : 'text-input';

        return (
          <div class="answer-container">
            <input
              type="text"
              class={inputClass}
              placeholder={
                question.type === 'code_output'
                  ? 'Enter the expected output...'
                  : 'Enter your answer...'
              }
              value={textAnswer}
              disabled={showFeedback}
              onInput={(e) => handleTextInput((e.target as HTMLInputElement).value)}
            />
          </div>
        );
      }

      case 'written': {
        // For written questions, answer is always a string
        const writtenAnswer = typeof answer === 'string' ? answer : '';
        return (
          <div class="answer-container">
            {showFeedback ? (
              <div
                class="written-answer-display"
                dangerouslySetInnerHTML={{
                  __html: writtenAnswer ? renderMarkdown(writtenAnswer) : '<em>No answer provided</em>',
                }}
              />
            ) : (
              <textarea
                class="text-input written-textarea"
                placeholder="Enter your answer..."
                value={writtenAnswer}
                rows={6}
                onInput={(e) => handleTextInput((e.target as HTMLTextAreaElement).value)}
              />
            )}
          </div>
        );
      }

      case 'coding': {
        const currentCode = isCodingAnswer(answer) ? answer.code : (typeof answer === 'string' ? answer : question.starterCode || '');
        const testsPassed = isCodingAnswer(answer) ? answer.passed : null;

        return (
          <div class="answer-container coding-container">
            {showFeedback ? (
              <div class="coding-feedback">
                <div class={`coding-result ${testsPassed ? 'passed' : 'failed'}`}>
                  <span
                    class="result-icon"
                    dangerouslySetInnerHTML={{ __html: testsPassed ? Icons.Check : Icons.Cross }}
                  />
                  <span class="result-text">
                    {testsPassed ? 'All tests passed!' : 'Some tests failed'}
                  </span>
                </div>
                <div class="submitted-code">
                  <div class="code-header">Your submitted code:</div>
                  <pre class="code-display"><code>{currentCode}</code></pre>
                </div>
                {question.solution && (
                  <details class="solution-details">
                    <summary>View Solution</summary>
                    <pre class="solution-code"><code>{question.solution}</code></pre>
                  </details>
                )}
              </div>
            ) : (
              <CompactCodeEditor
                language={question.language || 'python'}
                initialValue={currentCode}
                height="250px"
                testCases={question.testCases || []}
                solution={question.solution}
                hideTestResults={isExam}
                onChange={handleCodeChange}
                onTestResults={handleTestResults}
              />
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div class="quiz-question" data-question-id={question.id}>
      <div class="question-header">
        <span class="question-number">Question {index + 1}</span>
      </div>

      <div
        class="question-prompt"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(question.prompt) }}
      />

      {question.codeSnippet && (
        <pre class="code-snippet">
          <code ref={codeRef} class={`language-${question.language || 'python'}`}>
            {escapeHtml(question.codeSnippet)}
          </code>
        </pre>
      )}

      {renderAnswerInput()}

      {showFeedback && (
        <div class={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div
            class="feedback-header"
            dangerouslySetInnerHTML={{
              __html: isCorrect
                ? `${Icons.Check} Correct!`
                : `${Icons.Cross} Incorrect`,
            }}
          />
          <div
            class="feedback-explanation"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(question.explanation) }}
          />
        </div>
      )}
    </div>
  );
}
