import { islands } from '../islands.js';

/**
 * Semantic feedback-state tokens.
 * Foreground-weight values come from the editor scheme's stripe/effect colors;
 * `*Bg` values come from the UI theme's `accent-*-bg` fills.
 */
export const state = {
  error: islands.diagnostic.error, //       #F75464
  errorStripe: islands.diagnostic.errorStripe, // #D64D5B
  warning: islands.diagnostic.warning, //   #F2C55C
  warningStripe: islands.diagnostic.warningStripe, // #C29E4A
  info: islands.text.link, //               #71A1FE
  hint: islands.diagnostic.hint, //         #847A6C
  success: islands.green[100], //           #6DB083

  errorBg: islands.accent.error, //         #C54E58
  warningBg: islands.accent.warning, //     #A56906
  successBg: islands.accent.success, //     #338555
  infoBg: islands.accent.brand, //          #3871E1
} as const;
