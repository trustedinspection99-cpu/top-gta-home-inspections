import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS_ORIGIN = "Access-Control-Allow-Origin";
const CORS_HEADERS = "Access-Control-Allow-Headers";
const ALLOWED_HEADERS = ["authorization", "x-client-info", "apikey", "content-type"].join(", ");

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

    if (!domain) {
      return new Response(JSON.stringify({ verified: false, error: "No domain provided" }), { headers, status: 400 });
    }

    // Try each page path until we find the backlink
    for (const path of PAGES_TO_CHECK) {
      const url = `https://${domain}${path}`;
      const html = await fetchPage(url);
      if (html && hasValidBacklink(html)) {
        return new Response(JSON.stringify({ verified: true, foundOn: url }), { headers });
      }
    }

    // Also try http:// fallback for homepage
    const httpHtml = await fetchPage(`http://${domain}`);
    if (httpHtml && hasValidBacklink(httpHtml)) {
      return new Response(JSON.stringify({ verified: true, foundOn: `http://${domain}` }), { headers });
    }

    return new Response(JSON.stringify({ verified: false }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ verified: false, error: String(e) }), { headers });
  }
});
