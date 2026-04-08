// Visitor leave beacon endpoint
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {};
  const { action } = body;

  if (action === 'leave') {
    const { sessionId, page } = body;
    if (!sessionId) return res.status(400).end();

    const db = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    try {
      await db.from('visitor_events').insert({ session_id: sessionId, type: 'leave', page: page ?? null });
    } catch {
      // Beacon requests don't read the response
    }
    return res.status(204).end();
  }

  return res.status(400).json({ error: 'Unknown action' });
}
