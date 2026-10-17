import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.7:0',
  releaseNotes: {
    en_US:
      'Updated Lightning Terminal to 0.17.7, including Taproot Assets 0.8.6 fixes for asset invoice accounting, RFQ negotiation, and address/proof validation. Loop is now disabled by default on regtest and simnet. Asset-channel operators must follow the controlled-update guidance before updating: https://github.com/lightninglabs/taproot-assets/releases/tag/v0.8.6. Full upstream release notes: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
    es_ES:
      'Lightning Terminal se actualizó a 0.17.7, con correcciones de Taproot Assets 0.8.6 para la contabilidad de facturas de activos, la negociación RFQ y la validación de direcciones y pruebas. Loop ahora está desactivado por defecto en regtest y simnet. Los operadores de canales de activos deben seguir la guía de actualización controlada antes de actualizar: https://github.com/lightninglabs/taproot-assets/releases/tag/v0.8.6. Notas completas de la versión original: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
    de_DE:
      'Lightning Terminal wurde auf 0.17.7 aktualisiert, einschließlich Taproot Assets 0.8.6 mit Korrekturen bei der Abrechnung von Asset-Rechnungen, der RFQ-Aushandlung und der Adress- und Nachweisvalidierung. Loop ist auf regtest und simnet nun standardmäßig deaktiviert. Betreiber von Asset-Kanälen müssen vor dem Update die Anleitung zur kontrollierten Aktualisierung befolgen: https://github.com/lightninglabs/taproot-assets/releases/tag/v0.8.6. Vollständige Upstream-Versionshinweise: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
    pl_PL:
      'Zaktualizowano Lightning Terminal do wersji 0.17.7, zawierającej Taproot Assets 0.8.6 z poprawkami rozliczania faktur aktywów, negocjacji RFQ oraz weryfikacji adresów i dowodów. Loop jest teraz domyślnie wyłączony w regtest i simnet. Operatorzy kanałów aktywów muszą przed aktualizacją zastosować się do instrukcji kontrolowanej aktualizacji: https://github.com/lightninglabs/taproot-assets/releases/tag/v0.8.6. Pełne informacje o wydaniu projektu źródłowego: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
    fr_FR:
      'Lightning Terminal a été mis à jour vers la version 0.17.7, avec Taproot Assets 0.8.6 corrigeant la comptabilisation des factures d’actifs, la négociation RFQ et la validation des adresses et des preuves. Loop est désormais désactivé par défaut sur regtest et simnet. Les opérateurs de canaux d’actifs doivent suivre les consignes de mise à jour contrôlée avant toute mise à jour : https://github.com/lightninglabs/taproot-assets/releases/tag/v0.8.6. Notes de version amont complètes : https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.7',
  },
  migrations: {},
})
