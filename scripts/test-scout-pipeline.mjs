// End-to-end Scout pipeline test — runs twice with different sample properties
// Tests: edge function chat → summarize → JSON parse → HTML build → storage upload → DB insert
// Run: node scripts/test-scout-pipeline.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wjxbojjhyocrxqkfnxmz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeGJvampoeW9jcnhxa2ZueG16Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDE5Njc3MywiZXhwIjoyMDg5NzcyNzczfQ.Wt0JGTsb8Hmf8C_Y3_QTr4SNI8bP6yZZu2bF-sIdFBs';
const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/generate-report`;
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeGJvampoeW9jcnhxa2ZueG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTY3NzMsImV4cCI6MjA4OTc3Mjc3M30.-QlS8qmiGs5cqlUOZP5_iMGbBoPyeimXhLOU6lwO-fQ';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ── Sample inspection conversations ──────────────────────────────────────────

const TEST_JOBS = [
  {
    address: '14 Maple Crescent',
    city: 'Brampton, ON L6Y 2R4',
    client_name: 'Test Client A',
    client_email: 'test-a@asads.ca',
    inspection_type: 'Pre-Purchase Home Inspection',
    // Simulated inspector voice notes → Scout conversation
    inspectorNotes: [
      "Starting exterior. Driveway has multiple cracks running across the surface, looks like freeze-thaw damage. Downspout at the front is discharging right against the foundation wall.",
      "Moving to the roof. Shingles look about 15 years old, granule loss visible, a few shingles are starting to curl at the edges. Flashings around the chimney look okay.",
      "Inside now. Main electrical panel is 100 amp, that's undersized for modern use. I see two double-tapped breakers. No GFCI in the main floor bathroom.",
      "Furnace is a 2008 Carrier, that's about 17 years old, approaching end of service life. Heat exchanger looks okay visually but it's old. Filter is dirty, needs replacement.",
      "Plumbing - main supply is copper, looks good. Under the kitchen sink there's an active slow drip from the P-trap joint. Water heater is 2015, still has some life left.",
      "Interior - staircase handrail is loose, wiggles when you grab it. Basement has evidence of past water intrusion along the east wall, there's white efflorescence on the block foundation. Smoke alarms present on all floors. No carbon monoxide alarm observed.",
      "Attic access - insulation is approximately R-20, below current code recommendations of R-60 for Ontario. Vapor barrier is intact. Ventilation looks adequate with soffit and ridge vents.",
      "Air conditioning - exterior unit is a 2012 Lennox, running and cooling properly. No issues noted.",
      "No fireplace on this property. Garage - overhead door operates properly, self-closing door to the house is present and functional.",
      "That's everything, generate report"
    ]
  },
  {
    address: '88 Birchwood Drive',
    city: 'Mississauga, ON L5B 1M2',
    client_name: 'Test Client B',
    client_email: 'test-b@asads.ca',
    inspection_type: 'Pre-Purchase Home Inspection',
    inspectorNotes: [
      "Exterior - brick veneer in good shape, no spalling or cracks. Grading slopes away from the foundation properly. Deck at the rear has soft boards near the ledger connection, showing wood rot. Guard rail on deck is wobbly.",
      "Roof is about 8 years old, shingles in good condition. Gutters are clean. No issues on the roof.",
      "Electrical panel is 200 amp, updated in 2018. Panel is clean and properly labeled. I found aluminum branch circuit wiring in two bedroom circuits - solid conductor aluminum. That's a safety concern. GFCI present at all wet locations.",
      "Heating - gas boiler, 2019 installation, looks new and clean. Baseboard radiators throughout, all functional. Venting looks proper.",
      "Plumbing - PEX supply lines throughout, newer install. All fixtures functional. Water heater is a 2020 Rheem, no issues. Sump pump present in basement, tested and operational.",
      "Interior - walls and ceilings look good throughout. Master bedroom window has a broken seal, visible condensation between the panes. Main staircase is solid, handrails secure. Smoke and CO alarms on all floors.",
      "Basement is fully finished. No signs of water intrusion. Insulation and vapor barrier not visible due to finished walls.",
      "Central AC - 2019 Lennox, matched system with the boiler. Operating properly during inspection.",
      "Fireplace - gas fireplace in living room. Inspected visually. Pilot light on, burner operational. Flue damper opens and closes. No WETT inspection performed as gas fireplace.",
      "That's everything, generate report"
    ]
  }
];

// ── Call Scout edge function ──────────────────────────────────────────────────

async function callScout(mode, messages, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ANON_KEY}`,
        'apikey': ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mode, messages }),
    });
    if (!res.ok) {
      const err = await res.text();
      if (attempt === retries) throw new Error(`Edge function ${res.status}: ${err}`);
      await new Promise(r => setTimeout(r, 1500 * attempt));
      continue;
    }
    return await res.json();
  }
}

// ── Build HTML inline (minimal version for test) ─────────────────────────────

function buildTestHtml(reportData, job) {
  const sections = reportData.sections.map(s => {
    const findings = s.findings.map(f => `
      <div style="border-left:4px solid ${f.priority==='P1'?'#dc2626':f.priority==='P2'?'#ea580c':f.priority==='P3'?'#ca8a04':'#16a34a'};padding:10px;margin:8px 0;background:#f9fafb;">
        <strong>[${f.priority}] ${f.location}</strong><br>
        ${f.observation}<br>
        <em>${f.recommendation}</em>
      </div>`).join('');
    return `<h3>${s.name}</h3>${findings}`;
  }).join('');

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>ASADS Test Report — ${job.address}</title>
  <style>body{font-family:Arial,sans-serif;max-width:900px;margin:0 auto;padding:24px;}</style>
  </head><body>
  <h1>ASADS Home Inspection Report</h1>
  <h2>${job.address}, ${job.city}</h2>
  <p><strong>Type:</strong> ${job.inspection_type} | <strong>Date:</strong> ${new Date().toLocaleDateString('en-CA')}</p>
  <hr>
  <h2>Summary</h2>
  <p>P1: ${reportData.summary.p1Count} | P2: ${reportData.summary.p2Count} | P3: ${reportData.summary.p3Count} | OK: ${reportData.summary.okCount}</p>
  <p>${reportData.summary.assessment}</p>
  <hr>
  ${sections}
  </body></html>`;
}

// ── Run one full test ─────────────────────────────────────────────────────────

async function runTest(testJob, testNum) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`TEST ${testNum}: ${testJob.address}`);
  console.log('═'.repeat(60));

  // 1. Simulate Scout conversation
  console.log('\n1. Simulating Scout chat conversation...');
  const messages = [];
  for (const note of testJob.inspectorNotes) {
    messages.push({ role: 'user', content: note });
    const chatResult = await callScout('chat', messages);
    if (!chatResult.reply) throw new Error('No reply from Scout chat');
    messages.push({ role: 'assistant', content: chatResult.reply });
    process.stdout.write('  💬 ');
  }
  console.log(`\n  ✓ ${messages.length} messages exchanged`);

  // 2. Generate report JSON (summarize)
  console.log('\n2. Calling summarize endpoint...');
  const summarizeResult = await callScout('summarize', messages);
  if (!summarizeResult.data) throw new Error(`Summarize failed: ${JSON.stringify(summarizeResult)}`);
  const reportData = summarizeResult.data;
  console.log(`  ✓ JSON received: ${reportData.sections?.length} sections`);
  console.log(`  ✓ Findings: P1=${reportData.summary.p1Count} P2=${reportData.summary.p2Count} P3=${reportData.summary.p3Count} OK=${reportData.summary.okCount}`);

  // 3. Validate JSON structure
  console.log('\n3. Validating JSON structure...');
  if (!reportData.summary || !Array.isArray(reportData.sections)) throw new Error('Invalid JSON structure');
  if (reportData.sections.length === 0) throw new Error('No sections in report');
  const totalFindings = reportData.sections.reduce((n, s) => n + s.findings.length, 0);
  if (totalFindings === 0) throw new Error('No findings in report');
  console.log(`  ✓ ${totalFindings} total findings across ${reportData.sections.length} sections`);

  // 4. Build HTML
  console.log('\n4. Building HTML report...');
  const html = buildTestHtml(reportData, testJob);
  console.log(`  ✓ HTML built: ${(html.length / 1024).toFixed(1)} KB`);

  // 5. Create job in DB
  console.log('\n5. Creating job record...');
  const { data: jobRow, error: jobErr } = await supabase.from('jobs').insert({
    address: testJob.address,
    city: testJob.city,
    client_name: testJob.client_name,
    client_email: testJob.client_email,
    inspection_type: testJob.inspection_type,
    status: 'completed',
    scheduled_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
    homeowner_id: null,
  }).select('id').single();
  if (jobErr) throw new Error('Job insert failed: ' + jobErr.message);
  console.log(`  ✓ Job created: ${jobRow.id}`);

  // 6. Upload HTML to storage
  console.log('\n6. Uploading HTML to Supabase Storage...');
  const fileName = `test-reports/test-${testNum}-${Date.now()}.html`;
  const blob = Buffer.from(html, 'utf8');
  const { error: storageErr } = await supabase.storage.from('Reports')
    .upload(fileName, blob, { contentType: 'text/html', upsert: true });
  if (storageErr) throw new Error('Storage upload failed: ' + storageErr.message);
  const { data: { publicUrl } } = supabase.storage.from('Reports').getPublicUrl(fileName);
  console.log(`  ✓ Uploaded: ${publicUrl}`);

  // 7. Create report record
  console.log('\n7. Creating report record...');
  const { data: reportRow, error: reportErr } = await supabase.from('reports').insert({
    job_id: jobRow.id,
    storage_url: publicUrl,
    status: 'sent',
    report_data: reportData,
  }).select('id').single();
  if (reportErr) throw new Error('Report insert failed: ' + reportErr.message);
  console.log(`  ✓ Report created: ${reportRow.id}`);
  console.log(`  ✓ Status: sent | View at /dashboard/reports/${reportRow.id}`);

  // 8. Verify report is readable
  console.log('\n8. Verifying report is accessible...');
  const { data: verify } = await supabase.from('reports').select('id, status, storage_url').eq('id', reportRow.id).single();
  if (!verify) throw new Error('Cannot read back report from DB');
  const htmlRes = await fetch(verify.storage_url);
  if (!htmlRes.ok) throw new Error(`Storage URL returned ${htmlRes.status}`);
  console.log(`  ✓ Report readable from storage (${htmlRes.status})`);

  console.log(`\n✅ TEST ${testNum} PASSED — ${testJob.address}`);
  return { jobId: jobRow.id, reportId: reportRow.id, url: publicUrl };
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('ASADS Scout Pipeline — End-to-End Test');
  console.log('Testing: chat → summarize → JSON → HTML → storage → DB\n');

  const results = [];
  let passed = 0;

  for (let i = 0; i < TEST_JOBS.length; i++) {
    try {
      const result = await runTest(TEST_JOBS[i], i + 1);
      results.push({ ...result, status: 'PASSED', address: TEST_JOBS[i].address });
      passed++;
    } catch (e) {
      console.error(`\n❌ TEST ${i + 1} FAILED: ${e.message}`);
      results.push({ status: 'FAILED', address: TEST_JOBS[i].address, error: e.message });
    }
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`RESULTS: ${passed}/${TEST_JOBS.length} passed`);
  console.log('═'.repeat(60));
  for (const r of results) {
    if (r.status === 'PASSED') {
      console.log(`✅ ${r.address}`);
      console.log(`   Job: ${r.jobId}`);
      console.log(`   Report: ${r.reportId}`);
    } else {
      console.log(`❌ ${r.address} — ${r.error}`);
    }
  }

  // Cleanup test records
  console.log('\nCleaning up test records...');
  for (const r of results) {
    if (r.reportId) await supabase.from('reports').delete().eq('id', r.reportId);
    if (r.jobId) await supabase.from('jobs').delete().eq('id', r.jobId);
  }
  console.log('✓ Test records removed');
  console.log('\nDone.');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
