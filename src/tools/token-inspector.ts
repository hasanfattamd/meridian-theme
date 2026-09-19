import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

// Note: Using dynamic file reading to preserve precise semantic names (e.g. "surface.main") 
// which are otherwise lost when evaluated to hex strings in the exported JS objects.

export interface TokenUsage {
  readonly token: string;
  readonly count: number;
  readonly locations: readonly string[];
}

export interface InspectorReport {
  readonly totalPrimitiveTokens: number;
  readonly totalSemanticTokens: number;
  readonly totalWorkbenchMappings: number;
  readonly totalTextMateMappings: number;
  readonly unusedSemanticTokens: readonly string[];
  readonly duplicateMappings: Record<string, readonly string[]>;
  readonly missingMappings: readonly string[];
  readonly mostFrequentlyUsedTokens: readonly TokenUsage[];
}

/**
 * Pure function to analyze the token usage across the design system.
 */
export function generateReport(
  primitiveCount: number,
  semanticTokens: readonly string[],
  workbenchMappings: Record<string, string>,
  textMateMappings: Record<string, string>
): InspectorReport {
  const allUsages = Object.values(workbenchMappings).concat(Object.values(textMateMappings));
  const usageMap = new Map<string, string[]>();

  for (const [key, token] of Object.entries(workbenchMappings)) {
    if (!usageMap.has(token)) usageMap.set(token, []);
    usageMap.get(token)!.push(`workbench:${key}`);
  }
  for (const [scope, token] of Object.entries(textMateMappings)) {
    if (!usageMap.has(token)) usageMap.set(token, []);
    usageMap.get(token)!.push(`textmate:${scope}`);
  }

  const unusedSemanticTokens = semanticTokens.filter((token) => !usageMap.has(token));

  const duplicateMappings: Record<string, string[]> = {};
  const mostFrequentlyUsedTokens: TokenUsage[] = [];

  for (const [token, locations] of usageMap.entries()) {
    if (locations.length > 1) {
      duplicateMappings[token] = locations;
    }
    mostFrequentlyUsedTokens.push({ token, count: locations.length, locations });
  }

  mostFrequentlyUsedTokens.sort((a, b) => b.count - a.count);

  const missingMappings = Object.entries(workbenchMappings)
    .filter(([_, token]) => !token || token.trim() === '')
    .map(([key]) => key);

  return {
    totalPrimitiveTokens: primitiveCount,
    totalSemanticTokens: semanticTokens.length,
    totalWorkbenchMappings: Object.keys(workbenchMappings).length,
    totalTextMateMappings: Object.keys(textMateMappings).length,
    unusedSemanticTokens,
    duplicateMappings,
    missingMappings,
    mostFrequentlyUsedTokens,
  };
}

/**
 * Parses a typescript file and extracts mappings (key -> semantic token name).
 * Works for both workbench keys and TextMate scopes.
 */
function extractMappings(fileContent: string): Record<string, string> {
  const mappings: Record<string, string> = {};
  // Matches `'key': group.token` or `scope: ['string'], settings: { foreground: group.token }`
  
  // 1. Workbench format: 'key': surface.main,
  const workbenchRegex = /'([^']+)'\s*:\s*([a-z]+\.[a-zA-Z0-9]+)/g;
  let match;
  while ((match = workbenchRegex.exec(fileContent)) !== null) {
    if (match[1] && match[2]) {
      mappings[match[1]] = match[2];
    }
  }

  // 2. Textmate format: scope: 'scope', ... foreground: syntax.keyword
  const textmateRegex = /scope\s*:\s*(?:'([^']+)'|\[([^\]]+)\])[\s\S]*?foreground\s*:\s*([a-z]+\.[a-zA-Z0-9]+)/g;
  while ((match = textmateRegex.exec(fileContent)) !== null) {
    const scope = (match[1] || match[2])?.replace(/['"\s\n]/g, '') || '';
    if (scope && match[3]) {
      mappings[scope] = match[3];
    }
  }

  return mappings;
}

/**
 * Executes the inspector against the local filesystem.
 */
export async function runInspector(): Promise<InspectorReport> {
  const cwd = process.cwd();
  
  // In a real TS environment we would dynamically import or AST parse, 
  // but to guarantee 0 dependencies we count occurrences from raw files.
  
  // 1. Primitive count
  const primitivesDir = resolve(cwd, 'src/tokens/primitives');
  const primitiveFiles = await fs.readdir(primitivesDir);
  let primitiveCount = 0;
  for (const file of primitiveFiles) {
    if (file === 'index.ts') continue;
    const content = await fs.readFile(resolve(primitivesDir, file), 'utf-8');
    const matches = content.match(/[a-zA-Z0-9_]+\s*:\s*'#[a-fA-F0-9]+'/g);
    if (matches) primitiveCount += matches.length;
  }

  // 2. Semantic tokens
  const semanticDir = resolve(cwd, 'src/tokens/semantic');
  const semanticFiles = await fs.readdir(semanticDir);
  const semanticTokens: string[] = [];
  for (const file of semanticFiles) {
    if (file === 'index.ts') continue;
    const content = await fs.readFile(resolve(semanticDir, file), 'utf-8');
    const groupMatch = content.match(/export const ([a-z]+) = {/);
    if (groupMatch && groupMatch[1]) {
      const group = groupMatch[1];
      const tokenMatches = content.match(/([a-zA-Z0-9_]+)\s*:\s*[a-zA-Z]+\[[0-9]+\]/g);
      if (tokenMatches) {
        for (const token of tokenMatches) {
          const splitToken = token.split(':');
          if (splitToken[0]) {
            const key = splitToken[0].trim();
            semanticTokens.push(`${group}.${key}`);
          }
        }
      }
    }
  }

  // 3. Mappings
  const workbenchFile = await fs.readFile(resolve(cwd, 'src/mappings/workbench.ts'), 'utf-8');
  const textmateFile = await fs.readFile(resolve(cwd, 'src/mappings/textmate.ts'), 'utf-8');

  const workbenchMappings = extractMappings(workbenchFile);
  const textMateMappings = extractMappings(textmateFile);

  return generateReport(primitiveCount, semanticTokens, workbenchMappings, textMateMappings);
}

/**
 * Writes the report to JSON.
 */
export async function exportReportJSON(outputPath: string): Promise<void> {
  const report = await runInspector();
  await fs.writeFile(resolve(process.cwd(), outputPath), JSON.stringify(report, null, 2), 'utf-8');
}
