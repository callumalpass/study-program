/**
 * Quiz Numeric Answer Handling Tests
 *
 * Tests specifically focused on numeric answer edge cases in quiz grading.
 * These scenarios are common in CS and math courses where answers can be
 * numbers entered as strings vs actual numbers, floats vs integers, etc.
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer } from '../src/core/types';

// Test helper factories
function createFillBlankQuestion(
  id: string,
  correctAnswer: string | number
): QuizQuestion {
  return {
    id,
    type: 'fill_blank',
    prompt: `What is the answer?`,
    correctAnswer: String(correctAnswer),
    explanation: 'Test explanation',
  };
}

function createCodeOutputQuestion(
  id: string,
  correctAnswer: string,
  codeSnippet: string = 'print(result)'
): QuizQuestion {
  return {
    id,
    type: 'code_output',
    prompt: 'What is the output?',
    codeSnippet,
    correctAnswer,
    explanation: 'Test explanation',
  };
}

describe('Numeric answer edge cases in fill_blank questions', () => {
  describe('integer comparisons', () => {
    it('matches integer string to integer string', () => {
      const question = createFillBlankQuestion('q1', '42');
      expect(checkAnswer(question, '42')).toBe(true);
    });

    it('matches zero correctly', () => {
      const question = createFillBlankQuestion('q1', '0');
      expect(checkAnswer(question, '0')).toBe(true);
      expect(checkAnswer(question, 0 as unknown as string)).toBe(true);
    });

    it('matches negative integers', () => {
      const question = createFillBlankQuestion('q1', '-5');
      expect(checkAnswer(question, '-5')).toBe(true);
    });

    it('does not match different integers', () => {
      const question = createFillBlankQuestion('q1', '42');
      expect(checkAnswer(question, '43')).toBe(false);
      expect(checkAnswer(question, '41')).toBe(false);
    });
  });

  describe('float comparisons', () => {
    it('matches float string to float string', () => {
      const question = createFillBlankQuestion('q1', '3.14');
      expect(checkAnswer(question, '3.14')).toBe(true);
    });

    it('does not match different floats', () => {
      const question = createFillBlankQuestion('q1', '3.14');
      expect(checkAnswer(question, '3.15')).toBe(false);
      expect(checkAnswer(question, '3.1')).toBe(false);
    });

    it('matches negative floats', () => {
      const question = createFillBlankQuestion('q1', '-2.5');
      expect(checkAnswer(question, '-2.5')).toBe(true);
    });

    it('handles .5 vs 0.5 as different strings', () => {
      // String comparison: ".5" !== "0.5"
      const question = createFillBlankQuestion('q1', '0.5');
      expect(checkAnswer(question, '0.5')).toBe(true);
      expect(checkAnswer(question, '.5')).toBe(false); // different string representation
    });

    it('handles trailing zeros as different strings', () => {
      // String comparison: "3.0" !== "3" and "3.00" !== "3.0"
      const question = createFillBlankQuestion('q1', '3.0');
      expect(checkAnswer(question, '3.0')).toBe(true);
      expect(checkAnswer(question, '3')).toBe(false); // different string
    });
  });

  describe('whitespace handling with numbers', () => {
    it('trims whitespace around numeric answers', () => {
      const question = createFillBlankQuestion('q1', '42');
      expect(checkAnswer(question, '  42  ')).toBe(true);
      expect(checkAnswer(question, '\t42\n')).toBe(true);
    });

    it('does not trim internal whitespace (not applicable for numbers)', () => {
      const question = createFillBlankQuestion('q1', '4 2');
      expect(checkAnswer(question, '4 2')).toBe(true);
      expect(checkAnswer(question, '42')).toBe(false);
    });
  });

  describe('special numeric values', () => {
    it('handles very large numbers as strings', () => {
      const question = createFillBlankQuestion('q1', '1000000000');
      expect(checkAnswer(question, '1000000000')).toBe(true);
      expect(checkAnswer(question, '1,000,000,000')).toBe(false); // different format
    });

    it('handles scientific notation as strings', () => {
      const question = createFillBlankQuestion('q1', '1e10');
      expect(checkAnswer(question, '1e10')).toBe(true);
      expect(checkAnswer(question, '1E10')).toBe(true); // case-insensitive
      expect(checkAnswer(question, '10000000000')).toBe(false); // different string
    });
  });
});

describe('Numeric answer edge cases in code_output questions', () => {
  describe('Python output formatting', () => {
    it('matches print output with newlines stripped by trim', () => {
      // print(42) outputs "42\n", but we normalize which trims
      const question = createCodeOutputQuestion('q1', '42', 'print(42)');
      expect(checkAnswer(question, '42')).toBe(true);
    });

    it('matches boolean output True/False', () => {
      const question = createCodeOutputQuestion('q1', 'True', 'print(True)');
      expect(checkAnswer(question, 'True')).toBe(true);
      expect(checkAnswer(question, 'true')).toBe(true); // case-insensitive
      expect(checkAnswer(question, 'TRUE')).toBe(true);
    });

    it('matches None output', () => {
      const question = createCodeOutputQuestion('q1', 'None', 'print(None)');
      expect(checkAnswer(question, 'None')).toBe(true);
      expect(checkAnswer(question, 'none')).toBe(true); // case-insensitive
    });

    it('handles list output', () => {
      const question = createCodeOutputQuestion('q1', '[1, 2, 3]', 'print([1, 2, 3])');
      expect(checkAnswer(question, '[1, 2, 3]')).toBe(true);
      expect(checkAnswer(question, '[1,2,3]')).toBe(false); // spacing matters
    });

    it('handles tuple output', () => {
      const question = createCodeOutputQuestion('q1', '(1, 2)', 'print((1, 2))');
      expect(checkAnswer(question, '(1, 2)')).toBe(true);
    });

    it('handles dict output', () => {
      const question = createCodeOutputQuestion('q1', "{'a': 1}", "print({'a': 1})");
      expect(checkAnswer(question, "{'a': 1}")).toBe(true);
    });
  });

  describe('multi-line output', () => {
    it('matches multiple print statements', () => {
      const question = createCodeOutputQuestion(
        'q1',
        '1\n2\n3',
        'for i in range(1, 4):\n    print(i)'
      );
      expect(checkAnswer(question, '1\n2\n3')).toBe(true);
    });

    it('is case-insensitive for multi-line output', () => {
      const question = createCodeOutputQuestion('q1', 'Hello\nWorld', 'print("Hello")\nprint("World")');
      expect(checkAnswer(question, 'hello\nworld')).toBe(true);
      expect(checkAnswer(question, 'HELLO\nWORLD')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('handles empty output', () => {
      const question = createCodeOutputQuestion('q1', '', 'pass');
      expect(checkAnswer(question, '')).toBe(true);
      expect(checkAnswer(question, '   ')).toBe(true); // whitespace normalizes to empty
    });

    it('handles output with only whitespace in correct answer', () => {
      const question = createCodeOutputQuestion('q1', '  ', 'print("  ")');
      expect(checkAnswer(question, '')).toBe(true); // normalized
      expect(checkAnswer(question, '  ')).toBe(true);
    });
  });
});

describe('normalizeAnswer numeric type handling', () => {
  it('converts number type to string', () => {
    expect(normalizeAnswer(42)).toBe('42');
    expect(normalizeAnswer(0)).toBe('0');
    expect(normalizeAnswer(-10)).toBe('-10');
    expect(normalizeAnswer(3.14)).toBe('3.14');
  });

  it('handles JavaScript numeric edge cases', () => {
    expect(normalizeAnswer(Infinity)).toBe('infinity');
    expect(normalizeAnswer(-Infinity)).toBe('-infinity');
    expect(normalizeAnswer(NaN)).toBe('nan');
  });

  it('handles very small decimals', () => {
    expect(normalizeAnswer(0.0001)).toBe('0.0001');
    expect(normalizeAnswer(1e-10)).toBe('1e-10');
  });

  it('handles integers stored as floats', () => {
    expect(normalizeAnswer(3.0)).toBe('3'); // JavaScript converts 3.0 to 3
  });
});

describe('calculateScore with numeric answers', () => {
  it('scores fill_blank questions with numeric answers correctly', () => {
    const questions: QuizQuestion[] = [
      createFillBlankQuestion('q1', '42'),
      createFillBlankQuestion('q2', '3.14'),
      createFillBlankQuestion('q3', '-5'),
    ];

    const answers: Record<string, QuizAnswer> = {
      q1: '42',
      q2: '3.14',
      q3: '-5',
    };

    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('scores partial numeric answers correctly', () => {
    const questions: QuizQuestion[] = [
      createFillBlankQuestion('q1', '42'),
      createFillBlankQuestion('q2', '100'),
    ];

    const answers: Record<string, QuizAnswer> = {
      q1: '42',
      q2: '99', // wrong
    };

    expect(calculateScore(questions, answers)).toBe(50);
  });

  it('handles missing numeric answers', () => {
    const questions: QuizQuestion[] = [
      createFillBlankQuestion('q1', '42'),
      createFillBlankQuestion('q2', '100'),
    ];

    expect(calculateScore(questions, {})).toBe(0);
    expect(calculateScore(questions, { q1: '42' })).toBe(50);
  });
});

describe('Real-world CS course numeric scenarios', () => {
  describe('Binary and hex conversions', () => {
    it('accepts binary number answers', () => {
      const question = createFillBlankQuestion('binary', '1010');
      expect(checkAnswer(question, '1010')).toBe(true);
      expect(checkAnswer(question, '01010')).toBe(false); // leading zero matters in string comparison
    });

    it('accepts hex number answers', () => {
      const question = createFillBlankQuestion('hex', '0xFF');
      expect(checkAnswer(question, '0xFF')).toBe(true);
      expect(checkAnswer(question, '0xff')).toBe(true); // case-insensitive
      expect(checkAnswer(question, '255')).toBe(false); // different representation
    });
  });

  describe('Big-O notation answers', () => {
    it('matches O(n) notation', () => {
      const question = createFillBlankQuestion('complexity', 'O(n)');
      expect(checkAnswer(question, 'O(n)')).toBe(true);
      expect(checkAnswer(question, 'o(n)')).toBe(true); // case-insensitive
    });

    it('matches O(n^2) notation', () => {
      const question = createFillBlankQuestion('complexity', 'O(n^2)');
      expect(checkAnswer(question, 'O(n^2)')).toBe(true);
      expect(checkAnswer(question, 'O(n²)')).toBe(false); // different character
    });

    it('matches O(log n) notation', () => {
      const question = createFillBlankQuestion('complexity', 'O(log n)');
      expect(checkAnswer(question, 'O(log n)')).toBe(true);
      expect(checkAnswer(question, 'O(logn)')).toBe(false); // spacing matters
    });
  });

  describe('Mathematical expressions', () => {
    it('matches simple fractions as strings', () => {
      const question = createFillBlankQuestion('math', '1/2');
      expect(checkAnswer(question, '1/2')).toBe(true);
      expect(checkAnswer(question, '0.5')).toBe(false); // different representation
    });

    it('matches polynomial expressions', () => {
      const question = createFillBlankQuestion('math', 'x^2 + 2x + 1');
      expect(checkAnswer(question, 'x^2 + 2x + 1')).toBe(true);
      expect(checkAnswer(question, 'X^2 + 2X + 1')).toBe(true); // case-insensitive
    });
  });
});
