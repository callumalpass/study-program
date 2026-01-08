/**
 * Home Review Format Edge Cases Tests
 *
 * Additional edge case tests for the formatReviewItemTitle function
 * to ensure robust handling of unusual or malformed input.
 */

import { describe, it, expect } from 'vitest';
import type { ReviewItem } from '../src/core/types';

// Regex patterns from home.ts
const SUBJECT_CODE_PATTERN = /^([a-z]+\d+)/i;
const TOPIC_NUMBER_PATTERN = /-t(\d+)-/;
const QUIZ_LEVEL_PATTERN = /quiz-(\d+)([a-c])?(?:-([a-c]))?/i;
const QUIZ_SUBQUIZ_PATTERN = /quiz-(\d+)-(\d+)/i;
const EXERCISE_NUMBER_PATTERN = /ex(\d+)/i;

function formatReviewItemTitle(item: ReviewItem): string {
  const id = item.itemId;

  const subjectMatch = id.match(SUBJECT_CODE_PATTERN);
  const subjectCode = subjectMatch ? subjectMatch[1].toUpperCase() : '';

  const topicMatch = id.match(TOPIC_NUMBER_PATTERN);
  const topicNum = topicMatch ? `Topic ${topicMatch[1]}` : '';

  if (item.itemType === 'quiz') {
    // Try topic-subquiz format first (e.g., cs402-quiz-1-2)
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
      const quizLevel = (levelMatch[2] || levelMatch[3] || '').toUpperCase();
      quizLabel = `Quiz ${quizNumber}${quizLevel}`;
    }
    return [subjectCode, topicNum, quizLabel].filter(Boolean).join(' ');
  } else {
    const exMatch = id.match(EXERCISE_NUMBER_PATTERN);
    const exNum = exMatch ? `Exercise ${parseInt(exMatch[1], 10)}` : 'Exercise';
    return [subjectCode, topicNum, exNum].filter(Boolean).join(' ');
  }
}

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

describe('formatReviewItemTitle - Malformed Input Edge Cases', () => {
  describe('empty or minimal IDs', () => {
    it('handles empty string ID gracefully', () => {
      const item = createReviewItem({ itemId: '', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('Quiz');
    });

    it('handles ID with no recognizable pattern for quiz', () => {
      const item = createReviewItem({ itemId: 'unknown-format', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('Quiz');
    });

    it('handles ID with no recognizable pattern for exercise', () => {
      const item = createReviewItem({ itemId: 'unknown-format', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('Exercise');
    });
  });

  describe('partial pattern matches', () => {
    it('handles ID with subject but no quiz number', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz');
    });

    it('handles ID with subject but no exercise number', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-exercise', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 1 Exercise');
    });

    it('handles ID with only subject code', () => {
      const item = createReviewItem({ itemId: 'cs101', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz');
    });
  });

  describe('unusual subject codes', () => {
    it('handles very long subject codes', () => {
      const item = createReviewItem({ itemId: 'computerscience12345-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('COMPUTERSCIENCE12345 Quiz 1');
    });

    it('handles single character subject prefix', () => {
      const item = createReviewItem({ itemId: 'a1-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('A1 Quiz 1');
    });

    it('handles subject code with many digits', () => {
      const item = createReviewItem({ itemId: 'cs999999-quiz-1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS999999 Quiz 1');
    });
  });

  describe('unusual quiz numbers', () => {
    it('handles quiz number 0', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-0', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 0');
    });

    it('handles very large quiz numbers', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-999', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 999');
    });

    it('handles quiz number with leading zeros', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-001', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 001');
    });
  });

  describe('topic-subquiz format edge cases', () => {
    it('handles topic-subquiz format with zeros', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-0-0', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 0-0');
    });

    it('handles topic-subquiz format with large numbers', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-99-99', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 99-99');
    });

    it('handles topic-subquiz format with leading zeros in topic', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-01-2', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 01-2');
    });

    it('handles topic-subquiz format with leading zeros in subquiz', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1-02', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1-02');
    });

    it('topic-subquiz format takes precedence for quiz-X-Y patterns', () => {
      // quiz-1-2 matches QUIZ_SUBQUIZ_PATTERN, not level letter
      const item = createReviewItem({ itemId: 'cs402-quiz-1-2', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      // Should be "Quiz 1-2", not "Quiz 1" (treating 2 as something else)
      expect(result).toBe('CS402 Quiz 1-2');
    });

    it('falls back to level letter for quiz-X-Y where Y is a-c', () => {
      // quiz-1-a should use level letter format since 'a' is a valid level
      // However, our pattern checks subquiz first (numeric only), so quiz-1-a won't match
      const item = createReviewItem({ itemId: 'cs101-quiz-1-a', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      // Level pattern handles this: quiz-1-a
      expect(result).toBe('CS101 Quiz 1A');
    });
  });

  describe('unusual exercise numbers', () => {
    it('handles exercise number 0', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex0', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 1 Exercise 0');
    });

    it('handles very large exercise numbers', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex999', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 1 Exercise 999');
    });

    it('strips leading zeros from exercise numbers', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex007', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 1 Exercise 7');
    });
  });

  describe('unusual topic numbers', () => {
    it('handles topic number 0', () => {
      const item = createReviewItem({ itemId: 'cs101-t0-ex01', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 0 Exercise 1');
    });

    it('handles very large topic numbers', () => {
      const item = createReviewItem({ itemId: 'cs101-t999-ex01', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 999 Exercise 1');
    });
  });

  describe('quiz level variations', () => {
    it('handles uppercase quiz level in ID', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1A', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1A');
    });

    it('handles lowercase quiz level in ID', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1a', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1A');
    });

    it('handles separated quiz level format', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1-a', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1A');
    });

    it('handles separated uppercase quiz level', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1-B', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Quiz 1B');
    });
  });

  describe('special characters and whitespace', () => {
    it('handles ID with underscores', () => {
      const item = createReviewItem({ itemId: 'cs_101_quiz_1', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      // Underscores won't match the patterns, so we get fallback behavior
      expect(result).toBe('Quiz');
    });

    it('handles ID with mixed separators (underscore breaks topic pattern)', () => {
      // The topic pattern requires dashes on both sides: -t1-
      // An underscore before t1 means the topic won't be extracted
      const item = createReviewItem({ itemId: 'cs101_t1-ex01', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Exercise 1'); // No topic because underscore breaks pattern
    });
  });
});

describe('formatReviewItemTitle - Regex Pattern Coverage', () => {
  describe('SUBJECT_CODE_PATTERN edge cases', () => {
    it('matches subject code at very start', () => {
      const match = 'cs101-other-stuff'.match(SUBJECT_CODE_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs101');
    });

    it('does not match if numbers come first', () => {
      const match = '123cs-quiz-1'.match(SUBJECT_CODE_PATTERN);
      expect(match).toBeNull();
    });

    it('handles case insensitivity', () => {
      const match1 = 'CS101-quiz'.match(SUBJECT_CODE_PATTERN);
      const match2 = 'cs101-quiz'.match(SUBJECT_CODE_PATTERN);
      const match3 = 'Cs101-quiz'.match(SUBJECT_CODE_PATTERN);

      expect(match1![1]).toBe('CS101');
      expect(match2![1]).toBe('cs101');
      expect(match3![1]).toBe('Cs101');
    });
  });

  describe('TOPIC_NUMBER_PATTERN edge cases', () => {
    it('requires dashes on both sides', () => {
      const match1 = '-t1-'.match(TOPIC_NUMBER_PATTERN);
      const match2 = 't1-'.match(TOPIC_NUMBER_PATTERN);
      const match3 = '-t1'.match(TOPIC_NUMBER_PATTERN);

      expect(match1).not.toBeNull();
      expect(match2).toBeNull();
      expect(match3).toBeNull();
    });

    it('captures only the topic number', () => {
      const match = 'cs101-t42-ex01'.match(TOPIC_NUMBER_PATTERN);
      expect(match![1]).toBe('42');
    });
  });

  describe('QUIZ_LEVEL_PATTERN edge cases', () => {
    it('matches quiz without level', () => {
      const match = 'quiz-5'.match(QUIZ_LEVEL_PATTERN);
      expect(match![1]).toBe('5');
      expect(match![2]).toBeUndefined();
      expect(match![3]).toBeUndefined();
    });

    it('matches quiz with attached level', () => {
      const match = 'quiz-5b'.match(QUIZ_LEVEL_PATTERN);
      expect(match![1]).toBe('5');
      expect(match![2]).toBe('b');
    });

    it('matches quiz with separated level', () => {
      const match = 'quiz-5-c'.match(QUIZ_LEVEL_PATTERN);
      expect(match![1]).toBe('5');
      expect(match![3]).toBe('c');
    });

    it('only matches levels a, b, c', () => {
      const matchA = 'quiz-1a'.match(QUIZ_LEVEL_PATTERN);
      const matchB = 'quiz-1b'.match(QUIZ_LEVEL_PATTERN);
      const matchC = 'quiz-1c'.match(QUIZ_LEVEL_PATTERN);
      const matchD = 'quiz-1d'.match(QUIZ_LEVEL_PATTERN);

      expect(matchA![2]).toBe('a');
      expect(matchB![2]).toBe('b');
      expect(matchC![2]).toBe('c');
      expect(matchD![2]).toBeUndefined(); // 'd' is not a valid level
    });
  });

  describe('QUIZ_SUBQUIZ_PATTERN edge cases', () => {
    it('matches topic-subquiz format', () => {
      const match = 'quiz-1-2'.match(QUIZ_SUBQUIZ_PATTERN);
      expect(match![1]).toBe('1');
      expect(match![2]).toBe('2');
    });

    it('matches different topic and subquiz numbers', () => {
      const match = 'cs402-quiz-3-1'.match(QUIZ_SUBQUIZ_PATTERN);
      expect(match![1]).toBe('3');
      expect(match![2]).toBe('1');
    });

    it('handles double-digit numbers', () => {
      const match = 'quiz-10-12'.match(QUIZ_SUBQUIZ_PATTERN);
      expect(match![1]).toBe('10');
      expect(match![2]).toBe('12');
    });
  });

  describe('EXERCISE_NUMBER_PATTERN edge cases', () => {
    it('matches exercise number anywhere in string', () => {
      const match = 'anything-ex123-more'.match(EXERCISE_NUMBER_PATTERN);
      expect(match![1]).toBe('123');
    });

    it('captures full exercise number including leading zeros', () => {
      const match = 'cs101-t1-ex007'.match(EXERCISE_NUMBER_PATTERN);
      expect(match![1]).toBe('007');
    });

    it('is case insensitive', () => {
      const match1 = 'EX01'.match(EXERCISE_NUMBER_PATTERN);
      const match2 = 'ex01'.match(EXERCISE_NUMBER_PATTERN);
      const match3 = 'Ex01'.match(EXERCISE_NUMBER_PATTERN);

      expect(match1![1]).toBe('01');
      expect(match2![1]).toBe('01');
      expect(match3![1]).toBe('01');
    });
  });
});

describe('formatReviewItemTitle - Type Handling', () => {
  describe('itemType consistency', () => {
    it('always includes Quiz label for quiz type', () => {
      const item = createReviewItem({ itemId: 'anything', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toContain('Quiz');
    });

    it('always includes Exercise label for exercise type', () => {
      const item = createReviewItem({ itemId: 'anything', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toContain('Exercise');
    });

    it('quiz type ignores exercise patterns in ID', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', itemType: 'quiz' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Topic 1 Quiz');
      expect(result).not.toContain('Exercise');
    });

    it('exercise type ignores quiz patterns in ID', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1a', itemType: 'exercise' });
      const result = formatReviewItemTitle(item);
      expect(result).toBe('CS101 Exercise');
      expect(result).not.toContain('Quiz');
    });
  });
});
