import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  try {
    const { address, city, inspection_type, preferred_date, client_name, client_phone, client_email, total_price } = await req.json();

    const RESEND_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_KEY) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not set" }), { headers: CORS_HEADERS, status: 500 });
    }

    const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 0; }
  .wrap { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
  .header { background: #1d4ed8; padding: 28px 32px; }
  .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
  .header p { color: #bfdbfe; margin: 4px 0 0; font-size: 14px; }
  .body { padding: 28px 32px; }
  .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
  .row:last-child { border-bottom: none; }
  .label { color: #6b7280; }
  .value { font-weight: 600; color: #111827; text-align: right; max-width: 60%; }
  .total { background: #eff6ff; border-radius: 8px; padding: 14px 16px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; }
  .total-label { font-weight: 700; color: #1e3a8a; font-size: 15px; }
  .total-value { font-weight: 800; color: #1d4ed8; font-size: 20px; }
  .footer { background: #f9fafb; padding: 20px 32px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  .cta { text-align: center; margin: 24px 0 8px; }
  .cta a { background: #1d4ed8; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
</style></head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>Inspection Booking Confirmed</h1>
      <p>ASADS Home Inspection · (647) 801-9311</p>
    </div>
    <div class="body">
      <p style="color:#374151;font-size:15px;margin:0 0 20px">Hi ${client_name}, your inspection has been booked. We'll call to confirm your appointment time shortly.</p>
      <div class="row"><span class="label">Property</span><span class="value">${address}, ${city}</span></div>
      <div class="row"><span class="label">Service</span><span class="value">${inspection_type}</span></div>
      <div class="row"><span class="label">Preferred time</span><span class="value">${preferred_date}</span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${client_phone}</span></div>
      ${total_price ? `<div class="total"><span class="total-label">Total</span><span class="total-value">${total_price}</span></div>` : ''}
      <div class="cta"><a href="tel:+16478019311">Questions? Call (647) 801-9311</a></div>
    </div>
    <div class="footer">ASADS Home Inspection · OAHI & InterNACHI Certified · asads.ca</div>
  </div>
</body>
</html>`;

    const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;padding:20px;color:#111">
  <h2 style="color:#1d4ed8">New Booking via Asad</h2>
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600;width:140px">Client</td><td style="padding:8px 12px">${client_name}</td></tr>
    <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600">Email</td><td style="padding:8px 12px">${client_email}</td></tr>
    <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600">Phone</td><td style="padding:8px 12px">${client_phone}</td></tr>
    <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600">Property</td><td style="padding:8px 12px">${address}, ${city}</td></tr>
    <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600">Service</td><td style="padding:8px 12px">${inspection_type}</td></tr>
    <tr><td style="padding:8px 12px;background:#f3f4f6;font-weight:600">Preferred time</td><td style="padding:8px 12px">${preferred_date}</td></tr>
    ${total_price ? `<tr><td style="padding:8px 12px;background:#eff6ff;font-weight:700;color:#1e3a8a">Total</td><td style="padding:8px 12px;font-weight:700;color:#1d4ed8;font-size:16px">${total_price}</td></tr>` : ''}
  </table>
</body>
</html>`;

    // Send to client
    if (client_email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "ASADS Home Inspection <bookings@asads.ca>",
          to: [client_email],
          subject: `Inspection Booked — ${address}, ${city}`,
          html: clientHtml,
        }),
      });
    }

    // Notify admin
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "ASADS Bookings <bookings@asads.ca>",
        to: ["info@asads.ca"],
        subject: `New Booking: ${client_name} — ${address}, ${city}${total_price ? ` (${total_price})` : ''}`,
        html: adminHtml,
      }),
    });

    return new Response(JSON.stringify({ success: true }), { headers: CORS_HEADERS });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { headers: CORS_HEADERS, status: 500 });
  }
});
