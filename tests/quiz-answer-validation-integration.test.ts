/**
 * Quiz Answer Validation Integration Tests
 *
 * These tests verify that the quiz utility functions work correctly with
 * actual quiz content from the curriculum. This bridges the gap between
 * unit tests for quiz-utils and content validation tests.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import {
  normalizeAnswer,
  getCorrectOptionIndex,
  checkAnswer,
  calculateScore,
} from '../src/utils/quiz-utils';
import type { Quiz, QuizQuestion, QuizAnswer } from '../src/core/types';

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
 * Get all quizzes from all subjects
 */
function getAllQuizzes(): Array<{ quiz: Quiz; file: string }> {
  const quizFiles = findQuizFiles(SUBJECTS_DIR);
  const allQuizzes: Array<{ quiz: Quiz; file: string }> = [];

  for (const file of quizFiles) {
    const quizzes = loadJsonFile<Quiz[]>(file);
    for (const quiz of quizzes) {
      allQuizzes.push({ quiz, file: file.replace(SUBJECTS_DIR, '') });
    }
  }

  return allQuizzes;
}

describe('Quiz Answer Validation Integration', () => {
  const allQuizzes = getAllQuizzes();

  it('should find quizzes to test', () => {
    expect(allQuizzes.length).toBeGreaterThan(100);
  });

  describe('getCorrectOptionIndex works with all multiple_choice questions', () => {
    const multipleChoiceQuestions: Array<{
      quiz: string;
      question: QuizQuestion;
      file: string;
    }> = [];

    for (const { quiz, file } of allQuizzes) {
      for (const question of quiz.questions) {
        if (question.type === 'multiple_choice') {
          multipleChoiceQuestions.push({ quiz: quiz.id, question, file });
        }
      }
    }

    it('should find multiple_choice questions', () => {
      expect(multipleChoiceQuestions.length).toBeGreaterThan(100);
    });

    it('all multiple_choice questions should have valid correctAnswer indices', () => {
      const invalidQuestions: string[] = [];

      for (const { quiz, question, file } of multipleChoiceQuestions) {
        const index = getCorrectOptionIndex(question);
        const numOptions = question.options?.length ?? 0;

        if (index < 0 || index >= numOptions) {
          invalidQuestions.push(
            `${file} ${quiz}/${question.id}: index ${index} out of bounds (${numOptions} options)`
          );
        }
      }

      expect(
        invalidQuestions,
        `Found ${invalidQuestions.length} questions with invalid correctAnswer:\n${invalidQuestions.slice(0, 5).join('\n')}`
      ).toHaveLength(0);
    });

    it('checkAnswer should return true for correct option index', () => {
      // Sample a few questions to verify checkAnswer works correctly
      const sampleQuestions = multipleChoiceQuestions.slice(0, 50);
      const failures: string[] = [];

      for (const { quiz, question } of sampleQuestions) {
        const correctIndex = getCorrectOptionIndex(question);
        if (correctIndex >= 0 && !checkAnswer(question, correctIndex)) {
          failures.push(`${quiz}/${question.id}: checkAnswer returned false for correct answer`);
        }
      }

      expect(failures, failures.join('\n')).toHaveLength(0);
    });

    it('checkAnswer should return false for wrong option index', () => {
      const sampleQuestions = multipleChoiceQuestions.slice(0, 50);
      const failures: string[] = [];

      for (const { quiz, question } of sampleQuestions) {
        const correctIndex = getCorrectOptionIndex(question);
        const wrongIndex = (correctIndex + 1) % (question.options?.length ?? 4);

        if (wrongIndex !== correctIndex && checkAnswer(question, wrongIndex)) {
          failures.push(
            `${quiz}/${question.id}: checkAnswer returned true for wrong answer (correct: ${correctIndex}, tried: ${wrongIndex})`
          );
        }
      }

      expect(failures, failures.join('\n')).toHaveLength(0);
    });
  });

  describe('true_false questions validation', () => {
    const trueFalseQuestions: Array<{
      quiz: string;
      question: QuizQuestion;
    }> = [];

    for (const { quiz } of allQuizzes) {
      for (const question of quiz.questions) {
        if (question.type === 'true_false') {
          trueFalseQuestions.push({ quiz: quiz.id, question });
        }
      }
    }

    it('should find true_false questions', () => {
      expect(trueFalseQuestions.length).toBeGreaterThan(50);
    });

    it('all true_false questions should have boolean correctAnswer', () => {
      const invalidQuestions: string[] = [];

      for (const { quiz, question } of trueFalseQuestions) {
        if (typeof question.correctAnswer !== 'boolean') {
          invalidQuestions.push(
            `${quiz}/${question.id}: correctAnswer is ${typeof question.correctAnswer}, not boolean`
          );
        }
      }

      expect(invalidQuestions, invalidQuestions.join('\n')).toHaveLength(0);
    });

    it('checkAnswer validates true_false questions correctly', () => {
      const sampleQuestions = trueFalseQuestions.slice(0, 30);
      const failures: string[] = [];

      for (const { quiz, question } of sampleQuestions) {
        const correctAnswer = question.correctAnswer as boolean;

        // Correct answer should pass
        if (!checkAnswer(question, correctAnswer)) {
          failures.push(`${quiz}/${question.id}: correct answer ${correctAnswer} failed`);
        }

        // Wrong answer should fail
        if (checkAnswer(question, !correctAnswer)) {
          failures.push(`${quiz}/${question.id}: wrong answer ${!correctAnswer} passed`);
        }
      }

      expect(failures, failures.join('\n')).toHaveLength(0);
    });

    it('true_false questions reject string "true"/"false"', () => {
      const sampleQuestions = trueFalseQuestions.slice(0, 20);

      for (const { question } of sampleQuestions) {
        // String "true" should not be accepted
        expect(checkAnswer(question, 'true')).toBe(false);
        expect(checkAnswer(question, 'false')).toBe(false);
        expect(checkAnswer(question, 'True')).toBe(false);
        expect(checkAnswer(question, 'False')).toBe(false);
      }
    });
  });

  describe('fill_blank questions validation', () => {
    const fillBlankQuestions: Array<{
      quiz: string;
      question: QuizQuestion;
    }> = [];

    for (const { quiz } of allQuizzes) {
      for (const question of quiz.questions) {
        if (question.type === 'fill_blank') {
          fillBlankQuestions.push({ quiz: quiz.id, question });
        }
      }
    }

    it('should find fill_blank questions', () => {
      expect(fillBlankQuestions.length).toBeGreaterThan(20);
    });

    it('fill_blank answers are case-insensitive', () => {
      const sampleQuestions = fillBlankQuestions.slice(0, 30);

      for (const { question } of sampleQuestions) {
        const answer = String(question.correctAnswer);
        if (answer.length === 0) continue;

        // Check that case variations are accepted
        expect(checkAnswer(question, answer.toUpperCase())).toBe(true);
        expect(checkAnswer(question, answer.toLowerCase())).toBe(true);
      }
    });

    it('fill_blank answers trim whitespace', () => {
      const sampleQuestions = fillBlankQuestions.slice(0, 30);

      for (const { question } of sampleQuestions) {
        const answer = String(question.correctAnswer);
        if (answer.length === 0) continue;

        // Check that whitespace-padded answers are accepted
        expect(checkAnswer(question, `  ${answer}  `)).toBe(true);
        expect(checkAnswer(question, `\t${answer}\n`)).toBe(true);
      }
    });
  });

  describe('code_output questions validation', () => {
    const codeOutputQuestions: Array<{
      quiz: string;
      question: QuizQuestion;
    }> = [];

    for (const { quiz } of allQuizzes) {
      for (const question of quiz.questions) {
        if (question.type === 'code_output') {
          codeOutputQuestions.push({ quiz: quiz.id, question });
        }
      }
    }

    it('should find code_output questions', () => {
      expect(codeOutputQuestions.length).toBeGreaterThan(50);
    });

    it('code_output answers should not be empty', () => {
      const emptyAnswers: string[] = [];

      for (const { quiz, question } of codeOutputQuestions) {
        const answer = String(question.correctAnswer).trim();
        if (answer.length === 0) {
          emptyAnswers.push(`${quiz}/${question.id}`);
        }
      }

      expect(emptyAnswers, `Empty code_output answers: ${emptyAnswers.join(', ')}`).toHaveLength(0);
    });

    it('code_output answers are case-insensitive', () => {
      const sampleQuestions = codeOutputQuestions.slice(0, 30);

      for (const { question } of sampleQuestions) {
        const answer = String(question.correctAnswer);
        if (answer.length === 0) continue;

        // Check that case variations are accepted
        expect(checkAnswer(question, answer.toUpperCase())).toBe(true);
        expect(checkAnswer(question, answer.toLowerCase())).toBe(true);
      }
    });
  });

  describe('calculateScore integration with real quizzes', () => {
    it('calculates 100% for perfect scores', () => {
      // Pick a few real quizzes and simulate perfect scores
      const sampleQuizzes = allQuizzes.slice(0, 10);

      for (const { quiz } of sampleQuizzes) {
        const answers: Record<string, QuizAnswer> = {};

        for (const question of quiz.questions) {
          switch (question.type) {
            case 'multiple_choice':
              answers[question.id] = getCorrectOptionIndex(question);
              break;
            case 'true_false':
              answers[question.id] = question.correctAnswer as boolean;
              break;
            case 'fill_blank':
            case 'code_output':
            case 'written':
              answers[question.id] = String(question.correctAnswer);
              break;
            case 'coding':
              answers[question.id] = { code: 'test', passed: true };
              break;
          }
        }

        const score = calculateScore(quiz.questions, answers);
        expect(
          score,
          `Quiz ${quiz.id} should have 100% score with all correct answers`
        ).toBe(100);
      }
    });

    it('calculates 0% for all wrong answers', () => {
      const sampleQuizzes = allQuizzes.slice(0, 10);

      for (const { quiz } of sampleQuizzes) {
        const answers: Record<string, QuizAnswer> = {};

        for (const question of quiz.questions) {
          switch (question.type) {
            case 'multiple_choice': {
              const correctIndex = getCorrectOptionIndex(question);
              const wrongIndex = (correctIndex + 1) % (question.options?.length ?? 4);
              answers[question.id] = wrongIndex;
              break;
            }
            case 'true_false':
              answers[question.id] = !(question.correctAnswer as boolean);
              break;
            case 'fill_blank':
            case 'code_output':
            case 'written':
              answers[question.id] = 'definitely_wrong_answer_xyz';
              break;
            case 'coding':
              answers[question.id] = { code: 'test', passed: false };
              break;
          }
        }

        const score = calculateScore(quiz.questions, answers);
        expect(score, `Quiz ${quiz.id} should have 0% score with all wrong answers`).toBe(0);
      }
    });

    it('calculates partial scores correctly', () => {
      // Pick a quiz with at least 4 questions
      const quizWith4Questions = allQuizzes.find(
        ({ quiz }) => quiz.questions.length >= 4
      );

      if (!quizWith4Questions) {
        return; // Skip if no suitable quiz found
      }

      const { quiz } = quizWith4Questions;
      const questions = quiz.questions.slice(0, 4);
      const answers: Record<string, QuizAnswer> = {};

      // Answer first 2 correctly, last 2 incorrectly
      for (let i = 0; i < 4; i++) {
        const question = questions[i];
        const shouldBeCorrect = i < 2;

        switch (question.type) {
          case 'multiple_choice': {
            const correctIndex = getCorrectOptionIndex(question);
            answers[question.id] = shouldBeCorrect
              ? correctIndex
              : (correctIndex + 1) % (question.options?.length ?? 4);
            break;
          }
          case 'true_false':
            answers[question.id] = shouldBeCorrect
              ? (question.correctAnswer as boolean)
              : !(question.correctAnswer as boolean);
            break;
          case 'fill_blank':
          case 'code_output':
          case 'written':
            answers[question.id] = shouldBeCorrect
              ? String(question.correctAnswer)
              : 'wrong_answer';
            break;
          case 'coding':
            answers[question.id] = { code: 'test', passed: shouldBeCorrect };
            break;
        }
      }

      const score = calculateScore(questions, answers);
      expect(score).toBe(50); // 2 out of 4 = 50%
    });
  });

  describe('normalizeAnswer consistency', () => {
    it('normalizes answers consistently across question types', () => {
      // Verify that normalizeAnswer produces the same output for equivalent inputs
      expect(normalizeAnswer('Hello')).toBe(normalizeAnswer('hello'));
      expect(normalizeAnswer('  42  ')).toBe(normalizeAnswer('42'));
      expect(normalizeAnswer(true)).toBe('true');
      expect(normalizeAnswer(false)).toBe('false');
      expect(normalizeAnswer(42)).toBe('42');
      expect(normalizeAnswer(3.14)).toBe('3.14');
    });

    it('preserves internal whitespace in multi-word answers', () => {
      // This is important for code output that might have spaces
      expect(normalizeAnswer('hello world')).toBe('hello world');
      expect(normalizeAnswer('Hello World')).toBe('hello world');
    });

    it('handles special numeric formats', () => {
      // Common in code output questions
      expect(normalizeAnswer('0.5')).toBe('0.5');
      expect(normalizeAnswer('-1')).toBe('-1');
      expect(normalizeAnswer('1e10')).toBe('1e10');
    });
  });

  describe('edge cases with real content', () => {
    it('handles questions with very long correct answers', () => {
      const longAnswerQuestions = allQuizzes
        .flatMap(({ quiz }) => quiz.questions)
        .filter(
          (q) =>
            (q.type === 'fill_blank' || q.type === 'code_output') &&
            String(q.correctAnswer).length > 50
        );

      for (const question of longAnswerQuestions.slice(0, 10)) {
        const answer = String(question.correctAnswer);
        expect(checkAnswer(question, answer)).toBe(true);
        expect(checkAnswer(question, answer.toUpperCase())).toBe(true);
      }
    });

    it('handles questions with numeric answers as strings', () => {
      const numericStringQuestions = allQuizzes
        .flatMap(({ quiz }) => quiz.questions)
        .filter(
          (q) =>
            (q.type === 'fill_blank' || q.type === 'code_output') &&
            /^-?\d+(\.\d+)?$/.test(String(q.correctAnswer).trim())
        );

      for (const question of numericStringQuestions.slice(0, 20)) {
        const answer = String(question.correctAnswer);
        // Both string and numeric answers should work
        expect(checkAnswer(question, answer)).toBe(true);
        expect(checkAnswer(question, ` ${answer} `)).toBe(true);
      }
    });

    it('handles questions with boolean-like string answers (True/False)', () => {
      const boolStringQuestions = allQuizzes
        .flatMap(({ quiz }) => quiz.questions)
        .filter(
          (q) =>
            q.type === 'code_output' &&
            ['true', 'false'].includes(String(q.correctAnswer).toLowerCase().trim())
        );

      for (const question of boolStringQuestions.slice(0, 10)) {
        const answer = String(question.correctAnswer);
        // Case variations should be accepted for code output
        expect(checkAnswer(question, 'True')).toBe(
          answer.toLowerCase() === 'true'
        );
        expect(checkAnswer(question, 'False')).toBe(
          answer.toLowerCase() === 'false'
        );
      }
    });
  });
});

describe('Quiz Score Distribution Analysis', () => {
  const allQuizzes = getAllQuizzes();

  it('quizzes have reasonable question counts', () => {
    const questionCounts: number[] = [];
    const outliers: string[] = [];

    for (const { quiz, file } of allQuizzes) {
      const count = quiz.questions.length;
      questionCounts.push(count);

      if (count < 3) {
        outliers.push(`${file} ${quiz.id}: only ${count} questions`);
      }
      if (count > 20) {
        outliers.push(`${file} ${quiz.id}: ${count} questions (very long)`);
      }
    }

    const avgCount = questionCounts.reduce((a, b) => a + b, 0) / questionCounts.length;
    expect(avgCount).toBeGreaterThan(3); // Average should be at least 3 questions
    expect(avgCount).toBeLessThan(15); // Average should be reasonable

    // Report outliers but don't fail
    if (outliers.length > 0) {
      console.log(`\nQuiz question count outliers:\n${outliers.slice(0, 10).join('\n')}`);
    }
  });

  it('question types are distributed across quizzes', () => {
    const typeCounts: Record<string, number> = {};

    for (const { quiz } of allQuizzes) {
      for (const question of quiz.questions) {
        typeCounts[question.type] = (typeCounts[question.type] || 0) + 1;
      }
    }

    // Should have a variety of question types
    expect(typeCounts['multiple_choice']).toBeGreaterThan(100);
    expect(typeCounts['true_false']).toBeGreaterThan(50);
    expect(typeCounts['code_output']).toBeGreaterThan(30);

    console.log('\nQuestion type distribution:', typeCounts);
  });
});
