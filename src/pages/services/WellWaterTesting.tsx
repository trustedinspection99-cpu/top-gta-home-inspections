import { Droplets, TestTube, Beaker, ShieldCheck, Microscope, AlertTriangle } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function WellWaterTesting() {
  const pageTitle = "Well Water Testing Ontario | E.coli, Bacteria & Arsenic | ASADS";
  const metaDescription = "MOH-certified well water test for E.coli, bacteria, nitrates & arsenic. Private wells, cottages & rural Ontario. Sterile kit, accredited lab results. From $199.";

  return (
    <ServicePageTemplate
      title="Well Water Testing"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="Well Water Testing & Drinking Water Quality Test — MOH Accredited Lab"
      heroSubtitle="Protect your family from invisible contaminants. Certified well water testing for E.coli, bacteria, nitrates, and arsenic across Ontario — private wells, rural properties, and cottages. MOH-accredited lab, results within 5–7 business days."
      icon={Droplets}
      price="From $199"
      duration="Sample Collection + Lab Time"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            Private well water is not regulated in Ontario, meaning homeowners are 100% 
            responsible for their own water safety. According to Public Health Ontario, 
            <strong> 1 in 4 private wells</strong> test positive for bacterial contamination 
            that can lead to serious gastrointestinal illness.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl">
            <h4 className="text-amber-900 font-bold flex items-center gap-2">
              <AlertTriangle className="text-amber-600" size={20} />
              Real Estate & Mortgage Requirements
            </h4>
            <p className="text-amber-800 text-sm mt-1">
              Most Canadian mortgage lenders require a <strong>Certificate of Potability</strong> 
              issued within 30 days of closing. Our "Real Estate Full Analysis" package meets 
              all lender requirements for bacteria and chemical concentrations.
            </p>
          </div>

          <p>
            Our technicians use sterile sampling protocols to prevent cross-contamination.
            We handle the chain of custody and utilize <strong>same-day lab courier services</strong>
            to ensure samples reach the laboratory within the strict 6-24 hour holding
            window required for accurate results.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">When Should You Test Your Well Water?</h3>
            <ul className="space-y-3">
              {[
                "When buying a property with a private well — required by most mortgage lenders as a condition of financing",
                "Annually as a routine health precaution — recommended by the Ontario Ministry of Health for all private well owners",
                "After a flood or nearby construction that may have disturbed the aquifer or compromised the well casing",
                "If you notice changes in taste, smell, or colour — including sulphur odour, metallic taste, or visible cloudiness",
                "After any work on the well pump, pressure tank, or casing that may have introduced surface contamination",
                "If a neighbour's well has tested positive for contamination from agricultural runoff or a spill",
                "Before and after installing any water treatment system to confirm the system is performing as designed",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="text-blue-600 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">What Contaminants We Test For</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "E. coli & Total Coliform", body: "Indicator bacteria that confirm fecal contamination of the water supply. The Maximum Acceptable Concentration (MAC) is zero — any detection requires immediate action." },
                { title: "Nitrates & Nitrites", body: "Primarily from agricultural fertilizer runoff and septic systems. The MAC is 10 mg/L. Nitrates are especially dangerous for infants under 6 months, causing Blue Baby Syndrome." },
                { title: "Hardness & Iron", body: "High hardness causes limescale buildup in pipes and appliances; elevated iron causes orange staining on fixtures and laundry and shortens the life of water treatment equipment." },
                { title: "Arsenic", body: "Naturally occurring in Ontario Shield geology. Colorless and tasteless — impossible to detect without testing. The MAC is 0.010 mg/L; long-term exposure causes cancer and cardiovascular disease." },
                { title: "Lead", body: "Can enter water from old service pipes, brass fittings, and lead solder in the distribution system. The MAC is 0.005 mg/L; exposure causes irreversible neurological harm in children." },
                { title: "pH & Turbidity", body: "Low pH (acidic water) corrodes pipes and leaches metals; high turbidity indicates suspended particulates and potential pathogen transport. Both parameters indicate treatment system effectiveness." },
              ].map((card, i) => (
                <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-1">{card.title}</h4>
                  <p className="text-slate-700 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Well Water Testing Process</h3>
            <ol className="space-y-4">
              {[
                { step: "1", title: "Sterile Sample Collection", body: "We use MOH-prescribed sterile sampling bottles and follow strict field protocols — including well flushing, tap sanitization, and controlled fill procedures — to prevent any cross-contamination during collection." },
                { step: "2", title: "Chain of Custody Documentation", body: "Every sample is sealed with tamper-evident tape, labelled with the collection time and location, and transported under a signed chain of custody form accepted by MOH-accredited laboratories." },
                { step: "3", title: "Accredited Lab Analysis", body: "An MOH-accredited laboratory performs analysis within 24–48 hours of receipt, using methods prescribed under Ontario Regulation 170/03 for drinking water quality standards." },
                { step: "4", title: "Results and Recommendations", body: "You receive the full official laboratory report comparing all parameters to Ontario Drinking Water Standards, along with our written interpretation and specific treatment recommendations for any parameter that exceeds the MAC." },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{item.step}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-slate-700 text-sm mt-1">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      }
      whatWeInspect={[
        "E.coli & Total Coliforms",
        "Nitrate-Nitrogen (MAC 10mg/L)",
        "Nitrites & Ammonia",
        "Lead & Arsenic concentrations",
        "Uranium & Fluoride",
        "Sodium & Chloride (Road Salt)",
        "Iron & Manganese (Staining)",
        "Hardness & Alkalinity",
        "pH Levels & Turbidity",
        "Total Dissolved Solids (TDS)",
        "Sulphate & Hydrogen Sulphide",
        "Treatment system performance",
      ]}
      features={[
        {
          title: "MOH Accredited Labs",
          description: "All samples are processed by Ontario Ministry of Health licensed laboratories following O.Reg. 170/03 standards."
        },
        {
          title: "Same-Day Courier",
          description: "We provide rapid transport for samples to ensure biological integrity, vital for time-sensitive real estate closings."
        },
        {
          title: "Potability Certification",
          description: "Receive a formal laboratory report formatted specifically for mortgage lenders and municipal health records."
        },
        {
          title: "Treatment Consultation",
          description: "If contaminants exceed MAC limits, we provide unbiased advice on UV sterilization, RO systems, or chlorination."
        },
      ]}
      benefits={[
        "Lender-approved reports",
        "Clinical sampling protocols",
        "Same-day kit delivery",
        "Identify hidden E.coli",
        "Annual testing reminders",
        "Unbiased 3rd party analysis",
        "Emergency priority testing",
        "Peace of mind for families",
      ]}
      faqs={[
        {
          question: "How often should I test my well water in Ontario?",
          answer: "Public Health Ontario recommends testing for bacteria (E.coli/Coliform) every 6 months and a full chemical/mineral analysis every 2 years, or after any significant weather events."
        },
        {
          question: "Can I just use the free provincial well water test?",
          answer: "The free public health test only covers basic bacteria. It does not test for Nitrates, Lead, Arsenic, or chemicals—parameters required by most mortgage lenders and essential for comprehensive health safety."
        },
        {
          question: "What if my well water fails the test?",
          answer: "We provide a clear remediation roadmap. This may include 'shocking' the well with chlorine, installing a UV light system, or repairing a damaged well cap or casing."
        },
        {
          question: "What is the MAC for Nitrates in Ontario well water?",
          answer: "The Maximum Acceptable Concentration (MAC) for Nitrate-Nitrogen is 10 mg/L. Levels above this pose a risk of 'Blue Baby Syndrome' (methemoglobinemia) in infants."
        },
        {
          question: "How much does well water testing cost in the GTA?",
          answer: "Well water testing starts from $199 for basic bacteria analysis. Our comprehensive 'Real Estate Full Analysis' package is priced higher and meets all lender requirements. Contact us at (647) 801-9311."
        },
        {
          question: "What happens if my well water fails the test?",
          answer: "If E. coli or coliform is detected, the well requires shock chlorination (a disinfection procedure) followed by resampling. For chemical contamination like arsenic or nitrates, a point-of-entry treatment system (reverse osmosis, UV, or ion exchange) may be required. In a real estate transaction, a failed well water test is grounds for renegotiation or seller remediation."
        },
        {
          question: "Does Ontario require well water testing when buying rural property?",
          answer: "While not legally mandated, most mortgage lenders and real estate lawyers require a satisfactory well water test as a condition of financing. CMHC and major banks require potability certification for insured mortgages on properties with private wells. We provide the full test kit, sampling, lab analysis, and the written certification your lawyer needs."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
        { title: "Radon Testing", href: "/services/radon-testing" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
      ]}
    />
  );
}
