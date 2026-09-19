import { describe, it, expect } from 'vitest';
import { validateTheme } from './validate.js';

describe('Theme Validator', () => {
  it('should validate a correct theme object', () => {
    const validTheme = {
      name: 'Test Theme',
      type: 'dark',
      colors: {
        'editor.background': '#000000'
      },
      tokenColors: []
    };

    expect(() => validateTheme(validTheme)).not.toThrow();
  });

  it('should throw on missing name', () => {
    const invalidTheme = {
      type: 'dark',
      colors: { 'editor.background': '#000000' },
      tokenColors: []
    };
    expect(() => validateTheme(invalidTheme)).toThrow('Invalid theme name');
  });

  it('should throw on invalid type', () => {
    const invalidTheme = {
      name: 'Test',
      type: 'invalid-type',
      colors: { 'editor.background': '#000000' },
      tokenColors: []
    };
    expect(() => validateTheme(invalidTheme)).toThrow('Invalid theme type');
  });

  it('should throw on empty colors', () => {
    const invalidTheme = {
      name: 'Test',
      type: 'dark',
      colors: {},
      tokenColors: []
    };
    expect(() => validateTheme(invalidTheme)).toThrow('Empty colors object');
  });

  it('should throw on invalid tokenColors', () => {
    const invalidTheme = {
      name: 'Test',
      type: 'dark',
      colors: { 'editor.background': '#000000' },
      tokenColors: {} // Should be array
    };
    expect(() => validateTheme(invalidTheme)).toThrow('Invalid tokenColors property');
  });

  it('should throw on unexpected properties', () => {
    const invalidTheme = {
      name: 'Test',
      type: 'dark',
      colors: { 'editor.background': '#000000' },
      tokenColors: [],
      rogueProperty: true
    };
    expect(() => validateTheme(invalidTheme)).toThrow('Unexpected properties in theme object');
  });
});
