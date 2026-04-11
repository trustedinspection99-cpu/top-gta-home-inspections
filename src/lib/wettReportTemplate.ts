// ── WETT Inspection Report HTML Generator ──────────────────────────────────
// Covers all fields required by CSIO H0910ESFQ Solid Fuel Heating Questionnaire

export interface WettFormData {
  // Property / Client (pre-filled from job)
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyAddress: string;
  city: string;
  inspectionDate: string;

  // Inspector
  inspectorName: string;
  wettCertNumber: string;

  // Section 3: Heating Unit
  unitRole: 'primary' | 'auxiliary' | '';
  unitYear: string;
  unitMake: string;
  unitModel: string;
  unitCertified: 'Y' | 'N' | '';
  certLabel: 'CSA' | 'ULC' | 'OTL' | 'WH' | 'other' | '';
  certLabelOther: string;
  heatingUnitType: string;
  fuel: string;
  cordsPerYear: string;
  cordType: 'face' | 'standard' | '';
  hoursPerDay: string;
  daysPerYear: string;

  // Section 4: Installation
  installedBy: string;
  installerWettCertified: 'Y' | 'N' | '';
  installerWettNumber: string;
  unitLocation: 'inside' | 'outside' | 'outside-insulated' | '';

  // Section 5: Chimney
  chimneyType: 'masonry' | 'metal' | '';
  // Masonry
  masonrySubtype: 'masonry' | 'concrete' | 'other' | '';
  masonrySubtypeOther: string;
  builtFrom: 'ground' | 'foundation' | '';
  chimneyLining: 'flue-tile' | 'stainless-steel' | 'other' | '';
  chimneyLiningOther: string;
  // Metal
  metalChimneySubtype: 'factory-double-wall' | 'other' | '';
  metalChimneySubtypeOther: string;
  metalYear: string;
  metalManufacturer: string;
  metalInstalledBy: string;
  metalWettCertified: 'Y' | 'N' | '';
  metalWettNumber: string;
  ratedFor650: 'Y' | 'N' | '';
  clearanceToNearest: string;
  clearanceUnit: 'inches' | 'cm';
  // Both
  cleaningTimesPerYear: string;
  cleaningByWhom: string;
  lastCleaningDate: string;
  chimneyInstalledLocation: 'inside' | 'outside' | 'outside-insulated' | '';
  sharesFlue: 'Y' | 'N' | '';
  sharesFlueDetails: string;

  // Section 7: Clearances
  measurementUnit: 'inches' | 'cm';
  thimble: 'Y' | 'N' | '';
  stovePipeTotalLength: string;
  stovePipeElbows: string;
  stovePipeConstruction: 'double-wall' | 'single-wall' | 'galvanized' | 'other' | '';
  stovePipeConstructionOther: string;
  stovePipeThroughConcealed: 'Y' | 'N' | '';
  stovePipeConcealedDesc: string;
  nonCombustiblePad: 'Y' | 'N' | '';
  distanceToFurniture: string;
  // Stove clearances
  stoveToBackwallActual: string; stoveToBackwallRequired: string;
  stoveToSidewallActual: string; stoveToSidewallRequired: string;
  stoveToCornerActual: string;   stoveToCornerRequired: string;
  stoveToCeilingActual: string;  stoveToCeilingRequired: string;
  // Stove pipe clearances
  pipeToBackwallActual: string;  pipeToBackwallRequired: string;
  pipeToSidewallActual: string;  pipeToSidewallRequired: string;
  pipeToCeilingActual: string;   pipeToCeilingRequired: string;
  // Floor pad
  floorPadFrontActual: string;   floorPadFrontRequired: string;
  floorPadLeftActual: string;    floorPadLeftRequired: string;
  floorPadRightActual: string;   floorPadRightRequired: string;
  floorPadBackActual: string;    floorPadBackRequired: string;
  // Wall/ceiling construction
  sidewallConstruction: string;
  backwallConstruction: string;
  ceilingConstruction: string;
  // Shielding
  shieldingType: 'sheet-metal' | 'ceramic-tile' | 'brick' | 'concrete' | 'other' | 'none' | '';
  shieldingTypeOther: string;
  sheetMetalPermanent: 'Y' | 'N' | '';
  wallSpacersNonCombustible: 'Y' | 'N' | '';
  airSpaceAtShield: 'Y' | 'N' | '';
  wallToShieldActual: string;        wallToShieldRequired: string;
  topStoveToTopShieldActual: string; topStoveToTopShieldRequired: string;
  shieldToFloorActual: string;       shieldToFloorRequired: string;
  bottomStoveToFloorActual: string;  bottomStoveToFloorRequired: string;

  // Section 8: Loss Prevention
  ashesInMetalContainer: 'Y' | 'N' | '';
  metalContainerLocation: 'inside' | 'outside' | '';
  metalContainerHasLid: 'Y' | 'N' | '';
  ashOnNonFlammable: 'Y' | 'N' | '';
  wettInspectedSinceInstall: 'Y' | 'N' | '';
  wettInspectorNumber: string;
  modifications: 'Y' | 'N' | '';
  modificationDetails: string;
  previousChimneyFire: 'Y' | 'N' | '';
  chimneyFireCause: string;
  fuelDistance: string;
  fuelDistanceUnit: 'feet' | 'metres';
  smokeDetector: 'Y' | 'N' | '';
  fireExtinguisher: 'Y' | 'N' | '';
  coDetector: 'Y' | 'N' | '';

  // Sign-off
  overallResult: 'pass' | 'pass-with-deficiencies' | 'fail' | '';
  deficiencies: string[];
  section6Remarks: string;
  section9Remarks: string;
  photoUrls: string[];
}

export const WETT_UNIT_TYPES = [
  'Woodstove, Airtight',
  'Woodstove, Not Airtight',
  'Fireplace Insert',
  'Fireplace, Zero Clearance',
  'Masonry Fireplace',
  'Pellet Stove',
  'Wood Furnace',
  'Wood Furnace Add-On',
  'Wood / Oil Combination',
  'Cookstove',
  'Acorn / Franklin / Pot Belly Stove',
];

export const BLANK_WETT: WettFormData = {
  clientName: '', clientPhone: '', clientEmail: '',
  propertyAddress: '', city: '', inspectionDate: '',
  inspectorName: 'Haroon Chaudhary', wettCertNumber: '',
  unitRole: 'primary', unitYear: '', unitMake: '', unitModel: '',
  unitCertified: '', certLabel: '', certLabelOther: '',
  heatingUnitType: '', fuel: 'Wood', cordsPerYear: '', cordType: '',
  hoursPerDay: '', daysPerYear: '',
  installedBy: '', installerWettCertified: '', installerWettNumber: '',
  unitLocation: 'inside',
  chimneyType: '', masonrySubtype: '', masonrySubtypeOther: '',
  builtFrom: '', chimneyLining: '', chimneyLiningOther: '',
  metalChimneySubtype: '', metalChimneySubtypeOther: '',
  metalYear: '', metalManufacturer: '', metalInstalledBy: '',
  metalWettCertified: '', metalWettNumber: '', ratedFor650: '',
  clearanceToNearest: '', clearanceUnit: 'inches',
  cleaningTimesPerYear: '', cleaningByWhom: '', lastCleaningDate: '',
  chimneyInstalledLocation: 'inside', sharesFlue: '', sharesFlueDetails: '',
  measurementUnit: 'inches',
  thimble: '', stovePipeTotalLength: '', stovePipeElbows: '',
  stovePipeConstruction: '', stovePipeConstructionOther: '',
  stovePipeThroughConcealed: '', stovePipeConcealedDesc: '',
  nonCombustiblePad: '', distanceToFurniture: '',
  stoveToBackwallActual: '', stoveToBackwallRequired: '',
  stoveToSidewallActual: '', stoveToSidewallRequired: '',
  stoveToCornerActual: '',   stoveToCornerRequired: '',
  stoveToCeilingActual: '',  stoveToCeilingRequired: '',
  pipeToBackwallActual: '',  pipeToBackwallRequired: '',
  pipeToSidewallActual: '',  pipeToSidewallRequired: '',
  pipeToCeilingActual: '',   pipeToCeilingRequired: '',
  floorPadFrontActual: '',   floorPadFrontRequired: '',
  floorPadLeftActual: '',    floorPadLeftRequired: '',
  floorPadRightActual: '',   floorPadRightRequired: '',
  floorPadBackActual: '',    floorPadBackRequired: '',
  sidewallConstruction: '', backwallConstruction: '', ceilingConstruction: '',
  shieldingType: '', shieldingTypeOther: '',
  sheetMetalPermanent: '', wallSpacersNonCombustible: '', airSpaceAtShield: '',
  wallToShieldActual: '',        wallToShieldRequired: '',
  topStoveToTopShieldActual: '', topStoveToTopShieldRequired: '',
  shieldToFloorActual: '',       shieldToFloorRequired: '',
  bottomStoveToFloorActual: '',  bottomStoveToFloorRequired: '',
  ashesInMetalContainer: '', metalContainerLocation: '',
  metalContainerHasLid: '', ashOnNonFlammable: '',
  wettInspectedSinceInstall: '', wettInspectorNumber: '',
  modifications: '', modificationDetails: '',
  previousChimneyFire: '', chimneyFireCause: '',
  fuelDistance: '', fuelDistanceUnit: 'feet',
  smokeDetector: '', fireExtinguisher: '', coDetector: '',
  overallResult: '', deficiencies: [],
  section6Remarks: '', section9Remarks: '', photoUrls: [],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function yn(v: string): string {
  if (v === 'Y') return '<span style="color:#16a34a;font-weight:600">Yes</span>';
  if (v === 'N') return '<span style="color:#dc2626;font-weight:600">No</span>';
  return '<span style="color:#9ca3af">—</span>';
}

function val(v: string, fallback = '—'): string {
  return v?.trim() || `<span style="color:#9ca3af">${fallback}</span>`;
}

function measureRow(label: string, actual: string, required: string, unit: string): string {
  const ok = actual && required && parseFloat(actual) >= parseFloat(required);
  const flag = actual && required ? (ok
    ? '<span style="color:#16a34a;font-size:11px">✓ OK</span>'
    : '<span style="color:#dc2626;font-size:11px">⚠ LOW</span>') : '';
  return `<tr>
    <td style="padding:5px 8px;border:1px solid #e5e7eb;font-size:13px">${label}</td>
    <td style="padding:5px 8px;border:1px solid #e5e7eb;font-size:13px;text-align:center;font-weight:600">${actual || '—'} ${actual ? unit : ''}</td>
    <td style="padding:5px 8px;border:1px solid #e5e7eb;font-size:13px;text-align:center">${required || '—'} ${required ? unit : ''}</td>
    <td style="padding:5px 8px;border:1px solid #e5e7eb;font-size:13px;text-align:center">${flag}</td>
  </tr>`;
}

function row2(label: string, value: string): string {
  return `<tr>
    <td style="padding:5px 8px;border:1px solid #e5e7eb;font-size:13px;color:#6b7280;width:40%">${label}</td>
    <td style="padding:5px 8px;border:1px solid #e5e7eb;font-size:13px;font-weight:500">${value || '<span style="color:#9ca3af">—</span>'}</td>
  </tr>`;
}

function section(title: string, icon: string, content: string): string {
  return `
  <div style="margin-bottom:24px;page-break-inside:avoid">
    <div style="background:#1e3a5f;color:white;padding:8px 14px;border-radius:6px 6px 0 0;font-size:13px;font-weight:700;letter-spacing:0.04em;display:flex;align-items:center;gap:8px">
      <span>${icon}</span><span>${title}</span>
    </div>
    <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 6px 6px;overflow:hidden">
      ${content}
    </div>
  </div>`;
}

// ── Main generator ─────────────────────────────────────────────────────────────

export function buildWettReportHtml(d: WettFormData): string {
  const unit = d.measurementUnit === 'inches' ? 'in' : 'cm';
  const resultColors: Record<string, string> = {
    pass: '#16a34a',
    'pass-with-deficiencies': '#d97706',
    fail: '#dc2626',
  };
  const resultLabels: Record<string, string> = {
    pass: '✅ PASS',
    'pass-with-deficiencies': '⚠️ PASS — DEFICIENCIES NOTED',
    fail: '❌ FAIL — UNSAFE / NOT INSURABLE',
  };
  const resultColor = d.overallResult ? resultColors[d.overallResult] : '#6b7280';
  const resultLabel = d.overallResult ? resultLabels[d.overallResult] : 'PENDING';

  const certLabelDisplay = d.certLabel === 'other' ? d.certLabelOther : d.certLabel;

  const chimneyTypeDisplay = d.chimneyType === 'masonry'
    ? `Masonry — ${d.masonrySubtype === 'other' ? d.masonrySubtypeOther : d.masonrySubtype || '—'}`
    : d.chimneyType === 'metal'
    ? `Metal — ${d.metalChimneySubtype === 'factory-double-wall' ? 'Factory Built Double Walled' : d.metalChimneySubtypeOther || d.metalChimneySubtype || '—'}`
    : '—';

  const locationDisplay: Record<string, string> = {
    inside: 'Inside Building',
    outside: 'Outside Building',
    'outside-insulated': 'Outside Building in Insulated Enclosure',
  };

  const pipeConstructionDisplay: Record<string, string> = {
    'double-wall': 'Double Walled',
    'single-wall': 'Single Walled (including black steel)',
    galvanized: 'Galvanized',
    other: d.stovePipeConstructionOther,
  };

  const shieldTypeDisplay: Record<string, string> = {
    'sheet-metal': 'Sheet Metal',
    'ceramic-tile': 'Ceramic Tile',
    brick: 'Brick',
    concrete: 'Concrete',
    other: d.shieldingTypeOther,
    none: 'None',
  };

  const deficiencySection = d.deficiencies.filter(x => x.trim()).length > 0 ? `
  <div style="margin-bottom:24px;page-break-inside:avoid">
    <div style="background:#7f1d1d;color:white;padding:8px 14px;border-radius:6px 6px 0 0;font-size:13px;font-weight:700;letter-spacing:0.04em">
      ⚠️ DEFICIENCIES &amp; REQUIRED CORRECTIONS
    </div>
    <div style="border:1px solid #fca5a5;border-top:none;border-radius:0 0 6px 6px;padding:14px;background:#fff5f5">
      <ol style="margin:0;padding-left:20px;font-size:13px;line-height:1.8;color:#1f2937">
        ${d.deficiencies.filter(x => x.trim()).map(def => `<li>${def}</li>`).join('')}
      </ol>
    </div>
  </div>` : '';

  const photosSection = d.photoUrls.length > 0 ? `
  <div style="margin-bottom:24px">
    <div style="background:#1e3a5f;color:white;padding:8px 14px;border-radius:6px 6px 0 0;font-size:13px;font-weight:700;letter-spacing:0.04em">
      📷 INSPECTION PHOTOS
    </div>
    <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 6px 6px;padding:14px">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">
        ${d.photoUrls.map(url => `<img src="${url}" style="width:100%;border-radius:6px;border:1px solid #e5e7eb;aspect-ratio:4/3;object-fit:cover" />`).join('')}
      </div>
    </div>
  </div>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>WETT Inspection Report — ${d.propertyAddress}, ${d.city}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 24px; color: #1f2937; }
  .report-wrap { max-width: 900px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); overflow: hidden; }
  .report-body { padding: 28px 32px; }
  table { border-collapse: collapse; width: 100%; }
  @media print {
    body { background: white; padding: 0; }
    .report-wrap { box-shadow: none; border-radius: 0; }
    .no-print { display: none !important; }
  }
</style>
</head>
<body>
<div class="report-wrap">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#1e3a5f 0%,#0f4c75 100%);color:white;padding:28px 32px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px">
      <div>
        <div style="font-size:11px;letter-spacing:0.12em;font-weight:600;opacity:0.7;margin-bottom:4px">ASADS HOME INSPECTION</div>
        <div style="font-size:24px;font-weight:800;letter-spacing:0.01em">WETT Inspection Report</div>
        <div style="font-size:13px;opacity:0.8;margin-top:6px">Solid Fuel Heating System — CSIO H0910ESFQ Compliant</div>
      </div>
      <div style="text-align:right">
        <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:10px 16px;font-size:12px">
          <div style="font-weight:700;font-size:14px;margin-bottom:2px">WETT Certified</div>
          <div style="opacity:0.9">Cert #: ${val(d.wettCertNumber, 'Pending')}</div>
          <div style="opacity:0.9">(647) 801-9311</div>
          <div style="opacity:0.9">info@asads.ca</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Result banner -->
  <div style="background:${resultColor};color:white;padding:12px 32px;font-size:15px;font-weight:700;letter-spacing:0.05em;text-align:center">
    ${resultLabel}
  </div>

  <div class="report-body">

    <!-- Property info strip -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px;padding:16px;background:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px">
      <div>
        <div style="font-size:10px;font-weight:700;color:#6b7280;letter-spacing:0.08em;margin-bottom:3px">PROPERTY ADDRESS</div>
        <div style="font-size:14px;font-weight:600;color:#1e3a5f">${val(d.propertyAddress)}</div>
        <div style="font-size:12px;color:#6b7280">${val(d.city)}</div>
      </div>
      <div>
        <div style="font-size:10px;font-weight:700;color:#6b7280;letter-spacing:0.08em;margin-bottom:3px">CLIENT</div>
        <div style="font-size:14px;font-weight:600;color:#1e3a5f">${val(d.clientName)}</div>
        <div style="font-size:12px;color:#6b7280">${val(d.clientPhone)}</div>
      </div>
      <div>
        <div style="font-size:10px;font-weight:700;color:#6b7280;letter-spacing:0.08em;margin-bottom:3px">INSPECTION DATE</div>
        <div style="font-size:14px;font-weight:600;color:#1e3a5f">${val(d.inspectionDate)}</div>
        <div style="font-size:12px;color:#6b7280">Inspector: ${val(d.inspectorName)}</div>
      </div>
    </div>

    ${deficiencySection}

    <!-- Section 3: Heating Unit -->
    ${section('3. HEATING UNIT', '🔥', `
      <table>
        ${row2('Role', d.unitRole ? d.unitRole.charAt(0).toUpperCase() + d.unitRole.slice(1) : '—')}
        ${row2('Year', d.unitYear)}
        ${row2('Manufacturer / Make', d.unitMake)}
        ${row2('Model', d.unitModel)}
        ${row2('Type', d.heatingUnitType)}
        ${row2('CSA/ULC Certified', d.unitCertified ? (d.unitCertified === 'Y' ? `Yes — ${certLabelDisplay || ''}` : 'No') : '—')}
        ${row2('Fuel', d.fuel)}
        ${d.fuel === 'Wood' || !d.fuel ? row2('Cords / Year', d.cordsPerYear ? `${d.cordsPerYear} (${d.cordType === 'face' ? "Face cord 16″×4′×8′" : d.cordType === 'standard' ? "Standard bush cord 4′×4′×8′" : ''})` : '—') : row2('Amount / Year (kg)', d.cordsPerYear)}
        ${row2('Hours per day', d.hoursPerDay)}
        ${row2('Days per year', d.daysPerYear)}
      </table>
    `)}

    <!-- Section 4: Unit Installation -->
    ${section('4. UNIT INSTALLATION', '🔧', `
      <table>
        ${row2('Risk address', d.propertyAddress + (d.city ? ', ' + d.city : ''))}
        ${row2('Installed by', d.installedBy)}
        ${row2('Installer WETT certified', d.installerWettCertified === 'Y' ? `Yes — WETT #${d.installerWettNumber || '—'}` : d.installerWettCertified === 'N' ? 'No' : '—')}
        ${row2('Unit location', d.unitLocation ? locationDisplay[d.unitLocation] : '—')}
      </table>
    `)}

    <!-- Section 5: Chimney -->
    ${section('5. CHIMNEY', '🏠', `
      <table>
        ${row2('Chimney type', chimneyTypeDisplay)}
        ${d.chimneyType === 'masonry' ? `
          ${row2('Construction', d.builtFrom === 'ground' ? 'Built from ground' : d.builtFrom === 'foundation' ? 'Built from foundation' : '—')}
          ${row2('Chimney lining', d.chimneyLining === 'flue-tile' ? 'Flue Tile' : d.chimneyLining === 'stainless-steel' ? 'Stainless Steel' : d.chimneyLiningOther || '—')}
        ` : ''}
        ${d.chimneyType === 'metal' ? `
          ${row2('Year installed', d.metalYear)}
          ${row2('Manufacturer', d.metalManufacturer)}
          ${row2('Installed by', d.metalInstalledBy)}
          ${row2('Installer WETT certified', d.metalWettCertified === 'Y' ? `Yes — WETT #${d.metalWettNumber || '—'}` : d.metalWettCertified === 'N' ? 'No' : '—')}
          ${row2('Rated for 650°C / 1200°F continuous', d.ratedFor650 ? yn(d.ratedFor650) : '—')}
          ${row2('Clearance to nearest combustibles', d.clearanceToNearest ? `${d.clearanceToNearest} ${d.clearanceUnit}` : '—')}
        ` : ''}
        ${row2('Cleaning — times per year', d.cleaningTimesPerYear)}
        ${row2('Cleaning — by whom', d.cleaningByWhom)}
        ${row2('Date of last cleaning', d.lastCleaningDate)}
        ${row2('Chimney location', d.chimneyInstalledLocation ? locationDisplay[d.chimneyInstalledLocation] : '—')}
        ${row2('Shares a chimney flue', d.sharesFlue === 'Y' ? `Yes — ${d.sharesFlueDetails || 'see remarks'}` : d.sharesFlue === 'N' ? 'No' : '—')}
      </table>
    `)}

    ${d.section6Remarks.trim() ? section('6. REMARKS', '📝', `
      <div style="padding:12px;font-size:13px;line-height:1.7;color:#374151">${d.section6Remarks.replace(/\n/g, '<br>')}</div>
    `) : ''}

    <!-- Section 7: Clearances -->
    ${section('7. CLEARANCES', '📏', `
      <div style="padding:10px 12px 4px;font-size:11px;color:#6b7280;background:#fffbeb;border-bottom:1px solid #fde68a">
        <strong>Note:</strong> Actual = measured on site. Required = specified in owner's manual or label on unit. Measurements in <strong>${d.measurementUnit}</strong>.
      </div>

      <div style="padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:16px">

        <div>
          <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.06em;margin-bottom:6px">STOVE PIPE</div>
          <table style="font-size:12px;margin-bottom:8px">
            ${row2('Thimble where pipe passes through wall', d.thimble ? yn(d.thimble) : '—')}
            ${row2('Total length (incl. elbows)', d.stovePipeTotalLength ? `${d.stovePipeTotalLength} ${unit}` : '—')}
            ${row2('Number of elbows', d.stovePipeElbows)}
            ${row2('Construction', d.stovePipeConstruction ? pipeConstructionDisplay[d.stovePipeConstruction] || d.stovePipeConstruction : '—')}
            ${row2('Passes through concealed space/wall', d.stovePipeThroughConcealed ? (d.stovePipeThroughConcealed === 'Y' ? `Yes — ${d.stovePipeConcealedDesc || ''}` : 'No') : '—')}
          </table>

          <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.06em;margin-bottom:6px;margin-top:12px">FLOOR PAD</div>
          <table style="font-size:12px">
            ${row2('Non-combustible pad', d.nonCombustiblePad ? yn(d.nonCombustiblePad) : '—')}
            ${row2('Distance to furniture/fuel/combustibles', d.distanceToFurniture ? `${d.distanceToFurniture} ${unit}` : '—')}
          </table>

          <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.06em;margin-bottom:6px;margin-top:12px">WALL/CEILING CONSTRUCTION</div>
          <table style="font-size:12px">
            ${row2('Sidewall', d.sidewallConstruction)}
            ${row2('Backwall', d.backwallConstruction)}
            ${row2('Ceiling', d.ceilingConstruction)}
          </table>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.06em;margin-bottom:6px">MEASUREMENTS — ACTUAL vs. REQUIRED</div>
          <table style="font-size:12px;border-collapse:collapse;width:100%">
            <thead>
              <tr style="background:#f9fafb">
                <th style="padding:5px 8px;border:1px solid #e5e7eb;text-align:left;font-size:11px;color:#6b7280">Measurement</th>
                <th style="padding:5px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#6b7280">Actual</th>
                <th style="padding:5px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#6b7280">Required</th>
                <th style="padding:5px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#6b7280">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colspan="4" style="padding:4px 8px;background:#f0f7ff;font-size:11px;font-weight:700;color:#1e3a5f;border:1px solid #e5e7eb">Stove to surfaces</td></tr>
              ${measureRow('Backwall', d.stoveToBackwallActual, d.stoveToBackwallRequired, unit)}
              ${measureRow('Sidewall', d.stoveToSidewallActual, d.stoveToSidewallRequired, unit)}
              ${measureRow('Corner', d.stoveToCornerActual, d.stoveToCornerRequired, unit)}
              ${measureRow('Ceiling', d.stoveToCeilingActual, d.stoveToCeilingRequired, unit)}
              <tr><td colspan="4" style="padding:4px 8px;background:#f0f7ff;font-size:11px;font-weight:700;color:#1e3a5f;border:1px solid #e5e7eb">Stove pipe to surfaces</td></tr>
              ${measureRow('Backwall', d.pipeToBackwallActual, d.pipeToBackwallRequired, unit)}
              ${measureRow('Sidewall', d.pipeToSidewallActual, d.pipeToSidewallRequired, unit)}
              ${measureRow('Ceiling', d.pipeToCeilingActual, d.pipeToCeilingRequired, unit)}
              <tr><td colspan="4" style="padding:4px 8px;background:#f0f7ff;font-size:11px;font-weight:700;color:#1e3a5f;border:1px solid #e5e7eb">Floor pad edge distances</td></tr>
              ${measureRow('Front', d.floorPadFrontActual, d.floorPadFrontRequired, unit)}
              ${measureRow('Left', d.floorPadLeftActual, d.floorPadLeftRequired, unit)}
              ${measureRow('Right', d.floorPadRightActual, d.floorPadRightRequired, unit)}
              ${measureRow('Back', d.floorPadBackActual, d.floorPadBackRequired, unit)}
            </tbody>
          </table>
        </div>
      </div>

      ${d.shieldingType && d.shieldingType !== 'none' ? `
      <div style="padding:0 12px 12px">
        <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.06em;margin-bottom:6px">HEAT SHIELDING</div>
        <table style="font-size:12px;border-collapse:collapse;width:100%">
          <tbody>
            ${row2('Shielding type', shieldTypeDisplay[d.shieldingType] || d.shieldingType)}
            ${d.shieldingType === 'sheet-metal' ? row2('Permanently installed', d.sheetMetalPermanent ? yn(d.sheetMetalPermanent) : '—') : ''}
            ${row2('Wall spacers non-combustible', d.wallSpacersNonCombustible ? yn(d.wallSpacersNonCombustible) : '—')}
            ${row2('Air space at top and bottom of shield', d.airSpaceAtShield ? yn(d.airSpaceAtShield) : '—')}
          </tbody>
        </table>
        <table style="font-size:12px;border-collapse:collapse;width:100%;margin-top:8px">
          <thead>
            <tr style="background:#f9fafb">
              <th style="padding:5px 8px;border:1px solid #e5e7eb;text-align:left;font-size:11px;color:#6b7280">Shield Distance</th>
              <th style="padding:5px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#6b7280">Actual</th>
              <th style="padding:5px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#6b7280">Required</th>
              <th style="padding:5px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#6b7280">Status</th>
            </tr>
          </thead>
          <tbody>
            ${measureRow('Wall to shield', d.wallToShieldActual, d.wallToShieldRequired, unit)}
            ${measureRow('Top of stove to top of shield', d.topStoveToTopShieldActual, d.topStoveToTopShieldRequired, unit)}
            ${measureRow('Heat shield to floor', d.shieldToFloorActual, d.shieldToFloorRequired, unit)}
            ${measureRow('Bottom of stove to floor', d.bottomStoveToFloorActual, d.bottomStoveToFloorRequired, unit)}
          </tbody>
        </table>
      </div>
      ` : ''}
    `)}

    <!-- Section 8: Loss Prevention -->
    ${section('8. LOSS PREVENTION', '🛡️', `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
        <table style="border-right:none">
          ${row2('Ashes disposed in metal container', d.ashesInMetalContainer ? yn(d.ashesInMetalContainer) : '—')}
          ${row2('Metal container stored', d.metalContainerLocation ? (d.metalContainerLocation === 'inside' ? 'Inside' : 'Outside') : '—')}
          ${row2('Metal container has metal lid', d.metalContainerHasLid ? yn(d.metalContainerHasLid) : '—')}
          ${row2('Ash container on non-flammable surface', d.ashOnNonFlammable ? yn(d.ashOnNonFlammable) : '—')}
          ${row2('WETT inspected since installation', d.wettInspectedSinceInstall === 'Y' ? `Yes — WETT #${d.wettInspectorNumber || '—'}` : d.wettInspectedSinceInstall === 'N' ? 'No' : '—')}
          ${row2('Modifications to unit or chimney', d.modifications === 'Y' ? `Yes — ${d.modificationDetails || 'see remarks'}` : d.modifications === 'N' ? 'No' : '—')}
          ${row2('Previous chimney fire', d.previousChimneyFire === 'Y' ? `Yes — ${d.chimneyFireCause || 'see remarks'}` : d.previousChimneyFire === 'N' ? 'No' : '—')}
        </table>
        <table>
          ${row2('Fuel storage distance from unit', d.fuelDistance ? `${d.fuelDistance} ${d.fuelDistanceUnit}` : '—')}
          ${row2('Smoke detector on same floor', d.smokeDetector ? yn(d.smokeDetector) : '—')}
          ${row2('Fire extinguisher in area of unit', d.fireExtinguisher ? yn(d.fireExtinguisher) : '—')}
          ${row2('Carbon monoxide detector in building', d.coDetector ? yn(d.coDetector) : '—')}
        </table>
      </div>
    `)}

    ${d.section9Remarks.trim() ? section('9. REMARKS', '📝', `
      <div style="padding:12px;font-size:13px;line-height:1.7;color:#374151">${d.section9Remarks.replace(/\n/g, '<br>')}</div>
    `) : ''}

    ${photosSection}

    <!-- Section 10: Sign-off -->
    <div style="margin-top:32px;padding:20px;border:2px solid #1e3a5f;border-radius:8px;background:#f8faff">
      <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.08em;margin-bottom:12px">10. COMPLETED BY</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px">
        <div>
          <div style="font-size:13px;font-weight:700;color:#1e3a5f;margin-bottom:4px">${val(d.inspectorName)}</div>
          <div style="font-size:11px;color:#6b7280">Inspector Name</div>
          <div style="font-size:12px;margin-top:4px">WETT # ${val(d.wettCertNumber, 'Pending')}</div>
        </div>
        <div>
          <div style="border-bottom:1px solid #374151;height:28px;margin-bottom:4px"></div>
          <div style="font-size:11px;color:#6b7280">Signature</div>
        </div>
        <div>
          <div style="font-size:13px;font-weight:700;color:#1e3a5f;margin-bottom:4px">${val(d.inspectionDate)}</div>
          <div style="font-size:11px;color:#6b7280">Date of Inspection</div>
        </div>
      </div>
      <div style="margin-top:16px;font-size:11px;color:#6b7280;border-top:1px solid #e5e7eb;padding-top:12px">
        This report was prepared in accordance with WETT (Wood Energy Technology Transfer Inc.) standards and covers the requirements of the CSIO Solid Fuel Heating Questionnaire (H0910ESFQ).
        This report is valid for the date of inspection only and applies to accessible components of the solid fuel heating system.
        ASADS Home Inspection · (647) 801-9311 · info@asads.ca · www.asads.ca
      </div>
    </div>

  </div><!-- /report-body -->
</div><!-- /report-wrap -->
</body>
</html>`;
}
