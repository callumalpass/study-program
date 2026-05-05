import fs from 'node:fs';
import path from 'node:path';
import { stringify as stringifyYaml } from 'yaml';

function writeYaml(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, stringifyYaml(value), 'utf8');
}

function writeTextIfMissing(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, value, 'utf8');
  }
}

function titleFromId(id) {
  return id
    .split(/[-_.]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function createAuthoringPack(packDir, id, options = {}) {
  const pack = {
    id,
    title: options.title || titleFromId(id),
    version: '0.1.0',
    schemaVersion: 1,
    runtimeCompatibility: '>=2.0.0 <3.0.0',
    exports: {
      subjects: true,
      concepts: true,
      tracks: true,
    },
    dependencies: [],
    ...(options.extends ? { extends: [options.extends] } : {}),
    overlay: {
      defaultWriteTarget: true,
    },
  };

  writeYaml(path.join(packDir, 'pack.yaml'), pack);
  writeYaml(path.join(packDir, 'concepts.yaml'), { concepts: {} });
  fs.mkdirSync(path.join(packDir, 'subjects'), { recursive: true });
  fs.mkdirSync(path.join(packDir, 'tracks'), { recursive: true });
  writeTextIfMissing(path.join(packDir, 'README.md'), `# ${pack.title}\n\nPersonal stu.p v2 overlay content pack.\n`);
  return pack;
}

export function createSubject(packDir, subjectId, options = {}) {
  const subjectDir = path.join(packDir, 'subjects', subjectId);
  const topicId = `${subjectId}-topic-1`;
  const subject = {
    id: subjectId,
    code: options.code || subjectId.toUpperCase().replace(/-/g, '').slice(0, 12),
    title: options.title || titleFromId(subjectId),
    category: options.category || 'cs',
    level: options.level || 'remediation',
    year: Number(options.year || 0),
    semester: Number(options.semester || 0),
    estimatedHours: Number(options.estimatedHours || 4),
    version: 1,
    description: options.description || 'Personalized study module.',
    prerequisites: {
      subjects: [],
      concepts: [],
    },
    learningObjectives: [
      'Close the targeted knowledge gap with focused practice.',
    ],
    conceptTags: options.concept ? [options.concept] : [],
    topics: [
      'topics/topic-1/topic.yaml',
    ],
    examIds: [],
    projectIds: [],
  };
  const topic = {
    id: topicId,
    number: 1,
    title: options.topicTitle || 'Focused Review',
    version: 1,
    description: 'Targeted remediation and practice.',
    learningObjectives: subject.learningObjectives,
    conceptTags: subject.conceptTags,
    content: [
      'content/topic-1.md',
      'content/topic-1/01-review.md',
    ],
    activities: {
      quizzes: [],
      exercises: [],
      decks: [],
    },
  };

  writeYaml(path.join(subjectDir, 'subject.yaml'), subject);
  writeYaml(path.join(subjectDir, 'topics', 'topic-1', 'topic.yaml'), topic);
  writeTextIfMissing(path.join(subjectDir, 'content', 'topic-1.md'), `# ${topic.title}\n\n${topic.description}\n`);
  writeTextIfMissing(path.join(subjectDir, 'content', 'topic-1', '01-review.md'), `---\ntitle: Review\norder: 1\n---\n\n# Review\n\nAdd the focused explanation here.\n`);
  writeTextIfMissing(path.join(subjectDir, 'content', 'topic-1', 'quizzes.json'), '[]\n');
  writeTextIfMissing(path.join(subjectDir, 'content', 'topic-1', 'exercises.json'), '[]\n');
  writeTextIfMissing(path.join(subjectDir, 'exams.json'), '[]\n');
  writeTextIfMissing(path.join(subjectDir, 'projects.json'), '[]\n');
  return { subject, topic };
}

export function createRemediation(packDir, conceptId) {
  const safeId = conceptId.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
  return createSubject(packDir, `${safeId}-remediation`, {
    title: `${titleFromId(safeId)} Remediation`,
    concept: conceptId,
    topicTitle: `${titleFromId(safeId)} Review`,
    description: `Targeted remediation for ${conceptId}.`,
  });
}
