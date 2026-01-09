/**
 * Fill Blank Answer Format Validation Tests
 *
 * Validates that fill_blank questions have appropriately simple answers
 * that students can reasonably type. Complex mathematical expressions
 * should use multiple_choice format instead.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
}

// Load all quiz files
async function loadAllQuizzes(): Promise<Quiz[]> {
  const quizzes: Quiz[] = [];
  const baseDir = path.join(__dirname, '../src/subjects');

  const quizFiles = await glob('**/quizzes.json', { cwd: baseDir });

  for (const quizFile of quizFiles) {
    const quizPath = path.join(baseDir, quizFile);
    const content = fs.readFileSync(quizPath, 'utf-8');
    const fileQuizzes = JSON.parse(content) as Quiz[];
    quizzes.push(...fileQuizzes);
  }

  return quizzes;
}

describe('Fill Blank Answer Format Validation', () => {
  let allQuizzes: Quiz[];
  let fillBlankQuestions: QuizQuestion[];

  beforeAll(async () => {
    allQuizzes = await loadAllQuizzes();
    fillBlankQuestions = allQuizzes
      .flatMap(q => q.questions)
      .filter(q => q.type === 'fill_blank');
  });

  describe('Answer complexity', () => {
    it('fill_blank answers should not contain complex mathematical expressions with " + "', () => {
      // Complex expressions with operators should use multiple_choice
      const complexAnswers = fillBlankQuestions.filter(q => {
        const answer = String(q.correctAnswer);
        // Check for patterns like "sin(x) + C" which are hard to type exactly
        return answer.includes(' + ') &&
          (answer.includes('(') || answer.includes('sin') || answer.includes('cos'));
      });

      if (complexAnswers.length > 0) {
        console.log('Fill blank questions with complex expressions:');
        complexAnswers.forEach(q => {
          console.log(`  - ${q.id}: "${q.correctAnswer}"`);
        });
      }

      expect(complexAnswers).toHaveLength(0);
    });

    it('fill_blank answers should not require LaTeX notation', () => {
      const latexAnswers = fillBlankQuestions.filter(q => {
        const answer = String(q.correctAnswer);
        return answer.includes('\\') && (
          answer.includes('\\frac') ||
          answer.includes('\\sqrt') ||
          answer.includes('\\pi') ||
          answer.includes('\\sin') ||
          answer.includes('\\cos')
        );
      });

      if (latexAnswers.length > 0) {
        console.log('Fill blank questions requiring LaTeX:');
        latexAnswers.forEach(q => {
          console.log(`  - ${q.id}: "${q.correctAnswer}"`);
        });
      }

      expect(latexAnswers).toHaveLength(0);
    });

    it('fill_blank answers should be reasonably short (under 30 characters)', () => {
      const longAnswers = fillBlankQuestions.filter(q => {
        const answer = String(q.correctAnswer);
        return answer.length > 30;
      });

      if (longAnswers.length > 0) {
        console.log('Fill blank questions with long answers (>30 chars):');
        longAnswers.forEach(q => {
          console.log(`  - ${q.id}: "${q.correctAnswer}" (${String(q.correctAnswer).length} chars)`);
        });
      }

      // Allow some longer answers but flag them
      expect(longAnswers.length).toBeLessThan(10);
    });
  });

  describe('Acceptable fill_blank patterns', () => {
    it('numeric answers are acceptable', () => {
      const numericAnswers = fillBlankQuestions.filter(q => {
        const answer = String(q.correctAnswer);
        return /^-?\d+(\.\d+)?$/.test(answer);
      });

      expect(numericAnswers.length).toBeGreaterThan(0);
    });

    it('single word answers are acceptable', () => {
      const singleWordAnswers = fillBlankQuestions.filter(q => {
        const answer = String(q.correctAnswer).trim();
        return /^[a-zA-Z]+$/.test(answer);
      });

      expect(singleWordAnswers.length).toBeGreaterThan(0);
    });

    it('simple algebraic expressions (like n-1, 3n-6) are acceptable', () => {
      const simpleAlgebraicAnswers = fillBlankQuestions.filter(q => {
        const answer = String(q.correctAnswer);
        return /^[a-z0-9]+[\-\+\*\/][a-z0-9]+$/i.test(answer);
      });

      expect(simpleAlgebraicAnswers.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Math204 specific validation', () => {
    it('math204-q1c-5 should be multiple_choice (was problematic fill_blank)', () => {
      const math204Quizzes = allQuizzes.filter(q => q.subjectId === 'math204');
      const allMath204Questions = math204Quizzes.flatMap(q => q.questions);

      const question = allMath204Questions.find(q => q.id === 'math204-q1c-5');

      expect(question).toBeDefined();
      expect(question?.type).toBe('multiple_choice');
      expect(question?.options).toBeDefined();
      expect(question?.options?.length).toBeGreaterThanOrEqual(2);
    });

    it('math204-q1c-5 should have correct integral answer (sin x + C)', () => {
      const math204Quizzes = allQuizzes.filter(q => q.subjectId === 'math204');
      const allMath204Questions = math204Quizzes.flatMap(q => q.questions);

      const question = allMath204Questions.find(q => q.id === 'math204-q1c-5');

      expect(question).toBeDefined();
      if (question && question.type === 'multiple_choice') {
        // Verify the correct answer points to the sin x + C option
        const correctIndex = question.correctAnswer as number;
        expect(correctIndex).toBeGreaterThanOrEqual(0);
        expect(correctIndex).toBeLessThan(question.options!.length);
        const correctOption = question.options?.[correctIndex];
        expect(correctOption).toContain('sin');
        expect(correctOption).toContain('C');
        // Should NOT be -sin (that's the derivative, not the integral)
        expect(correctOption).not.toMatch(/^[^a-zA-Z]*-.*sin/);
      }
    });
  });

  describe('Statistics', () => {
    it('reports fill_blank answer statistics', () => {
      console.log(`Total fill_blank questions: ${fillBlankQuestions.length}`);

      const answerLengths = fillBlankQuestions.map(q => String(q.correctAnswer).length);
      const avgLength = answerLengths.reduce((a, b) => a + b, 0) / answerLengths.length;
      const maxLength = Math.max(...answerLengths);
      const minLength = Math.min(...answerLengths);

      console.log(`Answer length stats: min=${minLength}, max=${maxLength}, avg=${avgLength.toFixed(1)}`);

      expect(fillBlankQuestions.length).toBeGreaterThan(0);
    });

    it('categorizes fill_blank answers by type', () => {
      const categories = {
        numeric: 0,
        singleWord: 0,
        twoWords: 0,
        simple_expression: 0,
        other: 0,
      };

      fillBlankQuestions.forEach(q => {
        const answer = String(q.correctAnswer).trim();

        if (/^-?\d+(\.\d+)?$/.test(answer)) {
          categories.numeric++;
        } else if (/^[a-zA-Z]+$/.test(answer)) {
          categories.singleWord++;
        } else if (/^[a-zA-Z]+\s+[a-zA-Z]+$/.test(answer)) {
          categories.twoWords++;
        } else if (/^[a-z0-9n\-\+\*\/\(\)]+$/i.test(answer) && answer.length < 15) {
          categories.simple_expression++;
        } else {
          categories.other++;
        }
      });

      console.log('Fill blank answer categories:', categories);

      expect(categories.numeric + categories.singleWord + categories.twoWords +
             categories.simple_expression).toBeGreaterThan(categories.other);
    });
  });
});
