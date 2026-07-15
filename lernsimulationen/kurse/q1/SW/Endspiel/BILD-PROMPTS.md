# Bild-Prompts für „Endspiel Q1 – Deutschlandreise"

Diese Datei ist der Auftrag an eine **Bild-KI** (z. B. Midjourney, DALL·E, Ideogram, Firefly).
Sie erzeugt alle Illustrationen für das Lernspiel `index.html` in diesem Ordner.

---

## Anweisung an die Bild-KI (bitte zuerst lesen)

> **Analysiere vor dem Generieren die Datei `index.html` in diesem Ordner.**
> Dort findest du:
> 1. das Farbschema im CSS-Block `:root` (Dunkelblau `#0e1a2f`/`#16274a` als Hintergrund, Signalgelb `#ffcf4d` und Himmelblau `#4dc9ff` als Akzente),
> 2. die Liste `AVATARS` (8 Reise-Avatare mit `id`, Name und Ziel-Dateipfad),
> 3. die Liste `STATIONS` (5 Stationen + `FINALE` mit Stadt, Thema und Ziel-Dateipfad im Feld `img`),
> 4. die Einbau-Stellen: alle `<div class="img-slot" data-img="...">`-Elemente. Das Attribut `data-img` ist der exakte Dateipfad, `data-ph` beschreibt den Bildinhalt.
>
> **Jeder unten angegebene Dateiname muss exakt übernommen werden** – das Spiel lädt die Bilder automatisch, sobald die Dateien existieren. Fehlt ein Bild, zeigt das Spiel einen Platzhalter (das Spiel funktioniert also auch mit Teil-Lieferungen).

## Verbindlicher Stil (für ALLE Bilder identisch)

- **Stil:** moderne, flache Vektor-Illustration (flat design mit weichen Verläufen und leichtem Korn), wie hochwertige Reiseplakate; **kein Fotorealismus, kein 3D-Render, kein Kinderbuch-Stil** – die Zielgruppe ist ein Leistungskurs, Jahrgangsstufe Q1 (17–18 Jahre).
- **Farbwelt:** tiefes Nachtblau (#0e1a2f bis #24406f) als Grundton, Signalgelb (#ffcf4d) und Himmelblau (#4dc9ff) als Akzente, warme Lichter. Die Bilder müssen auf dunklem UI-Hintergrund harmonieren.
- **Stimmung:** abendliche Zugreise, Aufbruch, leichtes Abenteuer; klare Silhouetten, atmosphärisches Licht.
- **Wichtig: KEIN Text, keine Buchstaben, keine Logos, keine Schilder mit Schrift im Bild** (KI-Text wirkt fehlerhaft; alle Beschriftungen macht das Spiel selbst).
- **Keine realen Personen**, keine erkennbaren Gesichter im Vordergrund; Menschen nur als stilisierte Silhouetten von hinten/seitlich.
- **Format:** Querformat 16:9, ca. 1600×900 px, PNG. (Ausnahme: Avatare, siehe unten.)

Empfohlener Prompt-Vorspann (Englisch, vor jeden Einzelprompt setzen):

```
Flat vector travel-poster illustration, modern editorial style, deep night-blue palette (#0e1a2f, #24406f) with warm yellow (#ffcf4d) and sky-blue (#4dc9ff) accents, soft gradients, subtle grain, clean silhouettes, atmospheric evening light, no text, no letters, no logos, 16:9 —
```

---

## A) Szenen-Bilder (assets/img/, 1600×900, 16:9)

| Nr. | Datei | Einsatzort im Spiel | Einzelprompt (nach dem Vorspann) |
|----|----|----|----|
| 1 | `assets/img/hero-zugreise.png` | Startbildschirm | A sleek modern train (ICE-like, no logos) departing from a platform at dusk, a small diverse group of teenagers with backpacks seen from behind, warm lights, sense of adventure and departure across Germany |
| 2 | `assets/img/lobby-bahnhof.png` | Lobby / Team-Anmeldung | Interior of a grand German railway station hall at evening, glass-and-steel arches, glowing departure area, empty platform waiting for travelers, warm yellow lights against blue dusk |
| 3 | `assets/img/station-hamburg.png` | Station 1: Hamburg – soziale Ungleichheit | Hamburg harbor skyline at dusk: Elbphilharmonie silhouette, container cranes, on one side elegant waterfront apartments and on the other side modest old residential blocks, subtle visual contrast between wealthy and poor districts |
| 4 | `assets/img/station-essen.png` | Station 2: Essen – sozialer Wandel | Ruhr area structural change: silhouette of the Zollverein coal mine winding tower as industrial monument, in front of it modern office buildings, a university campus and green park space, old industry fading into a modern service economy |
| 5 | `assets/img/station-heidelberg.png` | Station 3: Heidelberg – Modelle & Theorien | Heidelberg old town at dusk: castle on the hill, old bridge over the Neckar river, historic university buildings with warmly lit windows, scholarly atmosphere, stacks-of-books motif subtly echoed in the skyline |
| 6 | `assets/img/station-berlin.png` | Station 4: Berlin – Sozialstaat | Berlin government district at dusk: Reichstag dome and modern parliament buildings along the Spree river, warm light in the windows, calm and stately, sense of public institutions at work |
| 7 | `assets/img/station-frankfurt.png` | Station 5: Frankfurt – Wirtschafts-Bonus | Frankfurt skyline at dusk: banking towers and the European Central Bank building, subtle upward line motifs in the sky suggesting economic cycles (abstract curves, no text or numbers) |
| 8 | `assets/img/station-zugspitze.png` | Finale (Risiko-Einsatz) | Zugspitze mountain summit above the clouds at golden hour, cable car approaching, summit cross silhouette, dramatic but hopeful, feeling of a final challenge |
| 9 | `assets/img/siegerehrung.png` | Siegerehrung / Podium | Celebration on a mountain summit at dusk: confetti in yellow and sky-blue, a glowing trophy on a small podium, fireworks in the night-blue sky, triumphant travel-poster mood |

## B) Team-Avatare (assets/avatars/, 800×800, quadratisch 1:1)

Avatare werden im Spiel **kreisrund beschnitten** → Motiv mittig zentrieren, Kopf/Brust-Porträt, rundum etwas Rand lassen. Alle 8 im **identischen Stil**: freundliche, leicht verschmitzte Tier-Charaktere als Bahnreisende – **cool und plakativ, nicht niedlich-kindlich**. Einfarbig dunkler Hintergrund (#16274a) oder dezenter Verlauf.

Prompt-Vorspann für alle Avatare:

```
Flat vector character portrait, bust view, centered for circular crop, confident and slightly mischievous expression, travel-poster style, deep night-blue background (#16274a), warm yellow and sky-blue accents, no text, 1:1 —
```

| Nr. | Datei | Charakter | Einzelprompt (nach dem Vorspann) |
|----|----|----|----|
| 10 | `assets/avatars/avatar-moewe.png` | Möwe Mia (Hamburg) | A seagull wearing a captain's hat and a yellow scarf |
| 11 | `assets/avatars/avatar-baer.png` | Bär Bruno (Berlin) | A city bear wearing round glasses and a messenger bag strap |
| 12 | `assets/avatars/avatar-steinbock.png` | Steinbock Sepp (Alpen) | An alpine ibex with impressive horns wearing a hiking backpack strap and a small alpine hat |
| 13 | `assets/avatars/avatar-fuchs.png` | Füchsin Frida | A clever fox with a train conductor's cap and a ticket tucked into the hat band (ticket without text) |
| 14 | `assets/avatars/avatar-igel.png` | Igel Ingo | A hedgehog wearing oversized headphones around the neck |
| 15 | `assets/avatars/avatar-hoernchen.png` | Hörnchen Hazel | A red squirrel holding a tiny vintage camera on a strap |
| 16 | `assets/avatars/avatar-taube.png` | Taube Toni (Ruhrpott) | A racing pigeon with a flat cap (Schiebermütze) and a determined look |
| 17 | `assets/avatars/avatar-dackel.png` | Dackel Waldi (München) | A dachshund with a loosely tied blue-and-white bandana |

## Abnahme-Checkliste (nach dem Generieren)

- [ ] Alle 17 Dateien exakt unter den oben genannten Pfaden gespeichert (Kleinschreibung beachten)?
- [ ] Kein Text/keine Buchstaben in den Bildern?
- [ ] Farbwelt konsistent (Nachtblau + Gelb/Himmelblau)?
- [ ] Avatare mittig, funktionieren im Kreisbeschnitt?
- [ ] PNG, Szenen ca. 1600×900, Avatare ca. 800×800, je Datei < 500 KB (ggf. komprimieren, z. B. squoosh.app)?
- [ ] Spiel öffnen und prüfen: Platzhalter verschwinden automatisch, sobald die Dateien liegen.
