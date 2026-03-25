import { Microscope, ShieldAlert, Droplets, FlaskConical, ClipboardList, ThermometerSnowflake } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Link } from "react-router-dom";

export default function MoldInspection() {
  const pageTitle = "Mold Inspection & Testing Ontario | From $299 | ASADS";
  const schemaDescription = "Certified mold inspection & testing Ontario from $299. Air sampling, black mold ID, AIHA lab results. Toronto, GTA & Ontario. Independent — not remediation.";

  return (
    <ServicePageTemplate
      title="Mold Inspection, Testing & Assessment"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="Mold Inspection & Mold Testing Ontario — Certified, Independent, Lab-Confirmed"
      heroSubtitle={
        <>
          Protect your home and health with AIHA-certified lab testing across Ontario. We detect toxic black mold, hidden moisture, and water-damage-related spores with 99.9% accuracy.
          <br />
          <Link to="/services/pre-purchase" className="text-blue-600 underline">
            Pre-Purchase Home Inspections
          </Link>{" "}
          and{" "}
          <Link to="/services/pre-listing" className="text-blue-600 underline">
            Pre-Listing Inspections
          </Link>{" "}
          integrate mold checks for buyer and seller confidence.
        </>
      }
      icon={Microscope}
      price="From $299"
      duration="2-3 Hours + Lab Analysis"
      description={
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-2">
            <p className="text-blue-900 text-sm font-medium">
              <strong>Mold inspection & testing only — we do not do remediation or removal.</strong> ASADS is a certified independent third-party inspector. Because we have no financial interest in finding mold or recommending removal, our assessments are 100% unbiased. We provide the written scope of work that licensed remediation contractors use to quote your job.
            </p>
          </div>
          <p className="text-lg leading-relaxed text-slate-700">
            Mold isn't just a property issue — it's a health risk. Our Ontario-wide specialists go beyond visual checks, providing <strong>AIHA-accredited lab analysis</strong> and <strong>PCR DNA testing</strong> for 36+ species, including toxigenic <em>Stachybotrys</em> (Black Mold). Emergency mold inspections and same-day services are available for urgent concerns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center text-center p-5 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
              <FlaskConical className="text-purple-600 mb-2" size={32} />
              <h4 className="font-bold text-purple-900">Lab Certified</h4>
              <p className="text-xs text-purple-800">AIHA-accredited lab testing ensures accurate results for legal, insurance, and health purposes.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
              <ThermometerSnowflake className="text-blue-600 mb-2" size={32} />
              <h4 className="font-bold text-blue-900">Infrared Moisture Scan</h4>
              <p className="text-xs text-blue-800">Detect hidden water damage behind walls, ceilings, and attics before mold spreads.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-red-50 rounded-xl border border-red-100 shadow-sm">
              <ShieldAlert className="text-red-600 mb-2" size={32} />
              <h4 className="font-bold text-red-900">Health-Focused</h4>
              <p className="text-xs text-red-800">Specialized protocols for clients with respiratory issues, allergies, or chronic fatigue.</p>
            </div>
          </div>

          <p>
            Whether it's a water-damaged basement, attic mold, or a home being prepped for sale, our reports provide <strong>species identification</strong> and <strong>spore quantification</strong> to guide safe remediation.
            We prioritize urgent, local cases with "mold inspection near me" and "emergency mold testing" options for fast bookings.
          </p>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">When Should You Get a Mold Inspection?</h3>
            <ul className="space-y-2">
              {[
                "Visible mold or mildew anywhere in the home",
                "Musty odours especially in basement or HVAC",
                "After any water damage or flooding",
                "If occupants have unexplained respiratory symptoms",
                "Buying a home with evidence of past water intrusion",
                "After remediation work to confirm clearance",
                "Homes with finished basements and history of humidity problems",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ShieldAlert className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Common Mold Problems in Ontario & GTA Homes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Basement Rim Joist Mold",
                  body: "Condensation and air leakage causes mold behind insulation in the band joist. Very common in Toronto semi-detached homes.",
                },
                {
                  title: "HVAC & Air Handler Contamination",
                  body: "Mold colonizes drain pans, evaporator coils, and duct liner, spreading spores throughout the home.",
                },
                {
                  title: "Attic Mold",
                  body: "Inadequate ventilation or bath fan vented into the attic causes mold on roof sheathing, potentially affecting the entire roof structure.",
                },
                {
                  title: "Bathroom & Kitchen Caulking",
                  body: "Chronic moisture allows Cladosporium and Penicillium growth in grout and around tubs.",
                },
                {
                  title: "Window Frame Condensation Mold",
                  body: "Single-pane or poorly sealed windows in Toronto winters create perfect mold growth conditions.",
                },
                {
                  title: "Crawl Space Moisture",
                  body: "Ground moisture and lack of vapour barrier creates a high-RH environment conducive to mold on floor joists.",
                },
              ].map((card) => (
                <div key={card.title} className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{card.title}</h4>
                  <p className="text-sm text-slate-700">{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Mold Inspection Process</h3>
            <ol className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Visual Assessment & Moisture Mapping",
                  body: "We use a FLIR thermal camera and calibrated moisture meters to find hidden wet areas without opening walls.",
                },
                {
                  step: "2",
                  title: "Air Cassette Sampling",
                  body: "A calibrated pump draws air through cassette filters. Samples are taken inside the home and outside as a control baseline.",
                },
                {
                  step: "3",
                  title: "AIHA-Accredited Lab Analysis",
                  body: "Samples are analyzed using Spore Trap or PCR/DNA method depending on requirements. Results in 24–72 hours.",
                },
                {
                  step: "4",
                  title: "Written Report & Remediation Scope",
                  body: "Results are compared to the outdoor baseline. If elevated, we provide a written remediation scope of work for contractor tender.",
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
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

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Mold Inspection Pricing in Ontario</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              {[
                { tier: "Basic Air Test", price: "From $299", detail: "2 air samples + outdoor control, AIHA lab, written report. Ideal for single concern (one room / basement)." },
                { tier: "Full Home Assessment", price: "From $449", detail: "4–6 air samples + thermal scan + moisture mapping. Covers whole home. Most popular for buyers & sellers." },
                { tier: "Post-Remediation Clearance", price: "From $249", detail: "Confirms mold removal was successful. Required documentation for real estate closings and insurance." },
              ].map((p) => (
                <div key={p.tier} className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
                  <p className="font-bold text-purple-900">{p.tier}</p>
                  <p className="text-xl font-bold text-purple-700 my-1">{p.price}</p>
                  <p className="text-xs text-slate-600">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Mold Testing vs Mold Inspection — What's the Difference?</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-purple-100 text-slate-800">
                    <th className="p-3 font-semibold border border-purple-200">Service</th>
                    <th className="p-3 font-semibold border border-purple-200">What It Covers</th>
                    <th className="p-3 font-semibold border border-purple-200">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { svc: "Visual Mold Inspection", covers: "Inspector identifies visible mold, moisture damage, and conditions favourable to mold growth", best: "Initial assessment, landlord disputes, quick check" },
                    { svc: "Mold Air Testing", covers: "Calibrated pump captures airborne spores; AIHA lab counts and identifies species", best: "Hidden mold, health concerns, pre/post remediation" },
                    { svc: "Surface Swab / Tape-Lift", covers: "Direct sample from a suspect surface confirms species and concentration", best: "Visible growth that needs species ID for remediation scope" },
                    { svc: "Post-Remediation Clearance Test", covers: "Air samples after removal confirm spore levels returned to baseline", best: "Real estate closings, insurance documentation, tenant-landlord resolution" },
                  ].map(({ svc, covers, best }) => (
                    <tr key={svc} className="border-b border-purple-100 even:bg-purple-50/40">
                      <td className="p-3 border border-purple-100 font-medium text-slate-800">{svc}</td>
                      <td className="p-3 border border-purple-100 text-slate-600">{covers}</td>
                      <td className="p-3 border border-purple-100 text-slate-600">{best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-700">Most clients book a <strong>combined inspection + air test</strong> — the inspector visually identifies risk areas, then takes targeted air samples in the highest-concern zones rather than sampling blindly.</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Same-Day Mold Inspection Near Me — Toronto & GTA</h3>
            <p className="text-slate-700 mb-2">Searching for <em>mold inspection near me</em> or need same-day service? ASADS inspectors are available across Toronto, Mississauga, Brampton, Hamilton, Oakville, Etobicoke, North York, Scarborough, and 100+ Ontario cities. Emergency mold inspection is available when you can't wait:</p>
            <ul className="space-y-1 text-slate-700">
              {[
                "Tenant or landlord requiring documented evidence within 24 hours",
                "Real estate conditional period expiring — inspection needed same day",
                "Health symptoms requiring immediate investigation",
                "Water damage or flooding within the last 48 hours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ShieldAlert className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-semibold text-slate-800">Call <a href="tel:6478019311" className="text-blue-700 underline">(647) 801-9311</a> for same-day mold inspection booking.</p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Mold Inspection by City — Toronto & Ontario</h3>
            <p className="text-slate-700 mb-6">Mold risk varies significantly by neighbourhood, housing era, and local climate. Here is what our inspectors commonly find across Ontario's major cities.</p>
            <div className="space-y-4">
              {[
                {
                  city: "Mold Inspection — Toronto & Etobicoke",
                  body: "Toronto's older residential boroughs — Etobicoke, North York, Scarborough, and East York — have the highest concentration of mold-prone housing in the GTA. Post-war bungalows from the 1950s and 1960s in Etobicoke and North York were commonly built with unventilated attic spaces where bathroom exhaust fans were ducted directly into the attic rather than to the exterior. The result is decades of moisture accumulation on roof sheathing, creating extensive black and grey mold colonies that are invisible from inside the home but can consume the entire underside of a roof deck. Toronto's aging window stock — single-pane and early double-glazed units — creates condensation-driven mold growth on window frames and in adjacent wall cavities throughout winter. ASADS provides same-day mold inspection across all Toronto neighbourhoods including Etobicoke, North York, Scarborough, East York, and the downtown core.",
                },
                {
                  city: "Mold Inspection — Brampton",
                  body: "Brampton's explosive residential growth from the 1970s through the 1990s produced large tracts of townhouses and semi-detached homes in Bramalea, downtown Brampton, and early Springdale developments that are now reaching peak moisture-problem age. Original bath fans in these homes were frequently either undersized or vented into attic spaces in violation of current code, creating chronic attic mold conditions on roof sheathing and insulation batts. Finished basements with original below-grade windows and no sump pump drainage commonly develop Penicillium and Cladosporium growth behind vapour barriers and under carpet underlay — often undetected for years. Air sampling during Brampton mold inspections frequently reveals elevated spore counts that have no visible source, confirming hidden wall or ceiling cavity colonization.",
                },
                {
                  city: "Mold Inspection — Mississauga",
                  body: "Mississauga's Port Credit, Cooksville, Lakeview, and Malton neighbourhoods contain significant concentrations of 1960s through 1980s housing where mold inspection is a standard pre-purchase and pre-renovation protocol. Lakefront proximity in Port Credit and Lakeview creates elevated ambient humidity levels that accelerate mold growth in basements, crawl spaces, and around window frames in homes without upgraded insulation or controlled mechanical ventilation. Cooksville and Malton's high-density townhouse and apartment-style housing presents attic mold from inadequate roof ventilation and bathroom fan exhaust issues common in multi-unit buildings from this era. ASADS provides certified mold testing across all Mississauga communities with same-day scheduling and AIHA lab results.",
                },
                {
                  city: "Mold Inspection — Oakville",
                  body: "Oakville's South Oakville, Kerr Village, and Bronte neighbourhoods feature older housing stock where basement moisture and crawl space mold are recurring inspection findings. South Oakville properties — many dating from the 1950s and 1960s — commonly have stone or block foundation walls without interior waterproofing membranes, allowing moisture migration that produces efflorescence and mold growth on basement walls and floor joists above crawl spaces. Kerr Village's heritage commercial-residential conversions present mold risk in poorly ventilated upper-floor suites and in original roof structures. Pre-purchase mold inspection is standard practice for Oakville buyers given the age and value of South Oakville properties. ASADS provides full air sampling with AIHA lab analysis across all Oakville neighbourhoods.",
                },
                {
                  city: "Mold Inspection — Barrie",
                  body: "Barrie's cold climate creates Ontario's most challenging conditions for attic mold formation. Freeze-thaw cycles, heavy snow loads, and dramatic temperature swings between heated interior spaces and cold attic decks drive condensation onto roof sheathing throughout the winter months. Barrie homes with inadequate attic insulation at the eave line — a code compliance issue common in pre-2000 construction — are particularly susceptible to ice dam formation and the associated attic mold that develops when meltwater infiltrates roof assemblies. Barrie's growing new construction market also presents builder-related mold issues: improperly commissioned HRV systems that fail to exhaust bathroom humidity, and spray foam insulation gaps that allow condensation pockets to form in wall assemblies. ASADS provides attic mold inspections and full air quality assessments across Barrie and the surrounding Simcoe County area.",
                },
                {
                  city: "Mold Inspection — Hamilton & Stoney Creek",
                  body: "Hamilton's older residential neighbourhoods — the lower city, Stoney Creek, and Dundas — contain a high concentration of pre-1960 housing where mold inspection requires attention to century-home-specific moisture pathways. Plaster and lathe wall systems absorb and retain moisture from envelope leaks and condensation, creating sustained growth conditions for Stachybotrys (black mold) and Aspergillus behind original wall finishes. Hamilton's geography — positioned between the Escarpment and Lake Ontario — creates localized humidity conditions that elevate baseline indoor moisture levels in older homes relative to other GTA markets. Basement mold in Hamilton's lower city properties is commonly linked to inadequate foundation waterproofing on solid masonry walls and deteriorated weeping tile systems that allow groundwater infiltration. ASADS provides certified mold inspection and air sampling across Hamilton, Stoney Creek, Dundas, and Ancaster.",
                },
              ].map((item) => (
                <div key={item.city} className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{item.city}</h4>
                  <p className="text-sm text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">What If Mold Is Found?</h3>
            <ul className="space-y-2">
              {[
                "Minor mold (under 1 m²) can often be cleaned by a homeowner following Health Canada guidelines.",
                "Larger infestations require a licensed remediation contractor.",
                "We provide the scope of work document contractors need to quote.",
                "In real estate, a mold report is grounds for price reduction or seller-paid remediation.",
                "We offer post-remediation clearance testing to confirm the job is complete.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Droplets className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      whatWeInspect={[
        "Airborne Spore Count (Indoor vs Outdoor)",
        "Toxic Species Identification (Stachybotrys, Aspergillus)",
        "Hidden Wall & Ceiling Moisture",
        "HVAC Ductwork Contamination",
        "Sump Pit & Floor Drain Mold",
        "Attic Insulation & Sheathing Mold",
        "Basement Foundation Efflorescence",
        "Window Condensation & Seal Analysis",
        "Infrared Detection of Hidden Growth",
        "Relative Humidity & Dew Point Mapping",
        "Surface Swab & Tape-Lift Sampling",
        "Post-Remediation Clearance Testing",
      ]}
      features={[
        {
          title: "PCR DNA Analysis",
          description: "Identify the exact species for precise remediation and medical risk assessment."
        },
        {
          title: "Infrared Moisture Mapping",
          description: "Track hidden leaks and condensation before visible mold develops."
        },
        {
          title: "Court & Insurance Admissible Reports",
          description: "Certified documentation accepted for real estate disputes, insurance claims, and tenant-landlord issues."
        },
        {
          title: "Clearance Certificates",
          description: "Post-remediation testing ensures mold has been safely removed, with official documentation."
        },
      ]}
      benefits={[
        "Certified AIHA Lab Partners",
        "Emergency Mold Inspection Available",
        "Same-Day Preliminary Results",
        "36+ Mold Species Tested",
        "ERMI & HERTSMI-2 Scoring",
        "Detailed Remediation Roadmaps",
        "Insurance-Ready Documentation",
        "Infrared Thermal Scanning & PCR DNA Testing",
      ]}
      faqs={[
        {
          question: "Can I just use a hardware store mold kit?",
          answer: "Hardware store kits are unreliable and cannot quantify spores. Our calibrated testing measures exact concentrations for health safety."
        },
        {
          question: "How long until mold test results are ready?",
          answer: "On-site sampling is 2 hours. Standard lab analysis takes 3-5 business days, with 24-hour rush options for urgent cases."
        },
        {
          question: "Is 'Black Mold' present in my home?",
          answer: "Stachybotrys chartarum requires professional sampling. It often hides behind drywall and isn't reliably detected with simple air tests."
        },
        {
          question: "Will insurance cover mold testing?",
          answer: "Yes, if mold results from a sudden water event. Certified reports help with claims."
        },
        {
          question: "How much does mold inspection cost in Ontario?",
          answer: "Professional mold inspection in Ontario starts from $299, which includes air sampling and lab analysis. Prices vary by property size and number of samples required. Emergency and same-day services are available across Toronto, Mississauga, Brampton, Hamilton, Kitchener, and all GTA cities."
        },
        {
          question: "How is mold testing different from a visual mold inspection?",
          answer: "A visual inspection identifies visible mold growth. Air sampling goes further — it quantifies airborne spore concentrations even when mold is hidden behind walls, in HVAC systems, or in insulation. A property can have hidden mold colonies with no visible signs. Lab-confirmed air sampling is the only way to know if spore counts are elevated."
        },
        {
          question: "What mold species are most dangerous?",
          answer: "Stachybotrys chartarum (black mold) produces mycotoxins and is associated with serious health effects. However, common species like Aspergillus, Penicillium, and Cladosporium are far more prevalent in GTA homes and can cause respiratory irritation, allergies, and asthma at elevated concentrations. Our lab report identifies species and spore counts for each."
        },
        {
          question: "Do I need a post-remediation test after mold removal?",
          answer: "Yes — a clearance test after remediation is the only way to confirm the work was successful. We take post-remediation air samples and compare them to pre-remediation baselines and outdoor control samples. Without a clearance test, you have no documented proof the mold problem was resolved — which can cause issues when reselling the property."
        },
      ]}
      relatedServices={[
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Pre-Listing Inspection", href: "/services/pre-listing" },
      ]}
    />
  );
}
