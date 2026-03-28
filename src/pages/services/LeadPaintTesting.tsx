import { Pipette, ShieldAlert, FileSearch, HardHat, AlertTriangle, Thermometer } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function LeadPaintTesting() {
  const pageTitle = "Lead Paint Testing Ontario | XRF Testing | From $349";
  const metaDescription = "Lead paint testing across Ontario. XRF certified inspection for homes built before 1990. O.Reg 278/05 compliant reports. From $349. Same-day results.";

  return (
    <ServicePageTemplate
      title="Lead Paint Testing"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="Certified Lead Paint Testing & XRF Lead Testing — Ontario"
      heroSubtitle="Professional lead paint testing for homes built before 1990 across Ontario. XRF Certified Inspection · Lead Dust Wipe Testing · Ontario Regulation 278/05 Compliant. Protecting Ontario families from lead-based hazards."
      icon={Pipette}
      price="From $349"
      duration="1-3 Hours"
      description={
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-xl">
            <h4 className="text-red-900 font-bold flex items-center gap-2">
              <ShieldAlert className="text-red-600" size={20} />
              HEALTH WARNING: Lead Poisoning Risk
            </h4>
            <p className="text-red-800 text-sm mt-1">
              Lead paint dust is the #1 cause of lead poisoning in children. <strong>85% of homes 
              built before 1990</strong> contain lead-based paint. Disturbing these surfaces 
              during renovations creates toxic, invisible dust that can cause permanent 
              neurological damage.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-slate-700">
            At ASADS, we use state-of-the-art <strong>XRF (X-Ray Fluorescence)</strong> technology 
            to identify lead content through multiple layers of paint without damaging your 
            walls or trim. Our process is non-destructive, instant, and meets all 
            Health Canada and Ontario Ministry of Labour standards.
          </p>

          <p>
            Whether you are planning a renovation, buying an older Ontario home, or are
            concerned about child safety, our certified lead paint inspectors provide
            comprehensive testing that covers windowsills, baseboards, and exterior
            siding—the areas where lead concentration is typically highest.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">When Is Lead Paint Testing Required in Ontario?</h3>
            <ul className="space-y-3">
              {[
                "Homes built before 1990 — the older the home, the higher the probability and concentration of lead-based paint",
                "Pre-renovation — Ontario Regulation 278/05 requires testing before disturbing any suspect painted surfaces",
                "Real estate due diligence — buyers and sellers need to understand lead hazards before transferring ownership",
                "Daycares and schools — child-occupied facilities face strict lead safety obligations under provincial regulations",
                "Pre-demolition — demolition contractors must identify lead-containing materials before any structural work begins",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldAlert className="text-red-600 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">How Our Lead Paint Testing Works</h3>
            <ol className="space-y-4">
              {[
                { step: "1", title: "Visual Survey of Suspect Materials", body: "Our assessor walks the entire property and identifies all painted surfaces, components, and materials with a likely lead-paint history based on age, condition, and location." },
                { step: "2", title: "XRF Non-Destructive Analysis or Dust Wipe Sampling", body: "We use XRF (X-ray Fluorescence) technology for a non-destructive scan of all flagged surfaces. Where XRF is inconclusive, Health Canada–standard dust wipe samples are collected from floors, windowsills, and friction surfaces." },
                { step: "3", title: "Samples Sent to Accredited Lab", body: "All dust wipe and paint chip samples are sealed and delivered to a CFIA-accredited laboratory under a documented chain of custody for analysis." },
                { step: "4", title: "Written Report with Lab Results and Remediation Recommendations", body: "You receive a full written report showing XRF readings and lab results by location, flagging any exceedances, and providing a clear remediation scope for each affected component." },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{item.step}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-slate-700 text-sm mt-1">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">What If Lead Paint Is Found?</h3>
            <ul className="space-y-3">
              {[
                "If intact and undisturbed, encapsulation (painting over with a bonding primer) may be sufficient — full abatement is not always required",
                "If surfaces will be disturbed during renovation, Ontario Regulation 278/05 requires removal by an Ontario-licensed abatement contractor before work begins",
                "In real estate transactions, identified lead hazards can be used to negotiate a repair credit or price adjustment at closing",
                "We provide a scope of work document suitable for tendering lead paint removal to Ontario-licensed contractors",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Lead Paint Testing by City — Ontario</h3>
            <p className="text-slate-700 mb-6">Lead paint risk is directly tied to the age of a home. The older the housing, the higher the probability of lead-based paint on surfaces. Here is what our inspectors find across Ontario's key markets.</p>
            <div className="space-y-4">
              {[
                {
                  city: "Lead Paint Testing — Toronto & Etobicoke",
                  body: "Toronto has one of Ontario's highest concentrations of pre-1960 housing stock — particularly in Etobicoke, North York, East York, and the older downtown neighbourhoods. Lead paint was used on virtually all painted surfaces in homes built before 1978, and remains present on trim, doors, window sashes, and walls in the majority of unrestored Toronto heritage properties. The City of Toronto's community housing portfolio and aging rental stock present ongoing lead paint exposure risks, particularly for children in homes with deteriorating painted surfaces. XRF testing during pre-purchase inspection documents all surfaces with detectable lead levels — distinguishing between intact encapsulated lead (manageable) and deteriorated friction surfaces (immediate hazard) — so buyers understand exactly what action is required before occupancy or renovation.",
                },
                {
                  city: "Lead Paint Testing — Hamilton & Older Ontario City Cores",
                  body: "Hamilton's lower city, Dundas, and Waterdown contain some of Ontario's densest concentrations of pre-1940 housing where lead paint is present on essentially every painted surface. Hamilton's heritage residential streets — many dating from the late 1800s and early 1900s — have layered paint histories where lead-containing coatings are buried under multiple later paint applications. Sanding, stripping, or abrading these surfaces during renovation creates lead dust exposures that require Designated Substance Survey documentation and Ontario-licensed abatement contractor involvement under O.Reg 278/05. Other older Ontario city cores including Brantford, Guelph, Cambridge, and St. Catharines present similar pre-1940 heritage housing lead paint risks that XRF testing can rapidly document without surface disturbance.",
                },
                {
                  city: "Lead Paint Testing — Brampton, Mississauga & 1960s–1980s Housing",
                  body: "Lead was permitted in residential paint in Canada until 1976. Brampton, Mississauga, Scarborough, and the other rapid-growth municipalities of the 1960s and 1970s contain substantial housing stock where lead paint is still present on original trim and interior surfaces. Brampton's Bramalea area, Mississauga's Malton, Cooksville, and Port Credit neighbourhoods, and Scarborough's postwar bungalow tracts all fall within the lead paint era. XRF testing is non-destructive and non-invasive — it identifies lead concentrations on every surface without creating any dust, making it safe for occupied homes and completed in 1–3 hours depending on property size. Pre-purchase lead testing in these markets is standard due diligence for buyers of pre-1980 homes.",
                },
                {
                  city: "Lead Paint Testing — Barrie, Newmarket & Heritage Communities",
                  body: "Barrie's older residential neighbourhoods downtown and Newmarket's heritage core streets contain significant pre-1960 housing where lead paint testing is recommended as part of any pre-purchase or pre-renovation assessment. Cottage country properties across Simcoe County, Muskoka, and the Kawartha Lakes often contain older seasonal and permanent housing where lead paint on window trim, exterior siding, and porch structures has deteriorated significantly due to weather exposure — creating hazardous flaking conditions that standard visual inspection alone cannot quantify. Our XRF testing service covers all of Barrie, Simcoe County, and cottage country markets with same-day report delivery.",
                },
              ].map((item) => (
                <div key={item.city} className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{item.city}</h4>
                  <p className="text-sm text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      whatWeInspect={[
        "XRF analysis of interior walls",
        "Window sashes and sills (High Risk)",
        "Door frames and friction surfaces",
        "Baseboards and decorative trim",
        "Radiators and metal piping",
        "Exterior siding and soffits",
        "Kitchen and bathroom cabinetry",
        "Lead dust wipe sampling (Floors)",
        "Paint chip laboratory analysis",
        "Soil contamination near foundation",
        "Child-occupied play area safety",
        "Ontario Reg 278/05 compliance check",
      ]}
      features={[
        {
          title: "XRF Non-Destructive Testing",
          description: "Our X-Ray guns 'see' through layers of modern paint to detect lead in original coatings without any scraping or damage."
        },
        {
          title: "Dust Wipe Analysis",
          description: "We collect Health Canada–standard dust wipes to measure current lead hazard levels on floors and surfaces where children play."
        },
        {
          title: "Ontario Reg 278/05",
          description: "Our reports are legally compliant for contractors and homeowners planning renovations in pre-1978 buildings."
        },
        {
          title: "Ontario-Certified Inspectors",
          description: "Inspections are performed by certified technicians following Ontario Ministry of Labour and O.Reg 278/05 standards."
        },
      ]}
      benefits={[
        "XRF Certified Technicians",
        "Non-Destructive Methodology",
        "Instant On-Site Results",
        "Accredited Lab Documentation",
        "Child Safety Prioritization",
        "Renovation Safety Planning",
        "Ontario Regulation Compliant",
        "Ontario-Wide Service",
      ]}
      faqs={[
        {
          question: "How do I know if my home has lead paint?",
          answer: "If your home was built before 1990, there is a high probability of lead paint. For homes built before 1960, the lead concentration can be as high as 50% by weight. Professional XRF testing is the only definitive way to confirm."
        },
        {
          question: "Is lead paint testing required for renovations in Ontario?",
          answer: "Yes. Ontario Regulation 278/05 requires testing before any work that disturbs painted surfaces in older buildings to ensure workers and residents are protected from toxic lead dust."
        },
        {
          question: "Are DIY lead test kits accurate?",
          answer: "No. Swab-style DIY kits often produce false negatives because they only test the top layer of paint and cannot penetrate the older, lead-heavy layers underneath."
        },
        {
          question: "What are the health effects of lead exposure?",
          answer: "In children, exposure leads to permanent IQ loss, learning disabilities, and behavioral issues. In adults, it causes hypertension and kidney damage. No amount of lead in the blood is considered safe."
        },
        {
          question: "How much does lead paint testing cost in Ontario?",
          answer: "Lead paint testing in Ontario starts from $349 for a standard residential assessment. Larger homes or properties requiring lab analysis for dust wipe samples may range from $449–$599. Contact us at (647) 801-9311 for a personalized quote."
        },
        {
          question: "What does XRF lead testing mean?",
          answer: "XRF (X-ray Fluorescence) is a non-destructive technology that measures lead content in paint layers without sampling or damage to surfaces. It provides instant results on-site and can test painted surfaces, pipes, and soil. Our XRF instruments are calibrated to Health Canada standards."
        },
        {
          question: "Can lead paint be left in place?",
          answer: "Yes — if the lead paint is in good condition and will not be disturbed, encapsulation (painting over with a bonding primer) is often sufficient. Ontario Regulation 278/05 only mandates abatement when painted surfaces will be sanded, stripped, or demolished. We'll flag which materials require action in our report."
        },
        {
          question: "What are the health risks of lead paint exposure?",
          answer: "Lead exposure causes irreversible neurological damage in children, particularly those under 6. In adults it causes kidney damage, high blood pressure, and cognitive effects. The primary risk comes from deteriorating paint or renovation dust — intact, well-adhered paint poses minimal risk if undisturbed."
        },
      ]}
      relatedServices={[
        { title: "Designated Substance Survey", href: "/services/designated-substance-survey" },
        { title: "Asbestos Testing", href: "/services/asbestos-testing" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
      ]}
    />
  );
}
