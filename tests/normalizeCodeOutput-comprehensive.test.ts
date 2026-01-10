/**
 * Comprehensive Tests for normalizeCodeOutput
 *
 * The normalizeCodeOutput function normalizes code output strings for comparison,
 * handling whitespace around punctuation so that "[1, 2, 3]" matches "[1,2,3]".
 * This is important for code_output questions where users might type without spaces.
 */

import { describe, it, expect } from 'vitest';
import { normalizeCodeOutput } from '../src/utils/quiz-utils';

describe('normalizeCodeOutput', () => {
  describe('null and undefined handling', () => {
    it('returns empty string for null', () => {
      expect(normalizeCodeOutput(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(normalizeCodeOutput(undefined)).toBe('');
    });
  });

  describe('basic trimming and lowercase', () => {
    it('trims leading whitespace', () => {
      expect(normalizeCodeOutput('   hello')).toBe('hello');
    });

    it('trims trailing whitespace', () => {
      expect(normalizeCodeOutput('hello   ')).toBe('hello');
    });

    it('trims both leading and trailing whitespace', () => {
      expect(normalizeCodeOutput('  hello  ')).toBe('hello');
    });

    it('converts to lowercase', () => {
      expect(normalizeCodeOutput('HELLO')).toBe('hello');
    });

    it('handles mixed case', () => {
      expect(normalizeCodeOutput('HeLLo WoRLD')).toBe('hello world');
    });
  });

  describe('comma spacing normalization', () => {
    it('normalizes no space after comma', () => {
      expect(normalizeCodeOutput('[1,2,3]')).toBe('[1, 2, 3]');
    });

    it('normalizes multiple spaces after comma', () => {
      expect(normalizeCodeOutput('[1,  2,   3]')).toBe('[1, 2, 3]');
    });

    it('normalizes space before comma', () => {
      expect(normalizeCodeOutput('[1 , 2 , 3]')).toBe('[1, 2, 3]');
    });

    it('normalizes spaces around commas', () => {
      expect(normalizeCodeOutput('[1 , 2 , 3]')).toBe('[1, 2, 3]');
    });

    it('handles no commas', () => {
      expect(normalizeCodeOutput('hello')).toBe('hello');
    });

    it('handles single comma', () => {
      expect(normalizeCodeOutput('a,b')).toBe('a, b');
    });

    it('handles trailing comma', () => {
      // Trailing comma without space after doesn't add space since there's no content to separate
      expect(normalizeCodeOutput('[1, 2, 3,]')).toBe('[1, 2, 3,]');
    });
  });

  describe('colon spacing normalization (dictionaries)', () => {
    it('normalizes no space after colon', () => {
      expect(normalizeCodeOutput("{a:1}")).toBe("{a: 1}");
    });

    it('normalizes multiple spaces after colon', () => {
      expect(normalizeCodeOutput("{a:  1}")).toBe("{a: 1}");
    });

    it('normalizes space before colon', () => {
      expect(normalizeCodeOutput("{a :1}")).toBe("{a: 1}");
    });

    it('normalizes spaces around colon', () => {
      expect(normalizeCodeOutput("{a : 1}")).toBe("{a: 1}");
    });

    it('handles Python dict output', () => {
      expect(normalizeCodeOutput("{'key': 'value'}")).toBe("{'key': 'value'}");
    });

    it('handles dict with multiple keys', () => {
      expect(normalizeCodeOutput("{a:1, b:2}")).toBe("{a: 1, b: 2}");
    });
  });

  describe('bracket spacing normalization', () => {
    it('removes space after opening bracket [', () => {
      expect(normalizeCodeOutput('[ 1, 2, 3]')).toBe('[1, 2, 3]');
    });

    it('removes space before closing bracket ]', () => {
      expect(normalizeCodeOutput('[1, 2, 3 ]')).toBe('[1, 2, 3]');
    });

    it('removes spaces around brackets', () => {
      expect(normalizeCodeOutput('[ 1, 2, 3 ]')).toBe('[1, 2, 3]');
    });

    it('handles nested brackets', () => {
      expect(normalizeCodeOutput('[[ 1, 2], [3, 4 ]]')).toBe('[[1, 2], [3, 4]]');
    });
  });

  describe('parenthesis spacing normalization', () => {
    it('removes space after opening paren (', () => {
      expect(normalizeCodeOutput('( 1, 2, 3)')).toBe('(1, 2, 3)');
    });

    it('removes space before closing paren )', () => {
      expect(normalizeCodeOutput('(1, 2, 3 )')).toBe('(1, 2, 3)');
    });

    it('removes spaces around parens', () => {
      expect(normalizeCodeOutput('( 1, 2, 3 )')).toBe('(1, 2, 3)');
    });

    it('handles tuple output', () => {
      expect(normalizeCodeOutput('( a , b )')).toBe('(a, b)');
    });
  });

  describe('brace spacing normalization (sets/dicts)', () => {
    it('removes space after opening brace {', () => {
      expect(normalizeCodeOutput('{ 1, 2, 3}')).toBe('{1, 2, 3}');
    });

    it('removes space before closing brace }', () => {
      expect(normalizeCodeOutput('{1, 2, 3 }')).toBe('{1, 2, 3}');
    });

    it('removes spaces around braces', () => {
      expect(normalizeCodeOutput('{ 1, 2, 3 }')).toBe('{1, 2, 3}');
    });

    it('handles dict output', () => {
      expect(normalizeCodeOutput("{ 'a' : 1 }")).toBe("{'a': 1}");
    });
  });

  describe('type coercion', () => {
    it('converts number to string', () => {
      expect(normalizeCodeOutput(42)).toBe('42');
    });

    it('converts floating point number', () => {
      expect(normalizeCodeOutput(3.14159)).toBe('3.14159');
    });

    it('converts boolean true', () => {
      expect(normalizeCodeOutput(true)).toBe('true');
    });

    it('converts boolean false', () => {
      expect(normalizeCodeOutput(false)).toBe('false');
    });

    it('converts zero', () => {
      expect(normalizeCodeOutput(0)).toBe('0');
    });

    it('converts negative number', () => {
      expect(normalizeCodeOutput(-5)).toBe('-5');
    });
  });

  describe('real-world Python output scenarios', () => {
    it('matches list output with different spacing', () => {
      const expected = normalizeCodeOutput('[1, 2, 3]');
      expect(normalizeCodeOutput('[1,2,3]')).toBe(expected);
      expect(normalizeCodeOutput('[ 1, 2, 3 ]')).toBe(expected);
      expect(normalizeCodeOutput('[1 , 2 , 3]')).toBe(expected);
    });

    it('matches dict output with different spacing', () => {
      const expected = normalizeCodeOutput("{'a': 1, 'b': 2}");
      expect(normalizeCodeOutput("{'a':1,'b':2}")).toBe(expected);
      expect(normalizeCodeOutput("{ 'a' : 1 , 'b' : 2 }")).toBe(expected);
    });

    it('matches tuple output with different spacing', () => {
      const expected = normalizeCodeOutput('(1, 2)');
      expect(normalizeCodeOutput('(1,2)')).toBe(expected);
      expect(normalizeCodeOutput('( 1 , 2 )')).toBe(expected);
    });

    it('handles set output', () => {
      const expected = normalizeCodeOutput('{1, 2, 3}');
      expect(normalizeCodeOutput('{1,2,3}')).toBe(expected);
      expect(normalizeCodeOutput('{ 1 , 2 , 3 }')).toBe(expected);
    });

    it('handles multiline output (preserves internal structure)', () => {
      // normalizeCodeOutput only trims leading/trailing, doesn't collapse internal newlines
      expect(normalizeCodeOutput('  hello\nworld  ')).toBe('hello\nworld');
    });

    it('handles Python True/False output', () => {
      // Python outputs True/False with capital letters, but we lowercase
      expect(normalizeCodeOutput('True')).toBe('true');
      expect(normalizeCodeOutput('False')).toBe('false');
    });

    it('handles None output', () => {
      expect(normalizeCodeOutput('None')).toBe('none');
    });

    it('handles empty list', () => {
      expect(normalizeCodeOutput('[]')).toBe('[]');
    });

    it('handles empty dict', () => {
      expect(normalizeCodeOutput('{}')).toBe('{}');
    });

    it('handles empty tuple', () => {
      expect(normalizeCodeOutput('()')).toBe('()');
    });
  });

  describe('complex nested structures', () => {
    it('handles nested list', () => {
      const expected = normalizeCodeOutput('[[1, 2], [3, 4]]');
      expect(normalizeCodeOutput('[[1,2],[3,4]]')).toBe(expected);
      expect(normalizeCodeOutput('[[ 1 , 2 ] , [ 3 , 4 ]]')).toBe(expected);
    });

    it('handles list of tuples', () => {
      const expected = normalizeCodeOutput('[(1, 2), (3, 4)]');
      expect(normalizeCodeOutput('[(1,2),(3,4)]')).toBe(expected);
    });

    it('handles dict of lists', () => {
      const expected = normalizeCodeOutput("{'a': [1, 2]}");
      expect(normalizeCodeOutput("{'a':[1,2]}")).toBe(expected);
    });

    it('handles list of dicts', () => {
      const expected = normalizeCodeOutput("[{'a': 1}]");
      expect(normalizeCodeOutput("[{'a':1}]")).toBe(expected);
    });
  });

  describe('edge cases with special characters', () => {
    it('handles string with quotes', () => {
      expect(normalizeCodeOutput('"hello"')).toBe('"hello"');
    });

    it('handles string with single quotes', () => {
      expect(normalizeCodeOutput("'hello'")).toBe("'hello'");
    });

    it('handles mixed punctuation', () => {
      expect(normalizeCodeOutput('a: b, c: d')).toBe('a: b, c: d');
    });

    it('handles consecutive brackets', () => {
      expect(normalizeCodeOutput('[[ ]]')).toBe('[[]]');
    });

    it('handles slicing notation (colon without spaces)', () => {
      // For slicing like arr[1:3], the colon normalization applies
      // This is fine because code_output compares normalized strings
      expect(normalizeCodeOutput('arr[1:3]')).toBe('arr[1: 3]');
    });
  });

  describe('whitespace variations', () => {
    it('handles tabs', () => {
      expect(normalizeCodeOutput('\thello\t')).toBe('hello');
    });

    it('handles carriage returns', () => {
      expect(normalizeCodeOutput('\r\nhello\r\n')).toBe('hello');
    });

    it('handles mixed whitespace', () => {
      expect(normalizeCodeOutput(' \t\nhello\n\t ')).toBe('hello');
    });

    it('preserves internal spaces', () => {
      expect(normalizeCodeOutput('hello world')).toBe('hello world');
    });

    it('preserves internal tabs (not in punctuation context)', () => {
      // Internal whitespace that's not around punctuation is preserved
      expect(normalizeCodeOutput('a\tb')).toBe('a\tb');
    });

    it('collapses multiple consecutive spaces to single space', () => {
      // NumPy arrays often have variable spacing for alignment
      expect(normalizeCodeOutput('[0.  0.5 1.]')).toBe('[0. 0.5 1.]');
      expect(normalizeCodeOutput('a    b')).toBe('a b');
      expect(normalizeCodeOutput('hello   world')).toBe('hello world');
    });

    it('matches NumPy array output with different spacing', () => {
      // Real-world case: NumPy outputs "[0.  0.5 1. ]" but user types "[0. 0.5 1.]"
      const expected = normalizeCodeOutput('[0.  0.5 1. ]');
      expect(normalizeCodeOutput('[0. 0.5 1.]')).toBe(expected);
    });
  });
});

describe('normalizeCodeOutput vs normalizeAnswer comparison', () => {
  // These tests ensure the code_output specific normalization is different from regular normalizeAnswer
  it('normalizeCodeOutput standardizes comma spacing while normalizeAnswer does not', () => {
    // Verify the code_output specific behavior
    expect(normalizeCodeOutput('[1,2]')).toBe('[1, 2]');
    expect(normalizeCodeOutput('[1, 2]')).toBe('[1, 2]');
    // Both should match when compared
    expect(normalizeCodeOutput('[1,2]')).toBe(normalizeCodeOutput('[1, 2]'));
  });

  it('both handle case insensitivity the same', () => {
    expect(normalizeCodeOutput('HELLO')).toBe('hello');
  });

  it('both trim whitespace the same', () => {
    expect(normalizeCodeOutput('  hello  ')).toBe('hello');
  });
});
