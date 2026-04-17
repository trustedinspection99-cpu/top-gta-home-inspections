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

  // List all sites this service account has access to
  const res = await httpsRequest({
    hostname: 'www.googleapis.com',
    path: '/webmasters/v3/sites',
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token }
  });

  console.log('HTTP Status:', res.status);
  console.log('Sites response:');
  const data = JSON.parse(res.body);
  if (data.siteEntry) {
    data.siteEntry.forEach(site => {
      console.log(`  siteUrl: ${site.siteUrl} | permissionLevel: ${site.permissionLevel}`);
    });
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

main().catch(console.error);
