import { neutral, red, green, yellow, blue, purple, cyan } from '../primitives/index.js';

/**
 * Semantic tokens for integrated terminal ANSI colors.
 */
export const terminal = {
  background: neutral[950],
  foreground: neutral[50],
  black: neutral[900],
  red: red[500],
  green: green[500],
  yellow: yellow[500],
  blue: blue[500],
  magenta: purple[500],
  cyan: cyan[500],
  white: neutral[100],
} as const;
