import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.6:0',
  releaseNotes: {
    en_US:
      'Updated Lightning Terminal to 0.17.6, with Taproot Assets 0.8.5 and integrated LND 0.21.4-beta (StartOS continues to use the separate LND service). Fixes the one-time database migration of older installs, which failed on every start when a legacy session held an out-of-range timestamp. Full upstream release notes: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.6',
    es_ES:
      'Lightning Terminal se actualizó a 0.17.6, con Taproot Assets 0.8.5 y LND integrado 0.21.4-beta (StartOS sigue usando el servicio LND independiente). Corrige la migración única de la base de datos de instalaciones antiguas, que fallaba en cada inicio cuando una sesión heredada tenía una marca de tiempo fuera de rango. Notas completas de la versión original: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.6',
    de_DE:
      'Lightning Terminal wurde auf 0.17.6 aktualisiert, mit Taproot Assets 0.8.5 und integriertem LND 0.21.4-beta (StartOS verwendet weiterhin den separaten LND-Dienst). Behebt, dass die einmalige Datenbankmigration älterer Installationen bei jedem Start fehlschlug, wenn eine alte Sitzung einen Zeitstempel außerhalb des gültigen Bereichs enthielt. Vollständige Upstream-Versionshinweise: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.6',
    pl_PL:
      'Zaktualizowano Lightning Terminal do wersji 0.17.6, z Taproot Assets 0.8.5 i zintegrowanym LND 0.21.4-beta (StartOS nadal korzysta z oddzielnej usługi LND). Naprawiono jednorazową migrację bazy danych ze starszych instalacji, która kończyła się błędem przy każdym uruchomieniu, gdy starsza sesja zawierała znacznik czasu spoza dopuszczalnego zakresu. Pełne informacje o wydaniu projektu źródłowego: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.6',
    fr_FR:
      "Lightning Terminal a été mis à jour vers la version 0.17.6, avec Taproot Assets 0.8.5 et LND intégré 0.21.4-beta (StartOS utilise toujours le service LND distinct). Corrige la migration unique de la base de données des anciennes installations, qui échouait à chaque démarrage lorsqu'une ancienne session contenait un horodatage hors limites. Notes de version amont complètes : https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.6",
  },
  migrations: {},
})
