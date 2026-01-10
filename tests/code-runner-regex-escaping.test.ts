/**
 * Code Runner Regex Escaping Tests
 *
 * Tests for the regex escaping functionality in the code-runner module.
 * These tests verify that function names with special characters are handled correctly.
 *
 * Note: These tests focus on C/C++ as Python tests require Pyodide which
 * isn't available in the test environment.
 */

import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import {
  runTestsForLanguage,
  clearJSCPP,
} from '../src/components/code-runner';

beforeEach(() => {
  clearJSCPP();
});

afterEach(() => {
  clearJSCPP();
});

describe('C function name handling', () => {
  describe('standard function names', () => {
    it('handles function names with underscores', async () => {
      const code = `
        #include <stdio.h>
        int add_numbers(int a, int b) {
            return a + b;
        }
      `;
      const solution = code;
      const tests = [
        { input: '10, 20', description: 'Add 10 and 20' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('30');
    });

    it('handles function names with multiple underscores', async () => {
      const code = `
        #include <stdio.h>
        int __hidden_multiply__(int x, int y) {
            return x * y;
        }
      `;
      const solution = code;
      const tests = [
        { input: '3, 4', description: 'Multiply 3 and 4' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('12');
    });

    it('handles single letter function names', async () => {
      const code = `
        #include <stdio.h>
        int f(int n) {
            return n * 2;
        }
      `;
      const solution = code;
      const tests = [
        { input: '5', description: 'Double 5' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('10');
    });

    it('handles long function names', async () => {
      const code = `
        #include <stdio.h>
        int calculate_the_sum_of_two_integers(int a, int b) {
            return a + b;
        }
      `;
      const solution = code;
      const tests = [
        { input: '100, 200', description: 'Add 100 and 200' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('300');
    });
  });

  describe('function return types', () => {
    it('handles unsigned int return type', async () => {
      const code = `
        #include <stdio.h>
        unsigned int double_value(unsigned int n) {
            return n * 2;
        }
      `;
      const solution = code;
      const tests = [
        { input: '5', description: 'Double 5' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('10');
    });

    it('handles static function', async () => {
      const code = `
        #include <stdio.h>
        static int helper_function(int n) {
            return n + 100;
        }
      `;
      const solution = code;
      const tests = [
        { input: '5', description: 'Add 100 to 5' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('105');
    });

    it('handles long return type', async () => {
      const code = `
        #include <stdio.h>
        long multiply_big(long a, long b) {
            return a * b;
        }
      `;
      const solution = code;
      const tests = [
        { input: '1000, 1000', description: 'Multiply 1000 by 1000' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('1000000');
    });

    it('handles short return type', async () => {
      const code = `
        #include <stdio.h>
        short add_short(short a, short b) {
            return a + b;
        }
      `;
      const solution = code;
      const tests = [
        { input: '10, 20', description: 'Add shorts' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('30');
    });

    it('handles float return type', async () => {
      const code = `
        #include <stdio.h>
        float divide_float(int a, int b) {
            return (float)a / b;
        }
      `;
      const solution = code;
      const tests = [
        { input: '10, 4', description: 'Divide 10 by 4' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toContain('2.5');
    });

    it('handles double return type', async () => {
      const code = `
        #include <stdio.h>
        double divide_double(double a, double b) {
            return a / b;
        }
      `;
      const solution = code;
      const tests = [
        { input: '10.0, 4.0', description: 'Divide doubles' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toContain('2.5');
    });

    it('handles char return type', async () => {
      const code = `
        #include <stdio.h>
        char get_char(int offset) {
            return 'A' + offset;
        }
      `;
      const solution = code;
      const tests = [
        { input: '2', description: 'Get char at offset 2' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('C');
    });
  });

  describe('multiple test cases', () => {
    it('handles multiple test cases for same function', async () => {
      const code = `
        #include <stdio.h>
        int square(int n) {
            return n * n;
        }
      `;
      const solution = code;
      const tests = [
        { input: '2', description: 'Square of 2' },
        { input: '3', description: 'Square of 3' },
        { input: '5', description: 'Square of 5' },
        { input: '0', description: 'Square of 0' },
        { input: '-2', description: 'Square of -2' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(5);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('4');
      expect(results[1].passed).toBe(true);
      expect(results[1].actualOutput).toBe('9');
      expect(results[2].passed).toBe(true);
      expect(results[2].actualOutput).toBe('25');
      expect(results[3].passed).toBe(true);
      expect(results[3].actualOutput).toBe('0');
      expect(results[4].passed).toBe(true);
      expect(results[4].actualOutput).toBe('4');
    });
  });

  describe('function with multiple parameters', () => {
    it('handles two integer parameters', async () => {
      const code = `
        #include <stdio.h>
        int add(int a, int b) {
            return a + b;
        }
      `;
      const solution = code;
      const tests = [
        { input: '7, 8', description: 'Add 7 and 8' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('15');
    });

    it('handles three integer parameters', async () => {
      const code = `
        #include <stdio.h>
        int sum_three(int a, int b, int c) {
            return a + b + c;
        }
      `;
      const solution = code;
      const tests = [
        { input: '1, 2, 3', description: 'Sum of 1, 2, 3' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('6');
    });

    it('handles mixed type parameters', async () => {
      const code = `
        #include <stdio.h>
        int process(int a, int b, int c) {
            return a * b + c;
        }
      `;
      const solution = code;
      const tests = [
        { input: '2, 3, 4', description: 'Process 2, 3, 4' },
      ];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('10');
    });
  });

  describe('main function handling', () => {
    it('uses existing main when present', async () => {
      const code = `
        #include <stdio.h>
        int helper() { return 42; }
        int main() {
            printf("%d", helper());
            return 0;
        }
      `;
      const solution = code;
      const tests = [{ input: '', description: 'Main test' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('42');
    });

    it('creates main for standalone function without existing main', async () => {
      const code = `
        #include <stdio.h>
        int square(int n) {
            return n * n;
        }
      `;
      const solution = code;
      const tests = [{ input: '7', description: 'Square 7' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('49');
    });
  });

  describe('include handling', () => {
    it('adds stdio.h when missing', async () => {
      const code = `
        int double_it(int n) {
            return n * 2;
        }
      `;
      const solution = code;
      const tests = [{ input: '21', description: 'Double 21' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('42');
    });

    it('does not duplicate stdio.h when present', async () => {
      const code = `
        #include <stdio.h>
        int double_it(int n) {
            return n * 2;
        }
      `;
      const solution = code;
      const tests = [{ input: '21', description: 'Double 21' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('42');
    });
  });

  describe('edge cases in function detection', () => {
    it('handles function with no parameters via main', async () => {
      // Functions with no parameters need a main to call them properly
      const code = `
        #include <stdio.h>
        int get_value() {
            return 100;
        }
        int main() {
            printf("%d", get_value());
            return 0;
        }
      `;
      const solution = code;
      const tests = [{ input: '', description: 'Get value' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('100');
    });

    it('handles function on single line', async () => {
      const code = `
        #include <stdio.h>
        int identity(int x) { return x; }
      `;
      const solution = code;
      const tests = [{ input: '42', description: 'Identity 42' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('42');
    });

    it('handles recursive function', async () => {
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
      const solution = code;
      const tests = [{ input: '', description: 'Factorial of 5' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('120');
    });
  });

  describe('output matching', () => {
    it('fails when outputs do not match', async () => {
      // Both must use main and produce different output for proper comparison
      const userCode = `
        #include <stdio.h>
        int main() {
            printf("%d", 6);
            return 0;
        }
      `;
      const solutionCode = `
        #include <stdio.h>
        int main() {
            printf("%d", 10);
            return 0;
        }
      `;
      const tests = [{ input: '', description: 'Test mismatch' }];

      const results = await runTestsForLanguage(userCode, tests, solutionCode, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(false);
      expect(results[0].actualOutput).toBe('6');
      expect(results[0].expectedOutput).toBe('10');
    });

    it('passes when outputs match exactly', async () => {
      const code = `
        #include <stdio.h>
        int double_it(int n) {
            return n * 2;
        }
      `;
      const solution = code;
      const tests = [{ input: '5', description: 'Double 5' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results).toHaveLength(1);
      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('10');
      expect(results[0].expectedOutput).toBe('10');
    });
  });
});

describe('C++ language alias', () => {
  it('runs C++ code using cpp language identifier', async () => {
    const code = `
      #include <stdio.h>
      int add(int a, int b) {
          return a + b;
      }
    `;
    const solution = code;
    const tests = [{ input: '10, 20', description: 'Add 10 and 20' }];

    const results = await runTestsForLanguage(code, tests, solution, 'cpp', 5000);

    expect(results).toHaveLength(1);
    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('30');
  });
});
