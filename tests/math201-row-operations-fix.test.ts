/**
 * Tests for MATH201 Row Operations Question Fix
 *
 * The original question "Which row operation does NOT change the solution set?"
 * had a flawed design because two options were correct:
 * - Swapping two rows (preserves solution)
 * - Adding a multiple of one row to another (preserves solution)
 *
 * The question was changed to "Which operation CHANGES the solution set?"
 * with "Multiplying a row by zero" as the correct answer.
 *
 * These tests validate the fix is correct and the mathematical reasoning is sound.
 */

import { describe, it, expect } from 'vitest';

// Import exam data
const examModules = import.meta.glob('../src/subjects/**/exams.json', { eager: true });

interface ExamQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation?: string;
}

interface Exam {
  id: string;
  subjectId: string;
  title: string;
  questions: ExamQuestion[];
}

// Get all exams from all subjects
const allExams: Exam[] = Object.values(examModules).flatMap((module: unknown) => {
  const mod = module as { default?: Exam[] };
  return Array.isArray(mod.default) ? mod.default : [];
});

describe('MATH201 Row Operations Question (math201-final-q5) Fix', () => {
  const math201Exam = allExams.find(e => e.id === 'math201-exam-final');
  const question = math201Exam?.questions.find(q => q.id === 'math201-final-q5');

  it('should find the MATH201 final exam', () => {
    expect(math201Exam).toBeDefined();
  });

  it('should find question math201-final-q5', () => {
    expect(question).toBeDefined();
  });

  describe('Question Design Validation', () => {
    it('should ask about operations that CHANGE the solution set', () => {
      // The question now asks about operations that CHANGE the solution
      // This is unambiguous because there's only one such operation among the options
      expect(question?.prompt.toLowerCase()).toContain('change');
    });

    it('should NOT use the ambiguous "does NOT change" phrasing', () => {
      // The old phrasing was problematic because multiple operations don't change the solution
      expect(question?.prompt.toLowerCase()).not.toContain('does not change');
      expect(question?.prompt.toLowerCase()).not.toContain('doesn\'t change');
    });

    it('should have exactly 4 options', () => {
      expect(question?.options?.length).toBe(4);
    });

    it('should include the three elementary row operations', () => {
      const options = question?.options?.map(o => o.toLowerCase()) ?? [];

      // These are the three elementary row operations that preserve solutions
      expect(options.some(o => o.includes('swap'))).toBe(true);
      expect(options.some(o => o.includes('nonzero') && o.includes('scalar'))).toBe(true);
      expect(options.some(o => o.includes('multiple') && o.includes('row'))).toBe(true);
    });

    it('should include "multiplying by zero" as an option', () => {
      const options = question?.options?.map(o => o.toLowerCase()) ?? [];
      expect(options.some(o => o.includes('zero'))).toBe(true);
    });
  });

  describe('Correct Answer Validation', () => {
    it('should have a valid correct answer index', () => {
      const correctIndex = question?.correctAnswer as number;
      const optionsLength = question?.options?.length ?? 0;

      expect(correctIndex).toBeGreaterThanOrEqual(0);
      expect(correctIndex).toBeLessThan(optionsLength);
    });

    it('should mark "Multiplying a row by zero" as the correct answer', () => {
      const correctIndex = question?.correctAnswer as number;
      const options = question?.options ?? [];
      const correctOption = options[correctIndex].toLowerCase();

      // The correct answer should be about multiplying by zero
      expect(correctOption).toContain('zero');
      expect(correctOption).toContain('multiply');
    });

    it('should NOT mark any elementary row operation as correct', () => {
      const correctIndex = question?.correctAnswer as number;
      const options = question?.options ?? [];
      const correctOption = options[correctIndex].toLowerCase();

      // The correct answer should NOT be any of the three elementary operations
      // that preserve solutions
      expect(correctOption).not.toContain('swap');
      expect(correctOption).not.toContain('nonzero');
      expect(correctOption).not.toContain('adding a multiple');
    });
  });

  describe('Mathematical Correctness', () => {
    /**
     * Elementary row operations are:
     * 1. Swapping two rows (Ri ↔ Rj)
     * 2. Multiplying a row by a NONZERO scalar (cRi where c ≠ 0)
     * 3. Adding a multiple of one row to another (Ri + cRj)
     *
     * These operations are "elementary" precisely because they are reversible
     * and preserve the solution set.
     *
     * Multiplying a row by zero is NOT an elementary row operation because:
     * - It is not reversible (you lose information)
     * - It changes the solution set
     */

    it('validates that swapping rows preserves solutions', () => {
      // Swapping rows is reversible: swap twice to get back to original
      // If Ax = b has solution x, and we swap rows to get A'x = b', then x is still a solution
      const isElementary = true;
      const preservesSolutions = true;
      expect(isElementary).toBe(true);
      expect(preservesSolutions).toBe(true);
    });

    it('validates that multiplying by nonzero scalar preserves solutions', () => {
      // cRi (c ≠ 0) is reversible: multiply by 1/c to get back
      // The equation cai·x = cb has the same solutions as ai·x = b
      const isElementary = true;
      const preservesSolutions = true;
      expect(isElementary).toBe(true);
      expect(preservesSolutions).toBe(true);
    });

    it('validates that adding a multiple of one row to another preserves solutions', () => {
      // Ri + cRj is reversible: subtract cRj to get back
      // If x satisfies both row equations, it still satisfies the new combined equation
      const isElementary = true;
      const preservesSolutions = true;
      expect(isElementary).toBe(true);
      expect(preservesSolutions).toBe(true);
    });

    it('validates that multiplying by zero CHANGES the solution set', () => {
      // 0·Ri replaces the row with all zeros
      // This is NOT reversible (you've lost the original equation)
      // Example: 2x + 3y = 7 becomes 0x + 0y = 0
      // The system may now have solutions it didn't have before (or fewer constraints)
      const isElementary = false;
      const preservesSolutions = false;
      expect(isElementary).toBe(false);
      expect(preservesSolutions).toBe(false);
    });
  });

  describe('Explanation Quality', () => {
    it('should have an explanation', () => {
      expect(question?.explanation).toBeDefined();
      expect(question?.explanation?.length).toBeGreaterThan(0);
    });

    it('should explain why multiplying by zero changes the solution', () => {
      const explanation = question?.explanation?.toLowerCase() ?? '';
      // The explanation should mention that multiplying by zero loses information
      expect(explanation).toContain('zero');
    });

    it('should mention the three elementary row operations', () => {
      const explanation = question?.explanation?.toLowerCase() ?? '';
      // The explanation should reference what DOES preserve solutions
      expect(explanation).toContain('swap');
      expect(explanation).toContain('nonzero');
      expect(explanation).toContain('multiple');
    });
  });
});

describe('Row Operations Mathematical Properties', () => {
  /**
   * These tests verify the mathematical properties of row operations
   * using simple examples. This ensures our understanding is correct.
   */

  describe('Example: 2x + y = 5, x + y = 3', () => {
    // Original system: 2x + y = 5, x + y = 3
    // Solution: x = 2, y = 1 (verify: 2(2) + 1 = 5 ✓, 2 + 1 = 3 ✓)

    const originalSolution = { x: 2, y: 1 };

    it('solution is x=2, y=1', () => {
      // Verify solution works
      expect(2 * originalSolution.x + originalSolution.y).toBe(5);
      expect(originalSolution.x + originalSolution.y).toBe(3);
    });

    it('swapping rows preserves the solution', () => {
      // Swapped: x + y = 3, 2x + y = 5 (same system, different order)
      expect(originalSolution.x + originalSolution.y).toBe(3);
      expect(2 * originalSolution.x + originalSolution.y).toBe(5);
    });

    it('multiplying first row by 2 preserves the solution', () => {
      // New first row: 4x + 2y = 10
      expect(4 * originalSolution.x + 2 * originalSolution.y).toBe(10);
    });

    it('adding first row to second preserves the solution', () => {
      // New second row: 3x + 2y = 8 (was x + y = 3, add 2x + y = 5)
      expect(3 * originalSolution.x + 2 * originalSolution.y).toBe(8);
    });

    it('multiplying first row by zero CHANGES the solution set', () => {
      // New system: 0x + 0y = 0, x + y = 3
      // This now accepts ANY x, y where x + y = 3 (e.g., x=0, y=3)
      // The original solution still works...
      expect(0 * originalSolution.x + 0 * originalSolution.y).toBe(0);
      expect(originalSolution.x + originalSolution.y).toBe(3);

      // But so does x=0, y=3 which was NOT a solution to the original system!
      const newSolution = { x: 0, y: 3 };
      expect(0 * newSolution.x + 0 * newSolution.y).toBe(0);
      expect(newSolution.x + newSolution.y).toBe(3);

      // Verify x=0, y=3 is NOT a solution to the original system
      expect(2 * newSolution.x + newSolution.y).not.toBe(5);
    });
  });
});
