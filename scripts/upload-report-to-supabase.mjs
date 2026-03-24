// Upload the locally-generated report to Supabase Storage
// Photos are uploaded individually, file:// refs replaced with public URLs
// Run: node scripts/upload-report-to-supabase.mjs
//
// After running, copy the "Report URL" and paste into the admin dashboard
// "Attach Report" modal for the matching job.

import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://wjxbojjhyocrxqkfnxmz.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeGJvampoeW9jcnhxa2ZueG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTY3NzMsImV4cCI6MjA4OTc3Mjc3M30.-QlS8qmiGs5cqlUOZP5_iMGbBoPyeimXhLOU6lwO-fQ';
const BUCKET = 'Reports';
const FOLDER = 'inspections/23-seed-house-lane';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function uploadFile(localPath, storageName, contentType, retries = 3) {
  const data = fs.readFileSync(localPath);
  const key = `${FOLDER}/${storageName}`;
  const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${key}`;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ANON_KEY}`,
          'Content-Type': contentType,
          'x-upsert': 'true',
        },
        body: data,
      });
      if (!res.ok) {
        const err = await res.text();
        // If duplicate key error (already exists), treat as success
        if (err.includes('already exists') || err.includes('duplicate')) {
          return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key}`;
        }
        throw new Error(err);
      }
      return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key}`;
    } catch (e) {
      if (attempt < retries) {
        await sleep(1500 * attempt);
      } else {
        throw e;
      }
    }
  }
}

async function main() {
  const htmlFile = path.join(process.cwd(), 'report-23-seed-house-lane.html');
  if (!fs.existsSync(htmlFile)) {
    console.error('❌ report-23-seed-house-lane.html not found. Run generate-report-now.mjs first.');
    process.exit(1);
  }

  // Prefer the partially-updated web version if it exists (picks up from previous run)
  const webFile2 = path.join(process.cwd(), 'report-23-seed-house-lane-web.html');
  const sourceFile = fs.existsSync(webFile2) ? webFile2 : htmlFile;
  console.log(`📖 Reading: ${path.basename(sourceFile)}`);
  let html = fs.readFileSync(sourceFile, 'utf8');

  // Find all unique file:// photo references
  const refs = [...new Set((html.match(/file:\/\/\/[^"]+/g) || []))];
  console.log(`📷 Found ${refs.length} photo references\n`);

  let uploaded = 0;
  for (const ref of refs) {
    // Convert file:///C:/Users/... → C:/Users/...
    const localPath = ref.replace(/^file:\/\/\//, '');
    if (!fs.existsSync(localPath)) {
      console.warn(`  ⚠ Skipping (not found): ${localPath}`);
      continue;
    }
    const fileName = path.basename(localPath);
    process.stdout.write(`  Uploading ${fileName}... `);
    try {
      const publicUrl = await uploadFile(localPath, fileName, 'image/jpeg');
      html = html.replaceAll(ref, publicUrl);
      console.log('✓');
      uploaded++;
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
  }

  console.log(`\n✅ ${uploaded}/${refs.length} photos uploaded`);
  console.log('📤 Uploading HTML report...');

  // Write the web version (with Supabase photo URLs) locally too
  const webFile = path.join(process.cwd(), 'report-23-seed-house-lane-web.html');
  fs.writeFileSync(webFile, html, 'utf8');

  // Upload HTML to storage
  const htmlKey = `${FOLDER}/report.html`;
  const htmlData = Buffer.from(html, 'utf8');
  let htmlOk = false;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const htmlRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${htmlKey}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ANON_KEY}`,
          'Content-Type': 'text/html',
          'x-upsert': 'true',
        },
        body: htmlData,
      });
      if (!htmlRes.ok) {
        const err = await htmlRes.text();
        if (err.includes('already exists') || err.includes('duplicate')) { htmlOk = true; break; }
        throw new Error(err);
      }
      htmlOk = true;
      break;
    } catch (e) {
      if (attempt < 4) { console.log(`  Retrying HTML upload (attempt ${attempt + 1})...`); await sleep(2000 * attempt); }
      else { console.error('❌ HTML upload failed:', e.message); process.exit(1); }
    }
  }

  const reportUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${htmlKey}`;

  console.log('\n' + '═'.repeat(60));
  console.log('✅ REPORT UPLOADED SUCCESSFULLY');
  console.log('═'.repeat(60));
  console.log('\nReport URL (copy this):');
  console.log(reportUrl);
  console.log('\nNext steps:');
  console.log('1. Go to the Admin Dashboard: https://www.asads.ca/admin');
  console.log('2. Find the job for 23 Seed House Lane (or create it via "New Job")');
  console.log('3. Click "Attach Report" on that job row');
  console.log('4. Paste the Report URL above');
  console.log('5. Click Save — report status will be "sent"');
  console.log('6. Once client pays, click "Mark Paid" → client can view it');
  console.log('═'.repeat(60) + '\n');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
