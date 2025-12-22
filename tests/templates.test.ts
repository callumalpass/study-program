import { describe, it, expect } from 'vitest';
import {
  courseTemplates,
  getTemplateById,
  getTemplateSubjectIds,
} from '../src/data/templates';
import { curriculum } from '../src/data/curriculum';

describe('templates data', () => {
  describe('courseTemplates array', () => {
    it('contains templates', () => {
      expect(courseTemplates.length).toBeGreaterThan(0);
    });

    it('has unique template IDs', () => {
      const ids = courseTemplates.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('has unique template names', () => {
      const names = courseTemplates.map(t => t.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it('all templates have required fields', () => {
      courseTemplates.forEach(template => {
        expect(template.id).toBeDefined();
        expect(typeof template.id).toBe('string');
        expect(template.id.length).toBeGreaterThan(0);

        expect(template.name).toBeDefined();
        expect(typeof template.name).toBe('string');
        expect(template.name.length).toBeGreaterThan(0);

        expect(template.description).toBeDefined();
        expect(typeof template.description).toBe('string');
        expect(template.description.length).toBeGreaterThan(0);

        expect(Array.isArray(template.subjectIds)).toBe(true);
        expect(template.subjectIds.length).toBeGreaterThan(0);

        expect(typeof template.estimatedHours).toBe('number');
        expect(template.estimatedHours).toBeGreaterThan(0);
      });
    });

    it('all subject IDs in templates reference existing curriculum subjects', () => {
      const validSubjectIds = new Set(curriculum.map(s => s.id));

      courseTemplates.forEach(template => {
        template.subjectIds.forEach(subjectId => {
          expect(validSubjectIds.has(subjectId)).toBe(true);
        });
      });
    });

    it('each template has unique subject IDs (no duplicates within a template)', () => {
      courseTemplates.forEach(template => {
        const uniqueSubjectIds = new Set(template.subjectIds);
        expect(uniqueSubjectIds.size).toBe(template.subjectIds.length);
      });
    });

    it('estimatedHours matches sum of subject hours', () => {
      courseTemplates.forEach(template => {
        const calculatedHours = curriculum
          .filter(s => template.subjectIds.includes(s.id))
          .reduce((sum, s) => sum + s.estimatedHours, 0);

        expect(template.estimatedHours).toBe(calculatedHours);
      });
    });
  });

  describe('specific templates', () => {
    it('full-cs-degree template contains all curriculum subjects', () => {
      const fullDegree = getTemplateById('full-cs-degree');
      expect(fullDegree).toBeDefined();
      expect(fullDegree?.subjectIds.length).toBe(curriculum.length);

      // Check that all curriculum subject IDs are included
      const curriculumIds = new Set(curriculum.map(s => s.id));
      const templateIds = new Set(fullDegree?.subjectIds);
      expect(templateIds).toEqual(curriculumIds);
    });

    it('math-foundation template contains only math subjects', () => {
      const mathFoundation = getTemplateById('math-foundation');
      expect(mathFoundation).toBeDefined();

      mathFoundation?.subjectIds.forEach(subjectId => {
        const subject = curriculum.find(s => s.id === subjectId);
        expect(subject?.category).toBe('math');
      });
    });

    it('cs-fundamentals contains expected core subjects', () => {
      const csFundamentals = getTemplateById('cs-fundamentals');
      expect(csFundamentals).toBeDefined();

      // Should include intro programming
      expect(csFundamentals?.subjectIds).toContain('cs101');
      // Should include OOP
      expect(csFundamentals?.subjectIds).toContain('cs103');
      // Should include data structures
      expect(csFundamentals?.subjectIds).toContain('cs104');
    });

    it('ml-ai-track contains ML and AI subjects', () => {
      const mlAiTrack = getTemplateById('ml-ai-track');
      expect(mlAiTrack).toBeDefined();

      // Should include machine learning
      expect(mlAiTrack?.subjectIds).toContain('cs402');
      // Should include AI
      expect(mlAiTrack?.subjectIds).toContain('cs406');
    });

    it('systems-track contains OS and networks', () => {
      const systemsTrack = getTemplateById('systems-track');
      expect(systemsTrack).toBeDefined();

      // Should include operating systems
      expect(systemsTrack?.subjectIds).toContain('cs301');
      // Should include computer networks
      expect(systemsTrack?.subjectIds).toContain('cs302');
    });

    it('web-dev-track contains web and database subjects', () => {
      const webDevTrack = getTemplateById('web-dev-track');
      expect(webDevTrack).toBeDefined();

      // Should include web development
      expect(webDevTrack?.subjectIds).toContain('cs305');
      // Should include database systems
      expect(webDevTrack?.subjectIds).toContain('cs205');
    });

    it('theory-track contains theory and advanced math', () => {
      const theoryTrack = getTemplateById('theory-track');
      expect(theoryTrack).toBeDefined();

      // Should include theory of computation
      expect(theoryTrack?.subjectIds).toContain('cs203');
      // Should include advanced algorithms
      expect(theoryTrack?.subjectIds).toContain('cs403');
    });
  });

  describe('getTemplateById', () => {
    it('returns a template when given a valid ID', () => {
      const template = getTemplateById('full-cs-degree');
      expect(template).toBeDefined();
      expect(template?.id).toBe('full-cs-degree');
      expect(template?.name).toBe('Full CS Degree');
    });

    it('returns undefined for non-existent ID', () => {
      const template = getTemplateById('nonexistent');
      expect(template).toBeUndefined();
    });

    it('returns undefined for empty string', () => {
      const template = getTemplateById('');
      expect(template).toBeUndefined();
    });

    it('is case-sensitive', () => {
      const template = getTemplateById('FULL-CS-DEGREE');
      expect(template).toBeUndefined();
    });

    it('returns all expected templates', () => {
      const expectedIds = [
        'full-cs-degree',
        'cs-fundamentals',
        'math-foundation',
        'ml-ai-track',
        'systems-track',
        'theory-track',
        'web-dev-track',
      ];

      expectedIds.forEach(id => {
        const template = getTemplateById(id);
        expect(template).toBeDefined();
        expect(template?.id).toBe(id);
      });
    });

    it('returned template has correct structure', () => {
      const template = getTemplateById('cs-fundamentals');
      expect(template).toBeDefined();

      if (template) {
        expect(typeof template.id).toBe('string');
        expect(typeof template.name).toBe('string');
        expect(typeof template.description).toBe('string');
        expect(Array.isArray(template.subjectIds)).toBe(true);
        expect(typeof template.estimatedHours).toBe('number');
      }
    });
  });

  describe('getTemplateSubjectIds', () => {
    it('returns subject IDs for a valid template', () => {
      const subjectIds = getTemplateSubjectIds('full-cs-degree');
      expect(Array.isArray(subjectIds)).toBe(true);
      expect(subjectIds.length).toBeGreaterThan(0);
    });

    it('returns empty array for non-existent template', () => {
      const subjectIds = getTemplateSubjectIds('nonexistent');
      expect(subjectIds).toEqual([]);
    });

    it('returns empty array for empty string', () => {
      const subjectIds = getTemplateSubjectIds('');
      expect(subjectIds).toEqual([]);
    });

    it('returns same subject IDs as direct template access', () => {
      courseTemplates.forEach(template => {
        const subjectIds = getTemplateSubjectIds(template.id);
        expect(subjectIds).toEqual(template.subjectIds);
      });
    });

    it('returns all curriculum subjects for full-cs-degree', () => {
      const subjectIds = getTemplateSubjectIds('full-cs-degree');
      expect(subjectIds.length).toBe(curriculum.length);
    });

    it('returned subject IDs are all valid', () => {
      const validSubjectIds = new Set(curriculum.map(s => s.id));

      courseTemplates.forEach(template => {
        const subjectIds = getTemplateSubjectIds(template.id);
        subjectIds.forEach(id => {
          expect(validSubjectIds.has(id)).toBe(true);
        });
      });
    });
  });

  describe('template relationships', () => {
    it('full-cs-degree is the largest template by subject count', () => {
      const fullDegree = getTemplateById('full-cs-degree');
      expect(fullDegree).toBeDefined();

      courseTemplates.forEach(template => {
        expect(fullDegree!.subjectIds.length).toBeGreaterThanOrEqual(template.subjectIds.length);
      });
    });

    it('full-cs-degree has the highest estimated hours', () => {
      const fullDegree = getTemplateById('full-cs-degree');
      expect(fullDegree).toBeDefined();

      courseTemplates.forEach(template => {
        expect(fullDegree!.estimatedHours).toBeGreaterThanOrEqual(template.estimatedHours);
      });
    });

    it('specialized tracks are subsets of full-cs-degree', () => {
      const fullDegreeSubjects = new Set(getTemplateSubjectIds('full-cs-degree'));

      courseTemplates.forEach(template => {
        template.subjectIds.forEach(subjectId => {
          expect(fullDegreeSubjects.has(subjectId)).toBe(true);
        });
      });
    });

    it('all tracks include foundational programming (cs101)', () => {
      courseTemplates.forEach(template => {
        // Math foundation is the only template that might not include cs101
        if (template.id !== 'math-foundation') {
          expect(template.subjectIds).toContain('cs101');
        }
      });
    });
  });
});
