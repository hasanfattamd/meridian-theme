import { islands } from '../islands.js';

/**
 * Semantic border tokens. Islands Dark keeps separators one step above the
 * surface they divide: `editor-border` = gray-30, controls = gray-50.
 */
export const border = {
  default: islands.border.editor, //   editor / group / dialog splits  #26282C
  divider: islands.border.dialog, //   one-pixel dividers              #26282C
  subtle: islands.border.editor, //    activity/side bar edges         #26282C
  popup: islands.border.popup, //      popup / menu / notification     #33353B
  control: islands.border.control, //  inputs, table grid              #40434A
  active: islands.border.raised, //    focused / raised control        #5F6269
  strong: islands.border.strong, //    main window outline             #40434A
} as const;
