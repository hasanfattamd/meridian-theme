# Meridian v1.0.0 Release Checklist

Before tagging and releasing the v1.0.0 version of Meridian, verify that all checks below pass successfully.

## 1. Build & Compilation
- [x] Compiler correctly outputs a `VSCodeTheme` payload.
- [x] Generator engine validates strict structures without errors.
- [x] Async I/O successfully writes `themes/meridian-dark-color-theme.json` to disk.
- [x] File `meridian-dark-color-theme.json` validates successfully against VS Code's strict color schemas.

## 2. Tests
- [x] Vitest framework is configured and functional.
- [x] Mathematical color utility tests (hex, rgb, hsl, luminance) pass.
- [x] VS Code Workbench static mappings pass.
- [x] TextMate array mapping logic passes.
- [x] The `VSCodeTheme` payload exactly matches generated snapshots.
- [x] `pnpm run test:coverage` yields high confidence coverage metrics.

## 3. Packaging
- [x] `package.json` correctly declares the `meridian-theme` identifier.
- [x] `@vscode/vsce` is installed locally for compilation.
- [x] The `pnpm run release:local` script properly bundles a `.vsix` file.
- [x] `.vscodeignore` successfully prunes test coverage, docs, and raw typescript from the payload.
- [x] The bundled `.vsix` is installable locally in VS Code.

## 4. Documentation
- [x] `README.md` provides an overview, install steps, and build instructions.
- [x] `docs/architecture.md` explicitly details the frozen boundaries (Tokens -> Mappings -> Generator).
- [x] `docs/theme-pipeline.md` explains the internal `ThemePlugin` and `ThemeConfig` systems.
- [x] `docs/contributing.md` gives contributors strict rules on how to safely add semantic rules.

## 5. Quality Assurance
- [x] `eslint.config.js` exists and lints successfully.
- [x] TypeScript compiler (`tsc --noEmit`) passes with zero `any` usage.
- [x] Unused code, alias functions (e.g. `luminance`), and dead exports are removed.
- [x] GitHub CI (`.github/workflows/ci.yml`) pipeline runs successfully.

## 6. Versioning & Legal
- [x] `package.json` is accurately bumped to `"version": "1.0.0"`.
- [x] `LICENSE` is present (MIT) and linked correctly.
- [x] `CHANGELOG.md` exists and documents the v1.0.0 release candidate changes.
- [x] `CODE_OF_CONDUCT.md` exists for open source community standards.
