import { syntax } from '../tokens/index.js';

/**
 * A strongly typed VS Code TextMate rule.
 */
export interface TextMateRule {
  readonly scope: string | readonly string[];
  readonly settings: {
    readonly foreground?: string;
    readonly fontStyle?: string;
  };
}

/**
 * The core mapping layer converting Meridian semantic syntax tokens
 * into VS Code TextMate `tokenColors` rules.
 *
 * @remarks
 * The reference target is JetBrains WebStorm's built-in **Islands Dark**
 * editor scheme. TextMate grammars fragment the same concept across dozens of
 * scopes and across languages; each block below collapses those scopes back to
 * one Meridian semantic token so every language renders the way Islands Dark
 * renders it — in particular for React / JSX / TSX:
 *
 *   • HTML element tags (`<div>`)        → gold   (#D5B778)  syntax.tag
 *   • Component tags (`<MyComponent>`)   → teal   (#2FBAA3)  syntax.component
 *   • Attribute names (`className=`)     → neutral(#BCBEC4)  syntax.attribute
 *   • Attribute string values           → green  (#6AAB73)  syntax.string
 *   • Type annotations / class refs      → neutral(#BCBEC4)  syntax.type
 *   • Fields / properties / object keys  → purple (#C77DBB)  syntax.property
 *   • Decorators (`@memo`)               → olive  (#B3AE60)  syntax.decorator
 *
 * Ordering matters: later rules win in VS Code, so rules move from broad
 * (`comment`) to specific (`constant.language.boolean`).
 */
export const textMateMappings: readonly TextMateRule[] = [
  // --------------------------------------------------
  // Base text / plain identifiers  (DEFAULT_IDENTIFIER #BCBEC4)
  // --------------------------------------------------
  {
    scope: [
      'source',
      'meta.embedded',
      'variable.other.readwrite',
      'variable.other.object',
      'variable.other.constant.object',
      'meta.definition.variable.name',
      'support.variable.dom',
      'support.variable.property.dom',
    ],
    settings: {
      foreground: syntax.variable,
    },
  },

  // --------------------------------------------------
  // Keywords, storage, modifiers  (DEFAULT_KEYWORD #CF8E6D)
  // --------------------------------------------------
  {
    scope: [
      'keyword',
      'keyword.control',
      'keyword.control.flow',
      'keyword.control.import',
      'keyword.control.export',
      'keyword.control.from',
      'keyword.control.as',
      'keyword.control.conditional',
      'keyword.control.loop',
      'keyword.control.trycatch',
      'keyword.operator.new',
      'keyword.operator.expression',
      'keyword.operator.expression.typeof',
      'keyword.operator.expression.instanceof',
      'keyword.operator.expression.in',
      'keyword.operator.expression.of',
      'keyword.operator.expression.delete',
      'keyword.operator.expression.void',
      'keyword.operator.expression.import',
      'keyword.operator.logical',
      'keyword.operator.ternary',
      'keyword.other',
      'storage',
      'storage.type',
      'storage.type.function',
      'storage.type.class',
      'storage.type.enum',
      'storage.type.interface',
      'storage.type.namespace',
      'storage.type.type',
      'storage.modifier',
      'storage.modifier.async',
      'storage.modifier.tsx',
      'variable.language',
      'variable.language.this',
      'variable.language.super',
      'constant.language',
      'constant.language.null',
      'constant.language.undefined',
      'constant.language.nan',
      'support.type.builtin',
    ],
    settings: {
      foreground: syntax.keyword,
    },
  },

  // --------------------------------------------------
  // Booleans  (keyword family #CF8E6D)
  // --------------------------------------------------
  {
    scope: ['constant.language.boolean', 'constant.language.boolean.true', 'constant.language.boolean.false'],
    settings: {
      foreground: syntax.boolean,
    },
  },

  // --------------------------------------------------
  // Types, classes, interfaces, enums  (DEFAULT_CLASS_REFERENCE #BCBEC4)
  // JetBrains renders these in the plain editor foreground.
  // --------------------------------------------------
  {
    scope: [
      'entity.name.type',
      'entity.name.type.class',
      'entity.name.type.interface',
      'entity.name.type.enum',
      'entity.name.type.alias',
      'entity.name.type.module',
      'entity.name.class',
      'entity.other.inherited-class',
      'support.type',
      'support.class',
      'support.class.builtin',
      'support.type.object.module',
      'meta.type.annotation entity.name.type',
      'meta.return.type entity.name.type',
      'keyword.other.class',
    ],
    settings: {
      foreground: syntax.type,
    },
  },

  // --------------------------------------------------
  // Type parameters / generics  (TYPE_PARAMETER_NAME #16BAAC)
  // --------------------------------------------------
  {
    scope: [
      'entity.name.type.parameter',
      'entity.name.type.type-parameter',
      'meta.type.parameters entity.name.type',
      'meta.type.parameters entity.name.type.parameter',
    ],
    settings: {
      foreground: syntax.typeParameter,
    },
  },

  // --------------------------------------------------
  // Functions & methods  (DEFAULT_FUNCTION_DECLARATION / JS.INSTANCE_MEMBER_FUNCTION #56A8F5)
  // --------------------------------------------------
  {
    scope: [
      'entity.name.function',
      'entity.name.function.member',
      'entity.name.method',
      'meta.function-call entity.name.function',
      'meta.function-call.method',
      'support.function',
      'support.function.dom',
      'variable.function',
      'variable.other.property.function',
      'meta.function-call',
      'meta.method-call meta.method',
    ],
    settings: {
      foreground: syntax.function,
    },
  },

  // --------------------------------------------------
  // Parameters  (inherits identifier #BCBEC4)
  // --------------------------------------------------
  {
    scope: ['variable.parameter', 'meta.parameter', 'variable.parameter.function-call'],
    settings: {
      foreground: syntax.parameter,
    },
  },

  // --------------------------------------------------
  // Fields / properties / object-literal keys  (DEFAULT_INSTANCE_FIELD #C77DBB)
  // --------------------------------------------------
  {
    scope: [
      'variable.other.property',
      'variable.other.object.property',
      'variable.object.property',
      'meta.object-literal.key',
      'support.type.property-name',
      'meta.property.object',
    ],
    settings: {
      foreground: syntax.property,
    },
  },

  // --------------------------------------------------
  // Global / default-library variables  (JS.GLOBAL_VARIABLE #C77DBB italic)
  // --------------------------------------------------
  {
    scope: ['variable.other.global', 'support.variable.global', 'variable.language.prototype'],
    settings: {
      foreground: syntax.globalVariable,
      fontStyle: 'italic',
    },
  },

  // --------------------------------------------------
  // Constants  (DEFAULT_CONSTANT #C77DBB italic)
  // --------------------------------------------------
  {
    scope: [
      'variable.other.constant',
      'variable.other.enummember',
      'constant.other',
      'constant.character',
      'support.constant',
      'support.constant.math',
      'support.constant.json',
    ],
    settings: {
      foreground: syntax.constant,
      fontStyle: 'italic',
    },
  },

  // --------------------------------------------------
  // Numbers  (DEFAULT_NUMBER #2AACB8)
  // --------------------------------------------------
  {
    scope: ['constant.numeric', 'constant.numeric.decimal', 'constant.numeric.hex', 'keyword.other.unit'],
    settings: {
      foreground: syntax.number,
    },
  },

  // --------------------------------------------------
  // Strings  (DEFAULT_STRING #6AAB73)
  // --------------------------------------------------
  {
    scope: [
      'string',
      'string.quoted.single',
      'string.quoted.double',
      'string.quoted.backtick',
      'string.template',
      'string.unquoted',
      'punctuation.definition.string.begin',
      'punctuation.definition.string.end',
      'punctuation.definition.string.template.begin',
      'punctuation.definition.string.template.end',
    ],
    settings: {
      foreground: syntax.string,
    },
  },

  // --------------------------------------------------
  // String escapes  (DEFAULT_VALID_STRING_ESCAPE #CF8E6D)
  // --------------------------------------------------
  {
    scope: ['constant.character.escape', 'constant.other.placeholder', 'punctuation.quasi.element'],
    settings: {
      foreground: syntax.escape,
    },
  },

  // --------------------------------------------------
  // Regular expressions  (JS.REGEXP #42C3D4)
  // --------------------------------------------------
  {
    scope: [
      'string.regexp',
      'punctuation.definition.string.begin.regexp',
      'punctuation.definition.string.end.regexp',
      'constant.other.character-class.regexp',
      'keyword.operator.quantifier.regexp',
    ],
    settings: {
      foreground: syntax.regexp,
    },
  },

  // --------------------------------------------------
  // Comments  (DEFAULT_LINE_COMMENT #7A7E85, italic)
  // --------------------------------------------------
  {
    scope: ['comment', 'comment.line', 'comment.block', 'punctuation.definition.comment'],
    settings: {
      foreground: syntax.comment,
      fontStyle: 'italic',
    },
  },
  {
    scope: ['comment.block.documentation', 'punctuation.definition.comment.documentation'],
    settings: {
      foreground: syntax.docComment,
      fontStyle: 'italic',
    },
  },
  {
    scope: [
      'comment.block.documentation storage.type.class.jsdoc',
      'comment.block.documentation keyword.other.phpdoc',
      'comment.block.documentation entity.name.type.instance.jsdoc',
      'keyword.other.documentation',
    ],
    settings: {
      foreground: syntax.docTag,
    },
  },

  // --------------------------------------------------
  // Operators  (DEFAULT_OPERATION_SIGN #BCBEC4)
  // --------------------------------------------------
  {
    scope: ['keyword.operator', 'keyword.operator.assignment', 'keyword.operator.arithmetic', 'keyword.operator.comparison', 'keyword.operator.relational', 'storage.type.function.arrow'],
    settings: {
      foreground: syntax.operator,
    },
  },

  // --------------------------------------------------
  // Punctuation & brackets  (DEFAULT_BRACES / DOT / COMMA #BCBEC4)
  // --------------------------------------------------
  {
    scope: [
      'punctuation',
      'punctuation.separator',
      'punctuation.terminator',
      'punctuation.section',
      'punctuation.accessor',
      'punctuation.definition.parameters',
      'punctuation.definition.array',
      'punctuation.definition.dictionary',
      'punctuation.definition.block',
      'punctuation.definition.typeparameters',
      'punctuation.definition.binding-pattern',
      'meta.brace',
      'meta.brace.round',
      'meta.brace.square',
      'meta.brace.curly',
      'meta.delimiter',
      'meta.bracket',
      'meta.separator',
      'punctuation.section.embedded',
    ],
    settings: {
      foreground: syntax.punctuation,
    },
  },

  // --------------------------------------------------
  // Decorators / annotations  (DEFAULT_METADATA #B3AE60)
  // --------------------------------------------------
  {
    scope: [
      'meta.decorator',
      'punctuation.decorator',
      'entity.name.function.decorator',
      'meta.decorator entity.name.function',
      'meta.decorator punctuation.decorator',
      'tag.decorator',
      'storage.type.annotation',
      'support.type.annotation',
    ],
    settings: {
      foreground: syntax.decorator,
    },
  },

  // --------------------------------------------------
  // Namespaces / modules  (inherits identifier #BCBEC4)
  // --------------------------------------------------
  {
    scope: ['entity.name.namespace', 'entity.name.module', 'entity.name.type.namespace', 'variable.other.namespace'],
    settings: {
      foreground: syntax.namespace,
    },
  },

  // --------------------------------------------------
  // Labels  (KOTLIN_LABEL / JS label #32B8AF)
  // --------------------------------------------------
  {
    scope: ['entity.name.label', 'punctuation.definition.label'],
    settings: {
      foreground: syntax.label,
    },
  },

  // ==================================================
  //  HTML / XML / JSX / TSX
  // ==================================================

  // HTML & XML element tags  (HTML_TAG_NAME #D5B778) — includes the angle brackets
  {
    scope: [
      'entity.name.tag',
      'entity.name.tag.html',
      'entity.name.tag.xml',
      'entity.name.tag.script.html',
      'entity.name.tag.style.html',
      'meta.tag.sgml',
      'punctuation.definition.tag',
      'punctuation.definition.tag.begin',
      'punctuation.definition.tag.end',
      'punctuation.definition.tag.begin.html',
      'punctuation.definition.tag.end.html',
      'text.html punctuation.definition.tag',
    ],
    settings: {
      foreground: syntax.tag,
    },
  },

  // JSX / TSX intrinsic element tags  (<div>, <span> …) — gold, brackets included
  {
    scope: [
      'entity.name.tag.tsx',
      'entity.name.tag.jsx',
      'source.tsx entity.name.tag',
      'source.jsx entity.name.tag',
      'JSXNested',
      'punctuation.definition.tag.begin.tsx',
      'punctuation.definition.tag.end.tsx',
      'punctuation.definition.tag.begin.jsx',
      'punctuation.definition.tag.end.jsx',
    ],
    settings: {
      foreground: syntax.tag,
    },
  },

  // JSX / TSX component tags  (<MyComponent>, <Foo.Bar>)  (HTML_CUSTOM_TAG_NAME #2FBAA3)
  {
    scope: [
      'support.class.component',
      'support.class.component.tsx',
      'support.class.component.jsx',
      'support.class.component.open.tsx',
      'support.class.component.close.tsx',
      'entity.name.tag.namespace',
      'meta.tag.custom entity.name.tag',
      'entity.name.tag.custom',
    ],
    settings: {
      foreground: syntax.component,
    },
  },

  // Attribute names  (XML_ATTRIBUTE_NAME #BCBEC4 — plain)
  {
    scope: [
      'entity.other.attribute-name',
      'entity.other.attribute-name.html',
      'entity.other.attribute-name.tsx',
      'entity.other.attribute-name.jsx',
      'entity.other.attribute-name.xml',
      'meta.tag entity.other.attribute-name',
      'meta.jsx.children',
    ],
    settings: {
      foreground: syntax.attribute,
    },
  },

  // HTML entities  (HTML_ENTITY_REFERENCE #56A8F5)
  {
    scope: ['constant.character.entity.html', 'text.html constant.character.entity', 'punctuation.definition.entity.html'],
    settings: {
      foreground: syntax.function,
    },
  },

  // --------------------------------------------------
  // CSS / SCSS
  // --------------------------------------------------
  {
    scope: ['support.type.property-name.css', 'support.type.property-name.scss', 'support.type.vendored.property-name.css'],
    settings: {
      foreground: syntax.attribute,
    },
  },
  {
    scope: ['entity.name.tag.css', 'entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css', 'entity.other.attribute-name.pseudo-class.css'],
    settings: {
      foreground: syntax.keyword,
    },
  },
  {
    scope: ['support.constant.color.w3c-standard-color-name.css', 'constant.other.color'],
    settings: {
      foreground: syntax.function,
    },
  },

  // --------------------------------------------------
  // JSON
  // --------------------------------------------------
  {
    scope: ['support.type.property-name.json', 'string.json support.type.property-name'],
    settings: {
      foreground: syntax.property,
    },
  },

  // --------------------------------------------------
  // Markdown  (Islands leaves most markup near neutral; headings bold)
  // --------------------------------------------------
  {
    scope: ['markup.heading', 'markup.heading entity.name', 'punctuation.definition.heading'],
    settings: {
      foreground: syntax.keyword,
      fontStyle: 'bold',
    },
  },
  {
    scope: ['markup.bold', 'punctuation.definition.bold'],
    settings: {
      fontStyle: 'bold',
    },
  },
  {
    scope: ['markup.italic', 'punctuation.definition.italic'],
    settings: {
      fontStyle: 'italic',
    },
  },
  {
    scope: ['markup.inline.raw', 'markup.raw.block', 'markup.fenced_code.block'],
    settings: {
      foreground: syntax.string,
    },
  },
  {
    scope: ['markup.underline.link', 'string.other.link', 'constant.other.reference.link.markdown'],
    settings: {
      foreground: syntax.function,
    },
  },
  {
    scope: ['markup.list punctuation.definition.list.begin', 'markup.quote'],
    settings: {
      foreground: syntax.comment,
    },
  },

  // --------------------------------------------------
  // Diff / merge
  // --------------------------------------------------
  {
    scope: ['markup.inserted', 'meta.diff.header.to-file'],
    settings: {
      foreground: syntax.string,
    },
  },
  {
    scope: ['markup.deleted', 'meta.diff.header.from-file'],
    settings: {
      foreground: syntax.invalid,
    },
  },
  {
    scope: ['markup.changed'],
    settings: {
      foreground: syntax.decorator,
    },
  },

  // --------------------------------------------------
  // Invalid / deprecated  (BAD_CHARACTER #F56C6C)
  // --------------------------------------------------
  {
    scope: ['invalid', 'invalid.illegal'],
    settings: {
      foreground: syntax.invalid,
    },
  },
  {
    scope: ['invalid.deprecated'],
    settings: {
      foreground: syntax.invalid,
      fontStyle: 'strikethrough',
    },
  },
] as const;
