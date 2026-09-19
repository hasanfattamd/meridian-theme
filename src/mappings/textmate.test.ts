import { describe, it, expect } from 'vitest';
import { textMateMappings } from './textmate.js';

describe('TextMate Mappings', () => {
  it('should be an array of rules', () => {
    expect(Array.isArray(textMateMappings)).toBe(true);
    expect(textMateMappings.length).toBeGreaterThan(0);
  });

  it('should have valid scopes and settings', () => {
    for (const rule of textMateMappings) {
      // Scope should be a string or an array of strings
      const isScopeValid = typeof rule.scope === 'string' || 
        (Array.isArray(rule.scope) && rule.scope.every(s => typeof s === 'string'));
      
      expect(isScopeValid).toBe(true);
      expect(rule.settings).toBeDefined();
      expect(typeof rule.settings).toBe('object');
      
      // Settings should have foreground or fontStyle
      const hasForeground = rule.settings.foreground !== undefined;
      const hasFontStyle = rule.settings.fontStyle !== undefined;
      expect(hasForeground || hasFontStyle).toBe(true);
    }
  });
});
