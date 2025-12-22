import { describe, expect, it } from 'vitest';
import {
  isCodingExercise,
  getDifficultyLabel,
  stripMarkdown,
  getSubjectContentStats,
} from '../src/services/pdf-export';
import type { Subject, Quiz, Exercise, Project, CodingExercise, WrittenExercise } from '../src/core/types';

// ============================================================
// Test Data Factories
// ============================================================

function createMockSubject(overrides: Partial<Subject> = {}): Subject {
  return {
    id: 'cs101',
    code: 'CS101',
    title: 'Introduction to Computer Science',
    category: 'cs',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'An introductory course',
    learningObjectives: ['Learn basics'],
    topics: [],
    estimatedHours: 40,
    ...overrides,
  };
}

function createMockCodingExercise(overrides: Partial<CodingExercise> = {}): CodingExercise {
  return {
    id: 'ex1',
    subjectId: 'cs101',
    topicId: 't1',
    title: 'Hello World',
    description: 'Print hello world',
    starterCode: 'console.log("Hello");',
    testCases: [],
    hints: [],
    solution: 'console.log("Hello, World!");',
    language: 'javascript',
    ...overrides,
  };
}

function createMockWrittenExercise(overrides: Partial<WrittenExercise> = {}): WrittenExercise {
  return {
    id: 'ex2',
    subjectId: 'cs101',
    topicId: 't1',
    type: 'written',
    title: 'Explain Big O',
    description: 'Describe Big O notation',
    hints: [],
    solution: 'Big O notation describes...',
    ...overrides,
  };
}

function createMockQuiz(overrides: Partial<Quiz> = {}): Quiz {
  return {
    id: 'quiz1',
    subjectId: 'cs101',
    topicId: 't1',
    title: 'Topic 1 Quiz',
    questions: [],
    ...overrides,
  };
}

function createMockProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 'proj1',
    subjectId: 'cs101',
    title: 'Final Project',
    description: 'Build something',
    requirements: ['Requirement 1'],
    rubric: [],
    estimatedHours: 20,
    ...overrides,
  };
}

// ============================================================
// isCodingExercise Tests
// ============================================================

describe('isCodingExercise', () => {
  describe('happy path', () => {
    it('returns true for a coding exercise with starterCode', () => {
      const exercise = createMockCodingExercise();
      expect(isCodingExercise(exercise)).toBe(true);
    });

    it('returns false for a written exercise without starterCode', () => {
      const exercise = createMockWrittenExercise();
      expect(isCodingExercise(exercise)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('returns true when starterCode is an empty string', () => {
      const exercise = createMockCodingExercise({ starterCode: '' });
      expect(isCodingExercise(exercise)).toBe(true);
    });

    it('returns true for exercise with minimal required properties', () => {
      const minimal: Exercise = {
        id: 'min',
        subjectId: 'cs101',
        topicId: 't1',
        title: 'Minimal',
        description: 'Minimal coding exercise',
        starterCode: 'x',
        testCases: [],
        hints: [],
        solution: 'x',
        language: 'javascript',
      };
      expect(isCodingExercise(minimal)).toBe(true);
    });

    it('distinguishes based on starterCode property presence, not type property', () => {
      // A written exercise has type: 'written' but no starterCode
      const written = createMockWrittenExercise();
      expect(isCodingExercise(written)).toBe(false);

      // Coding exercise doesn't have type: 'written' but has starterCode
      const coding = createMockCodingExercise();
      expect(isCodingExercise(coding)).toBe(true);
    });
  });
});

// ============================================================
// getDifficultyLabel Tests
// ============================================================

describe('getDifficultyLabel', () => {
  describe('happy path - valid difficulty levels', () => {
    it('returns "Beginner" for difficulty 1', () => {
      expect(getDifficultyLabel(1)).toBe('Beginner');
    });

    it('returns "Easy" for difficulty 2', () => {
      expect(getDifficultyLabel(2)).toBe('Easy');
    });

    it('returns "Medium" for difficulty 3', () => {
      expect(getDifficultyLabel(3)).toBe('Medium');
    });

    it('returns "Hard" for difficulty 4', () => {
      expect(getDifficultyLabel(4)).toBe('Hard');
    });

    it('returns "Expert" for difficulty 5', () => {
      expect(getDifficultyLabel(5)).toBe('Expert');
    });
  });

  describe('edge cases', () => {
    it('returns empty string for undefined', () => {
      expect(getDifficultyLabel(undefined)).toBe('');
    });

    it('returns empty string for 0 (falsy value)', () => {
      expect(getDifficultyLabel(0)).toBe('');
    });

    it('returns empty string for negative numbers', () => {
      expect(getDifficultyLabel(-1)).toBe('');
    });

    it('returns empty string for values out of range (> 5)', () => {
      expect(getDifficultyLabel(6)).toBe('');
      expect(getDifficultyLabel(100)).toBe('');
    });
  });
});

// ============================================================
// stripMarkdown Tests
// ============================================================

describe('stripMarkdown', () => {
  describe('headers', () => {
    it('strips h1 headers', () => {
      expect(stripMarkdown('# Header')).toBe('Header');
    });

    it('strips h2 headers', () => {
      expect(stripMarkdown('## Header')).toBe('Header');
    });

    it('strips h3 headers', () => {
      expect(stripMarkdown('### Header')).toBe('Header');
    });

    it('strips h4 headers', () => {
      expect(stripMarkdown('#### Header')).toBe('Header');
    });

    it('strips h5 headers', () => {
      expect(stripMarkdown('##### Header')).toBe('Header');
    });

    it('strips h6 headers', () => {
      expect(stripMarkdown('###### Header')).toBe('Header');
    });

    it('strips multiple headers in text', () => {
      const input = '# Title\n## Subtitle\n### Section';
      expect(stripMarkdown(input)).toBe('Title\nSubtitle\nSection');
    });
  });

  describe('text formatting', () => {
    it('strips bold formatting', () => {
      expect(stripMarkdown('This is **bold** text')).toBe('This is bold text');
    });

    it('strips italic formatting', () => {
      expect(stripMarkdown('This is *italic* text')).toBe('This is italic text');
    });

    it('strips inline code formatting', () => {
      expect(stripMarkdown('Use the `console.log` function')).toBe('Use the console.log function');
    });

    it('strips combined formatting', () => {
      const input = 'This has **bold**, *italic*, and `code`';
      expect(stripMarkdown(input)).toBe('This has bold, italic, and code');
    });
  });

  describe('links', () => {
    it('converts links to just the text', () => {
      expect(stripMarkdown('[Click here](https://example.com)')).toBe('Click here');
    });

    it('handles multiple links', () => {
      const input = 'Visit [Google](https://google.com) or [Bing](https://bing.com)';
      expect(stripMarkdown(input)).toBe('Visit Google or Bing');
    });

    it('handles links with complex URLs', () => {
      expect(stripMarkdown('[API Docs](https://example.com/api?foo=bar&baz=qux)')).toBe('API Docs');
    });
  });

  describe('lists', () => {
    it('converts bullet list items with dash', () => {
      expect(stripMarkdown('- Item 1\n- Item 2')).toBe('• Item 1\n• Item 2');
    });

    it('converts bullet list items with asterisk', () => {
      expect(stripMarkdown('* Item 1\n* Item 2')).toBe('• Item 1\n• Item 2');
    });

    it('converts bullet list items with plus', () => {
      expect(stripMarkdown('+ Item 1\n+ Item 2')).toBe('• Item 1\n• Item 2');
    });

    it('handles indented list items', () => {
      expect(stripMarkdown('  - Indented item')).toBe('• Indented item');
    });

    it('strips numbered list markers', () => {
      expect(stripMarkdown('1. First\n2. Second\n3. Third')).toBe('First\nSecond\nThird');
    });

    it('handles double-digit numbered lists', () => {
      expect(stripMarkdown('10. Tenth item')).toBe('Tenth item');
    });
  });

  describe('whitespace handling', () => {
    it('trims leading whitespace', () => {
      expect(stripMarkdown('   Hello')).toBe('Hello');
    });

    it('trims trailing whitespace', () => {
      expect(stripMarkdown('Hello   ')).toBe('Hello');
    });

    it('trims both leading and trailing whitespace', () => {
      expect(stripMarkdown('   Hello   ')).toBe('Hello');
    });
  });

  describe('edge cases', () => {
    it('handles empty string', () => {
      expect(stripMarkdown('')).toBe('');
    });

    it('handles plain text without markdown', () => {
      expect(stripMarkdown('Just plain text')).toBe('Just plain text');
    });

    it('handles text with special characters that are not markdown', () => {
      expect(stripMarkdown('Price: $100 + $50')).toBe('Price: $100 + $50');
    });

    it('handles complex mixed content', () => {
      const input = `# Title

This is **bold** and *italic* text.

## Section

- Item with [link](http://example.com)
- Item with \`code\`

1. Numbered item
2. Another item`;

      // Note: stripMarkdown removes blank lines after section headers
      // and the blank line before numbered list due to how numbered list regex works
      const expected = `Title

This is bold and italic text.

Section
• Item with link
• Item with code
Numbered item
Another item`;

      expect(stripMarkdown(input)).toBe(expected);
    });

    it('handles asterisks in math expressions (not markdown)', () => {
      // Single asterisks touching text are treated as italic
      expect(stripMarkdown('2 * 3 = 6')).toBe('2 * 3 = 6');
    });

    it('handles nested formatting - both bold and italic are stripped', () => {
      // ***text*** is processed as bold(**) containing italic(*), both are stripped
      expect(stripMarkdown('This is ***bold and italic***')).toBe('This is bold and italic');
    });
  });
});

// ============================================================
// getSubjectContentStats Tests
// ============================================================

describe('getSubjectContentStats', () => {
  describe('happy path', () => {
    it('returns correct counts for a subject with content', () => {
      const subject = createMockSubject({
        id: 'cs101',
        topics: [
          { id: 't1', title: 'Topic 1', content: 'Content', quizIds: [], exerciseIds: [] },
          { id: 't2', title: 'Topic 2', content: 'Content', quizIds: [], exerciseIds: [] },
          { id: 't3', title: 'Topic 3', content: 'Content', quizIds: [], exerciseIds: [] },
        ],
      });

      const quizzes: Quiz[] = [
        createMockQuiz({ id: 'q1', subjectId: 'cs101' }),
        createMockQuiz({ id: 'q2', subjectId: 'cs101' }),
      ];

      const exercises: Exercise[] = [
        createMockCodingExercise({ id: 'e1', subjectId: 'cs101' }),
        createMockWrittenExercise({ id: 'e2', subjectId: 'cs101' }),
        createMockCodingExercise({ id: 'e3', subjectId: 'cs101' }),
      ];

      const projects: Project[] = [
        createMockProject({ id: 'p1', subjectId: 'cs101' }),
      ];

      const stats = getSubjectContentStats(subject, quizzes, exercises, projects);

      expect(stats).toEqual({
        topics: 3,
        quizzes: 2,
        exercises: 3,
        projects: 1,
      });
    });

    it('filters content by subject ID', () => {
      const subject = createMockSubject({
        id: 'cs101',
        topics: [{ id: 't1', title: 'Topic', content: '', quizIds: [], exerciseIds: [] }],
      });

      // Mix of content from different subjects
      const quizzes: Quiz[] = [
        createMockQuiz({ id: 'q1', subjectId: 'cs101' }),
        createMockQuiz({ id: 'q2', subjectId: 'cs102' }), // Different subject
        createMockQuiz({ id: 'q3', subjectId: 'cs101' }),
      ];

      const exercises: Exercise[] = [
        createMockCodingExercise({ id: 'e1', subjectId: 'cs102' }), // Different subject
        createMockCodingExercise({ id: 'e2', subjectId: 'cs101' }),
      ];

      const projects: Project[] = [
        createMockProject({ id: 'p1', subjectId: 'math101' }), // Different subject
        createMockProject({ id: 'p2', subjectId: 'cs102' }),   // Different subject
      ];

      const stats = getSubjectContentStats(subject, quizzes, exercises, projects);

      expect(stats).toEqual({
        topics: 1,
        quizzes: 2,  // Only cs101 quizzes
        exercises: 1, // Only cs101 exercises
        projects: 0,  // No cs101 projects
      });
    });
  });

  describe('edge cases', () => {
    it('returns zeros for empty arrays', () => {
      const subject = createMockSubject({ topics: [] });

      const stats = getSubjectContentStats(subject, [], [], []);

      expect(stats).toEqual({
        topics: 0,
        quizzes: 0,
        exercises: 0,
        projects: 0,
      });
    });

    it('returns correct topic count even when no assessments exist', () => {
      const subject = createMockSubject({
        topics: [
          { id: 't1', title: 'Topic 1', content: '', quizIds: [], exerciseIds: [] },
          { id: 't2', title: 'Topic 2', content: '', quizIds: [], exerciseIds: [] },
        ],
      });

      const stats = getSubjectContentStats(subject, [], [], []);

      expect(stats).toEqual({
        topics: 2,
        quizzes: 0,
        exercises: 0,
        projects: 0,
      });
    });

    it('returns zero for matching content when subject ID does not match any', () => {
      const subject = createMockSubject({ id: 'nonexistent' });

      const quizzes: Quiz[] = [
        createMockQuiz({ subjectId: 'cs101' }),
        createMockQuiz({ subjectId: 'cs102' }),
      ];

      const stats = getSubjectContentStats(subject, quizzes, [], []);

      expect(stats).toEqual({
        topics: 0,
        quizzes: 0,
        exercises: 0,
        projects: 0,
      });
    });

    it('handles many topics correctly', () => {
      const topics = Array.from({ length: 20 }, (_, i) => ({
        id: `t${i}`,
        title: `Topic ${i}`,
        content: '',
        quizIds: [],
        exerciseIds: [],
      }));

      const subject = createMockSubject({ topics });

      const stats = getSubjectContentStats(subject, [], [], []);

      expect(stats.topics).toBe(20);
    });
  });

  describe('type checking', () => {
    it('counts both coding and written exercises', () => {
      const subject = createMockSubject({ id: 'cs101' });

      const exercises: Exercise[] = [
        createMockCodingExercise({ id: 'coding1', subjectId: 'cs101' }),
        createMockWrittenExercise({ id: 'written1', subjectId: 'cs101' }),
        createMockCodingExercise({ id: 'coding2', subjectId: 'cs101' }),
        createMockWrittenExercise({ id: 'written2', subjectId: 'cs101' }),
      ];

      const stats = getSubjectContentStats(subject, [], exercises, []);

      expect(stats.exercises).toBe(4);
    });
  });
});
