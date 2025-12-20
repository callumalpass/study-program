/**
 * Colocation Migration Script
 *
 * Moves content and data into a unified src/subjects/ directory structure.
 *
 * Before:
 *   src/content/subjects/{id}/topic-1/*.md  (lessons)
 *   src/data/subjects/{id}/*.json, topics.ts, index.ts  (data)
 *
 * After:
 *   src/subjects/{id}/
 *     ├── content/          (markdown lessons)
 *     │   ├── topic-1/*.md
 *     │   └── topic-1.md    (topic overview)
 *     ├── topics.ts         (updated import paths)
 *     ├── index.ts
 *     ├── quizzes.json
 *     ├── exams.json
 *     ├── exercises.json
 *     └── projects.json
 *
 * Run with: npx tsx scripts/colocate-content.ts
 */

import { readdir, mkdir, rename, readFile, writeFile, rm, cp, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src/content/subjects');
const DATA_DIR = join(ROOT, 'src/data/subjects');
const NEW_DIR = join(ROOT, 'src/subjects');

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function getSubjectDirs(): Promise<string[]> {
  const entries = await readdir(DATA_DIR, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .map(e => e.name)
    .sort();
}

async function updateTopicsImports(subjectId: string): Promise<void> {
  const topicsPath = join(NEW_DIR, subjectId, 'topics.ts');

  if (!await fileExists(topicsPath)) {
    console.log(`  ⚠️  No topics.ts found`);
    return;
  }

  let content = await readFile(topicsPath, 'utf-8');

  // Update import paths from '../../../content/subjects/{id}/' to './content/'
  // Pattern: from '../../../content/subjects/{subjectId}/...' to './content/...'
  const oldPattern = new RegExp(
    `from\\s+['"]\\.\\.\/\\.\\.\/\\.\\.\/content\/subjects\/${subjectId}\/`,
    'g'
  );
  content = content.replace(oldPattern, `from './content/`);

  // Also update the core/types import path (now one level shallower)
  // from '../../../core/types' to '../../core/types'
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/\.\.\/core\/types['"]/g,
    `from '../../core/types'`
  );

  await writeFile(topicsPath, content, 'utf-8');
  console.log(`  ✅ Updated topics.ts import paths`);
}

async function updateIndexImports(subjectId: string): Promise<void> {
  const indexPath = join(NEW_DIR, subjectId, 'index.ts');

  if (!await fileExists(indexPath)) {
    console.log(`  ⚠️  No index.ts found`);
    return;
  }

  let content = await readFile(indexPath, 'utf-8');

  // Update core/types import path (now one level shallower)
  // from '../../../core/types' to '../../core/types'
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/\.\.\/core\/types['"]/g,
    `from '../../core/types'`
  );

  await writeFile(indexPath, content, 'utf-8');
  console.log(`  ✅ Updated index.ts import paths`);
}

async function migrateSubject(subjectId: string): Promise<void> {
  console.log(`\n📦 Migrating ${subjectId}...`);

  const newSubjectDir = join(NEW_DIR, subjectId);
  const contentSrcDir = join(CONTENT_DIR, subjectId);
  const dataSrcDir = join(DATA_DIR, subjectId);

  // Create new subject directory
  await mkdir(newSubjectDir, { recursive: true });

  // 1. Copy data files (*.json, *.ts)
  const dataFiles = await readdir(dataSrcDir);
  for (const file of dataFiles) {
    const srcPath = join(dataSrcDir, file);
    const destPath = join(newSubjectDir, file);
    await cp(srcPath, destPath, { recursive: true });
  }
  console.log(`  ✅ Copied data files`);

  // 2. Copy content to content/ subdirectory
  if (await fileExists(contentSrcDir)) {
    const contentDestDir = join(newSubjectDir, 'content');
    await cp(contentSrcDir, contentDestDir, { recursive: true });
    console.log(`  ✅ Copied content files`);
  } else {
    console.log(`  ⚠️  No content directory found for ${subjectId}`);
  }

  // 3. Update import paths in topics.ts
  await updateTopicsImports(subjectId);

  // 4. Update import paths in index.ts
  await updateIndexImports(subjectId);
}

async function updateMainIndex(): Promise<void> {
  console.log(`\n📋 Updating main subjects index...`);

  const oldIndexPath = join(DATA_DIR, 'index.ts');
  const newIndexPath = join(NEW_DIR, 'index.ts');

  if (!await fileExists(oldIndexPath)) {
    console.log(`  ⚠️  No main index.ts found`);
    return;
  }

  let content = await readFile(oldIndexPath, 'utf-8');

  // Update import path for types (now one level up)
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/core\/types['"]/g,
    `from '../core/types'`
  );

  await writeFile(newIndexPath, content, 'utf-8');
  console.log(`  ✅ Created new subjects/index.ts`);
}

async function updateExternalImports(): Promise<void> {
  console.log(`\n📋 Updating external imports...`);

  // Find files that import from src/data/subjects
  const srcDir = join(ROOT, 'src');

  async function processDir(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip the old data/subjects and content/subjects directories
        // and the new subjects directory
        if (fullPath === DATA_DIR || fullPath === CONTENT_DIR || fullPath === NEW_DIR) {
          continue;
        }
        await processDir(fullPath);
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        let content = await readFile(fullPath, 'utf-8');
        let modified = false;

        // Replace imports from data/subjects to subjects
        if (content.includes('/data/subjects')) {
          content = content.replace(
            /(['"])(@\/data\/subjects|\.\.\/data\/subjects|\.\.\/\.\.\/data\/subjects)/g,
            '$1$2'.replace('/data/subjects', '/subjects')
          );

          // More specific replacements
          content = content.replace(/@\/data\/subjects/g, '@/subjects');
          content = content.replace(/\.\.\/data\/subjects/g, '../subjects');
          content = content.replace(/\.\.\/\.\.\/data\/subjects/g, '../../subjects');
          content = content.replace(/\.\.\/\.\.\/\.\.\/data\/subjects/g, '../../../subjects');

          modified = true;
        }

        if (modified) {
          await writeFile(fullPath, content, 'utf-8');
          console.log(`  ✅ Updated ${fullPath.replace(ROOT + '/', '')}`);
        }
      }
    }
  }

  await processDir(srcDir);
}

async function main() {
  console.log('🚀 Starting content colocation migration...\n');

  // Create new subjects directory
  await mkdir(NEW_DIR, { recursive: true });
  console.log(`Created ${NEW_DIR}`);

  // Get all subjects
  const subjects = await getSubjectDirs();
  console.log(`Found ${subjects.length} subjects: ${subjects.slice(0, 5).join(', ')}...`);

  // Migrate each subject
  for (const subject of subjects) {
    await migrateSubject(subject);
  }

  // Update main index
  await updateMainIndex();

  // Update external imports
  await updateExternalImports();

  console.log('\n✨ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Verify the build works: npm run build');
  console.log('2. Remove old directories:');
  console.log('   rm -rf src/content/subjects');
  console.log('   rm -rf src/data/subjects');
  console.log('3. Update any remaining imports if needed');
}

main().catch(console.error);
