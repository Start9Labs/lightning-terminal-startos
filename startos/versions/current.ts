import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { litConfig } from '../fileModels/lit.conf'

export const current = VersionInfo.of({
  version: '0.17.0-alpha:0',
  releaseNotes: {
    en_US: `Updated Lightning Terminal to 0.17.0-alpha.

- Bundles lnd 0.21.1-beta, tapd 0.8.0, loop 0.33.3-beta, pool 0.7.1-beta, faraday 0.2.16-alpha.
- Adds native SQL (SQLite/Postgres) database backends; the legacy bbolt backend is now deprecated. StartOS keeps bbolt for now to avoid the irreversible auto-migration; an opt-in migration will follow.
- Restores LNC session setup for mailbox links and fixes account-update expiration handling.

Full notes: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    es_ES: `Se actualizó Lightning Terminal a 0.17.0-alpha.

- Incluye lnd 0.21.1-beta, tapd 0.8.0, loop 0.33.3-beta, pool 0.7.1-beta, faraday 0.2.16-alpha.
- Añade backends de base de datos SQL nativos (SQLite/Postgres); el backend heredado bbolt queda obsoleto. StartOS mantiene bbolt por ahora para evitar la migración automática irreversible; se ofrecerá una migración opcional más adelante.
- Restaura la configuración de sesión LNC para enlaces de buzón y corrige el manejo de la expiración al actualizar cuentas.

Notas completas: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    de_DE: `Lightning Terminal auf 0.17.0-alpha aktualisiert.

- Enthält lnd 0.21.1-beta, tapd 0.8.0, loop 0.33.3-beta, pool 0.7.1-beta, faraday 0.2.16-alpha.
- Fügt native SQL-Datenbank-Backends (SQLite/Postgres) hinzu; das alte bbolt-Backend ist nun veraltet. StartOS behält vorerst bbolt, um die unumkehrbare automatische Migration zu vermeiden; eine optionale Migration folgt.
- Stellt die LNC-Sitzungseinrichtung für Mailbox-Links wieder her und behebt die Behandlung des Kontoaktualisierungs-Ablaufs.

Vollständige Hinweise: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    pl_PL: `Zaktualizowano Lightning Terminal do 0.17.0-alpha.

- Zawiera lnd 0.21.1-beta, tapd 0.8.0, loop 0.33.3-beta, pool 0.7.1-beta, faraday 0.2.16-alpha.
- Dodaje natywne backendy baz danych SQL (SQLite/Postgres); starszy backend bbolt jest teraz przestarzały. StartOS na razie pozostaje przy bbolt, aby uniknąć nieodwracalnej automatycznej migracji; opcjonalna migracja pojawi się później.
- Przywraca konfigurację sesji LNC dla linków skrzynki pocztowej i naprawia obsługę wygasania przy aktualizacji kont.

Pełne informacje: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    fr_FR: `Mise à jour de Lightning Terminal vers 0.17.0-alpha.

- Intègre lnd 0.21.1-beta, tapd 0.8.0, loop 0.33.3-beta, pool 0.7.1-beta, faraday 0.2.16-alpha.
- Ajoute des backends de base de données SQL natifs (SQLite/Postgres) ; l'ancien backend bbolt est désormais déprécié. StartOS conserve bbolt pour l'instant afin d'éviter la migration automatique irréversible ; une migration optionnelle suivra.
- Restaure la configuration de session LNC pour les liens de boîte aux lettres et corrige la gestion de l'expiration lors de la mise à jour des comptes.

Notes complètes : https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
  },
  migrations: {
    up: async ({ effects }) => {
      const configYaml:
        | {
            password: string
          }
        | undefined = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await litConfig.merge(effects, {
          uipassword: configYaml.password,
        })

        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        })
      }
    },
    down: IMPOSSIBLE,
  },
})
