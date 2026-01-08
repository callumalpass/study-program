/**
 * Math302 Exam Content Validation Tests
 *
 * These tests validate the structure and uniqueness of exam questions
 * for the MATH302 Differential Equations course.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Exam } from '../src/core/types';

const MATH302_EXAMS_PATH = join(__dirname, '../src/subjects/math302/exams.json');

function loadExams(): Exam[] {
  const content = readFileSync(MATH302_EXAMS_PATH, 'utf-8');
  return JSON.parse(content) as Exam[];
}

describe('Math302 Exam Structure Validation', () => {
  const exams = loadExams();

  describe('Exam existence', () => {
    it('should have both midterm and final exams', () => {
      expect(exams).toHaveLength(2);
      expect(exams.find((e) => e.id === 'math302-midterm')).toBeDefined();
      expect(exams.find((e) => e.id === 'math302-final')).toBeDefined();
    });
  });

  describe('Question ID uniqueness across exams', () => {
    it('midterm and final should have no overlapping question IDs', () => {
      const midterm = exams.find((e) => e.id === 'math302-midterm');
      const final = exams.find((e) => e.id === 'math302-final');

      expect(midterm).toBeDefined();
      expect(final).toBeDefined();

      const midtermIds = new Set(midterm!.questions.map((q) => q.id));
      const finalIds = new Set(final!.questions.map((q) => q.id));

      const overlapping: string[] = [];
      for (const id of finalIds) {
        if (midtermIds.has(id)) {
          overlapping.push(id);
        }
      }

      expect(
        overlapping,
        `Found ${overlapping.length} overlapping question IDs between midterm and final: ${overlapping.slice(0, 5).join(', ')}${overlapping.length > 5 ? '...' : ''}`
      ).toHaveLength(0);
    });

    it('all question IDs should be unique within each exam', () => {
      for (const exam of exams) {
        const ids = exam.questions.map((q) => q.id);
        const uniqueIds = new Set(ids);

        expect(
          uniqueIds.size,
          `Exam ${exam.id} has duplicate question IDs`
        ).toBe(ids.length);
      }
    });
  });

  describe('Question ID naming convention', () => {
    it('midterm questions should use math302-mid-q* pattern', () => {
      const midterm = exams.find((e) => e.id === 'math302-midterm');
      expect(midterm).toBeDefined();

      for (const question of midterm!.questions) {
        expect(
          question.id,
          `Midterm question ID ${question.id} should start with math302-mid-q`
        ).toMatch(/^math302-mid-q\d+$/);
      }
    });

    it('final exam questions should use math302-final-* pattern', () => {
      const final = exams.find((e) => e.id === 'math302-final');
      expect(final).toBeDefined();

      for (const question of final!.questions) {
        expect(
          question.id,
          `Final question ID ${question.id} should start with math302-final-`
        ).toMatch(/^math302-final-(q\d+|review-q\d+)$/);
      }
    });
  });

  describe('Exam question counts', () => {
    it('midterm should have 26 questions', () => {
      const midterm = exams.find((e) => e.id === 'math302-midterm');
      expect(midterm).toBeDefined();
      expect(midterm!.questions).toHaveLength(26);
    });

    it('final should have 68 questions (26 review + 42 new)', () => {
      const final = exams.find((e) => e.id === 'math302-final');
      expect(final).toBeDefined();
      expect(final!.questions).toHaveLength(68);

      // Count review questions and new questions
      const reviewQuestions = final!.questions.filter((q) =>
        q.id.includes('review')
      );
      const newQuestions = final!.questions.filter(
        (q) => !q.id.includes('review')
      );

      expect(reviewQuestions).toHaveLength(26);
      expect(newQuestions).toHaveLength(42);
    });
  });
});
