import { bundledSubjects } from '@/content-core/bundled-pack';
import type { Subject } from '@/core/types';

/**
 * Current bundled curriculum.
 *
 * v2 reads subject and topic metadata from the bundled cs-degree content pack
 * instead of hard-coded TypeScript imports.
 */
export const curriculum = bundledSubjects;

export const curriculumStats = {
  totalSubjects: curriculum.length,
  totalEstimatedHours: curriculum.reduce((sum, subject) => sum + subject.estimatedHours, 0),
  subjectsByYear: {
    1: curriculum.filter((subject) => subject.year === 1).length,
    2: curriculum.filter((subject) => subject.year === 2).length,
    3: curriculum.filter((subject) => subject.year === 3).length,
    4: curriculum.filter((subject) => subject.year === 4).length,
  },
  subjectsBySemester: {
    '1-1': curriculum.filter((subject) => subject.year === 1 && subject.semester === 1).length,
    '1-2': curriculum.filter((subject) => subject.year === 1 && subject.semester === 2).length,
    '2-1': curriculum.filter((subject) => subject.year === 2 && subject.semester === 1).length,
    '2-2': curriculum.filter((subject) => subject.year === 2 && subject.semester === 2).length,
    '3-1': curriculum.filter((subject) => subject.year === 3 && subject.semester === 1).length,
    '3-2': curriculum.filter((subject) => subject.year === 3 && subject.semester === 2).length,
    '4-1': curriculum.filter((subject) => subject.year === 4 && subject.semester === 1).length,
    '4-2': curriculum.filter((subject) => subject.year === 4 && subject.semester === 2).length,
  },
};

export function getSubjectById(id: string): Subject | undefined {
  return curriculum.find((subject) => subject.id === id);
}

export function getSubjectsByYearSemester(year: number, semester: number): Subject[] {
  return curriculum.filter((subject) => subject.year === year && subject.semester === semester);
}

export function getPrerequisites(subjectId: string): Subject[] {
  const subject = getSubjectById(subjectId);
  if (!subject) return [];
  return subject.prerequisites
    .map((prerequisiteId) => getSubjectById(prerequisiteId))
    .filter((prerequisite): prerequisite is Subject => Boolean(prerequisite));
}

export function arePrerequisitesMet(subjectId: string, completedSubjectIds: string[]): boolean {
  const subject = getSubjectById(subjectId);
  if (!subject) return false;
  return subject.prerequisites.every((prerequisiteId) => completedSubjectIds.includes(prerequisiteId));
}
