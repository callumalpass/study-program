/**
 * Comprehensive tests for formatReviewItemTitle
 *
 * Tests the formatting logic for review item titles across all ID patterns
 * used in the application. This function is responsible for generating
 * human-readable titles from quiz and exercise IDs for display in the
 * daily review section.
 */

import { describe, it, expect } from 'vitest';
import type { ReviewItem } from '../src/core/types';
import { formatReviewItemTitle } from '../src/pages/home';

// Helper to create review items for testing
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

describe('formatReviewItemTitle - Quiz Patterns', () => {
  describe('basic quiz format (subject-quiz-N)', () => {
    it('formats simple quiz number', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });

    it('formats double-digit quiz number', () => {
      const item = createReviewItem({ itemId: 'cs201-quiz-12' });
      expect(formatReviewItemTitle(item)).toBe('CS201 Quiz 12');
    });

    it('formats triple-digit quiz number', () => {
      const item = createReviewItem({ itemId: 'cs301-quiz-100' });
      expect(formatReviewItemTitle(item)).toBe('CS301 Quiz 100');
    });
  });

  describe('quiz with level letter (subject-quiz-Na)', () => {
    it('formats quiz with attached level a', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1a' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1A');
    });

    it('formats quiz with attached level b', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1b' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
    });

    it('formats quiz with attached level c', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1c' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1C');
    });

    it('handles uppercase level letter in ID', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1B' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
    });
  });

  describe('quiz with separated level (subject-quiz-N-a)', () => {
    it('formats quiz with dash-separated level a', () => {
      const item = createReviewItem({ itemId: 'cs102-quiz-2-a' });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 2A');
    });

    it('formats quiz with dash-separated level b', () => {
      const item = createReviewItem({ itemId: 'cs102-quiz-2-b' });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 2B');
    });

    it('formats quiz with dash-separated level c', () => {
      const item = createReviewItem({ itemId: 'cs102-quiz-3-c' });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 3C');
    });
  });

  describe('topic-subquiz format (subject-quiz-N-M)', () => {
    it('formats topic 1, quiz 2', () => {
      const item = createReviewItem({ itemId: 'cs402-quiz-1-2' });
      expect(formatReviewItemTitle(item)).toBe('CS402 Quiz 1-2');
    });

    it('formats topic 3, quiz 1', () => {
      const item = createReviewItem({ itemId: 'cs402-quiz-3-1' });
      expect(formatReviewItemTitle(item)).toBe('CS402 Quiz 3-1');
    });

    it('formats double-digit topic and quiz', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-10-12' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 10-12');
    });

    it('distinguishes from level format (N-a vs N-M)', () => {
      // N-M should be treated as topic-quiz, not as quiz with level
      const topicQuiz = createReviewItem({ itemId: 'cs402-quiz-1-2' });
      expect(formatReviewItemTitle(topicQuiz)).toBe('CS402 Quiz 1-2');

      // N-a should be treated as quiz with level
      const levelQuiz = createReviewItem({ itemId: 'cs101-quiz-1-b' });
      expect(formatReviewItemTitle(levelQuiz)).toBe('CS101 Quiz 1B');
    });
  });

  describe('short q format (subject-qN-M)', () => {
    it('formats short quiz without level', () => {
      const item = createReviewItem({ itemId: 'cs102-q1-1' });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 1');
    });

    it('formats short quiz with level', () => {
      const item = createReviewItem({ itemId: 'cs102-q1-b-1' });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 1B');
    });

    it('formats various short quiz patterns', () => {
      expect(formatReviewItemTitle(createReviewItem({ itemId: 'cs102-q2-3' }))).toBe('CS102 Quiz 2');
      expect(formatReviewItemTitle(createReviewItem({ itemId: 'cs102-q5-a-2' }))).toBe('CS102 Quiz 5A');
      expect(formatReviewItemTitle(createReviewItem({ itemId: 'cs102-q7-c-1' }))).toBe('CS102 Quiz 7C');
    });
  });

  describe('topic prefix format (subject-tN-quiz-M)', () => {
    it('formats topic prefix quiz', () => {
      const item = createReviewItem({ itemId: 'cs304-t1-quiz-1' });
      expect(formatReviewItemTitle(item)).toBe('CS304 Topic 1 Quiz 1');
    });

    it('formats different topic numbers', () => {
      expect(formatReviewItemTitle(createReviewItem({ itemId: 'cs304-t2-quiz-3' }))).toBe('CS304 Topic 2 Quiz 3');
      expect(formatReviewItemTitle(createReviewItem({ itemId: 'cs304-t7-quiz-1' }))).toBe('CS304 Topic 7 Quiz 1');
    });
  });
});

describe('formatReviewItemTitle - Exercise Patterns', () => {
  describe('standard exercise format (subject-tN-exM)', () => {
    it('formats exercise with topic and number', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-ex01',
        itemType: 'exercise',
      });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('strips leading zeros from exercise numbers', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-ex001',
        itemType: 'exercise',
      });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('formats various exercise patterns', () => {
      expect(formatReviewItemTitle(createReviewItem({
        itemId: 'cs201-t3-ex05',
        itemType: 'exercise',
      }))).toBe('CS201 Topic 3 Exercise 5');

      expect(formatReviewItemTitle(createReviewItem({
        itemId: 'cs301-t5-ex12',
        itemType: 'exercise',
      }))).toBe('CS301 Topic 5 Exercise 12');
    });
  });

  describe('exercise without topic', () => {
    it('formats exercise ID without topic prefix', () => {
      const item = createReviewItem({
        itemId: 'cs101-ex03',
        itemType: 'exercise',
      });
      expect(formatReviewItemTitle(item)).toBe('CS101 Exercise 3');
    });
  });

  describe('math exercises', () => {
    it('formats math exercise IDs correctly', () => {
      expect(formatReviewItemTitle(createReviewItem({
        itemId: 'math101-t1-ex01',
        itemType: 'exercise',
      }))).toBe('MATH101 Topic 1 Exercise 1');

      expect(formatReviewItemTitle(createReviewItem({
        itemId: 'math201-t4-ex10',
        itemType: 'exercise',
      }))).toBe('MATH201 Topic 4 Exercise 10');
    });
  });
});

describe('formatReviewItemTitle - Subject Codes', () => {
  describe('CS subjects', () => {
    const csSubjects = ['cs101', 'cs201', 'cs302', 'cs403', 'cs404'];

    csSubjects.forEach(subject => {
      it(`formats ${subject.toUpperCase()} correctly`, () => {
        const item = createReviewItem({ itemId: `${subject}-quiz-1` });
        expect(formatReviewItemTitle(item)).toBe(`${subject.toUpperCase()} Quiz 1`);
      });
    });
  });

  describe('Math subjects', () => {
    const mathSubjects = ['math101', 'math201', 'math302', 'math404'];

    mathSubjects.forEach(subject => {
      it(`formats ${subject.toUpperCase()} correctly`, () => {
        const item = createReviewItem({ itemId: `${subject}-quiz-1` });
        expect(formatReviewItemTitle(item)).toBe(`${subject.toUpperCase()} Quiz 1`);
      });
    });
  });

  describe('mixed case input', () => {
    it('handles lowercase subject code', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1' });
      expect(formatReviewItemTitle(item)).toContain('CS101');
    });

    it('handles uppercase subject code in ID', () => {
      const item = createReviewItem({ itemId: 'CS101-quiz-1' });
      expect(formatReviewItemTitle(item)).toContain('CS101');
    });

    it('handles mixed case subject code', () => {
      const item = createReviewItem({ itemId: 'Cs101-quiz-1' });
      expect(formatReviewItemTitle(item)).toContain('CS101');
    });
  });
});

describe('formatReviewItemTitle - Edge Cases', () => {
  describe('empty and missing values', () => {
    it('handles empty item ID', () => {
      const item = createReviewItem({ itemId: '', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('Quiz');
    });

    it('handles empty item ID for exercise', () => {
      const item = createReviewItem({ itemId: '', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('Exercise');
    });
  });

  describe('malformed IDs', () => {
    it('handles ID without quiz number', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz');
    });

    it('handles ID with only subject code', () => {
      const item = createReviewItem({ itemId: 'cs101', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz');
    });

    it('handles ID with extra segments', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1b-extra-data' });
      // Should still extract main quiz info
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
    });
  });

  describe('output formatting', () => {
    it('produces output without leading/trailing spaces', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe(title.trim());
    });

    it('produces consistent spacing', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1' });
      const title = formatReviewItemTitle(item);
      // No double spaces
      expect(title).not.toContain('  ');
    });
  });
});

describe('formatReviewItemTitle - Real World Scenarios', () => {
  describe('CS402 AI quizzes (topic-subquiz format)', () => {
    const cs402Quizzes = [
      { id: 'cs402-quiz-1-1', expected: 'CS402 Quiz 1-1' },
      { id: 'cs402-quiz-1-2', expected: 'CS402 Quiz 1-2' },
      { id: 'cs402-quiz-1-3', expected: 'CS402 Quiz 1-3' },
      { id: 'cs402-quiz-2-1', expected: 'CS402 Quiz 2-1' },
      { id: 'cs402-quiz-7-1', expected: 'CS402 Quiz 7-1' },
    ];

    cs402Quizzes.forEach(({ id, expected }) => {
      it(`formats ${id} as "${expected}"`, () => {
        const item = createReviewItem({ itemId: id });
        expect(formatReviewItemTitle(item)).toBe(expected);
      });
    });
  });

  describe('CS101 intro programming quizzes', () => {
    const cs101Quizzes = [
      { id: 'cs101-quiz-1a', expected: 'CS101 Quiz 1A' },
      { id: 'cs101-quiz-1b', expected: 'CS101 Quiz 1B' },
      { id: 'cs101-quiz-1c', expected: 'CS101 Quiz 1C' },
      { id: 'cs101-quiz-5a', expected: 'CS101 Quiz 5A' },
    ];

    cs101Quizzes.forEach(({ id, expected }) => {
      it(`formats ${id} as "${expected}"`, () => {
        const item = createReviewItem({ itemId: id });
        expect(formatReviewItemTitle(item)).toBe(expected);
      });
    });
  });

  describe('Math courses', () => {
    const mathItems = [
      { id: 'math101-quiz-1a', expected: 'MATH101 Quiz 1A' },
      { id: 'math302-quiz-2-1', expected: 'MATH302 Quiz 2-1' },
      { id: 'math201-t2-ex05', type: 'exercise' as const, expected: 'MATH201 Topic 2 Exercise 5' },
    ];

    mathItems.forEach(({ id, type = 'quiz' as const, expected }) => {
      it(`formats ${id} as "${expected}"`, () => {
        const item = createReviewItem({ itemId: id, itemType: type });
        expect(formatReviewItemTitle(item)).toBe(expected);
      });
    });
  });

  describe('exercises across subjects', () => {
    const exercises = [
      { id: 'cs101-t1-ex01', expected: 'CS101 Topic 1 Exercise 1' },
      { id: 'cs201-t3-ex05', expected: 'CS201 Topic 3 Exercise 5' },
      { id: 'cs303-t2-ex10', expected: 'CS303 Topic 2 Exercise 10' },
      { id: 'math101-t4-ex03', expected: 'MATH101 Topic 4 Exercise 3' },
    ];

    exercises.forEach(({ id, expected }) => {
      it(`formats ${id} as "${expected}"`, () => {
        const item = createReviewItem({ itemId: id, itemType: 'exercise' });
        expect(formatReviewItemTitle(item)).toBe(expected);
      });
    });
  });
});

describe('formatReviewItemTitle - Consistency Checks', () => {
  it('quiz type always produces output containing "Quiz"', () => {
    const quizPatterns = [
      'cs101-quiz-1',
      'cs101-quiz-1a',
      'cs101-quiz-1-2',
      'cs101-q1-1',
      'cs101-t1-quiz-1',
    ];

    quizPatterns.forEach(id => {
      const item = createReviewItem({ itemId: id, itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toContain('Quiz');
    });
  });

  it('exercise type always produces output containing "Exercise"', () => {
    const exercisePatterns = [
      'cs101-t1-ex01',
      'cs101-ex01',
      'cs101-t3-ex05',
    ];

    exercisePatterns.forEach(id => {
      const item = createReviewItem({ itemId: id, itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toContain('Exercise');
    });
  });

  it('subject code is always uppercase in output', () => {
    const subjects = ['cs101', 'CS201', 'math301', 'MATH401'];

    subjects.forEach(subject => {
      const item = createReviewItem({ itemId: `${subject}-quiz-1` });
      const title = formatReviewItemTitle(item);
      // Extract subject code from title (first word)
      const outputSubject = title.split(' ')[0];
      expect(outputSubject).toBe(outputSubject.toUpperCase());
    });
  });
});
