/**
 * Fill-in-the-Blank Prompt Format Validation Tests
 *
 * These tests ensure that fill_blank questions do not contain redundant
 * "Answer: ____" patterns in their prompts. The blank indicator should be
 * rendered by the UI, not explicitly included in the prompt text.
 *
 * Good: "What is 2 + 2?"
 * Bad:  "What is 2 + 2? Answer: ____"
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

// Path to subjects directory
const SUBJECTS_DIR = join(__dirname, '../src/subjects');

/**
 * Recursively find all quiz JSON files in a directory
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

// Pattern that matches redundant "Answer: ____" or similar patterns
const REDUNDANT_ANSWER_PATTERNS = [
  /Answer:\s*____/i,           // "Answer: ____"
  /Answer:\s*_+/i,             // "Answer: ___" (any number of underscores)
  /Answer:\s*\.{3,}/i,         // "Answer: ..." (3+ dots)
  /:\s*____\s*$/,              // Ends with ": ____"
  /\?\s*____\s*$/,             // Ends with "? ____"
];

describe('Fill-in-the-Blank Prompt Format', () => {
  describe('quiz fill_blank questions should not have redundant answer placeholders', () => {
    const quizFiles = findQuizFiles(SUBJECTS_DIR);

    it('should find quiz files', () => {
      expect(quizFiles.length).toBeGreaterThan(0);
    });

    it('fill_blank prompts should not contain "Answer: ____" pattern', () => {
      const violations: string[] = [];

      for (const filePath of quizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            if (question.type === 'fill_blank') {
              for (const pattern of REDUNDANT_ANSWER_PATTERNS) {
                if (pattern.test(question.prompt)) {
                  violations.push(
                    `${filePath.replace(SUBJECTS_DIR, '')} - ${quiz.id}/${question.id}: ` +
                    `Prompt contains redundant answer placeholder: "${question.prompt.slice(-50)}..."`
                  );
                  break; // Only report once per question
                }
              }
            }
          }
        }
      }

      expect(
        violations,
        `Found ${violations.length} fill_blank questions with redundant "Answer: ____" patterns:\n${violations.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('exam fill_blank questions should not have redundant answer placeholders', () => {
    const examFiles = findExamFiles(SUBJECTS_DIR);

    it('should find exam files', () => {
      expect(examFiles.length).toBeGreaterThan(0);
    });

    it('fill_blank prompts in exams should not contain "Answer: ____" pattern', () => {
      const violations: string[] = [];

      for (const filePath of examFiles) {
        const exams = loadJsonFile<{ id: string; questions: QuizQuestion[] }[]>(filePath);

        for (const exam of exams) {
          for (const question of exam.questions) {
            if (question.type === 'fill_blank') {
              for (const pattern of REDUNDANT_ANSWER_PATTERNS) {
                if (pattern.test(question.prompt)) {
                  violations.push(
                    `${filePath.replace(SUBJECTS_DIR, '')} - ${exam.id}/${question.id}: ` +
                    `Prompt contains redundant answer placeholder: "${question.prompt.slice(-50)}..."`
                  );
                  break; // Only report once per question
                }
              }
            }
          }
        }
      }

      expect(
        violations,
        `Found ${violations.length} exam fill_blank questions with redundant "Answer: ____" patterns:\n${violations.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('pattern detection unit tests', () => {
    it('should detect "Answer: ____" pattern', () => {
      const badPrompt = 'What is 2 + 2? Answer: ____';
      expect(REDUNDANT_ANSWER_PATTERNS.some(p => p.test(badPrompt))).toBe(true);
    });

    it('should detect "Answer: ___" with varying underscores', () => {
      const badPrompt = 'What is 2 + 2? Answer: ___';
      expect(REDUNDANT_ANSWER_PATTERNS.some(p => p.test(badPrompt))).toBe(true);
    });

    it('should detect ending with ": ____"', () => {
      const badPrompt = 'The answer is: ____';
      expect(REDUNDANT_ANSWER_PATTERNS.some(p => p.test(badPrompt))).toBe(true);
    });

    it('should not flag legitimate blanks mid-sentence', () => {
      // Blanks that are part of the question structure are OK
      const goodPrompt = 'The formula for combinations C(n,k) is n! / (k! × ____!).';
      expect(REDUNDANT_ANSWER_PATTERNS.some(p => p.test(goodPrompt))).toBe(false);
    });

    it('should not flag clean prompts', () => {
      const goodPrompts = [
        'What is 2 + 2?',
        'What is P(5,3), the number of permutations of 5 items taken 3 at a time?',
        'If F(n) = F(n-1) + F(n-2) with F(0)=0 and F(1)=1, what is F(6)?',
        'The expected value of a fair die roll is ____.',
      ];

      for (const prompt of goodPrompts) {
        expect(
          REDUNDANT_ANSWER_PATTERNS.some(p => p.test(prompt)),
          `Prompt should not be flagged: "${prompt}"`
        ).toBe(false);
      }
    });
  });

  describe('fill_blank prompts should be well-formed', () => {
    const quizFiles = findQuizFiles(SUBJECTS_DIR);

    it('fill_blank prompts should end with a question mark or contain a blank indicator', () => {
      const issues: string[] = [];

      for (const filePath of quizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            if (question.type === 'fill_blank') {
              const prompt = question.prompt.trim();
              const hasQuestionMark = prompt.endsWith('?');
              const hasBlankIndicator = prompt.includes('____') || prompt.includes('...');
              const hasMathFormula = prompt.includes('=') || prompt.includes('mod');
              const endsWithPeriod = prompt.endsWith('.');

              // A fill_blank should either:
              // 1. End with a question mark (asking what the answer is)
              // 2. Contain a blank indicator in the middle (fill in the blank)
              // 3. End with a period (statement with implied blank)
              // 4. Be a mathematical equation or formula
              if (!hasQuestionMark && !hasBlankIndicator && !endsWithPeriod && !hasMathFormula) {
                issues.push(
                  `${quiz.id}/${question.id}: Prompt format unclear - ` +
                  `should end with ? or . or contain ____: "${prompt.slice(0, 60)}..."`
                );
              }
            }
          }
        }
      }

      // This is informational - we don't fail for style issues
      if (issues.length > 0) {
        console.log(`\nFill-blank format suggestions (${issues.length}):`);
        issues.slice(0, 10).forEach(issue => console.log(issue));
        if (issues.length > 10) {
          console.log(`... and ${issues.length - 10} more`);
        }
      }
    });
  });
});
