// One-shot: create job + report record in Supabase for 23 Seed House Lane
// Run: node scripts/attach-report-to-db.mjs
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wjxbojjhyocrxqkfnxmz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeGJvampoeW9jcnhxa2ZueG16Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE5Njc3MywiZXhwIjoyMDg5NzcyNzczfQ.Wt0JGTsb8Hmf8C_Y3_QTr4SNI8bP6yZZu2bF-sIdFBs';
const REPORT_URL = 'https://wjxbojjhyocrxqkfnxmz.supabase.co/storage/v1/object/public/Reports/inspections/23-seed-house-lane/report.html';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function main() {
  console.log('Checking for existing job at 23 Seed House Lane...');

  // Check if job already exists
  const { data: existing } = await supabase
    .from('jobs')
    .select('id, client_name, client_email, status')
    .eq('address', '23 Seed House Lane')
    .maybeSingle();

  let jobId;

  if (existing?.id) {
    jobId = existing.id;
    console.log(`✓ Found existing job: ${jobId} (${existing.client_name} · ${existing.client_email})`);

    // Update to completed
    const { error } = await supabase.from('jobs')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', jobId);
    if (error) { console.error('Failed to update job:', error.message); process.exit(1); }
    console.log('✓ Job marked completed');
  } else {
    console.log('  No existing job found — creating...');
    const { data: newJob, error } = await supabase.from('jobs').insert({
      address: '23 Seed House Lane',
      city: 'Georgetown, ON L7G 6K9',
      inspection_type: 'Pre-Purchase Home Inspection',
      client_name: 'Client — Update in Dashboard',
      client_email: 'update@asads.ca',
      homeowner_id: null,
      status: 'completed',
      scheduled_at: '2026-03-24T10:00:00',
      completed_at: new Date().toISOString(),
    }).select('id').single();

    if (error) { console.error('Failed to create job:', error.message); process.exit(1); }
    jobId = newJob.id;
    console.log(`✓ Job created: ${jobId}`);
    console.log('  ⚠ Update client_name and client_email in the admin dashboard!');
  }

  // Check for existing report
  const { data: existingReport } = await supabase
    .from('reports')
    .select('id, status')
    .eq('job_id', jobId)
    .maybeSingle();

  if (existingReport?.id) {
    const { error } = await supabase.from('reports')
      .update({ storage_url: REPORT_URL, status: 'sent', generated_at: new Date().toISOString() })
      .eq('id', existingReport.id);
    if (error) { console.error('Failed to update report:', error.message); process.exit(1); }
    console.log(`✓ Report updated (id: ${existingReport.id})`);
  } else {
    const { data: newReport, error } = await supabase.from('reports')
      .insert({ job_id: jobId, storage_url: REPORT_URL, status: 'sent', report_data: null })
      .select('id').single();
    if (error) { console.error('Failed to create report:', error.message); process.exit(1); }
    console.log(`✓ Report created (id: ${newReport.id})`);
  }

  console.log('\n' + '═'.repeat(55));
  console.log('✅ ALL DONE');
  console.log('═'.repeat(55));
  console.log('Job ID:', jobId);
  console.log('Status: completed | Report: sent');
  console.log('\nAdmin dashboard: https://www.asads.ca/admin');
  console.log('→ Update client name + email on the job');
  console.log('→ Click "Mark Paid" once payment received');
  console.log('  Client will then see "View Report" on their dashboard');
  console.log('═'.repeat(55));
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
