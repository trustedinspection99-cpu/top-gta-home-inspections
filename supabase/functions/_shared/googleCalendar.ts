// Adds each new ASADS booking REQUEST to the owner's Google Calendar as a "CALL TO CONFIRM" event (owner request 2026-11-25).
// Setup (once): the owner shares their Google Calendar with the service account (permission: "Make changes to events"),
// and two Supabase secrets are set: GOOGLE_SA_JSON_B64 (base64 of the key file) and GOOGLE_CALENDAR_ID (the calendar's address).
// Never throws and never delays a booking by more than a few seconds: if anything fails, the booking and its emails still go out.

type Req = {
  name?: string; phone?: string; email?: string; service?: string; city?: string; address?: string;
  preferred_date?: string; preferred_time?: string; notes?: string; source?: string;
};

const TZ = 'America/Toronto';

function b64url(data: ArrayBuffer | string): string {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function accessToken(sa: { client_email: string; private_key: string }): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email, scope: 'https://www.googleapis.com/auth/calendar.events',
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  }));
  const pem = sa.private_key.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`${header}.${claims}`));
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${header}.${claims}.${b64url(sig)}` }),
  });
  const j = await res.json();
  if (!j.access_token) throw new Error('token: ' + JSON.stringify(j).slice(0, 200));
  return j.access_token;
}

// Preferred date/time -> local Toronto start "YYYY-MM-DDTHH:MM:00". Flexible/unreadable -> next whole hour today.
function startLocal(date?: string, time?: string): { start: string; flexible: boolean } {
  const pad = (n: number) => String(n).padStart(2, '0');
  let y = 0, m = 0, d = 0;
  const iso = (date ?? '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) { y = +iso[1]; m = +iso[2]; d = +iso[3]; }
  else if (date && date !== 'Flexible') {
    const dt = new Date(date.replace(/(\d+)(st|nd|rd|th)/i, '$1'));
    if (!isNaN(dt.getTime())) { y = dt.getFullYear(); m = dt.getMonth() + 1; d = dt.getDate(); }
  }
  if (!y) {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: TZ }));
    now.setHours(now.getHours() + 1, 0, 0, 0);
    return { start: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:00:00`, flexible: true };
  }
  let hh = 9, mm = 0;
  const t = (time ?? '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (t) { hh = +t[1] % 12 + ((t[3] ?? '').toUpperCase() === 'PM' ? 12 : 0); mm = +t[2]; if (!t[3] && +t[1] >= 12) hh = +t[1]; }
  return { start: `${y}-${pad(m)}-${pad(d)}T${pad(hh)}:${pad(mm)}:00`, flexible: false };
}

function addHour(local: string): string {
  const [datePart, timePart] = local.split('T');
  const [h, mi] = timePart.split(':').map(Number);
  if (h + 1 < 24) return `${datePart}T${String(h + 1).padStart(2, '0')}:${String(mi).padStart(2, '0')}:00`;
  return `${datePart}T23:59:00`;
}

export async function addBookingToCalendar(r: Req): Promise<void> {
  try {
    // GOOGLE_SA_JSON_B64 (base64 of the key file) survives Windows shells; GOOGLE_SA_JSON is the plain-JSON fallback.
    const b64 = Deno.env.get('GOOGLE_SA_JSON_B64');
    const saRaw = b64 ? new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))) : Deno.env.get('GOOGLE_SA_JSON');
    const calendarId = Deno.env.get('GOOGLE_CALENDAR_ID');
    if (!saRaw || !calendarId) return; // not set up yet
    const sa = JSON.parse(saRaw);
    const token = await accessToken(sa);
    const { start, flexible } = startLocal(r.preferred_date, r.preferred_time);
    const lines = [
      'Booking REQUEST: not confirmed yet. Call the client to confirm the date and time.',
      '',
      `Client: ${r.name ?? ''}`,
      `Phone: ${r.phone ?? ''}`,
      r.email ? `Email: ${r.email}` : 'Email: (not given)',
      `Service: ${r.service ?? ''}`,
      `Address: ${[r.address, r.city].filter(Boolean).join(', ') || '(not given)'}`,
      `Preferred: ${r.preferred_date || 'Flexible'}${r.preferred_time ? ' at ' + r.preferred_time : ''}${flexible ? ' (placed here as a reminder to call)' : ''}`,
      r.notes ? `Notes: ${r.notes}` : '',
      r.source ? `Booked via: ${r.source}` : '',
    ].filter((l) => l !== '');
    const event = {
      summary: `📞 CALL TO CONFIRM – ${r.name ?? 'Client'} – ${r.service ?? 'Inspection'}${r.city ? ' – ' + r.city : ''}`,
      location: [r.address, r.city].filter(Boolean).join(', '),
      description: lines.join('\n'),
      start: { dateTime: start, timeZone: TZ },
      end: { dateTime: addHour(start), timeZone: TZ },
      colorId: '11', // red
      reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 0 }] },
    };
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
      method: 'POST', signal: ctrl.signal,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    clearTimeout(timer);
    if (!res.ok) console.error('Calendar insert failed:', res.status, (await res.text()).slice(0, 200));
  } catch (e) {
    console.error('Calendar error:', String(e));
  }
}
