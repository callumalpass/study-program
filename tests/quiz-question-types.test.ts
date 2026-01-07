/**
 * Quiz Question Type Validation Tests
 *
 * These tests validate that quiz questions are using the appropriate question types
 * and have all required fields for their type. This helps catch issues like:
 * - code_output questions that should be fill_blank (math calculation questions)
 * - Questions missing required fields for their type
 * - Mismatched question type and answer format
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
 * Get all questions from all quiz files
 */
function getAllQuestions(): Array<{
  filePath: string;
  quizId: string;
  question: QuizQuestion;
}> {
  const allQuizFiles = findQuizFiles(SUBJECTS_DIR);
  const questions: Array<{
    filePath: string;
    quizId: string;
    question: QuizQuestion;
  }> = [];

  for (const filePath of allQuizFiles) {
    const quizzes = loadJsonFile<Quiz[]>(filePath);

    for (const quiz of quizzes) {
      for (const question of quiz.questions) {
        questions.push({
          filePath: filePath.replace(SUBJECTS_DIR, ''),
          quizId: quiz.id,
          question,
        });
      }
    }
  }

  return questions;
}

describe('Quiz Question Type Validation', () => {
  const allQuestions = getAllQuestions();

  it('should have quiz questions to validate', () => {
    expect(allQuestions.length).toBeGreaterThan(0);
    console.log(`Validating ${allQuestions.length} quiz questions`);
  });

  describe('multiple_choice questions', () => {
    const mcQuestions = allQuestions.filter(q => q.question.type === 'multiple_choice');

    it('should have options array', () => {
      const missingOptions = mcQuestions.filter(q => !q.question.options || q.question.options.length === 0);

      expect(
        missingOptions,
        `Found ${missingOptions.length} multiple_choice questions without options: ${missingOptions.map(q => `${q.quizId}/${q.question.id}`).join(', ')}`
      ).toHaveLength(0);
    });

    it('should have correctAnswer as valid index or matching option', () => {
      const invalidAnswers = mcQuestions.filter(q => {
        const answer = q.question.correctAnswer;
        const options = q.question.options || [];

        // Valid if numeric index in range
        if (typeof answer === 'number' && answer >= 0 && answer < options.length) {
          return false;
        }

        // Valid if string matching one of the options
        if (typeof answer === 'string' && options.includes(answer)) {
          return false;
        }

        return true;
      });

      expect(
        invalidAnswers,
        `Found ${invalidAnswers.length} multiple_choice questions with invalid correctAnswer: ${invalidAnswers.slice(0, 5).map(q => `${q.quizId}/${q.question.id}`).join(', ')}`
      ).toHaveLength(0);
    });

    it('should have 2-6 options per question', () => {
      const badOptionCounts = mcQuestions.filter(q => {
        const optionCount = q.question.options?.length || 0;
        return optionCount < 2 || optionCount > 6;
      });

      expect(
        badOptionCounts,
        `Found ${badOptionCounts.length} multiple_choice questions with unusual option counts`
      ).toHaveLength(0);
    });
  });

  describe('true_false questions', () => {
    const tfQuestions = allQuestions.filter(q => q.question.type === 'true_false');

    it('should have boolean correctAnswer', () => {
      const nonBoolean = tfQuestions.filter(q => typeof q.question.correctAnswer !== 'boolean');

      expect(
        nonBoolean,
        `Found ${nonBoolean.length} true_false questions without boolean answers: ${nonBoolean.map(q => `${q.quizId}/${q.question.id}`).join(', ')}`
      ).toHaveLength(0);
    });
  });

  describe('fill_blank questions', () => {
    const fbQuestions = allQuestions.filter(q => q.question.type === 'fill_blank');

    it('should have string correctAnswer', () => {
      const nonString = fbQuestions.filter(q =>
        typeof q.question.correctAnswer !== 'string' &&
        typeof q.question.correctAnswer !== 'number'
      );

      expect(
        nonString,
        `Found ${nonString.length} fill_blank questions without string/number answers`
      ).toHaveLength(0);
    });

    it('should have blank indicator in prompt', () => {
      // fill_blank questions typically have ____ or similar in the prompt
      const noBlank = fbQuestions.filter(q => {
        const prompt = q.question.prompt.toLowerCase();
        return !prompt.includes('____') &&
               !prompt.includes('answer:') &&
               !prompt.includes('blank');
      });

      // This is a soft check - some prompts may be phrased as questions
      if (noBlank.length > 0) {
        console.log(`Note: ${noBlank.length} fill_blank questions may not have explicit blank indicators`);
      }
    });
  });

  describe('code_output questions', () => {
    const coQuestions = allQuestions.filter(q => q.question.type === 'code_output');

    it('should have codeSnippet field', () => {
      const missingSnippet = coQuestions.filter(q => !q.question.codeSnippet);

      // code_output questions should have code to analyze
      expect(
        missingSnippet,
        `Found ${missingSnippet.length} code_output questions without codeSnippet: ${missingSnippet.map(q => `${q.quizId}/${q.question.id}`).slice(0, 10).join(', ')}`
      ).toHaveLength(0);
    });

    it('should have string correctAnswer', () => {
      const nonString = coQuestions.filter(q =>
        typeof q.question.correctAnswer !== 'string'
      );

      expect(
        nonString,
        `Found ${nonString.length} code_output questions without string answers`
      ).toHaveLength(0);
    });

    it('should not ask for math calculations without code', () => {
      // These questions should be fill_blank, not code_output
      const mathWithoutCode = coQuestions.filter(q => {
        const prompt = q.question.prompt.toLowerCase();
        const hasCode = !!q.question.codeSnippet;
        const isMathCalculation = (
          prompt.includes('what is') ||
          prompt.includes('calculate') ||
          prompt.includes('compute') ||
          prompt.includes('evaluate')
        ) && (
          prompt.includes('mod') ||
          prompt.includes('factorial') ||
          prompt.includes('permutation') ||
          prompt.includes('combination') ||
          prompt.includes('fibonacci') ||
          prompt.match(/\d+\s*[\+\-\*\/\^]\s*\d+/)
        );

        return !hasCode && isMathCalculation;
      });

      expect(
        mathWithoutCode,
        `Found ${mathWithoutCode.length} code_output questions that appear to be math calculations without code (should be fill_blank): ${mathWithoutCode.map(q => `${q.quizId}/${q.question.id}`).join(', ')}`
      ).toHaveLength(0);
    });
  });

  describe('coding questions', () => {
    const codingQuestions = allQuestions.filter(q => q.question.type === 'coding');

    it('should have starterCode', () => {
      const missingStarter = codingQuestions.filter(q => !q.question.starterCode);

      expect(
        missingStarter,
        `Found ${missingStarter.length} coding questions without starterCode`
      ).toHaveLength(0);
    });

    it('should have testCases array', () => {
      const missingTests = codingQuestions.filter(q =>
        !q.question.testCases || q.question.testCases.length === 0
      );

      expect(
        missingTests,
        `Found ${missingTests.length} coding questions without testCases`
      ).toHaveLength(0);
    });

    it('should have solution', () => {
      const missingSolution = codingQuestions.filter(q => !q.question.solution);

      expect(
        missingSolution,
        `Found ${missingSolution.length} coding questions without solution`
      ).toHaveLength(0);
    });
  });

  describe('written questions', () => {
    const writtenQuestions = allQuestions.filter(q => q.question.type === 'written');

    it('should have modelAnswer', () => {
      const missingModel = writtenQuestions.filter(q => !q.question.modelAnswer);

      expect(
        missingModel,
        `Found ${missingModel.length} written questions without modelAnswer`
      ).toHaveLength(0);
    });
  });

  describe('all questions', () => {
    it('should have required base fields', () => {
      const missingFields = allQuestions.filter(q => {
        const { question } = q;
        return !question.id || !question.type || !question.prompt;
      });

      expect(
        missingFields,
        `Found ${missingFields.length} questions missing base fields`
      ).toHaveLength(0);
    });

    it('should have valid question types', () => {
      const validTypes = ['multiple_choice', 'true_false', 'fill_blank', 'code_output', 'coding', 'written'];
      const invalidTypes = allQuestions.filter(q => !validTypes.includes(q.question.type));

      expect(
        invalidTypes,
        `Found ${invalidTypes.length} questions with invalid types: ${invalidTypes.map(q => `${q.quizId}/${q.question.id}: ${q.question.type}`).join(', ')}`
      ).toHaveLength(0);
    });

    it('should have explanations', () => {
      const missingExplanation = allQuestions.filter(q => !q.question.explanation);

      // Most questions should have explanations
      const threshold = allQuestions.length * 0.95; // Allow 5% without explanations
      expect(
        allQuestions.length - missingExplanation.length,
        `Only ${allQuestions.length - missingExplanation.length}/${allQuestions.length} questions have explanations`
      ).toBeGreaterThanOrEqual(threshold);
    });
  });

  describe('question type distribution', () => {
    it('reports question type counts', () => {
      const typeCounts: Record<string, number> = {};

      for (const q of allQuestions) {
        typeCounts[q.question.type] = (typeCounts[q.question.type] || 0) + 1;
      }

      console.log('\nQuestion type distribution:');
      for (const [type, count] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${type}: ${count} (${((count / allQuestions.length) * 100).toFixed(1)}%)`);
      }
    });
  });
});
