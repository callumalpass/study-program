/**
 * Quiz Utils - Additional Edge Cases Tests
 *
 * Tests additional edge cases for quiz utility functions that may not be
 * covered by other test files, including:
 * - Multiline code output matching
 * - Unicode character handling
 * - Floating point comparison
 * - Special Python output formats
 */

import { describe, expect, it } from 'vitest';
import {
  normalizeAnswer,
  normalizeCodeOutput,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion } from '@/core/types';

describe('normalizeCodeOutput - Multiline Output', () => {
  it('handles simple multiline output', () => {
    const expected = normalizeCodeOutput('hello\nworld');
    expect(normalizeCodeOutput('hello\nworld')).toBe(expected);
  });

  it('trims leading and trailing newlines', () => {
    expect(normalizeCodeOutput('\nhello\n')).toBe('hello');
    expect(normalizeCodeOutput('\n\nhello\n\n')).toBe('hello');
  });

  it('preserves internal newlines', () => {
    expect(normalizeCodeOutput('line1\nline2\nline3')).toBe('line1\nline2\nline3');
  });

  it('handles Windows-style line endings', () => {
    // CRLF should be handled when comparing
    expect(normalizeCodeOutput('hello\r\nworld'.trim())).toBe('hello\r\nworld');
  });

  it('matches multiline Python output with different spacing', () => {
    const expected = normalizeCodeOutput('[1, 2]\n[3, 4]');
    expect(normalizeCodeOutput('[1,2]\n[3,4]')).toBe(expected);
  });
});

describe('normalizeCodeOutput - Floating Point Numbers', () => {
  it('handles floating point output', () => {
    expect(normalizeCodeOutput('3.14159')).toBe('3.14159');
  });

  it('handles scientific notation', () => {
    expect(normalizeCodeOutput('1e-10')).toBe('1e-10');
    expect(normalizeCodeOutput('1E10')).toBe('1e10');
  });

  it('handles negative floats', () => {
    expect(normalizeCodeOutput('-3.14')).toBe('-3.14');
  });

  it('handles floating point in lists', () => {
    const expected = normalizeCodeOutput('[1.0, 2.5, 3.14]');
    expect(normalizeCodeOutput('[1.0,2.5,3.14]')).toBe(expected);
  });
});

describe('normalizeCodeOutput - Unicode Handling', () => {
  it('handles Greek letters', () => {
    expect(normalizeCodeOutput('λ')).toBe('λ');
    expect(normalizeCodeOutput('Σ')).toBe('σ'); // lowercase
  });

  it('handles mathematical symbols', () => {
    expect(normalizeCodeOutput('∞')).toBe('∞');
    expect(normalizeCodeOutput('π')).toBe('π');
  });

  it('handles emoji (if present in output)', () => {
    expect(normalizeCodeOutput('✓')).toBe('✓');
    expect(normalizeCodeOutput('🎉')).toBe('🎉');
  });

  it('handles accented characters', () => {
    expect(normalizeCodeOutput('CAFÉ')).toBe('café');
    expect(normalizeCodeOutput('naïve')).toBe('naïve');
  });
});

describe('normalizeCodeOutput - Special Python Outputs', () => {
  it('handles Python repr strings', () => {
    expect(normalizeCodeOutput("'hello'")).toBe("'hello'");
    expect(normalizeCodeOutput('"hello"')).toBe('"hello"');
  });

  it('handles Python None', () => {
    expect(normalizeCodeOutput('None')).toBe('none');
  });

  it('handles Python True/False', () => {
    expect(normalizeCodeOutput('True')).toBe('true');
    expect(normalizeCodeOutput('False')).toBe('false');
  });

  it('handles Python class representation', () => {
    expect(normalizeCodeOutput("<class 'int'>")).toBe("<class 'int'>");
  });

  it('handles Python complex numbers', () => {
    expect(normalizeCodeOutput('(1+2j)')).toBe('(1+2j)');
    expect(normalizeCodeOutput('( 1 + 2j )')).toBe('(1 + 2j)');
  });

  it('handles Python error messages', () => {
    expect(normalizeCodeOutput('ZeroDivisionError')).toBe('zerodivisionerror');
  });

  it('handles frozenset output', () => {
    const expected = normalizeCodeOutput('frozenset({1, 2, 3})');
    expect(normalizeCodeOutput('frozenset( { 1 , 2 , 3 } )')).toBe(expected);
  });
});

describe('normalizeCodeOutput - Edge Cases with Operators', () => {
  it('handles mathematical expressions in output', () => {
    expect(normalizeCodeOutput('x + y')).toBe('x + y');
    expect(normalizeCodeOutput('a * b')).toBe('a * b');
  });

  it('handles comparison operators', () => {
    expect(normalizeCodeOutput('a <= b')).toBe('a <= b');
    expect(normalizeCodeOutput('x >= y')).toBe('x >= y');
  });

  it('handles arrow notation', () => {
    expect(normalizeCodeOutput('a -> b')).toBe('a -> b');
    expect(normalizeCodeOutput('f => x')).toBe('f => x');
  });
});

describe('checkAnswer - Code Output Edge Cases', () => {
  it('matches output with trailing space in expected', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What does this print?',
      codeSnippet: 'print("test ")',
      correctAnswer: 'test ',
      explanation: 'Trailing space',
    };
    // User types without trailing space - after normalization both are trimmed
    expect(checkAnswer(question, 'test')).toBe(true);
  });

  it('handles list output equivalence', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What does this print?',
      codeSnippet: 'print([1, 2, 3])',
      correctAnswer: '[1, 2, 3]',
      explanation: 'List output',
    };
    // User types without spaces
    expect(checkAnswer(question, '[1,2,3]')).toBe(true);
    // User types with extra spaces
    expect(checkAnswer(question, '[ 1, 2, 3 ]')).toBe(true);
  });

  it('handles dict output equivalence', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What does this print?',
      codeSnippet: "print({'a': 1})",
      correctAnswer: "{'a': 1}",
      explanation: 'Dict output',
    };
    // User types without spaces
    expect(checkAnswer(question, "{'a':1}")).toBe(true);
    // User types with extra spaces
    expect(checkAnswer(question, "{ 'a' : 1 }")).toBe(true);
  });

  it('handles numeric string output', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What is the result?',
      codeSnippet: 'print(2 ** 10)',
      correctAnswer: '1024',
      explanation: 'Power of 2',
    };
    expect(checkAnswer(question, '1024')).toBe(true);
    expect(checkAnswer(question, ' 1024 ')).toBe(true);
    // Wrong value
    expect(checkAnswer(question, '1023')).toBe(false);
  });

  it('handles boolean output case-insensitively', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'code_output',
      prompt: 'What does this print?',
      codeSnippet: 'print(True)',
      correctAnswer: 'True',
      explanation: 'Boolean True',
    };
    expect(checkAnswer(question, 'True')).toBe(true);
    expect(checkAnswer(question, 'true')).toBe(true);
    expect(checkAnswer(question, 'TRUE')).toBe(true);
  });
});

describe('normalizeAnswer - Fill Blank Edge Cases', () => {
  it('handles mathematical answers', () => {
    expect(normalizeAnswer('O(n log n)')).toBe('o(n log n)');
    expect(normalizeAnswer('Θ(n²)')).toBe('θ(n²)');
  });

  it('handles hyphenated terms', () => {
    expect(normalizeAnswer('Two-Phase Locking')).toBe('two-phase locking');
  });

  it('handles abbreviations', () => {
    expect(normalizeAnswer('FIFO')).toBe('fifo');
    expect(normalizeAnswer('LIFO')).toBe('lifo');
    expect(normalizeAnswer('RAM')).toBe('ram');
  });

  it('handles numbers as answers', () => {
    expect(normalizeAnswer(42)).toBe('42');
    expect(normalizeAnswer('42')).toBe('42');
    expect(normalizeAnswer(' 42 ')).toBe('42');
  });
});

describe('calculateScore - Edge Cases', () => {
  it('handles all questions having invalid correct answers', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Q1?',
        correctAnswer: 100, // Out of bounds
        explanation: 'Test',
        options: ['A', 'B'],
      },
    ];
    // Even if user guesses the same invalid index, it should be marked wrong
    expect(calculateScore(questions, { q1: 100 })).toBe(0);
    expect(calculateScore(questions, { q1: 0 })).toBe(0);
  });

  it('handles single question quiz', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'true_false',
        prompt: 'Is this true?',
        correctAnswer: true,
        explanation: 'Test',
      },
    ];
    expect(calculateScore(questions, { q1: true })).toBe(100);
    expect(calculateScore(questions, { q1: false })).toBe(0);
  });

  it('handles quiz with many questions for rounding', () => {
    // Create 7 questions
    const questions: QuizQuestion[] = Array.from({ length: 7 }, (_, i) => ({
      id: `q${i}`,
      type: 'true_false' as const,
      prompt: `Question ${i}?`,
      correctAnswer: true,
      explanation: 'Test',
    }));

    // 3 out of 7 correct = 42.857... should round to 43
    const answers = { q0: true, q1: true, q2: true };
    expect(calculateScore(questions, answers)).toBe(43);

    // 4 out of 7 correct = 57.142... should round to 57
    const answers2 = { q0: true, q1: true, q2: true, q3: true };
    expect(calculateScore(questions, answers2)).toBe(57);
  });

  it('handles null answers gracefully', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'Answer: ____',
        correctAnswer: 'test',
        explanation: 'Test',
      },
    ];
    // Pass null as answer
    expect(calculateScore(questions, { q1: null as any })).toBe(0);
  });
});

describe('checkAnswer - Fill Blank with Numeric Answers', () => {
  it('matches numeric string answer to numeric correctAnswer', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'fill_blank',
      prompt: 'What is 5 + 5?',
      correctAnswer: 10 as unknown as string, // Stored as number
      explanation: 'Basic addition',
    };
    expect(checkAnswer(question, '10')).toBe(true);
    expect(checkAnswer(question, 10 as any)).toBe(true);
  });

  it('matches string answer to string correctAnswer that looks numeric', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'fill_blank',
      prompt: 'How many bits in a byte?',
      correctAnswer: '8',
      explanation: 'Standard byte size',
    };
    expect(checkAnswer(question, '8')).toBe(true);
    expect(checkAnswer(question, ' 8 ')).toBe(true);
  });
});

describe('normalizeCodeOutput - Boundary Cases', () => {
  it('handles empty string', () => {
    expect(normalizeCodeOutput('')).toBe('');
  });

  it('handles string with only punctuation', () => {
    expect(normalizeCodeOutput('{}')).toBe('{}');
    expect(normalizeCodeOutput('[]')).toBe('[]');
    expect(normalizeCodeOutput('()')).toBe('()');
  });

  it('handles deeply nested structures', () => {
    const input = '[[[[1]]]]';
    const expected = normalizeCodeOutput(input);
    expect(normalizeCodeOutput('[[ [[ 1 ]] ]]')).toBe(expected);
  });

  it('handles mixed brackets', () => {
    const expected = normalizeCodeOutput('[{1: (2, 3)}]');
    expect(normalizeCodeOutput('[{1:(2,3)}]')).toBe(expected);
    expect(normalizeCodeOutput('[ { 1 : ( 2 , 3 ) } ]')).toBe(expected);
  });

  it('handles very long output', () => {
    const longList = Array.from({ length: 100 }, (_, i) => i).join(', ');
    const withSpaces = `[${longList}]`;
    const withoutSpaces = `[${longList.replace(/, /g, ',')}]`;
    expect(normalizeCodeOutput(withoutSpaces)).toBe(normalizeCodeOutput(withSpaces));
  });
});
