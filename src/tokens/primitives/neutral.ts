import type { PrimitivePalette } from '../types.js';

/**
 * Immutable primitive palette for neutral.
 *
 * Calibrated to JetBrains "Islands Dark":
 *  - the `gray-*` ramp from `ManyIslandsDark.theme.json` (workbench surfaces)
 *  - `#BCBEC4` / `#7A7E85` are the literal `TEXT` and `DEFAULT_LINE_COMMENT`
 *    foregrounds from `IslandSchemeDark.xml` and are pinned exactly.
 */
export const neutral: PrimitivePalette = {
  50: '#FFFFFF',
  100: '#DFE1E5', //  bright UI text
  200: '#BCBEC4', //  editor foreground            (TEXT)
  300: '#9FA2A8', //  secondary text               (gray-100)
  400: '#8B8E94', //  muted text                   (gray-90)
  500: '#7A7E85', //  comments / disabled          (DEFAULT_LINE_COMMENT)
  600: '#4B5059', //  line numbers / faint borders (LINE_NUMBERS_COLOR)
  700: '#33353B', //  hover / selection surfaces   (gray-40)
  800: '#212326', //  panels, headers, insets      (gray-20)
  900: '#191A1C', //  editor & sidebar background  (gray-10)
  950: '#141517', //  shadow / terminal ground
} as const;
