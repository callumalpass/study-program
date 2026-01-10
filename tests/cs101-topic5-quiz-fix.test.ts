/**
 * CS101 Topic 5 Quiz Fix Validation Tests
 *
 * These tests verify that the cs101-quiz-5b question q5b-5 was correctly
 * converted from a confusing code_output type (with escape sequence in answer)
 * to a clearer multiple_choice format.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';
import { checkAnswer, getCorrectOptionIndex } from '../src/utils/quiz-utils';

const QUIZ_FILE = join(__dirname, '../src/subjects/cs101/content/topic-5/quizzes.json');

describe('CS101 Topic 5 Quiz Fix Validation', () => {
  const quizzes: Quiz[] = JSON.parse(readFileSync(QUIZ_FILE, 'utf-8'));

  describe('cs101-quiz-5b question q5b-5', () => {
    const quiz5b = quizzes.find(q => q.id === 'cs101-quiz-5b');

    it('should find the quiz', () => {
      expect(quiz5b).toBeDefined();
      expect(quiz5b?.id).toBe('cs101-quiz-5b');
    });

    it('should have 5 questions', () => {
      expect(quiz5b?.questions.length).toBe(5);
    });

    const question = quiz5b?.questions.find(q => q.id === 'q5b-5');

    it('should find question q5b-5', () => {
      expect(question).toBeDefined();
      expect(question?.id).toBe('q5b-5');
    });

    it('should be a multiple_choice question (not code_output)', () => {
      expect(question?.type).toBe('multiple_choice');
    });

    it('should have 4 options', () => {
      expect(question?.options).toBeDefined();
      expect(question?.options?.length).toBe(4);
    });

    it('should have correctAnswer as numeric index 0', () => {
      expect(question?.correctAnswer).toBe(0);
    });

    it('should have options that explain the behavior clearly', () => {
      expect(question?.options?.[0]).toContain('preserves the newline');
      expect(question?.options?.[1]).toContain('removes all whitespace');
      expect(question?.options?.[2]).toContain('replaces newline with space');
      expect(question?.options?.[3]).toContain('only the first line');
    });

    it('should have getCorrectOptionIndex return 0', () => {
      if (question) {
        expect(getCorrectOptionIndex(question)).toBe(0);
      }
    });

    it('should mark answer 0 as correct', () => {
      if (question) {
        expect(checkAnswer(question, 0)).toBe(true);
      }
    });

    it('should mark other answers as incorrect', () => {
      if (question) {
        expect(checkAnswer(question, 1)).toBe(false);
        expect(checkAnswer(question, 2)).toBe(false);
        expect(checkAnswer(question, 3)).toBe(false);
      }
    });

    it('should have an explanation about strip() behavior', () => {
      expect(question?.explanation).toContain('strip()');
      expect(question?.explanation).toContain('middle of the string');
    });

    it('should not have codeSnippet (not a code_output question anymore)', () => {
      expect(question?.codeSnippet).toBeUndefined();
    });
  });

  describe('other cs101-quiz-5b questions should be unchanged', () => {
    const quiz5b = quizzes.find(q => q.id === 'cs101-quiz-5b');

    it('q5b-1 should still be multiple_choice about json module', () => {
      const q = quiz5b?.questions.find(q => q.id === 'q5b-1');
      expect(q?.type).toBe('multiple_choice');
      expect(q?.correctAnswer).toBe(0);
      expect(q?.options?.[0]).toBe('json');
    });

    it('q5b-2 should still be code_output about json.loads', () => {
      const q = quiz5b?.questions.find(q => q.id === 'q5b-2');
      expect(q?.type).toBe('code_output');
      expect(q?.correctAnswer).toBe('Alice');
    });

    it('q5b-3 should still be true_false about encoding', () => {
      const q = quiz5b?.questions.find(q => q.id === 'q5b-3');
      expect(q?.type).toBe('true_false');
      expect(q?.correctAnswer).toBe(true);
    });

    it('q5b-4 should still be multiple_choice about csv.DictReader', () => {
      const q = quiz5b?.questions.find(q => q.id === 'q5b-4');
      expect(q?.type).toBe('multiple_choice');
      expect(q?.correctAnswer).toBe(0);
    });
  });

  describe('quiz structure integrity', () => {
    it('should have all 3 quizzes for topic-5', () => {
      expect(quizzes.length).toBe(3);
      expect(quizzes.map(q => q.id)).toEqual([
        'cs101-quiz-5',
        'cs101-quiz-5b',
        'cs101-quiz-5c'
      ]);
    });

    it('all questions should have required fields', () => {
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          expect(question.id).toBeDefined();
          expect(question.type).toBeDefined();
          expect(question.prompt).toBeDefined();
          expect(question.explanation).toBeDefined();

          // Type-specific validations
          if (question.type === 'multiple_choice') {
            expect(question.options).toBeDefined();
            expect(question.options?.length).toBeGreaterThanOrEqual(2);
            expect(typeof question.correctAnswer).toBe('number');
          }

          if (question.type === 'true_false') {
            expect(typeof question.correctAnswer).toBe('boolean');
          }

          if (question.type === 'code_output') {
            expect(typeof question.correctAnswer).toBe('string');
          }
        }
      }
    });

    it('no question should have escape sequences in correctAnswer that would be confusing', () => {
      const problematicQuestions: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'code_output' && typeof question.correctAnswer === 'string') {
            // Check for single escaped newline that isn't part of a larger escape sequence
            if (/^[^\\]*\\n[^\\]*$/.test(question.correctAnswer)) {
              problematicQuestions.push(`${quiz.id}/${question.id}`);
            }
          }
        }
      }

      expect(
        problematicQuestions,
        `Found questions with potentially confusing escape sequences: ${problematicQuestions.join(', ')}`
      ).toHaveLength(0);
    });
  });
});
