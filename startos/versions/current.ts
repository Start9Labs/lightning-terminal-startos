import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { litConfig } from '../fileModels/lit.conf'

export const current = VersionInfo.of({
  version: '0.17.0-alpha:0',
  releaseNotes: {
    en_US: `Updated Lightning Terminal to 0.17.0-alpha.

- Bundles LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta, and Faraday 0.2.16-alpha.
- Migrates Lightning Terminal's own databases (accounts, sessions, firewall rules) from the legacy bbolt backend to SQLite, the new upstream default. This one-way migration runs automatically on first start; afterwards you cannot downgrade below 0.17.0-alpha, so back up before updating. This does not affect your LND node's database, which the LND package manages separately.
- New upstream features: account renaming, custom session permissions, and asset-aware payment confirmations.

Full release notes: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    es_ES: `Se actualizó Lightning Terminal a 0.17.0-alpha.

- Incluye LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta y Faraday 0.2.16-alpha.
- Migra las bases de datos propias de Lightning Terminal (cuentas, sesiones, reglas del cortafuegos) del backend heredado bbolt a SQLite, el nuevo valor predeterminado del proyecto original. Esta migración unidireccional se ejecuta automáticamente en el primer inicio; después no podrás volver a una versión anterior a 0.17.0-alpha, así que haz una copia de seguridad antes de actualizar. Esto no afecta a la base de datos de tu nodo LND, que gestiona por separado el paquete de LND.
- Nuevas funciones del proyecto original: cambio de nombre de cuentas, permisos personalizados de sesión y confirmaciones de pago que reconocen activos.

Notas de la versión completas: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    de_DE: `Lightning Terminal auf 0.17.0-alpha aktualisiert.

- Enthält LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta und Faraday 0.2.16-alpha.
- Migriert die eigenen Datenbanken von Lightning Terminal (Konten, Sitzungen, Firewall-Regeln) vom bisherigen bbolt-Backend zu SQLite, dem neuen Upstream-Standard. Diese unumkehrbare Migration läuft beim ersten Start automatisch; danach ist keine Rückstufung unter 0.17.0-alpha mehr möglich, erstelle daher vor dem Aktualisieren ein Backup. Die Datenbank deines LND-Knotens ist davon nicht betroffen; diese verwaltet das LND-Paket separat.
- Neue Upstream-Funktionen: Umbenennen von Konten, benutzerdefinierte Sitzungsberechtigungen und asset-bewusste Zahlungsbestätigungen.

Vollständige Versionshinweise: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    pl_PL: `Zaktualizowano Lightning Terminal do 0.17.0-alpha.

- Zawiera LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta i Faraday 0.2.16-alpha.
- Migruje własne bazy danych Lightning Terminal (konta, sesje, reguły zapory) ze starszego backendu bbolt do SQLite, nowego domyślnego backendu projektu źródłowego. Ta jednokierunkowa migracja uruchamia się automatycznie przy pierwszym starcie; po niej nie można wrócić do wersji starszej niż 0.17.0-alpha, więc przed aktualizacją wykonaj kopię zapasową. Nie ma to wpływu na bazę danych węzła LND, którą osobno zarządza pakiet LND.
- Nowe funkcje projektu źródłowego: zmiana nazwy kont, niestandardowe uprawnienia sesji oraz potwierdzenia płatności uwzględniające aktywa.

Pełne informacje o wydaniu: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.0-alpha`,
    fr_FR: `Lightning Terminal mis à jour vers 0.17.0-alpha.

- Intègre LND 0.21.1-beta, Taproot Assets 0.8.0, Loop 0.33.3-beta, Pool 0.7.1-beta et Faraday 0.2.16-alpha.
- Migre les bases de données propres à Lightning Terminal (comptes, sessions, règles de pare-feu) de l'ancien backend bbolt vers SQLite, la nouvelle valeur par défaut en amont. Cette migration à sens unique s'exécute automatiquement au premier démarrage ; ensuite, vous ne pourrez plus revenir à une version antérieure à 0.17.0-alpha, alors faites une sauvegarde avant de mettre à jour. Cela n'affecte pas la base de données de votre nœud LND, gérée séparément par le paquet LND.
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
