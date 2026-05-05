#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';
import { parse as parseYaml, stringify } from 'yaml';

const rootDir = process.cwd();
const sourceSubjectsDir = path.join(rootDir, 'src', 'subjects');
const packDir = path.join(rootDir, 'content', 'bundled-packs', 'cs-degree');

function readSourceFile(filePath) {
  return ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
}

function propName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  return undefined;
}

function literalToValue(node, scope = {}) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }
  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }
  if (ts.isIdentifier(node)) {
    if (Object.prototype.hasOwnProperty.call(scope, node.text)) {
      return scope[node.text];
    }
    return { $ref: node.text };
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => literalToValue(element, scope));
  }
  if (ts.isObjectLiteralExpression(node)) {
    const value = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const key = propName(property.name);
      if (!key) continue;
      value[key] = literalToValue(property.initializer, scope);
    }
    return value;
  }
  return undefined;
}

function findVariable(sourceFile, name) {
  let found;
  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === name
    ) {
      found = node.initializer;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return found;
}

function loadCurriculum() {
  const filePath = path.join(rootDir, 'src', 'data', 'curriculum.ts');
  const sourceFile = readSourceFile(filePath);
  const node = findVariable(sourceFile, 'curriculum');
  if (node && ts.isArrayLiteralExpression(node)) {
    return literalToValue(node).map((subject) => {
      const { topics, ...metadata } = subject;
      return metadata;
    });
  }

  const existingSubjectsDir = path.join(packDir, 'subjects');
  if (!fs.existsSync(existingSubjectsDir)) {
    throw new Error('Could not find curriculum array or existing v2 subject.yaml files');
  }

  return fs.readdirSync(existingSubjectsDir)
    .filter((name) => fs.existsSync(path.join(existingSubjectsDir, name, 'subject.yaml')))
    .map((subjectId) => {
      const metadata = parseYaml(
        fs.readFileSync(path.join(existingSubjectsDir, subjectId, 'subject.yaml'), 'utf8'),
      );
      return {
        ...metadata,
        prerequisites: Array.isArray(metadata.prerequisites)
          ? metadata.prerequisites
          : metadata.prerequisites?.subjects ?? [],
      };
    });
}

function loadTopicConfigs(subjectId) {
  const filePath = path.join(sourceSubjectsDir, subjectId, 'topics.ts');
  const sourceFile = readSourceFile(filePath);
  const node = findVariable(sourceFile, 'topicConfigs');
  if (!node || !ts.isArrayLiteralExpression(node)) {
    throw new Error(`Could not find topicConfigs in ${path.relative(rootDir, filePath)}`);
  }
  return literalToValue(node);
}

function loadTrackTemplates(subjects) {
  const filePath = path.join(rootDir, 'src', 'data', 'templates.ts');
  const sourceFile = readSourceFile(filePath);
  const scope = {};

  scope.ALL_SUBJECTS = subjects.map((subject) => subject.id);
  scope.CS_SUBJECTS = subjects
    .filter((subject) => subject.category === 'cs')
    .map((subject) => subject.id);
  scope.MATH_SUBJECTS = subjects
    .filter((subject) => subject.category === 'math')
    .map((subject) => subject.id);

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;
      if (ts.isArrayLiteralExpression(declaration.initializer)) {
        scope[declaration.name.text] = literalToValue(declaration.initializer, scope);
      }
    }
  }

  const templatesNode = findVariable(sourceFile, 'courseTemplates');
  if (templatesNode && ts.isArrayLiteralExpression(templatesNode)) {
    return literalToValue(templatesNode, scope).map((template) => ({
      id: template.id,
      title: template.name,
      description: template.description,
      subjects: Array.isArray(template.subjectIds) ? template.subjectIds : [],
    }));
  }

  const existingTracksDir = path.join(packDir, 'tracks');
  if (!fs.existsSync(existingTracksDir)) {
    throw new Error('Could not find courseTemplates array or existing v2 track files');
  }

  return fs.readdirSync(existingTracksDir)
    .filter((name) => name.endsWith('.yaml') || name.endsWith('.yml'))
    .map((name) => parseYaml(fs.readFileSync(path.join(existingTracksDir, name), 'utf8')));
}

function cleanDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyIfExists(sourcePath, targetPath) {
  if (!fs.existsSync(sourcePath)) return;
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.cpSync(sourcePath, targetPath, { recursive: true });
}

function listMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter((name) => name.endsWith('.md'))
    .sort();
}

function readIdsFromJsonArray(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return Array.isArray(parsed)
    ? parsed.map((item) => item?.id).filter((id) => typeof id === 'string')
    : [];
}

function cleanStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [];
}

function writeYaml(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, stringify(value, {
    lineWidth: 0,
    singleQuote: false,
  }));
}

function inferLevel(subject) {
  if (subject.id === 'cs404') return 'capstone';
  if (subject.year <= 1) return 'introductory';
  if (subject.year === 2) return 'intermediate';
  return 'advanced';
}

function categoryTitle(category) {
  switch (category) {
    case 'cs': return 'Computer science';
    case 'math': return 'Mathematics';
    case 'statistics': return 'Statistics';
    default: return category;
  }
}

function subjectConceptId(subject) {
  return `${subject.category}.${subject.id}`.toLowerCase();
}

function topicConceptId(subject, topic) {
  return `${subjectConceptId(subject)}.topic${topic.number}`.toLowerCase();
}

function addSubjectConcept(concepts, subject, topicConfigs) {
  const categoryId = String(subject.category || 'general').toLowerCase();
  concepts[categoryId] ||= {
    title: categoryTitle(categoryId),
    description: `${categoryTitle(categoryId)} concepts in this pack.`,
  };
  concepts[subjectConceptId(subject)] = {
    title: subject.title,
    description: subject.description,
    parents: [categoryId],
  };
  for (const topic of topicConfigs) {
    concepts[topicConceptId(subject, topic)] = {
      title: topic.title,
      description: `${subject.code} topic ${topic.number}: ${topic.title}.`,
      parents: [subjectConceptId(subject)],
    };
  }
}

function makeSubjectYaml(subject, topicConfigs) {
  return {
    id: subject.id,
    code: subject.code,
    title: subject.title,
    category: subject.category,
    level: inferLevel(subject),
    year: subject.year,
    semester: subject.semester,
    estimatedHours: subject.estimatedHours,
    version: 1,
    description: subject.description,
    prerequisites: {
      subjects: subject.prerequisites ?? [],
      concepts: [],
    },
    learningObjectives: subject.learningObjectives ?? [],
    conceptTags: [subjectConceptId(subject)],
    topics: topicConfigs.map((topic) => `topics/topic-${topic.number}/topic.yaml`),
    examIds: subject.examIds ?? [],
    projectIds: subject.projectIds ?? [],
  };
}

function makeTopicYaml(subject, topic) {
  const topicDir = path.join(sourceSubjectsDir, subject.id, 'content', `topic-${topic.number}`);
  const subtopics = listMarkdownFiles(topicDir).map((name) => `content/topic-${topic.number}/${name}`);
  const quizIds = readIdsFromJsonArray(path.join(topicDir, 'quizzes.json'));
  const exerciseIds = readIdsFromJsonArray(path.join(topicDir, 'exercises.json'));
  return {
    id: `${subject.id}-topic-${topic.number}`,
    number: topic.number,
    title: topic.title,
    version: 1,
    description: '',
    learningObjectives: [],
    conceptTags: [subjectConceptId(subject), topicConceptId(subject, topic)],
    content: [
      `content/topic-${topic.number}.md`,
      ...subtopics,
    ],
    activities: {
      quizzes: quizIds.length > 0 ? quizIds : cleanStringArray(topic.quizIds),
      exercises: exerciseIds.length > 0 ? exerciseIds : cleanStringArray(topic.exerciseIds),
      decks: [],
    },
  };
}

function writePack(subjects, tracks) {
  cleanDir(packDir);
  const concepts = {};

  writeYaml(path.join(packDir, 'pack.yaml'), {
    id: 'cs-degree',
    title: 'Computer Science Degree',
    version: '1.0.0',
    schemaVersion: 1,
    runtimeCompatibility: '>=2.0.0 <3.0.0',
    author: 'Callum Alpass',
    license: 'MIT',
    description: 'A four-year computer science and mathematics curriculum.',
    exports: {
      subjects: true,
      concepts: true,
      tracks: true,
    },
    dependencies: [],
  });

  for (const track of tracks) {
    writeYaml(path.join(packDir, 'tracks', `${track.id}.yaml`), track);
  }

  for (const subject of subjects) {
    const topicConfigs = loadTopicConfigs(subject.id);
    addSubjectConcept(concepts, subject, topicConfigs);
    const packSubjectDir = path.join(packDir, 'subjects', subject.id);
    const sourceSubjectDir = path.join(sourceSubjectsDir, subject.id);

    writeYaml(path.join(packSubjectDir, 'subject.yaml'), makeSubjectYaml(subject, topicConfigs));
    for (const topic of topicConfigs) {
      writeYaml(
        path.join(packSubjectDir, 'topics', `topic-${topic.number}`, 'topic.yaml'),
        makeTopicYaml(subject, topic),
      );
    }

    copyIfExists(
      path.join(sourceSubjectDir, 'content'),
      path.join(packSubjectDir, 'content'),
    );
    copyIfExists(
      path.join(sourceSubjectDir, 'exams.json'),
      path.join(packSubjectDir, 'exams.json'),
    );
    copyIfExists(
      path.join(sourceSubjectDir, 'projects.json'),
      path.join(packSubjectDir, 'projects.json'),
    );
  }

  writeYaml(path.join(packDir, 'concepts.yaml'), { concepts });
}

const subjects = loadCurriculum();
const tracks = loadTrackTemplates(subjects);
writePack(subjects, tracks);
console.log(`Generated ${subjects.length} subjects and ${tracks.length} tracks in ${path.relative(rootDir, packDir)}`);
