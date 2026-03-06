import { Pipette, ShieldAlert, FileSearch, HardHat, AlertTriangle, Thermometer } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function LeadPaintTesting() {
  const pageTitle = "Lead Paint Testing & Lead Testing Toronto | XRF Certified | From $349 | ASADS";
  const metaDescription = "Professional lead paint testing and lead testing in Toronto & GTA. XRF certified lead paint inspection for homes built before 1990. Ontario Regulation 278/05 compliant reports. From $349.";

  return (
    <ServicePageTemplate
      title="Lead Paint Testing"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="Certified Lead Paint Testing & Lead Testing — Toronto & GTA"
      heroSubtitle="Professional lead paint testing and lead testing for homes built before 1990. XRF Certified Inspection · Lead Dust Wipe Testing · Ontario Regulation 278/05 Compliant. Protecting GTA families from lead-based hazards."
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
            Whether you are planning a renovation, buying an older Toronto home, or are
            concerned about child safety, our certified Lead Risk Assessors provide
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
                { step: "2", title: "XRF Non-Destructive Analysis or Dust Wipe Sampling", body: "We use XRF (X-ray Fluorescence) technology for a non-destructive scan of all flagged surfaces. Where XRF is inconclusive, EPA-standard dust wipe samples are collected from floors, windowsills, and friction surfaces." },
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
                "If surfaces will be disturbed during renovation, Ontario Regulation 278/05 requires abatement by a licensed abatement contractor before work begins",
                "In real estate transactions, identified lead hazards can be used to negotiate a repair credit or price adjustment at closing",
                "We provide a scope of work document suitable for tendering remediation to qualified abatement contractors",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
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
          description: "We collect EPA-standard dust wipes to measure current lead hazard levels on floors and surfaces where children play."
        },
        {
          title: "Ontario Reg 278/05",
          description: "Our reports are legally compliant for contractors and homeowners planning renovations in pre-1978 buildings."
        },
        {
          title: "Certified Risk Assessors",
          description: "Inspections are performed by Radiation Safety Officer certified technicians with EPA RRP credentials."
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
        "GTA-Wide Service",
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
          question: "How much does lead paint testing cost in Toronto?",
          answer: "Lead paint testing in Toronto starts from $349. Pricing depends on home size and number of surfaces tested. Contact us at (647) 801-9311 for a personalized quote."
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
        { title: "Asbestos Testing", href: "/services/asbestos-testing" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
      ]}
    />
  );
}
