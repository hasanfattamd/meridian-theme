import type { PrimitivePalette } from '../types.js';

/**
 * Immutable primitive palette for teal.
 *
 * Anchored on the JetBrains "Islands Dark" accent used for JSX/HTML custom
 * component tags (`HTML_CUSTOM_TAG_NAME` = #2FBAA3), regexp literals
 * (`JS.REGEXP` = #42C3D4) and type parameters (`TYPE_PARAMETER_NAME` = #16BAAC).
 * Kept distinct from `cyan`, which carries numeric literals (#2AACB8).
 */
export const teal: PrimitivePalette = {
  50: '#F0FBFA',
  100: '#D3F4F0',
  200: '#A6E9E1',
  300: '#42C3D4',
  400: '#2FBAA3',
  500: '#16BAAC',
  600: '#0F8C81',
  700: '#0B6A62',
  800: '#084B45',
  900: '#052E2B',
  950: '#021715',
} as const;
