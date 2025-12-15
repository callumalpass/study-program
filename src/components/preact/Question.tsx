import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import type { QuizQuestion } from '@/core/types';
import { renderMarkdown } from '@/components/markdown';
import { escapeHtml } from '@/utils/html';
import { Icons } from '@/components/icons';
import Prism from 'prismjs';

interface QuestionProps {
  question: QuizQuestion;
  index: number;
  answer: any;
  showFeedback: boolean;
  isExam: boolean;
  onAnswerChange: (questionId: string, answer: any) => void;
  isCorrect?: boolean;
}

function normalizeAnswer(value: string | number | boolean | undefined): string {
  if (value === undefined) return '';
  return String(value).trim().toLowerCase();
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

  // Apply syntax highlighting to code snippets
  useEffect(() => {
    if (codeRef.current && question.codeSnippet) {
      Prism.highlightElement(codeRef.current);
    }
  }, [question.codeSnippet]);

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

  const renderAnswerInput = () => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div class="answer-container">
            {question.options?.map((option, i) => {
              const isSelected = answer === i;
              const isCorrectOption = i === question.correctAnswer;
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
        const isTextCorrect = showFeedback &&
          normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
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
              value={answer ?? ''}
              disabled={showFeedback}
              onInput={(e) => handleTextInput((e.target as HTMLInputElement).value)}
            />
          </div>
        );
      }

      case 'written':
        // For now, use a simple textarea. Could integrate Monaco later.
        return (
          <div class="answer-container">
            {showFeedback ? (
              <div
                class="written-answer-display"
                dangerouslySetInnerHTML={{
                  __html: answer ? renderMarkdown(String(answer)) : '<em>No answer provided</em>',
                }}
              />
            ) : (
              <textarea
                class="text-input written-textarea"
                placeholder="Enter your answer..."
                value={answer ?? ''}
                rows={6}
                onInput={(e) => handleTextInput((e.target as HTMLTextAreaElement).value)}
              />
            )}
          </div>
        );

      case 'coding':
        // Coding questions need Monaco editor - for now, show a placeholder
        return (
          <div class="answer-container">
            <div class="form-hint">
              Coding exercises require the full editor. This question type will be supported in a future update.
            </div>
          </div>
        );

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
          <code ref={codeRef} class="language-python">
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
