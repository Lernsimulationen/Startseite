import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "apikey, authorization, content-type, x-teacher-pin",
};
const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "content-type": "application/json" } });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "POST") return reply({ error: "method_not_allowed" }, 405);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const payload = await request.json().catch(() => null);
  const valid = payload
    && /^[a-z0-9-]{6,32}$/.test(payload.session_id)
    && /^[a-z0-9_-]{2,24}$/.test(payload.gruppen_id)
    && ["kapernaum", "berg", "see", "nazareth", "tiberias", "finale", "control"].includes(payload.sektor)
    && payload.status === "erledigt"
    && ["solved", "manual", "finale", "lock", "unlock", "groups", "phase", "prompt"].includes(payload.event_type)
    && (payload.payload == null || (typeof payload.payload === "string" && payload.payload.length <= 420));
  if (!valid) return reply({ error: "invalid_payload" }, 400);

  const teacherEvent = payload.event_type !== "solved" || payload.sektor === "finale" || payload.sektor === "control";
  if (teacherEvent && request.headers.get("x-teacher-pin") !== Deno.env.get("TEACHER_PIN")) {
    return reply({ error: "teacher_auth_required" }, 403);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const clientKey = `${ip}:${payload.session_id}`;
  const since = new Date(Date.now() - 60_000).toISOString();
  const { count } = await supabase
    .from("fortschritt_rate_limit")
    .select("id", { count: "exact", head: true })
    .eq("client_key", clientKey)
    .gte("created_at", since);
  if ((count || 0) >= 30) return reply({ error: "rate_limit" }, 429);
  await supabase.from("fortschritt_rate_limit").insert({ client_key: clientKey });
  await supabase.from("fortschritt_rate_limit").delete().lt("created_at", new Date(Date.now() - 86_400_000).toISOString());

  const { error } = await supabase.from("fortschritt").insert(payload);
  if (error) return reply({ error: error.code === "23505" ? "already_completed" : "insert_failed" }, error.code === "23505" ? 200 : 500);
  return reply({ ok: true });
});
