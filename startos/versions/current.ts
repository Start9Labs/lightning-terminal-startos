import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.12:0',
  releaseNotes: {
    en_US:
      'Updated Lightning Terminal to 0.17.12, which includes Taproot Assets 0.8.9. Taproot Assets is upgrading its proof format at block 978,493 (expected December 2, 2026). If you have Taproot Assets channels, update and close them before that block, or their proofs may be rejected. Full upstream release notes: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.12',
    es_ES:
      'Lightning Terminal se actualizó a 0.17.12, que incluye Taproot Assets 0.8.9. Taproot Assets actualiza su formato de pruebas en el bloque 978.493 (previsto para el 2 de diciembre de 2026). Si tienes canales de Taproot Assets, actualiza y ciérralos antes de ese bloque, o sus pruebas podrían ser rechazadas. Notas completas de la versión original: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.12',
    de_DE:
      'Lightning Terminal wurde auf 0.17.12 aktualisiert, mit Taproot Assets 0.8.9. Taproot Assets stellt sein Nachweisformat bei Block 978.493 um (voraussichtlich am 2. Dezember 2026). Wenn du Taproot-Assets-Kanäle hast, aktualisiere und schließe sie vor diesem Block, sonst können ihre Nachweise abgelehnt werden. Vollständige Upstream-Versionshinweise: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.12',
    pl_PL:
      'Zaktualizowano Lightning Terminal do wersji 0.17.12, która zawiera Taproot Assets 0.8.9. Taproot Assets zmienia format dowodów w bloku 978 493 (spodziewanym 2 grudnia 2026). Jeśli masz kanały Taproot Assets, zaktualizuj i zamknij je przed tym blokiem, w przeciwnym razie ich dowody mogą zostać odrzucone. Pełne informacje o wydaniu projektu źródłowego: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.12',
    fr_FR:
      'Lightning Terminal a été mis à jour vers la version 0.17.12, qui inclut Taproot Assets 0.8.9. Taproot Assets met à niveau son format de preuves au bloc 978 493 (prévu le 2 décembre 2026). Si vous avez des canaux Taproot Assets, mettez à jour et fermez-les avant ce bloc, sinon leurs preuves risquent d’être rejetées. Notes de version amont complètes : https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.12',
  },
  migrations: {},
})
