import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.6:1',
  releaseNotes: {
    en_US: `- Reset Password asks for confirmation before replacing your current password.`,
    es_ES: `- Restablecer contraseña pide confirmación antes de reemplazar tu contraseña actual.`,
    de_DE: `- Passwort zurücksetzen fragt vor dem Ersetzen deines aktuellen Passworts nach einer Bestätigung.`,
    pl_PL: `- Resetuj hasło prosi o potwierdzenie przed zastąpieniem obecnego hasła.`,
    fr_FR: `- Réinitialiser le mot de passe demande une confirmation avant de remplacer votre mot de passe actuel.`,
  },
  migrations: {},
})
