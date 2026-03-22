/**
 * Service definitions for service×city cross-pages.
 * Each entry maps to a /services/{slug}/{citySlug} URL.
 */

export interface ServiceDef {
  slug: string;
  name: string;
  shortName: string;
  price: string;
  duration: string;
  metaTitleTemplate: string; // {city} placeholder
  metaDescTemplate: string;  // {city} placeholder
  heroTitle: string;         // {city} placeholder
  whatWeCheck: string[];
  whyItMatters: string;
  processSteps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  relatedServices: { name: string; slug: string }[];
}

export const serviceDefinitions: ServiceDef[] = [
  {
    slug: "pre-purchase",
    name: "Pre-Purchase Home Inspection",
    shortName: "Pre-Purchase Inspection",
    price: "From $399",
    duration: "2–3 Hours",
    metaTitleTemplate: "Pre-Purchase Home Inspection {city} | Certified | ASADS",
    metaDescTemplate:
      "Certified pre-purchase home inspection in {city} from $399. 400-point checklist, thermal imaging option, same-day digital report. Book online today.",
    heroTitle: "Pre-Purchase Home Inspection in {city}",
    whatWeCheck: [
      "Roof condition, shingles & flashings",
      "Foundation & structural integrity",
      "HVAC systems — furnace, AC & ductwork",
      "Electrical panel & branch wiring",
      "Plumbing supply & drain system",
      "Attic insulation & ventilation",
      "Windows, doors & weatherproofing",
      "Basement moisture & waterproofing",
      "Garage structure & door safety",
      "All visible interior surfaces",
    ],
    whyItMatters:
      "Buying a home in {city} is one of the largest financial decisions you'll make. A certified pre-purchase inspection identifies defects before you close — giving you negotiating power or the option to walk away. Our 400-point checklist covers every major system and structure so nothing gets missed.",
    processSteps: [
      { title: "Book Online", body: "Select your date and time. Confirmation sent instantly." },
      { title: "On-Site Inspection", body: "Certified inspector spends 2–3 hours assessing every accessible area of the home." },
      { title: "Same-Day Digital Report", body: "Photo-rich PDF report delivered the same day, readable on any device." },
      { title: "Inspector Debrief", body: "We walk you through findings and answer every question before we leave." },
    ],
    faqs: [
      { q: "How much does a home inspection cost in {city}?", a: "Pre-purchase inspections in {city} start from $399 depending on home size and age. Add-ons like thermal imaging and radon testing are available." },
      { q: "How long does the inspection take?", a: "Typically 2–3 hours for a standard detached home. Larger or older properties may take longer." },
      { q: "Should I attend the inspection?", a: "Absolutely — attending lets you hear findings first-hand, ask questions, and understand the home's systems." },
      { q: "Can I use the report to negotiate?", a: "Yes. The report is your documentation. Many {city} buyers use findings to negotiate credits or repairs before closing." },
    ],
    relatedServices: [
      { name: "Thermal Imaging", slug: "thermal-imaging" },
      { name: "Mold Inspection", slug: "mold-inspection" },
      { name: "Radon Testing", slug: "radon-testing" },
      { name: "Sewer Scope", slug: "sewer-scope" },
    ],
  },
  {
    slug: "pre-listing",
    name: "Pre-Listing Home Inspection",
    shortName: "Pre-Listing Inspection",
    price: "From $399",
    duration: "2–3 Hours",
    metaTitleTemplate: "Pre-Listing Home Inspection {city} | Seller Inspection",
    metaDescTemplate:
      "Pre-listing home inspection in {city} for sellers. Identify issues before buyers do. Same-day report, certified ASADS inspectors. Call (647) 801-9311.",
    heroTitle: "Pre-Listing Home Inspection in {city}",
    whatWeCheck: [
      "All major structural components",
      "Roof, gutters & drainage",
      "Electrical, plumbing & HVAC systems",
      "Interior rooms — floors, walls, ceilings",
      "Attic insulation & ventilation",
      "Basement & crawl space moisture",
      "Exterior cladding, deck & porch",
      "Windows, doors & locks",
      "Garage & driveway condition",
      "All appliances included in sale",
    ],
    whyItMatters:
      "Selling your home in {city}? A pre-listing inspection gives you control. Discover issues before buyers find them, price your home accurately, and eliminate last-minute renegotiations that kill deals. Sellers who list with a completed inspection report close faster and with fewer surprises.",
    processSteps: [
      { title: "Schedule Before Listing", body: "Book 2–4 weeks before your listing date to allow time for repairs if needed." },
      { title: "Full Property Assessment", body: "Inspector reviews every system and structure — same as a buyer's inspection." },
      { title: "Same-Day Report", body: "Receive a complete, photo-documented PDF report the same day." },
      { title: "Repair or Disclose", body: "Fix issues proactively or disclose them — either approach protects you legally and financially." },
    ],
    faqs: [
      { q: "Why should I pay for an inspection before selling?", a: "A pre-listing inspection in {city} prevents buyers from using surprise defects to renegotiate price. You control the narrative and protect your asking price." },
      { q: "Does a pre-listing inspection hurt my sale?", a: "No — it helps. Buyers in {city} feel more confident buying a home that comes with documented inspection results." },
      { q: "Can I share the report with buyers?", a: "Yes. Many {city} sellers provide the report as part of listing disclosure, which speeds up buyer decisions." },
      { q: "What if issues are found?", a: "You can fix them before listing or price accordingly. Either way, you won't face surprise negotiations after an offer is accepted." },
    ],
    relatedServices: [
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Mold Inspection", slug: "mold-inspection" },
      { name: "Thermal Imaging", slug: "thermal-imaging" },
      { name: "Radon Testing", slug: "radon-testing" },
    ],
  },
  {
    slug: "condo",
    name: "Condo Inspection",
    shortName: "Condo Inspection",
    price: "From $299",
    duration: "1.5–2.5 Hours",
    metaTitleTemplate: "Condo Inspection {city} | Fan Coil & Status Certificate",
    metaDescTemplate:
      "Certified condo inspection in {city}. Fan coil units, balcony, parking & status certificate review. Same-day digital report. Call (647) 801-9311.",
    heroTitle: "Condo Inspection in {city}",
    whatWeCheck: [
      "Fan coil HVAC unit & condensate drain",
      "Balcony membrane & railing safety",
      "All interior rooms, walls & ceilings",
      "Windows & patio door seals",
      "In-suite electrical panel & outlets",
      "Plumbing fixtures & water pressure",
      "Kitchen & bathroom conditions",
      "Parking space & locker condition",
      "Building common area observations",
      "Status certificate review guidance",
    ],
    whyItMatters:
      "Condo inspections in {city} differ significantly from house inspections. The inspector focuses on in-suite systems — especially the fan coil HVAC unit — plus shared building elements visible from your unit. Understanding the status certificate alongside the physical inspection protects you from unexpected special assessments.",
    processSteps: [
      { title: "Book with Unit Details", body: "Provide floor, building age, and any known concerns when booking." },
      { title: "In-Suite Inspection", body: "Inspector covers every accessible area of the unit plus visible building elements." },
      { title: "Fan Coil Assessment", body: "The fan coil unit, drain pan, and condensate lines are checked — a common source of costly repairs." },
      { title: "Same-Day Report", body: "Photo-rich PDF delivered same day, including status certificate review notes." },
    ],
    faqs: [
      { q: "Is a condo inspection worth it in {city}?", a: "Yes. Fan coil failures, balcony membrane issues, and window seal failures are common in {city} condos and expensive to fix. An inspection protects your purchase." },
      { q: "Do you review the status certificate?", a: "We provide guidance on what to look for in the status certificate, particularly reserve fund adequacy and pending special assessments." },
      { q: "How is a condo inspection different from a house inspection?", a: "A condo inspection focuses on in-suite systems, shared building elements you can observe, and the fan coil HVAC rather than a full furnace and roof." },
      { q: "How long does a condo inspection take?", a: "Typically 1.5–2.5 hours depending on unit size and age of the building." },
    ],
    relatedServices: [
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Air Quality Testing", slug: "air-quality" },
      { name: "Mold Inspection", slug: "mold-inspection" },
      { name: "Thermal Imaging", slug: "thermal-imaging" },
    ],
  },
  {
    slug: "new-construction",
    name: "New Construction Inspection",
    shortName: "New Construction Inspection",
    price: "From $449",
    duration: "2–4 Hours",
    metaTitleTemplate: "New Construction Inspection {city} | Tarion Warranty | ASADS",
    metaDescTemplate:
      "New home inspection in {city} before Tarion warranty deadlines. Detect builder deficiencies. Same-day report. ASADS certified inspectors. Call (647) 801-9311.",
    heroTitle: "New Construction Inspection in {city}",
    whatWeCheck: [
      "Foundation pour & waterproofing",
      "Framing, sheathing & structural components",
      "Roof shingles, flashings & soffits",
      "HVAC installation & ductwork",
      "Electrical rough-in & panel",
      "Plumbing supply & drain rough-in",
      "Insulation & vapour barrier",
      "Interior finishes — drywall, floors, trim",
      "Windows, doors & weatherstripping",
      "Driveway, grading & drainage",
    ],
    whyItMatters:
      "New homes in {city} aren't automatically defect-free. Builder timelines create pressure that leads to overlooked details. Our inspection before your Tarion PDI (Pre-Delivery Inspection) or at 30-day, 1-year, and 2-year Tarion milestones ensures you document every deficiency while it's covered under warranty.",
    processSteps: [
      { title: "Time the Inspection", body: "Best before your PDI, or at 30-day, 1-year & 2-year Tarion warranty milestones." },
      { title: "Full New-Build Assessment", body: "Inspector reviews all systems and finishes with focus on construction quality and code compliance." },
      { title: "Deficiency Documentation", body: "Every finding is photographed and documented in the report." },
      { title: "Tarion-Ready Report", body: "Report formatted to support your Tarion warranty claim submissions." },
    ],
    faqs: [
      { q: "Should I inspect a new home in {city}?", a: "Absolutely. New homes in {city} regularly have deficiencies that builders are obligated to fix under Tarion — but only if you document them in time." },
      { q: "When is the best time to inspect?", a: "Before your PDI, and again at the 30-day and 1-year Tarion milestones. Each deadline is a window to submit warranty claims." },
      { q: "What is Tarion warranty?", a: "Tarion is Ontario's new home warranty program. It covers deposit protection, defects, and structural issues. You must document and submit claims within specific deadlines." },
      { q: "What deficiencies do you commonly find in new {city} builds?", a: "Common findings include improper grading, attic insulation gaps, HVAC installation issues, drywall tape separation, window seal failures, and incomplete caulking." },
    ],
    relatedServices: [
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Thermal Imaging", slug: "thermal-imaging" },
      { name: "Radon Testing", slug: "radon-testing" },
      { name: "Air Quality Testing", slug: "air-quality" },
    ],
  },
  {
    slug: "commercial",
    name: "Commercial Building Inspection",
    shortName: "Commercial Inspection",
    price: "From $699",
    duration: "3–6 Hours",
    metaTitleTemplate: "Commercial Inspection {city} | Certified Inspector | ASADS",
    metaDescTemplate:
      "Commercial inspection in {city} for retail, office, industrial & multi-unit buildings. Certified inspector, CapEx report, same-day availability. Call (647) 801-9311.",
    heroTitle: "Commercial Inspection in {city}",
    whatWeCheck: [
      "Roof system & drainage",
      "Foundation & structural components",
      "HVAC — rooftop units, boilers & chillers",
      "Electrical service & distribution panels",
      "Plumbing supply & drain systems",
      "Fire protection & suppression systems",
      "Parking lot, loading docks & driveways",
      "Exterior cladding & windows",
      "ADA/AODA accessibility compliance observations",
      "Environmental concerns — visible mold & asbestos",
      "Life safety systems & emergency egress",
      "Capital expenditure forecasting (20-year)",
    ],
    whyItMatters:
      "Commercial inspection in {city} requires deep knowledge of rooftop HVAC units, three-phase electrical systems, commercial plumbing, and fire suppression — none of which appear in a standard home inspection. Buyers and investors in {city} need a certified commercial inspector who understands retail plazas, industrial warehouses, and multi-unit residential buildings, each with distinct risk profiles. Our commercial inspection reports include capital expenditure forecasting, immediate repair priorities, and compliance observations so you can negotiate with confidence and plan your budget accurately.",
    processSteps: [
      { title: "Scope the Property", body: "Share building size, age, and use type so we can allocate the right inspection time and resources." },
      { title: "Full Commercial Assessment", body: "Certified inspector reviews all accessible structural, mechanical, electrical, and life safety systems inside and out." },
      { title: "Detailed Report with CapEx", body: "Comprehensive findings with photos, priority ratings, and 20-year capital expenditure forecasting." },
      { title: "Due Diligence Support", body: "Report supports your purchase negotiation, financing approval, and insurance requirements." },
    ],
    faqs: [
      { q: "What does a commercial inspection in {city} include?", a: "Our commercial inspection in {city} covers structural components, roof, HVAC, electrical, plumbing, fire safety, parking, accessibility, and environmental concerns. You receive a detailed written report with photos and capital expenditure forecasts." },
      { q: "Do you inspect multi-unit residential buildings in {city}?", a: "Yes — we inspect duplexes, triplexes, and larger multi-unit residential properties in {city}, including common areas, mechanical rooms, and shared systems." },
      { q: "What types of commercial properties do you inspect?", a: "Retail plazas, office buildings, industrial/warehouse units, mixed-use buildings, and multi-residential properties across {city} and Ontario." },
      { q: "How long does a commercial inspection take?", a: "Most commercial inspections in {city} take 3–6 hours depending on building size and complexity. Larger properties may require a second visit or additional inspectors." },
      { q: "Do you provide environmental assessments with commercial inspections?", a: "Our inspectors note all visible environmental concerns including mold indicators and suspected asbestos-containing materials. Full Phase I/II ESA and asbestos testing can be arranged as add-ons." },
      { q: "How much does a commercial inspection cost in {city}?", a: "Commercial inspection pricing in {city} starts from $699 and varies based on property size, type, and scope. Contact us for a custom quote — we typically respond within a few hours." },
    ],
    relatedServices: [
      { name: "Asbestos Testing", slug: "asbestos-testing" },
      { name: "Mold Inspection", slug: "mold-inspection" },
      { name: "Air Quality Testing", slug: "air-quality" },
      { name: "Thermal Imaging", slug: "thermal-imaging" },
    ],
  },
  {
    slug: "thermal-imaging",
    name: "Thermal Imaging Inspection",
    shortName: "Thermal Imaging",
    price: "From $199",
    duration: "Add-On or 1–2 Hours Standalone",
    metaTitleTemplate: "Thermographic & Thermal Imaging {city} | Infrared | ASADS",
    metaDescTemplate:
      "Certified thermographic inspection in {city}. FLIR infrared finds hidden moisture, insulation gaps & electrical faults. From $199. Same-day. (647) 801-9311.",
    heroTitle: "Thermographic & Thermal Imaging Inspection in {city}",
    whatWeCheck: [
      "Hidden moisture behind walls & ceilings",
      "Missing or insufficient insulation",
      "Electrical hotspots & overloaded circuits",
      "HVAC ductwork leaks & cold air infiltration",
      "Radiant heat system performance",
      "Window & door air leakage",
      "Roof membrane moisture retention",
      "Foundation moisture intrusion pathways",
      "Plumbing leak signatures",
      "Pest entry point heat signatures",
    ],
    whyItMatters:
      "Thermal imaging in {city} reveals what a standard inspection can't — problems hidden inside walls, floors, and ceilings. FLIR infrared cameras detect temperature differentials that indicate moisture, heat loss, and electrical faults before they become visible or cause structural damage.",
    processSteps: [
      { title: "Condition Requirements", body: "For best results, there should be a 10°C+ temperature differential between inside and outside. Best done in winter or peak summer." },
      { title: "Full Infrared Scan", body: "Inspector scans all accessible walls, ceilings, floors, and electrical panels with a calibrated FLIR camera." },
      { title: "Anomaly Investigation", body: "Thermal anomalies are cross-referenced with moisture meter readings to confirm wet vs. dry cold spots." },
      { title: "Annotated Report", body: "Thermal images are included in the report with colour-calibrated annotations identifying each finding." },
    ],
    faqs: [
      { q: "Is thermal imaging worth it in {city}?", a: "Yes — especially in {city}'s older housing stock. Thermal imaging regularly reveals insulation gaps and hidden moisture that standard inspection misses." },
      { q: "Can thermal imaging see through walls?", a: "No — it detects surface temperature differences that indicate what's behind walls. It cannot see through solid objects." },
      { q: "When should thermal imaging be done?", a: "Winter is ideal when heating is on and the temperature differential is high. Summer with AC running also works well." },
      { q: "Do you include thermal imaging in a home inspection?", a: "Thermal imaging is available as an add-on to any home inspection or as a standalone service for existing homeowners." },
    ],
    relatedServices: [
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Mold Inspection", slug: "mold-inspection" },
      { name: "Air Quality Testing", slug: "air-quality" },
      { name: "Radon Testing", slug: "radon-testing" },
    ],
  },
  {
    slug: "mold-inspection",
    name: "Mold Inspection & Testing",
    shortName: "Mold Inspection",
    price: "From $299",
    duration: "2–3 Hours + Lab Analysis",
    metaTitleTemplate: "Mold Inspection {city} | AIHA Lab Testing | ASADS",
    metaDescTemplate:
      "Certified mold inspection in {city} from $299. Air sampling, black mold ID, AIHA-accredited lab results. Independent inspector — we don't do remediation.",
    heroTitle: "Mold Inspection & Testing in {city}",
    whatWeCheck: [
      "Airborne spore count — indoor vs. outdoor baseline",
      "Toxic species identification (Stachybotrys, Aspergillus)",
      "Hidden wall & ceiling moisture",
      "HVAC ductwork contamination",
      "Sump pit & floor drain mold",
      "Attic insulation & sheathing mold",
      "Basement foundation efflorescence",
      "Window condensation & seal analysis",
      "Surface swab & tape-lift sampling",
      "Post-remediation clearance testing",
    ],
    whyItMatters:
      "Mold in {city} homes is a health risk that goes beyond appearance. Our AIHA-certified lab testing identifies species and spore concentrations — even when mold is hidden inside walls, HVAC systems, or under insulation. We are an independent inspector: we never do remediation, so our assessment is completely unbiased.",
    processSteps: [
      { title: "Visual Assessment & Moisture Mapping", body: "FLIR thermal camera and calibrated moisture meters locate hidden wet areas without opening walls." },
      { title: "Air Cassette Sampling", body: "Calibrated pump draws air through cassette filters. Indoor samples are taken alongside outdoor control samples." },
      { title: "AIHA-Accredited Lab Analysis", body: "Samples analyzed using Spore Trap or PCR/DNA method. Results in 24–72 hours." },
      { title: "Written Report & Remediation Scope", body: "If elevated, we provide a written remediation scope of work for contractor tender." },
    ],
    faqs: [
      { q: "How much does mold testing cost in {city}?", a: "Mold inspection in {city} starts from $299, which includes air sampling and AIHA lab analysis. Full-home assessment from $449." },
      { q: "How do I know if I have mold?", a: "Musty odours, visible discolouration, and unexplained respiratory symptoms are common signs. Air sampling confirms mold presence even when it's hidden." },
      { q: "Do you do mold remediation?", a: "No — we are an independent inspection-only service. This means our assessment is unbiased and our reports are accepted by remediation contractors, insurers, and courts." },
      { q: "What is black mold?", a: "Stachybotrys chartarum produces mycotoxins linked to serious health effects. It requires professional sampling to confirm — visible dark mold is not always Stachybotrys. Our PCR DNA testing identifies species with certainty." },
    ],
    relatedServices: [
      { name: "Air Quality Testing", slug: "air-quality" },
      { name: "Thermal Imaging", slug: "thermal-imaging" },
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Asbestos Testing", slug: "asbestos-testing" },
    ],
  },
  {
    slug: "asbestos-testing",
    name: "Asbestos Testing",
    shortName: "Asbestos Testing",
    price: "From $299",
    duration: "1–2 Hours + Lab Analysis",
    metaTitleTemplate: "Asbestos Testing {city} | O.Reg 278/05 | ASADS",
    metaDescTemplate:
      "Certified asbestos testing in {city} from $299. Bulk sampling, accredited lab, O.Reg 278/05 report. Pre-1990 homes & commercial. Call (647) 801-9311.",
    heroTitle: "Asbestos Testing in {city}",
    whatWeCheck: [
      "Textured ceiling materials (stipple/popcorn)",
      "Vinyl floor tiles & sheet flooring adhesive",
      "Pipe & duct insulation wrapping",
      "Drywall joint compound (pre-1980)",
      "Roofing felt & shingles",
      "Vermiculite attic insulation",
      "Boiler & furnace insulation",
      "Exterior siding (transite/cement board)",
      "Ceiling tiles (pre-1990)",
      "Window glazing compound",
    ],
    whyItMatters:
      "Asbestos-containing materials (ACM) are found in the majority of Ontario homes built before 1990. In {city}, pre-war bungalows and post-war split-levels frequently contain multiple ACM types including stipple ceilings, vinyl floor tiles, pipe wrap insulation, and drywall compound. Disturbing any of these materials during renovation without prior asbestos testing and O.Reg 278/05 compliance exposes workers and occupants to serious long-term health risk and significant legal liability. Our accredited asbestos testing service in {city} provides the written documentation you need to renovate safely, satisfy your insurer, and meet Ontario's regulatory requirements.",
    processSteps: [
      { title: "Identify Suspect Materials", body: "Inspector visually identifies materials likely to contain asbestos based on construction era and type." },
      { title: "Bulk Sampling", body: "Small samples are carefully collected using proper containment procedures to prevent fibre release." },
      { title: "Accredited Lab Analysis", body: "Samples sent to accredited laboratory for PLM (Polarized Light Microscopy) analysis. Results in 3–5 business days." },
      { title: "Written Report & Compliance", body: "Report documents ACM presence, fibre type, percentage, and O.Reg 278/05 compliance requirements." },
    ],
    faqs: [
      { q: "Does my {city} home have asbestos?", a: "If your {city} home was built before 1990, it very likely contains some asbestos-containing materials. Homes built before 1980 frequently contain multiple ACM types across ceilings, floors, insulation, and drywall." },
      { q: "Is asbestos dangerous in a {city} home?", a: "Asbestos is only dangerous when disturbed and fibres become airborne. Intact, undamaged materials are generally safe to leave in place. Testing before any renovation in {city} is essential to know what you're dealing with." },
      { q: "What is O.Reg 278/05 and does it apply in {city}?", a: "Ontario Regulation 278/05 governs all asbestos work on Ontario construction sites including {city}. It requires testing before disturbance, worker training, and specific abatement procedures. Non-compliance results in significant fines and stop-work orders." },
      { q: "How much does asbestos testing cost in {city}?", a: "Asbestos testing in {city} starts from $299 including on-site sampling and accredited lab analysis. Additional samples may be required for larger properties or multiple suspect materials. Contact us for a quote." },
      { q: "How long does asbestos testing take in {city}?", a: "The on-site sampling in {city} takes 1–2 hours. Lab results are returned within 3–5 business days. Rush 24-hour lab processing is available for time-sensitive transactions." },
      { q: "Do I need asbestos testing before renovating in {city}?", a: "Yes — Ontario law requires asbestos testing before any renovation work that could disturb suspect materials in {city}. This applies to both residential and commercial properties and protects both workers and occupants." },
    ],
    relatedServices: [
      { name: "Mold Inspection", slug: "mold-inspection" },
      { name: "Air Quality Testing", slug: "air-quality" },
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Commercial Inspection", slug: "commercial" },
    ],
  },
  {
    slug: "radon-testing",
    name: "Radon Testing",
    shortName: "Radon Testing",
    price: "From $149",
    duration: "90-Day Long-Term Test (Recommended)",
    metaTitleTemplate: "Radon Testing {city} | Health Canada Certified | ASADS",
    metaDescTemplate:
      "Radon testing in {city} from $149. Long-term & short-term options. Health Canada guidelines, certified detectors, written report. Call (647) 801-9311.",
    heroTitle: "Radon Testing in {city}",
    whatWeCheck: [
      "Long-term radon measurement (90+ days, recommended)",
      "Short-term radon screening (2–7 days)",
      "Ground-floor & basement radon levels",
      "Seasonal variation assessment",
      "Health Canada 200 Bq/m³ guideline comparison",
      "Mitigation recommendation if above guideline",
      "Certified Fantech/RadonAway detector calibration",
      "Written report with Bq/m³ readings",
    ],
    whyItMatters:
      "Radon is the second leading cause of lung cancer in Canada. {city} and surrounding Ontario regions have documented elevated radon levels due to local geology. Health Canada recommends testing every home. Long-term testing over 90+ days gives the most accurate annual average concentration.",
    processSteps: [
      { title: "Deploy Certified Detector", body: "A Health Canada-certified long-term alpha track detector is placed in the lowest livable area of your home." },
      { title: "90-Day Monitoring", body: "The detector passively records radon levels over 90 days to establish a reliable annual average." },
      { title: "Lab Analysis", body: "Detector is sent to an accredited Canadian lab for reading. Results in 2–3 weeks after retrieval." },
      { title: "Written Report", body: "Report documents your result vs. Health Canada's 200 Bq/m³ guideline with mitigation recommendations if needed." },
    ],
    faqs: [
      { q: "How much radon is safe in {city}?", a: "Health Canada's guideline is 200 Bq/m³. Above this level, mitigation is recommended. The WHO guideline is 100 Bq/m³." },
      { q: "How long does radon testing take?", a: "Long-term testing takes 90+ days and provides the most accurate results. Short-term testing (2–7 days) is available for real estate transactions." },
      { q: "What happens if radon is high?", a: "Active soil depressurization (ASD) systems typically reduce radon levels by 80–99%. A licensed radon mitigation contractor installs a sub-slab pipe and fan system." },
      { q: "Is radon testing required to buy a home in {city}?", a: "Not legally required, but strongly recommended. Radon is invisible and odourless — testing is the only way to know your level." },
    ],
    relatedServices: [
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Air Quality Testing", slug: "air-quality" },
      { name: "Mold Inspection", slug: "mold-inspection" },
      { name: "Thermal Imaging", slug: "thermal-imaging" },
    ],
  },
  {
    slug: "sewer-scope",
    name: "Sewer Scope Inspection",
    shortName: "Sewer Scope",
    price: "From $299",
    duration: "45–90 Minutes",
    metaTitleTemplate: "Sewer Scope Inspection {city} | CCTV Drain Camera | ASADS",
    metaDescTemplate:
      "HD sewer camera inspection in {city} from $299. Detects root intrusion, bellied pipes & cracks before you buy. GPS mapping, same-day video report.",
    heroTitle: "Sewer Scope Inspection in {city}",
    whatWeCheck: [
      "Root intrusion into clay & cast iron pipes",
      "Bellied (sagging) sewer line sections",
      "Cracked, broken or offset pipe joints",
      "Grease or debris buildup",
      "Pipe material identification (clay, ABS, cast iron)",
      "Pipe diameter & flow assessment",
      "Connection to municipal sewer",
      "Distance & GPS mapping of issues",
      "Backflow valve presence",
      "Inspection access point condition",
    ],
    whyItMatters:
      "Sewer line replacement in {city} typically costs $8,000–$20,000+. A sewer scope inspection for $299 reveals problems before you buy. Clay tile sewers in older {city} neighbourhoods are particularly prone to root intrusion and joint failure that a standard home inspection cannot detect.",
    processSteps: [
      { title: "Access the Cleanout", body: "Inspector locates the sewer cleanout access point — usually in the basement or exterior." },
      { title: "Camera Insertion", body: "A waterproof HD camera is pushed through the sewer line from house to the municipal connection." },
      { title: "Real-Time Recording", body: "Full HD video of the sewer interior is recorded, noting all defects, pipe material, and distance markers." },
      { title: "Same-Day Report & Video", body: "You receive a GPS-mapped report and the full video file the same day." },
    ],
    faqs: [
      { q: "Should I get a sewer scope in {city}?", a: "Yes — especially for homes built before 1980. Clay tile sewers common in older {city} neighbourhoods are highly prone to root intrusion and require $10,000+ to replace." },
      { q: "How much does a sewer inspection cost in {city}?", a: "Sewer scope inspection in {city} is from $299. This is a fraction of the cost of sewer line replacement." },
      { q: "What is a bellied pipe?", a: "A bellied or sagging pipe section holds standing water and debris, causing recurring blockages. It indicates soil settlement and typically requires excavation to repair." },
      { q: "Do you GPS map the sewer findings?", a: "Yes. Our reports include GPS coordinates for any defect locations, which is critical for excavation contractors bidding on repairs." },
    ],
    relatedServices: [
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Thermal Imaging", slug: "thermal-imaging" },
      { name: "Well Water Testing", slug: "well-water-testing" },
      { name: "Mold Inspection", slug: "mold-inspection" },
    ],
  },
  {
    slug: "well-water-testing",
    name: "Well Water Testing",
    shortName: "Well Water Testing",
    price: "From $199",
    duration: "Sampling + 5–10 Day Lab Turnaround",
    metaTitleTemplate: "Well Water Testing {city} | E.coli & Bacteria | ASADS",
    metaDescTemplate:
      "MOH-certified well water testing in {city} from $199. E.coli, bacteria, nitrates & arsenic. Sterile kit, accredited lab results. Call (647) 801-9311.",
    heroTitle: "Well Water Testing in {city}",
    whatWeCheck: [
      "E. coli & coliform bacteria",
      "Nitrates & nitrites",
      "Arsenic & heavy metals",
      "pH & hardness",
      "Sodium & chloride",
      "Iron & manganese",
      "Turbidity",
      "Total dissolved solids",
      "Well casing & cap condition (visual)",
      "Pressure tank & pump system (visual)",
    ],
    whyItMatters:
      "Private wells in {city} and surrounding Ontario counties are not regulated by the municipality. Contamination from agricultural runoff, septic systems, and naturally occurring arsenic is common. Annual testing is recommended by MOH, and testing is mandatory in most real estate transactions involving private wells.",
    processSteps: [
      { title: "Sterile Sample Kit", body: "We provide MOH-approved sterile sample bottles with collection instructions." },
      { title: "Sample Collection", body: "Samples are collected from the tap after proper flushing as per MOH protocol." },
      { title: "Accredited Lab Analysis", body: "Samples are submitted to a MOH-certified laboratory for full panel analysis." },
      { title: "Written Results", body: "Lab results with plain-language interpretation and any recommended treatment options." },
    ],
    faqs: [
      { q: "How often should I test my well in {city}?", a: "MOH recommends testing for bacteria at least twice per year — spring and fall. Test for chemical parameters (arsenic, nitrates) every 3–5 years or when conditions change." },
      { q: "What contaminants are most common in {city} wells?", a: "Coliform bacteria, E. coli from septic proximity, nitrates from agricultural land, and naturally occurring arsenic are the most common concerns in Ontario rural areas." },
      { q: "Is well water testing required when buying a property?", a: "Yes — most lenders and real estate lawyers require recent well water test results for properties with private wells in {city} and throughout Ontario." },
      { q: "What if my water tests positive?", a: "Treatment options include UV disinfection systems for bacteria, reverse osmosis for arsenic and nitrates, and shock chlorination for contamination events. We provide guidance on appropriate systems." },
    ],
    relatedServices: [
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Radon Testing", slug: "radon-testing" },
      { name: "Air Quality Testing", slug: "air-quality" },
      { name: "Sewer Scope", slug: "sewer-scope" },
    ],
  },
  {
    slug: "lead-paint-testing",
    name: "Lead Paint Testing",
    shortName: "Lead Paint Testing",
    price: "From $249",
    duration: "1–2 Hours",
    metaTitleTemplate: "Lead Paint Testing {city} | XRF Certified | ASADS",
    metaDescTemplate:
      "Certified lead paint testing in {city}. XRF screening & lab analysis, written report. Pre-1980 homes & renovations. Call (647) 801-9311.",
    heroTitle: "Lead Paint Testing in {city}",
    whatWeCheck: [
      "All painted surfaces — walls, ceilings, trim",
      "Window sills & friction surfaces (highest risk)",
      "Doors & door frames",
      "Exterior siding & trim",
      "Stair railings & banisters",
      "Painted metal surfaces (pipes, radiators)",
      "Garage & outbuilding surfaces",
      "XRF non-destructive screening",
      "Chip sampling for lab confirmation",
      "Risk assessment for disturbance during renovation",
    ],
    whyItMatters:
      "Lead paint is present in the majority of {city} homes built before 1978. Even intact lead paint on friction surfaces (windows, doors) creates lead dust hazards during normal use. Children and pregnant women are most at risk. Testing before renovation is essential to protect occupants and comply with Ontario regulations.",
    processSteps: [
      { title: "XRF Screening", body: "Non-destructive X-ray fluorescence scanning provides immediate readings on all tested surfaces." },
      { title: "Chip Sampling (if needed)", body: "Where confirmation is required, small paint chip samples are collected and sent to an accredited lab." },
      { title: "Risk Assessment", body: "Inspector assesses condition of lead-containing surfaces and disturbance risk during planned renovations." },
      { title: "Written Report", body: "Report identifies all positive surfaces, condition rating, and safe work practice recommendations." },
    ],
    faqs: [
      { q: "Does my {city} home have lead paint?", a: "If your home was built before 1978, there is a high probability of lead paint on some surfaces. Homes built between 1978–1990 may still contain lead paint on exterior surfaces." },
      { q: "Is lead paint dangerous if it's intact?", a: "Intact lead paint in good condition poses minimal risk. The danger arises when paint deteriorates or is disturbed during renovation, creating lead dust." },
      { q: "Is lead paint testing required before renovation?", a: "For pre-1978 homes in {city}, testing before renovation is strongly recommended and required in some commercial contexts. It protects contractors and occupants." },
      { q: "What is XRF testing?", a: "X-ray fluorescence (XRF) is a non-destructive method that detects lead in paint without removing samples. It provides immediate results on-site." },
    ],
    relatedServices: [
      { name: "Asbestos Testing", slug: "asbestos-testing" },
      { name: "Air Quality Testing", slug: "air-quality" },
      { name: "Mold Inspection", slug: "mold-inspection" },
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
    ],
  },
  {
    slug: "air-quality",
    name: "Air Quality Testing",
    shortName: "Air Quality Testing",
    price: "From $299",
    duration: "2–3 Hours",
    metaTitleTemplate: "Air Quality Testing {city} | VOCs & Allergens | ASADS",
    metaDescTemplate:
      "Indoor air quality testing in {city}. VOCs, particulates, CO2 & allergens. AIHA-accredited lab. Residential & commercial from $299. Call (647) 801-9311.",
    heroTitle: "Air Quality Testing in {city}",
    whatWeCheck: [
      "Volatile Organic Compounds (VOCs)",
      "Airborne particulate matter (PM2.5 & PM10)",
      "Carbon dioxide (CO2) concentration",
      "Carbon monoxide (CO)",
      "Formaldehyde",
      "Mold spore concentration",
      "Allergens — dust mite, pet dander",
      "Radon pre-screening",
      "Humidity & temperature mapping",
      "HVAC filtration effectiveness",
    ],
    whyItMatters:
      "Indoor air quality in {city} homes is often 2–5× more polluted than outdoor air. New construction materials, VOCs from finishes, poor ventilation, and biological contaminants create chronic health concerns. Our AIHA-accredited lab testing provides certified results for health assessments, real estate disclosures, and insurance claims.",
    processSteps: [
      { title: "Pre-Test Assessment", body: "Inspector reviews HVAC system, ventilation rates, and visible moisture concerns before sampling." },
      { title: "Air Sampling", body: "Calibrated pumps and passive samplers collect air quality data from key areas of the home." },
      { title: "Accredited Lab Analysis", body: "Samples are analyzed by an AIHA-accredited laboratory. Results in 3–5 business days." },
      { title: "Health-Focused Report", body: "Report compares findings to Health Canada, ASHRAE, and WHO indoor air quality guidelines." },
    ],
    faqs: [
      { q: "When should I get an air quality test in {city}?", a: "After renovations, when occupants experience unexplained respiratory symptoms, when moving into a new or older home, or when HVAC systems are ageing." },
      { q: "What are VOCs?", a: "Volatile organic compounds are gases emitted from paints, adhesives, cleaning products, furniture, and building materials. High VOC concentrations cause respiratory irritation and chronic health effects." },
      { q: "Does air quality testing detect mold?", a: "Our air quality panel includes mold spore concentration. For a dedicated mold assessment with species identification, our separate mold inspection service is recommended." },
      { q: "How much does air quality testing cost in {city}?", a: "Air quality testing in {city} starts from $299. Comprehensive commercial or multi-room testing packages are available." },
    ],
    relatedServices: [
      { name: "Mold Inspection", slug: "mold-inspection" },
      { name: "Radon Testing", slug: "radon-testing" },
      { name: "Asbestos Testing", slug: "asbestos-testing" },
      { name: "Thermal Imaging", slug: "thermal-imaging" },
    ],
  },
  {
    slug: "wett",
    name: "WETT Inspection",
    shortName: "WETT Inspection",
    price: "From $199",
    duration: "1–2 Hours",
    metaTitleTemplate: "WETT Inspection {city} | Wood Burning & Fireplace | ASADS",
    metaDescTemplate:
      "Certified WETT inspection in {city} for fireplaces, wood stoves & inserts. Required for home sales & insurance. Same-day report. Call (647) 801-9311.",
    heroTitle: "WETT Inspection in {city}",
    whatWeCheck: [
      "Fireplace firebox & refractory panels",
      "Chimney flue lining condition",
      "Clearances to combustibles",
      "Wood stove & insert installation",
      "Chimney cap, crown & flashing",
      "Chimney height & draft requirements",
      "Creosote buildup assessment",
      "Damper operation",
      "Hearth extension dimensions",
      "Pellet stove venting (where applicable)",
    ],
    whyItMatters:
      "A WETT inspection is required by most Ontario insurance companies and is standard in real estate transactions involving wood-burning appliances in {city}. Improper installations and deteriorated flue liners are leading causes of house fires. ASADS provides certified WETT Level 1 and Level 2 inspections by registered technicians.",
    processSteps: [
      { title: "Schedule Before Closing", body: "Book your WETT inspection before your real estate closing date. Insurance companies typically require it before coverage takes effect." },
      { title: "Level 1 or Level 2 Inspection", body: "Level 1 for standard sale/insurance requirements. Level 2 includes video scan of flue — required for change of appliance or after chimney events." },
      { title: "Findings Assessment", body: "Inspector checks all components against WETT installation standards and CSA B365." },
      { title: "Certificate & Report", body: "WETT certificate issued on the same day. Report documents all findings and any deficiencies noted." },
    ],
    faqs: [
      { q: "Is a WETT inspection required to sell my {city} home?", a: "Most {city} insurance companies require a WETT inspection before issuing coverage for homes with wood-burning appliances. It is effectively required for any real estate sale involving a fireplace or wood stove." },
      { q: "What is the difference between Level 1 and Level 2 WETT?", a: "Level 1 is a visual inspection of accessible components — required for most real estate and insurance purposes. Level 2 includes a video camera scan of the flue interior — required when the appliance is changed or after a chimney fire." },
      { q: "How much does a WETT inspection cost in {city}?", a: "WETT inspections in {city} start from $199. Level 2 inspections with video scan are additional." },
      { q: "What happens if the WETT inspection fails?", a: "Deficiencies must be repaired before insurance coverage is granted. Common issues include clearance violations, deteriorated flue liner, improper chimney height, and missing chimney caps." },
    ],
    relatedServices: [
      { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
      { name: "Thermal Imaging", slug: "thermal-imaging" },
      { name: "Pre-Listing Inspection", slug: "pre-listing" },
      { name: "Air Quality Testing", slug: "air-quality" },
    ],
  },
];

/** Lookup map: serviceSlug → ServiceDef */
export const serviceBySlug = Object.fromEntries(
  serviceDefinitions.map((s) => [s.slug, s])
);
