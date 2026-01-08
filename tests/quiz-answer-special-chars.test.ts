/**
 * Quiz Answer Special Characters Tests
 *
 * Tests for quiz answer validation with special characters, mathematical notation,
 * and edge cases in string comparison. These tests ensure the checkAnswer function
 * handles various real-world answer formats correctly.
 */

import { describe, it, expect } from 'vitest';
import { checkAnswer, normalizeAnswer } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

const createFillBlank = (correctAnswer: string): QuizQuestion => ({
  id: 'test',
  type: 'fill_blank',
  prompt: 'Test question',
  correctAnswer,
  explanation: 'Explanation',
});

const createCodeOutput = (correctAnswer: string, codeSnippet = 'code'): QuizQuestion => ({
  id: 'test',
  type: 'code_output',
  prompt: 'Test question',
  codeSnippet,
  correctAnswer,
  explanation: 'Explanation',
});

describe('quiz answers with mathematical notation', () => {
  it('handles answers with superscripts', () => {
    const question = createFillBlank('n²');
    expect(checkAnswer(question, 'n²')).toBe(true);
    expect(checkAnswer(question, 'N²')).toBe(true);
  });

  it('handles answers with subscripts', () => {
    const question = createFillBlank('x₁');
    expect(checkAnswer(question, 'x₁')).toBe(true);
  });

  it('handles Greek letters', () => {
    const question = createFillBlank('θ');
    expect(checkAnswer(question, 'θ')).toBe(true);
    expect(checkAnswer(question, 'Θ')).toBe(true); // Case insensitive for Greek too
  });

  it('handles mathematical operators', () => {
    const question = createFillBlank('O(n × log n)');
    expect(checkAnswer(question, 'O(n × log n)')).toBe(true);
    expect(checkAnswer(question, 'o(n × log n)')).toBe(true);
  });

  it('handles infinity symbol', () => {
    const question = createFillBlank('∞');
    expect(checkAnswer(question, '∞')).toBe(true);
  });

  it('handles plus/minus symbol', () => {
    const question = createFillBlank('±5');
    expect(checkAnswer(question, '±5')).toBe(true);
  });
});

describe('quiz answers with programming syntax', () => {
  it('handles answers with angle brackets', () => {
    const question = createFillBlank('<stdio.h>');
    expect(checkAnswer(question, '<stdio.h>')).toBe(true);
    expect(checkAnswer(question, '<STDIO.H>')).toBe(true);
  });

  it('handles answers with curly braces', () => {
    const question = createFillBlank('{}');
    expect(checkAnswer(question, '{}')).toBe(true);
  });

  it('handles answers with square brackets', () => {
    const question = createFillBlank('arr[i]');
    expect(checkAnswer(question, 'arr[i]')).toBe(true);
    expect(checkAnswer(question, 'ARR[I]')).toBe(true);
  });

  it('handles answers with arrow operator', () => {
    const question = createFillBlank('->');
    expect(checkAnswer(question, '->')).toBe(true);
  });

  it('handles answers with pointer syntax', () => {
    const question = createFillBlank('*ptr');
    expect(checkAnswer(question, '*ptr')).toBe(true);
    expect(checkAnswer(question, '*PTR')).toBe(true);
  });

  it('handles answers with reference syntax', () => {
    const question = createFillBlank('&var');
    expect(checkAnswer(question, '&var')).toBe(true);
  });

  it('handles answers with double ampersand (logical AND)', () => {
    const question = createFillBlank('&&');
    expect(checkAnswer(question, '&&')).toBe(true);
  });

  it('handles answers with double pipe (logical OR)', () => {
    const question = createFillBlank('||');
    expect(checkAnswer(question, '||')).toBe(true);
  });
});

describe('quiz answers with format specifiers', () => {
  it('handles C format specifier %d', () => {
    const question = createFillBlank('%d');
    expect(checkAnswer(question, '%d')).toBe(true);
    expect(checkAnswer(question, '%D')).toBe(true);
  });

  it('handles C format specifier %s', () => {
    const question = createFillBlank('%s');
    expect(checkAnswer(question, '%s')).toBe(true);
    expect(checkAnswer(question, '%S')).toBe(true);
  });

  it('handles C format specifier %c', () => {
    const question = createFillBlank('%c');
    expect(checkAnswer(question, '%c')).toBe(true);
  });

  it('handles C format specifier %f', () => {
    const question = createFillBlank('%f');
    expect(checkAnswer(question, '%f')).toBe(true);
  });

  it('handles complex format specifier', () => {
    const question = createFillBlank('%03d');
    expect(checkAnswer(question, '%03d')).toBe(true);
  });
});

describe('quiz answers with escape sequences', () => {
  it('handles newline escape sequence', () => {
    const question = createFillBlank('\\n');
    expect(checkAnswer(question, '\\n')).toBe(true);
  });

  it('handles tab escape sequence', () => {
    const question = createFillBlank('\\t');
    expect(checkAnswer(question, '\\t')).toBe(true);
  });

  it('handles backslash escape sequence', () => {
    const question = createFillBlank('\\\\');
    expect(checkAnswer(question, '\\\\')).toBe(true);
  });
});

describe('code output with special formatting', () => {
  it('handles multi-line output with consistent newlines', () => {
    const question = createCodeOutput('line1\nline2\nline3');
    expect(checkAnswer(question, 'line1\nline2\nline3')).toBe(true);
    expect(checkAnswer(question, 'LINE1\nLINE2\nLINE3')).toBe(true);
  });

  it('handles output with trailing newline', () => {
    const question = createCodeOutput('output\n');
    expect(checkAnswer(question, 'output\n')).toBe(true);
  });

  it('handles output with leading newline', () => {
    const question = createCodeOutput('\noutput');
    expect(checkAnswer(question, '\noutput')).toBe(true);
  });

  it('handles output with spaces in between values', () => {
    const question = createCodeOutput('3 4');
    expect(checkAnswer(question, '3 4')).toBe(true);
  });

  it('handles output with tabs', () => {
    const question = createCodeOutput('a\tb');
    expect(checkAnswer(question, 'a\tb')).toBe(true);
    expect(checkAnswer(question, 'A\tB')).toBe(true);
  });
});

describe('quiz answers with numeric values', () => {
  it('handles integer answers', () => {
    const question = createCodeOutput('42');
    expect(checkAnswer(question, '42')).toBe(true);
    expect(checkAnswer(question, 42 as unknown as string)).toBe(true);
  });

  it('handles negative integer answers', () => {
    const question = createCodeOutput('-42');
    expect(checkAnswer(question, '-42')).toBe(true);
  });

  it('handles floating point answers', () => {
    const question = createCodeOutput('3.14');
    expect(checkAnswer(question, '3.14')).toBe(true);
  });

  it('handles scientific notation', () => {
    const question = createCodeOutput('1e10');
    expect(checkAnswer(question, '1e10')).toBe(true);
    expect(checkAnswer(question, '1E10')).toBe(true);
  });

  it('handles hexadecimal prefix', () => {
    const question = createCodeOutput('0xff');
    expect(checkAnswer(question, '0xff')).toBe(true);
    expect(checkAnswer(question, '0xFF')).toBe(true);
  });

  it('handles binary prefix', () => {
    const question = createCodeOutput('0b1010');
    expect(checkAnswer(question, '0b1010')).toBe(true);
    expect(checkAnswer(question, '0B1010')).toBe(true);
  });
});

describe('quiz answers with common CS terminology', () => {
  it('handles NULL in various cases', () => {
    const question = createFillBlank('NULL');
    expect(checkAnswer(question, 'NULL')).toBe(true);
    expect(checkAnswer(question, 'null')).toBe(true);
    expect(checkAnswer(question, 'Null')).toBe(true);
  });

  it('handles True/False values', () => {
    const questionTrue = createFillBlank('True');
    expect(checkAnswer(questionTrue, 'True')).toBe(true);
    expect(checkAnswer(questionTrue, 'true')).toBe(true);
    expect(checkAnswer(questionTrue, 'TRUE')).toBe(true);
  });

  it('handles O notation answers', () => {
    const question = createFillBlank('O(n)');
    expect(checkAnswer(question, 'O(n)')).toBe(true);
    expect(checkAnswer(question, 'o(n)')).toBe(true);
  });

  it('handles Θ notation answers', () => {
    const question = createFillBlank('Θ(n log n)');
    expect(checkAnswer(question, 'Θ(n log n)')).toBe(true);
  });

  it('handles Ω notation answers', () => {
    const question = createFillBlank('Ω(n)');
    expect(checkAnswer(question, 'Ω(n)')).toBe(true);
  });
});

describe('normalizeAnswer edge cases', () => {
  it('handles empty string', () => {
    expect(normalizeAnswer('')).toBe('');
  });

  it('handles string with only whitespace', () => {
    expect(normalizeAnswer('   ')).toBe('');
    expect(normalizeAnswer('\t\n\r')).toBe('');
  });

  it('handles string with mixed whitespace', () => {
    expect(normalizeAnswer('  hello  world  ')).toBe('hello  world');
  });

  it('preserves internal newlines while trimming', () => {
    expect(normalizeAnswer('  hello\nworld  ')).toBe('hello\nworld');
  });

  it('handles Unicode whitespace', () => {
    // Non-breaking space (U+00A0)
    expect(normalizeAnswer('\u00A0hello\u00A0')).toBe('hello');
  });

  it('handles very long strings', () => {
    const longStr = 'a'.repeat(10000);
    expect(normalizeAnswer(longStr)).toBe(longStr);
  });

  it('handles strings with null characters', () => {
    expect(normalizeAnswer('hello\0world')).toBe('hello\0world');
  });
});

describe('quiz answers with common typo patterns', () => {
  it('does not accept typos (strict matching)', () => {
    const question = createFillBlank('algorithm');
    // These should NOT match because we do exact matching after normalization
    expect(checkAnswer(question, 'algoritm')).toBe(false); // missing h
    expect(checkAnswer(question, 'algorythm')).toBe(false); // wrong letter
  });

  it('handles correct answers with different casing only', () => {
    const question = createFillBlank('LIFO');
    expect(checkAnswer(question, 'lifo')).toBe(true);
    expect(checkAnswer(question, 'Lifo')).toBe(true);
    expect(checkAnswer(question, 'LiFo')).toBe(true);
  });

  it('handles answers that are substrings (should not match)', () => {
    const question = createFillBlank('function');
    expect(checkAnswer(question, 'func')).toBe(false);
    expect(checkAnswer(question, 'functions')).toBe(false);
  });
});

describe('quiz answers for networking questions', () => {
  it('handles IP addresses', () => {
    const question = createFillBlank('192.168.1.1');
    expect(checkAnswer(question, '192.168.1.1')).toBe(true);
  });

  it('handles subnet masks', () => {
    const question = createFillBlank('255.255.255.0');
    expect(checkAnswer(question, '255.255.255.0')).toBe(true);
  });

  it('handles MAC addresses', () => {
    const question = createFillBlank('AA:BB:CC:DD:EE:FF');
    expect(checkAnswer(question, 'aa:bb:cc:dd:ee:ff')).toBe(true);
    expect(checkAnswer(question, 'AA:BB:CC:DD:EE:FF')).toBe(true);
  });

  it('handles port numbers', () => {
    const question = createFillBlank('80');
    expect(checkAnswer(question, '80')).toBe(true);
  });

  it('handles CIDR notation', () => {
    const question = createFillBlank('/24');
    expect(checkAnswer(question, '/24')).toBe(true);
  });
});
