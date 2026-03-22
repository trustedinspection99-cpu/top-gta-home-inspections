# ASADS Client Portal — Setup Guide

## 1. Supabase Project Setup

1. Go to https://supabase.com → New project
2. **SQL Editor** → paste contents of `supabase/schema.sql` → Run
3. **Storage** → Create bucket named `reports`, set to **Public**
4. **Authentication** → Email enabled (already default)

## 2. Deploy Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy both functions
supabase functions deploy verify-backlink
supabase functions deploy generate-report

# Set Claude API key as Edge Function secret
supabase secrets set CLAUDE_API_KEY=sk-ant-...
```

## 3. Vercel Environment Variables

Add to Vercel project settings → Environment Variables:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` (from Supabase → Settings → API) |

## 4. Create Admin Account

1. Sign up at `/signup` with your email
2. In Supabase Dashboard → Table Editor → `users` → find your row → change `role` to `admin`

## 5. Test the Full Flow

```
1. Admin creates job: /admin/jobs/new (use a test homeowner email)
2. Homeowner signs up at /signup
3. Admin generates report: /admin/jobs/:id/report
4. Homeowner views report at /dashboard
5. Realtor signs up at /signup/realtor (add backlink first)
6. Verify realtor appears at /trusted-realtors
```

## File Map

```
src/lib/supabase.ts                    — Supabase client + DB types
src/hooks/useAuth.ts                   — Auth context + hook
src/components/PortalLayout.tsx        — Sidebar nav for portal
src/components/RealtorCard.tsx         — Directory listing card
src/pages/auth/LoginPage.tsx
src/pages/auth/SignupPage.tsx
src/pages/auth/RealtorSignupPage.tsx   — With backlink verification
src/pages/dashboard/HomeownerDashboard.tsx
src/pages/dashboard/ReportViewer.tsx
src/pages/dashboard/SchedulePage.tsx
src/pages/dashboard/ChecklistPage.tsx
src/pages/realtor/RealtorDashboard.tsx
src/pages/admin/AdminDashboard.tsx
src/pages/admin/NewJobPage.tsx
src/pages/admin/ReportGeneratorPage.tsx — Scout AI (Claude API)
src/pages/TrustedRealtorsPage.tsx
supabase/schema.sql                    — All 5 tables + RLS policies
supabase/functions/verify-backlink/    — Edge Function: checks do-follow link
supabase/functions/generate-report/   — Edge Function: calls Claude API
```
