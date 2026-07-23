import { neutral } from '../primitives/index.js';

/**
 * Semantic tokens for typography.
 */
export const text = {
  primary: neutral[50],
  secondary: neutral[300],
  muted: neutral[500],
  inverse: neutral[950],
} as const;
