-- Enable required extensions (if not already enabled)
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Schedule daily reminder at 2PM UTC (10AM EST / 11AM EDT)
select cron.schedule(
  'daily-reminders',
  '0 14 * * *',
  $$
  select net.http_post(
    url := 'https://wjxbojjhyocrxqkfnxmz.supabase.co/functions/v1/auto-reminder',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
