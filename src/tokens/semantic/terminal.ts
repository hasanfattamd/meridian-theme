import { islands } from '../islands.js';

/**
 * Semantic integrated-terminal tokens. Islands Dark sets only the console
 * background (#191A1C) and normal output (#BCBEC4); the 16 ANSI slots inherit
 * JetBrains' Darcula console palette.
 */
export const terminal = {
  background: islands.terminal.background,
  foreground: islands.terminal.foreground,
  black: islands.terminal.black,
  red: islands.terminal.red,
  green: islands.terminal.green,
  yellow: islands.terminal.yellow,
  blue: islands.terminal.blue,
  magenta: islands.terminal.magenta,
  cyan: islands.terminal.cyan,
  white: islands.terminal.white,
  brightBlack: islands.terminal.brightBlack,
  brightRed: islands.terminal.brightRed,
  brightGreen: islands.terminal.brightGreen,
  brightYellow: islands.terminal.brightYellow,
  brightBlue: islands.terminal.brightBlue,
  brightMagenta: islands.terminal.brightMagenta,
  brightCyan: islands.terminal.brightCyan,
  brightWhite: islands.terminal.brightWhite,
} as const;
