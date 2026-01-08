/**
 * Math304 (Abstract Algebra) Exam Content Validation
 *
 * Tests to validate mathematical correctness of exam questions in the Abstract Algebra course.
 */

import { describe, it, expect } from 'vitest';
import type { ExamQuestion } from '../src/core/types';

// Load math304 exams for validation
import math304Exams from '../src/subjects/math304/exams.json';

type Exam = {
  id: string;
  title: string;
  questions: ExamQuestion[];
};

const exams = math304Exams as Exam[];
const allQuestions = exams.flatMap(e => e.questions);

describe('Math304 Abstract Algebra Exam Validation', () => {
  describe('Question Format Validation', () => {
    it('all questions should have valid structure', () => {
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
      const mcQuestions = allQuestions.filter(q => q.type === 'multiple_choice');

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

  describe('Direct Product Cyclicity Questions', () => {
    it('validates Z₄ × Z₂ is not cyclic (math304-final-q9)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q9');

      expect(question).toBeDefined();
      expect(question?.prompt).toContain('Z₄ × Z₂');

      // Since gcd(4,2) = 2 ≠ 1, Z₄ × Z₂ is NOT isomorphic to Z₈
      // The correct answer should be "Not cyclic" (index 3)
      expect(question?.correctAnswer).toBe(3);

      // Verify the explanation mentions why it's not cyclic
      expect(question?.explanation).toContain('gcd');
    });

    it('validates element order calculation in direct products', () => {
      // Find questions about element order in direct products
      const orderQuestions = allQuestions.filter(
        q => q.prompt.includes('×') && q.prompt.toLowerCase().includes('order')
      );

      orderQuestions.forEach(question => {
        // Verify each has an explanation mentioning lcm (for element orders)
        if (question.prompt.includes('element')) {
          expect(question.explanation?.toLowerCase()).toMatch(/lcm|least common multiple/);
        }
      });
    });
  });

  describe('Cyclic Group Subgroup Counting', () => {
    it('validates Z₁₆ has exactly 1 cyclic subgroup of order 4 (math304-mid-q14)', () => {
      const question = allQuestions.find(q => q.id === 'math304-mid-q14');

      expect(question).toBeDefined();
      expect(question?.prompt).toContain('Z₁₆');
      expect(question?.prompt?.toLowerCase()).toContain('order 4');

      // A cyclic group of order n has exactly one subgroup for each divisor
      // Z₁₆ has exactly 1 subgroup of order 4: ⟨4⟩ = {0, 4, 8, 12}
      expect(question?.correctAnswer).toBe(0); // Index 0 = "1"
    });

    it('validates cyclic group has one subgroup per divisor', () => {
      const question = allQuestions.find(q => q.id === 'math304-mid-q15');

      if (question) {
        // Question about subgroups of cyclic group of order 60
        // Divisors of 60: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60 = 12 divisors
        expect(question.correctAnswer).toBe(0); // Index 0 = "12"
      }
    });
  });

  describe('Lagrange\'s Theorem Applications', () => {
    it('validates subgroup index calculation', () => {
      const question = allQuestions.find(q => q.id === 'math304-mid-q25');

      if (question) {
        // |G| = 24, |H| = 6, so [G:H] = 24/6 = 4
        expect(question.correctAnswer).toBe(1); // Index 1 = "4"
      }
    });

    it('validates element order divides group order', () => {
      const orderDividesQuestions = allQuestions.filter(
        q => q.prompt.includes('order') && q.prompt.includes('divides')
      );

      orderDividesQuestions.forEach(question => {
        expect(question.explanation).toMatch(/Lagrange|divide/i);
      });
    });
  });

  describe('Permutation Group Questions', () => {
    it('validates order of product of disjoint cycles (math304-mid-q20)', () => {
      const question = allQuestions.find(q => q.id === 'math304-mid-q20');

      if (question) {
        // Order of (1 2)(3 4 5) = lcm(2, 3) = 6
        expect(question.correctAnswer).toBe(3); // Index 3 = "6"
      }
    });

    it('validates 3-cycle count in S₄ (math304-mid-q18)', () => {
      const question = allQuestions.find(q => q.id === 'math304-mid-q18');

      if (question) {
        // Number of 3-cycles in S₄ = C(4,3) × 2! = 4 × 2 = 8
        expect(question.correctAnswer).toBe(1); // Index 1 = "8"
      }
    });

    it('validates elements of order 2 in S₄ (math304-final-q16)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q16');

      if (question) {
        // Elements of order 2 in S₄:
        // - 6 transpositions: (1 2), (1 3), (1 4), (2 3), (2 4), (3 4)
        // - 3 products of disjoint transpositions: (1 2)(3 4), (1 3)(2 4), (1 4)(2 3)
        // Total: 9
        expect(question.correctAnswer).toBe(2); // Index 2 = "9"
      }
    });
  });

  describe('Euler Totient Function', () => {
    it('validates φ(36) = 12 (math304-final-q40)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q40');

      if (question) {
        // φ(36) = φ(4)·φ(9) = 2·6 = 12
        // Or: φ(36) = 36(1-1/2)(1-1/3) = 36·1/2·2/3 = 12
        expect(question.correctAnswer).toBe(1); // Index 1 = "12"
      }
    });

    it('validates generator count uses φ(n)', () => {
      const generatorQuestions = allQuestions.filter(
        q => q.prompt.toLowerCase().includes('generator')
      );

      generatorQuestions.forEach(question => {
        if (question.explanation) {
          expect(question.explanation).toMatch(/φ|phi|totient|coprime|gcd.*=.*1/i);
        }
      });
    });
  });

  describe('Quotient Group Orders', () => {
    it('validates |Z₁₈/⟨6⟩| = 6 (math304-final-q21)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q21');

      if (question) {
        // |⟨6⟩| = 18/gcd(6,18) = 18/6 = 3
        // |Z₁₈/⟨6⟩| = 18/3 = 6
        expect(question.correctAnswer).toBe(1); // Index 1 = "6"
      }
    });

    it('validates |Z₁₂/⟨4⟩| = 4 (math304-final-q24)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q24');

      if (question) {
        // |⟨4⟩| = 12/gcd(4,12) = 12/4 = 3
        // Number of cosets = [Z₁₂:⟨4⟩] = 12/3 = 4
        expect(question.correctAnswer).toBe(1); // Index 1 = "4"
      }
    });
  });

  describe('Ring and Field Theory', () => {
    it('validates Z₇ is an integral domain (math304-final-q34)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q34');

      if (question) {
        // Z_n is an integral domain iff n is prime
        // Z₇ (prime) is an integral domain
        expect(question.correctAnswer).toBe(2); // Index 2 = "Z₇"
      }
    });

    it('validates 5Z is a maximal ideal in Z (math304-final-q37)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q37');

      if (question) {
        // nZ is maximal in Z iff n is prime
        // 5Z (5 is prime) is maximal
        expect(question.correctAnswer).toBe(1); // Index 1 = "5Z"
      }
    });
  });

  describe('Fermat\'s Little Theorem', () => {
    it('validates 5¹² ≡ 1 (mod 13) (math304-final-q41)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q41');

      if (question) {
        // By Fermat's Little Theorem: a^(p-1) ≡ 1 (mod p) when gcd(a,p) = 1
        // 5^12 ≡ 1 (mod 13) since 13 is prime
        expect(question.correctAnswer).toBe(0); // Index 0 = "1"
      }
    });
  });

  describe('RSA Cryptography', () => {
    it('validates RSA private key calculation (math304-final-q42)', () => {
      const question = allQuestions.find(q => q.id === 'math304-final-q42');

      if (question) {
        // n = 55 = 5×11, φ(55) = 4×10 = 40
        // e = 3, need d where ed ≡ 1 (mod 40)
        // 3×27 = 81 = 2×40 + 1 ≡ 1 (mod 40)
        // d = 27
        expect(question.correctAnswer).toBe(2); // Index 2 = "27"
      }
    });
  });

  describe('Statistics', () => {
    it('reports exam question counts', () => {
      console.log(`Math304 midterm questions: ${exams[0]?.questions.length || 0}`);
      console.log(`Math304 final questions: ${exams[1]?.questions.length || 0}`);
      console.log(`Total Math304 exam questions: ${allQuestions.length}`);
    });
  });
});
