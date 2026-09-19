import { describe, it, expect } from 'vitest';
import { buildTheme } from './build.js';
import type { VSCodeTheme } from '../plugins/vscode.js';

describe('Theme Generator', () => {
  it('should build a valid theme object', () => {
    const theme = buildTheme<VSCodeTheme>({ name: 'Meridian Test', type: 'dark' });
    
    expect(theme.name).toBe('Meridian Test');
    expect(theme.type).toBe('dark');
    expect(theme.colors).toBeDefined();
    expect(Array.isArray(theme.tokenColors)).toBe(true);
  });

  it('should match the generated theme snapshot', () => {
    const theme = buildTheme<VSCodeTheme>({ name: 'Meridian Snapshot', type: 'dark' });
    expect(theme).toMatchSnapshot();
  });
  
  it('should throw if options are missing', () => {
    // @ts-expect-error Testing invalid input
    expect(() => buildTheme(undefined)).toThrow();
  });
});
