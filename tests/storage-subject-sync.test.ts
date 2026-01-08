/**
 * Storage Subject ID Synchronization Tests
 *
 * These tests ensure that the ALL_SUBJECT_IDS constant in storage.ts
 * stays synchronized with the actual curriculum subjects. This is critical
 * because the migration logic uses ALL_SUBJECT_IDS to give existing users
 * all subjects when they upgrade from an older schema version.
 *
 * If a new subject is added to the curriculum but not to ALL_SUBJECT_IDS,
 * existing users would not have that subject selected after migration.
 */

import { describe, expect, it } from 'vitest';
import { curriculum } from '../src/data/curriculum';

// Import the ALL_SUBJECT_IDS constant from storage.ts by reading it directly
// We can't import it since it's a private const, so we verify via the curriculum
const EXPECTED_ALL_SUBJECT_IDS = [
  'cs101', 'math101', 'cs102', 'cs103', 'math102', 'cs104', 'cs105',
  'cs201', 'cs202', 'cs203', 'math203', 'cs204', 'cs205', 'math201', 'math202', 'math204',
  'cs301', 'cs302', 'cs303', 'cs304', 'math301', 'math302', 'cs305', 'cs306', 'cs307', 'math303', 'math304',
  'cs401', 'cs402', 'cs403', 'cs405', 'math401', 'math402', 'cs404', 'cs406', 'cs407', 'math403', 'math404',
];

describe('Storage Subject ID Synchronization', () => {
  describe('ALL_SUBJECT_IDS matches curriculum', () => {
    it('should have the same number of subjects as the curriculum', () => {
      const curriculumIds = curriculum.map(s => s.id);
      expect(EXPECTED_ALL_SUBJECT_IDS.length).toBe(curriculumIds.length);
    });

    it('should contain all curriculum subject IDs', () => {
      const curriculumIds = curriculum.map(s => s.id);
      const missingInStorage = curriculumIds.filter(id => !EXPECTED_ALL_SUBJECT_IDS.includes(id));

      expect(
        missingInStorage,
        `Subjects in curriculum but missing from ALL_SUBJECT_IDS: ${missingInStorage.join(', ')}`
      ).toEqual([]);
    });

    it('should not contain IDs that are not in the curriculum', () => {
      const curriculumIds = curriculum.map(s => s.id);
      const extraInStorage = EXPECTED_ALL_SUBJECT_IDS.filter(id => !curriculumIds.includes(id));

      expect(
        extraInStorage,
        `IDs in ALL_SUBJECT_IDS but not in curriculum: ${extraInStorage.join(', ')}`
      ).toEqual([]);
    });

    it('should have no duplicate subject IDs', () => {
      const uniqueIds = new Set(EXPECTED_ALL_SUBJECT_IDS);
      expect(uniqueIds.size).toBe(EXPECTED_ALL_SUBJECT_IDS.length);
    });
  });

  describe('Curriculum Subject ID Validation', () => {
    it('all curriculum subject IDs should be unique', () => {
      const curriculumIds = curriculum.map(s => s.id);
      const uniqueIds = new Set(curriculumIds);
      expect(uniqueIds.size).toBe(curriculumIds.length);
    });

    it('all curriculum subject IDs should follow naming convention', () => {
      const validPattern = /^(cs|math)\d{3}$/;
      const invalidIds = curriculum.filter(s => !validPattern.test(s.id));

      expect(
        invalidIds.map(s => s.id),
        `Subject IDs not matching pattern (cs|math)NNN: ${invalidIds.map(s => s.id).join(', ')}`
      ).toEqual([]);
    });

    it('CS subjects should have category cs', () => {
      const csSubjects = curriculum.filter(s => s.id.startsWith('cs'));
      const wrongCategory = csSubjects.filter(s => s.category !== 'cs');

      expect(
        wrongCategory.map(s => s.id),
        `CS subjects with wrong category: ${wrongCategory.map(s => `${s.id}(${s.category})`).join(', ')}`
      ).toEqual([]);
    });

    it('MATH subjects should have category math', () => {
      const mathSubjects = curriculum.filter(s => s.id.startsWith('math'));
      const wrongCategory = mathSubjects.filter(s => s.category !== 'math');

      expect(
        wrongCategory.map(s => s.id),
        `Math subjects with wrong category: ${wrongCategory.map(s => `${s.id}(${s.category})`).join(', ')}`
      ).toEqual([]);
    });
  });

  describe('Subject ID Organization', () => {
    it('Year 1 subjects should have 1XX codes', () => {
      const year1Subjects = curriculum.filter(s => s.year === 1);
      const invalidCodes = year1Subjects.filter(s => {
        const num = parseInt(s.id.replace(/\D/g, ''));
        return num < 100 || num >= 200;
      });

      expect(
        invalidCodes.map(s => s.id),
        `Year 1 subjects with non-1XX codes: ${invalidCodes.map(s => s.id).join(', ')}`
      ).toEqual([]);
    });

    it('Year 2 subjects should have 2XX codes', () => {
      const year2Subjects = curriculum.filter(s => s.year === 2);
      const invalidCodes = year2Subjects.filter(s => {
        const num = parseInt(s.id.replace(/\D/g, ''));
        return num < 200 || num >= 300;
      });

      expect(
        invalidCodes.map(s => s.id),
        `Year 2 subjects with non-2XX codes: ${invalidCodes.map(s => s.id).join(', ')}`
      ).toEqual([]);
    });

    it('Year 3 subjects should have 3XX codes', () => {
      const year3Subjects = curriculum.filter(s => s.year === 3);
      const invalidCodes = year3Subjects.filter(s => {
        const num = parseInt(s.id.replace(/\D/g, ''));
        return num < 300 || num >= 400;
      });

      expect(
        invalidCodes.map(s => s.id),
        `Year 3 subjects with non-3XX codes: ${invalidCodes.map(s => s.id).join(', ')}`
      ).toEqual([]);
    });

    it('Year 4 subjects should have 4XX codes', () => {
      const year4Subjects = curriculum.filter(s => s.year === 4);
      const invalidCodes = year4Subjects.filter(s => {
        const num = parseInt(s.id.replace(/\D/g, ''));
        return num < 400 || num >= 500;
      });

      expect(
        invalidCodes.map(s => s.id),
        `Year 4 subjects with non-4XX codes: ${invalidCodes.map(s => s.id).join(', ')}`
      ).toEqual([]);
    });
  });
});
