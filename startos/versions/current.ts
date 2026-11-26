import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.12:1',
  releaseNotes: {
    en_US:
      'Added a Sub-servers action that turns off Loop, Pool, Faraday, Taproot Assets, or the Autopilot client if you do not use them.',
    es_ES:
      'Se añadió la acción Subservidores, que desactiva Loop, Pool, Faraday, Taproot Assets o el cliente de Autopilot si no los usas.',
    de_DE:
      'Neue Aktion Sub-Server, die Loop, Pool, Faraday, Taproot Assets oder den Autopilot-Client abschaltet, wenn du sie nicht nutzt.',
    pl_PL:
      'Dodano akcję Podserwery, która wyłącza Loop, Pool, Faraday, Taproot Assets lub klienta Autopilot, jeśli z nich nie korzystasz.',
    fr_FR:
      'Ajout de l’action Sous-serveurs, qui désactive Loop, Pool, Faraday, Taproot Assets ou le client Autopilot si vous ne les utilisez pas.',
  },
  migrations: {},
})
