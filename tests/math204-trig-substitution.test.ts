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

/** Helper to get the correct answer text for a multiple choice question */
function getCorrectAnswerText(q: QuizQuestion): string {
  if (typeof q.correctAnswer === 'number' && q.options) {
    return q.options[q.correctAnswer];
  }
  return String(q.correctAnswer);
}

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

      // Verify the correct answer contains sin
      expect(getCorrectAnswerText(question!)).toContain('sin');
    });

    it('math204-q3b-3: √(x² + a²) uses x = a tan θ', () => {
      const question = findQuestion('math204-q3b-3');
      expect(question).toBeDefined();
      expect(question?.type).toBe('multiple_choice');

      // Verify the correct answer contains tan
      expect(getCorrectAnswerText(question!)).toContain('tan');
    });

    it('math204-q3b-5: √(x² - a²) uses x = a sec θ (converted from fill_blank)', () => {
      const question = findQuestion('math204-q3b-5');
      expect(question).toBeDefined();

      // This question was converted from fill_blank to multiple_choice
      expect(question?.type).toBe('multiple_choice');

      // Verify the correct answer contains sec
      expect(getCorrectAnswerText(question!)).toContain('sec');

      // Verify all options are present
      expect(question?.options).toHaveLength(4);
      expect(question?.options?.some(opt => opt.includes('sin'))).toBe(true);
      expect(question?.options?.some(opt => opt.includes('tan'))).toBe(true);
      expect(question?.options?.some(opt => opt.includes('sec'))).toBe(true);
      expect(question?.options?.some(opt => opt.includes('cos'))).toBe(true);
    });
  });

  describe('Answer Validation', () => {
    it('correct answer for √(x² - a²) substitution should be validated properly', () => {
      const question = findQuestion('math204-q3b-5');
      expect(question).toBeDefined();

      if (question) {
        const correctIndex = question.correctAnswer as number;

        // Correct answer should be validated properly
        expect(checkAnswer(question, correctIndex)).toBe(true);

        // Wrong answers
        [0, 1, 2, 3].forEach(idx => {
          if (idx !== correctIndex) {
            expect(checkAnswer(question, idx)).toBe(false);
          }
        });
      }
    });

    it('getCorrectOptionIndex should return a valid index for trig substitution question', () => {
      const question = findQuestion('math204-q3b-5');
      expect(question).toBeDefined();

      if (question) {
        const correctIndex = getCorrectOptionIndex(question);
        expect(correctIndex).toBeGreaterThanOrEqual(0);
        expect(correctIndex).toBeLessThan(4);
        // The correct option should contain "sec"
        expect(question.options?.[correctIndex]).toContain('sec');
      }
    });
  });

  describe('Mathematical Correctness', () => {
    it('all trig substitution rules map to correct identities', () => {
      // √(a² - x²) → x = a sin θ → √(a²(1 - sin²θ)) = a cos θ
      const q1 = findQuestion('math204-q3b-1');
      expect(getCorrectAnswerText(q1!)).toContain('sin');

      // √(x² + a²) → x = a tan θ → √(a²(tan²θ + 1)) = a sec θ
      const q3 = findQuestion('math204-q3b-3');
      expect(getCorrectAnswerText(q3!)).toContain('tan');

      // √(x² - a²) → x = a sec θ → √(a²(sec²θ - 1)) = a tan θ
      const q5 = findQuestion('math204-q3b-5');
      expect(getCorrectAnswerText(q5!)).toContain('sec');
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
