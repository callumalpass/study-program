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
export function normalizeAnswer(value: string | number | boolean | undefined | null): string {
  if (value === undefined || value === null) return '';
  return String(value).trim().toLowerCase();
}

/**
 * Normalize code output for comparison.
 * In addition to standard normalization, this also normalizes whitespace around
 * punctuation so that "[1, 2, 3]" matches "[1,2,3]" and "(a, b)" matches "(a,b)".
 * This is important for code_output questions where users might type without spaces.
 * Also collapses multiple consecutive spaces to single spaces to handle NumPy-style
 * array formatting where elements are space-padded for alignment.
 */
export function normalizeCodeOutput(value: string | number | boolean | undefined | null): string {
  if (value === undefined || value === null) return '';
  return String(value)
    .trim()
    .toLowerCase()
    // Collapse multiple consecutive spaces to single space (handles NumPy array formatting)
    // Uses ' +' instead of '\s+' to preserve newlines and tabs
    .replace(/ +/g, ' ')
    // Normalize whitespace around common punctuation: commas, colons, brackets
    .replace(/\s*,\s*/g, ', ')      // Standardize comma spacing
    .replace(/\s*:\s*/g, ': ')      // Standardize colon spacing (for dicts)
    .replace(/\[\s+/g, '[')         // Remove space after [
    .replace(/\s+\]/g, ']')         // Remove space before ]
    .replace(/\(\s+/g, '(')         // Remove space after (
    .replace(/\s+\)/g, ')')         // Remove space before )
    .replace(/\{\s+/g, '{')         // Remove space after {
    .replace(/\s+\}/g, '}');        // Remove space before }
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
 * Returns -1 if no valid answer is found or the index is out of bounds.
 */
export function getCorrectOptionIndex(question: QuizQuestion): number {
  const correctAnswer = question.correctAnswer;
  const optionsLength = question.options?.length ?? 0;

  // If already a number, validate it's a valid integer index within bounds
  if (typeof correctAnswer === 'number') {
    if (Number.isInteger(correctAnswer) && correctAnswer >= 0 && correctAnswer < optionsLength) {
      return correctAnswer;
    }
    // Not a valid integer index or out of bounds
    return -1;
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
export function checkAnswer(question: QuizQuestion, answer: QuizAnswer | undefined | null): boolean {
  if (answer === undefined || answer === null) return false;

  switch (question.type) {
    case 'multiple_choice': {
      // For multiple choice, compare the selected index to the correct index
      const correctIndex = getCorrectOptionIndex(question);
      // If no valid correct answer exists (returns -1), the question cannot be answered correctly
      if (correctIndex === -1) return false;
      return answer === correctIndex;
    }
    case 'true_false':
      return answer === question.correctAnswer;
    case 'code_output': {
      // For code output, use normalizeCodeOutput which handles whitespace around punctuation
      // This allows "[1,2,3]" to match "[1, 2, 3]" for better user experience
      const normalizedAnswer = isCodingAnswer(answer) ? '' : normalizeCodeOutput(answer as string | number | boolean | undefined);
      return normalizedAnswer === normalizeCodeOutput(question.correctAnswer);
    }
    case 'fill_blank':
    case 'written': {
      // Use normalizeAnswer on both sides - it handles string, number, boolean, and undefined
      // This ensures numeric answers (e.g., 5) match numeric correctAnswers (e.g., "5")
      const normalizedAnswer = isCodingAnswer(answer) ? '' : normalizeAnswer(answer as string | number | boolean | undefined);
      return normalizedAnswer === normalizeAnswer(question.correctAnswer);
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
