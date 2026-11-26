// What a client should expect for each service, shown in the "booking request received" email.
// Prices: owner rate card, confirmed 2026-11-12 (all plus 13% HST). Radon is left unpriced:
// the website shows two different starting prices, so the price is confirmed on the call.
// Owner rule (2026-11-25): bookings are REQUESTS until ASADS confirms a date by phone or email.

type Details = { title: string; price: string[]; expect: string[] };

const LAB_PAYMENT = 'Payment is due when your report is ready, by Interac e-Transfer.';

const HOME = (label: string): Details => ({
  title: label,
  price: ['$450 for homes up to 2,000 sq ft, plus $50 for each additional 500 sq ft.'],
  expect: [
    'The inspection usually takes 2 to 3 hours, depending on the size and age of the home.',
    'Please make sure we can reach the electrical panel, furnace, water heater, attic hatch and all rooms.',
    'You are welcome to attend, especially for the last 30 minutes, when we walk you through the findings.',
    'Your photo report is usually emailed the same day.',
  ],
});

const TABLE: Record<string, Details> = {
  'pre-purchase': HOME('Pre-Purchase Home Inspection'),
  'pre-listing': HOME('Pre-Listing Inspection'),
  'condo': {
    title: 'Condo Inspection',
    price: ['$399.'],
    expect: [
      'Please arrange access to the unit, and to the locker and parking spot if they are included.',
      'Your photo report is usually emailed the same day.',
    ],
  },
  'new-construction': {
    title: 'New Construction / PDI Inspection',
    price: ['$450.'],
    expect: [
      'Please confirm the builder\'s PDI date and time with us as early as possible, since PDI slots are set by the builder.',
      'We check the home against Tarion standards and help you list deficiencies before you sign.',
      'Your photo report is usually emailed the same day.',
    ],
  },
  'forensic': {
    title: 'Forensic / Renovation Inspection',
    price: ['$450.'],
    expect: [
      'Please tell us about the problem or the renovation work before the visit, and have any drawings, permits or contractor quotes ready.',
      'Your photo report is usually emailed the same day.',
    ],
  },
  'wett': {
    title: 'WETT Inspection',
    price: ['$350 for the first wood-burning appliance or fireplace, plus $300 for each additional one.'],
    expect: [
      'Please do not use the fireplace or stove for at least 24 hours before the visit, so it is cool enough to inspect.',
      'Please make sure we can reach the appliance, the chimney (including the attic and roof area, if accessible) and any clearance areas.',
      'Your WETT report is usually emailed the same day, ready to send to your insurance company.',
    ],
  },
  'mold': {
    title: 'Mould Inspection',
    price: [
      'Visual mould inspection: $350.',
      'If air sampling is needed, it is $350 for the visit plus $150 per air sample. We always take at least one outdoor and one indoor sample (minimum $650). The inspector decides the number of indoor samples on site, based on the size, layout and problem.',
    ],
    expect: [
      'Please do not clean, paint over or disturb the affected areas before the visit.',
      'Keep windows closed and avoid running air purifiers for 12 hours before air sampling, if possible.',
      'Laboratory results usually take about one week. ' + LAB_PAYMENT,
    ],
  },
  'air-quality': {
    title: 'Air Quality Testing',
    price: [
      '$350 for the visit plus $150 per air sample.',
      'We always take at least one outdoor and one indoor sample (minimum $650). The inspector decides the number of indoor samples on site, based on the size, layout and problem.',
    ],
    expect: [
      'Keep windows and doors closed as much as possible, and do not run air purifiers, for 12 hours before the visit.',
      'Please do not clean or disturb any areas of concern before the visit.',
      'Laboratory results usually take about one week. ' + LAB_PAYMENT,
    ],
  },
  'asbestos': {
    title: 'Asbestos Testing',
    price: ['$350 for the visit plus $110 for each sample analysed by the laboratory.'],
    expect: [
      'Please do not touch, cut or remove any suspect material before the visit. Our inspector takes the samples safely.',
      'Make a list of the materials you are concerned about (for example ceiling texture, floor tiles, pipe wrap, vermiculite insulation). The inspector will advise how many samples are needed.',
      'Laboratory results usually take about one week. ' + LAB_PAYMENT,
    ],
  },
  'lead': {
    title: 'Lead Paint Testing',
    price: ['$299 plus the laboratory fee.'],
    expect: [
      'Please do not sand, scrape or disturb painted surfaces before the visit.',
      'Laboratory results usually take about one week. ' + LAB_PAYMENT,
    ],
  },
  'water': {
    title: 'Well Water / Water Testing',
    price: ['$299 plus the laboratory fee.'],
    expect: [
      'Please do not use water treatment or chlorinate the well for at least 48 hours before sampling.',
      'Laboratory results usually take a few days to one week. ' + LAB_PAYMENT,
    ],
  },
  'radon': {
    title: 'Radon Testing',
    price: ['We will confirm the price with you when we call to schedule.'],
    expect: [
      'Radon testing needs two visits: one to set up the test device and one to collect it.',
      'Keep windows and doors closed as much as possible while the test is running.',
    ],
  },
  'thermal': {
    title: 'Thermal Imaging',
    price: ['$150 when added to an inspection, or $350 on its own.'],
    expect: ['Thermal imaging works best when there is a temperature difference between inside and outside, so we may suggest a time of day.'],
  },
  'commercial': {
    title: 'Commercial Inspection',
    price: ['From $749. Commercial inspections are quoted per building, based on size, number of units and use.'],
    expect: ['Please have the building size, number of units and any drawings or past reports ready when we call.'],
  },
};

export function serviceKey(service: string): string | null {
  const s = (service || '').toLowerCase();
  if (s.includes('wett')) return 'wett';
  if (s.includes('asbestos')) return 'asbestos';
  if (s.includes('air quality')) return 'air-quality';
  if (s.includes('mold') || s.includes('mould')) return 'mold';
  if (s.includes('radon')) return 'radon';
  if (s.includes('lead')) return 'lead';
  if (s.includes('water')) return 'water';
  if (s.includes('thermal')) return 'thermal';
  if (s.includes('commercial')) return 'commercial';
  if (s.includes('condo')) return 'condo';
  if (s.includes('new construction') || s.includes('pdi') || s.includes('pre-delivery')) return 'new-construction';
  if (s.includes('forensic') || s.includes('renovation')) return 'forensic';
  if (s.includes('pre-listing')) return 'pre-listing';
  if (s.includes('pre-purchase') || s.includes('home inspection')) return 'pre-purchase';
  return null;
}

const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const list = (items: string[]) => '<ul style="margin:6px 0 16px;padding-left:20px">' + items.map((i) => `<li style="margin:4px 0">${esc(i)}</li>`).join('') + '</ul>';

/** HTML block: not-yet-confirmed notice, then price and what to expect for the booked service. */
export function bookingDetailsHtml(service: string): string {
  const key = serviceKey(service);
  const d = key ? TABLE[key] : null;
  const notice = `<div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:14px 16px;margin:16px 0">
<p style="margin:0 0 6px;font-weight:700;color:#92400e">Your appointment is not confirmed yet</p>
<p style="margin:0;color:#78350f">We schedule inspections by area, on set days for each city. We will call or email you within one business day to confirm a date and time that fits our route for your area. If your preferred date is not available, we will offer the closest one.</p>
</div>`;
  if (!d) return notice;
  return notice +
    `<p style="margin:16px 0 4px;font-weight:700">${esc(d.title)}: price</p>` + list([...d.price, 'All prices are plus 13% HST.']) +
    `<p style="margin:8px 0 4px;font-weight:700">What to expect</p>` + list(d.expect);
}
