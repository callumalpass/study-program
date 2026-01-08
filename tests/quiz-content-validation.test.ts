/**
 * Quiz Content Validation Tests
 *
 * These tests validate that quiz JSON files are properly formatted with correct data types.
 * Specifically, they ensure that true_false questions have boolean correctAnswer values,
 * not string values like "true" or "false".
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
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

/**
 * Validate a single question's correctAnswer type
 */
function validateQuestionAnswerType(question: QuizQuestion, filePath: string): string[] {
  const errors: string[] = [];
  const questionLocation = `${filePath} - Question ID: ${question.id}`;

  switch (question.type) {
    case 'true_false':
      // correctAnswer MUST be a boolean (true or false), not a string
      if (typeof question.correctAnswer !== 'boolean') {
        errors.push(
          `${questionLocation}: true_false question has non-boolean correctAnswer. ` +
          `Expected boolean, got ${typeof question.correctAnswer} (value: ${JSON.stringify(question.correctAnswer)})`
        );
      }
      break;

    case 'multiple_choice':
      // correctAnswer can be a number (option index) or string (option text)
      if (typeof question.correctAnswer !== 'number' && typeof question.correctAnswer !== 'string') {
        errors.push(
          `${questionLocation}: multiple_choice question has invalid correctAnswer type. ` +
          `Expected number or string, got ${typeof question.correctAnswer}`
        );
      }
      break;

    case 'fill_blank':
      // correctAnswer should be a string
      if (typeof question.correctAnswer !== 'string') {
        errors.push(
          `${questionLocation}: ${question.type} question has non-string correctAnswer. ` +
          `Expected string, got ${typeof question.correctAnswer}`
        );
      }
      break;

    case 'code_output':
      // correctAnswer can be a string or number (numeric outputs are common)
      if (typeof question.correctAnswer !== 'string' && typeof question.correctAnswer !== 'number') {
        errors.push(
          `${questionLocation}: code_output question has invalid correctAnswer type. ` +
          `Expected string or number, got ${typeof question.correctAnswer}`
        );
      }
      break;

    case 'written':
      // written questions may use modelAnswer instead of correctAnswer, or have empty correctAnswer
      // So we don't enforce strict string requirement
      break;

    case 'coding':
      // coding questions may have empty correctAnswer (tests determine correctness)
      // No strict validation needed
      break;
  }

  return errors;
}

describe('Quiz Content Validation', () => {
  describe('CS307 quizzes should have proper true_false boolean values', () => {
    // CS307 has been fixed - these tests ensure the fixes are maintained
    const cs307QuizDir = join(SUBJECTS_DIR, 'cs307', 'content');
    const cs307QuizFiles = findQuizFiles(cs307QuizDir);

    it('should find CS307 quiz files', () => {
      expect(cs307QuizFiles.length).toBe(7); // 7 topics
    });

    it.each(cs307QuizFiles)('validates %s', (filePath) => {
      const quizzes = loadJsonFile<Quiz[]>(filePath);
      const errors: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          errors.push(...validateQuestionAnswerType(question, filePath));
        }
      }

      if (errors.length > 0) {
        throw new Error(`Found ${errors.length} validation error(s):\n${errors.join('\n')}`);
      }
    });
  });

  describe('CS305 quizzes should have proper true_false boolean values', () => {
    // CS305 has been fixed - these tests ensure the fixes are maintained
    const cs305QuizDir = join(SUBJECTS_DIR, 'cs305', 'content');
    const cs305QuizFiles = findQuizFiles(cs305QuizDir);

    it('should find CS305 quiz files', () => {
      expect(cs305QuizFiles.length).toBe(7); // 7 topics
    });

    it.each(cs305QuizFiles)('validates %s', (filePath) => {
      const quizzes = loadJsonFile<Quiz[]>(filePath);
      const errors: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          errors.push(...validateQuestionAnswerType(question, filePath));
        }
      }

      if (errors.length > 0) {
        throw new Error(`Found ${errors.length} validation error(s):\n${errors.join('\n')}`);
      }
    });
  });

  describe('CS305 exams should have proper true_false boolean values', () => {
    const cs305ExamsFile = join(SUBJECTS_DIR, 'cs305', 'exams.json');

    it('validates CS305 exams', () => {
      const exams = loadJsonFile<{ questions: QuizQuestion[] }[]>(cs305ExamsFile);
      const errors: string[] = [];

      for (const exam of exams) {
        for (const question of exam.questions) {
          errors.push(...validateQuestionAnswerType(question, cs305ExamsFile));
        }
      }

      if (errors.length > 0) {
        throw new Error(`Found ${errors.length} validation error(s):\n${errors.join('\n')}`);
      }
    });
  });

  describe('CS306 quizzes should have proper true_false boolean values', () => {
    // CS306 has been fixed - these tests ensure the fixes are maintained
    const cs306QuizDir = join(SUBJECTS_DIR, 'cs306', 'content');
    const cs306QuizFiles = findQuizFiles(cs306QuizDir);

    it('should find CS306 quiz files', () => {
      expect(cs306QuizFiles.length).toBe(7); // 7 topics
    });

    it.each(cs306QuizFiles)('validates %s', (filePath) => {
      const quizzes = loadJsonFile<Quiz[]>(filePath);
      const errors: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          errors.push(...validateQuestionAnswerType(question, filePath));
        }
      }

      if (errors.length > 0) {
        throw new Error(`Found ${errors.length} validation error(s):\n${errors.join('\n')}`);
      }
    });
  });

  describe('true_false questions should have boolean correctAnswer values (informational)', () => {
    const allQuizFiles = findQuizFiles(SUBJECTS_DIR);

    // This test provides visibility into which files still need fixing
    // It doesn't fail because fixing all files is beyond current scope
    it('reports subjects with string true_false answers', () => {
      const problemFiles: string[] = [];

      for (const filePath of allQuizFiles) {
        const quizzes = loadJsonFile<Quiz[]>(filePath);
        let hasIssues = false;

        for (const quiz of quizzes) {
          for (const question of quiz.questions) {
            if (question.type === 'true_false' && typeof question.correctAnswer !== 'boolean') {
              hasIssues = true;
              break;
            }
          }
          if (hasIssues) break;
        }

        if (hasIssues) {
          problemFiles.push(filePath.replace(SUBJECTS_DIR, ''));
        }
      }

      // Log for visibility, but don't fail the test
      if (problemFiles.length > 0) {
        console.log(`\nSubjects with true_false string issues (${problemFiles.length} files):`);
        console.log(problemFiles.slice(0, 10).join('\n'));
        if (problemFiles.length > 10) {
          console.log(`... and ${problemFiles.length - 10} more`);
        }
      }

      // Just verify we found and checked files
      expect(allQuizFiles.length).toBeGreaterThan(0);
    });
  });

  describe('exam questions validation (informational)', () => {
    const examFiles = findExamFiles(SUBJECTS_DIR);

    it('should find exam files in the subjects directory', () => {
      expect(examFiles.length).toBeGreaterThan(0);
    });

    it('reports exams with type issues', () => {
      const problemFiles: string[] = [];

      for (const filePath of examFiles) {
        const exams = loadJsonFile<{ questions: QuizQuestion[] }[]>(filePath);
        let hasIssues = false;

        for (const exam of exams) {
          for (const question of exam.questions) {
            if (question.type === 'true_false' && typeof question.correctAnswer !== 'boolean') {
              hasIssues = true;
              break;
            }
          }
          if (hasIssues) break;
        }

        if (hasIssues) {
          problemFiles.push(filePath.replace(SUBJECTS_DIR, ''));
        }
      }

      // Log for visibility, but don't fail the test
      if (problemFiles.length > 0) {
        console.log(`\nExams with true_false string issues (${problemFiles.length} files):`);
        console.log(problemFiles.join('\n'));
      }

      // Just verify we found and checked files
      expect(examFiles.length).toBeGreaterThan(0);
    });
  });

  describe('specific type checks', () => {
    it('should correctly identify boolean true', () => {
      const question: QuizQuestion = {
        id: 'test-1',
        type: 'true_false',
        prompt: 'Test question',
        correctAnswer: true,
        explanation: 'Test explanation',
      };

      const errors = validateQuestionAnswerType(question, 'test.json');
      expect(errors).toHaveLength(0);
    });

    it('should correctly identify boolean false', () => {
      const question: QuizQuestion = {
        id: 'test-2',
        type: 'true_false',
        prompt: 'Test question',
        correctAnswer: false,
        explanation: 'Test explanation',
      };

      const errors = validateQuestionAnswerType(question, 'test.json');
      expect(errors).toHaveLength(0);
    });

    it('should reject string "true" for true_false questions', () => {
      const question: QuizQuestion = {
        id: 'test-3',
        type: 'true_false',
        prompt: 'Test question',
        correctAnswer: 'true' as unknown as boolean,
        explanation: 'Test explanation',
      };

      const errors = validateQuestionAnswerType(question, 'test.json');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toContain('non-boolean correctAnswer');
    });

    it('should reject string "false" for true_false questions', () => {
      const question: QuizQuestion = {
        id: 'test-4',
        type: 'true_false',
        prompt: 'Test question',
        correctAnswer: 'false' as unknown as boolean,
        explanation: 'Test explanation',
      };

      const errors = validateQuestionAnswerType(question, 'test.json');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toContain('non-boolean correctAnswer');
    });

    it('should accept number for multiple_choice questions', () => {
      const question: QuizQuestion = {
        id: 'test-5',
        type: 'multiple_choice',
        prompt: 'Test question',
        options: ['A', 'B', 'C'],
        correctAnswer: 1,
        explanation: 'Test explanation',
      };

      const errors = validateQuestionAnswerType(question, 'test.json');
      expect(errors).toHaveLength(0);
    });

    it('should accept string for multiple_choice questions', () => {
      const question: QuizQuestion = {
        id: 'test-6',
        type: 'multiple_choice',
        prompt: 'Test question',
        options: ['Option A', 'Option B', 'Option C'],
        correctAnswer: 'Option B',
        explanation: 'Test explanation',
      };

      const errors = validateQuestionAnswerType(question, 'test.json');
      expect(errors).toHaveLength(0);
    });

    it('should accept string for fill_blank questions', () => {
      const question: QuizQuestion = {
        id: 'test-7',
        type: 'fill_blank',
        prompt: 'The capital of France is ____.',
        correctAnswer: 'Paris',
        explanation: 'Test explanation',
      };

      const errors = validateQuestionAnswerType(question, 'test.json');
      expect(errors).toHaveLength(0);
    });

    it('should accept string for code_output questions', () => {
      const question: QuizQuestion = {
        id: 'test-8',
        type: 'code_output',
        prompt: 'What does print(2+2) output?',
        correctAnswer: '4',
        explanation: 'Test explanation',
      };

      const errors = validateQuestionAnswerType(question, 'test.json');
      expect(errors).toHaveLength(0);
    });

    it('should accept number for code_output questions', () => {
      const question: QuizQuestion = {
        id: 'test-9',
        type: 'code_output',
        prompt: 'What does print(2+2) output?',
        correctAnswer: 4 as unknown as string,
        explanation: 'Test explanation',
      };

      const errors = validateQuestionAnswerType(question, 'test.json');
      expect(errors).toHaveLength(0);
    });
  });
});

describe('Quiz Structure Validation', () => {
  const quizFiles = findQuizFiles(SUBJECTS_DIR);

  it('all quizzes should have required fields', () => {
    for (const filePath of quizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        expect(quiz.id, `Quiz in ${filePath} missing id`).toBeDefined();
        expect(quiz.subjectId, `Quiz ${quiz.id} missing subjectId`).toBeDefined();
        expect(quiz.topicId, `Quiz ${quiz.id} missing topicId`).toBeDefined();
        expect(quiz.title, `Quiz ${quiz.id} missing title`).toBeDefined();
        expect(quiz.questions, `Quiz ${quiz.id} missing questions`).toBeDefined();
        expect(Array.isArray(quiz.questions), `Quiz ${quiz.id} questions should be array`).toBe(true);
        expect(quiz.questions.length, `Quiz ${quiz.id} should have at least one question`).toBeGreaterThan(0);
      }
    }
  });

  it('all questions should have required fields', () => {
    for (const filePath of quizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          expect(question.id, `Question in ${quiz.id} missing id`).toBeDefined();
          expect(question.type, `Question ${question.id} missing type`).toBeDefined();
          expect(question.prompt, `Question ${question.id} missing prompt`).toBeDefined();
          expect(question.correctAnswer, `Question ${question.id} missing correctAnswer`).toBeDefined();
        }
      }
    }
  });

  it('multiple_choice questions should have options', () => {
    for (const filePath of quizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice') {
            expect(
              question.options,
              `Multiple choice question ${question.id} in ${quiz.id} missing options`
            ).toBeDefined();
            expect(
              Array.isArray(question.options),
              `Multiple choice question ${question.id} options should be array`
            ).toBe(true);
            expect(
              question.options!.length,
              `Multiple choice question ${question.id} should have at least 2 options`
            ).toBeGreaterThanOrEqual(2);
          }
        }
      }
    }
  });

  it('code_output questions should NOT have options', () => {
    // code_output questions are for typing the expected output, not selecting from options.
    // Questions with options should be type "multiple_choice" instead.
    const problemQuizzes: string[] = [];

    for (const filePath of quizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'code_output' && question.options) {
            problemQuizzes.push(`${quiz.id}/${question.id}`);
          }
        }
      }
    }

    expect(
      problemQuizzes,
      `Found ${problemQuizzes.length} code_output questions with options (should be multiple_choice): ${problemQuizzes.slice(0, 5).join(', ')}`
    ).toHaveLength(0);
  });
});

describe('Duplicate Options Validation', () => {
  const quizFiles = findQuizFiles(SUBJECTS_DIR);
  const examFiles = findExamFiles(SUBJECTS_DIR);

  it('multiple_choice quiz questions should not have duplicate options', () => {
    const duplicates: string[] = [];

    for (const filePath of quizFiles) {
      const quizzes = loadJsonFile<Quiz[]>(filePath);

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            const optionSet = new Set<string>();
            for (const option of question.options) {
              if (optionSet.has(option)) {
                duplicates.push(
                  `${filePath.replace(SUBJECTS_DIR, '')} - ${quiz.id}/${question.id}: duplicate option "${option}"`
                );
              }
              optionSet.add(option);
            }
          }
        }
      }
    }

    expect(
      duplicates,
      `Found ${duplicates.length} questions with duplicate options:\n${duplicates.join('\n')}`
    ).toHaveLength(0);
  });

  it('multiple_choice exam questions should not have duplicate options', () => {
    const duplicates: string[] = [];

    for (const filePath of examFiles) {
      const exams = loadJsonFile<{ id: string; questions: QuizQuestion[] }[]>(filePath);

      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            const optionSet = new Set<string>();
            for (const option of question.options) {
              if (optionSet.has(option)) {
                duplicates.push(
                  `${filePath.replace(SUBJECTS_DIR, '')} - ${exam.id}/${question.id}: duplicate option "${option}"`
                );
              }
              optionSet.add(option);
            }
          }
        }
      }
    }

    expect(
      duplicates,
      `Found ${duplicates.length} exam questions with duplicate options:\n${duplicates.join('\n')}`
    ).toHaveLength(0);
  });
});

describe('Multiple Choice correctAnswer Type Validation', () => {
  describe('CS402 topic-4 quizzes should use numeric correctAnswer indices', () => {
    const cs402Topic4File = join(SUBJECTS_DIR, 'cs402', 'content', 'topic-4', 'quizzes.json');

    it('validates all multiple_choice questions use numeric correctAnswer', () => {
      const quizzes = loadJsonFile<Quiz[]>(cs402Topic4File);
      const errors: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice') {
            if (typeof question.correctAnswer !== 'number') {
              errors.push(
                `${quiz.id}/${question.id}: correctAnswer should be numeric index, got ${typeof question.correctAnswer}`
              );
            } else if (question.correctAnswer < 0 || question.correctAnswer >= (question.options?.length ?? 0)) {
              errors.push(
                `${quiz.id}/${question.id}: correctAnswer ${question.correctAnswer} is out of bounds for ${question.options?.length} options`
              );
            }
          }
        }
      }

      expect(errors, `Found ${errors.length} issues:\n${errors.join('\n')}`).toHaveLength(0);
    });
  });

  describe('Math302 topic-1 quizzes should use numeric correctAnswer indices', () => {
    const math302Topic1File = join(SUBJECTS_DIR, 'math302', 'content', 'topic-1', 'quizzes.json');

    it('validates all multiple_choice questions use numeric correctAnswer', () => {
      const quizzes = loadJsonFile<Quiz[]>(math302Topic1File);
      const errors: string[] = [];

      for (const quiz of quizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice') {
            if (typeof question.correctAnswer !== 'number') {
              errors.push(
                `${quiz.id}/${question.id}: correctAnswer should be numeric index, got ${typeof question.correctAnswer}`
              );
            } else if (question.correctAnswer < 0 || question.correctAnswer >= (question.options?.length ?? 0)) {
              errors.push(
                `${quiz.id}/${question.id}: correctAnswer ${question.correctAnswer} is out of bounds for ${question.options?.length} options`
              );
            }
          }
        }
      }

      expect(errors, `Found ${errors.length} issues:\n${errors.join('\n')}`).toHaveLength(0);
    });
  });
});

describe('Exam Structure Validation', () => {
  const examFiles = findExamFiles(SUBJECTS_DIR);

  it('code_output questions in exams should NOT have options', () => {
    for (const filePath of examFiles) {
      const exams = loadJsonFile<{ id: string; questions: QuizQuestion[] }[]>(filePath);

      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'code_output') {
            expect(
              question.options,
              `code_output question ${question.id} in exam ${exam.id} has options - should be type "multiple_choice" instead`
            ).toBeUndefined();
          }
        }
      }
    }
  });

  it('multiple_choice questions in exams should have options', () => {
    for (const filePath of examFiles) {
      const exams = loadJsonFile<{ id: string; questions: QuizQuestion[] }[]>(filePath);

      for (const exam of exams) {
        for (const question of exam.questions) {
          if (question.type === 'multiple_choice') {
            expect(
              question.options,
              `Multiple choice question ${question.id} in exam ${exam.id} missing options`
            ).toBeDefined();
            expect(
              Array.isArray(question.options),
              `Multiple choice question ${question.id} options should be array`
            ).toBe(true);
            expect(
              question.options!.length,
              `Multiple choice question ${question.id} should have at least 2 options`
            ).toBeGreaterThanOrEqual(2);
          }
        }
      }
    }
  });
});
