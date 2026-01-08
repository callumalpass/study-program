/**
 * CS404 Exercise ID Consistency Tests
 *
 * These tests validate that exercise IDs referenced in cs404/topics.ts
 * match the actual exercise IDs defined in the JSON files.
 */

import { describe, it, expect } from 'vitest';
import { cs404Topics } from '../src/subjects/cs404/topics';

// Import exercise JSON files directly
import topic1Exercises from '../src/subjects/cs404/content/topic-1/exercises.json';
import topic2Exercises from '../src/subjects/cs404/content/topic-2/exercises.json';
import topic3Exercises from '../src/subjects/cs404/content/topic-3/exercises.json';
import topic4Exercises from '../src/subjects/cs404/content/topic-4/exercises.json';
import topic5Exercises from '../src/subjects/cs404/content/topic-5/exercises.json';
import topic6Exercises from '../src/subjects/cs404/content/topic-6/exercises.json';
import topic7Exercises from '../src/subjects/cs404/content/topic-7/exercises.json';

const exercisesByTopic: Record<number, { id: string }[]> = {
  1: topic1Exercises,
  2: topic2Exercises,
  3: topic3Exercises,
  4: topic4Exercises,
  5: topic5Exercises,
  6: topic6Exercises,
  7: topic7Exercises,
};

describe('CS404 Exercise ID Consistency', () => {
  describe('topics configuration', () => {
    it('should have 7 topics', () => {
      expect(cs404Topics).toHaveLength(7);
    });

    it('should have 16 exercises per topic', () => {
      cs404Topics.forEach((topic, index) => {
        expect(topic.exerciseIds).toHaveLength(16);
      });
    });
  });

  describe('exercise ID matching', () => {
    for (let topicNum = 1; topicNum <= 7; topicNum++) {
      describe(`Topic ${topicNum}`, () => {
        it(`should have all exercise IDs in topics.ts match actual JSON file`, () => {
          const topic = cs404Topics[topicNum - 1];
          const exercises = exercisesByTopic[topicNum];
          const actualIds = new Set(exercises.map((e) => e.id));

          topic.exerciseIds.forEach((referencedId) => {
            expect(
              actualIds.has(referencedId),
              `Exercise ID "${referencedId}" referenced in topics.ts not found in topic-${topicNum}/exercises.json`
            ).toBe(true);
          });
        });

        it(`should have all JSON exercise IDs referenced in topics.ts`, () => {
          const topic = cs404Topics[topicNum - 1];
          const exercises = exercisesByTopic[topicNum];
          const referencedIds = new Set(topic.exerciseIds);

          exercises.forEach((exercise) => {
            expect(
              referencedIds.has(exercise.id),
              `Exercise ID "${exercise.id}" from JSON not referenced in topics.ts for topic ${topicNum}`
            ).toBe(true);
          });
        });

        it(`should have matching exercise count between topics.ts and JSON`, () => {
          const topic = cs404Topics[topicNum - 1];
          const exercises = exercisesByTopic[topicNum];

          expect(topic.exerciseIds.length).toBe(exercises.length);
        });
      });
    }
  });

  describe('exercise ID format validation', () => {
    it('topic 1 exercises should use cs404-ex-1-X format', () => {
      const topic = cs404Topics[0];
      topic.exerciseIds.forEach((id, index) => {
        expect(id).toBe(`cs404-ex-1-${index + 1}`);
      });
    });

    it('topic 2 exercises should use mixed format (cs404-ex-2-X for 1-2, cs404-t2-exXX for 3-16)', () => {
      const topic = cs404Topics[1];
      expect(topic.exerciseIds[0]).toBe('cs404-ex-2-1');
      expect(topic.exerciseIds[1]).toBe('cs404-ex-2-2');
      for (let i = 2; i < 16; i++) {
        expect(topic.exerciseIds[i]).toBe(`cs404-t2-ex${String(i + 1).padStart(2, '0')}`);
      }
    });

    it('topic 3 exercises should use mixed format (cs404-ex-3-X for 1-2, cs404-t3-exXX for 3-16)', () => {
      const topic = cs404Topics[2];
      expect(topic.exerciseIds[0]).toBe('cs404-ex-3-1');
      expect(topic.exerciseIds[1]).toBe('cs404-ex-3-2');
      for (let i = 2; i < 16; i++) {
        expect(topic.exerciseIds[i]).toBe(`cs404-t3-ex${String(i + 1).padStart(2, '0')}`);
      }
    });

    it('topic 4 exercises should all use cs404-t4-exXX format', () => {
      const topic = cs404Topics[3];
      topic.exerciseIds.forEach((id, index) => {
        expect(id).toBe(`cs404-t4-ex${String(index + 1).padStart(2, '0')}`);
      });
    });

    it('topic 5 exercises should all use cs404-t5-exXX format', () => {
      const topic = cs404Topics[4];
      topic.exerciseIds.forEach((id, index) => {
        expect(id).toBe(`cs404-t5-ex${String(index + 1).padStart(2, '0')}`);
      });
    });

    it('topic 6 exercises should all use cs404-t6-exXX format', () => {
      const topic = cs404Topics[5];
      topic.exerciseIds.forEach((id, index) => {
        expect(id).toBe(`cs404-t6-ex${String(index + 1).padStart(2, '0')}`);
      });
    });

    it('topic 7 exercises should use cs404-ex-7-X format', () => {
      const topic = cs404Topics[6];
      topic.exerciseIds.forEach((id, index) => {
        expect(id).toBe(`cs404-ex-7-${index + 1}`);
      });
    });
  });

  describe('no duplicate exercise IDs', () => {
    it('should have unique exercise IDs across all topics', () => {
      const allIds: string[] = [];
      cs404Topics.forEach((topic) => {
        allIds.push(...topic.exerciseIds);
      });

      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(allIds.length);
    });
  });

  describe('exercise JSON structure', () => {
    for (let topicNum = 1; topicNum <= 7; topicNum++) {
      it(`topic ${topicNum} exercises should have required fields`, () => {
        const exercises = exercisesByTopic[topicNum];
        exercises.forEach((exercise: { id: string; title?: string; prompt?: string }) => {
          expect(exercise.id).toBeDefined();
          expect(typeof exercise.id).toBe('string');
          expect(exercise.id.length).toBeGreaterThan(0);
        });
      });
    }
  });
});
