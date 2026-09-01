import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.3-alpha:1',
  releaseNotes: {
    en_US: `Lightning Terminal now recovers on its own after losing its connection to LND.

When LND restarts — for an update, a settings change, or during a reboot — the control connection Lightning Terminal keeps open to it is cut, and Lightning Terminal would stay down with a "Health Check lit failed … RPC middleware receive failed" error until the service was restarted by hand. It now detects that state and restarts itself, reconnecting once LND is back. If your Lightning Terminal is currently stuck on that error, this update clears it — no action needed.`,
    es_ES: `Lightning Terminal ahora se recupera por sí solo tras perder la conexión con LND.

Cuando LND se reinicia — por una actualización, un cambio de configuración o durante un reinicio del servidor — se corta la conexión de control que Lightning Terminal mantiene abierta con él, y Lightning Terminal quedaba caído con un error "Health Check lit failed … RPC middleware receive failed" hasta que se reiniciaba el servicio a mano. Ahora detecta ese estado y se reinicia solo, reconectándose en cuanto LND vuelve. Si tu Lightning Terminal está actualmente atascado en ese error, esta actualización lo resuelve — no hace falta hacer nada.`,
    de_DE: `Lightning Terminal erholt sich jetzt selbstständig, nachdem die Verbindung zu LND verloren ging.

Wenn LND neu startet — wegen eines Updates, einer Einstellungsänderung oder während eines Neustarts des Servers — wird die Steuerverbindung getrennt, die Lightning Terminal zu ihm offen hält, und Lightning Terminal blieb mit dem Fehler "Health Check lit failed … RPC middleware receive failed" außer Betrieb, bis der Dienst von Hand neu gestartet wurde. Dieser Zustand wird jetzt erkannt und der Dienst startet sich selbst neu; sobald LND wieder da ist, verbindet er sich erneut. Steckt Ihr Lightning Terminal derzeit in diesem Fehler fest, behebt dieses Update ihn — es ist nichts weiter zu tun.`,
    pl_PL: `Lightning Terminal odzyskuje teraz sprawność samodzielnie po utracie połączenia z LND.

Gdy LND uruchamia się ponownie — z powodu aktualizacji, zmiany ustawień lub podczas restartu serwera — przerywane jest połączenie kontrolne, które Lightning Terminal utrzymuje z nim otwarte, i Lightning Terminal pozostawał wyłączony z błędem "Health Check lit failed … RPC middleware receive failed", dopóki usługa nie została ręcznie uruchomiona ponownie. Teraz ten stan jest wykrywany i usługa restartuje się sama, łącząc się ponownie, gdy tylko LND wróci. Jeśli Twój Lightning Terminal utknął obecnie na tym błędzie, ta aktualizacja go usuwa — nie trzeba nic robić.`,
    fr_FR: `Lightning Terminal se rétablit désormais tout seul après avoir perdu sa connexion à LND.

Quand LND redémarre — pour une mise à jour, un changement de réglage ou lors d'un redémarrage du serveur — la connexion de contrôle que Lightning Terminal garde ouverte vers lui est coupée, et Lightning Terminal restait hors service avec une erreur "Health Check lit failed … RPC middleware receive failed" jusqu'à un redémarrage manuel du service. Cet état est désormais détecté et le service se redémarre de lui-même, puis se reconnecte dès que LND est de retour. Si votre Lightning Terminal est actuellement bloqué sur cette erreur, cette mise à jour la corrige — rien à faire.`,
  },
  migrations: {},
})
