export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Lightning Terminal...': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  'Create your LiT admin password': 4,

  // interfaces.ts
  'Web UI': 5,
  'The web interface of Lightning Terminal': 6,

  // actions/resetPassword.ts
  'Reset Password': 7,
  'Create Password': 8,
  'Reset your user interface password': 9,
  'Create your user interface password': 10,
  Success: 11,
  'Your new password is below': 12,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
