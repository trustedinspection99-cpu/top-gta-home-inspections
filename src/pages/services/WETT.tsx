import { Flame, ShieldCheck, Thermometer, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function WETT() {
  const pageTitle = "WETT Inspection Ontario | Insurance Certificate | ASADS";
  const metaDescription = "Certified WETT & chimney inspection Ontario. Insurance-approved certificates for wood stoves & fireplaces. Thermal imaging included. Same-day report.";

  return (
    <ServicePageTemplate
      title="WETT Inspection"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="Certified WETT Inspection & Chimney Inspection — Ontario"
      heroSubtitle="Insurance-Approved Safety Certification for Wood-Burning Appliances. Our WETT and chimney inspection includes thermal imaging and same-day digital reports accepted by all major Ontario insurers."
      icon={Flame}
      price="From $249"
      duration="1-2 Hours"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            A WETT (Wood Energy Technology Transfer) inspection is more than a safety check—it is a 
            mandatory requirement for most Ontario home insurance policies. Whether you have a 
            wood stove, pellet stove, or traditional masonry fireplace, insurers require 
            professional certification to verify that your installation meets <strong>CSA B365 
            standards</strong>.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-xl">
            <h4 className="text-blue-900 font-bold flex items-center gap-2">
              <Thermometer className="text-blue-600" size={20} />
              Enhanced Thermal Imaging Analysis
            </h4>
            <p className="text-blue-800 text-sm mt-1">
              Standard WETT inspections are visual only. ASADS includes <strong>Infrared Thermal 
              Imaging</strong> to detect hidden heat signatures and compromised flue liners that 
              the naked eye cannot see, providing a superior level of fire safety.
            </p>
          </div>

          <p>
            Our certified inspectors perform a comprehensive 50-point assessment. We verify
            critical safety clearances to combustible walls, floor protection (hearth)
            dimensions, and chimney structural integrity. Our reports are accepted by all
            major Canadian insurance providers, including Intact, TD, and Aviva.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">When Is a WETT Inspection Required in Ontario?</h3>
            <ul className="space-y-3">
              {[
                "When buying a home with a wood-burning fireplace, insert, or freestanding stove — before conditions are waived",
                "When renewing home insurance — most Ontario insurers require a valid WETT certificate to maintain coverage on homes with solid-fuel appliances",
                "When selling a home with a wood-burning appliance — proactive certification prevents last-minute closing delays",
                "After any chimney repairs, relining, or structural modifications that may have affected the installation",
                "After a chimney fire — even a minor chimney fire can cause hidden liner damage that makes the appliance unsafe to use",
                "When a wood stove or fireplace insert is newly installed or replaced with a different model or fuel type",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="text-blue-600 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Common WETT Inspection Failures in Ontario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Inadequate Clearance to Combustibles", body: "Stovepipe, firebox, or chimney connector installed too close to wood framing, drywall, or structural members — the most frequently cited deficiency in Ontario WETT inspections." },
                { title: "Missing or Damaged Chimney Cap", body: "An absent or deteriorated chimney cap allows rain, ice, and small animals to enter the flue, causing liner damage, moisture intrusion, and blockages." },
                { title: "Deteriorated Flue Liner", body: "Cracked or spalled clay tile liners allow combustion gases and creosote to penetrate the chimney masonry — a leading cause of chimney fires and carbon monoxide intrusion." },
                { title: "Improper Hearth Extension", body: "Hearth pad that is too small in area or constructed of the wrong material for the appliance's radiant heat output — a common code violation in older installations." },
                { title: "Connector Pipe Issues", body: "Single-wall connector pipe installed where double-wall is required due to proximity to combustibles — or deteriorated joints and improper pitch causing draft problems." },
                { title: "Creosote Buildup", body: "Heavy Level 2 or Level 3 creosote deposits in the flue represent an active fire hazard. A professional chimney sweep is mandatory before the appliance can be returned to service." },
              ].map((card, i) => (
                <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-1">{card.title}</h4>
                  <p className="text-slate-700 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">The WETT Inspection Process — What to Expect</h3>
            <ol className="space-y-4">
              {[
                { step: "1", title: "Visual Interior Inspection", body: "Firebox refractory panels, damper operation, ash pit, smoke shelf, and all accessible flue surfaces are inspected for cracks, spalling, and deterioration." },
                { step: "2", title: "Exterior Chimney Assessment", body: "Chimney cap, crown condition, step and counter flashing, chimney termination height above roof, and the structural integrity of the masonry chase are evaluated from the exterior." },
                { step: "3", title: "Thermal Imaging Scan", body: "Our FLIR camera scans the chimney chase, surrounding walls, and ceiling areas for heat signatures indicating compromised liner integrity, carbon tracking, or hidden heat transfer through combustible framing." },
                { step: "4", title: "WETT Certificate and Report", body: "A written report documenting all findings is provided, with a clear pass/fail determination, itemized deficiency list with corrective actions, and an insurance-ready WETT certificate for all appliances that meet CSA B365 requirements." },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-sm">{item.step}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-slate-700 text-sm mt-1">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">WETT Inspection Cost Ontario</h3>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-800">Service</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-800">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { service: "WETT Inspection — Level 1 (Maintenance)", price: "$249" },
                    { service: "WETT Inspection — Level 2 (Real Estate)", price: "$299+" },
                    { service: "Thermal Imaging", price: "Included" },
                    { service: "Same-Day Insurance Certificate", price: "Included" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3 text-slate-700">{row.service}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-3">Call <a href="tel:+16478019311" className="text-blue-600">(647) 801-9311</a> for a quote. Level 2 inspections required for all real estate transactions.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">WETT Inspection by City — Ontario</h3>
            <p className="text-slate-700 mb-6">Wood-burning appliance risk varies significantly by housing era and region. Older masonry chimneys, uncertified wood stoves, and clay tile flue liners are the most common WETT inspection findings across Ontario. Here is what our inspectors find in major markets.</p>
            <div className="space-y-4">
              {[
                {
                  city: "WETT Inspection — Toronto & Etobicoke",
                  body: "Toronto's older housing stock — particularly the pre-1960 brick detached homes of Etobicoke, the Annex, Leaside, and Rosedale — commonly contains original masonry fireplace-and-chimney systems that have never received a professional WETT assessment. These heritage masonry fireplace systems typically have clay tile flue liners that are now 60–100 years old, frequently exhibiting spalled tiles, deteriorated mortar joints, and missing chimney caps. Toronto home insurance brokers now routinely require a current WETT Level 2 certificate before issuing or renewing coverage on homes with wood-burning appliances — a change that has caught many Toronto homeowners off-guard at renewal time. ASADS provides same-day WETT Level 1 and Level 2 inspections across all Toronto neighbourhoods, with thermal imaging included at no extra charge.",
                },
                {
                  city: "WETT Inspection — Barrie, Collingwood & Cottage Country",
                  body: "Barrie, Collingwood, and Simcoe County's cottage country represent the highest concentration of wood-burning appliance installations in Ontario — freestanding wood stoves, fireplace inserts, pellet stoves, and outdoor wood boilers are common features in both primary and seasonal residences. Many cottage properties throughout Simcoe County, Muskoka, and the Georgian Bay shoreline were constructed or extensively modified by owners without permits, resulting in wood stove installations that do not meet CSA B365 clearance requirements. Seasonal properties sitting empty for months often develop chimney bird and squirrel nesting, moisture damage to clay liners, and collapsed spark arrestors that go undetected without annual professional WETT inspection. ASADS covers all of Barrie, Innisfil, Angus, Collingwood, Wasaga Beach, Midland, and surrounding Simcoe County cottage markets.",
                },
                {
                  city: "WETT Inspection — Hamilton, Ancaster & Dundas",
                  body: "Hamilton's century homes and late-Victorian residential streets — particularly in Dundas, Ancaster, Westdale, and Hamilton's downtown core — contain original double-flue masonry chimneys serving both furnace and fireplace. These aging masonry chimney stacks commonly exhibit mortar joint deterioration, crumbling clay tile sections, and failed chimney crowns that allow water infiltration and accelerate liner damage. Hamilton's cold winters and high humidity create aggressive freeze-thaw cycles that damage chimney masonry faster than the GTA average. Level 2 WETT inspections in Hamilton commonly reveal deteriorated liner sections and creosote accumulation in fireplaces that have not been used or swept in years — a common scenario when older residents transition from wood burning to natural gas. ASADS covers Hamilton, Stoney Creek, Dundas, Ancaster, and Binbrook.",
                },
                {
                  city: "WETT Inspection — Oakville, Burlington & Halton",
                  body: "Oakville and Burlington's mix of 1960s–80s executive homes and newer luxury properties presents a different WETT profile. Older South Oakville and Burlington properties frequently contain fireplace inserts — wood or gas — that were added to existing masonry fireboxes without a WETT assessment. Fireplace inserts installed without proper liner connections create dangerous bypass zones where combustion gases can escape into chimney cavities adjacent to combustible framing. Newer luxury homes in North Oakville and Alton contain factory-built zero-clearance fireplaces that require inspection to verify proper installation, clearance, and venting. Halton real estate agents routinely require WETT certificates as a condition of sale — ASADS provides same-day Level 1 and Level 2 inspections across all of Oakville, Burlington, and Halton Region.",
                },
              ].map((item) => (
                <div key={item.city} className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{item.city}</h4>
                  <p className="text-sm text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      whatWeInspect={[
        "Clearance to combustible walls",
        "Hearth and floor protection",
        "Chimney liner & flue integrity",
        "Damper and air control operation",
        "Creosote & soot accumulation",
        "Masonry & mortar condition",
        "Chimney cap & spark arrestor",
        "Firebox refractory panels",
        "Installation mounting & security",
        "Chimney termination height",
        "Smoke & CO detector proximity",
        "Thermal heat-leak detection",
      ]}
      features={[
        {
          title: "Insurance Compliance",
          description: "Our WETT certificates are specifically formatted to meet the strict documentation requirements of GTA insurance brokers."
        },
        {
          title: "Thermal Scan Included",
          description: "We use FLIR® thermal technology to inspect for overheating behind walls and around chimney thimbles."
        },
        {
          title: "Same-Day Digital Reports",
          description: "Receive your PDF certification the same day as the inspection, complete with high-resolution photo documentation."
        },
        {
          title: "Real Estate Liaison",
          description: "We help buyers and sellers navigate inspection findings to ensure real estate closings proceed without delays."
        },
      ]}
      benefits={[
        "WETT Certified Technicians",
        "All Insurance Providers Accepted",
        "Thermal Imaging Included",
        "50-Point Safety Checklist",
        "Same-Day PDF Reporting",
        "Emergency 24/7 Booking",
        "Clear Remediation Steps",
        "Master Inspector Oversight",
      ]}
      faqs={[
        {
          question: "Why do insurance companies require WETT inspections?",
          answer: "Insurance providers view wood-burning appliances as high-risk. A WETT inspection proves the system was installed according to the Ontario Building Code and CSA B365, reducing fire risk and liability."
        },
        {
          question: "How long is a WETT certificate valid for?",
          answer: "Most insurance companies require a new inspection every 3 to 5 years, or whenever a property changes ownership. Check your specific policy for 'Wood-Burning Heat' riders."
        },
        {
          question: "Do you inspect the roof/top of the chimney?",
          answer: "Yes. Our inspections include a visual check of the chimney termination, flashing, and cap from the roof level (weather and safety permitting)."
        },
        {
          question: "What happens if the fireplace fails the WETT inspection?",
          answer: "If we find deficiencies (e.g., inadequate clearance), we provide a detailed list of required corrections. We can often suggest simple heat-shielding solutions to bring an appliance into compliance."
        },
        {
          question: "How much does a WETT inspection cost in Ontario?",
          answer: "WETT inspections in Ontario start from $249 for a Level 1 maintenance inspection. A Level 2 real estate inspection (required for home purchases) starts from $299. Both include thermal imaging and same-day digital certification. Contact us at (647) 801-9311 for a quote."
        },
        {
          question: "How much does a WETT inspection cost in Toronto?",
          answer: "WETT inspections in Toronto start from $249 for Level 1 and $299 for Level 2 (real estate). Thermal imaging is included at no extra charge. Same-day PDF certificate provided. Call (647) 801-9311."
        },
        {
          question: "What is the difference between a WETT Level 1, 2, and 3 inspection?",
          answer: "Level 1 is a basic visual inspection for appliances in regular use with no changes. Level 2 is required for real estate transactions, after chimney fires, or when appliances are changed — it includes accessible areas of the chimney interior. Level 3 is destructive (opening walls/ceilings) and only done when serious hazards are suspected. For real estate purposes, a Level 2 inspection is the standard."
        },
        {
          question: "Can my wood stove pass WETT if it's an older model?",
          answer: "Yes — older CSA B365-certified or ULC-listed appliances can pass WETT if properly installed and maintained. However, uncertified appliances (homemade stoves, non-listed imports) cannot receive a WETT certificate regardless of condition. We'll assess the appliance data plate and installation records to determine eligibility."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
      ]}
    />
  );
}
