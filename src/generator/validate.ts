import type { VSCodeTheme } from '../plugins/vscode.js';

/**
 * Validates the theme name property.
 */
function validateName(name: unknown): asserts name is string {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error(
      `Validation Error: Invalid theme name.\n` +
      `Expected: A non-empty string\n` +
      `Received: ${JSON.stringify(name)}\n` +
      `Fix: Provide a valid "name" in your build options.`
    );
  }
}

/**
 * Validates the theme type property.
 */
function validateType(type: unknown): asserts type is 'dark' | 'light' {
  if (type !== 'dark' && type !== 'light') {
    throw new Error(
      `Validation Error: Invalid theme type.\n` +
      `Expected: "dark" | "light"\n` +
      `Received: ${JSON.stringify(type)}\n` +
      `Fix: Ensure the theme type is strictly "dark" or "light".`
    );
  }
}

/**
 * Validates the workbench colors mapping property.
 */
function validateColors(colors: unknown): asserts colors is Record<string, string> {
  if (!colors || typeof colors !== 'object' || Array.isArray(colors)) {
    throw new Error(
      `Validation Error: Invalid colors object.\n` +
      `Expected: An object containing color mappings\n` +
      `Received: ${typeof colors}\n` +
      `Fix: Ensure workbench mappings are provided as an object.`
    );
  }

  const entries = Object.entries(colors as Record<string, unknown>);
  if (entries.length === 0) {
    throw new Error(
      `Validation Error: Empty colors object.\n` +
      `Expected: At least one color mapping\n` +
      `Received: 0 mappings\n` +
      `Fix: Provide valid workbench color mappings from the mapping layer.`
    );
  }

  for (const [key, value] of entries) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(
        `Validation Error: Invalid semantic token mapping.\n` +
        `Expected: A defined string value for mapping key "${key}"\n` +
        `Received: ${JSON.stringify(value)}\n` +
        `Fix: Ensure every workbench mapping references an existing semantic token.`
      );
    }
  }
}

/**
 * Validates the token colors array property.
 */
function validateTokenColors(tokenColors: unknown): asserts tokenColors is readonly unknown[] {
  if (!Array.isArray(tokenColors)) {
    throw new Error(
      `Validation Error: Invalid tokenColors property.\n` +
      `Expected: An array\n` +
      `Received: ${typeof tokenColors}\n` +
      `Fix: Ensure tokenColors is initialized as an array.`
    );
  }
}

/**
 * Validates the semantic token colors mapping.
 *
 * Accepts either a hex string or a style object ({ foreground, fontStyle, bold, italic })
 * for each selector, mirroring VS Code's `semanticTokenColors` contract.
 */
function validateSemanticTokenColors(
  semanticTokenColors: unknown
): asserts semanticTokenColors is Record<string, unknown> | undefined {
  if (semanticTokenColors === undefined) return;

  if (
    !semanticTokenColors ||
    typeof semanticTokenColors !== 'object' ||
    Array.isArray(semanticTokenColors)
  ) {
    throw new Error(
      `Validation Error: Invalid semanticTokenColors object.\n` +
      `Expected: An object mapping semantic selectors to colors or style objects\n` +
      `Received: ${typeof semanticTokenColors}\n` +
      `Fix: Ensure semanticTokenColors is provided as an object from the mapping layer.`
    );
  }

  for (const [selector, value] of Object.entries(semanticTokenColors as Record<string, unknown>)) {
    const isString = typeof value === 'string' && value.trim() !== '';
    const isStyleObject =
      !!value && typeof value === 'object' && !Array.isArray(value);

    if (!isString && !isStyleObject) {
      throw new Error(
        `Validation Error: Invalid semantic token style for "${selector}".\n` +
        `Expected: A non-empty hex string or a style object\n` +
        `Received: ${JSON.stringify(value)}\n` +
        `Fix: Ensure every semantic selector references an existing syntax token.`
      );
    }
  }
}

/**
 * Validates the optional metadata property.
 */
function validateMetadata(metadata: unknown): asserts metadata is Record<string, unknown> | undefined {
  if (metadata !== undefined) {
    if (typeof metadata !== 'object' || metadata === null || Array.isArray(metadata)) {
      throw new Error(
        `Validation Error: Invalid metadata property.\n` +
        `Expected: An object\n` +
        `Received: ${typeof metadata}\n` +
        `Fix: Ensure metadata is an object.`
      );
    }
  }
}

/**
 * Performs build-time validation on a generated VS Code theme object.
 * 
 * @remarks
 * Why validation is separate from generation:
 * Generation strictly handles assembling data structures. Validation verifies the structural integrity
 * of those structures. Keeping them decoupled prevents the generator from becoming bloated with logic
 * and makes it trivial to run validations independently (e.g., inside CI/CD pipelines).
 * 
 * How to add future validation rules:
 * Create a new focused, private helper function (e.g., `validateContrast()`) and call it from within 
 * `validateTheme()`. Throw descriptive errors explaining what failed and how to fix it.
 * 
 * Note on duplicates: Standard JavaScript object notation inherently prevents duplicate keys 
 * at runtime. If duplicates exist in the source code, the compiler or bundler will resolve them 
 * to the last declared value before this validation runs.
 * 
 * @param theme - The constructed theme object to validate.
 * @throws {Error} If any structural problem is detected.
 */
export function validateTheme(theme: unknown): asserts theme is VSCodeTheme {
  if (!theme || typeof theme !== 'object') {
    throw new Error(
      `Validation Error: Invalid theme payload.\n` +
      `Expected: A theme object\n` +
      `Received: ${typeof theme}\n` +
      `Fix: Pass a valid object to the validator.`
    );
  }

  const t = theme as Record<string, unknown>;

  // Execute focused validators
  validateName(t.name);
  validateType(t.type);
  validateColors(t.colors);
  validateTokenColors(t.tokenColors);
  validateSemanticTokenColors(t.semanticTokenColors);
  validateMetadata(t.metadata);

  // Verify strict structural expectations (no rogue properties)
  const allowedKeys = ['name', 'type', 'semanticHighlighting', 'colors', 'tokenColors', 'semanticTokenColors', 'metadata'];
  const actualKeys = Object.keys(t);
  const extraKeys = actualKeys.filter(key => !allowedKeys.includes(key));
  
  if (extraKeys.length > 0) {
     throw new Error(
       `Validation Error: Unexpected properties in theme object.\n` +
       `Expected exactly: ${allowedKeys.join(', ')}\n` +
       `Received extra: ${extraKeys.join(', ')}\n` +
       `Fix: Remove unexpected properties from the theme object.`
     );
  }
}
