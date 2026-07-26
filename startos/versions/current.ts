import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.0-alpha:7',
  releaseNotes: {
    en_US: `Fixes Lightning Terminal failing to start.

A port conflict introduced in the previous release stopped the service from launching — its web interface and an internal listener both tried to use the same port. They now use separate ports, so Lightning Terminal starts normally. An install left stuck by the previous version recovers automatically on update; no action is needed.`,
    es_ES: `Corrige el fallo de inicio de Lightning Terminal.

Un conflicto de puertos introducido en la versión anterior impedía que el servicio arrancara: su interfaz web y un componente interno intentaban usar el mismo puerto. Ahora usan puertos distintos, por lo que Lightning Terminal se inicia con normalidad. Una instalación que quedó bloqueada por la versión anterior se recupera automáticamente al actualizar; no es necesario hacer nada.`,
    de_DE: `Behebt das Problem, dass Lightning Terminal nicht startet.

Ein in der vorherigen Version eingeführter Portkonflikt verhinderte den Start des Dienstes — seine Weboberfläche und ein interner Listener versuchten, denselben Port zu verwenden. Sie nutzen nun getrennte Ports, sodass Lightning Terminal normal startet. Eine durch die vorherige Version blockierte Installation wird beim Aktualisieren automatisch repariert; es ist nichts weiter zu tun.`,
    pl_PL: `Naprawia problem z uruchamianiem Lightning Terminal.

Konflikt portów wprowadzony w poprzedniej wersji uniemożliwiał uruchomienie usługi — jej interfejs webowy i wewnętrzny nasłuchiwacz próbowały użyć tego samego portu. Teraz używają osobnych portów, więc Lightning Terminal uruchamia się normalnie. Instalacja zablokowana przez poprzednią wersję naprawia się automatycznie po aktualizacji; nie trzeba nic robić.`,
    fr_FR: `Corrige l'échec de démarrage de Lightning Terminal.

Un conflit de ports introduit dans la version précédente empêchait le service de démarrer — son interface web et un écouteur interne tentaient d'utiliser le même port. Ils utilisent désormais des ports distincts, de sorte que Lightning Terminal démarre normalement. Une installation bloquée par la version précédente se répare automatiquement lors de la mise à jour ; aucune action n'est nécessaire.`,
  },
  migrations: {},
})
