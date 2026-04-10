import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { reportId, baseCents, taxCents, description, customerEmail } = req.body ?? {};
  if (!reportId || !baseCents) return res.status(400).json({ url: null, error: 'Missing required fields' });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(200).json({ url: null });

  try {
    const params = new URLSearchParams();
    params.append('payment_method_types[]', 'card');
    params.append('mode', 'payment');
    if (customerEmail) params.append('customer_email', customerEmail);
    params.append('payment_intent_data[statement_descriptor]', 'ASADS HOME INSP');
    params.append('line_items[0][price_data][currency]', 'cad');
    params.append('line_items[0][price_data][product_data][name]', description || 'Home Inspection');
    params.append('line_items[0][price_data][unit_amount]', String(baseCents));
    params.append('line_items[0][quantity]', '1');
    if (taxCents > 0) {
      params.append('line_items[1][price_data][currency]', 'cad');
      params.append('line_items[1][price_data][product_data][name]', 'HST (13%)');
      params.append('line_items[1][price_data][unit_amount]', String(taxCents));
      params.append('line_items[1][quantity]', '1');
    }
    params.append('success_url', 'https://www.asads.ca/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}');
    params.append('cancel_url', 'https://www.asads.ca/dashboard');
    params.append('metadata[report_id]', reportId);

    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await r.json();
    if (!r.ok) throw new Error(session.error?.message ?? `Stripe error ${r.status}`);

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err.message);
    res.status(200).json({ url: null, error: err.message });
  }
}
