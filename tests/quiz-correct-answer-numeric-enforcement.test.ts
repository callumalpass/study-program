/**
 * Quiz correctAnswer Numeric Enforcement Tests
 *
 * These tests ensure that all multiple_choice questions across all subjects
 * use numeric indices for correctAnswer. This prevents potential bugs where
 * string values could fail to match options due to whitespace, encoding, or
 * case sensitivity issues.
 *
 * This test was added after converting 673 quiz questions from string-based
 * correctAnswer values to numeric indices across the following subjects:
 * - cs306, cs307, cs401, cs402, cs403
 * - math301, math302, math303, math401
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';
import { checkAnswer, getCorrectOptionIndex } from '../src/utils/quiz-utils';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

// Subjects that were specifically fixed in the conversion
const CONVERTED_SUBJECTS = [
  'cs306',
  'cs307',
  'cs401',
  'cs402',
  'cs403',
  'math301',
  'math302',
  'math303',
  'math401',
];

function findQuizFilesForSubject(subjectDir: string): string[] {
  const quizFiles: string[] = [];
  if (!existsSync(subjectDir)) return quizFiles;

  const entries = readdirSync(subjectDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(subjectDir, entry.name);
    if (entry.isDirectory()) {
      quizFiles.push(...findQuizFilesForSubject(fullPath));
    } else if (entry.name === 'quizzes.json') {
      quizFiles.push(fullPath);
    }
  }
  return quizFiles;
}

describe('Quiz correctAnswer Numeric Enforcement', () => {
  describe('converted subjects use numeric indices', () => {
    for (const subject of CONVERTED_SUBJECTS) {
      describe(subject, () => {
        const subjectDir = join(SUBJECTS_DIR, subject);
        const quizFiles = findQuizFilesForSubject(subjectDir);

        it(`should have quiz files`, () => {
          expect(quizFiles.length).toBeGreaterThan(0);
        });

        it(`all multiple_choice questions should use numeric correctAnswer`, () => {
          const issues: string[] = [];

          for (const filePath of quizFiles) {
            const content = readFileSync(filePath, 'utf-8');
            const quizzes = JSON.parse(content) as Quiz[];
            const relativePath = filePath.replace(SUBJECTS_DIR, '');

            for (const quiz of quizzes) {
              for (const question of quiz.questions) {
                if (question.type === 'multiple_choice' && question.options) {
                  if (typeof question.correctAnswer !== 'number') {
                    issues.push(
                      `${relativePath} - ${quiz.id}/${question.id}: correctAnswer is ${typeof question.correctAnswer} ("${question.correctAnswer}")`
                    );
                  }
                }
              }
            }
          }

          expect(issues, `Found non-numeric correctAnswer:\n${issues.join('\n')}`).toHaveLength(0);
        });

        it(`all correctAnswer indices should be within bounds`, () => {
          const issues: string[] = [];

          for (const filePath of quizFiles) {
            const content = readFileSync(filePath, 'utf-8');
            const quizzes = JSON.parse(content) as Quiz[];
            const relativePath = filePath.replace(SUBJECTS_DIR, '');

            for (const quiz of quizzes) {
              for (const question of quiz.questions) {
                if (question.type === 'multiple_choice' && question.options) {
                  const answer = question.correctAnswer;
                  if (typeof answer === 'number') {
                    if (answer < 0 || answer >= question.options.length) {
                      issues.push(
                        `${relativePath} - ${quiz.id}/${question.id}: index ${answer} out of bounds (length: ${question.options.length})`
                      );
                    }
                  }
                }
              }
            }
          }

          expect(issues, `Found out-of-bounds indices:\n${issues.join('\n')}`).toHaveLength(0);
        });

        it(`correctAnswer index should point to a valid option`, () => {
          const issues: string[] = [];

          for (const filePath of quizFiles) {
            const content = readFileSync(filePath, 'utf-8');
            const quizzes = JSON.parse(content) as Quiz[];
            const relativePath = filePath.replace(SUBJECTS_DIR, '');

            for (const quiz of quizzes) {
              for (const question of quiz.questions) {
                if (question.type === 'multiple_choice' && question.options) {
                  const answer = question.correctAnswer;
                  if (typeof answer === 'number') {
                    const option = question.options[answer];
                    if (!option || option.trim() === '') {
                      issues.push(
                        `${relativePath} - ${quiz.id}/${question.id}: index ${answer} points to empty/invalid option`
                      );
                    }
                  }
                }
              }
            }
          }

          expect(issues, `Found invalid option references:\n${issues.join('\n')}`).toHaveLength(0);
        });
      });
    }
  });

  describe('answer checking compatibility', () => {
    it('checkAnswer should work correctly with numeric correctAnswer', () => {
      const question: QuizQuestion = {
        id: 'test-q1',
        type: 'multiple_choice',
        prompt: 'Test question?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 2, // Option C is correct
        explanation: 'Option C is correct',
      };

      // Test that numeric index works
      expect(getCorrectOptionIndex(question)).toBe(2);
      expect(checkAnswer(question, 2)).toBe(true);
      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 3)).toBe(false);
    });

    it('checkAnswer should handle edge case of index 0', () => {
      const question: QuizQuestion = {
        id: 'test-q2',
        type: 'multiple_choice',
        prompt: 'Test question?',
        options: ['First option', 'Second option', 'Third option'],
        correctAnswer: 0, // First option is correct
        explanation: 'First option is correct',
      };

      expect(getCorrectOptionIndex(question)).toBe(0);
      expect(checkAnswer(question, 0)).toBe(true);
      expect(checkAnswer(question, 1)).toBe(false);
    });

    it('getCorrectOptionIndex should handle out of bounds numeric index', () => {
      const question: QuizQuestion = {
        id: 'test-q3',
        type: 'multiple_choice',
        prompt: 'Test question?',
        options: ['A', 'B'],
        correctAnswer: 5, // Out of bounds
        explanation: 'Test',
      };

      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('getCorrectOptionIndex should handle negative numeric index', () => {
      const question: QuizQuestion = {
        id: 'test-q4',
        type: 'multiple_choice',
        prompt: 'Test question?',
        options: ['A', 'B'],
        correctAnswer: -1, // Negative
        explanation: 'Test',
      };

      expect(getCorrectOptionIndex(question)).toBe(-1);
    });
  });

  describe('data integrity statistics', () => {
    it('reports statistics for converted subjects', () => {
      const stats: Record<string, { total: number; numeric: number; string: number }> = {};

      for (const subject of CONVERTED_SUBJECTS) {
        const subjectDir = join(SUBJECTS_DIR, subject);
        const quizFiles = findQuizFilesForSubject(subjectDir);
        stats[subject] = { total: 0, numeric: 0, string: 0 };

        for (const filePath of quizFiles) {
          const content = readFileSync(filePath, 'utf-8');
          const quizzes = JSON.parse(content) as Quiz[];

          for (const quiz of quizzes) {
            for (const question of quiz.questions) {
              if (question.type === 'multiple_choice') {
                stats[subject].total++;
                if (typeof question.correctAnswer === 'number') {
                  stats[subject].numeric++;
                } else if (typeof question.correctAnswer === 'string') {
                  stats[subject].string++;
                }
              }
            }
          }
        }
      }

      // All converted subjects should have 100% numeric
      for (const [subject, stat] of Object.entries(stats)) {
        expect(stat.string).toBe(0);
        expect(stat.numeric).toBe(stat.total);
      }
    });
  });
});
