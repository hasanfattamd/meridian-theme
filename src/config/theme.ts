/**
 * Configuration options for generating a theme.
 * 
 * Supports generating multiple theme variants from the same compiler pipeline.
 */
export interface ThemeConfig {
  /** The display name of the theme inside VS Code. */
  readonly name: string;
  
  /** The base type of the theme, affecting standard OS UI behaviors. */
  readonly type: 'dark' | 'light';
  
  /**
   * The theme variant to generate. Drives which workbench palette is emitted;
   * every variant shares the same syntax colors.
   *
   * `'default'` (Islands Dark chrome) · `'ultimate'` (Dark Modern chrome) ·
   * `'noir'` · `'fire'` · `'luxe'` · `'midnight-glow'` · `'elegance'` · `'deep-sea'`
   * (minimal single-hue tinted-dark chrome).
   */
  readonly variant?:
    | 'default'
    | 'ultimate'
    | 'noir'
    | 'fire'
    | 'luxe'
    | 'midnight-glow'
    | 'elegance'
    | 'deep-sea'
    | 'slate'
    | 'deep-wine'
    | 'forest'
    | 'umbra'
    | 'polar-night';
  
  /** Optional custom output file path for the generated theme. */
  readonly outputPath?: string;
  
  /** Optional metadata to inject into the theme (e.g. semanticHighlighting, author). */
  readonly metadata?: Record<string, unknown>;
}
