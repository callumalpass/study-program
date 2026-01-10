/**
 * Code Output Normalization Tests
 *
 * Comprehensive tests for the normalizeCodeOutput function in quiz-utils.
 * This function normalizes code output answers to be more forgiving of
 * whitespace differences around punctuation, which is critical for
 * code_output quiz questions.
 */

import { describe, expect, it } from 'vitest';
import { normalizeCodeOutput, checkAnswer } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

describe('normalizeCodeOutput', () => {
  describe('basic normalization', () => {
    it('trims leading and trailing whitespace', () => {
      expect(normalizeCodeOutput('  hello  ')).toBe('hello');
      expect(normalizeCodeOutput('\n\tvalue\n')).toBe('value');
    });

    it('lowercases the input', () => {
      expect(normalizeCodeOutput('HELLO')).toBe('hello');
      expect(normalizeCodeOutput('Hello World')).toBe('hello world');
    });

    it('handles null and undefined', () => {
      expect(normalizeCodeOutput(null)).toBe('');
      expect(normalizeCodeOutput(undefined)).toBe('');
    });

    it('converts numbers to strings', () => {
      expect(normalizeCodeOutput(42)).toBe('42');
      expect(normalizeCodeOutput(3.14159)).toBe('3.14159');
      expect(normalizeCodeOutput(-10)).toBe('-10');
    });

    it('converts booleans to strings', () => {
      expect(normalizeCodeOutput(true)).toBe('true');
      expect(normalizeCodeOutput(false)).toBe('false');
    });
  });

  describe('comma spacing normalization', () => {
    it('normalizes no space after comma', () => {
      expect(normalizeCodeOutput('[1,2,3]')).toBe('[1, 2, 3]');
    });

    it('normalizes multiple spaces after comma', () => {
      expect(normalizeCodeOutput('[1,   2,  3]')).toBe('[1, 2, 3]');
    });

    it('normalizes space before comma', () => {
      expect(normalizeCodeOutput('[1 , 2 , 3]')).toBe('[1, 2, 3]');
    });

    it('normalizes spaces both before and after comma', () => {
      expect(normalizeCodeOutput('[1 ,  2  ,  3]')).toBe('[1, 2, 3]');
    });

    it('handles nested structures with commas', () => {
      expect(normalizeCodeOutput('[[1,2],[3,4]]')).toBe('[[1, 2], [3, 4]]');
    });
  });

  describe('colon spacing normalization', () => {
    it('normalizes no space after colon', () => {
      expect(normalizeCodeOutput('{"a":1}')).toBe('{"a": 1}');
    });

    it('normalizes multiple spaces after colon', () => {
      expect(normalizeCodeOutput('{"a":   1}')).toBe('{"a": 1}');
    });

    it('normalizes space before colon', () => {
      expect(normalizeCodeOutput('{"a" : 1}')).toBe('{"a": 1}');
    });

    it('handles multiple key-value pairs', () => {
      expect(normalizeCodeOutput('{"a":1,"b":2}')).toBe('{"a": 1, "b": 2}');
    });
  });

  describe('bracket spacing normalization', () => {
    it('removes space after opening bracket', () => {
      expect(normalizeCodeOutput('[ 1, 2, 3 ]')).toBe('[1, 2, 3]');
    });

    it('removes space before closing bracket', () => {
      expect(normalizeCodeOutput('[1, 2, 3 ]')).toBe('[1, 2, 3]');
    });

    it('removes spaces after opening and before closing brackets', () => {
      expect(normalizeCodeOutput('[  1, 2, 3  ]')).toBe('[1, 2, 3]');
    });

    it('handles nested brackets', () => {
      expect(normalizeCodeOutput('[ [ 1 ], [ 2 ] ]')).toBe('[[1], [2]]');
    });
  });

  describe('parentheses spacing normalization', () => {
    it('removes space after opening parenthesis', () => {
      expect(normalizeCodeOutput('( a, b )')).toBe('(a, b)');
    });

    it('removes space before closing parenthesis', () => {
      expect(normalizeCodeOutput('(a, b )')).toBe('(a, b)');
    });

    it('handles function-like output', () => {
      expect(normalizeCodeOutput('foo( 1,  2 )')).toBe('foo(1, 2)');
    });

    it('handles tuples', () => {
      expect(normalizeCodeOutput('( 1 , 2 , 3 )')).toBe('(1, 2, 3)');
    });
  });

  describe('brace spacing normalization', () => {
    it('removes space after opening brace', () => {
      expect(normalizeCodeOutput('{ key: value }')).toBe('{key: value}');
    });

    it('removes space before closing brace', () => {
      expect(normalizeCodeOutput('{key: value }')).toBe('{key: value}');
    });

    it('handles empty braces', () => {
      expect(normalizeCodeOutput('{ }')).toBe('{}');
    });
  });

  describe('combined normalizations', () => {
    it('handles complex Python list output', () => {
      const input = '[ 1 ,  2 ,   3 ]';
      const expected = '[1, 2, 3]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('handles complex Python dict output', () => {
      const input = "{ 'a' :   1 ,  'b'  :  2 }";
      const expected = "{'a': 1, 'b': 2}";
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('handles nested data structures', () => {
      const input = '{ "items" :   [ 1 , 2 ,  3 ] }';
      const expected = '{"items": [1, 2, 3]}';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });

    it('handles tuple output', () => {
      expect(normalizeCodeOutput('(1,2,3)')).toBe('(1, 2, 3)');
    });

    it('handles mixed brackets and parentheses', () => {
      const input = '[ ( 1 , 2 ) ,  ( 3 , 4 ) ]';
      const expected = '[(1, 2), (3, 4)]';
      expect(normalizeCodeOutput(input)).toBe(expected);
    });
  });

  describe('real-world code output examples', () => {
    it('matches Python list comprehension output', () => {
      const studentAnswer = '[1,4,9,16,25]';
      const correctAnswer = '[1, 4, 9, 16, 25]';
      expect(normalizeCodeOutput(studentAnswer)).toBe(normalizeCodeOutput(correctAnswer));
    });

    it('matches Python dict output', () => {
      const studentAnswer = "{'name':'alice','age':25}";
      const correctAnswer = "{'name': 'alice', 'age': 25}";
      expect(normalizeCodeOutput(studentAnswer)).toBe(normalizeCodeOutput(correctAnswer));
    });

    it('matches range output', () => {
      expect(normalizeCodeOutput('[0,1,2,3,4]')).toBe(normalizeCodeOutput('[0, 1, 2, 3, 4]'));
    });

    it('matches set output', () => {
      expect(normalizeCodeOutput('{1,2,3}')).toBe(normalizeCodeOutput('{1, 2, 3}'));
    });

    it('matches enumerate output', () => {
      expect(normalizeCodeOutput('[(0,a),(1,b)]')).toBe(normalizeCodeOutput('[(0, a), (1, b)]'));
    });
  });
});

describe('checkAnswer with code_output questions', () => {
  const makeCodeOutputQuestion = (correctAnswer: string | number): QuizQuestion => ({
    id: 'test-q',
    type: 'code_output',
    prompt: 'What is the output?',
    correctAnswer,
    explanation: 'Test explanation',
  });

  describe('basic matching', () => {
    it('matches exact string', () => {
      const q = makeCodeOutputQuestion('hello');
      expect(checkAnswer(q, 'hello')).toBe(true);
    });

    it('matches case-insensitively', () => {
      const q = makeCodeOutputQuestion('Hello World');
      expect(checkAnswer(q, 'hello world')).toBe(true);
    });

    it('matches with whitespace trimmed', () => {
      const q = makeCodeOutputQuestion('hello');
      expect(checkAnswer(q, '  hello  ')).toBe(true);
    });
  });

  describe('list output matching', () => {
    it('matches list without spaces', () => {
      const q = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(q, '[1,2,3]')).toBe(true);
    });

    it('matches list with extra spaces', () => {
      const q = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(q, '[ 1 , 2 , 3 ]')).toBe(true);
    });

    it('matches nested lists', () => {
      const q = makeCodeOutputQuestion('[[1, 2], [3, 4]]');
      expect(checkAnswer(q, '[[1,2],[3,4]]')).toBe(true);
    });
  });

  describe('dict output matching', () => {
    it('matches dict without spaces', () => {
      const q = makeCodeOutputQuestion("{'a': 1, 'b': 2}");
      expect(checkAnswer(q, "{'a':1,'b':2}")).toBe(true);
    });

    it('matches dict with extra spaces', () => {
      const q = makeCodeOutputQuestion("{'a': 1, 'b': 2}");
      expect(checkAnswer(q, "{ 'a' : 1 , 'b' : 2 }")).toBe(true);
    });
  });

  describe('numeric output matching', () => {
    it('matches integer output', () => {
      const q = makeCodeOutputQuestion('42');
      expect(checkAnswer(q, '42')).toBe(true);
      expect(checkAnswer(q, ' 42 ')).toBe(true);
    });

    it('matches float output', () => {
      const q = makeCodeOutputQuestion('3.14');
      expect(checkAnswer(q, '3.14')).toBe(true);
    });

    it('matches numeric correctAnswer with string answer', () => {
      const q = makeCodeOutputQuestion(42);
      expect(checkAnswer(q, '42')).toBe(true);
    });
  });

  describe('tuple output matching', () => {
    it('matches tuple without spaces', () => {
      const q = makeCodeOutputQuestion('(1, 2, 3)');
      expect(checkAnswer(q, '(1,2,3)')).toBe(true);
    });

    it('matches tuple with extra spaces', () => {
      const q = makeCodeOutputQuestion('(1, 2, 3)');
      expect(checkAnswer(q, '( 1 , 2 , 3 )')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('returns false for undefined answer', () => {
      const q = makeCodeOutputQuestion('42');
      expect(checkAnswer(q, undefined)).toBe(false);
    });

    it('returns false for null answer', () => {
      const q = makeCodeOutputQuestion('42');
      expect(checkAnswer(q, null)).toBe(false);
    });

    it('returns false for incorrect answer', () => {
      const q = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(q, '[1, 2, 4]')).toBe(false);
    });

    it('handles empty string output', () => {
      const q = makeCodeOutputQuestion('');
      expect(checkAnswer(q, '')).toBe(true);
      expect(checkAnswer(q, '   ')).toBe(true);
    });

    it('handles None/null string output', () => {
      const q = makeCodeOutputQuestion('none');
      expect(checkAnswer(q, 'None')).toBe(true);
    });

    it('handles boolean string output', () => {
      const q = makeCodeOutputQuestion('true');
      expect(checkAnswer(q, 'True')).toBe(true);
    });
  });
});
