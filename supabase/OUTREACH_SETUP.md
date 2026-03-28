# Outreach System Setup

## 1. Create Supabase Table

Run this SQL in your Supabase dashboard → SQL Editor:

```sql
CREATE TABLE realtor_outreach (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  city text,
  agency text,
  website text,
  status text default 'pending' check (status in ('pending', 'sent', 'replied', 'listed')),
  sent_at timestamptz,
  notes text,
  created_at timestamptz default now()
);

-- Allow admin reads/writes (adjust RLS to match your existing policy)
ALTER TABLE realtor_outreach ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access" ON realtor_outreach
  FOR ALL USING (true);
```

## 2. Deploy the Edge Function

From the project root:

```bash
npx supabase login
npx supabase functions deploy send-realtor-outreach --project-ref wjxbojjhyocrxqkfnxmz
```

The RESEND_API_KEY secret is already set in your Supabase Vault (used by send-booking-confirmation).
The edge function reads it automatically — no extra setup needed.

## 3. Make a Sample Report Public

1. Go to Supabase Dashboard → Storage → Reports bucket
2. Find a completed report HTML file
3. Right-click → "Make Public" (or set bucket to public)
4. Copy the public URL (starts with: https://wjxbojjhyocrxqkfnxmz.supabase.co/storage/v1/object/public/...)
5. In your admin → Outreach page, click "Sample Report URL" and paste it

## 4. Start Outreach

Go to asads.ca/admin/outreach:
- Click "Add Prospect" to add a realtor (name, email, city, agency, website)
- Click "Send Email" to send a personalized outreach email
- Track responses with the status dropdown (pending → sent → replied → listed)
- When they sign up and get verified, their status becomes "listed"
