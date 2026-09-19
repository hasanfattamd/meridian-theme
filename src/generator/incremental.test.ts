import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { incrementalBuild } from './incremental.js';

describe('Incremental Build System', () => {
  const cachePath = resolve(process.cwd(), '.meridian-cache.json');
  const config = { name: 'Meridian Incremental Test', type: 'dark' as const };

  beforeEach(async () => {
    // Clear cache before each test to simulate cold start
    try {
      await fs.unlink(cachePath);
    } catch {
      // Ignore if doesn't exist
    }
  });

  afterAll(async () => {
    try {
      await fs.unlink(cachePath);
    } catch {
      // Cleanup
    }
  });

  it('should rebuild all modules on cold start', async () => {
    const result = await incrementalBuild(config);
    expect(result.rebuiltModules).toContain('tokens/primitives');
    expect(result.rebuiltModules).toContain('tokens/semantic');
    expect(result.rebuiltModules).toContain('mappings/workbench');
    expect(result.rebuiltModules).toContain('mappings/textmate');
    // It should skip emitTheme if the file was just written by another test and hasn't changed,
    // but on a completely fresh repo it would write. We can just test the dependency modules.
    expect(result.buildTime).toBeGreaterThanOrEqual(0);
  });

  it('should skip modules if cache is warm and nothing changed', async () => {
    // Cold start
    await incrementalBuild(config);
    
    // Warm start
    const result = await incrementalBuild(config);
    expect(result.skippedModules).toContain('tokens/primitives');
    expect(result.skippedModules).toContain('tokens/semantic');
    expect(result.skippedModules).toContain('mappings/workbench');
    expect(result.skippedModules).toContain('mappings/textmate');
    expect(result.skippedModules).toContain('generator/emitTheme');
    expect(result.rebuiltModules).toHaveLength(0);
    expect(result.outputFiles).toHaveLength(0);
  });
});
