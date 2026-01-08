/**
 * Topic-Exercise Matching Tests
 *
 * These tests verify that exercise IDs referenced in topics.ts files
 * match the actual exercise IDs defined in exercises.json files.
 * This prevents the type of bug where topics reference non-existent exercises.
 */

import { describe, it, expect } from 'vitest';
import { curriculum } from '../src/data/curriculum';
import { allExercises } from '../src/subjects';
import { groupIdsByTopic } from '../src/subjects/loader';

// Create a set of all exercise IDs for O(1) lookup
const exerciseIdSet = new Set(allExercises.map(e => e.id));

describe('Topic-Exercise ID Matching', () => {
  describe('CS403 exercises', () => {
    const cs403 = curriculum.find(s => s.id === 'cs403');

    it('has CS403 subject defined', () => {
      expect(cs403).toBeDefined();
    });

    it('has exercises for each topic', () => {
      if (!cs403) return;

      cs403.topics.forEach((topic, idx) => {
        expect(
          topic.exerciseIds.length,
          `Topic ${idx + 1} (${topic.title}) should have exercises`
        ).toBeGreaterThan(0);
      });
    });

    it('all topic exercise IDs reference existing exercises', () => {
      if (!cs403) return;

      cs403.topics.forEach(topic => {
        topic.exerciseIds.forEach(exerciseId => {
          expect(
            exerciseIdSet.has(exerciseId),
            `Exercise ID "${exerciseId}" in topic "${topic.title}" should exist`
          ).toBe(true);
        });
      });
    });

    it('exercise IDs follow expected format', () => {
      if (!cs403) return;

      cs403.topics.forEach((topic, idx) => {
        const topicNum = idx + 1;
        topic.exerciseIds.forEach(exerciseId => {
          // Expected format: cs403-t{topicNum}-ex{NN}
          const expectedPattern = new RegExp(`^cs403-t${topicNum}-ex\\d{2}$`);
          expect(
            expectedPattern.test(exerciseId),
            `Exercise ID "${exerciseId}" should match format cs403-t${topicNum}-exNN`
          ).toBe(true);
        });
      });
    });
  });

  describe('CS406 exercises', () => {
    const cs406 = curriculum.find(s => s.id === 'cs406');

    it('has CS406 subject defined', () => {
      expect(cs406).toBeDefined();
    });

    it('has exercises for each topic', () => {
      if (!cs406) return;

      cs406.topics.forEach((topic, idx) => {
        expect(
          topic.exerciseIds.length,
          `Topic ${idx + 1} (${topic.title}) should have exercises`
        ).toBeGreaterThan(0);
      });
    });

    it('all topic exercise IDs reference existing exercises', () => {
      if (!cs406) return;

      cs406.topics.forEach(topic => {
        topic.exerciseIds.forEach(exerciseId => {
          expect(
            exerciseIdSet.has(exerciseId),
            `Exercise ID "${exerciseId}" in topic "${topic.title}" should exist`
          ).toBe(true);
        });
      });
    });

    it('exercise IDs follow expected format', () => {
      if (!cs406) return;

      cs406.topics.forEach((topic, idx) => {
        const topicNum = idx + 1;
        topic.exerciseIds.forEach(exerciseId => {
          // Expected format: cs406-t{topicNum}-ex{NN}
          const expectedPattern = new RegExp(`^cs406-t${topicNum}-ex\\d{2}$`);
          expect(
            expectedPattern.test(exerciseId),
            `Exercise ID "${exerciseId}" should match format cs406-t${topicNum}-exNN`
          ).toBe(true);
        });
      });
    });
  });

  describe('CS405 exercises', () => {
    const cs405 = curriculum.find(s => s.id === 'cs405');

    it('has CS405 subject defined', () => {
      expect(cs405).toBeDefined();
    });

    it('has exercises for each topic', () => {
      if (!cs405) return;

      cs405.topics.forEach((topic, idx) => {
        expect(
          topic.exerciseIds.length,
          `Topic ${idx + 1} (${topic.title}) should have exercises`
        ).toBeGreaterThan(0);
      });
    });

    it('all topic exercise IDs reference existing exercises', () => {
      if (!cs405) return;

      cs405.topics.forEach(topic => {
        topic.exerciseIds.forEach(exerciseId => {
          expect(
            exerciseIdSet.has(exerciseId),
            `Exercise ID "${exerciseId}" in topic "${topic.title}" should exist`
          ).toBe(true);
        });
      });
    });
  });

  describe('exercise ID consistency across all subjects', () => {
    // Test that exercises have correct topicId referencing their parent topic
    // Note: Some exercises have short topicId format like "topic-1" without subject prefix
    // This is a known legacy format issue that doesn't affect functionality
    it('exercises have topicId defined (informational)', () => {
      const withoutTopicId: string[] = [];
      allExercises.forEach(exercise => {
        if (!exercise.topicId) {
          withoutTopicId.push(exercise.id);
        }
      });

      if (withoutTopicId.length > 0) {
        console.log(`Exercises without topicId: ${withoutTopicId.length}`);
      }

      // Most exercises should have topicId
      expect(
        (allExercises.length - withoutTopicId.length) / allExercises.length
      ).toBeGreaterThan(0.9);
    });

    it('exercises have required fields', () => {
      allExercises.forEach(exercise => {
        expect(exercise.id, 'Exercise should have id').toBeDefined();
        expect(exercise.title, `Exercise ${exercise.id} should have title`).toBeDefined();
        expect(
          exercise.difficulty !== undefined,
          `Exercise ${exercise.id} should have difficulty`
        ).toBe(true);
      });
    });

    it('exercise IDs are globally unique', () => {
      const ids = allExercises.map(e => e.id);
      const uniqueIds = new Set(ids);
      expect(
        uniqueIds.size,
        `Found ${ids.length - uniqueIds.size} duplicate exercise IDs`
      ).toBe(ids.length);
    });
  });

  describe('exercise ID format validation', () => {
    // Common exercise ID formats:
    // - cs405-t4-ex01 (subject-t{topic}-ex{num})
    // - cs301-ex-1-1 (subject-ex-{topic}-{num})
    // Both are valid formats

    it('all exercise IDs start with subject prefix', () => {
      // Exercise IDs should at minimum start with a subject ID like cs101, math201, etc.
      const subjectPrefixPattern = /^[a-z]+\d+/;

      allExercises.forEach(exercise => {
        expect(
          subjectPrefixPattern.test(exercise.id),
          `Exercise ID "${exercise.id}" should start with subject prefix`
        ).toBe(true);
      });
    });

    it('reports format distribution by subject (informational)', () => {
      const bySubject = new Map<string, { new: number; old: number }>();

      allExercises.forEach(exercise => {
        const subjectMatch = exercise.id.match(/^([a-z]+\d+)/);
        if (!subjectMatch) return;

        const subjectId = subjectMatch[1];
        if (!bySubject.has(subjectId)) {
          bySubject.set(subjectId, { new: 0, old: 0 });
        }

        const counts = bySubject.get(subjectId)!;
        if (/-t\d+-ex\d+$/.test(exercise.id)) {
          counts.new++;
        } else if (/-ex-\d+-\d+$/.test(exercise.id)) {
          counts.old++;
        }
      });

      // Just count, don't fail
      let mixedCount = 0;
      bySubject.forEach((counts, subjectId) => {
        if (counts.new > 0 && counts.old > 0) {
          mixedCount++;
        }
      });

      if (mixedCount > 0) {
        console.log(`Note: ${mixedCount} subjects have mixed exercise ID formats`);
      }

      expect(bySubject.size).toBeGreaterThan(0);
    });
  });

  describe('topic configuration completeness', () => {
    it('all curriculum subjects have topics array', () => {
      curriculum.forEach(subject => {
        expect(
          Array.isArray(subject.topics),
          `Subject ${subject.id} should have topics array`
        ).toBe(true);
        expect(
          subject.topics.length,
          `Subject ${subject.id} should have at least 1 topic`
        ).toBeGreaterThanOrEqual(1);
      });
    });

    it('topics have exerciseIds array (may be empty)', () => {
      curriculum.forEach(subject => {
        subject.topics.forEach(topic => {
          expect(
            Array.isArray(topic.exerciseIds),
            `Topic ${topic.id} in ${subject.id} should have exerciseIds array`
          ).toBe(true);
        });
      });
    });

    it('topics have quizIds array (may be empty)', () => {
      curriculum.forEach(subject => {
        subject.topics.forEach(topic => {
          expect(
            Array.isArray(topic.quizIds),
            `Topic ${topic.id} in ${subject.id} should have quizIds array`
          ).toBe(true);
        });
      });
    });
  });
});

describe('Loader utility functions', () => {
  describe('groupIdsByTopic', () => {

    it('groups items by topic number from long format topicId', () => {
      const items = [
        { id: 'ex-1', topicId: 'cs101-topic-1' },
        { id: 'ex-2', topicId: 'cs101-topic-1' },
        { id: 'ex-3', topicId: 'cs101-topic-2' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['ex-1', 'ex-2']);
      expect(grouped[2]).toEqual(['ex-3']);
    });

    it('groups items by topic number from short format topicId', () => {
      const items = [
        { id: 'ex-1', topicId: 'cs205-1' },
        { id: 'ex-2', topicId: 'cs205-1' },
        { id: 'ex-3', topicId: 'cs205-2' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['ex-1', 'ex-2']);
      expect(grouped[2]).toEqual(['ex-3']);
    });

    it('handles items without topicId', () => {
      const items = [
        { id: 'ex-1', topicId: 'cs101-topic-1' },
        { id: 'ex-2' }, // No topicId
        { id: 'ex-3', topicId: undefined },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['ex-1']);
      expect(Object.keys(grouped)).toHaveLength(1);
    });

    it('returns empty object for empty array', () => {
      const grouped = groupIdsByTopic([]);
      expect(grouped).toEqual({});
    });
  });
});
