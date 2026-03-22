import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '') as string;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '') as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing from build env.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

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
