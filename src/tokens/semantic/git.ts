import { islands } from '../islands.js';

/**
 * Semantic version-control tokens — Islands Dark `FILESTATUS_*` (tree / editor
 * decorations) and `*_LINES_COLOR` (gutter change bars).
 */
export const git = {
  added: islands.vcs.added, //          #73BD79
  modified: islands.vcs.modified, //    #70AEFF
  deleted: islands.vcs.deleted, //      #6F737A
  untracked: islands.vcs.unknown, //    #E88F89
  ignored: islands.vcs.ignored, //      #D69A6B
  conflicting: islands.vcs.conflict, // #DE6A66

  addedGutter: islands.vcs.addedGutter, //     #549159
  modifiedGutter: islands.vcs.modifiedGutter, //#375FAD
  deletedGutter: islands.vcs.deletedGutter, // #868A91
} as const;
