import { buildWettReportHtml, WettFormData } from '../src/lib/wettReportTemplate';
import fs from 'fs';
import path from 'path';

// Convert photos to base64 data URIs
function toDataUri(filePath: string): string {
  const buf = fs.readFileSync(filePath);
  return 'data:image/jpeg;base64,' + buf.toString('base64');
}

const photoDir = 'C:/Users/Owner/Downloads/chimney-tareq';
const photoUrls = [
  toDataUri(path.join(photoDir, 'IMG-20260413-WA0004.jpg')),
  toDataUri(path.join(photoDir, 'IMG-20260413-WA0006.jpg')),
  toDataUri(path.join(photoDir, 'IMG-20260413-WA0007.jpg')),
  toDataUri(path.join(photoDir, 'IMG-20260413-WA0008.jpg')),
];

const data: WettFormData = {
  clientName: 'Tareq Kawar',
  clientPhone: '',
  clientEmail: 'Tkawar@yahoo.com',
  propertyAddress: '29 Mendy\'s Forest, Aurora, Ontario L4G 5A2',
  city: 'Aurora, ON',
  inspectionDate: 'April 13, 2026',
  inspectorName: 'Haroon Chaudhary',
  wettCertNumber: '33245',

  unitRole: 'primary',
  unitYear: '',
  unitMake: 'Masonry',
  unitModel: 'N/A',
  unitCertified: 'N',
  certLabel: '',
  certLabelOther: '',
  heatingUnitType: 'Masonry Fireplace',
  fuel: 'Wood',
  cordsPerYear: '',
  cordType: '',
  hoursPerDay: '',
  daysPerYear: '',

  installedBy: 'Original Construction',
  installerWettCertified: 'N',
  installerWettNumber: '',
  unitLocation: 'inside',

  chimneyType: 'masonry',
  masonrySubtype: 'masonry',
  masonrySubtypeOther: '',
  builtFrom: 'ground',
  chimneyLining: 'other',
  chimneyLiningOther: 'Unlined stone masonry',
  metalChimneySubtype: '',
  metalChimneySubtypeOther: '',
  metalYear: '',
  metalManufacturer: '',
  metalInstalledBy: '',
  metalWettCertified: '',
  metalWettNumber: '',
  ratedFor650: '',
  clearanceToNearest: '',
  clearanceUnit: 'inches',
  cleaningTimesPerYear: '',
  cleaningByWhom: '',
  lastCleaningDate: '',
  chimneyInstalledLocation: 'outside',
  sharesFlue: 'N',
  sharesFlueDetails: '',

  measurementUnit: 'inches',
  thimble: '',
  stovePipeTotalLength: '',
  stovePipeElbows: '',
  stovePipeConstruction: '',
  stovePipeConstructionOther: '',
  stovePipeThroughConcealed: '',
  stovePipeConcealedDesc: '',
  nonCombustiblePad: '',
  distanceToFurniture: '',
  stoveToBackwallActual: '', stoveToBackwallRequired: '',
  stoveToSidewallActual: '16', stoveToSidewallRequired: '6',
  stoveToCornerActual: '',   stoveToCornerRequired: '',
  stoveToCeilingActual: '',  stoveToCeilingRequired: '',
  pipeToBackwallActual: '',  pipeToBackwallRequired: '',
  pipeToSidewallActual: '',  pipeToSidewallRequired: '',
  pipeToCeilingActual: '',   pipeToCeilingRequired: '',
  floorPadFrontActual: '18', floorPadFrontRequired: '16',
  floorPadLeftActual: '',    floorPadLeftRequired: '',
  floorPadRightActual: '',   floorPadRightRequired: '',
  floorPadBackActual: '',    floorPadBackRequired: '',
  sidewallConstruction: 'Masonry brick',
  backwallConstruction: 'Masonry brick',
  ceilingConstruction: '',
  shieldingType: '',
  shieldingTypeOther: '',
  sheetMetalPermanent: '',
  wallSpacersNonCombustible: '',
  airSpaceAtShield: '',
  wallToShieldActual: '',        wallToShieldRequired: '',
  topStoveToTopShieldActual: '', topStoveToTopShieldRequired: '',
  shieldToFloorActual: '',       shieldToFloorRequired: '',
  bottomStoveToFloorActual: '',  bottomStoveToFloorRequired: '',

  ashesInMetalContainer: 'Y',
  metalContainerLocation: 'outside',
  metalContainerHasLid: 'Y',
  ashOnNonFlammable: 'Y',
  wettInspectedSinceInstall: 'Y',
  wettInspectorNumber: '33245',
  modifications: 'N',
  modificationDetails: '',
  previousChimneyFire: 'N',
  chimneyFireCause: '',
  fuelDistance: '6',
  fuelDistanceUnit: 'feet',
  smokeDetector: 'Y',
  fireExtinguisher: 'Y',
  coDetector: 'Y',

  overallResult: 'pass',
  deficiencies: [],
  section6Remarks: 'Masonry wood-burning fireplace with exterior stone chimney. Firebox constructed of concrete masonry units (CMU) with painted white brick facing and wood mantel surround. Chimney flue is unlined stone masonry construction — light creosote deposits noted via internal camera, within acceptable limits. Rain cap present at chimney crown. Damper operational. Clearance from firebox opening to side combustibles: 16 inches (min. 6 in. required). Non-combustible hearth extension in front: 18 inches (min. 16 in. required). All clearances compliant. Unit is insurable.',
  section9Remarks: 'All components inspected were found to be in serviceable condition. No deficiencies noted. Unit meets requirements for insurance purposes.',
  photoUrls,
};

const html = buildWettReportHtml(data);
const outPath = 'C:/Users/Owner/Downloads/WETT_Report_Tareq_Kawar_Aurora.html';
fs.writeFileSync(outPath, html, 'utf8');
console.log('Report saved to:', outPath);
