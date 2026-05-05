#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

function expandPath(value) {
  if (value === '~') return os.homedir();
  if (value.startsWith('~/') || value.startsWith('~\\')) return path.join(os.homedir(), value.slice(2));
  return value;
}

function optionValues(argv, name) {
  const values = [];
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === name && argv[i + 1]) values.push(argv[i + 1]);
  }
  return values;
}

function readYaml(filePath) {
  return parseYaml(fs.readFileSync(filePath, 'utf8'));
}

function writeYaml(filePath, value) {
  fs.writeFileSync(filePath, stringifyYaml(value, { lineWidth: 0 }), 'utf8');
}

function listDirs(dirPath) {
  return fs.readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function categoryTitle(category) {
  switch (category) {
    case 'cs': return 'Computer science';
    case 'math': return 'Mathematics';
    case 'statistics': return 'Statistics';
    default: return category;
  }
}

function baselineConceptId(category, subjectId) {
  return `${category}.${subjectId}`.toLowerCase();
}

function topicConceptId(category, subjectId, topicNumber) {
  return `${baselineConceptId(category, subjectId)}.topic${topicNumber}`.toLowerCase();
}

function applyConcepts(packDir) {
  const subjectsDir = path.join(packDir, 'subjects');
  const concepts = {};
  let subjectCount = 0;
  let topicCount = 0;

  for (const subjectDirName of listDirs(subjectsDir)) {
    const subjectPath = path.join(subjectsDir, subjectDirName, 'subject.yaml');
    if (!fs.existsSync(subjectPath)) continue;

    const subject = readYaml(subjectPath);
    const categoryId = String(subject.category || 'general').toLowerCase();
    const subjectConceptId = baselineConceptId(categoryId, subject.id);

    concepts[categoryId] ||= {
      title: categoryTitle(categoryId),
      description: `${categoryTitle(categoryId)} concepts in this pack.`,
    };
    concepts[subjectConceptId] = {
      title: subject.title,
      description: subject.description || `${subject.code || subject.id} concepts.`,
      parents: [categoryId],
    };

    subject.conceptTags = Array.from(new Set([...(subject.conceptTags || []), subjectConceptId]));
    writeYaml(subjectPath, subject);
    subjectCount += 1;

    for (const topicRef of subject.topics || []) {
      const topicPath = path.join(subjectsDir, subjectDirName, topicRef);
      if (!fs.existsSync(topicPath)) continue;
      const topic = readYaml(topicPath);
      const topicId = topicConceptId(categoryId, subject.id, topic.number || topic.id);
      concepts[topicId] = {
        title: topic.title,
        description: topic.description || `${subject.code || subject.id} topic ${topic.number || ''}: ${topic.title}.`,
        parents: [subjectConceptId],
      };
      topic.conceptTags = Array.from(new Set([...(topic.conceptTags || []), subjectConceptId, topicId]));
      writeYaml(topicPath, topic);
      topicCount += 1;
    }
  }

  writeYaml(path.join(packDir, 'concepts.yaml'), { concepts });
  return { packDir, concepts: Object.keys(concepts).length, subjects: subjectCount, topics: topicCount };
}

const packs = optionValues(process.argv.slice(2), '--pack').map((value) => path.resolve(expandPath(value)));
if (packs.length === 0) {
  console.error('Usage: node scripts/apply-baseline-concepts.mjs --pack <pack-dir> [--pack <pack-dir>]');
  process.exit(1);
}

for (const packDir of packs) {
  if (!fs.existsSync(path.join(packDir, 'pack.yaml'))) {
    console.error(`pack.yaml not found under ${packDir}`);
    process.exit(1);
  }
  const result = applyConcepts(packDir);
  console.log(`Tagged ${result.subjects} subjects and ${result.topics} topics with ${result.concepts} concepts in ${result.packDir}`);
}
