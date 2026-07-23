import { green, red, yellow, blue } from '../primitives/index.js';

/**
 * Semantic tokens for interactive and feedback states.
 */
export const state = {
  success: green[500],
  error: red[500],
  warning: yellow[500],
  info: blue[500],
} as const;
