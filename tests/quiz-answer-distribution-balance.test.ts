/**
 * Quiz and Exam Answer Distribution Balance Tests
 *
 * These tests verify that the multiple choice answer distribution across
 * quizzes and exams is balanced to prevent pattern exploitation.
 *
 * A balanced distribution means each answer position (0, 1, 2, 3) appears
 * approximately 25% of the time (within acceptable tolerance).
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

interface Quiz {
  id: string;
  questions: Array<{
    id: string;
    type: string;
    correctAnswer: number | string | boolean;
    options?: string[];
  }>;
}

interface Exam {
  id: string;
  questions: Array<{
    id: string;
    type: string;
    correctAnswer: number | string | boolean;
    options?: string[];
  }>;
}

function findQuizFiles(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findQuizFiles(fullPath));
    } else if (item.name === 'quizzes.json') {
      files.push(fullPath);
    }
  }

  return files;
}

function findExamFiles(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findExamFiles(fullPath));
    } else if (item.name === 'exams.json') {
      files.push(fullPath);
    }
  }

  return files;
}

describe('Quiz Answer Distribution Balance', () => {
  const subjectsDir = join(__dirname, '../src/subjects');
  const quizFiles = findQuizFiles(subjectsDir);

  it('should have quiz files to test', () => {
    expect(quizFiles.length).toBeGreaterThan(0);
  });

  it('should have balanced answer distribution across all quizzes', () => {
    const distribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    let total = 0;

    for (const file of quizFiles) {
      const quizzes = JSON.parse(readFileSync(file, 'utf-8')) as Quiz[];

      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (q.type === 'multiple_choice' && typeof q.correctAnswer === 'number') {
            distribution[q.correctAnswer]++;
            total++;
          }
        }
      }
    }

    // Calculate percentages
    const percentages = Object.entries(distribution).map(([idx, count]) => ({
      index: parseInt(idx),
      count,
      percentage: (count / total) * 100,
    }));

    // Log distribution for debugging
    console.log('Quiz answer distribution:');
    percentages.forEach(({ index, count, percentage }) => {
      console.log(`  Index ${index}: ${count} (${percentage.toFixed(1)}%)`);
    });
    console.log(`  Total: ${total}`);

    // Each answer position should be between 15% and 35% (balanced)
    // This prevents pattern exploitation where one answer is overwhelmingly common
    const MIN_PERCENTAGE = 15;
    const MAX_PERCENTAGE = 35;

    percentages.forEach(({ index, percentage }) => {
      expect(percentage, `Answer index ${index} is underrepresented at ${percentage.toFixed(1)}%`).toBeGreaterThanOrEqual(MIN_PERCENTAGE);
      expect(percentage, `Answer index ${index} is overrepresented at ${percentage.toFixed(1)}%`).toBeLessThanOrEqual(MAX_PERCENTAGE);
    });
  });
});

describe('Exam Answer Distribution Balance', () => {
  const subjectsDir = join(__dirname, '../src/subjects');

  it('should have balanced answer distribution across all exams', () => {
    const distribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    let total = 0;

    const subjects = readdirSync(subjectsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const subject of subjects) {
      const examPath = join(subjectsDir, subject, 'exams.json');
      if (!existsSync(examPath)) continue;

      const exams = JSON.parse(readFileSync(examPath, 'utf-8')) as Exam[];

      for (const exam of exams) {
        for (const q of exam.questions) {
          if (q.type === 'multiple_choice' && typeof q.correctAnswer === 'number') {
            distribution[q.correctAnswer]++;
            total++;
          }
        }
      }
    }

    // Calculate percentages
    const percentages = Object.entries(distribution).map(([idx, count]) => ({
      index: parseInt(idx),
      count,
      percentage: (count / total) * 100,
    }));

    // Log distribution for debugging
    console.log('Exam answer distribution:');
    percentages.forEach(({ index, count, percentage }) => {
      console.log(`  Index ${index}: ${count} (${percentage.toFixed(1)}%)`);
    });
    console.log(`  Total: ${total}`);

    // Each answer position should be between 15% and 35% (balanced)
    const MIN_PERCENTAGE = 15;
    const MAX_PERCENTAGE = 35;

    percentages.forEach(({ index, percentage }) => {
      expect(percentage, `Answer index ${index} is underrepresented at ${percentage.toFixed(1)}%`).toBeGreaterThanOrEqual(MIN_PERCENTAGE);
      expect(percentage, `Answer index ${index} is overrepresented at ${percentage.toFixed(1)}%`).toBeLessThanOrEqual(MAX_PERCENTAGE);
    });
  });
});

describe('Individual Subject Quiz Distribution', () => {
  const subjectsDir = join(__dirname, '../src/subjects');
  const subjects = readdirSync(subjectsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  it.each(subjects)('subject %s should have reasonably balanced quiz distribution', (subject) => {
    const subjectDir = join(subjectsDir, subject);
    const quizFiles = findQuizFiles(subjectDir);

    if (quizFiles.length === 0) {
      // Skip subjects without quizzes
      return;
    }

    const distribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    let total = 0;

    for (const file of quizFiles) {
      const quizzes = JSON.parse(readFileSync(file, 'utf-8')) as Quiz[];

      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (q.type === 'multiple_choice' && typeof q.correctAnswer === 'number') {
            distribution[q.correctAnswer]++;
            total++;
          }
        }
      }
    }

    // Skip subjects with too few questions for meaningful distribution
    if (total < 20) {
      return;
    }

    // For individual subjects, use more relaxed bounds (5% to 45%)
    // since sample sizes per subject are smaller and randomness can cause variance
    const MIN_PERCENTAGE = 5;
    const MAX_PERCENTAGE = 45;

    Object.entries(distribution).forEach(([idx, count]) => {
      const percentage = (count / total) * 100;
      expect(percentage, `Subject ${subject} index ${idx} at ${percentage.toFixed(1)}%`).toBeGreaterThanOrEqual(MIN_PERCENTAGE);
      expect(percentage, `Subject ${subject} index ${idx} at ${percentage.toFixed(1)}%`).toBeLessThanOrEqual(MAX_PERCENTAGE);
    });
  });
});

describe('Answer Distribution Edge Cases', () => {
  const subjectsDir = join(__dirname, '../src/subjects');
  const quizFiles = findQuizFiles(subjectsDir);

  it('should not have all answers at the same position', () => {
    const distribution: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    let total = 0;

    for (const file of quizFiles) {
      const quizzes = JSON.parse(readFileSync(file, 'utf-8')) as Quiz[];

      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (q.type === 'multiple_choice' && typeof q.correctAnswer === 'number') {
            distribution[q.correctAnswer]++;
            total++;
          }
        }
      }
    }

    // At least 3 different answer positions should be used
    const usedPositions = Object.values(distribution).filter((count) => count > 0).length;
    expect(usedPositions).toBeGreaterThanOrEqual(3);
  });

  it('should have valid correctAnswer indices within bounds', () => {
    const issues: string[] = [];

    for (const file of quizFiles) {
      const quizzes = JSON.parse(readFileSync(file, 'utf-8')) as Quiz[];

      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (q.type === 'multiple_choice' && typeof q.correctAnswer === 'number' && q.options) {
            if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
              issues.push(`${quiz.id}/${q.id}: correctAnswer ${q.correctAnswer} out of bounds (options: ${q.options.length})`);
            }
          }
        }
      }
    }

    expect(issues, `Found ${issues.length} questions with out-of-bounds correctAnswer:\n${issues.slice(0, 10).join('\n')}`).toHaveLength(0);
  });
});
