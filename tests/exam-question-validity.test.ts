/**
 * Exam Question Validity Tests
 *
 * Tests that validate exam questions for critical issues such as:
 * - "NOT a property of X" questions where all options ARE properties
 * - Missing essential question components
 *
 * This is focused on catching logically broken questions rather than
 * minor formatting issues.
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
const allExams: Exam[] = Object.values(examModules).flatMap((module: any) => {
  return Array.isArray(module.default) ? module.default : [];
});

describe('Exam Question Validity - Critical Issues', () => {
  describe('NOT/EXCEPT questions should not have explanations indicating all options are valid', () => {
    // Find all "NOT" or "EXCEPT" questions - these are asking for the FALSE option
    const notQuestions = allExams.flatMap(exam =>
      exam.questions
        .filter(q =>
          q.type === 'multiple_choice' &&
          q.explanation &&
          (q.prompt.includes(' NOT ') ||
           q.prompt.includes('is not') ||
           q.prompt.includes('EXCEPT') ||
           q.prompt.includes('INCORRECT') ||
           q.prompt.toLowerCase().includes('which is not'))
        )
        .map(q => ({ exam, question: q }))
    );

    it('should have identified NOT/EXCEPT questions to validate', () => {
      expect(notQuestions.length).toBeGreaterThan(0);
    });

    notQuestions.forEach(({ exam, question }) => {
      it(`${exam.id}/${question.id}: explanation should not indicate all options are true`, () => {
        const explanation = question.explanation?.toLowerCase() || '';

        // Check for phrases that indicate a problematic question
        // These phrases suggest the question writer made an error
        const problematicPhrases = [
          'all options are true',
          'all options are correct',
          'trick question',
          'all of the above are properties',
          'all four are properties',
          'all four options are',
        ];

        const hasProblematicPhrase = problematicPhrases.some(phrase =>
          explanation.includes(phrase)
        );

        if (hasProblematicPhrase) {
          throw new Error(
            `Question "${question.prompt.substring(0, 50)}..." has an explanation ` +
            `that indicates all options are valid, but it asks for the INVALID option: ` +
            `"${question.explanation}"`
          );
        }
      });
    });
  });

  describe('All questions have essential components', () => {
    it('should have exams to validate', () => {
      expect(allExams.length).toBeGreaterThan(0);
    });

    allExams.forEach(exam => {
      it(`${exam.id}: all questions should have prompts`, () => {
        exam.questions.forEach(q => {
          expect(q.prompt, `Question ${q.id} has no prompt`).toBeDefined();
          expect(q.prompt.length, `Question ${q.id} has empty prompt`).toBeGreaterThan(0);
        });
      });

      it(`${exam.id}: all questions should have valid types`, () => {
        const validTypes = ['multiple_choice', 'true_false', 'fill_blank', 'code_output', 'written', 'coding'];
        exam.questions.forEach(q => {
          expect(validTypes, `Question ${q.id} has invalid type: ${q.type}`).toContain(q.type);
        });
      });

      it(`${exam.id}: multiple choice questions should have options`, () => {
        const mcQuestions = exam.questions.filter(q => q.type === 'multiple_choice');
        mcQuestions.forEach(q => {
          expect(q.options, `Question ${q.id} has no options`).toBeDefined();
          expect(q.options?.length, `Question ${q.id} has no options`).toBeGreaterThan(1);
        });
      });

      it(`${exam.id}: should have unique question IDs`, () => {
        const ids = exam.questions.map(q => q.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size, 'Duplicate question IDs found').toBe(ids.length);
      });
    });
  });
});

describe('Exam Structure Validation', () => {
  it('should have exams from multiple subjects', () => {
    const subjectIds = new Set(allExams.map(e => e.subjectId));
    expect(subjectIds.size).toBeGreaterThan(10);
  });

  it('each exam should have a reasonable number of questions', () => {
    allExams.forEach(exam => {
      expect(
        exam.questions.length,
        `${exam.id} has too few questions`
      ).toBeGreaterThanOrEqual(5);
    });
  });
});
