/**
 * Quiz Answer Normalization Edge Cases Tests
 *
 * Comprehensive edge case tests for quiz answer normalization and scoring.
 * These tests complement the existing quiz-utils.test.ts by covering
 * additional edge cases and real-world scenarios.
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  checkAnswer,
  calculateScore,
  getCorrectOptionIndex,
} from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer } from '../src/core/types';

// =============================================================================
// Helper Functions
// =============================================================================

const createQuestion = (
  type: QuizQuestion['type'],
  correctAnswer: QuizQuestion['correctAnswer'],
  options?: string[]
): QuizQuestion => ({
  id: 'test-question',
  type,
  prompt: 'Test prompt',
  correctAnswer,
  explanation: 'Test explanation',
  ...(options && { options }),
  ...(type === 'code_output' && { codeSnippet: 'print("test")' }),
});

// =============================================================================
// normalizeAnswer - Unicode and Special Characters
// =============================================================================

describe('normalizeAnswer - Unicode and special characters', () => {
  it('handles Unicode mathematical symbols', () => {
    expect(normalizeAnswer('π')).toBe('π');
    expect(normalizeAnswer('∞')).toBe('∞');
    expect(normalizeAnswer('√2')).toBe('√2');
    expect(normalizeAnswer('≠')).toBe('≠');
    expect(normalizeAnswer('≤')).toBe('≤');
    expect(normalizeAnswer('≥')).toBe('≥');
  });

  it('handles Greek letters in math context', () => {
    expect(normalizeAnswer('Σ')).toBe('σ'); // Greek Sigma lowercased
    expect(normalizeAnswer('Δx')).toBe('δx');
    expect(normalizeAnswer('λ')).toBe('λ');
    expect(normalizeAnswer('θ')).toBe('θ');
  });

  it('handles subscript and superscript characters', () => {
    expect(normalizeAnswer('x₂')).toBe('x₂');
    expect(normalizeAnswer('x²')).toBe('x²');
    expect(normalizeAnswer('O(n²)')).toBe('o(n²)');
  });

  it('handles emoji and special symbols', () => {
    expect(normalizeAnswer('✓')).toBe('✓');
    expect(normalizeAnswer('✗')).toBe('✗');
    expect(normalizeAnswer('→')).toBe('→');
    expect(normalizeAnswer('←')).toBe('←');
  });

  it('handles mixed ASCII and Unicode', () => {
    expect(normalizeAnswer('O(n²) time')).toBe('o(n²) time');
    expect(normalizeAnswer('f(x) = x²')).toBe('f(x) = x²');
    expect(normalizeAnswer('Σᵢ aᵢ')).toBe('σᵢ aᵢ');
  });

  it('handles zero-width characters', () => {
    // Zero-width space (U+200B)
    expect(normalizeAnswer('hello\u200Bworld')).toBe('hello\u200bworld');
    // Zero-width non-joiner (U+200C)
    expect(normalizeAnswer('test\u200C')).toBe('test\u200c');
  });

  it('handles right-to-left marks', () => {
    // Right-to-left mark (U+200F)
    expect(normalizeAnswer('test\u200F')).toBe('test\u200f');
  });
});

// =============================================================================
// normalizeAnswer - Number Formats
// =============================================================================

describe('normalizeAnswer - number formats', () => {
  it('normalizes numeric values correctly', () => {
    expect(normalizeAnswer(42)).toBe('42');
    expect(normalizeAnswer(3.14)).toBe('3.14');
    expect(normalizeAnswer(-5)).toBe('-5');
    expect(normalizeAnswer(0)).toBe('0');
  });

  it('handles scientific notation strings', () => {
    expect(normalizeAnswer('1e10')).toBe('1e10');
    expect(normalizeAnswer('1E10')).toBe('1e10');
    expect(normalizeAnswer('1.5e-3')).toBe('1.5e-3');
  });

  it('handles infinity representations', () => {
    expect(normalizeAnswer('infinity')).toBe('infinity');
    expect(normalizeAnswer('Infinity')).toBe('infinity');
    expect(normalizeAnswer('∞')).toBe('∞');
  });

  it('handles number with leading zeros', () => {
    expect(normalizeAnswer('007')).toBe('007');
    expect(normalizeAnswer('0.5')).toBe('0.5');
    expect(normalizeAnswer('00')).toBe('00');
  });

  it('handles fractions as strings', () => {
    expect(normalizeAnswer('1/2')).toBe('1/2');
    expect(normalizeAnswer('3/4')).toBe('3/4');
    expect(normalizeAnswer('-1/3')).toBe('-1/3');
  });

  it('handles percentage strings', () => {
    expect(normalizeAnswer('50%')).toBe('50%');
    expect(normalizeAnswer('100%')).toBe('100%');
    expect(normalizeAnswer('3.5%')).toBe('3.5%');
  });
});

// =============================================================================
// normalizeAnswer - Boolean Handling
// =============================================================================

describe('normalizeAnswer - boolean handling', () => {
  it('normalizes boolean true', () => {
    expect(normalizeAnswer(true)).toBe('true');
  });

  it('normalizes boolean false', () => {
    expect(normalizeAnswer(false)).toBe('false');
  });

  it('handles string representations of booleans', () => {
    expect(normalizeAnswer('True')).toBe('true');
    expect(normalizeAnswer('TRUE')).toBe('true');
    expect(normalizeAnswer('False')).toBe('false');
    expect(normalizeAnswer('FALSE')).toBe('false');
  });
});

// =============================================================================
// normalizeAnswer - Edge Cases
// =============================================================================

describe('normalizeAnswer - edge cases', () => {
  it('handles undefined', () => {
    expect(normalizeAnswer(undefined)).toBe('');
  });

  it('handles null', () => {
    expect(normalizeAnswer(null)).toBe('');
  });

  it('handles very long strings', () => {
    const longString = 'a'.repeat(10000);
    expect(normalizeAnswer(longString)).toBe(longString);
  });

  it('handles strings with only whitespace', () => {
    expect(normalizeAnswer('   ')).toBe('');
    expect(normalizeAnswer('\t\n\r')).toBe('');
  });

  it('handles newlines within content', () => {
    expect(normalizeAnswer('line1\nline2')).toBe('line1\nline2');
    expect(normalizeAnswer('  line1\nline2  ')).toBe('line1\nline2');
  });

  it('handles tab characters within content', () => {
    expect(normalizeAnswer('col1\tcol2')).toBe('col1\tcol2');
  });

  it('handles mixed case with numbers and symbols', () => {
    expect(normalizeAnswer('O(N log N)')).toBe('o(n log n)');
    expect(normalizeAnswer('O(1) < O(n) < O(n²)')).toBe('o(1) < o(n) < o(n²)');
  });
});

// =============================================================================
// checkAnswer - Multiple Choice Edge Cases
// =============================================================================

describe('checkAnswer - multiple choice edge cases', () => {
  it('returns false when correctAnswer index is out of bounds', () => {
    const question = createQuestion('multiple_choice', 10, ['A', 'B', 'C', 'D']);
    expect(checkAnswer(question, 0)).toBe(false);
  });

  it('returns false when correctAnswer index is negative', () => {
    const question = createQuestion('multiple_choice', -1, ['A', 'B', 'C', 'D']);
    expect(checkAnswer(question, 0)).toBe(false);
  });

  it('returns false when options array is empty', () => {
    const question = createQuestion('multiple_choice', 0, []);
    expect(checkAnswer(question, 0)).toBe(false);
  });

  it('handles string correctAnswer that matches option', () => {
    const question = createQuestion('multiple_choice', 'B', ['A', 'B', 'C', 'D']);
    expect(checkAnswer(question, 1)).toBe(true);
    expect(checkAnswer(question, 0)).toBe(false);
  });

  it('returns false when string correctAnswer does not match any option', () => {
    const question = createQuestion('multiple_choice', 'E', ['A', 'B', 'C', 'D']);
    expect(checkAnswer(question, 0)).toBe(false);
  });

  it('handles options with special characters', () => {
    const options = ['O(n²)', 'O(n log n)', 'O(2ⁿ)', 'O(1)'];
    const question = createQuestion('multiple_choice', 0, options);
    expect(checkAnswer(question, 0)).toBe(true);
  });
});

// =============================================================================
// checkAnswer - True/False Edge Cases
// =============================================================================

describe('checkAnswer - true/false edge cases', () => {
  it('strictly compares boolean values', () => {
    const trueQuestion = createQuestion('true_false', true);
    expect(checkAnswer(trueQuestion, true)).toBe(true);
    expect(checkAnswer(trueQuestion, false)).toBe(false);

    const falseQuestion = createQuestion('true_false', false);
    expect(checkAnswer(falseQuestion, false)).toBe(true);
    expect(checkAnswer(falseQuestion, true)).toBe(false);
  });

  it('returns false for string "true" when expecting boolean true', () => {
    const question = createQuestion('true_false', true);
    // String 'true' is not === to boolean true
    expect(checkAnswer(question, 'true' as unknown as boolean)).toBe(false);
  });

  it('returns false for number 1 when expecting boolean true', () => {
    const question = createQuestion('true_false', true);
    expect(checkAnswer(question, 1 as unknown as boolean)).toBe(false);
  });
});

// =============================================================================
// checkAnswer - Fill Blank Edge Cases
// =============================================================================

describe('checkAnswer - fill blank edge cases', () => {
  it('handles case-insensitive matching', () => {
    const question = createQuestion('fill_blank', 'CPU');
    expect(checkAnswer(question, 'cpu')).toBe(true);
    expect(checkAnswer(question, 'Cpu')).toBe(true);
    expect(checkAnswer(question, 'CPU')).toBe(true);
  });

  it('handles whitespace normalization', () => {
    const question = createQuestion('fill_blank', 'binary search');
    expect(checkAnswer(question, 'binary search')).toBe(true);
    expect(checkAnswer(question, '  binary search  ')).toBe(true);
    expect(checkAnswer(question, 'BINARY SEARCH')).toBe(true);
  });

  it('handles numeric answers as strings', () => {
    const question = createQuestion('fill_blank', '42');
    expect(checkAnswer(question, '42')).toBe(true);
    expect(checkAnswer(question, 42 as unknown as string)).toBe(true);
  });

  it('handles mathematical notation', () => {
    const question = createQuestion('fill_blank', 'O(n²)');
    expect(checkAnswer(question, 'o(n²)')).toBe(true);
    expect(checkAnswer(question, 'O(n²)')).toBe(true);
  });

  it('handles empty correct answer', () => {
    const question = createQuestion('fill_blank', '');
    expect(checkAnswer(question, '')).toBe(true);
    expect(checkAnswer(question, '   ')).toBe(true);
  });

  it('handles special characters in answers', () => {
    const question = createQuestion('fill_blank', 'n-1');
    expect(checkAnswer(question, 'n-1')).toBe(true);
    expect(checkAnswer(question, 'N-1')).toBe(true);
  });
});

// =============================================================================
// checkAnswer - Code Output Edge Cases
// =============================================================================

describe('checkAnswer - code output edge cases', () => {
  it('handles Python True/False output', () => {
    const trueQuestion = createQuestion('code_output', 'True');
    expect(checkAnswer(trueQuestion, 'true')).toBe(true);
    expect(checkAnswer(trueQuestion, 'True')).toBe(true);

    const falseQuestion = createQuestion('code_output', 'False');
    expect(checkAnswer(falseQuestion, 'false')).toBe(true);
    expect(checkAnswer(falseQuestion, 'False')).toBe(true);
  });

  it('handles None output', () => {
    const question = createQuestion('code_output', 'None');
    expect(checkAnswer(question, 'none')).toBe(true);
    expect(checkAnswer(question, 'None')).toBe(true);
  });

  it('handles list output as string', () => {
    const question = createQuestion('code_output', '[1, 2, 3]');
    expect(checkAnswer(question, '[1, 2, 3]')).toBe(true);
    expect(checkAnswer(question, '[1,2,3]')).toBe(false); // Spaces matter
  });

  it('handles dict output as string', () => {
    const question = createQuestion('code_output', "{'key': 'value'}");
    expect(checkAnswer(question, "{'key': 'value'}")).toBe(true);
  });

  it('handles multiline output', () => {
    const question = createQuestion('code_output', "line1\nline2");
    expect(checkAnswer(question, "line1\nline2")).toBe(true);
    expect(checkAnswer(question, "  line1\nline2  ")).toBe(true);
  });

  it('handles floating point output', () => {
    const question = createQuestion('code_output', '3.14');
    expect(checkAnswer(question, '3.14')).toBe(true);
    expect(checkAnswer(question, '3.140')).toBe(false); // Not equal
  });
});

// =============================================================================
// checkAnswer - Coding Questions
// =============================================================================

describe('checkAnswer - coding questions', () => {
  it('returns true when code passed all tests', () => {
    const question = createQuestion('coding', '');
    const answer = { code: 'def foo(): pass', passed: true };
    expect(checkAnswer(question, answer)).toBe(true);
  });

  it('returns false when code failed tests', () => {
    const question = createQuestion('coding', '');
    const answer = { code: 'def foo(): pass', passed: false };
    expect(checkAnswer(question, answer)).toBe(false);
  });

  it('returns false for non-coding answer object', () => {
    const question = createQuestion('coding', '');
    expect(checkAnswer(question, 'some string')).toBe(false);
    expect(checkAnswer(question, 42)).toBe(false);
  });
});

// =============================================================================
// checkAnswer - Written Questions
// =============================================================================

describe('checkAnswer - written questions', () => {
  it('matches case-insensitively', () => {
    const question = createQuestion('written', 'The answer is A');
    expect(checkAnswer(question, 'the answer is a')).toBe(true);
    expect(checkAnswer(question, 'THE ANSWER IS A')).toBe(true);
  });

  it('trims whitespace', () => {
    const question = createQuestion('written', 'answer');
    expect(checkAnswer(question, '  answer  ')).toBe(true);
  });
});

// =============================================================================
// checkAnswer - Undefined Answer
// =============================================================================

describe('checkAnswer - undefined answer', () => {
  it('returns false for undefined answer on all question types', () => {
    expect(checkAnswer(createQuestion('multiple_choice', 0, ['A']), undefined)).toBe(false);
    expect(checkAnswer(createQuestion('true_false', true), undefined)).toBe(false);
    expect(checkAnswer(createQuestion('fill_blank', 'test'), undefined)).toBe(false);
    expect(checkAnswer(createQuestion('code_output', 'test'), undefined)).toBe(false);
    expect(checkAnswer(createQuestion('coding', ''), undefined)).toBe(false);
    expect(checkAnswer(createQuestion('written', 'test'), undefined)).toBe(false);
  });
});

// =============================================================================
// getCorrectOptionIndex - Edge Cases
// =============================================================================

describe('getCorrectOptionIndex - edge cases', () => {
  it('returns -1 when options is undefined', () => {
    const question: QuizQuestion = {
      id: 'test',
      type: 'multiple_choice',
      prompt: 'test',
      correctAnswer: 0,
      explanation: 'test',
    };
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns -1 when correctAnswer is out of bounds', () => {
    const question = createQuestion('multiple_choice', 5, ['A', 'B', 'C']);
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns index when correctAnswer is valid number', () => {
    const question = createQuestion('multiple_choice', 2, ['A', 'B', 'C', 'D']);
    expect(getCorrectOptionIndex(question)).toBe(2);
  });

  it('returns index when correctAnswer is string matching option', () => {
    const question = createQuestion('multiple_choice', 'C', ['A', 'B', 'C', 'D']);
    expect(getCorrectOptionIndex(question)).toBe(2);
  });

  it('returns -1 when string correctAnswer does not match any option', () => {
    const question = createQuestion('multiple_choice', 'Z', ['A', 'B', 'C', 'D']);
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns 0 for index 0', () => {
    const question = createQuestion('multiple_choice', 0, ['A', 'B', 'C']);
    expect(getCorrectOptionIndex(question)).toBe(0);
  });

  it('handles boundary index (last option)', () => {
    const question = createQuestion('multiple_choice', 3, ['A', 'B', 'C', 'D']);
    expect(getCorrectOptionIndex(question)).toBe(3);
  });
});

// =============================================================================
// calculateScore - Edge Cases
// =============================================================================

describe('calculateScore - edge cases', () => {
  it('returns 0 for empty questions array', () => {
    expect(calculateScore([], {})).toBe(0);
  });

  it('returns 0 when no answers provided', () => {
    const questions = [
      createQuestion('fill_blank', 'a'),
      createQuestion('fill_blank', 'b'),
    ];
    expect(calculateScore(questions, {})).toBe(0);
  });

  it('returns 100 for all correct answers', () => {
    const questions = [
      { ...createQuestion('fill_blank', 'a'), id: 'q1' },
      { ...createQuestion('fill_blank', 'b'), id: 'q2' },
    ];
    const answers = { q1: 'a', q2: 'b' };
    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('returns 50 for half correct answers', () => {
    const questions = [
      { ...createQuestion('fill_blank', 'a'), id: 'q1' },
      { ...createQuestion('fill_blank', 'b'), id: 'q2' },
    ];
    const answers = { q1: 'a', q2: 'wrong' };
    expect(calculateScore(questions, answers)).toBe(50);
  });

  it('rounds to nearest integer', () => {
    const questions = [
      { ...createQuestion('fill_blank', 'a'), id: 'q1' },
      { ...createQuestion('fill_blank', 'b'), id: 'q2' },
      { ...createQuestion('fill_blank', 'c'), id: 'q3' },
    ];
    // 1/3 correct = 33.33...%, rounds to 33
    const answers = { q1: 'a' };
    expect(calculateScore(questions, answers)).toBe(33);
  });

  it('handles mixed question types', () => {
    const questions = [
      { ...createQuestion('multiple_choice', 0, ['A', 'B']), id: 'q1' },
      { ...createQuestion('true_false', true), id: 'q2' },
      { ...createQuestion('fill_blank', 'test'), id: 'q3' },
      { ...createQuestion('code_output', '42'), id: 'q4' },
    ];
    const answers: Record<string, QuizAnswer> = {
      q1: 0,
      q2: true,
      q3: 'test',
      q4: '42',
    };
    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles single question', () => {
    const questions = [createQuestion('fill_blank', 'answer')];
    expect(calculateScore(questions, { 'test-question': 'answer' })).toBe(100);
    expect(calculateScore(questions, { 'test-question': 'wrong' })).toBe(0);
  });

  it('ignores extra answers not matching any question', () => {
    const questions = [{ ...createQuestion('fill_blank', 'a'), id: 'q1' }];
    const answers = { q1: 'a', q2: 'extra', q3: 'also extra' };
    expect(calculateScore(questions, answers)).toBe(100);
  });
});

// =============================================================================
// Integration Tests - Real-World Scenarios
// =============================================================================

describe('real-world quiz scenarios', () => {
  it('handles CS algorithm complexity quiz', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'Binary search has time complexity O(___)',
        correctAnswer: 'log n',
        explanation: 'Binary search divides the search space in half each iteration',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the space complexity of merge sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Merge sort requires O(n) auxiliary space',
      },
      {
        id: 'q3',
        type: 'true_false',
        prompt: 'Quick sort always has O(n log n) time complexity',
        correctAnswer: false,
        explanation: 'Worst case is O(n²) for already sorted arrays',
      },
    ];

    const answers: Record<string, QuizAnswer> = {
      q1: 'LOG N', // Should match case-insensitively
      q2: 2,
      q3: false,
    };

    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles math quiz with special notation', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'The derivative of x² is ___',
        correctAnswer: '2x',
        explanation: 'Power rule: d/dx(xⁿ) = nxⁿ⁻¹',
      },
      {
        id: 'q2',
        type: 'fill_blank',
        prompt: 'The integral of 1/x is ___',
        correctAnswer: 'ln|x|',
        explanation: 'Standard integral formula',
      },
    ];

    const answers: Record<string, QuizAnswer> = {
      q1: '2X', // Case insensitive
      q2: 'ln|x|',
    };

    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('handles Python code output quiz', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'code_output',
        prompt: 'What is the output?',
        codeSnippet: 'print(bool([]))',
        correctAnswer: 'False',
        explanation: 'Empty list is falsy in Python',
      },
      {
        id: 'q2',
        type: 'code_output',
        prompt: 'What is the output?',
        codeSnippet: 'print(type(None).__name__)',
        correctAnswer: 'NoneType',
        explanation: 'None has type NoneType',
      },
    ];

    const answers: Record<string, QuizAnswer> = {
      q1: 'false', // Case insensitive
      q2: 'nonetype', // Case insensitive
    };

    expect(calculateScore(questions, answers)).toBe(100);
  });
});
