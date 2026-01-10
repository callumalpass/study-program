/**
 * CS104 Exam Content Validation Tests
 *
 * Tests to validate the correctness of CS104 exam questions,
 * particularly code_output questions that have specific expected outputs.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Exam, QuizQuestion } from '../src/core/types';
import { checkAnswer, normalizeCodeOutput } from '../src/utils/quiz-utils';

const EXAMS_PATH = join(__dirname, '../src/subjects/cs104/exams.json');

function loadExams(): Exam[] {
  const content = readFileSync(EXAMS_PATH, 'utf-8');
  return JSON.parse(content);
}

describe('CS104 Exam Content Validation', () => {
  describe('code_output question answers', () => {
    const exams = loadExams();

    it('should load CS104 exams', () => {
      expect(exams.length).toBeGreaterThan(0);
    });

    it('all code_output questions should have non-empty correctAnswer', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'code_output') {
            expect(
              String(question.correctAnswer).trim(),
              `${exam.id}/${question.id} has empty correctAnswer`
            ).not.toBe('');
          }
        }
      }
    });

    describe('final-q20: Counter.most_common behavior', () => {
      const exams = loadExams();
      const finalExam = exams.find(e => e.id === 'cs104-exam-final');
      const question = finalExam?.questions.find(q => q.id === 'final-q20');

      it('should exist', () => {
        expect(question).toBeDefined();
        expect(question?.type).toBe('code_output');
      });

      it('should have correct answer for Counter.most_common with tie-breaking', () => {
        // For "aabbbcc": a:2, b:3, c:2
        // most_common(2) returns [('b', 3), ('a', 2)] because:
        // - 'b' has highest count (3)
        // - 'a' and 'c' tie at count 2, but 'a' comes first in insertion order
        expect(question?.correctAnswer).toBe("[('b', 3), ('a', 2)]");
      });

      it('should match user answer with different spacing', () => {
        if (!question) return;

        // Test that various spacing formats are accepted
        expect(checkAnswer(question, "[('b', 3), ('a', 2)]")).toBe(true);
        expect(checkAnswer(question, "[('b',3),('a',2)]")).toBe(true);
        expect(checkAnswer(question, "[( 'b' , 3 ), ( 'a' , 2 )]")).toBe(true);
      });

      it('should not match wrong order (c instead of a)', () => {
        if (!question) return;

        // This was the old incorrect answer - should NOT match
        expect(checkAnswer(question, "[('b', 3), ('c', 2)]")).toBe(false);
      });
    });

    describe('Counter.most_common insertion order behavior', () => {
      it('understands Counter preserves insertion order for ties (Python 3.7+)', () => {
        // This documents the expected behavior:
        // Counter tracks elements in insertion order
        // When counts are tied, most_common() preserves that order

        // For string "aabbbcc":
        // - First 'a' encountered -> inserted first
        // - Then 'b' encountered -> inserted second
        // - Then 'c' encountered -> inserted third
        // Counts: a:2, b:3, c:2
        // most_common(2) returns: [('b', 3), ('a', 2)]
        // because 'b' has highest count, and 'a' was inserted before 'c'

        const expectedOutput = "[('b', 3), ('a', 2)]";
        const incorrectOutput = "[('b', 3), ('c', 2)]";

        // The normalized versions should be different
        expect(normalizeCodeOutput(expectedOutput)).not.toBe(normalizeCodeOutput(incorrectOutput));
      });
    });

    describe('final exam other code_output questions', () => {
      const exams = loadExams();
      const finalExam = exams.find(e => e.id === 'cs104-exam-final');

      it('final-q2: array rotation should give [4, 5, 1, 2, 3]', () => {
        const question = finalExam?.questions.find(q => q.id === 'final-q2');
        expect(question?.correctAnswer).toBe('[4, 5, 1, 2, 3]');

        if (question) {
          expect(checkAnswer(question, '[4, 5, 1, 2, 3]')).toBe(true);
          expect(checkAnswer(question, '[4,5,1,2,3]')).toBe(true);
        }
      });

      it('final-q8: deque operations should give correct output', () => {
        const question = finalExam?.questions.find(q => q.id === 'final-q8');
        expect(question?.correctAnswer).toBe('1\n[0, 2, 3, 4]');

        if (question) {
          expect(checkAnswer(question, '1\n[0, 2, 3, 4]')).toBe(true);
        }
      });

      it('final-q14: inorder BST traversal should give sorted order', () => {
        const question = finalExam?.questions.find(q => q.id === 'final-q14');
        expect(question?.correctAnswer).toBe('2 4 8 12 14');

        if (question) {
          expect(checkAnswer(question, '2 4 8 12 14')).toBe(true);
        }
      });

      it('final-q29: connected components count should be 3', () => {
        const question = finalExam?.questions.find(q => q.id === 'final-q29');
        expect(question?.correctAnswer).toBe('3');

        if (question) {
          expect(checkAnswer(question, '3')).toBe(true);
        }
      });

      it('final-q34: bubble sort single pass should give [1, 4, 2, 5, 8]', () => {
        const question = finalExam?.questions.find(q => q.id === 'final-q34');
        expect(question?.correctAnswer).toBe('[1, 4, 2, 5, 8]');

        if (question) {
          expect(checkAnswer(question, '[1, 4, 2, 5, 8]')).toBe(true);
          expect(checkAnswer(question, '[1,4,2,5,8]')).toBe(true);
        }
      });

      it('final-q38: heap operations should give correct output', () => {
        const question = finalExam?.questions.find(q => q.id === 'final-q38');
        expect(question?.correctAnswer).toBe('1\n3');

        if (question) {
          expect(checkAnswer(question, '1\n3')).toBe(true);
        }
      });
    });

    describe('midterm exam code_output questions', () => {
      const exams = loadExams();
      const midtermExam = exams.find(e => e.id === 'cs104-exam-midterm');

      it('mid-q3: linked list traversal should give 1->2->3->None', () => {
        const question = midtermExam?.questions.find(q => q.id === 'mid-q3');
        expect(question?.correctAnswer).toBe('1->2->3->None');

        if (question) {
          expect(checkAnswer(question, '1->2->3->None')).toBe(true);
          expect(checkAnswer(question, '1->2->3->none')).toBe(true);
        }
      });

      it('mid-q9: stack operations should give correct multiline output', () => {
        const question = midtermExam?.questions.find(q => q.id === 'mid-q9');
        expect(question?.correctAnswer).toBe('30\n40\n20');

        if (question) {
          expect(checkAnswer(question, '30\n40\n20')).toBe(true);
        }
      });

      it('mid-q12: postfix evaluation should give 7', () => {
        const question = midtermExam?.questions.find(q => q.id === 'mid-q12');
        expect(question?.correctAnswer).toBe('7');

        if (question) {
          expect(checkAnswer(question, '7')).toBe(true);
        }
      });

      it('mid-q16: preorder BST traversal should give 5 3 1 7 9', () => {
        const question = midtermExam?.questions.find(q => q.id === 'mid-q16');
        expect(question?.correctAnswer).toBe('5 3 1 7 9');

        if (question) {
          expect(checkAnswer(question, '5 3 1 7 9')).toBe(true);
        }
      });

      it('mid-q24: dict operations should give 10 0', () => {
        const question = midtermExam?.questions.find(q => q.id === 'mid-q24');
        expect(question?.correctAnswer).toBe('10 0');

        if (question) {
          expect(checkAnswer(question, '10 0')).toBe(true);
        }
      });
    });
  });

  describe('question format consistency', () => {
    const exams = loadExams();

    it('all questions should have required fields', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          expect(question.id, `Missing id in ${exam.id}`).toBeDefined();
          expect(question.type, `Missing type in ${exam.id}/${question.id}`).toBeDefined();
          expect(question.prompt, `Missing prompt in ${exam.id}/${question.id}`).toBeDefined();
          expect(question.explanation, `Missing explanation in ${exam.id}/${question.id}`).toBeDefined();
        }
      }
    });

    it('multiple_choice questions should have valid correctAnswer index', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            const index = question.correctAnswer as number;
            expect(
              index >= 0 && index < question.options.length,
              `${exam.id}/${question.id} has invalid correctAnswer index ${index} for ${question.options.length} options`
            ).toBe(true);
          }
        }
      }
    });

    it('code_output questions should have codeSnippet', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'code_output') {
            // Code output questions should have either inline code in prompt or codeSnippet
            const hasCode = Boolean(question.codeSnippet) || question.prompt.includes('```');
            expect(
              hasCode,
              `${exam.id}/${question.id} is code_output but has no code`
            ).toBe(true);
          }
        }
      }
    });

    it('written questions should have modelAnswer', () => {
      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'written') {
            expect(
              question.modelAnswer,
              `${exam.id}/${question.id} is written but has no modelAnswer`
            ).toBeDefined();
            expect(
              question.modelAnswer?.trim(),
              `${exam.id}/${question.id} has empty modelAnswer`
            ).not.toBe('');
          }
        }
      }
    });
  });
});
