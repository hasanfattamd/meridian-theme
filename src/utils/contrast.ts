import { relativeLuminance } from './color.js';

/**
 * Calculates the contrast ratio between two colors according to WCAG 2.0.
 * @param hex1 - The first hex color.
 * @param hex2 - The second hex color.
 * @returns The contrast ratio (1 to 21).
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = relativeLuminance(hex1);
  const lum2 = relativeLuminance(hex2);
  const lightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (lightest + 0.05) / (darkest + 0.05);
}

/**
 * Determines if the contrast ratio between two colors passes the WCAG AA level (4.5:1).
 * @param hex1 - The first hex color.
 * @param hex2 - The second hex color.
 * @returns True if the contrast ratio is at least 4.5.
 */
export function passesAA(hex1: string, hex2: string): boolean {
  return contrastRatio(hex1, hex2) >= 4.5;
}

/**
 * Determines if the contrast ratio between two colors passes the WCAG AAA level (7:1).
 * @param hex1 - The first hex color.
 * @param hex2 - The second hex color.
 * @returns True if the contrast ratio is at least 7.
 */
export function passesAAA(hex1: string, hex2: string): boolean {
  return contrastRatio(hex1, hex2) >= 7;
}

/**
 * Determines if the contrast ratio passes the WCAG AA level for large text (3:1).
 * @param hex1 - The first hex color.
 * @param hex2 - The second hex color.
 * @returns True if the contrast ratio is at least 3.
 */
export function passesLargeTextAA(hex1: string, hex2: string): boolean {
  return contrastRatio(hex1, hex2) >= 3;
}

/**
 * Determines if the contrast ratio passes the WCAG AAA level for large text (4.5:1).
 * @param hex1 - The first hex color.
 * @param hex2 - The second hex color.
 * @returns True if the contrast ratio is at least 4.5.
 */
export function passesLargeTextAAA(hex1: string, hex2: string): boolean {
  return contrastRatio(hex1, hex2) >= 4.5;
}
