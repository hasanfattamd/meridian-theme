/**
 * Represents an RGB color with an optional alpha channel.
 */
export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Represents an HSL color with an optional alpha channel.
 */
export interface HslaColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

/**
 * Parses a hex color string into an RGBA object.
 * @param hex - The hex color string (e.g., "#fff", "#ffffff", "#ffffffff").
 * @returns The parsed RGBA color object.
 */
export function hexToRgb(hex: string): RgbaColor {
  let normalized = hex.replace(/^#/, '');
  
  if (normalized.length === 3 || normalized.length === 4) {
    normalized = normalized.split('').map(c => c + c).join('');
  }
  
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  let a = 1;
  
  if (normalized.length === 8) {
    a = parseInt(normalized.slice(6, 8), 16) / 255;
  }
  
  return { r, g, b, a };
}

/**
 * Converts RGBA values to a hex color string.
 * @param r - Red channel (0-255).
 * @param g - Green channel (0-255).
 * @param b - Blue channel (0-255).
 * @param a - Alpha channel (0-1).
 * @returns The hex color string.
 */
export function rgbToHex(r: number, g: number, b: number, a = 1): string {
  const toHex = (value: number) => Math.round(Math.max(0, Math.min(255, value))).toString(16).padStart(2, '0');
  
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a * 255)}` : hex;
}

/**
 * Converts a hex color string to HSLA.
 * @param hex - The hex color string.
 * @returns The HSLA color object.
 */
export function hexToHsl(hex: string): HslaColor {
  const { r: r255, g: g255, b: b255, a } = hexToRgb(hex);
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100, a };
}

/**
 * Converts HSLA values to a hex color string.
 * @param h - Hue (0-360).
 * @param s - Saturation (0-100).
 * @param l - Lightness (0-100).
 * @param a - Alpha channel (0-1).
 * @returns The hex color string.
 */
export function hslToHex(h: number, s: number, l: number, a = 1): string {
  const hNorm = (h % 360 + 360) % 360 / 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;
  
  let r = 0, g = 0, b = 0;
  
  if (sNorm === 0) {
    r = g = b = lNorm;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
    const p = 2 * lNorm - q;
    
    r = hue2rgb(p, q, hNorm + 1/3);
    g = hue2rgb(p, q, hNorm);
    b = hue2rgb(p, q, hNorm - 1/3);
  }
  
  return rgbToHex(r * 255, g * 255, b * 255, a);
}

/**
 * Lightens a hex color by a specified percentage.
 * @param hex - The hex color string.
 * @param amount - The amount to lighten (0-100).
 * @returns The lightened hex color string.
 */
export function lighten(hex: string, amount: number): string {
  const { h, s, l, a } = hexToHsl(hex);
  return hslToHex(h, s, l + amount, a);
}

/**
 * Darkens a hex color by a specified percentage.
 * @param hex - The hex color string.
 * @param amount - The amount to darken (0-100).
 * @returns The darkened hex color string.
 */
export function darken(hex: string, amount: number): string {
  const { h, s, l, a } = hexToHsl(hex);
  return hslToHex(h, s, l - amount, a);
}

/**
 * Mixes two hex colors based on a weight.
 * @param hex1 - The first hex color.
 * @param hex2 - The second hex color.
 * @param weight - The weight of the first color (0-1).
 * @returns The mixed hex color string.
 */
export function mix(hex1: string, hex2: string, weight: number): string {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const w1 = Math.max(0, Math.min(1, weight));
  const w2 = 1 - w1;
  
  const r = rgb1.r * w1 + rgb2.r * w2;
  const g = rgb1.g * w1 + rgb2.g * w2;
  const b = rgb1.b * w1 + rgb2.b * w2;
  const a = rgb1.a * w1 + rgb2.a * w2;
  
  return rgbToHex(r, g, b, a);
}

/**
 * Modifies the alpha channel of a hex color.
 * @param hex - The hex color string.
 * @param alpha - The new alpha channel value (0-1).
 * @returns The hex color string with the updated alpha.
 */
export function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r, g, b, Math.max(0, Math.min(1, alpha)));
}

/**
 * Calculates the relative luminance of a color according to WCAG 2.0.
 * @param hex - The hex color string.
 * @returns The relative luminance (0 to 1).
 */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  
  const toLinear = (c: number) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  };
  
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * An alias for relativeLuminance.
 * @param hex - The hex color string.
 * @returns The luminance (0 to 1).
 */
export function luminance(hex: string): number {
  return relativeLuminance(hex);
}

/**
 * Determines if a color is considered dark based on WCAG luminance.
 * @param hex - The hex color string.
 * @returns True if the color is dark.
 */
export function isDark(hex: string): boolean {
  return relativeLuminance(hex) < 0.5;
}

/**
 * Determines if a color is considered light based on WCAG luminance.
 * @param hex - The hex color string.
 * @returns True if the color is light.
 */
export function isLight(hex: string): boolean {
  return relativeLuminance(hex) >= 0.5;
}
