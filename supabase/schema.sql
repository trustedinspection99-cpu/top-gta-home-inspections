-- ============================================================
-- ASADS Client Portal — Supabase Schema
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Users table (mirrors auth.users, stores role)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null check (role in ('homeowner', 'realtor', 'admin')) default 'homeowner',
  name text not null,
  phone text,
  created_at timestamptz default now()
);

-- 2. Realtors table
create table if not exists public.realtors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  agency text not null,
  photo_url text,
  domain text not null,
  backlink_verified boolean default false,
  listed boolean default false,
  cities text[] default '{}',
  created_at timestamptz default now()
);

-- 3. Jobs table
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  homeowner_id uuid not null references public.users(id) on delete cascade,
  address text not null,
  city text not null,
  inspection_type text not null,
  status text not null check (status in ('scheduled', 'in_progress', 'completed', 'cancelled')) default 'scheduled',
  scheduled_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- 4. Reports table
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  storage_url text not null,
  generated_at timestamptz default now()
);

-- 5. Maintenance checklist
create table if not exists public.maintenance (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  category text not null default 'General',
  due_date date,
  completed boolean default false,
  property_address text default '',
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.users enable row level security;
alter table public.realtors enable row level security;
alter table public.jobs enable row level security;
alter table public.reports enable row level security;
alter table public.maintenance enable row level security;

-- Users: can read/update own row; admin reads all
create policy "Users read own" on public.users
  for select using (auth.uid() = id);

create policy "Users update own" on public.users
  for update using (auth.uid() = id);

create policy "Admin reads all users" on public.users
  for select using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

-- Jobs: homeowners see own; admin sees all
create policy "Homeowners see own jobs" on public.jobs
  for select using (homeowner_id = auth.uid());

create policy "Admin sees all jobs" on public.jobs
  for all using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

-- Reports: homeowners see reports for their jobs
create policy "Homeowners see own reports" on public.reports
  for select using (
    exists (select 1 from public.jobs j where j.id = job_id and j.homeowner_id = auth.uid())
  );

create policy "Admin manages reports" on public.reports
  for all using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

-- Maintenance: users see own
create policy "Users see own maintenance" on public.maintenance
  for all using (user_id = auth.uid());

-- Realtors: own row; public can read listed=true
create policy "Realtors manage own" on public.realtors
  for all using (user_id = auth.uid());

create policy "Public reads listed realtors" on public.realtors
  for select using (listed = true and backlink_verified = true);

create policy "Admin manages realtors" on public.realtors
  for all using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

-- ============================================================
-- Storage bucket (run manually in dashboard or via CLI)
-- ============================================================
-- insert into storage.buckets (id, name, public) values ('reports', 'reports', true);
