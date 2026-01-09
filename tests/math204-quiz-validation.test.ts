/**
 * Math204 (Calculus II) Quiz Content Validation Tests
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

// Load all Math204 quizzes
function loadMath204Quizzes(): Quiz[] {
  const quizzes: Quiz[] = [];
  const baseDir = path.join(__dirname, '../src/subjects/math204/content');

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

describe('Math204 Calculus II Quiz Validation', () => {
  let allQuizzes: Quiz[];
  let allQuestions: QuizQuestion[];

  beforeAll(() => {
    allQuizzes = loadMath204Quizzes();
    allQuestions = allQuizzes.flatMap(q => q.questions);
  });

  describe('Quiz Structure', () => {
    it('should have quizzes for all topics', () => {
      expect(allQuizzes.length).toBeGreaterThanOrEqual(7);
    });

    it('all quizzes should have valid structure', () => {
      for (const quiz of allQuizzes) {
        expect(quiz.id).toBeTruthy();
        expect(quiz.subjectId).toBe('math204');
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
  });

  describe('Topic 4: Applications - Volume Methods', () => {
    let topic4Questions: QuizQuestion[];

    beforeAll(() => {
      const topic4Quizzes = allQuizzes.filter(q => q.topicId === 'math204-4');
      topic4Questions = topic4Quizzes.flatMap(q => q.questions);
    });

    it('should have questions about disk method', () => {
      const hasDiskMethod = topic4Questions.some(q =>
        q.prompt.toLowerCase().includes('disk') ||
        q.explanation.toLowerCase().includes('disk')
      );
      expect(hasDiskMethod).toBe(true);
    });

    it('should have questions about washer method', () => {
      const hasWasherMethod = topic4Questions.some(q =>
        q.prompt.toLowerCase().includes('washer') ||
        q.explanation.toLowerCase().includes('washer')
      );
      expect(hasWasherMethod).toBe(true);
    });

    it('washer method question should have correct answer about hollow solids', () => {
      const washerQuestion = topic4Questions.find(q =>
        q.id === 'math204-q4a-4' && q.prompt.includes('washer method')
      );

      expect(washerQuestion).toBeDefined();
      if (washerQuestion && washerQuestion.type === 'multiple_choice') {
        // The correct answer should reference hollow/hole
        const correctIdx = washerQuestion.correctAnswer as number;
        const correctOption = washerQuestion.options![correctIdx];
        expect(correctOption.toLowerCase()).toMatch(/hole|hollow/);
      }
    });

    it('should have questions about shell method', () => {
      const hasShellMethod = topic4Questions.some(q =>
        q.prompt.toLowerCase().includes('shell') ||
        q.explanation.toLowerCase().includes('shell')
      );
      expect(hasShellMethod).toBe(true);
    });

    it('should have questions about arc length', () => {
      const hasArcLength = topic4Questions.some(q =>
        q.prompt.toLowerCase().includes('arc length') ||
        q.explanation.toLowerCase().includes('arc length')
      );
      expect(hasArcLength).toBe(true);
    });
  });

  describe('Mathematical Formula Validation', () => {
    it('arc length formula question should have correct formula', () => {
      // Find the specific arc length formula question
      const arcLengthFormulaQuestion = allQuestions.find(q =>
        q.id === 'math204-q4b-1' &&
        q.prompt.toLowerCase().includes('arc length') &&
        q.type === 'multiple_choice'
      );

      expect(arcLengthFormulaQuestion).toBeDefined();
      if (arcLengthFormulaQuestion) {
        // Check that options contain LaTeX square root notation
        const hasSquareRoot = arcLengthFormulaQuestion.options?.some(opt => opt.includes('sqrt'));
        expect(hasSquareRoot).toBe(true);

        // Verify the correct answer is option index 1 (the one with f'(x) squared)
        expect(arcLengthFormulaQuestion.correctAnswer).toBe(1);

        // Verify the correct option has the squared derivative
        const correctOption = arcLengthFormulaQuestion.options![1];
        expect(correctOption).toContain('^2');
      }
    });

    it('disk method formula should include pi[f(x)]^2', () => {
      const diskQuestions = allQuestions.filter(q =>
        q.prompt.toLowerCase().includes('disk method') &&
        q.prompt.toLowerCase().includes('volume') &&
        q.type === 'multiple_choice'
      );

      for (const question of diskQuestions) {
        const correctIdx = question.correctAnswer as number;
        const correctOption = question.options![correctIdx];
        expect(correctOption).toMatch(/\\pi.*\[f\(x\)\]\^2|pi.*f\(x\).*\^2/i);
      }
    });
  });

  describe('Integration Topics Coverage', () => {
    it('should cover integration techniques', () => {
      const integrationQuestions = allQuestions.filter(q =>
        q.prompt.toLowerCase().includes('integrat') ||
        q.explanation.toLowerCase().includes('integrat')
      );
      expect(integrationQuestions.length).toBeGreaterThan(0);
    });

    it('should cover sequences and series', () => {
      const seriesQuestions = allQuestions.filter(q =>
        q.prompt.toLowerCase().includes('series') ||
        q.prompt.toLowerCase().includes('sequence') ||
        q.prompt.toLowerCase().includes('convergence')
      );
      expect(seriesQuestions.length).toBeGreaterThan(0);
    });

    it('should cover Taylor/Maclaurin series', () => {
      const taylorQuestions = allQuestions.filter(q =>
        q.prompt.toLowerCase().includes('taylor') ||
        q.prompt.toLowerCase().includes('maclaurin')
      );
      expect(taylorQuestions.length).toBeGreaterThan(0);
    });
  });

  describe('Statistics', () => {
    it('reports quiz statistics', () => {
      console.log(`Math204 total quizzes: ${allQuizzes.length}`);
      console.log(`Math204 total questions: ${allQuestions.length}`);

      const typeDistribution = allQuestions.reduce((acc, q) => {
        acc[q.type] = (acc[q.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log('Question type distribution:', typeDistribution);
      expect(allQuestions.length).toBeGreaterThan(0);
    });
  });
});
