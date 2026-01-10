/**
 * Quiz Utils Code Output Edge Cases Tests
 *
 * These tests focus on edge cases for code_output question answer normalization,
 * ensuring that various whitespace and formatting variations are handled correctly.
 */

import { describe, it, expect } from 'vitest';
import { normalizeCodeOutput, checkAnswer } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

describe('normalizeCodeOutput', () => {
  describe('basic normalization', () => {
    it('should convert to lowercase', () => {
      expect(normalizeCodeOutput('HELLO')).toBe('hello');
      expect(normalizeCodeOutput('Hello World')).toBe('hello world');
    });

    it('should trim leading and trailing whitespace', () => {
      expect(normalizeCodeOutput('  hello  ')).toBe('hello');
      expect(normalizeCodeOutput('\thello\n')).toBe('hello');
    });

    it('should handle null, undefined, and empty values', () => {
      expect(normalizeCodeOutput(null)).toBe('');
      expect(normalizeCodeOutput(undefined)).toBe('');
      expect(normalizeCodeOutput('')).toBe('');
    });

    it('should convert numbers to strings', () => {
      expect(normalizeCodeOutput(42)).toBe('42');
      expect(normalizeCodeOutput(3.14)).toBe('3.14');
      expect(normalizeCodeOutput(0)).toBe('0');
      expect(normalizeCodeOutput(-5)).toBe('-5');
    });

    it('should convert booleans to strings', () => {
      expect(normalizeCodeOutput(true)).toBe('true');
      expect(normalizeCodeOutput(false)).toBe('false');
    });
  });

  describe('comma spacing normalization', () => {
    it('should normalize comma spacing in lists', () => {
      expect(normalizeCodeOutput('[1,2,3]')).toBe('[1, 2, 3]');
      expect(normalizeCodeOutput('[1, 2, 3]')).toBe('[1, 2, 3]');
      expect(normalizeCodeOutput('[1 , 2 , 3]')).toBe('[1, 2, 3]');
      expect(normalizeCodeOutput('[1,  2,  3]')).toBe('[1, 2, 3]');
    });

    it('should normalize comma spacing in tuples', () => {
      expect(normalizeCodeOutput('(1,2,3)')).toBe('(1, 2, 3)');
      expect(normalizeCodeOutput('(1, 2, 3)')).toBe('(1, 2, 3)');
      expect(normalizeCodeOutput('( 1, 2, 3 )')).toBe('(1, 2, 3)');
    });

    it('should normalize comma spacing in dictionaries', () => {
      expect(normalizeCodeOutput("{a:1,b:2}")).toBe("{a: 1, b: 2}");
      expect(normalizeCodeOutput("{a: 1, b: 2}")).toBe("{a: 1, b: 2}");
      expect(normalizeCodeOutput("{ a : 1 , b : 2 }")).toBe("{a: 1, b: 2}");
    });
  });

  describe('colon spacing normalization', () => {
    it('should normalize colon spacing in dictionaries', () => {
      expect(normalizeCodeOutput('{a:1}')).toBe('{a: 1}');
      expect(normalizeCodeOutput('{a: 1}')).toBe('{a: 1}');
      expect(normalizeCodeOutput('{a : 1}')).toBe('{a: 1}');
      expect(normalizeCodeOutput('{ a : 1 }')).toBe('{a: 1}');
    });

    it('should handle nested structures', () => {
      expect(normalizeCodeOutput('{a:{b:1}}')).toBe('{a: {b: 1}}');
      expect(normalizeCodeOutput('{a: {b: 1}}')).toBe('{a: {b: 1}}');
    });
  });

  describe('bracket spacing normalization', () => {
    it('should remove spaces after opening brackets', () => {
      expect(normalizeCodeOutput('[ 1, 2, 3 ]')).toBe('[1, 2, 3]');
      expect(normalizeCodeOutput('(  a, b  )')).toBe('(a, b)');
      expect(normalizeCodeOutput('{  x  }')).toBe('{x}');
    });

    it('should remove spaces before closing brackets', () => {
      expect(normalizeCodeOutput('[1, 2, 3 ]')).toBe('[1, 2, 3]');
      expect(normalizeCodeOutput('(a, b )')).toBe('(a, b)');
      expect(normalizeCodeOutput('{x }')).toBe('{x}');
    });

    it('should handle empty containers', () => {
      expect(normalizeCodeOutput('[]')).toBe('[]');
      expect(normalizeCodeOutput('[ ]')).toBe('[]');
      expect(normalizeCodeOutput('()')).toBe('()');
      expect(normalizeCodeOutput('( )')).toBe('()');
      expect(normalizeCodeOutput('{}')).toBe('{}');
      expect(normalizeCodeOutput('{ }')).toBe('{}');
    });
  });

  describe('complex output patterns', () => {
    it('should handle Python list output', () => {
      const expected = normalizeCodeOutput('[1, 2, 3, 4, 5]');
      expect(normalizeCodeOutput('[1,2,3,4,5]')).toBe(expected);
      expect(normalizeCodeOutput('[ 1, 2, 3, 4, 5 ]')).toBe(expected);
    });

    it('should handle Python dict output', () => {
      const expected = normalizeCodeOutput("{'key': 'value'}");
      expect(normalizeCodeOutput("{'key':'value'}")).toBe(expected);
      expect(normalizeCodeOutput("{ 'key' : 'value' }")).toBe(expected);
    });

    it('should handle Python set output (sorted representation)', () => {
      expect(normalizeCodeOutput('{1, 2, 3}')).toBe('{1, 2, 3}');
      expect(normalizeCodeOutput('{1,2,3}')).toBe('{1, 2, 3}');
    });

    it('should handle function output', () => {
      expect(normalizeCodeOutput('None')).toBe('none');
      expect(normalizeCodeOutput('True')).toBe('true');
      expect(normalizeCodeOutput('False')).toBe('false');
    });

    it('should handle multi-value output', () => {
      expect(normalizeCodeOutput('2 1')).toBe('2 1');
      expect(normalizeCodeOutput('  2   1  ')).toBe('2 1'); // Multiple spaces normalized to single
    });

    it('should handle type output', () => {
      expect(normalizeCodeOutput('str')).toBe('str');
      expect(normalizeCodeOutput('int')).toBe('int');
      expect(normalizeCodeOutput('list')).toBe('list');
    });
  });
});

describe('checkAnswer for code_output questions', () => {
  const createCodeOutputQuestion = (correctAnswer: string): QuizQuestion => ({
    id: 'test',
    type: 'code_output',
    prompt: 'What is the output?',
    codeSnippet: 'print("test")',
    correctAnswer,
    explanation: 'Test explanation',
  });

  it('should accept answers with different comma spacing', () => {
    const question = createCodeOutputQuestion('[1, 2, 3]');
    expect(checkAnswer(question, '[1,2,3]')).toBe(true);
    expect(checkAnswer(question, '[1, 2, 3]')).toBe(true);
    expect(checkAnswer(question, '[ 1, 2, 3 ]')).toBe(true);
  });

  it('should accept answers with different case', () => {
    const question = createCodeOutputQuestion('true');
    expect(checkAnswer(question, 'True')).toBe(true);
    expect(checkAnswer(question, 'TRUE')).toBe(true);
    expect(checkAnswer(question, 'true')).toBe(true);
  });

  it('should accept dict answers with different spacing', () => {
    const question = createCodeOutputQuestion("{'a': 1}");
    expect(checkAnswer(question, "{'a':1}")).toBe(true);
    expect(checkAnswer(question, "{ 'a' : 1 }")).toBe(true);
  });

  it('should reject incorrect answers', () => {
    const question = createCodeOutputQuestion('[1, 2, 3]');
    expect(checkAnswer(question, '[1, 2]')).toBe(false);
    expect(checkAnswer(question, '[1, 2, 3, 4]')).toBe(false);
    expect(checkAnswer(question, '(1, 2, 3)')).toBe(false);
  });

  it('should handle numeric answers', () => {
    const question = createCodeOutputQuestion('42');
    expect(checkAnswer(question, '42')).toBe(true);
    expect(checkAnswer(question, ' 42 ')).toBe(true);
    expect(checkAnswer(question, 42)).toBe(true);
    expect(checkAnswer(question, '43')).toBe(false);
  });

  it('should handle float answers', () => {
    const question = createCodeOutputQuestion('2.5');
    expect(checkAnswer(question, '2.5')).toBe(true);
    expect(checkAnswer(question, 2.5)).toBe(true);
    expect(checkAnswer(question, '2.50')).toBe(false); // Different representation
  });

  it('should handle null and undefined user answers', () => {
    const question = createCodeOutputQuestion('hello');
    expect(checkAnswer(question, null)).toBe(false);
    expect(checkAnswer(question, undefined)).toBe(false);
  });
});

describe('Real code_output question scenarios', () => {
  it('should handle Python division output', () => {
    const question: QuizQuestion = {
      id: 'test',
      type: 'code_output',
      prompt: 'What will this code print?',
      codeSnippet: 'x = 5\ny = 2\nprint(x / y)',
      correctAnswer: '2.5',
      explanation: 'The / operator performs floating-point division',
    };

    expect(checkAnswer(question, '2.5')).toBe(true);
    expect(checkAnswer(question, '  2.5  ')).toBe(true);
    expect(checkAnswer(question, 2.5)).toBe(true);
  });

  it('should handle Python integer division output', () => {
    const question: QuizQuestion = {
      id: 'test',
      type: 'code_output',
      prompt: 'What will this code print?',
      codeSnippet: 'a = 10\nb = 3\nprint(a // b)',
      correctAnswer: '3',
      explanation: 'The // operator performs integer (floor) division',
    };

    expect(checkAnswer(question, '3')).toBe(true);
    expect(checkAnswer(question, 3)).toBe(true);
    expect(checkAnswer(question, '3.0')).toBe(false); // Wrong representation
  });

  it('should handle Python f-string output', () => {
    const question: QuizQuestion = {
      id: 'test',
      type: 'code_output',
      prompt: 'What will this code print?',
      codeSnippet: 'name = "Alice"\nprint(f"Name: {name}")',
      correctAnswer: 'Name: Alice',
      explanation: 'f-strings embed expressions inside curly braces',
    };

    expect(checkAnswer(question, 'Name: Alice')).toBe(true);
    expect(checkAnswer(question, 'name: alice')).toBe(true); // Case insensitive
    expect(checkAnswer(question, 'Name:Alice')).toBe(true); // Colon normalization
  });

  it('should handle Python type output', () => {
    const question: QuizQuestion = {
      id: 'test',
      type: 'code_output',
      prompt: 'What will this code print?',
      codeSnippet: 'x = "5"\nprint(type(x).__name__)',
      correctAnswer: 'str',
      explanation: 'The value is a string because it is enclosed in quotes',
    };

    expect(checkAnswer(question, 'str')).toBe(true);
    expect(checkAnswer(question, 'STR')).toBe(true);
    expect(checkAnswer(question, '  str  ')).toBe(true);
  });

  it('should handle Python tuple swap output', () => {
    const question: QuizQuestion = {
      id: 'test',
      type: 'code_output',
      prompt: 'What will this code print?',
      codeSnippet: 'a, b = 1, 2\na, b = b, a\nprint(a, b)',
      correctAnswer: '2 1',
      explanation: 'Tuple unpacking swaps the values',
    };

    expect(checkAnswer(question, '2 1')).toBe(true);
    expect(checkAnswer(question, '  2 1  ')).toBe(true);
    // Note: Multiple spaces between values are preserved
  });

  it('should handle Python binary output', () => {
    const question: QuizQuestion = {
      id: 'test',
      type: 'code_output',
      prompt: 'What is the output?',
      codeSnippet: 'print(bin(5 << 2))',
      correctAnswer: '0b10100',
      explanation: '5 shifted left 2 bits is 20 (0b10100)',
    };

    expect(checkAnswer(question, '0b10100')).toBe(true);
    expect(checkAnswer(question, '0B10100')).toBe(true); // Case insensitive
  });
});
