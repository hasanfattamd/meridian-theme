import type { PrimitivePalette } from '../types.js';

/**
 * Immutable primitive palette for gold.
 *
 * Anchored on the JetBrains "Islands Dark" markup/metadata family:
 * HTML & XML tag names (`HTML_TAG_NAME` = #D5B778) sit at `400`, and the
 * more olive annotation/decorator accent (`DEFAULT_METADATA` = #B3AE60)
 * sits at `500`. Distinct from `yellow`, which is reserved for warning and
 * VCS-modified states.
 */
export const gold: PrimitivePalette = {
  50: '#FBF8F0',
  100: '#F5ECD6',
  200: '#EBDBB0',
  300: '#E0C892',
  400: '#D5B778',
  500: '#B3AE60',
  600: '#8E8A49',
  700: '#6B6837',
  800: '#4A4825',
  900: '#2C2B15',
  950: '#17160A',
} as const;
