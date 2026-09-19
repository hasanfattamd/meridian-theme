import { mix, lighten, darken, withAlpha, relativeLuminance } from '../utils/color.js';
import { state as islandsState, git as islandsGit, terminal as islandsTerminal } from './semantic/index.js';
import type { WorkbenchTokens } from '../mappings/workbench.js';

/**
 * Minimal tinted-dark UI variants.
 *
 * Each is a *UI-only* variant: it shares Meridian Dark's exact `tokenColors` +
 * `semanticTokenColors` (Islands Dark syntax), and only re-skins the workbench —
 * the whole neutral ramp is tinted toward one base hue, with that base color as
 * the editor background and the darkest surface. Diagnostics, git and diff
 * colors stay on the shared Islands values so they read the same everywhere.
 *
 * Base colors were checked for mutual CIE ΔE separation (every pair ≥ ~4.5) so
 * no two variants look alike; see the collision analysis that produced them.
 */
export interface VariantSpec {
  /** Editor background = darkest surface. */
  readonly base: string;
  /** Restrained, hue-matched interactive accent. */
  readonly accent: string;
}

export const variantSpecs = {
  noir: { base: '#05070E', accent: '#4C7CC0' }, //            cool blue-black
  fire: { base: '#130A07', accent: '#C0764C' }, //            warm ember
  luxe: { base: '#12100A', accent: '#BE9E5C' }, //            deep gold
  'midnight-glow': { base: '#0C0A11', accent: '#8574B8' }, // soft violet
  elegance: { base: '#181511', accent: '#A38C74' }, //        warm greige (lightest)
  'deep-sea': { base: '#04110C', accent: '#3E9585' }, //      teal depth
  slate: { base: '#191A1C', accent: '#5E7793' }, //           neutral Islands grey, muted blue accent
  'deep-wine': { base: '#1A0A14', accent: '#B0617E' }, //     muted berry / wine
  forest: { base: '#10190A', accent: '#6FA05C' }, //          muted moss / forest green
  umbra: { base: '#0E0D1F', accent: '#6E72B8' }, //           deep indigo, between blue and violet
  'polar-night': { base: '#0D1721', accent: '#5E93B0' }, //   cool steel-blue
} as const satisfies Record<string, VariantSpec>;

export type VariantName = keyof typeof variantSpecs;

/** Neutral the ramp climbs toward — mixing toward one shared grey keeps the
 * perceptual step size consistent across every variant, and gently desaturates
 * higher surfaces so the chrome stays calm. */
const RAMP_GREY = '#6E6E73';

/** Blend `amt` (0–1) of `base` into a neutral grey — keeps the grey's lightness, adopts the hue. */
const tint = (grey: string, base: string, amt: number): string => mix(grey, base, 1 - amt);

/**
 * Derive a full {@link WorkbenchTokens} palette from a base color + accent.
 * `L(amt)` walks the ramp up from `base` toward {@link RAMP_GREY}, so every
 * surface, border and guide is a hue-consistent tint of the one base color.
 */
export function makeVariant({ base, accent: acc }: VariantSpec): WorkbenchTokens {
  const L = (amt: number): string => mix(RAMP_GREY, base, amt);
  /** Legible foreground for text/icons sitting on the accent fill. */
  const onAccent = relativeLuminance(acc) > 0.22 ? '#17120B' : '#FFFFFF';

  return {
    surface: {
      main: base,
      sidebar: base,
      panel: base,
      inset: L(0.035),
      raised: L(0.06),
      header: L(0.06),
      chrome: L(0.1),
      feedback: L(0.15),
      widget: L(0.05),
      hover: '#FFFFFF12',
      active: mix(acc, base, 0.3),
      line: L(0.05),
    },
    text: {
      primary: tint('#D1D3D9', base, 0.06),
      editor: tint('#BCBEC4', base, 0.05),
      secondary: tint('#9FA2A8', base, 0.1),
      muted: tint('#73767C', base, 0.14),
      faint: tint('#4B5059', base, 0.22),
      disabled: tint('#4C4F56', base, 0.22),
      link: lighten(acc, 6),
      inverse: onAccent,
    },
    border: {
      default: L(0.075),
      divider: L(0.075),
      subtle: L(0.075),
      popup: L(0.12),
      control: L(0.17),
      active: L(0.28),
      strong: L(0.14),
    },
    accent: {
      primary: acc,
      hover: lighten(acc, 7),
      active: darken(acc, 7),
      selection: mix(acc, base, 0.24),
      selectionInactive: mix(acc, base, 0.12),
      caret: tint('#CED0D6', base, 0.1),
      tabActiveBg: mix(acc, base, 0.13),
      tabActiveBorder: acc,
    },
    state: { ...islandsState },
    git: { ...islandsGit },
    terminal: { ...islandsTerminal, background: base, foreground: tint('#BCBEC4', base, 0.05) },
    extras: {
      lineNumber: tint('#4B5059', base, 0.22),
      lineNumberActive: tint('#A1A3AB', base, 0.12),
      indentGuide: L(0.26), //        dev-visible, sits ≈ level with the selection wash
      indentGuideActive: L(0.48),
      treeGuide: L(0.5), //           bolder — Explorer/Outline nesting, no selection to blend into
      treeGuideInactive: L(0.3),
      whitespace: L(0.11), //         quiet dots when whitespace renders on selection
      ruler: L(0.16),
      bracketMatchBg: L(0.24),
      wordHighlight: withAlpha(L(0.42), 0.25),
      wordHighlightStrong: withAlpha(L(0.55), 0.3),
      listInactiveSelection: L(0.12),
      hoverWash: '#FFFFFF14',
      hoverWashSubtle: '#FFFFFF0D',
      activeWash: '#FFFFFF24',
      sepWash: '#FFFFFF33',
      sliderBg: '#8080803D',
      sliderHover: '#80808066',
      sliderActive: '#80808099',
      sliderMiniBg: '#8080801F',
      sliderMiniHover: '#8080803D',
      sliderMiniActive: '#8080805C',
      inlayFg: tint('#868A91', base, 0.18),
      shadow: '#00000066',
      findCurrent: '#1A6070',
      findOther: withAlpha('#12586A', 0.5),
      rangeHighlight: '#FFFFFF0A',
      hoverHighlight: withAlpha(acc, 0.12),
      foldBg: '#FFFFFF0A',
      stackFrame: withAlpha(acc, 0.22),
      stackFrameFocused: withAlpha(acc, 0.4),
      inputErrorBg: mix('#F75464', base, 0.16),
      inputWarningBg: mix('#E8BF6A', base, 0.14),
      inputInfoBg: mix(acc, base, 0.18),
      dropBg: withAlpha(acc, 0.2),
      commentRangeBg: withAlpha(acc, 0.1),
      diffInsertedText: '#4E9D6C26',
      diffRemovedText: '#E4656E26',
      diffInsertedLine: '#4E9D6C1A',
      diffRemovedLine: '#E4656E1A',
      diffInsertedGutter: '#4E9D6C40',
      diffRemovedGutter: '#E4656E40',
      mergeCurrentHeader: '#4E9D6C4D',
      mergeCurrentContent: '#4E9D6C26',
      mergeIncomingHeader: withAlpha(acc, 0.4),
      mergeIncomingContent: withAlpha(acc, 0.2),
      extBtnHover: '#2A6E47',
      none: '#00000000',
    },
  };
}
