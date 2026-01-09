/**
 * Code Output Answer Normalization Tests
 *
 * Tests for verifying that code_output quiz questions handle answer comparison
 * correctly, including edge cases with:
 * - Whitespace normalization
 * - Case insensitivity
 * - List/tuple formatting variations
 * - Numeric string comparisons
 * - Special characters
 */

import { describe, it, expect } from 'vitest';
import { normalizeAnswer, checkAnswer } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

/**
 * Helper to create a code_output question for testing
 */
function makeCodeOutputQuestion(correctAnswer: string | number): QuizQuestion {
  return {
    id: 'test-code-output',
    type: 'code_output',
    prompt: 'What does this code print?',
    codeSnippet: 'print(...)',
    correctAnswer,
    explanation: 'Test explanation',
  };
}

describe('Code Output Answer Normalization', () => {
  describe('normalizeAnswer function', () => {
    it('handles integer strings correctly', () => {
      expect(normalizeAnswer('42')).toBe('42');
      expect(normalizeAnswer('0')).toBe('0');
      expect(normalizeAnswer('-1')).toBe('-1');
    });

    it('handles float strings correctly', () => {
      expect(normalizeAnswer('3.14')).toBe('3.14');
      expect(normalizeAnswer('0.0')).toBe('0.0');
      expect(normalizeAnswer('-2.5')).toBe('-2.5');
    });

    it('handles boolean strings correctly', () => {
      expect(normalizeAnswer('True')).toBe('true');
      expect(normalizeAnswer('False')).toBe('false');
      expect(normalizeAnswer('TRUE')).toBe('true');
      expect(normalizeAnswer('FALSE')).toBe('false');
    });

    it('preserves internal whitespace', () => {
      expect(normalizeAnswer('[1, 2, 3]')).toBe('[1, 2, 3]');
      expect(normalizeAnswer('hello world')).toBe('hello world');
      expect(normalizeAnswer('a  b')).toBe('a  b');
    });

    it('trims leading and trailing whitespace', () => {
      expect(normalizeAnswer('  hello  ')).toBe('hello');
      expect(normalizeAnswer('\n42\n')).toBe('42');
      expect(normalizeAnswer('\thello\t')).toBe('hello');
    });

    it('handles empty and whitespace-only strings', () => {
      expect(normalizeAnswer('')).toBe('');
      expect(normalizeAnswer('   ')).toBe('');
      expect(normalizeAnswer('\n\t')).toBe('');
    });

    it('converts to lowercase', () => {
      expect(normalizeAnswer('HELLO')).toBe('hello');
      expect(normalizeAnswer('Mixed Case')).toBe('mixed case');
    });

    it('handles special Python output characters', () => {
      expect(normalizeAnswer("'hello'")).toBe("'hello'");
      expect(normalizeAnswer('"hello"')).toBe('"hello"');
      expect(normalizeAnswer('None')).toBe('none');
    });

    it('handles list representations', () => {
      expect(normalizeAnswer('[1, 2, 3]')).toBe('[1, 2, 3]');
      expect(normalizeAnswer("['a', 'b']")).toBe("['a', 'b']");
      expect(normalizeAnswer('[]')).toBe('[]');
    });

    it('handles tuple representations', () => {
      expect(normalizeAnswer('(1, 2, 3)')).toBe('(1, 2, 3)');
      expect(normalizeAnswer('()')).toBe('()');
    });

    it('handles dict representations', () => {
      expect(normalizeAnswer("{'key': 'value'}")).toBe("{'key': 'value'}");
      expect(normalizeAnswer('{}')).toBe('{}');
    });
  });

  describe('checkAnswer for code_output', () => {
    describe('numeric answers', () => {
      it('matches exact numeric strings', () => {
        const q = makeCodeOutputQuestion('42');
        expect(checkAnswer(q, '42')).toBe(true);
        expect(checkAnswer(q, '43')).toBe(false);
      });

      it('handles leading/trailing whitespace in user answers', () => {
        const q = makeCodeOutputQuestion('42');
        expect(checkAnswer(q, ' 42 ')).toBe(true);
        expect(checkAnswer(q, '\n42\n')).toBe(true);
      });

      it('handles negative numbers', () => {
        const q = makeCodeOutputQuestion('-5');
        expect(checkAnswer(q, '-5')).toBe(true);
        expect(checkAnswer(q, '5')).toBe(false);
      });

      it('handles floating point numbers', () => {
        const q = makeCodeOutputQuestion('3.14');
        expect(checkAnswer(q, '3.14')).toBe(true);
        expect(checkAnswer(q, '3.14000')).toBe(false); // Different string representation
      });

      it('handles zero', () => {
        const q = makeCodeOutputQuestion('0');
        expect(checkAnswer(q, '0')).toBe(true);
        expect(checkAnswer(q, '00')).toBe(false); // Different representation
      });
    });

    describe('boolean answers', () => {
      it('matches Python True with case insensitivity', () => {
        const q = makeCodeOutputQuestion('True');
        expect(checkAnswer(q, 'True')).toBe(true);
        expect(checkAnswer(q, 'true')).toBe(true);
        expect(checkAnswer(q, 'TRUE')).toBe(true);
      });

      it('matches Python False with case insensitivity', () => {
        const q = makeCodeOutputQuestion('False');
        expect(checkAnswer(q, 'False')).toBe(true);
        expect(checkAnswer(q, 'false')).toBe(true);
        expect(checkAnswer(q, 'FALSE')).toBe(true);
      });

      it('does not confuse True and False', () => {
        const qTrue = makeCodeOutputQuestion('True');
        const qFalse = makeCodeOutputQuestion('False');
        expect(checkAnswer(qTrue, 'False')).toBe(false);
        expect(checkAnswer(qFalse, 'True')).toBe(false);
      });
    });

    describe('None answers', () => {
      it('matches None with case insensitivity', () => {
        const q = makeCodeOutputQuestion('None');
        expect(checkAnswer(q, 'None')).toBe(true);
        expect(checkAnswer(q, 'none')).toBe(true);
        expect(checkAnswer(q, 'NONE')).toBe(true);
      });

      it('does not confuse None with empty string', () => {
        const q = makeCodeOutputQuestion('None');
        expect(checkAnswer(q, '')).toBe(false);
      });
    });

    describe('string output answers', () => {
      it('matches simple strings with case insensitivity', () => {
        const q = makeCodeOutputQuestion('Hello');
        expect(checkAnswer(q, 'Hello')).toBe(true);
        expect(checkAnswer(q, 'hello')).toBe(true);
        expect(checkAnswer(q, 'HELLO')).toBe(true);
      });

      it('matches strings with spaces (internal whitespace preserved)', () => {
        const q = makeCodeOutputQuestion('Hello World');
        expect(checkAnswer(q, 'Hello World')).toBe(true);
        expect(checkAnswer(q, 'hello world')).toBe(true);
        expect(checkAnswer(q, 'HelloWorld')).toBe(false); // Missing space
      });

      it('matches multiline output', () => {
        const q = makeCodeOutputQuestion('Hello\nWorld');
        expect(checkAnswer(q, 'Hello\nWorld')).toBe(true);
        expect(checkAnswer(q, 'hello\nworld')).toBe(true);
      });

      it('handles quoted string outputs (repr style)', () => {
        const q = makeCodeOutputQuestion("'hello'");
        expect(checkAnswer(q, "'hello'")).toBe(true);
        expect(checkAnswer(q, "'HELLO'")).toBe(true);
      });
    });

    describe('list/tuple output answers', () => {
      it('matches list output exactly', () => {
        const q = makeCodeOutputQuestion('[1, 2, 3]');
        expect(checkAnswer(q, '[1, 2, 3]')).toBe(true);
      });

      it('list output normalizes whitespace around punctuation', () => {
        const q = makeCodeOutputQuestion('[1, 2, 3]');
        // These should pass because whitespace is now normalized for code_output
        expect(checkAnswer(q, '[1,2,3]')).toBe(true);
        expect(checkAnswer(q, '[1 , 2 , 3]')).toBe(true);
      });

      it('matches empty list with various spacing', () => {
        const q = makeCodeOutputQuestion('[]');
        expect(checkAnswer(q, '[]')).toBe(true);
        expect(checkAnswer(q, '[ ]')).toBe(true); // Now accepted
      });

      it('matches tuple output', () => {
        const q = makeCodeOutputQuestion('(1, 2)');
        expect(checkAnswer(q, '(1, 2)')).toBe(true);
      });

      it('matches list of strings', () => {
        const q = makeCodeOutputQuestion("['a', 'b']");
        expect(checkAnswer(q, "['a', 'b']")).toBe(true);
        expect(checkAnswer(q, "['A', 'B']")).toBe(true);
      });
    });

    describe('dict output answers', () => {
      it('matches dict output', () => {
        const q = makeCodeOutputQuestion("{'a': 1}");
        expect(checkAnswer(q, "{'a': 1}")).toBe(true);
        expect(checkAnswer(q, "{'A': 1}")).toBe(true);
      });

      it('matches empty dict', () => {
        const q = makeCodeOutputQuestion('{}');
        expect(checkAnswer(q, '{}')).toBe(true);
      });
    });

    describe('edge cases', () => {
      it('handles undefined answer', () => {
        const q = makeCodeOutputQuestion('42');
        expect(checkAnswer(q, undefined)).toBe(false);
      });

      it('handles empty string answer for empty string expected', () => {
        const q = makeCodeOutputQuestion('');
        expect(checkAnswer(q, '')).toBe(true);
      });

      it('handles whitespace-only user answer', () => {
        const q = makeCodeOutputQuestion('42');
        expect(checkAnswer(q, '   ')).toBe(false);
      });

      it('handles special characters', () => {
        const q = makeCodeOutputQuestion('O(n²)');
        expect(checkAnswer(q, 'O(n²)')).toBe(true);
        expect(checkAnswer(q, 'o(n²)')).toBe(true);
      });

      it('handles backslash in answers', () => {
        const q = makeCodeOutputQuestion('\\n');
        expect(checkAnswer(q, '\\n')).toBe(true);
      });

      it('handles tab characters', () => {
        const q = makeCodeOutputQuestion('a\tb');
        expect(checkAnswer(q, 'a\tb')).toBe(true);
      });
    });

    describe('realistic quiz scenarios', () => {
      it('handles factorial function output', () => {
        const q = makeCodeOutputQuestion('24');
        expect(checkAnswer(q, '24')).toBe(true);
        expect(checkAnswer(q, ' 24 ')).toBe(true);
      });

      it('handles range to list conversion', () => {
        const q = makeCodeOutputQuestion('[0, 1, 2]');
        expect(checkAnswer(q, '[0, 1, 2]')).toBe(true);
        // Whitespace is now normalized for code_output questions
        expect(checkAnswer(q, '[0,1,2]')).toBe(true);
      });

      it('handles string slicing output', () => {
        const q = makeCodeOutputQuestion('ello');
        expect(checkAnswer(q, 'ello')).toBe(true);
        expect(checkAnswer(q, 'Ello')).toBe(true);
      });

      it('handles len() function output', () => {
        const q = makeCodeOutputQuestion('5');
        expect(checkAnswer(q, '5')).toBe(true);
      });

      it('handles type() function output', () => {
        const q = makeCodeOutputQuestion("<class 'int'>");
        expect(checkAnswer(q, "<class 'int'>")).toBe(true);
        expect(checkAnswer(q, "<CLASS 'INT'>")).toBe(true);
      });

      it('handles f-string output', () => {
        const q = makeCodeOutputQuestion('Hello, Alice!');
        expect(checkAnswer(q, 'Hello, Alice!')).toBe(true);
        expect(checkAnswer(q, 'hello, alice!')).toBe(true);
      });

      it('handles mathematical expression output', () => {
        const q = makeCodeOutputQuestion('2 1');
        expect(checkAnswer(q, '2 1')).toBe(true);
        expect(checkAnswer(q, '  2 1  ')).toBe(true);
      });
    });
  });

  describe('answer normalization consistency', () => {
    it('correctly normalizes both sides of comparison', () => {
      // This tests that both the stored correctAnswer and user answer
      // go through the same normalization
      const testCases = [
        { correct: 'HELLO', user: 'hello', expected: true },
        { correct: '  42  ', user: '42', expected: true },
        { correct: 'True', user: 'TRUE', expected: true },
        { correct: '[1, 2]', user: '[1, 2]', expected: true },
        { correct: 'None', user: 'none', expected: true },
      ];

      for (const { correct, user, expected } of testCases) {
        const q = makeCodeOutputQuestion(correct);
        expect(
          checkAnswer(q, user),
          `Expected checkAnswer(${JSON.stringify(correct)}, ${JSON.stringify(user)}) to be ${expected}`
        ).toBe(expected);
      }
    });

    it('normalizeAnswer is symmetric', () => {
      // normalizing either value should give the same result when compared
      const pairs = [
        ['Hello', 'HELLO'],
        ['  x  ', 'x'],
        ['True', 'true'],
      ];

      for (const [a, b] of pairs) {
        expect(normalizeAnswer(a)).toBe(normalizeAnswer(b));
      }
    });
  });
});

describe('Integration with real quiz patterns', () => {
  it('handles counter output pattern from cs103', () => {
    // From cs103 quiz: Counter example with "2 1" output
    const q = makeCodeOutputQuestion('2 1');
    expect(checkAnswer(q, '2 1')).toBe(true);
    expect(checkAnswer(q, '21')).toBe(false); // Missing space
    expect(checkAnswer(q, '1 2')).toBe(false); // Wrong order
  });

  it('handles class attribute output from cs103', () => {
    // From cs103 quiz: "True 99"
    const q = makeCodeOutputQuestion('True 99');
    expect(checkAnswer(q, 'True 99')).toBe(true);
    expect(checkAnswer(q, 'true 99')).toBe(true);
  });

  it('handles nested function output', () => {
    // From cs101 quiz: factorial(4) = 24
    const q = makeCodeOutputQuestion('24');
    expect(checkAnswer(q, '24')).toBe(true);
  });

  it('handles print with newline in output', () => {
    // From cs101 quiz: "Hello, World\nNone"
    const q = makeCodeOutputQuestion('Hello, World\nNone');
    expect(checkAnswer(q, 'Hello, World\nNone')).toBe(true);
    expect(checkAnswer(q, 'hello, world\nnone')).toBe(true);
  });

  it('handles mutable default argument example', () => {
    // From cs101 quiz: "[1]\n[1, 2]"
    const q = makeCodeOutputQuestion('[1]\n[1, 2]');
    expect(checkAnswer(q, '[1]\n[1, 2]')).toBe(true);
  });
});
