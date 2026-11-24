export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Lightning Terminal...': 0,
  'Web Interface': 1,
  'Create your LiT admin password': 4,
  'Restarting litd — it parked after a fatal error and cannot recover on its own': 18,

  // healthCheck.ts
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  'Cannot reach LND: ${error}': 14,
  'Lightning Terminal failed to start: ${error}': 15,
  'Starting Lightning Terminal…': 16,
  'Connecting to LND…': 17,
  'Lightning Terminal hit a fatal error — restarting it: ${error}': 19,

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
  'Your current password stops working, and Lightning Terminal restarts if it is running. Lightning Node Connect sessions and macaroons stay valid. If someone else may know the old password, revoke their sessions on the Lightning Node Connect page and run Revoke Macaroons in LND: the password gives full control of LND, including creating LND macaroons that keep working after Lightning Terminal is reset or reinstalled.': 20,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
