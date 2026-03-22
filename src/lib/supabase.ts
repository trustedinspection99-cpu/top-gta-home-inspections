import { createClient } from '@supabase/supabase-js';

// Supabase anon key is public by design — safe to include in client code
const SUPABASE_URL = 'https://wjxbojjhyocrxqkfnxmz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_-pj5yNpJls9G2smvI4NUAg_F855YcT8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database types
export type UserRole = 'homeowner' | 'realtor' | 'admin';

export interface DbUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phone: string | null;
  created_at: string;
}

export interface DbRealtor {
  id: string;
  user_id: string;
  agency: string;
  photo_url: string | null;
  domain: string;
  backlink_verified: boolean;
  listed: boolean;
  cities: string[];
}

export interface DbJob {
  id: string;
  homeowner_id: string;
  address: string;
  city: string;
  inspection_type: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_at: string | null;
  completed_at: string | null;
}

export interface DbReport {
  id: string;
  job_id: string;
  storage_url: string;
  generated_at: string;
}

export interface DbMaintenance {
  id: string;
  user_id: string;
  title: string;
  category: string;
  due_date: string | null;
  completed: boolean;
  property_address: string;
}
