import { Pipette, ShieldAlert, FileSearch, HardHat, AlertTriangle, Thermometer } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function LeadPaintTesting() {
  const pageTitle = "Lead Paint Testing Toronto | XRF Certified Inspection | ASADS";
  const metaDescription = "Professional lead paint testing in Toronto & GTA. XRF certified inspection for homes built before 1990. Ontario Regulation 278/05 compliant reports. From $349.";

  return (
    <ServicePageTemplate
      title="Lead Paint Testing"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="Certified Lead Paint Testing Toronto & GTA"
      heroSubtitle="XRF Certified Inspection · Lead Dust Wipe Testing · Ontario Regulation 278/05 Compliant. Protecting GTA families from lead-based hazards."
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
      ]}
      relatedServices={[
        { title: "Asbestos Testing", href: "/services/asbestos-testing-toronto.html" },
        { title: "Mold Testing", href: "/services/mold-testing-toronto.html" },
        { title: "Air Quality Testing", href: "/services/air-quality-testing.html" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase-inspection.html" },
      ]}
    />
  );
}
