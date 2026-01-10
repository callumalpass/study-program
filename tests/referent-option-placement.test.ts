/**
 * Referent Option Placement Validation Tests
 *
 * These tests ensure that options like "Both of the above", "Neither of the above",
 * "All of the above", and similar referent options are properly placed at the end
 * of the options list, not in the middle or beginning.
 *
 * A "referent option" refers to other options in the list, so it must come after
 * the options it references to make logical sense.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

/**
 * Patterns that identify referent options (options that refer to other options)
 */
const REFERENT_PATTERNS = [
  /^both\s+of\s+the\s+above$/i,
  /^neither\s+of\s+the\s+above$/i,
  /^all\s+of\s+the\s+above$/i,
  /^none\s+of\s+the\s+above$/i,
  /^both\s+\(?a\)?\s*(?:and|&)\s*\(?b\)?$/i,
  /^both\s+\(?1\)?\s*(?:and|&)\s*\(?2\)?$/i,
  /^all\s+of\s+these$/i,
  /^none\s+of\s+these$/i,
  /^both\s+(?:options?\s+)?(?:a\s*(?:and|&)\s*b|1\s*(?:and|&)\s*2)$/i,
];

/**
 * Check if an option is a referent option (refers to other options)
 */
function isReferentOption(option: string): boolean {
  const normalized = option.trim();
  return REFERENT_PATTERNS.some((pattern) => pattern.test(normalized));
}

/**
 * Get the index of the first referent option in the options list
 * Returns -1 if no referent option is found
 */
function findReferentOptionIndex(options: string[]): number {
  for (let i = 0; i < options.length; i++) {
    if (isReferentOption(options[i])) {
      return i;
    }
  }
  return -1;
}

/**
 * Check if a referent option is properly placed (at the end of the options list)
 * Returns an error message if misplaced, null if properly placed
 */
function validateReferentPlacement(
  question: QuizQuestion,
  quizId: string,
  filePath: string
): string | null {
  if (question.type !== 'multiple_choice' || !question.options) {
    return null;
  }

  const referentIndex = findReferentOptionIndex(question.options);
  if (referentIndex === -1) {
    return null; // No referent option found
  }

  const lastIndex = question.options.length - 1;
  const secondLastIndex = question.options.length - 2;

  // Referent options should be at the end (last or second-to-last if there's also a "Neither")
  // For "Both of the above", it should be at index >= (options.length - 2)
  // because "Neither" might come after it
  if (referentIndex < secondLastIndex) {
    const referentOption = question.options[referentIndex];
    return (
      `${filePath.replace(SUBJECTS_DIR, '')} - ${quizId}/${question.id}: ` +
      `"${referentOption}" at index ${referentIndex} should be at end (index ${lastIndex} or ${secondLastIndex}) ` +
      `of ${question.options.length} options`
    );
  }

  return null;
}

/**
 * Recursively find all quiz JSON files
 */
function findQuizFiles(dir: string): string[] {
  const quizFiles: string[] = [];
  if (!existsSync(dir)) return quizFiles;

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
  if (!existsSync(dir)) return examFiles;

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

function loadJsonFile<T>(filePath: string): T {
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

describe('Referent Option Placement Validation', () => {
  describe('pattern detection', () => {
    it('should detect "Both of the above"', () => {
      expect(isReferentOption('Both of the above')).toBe(true);
      expect(isReferentOption('BOTH OF THE ABOVE')).toBe(true);
      expect(isReferentOption('both of the above')).toBe(true);
    });

    it('should detect "Neither of the above"', () => {
      expect(isReferentOption('Neither of the above')).toBe(true);
      expect(isReferentOption('NEITHER OF THE ABOVE')).toBe(true);
    });

    it('should detect "All of the above"', () => {
      expect(isReferentOption('All of the above')).toBe(true);
      expect(isReferentOption('ALL OF THE ABOVE')).toBe(true);
    });

    it('should detect "None of the above"', () => {
      expect(isReferentOption('None of the above')).toBe(true);
      expect(isReferentOption('NONE OF THE ABOVE')).toBe(true);
    });

    it('should detect "All of these" and "None of these"', () => {
      expect(isReferentOption('All of these')).toBe(true);
      expect(isReferentOption('None of these')).toBe(true);
    });

    it('should NOT detect normal options', () => {
      expect(isReferentOption('Option A')).toBe(false);
      expect(isReferentOption('True')).toBe(false);
      expect(isReferentOption('The answer is 42')).toBe(false);
      expect(isReferentOption('Above average')).toBe(false);
      expect(isReferentOption('Neither true nor false')).toBe(false);
    });
  });

  describe('quiz referent option placement', () => {
    const quizFiles = findQuizFiles(SUBJECTS_DIR);

    it('should find quiz files to validate', () => {
      expect(quizFiles.length).toBeGreaterThan(0);
    });

    it('all quiz referent options should be at the end of options list', () => {
      const errors: string[] = [];

      for (const filePath of quizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            const error = validateReferentPlacement(question, quiz.id, filePath);
            if (error) {
              errors.push(error);
            }
          }
        }
      }

      expect(
        errors,
        `Found ${errors.length} misplaced referent options:\n${errors.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('exam referent option placement', () => {
    const examFiles = findExamFiles(SUBJECTS_DIR);

    it('should find exam files to validate', () => {
      expect(examFiles.length).toBeGreaterThan(0);
    });

    it('all exam referent options should be at the end of options list', () => {
      const errors: string[] = [];

      for (const filePath of examFiles) {
        const exams = loadJsonFile<{ id: string; questions: QuizQuestion[] }[]>(filePath);

        for (const exam of exams) {
          for (const question of exam.questions) {
            const error = validateReferentPlacement(question, exam.id, filePath);
            if (error) {
              errors.push(error);
            }
          }
        }
      }

      expect(
        errors,
        `Found ${errors.length} misplaced referent options in exams:\n${errors.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    it('should allow referent option at last position', () => {
      const question: QuizQuestion = {
        id: 'test-1',
        type: 'multiple_choice',
        prompt: 'Test question',
        options: ['Option A', 'Option B', 'Both of the above'],
        correctAnswer: 2,
        explanation: 'Test',
      };

      const error = validateReferentPlacement(question, 'test-quiz', '/test/path');
      expect(error).toBeNull();
    });

    it('should allow referent option at second-to-last position', () => {
      const question: QuizQuestion = {
        id: 'test-2',
        type: 'multiple_choice',
        prompt: 'Test question',
        options: ['Option A', 'Option B', 'Both of the above', 'Neither'],
        correctAnswer: 2,
        explanation: 'Test',
      };

      const error = validateReferentPlacement(question, 'test-quiz', '/test/path');
      expect(error).toBeNull();
    });

    it('should flag referent option in the middle', () => {
      const question: QuizQuestion = {
        id: 'test-3',
        type: 'multiple_choice',
        prompt: 'Test question',
        options: ['Option A', 'Both of the above', 'Option C', 'Option D'],
        correctAnswer: 1,
        explanation: 'Test',
      };

      const error = validateReferentPlacement(question, 'test-quiz', '/test/path');
      expect(error).not.toBeNull();
      expect(error).toContain('Both of the above');
      expect(error).toContain('index 1');
    });

    it('should flag referent option at the beginning', () => {
      const question: QuizQuestion = {
        id: 'test-4',
        type: 'multiple_choice',
        prompt: 'Test question',
        options: ['All of the above', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'Test',
      };

      const error = validateReferentPlacement(question, 'test-quiz', '/test/path');
      expect(error).not.toBeNull();
      expect(error).toContain('All of the above');
      expect(error).toContain('index 0');
    });

    it('should not flag non-multiple_choice questions', () => {
      const question: QuizQuestion = {
        id: 'test-5',
        type: 'true_false',
        prompt: 'Both of the above are true',
        correctAnswer: true,
        explanation: 'Test',
      };

      const error = validateReferentPlacement(question, 'test-quiz', '/test/path');
      expect(error).toBeNull();
    });

    it('should not flag questions without options', () => {
      const question: QuizQuestion = {
        id: 'test-6',
        type: 'fill_blank',
        prompt: 'The answer is ____',
        correctAnswer: 'test',
        explanation: 'Test',
      };

      const error = validateReferentPlacement(question, 'test-quiz', '/test/path');
      expect(error).toBeNull();
    });
  });

  describe('statistics', () => {
    const quizFiles = findQuizFiles(SUBJECTS_DIR);
    const examFiles = findExamFiles(SUBJECTS_DIR);

    it('reports referent option usage in quizzes', () => {
      let totalQuestions = 0;
      let questionsWithReferents = 0;

      for (const filePath of quizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);
        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            if (question.type === 'multiple_choice' && question.options) {
              totalQuestions++;
              if (findReferentOptionIndex(question.options) !== -1) {
                questionsWithReferents++;
              }
            }
          }
        }
      }

      console.log(
        `\nQuiz statistics: ${questionsWithReferents}/${totalQuestions} multiple choice questions use referent options`
      );
      expect(totalQuestions).toBeGreaterThan(0);
    });

    it('reports referent option usage in exams', () => {
      let totalQuestions = 0;
      let questionsWithReferents = 0;

      for (const filePath of examFiles) {
        const exams = loadJsonFile<{ questions: QuizQuestion[] }[]>(filePath);
        for (const exam of exams) {
          for (const question of exam.questions) {
            if (question.type === 'multiple_choice' && question.options) {
              totalQuestions++;
              if (findReferentOptionIndex(question.options) !== -1) {
                questionsWithReferents++;
              }
            }
          }
        }
      }

      console.log(
        `\nExam statistics: ${questionsWithReferents}/${totalQuestions} multiple choice questions use referent options`
      );
      expect(totalQuestions).toBeGreaterThan(0);
    });
  });
});
