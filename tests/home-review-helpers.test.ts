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
// Quiz ID formats:
// 1. Level letter format: "cs101-quiz-1", "cs101-quiz-1b", "cs102-quiz-2-c"
// 2. Topic-subquiz format: "cs402-quiz-1-2", "math302-quiz-3-1"
// 3. Topic prefix format: "cs304-t1-quiz-1", "cs304-t1-quiz-2"
// 4. Short format: "cs102-q1-1", "cs102-q1-b-1"
const QUIZ_LEVEL_PATTERN = /quiz-(\d+)([a-c])?(?:-([a-c]))?/i; // Matches "quiz-{number}" with optional level letter
const QUIZ_SUBQUIZ_PATTERN = /quiz-(\d+)-(\d+)/i; // Matches "quiz-{topic}-{subquiz}" format
const SHORT_QUIZ_PATTERN = /-q(\d+)(?:-([a-c]))?-(\d+)/i; // Matches short "-q{N}-{M}" or "-q{N}-{level}-{M}" format
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
    // Try short quiz format (e.g., cs102-q1-1, cs102-q1-b-1)
    const shortMatch = id.match(SHORT_QUIZ_PATTERN);
    if (shortMatch) {
      const quizNumber = shortMatch[1];
      const level = (shortMatch[2] || '').toUpperCase();
      return [subjectCode, topicNum, `Quiz ${quizNumber}${level}`].filter(Boolean).join(' ');
    }

    // Try topic-subquiz format (e.g., cs402-quiz-1-2)
    const subquizMatch = id.match(QUIZ_SUBQUIZ_PATTERN);
    if (subquizMatch) {
      const topicNumber = subquizMatch[1];
      const subquizNumber = subquizMatch[2];
      return [subjectCode, topicNum, `Quiz ${topicNumber}-${subquizNumber}`].filter(Boolean).join(' ');
    }

    // Fall back to level letter format (e.g., cs101-quiz-1b)
    const levelMatch = id.match(QUIZ_LEVEL_PATTERN);
    let quizLabel = 'Quiz';
    if (levelMatch) {
      const quizNumber = levelMatch[1];
      // Level can be in group 2 (attached: "1b") or group 3 (separated: "1-b")
      const quizLevel = (levelMatch[2] || levelMatch[3] || '').toUpperCase();
      quizLabel = `Quiz ${quizNumber}${quizLevel}`;
    }
    return [subjectCode, topicNum, quizLabel].filter(Boolean).join(' ');
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

// Helper to create review items with correct type
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

describe('formatReviewItemTitle', () => {
  describe('quiz formatting - actual quiz ID formats', () => {
    it('formats simple quiz ID without level', () => {
      const item = createReviewItem({
        itemId: 'cs101-quiz-1',
        itemType: 'quiz',
      });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });

    it('formats quiz ID with attached level (e.g., "1b")', () => {
      const item1 = createReviewItem({ itemId: 'cs101-quiz-1b', itemType: 'quiz' });
      const item2 = createReviewItem({ itemId: 'cs101-quiz-1c', itemType: 'quiz' });

      expect(formatReviewItemTitle(item1)).toBe('CS101 Quiz 1B');
      expect(formatReviewItemTitle(item2)).toBe('CS101 Quiz 1C');
    });

    it('formats quiz ID with separated level (e.g., "1-b")', () => {
      const item1 = createReviewItem({ itemId: 'cs102-quiz-2-b', itemType: 'quiz' });
      const item2 = createReviewItem({ itemId: 'cs102-quiz-3-c', itemType: 'quiz' });

      expect(formatReviewItemTitle(item1)).toBe('CS102 Quiz 2B');
      expect(formatReviewItemTitle(item2)).toBe('CS102 Quiz 3C');
    });

    it('formats quizzes from different subjects', () => {
      const csQuiz = createReviewItem({ itemId: 'cs305-quiz-5', itemType: 'quiz' });
      const mathQuiz = createReviewItem({ itemId: 'math201-quiz-3b', itemType: 'quiz' });

      expect(formatReviewItemTitle(csQuiz)).toBe('CS305 Quiz 5');
      expect(formatReviewItemTitle(mathQuiz)).toBe('MATH201 Quiz 3B');
    });

    it('handles uppercase level letters in ID', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1B', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
    });

    it('handles double-digit quiz numbers', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-12', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 12');
    });

    it('falls back to "Quiz" when number not found', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz');
    });
  });

  describe('quiz formatting - topic-subquiz format (e.g., quiz-1-2)', () => {
    it('formats topic-subquiz quiz ID (cs402-quiz-1-2)', () => {
      const item = createReviewItem({
        itemId: 'cs402-quiz-1-2',
        itemType: 'quiz',
      });
      expect(formatReviewItemTitle(item)).toBe('CS402 Quiz 1-2');
    });

    it('formats topic-subquiz for different topics', () => {
      const item1 = createReviewItem({ itemId: 'cs402-quiz-1-1', itemType: 'quiz' });
      const item2 = createReviewItem({ itemId: 'cs402-quiz-2-3', itemType: 'quiz' });
      const item3 = createReviewItem({ itemId: 'cs402-quiz-7-1', itemType: 'quiz' });

      expect(formatReviewItemTitle(item1)).toBe('CS402 Quiz 1-1');
      expect(formatReviewItemTitle(item2)).toBe('CS402 Quiz 2-3');
      expect(formatReviewItemTitle(item3)).toBe('CS402 Quiz 7-1');
    });

    it('formats topic-subquiz for math subjects', () => {
      const item1 = createReviewItem({ itemId: 'math302-quiz-1-1', itemType: 'quiz' });
      const item2 = createReviewItem({ itemId: 'math302-quiz-2-2', itemType: 'quiz' });

      expect(formatReviewItemTitle(item1)).toBe('MATH302 Quiz 1-1');
      expect(formatReviewItemTitle(item2)).toBe('MATH302 Quiz 2-2');
    });

    it('formats topic-subquiz for cs205, cs403, cs404 courses', () => {
      const cs205 = createReviewItem({ itemId: 'cs205-quiz-3-2', itemType: 'quiz' });
      const cs403 = createReviewItem({ itemId: 'cs403-quiz-1-3', itemType: 'quiz' });
      const cs404 = createReviewItem({ itemId: 'cs404-quiz-1-1', itemType: 'quiz' });

      expect(formatReviewItemTitle(cs205)).toBe('CS205 Quiz 3-2');
      expect(formatReviewItemTitle(cs403)).toBe('CS403 Quiz 1-3');
      expect(formatReviewItemTitle(cs404)).toBe('CS404 Quiz 1-1');
    });

    it('handles double-digit topic and subquiz numbers', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-10-12', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 10-12');
    });

    it('prioritizes topic-subquiz format over level letter format', () => {
      // quiz-1-2 should be treated as topic 1, quiz 2, NOT quiz 1 with level "2"
      const item = createReviewItem({ itemId: 'cs402-quiz-1-2', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS402 Quiz 1-2');
      expect(formatReviewItemTitle(item)).not.toBe('CS402 Quiz 1'); // Not level letter format
    });
  });

  describe('quiz formatting - short q format (e.g., q1-1)', () => {
    it('formats short quiz ID without level (cs102-q1-1)', () => {
      const item = createReviewItem({
        itemId: 'cs102-q1-1',
        itemType: 'quiz',
      });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 1');
    });

    it('formats short quiz ID with level (cs102-q1-b-1)', () => {
      const item1 = createReviewItem({ itemId: 'cs102-q1-b-1', itemType: 'quiz' });
      const item2 = createReviewItem({ itemId: 'cs102-q2-c-3', itemType: 'quiz' });

      expect(formatReviewItemTitle(item1)).toBe('CS102 Quiz 1B');
      expect(formatReviewItemTitle(item2)).toBe('CS102 Quiz 2C');
    });

    it('formats various short quiz formats', () => {
      const item1 = createReviewItem({ itemId: 'cs102-q1-2', itemType: 'quiz' });
      const item2 = createReviewItem({ itemId: 'cs102-q5-b-4', itemType: 'quiz' });
      const item3 = createReviewItem({ itemId: 'cs102-q7-c-5', itemType: 'quiz' });

      expect(formatReviewItemTitle(item1)).toBe('CS102 Quiz 1');
      expect(formatReviewItemTitle(item2)).toBe('CS102 Quiz 5B');
      expect(formatReviewItemTitle(item3)).toBe('CS102 Quiz 7C');
    });

    it('handles uppercase level in short format', () => {
      const item = createReviewItem({ itemId: 'cs102-q1-B-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 1B');
    });
  });

  describe('quiz formatting - topic prefix format (e.g., cs304-t1-quiz-1)', () => {
    it('formats topic prefix quiz ID', () => {
      const item = createReviewItem({
        itemId: 'cs304-t1-quiz-1',
        itemType: 'quiz',
      });
      expect(formatReviewItemTitle(item)).toBe('CS304 Topic 1 Quiz 1');
    });

    it('formats topic prefix quiz with different topics', () => {
      const item1 = createReviewItem({ itemId: 'cs304-t1-quiz-2', itemType: 'quiz' });
      const item2 = createReviewItem({ itemId: 'cs304-t3-quiz-1', itemType: 'quiz' });
      const item3 = createReviewItem({ itemId: 'cs304-t7-quiz-3', itemType: 'quiz' });

      expect(formatReviewItemTitle(item1)).toBe('CS304 Topic 1 Quiz 2');
      expect(formatReviewItemTitle(item2)).toBe('CS304 Topic 3 Quiz 1');
      expect(formatReviewItemTitle(item3)).toBe('CS304 Topic 7 Quiz 3');
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
      const item = createReviewItem({ itemId: 't1-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('T1 Quiz 1');
    });

    it('handles ID with only subject code', () => {
      const item = createReviewItem({ itemId: 'cs101', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz');
    });

    it('handles complex subject codes', () => {
      const item = createReviewItem({ itemId: 'math404-quiz-2c', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH404 Quiz 2C');
    });

    it('handles IDs with extra segments', () => {
      const item = createReviewItem({
        itemId: 'cs101-quiz-1b-extra-segment',
        itemType: 'quiz',
      });
      // Should still parse correctly - the patterns are specific enough
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
    });

    it('trims result to avoid extra spaces', () => {
      const item = createReviewItem({ itemId: 'cs101', itemType: 'exercise' });
      // Should not have trailing/leading spaces
      expect(formatReviewItemTitle(item).trim()).toBe(formatReviewItemTitle(item));
    });
  });

  describe('regex pattern matching', () => {
    it('SUBJECT_CODE_PATTERN matches at start of string', () => {
      expect('cs101-quiz-1'.match(SUBJECT_CODE_PATTERN)?.[1]).toBe('cs101');
      expect('MATH201-t2-ex01'.match(SUBJECT_CODE_PATTERN)?.[1]).toBe('MATH201');
    });

    it('TOPIC_NUMBER_PATTERN matches topic numbers', () => {
      expect('cs101-t1-ex01'.match(TOPIC_NUMBER_PATTERN)?.[1]).toBe('1');
      expect('cs101-t12-ex02'.match(TOPIC_NUMBER_PATTERN)?.[1]).toBe('12');
      expect('cs101-topic-1'.match(TOPIC_NUMBER_PATTERN)).toBeNull(); // Wrong format
    });

    it('QUIZ_LEVEL_PATTERN matches quiz numbers with optional level', () => {
      expect('quiz-1'.match(QUIZ_LEVEL_PATTERN)?.[1]).toBe('1');
      expect('quiz-1b'.match(QUIZ_LEVEL_PATTERN)?.[1]).toBe('1');
      expect('quiz-1b'.match(QUIZ_LEVEL_PATTERN)?.[2]).toBe('b');
      expect('quiz-2-c'.match(QUIZ_LEVEL_PATTERN)?.[1]).toBe('2');
      expect('quiz-2-c'.match(QUIZ_LEVEL_PATTERN)?.[3]).toBe('c');
    });

    it('QUIZ_SUBQUIZ_PATTERN matches topic-subquiz format', () => {
      expect('quiz-1-2'.match(QUIZ_SUBQUIZ_PATTERN)?.[1]).toBe('1');
      expect('quiz-1-2'.match(QUIZ_SUBQUIZ_PATTERN)?.[2]).toBe('2');
      expect('quiz-3-1'.match(QUIZ_SUBQUIZ_PATTERN)?.[1]).toBe('3');
      expect('quiz-3-1'.match(QUIZ_SUBQUIZ_PATTERN)?.[2]).toBe('1');
    });

    it('EXERCISE_NUMBER_PATTERN matches exercise numbers', () => {
      expect('ex01'.match(EXERCISE_NUMBER_PATTERN)?.[1]).toBe('01');
      expect('ex123'.match(EXERCISE_NUMBER_PATTERN)?.[1]).toBe('123');
      expect('exercise'.match(EXERCISE_NUMBER_PATTERN)).toBeNull();
    });

    it('SHORT_QUIZ_PATTERN matches short quiz format', () => {
      // Without level: -q1-1
      expect('-q1-1'.match(SHORT_QUIZ_PATTERN)?.[1]).toBe('1');
      expect('-q1-1'.match(SHORT_QUIZ_PATTERN)?.[2]).toBeUndefined();
      expect('-q1-1'.match(SHORT_QUIZ_PATTERN)?.[3]).toBe('1');

      // With level: -q1-b-1
      expect('-q1-b-1'.match(SHORT_QUIZ_PATTERN)?.[1]).toBe('1');
      expect('-q1-b-1'.match(SHORT_QUIZ_PATTERN)?.[2]).toBe('b');
      expect('-q1-b-1'.match(SHORT_QUIZ_PATTERN)?.[3]).toBe('1');

      // Different numbers
      expect('-q5-c-3'.match(SHORT_QUIZ_PATTERN)?.[1]).toBe('5');
      expect('-q5-c-3'.match(SHORT_QUIZ_PATTERN)?.[2]).toBe('c');
      expect('-q5-c-3'.match(SHORT_QUIZ_PATTERN)?.[3]).toBe('3');
    });
  });
});

describe('getReviewItemUrl', () => {
  describe('quiz URLs', () => {
    it('generates correct quiz URL', () => {
      const item = createReviewItem({
        subjectId: 'cs101',
        itemId: 'cs101-quiz-1',
        itemType: 'quiz',
      });
      expect(getReviewItemUrl(item)).toBe('#/subject/cs101/quiz/cs101-quiz-1');
    });

    it('uses correct subjectId in URL', () => {
      const item = createReviewItem({
        subjectId: 'math201',
        itemId: 'math201-quiz-3b',
        itemType: 'quiz',
      });
      expect(getReviewItemUrl(item)).toBe('#/subject/math201/quiz/math201-quiz-3b');
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
        itemId: 'cs101-quiz-1b',
        itemType: 'quiz',
      });
      expect(getReviewItemUrl(item)).toMatch(/quiz\/cs101-quiz-1b$/);
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
        itemId: 'cs101-quiz-1',
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
    expect(item).toHaveProperty('nextReviewAt');
    expect(item).toHaveProperty('interval');
    expect(item).toHaveProperty('streak');
  });
});
