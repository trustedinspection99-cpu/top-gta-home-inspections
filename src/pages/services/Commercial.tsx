import { Factory, ShieldCheck, BarChart3, HardHat, Zap, Droplets, Building2, SearchCheck } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Helmet } from "react-helmet-async";

export default function Commercial() {
  const pageTitle = "Commercial Building Inspection Toronto | PCA & Phase 1 ESA Specialists";
  const schemaDescription = "Expert Property Condition Assessments (PCA) in Toronto & GTA. ASTM E2018-15 compliant reports, 20-year CapEx forecasting, and MEP audits for commercial real estate.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={schemaDescription} />
      </Helmet>

      <ServicePageTemplate
        title="Commercial Property Condition Assessment (PCA)"
        metaTitle={pageTitle}
        metaDescription={schemaDescription}
        heroTitle="Institutional-Grade Commercial Due Diligence"
        heroSubtitle="Mitigate acquisition risk with ASTM E2018-15 compliant audits. We provide comprehensive Property Condition Reports (PCR) designed for GTA investors, REITs, and lenders."
        icon={Factory}
        price="Quote Based on Asset Class"
        duration="Expedited Reporting Available"
        description={
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-700">
              Commercial transactions in the Greater Toronto Area demand a sophisticated technical approach. Our **Property Condition Assessments (PCA)** go beyond simple visual checks, providing a forensic-level evaluation of an asset's physical condition and the financial implications of its deferred maintenance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="flex flex-col items-center text-center p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm transition-hover hover:shadow-md">
                <BarChart3 className="text-blue-600 mb-2" size={32} />
                <h4 className="font-bold text-slate-900">CapEx Forecasting</h4>
                <p className="text-xs text-slate-600">Detailed 5 to 20-year reserve schedules for major mechanical and structural systems to assist in IRR modeling.</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm transition-hover hover:shadow-md">
                <ShieldCheck className="text-green-600 mb-2" size={32} />
                <h4 className="font-bold text-slate-900">Lender Compliant</h4>
                <p className="text-xs text-slate-600">Our reports meet the strict environmental and physical due diligence protocols of Schedule I banks and private equity firms.</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm transition-hover hover:shadow-md">
                <HardHat className="text-amber-600 mb-2" size={32} />
                <h4 className="font-bold text-slate-900">MEP Specialists</h4>
                <p className="text-xs text-slate-600">Specialized deep-dive audits into Mechanical, Electrical, and Plumbing systems for industrial and high-density assets.</p>
              </div>
            </div>

            <p>
              From sprawling industrial facilities in Mississauga to multi-unit residential portfolios in Downtown Toronto, we provide the actionable data required to protect your capital and negotiate from a position of absolute technical clarity.
            </p>
          </div>
        }
        whatWeInspect={[
          "Structural Framing, Foundations & Slab Integrity",
          "Building Envelope, Curtain Walls & Glazing Performance",
          "Flat & Low-Slope Roofing Systems (Non-Destructive Testing)",
          "Central HVAC Plants (Chillers, Boilers, Cooling Towers)",
          "Electrical Switchgear & Distribution (Thermal Imaging Included)",
          "Life Safety Systems, Fire Suppression & Sprinkler Mains",
          "AODA / ADA Accessibility & Barrier-Free Compliance",
          "Pavement, Parking Structures & Site Stormwater Management",
          "Industrial Loading Docks, Dock Levelers & Overhead Doors",
          "Plumbing Systems (Commercial Backflow & Domestic Supply)",
          "Vertical Transportation (Logbook & Elevator Service Review)",
          "Phase 1 Environmental Site Assessment (MECP Compliance)",
        ]}
        features={[
          {
            title: "ASTM E2018-15 Compliance",
            description: "We follow the North American gold standard for PCAs, ensuring your due diligence is defensible, systematic, and professionally recognized."
          },
          {
            title: "Infrared Thermography",
            description: "Standard on all commercial electrical audits to identify high-resistance connections and potential fire hazards in main distribution panels."
          },
          {
            title: "Asset Life Cycle Analysis",
            description: "We calculate the Remaining Useful Life (RUL) of big-ticket items, allowing for accurate long-term capital expenditure (CapEx) planning."
          },
          {
            title: "Risk Mitigation focus",
            description: "We identify 'Immediate Needs' versus 'Short-Term Needs,' providing cost estimates for repairs required within the first 12 months of ownership."
          },
        ]}
        benefits={[
          "Identifies undisclosed deferred maintenance liabilities",
          "Professional 20-year Capital Reserve forecasting",
          "InterNACHI & Certified Master Inspector (CMI®) lead auditors",
          "Expedited 'Executive Summary' for rapid-fire negotiations",
          "Specific expertise in Industrial, Retail, Office, and Multi-Family",
          "Comprehensive digital reports with high-resolution evidence",
          "Integrated environmental (Phase 1 ESA) & physical auditing",
          "Serving Toronto, Mississauga, Vaughan, and the entire GTA",
        ]}
        faqs={[
          {
            question: "What is the difference between a PCA and a standard inspection?",
            answer: "A PCA is an institutional-grade audit following ASTM standards. It includes financial forecasting (CapEx) and is designed for lenders and commercial investors rather than residential buyers."
          },
          {
            question: "How long until I receive the final Property Condition Report (PCR)?",
            answer: "We provide an oral briefing immediately after the site visit. The comprehensive digital report is typically delivered within 3-5 business days, though expedited 48-hour delivery is available."
          },
          {
            question: "Do you handle Phase 1 Environmental Site Assessments (ESA)?",
            answer: "Yes. We offer combined PCA and Phase 1 ESA packages that satisfy O. Reg. 153/04 and CSA Z768-01 requirements for commercial financing."
          },
          {
            question: "Can you provide cost estimates for required repairs?",
            answer: "Absolutely. Our reports include an 'Opinion of Probable Cost' for both immediate and short-term repairs to help you adjust your valuation or negotiate credits."
          },
        ]}
        relatedServices={[
          { title: "Infrared Thermal Imaging", href: "/services/thermal-imaging" },
          { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
          { title: "Phase 1 ESA", href: "/services/environmental-assessment" },
          { title: "Mold & Air Quality", href: "/services/mold-testing" },
        ]}
      />
    </>
  );
}
