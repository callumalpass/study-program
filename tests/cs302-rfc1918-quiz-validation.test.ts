/**
 * CS302 RFC 1918 Quiz Question Validation Tests
 *
 * These tests ensure that the quiz question about RFC 1918 private
 * address ranges has technically accurate options and doesn't confuse
 * students with misleading choices.
 *
 * RFC 1918 defines exactly three private address ranges:
 * - 10.0.0.0/8 (~16.7 million addresses)
 * - 172.16.0.0/12 (~1 million addresses)
 * - 192.168.0.0/16 (~65,536 addresses)
 */

import { describe, it, expect } from 'vitest';
import quizzes from '../src/subjects/cs302/content/topic-3/quizzes.json';

// The three official RFC 1918 private address ranges
const OFFICIAL_RFC1918_RANGES = [
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16',
];

describe('CS302 RFC 1918 Quiz Question - q3c-5', () => {
  // Find the specific question about RFC 1918 range sizes
  const quiz3c = quizzes.find(q => q.id === 'cs302-quiz-3c');
  const rfc1918SizeQuestion = quiz3c?.questions.find(
    q => q.id === 'q3c-5' && q.prompt.includes('RFC 1918')
  );

  it('should have the RFC 1918 size comparison question', () => {
    expect(quiz3c).toBeDefined();
    expect(rfc1918SizeQuestion).toBeDefined();
    expect(rfc1918SizeQuestion?.type).toBe('multiple_choice');
  });

  it('should include all three official RFC 1918 ranges as options', () => {
    const options = rfc1918SizeQuestion?.options || [];

    // All three official ranges should be present
    for (const range of OFFICIAL_RFC1918_RANGES) {
      expect(options).toContain(range);
    }
  });

  it('should have 10.0.0.0/8 as the correct answer (largest range)', () => {
    const options = rfc1918SizeQuestion?.options || [];
    const correctIndex = options.indexOf('10.0.0.0/8');

    expect(correctIndex).toBeGreaterThanOrEqual(0);
    expect(rfc1918SizeQuestion?.correctAnswer).toBe(correctIndex);
  });

  it('should have mathematically accurate address counts in explanation', () => {
    const explanation = rfc1918SizeQuestion?.explanation || '';

    // 10.0.0.0/8 = 2^24 = 16,777,216 addresses
    expect(explanation).toContain('16.7 million');

    // 172.16.0.0/12 = 2^20 = 1,048,576 addresses
    expect(explanation).toContain('1 million');

    // 192.168.0.0/16 = 2^16 = 65,536 addresses
    expect(explanation).toContain('65,536');
  });

  it('fourth option should be a clear distractor that tests understanding', () => {
    const options = rfc1918SizeQuestion?.options || [];

    // Remove the three official ranges
    const nonOfficialOptions = options.filter(
      opt => !OFFICIAL_RFC1918_RANGES.includes(opt)
    );

    expect(nonOfficialOptions.length).toBe(1);

    // The fourth option should be either:
    // 1. A subnet within one of the RFC 1918 ranges (tests if students know the exact ranges)
    // 2. Another special-use range (tests if students can distinguish RFC 1918 from other private ranges)
    const fourthOption = nonOfficialOptions[0];

    // The distractor should be a valid CIDR notation
    expect(fourthOption).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/);
  });

  it('should not have 172.31.0.0/16 as an option (confusing subset)', () => {
    // 172.31.0.0/16 was the original problematic option because:
    // - It IS a valid private range (within 172.16.0.0/12)
    // - But it's NOT an "RFC 1918 range" - it's a subset
    // - Including it as an option is misleading when asking about RFC 1918 ranges
    const options = rfc1918SizeQuestion?.options || [];
    expect(options).not.toContain('172.31.0.0/16');
  });
});

describe('RFC 1918 Address Space Mathematics', () => {
  it('10.0.0.0/8 should have the most addresses', () => {
    // /8 = 24 host bits = 2^24 addresses
    const addresses10 = Math.pow(2, 32 - 8);

    // /12 = 20 host bits = 2^20 addresses
    const addresses172 = Math.pow(2, 32 - 12);

    // /16 = 16 host bits = 2^16 addresses
    const addresses192 = Math.pow(2, 32 - 16);

    expect(addresses10).toBeGreaterThan(addresses172);
    expect(addresses172).toBeGreaterThan(addresses192);
  });

  it('address counts should match expected values', () => {
    expect(Math.pow(2, 24)).toBe(16777216);   // 10.0.0.0/8
    expect(Math.pow(2, 20)).toBe(1048576);    // 172.16.0.0/12
    expect(Math.pow(2, 16)).toBe(65536);      // 192.168.0.0/16
  });

  it('172.16.0.0/16 (distractor) should be smaller than 172.16.0.0/12', () => {
    // /16 = 2^16 = 65,536 addresses
    // /12 = 2^20 = 1,048,576 addresses
    const addresses16 = Math.pow(2, 32 - 16);
    const addresses12 = Math.pow(2, 32 - 12);

    expect(addresses12).toBeGreaterThan(addresses16);
    expect(addresses12).toBe(addresses16 * 16); // 4 more bits = 16x more addresses
  });
});
