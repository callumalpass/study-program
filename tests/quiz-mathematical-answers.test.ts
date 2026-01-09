/**
 * Quiz Mathematical Answers Tests
 *
 * Comprehensive tests for quiz answer validation with mathematical
 * expressions, formulas, and edge cases commonly found in CS and math courses.
 */

import { describe, it, expect } from 'vitest';
import { checkAnswer, normalizeAnswer, getCorrectOptionIndex } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

describe('quiz mathematical answers', () => {
  describe('normalizeAnswer with mathematical expressions', () => {
    it('normalizes answers with spaces around operators', () => {
      expect(normalizeAnswer('n log n')).toBe('n log n');
      expect(normalizeAnswer('n  log  n')).toBe('n  log  n');
      expect(normalizeAnswer('n log n ')).toBe('n log n');
      expect(normalizeAnswer(' n log n')).toBe('n log n');
    });

    it('normalizes answers with mathematical symbols', () => {
      expect(normalizeAnswer('O(n)')).toBe('o(n)');
      expect(normalizeAnswer('O(n^2)')).toBe('o(n^2)');
      expect(normalizeAnswer('O(log n)')).toBe('o(log n)');
      expect(normalizeAnswer('Θ(n)')).toBe('θ(n)');
      expect(normalizeAnswer('Ω(n)')).toBe('ω(n)');
    });

    it('normalizes numeric answers', () => {
      expect(normalizeAnswer(42)).toBe('42');
      expect(normalizeAnswer(3.14159)).toBe('3.14159');
      expect(normalizeAnswer(-1)).toBe('-1');
      expect(normalizeAnswer(0)).toBe('0');
    });

    it('normalizes boolean answers', () => {
      expect(normalizeAnswer(true)).toBe('true');
      expect(normalizeAnswer(false)).toBe('false');
    });

    it('handles null and undefined', () => {
      expect(normalizeAnswer(null)).toBe('');
      expect(normalizeAnswer(undefined)).toBe('');
    });

    it('handles fractions as strings', () => {
      expect(normalizeAnswer('1/2')).toBe('1/2');
      expect(normalizeAnswer('n-k')).toBe('n-k');
      expect(normalizeAnswer('(n-k)')).toBe('(n-k)');
    });
  });

  describe('checkAnswer with fill_blank mathematical questions', () => {
    it('matches exact mathematical expressions', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'Big O of merge sort?',
        correctAnswer: 'n log n',
        explanation: '',
      };

      expect(checkAnswer(question, 'n log n')).toBe(true);
      expect(checkAnswer(question, 'N LOG N')).toBe(true);
      expect(checkAnswer(question, ' n log n ')).toBe(true);
    });

    it('matches numeric expressions in fill_blank', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'What is 5 factorial?',
        correctAnswer: '120',
        explanation: '',
      };

      expect(checkAnswer(question, '120')).toBe(true);
      expect(checkAnswer(question, 120)).toBe(true);
      expect(checkAnswer(question, ' 120 ')).toBe(true);
    });

    it('handles negative numbers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'What is -5 + 4?',
        correctAnswer: '-1',
        explanation: '',
      };

      expect(checkAnswer(question, '-1')).toBe(true);
      expect(checkAnswer(question, -1)).toBe(true);
    });

    it('handles decimal answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'What is the expected value?',
        correctAnswer: '3.5',
        explanation: '',
      };

      expect(checkAnswer(question, '3.5')).toBe(true);
      expect(checkAnswer(question, 3.5)).toBe(true);
    });

    it('handles single letter mathematical answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'In strong induction, the hypothesis assumes P(1)...P(k)',
        correctAnswer: 'k',
        explanation: '',
      };

      expect(checkAnswer(question, 'k')).toBe(true);
      expect(checkAnswer(question, 'K')).toBe(true);
      expect(checkAnswer(question, ' k ')).toBe(true);
    });

    it('handles expressions with special characters', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'C(n,k) = n! / (k! * ?!)',
        correctAnswer: 'n-k',
        explanation: '',
      };

      expect(checkAnswer(question, 'n-k')).toBe(true);
      expect(checkAnswer(question, 'N-K')).toBe(true);
      expect(checkAnswer(question, 'n - k')).toBe(false); // Spaces matter
    });

    it('handles Greek letter names', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'The lower bound notation uses Big-?',
        correctAnswer: 'Omega',
        explanation: '',
      };

      expect(checkAnswer(question, 'omega')).toBe(true);
      expect(checkAnswer(question, 'OMEGA')).toBe(true);
      expect(checkAnswer(question, 'Omega')).toBe(true);
    });
  });

  describe('checkAnswer with code_output questions', () => {
    it('matches numeric output exactly', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'code_output',
        prompt: 'What does this print?',
        codeSnippet: 'print(2 + 2)',
        correctAnswer: '4',
        explanation: '',
      };

      expect(checkAnswer(question, '4')).toBe(true);
      expect(checkAnswer(question, 4)).toBe(true);
    });

    it('matches floating point output', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'code_output',
        prompt: 'What does this print?',
        codeSnippet: 'print(21/6)',
        correctAnswer: '3.5',
        explanation: '',
      };

      expect(checkAnswer(question, '3.5')).toBe(true);
      expect(checkAnswer(question, 3.5)).toBe(true);
    });

    it('matches multi-value output', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'code_output',
        prompt: 'What does this print?',
        codeSnippet: 'print(c1.count, c2.count)',
        correctAnswer: '2 1',
        explanation: '',
      };

      expect(checkAnswer(question, '2 1')).toBe(true);
      expect(checkAnswer(question, '2  1')).toBe(false); // Extra space
    });

    it('matches boolean output', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'code_output',
        prompt: 'What does this print?',
        codeSnippet: 'print(True)',
        correctAnswer: 'True',
        explanation: '',
      };

      expect(checkAnswer(question, 'True')).toBe(true);
      expect(checkAnswer(question, 'true')).toBe(true);
      expect(checkAnswer(question, 'TRUE')).toBe(true);
    });

    it('matches space-separated output', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'code_output',
        prompt: 'What is the BFS order?',
        codeSnippet: 'bfs(graph)',
        correctAnswer: 'A B C D',
        explanation: '',
      };

      expect(checkAnswer(question, 'A B C D')).toBe(true);
      expect(checkAnswer(question, 'a b c d')).toBe(true);
    });
  });

  describe('checkAnswer with multiple_choice math questions', () => {
    it('validates correct index selection', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the complexity?',
        options: ['O(1)', 'O(n)', 'O(n^2)', 'O(2^n)'],
        correctAnswer: 1,
        explanation: '',
      };

      expect(checkAnswer(question, 1)).toBe(true);
      expect(checkAnswer(question, 0)).toBe(false);
      expect(checkAnswer(question, 2)).toBe(false);
    });

    it('handles zero-indexed answers correctly', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'First option is correct',
        options: ['Correct', 'Wrong1', 'Wrong2'],
        correctAnswer: 0,
        explanation: '',
      };

      expect(checkAnswer(question, 0)).toBe(true);
      expect(checkAnswer(question, 1)).toBe(false);
    });

    it('handles last option being correct', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Last option correct',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
        explanation: '',
      };

      expect(checkAnswer(question, 3)).toBe(true);
      expect(checkAnswer(question, 0)).toBe(false);
    });
  });

  describe('checkAnswer with true_false questions', () => {
    it('validates true answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'true_false',
        prompt: 'A tree with n vertices has n-1 edges',
        correctAnswer: true,
        explanation: '',
      };

      expect(checkAnswer(question, true)).toBe(true);
      expect(checkAnswer(question, false)).toBe(false);
    });

    it('validates false answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'true_false',
        prompt: '1 is a prime number',
        correctAnswer: false,
        explanation: '',
      };

      expect(checkAnswer(question, false)).toBe(true);
      expect(checkAnswer(question, true)).toBe(false);
    });
  });

  describe('getCorrectOptionIndex edge cases', () => {
    it('returns -1 for out of bounds index', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Question',
        options: ['A', 'B'],
        correctAnswer: 5, // Out of bounds
        explanation: '',
      };

      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 for negative index', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Question',
        options: ['A', 'B'],
        correctAnswer: -1,
        explanation: '',
      };

      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns correct index for string answer matching option', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Question',
        options: ['Option A', 'Option B', 'Option C'],
        correctAnswer: 'Option B',
        explanation: '',
      };

      expect(getCorrectOptionIndex(question)).toBe(1);
    });

    it('returns -1 for string answer not matching any option', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Question',
        options: ['Option A', 'Option B'],
        correctAnswer: 'Option C',
        explanation: '',
      };

      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('handles question without options', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Question',
        correctAnswer: 0,
        explanation: '',
      };

      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('handles empty options array', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Question',
        options: [],
        correctAnswer: 0,
        explanation: '',
      };

      expect(getCorrectOptionIndex(question)).toBe(-1);
    });
  });

  describe('real-world mathematical answer scenarios', () => {
    it('handles combination formula answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'C(n,k) uses (n-k)! in the denominator, written as ?',
        correctAnswer: 'n-k',
        explanation: '',
      };

      expect(checkAnswer(question, 'n-k')).toBe(true);
    });

    it('handles Master Theorem answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'T(n) = 2T(n/2) + O(n) gives T(n) = O(?)',
        correctAnswer: 'n log n',
        explanation: '',
      };

      expect(checkAnswer(question, 'n log n')).toBe(true);
      expect(checkAnswer(question, 'N LOG N')).toBe(true);
    });

    it('handles gcd calculation answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'What is gcd(48, 18)?',
        correctAnswer: '6',
        explanation: '',
      };

      expect(checkAnswer(question, '6')).toBe(true);
      expect(checkAnswer(question, 6)).toBe(true);
    });

    it('handles modular arithmetic answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: '17 mod 5 = ?',
        correctAnswer: '2',
        explanation: '',
      };

      expect(checkAnswer(question, '2')).toBe(true);
      expect(checkAnswer(question, 2)).toBe(true);
    });

    it('handles probability fraction answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'P(rolling 7 with two dice) = ?',
        correctAnswer: '1/6',
        explanation: '',
      };

      expect(checkAnswer(question, '1/6')).toBe(true);
    });

    it('handles Fibonacci sequence answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'F(1) = ?',
        correctAnswer: '1',
        explanation: '',
      };

      expect(checkAnswer(question, '1')).toBe(true);
      expect(checkAnswer(question, 1)).toBe(true);
    });

    it('handles constructor method name answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'Python constructor method is?',
        correctAnswer: '__init__',
        explanation: '',
      };

      expect(checkAnswer(question, '__init__')).toBe(true);
      expect(checkAnswer(question, '__INIT__')).toBe(true);
    });

    it('handles technical term answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'A graph with no odd cycles is?',
        correctAnswer: 'bipartite',
        explanation: '',
      };

      expect(checkAnswer(question, 'bipartite')).toBe(true);
      expect(checkAnswer(question, 'BIPARTITE')).toBe(true);
      expect(checkAnswer(question, 'Bipartite')).toBe(true);
    });

    it('handles theorem name answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: '? Lemma states sum of degrees = 2|E|',
        correctAnswer: 'handshaking',
        explanation: '',
      };

      expect(checkAnswer(question, 'handshaking')).toBe(true);
      expect(checkAnswer(question, 'Handshaking')).toBe(true);
    });

    it('handles algorithm name answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: '? Theorem is used for divide-and-conquer recurrences',
        correctAnswer: 'master',
        explanation: '',
      };

      expect(checkAnswer(question, 'master')).toBe(true);
      expect(checkAnswer(question, 'Master')).toBe(true);
    });
  });

  describe('edge cases for undefined/null answers', () => {
    it('returns false for undefined answer', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'Question',
        correctAnswer: 'answer',
        explanation: '',
      };

      expect(checkAnswer(question, undefined)).toBe(false);
    });

    it('returns false for empty string when answer expected', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'Question',
        correctAnswer: 'answer',
        explanation: '',
      };

      expect(checkAnswer(question, '')).toBe(false);
    });

    it('handles whitespace-only answers', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'Question',
        correctAnswer: 'answer',
        explanation: '',
      };

      expect(checkAnswer(question, '   ')).toBe(false);
    });
  });
});
