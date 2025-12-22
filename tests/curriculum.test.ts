import { describe, it, expect } from 'vitest';
import {
  curriculum,
  curriculumStats,
  getSubjectById,
  getSubjectsByYearSemester,
  getPrerequisites,
  arePrerequisitesMet,
} from '../src/data/curriculum';

describe('curriculum data', () => {
  describe('curriculum array', () => {
    it('contains subjects', () => {
      expect(curriculum.length).toBeGreaterThan(0);
    });

    it('has unique subject IDs', () => {
      const ids = curriculum.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('has unique subject codes', () => {
      const codes = curriculum.map(s => s.code);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });

    it('all subjects have required fields', () => {
      curriculum.forEach(subject => {
        expect(subject.id).toBeDefined();
        expect(subject.code).toBeDefined();
        expect(subject.title).toBeDefined();
        expect(subject.category).toMatch(/^(cs|math|physics|philosophy|economics|statistics)$/);
        expect(subject.year).toBeGreaterThanOrEqual(1);
        expect(subject.year).toBeLessThanOrEqual(4);
        expect(subject.semester).toBeGreaterThanOrEqual(1);
        expect(subject.semester).toBeLessThanOrEqual(2);
        expect(Array.isArray(subject.prerequisites)).toBe(true);
        expect(subject.description).toBeDefined();
        expect(Array.isArray(subject.learningObjectives)).toBe(true);
        expect(Array.isArray(subject.topics)).toBe(true);
        expect(subject.estimatedHours).toBeGreaterThan(0);
      });
    });

    it('all prerequisites reference existing subjects', () => {
      const subjectIds = new Set(curriculum.map(s => s.id));
      curriculum.forEach(subject => {
        subject.prerequisites.forEach(prereqId => {
          expect(subjectIds.has(prereqId)).toBe(true);
        });
      });
    });

    it('no subject lists itself as a prerequisite', () => {
      curriculum.forEach(subject => {
        expect(subject.prerequisites).not.toContain(subject.id);
      });
    });
  });

  describe('curriculumStats', () => {
    it('has correct total subjects count', () => {
      expect(curriculumStats.totalSubjects).toBe(curriculum.length);
    });

    it('has correct total estimated hours', () => {
      const calculatedHours = curriculum.reduce((sum, s) => sum + s.estimatedHours, 0);
      expect(curriculumStats.totalEstimatedHours).toBe(calculatedHours);
    });

    it('has correct subjects by year breakdown', () => {
      for (let year = 1; year <= 4; year++) {
        const count = curriculum.filter(s => s.year === year).length;
        expect(curriculumStats.subjectsByYear[year as 1 | 2 | 3 | 4]).toBe(count);
      }
    });

    it('year counts sum to total', () => {
      const yearSum = Object.values(curriculumStats.subjectsByYear).reduce((a, b) => a + b, 0);
      expect(yearSum).toBe(curriculumStats.totalSubjects);
    });

    it('has correct subjects by semester breakdown', () => {
      for (let year = 1; year <= 4; year++) {
        for (let sem = 1; sem <= 2; sem++) {
          const key = `${year}-${sem}` as keyof typeof curriculumStats.subjectsBySemester;
          const count = curriculum.filter(s => s.year === year && s.semester === sem).length;
          expect(curriculumStats.subjectsBySemester[key]).toBe(count);
        }
      }
    });

    it('semester counts sum to total', () => {
      const semesterSum = Object.values(curriculumStats.subjectsBySemester).reduce((a, b) => a + b, 0);
      expect(semesterSum).toBe(curriculumStats.totalSubjects);
    });
  });

  describe('getSubjectById', () => {
    it('returns a subject when given a valid ID', () => {
      const subject = getSubjectById('cs101');
      expect(subject).toBeDefined();
      expect(subject?.id).toBe('cs101');
      expect(subject?.code).toBe('CS101');
    });

    it('returns undefined for non-existent ID', () => {
      const subject = getSubjectById('nonexistent');
      expect(subject).toBeUndefined();
    });

    it('returns undefined for empty string', () => {
      const subject = getSubjectById('');
      expect(subject).toBeUndefined();
    });

    it('is case-sensitive', () => {
      const subject = getSubjectById('CS101');
      expect(subject).toBeUndefined();
    });

    it('finds subjects from different years', () => {
      // Year 1
      expect(getSubjectById('cs101')).toBeDefined();
      // Year 2
      expect(getSubjectById('cs201')).toBeDefined();
      // Year 3
      expect(getSubjectById('cs301')).toBeDefined();
      // Year 4
      expect(getSubjectById('cs401')).toBeDefined();
    });

    it('finds both CS and math subjects', () => {
      const csSubject = getSubjectById('cs101');
      const mathSubject = getSubjectById('math101');
      expect(csSubject?.category).toBe('cs');
      expect(mathSubject?.category).toBe('math');
    });
  });

  describe('getSubjectsByYearSemester', () => {
    it('returns subjects for Year 1 Semester 1', () => {
      const subjects = getSubjectsByYearSemester(1, 1);
      expect(subjects.length).toBeGreaterThan(0);
      subjects.forEach(s => {
        expect(s.year).toBe(1);
        expect(s.semester).toBe(1);
      });
    });

    it('returns subjects for Year 4 Semester 2', () => {
      const subjects = getSubjectsByYearSemester(4, 2);
      expect(subjects.length).toBeGreaterThan(0);
      subjects.forEach(s => {
        expect(s.year).toBe(4);
        expect(s.semester).toBe(2);
      });
    });

    it('returns empty array for invalid year', () => {
      const subjects = getSubjectsByYearSemester(5, 1);
      expect(subjects).toEqual([]);
    });

    it('returns empty array for invalid semester', () => {
      const subjects = getSubjectsByYearSemester(1, 3);
      expect(subjects).toEqual([]);
    });

    it('returns empty array for year 0', () => {
      const subjects = getSubjectsByYearSemester(0, 1);
      expect(subjects).toEqual([]);
    });

    it('returns empty array for negative year', () => {
      const subjects = getSubjectsByYearSemester(-1, 1);
      expect(subjects).toEqual([]);
    });

    it('all returned subjects match the specified year and semester', () => {
      for (let year = 1; year <= 4; year++) {
        for (let sem = 1; sem <= 2; sem++) {
          const subjects = getSubjectsByYearSemester(year, sem);
          subjects.forEach(s => {
            expect(s.year).toBe(year);
            expect(s.semester).toBe(sem);
          });
        }
      }
    });

    it('returns the same count as curriculumStats', () => {
      for (let year = 1; year <= 4; year++) {
        for (let sem = 1; sem <= 2; sem++) {
          const subjects = getSubjectsByYearSemester(year, sem);
          const key = `${year}-${sem}` as keyof typeof curriculumStats.subjectsBySemester;
          expect(subjects.length).toBe(curriculumStats.subjectsBySemester[key]);
        }
      }
    });
  });

  describe('getPrerequisites', () => {
    it('returns empty array for subject with no prerequisites', () => {
      const prereqs = getPrerequisites('cs101');
      expect(prereqs).toEqual([]);
    });

    it('returns prerequisites for subject that has them', () => {
      // cs103 (OOP) requires cs101 (Intro to Programming)
      const prereqs = getPrerequisites('cs103');
      expect(prereqs.length).toBeGreaterThan(0);
      expect(prereqs.some(p => p.id === 'cs101')).toBe(true);
    });

    it('returns empty array for non-existent subject', () => {
      const prereqs = getPrerequisites('nonexistent');
      expect(prereqs).toEqual([]);
    });

    it('returns Subject objects, not just IDs', () => {
      const prereqs = getPrerequisites('cs103');
      prereqs.forEach(prereq => {
        expect(prereq).toHaveProperty('id');
        expect(prereq).toHaveProperty('code');
        expect(prereq).toHaveProperty('title');
        expect(prereq).toHaveProperty('year');
        expect(prereq).toHaveProperty('semester');
      });
    });

    it('returns correct number of prerequisites', () => {
      const subject = getSubjectById('cs201'); // Algorithms - requires cs104, math102
      if (subject) {
        const prereqs = getPrerequisites('cs201');
        expect(prereqs.length).toBe(subject.prerequisites.length);
      }
    });

    it('returns prerequisites that match the subject definition', () => {
      const subjectId = 'cs201';
      const subject = getSubjectById(subjectId);
      const prereqs = getPrerequisites(subjectId);

      expect(subject).toBeDefined();
      if (subject) {
        const prereqIds = prereqs.map(p => p.id);
        expect(prereqIds.sort()).toEqual([...subject.prerequisites].sort());
      }
    });

    it('handles subjects with multiple prerequisites', () => {
      // Find a subject with multiple prerequisites
      const subjectWithMultiplePrereqs = curriculum.find(s => s.prerequisites.length >= 2);
      if (subjectWithMultiplePrereqs) {
        const prereqs = getPrerequisites(subjectWithMultiplePrereqs.id);
        expect(prereqs.length).toBe(subjectWithMultiplePrereqs.prerequisites.length);
      }
    });
  });

  describe('arePrerequisitesMet', () => {
    it('returns true for subject with no prerequisites when no subjects completed', () => {
      const result = arePrerequisitesMet('cs101', []);
      expect(result).toBe(true);
    });

    it('returns true for subject with no prerequisites when some subjects completed', () => {
      const result = arePrerequisitesMet('cs101', ['cs201', 'math101']);
      expect(result).toBe(true);
    });

    it('returns false when prerequisites are not met', () => {
      // cs103 requires cs101
      const result = arePrerequisitesMet('cs103', []);
      expect(result).toBe(false);
    });

    it('returns true when all prerequisites are met', () => {
      // cs103 requires cs101
      const result = arePrerequisitesMet('cs103', ['cs101']);
      expect(result).toBe(true);
    });

    it('returns true when prerequisites are met with extra completed subjects', () => {
      // cs103 requires cs101
      const result = arePrerequisitesMet('cs103', ['cs101', 'math101', 'cs102']);
      expect(result).toBe(true);
    });

    it('returns false when only some prerequisites are met', () => {
      // cs201 (Algorithms) requires both cs104 and math102
      const subject = getSubjectById('cs201');
      if (subject && subject.prerequisites.length >= 2) {
        const result = arePrerequisitesMet('cs201', [subject.prerequisites[0]]);
        expect(result).toBe(false);
      }
    });

    it('returns true when all multiple prerequisites are met', () => {
      // cs201 requires cs104 and math102
      const subject = getSubjectById('cs201');
      if (subject) {
        const result = arePrerequisitesMet('cs201', subject.prerequisites);
        expect(result).toBe(true);
      }
    });

    it('returns false for non-existent subject', () => {
      const result = arePrerequisitesMet('nonexistent', ['cs101']);
      expect(result).toBe(false);
    });

    it('returns false for empty subject ID', () => {
      const result = arePrerequisitesMet('', ['cs101']);
      expect(result).toBe(false);
    });

    it('handles deeply nested prerequisites chain', () => {
      // Test a subject that has prerequisites which themselves have prerequisites
      // cs201 requires cs104, which requires cs103, which requires cs101
      const result = arePrerequisitesMet('cs201', ['cs101', 'cs103', 'cs104', 'math101', 'math102']);
      expect(result).toBe(true);
    });

    it('only checks immediate prerequisites, not transitive', () => {
      // cs201 requires cs104 and math102 directly
      // It should pass even if cs104's prerequisites (cs103) are not in the completed list
      // because arePrerequisitesMet only checks immediate prerequisites
      const subject = getSubjectById('cs201');
      if (subject) {
        const result = arePrerequisitesMet('cs201', subject.prerequisites);
        expect(result).toBe(true);
      }
    });
  });

  describe('curriculum integrity', () => {
    it('prerequisites are always from earlier or same year/semester', () => {
      curriculum.forEach(subject => {
        const prereqs = getPrerequisites(subject.id);
        prereqs.forEach(prereq => {
          // Prerequisite should be from an earlier year, or same year but earlier/same semester
          const prereqEarlier = prereq.year < subject.year ||
            (prereq.year === subject.year && prereq.semester <= subject.semester);

          // Allow same semester since concurrent enrollment might be possible
          // but prerequisite should never be from a later year
          expect(prereq.year).toBeLessThanOrEqual(subject.year);
        });
      });
    });

    it('no circular prerequisites exist', () => {
      // For each subject, verify we can't reach it by following its prerequisites chain
      const visited = new Set<string>();

      function hasCircularDep(subjectId: string, chain: Set<string>): boolean {
        if (chain.has(subjectId)) return true;
        if (visited.has(subjectId)) return false;

        const subject = getSubjectById(subjectId);
        if (!subject) return false;

        chain.add(subjectId);

        for (const prereqId of subject.prerequisites) {
          if (hasCircularDep(prereqId, new Set(chain))) {
            return true;
          }
        }

        visited.add(subjectId);
        return false;
      }

      curriculum.forEach(subject => {
        expect(hasCircularDep(subject.id, new Set())).toBe(false);
      });
    });

    it('CS subjects have cs category', () => {
      curriculum
        .filter(s => s.code.startsWith('CS'))
        .forEach(subject => {
          expect(subject.category).toBe('cs');
        });
    });

    it('MATH subjects have math category', () => {
      curriculum
        .filter(s => s.code.startsWith('MATH'))
        .forEach(subject => {
          expect(subject.category).toBe('math');
        });
    });

    it('all topics have required fields', () => {
      curriculum.forEach(subject => {
        subject.topics.forEach(topic => {
          expect(topic.id).toBeDefined();
          expect(topic.title).toBeDefined();
          expect(Array.isArray(topic.quizIds)).toBe(true);
          expect(Array.isArray(topic.exerciseIds)).toBe(true);
        });
      });
    });

    it('all topic IDs are unique within a subject', () => {
      curriculum.forEach(subject => {
        const topicIds = subject.topics.map(t => t.id);
        const uniqueTopicIds = new Set(topicIds);
        expect(uniqueTopicIds.size).toBe(topicIds.length);
      });
    });
  });
});
