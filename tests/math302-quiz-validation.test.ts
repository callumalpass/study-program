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
      expect(q!.correctAnswer).toBe('dy/dx = xy');
      // Verify this is correct: dy/dx = xy can be written as dy/y = x dx
    });

    it('math302-q2: Solution of dy/dx = 2xy with y(0) = 1 is e^(x²)', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q2');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('y = e^(x²)');
      // Verify: dy/y = 2x dx → ln|y| = x² + C → y = e^(x² + C)
      // With y(0) = 1: 1 = e^C → C = 0, so y = e^(x²)
    });

    it('math302-q3: Integrating factor for dy/dx + 2y = x is e^(2x)', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q3');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('e^(2x)');
      // Verify: μ(x) = e^(∫P dx) = e^(∫2 dx) = e^(2x)
    });

    it('math302-q4: Solution of dy/dx + y = e^x is (1/2)e^x + Ce^(-x)', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q4');
      expect(q).toBeDefined();
      // This is the corrected answer - previously was incorrectly (x/2)e^x
      expect(q!.correctAnswer).toBe('y = (1/2)e^x + Ce^(-x)');
      // Verify: Integrating factor is e^x
      // d/dx(ye^x) = e^(2x)
      // ye^x = (1/2)e^(2x) + C
      // y = (1/2)e^x + Ce^(-x)
    });

    it('math302-q5: Homogeneous substitution for dy/dx = (x² + y²)/xy', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q5');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('Homogeneous substitution v = y/x');
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
      expect(q!.correctAnswer).toBe('∂M/∂y = ∂N/∂x');
    });

    it('math302-q7: (2xy + 3)dx + (x² - 1)dy = 0 is exact', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q7');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('Yes, because ∂M/∂y = ∂N/∂x = 2x');
      // Verify: M = 2xy + 3, ∂M/∂y = 2x
      //         N = x² - 1, ∂N/∂x = 2x
      // Equal, so exact
    });

    it('math302-q9: Solution of 2x dx + 2y dy = 0 is x² + y² = C', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q9');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('x² + y² = C');
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
      expect(q!.correctAnswer).toBe('Continuous in a region containing (x₀, y₀)');
    });

    it('math302-q12: dy/dx = y^(1/3), y(0) = 0 may have non-unique solution', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q12');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('Solution exists but may not be unique');
      // Verify: f(x,y) = y^(1/3) is continuous at y=0
      // but ∂f/∂y = (1/3)y^(-2/3) is not continuous at y=0
      // So existence is guaranteed but not uniqueness
    });

    it('math302-q13: dy/dx = x² + y², y(0) = 1 has unique solution', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q13');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('dy/dx = x² + y², y(0) = 1');
      // Verify: f(x,y) = x² + y² is polynomial, so f and ∂f/∂y = 2y
      // are both continuous everywhere
    });

    it('math302-q15: Autonomous equations depend only on y', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q15');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('f depends only on y, not x');
    });
  });
});

describe('Math302 Topic 2 - Second-Order Linear ODEs', () => {
  const quizzes = loadQuizzes('topic-2');

  describe('Quiz structure validation', () => {
    it('should have 3 quizzes for topic 2', () => {
      expect(quizzes).toHaveLength(3);
    });
  });

  describe('Characteristic equation quiz (math302-quiz-2-1)', () => {
    const quiz = quizzes.find(q => q.id === 'math302-quiz-2-1');

    it('should exist', () => {
      expect(quiz).toBeDefined();
    });

    it('math302-q16: Characteristic equation for y″ - 5y′ + 6y = 0', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q16');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('r² - 5r + 6 = 0');
      // Verify: For ay″ + by′ + cy = 0, char eq is ar² + br + c = 0
      // Here: r² - 5r + 6 = 0, roots are r = 2, 3
    });

    it('math302-q17: Complex roots r = -2 ± 3i give damped oscillation', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q17');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('y = e^(-2x)(C₁cos(3x) + C₂sin(3x))');
      // Verify: For roots α ± βi, solution is y = e^(αx)(C₁cos(βx) + C₂sin(βx))
    });

    it('math302-q18: Repeated root r = 3 for y″ - 6y′ + 9y = 0', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q18');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('y = (C₁ + C₂x)e^(3x)');
      // Verify: r² - 6r + 9 = (r-3)² = 0, repeated root r = 3
      // For repeated roots: y = (C₁ + C₂x)e^(rx)
    });

    it('math302-q19: y″ + 4y′ + 5y = 0 exhibits damped oscillation', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q19');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('Damped oscillation');
      // Verify: r² + 4r + 5 = 0 → r = (-4 ± √(16-20))/2 = -2 ± i
      // Complex roots with negative real part = damped oscillation
    });

    it('math302-q20: y″ - 4y = 0 grows without bound', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q20');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('y″ - 4y = 0');
      // Verify: r² - 4 = 0 → r = ±2
      // Positive root r = 2 gives e^(2x) which grows
    });
  });

  describe('Undetermined coefficients quiz (math302-quiz-2-2)', () => {
    const quiz = quizzes.find(q => q.id === 'math302-quiz-2-2');

    it('should exist', () => {
      expect(quiz).toBeDefined();
    });

    it('math302-q21: Particular solution form for 8x²', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q21');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('Ax² + Bx + C');
      // For polynomial forcing function of degree n, try polynomial of same degree
    });

    it('math302-q22: Particular solution form when e^(3x) is homogeneous solution', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q22');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('Axe^(3x)');
      // When forcing function is part of homogeneous solution, multiply by x
    });

    it('math302-q23: Resonance case for y″ + 9y = sin(3x)', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q23');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('x(Acos(3x) + Bsin(3x))');
      // r² + 9 = 0 → r = ±3i, so sin(3x) is in homogeneous solution
      // Must multiply by x
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
      expect(q!.correctAnswer).toBe('W = y₁y₂′ - y₁′y₂');
    });

    it('math302-q29: Formula for u₁′ in variation of parameters', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q29');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe("u₁′ = -y₂f/W");
    });

    it('math302-q30: W = 0 implies linear dependence', () => {
      const q = quiz!.questions.find(q => q.id === 'math302-q30');
      expect(q).toBeDefined();
      expect(q!.correctAnswer).toBe('Linearly dependent');
    });
  });
});

describe('Mathematical correctness verification', () => {
  describe('First-order linear ODE solutions', () => {
    it('verifies the corrected solution for dy/dx + y = e^x', () => {
      // The equation: dy/dx + y = e^x
      // Standard form: dy/dx + P(x)y = Q(x) where P(x) = 1, Q(x) = e^x
      //
      // Integrating factor: μ(x) = e^(∫1 dx) = e^x
      //
      // Multiply both sides: e^x(dy/dx) + e^x·y = e^(2x)
      // Left side is d/dx(y·e^x) = e^(2x)
      //
      // Integrate: y·e^x = ∫e^(2x) dx = (1/2)e^(2x) + C
      //
      // Solve for y: y = (1/2)e^x + Ce^(-x)
      //
      // Note: The incorrect answer was y = (x/2)e^x + Ce^(-x)
      // which would require d/dx(y·e^x) = xe^(2x), not e^(2x)

      const quizzes = loadQuizzes('topic-1');
      const quiz = quizzes.find(q => q.id === 'math302-quiz-1-1');
      const q = quiz!.questions.find(q => q.id === 'math302-q4');

      // The correct answer must be (1/2)e^x + Ce^(-x), not (x/2)e^x
      expect(q!.correctAnswer).toBe('y = (1/2)e^x + Ce^(-x)');
      expect(q!.correctAnswer).not.toBe('y = (x/2)e^x + Ce^(-x)');
    });

    it('verifies explanation matches the correct answer', () => {
      const quizzes = loadQuizzes('topic-1');
      const quiz = quizzes.find(q => q.id === 'math302-quiz-1-1');
      const q = quiz!.questions.find(q => q.id === 'math302-q4');

      // The explanation should mention (1/2)e^x, not (x/2)e^x
      expect(q!.explanation).toContain('(1/2)e^x');
      expect(q!.explanation).not.toContain('(x/2)e^x');
    });
  });

  describe('Separable ODE solution verification', () => {
    it('verifies dy/dx = 2xy with y(0) = 1 gives y = e^(x²)', () => {
      // dy/dx = 2xy
      // dy/y = 2x dx
      // ln|y| = x² + C
      // y = e^(x² + C) = Ae^(x²) where A = e^C
      // With y(0) = 1: A·e^0 = 1 → A = 1
      // So y = e^(x²)

      const quizzes = loadQuizzes('topic-1');
      const quiz = quizzes.find(q => q.id === 'math302-quiz-1-1');
      const q = quiz!.questions.find(q => q.id === 'math302-q2');

      expect(q!.correctAnswer).toBe('y = e^(x²)');
    });
  });
});

describe('Question type validation', () => {
  it('all multiple_choice questions have options', () => {
    const allQuizzes = [
      ...loadQuizzes('topic-1'),
      ...loadQuizzes('topic-2'),
    ];

    for (const quiz of allQuizzes) {
      for (const question of quiz.questions) {
        if (question.type === 'multiple_choice') {
          expect(
            question.options,
            `Question ${question.id} is multiple_choice but missing options`
          ).toBeDefined();
          expect(
            question.options!.length,
            `Question ${question.id} should have at least 2 options`
          ).toBeGreaterThanOrEqual(2);
        }
      }
    }
  });

  it('all multiple_choice questions have valid correctAnswer', () => {
    const allQuizzes = [
      ...loadQuizzes('topic-1'),
      ...loadQuizzes('topic-2'),
    ];

    for (const quiz of allQuizzes) {
      for (const question of quiz.questions) {
        if (question.type === 'multiple_choice' && question.options) {
          const correctAnswer = question.correctAnswer;

          // correctAnswer should be either a valid index or a string matching an option
          if (typeof correctAnswer === 'number') {
            expect(
              correctAnswer,
              `Question ${question.id} has invalid index ${correctAnswer}`
            ).toBeGreaterThanOrEqual(0);
            expect(
              correctAnswer,
              `Question ${question.id} has index ${correctAnswer} exceeding options length`
            ).toBeLessThan(question.options.length);
          } else if (typeof correctAnswer === 'string') {
            expect(
              question.options.includes(correctAnswer),
              `Question ${question.id} correctAnswer "${correctAnswer}" not found in options`
            ).toBe(true);
          }
        }
      }
    }
  });

  it('no duplicate options in any question', () => {
    const allQuizzes = [
      ...loadQuizzes('topic-1'),
      ...loadQuizzes('topic-2'),
    ];

    for (const quiz of allQuizzes) {
      for (const question of quiz.questions) {
        if (question.options) {
          const uniqueOptions = new Set(question.options);
          expect(
            uniqueOptions.size,
            `Question ${question.id} has duplicate options`
          ).toBe(question.options.length);
        }
      }
    }
  });
});
