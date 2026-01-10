/**
 * Quiz "All of the Above" Regression Tests
 *
 * This test file verifies that "All of the above" options have been removed
 * from quiz questions and exams. These options are fragile because:
 * 1. They depend on the order of other options
 * 2. If options are reordered, the reference becomes incorrect
 * 3. They encourage lazy question writing rather than testing specific knowledge
 *
 * Instead, all quiz options should be self-contained and not reference other options.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, Exam, QuizQuestion } from '../src/core/types';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

/**
 * Recursively find all JSON files matching a pattern
 */
function findJsonFiles(dir: string, filename: string): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) {
    return files;
  }

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath, filename));
    } else if (entry.name === filename) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Load and parse a JSON file
 */
function loadJsonFile<T>(filePath: string): T {
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

/**
 * Check if an option contains "All of the above" pattern
 */
function containsAllOfAbove(option: string): boolean {
  return /\b[Aa]ll\s+of\s+the\s+above\b/.test(option);
}

/**
 * Extract all multiple choice questions from quizzes
 */
function extractQuizQuestions(quizFiles: string[]): Array<{
  file: string;
  quizId: string;
  question: QuizQuestion;
}> {
  const results: Array<{
    file: string;
    quizId: string;
    question: QuizQuestion;
  }> = [];

  for (const filePath of quizFiles) {
    const quizzes = loadJsonFile<Quiz[]>(filePath);

    for (const quiz of quizzes) {
      for (const question of quiz.questions) {
        if (question.type === 'multiple_choice' && question.options) {
          results.push({
            file: filePath.replace(SUBJECTS_DIR, ''),
            quizId: quiz.id,
            question,
          });
        }
      }
    }
  }

  return results;
}

/**
 * Extract all multiple choice questions from exams
 */
function extractExamQuestions(examFiles: string[]): Array<{
  file: string;
  examId: string;
  question: QuizQuestion;
}> {
  const results: Array<{
    file: string;
    examId: string;
    question: QuizQuestion;
  }> = [];

  for (const filePath of examFiles) {
    const exams = loadJsonFile<Exam[]>(filePath);

    for (const exam of exams) {
      for (const question of exam.questions) {
        if (question.type === 'multiple_choice' && question.options) {
          results.push({
            file: filePath.replace(SUBJECTS_DIR, ''),
            examId: exam.id,
            question,
          });
        }
      }
    }
  }

  return results;
}

describe('Quiz "All of the Above" Regression Tests', () => {
  const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
  const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');

  describe('Setup validation', () => {
    it('finds quiz files to analyze', () => {
      expect(quizFiles.length).toBeGreaterThan(0);
    });

    it('finds exam files to analyze', () => {
      expect(examFiles.length).toBeGreaterThan(0);
    });
  });

  describe('Quiz questions', () => {
    const questions = extractQuizQuestions(quizFiles);

    it('should have multiple choice questions to analyze', () => {
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should have NO quiz questions with "All of the above" options', () => {
      const violations: string[] = [];

      for (const { file, quizId, question } of questions) {
        for (const option of question.options!) {
          if (containsAllOfAbove(option)) {
            violations.push(
              `${file} - ${quizId}/${question.id}: "${option}"`
            );
          }
        }
      }

      if (violations.length > 0) {
        console.log('\nQuiz questions with "All of the above" options:');
        for (const v of violations) {
          console.log(`  ${v}`);
        }
      }

      expect(
        violations,
        'Found quiz questions with "All of the above" options - these should be rewritten with explicit options'
      ).toHaveLength(0);
    });
  });

  describe('Exam questions', () => {
    const questions = extractExamQuestions(examFiles);

    it('should have multiple choice questions to analyze', () => {
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should have NO exam questions with "All of the above" options', () => {
      const violations: string[] = [];

      for (const { file, examId, question } of questions) {
        for (const option of question.options!) {
          if (containsAllOfAbove(option)) {
            violations.push(
              `${file} - ${examId}/${question.id}: "${option}"`
            );
          }
        }
      }

      if (violations.length > 0) {
        console.log('\nExam questions with "All of the above" options:');
        for (const v of violations) {
          console.log(`  ${v}`);
        }
      }

      expect(
        violations,
        'Found exam questions with "All of the above" options - these should be rewritten with explicit options'
      ).toHaveLength(0);
    });
  });

  describe('Statistics', () => {
    it('reports total questions analyzed', () => {
      const quizQuestions = extractQuizQuestions(quizFiles);
      const examQuestions = extractExamQuestions(examFiles);

      console.log('\nMultiple choice questions analyzed:');
      console.log(`  Quiz questions: ${quizQuestions.length}`);
      console.log(`  Exam questions: ${examQuestions.length}`);
      console.log(`  Total: ${quizQuestions.length + examQuestions.length}`);

      // Verify we have a reasonable number of questions
      expect(quizQuestions.length + examQuestions.length).toBeGreaterThan(100);
    });
  });
});
