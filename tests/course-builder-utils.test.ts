import { describe, it, expect } from 'vitest';
import type { Subject } from '../src/core/types';
import {
  getMissingPrerequisites,
  getDependentSubjects,
  filterSubjects,
  type CourseBuilderFilters,
} from '../src/pages/course-builder-utils';

// Helper to create a minimal subject for testing
const makeSubject = (overrides: Partial<Subject>): Subject => ({
  id: 'test-subject',
  code: 'TEST101',
  title: 'Test Subject',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'A test subject for unit testing',
  learningObjectives: ['Learn testing'],
  topics: [],
  estimatedHours: 10,
  ...overrides,
});

// Test curriculum with realistic prerequisite chains
const testCurriculum: Subject[] = [
  makeSubject({
    id: 'cs101',
    code: 'CS101',
    title: 'Introduction to Programming',
    category: 'cs',
    year: 1,
    prerequisites: [],
    description: 'Learn the fundamentals of programming',
  }),
  makeSubject({
    id: 'math101',
    code: 'MATH101',
    title: 'Discrete Mathematics',
    category: 'math',
    year: 1,
    prerequisites: [],
    description: 'Introduction to discrete mathematical structures',
  }),
  makeSubject({
    id: 'cs201',
    code: 'CS201',
    title: 'Data Structures',
    category: 'cs',
    year: 2,
    prerequisites: ['cs101'],
    description: 'Learn about arrays, linked lists, trees, and graphs',
  }),
  makeSubject({
    id: 'cs202',
    code: 'CS202',
    title: 'Algorithms',
    category: 'cs',
    year: 2,
    prerequisites: ['cs201', 'math101'],
    description: 'Algorithm design and analysis techniques',
  }),
  makeSubject({
    id: 'cs301',
    code: 'CS301',
    title: 'Database Systems',
    category: 'cs',
    year: 3,
    prerequisites: ['cs201'],
    description: 'Relational databases and SQL',
  }),
  makeSubject({
    id: 'math201',
    code: 'MATH201',
    title: 'Linear Algebra',
    category: 'math',
    year: 2,
    prerequisites: ['math101'],
    description: 'Vectors, matrices, and linear transformations',
  }),
];

describe('course-builder-utils', () => {
  describe('getMissingPrerequisites', () => {
    it('returns empty array when subject has no prerequisites', () => {
      const result = getMissingPrerequisites('cs101', [], testCurriculum);
      expect(result).toEqual([]);
    });

    it('returns empty array when all prerequisites are selected', () => {
      // cs202 requires cs201 and math101
      const selectedIds = ['cs201', 'math101'];
      const result = getMissingPrerequisites('cs202', selectedIds, testCurriculum);
      expect(result).toEqual([]);
    });

    it('returns missing prerequisites when some are not selected', () => {
      // cs202 requires cs201 and math101; only cs201 is selected
      const selectedIds = ['cs201'];
      const result = getMissingPrerequisites('cs202', selectedIds, testCurriculum);
      expect(result).toEqual(['math101']);
    });

    it('returns all prerequisites when none are selected', () => {
      const result = getMissingPrerequisites('cs202', [], testCurriculum);
      expect(result).toEqual(['cs201', 'math101']);
    });

    it('returns empty array for non-existent subject', () => {
      const result = getMissingPrerequisites('non-existent', ['cs101'], testCurriculum);
      expect(result).toEqual([]);
    });

    it('handles single prerequisite correctly', () => {
      const result = getMissingPrerequisites('cs201', [], testCurriculum);
      expect(result).toEqual(['cs101']);
    });

    it('returns empty when the only prerequisite is selected', () => {
      const result = getMissingPrerequisites('cs201', ['cs101'], testCurriculum);
      expect(result).toEqual([]);
    });

    it('handles empty curriculum gracefully', () => {
      const result = getMissingPrerequisites('cs101', ['cs101'], []);
      expect(result).toEqual([]);
    });
  });

  describe('getDependentSubjects', () => {
    it('returns empty array when no subjects depend on the given subject', () => {
      const selectedIds = ['cs101'];
      const result = getDependentSubjects('cs101', selectedIds, testCurriculum);
      expect(result).toEqual([]);
    });

    it('returns subjects that depend on the given subject', () => {
      const selectedIds = ['cs101', 'cs201'];
      const result = getDependentSubjects('cs101', selectedIds, testCurriculum);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('cs201');
    });

    it('returns multiple dependent subjects', () => {
      const selectedIds = ['cs101', 'cs201', 'cs202', 'cs301'];
      const result = getDependentSubjects('cs201', selectedIds, testCurriculum);
      expect(result).toHaveLength(2);
      const ids = result.map(s => s.id);
      expect(ids).toContain('cs202');
      expect(ids).toContain('cs301');
    });

    it('only returns selected dependent subjects', () => {
      // cs202 and cs301 both depend on cs201, but only cs301 is selected
      const selectedIds = ['cs101', 'cs201', 'cs301'];
      const result = getDependentSubjects('cs201', selectedIds, testCurriculum);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('cs301');
    });

    it('returns empty when dependent subjects are not in selection', () => {
      const selectedIds = ['cs101', 'cs201'];
      // cs202 depends on cs201, but cs202 is not selected
      const result = getDependentSubjects('cs201', selectedIds, testCurriculum);
      expect(result).toEqual([]);
    });

    it('handles subject with no dependents in curriculum', () => {
      const selectedIds = ['cs101', 'cs201', 'cs301'];
      // cs301 has no subjects depending on it
      const result = getDependentSubjects('cs301', selectedIds, testCurriculum);
      expect(result).toEqual([]);
    });

    it('handles non-existent subject ID', () => {
      const selectedIds = ['cs101', 'cs201'];
      const result = getDependentSubjects('non-existent', selectedIds, testCurriculum);
      expect(result).toEqual([]);
    });

    it('handles empty curriculum', () => {
      const result = getDependentSubjects('cs101', ['cs101', 'cs201'], []);
      expect(result).toEqual([]);
    });

    it('handles empty selection', () => {
      const result = getDependentSubjects('cs101', [], testCurriculum);
      expect(result).toEqual([]);
    });
  });

  describe('filterSubjects', () => {
    describe('with no filters (defaults)', () => {
      it('returns all subjects when no filters are applied', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(testCurriculum.length);
      });
    });

    describe('category filter', () => {
      it('filters by CS category', () => {
        const filters: CourseBuilderFilters = {
          category: 'cs',
          year: null,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result.every(s => s.category === 'cs')).toBe(true);
        expect(result).toHaveLength(4); // cs101, cs201, cs202, cs301
      });

      it('filters by math category', () => {
        const filters: CourseBuilderFilters = {
          category: 'math',
          year: null,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result.every(s => s.category === 'math')).toBe(true);
        expect(result).toHaveLength(2); // math101, math201
      });

      it('returns empty when category has no matches', () => {
        const filters: CourseBuilderFilters = {
          category: 'physics',
          year: null,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toEqual([]);
      });
    });

    describe('year filter', () => {
      it('filters by year 1', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: 1,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result.every(s => s.year === 1)).toBe(true);
        expect(result).toHaveLength(2); // cs101, math101
      });

      it('filters by year 2', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: 2,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result.every(s => s.year === 2)).toBe(true);
        expect(result).toHaveLength(3); // cs201, cs202, math201
      });

      it('filters by year 3', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: 3,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result.every(s => s.year === 3)).toBe(true);
        expect(result).toHaveLength(1); // cs301
      });

      it('returns empty when year has no matches', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: 4,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toEqual([]);
      });
    });

    describe('search filter', () => {
      it('matches subject code (case-insensitive)', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: 'cs201',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(1);
        expect(result[0].code).toBe('CS201');
      });

      it('matches subject code uppercase', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: 'CS201',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(1);
        expect(result[0].code).toBe('CS201');
      });

      it('matches subject title', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: 'algorithms',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('cs202');
      });

      it('matches subject description', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: 'SQL',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('cs301');
      });

      it('returns multiple matches', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: 'data',
        };
        const result = filterSubjects(testCurriculum, filters);
        // Matches "Data Structures" and "Relational databases"
        expect(result.length).toBeGreaterThanOrEqual(2);
      });

      it('returns empty when search has no matches', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: 'quantum',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toEqual([]);
      });

      it('handles partial code match', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: 'math',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(2);
        expect(result.every(s => s.category === 'math')).toBe(true);
      });

      it('handles whitespace in search by trimming', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: '  programming  ',
        };
        // Search should trim whitespace and find matches
        const result = filterSubjects(testCurriculum, filters);
        // Should match "Introduction to Programming"
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('cs101');
      });
    });

    describe('combined filters', () => {
      it('applies category and year filters together', () => {
        const filters: CourseBuilderFilters = {
          category: 'cs',
          year: 2,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(2); // cs201, cs202
        expect(result.every(s => s.category === 'cs' && s.year === 2)).toBe(true);
      });

      it('applies category and search filters together', () => {
        const filters: CourseBuilderFilters = {
          category: 'cs',
          year: null,
          search: 'structures',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('cs201');
      });

      it('applies year and search filters together', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: 2,
          search: 'math',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('math201');
      });

      it('applies all filters together', () => {
        const filters: CourseBuilderFilters = {
          category: 'cs',
          year: 2,
          search: 'algorithm',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('cs202');
      });

      it('returns empty when combined filters have no matches', () => {
        const filters: CourseBuilderFilters = {
          category: 'math',
          year: 3,
          search: 'programming',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toEqual([]);
      });
    });

    describe('edge cases', () => {
      it('handles empty subjects array', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: '',
        };
        const result = filterSubjects([], filters);
        expect(result).toEqual([]);
      });

      it('handles empty search string (does not filter)', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        expect(result).toHaveLength(testCurriculum.length);
      });

      it('handles single-character search', () => {
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: 'a',
        };
        const result = filterSubjects(testCurriculum, filters);
        // Should match subjects with 'a' in code, title, or description
        expect(result.length).toBeGreaterThan(0);
      });

      it('handles special regex characters in search', () => {
        const subjectsWithSpecialChars = [
          makeSubject({
            id: 'test-special',
            code: 'TEST123',
            title: 'Test (Special)',
            description: 'A test with [brackets] and $symbols',
          }),
        ];
        const filters: CourseBuilderFilters = {
          category: 'all',
          year: null,
          search: '(special)',
        };
        const result = filterSubjects(subjectsWithSpecialChars, filters);
        expect(result).toHaveLength(1);
      });

      it('preserves original order of subjects', () => {
        const filters: CourseBuilderFilters = {
          category: 'cs',
          year: null,
          search: '',
        };
        const result = filterSubjects(testCurriculum, filters);
        const csSubjects = testCurriculum.filter(s => s.category === 'cs');
        expect(result.map(s => s.id)).toEqual(csSubjects.map(s => s.id));
      });
    });
  });
});
