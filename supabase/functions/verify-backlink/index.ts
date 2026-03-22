import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { domain } = await req.json();
    if (!domain) {
      return new Response(JSON.stringify({ verified: false, reason: 'No domain provided' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Normalize domain
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const url = `https://${cleanDomain}`;

    const res = await fetch(url, {
      headers: { 'User-Agent': 'ASADS-BacklinkVerifier/1.0' },
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ verified: false, reason: `Site returned ${res.status}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const html = await res.text();

    // Find all anchor tags containing asads.ca
    // Must be a do-follow link (not rel="nofollow", rel="ugc", or rel="sponsored")
    const anchorRegex = /<a\s[^>]*href=["'][^"']*asads\.ca[^"']*["'][^>]*>/gi;
    const matches = html.match(anchorRegex) ?? [];

    const hasDoFollow = matches.some(tag => {
      const relMatch = tag.match(/rel=["']([^"']*)["']/i);
      if (!relMatch) return true; // No rel = do-follow
      const relValues = relMatch[1].split(/\s+/);
      const badRels = ['nofollow', 'ugc', 'sponsored'];
      return !relValues.some(v => badRels.includes(v.toLowerCase()));
    });

    return new Response(JSON.stringify({ verified: hasDoFollow, matches: matches.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ verified: false, reason: String(err) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
