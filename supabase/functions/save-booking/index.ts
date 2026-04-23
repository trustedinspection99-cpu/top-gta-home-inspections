import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const FORMSPREE_URL = 'https://formspree.io/f/mnjnzzoz';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey',
};

function parseScheduledAt(date: string, time: string): string | null {
  if (!date || date === 'Flexible') return null;
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    if (time && time !== 'Any time') {
      const [timePart, ampm] = time.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      d.setHours(hours, minutes, 0, 0);
    }
    return d.toISOString();
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const body = await req.json();
    const { service, name, phone, email, city, address, preferred_date, preferred_time, property_type, notes } = body;

    if (!name || !phone || !service) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const scheduled_at = parseScheduledAt(preferred_date ?? '', preferred_time ?? '');

    // Save to Supabase
    const { data: job, error: dbError } = await supabase.from('jobs').insert({
      homeowner_id: null,
      client_name: name,
      client_email: email || '',
      client_phone: phone || null,
      address: address || 'TBD',
      city: city || '',
      inspection_type: service,
      status: 'scheduled',
      scheduled_at,
    }).select('id').single();

    if (dbError) console.error('DB error:', dbError.message);

    // Push notification to Haroon
    const { data: users } = await supabase
      .from('users').select('push_token').not('push_token', 'is', null);
    if (users?.length) {
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: users.map((u: any) => u.push_token),
          title: 'New Booking — ' + service,
          body: name + ' · ' + (city || 'Ontario') + ' · ' + (preferred_date || 'Flexible'),
          sound: 'default',
        }),
      }).catch(() => {});
    }

    // Build .ics calendar invite for Haroon's email
    const icsAttachment = scheduled_at ? (() => {
      const start = new Date(scheduled_at);
      const end = new Date(start.getTime() + 2.5 * 60 * 60 * 1000);
      const fmt = (d: Date) => d.toISOString().slice(0, 19).replace(/-/g, '').replace(/:/g, '') + 'Z';
      const uid = (job?.id ?? Date.now()) + '@asads.ca';
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//ASADS Home Inspection//Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:' + uid,
        'DTSTART:' + fmt(start),
        'DTEND:' + fmt(end),
        'SUMMARY:' + service + ' - ' + (address || city || 'TBD'),
        'LOCATION:' + (address || '') + ' ' + (city || ''),
        'DESCRIPTION:Client: ' + name + ' | Phone: ' + (phone || '') + ' | Email: ' + (email || ''),
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n');
      return btoa(ics);
    })() : null;

    // Email to Haroon
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'bookings@asads.ca',
        to: 'haroon4951@hotmail.com',
        subject: 'New Booking: ' + name + ' — ' + service,
        html: `<p><strong>New website booking:</strong></p><ul>
<li>Name: ${name}</li>
<li>Phone: ${phone || '—'}</li>
<li>Email: ${email || '—'}</li>
<li>Service: ${service}</li>
<li>Address: ${address || '—'}</li>
<li>City: ${city || '—'}</li>
<li>Date: ${preferred_date || 'Flexible'}</li>
<li>Time: ${preferred_time || 'Any time'}</li>
<li>Property type: ${property_type || '—'}</li>
<li>Notes: ${notes || '—'}</li>
${job?.id ? '<li>Job ID: ' + job.id + '</li>' : ''}
</ul>`,
        ...(icsAttachment ? {
          attachments: [{ filename: 'inspection.ics', content: icsAttachment }],
        } : {}),
      }),
    }).catch(() => {});

    // Confirmation to client
    if (email) {
      const firstName = name.split(' ')[0];
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'bookings@asads.ca',
          to: email,
          subject: 'Your ASADS Inspection Is Confirmed — ' + service,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
<div style="background:#1d4ed8;padding:24px 32px;border-radius:12px 12px 0 0">
<p style="color:#fff;font-size:20px;font-weight:900;margin:0">ASADS Home Inspection</p>
</div>
<div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px">
<p>Hi ${firstName},</p>
<p>Your booking request has been received! Here is a summary:</p>
<ul>
<li><strong>Service:</strong> ${service}</li>
<li><strong>Date:</strong> ${preferred_date || 'Flexible'}</li>
<li><strong>Time:</strong> ${preferred_time || 'Any time'}</li>
${address ? '<li><strong>Address:</strong> ' + address + '</li>' : ''}
</ul>
<p>We will be in touch within 24 hours to confirm. For urgent bookings call <a href="tel:+16478019311">(647) 801-9311</a>.</p>
<p>— Haroon Choudhry<br>ASADS Home Inspection</p>
</div></div>`,
        }),
      }).catch(() => {});
    }

    // Formspree backup
    fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, jobId: job?.id ?? null }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
