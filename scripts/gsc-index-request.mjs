import https from 'https';
import crypto from 'crypto';
import { readFileSync } from 'fs';

// Load service account key file
const KEY_FILE = 'C:/Users/Owner/Downloads/steam-potential-222816-7e7efe9a022c.json';
const sa = JSON.parse(readFileSync(KEY_FILE, 'utf8'));

const SITE = 'https://www.asads.ca/';

const URLS = [
  'https://www.asads.ca/what-we-find',
  'https://www.asads.ca/services/insurance-home-inspection',
  'https://www.asads.ca/services/termite-inspection',
  'https://www.asads.ca/for-first-time-buyers',
  'https://www.asads.ca/environmental-screening',
  'https://www.asads.ca/bundled-inspection',
  'https://www.asads.ca/sample-report',
  'https://www.asads.ca/our-promise'
];

function base64url(str) {
  return Buffer.from(str).toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function makeJWT(scope) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({
    iss: sa.client_email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }));
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(header + '.' + payload);
  const sig = sign.sign(sa.private_key, 'base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return header + '.' + payload + '.' + sig;
}

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function getToken(scope) {
  const jwt = makeJWT(scope);
  const body = 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + jwt;
  return httpsRequest({
    hostname: 'oauth2.googleapis.com',
    path: '/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body).then(res => {
    const parsed = JSON.parse(res.body);
    if (parsed.access_token) return parsed.access_token;
    throw new Error('Token error: ' + res.body);
  });
}

function inspectUrl(token, url) {
  const body = JSON.stringify({ inspectionUrl: url, siteUrl: SITE });
  return httpsRequest({
    hostname: 'searchconsole.googleapis.com',
    path: '/v1/urlInspection/index:inspect',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);
}

function requestIndexing(token, url) {
  const body = JSON.stringify({ url, type: 'URL_UPDATED' });
  return httpsRequest({
    hostname: 'indexing.googleapis.com',
    path: '/v3/urlNotifications:publish',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  // Get tokens for both scopes
  const gscToken = await getToken('https://www.googleapis.com/auth/webmasters');
  const indexingToken = await getToken('https://www.googleapis.com/auth/indexing');
  console.log('Tokens acquired (GSC + Indexing API).\n');

  // First: debug - show raw response for first URL
  console.log('--- DEBUG: Raw inspection response for first URL ---');
  const debugRes = await inspectUrl(gscToken, URLS[0]);
  console.log('HTTP Status:', debugRes.status);
  console.log('Raw body (first 500 chars):', debugRes.body.substring(0, 500));
  console.log('---\n');

  const results = { alreadyIndexed: [], indexingSubmitted: [], indexingFailed: [], inspectionFailed: [] };

  for (const url of URLS) {
    console.log(`Inspecting: ${url}`);
    try {
      const res = await inspectUrl(gscToken, url);
      const data = JSON.parse(res.body);

      if (res.status !== 200) {
        console.log(`  INSPECTION ERROR (HTTP ${res.status}): ${res.body.substring(0, 200)}`);
        results.inspectionFailed.push({ url, error: res.body.substring(0, 200) });
        await delay(600);
        continue;
      }

      const ir = data?.inspectionResult?.indexStatusResult || {};
      const verdict = ir.verdict || 'UNKNOWN';
      const coverageState = ir.coverageState || 'N/A';
      const lastCrawlTime = ir.lastCrawlTime || 'never crawled';

      const isIndexed = verdict === 'PASS';

      console.log(`  Verdict:      ${verdict}${isIndexed ? ' -- ALREADY INDEXED' : ' -- NOT INDEXED'}`);
      console.log(`  Coverage:     ${coverageState}`);
      console.log(`  Last Crawl:   ${lastCrawlTime}`);

      if (isIndexed) {
        results.alreadyIndexed.push(url);
        console.log(`  -> No action needed.\n`);
      } else {
        // Attempt indexing via Indexing API
        console.log(`  -> Requesting indexing via Indexing API...`);
        try {
          const idxRes = await requestIndexing(indexingToken, url);
          const idxData = JSON.parse(idxRes.body);

          if (idxRes.status === 200) {
            console.log(`  -> INDEXING SUBMITTED successfully.`);
            console.log(`     notifyTime: ${idxData.urlNotificationMetadata?.latestUpdate?.notifyTime || 'N/A'}`);
            results.indexingSubmitted.push(url);
          } else {
            const errMsg = idxData?.error?.message || idxRes.body.substring(0, 200);
            const errCode = idxData?.error?.code || idxRes.status;
            console.log(`  -> INDEXING FAILED (${errCode}): ${errMsg}`);
            results.indexingFailed.push({ url, error: `${errCode}: ${errMsg}` });
          }
        } catch (idxErr) {
          console.log(`  -> INDEXING ERROR: ${idxErr.message}`);
          results.indexingFailed.push({ url, error: idxErr.message });
        }
        console.log('');
      }
    } catch(e) {
      console.log(`  EXCEPTION: ${e.message}\n`);
      results.inspectionFailed.push({ url, error: e.message });
    }
    await delay(700);
  }

  // Summary
  console.log('='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`\nAlready Indexed (${results.alreadyIndexed.length}):`);
  results.alreadyIndexed.forEach(u => console.log(`  + ${u}`));

  console.log(`\nIndexing Successfully Submitted (${results.indexingSubmitted.length}):`);
  results.indexingSubmitted.forEach(u => console.log(`  -> ${u}`));

  console.log(`\nIndexing Failed (${results.indexingFailed.length}):`);
  results.indexingFailed.forEach(r => console.log(`  x ${r.url}: ${r.error}`));

  console.log(`\nInspection Failed (${results.inspectionFailed.length}):`);
  results.inspectionFailed.forEach(r => console.log(`  ? ${r.url}: ${r.error}`));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
