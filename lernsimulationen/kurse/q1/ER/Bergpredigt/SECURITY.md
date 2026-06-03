# Sicherheit und Datenschutz

Die App speichert ausschließlich:

- `session_id`: zufällige Unterrichtsrunde
- `gruppen_id`: anonyme Gruppenkennung
- `sektor`, `status`, `event_type`, `created_at`: Spielfortschritt

Namen, E-Mail-Adressen und andere personenbezogene Daten sind nicht vorgesehen.

## Public-Anon-Key

Der Browser-Key bleibt auf `SELECT` und `INSERT` für `fortschritt` begrenzt. `UPDATE`
und `DELETE` werden nicht vergeben. Das Modell ist append-only: Eine neue Runde
erzeugt eine neue `session_id`.

## Grenze einer statischen App

Der PIN in `supabase-config.js` blendet die Lehrkraft-Oberfläche im Unterricht aus,
ist aber kein serverseitiges Geheimnis. Bei einer frei zugänglichen Veröffentlichung
sollten Lehrkraft-Aktionen und Tablet-Einträge über Supabase Edge Functions laufen:

Die vorbereitete Function liegt in `supabase/functions/progress/index.ts`. Für den
Produktionsbetrieb:

1. `TEACHER_PIN` als Supabase-Secret setzen, nicht nur in der Browser-Konfiguration.
2. Die Function deployen und ihre URL als `EDGE_FUNCTION_URL` in `supabase-config.js` eintragen.
3. Optional Turnstile oder ein vergleichbares Captcha vor öffentliche Schreibzugriffe setzen.
4. Nach erfolgreichem Test direktes `INSERT` entziehen: `revoke insert on table public.fortschritt from anon;`

Die enthaltene SQL-Datei erfüllt den gewünschten einfachen Klassenraum-Betrieb mit
`SELECT` und `INSERT`. Die Edge Function ist die empfohlene Härtung für öffentlich
beworbene Internet-Adressen.
