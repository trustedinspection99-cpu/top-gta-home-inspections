-- ============================================================
-- Visitor Session Tracking for ASADS
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

-- 1. Visitor sessions (one per browser session)
create table if not exists visitor_sessions (
  id           text primary key,          -- random ID stored in sessionStorage
  created_at   timestamptz default now(),
  entry_page   text not null,
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_term     text,
  source       text default 'direct'      -- organic | direct | referral | paid | social
);

-- 2. Visitor events (one per page view / action)
create table if not exists visitor_events (
  id         uuid primary key default gen_random_uuid(),
  session_id text references visitor_sessions(id) on delete cascade,
  created_at timestamptz default now(),
  type       text not null,               -- page_view | booking_submit | cta_click | leave
  page       text,
  data       jsonb
);

-- ── RLS ──────────────────────────────────────────────────────────────────────

alter table visitor_sessions enable row level security;
alter table visitor_events   enable row level security;

-- Anyone (anon) can insert sessions and events
create policy "Insert visitor sessions"
  on visitor_sessions for insert with check (true);

create policy "Insert visitor events"
  on visitor_events for insert with check (true);

-- Only authenticated users (admin) can read
create policy "Auth read visitor sessions"
  on visitor_sessions for select using (auth.role() = 'authenticated');

create policy "Auth read visitor events"
  on visitor_events for select using (auth.role() = 'authenticated');

-- ── Indexes ───────────────────────────────────────────────────────────────────

create index if not exists idx_visitor_events_session on visitor_events(session_id);
create index if not exists idx_visitor_events_created on visitor_events(created_at desc);
create index if not exists idx_visitor_sessions_created on visitor_sessions(created_at desc);
