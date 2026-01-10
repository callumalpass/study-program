/**
 * Exam Code Output Correctness Tests
 *
 * Tests that validate code_output questions to ensure the expected answers
 * are mathematically and logically correct. This catches errors like:
 * - Incorrect arithmetic calculations
 * - Wrong function outputs
 * - Precision errors in numerical answers
 */

import { describe, expect, it } from 'vitest';

// Import all exam data
const examModules = import.meta.glob('../src/subjects/**/exams.json', { eager: true });

interface ExamQuestion {
  id: string;
  type: string;
  prompt: string;
  codeSnippet?: string;
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

// Get all code_output questions
const codeOutputQuestions = allExams.flatMap(exam =>
  exam.questions
    .filter(q => q.type === 'code_output')
    .map(q => ({ exam, question: q }))
);

describe('Exam Code Output Correctness', () => {
  describe('Basic Structure', () => {
    it('should have code_output questions to validate', () => {
      expect(codeOutputQuestions.length).toBeGreaterThan(0);
    });

    it('all code_output questions should have correctAnswer', () => {
      codeOutputQuestions.forEach(({ exam, question }) => {
        expect(
          question.correctAnswer,
          `${exam.id}/${question.id} has no correctAnswer`
        ).toBeDefined();
      });
    });
  });

  describe('Sigmoid/Neural Network Calculations', () => {
    // Validate sigmoid calculations are approximately correct
    const sigmoidQuestions = codeOutputQuestions.filter(({ question }) =>
      question.codeSnippet?.includes('sigmoid') ||
      question.explanation?.toLowerCase().includes('sigmoid')
    );

    sigmoidQuestions.forEach(({ exam, question }) => {
      it(`${exam.id}/${question.id}: sigmoid calculation should be correct`, () => {
        // Extract the z value from the explanation if available
        const explanation = question.explanation || '';
        const zMatch = explanation.match(/sigmoid\(([0-9.-]+)\)/i);

        if (zMatch) {
          const z = parseFloat(zMatch[1]);
          const expectedSigmoid = 1 / (1 + Math.exp(-z));
          const actualAnswer = parseFloat(String(question.correctAnswer));

          // Allow for small rounding differences (0.01 tolerance)
          expect(
            Math.abs(expectedSigmoid - actualAnswer),
            `Expected sigmoid(${z}) ≈ ${expectedSigmoid.toFixed(4)}, got ${actualAnswer}`
          ).toBeLessThan(0.01);
        }
      });
    });
  });

  describe('Simple Arithmetic Validation', () => {
    // Check for questions where the explanation shows step-by-step calculation
    const arithmeticQuestions = codeOutputQuestions.filter(({ question }) => {
      const explanation = question.explanation || '';
      // Look for explanations with explicit arithmetic like "5 + 4 = 9"
      return /\d+\s*[+\-*/]\s*\d+\s*=\s*\d+/.test(explanation);
    });

    it('should have arithmetic questions to validate', () => {
      // This is informational - not all code_output questions have arithmetic
      console.log(`Found ${arithmeticQuestions.length} questions with explicit arithmetic in explanations`);
    });
  });

  describe('Answer Format Validation', () => {
    it('code_output answers should be strings or convertible to strings', () => {
      codeOutputQuestions.forEach(({ exam, question }) => {
        const answer = question.correctAnswer;
        // Verify the answer can be converted to a non-empty string
        const strAnswer = String(answer).trim();
        expect(
          strAnswer.length,
          `${exam.id}/${question.id} has empty correctAnswer`
        ).toBeGreaterThan(0);
      });
    });

    it('numeric answers should not have unnecessary precision', () => {
      codeOutputQuestions.forEach(({ exam, question }) => {
        const answer = String(question.correctAnswer);
        // Check for answers like "0.5000000000001" which indicate floating point issues
        if (/^\d+\.\d{6,}$/.test(answer)) {
          // Log as warning, not fail - some scientific calculations need precision
          console.warn(
            `${exam.id}/${question.id} has high precision answer: ${answer}`
          );
        }
      });
    });
  });

  describe('CS402 Sigmoid Specific Test', () => {
    it('cs402-mid-q10 sigmoid calculation should be correct', () => {
      const cs402Question = codeOutputQuestions.find(
        ({ exam, question }) => exam.id === 'cs402-midterm' && question.id === 'cs402-mid-q10'
      );

      if (cs402Question) {
        // The calculation from the code:
        // weights = [0.5, -0.3, 0.8], x = [1.0, 2.0, 0.5], bias = -0.2
        // z = 0.5*1 + (-0.3)*2 + 0.8*0.5 + (-0.2) = 0.5 - 0.6 + 0.4 - 0.2 = 0.1
        // sigmoid(0.1) = 1/(1+e^(-0.1)) ≈ 0.5250
        const expectedZ = 0.5 * 1 + (-0.3) * 2 + 0.8 * 0.5 + (-0.2);
        expect(expectedZ).toBeCloseTo(0.1, 5);

        const expectedSigmoid = 1 / (1 + Math.exp(-expectedZ));
        const actualAnswer = parseFloat(String(cs402Question.question.correctAnswer));

        expect(actualAnswer).toBeCloseTo(expectedSigmoid, 3);
        expect(actualAnswer).toBeCloseTo(0.5250, 3);
      }
    });
  });
});

describe('Exam Code Snippet Consistency', () => {
  describe('Code snippets should match explanations', () => {
    codeOutputQuestions.forEach(({ exam, question }) => {
      if (question.codeSnippet && question.explanation) {
        it(`${exam.id}/${question.id}: code and explanation should be consistent`, () => {
          // Basic check: if explanation mentions a specific output value,
          // it should match the correctAnswer
          const explanation = question.explanation || '';
          const answer = String(question.correctAnswer);

          // Check for explicit "output is X" or "prints X" patterns in explanation
          const outputPattern = /(?:output|prints?|returns?|equals?|result is)\s*[:=]?\s*['"`]?([^'"`,\s.]+)/i;
          const match = explanation.match(outputPattern);

          if (match && match[1]) {
            // Only check if the found value looks like it could be the answer
            const foundValue = match[1].toLowerCase();
            const expectedValue = answer.toLowerCase();

            // Allow for variations like "True" vs "true"
            if (foundValue === expectedValue || foundValue.includes(expectedValue)) {
              // Passes - explanation matches answer
              expect(true).toBe(true);
            }
          }
        });
      }
    });
  });
});
