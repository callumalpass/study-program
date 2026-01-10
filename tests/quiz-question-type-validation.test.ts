/**
 * Tests for quiz question type validation
 *
 * Ensures that question types are used correctly:
 * - code_output questions should have actual executable code snippets
 * - multiple_choice questions should have options array
 * - true_false questions should have boolean correctAnswer
 * - fill_blank questions should have string correctAnswer
 */

import { describe, it, expect } from 'vitest';
import { glob } from 'glob';
import { readFileSync } from 'fs';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation?: string;
  codeSnippet?: string;
}

interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

/**
 * Load all quiz files from all subjects
 */
async function loadAllQuizzes(): Promise<{ file: string; quizzes: Quiz[] }[]> {
  const files = await glob('src/subjects/**/quizzes.json');
  return files.map(file => ({
    file,
    quizzes: JSON.parse(readFileSync(file, 'utf-8')) as Quiz[],
  }));
}

/**
 * Load quiz files for a specific subject
 */
async function loadSubjectQuizzes(subjectId: string): Promise<{ file: string; quizzes: Quiz[] }[]> {
  const files = await glob(`src/subjects/${subjectId}/**/quizzes.json`);
  return files.map(file => ({
    file,
    quizzes: JSON.parse(readFileSync(file, 'utf-8')) as Quiz[],
  }));
}

// Helper to check if a code snippet looks like actual executable code
function looksLikeExecutableCode(snippet: string | undefined): boolean {
  if (!snippet) return false;

  // Common patterns that indicate actual code
  const codePatterns = [
    /\bprint\s*\(/,           // Python print
    /\bconsole\.log\s*\(/,    // JavaScript console.log
    /\bprintf\s*\(/,          // C printf
    /\breturn\b/,             // return statement
    /\bdef\s+\w+\s*\(/,       // Python function def
    /\bfunction\s+\w+\s*\(/,  // JavaScript function
    /\bclass\s+\w+/,          // class definition
    /\bfor\s*\(/,             // for loop
    /\bwhile\s*\(/,           // while loop
    /\bif\s*\(/,              // if statement
    /^\s*\d+\s*[\+\-\*\/\%]\s*\d+/m, // arithmetic expression
    /\bimport\s+/,            // import statement
    /\bfrom\s+\w+\s+import/,  // from...import
    /\[\s*\d/,                // list/array literal starting with number
    /\{\s*['"]/,              // dict/object literal
    /\blen\s*\(/,             // Python len()
    /\brange\s*\(/,           // Python range()
    /\bstr\s*\(/,             // Python str()
    /\bint\s*\(/,             // Python int()
    /\bfloat\s*\(/,           // Python float()
    /\blist\s*\(/,            // Python list()
    /\bdict\s*\(/,            // Python dict()
    /\bset\s*\(/,             // Python set()
    /\btuple\s*\(/,           // Python tuple()
    /\bTrue\b|\bFalse\b/,     // Python booleans
    /\bNone\b/,               // Python None
    /\bMOV\s+\w+/i,           // Assembly MOV instruction
    /\bADD\s+\w+/i,           // Assembly ADD instruction
    /\bXOR\b/i,               // XOR operation
    /\bAND\b.*\bOR\b/i,       // Boolean expression
    /0x[0-9A-Fa-f]+/,         // Hex literal
    /0b[01]+/,                // Binary literal
    /bin\s*\(/,               // Python bin()
    /hex\s*\(/,               // Python hex()
    /IEEE\s*754/i,            // IEEE 754 float discussions
    /\d+\s*<<\s*\d+/,         // Bit shift
    /\d+\s*>>\s*\d+/,         // Bit shift
  ];

  return codePatterns.some(pattern => pattern.test(snippet));
}

// Helper to check if a snippet looks like a description/diagram rather than code
function looksLikeDescriptionNotCode(snippet: string | undefined): boolean {
  if (!snippet) return false;

  // Patterns that suggest descriptive text rather than code
  const descriptionPatterns = [
    /^Layer\s+\d+:/mi,        // "Layer 1: ..." format (network layer descriptions)
    /^Step\s+\d+:/mi,         // "Step 1: ..." format
    /^\d+\.\s+[A-Z]/m,        // "1. Sentence" numbered list
    /^-\s+[A-Z]/m,            // "- Sentence" bullet list
  ];

  // If it matches description patterns and doesn't look like code
  const matchesDescription = descriptionPatterns.some(p => p.test(snippet));
  const hasCodePatterns = looksLikeExecutableCode(snippet);

  return matchesDescription && !hasCodePatterns;
}

describe('Quiz Question Type Validation', () => {
  describe('code_output questions should have executable code snippets', () => {
    it('code_output questions should have codeSnippet field', async () => {
      const allQuizData = await loadAllQuizzes();
      const allQuizzes = allQuizData.flatMap(d => d.quizzes);

      const codeOutputQuestions = allQuizzes.flatMap(quiz =>
        quiz.questions
          .filter(q => q.type === 'code_output')
          .map(q => ({ ...q, quizId: quiz.id }))
      );

      const missingSnippet = codeOutputQuestions.filter(q => !q.codeSnippet);

      if (missingSnippet.length > 0) {
        console.log('code_output questions missing codeSnippet:');
        missingSnippet.forEach(q => console.log(`  - ${q.quizId}/${q.id}`));
      }

      expect(missingSnippet.length).toBe(0);
    });

    it('code_output codeSnippet should look like executable code, not descriptions', async () => {
      const allQuizData = await loadAllQuizzes();
      const allQuizzes = allQuizData.flatMap(d => d.quizzes);

      const codeOutputQuestions = allQuizzes.flatMap(quiz =>
        quiz.questions
          .filter(q => q.type === 'code_output')
          .map(q => ({ ...q, quizId: quiz.id }))
      );

      const suspiciousQuestions = codeOutputQuestions.filter(q =>
        looksLikeDescriptionNotCode(q.codeSnippet)
      );

      if (suspiciousQuestions.length > 0) {
        console.log('\ncode_output questions with description-like snippets (may need review):');
        suspiciousQuestions.forEach(q => {
          console.log(`  - ${q.quizId}/${q.id}: "${q.codeSnippet?.substring(0, 50)}..."`);
        });
      }

      // This should be 0 after our fix
      expect(suspiciousQuestions.length).toBe(0);
    });
  });

  describe('multiple_choice questions should have options', () => {
    it('multiple_choice questions should have options array', async () => {
      const allQuizData = await loadAllQuizzes();
      const allQuizzes = allQuizData.flatMap(d => d.quizzes);

      const mcQuestions = allQuizzes.flatMap(quiz =>
        quiz.questions
          .filter(q => q.type === 'multiple_choice')
          .map(q => ({ ...q, quizId: quiz.id }))
      );

      const missingOptions = mcQuestions.filter(q => !q.options || q.options.length === 0);

      if (missingOptions.length > 0) {
        console.log('multiple_choice questions missing options:');
        missingOptions.forEach(q => console.log(`  - ${q.quizId}/${q.id}`));
      }

      expect(missingOptions.length).toBe(0);
    });

    it('multiple_choice correctAnswer should be a valid index', async () => {
      const allQuizData = await loadAllQuizzes();
      const allQuizzes = allQuizData.flatMap(d => d.quizzes);

      const mcQuestions = allQuizzes.flatMap(quiz =>
        quiz.questions
          .filter(q => q.type === 'multiple_choice')
          .map(q => ({ ...q, quizId: quiz.id }))
      );

      const invalidIndex = mcQuestions.filter(q => {
        if (typeof q.correctAnswer !== 'number') return true;
        if (!q.options) return true;
        return q.correctAnswer < 0 || q.correctAnswer >= q.options.length;
      });

      if (invalidIndex.length > 0) {
        console.log('multiple_choice questions with invalid correctAnswer:');
        invalidIndex.forEach(q => {
          console.log(`  - ${q.quizId}/${q.id}: correctAnswer=${q.correctAnswer}, options.length=${q.options?.length}`);
        });
      }

      expect(invalidIndex.length).toBe(0);
    });
  });

  describe('true_false questions should have boolean correctAnswer', () => {
    it('true_false questions should have boolean correctAnswer', async () => {
      const allQuizData = await loadAllQuizzes();
      const allQuizzes = allQuizData.flatMap(d => d.quizzes);

      const tfQuestions = allQuizzes.flatMap(quiz =>
        quiz.questions
          .filter(q => q.type === 'true_false')
          .map(q => ({ ...q, quizId: quiz.id }))
      );

      const nonBoolean = tfQuestions.filter(q => typeof q.correctAnswer !== 'boolean');

      if (nonBoolean.length > 0) {
        console.log('true_false questions with non-boolean correctAnswer:');
        nonBoolean.forEach(q => console.log(`  - ${q.quizId}/${q.id}: ${typeof q.correctAnswer}`));
      }

      expect(nonBoolean.length).toBe(0);
    });
  });

  describe('fill_blank questions should have string correctAnswer', () => {
    it('fill_blank questions should have string or numeric correctAnswer', async () => {
      const allQuizData = await loadAllQuizzes();
      const allQuizzes = allQuizData.flatMap(d => d.quizzes);

      const fbQuestions = allQuizzes.flatMap(quiz =>
        quiz.questions
          .filter(q => q.type === 'fill_blank')
          .map(q => ({ ...q, quizId: quiz.id }))
      );

      // fill_blank can have string or numeric correctAnswer (numeric gets converted to string)
      const invalidAnswer = fbQuestions.filter(q =>
        q.correctAnswer === undefined ||
        q.correctAnswer === null ||
        (typeof q.correctAnswer !== 'string' && typeof q.correctAnswer !== 'number')
      );

      if (invalidAnswer.length > 0) {
        console.log('fill_blank questions with invalid correctAnswer:');
        invalidAnswer.forEach(q => console.log(`  - ${q.quizId}/${q.id}`));
      }

      expect(invalidAnswer.length).toBe(0);
    });
  });

  describe('CS302 quiz fix verification', () => {
    it('q1b-2 should now be multiple_choice type', async () => {
      const cs302Data = await loadSubjectQuizzes('cs302');
      const allQuizzes = cs302Data.flatMap(d => d.quizzes);

      const quiz1b = allQuizzes.find(q => q.id === 'cs302-quiz-1b');
      expect(quiz1b).toBeDefined();

      const question = quiz1b?.questions.find(q => q.id === 'q1b-2');
      expect(question).toBeDefined();
      expect(question?.type).toBe('multiple_choice');
      expect(question?.options).toBeDefined();
      expect(question?.options?.length).toBe(4);
      expect(question?.correctAnswer).toBe(0);
      expect(question?.options?.[0]).toBe('Application');
    });

    it('q1b-2 should not have a codeSnippet field', async () => {
      const cs302Data = await loadSubjectQuizzes('cs302');
      const allQuizzes = cs302Data.flatMap(d => d.quizzes);

      const quiz1b = allQuizzes.find(q => q.id === 'cs302-quiz-1b');
      const question = quiz1b?.questions.find(q => q.id === 'q1b-2');

      // After converting to multiple_choice, codeSnippet should not be present
      expect(question?.codeSnippet).toBeUndefined();
    });
  });
});
