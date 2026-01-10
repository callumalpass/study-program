/**
 * CS201 Exam Validation Tests
 *
 * Validates the correctness of algorithm-related exam questions,
 * particularly those involving complexity analysis and binary search.
 */

import { describe, expect, it } from 'vitest';
import exams from '../src/subjects/cs201/exams.json';

interface ExamQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation?: string;
  codeSnippet?: string;
}

interface Exam {
  id: string;
  subjectId: string;
  title: string;
  questions: ExamQuestion[];
}

const allExams = exams as Exam[];

describe('CS201 Exam Content Validation', () => {
  describe('Binary Search Complexity', () => {
    it('should have the correct answer for binary search comparisons on 1024 elements', () => {
      // Find the binary search comparison question
      const midterm = allExams.find(e => e.id === 'cs201-exam-midterm');
      expect(midterm).toBeDefined();

      const binarySearchQuestion = midterm!.questions.find(
        q => q.id === 'mid-q11' && q.prompt.includes('Binary Search') && q.prompt.includes('1024')
      );

      expect(binarySearchQuestion).toBeDefined();
      expect(binarySearchQuestion!.type).toBe('multiple_choice');

      // Binary search on 1024 elements needs at most floor(log2(n)) + 1 = 10 + 1 = 11 comparisons
      // The standard implementation makes one comparison per iteration until low > high.
      // For n=1024, worst case follows: 1024 -> 512 -> 256 -> 128 -> 64 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1
      // That's 11 comparisons total.
      const options = binarySearchQuestion!.options!;
      const correctIndex = binarySearchQuestion!.correctAnswer as number;
      const correctValue = options[correctIndex];

      expect(correctValue).toBe('11');
    });

    it('binary search formula should be floor(log2(n)) + 1 for standard implementation', () => {
      // Mathematical validation:
      // Standard binary search worst case = floor(log2(n)) + 1
      // This counts the number of comparisons in the while(low <= high) loop
      // For n = 1024 = 2^10: floor(log2(1024)) + 1 = 10 + 1 = 11

      const testCases = [
        { n: 1, expected: 1 },     // 1 element: 1 comparison
        { n: 2, expected: 2 },     // 2 elements: 2 comparisons
        { n: 3, expected: 2 },     // floor(log2(3)) + 1 = 1 + 1 = 2
        { n: 4, expected: 3 },     // floor(log2(4)) + 1 = 2 + 1 = 3
        { n: 8, expected: 4 },     // floor(log2(8)) + 1 = 3 + 1 = 4
        { n: 16, expected: 5 },    // floor(log2(16)) + 1 = 4 + 1 = 5
        { n: 1024, expected: 11 }, // floor(log2(1024)) + 1 = 10 + 1 = 11
        { n: 1025, expected: 11 }, // floor(log2(1025)) + 1 = 10 + 1 = 11
      ];

      testCases.forEach(({ n, expected }) => {
        const worstCase = Math.floor(Math.log2(n)) + 1;
        expect(
          worstCase,
          `Binary search on ${n} elements should need at most ${expected} comparisons`
        ).toBe(expected);
      });
    });
  });

  describe('Sorting Algorithm Properties', () => {
    it('Quick Sort worst case should be O(n^2)', () => {
      const midterm = allExams.find(e => e.id === 'cs201-exam-midterm');
      const quickSortQuestion = midterm?.questions.find(
        q => q.prompt.includes('worst-case time complexity') && q.prompt.includes('O(n^2)')
      );

      if (quickSortQuestion && quickSortQuestion.options) {
        const correctIndex = quickSortQuestion.correctAnswer as number;
        const correctOption = quickSortQuestion.options[correctIndex];
        // Quick Sort has O(n^2) worst case
        expect(correctOption).toBe('Quick Sort');
      }
    });

    it('Merge Sort should be identified as stable', () => {
      const midterm = allExams.find(e => e.id === 'cs201-exam-midterm');
      const stableQuestion = midterm?.questions.find(
        q => q.prompt.includes('stable') && q.type === 'multiple_choice'
      );

      if (stableQuestion && stableQuestion.options) {
        const correctIndex = stableQuestion.correctAnswer as number;
        const correctOption = stableQuestion.options[correctIndex];
        // Merge Sort is the stable one among common options
        expect(correctOption).toBe('Merge Sort');
      }
    });

    it('Insertion Sort best case should be O(n) on sorted input', () => {
      const midterm = allExams.find(e => e.id === 'cs201-exam-midterm');
      const insertionSortQuestion = midterm?.questions.find(
        q => q.prompt.includes('Insertion Sort') &&
             q.prompt.includes('O(n)') &&
             q.type === 'true_false'
      );

      if (insertionSortQuestion) {
        expect(insertionSortQuestion.correctAnswer).toBe(true);
      }
    });
  });

  describe('Algorithm Growth Rates', () => {
    it('O(n^2) should be identified as faster growing than O(n log n)', () => {
      const midterm = allExams.find(e => e.id === 'cs201-exam-midterm');
      const growthQuestion = midterm?.questions.find(
        q => q.prompt.includes('grows the fastest')
      );

      if (growthQuestion && growthQuestion.options) {
        const correctIndex = growthQuestion.correctAnswer as number;
        const correctOption = growthQuestion.options[correctIndex];
        expect(correctOption).toBe('O(n^2)');
      }
    });

    it('O(n) algorithm is NOT always faster than O(n^2) for small n', () => {
      const midterm = allExams.find(e => e.id === 'cs201-exam-midterm');
      const constantsQuestion = midterm?.questions.find(
        q => q.prompt.includes('O(n) algorithm') &&
             q.prompt.includes('always faster') &&
             q.type === 'true_false'
      );

      if (constantsQuestion) {
        // This should be FALSE because constant factors matter for small inputs
        expect(constantsQuestion.correctAnswer).toBe(false);
      }
    });
  });

  describe('Divide and Conquer Complexity', () => {
    it('O(n log n) for nested loop with halving outer loop', () => {
      const midterm = allExams.find(e => e.id === 'cs201-exam-midterm');
      const complexityQuestion = midterm?.questions.find(
        q => q.codeSnippet?.includes('i = i // 2') && q.codeSnippet?.includes('range(n)')
      );

      if (complexityQuestion && complexityQuestion.options) {
        const correctIndex = complexityQuestion.correctAnswer as number;
        const correctOption = complexityQuestion.options[correctIndex];
        // Outer loop: log(n), inner loop: n, total: O(n log n)
        expect(correctOption).toBe('O(n log n)');
      }
    });
  });
});

describe('Mathematical Verification of Binary Search', () => {
  it('verifies binary search comparisons match the floor(log2(n)) + 1 formula', () => {
    // Simulate binary search to verify
    function binarySearchComparisons(n: number): number {
      let comparisons = 0;
      let low = 0;
      let high = n - 1;

      while (low <= high) {
        comparisons++;
        const mid = Math.floor((low + high) / 2);
        // Simulate worst case: always go right
        low = mid + 1;
      }

      return comparisons;
    }

    // For 1024 elements, worst case is 11 comparisons (floor(log2(1024)) + 1 = 10 + 1 = 11)
    expect(binarySearchComparisons(1024)).toBe(11);
    expect(binarySearchComparisons(1)).toBe(1);
    expect(binarySearchComparisons(2)).toBe(2);
    expect(binarySearchComparisons(3)).toBe(2);
    expect(binarySearchComparisons(4)).toBe(3);
    expect(binarySearchComparisons(1025)).toBe(11);
  });
});
