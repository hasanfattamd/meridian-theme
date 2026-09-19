import { incrementalBuild } from './src/index.js';
import type { ThemeConfig } from './src/config/theme.js';

const targets: ThemeConfig[] = [
  { name: 'Meridian Dark', type: 'dark', variant: 'default' },
  {
    name: 'Meridian Dark Ultimate',
    type: 'dark',
    variant: 'ultimate',
    outputPath: './themes/meridian-dark-ultimate-color-theme.json',
  },
  // Minimal single-hue tinted-dark variants (UI-only; shared Islands syntax).
  { name: 'Meridian Dark Noir', type: 'dark', variant: 'noir', outputPath: './themes/meridian-dark-noir-color-theme.json' },
  { name: 'Meridian Dark Fire', type: 'dark', variant: 'fire', outputPath: './themes/meridian-dark-fire-color-theme.json' },
  { name: 'Meridian Dark Luxe', type: 'dark', variant: 'luxe', outputPath: './themes/meridian-dark-luxe-color-theme.json' },
  { name: 'Meridian Dark Midnight Glow', type: 'dark', variant: 'midnight-glow', outputPath: './themes/meridian-dark-midnight-glow-color-theme.json' },
  { name: 'Meridian Dark Elegance', type: 'dark', variant: 'elegance', outputPath: './themes/meridian-dark-elegance-color-theme.json' },
  { name: 'Meridian Dark Deep Sea', type: 'dark', variant: 'deep-sea', outputPath: './themes/meridian-dark-deep-sea-color-theme.json' },
  { name: 'Meridian Dark Slate', type: 'dark', variant: 'slate', outputPath: './themes/meridian-dark-slate-color-theme.json' },
  { name: 'Meridian Dark Deep Wine', type: 'dark', variant: 'deep-wine', outputPath: './themes/meridian-dark-deep-wine-color-theme.json' },
  { name: 'Meridian Dark Forest', type: 'dark', variant: 'forest', outputPath: './themes/meridian-dark-forest-color-theme.json' },
  { name: 'Meridian Dark Umbra', type: 'dark', variant: 'umbra', outputPath: './themes/meridian-dark-umbra-color-theme.json' },
  { name: 'Meridian Dark Polar Night', type: 'dark', variant: 'polar-night', outputPath: './themes/meridian-dark-polar-night-color-theme.json' },
];

async function build(): Promise<void> {
  console.log(`Building ${targets.length} Meridian Theme variants...`);

  let totalTime = 0;
  let emitted = 0;

  for (const target of targets) {
    const result = await incrementalBuild(target);
    totalTime += result.buildTime;
    if (result.outputFiles.length > 0) {
      emitted += 1;
      console.log(`  ✓ ${target.name} → ${result.outputFiles[0]}`);
    } else {
      console.log(`  – ${target.name} (no changes)`);
    }
  }

  console.log(`\n${emitted}/${targets.length} emitted in ${totalTime.toFixed(2)}ms`);
}

build().catch((err) => {
  console.error('Failed to build theme:', err);
  process.exit(1);
});
