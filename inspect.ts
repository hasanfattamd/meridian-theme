import { exportReportJSON, runInspector } from './src/tools/token-inspector.js';

async function main() {
  const isExport = process.argv.includes('--export');
  
  if (isExport) {
    const outPath = 'token-report.json';
    await exportReportJSON(outPath);
    console.log(`Report successfully exported to ${outPath}`);
  } else {
    console.log('Analyzing tokens...');
    const report = await runInspector();
    
    console.log(`\n--- Meridian Token Inspector ---`);
    console.log(`Primitive Tokens: ${report.totalPrimitiveTokens}`);
    console.log(`Semantic Tokens: ${report.totalSemanticTokens}`);
    console.log(`Workbench Mappings: ${report.totalWorkbenchMappings}`);
    console.log(`TextMate Mappings: ${report.totalTextMateMappings}`);
    
    console.log(`\nUnused Semantic Tokens: ${report.unusedSemanticTokens.length}`);
    if (report.unusedSemanticTokens.length > 0) {
      console.log(report.unusedSemanticTokens.map(t => `  - ${t}`).join('\n'));
    }
    
    console.log(`\nDuplicate Mappings: ${Object.keys(report.duplicateMappings).length}`);
    
    console.log(`\nTop 5 Most Used Tokens:`);
    report.mostFrequentlyUsedTokens.slice(0, 5).forEach((usage, i) => {
      console.log(`  ${i + 1}. ${usage.token} (${usage.count} uses)`);
    });
    
    console.log('\nRun with --export to generate token-report.json');
  }
}

main().catch(err => {
  console.error('Inspector failed:', err);
  process.exit(1);
});
