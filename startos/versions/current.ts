import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.11:1',
  releaseNotes: {
    en_US:
      'Resetting the password does not end Lightning Node Connect sessions or invalidate macaroons, and the Lightning Terminal password gives full control of LND, including creating LND macaroons. If someone else may know a past password, revoke their sessions on the Lightning Node Connect page and run **Revoke Macaroons** in LND.',
    es_ES:
      'Restablecer la contraseña no cierra las sesiones de Lightning Node Connect ni invalida los macaroons, y la contraseña de Lightning Terminal da control total de LND, incluida la creación de macaroons de LND. Si otra persona puede conocer una contraseña anterior, revoca sus sesiones en la página Lightning Node Connect y ejecuta **Revocar macaroons** en LND.',
    de_DE:
      'Das Zurücksetzen des Passworts beendet keine Lightning-Node-Connect-Sitzungen und macht keine Macaroons ungültig, und das Lightning-Terminal-Passwort gibt volle Kontrolle über LND, einschließlich der Erstellung von LND-Macaroons. Falls jemand anderes ein früheres Passwort kennen könnte, widerrufe dessen Sitzungen auf der Seite Lightning Node Connect und führe in LND **Macaroons widerrufen** aus.',
    pl_PL:
      'Zresetowanie hasła nie kończy sesji Lightning Node Connect ani nie unieważnia macaroons, a hasło Lightning Terminal daje pełną kontrolę nad LND, w tym tworzenie macaroons LND. Jeśli ktoś inny może znać wcześniejsze hasło, unieważnij jego sesje na stronie Lightning Node Connect i uruchom **Unieważnij macaroons** w LND.',
    fr_FR:
      "Réinitialiser le mot de passe ne met pas fin aux sessions Lightning Node Connect et n'invalide pas les macaroons, et le mot de passe de Lightning Terminal donne le contrôle total de LND, y compris la création de macaroons LND. Si quelqu'un d'autre peut connaître un ancien mot de passe, révoquez ses sessions sur la page Lightning Node Connect et exécutez **Révoquer les macaroons** dans LND.",
  },
  migrations: {},
})
