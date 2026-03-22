import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS_ORIGIN = "Access-Control-Allow-Origin";
const CORS_HEADERS = "Access-Control-Allow-Headers";
const ALLOWED_HEADERS = ["authorization", "x-client-info", "apikey", "content-type"].join(", ");

serve(async (req) => {
  const headers = new Headers();
  headers.set(CORS_ORIGIN, "*");
  headers.set(CORS_HEADERS, ALLOWED_HEADERS);
  headers.set("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    const body = await req.json();
    const domain = (body.domain || "").replace(/^https?:\/\//, "").replace(/\/$/, "");

    if (!domain) {
      return new Response(JSON.stringify({ verified: false }), { headers, status: 400 });
    }

    const res = await fetch("https://" + domain, { redirect: "follow" });
    const html = await res.text();
    const tags = html.match(/<a [^>]*asads\.ca[^>]*>/gi) || [];

    const ok = tags.some(function(tag) {
      const rel = tag.match(/rel="([^"]*)"/i);
      if (!rel) return true;
      const bad = ["nofollow", "ugc", "sponsored"];
      return !rel[1].split(" ").some(function(v) { return bad.indexOf(v) > -1; });
    });

    return new Response(JSON.stringify({ verified: ok }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ verified: false, error: String(e) }), { headers });
  }
});
