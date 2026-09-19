import type { ThemeConfig } from '../config/theme.js';

/**
 * Represents a target-specific theme generator.
 */
export interface ThemePlugin {
  /** The unique name of the plugin (e.g. 'vscode', 'jetbrains'). */
  readonly name: string;
  
  /** 
   * Generates the target-specific theme payload.
   * 
   * @param theme - The core theme configuration.
   * @returns The generated theme payload.
   */
  generate(theme: ThemeConfig): unknown;
}
