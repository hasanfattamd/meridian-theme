import { surface, text, accent, border, state, git, terminal } from '../tokens/index.js';

/**
 * Explicitly defines the VS Code workbench theme keys that Meridian supports.
 * We use an explicit interface rather than `Record<string, string>` to ensure 
 * the compiler detects invalid or misspelled VS Code keys, and to provide 
 * immediate IDE autocomplete for future contributors.
 */
export interface WorkbenchColors {
  // Editor
  'editor.background': string;
  'editor.foreground': string;
  'editorLineNumber.foreground': string;
  'editorLineNumber.activeForeground': string;
  'editorCursor.foreground': string;
  'editor.selectionBackground': string;
  'editor.inactiveSelectionBackground': string;

  // Activity Bar
  'activityBar.background': string;
  'activityBar.foreground': string;
  'activityBar.inactiveForeground': string;
  'activityBar.border': string;

  // Side Bar
  'sideBar.background': string;
  'sideBar.foreground': string;
  'sideBar.border': string;
  'sideBarSectionHeader.background': string;

  // Status Bar
  'statusBar.background': string;
  'statusBar.foreground': string;
  'statusBar.border': string;

  // Panel
  'panel.background': string;
  'panel.border': string;
  'panelTitle.activeForeground': string;
  'panelTitle.inactiveForeground': string;

  // Title Bar
  'titleBar.activeBackground': string;
  'titleBar.activeForeground': string;
  'titleBar.inactiveBackground': string;
  'titleBar.inactiveForeground': string;

  // Tabs
  'tab.activeBackground': string;
  'tab.activeForeground': string;
  'tab.inactiveBackground': string;
  'tab.inactiveForeground': string;
  'tab.border': string;

  // Input
  'input.background': string;
  'input.foreground': string;
  'input.border': string;
  'input.placeholderForeground': string;

  // Button
  'button.background': string;
  'button.foreground': string;
  'button.hoverBackground': string;

  // Scrollbar
  'scrollbarSlider.background': string;
  'scrollbarSlider.hoverBackground': string;
  'scrollbarSlider.activeBackground': string;

  // Lists
  'list.activeSelectionBackground': string;
  'list.activeSelectionForeground': string;
  'list.inactiveSelectionBackground': string;
  'list.inactiveSelectionForeground': string;
  'list.hoverBackground': string;

  // Terminal
  'terminal.background': string;
  'terminal.foreground': string;
  'terminal.ansiBlack': string;
  'terminal.ansiRed': string;
  'terminal.ansiGreen': string;
  'terminal.ansiYellow': string;
  'terminal.ansiBlue': string;
  'terminal.ansiMagenta': string;
  'terminal.ansiCyan': string;
  'terminal.ansiWhite': string;

  // Git Decorations
  'gitDecoration.addedResourceForeground': string;
  'gitDecoration.modifiedResourceForeground': string;
  'gitDecoration.deletedResourceForeground': string;
  'gitDecoration.untrackedResourceForeground': string;
  'gitDecoration.conflictingResourceForeground': string;

  // Diff Editor
  'diffEditor.insertedTextBackground': string;
  'diffEditor.removedTextBackground': string;

  // Notifications
  'notifications.background': string;
  'notifications.foreground': string;
  'notificationCenterHeader.background': string;

  // Peek View
  'peekView.border': string;
  'peekViewEditor.background': string;
  'peekViewResult.background': string;

  // Breadcrumbs
  'breadcrumb.foreground': string;
  'breadcrumb.focusForeground': string;
  'breadcrumb.activeSelectionForeground': string;
  'breadcrumbPicker.background': string;

  // Minimap
  'minimap.background': string;
  'minimap.errorHighlight': string;
  'minimap.warningHighlight': string;

  // Editor Groups
  'editorGroupHeader.tabsBackground': string;
  'editorGroup.border': string;

  // Widgets
  'widget.shadow': string;
  'editorWidget.background': string;
  'editorWidget.border': string;
}

/**
 * The core mapping layer converting Meridian semantic tokens into VS Code theme keys.
 * 
 * @remarks 
 * This object strictly implements WorkbenchColors. 
 * Values must exclusively reference semantic tokens from the Meridian tokens layer, 
 * not raw hex codes or primitives directly.
 */
export const workbenchMapping: WorkbenchColors = {
  // Editor
  'editor.background': surface.main,
  'editor.foreground': text.primary,
  'editorLineNumber.foreground': text.muted,
  'editorLineNumber.activeForeground': text.secondary,
  'editorCursor.foreground': accent.primary,
  'editor.selectionBackground': surface.active,
  'editor.inactiveSelectionBackground': surface.hover,

  // Activity Bar
  'activityBar.background': surface.sidebar,
  'activityBar.foreground': text.primary,
  'activityBar.inactiveForeground': text.muted,
  'activityBar.border': border.default,

  // Side Bar
  'sideBar.background': surface.sidebar,
  'sideBar.foreground': text.secondary,
  'sideBar.border': border.default,
  'sideBarSectionHeader.background': surface.main,

  // Status Bar
  'statusBar.background': surface.header,
  'statusBar.foreground': text.secondary,
  'statusBar.border': border.default,

  // Panel
  'panel.background': surface.panel,
  'panel.border': border.default,
  'panelTitle.activeForeground': text.primary,
  'panelTitle.inactiveForeground': text.muted,

  // Title Bar
  'titleBar.activeBackground': surface.header,
  'titleBar.activeForeground': text.primary,
  'titleBar.inactiveBackground': surface.header,
  'titleBar.inactiveForeground': text.muted,

  // Tabs
  'tab.activeBackground': surface.main,
  'tab.activeForeground': text.primary,
  'tab.inactiveBackground': surface.sidebar,
  'tab.inactiveForeground': text.muted,
  'tab.border': border.default,

  // Input
  'input.background': surface.main,
  'input.foreground': text.primary,
  'input.border': border.subtle,
  'input.placeholderForeground': text.muted,

  // Button
  'button.background': accent.primary,
  'button.foreground': text.inverse,
  'button.hoverBackground': accent.hover,

  // Scrollbar
  'scrollbarSlider.background': surface.hover,
  'scrollbarSlider.hoverBackground': surface.active,
  'scrollbarSlider.activeBackground': accent.primary,

  // Lists
  'list.activeSelectionBackground': surface.active,
  'list.activeSelectionForeground': text.primary,
  'list.inactiveSelectionBackground': surface.hover,
  'list.inactiveSelectionForeground': text.secondary,
  'list.hoverBackground': surface.hover,

  // Terminal
  'terminal.background': terminal.background,
  'terminal.foreground': terminal.foreground,
  'terminal.ansiBlack': terminal.black,
  'terminal.ansiRed': terminal.red,
  'terminal.ansiGreen': terminal.green,
  'terminal.ansiYellow': terminal.yellow,
  'terminal.ansiBlue': terminal.blue,
  'terminal.ansiMagenta': terminal.magenta,
  'terminal.ansiCyan': terminal.cyan,
  'terminal.ansiWhite': terminal.white,

  // Git Decorations
  'gitDecoration.addedResourceForeground': git.added,
  'gitDecoration.modifiedResourceForeground': git.modified,
  'gitDecoration.deletedResourceForeground': git.deleted,
  'gitDecoration.untrackedResourceForeground': git.untracked,
  'gitDecoration.conflictingResourceForeground': git.conflicting,

  // Diff Editor
  'diffEditor.insertedTextBackground': surface.hover,
  'diffEditor.removedTextBackground': surface.hover,

  // Notifications
  'notifications.background': surface.panel,
  'notifications.foreground': text.primary,
  'notificationCenterHeader.background': surface.sidebar,

  // Peek View
  'peekView.border': accent.primary,
  'peekViewEditor.background': surface.sidebar,
  'peekViewResult.background': surface.panel,

  // Breadcrumbs
  'breadcrumb.foreground': text.muted,
  'breadcrumb.focusForeground': text.secondary,
  'breadcrumb.activeSelectionForeground': text.primary,
  'breadcrumbPicker.background': surface.panel,

  // Minimap
  'minimap.background': surface.main,
  'minimap.errorHighlight': state.error,
  'minimap.warningHighlight': state.warning,

  // Editor Groups
  'editorGroupHeader.tabsBackground': surface.sidebar,
  'editorGroup.border': border.default,

  // Widgets
  'widget.shadow': surface.main,
  'editorWidget.background': surface.panel,
  'editorWidget.border': border.default,
} as const;
