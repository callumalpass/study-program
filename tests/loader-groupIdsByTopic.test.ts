/**
 * Loader groupIdsByTopic Tests
 *
 * Comprehensive tests for the groupIdsByTopic utility function.
 * This function groups items by their topic number extracted from topicId.
 */

import { describe, it, expect } from 'vitest';
import { groupIdsByTopic } from '../src/subjects/loader';

// Helper type for test items
interface TestItem {
  id: string;
  topicId?: string;
}

describe('groupIdsByTopic', () => {
  describe('long format (cs303-topic-4)', () => {
    it('groups items by topic number', () => {
      const items: TestItem[] = [
        { id: 'quiz-1', topicId: 'cs303-topic-1' },
        { id: 'quiz-2', topicId: 'cs303-topic-1' },
        { id: 'quiz-3', topicId: 'cs303-topic-2' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        1: ['quiz-1', 'quiz-2'],
        2: ['quiz-3'],
      });
    });

    it('handles single item per topic', () => {
      const items: TestItem[] = [
        { id: 'quiz-1', topicId: 'cs101-topic-1' },
        { id: 'quiz-2', topicId: 'cs101-topic-2' },
        { id: 'quiz-3', topicId: 'cs101-topic-3' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        1: ['quiz-1'],
        2: ['quiz-2'],
        3: ['quiz-3'],
      });
    });

    it('handles topics 1 through 7 (typical subject range)', () => {
      const items: TestItem[] = [];
      for (let i = 1; i <= 7; i++) {
        items.push({ id: `quiz-${i}a`, topicId: `cs101-topic-${i}` });
        items.push({ id: `quiz-${i}b`, topicId: `cs101-topic-${i}` });
      }

      const result = groupIdsByTopic(items);

      expect(Object.keys(result)).toHaveLength(7);
      for (let i = 1; i <= 7; i++) {
        expect(result[i]).toEqual([`quiz-${i}a`, `quiz-${i}b`]);
      }
    });

    it('handles double-digit topic numbers', () => {
      const items: TestItem[] = [
        { id: 'quiz-10', topicId: 'cs101-topic-10' },
        { id: 'quiz-11', topicId: 'cs101-topic-11' },
        { id: 'quiz-12', topicId: 'cs101-topic-12' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        10: ['quiz-10'],
        11: ['quiz-11'],
        12: ['quiz-12'],
      });
    });
  });

  describe('short format (cs205-1) - legacy support', () => {
    it('groups items by topic number from short format', () => {
      const items: TestItem[] = [
        { id: 'quiz-1', topicId: 'cs205-1' },
        { id: 'quiz-2', topicId: 'cs205-1' },
        { id: 'quiz-3', topicId: 'cs205-2' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        1: ['quiz-1', 'quiz-2'],
        2: ['quiz-3'],
      });
    });

    it('handles single digit in short format', () => {
      const items: TestItem[] = [
        { id: 'ex-1', topicId: 'math101-5' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        5: ['ex-1'],
      });
    });
  });

  describe('mixed formats', () => {
    it('handles both long and short formats in same list', () => {
      const items: TestItem[] = [
        { id: 'quiz-1', topicId: 'cs303-topic-1' },
        { id: 'quiz-2', topicId: 'cs205-1' },
        { id: 'quiz-3', topicId: 'cs303-topic-2' },
      ];

      const result = groupIdsByTopic(items);

      // Both quiz-1 and quiz-2 have topic 1
      expect(result[1]).toContain('quiz-1');
      expect(result[1]).toContain('quiz-2');
      expect(result[2]).toEqual(['quiz-3']);
    });
  });

  describe('edge cases', () => {
    it('returns empty object for empty array', () => {
      const result = groupIdsByTopic([]);
      expect(result).toEqual({});
    });

    it('skips items without topicId', () => {
      const items: TestItem[] = [
        { id: 'quiz-1', topicId: 'cs101-topic-1' },
        { id: 'quiz-2' }, // No topicId
        { id: 'quiz-3', topicId: 'cs101-topic-2' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        1: ['quiz-1'],
        2: ['quiz-3'],
      });
    });

    it('skips items with undefined topicId', () => {
      const items: TestItem[] = [
        { id: 'quiz-1', topicId: undefined },
        { id: 'quiz-2', topicId: 'cs101-topic-1' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        1: ['quiz-2'],
      });
    });

    it('skips items with topicId that does not match pattern', () => {
      const items: TestItem[] = [
        { id: 'quiz-1', topicId: 'invalid-format' },
        { id: 'quiz-2', topicId: 'no-numbers-here' },
        { id: 'quiz-3', topicId: 'cs101-topic-1' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        1: ['quiz-3'],
      });
    });

    it('skips items with empty string topicId', () => {
      const items: TestItem[] = [
        { id: 'quiz-1', topicId: '' },
        { id: 'quiz-2', topicId: 'cs101-topic-1' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        1: ['quiz-2'],
      });
    });

    it('handles topic 0 correctly', () => {
      const items: TestItem[] = [
        { id: 'quiz-0', topicId: 'cs101-topic-0' },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        0: ['quiz-0'],
      });
    });

    it('preserves order of items within each topic', () => {
      const items: TestItem[] = [
        { id: 'first', topicId: 'cs101-topic-1' },
        { id: 'second', topicId: 'cs101-topic-1' },
        { id: 'third', topicId: 'cs101-topic-1' },
      ];

      const result = groupIdsByTopic(items);

      expect(result[1]).toEqual(['first', 'second', 'third']);
    });
  });

  describe('real-world quiz ID patterns', () => {
    it('groups actual quiz ID format (cs101-quiz-1a)', () => {
      const items = [
        { id: 'cs101-quiz-1a', topicId: 'cs101-topic-1' },
        { id: 'cs101-quiz-1b', topicId: 'cs101-topic-1' },
        { id: 'cs101-quiz-1c', topicId: 'cs101-topic-1' },
        { id: 'cs101-quiz-2a', topicId: 'cs101-topic-2' },
        { id: 'cs101-quiz-2b', topicId: 'cs101-topic-2' },
      ];

      const result = groupIdsByTopic(items);

      expect(result[1]).toEqual(['cs101-quiz-1a', 'cs101-quiz-1b', 'cs101-quiz-1c']);
      expect(result[2]).toEqual(['cs101-quiz-2a', 'cs101-quiz-2b']);
    });

    it('groups actual exercise ID format (cs101-t1-ex01)', () => {
      const items = [
        { id: 'cs101-t1-ex01', topicId: 'cs101-topic-1' },
        { id: 'cs101-t1-ex02', topicId: 'cs101-topic-1' },
        { id: 'cs101-t2-ex01', topicId: 'cs101-topic-2' },
        { id: 'cs101-t3-ex01', topicId: 'cs101-topic-3' },
      ];

      const result = groupIdsByTopic(items);

      expect(result[1]).toEqual(['cs101-t1-ex01', 'cs101-t1-ex02']);
      expect(result[2]).toEqual(['cs101-t2-ex01']);
      expect(result[3]).toEqual(['cs101-t3-ex01']);
    });

    it('groups mixed quizzes and exercises', () => {
      const items = [
        { id: 'cs101-quiz-1a', topicId: 'cs101-topic-1' },
        { id: 'cs101-t1-ex01', topicId: 'cs101-topic-1' },
        { id: 'cs101-quiz-1b', topicId: 'cs101-topic-1' },
        { id: 'cs101-t1-ex02', topicId: 'cs101-topic-1' },
      ];

      const result = groupIdsByTopic(items);

      expect(result[1]).toEqual([
        'cs101-quiz-1a',
        'cs101-t1-ex01',
        'cs101-quiz-1b',
        'cs101-t1-ex02',
      ]);
    });
  });

  describe('math subjects', () => {
    it('groups math quizzes correctly', () => {
      const items = [
        { id: 'math101-quiz-1a', topicId: 'math101-topic-1' },
        { id: 'math101-quiz-1b', topicId: 'math101-topic-1' },
        { id: 'math101-quiz-2a', topicId: 'math101-topic-2' },
      ];

      const result = groupIdsByTopic(items);

      expect(result[1]).toEqual(['math101-quiz-1a', 'math101-quiz-1b']);
      expect(result[2]).toEqual(['math101-quiz-2a']);
    });

    it('groups math exercises correctly', () => {
      const items = [
        { id: 'math101-t1-ex01', topicId: 'math101-topic-1' },
        { id: 'math101-t1-ex02', topicId: 'math101-topic-1' },
        { id: 'math101-t2-ex01', topicId: 'math101-topic-2' },
      ];

      const result = groupIdsByTopic(items);

      expect(result[1]).toEqual(['math101-t1-ex01', 'math101-t1-ex02']);
      expect(result[2]).toEqual(['math101-t2-ex01']);
    });
  });

  describe('networking course (CS302)', () => {
    it('groups networking quizzes correctly', () => {
      const items = [
        { id: 'cs302-quiz-2a', topicId: 'cs302-topic-2' },
        { id: 'cs302-quiz-2b', topicId: 'cs302-topic-2' },
        { id: 'cs302-quiz-2c', topicId: 'cs302-topic-2' },
        { id: 'cs302-quiz-4a', topicId: 'cs302-topic-4' },
      ];

      const result = groupIdsByTopic(items);

      expect(result[2]).toEqual(['cs302-quiz-2a', 'cs302-quiz-2b', 'cs302-quiz-2c']);
      expect(result[4]).toEqual(['cs302-quiz-4a']);
    });
  });

  describe('type safety', () => {
    it('works with items containing extra properties', () => {
      interface ExtendedItem {
        id: string;
        topicId?: string;
        title: string;
        difficulty: number;
      }

      const items: ExtendedItem[] = [
        { id: 'quiz-1', topicId: 'cs101-topic-1', title: 'Quiz 1', difficulty: 1 },
        { id: 'quiz-2', topicId: 'cs101-topic-1', title: 'Quiz 2', difficulty: 2 },
      ];

      const result = groupIdsByTopic(items);

      expect(result).toEqual({
        1: ['quiz-1', 'quiz-2'],
      });
    });
  });
});
