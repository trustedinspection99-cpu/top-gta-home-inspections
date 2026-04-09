import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

async function sendEmail(apiKey: string, to: string, subject: string, html: string) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'ASADS Home Inspection <no-reply@asads.ca>', to, subject, html }),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing API key' });

  const { type, ...data } = req.body;

  try {
    if (type === 'booking') {
      const { name, email, phone, service, address, preferred_date, preferred_time, property_type, sq_footage, notes } = data;

      await sendEmail(apiKey, 'haroon4951@hotmail.com', `New Booking — ${service} | ${name}`, `
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
      `);

      if (email) {
        await sendEmail(apiKey, email, 'Your inspection booking was received — ASADS', `
          <h2>Hi ${name},</h2>
          <p>Thanks for booking with ASADS Home Inspection! Your appointment is <strong>confirmed</strong>. Should any scheduling changes be required, a member of our team will contact you within 24 hours.</p>
          <table style="border-collapse:collapse;width:100%;max-width:520px;margin:16px 0;border:1px solid #e2e8f0">
            <tr><td style="padding:10px 14px;font-weight:bold;background:#f8fafc;color:#475569;width:40%">Service</td><td style="padding:10px 14px;color:#0f172a">${service}</td></tr>
            ${address ? `<tr><td style="padding:10px 14px;font-weight:bold;background:#f8fafc;color:#475569">Address</td><td style="padding:10px 14px;color:#0f172a">${address}</td></tr>` : ''}
            ${preferred_date ? `<tr><td style="padding:10px 14px;font-weight:bold;background:#f8fafc;color:#475569">Date</td><td style="padding:10px 14px;color:#0f172a">${preferred_date}</td></tr>` : ''}
            ${preferred_time ? `<tr><td style="padding:10px 14px;font-weight:bold;background:#f8fafc;color:#475569">Time</td><td style="padding:10px 14px;color:#0f172a">${preferred_time}</td></tr>` : ''}
          </table>
          <br/>
          <p style="color:#64748b;font-size:13px">— ASADS Home Inspection<br/>asads.ca · (647) 801-9311</p>
        `);
      }
    }

    if (type === 'contact') {
      const { name, email, phone, service, message } = data;

      await sendEmail(apiKey, 'haroon4951@hotmail.com', `New Contact Message — ${name}`, `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:520px">
          <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Phone</td><td style="padding:8px">${phone || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Service</td><td style="padding:8px">${service || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Message</td><td style="padding:8px">${message}</td></tr>
        </table>
      `);

      await sendEmail(apiKey, email, 'We received your message — ASADS Home Inspection', `
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out to ASADS Home Inspection. We've received your message and will get back to you within <strong>24 hours</strong>.</p>
        <p>For urgent matters, call us directly at <strong>(647) 801-9311</strong>.</p>
        <br/>
        <p style="color:#64748b;font-size:13px">— ASADS Home Inspection<br/>asads.ca · (647) 801-9311</p>
      `);
    }

    if (type === 'broadcast') {
      const { subject: bSubject, body: bBody } = data;
      if (!bSubject || !bBody) return res.status(400).json({ error: 'subject and body required' });

      const supabaseUrl = process.env.SUPABASE_URL!;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      if (!supabaseUrl || !serviceKey) return res.status(500).json({ error: 'Missing Supabase env vars' });

      const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
      const { data: users } = await db.from('users').select('email, name').eq('role', 'homeowner').not('email', 'is', null);

      let sent = 0;
      for (const u of users ?? []) {
        const personalBody = (bBody as string).replace(/\{name\}/g, u.name || 'Homeowner');
        await sendEmail(apiKey, u.email, bSubject, `<div style="font-family:sans-serif;max-width:600px">${personalBody.replace(/\n/g, '<br/>')}</div><br/><p style="color:#64748b;font-size:13px">— ASADS Home Inspection<br/>asads.ca · (647) 801-9311<br/><small>You received this because you booked an inspection with us.</small></p>`);
        sent++;
      }

      return res.status(200).json({ ok: true, sent });
    }

    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
