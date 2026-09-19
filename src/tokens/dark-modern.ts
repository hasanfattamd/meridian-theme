import type { WorkbenchTokens } from '../mappings/workbench.js';

/**
 * VS Code **Dark Modern** — resolved reference values.
 *
 * This is the workbench palette for the "Meridian Dark Ultimate" variant: a
 * cleaner, flatter dark UI than Islands, while the *syntax* token colors stay
 * byte-identical to "Meridian Dark" (both variants share `textmate.ts` +
 * `semantic-tokens.ts`).
 *
 * Values are taken from VS Code's built-in `dark_modern.json` (+ `dark_vs.json`
 * base and the default dark color registry). Same shape as `islands`-derived
 * `semantic/*` so `buildWorkbench()` consumes either interchangeably.
 */
const NONE = '#00000000';

export const darkModern: WorkbenchTokens = {
  surface: {
    main: '#1F1F1F', //      editor
    sidebar: '#181818', //   activity / side / panel / status / title chrome
    inset: '#1F1F1F', //     inline editors, peek
    raised: '#1F1F1F', //    menus, suggest, notifications, quick input
    header: '#181818', //    title bar / group header
    chrome: '#181818', //    activity / status / title bar
    panel: '#181818',
    feedback: '#1F1F1F', //  notifications, banners
    hover: '#FFFFFF0A',
    active: '#04395E', //    focused list selection
    line: '#FFFFFF0A', //    current-line highlight
    widget: '#202020', //    editor widget backdrop
  },
  text: {
    primary: '#CCCCCC',
    editor: '#CCCCCC',
    secondary: '#9D9D9D',
    muted: '#9D9D9D',
    faint: '#6E7681', //     line numbers
    disabled: '#5A5A5A',
    link: '#4DAAFC',
    inverse: '#FFFFFF',
  },
  border: {
    default: '#2B2B2B',
    divider: '#2B2B2B',
    subtle: '#2B2B2B',
    popup: '#454545',
    control: '#3C3C3C',
    active: '#3C3C3C',
    strong: '#2B2B2B',
  },
  accent: {
    primary: '#0078D4',
    hover: '#026EC1',
    active: '#0060B0',
    selection: '#264F78', //         editor selection (default dark)
    selectionInactive: '#3A3D41',
    caret: '#AEAFAD',
    tabActiveBg: '#1F1F1F',
    tabActiveBorder: '#0078D4',
  },
  state: {
    error: '#F85149',
    errorStripe: '#C74E39',
    warning: '#CCA700',
    warningStripe: '#CCA700',
    info: '#3794FF',
    hint: '#7A7A7A',
    success: '#3FB950',
    errorBg: '#5A1D1D',
    warningBg: '#5A4700',
    successBg: '#16825D',
    infoBg: '#0078D4',
  },
  git: {
    added: '#81B88B',
    modified: '#E2C08D',
    deleted: '#C74E39',
    untracked: '#73C991',
    ignored: '#8C8C8C',
    conflicting: '#E4676B',
    addedGutter: '#2EA043',
    modifiedGutter: '#0078D4',
    deletedGutter: '#F85149',
  },
  terminal: {
    background: '#1F1F1F',
    foreground: '#CCCCCC',
    black: '#000000',
    red: '#CD3131',
    green: '#0DBC79',
    yellow: '#E5E510',
    blue: '#2472C8',
    magenta: '#BC3FBC',
    cyan: '#11A8CD',
    white: '#E5E5E5',
    brightBlack: '#666666',
    brightRed: '#F14C4C',
    brightGreen: '#23D18B',
    brightYellow: '#F5F543',
    brightBlue: '#3B8EEA',
    brightMagenta: '#D670D6',
    brightCyan: '#29B8DB',
    brightWhite: '#E5E5E5',
  },
  extras: {
    lineNumber: '#6E7681',
    lineNumberActive: '#CCCCCC',
    indentGuide: '#404040',
    indentGuideActive: '#707070',
    treeGuide: '#4A4A4A',
    treeGuideInactive: '#383838',
    whitespace: '#E3E4E229',
    ruler: '#5A5A5A',
    bracketMatchBg: '#3C3C3C',
    wordHighlight: '#575757B8',
    wordHighlightStrong: '#004972B8',
    listInactiveSelection: '#37373D',
    hoverWash: '#FFFFFF0F',
    hoverWashSubtle: '#FFFFFF0A',
    activeWash: '#FFFFFF1A',
    sepWash: '#FFFFFF1A',
    sliderBg: '#79797966',
    sliderHover: '#646464B3',
    sliderActive: '#BFBFBF66',
    sliderMiniBg: '#79797933',
    sliderMiniHover: '#64646459',
    sliderMiniActive: '#BFBFBF33',
    inlayFg: '#969696',
    shadow: '#0000005C',
    findCurrent: '#9E6A03',
    findOther: '#EA5C0055',
    rangeHighlight: '#FFFFFF0B',
    hoverHighlight: '#264F7855',
    foldBg: '#264F7833',
    stackFrame: '#A2734C66',
    stackFrameFocused: '#7ABCFF4D',
    inputErrorBg: '#5A1D1D',
    inputWarningBg: '#5A4700',
    inputInfoBg: '#063B49',
    dropBg: '#0078D433',
    commentRangeBg: '#0078D41A',
    diffInsertedText: '#2EA04326',
    diffRemovedText: '#F8514926',
    diffInsertedLine: '#2EA04319',
    diffRemovedLine: '#F8514919',
    diffInsertedGutter: '#2EA04340',
    diffRemovedGutter: '#F8514940',
    mergeCurrentHeader: '#2EA04366',
    mergeCurrentContent: '#2EA04333',
    mergeIncomingHeader: '#0078D466',
    mergeIncomingContent: '#0078D433',
    extBtnHover: '#1F6FEB',
    none: NONE,
  },
} as const;
