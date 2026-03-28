import { ClipboardList, ShieldCheck, AlertTriangle, Factory, HardHat, Microscope } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function DesignatedSubstanceSurvey() {
  const pageTitle = "Designated Substance Survey Ontario | O.Reg 278/05 | ASADS";
  const metaDescription = "Certified Designated Substance Survey Ontario. Required before renovation or demolition. All 11 substances under OHSA. From $399. Same-day scheduling.";

  return (
    <ServicePageTemplate
      title="Designated Substance Survey (DSS)"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="Designated Substance Survey — Ontario Pre-Demolition & Pre-Renovation Compliance"
      heroSubtitle="Legally required before any renovation, demolition, or major repair work in Ontario. Our certified DSS reports identify all 11 designated substances under the Occupational Health and Safety Act — accepted by contractors, the Ministry of Labour, and all major insurers."
      icon={ClipboardList}
      price="From $399"
      duration="2–4 Hours + Lab"
      description={
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="text-red-900 font-bold flex items-center gap-2">
              <AlertTriangle className="text-red-600" size={20} />
              Legal Requirement — Ontario OHSA
            </h4>
            <p className="text-red-800 text-sm mt-1">
              Under the <strong>Ontario Occupational Health and Safety Act (OHSA)</strong> and <strong>O.Reg 278/05</strong>, a Designated Substance Survey must be completed and provided to contractors before any demolition, renovation, or significant repair of a building. Failure to provide a DSS can result in a Ministry of Labour <strong>STOP WORK order</strong> and substantial fines for property owners and general contractors.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-slate-700">
            A Designated Substance Survey (DSS) is a comprehensive building assessment that identifies the presence and condition of all regulated hazardous materials under Ontario law. While asbestos is the most well-known designated substance, Ontario's OHSA regulates <strong>11 designated substances</strong> that must be identified before construction workers disturb building materials.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-center">
              <ClipboardList className="mx-auto text-primary mb-2" size={32} />
              <h4 className="font-bold text-slate-900">MOL-Compliant Reports</h4>
              <p className="text-xs text-slate-600">Our DSS reports meet all Ministry of Labour documentation requirements for renovation permits and demolition approvals.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-center">
              <Microscope className="mx-auto text-primary mb-2" size={32} />
              <h4 className="font-bold text-slate-900">Accredited Lab Analysis</h4>
              <p className="text-xs text-slate-600">All samples analyzed by AIHA and NVLAP accredited laboratories with full chain-of-custody documentation.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-center">
              <Factory className="mx-auto text-primary mb-2" size={32} />
              <h4 className="font-bold text-slate-900">Residential & Commercial</h4>
              <p className="text-xs text-slate-600">From single-family renovations to multi-unit demolitions, commercial retrofits, and industrial facility upgrades.</p>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Ontario's 11 Designated Substances</h3>
            <p className="text-slate-700 mb-4">Under the Ontario OHSA, the following substances are designated and must be identified before renovation or demolition work begins:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "Asbestos", detail: "Most common designated substance. Found in insulation, ceiling texture, floor tiles, drywall compound, and transite siding in pre-1990 buildings." },
                { name: "Lead", detail: "Present in paint on pre-1980 surfaces, solder in plumbing, and some ceramic glazes. Extremely hazardous when sanded or abraded during renovation." },
                { name: "Mercury", detail: "Found in older fluorescent light ballasts, thermostats, and switches. Requires specialized handling and disposal." },
                { name: "Silica", detail: "Crystalline silica in concrete, masonry, and stone creates dangerous dust when cut, ground, or demolished." },
                { name: "Isocyanates", detail: "Found in two-part spray foam insulation and some coatings. Hazardous during application and removal." },
                { name: "Arsenic", detail: "Present in some wood preservatives (CCA-treated lumber) used in older decks, playground equipment, and utility poles." },
                { name: "Acrylonitrile", detail: "Used in synthetic rubber and certain plastic products. Rare in residential buildings but present in industrial settings." },
                { name: "Benzene", detail: "Found in some adhesives, solvents, and fuel storage areas. Assessed in industrial and commercial properties." },
                { name: "Coke Oven Emissions", detail: "Relevant to industrial and commercial properties near historic steel-manufacturing or coal processing facilities." },
                { name: "Ethylene Oxide", detail: "Used in sterilization equipment. Found in medical facilities, laboratories, and some industrial buildings." },
                { name: "Vinyl Chloride", detail: "Associated with older PVC manufacturing and certain industrial coatings. Assessed in industrial and commercial contexts." },
              ].map((item) => (
                <div key={item.name} className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <h4 className="font-semibold text-slate-900 mb-1">{item.name}</h4>
                  <p className="text-sm text-slate-700">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">When Is a Designated Substance Survey Required in Ontario?</h3>
            <ul className="space-y-3">
              {[
                "Before any demolition of a building or structure — residential, commercial, or industrial",
                "Before renovation work that will disturb building materials in a pre-1990 building (drywall removal, flooring, insulation, ceiling work)",
                "Before issuing a Request for Tender or contract documents to renovation or demolition contractors",
                "When a building permit is required for interior renovation work in older buildings",
                "Before selling a commercial or industrial property where hazardous materials may be present",
                "Before a change of use or occupancy that involves construction in an older building",
                "When required by a lender, insurer, or municipality as a condition of financing or permitting",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ShieldCheck className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">DSS by Property Type — GTA & Ontario</h3>
            <div className="space-y-4">
              {[
                {
                  type: "Residential Renovation DSS — Pre-1990 Homes",
                  body: "The most common DSS request in the GTA is for single-family homes built before 1990 where owners are undertaking kitchen renovations, basement finishing, bathroom gut renovations, or whole-home updates. Asbestos in drywall joint compound, vermiculite attic insulation, vinyl floor tile adhesive, and popcorn ceilings is the primary concern. Lead paint on trim, doors, and window frames is a secondary finding requiring documentation. Our residential DSS reports are formatted for homeowner use and include a clear summary of what materials require abatement before renovation work can proceed.",
                },
                {
                  type: "Commercial & Office Renovation DSS",
                  body: "Ontario commercial property owners and landlords must provide a DSS to contractors before any tenant fit-out, office renovation, or building systems upgrade in pre-1990 buildings. Commercial buildings present additional designated substance risks beyond residential: mercury-containing fluorescent light ballasts in ceiling plenum spaces, asbestos-containing floor leveling compounds under raised access flooring, and HVAC duct insulation containing asbestos thermal wrap. Our commercial DSS includes a full survey of all accessible building systems and materials, with a substance-by-substance hazard classification and abatement scope of work.",
                },
                {
                  type: "Industrial & Institutional DSS",
                  body: "Industrial facilities, schools, hospitals, and government buildings require comprehensive DSS assessments before renovation or demolition that may address the full range of Ontario's 11 designated substances. Older industrial buildings may contain PCB-contaminated electrical equipment, lead-containing coatings on steel structural members, and silica-containing refractory materials. ASADS industrial DSS work includes coordination with engineers and environmental consultants where substance findings require specialized remediation planning.",
                },
                {
                  type: "Pre-Demolition DSS — Ontario Demolition Permits",
                  body: "Ontario municipalities require a Designated Substance Survey before issuing a demolition permit for any building constructed before 1990. The DSS must be completed, signed by a qualified person, and provided to all demolition contractors before any structural work begins. Our pre-demolition surveys cover the full building envelope, interior finishes, mechanical systems, and site materials including underground storage tank identification for fuel and chemical storage. Reports are formatted to meet municipal permit requirements across Toronto, Mississauga, Brampton, Hamilton, Kitchener-Waterloo, and all Ontario cities.",
                },
              ].map((item) => (
                <div key={item.type} className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{item.type}</h4>
                  <p className="text-sm text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Designated Substance Survey Process</h3>
            <ol className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Pre-Survey Consultation",
                  body: "We review your project scope, building age, available drawings, and previous inspection records to scope the survey efficiently and focus sampling on highest-risk areas.",
                },
                {
                  step: "2",
                  title: "On-Site Inspection & Sampling",
                  body: "Our certified inspector conducts a systematic visual survey of all accessible areas, identifies suspect materials, and collects bulk samples using O.Reg 278/05-compliant wet-sampling protocols with full PPE and HEPA containment.",
                },
                {
                  step: "3",
                  title: "Accredited Lab Analysis",
                  body: "All samples are analyzed by our AIHA and NVLAP accredited laboratory partners using PLM and TEM microscopy. Standard turnaround is 48–72 hours with rush 24-hour service available.",
                },
                {
                  step: "4",
                  title: "DSS Report & Remediation Scope",
                  body: "A complete written Designated Substance Survey report is delivered, identifying each substance found, its location, condition, quantity, and hazard classification. For each positive finding we provide a remediation scope of work suitable for contractor tender and Ministry of Labour compliance.",
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{item.step}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-slate-700 text-sm mt-1">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">DSS Pricing Ontario</h3>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-800">Survey Type</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-800">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Residential Renovation DSS (single family)", price: "From $399" },
                    { type: "Residential Pre-Demolition DSS", price: "From $499" },
                    { type: "Commercial / Multi-Unit DSS", price: "From $699" },
                    { type: "Industrial / Institutional DSS", price: "Quote" },
                    { type: "Rush 24-Hour Turnaround", price: "+$150" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 text-slate-700">{row.type}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-3">Call <a href="tel:+16478019311" className="text-blue-600">(647) 801-9311</a> for a quote. Rush service available for urgent pre-permit deadlines.</p>
          </div>
        </div>
      }
      whatWeInspect={[
        "Asbestos-Containing Materials (ACM)",
        "Lead Paint & Lead-Containing Coatings",
        "Mercury in Fixtures & Ballasts",
        "Crystalline Silica in Masonry & Concrete",
        "Vermiculite Attic Insulation (Zonolite)",
        "PCB-Containing Electrical Equipment",
        "Arsenic in Wood Preservatives (CCA)",
        "Isocyanates in Spray Foam",
        "Pipe Insulation & Duct Lagging",
        "Floor Tile Adhesive & Leveling Compound",
        "Popcorn & Stipple Ceiling Texture",
        "Drywall Joint Compound (Pre-1980)",
      ]}
      features={[
        {
          title: "MOL-Ready Documentation",
          description: "Reports formatted to meet Ministry of Labour requirements for demolition permits and contractor disclosure obligations across all Ontario municipalities."
        },
        {
          title: "All 11 Substances Covered",
          description: "Unlike asbestos-only surveys, our DSS assesses the complete list of Ontario designated substances required under OHSA."
        },
        {
          title: "48-Hour Standard Turnaround",
          description: "Standard lab results in 48–72 hours with 24-hour rush service for pre-permit deadlines and urgent renovation starts."
        },
        {
          title: "Remediation Scope Included",
          description: "Every positive finding includes a written scope of work for abatement contractors to quote — no separate consultant needed."
        },
      ]}
      benefits={[
        "OHSA & O.Reg 278/05 Compliant",
        "All 11 Designated Substances",
        "AIHA Accredited Lab Partners",
        "MOL Stop-Work Prevention",
        "Residential & Commercial",
        "24-Hour Rush Available",
        "Demolition Permit Ready",
        "Remediation Scope Included",
      ]}
      faqs={[
        {
          question: "What is a Designated Substance Survey in Ontario?",
          answer: "A Designated Substance Survey (DSS) is a legally required assessment that identifies the presence of regulated hazardous materials in a building before renovation, demolition, or major repair work. Under Ontario's Occupational Health and Safety Act, property owners must provide a DSS to contractors before any work that could disturb building materials — or risk a Ministry of Labour STOP WORK order."
        },
        {
          question: "What are Ontario's 11 designated substances?",
          answer: "Ontario's Occupational Health and Safety Act designates 11 substances: asbestos, lead, mercury, silica, isocyanates, arsenic, acrylonitrile, benzene, coke oven emissions, ethylene oxide, and vinyl chloride. Asbestos and lead are the most commonly found in residential and commercial buildings built before 1990."
        },
        {
          question: "Is a DSS the same as an asbestos survey?",
          answer: "No — an asbestos survey only tests for asbestos. A Designated Substance Survey covers all 11 regulated substances under OHSA. For Ministry of Labour compliance and demolition permit applications, a full DSS is required, not just an asbestos survey."
        },
        {
          question: "Do I need a DSS for a home renovation?",
          answer: "If your home was built before 1990 and you are planning any renovation that will disturb building materials — removing drywall, replacing flooring, upgrading insulation, or gut renovation — you should have a DSS completed before hiring contractors. This protects workers under OHSA and protects you from liability if hazardous materials are disturbed without proper documentation."
        },
        {
          question: "How long does a Designated Substance Survey take?",
          answer: "On-site inspection typically takes 2–4 hours depending on property size. Lab analysis adds 48–72 hours for standard turnaround or 24 hours for rush service. Most clients receive their complete DSS report within 3–5 business days of the inspection."
        },
        {
          question: "What happens if designated substances are found?",
          answer: "If designated substances are found, the DSS report will classify each finding by type, location, condition, and hazard level. We provide a remediation scope of work that licensed abatement contractors use to quote removal costs. Depending on the substance and quantity, Type 1, Type 2, or Type 3 abatement procedures under O.Reg 278/05 will apply."
        },
        {
          question: "How much does a Designated Substance Survey cost in Ontario?",
          answer: "Residential renovation DSS surveys start from $399. Pre-demolition surveys for single-family homes start from $499. Commercial and multi-unit DSS surveys start from $699. Rush 24-hour service is available for an additional $150. Call (647) 801-9311 for a quote based on your property size and project scope."
        },
      ]}
      relatedServices={[
        { title: "Asbestos Testing", href: "/services/asbestos-testing" },
        { title: "Lead Paint Testing", href: "/services/lead-paint-testing" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Commercial Inspection", href: "/services/commercial" },
      ]}
    />
  );
}
