/**
 * Quiz Answer Edge Cases Tests
 *
 * Tests for edge cases in quiz answer checking, including:
 * - Invalid correctAnswer configurations
 * - Boundary conditions for option indices
 * - Case sensitivity and whitespace handling
 * - Numeric vs string answer comparisons
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  getCorrectOptionIndex,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer } from '../src/core/types';

// Test helper factories
function createMultipleChoiceQuestion(
  id: string,
  options: string[],
  correctAnswer: number | string
): QuizQuestion {
  return {
    id,
    type: 'multiple_choice',
    prompt: `Question ${id}`,
    options,
    correctAnswer,
    explanation: 'Test explanation',
  };
}

function createCodeOutputQuestion(
  id: string,
  correctAnswer: string
): QuizQuestion {
  return {
    id,
    type: 'code_output',
    prompt: `Question ${id}`,
    codeSnippet: 'print("test")',
    correctAnswer,
    explanation: 'Test explanation',
  };
}

function createFillBlankQuestion(
  id: string,
  correctAnswer: string
): QuizQuestion {
  return {
    id,
    type: 'fill_blank',
    prompt: `Question ${id}`,
    correctAnswer,
    explanation: 'Test explanation',
  };
}

describe('getCorrectOptionIndex edge cases', () => {
  describe('valid index configurations', () => {
    it('returns index 0 for first option', () => {
      const question = createMultipleChoiceQuestion('q1', ['A', 'B', 'C', 'D'], 0);
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('returns last valid index', () => {
      const question = createMultipleChoiceQuestion('q1', ['A', 'B', 'C', 'D'], 3);
      expect(getCorrectOptionIndex(question)).toBe(3);
    });

    it('handles questions with only 2 options', () => {
      const question = createMultipleChoiceQuestion('q1', ['Yes', 'No'], 1);
      expect(getCorrectOptionIndex(question)).toBe(1);
    });

    it('handles questions with many options', () => {
      const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const question = createMultipleChoiceQuestion('q1', options, 7);
      expect(getCorrectOptionIndex(question)).toBe(7);
    });
  });

  describe('string correctAnswer lookup', () => {
    it('finds exact string match in options', () => {
      const options = ['Option A', 'Option B', 'Option C'];
      const question = createMultipleChoiceQuestion('q1', options, 'Option B');
      expect(getCorrectOptionIndex(question)).toBe(1);
    });

    it('is case-sensitive for string lookups', () => {
      const options = ['hello', 'HELLO', 'Hello'];
      const question = createMultipleChoiceQuestion('q1', options, 'HELLO');
      expect(getCorrectOptionIndex(question)).toBe(1);
    });

    it('does not match partial strings', () => {
      const options = ['Hello World', 'Hello', 'World'];
      const question = createMultipleChoiceQuestion('q1', options, 'Hello');
      expect(getCorrectOptionIndex(question)).toBe(1);
    });

    it('returns -1 for string not in options', () => {
      const options = ['A', 'B', 'C'];
      const question = createMultipleChoiceQuestion('q1', options, 'D');
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('handles options with special characters', () => {
      const options = ['x² + y²', 'x + y', '√x', 'x/y'];
      const question = createMultipleChoiceQuestion('q1', options, 'x² + y²');
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('handles options with code snippets', () => {
      const options = ['print("hello")', 'console.log()', 'echo "hi"'];
      const question = createMultipleChoiceQuestion('q1', options, 'print("hello")');
      expect(getCorrectOptionIndex(question)).toBe(0);
    });
  });

  describe('edge cases and invalid configurations', () => {
    it('returns -1 for question without options', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        correctAnswer: 'A',
        explanation: 'Test',
      };
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 for empty options array with string correctAnswer', () => {
      const question = createMultipleChoiceQuestion('q1', [], 'A');
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns boolean as number when passed boolean correctAnswer', () => {
      // This tests actual behavior even though booleans shouldn't be used for multiple_choice
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B'],
        correctAnswer: true as unknown as number,
        explanation: 'Test',
      };
      // Boolean `true` is not a number or string, so falls through to -1
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 for out-of-bounds numeric index', () => {
      // The function validates bounds and returns -1 for invalid indices
      const question = createMultipleChoiceQuestion('q1', ['A', 'B'], 99);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 for negative numeric index', () => {
      const question = createMultipleChoiceQuestion('q1', ['A', 'B'], -1);
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });
  });
});

describe('checkAnswer edge cases', () => {
  describe('multiple_choice with invalid configurations', () => {
    it('returns false when correctIndex is -1 and answer is -1', () => {
      // If correctAnswer doesn't match any option, correctIndex is -1
      // The function correctly returns false because no valid answer exists
      const question = createMultipleChoiceQuestion('q1', ['A', 'B', 'C'], 'NotInOptions');
      expect(checkAnswer(question, -1)).toBe(false);
    });

    it('returns false for valid answer when correctAnswer is invalid', () => {
      const question = createMultipleChoiceQuestion('q1', ['A', 'B', 'C'], 'NotInOptions');
      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 2)).toBe(false);
    });
  });

  describe('code_output whitespace handling', () => {
    it('ignores leading and trailing whitespace in both answer and correctAnswer', () => {
      const question = createCodeOutputQuestion('q1', '  42  ');
      expect(checkAnswer(question, '42')).toBe(true);
      expect(checkAnswer(question, '  42')).toBe(true);
      expect(checkAnswer(question, '42  ')).toBe(true);
    });

    it('preserves internal whitespace', () => {
      const question = createCodeOutputQuestion('q1', 'hello world');
      expect(checkAnswer(question, 'hello world')).toBe(true);
      expect(checkAnswer(question, 'helloworld')).toBe(false);
    });

    it('handles multi-line output', () => {
      const question = createCodeOutputQuestion('q1', 'line1\nline2');
      expect(checkAnswer(question, 'line1\nline2')).toBe(true);
      expect(checkAnswer(question, 'LINE1\nLINE2')).toBe(true); // case-insensitive
    });

    it('handles tab characters', () => {
      const question = createCodeOutputQuestion('q1', 'a\tb');
      expect(checkAnswer(question, 'a\tb')).toBe(true);
      expect(checkAnswer(question, 'a    b')).toBe(false); // tabs vs spaces differ
    });
  });

  describe('fill_blank edge cases', () => {
    it('handles numeric string answers', () => {
      const question = createFillBlankQuestion('q1', '42');
      expect(checkAnswer(question, '42')).toBe(true);
      expect(checkAnswer(question, ' 42 ')).toBe(true);
    });

    it('handles empty string correctAnswer', () => {
      const question = createFillBlankQuestion('q1', '');
      expect(checkAnswer(question, '')).toBe(true);
      expect(checkAnswer(question, '   ')).toBe(true); // whitespace-only normalizes to empty
    });

    it('handles answers with special characters', () => {
      const question = createFillBlankQuestion('q1', 'O(n²)');
      expect(checkAnswer(question, 'O(n²)')).toBe(true);
      expect(checkAnswer(question, 'o(n²)')).toBe(true); // case-insensitive
    });

    it('accepts numeric answers for fill_blank when value matches', () => {
      const question = createFillBlankQuestion('q1', '42');
      // Numeric answers are normalized to strings for comparison (more robust)
      expect(checkAnswer(question, 42 as unknown as string)).toBe(true);
    });
  });

  describe('true_false strict typing', () => {
    const createTrueFalseQuestion = (id: string, correct: boolean): QuizQuestion => ({
      id,
      type: 'true_false',
      prompt: `Question ${id}`,
      correctAnswer: correct,
      explanation: 'Test',
    });

    it('accepts only exact boolean match for true', () => {
      const question = createTrueFalseQuestion('q1', true);
      expect(checkAnswer(question, true)).toBe(true);
      expect(checkAnswer(question, false)).toBe(false);
    });

    it('accepts only exact boolean match for false', () => {
      const question = createTrueFalseQuestion('q1', false);
      expect(checkAnswer(question, false)).toBe(true);
      expect(checkAnswer(question, true)).toBe(false);
    });

    it('rejects string representations of boolean', () => {
      const question = createTrueFalseQuestion('q1', true);
      expect(checkAnswer(question, 'true')).toBe(false);
      expect(checkAnswer(question, 'True')).toBe(false);
      expect(checkAnswer(question, 'TRUE')).toBe(false);
    });

    it('rejects numeric truthy/falsy values', () => {
      const question = createTrueFalseQuestion('q1', true);
      expect(checkAnswer(question, 1)).toBe(false);
      expect(checkAnswer(question, 0)).toBe(false);
    });
  });
});

describe('calculateScore edge cases', () => {
  it('handles quiz with single question', () => {
    const questions = [createMultipleChoiceQuestion('q1', ['A', 'B'], 0)];
    expect(calculateScore(questions, { q1: 0 })).toBe(100);
    expect(calculateScore(questions, { q1: 1 })).toBe(0);
  });

  it('rounds scores correctly', () => {
    const questions = [
      createMultipleChoiceQuestion('q1', ['A', 'B'], 0),
      createMultipleChoiceQuestion('q2', ['A', 'B'], 0),
      createMultipleChoiceQuestion('q3', ['A', 'B'], 0),
    ];
    // 1 out of 3 = 33.33...% rounds to 33
    expect(calculateScore(questions, { q1: 0 })).toBe(33);
    // 2 out of 3 = 66.66...% rounds to 67
    expect(calculateScore(questions, { q1: 0, q2: 0 })).toBe(67);
  });

  it('handles all undefined answers as 0%', () => {
    const questions = [
      createMultipleChoiceQuestion('q1', ['A', 'B'], 0),
      createMultipleChoiceQuestion('q2', ['A', 'B'], 0),
    ];
    expect(calculateScore(questions, {})).toBe(0);
  });

  it('handles extra answers not in questions', () => {
    const questions = [createMultipleChoiceQuestion('q1', ['A', 'B'], 0)];
    const answers = { q1: 0, q2: 1, q3: 2, extra: 'value' };
    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles questions array with duplicate IDs', () => {
    // This tests actual behavior - duplicates are counted separately
    const questions = [
      createMultipleChoiceQuestion('q1', ['A', 'B'], 0),
      createMultipleChoiceQuestion('q1', ['A', 'B'], 1), // same ID, different correct answer
    ];
    // If answer is 0, first q1 matches, second doesn't = 50%
    expect(calculateScore(questions, { q1: 0 })).toBe(50);
  });
});

describe('normalizeAnswer comprehensive tests', () => {
  describe('type coercion', () => {
    it('converts number 0 correctly', () => {
      expect(normalizeAnswer(0)).toBe('0');
    });

    it('converts negative numbers', () => {
      expect(normalizeAnswer(-123)).toBe('-123');
    });

    it('converts decimal numbers', () => {
      expect(normalizeAnswer(3.14159)).toBe('3.14159');
    });

    it('converts scientific notation', () => {
      expect(normalizeAnswer(1e10)).toBe('10000000000');
    });

    it('converts boolean true', () => {
      expect(normalizeAnswer(true)).toBe('true');
    });

    it('converts boolean false', () => {
      expect(normalizeAnswer(false)).toBe('false');
    });
  });

  describe('string processing', () => {
    it('lowercases mixed case strings', () => {
      expect(normalizeAnswer('HeLLo WoRLd')).toBe('hello world');
    });

    it('trims various whitespace characters', () => {
      expect(normalizeAnswer('\t\n hello \r\n')).toBe('hello');
    });

    it('handles unicode characters', () => {
      expect(normalizeAnswer('Ñoño')).toBe('ñoño');
    });

    it('handles emoji', () => {
      expect(normalizeAnswer('hello 👋')).toBe('hello 👋');
    });
  });
});

describe('real-world question scenarios', () => {
  it('handles CS exam question with numeric output', () => {
    const question = createCodeOutputQuestion('cs-q1', '42');
    expect(checkAnswer(question, '42')).toBe(true);
    expect(checkAnswer(question, ' 42 ')).toBe(true);
    expect(checkAnswer(question, '042')).toBe(false); // different string
  });

  it('handles math question with formula answer', () => {
    const question = createFillBlankQuestion('math-q1', 'n^2');
    expect(checkAnswer(question, 'n^2')).toBe(true);
    expect(checkAnswer(question, 'N^2')).toBe(true);
    expect(checkAnswer(question, 'n²')).toBe(false); // different character
  });

  it('handles programming question with case-sensitive keyword', () => {
    // Note: Our implementation is case-insensitive, so Python keywords match any case
    const question = createFillBlankQuestion('prog-q1', 'None');
    expect(checkAnswer(question, 'None')).toBe(true);
    expect(checkAnswer(question, 'none')).toBe(true); // case-insensitive
    expect(checkAnswer(question, 'null')).toBe(false);
  });
});
