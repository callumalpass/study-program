/**
 * Quiz Utils Code Output Tests
 *
 * Tests the normalizeCodeOutput function and its integration with checkAnswer
 * for code_output question types. This function provides flexible whitespace
 * matching so that "[1,2,3]" matches "[1, 2, 3]".
 */

import { describe, expect, it } from 'vitest';
import {
  normalizeCodeOutput,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { QuizQuestion } from '@/core/types';

describe('normalizeCodeOutput', () => {
  describe('basic functionality', () => {
    it('converts to lowercase', () => {
      expect(normalizeCodeOutput('HELLO')).toBe('hello');
      expect(normalizeCodeOutput('Hello World')).toBe('hello world');
    });

    it('trims whitespace', () => {
      expect(normalizeCodeOutput('  hello  ')).toBe('hello');
      expect(normalizeCodeOutput('\n\thello\t\n')).toBe('hello');
    });

    it('handles null and undefined', () => {
      expect(normalizeCodeOutput(null)).toBe('');
      expect(normalizeCodeOutput(undefined)).toBe('');
    });

    it('converts numbers to strings', () => {
      expect(normalizeCodeOutput(42)).toBe('42');
      expect(normalizeCodeOutput(3.14)).toBe('3.14');
      expect(normalizeCodeOutput(0)).toBe('0');
    });

    it('converts booleans to strings', () => {
      expect(normalizeCodeOutput(true)).toBe('true');
      expect(normalizeCodeOutput(false)).toBe('false');
    });
  });

  describe('list normalization', () => {
    it('normalizes spaces after commas in lists', () => {
      expect(normalizeCodeOutput('[1,2,3]')).toBe('[1, 2, 3]');
      expect(normalizeCodeOutput('[1, 2, 3]')).toBe('[1, 2, 3]');
      expect(normalizeCodeOutput('[1,  2,   3]')).toBe('[1, 2, 3]');
    });

    it('removes spaces after opening bracket', () => {
      expect(normalizeCodeOutput('[ 1, 2, 3]')).toBe('[1, 2, 3]');
      expect(normalizeCodeOutput('[  1, 2, 3]')).toBe('[1, 2, 3]');
    });

    it('removes spaces before closing bracket', () => {
      expect(normalizeCodeOutput('[1, 2, 3 ]')).toBe('[1, 2, 3]');
      expect(normalizeCodeOutput('[1, 2, 3  ]')).toBe('[1, 2, 3]');
    });

    it('handles nested lists', () => {
      expect(normalizeCodeOutput('[[1,2],[3,4]]')).toBe('[[1, 2], [3, 4]]');
      expect(normalizeCodeOutput('[[ 1, 2 ],[ 3, 4 ]]')).toBe('[[1, 2], [3, 4]]');
    });

    it('handles empty lists', () => {
      expect(normalizeCodeOutput('[]')).toBe('[]');
      expect(normalizeCodeOutput('[ ]')).toBe('[]');
    });

    it('handles lists with strings', () => {
      expect(normalizeCodeOutput("['a','b','c']")).toBe("['a', 'b', 'c']");
      expect(normalizeCodeOutput('["hello","world"]')).toBe('["hello", "world"]');
    });
  });

  describe('dictionary normalization', () => {
    it('normalizes spaces around colons', () => {
      expect(normalizeCodeOutput('{"a":1}')).toBe('{"a": 1}');
      expect(normalizeCodeOutput('{"a" : 1}')).toBe('{"a": 1}');
      expect(normalizeCodeOutput('{"a":  1}')).toBe('{"a": 1}');
    });

    it('normalizes spaces after commas in dicts', () => {
      expect(normalizeCodeOutput('{"a":1,"b":2}')).toBe('{"a": 1, "b": 2}');
    });

    it('removes spaces after opening brace', () => {
      expect(normalizeCodeOutput('{ "a": 1}')).toBe('{"a": 1}');
    });

    it('removes spaces before closing brace', () => {
      expect(normalizeCodeOutput('{"a": 1 }')).toBe('{"a": 1}');
    });

    it('handles empty dicts', () => {
      expect(normalizeCodeOutput('{}')).toBe('{}');
      expect(normalizeCodeOutput('{ }')).toBe('{}');
    });
  });

  describe('tuple normalization', () => {
    it('normalizes spaces after commas in tuples', () => {
      expect(normalizeCodeOutput('(1,2,3)')).toBe('(1, 2, 3)');
      expect(normalizeCodeOutput('(1, 2, 3)')).toBe('(1, 2, 3)');
    });

    it('removes spaces after opening paren', () => {
      expect(normalizeCodeOutput('( 1, 2, 3)')).toBe('(1, 2, 3)');
    });

    it('removes spaces before closing paren', () => {
      expect(normalizeCodeOutput('(1, 2, 3 )')).toBe('(1, 2, 3)');
    });

    it('handles empty tuples', () => {
      expect(normalizeCodeOutput('()')).toBe('()');
      expect(normalizeCodeOutput('( )')).toBe('()');
    });
  });

  describe('edge cases', () => {
    it('handles mixed brackets', () => {
      expect(normalizeCodeOutput('[{"a":1}]')).toBe('[{"a": 1}]');
    });

    it('handles simple strings without brackets', () => {
      expect(normalizeCodeOutput('hello')).toBe('hello');
      expect(normalizeCodeOutput('Hello World')).toBe('hello world');
    });

    it('handles numbers as strings', () => {
      expect(normalizeCodeOutput('42')).toBe('42');
      expect(normalizeCodeOutput('3.14159')).toBe('3.14159');
    });

    it('handles boolean strings', () => {
      expect(normalizeCodeOutput('True')).toBe('true');
      expect(normalizeCodeOutput('False')).toBe('false');
    });

    it('handles None/null strings', () => {
      expect(normalizeCodeOutput('None')).toBe('none');
      expect(normalizeCodeOutput('null')).toBe('null');
    });

    it('preserves internal whitespace in strings', () => {
      // Whitespace inside string values should be preserved
      expect(normalizeCodeOutput('"hello world"')).toBe('"hello world"');
    });
  });
});

describe('checkAnswer with code_output questions', () => {
  const makeCodeOutputQuestion = (correctAnswer: string): QuizQuestion => ({
    id: 'code-q',
    type: 'code_output',
    prompt: 'What does this code print?',
    codeSnippet: 'print(x)',
    correctAnswer,
    explanation: 'Test explanation',
  });

  describe('list outputs', () => {
    it('accepts answer without spaces when expected has spaces', () => {
      const question = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(question, '[1,2,3]')).toBe(true);
    });

    it('accepts answer with spaces when expected has no spaces', () => {
      const question = makeCodeOutputQuestion('[1,2,3]');
      expect(checkAnswer(question, '[1, 2, 3]')).toBe(true);
    });

    it('accepts answer with extra spaces', () => {
      const question = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(question, '[1,  2,   3]')).toBe(true);
    });

    it('accepts answer with spaces inside brackets', () => {
      const question = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(question, '[ 1, 2, 3 ]')).toBe(true);
    });

    it('rejects wrong values', () => {
      const question = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(question, '[1, 2, 4]')).toBe(false);
      expect(checkAnswer(question, '[1, 2]')).toBe(false);
    });
  });

  describe('dictionary outputs', () => {
    it('accepts dict without spaces around colon', () => {
      const question = makeCodeOutputQuestion('{"name": "alice"}');
      expect(checkAnswer(question, '{"name":"alice"}')).toBe(true);
    });

    it('accepts dict with extra spaces', () => {
      const question = makeCodeOutputQuestion('{"a": 1, "b": 2}');
      expect(checkAnswer(question, '{"a":1,"b":2}')).toBe(true);
      expect(checkAnswer(question, '{ "a" : 1 , "b" : 2 }')).toBe(true);
    });
  });

  describe('case insensitivity', () => {
    it('accepts different case for True/False', () => {
      const question = makeCodeOutputQuestion('True');
      expect(checkAnswer(question, 'true')).toBe(true);
      expect(checkAnswer(question, 'TRUE')).toBe(true);
    });

    it('accepts different case for None', () => {
      const question = makeCodeOutputQuestion('None');
      expect(checkAnswer(question, 'none')).toBe(true);
      expect(checkAnswer(question, 'NONE')).toBe(true);
    });
  });

  describe('simple outputs', () => {
    it('accepts exact numeric answer', () => {
      const question = makeCodeOutputQuestion('42');
      expect(checkAnswer(question, '42')).toBe(true);
    });

    it('accepts answer with leading/trailing whitespace', () => {
      const question = makeCodeOutputQuestion('hello');
      expect(checkAnswer(question, '  hello  ')).toBe(true);
    });
  });

  describe('undefined and null answers', () => {
    it('returns false for undefined answer', () => {
      const question = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(question, undefined)).toBe(false);
    });

    it('returns false for null answer', () => {
      const question = makeCodeOutputQuestion('[1, 2, 3]');
      expect(checkAnswer(question, null)).toBe(false);
    });
  });
});

describe('calculateScore with code_output questions', () => {
  it('correctly scores code_output with flexible whitespace', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'code_output',
        prompt: 'What does range(3) print?',
        codeSnippet: 'print(list(range(3)))',
        correctAnswer: '[0, 1, 2]',
        explanation: 'Range generates 0 to n-1',
      },
      {
        id: 'q2',
        type: 'code_output',
        prompt: 'What does this print?',
        codeSnippet: 'print({"a": 1})',
        correctAnswer: "{'a': 1}",
        explanation: 'Dict literal',
      },
    ];

    // User types without spaces - should still be correct
    const answers = {
      q1: '[0,1,2]',
      q2: "{'a':1}",
    };

    expect(calculateScore(questions, answers)).toBe(100);
  });

  it('still marks wrong content as incorrect', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'code_output',
        prompt: 'What does this print?',
        codeSnippet: 'print([1, 2, 3])',
        correctAnswer: '[1, 2, 3]',
        explanation: 'List literal',
      },
    ];

    // Wrong content - extra element
    const answers = { q1: '[1, 2, 3, 4]' };
    expect(calculateScore(questions, answers)).toBe(0);
  });
});

describe('fill_blank vs code_output normalization', () => {
  it('fill_blank does NOT normalize whitespace around punctuation', () => {
    const question: QuizQuestion = {
      id: 'fill-q',
      type: 'fill_blank',
      prompt: 'The answer is ____',
      correctAnswer: 'a, b, c',
      explanation: 'Test',
    };

    // For fill_blank, exact spacing matters (only case-insensitive)
    expect(checkAnswer(question, 'a, b, c')).toBe(true);
    expect(checkAnswer(question, 'A, B, C')).toBe(true);
    expect(checkAnswer(question, 'a,b,c')).toBe(false); // Different spacing
  });

  it('code_output DOES normalize whitespace around punctuation', () => {
    const question: QuizQuestion = {
      id: 'code-q',
      type: 'code_output',
      prompt: 'What does this print?',
      codeSnippet: 'print([1, 2, 3])',
      correctAnswer: '[1, 2, 3]',
      explanation: 'Test',
    };

    // For code_output, whitespace is normalized
    expect(checkAnswer(question, '[1, 2, 3]')).toBe(true);
    expect(checkAnswer(question, '[1,2,3]')).toBe(true); // Now matches!
    expect(checkAnswer(question, '[1,  2,   3]')).toBe(true); // Also matches
  });
});
