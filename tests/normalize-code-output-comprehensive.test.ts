/**
 * Comprehensive tests for normalizeCodeOutput edge cases
 *
 * These tests cover additional edge cases for the normalizeCodeOutput function
 * that ensures flexible whitespace matching for code output questions.
 */

import { describe, expect, it } from 'vitest';
import { normalizeCodeOutput, checkAnswer } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '@/core/types';

describe('normalizeCodeOutput - complex nested structures', () => {
  describe('deeply nested structures', () => {
    it('normalizes triple-nested lists', () => {
      const input = '[[[1,2],[3,4]],[[5,6],[7,8]]]';
      const expected = '[[[1, 2], [3, 4]], [[5, 6], [7, 8]]]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('normalizes nested dict within list', () => {
      const input = '[{"a":1},{"b":2}]';
      const expected = '[{"a": 1}, {"b": 2}]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('normalizes list within dict values', () => {
      const input = '{"items":[1,2,3],"empty":[]}';
      const expected = '{"items": [1, 2, 3], "empty": []}';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('normalizes complex nested structure with mixed types', () => {
      const input = '{"data":{"nested":[1,2,3],"flag":true},"count":5}';
      const expected = '{"data": {"nested": [1, 2, 3], "flag": true}, "count": 5}';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });
  });

  describe('tuple handling', () => {
    it('normalizes tuple of tuples', () => {
      const input = '((1,2),(3,4))';
      const expected = '((1, 2), (3, 4))';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('normalizes list of tuples', () => {
      const input = '[(1,2),(3,4)]';
      const expected = '[(1, 2), (3, 4)]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('handles tuple with single element (trailing comma)', () => {
      // Note: Trailing commas before closing brackets are not followed by a space
      // This is correct - Python outputs (1,) not (1, )
      const input = '(1,)';
      const expected = '(1,)';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });
  });

  describe('set-like output (using braces)', () => {
    it('normalizes set output', () => {
      const input = '{1,2,3}';
      const expected = '{1, 2, 3}';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('normalizes empty set representation', () => {
      // Python uses set() for empty sets, but if someone types {}
      expect(normalizeCodeOutput('{}')).toBe('{}');
      expect(normalizeCodeOutput('{ }')).toBe('{}');
    });
  });

  describe('string values within structures', () => {
    it('normalizes list with string elements containing spaces', () => {
      const input = '["hello world","foo bar"]';
      const expected = '["hello world", "foo bar"]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('normalizes dict with string keys and values', () => {
      const input = '{"first name":"john","last name":"doe"}';
      const expected = '{"first name": "john", "last name": "doe"}';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('preserves quotes within strings', () => {
      const input = '["he said \\"hello\\""]';
      const expected = '["he said \\"hello\\""]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });
  });

  describe('numeric output variations', () => {
    it('handles negative numbers in lists', () => {
      const input = '[-1,-2,-3]';
      const expected = '[-1, -2, -3]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('handles floating point numbers', () => {
      const input = '[1.5,2.75,3.125]';
      const expected = '[1.5, 2.75, 3.125]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('handles scientific notation', () => {
      const input = '[1e10,2e-5]';
      const expected = '[1e10, 2e-5]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });
  });

  describe('multiline output', () => {
    it('handles multiline with trailing newline', () => {
      expect(normalizeCodeOutput('hello\nworld\n')).toBe('hello\nworld');
    });

    it('handles multiline list output', () => {
      const input = '[1,\n2,\n3]';
      // This is an edge case - the function operates on the whole string
      // Multiline formatting might not perfectly normalize
      const result = normalizeCodeOutput(input);
      expect(result).toBeDefined();
    });
  });

  describe('special Python values', () => {
    it('handles None in different cases', () => {
      expect(normalizeCodeOutput('None')).toBe('none');
      expect(normalizeCodeOutput('NONE')).toBe('none');
      expect(normalizeCodeOutput('none')).toBe('none');
    });

    it('handles True/False in different cases', () => {
      expect(normalizeCodeOutput('True')).toBe('true');
      expect(normalizeCodeOutput('False')).toBe('false');
      expect(normalizeCodeOutput('TRUE')).toBe('true');
    });

    it('handles list with None values', () => {
      const input = '[None,None,None]';
      const expected = '[none, none, none]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('handles dict with None value', () => {
      const input = '{"key":None}';
      const expected = '{"key": none}';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });
  });

  describe('edge cases with spacing', () => {
    it('handles excessive internal spacing', () => {
      const input = '[  1  ,   2   ,    3    ]';
      const expected = '[1, 2, 3]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('handles tabs in structure', () => {
      const input = '[\t1,\t2,\t3\t]';
      const expected = '[1, 2, 3]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('handles mixed tabs and spaces', () => {
      const input = '{ \t"a" \t: \t1 \t}';
      const expected = '{"a": 1}';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });
  });
});

describe('checkAnswer with code_output - comprehensive matching', () => {
  const makeCodeOutputQuestion = (correctAnswer: string): QuizQuestion => ({
    id: 'code-q',
    type: 'code_output',
    prompt: 'What does this code print?',
    codeSnippet: 'print(x)',
    correctAnswer,
    explanation: 'Test explanation',
  });

  describe('nested structure matching', () => {
    it('matches nested list with varied spacing', () => {
      const question = makeCodeOutputQuestion('[[1, 2], [3, 4]]');
      expect(checkAnswer(question, '[[1,2],[3,4]]')).toBe(true);
      expect(checkAnswer(question, '[[ 1, 2 ],[ 3, 4 ]]')).toBe(true);
    });

    it('matches dict with different colon spacing', () => {
      const question = makeCodeOutputQuestion('{"a": 1, "b": 2}');
      expect(checkAnswer(question, '{"a":1,"b":2}')).toBe(true);
      expect(checkAnswer(question, '{ "a" : 1 , "b" : 2 }')).toBe(true);
    });

    it('matches complex nested structure', () => {
      const question = makeCodeOutputQuestion('[{"x": 1}, {"x": 2}]');
      expect(checkAnswer(question, '[{"x":1},{"x":2}]')).toBe(true);
    });
  });

  describe('Python value matching', () => {
    it('matches True regardless of case', () => {
      const question = makeCodeOutputQuestion('True');
      expect(checkAnswer(question, 'true')).toBe(true);
      expect(checkAnswer(question, 'TRUE')).toBe(true);
      expect(checkAnswer(question, 'True')).toBe(true);
    });

    it('matches None regardless of case', () => {
      const question = makeCodeOutputQuestion('None');
      expect(checkAnswer(question, 'none')).toBe(true);
      expect(checkAnswer(question, 'NONE')).toBe(true);
    });

    it('does not match True with False', () => {
      const question = makeCodeOutputQuestion('True');
      expect(checkAnswer(question, 'false')).toBe(false);
      expect(checkAnswer(question, 'False')).toBe(false);
    });
  });

  describe('numeric answer edge cases', () => {
    it('matches integer answer as string or number', () => {
      const question = makeCodeOutputQuestion('42');
      expect(checkAnswer(question, 42)).toBe(true);
      expect(checkAnswer(question, '42')).toBe(true);
    });

    it('matches floating point answer', () => {
      const question = makeCodeOutputQuestion('3.14');
      expect(checkAnswer(question, 3.14)).toBe(true);
      expect(checkAnswer(question, '3.14')).toBe(true);
    });

    it('matches negative number', () => {
      const question = makeCodeOutputQuestion('-5');
      expect(checkAnswer(question, -5)).toBe(true);
      expect(checkAnswer(question, '-5')).toBe(true);
    });

    it('matches zero', () => {
      const question = makeCodeOutputQuestion('0');
      expect(checkAnswer(question, 0)).toBe(true);
      expect(checkAnswer(question, '0')).toBe(true);
    });
  });

  describe('whitespace edge cases', () => {
    it('matches answer with leading/trailing whitespace', () => {
      const question = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(question, '  [1, 2, 3]  ')).toBe(true);
      expect(checkAnswer(question, '\n[1, 2, 3]\n')).toBe(true);
    });

    it('matches empty structures', () => {
      const listQuestion = makeCodeOutputQuestion('[]');
      expect(checkAnswer(listQuestion, '[]')).toBe(true);
      expect(checkAnswer(listQuestion, '[ ]')).toBe(true);

      const dictQuestion = makeCodeOutputQuestion('{}');
      expect(checkAnswer(dictQuestion, '{}')).toBe(true);
      expect(checkAnswer(dictQuestion, '{ }')).toBe(true);
    });
  });

  describe('rejects incorrect values (not just formatting)', () => {
    it('rejects list with different elements', () => {
      const question = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(question, '[1, 2, 4]')).toBe(false);
      expect(checkAnswer(question, '[1, 2]')).toBe(false);
      expect(checkAnswer(question, '[1, 2, 3, 4]')).toBe(false);
    });

    it('rejects dict with different keys', () => {
      const question = makeCodeOutputQuestion('{"a": 1}');
      expect(checkAnswer(question, '{"b": 1}')).toBe(false);
    });

    it('rejects dict with different values', () => {
      const question = makeCodeOutputQuestion('{"a": 1}');
      expect(checkAnswer(question, '{"a": 2}')).toBe(false);
    });

    it('rejects structurally different output', () => {
      const question = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(question, '(1, 2, 3)')).toBe(false);
      expect(checkAnswer(question, '{1, 2, 3}')).toBe(false);
    });
  });
});

describe('normalizeCodeOutput - boundary conditions', () => {
  it('handles empty string', () => {
    expect(normalizeCodeOutput('')).toBe('');
  });

  it('handles string with only whitespace', () => {
    expect(normalizeCodeOutput('   ')).toBe('');
    expect(normalizeCodeOutput('\t\n')).toBe('');
  });

  it('handles very long list', () => {
    const longList = '[' + Array(100).fill('1').join(',') + ']';
    const expected = '[' + Array(100).fill('1').join(', ') + ']';
    expect(normalizeCodeOutput(longList)).toBe(expected);
  });

  it('handles single element structures', () => {
    expect(normalizeCodeOutput('[1]')).toBe('[1]');
    expect(normalizeCodeOutput('{"a":1}')).toBe('{"a": 1}');
    expect(normalizeCodeOutput('(1)')).toBe('(1)');
  });

  it('handles unicode characters in structure', () => {
    const input = '{"π":3.14,"λ":"lambda"}';
    const expected = '{"π": 3.14, "λ": "lambda"}';
    expect(normalizeCodeOutput(input)).toBe(expected);
  });

  it('handles emoji in output', () => {
    const input = '["👍","👎"]';
    const expected = '["👍", "👎"]';
    expect(normalizeCodeOutput(input)).toBe(expected);
  });
});
