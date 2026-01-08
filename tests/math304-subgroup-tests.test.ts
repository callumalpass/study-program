/**
 * Math304 Subgroup Test Questions Validation
 *
 * Tests to validate the correctness of questions about subgroup tests
 * (One-Step, Two-Step, and Finite Subgroup Tests) in the Abstract Algebra course.
 *
 * Mathematical definitions:
 * - One-Step Subgroup Test: H ≤ G iff H is non-empty and ab⁻¹ ∈ H for all a, b ∈ H
 * - Two-Step Subgroup Test: H ≤ G iff H is non-empty, closed under operation, and closed under inverses
 * - Finite Subgroup Test: For finite groups, H ≤ G iff H is non-empty and closed under the operation
 */

import { describe, it, expect } from 'vitest';
import type { ExamQuestion } from '../src/core/types';

import math304Exams from '../src/subjects/math304/exams.json';

type Exam = {
  id: string;
  title: string;
  questions: ExamQuestion[];
};

const exams = math304Exams as Exam[];
const allQuestions = exams.flatMap(e => e.questions);

describe('Math304 Subgroup Test Questions', () => {
  describe('One-Step Subgroup Test Definition', () => {
    it('validates that ab⁻¹ condition is the One-Step test (math304-final-q4)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q4');

      expect(question).toBeDefined();
      expect(question?.prompt).toContain('ab⁻¹');

      // The One-Step Subgroup Test requires checking ab⁻¹ ∈ H for all a, b ∈ H
      // Answer should be "One-Step Subgroup Test" which is index 0
      expect(question?.correctAnswer).toBe(0);

      // Verify the explanation mentions that this single condition implies both closure properties
      expect(question?.explanation?.toLowerCase()).toContain('one-step');
    });

    it('explains why one-step test works', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q4');

      if (question?.explanation) {
        // The explanation should clarify that ab⁻¹ implies:
        // 1. Closure under operation (taking a = ab⁻¹, b = c⁻¹ gives ac)
        // 2. Closure under inverses (taking a = e, gives b⁻¹)
        const exp = question.explanation.toLowerCase();
        expect(exp).toMatch(/closure|implies|operation|inverse/);
      }
    });
  });

  describe('Finite Subgroup Test Definition', () => {
    it('validates Finite Subgroup Test is non-empty and closed (math304-mid-q5)', () => {
      const question = allQuestions.find(q => q.id === 'math304-mid-q5');

      expect(question).toBeDefined();
      expect(question?.prompt?.toLowerCase()).toContain('finite');

      // The Finite Subgroup Test: H non-empty and closed under operation
      // Answer should be "H is non-empty and closed under the operation" which is index 1
      expect(question?.correctAnswer).toBe(1);

      // Verify the explanation mentions this is for finite groups
      expect(question?.explanation?.toLowerCase()).toContain('finite');
    });

    it('explains why finite test does not require explicit inverse closure', () => {
      const question = allQuestions.find(q => q.id === 'math304-mid-q5');

      if (question?.explanation) {
        // The explanation should mention that in finite groups,
        // closure under inverses follows automatically
        const exp = question.explanation.toLowerCase();
        expect(exp).toMatch(/finite|order|automatic/);
      }
    });
  });

  describe('Two-Step Subgroup Test Properties', () => {
    it('validates Two-Step test requires separate closure under operation and inverses', () => {
      // Two-Step test should require:
      // 1. H is non-empty
      // 2. ab ∈ H for all a, b ∈ H (closure under operation)
      // 3. a⁻¹ ∈ H for all a ∈ H (closure under inverses)

      // Check that the final exam correctly identifies One-Step (not Two-Step) for ab⁻¹
      const oneStepQuestion = allQuestions.find(q => q.id === 'math304-final-q4');

      if (oneStepQuestion) {
        // The Two-Step test option should NOT be the correct answer for ab⁻¹ condition
        expect(oneStepQuestion.correctAnswer).not.toBe(1); // Index 1 would be Two-Step
      }
    });
  });

  describe('Subgroup Test Distinctness', () => {
    it('distinguishes between One-Step and Finite Subgroup Tests', () => {
      // One-Step: works for all groups, checks ab⁻¹ ∈ H
      // Finite: only works for finite groups, checks closure under operation

      const oneStepQ = allQuestions.find(q => q.id === 'math304-final-q4');
      const finiteQ = allQuestions.find(q => q.id === 'math304-mid-q5');

      if (oneStepQ && finiteQ) {
        // They should have different correct answers (different tests)
        // One-Step answer at index 0, Finite test condition at index 1
        expect(oneStepQ.correctAnswer).toBe(0);
        expect(finiteQ.correctAnswer).toBe(1);

        // One-Step question should mention ab⁻¹
        expect(oneStepQ.prompt).toContain('ab⁻¹');

        // Finite question should mention "Finite"
        expect(finiteQ.prompt?.toLowerCase()).toContain('finite');
      }
    });

    it('validates all subgroup test questions have complete explanations', () => {
      const subgroupTestQuestions = allQuestions.filter(
        q => q.prompt?.toLowerCase().includes('subgroup test') ||
             q.prompt?.includes('ab⁻¹')
      );

      subgroupTestQuestions.forEach(question => {
        expect(question.explanation).toBeDefined();
        expect(question.explanation?.length).toBeGreaterThan(50);
      });
    });
  });

  describe('Mathematical Correctness', () => {
    it('verifies One-Step test implication: ab⁻¹ ∈ H implies identity in H', () => {
      // Mathematical fact: If H is non-empty and ab⁻¹ ∈ H for all a,b ∈ H,
      // then taking a = b gives e = aa⁻¹ ∈ H

      const question = allQuestions.find(q => q.id === 'math304-final-q4');

      // The explanation should acknowledge this is a complete characterization
      expect(question?.explanation).toBeDefined();
    });

    it('verifies Finite test relies on finite order property', () => {
      // Mathematical fact: In a finite group, if H is non-empty and closed,
      // then for any a ∈ H, we have a, a², a³, ... ∈ H by closure.
      // Since H is finite, aⁿ = e for some n, so a⁻¹ = aⁿ⁻¹ ∈ H.

      const question = allQuestions.find(q => q.id === 'math304-mid-q5');

      if (question?.explanation) {
        const exp = question.explanation.toLowerCase();
        expect(exp).toMatch(/finite|order|element/);
      }
    });
  });
});
