import { google } from 'googleapis';

const KEY_FILE = 'C:/Users/Owner/Downloads/steam-potential-222816-7e7efe9a022c.json';

const urls = [
  'https://www.asads.ca/what-we-find',
  'https://www.asads.ca/services/insurance-home-inspection',
  'https://www.asads.ca/services/termite-inspection',
  'https://www.asads.ca/for-first-time-buyers',
  'https://www.asads.ca/environmental-screening',
  'https://www.asads.ca/bundled-inspection',
  'https://www.asads.ca/sample-report',
  'https://www.asads.ca/our-promise',
];

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});
const client = await auth.getClient();
const indexing = google.indexing({ version: 'v3', auth: client });

for (const url of urls) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' }
    });
    console.log('✅', url);
  } catch(e) {
    console.log('❌', url, '->', e.message);
  }
}
