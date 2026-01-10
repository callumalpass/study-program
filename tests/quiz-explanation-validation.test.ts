/**
 * Quiz Explanation Validation Tests
 *
 * These tests validate that quiz explanations don't contain fragile references
 * to option letters or numbers that could become incorrect if options are reordered.
 *
 * Issues fixed:
 * - math403-exam-midterm/mid-q1: Explanation referenced wrong option number
 * - math403-quiz-1-1/math403-q1-1-1: Explanation referenced wrong option number
 * - math403-exam-midterm/mid-q14: Explanation was self-contradictory
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion, Exam } from '../src/core/types';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

function findQuizFiles(dir: string): string[] {
  const quizFiles: string[] = [];
  if (!existsSync(dir)) return quizFiles;

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

function findExamFiles(dir: string): string[] {
  const examFiles: string[] = [];
  if (!existsSync(dir)) return examFiles;

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

function loadJsonFile<T>(filePath: string): T {
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

/**
 * Check if an explanation contains fragile option references like "Option 1", "Option A", etc.
 * that could become incorrect if options are reordered.
 */
function findFragileOptionReferences(explanation: string | undefined): string[] {
  if (!explanation) return [];
  const issues: string[] = [];

  // Patterns that reference options by position/letter (case insensitive)
  const fragilePatterns = [
    /\boption\s*[1-9]\b/gi,           // "option 1", "option 2", etc.
    /\boption\s*[a-d]\b/gi,           // "option A", "option B", etc.
    /\bchoice\s*[1-9]\b/gi,           // "choice 1", "choice 2", etc.
    /\bchoice\s*[a-d]\b/gi,           // "choice A", "choice B", etc.
    /\banswer\s*[a-d]\b/gi,           // "answer A", "answer B", etc.
    /\b[a-d]\)\s*is\s*(correct|right|wrong|incorrect)/gi,  // "A) is correct"
    /\bthe\s*(first|second|third|fourth)\s*option\b/gi,    // "the first option"
  ];

  for (const pattern of fragilePatterns) {
    const matches = explanation.match(pattern);
    if (matches) {
      issues.push(...matches);
    }
  }

  return issues;
}

/**
 * Check if an explanation contains self-contradictory language
 */
function containsSelfContradiction(explanation: string | undefined): boolean {
  if (!explanation) return false;
  const contradictionPatterns = [
    /actually.*\bis\b.*preserved/i,           // "Actually, X IS preserved"
    /wait.*reconsider/i,                       // "wait...reconsider"
    /let me reconsider/i,                      // "let me reconsider"
    /the answer should be/i,                   // "the answer should be"
    /better answer/i,                          // "better answer"
    /actually.*wrong/i,                        // "Actually...wrong"
  ];

  return contradictionPatterns.some(pattern => pattern.test(explanation));
}

describe('Quiz Explanation Validation', () => {
  describe('math403 quiz explanations should be clear and correct', () => {
    it('math403-quiz-1-1 explanations should not reference options by number', () => {
      const quizFile = join(SUBJECTS_DIR, 'math403', 'content', 'topic-1', 'quizzes.json');
      const quizzes = loadJsonFile<Quiz[]>(quizFile);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          const fragileRefs = findFragileOptionReferences(question.explanation);
          expect(
            fragileRefs,
            `Question ${question.id} has fragile option references: ${fragileRefs.join(', ')}`
          ).toHaveLength(0);
        }
      }
    });
  });

  describe('math403 exam explanations should be clear and correct', () => {
    it('math403 exam explanations should not reference options by number', () => {
      const examFile = join(SUBJECTS_DIR, 'math403', 'exams.json');
      const exams = loadJsonFile<Exam[]>(examFile);

      for (const exam of exams) {
        for (const question of exam.questions) {
          const fragileRefs = findFragileOptionReferences(question.explanation);
          expect(
            fragileRefs,
            `Exam ${exam.id} question ${question.id} has fragile option references: ${fragileRefs.join(', ')}`
          ).toHaveLength(0);
        }
      }
    });

    it('math403 exam explanations should not be self-contradictory', () => {
      const examFile = join(SUBJECTS_DIR, 'math403', 'exams.json');
      const exams = loadJsonFile<Exam[]>(examFile);

      for (const exam of exams) {
        for (const question of exam.questions) {
          expect(
            containsSelfContradiction(question.explanation),
            `Exam ${exam.id} question ${question.id} has self-contradictory explanation`
          ).toBe(false);
        }
      }
    });
  });

  describe('all quizzes should avoid fragile option references (informational)', () => {
    const quizFiles = findQuizFiles(SUBJECTS_DIR);

    it('reports quizzes with fragile option references', () => {
      const issues: string[] = [];

      for (const filePath of quizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            const fragileRefs = findFragileOptionReferences(question.explanation);
            if (fragileRefs.length > 0) {
              issues.push(`${quiz.id}/${question.id}: ${fragileRefs.join(', ')}`);
            }
          }
        }
      }

      if (issues.length > 0) {
        console.log(`\nQuestions with fragile option references (${issues.length}):`);
        console.log(issues.slice(0, 10).join('\n'));
        if (issues.length > 10) {
          console.log(`... and ${issues.length - 10} more`);
        }
      }

      // This is informational - we don't fail on legacy issues
      expect(quizFiles.length).toBeGreaterThan(0);
    });
  });

  describe('all exams should avoid fragile option references (informational)', () => {
    const examFiles = findExamFiles(SUBJECTS_DIR);

    it('reports exams with fragile option references', () => {
      const issues: string[] = [];

      for (const filePath of examFiles) {
        const exams = loadJsonFile<Exam[]>(filePath);

        for (const exam of exams) {
          for (const question of exam.questions) {
            const fragileRefs = findFragileOptionReferences(question.explanation);
            if (fragileRefs.length > 0) {
              issues.push(`${exam.id}/${question.id}: ${fragileRefs.join(', ')}`);
            }
          }
        }
      }

      if (issues.length > 0) {
        console.log(`\nExam questions with fragile option references (${issues.length}):`);
        console.log(issues.slice(0, 10).join('\n'));
        if (issues.length > 10) {
          console.log(`... and ${issues.length - 10} more`);
        }
      }

      // This is informational - we don't fail on legacy issues
      expect(examFiles.length).toBeGreaterThan(0);
    });
  });
});

describe('Fragile Reference Detection', () => {
  it('should detect "Option 1" references', () => {
    const refs = findFragileOptionReferences('Option 1 is correct because...');
    expect(refs).toContain('Option 1');
  });

  it('should detect "Option A" references', () => {
    const refs = findFragileOptionReferences('Option A is the answer');
    expect(refs).toContain('Option A');
  });

  it('should detect "choice 2" references (case insensitive)', () => {
    const refs = findFragileOptionReferences('Choice 2 satisfies the requirements');
    expect(refs.length).toBeGreaterThan(0);
  });

  it('should detect "the first option" references', () => {
    const refs = findFragileOptionReferences('The first option is wrong');
    expect(refs.length).toBeGreaterThan(0);
  });

  it('should NOT flag explanations that describe the actual content', () => {
    const refs = findFragileOptionReferences(
      '{∅, {a}, {a, b}, X} is a topology because it contains ∅ and X, and is closed under unions.'
    );
    expect(refs).toHaveLength(0);
  });

  it('should NOT flag explanations with "option" used in other contexts', () => {
    const refs = findFragileOptionReferences(
      'There is no optional step in this process.'
    );
    expect(refs).toHaveLength(0);
  });
});

describe('Self-Contradiction Detection', () => {
  it('should detect "Actually... IS preserved"', () => {
    expect(containsSelfContradiction(
      'This is wrong. Actually, metrizability IS preserved.'
    )).toBe(true);
  });

  it('should detect "let me reconsider"', () => {
    expect(containsSelfContradiction(
      'Wait, let me reconsider this answer.'
    )).toBe(true);
  });

  it('should detect "the answer should be"', () => {
    expect(containsSelfContradiction(
      'The answer should be something different.'
    )).toBe(true);
  });

  it('should NOT flag clear explanations', () => {
    expect(containsSelfContradiction(
      'Compactness, connectedness, and cardinality are all preserved by homeomorphisms.'
    )).toBe(false);
  });
});
