#!/usr/bin/env node
/**
 * Subject Quality Analysis Script
 *
 * Analyzes each subject against its subject-spec.yaml (if present) or the base
 * standard defined in SUBJECT_STANDARD.md.
 *
 * Usage:
 *   node scripts/analyze-quality.mjs          # Formatted terminal output
 *   node scripts/analyze-quality.mjs --json   # JSON output
 *   npm run quality                           # Formatted terminal output
 *   npm run quality:json                      # JSON output
 *
 * For import validation, use: npm run validate
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * BASE REQUIREMENTS (from SUBJECT_STANDARD.md)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * These are the default targets. Subjects with a subject-spec.yaml can override
 * these with justified alternatives.
 *
 * MINIMUM UNIVERSAL REQUIREMENTS (all subjects):
 *   - 7 topics with 5-7 subtopics each (~1000 words per subtopic)
 *   - 3 quizzes per topic (21 total), 5 questions each
 *   - 16 exercises per topic (112 total), difficulty 1-5
 *   - Midterm exam: ~26 questions, 75 min
 *   - Final exam: ~42 questions, 120 min
 *
 * SUBJECT-SPECIFIC REQUIREMENTS:
 *   Subjects with subject-spec.yaml can specify different targets for:
 *   - Exercises per topic (with justification)
 *   - Quiz count and questions per quiz
 *   - Exam question counts
 *   - Project requirements
 *   - Passing thresholds
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { readdir, readFile, stat } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import YAML from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base standard targets (defaults, can be overridden by subject-spec.yaml)
const BASE_TARGETS = {
  topicsPerSubject: 7,
  subtopicsPerTopic: 7, // 5-7 range
  quizzesPerTopic: 3,
  questionsPerQuiz: 5,
  exercisesPerTopic: 16,
  midtermQuestions: 26,
  finalQuestions: 42,
  wordsPerSubtopic: 1000,
  passingScore: 70,
};

// Subject categories - math subjects and cs102 are exam-only (default, can be overridden by spec)
const EXAM_ONLY_SUBJECTS = [
  'math101', 'math102', 'math201', 'math202', 'math203', 'math204',
  'math301', 'math302', 'math303', 'math304', 'math401', 'math402', 'math403', 'math404',
  'cs102'
];

// Subjects where readings are not expected
const NO_READINGS_SUBJECTS = ['cs101', 'math101', 'math102', 'math203'];

// Load and parse subject-spec.yaml if it exists
async function loadSubjectSpec(subjectId, subjectsDir) {
  const specPath = join(subjectsDir, subjectId, 'subject-spec.yaml');
  try {
    const content = await readFile(specPath, 'utf-8');
    return YAML.parse(content);
  } catch {
    return null; // No spec file
  }
}

// Build effective targets by merging spec with base targets
function buildEffectiveTargets(spec) {
  if (!spec) {
    return { ...BASE_TARGETS };
  }

  const targets = { ...BASE_TARGETS };

  // Override from spec.curriculum
  if (spec.curriculum?.subtopic_word_target) {
    targets.wordsPerSubtopic = spec.curriculum.subtopic_word_target;
  }

  // Override from spec.exercises
  if (spec.exercises?.per_topic?.target) {
    targets.exercisesPerTopic = spec.exercises.per_topic.target;
  } else if (spec.exercises?.per_topic?.minimum) {
    targets.exercisesPerTopic = spec.exercises.per_topic.minimum;
  }

  // Override from spec.quizzes
  if (spec.quizzes?.per_topic?.count) {
    targets.quizzesPerTopic = spec.quizzes.per_topic.count;
  }
  if (spec.quizzes?.per_topic?.questions_each) {
    targets.questionsPerQuiz = spec.quizzes.per_topic.questions_each;
  }

  // Override from spec.exams
  if (spec.exams?.midterm?.questions?.target) {
    targets.midtermQuestions = spec.exams.midterm.questions.target;
  } else if (spec.exams?.midterm?.questions?.minimum) {
    targets.midtermQuestions = spec.exams.midterm.questions.minimum;
  }
  if (spec.exams?.final?.questions?.target) {
    targets.finalQuestions = spec.exams.final.questions.target;
  } else if (spec.exams?.final?.questions?.minimum) {
    targets.finalQuestions = spec.exams.final.questions.minimum;
  }

  // Override passing score
  if (spec.grading?.passing_score) {
    targets.passingScore = spec.grading.passing_score;
  }

  return targets;
}

// Determine if projects are required for this subject
function projectsRequired(subjectId, spec) {
  // Check spec first
  if (spec?.projects?.required !== undefined) {
    return spec.projects.required;
  }
  // Fall back to default list
  return !EXAM_ONLY_SUBJECTS.includes(subjectId);
}

// Get expected project count
function expectedProjectCount(spec) {
  if (spec?.projects?.count !== undefined) {
    return spec.projects.count;
  }
  return 1; // Default expectation
}

// Count words in markdown content
function countWords(content) {
  if (!content || typeof content !== 'string') return 0;
  // Remove markdown syntax
  let text = content.replace(/[#*_\[\]()>`-]/g, ' ');
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, ' ');
  // Count words
  const words = text.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

// Read JSON file safely
async function readJson(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

// Load subject data from JSON files and markdown
async function loadSubjectData(subjectId, subjectsDir) {
  const base = join(subjectsDir, subjectId);
  const contentDir = join(base, 'content');

  // Read subject-level JSON files and spec in parallel
  const [exams, projects, spec] = await Promise.all([
    readJson(join(base, 'exams.json')),
    readJson(join(base, 'projects.json')),
    loadSubjectSpec(subjectId, subjectsDir),
  ]);

  // Find topic directories
  let topicDirs = [];
  try {
    topicDirs = await glob('topic-*/', { cwd: contentDir });
  } catch {
    // No content directory
  }

  // Aggregate exercises and quizzes from all topics
  let allExercises = [];
  let allQuizzes = [];

  // Load topics from markdown files
  const topics = await Promise.all(
    topicDirs.sort().map(async (topicDir) => {
      const topicPath = join(contentDir, topicDir);
      const topicNum = parseInt(topicDir.replace('topic-', ''), 10);
      const topicId = `${subjectId}-topic-${topicNum}`;

      // Load per-topic exercises and quizzes
      const [topicExercises, topicQuizzes] = await Promise.all([
        readJson(join(topicPath, 'exercises.json')),
        readJson(join(topicPath, 'quizzes.json')),
      ]);

      // Add to aggregated arrays
      allExercises = allExercises.concat(topicExercises);
      allQuizzes = allQuizzes.concat(topicQuizzes);

      // Find markdown files (subtopics)
      let mdFiles = [];
      try {
        mdFiles = await glob('*.md', { cwd: topicPath });
      } catch {
        // No markdown files
      }

      // Read subtopics
      const subtopics = await Promise.all(
        mdFiles.sort().map(async (mdFile) => {
          const content = await readFile(join(topicPath, mdFile), 'utf-8');
          // Extract title from frontmatter or first heading
          let title = basename(mdFile, '.md');
          const titleMatch = content.match(/^#\s+(.+)$/m) || content.match(/title:\s*["']?(.+?)["']?\s*$/m);
          if (titleMatch) title = titleMatch[1];

          return {
            id: basename(mdFile, '.md'),
            title,
            wordCount: countWords(content),
          };
        })
      );

      // Extract topic title from first subtopic or use generic
      let topicTitle = `Topic ${topicNum}`;
      if (subtopics.length > 0) {
        // Try to get from intro file
        const intro = subtopics.find(s => s.id.includes('intro') || s.id.startsWith('01'));
        if (intro) {
          // Use the topic number's content directory name or extract from content
          topicTitle = intro.title.replace(/^[\d\-.\s]+/, '').trim() || topicTitle;
        }
      }

      return {
        id: topicId,
        number: topicNum,
        title: topicTitle,
        subtopics,
        subtopicCount: subtopics.length,
        totalWords: subtopics.reduce((sum, s) => sum + s.wordCount, 0),
      };
    })
  );

  // Also check for legacy subject-level files (fallback)
  if (allExercises.length === 0) {
    const legacyExercises = await readJson(join(base, 'exercises.json'));
    allExercises = legacyExercises;
  }
  if (allQuizzes.length === 0) {
    const legacyQuizzes = await readJson(join(base, 'quizzes.json'));
    allQuizzes = legacyQuizzes;
  }

  return { topics, quizzes: allQuizzes, exercises: allExercises, exams, projects, spec };
}

// Analyze exercises in detail
function analyzeExercises(exercises) {
  const analysis = {
    total: exercises.length,
    coding: 0,
    written: 0,
    codingWithTests: 0,
    codingAiEval: 0,
    languages: {},
    difficulties: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    totalTestCases: 0,
    hiddenTestCases: 0,
  };

  for (const ex of exercises) {
    // Determine type
    const isWritten = ex.type === 'written' || (!ex.language && !ex.starterCode);

    if (isWritten) {
      analysis.written++;
    } else {
      analysis.coding++;

      // Check for test cases
      const hasTests = ex.testCases && ex.testCases.length > 0;
      if (hasTests) {
        analysis.codingWithTests++;
        analysis.totalTestCases += ex.testCases.length;
        analysis.hiddenTestCases += ex.testCases.filter(t => t.isHidden).length;
      } else if (ex.solution) {
        analysis.codingAiEval++;
      }

      // Language breakdown
      const lang = ex.language || 'unknown';
      analysis.languages[lang] = (analysis.languages[lang] || 0) + 1;
    }

    // Difficulty distribution
    const diff = ex.difficulty || 3;
    if (diff >= 1 && diff <= 5) {
      analysis.difficulties[diff]++;
    }
  }

  return analysis;
}

// Analyze quizzes in detail
function analyzeQuizzes(quizzes) {
  const analysis = {
    total: quizzes.length,
    totalQuestions: 0,
    questionTypes: {},
    withExplanations: 0,
    withCodeSnippets: 0,
  };

  for (const quiz of quizzes) {
    const questions = quiz.questions || [];
    analysis.totalQuestions += questions.length;

    for (const q of questions) {
      // Question type
      const type = q.type || 'unknown';
      analysis.questionTypes[type] = (analysis.questionTypes[type] || 0) + 1;

      // Has explanation
      if (q.explanation) analysis.withExplanations++;

      // Has code snippet
      if (q.codeSnippet) analysis.withCodeSnippets++;
    }
  }

  return analysis;
}

// Analyze exams in detail
function analyzeExams(exams) {
  const analysis = {
    total: exams.length,
    hasMidterm: false,
    hasFinal: false,
    midtermQuestions: 0,
    finalQuestions: 0,
    midtermDuration: 0,
    finalDuration: 0,
    questionTypes: {},
    totalQuestions: 0,
  };

  for (const exam of exams) {
    const questions = exam.questions || [];
    const qCount = questions.length;
    analysis.totalQuestions += qCount;

    if (exam.id?.includes('midterm')) {
      analysis.hasMidterm = true;
      analysis.midtermQuestions = qCount;
      analysis.midtermDuration = exam.durationMinutes || 0;
    }
    if (exam.id?.includes('final')) {
      analysis.hasFinal = true;
      analysis.finalQuestions = qCount;
      analysis.finalDuration = exam.durationMinutes || 0;
    }

    for (const q of questions) {
      const type = q.type || 'unknown';
      analysis.questionTypes[type] = (analysis.questionTypes[type] || 0) + 1;
    }
  }

  return analysis;
}

// Analyze projects in detail
function analyzeProjects(projects) {
  const analysis = {
    total: projects.length,
    totalRequirements: 0,
    avgRequirements: 0,
    withRubrics: 0,
    rubricCategories: {},
  };

  for (const proj of projects) {
    const reqs = proj.requirements || [];
    analysis.totalRequirements += reqs.length;

    if (proj.rubric && proj.rubric.length > 0) {
      analysis.withRubrics++;
      for (const r of proj.rubric) {
        const cat = r.name || 'Other';
        analysis.rubricCategories[cat] = (analysis.rubricCategories[cat] || 0) + 1;
      }
    }
  }

  analysis.avgRequirements = projects.length > 0
    ? Math.round(analysis.totalRequirements / projects.length)
    : 0;

  return analysis;
}

// Analyze content (markdown) in detail
function analyzeContent(topics) {
  const analysis = {
    totalWords: 0,
    totalCodeBlocks: 0,
    avgWordsPerSubtopic: 0,
    totalSubtopics: 0,
  };

  for (const topic of topics) {
    for (const sub of topic.subtopics || []) {
      analysis.totalSubtopics++;
      analysis.totalWords += sub.wordCount || 0;
      // Count code blocks (```...```)
      const content = sub.content || '';
      const codeBlocks = (content.match(/```/g) || []).length / 2;
      analysis.totalCodeBlocks += Math.floor(codeBlocks);
    }
  }

  analysis.avgWordsPerSubtopic = analysis.totalSubtopics > 0
    ? Math.round(analysis.totalWords / analysis.totalSubtopics)
    : 0;

  return analysis;
}

// Analyze a single subject
function analyzeSubject(subjectId, data) {
  const { topics, quizzes, exercises, exams, projects, spec } = data;

  // Build effective targets from spec or use base
  const targets = buildEffectiveTargets(spec);

  // Build topic quality data
  const topicData = topics.map((topic) => {
    // Count quizzes for this topic
    const topicQuizzes = quizzes.filter(q => q.topicId === topic.id);
    // Count exercises for this topic
    const topicExercises = exercises.filter(e => e.topicId === topic.id);

    return {
      ...topic,
      quizCount: topicQuizzes.length,
      quizQuestions: topicQuizzes.reduce((sum, q) => sum + (q.questions?.length || 0), 0),
      exerciseCount: topicExercises.length,
    };
  });

  const totalSubtopics = topicData.reduce((sum, t) => sum + t.subtopicCount, 0);
  const totalContentWords = topicData.reduce((sum, t) => sum + t.totalWords, 0);

  // Exam analysis
  const midterm = exams.find(e => e.id?.includes('midterm'));
  const final = exams.find(e => e.id?.includes('final'));

  const projectsNeeded = projectsRequired(subjectId, spec);
  const expectedProjects = expectedProjectCount(spec);
  const readingsApplicable = !NO_READINGS_SUBJECTS.includes(subjectId);

  // Detailed breakdowns
  const exerciseAnalysis = analyzeExercises(exercises);
  const quizAnalysis = analyzeQuizzes(quizzes);
  const examAnalysis = analyzeExams(exams);
  const projectAnalysis = analyzeProjects(projects);

  const quality = {
    id: subjectId,
    hasSpec: spec !== null,
    specTitle: spec?.title || null,
    targets, // Include effective targets for this subject
    topics: topicData,
    totalTopics: topics.length,
    totalSubtopics,
    avgSubtopicsPerTopic: topics.length > 0 ? totalSubtopics / topics.length : 0,
    totalQuizzes: quizzes.length,
    totalQuizQuestions: quizzes.reduce((sum, q) => sum + (q.questions?.length || 0), 0),
    avgQuizzesPerTopic: topics.length > 0 ? quizzes.length / topics.length : 0,
    totalExercises: exercises.length,
    avgExercisesPerTopic: topics.length > 0 ? exercises.length / topics.length : 0,
    exerciseBreakdown: exerciseAnalysis,
    quizBreakdown: quizAnalysis,
    examBreakdown: examAnalysis,
    projectBreakdown: projectAnalysis,
    hasMidterm: examAnalysis.hasMidterm,
    hasFinal: examAnalysis.hasFinal,
    midtermQuestions: examAnalysis.midtermQuestions,
    finalQuestions: examAnalysis.finalQuestions,
    projectCount: projects.length,
    projectsNeeded,
    expectedProjects,
    totalContentWords,
    avgWordsPerSubtopic: totalSubtopics > 0 ? totalContentWords / totalSubtopics : 0,
    overallScore: 0,
    readingsApplicable,
  };

  quality.overallScore = calculateScore(quality, targets);

  return quality;
}

// Calculate overall quality score (0-100)
function calculateScore(quality, targets) {
  let score = 0;
  const weights = {
    topics: 10,
    subtopics: 15,
    quizzes: 15,
    exercises: 20,
    exams: 20,
    projects: 10,
    wordCount: 10,
  };

  // Topics score (target: 7)
  score += (Math.min(quality.totalTopics, targets.topicsPerSubject) / targets.topicsPerSubject) * weights.topics;

  // Subtopics score (target: 7 per topic)
  const subtopicTarget = quality.totalTopics * targets.subtopicsPerTopic;
  score += (Math.min(quality.totalSubtopics, subtopicTarget) / Math.max(subtopicTarget, 1)) * weights.subtopics;

  // Quizzes score (target: per spec or base)
  const quizTarget = quality.totalTopics * targets.quizzesPerTopic;
  score += (Math.min(quality.totalQuizzes, quizTarget) / Math.max(quizTarget, 1)) * weights.quizzes;

  // Exercises score (target: per spec or base)
  const exerciseTarget = quality.totalTopics * targets.exercisesPerTopic;
  score += (Math.min(quality.totalExercises, exerciseTarget) / Math.max(exerciseTarget, 1)) * weights.exercises;

  // Exams score
  let examScore = 0;
  if (quality.hasMidterm) examScore += 0.3;
  if (quality.hasFinal) examScore += 0.3;
  if (quality.midtermQuestions >= targets.midtermQuestions) examScore += 0.2;
  if (quality.finalQuestions >= targets.finalQuestions) examScore += 0.2;
  score += examScore * weights.exams;

  // Projects score (only if needed)
  if (quality.projectsNeeded) {
    const projectRatio = Math.min(quality.projectCount / quality.expectedProjects, 1);
    score += projectRatio * weights.projects;
  } else {
    score += weights.projects; // Full score if projects not needed
  }

  // Word count score (target: 1000 words per subtopic)
  if (quality.totalSubtopics > 0) {
    const wordRatio = Math.min(quality.avgWordsPerSubtopic / targets.wordsPerSubtopic, 1);
    score += wordRatio * weights.wordCount;
  }

  return Math.round(score);
}

// Compute gaps for a subject (uses the subject's effective targets)
function computeGaps(quality) {
  const gaps = [];
  const targets = quality.targets;

  // Check for missing spec (required)
  if (!quality.hasSpec) {
    gaps.push({ type: 'spec', message: 'Missing subject-spec.yaml (required)' });
  }

  if (quality.totalTopics < targets.topicsPerSubject) {
    gaps.push({ type: 'topics', message: `Need ${targets.topicsPerSubject - quality.totalTopics} more topics` });
  }
  if (quality.avgSubtopicsPerTopic < 5) {
    gaps.push({ type: 'subtopics', message: `Subtopics needed (avg ${quality.avgSubtopicsPerTopic.toFixed(1)}, need 5-7)` });
  }
  if (quality.avgQuizzesPerTopic < targets.quizzesPerTopic) {
    gaps.push({ type: 'quizzes', message: `Quizzes needed (${quality.totalQuizzes}/${quality.totalTopics * targets.quizzesPerTopic})` });
  }
  if (quality.avgExercisesPerTopic < targets.exercisesPerTopic) {
    gaps.push({ type: 'exercises', message: `Exercises needed (${quality.totalExercises}/${quality.totalTopics * targets.exercisesPerTopic})` });
  }
  if (!quality.hasMidterm) {
    gaps.push({ type: 'exam', message: 'Midterm exam missing' });
  }
  if (!quality.hasFinal) {
    gaps.push({ type: 'exam', message: 'Final exam missing' });
  }
  if (quality.hasMidterm && quality.midtermQuestions < targets.midtermQuestions) {
    gaps.push({ type: 'exam', message: `Midterm needs ${targets.midtermQuestions - quality.midtermQuestions} more questions` });
  }
  if (quality.hasFinal && quality.finalQuestions < targets.finalQuestions) {
    gaps.push({ type: 'exam', message: `Final needs ${targets.finalQuestions - quality.finalQuestions} more questions` });
  }
  if (quality.projectsNeeded && quality.projectCount < quality.expectedProjects) {
    gaps.push({ type: 'projects', message: `Projects needed (${quality.projectCount}/${quality.expectedProjects})` });
  }
  if (quality.avgWordsPerSubtopic < targets.wordsPerSubtopic * 0.7) {
    gaps.push({ type: 'content', message: `Content too thin (avg ${Math.round(quality.avgWordsPerSubtopic)} words/subtopic)` });
  }

  return gaps;
}

// Format a progress bar
function progressBar(current, target, width = 20) {
  const ratio = Math.min(current / target, 1);
  const filled = Math.round(ratio * width);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  const pct = Math.round(ratio * 100);
  return `${bar} ${pct}%`;
}

// Print requirements summary
function printRequirements() {
  console.log(`${'═'.repeat(90)}`);
  console.log('  REQUIREMENTS (from SUBJECT_STANDARD.md + subject-spec.yaml)');
  console.log(`${'═'.repeat(90)}`);

  console.log('\n  BASE REQUIREMENTS (default, can be overridden by subject-spec.yaml):');
  console.log(`     - 7 topics with 5-7 subtopics each (~${BASE_TARGETS.wordsPerSubtopic} words per subtopic)`);
  console.log(`     - ${BASE_TARGETS.quizzesPerTopic} quizzes per topic (21 total), 5 questions each`);
  console.log(`     - ${BASE_TARGETS.exercisesPerTopic} exercises per topic (112 total), difficulty 1-5`);
  console.log(`     - Midterm exam: ~${BASE_TARGETS.midtermQuestions} questions`);
  console.log(`     - Final exam: ~${BASE_TARGETS.finalQuestions} questions`);

  console.log('\n  SUBJECT SPECS:');
  console.log('     Subjects with subject-spec.yaml can override exercise/quiz/exam counts');
  console.log('     with justified alternatives appropriate to their pedagogy.');

  console.log('\n  DEFAULT PROJECT REQUIREMENTS:');
  console.log('     Math subjects, CS102: No projects (exam-only)');
  console.log('     Other CS subjects: 1+ project');
  console.log('');
}

// Print report for a single subject
function printSubjectReport(quality) {
  const { id, hasSpec, specTitle, targets, topics, totalTopics, totalSubtopics, avgSubtopicsPerTopic,
    totalQuizzes, totalQuizQuestions, avgQuizzesPerTopic,
    totalExercises, avgExercisesPerTopic,
    exerciseBreakdown, quizBreakdown, examBreakdown, projectBreakdown,
    hasMidterm, hasFinal, midtermQuestions, finalQuestions,
    projectCount, projectsNeeded, expectedProjects,
    totalContentWords, avgWordsPerSubtopic,
    overallScore } = quality;

  const scoreColor = overallScore >= 80 ? '\x1b[32m' : overallScore >= 50 ? '\x1b[33m' : '\x1b[31m';
  const reset = '\x1b[0m';
  const specIndicator = hasSpec ? '\x1b[36m[SPEC]\x1b[0m' : '\x1b[90m[BASE]\x1b[0m';

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  ${id.toUpperCase()}  ${scoreColor}[Score: ${overallScore}/100]${reset}  ${specIndicator}`);
  console.log(`${'═'.repeat(70)}`);

  // Show spec info if present
  if (hasSpec) {
    console.log(`\n  SPEC: ${specTitle || id}`);
    const diffs = [];
    if (targets.wordsPerSubtopic !== BASE_TARGETS.wordsPerSubtopic) {
      diffs.push(`words: ${targets.wordsPerSubtopic}/subtopic`);
    }
    if (targets.exercisesPerTopic !== BASE_TARGETS.exercisesPerTopic) {
      diffs.push(`exercises: ${targets.exercisesPerTopic}/topic`);
    }
    if (targets.quizzesPerTopic !== BASE_TARGETS.quizzesPerTopic) {
      diffs.push(`quizzes: ${targets.quizzesPerTopic}/topic`);
    }
    if (targets.midtermQuestions !== BASE_TARGETS.midtermQuestions) {
      diffs.push(`midterm: ${targets.midtermQuestions}q`);
    }
    if (targets.finalQuestions !== BASE_TARGETS.finalQuestions) {
      diffs.push(`final: ${targets.finalQuestions}q`);
    }
    if (diffs.length > 0) {
      console.log(`     Overrides: ${diffs.join(', ')}`);
    }
  }

  // Topics & Subtopics
  console.log(`\n  TOPICS & SUBTOPICS`);
  console.log(`     Topics:    ${totalTopics}/${targets.topicsPerSubject}  ${progressBar(totalTopics, targets.topicsPerSubject, 15)}`);
  console.log(`     Subtopics: ${totalSubtopics}/${totalTopics * targets.subtopicsPerTopic}  ${progressBar(totalSubtopics, totalTopics * targets.subtopicsPerTopic, 15)}`);
  console.log(`     Avg/Topic: ${avgSubtopicsPerTopic.toFixed(1)}/${targets.subtopicsPerTopic}`);

  // Word counts per topic
  console.log(`\n  CONTENT (target: ~${targets.wordsPerSubtopic} words/subtopic)`);
  console.log(`     Total: ${totalContentWords.toLocaleString()} words | Avg/subtopic: ${Math.round(avgWordsPerSubtopic)}`);

  for (const topic of topics) {
    if (topic.subtopicCount > 0) {
      const avgWords = topic.totalWords / topic.subtopicCount;
      const status = avgWords >= targets.wordsPerSubtopic * 0.8 ? '[ok]' : avgWords >= targets.wordsPerSubtopic * 0.5 ? '[~]' : '[X]';
      console.log(`     T${topic.number}: ${topic.totalWords.toLocaleString().padStart(6)} words (${topic.subtopicCount} subtopics, avg ${Math.round(avgWords).toString().padStart(4)}) ${status}`);
    } else {
      console.log(`     T${topic.number}: No subtopics`);
    }
  }

  // Quizzes
  console.log(`\n  QUIZZES (target: ${targets.quizzesPerTopic}/topic, ${targets.questionsPerQuiz} questions each)`);
  console.log(`     Total:     ${totalQuizzes}/${totalTopics * targets.quizzesPerTopic}  ${progressBar(totalQuizzes, totalTopics * targets.quizzesPerTopic, 15)}`);
  console.log(`     Questions: ${totalQuizQuestions}/${totalTopics * targets.quizzesPerTopic * targets.questionsPerQuiz}`);
  console.log(`     Avg/Topic: ${avgQuizzesPerTopic.toFixed(1)}/${targets.quizzesPerTopic}`);

  // Quiz breakdown
  if (quizBreakdown && totalQuizQuestions > 0) {
    const qb = quizBreakdown;
    const types = Object.entries(qb.questionTypes).sort((a, b) => b[1] - a[1]);
    if (types.length > 0) {
      const typeStr = types.map(([t, c]) => `${t}: ${c}`).join('  |  ');
      console.log(`     Q Types:   ${typeStr}`);
    }
    const explPct = Math.round((qb.withExplanations / qb.totalQuestions) * 100);
    console.log(`     With explanations: ${qb.withExplanations}/${qb.totalQuestions} (${explPct}%)`);
    if (qb.withCodeSnippets > 0) {
      console.log(`     With code snippets: ${qb.withCodeSnippets}`);
    }
  }

  // Exercises
  console.log(`\n  EXERCISES (target: ${targets.exercisesPerTopic}/topic)`);
  console.log(`     Total:     ${totalExercises}/${totalTopics * targets.exercisesPerTopic}  ${progressBar(totalExercises, totalTopics * targets.exercisesPerTopic, 15)}`);
  console.log(`     Avg/Topic: ${avgExercisesPerTopic.toFixed(1)}/${targets.exercisesPerTopic}`);

  // Exercise breakdown
  if (exerciseBreakdown && totalExercises > 0) {
    const eb = exerciseBreakdown;
    console.log(`\n  EXERCISE BREAKDOWN`);
    console.log(`     Type:       Coding: ${eb.coding}  |  Written: ${eb.written}`);
    if (eb.coding > 0) {
      console.log(`     Evaluation: With tests: ${eb.codingWithTests}  |  AI eval: ${eb.codingAiEval}`);
      if (eb.totalTestCases > 0) {
        const visibleTests = eb.totalTestCases - eb.hiddenTestCases;
        console.log(`     Test cases: ${eb.totalTestCases} total (${visibleTests} visible, ${eb.hiddenTestCases} hidden)`);
      }
      // Language breakdown
      const langs = Object.entries(eb.languages).sort((a, b) => b[1] - a[1]);
      if (langs.length > 0) {
        const langStr = langs.map(([l, c]) => `${l}: ${c}`).join('  |  ');
        console.log(`     Languages:  ${langStr}`);
      }
    }
    // Difficulty distribution
    const diffStr = Object.entries(eb.difficulties)
      .filter(([, c]) => c > 0)
      .map(([d, c]) => `D${d}: ${c}`)
      .join('  ');
    if (diffStr) {
      console.log(`     Difficulty: ${diffStr}`);
    }
  }

  // Per-topic breakdown
  console.log(`\n  PER-TOPIC BREAKDOWN`);
  for (const topic of topics) {
    const quizStatus = topic.quizCount >= targets.quizzesPerTopic ? '+' : topic.quizCount > 0 ? '~' : '-';
    const exStatus = topic.exerciseCount >= targets.exercisesPerTopic ? '+' : topic.exerciseCount >= 8 ? '~' : '-';
    const subStatus = topic.subtopicCount >= 5 ? '+' : topic.subtopicCount > 0 ? '~' : '-';
    console.log(`     T${topic.number}: Q:${String(topic.quizCount).padStart(2)}${quizStatus} E:${String(topic.exerciseCount).padStart(3)}${exStatus} S:${topic.subtopicCount}${subStatus}  ${topic.title.substring(0, 35)}`);
  }

  // Exams
  console.log(`\n  EXAMS (target: midterm ~${targets.midtermQuestions}q, final ~${targets.finalQuestions}q)`);
  console.log(`     Midterm: ${hasMidterm ? `[ok] ${midtermQuestions} questions` : '[X] Missing'}`);
  console.log(`     Final:   ${hasFinal ? `[ok] ${finalQuestions} questions` : '[X] Missing'}`);

  // Exam breakdown
  if (examBreakdown && (hasMidterm || hasFinal)) {
    const eb = examBreakdown;
    if (eb.midtermDuration > 0 || eb.finalDuration > 0) {
      const durStr = [];
      if (eb.midtermDuration > 0) durStr.push(`Midterm: ${eb.midtermDuration}min`);
      if (eb.finalDuration > 0) durStr.push(`Final: ${eb.finalDuration}min`);
      console.log(`     Duration: ${durStr.join('  |  ')}`);
    }
    const types = Object.entries(eb.questionTypes).sort((a, b) => b[1] - a[1]);
    if (types.length > 0) {
      const typeStr = types.map(([t, c]) => `${t}: ${c}`).join('  |  ');
      console.log(`     Q Types:  ${typeStr}`);
    }
  }

  // Projects
  console.log(`\n  PROJECTS`);
  if (projectsNeeded) {
    const projStatus = projectCount >= expectedProjects ? '[ok]' : projectCount > 0 ? '[~]' : '[X]';
    console.log(`     Count: ${projectCount}/${expectedProjects} ${projStatus}`);
    // Project breakdown
    if (projectBreakdown && projectCount > 0) {
      const pb = projectBreakdown;
      console.log(`     Requirements: ${pb.totalRequirements} total (avg ${pb.avgRequirements} per project)`);
      if (pb.withRubrics > 0) {
        console.log(`     With rubrics: ${pb.withRubrics}/${pb.total}`);
      }
    }
  } else {
    console.log(`     N/A (${hasSpec ? 'per spec' : 'exam-only subject'})`);
  }

  // Gaps summary
  console.log(`\n  GAPS`);
  const gaps = computeGaps(quality);

  if (gaps.length === 0) {
    console.log('     None - meets gold standard!');
  } else {
    gaps.forEach(g => console.log(`     - ${g.message}`));
  }
}

// Print summary table
function printSummaryTable(subjects) {
  console.log(`\n${'═'.repeat(95)}`);
  console.log('  SUBJECT QUALITY SUMMARY');
  console.log(`${'═'.repeat(95)}`);

  console.log('\n  Subject   Spec  Score  Topics  Subtopics  Quizzes  Exercises  Exams  Projects  Words/Sub');
  console.log('  ' + '─'.repeat(91));

  // Sort by score descending
  const sorted = [...subjects].sort((a, b) => b.overallScore - a.overallScore);

  for (const s of sorted) {
    const scoreColor = s.overallScore >= 80 ? '\x1b[32m' : s.overallScore >= 50 ? '\x1b[33m' : '\x1b[31m';
    const reset = '\x1b[0m';
    const specStr = s.hasSpec ? '\x1b[36m✓\x1b[0m' : '\x1b[90m-\x1b[0m';
    const examStr = `${s.hasMidterm ? 'M' : '-'}${s.hasFinal ? 'F' : '-'}`;
    const projStr = s.projectsNeeded ? `${s.projectCount}/${s.expectedProjects}` : 'N/A';
    const t = s.targets; // Use subject-specific targets

    console.log(
      `  ${s.id.padEnd(9)}  ${specStr}   ${scoreColor}${String(s.overallScore).padStart(3)}${reset}%` +
      `   ${String(s.totalTopics).padStart(2)}/${t.topicsPerSubject}` +
      `      ${String(s.totalSubtopics).padStart(2)}/${s.totalTopics * t.subtopicsPerTopic}` +
      `      ${String(s.totalQuizzes).padStart(2)}/${s.totalTopics * t.quizzesPerTopic}` +
      `       ${String(s.totalExercises).padStart(3)}/${s.totalTopics * t.exercisesPerTopic}` +
      `     ${examStr.padStart(4)}` +
      `      ${projStr.padStart(3)}` +
      `      ${String(Math.round(s.avgWordsPerSubtopic)).padStart(5)}`
    );
  }

  console.log('  ' + '─'.repeat(91));

  // Spec summary
  const withSpec = subjects.filter(s => s.hasSpec);
  const withoutSpec = subjects.filter(s => !s.hasSpec);
  console.log(`\n  SUBJECT SPECS`);
  console.log(`     With spec: ${withSpec.length}/${subjects.length}`);
  if (withSpec.length > 0) {
    console.log(`       ${withSpec.map(s => s.id).join(', ')}`);
  }
  if (withoutSpec.length > 0 && withoutSpec.length <= 10) {
    console.log(`     Missing spec: ${withoutSpec.map(s => s.id).join(', ')}`);
  }

  // Overall stats
  const avgScore = Math.round(subjects.reduce((sum, s) => sum + s.overallScore, 0) / subjects.length);
  const totalTopics = subjects.reduce((sum, s) => sum + s.totalTopics, 0);
  const totalSubtopics = subjects.reduce((sum, s) => sum + s.totalSubtopics, 0);
  const totalQuizzes = subjects.reduce((sum, s) => sum + s.totalQuizzes, 0);
  const totalExercises = subjects.reduce((sum, s) => sum + s.totalExercises, 0);
  const totalWords = subjects.reduce((sum, s) => sum + s.totalContentWords, 0);

  // Aggregate exercise breakdown
  const totalCoding = subjects.reduce((sum, s) => sum + (s.exerciseBreakdown?.coding || 0), 0);
  const totalWritten = subjects.reduce((sum, s) => sum + (s.exerciseBreakdown?.written || 0), 0);
  const totalWithTests = subjects.reduce((sum, s) => sum + (s.exerciseBreakdown?.codingWithTests || 0), 0);
  const totalAiEval = subjects.reduce((sum, s) => sum + (s.exerciseBreakdown?.codingAiEval || 0), 0);
  const totalTestCases = subjects.reduce((sum, s) => sum + (s.exerciseBreakdown?.totalTestCases || 0), 0);

  console.log(`\n  TOTALS`);
  console.log(`     Average Score: ${avgScore}%`);
  console.log(`     Topics: ${totalTopics}  |  Subtopics: ${totalSubtopics}  |  Quizzes: ${totalQuizzes}  |  Exercises: ${totalExercises}`);
  console.log(`     Content: ${totalWords.toLocaleString()} words`);
  console.log(`\n  EXERCISE BREAKDOWN (all subjects)`);
  console.log(`     Coding: ${totalCoding}  |  Written: ${totalWritten}`);
  console.log(`     Coding with tests: ${totalWithTests}  |  AI evaluation: ${totalAiEval}  |  Test cases: ${totalTestCases}`);

  // Aggregate quiz breakdown
  const quizQuestionTypes = {};
  let quizWithExplanations = 0;
  let totalQuizQuestions = 0;
  for (const s of subjects) {
    if (s.quizBreakdown) {
      totalQuizQuestions += s.quizBreakdown.totalQuestions;
      quizWithExplanations += s.quizBreakdown.withExplanations;
      for (const [type, count] of Object.entries(s.quizBreakdown.questionTypes)) {
        quizQuestionTypes[type] = (quizQuestionTypes[type] || 0) + count;
      }
    }
  }
  const quizTypeStr = Object.entries(quizQuestionTypes)
    .sort((a, b) => b[1] - a[1])
    .map(([t, c]) => `${t}: ${c}`)
    .join('  |  ');
  console.log(`\n  QUIZ BREAKDOWN (all subjects)`);
  console.log(`     Questions: ${totalQuizQuestions}  |  With explanations: ${quizWithExplanations}`);
  if (quizTypeStr) {
    console.log(`     Types: ${quizTypeStr}`);
  }

  // Aggregate exam breakdown
  const examQuestionTypes = {};
  let totalExamQuestions = 0;
  for (const s of subjects) {
    if (s.examBreakdown) {
      totalExamQuestions += s.examBreakdown.totalQuestions;
      for (const [type, count] of Object.entries(s.examBreakdown.questionTypes)) {
        examQuestionTypes[type] = (examQuestionTypes[type] || 0) + count;
      }
    }
  }
  const examTypeStr = Object.entries(examQuestionTypes)
    .sort((a, b) => b[1] - a[1])
    .map(([t, c]) => `${t}: ${c}`)
    .join('  |  ');
  console.log(`\n  EXAM BREAKDOWN (all subjects)`);
  console.log(`     Questions: ${totalExamQuestions}`);
  if (examTypeStr) {
    console.log(`     Types: ${examTypeStr}`);
  }

  // Subjects meeting standard
  const meetingStandard = subjects.filter(s => s.overallScore >= 80);
  console.log(`\n  Subjects meeting gold standard (>=80%): ${meetingStandard.length}/${subjects.length}`);
  if (meetingStandard.length > 0) {
    console.log(`     ${meetingStandard.map(s => s.id).join(', ')}`);
  }
}

// Build JSON output structure
function buildJsonOutput(subjects) {
  const sortedSubjects = [...subjects].sort((a, b) => a.id.localeCompare(b.id));

  // Each subject already has its own targets (from spec or base)
  const subjectsWithGaps = sortedSubjects.map(s => ({
    ...s,
    gaps: computeGaps(s),
    // targets is already included in the subject from analyzeSubject
  }));

  const subjectsWithSpec = subjects.filter(s => s.hasSpec);
  const subjectsWithoutSpec = subjects.filter(s => !s.hasSpec);

  const summary = {
    generatedAt: new Date().toISOString(),
    averageScore: Math.round(subjects.reduce((sum, s) => sum + s.overallScore, 0) / subjects.length),
    totalSubjects: subjects.length,
    subjectsWithSpec: subjectsWithSpec.map(s => s.id),
    subjectsWithoutSpec: subjectsWithoutSpec.map(s => s.id),
    totalTopics: subjects.reduce((sum, s) => sum + s.totalTopics, 0),
    totalSubtopics: subjects.reduce((sum, s) => sum + s.totalSubtopics, 0),
    totalQuizzes: subjects.reduce((sum, s) => sum + s.totalQuizzes, 0),
    totalExercises: subjects.reduce((sum, s) => sum + s.totalExercises, 0),
    totalContentWords: subjects.reduce((sum, s) => sum + s.totalContentWords, 0),
    subjectsMeetingStandard: subjects.filter(s => s.overallScore >= 80).map(s => s.id),
    subjectsInProgress: subjects.filter(s => s.overallScore >= 50 && s.overallScore < 80).map(s => s.id),
    subjectsNeedingWork: subjects.filter(s => s.overallScore < 50).map(s => s.id),
  };

  return {
    summary,
    baseTargets: BASE_TARGETS,
    subjects: subjectsWithGaps,
  };
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const jsonOutput = args.includes('--json');

  const projectRoot = join(__dirname, '..');
  const subjectsDir = join(projectRoot, 'src', 'subjects');

  if (!jsonOutput) {
    console.log('\n  Analyzing subjects from JSON/markdown files...\n');
    printRequirements();
  }

  // Get all subjects
  const subjectDirs = await readdir(subjectsDir);
  const subjects = [];

  for (const subjectId of subjectDirs) {
    const subjectPath = join(subjectsDir, subjectId);
    const subjectStat = await stat(subjectPath);

    if (subjectStat.isDirectory() && !subjectId.startsWith('.')) {
      const data = await loadSubjectData(subjectId, subjectsDir);
      const quality = analyzeSubject(subjectId, data);
      subjects.push(quality);
    }
  }

  if (jsonOutput) {
    // Output JSON
    const output = buildJsonOutput(subjects);
    console.log(JSON.stringify(output, null, 2));
  } else {
    // Print formatted output
    printSummaryTable(subjects);

    console.log(`\n\n${'═'.repeat(90)}`);
    console.log('  DETAILED SUBJECT REPORTS');
    console.log(`${'═'.repeat(90)}`);
    for (const subject of subjects.sort((a, b) => a.id.localeCompare(b.id))) {
      printSubjectReport(subject);
    }

    console.log('\n');
  }

  // Check for priority gaps across all subjects
  const allGaps = [];
  for (const subject of subjects.sort((a, b) => a.id.localeCompare(b.id))) {
    const gaps = computeGaps(subject);
    if (gaps.length > 0) {
      allGaps.push({ subject: subject.id, gaps });
    }
  }

  if (allGaps.length > 0) {
    if (!jsonOutput) {
      console.error(`\n${'═'.repeat(90)}`);
      console.error('  QUALITY CHECK: GAPS FOUND');
      console.error(`${'═'.repeat(90)}\n`);
      for (const { subject, gaps } of allGaps) {
        console.error(`  ${subject.toUpperCase()}:`);
        gaps.forEach(g => console.error(`     - ${g.message}`));
      }
      console.error('');
    }
    process.exit(1);
  }

  if (!jsonOutput) {
    console.log(`\n${'═'.repeat(90)}`);
    console.log('  QUALITY CHECK PASSED');
    console.log(`${'═'.repeat(90)}\n`);
  }
}

main().catch(console.error);
