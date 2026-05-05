import {
  getAllBundledAssessments,
  getBundledSubjectAssessments,
  getBundledSubjectIds,
  type SubjectAssessments,
} from '@/content-core/bundled-pack';
import {
  loadApiAllAssessments,
  loadApiSubjectAssessments,
} from '@/content-core/api-client';

export type { SubjectAssessments };

export function getKnownSubjectIds(): string[] {
  return getBundledSubjectIds();
}

export async function loadSubjectAssessments(subjectId: string): Promise<SubjectAssessments> {
  const apiAssessments = await loadApiSubjectAssessments(subjectId);
  if (apiAssessments) return apiAssessments;
  return getBundledSubjectAssessments(subjectId);
}

export async function loadAllAssessments(): Promise<SubjectAssessments> {
  const apiAssessments = await loadApiAllAssessments();
  if (apiAssessments) return apiAssessments;
  return getAllBundledAssessments();
}
