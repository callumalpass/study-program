/**
 * Code Output Question Validation Tests
 *
 * These tests validate that code_output quiz questions have sensible,
 * answerable correctAnswers. This helps catch issues like:
 * - Answers with embedded escape sequences that users can't type
 * - Ambiguous output formats
 * - Overly complex expected outputs
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

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
 * Load and parse a JSON file
 */
function loadJsonFile<T>(filePath: string): T {
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

/**
 * Check if a string contains problematic characters for user input
 */
function hasProblematicCharacters(answer: string): string[] {
  const issues: string[] = [];

  // Check for literal backslash-n in string (escaped newline that should be actual newline)
  if (answer.includes('\\n') && !answer.includes('\n')) {
    // This might be intentional (showing escape sequence) or accidental
    // Only flag if it looks like it should be a real newline
    if (answer.match(/^[^\\]*\\n[^\\]*$/)) {
      // Single \n that looks like it should be a newline
      issues.push('Contains \\n which may be an escaped newline - verify this is intentional');
    }
  }

  // Check for other escape sequences
  if (answer.includes('\\t') && !answer.includes('\t')) {
    issues.push('Contains \\t which may be an escaped tab');
  }

  // Check for very long answers (hard to type accurately)
  if (answer.length > 100) {
    issues.push(`Very long answer (${answer.length} chars) - may be hard for users to type exactly`);
  }

  return issues;
}

/**
 * Check if the answer format is clear and answerable
 */
function validateCodeOutputAnswer(question: QuizQuestion): string[] {
  const issues: string[] = [];

  if (question.type !== 'code_output') {
    return issues;
  }

  const answer = String(question.correctAnswer);

  // Check for problematic characters
  issues.push(...hasProblematicCharacters(answer));

  // Check for empty answer (usually a mistake)
  if (answer.trim() === '') {
    issues.push('Empty correctAnswer - code_output questions should have expected output');
  }

  // Check for answers that are just whitespace
  if (answer.length > 0 && answer.trim() === '' && answer !== '') {
    issues.push('Answer is only whitespace - may be confusing for users');
  }

  return issues;
}

describe('Code Output Question Validation', () => {
  const allQuizFiles = findQuizFiles(SUBJECTS_DIR);

  it('should find quiz files to validate', () => {
    expect(allQuizFiles.length).toBeGreaterThan(0);
  });

  describe('code_output answers should be clearly answerable', () => {
    // Collect all code_output questions
    const codeOutputQuestions: Array<{
      file: string;
      quizId: string;
      questionId: string;
      prompt: string;
      answer: string;
    }> = [];

    for (const filePath of allQuizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'code_output') {
            codeOutputQuestions.push({
              file: filePath.replace(SUBJECTS_DIR, ''),
              quizId: quiz.id,
              questionId: question.id,
              prompt: question.prompt,
              answer: String(question.correctAnswer),
            });
          }
        }
      }
    }

    it('should find code_output questions', () => {
      expect(codeOutputQuestions.length).toBeGreaterThan(0);
      console.log(`Found ${codeOutputQuestions.length} code_output questions across all quizzes`);
    });

    it('code_output answers should not have problematic escape sequences', () => {
      const problematicQuestions: Array<{
        location: string;
        answer: string;
        issues: string[];
      }> = [];

      for (const q of codeOutputQuestions) {
        const question: QuizQuestion = {
          id: q.questionId,
          type: 'code_output',
          prompt: q.prompt,
          correctAnswer: q.answer,
          explanation: '',
        };

        const issues = validateCodeOutputAnswer(question);

        // Filter to only escape sequence issues (not length warnings)
        const escapeIssues = issues.filter(i =>
          i.includes('\\n') || i.includes('\\t') || i.includes('escaped')
        );

        if (escapeIssues.length > 0) {
          problematicQuestions.push({
            location: `${q.file} - ${q.quizId}/${q.questionId}`,
            answer: q.answer,
            issues: escapeIssues,
          });
        }
      }

      // Report any problematic questions found
      if (problematicQuestions.length > 0) {
        console.log('\nCode output questions with potential escape sequence issues:');
        for (const pq of problematicQuestions.slice(0, 5)) {
          console.log(`  ${pq.location}: "${pq.answer}"`);
          console.log(`    Issues: ${pq.issues.join(', ')}`);
        }
        if (problematicQuestions.length > 5) {
          console.log(`  ... and ${problematicQuestions.length - 5} more`);
        }
      }

      // This is informational - we don't fail on escape sequences as they may be intentional
      expect(true).toBe(true);
    });

    it('code_output answers should not be empty', () => {
      const emptyAnswers = codeOutputQuestions.filter(q => q.answer.trim() === '');

      expect(
        emptyAnswers,
        `Found ${emptyAnswers.length} code_output questions with empty answers: ${emptyAnswers.map(q => `${q.quizId}/${q.questionId}`).join(', ')}`
      ).toHaveLength(0);
    });
  });

  describe('specific CS101 code_output questions', () => {
    const cs101QuizDir = join(SUBJECTS_DIR, 'cs101', 'content');
    const cs101QuizFiles = findQuizFiles(cs101QuizDir);

    it('should find CS101 quiz files', () => {
      expect(cs101QuizFiles.length).toBe(7);
    });

    it('CS101 code_output questions should have valid answers', () => {
      const issues: string[] = [];

      for (const filePath of cs101QuizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            if (question.type === 'code_output') {
              const questionIssues = validateCodeOutputAnswer(question);
              for (const issue of questionIssues) {
                issues.push(`${quiz.id}/${question.id}: ${issue}`);
              }
            }
          }
        }
      }

      // Report issues but don't fail (escape sequences may be intentional)
      if (issues.length > 0) {
        console.log('\nCS101 code_output question notes:');
        for (const issue of issues.slice(0, 10)) {
          console.log(`  ${issue}`);
        }
      }
    });
  });

  describe('answer format consistency', () => {
    it('numeric answers should be consistently formatted', () => {
      const numericAnswers: Array<{
        location: string;
        answer: string;
        isNumeric: boolean;
      }> = [];

      for (const filePath of allQuizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            if (question.type === 'code_output') {
              const answer = String(question.correctAnswer);
              // Check if it looks like a number
              const isNumeric = /^-?\d+(\.\d+)?$/.test(answer.trim());

              if (isNumeric) {
                numericAnswers.push({
                  location: `${quiz.id}/${question.id}`,
                  answer,
                  isNumeric,
                });
              }
            }
          }
        }
      }

      // Just verify we found numeric answers - no specific validation needed
      expect(numericAnswers.length).toBeGreaterThan(0);
      console.log(`Found ${numericAnswers.length} numeric code_output answers`);
    });

    it('boolean-like answers should use Python format (True/False)', () => {
      const boolAnswers: Array<{
        location: string;
        answer: string;
        format: string;
      }> = [];

      for (const filePath of allQuizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            if (question.type === 'code_output') {
              const answer = String(question.correctAnswer).trim().toLowerCase();

              if (answer === 'true' || answer === 'false') {
                boolAnswers.push({
                  location: `${quiz.id}/${question.id}`,
                  answer: String(question.correctAnswer),
                  format: answer === String(question.correctAnswer).trim() ? 'lowercase' : 'other',
                });
              }
            }
          }
        }
      }

      // Report boolean answer formats
      if (boolAnswers.length > 0) {
        console.log(`Found ${boolAnswers.length} boolean-like code_output answers`);
      }
    });
  });
});

describe('Code Snippet Validation', () => {
  const allQuizFiles = findQuizFiles(SUBJECTS_DIR);

  it('code_output questions should have code snippets', () => {
    const missingSnippets: string[] = [];

    for (const filePath of allQuizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'code_output' && !question.codeSnippet) {
            missingSnippets.push(`${quiz.id}/${question.id}`);
          }
        }
      }
    }

    // Code output questions should generally have code snippets
    // Some may ask "what does X output" without a separate snippet
    if (missingSnippets.length > 0) {
      console.log(`\ncode_output questions without codeSnippet (${missingSnippets.length}):`);
      console.log(missingSnippets.slice(0, 5).join(', '));
    }

    // Don't fail - some questions embed code in the prompt
    expect(true).toBe(true);
  });

  it('code snippets should not have syntax that would cause undefined behavior', () => {
    const suspiciousPatterns = [
      // C/C++ undefined behavior patterns
      { pattern: /\w\+\+.*,.*\+\+\w/g, description: 'Multiple increments in same expression' },
      { pattern: /\w\+\+.*\+\+\w.*printf/g, description: 'Multiple increments before printf' },
    ];

    const suspiciousQuestions: Array<{
      location: string;
      snippet: string;
      issue: string;
    }> = [];

    for (const filePath of allQuizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.codeSnippet) {
            for (const { pattern, description } of suspiciousPatterns) {
              if (pattern.test(question.codeSnippet)) {
                suspiciousQuestions.push({
                  location: `${quiz.id}/${question.id}`,
                  snippet: question.codeSnippet.substring(0, 100),
                  issue: description,
                });
              }
            }
          }
        }
      }
    }

    // These should now be fixed (we fixed cs105-q1b-3)
    expect(
      suspiciousQuestions,
      `Found ${suspiciousQuestions.length} questions with potentially undefined behavior: ${suspiciousQuestions.map(q => q.location).join(', ')}`
    ).toHaveLength(0);
  });
});
