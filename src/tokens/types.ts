/**
 * Defines the keys available in a standard primitive color scale.
 */
export type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/**
 * A primitive color palette representing raw color values without semantic meaning.
 * Each scale value maps to a hexadecimal color string.
 */
export type PrimitivePalette = {
  readonly [K in ColorScale]: string;
};

/**
 * The names of all supported primitive color palettes.
 */
export type PrimitiveColorName =
  | 'neutral'
  | 'blue'
  | 'green'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'purple'
  | 'cyan';
