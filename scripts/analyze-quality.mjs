#!/usr/bin/env node
/**
 * Subject Quality Analysis Script
 *
 * Analyzes each subject against the CS101 gold standard defined in SUBJECT_UPGRADE_PROMPT.md
 *
 * Usage:
 *   node scripts/analyze-quality.mjs          # Formatted terminal output
 *   node scripts/analyze-quality.mjs --json   # JSON output
 *   npm run quality                           # Formatted terminal output
 *   npm run quality:json                      # JSON output
 */

import { readdir, readFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Gold standard targets (from CS101)
const TARGETS = {
  topicsPerSubject: 7,
  subtopicsPerTopic: 7, // 5-7 range
  quizzesPerTopic: 3,
  questionsPerQuiz: 5,
  exercisesPerTopic: 16,
  midtermQuestions: 26,
  finalQuestions: 42,
  wordsPerSubtopic: 1000,
};

// Subject categories for assessment strategy
const EXAM_ONLY_SUBJECTS = ['math101', 'math102', 'math203', 'cs102'];

// Count words in markdown content (excluding code blocks)
function countWords(content) {
  // Remove code blocks
  let text = content.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`[^`]+`/g, '');
  // Remove markdown syntax
  text = text.replace(/[#*_\[\]()>-]/g, ' ');
  // Count words
  const words = text.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

// Parse topics.ts to extract topic info
async function parseTopicsFile(filePath) {
  const content = await readFile(filePath, 'utf-8');

  const topics = [];
  const subtopicImports = new Map();

  // Extract imports for subtopic content
  const importRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+\.md)\?raw['"]/g;
  let importMatch;
  while ((importMatch = importRegex.exec(content)) !== null) {
    subtopicImports.set(importMatch[1], importMatch[2]);
  }

  // Extract topic definitions - look for objects with id, title, quizIds
  const topicBlockRegex = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*title:\s*['"]([^'"]+)['"]/g;
  let topicMatch;
  while ((topicMatch = topicBlockRegex.exec(content)) !== null) {
    const topicId = topicMatch[1];
    const topicTitle = topicMatch[2];

    // Find the block for this topic to get quizIds and exerciseIds
    const blockStart = topicMatch.index;
    let braceCount = 0;
    let blockEnd = blockStart;
    let inBlock = false;

    for (let i = blockStart; i < content.length; i++) {
      if (content[i] === '{') {
        braceCount++;
        inBlock = true;
      } else if (content[i] === '}') {
        braceCount--;
        if (inBlock && braceCount === 0) {
          blockEnd = i + 1;
          break;
        }
      }
    }

    const block = content.slice(blockStart, blockEnd);

    // Extract quizIds
    const quizIdsMatch = block.match(/quizIds:\s*\[([^\]]*)\]/);
    const quizIds = quizIdsMatch
      ? quizIdsMatch[1].match(/['"]([^'"]+)['"]/g)?.map(s => s.replace(/['"]/g, '')) || []
      : [];

    // Extract exerciseIds
    const exerciseIdsMatch = block.match(/exerciseIds:\s*\[([^\]]*)\]/);
    const exerciseIds = exerciseIdsMatch
      ? exerciseIdsMatch[1].match(/['"]([^'"]+)['"]/g)?.map(s => s.replace(/['"]/g, '')) || []
      : [];

    // Check for subtopics
    const hasSubtopics = block.includes('subtopics:') && !block.includes('subtopics: []');

    // Check for readings
    const hasReadings = block.includes('readings:') && !block.includes('readings: []');

    topics.push({ id: topicId, title: topicTitle, quizIds, exerciseIds, hasSubtopics, hasReadings });
  }

  return { topics, subtopicImports };
}

// Parse quizzes.ts to count quizzes and questions
async function parseQuizzesFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');

    const quizzes = [];

    // Find quiz blocks
    const quizRegex = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*subjectId:\s*['"][^'"]+['"]\s*,\s*topicId:\s*['"]([^'"]+)['"]/g;
    let match;

    while ((match = quizRegex.exec(content)) !== null) {
      const quizId = match[1];
      const topicId = match[2];

      // Find the questions array for this quiz
      const blockStart = match.index;
      let braceCount = 0;
      let blockEnd = blockStart;
      let inBlock = false;

      for (let i = blockStart; i < content.length; i++) {
        if (content[i] === '{') {
          braceCount++;
          inBlock = true;
        } else if (content[i] === '}') {
          braceCount--;
          if (inBlock && braceCount === 0) {
            blockEnd = i + 1;
            break;
          }
        }
      }

      const block = content.slice(blockStart, blockEnd);

      // Count questions by counting "id:" patterns within questions array
      const questionsMatch = block.match(/questions:\s*\[/);
      if (questionsMatch) {
        const questionIdMatches = block.match(/{\s*id:\s*['"]q\d+['"]/g);
        const questionCount = questionIdMatches?.length || 0;
        quizzes.push({ id: quizId, topicId, questionCount });
      }
    }

    return {
      quizCount: quizzes.length,
      totalQuestions: quizzes.reduce((sum, q) => sum + q.questionCount, 0),
      quizzes
    };
  } catch {
    return { quizCount: 0, totalQuestions: 0, quizzes: [] };
  }
}

// Parse exams.ts to get exam info
async function parseExamsFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');

    const result = { hasMidterm: false, hasFinal: false, midtermQuestions: 0, finalQuestions: 0 };

    // Check for midterm
    if (content.includes('midterm') || content.includes('Midterm')) {
      result.hasMidterm = true;
      // Count questions in midterm
      const midtermMatch = content.match(/id:\s*['"][^'"]*midterm[^'"]*['"]/i);
      if (midtermMatch) {
        const startIdx = midtermMatch.index || 0;
        // Find the exam block
        let braceCount = 0;
        let blockStart = content.lastIndexOf('{', startIdx);
        let blockEnd = startIdx;

        for (let i = blockStart; i < content.length; i++) {
          if (content[i] === '{') braceCount++;
          else if (content[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              blockEnd = i + 1;
              break;
            }
          }
        }

        const block = content.slice(blockStart, blockEnd);
        const questionMatches = block.match(/{\s*id:\s*['"]/g);
        result.midtermQuestions = questionMatches?.length || 0;
      }
    }

    // Check for final
    if (content.includes('final') || content.includes('Final')) {
      result.hasFinal = true;
      // Count questions in final
      const finalMatch = content.match(/id:\s*['"][^'"]*final[^'"]*['"]/i);
      if (finalMatch) {
        const startIdx = finalMatch.index || 0;
        let braceCount = 0;
        let blockStart = content.lastIndexOf('{', startIdx);
        let blockEnd = startIdx;

        for (let i = blockStart; i < content.length; i++) {
          if (content[i] === '{') braceCount++;
          else if (content[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              blockEnd = i + 1;
              break;
            }
          }
        }

        const block = content.slice(blockStart, blockEnd);
        const questionMatches = block.match(/{\s*id:\s*['"]/g);
        result.finalQuestions = questionMatches?.length || 0;
      }
    }

    return result;
  } catch {
    return { hasMidterm: false, hasFinal: false, midtermQuestions: 0, finalQuestions: 0 };
  }
}

// Parse projects.ts to count projects
async function parseProjectsFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const projectMatches = content.match(/id:\s*['"][^'"]*project[^'"]*['"]/gi);
    return projectMatches?.length || 0;
  } catch {
    return 0;
  }
}

// Count exercises by parsing exercises/index.ts
async function countExercises(exercisesDir) {
  const byTopic = new Map();
  let total = 0;

  try {
    const files = await readdir(exercisesDir);

    for (const file of files) {
      if (file.endsWith('.ts') && file !== 'index.ts') {
        const content = await readFile(join(exercisesDir, file), 'utf-8');
        // Count exercise definitions
        const exerciseMatches = content.match(/id:\s*['"]([^'"]+)['"]\s*,\s*subjectId/g);
        const count = exerciseMatches?.length || 0;
        total += count;

        // Try to extract topic from file name
        const topicMatch = file.match(/topic-(\d+)/);
        if (topicMatch) {
          const topicNum = topicMatch[1];
          byTopic.set(topicNum, (byTopic.get(topicNum) || 0) + count);
        }
      }
    }
  } catch {
    // exercises directory may not exist
  }

  return { total, byTopic };
}

// Get subtopic word counts from content directory
async function getSubtopicWordCounts(contentDir, subjectId) {
  const topicWordCounts = new Map();

  try {
    const items = await readdir(contentDir);

    for (const item of items) {
      const itemPath = join(contentDir, item);
      const itemStat = await stat(itemPath);

      if (itemStat.isDirectory() && item.startsWith('topic-')) {
        const topicNum = item.replace('topic-', '');
        const subtopics = [];
        let totalWords = 0;

        const subtopicFiles = await readdir(itemPath);
        for (const file of subtopicFiles) {
          if (file.endsWith('.md')) {
            const content = await readFile(join(itemPath, file), 'utf-8');
            const words = countWords(content);
            subtopics.push({ file, words });
            totalWords += words;
          }
        }

        topicWordCounts.set(topicNum, { subtopics, totalWords });
      }
    }
  } catch {
    // content directory may not exist
  }

  return topicWordCounts;
}

// Calculate overall quality score (0-100)
function calculateScore(quality) {
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
  score += (Math.min(quality.totalTopics, TARGETS.topicsPerSubject) / TARGETS.topicsPerSubject) * weights.topics;

  // Subtopics score (target: 7 per topic)
  const subtopicTarget = quality.totalTopics * TARGETS.subtopicsPerTopic;
  score += (Math.min(quality.totalSubtopics, subtopicTarget) / Math.max(subtopicTarget, 1)) * weights.subtopics;

  // Quizzes score (target: 3 per topic)
  const quizTarget = quality.totalTopics * TARGETS.quizzesPerTopic;
  score += (Math.min(quality.totalQuizzes, quizTarget) / Math.max(quizTarget, 1)) * weights.quizzes;

  // Exercises score (target: 16 per topic)
  const exerciseTarget = quality.totalTopics * TARGETS.exercisesPerTopic;
  score += (Math.min(quality.totalExercises, exerciseTarget) / Math.max(exerciseTarget, 1)) * weights.exercises;

  // Exams score
  let examScore = 0;
  if (quality.hasMidterm) examScore += 0.3;
  if (quality.hasFinal) examScore += 0.3;
  if (quality.midtermQuestions >= TARGETS.midtermQuestions) examScore += 0.2;
  if (quality.finalQuestions >= TARGETS.finalQuestions) examScore += 0.2;
  score += examScore * weights.exams;

  // Projects score (only if needed)
  if (quality.projectsNeeded) {
    score += (quality.projectCount > 0 ? 1 : 0) * weights.projects;
  } else {
    score += weights.projects; // Full score if projects not needed
  }

  // Word count score (target: 1000 words per subtopic)
  if (quality.totalSubtopics > 0) {
    const wordRatio = Math.min(quality.avgWordsPerSubtopic / TARGETS.wordsPerSubtopic, 1);
    score += wordRatio * weights.wordCount;
  }

  return Math.round(score);
}

// Analyze a single subject
async function analyzeSubject(subjectId, dataDir, contentDir) {
  const subjectDataDir = join(dataDir, subjectId);
  const subjectContentDir = join(contentDir, subjectId);

  // Parse topics
  const topicsPath = join(subjectDataDir, 'topics.ts');
  const { topics: parsedTopics } = await parseTopicsFile(topicsPath);

  // Parse quizzes
  const quizzesPath = join(subjectDataDir, 'quizzes.ts');
  const quizData = await parseQuizzesFile(quizzesPath);

  // Parse exams
  const examsPath = join(subjectDataDir, 'exams.ts');
  const examData = await parseExamsFile(examsPath);

  // Parse projects
  const projectsPath = join(subjectDataDir, 'projects.ts');
  const projectCount = await parseProjectsFile(projectsPath);

  // Count exercises
  const exercisesDir = join(subjectDataDir, 'exercises');
  const exerciseData = await countExercises(exercisesDir);

  // Get word counts
  const wordCounts = await getSubtopicWordCounts(subjectContentDir, subjectId);

  // Build topic quality data
  const topics = parsedTopics.map((t, idx) => {
    const topicNum = String(idx + 1);
    const wordData = wordCounts.get(topicNum);
    const quizzesForTopic = quizData.quizzes.filter(q => q.topicId === t.id);

    return {
      id: t.id,
      title: t.title,
      subtopicCount: wordData?.subtopics.length || 0,
      subtopics: wordData?.subtopics.map(s => ({
        id: s.file.replace('.md', ''),
        title: s.file.replace('.md', '').replace(/^\d+-/, '').replace(/-/g, ' '),
        wordCount: s.words
      })) || [],
      totalWords: wordData?.totalWords || 0,
      quizCount: quizzesForTopic.length,
      exerciseCount: t.exerciseIds.length,
      hasReadings: t.hasReadings,
      readingCount: 0,
    };
  });

  const totalSubtopics = topics.reduce((sum, t) => sum + t.subtopicCount, 0);
  const totalContentWords = topics.reduce((sum, t) => sum + t.totalWords, 0);
  const totalReadings = topics.filter(t => t.hasReadings).length;

  const projectsNeeded = !EXAM_ONLY_SUBJECTS.includes(subjectId);
  const readingsApplicable = !['cs101', 'math101', 'math102', 'math203'].includes(subjectId);

  const quality = {
    id: subjectId,
    topics,
    totalTopics: topics.length,
    totalSubtopics,
    avgSubtopicsPerTopic: topics.length > 0 ? totalSubtopics / topics.length : 0,
    totalQuizzes: quizData.quizCount,
    totalQuizQuestions: quizData.totalQuestions,
    avgQuizzesPerTopic: topics.length > 0 ? quizData.quizCount / topics.length : 0,
    totalExercises: exerciseData.total,
    avgExercisesPerTopic: topics.length > 0 ? exerciseData.total / topics.length : 0,
    hasMidterm: examData.hasMidterm,
    hasFinal: examData.hasFinal,
    midtermQuestions: examData.midtermQuestions,
    finalQuestions: examData.finalQuestions,
    projectCount,
    projectsNeeded,
    totalContentWords,
    avgWordsPerSubtopic: totalSubtopics > 0 ? totalContentWords / totalSubtopics : 0,
    overallScore: 0,
    readingsApplicable,
    totalReadings,
  };

  quality.overallScore = calculateScore(quality);

  return quality;
}

// Compute gaps for a subject
function computeGaps(quality) {
  const gaps = [];

  if (quality.totalTopics < TARGETS.topicsPerSubject) {
    gaps.push({ type: 'topics', message: `Need ${TARGETS.topicsPerSubject - quality.totalTopics} more topics` });
  }
  if (quality.avgSubtopicsPerTopic < 5) {
    gaps.push({ type: 'subtopics', message: `Subtopics needed (avg ${quality.avgSubtopicsPerTopic.toFixed(1)}, need 5-7)` });
  }
  if (quality.avgQuizzesPerTopic < TARGETS.quizzesPerTopic) {
    gaps.push({ type: 'quizzes', message: `Quizzes needed (${quality.totalQuizzes}/${quality.totalTopics * TARGETS.quizzesPerTopic})` });
  }
  if (quality.avgExercisesPerTopic < TARGETS.exercisesPerTopic) {
    gaps.push({ type: 'exercises', message: `Exercises needed (${quality.totalExercises}/${quality.totalTopics * TARGETS.exercisesPerTopic})` });
  }
  if (!quality.hasMidterm) {
    gaps.push({ type: 'exam', message: 'Midterm exam missing' });
  }
  if (!quality.hasFinal) {
    gaps.push({ type: 'exam', message: 'Final exam missing' });
  }
  if (quality.hasMidterm && quality.midtermQuestions < TARGETS.midtermQuestions) {
    gaps.push({ type: 'exam', message: `Midterm needs ${TARGETS.midtermQuestions - quality.midtermQuestions} more questions` });
  }
  if (quality.hasFinal && quality.finalQuestions < TARGETS.finalQuestions) {
    gaps.push({ type: 'exam', message: `Final needs ${TARGETS.finalQuestions - quality.finalQuestions} more questions` });
  }
  if (quality.projectsNeeded && quality.projectCount === 0) {
    gaps.push({ type: 'projects', message: 'Projects needed' });
  }
  if (quality.avgWordsPerSubtopic < TARGETS.wordsPerSubtopic * 0.7) {
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

// Print report for a single subject
function printSubjectReport(quality) {
  const { id, topics, totalTopics, totalSubtopics, avgSubtopicsPerTopic,
    totalQuizzes, totalQuizQuestions, avgQuizzesPerTopic,
    totalExercises, avgExercisesPerTopic,
    hasMidterm, hasFinal, midtermQuestions, finalQuestions,
    projectCount, projectsNeeded,
    totalContentWords, avgWordsPerSubtopic,
    overallScore, readingsApplicable, totalReadings } = quality;

  const scoreColor = overallScore >= 80 ? '\x1b[32m' : overallScore >= 50 ? '\x1b[33m' : '\x1b[31m';
  const reset = '\x1b[0m';

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  ${id.toUpperCase()}  ${scoreColor}[Score: ${overallScore}/100]${reset}`);
  console.log(`${'═'.repeat(70)}`);

  // Topics & Subtopics
  console.log(`\n  📚 TOPICS & SUBTOPICS`);
  console.log(`     Topics:    ${totalTopics}/${TARGETS.topicsPerSubject}  ${progressBar(totalTopics, TARGETS.topicsPerSubject, 15)}`);
  console.log(`     Subtopics: ${totalSubtopics}/${totalTopics * TARGETS.subtopicsPerTopic}  ${progressBar(totalSubtopics, totalTopics * TARGETS.subtopicsPerTopic, 15)}`);
  console.log(`     Avg/Topic: ${avgSubtopicsPerTopic.toFixed(1)}/${TARGETS.subtopicsPerTopic}`);

  // Word counts per topic
  console.log(`\n  📝 CONTENT WORD COUNTS (target: ~${TARGETS.wordsPerSubtopic}/subtopic)`);
  console.log(`     Total: ${totalContentWords.toLocaleString()} words | Avg/subtopic: ${Math.round(avgWordsPerSubtopic)}`);

  for (const topic of topics) {
    if (topic.subtopicCount > 0) {
      const avgWords = topic.totalWords / topic.subtopicCount;
      const status = avgWords >= TARGETS.wordsPerSubtopic * 0.8 ? '✓' : avgWords >= TARGETS.wordsPerSubtopic * 0.5 ? '~' : '✗';
      console.log(`     T${topics.indexOf(topic) + 1}: ${topic.totalWords.toLocaleString()} words (${topic.subtopicCount} subtopics, avg ${Math.round(avgWords)}) ${status}`);
    } else {
      console.log(`     T${topics.indexOf(topic) + 1}: No subtopics`);
    }
  }

  // Quizzes
  console.log(`\n  ❓ QUIZZES (target: ${TARGETS.quizzesPerTopic}/topic, ${TARGETS.questionsPerQuiz} questions each)`);
  console.log(`     Total:     ${totalQuizzes}/${totalTopics * TARGETS.quizzesPerTopic}  ${progressBar(totalQuizzes, totalTopics * TARGETS.quizzesPerTopic, 15)}`);
  console.log(`     Questions: ${totalQuizQuestions}/${totalTopics * TARGETS.quizzesPerTopic * TARGETS.questionsPerQuiz}`);
  console.log(`     Avg/Topic: ${avgQuizzesPerTopic.toFixed(1)}/${TARGETS.quizzesPerTopic}`);

  // Exercises
  console.log(`\n  💻 EXERCISES (target: ${TARGETS.exercisesPerTopic}/topic)`);
  console.log(`     Total:     ${totalExercises}/${totalTopics * TARGETS.exercisesPerTopic}  ${progressBar(totalExercises, totalTopics * TARGETS.exercisesPerTopic, 15)}`);
  console.log(`     Avg/Topic: ${avgExercisesPerTopic.toFixed(1)}/${TARGETS.exercisesPerTopic}`);

  // Per-topic breakdown
  console.log(`\n  📊 PER-TOPIC BREAKDOWN`);
  for (const topic of topics) {
    const quizStatus = topic.quizCount >= TARGETS.quizzesPerTopic ? '✓' : topic.quizCount > 0 ? '~' : '✗';
    const exStatus = topic.exerciseCount >= TARGETS.exercisesPerTopic ? '✓' : topic.exerciseCount >= 8 ? '~' : '✗';
    const subStatus = topic.subtopicCount >= 5 ? '✓' : topic.subtopicCount > 0 ? '~' : '✗';
    console.log(`     T${topics.indexOf(topic) + 1}: Q:${topic.quizCount}${quizStatus} E:${topic.exerciseCount}${exStatus} S:${topic.subtopicCount}${subStatus} | ${topic.title.substring(0, 30)}`);
  }

  // Exams
  console.log(`\n  📝 EXAMS (target: midterm ~${TARGETS.midtermQuestions}q, final ~${TARGETS.finalQuestions}q)`);
  console.log(`     Midterm: ${hasMidterm ? `✓ (${midtermQuestions} questions)` : '✗ Missing'}`);
  console.log(`     Final:   ${hasFinal ? `✓ (${finalQuestions} questions)` : '✗ Missing'}`);

  // Projects
  console.log(`\n  🏗️  PROJECTS`);
  if (projectsNeeded) {
    console.log(`     Count: ${projectCount} (projects ${projectCount > 0 ? 'present' : 'needed'})`);
  } else {
    console.log(`     Not required for this subject type (exam-only)`);
  }

  // Readings
  if (readingsApplicable) {
    console.log(`\n  📖 READINGS`);
    console.log(`     Topics with readings: ${totalReadings}/${totalTopics}`);
  }

  // Gaps summary
  console.log(`\n  🎯 PRIORITY GAPS`);
  const gaps = [];

  if (totalTopics < TARGETS.topicsPerSubject) gaps.push(`Need ${TARGETS.topicsPerSubject - totalTopics} more topics`);
  if (avgSubtopicsPerTopic < 5) gaps.push(`Subtopics needed (avg ${avgSubtopicsPerTopic.toFixed(1)}, need 5-7)`);
  if (avgQuizzesPerTopic < TARGETS.quizzesPerTopic) gaps.push(`Quizzes needed (${totalQuizzes}/${totalTopics * TARGETS.quizzesPerTopic})`);
  if (avgExercisesPerTopic < TARGETS.exercisesPerTopic) gaps.push(`Exercises needed (${totalExercises}/${totalTopics * TARGETS.exercisesPerTopic})`);
  if (!hasMidterm) gaps.push('Midterm exam missing');
  if (!hasFinal) gaps.push('Final exam missing');
  if (hasMidterm && midtermQuestions < TARGETS.midtermQuestions) gaps.push(`Midterm needs ${TARGETS.midtermQuestions - midtermQuestions} more questions`);
  if (hasFinal && finalQuestions < TARGETS.finalQuestions) gaps.push(`Final needs ${TARGETS.finalQuestions - finalQuestions} more questions`);
  if (projectsNeeded && projectCount === 0) gaps.push('Projects needed');
  if (avgWordsPerSubtopic < TARGETS.wordsPerSubtopic * 0.7) gaps.push(`Content too thin (avg ${Math.round(avgWordsPerSubtopic)} words/subtopic)`);

  if (gaps.length === 0) {
    console.log('     ✓ No major gaps - meets gold standard!');
  } else {
    gaps.forEach(g => console.log(`     • ${g}`));
  }
}

// Print summary table
function printSummaryTable(subjects) {
  console.log(`\n${'═'.repeat(90)}`);
  console.log('  SUBJECT QUALITY SUMMARY');
  console.log(`${'═'.repeat(90)}`);

  console.log('\n  Subject   Score  Topics  Subtopics  Quizzes  Exercises  Exams  Projects  Words/Sub');
  console.log('  ' + '─'.repeat(86));

  // Sort by score descending
  const sorted = [...subjects].sort((a, b) => b.overallScore - a.overallScore);

  for (const s of sorted) {
    const scoreColor = s.overallScore >= 80 ? '\x1b[32m' : s.overallScore >= 50 ? '\x1b[33m' : '\x1b[31m';
    const reset = '\x1b[0m';
    const examStr = `${s.hasMidterm ? 'M' : '-'}${s.hasFinal ? 'F' : '-'}`;
    const projStr = s.projectsNeeded ? String(s.projectCount) : 'N/A';

    console.log(
      `  ${s.id.padEnd(9)} ${scoreColor}${String(s.overallScore).padStart(3)}${reset}%` +
      `   ${String(s.totalTopics).padStart(2)}/${TARGETS.topicsPerSubject}` +
      `      ${String(s.totalSubtopics).padStart(2)}/${s.totalTopics * TARGETS.subtopicsPerTopic}` +
      `      ${String(s.totalQuizzes).padStart(2)}/${s.totalTopics * TARGETS.quizzesPerTopic}` +
      `       ${String(s.totalExercises).padStart(3)}/${s.totalTopics * TARGETS.exercisesPerTopic}` +
      `     ${examStr.padStart(4)}` +
      `      ${projStr.padStart(3)}` +
      `      ${String(Math.round(s.avgWordsPerSubtopic)).padStart(5)}`
    );
  }

  console.log('  ' + '─'.repeat(86));

  // Overall stats
  const avgScore = Math.round(subjects.reduce((sum, s) => sum + s.overallScore, 0) / subjects.length);
  const totalTopics = subjects.reduce((sum, s) => sum + s.totalTopics, 0);
  const totalSubtopics = subjects.reduce((sum, s) => sum + s.totalSubtopics, 0);
  const totalQuizzes = subjects.reduce((sum, s) => sum + s.totalQuizzes, 0);
  const totalExercises = subjects.reduce((sum, s) => sum + s.totalExercises, 0);
  const totalWords = subjects.reduce((sum, s) => sum + s.totalContentWords, 0);

  console.log(`\n  📈 OVERALL STATISTICS`);
  console.log(`     Average Score: ${avgScore}%`);
  console.log(`     Total Topics: ${totalTopics}`);
  console.log(`     Total Subtopics: ${totalSubtopics}`);
  console.log(`     Total Quizzes: ${totalQuizzes}`);
  console.log(`     Total Exercises: ${totalExercises}`);
  console.log(`     Total Content: ${totalWords.toLocaleString()} words`);

  // Subjects meeting standard
  const meetingStandard = subjects.filter(s => s.overallScore >= 80);
  console.log(`\n  ✓ Subjects meeting gold standard (≥80%): ${meetingStandard.length}/${subjects.length}`);
  if (meetingStandard.length > 0) {
    console.log(`    ${meetingStandard.map(s => s.id).join(', ')}`);
  }
}

// Build JSON output structure
function buildJsonOutput(subjects) {
  const sortedSubjects = [...subjects].sort((a, b) => a.id.localeCompare(b.id));

  const subjectsWithGaps = sortedSubjects.map(s => ({
    ...s,
    gaps: computeGaps(s),
    targets: {
      topicsPerSubject: TARGETS.topicsPerSubject,
      subtopicsPerTopic: TARGETS.subtopicsPerTopic,
      quizzesPerTopic: TARGETS.quizzesPerTopic,
      exercisesPerTopic: TARGETS.exercisesPerTopic,
      midtermQuestions: TARGETS.midtermQuestions,
      finalQuestions: TARGETS.finalQuestions,
      wordsPerSubtopic: TARGETS.wordsPerSubtopic,
    },
  }));

  const summary = {
    generatedAt: new Date().toISOString(),
    averageScore: Math.round(subjects.reduce((sum, s) => sum + s.overallScore, 0) / subjects.length),
    totalSubjects: subjects.length,
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
    targets: TARGETS,
    subjects: subjectsWithGaps,
  };
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const jsonOutput = args.includes('--json');

  const projectRoot = join(__dirname, '..');
  const dataDir = join(projectRoot, 'src', 'data', 'subjects');
  const contentDir = join(projectRoot, 'src', 'content', 'subjects');

  if (!jsonOutput) {
    console.log('\n🔍 Analyzing Subject Quality...\n');
  }

  // Get all subjects
  const subjectDirs = await readdir(dataDir);
  const subjects = [];

  for (const subjectId of subjectDirs) {
    const subjectPath = join(dataDir, subjectId);
    const subjectStat = await stat(subjectPath);

    if (subjectStat.isDirectory() && !subjectId.startsWith('.')) {
      try {
        const quality = await analyzeSubject(subjectId, dataDir, contentDir);
        subjects.push(quality);
      } catch (err) {
        if (!jsonOutput) {
          console.error(`Error analyzing ${subjectId}:`, err);
        }
      }
    }
  }

  if (jsonOutput) {
    // Output JSON
    const output = buildJsonOutput(subjects);
    console.log(JSON.stringify(output, null, 2));
  } else {
    // Print formatted output
    printSummaryTable(subjects);

    console.log('\n\n📋 DETAILED SUBJECT REPORTS');
    for (const subject of subjects.sort((a, b) => a.id.localeCompare(b.id))) {
      printSubjectReport(subject);
    }

    console.log('\n');
  }
}

main().catch(console.error);
