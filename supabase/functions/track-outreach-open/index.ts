import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

// 1×1 transparent PNG
const PIXEL = new Uint8Array([
  137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,6,0,0,0,
  31,21,196,137,0,0,0,11,73,68,65,84,8,153,99,248,15,0,0,1,1,0,5,24,220,72,
  0,0,0,0,73,69,78,68,174,66,96,130,
]);

serve(async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (id) {
    (async () => {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

        // Fetch the outreach row
        const { data: row } = await supabase
          .from('realtor_outreach')
          .select('name, email, opened_at')
          .eq('id', id)
          .maybeSingle();

        // Only record first open
        if (row && !row.opened_at) {
          await supabase
            .from('realtor_outreach')
            .update({ opened_at: new Date().toISOString() })
            .eq('id', id);

          // Push notification to all inspectors
          const { data: users } = await supabase
            .from('users')
            .select('push_token')
            .not('push_token', 'is', null);

          if (users?.length) {
            await fetch('https://exp.host/--/api/v2/push/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify({
                to: users.map((u: any) => u.push_token),
                title: '📬 Realtor Opened Your Email',
                body: `${row.name} (${row.email}) just opened your outreach email`,
                data: { outreachId: id },
                sound: 'default',
              }),
            });
          }
        }
      } catch { /* non-critical */ }
    })();
  }

  return new Response(PIXEL, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    },
  });
});
