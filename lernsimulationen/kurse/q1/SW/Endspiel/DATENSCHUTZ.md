# Datenschutz-Check „Endspiel Q1 – Deutschlandreise"

Stand: Juli 2026 · geprüft gegen den Einsatz: öffentliches Hosting (GitHub Pages),
Schülertablets, Lehrkraft-Beamer, optional Supabase-Realtime.

## 1. Was das Spiel verarbeitet – und was nicht

| Datenart | Wird verarbeitet? | Wo |
|---|---|---|
| Klarnamen von Schülerinnen/Schülern | ❌ nein – es gibt kein Namensfeld für Personen | – |
| Teamname (Pflicht: Fantasiename) | ✅ ja, flüchtig | Anzeige am Tafelbild; im Supabase-Modus als Live-Nachricht |
| Avatar-Auswahl, Antworten, Punkte | ✅ ja, flüchtig | Spielstand nur auf dem Lehrkraft-Gerät (localStorage) |
| Freitext-Antworten (offene Aufgaben) | ✅ ja, flüchtig | Anzeige am Tafelbild zur Bewertung |
| Konten / Logins / E-Mail der Lernenden | ❌ nein – Beitritt nur per 4-stelligem Spielcode | – |
| Cookies, Tracking, Analytics, Werbung | ❌ nein | – |
| Externe CDNs, Web-Fonts (Google Fonts o. ä.) | ❌ nein – alles läuft lokal aus einer Datei | – |

Technische Absicherungen im Spiel selbst:

- **Pseudonymisierung by design:** Anmeldemaske und Tafelbild fordern ausdrücklich Fantasienamen; die Lehrkraft kann unpassende Teamnamen in der Lobby per Klick entfernen.
- **Keine Serverspeicherung:** Im Supabase-Modus werden nur Realtime-Broadcast-Nachrichten übertragen – es gibt **keine Datenbanktabellen**, nach Spielende existiert serverseitig nichts.
- **Lokale Ablage:** Der Spielstand liegt ausschließlich im localStorage des Lehrkraft-Geräts („Spiel beenden & zurücksetzen" auf dem Podium löscht ihn). Tablets merken sich Team/Code nur in der sessionStorage – die leert sich beim Schließen des Browsers von selbst.
- Eingaben werden escaped ausgegeben (kein XSS über Teamnamen/Antworten).

## 2. Restrisiken & To-dos für dich (bitte prüfen)

1. **GitHub Pages (Hosting):** GitHub (USA) protokolliert beim Abruf technisch bedingt IP-Adressen. Es werden keine Inhalte der Lernenden an GitHub gesendet – aber der Seitenabruf selbst ist ein Datenfluss.
   → Empfehlung: Nutzung wie bei deinen anderen Lernsimulationen; falls die Startseite eine Datenschutzerklärung hat, GitHub Pages als Hoster dort erwähnen. Alternativ lässt sich die eine HTML-Datei auch einfach per Datei-Ablage im Schulnetz verteilen (Tafelbild) – nur der Supabase-Sync braucht Internet.
2. **Supabase:** Region **Frankfurt (eu-central-1)** wählen (siehe SUPABASE-SETUP.md) – dann bleiben die flüchtigen Nachrichten in der EU. Der `anon`-Key ist öffentlich vorgesehen; den `service_role`-Key nie verwenden. Da keine personenbezogenen Daten gespeichert werden, ist das Risiko minimal; wer ganz formal sein will, nimmt Supabase in das Verfahrensverzeichnis der Schule auf.
3. **supabase.js lokal einbinden, nicht per CDN** (so in SUPABASE-SETUP.md beschrieben) – sonst würde jedes Tablet beim Laden jsdelivr (US-CDN) kontaktieren.
4. **Offene Antworten am Beamer:** Freitexte der Teams werden für alle sichtbar projiziert. Kurz ansagen: keine Personen nennen, keine privaten Inhalte. (Gleiches Klassenraum-Prinzip wie bei mündlichen Antworten.)
5. **Spielcode = Zugangsschutz:** Wer den 4-stelligen Code kennt, kann beitreten. Für den Unterricht reicht das (Code steht nur an eurer Tafel, max. 8 Teams, Lehrkraft sieht jeden Beitritt und kann Teams entfernen). Den Code nicht vorab digital herumschicken.

## 3. ⚠️ Zwei Funde außerhalb des Spiels (bitte nicht übersehen!)

Beim Auswerten deiner vier Quell-PDFs sind mir zwei Dinge aufgefallen, die mit dem
Spiel nichts zu tun haben, aber datenschutzrelevant sind, falls du die PDFs
weitergibst oder ins (öffentliche!) Repository legst:

Alle vier Funde liegen in **`Sozialstaat.pdf`** (Seitenzahlen = PDF-Seite, identisch
mit der Fußzeile „Sozialstaat Seite …"):

1. **Links mit Zugangsdaten-Charakter (fobizz), beide auf Seite 10** – OneNote-Seite
   „Die aktuelle Rentenreform" (25.06.2026):
   - `https://go.fobizz.com/?token=1134f3efe54e3842` (Token-Link, oben links neben dem Arbeitsauftrag)
   - `https://app.fobizz.com/t/school_classes/56b6d6c1-…/projects/54bd2ac5-…`
     (direkter Link in deine fobizz-Klassenumgebung, „Aus <…>"-Quellzeile darunter)
2. **ChatGPT-Share-/Projekt-Links:**
   - Seite 1 (OneNote-Seite „22.05. Einstieg Sozialstaat", unter der Gruppentabelle):
     `https://chatgpt.com/g/g-p-…-sw-ruckmeldung-schulerarbeiten/c/6a1fe6f7-…` –
     Link in das Projekt **„SW Rückmeldung Schülerarbeiten"**; solche geteilten
     Chats können Schülerarbeiten/Namen enthalten und sind für jeden mit Link lesbar.
   - Seite 7 (gehört zur OneNote-Seite „Theorien der gesellschaftlichen Sicherung"):
     `https://chatgpt.com/c/6a329eb7-…` – geteilter Einzel-Chat.

   → Empfehlung: Die vier OneNote-PDFs **nicht** in das öffentliche GitHub-Repository
   committen; die geteilten ChatGPT-Links bei Gelegenheit deaktivieren („Geteilte
   Links verwalten") und den fobizz-Token-Link prüfen/erneuern.

## 4. Kurzfazit

Das Spiel selbst ist datensparsam konzipiert (keine Klarnamen, keine Konten, keine
Speicherung, keine Dritt-CDNs). Offene Punkte liegen außerhalb der Spieldatei:
Hosting-Hinweis (GitHub Pages), EU-Region bei Supabase, lokale supabase.js – und
die beiden PDF-Funde aus Abschnitt 3.
