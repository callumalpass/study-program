/**
 * Migration script: Convert TypeScript data files to JSON
 *
 * This script:
 * 1. Finds all subject directories in src/data/subjects/
 * 2. Imports quizzes.ts, exams.ts, projects.ts, and exercises from each
 * 3. Writes the data to JSON files
 * 4. Creates new TypeScript loader files that import from JSON
 *
 * Run with: npx tsx scripts/migrate-to-json.ts
 */

import { readdir, writeFile, mkdir, access, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SUBJECTS_DIR = join(ROOT, 'src/data/subjects');

// Subjects to migrate (we'll discover these dynamically)
async function getSubjectDirs(): Promise<string[]> {
  const entries = await readdir(SUBJECTS_DIR, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .map(e => e.name)
    .sort();
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function migrateSubject(subjectId: string): Promise<void> {
  const subjectDir = join(SUBJECTS_DIR, subjectId);
  console.log(`\n📦 Migrating ${subjectId}...`);

  // Create json subdirectory if it doesn't exist
  const jsonDir = subjectDir;

  // 1. Migrate quizzes
  const quizzesPath = join(subjectDir, 'quizzes.ts');
  if (await fileExists(quizzesPath)) {
    try {
      const module = await import(quizzesPath);
      const exportName = `${subjectId}Quizzes`;
      const data = module[exportName];
      if (data && Array.isArray(data)) {
        await writeFile(
          join(jsonDir, 'quizzes.json'),
          JSON.stringify(data, null, 2),
          'utf-8'
        );
        console.log(`  ✅ quizzes.json (${data.length} quizzes)`);
      } else {
        console.log(`  ⚠️  No quizzes found (looking for ${exportName})`);
      }
    } catch (err) {
      console.log(`  ❌ Failed to migrate quizzes: ${err}`);
    }
  }

  // 2. Migrate exams
  const examsPath = join(subjectDir, 'exams.ts');
  if (await fileExists(examsPath)) {
    try {
      const module = await import(examsPath);
      const exportName = `${subjectId}Exams`;
      const data = module[exportName];
      if (data && Array.isArray(data)) {
        await writeFile(
          join(jsonDir, 'exams.json'),
          JSON.stringify(data, null, 2),
          'utf-8'
        );
        console.log(`  ✅ exams.json (${data.length} exams)`);
      } else {
        console.log(`  ⚠️  No exams found (looking for ${exportName})`);
      }
    } catch (err) {
      console.log(`  ❌ Failed to migrate exams: ${err}`);
    }
  }

  // 3. Migrate projects
  const projectsPath = join(subjectDir, 'projects.ts');
  if (await fileExists(projectsPath)) {
    try {
      const module = await import(projectsPath);
      const exportName = `${subjectId}Projects`;
      const data = module[exportName];
      if (data && Array.isArray(data)) {
        await writeFile(
          join(jsonDir, 'projects.json'),
          JSON.stringify(data, null, 2),
          'utf-8'
        );
        console.log(`  ✅ projects.json (${data.length} projects)`);
      } else {
        // Some subjects don't have projects
        console.log(`  ⏭️  No projects (math subjects typically don't have these)`);
      }
    } catch (err) {
      console.log(`  ❌ Failed to migrate projects: ${err}`);
    }
  }

  // 4. Migrate exercises
  const exercisesIndexPath = join(subjectDir, 'exercises/index.ts');
  if (await fileExists(exercisesIndexPath)) {
    try {
      const module = await import(exercisesIndexPath);
      const exportName = `${subjectId}Exercises`;
      const data = module[exportName];
      if (data && Array.isArray(data)) {
        await writeFile(
          join(jsonDir, 'exercises.json'),
          JSON.stringify(data, null, 2),
          'utf-8'
        );
        console.log(`  ✅ exercises.json (${data.length} exercises)`);
      } else {
        console.log(`  ⚠️  No exercises found (looking for ${exportName})`);
      }
    } catch (err) {
      console.log(`  ❌ Failed to migrate exercises: ${err}`);
    }
  }
}

async function generateLoaderFile(subjectId: string): Promise<void> {
  const subjectDir = join(SUBJECTS_DIR, subjectId);

  // Check what JSON files exist
  const hasQuizzes = await fileExists(join(subjectDir, 'quizzes.json'));
  const hasExams = await fileExists(join(subjectDir, 'exams.json'));
  const hasProjects = await fileExists(join(subjectDir, 'projects.json'));
  const hasExercises = await fileExists(join(subjectDir, 'exercises.json'));

  // Generate the new index.ts that imports from JSON
  const imports: string[] = [];
  const exports: string[] = [];
  const reExports: string[] = [];

  if (hasQuizzes) {
    imports.push(`import quizzesData from './quizzes.json';`);
    exports.push(`export const ${subjectId}Quizzes = quizzesData as Quiz[];`);
  }

  if (hasExams) {
    imports.push(`import examsData from './exams.json';`);
    exports.push(`export const ${subjectId}Exams = examsData as Exam[];`);
  }

  if (hasProjects) {
    imports.push(`import projectsData from './projects.json';`);
    exports.push(`export const ${subjectId}Projects = projectsData as Project[];`);
  }

  if (hasExercises) {
    imports.push(`import exercisesData from './exercises.json';`);
    exports.push(`export const ${subjectId}Exercises = exercisesData as Exercise[];`);
  }

  // Always re-export topics (which still uses the ?raw imports for markdown)
  reExports.push(`export { ${subjectId}Topics } from './topics';`);

  const content = `/**
 * ${subjectId.toUpperCase()} Subject Data
 *
 * This file imports assessment data from JSON files and re-exports
 * with proper TypeScript types. Topics are still loaded from topics.ts
 * which handles the markdown content imports.
 */

import type { Quiz, Exam, Project, Exercise } from '../../../core/types';

${imports.join('\n')}

${exports.join('\n')}

// Topics still use TypeScript for Vite's ?raw markdown imports
${reExports.join('\n')}
`;

  await writeFile(join(subjectDir, 'index.ts'), content, 'utf-8');
  console.log(`  ✅ Generated new index.ts`);
}

async function main() {
  console.log('🚀 Starting migration to JSON...\n');

  const subjects = await getSubjectDirs();
  console.log(`Found ${subjects.length} subjects: ${subjects.join(', ')}`);

  // Phase 1: Extract data to JSON
  console.log('\n📋 Phase 1: Extracting data to JSON files...');
  for (const subject of subjects) {
    await migrateSubject(subject);
  }

  // Phase 2: Generate new loader files
  console.log('\n📋 Phase 2: Generating new TypeScript loader files...');
  for (const subject of subjects) {
    await generateLoaderFile(subject);
  }

  console.log('\n✨ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Review the generated JSON files');
  console.log('2. Delete the old .ts data files (quizzes.ts, exams.ts, projects.ts, exercises/*.ts)');
  console.log('3. Update src/data/subjects/index.ts if needed');
  console.log('4. Run npm run build to verify');
}

main().catch(console.error);
