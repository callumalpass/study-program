/**
 * Math301 Topic 3 Quiz Content Validation Tests
 *
 * Tests specifically for the math301 topic 3 quiz content (Gradient and Directional Derivatives)
 * to ensure correctAnswer values use numeric indices rather than string values.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const MATH301_TOPIC3_QUIZZES_PATH = join(
  __dirname,
  '../src/subjects/math301/content/topic-3/quizzes.json'
);

function loadQuizzes(): Quiz[] {
  const content = readFileSync(MATH301_TOPIC3_QUIZZES_PATH, 'utf-8');
  return JSON.parse(content) as Quiz[];
}

describe('Math301 Topic 3 Quiz Validation', () => {
  const quizzes = loadQuizzes();

  describe('Multiple Choice Answer Format', () => {
    it('all multiple_choice questions should use numeric correctAnswer indices', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice') {
            if (typeof question.correctAnswer !== 'number') {
              issues.push(
                `${quiz.id}/${question.id}: correctAnswer is "${question.correctAnswer}" (${typeof question.correctAnswer}), expected numeric index`
              );
            }
          }
        }
      }

      expect(
        issues,
        `Found multiple_choice questions with non-numeric correctAnswer:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('all multiple_choice correctAnswer indices should be within bounds', () => {
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

      expect(
        issues,
        `Found out-of-bounds answer indices:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('Specific Question Validations', () => {
    it('math301-q31 (gradient question) should use numeric index', () => {
      let q31: QuizQuestion | undefined;
      for (const quiz of quizzes) {
        q31 = quiz.questions.find((q) => q.id === 'math301-q31');
        if (q31) break;
      }

      expect(q31, 'math301-q31 should exist').toBeDefined();
      expect(q31!.type).toBe('multiple_choice');
      expect(typeof q31!.correctAnswer).toBe('number');
      expect(q31!.correctAnswer).toBe(0);
      expect(q31!.options![0]).toBe('<2x + 2y, 2x + 2y>');
    });

    it('math301-q33 (directional derivative formula) should use numeric index', () => {
      let q33: QuizQuestion | undefined;
      for (const quiz of quizzes) {
        q33 = quiz.questions.find((q) => q.id === 'math301-q33');
        if (q33) break;
      }

      expect(q33, 'math301-q33 should exist').toBeDefined();
      expect(q33!.type).toBe('multiple_choice');
      expect(typeof q33!.correctAnswer).toBe('number');
      expect(q33!.correctAnswer).toBe(0);
      expect(q33!.options![0]).toBe('∇f · u');
    });

    it('math301-q42 (directional derivative calculation) should point to 7/5', () => {
      let q42: QuizQuestion | undefined;
      for (const quiz of quizzes) {
        q42 = quiz.questions.find((q) => q.id === 'math301-q42');
        if (q42) break;
      }

      expect(q42, 'math301-q42 should exist').toBeDefined();
      expect(q42!.type).toBe('multiple_choice');
      expect(typeof q42!.correctAnswer).toBe('number');
      // 7/5 is at index 1 (second option)
      expect(q42!.correctAnswer).toBe(1);
      expect(q42!.options![1]).toBe('7/5');
    });

    it('math301-q44 (normal line equation) should use numeric index', () => {
      let q44: QuizQuestion | undefined;
      for (const quiz of quizzes) {
        q44 = quiz.questions.find((q) => q.id === 'math301-q44');
        if (q44) break;
      }

      expect(q44, 'math301-q44 should exist').toBeDefined();
      expect(q44!.type).toBe('multiple_choice');
      expect(typeof q44!.correctAnswer).toBe('number');
      expect(q44!.correctAnswer).toBe(0);
      expect(q44!.options![0]).toBe('r(t) = <1,1,2> + t<2,2,-1>');
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
                `${quiz.id}/${question.id}: true_false has non-boolean correctAnswer: ${JSON.stringify(question.correctAnswer)}`
              );
            }
          }
        }
      }

      expect(
        issues,
        `Found true_false questions with non-boolean answers:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('math301-q32 should be true', () => {
      let q32: QuizQuestion | undefined;
      for (const quiz of quizzes) {
        q32 = quiz.questions.find((q) => q.id === 'math301-q32');
        if (q32) break;
      }

      expect(q32, 'math301-q32 should exist').toBeDefined();
      expect(q32!.type).toBe('true_false');
      expect(q32!.correctAnswer).toBe(true);
    });
  });

  describe('Quiz Structure', () => {
    it('should have 3 quizzes in topic-3', () => {
      expect(quizzes.length).toBe(3);
    });

    it('each quiz should have 5 questions', () => {
      for (const quiz of quizzes) {
        expect(quiz.questions.length).toBe(5);
      }
    });

    it('all questions should have required fields', () => {
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          expect(question.id, `Question in ${quiz.id} missing id`).toBeDefined();
          expect(question.type, `Question ${question.id} missing type`).toBeDefined();
          expect(question.prompt, `Question ${question.id} missing prompt`).toBeDefined();
          expect(
            question.correctAnswer,
            `Question ${question.id} missing correctAnswer`
          ).toBeDefined();
          expect(
            question.explanation,
            `Question ${question.id} missing explanation`
          ).toBeDefined();
        }
      }
    });
  });
});
