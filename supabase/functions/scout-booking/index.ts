import Anthropic from 'npm:@anthropic-ai/sdk';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') });
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const SYSTEM_PROMPT = `You are Max, a friendly and professional booking assistant for ASADS Home Inspection in Ontario, Canada.
Your goal is to book home inspection appointments in 4 exchanges:
1. Ask for their property address and city
2. Ask for inspection type (pre-purchase, pre-listing, condo, mold, new construction, PDI, etc.) and approximate home size
3. Provide a price quote, ask for their preferred date, and collect their name, phone, and email
4. Confirm all details and output a BOOKING_READY block

When you have all the info and the customer confirms, output EXACTLY this block (with real values):
BOOKING_READY
address: [full address]
city: [city]
inspection_type: [inspection type]
preferred_date: [preferred date]
client_name: [customer name]
client_phone: [phone]
client_email: [email]
total_price: [quoted price]
END_BOOKING

Pricing guide:
- Condo/apartment: from $299
- Townhouse/semi: from $399
- Detached up to 2000sqft: from $449
- Detached 2000-3000sqft: from $499
- Larger homes: from $549+
- Mold air sampling add-on: from $299
- Thermal imaging add-on: from $199

Be warm, professional, and concise. Always confirm availability is subject to scheduling.`;

function extractBookingDetails(messages: { role: string; content: string }[]) {
  const fullText = messages.map(m => m.content).join('\n');
  const booked = /BOOKING_READY/i.test(fullText);
  const get = (key: string) => fullText.match(new RegExp(key + ':\\s*([^\\n]+)'))?.[1]?.trim() ?? null;

  return {
    booked,
    city: get('city'),
    service_type: get('inspection_type'),
    address: get('address'),
    client_name: get('client_name'),
    client_email: get('client_email'),
    client_phone: get('client_phone'),
    inspection_date: get('preferred_date'),
    price: get('total_price'),
  };
}

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

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
  });

  const assistantMessage = response.content[0].type === 'text' ? response.content[0].text : '';
  const allMessages = [...messages, { role: 'assistant', content: assistantMessage }];

  const isBookingComplete = /BOOKING_READY/i.test(assistantMessage);
  const details = extractBookingDetails(allMessages);

  const { data: existing } = await supabase
    .from('conversation_logs')
    .select('id')
    .eq('session_id', sessionId)
    .maybeSingle();

  const logPayload = {
    messages: allMessages,
    ended_at: isBookingComplete ? new Date().toISOString() : null,
    booked: details.booked,
    service_type: details.service_type,
    city: details.city,
    address: details.address,
    client_name: details.client_name,
    client_email: details.client_email,
    client_phone: details.client_phone,
    inspection_date: details.inspection_date,
    price: details.price,
    reason_not_booked: details.booked ? null : guessReasonNotBooked(allMessages),
  };

  if (existing?.id) {
    await supabase.from('conversation_logs').update(logPayload).eq('id', existing.id);
  } else {
    await supabase.from('conversation_logs').insert({
      session_id: sessionId,
      started_at: new Date().toISOString(),
      ...logPayload,
    });
  }

  if (isBookingComplete && details.client_email && RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'bookings@asads.ca',
        to: details.client_email,
        subject: 'Inspection Booking Confirmed — ' + (details.address ?? 'Your Property'),
        html: '<p>Hi ' + (details.client_name ?? 'there') + ',</p><p>Your inspection is confirmed for <strong>' + details.inspection_date + '</strong> at <strong>' + details.address + '</strong>.</p><p>Price: ' + details.price + '</p><p>We will be in touch shortly. Call us at (647) 801-9311 with any questions.</p><p>— ASADS Home Inspection</p>',
      }),
    });
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'bookings@asads.ca',
        to: 'haroon4951@hotmail.com',
        subject: 'New Booking: ' + details.client_name + ' — ' + details.address,
        html: '<p><strong>New booking from Max (AI chat):</strong></p><ul><li>Name: ' + details.client_name + '</li><li>Phone: ' + details.client_phone + '</li><li>Email: ' + details.client_email + '</li><li>Address: ' + details.address + '</li><li>City: ' + details.city + '</li><li>Service: ' + details.service_type + '</li><li>Date: ' + details.inspection_date + '</li><li>Price: ' + details.price + '</li></ul>',
      }),
    });
  }

  return new Response(
    JSON.stringify({ message: assistantMessage }),
    { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
  );
});
