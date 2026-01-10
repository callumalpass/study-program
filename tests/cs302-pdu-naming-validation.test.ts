/**
 * CS302 OSI Model PDU Naming Validation Tests
 *
 * Tests to verify that PDU (Protocol Data Unit) naming questions are accurate
 * and unambiguous. This addresses the issue where "segment" (TCP) and "datagram" (UDP)
 * are both valid Transport layer PDUs.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion, Exam, ExamQuestion } from '../src/core/types';

const SUBJECTS_PATH = join(__dirname, '../src/subjects');

interface QuestionWithSource {
  question: QuizQuestion | ExamQuestion;
  source: string;
}

function loadAllCS302Content(): QuestionWithSource[] {
  const questions: QuestionWithSource[] = [];

  // Load quiz files
  const topicDirs = ['topic-1', 'topic-2', 'topic-3', 'topic-4', 'topic-5', 'topic-6', 'topic-7'];
  for (const topicDir of topicDirs) {
    const quizPath = join(SUBJECTS_PATH, 'cs302/content', topicDir, 'quizzes.json');
    if (existsSync(quizPath)) {
      const content = readFileSync(quizPath, 'utf-8');
      const quizzes = JSON.parse(content) as Quiz[];
      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          questions.push({
            question,
            source: `Quiz: ${quiz.title} (${quizPath})`,
          });
        }
      }
    }
  }

  // Load exam files
  const examPath = join(SUBJECTS_PATH, 'cs302/exams.json');
  if (existsSync(examPath)) {
    const content = readFileSync(examPath, 'utf-8');
    const exams = JSON.parse(content) as Exam[];
    for (const exam of exams) {
      for (const question of exam.questions) {
        questions.push({
          question,
          source: `Exam: ${exam.title} (${examPath})`,
        });
      }
    }
  }

  return questions;
}

describe('CS302 OSI PDU Naming Validation', () => {
  let allContent: QuestionWithSource[];

  beforeAll(() => {
    allContent = loadAllCS302Content();
  });

  it('should load CS302 content successfully', () => {
    expect(allContent.length).toBeGreaterThan(0);
  });

  describe('OSI Layer PDU Naming', () => {
    const CORRECT_PDU_NAMES: Record<string, string[]> = {
      'application': ['data', 'message'],
      'presentation': ['data'],
      'session': ['data'],
      'transport': ['segment', 'datagram'], // Both are valid! TCP=segment, UDP=datagram
      'network': ['packet'],
      'data link': ['frame'],
      'physical': ['bits', 'bit'],
    };

    it('should have PDU questions that specify protocol for Transport layer', () => {
      // Find questions about Transport layer PDUs
      const transportPduQuestions = allContent.filter(item => {
        const q = item.question;
        const promptLower = q.prompt.toLowerCase();
        const hasTransportRef = promptLower.includes('transport') || promptLower.includes('layer 4');
        const hasPduRef = promptLower.includes('pdu') || promptLower.includes('protocol data unit');
        return hasTransportRef && hasPduRef;
      });

      for (const item of transportPduQuestions) {
        const q = item.question;
        const promptLower = q.prompt.toLowerCase();

        // If asking about Transport layer PDU, should specify TCP or UDP
        // OR be a multiple choice that includes both segment and datagram as options
        if (q.type === 'fill_blank' || q.type === 'code_output') {
          // For fill-in questions, the prompt must specify TCP or UDP
          expect(
            promptLower.includes('tcp') || promptLower.includes('udp'),
            `Transport layer PDU question "${q.id}" should specify TCP or UDP to avoid ambiguity. Question: "${q.prompt}"`
          ).toBe(true);
        }
      }
    });

    it('PDU naming questions should have accurate explanations', () => {
      const pduQuestions = allContent.filter(item => {
        const q = item.question;
        return (
          q.prompt.toLowerCase().includes('pdu') ||
          q.explanation.toLowerCase().includes('pdu') ||
          q.explanation.toLowerCase().includes('protocol data unit')
        );
      });

      for (const item of pduQuestions) {
        const q = item.question;
        const explanation = q.explanation.toLowerCase();

        // If explanation mentions segment, should also mention TCP
        if (explanation.includes('segment')) {
          expect(
            explanation.includes('tcp') || explanation.includes('transport'),
            `Question "${q.id}" mentions segment but should clarify it's the TCP PDU`
          ).toBe(true);
        }

        // If explanation mentions datagram (at transport layer), should mention UDP
        if (explanation.includes('datagram') && explanation.includes('transport')) {
          expect(
            explanation.includes('udp'),
            `Question "${q.id}" mentions datagram at transport layer but should clarify it's the UDP PDU`
          ).toBe(true);
        }
      }
    });

    it('Network layer PDU should always be "packet"', () => {
      const networkPduQuestions = allContent.filter(item => {
        const q = item.question;
        const promptLower = q.prompt.toLowerCase();
        const hasNetworkRef = promptLower.includes('network') || promptLower.includes('layer 3');
        const hasPduRef = promptLower.includes('pdu') || promptLower.includes('protocol data unit');
        return hasNetworkRef && hasPduRef;
      });

      for (const item of networkPduQuestions) {
        const q = item.question;
        if (q.type === 'fill_blank' || q.type === 'code_output') {
          const answer = String(q.correctAnswer).toLowerCase();
          expect(answer).toBe('packet');
        }
        if (q.type === 'multiple_choice' && q.options) {
          const correctOption = q.options[q.correctAnswer as number].toLowerCase();
          expect(correctOption).toContain('packet');
        }
      }
    });

    it('Data Link layer PDU should always be "frame"', () => {
      const dataLinkPduQuestions = allContent.filter(item => {
        const q = item.question;
        const promptLower = q.prompt.toLowerCase();
        const hasDataLinkRef = promptLower.includes('data link') || promptLower.includes('layer 2');
        const hasPduRef = promptLower.includes('pdu') || promptLower.includes('protocol data unit');
        return hasDataLinkRef && hasPduRef;
      });

      for (const item of dataLinkPduQuestions) {
        const q = item.question;
        if (q.type === 'fill_blank' || q.type === 'code_output') {
          const answer = String(q.correctAnswer).toLowerCase();
          expect(answer).toBe('frame');
        }
        if (q.type === 'multiple_choice' && q.options) {
          const correctOption = q.options[q.correctAnswer as number].toLowerCase();
          expect(correctOption).toContain('frame');
        }
      }
    });
  });

  describe('Transport Layer Protocol Questions', () => {
    it('TCP segment questions should correctly identify segment as TCP PDU', () => {
      // Find questions that specifically ask about TCP's PDU name
      const tcpSegmentQuestions = allContent.filter(item => {
        const q = item.question;
        const promptLower = q.prompt.toLowerCase();
        return promptLower.includes('tcp') &&
               (promptLower.includes('pdu') || promptLower.includes('segment'));
      });

      for (const item of tcpSegmentQuestions) {
        const q = item.question;
        const explanation = q.explanation.toLowerCase();

        // If the question is specifically about TCP's PDU, segment should be mentioned
        if (q.prompt.toLowerCase().includes('pdu') && q.prompt.toLowerCase().includes('tcp')) {
          expect(
            explanation.includes('segment'),
            `TCP PDU question "${q.id}" should mention segment`
          ).toBe(true);
        }
      }
    });

    it('UDP datagram questions should correctly identify datagram as UDP PDU', () => {
      // Find questions that specifically ask about UDP's PDU name
      const udpDatagramQuestions = allContent.filter(item => {
        const q = item.question;
        const promptLower = q.prompt.toLowerCase();
        return promptLower.includes('udp') &&
               (promptLower.includes('pdu') || promptLower.includes('datagram'));
      });

      for (const item of udpDatagramQuestions) {
        const q = item.question;
        const explanation = q.explanation.toLowerCase();

        // If the question is specifically about UDP's PDU, datagram should be mentioned
        if (q.prompt.toLowerCase().includes('pdu') && q.prompt.toLowerCase().includes('udp')) {
          expect(
            explanation.includes('datagram'),
            `UDP PDU question "${q.id}" should mention datagram`
          ).toBe(true);
        }
      }
    });
  });

  describe('Exam-Specific PDU Question Validation', () => {
    it('mid-q5 should be multiple choice with TCP specified for segment answer', () => {
      // This test validates the fix made to mid-q5
      const examPath = join(SUBJECTS_PATH, 'cs302/exams.json');
      if (!existsSync(examPath)) {
        return; // Skip if exam doesn't exist
      }

      const content = readFileSync(examPath, 'utf-8');
      const exams = JSON.parse(content) as Exam[];

      const midterm = exams.find(e => e.id === 'cs302-exam-midterm');
      expect(midterm).toBeDefined();

      const q5 = midterm?.questions.find(q => q.id === 'mid-q5');
      expect(q5).toBeDefined();

      // Should now be multiple choice (not code_output)
      expect(q5?.type).toBe('multiple_choice');

      // Prompt should specify TCP
      expect(q5?.prompt.toLowerCase()).toContain('tcp');

      // Options should include both segment and datagram
      if (q5?.options) {
        const optionsLower = q5.options.map((o: string) => o.toLowerCase());
        expect(optionsLower).toContain('segment');
        expect(optionsLower).toContain('datagram');
      }

      // Correct answer should be segment (for TCP)
      if (q5?.type === 'multiple_choice' && q5.options) {
        const correctOption = q5.options[q5.correctAnswer as number].toLowerCase();
        expect(correctOption).toBe('segment');
      }

      // Explanation should clarify both TCP (segment) and UDP (datagram)
      expect(q5?.explanation.toLowerCase()).toContain('tcp');
      expect(q5?.explanation.toLowerCase()).toContain('segment');
      expect(q5?.explanation.toLowerCase()).toContain('udp');
      expect(q5?.explanation.toLowerCase()).toContain('datagram');
    });
  });

  describe('Ambiguity Prevention', () => {
    it('fill_blank questions should not have multiple valid answers', () => {
      const knownAmbiguousTerms = [
        { terms: ['segment', 'datagram'], layer: 'transport' },
        { terms: ['packet', 'datagram'], layer: 'network' }, // datagram sometimes used for network layer too
      ];

      const fillBlankQuestions = allContent.filter(item =>
        item.question.type === 'fill_blank' &&
        (item.question.prompt.toLowerCase().includes('pdu') ||
         item.question.prompt.toLowerCase().includes('layer'))
      );

      for (const item of fillBlankQuestions) {
        const q = item.question;
        const answer = String(q.correctAnswer).toLowerCase();

        for (const ambiguous of knownAmbiguousTerms) {
          if (ambiguous.terms.includes(answer)) {
            // If using an ambiguous term, question must specify context
            const promptLower = q.prompt.toLowerCase();
            expect(
              promptLower.includes('tcp') ||
              promptLower.includes('udp') ||
              promptLower.includes('ip') ||
              !promptLower.includes(ambiguous.layer),
              `Question "${q.id}" uses ambiguous term "${answer}" without sufficient context`
            ).toBe(true);
          }
        }
      }
    });

    it('code_output questions about terminology should be converted to multiple_choice', () => {
      // Code output questions are for actual code execution results
      // Terminology questions should be multiple choice or fill_blank
      const terminologyQuestions = allContent.filter(item => {
        const q = item.question;
        if (q.type !== 'code_output') return false;

        const promptLower = q.prompt.toLowerCase();
        // Check if this is asking about terminology rather than code output
        return (
          promptLower.includes('what is the name') ||
          promptLower.includes('what is called') ||
          promptLower.includes('pdu name') ||
          promptLower.includes('protocol name')
        ) && !q.codeSnippet?.includes('print');
      });

      // There should be no terminology questions using code_output type
      // (except if they actually show code with print statements)
      for (const item of terminologyQuestions) {
        const q = item.question;
        // If it's a pure terminology question, it shouldn't be code_output
        expect(
          q.type,
          `Question "${q.id}" asks about terminology but uses code_output type. Consider using multiple_choice or fill_blank.`
        ).not.toBe('code_output');
      }
    });
  });
});
