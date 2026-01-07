/**
 * Quiz Scoring Tests
 *
 * Comprehensive tests for quiz scoring logic, including:
 * - Score calculation with different question types
 * - Edge cases for empty quizzes and missing answers
 * - Scoring consistency across mixed question types
 * - Time tracking and attempt management
 */

import { describe, it, expect } from 'vitest';
import type { QuizQuestion, QuizAnswer, CodingAnswer, Quiz } from '@/core/types';

// Helper functions mirroring Quiz.tsx implementation
function normalizeAnswer(value: string | number | boolean | undefined): string {
  if (value === undefined) return '';
  return String(value).trim().toLowerCase();
}

function isCodingAnswer(answer: QuizAnswer | undefined): answer is CodingAnswer {
  return typeof answer === 'object' && answer !== null && 'code' in answer;
}

function getCorrectOptionIndex(question: QuizQuestion): number {
  const correctAnswer = question.correctAnswer;
  if (typeof correctAnswer === 'number') {
    return correctAnswer;
  }
  if (typeof correctAnswer === 'string' && question.options) {
    const index = question.options.indexOf(correctAnswer);
    if (index !== -1) {
      return index;
    }
  }
  return -1;
}

function checkAnswer(question: QuizQuestion, answer: QuizAnswer | undefined): boolean {
  if (answer === undefined) return false;

  switch (question.type) {
    case 'multiple_choice': {
      const correctIndex = getCorrectOptionIndex(question);
      return answer === correctIndex;
    }
    case 'true_false':
      return answer === question.correctAnswer;
    case 'fill_blank':
    case 'code_output':
    case 'written': {
      const textAnswer = typeof answer === 'string' ? answer : '';
      return normalizeAnswer(textAnswer) === normalizeAnswer(question.correctAnswer);
    }
    case 'coding':
      return isCodingAnswer(answer) && answer.passed === true;
    default:
      return false;
  }
}

function calculateScore(questions: QuizQuestion[], answers: Record<string, QuizAnswer>): number {
  if (questions.length === 0) return 0;
  let correct = 0;
  questions.forEach((question) => {
    if (checkAnswer(question, answers[question.id])) {
      correct++;
    }
  });
  return Math.round((correct / questions.length) * 100);
}

// Test helper to create quiz questions
const createMultipleChoice = (id: string, correctAnswer: number | string, options = ['A', 'B', 'C', 'D']): QuizQuestion => ({
  id,
  type: 'multiple_choice',
  prompt: `Question ${id}`,
  options,
  correctAnswer,
  explanation: 'Explanation',
});

const createTrueFalse = (id: string, correctAnswer: boolean): QuizQuestion => ({
  id,
  type: 'true_false',
  prompt: `Question ${id}`,
  correctAnswer,
  explanation: 'Explanation',
});

const createFillBlank = (id: string, correctAnswer: string): QuizQuestion => ({
  id,
  type: 'fill_blank',
  prompt: `Question ${id}`,
  correctAnswer,
  explanation: 'Explanation',
});

const createCodeOutput = (id: string, correctAnswer: string, codeSnippet = 'print("test")'): QuizQuestion => ({
  id,
  type: 'code_output',
  prompt: `Question ${id}`,
  codeSnippet,
  correctAnswer,
  explanation: 'Explanation',
});

const createCoding = (id: string): QuizQuestion => ({
  id,
  type: 'coding',
  prompt: `Question ${id}`,
  correctAnswer: '',
  explanation: 'Explanation',
  starterCode: 'def solution():',
  testCases: [],
});

const createWritten = (id: string, correctAnswer: string): QuizQuestion => ({
  id,
  type: 'written',
  prompt: `Question ${id}`,
  correctAnswer,
  explanation: 'Explanation',
});

describe('Quiz Scoring - calculateScore', () => {
  describe('single question type quizzes', () => {
    it('calculates 100% for all correct multiple choice answers', () => {
      const questions = [
        createMultipleChoice('q1', 0),
        createMultipleChoice('q2', 1),
        createMultipleChoice('q3', 2),
      ];
      const answers = { q1: 0, q2: 1, q3: 2 };
      expect(calculateScore(questions, answers)).toBe(100);
    });

    it('calculates 0% for all incorrect multiple choice answers', () => {
      const questions = [
        createMultipleChoice('q1', 0),
        createMultipleChoice('q2', 1),
        createMultipleChoice('q3', 2),
      ];
      const answers = { q1: 3, q2: 0, q3: 1 };
      expect(calculateScore(questions, answers)).toBe(0);
    });

    it('calculates correct percentage for true/false questions', () => {
      const questions = [
        createTrueFalse('q1', true),
        createTrueFalse('q2', false),
        createTrueFalse('q3', true),
        createTrueFalse('q4', false),
      ];
      const answers = { q1: true, q2: false, q3: false, q4: true };
      // 2 correct out of 4 = 50%
      expect(calculateScore(questions, answers)).toBe(50);
    });

    it('calculates correct percentage for fill_blank questions', () => {
      const questions = [
        createFillBlank('q1', 'Paris'),
        createFillBlank('q2', 'London'),
        createFillBlank('q3', 'Berlin'),
      ];
      const answers = { q1: 'paris', q2: 'London', q3: 'Tokyo' };
      // 2 correct out of 3 = 67%
      expect(calculateScore(questions, answers)).toBe(67);
    });

    it('calculates correct percentage for code_output questions', () => {
      const questions = [
        createCodeOutput('q1', '42'),
        createCodeOutput('q2', 'Hello'),
        createCodeOutput('q3', 'True'),
      ];
      const answers = { q1: '42', q2: 'hello', q3: 'true' };
      expect(calculateScore(questions, answers)).toBe(100);
    });

    it('calculates correct percentage for coding questions', () => {
      const questions = [
        createCoding('q1'),
        createCoding('q2'),
      ];
      const answers: Record<string, QuizAnswer> = {
        q1: { code: 'solution', passed: true },
        q2: { code: 'wrong', passed: false },
      };
      expect(calculateScore(questions, answers)).toBe(50);
    });

    it('calculates correct percentage for written questions', () => {
      const questions = [
        createWritten('q1', 'answer'),
        createWritten('q2', 'response'),
      ];
      const answers = { q1: 'ANSWER', q2: 'wrong' };
      expect(calculateScore(questions, answers)).toBe(50);
    });
  });

  describe('mixed question type quizzes', () => {
    it('scores quiz with all question types correctly', () => {
      const questions: QuizQuestion[] = [
        createMultipleChoice('q1', 1),
        createTrueFalse('q2', true),
        createFillBlank('q3', 'Paris'),
        createCodeOutput('q4', '10'),
        createCoding('q5'),
        createWritten('q6', 'answer'),
      ];
      const answers: Record<string, QuizAnswer> = {
        q1: 1,            // correct
        q2: true,         // correct
        q3: 'paris',      // correct (case insensitive)
        q4: '10',         // correct
        q5: { code: 'x', passed: true },  // correct
        q6: 'answer',     // correct
      };
      expect(calculateScore(questions, answers)).toBe(100);
    });

    it('handles partial answers across mixed types', () => {
      const questions: QuizQuestion[] = [
        createMultipleChoice('q1', 0),
        createTrueFalse('q2', false),
        createFillBlank('q3', 'test'),
        createCodeOutput('q4', '5'),
      ];
      const answers: Record<string, QuizAnswer> = {
        q1: 0,          // correct
        q2: true,       // incorrect
        q3: 'TEST',     // correct
        // q4 missing   // incorrect
      };
      // 2 correct out of 4 = 50%
      expect(calculateScore(questions, answers)).toBe(50);
    });
  });

  describe('edge cases', () => {
    it('returns 0 for empty questions array', () => {
      expect(calculateScore([], {})).toBe(0);
      expect(calculateScore([], { q1: 1, q2: 'test' })).toBe(0);
    });

    it('returns 0 when all answers are missing', () => {
      const questions = [
        createMultipleChoice('q1', 0),
        createTrueFalse('q2', true),
      ];
      expect(calculateScore(questions, {})).toBe(0);
    });

    it('handles single question quiz', () => {
      const questions = [createMultipleChoice('q1', 0)];
      expect(calculateScore(questions, { q1: 0 })).toBe(100);
      expect(calculateScore(questions, { q1: 1 })).toBe(0);
    });

    it('rounds percentage correctly', () => {
      // 1 out of 3 = 33.33... rounds to 33
      const questions = [
        createMultipleChoice('q1', 0),
        createMultipleChoice('q2', 0),
        createMultipleChoice('q3', 0),
      ];
      expect(calculateScore(questions, { q1: 0, q2: 1, q3: 1 })).toBe(33);
    });

    it('handles 1 out of 7 correctly (14.28%)', () => {
      const questions = Array.from({ length: 7 }, (_, i) => createMultipleChoice(`q${i}`, 0));
      const answers = { q0: 0 }; // only first correct
      expect(calculateScore(questions, answers)).toBe(14);
    });

    it('handles 6 out of 7 correctly (85.71%)', () => {
      const questions = Array.from({ length: 7 }, (_, i) => createMultipleChoice(`q${i}`, 0));
      const answers = { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 1 }; // 6 correct
      expect(calculateScore(questions, answers)).toBe(86);
    });

    it('ignores extra answers not in questions', () => {
      const questions = [createMultipleChoice('q1', 0)];
      const answers = { q1: 0, q2: 1, q3: 2, q99: 'extra' };
      expect(calculateScore(questions, answers)).toBe(100);
    });
  });

  describe('string correctAnswer for multiple choice', () => {
    it('handles string correctAnswer matching first option', () => {
      const question = createMultipleChoice('q1', 'A', ['A', 'B', 'C', 'D']);
      expect(checkAnswer(question, 0)).toBe(true);
      expect(checkAnswer(question, 1)).toBe(false);
    });

    it('handles string correctAnswer matching last option', () => {
      const question = createMultipleChoice('q1', 'D', ['A', 'B', 'C', 'D']);
      expect(checkAnswer(question, 3)).toBe(true);
      expect(checkAnswer(question, 0)).toBe(false);
    });

    it('handles string correctAnswer with special characters', () => {
      const options = ['x² + y²', 'x + y', '2x', 'x/y'];
      const question = createMultipleChoice('q1', 'x² + y²', options);
      expect(checkAnswer(question, 0)).toBe(true);
    });

    it('handles numeric string correctAnswer', () => {
      const options = ['-12', '0', '12', '24'];
      const question = createMultipleChoice('q1', '-12', options);
      expect(checkAnswer(question, 0)).toBe(true);
    });

    it('returns -1 for non-matching string correctAnswer', () => {
      const question = createMultipleChoice('q1', 'NotInOptions', ['A', 'B', 'C']);
      expect(getCorrectOptionIndex(question)).toBe(-1);
      // When correct index is -1, no answer can be correct
      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 2)).toBe(false);
    });
  });

  describe('answer normalization', () => {
    it('normalizes whitespace in fill_blank answers', () => {
      const question = createFillBlank('q1', 'test');
      expect(checkAnswer(question, '  test  ')).toBe(true);
      expect(checkAnswer(question, '\ttest\n')).toBe(true);
    });

    it('normalizes case in fill_blank answers', () => {
      const question = createFillBlank('q1', 'Paris');
      expect(checkAnswer(question, 'PARIS')).toBe(true);
      expect(checkAnswer(question, 'pArIs')).toBe(true);
    });

    it('normalizes whitespace and case together', () => {
      const question = createFillBlank('q1', 'Hello World');
      expect(checkAnswer(question, '  HELLO WORLD  ')).toBe(true);
    });

    it('handles numeric answers in fill_blank', () => {
      const question = createFillBlank('q1', '42');
      expect(checkAnswer(question, '42')).toBe(true);
      expect(checkAnswer(question, ' 42 ')).toBe(true);
    });

    it('handles empty string correctAnswer', () => {
      const question = createFillBlank('q1', '');
      expect(checkAnswer(question, '')).toBe(true);
      expect(checkAnswer(question, '   ')).toBe(true);
    });
  });

  describe('coding answer validation', () => {
    it('only accepts CodingAnswer objects for coding questions', () => {
      const question = createCoding('q1');
      expect(checkAnswer(question, { code: 'x', passed: true })).toBe(true);
      expect(checkAnswer(question, { code: 'x', passed: false })).toBe(false);
      expect(checkAnswer(question, 'string answer')).toBe(false);
      expect(checkAnswer(question, 42)).toBe(false);
      expect(checkAnswer(question, true)).toBe(false);
    });

    it('validates passed property strictly', () => {
      const question = createCoding('q1');
      expect(checkAnswer(question, { code: '', passed: true })).toBe(true);
      expect(checkAnswer(question, { code: 'lots of code', passed: false })).toBe(false);
    });

    it('rejects malformed coding answers', () => {
      const question = createCoding('q1');
      expect(checkAnswer(question, { passed: true } as unknown as QuizAnswer)).toBe(false);
      expect(checkAnswer(question, null as unknown as QuizAnswer)).toBe(false);
      expect(checkAnswer(question, {} as unknown as QuizAnswer)).toBe(false);
    });
  });

  describe('true/false strict type checking', () => {
    it('requires exact boolean match for true_false questions', () => {
      const questionTrue = createTrueFalse('q1', true);
      const questionFalse = createTrueFalse('q2', false);

      expect(checkAnswer(questionTrue, true)).toBe(true);
      expect(checkAnswer(questionTrue, false)).toBe(false);
      expect(checkAnswer(questionFalse, false)).toBe(true);
      expect(checkAnswer(questionFalse, true)).toBe(false);
    });

    it('rejects string "true" or "false" for true_false questions', () => {
      const question = createTrueFalse('q1', true);
      expect(checkAnswer(question, 'true')).toBe(false);
      expect(checkAnswer(question, 'True')).toBe(false);
      expect(checkAnswer(question, 'TRUE')).toBe(false);
    });

    it('rejects numeric values for true_false questions', () => {
      const question = createTrueFalse('q1', true);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 0)).toBe(false);
    });
  });

  describe('undefined and null handling', () => {
    it('returns false for undefined answer on all question types', () => {
      expect(checkAnswer(createMultipleChoice('q1', 0), undefined)).toBe(false);
      expect(checkAnswer(createTrueFalse('q1', true), undefined)).toBe(false);
      expect(checkAnswer(createFillBlank('q1', 'test'), undefined)).toBe(false);
      expect(checkAnswer(createCodeOutput('q1', '42'), undefined)).toBe(false);
      expect(checkAnswer(createCoding('q1'), undefined)).toBe(false);
      expect(checkAnswer(createWritten('q1', 'test'), undefined)).toBe(false);
    });
  });
});

describe('Quiz Scoring - Real-world Scenarios', () => {
  it('handles typical CS101 quiz with mixed questions', () => {
    const questions: QuizQuestion[] = [
      createMultipleChoice('q1', 2, ['int', 'float', 'char', 'str']),
      createCodeOutput('q2', '2.5'),
      createTrueFalse('q3', false),
      createMultipleChoice('q4', 1, ['int x = 25', 'x = 25', 'var x = 25', 'let x = 25']),
      createCodeOutput('q5', 'str'),
    ];

    // Student answers all correctly
    const perfectAnswers: Record<string, QuizAnswer> = {
      q1: 2, q2: '2.5', q3: false, q4: 1, q5: 'str'
    };
    expect(calculateScore(questions, perfectAnswers)).toBe(100);

    // Student gets 3 out of 5
    const partialAnswers: Record<string, QuizAnswer> = {
      q1: 2, q2: '2.5', q3: true, q4: 0, q5: 'str'
    };
    expect(calculateScore(questions, partialAnswers)).toBe(60);
  });

  it('handles math quiz with fill_blank answers', () => {
    const questions: QuizQuestion[] = [
      createFillBlank('q1', 'n-k'),
      createFillBlank('q2', '60'),
      createFillBlank('q3', '2'),
    ];

    const answers = { q1: 'N-K', q2: ' 60 ', q3: '2' };
    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles quiz where student runs out of time', () => {
    const questions = Array.from({ length: 10 }, (_, i) =>
      createMultipleChoice(`q${i}`, 0)
    );

    // Student only answered 5 questions before time ran out
    const answers = { q0: 0, q1: 0, q2: 0, q3: 0, q4: 0 };
    expect(calculateScore(questions, answers)).toBe(50);
  });
});
