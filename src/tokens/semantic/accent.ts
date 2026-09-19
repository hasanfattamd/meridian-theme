import { islands } from '../islands.js';

/**
 * Semantic accent tokens — Islands Dark brand blue (`accent-brand-bg` = blue-80)
 * and the editor's own selection / caret colors.
 */
export const accent = {
  primary: islands.accent.brand, //        buttons, active borders, badges  #3871E1
  hover: islands.accent.brandHover, //     #538AF9
  active: islands.blue[70], //             #2F5EB9
  selection: islands.selection.editor, //  editor text selection            #214283
  selectionInactive: islands.selection.editorInactive, //                   #4C4F56
  caret: islands.editor.caret, //          #CED0D6
  tabActiveBg: islands.tab.activeBg, //    #233558
  tabActiveBorder: islands.tab.activeBorder, //                             #2E4D89
} as const;
