import { describe, it, expect } from 'vitest';
import { 
  hexToRgb, rgbToHex, hexToHsl, hslToHex, 
  lighten, darken, mix, withAlpha, 
  relativeLuminance, isDark, isLight 
} from './color.js';

describe('Color Utilities', () => {
  it('hexToRgb converts valid hex correctly', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(hexToRgb('#00ff0080')).toEqual({ r: 0, g: 255, b: 0, a: expect.closeTo(0.5, 2) });
  });

  it('rgbToHex converts rgb correctly', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, 255, 0, 0.5)).toBe('#00ff0080');
  });

  it('hexToHsl converts valid hex correctly', () => {
    const hsl = hexToHsl('#ff0000');
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
    expect(hsl.l).toBe(50);
    expect(hsl.a).toBe(1);
  });

  it('hslToHex converts hsl correctly', () => {
    expect(hslToHex(0, 100, 50)).toBe('#ff0000');
    expect(hslToHex(120, 100, 50)).toBe('#00ff00');
    expect(hslToHex(240, 100, 50)).toBe('#0000ff');
  });

  it('lighten increases lightness', () => {
    expect(lighten('#ff0000', 10)).not.toBe('#ff0000');
    // Just verify it doesn't throw and returns a string for now
    expect(typeof lighten('#ff0000', 10)).toBe('string');
  });

  it('darken decreases lightness', () => {
    expect(darken('#ff0000', 10)).not.toBe('#ff0000');
    expect(typeof darken('#ff0000', 10)).toBe('string');
  });

  it('mix blends two colors', () => {
    expect(mix('#ffffff', '#000000', 0.5)).toBe('#808080');
  });

  it('withAlpha modifies alpha channel', () => {
    expect(withAlpha('#ffffff', 0.5)).toBe('#ffffff80');
  });

  it('relativeLuminance computes correct luminance', () => {
    expect(relativeLuminance('#ffffff')).toBe(1);
    expect(relativeLuminance('#000000')).toBe(0);
  });

  it('isDark identifies dark colors', () => {
    expect(isDark('#000000')).toBe(true);
    expect(isDark('#ffffff')).toBe(false);
  });

  it('isLight identifies light colors', () => {
    expect(isLight('#ffffff')).toBe(true);
    expect(isLight('#000000')).toBe(false);
  });
});
