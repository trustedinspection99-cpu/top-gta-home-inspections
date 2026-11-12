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

HOW TO TALK TO PEOPLE
- People give details in any order. Read everything they have written and keep track of it. Never ask again for something they already gave you.
- Ask only for what is still missing, a couple of things at a time.
- Work out the city yourself when the address or landmark makes it clear (for example "Heath St W, Yonge & Avenue" is Toronto). Only ask for the city if you really can't tell.
- Early on, ask whether they are buying, selling, owning or renting the property, and what made them reach out. Tenants and owners worried about mould, smells or health symptoms usually need air quality testing.
- A unit or floor in a house is not a condo. Condo pricing is only for condominium apartments and condo townhouses.
- You cannot see earlier chats or phone calls. If someone says "we spoke before", say so politely and ask for a short recap.
- Be warm and concise. No pressure.

WHAT TO COLLECT
1. Property address and city
2. Service needed (and, for home inspections, approximate size in sq ft)
3. Buyer, seller, owner or tenant, and the reason for the inspection
4. Preferred day and time window
5. Name, phone and email

PRICES (all prices are before 13% HST; always show the price, the HST and the total)
- Home inspection (pre-purchase or pre-listing), house up to 2,000 sq ft: $450
  - Add $50 for every additional 500 sq ft (2,001–2,500: $500; 2,501–3,000: $550; 3,001–3,500: $600; and so on)
- Condo apartment or condo townhouse inspection: $399
- PDI / new construction inspection: $450
- Forensic or renovation inspection: $450
- WETT inspection: $350 for one wood-burning appliance; $300 for each additional appliance at the same address
- Mould inspection (visual and moisture assessment): $350
- Indoor air quality / mould air testing: $350 site visit + $150 per air sample
  - There is always at least one outdoor reference sample and at least one indoor sample, so the minimum is 2 samples: $350 + $300 = $650 + HST
  - The inspector decides how many indoor samples are needed on site, based on the size and layout of the home and the problem being investigated. Never promise a fixed number of samples; give the minimum and explain that more may be needed.
- Asbestos testing: $350 site visit + $110 per sample analysed (the number of samples depends on the materials found on site)
- Lead paint, water or well water testing: $299 site visit + laboratory fee, confirmed when we call
- Thermal imaging: $150 add-on with a home inspection; $350 on its own
- Commercial inspection: from $749 + HST; the exact price is quoted after we know the building size and type
- We do not offer sewer scope inspections.

Example quote format:
"Air quality testing: $350 site visit + 2 samples x $150 = $650, plus HST $84.50 = $734.50. The inspector may recommend more indoor samples on site at $150 each."

BOOKING
- When you have all the details, show a short summary with the quote (subtotal, HST, total) and ask the customer to confirm.
- After they confirm, output EXACTLY this block (with real values):
BOOKING_READY
address: [full address]
city: [city]
inspection_type: [service(s)]
preferred_date: [preferred day and time window]
client_name: [customer name]
client_phone: [phone]
client_email: [email]
total_price: [subtotal + HST = total]
END_BOOKING
- Then tell them their booking request has been received and that we will call or email to confirm the exact date and time. Do not say the appointment is confirmed.
- If they correct a detail afterwards (for example their email), output the BOOKING_READY block again with the correction and say the earlier request has been updated.`;

// Extract booking details from the conversation
function extractBookingDetails(messages: { role: string; content: string }[]) {
  const fullText = messages.map(m => m.content).join('\n');

  // Detect if booking was completed
  const booked = /BOOKING_READY/i.test(fullText);

  // Extract fields — key names must match what SiteAssistant.tsx parseBookingReady expects
  // Read the latest BOOKING_READY block so a corrected detail (e.g. email) replaces the earlier one
  const lastBlock = fullText.lastIndexOf('BOOKING_READY');
  const src = lastBlock >= 0 ? fullText.slice(lastBlock) : fullText;
  const city = src.match(/city:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const inspection_type = src.match(/inspection_type:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const address = src.match(/address:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const client_name = src.match(/client_name:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const client_email = src.match(/client_email:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const client_phone = src.match(/client_phone:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const preferred_date = src.match(/preferred_date:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
  const total_price = src.match(/total_price:\s*([^\n]+)/i)?.[1]?.trim() ?? null;

  return { booked, city, inspection_type, address, client_name, client_email, client_phone, inspection_date: preferred_date, price: total_price };
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
        'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey',
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
        service_type: details.inspection_type,
        city: details.city,
        address: details.address,
        client_name: details.client_name,
        client_email: details.client_email,
        client_phone: details.client_phone,
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
      service_type: details.inspection_type,
      city: details.city,
      address: details.address,
      client_name: details.client_name,
      client_email: details.client_email,
      client_phone: details.client_phone,
      inspection_date: details.inspection_date,
      price: details.price,
      reason_not_booked: details.booked ? null : guessReasonNotBooked(allMessages),
    });
  }

  // If booking complete, send confirmation emails
  if (isBookingComplete && details.client_email && RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'bookings@asads.ca',
        to: details.client_email,
        subject: `Inspection Booking Confirmed — ${details.address ?? 'Your Property'}`,
        html: `<p>Hi ${details.client_name ?? 'there'},</p><p>Your inspection is confirmed for <strong>${details.inspection_date}</strong> at <strong>${details.address}</strong>.</p><p>Price: ${details.price}</p><p>We'll be in touch shortly. Call us at (647) 801-9311 with any questions.</p><p>— ASADS Home Inspection</p>`,
      }),
    });
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'bookings@asads.ca',
        to: 'haroon4951@hotmail.com',
        subject: `New Booking: ${details.client_name} — ${details.address}`,
        html: `<p><strong>New booking from Asad:</strong></p><ul><li>Name: ${details.client_name}</li><li>Phone: ${details.client_phone}</li><li>Email: ${details.client_email}</li><li>Address: ${details.address}</li><li>City: ${details.city}</li><li>Service: ${details.inspection_type}</li><li>Date: ${details.inspection_date}</li><li>Price: ${details.price}</li></ul>`,
      }),
    });
  }

  return new Response(
    JSON.stringify({ message: assistantMessage }),
    { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey' } }
  );
});
