// Supabase Edge Function: check-rankings
// Deploy: supabase functions deploy check-rankings
// Requires Supabase secret: SERP_API_KEY
// Called by: admin dashboard "Refresh Now" button + optional daily pg_cron

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SERP_API_KEY = Deno.env.get('SERP_API_KEY')!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const KEYWORDS = [
  // Toronto — all services
  { keyword: 'home inspection toronto', city: 'Toronto', service: 'general' },
  { keyword: 'home inspector toronto', city: 'Toronto', service: 'general' },
  { keyword: 'same day home inspection toronto', city: 'Toronto', service: 'general' },
  { keyword: 'pre-purchase home inspection toronto', city: 'Toronto', service: 'pre-purchase' },
  { keyword: 'pre-listing home inspection toronto', city: 'Toronto', service: 'pre-listing' },
  { keyword: 'condo inspection toronto', city: 'Toronto', service: 'condo' },
  { keyword: 'new construction home inspection toronto', city: 'Toronto', service: 'new-construction' },
  { keyword: 'mold inspection toronto', city: 'Toronto', service: 'mold-inspection' },
  { keyword: 'radon testing toronto', city: 'Toronto', service: 'radon' },
  { keyword: 'sewer scope inspection toronto', city: 'Toronto', service: 'sewer-scope' },
  { keyword: 'thermal imaging home inspection toronto', city: 'Toronto', service: 'thermal-imaging' },
  { keyword: 'WETT inspection toronto', city: 'Toronto', service: 'wett' },
  { keyword: 'lead paint inspection toronto', city: 'Toronto', service: 'lead-paint' },
  { keyword: 'air quality testing toronto', city: 'Toronto', service: 'air-quality' },
  { keyword: 'PDI inspection toronto', city: 'Toronto', service: 'pdi' },
  { keyword: 'aluminum wiring inspection toronto', city: 'Toronto', service: 'general' },
  // Ontario-wide
  { keyword: 'home inspection ontario', city: 'Ontario', service: 'general' },
  { keyword: 'home inspector ontario', city: 'Ontario', service: 'general' },
  { keyword: 'house inspection ontario', city: 'Ontario', service: 'general' },
  { keyword: 'pre-purchase home inspection ontario', city: 'Ontario', service: 'pre-purchase' },
  { keyword: 'home inspection cost ontario', city: 'Ontario', service: 'pricing' },
  { keyword: 'mold inspection ontario', city: 'Ontario', service: 'mold-inspection' },
  // Key cities
  { keyword: 'home inspection markham', city: 'Markham', service: 'general' },
  { keyword: 'home inspection mississauga', city: 'Mississauga', service: 'general' },
  { keyword: 'home inspection hamilton', city: 'Hamilton', service: 'general' },
  { keyword: 'home inspection kitchener', city: 'Kitchener', service: 'general' },
  { keyword: 'home inspection waterloo', city: 'Waterloo', service: 'general' },
  { keyword: 'home inspection brampton', city: 'Brampton', service: 'general' },
  { keyword: 'home inspection vaughan', city: 'Vaughan', service: 'general' },
  { keyword: 'home inspection north york', city: 'North York', service: 'general' },
  { keyword: 'home inspection scarborough', city: 'Scarborough', service: 'general' },
  { keyword: 'home inspection etobicoke', city: 'Etobicoke', service: 'general' },
  { keyword: 'home inspection cambridge', city: 'Cambridge', service: 'general' },
  { keyword: 'home inspection oakville', city: 'Oakville', service: 'general' },
  { keyword: 'home inspection burlington', city: 'Burlington', service: 'general' },
  { keyword: 'home inspection ajax', city: 'Ajax', service: 'general' },
  { keyword: 'home inspection whitby', city: 'Whitby', service: 'general' },
  { keyword: 'home inspection oshawa', city: 'Oshawa', service: 'general' },
  { keyword: 'home inspection barrie', city: 'Barrie', service: 'general' },
  // Service × city combos
  { keyword: 'mold inspection north york', city: 'North York', service: 'mold-inspection' },
  { keyword: 'mold inspection scarborough', city: 'Scarborough', service: 'mold-inspection' },
  { keyword: 'mold inspection mississauga', city: 'Mississauga', service: 'mold-inspection' },
  { keyword: 'condo inspection north york', city: 'North York', service: 'condo' },
  { keyword: 'condo inspection mississauga', city: 'Mississauga', service: 'condo' },
  { keyword: 'pre-purchase inspection markham', city: 'Markham', service: 'pre-purchase' },
  { keyword: 'pre-purchase inspection mississauga', city: 'Mississauga', service: 'pre-purchase' },
  { keyword: 'commercial inspection toronto', city: 'Toronto', service: 'commercial' },
  { keyword: 'home inspection richmond hill', city: 'Richmond Hill', service: 'general' },
  { keyword: 'home inspection newmarket', city: 'Newmarket', service: 'general' },
];

async function checkKeyword(keyword: string): Promise<{ position: number | null; url: string | null }> {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&location=Ontario,Canada&gl=ca&hl=en&num=20&api_key=${SERP_API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const results: any[] = data.organic_results ?? [];
    for (let i = 0; i < results.length; i++) {
      const link: string = results[i].link ?? '';
      if (link.includes('asads.ca')) {
        return { position: i + 1, url: link };
      }
    }
    return { position: null, url: null };
  } catch {
    return { position: null, url: null };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, content-type' } });
  }

  const checkedAt = new Date().toISOString();
  const results = [];

  for (const kw of KEYWORDS) {
    // Get previous position for this keyword
    const { data: prev } = await supabase
      .from('rank_tracking')
      .select('position')
      .eq('keyword', kw.keyword)
      .order('checked_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const { position, url } = await checkKeyword(kw.keyword);

    results.push({
      checked_at: checkedAt,
      keyword: kw.keyword,
      city: kw.city,
      service: kw.service,
      position,
      url_ranked: url,
      previous_position: prev?.position ?? null,
    });

    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 300));
  }

  const { error } = await supabase.from('rank_tracking').insert(results);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  return new Response(JSON.stringify({ success: true, checked: results.length, at: checkedAt }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
});
