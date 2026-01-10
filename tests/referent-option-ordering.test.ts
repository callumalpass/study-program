/**
 * Referent Option Ordering Tests
 *
 * These tests validate that quiz and exam options with referent language
 * (like "Both of the above", "Neither", etc.) are correctly positioned
 * AFTER the options they reference.
 *
 * This is important because:
 * 1. "Both of the above" must come after the two options it refers to
 * 2. "Neither" typically refers to options before it
 * 3. Options may be randomized in some contexts, making positional references fragile
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

/**
 * Recursively find all quiz JSON files
 */
function findQuizFiles(dir: string): string[] {
  const quizFiles: string[] = [];

  if (!existsSync(dir)) {
    return quizFiles;
  }

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      quizFiles.push(...findQuizFiles(fullPath));
    } else if (entry.name === 'quizzes.json') {
      quizFiles.push(fullPath);
    }
  }

  return quizFiles;
}

/**
 * Find all exam JSON files
 */
function findExamFiles(dir: string): string[] {
  const examFiles: string[] = [];

  if (!existsSync(dir)) {
    return examFiles;
  }

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      examFiles.push(...findExamFiles(fullPath));
    } else if (entry.name === 'exams.json') {
      examFiles.push(fullPath);
    }
  }

  return examFiles;
}

/**
 * Load and parse a JSON file
 */
function loadJsonFile<T>(filePath: string): T {
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

/**
 * Patterns that reference other options (referents)
 * Note: We distinguish between "Neither" as a standalone answer (e.g., "neither true nor false")
 * and "Neither of the above" which explicitly references other options.
 */
const REFERENT_PATTERNS = [
  /^both\s*(of\s*)?(the\s*)?(above|these|options)$/i,  // "Both of the above" - requires explicit suffix
  /^both\s*equally$/i,                                   // "Both equally"
  /^both$/i,                                             // Just "Both" - typically referent
  /^neither\s+(of\s+)?(the\s+)?(above|these|options)$/i, // "Neither of the above" - requires explicit suffix
  /^all\s*(of\s*)?(the\s*)?(above|these|options)?$/i,   // "All of the above"
  /^none\s*(of\s*)?(the\s*)?(above|these|options)?$/i,  // "None of the above"
];

/**
 * Check if an option is a referent option (references other options)
 * Note: Standalone "Neither" is NOT considered a referent - it's often a valid answer
 * meaning "neither of two concepts" rather than "neither of the above options".
 */
function isReferentOption(option: string): boolean {
  return REFERENT_PATTERNS.some(pattern => pattern.test(option.trim()));
}

/**
 * Validate that referent options come after their referents
 */
function validateReferentOrdering(question: QuizQuestion): string[] {
  const errors: string[] = [];

  if (question.type !== 'multiple_choice' || !question.options) {
    return errors;
  }

  const options = question.options;

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    // Check for "Both" patterns - should have at least 2 non-referent options before it
    if (/^both\s*(of\s*)?(the\s*)?(above|these|options)$/i.test(option.trim()) ||
        /^both\s*equally$/i.test(option.trim()) ||
        /^both$/i.test(option.trim())) {
      // Count non-referent options before this one
      const optionsBefore = options.slice(0, i).filter(o => !isReferentOption(o));
      if (optionsBefore.length < 2) {
        errors.push(
          `"${option}" at index ${i} should come after at least 2 referent options, ` +
          `but only ${optionsBefore.length} non-referent options precede it`
        );
      }
    }

    // Check for "Neither of the above" patterns - should have at least 2 non-referent options before it
    // Note: Standalone "Neither" is NOT flagged - it's often a valid answer (e.g., "neither even nor odd")
    if (/^neither\s+(of\s+)?(the\s+)?(above|these|options)$/i.test(option.trim())) {
      const optionsBefore = options.slice(0, i).filter(o => !isReferentOption(o));
      if (optionsBefore.length < 2) {
        errors.push(
          `"${option}" at index ${i} should come after at least 2 referent options, ` +
          `but only ${optionsBefore.length} non-referent options precede it`
        );
      }
    }
  }

  return errors;
}

describe('Referent Option Ordering Validation', () => {
  describe('quiz files', () => {
    const quizFiles = findQuizFiles(SUBJECTS_DIR);

    it('should find quiz files to validate', () => {
      expect(quizFiles.length).toBeGreaterThan(0);
    });

    it('referent options should come after their referents', () => {
      const allErrors: Array<{
        file: string;
        quizId: string;
        questionId: string;
        errors: string[];
      }> = [];

      for (const filePath of quizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            const errors = validateReferentOrdering(question);
            if (errors.length > 0) {
              allErrors.push({
                file: filePath.replace(SUBJECTS_DIR, ''),
                quizId: quiz.id,
                questionId: question.id,
                errors,
              });
            }
          }
        }
      }

      if (allErrors.length > 0) {
        const errorMessages = allErrors.map(
          e => `${e.file} - ${e.quizId}/${e.questionId}:\n  ${e.errors.join('\n  ')}`
        );
        throw new Error(
          `Found ${allErrors.length} questions with misplaced referent options:\n\n` +
          errorMessages.join('\n\n')
        );
      }
    });
  });

  describe('exam files', () => {
    const examFiles = findExamFiles(SUBJECTS_DIR);

    it('should find exam files to validate', () => {
      expect(examFiles.length).toBeGreaterThan(0);
    });

    it('referent options should come after their referents', () => {
      const allErrors: Array<{
        file: string;
        examId: string;
        questionId: string;
        errors: string[];
      }> = [];

      for (const filePath of examFiles) {
        const exams = loadJsonFile<{ id: string; questions: QuizQuestion[] }[]>(filePath);

        for (const exam of exams) {
          for (const question of exam.questions) {
            const errors = validateReferentOrdering(question);
            if (errors.length > 0) {
              allErrors.push({
                file: filePath.replace(SUBJECTS_DIR, ''),
                examId: exam.id,
                questionId: question.id,
                errors,
              });
            }
          }
        }
      }

      if (allErrors.length > 0) {
        const errorMessages = allErrors.map(
          e => `${e.file} - ${e.examId}/${e.questionId}:\n  ${e.errors.join('\n  ')}`
        );
        throw new Error(
          `Found ${allErrors.length} exam questions with misplaced referent options:\n\n` +
          errorMessages.join('\n\n')
        );
      }
    });
  });

  describe('isReferentOption helper', () => {
    it('identifies "Both of the above" as referent', () => {
      expect(isReferentOption('Both of the above')).toBe(true);
      expect(isReferentOption('Both')).toBe(true);
      expect(isReferentOption('BOTH')).toBe(true);
      expect(isReferentOption('both of these')).toBe(true);
    });

    it('identifies "Both equally" as referent', () => {
      expect(isReferentOption('Both equally')).toBe(true);
    });

    it('identifies "Neither of the above" as referent but not standalone "Neither"', () => {
      expect(isReferentOption('Neither of the above')).toBe(true);
      expect(isReferentOption('Neither of these')).toBe(true);
      // Standalone "Neither" is NOT a referent - it can be a valid answer meaning "neither concept"
      expect(isReferentOption('Neither')).toBe(false);
      expect(isReferentOption('NEITHER')).toBe(false);
    });

    it('identifies "All of the above" as referent', () => {
      expect(isReferentOption('All of the above')).toBe(true);
      expect(isReferentOption('All')).toBe(true);
    });

    it('identifies "None of the above" as referent', () => {
      expect(isReferentOption('None of the above')).toBe(true);
      expect(isReferentOption('None')).toBe(true);
    });

    it('does not identify normal options as referent', () => {
      expect(isReferentOption('O(n)')).toBe(false);
      expect(isReferentOption('True')).toBe(false);
      expect(isReferentOption('RISC')).toBe(false);
      expect(isReferentOption('Regular languages')).toBe(false);
      expect(isReferentOption('Both sides have equal probability')).toBe(false);
    });
  });

  describe('validateReferentOrdering helper', () => {
    it('accepts correctly ordered options with Both at end', () => {
      const question: QuizQuestion = {
        id: 'test-1',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['Option A', 'Option B', 'Both', 'Neither'],
        correctAnswer: 0,
        explanation: 'Test',
      };
      expect(validateReferentOrdering(question)).toHaveLength(0);
    });

    it('rejects Both before referent options', () => {
      const question: QuizQuestion = {
        id: 'test-2',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['Both', 'Option A', 'Option B', 'Neither'],
        correctAnswer: 0,
        explanation: 'Test',
      };
      expect(validateReferentOrdering(question).length).toBeGreaterThan(0);
    });

    it('rejects Both equally before referent options', () => {
      const question: QuizQuestion = {
        id: 'test-3',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['Both equally', 'CISC', 'RISC', 'Neither'],
        correctAnswer: 0,
        explanation: 'Test',
      };
      expect(validateReferentOrdering(question).length).toBeGreaterThan(0);
    });

    it('accepts Both equally after referent options', () => {
      const question: QuizQuestion = {
        id: 'test-4',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['CISC', 'RISC', 'Both equally', 'Neither'],
        correctAnswer: 1,
        explanation: 'Test',
      };
      expect(validateReferentOrdering(question)).toHaveLength(0);
    });

    it('does not apply to non-multiple-choice questions', () => {
      const question: QuizQuestion = {
        id: 'test-5',
        type: 'true_false',
        prompt: 'Test',
        correctAnswer: true,
        explanation: 'Test',
      };
      expect(validateReferentOrdering(question)).toHaveLength(0);
    });
  });
});
