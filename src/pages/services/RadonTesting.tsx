import { Radio, ShieldAlert, Activity, ClipboardCheck, LayoutList, GraduationCap } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Helmet } from "react-helmet-async";

export default function RadonTesting() {
  const pageTitle = "Radon Testing Toronto | C-NRPP Certified Gas Detection | ASADS";
  const schemaDescription = "Professional C-NRPP certified radon testing in Toronto & GTA. Health Canada compliant long-term and digital monitoring to prevent radon-induced lung cancer.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={schemaDescription} />
      </Helmet>

      <ServicePageTemplate
        title="Radon Gas Testing & Mitigation Consulting"
        metaTitle={pageTitle}
        metaDescription={schemaDescription}
        heroTitle="Protect Your Home From Radioactive Radon Gas"
        heroSubtitle="Radon is the #1 cause of lung cancer in non-smokers. Our C-NRPP certified inspectors use professional-grade digital monitors to provide Health Canada compliant safety audits."
        icon={Radio}
        price="From $199"
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
            question: "How does the gas get into my home?",
            answer: "Radon is under pressure in the soil. Your home acts like a vacuum, pulling the gas through even the smallest microscopic cracks in the concrete slab or through open sump pits."
          },
          {
            question: "Can Radon be fixed?",
            answer: "Yes. Radon mitigation is highly successful. An Active Soil Depressurization (ASD) system can typically reduce levels by over 90% in a single day."
          },
        ]}
        relatedServices={[
          { title: "Mold & Air Quality", href: "/services/mold-testing" },
          { title: "Sewer Scope", href: "/services/sewer-scope" },
          { title: "Asbestos Testing", href: "/services/asbestos-testing" },
          { title: "Infrared Thermal Imaging", href: "/services/thermal-imaging" },
        ]}
      />
    </>
  );
}
