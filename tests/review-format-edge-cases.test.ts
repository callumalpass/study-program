/**
 * Review Format Edge Cases Tests
 *
 * Tests for edge cases in formatting review items for display including:
 * - Unusual ID patterns
 * - Missing or malformed components
 * - Special characters in IDs
 * - Very long IDs
 * - Legacy format support
 */

import { describe, it, expect } from 'vitest';
import type { ReviewItem } from '../src/core/types';

// Re-implementation of patterns and function from home.ts for isolated testing
const SUBJECT_CODE_PATTERN = /^([a-z]+\d+)/i;
const TOPIC_NUMBER_PATTERN = /-t(\d+)-/;
const QUIZ_NUMBER_PATTERN = /quiz-(\d+)([a-c])?(?:-([a-c]))?/i;
const EXERCISE_NUMBER_PATTERN = /ex(\d+)/i;

function formatReviewItemTitle(item: ReviewItem): string {
  const id = item.itemId;

  const subjectMatch = id.match(SUBJECT_CODE_PATTERN);
  const subjectCode = subjectMatch ? subjectMatch[1].toUpperCase() : '';

  const topicMatch = id.match(TOPIC_NUMBER_PATTERN);
  const topicNum = topicMatch ? `Topic ${topicMatch[1]}` : '';

  if (item.itemType === 'quiz') {
    const quizMatch = id.match(QUIZ_NUMBER_PATTERN);
    let quizLabel = 'Quiz';
    if (quizMatch) {
      const quizNumber = quizMatch[1];
      const quizLevel = (quizMatch[2] || quizMatch[3] || '').toUpperCase();
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

describe('Review Format Edge Cases', () => {
  describe('malformed or unusual IDs', () => {
    it('handles ID with no subject code', () => {
      const item = createReviewItem({ itemId: 'quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('Quiz 1');
    });

    it('handles ID with no numbers', () => {
      const item = createReviewItem({ itemId: 'cs-quiz', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      // cs doesn't have numbers so it won't match SUBJECT_CODE_PATTERN
      expect(title).toBe('Quiz');
    });

    it('handles empty ID', () => {
      const item = createReviewItem({ itemId: '', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('Quiz');
    });

    it('handles ID with only numbers', () => {
      const item = createReviewItem({ itemId: '123-quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      // 123 doesn't match because SUBJECT_CODE_PATTERN requires letters first
      expect(title).toBe('Quiz 1');
    });

    it('handles ID with special characters', () => {
      const item = createReviewItem({ itemId: 'cs101_quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      // The underscore shouldn't affect the subject code match
      expect(title).toBe('CS101 Quiz 1');
    });
  });

  describe('very long IDs', () => {
    it('handles very long subject code', () => {
      const item = createReviewItem({
        itemId: 'csadvancedprogramming101-quiz-1',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CSADVANCEDPROGRAMMING101 Quiz 1');
    });

    it('handles very high quiz number', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-999', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Quiz 999');
    });

    it('handles very high topic number', () => {
      const item = createReviewItem({
        itemId: 'cs101-t99-ex01',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 99 Exercise 1');
    });

    it('handles very high exercise number', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-ex999',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 1 Exercise 999');
    });
  });

  describe('quiz level variations', () => {
    it('handles uppercase quiz level A', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1A', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Quiz 1A');
    });

    it('handles lowercase quiz level a', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1a', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Quiz 1A');
    });

    it('handles quiz with alternate level format (quiz-1-a)', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1-a', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      // The pattern quiz-(\d+)([a-c])?(?:-([a-c]))? should match -a as group 3
      expect(title).toBe('CS101 Quiz 1A');
    });

    it('handles quiz level B', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1b', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Quiz 1B');
    });

    it('handles quiz level C', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1c', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Quiz 1C');
    });

    it('handles quiz with no level', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-5', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Quiz 5');
    });
  });

  describe('exercise ID variations', () => {
    it('handles exercise with leading zeros', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-ex001',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 1 Exercise 1');
    });

    it('handles exercise without leading zeros', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-ex1',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 1 Exercise 1');
    });

    it('handles exercise with uppercase EX', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-EX01',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 1 Exercise 1');
    });

    it('handles exercise without topic number', () => {
      const item = createReviewItem({
        itemId: 'cs101-ex01',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      // No topic match, so just subject and exercise
      expect(title).toBe('CS101 Exercise 1');
    });
  });

  describe('subject code variations', () => {
    it('handles single letter subject prefix', () => {
      const item = createReviewItem({ itemId: 'x101-quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('X101 Quiz 1');
    });

    it('handles long subject prefix', () => {
      const item = createReviewItem({
        itemId: 'compsci101-quiz-1',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('COMPSCI101 Quiz 1');
    });

    it('handles 4-digit course number', () => {
      const item = createReviewItem({
        itemId: 'cs1001-quiz-1',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS1001 Quiz 1');
    });

    it('handles 2-digit course number', () => {
      const item = createReviewItem({ itemId: 'cs10-quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS10 Quiz 1');
    });

    it('handles single digit course number', () => {
      const item = createReviewItem({ itemId: 'cs1-quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS1 Quiz 1');
    });
  });

  describe('topic number variations', () => {
    it('handles single digit topic', () => {
      const item = createReviewItem({
        itemId: 'cs101-t5-ex01',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 5 Exercise 1');
    });

    it('handles double digit topic', () => {
      const item = createReviewItem({
        itemId: 'cs101-t12-ex01',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 12 Exercise 1');
    });

    it('handles topic 0', () => {
      const item = createReviewItem({
        itemId: 'cs101-t0-ex01',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS101 Topic 0 Exercise 1');
    });
  });

  describe('item type handling', () => {
    it('treats unknown item type as exercise', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-unknown01',
        itemType: 'exercise' as const,
      });
      const title = formatReviewItemTitle(item);
      // Won't match exercise pattern, so falls back to 'Exercise'
      expect(title).toBe('CS101 Topic 1 Exercise');
    });

    it('quiz type ignores exercise patterns', () => {
      const item = createReviewItem({
        itemId: 'cs101-t1-ex01',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      // Even though ID looks like an exercise, type says quiz
      expect(title).toBe('CS101 Topic 1 Quiz');
    });

    it('exercise type ignores quiz patterns', () => {
      const item = createReviewItem({
        itemId: 'cs101-quiz-1a',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      // Even though ID looks like a quiz, type says exercise
      expect(title).toBe('CS101 Exercise');
    });
  });

  describe('output format consistency', () => {
    it('never produces double spaces', () => {
      const testCases = [
        { itemId: 'cs101-quiz-1', itemType: 'quiz' as const },
        { itemId: '-quiz-1', itemType: 'quiz' as const },
        { itemId: 'cs101--quiz-1', itemType: 'quiz' as const },
        { itemId: 'cs101-t1-ex01', itemType: 'exercise' as const },
        { itemId: '-t1-ex01', itemType: 'exercise' as const },
      ];

      for (const tc of testCases) {
        const item = createReviewItem(tc);
        const title = formatReviewItemTitle(item);
        expect(title).not.toMatch(/  /);
      }
    });

    it('never produces leading or trailing spaces', () => {
      const testCases = [
        { itemId: 'cs101-quiz-1', itemType: 'quiz' as const },
        { itemId: 'quiz-1', itemType: 'quiz' as const },
        { itemId: '', itemType: 'quiz' as const },
        { itemId: 'cs101-t1-ex01', itemType: 'exercise' as const },
      ];

      for (const tc of testCases) {
        const item = createReviewItem(tc);
        const title = formatReviewItemTitle(item);
        expect(title).toBe(title.trim());
      }
    });

    it('always produces a non-empty string', () => {
      const testCases = [
        { itemId: '', itemType: 'quiz' as const },
        { itemId: '---', itemType: 'quiz' as const },
        { itemId: '123', itemType: 'quiz' as const },
        { itemId: '', itemType: 'exercise' as const },
      ];

      for (const tc of testCases) {
        const item = createReviewItem(tc);
        const title = formatReviewItemTitle(item);
        expect(title.length).toBeGreaterThan(0);
      }
    });
  });

  describe('real-world edge cases from curriculum', () => {
    it('formats CS302 networking quiz correctly', () => {
      const item = createReviewItem({
        itemId: 'cs302-quiz-2a',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS302 Quiz 2A');
    });

    it('formats MATH404 advanced math quiz correctly', () => {
      const item = createReviewItem({
        itemId: 'math404-quiz-7c',
        itemType: 'quiz'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('MATH404 Quiz 7C');
    });

    it('formats CS407 capstone exercise correctly', () => {
      const item = createReviewItem({
        itemId: 'cs407-t6-ex03',
        itemType: 'exercise'
      });
      const title = formatReviewItemTitle(item);
      expect(title).toBe('CS407 Topic 6 Exercise 3');
    });
  });
});

describe('Review Format Pattern Matching', () => {
  describe('SUBJECT_CODE_PATTERN behavior', () => {
    it('matches standard format cs101', () => {
      const match = 'cs101-quiz-1'.match(SUBJECT_CODE_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('cs101');
    });

    it('matches math prefix', () => {
      const match = 'math201-quiz-1'.match(SUBJECT_CODE_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('math201');
    });

    it('does not match if starts with number', () => {
      const match = '101cs-quiz-1'.match(SUBJECT_CODE_PATTERN);
      expect(match).toBeNull();
    });

    it('stops at first non-alphanumeric character', () => {
      const match = 'cs101-quiz-1'.match(SUBJECT_CODE_PATTERN);
      expect(match![1]).toBe('cs101');
    });
  });

  describe('TOPIC_NUMBER_PATTERN behavior', () => {
    it('matches -t1- pattern', () => {
      const match = 'cs101-t1-ex01'.match(TOPIC_NUMBER_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('1');
    });

    it('matches double digit topics', () => {
      const match = 'cs101-t12-ex01'.match(TOPIC_NUMBER_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('12');
    });

    it('does not match without surrounding dashes', () => {
      const match1 = 'cs101t1-ex01'.match(TOPIC_NUMBER_PATTERN);
      const match2 = 'cs101-t1ex01'.match(TOPIC_NUMBER_PATTERN);
      expect(match1).toBeNull();
      expect(match2).toBeNull();
    });
  });

  describe('QUIZ_NUMBER_PATTERN behavior', () => {
    it('matches quiz-1', () => {
      const match = 'cs101-quiz-1'.match(QUIZ_NUMBER_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('1');
      expect(match![2]).toBeUndefined();
    });

    it('matches quiz-1a (level attached)', () => {
      const match = 'cs101-quiz-1a'.match(QUIZ_NUMBER_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('1');
      expect(match![2]).toBe('a');
    });

    it('matches quiz-1-a (level separated)', () => {
      const match = 'cs101-quiz-1-a'.match(QUIZ_NUMBER_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('1');
      expect(match![3]).toBe('a');
    });

    it('is case insensitive', () => {
      const match1 = 'cs101-Quiz-1A'.match(QUIZ_NUMBER_PATTERN);
      const match2 = 'cs101-QUIZ-1a'.match(QUIZ_NUMBER_PATTERN);
      expect(match1).not.toBeNull();
      expect(match2).not.toBeNull();
    });
  });

  describe('EXERCISE_NUMBER_PATTERN behavior', () => {
    it('matches ex01', () => {
      const match = 'cs101-t1-ex01'.match(EXERCISE_NUMBER_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('01');
    });

    it('matches ex1 without leading zero', () => {
      const match = 'cs101-t1-ex1'.match(EXERCISE_NUMBER_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('1');
    });

    it('is case insensitive', () => {
      const match1 = 'cs101-t1-EX01'.match(EXERCISE_NUMBER_PATTERN);
      const match2 = 'cs101-t1-Ex01'.match(EXERCISE_NUMBER_PATTERN);
      expect(match1).not.toBeNull();
      expect(match2).not.toBeNull();
    });

    it('matches exercise numbers anywhere in string', () => {
      const match = 'someprefix-ex99-suffix'.match(EXERCISE_NUMBER_PATTERN);
      expect(match).not.toBeNull();
      expect(match![1]).toBe('99');
    });
  });
});
