/**
 * Data format validation tests for quiz and exam content.
 *
 * These tests ensure that quiz and exam data follow the expected format conventions,
 * particularly that multiple_choice questions use numeric indices for correctAnswer.
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
 * Load all quiz files from a subject
 */
async function loadAllQuizzes(): Promise<{ file: string; quizzes: Quiz[] }[]> {
  const files = await glob('src/subjects/**/quizzes.json');
  return files.map(file => ({
    file,
    quizzes: JSON.parse(readFileSync(file, 'utf-8')) as Quiz[],
  }));
}

/**
 * Load all exam files
 */
async function loadAllExams(): Promise<{ file: string; exams: Exam[] }[]> {
  const files = await glob('src/subjects/*/exams.json');
  return files.map(file => ({
    file,
    exams: JSON.parse(readFileSync(file, 'utf-8')) as Exam[],
  }));
}

describe('Quiz Data Format Validation', () => {
  describe('multiple_choice correctAnswer format', () => {
    it('all multiple_choice questions in math301 topic-1 should use numeric indices', async () => {
      const quizData = await loadAllQuizzes();
      const math301Topic1 = quizData.find(d => d.file.includes('math301/content/topic-1'));

      if (!math301Topic1) {
        throw new Error('math301 topic-1 quizzes not found');
      }

      const issues: string[] = [];

      for (const quiz of math301Topic1.quizzes) {
        for (const q of quiz.questions) {
          if (q.type === 'multiple_choice') {
            if (typeof q.correctAnswer !== 'number') {
              issues.push(`${q.id}: correctAnswer should be number, got ${typeof q.correctAnswer} ("${q.correctAnswer}")`);
            } else if (q.options && (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
              issues.push(`${q.id}: correctAnswer ${q.correctAnswer} is out of bounds for options (length ${q.options.length})`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });

    it('should have options array for all multiple_choice questions', async () => {
      const quizData = await loadAllQuizzes();
      const issues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'multiple_choice' && (!q.options || q.options.length === 0)) {
              issues.push(`${file}: ${q.id} is multiple_choice but has no options`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('true_false correctAnswer format', () => {
    it('all true_false questions should have boolean correctAnswer', async () => {
      const quizData = await loadAllQuizzes();
      const issues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'true_false' && typeof q.correctAnswer !== 'boolean') {
              issues.push(`${file}: ${q.id} is true_false but correctAnswer is ${typeof q.correctAnswer} ("${q.correctAnswer}")`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('fill_blank and code_output correctAnswer format', () => {
    it('fill_blank questions should have string correctAnswer', async () => {
      const quizData = await loadAllQuizzes();
      const issues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'fill_blank' && typeof q.correctAnswer !== 'string') {
              issues.push(`${file}: ${q.id} is fill_blank but correctAnswer is ${typeof q.correctAnswer}`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });

    it('code_output questions should have string correctAnswer', async () => {
      const quizData = await loadAllQuizzes();
      const issues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          for (const q of quiz.questions) {
            if (q.type === 'code_output' && typeof q.correctAnswer !== 'string') {
              issues.push(`${file}: ${q.id} is code_output but correctAnswer is ${typeof q.correctAnswer}`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('question ID uniqueness', () => {
    it('all question IDs within a quiz should be unique', async () => {
      const quizData = await loadAllQuizzes();
      const issues: string[] = [];

      for (const { file, quizzes } of quizData) {
        for (const quiz of quizzes) {
          const ids = new Set<string>();
          for (const q of quiz.questions) {
            if (ids.has(q.id)) {
              issues.push(`${file}: Duplicate question ID "${q.id}" in quiz "${quiz.id}"`);
            }
            ids.add(q.id);
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });
});

describe('Exam Data Format Validation', () => {
  describe('multiple_choice correctAnswer format', () => {
    it('should have options array for all multiple_choice questions', async () => {
      const examData = await loadAllExams();
      const issues: string[] = [];

      for (const { file, exams } of examData) {
        for (const exam of exams) {
          for (const q of exam.questions) {
            if (q.type === 'multiple_choice' && (!q.options || q.options.length === 0)) {
              issues.push(`${file}: ${q.id} is multiple_choice but has no options`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });

    it('multiple_choice correctAnswer should be valid index when numeric', async () => {
      const examData = await loadAllExams();
      const issues: string[] = [];

      for (const { file, exams } of examData) {
        for (const exam of exams) {
          for (const q of exam.questions) {
            if (q.type === 'multiple_choice' && typeof q.correctAnswer === 'number') {
              if (q.options && (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
                issues.push(`${file}: ${q.id} has correctAnswer ${q.correctAnswer} out of bounds (options length: ${q.options.length})`);
              }
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('true_false correctAnswer format', () => {
    it('all true_false questions should have boolean correctAnswer', async () => {
      const examData = await loadAllExams();
      const issues: string[] = [];

      for (const { file, exams } of examData) {
        for (const exam of exams) {
          for (const q of exam.questions) {
            if (q.type === 'true_false' && typeof q.correctAnswer !== 'boolean') {
              issues.push(`${file}: ${q.id} is true_false but correctAnswer is ${typeof q.correctAnswer}`);
            }
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('question ID uniqueness', () => {
    it('all question IDs within an exam should be unique', async () => {
      const examData = await loadAllExams();
      const issues: string[] = [];

      for (const { file, exams } of examData) {
        for (const exam of exams) {
          const ids = new Set<string>();
          for (const q of exam.questions) {
            if (ids.has(q.id)) {
              issues.push(`${file}: Duplicate question ID "${q.id}" in exam "${exam.id}"`);
            }
            ids.add(q.id);
          }
        }
      }

      expect(issues).toEqual([]);
    });
  });
});

describe('Question Content Quality', () => {
  it('all questions should have non-empty prompts', async () => {
    const quizData = await loadAllQuizzes();
    const issues: string[] = [];

    for (const { file, quizzes } of quizData) {
      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (!q.prompt || q.prompt.trim().length === 0) {
            issues.push(`${file}: ${q.id} has empty prompt`);
          }
        }
      }
    }

    expect(issues).toEqual([]);
  });

  it('multiple_choice questions should have at least 2 options', async () => {
    const quizData = await loadAllQuizzes();
    const issues: string[] = [];

    for (const { file, quizzes } of quizData) {
      for (const quiz of quizzes) {
        for (const q of quiz.questions) {
          if (q.type === 'multiple_choice' && q.options && q.options.length < 2) {
            issues.push(`${file}: ${q.id} has only ${q.options.length} option(s)`);
          }
        }
      }
    }

    expect(issues).toEqual([]);
  });
});
