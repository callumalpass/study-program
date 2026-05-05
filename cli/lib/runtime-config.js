import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { defaultBundledPackDir, loadPackManifest } from './content-pack.js';
import { firstOptionValue, optionValues } from './utils.js';

function appDataRoot(kind) {
  const home = os.homedir();
  if (process.platform === 'darwin') {
    if (kind === 'cache') return path.join(home, 'Library', 'Caches', 'stup');
    return path.join(home, 'Library', 'Application Support', 'stup');
  }
  if (process.platform === 'win32') {
    if (kind === 'cache') return path.join(process.env.LOCALAPPDATA || path.join(home, 'AppData', 'Local'), 'stup', 'cache');
    return path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'stup');
  }
  if (kind === 'cache') return path.join(home, '.cache', 'stup');
  return path.join(home, '.local', 'share', 'stup');
}

export function defaultContentHome() {
  return path.join(appDataRoot('data'), 'packs');
}

export function defaultLearnerHome() {
  return path.join(appDataRoot('data'), 'learner');
}

export function defaultCacheHome() {
  return appDataRoot('cache');
}

export function defaultConfigPath() {
  if (process.env.STUP_CONFIG) return expandPath(process.env.STUP_CONFIG);
  if (process.platform === 'win32') {
    return path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'stup', 'config.yaml');
  }
  return path.join(os.homedir(), '.config', 'stup', 'config.yaml');
}

export function expandPath(value) {
  if (!value) return value;
  if (value === '~') return os.homedir();
  if (value.startsWith('~/') || value.startsWith('~\\')) {
    return path.join(os.homedir(), value.slice(2));
  }
  return value;
}

function splitEnvPaths(value) {
  if (!value) return [];
  return value.split(path.delimiter).map((entry) => entry.trim()).filter(Boolean);
}

function readUserConfig(configPath = defaultConfigPath()) {
  if (!fs.existsSync(configPath)) return {};
  const parsed = parseYaml(fs.readFileSync(configPath, 'utf8'));
  return parsed && typeof parsed === 'object' ? parsed : {};
}

export function writeUserConfig(config, configPath = defaultConfigPath()) {
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, stringifyYaml(config), 'utf8');
  return config;
}

function discoverPackDirs(contentHomes, enabledPacks) {
  const dirs = [];
  for (const contentHome of contentHomes) {
    if (!fs.existsSync(contentHome)) continue;
    const entries = fs.readdirSync(contentHome, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const packDir = path.join(contentHome, entry.name);
      if (!fs.existsSync(path.join(packDir, 'pack.yaml'))) continue;
      if (enabledPacks.length === 0) {
        dirs.push(packDir);
        continue;
      }
      try {
        const manifest = loadPackManifest(packDir);
        if (enabledPacks.includes(manifest.id) || enabledPacks.includes(entry.name)) {
          dirs.push(packDir);
        }
      } catch {
        // Ignore invalid candidates here; validation reports real failures.
      }
    }
  }
  return dirs;
}

function uniquePaths(paths) {
  const seen = new Set();
  const out = [];
  for (const item of paths.map((entry) => path.resolve(expandPath(entry)))) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

export function resolveRuntimeConfig({ rootDir, options = {}, includeBundledFallback = true } = {}) {
  const userConfig = readUserConfig();
  const cliContentHomes = optionValues(options, 'content-home');
  const envContentHomes = splitEnvPaths(process.env.STUP_CONTENT_HOME);
  const configContentHomes = Array.isArray(userConfig.contentHomes) ? userConfig.contentHomes : [];
  const contentHomes = uniquePaths(
    cliContentHomes.length > 0
      ? cliContentHomes
      : envContentHomes.length > 0
        ? envContentHomes
        : configContentHomes.length > 0
          ? configContentHomes
          : [defaultContentHome()],
  );

  const explicitPackDirs = uniquePaths(optionValues(options, 'content-pack'));
  const cliEnabledPacks = optionValues(options, 'enable');
  const configEnabledPacks = Array.isArray(userConfig.enabledPacks) ? userConfig.enabledPacks.map(String) : [];
  const enabledPacks = cliEnabledPacks.length > 0 ? cliEnabledPacks : configEnabledPacks;
  const discoveredPackDirs = explicitPackDirs.length > 0 ? [] : discoverPackDirs(contentHomes, enabledPacks);
  const bundledPackDir = rootDir ? defaultBundledPackDir(rootDir) : null;
  const fallbackPackDirs = includeBundledFallback && bundledPackDir && fs.existsSync(path.join(bundledPackDir, 'pack.yaml'))
    ? [bundledPackDir]
    : [];
  const contentPackDirs = uniquePaths([
    ...explicitPackDirs,
    ...discoveredPackDirs,
    ...(explicitPackDirs.length === 0 && discoveredPackDirs.length === 0 ? fallbackPackDirs : []),
  ]);

  const learnerHome = path.resolve(expandPath(
    firstOptionValue(options, 'learner-home') ||
    process.env.STUP_LEARNER_HOME ||
    userConfig.learnerHome ||
    defaultLearnerHome(),
  ));
  const cacheHome = path.resolve(expandPath(
    firstOptionValue(options, 'cache-home') ||
    process.env.STUP_CACHE_HOME ||
    userConfig.cacheHome ||
    defaultCacheHome(),
  ));
  const authoringPack = firstOptionValue(options, 'authoring-pack') || userConfig.authoringPack || null;

  return {
    configPath: defaultConfigPath(),
    contentHomes,
    contentPackDirs,
    enabledPacks,
    learnerHome,
    cacheHome,
    authoringPack,
    userConfig,
  };
}

export function summarizeRuntimeConfig(config) {
  return {
    configPath: config.configPath,
    contentHomes: config.contentHomes,
    contentPackDirs: config.contentPackDirs,
    enabledPacks: config.enabledPacks,
    learnerHome: config.learnerHome,
    cacheHome: config.cacheHome,
    authoringPack: config.authoringPack,
  };
}
