export interface Finding {
  priority: 'P1' | 'P2' | 'P3' | 'OK';
  location: string;
  observation: string;
  implication: string;
  recommendation: string;
  photoUrls?: string[]; // optional per-finding photos
}

export interface ReportSection {
  name: string;
  icon?: string;
  findings: Finding[];
  satisfactory: string[];
}

export interface ReportData {
  summary: {
    p1Count: number;
    p2Count: number;
    p3Count: number;
    okCount: number;
    assessment: string;
  };
  propertyDetails?: Record<string, string>; // optional key/value pairs e.g. "Year Built": "1987"
  sections: ReportSection[];
  notInspected: { system: string; reason: string }[];
}

// ── Priority config ──────────────────────────────────────────────
const PRIORITY_BADGE: Record<string, string> = {
  P1: '🔴 Priority 1 — Unsafe / Urgent',
  P2: '🟠 Priority 2 — Significant Deficiency',
  P3: '🟡 Priority 3 — Monitor / Maintenance',
  OK: '✅ Satisfactory',
};

const PRIORITY_CLASS: Record<string, string> = {
  P1: 'p1', P2: 'p2', P3: 'p3', OK: 'ok',
};

const PRIORITY_LABEL: Record<string, string> = {
  P1: 'Unsafe / Urgent',
  P2: 'Significant Deficiency',
  P3: 'Monitor / Maintenance',
  OK: 'Satisfactory',
};

// ── Section icons ────────────────────────────────────────────────
const SECTION_ICONS: [string, string][] = [
  ['structural', '🏗️'],
  ['foundation', '🏗️'],
  ['exterior', '🌿'],
  ['roof', '🏠'],
  ['plumbing', '🚿'],
  ['electrical', '⚡'],
  ['heating', '🔥'],
  ['air conditioning', '❄️'],
  ['hvac', '❄️'],
  ['interior', '🛋️'],
  ['insulation', '🌡️'],
  ['ventilation', '🌡️'],
  ['fireplace', '🔥'],
  ['garage', '🚗'],
  ['deck', '🌳'],
  ['pool', '🏊'],
  ['septic', '🔩'],
];

function getSectionIcon(name: string, override?: string): string {
  if (override) return override;
  const lower = name.toLowerCase();
  for (const [key, icon] of SECTION_ICONS) {
    if (lower.includes(key)) return icon;
  }
  return '📋';
}

// ── Finding card title ───────────────────────────────────────────
function findingTitle(f: Finding): string {
  if (f.location && f.location.trim()) return f.location.trim();
  const obs = f.observation.replace(/^(Observed|Noted|Inspector observed)[,.\s]*/i, '').trim();
  const words = obs.split(' ').slice(0, 8).join(' ');
  return words.length < obs.length ? words + '…' : words;
}

// ── Inspector helpers ────────────────────────────────────────────
function getInspectorName(inspector: string): string {
  return inspector.split(/[—–-]/)[0].trim();
}

function getInitials(inspector: string): string {
  return getInspectorName(inspector)
    .split(' ')
    .filter(w => w.length > 0)
    .map(w => w[0].toUpperCase())
    .join('')
    .slice(0, 2);
}

function getReportRef(date: string, city: string): string {
  const d = date.replace(/-/g, '').slice(2); // YYMMDD
  const abbr = city.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
  return `ASADS-20${d}-${abbr || 'ONT'}`;
}

// ── Photo grid (real photos only + "+ Add Photo" button) ──────────
function photoGrid(realUrls: string[], _maxSlots = 10): string {
  const photoItems = realUrls.map((url, i) => `
        <div class="photo-item">
          <img src="${url}" style="width:100%;height:auto;display:block;" alt="Inspection photo ${i + 1}">
          <div class="photo-caption">Photo ${i + 1}</div>
        </div>`).join('');

  return `<div class="photo-grid mt16" data-max="10">${photoItems}</div>
      <button class="add-photo-btn no-print" onclick="addPhotoSlot(this.previousElementSibling)" title="Add another photo to this finding">📷 Add Photo</button>`;
}

// ── Single finding card ──────────────────────────────────────────
function findingCard(f: Finding, extraPhotos: string[] = []): string {
  const cls = PRIORITY_CLASS[f.priority] ?? 'ok';
  const badge = PRIORITY_BADGE[f.priority] ?? '';
  const title = findingTitle(f);
  const allPhotos = [...(f.photoUrls ?? []), ...extraPhotos];

  return `
      <div class="finding-card ${cls} avoid-break">
        <div class="finding-head">
          <span class="finding-title">${title}</span>
          <span class="badge badge-${cls}">${badge}</span>
        </div>
        <div class="finding-body">
          <p><strong>Observation:</strong> ${f.observation}</p>
          <p><strong>Implication:</strong> ${f.implication}</p>
          <div class="finding-rec"><strong>Recommendation:</strong> ${f.recommendation}</div>
          ${photoGrid(allPhotos, 10)}
        </div>
      </div>`;
}

// ── Section page ─────────────────────────────────────────────────
function sectionPage(
  section: ReportSection,
  fullAddress: string,
  inspectionDate: string,
  inspector: string,
  distributedPhotos: string[]
): string {
  const icon = getSectionIcon(section.name, section.icon);
  let photoIdx = 0;

  const findingsHtml = section.findings.map(f => {
    // Give each finding up to 3 extra photos from the distributed pool
    const extras: string[] = [];
    while (photoIdx < distributedPhotos.length && extras.length < 3) {
      extras.push(distributedPhotos[photoIdx++]);
    }
    return findingCard(f, extras);
  }).join('');

  const okHtml = section.satisfactory.length > 0 ? `
      <div class="notice green mt16">
        <div class="notice-title">✅ Satisfactory Items</div>
        <ul class="report-list mt8">
          ${section.satisfactory.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>` : '';

  // Only force a page break for sections that have actual deficiency findings;
  // OK-only sections flow after the previous section to avoid mostly-blank pages.
  const breakClass = section.findings.length > 0 ? 'page-break' : '';

  return `
<div class="page-wrap ${breakClass}">
  <div class="doc-header">
    <div class="doc-header-logo">🔍 ASADS Home Inspection</div>
    <div class="doc-header-info">${fullAddress} · ${inspectionDate}<br>Inspector: ${inspector}</div>
  </div>
  <div class="section-header">
    <span class="section-header-icon">${icon}</span>
    <h2>${section.name}</h2>
  </div>
  <div class="section-body">
    ${findingsHtml || ''}
    ${okHtml}
  </div>
</div>`;
}

// ── Table of Contents ────────────────────────────────────────────
function buildTOC(data: ReportData): string {
  const rows = data.sections.map(s => {
    const icon = getSectionIcon(s.name, s.icon);
    const counts = [
      s.findings.filter(f => f.priority === 'P1').length,
      s.findings.filter(f => f.priority === 'P2').length,
      s.findings.filter(f => f.priority === 'P3').length,
    ];
    const tags: string[] = [];
    if (counts[0]) tags.push(`<span class="badge badge-p1">${counts[0]} P1</span>`);
    if (counts[1]) tags.push(`<span class="badge badge-p2">${counts[1]} P2</span>`);
    if (counts[2]) tags.push(`<span class="badge badge-p3">${counts[2]} P3</span>`);
    if (!counts[0] && !counts[1] && !counts[2]) tags.push(`<span class="badge badge-ok">✅ OK</span>`);
    return `
      <li>
        <span>${icon} ${s.name}</span>
        <span>${tags.join(' ')}</span>
      </li>`;
  }).join('');

  return rows;
}

// ── Summary deficiencies table ───────────────────────────────────
function buildSummaryTable(data: ReportData): string {
  const allFindings: { section: string; f: Finding }[] = [];
  for (const s of data.sections) {
    for (const f of s.findings) {
      if (f.priority !== 'OK') allFindings.push({ section: s.name, f });
    }
  }
  if (allFindings.length === 0) return '';

  // Sort P1 → P2 → P3
  const order: Record<string, number> = { P1: 0, P2: 1, P3: 2 };
  allFindings.sort((a, b) => (order[a.f.priority] ?? 9) - (order[b.f.priority] ?? 9));

  const rows = allFindings.map(({ section, f }) => `
    <tr>
      <td><span class="badge badge-${PRIORITY_CLASS[f.priority]}">${f.priority} — ${PRIORITY_LABEL[f.priority]}</span></td>
      <td>${section}</td>
      <td>${findingTitle(f)}</td>
      <td style="font-size:12px;">${f.recommendation}</td>
    </tr>`).join('');

  return `
  <table class="summary-table">
    <thead>
      <tr>
        <th>Priority</th>
        <th>Section</th>
        <th>Item</th>
        <th>Recommendation</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

// ── Main builder ─────────────────────────────────────────────────
export function buildReportHtml(
  data: ReportData,
  job: { address: string; city: string; inspectionType: string; inspectionDate: string; inspector: string },
  photoUrls: string[]
): string {
  const reportDate = new Date().toLocaleDateString('en-CA');
  const fullAddress = `${job.address}${job.city ? ', ' + job.city : ''}`;

  // Distribute photos across sections proportionally
  const totalFindings = data.sections.reduce((acc, s) => acc + s.findings.length, 0);
  let globalPhotoIdx = 0;

  const sectionPages = data.sections.map(section => {
    // Allocate photos proportional to how many findings this section has
    const sectionShare = totalFindings > 0 && photoUrls.length > 0
      ? Math.round((section.findings.length / totalFindings) * photoUrls.length)
      : 0;
    const sectionPhotos = photoUrls.slice(globalPhotoIdx, globalPhotoIdx + sectionShare);
    globalPhotoIdx += sectionShare;
    return sectionPage(section, fullAddress, job.inspectionDate, job.inspector, sectionPhotos);
  }).join('');

  const notInspectedHtml = data.notInspected.length > 0 ? `
<div class="page-wrap page-break">
  <div class="doc-header">
    <div class="doc-header-logo">🔍 ASADS Home Inspection</div>
    <div class="doc-header-info">${fullAddress} · ${job.inspectionDate}</div>
  </div>
  <div class="section-header">
    <span class="section-header-icon">🚫</span>
    <h2>Systems Not Inspected</h2>
  </div>
  <div class="section-body">
    ${data.notInspected.map(n => `
    <div class="finding-card avoid-break" style="border-left:4px solid #6b7280;">
      <div class="finding-head">
        <span class="finding-title">${n.system}</span>
        <span class="badge badge-ni">⚪ Not Inspected</span>
      </div>
      <div class="finding-body">
        <p>${n.reason}</p>
      </div>
    </div>`).join('')}
  </div>
</div>` : '';

  const propertyDetailsHtml = data.propertyDetails && Object.keys(data.propertyDetails).length > 0
    ? `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px;">
        ${Object.entries(data.propertyDetails).map(([k, v]) => `
          <div style="background:var(--gray-bg);border-radius:8px;padding:12px 16px;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--gray);margin-bottom:4px;">${k}</div>
            <div style="font-weight:700;font-size:13.5px;">${v}</div>
          </div>`).join('')}
      </div>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>ASADS Home Inspection Report — ${fullAddress}</title>
<style>
  :root {
    --blue:    #1d4ed8;
    --blue-lt: #3b82f6;
    --blue-bg: #eff6ff;
    --red:     #dc2626;
    --red-bg:  #fef2f2;
    --orange:  #ea580c;
    --orange-bg:#fff7ed;
    --yellow:  #ca8a04;
    --yellow-bg:#fefce8;
    --green:   #16a34a;
    --green-bg:#f0fdf4;
    --gray:    #6b7280;
    --gray-bg: #f9fafb;
    --border:  #e5e7eb;
    --text:    #111827;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: var(--text); font-size: 13.5px; line-height: 1.65; background: #fff; }

  @page { margin: 0; }
  @media print {
    .no-print { display: none !important; }
    .page-break { page-break-before: always; }
    .avoid-break { page-break-inside: avoid; }
    body { font-size: 12px; }
    a { color: inherit; text-decoration: none; }
    .page-wrap { padding: 12mm 14mm; }
    .cover { padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .cover-header { padding: 20px 36px; }
    .cover-body { padding: 28px 36px 20px; justify-content: center; }
    .cover-footer { padding: 12px 36px; }
    /* Prevent section header bar from being orphaned at bottom of page */
    .section-header { page-break-after: avoid; }
    /* Allow satisfactory-items notice to split naturally so it doesn't create phantom blank pages */
    .finding-card { page-break-inside: avoid; margin-bottom: 10px; }
    .section-body { padding: 14px 18px; margin-bottom: 0; }
    .doc-header { margin-bottom: 16px; }
  }

  /* ── COVER ── */
  .cover { min-height: 100vh; display: flex; flex-direction: column; background: linear-gradient(160deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%); color: white; }
  .cover-header { display: flex; align-items: center; justify-content: space-between; padding: 28px 48px; border-bottom: 1px solid rgba(255,255,255,0.15); }
  .cover-logo { display: flex; align-items: center; gap: 14px; }
  .cover-logo-icon { width: 48px; height: 48px; background: var(--blue-lt); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .cover-logo-text { font-size: 20px; font-weight: 800; }
  .cover-logo-sub { font-size: 11px; color: #93c5fd; letter-spacing: 0.5px; }
  .cover-cert { text-align: right; font-size: 11px; color: #93c5fd; line-height: 1.8; }
  .cover-cert strong { color: white; }
  .cover-body { flex: 1; display: flex; flex-direction: column; padding: 40px 48px 28px; }
  .cover-photo-wrap { width: 3in; height: 3in; max-width: 100%; margin: 0 auto 24px; border-radius: 14px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); border: 3px solid rgba(255,255,255,0.2); }
  .cover-photo-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
  .cover-address-card { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 14px; padding: 26px 32px; max-width: 760px; margin: 0 auto; }
  .cover-report-type { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #93c5fd; font-weight: 700; margin-bottom: 6px; }
  .cover-address { font-size: 26px; font-weight: 800; line-height: 1.25; margin-bottom: 4px; }
  .cover-address-sub { font-size: 14px; color: #bfdbfe; margin-bottom: 22px; }
  .cover-meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.15); }
  .cover-meta-item label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #93c5fd; display: block; margin-bottom: 3px; }
  .cover-meta-item span { font-size: 13px; font-weight: 600; }
  .cover-footer { padding: 16px 48px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.15); font-size: 11px; color: #93c5fd; }

  /* ── PAGE LAYOUT ── */
  .page-wrap { max-width: 900px; margin: 0 auto; padding: 36px 48px; }
  .doc-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 2px solid var(--blue); margin-bottom: 28px; }
  .doc-header-logo { font-size: 14px; font-weight: 800; color: var(--blue); }
  .doc-header-info { font-size: 11px; color: var(--gray); text-align: right; line-height: 1.6; }
  .section-header { display: flex; align-items: center; gap: 12px; padding: 13px 20px; background: var(--blue); color: white; border-radius: 10px 10px 0 0; }
  .section-header-icon { font-size: 20px; }
  .section-header h2 { font-size: 16px; font-weight: 700; }
  .section-body { border: 1.5px solid var(--border); border-top: none; border-radius: 0 0 10px 10px; padding: 22px; margin-bottom: 32px; }

  /* ── BADGES ── */
  .badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
  .badge-p1 { background: #fef2f2; color: var(--red);    border: 1.5px solid #fca5a5; }
  .badge-p2 { background: #fff7ed; color: var(--orange); border: 1.5px solid #fed7aa; }
  .badge-p3 { background: #fefce8; color: var(--yellow); border: 1.5px solid #fde68a; }
  .badge-ok { background: #f0fdf4; color: var(--green);  border: 1.5px solid #86efac; }
  .badge-ni { background: #f9fafb; color: var(--gray);   border: 1.5px solid #e5e7eb; }

  /* ── SUMMARY BADGES ── */
  .brow { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 22px; }
  .sbadge { border-radius: 12px; padding: 18px 22px; text-align: center; flex: 1; min-width: 110px; border: 2px solid; }
  .sbadge .n { font-size: 48px; font-weight: 900; line-height: 1; }
  .sbadge .l { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }
  .sbadge.p1 { background: #fef2f2; border-color: #ef4444; color: #ef4444; }
  .sbadge.p2 { background: #fff7ed; border-color: #f97316; color: #f97316; }
  .sbadge.p3 { background: #fefce8; border-color: #eab308; color: #ca8a04; }
  .sbadge.ok { background: #f0fdf4; border-color: #22c55e; color: #16a34a; }

  /* ── FINDING CARD ── */
  .finding-card { border: 1.5px solid var(--border); border-radius: 8px; margin-bottom: 16px; overflow: hidden; }
  .finding-card.p1 { border-left: 4px solid var(--red); }
  .finding-card.p2 { border-left: 4px solid var(--orange); }
  .finding-card.p3 { border-left: 4px solid var(--yellow); }
  .finding-card.ok { border-left: 4px solid var(--green); }
  .finding-head { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: var(--gray-bg); flex-wrap: wrap; gap: 8px; }
  .finding-title { font-weight: 700; font-size: 13.5px; }
  .finding-body { padding: 14px 16px; }
  .finding-body p { margin-bottom: 8px; }
  .finding-rec { background: var(--blue-bg); border-left: 3px solid var(--blue); padding: 10px 14px; border-radius: 0 6px 6px 0; margin-top: 10px; font-size: 12.5px; }
  .finding-rec strong { color: var(--blue); }

  /* ── PHOTO GRID ── */
  .photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .photo-item { border-radius: 8px; overflow: hidden; border: 1px solid var(--border); }
  .photo-caption { padding: 6px 10px; font-size: 11px; color: var(--gray); background: var(--gray-bg); text-align: center; }
  .photo-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(0,0,0,0.35); gap: 6px; font-size: 11px; text-align: center; background: rgba(0,0,0,0.03); border: 2px dashed #d1d5db; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
  .photo-placeholder:hover { background: var(--blue-bg); border-color: var(--blue-lt); }
  .photo-placeholder.small { height: 150px; }
  .photo-placeholder-icon { font-size: 24px; opacity: 0.45; }

  /* ── NOTICE / OK BOX ── */
  .notice { border-left: 4px solid var(--blue); background: var(--blue-bg); padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 12.5px; }
  .notice.green  { border-color: var(--green);   background: var(--green-bg); }
  .notice.yellow { border-color: var(--yellow);  background: var(--yellow-bg); }
  .notice.red    { border-color: var(--red);      background: var(--red-bg); }
  .notice-title  { font-weight: 700; font-size: 13px; margin-bottom: 4px; }

  /* ── SUMMARY TABLE ── */
  .summary-table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12.5px; }
  .summary-table th { background: #1e3a8a; color: white; padding: 10px 14px; text-align: left; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px; }
  .summary-table td { padding: 10px 14px; border-bottom: 1px solid var(--border); vertical-align: top; }
  .summary-table tr:last-child td { border-bottom: none; }
  .summary-table tr:nth-child(even) td { background: #f8faff; }

  /* ── TOC ── */
  .toc { list-style: none; }
  .toc li { padding: 8px 0; border-bottom: 1px dotted var(--border); display: flex; justify-content: space-between; align-items: center; }
  .toc li:last-child { border-bottom: none; }
  .toc-section-name { font-weight: 600; font-size: 13px; }

  /* ── INSPECTOR SIG ── */
  .sig-box { border: 1.5px solid var(--border); border-radius: 10px; padding: 22px; display: flex; gap: 22px; align-items: flex-start; }
  .sig-avatar { width: 60px; height: 60px; background: var(--blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; font-weight: 800; flex-shrink: 0; }
  .sig-name { font-size: 16px; font-weight: 800; margin-bottom: 4px; }
  .sig-creds { font-size: 12px; color: var(--gray); line-height: 1.8; }

  /* ── MISC ── */
  ul.report-list { padding-left: 20px; margin: 8px 0; }
  ul.report-list li { margin-bottom: 5px; }
  strong { font-weight: 700; }
  .mt8 { margin-top: 8px; }
  .mt16 { margin-top: 16px; }
  h1 { font-size: 20px; font-weight: 800; color: var(--blue); margin-bottom: 20px; }
  .print-btn { position: fixed; top: 16px; right: 16px; z-index: 999; background: var(--blue); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(29,78,216,0.4); }
  .print-btn:hover { background: #1e40af; }
  .add-photo-btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; padding: 5px 12px; background: var(--gray-bg); border: 1.5px dashed #d1d5db; border-radius: 6px; font-size: 12px; font-weight: 600; color: var(--gray); cursor: pointer; transition: background 0.15s, border-color 0.15s, color 0.15s; }
  .add-photo-btn:hover { background: var(--blue-bg); border-color: var(--blue-lt); color: var(--blue); }
  .photo-item { position: relative; }
  .remove-photo-btn { position: absolute; top: 5px; right: 5px; width: 22px; height: 22px; background: rgba(220,38,38,0.85); color: white; border: none; border-radius: 50%; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1; z-index: 10; transition: background 0.15s; }
  .remove-photo-btn:hover { background: #b91c1c; }
</style>

<script>
  var _targetItem = null;
  var _inp = null;
  var _coverMode = false;

  function addRemoveBtn(item) {
    if (item.querySelector('.remove-photo-btn')) return;
    var btn = document.createElement('button');
    btn.className = 'remove-photo-btn no-print';
    btn.title = 'Remove photo';
    btn.textContent = '\u00d7';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var grid = item.parentElement;
      grid.removeChild(item);
      Array.from(grid.children).forEach(function (child, i) {
        var cap = child.querySelector('.photo-caption');
        if (cap && !child.querySelector('.photo-placeholder')) cap.textContent = 'Photo ' + (i + 1);
      });
      var addBtn = grid.nextElementSibling;
      if (addBtn && addBtn.classList.contains('add-photo-btn')) addBtn.style.display = '';
    });
    item.appendChild(btn);
  }

  function wireSlot(item) {
    var ph = item.querySelector('.photo-placeholder');
    if (ph) {
      ph.addEventListener('click', function () { _targetItem = item; _inp.value = ''; _inp.click(); });
    }
    if (item.querySelector('img')) addRemoveBtn(item);
  }

  function addPhotoSlot(grid) {
    var max = parseInt(grid.dataset.max || '10', 10);
    if (grid.children.length >= max) return;

    var item = document.createElement('div');
    item.className = 'photo-item';

    var ph = document.createElement('div');
    ph.className = 'photo-placeholder small';
    ph.title = 'Click to add photo';
    ph.innerHTML = '<div class="photo-placeholder-icon">\ud83d\udcf7</div><span>Click to add photo</span>';

    var cap = document.createElement('div');
    cap.className = 'photo-caption';
    cap.textContent = 'Tap to add';

    item.appendChild(ph);
    item.appendChild(cap);
    grid.appendChild(item);
    wireSlot(item);

    var addBtn = grid.nextElementSibling;
    if (addBtn && addBtn.classList.contains('add-photo-btn') && grid.children.length >= max) {
      addBtn.style.display = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Create and append file input now that body exists
    _inp = document.createElement('input');
    _inp.type = 'file';
    _inp.accept = 'image/*';
    _inp.style.display = 'none';
    document.body.appendChild(_inp);

    _inp.addEventListener('change', function () {
      if (!_inp.files[0]) return;

      // Cover page photo
      if (_coverMode) {
        _coverMode = false;
        var objectUrl = URL.createObjectURL(_inp.files[0]);
        var wrap = document.getElementById('cover-photo-wrap');
        var existing = wrap.querySelector('#cover-photo-placeholder, img');
        var img = document.createElement('img');
        img.src = objectUrl;
        img.style.cssText = 'width:100%;display:block;cursor:pointer;';
        img.alt = 'Property photo';
        img.title = 'Click to change photo';
        img.addEventListener('click', function () { _coverMode = true; _inp.value = ''; _inp.click(); });
        if (existing) {
          if (existing.tagName === 'IMG' && existing.src.startsWith('blob:')) URL.revokeObjectURL(existing.src);
          wrap.replaceChild(img, existing);
        } else {
          wrap.appendChild(img);
        }
        _inp.value = '';
        return;
      }

      if (!_targetItem) return;

      // Use object URL — original file quality, no base64 re-encoding
      var objectUrl = URL.createObjectURL(_inp.files[0]);

      var img = document.createElement('img');
      img.src = objectUrl;
      img.style.cssText = 'width:100%;height:auto;display:block;';
      img.alt = 'Inspection photo';

      var ph = _targetItem.querySelector('.photo-placeholder');
      if (ph) {
        _targetItem.replaceChild(img, ph);
      } else {
        var old = _targetItem.querySelector('img');
        if (old) {
          // Revoke previous blob URL to free memory
          if (old.src && old.src.startsWith('blob:')) URL.revokeObjectURL(old.src);
          _targetItem.replaceChild(img, old);
        }
      }

      var grid = _targetItem.parentElement;
      var idx = Array.from(grid.children).indexOf(_targetItem) + 1;
      var cap = _targetItem.querySelector('.photo-caption');
      if (cap) cap.textContent = 'Photo ' + idx;

      addRemoveBtn(_targetItem);
      _inp.value = '';
      _targetItem = null;

      var addBtn = grid.nextElementSibling;
      if (addBtn && addBtn.classList.contains('add-photo-btn')) addBtn.style.display = '';
    });

    // Wire cover page photo placeholder
    var coverPh = document.getElementById('cover-photo-placeholder');
    if (coverPh) {
      coverPh.addEventListener('click', function () { _coverMode = true; _inp.value = ''; _inp.click(); });
    }

    // Wire all existing photo slots
    document.querySelectorAll('.photo-grid .photo-item').forEach(wireSlot);
  });
</script>
</head>
<body>

<button class="print-btn no-print" onclick="window.print()">Save as PDF</button>

<!-- ══ COVER PAGE ══════════════════════════════════════════════ -->
<div class="cover">
  <div class="cover-header">
    <div class="cover-logo">
      <div class="cover-logo-icon">🔍</div>
      <div>
        <div class="cover-logo-text">ASADS Home Inspection</div>
        <div class="cover-logo-sub">Licensed · OAHI/CAHPI Standards · Intact Insurance</div>
      </div>
    </div>
    <div class="cover-cert">
      <strong>Ontario Home Inspection Act, 2017</strong><br>
      OAHI/CAHPI 2023 National Standards<br>
      Insured by Intact Insurance<br>
      (647) 801-9311 · info@asads.ca
    </div>
  </div>

  <div class="cover-body">
    <div class="cover-photo-wrap" id="cover-photo-wrap">
      <div class="photo-placeholder" id="cover-photo-placeholder" style="height:100%;border-radius:0;border:none;background:rgba(255,255,255,0.08);border:2px dashed rgba(255,255,255,0.25);" title="Click to add property photo">
        <div class="photo-placeholder-icon" style="font-size:28px;color:rgba(255,255,255,0.4);">🏠</div>
        <span style="font-size:12px;color:rgba(255,255,255,0.5);">Click to add property photo</span>
      </div>
    </div>

    <div class="cover-address-card">
      <div class="cover-report-type">${job.inspectionType}</div>
      <div class="cover-address">${job.address}</div>
      <div class="cover-address-sub">${job.city}</div>
      <div class="cover-meta-grid">
        <div class="cover-meta-item"><label>Inspection Date</label><span>${job.inspectionDate}</span></div>
        <div class="cover-meta-item"><label>Report Date</label><span>${reportDate}</span></div>
        <div class="cover-meta-item"><label>Inspector</label><span>${job.inspector}</span></div>
        <div class="cover-meta-item"><label>Urgent Items</label><span style="color:#fca5a5;">${data.summary.p1Count} P1 — Unsafe</span></div>
        <div class="cover-meta-item"><label>Significant</label><span style="color:#fed7aa;">${data.summary.p2Count} P2 — Deficiencies</span></div>
        <div class="cover-meta-item"><label>Monitor</label><span style="color:#fde68a;">${data.summary.p3Count} P3 — Items</span></div>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    <span>Prepared per OAHI Standards of Practice &amp; CAHPI 2023 National Standards</span>
    <span>asads.ca · Cambridge, ON</span>
  </div>
</div>

<!-- ══ NOTICES & SCOPE ════════════════════════════════════════ -->
<div class="page-wrap page-break">
  <div class="doc-header">
    <div class="doc-header-logo">🔍 ASADS Home Inspection</div>
    <div class="doc-header-info">${fullAddress} · ${job.inspectionDate}<br>Inspector: ${job.inspector}</div>
  </div>
  <h1>Important Notices &amp; Scope of Inspection</h1>
  <div class="notice" style="margin-bottom:20px;">
    <div class="notice-title">OAHI/CAHPI Standard Disclaimer</div>
    This report was prepared in accordance with the Standards of Practice of the Ontario Association of Home Inspectors (OAHI) and the Canadian Association of Home &amp; Property Inspectors (CAHPI) 2023 National Standards. This inspection is not technically exhaustive. It will not identify concealed conditions or latent defects. Systems and components are reported on as observed at the time of inspection only.
  </div>
  <div class="notice yellow" style="margin-bottom:20px;">
    <div class="notice-title">What This Inspection Does NOT Include</div>
    <ul class="report-list mt8">
      <li>Determination of remaining service life of any component</li>
      <li>Engineering opinion on structural adequacy or load capacity</li>
      <li>Code compliance, regulatory, or bylaw compliance determination</li>
      <li>Environmental hazard assessment (mold, asbestos, radon) unless separately contracted</li>
      <li>Market value or advisability of purchase</li>
      <li>Concealed or latent defects not visible at time of inspection</li>
    </ul>
  </div>
  ${propertyDetailsHtml ? `<h1 style="margin-top:28px;">Property Overview</h1>${propertyDetailsHtml}` : ''}
</div>

<!-- ══ TABLE OF CONTENTS ══════════════════════════════════════ -->
<div class="page-wrap page-break">
  <div class="doc-header">
    <div class="doc-header-logo">🔍 ASADS Home Inspection</div>
    <div class="doc-header-info">${fullAddress} · ${job.inspectionDate}</div>
  </div>
  <h1>Table of Contents</h1>
  <ul class="toc">
    <li><span class="toc-section-name">📋 Executive Summary</span><span></span></li>
    ${buildTOC(data)}
    ${data.notInspected.length > 0 ? '<li><span class="toc-section-name">🚫 Systems Not Inspected</span><span></span></li>' : ''}
    <li><span class="toc-section-name">📄 General Limitations &amp; Inspector Declaration</span><span></span></li>
  </ul>
</div>

<!-- ══ EXECUTIVE SUMMARY ═════════════════════════════════════ -->
<div class="page-wrap page-break">
  <div class="doc-header">
    <div class="doc-header-logo">🔍 ASADS Home Inspection</div>
    <div class="doc-header-info">${fullAddress} · ${job.inspectionDate}</div>
  </div>
  <div class="section-header">
    <span class="section-header-icon">📋</span>
    <h2>Executive Summary</h2>
  </div>
  <div class="section-body">
    <div class="brow">
      <div class="sbadge p1"><div class="n">${data.summary.p1Count}</div><div class="l">Unsafe / Urgent</div></div>
      <div class="sbadge p2"><div class="n">${data.summary.p2Count}</div><div class="l">Significant Deficiency</div></div>
      <div class="sbadge p3"><div class="n">${data.summary.p3Count}</div><div class="l">Monitor / Near EOL</div></div>
      <div class="sbadge ok"><div class="n">${data.summary.okCount}</div><div class="l">Satisfactory</div></div>
    </div>
    <p style="font-size:14px;line-height:1.8;color:#334155;margin-bottom:24px;">${data.summary.assessment}</p>
    ${buildSummaryTable(data)}
  </div>
</div>

<!-- ══ FINDINGS BY SECTION ═══════════════════════════════════ -->
${sectionPages}

<!-- ══ SYSTEMS NOT INSPECTED ══════════════════════════════════ -->
${notInspectedHtml}

<!-- ══ INSPECTOR INFORMATION & DECLARATION ══════════════════════ -->
<div class="page-wrap page-break">
  <div class="doc-header">
    <div class="doc-header-logo">🔍 ASADS Home Inspection</div>
    <div class="doc-header-info">${fullAddress} · ${job.inspectionDate}</div>
  </div>
  <div class="section-header">
    <span class="section-header-icon">✅</span>
    <h2>Inspector Information &amp; Declaration</h2>
  </div>
  <div class="section-body">

    <!-- Inspector card -->
    <div class="sig-box" style="margin-bottom:24px;">
      <div class="sig-avatar">${getInitials(job.inspector)}</div>
      <div style="flex:1;">
        <div class="sig-name">${getInspectorName(job.inspector)}</div>
        <div class="sig-creds">
          Home Inspector · ASADS Home Inspection<br>
          CMI® — Certified Master Inspector<br>
          Licensed under the <strong>Ontario Home Inspection Act, 2017</strong><br>
          OAHI · CAHPI National Standards Compliant<br>
          Insured by Intact Insurance (E&amp;O &amp; General Liability)<br>
          Criminal Background Verified
        </div>
        <div style="margin-top:10px;font-size:12px;color:var(--gray);">
          Phone: (647) 801-9311 &nbsp;|&nbsp; Email: info@asads.ca &nbsp;|&nbsp; Web: asads.ca
        </div>
      </div>
    </div>

    <!-- Declaration -->
    <h3 style="font-size:14px;font-weight:700;color:var(--blue);margin-bottom:10px;">Inspector Declaration</h3>
    <p style="font-size:13px;line-height:1.8;color:#334155;margin-bottom:12px;">
      I, <strong>${getInspectorName(job.inspector)}</strong>, declare that this report accurately reflects the observations made during the inspection of the property located at <strong>${fullAddress}</strong>, conducted on <strong>${job.inspectionDate}</strong>. The inspection was performed in accordance with the Standards of Practice of the Ontario Association of Home Inspectors (OAHI) and the requirements of the Ontario Home Inspection Act, 2017.
    </p>
    <p style="font-size:13px;line-height:1.8;color:#334155;margin-bottom:24px;">
      This report is the property of ASADS Home Inspection and the named client. It is not transferable and may not be relied upon by any party other than the named client without the express written consent of ASADS Home Inspection.
    </p>

    <!-- Signature block -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
      <div style="border:1.5px solid var(--border);border-radius:8px;padding:16px;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--gray);margin-bottom:8px;">Inspector Signature</div>
        <div style="font-size:15px;font-style:italic;font-weight:600;color:var(--text);border-bottom:1px solid var(--border);padding-bottom:6px;margin-bottom:6px;">${getInspectorName(job.inspector)}</div>
        <div style="font-size:11px;color:var(--gray);">${job.inspectionDate}</div>
      </div>
      <div style="border:1.5px solid var(--border);border-radius:8px;padding:16px;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--gray);margin-bottom:8px;">Company Stamp / Seal</div>
        <div style="font-size:14px;font-weight:800;color:var(--blue);margin-bottom:4px;">ASADS Home Inspection</div>
        <div style="font-size:11px;color:var(--gray);">asads.ca · (647) 801-9311</div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="notice yellow" style="margin-bottom:16px;">
      <div class="notice-title">Disclaimer</div>
      This report is not a warranty, guarantee, or insurance policy of any kind. The inspector is not a structural engineer, licensed contractor, specialist in any specific trade, or environmental consultant. Where specialist evaluation is recommended, such evaluation should be completed by appropriately licensed and qualified professionals. The inspector's liability is limited to the fee paid for this inspection. ASADS Home Inspection carries Errors &amp; Omissions insurance and General Liability insurance. A 90-day workmanship warranty applies to the inspection services provided.
    </div>

    <!-- 90-day warranty -->
    <div class="notice green">
      <div class="notice-title">90-Day Inspection Warranty</div>
      This inspection is backed by ASADS Home Inspection's 90-day warranty. If a covered defect is discovered following the inspection that was accessible and should have been reported, ASADS Home Inspection will work to make it right. Contact us at (647) 801-9311 or info@asads.ca.
    </div>

  </div>

  <!-- Report footer -->
  <div style="text-align:center;padding:20px 0 8px;font-size:11px;color:var(--gray);border-top:1px solid var(--border);margin-top:24px;line-height:1.9;">
    <strong style="color:var(--blue);font-size:13px;">ASADS Home Inspection</strong><br>
    (647) 801-9311 &nbsp;·&nbsp; info@asads.ca &nbsp;·&nbsp; asads.ca<br>
    CMI® Certified Master Inspector · Licensed · Insured by Intact Insurance<br>
    Report Reference: <strong>${getReportRef(job.inspectionDate, job.city)}</strong> &nbsp;·&nbsp; © ${new Date().getFullYear()} ASADS Home Inspection. All rights reserved.
  </div>
</div>

</body>
</html>`;
}
