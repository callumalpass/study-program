import { parse as parseYaml } from 'yaml';
import type { Exam, Exercise, Project, Quiz, Subject, Subtopic, Topic } from '@/core/types';
import { extractTitleFromContent, parseFrontmatter, slugFromFilename } from '@/subjects/loader';

export const BUNDLED_PACK_ID = 'cs-degree';
const PACK_ROOT = `content/bundled-packs/${BUNDLED_PACK_ID}`;

export interface ContentPackManifest {
  id: string;
  title: string;
  version: string;
  schemaVersion: number;
  runtimeCompatibility?: string;
  author?: string;
  license?: string;
  description?: string;
  exports?: {
    subjects?: boolean;
    concepts?: boolean;
    tracks?: boolean;
  };
  dependencies?: string[];
}

export interface ContentTrack {
  id: string;
  title: string;
  description?: string;
  subjects: string[];
}

export interface ContentConcept {
  id: string;
  title: string;
  description?: string;
  parents?: string[];
}

interface V2SubjectMetadata {
  id: string;
  code: string;
  title: string;
  category: Subject['category'];
  level?: string;
  year: number;
  semester: number;
  estimatedHours: number;
  version?: number;
  description: string;
  prerequisites?: {
    subjects?: string[];
    concepts?: string[];
  } | string[];
  learningObjectives?: string[];
  conceptTags?: string[];
  topics?: string[];
  examIds?: string[];
  projectIds?: string[];
  tags?: string[];
}

interface V2TopicMetadata {
  id: string;
  number?: number;
  title: string;
  version?: number;
  description?: string;
  learningObjectives?: string[];
  conceptTags?: string[];
  estimatedHours?: number;
  content?: string[];
  activities?: {
    quizzes?: string[];
    exercises?: string[];
    decks?: string[];
  };
}

export interface SubjectAssessments {
  quizzes: Quiz[];
  exercises: Exercise[];
  exams: Exam[];
  projects: Project[];
}

const packModules = import.meta.glob('../../content/bundled-packs/cs-degree/pack.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const conceptModules = import.meta.glob('../../content/bundled-packs/cs-degree/concepts.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const subjectYamlModules = import.meta.glob('../../content/bundled-packs/cs-degree/subjects/*/subject.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const topicYamlModules = import.meta.glob('../../content/bundled-packs/cs-degree/subjects/*/topics/*/topic.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const markdownModules = import.meta.glob('../../content/bundled-packs/cs-degree/subjects/*/content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const quizModules = import.meta.glob('../../content/bundled-packs/cs-degree/subjects/*/content/*/quizzes.json', {
  eager: true,
  import: 'default',
}) as Record<string, Quiz[]>;

const exerciseModules = import.meta.glob('../../content/bundled-packs/cs-degree/subjects/*/content/*/exercises.json', {
  eager: true,
  import: 'default',
}) as Record<string, Exercise[]>;

const examModules = import.meta.glob('../../content/bundled-packs/cs-degree/subjects/*/exams.json', {
  eager: true,
  import: 'default',
}) as Record<string, Exam[]>;

const projectModules = import.meta.glob('../../content/bundled-packs/cs-degree/subjects/*/projects.json', {
  eager: true,
  import: 'default',
}) as Record<string, Project[]>;

const trackYamlModules = import.meta.glob('../../content/bundled-packs/cs-degree/tracks/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function normalizeModulePath(modulePath: string): string {
  return modulePath
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/^(\.\.\/)+/, '');
}

function parseYamlModule<T>(raw: string, label: string): T {
  const parsed = parseYaml(raw) as T;
  if (!parsed || typeof parsed !== 'object') {
    throw new Error(`Invalid YAML object in ${label}`);
  }
  return parsed;
}

function parseAllYaml<T>(modules: Record<string, string>): Map<string, T> {
  const parsed = new Map<string, T>();
  for (const [modulePath, raw] of Object.entries(modules)) {
    const normalizedPath = normalizeModulePath(modulePath);
    parsed.set(normalizedPath, parseYamlModule<T>(raw, normalizedPath));
  }
  return parsed;
}

function packSubjectPath(subjectId: string, ref: string): string {
  return `${PACK_ROOT}/subjects/${subjectId}/${ref}`.replace(/\\/g, '/');
}

function subjectIdFromPath(modulePath: string): string {
  const match = normalizeModulePath(modulePath).match(/subjects\/([^/]+)\//);
  if (!match) {
    throw new Error(`Cannot infer subject id from ${modulePath}`);
  }
  return match[1];
}

function topicIdFromPath(subjectId: string, modulePath: string): string | undefined {
  const match = normalizeModulePath(modulePath).match(/content\/topic-(\d+)\//);
  return match ? `${subjectId}-topic-${Number(match[1])}` : undefined;
}

function arrayOrEmpty<T>(value: T[] | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

function prerequisiteSubjects(prerequisites: V2SubjectMetadata['prerequisites']): string[] {
  if (Array.isArray(prerequisites)) return prerequisites;
  return arrayOrEmpty(prerequisites?.subjects);
}

function buildSubtopic(subjectId: string, topicNumber: number | undefined, filePath: string, raw: string): Subtopic {
  const filename = filePath.split('/').pop() ?? filePath;
  const filenameWithoutExtension = filename.replace(/\.md$/, '');
  const { frontmatter, content } = parseFrontmatter(raw);
  const orderMatch = filenameWithoutExtension.match(/^(\d+)-/);
  const order = frontmatter.order ?? (orderMatch ? Number(orderMatch[1]) : 0);
  const slug = String(frontmatter.slug ?? slugFromFilename(filename));
  const title = String(frontmatter.title ?? extractTitleFromContent(content) ?? slug);
  const id = String(
    frontmatter.id ??
    `${subjectId}-t${topicNumber ?? 0}-${slug.replace(/-/g, '')}`,
  );

  return {
    id,
    slug,
    title,
    content: raw,
    order,
  };
}

function buildTopic(subjectId: string, topicMetadata: V2TopicMetadata): Topic {
  const contentRefs = arrayOrEmpty(topicMetadata.content);
  const topicContentRef = contentRefs.find((ref) => /topic-\d+\.md$/.test(ref));
  const topicContentPath = topicContentRef ? packSubjectPath(subjectId, topicContentRef) : '';
  const topicContent = topicContentPath ? markdownByPath.get(topicContentPath) ?? '' : '';

  const subtopics = contentRefs
    .filter((ref) => /\/.+\.md$/.test(ref) && ref !== topicContentRef)
    .map((ref) => {
      const fullPath = packSubjectPath(subjectId, ref);
      return buildSubtopic(subjectId, topicMetadata.number, ref, markdownByPath.get(fullPath) ?? '');
    })
    .sort((a, b) => a.order - b.order);

  return {
    id: topicMetadata.id,
    number: topicMetadata.number,
    title: topicMetadata.title,
    version: topicMetadata.version,
    content: topicContent,
    learningObjectives: arrayOrEmpty(topicMetadata.learningObjectives),
    conceptTags: arrayOrEmpty(topicMetadata.conceptTags),
    subtopics,
    quizIds: arrayOrEmpty(topicMetadata.activities?.quizzes),
    exerciseIds: arrayOrEmpty(topicMetadata.activities?.exercises),
  };
}

function buildSubject(subjectMetadata: V2SubjectMetadata): Subject {
  const topics = arrayOrEmpty(subjectMetadata.topics).map((topicRef) => {
    const topicPath = packSubjectPath(subjectMetadata.id, topicRef);
    const topicMetadata = topicMetadataByPath.get(topicPath);
    if (!topicMetadata) {
      throw new Error(`Missing topic metadata ${topicPath}`);
    }
    return buildTopic(subjectMetadata.id, topicMetadata);
  });

  return {
    id: subjectMetadata.id,
    code: subjectMetadata.code,
    title: subjectMetadata.title,
    category: subjectMetadata.category,
    level: subjectMetadata.level,
    year: subjectMetadata.year,
    semester: subjectMetadata.semester,
    prerequisites: prerequisiteSubjects(subjectMetadata.prerequisites),
    description: subjectMetadata.description,
    learningObjectives: arrayOrEmpty(subjectMetadata.learningObjectives),
    topics,
    estimatedHours: subjectMetadata.estimatedHours,
    version: subjectMetadata.version,
    packId: BUNDLED_PACK_ID,
    packVersion: bundledPackManifest.version,
    conceptTags: arrayOrEmpty(subjectMetadata.conceptTags),
    examIds: arrayOrEmpty(subjectMetadata.examIds),
    projectIds: arrayOrEmpty(subjectMetadata.projectIds),
    tags: arrayOrEmpty(subjectMetadata.tags),
  };
}

function normalizeQuiz(quiz: Quiz, subjectId: string, topicId?: string): Quiz {
  return {
    ...quiz,
    subjectId: quiz.subjectId || subjectId,
    topicId: quiz.topicId || topicId || `${subjectId}-topic-0`,
  };
}

function normalizeExercise(exercise: Exercise, subjectId: string, topicId?: string): Exercise {
  return {
    ...exercise,
    subjectId: exercise.subjectId || subjectId,
    topicId: exercise.topicId || topicId,
  } as Exercise;
}

function normalizeExam(exam: Exam, subjectId: string): Exam {
  return {
    ...exam,
    subjectId: exam.subjectId || subjectId,
  };
}

function normalizeProject(project: Project, subjectId: string): Project {
  return {
    ...project,
    subjectId: project.subjectId || subjectId,
  };
}

function sortSubjects(subjects: Subject[]): Subject[] {
  return [...subjects].sort((a, b) =>
    a.year - b.year ||
    a.semester - b.semester ||
    a.code.localeCompare(b.code, undefined, { numeric: true }),
  );
}

function loadPackManifest(): ContentPackManifest {
  const [entry] = Object.entries(packModules);
  if (!entry) {
    throw new Error('Missing bundled pack.yaml');
  }
  return parseYamlModule<ContentPackManifest>(entry[1], normalizeModulePath(entry[0]));
}

const markdownByPath = new Map(
  Object.entries(markdownModules).map(([modulePath, raw]) => [normalizeModulePath(modulePath), raw]),
);
const topicMetadataByPath = parseAllYaml<V2TopicMetadata>(topicYamlModules);
const subjectMetadataByPath = parseAllYaml<V2SubjectMetadata>(subjectYamlModules);

export const bundledPackManifest = loadPackManifest();

export const bundledConcepts: Record<string, ContentConcept> = (() => {
  const [entry] = Object.entries(conceptModules);
  if (!entry) return {};
  const parsed = parseYamlModule<{ concepts?: Record<string, Omit<ContentConcept, 'id'>> }>(entry[1], normalizeModulePath(entry[0]));
  return Object.fromEntries(
    Object.entries(parsed.concepts || {}).map(([id, concept]) => [id, { id, ...concept }]),
  );
})();

export const bundledTracks: ContentTrack[] = Array.from(parseAllYaml<ContentTrack>(trackYamlModules).values())
  .sort((a, b) => a.id.localeCompare(b.id));

export const bundledSubjects: Subject[] = sortSubjects(
  Array.from(subjectMetadataByPath.values()).map(buildSubject),
);

export const bundledQuizzes: Quiz[] = Object.entries(quizModules)
  .flatMap(([modulePath, quizzes]) => {
    const subjectId = subjectIdFromPath(modulePath);
    const topicId = topicIdFromPath(subjectId, modulePath);
    return quizzes.map((quiz) => normalizeQuiz(quiz, subjectId, topicId));
  });

export const bundledExercises: Exercise[] = Object.entries(exerciseModules)
  .flatMap(([modulePath, exercises]) => {
    const subjectId = subjectIdFromPath(modulePath);
    const topicId = topicIdFromPath(subjectId, modulePath);
    return exercises.map((exercise) => normalizeExercise(exercise, subjectId, topicId));
  });

export const bundledExams: Exam[] = Object.entries(examModules)
  .flatMap(([modulePath, exams]) => {
    const subjectId = subjectIdFromPath(modulePath);
    return exams.map((exam) => normalizeExam(exam, subjectId));
  });

export const bundledProjects: Project[] = Object.entries(projectModules)
  .flatMap(([modulePath, projects]) => {
    const subjectId = subjectIdFromPath(modulePath);
    return projects.map((project) => normalizeProject(project, subjectId));
  });

export function getBundledSubjectIds(): string[] {
  return bundledSubjects.map((subject) => subject.id);
}

export function getBundledSubjectAssessments(subjectId: string): SubjectAssessments {
  return {
    quizzes: bundledQuizzes.filter((quiz) => quiz.subjectId === subjectId),
    exercises: bundledExercises.filter((exercise) => exercise.subjectId === subjectId),
    exams: bundledExams.filter((exam) => exam.subjectId === subjectId),
    projects: bundledProjects.filter((project) => project.subjectId === subjectId),
  };
}

export function getAllBundledAssessments(): SubjectAssessments {
  return {
    quizzes: bundledQuizzes,
    exercises: bundledExercises,
    exams: bundledExams,
    projects: bundledProjects,
  };
}
