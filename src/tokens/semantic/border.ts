import { neutral, blue } from '../primitives/index.js';

/**
 * Semantic tokens for borders and dividers.
 */
export const border = {
  default: neutral[800],
  subtle: neutral[900],
  focus: blue[500],
} as const;
