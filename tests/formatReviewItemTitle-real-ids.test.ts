/**
 * formatReviewItemTitle Real Quiz ID Tests
 *
 * Tests the formatReviewItemTitle function against actual quiz IDs
 * found in the codebase to ensure all naming conventions are properly handled.
 * This complements home-review-helpers.test.ts by testing with real-world IDs.
 */

import { describe, it, expect } from 'vitest';
import type { ReviewItem } from '../src/core/types';
import { formatReviewItemTitle } from '../src/pages/home';

// Helper to create review items
function createQuizReviewItem(itemId: string, subjectId: string): ReviewItem {
  return {
    itemType: 'quiz',
    itemId,
    subjectId,
    nextReviewAt: new Date().toISOString(),
    interval: 1,
    streak: 0,
  };
}

function createExerciseReviewItem(itemId: string, subjectId: string): ReviewItem {
  return {
    itemType: 'exercise',
    itemId,
    subjectId,
    nextReviewAt: new Date().toISOString(),
    interval: 1,
    streak: 0,
  };
}

describe('formatReviewItemTitle with real quiz IDs', () => {
  describe('CS101-style quiz IDs (cs101-quiz-N)', () => {
    it.each([
      ['cs101-quiz-1', 'CS101 Quiz 1'],
      ['cs101-quiz-5', 'CS101 Quiz 5'],
      ['cs101-quiz-5b', 'CS101 Quiz 5B'],
      ['cs101-quiz-5c', 'CS101 Quiz 5C'],
    ])('formats %s as %s', (itemId, expected) => {
      const item = createQuizReviewItem(itemId, 'cs101');
      expect(formatReviewItemTitle(item)).toBe(expected);
    });
  });

  describe('CS103-style quiz IDs (cs103-quiz-N)', () => {
    it.each([
      ['cs103-quiz-1', 'CS103 Quiz 1'],
      ['cs103-quiz-1b', 'CS103 Quiz 1B'],
      ['cs103-quiz-1c', 'CS103 Quiz 1C'],
      ['cs103-quiz-7c', 'CS103 Quiz 7C'],
    ])('formats %s as %s', (itemId, expected) => {
      const item = createQuizReviewItem(itemId, 'cs103');
      expect(formatReviewItemTitle(item)).toBe(expected);
    });
  });

  describe('Math subject quiz IDs', () => {
    it.each([
      ['math201-quiz-1a', 'MATH201 Quiz 1A'],
      ['math201-quiz-1b', 'MATH201 Quiz 1B'],
      ['math201-quiz-1c', 'MATH201 Quiz 1C'],
      ['math301-quiz-5b', 'MATH301 Quiz 5B'],
      ['math404-quiz-2c', 'MATH404 Quiz 2C'],
    ])('formats %s as %s', (itemId, expected) => {
      const item = createQuizReviewItem(itemId, itemId.split('-')[0]);
      expect(formatReviewItemTitle(item)).toBe(expected);
    });
  });

  describe('Topic-subquiz format (cs402-quiz-N-M)', () => {
    it.each([
      ['cs402-quiz-1-1', 'CS402 Quiz 1-1'],
      ['cs402-quiz-1-2', 'CS402 Quiz 1-2'],
      ['cs402-quiz-2-3', 'CS402 Quiz 2-3'],
      ['cs402-quiz-7-1', 'CS402 Quiz 7-1'],
      ['cs205-quiz-3-2', 'CS205 Quiz 3-2'],
      ['cs403-quiz-1-3', 'CS403 Quiz 1-3'],
      ['cs404-quiz-1-1', 'CS404 Quiz 1-1'],
      ['math302-quiz-1-1', 'MATH302 Quiz 1-1'],
      ['math302-quiz-2-2', 'MATH302 Quiz 2-2'],
    ])('formats %s as %s', (itemId, expected) => {
      const item = createQuizReviewItem(itemId, itemId.split('-')[0]);
      expect(formatReviewItemTitle(item)).toBe(expected);
    });
  });

  describe('Topic prefix format (cs304-t1-quiz-N)', () => {
    it.each([
      ['cs304-t1-quiz-1', 'CS304 Topic 1 Quiz 1'],
      ['cs304-t1-quiz-2', 'CS304 Topic 1 Quiz 2'],
      ['cs304-t3-quiz-1', 'CS304 Topic 3 Quiz 1'],
      ['cs304-t7-quiz-3', 'CS304 Topic 7 Quiz 3'],
    ])('formats %s as %s', (itemId, expected) => {
      const item = createQuizReviewItem(itemId, 'cs304');
      expect(formatReviewItemTitle(item)).toBe(expected);
    });
  });

  describe('Exercise IDs (cs101-t1-ex01 format)', () => {
    it.each([
      ['cs101-t1-ex01', 'CS101 Topic 1 Exercise 1'],
      ['cs101-t1-ex02', 'CS101 Topic 1 Exercise 2'],
      ['cs101-t2-ex05', 'CS101 Topic 2 Exercise 5'],
      ['cs201-t3-ex12', 'CS201 Topic 3 Exercise 12'],
      ['math101-t1-ex99', 'MATH101 Topic 1 Exercise 99'],
      ['cs101-t1-ex001', 'CS101 Topic 1 Exercise 1'], // Leading zeros stripped
    ])('formats %s as %s', (itemId, expected) => {
      const item = createExerciseReviewItem(itemId, itemId.split('-')[0]);
      expect(formatReviewItemTitle(item)).toBe(expected);
    });
  });

  describe('Exercise IDs without topic (cs101-ex03 format)', () => {
    it.each([
      ['cs101-ex03', 'CS101 Exercise 3'],
      ['cs102-ex10', 'CS102 Exercise 10'],
      ['math201-ex01', 'MATH201 Exercise 1'],
    ])('formats %s as %s', (itemId, expected) => {
      const item = createExerciseReviewItem(itemId, itemId.split('-')[0]);
      expect(formatReviewItemTitle(item)).toBe(expected);
    });
  });

  describe('Edge cases with unusual but valid IDs', () => {
    it('handles quiz with double-digit topic number', () => {
      const item = createQuizReviewItem('cs101-quiz-10', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 10');
    });

    it('handles quiz with double-digit in topic-subquiz format', () => {
      const item = createQuizReviewItem('cs101-quiz-10-12', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 10-12');
    });

    it('handles exercise with double-digit topic', () => {
      const item = createExerciseReviewItem('cs101-t10-ex05', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 10 Exercise 5');
    });

    it('handles uppercase subject code in ID', () => {
      const item = createQuizReviewItem('CS101-quiz-1', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });

    it('handles mixed case subject code', () => {
      const item = createQuizReviewItem('Cs101-quiz-1', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });
  });

  describe('Fallback behavior for malformed IDs', () => {
    it('returns subject code and generic Quiz label for ID with only subject', () => {
      const item = createQuizReviewItem('cs101', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz');
    });

    it('returns subject code and generic Exercise label for ID without exercise number', () => {
      const item = createExerciseReviewItem('cs101-t1-exercise', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise');
    });

    it('handles empty item ID gracefully', () => {
      const item = createQuizReviewItem('', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('Quiz');
    });

    it('handles ID without recognizable subject code', () => {
      const item = createQuizReviewItem('quiz-1', 'unknown');
      expect(formatReviewItemTitle(item)).toBe('Quiz 1');
    });
  });

  describe('Consistency across quiz levels', () => {
    it('formats all quiz levels consistently for a topic', () => {
      const quiz1a = createQuizReviewItem('math201-quiz-1a', 'math201');
      const quiz1b = createQuizReviewItem('math201-quiz-1b', 'math201');
      const quiz1c = createQuizReviewItem('math201-quiz-1c', 'math201');

      expect(formatReviewItemTitle(quiz1a)).toBe('MATH201 Quiz 1A');
      expect(formatReviewItemTitle(quiz1b)).toBe('MATH201 Quiz 1B');
      expect(formatReviewItemTitle(quiz1c)).toBe('MATH201 Quiz 1C');
    });

    it('distinguishes between same quiz number in different topics', () => {
      const topic1 = createQuizReviewItem('cs402-quiz-1-1', 'cs402');
      const topic2 = createQuizReviewItem('cs402-quiz-2-1', 'cs402');

      const title1 = formatReviewItemTitle(topic1);
      const title2 = formatReviewItemTitle(topic2);

      expect(title1).toBe('CS402 Quiz 1-1');
      expect(title2).toBe('CS402 Quiz 2-1');
      expect(title1).not.toBe(title2);
    });
  });
});
