/**
 * Home Review Format Real IDs Tests
 *
 * Tests the formatReviewItemTitle function with actual quiz and exercise ID
 * patterns found in the codebase. This ensures the formatting logic handles
 * real-world IDs correctly.
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

describe('formatReviewItemTitle - Real Quiz IDs from Codebase', () => {
  describe('CS subject quiz IDs', () => {
    it('formats cs101-quiz-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });

    it('formats cs101-quiz-1a correctly (level letter attached)', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1a', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1A');
    });

    it('formats cs101-quiz-1b correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1b', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
    });

    it('formats cs101-quiz-1c correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1c', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1C');
    });
  });

  describe('Math subject quiz IDs', () => {
    it('formats math101-quiz-1a correctly', () => {
      const item = createReviewItem({ itemId: 'math101-quiz-1a', subjectId: 'math101', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH101 Quiz 1A');
    });

    it('formats math203-quiz-1a correctly', () => {
      const item = createReviewItem({ itemId: 'math203-quiz-1a', subjectId: 'math203', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH203 Quiz 1A');
    });

    it('formats math304-quiz-1-1 correctly (topic-subquiz format)', () => {
      const item = createReviewItem({ itemId: 'math304-quiz-1-1', subjectId: 'math304', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH304 Quiz 1-1');
    });

    it('formats math304-quiz-1-2 correctly', () => {
      const item = createReviewItem({ itemId: 'math304-quiz-1-2', subjectId: 'math304', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH304 Quiz 1-2');
    });

    it('formats math304-quiz-1-3 correctly', () => {
      const item = createReviewItem({ itemId: 'math304-quiz-1-3', subjectId: 'math304', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH304 Quiz 1-3');
    });
  });

  describe('Topic-subquiz format quiz IDs', () => {
    it('formats cs402-quiz-1-2 correctly', () => {
      const item = createReviewItem({ itemId: 'cs402-quiz-1-2', subjectId: 'cs402', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS402 Quiz 1-2');
    });

    it('formats cs402-quiz-7-3 correctly', () => {
      const item = createReviewItem({ itemId: 'cs402-quiz-7-3', subjectId: 'cs402', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS402 Quiz 7-3');
    });

    it('formats math301-quiz-1-1 correctly', () => {
      const item = createReviewItem({ itemId: 'math301-quiz-1-1', subjectId: 'math301', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH301 Quiz 1-1');
    });

    it('formats math301-quiz-1-2 correctly', () => {
      const item = createReviewItem({ itemId: 'math301-quiz-1-2', subjectId: 'math301', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH301 Quiz 1-2');
    });
  });

  describe('Short quiz format IDs', () => {
    it('formats cs102-q1-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs102-q1-1', subjectId: 'cs102', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 1');
    });

    it('formats cs102-q1-a-1 correctly (with level letter)', () => {
      const item = createReviewItem({ itemId: 'cs102-q1-a-1', subjectId: 'cs102', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 1A');
    });

    it('formats cs102-q2-b-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs102-q2-b-1', subjectId: 'cs102', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 2B');
    });
  });

  describe('Topic prefix format quiz IDs', () => {
    it('formats cs304-t1-quiz-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs304-t1-quiz-1', subjectId: 'cs304', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS304 Topic 1 Quiz 1');
    });

    it('formats cs304-t2-quiz-2 correctly', () => {
      const item = createReviewItem({ itemId: 'cs304-t2-quiz-2', subjectId: 'cs304', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS304 Topic 2 Quiz 2');
    });

    it('formats cs307-t1-quiz-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs307-t1-quiz-1', subjectId: 'cs307', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS307 Topic 1 Quiz 1');
    });
  });
});

describe('formatReviewItemTitle - Real Exercise IDs from Codebase', () => {
  describe('Standard exercise IDs', () => {
    it('formats cs101-t1-ex01 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', subjectId: 'cs101', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('formats cs101-t1-ex02 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex02', subjectId: 'cs101', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 2');
    });

    it('formats cs101-t2-ex01 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-t2-ex01', subjectId: 'cs101', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 2 Exercise 1');
    });

    it('formats cs201-t3-ex05 correctly', () => {
      const item = createReviewItem({ itemId: 'cs201-t3-ex05', subjectId: 'cs201', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS201 Topic 3 Exercise 5');
    });
  });

  describe('Math exercise IDs', () => {
    it('formats math101-t1-ex01 correctly', () => {
      const item = createReviewItem({ itemId: 'math101-t1-ex01', subjectId: 'math101', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('MATH101 Topic 1 Exercise 1');
    });

    it('formats math203-t2-ex03 correctly', () => {
      const item = createReviewItem({ itemId: 'math203-t2-ex03', subjectId: 'math203', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('MATH203 Topic 2 Exercise 3');
    });
  });

  describe('Exercise IDs with leading zeros', () => {
    it('strips leading zeros from exercise number', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex001', subjectId: 'cs101', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('handles ex10 correctly (no leading zero)', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex10', subjectId: 'cs101', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 10');
    });
  });
});

describe('formatReviewItemTitle - Mixed Subject Types', () => {
  describe('Year 1 subjects', () => {
    it.each([
      ['cs101', 'CS101'],
      ['cs102', 'CS102'],
      ['cs103', 'CS103'],
      ['cs104', 'CS104'],
      ['cs105', 'CS105'],
      ['math101', 'MATH101'],
      ['math102', 'MATH102'],
    ])('formats %s quiz ID correctly', (subjectId, expected) => {
      const item = createReviewItem({
        itemId: `${subjectId}-quiz-1`,
        subjectId,
        itemType: 'quiz',
      });
      expect(formatReviewItemTitle(item)).toBe(`${expected} Quiz 1`);
    });
  });

  describe('Year 2 subjects', () => {
    it.each([
      ['cs201', 'CS201'],
      ['cs202', 'CS202'],
      ['cs203', 'CS203'],
      ['cs204', 'CS204'],
      ['cs205', 'CS205'],
      ['math201', 'MATH201'],
      ['math202', 'MATH202'],
      ['math203', 'MATH203'],
      ['math204', 'MATH204'],
    ])('formats %s quiz ID correctly', (subjectId, expected) => {
      const item = createReviewItem({
        itemId: `${subjectId}-quiz-1a`,
        subjectId,
        itemType: 'quiz',
      });
      expect(formatReviewItemTitle(item)).toBe(`${expected} Quiz 1A`);
    });
  });

  describe('Year 3 subjects', () => {
    it.each([
      ['cs301', 'CS301'],
      ['cs302', 'CS302'],
      ['cs303', 'CS303'],
      ['cs304', 'CS304'],
      ['cs305', 'CS305'],
      ['cs306', 'CS306'],
      ['cs307', 'CS307'],
      ['math301', 'MATH301'],
      ['math302', 'MATH302'],
      ['math303', 'MATH303'],
      ['math304', 'MATH304'],
    ])('formats %s exercise ID correctly', (subjectId, expected) => {
      const item = createReviewItem({
        itemId: `${subjectId}-t1-ex01`,
        subjectId,
        itemType: 'exercise',
      });
      expect(formatReviewItemTitle(item)).toBe(`${expected} Topic 1 Exercise 1`);
    });
  });

  describe('Year 4 subjects', () => {
    it.each([
      ['cs401', 'CS401'],
      ['cs402', 'CS402'],
      ['cs403', 'CS403'],
      ['cs404', 'CS404'],
      ['cs405', 'CS405'],
      ['cs406', 'CS406'],
      ['cs407', 'CS407'],
      ['math401', 'MATH401'],
      ['math402', 'MATH402'],
      ['math403', 'MATH403'],
      ['math404', 'MATH404'],
    ])('formats %s quiz ID correctly', (subjectId, expected) => {
      const item = createReviewItem({
        itemId: `${subjectId}-quiz-1-1`,
        subjectId,
        itemType: 'quiz',
      });
      expect(formatReviewItemTitle(item)).toBe(`${expected} Quiz 1-1`);
    });
  });
});

describe('formatReviewItemTitle - Consistency Checks', () => {
  it('quiz and exercise for same subject have consistent subject code formatting', () => {
    const quiz = createReviewItem({
      itemId: 'cs101-quiz-1',
      subjectId: 'cs101',
      itemType: 'quiz',
    });
    const exercise = createReviewItem({
      itemId: 'cs101-t1-ex01',
      subjectId: 'cs101',
      itemType: 'exercise',
    });

    const quizTitle = formatReviewItemTitle(quiz);
    const exerciseTitle = formatReviewItemTitle(exercise);

    // Both should start with CS101
    expect(quizTitle.startsWith('CS101')).toBe(true);
    expect(exerciseTitle.startsWith('CS101')).toBe(true);
  });

  it('all quiz formats contain Quiz label', () => {
    const formats = [
      'cs101-quiz-1',
      'cs101-quiz-1a',
      'cs402-quiz-1-2',
      'cs304-t1-quiz-1',
      'cs102-q1-1',
    ];

    for (const id of formats) {
      const item = createReviewItem({ itemId: id, itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toContain('Quiz');
    }
  });

  it('all exercise formats contain Exercise label', () => {
    const formats = [
      'cs101-t1-ex01',
      'cs201-t3-ex05',
      'math203-t2-ex03',
    ];

    for (const id of formats) {
      const item = createReviewItem({ itemId: id, itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toContain('Exercise');
    }
  });
});
