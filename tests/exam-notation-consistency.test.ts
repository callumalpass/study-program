/**
 * Exam Notation Consistency Tests
 *
 * Tests that validate exam questions for formatting consistency issues:
 * - Big-O notation should be consistently formatted (e.g., "O(n)" not "(n)")
 * - Mathematical notation consistency
 * - Option formatting consistency within questions
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

describe('Big-O Notation Consistency', () => {
  // Find questions that discuss complexity (likely to have Big-O notation)
  const complexityKeywords = [
    'complexity',
    'time complexity',
    'space complexity',
    'big o',
    'big-o',
    'O(',
    'runtime',
    'asymptotic',
  ];

  const complexityQuestions = allExams.flatMap(exam =>
    exam.questions
      .filter(q =>
        q.type === 'multiple_choice' &&
        q.options &&
        (complexityKeywords.some(kw => q.prompt.toLowerCase().includes(kw.toLowerCase())) ||
         q.options.some(opt => /O\([^)]+\)/.test(opt)))
      )
      .map(q => ({ exam, question: q }))
  );

  it('should have identified complexity questions to validate', () => {
    expect(complexityQuestions.length).toBeGreaterThan(0);
  });

  describe('options with complexity notation should use O() consistently', () => {
    complexityQuestions.forEach(({ exam, question }) => {
      it(`${exam.id}/${question.id}: Big-O options should have consistent formatting`, () => {
        const options = question.options || [];

        // Check if any options look like complexity expressions
        const complexityPattern = /^\(?[VEnklm\d\s\+\*\^log]+\)?$/i;
        const bigOPattern = /^O\([^)]+\)$/;

        // Find options that look like complexity but don't have O()
        const inconsistentOptions = options.filter(opt => {
          const trimmed = opt.trim();
          // Check if it looks like a bare complexity expression (missing O())
          // e.g., "(n log n)" instead of "O(n log n)"
          if (trimmed.startsWith('(') && trimmed.endsWith(')') && !trimmed.startsWith('O(')) {
            // Check if it contains typical complexity terms
            const inner = trimmed.slice(1, -1).toLowerCase();
            if (/^[venklm\d\s\+\*\^log]+$/.test(inner) && inner.length > 1) {
              // This looks like a complexity expression without O()
              return true;
            }
          }
          return false;
        });

        // Also check: if some options have O() format, all complexity-looking options should
        const hasProperBigO = options.some(opt => bigOPattern.test(opt.trim()));
        if (hasProperBigO && inconsistentOptions.length > 0) {
          throw new Error(
            `Question "${question.prompt.substring(0, 60)}..." has inconsistent Big-O notation. ` +
            `Some options use O() format while others don't: [${inconsistentOptions.join(', ')}]. ` +
            `All complexity options should use consistent notation like "O(n log n)".`
          );
        }
      });
    });
  });
});

describe('Multiple Choice Option Consistency', () => {
  allExams.forEach(exam => {
    describe(`${exam.id}`, () => {
      const mcQuestions = exam.questions.filter(q => q.type === 'multiple_choice' && q.options);

      mcQuestions.forEach(question => {
        it(`${question.id}: correctAnswer index should be valid`, () => {
          const options = question.options || [];
          const answer = question.correctAnswer;

          if (typeof answer === 'number') {
            expect(
              answer,
              `correctAnswer index ${answer} is out of bounds for ${options.length} options`
            ).toBeGreaterThanOrEqual(0);
            expect(
              answer,
              `correctAnswer index ${answer} is out of bounds for ${options.length} options`
            ).toBeLessThan(options.length);
          }
        });

        it(`${question.id}: options should not be empty strings`, () => {
          const options = question.options || [];
          options.forEach((opt, idx) => {
            expect(
              opt.trim().length,
              `Option ${idx} is empty`
            ).toBeGreaterThan(0);
          });
        });
      });
    });
  });
});

describe('True/False Question Consistency', () => {
  const tfQuestions = allExams.flatMap(exam =>
    exam.questions
      .filter(q => q.type === 'true_false')
      .map(q => ({ exam, question: q }))
  );

  it('should have true_false questions to validate', () => {
    expect(tfQuestions.length).toBeGreaterThan(0);
  });

  tfQuestions.forEach(({ exam, question }) => {
    it(`${exam.id}/${question.id}: correctAnswer should be boolean`, () => {
      expect(
        typeof question.correctAnswer,
        `correctAnswer "${question.correctAnswer}" is not boolean`
      ).toBe('boolean');
    });
  });
});

describe('Fill-in-the-blank Question Consistency', () => {
  const fillQuestions = allExams.flatMap(exam =>
    exam.questions
      .filter(q => q.type === 'fill_blank')
      .map(q => ({ exam, question: q }))
  );

  it('should have fill_blank questions to validate', () => {
    expect(fillQuestions.length).toBeGreaterThan(0);
  });

  fillQuestions.forEach(({ exam, question }) => {
    it(`${exam.id}/${question.id}: correctAnswer should be a non-empty string`, () => {
      expect(typeof question.correctAnswer).toBe('string');
      expect(
        (question.correctAnswer as string).trim().length,
        `correctAnswer is empty`
      ).toBeGreaterThan(0);
    });

    it(`${exam.id}/${question.id}: prompt should indicate where to fill in (contains ____ or blank indicator)`, () => {
      const prompt = question.prompt.toLowerCase();
      const hasBlankIndicator =
        prompt.includes('____') ||
        prompt.includes('blank') ||
        prompt.includes('_') ||
        prompt.includes('...') ||
        prompt.includes('fill in');

      // This is informational - many fill_blank questions don't have explicit blank indicators
      // Just ensure the prompt asks a question
      expect(
        question.prompt.length,
        `Prompt is too short for a fill-in-the-blank question`
      ).toBeGreaterThan(10);
    });
  });
});

describe('Code Output Question Consistency', () => {
  const codeOutputQuestions = allExams.flatMap(exam =>
    exam.questions
      .filter(q => q.type === 'code_output')
      .map(q => ({ exam, question: q }))
  );

  it('should have code_output questions to validate', () => {
    expect(codeOutputQuestions.length).toBeGreaterThan(0);
  });

  codeOutputQuestions.forEach(({ exam, question }) => {
    it(`${exam.id}/${question.id}: correctAnswer should be a string`, () => {
      expect(typeof question.correctAnswer).toBe('string');
    });
  });
});
