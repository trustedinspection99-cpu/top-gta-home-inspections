// Updated scout-booking edge function with conversation logging
// Copy this code into your existing scout-booking function in Supabase Dashboard
// Supabase → Edge Functions → scout-booking → Edit

import Anthropic from 'npm:@anthropic-ai/sdk';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') });
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const SYSTEM_PROMPT = `You are Asad, a friendly and professional booking assistant for ASADS Home Inspection in Ontario, Canada.
Your goal is to book home inspection appointments in 4 exchanges:
1. Ask for their property address and city
2. Ask for inspection type (pre-purchase, pre-listing, condo, mold, new construction, PDI, etc.) and approximate home size
3. Provide a price quote, ask for their preferred date, and collect their name, phone, and email
4. Confirm all details and output a BOOKING_READY block

When you have all the info and the customer confirms, output EXACTLY this block (with real values):
BOOKING_READY
address: [full address]
city: [city]
service: [inspection type]
date: [preferred date]
name: [customer name]
phone: [phone]
email: [email]
price: [quoted price]
END_BOOKING

Pricing guide:
- Condo/apartment: from $299
- Townhouse/semi: from $399
- Detached up to 2000sqft: from $449
- Detached 2000-3000sqft: from $499
- Larger homes: from $549+
- Mold air sampling add-on: from $299
- Thermal imaging add-on: from $199
- Sewer scope: from $299

Be warm, professional, and concise. Always confirm availability is subject to scheduling.`;

// Extract booking details from the conversation
function extractBookingDetails(messages: { role: string; content: string }[]) {
  const fullText = messages.map(m => m.content).join('\n');

  // Detect if booking was completed
  const booked = /BOOKING_READY/i.test(fullText);

  // Extract fields
  const city = fullText.match(/city:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const service = fullText.match(/service:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const address = fullText.match(/address:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const name = fullText.match(/name:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const email = fullText.match(/email:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const phone = fullText.match(/phone:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const date = fullText.match(/date:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const price = fullText.match(/price:\s*([^\n]+)/i)?.[1]?.trim() ?? null;

  return { booked, city, service, address, name, email, phone, inspection_date: date, price };
}

// Determine reason not booked from conversation context
function guessReasonNotBooked(messages: { role: string; content: string }[]): string | null {
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content.toLowerCase()).join(' ');
  if (userMessages.includes('too expens') || userMessages.includes('price') || userMessages.includes('cost')) return 'Price concern';
  if (userMessages.includes('not ready') || userMessages.includes('maybe later') || userMessages.includes('just looking')) return 'Not ready to book';
  if (userMessages.includes('another inspector') || userMessages.includes('someone else')) return 'Chose another inspector';
  if (messages.length <= 2) return 'Left after first message';
  return 'Did not complete booking';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  }

  const { messages, sessionId } = await req.json() as {
    messages: { role: string; content: string }[];
    sessionId: string;
  };

  // Call Claude
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
  });

  const assistantMessage = response.content[0].type === 'text' ? response.content[0].text : '';
  const allMessages = [...messages, { role: 'assistant', content: assistantMessage }];

  // Detect BOOKING_READY in the new assistant message
  const isBookingComplete = /BOOKING_READY/i.test(assistantMessage);
  const details = extractBookingDetails(allMessages);

  // Log / upsert conversation to Supabase
  const { data: existing } = await supabase
    .from('conversation_logs')
    .select('id')
    .eq('session_id', sessionId)
    .maybeSingle();

  if (existing?.id) {
    await supabase
      .from('conversation_logs')
      .update({
        messages: allMessages,
        ended_at: isBookingComplete ? new Date().toISOString() : null,
        booked: details.booked,
        service_type: details.service,
        city: details.city,
        address: details.address,
        client_name: details.name,
        client_email: details.email,
        client_phone: details.phone,
        inspection_date: details.inspection_date,
        price: details.price,
        reason_not_booked: details.booked ? null : guessReasonNotBooked(allMessages),
      })
      .eq('id', existing.id);
  } else {
    await supabase.from('conversation_logs').insert({
      session_id: sessionId,
      started_at: new Date().toISOString(),
      messages: allMessages,
      booked: details.booked,
      service_type: details.service,
      city: details.city,
      address: details.address,
      client_name: details.name,
      client_email: details.email,
      client_phone: details.phone,
      inspection_date: details.inspection_date,
      price: details.price,
      reason_not_booked: details.booked ? null : guessReasonNotBooked(allMessages),
    });
  }

  // If booking complete, send confirmation emails
  if (isBookingComplete && details.email && RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'bookings@asads.ca',
        to: details.email,
        subject: `Inspection Booking Confirmed — ${details.address ?? 'Your Property'}`,
        html: `<p>Hi ${details.name ?? 'there'},</p><p>Your inspection is confirmed for <strong>${details.inspection_date}</strong> at <strong>${details.address}</strong>.</p><p>Price: ${details.price}</p><p>We'll be in touch shortly. Call us at (647) 801-9311 with any questions.</p><p>— ASADS Home Inspection</p>`,
      }),
    });
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'bookings@asads.ca',
        to: 'haroon4951@hotmail.com',
        subject: `New Booking: ${details.name} — ${details.address}`,
        html: `<p><strong>New booking from Asad:</strong></p><ul><li>Name: ${details.name}</li><li>Phone: ${details.phone}</li><li>Email: ${details.email}</li><li>Address: ${details.address}</li><li>City: ${details.city}</li><li>Service: ${details.service}</li><li>Date: ${details.inspection_date}</li><li>Price: ${details.price}</li></ul>`,
      }),
    });
  }

  return new Response(
    JSON.stringify({ message: assistantMessage }),
    { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
  );
});
