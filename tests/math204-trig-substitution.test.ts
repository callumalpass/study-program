/**
 * Math204 Trigonometric Substitution Tests
 *
 * Tests to validate the trigonometric substitution quiz questions in Math204.
 * Includes validation of the converted fill_blank to multiple_choice question.
 */

import { describe, it, expect } from 'vitest';
import { checkAnswer, getCorrectOptionIndex } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

// Load Math204 Topic 3 quizzes
import math204Topic3Quizzes from '../src/subjects/math204/content/topic-3/quizzes.json';

describe('Math204 Trigonometric Substitution Questions', () => {
  // Helper to find a question by ID
  function findQuestion(id: string): QuizQuestion | undefined {
    return math204Topic3Quizzes
      .flatMap((quiz: { questions: QuizQuestion[] }) => quiz.questions)
      .find((q: QuizQuestion) => q.id === id);
  }

  describe('Trig Substitution Rules', () => {
    it('math204-q3b-1: √(a² - x²) uses x = a sin θ', () => {
      const question = findQuestion('math204-q3b-1');
      expect(question).toBeDefined();
      expect(question?.type).toBe('multiple_choice');
      expect(question?.correctAnswer).toBe(1); // $a \sin \theta$

      // Verify the correct option text
      expect(question?.options?.[1]).toContain('sin');
    });

    it('math204-q3b-3: √(x² + a²) uses x = a tan θ', () => {
      const question = findQuestion('math204-q3b-3');
      expect(question).toBeDefined();
      expect(question?.type).toBe('multiple_choice');
      expect(question?.correctAnswer).toBe(1); // $a \tan \theta$

      // Verify the correct option text
      expect(question?.options?.[1]).toContain('tan');
    });

    it('math204-q3b-5: √(x² - a²) uses x = a sec θ (converted from fill_blank)', () => {
      const question = findQuestion('math204-q3b-5');
      expect(question).toBeDefined();

      // This question was converted from fill_blank to multiple_choice
      expect(question?.type).toBe('multiple_choice');
      expect(question?.correctAnswer).toBe(2); // $a \sec \theta$

      // Verify all options are present
      expect(question?.options).toHaveLength(4);
      expect(question?.options?.[0]).toContain('sin');
      expect(question?.options?.[1]).toContain('tan');
      expect(question?.options?.[2]).toContain('sec');
      expect(question?.options?.[3]).toContain('cos');

      // Verify the correct option text
      expect(question?.options?.[2]).toContain('sec');
    });
  });

  describe('Answer Validation', () => {
    it('correct answer for √(x² - a²) substitution should be validated properly', () => {
      const question = findQuestion('math204-q3b-5');
      expect(question).toBeDefined();

      if (question) {
        // Correct answer (index 2)
        expect(checkAnswer(question, 2)).toBe(true);

        // Wrong answers
        expect(checkAnswer(question, 0)).toBe(false); // sin θ
        expect(checkAnswer(question, 1)).toBe(false); // tan θ
        expect(checkAnswer(question, 3)).toBe(false); // cos θ
      }
    });

    it('getCorrectOptionIndex should return correct index for trig substitution question', () => {
      const question = findQuestion('math204-q3b-5');
      expect(question).toBeDefined();

      if (question) {
        const correctIndex = getCorrectOptionIndex(question);
        expect(correctIndex).toBe(2);
      }
    });
  });

  describe('Mathematical Correctness', () => {
    it('all trig substitution rules map to correct identities', () => {
      // √(a² - x²) → x = a sin θ → √(a²(1 - sin²θ)) = a cos θ
      const q1 = findQuestion('math204-q3b-1');
      expect(q1?.correctAnswer).toBe(1); // sin option

      // √(x² + a²) → x = a tan θ → √(a²(tan²θ + 1)) = a sec θ
      const q3 = findQuestion('math204-q3b-3');
      expect(q3?.correctAnswer).toBe(1); // tan option

      // √(x² - a²) → x = a sec θ → √(a²(sec²θ - 1)) = a tan θ
      const q5 = findQuestion('math204-q3b-5');
      expect(q5?.correctAnswer).toBe(2); // sec option (index 2)
    });

    it('question explanations reference correct Pythagorean identities', () => {
      const q1 = findQuestion('math204-q3b-1');
      expect(q1?.explanation).toBeDefined();
      // Should reference sin²θ + cos²θ = 1 (rearranged as 1 - sin²θ = cos²θ)

      const q3 = findQuestion('math204-q3b-3');
      expect(q3?.explanation).toBeDefined();
      // Should reference tan²θ + 1 = sec²θ

      const q5 = findQuestion('math204-q3b-5');
      expect(q5?.explanation).toBeDefined();
      // Should reference sec²θ - 1 = tan²θ
      expect(q5?.explanation).toContain('sec');
      expect(q5?.explanation).toContain('tan');
    });
  });

  describe('Question Structure Validation', () => {
    it('all questions in quiz 3b have required fields', () => {
      const quiz3b = math204Topic3Quizzes.find(
        (q: { id: string }) => q.id === 'math204-quiz-3b'
      );
      expect(quiz3b).toBeDefined();

      quiz3b?.questions.forEach((question: QuizQuestion) => {
        expect(question.id).toBeDefined();
        expect(question.type).toBeDefined();
        expect(question.prompt).toBeDefined();
        expect(question.correctAnswer).toBeDefined();
        expect(question.explanation).toBeDefined();

        if (question.type === 'multiple_choice') {
          expect(question.options).toBeDefined();
          expect(question.options?.length).toBeGreaterThanOrEqual(2);

          // Ensure correctAnswer is a valid index
          if (typeof question.correctAnswer === 'number') {
            expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
            expect(question.correctAnswer).toBeLessThan(question.options!.length);
          }
        }
      });
    });

    it('converted question (math204-q3b-5) has valid structure', () => {
      const question = findQuestion('math204-q3b-5');
      expect(question).toBeDefined();

      // Should be multiple_choice now, not fill_blank
      expect(question?.type).toBe('multiple_choice');

      // Should have 4 options
      expect(question?.options).toHaveLength(4);

      // correctAnswer should be a number between 0 and 3
      expect(typeof question?.correctAnswer).toBe('number');
      expect(question?.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(question?.correctAnswer).toBeLessThan(4);
    });
  });
});
