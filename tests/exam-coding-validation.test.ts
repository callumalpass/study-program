/**
 * Exam Coding Questions Validation Tests
 *
 * These tests validate that coding questions in exams have proper structure
 * including testCases, language, starterCode, and solution fields for automated grading.
 */

import { describe, it, expect } from 'vitest';
import { allExams } from '../src/subjects';
import type { Exam, QuizQuestion, TestCase } from '../src/core/types';

describe('Exam Coding Questions Validation', () => {
  // Get all coding questions from all exams
  const getAllCodingQuestions = (): Array<{ exam: Exam; question: QuizQuestion }> => {
    const results: Array<{ exam: Exam; question: QuizQuestion }> = [];
    for (const exam of allExams) {
      for (const question of exam.questions) {
        if (question.type === 'coding') {
          results.push({ exam, question });
        }
      }
    }
    return results;
  };

  describe('All exams coding question structure', () => {
    it('all coding questions should have language specified', () => {
      const codingQuestions = getAllCodingQuestions();

      for (const { exam, question } of codingQuestions) {
        expect(
          question.language,
          `Coding question ${question.id} in ${exam.id} should have language`
        ).toBeDefined();
        expect(
          typeof question.language,
          `Coding question ${question.id} in ${exam.id} language should be a string`
        ).toBe('string');
      }
    });

    it('all coding questions should have testCases array', () => {
      const codingQuestions = getAllCodingQuestions();

      for (const { exam, question } of codingQuestions) {
        expect(
          question.testCases,
          `Coding question ${question.id} in ${exam.id} should have testCases`
        ).toBeDefined();
        expect(
          Array.isArray(question.testCases),
          `Coding question ${question.id} in ${exam.id} testCases should be an array`
        ).toBe(true);
      }
    });

    it('all coding questions should have at least one test case', () => {
      const codingQuestions = getAllCodingQuestions();

      for (const { exam, question } of codingQuestions) {
        expect(
          question.testCases!.length,
          `Coding question ${question.id} in ${exam.id} should have at least 1 test case`
        ).toBeGreaterThanOrEqual(1);
      }
    });

    it('all coding questions should have starterCode', () => {
      const codingQuestions = getAllCodingQuestions();

      for (const { exam, question } of codingQuestions) {
        expect(
          question.starterCode,
          `Coding question ${question.id} in ${exam.id} should have starterCode`
        ).toBeDefined();
        expect(
          typeof question.starterCode,
          `Coding question ${question.id} in ${exam.id} starterCode should be a string`
        ).toBe('string');
      }
    });

    it('all coding questions should have solution', () => {
      const codingQuestions = getAllCodingQuestions();

      for (const { exam, question } of codingQuestions) {
        expect(
          question.solution,
          `Coding question ${question.id} in ${exam.id} should have solution`
        ).toBeDefined();
        expect(
          typeof question.solution,
          `Coding question ${question.id} in ${exam.id} solution should be a string`
        ).toBe('string');
      }
    });
  });

  describe('Test case structure validation', () => {
    it('all test cases should have required fields', () => {
      const codingQuestions = getAllCodingQuestions();

      for (const { exam, question } of codingQuestions) {
        if (question.testCases) {
          for (const testCase of question.testCases) {
            expect(
              testCase.input,
              `Test case in ${question.id} (${exam.id}) should have input`
            ).toBeDefined();
            expect(
              testCase.description,
              `Test case in ${question.id} (${exam.id}) should have description`
            ).toBeDefined();
            expect(
              typeof testCase.isHidden,
              `Test case in ${question.id} (${exam.id}) should have isHidden as boolean`
            ).toBe('boolean');
          }
        }
      }
    });

    it('at least one visible test case per coding question', () => {
      const codingQuestions = getAllCodingQuestions();

      for (const { exam, question } of codingQuestions) {
        if (question.testCases && question.testCases.length > 0) {
          const visibleTests = question.testCases.filter(tc => !tc.isHidden);
          expect(
            visibleTests.length,
            `Coding question ${question.id} in ${exam.id} should have at least 1 visible test case`
          ).toBeGreaterThanOrEqual(1);
        }
      }
    });
  });

  describe('CS304 Compiler exam coding questions', () => {
    const cs304Exams = allExams.filter(e => e.subjectId === 'cs304');

    it('should have CS304 exams', () => {
      expect(cs304Exams.length).toBeGreaterThan(0);
    });

    it('cs304-mid-q5 (tokenizer) should have proper structure', () => {
      const midterm = cs304Exams.find(e => e.id === 'cs304-exam-midterm');
      expect(midterm).toBeDefined();

      const q5 = midterm!.questions.find(q => q.id === 'cs304-mid-q5');
      expect(q5).toBeDefined();
      expect(q5!.type).toBe('coding');
      expect(q5!.language).toBe('python');
      expect(q5!.testCases).toBeDefined();
      expect(q5!.testCases!.length).toBeGreaterThanOrEqual(2);
      expect(q5!.starterCode).toBeDefined();
      expect(q5!.solution).toBeDefined();
    });

    it('cs304-mid-q26 (symbol table) should have proper structure', () => {
      const midterm = cs304Exams.find(e => e.id === 'cs304-exam-midterm');
      expect(midterm).toBeDefined();

      const q26 = midterm!.questions.find(q => q.id === 'cs304-mid-q26');
      expect(q26).toBeDefined();
      expect(q26!.type).toBe('coding');
      expect(q26!.language).toBe('python');
      expect(q26!.testCases).toBeDefined();
      expect(q26!.testCases!.length).toBeGreaterThanOrEqual(2);
      expect(q26!.starterCode).toBeDefined();
      expect(q26!.solution).toBeDefined();
    });

    it('cs304-final-q27 (constant folding) should have proper structure', () => {
      const final = cs304Exams.find(e => e.id === 'cs304-exam-final');
      expect(final).toBeDefined();

      const q27 = final!.questions.find(q => q.id === 'cs304-final-q27');
      expect(q27).toBeDefined();
      expect(q27!.type).toBe('coding');
      expect(q27!.language).toBe('python');
      expect(q27!.testCases).toBeDefined();
      expect(q27!.testCases!.length).toBeGreaterThanOrEqual(2);
      expect(q27!.starterCode).toBeDefined();
      expect(q27!.solution).toBeDefined();
    });
  });

  describe('CS403 Advanced Algorithms exam coding questions', () => {
    const cs403Exams = allExams.filter(e => e.subjectId === 'cs403');

    it('should have CS403 exams', () => {
      expect(cs403Exams.length).toBeGreaterThan(0);
    });

    it('cs403-final-q18 (pickPivot) should have proper structure', () => {
      const final = cs403Exams.find(e => e.id === 'cs403-final');
      expect(final).toBeDefined();

      const q18 = final!.questions.find(q => q.id === 'cs403-final-q18');
      expect(q18).toBeDefined();
      expect(q18!.type).toBe('coding');
      expect(q18!.language).toBe('python');
      expect(q18!.testCases).toBeDefined();
      expect(q18!.testCases!.length).toBeGreaterThanOrEqual(2);
      expect(q18!.starterCode).toBeDefined();
      expect(q18!.solution).toBeDefined();
    });

    it('cs403-final-q30 (lcs_length) should have proper structure', () => {
      const final = cs403Exams.find(e => e.id === 'cs403-final');
      expect(final).toBeDefined();

      const q30 = final!.questions.find(q => q.id === 'cs403-final-q30');
      expect(q30).toBeDefined();
      expect(q30!.type).toBe('coding');
      expect(q30!.language).toBe('python');
      expect(q30!.testCases).toBeDefined();
      expect(q30!.testCases!.length).toBeGreaterThanOrEqual(2);
      expect(q30!.starterCode).toBeDefined();
      expect(q30!.solution).toBeDefined();
    });
  });

  describe('Statistics', () => {
    it('reports coding question counts per subject', () => {
      const codingQuestions = getAllCodingQuestions();
      const bySubject = new Map<string, number>();

      for (const { exam } of codingQuestions) {
        const count = bySubject.get(exam.subjectId) || 0;
        bySubject.set(exam.subjectId, count + 1);
      }

      console.log('Coding questions per subject:');
      for (const [subject, count] of bySubject) {
        console.log(`  ${subject}: ${count} coding questions`);
      }

      expect(codingQuestions.length).toBeGreaterThan(0);
    });
  });
});
