import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { sessionId } = req.body ?? {};
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) return res.status(500).json({ error: 'Missing Stripe config' });

  // Retrieve checkout session from Stripe
  const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${stripeSecret}` },
  });
  const session = await r.json();

  if (!r.ok) return res.status(400).json({ error: session.error?.message ?? 'Stripe error' });
  if (session.payment_status !== 'paid') return res.status(402).json({ error: 'Payment not completed' });

  const reportId = session.metadata?.report_id;
  if (!reportId) return res.status(400).json({ error: 'No report_id in session metadata' });

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return res.status(500).json({ error: 'Missing Supabase config' });

  const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const { error } = await db
    .from('reports')
    .update({ status: 'visible', paid_at: new Date().toISOString() })
    .eq('id', reportId);

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ ok: true });
}
