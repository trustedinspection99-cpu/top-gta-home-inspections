import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Anthropic from "npm:@anthropic-ai/sdk";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const SYSTEM_PROMPT = `You are Scout, the ASADS Home Inspection booking assistant. Your job is to collect all the information needed to schedule a home inspection — conversationally, one step at a time.

INFORMATION YOU NEED TO COLLECT:
1. Property address (street number + street name)
2. City
3. Inspection type (Pre-Purchase, Pre-Listing, New Construction, Condo, Commercial, Mold, Radon, WETT, Sewer Scope, Asbestos, Thermal Imaging, Air Quality, Well Water, Lead Paint)
4. Preferred date and time
5. Client name (if not already known)
6. Client phone number

RULES:
- Ask for ONE thing at a time — never dump a list of questions
- Be friendly and brief
- If the user gives multiple pieces of info at once, acknowledge them all and ask for whatever is still missing
- Once you have ALL 6 pieces of information, output a booking summary in this EXACT format and nothing else after it:

BOOKING_READY
address: [street address]
city: [city]
inspection_type: [type]
preferred_date: [date and time]
client_name: [name]
client_phone: [phone]

- Before outputting BOOKING_READY, confirm the details naturally: "Just to confirm — [summary]. Shall I book this?"
- Only output BOOKING_READY after the user confirms
- Keep all responses under 3 sentences`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  try {
    const { messages } = await req.json();

    const client = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY")! });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const content = response.content[0].type === "text" ? response.content[0].text : "";
    return new Response(JSON.stringify({ content }), { headers: CORS_HEADERS });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { headers: CORS_HEADERS, status: 500 });
  }
});
