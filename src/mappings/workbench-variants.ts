import { buildWorkbench, type WorkbenchColors } from './workbench.js';
import { makeVariant, variantSpecs, type VariantName } from '../tokens/variants.js';

/**
 * Workbench color maps for the six minimal tinted-dark variants.
 *
 * Same `buildWorkbench()` factory and identical key set as Meridian Dark /
 * Ultimate — only the palette differs (a hue-tinted ramp per {@link variantSpecs}).
 * Syntax (`tokenColors` + `semanticTokenColors`) is shared and untouched.
 */
export const variantWorkbenches = Object.fromEntries(
  (Object.keys(variantSpecs) as VariantName[]).map((name) => [
    name,
    buildWorkbench(makeVariant(variantSpecs[name])),
  ])
) as Record<VariantName, WorkbenchColors>;
