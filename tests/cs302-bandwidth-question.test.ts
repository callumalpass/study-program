/**
 * CS302 Bandwidth Question Tests
 *
 * Tests to verify the bandwidth calculation question in CS302 exam
 * has proper formatting and answer clarity.
 */

import { describe, expect, it, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('CS302 Final Exam - Bandwidth Question', () => {
  const examPath = path.join(__dirname, '../src/subjects/cs302/exams.json');
  let exams: any[];

  beforeAll(() => {
    const content = fs.readFileSync(examPath, 'utf-8');
    exams = JSON.parse(content);
  });

  it('exam file should be valid JSON', () => {
    expect(exams).toBeDefined();
    expect(Array.isArray(exams)).toBe(true);
  });

  describe('final-q5 bandwidth question', () => {
    let question: any;

    beforeAll(() => {
      const finalExam = exams.find((e: any) => e.id === 'cs302-exam-final');
      expect(finalExam).toBeDefined();
      question = finalExam.questions.find((q: any) => q.id === 'final-q5');
    });

    it('question should exist', () => {
      expect(question).toBeDefined();
    });

    it('should be a code_output question type', () => {
      expect(question.type).toBe('code_output');
    });

    it('prompt should specify the unit (Mbps)', () => {
      expect(question.prompt).toContain('Mbps');
    });

    it('prompt should ask about bandwidth calculation', () => {
      expect(question.prompt).toMatch(/bandwidth/i);
      expect(question.prompt).toContain('100 MB');
      expect(question.prompt).toContain('10 seconds');
    });

    it('correct answer should be 80 (numeric value)', () => {
      expect(question.correctAnswer).toBe('80');
    });

    it('explanation should explain the calculation', () => {
      expect(question.explanation).toContain('100 MB');
      expect(question.explanation).toContain('800 Mbits');
      expect(question.explanation).toContain('80 Mbps');
    });

    it('code snippet should show the calculation steps', () => {
      expect(question.codeSnippet).toBeDefined();
      expect(question.codeSnippet).toContain('100 MB');
      expect(question.codeSnippet).toContain('800 Mbits');
    });
  });

  describe('bandwidth calculation verification', () => {
    it('100 MB to Mbits is 800', () => {
      // 100 megabytes * 8 bits/byte = 800 megabits
      const megabytes = 100;
      const megabits = megabytes * 8;
      expect(megabits).toBe(800);
    });

    it('800 Mbits / 10 seconds = 80 Mbps', () => {
      const megabits = 800;
      const seconds = 10;
      const mbps = megabits / seconds;
      expect(mbps).toBe(80);
    });
  });
});

describe('CS302 code_output questions unit clarity', () => {
  const examPath = path.join(__dirname, '../src/subjects/cs302/exams.json');
  let exams: any[];

  beforeAll(() => {
    const content = fs.readFileSync(examPath, 'utf-8');
    exams = JSON.parse(content);
  });

  it('code_output questions with units should specify expected format', () => {
    const codeOutputQuestions: any[] = [];

    exams.forEach((exam: any) => {
      exam.questions.forEach((q: any) => {
        if (q.type === 'code_output') {
          codeOutputQuestions.push({ examId: exam.id, ...q });
        }
      });
    });

    // Find questions that might have unit ambiguity
    const potentiallyAmbiguous = codeOutputQuestions.filter((q) => {
      const hasUnitInExplanation = /\b(Mbps|KB|MB|GB|ms|seconds?|bytes?|bits?)\b/i.test(
        q.explanation
      );
      const hasUnitInAnswer = /\b(Mbps|KB|MB|GB|ms|seconds?|bytes?|bits?)\b/i.test(
        q.correctAnswer
      );
      // Flag if explanation mentions units but answer doesn't have them
      return hasUnitInExplanation && !hasUnitInAnswer;
    });

    // Log for informational purposes
    if (potentiallyAmbiguous.length > 0) {
      console.log(
        `Found ${potentiallyAmbiguous.length} questions where units appear in explanation but not answer:`
      );
      potentiallyAmbiguous.forEach((q) => {
        console.log(`  - ${q.examId}/${q.id}: answer="${q.correctAnswer}"`);
      });
    }

    // The key question (final-q5) should now have unit specification in prompt
    const finalQ5 = codeOutputQuestions.find((q) => q.id === 'final-q5');
    if (finalQ5) {
      // Prompt should now mention the unit
      expect(finalQ5.prompt).toContain('Mbps');
    }
  });
});
