// Cloudflare Pages Function: MOD One Priority List sign-ups.
// POST /api/modone-signup  -> saves a sign-up to the SIGNUPS KV namespace.
// GET  /api/modone-signup?key=YOUR_EXPORT_KEY -> downloads every sign-up as CSV.
//
// Setup (Cloudflare dashboard > Workers & Pages > your Pages project > Settings):
//   1. Bindings: add a KV namespace binding named SIGNUPS (create a namespace called modone-signups).
//   2. Variables and secrets: add a secret named EXPORT_KEY (any long random string).
//   3. Redeploy.

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export async function onRequestPost({ request, env }) {
  if (!env.SIGNUPS) return json({ ok: false, error: "storage not configured" }, 500);
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "bad request" }, 400); }

  const first_name = String(d.first_name || "").trim().slice(0, 60);
  const suburb = String(d.suburb || "").trim().slice(0, 60);
  let mobile = String(d.mobile || "").replace(/[^\d+]/g, "");
  if (!first_name || !suburb || !/^(\+?61|0)4\d{8}$/.test(mobile)) {
    return json({ ok: false, error: "invalid" }, 422);
  }
  mobile = mobile.replace(/^\+?61/, "0"); // store as 04xxxxxxxx

  const record = {
    first_name, mobile, suburb,
    source: String(d.source || "").slice(0, 40),
    submitted_at: new Date().toISOString(),
  };
  // Keyed by mobile, so signing up twice just updates the record.
  await env.SIGNUPS.put(`signup:${mobile}`, JSON.stringify(record));
  return json({ ok: true });
}

export async function onRequestGet({ request, env }) {
  const key = new URL(request.url).searchParams.get("key");
  if (!env.EXPORT_KEY || key !== env.EXPORT_KEY) return new Response("Not found", { status: 404 });
  if (!env.SIGNUPS) return new Response("Storage not configured", { status: 500 });

  const rows = [];
  let cursor;
  do {
    const page = await env.SIGNUPS.list({ prefix: "signup:", cursor });
    for (const k of page.keys) {
      const v = await env.SIGNUPS.get(k.name);
      if (v) rows.push(JSON.parse(v));
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  rows.sort((a, b) => a.submitted_at.localeCompare(b.submitted_at));
  const esc = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = ["first_name,mobile,suburb,source,submitted_at",
    ...rows.map(r => [r.first_name, r.mobile, r.suburb, r.source, r.submitted_at].map(esc).join(","))].join("\n");
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="modone-priority-list.csv"',
    },
  });
}
