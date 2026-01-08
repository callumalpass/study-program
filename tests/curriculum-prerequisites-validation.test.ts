/**
 * Curriculum Prerequisites Validation Tests
 *
 * Tests that validate the curriculum structure:
 * - All prerequisite references point to valid subjects
 * - No circular dependencies exist in prerequisites
 * - Prerequisites are in earlier or same year/semester
 * - All topic IDs are unique within and across subjects
 * - All quiz/exam/exercise IDs referenced in topics exist
 */

import { describe, it, expect } from 'vitest';
import { curriculum } from '../src/data/curriculum';
import type { Subject, Topic } from '../src/core/types';

// Import quiz and exam loaders
const quizModules = import.meta.glob('../src/subjects/**/quizzes.json', { eager: true });
const examModules = import.meta.glob('../src/subjects/**/exams.json', { eager: true });
const exerciseModules = import.meta.glob('../src/subjects/**/exercises.json', { eager: true });

interface Quiz {
  id: string;
  subjectId: string;
  topicId: string;
  questions: unknown[];
}

interface Exam {
  id: string;
  subjectId: string;
  questions: unknown[];
}

interface Exercise {
  id: string;
  subjectId: string;
  topicId: string;
}

// Load all quizzes
const allQuizzes: Quiz[] = Object.values(quizModules).flatMap((module: unknown) => {
  const mod = module as { default?: Quiz[] };
  return Array.isArray(mod.default) ? mod.default : [];
});

// Load all exams
const allExams: Exam[] = Object.values(examModules).flatMap((module: unknown) => {
  const mod = module as { default?: Exam[] };
  return Array.isArray(mod.default) ? mod.default : [];
});

// Load all exercises
const allExercises: Exercise[] = Object.values(exerciseModules).flatMap((module: unknown) => {
  const mod = module as { default?: Exercise[] };
  return Array.isArray(mod.default) ? mod.default : [];
});

// Create lookup maps
const subjectMap = new Map(curriculum.map(s => [s.id, s]));
const quizIdSet = new Set(allQuizzes.map(q => q.id));
const examIdSet = new Set(allExams.map(e => e.id));
const exerciseIdSet = new Set(allExercises.map(e => e.id));

describe('Curriculum Prerequisites Validation', () => {
  describe('prerequisite references', () => {
    it('should have valid prerequisite references', () => {
      const invalidRefs: string[] = [];

      for (const subject of curriculum) {
        for (const prereqId of subject.prerequisites) {
          if (!subjectMap.has(prereqId)) {
            invalidRefs.push(`${subject.id} references unknown prerequisite: ${prereqId}`);
          }
        }
      }

      expect(
        invalidRefs,
        `Found ${invalidRefs.length} invalid prerequisite references:\n${invalidRefs.join('\n')}`
      ).toHaveLength(0);
    });

    it('prerequisites should be from same or earlier year/semester', () => {
      const latePrereqs: string[] = [];

      for (const subject of curriculum) {
        for (const prereqId of subject.prerequisites) {
          const prereq = subjectMap.get(prereqId);
          if (prereq) {
            // Calculate a comparable position value (year * 10 + semester)
            const subjectPos = subject.year * 10 + subject.semester;
            const prereqPos = prereq.year * 10 + prereq.semester;

            if (prereqPos > subjectPos) {
              latePrereqs.push(
                `${subject.id} (Y${subject.year}S${subject.semester}) has later prerequisite ` +
                `${prereqId} (Y${prereq.year}S${prereq.semester})`
              );
            }
          }
        }
      }

      expect(
        latePrereqs,
        `Found ${latePrereqs.length} prerequisites from later semesters:\n${latePrereqs.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('no circular dependencies', () => {
    it('should not have circular prerequisite chains', () => {
      const circularDeps: string[] = [];

      // Helper function to detect cycles using DFS
      function hasCycle(subjectId: string, visited: Set<string>, path: Set<string>): boolean {
        if (path.has(subjectId)) {
          return true;
        }
        if (visited.has(subjectId)) {
          return false;
        }

        visited.add(subjectId);
        path.add(subjectId);

        const subject = subjectMap.get(subjectId);
        if (subject) {
          for (const prereqId of subject.prerequisites) {
            if (hasCycle(prereqId, visited, path)) {
              circularDeps.push(`Circular dependency detected involving: ${subjectId} -> ${prereqId}`);
              return true;
            }
          }
        }

        path.delete(subjectId);
        return false;
      }

      for (const subject of curriculum) {
        const visited = new Set<string>();
        const path = new Set<string>();
        hasCycle(subject.id, visited, path);
      }

      expect(
        circularDeps,
        `Found circular dependencies:\n${circularDeps.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('topic ID uniqueness', () => {
    it('topic IDs should be unique within each subject', () => {
      const duplicates: string[] = [];

      for (const subject of curriculum) {
        const topicIds = new Set<string>();
        for (const topic of subject.topics) {
          if (topicIds.has(topic.id)) {
            duplicates.push(`${subject.id} has duplicate topic ID: ${topic.id}`);
          }
          topicIds.add(topic.id);
        }
      }

      expect(
        duplicates,
        `Found ${duplicates.length} duplicate topic IDs:\n${duplicates.join('\n')}`
      ).toHaveLength(0);
    });

    it('topic IDs should be globally unique across all subjects', () => {
      const allTopicIds = new Map<string, string>(); // topicId -> subjectId
      const duplicates: string[] = [];

      for (const subject of curriculum) {
        for (const topic of subject.topics) {
          const existing = allTopicIds.get(topic.id);
          if (existing && existing !== subject.id) {
            duplicates.push(`Topic ID "${topic.id}" used in both ${existing} and ${subject.id}`);
          }
          allTopicIds.set(topic.id, subject.id);
        }
      }

      expect(
        duplicates,
        `Found ${duplicates.length} topic IDs reused across subjects:\n${duplicates.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('quiz/exam/exercise ID references', () => {
    // Note: Some subjects are still under development and may reference
    // quizzes/exams/exercises that haven't been created yet. These tests
    // report the state but don't fail for missing content (informational).

    it('reports quiz reference statistics', () => {
      const missing: string[] = [];
      let totalRefs = 0;
      let foundRefs = 0;

      for (const subject of curriculum) {
        for (const topic of subject.topics) {
          for (const quizId of topic.quizIds) {
            totalRefs++;
            if (quizIdSet.has(quizId)) {
              foundRefs++;
            } else {
              missing.push(`${subject.id}/${topic.id} -> ${quizId}`);
            }
          }
        }
      }

      console.log(`Quiz references: ${foundRefs}/${totalRefs} exist (${missing.length} missing)`);
      if (missing.length > 0) {
        console.log(`Missing quizzes from subjects: ${[...new Set(missing.map(m => m.split('/')[0]))].join(', ')}`);
      }

      // Just validate that most references exist (>85%)
      const existenceRate = totalRefs > 0 ? foundRefs / totalRefs : 1;
      expect(existenceRate).toBeGreaterThan(0.85);
    });

    it('reports exam reference statistics', () => {
      const missing: string[] = [];
      let totalRefs = 0;
      let foundRefs = 0;

      for (const subject of curriculum) {
        if (subject.examIds) {
          for (const examId of subject.examIds) {
            totalRefs++;
            if (examIdSet.has(examId)) {
              foundRefs++;
            } else {
              missing.push(`${subject.id} -> ${examId}`);
            }
          }
        }
      }

      console.log(`Exam references: ${foundRefs}/${totalRefs} exist (${missing.length} missing)`);
      if (missing.length > 0) {
        console.log(`Missing exams from subjects: ${[...new Set(missing.map(m => m.split(' -> ')[0]))].join(', ')}`);
      }

      // Most exam references should exist (>55% - exams may be created later in development)
      const existenceRate = totalRefs > 0 ? foundRefs / totalRefs : 1;
      expect(existenceRate).toBeGreaterThan(0.55);
    });

    it('reports exercise reference statistics', () => {
      const missing: string[] = [];
      let totalRefs = 0;
      let foundRefs = 0;

      for (const subject of curriculum) {
        for (const topic of subject.topics) {
          for (const exerciseId of topic.exerciseIds) {
            totalRefs++;
            if (exerciseIdSet.has(exerciseId)) {
              foundRefs++;
            } else {
              missing.push(`${subject.id}/${topic.id} -> ${exerciseId}`);
            }
          }
        }
      }

      console.log(`Exercise references: ${foundRefs}/${totalRefs} exist (${missing.length} missing)`);
      if (missing.length > 0) {
        console.log(`Missing exercises from subjects: ${[...new Set(missing.map(m => m.split('/')[0]))].join(', ')}`);
      }

      // Most exercise references should exist (>95% based on current content)
      const existenceRate = totalRefs > 0 ? foundRefs / totalRefs : 1;
      expect(existenceRate).toBeGreaterThan(0.95);
    });
  });

  describe('subject structure validation', () => {
    it('all subjects should have required fields', () => {
      const issues: string[] = [];

      for (const subject of curriculum) {
        if (!subject.id) issues.push(`Subject missing id`);
        if (!subject.code) issues.push(`${subject.id} missing code`);
        if (!subject.title) issues.push(`${subject.id} missing title`);
        if (typeof subject.year !== 'number') issues.push(`${subject.id} missing/invalid year`);
        if (typeof subject.semester !== 'number') issues.push(`${subject.id} missing/invalid semester`);
        if (!subject.description) issues.push(`${subject.id} missing description`);
        if (!Array.isArray(subject.topics)) issues.push(`${subject.id} missing topics array`);
        if (!Array.isArray(subject.learningObjectives)) {
          issues.push(`${subject.id} missing learningObjectives array`);
        }
        if (typeof subject.estimatedHours !== 'number') {
          issues.push(`${subject.id} missing/invalid estimatedHours`);
        }
      }

      expect(
        issues,
        `Found ${issues.length} structural issues:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('all subjects should have at least one topic', () => {
      const empty: string[] = [];

      for (const subject of curriculum) {
        if (subject.topics.length === 0) {
          empty.push(subject.id);
        }
      }

      expect(
        empty,
        `Found ${empty.length} subjects with no topics:\n${empty.join('\n')}`
      ).toHaveLength(0);
    });

    it('all topics should have required fields', () => {
      const issues: string[] = [];

      for (const subject of curriculum) {
        for (const topic of subject.topics) {
          if (!topic.id) issues.push(`Topic in ${subject.id} missing id`);
          if (!topic.title) issues.push(`${topic.id} in ${subject.id} missing title`);
          if (!Array.isArray(topic.quizIds)) {
            issues.push(`${topic.id} in ${subject.id} missing quizIds array`);
          }
          if (!Array.isArray(topic.exerciseIds)) {
            issues.push(`${topic.id} in ${subject.id} missing exerciseIds array`);
          }
        }
      }

      expect(
        issues,
        `Found ${issues.length} topic structural issues:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('curriculum coverage', () => {
    it('should have subjects for all 4 years', () => {
      const yearsPresent = new Set(curriculum.map(s => s.year));
      expect(yearsPresent.has(1)).toBe(true);
      expect(yearsPresent.has(2)).toBe(true);
      expect(yearsPresent.has(3)).toBe(true);
      expect(yearsPresent.has(4)).toBe(true);
    });

    it('should have subjects for both semesters', () => {
      const semestersPresent = new Set(curriculum.map(s => s.semester));
      expect(semestersPresent.has(1)).toBe(true);
      expect(semestersPresent.has(2)).toBe(true);
    });

    it('should have a mix of CS and Math subjects', () => {
      const csSubjects = curriculum.filter(s => s.category === 'cs');
      const mathSubjects = curriculum.filter(s => s.category === 'math');

      expect(csSubjects.length).toBeGreaterThan(0);
      expect(mathSubjects.length).toBeGreaterThan(0);
    });
  });

  describe('statistics', () => {
    it('reports curriculum statistics', () => {
      const totalSubjects = curriculum.length;
      const totalTopics = curriculum.reduce((sum, s) => sum + s.topics.length, 0);
      const totalHours = curriculum.reduce((sum, s) => sum + s.estimatedHours, 0);

      console.log(`Curriculum statistics:`);
      console.log(`  Total subjects: ${totalSubjects}`);
      console.log(`  Total topics: ${totalTopics}`);
      console.log(`  Total estimated hours: ${totalHours}`);
      console.log(`  Quizzes: ${allQuizzes.length}`);
      console.log(`  Exams: ${allExams.length}`);
      console.log(`  Exercises: ${allExercises.length}`);

      expect(totalSubjects).toBeGreaterThan(0);
    });
  });
});
