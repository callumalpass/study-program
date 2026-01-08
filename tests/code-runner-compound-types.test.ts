/**
 * Code Runner Compound Type Tests
 *
 * Tests for C/C++ code runner handling of compound return types
 * like "unsigned int", "long long", "unsigned long", etc.
 *
 * Note: Tests use explicit main functions or provide input arguments
 * to properly trigger function-based test wrapping.
 */

import { describe, expect, it, beforeEach } from 'vitest';
import {
  runCode,
  runTestsForLanguage,
  clearJSCPP,
} from '../src/components/code-runner';

beforeEach(() => {
  clearJSCPP();
});

describe('C function return type detection', () => {
  describe('unsigned types', () => {
    it('handles unsigned int return type', async () => {
      const code = `
        #include <stdio.h>
        unsigned int get_value(int x) {
          return x;
        }
      `;
      const solution = code;
      const tests = [{ input: '42', description: 'Get unsigned int value' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('42');
    });

    it('handles unsigned long return type', async () => {
      const code = `
        #include <stdio.h>
        unsigned long get_big_value(long x) {
          return x;
        }
      `;
      const solution = code;
      const tests = [{ input: '1000000', description: 'Get unsigned long value' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('1000000');
    });

    it('handles unsigned char return type with main', async () => {
      const code = `
        #include <stdio.h>
        unsigned char get_char() {
          return 'X';
        }
        int main() {
          printf("%c", get_char());
          return 0;
        }
      `;
      const result = await runCode(code, 'c', '', 5000);
      expect(result).toBe('X');
    });
  });

  describe('signed types', () => {
    it('handles signed int return type', async () => {
      const code = `
        #include <stdio.h>
        signed int get_negative(int x) {
          return -x;
        }
      `;
      const solution = code;
      const tests = [{ input: '42', description: 'Get signed int value' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('-42');
    });

    it('handles signed long return type', async () => {
      const code = `
        #include <stdio.h>
        signed long get_signed_long(long x) {
          return -x;
        }
      `;
      const solution = code;
      const tests = [{ input: '1000', description: 'Get signed long value' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('-1000');
    });
  });

  describe('long types', () => {
    it('handles long int return type', async () => {
      const code = `
        #include <stdio.h>
        long int get_long_int(int x) {
          return x * 1000;
        }
      `;
      const solution = code;
      const tests = [{ input: '123', description: 'Get long int value' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('123000');
    });

    it('handles long long return type with main', async () => {
      const code = `
        #include <stdio.h>
        long long get_long_long() {
          return 987654321;
        }
        int main() {
          printf("%d", (int)get_long_long());
          return 0;
        }
      `;
      const result = await runCode(code, 'c', '', 5000);
      expect(result).toBe('987654321');
    });
  });

  describe('short types', () => {
    it('handles short int return type', async () => {
      const code = `
        #include <stdio.h>
        short int get_short(short x) {
          return x;
        }
      `;
      const solution = code;
      const tests = [{ input: '100', description: 'Get short int value' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('100');
    });

    it('handles unsigned short return type', async () => {
      const code = `
        #include <stdio.h>
        unsigned short get_ushort(short x) {
          return x;
        }
      `;
      const solution = code;
      const tests = [{ input: '255', description: 'Get unsigned short value' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('255');
    });
  });

  describe('const and static modifiers', () => {
    it('handles const int parameter', async () => {
      const code = `
        #include <stdio.h>
        int double_value(const int x) {
          return x * 2;
        }
      `;
      const solution = code;
      const tests = [{ input: '5', description: 'Double 5' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toBe('10');
    });

    it('handles static function', async () => {
      const code = `
        #include <stdio.h>
        static int add_one(int x) {
          return x + 1;
        }
        int main() {
          printf("%d", add_one(41));
          return 0;
        }
      `;
      const result = await runCode(code, 'c', '', 5000);
      expect(result).toBe('42');
    });
  });

  describe('floating point types', () => {
    it('handles float return type with calculation', async () => {
      const code = `
        #include <stdio.h>
        float divide(float a, float b) {
          return a / b;
        }
      `;
      const solution = code;
      const tests = [{ input: '10.0, 4.0', description: 'Divide 10 by 4' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toContain('2.5');
    });

    it('handles double return type with calculation', async () => {
      const code = `
        #include <stdio.h>
        double average(double a, double b) {
          return (a + b) / 2.0;
        }
      `;
      const solution = code;
      const tests = [{ input: '10.0, 20.0', description: 'Average of 10 and 20' }];

      const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

      expect(results[0].passed).toBe(true);
      expect(results[0].actualOutput).toContain('15');
    });
  });
});

describe('Function detection edge cases', () => {
  it('does not create test wrapper when main exists', async () => {
    const code = `
      #include <stdio.h>
      int add(int a, int b) {
        return a + b;
      }
      int main() {
        printf("%d", add(3, 4));
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('7');
  });

  it('handles function with void return type', async () => {
    const code = `
      #include <stdio.h>
      void print_sum(int a, int b) {
        printf("%d", a + b);
      }
      int main() {
        print_sum(5, 3);
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('8');
  });

  it('handles multiple functions defined', async () => {
    const code = `
      #include <stdio.h>
      int helper(int x) {
        return x * 2;
      }
      int main_func(int x) {
        return helper(x) + 1;
      }
      int main() {
        printf("%d", main_func(5));
        return 0;
      }
    `;
    const result = await runCode(code, 'c', '', 5000);
    expect(result).toBe('11');
  });
});

describe('Printf format specifier handling', () => {
  it('uses %d for basic int', async () => {
    const code = `
      #include <stdio.h>
      int get_answer(int x) {
        return x;
      }
    `;
    const solution = code;
    const tests = [{ input: '42', description: 'Basic int test' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('42');
  });

  it('uses %f for float', async () => {
    const code = `
      #include <stdio.h>
      float get_pi(float x) {
        return x;
      }
    `;
    const solution = code;
    const tests = [{ input: '3.14', description: 'Float test' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toContain('3.14');
  });

  it('uses %c for char', async () => {
    const code = `
      #include <stdio.h>
      char get_letter(char c) {
        return c;
      }
    `;
    const solution = code;
    const tests = [{ input: "'Z'", description: 'Char test' }];

    const results = await runTestsForLanguage(code, tests, solution, 'c', 5000);

    expect(results[0].passed).toBe(true);
    expect(results[0].actualOutput).toBe('Z');
  });
});
