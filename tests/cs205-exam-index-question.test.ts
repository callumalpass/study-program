/**
 * CS205 Database Systems Exam - Composite Index Question Tests
 *
 * These tests verify the fix for the CS205 fin-q26 question, which previously
 * had fragile letter-reference options like "A and C", "B, C, and D" that
 * referenced the code snippet labels rather than providing self-descriptive options.
 *
 * The fix rewrites the question to focus on the conceptual understanding of
 * the leftmost prefix rule for composite indexes, making the question more
 * robust and educational.
 */

import { describe, expect, it } from 'vitest';
import { checkAnswer, getCorrectOptionIndex } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '@/core/types';

// Load CS205 exams
const cs205Exams = await import('../src/subjects/cs205/exams.json');

describe('CS205 Composite Index Question (fin-q26)', () => {
  const finalExam = cs205Exams.default.find(
    (exam: { id: string }) => exam.id === 'cs205-exam-final'
  );
  const question = finalExam?.questions.find(
    (q: { id: string }) => q.id === 'fin-q26'
  );

  describe('question structure', () => {
    it('should find the CS205 final exam', () => {
      expect(finalExam).toBeDefined();
      expect(finalExam.id).toBe('cs205-exam-final');
    });

    it('should find question fin-q26', () => {
      expect(question).toBeDefined();
      expect(question.id).toBe('fin-q26');
    });

    it('should be a multiple choice question', () => {
      expect(question.type).toBe('multiple_choice');
    });

    it('should have exactly 4 options', () => {
      expect(question.options).toHaveLength(4);
    });

    it('should have a numeric correctAnswer index', () => {
      expect(typeof question.correctAnswer).toBe('number');
      expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(question.correctAnswer).toBeLessThan(question.options.length);
    });

    it('should have an explanation', () => {
      expect(question.explanation).toBeDefined();
      expect(question.explanation.length).toBeGreaterThan(0);
    });
  });

  describe('no fragile letter references', () => {
    it('should not have options referencing other options by letter (A, B, C, D)', () => {
      const letterPatterns = [
        /^[A-D]\s+and\s+[A-D]$/i, // "A and C"
        /^[A-D],\s*[A-D],?\s*and\s+[A-D]$/i, // "A, B, and C"
        /^both\s+[A-D]\s+and\s+[A-D]$/i, // "Both A and C"
        /^[A-D]\s+only$/i, // "A only"
      ];

      question.options.forEach((option: string, index: number) => {
        const matchesPattern = letterPatterns.some((pattern) =>
          pattern.test(option.trim())
        );
        expect(
          matchesPattern,
          `Option ${index} ("${option}") should not reference other options by letter`
        ).toBe(false);
      });
    });

    it('should not have codeSnippet with lettered query options', () => {
      // The original question had a codeSnippet like "A) WHERE...\nB) WHERE..."
      // The fixed version should not have this pattern
      if (question.codeSnippet) {
        const hasLetteredQueries = /^[A-D]\)\s+WHERE/im.test(
          question.codeSnippet
        );
        expect(
          hasLetteredQueries,
          'codeSnippet should not have lettered query options'
        ).toBe(false);
      }
    });
  });

  describe('conceptual correctness', () => {
    it('should ask about composite index usage', () => {
      const prompt = question.prompt.toLowerCase();
      expect(
        prompt.includes('index') || prompt.includes('composite')
      ).toBe(true);
    });

    it('correct answer should mention Status (the leading column)', () => {
      const correctOption = question.options[question.correctAnswer];
      expect(correctOption.toLowerCase()).toContain('status');
    });

    it('explanation should mention leftmost prefix rule', () => {
      const explanation = question.explanation.toLowerCase();
      expect(
        explanation.includes('leftmost') || explanation.includes('leading')
      ).toBe(true);
    });
  });

  describe('answer validation', () => {
    it('checkAnswer accepts correct answer index', () => {
      const quizQuestion: QuizQuestion = {
        id: question.id,
        type: 'multiple_choice',
        prompt: question.prompt,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      };

      expect(checkAnswer(quizQuestion, question.correctAnswer)).toBe(true);
    });

    it('checkAnswer rejects incorrect answer indices', () => {
      const quizQuestion: QuizQuestion = {
        id: question.id,
        type: 'multiple_choice',
        prompt: question.prompt,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      };

      for (let i = 0; i < question.options.length; i++) {
        if (i !== question.correctAnswer) {
          expect(checkAnswer(quizQuestion, i)).toBe(false);
        }
      }
    });

    it('getCorrectOptionIndex returns correct index', () => {
      const quizQuestion: QuizQuestion = {
        id: question.id,
        type: 'multiple_choice',
        prompt: question.prompt,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      };

      expect(getCorrectOptionIndex(quizQuestion)).toBe(question.correctAnswer);
    });
  });
});

describe('CS205 Database Index Questions - General Validation', () => {
  const allExamQuestions = cs205Exams.default.flatMap(
    (exam: { questions: { id: string }[] }) => exam.questions
  );

  const indexQuestions = allExamQuestions.filter(
    (q: { prompt: string }) =>
      q.prompt.toLowerCase().includes('index') &&
      !q.prompt.toLowerCase().includes('array index')
  );

  it('should have database index questions in CS205 exams', () => {
    expect(indexQuestions.length).toBeGreaterThan(0);
  });

  describe('index questions should be well-formed', () => {
    indexQuestions.forEach((q: { id: string; type: string; options?: string[]; correctAnswer: number }) => {
      if (q.type === 'multiple_choice') {
        it(`${q.id}: should have valid correctAnswer index`, () => {
          expect(typeof q.correctAnswer).toBe('number');
          expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
          expect(q.correctAnswer).toBeLessThan(q.options!.length);
        });

        it(`${q.id}: should not have letter-reference options`, () => {
          const hasLetterRef = q.options!.some(
            (opt: string) =>
              /^[A-D]\s+(and|,)/i.test(opt.trim()) ||
              /^both\s+[A-D]/i.test(opt.trim())
          );
          expect(hasLetterRef).toBe(false);
        });
      }
    });
  });
});
