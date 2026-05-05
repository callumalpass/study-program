import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  bundledPackManifest,
  bundledConcepts,
  bundledSubjects,
  bundledTracks,
  getAllBundledAssessments,
  getBundledSubjectAssessments,
} from '../src/content-core/bundled-pack';
import { validateBundledContentPack, validateContentGraph } from '../src/content-core/validation';
import { curriculum } from '../src/data/curriculum';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

describe('v2 bundled content pack', () => {
  it('loads the cs-degree pack manifest, tracks, subjects, topics, and activities', () => {
    const allAssessments = getAllBundledAssessments();

    expect(bundledPackManifest.id).toBe('cs-degree');
    expect(bundledPackManifest.schemaVersion).toBe(1);
    expect(Object.keys(bundledConcepts)).toHaveLength(307);
    expect(bundledSubjects).toHaveLength(38);
    expect(bundledTracks).toHaveLength(7);
    expect(bundledSubjects.flatMap((subject) => subject.topics)).toHaveLength(267);
    expect(allAssessments.quizzes).toHaveLength(801);
    expect(allAssessments.exercises).toHaveLength(4356);
    expect(allAssessments.exams).toHaveLength(76);
    expect(allAssessments.projects).toHaveLength(76);
  });

  it('adapts v2 subject and topic metadata to the existing runtime shape', () => {
    const cs101 = curriculum.find((subject) => subject.id === 'cs101');
    const topic1 = cs101?.topics.find((topic) => topic.id === 'cs101-topic-1');
    const assessments = getBundledSubjectAssessments('cs101');

    expect(cs101?.packId).toBe('cs-degree');
    expect(cs101?.prerequisites).toEqual([]);
    expect(cs101?.conceptTags).toContain('cs.cs101');
    expect(topic1?.title).toBe('Variables and Data Types');
    expect(topic1?.conceptTags).toEqual(['cs.cs101', 'cs.cs101.topic1']);
    expect(topic1?.subtopics).toHaveLength(7);
    expect(topic1?.quizIds).toEqual(['cs101-quiz-1', 'cs101-quiz-1b', 'cs101-quiz-1c']);
    expect(topic1?.exerciseIds).toContain('cs101-t1-ex16');
    expect(assessments.quizzes.map((quiz) => quiz.id)).toContain('cs101-quiz-1');
    expect(assessments.exercises.map((exercise) => exercise.id)).toContain('cs101-t1-ex16');
  });

  it('passes v2 content validation', () => {
    const result = validateBundledContentPack();

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.stats.subjects).toBe(38);
    expect(result.stats.tracks).toBe(7);
  });

  it('flags duplicate IDs and missing references during validation', () => {
    const [firstSubject, secondSubject] = bundledSubjects;
    const result = validateContentGraph({
      manifest: bundledPackManifest,
      subjects: [
        {
          ...firstSubject,
          prerequisites: ['missing-subject'],
          topics: [
            {
              ...firstSubject.topics[0],
              quizIds: ['missing-quiz'],
              exerciseIds: ['missing-exercise'],
            },
          ],
        },
        {
          ...secondSubject,
          id: firstSubject.id,
          topics: [],
        },
      ],
      tracks: [
        {
          id: 'bad-track',
          title: 'Bad Track',
          subjects: ['missing-subject'],
        },
      ],
      quizzes: [],
      exercises: [],
      exams: [],
      projects: [],
    });

    expect(result.ok).toBe(false);
    expect(result.errors.map((error) => error.code)).toEqual(
      expect.arrayContaining([
        'subject.duplicate_id',
        'subject.missing_prerequisite',
        'topic.missing_quiz',
        'topic.missing_exercise',
        'track.missing_subject',
      ]),
    );
  });

  it('keeps runtime registries free of per-subject imports', () => {
    const curriculumSource = fs.readFileSync(path.join(rootDir, 'src/data/curriculum.ts'), 'utf8');
    const subjectRegistrySource = fs.readFileSync(path.join(rootDir, 'src/subjects/registry.ts'), 'utf8');
    const subjectIndexSource = fs.readFileSync(path.join(rootDir, 'src/subjects/index.ts'), 'utf8');

    expect(curriculumSource).not.toMatch(/subjects\/cs101|cs101Topics/);
    expect(subjectRegistrySource).not.toMatch(/import\(['"].\/cs101['"]\)|subjects\/cs101/);
    expect(subjectIndexSource).not.toMatch(/from ['"].\/cs101['"]/);
  });
});
