import { AlertTriangle, Microscope, ShieldCheck, Factory, HardHat, ClipboardList } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function AsbestosTesting() {
  const pageTitle = "Asbestos Testing Toronto & Ontario | From $299 | ASADS";
  const schemaDescription = "Certified asbestos testing in Toronto & Ontario from $299. O.Reg 278/05 compliant, bulk sampling & accredited lab. Pre-renovation & demolition. Call (647) 801-9311.";

  return (
    <ServicePageTemplate
      title="Asbestos Inspection & Testing"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="Certified Asbestos Inspection, Testing & Survey — Ontario"
      heroSubtitle="Protect your family and contractors with O.Reg 278/05 compliant asbestos inspection, bulk sampling, and accredited lab analysis. Serving pre-1990 homes, renovations, and commercial sites across Toronto and Ontario."
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
            Our inspectors identify suspect materials and perform <strong>wet-sampling</strong> techniques to ensure zero fiber release. From <strong>Zonolite vermiculite</strong> in attics to <strong>vinyl floor tiles</strong>, we provide comprehensive documentation for pre-purchase buyers, renovations, or commercial compliance. Same-day reporting is available for urgent inspections across Toronto, Mississauga, Brampton, Markham, Oshawa, and North York.
          </p>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">When Is Asbestos Testing Required in Ontario?</h3>
            <ul className="space-y-2">
              {[
                "Before any renovation or demolition in a building built before 1990 (O.Reg 278/05 requires it)",
                "When buying a pre-1990 home as part of due diligence",
                "If popcorn ceilings, floor tiles, or pipe insulation are deteriorating",
                "Before insurance renewals on older buildings",
                "Pre-demolition environmental assessment",
                "When workers will disturb suspect materials (legally required to protect workers under WSIB)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ShieldCheck className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Common Asbestos-Containing Materials in GTA Homes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Popcorn / Acoustic Ceiling Texture",
                  body: "Used extensively 1950s–1990s. Friable when disturbed. Common in Toronto apartment buildings and bungalows.",
                },
                {
                  title: "Vermiculite Insulation (Zonolite)",
                  body: "Attic insulation common 1940s–1990s. Most sourced from Libby, Montana mine which was contaminated with amphibole asbestos.",
                },
                {
                  title: "Vinyl Floor Tiles",
                  body: "9\"×9\" and 12\"×12\" floor tiles and their backing adhesives often contain chrysotile asbestos.",
                },
                {
                  title: "Pipe Insulation (Pipe Wrap)",
                  body: "White or grey fibrous wrap on old heating pipes and duct tape on HVAC systems.",
                },
                {
                  title: "Drywall Joint Compound",
                  body: "Pre-1980s joint compound (mud) contained asbestos fibres. Sanding creates hazardous dust.",
                },
                {
                  title: "Exterior Siding (Transite)",
                  body: "Flat or corrugated fibre-cement panels containing asbestos used on garages, sheds, and house exteriors.",
                },
              ].map((card) => (
                <div key={card.title} className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{card.title}</h4>
                  <p className="text-sm text-slate-700">{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Asbestos Inspection by City</h3>
            <p className="text-slate-700 mb-4">
              Asbestos risk varies significantly by era of construction and neighbourhood. Here is what our inspectors commonly find in the GTA's major cities.
            </p>
            <div className="space-y-4">
              {[
                {
                  city: "Asbestos Inspection — Brampton",
                  body: "Brampton experienced explosive residential growth from the 1960s through the 1990s. The older areas of downtown Brampton, Bramalea, and early Springdale developments are full of homes with popcorn ceilings, vinyl floor tiles, and pipe insulation from the asbestos era. Pre-1985 bungalows in Brampton commonly have Zonolite vermiculite in attics. O.Reg 278/05 requires testing before any renovation — and Brampton's active renovation and resale market means demand for certified inspections is high.",
                },
                {
                  city: "Asbestos Inspection — Markham",
                  body: "Markham's heritage areas — Unionville, Old Markham Village, and Thornhill — include pre-1980 homes where asbestos-containing materials are common. The older bungalow stock east of Warden Avenue and in the Cornell and Milliken Park areas often contains stipple ceiling texture, vinyl floor tile adhesive, and pipe lagging. Buyers of pre-1985 Markham homes should always include asbestos sampling as part of their due diligence.",
                },
                {
                  city: "Asbestos Inspection — Mississauga",
                  body: "Mississauga's Port Credit, Lakeview, Cooksville, and Malton neighbourhoods have significant stocks of pre-1985 housing. Asbestos was used extensively in floor tiles, acoustic ceiling coatings, and HVAC duct insulation in this era. The city's rapid 1970s development boom means a large proportion of detached and semi-detached homes in these areas require pre-renovation testing.",
                },
                {
                  city: "Asbestos Inspection — Toronto",
                  body: "Toronto's older boroughs — Etobicoke, North York, Scarborough, and East York — contain some of the GTA's highest concentrations of asbestos-era construction. Post-war bungalows from the 1950s and 1960s, apartment towers from the 1970s, and commercial properties throughout the core frequently test positive for asbestos in ceiling textures, floor underlayment, and insulation systems. Our Toronto inspectors are specialists in navigating pre-demolition asbestos surveys for both residential and light commercial properties.",
                },
              ].map((item) => (
                <div key={item.city} className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{item.city}</h4>
                  <p className="text-sm text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Asbestos Testing Process</h3>
            <ol className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Visual Assessment",
                  body: "Our WSIB-certified inspector identifies suspect materials and documents their location, condition (friable vs non-friable), and extent.",
                },
                {
                  step: "2",
                  title: "Safe Sample Collection",
                  body: "Using O.Reg 278/05 protocols, we collect small samples using proper PPE. The area is HEPA-vacuumed and sealed after sampling.",
                },
                {
                  step: "3",
                  title: "Accredited Lab Analysis",
                  body: "Samples are analyzed by PLM (Polarized Light Microscopy) or TEM (Transmission Electron Microscopy) at an accredited laboratory. Results in 24–72 hours.",
                },
                {
                  step: "4",
                  title: "Written Report",
                  body: "Lab results, material locations, condition assessment, and remediation recommendations compliant with O.Reg 278/05.",
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-600 text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-700">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
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
        {
          question: "How dangerous is asbestos in good condition?",
          answer: "Non-friable asbestos (intact, not crumbling) poses minimal risk if left undisturbed. The hazard arises when fibres become airborne — during sanding, demolition, or deterioration. Our report identifies both the presence and condition of asbestos-containing materials, so you know exactly what requires action and what can be safely left in place."
        },
        {
          question: "What is the difference between friable and non-friable asbestos?",
          answer: "Friable asbestos can be crumbled, pulverized, or reduced to powder by hand pressure — and therefore releases fibres easily. Popcorn ceilings and pipe insulation are often friable. Non-friable materials like asbestos floor tiles or transite siding are bound in a matrix and don't release fibres unless cut, drilled, or abraded. Ontario Regulation 278/05 has different handling requirements for each category."
        },
        {
          question: "Can I do asbestos abatement myself?",
          answer: "In Ontario, Type 1 asbestos work (minor, low-risk operations like removing undamaged floor tiles) can be done by trained workers without a licensed contractor. However, Type 2 and Type 3 work — which includes disturbing friable asbestos like pipe insulation or spray-applied ceiling texture — must be done by a licensed asbestos abatement contractor following O.Reg 278/05 procedures including air monitoring and disposal."
        },
        {
          question: "How do I use an asbestos report in a real estate transaction?",
          answer: "If testing confirms asbestos-containing materials, you can request the seller perform abatement before closing, provide a price reduction to cover remediation costs, or use the report to walk away if the scope is beyond acceptable limits. We're available to explain findings to realtors and lawyers and can provide cost estimates for remediation tender."
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
