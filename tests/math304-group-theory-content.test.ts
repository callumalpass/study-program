/**
 * Math304 - Abstract Algebra Content Validation Tests
 *
 * These tests verify the mathematical correctness of group theory content,
 * particularly focusing on proper mathematical notation and factual accuracy.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const MATH304_CONTENT_PATH = join(__dirname, '../src/subjects/math304/content');

/**
 * Helper to read a markdown file from the math304 content directory
 */
function readMath304Content(relativePath: string): string {
  return readFileSync(join(MATH304_CONTENT_PATH, relativePath), 'utf-8');
}

describe('Math304 - Group Theory Content Validation', () => {
  describe('Lagrange Theorem Content (topic-4/02-lagrange-theorem.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readMath304Content('topic-4/02-lagrange-theorem.md');
    });

    it('should have correct title', () => {
      expect(content).toContain("# Lagrange's Theorem");
    });

    it('should state the theorem correctly', () => {
      // The theorem states that |H| divides |G|
      expect(content).toContain('$|H|$ divides $|G|$');
      expect(content).toContain('$|G| = |H| \\cdot [G:H]$');
    });

    it('should list the correct subgroups of order 2 in A_4', () => {
      // A_4 has exactly 3 subgroups of order 2, each containing the identity
      // and a double transposition (product of two disjoint 2-cycles)
      expect(content).toContain('$\\{e, (1\\,2)(3\\,4)\\}$');
      expect(content).toContain('$\\{e, (1\\,3)(2\\,4)\\}$');
      expect(content).toContain('$\\{e, (1\\,4)(2\\,3)\\}$');
    });

    it('should NOT use invalid plus/minus notation for permutation groups', () => {
      // Permutations don't have "negative" versions - the ± symbol is inappropriate
      // This was a bug that was fixed
      expect(content).not.toMatch(/\$\\{\\pm\s*e/);
      expect(content).not.toMatch(/\\pm\s*\(1/);
    });

    it('should correctly describe the Klein four-group V_4', () => {
      // V_4 = {e, (12)(34), (13)(24), (14)(23)}
      expect(content).toContain('Klein four-group');
      expect(content).toContain('$V_4 = \\{e, (1\\,2)(3\\,4), (1\\,3)(2\\,4), (1\\,4)(2\\,3)\\}$');
    });

    it('should mention that A_4 has no subgroup of order 6', () => {
      // This is the famous counterexample to the converse of Lagrange's theorem
      expect(content).toMatch(/A_4.*no subgroup of order 6|NO subgroup of order 6/i);
    });

    it('should include the Tower Law', () => {
      // The Tower Law: [G:K] = [G:H] · [H:K]
      expect(content).toContain('Tower Law');
      expect(content).toContain('[G:K] = [G:H] \\cdot [H:K]');
    });

    it('should mention Fermat\'s Little Theorem as a consequence', () => {
      // Fermat's Little Theorem is a corollary of Lagrange's theorem
      expect(content).toMatch(/Fermat.*Little Theorem/i);
    });
  });

  describe('Group Axioms Content (topic-1/02-group-axioms.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readMath304Content('topic-1/02-group-axioms.md');
    });

    it('should list all four group axioms', () => {
      // Closure, Associativity, Identity, Inverse
      expect(content).toMatch(/closure/i);
      expect(content).toMatch(/associativ/i);
      expect(content).toMatch(/identity/i);
      expect(content).toMatch(/inverse/i);
    });
  });

  describe('Symmetric Group Content (topic-3/02-symmetric-group.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readMath304Content('topic-3/02-symmetric-group.md');
    });

    it('should define S_n correctly', () => {
      // S_n is the group of all permutations of {1, 2, ..., n}
      expect(content).toMatch(/S_n|\\S_n|symmetric group/i);
    });

    it('should mention that |S_n| = n!', () => {
      // The order of S_n is n factorial
      expect(content).toMatch(/n!|\|S_n\|\s*=\s*n!/);
    });
  });

  describe('Cosets Content (topic-4/01-cosets-definition.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readMath304Content('topic-4/01-cosets-definition.md');
    });

    it('should define left cosets', () => {
      // gH = {gh : h ∈ H}
      expect(content).toMatch(/left coset/i);
      expect(content).toMatch(/gH|g\s*H/);
    });

    it('should define right cosets', () => {
      // Hg = {hg : h ∈ H}
      expect(content).toMatch(/right coset/i);
      expect(content).toMatch(/Hg|H\s*g/);
    });
  });

  describe('Homomorphisms Content (topic-5/01-homomorphisms-def.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readMath304Content('topic-5/01-homomorphisms-def.md');
    });

    it('should define homomorphism correctly', () => {
      // φ(ab) = φ(a)φ(b)
      expect(content).toMatch(/homomorphism/i);
      expect(content).toMatch(/\\phi\(ab\)\s*=\s*\\phi\(a\)\\phi\(b\)|φ\(ab\)\s*=\s*φ\(a\)φ\(b\)/);
    });
  });

  describe('First Isomorphism Theorem Content (topic-5/03-first-isomorphism.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readMath304Content('topic-5/03-first-isomorphism.md');
    });

    it('should state the First Isomorphism Theorem', () => {
      // G/ker(φ) ≅ im(φ)
      expect(content).toMatch(/First Isomorphism Theorem/i);
      expect(content).toMatch(/ker|kernel/i);
      expect(content).toMatch(/image|im\(/i);
    });
  });

  describe('Rings Content (topic-6/01-rings-definition.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readMath304Content('topic-6/01-rings-definition.md');
    });

    it('should define a ring', () => {
      expect(content).toMatch(/ring/i);
    });

    it('should mention the two operations (addition and multiplication)', () => {
      expect(content).toMatch(/addition|\\+/i);
      expect(content).toMatch(/multiplication|\\cdot|\\times/i);
    });
  });

  describe('RSA Algorithm Content (topic-7/03-rsa-algorithm.md)', () => {
    let content: string;

    beforeAll(() => {
      content = readMath304Content('topic-7/03-rsa-algorithm.md');
    });

    it('should mention RSA encryption', () => {
      expect(content).toMatch(/RSA/);
    });

    it('should involve modular exponentiation', () => {
      // RSA uses c = m^e mod n for encryption
      expect(content).toMatch(/mod|modular/i);
    });

    it('should mention public and private keys', () => {
      expect(content).toMatch(/public key/i);
      expect(content).toMatch(/private key/i);
    });
  });
});

describe('Mathematical Notation Validation', () => {
  it('should not use ± notation in permutation group context', () => {
    // Check all markdown files in math304 for incorrect ± usage with permutations
    const fs = require('fs');
    const path = require('path');

    function getAllMarkdownFiles(dir: string): string[] {
      const files: string[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...getAllMarkdownFiles(fullPath));
        } else if (entry.name.endsWith('.md')) {
          files.push(fullPath);
        }
      }

      return files;
    }

    const allMdFiles = getAllMarkdownFiles(MATH304_CONTENT_PATH);

    for (const file of allMdFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      // Check for ± used with cycle notation like (1 2) or (1,2)
      const invalidUsage = content.match(/\\pm\s*\(\d+[\s,\\]+\d+/g);
      expect(
        invalidUsage,
        `File ${file} contains invalid ± notation with permutations: ${invalidUsage}`
      ).toBeNull();
    }
  });

  it('should use consistent LaTeX notation for groups', () => {
    const lagrangeContent = readMath304Content('topic-4/02-lagrange-theorem.md');

    // Group order should use |G| notation
    expect(lagrangeContent).toContain('|G|');
    expect(lagrangeContent).toContain('|H|');

    // Index should use [G:H] notation
    expect(lagrangeContent).toContain('[G:H]');
  });
});

describe('A_4 Subgroup Structure Verification', () => {
  /**
   * Mathematical verification that A_4 has exactly 3 subgroups of order 2.
   *
   * A_4 = { e, (123), (132), (124), (142), (134), (143), (234), (243), (12)(34), (13)(24), (14)(23) }
   *
   * Elements of order 2 in A_4 are the double transpositions:
   * - (12)(34)
   * - (13)(24)
   * - (14)(23)
   *
   * Each generates a subgroup of order 2: {e, double-transposition}
   */

  it('A_4 has order 12', () => {
    // |A_4| = 4!/2 = 12
    const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
    expect(factorial(4) / 2).toBe(12);
  });

  it('divisors of 12 are 1, 2, 3, 4, 6, 12', () => {
    const divisors = [1, 2, 3, 4, 6, 12];
    for (const d of divisors) {
      expect(12 % d).toBe(0);
    }

    // Non-divisors
    expect(12 % 5).not.toBe(0);
    expect(12 % 7).not.toBe(0);
  });

  it('verifies the content correctly lists all order-2 subgroups', () => {
    const content = readMath304Content('topic-4/02-lagrange-theorem.md');

    // Should list exactly 3 subgroups of order 2
    expect(content).toContain('three such subgroups');

    // Each should contain identity and one double transposition
    const doubleTranspositions = ['(1\\,2)(3\\,4)', '(1\\,3)(2\\,4)', '(1\\,4)(2\\,3)'];
    for (const dt of doubleTranspositions) {
      expect(content).toContain(dt);
    }
  });
});
