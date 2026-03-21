import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { service, city, address, age, beds, baths, sqft, addons, name, phone, email, datetime, notes } = req.body;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing Resend key' });

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'ASADS Home Inspection <no-reply@asads.ca>',
        to: 'haroon4951@hotmail.com',
        subject: `🔍 New Chat Booking — ${service} in ${city}`,
        html: `
          <h2 style="color:#1d4ed8">New Booking via Scout (Chat Assistant)</h2>
          <table style="border-collapse:collapse;width:100%;max-width:520px;font-family:sans-serif">
            <tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700;width:140px">Service</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${service}</td></tr>
            ${addons?.length > 0 ? `<tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Add-ons</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${addons.join(', ')}</td></tr>` : ''}
            <tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">City</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${city}</td></tr>
            ${address ? `<tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Address</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${address}</td></tr>` : ''}
            <tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Property Age</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${age}</td></tr>
            <tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Bedrooms</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${beds}</td></tr>
            <tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Bathrooms</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${baths}</td></tr>
            <tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Square Footage</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${sqft}</td></tr>
            <tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Name</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${name}</td></tr>
            <tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Phone</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe"><a href="tel:${phone}">${phone}</a></td></tr>
            ${email ? `<tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Email</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe"><a href="mailto:${email}">${email}</a></td></tr>` : ''}
            ${datetime ? `<tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Preferred Date/Time</td><td style="padding:10px 14px;border-bottom:1px solid #dbeafe">${datetime}</td></tr>` : ''}
            ${notes ? `<tr><td style="padding:10px 14px;background:#eff6ff;font-weight:700">Notes</td><td style="padding:10px 14px">${notes}</td></tr>` : ''}
          </table>
          <p style="margin-top:20px;color:#6b7280;font-size:13px">Submitted via Scout chat assistant · asads.ca</p>
        `,
      }),
    });

    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
