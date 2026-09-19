# Development Workflow

Developing Meridian involves interacting with our TypeScript compiler pipeline. You do not need to manually edit JSON files at any point.

## Initial Setup

Clone the repository and install dependencies using `npm` or `pnpm`.

```bash
git clone https://github.com/your-org/meridian.git
cd meridian
npm install
```

## Running the Compiler

To compile the TypeScript design system into the VS Code JSON format:

```bash
npm run build
```

During active development, use the watch mode. The incremental compiler will instantly regenerate the JSON whenever a TypeScript file is saved.

```bash
npm run watch
```

## Previewing in VS Code

To test your changes live:
1. Open the project in VS Code.
2. Press `F5` (or run the "Run Extension" launch configuration).
3. A new Extension Development Host window will open with the Meridian theme active.
4. As you make changes and run `npm run build`, you can reload the Development Host window (`Cmd+R` / `Ctrl+R`) to see updates immediately.

## Quality Assurance Tools

We enforce strict quality standards. Before pushing code, run our diagnostics and validation tools.

### Validation Pipeline
Run the entire test, lint, and typecheck suite:
```bash
npm run validate
```

### Theme Diagnostics
The Diagnostics CLI analyzes the compiled JSON and flags missing keys, duplicate rules, or invalid formats.
```bash
npm run diagnose
```

### Token Inspector
The Token Inspector analyzes the usage of semantic tokens across the mappings, generating a report on unused tokens, duplicate mappings, and token frequency.
```bash
npm run inspect
```

## Packaging for Release

To build the final distributable `.vsix` extension package:
```bash
npm run package
```
This requires `vsce` to be installed globally or run via `npx vsce package`. Ensure `icon.png` and `README.md` are present before packaging.
