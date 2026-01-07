/**
 * Math Course Content Validation Tests
 *
 * These tests verify the factual correctness of math course quiz and exam content.
 * Focus areas:
 * - Linear algebra questions in math201
 * - Probability questions in math202
 * - Mathematical explanations accuracy
 */

import { describe, it, expect } from 'vitest';
import math201Quizzes from '../src/subjects/math201/content/topic-1/quizzes.json';
import math202Quizzes from '../src/subjects/math202/content/topic-1/quizzes.json';
import math102Quizzes from '../src/subjects/math102/content/topic-1/quizzes.json';

describe('Math201 - Linear Algebra Content', () => {
  const topic1Quizzes = math201Quizzes;

  describe('Quiz 1c - Systems Mastery', () => {
    const quiz1c = topic1Quizzes.find((q) => q.id === 'math201-quiz-1c');

    it('should have the quiz', () => {
      expect(quiz1c).toBeDefined();
    });

    it('Q3: Consistency for every b - should be false and explanation should mention full row rank', () => {
      const q3 = quiz1c!.questions.find((q) => q.id === 'math201-q1c-3');
      expect(q3).toBeDefined();
      expect(q3!.correctAnswer).toBe(false);
      // The explanation should correctly state that A needs full row rank (at least as many columns as rows)
      expect(q3!.explanation).toMatch(/full row rank/i);
      // Should NOT claim that A could have more rows than columns
      expect(q3!.explanation).not.toMatch(/more rows than columns/i);
    });

    it('Q1: Homogeneous system with more unknowns - should be infinitely many solutions', () => {
      const q1 = quiz1c!.questions.find((q) => q.id === 'math201-q1c-1');
      expect(q1).toBeDefined();
      expect(q1!.type).toBe('multiple_choice');
      // Correct answer should be index 2 (Infinitely many solutions)
      expect(q1!.correctAnswer).toBe(2);
    });

    it('Q4: Trivial solution iff columns linearly independent', () => {
      const q4 = quiz1c!.questions.find((q) => q.id === 'math201-q1c-4');
      expect(q4).toBeDefined();
      expect(q4!.correctAnswer).toBe(0); // First option: linearly independent
    });
  });

  describe('Quiz 1b - Systems Application', () => {
    const quiz1b = topic1Quizzes.find((q) => q.id === 'math201-quiz-1b');

    it('Q1: Row with [0 0 0 | 5] means inconsistent', () => {
      const q1 = quiz1b!.questions.find((q) => q.id === 'math201-q1b-1');
      expect(q1).toBeDefined();
      expect(q1!.correctAnswer).toBe(2); // Inconsistent
    });

    it('Q3: RREF is unique should be true', () => {
      const q3 = quiz1b!.questions.find((q) => q.id === 'math201-q1b-3');
      expect(q3).toBeDefined();
      expect(q3!.correctAnswer).toBe(true);
    });
  });

  describe('Quiz 1a - Systems Fundamentals', () => {
    const quiz1a = topic1Quizzes.find((q) => q.id === 'math201-quiz-1a');

    it('Q2: System cannot have exactly two solutions', () => {
      const q2 = quiz1a!.questions.find((q) => q.id === 'math201-q1a-2');
      expect(q2).toBeDefined();
      expect(q2!.correctAnswer).toBe(false);
    });

    it('Q4: Homogeneous system has at least one solution (trivial)', () => {
      const q4 = quiz1a!.questions.find((q) => q.id === 'math201-q1a-4');
      expect(q4).toBeDefined();
      expect(q4!.correctAnswer).toBe(0); // One solution (trivial)
    });
  });
});

describe('Math202 - Probability Content', () => {
  const topic1Quizzes = math202Quizzes;

  describe('Quiz 1a - Basic Probability', () => {
    const quiz1a = topic1Quizzes.find((q) => q.id === 'math202-quiz-1a');

    it('Q1: P(greater than 4) = 1/3', () => {
      const q1 = quiz1a!.questions.find((q) => q.id === 'q1');
      expect(q1).toBeDefined();
      expect(q1!.correctAnswer).toBe(1); // 1/3
    });

    it('Q2: P(exactly one head in two flips) = 1/2', () => {
      const q2 = quiz1a!.questions.find((q) => q.id === 'q2');
      expect(q2).toBeDefined();
      expect(q2!.correctAnswer).toBe(2); // 1/2
    });
  });

  describe('Quiz 1b - Conditional Probability', () => {
    const quiz1b = topic1Quizzes.find((q) => q.id === 'math202-quiz-1b');

    it('Q1: P(A|B) = P(A∩B)/P(B) = 0.2/0.5 = 0.4', () => {
      const q1 = quiz1b!.questions.find((q) => q.id === 'q1');
      expect(q1).toBeDefined();
      expect(q1!.correctAnswer).toBe(1); // 0.4
    });

    it('Q3: P(A∩B) = P(B|A) × P(A) = 0.3 × 0.6 = 0.18', () => {
      const q3 = quiz1b!.questions.find((q) => q.id === 'q3');
      expect(q3).toBeDefined();
      expect(q3!.correctAnswer).toBe(0); // 0.18
    });

    it('Q4: Mutually exclusive events are not independent (except trivial case)', () => {
      const q4 = quiz1b!.questions.find((q) => q.id === 'q4');
      expect(q4).toBeDefined();
      expect(q4!.correctAnswer).toBe(1); // No, they are not independent
    });
  });

  describe('Quiz 1c - Bayes Theorem', () => {
    const quiz1c = topic1Quizzes.find((q) => q.id === 'math202-quiz-1c');

    it('Q1: P(5,3) = 60', () => {
      const q1 = quiz1c!.questions.find((q) => q.id === 'q1');
      expect(q1).toBeDefined();
      expect(q1!.correctAnswer).toBe(1); // 60
    });

    it('Q3: Disease test positive - approximately 9% (Bayes theorem)', () => {
      const q3 = quiz1c!.questions.find((q) => q.id === 'q3');
      expect(q3).toBeDefined();
      expect(q3!.correctAnswer).toBe(0); // About 9%
      // Verify the math in explanation
      // P(D|+) = P(+|D)P(D) / [P(+|D)P(D) + P(+|H)P(H)]
      // = 0.95*0.01 / (0.95*0.01 + 0.10*0.99)
      // = 0.0095 / 0.1085 ≈ 0.0876 ≈ 8.76%
      expect(q3!.explanation).toMatch(/9%|0\.0[89]/);
    });
  });
});

describe('Math102 - Combinatorics Content', () => {
  const topic1Quizzes = math102Quizzes;

  describe('Quiz 1 - Fundamentals', () => {
    const quiz1 = topic1Quizzes.find((q) => q.id === 'math102-q1');

    it('Q1: 5! = 120 arrangements of 5 books', () => {
      const q1 = quiz1!.questions.find((q) => q.id === 'math102-q1-1');
      expect(q1).toBeDefined();
      expect(q1!.correctAnswer).toBe(2); // 120
      // Verify: 5! = 120
      expect(5 * 4 * 3 * 2 * 1).toBe(120);
    });

    it('Q2: C(10,3) = 120 ways to choose 3 from 10', () => {
      const q2 = quiz1!.questions.find((q) => q.id === 'math102-q1-2');
      expect(q2).toBeDefined();
      expect(q2!.correctAnswer).toBe(1); // 120
      // Verify: C(10,3) = 10!/(3!*7!) = (10*9*8)/(3*2*1) = 720/6 = 120
      expect((10 * 9 * 8) / (3 * 2 * 1)).toBe(120);
    });

    it('Q5: C(8,3) = 56', () => {
      const q5 = quiz1!.questions.find((q) => q.id === 'math102-q1-5');
      expect(q5).toBeDefined();
      expect(q5!.correctAnswer).toBe(1); // 56
      // Verify: C(8,3) = 8!/(3!*5!) = (8*7*6)/(3*2*1) = 336/6 = 56
      expect((8 * 7 * 6) / (3 * 2 * 1)).toBe(56);
    });
  });

  describe('Quiz 1b - Application', () => {
    const quiz1b = topic1Quizzes.find((q) => q.id === 'math102-q1b');

    it('Q1: 26^3 × 10^2 = 1,757,600 passwords', () => {
      const q1 = quiz1b!.questions.find((q) => q.id === 'math102-q1b-1');
      expect(q1).toBeDefined();
      expect(q1!.correctAnswer).toBe(2); // 1,757,600
      // Verify
      expect(Math.pow(26, 3) * Math.pow(10, 2)).toBe(1757600);
    });

    it('Q2: P(5,3) = 60', () => {
      const q2 = quiz1b!.questions.find((q) => q.id === 'math102-q1b-2');
      expect(q2).toBeDefined();
      expect(q2!.correctAnswer).toBe('60');
      // Verify: P(5,3) = 5!/(5-3)! = 5!/2! = 120/2 = 60
      expect(120 / 2).toBe(60);
    });

    it('Q3: MISSISSIPPI arrangements = 34650', () => {
      const q3 = quiz1b!.questions.find((q) => q.id === 'math102-q1b-3');
      expect(q3).toBeDefined();
      expect(q3!.correctAnswer).toBe(0); // 34650
      // Verify: 11!/(4!×4!×2!) = 39916800/(24×24×2) = 39916800/1152 = 34650
      // M=1, I=4, S=4, P=2
      const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
      expect(factorial(11) / (factorial(4) * factorial(4) * factorial(2))).toBe(34650);
    });

    it('Q5: Lattice paths from (0,0) to (3,2) = C(5,2) = 10', () => {
      const q5 = quiz1b!.questions.find((q) => q.id === 'math102-q1b-5');
      expect(q5).toBeDefined();
      expect(q5!.correctAnswer).toBe(2); // 10
      // Verify: C(5,2) = 10
      expect((5 * 4) / (2 * 1)).toBe(10);
    });
  });

  describe('Quiz 1c - Advanced', () => {
    const quiz1c = topic1Quizzes.find((q) => q.id === 'math102-q1c');

    it('Q1: Inclusion-exclusion: |divisible by 2 or 3| = 50 + 33 - 16 = 67', () => {
      const q1 = quiz1c!.questions.find((q) => q.id === 'math102-q1c-1');
      expect(q1).toBeDefined();
      expect(q1!.correctAnswer).toBe(1); // 67
      // |A| = floor(100/2) = 50
      // |B| = floor(100/3) = 33
      // |A∩B| = floor(100/6) = 16
      expect(50 + 33 - 16).toBe(67);
    });

    it('Q2: Stars and bars: C(7,2) = 21 ways to distribute 5 balls into 3 boxes', () => {
      const q2 = quiz1c!.questions.find((q) => q.id === 'math102-q1c-2');
      expect(q2).toBeDefined();
      expect(q2!.correctAnswer).toBe(1); // 21
      // C(n+r-1, r-1) = C(5+3-1, 3-1) = C(7,2) = 21
      expect((7 * 6) / (2 * 1)).toBe(21);
    });

    it('Q3: D(3) = 2 derangements', () => {
      const q3 = quiz1c!.questions.find((q) => q.id === 'math102-q1c-3');
      expect(q3).toBeDefined();
      expect(q3!.correctAnswer).toBe('2');
      // D(3) = 3! × (1 - 1/1! + 1/2! - 1/3!) = 6 × (1 - 1 + 0.5 - 1/6) = 6 × 1/3 = 2
      // Or: permutations with no fixed points of {1,2,3} are (2,3,1) and (3,1,2)
    });

    it('Q5: Binary strings of length 6 with exactly 3 ones = C(6,3) = 20', () => {
      const q5 = quiz1c!.questions.find((q) => q.id === 'math102-q1c-5');
      expect(q5).toBeDefined();
      expect(q5!.correctAnswer).toBe(1); // 20
      expect((6 * 5 * 4) / (3 * 2 * 1)).toBe(20);
    });
  });
});

describe('Mathematical Computation Verification', () => {
  // Helper functions to verify mathematical content
  const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
  const combination = (n: number, k: number): number =>
    factorial(n) / (factorial(k) * factorial(n - k));
  const permutation = (n: number, k: number): number => factorial(n) / factorial(n - k);

  describe('Factorial Calculations', () => {
    it('should compute factorials correctly', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
      expect(factorial(10)).toBe(3628800);
    });
  });

  describe('Combination Calculations', () => {
    it('should compute combinations correctly', () => {
      expect(combination(5, 2)).toBe(10);
      expect(combination(10, 3)).toBe(120);
      expect(combination(8, 3)).toBe(56);
      expect(combination(6, 3)).toBe(20);
      expect(combination(7, 2)).toBe(21);
    });
  });

  describe('Permutation Calculations', () => {
    it('should compute permutations correctly', () => {
      expect(permutation(5, 3)).toBe(60);
      expect(permutation(5, 5)).toBe(120);
      expect(permutation(10, 3)).toBe(720);
    });
  });
});
