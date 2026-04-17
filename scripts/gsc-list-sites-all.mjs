import https from 'https';
import crypto from 'crypto';
import { readFileSync } from 'fs';

const KEY_FILE = 'C:/Users/Owner/Downloads/steam-potential-222816-7e7efe9a022c.json';
const sa = JSON.parse(readFileSync(KEY_FILE, 'utf8'));

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

async function main() {
  const token = await getToken('https://www.googleapis.com/auth/webmasters.readonly');

  console.log('Service account:', sa.client_email);
  console.log('');

  // List all sites this service account has access to
  const res = await httpsRequest({
    hostname: 'www.googleapis.com',
    path: '/webmasters/v3/sites',
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token }
  });

  console.log('GSC Sites accessible to this service account:');
  const data = JSON.parse(res.body);
  if (data.siteEntry && data.siteEntry.length > 0) {
    data.siteEntry.forEach(site => {
      console.log(`  siteUrl: ${site.siteUrl}`);
      console.log(`  permissionLevel: ${site.permissionLevel}`);
      console.log('');
    });
  } else {
    console.log('No sites found or error:');
    console.log(JSON.stringify(data, null, 2));
  }

  // Also try inspecting a URL with sc-domain:asads.ca
  console.log('Testing URL inspection with sc-domain:asads.ca...');
  const body2 = JSON.stringify({
    inspectionUrl: 'https://www.asads.ca/',
    siteUrl: 'sc-domain:asads.ca'
  });
  const token2 = await getToken('https://www.googleapis.com/auth/webmasters');
  const res2 = await httpsRequest({
    hostname: 'searchconsole.googleapis.com',
    path: '/v1/urlInspection/index:inspect',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token2,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body2)
    }
  }, body2);
  console.log(`sc-domain:asads.ca response (HTTP ${res2.status}):`);
  console.log(res2.body.substring(0, 300));
}

main().catch(console.error);
