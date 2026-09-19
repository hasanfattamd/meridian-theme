/**
 * Islands Dark — resolved reference values.
 *
 * JetBrains ships two independent color systems and Meridian mirrors both:
 *
 *  1. The **editor color scheme** (`IslandSchemeDark.xml`, extends Darcula) —
 *     syntax plus editor internals (gutter, caret, guides, folds, diff bars).
 *     Meridian's `primitives/*` + `semantic/syntax.ts` already track this.
 *
 *  2. The **UI theme** (`ManyIslandsDark.theme.json`) — the workbench chrome.
 *     Its palette does NOT match the editor scheme's, so it lives here rather
 *     than in `primitives/*`. Every value below is the fully-resolved result of
 *     the theme's alias chain (`editor-bg` → `layer-0-bg` → `gray-10`).
 *
 * This module is the single source of truth for `semantic/{surface,text,border,
 * accent,state,git,terminal}.ts`, which is where `workbench.ts` reads from.
 */
export const islands = {
  // ── UI grey ramp (ManyIslandsDark `gray-*`) ────────────────────────────
  gray: {
    10: '#191A1C',
    20: '#212326',
    30: '#26282C',
    40: '#33353B',
    50: '#40434A',
    60: '#4C4F56',
    70: '#5F6269',
    80: '#73767C',
    90: '#8B8E94',
    100: '#9FA2A8',
    110: '#B5B7BD',
    120: '#C3C5CB',
    130: '#D1D3D9',
    140: '#DDDFE4',
    150: '#E9EAEE',
    160: '#F7F8F9',
  },

  // ── UI accent hues (ManyIslandsDark) ──────────────────────────────────
  blue: { 40: '#233558', 50: '#2A4371', 60: '#2E4D89', 70: '#2F5EB9', 80: '#3871E1', 90: '#538AF9', 100: '#71A1FE', 110: '#92B7FF' },
  green: { 40: '#203B2A', 60: '#29583C', 70: '#2A6E47', 80: '#338555', 90: '#4E9D6C', 100: '#6DB083', 110: '#8EC39D' },
  red: { 40: '#56272B', 60: '#80383E', 70: '#A4414A', 80: '#C54E58', 90: '#E4656E', 100: '#F57E84', 110: '#FF9B9F' },
  yellow: { 40: '#44321D', 60: '#694820', 80: '#A56906', 90: '#C28013', 100: '#D59637', 110: '#E4AD5F' },
  purple: { 90: '#967BEF', 100: '#A894F6', 110: '#BBACF9' },

  // ── Workbench surfaces (resolved aliases) ─────────────────────────────
  surface: {
    editor: '#191A1C', //        editor-bg / tool-window-bg          (gray-10)
    editorInline: '#212326', //  editor-bg-inline / search field     (gray-20)
    toolWindowAlt: '#212326', // tool-window-bg-alt                  (gray-20)
    raised: '#26282C', //        control-bg-raised / popup / tabs    (gray-30)
    mainWindow: '#26282C', //    main-window-bg (title bar)          (gray-30)
    feedback: '#33353B', //      layer-2 (notifications, tooltips)   (gray-40)
    mainWindowAlt: '#33353B', // status bar / main toolbar          (gray-40)
    hover: '#FFFFFF14', //       transparent hover wash             (~white 8%)
    pressed: '#FFFFFF29', //     transparent pressed wash
  },

  // ── Borders ──────────────────────────────────────────────────────────
  border: {
    editor: '#26282C', //   editor-border                            (gray-30)
    dialog: '#26282C', //   dialog-border / OnePixelDivider          (gray-30)
    popup: '#33353B', //    popup-border                             (gray-40)
    control: '#40434A', //  control-border / table grid              (gray-50)
    strong: '#40434A', //   main-window-border                       (gray-50)
    raised: '#5F6269', //   control-border-raised                    (gray-70)
  },

  // ── Text (resolved aliases) ──────────────────────────────────────────
  text: {
    default: '#D1D3D9', //  text-default                             (gray-130)
    editor: '#BCBEC4', //   editor-text (TEXT foreground)
    muted: '#9FA2A8', //    text-muted                               (gray-100)
    secondary: '#73767C', //text-secondary                           (gray-80)
    disabled: '#4C4F56', // text-disabled                            (gray-60)
    link: '#71A1FE', //     text-link                                (blue-100)
    overAccent: '#FFFFFF',
  },

  // ── Interactive accents ──────────────────────────────────────────────
  accent: {
    brand: '#3871E1', //        accent-brand-bg / control-brand-bg   (blue-80)
    brandHover: '#538AF9', //   blue-90
    error: '#C54E58', //        accent-error-bg                      (red-80)
    warning: '#A56906', //      accent-warning-bg                    (yellow-80)
    success: '#338555', //      accent-success-bg                    (green-80)
    neutral: '#73767C', //      accent-neutral-bg                    (gray-80)
  },

  // ── Selection / matches ──────────────────────────────────────────────
  selection: {
    editor: '#214283', //          SELECTION_BACKGROUND (scheme, ex-Darcula)
    editorInactive: '#4C4F56', //  SELECTION_BACKGROUND_INACTIVE
    listActive: '#2A4371', //      selection-bg-active                (blue-50)
    listInactive: '#33353B', //    selection-bg-inactive             (gray-40)
    listHover: '#FFFFFF10', //     selection-bg-hovered
    searchMatch: '#BA9752', //     search-match-bg
    searchResultEditor: '#2D543F', // SEARCH_RESULT_ATTRIBUTES bg
    textSearchEditor: '#114957', // TEXT_SEARCH_RESULT_ATTRIBUTES bg
    wordHighlight: '#373B39', //   IDENTIFIER_UNDER_CARET bg
    wordHighlightWrite: '#402F33', // WRITE_IDENTIFIER_UNDER_CARET bg
  },

  // ── Tabs ─────────────────────────────────────────────────────────────
  tab: {
    activeBg: '#233558', //     tab-selected-bg-active               (blue-40)
    inactiveBg: '#191A1C', //   editor-bg
    hoverBg: '#FFFFFF17', //    tab-bg-hovered
    activeBorder: '#2E4D89', // tab-selected-border-active           (blue-60)
    inactiveSelectedBg: '#26282C', // tab-selected-bg-inactive       (gray-30)
  },

  // ── Editor internals (IslandSchemeDark.xml) ──────────────────────────
  editor: {
    caret: '#CED0D6',
    lineHighlight: '#1F2024', //     CARET_ROW_COLOR
    lineNumber: '#4B5059', //        LINE_NUMBERS_COLOR
    lineNumberActive: '#A1A3AB', //  LINE_NUMBER_ON_CARET_ROW_COLOR
    indentGuide: '#3C3F45', //       INDENT_GUIDE (lifted from #323438 so it stays visible under a selection)
    indentGuideActive: '#5C5F66', // SELECTED_INDENT_GUIDE (was #4E5157)
    whitespace: '#3E4147', //        WHITESPACES (calmed from #6F737A — renders on selection in VS Code)
    ruler: '#323438', //             RIGHT_MARGIN_COLOR
    methodSeparator: '#43454A', //   METHOD_SEPARATORS_COLOR
    matchedBracketBg: '#43454A', //  MATCHED_BRACE_ATTRIBUTES bg
    foldedBg: '#393B40', //          FOLDED_TEXT_ATTRIBUTES bg
    foldedFg: '#868991',
    foldBorder: '#2B2D30', //        FOLDED_TEXT_BORDER_COLOR
    injectedBg: '#293C40', //        INJECTED_LANGUAGE_FRAGMENT bg
    stackFrame: '#2A5091', //        EXECUTIONPOINT_ATTRIBUTES bg
    stackFrameNotCurrent: '#273552', // NOT_TOP_FRAME_ATTRIBUTES bg
    widgetBg: '#27282B', //          LOOKUP_COLOR / DOCUMENTATION_COLOR
    widgetBorder: '#393B40', //      HINT_BORDER
    hintBg: '#2B2D30', //            INFORMATION_HINT
    visualGuide: '#2B2D30', //       VISUAL_INDENT_GUIDE
  },

  // ── Diagnostics (stripe / squiggle) ──────────────────────────────────
  diagnostic: {
    error: '#F75464', //     BAD_CHARACTER / ERRORS effect
    errorStripe: '#D64D5B', //ERRORS_ATTRIBUTES stripe
    warning: '#F2C55C', //   WARNING_ATTRIBUTES effect
    warningStripe: '#C29E4A',
    info: '#857042', //      INFO_ATTRIBUTES effect
    hint: '#847A6C',
    todo: '#8BB33D',
  },

  // ── Version control ──────────────────────────────────────────────────
  vcs: {
    addedGutter: '#549159', //  ADDED_LINES_COLOR
    modifiedGutter: '#375FAD', //MODIFIED_LINES_COLOR
    deletedGutter: '#868A91', // DELETED_LINES_COLOR
    added: '#73BD79', //        FILESTATUS_ADDED
    modified: '#70AEFF', //     FILESTATUS_MODIFIED
    deleted: '#6F737A', //      FILESTATUS_DELETED
    unknown: '#E88F89', //      FILESTATUS_UNKNOWN (untracked)
    ignored: '#D69A6B', //      FILESTATUS_..._IGNORED
    conflict: '#DE6A66', //     FILESTATUS_..._MERGED_WITH_CONFLICTS
  },

  // ── Integrated terminal (Darcula console palette, inherited) ──────────
  terminal: {
    background: '#191A1C', //   CONSOLE_BACKGROUND_KEY (Islands override)
    foreground: '#BCBEC4', //   CONSOLE_NORMAL_OUTPUT (Islands override)
    black: '#000000',
    red: '#F0524F',
    green: '#5C962C',
    yellow: '#A68A0D',
    blue: '#3993D4',
    magenta: '#A771BF',
    cyan: '#00A3A3',
    white: '#808080',
    brightBlack: '#595959',
    brightRed: '#FF4050',
    brightGreen: '#4FC414',
    brightYellow: '#E5BF00',
    brightBlue: '#1FB0FF',
    brightMagenta: '#ED7EED',
    brightCyan: '#00E5E5',
    brightWhite: '#FFFFFF',
  },
} as const;
