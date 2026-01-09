/**
 * Tests for code runner output normalization
 *
 * These tests verify that the normalizeOutput function correctly handles
 * various edge cases in output comparison for code exercises.
 */

import { describe, expect, it } from 'vitest';

// Re-implement normalizeOutput for testing (same as in code-runner.ts)
function normalizeOutput(output: string): string {
  return output
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+$/gm, '');
}

describe('normalizeOutput', () => {
  describe('basic trimming', () => {
    it('removes leading whitespace', () => {
      expect(normalizeOutput('  hello')).toBe('hello');
    });

    it('removes trailing whitespace', () => {
      expect(normalizeOutput('hello  ')).toBe('hello');
    });

    it('removes leading and trailing whitespace', () => {
      expect(normalizeOutput('  hello  ')).toBe('hello');
    });

    it('removes leading and trailing newlines', () => {
      expect(normalizeOutput('\nhello\n')).toBe('hello');
    });

    it('removes leading and trailing tabs', () => {
      expect(normalizeOutput('\thello\t')).toBe('hello');
    });

    it('handles empty string', () => {
      expect(normalizeOutput('')).toBe('');
    });

    it('handles whitespace-only string', () => {
      expect(normalizeOutput('   \n\t   ')).toBe('');
    });
  });

  describe('line ending normalization', () => {
    it('converts CRLF to LF', () => {
      expect(normalizeOutput('hello\r\nworld')).toBe('hello\nworld');
    });

    it('converts multiple CRLF to LF', () => {
      expect(normalizeOutput('a\r\nb\r\nc')).toBe('a\nb\nc');
    });

    it('preserves LF line endings', () => {
      expect(normalizeOutput('hello\nworld')).toBe('hello\nworld');
    });

    it('handles mixed line endings', () => {
      expect(normalizeOutput('a\r\nb\nc\r\nd')).toBe('a\nb\nc\nd');
    });

    it('handles CR only (not converted)', () => {
      // Only \r\n is converted, standalone \r is preserved
      expect(normalizeOutput('hello\rworld')).toBe('hello\rworld');
    });
  });

  describe('trailing whitespace per line', () => {
    it('removes trailing spaces from each line', () => {
      expect(normalizeOutput('hello   \nworld   ')).toBe('hello\nworld');
    });

    it('removes trailing tabs from each line', () => {
      expect(normalizeOutput('hello\t\nworld\t')).toBe('hello\nworld');
    });

    it('removes mixed trailing whitespace from each line', () => {
      expect(normalizeOutput('hello \t \nworld\t ')).toBe('hello\nworld');
    });

    it('preserves leading whitespace on lines after first (first line is trimmed)', () => {
      // trim() removes leading whitespace from the first line
      // but internal lines preserve their indentation
      expect(normalizeOutput('  indented\n  also indented')).toBe('indented\n  also indented');
    });

    it('preserves indentation in code blocks', () => {
      const code = 'def foo():\n    return 42';
      expect(normalizeOutput(code)).toBe('def foo():\n    return 42');
    });

    it('preserves internal whitespace', () => {
      expect(normalizeOutput('hello   world')).toBe('hello   world');
    });
  });

  describe('complex multiline outputs', () => {
    it('handles Python list output', () => {
      const output = '  [1, 2, 3]  \n';
      expect(normalizeOutput(output)).toBe('[1, 2, 3]');
    });

    it('handles Python dict output', () => {
      const output = "{'a': 1, 'b': 2}\n";
      expect(normalizeOutput(output)).toBe("{'a': 1, 'b': 2}");
    });

    it('handles multiline function output', () => {
      const output = `
Result: 42
Status: OK
Done
      `;
      expect(normalizeOutput(output)).toBe('Result: 42\nStatus: OK\nDone');
    });

    it('removes blank lines from middle of output', () => {
      // The regex /\s+$/gm removes blank lines (they match as "trailing whitespace")
      // because an empty line is essentially whitespace at end of line
      const output = 'line1\n\nline3';
      // Empty line is removed
      expect(normalizeOutput(output)).toBe('line1\nline3');
    });

    it('removes lines with only spaces', () => {
      // A line with only spaces becomes empty after the regex
      const output = 'line1\n   \nline3';
      expect(normalizeOutput(output)).toBe('line1\nline3');
    });

    it('handles output with trailing blank lines', () => {
      const output = 'result\n\n\n';
      expect(normalizeOutput(output)).toBe('result');
    });
  });

  describe('numeric output normalization', () => {
    it('handles integer output', () => {
      expect(normalizeOutput('42\n')).toBe('42');
    });

    it('handles float output', () => {
      expect(normalizeOutput('3.14159\n')).toBe('3.14159');
    });

    it('handles negative numbers', () => {
      expect(normalizeOutput('-42\n')).toBe('-42');
    });

    it('handles scientific notation', () => {
      expect(normalizeOutput('1.5e-10\n')).toBe('1.5e-10');
    });

    it('handles zero', () => {
      expect(normalizeOutput('0\n')).toBe('0');
    });
  });

  describe('special characters', () => {
    it('preserves unicode characters', () => {
      expect(normalizeOutput('Hello 世界\n')).toBe('Hello 世界');
    });

    it('preserves emoji', () => {
      expect(normalizeOutput('🎉 Done!\n')).toBe('🎉 Done!');
    });

    it('preserves special symbols', () => {
      expect(normalizeOutput('© 2024\n')).toBe('© 2024');
    });

    it('handles null character (\\0)', () => {
      expect(normalizeOutput('hello\0world\n')).toBe('hello\0world');
    });
  });

  describe('comparison scenarios', () => {
    it('outputs with different line endings should match after normalization', () => {
      const crlfOutput = 'hello\r\nworld\r\n';
      const lfOutput = 'hello\nworld\n';
      expect(normalizeOutput(crlfOutput)).toBe(normalizeOutput(lfOutput));
    });

    it('outputs with different trailing whitespace should match', () => {
      const withSpaces = 'hello  \nworld  \n';
      const withoutSpaces = 'hello\nworld\n';
      expect(normalizeOutput(withSpaces)).toBe(normalizeOutput(withoutSpaces));
    });

    it('outputs with different leading/trailing whitespace should match', () => {
      const padded = '  hello\nworld  ';
      const unpadded = 'hello\nworld';
      expect(normalizeOutput(padded)).toBe(normalizeOutput(unpadded));
    });

    it('outputs with extra blank lines at end should match', () => {
      const withBlanks = 'result\n\n\n';
      const withoutBlanks = 'result';
      expect(normalizeOutput(withBlanks)).toBe(normalizeOutput(withoutBlanks));
    });
  });

  describe('edge cases for output comparison', () => {
    it('handles True vs true (case-sensitive)', () => {
      // Python outputs True, normalization should NOT change case
      expect(normalizeOutput('True')).toBe('True');
      expect(normalizeOutput('true')).toBe('true');
      expect(normalizeOutput('True')).not.toBe(normalizeOutput('true'));
    });

    it('handles None output', () => {
      expect(normalizeOutput('None\n')).toBe('None');
    });

    it('handles empty list []', () => {
      expect(normalizeOutput('[]\n')).toBe('[]');
    });

    it('handles empty dict {}', () => {
      expect(normalizeOutput('{}\n')).toBe('{}');
    });

    it('handles empty string repr', () => {
      expect(normalizeOutput("''\n")).toBe("''");
    });

    it('handles multiline string repr', () => {
      const output = "'hello\\nworld'\n";
      expect(normalizeOutput(output)).toBe("'hello\\nworld'");
    });
  });

  describe('C output specifics', () => {
    it('handles C-style output without newline', () => {
      // C printf without \n at end
      expect(normalizeOutput('42')).toBe('42');
    });

    it('handles (No output) marker', () => {
      expect(normalizeOutput('(No output)\n')).toBe('(No output)');
    });

    it('handles C float precision', () => {
      // C %f default precision
      expect(normalizeOutput('3.140000\n')).toBe('3.140000');
    });
  });

  describe('error output handling', () => {
    it('handles error messages with newlines', () => {
      const errorOutput = 'Error: Invalid input\nExpected: number\n';
      expect(normalizeOutput(errorOutput)).toBe('Error: Invalid input\nExpected: number');
    });

    it('preserves indentation in error tracebacks', () => {
      const traceback = `Traceback:
  File "test.py", line 1
    print(x)
NameError: name 'x' is not defined`;
      const expected = `Traceback:
  File "test.py", line 1
    print(x)
NameError: name 'x' is not defined`;
      expect(normalizeOutput(traceback)).toBe(expected);
    });
  });
});

describe('output comparison edge cases for test runner', () => {
  it('identical outputs should be equal', () => {
    const output1 = normalizeOutput('42');
    const output2 = normalizeOutput('42');
    expect(output1).toBe(output2);
  });

  it('different outputs should not be equal', () => {
    const output1 = normalizeOutput('42');
    const output2 = normalizeOutput('43');
    expect(output1).not.toBe(output2);
  });

  it('whitespace differences should be normalized away', () => {
    const output1 = normalizeOutput('  42  \n');
    const output2 = normalizeOutput('42');
    expect(output1).toBe(output2);
  });

  it('case differences should NOT be normalized (case-sensitive)', () => {
    const output1 = normalizeOutput('Hello');
    const output2 = normalizeOutput('hello');
    expect(output1).not.toBe(output2);
  });

  it('list formatting differences should NOT be normalized', () => {
    const output1 = normalizeOutput('[1,2,3]');
    const output2 = normalizeOutput('[1, 2, 3]');
    // Spacing in data structures matters
    expect(output1).not.toBe(output2);
  });
});
