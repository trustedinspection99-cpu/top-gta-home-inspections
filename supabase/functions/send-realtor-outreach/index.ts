import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const FROM_EMAIL = 'bookings@asads.ca';
const ASADS_PHONE = '(647) 801-9311';
const SIGNUP_URL = 'https://www.asads.ca/signup/realtor';
const DIRECTORY_URL = 'https://www.asads.ca/trusted-realtors';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, city, agency, website, sample_report_url } = await req.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'name and email are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const cityLine = city ? ` in ${city}` : '';
    const agencyLine = agency ? ` at ${agency}` : '';
    const websiteLine = website ? `\nI also noticed your website at ${website} — it would be a great fit for a "Preferred Vendors" section.` : '';
    const sampleLine = sample_report_url
      ? `\n\nSample inspection report (so you can see what your clients receive):\n${sample_report_url}`
      : '';

    const subject = city
      ? `Free listing on ASADS — ${city} home inspector partnership`
      : `Free listing on ASADS — Trusted Realtors program`;

    const text = `Hi ${name},

I hope this finds you well. My name is Asad Amin, founder of ASADS Home Inspection — we're one of the top-ranked home inspection services across the GTA and Ontario.

I'm reaching out because I'd love to offer you a free, permanent profile on our Trusted Realtors directory at ${DIRECTORY_URL}.${websiteLine}

Here's what you get as an ASADS Trusted Partner:

• A profile page on asads.ca/trusted-realtors — your name, agency, cities served, and contact info
• A "Verified Partner" badge to embed on your website
• Priority scheduling for your clients
• Co-marketing exposure on a top-ranking inspection site${cityLine}
• A sample inspection report to share with buyers${sampleLine}

All we ask in return: one link to asads.ca from your website's Preferred Vendors or Resources page. That's it — no fees, no subscription, ever.

Getting listed takes 2 minutes:
${SIGNUP_URL}

Let me know if you have any questions — I'm happy to hop on a quick call.

Best,
Asad Amin
ASADS Home Inspection
${ASADS_PHONE}
https://www.asads.ca`;

    const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6">
  <div style="background:#1d4ed8;padding:24px 32px;border-radius:12px 12px 0 0">
    <p style="color:#fff;font-size:20px;font-weight:900;margin:0">ASADS Home Inspection</p>
    <p style="color:#93c5fd;font-size:13px;margin:4px 0 0">Ontario's Thorough Home Inspection Service</p>
  </div>
  <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px">
    <p>Hi ${name},</p>
    <p>My name is <strong>Asad Amin</strong>, founder of <strong>ASADS Home Inspection</strong> — one of the top-ranked home inspection services across the GTA and Ontario.</p>
    <p>I'm reaching out because I'd love to offer you a <strong>free, permanent profile</strong> on our <a href="${DIRECTORY_URL}" style="color:#1d4ed8">Trusted Realtors directory</a>.${websiteLine ? `<br><br>${websiteLine.trim()}` : ''}</p>

    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:20px 24px;margin:24px 0">
      <p style="font-weight:700;margin:0 0 12px;color:#1e3a8a">What you get as an ASADS Trusted Partner${cityLine}:</p>
      <ul style="margin:0;padding-left:20px;color:#374151">
        <li>A profile page on asads.ca/trusted-realtors — your name, agency, cities served, and contact info</li>
        <li>A "Verified Partner" badge to embed on your website</li>
        <li>Priority scheduling for your clients</li>
        <li>Co-marketing exposure on a top-ranking inspection site${cityLine}</li>
        <li>A sample inspection report to share with buyers</li>
      </ul>
    </div>

    <p><strong>All we ask:</strong> one link to asads.ca from your website's Preferred Vendors or Resources page. No fees, no subscription — ever.</p>

    ${sample_report_url ? `<p>Here's a <a href="${sample_report_url}" style="color:#1d4ed8">sample inspection report</a> so you can see exactly what your clients receive.</p>` : ''}

    <div style="text-align:center;margin:28px 0">
      <a href="${SIGNUP_URL}" style="background:#1d4ed8;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;display:inline-block">
        Get Listed Free — 2 Minutes →
      </a>
    </div>

    <p>Let me know if you have any questions — I'm happy to hop on a quick call.</p>
    <p style="margin-top:28px">
      Best,<br>
      <strong>Asad Amin</strong><br>
      ASADS Home Inspection<br>
      <a href="tel:+16478019311" style="color:#1d4ed8">${ASADS_PHONE}</a> · <a href="https://www.asads.ca" style="color:#1d4ed8">asads.ca</a>
    </p>
  </div>
</div>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Asad Amin — ASADS Home Inspection <${FROM_EMAIL}>`,
        to: [email],
        subject,
        text,
        html,
      }),
    });

    const resData = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: resData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: resData.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
