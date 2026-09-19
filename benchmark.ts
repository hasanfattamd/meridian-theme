import { performance } from 'node:perf_hooks';
import { buildTheme, emitTheme } from './src/generator/build.js';
import { vscodePlugin } from './src/plugins/vscode.js';

const ITERATIONS = 1000;
const config = { name: 'Meridian Perf', type: 'dark' as const };

async function runBenchmark() {
  console.log(`Running benchmark with ${ITERATIONS} iterations...\n`);

  // Force garbage collection before we start if exposed (run with --expose-gc)
  if (global.gc) {
    global.gc();
  }

  const startMem = process.memoryUsage();
  const startTime = performance.now();

  for (let i = 0; i < ITERATIONS; i++) {
    buildTheme(config, vscodePlugin);
  }

  const endTime = performance.now();
  const endMem = process.memoryUsage();

  const totalTime = endTime - startTime;
  const avgTime = totalTime / ITERATIONS;
  
  const heapUsedDiff = endMem.heapUsed - startMem.heapUsed;

  console.log(`--- Build Theme Benchmark ---`);
  console.log(`Total time for ${ITERATIONS} builds: ${totalTime.toFixed(2)}ms`);
  console.log(`Average time per build: ${avgTime.toFixed(4)}ms`);
  console.log(`Memory consumed (approx): ${(heapUsedDiff / 1024 / 1024).toFixed(2)} MB`);
  
  console.log('\nBenchmarking single emission (I/O bounded)...');
  const emitStartTime = performance.now();
  await emitTheme(config, vscodePlugin);
  const emitEndTime = performance.now();
  
  console.log(`Single emitTheme execution: ${(emitEndTime - emitStartTime).toFixed(2)}ms`);
}

runBenchmark().catch(console.error);
