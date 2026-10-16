import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.6:2',
  releaseNotes: {
    en_US:
      'Restarting Lightning Terminal while it starts up leaves exactly one copy of it running.',
    es_ES:
      'Reiniciar Lightning Terminal mientras arranca deja exactamente una copia en ejecución.',
    de_DE:
      'Ein Neustart von Lightning Terminal während des Startvorgangs lässt genau eine Instanz laufen.',
    pl_PL:
      'Ponowne uruchomienie Lightning Terminal podczas startu pozostawia dokładnie jedną działającą kopię.',
    fr_FR:
      'Redémarrer Lightning Terminal pendant son démarrage laisse exactement une seule copie en cours d’exécution.',
  },
  migrations: {},
})
