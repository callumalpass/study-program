/**
 * Home Page Review Helper Functions Tests
 *
 * Tests for the review item formatting and URL generation functions
 * in home.ts. These functions are critical for the daily review section
 * of the dashboard.
 */

import { describe, it, expect } from 'vitest';
import type { ReviewItem } from '../src/core/types';

// Re-implementation of the regex patterns and functions from home.ts for testing
const SUBJECT_CODE_PATTERN = /^([a-z]+\d+)/i; // Matches subject code at start (e.g., "cs101", "math201")
const TOPIC_NUMBER_PATTERN = /-t(\d+)-/; // Matches "-t{number}-" to extract topic number
const QUIZ_LEVEL_PATTERN = /quiz-([abc])/i; // Matches "quiz-{a|b|c}" for difficulty level
const EXERCISE_NUMBER_PATTERN = /ex(\d+)/i; // Matches "ex{number}" for exercise number (e.g., "ex01")

/**
 * Format a review item ID into a human-readable title
 * (mirrors home.ts implementation)
 */
function formatReviewItemTitle(item: ReviewItem): string {
  const id = item.itemId;

  const subjectMatch = id.match(SUBJECT_CODE_PATTERN);
  const subjectCode = subjectMatch ? subjectMatch[1].toUpperCase() : '';

  const topicMatch = id.match(TOPIC_NUMBER_PATTERN);
  const topicNum = topicMatch ? `Topic ${topicMatch[1]}` : '';

  if (item.itemType === 'quiz') {
    // Format: cs101-t1-quiz-a -> CS101 Topic 1 Quiz A
    const quizMatch = id.match(QUIZ_LEVEL_PATTERN);
    const quizLevel = quizMatch ? `Quiz ${quizMatch[1].toUpperCase()}` : 'Quiz';
    return [subjectCode, topicNum, quizLevel].filter(Boolean).join(' ');
  } else {
    // Format: cs101-t1-ex01 -> CS101 Topic 1 Exercise 1
    const exMatch = id.match(EXERCISE_NUMBER_PATTERN);
    const exNum = exMatch ? `Exercise ${parseInt(exMatch[1], 10)}` : 'Exercise';
    return [subjectCode, topicNum, exNum].filter(Boolean).join(' ');
  }
}

/**
 * Get the navigation URL for a review item
 * (mirrors home.ts implementation)
 */
function getReviewItemUrl(item: ReviewItem): string {
  if (item.itemType === 'quiz') {
    return `#/subject/${item.subjectId}/quiz/${item.itemId}`;
  } else {
    return `#/subject/${item.subjectId}/exercise/${item.itemId}`;
  }
}

// Helper to create review items
function createReviewItem(overrides: Partial<ReviewItem>): ReviewItem {
  return {
    subjectId: 'cs101',
    itemId: 'cs101-t1-quiz-a',
    itemType: 'quiz',
    dueDate: new Date().toISOString(),
    lastReviewDate: new Date().toISOString(),
    streak: 1,
    interval: 1,
    easeFactor: 2.5,
    ...overrides,
  };
}

describe('formatReviewItemTitle', () => {
  describe('quiz formatting', () => {
    it('formats standard quiz ID with topic and level', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-quiz-a',
        itemType: 'quiz',
      });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Quiz A');
    });

    it('formats quiz with different topic numbers', () => {
      const item1 = createReviewItem({ itemId: 'cs101-t2-quiz-b', itemType: 'quiz' });
      const item2 = createReviewItem({ itemId: 'cs201-t7-quiz-c', itemType: 'quiz' });
      const item3 = createReviewItem({ itemId: 'math301-t10-quiz-a', itemType: 'quiz' });

      expect(formatReviewItemTitle(item1)).toBe('CS101 Topic 2 Quiz B');
      expect(formatReviewItemTitle(item2)).toBe('CS201 Topic 7 Quiz C');
      expect(formatReviewItemTitle(item3)).toBe('MATH301 Topic 10 Quiz A');
    });

    it('formats quiz IDs for different subject types', () => {
      const csQuiz = createReviewItem({ itemId: 'cs305-t3-quiz-a', itemType: 'quiz' });
      const mathQuiz = createReviewItem({ itemId: 'math201-t4-quiz-b', itemType: 'quiz' });

      expect(formatReviewItemTitle(csQuiz)).toBe('CS305 Topic 3 Quiz A');
      expect(formatReviewItemTitle(mathQuiz)).toBe('MATH201 Topic 4 Quiz B');
    });

    it('handles lowercase quiz level letters', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-quiz-a', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Quiz A');
    });

    it('handles uppercase quiz level letters in ID', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-quiz-B', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Quiz B');
    });

    it('falls back to "Quiz" when level not found', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-quiz', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Quiz');
    });

    it('handles quiz IDs without topic number', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-a', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz A');
    });
  });

  describe('exercise formatting', () => {
    it('formats standard exercise ID with topic and number', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-ex01',
        itemType: 'exercise',
      });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('formats exercise with different numbers', () => {
      const item1 = createReviewItem({ itemId: 'cs101-t2-ex05', itemType: 'exercise' });
      const item2 = createReviewItem({ itemId: 'cs201-t3-ex12', itemType: 'exercise' });
      const item3 = createReviewItem({ itemId: 'math101-t1-ex99', itemType: 'exercise' });

      expect(formatReviewItemTitle(item1)).toBe('CS101 Topic 2 Exercise 5');
      expect(formatReviewItemTitle(item2)).toBe('CS201 Topic 3 Exercise 12');
      expect(formatReviewItemTitle(item3)).toBe('MATH101 Topic 1 Exercise 99');
    });

    it('strips leading zeros from exercise numbers', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex001', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('handles exercise IDs without topic number', () => {
      const item = createReviewItem({ itemId: 'cs101-ex03', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Exercise 3');
    });

    it('falls back to "Exercise" when number not found', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-exercise', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise');
    });
  });

  describe('edge cases', () => {
    it('handles empty item ID gracefully', () => {
      const item = createReviewItem({ itemId: '', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('Quiz');
    });

    it('handles ID without subject code', () => {
      // Note: 't1' matches SUBJECT_CODE_PATTERN as [a-z]+\d+, so it's interpreted as subject 'T1'
      // This is technically a malformed ID, but the function handles it gracefully
      const item = createReviewItem({ itemId: 't1-quiz-a', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('T1 Quiz A');
    });

    it('handles ID with only subject code', () => {
      const item = createReviewItem({ itemId: 'cs101', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz');
    });

    it('handles complex subject codes', () => {
      const item = createReviewItem({ itemId: 'math404-t2-quiz-c', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH404 Topic 2 Quiz C');
    });

    it('handles IDs with extra segments', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-quiz-a-extra-segment',
        itemType: 'quiz',
      });
      // Should still parse correctly - the patterns are specific enough
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Quiz A');
    });

    it('trims result to avoid extra spaces', () => {
      const item = createReviewItem({ itemId: 'cs101', itemType: 'exercise' });
      // Should not have trailing/leading spaces
      expect(formatReviewItemTitle(item).trim()).toBe(formatReviewItemTitle(item));
    });
  });

  describe('regex pattern matching', () => {
    it('SUBJECT_CODE_PATTERN matches at start of string', () => {
      expect('cs101-t1-quiz-a'.match(SUBJECT_CODE_PATTERN)?.[1]).toBe('cs101');
      expect('MATH201-t2-ex01'.match(SUBJECT_CODE_PATTERN)?.[1]).toBe('MATH201');
    });

    it('TOPIC_NUMBER_PATTERN matches topic numbers', () => {
      expect('cs101-t1-quiz'.match(TOPIC_NUMBER_PATTERN)?.[1]).toBe('1');
      expect('cs101-t12-quiz'.match(TOPIC_NUMBER_PATTERN)?.[1]).toBe('12');
      expect('cs101-topic-1'.match(TOPIC_NUMBER_PATTERN)).toBeNull(); // Wrong format
    });

    it('QUIZ_LEVEL_PATTERN matches quiz levels', () => {
      expect('quiz-a'.match(QUIZ_LEVEL_PATTERN)?.[1]).toBe('a');
      expect('quiz-B'.match(QUIZ_LEVEL_PATTERN)?.[1]).toBe('B');
      expect('quiz-c'.match(QUIZ_LEVEL_PATTERN)?.[1]).toBe('c');
      expect('quiz-d'.match(QUIZ_LEVEL_PATTERN)).toBeNull(); // Only a, b, c
    });

    it('EXERCISE_NUMBER_PATTERN matches exercise numbers', () => {
      expect('ex01'.match(EXERCISE_NUMBER_PATTERN)?.[1]).toBe('01');
      expect('ex123'.match(EXERCISE_NUMBER_PATTERN)?.[1]).toBe('123');
      expect('exercise'.match(EXERCISE_NUMBER_PATTERN)).toBeNull();
    });
  });
});

describe('getReviewItemUrl', () => {
  describe('quiz URLs', () => {
    it('generates correct quiz URL', () => {
      const item = createReviewItem({
        subjectId: 'cs101',
        itemId: 'cs101-t1-quiz-a',
        itemType: 'quiz',
      });
      expect(getReviewItemUrl(item)).toBe('#/subject/cs101/quiz/cs101-t1-quiz-a');
    });

    it('uses correct subjectId in URL', () => {
      const item = createReviewItem({
        subjectId: 'math201',
        itemId: 'math201-t3-quiz-b',
        itemType: 'quiz',
      });
      expect(getReviewItemUrl(item)).toBe('#/subject/math201/quiz/math201-t3-quiz-b');
    });
  });

  describe('exercise URLs', () => {
    it('generates correct exercise URL', () => {
      const item = createReviewItem({
        subjectId: 'cs101',
        itemId: 'cs101-t1-ex01',
        itemType: 'exercise',
      });
      expect(getReviewItemUrl(item)).toBe('#/subject/cs101/exercise/cs101-t1-ex01');
    });

    it('uses correct subjectId in URL', () => {
      const item = createReviewItem({
        subjectId: 'cs305',
        itemId: 'cs305-t5-ex10',
        itemType: 'exercise',
      });
      expect(getReviewItemUrl(item)).toBe('#/subject/cs305/exercise/cs305-t5-ex10');
    });
  });

  describe('URL structure', () => {
    it('starts with hash for client-side routing', () => {
      const quiz = createReviewItem({ itemType: 'quiz' });
      const exercise = createReviewItem({ itemType: 'exercise' });

      expect(getReviewItemUrl(quiz)).toMatch(/^#\//);
      expect(getReviewItemUrl(exercise)).toMatch(/^#\//);
    });

    it('includes subject path segment', () => {
      const item = createReviewItem({ subjectId: 'cs101' });
      expect(getReviewItemUrl(item)).toContain('/subject/cs101/');
    });

    it('includes correct item type path segment', () => {
      const quiz = createReviewItem({ itemType: 'quiz' });
      const exercise = createReviewItem({ itemType: 'exercise' });

      expect(getReviewItemUrl(quiz)).toContain('/quiz/');
      expect(getReviewItemUrl(exercise)).toContain('/exercise/');
    });

    it('includes itemId as last path segment', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-quiz-a',
        itemType: 'quiz',
      });
      expect(getReviewItemUrl(item)).toMatch(/quiz\/cs101-t1-quiz-a$/);
    });
  });

  describe('edge cases', () => {
    it('handles subjectId different from itemId prefix', () => {
      // This might happen with legacy data
      const item = createReviewItem({
        subjectId: 'cs101',
        itemId: 'legacy-quiz-1',
        itemType: 'quiz',
      });
      expect(getReviewItemUrl(item)).toBe('#/subject/cs101/quiz/legacy-quiz-1');
    });

    it('handles empty strings', () => {
      const item = createReviewItem({
        subjectId: '',
        itemId: '',
        itemType: 'quiz',
      });
      expect(getReviewItemUrl(item)).toBe('#/subject//quiz/');
    });

    it('handles special characters in IDs', () => {
      const item = createReviewItem({
        subjectId: 'cs101',
        itemId: 'cs101-t1-quiz-a',
        itemType: 'quiz',
      });
      // Standard IDs don't have special chars, but URL should still work
      expect(getReviewItemUrl(item)).not.toContain(' ');
      expect(getReviewItemUrl(item)).not.toContain('%20');
    });
  });
});

describe('ReviewItem type handling', () => {
  it('both quiz and exercise are valid itemTypes', () => {
    const quiz = createReviewItem({ itemType: 'quiz' });
    const exercise = createReviewItem({ itemType: 'exercise' });

    expect(quiz.itemType).toBe('quiz');
    expect(exercise.itemType).toBe('exercise');
  });

  it('ReviewItem has all required fields', () => {
    const item = createReviewItem({});

    expect(item).toHaveProperty('subjectId');
    expect(item).toHaveProperty('itemId');
    expect(item).toHaveProperty('itemType');
    expect(item).toHaveProperty('dueDate');
    expect(item).toHaveProperty('lastReviewDate');
    expect(item).toHaveProperty('streak');
    expect(item).toHaveProperty('interval');
    expect(item).toHaveProperty('easeFactor');
  });
});
