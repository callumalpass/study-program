#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

function expandPath(value) {
  if (value === '~') return os.homedir();
  if (value.startsWith('~/') || value.startsWith('~\\')) return path.join(os.homedir(), value.slice(2));
  return value;
}

function optionValue(argv, name, fallback) {
  const index = argv.indexOf(name);
  if (index >= 0 && argv[index + 1]) return argv[index + 1];
  return fallback;
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(expandPath(optionValue(process.argv.slice(2), '--source', '~/content-packs/cs-degree')));
const target = path.join(rootDir, 'content', 'bundled-packs', 'cs-degree');

if (!fs.existsSync(path.join(source, 'pack.yaml'))) {
  console.error(`pack.yaml not found under ${source}`);
  process.exit(1);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.cpSync(source, target, {
  recursive: true,
  filter: (src) => {
    const segments = src.split(path.sep);
    return !segments.includes('.git') && !segments.includes('.github');
  },
});

fs.writeFileSync(
  path.join(target, 'README.md'),
  `# Local cs-degree Content Pack

This directory is an ignored local copy of the external \`cs-degree\` content
pack.

GitHub Pages CI checks out:

\`\`\`text
https://github.com/callumalpass/cs-degree
\`\`\`

into this same path before validating and building the static demo.

The canonical local source is:

\`\`\`text
~/content-packs/cs-degree/
\`\`\`

Use \`npm run content:sync-bundled -- --source ~/content-packs/cs-degree\` to
refresh this local copy from the external pack.
`,
  'utf8',
);

console.log(`Synced ${source} -> ${target}`);
