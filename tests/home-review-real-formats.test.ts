/**
 * Home Review Format Real ID Pattern Tests
 *
 * Tests for the formatReviewItemTitle function using actual quiz and exercise
 * ID formats found in the subject directories to ensure the function correctly
 * handles all real-world patterns.
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

describe('formatReviewItemTitle - Real Quiz ID Formats', () => {
  describe('topic-subquiz format (cs404-quiz-X-Y)', () => {
    it('formats cs404-quiz-1-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs404-quiz-1-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS404 Quiz 1-1');
    });

    it('formats cs404-quiz-3-2 correctly', () => {
      const item = createReviewItem({ itemId: 'cs404-quiz-3-2', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS404 Quiz 3-2');
    });

    it('formats cs404-quiz-7-3 correctly', () => {
      const item = createReviewItem({ itemId: 'cs404-quiz-7-3', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS404 Quiz 7-3');
    });

    it('formats cs402-quiz-1-2 correctly', () => {
      const item = createReviewItem({ itemId: 'cs402-quiz-1-2', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS402 Quiz 1-2');
    });

    it('formats math401-quiz-1-1 correctly', () => {
      const item = createReviewItem({ itemId: 'math401-quiz-1-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('MATH401 Quiz 1-1');
    });

    it('formats math302-quiz-1-3 correctly', () => {
      const item = createReviewItem({ itemId: 'math302-quiz-1-3', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('MATH302 Quiz 1-3');
    });
  });

  describe('simple quiz format (cs101-quiz-X)', () => {
    it('formats cs101-quiz-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1');
    });

    it('formats cs301-quiz-5 correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-quiz-5', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Quiz 5');
    });

    it('formats math102-quiz-3 correctly', () => {
      const item = createReviewItem({ itemId: 'math102-quiz-3', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('MATH102 Quiz 3');
    });
  });

  describe('quiz with level letter format (cs101-quiz-Xb)', () => {
    it('formats cs102-quiz-1-b correctly (separated level)', () => {
      const item = createReviewItem({ itemId: 'cs102-quiz-1-b', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS102 Quiz 1B');
    });

    it('formats cs102-quiz-1b correctly (attached level)', () => {
      const item = createReviewItem({ itemId: 'cs102-quiz-1b', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS102 Quiz 1B');
    });

    it('formats cs301-quiz-2a correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-quiz-2a', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Quiz 2A');
    });

    it('formats cs301-quiz-2c correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-quiz-2c', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Quiz 2C');
    });
  });

  describe('short quiz format (cs102-qX-Y)', () => {
    it('formats cs102-q1-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs102-q1-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS102 Quiz 1');
    });

    it('formats cs103-q2-3 correctly', () => {
      const item = createReviewItem({ itemId: 'cs103-q2-3', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS103 Quiz 2');
    });

    it('formats cs102-q1-b-1 correctly (short with level)', () => {
      const item = createReviewItem({ itemId: 'cs102-q1-b-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS102 Quiz 1B');
    });
  });

  describe('topic prefix format (cs304-t1-quiz-X)', () => {
    it('formats cs304-t1-quiz-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs304-t1-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS304 Topic 1 Quiz 1');
    });

    it('formats cs304-t3-quiz-2 correctly', () => {
      const item = createReviewItem({ itemId: 'cs304-t3-quiz-2', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS304 Topic 3 Quiz 2');
    });

    it('formats math201-t5-quiz-1 correctly', () => {
      const item = createReviewItem({ itemId: 'math201-t5-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('MATH201 Topic 5 Quiz 1');
    });
  });
});

describe('formatReviewItemTitle - Real Exercise ID Formats', () => {
  describe('standard exercise format (cs101-t1-ex01)', () => {
    it('formats cs101-t1-ex01 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 1 Exercise 1');
    });

    it('formats cs301-t3-ex05 correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-t3-ex05', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Topic 3 Exercise 5');
    });

    it('formats math102-t7-ex12 correctly', () => {
      const item = createReviewItem({ itemId: 'math102-t7-ex12', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('MATH102 Topic 7 Exercise 12');
    });

    it('formats cs404-t2-ex16 correctly', () => {
      const item = createReviewItem({ itemId: 'cs404-t2-ex16', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS404 Topic 2 Exercise 16');
    });
  });

  describe('exercise without topic prefix (cs101-ex01)', () => {
    it('formats cs101-ex01 correctly (no topic)', () => {
      const item = createReviewItem({ itemId: 'cs101-ex01', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Exercise 1');
    });

    it('formats math201-ex10 correctly (no topic)', () => {
      const item = createReviewItem({ itemId: 'math201-ex10', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('MATH201 Exercise 10');
    });
  });

  describe('exercise with leading zeros stripped', () => {
    it('strips leading zeros from exercise number', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex007', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 1 Exercise 7');
    });

    it('handles ex00 as exercise 0', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex00', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 1 Exercise 0');
    });
  });
});

describe('formatReviewItemTitle - Subject Code Variations', () => {
  describe('different subject prefixes', () => {
    it('handles CS subjects correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-quiz-1-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Quiz 1-1');
    });

    it('handles MATH subjects correctly', () => {
      const item = createReviewItem({ itemId: 'math201-quiz-1-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('MATH201 Quiz 1-1');
    });

    it('handles lowercase subject codes', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1');
    });

    it('handles uppercase subject codes', () => {
      const item = createReviewItem({ itemId: 'CS101-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1');
    });

    it('handles mixed case subject codes', () => {
      const item = createReviewItem({ itemId: 'Cs101-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1');
    });
  });

  describe('year levels in subject codes', () => {
    it('handles year 1 subjects (100-level)', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1');
    });

    it('handles year 2 subjects (200-level)', () => {
      const item = createReviewItem({ itemId: 'cs201-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS201 Quiz 1');
    });

    it('handles year 3 subjects (300-level)', () => {
      const item = createReviewItem({ itemId: 'cs301-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Quiz 1');
    });

    it('handles year 4 subjects (400-level)', () => {
      const item = createReviewItem({ itemId: 'cs401-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS401 Quiz 1');
    });
  });
});

describe('formatReviewItemTitle - Comprehensive Coverage', () => {
  describe('all 7 topics across subjects', () => {
    it('formats topic 1 quizzes correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-t1-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Topic 1 Quiz 1');
    });

    it('formats topic 7 quizzes correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-t7-quiz-3', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Topic 7 Quiz 3');
    });

    it('formats topic 1 exercises correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-t1-ex01', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Topic 1 Exercise 1');
    });

    it('formats topic 7 exercises correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-t7-ex16', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Topic 7 Exercise 16');
    });
  });

  describe('high exercise numbers', () => {
    it('formats exercise 16 correctly', () => {
      const item = createReviewItem({ itemId: 'cs301-t1-ex16', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS301 Topic 1 Exercise 16');
    });

    it('formats exercise 20 correctly', () => {
      const item = createReviewItem({ itemId: 'cs401-t3-ex20', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS401 Topic 3 Exercise 20');
    });
  });
});
