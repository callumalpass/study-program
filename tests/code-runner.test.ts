import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  runCode,
  runTestsForLanguage,
  clearPyodide,
  clearJSCPP,
} from '../src/components/code-runner';

// Store original window.loadPyodide if it exists
const originalLoadPyodide = (globalThis as any).window?.loadPyodide;

beforeEach(() => {
  // Reset module state before each test
  clearPyodide();
  clearJSCPP();
});

afterEach(() => {
  // Restore original state
  if ((globalThis as any).window) {
    (globalThis as any).window.loadPyodide = originalLoadPyodide;
  }
  vi.restoreAllMocks();
});

describe('code runner language support', () => {
  describe('runCode', () => {
    it('rejects unsupported languages', async () => {
      await expect(runCode('print("hi")', 'sql', '', 1000))
        .rejects
        .toThrow('Unsupported language: sql');
    });

    it('rejects unknown language identifiers', async () => {
      await expect(runCode('code', 'ruby' as any, '', 1000))
        .rejects
        .toThrow('Unsupported language: ruby');
    });

    it('rejects empty string as language', async () => {
      await expect(runCode('code', '' as any, '', 1000))
        .rejects
        .toThrow('Unsupported language: ');
    });
  });

  describe('runTestsForLanguage', () => {
    it('rejects unsupported languages', async () => {
      await expect(runTestsForLanguage('code', [], 'solution', 'yaml' as any, 1000))
        .rejects
        .toThrow('Unsupported language: yaml');
    });

    it('rejects java as unsupported', async () => {
      await expect(runTestsForLanguage('code', [], 'solution', 'java' as any, 1000))
        .rejects
        .toThrow('Unsupported language: java');
    });

    it('rejects rust as unsupported', async () => {
      await expect(runTestsForLanguage('code', [], 'solution', 'rust' as any, 1000))
        .rejects
        .toThrow('Unsupported language: rust');
    });
  });
});

describe('clearPyodide', () => {
  it('can be called multiple times without error', () => {
    expect(() => {
      clearPyodide();
      clearPyodide();
      clearPyodide();
    }).not.toThrow();
  });
});

describe('clearJSCPP', () => {
  it('can be called multiple times without error', () => {
    expect(() => {
      clearJSCPP();
      clearJSCPP();
      clearJSCPP();
    }).not.toThrow();
  });
});

describe('C/C++ code execution via JSCPP', () => {
  it('executes simple C code that returns no output', async () => {
    const result = await runCode('int main() { return 0; }', 'c', '', 5000);
    expect(result).toBe('(No output)');
  });

  it('executes C code with printf output', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("Hello World");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('Hello World');
  });

  it('executes C code with newline in output', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("Line 1\\nLine 2");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('Line 1\nLine 2');
  });

  it('executes C code that uses stdin input', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        char name[100];
        scanf("%s", name);
        printf("Hello %s", name);
        return 0;
      }
    `;
    const result = await runCode(code, 'c', 'World', 5000);
    expect(result).toBe('Hello World');
  });

  it('executes C++ code with same syntax as C', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("CPP test");
        return 0;
      }
    `;
    const result = await runCode(code, 'cpp', '', 5000);
    expect(result).toBe('CPP test');
  });

  it('handles C code with integer calculations', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int a = 5;
        int b = 3;
        printf("%d", a + b);
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('8');
  });

  it('handles C code with loops', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        for (int i = 1; i <= 3; i++) {
          printf("%d ", i);
        }
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('1 2 3');
  });

  it('handles C code with functions', async () => {
    const code = `
      #include <stdio.h>
      int add(int a, int b) {
        return a + b;
      }
      int main() {
        printf("%d", add(10, 20));
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('30');
  });

  it('throws error for invalid C syntax', async () => {
    const code = `
      int main() {
        this is not valid C
        return 0;
      }
    `;
    await expect(runCode(code, 'c', '', 5000))
      .rejects
      .toThrow();
  });

  it('throws error for missing main function', async () => {
    const code = `
      #include <stdio.h>
      void helper() {
        printf("test");
      }
    `;
    await expect(runCode(code, 'c', '', 5000))
      .rejects
      .toThrow();
  });
});

describe('C test cases execution', () => {
  it('returns empty array for empty test cases', async () => {
    const results = await runTestsForLanguage(
      'int main() { return 0; }',
      [],
      'int main() { return 0; }',
      'c',
      5000
    );
    expect(results).toEqual([]);
  });

  it('executes test case with matching output', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("output");
        return 0;
      }
    `;
    const solution = code;
    const tests = [{ input: '', description: 'Basic test' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results).toHaveLength(1);
    expect(results[0].passed).toBe(true);
  });

  it('fails test case with mismatched output', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("wrong");
        return 0;
      }
    `;
    const solution = `
      #include <stdio.h>
      int main() {
        printf("correct");
        return 0;
      }
    `;
    const tests = [{ input: '', description: 'Mismatch test' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results).toHaveLength(1);
    expect(results[0].passed).toBe(false);
    expect(results[0].actualOutput).toBe('wrong');
    expect(results[0].expectedOutput).toBe('correct');
  });

  it('handles test case with stdin input', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int n;
        scanf("%d", &n);
        printf("%d", n * 2);
        return 0;
      }
    `;
    const solution = code;
    const tests = [{ input: '5', description: 'Double test' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results).toHaveLength(1);
    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('10');
  });

  it('handles multiple test cases', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int n;
        scanf("%d", &n);
        printf("%d", n * n);
        return 0;
      }
    `;
    const solution = code;
    const tests = [
      { input: '2', description: 'Square of 2' },
      { input: '3', description: 'Square of 3' },
      { input: '5', description: 'Square of 5' },
    ];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results).toHaveLength(3);
    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('4');
    expect(results[1].passed).toBe(true);
    expect(results[1].actualOutput).toBe('9');
    expect(results[2].passed).toBe(true);
    expect(results[2].actualOutput).toBe('25');
  });

  it('captures error in test result for invalid code', async () => {
    const code = 'not valid c';
    const solution = 'int main() { return 0; }';
    const tests = [{ input: '', description: 'Error test' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results).toHaveLength(1);
    expect(results[0].passed).toBe(false);
    expect(results[0].error).toBeDefined();
  });
});

describe('error message formatting', () => {
  it('propagates language errors with clear message', async () => {
    try {
      await runCode('code', 'fortran' as any);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toContain('fortran');
    }
  });

  it('includes language name in error for runTestsForLanguage', async () => {
    try {
      await runTestsForLanguage('code', [], 'solution', 'cobol' as any);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toContain('cobol');
    }
  });
});

describe('output normalization', () => {
  it('trims trailing whitespace from C output', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("test  ");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('test');
  });

  it('normalizes line endings in test comparison', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("a\\nb");
        return 0;
      }
    `;
    const solution = code;
    const tests = [{ input: '', description: 'Line ending test' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
  });
});

describe('C function-based tests', () => {
  it('detects and tests a non-main function', async () => {
    const code = `
      #include <stdio.h>
      int add(int a, int b) {
        return a + b;
      }
    `;
    const solution = code;
    const tests = [
      { input: '2, 3', description: 'Add 2 and 3' },
      { input: '0, 0', description: 'Add zeros' },
    ];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results).toHaveLength(2);
    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('5');
    expect(results[1].passed).toBe(true);
    expect(results[1].actualOutput).toBe('0');
  });

  it('handles void functions with main calling them', async () => {
    // Note: For void functions without a main, the code-runner generates a main that
    // calls the function, but it won't print anything since the function is void.
    // So we test with a function that has main already.
    const code = `
      #include <stdio.h>
      void greet() {
        printf("Hello");
      }
      int main() {
        greet();
        return 0;
      }
    `;
    const solution = code;
    const tests = [{ input: '', description: 'Greet test' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('Hello');
  });

  it('handles float return type with default format', async () => {
    const code = `
      #include <stdio.h>
      float divide(int a, int b) {
        return (float)a / b;
      }
    `;
    const solution = code;
    const tests = [{ input: '10, 4', description: 'Divide 10 by 4' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toContain('2.5');
  });
});

describe('C code with arrays', () => {
  it('handles array parameters', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int arr[3] = {1, 2, 3};
        int sum = 0;
        for (int i = 0; i < 3; i++) {
          sum += arr[i];
        }
        printf("%d", sum);
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('6');
  });

  it('handles character arrays (strings)', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        char str[] = "test";
        printf("%s", str);
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('test');
  });
});

describe('cpp language alias', () => {
  it('runs C++ code using cpp language identifier', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int x = 5;
        int y = 10;
        printf("%d", x + y);
        return 0;
      }
    `;
    const result = await runCode(code, 'cpp', '', 5000);
    expect(result).toBe('15');
  });

  it('runs C++ tests with cpp language identifier', async () => {
    const code = `
      #include <stdio.h>
      int square(int n) {
        return n * n;
      }
    `;
    const solution = code;
    const tests = [{ input: '7', description: 'Square of 7' }];

    const results = await runTestsForLanguage(code, tests, solution, 'cpp', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('49');
  });
});

describe('test result structure', () => {
  it('includes test case in result', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("output");
        return 0;
      }
    `;
    const tests = [{ input: '', description: 'My test description' }];

    const results = await runTestsForLanguage(code, tests, code, 'c', 5000);

    expect(results[0].testCase).toEqual({ input: '', description: 'My test description' });
  });

  it('includes both expected and actual output in failed test', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("actual");
        return 0;
      }
    `;
    const solution = `
      #include <stdio.h>
      int main() {
        printf("expected");
        return 0;
      }
    `;
    const tests = [{ input: '', description: 'Compare outputs' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(false);
    expect(results[0].actualOutput).toBe('actual');
    expect(results[0].expectedOutput).toBe('expected');
  });
});

describe('edge cases in code execution', () => {
  it('handles programs with multiple printf calls', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        printf("Line 1");
        printf("\\n");
        printf("Line 2");
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('Line 1\nLine 2');
  });

  it('handles programs with conditional logic', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int n;
        scanf("%d", &n);
        if (n > 0) {
          printf("positive");
        } else if (n < 0) {
          printf("negative");
        } else {
          printf("zero");
        }
        return 0;
      }
    `;

    expect(await runCode(code, 'c', '5', 5000)).toBe('positive');
    expect(await runCode(code, 'c', '-3', 5000)).toBe('negative');
    expect(await runCode(code, 'c', '0', 5000)).toBe('zero');
  });

  it('handles recursive functions', async () => {
    const code = `
      #include <stdio.h>
      int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
      }
      int main() {
        printf("%d", factorial(5));
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('120');
  });
});

describe('C function return type handling', () => {
  it('handles long return type with correct format specifier', async () => {
    const code = `
      #include <stdio.h>
      long multiply(long a, long b) {
        return a * b;
      }
    `;
    const solution = code;
    const tests = [{ input: '1000, 1000', description: 'Multiply large numbers' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('1000000');
  });

  it('handles short return type with correct format specifier', async () => {
    const code = `
      #include <stdio.h>
      short add(short a, short b) {
        return a + b;
      }
    `;
    const solution = code;
    const tests = [{ input: '10, 20', description: 'Add short values' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('30');
  });

  it('handles double return type', async () => {
    const code = `
      #include <stdio.h>
      double divide(double a, double b) {
        return a / b;
      }
    `;
    const solution = code;
    const tests = [{ input: '10.0, 4.0', description: 'Divide doubles' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toContain('2.5');
  });

  it('handles char return type', async () => {
    const code = `
      #include <stdio.h>
      char getChar(int n) {
        return 'A' + n;
      }
    `;
    const solution = code;
    const tests = [{ input: '2', description: 'Get char at offset' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('C');
  });

  it('handles void functions correctly', async () => {
    const code = `
      #include <stdio.h>
      void printHello() {
        printf("Hello");
      }
      int main() {
        printHello();
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('Hello');
  });

  it('handles int return type (basic case)', async () => {
    const code = `
      #include <stdio.h>
      int square(int n) {
        return n * n;
      }
    `;
    const solution = code;
    const tests = [{ input: '5', description: 'Square of 5' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('25');
  });
});
