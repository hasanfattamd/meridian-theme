import { describe, it, expect } from 'vitest';
import { workbenchMapping } from './workbench.js';

describe('Workbench Mappings', () => {
  it('should be a non-empty object', () => {
    expect(workbenchMapping).toBeDefined();
    expect(typeof workbenchMapping).toBe('object');
    expect(Object.keys(workbenchMapping).length).toBeGreaterThan(0);
  });

  it('should have valid string values for all keys', () => {
    for (const [key, value] of Object.entries(workbenchMapping)) {
      expect(typeof key).toBe('string');
      expect(typeof value).toBe('string');
      expect(value).not.toBe('');
    }
  });

  it('should include core editor keys', () => {
    expect(workbenchMapping['editor.background']).toBeDefined();
    expect(workbenchMapping['editor.foreground']).toBeDefined();
  });
});
