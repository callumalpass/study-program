/**
 * Validation test for cs305 multiple_choice question format consistency.
 *
 * This test enforces that cs305 multiple_choice questions use numeric indices
 * for correctAnswer. This subject was recently fixed to use numeric indices
 * instead of string values.
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

describe('CS305 Multiple Choice Format Consistency', () => {
  describe('Quiz correctAnswer format', () => {
    it('all cs305 multiple_choice questions should use numeric indices', async () => {
      const quizData = await loadSubjectQuizzes('cs305');
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

    it('cs305 correctAnswer indices should be within bounds', async () => {
      const quizData = await loadSubjectQuizzes('cs305');
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
    it('cs305 exam multiple_choice questions should use numeric indices', () => {
      const exams = loadSubjectExams('cs305');
      const issues: string[] = [];

      for (const exam of exams) {
        for (const q of exam.questions) {
          if (q.type === 'multiple_choice') {
            if (typeof q.correctAnswer !== 'number') {
              issues.push(
                `cs305/exams.json: ${q.id} uses string correctAnswer "${q.correctAnswer}" - should be numeric index`
              );
            } else if (q.options && (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
              issues.push(
                `cs305/exams.json: ${q.id} has correctAnswer ${q.correctAnswer} out of bounds (options: ${q.options.length})`
              );
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('Question counts', () => {
    it('should have substantial cs305 quiz coverage', async () => {
      const quizData = await loadSubjectQuizzes('cs305');
      let mcCount = 0;

      for (const { quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'multiple_choice') mcCount++;
          }
        }
      }

      // cs305 should have at least 20 multiple choice questions
      expect(mcCount).toBeGreaterThan(20);
    });
  });

  describe('Fill blank question format', () => {
    it('fill_blank questions should have string correctAnswer', async () => {
      const quizData = await loadSubjectQuizzes('cs305');
      const issues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'fill_blank') {
              if (typeof q.correctAnswer !== 'string') {
                issues.push(
                  `${file}: ${q.id} fill_blank has non-string correctAnswer (${typeof q.correctAnswer})`
                );
              }
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('True/false question format', () => {
    it('true_false questions should have boolean correctAnswer', async () => {
      const quizData = await loadSubjectQuizzes('cs305');
      const issues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'true_false') {
              if (typeof q.correctAnswer !== 'boolean') {
                issues.push(
                  `${file}: ${q.id} true_false has non-boolean correctAnswer (${typeof q.correctAnswer})`
                );
              }
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });
});
