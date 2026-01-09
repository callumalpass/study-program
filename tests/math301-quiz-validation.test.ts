/**
 * Math301 Quiz Content Validation Tests
 *
 * Tests specifically for the math301 quiz content to ensure:
 * 1. Question types match their structure (no fill_blank with options)
 * 2. Math calculations in questions and answers are correct
 * 3. Multiple choice questions have numeric correctAnswer indices
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const MATH301_QUIZZES_PATH = join(__dirname, '../src/subjects/math301/content/topic-1/quizzes.json');

function loadQuizzes(): Quiz[] {
  const content = readFileSync(MATH301_QUIZZES_PATH, 'utf-8');
  return JSON.parse(content) as Quiz[];
}

describe('Math301 Topic 1 Quiz Validation', () => {
  const quizzes = loadQuizzes();

  describe('Question Type Consistency', () => {
    it('fill_blank questions should NOT have options array', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'fill_blank' && question.options) {
            issues.push(
              `${quiz.id}/${question.id}: fill_blank question has options array (should be multiple_choice or remove options)`
            );
          }
        }
      }

      expect(issues, `Found fill_blank questions with options:\n${issues.join('\n')}`).toHaveLength(0);
    });

    it('multiple_choice questions should have options array', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice' && !question.options) {
            issues.push(`${quiz.id}/${question.id}: multiple_choice question missing options`);
          }
        }
      }

      expect(issues, `Found multiple_choice questions without options:\n${issues.join('\n')}`).toHaveLength(0);
    });
  });

  describe('Multiple Choice Answer Index Validity', () => {
    it('multiple_choice correctAnswer should be within options bounds when numeric', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            const answer = question.correctAnswer;
            if (typeof answer === 'number') {
              if (answer < 0 || answer >= question.options.length) {
                issues.push(
                  `${quiz.id}/${question.id}: correctAnswer index ${answer} out of bounds (options length: ${question.options.length})`
                );
              }
            }
          }
        }
      }

      expect(issues, `Found out-of-bounds answer indices:\n${issues.join('\n')}`).toHaveLength(0);
    });

    it('multiple_choice correctAnswer should match an option when string', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            const answer = question.correctAnswer;
            if (typeof answer === 'string') {
              if (!question.options.includes(answer)) {
                issues.push(
                  `${quiz.id}/${question.id}: correctAnswer "${answer}" not found in options: ${JSON.stringify(question.options)}`
                );
              }
            }
          }
        }
      }

      expect(issues, `Found answers not matching any option:\n${issues.join('\n')}`).toHaveLength(0);
    });
  });

  describe('Specific Question Fixes Regression Tests', () => {
    it('math301-q9 should have correct distance calculation', () => {
      // Find the question
      let q9: QuizQuestion | undefined;
      for (const quiz of quizzes) {
        q9 = quiz.questions.find(q => q.id === 'math301-q9');
        if (q9) break;
      }

      expect(q9, 'math301-q9 should exist').toBeDefined();
      expect(q9!.type).toBe('multiple_choice');
      expect(q9!.options).toBeDefined();

      // Verify the math: distance from (2,1,-1) to plane x + 2y - 2z = 3
      // d = |1(2) + 2(1) + (-2)(-1) - 3| / sqrt(1 + 4 + 4)
      // d = |2 + 2 + 2 - 3| / 3 = |3| / 3 = 1
      expect(q9!.prompt).toContain('x + 2y - 2z = 3');

      // Correct answer should be "1" - verify the correct answer points to that value
      const correctIndex = q9!.correctAnswer as number;
      expect(correctIndex).toBeGreaterThanOrEqual(0);
      expect(correctIndex).toBeLessThan(q9!.options!.length);
      expect(q9!.options![correctIndex]).toBe('1');
    });

    it('math301-q10 should be multiple_choice (not fill_blank)', () => {
      // Find the question
      let q10: QuizQuestion | undefined;
      for (const quiz of quizzes) {
        q10 = quiz.questions.find(q => q.id === 'math301-q10');
        if (q10) break;
      }

      expect(q10, 'math301-q10 should exist').toBeDefined();
      expect(q10!.type).toBe('multiple_choice');
      expect(q10!.options).toBeDefined();
      expect(q10!.options).toContain('|r\'(t)|');

      // Correct answer should reference |r'(t)| (the magnitude of the derivative)
      const correctIndex = q10!.correctAnswer as number;
      expect(correctIndex).toBeGreaterThanOrEqual(0);
      expect(correctIndex).toBeLessThan(q10!.options!.length);
      expect(q10!.options![correctIndex]).toBe('|r\'(t)|');
    });
  });

  describe('True/False Questions', () => {
    it('true_false questions should have boolean correctAnswer', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'true_false') {
            if (typeof question.correctAnswer !== 'boolean') {
              issues.push(
                `${quiz.id}/${question.id}: true_false question has non-boolean correctAnswer: ${JSON.stringify(question.correctAnswer)}`
              );
            }
          }
        }
      }

      expect(issues, `Found true_false questions with non-boolean answers:\n${issues.join('\n')}`).toHaveLength(0);
    });
  });

  describe('Quiz Structure', () => {
    it('all quizzes should have required fields', () => {
      for (const quiz of quizzes) {
        expect(quiz.id).toBeDefined();
        expect(quiz.subjectId).toBe('math301');
        expect(quiz.topicId).toBeDefined();
        expect(quiz.title).toBeDefined();
        expect(quiz.questions.length).toBeGreaterThan(0);
      }
    });

    it('all questions should have required fields', () => {
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          expect(question.id, `Question in ${quiz.id} missing id`).toBeDefined();
          expect(question.type, `Question ${question.id} missing type`).toBeDefined();
          expect(question.prompt, `Question ${question.id} missing prompt`).toBeDefined();
          expect(question.correctAnswer, `Question ${question.id} missing correctAnswer`).toBeDefined();
          expect(question.explanation, `Question ${question.id} missing explanation`).toBeDefined();
        }
      }
    });
  });
});

describe('Fill Blank Questions Validation (All Subjects)', () => {
  const { readdirSync, existsSync } = require('fs');
  const SUBJECTS_DIR = join(__dirname, '../src/subjects');

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

  it('fill_blank questions should NOT have options array in any subject', () => {
    const quizFiles = findQuizFiles(SUBJECTS_DIR);
    const issues: string[] = [];

    for (const filePath of quizFiles) {
      const content = readFileSync(filePath, 'utf-8');
      const quizzes = JSON.parse(content) as Quiz[];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'fill_blank' && question.options) {
            issues.push(
              `${filePath.replace(SUBJECTS_DIR, '')} - ${quiz.id}/${question.id}: fill_blank has options`
            );
          }
        }
      }
    }

    expect(
      issues,
      `Found ${issues.length} fill_blank questions with options (should be multiple_choice):\n${issues.join('\n')}`
    ).toHaveLength(0);
  });
});
