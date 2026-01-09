/**
 * Math204 Partial Fractions Validation Tests
 *
 * These tests validate that the correctAnswer fields for partial fractions
 * questions in the Math204 exams match the mathematical calculations in the modelAnswer.
 *
 * Background: Partial fractions questions require computing coefficients A and B
 * for expressions like:
 *   ∫ (x+3)/(x²+2x) dx = ∫ [A/x + B/(x+2)] dx
 *
 * The correctAnswer must match the result of the integration using the correct
 * values of A and B.
 */

import { describe, it, expect } from 'vitest';
import math204Exams from '../src/subjects/math204/exams.json';

describe('Math204 Exam Partial Fractions Questions', () => {
  describe('Midterm Q19: ∫ (x+3)/(x²+2x) dx', () => {
    const exam = math204Exams.find((e) => e.id === 'math204-exam-midterm');
    const question = exam?.questions.find((q) => q.id === 'math204-mid-q19');

    it('should have the question', () => {
      expect(question).toBeDefined();
      expect(question?.type).toBe('written');
    });

    it('correctAnswer should match the calculated result', () => {
      // For ∫ (x+3)/(x(x+2)) dx:
      // (x+3)/(x(x+2)) = A/x + B/(x+2)
      // x + 3 = A(x+2) + Bx
      // At x=0: 3 = 2A → A = 3/2
      // At x=-2: 1 = -2B → B = -1/2
      //
      // Result: (3/2)ln|x| - (1/2)ln|x+2| + C
      const expectedAnswer = '(3/2)ln|x| - (1/2)ln|x+2| + C';
      expect(question?.correctAnswer).toBe(expectedAnswer);
    });

    it('modelAnswer should contain the correct coefficients', () => {
      const modelAnswer = question?.modelAnswer || '';

      // Check that A = 3/2 is stated
      expect(modelAnswer).toContain('A = \\frac{3}{2}');

      // Check that B = -1/2 is stated
      expect(modelAnswer).toContain('B = -\\frac{1}{2}');

      // Check that the final answer is included
      expect(modelAnswer).toContain('\\frac{3}{2}\\ln|x| - \\frac{1}{2}\\ln|x+2| + C');
    });

    it('modelAnswer should not contain self-correction text', () => {
      const modelAnswer = question?.modelAnswer || '';

      // These phrases were artifacts from the original authoring process
      expect(modelAnswer).not.toContain('Wait, let me');
      expect(modelAnswer).not.toContain('is wrong');
      expect(modelAnswer).not.toContain('is incorrect');
      expect(modelAnswer).not.toContain('Let me redo');
      expect(modelAnswer).not.toContain('Let me try again');
    });
  });

  describe('Final Q16: ∫ (3x-1)/(x²-x-2) dx', () => {
    const exam = math204Exams.find((e) => e.id === 'math204-exam-final');
    const question = exam?.questions.find((q) => q.id === 'math204-final-q16');

    it('should have the question', () => {
      expect(question).toBeDefined();
      expect(question?.type).toBe('written');
    });

    it('correctAnswer should match the calculated result', () => {
      // For ∫ (3x-1)/((x-2)(x+1)) dx:
      // (3x-1)/((x-2)(x+1)) = A/(x-2) + B/(x+1)
      // 3x - 1 = A(x+1) + B(x-2)
      // At x=2: 5 = 3A → A = 5/3
      // At x=-1: -4 = -3B → B = 4/3
      //
      // Result: (5/3)ln|x-2| + (4/3)ln|x+1| + C
      const expectedAnswer = '(5/3)ln|x-2| + (4/3)ln|x+1| + C';
      expect(question?.correctAnswer).toBe(expectedAnswer);
    });

    it('modelAnswer should contain the correct coefficients', () => {
      const modelAnswer = question?.modelAnswer || '';

      // Check that A = 5/3 is stated
      expect(modelAnswer).toContain('A = \\frac{5}{3}');

      // Check that B = 4/3 is stated
      expect(modelAnswer).toContain('B = \\frac{4}{3}');

      // Check that the final answer is included
      expect(modelAnswer).toContain('\\frac{5}{3}\\ln|x-2| + \\frac{4}{3}\\ln|x+1| + C');
    });

    it('modelAnswer should not contain self-correction text', () => {
      const modelAnswer = question?.modelAnswer || '';

      expect(modelAnswer).not.toContain('Wait, let me');
      expect(modelAnswer).not.toContain('is wrong');
      expect(modelAnswer).not.toContain('is incorrect');
      expect(modelAnswer).not.toContain('Let me try again');
      expect(modelAnswer).not.toContain('hmm');
    });
  });
});

describe('Math204 Exam Written Questions - General Validation', () => {
  const allWrittenQuestions = math204Exams.flatMap((exam) =>
    exam.questions
      .filter((q) => q.type === 'written')
      .map((q) => ({ exam, question: q }))
  );

  it('should have written questions to validate', () => {
    expect(allWrittenQuestions.length).toBeGreaterThan(0);
  });

  describe('modelAnswer quality checks', () => {
    allWrittenQuestions.forEach(({ exam, question }) => {
      it(`${exam.id}/${question.id}: should not have work-in-progress text`, () => {
        const modelAnswer = (question as { modelAnswer?: string }).modelAnswer || '';

        // Check for phrases that indicate incomplete editing
        const problematicPhrases = [
          'wait, let me',
          'let me recalculate',
          'is wrong',
          'is incorrect',
          'let me redo',
          'let me try again',
          '... hmm',
        ];

        for (const phrase of problematicPhrases) {
          expect(
            modelAnswer.toLowerCase(),
            `Found "${phrase}" in modelAnswer for ${question.id}`
          ).not.toContain(phrase);
        }
      });
    });
  });
});
