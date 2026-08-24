import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.2-alpha:0',
  releaseNotes: {
    en_US: `Updated Lightning Terminal to 0.17.2-alpha, rolling up upstream releases 0.17.1 and 0.17.2.

- On StartOS, the health check now reflects whether Lightning Terminal can actually reach the Lightning Network Daemon. It previously only checked that the web port was open — a port Lightning Terminal opens before it connects, and keeps open when that connection fails — so the service could report itself healthy while the interface would not load. It now tells you what it is waiting on: a wallet that has never been unlocked, a connection still being made, or the error it hit.
- The one-time database conversion that 0.17.0 introduced no longer fails on a busy node. It gave the Lightning Network Daemon a fixed sixty seconds to become ready, which a node with a large channel set and network graph can exceed — the conversion then failed for good and Lightning Terminal had to be restarted by hand. It now waits up to ten minutes and reports its progress while waiting.
- A failed payment from an account reports the error the Lightning Network Daemon actually returned, rather than masking it with a confusing internal one.
- Integrated daemons updated: Taproot Assets 0.8.1 and Loop 0.34.0-beta.

Upstream published this release's container image under a tag ending in \`-docker\`, so Lightning Terminal reports its own version as 0.17.2-alpha-docker. The code is upstream's 0.17.2-alpha release.

Full upstream release notes:
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.1-alpha
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.2-alpha`,
    es_ES: `Se actualizó Lightning Terminal a 0.17.2-alpha, que agrupa las versiones 0.17.1 y 0.17.2 del proyecto original.

- En StartOS, la comprobación de estado ahora refleja si Lightning Terminal puede realmente comunicarse con el demonio de Lightning Network. Antes solo comprobaba que el puerto web estuviera abierto —un puerto que Lightning Terminal abre antes de conectarse y mantiene abierto cuando esa conexión falla—, por lo que el servicio podía declararse correcto mientras la interfaz no cargaba. Ahora indica qué está esperando: un monedero que nunca se ha desbloqueado, una conexión en curso o el error encontrado.
- La conversión única de base de datos que introdujo la versión 0.17.0 ya no falla en un nodo ocupado. Daba al demonio de Lightning Network sesenta segundos fijos para estar listo, tiempo que un nodo con muchos canales y un grafo de red grande puede superar: la conversión fallaba definitivamente y había que reiniciar Lightning Terminal a mano. Ahora espera hasta diez minutos e informa de su progreso mientras espera.
- Un pago fallido desde una cuenta informa del error que devolvió realmente el demonio de Lightning Network, en lugar de ocultarlo tras un error interno confuso.
- Demonios integrados actualizados: Taproot Assets 0.8.1 y Loop 0.34.0-beta.

El proyecto original publicó la imagen de contenedor de esta versión con una etiqueta terminada en \`-docker\`, por lo que Lightning Terminal indica su propia versión como 0.17.2-alpha-docker. El código es el de la versión 0.17.2-alpha original.

Notas de la versión completas:
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.1-alpha
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.2-alpha`,
    de_DE: `Lightning Terminal wurde auf 0.17.2-alpha aktualisiert und fasst die Upstream-Versionen 0.17.1 und 0.17.2 zusammen.

- Unter StartOS spiegelt die Zustandsprüfung jetzt wider, ob Lightning Terminal den Lightning Network Daemon tatsächlich erreichen kann. Zuvor prüfte sie nur, ob der Web-Port offen ist — ein Port, den Lightning Terminal öffnet, bevor es sich verbindet, und offen hält, wenn diese Verbindung scheitert. Der Dienst konnte sich also als fehlerfrei melden, während die Oberfläche nicht lud. Nun nennt sie, worauf gewartet wird: eine nie entsperrte Wallet, eine noch aufzubauende Verbindung oder den aufgetretenen Fehler.
- Die einmalige Datenbankumstellung aus 0.17.0 schlägt auf einem ausgelasteten Node nicht mehr fehl. Sie gab dem Lightning Network Daemon feste sechzig Sekunden, um bereit zu sein — was ein Node mit vielen Kanälen und großem Netzwerkgraphen überschreiten kann. Die Umstellung scheiterte dann endgültig und Lightning Terminal musste von Hand neu gestartet werden. Sie wartet nun bis zu zehn Minuten und meldet währenddessen ihren Fortschritt.
- Eine fehlgeschlagene Zahlung aus einem Konto meldet den Fehler, den der Lightning Network Daemon tatsächlich zurückgegeben hat, statt ihn hinter einem verwirrenden internen Fehler zu verbergen.
- Integrierte Daemons aktualisiert: Taproot Assets 0.8.1 und Loop 0.34.0-beta.

Upstream hat das Container-Image dieser Version unter einem Tag mit der Endung \`-docker\` veröffentlicht, daher meldet Lightning Terminal seine eigene Version als 0.17.2-alpha-docker. Der Code ist der des Upstream-Releases 0.17.2-alpha.

Vollständige Upstream-Versionshinweise:
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.1-alpha
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.2-alpha`,
    pl_PL: `Zaktualizowano Lightning Terminal do wersji 0.17.2-alpha, obejmującej wydania 0.17.1 i 0.17.2 projektu źródłowego.

- W StartOS kontrola stanu odzwierciedla teraz to, czy Lightning Terminal faktycznie może połączyć się z demonem Lightning Network. Wcześniej sprawdzała jedynie, czy port webowy jest otwarty — port, który Lightning Terminal otwiera przed nawiązaniem połączenia i pozostawia otwarty, gdy to połączenie zawiedzie — więc usługa mogła zgłaszać się jako sprawna, choć interfejs się nie ładował. Teraz podaje, na co czeka: na nigdy nieodblokowany portfel, na trwające nawiązywanie połączenia albo na napotkany błąd.
- Jednorazowa konwersja bazy danych wprowadzona w wersji 0.17.0 nie zawodzi już na obciążonym węźle. Dawała demonowi Lightning Network stałe sześćdziesiąt sekund na osiągnięcie gotowości, co węzeł z dużą liczbą kanałów i dużym grafem sieci może przekroczyć — konwersja kończyła się wtedy trwałym niepowodzeniem i trzeba było ręcznie zrestartować Lightning Terminal. Teraz czeka do dziesięciu minut i zgłasza postęp w trakcie oczekiwania.
- Nieudana płatność z konta zgłasza błąd faktycznie zwrócony przez demona Lightning Network, zamiast ukrywać go za mylącym błędem wewnętrznym.
- Zaktualizowano zintegrowane demony: Taproot Assets 0.8.1 i Loop 0.34.0-beta.

Projekt źródłowy opublikował obraz kontenera tego wydania pod znacznikiem zakończonym \`-docker\`, dlatego Lightning Terminal podaje swoją wersję jako 0.17.2-alpha-docker. Kod pochodzi z wydania 0.17.2-alpha projektu źródłowego.

Pełne informacje o wydaniu:
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.1-alpha
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.2-alpha`,
    fr_FR: `Lightning Terminal a été mis à jour vers 0.17.2-alpha, regroupant les versions amont 0.17.1 et 0.17.2.

- Sur StartOS, la vérification d'état reflète désormais la capacité réelle de Lightning Terminal à joindre le démon Lightning Network. Elle vérifiait auparavant seulement que le port web était ouvert — un port que Lightning Terminal ouvre avant de se connecter, et qu'il garde ouvert lorsque cette connexion échoue — si bien que le service pouvait se déclarer sain alors que l'interface ne se chargeait pas. Elle indique maintenant ce qu'elle attend : un portefeuille jamais déverrouillé, une connexion en cours d'établissement, ou l'erreur rencontrée.
- La conversion unique de base de données introduite en 0.17.0 n'échoue plus sur un nœud chargé. Elle laissait au démon Lightning Network soixante secondes fixes pour être prêt, un délai qu'un nœud comportant beaucoup de canaux et un grand graphe de réseau peut dépasser : la conversion échouait alors définitivement et Lightning Terminal devait être redémarré à la main. Elle attend désormais jusqu'à dix minutes et signale sa progression pendant l'attente.
- Un paiement échoué depuis un compte signale l'erreur réellement renvoyée par le démon Lightning Network, au lieu de la masquer derrière une erreur interne déroutante.
- Démons intégrés mis à jour : Taproot Assets 0.8.1 et Loop 0.34.0-beta.

Le projet amont a publié l'image de conteneur de cette version sous une étiquette se terminant par \`-docker\` ; Lightning Terminal indique donc sa propre version comme 0.17.2-alpha-docker. Le code est celui de la version amont 0.17.2-alpha.

Notes de version complètes :
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.1-alpha
https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.17.2-alpha`,
  },
  migrations: {},
})
