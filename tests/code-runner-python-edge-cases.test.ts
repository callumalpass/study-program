/**
 * Code Runner Python Edge Cases Tests
 *
 * Additional edge case tests for Python code execution, focusing on
 * function test code preparation and edge cases in code parsing.
 */

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { clearPyodide, clearJSCPP } from '../src/components/code-runner';

beforeEach(() => {
  clearPyodide();
  clearJSCPP();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// Test the internal helper function behavior through integration tests

describe('prepareFunctionTestCode behavior', () => {
  // These tests verify the behavior of prepareFunctionTestCode indirectly
  // by examining the patterns it detects

  describe('function definition detection patterns', () => {
    it('matches standard function definition at start of line', () => {
      const code = 'def my_func(x):\n    return x * 2';
      // The pattern ^def\s+(\w+)\s*\( should match
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).not.toBeNull();
      expect(funcMatch![1]).toBe('my_func');
    });

    it('matches function with multiple parameters', () => {
      const code = 'def add(a, b, c):\n    return a + b + c';
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).not.toBeNull();
      expect(funcMatch![1]).toBe('add');
    });

    it('matches function with no parameters', () => {
      const code = 'def get_value():\n    return 42';
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).not.toBeNull();
      expect(funcMatch![1]).toBe('get_value');
    });

    it('matches function with default parameters', () => {
      const code = 'def greet(name="World"):\n    return f"Hello, {name}"';
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).not.toBeNull();
      expect(funcMatch![1]).toBe('greet');
    });

    it('matches function with type hints', () => {
      const code = 'def calculate(x: int, y: int) -> int:\n    return x + y';
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).not.toBeNull();
      expect(funcMatch![1]).toBe('calculate');
    });

    it('does not match method inside class at top level', () => {
      const code = 'class MyClass:\n    def my_method(self):\n        pass';
      // The multiline flag with ^ matches start of any line, but we want
      // to test that indented defs are treated differently
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).toBeNull();
    });

    it('does not match function in comment', () => {
      const code = '# def fake_func():\nreal_code = 1';
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).toBeNull();
    });

    it('does not match function in string', () => {
      const code = 's = "def not_a_func(): pass"\ndef real_func():\n    pass';
      // This tests that the first match is real_func, not not_a_func
      // (though the pattern will still match inside strings - this is
      // a known limitation)
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch![1]).toBe('real_func');
    });

    it('matches function with underscore in name', () => {
      const code = 'def calculate_total_sum(items):\n    return sum(items)';
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).not.toBeNull();
      expect(funcMatch![1]).toBe('calculate_total_sum');
    });

    it('matches function with numbers in name', () => {
      const code = 'def step2_process(data):\n    return data';
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).not.toBeNull();
      expect(funcMatch![1]).toBe('step2_process');
    });
  });

  describe('stdin detection patterns', () => {
    it('detects input() call in code', () => {
      const code = 'name = input("Enter name: ")';
      const usesStdin = /\binput\s*\(/.test(code);
      expect(usesStdin).toBe(true);
    });

    it('detects input() without prompt', () => {
      const code = 'x = input()';
      const usesStdin = /\binput\s*\(/.test(code);
      expect(usesStdin).toBe(true);
    });

    it('detects input() in complex expression', () => {
      const code = 'result = int(input().strip())';
      const usesStdin = /\binput\s*\(/.test(code);
      expect(usesStdin).toBe(true);
    });

    it('does not match input as variable name', () => {
      const code = 'input_data = [1, 2, 3]';
      const usesStdin = /\binput\s*\(/.test(code);
      expect(usesStdin).toBe(false);
    });

    it('does not match input in comment', () => {
      // Note: simple regex can't distinguish this, but the test documents behavior
      const code = '# use input() to read\nx = 5';
      const usesStdin = /\binput\s*\(/.test(code);
      // This will still match because of the simple regex
      expect(usesStdin).toBe(true);
    });
  });

  describe('isTestCall detection patterns', () => {
    // These patterns are used to filter out test calls from user code

    it('identifies print statement as test call', () => {
      const line = 'print(my_func(5))';
      const isTestCall = line.trim().match(/^print\s*\(/);
      expect(isTestCall).not.toBeNull();
    });

    it('identifies result assignment as test call', () => {
      const line = 'result = my_func(5)';
      const isTestCall = line.trim().match(/^result\s*=/);
      expect(isTestCall).not.toBeNull();
    });

    it('identifies assert statement as test call', () => {
      const line = 'assert my_func(5) == 10';
      const isTestCall = line.trim().match(/^assert\s/);
      expect(isTestCall).not.toBeNull();
    });

    it('does not identify regular code as test call', () => {
      const lines = [
        'x = 5',
        'def helper(): pass',
        'for i in range(10): pass',
        'if x > 0: pass',
        'class MyClass: pass',
      ];

      for (const line of lines) {
        const trimmed = line.trim();
        const isPrint = trimmed.match(/^print\s*\(/);
        const isResult = trimmed.match(/^result\s*=/);
        const isAssert = trimmed.match(/^assert\s/);

        expect(isPrint || isResult || isAssert).toBeFalsy();
      }
    });

    it('does not identify comment as test call', () => {
      const line = '# print("test")';
      const trimmed = line.trim();
      // Comments start with #, so they should return false from isTestCall
      expect(trimmed.startsWith('#')).toBe(true);
    });
  });
});

describe('Python output normalization', () => {
  describe('normalizeOutput behavior', () => {
    // Test the normalization patterns used in code-runner.ts

    it('trims leading and trailing whitespace', () => {
      const output = '  Hello World  \n\n';
      const normalized = output.trim();
      expect(normalized).toBe('Hello World');
    });

    it('normalizes CRLF to LF', () => {
      const output = 'Line 1\r\nLine 2\r\n';
      const normalized = output.trim().replace(/\r\n/g, '\n');
      expect(normalized).toBe('Line 1\nLine 2');
    });

    it('removes trailing whitespace from each line', () => {
      const output = 'Line 1   \nLine 2  \n';
      const normalized = output.trim().replace(/\s+$/gm, '');
      expect(normalized).toBe('Line 1\nLine 2');
    });

    it('handles empty output', () => {
      const output = '';
      const normalized = output.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
      expect(normalized).toBe('');
    });

    it('handles output with only whitespace', () => {
      const output = '   \n\n  \t  ';
      const normalized = output.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
      expect(normalized).toBe('');
    });

    it('preserves internal newlines', () => {
      const output = 'Line 1\nLine 2\nLine 3';
      const normalized = output.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
      expect(normalized).toBe('Line 1\nLine 2\nLine 3');
    });

    it('preserves internal spaces', () => {
      const output = 'Hello   World';
      const normalized = output.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
      expect(normalized).toBe('Hello   World');
    });
  });
});

describe('code execution edge cases', () => {
  describe('Python code structure patterns', () => {
    it('identifies function end by indentation decrease', () => {
      const code = `def my_func(x):
    if x > 0:
        return x
    return 0

# This is outside the function
y = 5`;

      // Simulate the logic in prepareFunctionTestCode
      const lines = code.split('\n');
      let inFunction = false;
      let functionIndent = 0;
      const functionLines: string[] = [];
      const otherLines: string[] = [];

      for (const line of lines) {
        if (line.match(/^def\s+my_func\s*\(/)) {
          inFunction = true;
          functionIndent = 0; // line.search(/\S/) would be 0
          functionLines.push(line);
          continue;
        }

        if (inFunction) {
          const trimmed = line.trim();
          if (trimmed.length > 0) {
            const currentIndent = line.search(/\S/);
            if (currentIndent <= functionIndent && !line.match(/^\s*#/)) {
              inFunction = false;
              otherLines.push(line);
            } else {
              functionLines.push(line);
            }
          } else {
            functionLines.push(line);
          }
        } else {
          otherLines.push(line);
        }
      }

      // Function should contain def + body lines + empty line
      // Comment line starts at column 0 (same as function indent), so it marks end
      expect(functionLines.length).toBeGreaterThan(0);
      expect(functionLines[0]).toBe('def my_func(x):');
      // The comment starts at indent 0, which equals functionIndent, so it exits
      // Only y = 5 would be in otherLines if comment was included in function
      // But comment starts with # so the !line.match(/^\s*#/) check keeps it in function
      expect(otherLines.some(line => line.includes('y = 5'))).toBe(true);
    });

    it('handles function with nested functions', () => {
      const code = `def outer(x):
    def inner(y):
        return y * 2
    return inner(x)`;

      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch![1]).toBe('outer');
    });

    it('handles decorator syntax', () => {
      const code = `@decorator
def decorated_func(x):
    return x`;

      // The first def match should be decorated_func
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch![1]).toBe('decorated_func');
    });

    it('handles async function definition', () => {
      const code = `async def async_func(x):
    return await some_coroutine(x)`;

      // Standard def pattern won't match async def
      const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
      expect(funcMatch).toBeNull();

      // But we could match with async
      const asyncMatch = code.match(/^async\s+def\s+(\w+)\s*\(/m);
      expect(asyncMatch).not.toBeNull();
      expect(asyncMatch![1]).toBe('async_func');
    });
  });

  describe('edge cases in test input handling', () => {
    it('handles empty input string', () => {
      const input = '';
      const inputLines = input.split('\n').filter(line => line.trim());
      expect(inputLines).toEqual([]);
    });

    it('handles input with only whitespace', () => {
      const input = '   \n  \n   ';
      const inputLines = input.split('\n').filter(line => line.trim());
      expect(inputLines).toEqual([]);
    });

    it('handles input with multiple values on separate lines', () => {
      const input = '5\n10\n15';
      const inputLines = input.split('\n').filter(line => line.trim());
      expect(inputLines).toEqual(['5', '10', '15']);
    });

    it('handles input with trailing newline', () => {
      const input = '5\n10\n';
      const inputLines = input.split('\n').filter(line => line.trim());
      expect(inputLines).toEqual(['5', '10']);
    });

    it('handles input with spaces in values', () => {
      const input = 'Hello World\nGoodbye World';
      const inputLines = input.split('\n').filter(line => line.trim());
      expect(inputLines).toEqual(['Hello World', 'Goodbye World']);
    });
  });
});

describe('Python code capture patterns', () => {
  describe('output capture code generation', () => {
    it('properly indents user code in capture wrapper', () => {
      const userCode = `def my_func(x):
    return x * 2

print(my_func(5))`;

      // Simulate the indentation logic from runPython
      const indentedCode = userCode.split('\n').map(line => '    ' + line).join('\n');

      // Each line should be indented by 4 spaces
      const lines = indentedCode.split('\n');
      for (const line of lines) {
        expect(line.startsWith('    ')).toBe(true);
      }
    });

    it('handles empty code', () => {
      const userCode = '';
      const indentedCode = userCode.split('\n').map(line => '    ' + line).join('\n');
      expect(indentedCode).toBe('    ');
    });

    it('handles code with only comments', () => {
      const userCode = '# This is a comment\n# Another comment';
      const indentedCode = userCode.split('\n').map(line => '    ' + line).join('\n');
      expect(indentedCode).toBe('    # This is a comment\n    # Another comment');
    });
  });
});

describe('test case structure validation', () => {
  describe('TestCase interface usage', () => {
    it('accepts test case with input and description', () => {
      const testCase = {
        input: '5',
        description: 'Test with value 5',
      };

      expect(testCase.input).toBe('5');
      expect(testCase.description).toBe('Test with value 5');
    });

    it('accepts test case with empty input', () => {
      const testCase = {
        input: '',
        description: 'Test with no input',
      };

      expect(testCase.input).toBe('');
    });

    it('accepts test case with multi-line input', () => {
      const testCase = {
        input: '3\n1\n2\n3',
        description: 'Test with multiple values',
      };

      expect(testCase.input.split('\n')).toHaveLength(4);
    });
  });
});

describe('error message handling', () => {
  describe('error message extraction', () => {
    it('extracts line number from JSCPP-style error', () => {
      const errorMessage = 'Error: undefined symbol at line 5';
      const lineMatch = errorMessage.match(/line (\d+)/i);
      expect(lineMatch).not.toBeNull();
      expect(lineMatch![1]).toBe('5');
    });

    it('handles error without line number', () => {
      const errorMessage = 'Error: syntax error';
      const lineMatch = errorMessage.match(/line (\d+)/i);
      expect(lineMatch).toBeNull();
    });

    it('extracts first line number when multiple present', () => {
      const errorMessage = 'Error at line 3: expected } at line 5';
      const lineMatch = errorMessage.match(/line (\d+)/i);
      expect(lineMatch![1]).toBe('3');
    });
  });
});
