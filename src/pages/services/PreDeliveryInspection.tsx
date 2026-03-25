import { HardHat, ShieldCheck, ClipboardList, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function PreDeliveryInspection() {
  const pageTitle = "PDI Inspection Ontario | Pre-Delivery Inspection | ASADS";
  const metaDescription = "Independent PDI inspection Ontario. Catch builder deficiencies before your Tarion closing. Certified inspector, same-day report. Toronto, GTA & Ontario. From $349.";

  return (
    <ServicePageTemplate
      title="PDI Inspection (Pre-Delivery Inspection)"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="Independent PDI Inspection — Pre-Delivery Inspection Ontario"
      heroSubtitle="Don't walk through your new home alone. An independent certified inspector finds what the builder's rep won't tell you — before you sign. Tarion-compliant PDI reports across Toronto, GTA & Ontario."
      icon={HardHat}
      price="From $349"
      duration="2–3 Hours"
      description={
        <div className="space-y-6">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl">
            <h4 className="text-amber-900 font-bold flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              What Most New Home Buyers Don't Know
            </h4>
            <p className="text-amber-800 text-sm mt-1">
              The builder's rep who walks you through your PDI works for the builder — not you. Their job is to
              get your signature on the PDI form, not to find deficiencies. An independent PDI inspector
              works exclusively for you and has no incentive to minimize what's found.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-slate-700">
            A <strong>Pre-Delivery Inspection (PDI)</strong> is the walk-through you conduct with your builder
            before taking possession of your new home. Under the <strong>Tarion New Home Warranty</strong>, every
            deficiency you document at the PDI must be repaired by the builder. Items not listed on the PDI form
            are harder to claim later — making this appointment one of the most financially important events
            in your new home purchase.
          </p>

          <p>
            Most buyers attend their PDI alone, unfamiliar with what to look for, rushed by the builder's
            schedule, and unaware of what constitutes a legitimate deficiency under Ontario Building Code and
            Tarion warranty standards. Our certified inspectors attend your PDI as your independent advocate —
            systematically documenting every deficiency before you sign.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">What Does a PDI Inspection Cover?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Structural & Envelope", body: "Foundation pour, brick veneer, windows, doors, weatherstripping, and grading for proper drainage away from the foundation — common sources of early water infiltration." },
                { title: "Interior Finishes", body: "Drywall defects, paint quality, trim alignment, flooring installation, tile grout, and cabinetry — the visible deficiencies builders must correct before you move in." },
                { title: "Mechanical Systems", body: "HVAC installation, furnace and HRV commissioning, plumbing rough-in completion, hot water heater, and electrical panel labelling — all verified for proper installation." },
                { title: "Tarion Warranty Items", body: "We flag which deficiencies fall under Tarion's 30-day, 1-year, and 2-year warranty categories so you understand the repair timeline and escalation process." },
              ].map((card, i) => (
                <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-1">{card.title}</h4>
                  <p className="text-slate-700 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">The Most Commonly Missed PDI Deficiencies</h3>
            <ul className="space-y-3">
              {[
                "Improper lot grading — the #1 cause of new home basement leaks, and something builders routinely leave incomplete at possession",
                "Attic insulation gaps — blown-in insulation piled deep at the hatch but thin over exterior walls where cold bridging occurs",
                "HVAC ductwork crimps, improper HRV commissioning, and missing duct supports — all invisible without opening ceiling tiles",
                "Drywall tape separation at ceiling-wall junctions from first-winter truss uplift — normal, but must be documented at PDI to trigger warranty",
                "Window seal failures and condensation between panes — present at possession but often dismissed by builders if not formally documented",
                "Missing or incorrect fire-rated assemblies in attached garage — code violations that are costly to fix after drywall is finished",
                "Incomplete caulking at tub and shower surrounds — water infiltration begins within weeks of move-in if not corrected",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">How Our PDI Inspection Works</h3>
            <ol className="space-y-4">
              {[
                { step: "1", title: "Book Before Your Builder Appointment", body: "Schedule us for the morning of your PDI — or arrive early. We attend as your independent inspector and work alongside the builder's rep during the walk-through." },
                { step: "2", title: "Systematic 300-Point Inspection", body: "Our inspector works through every room, every system, and every exterior component using a structured checklist calibrated to Ontario Building Code and Tarion warranty standards." },
                { step: "3", title: "On-The-Spot PDI Form Documentation", body: "Every deficiency is photographed and documented in real-time. We prepare a complete deficiency list to be attached to your PDI form before you sign." },
                { step: "4", title: "Same-Day Tarion-Ready Report", body: "You receive a full written report with photographs by end of day — formatted to support Tarion warranty claim submissions at every milestone." },
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

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Tarion Warranty Milestones — Don't Miss These Deadlines</h3>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-800">Tarion Milestone</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-800">What It Covers</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-800">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { milestone: "PDI (Pre-Delivery)", covers: "All visible deficiencies at possession", deadline: "Day of possession" },
                    { milestone: "30-Day Form", covers: "Deficiencies discovered in first month", deadline: "30 days post-possession" },
                    { milestone: "1-Year Form", covers: "Workmanship & materials defects", deadline: "Prior to 1-year anniversary" },
                    { milestone: "2-Year Form", covers: "Water penetration, HVAC, caulking & seals", deadline: "Prior to 2-year anniversary" },
                    { milestone: "7-Year Major Structural", covers: "Load-bearing structure, foundation", deadline: "Prior to 7-year anniversary" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 font-medium text-slate-800">{row.milestone}</td>
                      <td className="px-4 py-3 text-slate-700">{row.covers}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{row.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-3">We offer inspection services at every Tarion milestone. Builders are required to repair documented deficiencies within 120 days of form submission.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">PDI Inspection by City — Ontario New Construction Markets</h3>
            <p className="text-slate-700 mb-6">Ontario's new construction activity is concentrated in specific growth corridors. Here is what our PDI inspectors find across the province's most active new-build markets.</p>
            <div className="space-y-4">
              {[
                {
                  city: "PDI Inspection — Brampton, Vaughan & the 905 Growth Corridor",
                  body: "Brampton and Vaughan are Ontario's two most active new residential construction markets — hundreds of closings every month in master-planned communities from builders including Mattamy, Minto, Fieldgate, and Primont. The volume-production environment of these subdivisions creates significant time pressure on trades, resulting in a predictable pattern of deficiencies: improper lot grading, drywall tape separation, missing bathroom fan ducts, incompletely caulked windows, and HRV systems set at the wrong ventilation rate. PDI inspections in Brampton's Bram West, Claireville, and Credit Valley communities and in Vaughan's Kleinburg, Woodbridge, and Maple areas routinely document 20–50 line-item deficiencies that buyers would never identify on their own. ASADS provides same-day PDI inspection services across all Brampton and Vaughan new construction closings.",
                },
                {
                  city: "PDI Inspection — Milton, Oakville & Halton Hills",
                  body: "Milton is one of Ontario's fastest-growing municipalities with substantial new construction activity from Great Gulf, Mattamy, and Sundial Homes. Halton Region's higher-end new construction market — including Oakville's Preserve and Palermo Village communities — attracts buyers spending $1.2M–$2M+ who assume premium pricing translates to premium construction quality. Our PDI inspections in Milton, Oakville, and Halton Hills regularly find the same deficiencies as volume-market builds: improper attic insulation, missing backwater valves in finished basement pre-plumbing, inadequate slope on exterior hard surfaces, and HVAC balancing issues. In the luxury market, finish deficiencies including tile alignment, millwork gaps, and paint inconsistencies require careful documentation to enforce the builder's finish warranty.",
                },
                {
                  city: "PDI Inspection — Barrie, Innisfil & South Simcoe",
                  body: "Barrie and Innisfil's rapid residential growth has produced large subdivisions from builders including Sundance, Brookfield, and Honeyfield operating under the same volume-production constraints seen in the 905. South Simcoe's cold climate creates unique PDI concerns: HVAC sizing adequacy for extreme winter temperatures, HRV commissioning to prevent moisture accumulation in sealed new construction, and foundation drainage that must handle heavy snowmelt. Radon is a significant concern in Barrie new construction — ASADS recommends combining a PDI inspection with a radon test deployment in all Barrie and Simcoe County new homes given the region's elevated radon geology.",
                },
                {
                  city: "PDI Inspection — Waterloo Region (Kitchener, Cambridge & Waterloo)",
                  body: "Waterloo Region's tech economy has driven significant new residential construction across Kitchener, Cambridge, and Waterloo. New construction in Kitchener's Doon South, Huron Park, and Laurentian Hills communities and in Cambridge's Westwood Village and Glenview areas presents the standard Ontario new-build deficiency pattern. Waterloo Region builders working to meet high demand in a competitive subcontractor market are particularly prone to grading deficiencies — Cambridge's Grand River floodplain context makes proper lot drainage from foundation walls critical. ASADS covers all PDI inspections across Kitchener, Cambridge, and Waterloo with same-day report delivery.",
                },
              ].map((item) => (
                <div key={item.city} className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{item.city}</h4>
                  <p className="text-sm text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      whatWeInspect={[
        "Lot grading & surface drainage",
        "Foundation exterior & waterproofing membrane",
        "Brick veneer & mortar joints",
        "Roof shingles, flashings & soffits",
        "Windows & exterior door seals",
        "HVAC installation & HRV commissioning",
        "Electrical panel & circuit labelling",
        "Plumbing fixtures & water pressure",
        "Drywall finish & paint quality",
        "Tile, hardwood & floor installation",
        "Kitchen & bathroom cabinetry",
        "Garage fire separation & door safety",
        "Attic insulation depth & coverage",
        "All Tarion PDI form items documented",
      ]}
      features={[
        {
          title: "Independent From the Builder",
          description: "We work exclusively for you. Our assessment is unbiased — we have no relationship with the builder and no incentive to minimize deficiencies."
        },
        {
          title: "Tarion-Ready Documentation",
          description: "Every deficiency is photographed, measured, and documented in a format that supports Tarion warranty claim submissions at each milestone."
        },
        {
          title: "Same-Day Report",
          description: "Photo-documented PDF report delivered the same day as your PDI so you can submit your deficiency list to the builder before possession."
        },
        {
          title: "Milestone Inspections Available",
          description: "We offer inspections at the 30-day, 1-year, and 2-year Tarion deadlines — not just at PDI — to maximize your warranty coverage."
        },
      ]}
      benefits={[
        "Independent from builder",
        "Tarion-compliant reports",
        "Same-day PDF delivery",
        "300-point checklist",
        "Thermal imaging available",
        "1-year & 2-year milestone inspections",
        "Deficiency negotiation support",
        "GTA & Ontario-wide coverage",
      ]}
      faqs={[
        {
          question: "Do I need an independent PDI inspector?",
          answer: "You are not required to hire an independent inspector for your PDI, but it is strongly recommended. The builder's representative at your PDI walk-through works for the builder. An independent certified inspector works only for you and has the technical knowledge to identify deficiencies that buyers routinely miss — deficiencies that are much harder to claim after you've signed the PDI form."
        },
        {
          question: "What is Tarion and how does the warranty work?",
          answer: "Tarion is Ontario's new home warranty program, governed by the Ontario New Home Warranties Plan Act. It provides mandatory warranty coverage for new homes including deposit protection, completion of the home, and defect coverage at specific milestones: PDI, 30 days, 1 year, 2 years, and 7 years. Builders must repair documented deficiencies within 120 days of form submission."
        },
        {
          question: "What does a PDI inspection cost in Ontario?",
          answer: "PDI inspection in Ontario from ASADS starts at $349. Pricing depends on home size. Contact us at (647) 801-9311 for a specific quote for your property."
        },
        {
          question: "Can I bring my own inspector to a PDI?",
          answer: "Yes. You have the right to bring an independent inspector to your PDI walk-through. Builders cannot refuse your independent inspector access. We recommend informing your builder's customer care team in advance that you will be bringing a certified inspector."
        },
        {
          question: "What if deficiencies are found after I sign the PDI form?",
          answer: "Deficiencies discovered after your PDI are handled through Tarion's 30-day, 1-year, and 2-year forms depending on when they are found and what they involve. Submitting these forms on time is critical — ASADS offers milestone inspections at each deadline to help you document and claim everything you're entitled to."
        },
        {
          question: "How is a PDI inspection different from a pre-purchase home inspection?",
          answer: "A pre-purchase inspection is conducted on an existing home before buying. A PDI inspection is conducted on a newly built home before your Tarion closing — before you take possession. The focus is on construction quality, completeness, and building code compliance rather than age-related wear and maintenance concerns."
        },
        {
          question: "What are the most common deficiencies found at Ontario PDI inspections?",
          answer: "The most frequently documented PDI deficiencies include: improper lot grading (water drains toward the foundation), attic insulation gaps over exterior walls, drywall tape separation at ceiling-wall junctions, incomplete caulking at tubs and windows, HRV set at incorrect ventilation rates, and missing or incorrect fire separation in attached garages."
        },
      ]}
      relatedServices={[
        { title: "New Construction Inspection", href: "/services/new-construction" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Radon Testing", href: "/services/radon-testing" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
      ]}
    />
  );
}
