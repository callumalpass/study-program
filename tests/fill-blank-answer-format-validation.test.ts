/**
 * Fill Blank Answer Format Validation Tests
 *
 * These tests validate that fill_blank questions across all subjects have consistent
 * answer formats and that answers are properly normalizable.
 */

import { describe, expect, it } from 'vitest';
import { normalizeAnswer } from '../src/utils/quiz-utils';

// Import exam and quiz data
const examModules = import.meta.glob('../src/subjects/**/exams.json', { eager: true });
const quizModules = import.meta.glob('../src/subjects/**/quizzes.json', { eager: true });

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  correctAnswer: number | string | boolean;
  explanation?: string;
}

interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

interface Exam {
  id: string;
  subjectId: string;
  questions: QuizQuestion[];
}

// Get all fill_blank questions from exams
const allExamQuestions: { examId: string; question: QuizQuestion }[] = Object.values(examModules)
  .flatMap((module: unknown) => {
    const mod = module as { default?: Exam[] };
    return Array.isArray(mod.default) ? mod.default : [];
  })
  .flatMap(exam => exam.questions.map(q => ({ examId: exam.id, question: q })))
  .filter(({ question }) => question.type === 'fill_blank');

// Get all fill_blank questions from quizzes
const allQuizQuestions: { quizId: string; question: QuizQuestion }[] = Object.values(quizModules)
  .flatMap((module: unknown) => {
    const mod = module as { default?: Quiz[] };
    return Array.isArray(mod.default) ? mod.default : [];
  })
  .flatMap(quiz => quiz.questions.map(q => ({ quizId: quiz.id, question: q })))
  .filter(({ question }) => question.type === 'fill_blank');

describe('Fill Blank Answer Format Validation', () => {
  describe('Exam fill_blank answers', () => {
    it('should have string or number correctAnswer for all fill_blank questions', () => {
      for (const { examId, question } of allExamQuestions) {
        const answerType = typeof question.correctAnswer;
        expect(
          answerType === 'string' || answerType === 'number',
          `${examId}:${question.id} has invalid answer type: ${answerType}`
        ).toBe(true);
      }
    });

    it('should not have empty correctAnswer', () => {
      for (const { examId, question } of allExamQuestions) {
        const answer = String(question.correctAnswer).trim();
        expect(
          answer.length > 0,
          `${examId}:${question.id} has empty answer`
        ).toBe(true);
      }
    });

    it('should have answers that normalize consistently', () => {
      for (const { examId, question } of allExamQuestions) {
        const answer = question.correctAnswer;
        const normalized = normalizeAnswer(answer);
        expect(
          normalized.length > 0,
          `${examId}:${question.id} normalizes to empty string`
        ).toBe(true);
      }
    });

    it('should not have excessively long single-word answers', () => {
      const MAX_SINGLE_WORD_LENGTH = 50;
      for (const { examId, question } of allExamQuestions) {
        const answer = String(question.correctAnswer).trim();
        // Only check single-word answers
        if (!answer.includes(' ')) {
          expect(
            answer.length <= MAX_SINGLE_WORD_LENGTH,
            `${examId}:${question.id} has excessively long answer: "${answer}"`
          ).toBe(true);
        }
      }
    });

    it('should not have leading/trailing whitespace in answers', () => {
      for (const { examId, question } of allExamQuestions) {
        const answer = String(question.correctAnswer);
        expect(
          answer === answer.trim(),
          `${examId}:${question.id} has whitespace in answer: "${answer}"`
        ).toBe(true);
      }
    });
  });

  describe('Quiz fill_blank answers', () => {
    it('should have string or number correctAnswer for all fill_blank questions', () => {
      for (const { quizId, question } of allQuizQuestions) {
        const answerType = typeof question.correctAnswer;
        expect(
          answerType === 'string' || answerType === 'number',
          `${quizId}:${question.id} has invalid answer type: ${answerType}`
        ).toBe(true);
      }
    });

    it('should not have empty correctAnswer', () => {
      for (const { quizId, question } of allQuizQuestions) {
        const answer = String(question.correctAnswer).trim();
        expect(
          answer.length > 0,
          `${quizId}:${question.id} has empty answer`
        ).toBe(true);
      }
    });

    it('should have answers that normalize consistently', () => {
      for (const { quizId, question } of allQuizQuestions) {
        const answer = question.correctAnswer;
        const normalized = normalizeAnswer(answer);
        expect(
          normalized.length > 0,
          `${quizId}:${question.id} normalizes to empty string`
        ).toBe(true);
      }
    });

    it('should not have leading/trailing whitespace in answers', () => {
      for (const { quizId, question } of allQuizQuestions) {
        const answer = String(question.correctAnswer);
        expect(
          answer === answer.trim(),
          `${quizId}:${question.id} has whitespace in answer: "${answer}"`
        ).toBe(true);
      }
    });
  });

  describe('Answer normalization consistency', () => {
    it('fill_blank answers should match when comparing normalized versions', () => {
      // Test that common answer variations all normalize to the same value
      const testCases = [
        { answer: 'True', userInput: 'true', shouldMatch: true },
        { answer: 'False', userInput: 'FALSE', shouldMatch: true },
        { answer: 'O(n)', userInput: 'o(n)', shouldMatch: true },
        { answer: '42', userInput: '  42  ', shouldMatch: true },
        { answer: 'answer', userInput: 'Answer', shouldMatch: true },
        { answer: '__init__', userInput: '__init__', shouldMatch: true },
        { answer: 'pigeonhole', userInput: 'PIGEONHOLE', shouldMatch: true },
      ];

      for (const { answer, userInput, shouldMatch } of testCases) {
        const normalizedAnswer = normalizeAnswer(answer);
        const normalizedInput = normalizeAnswer(userInput);
        expect(
          normalizedAnswer === normalizedInput,
          `"${answer}" vs "${userInput}" should ${shouldMatch ? '' : 'not '}match`
        ).toBe(shouldMatch);
      }
    });

    it('numeric answers should normalize correctly', () => {
      const numericCases = [
        { answer: 42, expected: '42' },
        { answer: 0, expected: '0' },
        { answer: -5, expected: '-5' },
        { answer: 3.14, expected: '3.14' },
        { answer: '100', expected: '100' },
      ];

      for (const { answer, expected } of numericCases) {
        const normalized = normalizeAnswer(answer);
        expect(normalized).toBe(expected);
      }
    });
  });

  describe('Prompt and answer consistency', () => {
    it('most fill_blank prompts should contain blank indicator (informational)', () => {
      const blankIndicators = ['____', '___', '__', 'blank', 'fill in'];
      const promptsWithoutBlank: string[] = [];

      for (const { examId, question } of allExamQuestions) {
        const prompt = question.prompt.toLowerCase();
        const hasBlankIndicator = blankIndicators.some(indicator =>
          prompt.includes(indicator.toLowerCase())
        );
        if (!hasBlankIndicator) {
          promptsWithoutBlank.push(`${examId}:${question.id}`);
        }
      }

      // Log questions without blank indicators for review
      if (promptsWithoutBlank.length > 0) {
        console.log(`\nFill_blank questions without explicit blank indicator (${promptsWithoutBlank.length}):`);
        promptsWithoutBlank.slice(0, 5).forEach(q => console.log(`  - ${q}`));
        if (promptsWithoutBlank.length > 5) {
          console.log(`  ... and ${promptsWithoutBlank.length - 5} more`);
        }
      }

      // Allow up to 20% of questions to lack explicit blank indicators
      // (some questions phrase it as "What is X?" which is still clear)
      const threshold = Math.ceil(allExamQuestions.length * 0.20);
      expect(
        promptsWithoutBlank.length <= threshold,
        `Too many fill_blank questions lack blank indicators: ${promptsWithoutBlank.length} > ${threshold}`
      ).toBe(true);
    });
  });

  describe('Statistics', () => {
    it('should report fill_blank question counts', () => {
      console.log(`Total exam fill_blank questions: ${allExamQuestions.length}`);
      console.log(`Total quiz fill_blank questions: ${allQuizQuestions.length}`);

      // Group by subject
      const examsBySubject = new Map<string, number>();
      for (const { examId } of allExamQuestions) {
        const subject = examId.split('-')[0];
        examsBySubject.set(subject, (examsBySubject.get(subject) || 0) + 1);
      }

      console.log('\nFill_blank questions by subject (exams):');
      for (const [subject, count] of [...examsBySubject.entries()].sort()) {
        console.log(`  ${subject}: ${count}`);
      }

      // Ensure we have fill_blank questions
      expect(allExamQuestions.length).toBeGreaterThan(0);
      expect(allQuizQuestions.length).toBeGreaterThan(0);
    });
  });
});

describe('Fill Blank Answer Edge Cases', () => {
  it('should handle special characters in answers', () => {
    // These are common programming-related answers that contain special chars
    const specialCharAnswers = ['__init__', '__str__', 'O(n)', 'O(log n)', 'O(n^2)'];

    for (const answer of specialCharAnswers) {
      const normalized = normalizeAnswer(answer);
      expect(normalized.length).toBeGreaterThan(0);
      // Verify it lowercases but preserves special chars
      expect(normalized).toBe(answer.toLowerCase());
    }
  });

  it('should handle Greek letters and mathematical notation', () => {
    // Common math notation that might appear in answers
    const mathAnswers = ['theta', 'lambda', 'sigma', 'epsilon'];

    for (const answer of mathAnswers) {
      const normalized = normalizeAnswer(answer);
      expect(normalized).toBe(answer.toLowerCase());
    }
  });

  it('should handle hyphenated answers', () => {
    const hyphenatedAnswers = ['case-sensitive', 'on-the-fly', 'divide-and-conquer'];

    for (const answer of hyphenatedAnswers) {
      const normalized = normalizeAnswer(answer);
      expect(normalized).toBe(answer.toLowerCase());
    }
  });
});
