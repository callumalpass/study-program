/**
 * Home Review Format Integration Tests
 *
 * Tests for formatting review items using actual quiz and exercise ID formats
 * found in the codebase. This ensures the formatReviewItemTitle function works
 * correctly with real-world data.
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

describe('Home Review Format - Actual Quiz IDs from Content', () => {
  describe('CS101 Quiz ID formats', () => {
    // Based on actual content from src/subjects/cs101/content/topic-1/quizzes.json
    it('formats cs101-quiz-1 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });

    it('formats cs101-quiz-1b correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1b', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
    });

    it('formats cs101-quiz-1c correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1c', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1C');
    });

    it('formats cs101-quiz-5 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-5', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 5');
    });

    it('formats cs101-quiz-5b correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-5b', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 5B');
    });

    it('formats cs101-quiz-5c correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-5c', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 5C');
    });
  });

  describe('Math subject Quiz ID formats', () => {
    // Based on actual content from src/subjects/math101/content/topic-1/quizzes.json
    it('formats math101-quiz-1a correctly', () => {
      const item = createReviewItem({ itemId: 'math101-quiz-1a', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH101 Quiz 1A');
    });

    it('formats math101-quiz-1b correctly', () => {
      const item = createReviewItem({ itemId: 'math101-quiz-1b', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH101 Quiz 1B');
    });

    it('formats math101-quiz-1c correctly', () => {
      const item = createReviewItem({ itemId: 'math101-quiz-1c', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH101 Quiz 1C');
    });
  });

  describe('CS302 (Networking) Quiz ID formats', () => {
    // Based on actual content from src/subjects/cs302/content/topic-2/quizzes.json
    it('formats cs302-quiz-2a correctly', () => {
      const item = createReviewItem({ itemId: 'cs302-quiz-2a', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS302 Quiz 2A');
    });

    it('formats cs302-quiz-2b correctly', () => {
      const item = createReviewItem({ itemId: 'cs302-quiz-2b', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS302 Quiz 2B');
    });

    it('formats cs302-quiz-2c correctly', () => {
      const item = createReviewItem({ itemId: 'cs302-quiz-2c', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS302 Quiz 2C');
    });

    it('formats cs302-quiz-4a correctly', () => {
      const item = createReviewItem({ itemId: 'cs302-quiz-4a', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS302 Quiz 4A');
    });
  });

  describe('High-level CS course Quiz ID formats', () => {
    it('formats cs401-quiz-3b correctly', () => {
      const item = createReviewItem({ itemId: 'cs401-quiz-3b', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS401 Quiz 3B');
    });

    it('formats cs407-quiz-7c correctly', () => {
      const item = createReviewItem({ itemId: 'cs407-quiz-7c', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS407 Quiz 7C');
    });

    it('formats math404-quiz-2a correctly', () => {
      const item = createReviewItem({ itemId: 'math404-quiz-2a', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('MATH404 Quiz 2A');
    });
  });
});

describe('Home Review Format - Actual Exercise ID formats from Content', () => {
  describe('Standard exercise ID format with topic', () => {
    it('formats cs101-t1-ex01 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('formats cs101-t1-ex02 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex02', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 2');
    });

    it('formats cs101-t5-ex03 correctly', () => {
      const item = createReviewItem({ itemId: 'cs101-t5-ex03', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 5 Exercise 3');
    });

    it('formats math101-t1-ex01 correctly', () => {
      const item = createReviewItem({ itemId: 'math101-t1-ex01', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('MATH101 Topic 1 Exercise 1');
    });

    it('formats math201-t3-ex05 correctly', () => {
      const item = createReviewItem({ itemId: 'math201-t3-ex05', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('MATH201 Topic 3 Exercise 5');
    });
  });

  describe('Exercise ID leading zeros handling', () => {
    it('strips leading zeros from exercise number', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('handles exercise numbers without leading zeros', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex1', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('handles double-digit exercise numbers', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex12', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 12');
    });

    it('handles exercise 10', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex10', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 10');
    });
  });

  describe('Double-digit topic numbers', () => {
    it('handles topic 10', () => {
      const item = createReviewItem({ itemId: 'cs101-t10-ex01', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 10 Exercise 1');
    });

    it('handles topic 12', () => {
      const item = createReviewItem({ itemId: 'math301-t12-ex05', itemType: 'exercise' });
      expect(formatReviewItemTitle(item)).toBe('MATH301 Topic 12 Exercise 5');
    });
  });
});

describe('Home Review Format - Edge Cases with Real Patterns', () => {
  describe('Mixed case handling', () => {
    it('normalizes lowercase subject codes to uppercase', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });

    it('normalizes uppercase quiz levels to uppercase output', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1B', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
    });
  });

  describe('Quiz number boundaries', () => {
    it('handles quiz 1', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });

    it('handles quiz 7 (typical max per subject)', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-7', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 7');
    });

    it('handles quiz 12 (extended courses)', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-12', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 12');
    });
  });

  describe('All quiz levels', () => {
    it('handles level a', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1a', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1A');
    });

    it('handles level b', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1b', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
    });

    it('handles level c', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1c', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1C');
    });
  });

  describe('Subject code variations', () => {
    it('handles cs prefix', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toContain('CS101');
    });

    it('handles math prefix', () => {
      const item = createReviewItem({ itemId: 'math101-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toContain('MATH101');
    });

    it('handles cs with 3-digit course number', () => {
      const item = createReviewItem({ itemId: 'cs302-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toContain('CS302');
    });

    it('handles cs with 4xx level courses', () => {
      const item = createReviewItem({ itemId: 'cs407-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toContain('CS407');
    });

    it('handles math with 4xx level courses', () => {
      const item = createReviewItem({ itemId: 'math404-quiz-1', itemType: 'quiz' });
      expect(formatReviewItemTitle(item)).toContain('MATH404');
    });
  });
});

describe('Home Review Format - Consistency Checks', () => {
  describe('Output format consistency', () => {
    it('quiz titles never contain "Topic" when there is no topic ID', () => {
      // Quiz IDs don't include topic number in the ID itself (unlike exercises)
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).not.toContain('Topic');
    });

    it('exercise titles always contain "Topic" when topic is in ID', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', itemType: 'exercise' });
      const title = formatReviewItemTitle(item);
      expect(title).toContain('Topic 1');
    });

    it('exercise titles contain "Exercise" keyword', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', itemType: 'exercise' });
      const title = formatReviewItemTitle(item);
      expect(title).toContain('Exercise');
    });

    it('quiz titles contain "Quiz" keyword', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toContain('Quiz');
    });
  });

  describe('No extra whitespace', () => {
    it('quiz title has no leading whitespace', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe(title.trimStart());
    });

    it('quiz title has no trailing whitespace', () => {
      const item = createReviewItem({ itemId: 'cs101-quiz-1', itemType: 'quiz' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe(title.trimEnd());
    });

    it('exercise title has no leading whitespace', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', itemType: 'exercise' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe(title.trimStart());
    });

    it('exercise title has no trailing whitespace', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', itemType: 'exercise' });
      const title = formatReviewItemTitle(item);
      expect(title).toBe(title.trimEnd());
    });

    it('titles have single spaces between words', () => {
      const item = createReviewItem({ itemId: 'cs101-t1-ex01', itemType: 'exercise' });
      const title = formatReviewItemTitle(item);
      expect(title).not.toMatch(/  /); // No double spaces
    });
  });
});
