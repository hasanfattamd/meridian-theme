# Theme Generation

The Theme Generation process is the bridge between our abstract TypeScript mappings and VS Code's concrete JSON format.

## The Generator (`src/theme/generator.ts`)

The generator is a pure function that takes the `workbench.ts` mappings and `textmate.ts` syntax rules as input, and returns a fully compliant VS Code theme object.

### Resolving Variables

During generation, the engine performs variable resolution. When a workbench key maps to `surface.editor`, the generator:
1. Looks up `surface.editor` in the semantic tokens list.
2. Finds that it points to `gray.900`.
3. Looks up `gray.900` in the primitives list.
4. Returns `#121212`.

This ensures that the final JSON contains raw hex values, which is required by the VS Code engine for maximum rendering performance.

### TextMate Expansion

Writing TextMate grammar arrays by hand is error-prone. The generator takes our grouped syntax object and flattens it.

**Input (Meridian):**
```typescript
{
  name: "Functions",
  scope: ["entity.name.function", "support.function"],
  settings: {
    foreground: "syntax.function",
    fontStyle: "italic"
  }
}
```

**Output (VS Code JSON):**
```json
{
  "name": "Functions",
  "scope": "entity.name.function, support.function",
  "settings": {
    "foreground": "#66D9EF",
    "fontStyle": "italic"
  }
}
```

## The Emitter (`src/theme/emitter.ts`)

Once the generator produces the theme object, the Emitter is responsible for serializing it and saving it to the filesystem.

- **Deterministic Sorting:** The emitter alphabetically sorts all JSON keys before stringifying. This ensures that the generated `themes/meridian-dark-color-theme.json` file only produces Git diffs when values actually change, avoiding noisy diffs caused by object key reordering.
- **Formatting:** The JSON is emitted with 2-space indentation for readability.

## Creating a New Theme (e.g. Light Theme)

To create a new theme variant:
1. Create a new semantic token file (e.g. `src/tokens/semantics-light.ts`).
2. Map the same semantic keys to lighter primitive tokens (e.g., `surface.editor: gray.100`).
3. Update the `build.ts` pipeline to pass the light semantic tokens to the generator.
4. Output to a new file (e.g., `themes/meridian-light-color-theme.json`).
5. Register the new theme in `package.json` under `contributes.themes`.
