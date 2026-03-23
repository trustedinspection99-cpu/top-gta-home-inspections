import { createClient } from 'npm:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS });
  }

  try {
    const { reportId, jobId, clientEmail, clientName } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Mark report as sent
    await supabase
      .from('reports')
      .update({ status: 'sent', sent_at: new Date().toISOString() })
      .eq('id', reportId);

    // Check if user already exists
    const { data: authUser } = await supabase.auth.admin.listUsers();
    const existing = authUser?.users?.find((u) => u.email === clientEmail);

    let magicLink: string | null = null;

    if (existing) {
      // Existing user — generate a magic link (does NOT auto-send email, we return it to admin)
      const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email: clientEmail,
        options: {
          redirectTo: 'https://www.asads.ca/dashboard',
        },
      });
      if (!linkErr && linkData?.properties?.action_link) {
        magicLink = linkData.properties.action_link;
      }
    } else {
      // New user — invite sends an email automatically AND creates the account
      const { data: inviteData, error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(clientEmail, {
        data: { name: clientName, role: 'homeowner' },
        redirectTo: 'https://www.asads.ca/dashboard',
      });
      if (!inviteErr && inviteData?.user) {
        // Generate a separate magic link to show admin as backup
        const { data: linkData } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: clientEmail,
          options: { redirectTo: 'https://www.asads.ca/dashboard' },
        });
        magicLink = linkData?.properties?.action_link ?? null;
      }
    }

    // Upsert user row and link job
    const match = (await supabase.auth.admin.listUsers()).data?.users?.find((u) => u.email === clientEmail);
    if (match) {
      await supabase.from('users').upsert({
        id: match.id,
        email: clientEmail,
        name: clientName,
        role: 'homeowner',
        phone: null,
      }, { onConflict: 'id', ignoreDuplicates: true });

      await supabase
        .from('jobs')
        .update({ homeowner_id: match.id })
        .eq('id', jobId)
        .is('homeowner_id', null);
    }

    return new Response(JSON.stringify({ success: true, magicLink }), {
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { 'Content-Type': 'application/json', ...CORS },
      status: 500,
    });
  }
});
