/**
 * Router Navigation Helpers Tests
 *
 * Tests for the navigation helper functions that build URLs for different routes.
 * These ensure proper URL encoding and path construction.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  navigateToHome,
  navigateToCurriculum,
  navigateToSubject,
  navigateToTopic,
  navigateToSubtopic,
  navigateToQuiz,
  navigateToExam,
  navigateToExercise,
  navigateToProject,
  navigateToProgress,
  navigateToSettings,
  navigateToExport,
  navigateToTimeline,
  navigateToCourseBuilder,
} from '../src/core/router';

describe('Router Navigation Helpers', () => {
  let navigatedPath: string | null = null;

  beforeEach(() => {
    navigatedPath = null;
    // Mock window.location.hash setter
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
        set hash(value: string) {
          navigatedPath = value;
        },
        get hash() {
          return navigatedPath || '';
        },
      },
      writable: true,
    });
  });

  describe('simple navigation helpers', () => {
    it('navigateToHome sets correct path', () => {
      navigateToHome();
      expect(navigatedPath).toBe('#/');
    });

    it('navigateToCurriculum sets correct path', () => {
      navigateToCurriculum();
      expect(navigatedPath).toBe('#/curriculum');
    });

    it('navigateToProgress sets correct path', () => {
      navigateToProgress();
      expect(navigatedPath).toBe('#/progress');
    });

    it('navigateToSettings sets correct path', () => {
      navigateToSettings();
      expect(navigatedPath).toBe('#/settings');
    });

    it('navigateToExport sets correct path', () => {
      navigateToExport();
      expect(navigatedPath).toBe('#/export');
    });

    it('navigateToTimeline sets correct path', () => {
      navigateToTimeline();
      expect(navigatedPath).toBe('#/timeline');
    });

    it('navigateToCourseBuilder sets correct path', () => {
      navigateToCourseBuilder();
      expect(navigatedPath).toBe('#/course-builder');
    });
  });

  describe('single parameter navigation helpers', () => {
    it('navigateToSubject with simple ID', () => {
      navigateToSubject('cs101');
      expect(navigatedPath).toBe('#/subject/cs101');
    });

    it('navigateToSubject encodes special characters', () => {
      navigateToSubject('cs-101');
      expect(navigatedPath).toBe('#/subject/cs-101');
    });

    it('navigateToSubject encodes spaces', () => {
      navigateToSubject('cs 101');
      expect(navigatedPath).toBe('#/subject/cs%20101');
    });

    it('navigateToSubject encodes slashes', () => {
      navigateToSubject('cs/101');
      expect(navigatedPath).toBe('#/subject/cs%2F101');
    });

    it('navigateToSubject encodes hash symbols', () => {
      navigateToSubject('cs#101');
      expect(navigatedPath).toBe('#/subject/cs%23101');
    });

    it('navigateToSubject encodes question marks', () => {
      navigateToSubject('cs?101');
      expect(navigatedPath).toBe('#/subject/cs%3F101');
    });
  });

  describe('two parameter navigation helpers', () => {
    it('navigateToTopic with simple IDs', () => {
      navigateToTopic('cs101', 'topic-1');
      expect(navigatedPath).toBe('#/subject/cs101/topic/topic-1');
    });

    it('navigateToTopic encodes both parameters', () => {
      navigateToTopic('cs 101', 'topic 1');
      expect(navigatedPath).toBe('#/subject/cs%20101/topic/topic%201');
    });

    it('navigateToQuiz with simple IDs', () => {
      navigateToQuiz('cs101', 'quiz-1');
      expect(navigatedPath).toBe('#/subject/cs101/quiz/quiz-1');
    });

    it('navigateToQuiz encodes both parameters', () => {
      navigateToQuiz('math/101', 'quiz#1');
      expect(navigatedPath).toBe('#/subject/math%2F101/quiz/quiz%231');
    });

    it('navigateToExam with simple IDs', () => {
      navigateToExam('cs201', 'midterm');
      expect(navigatedPath).toBe('#/subject/cs201/exam/midterm');
    });

    it('navigateToExam encodes special characters', () => {
      navigateToExam('cs201', 'final-exam@2024');
      expect(navigatedPath).toBe('#/subject/cs201/exam/final-exam%402024');
    });

    it('navigateToExercise with simple IDs', () => {
      navigateToExercise('cs101', 'ex-1');
      expect(navigatedPath).toBe('#/subject/cs101/exercise/ex-1');
    });

    it('navigateToExercise encodes both parameters', () => {
      navigateToExercise('cs+101', 'exercise&1');
      expect(navigatedPath).toBe('#/subject/cs%2B101/exercise/exercise%261');
    });

    it('navigateToProject with simple IDs', () => {
      navigateToProject('cs301', 'project-1');
      expect(navigatedPath).toBe('#/subject/cs301/project/project-1');
    });

    it('navigateToProject encodes special characters', () => {
      navigateToProject('cs=301', 'project[1]');
      expect(navigatedPath).toBe('#/subject/cs%3D301/project/project%5B1%5D');
    });
  });

  describe('three parameter navigation helpers', () => {
    it('navigateToSubtopic with simple IDs', () => {
      navigateToSubtopic('cs101', 'topic-1', 'introduction');
      expect(navigatedPath).toBe('#/subject/cs101/topic/topic-1/subtopic/introduction');
    });

    it('navigateToSubtopic encodes all parameters', () => {
      navigateToSubtopic('cs 101', 'topic/1', 'intro#section');
      expect(navigatedPath).toBe('#/subject/cs%20101/topic/topic%2F1/subtopic/intro%23section');
    });

    it('navigateToSubtopic handles hyphenated slugs', () => {
      navigateToSubtopic('cs101', 'topic-1', 'data-structures-overview');
      expect(navigatedPath).toBe('#/subject/cs101/topic/topic-1/subtopic/data-structures-overview');
    });

    it('navigateToSubtopic handles underscored slugs', () => {
      navigateToSubtopic('cs101', 'topic_1', 'intro_section');
      expect(navigatedPath).toBe('#/subject/cs101/topic/topic_1/subtopic/intro_section');
    });
  });

  describe('edge cases', () => {
    it('handles empty string parameters', () => {
      navigateToSubject('');
      expect(navigatedPath).toBe('#/subject/');
    });

    it('handles unicode characters in parameters', () => {
      navigateToSubject('cours-français');
      expect(navigatedPath).toBe('#/subject/cours-fran%C3%A7ais');
    });

    it('handles emoji in parameters', () => {
      navigateToSubject('math-📚');
      expect(navigatedPath).toBe('#/subject/math-%F0%9F%93%9A');
    });

    it('handles very long parameter values', () => {
      const longId = 'a'.repeat(200);
      navigateToSubject(longId);
      expect(navigatedPath).toBe(`#/subject/${longId}`);
    });

    it('handles parameters with percent signs', () => {
      navigateToSubject('100%');
      expect(navigatedPath).toBe('#/subject/100%25');
    });

    it('handles parameters already encoded', () => {
      // Double encoding should occur (this is correct behavior)
      navigateToSubject('cs%20101');
      expect(navigatedPath).toBe('#/subject/cs%2520101');
    });

    it('handles parameters with mixed case', () => {
      navigateToSubject('CS101');
      expect(navigatedPath).toBe('#/subject/CS101');
    });

    it('handles numeric parameters', () => {
      navigateToTopic('101', '1');
      expect(navigatedPath).toBe('#/subject/101/topic/1');
    });
  });
});

describe('URL encoding consistency', () => {
  let navigatedPath: string | null = null;

  beforeEach(() => {
    navigatedPath = null;
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
        set hash(value: string) {
          navigatedPath = value;
        },
        get hash() {
          return navigatedPath || '';
        },
      },
      writable: true,
    });
  });

  it('all helpers use consistent encoding', () => {
    const specialId = 'test/id#with?special&chars';
    const encodedId = 'test%2Fid%23with%3Fspecial%26chars';

    navigateToSubject(specialId);
    expect(navigatedPath).toContain(encodedId);

    navigateToQuiz(specialId, 'quiz-1');
    expect(navigatedPath).toContain(encodedId);

    navigateToExam(specialId, 'exam-1');
    expect(navigatedPath).toContain(encodedId);

    navigateToExercise(specialId, 'ex-1');
    expect(navigatedPath).toContain(encodedId);

    navigateToProject(specialId, 'proj-1');
    expect(navigatedPath).toContain(encodedId);

    navigateToTopic(specialId, 'topic-1');
    expect(navigatedPath).toContain(encodedId);

    navigateToSubtopic(specialId, 'topic-1', 'sub-1');
    expect(navigatedPath).toContain(encodedId);
  });
});
