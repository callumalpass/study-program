/**
 * Validation test for math304 multiple_choice question format consistency.
 *
 * This test enforces that math304 multiple_choice questions use numeric indices
 * for correctAnswer. This subject was recently fixed and should serve as a
 * template for consistent format.
 *
 * The quiz-utils code supports both string and numeric formats for backwards
 * compatibility, but numeric indices are the preferred format.
 */

import { describe, expect, it } from 'vitest';
import { glob } from 'glob';
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
  questions: QuizQuestion[];
}

interface Exam {
  id: string;
  questions: QuizQuestion[];
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

/**
 * Load exam file for a specific subject
 */
function loadSubjectExams(subjectId: string): Exam[] {
  try {
    const content = readFileSync(`src/subjects/${subjectId}/exams.json`, 'utf-8');
    return JSON.parse(content) as Exam[];
  } catch {
    return [];
  }
}

describe('Math304 Multiple Choice Format Consistency', () => {
  describe('Quiz correctAnswer format', () => {
    it('all math304 multiple_choice questions should use numeric indices', async () => {
      const quizData = await loadSubjectQuizzes('math304');
      const issues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'multiple_choice') {
              if (typeof q.correctAnswer !== 'number') {
                issues.push(
                  `${file}: ${q.id} uses string correctAnswer "${q.correctAnswer}" - should be numeric index`
                );
              } else if (q.options && (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
                issues.push(
                  `${file}: ${q.id} has correctAnswer ${q.correctAnswer} out of bounds (options: ${q.options.length})`
                );
              }
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });

    it('math304 correctAnswer indices should be within bounds', async () => {
      const quizData = await loadSubjectQuizzes('math304');
      const issues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'multiple_choice' && typeof q.correctAnswer === 'number' && q.options) {
              if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
                issues.push(
                  `${file}: ${q.id} correctAnswer index ${q.correctAnswer} exceeds options length ${q.options.length}`
                );
              }
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('Exam correctAnswer format', () => {
    it('math304 exam multiple_choice questions should use numeric indices', () => {
      const exams = loadSubjectExams('math304');
      const issues: string[] = [];

      for (const exam of exams) {
        for (const q of exam.questions) {
          if (q.type === 'multiple_choice') {
            if (typeof q.correctAnswer !== 'number') {
              issues.push(
                `math304/exams.json: ${q.id} uses string correctAnswer "${q.correctAnswer}" - should be numeric index`
              );
            } else if (q.options && (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
              issues.push(
                `math304/exams.json: ${q.id} has correctAnswer ${q.correctAnswer} out of bounds (options: ${q.options.length})`
              );
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('Question counts', () => {
    it('should have substantial math304 quiz coverage', async () => {
      const quizData = await loadSubjectQuizzes('math304');
      let mcCount = 0;

      for (const { quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'multiple_choice') mcCount++;
          }
        }
      }

      // math304 should have at least 30 multiple choice questions
      expect(mcCount).toBeGreaterThan(30);
    });
  });
});
