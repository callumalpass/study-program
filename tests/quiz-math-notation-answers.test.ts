/**
 * Quiz Math Notation Answers Tests
 *
 * Tests that quiz answer validation correctly handles mathematical notation,
 * special characters, and Unicode symbols commonly used in math courses.
 */

import { describe, expect, it } from 'vitest';
import {
  normalizeAnswer,
  getCorrectOptionIndex,
  checkAnswer,
} from '../src/utils/quiz-utils';
import type { QuizQuestion } from '@/core/types';

describe('Math notation in normalizeAnswer', () => {
  describe('preserves mathematical symbols', () => {
    it('preserves square root symbol', () => {
      expect(normalizeAnswer('√2')).toBe('√2');
      expect(normalizeAnswer('√(x+1)')).toBe('√(x+1)');
    });

    it('preserves pi symbol', () => {
      expect(normalizeAnswer('π/4')).toBe('π/4');
      expect(normalizeAnswer('2πr')).toBe('2πr');
    });

    it('preserves Greek letters', () => {
      expect(normalizeAnswer('θ')).toBe('θ');
      expect(normalizeAnswer('λ')).toBe('λ');
      expect(normalizeAnswer('Σ')).toBe('σ'); // Uppercase sigma becomes lowercase
      expect(normalizeAnswer('∞')).toBe('∞');
    });

    it('preserves comparison symbols', () => {
      expect(normalizeAnswer('≤')).toBe('≤');
      expect(normalizeAnswer('≥')).toBe('≥');
      expect(normalizeAnswer('≠')).toBe('≠');
    });

    it('preserves set notation', () => {
      expect(normalizeAnswer('{z : |z| = 1}')).toBe('{z : |z| = 1}');
      expect(normalizeAnswer('∅')).toBe('∅');
      expect(normalizeAnswer('∈')).toBe('∈');
      expect(normalizeAnswer('⊂')).toBe('⊂');
    });

    it('preserves exponents and subscripts', () => {
      expect(normalizeAnswer('x²')).toBe('x²');
      expect(normalizeAnswer('n³')).toBe('n³');
      expect(normalizeAnswer('e^(iπ)')).toBe('e^(iπ)');
    });

    it('lowercases text but preserves Unicode math symbols', () => {
      expect(normalizeAnswer('∑(i=1)')).toBe('∑(i=1)');
      expect(normalizeAnswer('∫f(x)dx')).toBe('∫f(x)dx');
    });
  });

  describe('complex analysis notation', () => {
    it('handles complex number expressions', () => {
      expect(normalizeAnswer('2 + 3i')).toBe('2 + 3i');
      expect(normalizeAnswer('-√3 - i')).toBe('-√3 - i');
      expect(normalizeAnswer('√2 e^(iπ/4)')).toBe('√2 e^(iπ/4)');
    });

    it('handles polar form notation', () => {
      expect(normalizeAnswer('re^(iθ)')).toBe('re^(iθ)');
      expect(normalizeAnswer('2e^(iπ/3)')).toBe('2e^(iπ/3)');
    });

    it('handles modulus notation', () => {
      expect(normalizeAnswer('|z| = 5')).toBe('|z| = 5');
      expect(normalizeAnswer('|z - 1| < 2')).toBe('|z - 1| < 2');
    });
  });

  describe('numeric expressions', () => {
    it('handles negative numbers', () => {
      expect(normalizeAnswer('-4')).toBe('-4');
      expect(normalizeAnswer('-5π/6')).toBe('-5π/6');
    });

    it('handles fractions', () => {
      expect(normalizeAnswer('1/2')).toBe('1/2');
      expect(normalizeAnswer('-7π/6')).toBe('-7π/6');
    });
  });
});

describe('getCorrectOptionIndex with math notation', () => {
  it('finds option with square root', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is the modulus of 1 + i?',
      correctAnswer: '√2',
      explanation: 'Test',
      options: ['1', '√2', '2', 'i'],
    };
    expect(getCorrectOptionIndex(question)).toBe(1);
  });

  it('finds option with complex notation', () => {
    const question: QuizQuestion = {
      id: 'q2',
      type: 'multiple_choice',
      prompt: 'Express in polar form',
      correctAnswer: '√2 e^(iπ/4)',
      explanation: 'Test',
      options: ['√2 e^(iπ/4)', '2 e^(iπ/4)', 'e^(iπ/4)', '√2 e^(iπ/2)'],
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
  });

  it('finds option with set notation', () => {
    const question: QuizQuestion = {
      id: 'q3',
      type: 'multiple_choice',
      prompt: 'Which is the boundary?',
      correctAnswer: '{z : |z| = 1}',
      explanation: 'Test',
      options: ['{z : |z| = 1}', '{z : |z| ≤ 1}', '{z : |z| > 1}', '∅'],
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
  });

  it('finds option with negative fraction', () => {
    const question: QuizQuestion = {
      id: 'q4',
      type: 'multiple_choice',
      prompt: 'What is the principal argument?',
      correctAnswer: '-5π/6',
      explanation: 'Test',
      options: ['-5π/6', '-7π/6', '5π/6', '7π/6'],
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
  });
});

describe('checkAnswer with math notation in fill_blank', () => {
  it('matches exact complex number answer', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'fill_blank',
      prompt: 'The conjugate of 2 - 3i is ____',
      correctAnswer: '2 + 3i',
      explanation: 'Test',
    };
    expect(checkAnswer(question, '2 + 3i')).toBe(true);
    expect(checkAnswer(question, '2 - 3i')).toBe(false);
  });

  it('handles answers with pi symbol', () => {
    const question: QuizQuestion = {
      id: 'q2',
      type: 'fill_blank',
      prompt: 'e^(iπ) equals ____',
      correctAnswer: '-1',
      explanation: 'Euler\'s identity',
    };
    expect(checkAnswer(question, '-1')).toBe(true);
    expect(checkAnswer(question, '1')).toBe(false);
  });

  it('handles modulus answers', () => {
    const question: QuizQuestion = {
      id: 'q3',
      type: 'fill_blank',
      prompt: 'The modulus of 3 + 4i is ____',
      correctAnswer: '5',
      explanation: 'Test',
    };
    expect(checkAnswer(question, '5')).toBe(true);
    expect(checkAnswer(question, '5.0')).toBe(false); // Different format
  });
});

describe('checkAnswer with math notation in code_output', () => {
  it('matches numeric output exactly', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What is the result?',
      codeSnippet: 'print(2 ** 10)',
      correctAnswer: '1024',
      explanation: 'Test',
    };
    expect(checkAnswer(question, '1024')).toBe(true);
  });

  it('matches negative numbers', () => {
    const question: QuizQuestion = {
      id: 'q2',
      type: 'code_output',
      prompt: 'What does this print?',
      codeSnippet: 'print(-4)',
      correctAnswer: '-4',
      explanation: 'Test',
    };
    expect(checkAnswer(question, '-4')).toBe(true);
  });
});

describe('multiple_choice with numeric string answers', () => {
  it('correctly handles when correctAnswer is numeric string matching option', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is the modulus of 3 + 4i?',
      correctAnswer: '5',
      explanation: 'Test',
      options: ['3', '4', '5', '7'],
    };
    // correctAnswer "5" should find index 2 (the string "5" in options)
    expect(getCorrectOptionIndex(question)).toBe(2);
    // User selecting index 2 should be correct
    expect(checkAnswer(question, 2)).toBe(true);
    // User selecting other indices should be incorrect
    expect(checkAnswer(question, 0)).toBe(false);
    expect(checkAnswer(question, 1)).toBe(false);
    expect(checkAnswer(question, 3)).toBe(false);
  });

  it('handles 4th roots question', () => {
    const question: QuizQuestion = {
      id: 'q2',
      type: 'multiple_choice',
      prompt: 'How many distinct 4th roots does 16 have?',
      correctAnswer: '4',
      explanation: 'Test',
      options: ['1', '2', '3', '4'],
    };
    expect(getCorrectOptionIndex(question)).toBe(3);
    expect(checkAnswer(question, 3)).toBe(true);
  });

  it('handles negative answer as string', () => {
    const question: QuizQuestion = {
      id: 'q3',
      type: 'multiple_choice',
      prompt: 'What is (1 + i)^4?',
      correctAnswer: '-4',
      explanation: 'Test',
      options: ['-4', '4', '-4i', '4i'],
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
    expect(checkAnswer(question, 0)).toBe(true);
  });

  it('handles De Moivre result with positive answer', () => {
    const question: QuizQuestion = {
      id: 'q4',
      type: 'multiple_choice',
      prompt: 'What is (1 - i)^8?',
      correctAnswer: '16',
      explanation: 'Test',
      options: ['16', '-16', '16i', '-16i'],
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
    expect(checkAnswer(question, 0)).toBe(true);
  });
});

describe('Open/Closed set notation in answers', () => {
  it('handles Closed as answer', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'The set {z : 1 ≤ |z - i| ≤ 2} is:',
      correctAnswer: 'Closed',
      explanation: 'Test',
      options: ['Open', 'Closed', 'Neither', 'Clopen'],
    };
    expect(getCorrectOptionIndex(question)).toBe(1);
    expect(checkAnswer(question, 1)).toBe(true);
  });

  it('handles North pole as answer', () => {
    const question: QuizQuestion = {
      id: 'q2',
      type: 'multiple_choice',
      prompt: 'On the Riemann sphere, ∞ corresponds to:',
      correctAnswer: 'North pole',
      explanation: 'Test',
      options: ['North pole', 'South pole', 'Equator', 'Origin'],
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
    expect(checkAnswer(question, 0)).toBe(true);
  });
});

describe('Edge cases in math content', () => {
  it('handles empty string option edge case', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Select the empty set',
      correctAnswer: '∅',
      explanation: 'Test',
      options: ['{}', '∅', 'null', 'undefined'],
    };
    expect(getCorrectOptionIndex(question)).toBe(1);
  });

  it('handles infinity symbol', () => {
    const question: QuizQuestion = {
      id: 'q2',
      type: 'multiple_choice',
      prompt: 'What is the limit?',
      correctAnswer: '∞',
      explanation: 'Test',
      options: ['0', '1', '∞', '-∞'],
    };
    expect(getCorrectOptionIndex(question)).toBe(2);
  });

  it('handles comparison operators in options', () => {
    const question: QuizQuestion = {
      id: 'q3',
      type: 'multiple_choice',
      prompt: 'Which inequality holds?',
      correctAnswer: 'x ≤ y',
      explanation: 'Test',
      options: ['x < y', 'x ≤ y', 'x = y', 'x ≥ y'],
    };
    expect(getCorrectOptionIndex(question)).toBe(1);
  });
});
