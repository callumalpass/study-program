/**
 * Math203 (Calculus I) Quiz Content Validation Tests
 *
 * Tests to ensure quiz content is mathematically correct and properly formatted.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation: string;
  codeSnippet?: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
}

// Load all Math203 quizzes
function loadMath203Quizzes(): Quiz[] {
  const quizzes: Quiz[] = [];
  const baseDir = path.join(__dirname, '../src/subjects/math203/content');

  for (let topic = 1; topic <= 7; topic++) {
    const quizPath = path.join(baseDir, `topic-${topic}`, 'quizzes.json');
    if (fs.existsSync(quizPath)) {
      const content = fs.readFileSync(quizPath, 'utf-8');
      const topicQuizzes = JSON.parse(content) as Quiz[];
      quizzes.push(...topicQuizzes);
    }
  }

  return quizzes;
}

describe('Math203 Calculus I Quiz Validation', () => {
  let allQuizzes: Quiz[];
  let allQuestions: QuizQuestion[];

  beforeAll(() => {
    allQuizzes = loadMath203Quizzes();
    allQuestions = allQuizzes.flatMap(q => q.questions);
  });

  describe('Quiz Structure', () => {
    it('should have quizzes for all topics', () => {
      expect(allQuizzes.length).toBeGreaterThanOrEqual(7);
    });

    it('all quizzes should have valid structure', () => {
      for (const quiz of allQuizzes) {
        expect(quiz.id).toBeTruthy();
        expect(quiz.subjectId).toBe('math203');
        expect(quiz.title).toBeTruthy();
        expect(quiz.questions.length).toBeGreaterThan(0);
      }
    });

    it('all questions should have required fields', () => {
      for (const question of allQuestions) {
        expect(question.id).toBeTruthy();
        expect(question.type).toBeTruthy();
        expect(question.prompt).toBeTruthy();
        expect(question.explanation).toBeTruthy();
        expect(question.correctAnswer !== undefined).toBe(true);
      }
    });
  });

  describe('Multiple Choice Questions', () => {
    it('all multiple choice questions should have valid options', () => {
      const mcQuestions = allQuestions.filter(q => q.type === 'multiple_choice');

      for (const question of mcQuestions) {
        expect(question.options).toBeDefined();
        expect(question.options!.length).toBeGreaterThanOrEqual(2);
        expect(question.options!.length).toBeLessThanOrEqual(6);
      }
    });

    it('multiple choice correctAnswer should reference valid option', () => {
      const mcQuestions = allQuestions.filter(q => q.type === 'multiple_choice');

      for (const question of mcQuestions) {
        const correctAnswer = question.correctAnswer;

        if (typeof correctAnswer === 'number') {
          expect(correctAnswer).toBeGreaterThanOrEqual(0);
          expect(correctAnswer).toBeLessThan(question.options!.length);
        } else if (typeof correctAnswer === 'string') {
          // String answers should match one of the options
          expect(question.options!).toContain(correctAnswer);
        }
      }
    });
  });

  describe('True/False Questions', () => {
    it('all true/false questions should have boolean correctAnswer', () => {
      const tfQuestions = allQuestions.filter(q => q.type === 'true_false');

      for (const question of tfQuestions) {
        expect(typeof question.correctAnswer).toBe('boolean');
      }
    });
  });

  describe('Fill Blank Questions', () => {
    it('all fill_blank questions should have string correctAnswer', () => {
      const fbQuestions = allQuestions.filter(q => q.type === 'fill_blank');

      for (const question of fbQuestions) {
        expect(typeof question.correctAnswer).toBe('string');
        expect((question.correctAnswer as string).trim()).not.toBe('');
      }
    });

    it('fill_blank questions should not have comma-separated multi-word answers', () => {
      // Comma-separated answers are problematic because order matters and format is strict
      const fbQuestions = allQuestions.filter(q => q.type === 'fill_blank');

      for (const question of fbQuestions) {
        const answer = question.correctAnswer as string;
        // Check for patterns like "word1, word2" which are problematic
        const hasCommaSeparated = /^[^,]+,\s*[^,]+$/.test(answer);
        expect(
          hasCommaSeparated,
          `Question ${question.id} has comma-separated answer "${answer}" which may cause grading issues`
        ).toBe(false);
      }
    });

    it('fill_blank questions with multiple blanks should be avoided', () => {
      // Multiple blanks in a fill_blank question are problematic
      const fbQuestions = allQuestions.filter(q => q.type === 'fill_blank');

      for (const question of fbQuestions) {
        const blankCount = (question.prompt.match(/____/g) || []).length;
        expect(
          blankCount,
          `Question ${question.id} has ${blankCount} blanks but fill_blank only supports single answers`
        ).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('Topic 4: Applications of Derivatives - EVT Question Fix', () => {
    it('Extreme Value Theorem question should be multiple choice, not fill_blank', () => {
      // The EVT question was previously a fill_blank with "maximum, minimum" answer
      // It should now be a multiple_choice question
      const evtQuestion = allQuestions.find(q => q.id === 'math203-q4b-5');

      expect(evtQuestion).toBeDefined();
      expect(evtQuestion!.type).toBe('multiple_choice');
      expect(evtQuestion!.options).toBeDefined();
      expect(evtQuestion!.options!.length).toBe(4);

      // Correct answer should point to an option mentioning both max and min
      const correctIndex = evtQuestion!.correctAnswer as number;
      expect(correctIndex).toBeGreaterThanOrEqual(0);
      expect(correctIndex).toBeLessThan(evtQuestion!.options!.length);

      // Verify the correct option mentions both maximum and minimum
      const correctOption = evtQuestion!.options![correctIndex];
      expect(correctOption.toLowerCase()).toContain('maximum');
      expect(correctOption.toLowerCase()).toContain('minimum');
    });

    it('EVT question prompt should be clear', () => {
      const evtQuestion = allQuestions.find(q => q.id === 'math203-q4b-5');
      expect(evtQuestion).toBeDefined();
      expect(evtQuestion!.prompt).toContain('Extreme Value Theorem');
      expect(evtQuestion!.prompt).toContain('continuous function');
    });
  });

  describe('Topic 4: Applications of Derivatives - Content Coverage', () => {
    let topic4Questions: QuizQuestion[];

    beforeAll(() => {
      const topic4Quizzes = allQuizzes.filter(q => q.topicId === 'math203-topic-4');
      topic4Questions = topic4Quizzes.flatMap(q => q.questions);
    });

    it('should have questions about critical points', () => {
      const hasCriticalPoints = topic4Questions.some(q =>
        q.prompt.toLowerCase().includes('critical point') ||
        q.explanation.toLowerCase().includes('critical point')
      );
      expect(hasCriticalPoints).toBe(true);
    });

    it('should have questions about concavity', () => {
      const hasConcavity = topic4Questions.some(q =>
        q.prompt.toLowerCase().includes('concav') ||
        q.explanation.toLowerCase().includes('concav')
      );
      expect(hasConcavity).toBe(true);
    });

    it('should have questions about Mean Value Theorem', () => {
      const hasMVT = topic4Questions.some(q =>
        q.prompt.toLowerCase().includes('mean value theorem') ||
        q.prompt.includes('MVT')
      );
      expect(hasMVT).toBe(true);
    });

    it('should have questions about second derivative test', () => {
      const hasSecondDerivativeTest = topic4Questions.some(q =>
        q.prompt.toLowerCase().includes('second derivative') ||
        q.prompt.includes("f''(c)")
      );
      expect(hasSecondDerivativeTest).toBe(true);
    });
  });

  describe('Statistics', () => {
    it('reports quiz statistics', () => {
      console.log(`Math203 total quizzes: ${allQuizzes.length}`);
      console.log(`Math203 total questions: ${allQuestions.length}`);

      const typeDistribution = allQuestions.reduce((acc, q) => {
        acc[q.type] = (acc[q.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log('Question type distribution:', typeDistribution);
      expect(allQuestions.length).toBeGreaterThan(0);
    });
  });
});
