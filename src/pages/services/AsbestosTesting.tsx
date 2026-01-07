import { AlertTriangle, Microscope, ShieldCheck, Factory, HardHat, ClipboardList } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function AsbestosTesting() {
  const pageTitle = "Asbestos Testing Toronto | WSIB Certified & O.Reg 278/05 | ASADS";
  const schemaDescription = "Certified asbestos testing in Toronto & GTA. Fully compliant with Ontario Regulation 278/05. Safe sampling and lab analysis for pre-1990 homes, popcorn ceilings, insulation, and pipe wrap. Book same-day asbestos inspection now.";

  return (
    <ServicePageTemplate
      title="Asbestos Testing & Analysis"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="WSIB Certified Asbestos Inspection"
      heroSubtitle="Protect your family and contractors. Safe, O.Reg 278/05 compliant sampling for pre-1990 homes, renovations, and commercial sites. Book your certified asbestos inspector in Toronto or GTA today."
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
              Under <strong>Ontario Regulation 278/05</strong>, testing for asbestos is mandatory before any renovation, demolition, or repair of buildings constructed before 1990. Failure to comply can lead to WSIB fines and health liability.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-slate-700">
            Asbestos exposure is responsible for significant health risks, including mesothelioma. Friable materials such as <strong>popcorn ceilings</strong>, <strong>vinyl floor tiles</strong>, or <strong>pipe insulation</strong> release fibers when disturbed. Our certified inspectors safely sample and document asbestos for pre-purchase inspections, renovations, and compliance audits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-center">
              <Microscope className="mx-auto text-primary mb-2" size={32} />
              <h4 className="font-bold text-slate-900">Accredited Lab Analysis</h4>
              <p className="text-xs text-slate-600">PLM and TEM testing to identify chrysotile, amosite, tremolite, and other fibers for accurate risk assessment.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-center">
              <Factory className="mx-auto text-primary mb-2" size={32} />
              <h4 className="font-bold text-slate-900">Pre-1990 & Renovation Focus</h4>
              <p className="text-xs text-slate-600">Specialized protocols for Toronto’s century homes, mid-century bungalows, and renovation sites across GTA cities like Mississauga, Brampton, and Etobicoke.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-center">
              <HardHat className="mx-auto text-primary mb-2" size={32} />
              <h4 className="font-bold text-slate-900">WSIB & O.Reg 278/05 Compliant</h4>
              <p className="text-xs text-slate-600">Fully insured and certified inspectors using safe wet-sampling and HEPA equipment to prevent fiber release.</p>
            </div>
          </div>

          <p>
            Our inspectors identify suspect materials and perform <strong>wet-sampling</strong> techniques to ensure zero fiber release. From <strong>Zonolite vermiculite</strong> in attics to <strongvinyl floor tiles</strong>, we provide comprehensive documentation for pre-purchase buyers, renovations, or commercial compliance. Same-day reporting is available for urgent inspections across Toronto, Mississauga, Brampton, Markham, Oshawa, and North York.
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
          description: "Mandatory asbestos inventory reports required for demolition, renovation permits, and pre-purchase documentation."
        },
        {
          title: "Safe Wet-Sampling",
          description: "HEPA-filtered equipment and specialized wetting agents prevent any fiber release during collection."
        },
        {
          title: "Priority Lab Results",
          description: "48-72 hour standard turnaround, with 24-hour 'Rush' services for emergency pre-renovation or pre-closing inspections."
        },
        {
          title: "Abatement & Risk Assessment",
          description: "If asbestos is detected, we provide a detailed removal roadmap and competitive abatement guidance."
        },
      ]}
      benefits={[
        "WSIB Certified Inspectors",
        "NVLAP & AIHA Accredited Labs",
        "Detailed Asbestos Inventory Reports",
        "OHSA Compliance Support",
        "Mesothelioma Risk Mitigation",
        "Permit Documentation Ready",
        "Unbiased 3rd Party Analysis",
        "Same-Day Emergency Service Across GTA",
      ]}
      faqs={[
        {
          question: "When is asbestos testing legally required in Ontario?",
          answer: "Testing is mandatory under O.Reg 278/05 before any renovation, demolition, or repair of pre-1990 buildings. Applies to residential and commercial properties."
        },
        {
          question: "How do I identify 'Zonolite' vermiculite?",
          answer: "Zonolite is a type of attic insulation often containing asbestos fibers. It is highly friable and must be sampled by certified inspectors using safe wet techniques."
        },
        {
          question: "What is the difference between PLM and TEM testing?",
          answer: "PLM (Polarized Light Microscopy) tests bulk materials. TEM (Transmission Electron Microscopy) provides higher-resolution results for air samples or fine materials."
        },
        {
          question: "Can I sample asbestos myself?",
          answer: "No. Disturbing asbestos without containment can contaminate your home. Certified inspectors use wet-sampling and HEPA protocols to keep the environment safe."
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
