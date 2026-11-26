// Sends one REAL test booking per form type and per service category to the owner's inbox (owner request 2026-11-25),
// using exactly the payload shape each form sends (shapes captured by scripts/test-booking-forms.mjs).
// Every request is named "TEST ..." so it can be ignored in booking counts.
// Usage: node scripts/send-test-bookings.mjs
import { readFileSync } from 'fs';

const KEY = readFileSync('src/pages/Booking.tsx', 'utf8').match(/Bearer (eyJ[A-Za-z0-9._-]+)/)[1];
const FN = 'https://wjxbojjhyocrxqkfnxmz.supabase.co/functions/v1/';
const EMAIL = 'haroon4951@hotmail.com';
const FAR = '2026-12-10', NEAR = '2026-11-27';

const tests = [
  // [function, form shape, payload]
  ['save-booking', 'Booking page wizard', { service: 'Pre-Purchase Home Inspection', name: 'TEST O’Brien (booking page)', phone: '6478019311', email: EMAIL, city: 'Toronto', address: '12 St. John’s Rd', property_type: 'Detached', preferred_date: 'December 10th, 2026', preferred_time: '10:00 AM' }],
  ['save-booking', 'Homepage form', { service: 'Condo Inspection — From $399', name: 'TEST (homepage)', phone: '6478019311', email: EMAIL, city: 'Mississauga', preferred_date: FAR, preferred_time: '8:00 AM' }],
  ['save-booking', 'Hero box: pre-listing', { service: 'Pre-Listing Inspection', name: 'TEST (hero pre-listing)', phone: '6478019311', email: EMAIL, city: 'Toronto', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: asbestos', { service: 'Asbestos Testing', name: 'TEST (hero asbestos)', phone: '6478019311', email: EMAIL, city: 'Toronto', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: WETT', { service: 'WETT Inspection', name: 'TEST (hero WETT)', phone: '6478019311', email: EMAIL, city: 'Toronto', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: mould (NEAR DATE)', { service: 'Mold Inspection', name: 'TEST (hero mould, date in 2 days)', phone: '6478019311', email: EMAIL, city: 'Mississauga', address: '1 Test St', preferred_date: NEAR }],
  ['save-booking', 'Hero box: air quality', { service: 'Air Quality Testing', name: 'TEST (hero air quality)', phone: '6478019311', email: EMAIL, city: 'Oakville', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: radon', { service: 'Radon Testing', name: 'TEST (hero radon)', phone: '6478019311', email: EMAIL, city: 'Peterborough', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: lead paint', { service: 'Lead Paint Testing', name: 'TEST (hero lead)', phone: '6478019311', email: EMAIL, city: 'Hamilton', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: well water', { service: 'Well Water Testing', name: 'TEST (hero well water)', phone: '6478019311', email: EMAIL, city: 'Caledon', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: new construction', { service: 'New Construction Inspection', name: 'TEST (hero new construction)', phone: '6478019311', email: EMAIL, city: 'Milton', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: commercial', { service: 'Commercial Inspection', name: 'TEST (hero commercial)', phone: '6478019311', email: EMAIL, city: 'Cambridge', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: forensic', { service: 'Forensic Renovation Inspection', name: 'TEST (hero forensic)', phone: '6478019311', email: EMAIL, city: 'Guelph', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Hero box: thermal', { service: 'Thermal Imaging (Standalone)', name: 'TEST (hero thermal)', phone: '6478019311', email: EMAIL, city: 'Kitchener', address: '1 Test St', preferred_date: FAR }],
  ['save-booking', 'Inline form (no email field)', { service: 'Pre-Listing Inspection', name: 'TEST (inline form, no email field)', phone: '6478019311', email: '', city: 'Toronto', preferred_date: FAR }],
  ['send-booking-confirmation', 'Chat assistant Asad', { address: '1 Test St', city: 'Toronto', inspection_type: 'Pre-Listing Inspection', preferred_date: FAR, client_name: 'TEST (chat assistant)', client_phone: '6478019311', client_email: EMAIL, total_price: '$450' }],
];

for (const [fn, label, body] of tests) {
  const res = await fetch(FN + fn, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + KEY }, body: JSON.stringify({ ...body, came_from: { source: 'direct', booked_on: 'system test', form: label } }) });
  const text = (await res.text()).slice(0, 80);
  console.log(`${res.ok ? 'OK  ' : 'FAIL'} ${res.status}  ${label.padEnd(32)} ${body.service || body.inspection_type}  ${text}`);
  await new Promise((r) => setTimeout(r, 1200)); // gentle on the email provider
}
