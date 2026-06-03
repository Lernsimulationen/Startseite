# Bergpredigt-Expedition interaktiv einrichten

## Was synchronisiert wird

Die Tafelansicht und die Gruppen-Tablets öffnen dieselbe Unterrichtsrunde über eine
zufällige `session_id`. Eine Gruppe löst an jedem Ort drei Aufgaben. Erst nach dem
gesamten Stationsblock fügt das Tablet einen anonymen Datensatz in `fortschritt`
ein. Supabase sendet dieses `INSERT`-Ereignis per Realtime an die Tafel. Dort
leuchtet das Medaillon auf, die Route zeichnet sich weiter und die Jesus-Figur
wandert zur nächsten Station.

Gespeichert werden ausschließlich:

- `session_id`: zufällige Unterrichtsrunde
- `gruppen_id`: anonyme Gruppenkennung wie `gruppe-3`
- `sektor`, `status`, `event_type`, `created_at`: Spielfortschritt

Gruppennotizen aus offenen Aufgaben werden weder gespeichert noch übertragen.

## 1. Supabase-Projekt vorbereiten

1. Ein Supabase-Projekt anlegen.
2. In Supabase den **SQL Editor** öffnen.
3. Den vollständigen Inhalt aus `supabase-setup.sql` ausführen.
4. Unter **Database > Replication** prüfen, ob `fortschritt` für Realtime aktiviert ist.
   Falls nicht, im SQL Editor einmal ausführen:

   ```sql
   alter publication supabase_realtime add table public.fortschritt;
   ```

## 2. Browser-Key eintragen

In `supabase-config.js` genau diese beiden Werte eintragen:

```js
SUPABASE_URL: "https://DEIN-PROJEKT.supabase.co",
SUPABASE_ANON_KEY: "DEIN-PUBLIC-ANON-KEY",
```

Der Public-Anon-Key darf im Browser sichtbar sein. Die SQL-Regeln begrenzen ihn
im einfachen Klassenraum-Modus auf `SELECT` und `INSERT`.

## 3. App bereitstellen

Die Dateien müssen über HTTP oder HTTPS erreichbar sein. Ein direktes Öffnen per
`file:///` reicht für Service Worker und Tablet-Zugriffe nicht aus.

Für einen Test im Schul-WLAN kann im Ordner `Bergpredigt` beispielsweise ein
lokaler Server gestartet werden:

```powershell
python -m http.server 8080 --bind 0.0.0.0
```

Dann die IP-Adresse des Tafelrechners verwenden, zum Beispiel:

```text
http://192.168.1.42:8080/lehrkraft.html
```

Für den regulären Einsatz ist HTTPS-Hosting empfehlenswert, beispielsweise über
die bestehende Schulwebseite oder einen statischen Webhost.

## 4. Unterrichtsrunde starten

1. Auf dem Lehrkraftgerät `lehrkraft.html` öffnen.
2. PIN eingeben. Der Standardwert steht in `supabase-config.js` und sollte geändert werden.
3. **Neue Sitzung starten** anklicken.
4. **Tafel öffnen** auf dem Beamer oder Smartboard anzeigen.
5. Den QR-Code aus dem Lehrkraft-Dashboard von den Gruppen scannen lassen.
6. Jede Gruppe trägt nur eine anonyme Kennung wie `gruppe-1` ein.

Der QR-Code enthält die passende URL:

```text
tablet.html?session=kurs-...
```

Dadurch landen Tafel und Tablets automatisch in derselben Runde.

## 5. Live-Ablauf prüfen

1. Auf einem Tablet die drei Aufgaben der ersten Station lösen.
2. Nach der dritten Aufgabe **Weiterreisen** anklicken.
3. Auf der Tafel muss Nazareth farbig aufleuchten.
4. Die Route wird weiter eingezeichnet und die Jesus-Figur wandert nach Nazareth.
5. Im Lehrkraft-Dashboard erscheint für die Gruppe `1 / 5`.

Wenn das nicht passiert:

- Prüfen, ob Tafel und Tablet dieselbe `session_id` in der URL haben.
- Prüfen, ob `supabase-config.js` URL und Anon-Key enthält.
- Prüfen, ob `fortschritt` in Supabase Realtime aktiviert ist.
- Browser-Konsole auf Netzwerk- oder RLS-Fehler prüfen.

## 6. Öffentliche Bereitstellung härten

Für eine frei erreichbare Internet-Adresse zusätzlich die vorbereitete Edge Function
in `supabase/functions/progress/index.ts` deployen:

1. `TEACHER_PIN` als Supabase-Secret setzen.
2. Edge Function `progress` deployen.
3. Die Function-URL in `supabase-config.js` als `EDGE_FUNCTION_URL` eintragen.
4. Nach erfolgreichem Test den direkten anonymen Schreibzugriff entziehen:

   ```sql
   revoke insert on table public.fortschritt from anon;
   ```

Die Edge Function begrenzt Schreibzugriffe pro IP und Sitzung und schützt
Lehrkraft-Ereignisse serverseitig. Weitere Hinweise stehen in `SECURITY.md`.
