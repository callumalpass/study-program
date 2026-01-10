/**
 * Code Output Answer Matching Tests
 *
 * Comprehensive tests for the checkAnswer function specifically for code_output
 * question types. These tests ensure that normalizeCodeOutput correctly handles
 * various edge cases including:
 * - Python data structure output formats
 * - Whitespace normalization around punctuation
 * - Multiline output handling
 * - Type coercion edge cases
 * - Real-world quiz answer scenarios
 */

import { describe, it, expect } from 'vitest';
import { checkAnswer, normalizeCodeOutput } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

// Helper to create a code_output question
const createCodeOutputQuestion = (
  id: string,
  correctAnswer: string | number | boolean,
  codeSnippet = 'print("test")'
): QuizQuestion => ({
  id,
  type: 'code_output',
  prompt: `Question ${id}`,
  codeSnippet,
  correctAnswer,
  explanation: 'Explanation',
});

describe('Code Output Answer Matching', () => {
  describe('Python list output variations', () => {
    it('matches list with no spaces', () => {
      const question = createCodeOutputQuestion('q1', '[1, 2, 3]');
      expect(checkAnswer(question, '[1,2,3]')).toBe(true);
    });

    it('matches list with extra spaces', () => {
      const question = createCodeOutputQuestion('q1', '[1, 2, 3]');
      expect(checkAnswer(question, '[  1  ,  2  ,  3  ]')).toBe(true);
    });

    it('matches list with leading/trailing spaces', () => {
      const question = createCodeOutputQuestion('q1', '[1, 2, 3]');
      expect(checkAnswer(question, '  [1, 2, 3]  ')).toBe(true);
    });

    it('matches nested lists with various spacing', () => {
      const question = createCodeOutputQuestion('q1', '[[1, 2], [3, 4]]');
      expect(checkAnswer(question, '[[1,2],[3,4]]')).toBe(true);
      expect(checkAnswer(question, '[[ 1 , 2 ] , [ 3 , 4 ]]')).toBe(true);
    });

    it('matches empty list', () => {
      const question = createCodeOutputQuestion('q1', '[]');
      expect(checkAnswer(question, '[]')).toBe(true);
      expect(checkAnswer(question, '[ ]')).toBe(true);
    });

    it('matches list of strings', () => {
      const question = createCodeOutputQuestion('q1', "['a', 'b', 'c']");
      expect(checkAnswer(question, "['a','b','c']")).toBe(true);
    });
  });

  describe('Python dict output variations', () => {
    it('matches dict with no spaces after colon', () => {
      const question = createCodeOutputQuestion('q1', "{'a': 1, 'b': 2}");
      expect(checkAnswer(question, "{'a':1,'b':2}")).toBe(true);
    });

    it('matches dict with extra spaces', () => {
      const question = createCodeOutputQuestion('q1', "{'a': 1, 'b': 2}");
      expect(checkAnswer(question, "{ 'a' : 1 , 'b' : 2 }")).toBe(true);
    });

    it('matches empty dict', () => {
      const question = createCodeOutputQuestion('q1', '{}');
      expect(checkAnswer(question, '{}')).toBe(true);
      expect(checkAnswer(question, '{ }')).toBe(true);
    });

    it('matches nested dict', () => {
      const question = createCodeOutputQuestion('q1', "{'a': {'b': 1}}");
      expect(checkAnswer(question, "{'a':{'b':1}}")).toBe(true);
    });
  });

  describe('Python tuple output variations', () => {
    it('matches tuple with no spaces', () => {
      const question = createCodeOutputQuestion('q1', '(1, 2, 3)');
      expect(checkAnswer(question, '(1,2,3)')).toBe(true);
    });

    it('matches tuple with extra spaces', () => {
      const question = createCodeOutputQuestion('q1', '(1, 2, 3)');
      expect(checkAnswer(question, '( 1 , 2 , 3 )')).toBe(true);
    });

    it('matches empty tuple', () => {
      const question = createCodeOutputQuestion('q1', '()');
      expect(checkAnswer(question, '()')).toBe(true);
      expect(checkAnswer(question, '( )')).toBe(true);
    });

    it('matches single-element tuple', () => {
      const question = createCodeOutputQuestion('q1', '(1,)');
      expect(checkAnswer(question, '(1,)')).toBe(true);
      expect(checkAnswer(question, '( 1 , )')).toBe(true);
    });
  });

  describe('Python set output variations', () => {
    it('matches set with no spaces', () => {
      const question = createCodeOutputQuestion('q1', '{1, 2, 3}');
      expect(checkAnswer(question, '{1,2,3}')).toBe(true);
    });

    it('matches set with extra spaces', () => {
      const question = createCodeOutputQuestion('q1', '{1, 2, 3}');
      expect(checkAnswer(question, '{ 1 , 2 , 3 }')).toBe(true);
    });
  });

  describe('Case sensitivity', () => {
    it('matches True/False case-insensitively', () => {
      const questionTrue = createCodeOutputQuestion('q1', 'True');
      expect(checkAnswer(questionTrue, 'true')).toBe(true);
      expect(checkAnswer(questionTrue, 'TRUE')).toBe(true);
      expect(checkAnswer(questionTrue, 'True')).toBe(true);

      const questionFalse = createCodeOutputQuestion('q2', 'False');
      expect(checkAnswer(questionFalse, 'false')).toBe(true);
      expect(checkAnswer(questionFalse, 'FALSE')).toBe(true);
    });

    it('matches None case-insensitively', () => {
      const question = createCodeOutputQuestion('q1', 'None');
      expect(checkAnswer(question, 'none')).toBe(true);
      expect(checkAnswer(question, 'NONE')).toBe(true);
    });

    it('matches string output case-insensitively', () => {
      const question = createCodeOutputQuestion('q1', 'Hello World');
      expect(checkAnswer(question, 'hello world')).toBe(true);
      expect(checkAnswer(question, 'HELLO WORLD')).toBe(true);
    });
  });

  describe('Numeric answers', () => {
    it('matches integer output', () => {
      const question = createCodeOutputQuestion('q1', '42');
      expect(checkAnswer(question, 42)).toBe(true);
      expect(checkAnswer(question, '42')).toBe(true);
    });

    it('matches float output', () => {
      const question = createCodeOutputQuestion('q1', '3.14');
      expect(checkAnswer(question, 3.14)).toBe(true);
      expect(checkAnswer(question, '3.14')).toBe(true);
    });

    it('matches negative numbers', () => {
      const question = createCodeOutputQuestion('q1', '-5');
      expect(checkAnswer(question, -5)).toBe(true);
      expect(checkAnswer(question, '-5')).toBe(true);
    });

    it('matches zero', () => {
      const question = createCodeOutputQuestion('q1', '0');
      expect(checkAnswer(question, 0)).toBe(true);
      expect(checkAnswer(question, '0')).toBe(true);
    });

    it('rejects incorrect numeric answers', () => {
      const question = createCodeOutputQuestion('q1', '42');
      expect(checkAnswer(question, 43)).toBe(false);
      expect(checkAnswer(question, '43')).toBe(false);
    });
  });

  describe('Multiline output', () => {
    it('matches multiline output with same newlines', () => {
      const question = createCodeOutputQuestion('q1', 'line1\nline2\nline3');
      expect(checkAnswer(question, 'line1\nline2\nline3')).toBe(true);
    });

    it('handles case insensitivity in multiline', () => {
      const question = createCodeOutputQuestion('q1', 'Line1\nLine2');
      expect(checkAnswer(question, 'line1\nline2')).toBe(true);
    });

    it('trims leading/trailing whitespace in multiline', () => {
      const question = createCodeOutputQuestion('q1', 'line1\nline2');
      expect(checkAnswer(question, '  line1\nline2  ')).toBe(true);
    });
  });

  describe('Special characters and edge cases', () => {
    it('matches output with special characters', () => {
      const question = createCodeOutputQuestion('q1', 'Hello, World!');
      expect(checkAnswer(question, 'hello, world!')).toBe(true);
    });

    it('matches output with quotes', () => {
      const question = createCodeOutputQuestion('q1', '"hello"');
      expect(checkAnswer(question, '"hello"')).toBe(true);
    });

    it('matches empty string output', () => {
      const question = createCodeOutputQuestion('q1', '');
      expect(checkAnswer(question, '')).toBe(true);
      expect(checkAnswer(question, '   ')).toBe(true);
    });

    it('rejects null/undefined answers', () => {
      const question = createCodeOutputQuestion('q1', 'answer');
      expect(checkAnswer(question, null)).toBe(false);
      expect(checkAnswer(question, undefined)).toBe(false);
    });
  });

  describe('Real-world quiz scenarios', () => {
    it('matches print statement output', () => {
      const question = createCodeOutputQuestion(
        'q1',
        '10',
        'x = 5\ny = 5\nprint(x + y)'
      );
      expect(checkAnswer(question, '10')).toBe(true);
      expect(checkAnswer(question, 10)).toBe(true);
    });

    it('matches type name output', () => {
      const question = createCodeOutputQuestion(
        'q1',
        'str',
        'print(type("hello").__name__)'
      );
      expect(checkAnswer(question, 'str')).toBe(true);
      expect(checkAnswer(question, 'STR')).toBe(true);
    });

    it('matches list comprehension output', () => {
      const question = createCodeOutputQuestion(
        'q1',
        '[0, 1, 4, 9, 16]',
        'print([x**2 for x in range(5)])'
      );
      expect(checkAnswer(question, '[0,1,4,9,16]')).toBe(true);
      expect(checkAnswer(question, '[0, 1, 4, 9, 16]')).toBe(true);
    });

    it('matches f-string output', () => {
      const question = createCodeOutputQuestion(
        'q1',
        'Name: Alice',
        'name = "Alice"\nprint(f"Name: {name}")'
      );
      expect(checkAnswer(question, 'name: alice')).toBe(true);
    });

    it('matches division result', () => {
      const question = createCodeOutputQuestion(
        'q1',
        '2.5',
        'print(5 / 2)'
      );
      expect(checkAnswer(question, '2.5')).toBe(true);
      expect(checkAnswer(question, 2.5)).toBe(true);
    });

    it('matches floor division result', () => {
      const question = createCodeOutputQuestion(
        'q1',
        '2',
        'print(5 // 2)'
      );
      expect(checkAnswer(question, '2')).toBe(true);
      expect(checkAnswer(question, 2)).toBe(true);
    });

    it('matches modulo result', () => {
      const question = createCodeOutputQuestion(
        'q1',
        '1',
        'print(5 % 2)'
      );
      expect(checkAnswer(question, '1')).toBe(true);
      expect(checkAnswer(question, 1)).toBe(true);
    });
  });

  describe('Slice notation edge case', () => {
    // This documents the current behavior where slice notation colons get normalized
    it('normalizes slice notation consistently', () => {
      // Both sides get normalized the same way, so they still match
      expect(normalizeCodeOutput('arr[1:3]')).toBe(normalizeCodeOutput('arr[1: 3]'));
      expect(normalizeCodeOutput('arr[1:3]')).toBe(normalizeCodeOutput('arr[1 : 3]'));
    });

    it('matches slice output when both sides are normalized', () => {
      const question = createCodeOutputQuestion('q1', 'arr[1:3]');
      expect(checkAnswer(question, 'arr[1:3]')).toBe(true);
      expect(checkAnswer(question, 'arr[1: 3]')).toBe(true);
    });
  });

  describe('Boolean type coercion', () => {
    it('matches boolean true to string "true"', () => {
      const question = createCodeOutputQuestion('q1', 'true');
      expect(checkAnswer(question, true)).toBe(true);
    });

    it('matches boolean false to string "false"', () => {
      const question = createCodeOutputQuestion('q1', 'false');
      expect(checkAnswer(question, false)).toBe(true);
    });

    it('matches Python True (capital) to boolean true', () => {
      const question = createCodeOutputQuestion('q1', 'True');
      expect(checkAnswer(question, true)).toBe(true);
    });
  });

  describe('Trailing commas and edge formatting', () => {
    it('handles trailing comma in list', () => {
      const question = createCodeOutputQuestion('q1', '[1, 2, 3,]');
      expect(checkAnswer(question, '[1,2,3,]')).toBe(true);
    });

    it('handles trailing comma in tuple', () => {
      const question = createCodeOutputQuestion('q1', '(1,)');
      expect(checkAnswer(question, '(1, )')).toBe(true);
    });
  });

  describe('Unicode and special content', () => {
    it('matches unicode characters in output', () => {
      const question = createCodeOutputQuestion('q1', 'π');
      expect(checkAnswer(question, 'π')).toBe(true);
    });

    it('matches Greek letters case-insensitively', () => {
      const question = createCodeOutputQuestion('q1', 'Σ');
      expect(checkAnswer(question, 'σ')).toBe(true);
    });

    it('matches emoji output', () => {
      const question = createCodeOutputQuestion('q1', '👍');
      expect(checkAnswer(question, '👍')).toBe(true);
    });
  });

  describe('Complex nested structures', () => {
    it('matches list of dicts', () => {
      const question = createCodeOutputQuestion('q1', "[{'a': 1}, {'b': 2}]");
      expect(checkAnswer(question, "[{'a':1},{'b':2}]")).toBe(true);
    });

    it('matches dict of lists', () => {
      const question = createCodeOutputQuestion('q1', "{'nums': [1, 2, 3]}");
      expect(checkAnswer(question, "{'nums':[1,2,3]}")).toBe(true);
    });

    it('matches deeply nested structure', () => {
      const question = createCodeOutputQuestion('q1', "{'a': {'b': {'c': [1, 2]}}}");
      expect(checkAnswer(question, "{'a':{'b':{'c':[1,2]}}}")).toBe(true);
    });
  });
});
