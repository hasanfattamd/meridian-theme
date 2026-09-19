import type { ThemePlugin } from './types.js';
import type { ThemeConfig } from '../config/theme.js';
import {
  workbenchMapping,
  textMateMappings,
  semanticTokenColors,
  type WorkbenchColors,
  type TextMateRule,
  type SemanticTokenStyle,
} from '../mappings/index.js';
import { darkModernColors } from '../mappings/workbench-ultimate.js';
import { variantWorkbenches } from '../mappings/workbench-variants.js';
import { validateTheme } from '../generator/validate.js';

/**
 * A strongly typed, in-memory representation of a VS Code theme payload.
 */
export interface VSCodeTheme {
  readonly name: string;
  readonly type: 'dark' | 'light';
  readonly semanticHighlighting: boolean;
  readonly colors: WorkbenchColors | Record<string, string>;
  readonly tokenColors: readonly TextMateRule[];
  readonly semanticTokenColors: Readonly<Record<string, string | SemanticTokenStyle>>;
  readonly metadata?: Record<string, unknown>;
}

/**
 * The VS Code theme plugin.
 * Consumes the base theme configuration and merges it with VS Code specific mappings.
 * 
 * Workbench chrome is variant-specific; syntax (`tokenColors` +
 * `semanticTokenColors`) is identical for every variant:
 *   - 'default'  → Islands Dark chrome
 *   - 'ultimate' → VS Code Dark Modern chrome
 *   - 'noir' | 'fire' | 'luxe' | 'midnight-glow' | 'elegance' | 'deep-sea'
 *                → minimal single-hue tinted-dark chrome
 */
export const vscodePlugin: ThemePlugin = {
  name: 'vscode',
  generate(theme: ThemeConfig): VSCodeTheme {
    const variant = theme.variant ?? 'default';
    const colors =
      variant === 'ultimate'
        ? darkModernColors
        : (variantWorkbenches as Record<string, WorkbenchColors>)[variant] ?? workbenchMapping;

    const vscodeTheme: VSCodeTheme = {
      name: theme.name,
      type: theme.type,
      semanticHighlighting: true,
      colors,
      tokenColors: textMateMappings,
      semanticTokenColors,
      ...(theme.metadata ? { metadata: theme.metadata } : {})
    };

    // The validation engine is specifically tied to VS Code semantics for now.
    // In the future, validateTheme could be injected or specific to the plugin.
    validateTheme(vscodeTheme);
    return vscodeTheme;
  }
};
