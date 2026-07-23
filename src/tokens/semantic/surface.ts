import { neutral } from '../primitives/index.js';

/**
 * Semantic tokens for UI surfaces (backgrounds, sidebars, panels).
 * @remarks These map to primitives instead of raw hex values.
 */
export const surface = {
  main: neutral[900],
  sidebar: neutral[950],
  panel: neutral[950],
  header: neutral[800],
  hover: neutral[800],
  active: neutral[700],
} as const;
