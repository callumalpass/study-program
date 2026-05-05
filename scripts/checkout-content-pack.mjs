#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

function optionValue(argv, name, fallback) {
  const index = argv.indexOf(name);
  if (index >= 0 && argv[index + 1]) return argv[index + 1];
  return fallback;
}

function hasFlag(argv, name) {
  return argv.includes(name);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    ...options,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const argv = process.argv.slice(2);

if (hasFlag(argv, '--help') || hasFlag(argv, '-h')) {
  console.log(`Usage: npm run content:checkout -- [--repo <url>] [--ref <ref>] [--target <path>]

Options:
  --repo    Git repository URL. Defaults to https://github.com/callumalpass/cs-degree.git
  --ref     Branch, tag, or SHA to check out. Defaults to main
  --target  Destination path. Defaults to content/bundled-packs/cs-degree
`);
  process.exit(0);
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = optionValue(
  argv,
  '--repo',
  process.env.STUP_CS_DEGREE_REPO ?? 'https://github.com/callumalpass/cs-degree.git',
);
const ref = optionValue(argv, '--ref', process.env.STUP_CS_DEGREE_REF ?? 'main');
const target = path.resolve(
  rootDir,
  optionValue(argv, '--target', 'content/bundled-packs/cs-degree'),
);

if (fs.existsSync(path.join(target, '.git'))) {
  run('git', ['-C', target, 'fetch', '--depth', '1', 'origin', ref]);
  run('git', ['-C', target, 'checkout', '--detach', 'FETCH_HEAD']);
  console.log(`Checked out ${repo}#${ref} in ${path.relative(rootDir, target)}`);
  process.exit(0);
}

if (fs.existsSync(path.join(target, 'pack.yaml'))) {
  console.log(`${path.relative(rootDir, target)} already contains a content pack`);
  process.exit(0);
}

if (fs.existsSync(target) && fs.readdirSync(target).length > 0) {
  console.error(`${path.relative(rootDir, target)} exists and is not an empty content-pack checkout`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(target), { recursive: true });
run('git', ['clone', '--depth', '1', '--branch', ref, repo, target]);
console.log(`Checked out ${repo}#${ref} in ${path.relative(rootDir, target)}`);
