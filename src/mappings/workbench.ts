import { surface, text, accent, border, state, git, terminal, syntax, islands } from '../tokens/index.js';

/**
 * VS Code workbench color map.
 *
 * @remarks
 * `buildWorkbench()` is a factory: it takes one {@link WorkbenchTokens} palette
 * and produces the full ~460-key workbench color set. Meridian ships two UI
 * variants that call it with different palettes —
 *
 *   • **Meridian Dark**  → Islands Dark chrome  (`workbenchMapping`, below)
 *   • **Meridian Dark Ultimate** → VS Code Dark Modern chrome (`workbench-ultimate.ts`)
 *
 * — while the *syntax* colors (`tokenColors` + `semanticTokenColors`) are the
 * exact same Islands Dark values for both. The handful of workbench keys that
 * are syntax-adjacent (`editorBracketHighlight.*`, `symbolIcon.*`, `charts.*`)
 * read straight from the shared `syntax` token, so they too stay identical
 * across the two variants regardless of palette.
 */
export type WorkbenchColors = Record<string, string>;

/** Editor-internal + translucent-wash colors that aren't in the core semantic tokens. */
const islandsExtras = {
  lineNumber: islands.editor.lineNumber,
  lineNumberActive: islands.editor.lineNumberActive,
  indentGuide: islands.editor.indentGuide,
  indentGuideActive: islands.editor.indentGuideActive,
  // Explorer/Outline tree guides get their own, bolder stroke — the editor's
  // guide has to stay moderate so it doesn't look like dark dashes cut through
  // a text selection, but the sidebar has no such constraint.
  treeGuide: '#4A4D54',
  treeGuideInactive: '#33353B',
  whitespace: islands.editor.whitespace,
  ruler: islands.editor.ruler,
  bracketMatchBg: islands.editor.matchedBracketBg,
  wordHighlight: islands.selection.wordHighlight,
  wordHighlightStrong: islands.selection.wordHighlightWrite,
  listInactiveSelection: islands.selection.listInactive,
  hoverWash: '#FFFFFF17',
  hoverWashSubtle: '#FFFFFF10',
  activeWash: '#FFFFFF29',
  sepWash: '#FFFFFF3B',
  sliderBg: '#80808040',
  sliderHover: '#80808070',
  sliderActive: '#808080A0',
  sliderMiniBg: '#80808020',
  sliderMiniHover: '#80808040',
  sliderMiniActive: '#80808060',
  inlayFg: '#868A91',
  shadow: '#00000040',
  findCurrent: '#165E70',
  findOther: '#11495780',
  rangeHighlight: '#33353B66',
  hoverHighlight: '#29583C66',
  foldBg: '#33353B66',
  stackFrame: '#2A509166',
  stackFrameFocused: '#2A509199',
  inputErrorBg: islands.red[40],
  inputWarningBg: islands.yellow[40],
  inputInfoBg: islands.blue[40],
  dropBg: '#3871E133',
  commentRangeBg: '#3871E11A',
  diffInsertedText: '#2A6E4726',
  diffRemovedText: '#80383E33',
  diffInsertedLine: '#2A6E471A',
  diffRemovedLine: '#80383E1A',
  diffInsertedGutter: '#2A6E4726',
  diffRemovedGutter: '#80383E26',
  mergeCurrentHeader: '#2A6E4759',
  mergeCurrentContent: '#2A6E4726',
  mergeIncomingHeader: '#2E4D8959',
  mergeIncomingContent: '#2E4D8926',
  extBtnHover: islands.green[70],
  none: '#00000000',
} as const;

const islandsTokens = { surface, text, border, accent, state, git, terminal, extras: islandsExtras } as const;

/** Palette shape consumed by {@link buildWorkbench}. Every leaf is a hex string. */
export type WorkbenchTokens = {
  readonly [G in keyof typeof islandsTokens]: {
    readonly [K in keyof (typeof islandsTokens)[G]]: string;
  };
};

/**
 * Build the full workbench color map from a palette.
 * Syntax-adjacent keys deliberately bypass `t` and read the shared `syntax` token.
 */
export function buildWorkbench(t: WorkbenchTokens): WorkbenchColors {
  const { surface: s, text: x, border: b, accent: a, state: st, git: g, terminal: term, extras: e } = t;

  return {
    // ── Base / contrast ────────────────────────────────────────────────
    focusBorder: a.primary,
    foreground: x.primary,
    disabledForeground: x.disabled,
    descriptionForeground: x.secondary,
    errorForeground: st.error,
    'icon.foreground': x.primary,
    'selection.background': a.selection,
    'sash.hoverBorder': a.primary,
    'window.activeBorder': e.none,
    'window.inactiveBorder': e.none,

    'textLink.foreground': x.link,
    'textLink.activeForeground': x.link,
    'textPreformat.foreground': x.primary,
    'textBlockQuote.background': s.inset,
    'textBlockQuote.border': b.default,
    'textCodeBlock.background': s.inset,
    'textSeparator.foreground': b.default,

    // ── Editor ─────────────────────────────────────────────────────────
    'editor.background': s.main,
    'editor.foreground': x.editor,
    'editorLineNumber.foreground': e.lineNumber,
    'editorLineNumber.activeForeground': e.lineNumberActive,
    'editorCursor.foreground': a.caret,
    'editor.selectionBackground': a.selection,
    'editor.inactiveSelectionBackground': a.selectionInactive,
    'editor.selectionHighlightBackground': e.wordHighlight,
    'editor.selectionHighlightBorder': e.none,
    'editor.wordHighlightBackground': e.wordHighlight,
    'editor.wordHighlightStrongBackground': e.wordHighlightStrong,
    'editor.findMatchBackground': e.findCurrent,
    'editor.findMatchHighlightBackground': e.findOther,
    'editor.findRangeHighlightBackground': e.rangeHighlight,
    'editor.lineHighlightBackground': s.line,
    'editor.lineHighlightBorder': e.none,
    'editor.rangeHighlightBackground': e.rangeHighlight,
    'editor.hoverHighlightBackground': e.hoverHighlight,
    'editor.foldBackground': e.foldBg,
    'editorLink.activeForeground': x.link,
    'editorWhitespace.foreground': e.whitespace,
    'editorIndentGuide.background1': e.indentGuide,
    'editorIndentGuide.activeBackground1': e.indentGuideActive,
    'editorInlayHint.foreground': e.inlayFg,
    'editorInlayHint.background': e.none,
    'editorInlayHint.typeForeground': e.inlayFg,
    'editorInlayHint.parameterForeground': e.inlayFg,
    'editorRuler.foreground': e.ruler,
    'editorCodeLens.foreground': x.muted,
    'editorBracketMatch.background': e.bracketMatchBg,
    'editorBracketMatch.border': e.none,
    'editorBracketHighlight.foreground1': syntax.punctuation,
    'editorBracketHighlight.foreground2': syntax.punctuation,
    'editorBracketHighlight.foreground3': syntax.punctuation,
    'editorBracketHighlight.foreground4': syntax.punctuation,
    'editorBracketHighlight.foreground5': syntax.punctuation,
    'editorBracketHighlight.foreground6': syntax.punctuation,
    'editorBracketHighlight.unexpectedBracket.foreground': syntax.invalid,
    'editorBracketPairGuide.background1': e.indentGuide,
    'editorBracketPairGuide.activeBackground1': e.indentGuideActive,
    'editorUnicodeHighlight.border': st.warning,

    // Editor diagnostics
    'editorError.foreground': st.error,
    'editorWarning.foreground': st.warning,
    'editorInfo.foreground': st.info,
    'editorHint.foreground': st.hint,
    'editorGutter.background': s.main,
    'editorGutter.addedBackground': g.addedGutter,
    'editorGutter.modifiedBackground': g.modifiedGutter,
    'editorGutter.deletedBackground': g.deletedGutter,
    'editorGutter.foldingControlForeground': x.muted,

    // Editor overview ruler
    'editorOverviewRuler.border': b.default,
    'editorOverviewRuler.background': s.main,
    'editorOverviewRuler.findMatchForeground': e.findCurrent,
    'editorOverviewRuler.errorForeground': st.errorStripe,
    'editorOverviewRuler.warningForeground': st.warningStripe,
    'editorOverviewRuler.infoForeground': st.info,
    'editorOverviewRuler.addedForeground': g.addedGutter,
    'editorOverviewRuler.modifiedForeground': g.modifiedGutter,
    'editorOverviewRuler.deletedForeground': g.deletedGutter,
    'editorOverviewRuler.selectionHighlightForeground': e.wordHighlight,
    'editorOverviewRuler.wordHighlightForeground': e.wordHighlight,

    // ── Editor widgets (hover, suggest, find, peek) ────────────────────
    'editorWidget.background': s.raised,
    'editorWidget.foreground': x.primary,
    'editorWidget.border': b.popup,
    'editorWidget.resizeBorder': a.primary,
    'editorSuggestWidget.background': s.widget,
    'editorSuggestWidget.border': b.popup,
    'editorSuggestWidget.foreground': x.editor,
    'editorSuggestWidget.selectedBackground': s.active,
    'editorSuggestWidget.selectedForeground': x.primary,
    'editorSuggestWidget.highlightForeground': a.hover,
    'editorSuggestWidget.focusHighlightForeground': a.hover,
    'editorHoverWidget.background': s.raised,
    'editorHoverWidget.foreground': x.primary,
    'editorHoverWidget.border': b.popup,
    'editorGhostText.foreground': x.muted,
    'editorStickyScroll.background': s.main,
    'editorStickyScrollHover.background': e.hoverWashSubtle,
    'editorMarkerNavigation.background': s.raised,
    'editorMarkerNavigationError.background': st.error,
    'editorMarkerNavigationWarning.background': st.warning,
    'editorMarkerNavigationInfo.background': st.info,

    'peekView.border': a.primary,
    'peekViewEditor.background': s.inset,
    'peekViewEditorGutter.background': s.inset,
    'peekViewEditor.matchHighlightBackground': e.findOther,
    'peekViewResult.background': s.raised,
    'peekViewResult.foreground': x.primary,
    'peekViewResult.selectionBackground': s.active,
    'peekViewResult.selectionForeground': x.primary,
    'peekViewResult.matchHighlightBackground': e.findOther,
    'peekViewResult.fileForeground': x.primary,
    'peekViewResult.lineForeground': x.muted,
    'peekViewTitle.background': s.raised,
    'peekViewTitleLabel.foreground': x.primary,
    'peekViewTitleDescription.foreground': x.muted,

    // ── Editor groups & tabs ───────────────────────────────────────────
    'editorGroup.border': b.default,
    'editorGroup.dropBackground': e.dropBg,
    'editorGroupHeader.tabsBackground': s.main,
    'editorGroupHeader.tabsBorder': b.default,
    'editorGroupHeader.noTabsBackground': s.main,
    'editorGroupHeader.border': b.default,
    'editorPane.background': s.main,
    'tab.activeBackground': a.tabActiveBg,
    'tab.activeForeground': x.primary,
    'tab.inactiveBackground': s.main,
    'tab.inactiveForeground': x.muted,
    'tab.unfocusedActiveForeground': x.muted,
    'tab.unfocusedInactiveForeground': x.disabled,
    'tab.hoverBackground': e.hoverWash,
    'tab.unfocusedHoverBackground': e.hoverWashSubtle,
    'tab.activeBorder': e.none,
    'tab.unfocusedActiveBorder': e.none,
    'tab.activeBorderTop': a.tabActiveBorder,
    'tab.unfocusedActiveBorderTop': b.control,
    'tab.border': s.main,
    'tab.lastPinnedBorder': b.control,
    'tab.activeModifiedBorder': g.modified,
    'tab.inactiveModifiedBorder': g.modifiedGutter,

    // ── Activity bar ───────────────────────────────────────────────────
    'activityBar.background': s.chrome,
    'activityBar.foreground': x.primary,
    'activityBar.inactiveForeground': x.muted,
    'activityBar.border': e.none,
    'activityBar.activeBorder': a.primary,
    'activityBar.activeBackground': e.none,
    'activityBar.dropBorder': a.primary,
    'activityBarBadge.background': a.primary,
    'activityBarBadge.foreground': x.inverse,
    'activityBarTop.foreground': x.primary,
    'activityBarTop.inactiveForeground': x.muted,
    'activityBarTop.activeBorder': a.primary,

    // ── Side bar ───────────────────────────────────────────────────────
    'sideBar.background': s.main,
    'sideBar.foreground': x.primary,
    'sideBar.border': b.subtle,
    'sideBar.dropBackground': e.dropBg,
    'sideBarTitle.foreground': x.muted,
    'sideBarSectionHeader.background': s.main,
    'sideBarSectionHeader.foreground': x.muted,
    'sideBarSectionHeader.border': e.none,
    'sideBarActivityBarTop.border': b.default,

    // ── Lists & trees ──────────────────────────────────────────────────
    'list.activeSelectionBackground': s.active,
    'list.activeSelectionForeground': x.primary,
    'list.activeSelectionIconForeground': x.primary,
    'list.inactiveSelectionBackground': e.listInactiveSelection,
    'list.inactiveSelectionForeground': x.primary,
    'list.focusBackground': s.active,
    'list.focusForeground': x.primary,
    'list.focusOutline': e.none,
    'list.hoverBackground': e.hoverWashSubtle,
    'list.hoverForeground': x.primary,
    'list.highlightForeground': a.hover,
    'list.focusHighlightForeground': a.hover,
    'list.errorForeground': st.error,
    'list.warningForeground': st.warning,
    'list.deemphasizedForeground': x.muted,
    'list.dropBackground': e.dropBg,
    'listFilterWidget.background': s.raised,
    'listFilterWidget.outline': a.primary,
    'listFilterWidget.noMatchesOutline': st.error,
    // Explorer / Outline / any tree view — a dedicated, bolder stroke (see
    // `treeGuide` above) so nesting is unmistakable, independent of what the
    // editor's own guide needs to stay calm against a text selection.
    'tree.indentGuidesStroke': e.treeGuide,
    'tree.tableColumnsBorder': b.default,
    'tree.inactiveIndentGuidesStroke': e.treeGuideInactive,

    // ── Inputs, dropdowns, checkboxes ──────────────────────────────────
    'input.background': s.main,
    'input.foreground': x.primary,
    'input.border': b.control,
    'input.placeholderForeground': x.muted,
    'inputOption.activeBorder': a.primary,
    'inputOption.activeBackground': e.dropBg,
    'inputOption.activeForeground': x.primary,
    'inputOption.hoverBackground': e.hoverWash,
    'inputValidation.errorBackground': e.inputErrorBg,
    'inputValidation.errorBorder': st.errorBg,
    'inputValidation.errorForeground': x.primary,
    'inputValidation.warningBackground': e.inputWarningBg,
    'inputValidation.warningBorder': st.warningBg,
    'inputValidation.warningForeground': x.primary,
    'inputValidation.infoBackground': e.inputInfoBg,
    'inputValidation.infoBorder': st.infoBg,
    'inputValidation.infoForeground': x.primary,
    'dropdown.background': s.raised,
    'dropdown.listBackground': s.raised,
    'dropdown.foreground': x.primary,
    'dropdown.border': b.control,
    'checkbox.background': s.main,
    'checkbox.foreground': x.primary,
    'checkbox.border': b.control,
    'checkbox.selectBackground': a.primary,
    'checkbox.selectBorder': a.primary,

    // ── Buttons ────────────────────────────────────────────────────────
    'button.background': a.primary,
    'button.foreground': x.inverse,
    'button.hoverBackground': a.hover,
    'button.border': e.none,
    'button.separator': e.sepWash,
    'button.secondaryBackground': s.raised,
    'button.secondaryForeground': x.primary,
    'button.secondaryHoverBackground': s.feedback,
    'progressBar.background': a.primary,

    // ── Badges & counters ──────────────────────────────────────────────
    'badge.background': b.active,
    'badge.foreground': x.inverse,

    // ── Scrollbars ─────────────────────────────────────────────────────
    'scrollbar.shadow': e.none,
    'scrollbarSlider.background': e.sliderBg,
    'scrollbarSlider.hoverBackground': e.sliderHover,
    'scrollbarSlider.activeBackground': e.sliderActive,
    'editorScrollbar.background': e.none,

    // ── Minimap ────────────────────────────────────────────────────────
    'minimap.background': s.main,
    'minimap.selectionHighlight': a.selection,
    'minimap.errorHighlight': st.error,
    'minimap.warningHighlight': st.warning,
    'minimap.findMatchHighlight': e.findCurrent,
    'minimap.selectionOccurrenceHighlight': e.wordHighlight,
    'minimapGutter.addedBackground': g.addedGutter,
    'minimapGutter.modifiedBackground': g.modifiedGutter,
    'minimapGutter.deletedBackground': g.deletedGutter,
    'minimapSlider.background': e.sliderMiniBg,
    'minimapSlider.hoverBackground': e.sliderMiniHover,
    'minimapSlider.activeBackground': e.sliderMiniActive,

    // ── Status bar ─────────────────────────────────────────────────────
    'statusBar.background': s.chrome,
    'statusBar.foreground': x.muted,
    'statusBar.border': e.none,
    'statusBar.focusBorder': a.primary,
    'statusBar.noFolderBackground': s.chrome,
    'statusBar.noFolderForeground': x.muted,
    'statusBar.debuggingBackground': st.warningBg,
    'statusBar.debuggingForeground': x.inverse,
    'statusBarItem.activeBackground': e.activeWash,
    'statusBarItem.hoverBackground': e.hoverWash,
    'statusBarItem.hoverForeground': x.primary,
    'statusBarItem.prominentBackground': e.shadow,
    'statusBarItem.prominentHoverBackground': e.hoverWash,
    'statusBarItem.remoteBackground': a.primary,
    'statusBarItem.remoteForeground': x.inverse,
    'statusBarItem.errorBackground': st.errorBg,
    'statusBarItem.errorForeground': x.inverse,
    'statusBarItem.warningBackground': st.warningBg,
    'statusBarItem.warningForeground': x.inverse,

    // ── Title bar / command center ─────────────────────────────────────
    'titleBar.activeBackground': s.chrome,
    'titleBar.activeForeground': x.primary,
    'titleBar.inactiveBackground': s.chrome,
    'titleBar.inactiveForeground': x.muted,
    'titleBar.border': e.none,
    'commandCenter.background': s.main,
    'commandCenter.foreground': x.primary,
    'commandCenter.activeForeground': x.primary,
    'commandCenter.border': b.control,
    'commandCenter.activeBackground': e.hoverWash,
    'commandCenter.activeBorder': a.primary,

    // ── Menus ──────────────────────────────────────────────────────────
    'menubar.selectionBackground': e.hoverWash,
    'menubar.selectionForeground': x.primary,
    'menu.background': s.raised,
    'menu.foreground': x.primary,
    'menu.selectionBackground': s.active,
    'menu.selectionForeground': x.primary,
    'menu.selectionBorder': e.none,
    'menu.separatorBackground': b.popup,
    'menu.border': b.popup,

    // ── Panel (terminal / problems / output) ───────────────────────────
    'panel.background': s.main,
    'panel.border': b.default,
    'panel.dropBorder': a.primary,
    'panelTitle.activeForeground': x.primary,
    'panelTitle.inactiveForeground': x.muted,
    'panelTitle.activeBorder': a.primary,
    'panelSection.border': b.default,
    'panelSectionHeader.background': s.main,
    'panelSectionHeader.foreground': x.muted,
    'panelInput.border': b.control,
    'panelStickyScroll.background': s.main,

    // ── Terminal ───────────────────────────────────────────────────────
    'terminal.background': term.background,
    'terminal.foreground': term.foreground,
    'terminal.border': b.default,
    'terminalCursor.foreground': a.caret,
    'terminalCursor.background': s.main,
    'terminal.selectionBackground': a.selection,
    'terminal.inactiveSelectionBackground': a.selectionInactive,
    'terminal.findMatchBackground': e.findCurrent,
    'terminal.ansiBlack': term.black,
    'terminal.ansiRed': term.red,
    'terminal.ansiGreen': term.green,
    'terminal.ansiYellow': term.yellow,
    'terminal.ansiBlue': term.blue,
    'terminal.ansiMagenta': term.magenta,
    'terminal.ansiCyan': term.cyan,
    'terminal.ansiWhite': term.white,
    'terminal.ansiBrightBlack': term.brightBlack,
    'terminal.ansiBrightRed': term.brightRed,
    'terminal.ansiBrightGreen': term.brightGreen,
    'terminal.ansiBrightYellow': term.brightYellow,
    'terminal.ansiBrightBlue': term.brightBlue,
    'terminal.ansiBrightMagenta': term.brightMagenta,
    'terminal.ansiBrightCyan': term.brightCyan,
    'terminal.ansiBrightWhite': term.brightWhite,

    // ── Notifications ──────────────────────────────────────────────────
    'notificationCenter.border': b.popup,
    'notificationCenterHeader.background': s.raised,
    'notificationCenterHeader.foreground': x.muted,
    'notificationToast.border': b.popup,
    'notifications.background': s.feedback,
    'notifications.foreground': x.primary,
    'notifications.border': b.popup,
    'notificationLink.foreground': x.link,
    'notificationsErrorIcon.foreground': st.error,
    'notificationsWarningIcon.foreground': st.warning,
    'notificationsInfoIcon.foreground': st.info,

    // ── Git decorations ────────────────────────────────────────────────
    'gitDecoration.addedResourceForeground': g.added,
    'gitDecoration.modifiedResourceForeground': g.modified,
    'gitDecoration.deletedResourceForeground': g.deleted,
    'gitDecoration.renamedResourceForeground': g.added,
    'gitDecoration.untrackedResourceForeground': g.untracked,
    'gitDecoration.ignoredResourceForeground': g.ignored,
    'gitDecoration.conflictingResourceForeground': g.conflicting,
    'gitDecoration.stageModifiedResourceForeground': g.modified,
    'gitDecoration.stageDeletedResourceForeground': g.deleted,
    'gitDecoration.submoduleResourceForeground': x.link,

    // ── Diff editor ────────────────────────────────────────────────────
    'diffEditor.insertedTextBackground': e.diffInsertedText,
    'diffEditor.removedTextBackground': e.diffRemovedText,
    'diffEditor.insertedLineBackground': e.diffInsertedLine,
    'diffEditor.removedLineBackground': e.diffRemovedLine,
    'diffEditor.diagonalFill': b.default,
    'diffEditor.border': b.default,
    'diffEditorGutter.insertedLineBackground': e.diffInsertedGutter,
    'diffEditorGutter.removedLineBackground': e.diffRemovedGutter,

    // ── Merge conflicts ────────────────────────────────────────────────
    'merge.currentHeaderBackground': e.mergeCurrentHeader,
    'merge.currentContentBackground': e.mergeCurrentContent,
    'merge.incomingHeaderBackground': e.mergeIncomingHeader,
    'merge.incomingContentBackground': e.mergeIncomingContent,
    'merge.border': b.default,

    // ── Breadcrumbs ────────────────────────────────────────────────────
    'breadcrumb.foreground': x.muted,
    'breadcrumb.focusForeground': x.primary,
    'breadcrumb.activeSelectionForeground': x.primary,
    'breadcrumb.background': s.main,
    'breadcrumbPicker.background': s.raised,

    // ── Quick input / pickers ──────────────────────────────────────────
    'quickInput.background': s.raised,
    'quickInput.foreground': x.primary,
    'quickInputList.focusBackground': s.active,
    'quickInputList.focusForeground': x.primary,
    'quickInputList.focusIconForeground': x.primary,
    'quickInputTitle.background': s.raised,
    'pickerGroup.foreground': x.muted,
    'pickerGroup.border': b.popup,

    // ── Keybinding labels ──────────────────────────────────────────────
    'keybindingLabel.background': e.hoverWash,
    'keybindingLabel.foreground': x.primary,
    'keybindingLabel.border': e.none,
    'keybindingLabel.bottomBorder': e.none,
    'keybindingTable.headerBackground': s.raised,
    'keybindingTable.rowsBackground': s.main,

    // ── Settings editor ────────────────────────────────────────────────
    'settings.headerForeground': x.primary,
    'settings.modifiedItemIndicator': a.primary,
    'settings.dropdownBackground': s.raised,
    'settings.dropdownBorder': b.control,
    'settings.textInputBackground': s.main,
    'settings.textInputBorder': b.control,
    'settings.numberInputBackground': s.main,
    'settings.numberInputBorder': b.control,
    'settings.checkboxBackground': s.main,
    'settings.checkboxBorder': b.control,
    'settings.rowHoverBackground': e.hoverWashSubtle,
    'settings.focusedRowBackground': e.hoverWashSubtle,

    // ── Debug ──────────────────────────────────────────────────────────
    'debugToolBar.background': s.raised,
    'debugToolBar.border': b.popup,
    'debugIcon.breakpointForeground': st.error,
    'debugIcon.breakpointDisabledForeground': x.disabled,
    'debugIcon.startForeground': st.success,
    'debugIcon.pauseForeground': st.info,
    'debugIcon.stopForeground': st.error,
    'debugIcon.stepOverForeground': st.info,
    'debugIcon.restartForeground': st.success,
    'editor.stackFrameHighlightBackground': e.stackFrame,
    'editor.focusedStackFrameHighlightBackground': e.stackFrameFocused,
    'debugConsole.infoForeground': x.primary,
    'debugConsole.errorForeground': st.error,
    'debugConsole.warningForeground': st.warning,
    'debugConsole.sourceForeground': x.muted,
    'debugConsoleInputIcon.foreground': syntax.string,

    // ── Testing ────────────────────────────────────────────────────────
    'testing.iconPassed': st.success,
    'testing.iconFailed': st.error,
    'testing.iconErrored': st.error,
    'testing.iconSkipped': x.muted,
    'testing.runAction': st.success,

    // ── Charts (markdown, notebooks) — shared syntax palette ───────────
    'charts.foreground': x.primary,
    'charts.lines': b.control,
    'charts.red': syntax.invalid,
    'charts.blue': syntax.function,
    'charts.yellow': syntax.tag,
    'charts.orange': syntax.keyword,
    'charts.green': syntax.string,
    'charts.purple': syntax.property,

    // ── Welcome / walkthrough ──────────────────────────────────────────
    'welcomePage.background': s.main,
    'welcomePage.tileBackground': s.raised,
    'welcomePage.tileHoverBackground': s.feedback,
    'welcomePage.progress.background': s.inset,
    'welcomePage.progress.foreground': a.primary,
    'walkThrough.embeddedEditorBackground': s.inset,

    // ── Extensions view ────────────────────────────────────────────────
    'extensionButton.prominentBackground': st.successBg,
    'extensionButton.prominentForeground': x.inverse,
    'extensionButton.prominentHoverBackground': e.extBtnHover,
    'extensionButton.background': a.primary,
    'extensionButton.foreground': x.inverse,
    'extensionButton.hoverBackground': a.hover,
    'extensionBadge.remoteBackground': a.primary,
    'extensionBadge.remoteForeground': x.inverse,
    'extensionIcon.starForeground': syntax.tag,
    'extensionIcon.verifiedForeground': st.success,

    // ── Symbol icons — shared syntax palette ──────────────────────────
    'symbolIcon.classForeground': syntax.type,
    'symbolIcon.interfaceForeground': syntax.type,
    'symbolIcon.enumeratorForeground': syntax.type,
    'symbolIcon.structForeground': syntax.type,
    'symbolIcon.functionForeground': syntax.function,
    'symbolIcon.methodForeground': syntax.function,
    'symbolIcon.constructorForeground': syntax.function,
    'symbolIcon.eventForeground': syntax.function,
    'symbolIcon.variableForeground': syntax.variable,
    'symbolIcon.fieldForeground': syntax.property,
    'symbolIcon.propertyForeground': syntax.property,
    'symbolIcon.enumeratorMemberForeground': syntax.constant,
    'symbolIcon.constantForeground': syntax.constant,
    'symbolIcon.keywordForeground': syntax.keyword,
    'symbolIcon.moduleForeground': syntax.namespace,
    'symbolIcon.namespaceForeground': syntax.namespace,
    'symbolIcon.stringForeground': syntax.string,
    'symbolIcon.numberForeground': syntax.number,
    'symbolIcon.booleanForeground': syntax.boolean,
    'symbolIcon.typeParameterForeground': syntax.typeParameter,
    'symbolIcon.colorForeground': syntax.function,
    'symbolIcon.snippetForeground': x.muted,

    // ── Notebook ───────────────────────────────────────────────────────
    'notebook.editorBackground': s.main,
    'notebook.cellEditorBackground': s.inset,
    'notebook.cellBorderColor': b.default,
    'notebook.focusedCellBorder': a.primary,
    'notebook.selectedCellBackground': e.hoverWashSubtle,
    'notebook.cellHoverBackground': e.hoverWashSubtle,
    'notebookStatusSuccessIcon.foreground': st.success,
    'notebookStatusErrorIcon.foreground': st.error,

    // ── SCM / comments ─────────────────────────────────────────────────
    'scm.providerBorder': b.default,
    'peekViewEditorStickyScroll.background': s.inset,
    'editorCommentsWidget.resolvedBorder': b.control,
    'editorCommentsWidget.unresolvedBorder': a.primary,
    'editorCommentsWidget.rangeBackground': e.commentRangeBg,
    'editorGutter.commentRangeForeground': x.muted,

    // ── Ports / remote ─────────────────────────────────────────────────
    'ports.iconRunningProcessForeground': st.success,

    // ── Misc widgets ───────────────────────────────────────────────────
    'widget.border': b.default,
    'widget.shadow': e.shadow,
    'editorWidget.foreground2': x.muted,
    'toolbar.hoverBackground': e.hoverWash,
    'toolbar.activeBackground': e.activeWash,
    'banner.background': s.feedback,
    'banner.foreground': x.primary,
    'banner.iconForeground': st.info,
  };
}

/** Meridian Dark — Islands Dark workbench chrome. */
export const workbenchMapping: WorkbenchColors = buildWorkbench(islandsTokens);
