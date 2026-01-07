/**
 * Shared quiz utilities
 *
 * Contains common functions used for quiz answer validation and scoring.
 */

import type { QuizQuestion, QuizAnswer, CodingAnswer } from '@/core/types';

/**
 * Normalize an answer for comparison.
 * Converts to string, trims whitespace, and lowercases for case-insensitive matching.
 */
export function normalizeAnswer(value: string | number | boolean | undefined): string {
  if (value === undefined) return '';
  return String(value).trim().toLowerCase();
}

/**
 * Type guard to check if an answer is a CodingAnswer object.
 */
export function isCodingAnswer(answer: QuizAnswer | undefined): answer is CodingAnswer {
  return typeof answer === 'object' && answer !== null && 'code' in answer;
}

/**
 * Get the correct option index for a multiple choice question.
 * Handles both numeric indices and string values that match an option.
 */
export function getCorrectOptionIndex(question: QuizQuestion): number {
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

/**
 * Check if a given answer is correct for a question.
 */
export function checkAnswer(question: QuizQuestion, answer: QuizAnswer | undefined): boolean {
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

/**
 * Calculate the score for a set of answers against quiz questions.
 * Returns a percentage (0-100).
 */
export function calculateScore(
  questions: QuizQuestion[],
  answers: Record<string, QuizAnswer>
): number {
  if (questions.length === 0) return 0;
  let correct = 0;
  questions.forEach((question) => {
    if (checkAnswer(question, answers[question.id])) {
      correct++;
    }
  });
  return Math.round((correct / questions.length) * 100);
}
