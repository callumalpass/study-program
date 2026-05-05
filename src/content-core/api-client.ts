import type { Exam, Exercise, Project, Quiz, Subject } from '@/core/types';
import type { SubjectAssessments } from '@/content-core/bundled-pack';

let apiAvailable: boolean | null = null;

function canUseApi(): boolean {
  return typeof window !== 'undefined' &&
    typeof window.fetch === 'function' &&
    window.location.protocol !== 'file:';
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  if (!canUseApi()) return null;
  if (apiAvailable === false && !url.startsWith('/api/learner/events')) return null;

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        accept: 'application/json',
        ...(init?.headers || {}),
      },
      cache: 'no-store',
    });
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.includes('application/json')) {
      apiAvailable = false;
      return null;
    }
    apiAvailable = true;
    return await response.json() as T;
  } catch {
    apiAvailable = false;
    return null;
  }
}

export async function loadApiCurriculum(): Promise<Subject[] | null> {
  return fetchJson<Subject[]>('/api/subjects');
}

export async function loadApiSubjectAssessments(subjectId: string): Promise<SubjectAssessments | null> {
  return fetchJson<SubjectAssessments>(`/api/subjects/${encodeURIComponent(subjectId)}/assessments`);
}

export async function loadApiAllAssessments(): Promise<SubjectAssessments | null> {
  const result = await fetchJson<{
    quizzes: Quiz[];
    exercises: Exercise[];
    exams: Exam[];
    projects: Project[];
  }>('/api/activities');
  if (!result) return null;
  return {
    quizzes: result.quizzes || [],
    exercises: result.exercises || [],
    exams: result.exams || [],
    projects: result.projects || [],
  };
}

export async function loadApiActivePlan(): Promise<{
  plan: {
    id: string;
    title: string;
    extends?: string[];
    enabledPacks?: string[];
    insertions?: Array<{ subject?: string; before?: string; reason?: string }>;
    focus?: { conceptTags?: string[] };
  };
  validation: { ok: boolean; issues: Array<{ severity: string; code: string; message: string }> };
} | null> {
  return fetchJson('/api/plans/active');
}

export async function loadApiLearnerProfile(): Promise<{
  algorithmVersion: string;
  generatedAt: string;
  eventCount: number;
  conceptMastery: Record<string, number>;
  recentStruggles: Array<{ conceptTags: string[]; evidence: string }>;
  recommendedActions: Array<{ type: string; conceptTags: string[]; reason: string }>;
} | null> {
  return fetchJson('/api/learner/profile');
}

export function recordLearnerEvent(event: Record<string, unknown>): void {
  if (!canUseApi()) return;
  if (apiAvailable === false) return;

  const payload = JSON.stringify({
    ...event,
    at: event.at || new Date().toISOString(),
  });

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const sent = navigator.sendBeacon('/api/learner/events', new Blob([payload], { type: 'application/json' }));
    if (sent) return;
  }

  fetch('/api/learner/events', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: payload,
    keepalive: true,
  })
    .then((response) => {
      apiAvailable = response.ok;
    })
    .catch(() => {
      apiAvailable = false;
    });
}
