import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.7:0',
  releaseNotes: {
    en_US:
      'Updated Lightning Terminal to 0.17.7, including Taproot Assets 0.8.6 with fixes for asset invoice accounting, RFQ negotiation, and invalid address or proof keys. Loop is now disabled by default on regtest and simnet. If you use Taproot Assets channels, follow the linked upstream safety guidance for a controlled update of affected nodes. Full upstream release notes: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
    es_ES:
      'Lightning Terminal se actualizó a 0.17.7, incluido Taproot Assets 0.8.6 con correcciones de la contabilidad de facturas de activos, la negociación RFQ y las claves no válidas de direcciones o pruebas. Loop ahora está desactivado por defecto en regtest y simnet. Si usas canales de Taproot Assets, sigue las recomendaciones de seguridad enlazadas en las notas originales para actualizar los nodos afectados de forma controlada. Notas completas de la versión original: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
    de_DE:
      'Lightning Terminal wurde auf 0.17.7 aktualisiert, einschließlich Taproot Assets 0.8.6 mit Korrekturen bei der Abrechnung von Asset-Rechnungen, RFQ-Verhandlungen und ungültigen Adress- oder Nachweisschlüsseln. Loop ist auf regtest und simnet nun standardmäßig deaktiviert. Bei Nutzung von Taproot-Assets-Kanälen sind die in den Upstream-Versionshinweisen verlinkten Sicherheitsempfehlungen für eine kontrollierte Aktualisierung betroffener Nodes zu beachten. Vollständige Upstream-Versionshinweise: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
    pl_PL:
      'Zaktualizowano Lightning Terminal do wersji 0.17.7, w tym Taproot Assets do 0.8.6 z poprawkami rozliczania faktur aktywów, negocjacji RFQ oraz nieprawidłowych kluczy adresów lub dowodów. Loop jest teraz domyślnie wyłączony w regtest i simnet. Jeśli używasz kanałów Taproot Assets, postępuj zgodnie z zaleceniami bezpieczeństwa podlinkowanymi w informacjach o wydaniu, aby przeprowadzić kontrolowaną aktualizację dotkniętych węzłów. Pełne informacje o wydaniu projektu źródłowego: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
    fr_FR:
      'Lightning Terminal a été mis à jour vers la version 0.17.7, avec Taproot Assets 0.8.6 qui corrige la comptabilité des factures d’actifs, la négociation RFQ et les clés d’adresse ou de preuve invalides. Loop est désormais désactivé par défaut sur regtest et simnet. Si vous utilisez des canaux Taproot Assets, suivez les consignes de sécurité liées dans les notes amont pour mettre à jour les nœuds concernés de manière contrôlée. Notes de version amont complètes : https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
  },
  migrations: {},
})
