/**
 * Math304 (Abstract Algebra) Topics Configuration Tests
 *
 * Tests to validate the topic configuration structure and content correctness.
 */

import { describe, it, expect } from 'vitest';
import { math304Topics } from '../src/subjects/math304/topics';
import type { Topic } from '../src/core/types';

describe('Math304 Topics Configuration', () => {
  describe('Topic Structure Validation', () => {
    it('should have exactly 7 topics', () => {
      expect(math304Topics.length).toBe(7);
    });

    it('all topics should have required fields', () => {
      math304Topics.forEach((topic: Topic) => {
        expect(topic.id).toBeDefined();
        expect(topic.title).toBeDefined();
        expect(topic.subtopics).toBeDefined();
        expect(Array.isArray(topic.subtopics)).toBe(true);
        expect(topic.quizIds).toBeDefined();
        expect(Array.isArray(topic.quizIds)).toBe(true);
        expect(topic.exerciseIds).toBeDefined();
        expect(Array.isArray(topic.exerciseIds)).toBe(true);
      });
    });

    it('all topic IDs should follow naming convention', () => {
      math304Topics.forEach((topic: Topic, index: number) => {
        expect(topic.id).toBe(`math304-topic-${index + 1}`);
      });
    });

    it('topic titles should not contain invalid characters', () => {
      math304Topics.forEach((topic: Topic) => {
        // Should not contain trailing backslashes or other escape characters
        expect(topic.title).not.toMatch(/\\$/);
        expect(topic.title).not.toMatch(/\\\\$/);
        // Should not be empty
        expect(topic.title.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Topic Titles Correctness', () => {
    const expectedTitles = [
      'Groups and Subgroups',
      'Cyclic Groups and Generators',
      'Permutation Groups',
      "Cosets and Lagrange's Theorem",
      'Group Homomorphisms and Isomorphisms',
      'Rings and Fields',
      'Applications to Cryptography',
    ];

    it('should have correct topic titles', () => {
      math304Topics.forEach((topic: Topic, index: number) => {
        expect(topic.title).toBe(expectedTitles[index]);
      });
    });

    it('topic 4 should be "Cosets and Lagrange\'s Theorem"', () => {
      const topic4 = math304Topics.find((t: Topic) => t.id === 'math304-topic-4');
      expect(topic4).toBeDefined();
      expect(topic4?.title).toBe("Cosets and Lagrange's Theorem");
      // Ensure it's not malformed
      expect(topic4?.title).not.toBe("Cosets and Lagrange\\");
      expect(topic4?.title).not.toContain('\\');
    });
  });

  describe('Quiz and Exercise ID Validation', () => {
    it('all quiz IDs should follow naming convention', () => {
      math304Topics.forEach((topic: Topic, topicIndex: number) => {
        topic.quizIds.forEach((quizId: string) => {
          expect(quizId).toMatch(/^math304-quiz-\d+-\d+$/);
          // Quiz IDs should reference the correct topic
          const topicNum = parseInt(quizId.split('-')[2], 10);
          expect(topicNum).toBe(topicIndex + 1);
        });
      });
    });

    it('all exercise IDs should follow naming convention', () => {
      math304Topics.forEach((topic: Topic, topicIndex: number) => {
        topic.exerciseIds.forEach((exerciseId: string) => {
          expect(exerciseId).toMatch(/^math304-t\d+-ex\d+$/);
          // Exercise IDs should reference the correct topic
          const topicNum = parseInt(exerciseId.split('-')[1].replace('t', ''), 10);
          expect(topicNum).toBe(topicIndex + 1);
        });
      });
    });

    it('each topic should have 3 quizzes', () => {
      math304Topics.forEach((topic: Topic) => {
        expect(topic.quizIds.length).toBe(3);
      });
    });

    it('each topic should have 16 exercises', () => {
      math304Topics.forEach((topic: Topic) => {
        expect(topic.exerciseIds.length).toBe(16);
      });
    });
  });

  describe('Subtopic Structure', () => {
    it('all topics should have subtopics with content', () => {
      math304Topics.forEach((topic: Topic) => {
        expect(topic.subtopics.length).toBeGreaterThan(0);
        topic.subtopics.forEach(subtopic => {
          expect(subtopic.id).toBeDefined();
          expect(subtopic.title).toBeDefined();
          expect(subtopic.content).toBeDefined();
          expect(subtopic.content.length).toBeGreaterThan(0);
        });
      });
    });

    it('subtopic IDs should be unique within each topic', () => {
      math304Topics.forEach((topic: Topic) => {
        const subtopicIds = topic.subtopics.map(s => s.id);
        const uniqueIds = new Set(subtopicIds);
        expect(uniqueIds.size).toBe(subtopicIds.length);
      });
    });
  });

  describe('Content Coverage', () => {
    it('topic 1 (Groups and Subgroups) should cover group axioms', () => {
      const topic1 = math304Topics[0];
      const allContent = topic1.subtopics.map(s => s.content.toLowerCase()).join(' ');
      expect(allContent).toMatch(/closure|associativity|identity|inverse/);
    });

    it('topic 2 (Cyclic Groups) should cover generators', () => {
      const topic2 = math304Topics[1];
      const allContent = topic2.subtopics.map(s => s.content.toLowerCase()).join(' ');
      expect(allContent).toMatch(/generator|cyclic/);
    });

    it('topic 3 (Permutation Groups) should cover symmetric groups', () => {
      const topic3 = math304Topics[2];
      const allContent = topic3.subtopics.map(s => s.content.toLowerCase()).join(' ');
      expect(allContent).toMatch(/symmetric|permutation|s_n|sₙ/i);
    });

    it("topic 4 (Cosets and Lagrange's Theorem) should cover Lagrange's theorem", () => {
      const topic4 = math304Topics[3];
      const allContent = topic4.subtopics.map(s => s.content.toLowerCase()).join(' ');
      expect(allContent).toMatch(/lagrange|coset|index/);
    });

    it('topic 5 (Homomorphisms) should cover kernels and images', () => {
      const topic5 = math304Topics[4];
      const allContent = topic5.subtopics.map(s => s.content.toLowerCase()).join(' ');
      expect(allContent).toMatch(/homomorphism|kernel|image|isomorphism/);
    });

    it('topic 6 (Rings and Fields) should cover ring axioms', () => {
      const topic6 = math304Topics[5];
      const allContent = topic6.subtopics.map(s => s.content.toLowerCase()).join(' ');
      expect(allContent).toMatch(/ring|field|ideal/);
    });

    it('topic 7 (Cryptography) should cover RSA or group-based crypto', () => {
      const topic7 = math304Topics[6];
      const allContent = topic7.subtopics.map(s => s.content.toLowerCase()).join(' ');
      expect(allContent).toMatch(/rsa|encrypt|crypto|diffie|elgamal/);
    });
  });

  describe('Statistics', () => {
    it('reports topic statistics', () => {
      const totalQuizzes = math304Topics.reduce((sum, t) => sum + t.quizIds.length, 0);
      const totalExercises = math304Topics.reduce((sum, t) => sum + t.exerciseIds.length, 0);
      const totalSubtopics = math304Topics.reduce((sum, t) => sum + t.subtopics.length, 0);

      console.log(`Math304 topics: ${math304Topics.length}`);
      console.log(`Math304 total quizzes: ${totalQuizzes}`);
      console.log(`Math304 total exercises: ${totalExercises}`);
      console.log(`Math304 total subtopics: ${totalSubtopics}`);

      expect(totalQuizzes).toBe(21); // 7 topics × 3 quizzes
      expect(totalExercises).toBe(112); // 7 topics × 16 exercises
    });
  });
});
