# Meridian Architecture

Meridian is not just a theme; it is a TypeScript-first design system compiler. Instead of hardcoding hex values into a massive JSON file, Meridian uses a structured, type-safe architecture to generate themes procedurally.

This architecture ensures perfect mathematical harmony across the entire workbench and code syntax, and makes maintaining the theme incredibly easy.

## Core Concepts

The architecture is split into several distinct layers:

### 1. Primitive Tokens (`src/tokens/primitives.ts`)
The foundational color palette. These are immutable, raw color scales (e.g., `blue.500`, `gray.900`) defined using strict hex values. No UI component ever references a primitive token directly.

### 2. Semantic Tokens (`src/tokens/semantics.ts`)
The abstract design language. Semantic tokens map a meaning (e.g., `surface.editor`, `text.muted`, `syntax.keyword`) to a primitive token. This layer abstracts away the raw colors, allowing us to easily swap palettes (e.g., for a light theme) without touching the UI mappings.

### 3. Workbench Mappings (`src/mappings/workbench.ts`)
VS Code specific implementations. This layer maps VS Code's proprietary UI keys (e.g., `editor.background`, `activityBar.foreground`) to our semantic tokens.

### 4. TextMate Mappings (`src/mappings/textmate.ts`)
Syntax highlighting rules. Instead of writing complex, repetitive regex scopes for every language, Meridian groups related TextMate scopes into logical concepts (e.g., `comments`, `functions`, `strings`) and maps them to syntax semantic tokens.

## Folder Structure

```
meridian/
├── src/
│   ├── build.ts             # Incremental compiler pipeline
│   ├── index.ts             # CLI entry points
│   ├── mappings/            # VS Code specific color bindings
│   │   ├── textmate.ts      # Syntax highlighting rules
│   │   └── workbench.ts     # UI element colors
│   ├── theme/               # Generation logic
│   │   ├── emitter.ts       # Writes the JSON to disk
│   │   └── generator.ts     # Compiles mappings into VS Code format
│   ├── tokens/              # Design system definitions
│   │   ├── primitives.ts    # Raw color scales
│   │   └── semantics.ts     # Meaning-based color variables
│   └── tools/               # CLI utilities (Diagnostics, Inspector)
├── themes/                  # Generated JSON artifacts
├── docs/                    # Project documentation
└── package.json             # Extension metadata & scripts
```

## Data Flow

`Primitives -> Semantics -> Mappings (Workbench + TextMate) -> Generator -> Emitter -> JSON Output`

By strictly adhering to this unidirectional data flow, Meridian guarantees that the final theme is always consistent, predictable, and easy to extend.
