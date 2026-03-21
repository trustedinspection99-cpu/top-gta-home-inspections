import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

interface LineItem { name: string; amount: number; }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { lineItems, customerName, customerEmail }: { lineItems: LineItem[]; customerName: string; customerEmail: string } = req.body;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(200).json({ url: null }); // graceful fallback if key not set

  const validItems = lineItems.filter(i => i.amount > 0);
  if (validItems.length === 0) return res.status(200).json({ url: null });

  try {
    const stripe = new Stripe(key);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail || undefined,
      payment_intent_data: {
        statement_descriptor: 'ASADS HOME INSP',
      },
      line_items: validItems.map(item => ({
        price_data: {
          currency: 'cad',
          product_data: { name: item.name },
          unit_amount: item.amount,
        },
        quantity: 1,
      })),
      success_url: 'https://www.asads.ca/booking?payment=success',
      cancel_url: 'https://www.asads.ca/?payment=cancelled',
      metadata: { customerName: customerName || '' },
    });

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err.message);
    res.status(200).json({ url: null, error: err.message });
  }
}
