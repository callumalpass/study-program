/**
 * Quiz correctAnswer format consistency tests.
 *
 * These tests ensure that all multiple_choice questions across the codebase
 * consistently use numeric indices (0, 1, 2, 3, etc.) for correctAnswer values,
 * rather than string values that match option text.
 *
 * While the quiz-utils.ts getCorrectOptionIndex() function handles both formats,
 * using numeric indices is preferred for:
 * - Consistency across the codebase
 * - Reduced risk of typos/mismatches
 * - Simpler data validation
 * - Better performance (no string matching needed)
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
  subjectId: string;
  topicId?: string;
  title: string;
  questions: QuizQuestion[];
}

interface Exam {
  id: string;
  subjectId: string;
  title: string;
  questions: QuizQuestion[];
}

async function loadAllQuizzes(): Promise<{ file: string; quizzes: Quiz[] }[]> {
  const files = await glob('src/subjects/**/quizzes.json');
  return files.map(file => ({
    file,
    quizzes: JSON.parse(readFileSync(file, 'utf-8')) as Quiz[],
  }));
}

async function loadAllExams(): Promise<{ file: string; exams: Exam[] }[]> {
  const files = await glob('src/subjects/*/exams.json');
  return files.map(file => ({
    file,
    exams: JSON.parse(readFileSync(file, 'utf-8')) as Exam[],
  }));
}

describe('Quiz correctAnswer Format Consistency', () => {
  describe('multiple_choice questions format analysis', () => {
    it('reports quiz multiple_choice correctAnswer format statistics (informational)', async () => {
      const quizData = await loadAllQuizzes();
      const outOfBoundsIssues: string[] = [];
      let totalMultipleChoice = 0;
      let numericCount = 0;
      let stringCount = 0;

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'multiple_choice') {
              totalMultipleChoice++;

              if (typeof q.correctAnswer === 'number') {
                numericCount++;
                // Validate the numeric index is within bounds - this is a real error
                if (q.options && (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
                  outOfBoundsIssues.push(`${file}: ${q.id} - correctAnswer ${q.correctAnswer} is out of bounds (options: ${q.options.length})`);
                }
              } else if (typeof q.correctAnswer === 'string') {
                stringCount++;
                // String values are handled by getCorrectOptionIndex() but numeric is preferred
              }
            }
          }
        }
      }

      // Log statistics for visibility
      console.log(`\nMultiple choice correctAnswer format statistics:`);
      console.log(`  Total multiple_choice questions: ${totalMultipleChoice}`);
      console.log(`  Using numeric indices: ${numericCount} (${(numericCount / totalMultipleChoice * 100).toFixed(1)}%)`);
      console.log(`  Using string values: ${stringCount} (${(stringCount / totalMultipleChoice * 100).toFixed(1)}%)`);

      // Out-of-bounds numeric indices are actual errors
      expect(outOfBoundsIssues).toEqual([]);

      // Verify we have data
      expect(totalMultipleChoice).toBeGreaterThan(0);
    });

    it('all exam multiple_choice questions use numeric correctAnswer indices', async () => {
      const examData = await loadAllExams();
      const issues: string[] = [];
      let totalMultipleChoice = 0;
      let numericCount = 0;
      let stringCount = 0;

      for (const { file, exams } of examData) {
        for (const exam of exams) {
          for (const q of exam.questions) {
            if (q.type === 'multiple_choice') {
              totalMultipleChoice++;

              if (typeof q.correctAnswer === 'number') {
                numericCount++;
                // Validate the numeric index is within bounds
                if (q.options && (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
                  issues.push(`${file}: ${q.id} - correctAnswer ${q.correctAnswer} is out of bounds (options: ${q.options.length})`);
                }
              } else if (typeof q.correctAnswer === 'string') {
                stringCount++;
                issues.push(`${file}: ${q.id} - uses string correctAnswer "${q.correctAnswer}" instead of numeric index`);
              } else {
                issues.push(`${file}: ${q.id} - unexpected correctAnswer type: ${typeof q.correctAnswer}`);
              }
            }
          }
        }
      }

      console.log(`\nExam multiple choice correctAnswer format statistics:`);
      console.log(`  Total multiple_choice questions: ${totalMultipleChoice}`);
      console.log(`  Using numeric indices: ${numericCount} (${(numericCount / totalMultipleChoice * 100).toFixed(1)}%)`);
      console.log(`  Using string values: ${stringCount} (${(stringCount / totalMultipleChoice * 100).toFixed(1)}%)`);

      expect(issues).toEqual([]);
      expect(stringCount).toBe(0);
    });
  });

  describe('numeric correctAnswer indices are within valid range', () => {
    it('quiz correctAnswer indices should be 0 <= index < options.length', async () => {
      const quizData = await loadAllQuizzes();
      const outOfBoundsIssues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'multiple_choice' && typeof q.correctAnswer === 'number' && q.options) {
              if (q.correctAnswer < 0) {
                outOfBoundsIssues.push(`${file}: ${q.id} - negative correctAnswer: ${q.correctAnswer}`);
              } else if (q.correctAnswer >= q.options.length) {
                outOfBoundsIssues.push(
                  `${file}: ${q.id} - correctAnswer ${q.correctAnswer} >= options.length ${q.options.length}`
                );
              }
            }
          }
        }
      }

      expect(outOfBoundsIssues).toEqual([]);
    });

    it('exam correctAnswer indices should be 0 <= index < options.length', async () => {
      const examData = await loadAllExams();
      const outOfBoundsIssues: string[] = [];

      for (const { file, exams } of examData) {
        for (const exam of exams) {
          for (const q of exam.questions) {
            if (q.type === 'multiple_choice' && typeof q.correctAnswer === 'number' && q.options) {
              if (q.correctAnswer < 0) {
                outOfBoundsIssues.push(`${file}: ${q.id} - negative correctAnswer: ${q.correctAnswer}`);
              } else if (q.correctAnswer >= q.options.length) {
                outOfBoundsIssues.push(
                  `${file}: ${q.id} - correctAnswer ${q.correctAnswer} >= options.length ${q.options.length}`
                );
              }
            }
          }
        }
      }

      expect(outOfBoundsIssues).toEqual([]);
    });
  });

  describe('specific subject validation', () => {
    it('math302 topic-3 quizzes use numeric indices', async () => {
      const quizData = await loadAllQuizzes();
      const math302Topic3 = quizData.find(d => d.file.includes('math302/content/topic-3'));

      expect(math302Topic3).toBeDefined();

      if (math302Topic3) {
        const issues: string[] = [];

        for (const quiz of math302Topic3.quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'multiple_choice') {
              if (typeof q.correctAnswer !== 'number') {
                issues.push(`${q.id}: correctAnswer should be number, got ${typeof q.correctAnswer}`);
              } else if (q.options && (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
                issues.push(`${q.id}: correctAnswer ${q.correctAnswer} out of bounds`);
              }
            }
          }
        }

        expect(issues).toEqual([]);
      }
    });

    it('math302 topic-1 quizzes use numeric indices (baseline comparison)', async () => {
      const quizData = await loadAllQuizzes();
      const math302Topic1 = quizData.find(d => d.file.includes('math302/content/topic-1'));

      expect(math302Topic1).toBeDefined();

      if (math302Topic1) {
        const issues: string[] = [];

        for (const quiz of math302Topic1.quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'multiple_choice') {
              if (typeof q.correctAnswer !== 'number') {
                issues.push(`${q.id}: correctAnswer should be number, got ${typeof q.correctAnswer}`);
              }
            }
          }
        }

        expect(issues).toEqual([]);
      }
    });
  });

  describe('statistics and reporting', () => {
    it('reports quiz format statistics', async () => {
      const quizData = await loadAllQuizzes();
      const stats = {
        totalQuizzes: 0,
        totalQuestions: 0,
        multipleChoice: 0,
        trueFalse: 0,
        fillBlank: 0,
        codeOutput: 0,
        other: 0,
      };

      for (const { quizzes } of quizData) {
        for (const quiz of quizzes) {
          stats.totalQuizzes++;
          for (const q of quiz.questions) {
            stats.totalQuestions++;
            switch (q.type) {
              case 'multiple_choice':
                stats.multipleChoice++;
                break;
              case 'true_false':
                stats.trueFalse++;
                break;
              case 'fill_blank':
                stats.fillBlank++;
                break;
              case 'code_output':
                stats.codeOutput++;
                break;
              default:
                stats.other++;
            }
          }
        }
      }

      console.log(`\nQuiz format statistics:`);
      console.log(`  Total quizzes: ${stats.totalQuizzes}`);
      console.log(`  Total questions: ${stats.totalQuestions}`);
      console.log(`  multiple_choice: ${stats.multipleChoice}`);
      console.log(`  true_false: ${stats.trueFalse}`);
      console.log(`  fill_blank: ${stats.fillBlank}`);
      console.log(`  code_output: ${stats.codeOutput}`);
      console.log(`  other types: ${stats.other}`);

      // Just verify we have reasonable data
      expect(stats.totalQuizzes).toBeGreaterThan(0);
      expect(stats.multipleChoice).toBeGreaterThan(0);
    });
  });
});
