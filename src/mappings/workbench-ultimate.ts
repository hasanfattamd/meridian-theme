import { buildWorkbench, type WorkbenchColors } from './workbench.js';
import { darkModern } from '../tokens/dark-modern.js';

/**
 * Meridian Dark Ultimate — VS Code **Dark Modern** workbench chrome.
 *
 * Same `buildWorkbench()` factory and the exact same key set as Meridian Dark,
 * fed the Dark Modern palette instead of the Islands one. The syntax layer
 * (`tokenColors` + `semanticTokenColors`) is untouched and shared, so both
 * variants highlight code identically — only the UI shell differs:
 *
 *   Meridian Dark          → Islands Dark chrome (islands greys, blue islands, gold tabs)
 *   Meridian Dark Ultimate → Dark Modern chrome  (#1F1F1F editor, #181818 rails, #0078D4 accent)
 */
export const darkModernColors: WorkbenchColors = buildWorkbench(darkModern);
