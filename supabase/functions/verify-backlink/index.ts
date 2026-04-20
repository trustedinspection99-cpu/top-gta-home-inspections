import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_ORIGIN = "Access-Control-Allow-Origin";
const CORS_HEADERS = "Access-Control-Allow-Headers";
const ALLOWED_HEADERS = ["authorization", "x-client-info", "apikey", "content-type"].join(", ");

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const TARGET = "asads.ca";
const PAGES_TO_CHECK = ["", "/about", "/contact", "/links", "/resources", "/partners", "/footer"];

async function fetchPage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BacklinkVerifier/1.0)" },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function hasValidBacklink(html: string): boolean {
  const tags = html.match(/<a [^>]*asads\.ca[^>]*>/gi) || [];
  return tags.some((tag) => {
    const rel = tag.match(/rel="([^"]*)"/i);
    if (!rel) return true;
    const bad = ["nofollow", "ugc", "sponsored"];
    return !rel[1].split(/\s+/).some((v) => bad.includes(v));
  });
}

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
    const realtorName: string = body.realtorName || "A realtor";

    if (!domain) {
      return new Response(JSON.stringify({ verified: false, error: "No domain provided" }), { headers, status: 400 });
    }

    // Try each page path until we find the backlink
    let foundOn: string | null = null;
    for (const path of PAGES_TO_CHECK) {
      const url = `https://${domain}${path}`;
      const html = await fetchPage(url);
      if (html && hasValidBacklink(html)) { foundOn = url; break; }
    }

    // Also try http:// fallback for homepage
    if (!foundOn) {
      const httpHtml = await fetchPage(`http://${domain}`);
      if (httpHtml && hasValidBacklink(httpHtml)) foundOn = `http://${domain}`;
    }

    if (!foundOn) {
      return new Response(JSON.stringify({ verified: false }), { headers });
    }

    // Send push notification to Haroon
    (async () => {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
        const { data: users } = await supabase
          .from("users").select("push_token").not("push_token", "is", null);
        if (users?.length) {
          await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              to: users.map((u: any) => u.push_token),
              title: "🔗 Backlink Verified — Approve Realtor",
              body: `${realtorName} (${domain}) added the link. Go to Admin → Realtors to approve their listing.`,
              sound: "default",
            }),
          });
        }
      } catch { /* non-critical */ }
    })();

    return new Response(JSON.stringify({ verified: true, foundOn }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ verified: false, error: String(e) }), { headers });
  }
});
