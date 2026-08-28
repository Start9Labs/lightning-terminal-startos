import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.3-alpha:0',
  releaseNotes: {
    en_US: `Updated Lightning Terminal to 0.17.3-alpha.

- Session security: the firewall now checks that the session identifier presented with a request matches the session macaroon it was issued for.
- Faraday, the node accounting daemon, now runs as a full component rather than only its RPC interface. Its forwarding-ability report is available inside Lightning Node Connect sessions, with peer public keys obfuscated; calls to sub-daemons that have no privacy mapping are blocked in those sessions.
- Inbound fees are reported through the privacy mapper in the fee report.
- Integrated daemons updated: Loop 0.35.0-beta and Faraday 0.2.18-alpha.

Full upstream release notes:
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.3-alpha`,
    es_ES: `Se actualizó Lightning Terminal a 0.17.3-alpha.

- Seguridad de las sesiones: el cortafuegos comprueba ahora que el identificador de sesión presentado con una solicitud coincida con el macarrón de sesión para el que se emitió.
- Faraday, el demonio de contabilidad del nodo, se ejecuta ahora como un componente completo y no solo como su interfaz RPC. Su informe de capacidad de reenvío está disponible dentro de las sesiones de Lightning Node Connect, con las claves públicas de los pares ofuscadas; las llamadas a subdemonios sin mapeo de privacidad quedan bloqueadas en esas sesiones.
- Las tarifas entrantes se comunican a través del mapeador de privacidad en el informe de tarifas.
- Demonios integrados actualizados: Loop 0.35.0-beta y Faraday 0.2.18-alpha.

Notas de la versión completas:
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.3-alpha`,
    de_DE: `Lightning Terminal wurde auf 0.17.3-alpha aktualisiert.

- Sitzungssicherheit: Die Firewall prüft nun, ob die mit einer Anfrage übermittelte Sitzungskennung zu dem Sitzungs-Macaroon passt, für das sie ausgestellt wurde.
- Faraday, der Buchhaltungs-Daemon des Nodes, läuft nun als vollständige Komponente statt nur mit seiner RPC-Schnittstelle. Sein Weiterleitungsbericht steht innerhalb von Lightning-Node-Connect-Sitzungen zur Verfügung, wobei die öffentlichen Schlüssel der Peers verschleiert werden; Aufrufe an Sub-Daemons ohne Privacy-Mapping werden in diesen Sitzungen blockiert.
- Eingehende Gebühren werden im Gebührenbericht über das Privacy-Mapping ausgegeben.
- Integrierte Daemons aktualisiert: Loop 0.35.0-beta und Faraday 0.2.18-alpha.

Vollständige Upstream-Versionshinweise:
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.3-alpha`,
    pl_PL: `Zaktualizowano Lightning Terminal do wersji 0.17.3-alpha.

- Bezpieczeństwo sesji: zapora sprawdza teraz, czy identyfikator sesji przesłany wraz z żądaniem odpowiada makaronowi sesji, dla którego został wydany.
- Faraday, demon księgowy węzła, działa teraz jako pełny komponent, a nie tylko jako jego interfejs RPC. Jego raport o zdolności przekazywania jest dostępny w sesjach Lightning Node Connect, z zaciemnionymi kluczami publicznymi partnerów; wywołania do subdemonów bez mapowania prywatności są w tych sesjach blokowane.
- Opłaty przychodzące są przekazywane przez mapowanie prywatności w raporcie opłat.
- Zaktualizowano zintegrowane demony: Loop 0.35.0-beta i Faraday 0.2.18-alpha.

Pełne informacje o wydaniu:
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.3-alpha`,
    fr_FR: `Lightning Terminal a été mis à jour vers 0.17.3-alpha.

- Sécurité des sessions : le pare-feu vérifie désormais que l'identifiant de session transmis avec une requête correspond au macaron de session pour lequel il a été émis.
- Faraday, le démon de comptabilité du nœud, fonctionne désormais comme un composant complet et non plus seulement via son interface RPC. Son rapport de capacité de transfert est disponible dans les sessions Lightning Node Connect, avec les clés publiques des pairs masquées ; les appels aux sous-démons dépourvus de mappage de confidentialité sont bloqués dans ces sessions.
- Les frais entrants sont transmis par le mappage de confidentialité dans le rapport de frais.
- Démons intégrés mis à jour : Loop 0.35.0-beta et Faraday 0.2.18-alpha.

Notes de version complètes :
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.3-alpha`,
  },
  migrations: {},
})
