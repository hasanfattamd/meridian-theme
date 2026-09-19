# Theme Generation Pipeline

Meridian generates VS Code themes using a strict compiler pipeline. It prevents invalid or broken JSON structures from ever reaching the output folder.

## Pipeline Flow

The execution begins when `pnpm run generate` or `tsx build-theme.ts` is called.

### 1. In-Memory Generation (`buildTheme`)
The generator invokes `buildTheme()`. This pure factory function:
- Creates a strongly typed `VSCodeTheme` object in memory.
- Hydrates the `colors` property with the VS Code Workbench UI mappings.
- Hydrates the `tokenColors` property with the TextMate syntax highlighting mappings.

### 2. Validation (`validateTheme`)
Before a single byte is written to the disk, the in-memory payload is passed into the Validation Engine.
- Verifies the `type` is strictly `"dark"` or `"light"`.
- Uses `asserts` to guarantee `tokenColors` is an array.
- Ensures no rogue or undocumented properties were accidentally merged into the payload.
- Throws a hard fatal error if any structural discrepancies are detected.

### 3. Asynchronous File Emission (`emitTheme`)
Once validated mathematically by TypeScript and the Validation Engine, the object is serialized.
- Converts the payload to formatted JSON (`JSON.stringify(..., null, 2)`).
- Ensures the `themes/` output directory exists securely.
- Uses non-blocking `node:fs/promises` to write `meridian-dark-color-theme.json` to disk.

## Adding Future Targets
Because the compilation pipeline is strictly decoupled from the generator logic, we can theoretically add future targets (like Zed, JetBrains, Windows Terminal) by simply creating new mapping layers and writing a new `buildJetbrainsTheme()` function, completely reusing the existing Token logic.
