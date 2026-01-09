/**
 * Multiple Choice Numeric Index Validation Tests
 *
 * Validates that all multiple_choice questions across all subjects use numeric
 * indices for correctAnswer rather than string values. This ensures consistency
 * and prevents potential bugs in answer checking logic.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

interface QuestionIssue {
  file: string;
  quizId: string;
  questionId: string;
  correctAnswer: unknown;
  expectedIndex: number | null;
  options: string[];
}

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

describe('Multiple Choice Numeric Index Validation', () => {
  describe('Quiz Files', () => {
    const quizFiles = findQuizFiles(SUBJECTS_DIR);

    it('should find quiz files to validate', () => {
      expect(quizFiles.length).toBeGreaterThan(0);
    });

    it('all multiple_choice quiz questions should use numeric correctAnswer indices', () => {
      const issues: QuestionIssue[] = [];

      for (const filePath of quizFiles) {
        const content = readFileSync(filePath, 'utf-8');
        const quizzes = JSON.parse(content) as Quiz[];
        const relativePath = filePath.replace(SUBJECTS_DIR, '');

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            if (question.type === 'multiple_choice' && question.options) {
              if (typeof question.correctAnswer !== 'number') {
                let expectedIndex: number | null = null;
                if (typeof question.correctAnswer === 'string') {
                  const idx = question.options.indexOf(question.correctAnswer);
                  if (idx !== -1) {
                    expectedIndex = idx;
                  }
                }

                issues.push({
                  file: relativePath,
                  quizId: quiz.id,
                  questionId: question.id,
                  correctAnswer: question.correctAnswer,
                  expectedIndex,
                  options: question.options,
                });
              }
            }
          }
        }
      }

      if (issues.length > 0) {
        const issueDetails = issues
          .map(
            (i) =>
              `  ${i.file} - ${i.quizId}/${i.questionId}: correctAnswer="${i.correctAnswer}" (should be ${i.expectedIndex ?? 'unknown'})`
          )
          .join('\n');
        expect.fail(
          `Found ${issues.length} multiple_choice quiz questions with non-numeric correctAnswer:\n${issueDetails}`
        );
      }
    });

    it('all numeric correctAnswer indices should be within bounds', () => {
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

      expect(
        issues,
        `Found out-of-bounds answer indices:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('Exam Files', () => {
    const examFiles = findExamFiles(SUBJECTS_DIR);

    it('should find exam files to validate', () => {
      expect(examFiles.length).toBeGreaterThan(0);
    });

    it('all multiple_choice exam questions should use numeric correctAnswer indices', () => {
      const issues: QuestionIssue[] = [];

      for (const filePath of examFiles) {
        const content = readFileSync(filePath, 'utf-8');
        const exams = JSON.parse(content);
        const relativePath = filePath.replace(SUBJECTS_DIR, '');

        for (const exam of exams) {
          for (const question of exam.questions) {
            if (question.type === 'multiple_choice' && question.options) {
              if (typeof question.correctAnswer !== 'number') {
                let expectedIndex: number | null = null;
                if (typeof question.correctAnswer === 'string') {
                  const idx = question.options.indexOf(question.correctAnswer);
                  if (idx !== -1) {
                    expectedIndex = idx;
                  }
                }

                issues.push({
                  file: relativePath,
                  quizId: exam.id,
                  questionId: question.id,
                  correctAnswer: question.correctAnswer,
                  expectedIndex,
                  options: question.options,
                });
              }
            }
          }
        }
      }

      if (issues.length > 0) {
        const issueDetails = issues
          .map(
            (i) =>
              `  ${i.file} - ${i.quizId}/${i.questionId}: correctAnswer="${i.correctAnswer}" (should be ${i.expectedIndex ?? 'unknown'})`
          )
          .join('\n');
        expect.fail(
          `Found ${issues.length} multiple_choice exam questions with non-numeric correctAnswer:\n${issueDetails}`
        );
      }
    });

    it('all numeric exam correctAnswer indices should be within bounds', () => {
      const issues: string[] = [];

      for (const filePath of examFiles) {
        const content = readFileSync(filePath, 'utf-8');
        const exams = JSON.parse(content);
        const relativePath = filePath.replace(SUBJECTS_DIR, '');

        for (const exam of exams) {
          for (const question of exam.questions) {
            if (question.type === 'multiple_choice' && question.options) {
              const answer = question.correctAnswer;
              if (typeof answer === 'number') {
                if (answer < 0 || answer >= question.options.length) {
                  issues.push(
                    `${relativePath} - ${exam.id}/${question.id}: index ${answer} out of bounds (length: ${question.options.length})`
                  );
                }
              }
            }
          }
        }
      }

      expect(
        issues,
        `Found out-of-bounds answer indices:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('Statistics', () => {
    it('reports multiple choice format statistics', () => {
      const quizFiles = findQuizFiles(SUBJECTS_DIR);
      const examFiles = findExamFiles(SUBJECTS_DIR);

      let totalQuizMC = 0;
      let numericQuizMC = 0;
      let stringQuizMC = 0;

      for (const filePath of quizFiles) {
        const content = readFileSync(filePath, 'utf-8');
        const quizzes = JSON.parse(content) as Quiz[];

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            if (question.type === 'multiple_choice') {
              totalQuizMC++;
              if (typeof question.correctAnswer === 'number') {
                numericQuizMC++;
              } else if (typeof question.correctAnswer === 'string') {
                stringQuizMC++;
              }
            }
          }
        }
      }

      let totalExamMC = 0;
      let numericExamMC = 0;
      let stringExamMC = 0;

      for (const filePath of examFiles) {
        const content = readFileSync(filePath, 'utf-8');
        const exams = JSON.parse(content);

        for (const exam of exams) {
          for (const question of exam.questions) {
            if (question.type === 'multiple_choice') {
              totalExamMC++;
              if (typeof question.correctAnswer === 'number') {
                numericExamMC++;
              } else if (typeof question.correctAnswer === 'string') {
                stringExamMC++;
              }
            }
          }
        }
      }

      console.log(`\nMultiple choice answer format statistics:`);
      console.log(`  Quiz questions: ${totalQuizMC} total`);
      console.log(`    Numeric indices: ${numericQuizMC} (${((numericQuizMC / totalQuizMC) * 100).toFixed(1)}%)`);
      console.log(`    String values: ${stringQuizMC} (${((stringQuizMC / totalQuizMC) * 100).toFixed(1)}%)`);
      console.log(`  Exam questions: ${totalExamMC} total`);
      console.log(`    Numeric indices: ${numericExamMC} (${((numericExamMC / totalExamMC) * 100).toFixed(1)}%)`);
      console.log(`    String values: ${stringExamMC} (${((stringExamMC / totalExamMC) * 100).toFixed(1)}%)`);

      // This test always passes - it's just for reporting
      expect(true).toBe(true);
    });
  });
});
