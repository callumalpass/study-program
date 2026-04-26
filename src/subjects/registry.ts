import type { Exam, Exercise, Project, Quiz } from '@/core/types';

export interface SubjectAssessments {
  quizzes: Quiz[];
  exercises: Exercise[];
  exams: Exam[];
  projects: Project[];
}

type SubjectModule = Record<string, unknown>;
type SubjectLoader = () => Promise<unknown>;

const subjectLoaders: Record<string, SubjectLoader> = {
  cs101: () => import('./cs101'),
  math101: () => import('./math101'),
  cs102: () => import('./cs102'),
  cs103: () => import('./cs103'),
  math102: () => import('./math102'),
  cs104: () => import('./cs104'),
  cs105: () => import('./cs105'),
  cs201: () => import('./cs201'),
  cs202: () => import('./cs202'),
  cs203: () => import('./cs203'),
  math203: () => import('./math203'),
  cs204: () => import('./cs204'),
  cs205: () => import('./cs205'),
  math201: () => import('./math201'),
  math202: () => import('./math202'),
  math204: () => import('./math204'),
  cs301: () => import('./cs301'),
  cs302: () => import('./cs302'),
  cs303: () => import('./cs303'),
  cs304: () => import('./cs304'),
  math301: () => import('./math301'),
  math302: () => import('./math302'),
  cs305: () => import('./cs305'),
  cs306: () => import('./cs306'),
  cs307: () => import('./cs307'),
  math303: () => import('./math303'),
  math304: () => import('./math304'),
  cs401: () => import('./cs401'),
  cs402: () => import('./cs402'),
  cs403: () => import('./cs403'),
  cs405: () => import('./cs405'),
  math401: () => import('./math401'),
  math402: () => import('./math402'),
  cs404: () => import('./cs404'),
  cs406: () => import('./cs406'),
  cs407: () => import('./cs407'),
  math403: () => import('./math403'),
  math404: () => import('./math404'),
};

const assessmentCache = new Map<string, Promise<SubjectAssessments>>();

function readArray<T>(module: SubjectModule, key: string): T[] {
  const value = module[key];
  return Array.isArray(value) ? value as T[] : [];
}

function extractAssessments(subjectId: string, module: SubjectModule): SubjectAssessments {
  return {
    quizzes: readArray<Quiz>(module, `${subjectId}Quizzes`),
    exercises: readArray<Exercise>(module, `${subjectId}Exercises`),
    exams: readArray<Exam>(module, `${subjectId}Exams`),
    projects: readArray<Project>(module, `${subjectId}Projects`),
  };
}

export function getKnownSubjectIds(): string[] {
  return Object.keys(subjectLoaders);
}

export async function loadSubjectAssessments(subjectId: string): Promise<SubjectAssessments> {
  const loader = subjectLoaders[subjectId];
  if (!loader) {
    return { quizzes: [], exercises: [], exams: [], projects: [] };
  }

  if (!assessmentCache.has(subjectId)) {
    assessmentCache.set(subjectId, loader().then((module) =>
      extractAssessments(subjectId, module as SubjectModule)
    ));
  }

  return assessmentCache.get(subjectId)!;
}

export async function loadAllAssessments(): Promise<SubjectAssessments> {
  const allAssessments = await Promise.all(
    getKnownSubjectIds().map((subjectId) => loadSubjectAssessments(subjectId))
  );

  return allAssessments.reduce<SubjectAssessments>((combined, assessments) => {
    combined.quizzes.push(...assessments.quizzes);
    combined.exercises.push(...assessments.exercises);
    combined.exams.push(...assessments.exams);
    combined.projects.push(...assessments.projects);
    return combined;
  }, {
    quizzes: [],
    exercises: [],
    exams: [],
    projects: [],
  });
}
