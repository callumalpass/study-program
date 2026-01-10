/**
 * CS305 Exam Question Format Validation Tests
 *
 * These tests validate that CS305 exam questions have consistent and unambiguous
 * answer formats, particularly for multiple choice questions where grammar
 * (singular vs plural) should match the correct answer.
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

describe('CS305 Exam Question Format Validation', () => {
  describe('Multiple choice questions', () => {
    it('should have correctAnswer within valid range for all multiple choice questions', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            const answerIndex = question.correctAnswer as number;
            expect(
              answerIndex >= 0 && answerIndex < question.options.length,
              `${exam.id}:${question.id} has out-of-range answer index ${answerIndex} for ${question.options.length} options`
            ).toBe(true);
          }
        }
      }
    });

    it('should have at least 2 options for all multiple choice questions', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'multiple_choice') {
            expect(
              question.options && question.options.length >= 2,
              `${exam.id}:${question.id} should have at least 2 options`
            ).toBe(true);
          }
        }
      }
    });

    it('cs305-mid-q15 should have grammatically consistent question about block-scoped keywords', () => {
      const midterm = exams.find(e => e.id === 'cs305-midterm');
      expect(midterm).toBeDefined();

      const q15 = midterm!.questions.find(q => q.id === 'cs305-mid-q15');
      expect(q15).toBeDefined();
      expect(q15!.type).toBe('multiple_choice');

      // The question should use plural "keywords" since the answer includes both let and const
      expect(q15!.prompt).toContain('keywords');

      // Verify the correct answer is "Both let and const"
      const correctIndex = q15!.correctAnswer as number;
      expect(q15!.options![correctIndex]).toBe('Both let and const');

      // Verify options are now unambiguous with "only" suffix for single-keyword options
      expect(q15!.options).toContain('let only');
      expect(q15!.options).toContain('var only');
      expect(q15!.options).toContain('const only');
    });
  });

  describe('True/false questions', () => {
    it('should have boolean correctAnswer for all true/false questions', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'true_false') {
            expect(
              typeof question.correctAnswer === 'boolean',
              `${exam.id}:${question.id} should have boolean correctAnswer`
            ).toBe(true);
          }
        }
      }
    });
  });

  describe('Fill blank questions', () => {
    it('should have non-empty string correctAnswer for all fill_blank questions', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'fill_blank') {
            expect(
              typeof question.correctAnswer === 'string' && question.correctAnswer.trim().length > 0,
              `${exam.id}:${question.id} should have non-empty string correctAnswer`
            ).toBe(true);
          }
        }
      }
    });
  });

  describe('Code output questions', () => {
    it('should have non-empty string correctAnswer for all code_output questions', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'code_output') {
            expect(
              typeof question.correctAnswer === 'string' && question.correctAnswer.length > 0,
              `${exam.id}:${question.id} should have non-empty correctAnswer`
            ).toBe(true);
          }
        }
      }
    });
  });

  describe('Written questions', () => {
    it('should have explanatory correctAnswer for all written questions', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'written') {
            expect(
              typeof question.correctAnswer === 'string' && question.correctAnswer.length > 10,
              `${exam.id}:${question.id} should have substantial model answer`
            ).toBe(true);
          }
        }
      }
    });
  });

  describe('All questions', () => {
    it('should have non-empty explanation for every question', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          expect(
            question.explanation && question.explanation.length > 0,
            `${exam.id}:${question.id} should have explanation`
          ).toBe(true);
        }
      }
    });

    it('should have unique question IDs within each exam', () => {
      for (const exam of exams) {
        const ids = exam.questions.map(q => q.id);
        const uniqueIds = new Set(ids);
        expect(
          ids.length === uniqueIds.size,
          `${exam.id} has duplicate question IDs`
        ).toBe(true);
      }
    });
  });
});

describe('CS305 JavaScript keyword questions consistency', () => {
  it('should correctly identify let and const as block-scoped', () => {
    const midterm = exams.find(e => e.id === 'cs305-midterm');
    const q15 = midterm!.questions.find(q => q.id === 'cs305-mid-q15');

    // The explanation should mention that both let and const are block-scoped
    expect(q15!.explanation.toLowerCase()).toContain('let');
    expect(q15!.explanation.toLowerCase()).toContain('const');
    expect(q15!.explanation.toLowerCase()).toContain('block-scoped');

    // It should also mention that var is function-scoped (to explain why it's wrong)
    expect(q15!.explanation.toLowerCase()).toContain('var');
    expect(q15!.explanation.toLowerCase()).toContain('function-scoped');
  });

  it('should have var as an incorrect option since it is function-scoped', () => {
    const midterm = exams.find(e => e.id === 'cs305-midterm');
    const q15 = midterm!.questions.find(q => q.id === 'cs305-mid-q15');

    const varOptionIndex = q15!.options!.findIndex(opt => opt.toLowerCase().includes('var'));
    expect(varOptionIndex).toBeGreaterThanOrEqual(0);

    // var should not be the correct answer
    expect(q15!.correctAnswer).not.toBe(varOptionIndex);
  });
});
