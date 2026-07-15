# Endspiel Q1 – Deutschlandreise 🚆

Abschlussspiel für den Leistungskurs Sozialwissenschaften (Q1), Spieldauer ca. **90–100 Minuten**.
Aufgaben erscheinen am **Tafelbild** (Beamer), die Teams (2–8) antworten an ihren **Tablets**.

**Rahmenidee:** Eine Zugreise durch Deutschland – jede Station ein Thema des Halbjahres:

| Station | Ort | Thema | Aufgaben |
|---|---|---|---|
| 1 | ⚓ Hamburg | Erscheinungsformen sozialer Ungleichheit | 9 + 2 Reserve |
| 2 | ⛏️ Essen (Ruhrgebiet) | Sozialer Wandel | 10 + 2 Reserve |
| 3 | 🎓 Heidelberg | Modelle & Theorien sozialer Ungleichheit | 9 + 2 Reserve |
| 4 | 🏛️ Berlin | Sozialstaat | 9 + 2 Reserve |
| 5 | 📈 Frankfurt a. M. | **Bonus:** Wirtschaftspolitische Konzeptionen, magisches Viereck, Konjunkturzyklus | 9 + 2 Reserve |
| 🏁 | 🏔️ Zugspitze | Finale mit Risiko-Einsatz (bis 50 % der Punkte) | 1 von 3 Finalfragen |

Aufgabentypen: Multiple Choice (mit Tempobonus), Zuordnung, Reihenfolge, Schätzfrage
und **offene Aufgaben (AFB II/III)**, die du live am Tafelbild mit 0–150 Punkten bewertest.
Danach: Siegerehrung mit Podium und Konfetti. 🏆

## Schnellstart

1. `index.html` öffnen → **„Probelauf (1 Gerät)"** – so testest du alles ohne Tablets
   (zwei simulierte Teams, Button „🧪 Demo-Antworten" liefert Antworten).
2. Für den echten Einsatz mit Tablets: einmalig **SUPABASE-SETUP.md** abarbeiten
   (bewusst als letzter Schritt ausgelegt). Vorher läuft das Spiel im lokalen Modus.
3. KI-Bilder generieren lassen: **BILD-PROMPTS.md** an eine Bild-KI geben, fertige
   Dateien nach `assets/` legen – das Spiel bindet sie automatisch ein (ohne Bilder
   zeigt es gestaltete Platzhalter, spielbar ist es immer).
4. Datenschutz: **DATENSCHUTZ.md** lesen (enthält auch zwei Hinweise zu deinen Quell-PDFs!).

## Ablauf am Spieltag (Vorschlag, ≈ 95 Min.)

| Zeit | Phase |
|---|---|
| 0–10′ | Begrüßung, Teams bilden (3–5 Personen), Tablets verbinden (Code von der Tafel) |
| 10–80′ | Stationen 1–5, je ca. 14 Min. – Reserveaufgaben nur bei Zeitpuffer, sonst „Überspringen" |
| 80–88′ | Finale: Einsatz setzen → Finalfrage (Auswahl aus 3) |
| 88–95′ | Siegerehrung 🥇🥈🥉 |

Steuerung unten am Tafelbild: Timer pausieren/+30 s, Auflösen, Überspringen, Weiter.
Bei Absturz des Tafel-PCs: Seite neu laden → „Spiel fortsetzen?" → Punktestand ist zurück.

## Punktesystem

MC 100 (+ bis 50 Tempobonus) · Zuordnung 30/Paar · Reihenfolge 120 bzw. 60 ·
Schätzfrage 100/70/40 (Nähe-Ranking) · Offene Aufgabe 0–150 (Lehrkraft) ·
Finale: Einsatz bis 50 % (richtig +, falsch/keine Antwort −).

## Aufgaben anpassen

Alle Aufgaben stehen als gut lesbare Daten in `index.html` im Block `const STATIONS = […]`
(Suchbegriff im Editor). Jede Aufgabe ist ein Objekt mit `q` (Frage), Optionen/Paaren
und `expl` (Erklärung für die Auflösung). Reserveaufgaben tragen `r:true`.
Einfach Text ändern, speichern, fertig – es ist kein Build nötig.

## Technik-Checkliste für den Spieltag

- [ ] Beamer + PC mit aktuellem Browser (Chrome/Edge/Firefox), Ton optional
- [ ] 1 Tablet pro Team, gleiche URL wie das Tafelbild
- [ ] Supabase aktiv? (Startbildschirm zeigt 🟢) – Funktionstest laut SUPABASE-SETUP.md
- [ ] Notfallplan: Ohne Netz Tafelbild im Probelauf-Modus nutzen und Teams mündlich/auf Papier antworten lassen (Punkte über die Bewertungsbuttons der offenen Aufgaben vergeben ginge zur Not auch)
- [ ] Spielstand alter Proben gelöscht? (Podium → „Spiel beenden & zurücksetzen")
