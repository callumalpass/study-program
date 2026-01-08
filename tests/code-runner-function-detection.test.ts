/**
 * Code Runner Function Detection Tests
 *
 * Tests for function detection and return type parsing in C/C++ code,
 * focusing on edge cases with compound types and various function signatures.
 */

import { describe, expect, it, beforeEach } from 'vitest';
import {
  runTestsForLanguage,
  clearJSCPP,
} from '../src/components/code-runner';

beforeEach(() => {
  clearJSCPP();
});

describe('C function detection with compound return types', () => {
  it('detects function with unsigned int return type', async () => {
    const code = `
      #include <stdio.h>
      unsigned int add(unsigned int a, unsigned int b) {
        return a + b;
      }
    `;
    const solution = code;
    const tests = [{ input: '5, 3', description: 'Add 5 and 3' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('8');
  });

  it('detects function with long int return type', async () => {
    const code = `
      #include <stdio.h>
      long int multiply(long int a, long int b) {
        return a * b;
      }
    `;
    const solution = code;
    const tests = [{ input: '100, 200', description: 'Multiply 100 and 200' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('20000');
  });

  it('detects function with signed int return type', async () => {
    const code = `
      #include <stdio.h>
      signed int negate(signed int n) {
        return -n;
      }
    `;
    const solution = code;
    const tests = [{ input: '42', description: 'Negate 42' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('-42');
  });

  it('detects function with const return type modifier', async () => {
    const code = `
      #include <stdio.h>
      const int add_const(int a, int b) {
        return a + b;
      }
    `;
    const solution = code;
    const tests = [{ input: '10, 5', description: 'Add with const return' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('15');
  });

  it('detects function with static modifier', async () => {
    const code = `
      #include <stdio.h>
      static int helper(int n) {
        return n * 2;
      }
    `;
    const solution = code;
    const tests = [{ input: '5', description: 'Double 5' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('10');
  });
});

describe('C function detection with various signatures', () => {
  it('handles function with single parameter', async () => {
    const code = `
      #include <stdio.h>
      int double_it(int n) {
        return n * 2;
      }
    `;
    const solution = code;
    const tests = [{ input: '21', description: 'Double 21' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('42');
  });

  it('handles function with multiple parameters of different types', async () => {
    const code = `
      #include <stdio.h>
      int mixed_params(int a, float b, int c) {
        return a + (int)b + c;
      }
    `;
    const solution = code;
    const tests = [{ input: '1, 2.5, 3', description: 'Mixed params' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('6');
  });

  it('handles void function with parameter correctly', async () => {
    const code = `
      #include <stdio.h>
      void print_num(int n) {
        printf("Number: %d", n);
      }
    `;
    const solution = code;
    const tests = [{ input: '42', description: 'Print 42' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('Number: 42');
  });

  it('handles double return type correctly', async () => {
    const code = `
      #include <stdio.h>
      double divide(double a, double b) {
        return a / b;
      }
    `;
    const solution = code;
    const tests = [{ input: '10.0, 4.0', description: 'Divide 10 by 4' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toContain('2.5');
  });
});

describe('C function detection with existing main', () => {
  it('uses existing main function when present', async () => {
    const code = `
      #include <stdio.h>
      int square(int n) {
        return n * n;
      }
      int main() {
        int n;
        scanf("%d", &n);
        printf("%d", square(n));
        return 0;
      }
    `;
    const solution = code;
    const tests = [{ input: '7', description: 'Square of 7' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('49');
  });

  it('handles program with only main function', async () => {
    const code = `
      #include <stdio.h>
      int main() {
        int a, b;
        scanf("%d %d", &a, &b);
        printf("%d", a + b);
        return 0;
      }
    `;
    const solution = code;
    const tests = [{ input: '3 5', description: 'Add two numbers' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('8');
  });
});

describe('C code with helper functions', () => {
  it('handles code with multiple helper functions', async () => {
    const code = `
      #include <stdio.h>
      int max(int a, int b) {
        return a > b ? a : b;
      }
      int min(int a, int b) {
        return a < b ? a : b;
      }
      int range(int a, int b) {
        return max(a, b) - min(a, b);
      }
    `;
    const solution = code;
    // The first function detected should be 'max'
    const tests = [{ input: '10, 3', description: 'Max of 10 and 3' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('10');
  });

  it('handles recursive function', async () => {
    const code = `
      #include <stdio.h>
      int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
      }
    `;
    const solution = code;
    const tests = [{ input: '5', description: 'Factorial of 5' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('120');
  });
});

describe('Edge cases in function detection', () => {
  it('handles function with leading whitespace', async () => {
    const code = `
      #include <stdio.h>

        int indented_func(int n) {
          return n + 1;
        }
    `;
    const solution = code;
    const tests = [{ input: '10', description: 'Add 1' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('11');
  });

  it('handles function with unusual spacing', async () => {
    const code = `
      #include <stdio.h>
      int   spaced_func  (  int   n  ) {
        return n * 2;
      }
    `;
    const solution = code;
    const tests = [{ input: '6', description: 'Double 6' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('12');
  });

  it('handles function after preprocessor directives', async () => {
    const code = `
      #include <stdio.h>
      #define MAX_VAL 100

      int clamp(int n) {
        if (n > MAX_VAL) return MAX_VAL;
        return n;
      }
    `;
    const solution = code;
    const tests = [
      { input: '50', description: 'Below max' },
      { input: '150', description: 'Above max' },
    ];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('50');
    expect(results[1].passed).toBe(true);
    expect(results[1].actualOutput).toBe('100');
  });
});
