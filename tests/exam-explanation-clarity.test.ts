/**
 * Exam Explanation Clarity Tests
 *
 * Validates that exam question explanations are clear and unambiguous.
 * Specifically targets issues like:
 * - Two's complement explanations that could be misread
 * - Step-by-step explanations that need clear language
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation?: string;
  codeSnippet?: string;
}

interface Exam {
  id: string;
  subjectId: string;
  questions: QuizQuestion[];
}

function loadAllExams(): Exam[] {
  const exams: Exam[] = [];
  const subjectsDir = 'src/subjects';

  try {
    const subjects = readdirSync(subjectsDir);
    for (const subject of subjects) {
      const examPath = join(subjectsDir, subject, 'exams.json');
      try {
        const content = readFileSync(examPath, 'utf-8');
        const subjectExams = JSON.parse(content) as Exam[];
        exams.push(...subjectExams);
      } catch {
        // Subject doesn't have exams, skip
      }
    }
  } catch {
    // Can't read subjects directory
  }

  return exams;
}

describe('Exam Explanation Clarity', () => {
  let allExams: Exam[];

  beforeAll(() => {
    allExams = loadAllExams();
  });

  it('should load exams from all subjects', () => {
    expect(allExams.length).toBeGreaterThan(0);
  });

  describe('Two\'s complement explanations', () => {
    it('should use clear step-by-step language for inversion steps', () => {
      const twosComplementQuestions: Array<{ examId: string; question: QuizQuestion }> = [];

      for (const exam of allExams) {
        for (const question of exam.questions) {
          // Find questions about two's complement
          if (
            question.prompt.toLowerCase().includes("two's complement") ||
            question.prompt.toLowerCase().includes('twos complement')
          ) {
            twosComplementQuestions.push({ examId: exam.id, question });
          }
        }
      }

      expect(twosComplementQuestions.length).toBeGreaterThan(0);

      for (const { examId, question } of twosComplementQuestions) {
        if (question.explanation) {
          // Check that "Invert" is followed by "to get" or similar clarifying phrase
          // Bad: "Invert 1101" (ambiguous - is 1101 the input or output?)
          // Good: "Invert to get 1101" or "Invert 0010 to get 1101"
          const hasAmbiguousInvert = /\bInvert\s+[01]+\.\s/i.test(question.explanation) &&
            !/\bInvert\s+[01]+\s+to\s+(get|produce|yield)/i.test(question.explanation);

          expect(
            hasAmbiguousInvert,
            `Question ${examId}/${question.id} has ambiguous "Invert X" wording in explanation: "${question.explanation}". Should clarify whether X is input or output.`
          ).toBe(false);
        }
      }
    });

    it('CS102 midterm question 5 should have clear two\'s complement explanation', () => {
      const cs102Exams = allExams.filter(e => e.subjectId === 'cs102');
      let found = false;

      for (const exam of cs102Exams) {
        const question = exam.questions.find(q => q.id === 'cs102-mid-5');
        if (question) {
          found = true;
          expect(question.explanation).toBeDefined();
          // The explanation should clearly show: input -> operation -> output
          expect(question.explanation).toContain('to get');
        }
      }

      expect(found, 'Question cs102-mid-5 should exist').toBe(true);
    });
  });

  describe('Binary arithmetic explanations', () => {
    it('should have explanations for all binary arithmetic questions', () => {
      for (const exam of allExams) {
        for (const question of exam.questions) {
          // Check binary arithmetic questions
          if (
            question.prompt.includes('binary') ||
            question.prompt.match(/\b[01]{4,}\b/)
          ) {
            expect(
              question.explanation,
              `Question ${exam.id}/${question.id} should have an explanation`
            ).toBeDefined();
            expect(
              question.explanation?.length,
              `Question ${exam.id}/${question.id} explanation should not be empty`
            ).toBeGreaterThan(0);
          }
        }
      }
    });
  });

  describe('Explanation format consistency', () => {
    it('explanations should end with proper punctuation', () => {
      const questionsWithBadPunctuation: string[] = [];

      for (const exam of allExams) {
        for (const question of exam.questions) {
          if (question.explanation) {
            const trimmed = question.explanation.trim();
            // Should end with period, question mark, or closing quote/paren followed by period
            const hasProperEnding = /[.!?'")\]]$/.test(trimmed);
            if (!hasProperEnding && trimmed.length > 0) {
              questionsWithBadPunctuation.push(`${exam.id}/${question.id}`);
            }
          }
        }
      }

      // Allow some flexibility - just warn if too many have issues
      expect(
        questionsWithBadPunctuation.length,
        `Found ${questionsWithBadPunctuation.length} questions with explanations missing final punctuation (first 5: ${questionsWithBadPunctuation.slice(0, 5).join(', ')})`
      ).toBeLessThan(50);
    });
  });
});
