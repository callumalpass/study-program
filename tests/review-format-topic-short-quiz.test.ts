/**
 * Review Format Topic + Short Quiz Pattern Tests
 *
 * Tests for formatting review items that combine topic prefix (-t1-)
 * with short quiz pattern (-q1-). While these patterns typically appear
 * in question IDs rather than quiz IDs, testing ensures the formatting
 * function handles any ID gracefully.
 */

import { describe, it, expect } from 'vitest';
import type { ReviewItem } from '../src/core/types';
import { formatReviewItemTitle } from '../src/pages/home';

function createReviewItem(overrides: Partial<ReviewItem>): ReviewItem {
  return {
    subjectId: 'cs101',
    itemId: 'cs101-quiz-1',
    itemType: 'quiz',
    nextReviewAt: new Date().toISOString(),
    interval: 1,
    streak: 0,
    ...overrides,
  };
}

describe('formatReviewItemTitle - Topic + Short Quiz Combined Pattern', () => {
  describe('topic prefix with short quiz format', () => {
    it('handles cs304-t1-q1-1 pattern (topic + short quiz)', () => {
      const item = createReviewItem({
        itemId: 'cs304-t1-q1-1',
        subjectId: 'cs304',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      // Should extract subject (CS304), topic (1), and quiz (1)
      expect(title).toBe('CS304 Topic 1 Quiz 1');
    });

    it('handles cs304-t2-q3-5 pattern', () => {
      const item = createReviewItem({
        itemId: 'cs304-t2-q3-5',
        subjectId: 'cs304',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS304 Topic 2 Quiz 3');
    });

    it('handles math301-t5-q2-4 pattern', () => {
      const item = createReviewItem({
        itemId: 'math301-t5-q2-4',
        subjectId: 'math301',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('MATH301 Topic 5 Quiz 2');
    });
  });

  describe('topic prefix with short quiz format including level', () => {
    it('handles cs304-t1-q1-a-1 pattern (with level letter)', () => {
      const item = createReviewItem({
        itemId: 'cs304-t1-q1-a-1',
        subjectId: 'cs304',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS304 Topic 1 Quiz 1A');
    });

    it('handles cs205-t3-q2-b-3 pattern', () => {
      const item = createReviewItem({
        itemId: 'cs205-t3-q2-b-3',
        subjectId: 'cs205',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS205 Topic 3 Quiz 2B');
    });

    it('handles math404-t7-q1-c-2 pattern', () => {
      const item = createReviewItem({
        itemId: 'math404-t7-q1-c-2',
        subjectId: 'math404',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('MATH404 Topic 7 Quiz 1C');
    });
  });

  describe('double digit topic and quiz numbers', () => {
    it('handles cs401-t10-q5-3 pattern', () => {
      const item = createReviewItem({
        itemId: 'cs401-t10-q5-3',
        subjectId: 'cs401',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS401 Topic 10 Quiz 5');
    });

    it('handles cs301-t12-q15-1 pattern', () => {
      const item = createReviewItem({
        itemId: 'cs301-t12-q15-1',
        subjectId: 'cs301',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS301 Topic 12 Quiz 15');
    });
  });

  describe('consistency with standard quiz formats', () => {
    it('produces consistent subject code formatting across patterns', () => {
      const patterns = [
        { id: 'cs304-quiz-1', expected: 'CS304 Quiz 1' },
        { id: 'cs304-t1-quiz-1', expected: 'CS304 Topic 1 Quiz 1' },
        { id: 'cs304-t1-q1-1', expected: 'CS304 Topic 1 Quiz 1' },
      ];

      for (const { id, expected } of patterns) {
        const item = createReviewItem({ itemId: id, subjectId: 'cs304', itemType: 'quiz' });
        const title = formatReviewItemTitle(item);
        expect(title).toBe(expected);
        expect(title.startsWith('CS304')).toBe(true);
      }
    });

    it('all patterns produce Quiz label for quiz type', () => {
      const quizIds = [
        'cs304-t1-q1-1',
        'cs304-t2-q2-a-1',
        'math301-t5-q3-2',
        'cs205-t10-q15-b-5',
      ];

      for (const id of quizIds) {
        const item = createReviewItem({ itemId: id, itemType: 'quiz' });
        const title = formatReviewItemTitle(item);
        expect(title).toContain('Quiz');
      }
    });
  });

  describe('edge cases', () => {
    it('handles topic 0 with short quiz format', () => {
      const item = createReviewItem({
        itemId: 'cs101-t0-q1-1',
        subjectId: 'cs101',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 0 Quiz 1');
    });

    it('handles quiz 0 in short format', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-q0-1',
        subjectId: 'cs101',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 1 Quiz 0');
    });

    it('never produces double spaces', () => {
      const testIds = [
        'cs304-t1-q1-1',
        'cs304-t2-q2-a-1',
        '-t1-q1-1',
        'cs304--t1-q1-1',
      ];

      for (const id of testIds) {
        const item = createReviewItem({ itemId: id, itemType: 'quiz' });
        const title = formatReviewItemTitle(item);
        expect(title).not.toMatch(/  /);
      }
    });

    it('never produces leading or trailing spaces', () => {
      const testIds = [
        'cs304-t1-q1-1',
        't1-q1-1',
        '-t1-q1-1',
      ];

      for (const id of testIds) {
        const item = createReviewItem({ itemId: id, itemType: 'quiz' });
        const title = formatReviewItemTitle(item);
        expect(title).toBe(title.trim());
      }
    });
  });
});

describe('formatReviewItemTitle - Exercise IDs remain unaffected', () => {
  it('exercise type ignores quiz patterns even with topic prefix', () => {
    const item = createReviewItem({
      itemId: 'cs304-t1-q1-1',
      subjectId: 'cs304',
      itemType: 'exercise'
    });
    const title = formatReviewItemTitle(item);
    // Should be treated as exercise, not quiz
    expect(title).toContain('Exercise');
    expect(title).not.toContain('Quiz');
    expect(title).toBe('CS304 Topic 1 Exercise');
  });

  it('standard exercise format still works with topic prefix', () => {
    const item = createReviewItem({
      itemId: 'cs304-t1-ex05',
      subjectId: 'cs304',
      itemType: 'exercise'
    });
    const title = formatReviewItemTitle(item);
    expect(title).toBe('CS304 Topic 1 Exercise 5');
  });
});
