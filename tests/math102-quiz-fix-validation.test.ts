/**
 * Tests for Math102 quiz content validation
 *
 * Specifically tests the fix for the Master Theorem question (math102-q2c-3)
 * which was converted from fill_blank to multiple_choice because the original
 * answer "log2(7)" was unreasonable for a fill_blank question.
 */

import { describe, it, expect } from 'vitest';
import { checkAnswer, getCorrectOptionIndex } from '@/utils/quiz-utils';
import type { QuizQuestion } from '@/core/types';

// Import the actual quiz data
import quizData from '@/subjects/math102/content/topic-2/quizzes.json';

describe('Math102 Topic 2 Quiz Validation', () => {
  describe('Master Theorem question (math102-q2c-3)', () => {
    // Find the specific question
    const quiz = quizData.find(q => q.id === 'math102-q2c');
    const question = quiz?.questions.find(q => q.id === 'math102-q2c-3');

    it('exists and is a multiple_choice question', () => {
      expect(question).toBeDefined();
      expect(question?.type).toBe('multiple_choice');
    });

    it('has valid options array with 4 options', () => {
      expect(question?.options).toBeDefined();
      expect(question?.options?.length).toBe(4);
    });

    it('has numeric correctAnswer index pointing to n^log₂(7) option', () => {
      expect(typeof question?.correctAnswer).toBe('number');
      const correctIndex = question?.correctAnswer as number;
      expect(correctIndex).toBeGreaterThanOrEqual(0);
      expect(correctIndex).toBeLessThan(question?.options?.length ?? 0);
      // Verify the correct option contains log₂(7) / 2.81 content
      const correctOption = question?.options?.[correctIndex];
      expect(correctOption).toContain('log');
      expect(correctOption).toContain('2.81');
    });

    it('correct option references n^log₂(7)', () => {
      const correctOption = question?.options?.[question?.correctAnswer as number];
      expect(correctOption).toContain('log');
      expect(correctOption).toContain('7');
      expect(correctOption).toContain('2.81');
    });

    it('checkAnswer validates correctly', () => {
      if (!question) throw new Error('Question not found');

      const correctIndex = question.correctAnswer as number;

      // Correct answer should pass
      expect(checkAnswer(question as QuizQuestion, correctIndex)).toBe(true);

      // Wrong answers should fail
      for (let i = 0; i < (question.options?.length ?? 0); i++) {
        if (i !== correctIndex) {
          expect(checkAnswer(question as QuizQuestion, i)).toBe(false);
        }
      }
    });

    it('getCorrectOptionIndex returns correct index', () => {
      if (!question) throw new Error('Question not found');
      const correctIndex = question.correctAnswer as number;
      expect(getCorrectOptionIndex(question as QuizQuestion)).toBe(correctIndex);
    });

    it('explanation references Case 1 of Master Theorem', () => {
      expect(question?.explanation).toContain('Case 1');
      expect(question?.explanation).toContain('Master Theorem');
    });
  });

  describe('all math102-q2c quiz questions are valid', () => {
    const quiz = quizData.find(q => q.id === 'math102-q2c');

    it('quiz exists', () => {
      expect(quiz).toBeDefined();
    });

    it('all multiple_choice questions have numeric correctAnswer', () => {
      const mcQuestions = quiz?.questions.filter(q => q.type === 'multiple_choice');

      for (const q of mcQuestions || []) {
        expect(typeof q.correctAnswer).toBe('number');
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(q.options?.length || 0);
      }
    });

    it('all fill_blank questions have string correctAnswer', () => {
      const fbQuestions = quiz?.questions.filter(q => q.type === 'fill_blank');

      for (const q of fbQuestions || []) {
        expect(typeof q.correctAnswer).toBe('string');
        // Fill blank answers should be reasonable length (not too long)
        expect((q.correctAnswer as string).length).toBeLessThan(50);
      }
    });

    it('all true_false questions have boolean correctAnswer', () => {
      const tfQuestions = quiz?.questions.filter(q => q.type === 'true_false');

      for (const q of tfQuestions || []) {
        expect(typeof q.correctAnswer).toBe('boolean');
      }
    });
  });

  describe('Master Theorem knowledge validation', () => {
    // This validates the mathematical content is correct

    it('correct answer for T(n) = 7T(n/2) + n² is Θ(n^log₂(7))', () => {
      // a=7, b=2, f(n)=n²
      // log_b(a) = log_2(7) ≈ 2.807
      // Since log_2(7) > 2 (exponent of f(n)), Case 1 applies
      // T(n) = Θ(n^log_b(a)) = Θ(n^log₂(7))

      const a = 7;
      const b = 2;
      const logBA = Math.log(a) / Math.log(b);

      expect(logBA).toBeCloseTo(2.807, 2);
      expect(logBA).toBeGreaterThan(2); // confirms Case 1 applies
    });
  });
});

describe('Other Math102 Topic 2 questions remain valid', () => {
  const allQuizzes = quizData;

  it('all quizzes have valid structure', () => {
    for (const quiz of allQuizzes) {
      expect(quiz.id).toBeDefined();
      expect(quiz.subjectId).toBe('math102');
      expect(quiz.questions).toBeDefined();
      expect(quiz.questions.length).toBeGreaterThan(0);
    }
  });

  it('all questions have required fields', () => {
    for (const quiz of allQuizzes) {
      for (const q of quiz.questions) {
        expect(q.id).toBeDefined();
        expect(q.type).toBeDefined();
        expect(q.prompt).toBeDefined();
        expect(q.correctAnswer).toBeDefined();
        expect(q.explanation).toBeDefined();
      }
    }
  });

  it('multiple choice questions have valid options and correctAnswer', () => {
    for (const quiz of allQuizzes) {
      for (const q of quiz.questions) {
        if (q.type === 'multiple_choice') {
          expect(q.options).toBeDefined();
          expect(q.options?.length).toBeGreaterThanOrEqual(2);

          // correctAnswer should be a valid index or a string that matches an option
          if (typeof q.correctAnswer === 'number') {
            expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
            expect(q.correctAnswer).toBeLessThan(q.options?.length || 0);
          } else if (typeof q.correctAnswer === 'string') {
            expect(q.options).toContain(q.correctAnswer);
          }
        }
      }
    }
  });
});
