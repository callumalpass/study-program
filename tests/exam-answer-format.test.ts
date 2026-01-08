/**
 * Exam Answer Format Validation Tests
 *
 * Tests that validate exam multiple choice questions use numeric indices
 * for correctAnswer fields (not string option text).
 *
 * This test was created to prevent regression after fixing math303 and math304
 * exam files which incorrectly used string values for correctAnswer.
 */

import { describe, expect, it } from 'vitest';

// Import all exam data
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

describe('Exam Multiple Choice Answer Format', () => {
  it('should have exams to validate', () => {
    expect(allExams.length).toBeGreaterThan(0);
  });

  describe('multiple choice correctAnswer should be numeric index', () => {
    const multipleChoiceQuestions = allExams.flatMap(exam =>
      exam.questions
        .filter(q => q.type === 'multiple_choice')
        .map(q => ({ exam, question: q }))
    );

    it('should have multiple choice questions to validate', () => {
      expect(multipleChoiceQuestions.length).toBeGreaterThan(100);
    });

    multipleChoiceQuestions.forEach(({ exam, question }) => {
      it(`${exam.id}/${question.id}: correctAnswer should be a number`, () => {
        expect(
          typeof question.correctAnswer,
          `Expected numeric index but got "${question.correctAnswer}" (type: ${typeof question.correctAnswer})`
        ).toBe('number');
      });
    });

    multipleChoiceQuestions.forEach(({ exam, question }) => {
      it(`${exam.id}/${question.id}: correctAnswer should be valid index`, () => {
        if (typeof question.correctAnswer === 'number' && question.options) {
          expect(
            question.correctAnswer,
            `Index ${question.correctAnswer} is out of bounds for options array of length ${question.options.length}`
          ).toBeGreaterThanOrEqual(0);
          expect(
            question.correctAnswer,
            `Index ${question.correctAnswer} is out of bounds for options array of length ${question.options.length}`
          ).toBeLessThan(question.options.length);
        }
      });
    });
  });

  describe('math303 and math304 specific validation', () => {
    const math303Exams = allExams.filter(e => e.subjectId === 'math303');
    const math304Exams = allExams.filter(e => e.subjectId === 'math304');

    it('math303 exams should exist', () => {
      expect(math303Exams.length).toBeGreaterThan(0);
    });

    it('math304 exams should exist', () => {
      expect(math304Exams.length).toBeGreaterThan(0);
    });

    it('math303 multiple choice questions should have numeric correctAnswer', () => {
      const mcQuestions = math303Exams.flatMap(exam =>
        exam.questions.filter(q => q.type === 'multiple_choice')
      );

      mcQuestions.forEach(q => {
        expect(
          typeof q.correctAnswer,
          `math303 question ${q.id}: expected numeric correctAnswer but got "${q.correctAnswer}"`
        ).toBe('number');
      });
    });

    it('math304 multiple choice questions should have numeric correctAnswer', () => {
      const mcQuestions = math304Exams.flatMap(exam =>
        exam.questions.filter(q => q.type === 'multiple_choice')
      );

      mcQuestions.forEach(q => {
        expect(
          typeof q.correctAnswer,
          `math304 question ${q.id}: expected numeric correctAnswer but got "${q.correctAnswer}"`
        ).toBe('number');
      });
    });
  });
});
