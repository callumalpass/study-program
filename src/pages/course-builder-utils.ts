// Course Builder utility functions - extracted for testability
import type { Subject, SubjectCategory } from '@/core/types';

export interface CourseBuilderFilters {
  category: SubjectCategory | 'all';
  year: number | null;
  search: string;
}

/**
 * Get prerequisite subjects that are not selected
 */
export function getMissingPrerequisites(
  subjectId: string,
  selectedIds: string[],
  curriculum: Subject[]
): string[] {
  const subject = curriculum.find(s => s.id === subjectId);
  if (!subject) return [];
  return subject.prerequisites.filter(prereqId => !selectedIds.includes(prereqId));
}

/**
 * Get subjects that would be orphaned if this subject is removed
 * (i.e., subjects that depend on the given subject as a prerequisite)
 */
export function getDependentSubjects(
  subjectId: string,
  selectedIds: string[],
  curriculum: Subject[]
): Subject[] {
  return curriculum.filter(s =>
    selectedIds.includes(s.id) &&
    s.prerequisites.includes(subjectId)
  );
}

/**
 * Filter subjects based on current filters
 */
export function filterSubjects(subjects: Subject[], filters: CourseBuilderFilters): Subject[] {
  return subjects.filter(subject => {
    // Category filter
    if (filters.category !== 'all' && subject.category !== filters.category) {
      return false;
    }

    // Year filter
    if (filters.year !== null && subject.year !== filters.year) {
      return false;
    }

    // Search filter
    if (filters.search.trim()) {
      const searchLower = filters.search.trim().toLowerCase();
      const matchesCode = subject.code.toLowerCase().includes(searchLower);
      const matchesTitle = subject.title.toLowerCase().includes(searchLower);
      const matchesDesc = subject.description.toLowerCase().includes(searchLower);
      if (!matchesCode && !matchesTitle && !matchesDesc) {
        return false;
      }
    }

    return true;
  });
}
