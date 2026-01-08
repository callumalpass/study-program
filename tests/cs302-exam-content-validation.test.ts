/**
 * CS302 Computer Networks Exam Content Validation Tests
 *
 * These tests validate the correctness of exam content for CS302,
 * including mathematical calculations like Hamming distance.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Exam } from '../src/core/types';

const SUBJECTS_PATH = join(__dirname, '../src/subjects');

/**
 * Calculate the Hamming distance between two strings.
 * Hamming distance is the number of positions at which corresponding
 * characters differ.
 */
function calculateHammingDistance(str1: string, str2: string): number {
  if (str1.length !== str2.length) {
    throw new Error('Strings must be of equal length for Hamming distance');
  }
  let distance = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      distance++;
    }
  }
  return distance;
}

describe('CS302 Computer Networks Exam Content Validation', () => {
  const examPath = join(SUBJECTS_PATH, 'cs302/exams.json');

  it('exam file should exist', () => {
    expect(existsSync(examPath)).toBe(true);
  });

  describe('Hamming Distance Questions', () => {
    let exams: Exam[];

    beforeAll(() => {
      const content = readFileSync(examPath, 'utf-8');
      exams = JSON.parse(content);
    });

    it('mid-q11: Hamming distance calculation should be correct', () => {
      // Find the midterm exam
      const midterm = exams.find(e => e.id === 'cs302-exam-midterm');
      expect(midterm).toBeDefined();

      // Find the Hamming distance question
      const question = midterm!.questions.find(q => q.id === 'mid-q11');
      expect(question).toBeDefined();
      expect(question!.type).toBe('code_output');

      // Extract the strings from the code snippet
      // Format: string1 = "10110"\nstring2 = "11001"
      const codeSnippet = question!.codeSnippet!;
      expect(codeSnippet).toContain('string1');
      expect(codeSnippet).toContain('string2');

      // Parse the strings
      const string1Match = codeSnippet.match(/string1\s*=\s*"([^"]+)"/);
      const string2Match = codeSnippet.match(/string2\s*=\s*"([^"]+)"/);

      expect(string1Match).not.toBeNull();
      expect(string2Match).not.toBeNull();

      const string1 = string1Match![1];
      const string2 = string2Match![1];

      // Calculate the actual Hamming distance
      const actualHammingDistance = calculateHammingDistance(string1, string2);

      // Verify the correct answer matches our calculation
      expect(question!.correctAnswer).toBe(String(actualHammingDistance));
    });

    it('verifies Hamming distance for "10110" and "11001" is 4', () => {
      // This is a standalone verification of the specific case
      const str1 = '10110';
      const str2 = '11001';

      // Position 0: 1 vs 1 = same
      // Position 1: 0 vs 1 = different
      // Position 2: 1 vs 0 = different
      // Position 3: 1 vs 0 = different
      // Position 4: 0 vs 1 = different
      // Total differences: 4

      expect(calculateHammingDistance(str1, str2)).toBe(4);
    });

    it('Hamming distance helper function works correctly', () => {
      // Test various cases
      expect(calculateHammingDistance('000', '000')).toBe(0);
      expect(calculateHammingDistance('111', '000')).toBe(3);
      expect(calculateHammingDistance('10101', '01010')).toBe(5);
      expect(calculateHammingDistance('1100', '1010')).toBe(2);
      expect(calculateHammingDistance('abc', 'abc')).toBe(0);
      expect(calculateHammingDistance('abc', 'xyz')).toBe(3);
    });

    it('Hamming distance throws for unequal length strings', () => {
      expect(() => calculateHammingDistance('10', '101')).toThrow();
      expect(() => calculateHammingDistance('', 'a')).toThrow();
    });
  });

  describe('ARP Protocol Questions', () => {
    let exams: Exam[];

    beforeAll(() => {
      const content = readFileSync(examPath, 'utf-8');
      exams = JSON.parse(content);
    });

    it('mid-q10: ARP protocol answer is correct', () => {
      const midterm = exams.find(e => e.id === 'cs302-exam-midterm');
      expect(midterm).toBeDefined();

      const question = midterm!.questions.find(q => q.id === 'mid-q10');
      expect(question).toBeDefined();
      expect(question!.type).toBe('multiple_choice');

      // ARP maps IP addresses to MAC addresses
      const correctOption = question!.options![question!.correctAnswer as number];
      expect(correctOption).toBe('IP to MAC address');
    });
  });

  describe('Subnet Mask Questions', () => {
    let exams: Exam[];

    beforeAll(() => {
      const content = readFileSync(examPath, 'utf-8');
      exams = JSON.parse(content);
    });

    it('mid-q12: /24 subnet mask should be 255.255.255.0', () => {
      const midterm = exams.find(e => e.id === 'cs302-exam-midterm');
      expect(midterm).toBeDefined();

      const question = midterm!.questions.find(q => q.id === 'mid-q12');
      expect(question).toBeDefined();

      // For /24 network, the subnet mask is 255.255.255.0
      // That's 24 bits of 1s followed by 8 bits of 0s
      const correctOption = question!.options![question!.correctAnswer as number];
      expect(correctOption).toBe('255.255.255.0');
    });
  });

  describe('Subnet Calculation Questions', () => {
    let exams: Exam[];

    beforeAll(() => {
      const content = readFileSync(examPath, 'utf-8');
      exams = JSON.parse(content);
    });

    it('final-q16: 10.5.5.5 and 10.5.6.5 are NOT in the same /23 subnet', () => {
      const final = exams.find(e => e.id === 'cs302-exam-final');
      expect(final).toBeDefined();

      const question = final!.questions.find(q => q.id === 'final-q16');
      expect(question).toBeDefined();
      expect(question!.type).toBe('code_output');

      // Verify the answer is "no" - they are in different /23 subnets
      // 10.5.5.5 is in 10.5.4.0/23 (covers 10.5.4.x and 10.5.5.x)
      // 10.5.6.5 is in 10.5.6.0/23 (covers 10.5.6.x and 10.5.7.x)
      expect(question!.correctAnswer).toBe('no');
    });

    it('validates /23 subnet calculation logic', () => {
      // A /23 subnet has a mask of 255.255.254.0
      // This means the third octet's least significant bit is part of the host portion
      // /23 subnets are aligned to even numbers in the third octet

      // Helper function to calculate /23 network address
      const getSlash23Network = (thirdOctet: number): number => {
        // Mask 254 (11111110) clears the least significant bit
        return thirdOctet & 254;
      };

      // 10.5.5.5: Third octet 5 & 254 = 4, so network is 10.5.4.0/23
      expect(getSlash23Network(5)).toBe(4);

      // 10.5.6.5: Third octet 6 & 254 = 6, so network is 10.5.6.0/23
      expect(getSlash23Network(6)).toBe(6);

      // These are different networks, confirming the answer should be "no"
      expect(getSlash23Network(5)).not.toBe(getSlash23Network(6));
    });

    it('verifies /23 subnet boundaries', () => {
      // /23 subnets span two consecutive Class C networks
      const getSlash23Network = (thirdOctet: number): number => thirdOctet & 254;

      // Verify subnet boundaries
      // 10.5.0.0/23 covers .0.x and .1.x
      expect(getSlash23Network(0)).toBe(0);
      expect(getSlash23Network(1)).toBe(0);

      // 10.5.2.0/23 covers .2.x and .3.x
      expect(getSlash23Network(2)).toBe(2);
      expect(getSlash23Network(3)).toBe(2);

      // 10.5.4.0/23 covers .4.x and .5.x
      expect(getSlash23Network(4)).toBe(4);
      expect(getSlash23Network(5)).toBe(4);

      // 10.5.6.0/23 covers .6.x and .7.x
      expect(getSlash23Network(6)).toBe(6);
      expect(getSlash23Network(7)).toBe(6);
    });
  });

  describe('Exam Structure Validation', () => {
    let exams: Exam[];

    beforeAll(() => {
      const content = readFileSync(examPath, 'utf-8');
      exams = JSON.parse(content);
    });

    it('should have both midterm and final exams', () => {
      const midterm = exams.find(e => e.id === 'cs302-exam-midterm');
      const final = exams.find(e => e.id === 'cs302-exam-final');

      expect(midterm).toBeDefined();
      expect(final).toBeDefined();
    });

    it('all multiple choice questions should have valid correctAnswer indices', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'multiple_choice') {
            expect(question.options).toBeDefined();
            expect(question.options!.length).toBeGreaterThan(0);

            if (typeof question.correctAnswer === 'number') {
              expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
              expect(question.correctAnswer).toBeLessThan(question.options!.length);
            } else if (typeof question.correctAnswer === 'string') {
              // String correctAnswer should match one of the options
              expect(question.options).toContain(question.correctAnswer);
            }
          }
        }
      }
    });

    it('all code_output questions should have code snippets', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'code_output') {
            expect(question.codeSnippet).toBeDefined();
            expect(question.codeSnippet!.length).toBeGreaterThan(0);
          }
        }
      }
    });

    it('all questions should have explanations', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          expect(question.explanation).toBeDefined();
          expect(question.explanation.length).toBeGreaterThan(0);
        }
      }
    });
  });
});

describe('Hamming Distance Algorithm Verification', () => {
  it('correctly counts single bit differences', () => {
    expect(calculateHammingDistance('0', '1')).toBe(1);
    expect(calculateHammingDistance('1', '0')).toBe(1);
    expect(calculateHammingDistance('0', '0')).toBe(0);
    expect(calculateHammingDistance('1', '1')).toBe(0);
  });

  it('correctly counts multiple bit differences', () => {
    // All bits different
    expect(calculateHammingDistance('0000', '1111')).toBe(4);
    expect(calculateHammingDistance('1111', '0000')).toBe(4);

    // Half bits different
    expect(calculateHammingDistance('0011', '1100')).toBe(4);
    expect(calculateHammingDistance('0101', '1010')).toBe(4);

    // Alternating pattern
    expect(calculateHammingDistance('01010101', '10101010')).toBe(8);
  });

  it('handles longer strings', () => {
    const str1 = '10110100101';
    const str2 = '10010110101';
    // Position by position comparison:
    // 1-1, 0-0, 1-0, 1-1, 0-0, 1-1, 0-1, 0-0, 1-1, 0-0, 1-1
    // Differences at positions 2, 6 = 2 differences
    expect(calculateHammingDistance(str1, str2)).toBe(2);
  });

  it('handles alphabetic strings', () => {
    expect(calculateHammingDistance('karolin', 'kathrin')).toBe(3);
    // k-k, a-a, r-t, o-h, l-r, i-i, n-n = 3 differences
  });

  it('is commutative', () => {
    const str1 = '10110';
    const str2 = '11001';
    expect(calculateHammingDistance(str1, str2)).toBe(calculateHammingDistance(str2, str1));
  });
});
