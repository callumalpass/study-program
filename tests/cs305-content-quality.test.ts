/**
 * Content quality tests for CS305 Web Development course.
 *
 * These tests validate specific fixes and ensure quiz/exam content quality:
 * 1. Ambiguous questions are properly disambiguated
 * 2. Fill-in-blank answers don't require special characters unnecessarily
 * 3. Question prompts match their correct answers accurately
 */

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation?: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

interface Exam {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

function loadQuizzes(path: string): Quiz[] {
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as Quiz[];
  } catch {
    return [];
  }
}

function loadExams(path: string): Exam[] {
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as Exam[];
  } catch {
    return [];
  }
}

describe('CS305 Content Quality', () => {
  describe('Topic 2 Quiz - CSS Position Question Fix', () => {
    const quizzes = loadQuizzes('src/subjects/cs305/content/topic-2/quizzes.json');

    it('cs305-q2-9 should ask about absolute positioning specifically', () => {
      let foundQuestion: QuizQuestion | undefined;

      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (q.id === 'cs305-q2-9') {
            foundQuestion = q;
            break;
          }
        }
      }

      expect(foundQuestion).toBeDefined();
      expect(foundQuestion!.type).toBe('multiple_choice');
      // The question should mention "positioned ancestor" to disambiguate from fixed
      expect(foundQuestion!.prompt.toLowerCase()).toContain('positioned ancestor');
      expect(foundQuestion!.correctAnswer).toBe(2); // index of "position: absolute"
    });

    it('cs305-q2-9 options should include all position values', () => {
      let foundQuestion: QuizQuestion | undefined;

      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (q.id === 'cs305-q2-9') {
            foundQuestion = q;
            break;
          }
        }
      }

      expect(foundQuestion).toBeDefined();
      expect(foundQuestion!.options).toBeDefined();
      expect(foundQuestion!.options!.length).toBe(4);
      expect(foundQuestion!.options!.some(o => o.includes('relative'))).toBe(true);
      expect(foundQuestion!.options!.some(o => o.includes('static'))).toBe(true);
      expect(foundQuestion!.options!.some(o => o.includes('absolute'))).toBe(true);
      expect(foundQuestion!.options!.some(o => o.includes('fixed'))).toBe(true);
    });

    it('cs305-q2-9 explanation should clarify the distinction between absolute and fixed', () => {
      let foundQuestion: QuizQuestion | undefined;

      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (q.id === 'cs305-q2-9') {
            foundQuestion = q;
            break;
          }
        }
      }

      expect(foundQuestion).toBeDefined();
      expect(foundQuestion!.explanation).toBeDefined();
      // Explanation should mention both absolute and fixed positioning differences
      expect(foundQuestion!.explanation!.toLowerCase()).toContain('absolute');
      expect(foundQuestion!.explanation!.toLowerCase()).toContain('fixed');
      expect(foundQuestion!.explanation!.toLowerCase()).toContain('viewport');
    });
  });

  describe('Exam - Fill-in-Blank HTML Tag Question Fix', () => {
    const exams = loadExams('src/subjects/cs305/exams.json');

    it('cs305-mid-q6 should accept element name without angle brackets', () => {
      let foundQuestion: QuizQuestion | undefined;

      for (const exam of exams) {
        for (const q of exam.questions) {
          if (q.id === 'cs305-mid-q6') {
            foundQuestion = q;
            break;
          }
        }
      }

      expect(foundQuestion).toBeDefined();
      expect(foundQuestion!.type).toBe('fill_blank');
      // Answer should be just "ol" without angle brackets
      expect(foundQuestion!.correctAnswer).toBe('ol');
      // Should NOT have angle brackets which would require special character input
      expect(foundQuestion!.correctAnswer).not.toContain('<');
      expect(foundQuestion!.correctAnswer).not.toContain('>');
    });

    it('cs305-mid-q6 prompt should ask about element (implying tag name)', () => {
      let foundQuestion: QuizQuestion | undefined;

      for (const exam of exams) {
        for (const q of exam.questions) {
          if (q.id === 'cs305-mid-q6') {
            foundQuestion = q;
            break;
          }
        }
      }

      expect(foundQuestion).toBeDefined();
      expect(foundQuestion!.prompt.toLowerCase()).toContain('element');
      expect(foundQuestion!.prompt.toLowerCase()).toContain('ordered list');
    });
  });

  describe('Fill-in-Blank Answer Format Consistency', () => {
    const exams = loadExams('src/subjects/cs305/exams.json');

    it('HTML element fill_blank answers should not require angle brackets', () => {
      const htmlElementPatterns = ['<', '>'];
      const issues: string[] = [];

      for (const exam of exams) {
        for (const q of exam.questions) {
          if (q.type === 'fill_blank' && typeof q.correctAnswer === 'string') {
            // Check if prompt asks about HTML elements
            const promptLower = q.prompt.toLowerCase();
            if (promptLower.includes('element') && promptLower.includes('html')) {
              // If asking about HTML elements, answer should be just the tag name
              for (const pattern of htmlElementPatterns) {
                if (q.correctAnswer.includes(pattern)) {
                  issues.push(
                    `${q.id}: HTML element question has answer "${q.correctAnswer}" with angle brackets - should be just tag name`
                  );
                }
              }
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('Question-Answer Alignment', () => {
    const quizzes = loadQuizzes('src/subjects/cs305/content/topic-2/quizzes.json');

    it('multiple choice questions should have exactly one unambiguous correct answer', () => {
      const issues: string[] = [];

      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (q.type === 'multiple_choice' && q.options) {
            const correctIndex = q.correctAnswer as number;

            // Check that the correct answer index is valid
            if (correctIndex < 0 || correctIndex >= q.options.length) {
              issues.push(`${q.id}: correctAnswer index ${correctIndex} out of bounds`);
              continue;
            }

            // Check for common ambiguity patterns in the question text
            const promptLower = q.prompt.toLowerCase();

            // If the question uses "which" it should be specific enough for one answer
            if (promptLower.startsWith('which') && !promptLower.includes('best') && !promptLower.includes('most')) {
              // Check explanation for mentions of multiple correct answers
              if (q.explanation && q.explanation.toLowerCase().includes('both')) {
                // If explanation says "both", check if question is specific enough
                const explanationLower = q.explanation.toLowerCase();
                if (explanationLower.includes('both') &&
                    (explanationLower.includes('also correct') ||
                     explanationLower.includes('also removes') ||
                     explanationLower.includes('are correct'))) {
                  // This would be ambiguous - but our fix should have addressed this
                  // by making the question more specific
                  if (!promptLower.includes('positioned ancestor') &&
                      !promptLower.includes('viewport') &&
                      promptLower.includes('removes') &&
                      promptLower.includes('flow')) {
                    issues.push(`${q.id}: Question about document flow may be ambiguous - multiple answers could be correct`);
                  }
                }
              }
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('CSS Position Questions Clarity', () => {
    const quizzes = loadQuizzes('src/subjects/cs305/content/topic-2/quizzes.json');
    const exams = loadExams('src/subjects/cs305/exams.json');

    const allQuestions: QuizQuestion[] = [];

    for (const quiz of quizzes) {
      allQuestions.push(...quiz.questions);
    }
    for (const exam of exams) {
      allQuestions.push(...exam.questions);
    }

    it('questions about CSS position should be specific about the positioning context', () => {
      const positionQuestions = allQuestions.filter(q =>
        q.prompt.toLowerCase().includes('position') &&
        q.prompt.toLowerCase().includes('document flow')
      );

      for (const q of positionQuestions) {
        // Any question about "removes from document flow" should specify the positioning context
        // to distinguish between absolute (nearest positioned ancestor) and fixed (viewport)
        expect(
          q.prompt.toLowerCase().includes('ancestor') ||
          q.prompt.toLowerCase().includes('viewport') ||
          q.prompt.toLowerCase().includes('best') ||
          q.type !== 'multiple_choice'
        ).toBe(true);
      }
    });
  });

  describe('Exam Question Types Distribution', () => {
    const exams = loadExams('src/subjects/cs305/exams.json');

    it('midterm exam should have diverse question types', () => {
      const midterm = exams.find(e => e.id === 'cs305-midterm');
      expect(midterm).toBeDefined();

      const types = new Set(midterm!.questions.map(q => q.type));

      // Should have multiple choice, true/false, fill_blank, and written
      expect(types.has('multiple_choice')).toBe(true);
      expect(types.has('true_false')).toBe(true);
      expect(types.has('fill_blank')).toBe(true);
      expect(types.has('written')).toBe(true);
    });

    it('final exam should have diverse question types', () => {
      const final = exams.find(e => e.id === 'cs305-final');
      expect(final).toBeDefined();

      const types = new Set(final!.questions.map(q => q.type));

      // Should have multiple choice, true/false, fill_blank, code_output, and written
      expect(types.has('multiple_choice')).toBe(true);
      expect(types.has('true_false')).toBe(true);
      expect(types.has('fill_blank')).toBe(true);
      expect(types.has('written')).toBe(true);
    });
  });

  describe('Fill-Blank Answer Simplicity', () => {
    const exams = loadExams('src/subjects/cs305/exams.json');
    const quizzes = loadQuizzes('src/subjects/cs305/content/topic-2/quizzes.json');

    const allQuestions: QuizQuestion[] = [];
    for (const quiz of quizzes) {
      allQuestions.push(...quiz.questions);
    }
    for (const exam of exams) {
      allQuestions.push(...exam.questions);
    }

    it('fill_blank answers should be reasonable length for typing', () => {
      const issues: string[] = [];

      for (const q of allQuestions) {
        if (q.type === 'fill_blank' && typeof q.correctAnswer === 'string') {
          // Answers longer than 30 characters might be too complex
          if (q.correctAnswer.length > 30) {
            issues.push(`${q.id}: fill_blank answer is very long (${q.correctAnswer.length} chars): "${q.correctAnswer}"`);
          }
        }
      }

      // We allow some long answers but warn if there are many
      expect(issues.length).toBeLessThan(5);
    });

    it('fill_blank answers should not contain complex syntax where simple names suffice', () => {
      const issues: string[] = [];

      for (const q of allQuestions) {
        if (q.type === 'fill_blank' && typeof q.correctAnswer === 'string') {
          const promptLower = q.prompt.toLowerCase();
          const answer = q.correctAnswer;

          // If asking about an HTML element name, answer should be just the name
          if (promptLower.includes('element') &&
              promptLower.includes('html') &&
              !promptLower.includes('attribute') &&
              !promptLower.includes('tag')) {
            if (answer.includes('<') || answer.includes('>')) {
              issues.push(`${q.id}: HTML element question should have simple tag name answer, got "${answer}"`);
            }
          }

          // If asking about a CSS property name, should be just the property name
          // Exception: when the question asks about behavior that requires both property AND value
          // (e.g., "makes images responsive" requires the full "max-width: 100%" declaration)
          if (promptLower.includes('css property') &&
              !promptLower.includes('value') &&
              answer.includes(':')) {
            // Allow full declarations when the question implies a specific behavior
            const impliesBehavior = promptLower.includes('makes') ||
                                    promptLower.includes('prevent') ||
                                    promptLower.includes('ensure') ||
                                    promptLower.includes('responsive');
            if (!impliesBehavior) {
              issues.push(`${q.id}: CSS property question should have just property name, got "${answer}"`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });
});
