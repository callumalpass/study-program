import { describe, expect, it } from 'vitest';
import type { Exercise, CodingExercise, WrittenExercise } from '../src/core/types';
import { getMascotForPath } from '../src/components/preact/mascotMood';

// Helper to create a coding exercise
const makeCodingExercise = (overrides: Partial<CodingExercise>): CodingExercise => ({
  id: 'test-exercise',
  subjectId: 'cs101',
  topicId: 't1',
  title: 'Test Exercise',
  description: 'A test exercise',
  starterCode: '',
  testCases: [],
  hints: [],
  solution: '',
  language: 'python',
  ...overrides,
});

// Helper to create a written exercise
const makeWrittenExercise = (overrides: Partial<WrittenExercise>): WrittenExercise => ({
  id: 'test-written',
  subjectId: 'math101',
  topicId: 't1',
  type: 'written',
  title: 'Test Written Exercise',
  description: 'A test written exercise',
  hints: [],
  solution: '',
  ...overrides,
});

describe('getMascotForPath', () => {
  describe('reading content (subtopic pages)', () => {
    it('returns Reading for subtopic paths with slug', () => {
      expect(getMascotForPath('/subject/cs101/topic/t1/introduction', [])).toBe('Reading');
    });

    it('returns Reading for different subject subtopic paths', () => {
      expect(getMascotForPath('/subject/math101/topic/t3/limits-and-continuity', [])).toBe('Reading');
    });

    it('returns Reading for subtopic paths with complex slugs', () => {
      expect(getMascotForPath('/subject/cs202/topic/arch-1/cpu-pipeline-basics', [])).toBe('Reading');
    });

    it('returns Reading for subtopic paths with numeric components', () => {
      expect(getMascotForPath('/subject/cs101/topic/topic-1/section-2', [])).toBe('Reading');
    });

    it('does not return Reading for topic paths without subtopic', () => {
      expect(getMascotForPath('/subject/cs101/topic/t1', [])).not.toBe('Reading');
    });

    it('does not return Reading for subject page without topic', () => {
      expect(getMascotForPath('/subject/cs101', [])).not.toBe('Reading');
    });
  });

  describe('exercise pages', () => {
    describe('with difficulty', () => {
      it('returns Confused for hard exercises (difficulty 4)', () => {
        const exercises: Exercise[] = [
          makeCodingExercise({ id: 'hard-ex', difficulty: 4 }),
        ];
        expect(getMascotForPath('/subject/cs101/exercise/hard-ex', exercises)).toBe('Confused');
      });

      it('returns Confused for very hard exercises (difficulty 5)', () => {
        const exercises: Exercise[] = [
          makeCodingExercise({ id: 'very-hard-ex', difficulty: 5 }),
        ];
        expect(getMascotForPath('/subject/cs101/exercise/very-hard-ex', exercises)).toBe('Confused');
      });

      it('returns Pondering for easier exercises (difficulty 3)', () => {
        const exercises: Exercise[] = [
          makeCodingExercise({ id: 'medium-ex', difficulty: 3 }),
        ];
        expect(getMascotForPath('/subject/cs101/exercise/medium-ex', exercises)).toBe('Pondering');
      });

      it('returns Pondering for easy exercises (difficulty 1)', () => {
        const exercises: Exercise[] = [
          makeCodingExercise({ id: 'easy-ex', difficulty: 1 }),
        ];
        expect(getMascotForPath('/subject/cs101/exercise/easy-ex', exercises)).toBe('Pondering');
      });

      it('returns Pondering for exercises with difficulty 2', () => {
        const exercises: Exercise[] = [
          makeCodingExercise({ id: 'somewhat-easy-ex', difficulty: 2 }),
        ];
        expect(getMascotForPath('/subject/cs101/exercise/somewhat-easy-ex', exercises)).toBe('Pondering');
      });
    });

    describe('without difficulty', () => {
      it('returns Pondering for exercises without difficulty set', () => {
        const exercises: Exercise[] = [
          makeCodingExercise({ id: 'no-diff-ex', difficulty: undefined }),
        ];
        expect(getMascotForPath('/subject/cs101/exercise/no-diff-ex', exercises)).toBe('Pondering');
      });
    });

    describe('exercise not found', () => {
      it('returns Pondering when exercise ID not in array', () => {
        const exercises: Exercise[] = [
          makeCodingExercise({ id: 'other-ex', difficulty: 5 }),
        ];
        expect(getMascotForPath('/subject/cs101/exercise/unknown-ex', exercises)).toBe('Pondering');
      });

      it('returns Pondering when exercises array is empty', () => {
        expect(getMascotForPath('/subject/cs101/exercise/any-ex', [])).toBe('Pondering');
      });
    });

    describe('path variations', () => {
      it('handles exercise paths with query parameters', () => {
        const exercises: Exercise[] = [
          makeCodingExercise({ id: 'ex-with-query', difficulty: 5 }),
        ];
        expect(getMascotForPath('/subject/cs101/exercise/ex-with-query?param=value', exercises)).toBe('Confused');
      });

      it('handles exercise paths from different subjects', () => {
        const exercises: Exercise[] = [
          makeCodingExercise({ id: 'math-ex', subjectId: 'math101', difficulty: 4 }),
        ];
        expect(getMascotForPath('/subject/math101/exercise/math-ex', exercises)).toBe('Confused');
      });
    });

    describe('written exercises', () => {
      it('returns Confused for hard written exercises', () => {
        const exercises: Exercise[] = [
          makeWrittenExercise({ id: 'hard-written', difficulty: 4 }),
        ];
        expect(getMascotForPath('/subject/math101/exercise/hard-written', exercises)).toBe('Confused');
      });

      it('returns Pondering for easier written exercises', () => {
        const exercises: Exercise[] = [
          makeWrittenExercise({ id: 'easy-written', difficulty: 2 }),
        ];
        expect(getMascotForPath('/subject/math101/exercise/easy-written', exercises)).toBe('Pondering');
      });
    });
  });

  describe('quiz pages', () => {
    it('returns Pondering for quiz paths', () => {
      expect(getMascotForPath('/subject/cs101/quiz/q1', [])).toBe('Pondering');
    });

    it('returns Pondering for different quiz IDs', () => {
      expect(getMascotForPath('/subject/math101/quiz/math-quiz-1', [])).toBe('Pondering');
    });

    it('returns Pondering for quiz paths with various formats', () => {
      expect(getMascotForPath('/quiz/standalone-quiz', [])).toBe('Pondering');
    });
  });

  describe('exam pages', () => {
    it('returns Shocked for exam paths', () => {
      expect(getMascotForPath('/subject/cs101/exam/midterm', [])).toBe('Shocked');
    });

    it('returns Shocked for different exam types', () => {
      expect(getMascotForPath('/subject/cs101/exam/final', [])).toBe('Shocked');
    });

    it('returns Shocked for exam paths with various formats', () => {
      expect(getMascotForPath('/exam/cs101-exam-1', [])).toBe('Shocked');
    });
  });

  describe('settings page', () => {
    it('returns Sleeping for settings path', () => {
      expect(getMascotForPath('/settings', [])).toBe('Sleeping');
    });

    it('returns Sleeping for settings subpaths', () => {
      expect(getMascotForPath('/settings/theme', [])).toBe('Sleeping');
    });
  });

  describe('progress page', () => {
    it('returns Zen for progress path', () => {
      expect(getMascotForPath('/progress', [])).toBe('Zen');
    });

    it('returns Zen for progress subpaths', () => {
      expect(getMascotForPath('/progress/detailed', [])).toBe('Zen');
    });
  });

  describe('default/other paths', () => {
    it('returns Pensive for home path', () => {
      expect(getMascotForPath('/', [])).toBe('Pensive');
    });

    it('returns Pensive for curriculum path', () => {
      expect(getMascotForPath('/curriculum', [])).toBe('Pensive');
    });

    it('returns Pensive for subject page without topic', () => {
      expect(getMascotForPath('/subject/cs101', [])).toBe('Pensive');
    });

    it('returns Pensive for unknown paths', () => {
      expect(getMascotForPath('/unknown/path', [])).toBe('Pensive');
    });

    it('returns Pensive for export page', () => {
      expect(getMascotForPath('/export', [])).toBe('Pensive');
    });

    it('returns Pensive for timeline page', () => {
      expect(getMascotForPath('/timeline', [])).toBe('Pensive');
    });

    it('returns Pensive for course builder page', () => {
      expect(getMascotForPath('/course-builder', [])).toBe('Pensive');
    });
  });

  describe('path priority/specificity', () => {
    it('exercise check happens before quiz check when both match', () => {
      // A path like /exercise/quiz-ex should match exercise, not quiz
      const exercises: Exercise[] = [
        makeCodingExercise({ id: 'quiz-ex', difficulty: 5 }),
      ];
      expect(getMascotForPath('/subject/cs101/exercise/quiz-ex', exercises)).toBe('Confused');
    });

    it('subtopic reading takes priority over subject path', () => {
      // The subtopic regex is more specific and should match first
      expect(getMascotForPath('/subject/cs101/topic/t1/content', [])).toBe('Reading');
    });
  });

  describe('edge cases', () => {
    it('handles empty path', () => {
      expect(getMascotForPath('', [])).toBe('Pensive');
    });

    it('handles paths with trailing slashes', () => {
      expect(getMascotForPath('/settings/', [])).toBe('Sleeping');
    });

    it('handles paths with special characters', () => {
      expect(getMascotForPath('/subject/cs-101/topic/t-1/intro-duction', [])).toBe('Reading');
    });

    it('handles multiple exercises finding the correct one', () => {
      const exercises: Exercise[] = [
        makeCodingExercise({ id: 'ex-1', difficulty: 1 }),
        makeCodingExercise({ id: 'ex-2', difficulty: 5 }),
        makeCodingExercise({ id: 'ex-3', difficulty: 3 }),
      ];
      // Should find ex-2 which has difficulty 5
      expect(getMascotForPath('/subject/cs101/exercise/ex-2', exercises)).toBe('Confused');
      // Should find ex-1 which has difficulty 1
      expect(getMascotForPath('/subject/cs101/exercise/ex-1', exercises)).toBe('Pondering');
    });
  });
});
