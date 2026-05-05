import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

export function nowIso() {
  return new Date().toISOString();
}

export function makeAttemptId(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    'T',
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    'Z',
  ].join('');
}

export function parseCliArgs(argv) {
  const positional = [];
  const options = {};

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) {
      positional.push(token);
      continue;
    }

    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      if (options[key] === undefined) {
        options[key] = true;
      } else if (Array.isArray(options[key])) {
        options[key].push(true);
      } else {
        options[key] = [options[key], true];
      }
      continue;
    }

    if (options[key] === undefined) {
      options[key] = next;
    } else if (Array.isArray(options[key])) {
      options[key].push(next);
    } else {
      options[key] = [options[key], next];
    }
    i += 1;
  }

  return { positional, options };
}

export function optionValues(options, key) {
  const value = options[key];
  if (value === undefined || value === false) return [];
  return Array.isArray(value) ? value.map(String) : [String(value)];
}

export function firstOptionValue(options, key) {
  return optionValues(options, key)[0];
}

export function fail(message, code = 1) {
  console.error(`Error: ${message}`);
  process.exit(code);
}

export function ensureOption(options, key, message) {
  if (!options[key]) {
    fail(message);
  }
  return String(options[key]);
}

export function relativeFromCwd(targetPath, cwd = process.cwd()) {
  return path.relative(cwd, targetPath) || '.';
}

export function openInEditor(filePath) {
  const editor = process.env.EDITOR || process.env.VISUAL || 'vi';
  const result = spawnSync(editor, [filePath], { stdio: 'inherit' });
  if (result.error) {
    fail(`failed to open editor ${editor}: ${result.error.message}`);
  }
  if (typeof result.status === 'number' && result.status !== 0) {
    fail(`editor exited with status ${result.status}`);
  }
}

export function asNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function truncate(value, max = 120) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 3)}...`;
}
