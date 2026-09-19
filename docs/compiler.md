# Meridian Compiler Pipeline

Meridian utilizes a highly optimized, incremental build system to compile its TypeScript design system into standard VS Code JSON themes. 

Unlike traditional themes where developers manually edit JSON files, Meridian treats the theme as a compilation target. 

## The Build Engine (`src/build.ts`)

The compiler engine handles the end-to-end transformation of tokens into a distributable theme.

### Dependency Tracking
The compiler tracks the dependency graph of the theme:
1. **Primitives**: If `primitives.ts` changes, the entire theme must rebuild.
2. **Semantics**: If `semantics.ts` changes, all mappings must rebuild.
3. **Workbench / TextMate**: If a mapping changes, only the generation step needs to run.

### Incremental Builds
To ensure maximum performance during development, Meridian implements incremental builds. The compiler compares file modification times (mtimes) and hashes to determine what has changed. 
- **Unchanged Modules:** Skipped entirely to save CPU cycles.
- **Changed Modules:** Recompiled and validated.
- **Disk I/O:** The JSON is only written to disk if the output payload has materially changed.

### Performance Optimizations
- **Memory Allocation:** The compiler reuses object structures during generation to minimize garbage collection pauses.
- **Deterministic Output:** Object keys are sorted during JSON stringification, ensuring that Git diffs are clean and deterministic.

## Compilation Steps

1. **Initialize State:** The compiler reads the current file hashes and loads the incremental cache.
2. **Type Checking:** Runs a rapid TypeScript check to ensure there are no missing or invalid semantic token mappings.
3. **Generate Workbench:** Evaluates the `workbench.ts` module and resolves all semantic tokens down to primitive hex values.
4. **Generate TextMate:** Evaluates `textmate.ts` and expands logical groups into fully qualified VS Code TextMate rule arrays.
5. **Merge & Validate:** Merges the workbench colors, TextMate rules, and theme metadata into a single object. The Diagnostics engine validates the output for missing keys or duplicate scopes.
6. **Emit:** Serializes the object into strict JSON and writes it to `themes/meridian-dark-color-theme.json`.
