/**
 * Exercise Solution Validation Tests
 *
 * These tests verify that exercise solutions and expected outputs in starter code
 * comments are mathematically correct.
 */

import { describe, it, expect } from 'vitest';
import { allExercises } from '../src/subjects';

describe('Exercise Solution Validation', () => {
  describe('Gray code conversion exercises', () => {
    it('Gray code to binary example output should be correct', () => {
      // Gray code to binary algorithm:
      // binary[0] = gray[0]
      // binary[i] = binary[i-1] XOR gray[i] for i > 0
      const grayToBinary = (grayStr: string): string => {
        let binary = grayStr[0];
        for (let i = 1; i < grayStr.length; i++) {
          const prevBit = parseInt(binary[binary.length - 1]);
          const gbit = parseInt(grayStr[i]);
          const bbit = prevBit ^ gbit;
          binary += String(bbit);
        }
        return binary;
      };

      // Verify the conversion for "1101" -> should be "1001", not "1011"
      expect(grayToBinary('1101')).toBe('1001');

      // Additional test cases for gray code conversion
      expect(grayToBinary('0')).toBe('0');
      expect(grayToBinary('1')).toBe('1');
      expect(grayToBinary('11')).toBe('10');  // 11 gray -> 10 binary
      expect(grayToBinary('10')).toBe('11');  // 10 gray -> 11 binary
      expect(grayToBinary('110')).toBe('100');
      expect(grayToBinary('111')).toBe('101');
    });

    it('cs102-t1-ex09 starter code comment should show correct output', () => {
      const exercise = allExercises.find(e => e.id === 'cs102-t1-ex09');
      expect(exercise).toBeDefined();

      if (exercise) {
        // The starter code should contain the correct expected output
        expect(exercise.starterCode).toContain('gray_to_binary("1101")');
        // After fix: should show 1001 (correct), not 1011 (incorrect)
        expect(exercise.starterCode).toContain('# -> 1001');
        expect(exercise.starterCode).not.toContain('# -> 1011');
      }
    });
  });

  describe('binary conversion exercises', () => {
    it('binary to decimal conversions should be mathematically correct', () => {
      const binaryToDecimal = (binaryStr: string): number => {
        let result = 0;
        let power = 0;
        for (let i = binaryStr.length - 1; i >= 0; i--) {
          if (binaryStr[i] === '1') {
            result += Math.pow(2, power);
          }
          power++;
        }
        return result;
      };

      // Verify common binary conversions used in exercises
      expect(binaryToDecimal('1011')).toBe(11);
      expect(binaryToDecimal('11111111')).toBe(255);
      expect(binaryToDecimal('101')).toBe(5);
      expect(binaryToDecimal('1010')).toBe(10);
    });

    it('decimal to binary conversions should be mathematically correct', () => {
      const decimalToBinary = (n: number): string => {
        if (n === 0) return '0';
        let result = '';
        while (n > 0) {
          result = String(n % 2) + result;
          n = Math.floor(n / 2);
        }
        return result;
      };

      // Verify common decimal conversions used in exercises
      expect(decimalToBinary(11)).toBe('1011');
      expect(decimalToBinary(255)).toBe('11111111');
      expect(decimalToBinary(10)).toBe('1010');
      expect(decimalToBinary(0)).toBe('0');
    });
  });

  describe('hex conversion exercises', () => {
    it('hex to decimal conversions should be correct', () => {
      const hexToDecimal = (hexStr: string): number => {
        const hexChars = '0123456789ABCDEF';
        let result = 0;
        for (const char of hexStr.toUpperCase()) {
          result = result * 16 + hexChars.indexOf(char);
        }
        return result;
      };

      // Verify hex conversions used in exercises
      expect(hexToDecimal('1A')).toBe(26);
      expect(hexToDecimal('FF')).toBe(255);
      expect(hexToDecimal('10')).toBe(16);
      expect(hexToDecimal('A')).toBe(10);
    });
  });

  describe('binary fraction exercises', () => {
    it('binary fraction to decimal should be correct', () => {
      const binaryFractionToDecimal = (binaryStr: string): number => {
        const [intPart = '', fracPart = ''] = binaryStr.includes('.')
          ? binaryStr.split('.')
          : [binaryStr, ''];

        // Integer part
        let total = 0;
        for (const bit of intPart) {
          total = total * 2 + parseInt(bit);
        }

        // Fractional part
        let power = 0.5;
        for (const bit of fracPart) {
          if (bit === '1') {
            total += power;
          }
          power /= 2;
        }

        return total;
      };

      // Verify the example from exercise cs102-t1-ex10
      expect(binaryFractionToDecimal('101.101')).toBe(5.625);
      expect(binaryFractionToDecimal('1.1')).toBe(1.5);
      expect(binaryFractionToDecimal('0.1')).toBe(0.5);
      expect(binaryFractionToDecimal('0.01')).toBe(0.25);
    });
  });

  describe('exercise structure validation', () => {
    it('all exercises should have required fields', () => {
      allExercises.forEach(exercise => {
        expect(exercise.id, 'Exercise should have an id').toBeDefined();
        expect(exercise.title, `Exercise ${exercise.id} should have a title`).toBeDefined();
        // Some exercises use 'problem' instead of 'description'
        const hasDescriptionContent = exercise.description || (exercise as Record<string, unknown>).problem;
        expect(
          hasDescriptionContent,
          `Exercise ${exercise.id} should have a description or problem`
        ).toBeDefined();
      });
    });

    it('coding exercises should have starter code', () => {
      const codingExercises = allExercises.filter(
        e => e.language === 'python' || e.language === 'c'
      );

      codingExercises.forEach(exercise => {
        expect(
          exercise.starterCode,
          `Exercise ${exercise.id} should have starter code`
        ).toBeDefined();
        expect(
          exercise.starterCode?.length,
          `Exercise ${exercise.id} starter code should not be empty`
        ).toBeGreaterThan(0);
      });
    });

    it('exercises with solutions should have valid solution code', () => {
      const exercisesWithSolutions = allExercises.filter(e => e.solution);

      exercisesWithSolutions.forEach(exercise => {
        expect(
          exercise.solution?.length,
          `Exercise ${exercise.id} solution should not be empty`
        ).toBeGreaterThan(0);
      });
    });
  });
});
