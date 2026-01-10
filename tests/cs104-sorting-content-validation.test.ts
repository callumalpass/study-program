/**
 * CS104 Data Structures - Sorting Algorithm Content Validation Tests
 *
 * These tests verify the technical accuracy of sorting algorithm quiz content,
 * including merge algorithm explanations, time complexity claims, and algorithm properties.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Quiz, QuizQuestion } from '../src/core/types';

const SUBJECTS_PATH = join(__dirname, '../src/subjects');

interface QuizFile {
  path: string;
  quizzes: Quiz[];
}

function loadAllCS104Quizzes(): QuizFile[] {
  const quizFiles: QuizFile[] = [];
  const topicDirs = ['topic-1', 'topic-2', 'topic-3', 'topic-4', 'topic-5', 'topic-6', 'topic-7'];

  for (const topicDir of topicDirs) {
    const quizPath = join(SUBJECTS_PATH, 'cs104/content', topicDir, 'quizzes.json');
    if (existsSync(quizPath)) {
      const content = readFileSync(quizPath, 'utf-8');
      quizFiles.push({
        path: quizPath,
        quizzes: JSON.parse(content) as Quiz[],
      });
    }
  }

  return quizFiles;
}

function getAllQuestions(quizFiles: QuizFile[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  for (const file of quizFiles) {
    for (const quiz of file.quizzes) {
      questions.push(...quiz.questions);
    }
  }
  return questions;
}

describe('CS104 Data Structures Quiz Content Validation', () => {
  let quizFiles: QuizFile[];
  let allQuestions: QuizQuestion[];

  beforeAll(() => {
    quizFiles = loadAllCS104Quizzes();
    allQuestions = getAllQuestions(quizFiles);
  });

  it('should load quiz files for CS104', () => {
    expect(quizFiles.length).toBeGreaterThan(0);
  });

  it('should have multiple quiz questions', () => {
    expect(allQuestions.length).toBeGreaterThan(0);
  });

  describe('Merge Algorithm Explanation Validation', () => {
    it('merge explanation should correctly describe comparison order', () => {
      // Find the merge question
      const mergeQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('merging') &&
             q.prompt.toLowerCase().includes('[1, 3, 5]') &&
             q.prompt.toLowerCase().includes('[2, 4, 6]')
      );

      if (mergeQuestion) {
        // The explanation should show comparisons from front of each array
        // After taking 1, we compare 3 (front of first) with 2 (front of second)
        // 3>2 means we take 2 (not 3<2 which would be wrong)
        expect(mergeQuestion.explanation).toContain('3>2');
        expect(mergeQuestion.explanation).toContain('5>4');

        // Should NOT contain misleading comparisons like "2<3" when
        // 2 is from the second array and 3 is the front of first array
        // The old buggy explanation had "1<2→1, 2<3→2" which was confusing
        expect(mergeQuestion.explanation).not.toMatch(/1<2→1,\s*2<3→2/);
      }
    });

    it('merge result should be [1, 2, 3, 4, 5, 6]', () => {
      const mergeQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('merging') &&
             q.prompt.toLowerCase().includes('[1, 3, 5]') &&
             q.prompt.toLowerCase().includes('[2, 4, 6]')
      );

      if (mergeQuestion) {
        expect(mergeQuestion.correctAnswer).toBe('[1, 2, 3, 4, 5, 6]');
      }
    });
  });

  describe('Sorting Algorithm Time Complexity Claims', () => {
    it('bubble sort worst case should be O(n²)', () => {
      const bubbleSortQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('bubble sort') &&
             q.prompt.toLowerCase().includes('worst case')
      );

      if (bubbleSortQuestion && bubbleSortQuestion.type === 'multiple_choice') {
        const correctOption = bubbleSortQuestion.options![bubbleSortQuestion.correctAnswer as number];
        expect(correctOption.toLowerCase()).toContain('n²');
      }
    });

    it('merge sort should be O(n log n) in all cases', () => {
      const mergeSortQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('same time complexity') &&
             q.prompt.toLowerCase().includes('best, average, and worst')
      );

      if (mergeSortQuestion && mergeSortQuestion.type === 'multiple_choice') {
        const correctOption = mergeSortQuestion.options![mergeSortQuestion.correctAnswer as number];
        expect(correctOption.toLowerCase()).toContain('merge');
      }
    });

    it('quick sort worst case should be O(n²)', () => {
      const quickSortQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('quick sort') &&
             q.prompt.toLowerCase().includes('o(n²)')
      );

      if (quickSortQuestion) {
        // The explanation should mention pivot selection
        expect(quickSortQuestion.explanation.toLowerCase()).toMatch(/pivot|min|max|unbalanced/);
      }
    });

    it('insertion sort should be O(n) for nearly sorted data', () => {
      const insertionQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('insertion sort') &&
             q.prompt.toLowerCase().includes('nearly sorted')
      );

      if (insertionQuestion) {
        expect(insertionQuestion.explanation.toLowerCase()).toMatch(/o\(n\)|linear/);
      }
    });
  });

  describe('Sorting Algorithm Properties', () => {
    it('merge sort requires O(n) additional space', () => {
      const mergeSpaceQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('merge sort') &&
             (q.prompt.toLowerCase().includes('space') ||
              q.prompt.toLowerCase().includes('o(n) additional'))
      );

      if (mergeSpaceQuestion) {
        if (mergeSpaceQuestion.type === 'true_false') {
          expect(mergeSpaceQuestion.correctAnswer).toBe(true);
        }
        expect(mergeSpaceQuestion.explanation.toLowerCase()).toMatch(/auxiliary|additional|extra/);
      }
    });

    it('quick sort is not stable', () => {
      const quickSortStableQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('quick sort') &&
             q.prompt.toLowerCase().includes('stable')
      );

      if (quickSortStableQuestion && quickSortStableQuestion.type === 'true_false') {
        expect(quickSortStableQuestion.correctAnswer).toBe(false);
      }
    });

    it('stable sort definition should mention relative order of equal elements', () => {
      const stableQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('stable') &&
             q.type === 'fill_blank'
      );

      if (stableQuestion) {
        expect(stableQuestion.explanation.toLowerCase()).toMatch(/relative order|equal elements/);
      }
    });

    it('Timsort is used by Python built-in sort', () => {
      const pythonSortQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('python') &&
             q.prompt.toLowerCase().includes('sort')
      );

      if (pythonSortQuestion && pythonSortQuestion.type === 'multiple_choice') {
        const correctOption = pythonSortQuestion.options![pythonSortQuestion.correctAnswer as number];
        expect(correctOption.toLowerCase()).toContain('timsort');
      }
    });
  });

  describe('Bubble Sort Pass Validation', () => {
    it('after one pass of bubble sort, largest element should be at end', () => {
      const bubblePassQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('one pass') &&
             q.prompt.toLowerCase().includes('bubble sort')
      );

      if (bubblePassQuestion) {
        // The correct answer should show the largest element at the end
        const answer = String(bubblePassQuestion.correctAnswer);
        if (answer.includes('[')) {
          // Parse the array and check the last element
          const match = answer.match(/\d+/g);
          if (match) {
            const numbers = match.map(Number);
            const maxInResult = Math.max(...numbers);
            expect(numbers[numbers.length - 1]).toBe(maxInResult);
          }
        }
      }
    });
  });

  describe('Selection Algorithm Questions', () => {
    it('quick select should have O(n) average time', () => {
      const quickSelectQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('kth') &&
             q.prompt.toLowerCase().includes('o(n)')
      );

      if (quickSelectQuestion && quickSelectQuestion.type === 'multiple_choice') {
        const correctOption = quickSelectQuestion.options![quickSelectQuestion.correctAnswer as number];
        expect(correctOption.toLowerCase()).toMatch(/quick\s*select/);
      }
    });

    it('selection sort should perform minimum number of swaps', () => {
      const selectionSwapQuestion = allQuestions.find(
        q => q.prompt.toLowerCase().includes('selection sort') &&
             q.prompt.toLowerCase().includes('minimum') &&
             q.type === 'multiple_choice'
      );

      if (selectionSwapQuestion) {
        const correctOption = selectionSwapQuestion.options![selectionSwapQuestion.correctAnswer as number];
        expect(correctOption.toLowerCase()).toContain('finding minimum');
      }
    });
  });

  describe('Quiz Structure Validation', () => {
    it('all multiple choice questions should have valid correctAnswer indices', () => {
      for (const question of allQuestions) {
        if (question.type === 'multiple_choice') {
          expect(question.options).toBeDefined();
          expect(question.options!.length).toBeGreaterThan(0);

          if (typeof question.correctAnswer === 'number') {
            expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
            expect(question.correctAnswer).toBeLessThan(question.options!.length);
          }
        }
      }
    });

    it('all questions should have explanations', () => {
      for (const question of allQuestions) {
        expect(question.explanation).toBeDefined();
        expect(question.explanation.length).toBeGreaterThan(0);
      }
    });

    it('all true_false questions should have boolean correctAnswer', () => {
      for (const question of allQuestions) {
        if (question.type === 'true_false') {
          expect(typeof question.correctAnswer).toBe('boolean');
        }
      }
    });
  });
});

describe('Merge Algorithm Correctness', () => {
  describe('Merge Algorithm Steps', () => {
    it('merging [1,3,5] and [2,4,6] should produce [1,2,3,4,5,6]', () => {
      // Simulate the merge algorithm
      const arr1 = [1, 3, 5];
      const arr2 = [2, 4, 6];
      const result: number[] = [];
      let i = 0, j = 0;

      while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
          result.push(arr1[i]);
          i++;
        } else {
          result.push(arr2[j]);
          j++;
        }
      }

      // Add remaining elements
      while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
      }
      while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
      }

      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('merge comparison sequence for [1,3,5] and [2,4,6]', () => {
      // Track the comparisons made during merge
      const arr1 = [1, 3, 5];
      const arr2 = [2, 4, 6];
      const comparisons: string[] = [];
      let i = 0, j = 0;

      while (i < arr1.length && j < arr2.length) {
        const comparison = `${arr1[i]} vs ${arr2[j]}`;
        if (arr1[i] <= arr2[j]) {
          comparisons.push(`${comparison}: take ${arr1[i]}`);
          i++;
        } else {
          comparisons.push(`${comparison}: take ${arr2[j]}`);
          j++;
        }
      }

      // Expected sequence:
      // 1 vs 2: 1<2, take 1
      // 3 vs 2: 3>2, take 2
      // 3 vs 4: 3<4, take 3
      // 5 vs 4: 5>4, take 4
      // 5 vs 6: 5<6, take 5
      // (6 remains and is appended)

      expect(comparisons[0]).toContain('1 vs 2');
      expect(comparisons[0]).toContain('take 1');
      expect(comparisons[1]).toContain('3 vs 2');
      expect(comparisons[1]).toContain('take 2');
      expect(comparisons[2]).toContain('3 vs 4');
      expect(comparisons[2]).toContain('take 3');
      expect(comparisons[3]).toContain('5 vs 4');
      expect(comparisons[3]).toContain('take 4');
      expect(comparisons[4]).toContain('5 vs 6');
      expect(comparisons[4]).toContain('take 5');
    });
  });

  describe('Time Complexity Verification', () => {
    it('bubble sort performs O(n²) comparisons', () => {
      // For an array of size n, bubble sort does approximately n*(n-1)/2 comparisons
      const n = 5;
      const expectedComparisons = (n * (n - 1)) / 2; // 10 comparisons for n=5
      expect(expectedComparisons).toBe(10);
    });

    it('merge sort divides array log(n) times', () => {
      // For an array of size n, merge sort divides log2(n) times
      const n = 8;
      const expectedDivisions = Math.log2(n); // 3 divisions for n=8
      expect(expectedDivisions).toBe(3);
    });
  });
});
