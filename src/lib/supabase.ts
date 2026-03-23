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
  address: string;
  city: string;
  inspection_type: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_at: string | null;
  completed_at: string | null;
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
