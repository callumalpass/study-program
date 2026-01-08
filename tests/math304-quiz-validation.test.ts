/**
 * Math304 (Abstract Algebra) Quiz Content Validation
 *
 * Tests to validate mathematical correctness of quiz questions in the Abstract Algebra course.
 */

import { describe, it, expect } from 'vitest';
import type { QuizQuestion } from '../src/core/types';

// Load all math304 quizzes for validation
const math304TopicQuizModules = import.meta.glob(
  '../src/subjects/math304/content/topic-*/quizzes.json',
  { eager: true }
);

const math304Quizzes: Array<{
  id: string;
  questions: QuizQuestion[];
}> = Object.values(math304TopicQuizModules).flatMap(
  (module: unknown) => (module as { default: Array<{ id: string; questions: QuizQuestion[] }> }).default
);

describe('Math304 Abstract Algebra Quiz Validation', () => {
  describe('Group Theory Questions', () => {
    it('should have questions about cyclic groups', () => {
      const cyclicGroupQuestions = math304Quizzes.flatMap(q => q.questions).filter(
        q => q.prompt.toLowerCase().includes('cyclic')
      );
      expect(cyclicGroupQuestions.length).toBeGreaterThan(0);
    });

    it('should have questions about group order', () => {
      const orderQuestions = math304Quizzes.flatMap(q => q.questions).filter(
        q => q.prompt.toLowerCase().includes('order')
      );
      expect(orderQuestions.length).toBeGreaterThan(0);
    });
  });

  describe('Mathematical Correctness - Element Order in Direct Products', () => {
    // This tests the fix for math304-q28
    it('validates element (1,1) in Z₄ × Z₆ has order 12', () => {
      // Find the specific question about order in Z₄ × Z₆
      const question = math304Quizzes.flatMap(q => q.questions).find(
        q => q.id === 'math304-q28'
      );

      expect(question).toBeDefined();
      expect(question?.prompt).toContain('Z₄ × Z₆');

      // The order of (1,1) in Z₄ × Z₆ is lcm(4,6) = 12
      // |1| in Z₄ is 4 (since 1 generates Z₄)
      // |1| in Z₆ is 6 (since 1 generates Z₆)
      // lcm(4,6) = 12
      expect(question?.correctAnswer).toBe('12');
    });

    it('validates the mathematical explanation is correct', () => {
      const question = math304Quizzes.flatMap(q => q.questions).find(
        q => q.id === 'math304-q28'
      );

      expect(question).toBeDefined();
      expect(question?.explanation).toContain('lcm');
      expect(question?.explanation).toContain('4');
      expect(question?.explanation).toContain('6');
    });
  });

  describe('Klein Four-Group Questions', () => {
    it('should correctly identify Klein 4-group as non-cyclic', () => {
      const kleinQuestions = math304Quizzes.flatMap(q => q.questions).filter(
        q => q.prompt.toLowerCase().includes('klein') ||
             q.prompt.includes('V₄') ||
             (q.options?.some(o => o.toLowerCase().includes('klein') || o.includes('V₄')))
      );

      // At least one question should mention Klein 4-group
      expect(kleinQuestions.length).toBeGreaterThan(0);

      // Check that Klein 4-group is correctly identified as non-cyclic when applicable
      const nonCyclicQuestion = kleinQuestions.find(
        q => q.prompt.toLowerCase().includes('not cyclic')
      );

      if (nonCyclicQuestion) {
        // The Klein 4-group should be the correct answer for "not cyclic"
        const kleinOption = nonCyclicQuestion.options?.findIndex(
          o => o.includes('Klein') || o.includes('V₄')
        );

        if (typeof nonCyclicQuestion.correctAnswer === 'string') {
          expect(
            nonCyclicQuestion.correctAnswer.includes('Klein') ||
            nonCyclicQuestion.correctAnswer.includes('V₄')
          ).toBe(true);
        }
      }
    });
  });

  describe('Euler Totient Function Questions', () => {
    it('should have questions using φ(n)', () => {
      const totientQuestions = math304Quizzes.flatMap(q => q.questions).filter(
        q => q.prompt.includes('φ') ||
             q.explanation?.includes('φ') ||
             q.prompt.toLowerCase().includes('totient') ||
             q.prompt.toLowerCase().includes('euler')
      );
      expect(totientQuestions.length).toBeGreaterThan(0);
    });

    it('validates φ(12) = 4 in generator count question', () => {
      const question = math304Quizzes.flatMap(q => q.questions).find(
        q => q.prompt.includes('Z₁₂') && q.prompt.toLowerCase().includes('generator')
      );

      if (question) {
        // φ(12) = φ(4)·φ(3) = 2·2 = 4
        // Generators of Z₁₂ are: 1, 5, 7, 11 (elements coprime to 12)
        expect(question.correctAnswer).toBe('4');
      }
    });
  });

  describe('Direct Product Cyclicity', () => {
    it('validates Z₂ × Z₃ ≅ Z₆ (coprime orders)', () => {
      const question = math304Quizzes.flatMap(q => q.questions).find(
        q => q.prompt.includes('Z₂ × Z₃')
      );

      if (question) {
        // Since gcd(2,3) = 1, the direct product is cyclic and isomorphic to Z₆
        expect(question.correctAnswer).toBe('Z₆');
      }
    });

    it('validates Z₄ × Z₆ is not cyclic (non-coprime orders)', () => {
      const question = math304Quizzes.flatMap(q => q.questions).find(
        q => q.prompt.includes('Z₄ × Z₆') && q.prompt.toLowerCase().includes('cyclic')
      );

      if (question) {
        // Since gcd(4,6) = 2 ≠ 1, the direct product is NOT cyclic
        const correctIndex = typeof question.correctAnswer === 'number'
          ? question.correctAnswer
          : question.options?.indexOf(question.correctAnswer);

        if (correctIndex !== undefined && question.options) {
          expect(question.options[correctIndex].toLowerCase()).toContain('no');
        }
      }
    });
  });

  describe('Subgroup Counting', () => {
    it('validates unique subgroup of order 4 in Z₂₀', () => {
      const question = math304Quizzes.flatMap(q => q.questions).find(
        q => q.prompt.includes('Z₂₀') && q.prompt.includes('order 4')
      );

      if (question) {
        // In Z₂₀, the unique subgroup of order 4 is ⟨5⟩ = {0, 5, 10, 15}
        // Because 20/4 = 5, so the generator is 5
        const answer = typeof question.correctAnswer === 'string'
          ? question.correctAnswer
          : question.options?.[question.correctAnswer as number];
        expect(answer).toContain('⟨5⟩');
      }
    });
  });

  describe('Question Format Validation', () => {
    it('all questions should have valid structure', () => {
      const allQuestions = math304Quizzes.flatMap(q => q.questions);

      allQuestions.forEach(question => {
        expect(question.id).toBeDefined();
        expect(question.type).toBeDefined();
        expect(question.prompt).toBeDefined();
        expect(question.correctAnswer).toBeDefined();
        expect(question.explanation).toBeDefined();

        if (question.type === 'multiple_choice') {
          expect(question.options).toBeDefined();
          expect(question.options?.length).toBeGreaterThanOrEqual(2);
        }
      });
    });

    it('multiple choice answers should reference valid options', () => {
      const mcQuestions = math304Quizzes.flatMap(q => q.questions).filter(
        q => q.type === 'multiple_choice'
      );

      mcQuestions.forEach(question => {
        const answer = question.correctAnswer;

        if (typeof answer === 'number') {
          expect(answer).toBeGreaterThanOrEqual(0);
          expect(answer).toBeLessThan(question.options?.length ?? 0);
        } else if (typeof answer === 'string') {
          // String answer should match one of the options
          expect(question.options).toContain(answer);
        }
      });
    });
  });
});
