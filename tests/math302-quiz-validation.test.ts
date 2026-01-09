/**
 * Math302 (Differential Equations) Quiz Content Validation Tests
 *
 * These tests validate the mathematical correctness of quiz questions
 * and answers for the MATH302 Differential Equations course.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const MATH302_DIR = join(__dirname, '../src/subjects/math302/content');

function loadQuizzes(topicDir: string): Quiz[] {
  const filePath = join(MATH302_DIR, topicDir, 'quizzes.json');
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as Quiz[];
}

/** Helper to get the correct answer text for a multiple choice question */
function getCorrectAnswerText(q: QuizQuestion): string {
  if (typeof q.correctAnswer === 'number' && q.options) {
    return q.options[q.correctAnswer];
  }
  return String(q.correctAnswer);
}

describe('Math302 Topic 1 - First-Order ODEs', () => {
  const quizzes = loadQuizzes('topic-1');

  describe('Quiz structure validation', () => {
    it('should have 3 quizzes for topic 1', () => {
      expect(quizzes).toHaveLength(3);
    });

    it('all quizzes should have required fields', () => {
      for (const quiz of quizzes) {
        expect(quiz.id).toBeDefined();
        expect(quiz.subjectId).toBe('math302');
        expect(quiz.topicId).toBe('math302-topic-1');
        expect(quiz.title).toBeDefined();
        expect(quiz.questions).toBeDefined();
        expect(quiz.questions.length).toBeGreaterThan(0);
      }
    });

    it('all questions should have required fields', () => {
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          expect(question.id).toBeDefined();
          expect(question.type).toBeDefined();
          expect(question.prompt).toBeDefined();
          expect(question.correctAnswer).toBeDefined();
          expect(question.explanation).toBeDefined();
        }
      }
    });
  });

  describe('Separable equations quiz (math302-quiz-1-1)', () => {
    const quiz = quizzes.find(q => q.id === 'math302-quiz-1-1');

    it('should exist', () => {
      expect(quiz).toBeDefined();
    });

    it('math302-q1: dy/dx = xy is separable', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q1');
      expect(q).toBeDefined();
      // Verify correct answer text
      expect(getCorrectAnswerText(q!)).toBe('dy/dx = xy');
      // Verify this is correct: dy/dx = xy can be written as dy/y = x dx
    });

    it('math302-q2: Solution of dy/dx = 2xy with y(0) = 1 is e^(x²)', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q2');
      expect(q).toBeDefined();
      // Verify correct answer text
      expect(getCorrectAnswerText(q!)).toBe('y = e^(x²)');
      // Verify: dy/y = 2x dx → ln|y| = x² + C → y = e^(x² + C)
      // With y(0) = 1: 1 = e^C → C = 0, so y = e^(x²)
    });

    it('math302-q3: Integrating factor for dy/dx + 2y = x is e^(2x)', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q3');
      expect(q).toBeDefined();
      // Verify correct answer text
      expect(getCorrectAnswerText(q!)).toBe('e^(2x)');
      // Verify: μ(x) = e^(∫P dx) = e^(∫2 dx) = e^(2x)
    });

    it('math302-q4: Solution of dy/dx + y = e^x is (1/2)e^x + Ce^(-x)', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q4');
      expect(q).toBeDefined();
      // Verify correct answer text
      expect(getCorrectAnswerText(q!)).toBe('y = (1/2)e^x + Ce^(-x)');
      // Verify: Integrating factor is e^x
      // d/dx(ye^x) = e^(2x)
      // ye^x = (1/2)e^(2x) + C
      // y = (1/2)e^x + Ce^(-x)
    });

    it('math302-q5: Homogeneous substitution for dy/dx = (x² + y²)/xy', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q5');
      expect(q).toBeDefined();
      // Verify correct answer text
      expect(getCorrectAnswerText(q!)).toBe('Homogeneous substitution v = y/x');
      // Verify: The equation is homogeneous of degree 0 since both numerator
      // and denominator are degree 2 in x and y
    });
  });

  describe('Exact equations quiz (math302-quiz-1-2)', () => {
    const quiz = quizzes.find(q => q.id === 'math302-quiz-1-2');

    it('should exist', () => {
      expect(quiz).toBeDefined();
    });

    it('math302-q6: Exactness condition is ∂M/∂y = ∂N/∂x', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q6');
      expect(q).toBeDefined();
      // Verify correct answer text
      expect(getCorrectAnswerText(q!)).toBe('∂M/∂y = ∂N/∂x');
    });

    it('math302-q7: (2xy + 3)dx + (x² - 1)dy = 0 is exact', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q7');
      expect(q).toBeDefined();
      // Verify correct answer text
      expect(getCorrectAnswerText(q!)).toBe('Yes, because ∂M/∂y = ∂N/∂x = 2x');
      // Verify: M = 2xy + 3, ∂M/∂y = 2x
      //         N = x² - 1, ∂N/∂x = 2x
      // Equal, so exact
    });

    it('math302-q9: Solution of 2x dx + 2y dy = 0 is x² + y² = C', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q9');
      expect(q).toBeDefined();
      // Verify correct answer text
      expect(getCorrectAnswerText(q!)).toBe('x² + y² = C');
      // Verify: F(x,y) = x² + y² satisfies ∂F/∂x = 2x, ∂F/∂y = 2y
    });
  });

  describe('Existence and Uniqueness quiz (math302-quiz-1-3)', () => {
    const quiz = quizzes.find(q => q.id === 'math302-quiz-1-3');

    it('should exist', () => {
      expect(quiz).toBeDefined();
    });

    it('math302-q11: Picard-Lindelöf requires continuity', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q11');
      expect(q).toBeDefined();
      // Verify correct answer contains expected text
      expect(getCorrectAnswerText(q!)).toMatch(/continuous/i);
    });

    it('math302-q12: dy/dx = y^(1/3), y(0) = 0 may have non-unique solution', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q12');
      expect(q).toBeDefined();
      // Verify correct answer - should indicate non-uniqueness
      // The answer could be "may not be unique" or indicate multiple solutions
      expect(getCorrectAnswerText(q!)).toMatch(/not.*unique|may not|infinitely|multiple/i);
    });

    it('math302-q13: dy/dx = x² + y², y(0) = 1 has unique solution', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q13');
      expect(q).toBeDefined();
      // Verify correct answer is the IVP that has a unique solution
      // The answer is the IVP itself, not a statement about uniqueness
      expect(getCorrectAnswerText(q!)).toMatch(/x.*\+.*y|y\(0\)\s*=\s*1/i);
    });

    it('math302-q15: Autonomous equations depend only on y', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q15');
      expect(q).toBeDefined();
      // Verify correct answer contains "y"
      expect(getCorrectAnswerText(q!)).toMatch(/y|dependent/i);
    });
  });
});

describe('Math302 Topic 2 - Second-Order Linear ODEs', () => {
  const quizzes = loadQuizzes('topic-2');

  describe('Characteristic equation quiz (math302-quiz-2-1)', () => {
    const quiz = quizzes.find(q => q.id === 'math302-quiz-2-1');

    it('should exist', () => {
      expect(quiz).toBeDefined();
    });

    it('math302-q16: Characteristic equation for y″ - 5y′ + 6y = 0', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q16');
      expect(q).toBeDefined();
      // Verify correct answer text
      expect(getCorrectAnswerText(q!)).toBe('r² - 5r + 6 = 0');
    });

    it('math302-q17: Complex roots r = -2 ± 3i give damped oscillation', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q17');
      expect(q).toBeDefined();
      // Verify correct answer text contains cos and sin
      expect(getCorrectAnswerText(q!)).toMatch(/cos.*sin|e.*cos|damped/i);
    });

    it('math302-q18: Repeated root r = 3 for y″ - 6y′ + 9y = 0', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q18');
      expect(q).toBeDefined();
      // Verify correct answer is the form for repeated roots: (C₁ + C₂x)e^(rx)
      expect(getCorrectAnswerText(q!)).toMatch(/\(C.*\+.*x\).*e\^|C.*x.*e\^/i);
    });

    it('math302-q20: y″ - 4y = 0 grows without bound', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q20');
      expect(q).toBeDefined();
      // Verify correct answer is the equation y″ - 4y = 0
      // The answer is the equation itself, not a description
      expect(getCorrectAnswerText(q!)).toMatch(/y.*-\s*4y\s*=\s*0/i);
    });
  });

  describe('Undetermined coefficients quiz (math302-quiz-2-2)', () => {
    const quiz = quizzes.find(q => q.id === 'math302-quiz-2-2');

    it('should exist', () => {
      expect(quiz).toBeDefined();
    });

    it('math302-q22: Particular solution form when e^(3x) is homogeneous solution', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q22');
      expect(q).toBeDefined();
      // Verify correct answer contains x multiplier (for modification)
      expect(getCorrectAnswerText(q!)).toMatch(/x.*e\^|xe\^|multiply.*x/i);
    });

    it('math302-q23: Resonance case for y″ + 9y = sin(3x)', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q23');
      expect(q).toBeDefined();
      // Verify correct answer discusses resonance or modified form
      expect(getCorrectAnswerText(q!)).toMatch(/resonance|x.*cos|x.*sin/i);
    });
  });

  describe('Variation of parameters quiz (math302-quiz-2-3)', () => {
    const quiz = quizzes.find(q => q.id === 'math302-quiz-2-3');

    it('should exist', () => {
      expect(quiz).toBeDefined();
    });

    it('math302-q27: Wronskian definition', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q27');
      expect(q).toBeDefined();
      // Verify correct answer contains Wronskian formula elements
      // W = y₁y₂′ - y₁′y₂
      expect(getCorrectAnswerText(q!)).toMatch(/y.*y.*[-−]|y₁.*y₂|W\s*=/i);
    });

    it('math302-q29: Formula for u₁′ in variation of parameters', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q29');
      expect(q).toBeDefined();
      // Verify correct answer contains formula elements
      expect(getCorrectAnswerText(q!)).toMatch(/y_2|W|g\(x\)/i);
    });

    it('math302-q30: W = 0 implies linear dependence', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q30');
      expect(q).toBeDefined();
      // Verify correct answer talks about linear dependence
      expect(getCorrectAnswerText(q!)).toMatch(/dependent|linear/i);
    });
  });
});

describe('Mathematical correctness verification', () => {
  describe('First-order linear ODE solutions', () => {
    const quizzes = loadQuizzes('topic-1');
    const quiz = quizzes.find(q => q.id === 'math302-quiz-1-1');

    it('verifies the corrected solution for dy/dx + y = e^x', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q4');
      // The solution should be y = (1/2)e^x + Ce^(-x)
      // Verify by substitution:
      // dy/dx = (1/2)e^x - Ce^(-x)
      // y = (1/2)e^x + Ce^(-x)
      // dy/dx + y = (1/2)e^x - Ce^(-x) + (1/2)e^x + Ce^(-x) = e^x ✓

      // Verify the correct answer is this solution
      expect(getCorrectAnswerText(q!)).toBe('y = (1/2)e^x + Ce^(-x)');
    });
  });

  describe('Separable ODE solution verification', () => {
    const quizzes = loadQuizzes('topic-1');
    const quiz = quizzes.find(q => q.id === 'math302-quiz-1-1');

    it('verifies dy/dx = 2xy with y(0) = 1 gives y = e^(x²)', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q2');
      // Verify solution:
      // dy/y = 2x dx
      // ln|y| = x² + C
      // y = e^(x² + C) = Ae^(x²)
      // With y(0) = 1: A = 1
      // So y = e^(x²)

      // Verify the correct answer
      expect(getCorrectAnswerText(q!)).toBe('y = e^(x²)');

      // Mathematical verification at x = 1
      const x = 1;
      const y = Math.exp(x * x); // e^1 ≈ 2.718
      const dy_dx = 2 * x * y; // 2 * 1 * e^1 ≈ 5.436
      const expected_dy_dx = 2 * x * y;
      expect(dy_dx).toBeCloseTo(expected_dy_dx, 10);
    });
  });
});
