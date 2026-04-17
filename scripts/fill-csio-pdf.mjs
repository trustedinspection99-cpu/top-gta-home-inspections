import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

const formBytes = fs.readFileSync('C:/Users/Owner/Downloads/chimney-tareq/csio-decrypted.pdf');
const pdfDoc = await PDFDocument.load(formBytes);
const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

const pages = pdfDoc.getPages();
const p1 = pages[0]; // page 1
const p2 = pages[1]; // page 2

const { width: w1, height: h1 } = p1.getSize();
const { width: w2, height: h2 } = p2.getSize();
console.log('Page 1 size:', w1, 'x', h1);
console.log('Page 2 size:', w2, 'x', h2);

const BLACK = rgb(0, 0, 0);
const sz = 8; // font size for form fields

// Helper: draw text at (x, y from TOP-LEFT)
function text(page, str, x, yFromTop, options = {}) {
  const h = page.getHeight();
  page.drawText(str, {
    x,
    y: h - yFromTop,
    size: options.size || sz,
    font: options.bold ? fontBold : font,
    color: BLACK,
    ...options,
  });
}

// ─── PAGE 1 ───────────────────────────────────────────
// Section 1: Applicant info
text(p1, 'Tareq Kawar',                    72,  125);
text(p1, '29 Mendy\'s Forest',              72,  136);
text(p1, 'Aurora, Ontario',                72,  147);
text(p1, 'L4G 5A2',                        310, 147);
text(p1, 'Tkawar@yahoo.com',               72,  168);

// Section 3: Heating Unit — PRIMARY checkbox area
// Mark "Primary" and type
text(p1, 'X', 72,  215, { size: 9, bold: true }); // Primary checkbox
text(p1, '2026',  105, 215);                       // Year (approx)
text(p1, 'Masonry (Built-in)',  145, 215);         // Make
text(p1, 'N/A',  310, 215);                        // Model
text(p1, 'N',  430, 215);                          // Certified Y/N

// Heating unit type: Masonry Fireplace checkbox
text(p1, 'X', 72,  290, { size: 9, bold: true });  // Masonry Fireplace row

// Fuel: Wood
text(p1, 'Wood',  340, 270);
// Hours/Days
text(p1, '3',   430, 270);   // hours per day
text(p1, '60',  500, 270);   // days per year

// Section 4: Installation
text(p1, '29 Mendy\'s Forest, Aurora, ON L4G 5A2',   72,  356);   // Risk address
text(p1, 'Original Construction',                     72,  368);   // Installed by
text(p1, 'N',                                         340, 368);   // WETT certified
text(p1, 'Inside Building',                           430, 368);   // Location

// Section 5: Chimney — Masonry type
text(p1, 'X', 72,  422, { size: 9, bold: true }); // Masonry checkbox
text(p1, 'X', 72,  433, { size: 9, bold: true }); // Built from Ground

// Chimney Lining: Other (Unlined stone masonry)
text(p1, 'X',                      72,  460, { size: 9, bold: true }); // Other lining
text(p1, 'Unlined stone masonry',  100, 460);

// Cleaning
text(p1, '1',                      72,  506);  // Times per year
text(p1, 'Homeowner',             140, 506);   // By whom
text(p1, 'Unknown',               250, 506);   // Date of last
// Chimney installed inside building
text(p1, 'X', 340, 498, { size: 9, bold: true }); // Inside building
// Shares flue: N
text(p1, 'N', 490, 498);

// Section 6: Remarks
text(p1, 'Level 1 WETT inspection conducted April 13 2026. Masonry fireplace with exterior stone chimney.',  72, 565, { size: 7.5 });
text(p1, 'Light creosote only. Damper operational. Rain cap present. Clearances compliant. PASS - No deficiencies.',  72, 575, { size: 7.5 });
text(p1, 'Inspector: Haroon Chaudhry | WETT #33245 | ASADS Home Inspection | 647-801-9311 | info@asads.ca',  72, 585, { size: 7.5 });

// ─── PAGE 2 ───────────────────────────────────────────
// Section 7: Clearances — Masonry fireplace, no stove pipe
// Non-combustible pad: Yes
text(p2, 'Yes',  72, 410);
// Distance to furniture
text(p2, '> 36 in',  72, 425);
// Wall construction
text(p2, 'Masonry brick',  72, 458);   // sidewall
text(p2, 'Masonry brick',  72, 470);   // backwall
text(p2, 'Drywall/plaster', 72, 482);  // ceiling

// Clearance measurements - stove to surfaces (use firebox opening clearances)
// Backwall: N/A (built-in masonry)
text(p2, 'N/A',  390, 335);  text(p2, 'N/A',  445, 335);  // stove to backwall
text(p2, '16"',  390, 347);  text(p2, '6"',   445, 347);  // stove to sidewall
text(p2, 'N/A',  390, 359);  text(p2, 'N/A',  445, 359);  // stove to corner
text(p2, 'N/A',  390, 371);  text(p2, 'N/A',  445, 371);  // stove to ceiling

// Floor pad (hearth extension)
text(p2, '18"',  390, 443);  text(p2, '16"',  445, 443);  // front
text(p2, 'N/A',  390, 455);  text(p2, 'N/A',  445, 455);  // left
text(p2, 'N/A',  390, 467);  text(p2, 'N/A',  445, 467);  // right
text(p2, 'N/A',  390, 479);  text(p2, 'N/A',  445, 479);  // back

// Section 8: Loss Prevention
text(p2, 'Y',  72,  556);  // Ashes in metal container
text(p2, 'Outside',  190, 556);  // container stored
text(p2, 'Y',  72,  568);  // metal lid
text(p2, 'Y',  72,  580);  // non-flammable surface
text(p2, 'Y',  72,  592);  // WETT inspected since install
text(p2, '33245',  240, 592); // WETT inspector number
text(p2, 'N',  72,  604);  // modifications
text(p2, 'N',  72,  616);  // previous chimney fire

text(p2, '6',   370, 556);  // fuel distance
text(p2, 'Y',   370, 568);  // smoke detector
text(p2, 'Y',   370, 580);  // fire extinguisher
text(p2, 'Y',   370, 592);  // CO detector

// Section 9: Remarks
text(p2, 'All components inspected meet WETT requirements. Unit is insurable as inspected.',  72, 650, { size: 7.5 });

// Section 10: Completed by
text(p2, 'Haroon Chaudhry',   72,  742, { bold: true });
text(p2, 'WETT #33245',       72,  754, { size: 7.5 });
text(p2, 'April 13, 2026',    430, 742);

const outBytes = await pdfDoc.save();
fs.writeFileSync('C:/Users/Owner/Downloads/CSIO_Form_Tareq_Kawar_Filled.pdf', outBytes);
console.log('CSIO form saved.');
