import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const FEED_TOKEN = Deno.env.get('CALENDAR_FEED_TOKEN') ?? 'asads-cal-2024';

function icsDate(iso: string): string {
  // 2024-04-20T14:00:00.000Z -> 20240420T140000Z
  return iso.slice(0, 19).replace(/-/g, '').replace(/:/g, '').replace('T', 'T') + 'Z';
}

function safe(s: string): string {
  return (s ?? '').replace(/[\r\n,]/g, ' ').trim();
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (token !== FEED_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('id, client_name, client_email, address, city, inspection_type, scheduled_at, status')
    .in('status', ['scheduled', 'in_progress'])
    .not('scheduled_at', 'is', null)
    .order('scheduled_at', { ascending: true });

  if (error) {
    return new Response('Error fetching jobs', { status: 500 });
  }

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ASADS Home Inspection//Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:ASADS Inspections',
    'X-WR-TIMEZONE:America/Toronto',
    'REFRESH-INTERVAL;VALUE=DURATION:PT1H',
    'X-PUBLISHED-TTL:PT1H',
  ];

  for (const job of (jobs ?? [])) {
    const start = new Date(job.scheduled_at);
    const end = new Date(start.getTime() + 2.5 * 60 * 60 * 1000);

    const summary = safe((job.inspection_type ?? 'Inspection') + ' - ' + job.address);
    const location = safe(job.address + ' ' + (job.city ?? ''));

    const descParts: string[] = [];
    if (job.client_name) descParts.push('Client: ' + job.client_name);
    if (job.client_email) descParts.push('Email: ' + job.client_email);
    descParts.push('Status: ' + job.status);
    const description = descParts.join(' | ');

    lines.push('BEGIN:VEVENT');
    lines.push('UID:asads-job-' + job.id + '@asads.ca');
    lines.push('DTSTART:' + icsDate(start.toISOString()));
    lines.push('DTEND:' + icsDate(end.toISOString()));
    lines.push('SUMMARY:' + summary);
    lines.push('LOCATION:' + location);
    lines.push('DESCRIPTION:' + description);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  const ics = lines.join('\r\n');

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
});
