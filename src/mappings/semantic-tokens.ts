import { syntax } from '../tokens/index.js';

/**
 * A strongly typed VS Code semantic-token color rule.
 */
export interface SemanticTokenStyle {
  readonly foreground?: string;
  readonly fontStyle?: string;
  readonly bold?: boolean;
  readonly italic?: boolean;
}

/**
 * VS Code `semanticTokenColors` mapping.
 *
 * @remarks
 * JetBrains resolves highlighting from the type system, not a lexer grammar, so
 * a TextMate-only port drifts on real code (it cannot tell a field access from
 * a local, or a decorator from a call). Enabling VS Code semantic highlighting
 * for TS/JS closes most of that gap.
 *
 * Deliberately **left unset**: `class`, `interface`, `type`, `enum`,
 * `namespace`, `parameter`, `variable`. Islands Dark renders all of these in
 * the plain editor foreground, which is exactly what an unset selector already
 * produces — and, critically, leaving `class` unset lets JSX component tags
 * (`<MyComponent/>`, which tsserver reports as `class`) fall through to the
 * TextMate `support.class.component` rule and pick up the teal
 * `HTML_CUSTOM_TAG_NAME` color (#2FBAA3) instead of being flattened to neutral.
 *
 * Only selectors that genuinely improve on TextMate — and never collide with
 * JSX tag names — are declared here.
 */
export const semanticTokenColors: Readonly<Record<string, string | SemanticTokenStyle>> = {
  // Fields / properties / object keys → purple (DEFAULT_INSTANCE_FIELD #C77DBB)
  property: syntax.property,
  'property.readonly': { foreground: syntax.property, italic: true },
  'property.declaration': syntax.property,

  // Enum members & preprocessor-style constants → purple italic (DEFAULT_CONSTANT)
  enumMember: { foreground: syntax.constant, italic: true },
  macro: { foreground: syntax.constant, italic: true },

  // Default-library globals (window, document, console) → purple italic (JS.GLOBAL_VARIABLE)
  'variable.defaultLibrary': { foreground: syntax.globalVariable, italic: true },

  // Type parameters / generics → teal (TYPE_PARAMETER_NAME #16BAAC)
  typeParameter: syntax.typeParameter,

  // Functions & methods → blue (DEFAULT_FUNCTION_DECLARATION / JS.INSTANCE_MEMBER_FUNCTION #56A8F5)
  function: syntax.function,
  'function.defaultLibrary': syntax.function,
  method: syntax.function,
  'method.defaultLibrary': syntax.function,

  // Decorators → olive (DEFAULT_METADATA #B3AE60)
  decorator: syntax.decorator,

  // Labels → teal (KOTLIN_LABEL / JS label)
  label: syntax.label,
} as const;
