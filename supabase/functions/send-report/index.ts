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
    const { reportId, jobId, clientEmail, clientName, address } = await req.json();

    // Service role client — needed to send magic links and update records
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Mark report as sent
    await supabase
      .from('reports')
      .update({ status: 'sent', sent_at: new Date().toISOString() })
      .eq('id', reportId);

    // Send a magic-link sign-in email to the client.
    // shouldCreateUser: true → creates homeowner account if one doesn't exist yet.
    const { error: otpErr } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: clientEmail,
      options: {
        data: { name: clientName, role: 'homeowner' },
        redirectTo: 'https://www.asads.ca/dashboard',
      },
    });

    // If user doesn't exist yet, invite them
    if (otpErr) {
      await supabase.auth.admin.inviteUserByEmail(clientEmail, {
        data: { name: clientName, role: 'homeowner' },
        redirectTo: 'https://www.asads.ca/dashboard',
      });
    }

    // Link job to homeowner_id if user now exists
    const { data: authUser } = await supabase.auth.admin.listUsers();
    const match = authUser?.users?.find((u) => u.email === clientEmail);
    if (match) {
      // Insert user row if not already there
      await supabase.from('users').upsert({
        id: match.id,
        email: clientEmail,
        name: clientName,
        role: 'homeowner',
        phone: null,
      }, { onConflict: 'id', ignoreDuplicates: true });

      // Link job
      await supabase
        .from('jobs')
        .update({ homeowner_id: match.id })
        .eq('id', jobId)
        .is('homeowner_id', null);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { 'Content-Type': 'application/json', ...CORS },
      status: 500,
    });
  }
});
