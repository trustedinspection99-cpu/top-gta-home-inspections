import { createClient } from '@supabase/supabase-js';

// Supabase anon key is public by design — safe to include in client code
const SUPABASE_URL = 'https://wjxbojjhyocrxqkfnxmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeGJvampoeW9jcnhxa2ZueG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTY3NzMsImV4cCI6MjA4OTc3Mjc3M30.-QlS8qmiGs5cqlUOZP5_iMGbBoPyeimXhLOU6lwO-fQ';

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
  homeowner_id: string | null;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  address: string;
  city: string;
  inspection_type: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_at: string | null;
  completed_at: string | null;
  created_at?: string | null;
}

export type ReportStatus = 'saved' | 'sent' | 'paid' | 'visible';

export interface DbReport {
  id: string;
  job_id: string;
  storage_url: string;
  status: ReportStatus;
  generated_at: string;
  sent_at: string | null;
  paid_at: string | null;
  report_data: any | null;
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

export interface DbRankTracking {
  id: string;
  checked_at: string;
  keyword: string;
  city: string;
  service: string;
  position: number | null;
  url_ranked: string | null;
  previous_position: number | null;
}

export type OutreachStatus = 'pending' | 'sent' | 'replied' | 'listed';

export interface DbOutreach {
  id: string;
  name: string;
  email: string;
  city: string | null;
  agency: string | null;
  website: string | null;
  status: OutreachStatus;
  sent_at: string | null;
  opened_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface DbConversationLog {
  id: string;
  session_id: string;
  started_at: string;
  ended_at: string | null;
  messages: { role: string; content: string }[];
  booked: boolean;
  service_type: string | null;
  city: string | null;
  address: string | null;
  client_name: string | null;
  client_email: string | null;
  client_phone: string | null;
  reason_not_booked: string | null;
  inspection_date: string | null;
  price: string | null;
}
