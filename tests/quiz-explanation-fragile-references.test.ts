/**
 * Quiz Explanation Fragile Reference Tests
 *
 * Tests to detect fragile positional references in quiz/exam explanations.
 * Explanations should not reference options by position (e.g., "the third option")
 * because if options are reordered, the reference becomes incorrect.
 *
 * Instead, explanations should reference the actual content being discussed.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, Exam, QuizQuestion } from '../src/core/types';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

// Patterns that detect fragile positional references in explanations
const FRAGILE_EXPLANATION_PATTERNS = [
  // Ordinal position references
  /\b(the|option)\s+(first|second|third|fourth|fifth|1st|2nd|3rd|4th|5th)\s+(option|answer|choice)/i,
  // Letter references like "option A", "answer B"
  /\b(option|answer|choice)\s+[A-D]\b/i,
  // "Answer A is correct" style
  /\banswer\s+[A-D]\s+(is|was)/i,
];

/**
 * Recursively find all quiz JSON files
 */
function findQuizFiles(dir: string): string[] {
  const quizFiles: string[] = [];

  if (!existsSync(dir)) {
    return quizFiles;
  }

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      quizFiles.push(...findQuizFiles(fullPath));
    } else if (entry.name === 'quizzes.json') {
      quizFiles.push(fullPath);
    }
  }

  return quizFiles;
}

/**
 * Find all exam JSON files
 */
function findExamFiles(dir: string): string[] {
  const examFiles: string[] = [];

  if (!existsSync(dir)) {
    return examFiles;
  }

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      examFiles.push(...findExamFiles(fullPath));
    } else if (entry.name === 'exams.json') {
      examFiles.push(fullPath);
    }
  }

  return examFiles;
}

/**
 * Load and parse a JSON file
 */
function loadJsonFile<T>(filePath: string): T {
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

/**
 * Check if an explanation contains fragile positional references
 */
function hasFragileExplanationReference(explanation: string): {
  hasFragile: boolean;
  matches: string[];
} {
  const matches: string[] = [];

  for (const pattern of FRAGILE_EXPLANATION_PATTERNS) {
    const match = explanation.match(pattern);
    if (match) {
      matches.push(match[0]);
    }
  }

  return {
    hasFragile: matches.length > 0,
    matches,
  };
}

interface FragileExplanation {
  file: string;
  assessmentId: string;
  questionId: string;
  explanation: string;
  matches: string[];
}

describe('Quiz Explanation Fragile References', () => {
  const allQuizFiles = findQuizFiles(SUBJECTS_DIR);
  const allExamFiles = findExamFiles(SUBJECTS_DIR);

  it('should find quiz files to analyze', () => {
    expect(allQuizFiles.length).toBeGreaterThan(0);
  });

  it('should find exam files to analyze', () => {
    expect(allExamFiles.length).toBeGreaterThan(0);
  });

  describe('Quiz explanations should not have fragile positional references', () => {
    const fragileExplanations: FragileExplanation[] = [];

    // Collect all questions with fragile explanation references
    for (const filePath of allQuizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.explanation) {
            const result = hasFragileExplanationReference(question.explanation);
            if (result.hasFragile) {
              fragileExplanations.push({
                file: filePath.replace(SUBJECTS_DIR, ''),
                assessmentId: quiz.id,
                questionId: question.id,
                explanation: question.explanation.substring(0, 100),
                matches: result.matches,
              });
            }
          }
        }
      }
    }

    it('should have no quiz explanations with fragile positional references', () => {
      if (fragileExplanations.length > 0) {
        console.log('\nQuiz explanations with fragile positional references:');
        for (const fe of fragileExplanations.slice(0, 10)) {
          console.log(`  ${fe.file} - ${fe.assessmentId}/${fe.questionId}`);
          console.log(`    Matches: ${fe.matches.join(', ')}`);
          console.log(`    Explanation: ${fe.explanation}...`);
        }
        if (fragileExplanations.length > 10) {
          console.log(`  ... and ${fragileExplanations.length - 10} more`);
        }
      }

      expect(
        fragileExplanations,
        `Found ${fragileExplanations.length} quiz explanations with fragile positional references`
      ).toHaveLength(0);
    });
  });

  describe('Exam explanations should not have fragile positional references', () => {
    const fragileExplanations: FragileExplanation[] = [];

    // Collect all exam questions with fragile explanation references
    for (const filePath of allExamFiles) {
      const exams = loadJsonFile<Exam[]>(filePath);

      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.explanation) {
            const result = hasFragileExplanationReference(question.explanation);
            if (result.hasFragile) {
              fragileExplanations.push({
                file: filePath.replace(SUBJECTS_DIR, ''),
                assessmentId: exam.id,
                questionId: question.id,
                explanation: question.explanation.substring(0, 100),
                matches: result.matches,
              });
            }
          }
        }
      }
    }

    it('should have no exam explanations with fragile positional references', () => {
      if (fragileExplanations.length > 0) {
        console.log('\nExam explanations with fragile positional references:');
        for (const fe of fragileExplanations.slice(0, 10)) {
          console.log(`  ${fe.file} - ${fe.assessmentId}/${fe.questionId}`);
          console.log(`    Matches: ${fe.matches.join(', ')}`);
          console.log(`    Explanation: ${fe.explanation}...`);
        }
        if (fragileExplanations.length > 10) {
          console.log(`  ... and ${fragileExplanations.length - 10} more`);
        }
      }

      expect(
        fragileExplanations,
        `Found ${fragileExplanations.length} exam explanations with fragile positional references`
      ).toHaveLength(0);
    });
  });
});

describe('Fragile Explanation Pattern Detection', () => {
  describe('hasFragileExplanationReference', () => {
    it('detects ordinal position references', () => {
      expect(hasFragileExplanationReference('The third option is incorrect').hasFragile).toBe(true);
      expect(hasFragileExplanationReference('The first answer is correct').hasFragile).toBe(true);
      expect(hasFragileExplanationReference('Option second choice is wrong').hasFragile).toBe(true);
    });

    it('detects letter references', () => {
      expect(hasFragileExplanationReference('Option A is the correct answer').hasFragile).toBe(true);
      expect(hasFragileExplanationReference('Answer B was selected').hasFragile).toBe(true);
      expect(hasFragileExplanationReference('Choice C is incorrect').hasFragile).toBe(true);
    });

    it('does not flag normal mathematical expressions', () => {
      // Mathematical statements about variables A, B, etc. should be allowed
      expect(hasFragileExplanationReference('If A > B then the result is positive').hasFragile).toBe(false);
      expect(hasFragileExplanationReference('Sets A and B are disjoint').hasFragile).toBe(false);
      expect(hasFragileExplanationReference('The matrix A has rank 3').hasFragile).toBe(false);
    });

    it('does not flag normal explanations', () => {
      expect(hasFragileExplanationReference('This is because the formula requires squaring').hasFragile).toBe(false);
      expect(hasFragileExplanationReference('The algorithm runs in O(n) time').hasFragile).toBe(false);
      expect(hasFragileExplanationReference('The correct value is 42').hasFragile).toBe(false);
    });

    it('does not flag references to the actual option content', () => {
      // Explanations should reference the actual content, not the position
      expect(hasFragileExplanationReference('The equation x = 5 is correct because...').hasFragile).toBe(false);
      expect(hasFragileExplanationReference('O(n log n) is the correct time complexity').hasFragile).toBe(false);
    });
  });
});

describe('Specific Fixed Issues Regression Tests', () => {
  it('math401 midterm q10 explanation should not reference option position', () => {
    const examPath = join(SUBJECTS_DIR, 'math401/exams.json');
    const exams = loadJsonFile<Exam[]>(examPath);
    const midterm = exams.find(e => e.id === 'math401-midterm');
    expect(midterm).toBeDefined();

    const q10 = midterm!.questions.find(q => q.id === 'math401-mid-q10');
    expect(q10).toBeDefined();

    const result = hasFragileExplanationReference(q10!.explanation);
    expect(result.hasFragile).toBe(false);
    // Verify the explanation now references the actual content
    expect(q10!.explanation).toContain('∂u/∂x = -∂v/∂y');
  });

  it('cs203 quiz should not have "None of the above" in wrong position', () => {
    const quizPath = join(SUBJECTS_DIR, 'cs203/content/topic-1/quizzes.json');
    const quizzes = loadJsonFile<Quiz[]>(quizPath);
    const quiz3 = quizzes.find(q => q.id === 'cs203-topic-1-quiz-3');
    expect(quiz3).toBeDefined();

    const q1 = quiz3!.questions.find(q => q.id === 'cs203-t1-q3-1');
    expect(q1).toBeDefined();

    // Verify "None of the above" has been replaced
    expect(q1!.options).toBeDefined();
    const hasNoneOfAbove = q1!.options!.some(opt =>
      /none of the above/i.test(opt)
    );
    expect(hasNoneOfAbove).toBe(false);
  });

  it('cs401 quiz should not have "None of the above" in wrong position', () => {
    const quizPath = join(SUBJECTS_DIR, 'cs401/content/topic-1/quizzes.json');
    const quizzes = loadJsonFile<Quiz[]>(quizPath);
    const quiz3 = quizzes.find(q => q.id === 'cs401-quiz-1-3');
    expect(quiz3).toBeDefined();

    const q13 = quiz3!.questions.find(q => q.id === 'cs401-q13');
    expect(q13).toBeDefined();

    // Verify "None of the above" has been replaced
    expect(q13!.options).toBeDefined();
    const hasNoneOfAbove = q13!.options!.some(opt =>
      /none of the above/i.test(opt)
    );
    expect(hasNoneOfAbove).toBe(false);
  });

  it('math201 quiz should not have "Both of the above" in wrong position', () => {
    const quizPath = join(SUBJECTS_DIR, 'math201/content/topic-7/quizzes.json');
    const quizzes = loadJsonFile<Quiz[]>(quizPath);
    const quiz7a = quizzes.find(q => q.id === 'math201-quiz-7a');
    expect(quiz7a).toBeDefined();

    const q1 = quiz7a!.questions.find(q => q.id === 'math201-q7a-1');
    expect(q1).toBeDefined();

    // Verify "Both of the above" has been replaced
    expect(q1!.options).toBeDefined();
    const hasBothOfAbove = q1!.options!.some(opt =>
      /both of the above/i.test(opt)
    );
    expect(hasBothOfAbove).toBe(false);
  });
});
