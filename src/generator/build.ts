import { promises as fs } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import type { ThemeConfig } from '../config/theme.js';
import type { ThemePlugin } from '../plugins/types.js';
import { vscodePlugin } from '../plugins/vscode.js';

/**
 * Alias for ThemeConfig. Maintained for ecosystem backward compatibility.
 */
export type BuildThemeOptions = ThemeConfig;

/**
 * Builds an in-memory theme object using the specified plugin.
 * 
 * @param config - Required configuration options.
 * @param plugin - The target plugin to use (defaults to vscodePlugin for backward compatibility).
 * @returns The generated theme payload.
 */
export function buildTheme<T = unknown>(config: ThemeConfig, plugin: ThemePlugin = vscodePlugin): T {
  return plugin.generate(config) as T;
}

/**
 * Emits the VS Code theme to a JSON file on disk.
 *
 * @param config - Required configuration options.
 * @param plugin - The target plugin to use.
 * @returns A promise that resolves to the absolute path of the written JSON file.
 * @throws {Error} If directory creation or file writing fails.
 */
export async function emitTheme(config: ThemeConfig, plugin: ThemePlugin = vscodePlugin): Promise<string> {
  // 1. Build the theme in memory using the plugin
  const theme = buildTheme(config, plugin);

  // 3. Determine the output path (custom or default)
  const defaultFileName = `meridian-${config.type}-color-theme.json`;
  const defaultThemesDir = resolve(process.cwd(), 'themes');

  const filePath = config.outputPath
    ? resolve(process.cwd(), config.outputPath)
    : join(defaultThemesDir, defaultFileName);

  const outputDir = dirname(filePath);

  try {
    // Ensure the output directory exists securely
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Emission Error: Failed to create output directory at ${outputDir}.\nReason: ${msg}`);
  }

  try {
    // 4. Write the formatted JSON file deterministically
    const payload = JSON.stringify(theme, null, 2);
    await fs.writeFile(filePath, payload, 'utf-8');
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Emission Error: Failed to write theme file to ${filePath}.\nReason: ${msg}`);
  }

  // 5. Return the absolute path of the generated file
  return filePath;
}
