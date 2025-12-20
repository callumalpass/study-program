/**
 * Add Frontmatter Migration Script
 *
 * Extracts metadata from topics.ts and adds frontmatter to markdown files.
 * This allows us to simplify topics.ts to use glob imports.
 *
 * Handles both formats:
 * 1. Separate topicNSubtopics arrays
 * 2. Inline subtopics within topic objects
 *
 * Usage: npx tsx scripts/add-frontmatter.ts cs101
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SUBJECTS_DIR = join(ROOT, 'src/subjects');

interface SubtopicMeta {
  id: string;
  slug: string;
  title: string;
  order: number;
  filename: string;
}

interface TopicMeta {
  id: string;
  title: string;
  number: number;
  subtopics: SubtopicMeta[];
  quizIds: string[];
  exerciseIds: string[];
}

/**
 * Extract subtopics from a subtopics array string
 */
function parseSubtopicsArray(arrayContent: string): SubtopicMeta[] {
  const subtopics: SubtopicMeta[] = [];

  // Match subtopic objects with various property orders
  // Looking for: { id: '...', slug: '...', title: '...', ..., order: N }
  // The order property can appear anywhere in the object
  const subtopicRegex = /\{\s*id:\s*['"]([^'"]+)['"],\s*slug:\s*['"]([^'"]+)['"],\s*(?:order:\s*(\d+),\s*)?title:\s*['"]([^'"]+)['"](?:[^}]*order:\s*(\d+))?[^}]*\}/g;

  let match;
  while ((match = subtopicRegex.exec(arrayContent)) !== null) {
    const order = parseInt(match[3] || match[5] || '0', 10);
    subtopics.push({
      id: match[1],
      slug: match[2],
      title: match[4],
      order,
      filename: '',
    });
  }

  return subtopics;
}

/**
 * Parse topics.ts to extract metadata.
 * Handles both separate arrays and inline subtopics.
 */
async function parseTopicsTs(subjectId: string): Promise<TopicMeta[]> {
  const topicsPath = join(SUBJECTS_DIR, subjectId, 'topics.ts');
  const content = await readFile(topicsPath, 'utf-8');

  const topics: TopicMeta[] = [];

  // Check for separate subtopic arrays first: const topic1Subtopics: Subtopic[] = [...]
  const subtopicArrays = new Map<number, SubtopicMeta[]>();
  const subtopicArrayRegex = /const\s+topic(\d+)Subtopics[^=]*=\s*\[([\s\S]*?)\];/g;
  let arrayMatch;

  while ((arrayMatch = subtopicArrayRegex.exec(content)) !== null) {
    const topicNum = parseInt(arrayMatch[1], 10);
    subtopicArrays.set(topicNum, parseSubtopicsArray(arrayMatch[2]));
  }

  const hasSeparateArrays = subtopicArrays.size > 0;

  // Find the export array - handle both 'export const' and 'export default'
  let exportContent = '';
  const namedExportMatch = content.match(/export\s+const\s+\w+Topics[^=]*=\s*\[([\s\S]*)\];?\s*$/);
  const defaultExportMatch = content.match(/export\s+default\s+\w+;?\s*$/);

  if (namedExportMatch) {
    exportContent = namedExportMatch[1];
  } else if (defaultExportMatch) {
    // Find the variable that's being exported
    const varMatch = content.match(/const\s+\w+\s*:\s*Topic\[\]\s*=\s*\[([\s\S]*?)\];/);
    if (varMatch) {
      exportContent = varMatch[1];
    }
  }

  if (!exportContent) {
    console.error('Could not find topics export array');
    return [];
  }

  // Find each topic by matching { followed by id: and ending at the next topic or array end
  // We need to properly balance braces to handle inline subtopics
  const topicMatches: { start: number; content: string }[] = [];
  let depth = 0;
  let topicStart = -1;

  for (let i = 0; i < exportContent.length; i++) {
    const char = exportContent[i];
    if (char === '{') {
      if (depth === 0) {
        topicStart = i;
      }
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0 && topicStart !== -1) {
        topicMatches.push({
          start: topicStart,
          content: exportContent.slice(topicStart, i + 1),
        });
        topicStart = -1;
      }
    }
  }

  // Process each topic
  for (const topicMatch of topicMatches) {
    const block = topicMatch.content;

    // Extract basic topic info
    const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
    const titleMatch = block.match(/^\s*{\s*(?:id:[^,]+,\s*)?title:\s*['"]([^'"]+)['"]/m) ||
                       block.match(/title:\s*['"]([^'"]+)['"]/);

    if (!idMatch || !titleMatch) continue;

    // Determine topic number
    const numMatch = idMatch[1].match(/[-_](?:topic-)?(\d+)$/);
    const topicNum = numMatch ? parseInt(numMatch[1], 10) : 0;

    if (topicNum === 0) continue;

    // Get subtopics - either from separate array or inline
    let subtopics: SubtopicMeta[] = [];

    if (hasSeparateArrays) {
      // Check for reference to separate array
      const subtopicRefMatch = block.match(/subtopics:\s*topic(\d+)Subtopics/);
      if (subtopicRefMatch) {
        subtopics = subtopicArrays.get(parseInt(subtopicRefMatch[1], 10)) || [];
      }
    } else {
      // Look for inline subtopics array
      const inlineSubtopicsMatch = block.match(/subtopics:\s*\[([\s\S]*?)\]/);
      if (inlineSubtopicsMatch) {
        subtopics = parseSubtopicsArray(inlineSubtopicsMatch[1]);
      }
    }

    // Extract quiz and exercise IDs
    const quizIdsMatch = block.match(/quizIds:\s*\[([^\]]*)\]/);
    const exerciseIdsMatch = block.match(/exerciseIds:\s*(?:Array\.from[^)]+\)|(\[[^\]]*\]))/);

    const quizIds = quizIdsMatch
      ? quizIdsMatch[1].match(/['"]([^'"]+)['"]/g)?.map(s => s.replace(/['"]/g, '')) || []
      : [];

    let exerciseIds: string[] = [];
    if (exerciseIdsMatch) {
      if (exerciseIdsMatch[1]) {
        // Regular array
        exerciseIds = exerciseIdsMatch[1].match(/['"]([^'"]+)['"]/g)?.map(s => s.replace(/['"]/g, '')) || [];
      } else {
        // Array.from pattern - generate IDs
        const lengthMatch = block.match(/Array\.from\(\s*\{\s*length:\s*(\d+)/);
        const patternMatch = block.match(/`([^`]+)`/);
        if (lengthMatch && patternMatch) {
          const length = parseInt(lengthMatch[1], 10);
          for (let i = 1; i <= length; i++) {
            exerciseIds.push(`${subjectId}-t${topicNum}-ex${String(i).padStart(2, '0')}`);
          }
        }
      }
    }

    topics.push({
      id: idMatch[1],
      title: titleMatch[1],
      number: topicNum,
      subtopics,
      quizIds,
      exerciseIds,
    });
  }

  return topics.sort((a, b) => a.number - b.number);
}

/**
 * Match subtopics to their actual markdown files
 */
async function matchSubtopicsToFiles(
  subjectId: string,
  topics: TopicMeta[],
): Promise<void> {
  for (const topic of topics) {
    const topicDir = join(SUBJECTS_DIR, subjectId, 'content', `topic-${topic.number}`);

    try {
      const files = await readdir(topicDir);
      const mdFiles = files.filter(f => f.endsWith('.md')).sort();

      for (const subtopic of topic.subtopics) {
        // Try to match by order (01-xxx.md for order 1)
        const expectedPrefix = subtopic.order.toString().padStart(2, '0');
        const matchingFile = mdFiles.find(f => f.startsWith(expectedPrefix));

        if (matchingFile) {
          subtopic.filename = matchingFile;
        } else {
          // Try to match by slug
          const slugMatch = mdFiles.find(f =>
            f.toLowerCase().includes(subtopic.slug.toLowerCase().replace(/-/g, ''))
          );
          if (slugMatch) {
            subtopic.filename = slugMatch;
          }
        }
      }
    } catch {
      console.warn(`Could not read topic directory: ${topicDir}`);
    }
  }
}

/**
 * Add frontmatter to a markdown file
 */
async function addFrontmatterToFile(
  filePath: string,
  meta: { id: string; title: string; order: number },
): Promise<boolean> {
  const content = await readFile(filePath, 'utf-8');

  // Check if frontmatter already exists
  if (content.startsWith('---\n')) {
    console.log(`  ⏭️  Already has frontmatter: ${basename(filePath)}`);
    return false;
  }

  const frontmatter = `---
id: ${meta.id}
title: "${meta.title.replace(/"/g, '\\"')}"
order: ${meta.order}
---

`;

  await writeFile(filePath, frontmatter + content, 'utf-8');
  return true;
}

/**
 * Generate new simplified topics.ts
 */
function generateNewTopicsTs(subjectId: string, topics: TopicMeta[]): string {
  const lines: string[] = [
    `/**`,
    ` * ${subjectId.toUpperCase()} Topics`,
    ` *`,
    ` * Uses glob imports and frontmatter for automatic content discovery.`,
    ` */`,
    ``,
    `import type { Topic } from '../../core/types';`,
    `import { buildTopicsFromGlob } from '../loader';`,
    ``,
    `// Glob import all markdown content`,
    `const content = import.meta.glob('./content/**/*.md', {`,
    `  eager: true,`,
    `  query: '?raw',`,
    `  import: 'default',`,
    `}) as Record<string, string>;`,
    ``,
    `// Topic configuration (titles and IDs for quizzes/exercises)`,
    `const topicConfigs = [`,
  ];

  for (const topic of topics) {
    const quizIdsStr = topic.quizIds.length > 0
      ? `quizIds: [${topic.quizIds.map(id => `'${id}'`).join(', ')}],`
      : '';
    const exerciseIdsStr = topic.exerciseIds.length > 0
      ? `exerciseIds: [${topic.exerciseIds.map(id => `'${id}'`).join(', ')}],`
      : '';

    lines.push(`  {`);
    lines.push(`    number: ${topic.number},`);
    // Use double quotes for titles to handle apostrophes safely
    const escapedTitle = topic.title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    lines.push(`    title: "${escapedTitle}",`);
    if (quizIdsStr) lines.push(`    ${quizIdsStr}`);
    if (exerciseIdsStr) lines.push(`    ${exerciseIdsStr}`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);
  lines.push(`export const ${subjectId}Topics: Topic[] = buildTopicsFromGlob('${subjectId}', content, topicConfigs);`);
  lines.push(``);

  return lines.join('\n');
}

async function main() {
  const subjectId = process.argv[2];

  if (!subjectId) {
    console.error('Usage: npx tsx scripts/add-frontmatter.ts <subjectId>');
    console.error('Example: npx tsx scripts/add-frontmatter.ts cs101');
    process.exit(1);
  }

  console.log(`\n📦 Processing ${subjectId}...\n`);

  // 1. Parse current topics.ts
  console.log('📖 Parsing topics.ts...');
  const topics = await parseTopicsTs(subjectId);
  console.log(`   Found ${topics.length} topics`);

  for (const topic of topics) {
    console.log(`   Topic ${topic.number}: ${topic.title} (${topic.subtopics.length} subtopics)`);
  }

  if (topics.length === 0) {
    console.error('\n❌ No topics found. Check the topics.ts structure.');
    process.exit(1);
  }

  // 2. Match subtopics to files
  console.log('\n🔗 Matching subtopics to files...');
  await matchSubtopicsToFiles(subjectId, topics);

  // 3. Add frontmatter to each markdown file
  console.log('\n✏️  Adding frontmatter to markdown files...');
  let addedCount = 0;

  for (const topic of topics) {
    console.log(`\n  Topic ${topic.number}: ${topic.title}`);

    for (const subtopic of topic.subtopics) {
      if (!subtopic.filename) {
        console.log(`    ⚠️  No file found for: ${subtopic.slug}`);
        continue;
      }

      const filePath = join(
        SUBJECTS_DIR,
        subjectId,
        'content',
        `topic-${topic.number}`,
        subtopic.filename,
      );

      try {
        const added = await addFrontmatterToFile(filePath, {
          id: subtopic.id,
          title: subtopic.title,
          order: subtopic.order,
        });
        if (added) {
          console.log(`    ✅ ${subtopic.filename}`);
          addedCount++;
        }
      } catch (err) {
        console.log(`    ❌ Error: ${subtopic.filename} - ${err}`);
      }
    }
  }

  // 4. Generate new topics.ts
  console.log('\n📝 Generating new topics.ts...');
  const newTopicsTs = generateNewTopicsTs(subjectId, topics);
  const newTopicsPath = join(SUBJECTS_DIR, subjectId, 'topics.new.ts');
  await writeFile(newTopicsPath, newTopicsTs, 'utf-8');
  console.log(`   Written to: ${newTopicsPath}`);

  console.log(`\n✨ Done! Added frontmatter to ${addedCount} files.`);
  console.log(`\nNext steps:`);
  console.log(`1. Review the generated topics.new.ts`);
  console.log(`2. Replace topics.ts with topics.new.ts`);
  console.log(`3. Test the build: npm run build`);
}

main().catch(console.error);
