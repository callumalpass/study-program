/**
 * Math301 Topic 2 and Topic 7 Quiz Validation Tests
 *
 * These tests validate that multiple_choice questions in math301 topic-2 and topic-7
 * use numeric indices for correctAnswer values (not string values).
 *
 * This is a regression test to ensure that the data consistency fix is maintained.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const MATH301_TOPIC2_PATH = join(__dirname, '../src/subjects/math301/content/topic-2/quizzes.json');
const MATH301_TOPIC7_PATH = join(__dirname, '../src/subjects/math301/content/topic-7/quizzes.json');

function loadQuizzes(path: string): Quiz[] {
  const content = readFileSync(path, 'utf-8');
  return JSON.parse(content) as Quiz[];
}

/** Helper to get the correct answer text for a multiple choice question */
function getCorrectAnswerText(q: QuizQuestion): string {
  if (typeof q.correctAnswer === 'number' && q.options) {
    return q.options[q.correctAnswer];
  }
  return String(q.correctAnswer);
}

describe('Math301 Topic 2 Quiz Validation', () => {
  const quizzes = loadQuizzes(MATH301_TOPIC2_PATH);

  describe('correctAnswer format consistency', () => {
    it('all multiple_choice questions should use numeric indices for correctAnswer', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice') {
            if (typeof question.correctAnswer !== 'number') {
              issues.push(
                `${quiz.id}/${question.id}: correctAnswer should be numeric index, got ${typeof question.correctAnswer}: "${question.correctAnswer}"`
              );
            }
          }
        }
      }

      expect(issues, `Found multiple_choice questions with non-numeric correctAnswer:\n${issues.join('\n')}`).toHaveLength(0);
    });

    it('numeric correctAnswer indices should be within bounds', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            if (typeof question.correctAnswer === 'number') {
              if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
                issues.push(
                  `${quiz.id}/${question.id}: correctAnswer index ${question.correctAnswer} out of bounds (options: ${question.options.length})`
                );
              }
            }
          }
        }
      }

      expect(issues, `Found out-of-bounds correctAnswer indices:\n${issues.join('\n')}`).toHaveLength(0);
    });
  });

  describe('specific questions regression tests', () => {
    it('math301-q16 should have correct answer "2xy + 3y²" (partial derivative question)', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-2-1');
      expect(quiz).toBeDefined();

      const question = quiz!.questions.find(q => q.id === 'math301-q16');
      expect(question).toBeDefined();
      expect(question!.type).toBe('multiple_choice');
      expect(getCorrectAnswerText(question!)).toBe('2xy + 3y²');
    });

    it('math301-q17 should have correct answer "x² + 6xy"', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-2-1');
      const question = quiz!.questions.find(q => q.id === 'math301-q17');
      expect(getCorrectAnswerText(question!)).toBe('x² + 6xy');
    });

    it('math301-q22 should have correct answer "3"', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-2-2');
      const question = quiz!.questions.find(q => q.id === 'math301-q22');
      expect(question).toBeDefined();
      expect(getCorrectAnswerText(question!)).toBe('3');
    });

    it('math301-q29 should have correct answer "2"', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-2-3');
      const question = quiz!.questions.find(q => q.id === 'math301-q29');
      expect(question).toBeDefined();
      expect(getCorrectAnswerText(question!)).toBe('2');
    });

    it('math301-q30 should have correct answer "1/2" (limit question)', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-2-3');
      const question = quiz!.questions.find(q => q.id === 'math301-q30');
      expect(question).toBeDefined();
      expect(getCorrectAnswerText(question!)).toBe('1/2');
    });
  });

  describe('true_false questions validation', () => {
    it('true_false questions should have boolean correctAnswer', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'true_false') {
            if (typeof question.correctAnswer !== 'boolean') {
              issues.push(
                `${quiz.id}/${question.id}: true_false should have boolean correctAnswer, got ${typeof question.correctAnswer}`
              );
            }
          }
        }
      }

      expect(issues).toHaveLength(0);
    });
  });
});

describe('Math301 Topic 7 Quiz Validation', () => {
  const quizzes = loadQuizzes(MATH301_TOPIC7_PATH);

  describe('correctAnswer format consistency', () => {
    it('all multiple_choice questions should use numeric indices for correctAnswer', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice') {
            if (typeof question.correctAnswer !== 'number') {
              issues.push(
                `${quiz.id}/${question.id}: correctAnswer should be numeric index, got ${typeof question.correctAnswer}: "${question.correctAnswer}"`
              );
            }
          }
        }
      }

      expect(issues, `Found multiple_choice questions with non-numeric correctAnswer:\n${issues.join('\n')}`).toHaveLength(0);
    });

    it('numeric correctAnswer indices should be within bounds', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            if (typeof question.correctAnswer === 'number') {
              if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
                issues.push(
                  `${quiz.id}/${question.id}: correctAnswer index ${question.correctAnswer} out of bounds (options: ${question.options.length})`
                );
              }
            }
          }
        }
      }

      expect(issues, `Found out-of-bounds correctAnswer indices:\n${issues.join('\n')}`).toHaveLength(0);
    });
  });

  describe('specific questions regression tests', () => {
    it('math301-q91 should have correct answer "∂Q/∂x - ∂P/∂y" (curl F in 2D)', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-1');
      expect(quiz).toBeDefined();

      const question = quiz!.questions.find(q => q.id === 'math301-q91');
      expect(question).toBeDefined();
      expect(question!.type).toBe('multiple_choice');
      expect(getCorrectAnswerText(question!)).toBe('∂Q/∂x - ∂P/∂y');
    });

    it('math301-q92 should have correct answer "∂P/∂x + ∂Q/∂y + ∂R/∂z" (div F)', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-1');
      const question = quiz!.questions.find(q => q.id === 'math301-q92');
      expect(getCorrectAnswerText(question!)).toBe('∂P/∂x + ∂Q/∂y + ∂R/∂z');
    });

    it('math301-q96 should have correct answer "Surface integral of curl F" (Stokes\' Theorem)', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-2');
      const question = quiz!.questions.find(q => q.id === 'math301-q96');
      expect(question).toBeDefined();
      expect(getCorrectAnswerText(question!)).toBe('Surface integral of curl F');
    });

    it('math301-q101 should have correct answer "Rate of outflow per unit volume" (divergence interpretation)', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-3');
      const question = quiz!.questions.find(q => q.id === 'math301-q101');
      expect(question).toBeDefined();
      expect(getCorrectAnswerText(question!)).toBe('Rate of outflow per unit volume');
    });

    it('math301-q105 should have correct answer "0" (curl of gradient)', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-3');
      const question = quiz!.questions.find(q => q.id === 'math301-q105');
      expect(question).toBeDefined();
      expect(getCorrectAnswerText(question!)).toBe('0');
    });
  });

  describe('true_false questions validation', () => {
    it('true_false questions should have boolean correctAnswer', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'true_false') {
            if (typeof question.correctAnswer !== 'boolean') {
              issues.push(
                `${quiz.id}/${question.id}: true_false should have boolean correctAnswer, got ${typeof question.correctAnswer}`
              );
            }
          }
        }
      }

      expect(issues).toHaveLength(0);
    });

    it('math301-q93 should have boolean correctAnswer true', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-1');
      const question = quiz!.questions.find(q => q.id === 'math301-q93');
      expect(question).toBeDefined();
      expect(question!.type).toBe('true_false');
      expect(question!.correctAnswer).toBe(true);
    });

    it('math301-q97 should have boolean correctAnswer true', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-2');
      const question = quiz!.questions.find(q => q.id === 'math301-q97');
      expect(question).toBeDefined();
      expect(question!.type).toBe('true_false');
      expect(question!.correctAnswer).toBe(true);
    });
  });

  describe('quiz structure validation', () => {
    it('all quizzes should have correct subjectId and topicId', () => {
      for (const quiz of quizzes) {
        expect(quiz.subjectId).toBe('math301');
        expect(quiz.topicId).toBe('math301-topic-7');
        expect(quiz.questions.length).toBeGreaterThan(0);
      }
    });

    it('quiz-7-1 should have 5 questions', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-1');
      expect(quiz!.questions).toHaveLength(5);
    });

    it('quiz-7-2 should have 5 questions', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-2');
      expect(quiz!.questions).toHaveLength(5);
    });

    it('quiz-7-3 should have 5 questions', () => {
      const quiz = quizzes.find(q => q.id === 'math301-quiz-7-3');
      expect(quiz!.questions).toHaveLength(5);
    });
  });
});

describe('Math301 Mathematical Content Validation', () => {
  const topic2Quizzes = loadQuizzes(MATH301_TOPIC2_PATH);
  const topic7Quizzes = loadQuizzes(MATH301_TOPIC7_PATH);

  describe('topic 2 math content', () => {
    it('partial derivative question has mathematically correct answer', () => {
      // f(x,y) = x²y + 3xy²
      // ∂f/∂x = 2xy + 3y² (treating y as constant)
      const quiz = topic2Quizzes.find(q => q.id === 'math301-quiz-2-1');
      const q16 = quiz!.questions.find(q => q.id === 'math301-q16');

      expect(q16!.prompt).toContain('f(x,y) = x²y + 3xy²');
      expect(q16!.prompt).toContain('∂f/∂x');

      // Verify the correct answer matches the mathematically correct result
      expect(getCorrectAnswerText(q16!)).toBe('2xy + 3y²');
    });

    it('chain rule question has correct dz/dt calculation', () => {
      // z = x²y, x = t², y = t³
      // dz/dt = 7t⁶ (verified by direct substitution: z = t⁴·t³ = t⁷, so dz/dt = 7t⁶)
      const quiz = topic2Quizzes.find(q => q.id === 'math301-quiz-2-2');
      const q21 = quiz!.questions.find(q => q.id === 'math301-q21');

      expect(q21!.prompt).toContain('z = x²y');
      expect(q21!.prompt).toContain('x = t²');
      expect(q21!.prompt).toContain('y = t³');

      expect(getCorrectAnswerText(q21!)).toBe('7t⁶');
    });

    it('limit question has correct answer along y=x path', () => {
      // f(x,y) = xy/(x² + y²) along y = x
      // f(x,x) = x²/(2x²) = 1/2
      const quiz = topic2Quizzes.find(q => q.id === 'math301-quiz-2-3');
      const q30 = quiz!.questions.find(q => q.id === 'math301-q30');

      expect(q30!.prompt).toContain('xy/(x² + y²)');
      expect(q30!.prompt).toContain('y = x');

      expect(getCorrectAnswerText(q30!)).toBe('1/2');
    });
  });

  describe('topic 7 math content', () => {
    it('2D curl formula is correct', () => {
      // curl F = ∂Q/∂x - ∂P/∂y for F = <P, Q>
      const quiz = topic7Quizzes.find(q => q.id === 'math301-quiz-7-1');
      const q91 = quiz!.questions.find(q => q.id === 'math301-q91');

      expect(q91!.prompt).toContain('curl F');
      expect(q91!.prompt).toContain('F = <P, Q>');

      expect(getCorrectAnswerText(q91!)).toBe('∂Q/∂x - ∂P/∂y');
    });

    it('divergence formula is correct', () => {
      // div F = ∂P/∂x + ∂Q/∂y + ∂R/∂z for F = <P, Q, R>
      const quiz = topic7Quizzes.find(q => q.id === 'math301-quiz-7-1');
      const q92 = quiz!.questions.find(q => q.id === 'math301-q92');

      expect(q92!.prompt).toContain('div F');
      expect(q92!.prompt).toContain('F = <P, Q, R>');

      expect(getCorrectAnswerText(q92!)).toBe('∂P/∂x + ∂Q/∂y + ∂R/∂z');
    });

    it('curl of gradient equals zero (fundamental identity)', () => {
      // curl(∇f) = 0
      const quiz = topic7Quizzes.find(q => q.id === 'math301-quiz-7-3');
      const q105 = quiz!.questions.find(q => q.id === 'math301-q105');

      expect(q105!.prompt).toContain('curl(∇f)');

      expect(getCorrectAnswerText(q105!)).toBe('0');
    });
  });
});
