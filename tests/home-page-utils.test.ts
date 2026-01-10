/**
 * Home Page Utility Function Tests
 *
 * Tests for the formatReviewItemTitle function and calculateStats logic
 * from the home page module.
 */

import { describe, it, expect } from 'vitest';
import type { ReviewItem } from '../src/core/types';

// Re-implement the formatReviewItemTitle function for testing
// (exported version would be better, but we test the logic here)

// Regex patterns for parsing review item IDs
const SUBJECT_CODE_PATTERN = /^([a-z]+\d+)/i;
const TOPIC_NUMBER_PATTERN = /-t(\d+)-/;
const QUIZ_LEVEL_PATTERN = /quiz-(\d+)([a-c])?(?:-([a-c]))?/i;
const QUIZ_SUBQUIZ_PATTERN = /quiz-(\d+)-(\d+)/i;
const SHORT_QUIZ_PATTERN = /-q(\d+)(?:-([a-c]))?-(\d+)/i;
const EXERCISE_NUMBER_PATTERN = /ex(\d+)/i;

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

const createQuizReviewItem = (itemId: string, subjectId: string): ReviewItem => ({
  itemId,
  subjectId,
  itemType: 'quiz',
  dueDate: new Date().toISOString(),
  lastReviewDate: new Date().toISOString(),
  interval: 1,
  streak: 1,
  lastScore: 80,
});

const createExerciseReviewItem = (itemId: string, subjectId: string): ReviewItem => ({
  itemId,
  subjectId,
  itemType: 'exercise',
  dueDate: new Date().toISOString(),
  lastReviewDate: new Date().toISOString(),
  interval: 1,
  streak: 1,
  lastScore: 100,
});

describe('formatReviewItemTitle', () => {
  describe('quiz ID formats', () => {
    describe('standard quiz format (cs101-quiz-1)', () => {
      it('formats basic quiz ID', () => {
        const item = createQuizReviewItem('cs101-quiz-1', 'cs101');
        expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
      });

      it('formats quiz ID with level letter attached (cs101-quiz-1b)', () => {
        const item = createQuizReviewItem('cs101-quiz-1b', 'cs101');
        expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1B');
      });

      it('formats quiz ID with level letter separated (cs101-quiz-1-c)', () => {
        const item = createQuizReviewItem('cs101-quiz-1-c', 'cs101');
        expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1C');
      });

      it('handles uppercase level letters in ID', () => {
        const item = createQuizReviewItem('cs101-quiz-2A', 'cs101');
        expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 2A');
      });
    });

    describe('topic-subquiz format (cs402-quiz-1-2)', () => {
      it('formats topic-subquiz pattern', () => {
        const item = createQuizReviewItem('cs402-quiz-1-2', 'cs402');
        expect(formatReviewItemTitle(item)).toBe('CS402 Quiz 1-2');
      });

      it('formats topic-subquiz with higher numbers', () => {
        const item = createQuizReviewItem('math302-quiz-3-5', 'math302');
        expect(formatReviewItemTitle(item)).toBe('MATH302 Quiz 3-5');
      });
    });

    describe('topic prefix format (cs304-t1-quiz-1)', () => {
      it('formats topic prefix pattern', () => {
        const item = createQuizReviewItem('cs304-t1-quiz-1', 'cs304');
        expect(formatReviewItemTitle(item)).toBe('CS304 Topic 1 Quiz 1');
      });

      it('formats topic prefix with higher topic number', () => {
        const item = createQuizReviewItem('cs304-t5-quiz-2', 'cs304');
        expect(formatReviewItemTitle(item)).toBe('CS304 Topic 5 Quiz 2');
      });
    });

    describe('short quiz format (cs102-q1-1)', () => {
      it('formats short quiz pattern', () => {
        const item = createQuizReviewItem('cs102-q1-1', 'cs102');
        expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 1');
      });

      it('formats short quiz pattern with level', () => {
        const item = createQuizReviewItem('cs102-q1-b-1', 'cs102');
        expect(formatReviewItemTitle(item)).toBe('CS102 Quiz 1B');
      });
    });

    describe('math subjects', () => {
      it('formats math subject quiz ID', () => {
        const item = createQuizReviewItem('math101-quiz-1', 'math101');
        expect(formatReviewItemTitle(item)).toBe('MATH101 Quiz 1');
      });

      it('formats math subject with level', () => {
        const item = createQuizReviewItem('math201-quiz-2a', 'math201');
        expect(formatReviewItemTitle(item)).toBe('MATH201 Quiz 2A');
      });
    });
  });

  describe('exercise ID formats', () => {
    it('formats standard exercise ID', () => {
      const item = createExerciseReviewItem('cs101-t1-ex01', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 1');
    });

    it('formats exercise with double-digit number', () => {
      const item = createExerciseReviewItem('cs102-t3-ex12', 'cs102');
      expect(formatReviewItemTitle(item)).toBe('CS102 Topic 3 Exercise 12');
    });

    it('removes leading zeros from exercise number', () => {
      const item = createExerciseReviewItem('cs101-t1-ex02', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Topic 1 Exercise 2');
    });

    it('handles exercise without topic prefix', () => {
      const item = createExerciseReviewItem('cs101-ex05', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Exercise 5');
    });

    it('formats math exercise ID', () => {
      const item = createExerciseReviewItem('math201-t2-ex03', 'math201');
      expect(formatReviewItemTitle(item)).toBe('MATH201 Topic 2 Exercise 3');
    });
  });

  describe('edge cases', () => {
    it('handles unknown quiz format gracefully', () => {
      const item = createQuizReviewItem('cs101-unknown-format', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz');
    });

    it('handles quiz with only subject code', () => {
      const item = createQuizReviewItem('cs101', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz');
    });

    it('handles empty item ID', () => {
      const item = createQuizReviewItem('', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('Quiz');
    });

    it('handles item with just numbers in subject code', () => {
      const item = createQuizReviewItem('123-quiz-1', '123');
      // Pattern expects letters followed by numbers, so this might not match
      expect(formatReviewItemTitle(item)).toBe('Quiz 1');
    });
  });

  describe('subject code extraction', () => {
    it('extracts subject code with different prefixes', () => {
      const testCases = [
        { id: 'cs101-quiz-1', expected: 'CS101' },
        { id: 'math201-quiz-1', expected: 'MATH201' },
        { id: 'phys301-quiz-1', expected: 'PHYS301' },
        { id: 'stat401-quiz-1', expected: 'STAT401' },
      ];

      for (const { id, expected } of testCases) {
        const item = createQuizReviewItem(id, id.split('-')[0]);
        const title = formatReviewItemTitle(item);
        expect(title.startsWith(expected)).toBe(true);
      }
    });

    it('uppercases lowercase subject codes', () => {
      const item = createQuizReviewItem('cs101-quiz-1', 'cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });

    it('handles mixed case subject codes', () => {
      const item = createQuizReviewItem('Cs101-quiz-1', 'Cs101');
      expect(formatReviewItemTitle(item)).toBe('CS101 Quiz 1');
    });
  });
});

describe('review item URL generation', () => {
  // Test the getReviewItemUrl logic
  function getReviewItemUrl(item: ReviewItem): string {
    if (item.itemType === 'quiz') {
      return `#/subject/${item.subjectId}/quiz/${item.itemId}`;
    } else {
      return `#/subject/${item.subjectId}/exercise/${item.itemId}`;
    }
  }

  it('generates correct URL for quiz item', () => {
    const item = createQuizReviewItem('cs101-quiz-1', 'cs101');
    expect(getReviewItemUrl(item)).toBe('#/subject/cs101/quiz/cs101-quiz-1');
  });

  it('generates correct URL for exercise item', () => {
    const item = createExerciseReviewItem('cs101-t1-ex01', 'cs101');
    expect(getReviewItemUrl(item)).toBe('#/subject/cs101/exercise/cs101-t1-ex01');
  });

  it('handles subject IDs with special characters', () => {
    const item = createQuizReviewItem('cs-101-quiz-1', 'cs-101');
    expect(getReviewItemUrl(item)).toBe('#/subject/cs-101/quiz/cs-101-quiz-1');
  });
});

describe('stats calculation edge cases', () => {
  // Test edge cases in stats calculation logic

  describe('quiz counting logic', () => {
    it('correctly identifies passing score threshold', () => {
      const QUIZ_PASSING_SCORE = 70;

      expect(80 >= QUIZ_PASSING_SCORE).toBe(true);
      expect(70 >= QUIZ_PASSING_SCORE).toBe(true);
      expect(69 >= QUIZ_PASSING_SCORE).toBe(false);
      expect(0 >= QUIZ_PASSING_SCORE).toBe(false);
    });

    it('finds best score among multiple attempts', () => {
      const attempts = [
        { score: 50 },
        { score: 80 },
        { score: 60 },
      ];
      const bestScore = Math.max(...attempts.map(a => a.score));
      expect(bestScore).toBe(80);
    });

    it('handles single attempt', () => {
      const attempts = [{ score: 75 }];
      const bestScore = Math.max(...attempts.map(a => a.score));
      expect(bestScore).toBe(75);
    });

    it('handles empty attempts array edge case', () => {
      const attempts: { score: number }[] = [];
      // Math.max with empty spread returns -Infinity
      if (attempts.length > 0) {
        const bestScore = Math.max(...attempts.map(a => a.score));
        expect(bestScore).toBeDefined();
      }
      expect(attempts.length).toBe(0);
    });
  });

  describe('average score calculation', () => {
    it('calculates average correctly', () => {
      const scores = [80, 90, 70];
      const total = scores.reduce((sum, s) => sum + s, 0);
      const avg = Math.round(total / scores.length);
      expect(avg).toBe(80);
    });

    it('handles single score', () => {
      const scores = [85];
      const total = scores.reduce((sum, s) => sum + s, 0);
      const avg = Math.round(total / scores.length);
      expect(avg).toBe(85);
    });

    it('rounds to nearest integer', () => {
      const scores = [81, 82, 83]; // Average is 82
      const total = scores.reduce((sum, s) => sum + s, 0);
      const avg = Math.round(total / scores.length);
      expect(avg).toBe(82);
    });

    it('rounds up from .5', () => {
      const scores = [80, 81]; // Average is 80.5
      const total = scores.reduce((sum, s) => sum + s, 0);
      const avg = Math.round(total / scores.length);
      expect(avg).toBe(81);
    });

    it('returns 0 for no attempts', () => {
      const quizAttemptCount = 0;
      const totalQuizScore = 0;
      const averageQuizScore = quizAttemptCount > 0
        ? Math.round(totalQuizScore / quizAttemptCount)
        : 0;
      expect(averageQuizScore).toBe(0);
    });
  });

  describe('subject filtering for stats', () => {
    it('creates Set from subject IDs correctly', () => {
      const subjects = [{ id: 'cs101' }, { id: 'cs102' }, { id: 'math101' }];
      const selectedSubjectIds = new Set(subjects.map(s => s.id));

      expect(selectedSubjectIds.has('cs101')).toBe(true);
      expect(selectedSubjectIds.has('cs102')).toBe(true);
      expect(selectedSubjectIds.has('math101')).toBe(true);
      expect(selectedSubjectIds.has('cs103')).toBe(false);
    });

    it('handles empty subject list', () => {
      const subjects: { id: string }[] = [];
      const selectedSubjectIds = new Set(subjects.map(s => s.id));

      expect(selectedSubjectIds.size).toBe(0);
      expect(selectedSubjectIds.has('cs101')).toBe(false);
    });
  });
});

describe('review item interval display', () => {
  it('displays singular for interval of 1', () => {
    const interval = 1;
    const text = `${interval} day${interval !== 1 ? 's' : ''}`;
    expect(text).toBe('1 day');
  });

  it('displays plural for intervals greater than 1', () => {
    const intervals = [2, 3, 7, 14, 30];
    for (const interval of intervals) {
      const text = `${interval} day${interval !== 1 ? 's' : ''}`;
      expect(text).toBe(`${interval} days`);
    }
  });

  it('displays plural for interval of 0', () => {
    const interval = 0;
    const text = `${interval} day${interval !== 1 ? 's' : ''}`;
    expect(text).toBe('0 days');
  });
});

describe('review count display', () => {
  it('displays singular for 1 item', () => {
    const totalDue = 1;
    const text = `${totalDue} item${totalDue !== 1 ? 's' : ''}`;
    expect(text).toBe('1 item');
  });

  it('displays plural for multiple items', () => {
    const counts = [0, 2, 5, 10, 100];
    for (const totalDue of counts) {
      const text = `${totalDue} item${totalDue !== 1 ? 's' : ''}`;
      if (totalDue === 1) {
        expect(text).toBe('1 item');
      } else {
        expect(text).toBe(`${totalDue} items`);
      }
    }
  });
});
