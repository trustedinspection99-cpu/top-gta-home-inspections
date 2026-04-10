import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { reportId, baseCents, taxCents, description, customerEmail } = req.body ?? {};
  if (!reportId || !baseCents) return res.status(400).json({ url: null, error: 'Missing required fields' });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(200).json({ url: null });

  try {
    const stripe = new Stripe(key);

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'cad',
          product_data: { name: description || 'Home Inspection' },
          unit_amount: baseCents,
        },
        quantity: 1,
      },
    ];

    if (taxCents > 0) {
      lineItems.push({
        price_data: {
          currency: 'cad',
          product_data: { name: 'HST (13%)' },
          unit_amount: taxCents,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail || undefined,
      payment_intent_data: { statement_descriptor: 'ASADS HOME INSP' },
      line_items: lineItems,
      success_url: 'https://www.asads.ca/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://www.asads.ca/dashboard',
      metadata: { report_id: reportId },
    });

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err.message);
    res.status(200).json({ url: null, error: err.message });
  }
}
