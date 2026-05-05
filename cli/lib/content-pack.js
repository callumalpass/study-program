import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { listDirectories } from './fs-state.js';

export function defaultBundledPackDir(rootDir) {
  return path.join(rootDir, 'content', 'bundled-packs', 'cs-degree');
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readYaml(filePath) {
  return parseYaml(fs.readFileSync(filePath, 'utf8'));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function asObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function sortById(a, b) {
  return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
}

function normalizeQuiz(quiz, subjectId, topicId, pack) {
  return {
    version: 1,
    ...quiz,
    subjectId: quiz.subjectId || subjectId,
    topicId: quiz.topicId || topicId,
    packId: quiz.packId || pack?.id,
    packVersion: quiz.packVersion || pack?.version,
  };
}

function normalizeExercise(exercise, subjectId, topicId, pack) {
  return {
    version: 1,
    ...exercise,
    subjectId: exercise.subjectId || subjectId,
    topicId: exercise.topicId || topicId,
    packId: exercise.packId || pack?.id,
    packVersion: exercise.packVersion || pack?.version,
  };
}

function normalizeExam(exam, subjectId, pack) {
  return {
    version: 1,
    ...exam,
    subjectId: exam.subjectId || subjectId,
    packId: exam.packId || pack?.id,
    packVersion: exam.packVersion || pack?.version,
  };
}

function normalizeProject(project, subjectId, pack) {
  return {
    version: 1,
    ...project,
    subjectId: project.subjectId || subjectId,
    packId: project.packId || pack?.id,
    packVersion: project.packVersion || pack?.version,
  };
}

function inferTopicId(subjectId, topicDirName) {
  const match = topicDirName.match(/topic-(\d+)/);
  return match ? `${subjectId}-topic-${Number(match[1])}` : `${subjectId}-${topicDirName}`;
}

function prerequisiteSubjects(prerequisites) {
  if (Array.isArray(prerequisites)) return prerequisites;
  return asArray(prerequisites?.subjects);
}

function parseFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: markdown };
  }

  const [, rawFrontmatter, content] = match;
  let parsed;
  try {
    parsed = parseYaml(rawFrontmatter);
  } catch {
    parsed = {};
    for (const line of rawFrontmatter.split('\n')) {
      const colonIndex = line.indexOf(':');
      if (colonIndex <= 0) continue;
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      parsed[key] = /^(0|[1-9]\d*)$/.test(value) ? Number(value) : value;
    }
  }
  return { frontmatter: asObject(parsed), content };
}

function extractTitleFromContent(content) {
  const withoutFencedCode = content.replace(/^(```|~~~)[\s\S]*?^\1/gm, '');
  const match = withoutFencedCode.match(/^#[ \t]+(.+)$/m);
  return match ? match[1].trim() : null;
}

function slugFromFilename(filename) {
  return filename
    .replace(/^\d+-/, '')
    .replace(/\.md$/, '')
    .toLowerCase();
}

function buildSubtopic(subjectId, topicNumber, ref, raw) {
  const filename = path.basename(ref);
  const filenameWithoutExtension = filename.replace(/\.md$/, '');
  const { frontmatter, content } = parseFrontmatter(raw);
  const orderMatch = filenameWithoutExtension.match(/^(\d+)-/);
  const order = frontmatter.order ?? (orderMatch ? Number(orderMatch[1]) : 0);
  const slug = String(frontmatter.slug ?? slugFromFilename(filename));
  const title = String(frontmatter.title ?? extractTitleFromContent(content) ?? slug);
  const id = String(frontmatter.id ?? `${subjectId}-t${topicNumber ?? 0}-${slug.replace(/-/g, '')}`);

  return {
    id,
    slug,
    title,
    content: raw,
    order,
    conceptTags: asArray(frontmatter.conceptTags),
    estimatedMinutes: frontmatter.estimatedMinutes,
  };
}

function topicDirNameFromTopic(topic) {
  if (Number.isFinite(Number(topic.number))) {
    return `topic-${Number(topic.number)}`;
  }
  const match = String(topic.id || '').match(/topic-(\d+)$/);
  return match ? `topic-${Number(match[1])}` : String(topic.id || '');
}

function loadTopic(subjectDir, subjectId, topicRef) {
  const topicPath = path.join(subjectDir, topicRef);
  const topic = readYaml(topicPath);
  const contentRefs = asArray(topic.content);
  const topicContentRef = contentRefs.find((ref) => /topic-\d+\.md$/.test(ref));
  const topicContentPath = topicContentRef ? path.join(subjectDir, topicContentRef) : '';
  const topicContent = topicContentPath && fs.existsSync(topicContentPath)
    ? fs.readFileSync(topicContentPath, 'utf8')
    : '';
  const subtopics = contentRefs
    .filter((ref) => ref !== topicContentRef && ref.endsWith('.md'))
    .filter((ref) => fs.existsSync(path.join(subjectDir, ref)))
    .map((ref) => buildSubtopic(
      subjectId,
      topic.number,
      ref,
      fs.readFileSync(path.join(subjectDir, ref), 'utf8'),
    ))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  return {
    id: topic.id,
    number: topic.number,
    title: topic.title,
    version: topic.version ?? 1,
    description: topic.description || '',
    content: topicContent,
    subtopics,
    quizIds: asArray(topic.activities?.quizzes),
    exerciseIds: asArray(topic.activities?.exercises),
    deckIds: asArray(topic.activities?.decks),
    conceptTags: asArray(topic.conceptTags),
    learningObjectives: asArray(topic.learningObjectives),
    estimatedHours: topic.estimatedHours,
    contentRefs,
    sourcePath: topicPath,
  };
}

function readSubject(subjectDir, pack) {
  const metadata = readYaml(path.join(subjectDir, 'subject.yaml'));
  const topics = asArray(metadata.topics).map((topicRef) => loadTopic(subjectDir, metadata.id, topicRef));
  return {
    id: metadata.id,
    code: metadata.code,
    title: metadata.title,
    category: metadata.category,
    level: metadata.level,
    year: metadata.year,
    semester: metadata.semester,
    prerequisites: prerequisiteSubjects(metadata.prerequisites),
    conceptPrerequisites: asArray(metadata.prerequisites?.concepts),
    description: metadata.description,
    learningObjectives: asArray(metadata.learningObjectives),
    estimatedHours: metadata.estimatedHours,
    version: metadata.version ?? 1,
    conceptTags: asArray(metadata.conceptTags),
    examIds: asArray(metadata.examIds),
    projectIds: asArray(metadata.projectIds),
    topics,
    tags: asArray(metadata.tags),
    packId: pack?.id,
    packVersion: pack?.version,
    sourcePath: path.join(subjectDir, 'subject.yaml'),
  };
}

export function loadPackManifest(packDir) {
  const packPath = path.join(packDir, 'pack.yaml');
  if (!fs.existsSync(packPath)) {
    throw new Error(`pack.yaml not found: ${packPath}`);
  }
  return readYaml(packPath);
}

export function loadPackConcepts(packDir) {
  const conceptsPath = path.join(packDir, 'concepts.yaml');
  if (!fs.existsSync(conceptsPath)) return {};
  const parsed = readYaml(conceptsPath);
  return asObject(parsed?.concepts ?? parsed);
}

export function loadPackSubjects(packDir) {
  const subjectsDir = path.join(packDir, 'subjects');
  if (!fs.existsSync(subjectsDir)) return [];
  const manifest = loadPackManifest(packDir);

  return listDirectories(subjectsDir)
    .map((subjectId) => readSubject(path.join(subjectsDir, subjectId), manifest))
    .sort((a, b) => a.year - b.year || a.semester - b.semester || a.code.localeCompare(b.code, undefined, { numeric: true }));
}

export function loadPackTracks(packDir) {
  const tracksDir = path.join(packDir, 'tracks');
  if (!fs.existsSync(tracksDir)) return [];
  const manifest = loadPackManifest(packDir);
  return fs.readdirSync(tracksDir)
    .filter((name) => name.endsWith('.yaml') || name.endsWith('.yml'))
    .map((name) => ({
      ...readYaml(path.join(tracksDir, name)),
      packId: manifest.id,
      packVersion: manifest.version,
      sourcePath: path.join(tracksDir, name),
    }))
    .sort(sortById);
}

function topicIdByContentDir(subject) {
  const byDir = new Map();
  for (const topic of subject.topics) {
    byDir.set(topicDirNameFromTopic(topic), topic.id);
  }
  return byDir;
}

export function loadPackContentIndex(packDir) {
  const subjectsDir = path.join(packDir, 'subjects');
  const quizzes = [];
  const exercises = [];
  const exams = [];
  const projects = [];
  const flashcardDecks = [];

  if (!fs.existsSync(subjectsDir)) {
    return { quizzes, exercises, exams, projects, flashcardDecks };
  }

  const manifest = loadPackManifest(packDir);
  const subjects = loadPackSubjects(packDir);
  const subjectById = new Map(subjects.map((subject) => [subject.id, subject]));

  for (const subjectId of listDirectories(subjectsDir)) {
    const subjectDir = path.join(subjectsDir, subjectId);
    const subject = subjectById.get(subjectId);
    const topicIdMap = subject ? topicIdByContentDir(subject) : new Map();

    const examsPath = path.join(subjectDir, 'exams.json');
    if (fs.existsSync(examsPath)) {
      for (const exam of readJson(examsPath)) {
        exams.push(normalizeExam(exam, subjectId, manifest));
      }
    }

    const projectsPath = path.join(subjectDir, 'projects.json');
    if (fs.existsSync(projectsPath)) {
      for (const project of readJson(projectsPath)) {
        projects.push(normalizeProject(project, subjectId, manifest));
      }
    }

    const contentDir = path.join(subjectDir, 'content');
    if (!fs.existsSync(contentDir)) continue;

    for (const topicDirName of listDirectories(contentDir).filter((name) => name.startsWith('topic-'))) {
      const topicDir = path.join(contentDir, topicDirName);
      const topicId = topicIdMap.get(topicDirName) || inferTopicId(subjectId, topicDirName);

      const quizzesPath = path.join(topicDir, 'quizzes.json');
      if (fs.existsSync(quizzesPath)) {
        for (const quiz of readJson(quizzesPath)) {
          quizzes.push(normalizeQuiz(quiz, subjectId, topicId, manifest));
        }
      }

      const exercisesPath = path.join(topicDir, 'exercises.json');
      if (fs.existsSync(exercisesPath)) {
        for (const exercise of readJson(exercisesPath)) {
          exercises.push(normalizeExercise(exercise, subjectId, topicId, manifest));
        }
      }
    }
  }

  return { quizzes, exercises, exams, projects, flashcardDecks };
}

function addIssue(issues, severity, code, message, id) {
  issues.push({ severity, code, message, id });
}

function addDuplicateIssues(issues, code, label, ids) {
  const seen = new Set();
  const duplicates = new Set();
  for (const id of ids.filter(Boolean)) {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }
  for (const id of duplicates) {
    addIssue(issues, 'error', code, `Duplicate ${label} id: ${id}`, id);
  }
}

function validateQuestions(issues, owner) {
  if (!Array.isArray(owner.questions) || owner.questions.length === 0) {
    addIssue(issues, 'error', 'assessment.empty_questions', `Assessment ${owner.id} has no questions`, owner.id);
    return;
  }
  addDuplicateIssues(issues, 'question.duplicate_id', `question in ${owner.id}`, owner.questions.map((question) => question.id));

  for (const question of owner.questions) {
    if (!question.id) addIssue(issues, 'error', 'question.missing_id', `${owner.id} has a question without an id`);
    if (!question.type) addIssue(issues, 'error', 'question.missing_type', `Question ${question.id || '(missing id)'} has no type`, question.id);
    const hasWrittenModelAnswer = question.type === 'written' && Boolean(question.modelAnswer);
    if (question.correctAnswer === undefined && !hasWrittenModelAnswer) addIssue(issues, 'error', 'question.missing_correct_answer', `Question ${question.id} has no correctAnswer`, question.id);
    if (!question.explanation && !hasWrittenModelAnswer) addIssue(issues, 'error', 'question.missing_explanation', `Question ${question.id} has no explanation`, question.id);

    if (question.type === 'multiple_choice') {
      if (!Array.isArray(question.options) || question.options.length === 0) {
        addIssue(issues, 'error', 'question.missing_options', `Multiple-choice question ${question.id} has no options`, question.id);
      }
      if (
        typeof question.correctAnswer === 'number' &&
        (question.correctAnswer < 0 || question.correctAnswer >= (question.options?.length ?? 0))
      ) {
        addIssue(issues, 'error', 'question.invalid_correct_answer', `Question ${question.id} correctAnswer is outside its options`, question.id);
      }
    }

    if (question.type === 'true_false' && typeof question.correctAnswer !== 'boolean') {
      addIssue(issues, 'error', 'question.invalid_true_false_answer', `True/false question ${question.id} must use a boolean correctAnswer`, question.id);
    }
  }
}

function collectConceptTags(subjects, index) {
  return [
    ...subjects.flatMap((subject) => [
      ...asArray(subject.conceptTags),
      ...asArray(subject.conceptPrerequisites),
      ...subject.topics.flatMap((topic) => [
        ...asArray(topic.conceptTags),
        ...asArray(topic.subtopics).flatMap((subtopic) => asArray(subtopic.conceptTags)),
      ]),
    ]),
    ...index.quizzes.flatMap((quiz) => [
      ...asArray(quiz.conceptTags),
      ...asArray(quiz.questions).flatMap((question) => asArray(question.conceptTags)),
    ]),
    ...index.exercises.flatMap((exercise) => asArray(exercise.conceptTags)),
    ...index.exams.flatMap((exam) => [
      ...asArray(exam.conceptTags),
      ...asArray(exam.questions).flatMap((question) => asArray(question.conceptTags)),
    ]),
    ...index.projects.flatMap((project) => asArray(project.conceptTags)),
  ].filter(Boolean);
}

function validateAcyclicPrerequisites(issues, subjects) {
  const subjectById = new Map(subjects.map((subject) => [subject.id, subject]));
  const visiting = new Set();
  const visited = new Set();

  function visit(subjectId, chain) {
    if (visited.has(subjectId)) return;
    if (visiting.has(subjectId)) {
      addIssue(issues, 'error', 'subject.prerequisite_cycle', `Prerequisite cycle: ${[...chain, subjectId].join(' -> ')}`, subjectId);
      return;
    }
    const subject = subjectById.get(subjectId);
    if (!subject) return;
    visiting.add(subjectId);
    for (const prerequisiteId of subject.prerequisites) {
      visit(prerequisiteId, [...chain, subjectId]);
    }
    visiting.delete(subjectId);
    visited.add(subjectId);
  }

  for (const subject of subjects) {
    visit(subject.id, []);
  }
}

function validateRubricWeights(issues, project) {
  if (!Array.isArray(project.rubric) || project.rubric.length === 0) return;
  const total = project.rubric.reduce((sum, item) => sum + Number(item.weight || 0), 0);
  if (total !== 100) {
    addIssue(issues, 'warning', 'project.rubric_weight_total', `Project ${project.id} rubric weights sum to ${total}, expected 100`, project.id);
  }
}

export function validateContentPack(packDir) {
  const issues = [];
  let manifest;
  let concepts = {};
  let subjects = [];
  let tracks = [];
  let index = { quizzes: [], exercises: [], exams: [], projects: [], flashcardDecks: [] };

  try {
    manifest = loadPackManifest(packDir);
  } catch (error) {
    addIssue(issues, 'error', 'pack.missing_manifest', error instanceof Error ? error.message : String(error));
  }

  try {
    concepts = loadPackConcepts(packDir);
  } catch (error) {
    addIssue(issues, 'error', 'pack.invalid_concepts', error instanceof Error ? error.message : String(error));
  }

  try {
    subjects = loadPackSubjects(packDir);
  } catch (error) {
    addIssue(issues, 'error', 'pack.invalid_subjects', error instanceof Error ? error.message : String(error));
  }

  try {
    tracks = loadPackTracks(packDir);
  } catch (error) {
    addIssue(issues, 'error', 'pack.invalid_tracks', error instanceof Error ? error.message : String(error));
  }

  try {
    index = loadPackContentIndex(packDir);
  } catch (error) {
    addIssue(issues, 'error', 'pack.invalid_activities', error instanceof Error ? error.message : String(error));
  }

  if (manifest) {
    if (!manifest.id) addIssue(issues, 'error', 'pack.missing_id', 'pack.yaml must define id');
    if (!manifest.schemaVersion) addIssue(issues, 'error', 'pack.missing_schema_version', 'pack.yaml must define schemaVersion');
  }

  const subjectIds = subjects.map((subject) => subject.id);
  const topicIds = subjects.flatMap((subject) => subject.topics.map((topic) => topic.id));
  const quizIds = index.quizzes.map((quiz) => quiz.id);
  const exerciseIds = index.exercises.map((exercise) => exercise.id);
  const examIds = index.exams.map((exam) => exam.id);
  const projectIds = index.projects.map((project) => project.id);
  const deckIds = index.flashcardDecks.map((deck) => deck.id);
  const subjectIdSet = new Set(subjectIds);
  const quizIdSet = new Set(quizIds);
  const exerciseIdSet = new Set(exerciseIds);
  const examIdSet = new Set(examIds);
  const projectIdSet = new Set(projectIds);
  const conceptIds = new Set(Object.keys(concepts));

  addDuplicateIssues(issues, 'subject.duplicate_id', 'subject', subjectIds);
  addDuplicateIssues(issues, 'topic.duplicate_id', 'topic', topicIds);
  addDuplicateIssues(issues, 'quiz.duplicate_id', 'quiz', quizIds);
  addDuplicateIssues(issues, 'exercise.duplicate_id', 'exercise', exerciseIds);
  addDuplicateIssues(issues, 'exam.duplicate_id', 'exam', examIds);
  addDuplicateIssues(issues, 'project.duplicate_id', 'project', projectIds);
  addDuplicateIssues(issues, 'flashcard_deck.duplicate_id', 'flashcard deck', deckIds);

  for (const subject of subjects) {
    if (!subject.code || !subject.title) {
      addIssue(issues, 'error', 'subject.missing_identity', `Subject ${subject.id} must define code and title`, subject.id);
    }
    for (const prerequisiteId of subject.prerequisites) {
      if (!subjectIdSet.has(prerequisiteId)) {
        addIssue(issues, 'error', 'subject.missing_prerequisite', `Subject ${subject.id} references missing prerequisite ${prerequisiteId}`, subject.id);
      }
    }
    for (const examId of subject.examIds) {
      if (!examIdSet.has(examId)) {
        addIssue(issues, 'error', 'subject.missing_exam', `Subject ${subject.id} references missing exam ${examId}`, subject.id);
      }
    }
    for (const projectId of subject.projectIds) {
      if (!projectIdSet.has(projectId)) {
        addIssue(issues, 'error', 'subject.missing_project', `Subject ${subject.id} references missing project ${projectId}`, subject.id);
      }
    }
    for (const topic of subject.topics) {
      for (const quizId of topic.quizIds) {
        if (!quizIdSet.has(quizId)) {
          addIssue(issues, 'error', 'topic.missing_quiz', `Topic ${topic.id} references missing quiz ${quizId}`, topic.id);
        }
      }
      for (const exerciseId of topic.exerciseIds) {
        if (!exerciseIdSet.has(exerciseId)) {
          addIssue(issues, 'error', 'topic.missing_exercise', `Topic ${topic.id} references missing exercise ${exerciseId}`, topic.id);
        }
      }
    }
  }

  validateAcyclicPrerequisites(issues, subjects);

  for (const track of tracks) {
    if (!track.id || !track.title) {
      addIssue(issues, 'error', 'track.missing_identity', `Track ${track.id || '(missing id)'} must define id and title`, track.id);
    }
    for (const subjectId of asArray(track.subjects)) {
      if (!subjectIdSet.has(subjectId)) {
        addIssue(issues, 'error', 'track.missing_subject', `Track ${track.id} references missing subject ${subjectId}`, track.id);
      }
    }
  }

  if (conceptIds.size > 0) {
    for (const conceptId of collectConceptTags(subjects, index)) {
      if (!conceptIds.has(conceptId)) {
        addIssue(issues, 'error', 'concept.missing_reference', `Referenced concept does not exist: ${conceptId}`, conceptId);
      }
    }
  }

  index.quizzes.forEach((quiz) => validateQuestions(issues, quiz));
  index.exams.forEach((exam) => validateQuestions(issues, exam));
  index.projects.forEach((project) => validateRubricWeights(issues, project));

  const errors = issues.filter((issue) => issue.severity === 'error');
  const warnings = issues.filter((issue) => issue.severity === 'warning');

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    issues,
    packDir,
    packId: manifest?.id,
    generatedAt: new Date().toISOString(),
    stats: {
      subjects: subjects.length,
      topics: topicIds.length,
      quizzes: index.quizzes.length,
      exercises: index.exercises.length,
      exams: index.exams.length,
      projects: index.projects.length,
      flashcardDecks: index.flashcardDecks.length,
      tracks: tracks.length,
      concepts: Object.keys(concepts).length,
    },
  };
}

function toActivity(activity, type, mode) {
  return {
    ...activity,
    type,
    mode,
  };
}

function uniqueById(items) {
  const byId = new Map();
  for (const item of items) {
    byId.set(item.id, item);
  }
  return Array.from(byId.values()).sort(sortById);
}

export function loadResolvedContentGraph(packDirs) {
  const normalizedPackDirs = asArray(packDirs).map((packDir) => path.resolve(packDir));
  const packs = [];
  const subjects = [];
  const tracks = [];
  const quizzes = [];
  const exercises = [];
  const exams = [];
  const projects = [];
  const flashcardDecks = [];
  const concepts = {};
  const validation = [];

  for (const packDir of normalizedPackDirs) {
    const manifest = loadPackManifest(packDir);
    const pack = { ...manifest, packDir, source: 'filesystem' };
    packs.push(pack);

    for (const [conceptId, concept] of Object.entries(loadPackConcepts(packDir))) {
      concepts[conceptId] = { ...asObject(concept), id: conceptId, packId: manifest.id };
    }

    subjects.push(...loadPackSubjects(packDir));
    tracks.push(...loadPackTracks(packDir));
    const index = loadPackContentIndex(packDir);
    quizzes.push(...index.quizzes);
    exercises.push(...index.exercises);
    exams.push(...index.exams);
    projects.push(...index.projects);
    flashcardDecks.push(...index.flashcardDecks);
    validation.push(validateContentPack(packDir));
  }

  const resolvedSubjects = uniqueById(subjects).sort((a, b) =>
    a.year - b.year || a.semester - b.semester || a.code.localeCompare(b.code, undefined, { numeric: true }),
  );
  const resolvedQuizzes = uniqueById(quizzes);
  const resolvedExercises = uniqueById(exercises);
  const resolvedExams = uniqueById(exams);
  const resolvedProjects = uniqueById(projects);
  const resolvedFlashcardDecks = uniqueById(flashcardDecks);
  const activities = [
    ...resolvedQuizzes.map((quiz) => toActivity(quiz, 'assessment', 'quiz')),
    ...resolvedExams.map((exam) => toActivity(exam, 'assessment', 'exam')),
    ...resolvedExercises.map((exercise) => toActivity(exercise, 'assignment', exercise.type === 'written' ? 'written_exercise' : 'coding_exercise')),
    ...resolvedProjects.map((project) => toActivity(project, 'project', 'project')),
    ...resolvedFlashcardDecks.map((deck) => toActivity(deck, 'flashcard_deck', 'flashcard_deck')),
  ];

  return {
    generatedAt: new Date().toISOString(),
    packs,
    concepts,
    subjects: resolvedSubjects,
    topics: resolvedSubjects.flatMap((subject) => subject.topics.map((topic) => ({ ...topic, subjectId: subject.id, packId: subject.packId }))),
    tracks: uniqueById(tracks),
    quizzes: resolvedQuizzes,
    exercises: resolvedExercises,
    exams: resolvedExams,
    projects: resolvedProjects,
    flashcardDecks: resolvedFlashcardDecks,
    activities: uniqueById(activities),
    validation,
  };
}
