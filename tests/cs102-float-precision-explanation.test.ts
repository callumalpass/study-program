/**
 * CS102 Float Precision Explanation Tests
 *
 * Validates that the explanation for the 32-bit float precision question
 * correctly explains the relationship between mantissa bits and decimal precision.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation?: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
}

describe('CS102 Float Precision Explanation', () => {
  let quizzes: Quiz[];

  beforeAll(() => {
    const content = readFileSync('src/subjects/cs102/content/topic-3/quizzes.json', 'utf-8');
    quizzes = JSON.parse(content) as Quiz[];
  });

  it('should load CS102 topic 3 quizzes', () => {
    expect(quizzes.length).toBeGreaterThan(0);
  });

  describe('cs102-q3-c-4 float precision question', () => {
    let floatPrecisionQuestion: QuizQuestion | undefined;

    beforeAll(() => {
      for (const quiz of quizzes) {
        const question = quiz.questions.find(q => q.id === 'cs102-q3-c-4');
        if (question) {
          floatPrecisionQuestion = question;
          break;
        }
      }
    });

    it('should exist', () => {
      expect(floatPrecisionQuestion).toBeDefined();
    });

    it('should be a fill_blank question', () => {
      expect(floatPrecisionQuestion?.type).toBe('fill_blank');
    });

    it('should have correct answer of 7', () => {
      expect(floatPrecisionQuestion?.correctAnswer).toBe('7');
    });

    it('should ask about 32-bit float precision', () => {
      expect(floatPrecisionQuestion?.prompt.toLowerCase()).toContain('32-bit');
      expect(floatPrecisionQuestion?.prompt.toLowerCase()).toContain('float');
      expect(floatPrecisionQuestion?.prompt.toLowerCase()).toContain('precision');
    });

    it('should have explanation mentioning 23 explicit bits plus 1 implicit bit', () => {
      const explanation = floatPrecisionQuestion?.explanation?.toLowerCase() || '';
      // The explanation should clarify that there are 23 explicit bits + 1 implicit bit = 24 bits total
      expect(explanation).toContain('23');
      expect(explanation).toContain('implicit');
      expect(explanation).toContain('24');
    });

    it('should have explanation mentioning log10(2^24) calculation', () => {
      const explanation = floatPrecisionQuestion?.explanation || '';
      // The explanation should reference the log calculation
      expect(explanation).toMatch(/log.*2\^?24|2\^24.*log/i);
    });

    it('should have explanation mentioning approximately 7.22 decimal digits', () => {
      const explanation = floatPrecisionQuestion?.explanation || '';
      expect(explanation).toContain('7.22');
    });
  });

  describe('IEEE 754 single precision facts', () => {
    it('confirms 32-bit float has 23 explicit + 1 implicit = 24 bits of precision', () => {
      // Mathematical verification
      // IEEE 754 single precision:
      // - 1 sign bit
      // - 8 exponent bits
      // - 23 mantissa bits (explicit) + 1 implicit leading bit = 24 bits of precision
      const explicitMantissaBits = 23;
      const implicitBit = 1;
      const totalPrecisionBits = explicitMantissaBits + implicitBit;

      expect(totalPrecisionBits).toBe(24);
    });

    it('confirms log10(2^24) ≈ 7.22', () => {
      // Mathematical verification
      const precisionBits = 24;
      const decimalDigits = Math.log10(Math.pow(2, precisionBits));

      expect(decimalDigits).toBeCloseTo(7.22, 1);
      expect(Math.floor(decimalDigits)).toBe(7);
    });
  });
});
