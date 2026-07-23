import { green, red, yellow, blue } from '../primitives/index.js';

/**
 * Semantic tokens for version control UI.
 */
export const git = {
  added: green[400],
  modified: yellow[400],
  deleted: red[400],
  untracked: green[500],
  conflicting: red[500],
} as const;
