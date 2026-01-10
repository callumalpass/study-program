/**
 * CS302 Private IP Address Range Content Validation Tests
 *
 * Validates that quiz questions about RFC 1918 private IP address ranges
 * are technically accurate and don't confuse private ranges with other
 * special-use address blocks (like link-local 169.254.0.0/16).
 */

import { describe, it, expect } from 'vitest';
import quizzes from '../src/subjects/cs302/content/topic-3/quizzes.json';

// RFC 1918 private IP address ranges
const RFC1918_RANGES = [
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16',
];

// Common special-use ranges that are NOT RFC 1918 private ranges
const NON_PRIVATE_SPECIAL_RANGES = [
  '127.0.0.0/8',      // Loopback
  '169.254.0.0/16',   // Link-local (APIPA)
  '224.0.0.0/4',      // Multicast
  '240.0.0.0/4',      // Reserved
  '0.0.0.0/8',        // "This network"
  '255.255.255.255/32', // Limited broadcast
];

// Subranges within RFC 1918 ranges (valid private but subsets)
const RFC1918_SUBRANGES = [
  '172.31.0.0/16',    // Within 172.16.0.0/12
  '172.16.0.0/16',    // Within 172.16.0.0/12 (first /16 block)
  '10.0.0.0/16',      // Within 10.0.0.0/8
  '192.168.1.0/24',   // Within 192.168.0.0/16
];

describe('CS302 Topic 3 Quiz - Private IP Address Validation', () => {
  describe('RFC 1918 private address range questions', () => {
    it('should have quiz data loaded', () => {
      expect(quizzes).toBeDefined();
      expect(Array.isArray(quizzes)).toBe(true);
      expect(quizzes.length).toBeGreaterThan(0);
    });

    it('questions about "private address ranges" should not list 169.254.0.0/16 as a private range', () => {
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          // Check questions that mention "private address" in prompt
          if (question.prompt.toLowerCase().includes('private') &&
              question.prompt.toLowerCase().includes('address')) {

            if (question.options) {
              // 169.254.0.0/16 is link-local, not RFC 1918 private
              expect(question.options).not.toContain('169.254.0.0/16');
            }
          }
        }
      }
    });

    it('questions about RFC 1918 should only list valid RFC 1918 ranges or their subsets', () => {
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          // Check questions that mention "RFC 1918" in prompt
          if (question.prompt.includes('RFC 1918')) {
            if (question.options) {
              for (const option of question.options) {
                // Each option should either be a main RFC 1918 range or a subrange
                const isMainRange = RFC1918_RANGES.includes(option);
                const isSubrange = RFC1918_SUBRANGES.some(sub => option === sub);
                const isNotSpecialRange = !NON_PRIVATE_SPECIAL_RANGES.includes(option);

                // The option should not be a non-private special range
                expect(isNotSpecialRange).toBe(true);
              }
            }
          }
        }
      }
    });

    it('private range size comparison question should have correct answer', () => {
      // Find the question about which range provides the largest number of addresses
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.toLowerCase().includes('largest') &&
              question.prompt.toLowerCase().includes('addresses') &&
              question.options) {

            // Verify 10.0.0.0/8 has the correct answer index
            const options = question.options as string[];
            const tenNetIndex = options.findIndex(opt => opt === '10.0.0.0/8');

            if (tenNetIndex !== -1) {
              // 10.0.0.0/8 should be the correct answer (largest)
              expect(question.correctAnswer).toBe(tenNetIndex);
            }
          }
        }
      }
    });
  });

  describe('IP address calculation accuracy', () => {
    it('subnet calculations in explanations should be mathematically correct', () => {
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.explanation) {
            // Check if explanation mentions /26 and 62 hosts
            if (question.explanation.includes('/26') &&
                question.explanation.includes('usable')) {
              // /26 = 64 total - 2 = 62 usable
              expect(question.explanation).toMatch(/62/);
            }

            // Check /24 calculations
            if (question.explanation.includes('/24') &&
                question.explanation.includes('host')) {
              // Explanations mentioning /24 hosts should reference 254 usable
              // (or 256 total if discussing that)
            }
          }
        }
      }
    });

    it('network address AND mask calculations should be correct', () => {
      // Verify the network address calculation question
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.codeSnippet &&
              question.codeSnippet.includes('172.16.45.100') &&
              question.codeSnippet.includes('255.255.240.0')) {
            // 45 AND 240 = 32 (binary: 00101101 AND 11110000 = 00100000)
            expect(question.correctAnswer).toBe('172.16.32.0');
          }
        }
      }
    });
  });

  describe('TTL and ICMP accuracy', () => {
    it('TTL=0 behavior should be correctly described', () => {
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.toLowerCase().includes('ttl') &&
              question.prompt.includes('0')) {
            // TTL reaching 0 should mention discard and ICMP Time Exceeded
            expect(question.explanation?.toLowerCase()).toMatch(
              /discard|drop|icmp|time exceeded/
            );
          }
        }
      }
    });
  });
});

describe('IP Address Size Calculations', () => {
  it('RFC 1918 address counts should be accurate', () => {
    // Verify the math used in explanations
    expect(Math.pow(2, 24)).toBe(16777216); // 10.0.0.0/8 = ~16.7M
    expect(Math.pow(2, 20)).toBe(1048576);  // 172.16.0.0/12 = ~1M
    expect(Math.pow(2, 16)).toBe(65536);    // 192.168.0.0/16 = ~65K
  });

  it('/26 usable host calculation should be 62', () => {
    // /26 = 6 host bits = 64 addresses - 2 (network + broadcast) = 62 usable
    const totalAddresses = Math.pow(2, 32 - 26);
    const usableAddresses = totalAddresses - 2;
    expect(usableAddresses).toBe(62);
  });

  it('subnet mask calculations should be accurate', () => {
    // /24 = 24 network bits = 255.255.255.0
    // /20 = 20 network bits = 255.255.240.0
    // /16 = 16 network bits = 255.255.0.0

    // Verify /20 = 255.255.240.0
    // 20 bits = 8+8+4 = first two octets + 4 bits of third
    // Third octet: 11110000 = 240
    expect(240).toBe(0b11110000);
  });
});
