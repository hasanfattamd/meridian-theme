import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import type { VSCodeTheme } from '../plugins/vscode.js';
import type { TextMateRule } from '../mappings/textmate.js';

// ANSI Color Codes
const c = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

const REQUIRED_KEYS = [
  'editor.background',
  'editor.foreground',
  'activityBar.background',
  'sideBar.background'
];

interface DiagnosticsReport {
  readonly totalWorkbenchColors: number;
  readonly totalTextMateRules: number;
  readonly missingRequiredKeys: readonly string[];
  readonly duplicateScopes: readonly string[];
  readonly duplicateWorkbenchKeys: readonly string[];
  readonly emptyValues: readonly string[];
  readonly invalidMetadata: readonly string[];
  readonly passed: boolean;
}

/**
 * Uses a rudimentary regex scanner to detect exact duplicate keys in the raw JSON string 
 * before JSON.parse() strips them.
 */
function findDuplicateJSONKeys(jsonText: string, objectKey: string): string[] {
  const duplicates: string[] = [];
  const blockRegex = new RegExp(`"${objectKey}"\\s*:\\s*{([^}]+)}`);
  const blockMatch = jsonText.match(blockRegex);
  
  if (!blockMatch) return duplicates;
  
  const block = blockMatch[1];
  if (!block) return duplicates;
  const keyRegex = /"([^"]+)"\s*:/g;
  
  const seen = new Set<string>();
  let match;
  while ((match = keyRegex.exec(block)) !== null) {
    const key = match[1];
    if (key) {
      if (seen.has(key)) duplicates.push(key);
      seen.add(key);
    }
  }
  
  return duplicates;
}

export async function runDiagnostics(themePath: string): Promise<DiagnosticsReport> {
  const rawText = await fs.readFile(resolve(process.cwd(), themePath), 'utf-8');
  const theme = JSON.parse(rawText) as VSCodeTheme;
  
  const missingRequiredKeys: string[] = [];
  const emptyValues: string[] = [];
  const invalidMetadata: string[] = [];
  const duplicateScopes: string[] = [];
  
  // 1. Metadata check
  if (!theme.name) invalidMetadata.push('Missing theme "name"');
  if (theme.type !== 'dark' && theme.type !== 'light') invalidMetadata.push(`Invalid theme type: ${theme.type ?? 'undefined'}`);
  
  // 2. Workbench colors check
  const colors = theme.colors || {};
  for (const req of REQUIRED_KEYS) {
    if (!colors[req as keyof typeof colors]) {
      missingRequiredKeys.push(req);
    }
  }
  
  for (const [key, val] of Object.entries(colors)) {
    if (!val || (typeof val === 'string' && val.trim() === '')) {
      emptyValues.push(`colors.${key}`);
    }
  }

  // 3. TextMate rules check
  const rules = theme.tokenColors || [];
  const seenScopes = new Set<string>();
  
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (!rule) continue;
    
    // Check explicitly empty foregrounds (undefined is allowed if relying on fontStyle)
    if (rule.settings && typeof rule.settings.foreground === 'string' && rule.settings.foreground.trim() === '') {
      emptyValues.push(`tokenColors[${i}].settings.foreground`);
    }
    
    if (rule.scope) {
      const scopeArray = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
      for (const scope of scopeArray) {
        if (!scope) continue;
        if (seenScopes.has(scope)) {
          duplicateScopes.push(scope);
        }
        seenScopes.add(scope);
      }
    }
  }
  
  // 4. Duplicate workbench keys (raw text scan)
  const duplicateWorkbenchKeys = findDuplicateJSONKeys(rawText, 'colors');

  const passed = 
    missingRequiredKeys.length === 0 &&
    duplicateScopes.length === 0 &&
    duplicateWorkbenchKeys.length === 0 &&
    emptyValues.length === 0 &&
    invalidMetadata.length === 0;

  return {
    totalWorkbenchColors: Object.keys(colors).length,
    totalTextMateRules: rules.length,
    missingRequiredKeys,
    duplicateScopes,
    duplicateWorkbenchKeys,
    emptyValues,
    invalidMetadata,
    passed
  };
}

async function main() {
  const targetPath = process.argv[2] || 'themes/meridian-dark-color-theme.json';
  
  console.log(`\n${c.bold}${c.cyan}=== Meridian Diagnostics Engine ===${c.reset}`);
  console.log(`${c.blue}Analyzing: ${targetPath}${c.reset}\n`);

  try {
    const report = await runDiagnostics(targetPath);

    console.log(`${c.bold}Metrics:${c.reset}`);
    console.log(`  - Total Workbench Colors: ${c.cyan}${report.totalWorkbenchColors}${c.reset}`);
    console.log(`  - Total TextMate Rules: ${c.cyan}${report.totalTextMateRules}${c.reset}\n`);

    let issuesCount = 0;

    const printIssues = (title: string, items: readonly string[]) => {
      if (items.length > 0) {
        console.log(`${c.yellow}⚠ ${title} (${items.length}):${c.reset}`);
        items.forEach(item => console.log(`  ${c.red}- ${item}${c.reset}`));
        issuesCount += items.length;
      }
    };

    printIssues('Invalid Metadata', report.invalidMetadata);
    printIssues('Missing Required Keys', report.missingRequiredKeys);
    printIssues('Empty Values', report.emptyValues);
    printIssues('Duplicate Workbench Keys', report.duplicateWorkbenchKeys);
    printIssues('Duplicate TextMate Scopes', report.duplicateScopes);

    console.log('\n-----------------------------------');
    if (report.passed) {
      console.log(`${c.bold}${c.green}✔ PASS:${c.reset} ${c.green}No issues detected. Theme is production-ready.${c.reset}\n`);
      process.exit(0);
    } else {
      console.log(`${c.bold}${c.red}✖ FAIL:${c.reset} ${c.red}Found ${issuesCount} potential issue(s).${c.reset}\n`);
      process.exit(1);
    }

  } catch (error: unknown) {
    console.error(`${c.red}Diagnostics crashed: ${(error as Error).message}${c.reset}`);
    process.exit(1);
  }
}

import { fileURLToPath } from 'node:url';

// Only execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
