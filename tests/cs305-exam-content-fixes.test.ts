/**
 * CS305 Exam Content Fixes Validation Tests
 *
 * These tests validate the fixes made to CS305 exam questions:
 * 1. cs305-mid-q17: Changed from confusing true/false question about equality operators
 *    to a clear multiple choice question
 * 2. cs305-final-q27: Fixed fill_blank question to ask for just the property name
 *    ("max-width") instead of the property with value ("max-width: 100%")
 */

import { describe, it, expect } from 'vitest';
import cs305Exams from '../src/subjects/cs305/exams.json';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation: string;
}

interface Exam {
  id: string;
  subjectId: string;
  title: string;
  questions: QuizQuestion[];
}

const exams = cs305Exams as Exam[];

describe('CS305 JavaScript Equality Operators Question (cs305-mid-q17)', () => {
  const midterm = exams.find(e => e.id === 'cs305-midterm');
  const question = midterm?.questions.find(q => q.id === 'cs305-mid-q17');

  it('should be a multiple choice question (not true/false)', () => {
    expect(question).toBeDefined();
    expect(question!.type).toBe('multiple_choice');
  });

  it('should have four options', () => {
    expect(question!.options).toBeDefined();
    expect(question!.options!.length).toBe(4);
  });

  it('should have the correct answer as strict equality operator (===)', () => {
    const correctIndex = question!.correctAnswer as number;
    const correctOption = question!.options![correctIndex];

    // The correct answer should be the strict equality operator
    expect(correctOption).toContain('===');
    expect(correctOption.toLowerCase()).toContain('strict');
  });

  it('should include loose equality (==) as an incorrect option', () => {
    const looseEqualityIndex = question!.options!.findIndex(
      opt => opt.includes('==') && !opt.includes('===') && !opt.includes('!=')
    );
    expect(looseEqualityIndex).toBeGreaterThanOrEqual(0);

    // == should not be the correct answer
    expect(question!.correctAnswer).not.toBe(looseEqualityIndex);
  });

  it('should clearly explain the difference between == and ===', () => {
    const explanation = question!.explanation.toLowerCase();

    // Should explain strict equality
    expect(explanation).toContain('===');
    expect(explanation).toContain('value and type');

    // Should explain loose equality
    expect(explanation).toContain('==');
    expect(explanation).toContain('coercion');
  });

  it('should not be a backwards/negated question that could confuse students', () => {
    const prompt = question!.prompt.toLowerCase();

    // The question should be positively phrased, not asking "is this false statement true?"
    expect(prompt).not.toContain('is backwards');
    expect(prompt).not.toContain('is incorrect');
    expect(prompt).not.toContain('is wrong');
  });

  it('should ask a direct question about which operator compares both value and type', () => {
    const prompt = question!.prompt.toLowerCase();

    // Should directly ask about the equality operators
    expect(prompt).toContain('equality');
    expect(prompt).toContain('value and type');
  });
});

describe('CS305 Responsive Images CSS Property Question (cs305-final-q27)', () => {
  const finalExam = exams.find(e => e.id === 'cs305-final');
  const question = finalExam?.questions.find(q => q.id === 'cs305-final-q27');

  it('should be a fill_blank question', () => {
    expect(question).toBeDefined();
    expect(question!.type).toBe('fill_blank');
  });

  it('should ask for just the CSS property name, not the property with value', () => {
    const correctAnswer = question!.correctAnswer as string;

    // The answer should be just "max-width" (the property name)
    expect(correctAnswer).toBe('max-width');

    // Should NOT include the value
    expect(correctAnswer).not.toContain(':');
    expect(correctAnswer).not.toContain('100%');
  });

  it('should have a prompt that makes it clear only the property name is expected', () => {
    const prompt = question!.prompt.toLowerCase();

    // The prompt should mention "property" (singular, referring to the property name)
    expect(prompt).toContain('property');

    // It should indicate that 100% is the value (so students know not to include it)
    expect(prompt).toContain('100%');
  });

  it('should mention responsive images in the context', () => {
    const prompt = question!.prompt.toLowerCase();
    expect(prompt).toContain('image');
    expect(prompt).toContain('responsive');
  });

  it('should have an explanation that clarifies the full property-value pair', () => {
    const explanation = question!.explanation.toLowerCase();

    // Should explain that max-width: 100% is the full declaration
    expect(explanation).toContain('max-width');
    expect(explanation).toContain('100%');
  });
});

describe('CS305 Fill Blank Answer Format Consistency', () => {
  it('should not have fill_blank answers that include property-value pairs where only property name is asked', () => {
    for (const exam of exams) {
      for (const question of exam.questions) {
        if (question.type === 'fill_blank') {
          const prompt = question.prompt.toLowerCase();
          const answer = question.correctAnswer as string;

          // If the prompt asks for a "CSS property" (singular), the answer should be just the property name
          if (prompt.includes('css property') && !prompt.includes('css properties')) {
            // Check if answer looks like a property:value pair
            const hasColonWithValue = answer.includes(':') && answer.split(':').length === 2;

            // This test will fail if we find more cases like the original cs305-final-q27
            if (hasColonWithValue) {
              // The answer should not contain a colon followed by a value
              // because the question asks for "a CSS property" (just the name)
              expect(
                false,
                `${exam.id}:${question.id} asks for "CSS property" but answer "${answer}" includes property:value. Should only include property name.`
              ).toBe(true);
            }
          }
        }
      }
    }
  });
});

describe('CS305 True/False Question Quality', () => {
  it('should not have true/false questions that state backwards facts expecting "false" as answer', () => {
    for (const exam of exams) {
      for (const question of exam.questions) {
        if (question.type === 'true_false' && question.correctAnswer === false) {
          const prompt = question.prompt.toLowerCase();
          const explanation = question.explanation.toLowerCase();

          // If the explanation says "this is backwards" or similar, it's a confusing question format
          const isBackwardsQuestion =
            explanation.includes('this is backwards') ||
            explanation.includes('this is reversed') ||
            explanation.includes('this is the opposite');

          expect(
            !isBackwardsQuestion,
            `${exam.id}:${question.id} is a "backwards" true/false question that states incorrect facts. Consider converting to multiple choice for clarity.`
          ).toBe(true);
        }
      }
    }
  });
});

describe('CS305 Exam Questions Basic Validity After Fixes', () => {
  it('should still have the expected number of questions in midterm', () => {
    const midterm = exams.find(e => e.id === 'cs305-midterm');
    expect(midterm).toBeDefined();
    expect(midterm!.questions.length).toBe(26);
  });

  it('should still have the expected number of questions in final', () => {
    const finalExam = exams.find(e => e.id === 'cs305-final');
    expect(finalExam).toBeDefined();
    expect(finalExam!.questions.length).toBe(42);
  });

  it('should have all question IDs unique across both exams', () => {
    const allIds: string[] = [];
    for (const exam of exams) {
      for (const question of exam.questions) {
        expect(allIds).not.toContain(question.id);
        allIds.push(question.id);
      }
    }
  });

  it('should have valid correctAnswer types for all question types', () => {
    for (const exam of exams) {
      for (const question of exam.questions) {
        switch (question.type) {
          case 'multiple_choice':
            expect(typeof question.correctAnswer).toBe('number');
            expect(question.options).toBeDefined();
            expect((question.correctAnswer as number) >= 0).toBe(true);
            expect((question.correctAnswer as number) < question.options!.length).toBe(true);
            break;
          case 'true_false':
            expect(typeof question.correctAnswer).toBe('boolean');
            break;
          case 'fill_blank':
          case 'code_output':
          case 'written':
            expect(typeof question.correctAnswer).toBe('string');
            break;
        }
      }
    }
  });
});
