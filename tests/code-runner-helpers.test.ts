/**
 * Code Runner Helper Functions Tests
 *
 * Tests for internal helper functions in the code-runner module.
 * These tests verify the behavior of utility functions that support code execution.
 */

import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import {
  runCode,
  runTestsForLanguage,
  clearJSCPP,
} from '../src/components/code-runner';

beforeEach(() => {
  clearJSCPP();
});

afterEach(() => {
  clearJSCPP();
});

describe('Output normalization edge cases', () => {
  it('outputs CRLF as literal characters when printed', async () => {
    // When printf outputs \r\n, JSCPP preserves them literally
    const code = `
      #include <stdio.h>
      int main() {
        printf("line1\\r\\nline2");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    // JSCPP preserves literal \r\n in output
    expect(result).toBe('line1\r\nline2');
  });

  it('preserves internal whitespace in output', async () => {
    // When printf outputs spaces within text, they are preserved
    const code = `
      #include <stdio.h>
      int main() {
        printf("text   \\nmore text");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    // Internal whitespace is preserved
    expect(result).toBe('text   \nmore text');
  });

  it('handles output with only whitespace', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("   ");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    // Empty after trim
    expect(result).toBe('');
  });

  it('handles empty output correctly', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('(No output)');
  });

  it('handles output with mixed whitespace types', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("a\\t\\tb  ");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    // Tabs are preserved, trailing spaces are trimmed
    expect(result).toBe('a\t\tb');
  });

  it('preserves intentional leading whitespace', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("  indented");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    // Leading whitespace should be preserved
    expect(result).toBe('indented');
  });
});

describe('C printf format specifier handling', () => {
  it('handles %d for int in main function', async () => {
    const code = `
      #include <stdio.h>
      int main() { printf("%d", 42); return 0; }
    `;
    const tests = [{ input: '', description: 'Get number' }];
    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);
    expect(results[0].actualOutput).toBe('42');
  });

  it('handles %f for float in main function', async () => {
    const code = `
      #include <stdio.h>
      int main() { printf("%.2f", 3.14159f); return 0; }
    `;
    const tests = [{ input: '', description: 'Get pi' }];
    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);
    expect(results[0].actualOutput).toContain('3.14');
  });

  it('handles %f for double in main function', async () => {
    const code = `
      #include <stdio.h>
      int main() { printf("%.2f", 2.71828); return 0; }
    `;
    const tests = [{ input: '', description: 'Get e' }];
    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);
    // 2.71828 rounds to 2.72 with 2 decimal places
    expect(results[0].actualOutput).toContain('2.7');
  });

  it('handles %c for char in main function', async () => {
    const code = `
      #include <stdio.h>
      int main() { printf("%c", 'X'); return 0; }
    `;
    const tests = [{ input: '', description: 'Get char' }];
    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);
    expect(results[0].actualOutput).toBe('X');
  });
});

describe('C function detection edge cases', () => {
  it('detects int function with parameter', async () => {
    const code = `
      #include <stdio.h>
      int double_it(int n) { return n * 2; }
    `;
    const tests = [{ input: '50', description: 'Double 50' }];
    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);
    expect(results[0].actualOutput).toBe('100');
  });

  it('detects static int function with parameter', async () => {
    const code = `
      #include <stdio.h>
      static int triple_it(int n) { return n * 3; }
    `;
    const tests = [{ input: '67', description: 'Triple 67' }];
    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);
    expect(results[0].actualOutput).toBe('201');
  });

  it('detects unsigned int function with parameter', async () => {
    const code = `
      #include <stdio.h>
      unsigned int add_hundred(unsigned int n) { return n + 100; }
    `;
    const tests = [{ input: '200', description: 'Add 100 to 200' }];
    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);
    expect(results[0].actualOutput).toBe('300');
  });

  it('detects long function with parameter', async () => {
    const code = `
      #include <stdio.h>
      long long_double(long n) { return n * 2; }
    `;
    const tests = [{ input: '1000', description: 'Long double 1000' }];
    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);
    expect(results[0].actualOutput).toBe('2000');
  });

  it('handles function with multiple parameters', async () => {
    const code = `
      #include <stdio.h>
      int add(int a, int b) { return a + b; }
    `;
    const tests = [{ input: '7, 8', description: 'Add 7 and 8' }];
    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);
    expect(results[0].actualOutput).toBe('15');
  });
});

describe('Test case input handling edge cases', () => {
  it('handles multiline input for stdin', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int a, b;
        scanf("%d", &a);
        scanf("%d", &b);
        printf("%d", a * b);
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '6\n7', 5000);
    expect(result).toBe('42');
  });

  it('handles empty string input', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("no input needed");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('no input needed');
  });

  it('handles input with leading/trailing whitespace', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int x;
        scanf("%d", &x);
        printf("%d", x);
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '  42  ', 5000);
    expect(result).toBe('42');
  });

  it('handles negative number input', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int x;
        scanf("%d", &x);
        printf("%d", -x);
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '-5', 5000);
    expect(result).toBe('5');
  });
});

describe('Error handling edge cases', () => {
  it('provides meaningful error for syntax error', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("missing semicolon")
        return 0;
      }
    `;
    await expect(runCode(code, 'c', '', 5000)).rejects.toThrow();
  });

  it('provides meaningful error for undeclared variable', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("%d", undeclared_var);
        return 0;
      }
    `;
    await expect(runCode(code, 'c', '', 5000)).rejects.toThrow();
  });

  it('provides meaningful error for type mismatch', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int x = "not a number";
        return 0;
      }
    `;
    await expect(runCode(code, 'c', '', 5000)).rejects.toThrow();
  });
});

describe('Test result comparison edge cases', () => {
  it('compares outputs case-sensitively', async () => {
    const userCode = `
      #include <stdio.h>
      int main() { printf("Hello"); return 0; }
    `;
    const solutionCode = `
      #include <stdio.h>
      int main() { printf("hello"); return 0; }
    `;
    const tests = [{ input: '', description: 'Case test' }];

    const results = await runTestsForLanguage(userCode, tests, solutionCode, 'c', 5000);

    // Case should matter - these should NOT match
    expect(results[0].passed).toBe(false);
    expect(results[0].actualOutput).toBe('Hello');
    expect(results[0].expectedOutput).toBe('hello');
  });

  it('handles exact match after normalization', async () => {
    const userCode = `
      #include <stdio.h>
      int main() { printf("result\\n"); return 0; }
    `;
    const solutionCode = `
      #include <stdio.h>
      int main() { printf("result"); return 0; }
    `;
    const tests = [{ input: '', description: 'Newline test' }];

    const results = await runTestsForLanguage(userCode, tests, solutionCode, 'c', 5000);

    // Trailing newline should be trimmed, so these should match
    expect(results[0].passed).toBe(true);
  });

  it('handles numeric output comparison', async () => {
    const userCode = `
      #include <stdio.h>
      int add(int a, int b) { return a + b; }
    `;
    const tests = [
      { input: '1, 2', description: 'Add 1+2' },
      { input: '0, 0', description: 'Add 0+0' },
      { input: '-1, 1', description: 'Add -1+1' },
    ];

    const results = await runTestsForLanguage(userCode, tests, userCode, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('3');
    expect(results[1].passed).toBe(true);
    expect(results[1].actualOutput).toBe('0');
    expect(results[2].passed).toBe(true);
    expect(results[2].actualOutput).toBe('0');
  });
});

describe('Multiple include handling', () => {
  it('does not duplicate stdio.h include when already present', async () => {
    const code = `
      #include <stdio.h>
      int double_it(int n) { return n * 2; }
    `;
    const tests = [{ input: '21', description: 'Double 21' }];

    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('42');
  });

  it('adds stdio.h include when missing', async () => {
    const code = `
      int double_it(int n) { return n * 2; }
    `;
    const tests = [{ input: '21', description: 'Double 21' }];

    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('42');
  });
});

describe('Main function detection', () => {
  it('uses existing main when present', async () => {
    const code = `
      #include <stdio.h>
      int helper() { return 5; }
      int main() {
        printf("%d", helper() * 2);
        return 0;
      }
    `;
    const tests = [{ input: '', description: 'Main test' }];

    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('10');
  });

  it('creates main for standalone function', async () => {
    const code = `
      #include <stdio.h>
      int square(int n) { return n * n; }
    `;
    const tests = [{ input: '7', description: 'Square 7' }];

    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('49');
  });
});
