import { Video, Search, Map, AlertCircle, ShieldCheck, Clock, DollarSign, ListChecks, HardHat, TriangleAlert } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function SewerScope() {
  const pageTitle = "Sewer Scope Inspection Toronto | From $299 | ASADS";
  const metaDescription = "Sewer scope inspection from $299. CCTV drain camera finds root intrusion, pipe bellies & cracks before you buy. GPS mapping, same-day video report. GTA & Ontario.";

  return (
    <ServicePageTemplate
      title="Sewer Camera Inspection"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="Sewer Scope Inspection & CCTV Drain Camera — Toronto & Ontario"
      heroSubtitle="Don't inherit a $20,000 plumbing disaster. Our sewer scope inspection uses 1080p HD CCTV to reveal the true condition of your underground lateral lines before you close. From $299 — same-day video report."
      icon={Video}
      price="From $299"
      duration="1-2 Hours"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            In the Greater Toronto Area, sewer line replacements are one of the most expensive 
            "hidden" costs of homeownership, often ranging from <strong>$5,000 to over $25,000</strong>. 
            While a standard home inspection covers interior plumbing, it cannot "see" 
            underground where roots, soil shifting, and age do the most damage.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <h4 className="text-blue-900 font-bold flex items-center gap-2">
              <Search className="text-blue-600" size={20} />
              Advanced CCTV Technology
            </h4>
            <p className="text-blue-800 text-sm mt-1">
              We utilize 200ft industrial push-rod cameras with <strong>self-leveling heads</strong>. 
              This ensures we reach the municipal main connection and provide a clear, 
              upright view of defects that standard 720p consumer-grade cameras miss.
            </p>
          </div>

          <p>
            Our inspection is critical for Toronto's older neighborhoods where
            <strong> clay tiles, cast iron, or "Orangeburg" bituminized fiber pipes</strong> are common.
            We provide a narrated video file the same day, giving you the immediate
            leverage needed for real estate negotiations.
          </p>

          {/* Cost table */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <DollarSign className="text-green-600" size={22} />
              Sewer Scope Inspection Cost Ontario 2026
            </h3>
            <p className="text-slate-700 mb-4">
              The cost of a sewer scope (CCTV drain camera) inspection in Ontario depends on property type and access. Here is what to expect:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-green-100 text-slate-800">
                    <th className="p-3 font-semibold border border-green-200">Service</th>
                    <th className="p-3 font-semibold border border-green-200">Cost</th>
                    <th className="p-3 font-semibold border border-green-200">Includes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { svc: "Standard sewer scope", cost: "From $299", inc: "HD video, written report, same-day cloud delivery" },
                    { svc: "Sewer scope + GPS Sonde mapping", cost: "From $349", inc: "Above + exact defect location marked above ground" },
                    { svc: "Add-on to home inspection", cost: "From $199", inc: "Discounted when booked with pre-purchase inspection" },
                    { svc: "Commercial property", cost: "Quote", inc: "Larger laterals, multiple access points" },
                  ].map(({ svc, cost, inc }) => (
                    <tr key={svc} className="border-b border-green-100 even:bg-green-50/50">
                      <td className="p-3 border border-green-100 font-medium text-slate-800">{svc}</td>
                      <td className="p-3 border border-green-100 font-bold text-green-700">{cost}</td>
                      <td className="p-3 border border-green-100 text-slate-600">{inc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3">Prices listed are for residential properties in the Greater Toronto Area. Rates may vary for properties without a dedicated cleanout. We serve all of Ontario — call (647) 801-9311 for a quote.</p>
          </div>

          {/* When do you need a sewer scope */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <TriangleAlert className="text-amber-500" size={22} />
              When Should You Get a Sewer Scope Inspection?
            </h3>
            <p className="text-slate-700 mb-3">
              A sewer scope inspection is strongly recommended in any of the following situations:
            </p>
            <ul className="space-y-2 text-slate-700">
              {[
                "Buying a home built before 2000 — older clay tile and cast iron pipes degrade over time",
                "The property has mature trees close to the house or along the lot line — roots are the #1 cause of blockages",
                "You've noticed slow drains, gurgling sounds, or recurring basement backups",
                "The home has never had a sewer inspection in its history",
                "You're buying in Toronto neighbourhoods with original 1950s–1980s infrastructure (East York, Scarborough, North York, Etobicoke)",
                "The listing disclosure mentions past plumbing or water damage",
                "You are purchasing a home with Orangeburg, clay tile, or cast iron sewer laterals",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ShieldCheck className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common GTA pipe problems */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <AlertCircle className="text-red-500" size={22} />
              Most Common Sewer Problems Found in GTA Homes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { problem: "Tree Root Intrusion", detail: "Roots from oak, maple and willow trees enter pipe joints and grow until they cause full blockage. Estimated repair: $3,000–$8,000." },
                { problem: "Pipe Bellies (Sags)", detail: "Ground settling creates low spots where wastewater pools and solids accumulate, leading to chronic backups. Repair often requires excavation: $6,000–$15,000." },
                { problem: "Orangeburg Pipe Failure", detail: "Bituminized fibre pipe installed 1940s–1970s deteriorates into a soft, collapsing tube. Common in Etobicoke, Scarborough, and North York. Full replacement typically $8,000–$20,000." },
                { problem: "Offset or Separated Joints", detail: "Soil shifting causes pipe sections to separate. Sewage leaks into the ground. Repair cost: $4,000–$12,000 depending on depth and access." },
                { problem: "Corrosion in Cast Iron", detail: "Cast iron pipes corrode from the inside out. Scaling narrows the pipe and flaking causes blockages. Common in Toronto homes from the 1960s–1980s." },
                { problem: "Cracks and Fractures", detail: "Ground movement, frost, and vehicle loading cause pipe fractures. Small cracks can often be repaired with pipe lining ($3,000–$7,000) rather than full replacement." },
              ].map(({ problem, detail }, i) => (
                <div key={i} className="bg-red-50 border border-red-100 rounded-lg p-4">
                  <p className="font-semibold text-red-800 mb-1">{problem}</p>
                  <p className="text-sm text-slate-600">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-step process */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <ListChecks className="text-blue-600" size={22} />
              What Happens During a Sewer Scope Inspection
            </h3>
            <ol className="space-y-3 text-slate-700">
              {[
                { step: "Camera Access", detail: "We access the sewer line through the cleanout, a basement toilet, or in some cases a roof vent stack. No digging required." },
                { step: "HD Camera Inspection", detail: "Our 200ft industrial push-rod camera with self-leveling head travels the full length of the lateral, recording 1080p narrated video of every pipe condition." },
                { step: "Defect Identification & GPS Mapping", detail: "When we spot a problem, we note the distance from the access point. If required, we use a Sonde radio transmitter to locate and GPS-map the defect above ground — giving contractors the exact dig location." },
                { step: "Same-Day Report Delivery", detail: "Within hours of the inspection, you receive a private cloud link with the full narrated video, a written condition summary, and flagged timestamps for any defects found." },
                { step: "Negotiation Support", detail: "We're available by phone to explain findings to your real estate agent, lawyer, or the listing agent — helping you convert our report into a price reduction or repair credit." },
              ].map(({ step, detail }, i) => (
                <li key={i} className="flex gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <span className="font-semibold text-slate-800">{step}: </span>
                    <span>{detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* What's included */}
          <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-5">
            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              <DollarSign className="text-green-600" size={22} />
              What's Included in Every Sewer Scope
            </h3>
            <p className="text-slate-700 mb-3">
              Our sewer camera inspection starts at <strong>$299</strong> and includes:
            </p>
            <ul className="space-y-1 text-slate-700">
              {[
                "200ft HD camera inspection of the full lateral line",
                "GPS / Sonde pipe mapping if a defect is found",
                "Same-day private cloud video delivery (narrated)",
                "Written condition report with defect timestamps",
                "Phone consultation with your realtor or lawyer",
                "Impartial 3rd-party assessment — we do not perform repairs",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ShieldCheck className="text-green-500 shrink-0" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 mt-3">
              Note: Homes without a dedicated cleanout may incur an additional access fee. Contact us for a quote specific to your property.
            </p>
          </div>

          {/* What if we find something */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <HardHat className="text-orange-500" size={22} />
              What Happens If We Find a Problem?
            </h3>
            <p className="text-slate-700">
              Finding a sewer defect before closing is actually good news — it puts you in control. Here's what typically happens:
            </p>
            <ul className="mt-3 space-y-2 text-slate-700">
              {[
                "Your realtor uses our report to request a repair credit or price reduction from the seller",
                "You can get 2–3 plumber quotes before closing to understand the true repair cost",
                "If the defect is minor (small crack, partial root intrusion), pipe lining may be a cost-effective alternative to full replacement",
                "If the defect is severe (collapsed Orangeburg, major belly), you can walk away from the deal or renegotiate significantly",
                "We're available to explain findings directly to the listing agent or seller's lawyer to support your negotiation",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Map className="text-blue-500 mt-0.5 shrink-0" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      whatWeInspect={[
        "Structural integrity of pipe walls",
        "Tree root intrusion points",
        "Bellies (low spots causing sediment)",
        "Offset or separated joints",
        "Cracks, fractures, and holes",
        "Corrosion in cast iron lines",
        "Presence of 'Orangeburg' piping",
        "Debris or grease build-up",
        "Proximity to municipal main",
        "Condition of the cleanout",
        "Pipe material transitions",
        "Previous patch or liner repairs",
      ]}
      features={[
        {
          title: "1080p HD Video",
          description: "Crystal clear imaging with high-intensity LED lighting to identify even hairline fractures in clay or PVC."
        },
        {
          title: "Sonde & GPS Mapping",
          description: "If a defect is found, we use a radio frequency transmitter to pinpoint the exact location and depth above ground."
        },
        {
          title: "Same-Day Cloud Delivery",
          description: "Receive a private link to your narrated inspection video and report within hours of the site visit."
        },
        {
          title: "Impartial 3rd Party",
          description: "We don't perform repairs. This ensures our assessment is 100% unbiased, unlike plumbing companies looking for work."
        },
      ]}
      benefits={[
        "Negotiate repair credits",
        "Avoid excavation surprises",
        "Map exact pipe locations",
        "Identify root-prone areas",
        "Same-day video evidence",
        "Verify previous repairs",
        "Commercial-grade reach (200ft)",
        "Peace of mind for older homes",
      ]}
      faqs={[
        {
          question: "Why isn't sewer scope included in a standard home inspection?",
          answer: "Sewer scoping requires specialized, expensive CCTV equipment and additional training. Most home inspectors only check if drains are currently flowing; we check if they are about to fail."
        },
        {
          question: "What is a 'belly' in a sewer line?",
          answer: "A belly is a sagging section of pipe caused by ground settling. It creates a pool of standing water that catches debris, eventually leading to chronic backups."
        },
        {
          question: "Can you inspect if there is no cleanout?",
          answer: "Yes. While a dedicated cleanout is ideal, we can often access the line by removing a basement toilet or via a roof vent, though additional fees may apply."
        },
        {
          question: "How far can your sewer camera go?",
          answer: "Our professional systems carry 200 feet of cable, which is more than enough to reach the city's main connection for almost any residential property in the GTA."
        },
        {
          question: "How much does a sewer scope inspection cost in Toronto?",
          answer: "Sewer camera inspection in Toronto starts from $299. This includes HD video recording, same-day cloud delivery, and a detailed condition report for real estate negotiations."
        },
        {
          question: "What is Orangeburg pipe and why is it a problem?",
          answer: "Orangeburg is a bituminized fibre pipe used from the 1940s through the 1970s. It was cheap to produce post-WWII and was used extensively in Toronto's postwar suburban expansion — particularly in Etobicoke, Scarborough, and North York. Over decades, it absorbs water and collapses into an oval or irregular shape. By 50–60 years old, most Orangeburg pipe requires full replacement costing $8,000–$20,000 or more."
        },
        {
          question: "Can a sewer scope inspection be done on new construction?",
          answer: "Yes, and it's often overlooked. Construction debris like cement, gravel, and wood can be lodged in new lateral lines during the build. We also check that pipe grade (slope) was installed correctly, as improper slope causes chronic backups even in brand-new homes."
        },
        {
          question: "How do I use the sewer scope report to negotiate?",
          answer: "Your report includes a narrated HD video, written defect summary, and GPS-marked pipe locations. Your realtor can share this with the seller to request a repair credit, price reduction, or seller-paid repair before closing. We are also available to speak directly with listing agents or lawyers to explain findings. Many clients recover 2–5x the cost of the inspection in negotiated credits."
        },
        {
          question: "Is a sewer scope included in a standard home inspection with ASADS?",
          answer: "No — sewer scoping requires a separate CCTV camera system and expertise beyond a standard home inspection. We offer it as a standalone service or as an add-on to any home inspection booking. When booked together, we can often schedule both inspections on the same visit."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "WETT Inspection", href: "/services/wett" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
      ]}
    />
  );
}
