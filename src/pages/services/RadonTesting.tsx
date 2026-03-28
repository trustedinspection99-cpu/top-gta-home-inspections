import { Radio, ShieldAlert, Activity, ClipboardCheck, LayoutList, GraduationCap } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function RadonTesting() {
  const pageTitle = "Radon Testing Ontario | C-NRPP Certified | ASADS";
  const schemaDescription = "C-NRPP certified radon testing Ontario. Health Canada monitoring. Protect your family from Canada's #1 cause of lung cancer in non-smokers. From $499.";

  return (
    <ServicePageTemplate
      title="Radon Testing & Radon Measurement"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="Protect Your Home From Radioactive Radon Gas"
      heroSubtitle="Radon is the #1 cause of lung cancer in non-smokers. Our C-NRPP certified inspectors use professional-grade digital monitors to provide Health Canada compliant safety audits."
      icon={Radio}
      price="From $499"
      duration="48-Hour Digital or 91-Day Alpha Track"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            Radon is a naturally occurring radioactive gas that enters homes through foundation cracks, sump pits, and floor drains. Because it is <strong>colorless, odorless, and tasteless</strong>, it is impossible to detect without specialized equipment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center text-center p-5 bg-red-50 rounded-xl border border-red-100 shadow-sm">
              <ShieldAlert className="text-red-600 mb-2" size={32} />
              <h4 className="font-bold text-red-900">Cancer Prevention</h4>
              <p className="text-xs text-red-800">Health Canada attributes 16% of lung cancer deaths to radon. Testing is the only way to assess your family's risk.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
              <Activity className="text-blue-600 mb-2" size={32} />
              <h4 className="font-bold text-blue-900">Digital CRM</h4>
              <p className="text-xs text-blue-800">We use Continuous Radon Monitors (CRM) that log hourly fluctuations to provide a precise concentration profile.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <GraduationCap className="text-slate-600 mb-2" size={32} />
              <h4 className="font-bold text-slate-900">C-NRPP Certified</h4>
              <p className="text-xs text-slate-800">Our inspectors are certified by the Canadian National Radon Proficiency Program, ensuring national standards are met.</p>
            </div>
          </div>

          <p>
            Health Canada has established an action level of <strong>200 Bq/m³</strong>. Our reports provide clear guidance on whether your home requires a <em>Sub-Slab Depressurization</em> system to vent this gas safely outdoors.
          </p>

          <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Why Radon Is a Serious Risk in Ontario</h3>
            <p className="text-slate-700 mb-3">
              Health Canada estimates radon causes approximately <strong>3,200 lung cancer deaths per year</strong> in Canada — more than impaired driving. Ontario has significant radon variability: the Canadian Shield geology in Northern and Central Ontario releases high concentrations. The Canadian average is 96 Bq/m³ but many GTA basements exceed the 200 Bq/m³ action level. Health Canada recommends all homes be tested.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">When Should You Test for Radon?</h3>
            <ul className="space-y-2">
              {[
                "Buying any home (especially with basement living space)",
                "If you spend significant time in the basement or lower levels",
                "After any major renovations that may have changed air pathways",
                "If you live near Canadian Shield geology (Barrie, Peterborough, Hamilton area)",
                "If a neighbouring property tested high",
                "As part of an annual home health audit",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ShieldAlert className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-600 mt-3 italic">
              Note: radon cannot be smelled or seen — testing is the only way to know.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">What Happens If Your Radon Level Is High?</h3>
            <ol className="space-y-4">
              {[
                {
                  step: "1",
                  title: "200–600 Bq/m³",
                  body: "Health Canada recommends mitigation within 2 years. A sub-slab depressurization (SSD) system is the most effective solution. Typical cost $1,500–$3,000.",
                },
                {
                  step: "2",
                  title: "Over 600 Bq/m³",
                  body: "Mitigation recommended within 1 year. Priority remediation.",
                },
                {
                  step: "3",
                  title: "After Mitigation",
                  body: "A follow-up test confirms the system worked. A properly installed SSD system typically reduces radon by 80–99%.",
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900">If {item.title}</h4>
                    <p className="text-sm text-slate-700">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Radon Testing by City — Ontario</h3>
            <p className="text-slate-700 mb-6">Radon risk in Ontario is directly tied to the underlying geology. Homes on or near Canadian Shield bedrock face higher baseline radon concentrations. Here is what our inspectors find across Ontario's major markets.</p>
            <div className="space-y-4">
              {[
                {
                  city: "Radon Testing — Barrie & Simcoe County",
                  body: "Barrie and Simcoe County have some of the highest measured radon levels in Ontario, driven by the region's proximity to granite and uranium-bearing Canadian Shield bedrock. Homes in Barrie's south end, Innisfil, Collingwood, Midland, and Orillia sit directly on Shield-influenced soils where radon concentrations routinely exceed 200 Bq/m³ — Health Canada's remediation action level. Extended heating seasons mean Barrie homes are sealed for 6–7 months annually, reducing natural air exchange and allowing radon to accumulate in basements and lower-level living spaces. C-NRPP certified radon testing is strongly recommended as part of any pre-purchase inspection in Barrie, Innisfil, Collingwood, Midland, and all of Simcoe County.",
                },
                {
                  city: "Radon Testing — Toronto & GTA",
                  body: "Toronto's radon levels are generally lower than Barrie and Simcoe County but remain a real concern in specific neighbourhoods and building types. Detached homes in Scarborough, North York, and Etobicoke built on glacial till and clay soils can exhibit elevated radon — particularly where basement living spaces, finished rec rooms, or secondary suites are present. Toronto condominiums above the 4th floor present negligible radon risk due to their height above grade, but units on the 1st–3rd floor and ground-level townhomes warrant testing. Any Toronto pre-purchase inspection that includes a basement apartment, nanny suite, or finished basement should include radon measurement. ASADS provides Health Canada compliant digital radon testing across all Toronto neighbourhoods and GTA municipalities.",
                },
                {
                  city: "Radon Testing — Hamilton & Surrounding Area",
                  body: "Hamilton sits at the edge of the Niagara Escarpment — a geological feature with elevated uranium content in the underlying dolostone and shale that can release radon into soil gas. Homes in Hamilton's lower city and on the Mountain above the Escarpment face different radon risk profiles: upper Mountain homes backed against the Escarpment face generally experience higher soil gas concentrations than lower city properties on lacustrine clay. The older housing stock in Hamilton's core — many with stone foundations, open sump pits, and aging drain tile — provides multiple radon entry pathways that modern construction avoids. Radon testing is recommended for all Hamilton pre-purchase inspections involving a finished basement or lower-level occupancy.",
                },
                {
                  city: "Radon Testing — Kitchener, Waterloo & Cambridge",
                  body: "The Waterloo Region sits on glacial till over sedimentary bedrock with moderate radon potential — lower than the Canadian Shield regions but above the national average in many neighbourhoods. Kitchener's older housing stock — particularly the post-war bungalows of Bridgeport, Stanley Park, and Westmount — have unfinished basements with open sump pits and concrete block foundations that allow radon entry. Cambridge's Grand River valley properties and Galt heritage homes with stone foundations are among the highest radon-risk properties in the region. Pre-purchase radon testing in Kitchener-Waterloo-Cambridge is strongly recommended for any home with a basement occupancy — a finished basement apartment or recreation room significantly increases daily radon exposure hours.",
                },
              ].map((item) => (
                <div key={item.city} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{item.city}</h4>
                  <p className="text-sm text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      whatWeInspect={[
        "Basement & Lowest Occupied Level Air Quality",
        "Foundation Crack & Expansion Joint Evaluation",
        "Sump Pit Cover & Sealing Inspection",
        "Floor Drain & Trap Performance",
        "Wall-Floor Interface (Cove Joint) Assessment",
        "Utility Penetration Points (Water/Gas/Sewer)",
        "HVAC Pressure Balancing & Ventilation Rates",
        "Crawl Space Vapor Barrier Integrity",
        "Long-term (91-day) Alpha Track Deployment",
        "Short-term (48-hour) Digital Data Logging",
        "Post-Mitigation Verification Testing",
        "Building Envelope & Airtightness Analysis",
      ]}
      features={[
        {
          title: "Health Canada Compliance",
          description: "All testing protocols follow the 'Guide for Radon Measurements in Residential Dwellings' as mandated by Health Canada."
        },
        {
          title: "Hourly Data Logging",
          description: "Unlike charcoal canisters, our digital monitors show exactly when levels spike (usually at night), providing better diagnostic data."
        },
        {
          title: "Tamper Detection",
          description: "Essential for real estate transactions, our monitors detect if they have been moved or if windows were opened to skew results."
        },
        {
          title: "Mitigation Strategy",
          description: "If levels are high, we provide a technical roadmap for remediation, including fan sizing and suction point location advice."
        },
      ]}
      benefits={[
        "Leading lung cancer prevention measure",
        "C-NRPP / NRPP Certified Lead Inspectors",
        "Essential for basement apartment legalizing",
        "Required for many high-end real estate deals",
        "Clear, defensible professional reports",
        "24/7 priority monitoring available",
        "Accurate results within 48 hours (Short-term)",
        "Seasonal variation analysis (Long-term)",
      ]}
      faqs={[
        {
          question: "Why should I hire a professional instead of buying a store kit?",
          answer: "Store-bought kits are often one-time use and prone to lab delays. Our professional digital monitors are calibrated annually, provide hourly data, and include a certified professional's interpretation which is required by most lenders and for real estate closings."
        },
        {
          question: "What is the 'Safe' level of Radon?",
          answer: "Technically, there is no 'safe' level of radiation, but Health Canada recommends remediation if your annual average exceeds 200 Bq/m³. Many international bodies, like the WHO, recommend action at 100 Bq/m³."
        },
        {
          question: "How does radon gas get into my home?",
          answer: "Radon is under pressure in the soil. Your home acts like a vacuum, pulling the gas through even the smallest microscopic cracks in the concrete slab or through open sump pits."
        },
        {
          question: "Can radon be fixed?",
          answer: "Yes. Radon mitigation is highly successful. An Active Soil Depressurization (ASD) system can typically reduce levels by over 90% in a single day."
        },
        {
          question: "How much does radon testing cost in Toronto?",
          answer: "Professional radon testing in Ontario starts from $499. Radon requires two site visits — drop-off and retrieval of the monitoring equipment — plus a certified report. Long-term 91-day alpha track testing is also available for comprehensive seasonal analysis."
        },
        {
          question: "How long does radon testing take?",
          answer: "Health Canada recommends long-term testing of at least 3 months using a certified passive alpha-track detector for the most accurate results. We also offer short-term digital monitoring (48–96 hours) using C-NRPP certified instruments — ideal for real estate transactions where you need results quickly. Digital results are available within 24 hours of monitor retrieval."
        },
        {
          question: "What is a 'short-term' vs 'long-term' radon test?",
          answer: "Long-term tests (90+ days using alpha-track devices) are more accurate because radon levels fluctuate daily and seasonally. Short-term digital tests (48–96 hours) are used when time is limited — such as in real estate transactions. Health Canada accepts both methods. For real estate closings, we typically use digital monitors and can provide results within a 5-day conditional period."
        },
        {
          question: "Does radon mitigation really work?",
          answer: "Yes — sub-slab depressurization (SSD) is a proven, reliable technology. A pipe is installed through the basement floor slab and a small fan draws radon from below the foundation and vents it above the roofline before it can enter the home. Most SSD systems reduce radon by 80–99% and cost $1,500–$3,000 installed. We recommend retesting 30 days after installation to confirm effectiveness."
        },
      ]}
      relatedServices={[
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "WETT Inspection", href: "/services/wett" },
        { title: "Asbestos Testing", href: "/services/asbestos-testing" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
      ]}
    />
  );
}
