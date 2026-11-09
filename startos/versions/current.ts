import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.10:1',
  releaseNotes: {
    en_US:
      'Requires StartOS 0.4.1 or later. Lightning Terminal now reads only the credential it needs from LND, and can no longer read LND’s seed or other files. Requires LND 0.21.6-beta:3.',
    es_ES:
      'Requiere StartOS 0.4.1 o posterior. Lightning Terminal ahora lee solo la credencial que necesita de LND, y ya no puede leer la semilla de LND ni otros archivos. Requiere LND 0.21.6-beta:3.',
    de_DE:
      'Erfordert StartOS 0.4.1 oder neuer. Lightning Terminal liest von LND nur noch die benötigte Zugangsberechtigung und kann den Seed von LND und andere Dateien nicht mehr lesen. Erfordert LND 0.21.6-beta:3.',
    pl_PL:
      'Wymaga StartOS 0.4.1 lub nowszego. Lightning Terminal odczytuje z LND tylko potrzebne mu poświadczenie i nie może już odczytać seeda LND ani innych plików. Wymaga LND 0.21.6-beta:3.',
    fr_FR:
      'Nécessite StartOS 0.4.1 ou ultérieur. Lightning Terminal ne lit plus que l’identifiant dont il a besoin auprès de LND, et ne peut plus lire la seed de LND ni ses autres fichiers. Nécessite LND 0.21.6-beta:3.',
  },
  migrations: {},
})
