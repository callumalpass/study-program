/**
 * CS303 Exam Coding Questions Validation Tests
 *
 * These tests validate that the CS303 (Programming Languages) exam coding questions
 * have proper testCases arrays for automated grading.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

interface TestCase {
  input: string;
  description: string;
  isHidden: boolean;
}

interface CodingQuestion {
  id: string;
  type: 'coding';
  prompt: string;
  correctAnswer: string;
  solution: string;
  language: string;
  testCases: TestCase[];
  starterCode: string;
  explanation: string;
}

interface Exam {
  id: string;
  subjectId: string;
  title: string;
  durationMinutes: number;
  instructions: string[];
  questions: Array<{
    id: string;
    type: string;
    testCases?: TestCase[];
    language?: string;
    starterCode?: string;
  }>;
}

const CS303_EXAMS_PATH = join(__dirname, '../src/subjects/cs303/exams.json');

describe('CS303 Exam Coding Questions Validation', () => {
  const exams: Exam[] = JSON.parse(readFileSync(CS303_EXAMS_PATH, 'utf-8'));

  describe('CS303 Midterm Exam', () => {
    const midterm = exams.find((e) => e.id === 'cs303-exam-midterm');

    it('should have a midterm exam', () => {
      expect(midterm).toBeDefined();
    });

    it('should have coding questions with testCases', () => {
      const codingQuestions = midterm!.questions.filter((q) => q.type === 'coding');
      expect(codingQuestions.length).toBeGreaterThan(0);

      for (const question of codingQuestions) {
        expect(
          question.testCases,
          `Coding question ${question.id} should have testCases`
        ).toBeDefined();
        expect(
          Array.isArray(question.testCases),
          `Coding question ${question.id} testCases should be an array`
        ).toBe(true);
        expect(
          question.testCases!.length,
          `Coding question ${question.id} should have at least 1 test case`
        ).toBeGreaterThanOrEqual(1);
      }
    });

    it('should have coding questions with starterCode', () => {
      const codingQuestions = midterm!.questions.filter((q) => q.type === 'coding');

      for (const question of codingQuestions) {
        expect(
          question.starterCode,
          `Coding question ${question.id} should have starterCode`
        ).toBeDefined();
        expect(
          typeof question.starterCode,
          `Coding question ${question.id} starterCode should be a string`
        ).toBe('string');
      }
    });

    it('should have coding questions with language specified', () => {
      const codingQuestions = midterm!.questions.filter((q) => q.type === 'coding');

      for (const question of codingQuestions) {
        expect(
          question.language,
          `Coding question ${question.id} should have language`
        ).toBeDefined();
        expect(question.language).toBe('python');
      }
    });

    it('cs303-mid-q22 (compose) should have testCases', () => {
      const q22 = midterm!.questions.find((q) => q.id === 'cs303-mid-q22');
      expect(q22).toBeDefined();
      expect(q22!.testCases).toBeDefined();
      expect(q22!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-mid-q23 (memoization) should have testCases', () => {
      const q23 = midterm!.questions.find((q) => q.id === 'cs303-mid-q23');
      expect(q23).toBeDefined();
      expect(q23!.testCases).toBeDefined();
      expect(q23!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-mid-q24 (currying) should have testCases', () => {
      const q24 = midterm!.questions.find((q) => q.id === 'cs303-mid-q24');
      expect(q24).toBeDefined();
      expect(q24!.testCases).toBeDefined();
      expect(q24!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-mid-q25 (map with reduce) should have testCases', () => {
      const q25 = midterm!.questions.find((q) => q.id === 'cs303-mid-q25');
      expect(q25).toBeDefined();
      expect(q25!.testCases).toBeDefined();
      expect(q25!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-mid-q26 (type checker) should have testCases', () => {
      const q26 = midterm!.questions.find((q) => q.id === 'cs303-mid-q26');
      expect(q26).toBeDefined();
      expect(q26!.testCases).toBeDefined();
      expect(q26!.testCases!.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('CS303 Final Exam', () => {
    const final = exams.find((e) => e.id === 'cs303-exam-final');

    it('should have a final exam', () => {
      expect(final).toBeDefined();
    });

    it('should have coding questions with testCases', () => {
      const codingQuestions = final!.questions.filter((q) => q.type === 'coding');
      expect(codingQuestions.length).toBeGreaterThan(0);

      for (const question of codingQuestions) {
        expect(
          question.testCases,
          `Coding question ${question.id} should have testCases`
        ).toBeDefined();
        expect(
          Array.isArray(question.testCases),
          `Coding question ${question.id} testCases should be an array`
        ).toBe(true);
        expect(
          question.testCases!.length,
          `Coding question ${question.id} should have at least 1 test case`
        ).toBeGreaterThanOrEqual(1);
      }
    });

    it('should have coding questions with starterCode', () => {
      const codingQuestions = final!.questions.filter((q) => q.type === 'coding');

      for (const question of codingQuestions) {
        expect(
          question.starterCode,
          `Coding question ${question.id} should have starterCode`
        ).toBeDefined();
      }
    });

    it('cs303-final-q31 (big-step evaluator) should have testCases', () => {
      const q31 = final!.questions.find((q) => q.id === 'cs303-final-q31');
      expect(q31).toBeDefined();
      expect(q31!.testCases).toBeDefined();
      expect(q31!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-final-q32 (Y combinator) should have testCases', () => {
      const q32 = final!.questions.find((q) => q.id === 'cs303-final-q32');
      expect(q32).toBeDefined();
      expect(q32!.testCases).toBeDefined();
      expect(q32!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-final-q33 (mark phase GC) should have testCases', () => {
      const q33 = final!.questions.find((q) => q.id === 'cs303-final-q33');
      expect(q33).toBeDefined();
      expect(q33!.testCases).toBeDefined();
      expect(q33!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-final-q34 (trampolining) should have testCases', () => {
      const q34 = final!.questions.find((q) => q.id === 'cs303-final-q34');
      expect(q34).toBeDefined();
      expect(q34!.testCases).toBeDefined();
      expect(q34!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-final-q35 (fibonacci generator) should have testCases', () => {
      const q35 = final!.questions.find((q) => q.id === 'cs303-final-q35');
      expect(q35).toBeDefined();
      expect(q35!.testCases).toBeDefined();
      expect(q35!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-final-q36 (type checking decorator) should have testCases', () => {
      const q36 = final!.questions.find((q) => q.id === 'cs303-final-q36');
      expect(q36).toBeDefined();
      expect(q36!.testCases).toBeDefined();
      expect(q36!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-final-q37 (pattern matching) should have testCases', () => {
      const q37 = final!.questions.find((q) => q.id === 'cs303-final-q37');
      expect(q37).toBeDefined();
      expect(q37!.testCases).toBeDefined();
      expect(q37!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-final-q38 (bytecode compiler) should have testCases', () => {
      const q38 = final!.questions.find((q) => q.id === 'cs303-final-q38');
      expect(q38).toBeDefined();
      expect(q38!.testCases).toBeDefined();
      expect(q38!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-final-q39 (reference counting) should have testCases', () => {
      const q39 = final!.questions.find((q) => q.id === 'cs303-final-q39');
      expect(q39).toBeDefined();
      expect(q39!.testCases).toBeDefined();
      expect(q39!.testCases!.length).toBeGreaterThanOrEqual(2);
    });

    it('cs303-final-q40 (abstract interpretation) should have testCases', () => {
      const q40 = final!.questions.find((q) => q.id === 'cs303-final-q40');
      expect(q40).toBeDefined();
      expect(q40!.testCases).toBeDefined();
      expect(q40!.testCases!.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Test case structure validation', () => {
    it('all test cases should have required fields', () => {
      for (const exam of exams) {
        const codingQuestions = exam.questions.filter((q) => q.type === 'coding');

        for (const question of codingQuestions) {
          if (question.testCases) {
            for (const testCase of question.testCases) {
              expect(
                testCase.input,
                `Test case in ${question.id} should have input`
              ).toBeDefined();
              expect(
                testCase.description,
                `Test case in ${question.id} should have description`
              ).toBeDefined();
              expect(
                typeof testCase.isHidden,
                `Test case in ${question.id} should have isHidden as boolean`
              ).toBe('boolean');
            }
          }
        }
      }
    });
  });
});
