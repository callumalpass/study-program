/**
 * Math204 Quiz Fix Validation Tests
 *
 * Tests to validate the fix for the problematic fill_blank question
 * that was converted to multiple choice for better usability.
 */

import { describe, it, expect } from 'vitest';
import { checkAnswer, getCorrectOptionIndex } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

// Import the actual quiz data
import quizzes from '../src/subjects/math204/content/topic-2/quizzes.json';

/** Helper to get the correct answer text for a multiple choice question */
function getCorrectAnswerText(q: QuizQuestion): string {
  if (typeof q.correctAnswer === 'number' && q.options) {
    return q.options[q.correctAnswer];
  }
  return String(q.correctAnswer);
}

describe('Math204 Topic 2 Quiz Fix Validation', () => {
  describe('math204-q2c-5 (average value formula question)', () => {
    // Find the specific quiz and question
    const quiz2c = quizzes.find(q => q.id === 'math204-quiz-2c');
    const question = quiz2c?.questions.find(q => q.id === 'math204-q2c-5') as QuizQuestion;

    it('should exist in the quiz data', () => {
      expect(quiz2c).toBeDefined();
      expect(question).toBeDefined();
    });

    it('should be a multiple_choice question (not fill_blank)', () => {
      expect(question.type).toBe('multiple_choice');
    });

    it('should have 4 options', () => {
      expect(question.options).toBeDefined();
      expect(question.options).toHaveLength(4);
    });

    it('should have the integral as the correct answer', () => {
      // The correct answer should be the integral formula, regardless of position
      expect(getCorrectAnswerText(question)).toContain('\\int_a^b f(x)');
    });

    it('should have the integral option containing the correct formula', () => {
      // One of the options should contain the integral formula
      expect(question.options?.some(opt => opt.includes('\\int_a^b f(x)'))).toBe(true);
    });

    it('should have plausible distractor options', () => {
      const options = question.options || [];
      // Should have these distractor concepts somewhere in the options
      expect(options.some(opt => opt.includes('f(b) - f(a)'))).toBe(true);
      expect(options.some(opt => opt.includes('\\frac{f(a) + f(b)}{2}'))).toBe(true);
      expect(options.some(opt => opt.includes("f'(x)"))).toBe(true);
    });

    it('should correctly validate the right answer', () => {
      // checkAnswer should return true for the correct index
      expect(checkAnswer(question, question.correctAnswer as number)).toBe(true);
    });

    it('should reject incorrect answers', () => {
      const correctIndex = question.correctAnswer as number;
      [0, 1, 2, 3].forEach(idx => {
        if (idx !== correctIndex) {
          expect(checkAnswer(question, idx)).toBe(false);
        }
      });
    });

    it('should have an explanation that explains the concept', () => {
      expect(question.explanation).toBeDefined();
      expect(question.explanation.length).toBeGreaterThan(50);
      expect(question.explanation).toContain('Average value');
    });

    it('should have a clear prompt asking about the formula', () => {
      expect(question.prompt).toContain('average value');
      expect(question.prompt).toContain('$\\frac{1}{b-a}$');
    });
  });

  describe('quiz structure integrity', () => {
    const quiz2c = quizzes.find(q => q.id === 'math204-quiz-2c');

    it('should maintain 5 questions in the quiz', () => {
      expect(quiz2c?.questions).toHaveLength(5);
    });

    it('should have all questions with valid types', () => {
      quiz2c?.questions.forEach(q => {
        expect(['multiple_choice', 'true_false', 'fill_blank', 'code_output', 'coding', 'written']).toContain(q.type);
      });
    });

    it('should have all questions with explanations', () => {
      quiz2c?.questions.forEach(q => {
        expect(q.explanation).toBeDefined();
        expect(q.explanation.length).toBeGreaterThan(0);
      });
    });

    it('should have valid correctAnswer for all multiple choice questions', () => {
      quiz2c?.questions.forEach(q => {
        if (q.type === 'multiple_choice') {
          const index = getCorrectOptionIndex(q as QuizQuestion);
          expect(index).toBeGreaterThanOrEqual(0);
          expect(index).toBeLessThan(q.options?.length || 0);
        }
      });
    });
  });

  describe('fill_blank answer length validation', () => {
    // Ensure no fill_blank questions have overly long answers
    const allQuestions = quizzes.flatMap(q => q.questions);
    const fillBlankQuestions = allQuestions.filter(q => q.type === 'fill_blank');

    it('should not have fill_blank questions with answers > 30 characters', () => {
      fillBlankQuestions.forEach(q => {
        const answer = String(q.correctAnswer);
        expect(answer.length, `Question ${q.id} has answer "${answer}" (${answer.length} chars)`).toBeLessThanOrEqual(30);
      });
    });

    it('should report fill_blank statistics', () => {
      const lengths = fillBlankQuestions.map(q => String(q.correctAnswer).length);
      if (lengths.length > 0) {
        const max = Math.max(...lengths);
        const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
        console.log(`Math204 topic-2 fill_blank stats: count=${fillBlankQuestions.length}, max_length=${max}, avg_length=${avg.toFixed(1)}`);
      }
    });
  });
});

describe('Quiz Content Quality Checks', () => {
  describe('question prompt quality', () => {
    const allQuestions = quizzes.flatMap(q => q.questions);

    it('should have prompts that end with question mark or colon', () => {
      allQuestions.forEach(q => {
        const endsWithPunctuation = q.prompt.endsWith('?') ||
                                     q.prompt.endsWith(':') ||
                                     q.prompt.endsWith('.') ||
                                     q.prompt.includes('____'); // fill_blank with blank indicator
        expect(endsWithPunctuation, `Question ${q.id} prompt doesn't end with proper punctuation`).toBe(true);
      });
    });

    it('should have prompts longer than 20 characters', () => {
      allQuestions.forEach(q => {
        expect(q.prompt.length, `Question ${q.id} has very short prompt`).toBeGreaterThan(20);
      });
    });
  });

  describe('multiple choice option quality', () => {
    const multipleChoiceQuestions = quizzes
      .flatMap(q => q.questions)
      .filter(q => q.type === 'multiple_choice');

    it('should have 4 options for each multiple choice question', () => {
      multipleChoiceQuestions.forEach(q => {
        expect(q.options?.length, `Question ${q.id} should have 4 options`).toBe(4);
      });
    });

    it('should not have duplicate options', () => {
      multipleChoiceQuestions.forEach(q => {
        const options = q.options || [];
        const uniqueOptions = new Set(options);
        expect(uniqueOptions.size, `Question ${q.id} has duplicate options`).toBe(options.length);
      });
    });

    it('should have correct answer index within bounds', () => {
      multipleChoiceQuestions.forEach(q => {
        if (typeof q.correctAnswer === 'number') {
          expect(q.correctAnswer, `Question ${q.id} has out-of-bounds correctAnswer`).toBeGreaterThanOrEqual(0);
          expect(q.correctAnswer, `Question ${q.id} has out-of-bounds correctAnswer`).toBeLessThan(q.options?.length || 0);
        }
      });
    });
  });
});
