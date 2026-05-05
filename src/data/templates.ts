import type { CourseTemplate } from '@/core/types';
import { bundledTracks } from '@/content-core/bundled-pack';
import { curriculum } from './curriculum';

/**
 * Course templates are v2 tracks from the bundled content pack, adapted to the
 * existing course-builder shape.
 */

function calculateHours(subjectIds: string[]): number {
  return curriculum
    .filter((subject) => subjectIds.includes(subject.id))
    .reduce((sum, subject) => sum + subject.estimatedHours, 0);
}

export const courseTemplates: CourseTemplate[] = bundledTracks.map((track) => ({
  id: track.id,
  name: track.title,
  description: track.description ?? '',
  subjectIds: track.subjects,
  estimatedHours: calculateHours(track.subjects),
}));

export function getTemplateById(id: string): CourseTemplate | undefined {
  return courseTemplates.find((template) => template.id === id);
}

export function getTemplateSubjectIds(templateId: string): string[] {
  const template = getTemplateById(templateId);
  return template?.subjectIds ?? [];
}
