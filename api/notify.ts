import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing API key' });

  const { type, ...data } = req.body;

  try {
    if (type === 'booking') {
      const { name, email, phone, service, address, preferred_date, preferred_time, property_type, sq_footage, notes } = data;

      // Admin notification
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'ASADS Home Inspection <no-reply@asads.ca>',
          to: 'haroon4951@hotmail.com',
          subject: `New Booking — ${service} | ${name}`,
          html: `
            <h2>New Booking Request</h2>
            <table style="border-collapse:collapse;width:100%;max-width:520px">
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Name</td><td style="padding:8px">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Email</td><td style="padding:8px">${email || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Phone</td><td style="padding:8px">${phone}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Service</td><td style="padding:8px">${service}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Address</td><td style="padding:8px">${address || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Preferred Date</td><td style="padding:8px">${preferred_date || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Preferred Time</td><td style="padding:8px">${preferred_time || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Property Type</td><td style="padding:8px">${property_type || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Sq. Footage</td><td style="padding:8px">${sq_footage || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Notes</td><td style="padding:8px">${notes || 'None'}</td></tr>
            </table>
          `,
        }),
      });

      // Customer confirmation (only if email provided)
      if (email) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'ASADS Home Inspection <no-reply@asads.ca>',
            to: email,
            subject: 'Your inspection booking was received — ASADS',
            html: `
              <h2>Hi ${name},</h2>
              <p>Thanks for booking with ASADS Home Inspection! We've received your request for a <strong>${service}</strong>.</p>
              <p>Your booking is <strong>confirmed</strong>. Should any scheduling changes be required, a member of our team will contact you within 24 hours.</p>
              <br/>
              <p style="color:#64748b;font-size:13px">— ASADS Home Inspection<br/>asads.ca · (647) 801-9311</p>
            `,
          }),
        });
      }
    }

    if (type === 'contact') {
      const { name, email, phone, service, message } = data;

      // Admin notification
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'ASADS Home Inspection <no-reply@asads.ca>',
          to: 'haroon4951@hotmail.com',
          subject: `New Contact Message — ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <table style="border-collapse:collapse;width:100%;max-width:520px">
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Name</td><td style="padding:8px">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Email</td><td style="padding:8px">${email}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Phone</td><td style="padding:8px">${phone || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Service</td><td style="padding:8px">${service || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Message</td><td style="padding:8px">${message}</td></tr>
            </table>
          `,
        }),
      });

      // Customer confirmation
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'ASADS Home Inspection <no-reply@asads.ca>',
          to: email,
          subject: "We received your message — ASADS Home Inspection",
          html: `
            <h2>Hi ${name},</h2>
            <p>Thanks for reaching out to ASADS Home Inspection. We've received your message and will get back to you within <strong>24 hours</strong>.</p>
            <p>For urgent matters, call us directly at <strong>(647) 801-9311</strong>.</p>
            <br/>
            <p style="color:#64748b;font-size:13px">— ASADS Home Inspection<br/>asads.ca · (647) 801-9311</p>
          `,
        }),
      });
    }

    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
