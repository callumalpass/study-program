/**
 * Network Content Technical Accuracy Tests
 *
 * Validates that network-related quiz content uses technically accurate
 * terminology and doesn't contain misleading or incorrect information
 * in questions, options, or explanations.
 */

import { describe, it, expect } from 'vitest';
import cs302Topic3Quizzes from '../src/subjects/cs302/content/topic-3/quizzes.json';

describe('Network Technical Accuracy', () => {
  describe('IP Version Accuracy', () => {
    it('IPv4 address length should be stated as 32 bits', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.toLowerCase().includes('ipv4') &&
              question.prompt.toLowerCase().includes('bits')) {
            // Correct answer should reference 32 bits
            if (question.options) {
              const correctIndex = question.correctAnswer as number;
              expect(question.options[correctIndex]).toContain('32');
            }
          }
        }
      }
    });

    it('IPv6 address length should be stated as 128 bits when comparing to IPv4 bits', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          // Only check if the question is specifically about IPv6 address length
          if (question.explanation &&
              question.explanation.toLowerCase().includes('ipv6') &&
              question.explanation.toLowerCase().includes('bit')) {
            // If IPv6 bits are mentioned, 128 should be referenced
            expect(question.explanation).toMatch(/128/);
          }
        }
      }
    });
  });

  describe('Subnet Mask Accuracy', () => {
    it('/24 should correspond to 255.255.255.0', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.includes('/24') &&
              question.prompt.toLowerCase().includes('subnet mask')) {
            if (question.options && typeof question.correctAnswer === 'number') {
              expect(question.options[question.correctAnswer]).toBe('255.255.255.0');
            }
          }
        }
      }
    });
  });

  describe('MAC Address Accuracy', () => {
    it('MAC address should be 48 bits', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.toLowerCase().includes('mac address') &&
              question.prompt.toLowerCase().includes('bits')) {
            if (question.options && typeof question.correctAnswer === 'number') {
              expect(question.options[question.correctAnswer]).toContain('48');
            }
          }
        }
      }
    });
  });

  describe('Protocol Accuracy', () => {
    it('ARP should resolve IP to MAC (not MAC to IP)', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.toLowerCase().includes('arp') &&
              question.prompt.toLowerCase().includes('resolve')) {
            if (question.options && typeof question.correctAnswer === 'number') {
              const correctOption = question.options[question.correctAnswer];
              // Should mention IP to MAC direction
              expect(correctOption.toLowerCase()).toMatch(/ip.*(to|→).*mac/i);
            }
          }
        }
      }
    });

    it('ICMP should not be described as using TCP or UDP', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.toLowerCase().includes('icmp') &&
              question.correctAnswer === false) {
            // If ICMP question has false answer, check explanation
            if (question.explanation) {
              expect(question.explanation.toLowerCase()).toMatch(
                /separate|over ip|not.*tcp|not.*udp/i
              );
            }
          }
        }
      }
    });
  });

  describe('OSI Model Layer Accuracy', () => {
    it('Transport layer should be Layer 4', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          if (question.explanation &&
              question.explanation.toLowerCase().includes('transport layer')) {
            expect(question.explanation).toMatch(/layer 4|l4/i);
          }
        }
      }
    });

    it('Network layer routers should operate at Layer 3', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.toLowerCase().includes('router') &&
              question.prompt.toLowerCase().includes('layer')) {
            if (question.options && typeof question.correctAnswer === 'number') {
              expect(question.options[question.correctAnswer]).toMatch(/layer 3|network/i);
            }
          }
        }
      }
    });
  });

  describe('Terminology Consistency', () => {
    it('PDU at Transport layer should be segment (TCP) or datagram (UDP)', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          if (question.prompt.toLowerCase().includes('pdu') &&
              question.prompt.toLowerCase().includes('transport')) {
            if (typeof question.correctAnswer === 'string') {
              expect(question.correctAnswer.toLowerCase()).toMatch(/segment|datagram/);
            }
          }
        }
      }
    });
  });

  describe('Numerical Accuracy', () => {
    it('Hamming distance calculations should be mathematically correct', () => {
      for (const quiz of cs302Topic3Quizzes) {
        for (const question of quiz.questions) {
          if (question.codeSnippet &&
              question.prompt.toLowerCase().includes('hamming distance')) {
            // Extract strings from code snippet and verify calculation
            const string1Match = question.codeSnippet.match(/string1\s*=\s*"(\d+)"/);
            const string2Match = question.codeSnippet.match(/string2\s*=\s*"(\d+)"/);

            if (string1Match && string2Match) {
              const str1 = string1Match[1];
              const str2 = string2Match[1];

              // Calculate actual Hamming distance
              let distance = 0;
              for (let i = 0; i < str1.length && i < str2.length; i++) {
                if (str1[i] !== str2[i]) distance++;
              }

              // Verify answer matches
              expect(question.correctAnswer).toBe(String(distance));
            }
          }
        }
      }
    });
  });
});

describe('Address Space Calculations', () => {
  // Mathematical verification of network calculations
  it('calculates /26 correctly: 64 total, 62 usable', () => {
    const hostBits = 32 - 26;
    const totalAddresses = Math.pow(2, hostBits);
    expect(totalAddresses).toBe(64);
    expect(totalAddresses - 2).toBe(62);
  });

  it('calculates 172.16.45.100 AND 255.255.240.0 correctly', () => {
    // Third octet: 45 AND 240
    expect(45 & 240).toBe(32);
  });

  it('verifies 10.0.0.0/8 is largest RFC 1918 range', () => {
    const class10 = Math.pow(2, 24); // /8 = 24 host bits
    const class172 = Math.pow(2, 20); // /12 = 20 host bits
    const class192 = Math.pow(2, 16); // /16 = 16 host bits

    expect(class10).toBeGreaterThan(class172);
    expect(class10).toBeGreaterThan(class192);
    expect(class172).toBeGreaterThan(class192);
  });
});
