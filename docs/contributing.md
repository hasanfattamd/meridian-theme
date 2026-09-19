# Contributing to Meridian

Thank you for your interest in contributing to Meridian! This project is maintained as an open-source design system, and we welcome improvements.

## Philosophy

Meridian strictly separates **design** (Semantic Tokens) from **implementation** (VS Code Mappings). 
- **Do not** hardcode hex colors in mapping files.
- **Do not** add arbitrary primitive colors without checking the existing scales.
- **Do not** modify the generator architecture for a single edge-case UI fix.

## Adding or Changing a UI Color

1. Identify the VS Code theme color key you want to modify (e.g., `gitDecoration.modifiedResourceForeground`).
2. Open `src/mappings/workbench.ts`.
3. Locate the key (or add it in the correct alphabetical section).
4. Assign it an existing semantic token (e.g., `semanticTokens.text.warning`).
5. Run the build pipeline to generate the theme.

*Note: If a semantic token does not exist for your specific use-case, evaluate if you should create a new semantic token in `src/tokens/semantics.ts`.*

## Adding or Changing Syntax Highlighting

1. Identify the TextMate scope using VS Code's "Inspect Editor Tokens and Scopes" command.
2. Open `src/mappings/textmate.ts`.
3. Find the logical grouping that applies to your scope (e.g., `Variables`, `Keywords`, `Markup`).
4. Add your scope string to the `scope` array.
5. Run the build pipeline to generate the theme.

## Pull Request Process

1. Fork the repository and create your feature branch (`git checkout -b feature/amazing-feature`).
2. Implement your changes.
3. Run the validation suite: `npm run validate`.
4. Ensure there are no type errors, lint errors, or diagnostic failures.
5. Commit your changes. Please use conventional commits (e.g., `feat: add support for rust macros`, `fix: correct status bar foreground color`).
6. Push to the branch and open a Pull Request.

All PRs must pass the CI pipeline before merging.
