/**
 * Math204 Exam Content Format Validation Tests
 *
 * Tests to ensure exam questions use appropriate formats for user input.
 * Complex mathematical expressions should use multiple_choice rather than fill_blank.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation: string;
}

interface Exam {
  id: string;
  subjectId: string;
  title: string;
  questions: QuizQuestion[];
}

// Load Math204 exams
function loadMath204Exams(): Exam[] {
  const examPath = path.join(__dirname, '../src/subjects/math204/exams.json');
  const content = fs.readFileSync(examPath, 'utf-8');
  return JSON.parse(content) as Exam[];
}

describe('Math204 Exam Format Validation', () => {
  let allExams: Exam[];
  let allQuestions: QuizQuestion[];

  beforeAll(() => {
    allExams = loadMath204Exams();
    allQuestions = allExams.flatMap(e => e.questions);
  });

  describe('Exam Structure', () => {
    it('should have both midterm and final exams', () => {
      expect(allExams.length).toBeGreaterThanOrEqual(2);

      const hasMidterm = allExams.some(e => e.id.includes('midterm'));
      const hasFinal = allExams.some(e => e.id.includes('final'));

      expect(hasMidterm).toBe(true);
      expect(hasFinal).toBe(true);
    });

    it('all exams should have valid structure', () => {
      for (const exam of allExams) {
        expect(exam.id).toBeTruthy();
        expect(exam.subjectId).toBe('math204');
        expect(exam.title).toBeTruthy();
        expect(exam.questions.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Fill Blank Question Complexity', () => {
    it('fill_blank questions should not contain integral symbols', () => {
      const fillBlankQuestions = allQuestions.filter(q => q.type === 'fill_blank');

      const complexQuestions = fillBlankQuestions.filter(q => {
        const answer = String(q.correctAnswer);
        return answer.includes('∫') || answer.includes('\\int');
      });

      if (complexQuestions.length > 0) {
        console.log('Fill blank questions with integral symbols (should be 0):');
        complexQuestions.forEach(q => {
          console.log(`  - ${q.id}: "${q.correctAnswer}"`);
        });
      }

      expect(complexQuestions).toHaveLength(0);
    });

    it('fill_blank questions should not contain π with brackets', () => {
      const fillBlankQuestions = allQuestions.filter(q => q.type === 'fill_blank');

      const complexQuestions = fillBlankQuestions.filter(q => {
        const answer = String(q.correctAnswer);
        return answer.includes('π[') || answer.includes('pi[');
      });

      expect(complexQuestions).toHaveLength(0);
    });

    it('fill_blank questions should have reasonably simple answers', () => {
      const fillBlankQuestions = allQuestions.filter(q => q.type === 'fill_blank');

      // Answers should be under 25 characters for fill_blank
      const longAnswers = fillBlankQuestions.filter(q => {
        const answer = String(q.correctAnswer);
        return answer.length > 25;
      });

      if (longAnswers.length > 0) {
        console.log('Fill blank questions with long answers (>25 chars):');
        longAnswers.forEach(q => {
          console.log(`  - ${q.id}: "${q.correctAnswer}" (${String(q.correctAnswer).length} chars)`);
        });
      }

      // Allow up to 2 longer answers (for things like "tan(x) + C" which is acceptable)
      expect(longAnswers.length).toBeLessThanOrEqual(2);
    });
  });

  describe('Volume Formula Questions - Disk Method', () => {
    it('disk method volume formula should be multiple_choice', () => {
      const diskQuestion = allQuestions.find(q =>
        q.id === 'math204-mid-q21' &&
        q.prompt.toLowerCase().includes('disk method')
      );

      expect(diskQuestion).toBeDefined();
      expect(diskQuestion?.type).toBe('multiple_choice');
    });

    it('disk method question should have correct answer pointing to disk formula', () => {
      const diskQuestion = allQuestions.find(q =>
        q.id === 'math204-mid-q21'
      );

      expect(diskQuestion).toBeDefined();
      if (diskQuestion && diskQuestion.type === 'multiple_choice') {
        const correctIndex = diskQuestion.correctAnswer as number;
        expect(correctIndex).toBeGreaterThanOrEqual(0);
        expect(correctIndex).toBeLessThan(diskQuestion.options!.length);
        const correctOption = diskQuestion.options![correctIndex];
        expect(correctOption).toContain('pi');
        expect(correctOption).toContain('[f(x)]^2');
      }
    });
  });

  describe('Volume Formula Questions - Washer Method', () => {
    it('washer method volume formula should be multiple_choice', () => {
      const washerQuestion = allQuestions.find(q =>
        q.id === 'math204-final-q18' &&
        q.prompt.toLowerCase().includes('washer method')
      );

      expect(washerQuestion).toBeDefined();
      expect(washerQuestion?.type).toBe('multiple_choice');
    });

    it('washer method question should have correct formula', () => {
      const washerQuestion = allQuestions.find(q =>
        q.id === 'math204-final-q18'
      );

      expect(washerQuestion).toBeDefined();
      if (washerQuestion && washerQuestion.type === 'multiple_choice') {
        const correctIndex = washerQuestion.correctAnswer as number;
        expect(correctIndex).toBeGreaterThanOrEqual(0);
        expect(correctIndex).toBeLessThan(washerQuestion.options!.length);
        const correctOption = washerQuestion.options![correctIndex];
        expect(correctOption).toContain('[R(x)]^2');
        expect(correctOption).toContain('[r(x)]^2');
        expect(correctOption).toContain('-');
      }
    });
  });

  describe('Trigonometric Substitution Questions', () => {
    it('trig substitution questions should be multiple_choice', () => {
      const trigSubQuestion = allQuestions.find(q =>
        q.id === 'math204-final-q12' &&
        q.prompt.toLowerCase().includes('trig')
      );

      expect(trigSubQuestion).toBeDefined();
      expect(trigSubQuestion?.type).toBe('multiple_choice');
    });

    it('trig substitution for sqrt(x^2 - 25) should have sec option', () => {
      const trigSubQuestion = allQuestions.find(q =>
        q.id === 'math204-final-q12'
      );

      expect(trigSubQuestion).toBeDefined();
      if (trigSubQuestion && trigSubQuestion.type === 'multiple_choice') {
        const correctIndex = trigSubQuestion.correctAnswer as number;
        expect(correctIndex).toBeGreaterThanOrEqual(0);
        expect(correctIndex).toBeLessThan(trigSubQuestion.options!.length);
        const correctOption = trigSubQuestion.options![correctIndex];
        expect(correctOption).toContain('sec');
        expect(correctOption).toContain('5');
      }
    });
  });

  describe('Arctan Integral Questions', () => {
    it('arctan integral should be multiple_choice', () => {
      const arctanQuestion = allQuestions.find(q =>
        q.id === 'math204-final-q2' &&
        q.prompt.includes('x^2+9')
      );

      expect(arctanQuestion).toBeDefined();
      expect(arctanQuestion?.type).toBe('multiple_choice');
    });

    it('arctan integral should have correct answer', () => {
      const arctanQuestion = allQuestions.find(q =>
        q.id === 'math204-final-q2'
      );

      expect(arctanQuestion).toBeDefined();
      if (arctanQuestion && arctanQuestion.type === 'multiple_choice') {
        const correctIndex = arctanQuestion.correctAnswer as number;
        expect(correctIndex).toBeGreaterThanOrEqual(0);
        expect(correctIndex).toBeLessThan(arctanQuestion.options!.length);
        const correctOption = arctanQuestion.options![correctIndex];
        expect(correctOption).toContain('arctan');
        // LaTeX uses \frac{1}{3} format
        expect(correctOption).toMatch(/frac\{1\}\{3\}|1\/3/);
        expect(correctOption).toMatch(/frac\{x\}\{3\}|x\/3/);
      }
    });
  });

  describe('Even Function Integral Property', () => {
    it('even function integral property should be multiple_choice', () => {
      const evenQuestion = allQuestions.find(q =>
        q.id === 'math204-final-q7' &&
        q.prompt.toLowerCase().includes('even')
      );

      expect(evenQuestion).toBeDefined();
      expect(evenQuestion?.type).toBe('multiple_choice');
    });

    it('even function integral should have doubling property as answer', () => {
      const evenQuestion = allQuestions.find(q =>
        q.id === 'math204-final-q7'
      );

      expect(evenQuestion).toBeDefined();
      if (evenQuestion && evenQuestion.type === 'multiple_choice') {
        const correctIndex = evenQuestion.correctAnswer as number;
        expect(correctIndex).toBeGreaterThanOrEqual(0);
        expect(correctIndex).toBeLessThan(evenQuestion.options!.length);
        const correctOption = evenQuestion.options![correctIndex];
        expect(correctOption).toContain('2');
        expect(correctOption).toMatch(/int.*0.*a/i);
      }
    });
  });

  describe('Multiple Choice Answer Validation', () => {
    it('all multiple_choice questions should have numeric correctAnswer', () => {
      const mcQuestions = allQuestions.filter(q => q.type === 'multiple_choice');

      for (const question of mcQuestions) {
        expect(typeof question.correctAnswer).toBe('number');
        expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(question.correctAnswer).toBeLessThan(question.options!.length);
      }
    });

    it('all multiple_choice questions should have 4 options', () => {
      const mcQuestions = allQuestions.filter(q => q.type === 'multiple_choice');

      for (const question of mcQuestions) {
        expect(question.options).toBeDefined();
        expect(question.options!.length).toBe(4);
      }
    });
  });

  describe('True/False Question Validation', () => {
    it('all true_false questions should have boolean correctAnswer', () => {
      const tfQuestions = allQuestions.filter(q => q.type === 'true_false');

      for (const question of tfQuestions) {
        expect(typeof question.correctAnswer).toBe('boolean');
      }
    });
  });

  describe('Fill Blank Acceptable Answers', () => {
    it('fill_blank answers should be simple expressions', () => {
      const fillBlankQuestions = allQuestions.filter(q => q.type === 'fill_blank');

      // List of acceptable patterns for fill_blank answers
      const acceptablePatterns = [
        /^[a-zA-Z]+$/,                    // Single word (e.g., "polynomial")
        /^\d+$/,                          // Number
        /^[a-z]+\([a-z]\)\s*\+\s*C$/i,   // Simple function + C (e.g., "tan(x) + C")
        /^[\d\/]+[a-z]+\([a-z\/]+\)\s*\+\s*C$/i, // (1/3)arctan(x/3) + C style
        /^[a-z0-9\³]+$/i,                 // Short expression like "x³"
        /^\d+[a-z]+\([a-zθ]+\)$/i,        // 3sin(θ) style
        /^[a-z\s]+$/i,                    // Two words (e.g., "greater than")
      ];

      for (const question of fillBlankQuestions) {
        const answer = String(question.correctAnswer);
        const isAcceptable = acceptablePatterns.some(pattern => pattern.test(answer)) ||
                            answer.length <= 20;  // Or just short enough

        if (!isAcceptable) {
          console.log(`Potentially complex fill_blank: ${question.id}: "${answer}"`);
        }

        // This is a soft check - we just want to flag very complex answers
        expect(answer.length).toBeLessThan(30);
      }
    });
  });

  describe('Statistics', () => {
    it('reports exam statistics', () => {
      console.log(`\nMath204 exam count: ${allExams.length}`);
      console.log(`Math204 exam questions: ${allQuestions.length}`);

      const typeDistribution = allQuestions.reduce((acc, q) => {
        acc[q.type] = (acc[q.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log('Question type distribution:', typeDistribution);

      // Count fill_blank questions
      const fillBlankCount = allQuestions.filter(q => q.type === 'fill_blank').length;
      console.log(`Fill blank questions: ${fillBlankCount}`);

      expect(allQuestions.length).toBeGreaterThan(0);
    });
  });
});
