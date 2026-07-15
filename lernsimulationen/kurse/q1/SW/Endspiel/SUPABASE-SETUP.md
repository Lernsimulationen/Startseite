# Supabase-Anbindung (ganz zum Schluss einrichten)

Das Spiel ist fertig vorbereitet: Die komplette Supabase-Logik steckt bereits in
`index.html` (Klasse `SupabaseBackend`). Es fehlen nur **drei Handgriffe**.
Bis dahin läuft das Spiel im lokalen Modus (Probelauf auf einem Gerät).

**Wichtig für den Datenschutz:** Das Spiel nutzt Supabase ausschließlich als
**Realtime-Broadcast-Kanal** (Live-Nachrichten zwischen Tafelbild und Tablets).
Es werden **keine Tabellen angelegt und keine Daten gespeichert** – nach dem
Spiel existiert bei Supabase nichts mehr. Deshalb ist auch kein SQL-Setup nötig.

---

## Schritt 1: Supabase-Projekt anlegen (einmalig, ca. 5 Minuten)

1. Auf <https://supabase.com> ein kostenloses Konto anlegen (Dienst-E-Mail verwenden).
2. „New project" →
   - **Region: Europe (Frankfurt) `eu-central-1`** ← wichtig (DSGVO, Daten bleiben in der EU)
   - Projektname z. B. `endspiel-q1`, Datenbank-Passwort sicher ablegen (wird nicht im Spiel gebraucht).
3. Im Projekt: **Settings → API**. Dort stehen die beiden Werte, die du brauchst:
   - `Project URL` (z. B. `https://abcdefgh.supabase.co`)
   - `anon public` API-Key (langer Text, beginnt mit `eyJ…`)

> Der `anon`-Key ist dafür gemacht, öffentlich im Browser-Code zu stehen – das ist
> kein Sicherheitsproblem. Den `service_role`-Key dagegen **niemals** verwenden!

## Schritt 2: supabase.js lokal ablegen (kein CDN → Datenschutz)

Damit die Tablets keine Verbindung zu einem US-CDN aufbauen, wird die Bibliothek
einmalig heruntergeladen und mit ins Repository gelegt:

1. Diese Datei im Browser öffnen und speichern (Rechtsklick → „Speichern unter"):
   <https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js>
2. Speichern als: `Endspiel/assets/vendor/supabase.js`

## Schritt 3: index.html anpassen (2 Stellen)

1. **Im `<head>`** die vorbereitete Zeile einkommentieren, sodass dort steht:
   ```html
   <script src="assets/vendor/supabase.js"></script>
   ```
2. **Im Konfigurationsblock** (ganz oben im großen `<script>`-Teil, Suchbegriff
   `SUPABASE_URL`) die beiden Werte aus Schritt 1 eintragen:
   ```js
   const SUPABASE_URL = "https://abcdefgh.supabase.co";
   const SUPABASE_ANON_KEY = "eyJ…";
   ```

Fertig. Auf dem Startbildschirm erscheint dann
**„🟢 Supabase verbunden"** – ab jetzt können Tablets über das Internet beitreten.

---

## Funktionstest (vor dem Spieltag!)

1. Änderungen committen/pushen, Seite über GitHub Pages öffnen.
2. Gerät A (PC/Beamer): „Tafelbild starten" → Code notieren.
3. Gerät B (Tablet/Handy, gern über Mobilfunk statt Schul-WLAN testen):
   „Als Team beitreten" → Code eingeben → Team erscheint am Tafelbild? ✔
4. Eine Aufgabe starten, am Tablet antworten, am Tafelbild auflösen. ✔

## Störungshilfe

| Problem | Lösung |
|---|---|
| Startbildschirm zeigt weiter „lokaler Modus" | `assets/vendor/supabase.js` fehlt/Pfad falsch, oder Script-Zeile noch auskommentiert, oder URL/Key leer. |
| Team erscheint nicht am Tafelbild | Beide Geräte auf derselben (neu geladenen) Version? Code korrekt? Schul-WLAN blockiert WebSockets → Tablet testweise über Hotspot verbinden. |
| Verbindung bricht mitten im Spiel ab | Tablet: Seite neu laden und mit demselben Code + Teamnamen erneut beitreten – Punktestand bleibt erhalten (das Tafelbild führt die Punkte). |
| Tafelbild-PC stürzt ab | Seite neu laden → „Gespeichertes Spiel fortsetzen?" bestätigen (Spielstand liegt im localStorage des Lehrergeräts). |

## Kosten & Limits

Der kostenlose Supabase-Tarif reicht locker: 1 Tafelbild + 8 Tablets = 9 gleichzeitige
Verbindungen (Limit: 200), wenige Nachrichten pro Sekunde. Es entstehen keine Kosten.

## Nach dem Spieltag (optional, maximale Datenhygiene)

- Es sind keine Daten gespeichert – es gibt nichts zu löschen.
- Wer mag, kann das Supabase-Projekt pausieren oder löschen; für künftige Spiele
  kann es aber einfach bestehen bleiben.
