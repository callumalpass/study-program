/**
 * Curriculum Exam ID Consistency Tests
 *
 * These tests verify that ALL exam references in curriculum.ts
 * match the actual exam IDs in the corresponding exams.json files.
 * This catches the bug where curriculum used inconsistent ID formats
 * (e.g., 'cs205-midterm' vs 'cs205-exam-midterm').
 */

import { describe, it, expect } from 'vitest';
import { curriculum } from '../src/data/curriculum';

// Dynamically load all exam modules
const examModules = import.meta.glob('../src/subjects/**/exams.json', { eager: true });

interface Exam {
  id: string;
  subjectId: string;
  title?: string;
  questions: unknown[];
}

// Build map of subjectId -> exam IDs from JSON files
const actualExamIdsBySubject = new Map<string, Set<string>>();

for (const [path, module] of Object.entries(examModules)) {
  // Extract subject ID from path like "../src/subjects/cs101/exams.json"
  const match = path.match(/\/subjects\/([^/]+)\/exams\.json$/);
  if (!match) continue;

  const subjectId = match[1];
  const exams = (module as { default?: Exam[] }).default || [];

  actualExamIdsBySubject.set(
    subjectId,
    new Set(exams.map(e => e.id))
  );
}

describe('Curriculum Exam ID Consistency', () => {
  describe('all curriculum examIds must match actual exam file IDs', () => {
    // Test each subject with examIds individually for clear error messages
    const subjectsWithExams = curriculum.filter(s => s.examIds && s.examIds.length > 0);

    for (const subject of subjectsWithExams) {
      it(`${subject.id} examIds should all exist in exams.json`, () => {
        const actualIds = actualExamIdsBySubject.get(subject.id);

        if (!actualIds) {
          // Subject has examIds but no exams.json file - this is also an error
          throw new Error(`${subject.id} has examIds but no exams.json file found`);
        }

        const missingIds = subject.examIds!.filter(id => !actualIds.has(id));

        expect(
          missingIds,
          `${subject.id} references exam IDs that don't exist in exams.json: ${missingIds.join(', ')}. ` +
          `Available exam IDs: ${[...actualIds].join(', ')}`
        ).toEqual([]);
      });
    }
  });

  describe('all exams.json entries should be referenced in curriculum', () => {
    for (const [subjectId, examIds] of actualExamIdsBySubject) {
      it(`all ${subjectId} exams.json entries should be in curriculum.examIds`, () => {
        const subject = curriculum.find(s => s.id === subjectId);

        if (!subject) {
          // Subject exists in exams but not curriculum - may be intentional for partial subjects
          return;
        }

        const curriculumExamIds = new Set(subject.examIds || []);
        const unreferencedIds = [...examIds].filter(id => !curriculumExamIds.has(id));

        expect(
          unreferencedIds,
          `${subjectId} exams.json has exams not referenced in curriculum: ${unreferencedIds.join(', ')}`
        ).toEqual([]);
      });
    }
  });

  describe('exam ID naming convention consistency', () => {
    it('each subject should use consistent exam ID format', () => {
      const inconsistentSubjects: string[] = [];

      for (const [subjectId, examIds] of actualExamIdsBySubject) {
        const ids = [...examIds];
        if (ids.length < 2) continue;

        // Check if all use "-exam-" or all don't
        const withExamInfix = ids.filter(id => id.includes('-exam-'));
        const withoutExamInfix = ids.filter(id => !id.includes('-exam-'));

        // Inconsistent if some have -exam- and some don't
        if (withExamInfix.length > 0 && withoutExamInfix.length > 0) {
          inconsistentSubjects.push(
            `${subjectId}: mixed formats (${withExamInfix.join(', ')} vs ${withoutExamInfix.join(', ')})`
          );
        }
      }

      expect(
        inconsistentSubjects,
        `Subjects with inconsistent exam ID formats: ${inconsistentSubjects.join('; ')}`
      ).toEqual([]);
    });

    it('exam IDs should start with their subject ID', () => {
      const violations: string[] = [];

      for (const [subjectId, examIds] of actualExamIdsBySubject) {
        for (const examId of examIds) {
          if (!examId.startsWith(subjectId)) {
            violations.push(`${subjectId}: exam ID "${examId}" doesn't start with subject ID`);
          }
        }
      }

      expect(violations).toEqual([]);
    });
  });

  describe('complete exam coverage statistics', () => {
    it('reports exam reference completeness', () => {
      let totalCurriculumRefs = 0;
      let validRefs = 0;

      for (const subject of curriculum) {
        if (!subject.examIds) continue;

        const actualIds = actualExamIdsBySubject.get(subject.id);
        for (const examId of subject.examIds) {
          totalCurriculumRefs++;
          if (actualIds?.has(examId)) {
            validRefs++;
          }
        }
      }

      const coverage = totalCurriculumRefs > 0 ? (validRefs / totalCurriculumRefs) * 100 : 100;
      console.log(`Exam reference coverage: ${validRefs}/${totalCurriculumRefs} (${coverage.toFixed(1)}%)`);

      // All references should be valid
      expect(coverage).toBe(100);
    });

    it('reports subjects with exams', () => {
      const subjectsWithExams = curriculum.filter(s => s.examIds && s.examIds.length > 0);
      const subjectsWithExamFiles = actualExamIdsBySubject.size;

      console.log(`Subjects with examIds in curriculum: ${subjectsWithExams.length}`);
      console.log(`Subjects with exams.json files: ${subjectsWithExamFiles}`);

      expect(subjectsWithExams.length).toBeGreaterThan(0);
    });
  });

  describe('specific bug regression tests', () => {
    // These test the specific mismatches that were fixed

    it('cs205 should use cs205-exam-midterm format (not cs205-midterm)', () => {
      const cs205 = curriculum.find(s => s.id === 'cs205');
      expect(cs205?.examIds).toContain('cs205-exam-midterm');
      expect(cs205?.examIds).toContain('cs205-exam-final');
      expect(cs205?.examIds).not.toContain('cs205-midterm');
      expect(cs205?.examIds).not.toContain('cs205-final');
    });

    it('cs305 should use cs305-midterm format (not cs305-exam-midterm)', () => {
      const cs305 = curriculum.find(s => s.id === 'cs305');
      expect(cs305?.examIds).toContain('cs305-midterm');
      expect(cs305?.examIds).toContain('cs305-final');
      expect(cs305?.examIds).not.toContain('cs305-exam-midterm');
      expect(cs305?.examIds).not.toContain('cs305-exam-final');
    });

    it('cs306 should use cs306-midterm format', () => {
      const cs306 = curriculum.find(s => s.id === 'cs306');
      expect(cs306?.examIds).toContain('cs306-midterm');
      expect(cs306?.examIds).toContain('cs306-final');
    });

    it('cs307 should use cs307-midterm format', () => {
      const cs307 = curriculum.find(s => s.id === 'cs307');
      expect(cs307?.examIds).toContain('cs307-midterm');
      expect(cs307?.examIds).toContain('cs307-final');
    });

    it('math301 should use math301-midterm format', () => {
      const math301 = curriculum.find(s => s.id === 'math301');
      expect(math301?.examIds).toContain('math301-midterm');
      expect(math301?.examIds).toContain('math301-final');
    });

    it('math302 should use math302-midterm format', () => {
      const math302 = curriculum.find(s => s.id === 'math302');
      expect(math302?.examIds).toContain('math302-midterm');
      expect(math302?.examIds).toContain('math302-final');
    });

    it('math303 should use math303-midterm format', () => {
      const math303 = curriculum.find(s => s.id === 'math303');
      expect(math303?.examIds).toContain('math303-midterm');
      expect(math303?.examIds).toContain('math303-final');
    });

    it('math304 should use math304-midterm format', () => {
      const math304 = curriculum.find(s => s.id === 'math304');
      expect(math304?.examIds).toContain('math304-midterm');
      expect(math304?.examIds).toContain('math304-final');
    });

    it('cs401 should use cs401-midterm format', () => {
      const cs401 = curriculum.find(s => s.id === 'cs401');
      expect(cs401?.examIds).toContain('cs401-midterm');
      expect(cs401?.examIds).toContain('cs401-final');
    });

    it('cs403 should use cs403-midterm format', () => {
      const cs403 = curriculum.find(s => s.id === 'cs403');
      expect(cs403?.examIds).toContain('cs403-midterm');
      expect(cs403?.examIds).toContain('cs403-final');
    });

    it('cs404 should use cs404-midterm format', () => {
      const cs404 = curriculum.find(s => s.id === 'cs404');
      expect(cs404?.examIds).toContain('cs404-midterm');
      expect(cs404?.examIds).toContain('cs404-final');
    });

    it('cs406 should use cs406-midterm format', () => {
      const cs406 = curriculum.find(s => s.id === 'cs406');
      expect(cs406?.examIds).toContain('cs406-midterm');
      expect(cs406?.examIds).toContain('cs406-final');
    });

    it('math401 should use math401-midterm format', () => {
      const math401 = curriculum.find(s => s.id === 'math401');
      expect(math401?.examIds).toContain('math401-midterm');
      expect(math401?.examIds).toContain('math401-final');
    });

    it('math402 should use math402-midterm format', () => {
      const math402 = curriculum.find(s => s.id === 'math402');
      expect(math402?.examIds).toContain('math402-midterm');
      expect(math402?.examIds).toContain('math402-final');
    });

    it('math404 should use math404-midterm format', () => {
      const math404 = curriculum.find(s => s.id === 'math404');
      expect(math404?.examIds).toContain('math404-midterm');
      expect(math404?.examIds).toContain('math404-final');
    });
  });
});
