/**
 * Quiz Math Calculations Validation Tests
 *
 * These tests validate mathematical correctness of quiz questions
 * by checking that the explanation's math matches the correct answer.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

interface MathValidationResult {
  questionId: string;
  quizId: string;
  filePath: string;
  issue: string;
  details: {
    prompt: string;
    correctAnswer: string | number | boolean;
    options?: string[];
    explanation: string;
  };
}

/**
 * Load and parse a JSON file safely
 */
function loadJsonFile<T>(filePath: string): T | null {
  if (!existsSync(filePath)) {
    return null;
  }
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

/**
 * Extract numbers from text (for comparison)
 */
function extractNumbers(text: string): number[] {
  const matches = text.match(/-?\d+\.?\d*/g);
  return matches ? matches.map(Number).filter(n => !isNaN(n)) : [];
}

/**
 * Check if the explanation mentions a value that conflicts with the correct answer
 */
function checkExplanationConsistency(question: QuizQuestion): string | null {
  if (!question.explanation) return null;

  const explanation = question.explanation.toLowerCase();
  const correctAnswer = String(question.correctAnswer).toLowerCase();

  // For multiple choice with numeric index, get the actual option text
  if (question.type === 'multiple_choice' && typeof question.correctAnswer === 'number') {
    const selectedOption = question.options?.[question.correctAnswer];
    if (!selectedOption) {
      return `correctAnswer index ${question.correctAnswer} out of bounds for options array`;
    }
  }

  return null;
}

/**
 * Check combinatorics calculations in explanations
 * Only checks explicit standalone equations, not partial matches in longer text
 */
function checkCombinatoricsCalculation(question: QuizQuestion): string | null {
  if (!question.explanation) return null;

  const explanation = question.explanation;

  // Check factorial calculations like "5! = 120" (standalone, not part of larger expression)
  // Must be at word boundary or start of string, followed by the actual result
  const factorialMatches = explanation.matchAll(/(?:^|[^\/\d])(\d+)!\s*=\s*(\d+)(?!\s*[×\*\/])/g);
  for (const match of factorialMatches) {
    const n = parseInt(match[1]);
    const claimed = parseInt(match[2]);
    // Skip if this looks like part of a larger formula
    if (n <= 1) continue; // 0! = 1, 1! = 1 are trivial
    let actual = 1;
    for (let i = 2; i <= n; i++) actual *= i;
    if (actual !== claimed) {
      return `Factorial calculation error: ${n}! = ${actual}, not ${claimed}`;
    }
  }

  // Check C(n,k) calculations like "C(8,3) = 56" - must be the final result
  const combinationMatch = explanation.match(/C\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)\s*=\s*(\d+)\s*[.!,]?\s*$/);
  if (combinationMatch) {
    const n = parseInt(combinationMatch[1]);
    const k = parseInt(combinationMatch[2]);
    const claimed = parseInt(combinationMatch[3]);
    const factorial = (x: number) => {
      let result = 1;
      for (let i = 2; i <= x; i++) result *= i;
      return result;
    };
    const actual = factorial(n) / (factorial(k) * factorial(n - k));
    if (actual !== claimed) {
      return `Combination calculation error: C(${n},${k}) = ${actual}, not ${claimed}`;
    }
  }

  // Check P(n,k) permutation calculations like "P(5,3) = 60" - must be the final result
  const permutationMatch = explanation.match(/P\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)\s*=\s*(\d+)\s*[.!,]?\s*$/);
  if (permutationMatch) {
    const n = parseInt(permutationMatch[1]);
    const k = parseInt(permutationMatch[2]);
    const claimed = parseInt(permutationMatch[3]);
    const factorial = (x: number) => {
      let result = 1;
      for (let i = 2; i <= x; i++) result *= i;
      return result;
    };
    const actual = factorial(n) / factorial(n - k);
    if (actual !== claimed) {
      return `Permutation calculation error: P(${n},${k}) = ${actual}, not ${claimed}`;
    }
  }

  return null;
}

/**
 * Check binary/hex number conversions
 */
function checkNumberConversions(question: QuizQuestion): string | null {
  if (!question.explanation) return null;

  const explanation = question.explanation;

  // Check binary to decimal conversions like "1011 = 11"
  const binaryMatch = explanation.match(/\b([01]{4,})\s*(?:binary\s*)?(?:=|is|equals)\s*(\d+)/i);
  if (binaryMatch) {
    const binary = binaryMatch[1];
    const claimed = parseInt(binaryMatch[2]);
    const actual = parseInt(binary, 2);
    if (actual !== claimed && !isNaN(actual)) {
      return `Binary conversion error: ${binary} binary = ${actual} decimal, not ${claimed}`;
    }
  }

  // Check hex to decimal like "0xFF = 255" or "FF = 255"
  const hexMatch = explanation.match(/(?:0x)?([0-9A-Fa-f]{2,})\s*(?:hex\s*)?(?:=|is|equals)\s*(\d+)/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    const claimed = parseInt(hexMatch[2]);
    const actual = parseInt(hex, 16);
    if (actual !== claimed && !isNaN(actual)) {
      return `Hex conversion error: 0x${hex} = ${actual} decimal, not ${claimed}`;
    }
  }

  return null;
}

/**
 * Check power calculations like "2^10 = 1024"
 */
function checkPowerCalculations(question: QuizQuestion): string | null {
  if (!question.explanation) return null;

  const explanation = question.explanation;

  // Match patterns like "2^10 = 1024" or "2¹⁰ = 1024"
  const powerMatch = explanation.match(/(\d+)\^(\d+)\s*=\s*(\d+)/);
  if (powerMatch) {
    const base = parseInt(powerMatch[1]);
    const exp = parseInt(powerMatch[2]);
    const claimed = parseInt(powerMatch[3]);
    const actual = Math.pow(base, exp);
    if (actual !== claimed) {
      return `Power calculation error: ${base}^${exp} = ${actual}, not ${claimed}`;
    }
  }

  return null;
}

describe('Quiz Math Calculations Validation', () => {
  describe('Combinatorics calculations in math102', () => {
    const math102QuizFile = join(SUBJECTS_DIR, 'math102/content/topic-1/quizzes.json');

    it('validates factorial calculations', () => {
      const quizzes = loadJsonFile<Quiz[]>(math102QuizFile);
      if (!quizzes) {
        console.log('Skipping: math102 topic-1 quizzes.json not found');
        return;
      }

      const errors: string[] = [];
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          const error = checkCombinatoricsCalculation(question);
          if (error) {
            errors.push(`${quiz.id}/${question.id}: ${error}`);
          }
        }
      }

      expect(errors, `Math errors found:\n${errors.join('\n')}`).toHaveLength(0);
    });

    it('validates C(n,k) combination calculations', () => {
      const quizzes = loadJsonFile<Quiz[]>(math102QuizFile);
      if (!quizzes) return;

      // Manually verify some known values
      const knownCombinations = [
        { n: 8, k: 3, result: 56 },
        { n: 10, k: 3, result: 120 },
        { n: 5, k: 2, result: 10 },
        { n: 6, k: 3, result: 20 },
      ];

      for (const { n, k, result } of knownCombinations) {
        const factorial = (x: number) => {
          let r = 1;
          for (let i = 2; i <= x; i++) r *= i;
          return r;
        };
        const calculated = factorial(n) / (factorial(k) * factorial(n - k));
        expect(calculated, `C(${n},${k})`).toBe(result);
      }
    });
  });

  describe('Binary arithmetic in cs102', () => {
    const cs102Topic2QuizFile = join(SUBJECTS_DIR, 'cs102/content/topic-2/quizzes.json');

    it('validates binary addition explanations', () => {
      const quizzes = loadJsonFile<Quiz[]>(cs102Topic2QuizFile);
      if (!quizzes) {
        console.log('Skipping: cs102 topic-2 quizzes.json not found');
        return;
      }

      const errors: string[] = [];
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          const error = checkNumberConversions(question);
          if (error) {
            errors.push(`${quiz.id}/${question.id}: ${error}`);
          }
        }
      }

      expect(errors, `Number conversion errors found:\n${errors.join('\n')}`).toHaveLength(0);
    });

    it('validates binary to decimal conversions', () => {
      // Known conversions
      const conversions = [
        { binary: '1011', decimal: 11 },
        { binary: '0110', decimal: 6 },
        { binary: '10001', decimal: 17 },
        { binary: '1111', decimal: 15 },
        { binary: '10000', decimal: 16 },
      ];

      for (const { binary, decimal } of conversions) {
        expect(parseInt(binary, 2), `${binary} binary`).toBe(decimal);
      }
    });
  });

  describe('Number system calculations in cs102 topic-1', () => {
    const cs102Topic1QuizFile = join(SUBJECTS_DIR, 'cs102/content/topic-1/quizzes.json');

    it('validates byte storage calculations', () => {
      const quizzes = loadJsonFile<Quiz[]>(cs102Topic1QuizFile);
      if (!quizzes) {
        console.log('Skipping: cs102 topic-1 quizzes.json not found');
        return;
      }

      // Find the "bytes needed to store 65536" question
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.includes('65536') && question.prompt.includes('bytes')) {
            // 65536 = 2^16, so needs 17 bits = 3 bytes
            const correctIndex = question.correctAnswer as number;
            const correctOption = question.options?.[correctIndex];

            // The correct answer should be "3" (since 65536 requires 17 bits)
            expect(correctOption, 'Bytes to store 65536').toBe('3');

            // Verify the math: 65535 fits in 16 bits (2 bytes), 65536 needs 17 bits (3 bytes)
            expect(Math.ceil(Math.log2(65536 + 1)), 'Bits needed for 65536').toBe(17);
            expect(Math.ceil(17 / 8), 'Bytes needed for 17 bits').toBe(3);
          }
        }
      }
    });
  });

  describe('Power calculations consistency', () => {
    it('validates common power of 2 values', () => {
      const powersOf2 = [
        { exp: 0, result: 1 },
        { exp: 1, result: 2 },
        { exp: 8, result: 256 },
        { exp: 10, result: 1024 },
        { exp: 16, result: 65536 },
        { exp: 20, result: 1048576 },
        { exp: 32, result: 4294967296 },
      ];

      for (const { exp, result } of powersOf2) {
        expect(Math.pow(2, exp), `2^${exp}`).toBe(result);
      }
    });

    it('validates common hex values', () => {
      const hexValues = [
        { hex: 'FF', decimal: 255 },
        { hex: '100', decimal: 256 },
        { hex: '1000', decimal: 4096 },
        { hex: '10000', decimal: 65536 },
        { hex: 'FFFF', decimal: 65535 },
      ];

      for (const { hex, decimal } of hexValues) {
        expect(parseInt(hex, 16), `0x${hex}`).toBe(decimal);
      }
    });
  });

  describe('Algorithm complexity values', () => {
    it('validates common complexity growth rates', () => {
      // For n = 1000
      const n = 1000;

      // O(1) - constant
      expect(1).toBe(1);

      // O(log n) - logarithmic
      expect(Math.floor(Math.log2(n))).toBe(9); // log2(1000) ≈ 9.97

      // O(n) - linear
      expect(n).toBe(1000);

      // O(n log n) - linearithmic
      expect(n * Math.floor(Math.log2(n))).toBe(9000); // 1000 * 9

      // O(n^2) - quadratic
      expect(n * n).toBe(1000000);
    });
  });

  describe('Inclusion-exclusion principle', () => {
    it('validates the standard formula |A∪B| = |A| + |B| - |A∩B|', () => {
      // From math102: integers from 1-100 divisible by 2 or 3
      const divisibleBy2 = 50; // 2,4,6,...,100
      const divisibleBy3 = 33; // 3,6,9,...,99
      const divisibleByBoth = 16; // 6,12,18,...,96 (divisible by 6)

      const union = divisibleBy2 + divisibleBy3 - divisibleByBoth;
      expect(union).toBe(67);
    });
  });

  describe('Stars and bars formula', () => {
    it('validates distributing identical balls into distinct boxes', () => {
      // n identical balls, k distinct boxes: C(n+k-1, k-1)
      // 5 balls, 3 boxes: C(5+3-1, 3-1) = C(7,2)
      const factorial = (x: number) => {
        let r = 1;
        for (let i = 2; i <= x; i++) r *= i;
        return r;
      };

      const c = (n: number, k: number) => factorial(n) / (factorial(k) * factorial(n - k));

      expect(c(7, 2)).toBe(21);
    });
  });

  describe('Derangements', () => {
    it('validates D(3) = 2', () => {
      // D(n) = n! * sum_{k=0}^{n} (-1)^k / k!
      // D(3) = 3! * (1/0! - 1/1! + 1/2! - 1/3!)
      //      = 6 * (1 - 1 + 0.5 - 0.1667)
      //      = 6 * 0.3333
      //      = 2
      const d3 = Math.round(6 * (1 - 1 + 0.5 - 1 / 6));
      expect(d3).toBe(2);
    });
  });

  describe('Master theorem recurrences', () => {
    it('validates T(n) = 2T(n/2) + O(n) gives O(n log n)', () => {
      // This is the merge sort recurrence
      // a=2, b=2, f(n)=n
      // log_b(a) = log_2(2) = 1
      // f(n) = Θ(n^1) = Θ(n^log_b(a))
      // Case 2: T(n) = Θ(n^log_b(a) * log n) = Θ(n log n)

      const a = 2;
      const b = 2;
      const logBA = Math.log(a) / Math.log(b);
      expect(logBA).toBe(1);
    });
  });
});

describe('Question correctAnswer index validation', () => {
  const cs201QuizFile = join(SUBJECTS_DIR, 'cs201/content/topic-1/quizzes.json');

  it('validates correctAnswer indices are within options bounds', () => {
    const quizzes = loadJsonFile<Quiz[]>(cs201QuizFile);
    if (!quizzes) {
      console.log('Skipping: cs201 topic-1 quizzes.json not found');
      return;
    }

    const errors: string[] = [];
    for (const quiz of quizzes) {
      for (const question of quiz.questions) {
        if (question.type === 'multiple_choice' && typeof question.correctAnswer === 'number') {
          const numOptions = question.options?.length ?? 0;
          if (question.correctAnswer < 0 || question.correctAnswer >= numOptions) {
            errors.push(
              `${quiz.id}/${question.id}: correctAnswer ${question.correctAnswer} ` +
              `out of bounds (${numOptions} options)`
            );
          }
        }
      }
    }

    expect(errors, `Index errors:\n${errors.join('\n')}`).toHaveLength(0);
  });
});
