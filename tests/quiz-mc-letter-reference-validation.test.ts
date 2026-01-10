/**
 * Quiz Multiple Choice Letter Reference Validation Tests
 *
 * Tests that validate quiz multiple choice questions do not have:
 * - Self-referential options (e.g., "Both A and B" where B is the option itself)
 * - Fragile letter references that break if options are reordered
 */

import { describe, expect, it } from 'vitest';

// Import all quiz data
const quizModules = import.meta.glob('../src/subjects/**/quizzes.json', { eager: true });

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation?: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  title: string;
  questions: QuizQuestion[];
}

// Get all quizzes from all subjects
const allQuizzes: Quiz[] = Object.values(quizModules).flatMap((module: any) => {
  return Array.isArray(module.default) ? module.default : [];
});

describe('Quiz Multiple Choice Letter Reference Validation', () => {
  const mcQuestions = allQuizzes.flatMap(quiz =>
    quiz.questions
      .filter(q => q.type === 'multiple_choice' && q.options)
      .map(q => ({ quiz, question: q }))
  );

  it('should have multiple choice questions to validate', () => {
    expect(mcQuestions.length).toBeGreaterThan(0);
  });

  describe('correct answer index within bounds', () => {
    mcQuestions.forEach(({ quiz, question }) => {
      it(`${quiz.id}/${question.id}: correctAnswer should be valid index`, () => {
        const correctAnswer = question.correctAnswer;
        const options = question.options!;

        if (typeof correctAnswer === 'number') {
          expect(
            correctAnswer,
            `Index ${correctAnswer} is negative`
          ).toBeGreaterThanOrEqual(0);
          expect(
            correctAnswer,
            `Index ${correctAnswer} exceeds options length ${options.length}`
          ).toBeLessThan(options.length);
        }
      });
    });
  });

  describe('options should not reference specific other options by letter', () => {
    // Patterns for options that reference SPECIFIC other options by letter (problematic)
    // "All of the above" and "None of the above" are acceptable
    // "Both A and C" or "A and B" are problematic - fragile if reordered
    const problematicPatterns = [
      /^both\s+[a-d]\s+and\s+[a-d]$/i,   // "Both A and C"
      /^[a-d]\s+and\s+[a-d]$/i,           // "A and C"
      /^options?\s+[a-d]\s+and\s+[a-d]$/i, // "Options A and C"
    ];

    // Known existing issues (pre-existing, excluded from test failures)
    // These should be fixed in future cleanups
    const knownIssues = new Set<string>([
      'cs102-quiz-4-b/cs102-q4-b-4',
      'math102-q5b/math102-q5b-4',
      'math201-quiz-4a/math201-q4a-1',
      'math203-quiz-5a/math203-q5a-3',
      'math204-quiz-4c/math204-q4c-3',
      'math204-quiz-5c/math204-q5c-4',
      'math204-quiz-6a/math204-q6a-1',
      'math204-quiz-7c/math204-q7c-1',
      'math304-quiz-3-1/math304-q35',
      'math404-quiz-2b/q1',
    ]);

    mcQuestions.forEach(({ quiz, question }) => {
      const fullId = `${quiz.id}/${question.id}`;
      const isKnownIssue = knownIssues.has(fullId);

      it(`${fullId}: options should not reference specific other options by letter${isKnownIssue ? ' (known issue)' : ''}`, () => {
        const options = question.options!;
        let hasIssue = false;
        let issueMessage = '';

        options.forEach((option, idx) => {
          const matchesPattern = problematicPatterns.some(pattern => pattern.test(option.trim()));
          if (matchesPattern) {
            hasIssue = true;
            issueMessage = `Option ${idx} ("${option}") references specific other options by letter, ` +
              `which is fragile and can lead to incorrect answers if options are reordered`;
          }
        });

        if (hasIssue && !isKnownIssue) {
          throw new Error(issueMessage);
        }
        // Known issues pass but are documented
      });
    });
  });

  describe('self-referential options should not exist', () => {
    // Check for options like "Both A and B" at position B (index 1), which is self-referential
    // Known issues that existed before this PR (excluded from test failures)
    const knownSelfRefIssues = new Set<string>([
      'math201-quiz-4a/math201-q4a-1',
      'math203-quiz-5a/math203-q5a-3',
      'math404-quiz-2b/q1',
    ]);

    mcQuestions.forEach(({ quiz, question }) => {
      const fullId = `${quiz.id}/${question.id}`;
      const isKnownIssue = knownSelfRefIssues.has(fullId);

      it(`${fullId}: options should not be self-referential${isKnownIssue ? ' (known issue)' : ''}`, () => {
        const options = question.options!;

        options.forEach((option, idx) => {
          // Check if option mentions its own letter position
          const optionLower = option.toLowerCase();
          const currentLetter = String.fromCharCode(65 + idx); // A, B, C, D

          // Pattern like "Both A and B" at index 1 (letter B) is self-referential
          const bothPattern = /both\s+([a-d])\s+and\s+([a-d])/i;
          const match = optionLower.match(bothPattern);

          if (match) {
            const letter1 = match[1].toUpperCase();
            const letter2 = match[2].toUpperCase();

            if ((letter1 === currentLetter || letter2 === currentLetter) && !isKnownIssue) {
              throw new Error(
                `Option ${idx} ("${option}") at position ${currentLetter} is self-referential - ` +
                `it references itself as one of the letters in "Both ${letter1} and ${letter2}"`
              );
            }
          }
        });
      });
    });
  });
});

describe('MATH304 Cryptography Quiz Questions', () => {
  // Specific tests for the fixed questions

  const math304Quizzes = allQuizzes.filter(q => q.subjectId === 'math304');
  const topic7Quizzes = math304Quizzes.filter(q => q.id.includes('quiz-7'));

  it('should find MATH304 topic 7 quizzes', () => {
    expect(topic7Quizzes.length).toBeGreaterThan(0);
  });

  describe('math304-q94 Fermat\'s Little Theorem question', () => {
    const allQuestions = topic7Quizzes.flatMap(q => q.questions);
    const question = allQuestions.find(q => q.id === 'math304-q94');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should have valid options without self-referential text', () => {
      expect(question!.options).toBeDefined();
      const options = question!.options!;

      // Check no option contains "Both A and B" or similar
      options.forEach(opt => {
        expect(opt.toLowerCase()).not.toMatch(/both\s+[a-d]\s+and\s+[a-d]/i);
      });
    });

    it('should have correct answer pointing to the comprehensive option', () => {
      const options = question!.options!;
      const correctIdx = question!.correctAnswer as number;

      expect(correctIdx).toBeGreaterThanOrEqual(0);
      expect(correctIdx).toBeLessThan(options.length);

      // The correct answer should mention both forms
      const correctOption = options[correctIdx];
      expect(correctOption).toContain('a^(p-1)');
      expect(correctOption).toContain('a^p');
    });

    it('explanation should describe both equivalent forms', () => {
      expect(question!.explanation).toContain('equivalent');
    });
  });

  describe('math304-q100 RSA security question', () => {
    const allQuestions = topic7Quizzes.flatMap(q => q.questions);
    const question = allQuestions.find(q => q.id === 'math304-q100');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should have valid options without self-referential text', () => {
      expect(question!.options).toBeDefined();
      const options = question!.options!;

      // Check no option contains "Both A and B" or similar self-reference
      options.forEach(opt => {
        expect(opt.toLowerCase()).not.toMatch(/both\s+[a-d]\s+and\s+[a-d]/i);
      });
    });

    it('should have correct answer pointing to factoring-related option', () => {
      const options = question!.options!;
      const correctIdx = question!.correctAnswer as number;

      expect(correctIdx).toBeGreaterThanOrEqual(0);
      expect(correctIdx).toBeLessThan(options.length);

      // The correct answer should mention factoring and φ(n)
      const correctOption = options[correctIdx];
      expect(correctOption.toLowerCase()).toContain('factoring');
      expect(correctOption).toContain('φ(n)');
    });

    it('explanation should mention factoring and computing φ(n)', () => {
      expect(question!.explanation).toContain('factoring');
      expect(question!.explanation).toContain('φ(n)');
    });
  });
});

describe('Quiz Option Letter Reference Statistics', () => {
  it('reports quiz questions with "Both X and Y" patterns (informational)', () => {
    const problematicQuestions: string[] = [];

    allQuizzes.forEach(quiz => {
      quiz.questions.forEach(question => {
        if (question.type === 'multiple_choice' && question.options) {
          question.options.forEach((option, idx) => {
            if (/both\s+[a-d]\s+and\s+[a-d]/i.test(option)) {
              problematicQuestions.push(
                `${quiz.id}/${question.id}: Option ${idx} = "${option}"`
              );
            }
          });
        }
      });
    });

    // Log for informational purposes
    if (problematicQuestions.length > 0) {
      console.log(`\nQuiz questions with "Both X and Y" patterns: ${problematicQuestions.length}`);
      problematicQuestions.forEach(q => console.log(`  ${q}`));
    }

    // This test passes regardless - it's just for reporting
    expect(true).toBe(true);
  });
});
