#!/usr/bin/env node
/**
 * Subject Import Validation Script
 *
 * Uses Vite SSR to validate that all subject TypeScript modules import correctly.
 * This catches broken imports, TypeScript errors, and missing exports.
 *
 * Usage:
 *   node scripts/validate-imports.mjs    # Validate all subjects
 *   npm run validate                     # Same
 *
 * For content quality analysis, use: npm run quality
 */

import { createServer } from 'vite';
import { readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Expected exports for each subject
const EXPECTED_EXPORTS = ['Topics', 'Quizzes', 'Exercises', 'Projects', 'Exams'];

// Create Vite server for SSR module loading
async function createViteServer(projectRoot) {
  const server = await createServer({
    root: projectRoot,
    configFile: join(projectRoot, 'vite.config.ts'),
    server: { middlewareMode: true },
    logLevel: 'silent',
    optimizeDeps: { disabled: true },
  });
  return server;
}

// Validate a single subject's imports
async function validateSubject(vite, subjectId) {
  const modulePath = `/src/subjects/${subjectId}/index.ts`;
  const result = {
    id: subjectId,
    valid: true,
    exports: [],
    missingExports: [],
    error: null,
  };

  try {
    const module = await vite.ssrLoadModule(modulePath);

    // Check for expected exports
    for (const suffix of EXPECTED_EXPORTS) {
      const exportName = `${subjectId}${suffix}`;
      if (exportName in module) {
        const value = module[exportName];
        const count = Array.isArray(value) ? value.length : 0;
        result.exports.push({ name: exportName, count });
      } else {
        result.missingExports.push(exportName);
      }
    }

    // If any exports are missing, mark as invalid
    if (result.missingExports.length > 0) {
      result.valid = false;
    }
  } catch (error) {
    result.valid = false;
    result.error = error.message;
  }

  return result;
}

// Print validation results
function printResults(results) {
  const valid = results.filter(r => r.valid);
  const invalid = results.filter(r => !r.valid);

  console.log(`\n${'═'.repeat(70)}`);
  console.log('  IMPORT VALIDATION RESULTS');
  console.log(`${'═'.repeat(70)}\n`);

  // Summary
  const validColor = '\x1b[32m';
  const invalidColor = '\x1b[31m';
  const reset = '\x1b[0m';

  console.log(`  Valid:   ${validColor}${valid.length}${reset}`);
  console.log(`  Invalid: ${invalidColor}${invalid.length}${reset}`);
  console.log(`  Total:   ${results.length}\n`);

  // Valid subjects (brief)
  if (valid.length > 0) {
    console.log('  VALID SUBJECTS:');
    for (const r of valid.sort((a, b) => a.id.localeCompare(b.id))) {
      const exportCounts = r.exports.map(e => `${e.name.replace(r.id, '')}:${e.count}`).join(' ');
      console.log(`     ${validColor}✓${reset} ${r.id.padEnd(10)} ${exportCounts}`);
    }
    console.log('');
  }

  // Invalid subjects (detailed)
  if (invalid.length > 0) {
    console.log('  INVALID SUBJECTS:');
    for (const r of invalid.sort((a, b) => a.id.localeCompare(b.id))) {
      console.log(`     ${invalidColor}✗${reset} ${r.id}`);
      if (r.error) {
        // Truncate long error messages
        const errorLines = r.error.split('\n').slice(0, 3);
        for (const line of errorLines) {
          console.log(`        ${line.substring(0, 80)}`);
        }
      }
      if (r.missingExports.length > 0) {
        console.log(`        Missing: ${r.missingExports.join(', ')}`);
      }
    }
    console.log('');
  }

  return invalid.length === 0;
}

// Main function
async function main() {
  const projectRoot = join(__dirname, '..');
  const subjectsDir = join(projectRoot, 'src', 'subjects');

  console.log('\n  Starting Vite server for import validation...');

  // Create Vite server
  let vite;
  try {
    vite = await createViteServer(projectRoot);
  } catch (error) {
    console.error('Failed to create Vite server:', error);
    process.exit(1);
  }

  console.log('  Vite server ready. Validating imports...');

  // Get all subjects
  const subjectDirs = await readdir(subjectsDir);
  const results = [];

  for (const subjectId of subjectDirs) {
    const subjectPath = join(subjectsDir, subjectId);
    const subjectStat = await stat(subjectPath);

    if (subjectStat.isDirectory() && !subjectId.startsWith('.')) {
      const result = await validateSubject(vite, subjectId);
      results.push(result);
    }
  }

  // Close Vite server
  await vite.close();

  // Print results
  const allValid = printResults(results);

  if (allValid) {
    console.log(`${'═'.repeat(70)}`);
    console.log('  VALIDATION PASSED');
    console.log(`${'═'.repeat(70)}\n`);
    process.exit(0);
  } else {
    console.log(`${'═'.repeat(70)}`);
    console.log('  VALIDATION FAILED');
    console.log(`${'═'.repeat(70)}\n`);
    process.exit(1);
  }
}

main().catch(console.error);
