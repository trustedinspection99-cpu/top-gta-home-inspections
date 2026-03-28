import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { audio } = await req.json();
    if (!audio) return new Response(JSON.stringify({ error: 'audio required' }), { headers: CORS, status: 400 });

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) return new Response(JSON.stringify({ error: 'OPENAI_API_KEY not set' }), { headers: CORS, status: 500 });

    // Decode base64 to binary
    const binary = atob(audio);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    // Build multipart form for Whisper API
    const formData = new FormData();
    const audioBlob = new Blob([bytes], { type: 'audio/m4a' });
    formData.append('file', audioBlob, 'recording.m4a');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message ?? 'Whisper API error');

    return new Response(JSON.stringify({ text: data.text }), { headers: { ...CORS, 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { headers: CORS, status: 500 });
  }
});
