import { promises as fs } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import type { ThemeConfig } from '../config/theme.js';
import type { ThemePlugin } from '../plugins/types.js';
import { vscodePlugin } from '../plugins/vscode.js';
import { buildTheme, emitTheme } from './build.js';

export interface BuildResult {
  readonly rebuiltModules: readonly string[];
  readonly skippedModules: readonly string[];
  readonly buildTime: number;
  readonly outputFiles: readonly string[];
}

interface CacheData {
  primitivesHash: string;
  semanticHash: string;
  workbenchHash: string;
  textmateHash: string;
}

const CACHE_FILE = '.meridian-cache.json';

/**
 * Computes a SHA-256 hash of all TypeScript files in a given directory.
 * Used to track changes in primitive and semantic token directories.
 * 
 * @param dirPath - The absolute path to the directory to hash.
 * @returns A promise resolving to the hex digest of the hash, or an empty string if the directory is missing.
 */
async function hashDirectory(dirPath: string): Promise<string> {
  try {
    const files = await fs.readdir(dirPath);
    let combined = '';
    for (const file of files.sort()) {
      if (!file.endsWith('.ts')) continue;
      const content = await fs.readFile(resolve(dirPath, file), 'utf-8');
      combined += content;
    }
    return createHash('sha256').update(combined).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Computes a SHA-256 hash of a single file's contents.
 * Used to track changes in mapping definitions.
 * 
 * @param filePath - The absolute path to the file to hash.
 * @returns A promise resolving to the hex digest of the hash, or an empty string if the file is missing.
 */
async function hashFile(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return createHash('sha256').update(content).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Reads the incremental build cache from the `.meridian-cache.json` file.
 * 
 * @param cwd - The current working directory containing the cache file.
 * @returns A promise resolving to the CacheData object, or null if the cache does not exist.
 */
async function readCache(cwd: string): Promise<CacheData | null> {
  try {
    const content = await fs.readFile(resolve(cwd, CACHE_FILE), 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Writes the new incremental build cache to the `.meridian-cache.json` file.
 * 
 * @param cwd - The current working directory.
 * @param data - The new CacheData payload to persist.
 */
async function writeCache(cwd: string, data: CacheData): Promise<void> {
  await fs.writeFile(resolve(cwd, CACHE_FILE), JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Executes an incremental build of the theme, skipping I/O operations and tracking module changes.
 */
export async function incrementalBuild(
  config: ThemeConfig,
  plugin: ThemePlugin = vscodePlugin
): Promise<BuildResult> {
  const startTime = performance.now();
  const cwd = process.cwd();

  const [
    primitivesHash,
    semanticHash,
    workbenchHash,
    textmateHash,
    oldCache
  ] = await Promise.all([
    hashDirectory(resolve(cwd, 'src/tokens/primitives')),
    hashDirectory(resolve(cwd, 'src/tokens/semantic')),
    hashFile(resolve(cwd, 'src/mappings/workbench.ts')),
    hashFile(resolve(cwd, 'src/mappings/textmate.ts')),
    readCache(cwd)
  ]);

  const newCache: CacheData = {
    primitivesHash,
    semanticHash,
    workbenchHash,
    textmateHash
  };

  const rebuiltModules: string[] = [];
  const skippedModules: string[] = [];

  let primitivesChanged = false;
  let semanticChanged = false;
  let workbenchChanged = false;
  let textmateChanged = false;

  if (!oldCache || oldCache.primitivesHash !== primitivesHash) {
    primitivesChanged = true;
    rebuiltModules.push('tokens/primitives');
  } else {
    skippedModules.push('tokens/primitives');
  }

  if (primitivesChanged || !oldCache || oldCache.semanticHash !== semanticHash) {
    semanticChanged = true;
    if (!rebuiltModules.includes('tokens/semantic')) rebuiltModules.push('tokens/semantic');
  } else {
    skippedModules.push('tokens/semantic');
  }

  if (semanticChanged || !oldCache || oldCache.workbenchHash !== workbenchHash) {
    workbenchChanged = true;
    rebuiltModules.push('mappings/workbench');
  } else {
    skippedModules.push('mappings/workbench');
  }

  if (semanticChanged || !oldCache || oldCache.textmateHash !== textmateHash) {
    textmateChanged = true;
    rebuiltModules.push('mappings/textmate');
  } else {
    skippedModules.push('mappings/textmate');
  }

  // Generate payload in memory (O(1) highly optimized operation)
  const themePayload = buildTheme(config, plugin);
  const jsonOutput = JSON.stringify(themePayload, null, 2);

  const defaultFileName = `meridian-${config.type}-color-theme.json`;
  const defaultThemesDir = resolve(cwd, 'themes');
  const filePath = config.outputPath 
    ? resolve(cwd, config.outputPath)
    : join(defaultThemesDir, defaultFileName);

  let outputFiles: string[] = [];
  let fileChanged = true;

  try {
    const existingContent = await fs.readFile(filePath, 'utf-8');
    if (existingContent === jsonOutput) {
      fileChanged = false;
    }
  } catch {
    // File doesn't exist, needs write
  }

  if (fileChanged) {
    await emitTheme(config, plugin);
    rebuiltModules.push('generator/emitTheme');
    outputFiles = [filePath];
  } else {
    skippedModules.push('generator/emitTheme');
  }

  await writeCache(cwd, newCache);

  const buildTime = performance.now() - startTime;

  return {
    rebuiltModules,
    skippedModules,
    buildTime,
    outputFiles
  };
}
