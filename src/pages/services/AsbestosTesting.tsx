import { AlertTriangle, Microscope, ShieldCheck, Factory, HardHat, ClipboardList } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function AsbestosTesting() {
  const pageTitle = "Asbestos Testing Toronto | WSIB Certified & O.Reg 278/05 | ASADS";
  const schemaDescription = "Certified asbestos testing in Toronto. Fully compliant with Ontario Regulation 278/05. Safe sampling for vermiculite, popcorn ceilings, and pipe wrap in pre-1990 homes.";

  return (
    <ServicePageTemplate
      title="Asbestos Testing & Analysis"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="WSIB Certified Asbestos Inspection"
      heroSubtitle="Ontario's #1 workplace killer is hidden in pre-1990 buildings. Protect your family and contractors with O.Reg 278/05 compliant sampling and lab analysis."
      icon={AlertTriangle}
      price="From $299"
      duration="1-2 Hours + Lab Time"
      description={
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="text-red-900 font-bold flex items-center gap-2">
              <ShieldCheck className="text-red-600" size={20} />
              Legal Compliance Alert
            </h4>
            <p className="text-red-800 text-sm mt-1">
              Under <strong>Ontario Regulation 278/05</strong>, owners of buildings constructed before 1990 must test for asbestos before any renovation or demolition. Failure to comply can lead to significant WSIB fines and health liability.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-slate-700">
            Asbestos exposure is responsible for roughly <strong>33% of all workplace fatalities in Ontario</strong>. While safe when undisturbed, these microscopic fibers become lethal when friable materials—like popcorn ceilings or pipe wrap—are disturbed during renovations.
          </p>

          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-center">
              <Microscope className="mx-auto text-primary mb-2" size={32} />
              <h4 className="font-bold text-slate-900">Lab Analysis</h4>
              <p className="text-xs text-slate-600">Accredited PLM and TEM analysis to identify chrysotile, amosite, and tremolite fibers.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-center">
              <Factory className="mx-auto text-primary mb-2" size={32} />
              <h4 className="font-bold text-slate-900">Pre-1990 Focus</h4>
              <p className="text-xs text-slate-600">Specialized protocols for Toronto’s century homes and mid-century bungalows.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-center">
              <HardHat className="mx-auto text-primary mb-2" size={32} />
              <h4 className="font-bold text-slate-900">WSIB Approved</h4>
              <p className="text-xs text-slate-600">Fully insured and certified professionals meeting all OHSA safety standards.</p>
            </div>
          </div>

          <p>
            Our inspectors identify "suspect materials" based on building age and use wet-sampling techniques to ensure zero fiber release during collection. Whether you are dealing with <strong>Zonolite vermiculite</strong> or old <strong>vinyl floor tiles</strong>, we provide the documentation required for building permits and insurance.
          </p>
        </div>
      }
      whatWeInspect={[
        "Vermiculite Attic Insulation (Zonolite)",
        "Popcorn & Stipple Ceilings",
        "Basement Pipe Wrap & Duct Tape",
        "Vinyl Floor Tiles (9x9 & 12x12)",
        "Drywall Joint Compound (Mud)",
        "Plaster & Lathe Systems",
        "Exterior Stucco & Siding",
        "Roofing Shingles & Felt",
        "Electrical Wiring Insulation",
        "Furnace & Boiler Gaskets",
        "Transite Board & Pipe",
        "Fireproofing Sprays",
      ]}
      features={[
        {
          title: "O.Reg 278/05 Inventory",
          description: "We provide the mandatory asbestos inventory report required by the City of Toronto for demolition and renovation permits."
        },
        {
          title: "Safe Wet-Sampling",
          description: "We utilize HEPA-filtered equipment and specialized wetting agents to prevent any fiber release during the sampling process."
        },
        {
          title: "Priority Lab Results",
          description: "Standard lab turnaround is 48-72 hours, with 24-hour 'Rush' service available for emergency renovation shutdowns."
        },
        {
          title: "Abatement Strategy",
          description: "If asbestos is present, we provide a detailed risk assessment and removal roadmap to help you get competitive abatement quotes."
        },
      ]}
      benefits={[
        "WSIB Certified Inspectors",
        "NVLAP & AIHA Accredited Labs",
        "Detailed Inventory Reports",
        "OHSA Compliance Support",
        "Mesothelioma Risk Mitigation",
        "Permit Documentation Ready",
        "Unbiased 3rd Party Analysis",
        "Same-Day Emergency Service",
      ]}
      faqs={[
        {
          question: "When is asbestos testing legally required in Ontario?",
          answer: "Under Regulation 278/05, testing is mandatory before any renovation, demolition, or repair of a building constructed before 1990. This applies to both residential and commercial properties."
        },
        {
          question: "How do I identify 'Zonolite' vermiculite?",
          answer: "Zonolite is a brand of vermiculite insulation that often contains toxic tremolite asbestos. It looks like small, shiny pebbles. Because it is highly friable, it must be sampled by a professional using a respirator."
        },
        {
          question: "What is the difference between PLM and TEM testing?",
          answer: "PLM (Polarized Light Microscopy) is the standard for bulk materials. TEM (Transmission Electron Microscopy) is a higher-resolution test used for air samples or complex materials where fibers are too small for standard microscopes."
        },
        {
          question: "Can I take the samples myself?",
          answer: "We strongly advise against it. Disturbing asbestos materials without containment can contaminate your entire home. Certified inspectors use specific wetting and sealing methods to keep your air safe."
        },
      ]}
      relatedServices={[
        { title: "Lead Paint Testing", href: "/services/lead-paint-testing" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Radon Testing", href: "/services/radon-testing" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
      ]}
    />
  );
}
