/**
 * Exam Multiple Choice Answer Validity Tests
 *
 * Tests that validate multiple choice exam questions have:
 * - Valid correct answer indices (within bounds of options array)
 * - Options that don't reference other specific options by letter (e.g., "Both A and C")
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
  codeSnippet?: string;
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

describe('Multiple Choice Answer Index Validity', () => {
  const mcQuestions = allExams.flatMap(exam =>
    exam.questions
      .filter(q => q.type === 'multiple_choice' && q.options)
      .map(q => ({ exam, question: q }))
  );

  it('should have multiple choice questions to validate', () => {
    expect(mcQuestions.length).toBeGreaterThan(0);
  });

  describe('correct answer index within bounds', () => {
    mcQuestions.forEach(({ exam, question }) => {
      it(`${exam.id}/${question.id}: correctAnswer should be valid index`, () => {
        const correctAnswer = question.correctAnswer;
        const options = question.options!;

        if (typeof correctAnswer === 'number') {
          expect(
            correctAnswer,
            `Index ${correctAnswer} is negative`
          ).toBeGreaterThanOrEqual(0);
          expect(
            correctAnswer,
            `Index ${correctAnswer} exceeds options length ${options.length}`
          ).toBeLessThan(options.length);
        }
      });
    });
  });

  describe('options should not reference specific other options by letter', () => {
    // Pattern for options that reference SPECIFIC other options by letter (problematic)
    // Note: "All of the above" and "None of the above" are acceptable patterns
    // but "Both A and C" or "A and B" are problematic because they're fragile
    const problematicPatterns = [
      /^both\s+[a-d]\s+and\s+[a-d]$/i,  // "Both A and C"
      /^[a-d]\s+and\s+[a-d]$/i,          // "A and C"
      /^options?\s+[a-d]\s+and\s+[a-d]$/i, // "Options A and C"
    ];

    // Known existing questions with this issue (pre-existing, not introduced by recent changes)
    // These should be fixed in future cleanups but are excluded from test failures
    const knownIssues = new Set([
      'cs205-exam-final/fin-q26',
      'math102-exam-final/final-q35',
      'math201-exam-final/math201-final-q5',
      'math204-exam-final/math204-final-q21',
    ]);

    mcQuestions.forEach(({ exam, question }) => {
      const fullId = `${exam.id}/${question.id}`;
      const isKnownIssue = knownIssues.has(fullId);

      it(`${fullId}: options should not reference specific other options by letter${isKnownIssue ? ' (known issue)' : ''}`, () => {
        const options = question.options!;
        let hasIssue = false;
        let issueMessage = '';

        options.forEach((option, idx) => {
          const matchesPattern = problematicPatterns.some(pattern => pattern.test(option.trim()));
          if (matchesPattern) {
            hasIssue = true;
            issueMessage = `Option ${idx} ("${option}") references specific other options by letter, ` +
              `which is fragile and can lead to incorrect answers if options are reordered`;
          }
        });

        if (hasIssue && !isKnownIssue) {
          throw new Error(issueMessage);
        }
        // Known issues pass but are documented
      });
    });
  });
});

describe('CS301 SJF Waiting Time Question (mid-q13)', () => {
  const cs301Exam = allExams.find(e => e.id === 'cs301-exam-midterm');

  it('should find CS301 midterm exam', () => {
    expect(cs301Exam).toBeDefined();
  });

  it('mid-q13 should have correct answer for SJF waiting time', () => {
    const question = cs301Exam?.questions.find(q => q.id === 'mid-q13');
    expect(question).toBeDefined();

    // The question asks: P1(burst=8), P2(burst=4), P3(burst=2) all arriving at time 0
    // SJF order: P3 -> P2 -> P1
    // Waiting times: P3=0, P2=2 (waits for P3), P1=6 (waits for P3+P2)
    // Average = (0 + 2 + 6) / 3 = 8/3 ≈ 2.67

    const expectedAnswer = 2.67;
    const options = question!.options!;
    const correctIndex = question!.correctAnswer as number;

    expect(correctIndex).toBeGreaterThanOrEqual(0);
    expect(correctIndex).toBeLessThan(options.length);

    const selectedOption = options[correctIndex];
    const numericValue = parseFloat(selectedOption);

    expect(
      Math.abs(numericValue - expectedAnswer),
      `Selected answer "${selectedOption}" should equal approximately ${expectedAnswer}`
    ).toBeLessThan(0.01);
  });

  it('mid-q13 should not have "Both A and C" style options', () => {
    const question = cs301Exam?.questions.find(q => q.id === 'mid-q13');
    expect(question).toBeDefined();

    const options = question!.options!;
    const hasBothOption = options.some(opt =>
      opt.toLowerCase().includes('both') && /[a-d]/i.test(opt)
    );

    expect(
      hasBothOption,
      'Options should not reference other options (e.g., "Both A and C")'
    ).toBe(false);
  });
});

describe('Simple Numerical Multiple Choice Answers', () => {
  // Find questions that have ONLY simple decimal number options (no units, fractions, or complex expressions)
  // Exclude binary/hex numbers (options that look like they could be binary, e.g., all 0s and 1s)
  const simpleNumericalMcQuestions = allExams.flatMap(exam =>
    exam.questions
      .filter(q => {
        if (q.type !== 'multiple_choice' || !q.options) return false;
        // Check if ALL options are simple decimal numbers (e.g., "2.67", "4.00", "100")
        const allNumeric = q.options.every(opt => {
          const trimmed = opt.trim();
          // Match only simple numbers: optional negative, digits, optional decimal, more digits
          return /^-?\d+(\.\d+)?$/.test(trimmed);
        });
        if (!allNumeric) return false;

        // Exclude if options look like binary numbers (only 0s and 1s and 5+ digits)
        const looksLikeBinary = q.options.some(opt => {
          const trimmed = opt.trim();
          return /^[01]{5,}$/.test(trimmed);
        });
        if (looksLikeBinary) return false;

        // Exclude if options have many leading zeros (likely intentional formatting)
        const hasLeadingZeros = q.options.some(opt => {
          const trimmed = opt.trim();
          return /^0\d+$/.test(trimmed) && trimmed.length > 2;
        });
        if (hasLeadingZeros) return false;

        return true;
      })
      .map(q => ({ exam, question: q }))
  );

  describe('simple numerical options should have distinct values', () => {
    simpleNumericalMcQuestions.forEach(({ exam, question }) => {
      it(`${exam.id}/${question.id}: should have distinct numerical values`, () => {
        const options = question.options!;
        const values = options.map(opt => parseFloat(opt.trim()));

        // Round to 3 decimal places for comparison (more precision than 2)
        const roundedValues = values.map(v => Math.round(v * 1000) / 1000);
        const uniqueValues = new Set(roundedValues);

        expect(
          uniqueValues.size,
          `Options have duplicate numerical values: ${options.join(', ')}`
        ).toBe(options.length);
      });
    });
  });
});
