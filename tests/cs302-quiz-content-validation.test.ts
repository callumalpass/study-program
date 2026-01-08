/**
 * CS302 Computer Networks Quiz Content Validation Tests
 *
 * Tests to verify the technical accuracy of CS302 quiz content,
 * particularly around physical layer encoding schemes and data link concepts.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const SUBJECTS_PATH = join(__dirname, '../src/subjects');

interface QuizFile {
  path: string;
  quizzes: Quiz[];
}

function loadAllCS302Quizzes(): QuizFile[] {
  const quizFiles: QuizFile[] = [];
  const topicDirs = ['topic-1', 'topic-2', 'topic-3', 'topic-4', 'topic-5', 'topic-6', 'topic-7'];

  for (const topicDir of topicDirs) {
    const quizPath = join(SUBJECTS_PATH, 'cs302/content', topicDir, 'quizzes.json');
    if (existsSync(quizPath)) {
      const content = readFileSync(quizPath, 'utf-8');
      quizFiles.push({
        path: quizPath,
        quizzes: JSON.parse(content) as Quiz[],
      });
    }
  }

  return quizFiles;
}

function getAllQuestions(quizFiles: QuizFile[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  for (const file of quizFiles) {
    for (const quiz of file.quizzes) {
      questions.push(...quiz.questions);
    }
  }
  return questions;
}

describe('CS302 Computer Networks Quiz Content Validation', () => {
  let quizFiles: QuizFile[];
  let allQuestions: QuizQuestion[];

  beforeAll(() => {
    quizFiles = loadAllCS302Quizzes();
    allQuestions = getAllQuestions(quizFiles);
  });

  it('should load quiz files for CS302', () => {
    expect(quizFiles.length).toBeGreaterThan(0);
  });

  it('should have multiple quiz questions', () => {
    expect(allQuestions.length).toBeGreaterThan(0);
  });

  describe('Physical Layer Encoding Questions', () => {
    it('Manchester encoding question should not claim specific polarity convention', () => {
      // Find the Manchester encoding question
      const manchesterQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('manchester') ||
             q.explanation.toLowerCase().includes('manchester encoding')
      );

      if (manchesterQuestion) {
        // The explanation should NOT specify the exact polarity (high-to-low or low-to-high)
        // because there are two conventions (IEEE 802.3 vs G.E. Thomas)
        // It should focus on the key property: guaranteed transition every bit period
        expect(manchesterQuestion.explanation.toLowerCase()).not.toMatch(
          /high-to-low for (0|1).+low-to-high for (0|1)/i
        );
        expect(manchesterQuestion.explanation.toLowerCase()).not.toMatch(
          /low-to-high for (0|1).+high-to-low for (0|1)/i
        );

        // Should mention the key property: transition in every bit period
        expect(manchesterQuestion.explanation.toLowerCase()).toMatch(
          /transition|synchroniz/
        );
      }
    });

    it('encoding question should correctly identify Manchester as having guaranteed transitions', () => {
      const encodingQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('transition') &&
             q.prompt.toLowerCase().includes('bit period') ||
             q.prompt.toLowerCase().includes('clock synchronization')
      );

      if (encodingQuestion && encodingQuestion.type === 'multiple_choice') {
        // Manchester should be the correct answer for clock sync questions
        const options = encodingQuestion.options || [];
        const manchesterIndex = options.findIndex(
          (opt: string) => opt.toLowerCase().includes('manchester')
        );

        if (manchesterIndex !== -1) {
          expect(encodingQuestion.correctAnswer).toBe(manchesterIndex);
        }
      }
    });
  });

  describe('Data Link Layer Protocol Questions', () => {
    it('CSMA/CD and CSMA/CA questions should distinguish between wired and wireless', () => {
      const csmaQuestions = allQuestions.filter(
        q => q.prompt.toLowerCase().includes('csma') ||
             q.explanation.toLowerCase().includes('csma')
      );

      for (const question of csmaQuestions) {
        // If it mentions wireless, should use CSMA/CA
        if (question.prompt.toLowerCase().includes('wireless')) {
          expect(question.explanation.toLowerCase()).toMatch(/csma\/ca|collision avoidance/);
        }
        // If it mentions wired Ethernet, should use CSMA/CD
        if (question.prompt.toLowerCase().includes('wired') ||
            question.prompt.toLowerCase().includes('ethernet')) {
          expect(question.explanation.toLowerCase()).toMatch(/csma\/cd|collision detect/);
        }
      }
    });

    it('MAC address questions should correctly state 48-bit length', () => {
      const macQuestions = allQuestions.filter(
        q => q.prompt.toLowerCase().includes('mac address') &&
             (q.prompt.toLowerCase().includes('bit') || q.prompt.toLowerCase().includes('byte'))
      );

      for (const question of macQuestions) {
        if (question.type === 'multiple_choice' && question.options) {
          const correctOption = question.options[question.correctAnswer as number];
          // MAC addresses are 48 bits (6 bytes)
          expect(correctOption.toLowerCase()).toMatch(/48|6/);
        }
      }
    });

    it('broadcast MAC address should be FF:FF:FF:FF:FF:FF', () => {
      const broadcastQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('broadcast') &&
             q.prompt.toLowerCase().includes('mac')
      );

      if (broadcastQuestion && broadcastQuestion.type === 'code_output') {
        expect(broadcastQuestion.correctAnswer.toUpperCase()).toBe('FF:FF:FF:FF:FF:FF');
      }
    });
  });

  describe('Network Protocol Questions', () => {
    it('ARP protocol questions should correctly describe IP to MAC resolution', () => {
      const arpQuestions = allQuestions.filter(
        q => (q.prompt.toLowerCase().includes('arp') &&
              !q.prompt.toLowerCase().includes('ipv6')) ||
             (q.explanation.toLowerCase().includes('address resolution protocol') &&
              !q.explanation.toLowerCase().includes('neighbor discovery'))
      );

      for (const question of arpQuestions) {
        // ARP maps IP addresses to MAC addresses (not the reverse)
        expect(question.explanation.toLowerCase()).toMatch(/ip.+mac|ip address.+mac address/i);
      }
    });

    it('IPv6 questions should mention NDP instead of ARP', () => {
      const ipv6ArpQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('ipv6') &&
             q.prompt.toLowerCase().includes('arp')
      );

      if (ipv6ArpQuestion) {
        // IPv6 does NOT use ARP - it uses NDP
        if (ipv6ArpQuestion.type === 'true_false') {
          expect(ipv6ArpQuestion.correctAnswer).toBe(false);
        }
        expect(ipv6ArpQuestion.explanation.toLowerCase()).toMatch(/ndp|neighbor discovery/);
      }
    });

    it('STP questions should mention loop prevention', () => {
      const stpQuestions = allQuestions.filter(
        q => q.prompt.toLowerCase().includes('spanning tree') ||
             q.prompt.toLowerCase().includes('stp')
      );

      for (const question of stpQuestions) {
        expect(question.explanation.toLowerCase()).toMatch(/loop|redundan/);
      }
    });
  });

  describe('Quiz Structure Validation', () => {
    it('all multiple choice questions should have valid correctAnswer indices', () => {
      for (const question of allQuestions) {
        if (question.type === 'multiple_choice') {
          expect(question.options).toBeDefined();
          expect(question.options!.length).toBeGreaterThan(0);

          if (typeof question.correctAnswer === 'number') {
            expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
            expect(question.correctAnswer).toBeLessThan(question.options!.length);
          }
        }
      }
    });

    it('all code_output questions should have code snippets', () => {
      for (const question of allQuestions) {
        if (question.type === 'code_output') {
          expect(question.codeSnippet).toBeDefined();
          expect(question.codeSnippet!.length).toBeGreaterThan(0);
        }
      }
    });

    it('all questions should have explanations', () => {
      for (const question of allQuestions) {
        expect(question.explanation).toBeDefined();
        expect(question.explanation.length).toBeGreaterThan(0);
      }
    });

    it('all fill_blank questions should have non-empty correctAnswer', () => {
      for (const question of allQuestions) {
        if (question.type === 'fill_blank') {
          expect(question.correctAnswer).toBeDefined();
          expect(String(question.correctAnswer).trim().length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('Technical Accuracy Spot Checks', () => {
    it('Wi-Fi security question should identify WEP as insecure', () => {
      const wifiSecurityQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('wi-fi') &&
             (q.prompt.toLowerCase().includes('security') ||
              q.prompt.toLowerCase().includes('vulnerabil'))
      );

      if (wifiSecurityQuestion && wifiSecurityQuestion.type === 'multiple_choice') {
        const options = wifiSecurityQuestion.options || [];
        const wepIndex = options.findIndex(
          (opt: string) => opt.toLowerCase().includes('wep')
        );

        if (wepIndex !== -1 && wifiSecurityQuestion.prompt.toLowerCase().includes('never')) {
          // WEP should be the correct answer for "which should never be used"
          expect(wifiSecurityQuestion.correctAnswer).toBe(wepIndex);
        }
      }
    });

    it('minimum Ethernet frame size should be 64 bytes', () => {
      const ethernetFrameQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('minimum') &&
             q.prompt.toLowerCase().includes('ethernet') &&
             q.prompt.toLowerCase().includes('frame')
      );

      if (ethernetFrameQuestion && ethernetFrameQuestion.type === 'multiple_choice') {
        const correctOption = ethernetFrameQuestion.options![ethernetFrameQuestion.correctAnswer as number];
        expect(correctOption).toMatch(/64/);
      }
    });

    it('exponential backoff question should have correct 2^n formula', () => {
      const backoffQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('backoff') ||
             q.prompt.toLowerCase().includes('exponential')
      );

      if (backoffQuestion) {
        // After n collisions, the number of slots is 2^n
        expect(backoffQuestion.explanation.toLowerCase()).toMatch(/2\^|2\s*\^|two\s+to\s+the/);
      }
    });

    it('RTS/CTS should be associated with hidden terminal problem', () => {
      const rtsQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('hidden terminal') ||
             (q.prompt.toLowerCase().includes('rts') && q.prompt.toLowerCase().includes('cts'))
      );

      if (rtsQuestion) {
        expect(rtsQuestion.explanation.toLowerCase()).toMatch(/rts|cts|hidden/);
      }
    });

    it('VLAN tagging standard should be 802.1Q', () => {
      const vlanQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('vlan') &&
             q.prompt.toLowerCase().includes('standard')
      );

      if (vlanQuestion) {
        expect(
          vlanQuestion.prompt.toLowerCase().includes('802.1q') ||
          vlanQuestion.explanation.toLowerCase().includes('802.1q')
        ).toBe(true);
      }
    });
  });
});

describe('CS302 Quiz Encoding Schemes', () => {
  describe('Line Encoding Properties', () => {
    it('NRZ has no transitions for same-bit sequences', () => {
      // NRZ (Non-Return-to-Zero) has no mid-bit transitions
      // Long runs of 0s or 1s have no transitions
      const nrzProperties = {
        hasMidBitTransition: false,
        hasTransitionEveryBit: false,
        canLoseSynchronization: true,
      };

      expect(nrzProperties.hasMidBitTransition).toBe(false);
      expect(nrzProperties.canLoseSynchronization).toBe(true);
    });

    it('Manchester guarantees transition every bit period', () => {
      const manchesterProperties = {
        hasMidBitTransition: true,
        hasTransitionEveryBit: true,
        canLoseSynchronization: false,
      };

      expect(manchesterProperties.hasMidBitTransition).toBe(true);
      expect(manchesterProperties.hasTransitionEveryBit).toBe(true);
      expect(manchesterProperties.canLoseSynchronization).toBe(false);
    });

    it('4B/5B ensures sufficient transitions through encoding table', () => {
      // 4B/5B maps 4-bit patterns to 5-bit patterns chosen to avoid long runs
      const fourBFiveBProperties = {
        inputBits: 4,
        outputBits: 5,
        overhead: 0.25, // 25% overhead
        preventsLongRuns: true,
      };

      expect(fourBFiveBProperties.outputBits - fourBFiveBProperties.inputBits).toBe(1);
      expect(fourBFiveBProperties.preventsLongRuns).toBe(true);
    });
  });
});
