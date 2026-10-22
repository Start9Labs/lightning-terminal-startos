import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.8:0',
  releaseNotes: {
    en_US: `Updated Lightning Terminal to 0.17.8. This release uses Go 1.27.3 to reject compromised certificate chains (CVE-2026-111943), fixes sub-server shutdown and SQL error matching, and updates bundled liquidity services. The upstream image now includes the fixed CA store, replacing the temporary StartOS layer.

Back up your databases before updating. Bundled Loop automatically adds on-chain cost fields to static-address deposits and looks up costs for existing deposits after startup. Instant Out API callers must set max_swap_fee_sat; omitting the fee cap is rejected (zero is valid).

Full upstream release notes: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.8`,
    es_ES: `Lightning Terminal se actualizó a 0.17.8. Recompilado con Go 1.27.3 para rechazar cadenas de certificados comprometidas (CVE-2026-111943), corrige el apagado de los subservidores y la detección de errores SQL, y actualiza los servicios de liquidez incluidos. La imagen original ya incluye el almacén de CA corregido, sustituyendo la capa temporal de StartOS.

Haz una copia de seguridad de tus bases de datos antes de actualizar. Loop añade automáticamente campos de costes en cadena a los depósitos de direcciones estáticas y consulta los costes de los depósitos existentes tras el inicio. Los clientes de la API Instant Out deben establecer max_swap_fee_sat; omitir el límite de comisión provoca el rechazo (cero es válido).

Notas completas de la versión original: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.8`,
    de_DE: `Lightning Terminal wurde auf 0.17.8 aktualisiert. Mit Go 1.27.3 neu kompiliert, um kompromittierte Zertifikatsketten abzulehnen (CVE-2026-111943). Behebt das Herunterfahren der Unterserver und die Erkennung von SQL-Fehlern und aktualisiert die enthaltenen Liquiditätsdienste. Das Upstream-Image enthält nun den korrigierten CA-Speicher und ersetzt die temporäre StartOS-Schicht.

Sichern Sie Ihre Datenbanken vor dem Update. Das enthaltene Loop ergänzt automatisch Felder für On-Chain-Kosten bei Einzahlungen auf statische Adressen und ermittelt nach dem Start die Kosten bestehender Einzahlungen. Instant-Out-API-Aufrufer müssen max_swap_fee_sat setzen; ohne Gebührenlimit wird die Anfrage abgelehnt (null ist gültig).

Vollständige Upstream-Versionshinweise: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.8`,
    pl_PL: `Zaktualizowano Lightning Terminal do wersji 0.17.8. Ponownie skompilowano z Go 1.27.3, aby odrzucać przejęte łańcuchy certyfikatów (CVE-2026-111943), naprawiono zamykanie podserwerów i rozpoznawanie błędów SQL oraz zaktualizowano dołączone usługi płynności. Obraz źródłowy zawiera już poprawiony magazyn CA, zastępując tymczasową warstwę StartOS.

Przed aktualizacją wykonaj kopię zapasową baz danych. Dołączony Loop automatycznie dodaje pola kosztów on-chain do wpłat na adresy statyczne i ustala koszty istniejących wpłat po uruchomieniu. Klienci API Instant Out muszą ustawić max_swap_fee_sat; pominięcie limitu opłaty powoduje odrzucenie żądania (zero jest prawidłowe).

Pełne informacje o wydaniu projektu źródłowego: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.8`,
    fr_FR: `Lightning Terminal a été mis à jour vers la version 0.17.8. Recompilé avec Go 1.27.3 pour rejeter les chaînes de certificats compromises (CVE-2026-111943), corrige l'arrêt des sous-serveurs et la détection des erreurs SQL et met à jour les services de liquidité inclus. L'image amont contient désormais le magasin de CA corrigé, remplaçant la couche temporaire de StartOS.

Sauvegardez vos bases de données avant la mise à jour. Loop ajoute automatiquement des champs de coûts sur la chaîne aux dépôts d'adresses statiques et recherche les coûts des dépôts existants après le démarrage. Les clients de l'API Instant Out doivent définir max_swap_fee_sat ; sans plafond de frais, la demande est rejetée (zéro est valide).

Notes de version amont complètes : https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.8`,
  },
  migrations: {},
})
