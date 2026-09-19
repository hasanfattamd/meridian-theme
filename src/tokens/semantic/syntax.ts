import { blue, cyan, green, orange, purple, red, teal, gold, neutral } from '../primitives/index.js';

/**
 * Semantic syntax tokens.
 *
 * Every value is calibrated 1:1 against JetBrains WebStorm's built-in
 * **Islands Dark** editor color scheme (`IslandSchemeDark.xml`, which extends
 * Darcula). The right-hand comment names the JetBrains attribute each token
 * mirrors so the intent survives future palette edits.
 *
 * Design note — why so much resolves to `neutral[200]` (#BCBEC4):
 * JetBrains only colors identifiers that carry navigational weight (fields,
 * functions, constants, keywords). Type references, plain locals, parameters,
 * operators and punctuation all render in the default editor foreground.
 * Coloring them (as most VS Code themes do) is the single biggest visual
 * divergence from Islands Dark, so Meridian deliberately leaves them neutral.
 */
export const syntax = {
  keyword: orange[400], //  DEFAULT_KEYWORD            #CF8E6D
  string: green[400], //    DEFAULT_STRING             #6AAB73
  escape: orange[400], //   DEFAULT_VALID_STRING_ESCAPE #CF8E6D
  comment: neutral[500], // DEFAULT_LINE_COMMENT       #7A7E85
  docComment: green[500], //DEFAULT_DOC_COMMENT        #5F826B (italic)
  docTag: green[400], //    DEFAULT_DOC_COMMENT_TAG    #67A37C
  function: blue[400], //   DEFAULT_FUNCTION_DECLARATION #56A8F5
  type: neutral[200], //    DEFAULT_CLASS_REFERENCE    #BCBEC4 (JB leaves types neutral)
  typeParameter: teal[500], // TYPE_PARAMETER_NAME     #16BAAC
  variable: neutral[200], //DEFAULT_IDENTIFIER         #BCBEC4
  parameter: neutral[200], //(inherits identifier)     #BCBEC4
  property: purple[400], // DEFAULT_INSTANCE_FIELD     #C77DBB
  globalVariable: purple[400], // JS.GLOBAL_VARIABLE   #C77DBB (italic)
  number: cyan[400], //     DEFAULT_NUMBER             #2AACB8
  boolean: orange[400], //  keyword family            #CF8E6D
  constant: purple[400], // DEFAULT_CONSTANT           #C77DBB (italic)
  operator: neutral[200], //DEFAULT_OPERATION_SIGN     #BCBEC4
  punctuation: neutral[200], // DEFAULT_BRACES/DOT/COMMA #BCBEC4
  namespace: neutral[200], //(inherits identifier)     #BCBEC4
  decorator: gold[500], //  DEFAULT_METADATA           #B3AE60
  attribute: neutral[200], //XML_ATTRIBUTE_NAME        #BCBEC4
  tag: gold[400], //        HTML_TAG_NAME              #D5B778
  component: teal[400], //  HTML_CUSTOM_TAG_NAME       #2FBAA3
  regexp: teal[300], //     JS.REGEXP                  #42C3D4
  label: teal[500], //      KOTLIN_LABEL / JS label    #32B8AF
  invalid: red[400], //     BAD_CHARACTER              #F56C6C
} as const;
