import { islands } from '../islands.js';

/**
 * Semantic surface tokens — the Islands Dark workbench layers
 * (`ManyIslandsDark.theme.json`). Editor & tool windows sit on `gray-10`,
 * raised chrome (popups, tabs, title bar) on `gray-30`, and transient
 * feedback (notifications, tooltips) on `gray-40`.
 */
export const surface = {
  main: islands.surface.editor, //         editor / sidebar / panel     #191A1C
  sidebar: islands.surface.editor, //      #191A1C
  inset: islands.surface.editorInline, //  search fields, inline inputs  #212326
  raised: islands.surface.raised, //       popups, completion, tabs      #26282C
  header: islands.surface.mainWindow, //   title bar / section headers   #26282C
  chrome: islands.surface.mainWindowAlt, //status bar / activity bar     #33353B
  panel: islands.surface.editor, //        bottom panel = editor ground  #191A1C
  feedback: islands.surface.feedback, //   notifications, hovers         #33353B
  hover: islands.surface.hover, //         transparent hover wash
  active: islands.selection.listActive, // active list row               #2A4371
  line: islands.editor.lineHighlight, //   current-line highlight        #1F2024
  widget: islands.editor.widgetBg, //      lookup / documentation popup  #27282B
} as const;
