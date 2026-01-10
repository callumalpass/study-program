/**
 * Fill Blank Answer Format Validation Tests
 *
 * These tests validate that fill_blank questions across all subjects have consistent
 * answer formats and that answers are properly normalizable.
 */

import { describe, expect, it } from 'vitest';
import { normalizeAnswer } from '../src/utils/quiz-utils';

// Import exam and quiz data
const examModules = import.meta.glob('../src/subjects/**/exams.json', { eager: true });
const quizModules = import.meta.glob('../src/subjects/**/quizzes.json', { eager: true });

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  correctAnswer: number | string | boolean;
  explanation?: string;
}

interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

interface Exam {
  id: string;
  subjectId: string;
  questions: QuizQuestion[];
}

// Get all fill_blank questions from exams
const allExamQuestions: { examId: string; question: QuizQuestion }[] = Object.values(examModules)
  .flatMap((module: unknown) => {
    const mod = module as { default?: Exam[] };
    return Array.isArray(mod.default) ? mod.default : [];
  })
  .flatMap(exam => exam.questions.map(q => ({ examId: exam.id, question: q })))
  .filter(({ question }) => question.type === 'fill_blank');

// Get all fill_blank questions from quizzes
const allQuizQuestions: { quizId: string; question: QuizQuestion }[] = Object.values(quizModules)
  .flatMap((module: unknown) => {
    const mod = module as { default?: Quiz[] };
    return Array.isArray(mod.default) ? mod.default : [];
  })
  .flatMap(quiz => quiz.questions.map(q => ({ quizId: quiz.id, question: q })))
  .filter(({ question }) => question.type === 'fill_blank');

describe('Fill Blank Answer Format Validation', () => {
  describe('Exam fill_blank answers', () => {
    it('should have string or number correctAnswer for all fill_blank questions', () => {
      for (const { examId, question } of allExamQuestions) {
        const answerType = typeof question.correctAnswer;
        expect(
          answerType === 'string' || answerType === 'number',
          `${examId}:${question.id} has invalid answer type: ${answerType}`
        ).toBe(true);
      }
    });

    it('should not have empty correctAnswer', () => {
      for (const { examId, question } of allExamQuestions) {
        const answer = String(question.correctAnswer).trim();
        expect(
          answer.length > 0,
          `${examId}:${question.id} has empty answer`
        ).toBe(true);
      }
    });

    it('should have answers that normalize consistently', () => {
      for (const { examId, question } of allExamQuestions) {
        const answer = question.correctAnswer;
        const normalized = normalizeAnswer(answer);
        expect(
          normalized.length > 0,
          `${examId}:${question.id} normalizes to empty string`
        ).toBe(true);
      }
    });

    it('should not have excessively long single-word answers', () => {
      const MAX_SINGLE_WORD_LENGTH = 50;
      for (const { examId, question } of allExamQuestions) {
        const answer = String(question.correctAnswer).trim();
        // Only check single-word answers
        if (!answer.includes(' ')) {
          expect(
            answer.length <= MAX_SINGLE_WORD_LENGTH,
            `${examId}:${question.id} has excessively long answer: "${answer}"`
          ).toBe(true);
        }
      }
    });

    it('should not have leading/trailing whitespace in answers', () => {
      for (const { examId, question } of allExamQuestions) {
        const answer = String(question.correctAnswer);
        expect(
          answer === answer.trim(),
          `${examId}:${question.id} has whitespace in answer: "${answer}"`
        ).toBe(true);
      }
    });
  });

  describe('Quiz fill_blank answers', () => {
    it('should have string or number correctAnswer for all fill_blank questions', () => {
      for (const { quizId, question } of allQuizQuestions) {
        const answerType = typeof question.correctAnswer;
        expect(
          answerType === 'string' || answerType === 'number',
          `${quizId}:${question.id} has invalid answer type: ${answerType}`
        ).toBe(true);
      }
    });

    it('should not have empty correctAnswer', () => {
      for (const { quizId, question } of allQuizQuestions) {
        const answer = String(question.correctAnswer).trim();
        expect(
          answer.length > 0,
          `${quizId}:${question.id} has empty answer`
        ).toBe(true);
      }
    });

    it('should have answers that normalize consistently', () => {
      for (const { quizId, question } of allQuizQuestions) {
        const answer = question.correctAnswer;
        const normalized = normalizeAnswer(answer);
        expect(
          normalized.length > 0,
          `${quizId}:${question.id} normalizes to empty string`
        ).toBe(true);
      }
    });

    it('should not have leading/trailing whitespace in answers', () => {
      for (const { quizId, question } of allQuizQuestions) {
        const answer = String(question.correctAnswer);
        expect(
          answer === answer.trim(),
          `${quizId}:${question.id} has whitespace in answer: "${answer}"`
        ).toBe(true);
      }
    });
  });

  describe('Answer normalization consistency', () => {
    it('fill_blank answers should match when comparing normalized versions', () => {
      // Test that common answer variations all normalize to the same value
      const testCases = [
        { answer: 'True', userInput: 'true', shouldMatch: true },
        { answer: 'False', userInput: 'FALSE', shouldMatch: true },
        { answer: 'O(n)', userInput: 'o(n)', shouldMatch: true },
        { answer: '42', userInput: '  42  ', shouldMatch: true },
        { answer: 'answer', userInput: 'Answer', shouldMatch: true },
        { answer: '__init__', userInput: '__init__', shouldMatch: true },
        { answer: 'pigeonhole', userInput: 'PIGEONHOLE', shouldMatch: true },
      ];

      for (const { answer, userInput, shouldMatch } of testCases) {
        const normalizedAnswer = normalizeAnswer(answer);
        const normalizedInput = normalizeAnswer(userInput);
        expect(
          normalizedAnswer === normalizedInput,
          `"${answer}" vs "${userInput}" should ${shouldMatch ? '' : 'not '}match`
        ).toBe(shouldMatch);
      }
    });

    it('numeric answers should normalize correctly', () => {
      const numericCases = [
        { answer: 42, expected: '42' },
        { answer: 0, expected: '0' },
        { answer: -5, expected: '-5' },
        { answer: 3.14, expected: '3.14' },
        { answer: '100', expected: '100' },
      ];

      for (const { answer, expected } of numericCases) {
        const normalized = normalizeAnswer(answer);
        expect(normalized).toBe(expected);
      }
    });
  });

  describe('Prompt and answer consistency', () => {
    it('most fill_blank prompts should contain blank indicator (informational)', () => {
      const blankIndicators = ['____', '___', '__', 'blank', 'fill in'];
      const promptsWithoutBlank: string[] = [];

      for (const { examId, question } of allExamQuestions) {
        const prompt = question.prompt.toLowerCase();
        const hasBlankIndicator = blankIndicators.some(indicator =>
          prompt.includes(indicator.toLowerCase())
        );
        if (!hasBlankIndicator) {
          promptsWithoutBlank.push(`${examId}:${question.id}`);
        }
      }

      // Log questions without blank indicators for review
      if (promptsWithoutBlank.length > 0) {
        console.log(`\nFill_blank questions without explicit blank indicator (${promptsWithoutBlank.length}):`);
        promptsWithoutBlank.slice(0, 5).forEach(q => console.log(`  - ${q}`));
        if (promptsWithoutBlank.length > 5) {
          console.log(`  ... and ${promptsWithoutBlank.length - 5} more`);
        }
      }

      // Allow up to 20% of questions to lack explicit blank indicators
      // (some questions phrase it as "What is X?" which is still clear)
      const threshold = Math.ceil(allExamQuestions.length * 0.20);
      expect(
        promptsWithoutBlank.length <= threshold,
        `Too many fill_blank questions lack blank indicators: ${promptsWithoutBlank.length} > ${threshold}`
      ).toBe(true);
    });
  });

  describe('Statistics', () => {
    it('should report fill_blank question counts', () => {
      console.log(`Total exam fill_blank questions: ${allExamQuestions.length}`);
      console.log(`Total quiz fill_blank questions: ${allQuizQuestions.length}`);

      // Group by subject
      const examsBySubject = new Map<string, number>();
      for (const { examId } of allExamQuestions) {
        const subject = examId.split('-')[0];
        examsBySubject.set(subject, (examsBySubject.get(subject) || 0) + 1);
      }

      console.log('\nFill_blank questions by subject (exams):');
      for (const [subject, count] of [...examsBySubject.entries()].sort()) {
        console.log(`  ${subject}: ${count}`);
      }

      // Ensure we have fill_blank questions
      expect(allExamQuestions.length).toBeGreaterThan(0);
      expect(allQuizQuestions.length).toBeGreaterThan(0);
    });
  });
});

describe('Fill Blank Answer Edge Cases', () => {
  it('should handle special characters in answers', () => {
    // These are common programming-related answers that contain special chars
    const specialCharAnswers = ['__init__', '__str__', 'O(n)', 'O(log n)', 'O(n^2)'];

    for (const answer of specialCharAnswers) {
      const normalized = normalizeAnswer(answer);
      expect(normalized.length).toBeGreaterThan(0);
      // Verify it lowercases but preserves special chars
      expect(normalized).toBe(answer.toLowerCase());
    }
  });

  it('should handle Greek letters and mathematical notation', () => {
    // Common math notation that might appear in answers
    const mathAnswers = ['theta', 'lambda', 'sigma', 'epsilon'];

    for (const answer of mathAnswers) {
      const normalized = normalizeAnswer(answer);
      expect(normalized).toBe(answer.toLowerCase());
    }
  });

  it('should handle hyphenated answers', () => {
    const hyphenatedAnswers = ['case-sensitive', 'on-the-fly', 'divide-and-conquer'];

    for (const answer of hyphenatedAnswers) {
      const normalized = normalizeAnswer(answer);
      expect(normalized).toBe(answer.toLowerCase());
    }
  });
});

describe('Fill Blank Answer Format - Common CS/Math Patterns', () => {
  describe('Mathematical notation formats', () => {
    it('handles comparison operators', () => {
      const operators = ['<=', '>=', '!=', '==', '<', '>'];
      for (const op of operators) {
        const normalized = normalizeAnswer(op);
        expect(normalized).toBe(op);
      }
    });

    it('handles fraction formats', () => {
      expect(normalizeAnswer('1/2')).toBe('1/2');
      expect(normalizeAnswer('n/2')).toBe('n/2');
      expect(normalizeAnswer('log(n)/n')).toBe('log(n)/n');
    });

    it('handles exponent notation', () => {
      expect(normalizeAnswer('n^2')).toBe('n^2');
      expect(normalizeAnswer('2^n')).toBe('2^n');
      expect(normalizeAnswer('n^k')).toBe('n^k');
    });

    it('handles LaTeX-style notation', () => {
      // Common patterns from math exams
      expect(normalizeAnswer('(A^{-1})^T')).toBe('(a^{-1})^t');
      expect(normalizeAnswer('{0}')).toBe('{0}');
      expect(normalizeAnswer('v_h')).toBe('v_h');
    });

    it('handles subscript formats', () => {
      expect(normalizeAnswer('x_1')).toBe('x_1');
      expect(normalizeAnswer('a_n')).toBe('a_n');
      expect(normalizeAnswer('p_i')).toBe('p_i');
    });
  });

  describe('Programming terminology formats', () => {
    it('handles Python dunder methods', () => {
      const dunders = ['__init__', '__str__', '__repr__', '__eq__', '__len__'];
      for (const dunder of dunders) {
        const normalized = normalizeAnswer(dunder);
        expect(normalized).toBe(dunder.toLowerCase());
      }
    });

    it('handles language keywords case-insensitively', () => {
      const keywords = [
        { correct: 'break', input: 'BREAK' },
        { correct: 'continue', input: 'Continue' },
        { correct: 'return', input: 'RETURN' },
        { correct: 'None', input: 'none' },
        { correct: 'True', input: 'true' },
        { correct: 'False', input: 'false' },
      ];
      for (const { correct, input } of keywords) {
        expect(normalizeAnswer(correct)).toBe(normalizeAnswer(input));
      }
    });

    it('handles common abbreviations', () => {
      const abbrevs = ['CPU', 'RAM', 'ROM', 'HTML', 'CSS', 'SQL', 'API', 'GUI'];
      for (const abbrev of abbrevs) {
        expect(normalizeAnswer(abbrev)).toBe(abbrev.toLowerCase());
        expect(normalizeAnswer(abbrev.toLowerCase())).toBe(abbrev.toLowerCase());
      }
    });
  });

  describe('Numeric answer formats', () => {
    it('handles integer strings', () => {
      expect(normalizeAnswer('0')).toBe('0');
      expect(normalizeAnswer('42')).toBe('42');
      expect(normalizeAnswer('-1')).toBe('-1');
      expect(normalizeAnswer('255')).toBe('255');
    });

    it('handles floating point strings', () => {
      expect(normalizeAnswer('3.14')).toBe('3.14');
      expect(normalizeAnswer('0.5')).toBe('0.5');
      expect(normalizeAnswer('-2.5')).toBe('-2.5');
    });

    it('handles numeric JavaScript values', () => {
      expect(normalizeAnswer(0)).toBe('0');
      expect(normalizeAnswer(42)).toBe('42');
      expect(normalizeAnswer(-5)).toBe('-5');
      expect(normalizeAnswer(3.14)).toBe('3.14');
    });

    it('handles binary format', () => {
      expect(normalizeAnswer('0b1010')).toBe('0b1010');
      expect(normalizeAnswer('0B1010')).toBe('0b1010');
    });

    it('handles hexadecimal format', () => {
      expect(normalizeAnswer('0xFF')).toBe('0xff');
      expect(normalizeAnswer('0XFF')).toBe('0xff');
      expect(normalizeAnswer('0x10')).toBe('0x10');
    });
  });

  describe('Mathematical term formats', () => {
    it('handles single-word math terms case-insensitively', () => {
      const terms = [
        'zero',
        'symmetric',
        'basis',
        'characteristic',
        'determinant',
        'eigenvalue',
        'eigenvector',
        'invertible',
        'singular',
        'transpose',
      ];
      for (const term of terms) {
        expect(normalizeAnswer(term.toUpperCase())).toBe(term.toLowerCase());
      }
    });

    it('handles compound math terms', () => {
      expect(normalizeAnswer('log n')).toBe('log n');
      expect(normalizeAnswer('LOG N')).toBe('log n');
      expect(normalizeAnswer('binary search')).toBe('binary search');
    });

    it('handles proof terminology', () => {
      const proofTerms = ['contradiction', 'induction', 'contrapositive', 'counterexample', 'tautology'];
      for (const term of proofTerms) {
        expect(normalizeAnswer(term.toUpperCase())).toBe(term.toLowerCase());
      }
    });
  });

  describe('Edge case formats', () => {
    it('handles single characters', () => {
      expect(normalizeAnswer('n')).toBe('n');
      expect(normalizeAnswer('N')).toBe('n');
      expect(normalizeAnswer('f')).toBe('f');
      expect(normalizeAnswer('0')).toBe('0');
      expect(normalizeAnswer('1')).toBe('1');
    });

    it('handles empty and whitespace', () => {
      expect(normalizeAnswer('')).toBe('');
      expect(normalizeAnswer('   ')).toBe('');
      expect(normalizeAnswer('\t\n')).toBe('');
    });

    it('handles set notation', () => {
      expect(normalizeAnswer('{0}')).toBe('{0}');
      expect(normalizeAnswer('{a, b}')).toBe('{a, b}');
      expect(normalizeAnswer('∅')).toBe('∅');
    });

    it('preserves internal whitespace but trims edges', () => {
      expect(normalizeAnswer('  log n  ')).toBe('log n');
      expect(normalizeAnswer('\tbinary search\n')).toBe('binary search');
    });

    it('handles boolean JavaScript values', () => {
      expect(normalizeAnswer(true)).toBe('true');
      expect(normalizeAnswer(false)).toBe('false');
    });

    it('handles null and undefined', () => {
      expect(normalizeAnswer(null)).toBe('');
      expect(normalizeAnswer(undefined)).toBe('');
    });
  });
});

describe('Fill Blank - Answers from actual course material', () => {
  // These tests verify specific answer formats found in the course content
  // to ensure they normalize correctly

  describe('Math201 Linear Algebra answers', () => {
    it('handles "zero" for row echelon form question', () => {
      // math201-mid-q2: "all ____ rows are at the bottom"
      expect(normalizeAnswer('zero')).toBe('zero');
      expect(normalizeAnswer('ZERO')).toBe('zero');
    });

    it('handles "symmetric" for matrix transpose question', () => {
      // math201-mid-q10: "If A^T = A, then matrix A is called ____"
      expect(normalizeAnswer('symmetric')).toBe('symmetric');
      expect(normalizeAnswer('Symmetric')).toBe('symmetric');
    });

    it('handles "basis" for vector space question', () => {
      // math201-mid-q21: "A ____ for a vector space V"
      expect(normalizeAnswer('basis')).toBe('basis');
      expect(normalizeAnswer('BASIS')).toBe('basis');
    });

    it('handles "n" for rank-nullity theorem', () => {
      // math201-mid-q24: "rank(A) + nullity(A) = ____"
      expect(normalizeAnswer('n')).toBe('n');
      expect(normalizeAnswer('N')).toBe('n');
    });

    it('handles "{0}" for null space answer', () => {
      // math201-final-q20: "Nul(A) = ____"
      expect(normalizeAnswer('{0}')).toBe('{0}');
    });

    it('handles "-1" for determinant row swap', () => {
      // math201-final-q26: "determinant is multiplied by ____"
      expect(normalizeAnswer('-1')).toBe('-1');
    });

    it('handles "characteristic" for eigenvalue polynomial', () => {
      // math201-final-q32: "roots of the ____ polynomial"
      expect(normalizeAnswer('characteristic')).toBe('characteristic');
      expect(normalizeAnswer('CHARACTERISTIC')).toBe('characteristic');
    });

    it('handles "0" for kernel definition', () => {
      // math201-final-q38: "T(x) = ____"
      expect(normalizeAnswer('0')).toBe('0');
    });
  });

  describe('Math101 Discrete Math answers', () => {
    it('handles "contradiction" for proof type', () => {
      expect(normalizeAnswer('contradiction')).toBe('contradiction');
    });

    it('handles "induction" for proof type', () => {
      expect(normalizeAnswer('induction')).toBe('induction');
    });

    it('handles "tautology" for logic term', () => {
      expect(normalizeAnswer('tautology')).toBe('tautology');
    });

    it('handles "counterexample" for disproof method', () => {
      expect(normalizeAnswer('counterexample')).toBe('counterexample');
    });
  });

  describe('CS102 Data Structures answers', () => {
    it('handles complexity answers', () => {
      expect(normalizeAnswer('O(n)')).toBe('o(n)');
      expect(normalizeAnswer('O(1)')).toBe('o(1)');
      expect(normalizeAnswer('O(log n)')).toBe('o(log n)');
      expect(normalizeAnswer('O(n^2)')).toBe('o(n^2)');
    });

    it('handles data structure names', () => {
      expect(normalizeAnswer('stack')).toBe('stack');
      expect(normalizeAnswer('queue')).toBe('queue');
      expect(normalizeAnswer('heap')).toBe('heap');
    });
  });
});
