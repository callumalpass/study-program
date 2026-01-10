/**
 * Tests to validate that binary conversion questions in CS102 exams
 * have unambiguous options (no options that represent the same numeric value).
 *
 * This prevents issues like having both "101101" and "00101101" as options
 * for "Convert 45 to binary" - both are valid representations of 45.
 */

import { describe, it, expect } from 'vitest';
import cs102Exams from '../src/subjects/cs102/exams.json';

/**
 * Parse a binary string to a decimal number.
 * Returns NaN if not a valid binary string.
 */
function parseBinary(str: string): number {
  // Check if the string only contains 0s and 1s
  if (!/^[01]+$/.test(str)) {
    return NaN;
  }
  return parseInt(str, 2);
}

/**
 * Check if a string looks like a binary number (only 0s and 1s).
 */
function looksLikeBinary(str: string): boolean {
  return /^[01]+$/.test(str);
}

describe('CS102 Binary Question Validation', () => {
  describe('binary conversion questions should have unique numeric values', () => {
    const allExams = cs102Exams as Array<{
      id: string;
      questions: Array<{
        id: string;
        type: string;
        prompt: string;
        options?: string[];
        correctAnswer?: number | string | boolean;
      }>;
    }>;

    for (const exam of allExams) {
      for (const question of exam.questions) {
        // Only check multiple choice questions with options that look like binary
        if (question.type !== 'multiple_choice' || !question.options) {
          continue;
        }

        // Check if the prompt mentions binary conversion
        const promptLower = question.prompt.toLowerCase();
        const isBinaryQuestion =
          promptLower.includes('binary') ||
          promptLower.includes('convert') && question.options.some(looksLikeBinary);

        if (!isBinaryQuestion) {
          continue;
        }

        // Check if options contain binary-looking strings
        const binaryOptions = question.options.filter(looksLikeBinary);
        if (binaryOptions.length < 2) {
          continue;
        }

        it(`${exam.id}/${question.id}: binary options should have distinct numeric values`, () => {
          const numericValues = binaryOptions.map(opt => parseBinary(opt));
          const uniqueValues = new Set(numericValues.filter(v => !isNaN(v)));

          // All binary options should represent different numbers
          expect(uniqueValues.size).toBe(
            numericValues.filter(v => !isNaN(v)).length,
            `Question has binary options that evaluate to the same number: ${binaryOptions.join(', ')}`
          );
        });

        it(`${exam.id}/${question.id}: correct answer should be unambiguous`, () => {
          if (typeof question.correctAnswer !== 'number') {
            return; // Skip if not a numeric index
          }

          const correctOption = question.options[question.correctAnswer];
          if (!looksLikeBinary(correctOption)) {
            return; // Skip if correct answer doesn't look like binary
          }

          const correctValue = parseBinary(correctOption);

          // Check that no other option has the same numeric value
          for (let i = 0; i < question.options.length; i++) {
            if (i === question.correctAnswer) continue;

            const option = question.options[i];
            if (looksLikeBinary(option)) {
              const optionValue = parseBinary(option);
              expect(optionValue).not.toBe(
                correctValue,
                `Option ${i} (${option}) has the same numeric value as the correct answer (${correctOption})`
              );
            }
          }
        });
      }
    }
  });

  describe('cs102-mid-1 specific validation', () => {
    it('should have 101101 as the correct answer for decimal 45', () => {
      const midterm = cs102Exams.find((e: { id: string }) => e.id === 'cs102-midterm');
      expect(midterm).toBeDefined();

      const q1 = midterm?.questions.find((q: { id: string }) => q.id === 'cs102-mid-1');
      expect(q1).toBeDefined();
      expect(q1?.type).toBe('multiple_choice');
      expect(q1?.options).toBeDefined();

      // Verify the correct answer index points to 101101
      const correctIndex = q1?.correctAnswer as number;
      expect(q1?.options?.[correctIndex]).toBe('101101');

      // Verify 101101 is indeed 45 in decimal
      expect(parseBinary('101101')).toBe(45);
    });

    it('should not have leading-zero variants as options', () => {
      const midterm = cs102Exams.find((e: { id: string }) => e.id === 'cs102-midterm');
      const q1 = midterm?.questions.find((q: { id: string }) => q.id === 'cs102-mid-1');

      // None of the options should be a leading-zero padded version of 45
      const options = q1?.options ?? [];
      for (const option of options) {
        if (looksLikeBinary(option) && option.startsWith('0')) {
          // If it starts with 0, it shouldn't evaluate to 45
          expect(parseBinary(option)).not.toBe(45);
        }
      }
    });

    it('all incorrect options should be distinct wrong values', () => {
      const midterm = cs102Exams.find((e: { id: string }) => e.id === 'cs102-midterm');
      const q1 = midterm?.questions.find((q: { id: string }) => q.id === 'cs102-mid-1');

      const options = q1?.options ?? [];
      const values = options.filter(looksLikeBinary).map(parseBinary);

      // All values should be unique (no duplicates)
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);

      // Correct answer should be 45
      const correctIndex = q1?.correctAnswer as number;
      expect(values[correctIndex]).toBe(45);

      // Other values should not be 45
      for (let i = 0; i < values.length; i++) {
        if (i !== correctIndex) {
          expect(values[i]).not.toBe(45);
        }
      }
    });
  });

  describe('binary arithmetic questions validation', () => {
    it('cs102-mid-4 binary addition should have correct answer', () => {
      const midterm = cs102Exams.find((e: { id: string }) => e.id === 'cs102-midterm');
      const q4 = midterm?.questions.find((q: { id: string }) => q.id === 'cs102-mid-4');

      expect(q4).toBeDefined();
      expect(q4?.prompt).toContain('1100 + 0101');

      // 1100 (12) + 0101 (5) = 10001 (17)
      const a = parseBinary('1100'); // 12
      const b = parseBinary('0101'); // 5
      expect(a + b).toBe(17);

      // The correct answer should be 10001
      const correctIndex = q4?.correctAnswer as number;
      const correctOption = q4?.options?.[correctIndex];
      expect(parseBinary(correctOption ?? '')).toBe(17);
    });
  });
});
