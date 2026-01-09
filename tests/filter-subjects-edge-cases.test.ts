/**
 * Additional edge case tests for filterSubjects function
 *
 * These tests cover edge cases related to search patterns, special characters,
 * and boundary conditions in the course builder subject filtering.
 */

import { describe, it, expect } from 'vitest';
import type { Subject } from '../src/core/types';
import { filterSubjects, type CourseBuilderFilters } from '../src/pages/course-builder-utils';

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

describe('filterSubjects - Search Edge Cases', () => {
  describe('whitespace handling', () => {
    const subjects = [
      makeSubject({ id: 'cs101', code: 'CS101', title: 'Intro to Programming' }),
    ];

    it('handles multiple spaces in search', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'intro   programming',
      };
      const result = filterSubjects(subjects, filters);
      // Should not match because exact string not found
      expect(result.length).toBe(0);
    });

    it('handles tab characters in search', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '\tintro\t',
      };
      const result = filterSubjects(subjects, filters);
      // Should match after trimming
      expect(result.length).toBe(1);
    });

    it('handles newline in search (trims it)', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'intro\n',
      };
      const result = filterSubjects(subjects, filters);
      // Newline is part of trim, should still match
      expect(result.length).toBe(1);
    });
  });

  describe('case sensitivity', () => {
    const subjects = [
      makeSubject({ id: 'cs101', code: 'CS101', title: 'JavaScript Basics' }),
    ];

    it('matches lowercase search against uppercase code', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'cs101',
      };
      expect(filterSubjects(subjects, filters).length).toBe(1);
    });

    it('matches uppercase search against mixed case title', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'JAVASCRIPT',
      };
      expect(filterSubjects(subjects, filters).length).toBe(1);
    });

    it('matches mixed case search', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'JaVaScRiPt',
      };
      expect(filterSubjects(subjects, filters).length).toBe(1);
    });
  });

  describe('special characters in search', () => {
    const subjects = [
      makeSubject({
        id: 'cpp101',
        code: 'CPP101',
        title: 'C++ Programming',
        description: 'Learn C++ & memory management',
      }),
      makeSubject({
        id: 'csharp101',
        code: 'CSHARP101',
        title: 'C# Programming',
        description: 'Learn .NET framework',
      }),
      makeSubject({
        id: 'regex101',
        code: 'REGEX101',
        title: 'Regular Expressions',
        description: 'Patterns like [a-z]+ and \\d{3}',
      }),
    ];

    it('handles plus signs in search (C++)', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'C++',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('cpp101');
    });

    it('handles hash sign in search (C#)', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'C#',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('csharp101');
    });

    it('handles ampersand in search', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '& memory',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('cpp101');
    });

    it('handles dot in search (.NET)', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '.NET',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('csharp101');
    });

    it('handles square brackets in search', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '[a-z]',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('regex101');
    });

    it('handles backslash in search', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '\\d',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('regex101');
    });
  });

  describe('unicode and international characters', () => {
    const subjects = [
      makeSubject({
        id: 'chinese101',
        code: 'LANG101',
        title: '中文课程',
        description: 'Learn Chinese characters',
      }),
      makeSubject({
        id: 'spanish101',
        code: 'LANG102',
        title: 'Español Básico',
        description: 'Learn Spanish with ñ and ¿',
      }),
      makeSubject({
        id: 'math-symbols',
        code: 'MATH301',
        title: 'Mathematical Analysis',
        description: 'Covers ∑, ∫, and ∂ notation',
      }),
    ];

    it('matches Chinese characters', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '中文',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('chinese101');
    });

    it('matches Spanish accented characters', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'Español',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('spanish101');
    });

    it('matches ñ character', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'ñ',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('spanish101');
    });

    it('matches mathematical symbols', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '∑',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('math-symbols');
    });
  });

  describe('numeric searches', () => {
    const subjects = [
      makeSubject({ id: 'cs101', code: 'CS101', title: 'Programming 101' }),
      makeSubject({ id: 'cs201', code: 'CS201', title: 'Advanced Programming' }),
      makeSubject({ id: 'cs301', code: 'CS301', title: 'System Design' }),
    ];

    it('matches numeric-only search', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '101',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('cs101');
    });

    it('matches numeric prefix in code', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '2',
      };
      const result = filterSubjects(subjects, filters);
      expect(result.length).toBe(1);
      expect(result[0].code).toBe('CS201');
    });

    it('matches numeric suffix pattern', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '01',
      };
      const result = filterSubjects(subjects, filters);
      // Matches CS101, CS201, CS301 (all end in 01)
      expect(result.length).toBe(3);
    });
  });

  describe('empty and boundary cases', () => {
    const subjects = [
      makeSubject({ id: 'cs101', code: 'CS101', title: 'Test' }),
    ];

    it('empty search returns all subjects', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '',
      };
      expect(filterSubjects(subjects, filters).length).toBe(1);
    });

    it('whitespace-only search returns all subjects (trims to empty)', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: '   ',
      };
      expect(filterSubjects(subjects, filters).length).toBe(1);
    });

    it('very long search string with no match returns empty', () => {
      const filters: CourseBuilderFilters = {
        category: 'all',
        year: null,
        search: 'a'.repeat(1000),
      };
      expect(filterSubjects(subjects, filters).length).toBe(0);
    });
  });
});

describe('filterSubjects - Category Filter Edge Cases', () => {
  const subjects = [
    makeSubject({ id: 'cs101', category: 'cs' }),
    makeSubject({ id: 'math101', category: 'math' }),
  ];

  it('filters by exact category match', () => {
    const filters: CourseBuilderFilters = {
      category: 'cs',
      year: null,
      search: '',
    };
    const result = filterSubjects(subjects, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('cs101');
  });

  it('"all" category returns all subjects', () => {
    const filters: CourseBuilderFilters = {
      category: 'all',
      year: null,
      search: '',
    };
    expect(filterSubjects(subjects, filters).length).toBe(2);
  });

  it('non-existent category returns empty array', () => {
    const filters: CourseBuilderFilters = {
      // @ts-expect-error Testing invalid category
      category: 'physics',
      year: null,
      search: '',
    };
    expect(filterSubjects(subjects, filters).length).toBe(0);
  });
});

describe('filterSubjects - Year Filter Edge Cases', () => {
  const subjects = [
    makeSubject({ id: 'y1', year: 1 }),
    makeSubject({ id: 'y2', year: 2 }),
    makeSubject({ id: 'y3', year: 3 }),
    makeSubject({ id: 'y4', year: 4 }),
  ];

  it('filters by year 1', () => {
    const filters: CourseBuilderFilters = {
      category: 'all',
      year: 1,
      search: '',
    };
    expect(filterSubjects(subjects, filters).length).toBe(1);
  });

  it('null year returns all years', () => {
    const filters: CourseBuilderFilters = {
      category: 'all',
      year: null,
      search: '',
    };
    expect(filterSubjects(subjects, filters).length).toBe(4);
  });

  it('year 0 returns no subjects (no year 0 exists)', () => {
    const filters: CourseBuilderFilters = {
      category: 'all',
      year: 0,
      search: '',
    };
    expect(filterSubjects(subjects, filters).length).toBe(0);
  });

  it('year 5 returns no subjects (no year 5 exists)', () => {
    const filters: CourseBuilderFilters = {
      category: 'all',
      year: 5,
      search: '',
    };
    expect(filterSubjects(subjects, filters).length).toBe(0);
  });

  it('negative year returns no subjects', () => {
    const filters: CourseBuilderFilters = {
      category: 'all',
      year: -1,
      search: '',
    };
    expect(filterSubjects(subjects, filters).length).toBe(0);
  });
});

describe('filterSubjects - Combined Filters', () => {
  const subjects = [
    makeSubject({ id: 'cs101', code: 'CS101', title: 'Intro', category: 'cs', year: 1 }),
    makeSubject({ id: 'cs201', code: 'CS201', title: 'Advanced', category: 'cs', year: 2 }),
    makeSubject({ id: 'math101', code: 'MATH101', title: 'Calculus', category: 'math', year: 1 }),
    makeSubject({ id: 'math201', code: 'MATH201', title: 'Linear Algebra', category: 'math', year: 2 }),
  ];

  it('category + year narrows results', () => {
    const filters: CourseBuilderFilters = {
      category: 'cs',
      year: 1,
      search: '',
    };
    const result = filterSubjects(subjects, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('cs101');
  });

  it('category + search narrows results', () => {
    const filters: CourseBuilderFilters = {
      category: 'math',
      year: null,
      search: 'linear',
    };
    const result = filterSubjects(subjects, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('math201');
  });

  it('year + search narrows results', () => {
    const filters: CourseBuilderFilters = {
      category: 'all',
      year: 1,
      search: '101',
    };
    const result = filterSubjects(subjects, filters);
    expect(result.length).toBe(2); // cs101 and math101
  });

  it('all three filters combined', () => {
    const filters: CourseBuilderFilters = {
      category: 'cs',
      year: 2,
      search: 'advanced',
    };
    const result = filterSubjects(subjects, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('cs201');
  });

  it('conflicting filters return empty', () => {
    const filters: CourseBuilderFilters = {
      category: 'cs',
      year: 1,
      search: 'linear', // "Linear Algebra" is math, not cs
    };
    expect(filterSubjects(subjects, filters).length).toBe(0);
  });
});

describe('filterSubjects - Ordering', () => {
  it('preserves original array order', () => {
    const subjects = [
      makeSubject({ id: 'b', code: 'B101' }),
      makeSubject({ id: 'a', code: 'A101' }),
      makeSubject({ id: 'c', code: 'C101' }),
    ];
    const filters: CourseBuilderFilters = {
      category: 'all',
      year: null,
      search: '',
    };
    const result = filterSubjects(subjects, filters);
    expect(result.map(s => s.id)).toEqual(['b', 'a', 'c']);
  });

  it('filtered results preserve original order', () => {
    const subjects = [
      makeSubject({ id: 'c', code: 'XYZ103', description: 'Has XYZ keyword' }),
      makeSubject({ id: 'a', code: 'XYZ101', description: 'Has XYZ keyword' }),
      makeSubject({ id: 'b', code: 'XYZ102', description: 'Has XYZ keyword' }),
      makeSubject({ id: 'd', code: 'OTHER999', description: 'No match here' }),
    ];
    const filters: CourseBuilderFilters = {
      category: 'all',
      year: null,
      search: 'XYZ',
    };
    const result = filterSubjects(subjects, filters);
    expect(result.map(s => s.id)).toEqual(['c', 'a', 'b']);
  });
});
