import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.10:0',
  releaseNotes: {
    en_US: `Updated Lightning Terminal to 0.17.10 and start-sdk to 3.1.1. Lightning Terminal disables MPTCP listeners by default to mitigate the demonstrated exploit path for CVE-2026-98432 and updates its bundled services.

This is not a kernel fix: a patched StartOS host kernel is still required. This package connects to the separate LND service, which must receive its own security update independently.

Full upstream release notes: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.10`,
    es_ES: `Lightning Terminal se actualizó a 0.17.10 y start-sdk a 3.1.1. Lightning Terminal desactiva los servidores MPTCP de forma predeterminada para mitigar la vía de explotación demostrada de CVE-2026-98432 y actualiza sus servicios incluidos.

Esto no corrige el núcleo: sigue siendo necesario un núcleo de StartOS con el parche. Este paquete se conecta al servicio LND independiente, que debe recibir su propia actualización de seguridad por separado.

Notas completas de la versión original: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.10`,
    de_DE: `Lightning Terminal wurde auf 0.17.10 und start-sdk auf 3.1.1 aktualisiert. Lightning Terminal deaktiviert MPTCP-Listener standardmäßig, um den nachgewiesenen Angriffsweg für CVE-2026-98432 zu entschärfen, und aktualisiert seine enthaltenen Dienste.

Dies behebt nicht den Kernel-Fehler: Ein gepatchter StartOS-Host-Kernel ist weiterhin erforderlich. Dieses Paket verbindet sich mit dem separaten LND-Dienst, der sein eigenes Sicherheitsupdate unabhängig erhalten muss.

Vollständige Upstream-Versionshinweise: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.10`,
    pl_PL: `Zaktualizowano Lightning Terminal do wersji 0.17.10 i start-sdk do 3.1.1. Lightning Terminal domyślnie wyłącza nasłuchiwanie MPTCP, aby ograniczyć zademonstrowaną ścieżkę wykorzystania CVE-2026-98432, i aktualizuje dołączone usługi.

Nie jest to poprawka jądra: nadal wymagane jest załatane jądro hosta StartOS. Ten pakiet łączy się z oddzielną usługą LND, która musi niezależnie otrzymać własną aktualizację zabezpieczeń.

Pełne informacje o wydaniu projektu źródłowego: https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.10`,
    fr_FR: `Lightning Terminal a été mis à jour vers la version 0.17.10 et start-sdk vers 3.1.1. Lightning Terminal désactive les écouteurs MPTCP par défaut pour atténuer le chemin d'exploitation démontré de CVE-2026-98432 et met à jour ses services intégrés.

Cela ne corrige pas le noyau : un noyau hôte StartOS corrigé reste nécessaire. Ce paquet se connecte au service LND distinct, qui doit recevoir sa propre mise à jour de sécurité indépendamment.

Notes de version amont complètes : https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.10`,
  },
  migrations: {},
})
