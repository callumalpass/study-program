/**
 * CS102 Exam Question Types Tests
 *
 * Validates that CS102 exam questions have properly configured question types.
 * Specifically ensures:
 * - code_output questions have non-empty codeSnippet fields
 * - fill_blank questions don't require code execution
 * - Question types match the expected answer format
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation?: string;
  codeSnippet?: string;
}

interface Exam {
  id: string;
  questions: QuizQuestion[];
}

/**
 * Load exam file for a specific subject
 */
function loadSubjectExams(subjectId: string): Exam[] {
  try {
    const content = readFileSync(`src/subjects/${subjectId}/exams.json`, 'utf-8');
    return JSON.parse(content) as Exam[];
  } catch {
    return [];
  }
}

describe('CS102 Exam Question Type Validation', () => {
  let exams: Exam[];

  beforeAll(() => {
    exams = loadSubjectExams('cs102');
  });

  it('should load CS102 exams', () => {
    expect(exams.length).toBeGreaterThan(0);
  });

  describe('code_output questions should have valid codeSnippets', () => {
    it('all code_output questions should have non-empty codeSnippet', () => {
      const codeOutputQuestions: Array<{ examId: string; question: QuizQuestion }> = [];

      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'code_output') {
            codeOutputQuestions.push({ examId: exam.id, question });
          }
        }
      }

      const questionsWithEmptySnippet = codeOutputQuestions.filter(
        ({ question }) => !question.codeSnippet || question.codeSnippet.trim() === ''
      );

      expect(
        questionsWithEmptySnippet,
        `Found ${questionsWithEmptySnippet.length} code_output questions with empty codeSnippet: ${
          questionsWithEmptySnippet.map(q => `${q.examId}/${q.question.id}`).join(', ')
        }`
      ).toHaveLength(0);
    });

    it('code_output questions should have executable code snippets', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'code_output') {
            expect(
              question.codeSnippet,
              `Question ${exam.id}/${question.id} should have a codeSnippet`
            ).toBeDefined();
            expect(
              question.codeSnippet?.trim().length,
              `Question ${exam.id}/${question.id} codeSnippet should not be empty`
            ).toBeGreaterThan(0);
          }
        }
      }
    });
  });

  describe('fill_blank questions should not require code execution', () => {
    it('fill_blank questions should have string correctAnswers', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'fill_blank') {
            expect(
              typeof question.correctAnswer,
              `Question ${exam.id}/${question.id} correctAnswer should be a string`
            ).toBe('string');
          }
        }
      }
    });

    it('fill_blank questions cs102-fin-4 and cs102-fin-25 should exist and be properly typed', () => {
      const targetQuestionIds = ['cs102-fin-4', 'cs102-fin-25'];

      for (const exam of exams) {
        for (const question of exam.questions) {
          if (targetQuestionIds.includes(question.id)) {
            // These questions were originally code_output but should now be fill_blank
            expect(
              question.type,
              `Question ${question.id} should be fill_blank type`
            ).toBe('fill_blank');

            // They should not have codeSnippet field or it should be undefined
            expect(
              question.codeSnippet,
              `Question ${question.id} should not have a codeSnippet`
            ).toBeUndefined();
          }
        }
      }
    });
  });

  describe('question type-answer consistency', () => {
    it('multiple_choice questions should have numeric or string correctAnswer', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'multiple_choice') {
            const answerType = typeof question.correctAnswer;
            expect(
              ['number', 'string'].includes(answerType),
              `Question ${exam.id}/${question.id} multiple_choice should have numeric or string answer, got ${answerType}`
            ).toBe(true);

            if (typeof question.correctAnswer === 'number') {
              expect(
                question.options?.length,
                `Question ${exam.id}/${question.id} should have options`
              ).toBeGreaterThan(0);
              expect(
                question.correctAnswer,
                `Question ${exam.id}/${question.id} answer index should be within bounds`
              ).toBeLessThan(question.options?.length || 0);
              expect(
                question.correctAnswer,
                `Question ${exam.id}/${question.id} answer index should be non-negative`
              ).toBeGreaterThanOrEqual(0);
            }
          }
        }
      }
    });

    it('true_false questions should have boolean correctAnswer', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'true_false') {
            expect(
              typeof question.correctAnswer,
              `Question ${exam.id}/${question.id} true_false should have boolean answer`
            ).toBe('boolean');
          }
        }
      }
    });
  });

  describe('specific question validations', () => {
    it('cs102-fin-4 should ask about assembly register result', () => {
      let found = false;
      for (const exam of exams) {
        const question = exam.questions.find(q => q.id === 'cs102-fin-4');
        if (question) {
          found = true;
          expect(question.type).toBe('fill_blank');
          expect(question.correctAnswer).toBe('8');
          expect(question.prompt.toLowerCase()).toContain('ax');
        }
      }
      expect(found, 'Question cs102-fin-4 should exist').toBe(true);
    });

    it('cs102-fin-25 should ask about boolean expression evaluation', () => {
      let found = false;
      for (const exam of exams) {
        const question = exam.questions.find(q => q.id === 'cs102-fin-25');
        if (question) {
          found = true;
          expect(question.type).toBe('fill_blank');
          expect(question.correctAnswer).toBe('1');
          expect(question.prompt.toLowerCase()).toContain('boolean');
        }
      }
      expect(found, 'Question cs102-fin-25 should exist').toBe(true);
    });
  });
});
