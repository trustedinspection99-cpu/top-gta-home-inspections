import { Droplets, TestTube, Beaker, ShieldCheck, Microscope, AlertTriangle } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function WellWaterTesting() {
  const pageTitle = "Well Water Testing Toronto | Certified Lab Analysis | ASADS";
  const metaDescription = "Certified well water testing in Toronto and GTA. MOH accredited laboratory analysis for E.coli, nitrates, and chemicals. Same-day lab courier service.";

  return (
    <ServicePageTemplate
      title="Well Water Testing"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="MOH Accredited Well Water Analysis"
      heroSubtitle="Protect your family from hidden contaminants. We provide clinical-grade sampling and accredited laboratory testing for rural properties across the GTA."
      icon={Droplets}
      price="From $149"
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
          question: "How often should I test my well in Ontario?",
          answer: "Public Health Ontario recommends testing for bacteria (E.coli/Coliform) every 6 months and a full chemical/mineral analysis every 2 years."
        },
        {
          question: "Can I just use the free provincial test?",
          answer: "The free public health test only covers basic bacteria. It does not test for Nitrates, Lead, Arsenic, or chemicals—parameters required by most mortgage lenders and essential for health safety."
        },
        {
          question: "What if my water fails the test?",
          answer: "We provide a clear remediation roadmap. This may include 'shocking' the well with chlorine, installing a UV light system, or repairing a damaged well cap or casing."
        },
        {
          question: "What is the MAC for Nitrates in Ontario?",
          answer: "The Maximum Acceptable Concentration (MAC) for Nitrate-Nitrogen is 10 mg/L. Levels above this pose a risk of 'Blue Baby Syndrome' (methemoglobinemia) in infants."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
        { title: "Septic System Inspection", href: "/services/septic-inspection" },
        { title: "Mold Testing", href: "/services/mold-testing-toronto" },
      ]}
    />
  );
}
