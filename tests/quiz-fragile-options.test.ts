/**
 * Quiz Fragile Options Detection Tests
 *
 * These tests detect quiz options that reference other options by letter or position
 * (e.g., "All of the above", "Both A and B", "Options A and C").
 * Such options are fragile because if options are reordered, the references break.
 *
 * Note: Some uses of "All of the above" are acceptable when they genuinely represent
 * "all options listed" and the correct answer index is the last option. However,
 * these should be minimized as they can still be confusing.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion, Exam } from '../src/core/types';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

// Patterns that indicate fragile option references
// These detect references to other options by letter (A, B, C, D)
const FRAGILE_PATTERNS = [
  // Direct option references
  /\boption [A-D]\b/i,
  /\boptions? [A-D] and [A-D]\b/i,
  // "Both A and B" when it's clearly referencing options (not mathematical sets)
  // We avoid matching mathematical expressions like "both sets A and B"
  /^[Bb]oth [A-D] and [A-D]$/,  // Exact match only
  /\b[A-D] and [A-D] only\b/i,
  /^[A-D], [A-D],? and [A-D]$/i,  // Exact match for "A, B and C" style
];

// Pattern for "All/None of the above" - tracked separately
const ABOVE_BELOW_PATTERNS = [
  /\b[Aa]ll of the above\b/,
  /\b[Nn]one of the above\b/,
  /\b[Bb]oth of the above\b/,
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
 * Check if an option contains fragile letter references
 */
function hasFragileLetterReference(option: string): boolean {
  return FRAGILE_PATTERNS.some(pattern => pattern.test(option));
}

/**
 * Check if an option contains "all/none of the above" pattern
 */
function hasAboveBelowReference(option: string): boolean {
  return ABOVE_BELOW_PATTERNS.some(pattern => pattern.test(option));
}

/**
 * Check if "all of the above" is in a problematic position
 * It's less fragile when it's the LAST option and is the correct answer
 */
function isProblematicAboveReference(
  options: string[],
  optionIndex: number,
  correctAnswer: number | string
): boolean {
  const option = options[optionIndex];
  if (!hasAboveBelowReference(option)) return false;

  // "All of the above" not in the last position is problematic
  if (optionIndex !== options.length - 1) {
    return true;
  }

  // Even in last position, if it's not the correct answer, it's questionable
  // because it implies the other options are NOT all correct
  // This is a softer warning - not necessarily wrong but worth reviewing

  return false;
}

interface FragileQuestion {
  file: string;
  quizId: string;
  questionId: string;
  prompt: string;
  problematicOptions: string[];
  type: 'letter_reference' | 'above_below';
}

describe('Quiz Fragile Options Detection', () => {
  const allQuizFiles = findQuizFiles(SUBJECTS_DIR);
  const allExamFiles = findExamFiles(SUBJECTS_DIR);

  it('should find quiz files to analyze', () => {
    expect(allQuizFiles.length).toBeGreaterThan(0);
  });

  it('should find exam files to analyze', () => {
    expect(allExamFiles.length).toBeGreaterThan(0);
  });

  describe('Quiz questions should not have fragile letter references', () => {
    const fragileQuestions: FragileQuestion[] = [];

    // Collect all questions with fragile letter references
    for (const filePath of allQuizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            const problematicOptions = question.options.filter(hasFragileLetterReference);

            if (problematicOptions.length > 0) {
              fragileQuestions.push({
                file: filePath.replace(SUBJECTS_DIR, ''),
                quizId: quiz.id,
                questionId: question.id,
                prompt: question.prompt.substring(0, 80),
                problematicOptions,
                type: 'letter_reference',
              });
            }
          }
        }
      }
    }

    it('should have no quiz questions with fragile letter references (e.g., "Both A and B")', () => {
      if (fragileQuestions.length > 0) {
        console.log('\nQuiz questions with fragile letter references:');
        for (const fq of fragileQuestions.slice(0, 10)) {
          console.log(`  ${fq.file} - ${fq.quizId}/${fq.questionId}`);
          console.log(`    Prompt: ${fq.prompt}...`);
          console.log(`    Fragile options: ${fq.problematicOptions.join(', ')}`);
        }
        if (fragileQuestions.length > 10) {
          console.log(`  ... and ${fragileQuestions.length - 10} more`);
        }
      }

      expect(
        fragileQuestions,
        `Found ${fragileQuestions.length} quiz questions with fragile letter references`
      ).toHaveLength(0);
    });
  });

  describe('Exam questions should not have fragile letter references', () => {
    const fragileQuestions: FragileQuestion[] = [];

    // Collect all exam questions with fragile letter references
    for (const filePath of allExamFiles) {
      const exams = loadJsonFile<Exam[]>(filePath);

      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            const problematicOptions = question.options.filter(hasFragileLetterReference);

            if (problematicOptions.length > 0) {
              fragileQuestions.push({
                file: filePath.replace(SUBJECTS_DIR, ''),
                quizId: exam.id,
                questionId: question.id,
                prompt: question.prompt.substring(0, 80),
                problematicOptions,
                type: 'letter_reference',
              });
            }
          }
        }
      }
    }

    it('should have no exam questions with fragile letter references (e.g., "Both A and B")', () => {
      if (fragileQuestions.length > 0) {
        console.log('\nExam questions with fragile letter references:');
        for (const fq of fragileQuestions.slice(0, 10)) {
          console.log(`  ${fq.file} - ${fq.quizId}/${fq.questionId}`);
          console.log(`    Prompt: ${fq.prompt}...`);
          console.log(`    Fragile options: ${fq.problematicOptions.join(', ')}`);
        }
        if (fragileQuestions.length > 10) {
          console.log(`  ... and ${fragileQuestions.length - 10} more`);
        }
      }

      expect(
        fragileQuestions,
        `Found ${fragileQuestions.length} exam questions with fragile letter references`
      ).toHaveLength(0);
    });
  });

  describe('Track "All/None of the above" usage (informational)', () => {
    interface AboveUsage {
      file: string;
      assessmentId: string;
      questionId: string;
      option: string;
      isLastOption: boolean;
      isCorrectAnswer: boolean;
    }

    const aboveUsages: AboveUsage[] = [];

    // Collect from quizzes
    for (const filePath of allQuizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            question.options.forEach((option, index) => {
              if (hasAboveBelowReference(option)) {
                const correctIndex = typeof question.correctAnswer === 'number'
                  ? question.correctAnswer
                  : question.options!.indexOf(question.correctAnswer as string);

                aboveUsages.push({
                  file: filePath.replace(SUBJECTS_DIR, ''),
                  assessmentId: quiz.id,
                  questionId: question.id,
                  option,
                  isLastOption: index === question.options!.length - 1,
                  isCorrectAnswer: index === correctIndex,
                });
              }
            });
          }
        }
      }
    }

    // Collect from exams
    for (const filePath of allExamFiles) {
      const exams = loadJsonFile<Exam[]>(filePath);

      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            question.options.forEach((option, index) => {
              if (hasAboveBelowReference(option)) {
                const correctIndex = typeof question.correctAnswer === 'number'
                  ? question.correctAnswer
                  : question.options!.indexOf(question.correctAnswer as string);

                aboveUsages.push({
                  file: filePath.replace(SUBJECTS_DIR, ''),
                  assessmentId: exam.id,
                  questionId: question.id,
                  option,
                  isLastOption: index === question.options!.length - 1,
                  isCorrectAnswer: index === correctIndex,
                });
              }
            });
          }
        }
      }
    }

    it('reports "All/None of the above" usage statistics', () => {
      const total = aboveUsages.length;
      const inLastPosition = aboveUsages.filter(u => u.isLastOption).length;
      const notInLastPosition = total - inLastPosition;
      const isCorrect = aboveUsages.filter(u => u.isCorrectAnswer).length;

      console.log('\n"All/None of the above" usage statistics:');
      console.log(`  Total occurrences: ${total}`);
      console.log(`  In last position: ${inLastPosition}`);
      console.log(`  Not in last position (more fragile): ${notInLastPosition}`);
      console.log(`  Is correct answer: ${isCorrect}`);

      // Report problematic ones (not in last position)
      const problematic = aboveUsages.filter(u => !u.isLastOption);
      if (problematic.length > 0) {
        console.log('\n  Problematic (not in last position):');
        for (const p of problematic.slice(0, 5)) {
          console.log(`    ${p.file} - ${p.assessmentId}/${p.questionId}: "${p.option}"`);
        }
        if (problematic.length > 5) {
          console.log(`    ... and ${problematic.length - 5} more`);
        }
      }

      // This is informational - we track but don't fail
      expect(true).toBe(true);
    });

    it('should have no questions where "All of the above" is the correct answer', () => {
      // "All of the above" as the correct answer is particularly problematic because:
      // 1. It relies on positional references that can break if options are reordered
      // 2. It's confusing when "All of the above" appears anywhere other than the last position
      // 3. It encourages lazy question writing rather than testing specific knowledge
      const allOfAboveCorrect = aboveUsages.filter(u =>
        u.isCorrectAnswer && /\b[Aa]ll of the above\b/.test(u.option)
      );

      if (allOfAboveCorrect.length > 0) {
        console.log('\nQuestions where "All of the above" is the correct answer:');
        for (const q of allOfAboveCorrect) {
          console.log(`  ${q.file} - ${q.assessmentId}/${q.questionId}`);
        }
      }

      expect(
        allOfAboveCorrect,
        `Found ${allOfAboveCorrect.length} questions where "All of the above" is correct - rewrite these questions`
      ).toHaveLength(0);
    });

    it('should have no questions where "Both of the above" is the correct answer', () => {
      // "Both of the above" as the correct answer is similarly problematic:
      // 1. It relies on positional references that break if options are reordered
      // 2. It creates ambiguity about which two options are being referred to
      // 3. It can be rewritten as a clearer question with explicit options
      const bothOfAboveCorrect = aboveUsages.filter(u =>
        u.isCorrectAnswer && /\b[Bb]oth of the above\b/.test(u.option)
      );

      if (bothOfAboveCorrect.length > 0) {
        console.log('\nQuestions where "Both of the above" is the correct answer:');
        for (const q of bothOfAboveCorrect) {
          console.log(`  ${q.file} - ${q.assessmentId}/${q.questionId}`);
        }
      }

      expect(
        bothOfAboveCorrect,
        `Found ${bothOfAboveCorrect.length} questions where "Both of the above" is correct - rewrite these questions`
      ).toHaveLength(0);
    });
  });
});

describe('Fragile Pattern Detection Functions', () => {
  describe('hasFragileLetterReference', () => {
    it('detects "option A" references', () => {
      expect(hasFragileLetterReference('Same as option A')).toBe(true);
      expect(hasFragileLetterReference('Option B is correct')).toBe(true);
    });

    it('detects exact "Both A and B" references (option-like)', () => {
      expect(hasFragileLetterReference('Both A and B')).toBe(true);
    });

    it('does not flag mathematical "both A and B" in longer text', () => {
      // These are mathematical statements, not option references
      expect(hasFragileLetterReference('both sets A and B are non-empty')).toBe(false);
      expect(hasFragileLetterReference('elements in both A and B')).toBe(false);
      expect(hasFragileLetterReference('∀x ∈ A ∩ B: P(x) means P holds for elements in both A and B')).toBe(false);
    });

    it('detects "A and B only" references', () => {
      expect(hasFragileLetterReference('A and B only')).toBe(true);
    });

    it('detects exact "A, B, and C" style references', () => {
      expect(hasFragileLetterReference('A, B, and C')).toBe(true);
      expect(hasFragileLetterReference('A, B and C')).toBe(true);
    });

    it('detects "Options A and C" style references', () => {
      expect(hasFragileLetterReference('Options A and C')).toBe(true);
    });

    it('does not flag normal text', () => {
      expect(hasFragileLetterReference('The algorithm runs in O(n)')).toBe(false);
      expect(hasFragileLetterReference('Variable a equals 5')).toBe(false);
      expect(hasFragileLetterReference('Type A error')).toBe(false);
    });

    it('does not flag "All of the above" (handled separately)', () => {
      expect(hasFragileLetterReference('All of the above')).toBe(false);
    });
  });

  describe('hasAboveBelowReference', () => {
    it('detects "All of the above"', () => {
      expect(hasAboveBelowReference('All of the above')).toBe(true);
      expect(hasAboveBelowReference('all of the above')).toBe(true);
    });

    it('detects "None of the above"', () => {
      expect(hasAboveBelowReference('None of the above')).toBe(true);
      expect(hasAboveBelowReference('none of the above')).toBe(true);
    });

    it('detects "Both of the above"', () => {
      expect(hasAboveBelowReference('Both of the above')).toBe(true);
    });

    it('does not flag normal text', () => {
      expect(hasAboveBelowReference('The value above the threshold')).toBe(false);
      expect(hasAboveBelowReference('None available')).toBe(false);
    });
  });
});
