import { islands } from '../islands.js';

/**
 * Semantic text tokens (Islands Dark `text-*` aliases + editor internals).
 */
export const text = {
  primary: islands.text.default, //     default UI text              #D1D3D9
  editor: islands.text.editor, //       editor foreground           #BCBEC4
  secondary: islands.text.muted, //     muted UI text               #9FA2A8
  muted: islands.text.secondary, //     tertiary / breadcrumbs      #73767C
  faint: islands.editor.lineNumber, //  line numbers, gutter        #4B5059
  disabled: islands.text.disabled, //   disabled                    #4C4F56
  link: islands.text.link, //           links                       #71A1FE
  inverse: islands.text.overAccent, //  text on accent fills        #FFFFFF
} as const;
