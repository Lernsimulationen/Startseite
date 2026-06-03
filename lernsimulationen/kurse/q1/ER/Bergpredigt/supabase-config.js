/*
  SUPABASE-KONFIGURATION:
  1. Trage zwischen den Anführungszeichen bei SUPABASE_URL deine Project URL ein.
  2. Trage zwischen den Anführungszeichen bei SUPABASE_ANON_KEY deinen Public-Anon-Key ein.
  Der Public-Anon-Key darf im Browser sichtbar sein. Die Rechte werden durch die
  RLS-Regeln aus supabase-setup.sql auf SELECT und INSERT begrenzt.
*/
window.BERG_CONFIG = {
  SUPABASE_URL: "https://qkumrcqsaafsepijqkau.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_5oLOQk9RXYcw5wYssXf0ag_Eml1fk21",
  /*
    Optional für eine öffentliche Bereitstellung:
    URL der deployten Edge Function, zum Beispiel
    "https://DEIN-PROJEKT.supabase.co/functions/v1/progress".
    Leer lassen für den einfachen Klassenraum-Modus mit direktem INSERT.
  */
  EDGE_FUNCTION_URL: "",
  /*
    Komfort-PIN für den Lehrkraft-Modus. Da diese App statisch ausgeliefert wird,
    ist der Wert kein serverseitiges Geheimnis. Für eine öffentliche Bereitstellung
    bitte zusätzlich die Hinweise in SECURITY.md umsetzen.
  */
  TEACHER_PIN: "2468"
};
