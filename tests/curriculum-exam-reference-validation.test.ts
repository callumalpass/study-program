/**
 * Curriculum Exam Reference Validation Tests
 *
 * These tests ensure that curriculum entries properly reference their exams
 * and that all exam files have corresponding examIds in the curriculum.
 */

import { describe, it, expect } from 'vitest';
import { curriculum } from '../src/data/curriculum';

// Import all exam data from subjects
import cs101Exams from '../src/subjects/cs101/exams.json';
import cs102Exams from '../src/subjects/cs102/exams.json';
import cs103Exams from '../src/subjects/cs103/exams.json';
import cs104Exams from '../src/subjects/cs104/exams.json';
import cs105Exams from '../src/subjects/cs105/exams.json';
import math101Exams from '../src/subjects/math101/exams.json';
import math102Exams from '../src/subjects/math102/exams.json';
import cs201Exams from '../src/subjects/cs201/exams.json';
import cs202Exams from '../src/subjects/cs202/exams.json';
import cs203Exams from '../src/subjects/cs203/exams.json';
import cs204Exams from '../src/subjects/cs204/exams.json';
import math201Exams from '../src/subjects/math201/exams.json';
import math202Exams from '../src/subjects/math202/exams.json';
import math203Exams from '../src/subjects/math203/exams.json';
import math204Exams from '../src/subjects/math204/exams.json';
import cs301Exams from '../src/subjects/cs301/exams.json';
import cs302Exams from '../src/subjects/cs302/exams.json';
import cs303Exams from '../src/subjects/cs303/exams.json';
import cs304Exams from '../src/subjects/cs304/exams.json';
import cs402Exams from '../src/subjects/cs402/exams.json';

// Map subject IDs to their exam data
const subjectExams: Record<string, { id: string }[]> = {
  cs101: cs101Exams,
  cs102: cs102Exams,
  cs103: cs103Exams,
  cs104: cs104Exams,
  cs105: cs105Exams,
  math101: math101Exams,
  math102: math102Exams,
  cs201: cs201Exams,
  cs202: cs202Exams,
  cs203: cs203Exams,
  cs204: cs204Exams,
  math201: math201Exams,
  math202: math202Exams,
  math203: math203Exams,
  math204: math204Exams,
  cs301: cs301Exams,
  cs302: cs302Exams,
  cs303: cs303Exams,
  cs304: cs304Exams,
  cs402: cs402Exams,
};

describe('Curriculum Exam Reference Validation', () => {
  describe('examIds property', () => {
    it('subjects with exam files should have examIds defined in curriculum', () => {
      const missingExamIds: string[] = [];

      for (const [subjectId, exams] of Object.entries(subjectExams)) {
        if (exams.length > 0) {
          const subject = curriculum.find(s => s.id === subjectId);
          if (subject && (!subject.examIds || subject.examIds.length === 0)) {
            missingExamIds.push(subjectId);
          }
        }
      }

      expect(missingExamIds).toEqual([]);
    });

    it('examIds in curriculum should reference existing exams', () => {
      const invalidReferences: { subjectId: string; examId: string }[] = [];

      for (const [subjectId, exams] of Object.entries(subjectExams)) {
        const subject = curriculum.find(s => s.id === subjectId);
        if (subject?.examIds) {
          const examIdSet = new Set(exams.map(e => e.id));
          for (const examId of subject.examIds) {
            if (!examIdSet.has(examId)) {
              invalidReferences.push({ subjectId, examId });
            }
          }
        }
      }

      expect(invalidReferences).toEqual([]);
    });

    it('all exams in exam files should be referenced in curriculum examIds', () => {
      const unreferencedExams: { subjectId: string; examId: string }[] = [];

      for (const [subjectId, exams] of Object.entries(subjectExams)) {
        const subject = curriculum.find(s => s.id === subjectId);
        const examIdsSet = new Set(subject?.examIds || []);

        for (const exam of exams) {
          if (!examIdsSet.has(exam.id)) {
            unreferencedExams.push({ subjectId, examId: exam.id });
          }
        }
      }

      expect(unreferencedExams).toEqual([]);
    });
  });

  describe('math102 specific validation', () => {
    it('math102 should have examIds defined', () => {
      const math102 = curriculum.find(s => s.id === 'math102');
      expect(math102).toBeDefined();
      expect(math102?.examIds).toBeDefined();
      expect(math102?.examIds?.length).toBeGreaterThan(0);
    });

    it('math102 examIds should match exams.json', () => {
      const math102 = curriculum.find(s => s.id === 'math102');
      const examIds = math102Exams.map(e => e.id);

      expect(math102?.examIds).toBeDefined();
      expect(math102?.examIds?.sort()).toEqual(examIds.sort());
    });

    it('math102 should have both midterm and final exams', () => {
      const math102 = curriculum.find(s => s.id === 'math102');

      expect(math102?.examIds).toContain('math102-exam-midterm');
      expect(math102?.examIds).toContain('math102-exam-final');
    });
  });

  describe('exam ID format consistency', () => {
    it('all examIds should follow naming convention', () => {
      const invalidFormat: string[] = [];

      for (const subject of curriculum) {
        if (subject.examIds) {
          for (const examId of subject.examIds) {
            // Exam IDs should start with subject ID prefix
            if (!examId.startsWith(subject.id)) {
              invalidFormat.push(`${subject.id}: ${examId}`);
            }
          }
        }
      }

      expect(invalidFormat).toEqual([]);
    });

    it('examIds should typically include midterm and final', () => {
      const subjectsWithExams = curriculum.filter(s => s.examIds && s.examIds.length > 0);

      // Most subjects with exams should have 2 exams (midterm and final)
      const subjectsWithTwoExams = subjectsWithExams.filter(s => s.examIds!.length === 2);

      // At least 80% of subjects with exams should have 2 exams
      expect(subjectsWithTwoExams.length / subjectsWithExams.length).toBeGreaterThanOrEqual(0.8);
    });
  });

  describe('exam data integrity', () => {
    it('all exam files should have valid exam objects', () => {
      for (const [subjectId, exams] of Object.entries(subjectExams)) {
        for (const exam of exams) {
          expect(exam.id).toBeDefined();
          expect(typeof exam.id).toBe('string');
          expect(exam.id.length).toBeGreaterThan(0);
        }
      }
    });
  });
});
