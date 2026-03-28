-- ============================================================
-- ASADS Admin Dashboard — Supabase Setup
-- Run this in Supabase SQL Editor (project: wjxbojjhyocrxqkfnxmz)
-- ============================================================

-- 1. Rank tracking table
create table if not exists rank_tracking (
  id uuid primary key default gen_random_uuid(),
  checked_at timestamptz not null default now(),
  keyword text not null,
  city text not null,
  service text not null,
  position integer,
  url_ranked text,
  previous_position integer
);

create index if not exists rank_tracking_keyword_idx on rank_tracking(keyword);
create index if not exists rank_tracking_checked_at_idx on rank_tracking(checked_at desc);

-- Allow anon read (admin page uses anon key behind ProtectedRoute)
alter table rank_tracking enable row level security;
create policy "Admin read rank_tracking" on rank_tracking
  for select using (true);
create policy "Service role insert rank_tracking" on rank_tracking
  for insert with check (true);

-- 2. Conversation logs table
create table if not exists conversation_logs (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  messages jsonb not null default '[]',
  booked boolean not null default false,
  service_type text,
  city text,
  address text,
  client_name text,
  client_email text,
  client_phone text,
  reason_not_booked text,
  inspection_date text,
  price text
);

create index if not exists conversation_logs_started_at_idx on conversation_logs(started_at desc);
create index if not exists conversation_logs_booked_idx on conversation_logs(booked);

alter table conversation_logs enable row level security;
create policy "Admin read conversation_logs" on conversation_logs
  for select using (true);
create policy "Service role insert conversation_logs" on conversation_logs
  for insert with check (true);
create policy "Service role update conversation_logs" on conversation_logs
  for update using (true);

-- 3. Optional: daily cron to auto-run check-rankings at 6am UTC
-- Requires pg_cron extension (enable in Supabase Dashboard → Database → Extensions)
-- select cron.schedule(
--   'daily-rank-check',
--   '0 6 * * *',
--   $$
--   select net.http_post(
--     url := 'https://wjxbojjhyocrxqkfnxmz.supabase.co/functions/v1/check-rankings',
--     headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY", "Content-Type": "application/json"}'::jsonb,
--     body := '{}'::jsonb
--   );
--   $$
-- );
