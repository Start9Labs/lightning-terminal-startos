import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { litConfig } from '../fileModels/lit.conf'

export const current = VersionInfo.of({
  version: '0.17.0-alpha:0',
  releaseNotes: {
    en_US: `Updated Lightning Terminal to 0.17.0-alpha.

- Bundles LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta, and Faraday 0.2.16-alpha.
- Upstream adds native SQL (SQLite/Postgres) database support and deprecates bbolt. To protect existing data, this package keeps the legacy bbolt backend and defers the irreversible bbolt-to-SQL migration.
- New upstream features: account renaming, custom session permissions, and asset-aware payment confirmations.

Full release notes: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    es_ES: `Se actualizó Lightning Terminal a 0.17.0-alpha.

- Incluye LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta y Faraday 0.2.16-alpha.
- El proyecto original añade soporte nativo de base de datos SQL (SQLite/Postgres) y marca bbolt como obsoleto. Para proteger los datos existentes, este paquete mantiene el backend heredado bbolt y aplaza la migración irreversible de bbolt a SQL.
- Nuevas funciones del proyecto original: cambio de nombre de cuentas, permisos personalizados de sesión y confirmaciones de pago que reconocen activos.

Notas de la versión completas: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    de_DE: `Lightning Terminal auf 0.17.0-alpha aktualisiert.

- Enthält LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta und Faraday 0.2.16-alpha.
- Upstream ergänzt native SQL-Datenbankunterstützung (SQLite/Postgres) und stuft bbolt als veraltet ein. Zum Schutz vorhandener Daten behält dieses Paket das bisherige bbolt-Backend bei und verschiebt die unumkehrbare Migration von bbolt zu SQL.
- Neue Upstream-Funktionen: Umbenennen von Konten, benutzerdefinierte Sitzungsberechtigungen und asset-bewusste Zahlungsbestätigungen.

Vollständige Versionshinweise: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    pl_PL: `Zaktualizowano Lightning Terminal do 0.17.0-alpha.

- Zawiera LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta i Faraday 0.2.16-alpha.
- Projekt źródłowy dodaje natywną obsługę bazy danych SQL (SQLite/Postgres) i oznacza bbolt jako przestarzały. Aby chronić istniejące dane, ten pakiet pozostaje przy starszym backendzie bbolt i odracza nieodwracalną migrację z bbolt do SQL.
- Nowe funkcje projektu źródłowego: zmiana nazwy kont, niestandardowe uprawnienia sesji oraz potwierdzenia płatności uwzględniające aktywa.

Pełne informacje o wydaniu: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    fr_FR: `Lightning Terminal mis à jour vers 0.17.0-alpha.

- Intègre LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta et Faraday 0.2.16-alpha.
- En amont, ajout de la prise en charge native des bases de données SQL (SQLite/Postgres) et dépréciation de bbolt. Pour protéger les données existantes, ce paquet conserve l'ancien backend bbolt et reporte la migration irréversible de bbolt vers SQL.
- Nouvelles fonctionnalités en amont : renommage des comptes, permissions de session personnalisées et confirmations de paiement tenant compte des actifs.

Notes de version complètes : https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
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
