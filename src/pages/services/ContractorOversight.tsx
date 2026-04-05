import { ShieldCheck, HardHat, ClipboardCheck, Scale } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Link } from "react-router-dom";

const whatWeInspect = [
  "Contractor licence & insurance verification (ECRA, TSSA, applicable Ontario trades)",
  "Building permit status — confirmed pulled & posted on site",
  "Ontario Building Code (OBC) compliance at each milestone stage",
  "Foundation, formwork & concrete work quality (pre-pour)",
  "Structural framing, sheathing & load-bearing compliance",
  "Electrical rough-in — ESA/ECRA licensed trade verification",
  "Plumbing rough-in — TSSA-licensed trade & drain/supply compliance",
  "HVAC installation, venting, combustion air & gas connections",
  "Insulation, vapour barrier & air sealing (pre-drywall stage)",
  "Materials match contracted specs — brand, grade, dimensions",
  "Milestone progress photo documentation for your records",
  "Deficiency punch list with corrective-action recommendations",
];

const features = [
  {
    title: "Licence & Insurance Verification",
    description:
      "We confirm every trade on your project holds a valid, active Ontario licence — ECRA for electricians, TSSA for gas/HVAC, and any applicable trades licence — before their work is signed off. An unlicensed trade voids your insurance and leaves you personally liable.",
  },
  {
    title: "Pre-Drywall Code Compliance",
    description:
      "Once drywall goes up, deficiencies become expensive surprises. We inspect at critical open-wall stages — pre-pour, rough-in, pre-drywall — so code violations and workmanship deficiencies are caught and corrected while they cost hundreds to fix, not tens of thousands.",
  },
  {
    title: "Forensic-Grade Site Reports",
    description:
      "Every visit produces a timestamped, photo-documented forensic report with pass/fail status per trade and a detailed deficiency list. Written to evidentiary standards — this is the documentation that forces contractors to correct work before payment and wins disputes in court.",
  },
  {
    title: "Legal Documentation & Court Support",
    description:
      "Our forensic inspection reports are written to be legally defensible from the first visit. If your contractor relationship deteriorates, we're ready with affidavits, expert witness statements, and inspector appearances at Small Claims Court or Ontario Superior Court.",
  },
];

const benefits = [
  "Independent inspector — zero ties to your contractors",
  "Active ECRA, TSSA & trades licence confirmed each visit",
  "OBC compliance verified at every milestone stage",
  "Pre-drywall deficiencies caught before burial",
  "Photo-documented evidence for disputes & insurance",
  "Forensic-grade written reports admissible in court",
  "Inspector available for court appearances",
  "Per-visit pricing — pay only for the oversight you need",
];

const faqs = [
  {
    question: "How much does contractor oversight cost?",
    answer:
      "ASADS contractor oversight inspections are priced per visit starting from $249. The right number of visits depends on your project's complexity and value — a basement renovation might need 2 visits (rough-in + pre-drywall), while a full addition or gut renovation may warrant 4–6 visits. We recommend discussing your project scope before booking so we can advise on the most cost-effective schedule. The per-visit cost is a fraction of what a single buried deficiency or contractor dispute typically costs to resolve.",
  },
  {
    question: "How many inspections do I need during my renovation?",
    answer:
      "The milestone inspections that deliver the most value are: (1) Pre-pour / pre-concrete — before any concrete is placed so formwork and rebar can still be corrected; (2) Rough-in — when all electrical, plumbing, and HVAC are visible before framing is sheathed; (3) Pre-drywall — final opportunity to see everything behind the walls before it's closed up; and (4) Final completion — verifying deficiencies have been corrected and work is complete per contract. For large projects, a kick-off inspection to verify permits, licences, and site safety is also worthwhile.",
  },
  {
    question: "I'm already having problems with my contractor. Can you still help?",
    answer:
      "Yes — it's never too late. A mid-project or post-completion forensic inspection establishes a documented baseline of current conditions: what has been done, what is deficient, and what remains. This forensic report becomes your evidence for withholding payment, negotiating corrections, filing a complaint with the applicable trades board, or initiating legal action. If work is complete and you suspect deficiencies are buried, thermal imaging and targeted forensic investigation can reveal hidden problems with evidence that holds up in court.",
  },
  {
    question: "Can you verify whether my contractor is actually licensed?",
    answer:
      "Yes. Ontario's ECRA (Electrical Contractors Registration Agency) and TSSA (Technical Standards & Safety Authority) maintain public registries. We verify your contractor's licence number before every inspection visit and document the result in our report. An electrician working without ECRA registration is performing illegal work — any electrical deficiency or fire caused by unlicensed electrical work will be denied by your homeowner insurance. The same liability applies to unlicensed gas/HVAC work under TSSA. Licence verification is one of the first things we check at every visit.",
  },
  {
    question: "What happens when deficiencies are found?",
    answer:
      "Our report documents each deficiency with photos, the applicable OBC section or workmanship standard violated, and a recommended corrective action. You receive the report the same day. Armed with this documentation, you withhold payment for that stage until corrections are made and re-inspected. This process keeps contractors accountable in a way that homeowners acting alone rarely achieve — most deficiencies are corrected simply because the contractor knows there is a documented record. We can re-inspect corrected work on a follow-up visit.",
  },
  {
    question: "Is this different from a municipal building permit inspection?",
    answer:
      "Significantly different. Municipal building inspectors verify minimum OBC compliance at scheduled milestones — they are not advocates for you, they don't provide written reports you can use in disputes, and they inspect for pass/fail against code minimums only. ASADS contractor oversight goes further: we verify workmanship quality, trade licences, insurance, contract compliance, material specifications, and progress documentation — and we produce a detailed written report with photos that is yours to use. Municipal inspectors are protecting the public; we are protecting you specifically.",
  },
  {
    question: "Can the inspector appear in court if I need to sue my contractor?",
    answer:
      "Yes. ASADS provides inspector court appearances for Small Claims Court (up to $35,000) and Ontario Superior Court actions against contractors. Our forensic inspection reports are written to evidentiary standards — timestamped photos, specific OBC citations, and plain-language deficiency descriptions a judge can follow without technical background. Court appearance fees are quoted separately based on the proceeding. Many homeowner disputes are resolved before trial once the contractor's lawyer reviews a properly prepared forensic inspection report.",
  },
];

const description = (
  <div className="space-y-6">
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
      <p className="font-semibold text-amber-800 mb-1">Ontario homeowners lose millions annually to contractor fraud and deficient workmanship.</p>
      <p className="text-amber-700 text-sm">
        Unlicensed trades, missing permits, code violations buried behind drywall, and contracts that look legitimate on paper — these are routine risks in Ontario's renovation market. Once the drywall is up and the contractor is paid, your options narrow dramatically. A forensic inspection report created during the renovation is far more powerful than one created after the fact.
      </p>
    </div>

    <p>
      ASADS Forensic Renovation Inspection places a certified, independent inspector on your side throughout your renovation project. We attend your site at critical stages — before concrete is poured, when rough-ins are exposed, before drywall closes everything in — producing forensic-grade documentation that verifies every trade is licensed and insured, all work meets the Ontario Building Code, and your contractor is delivering exactly what you paid for.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <HardHat className="mx-auto mb-2 text-blue-600" size={28} />
        <p className="font-semibold text-blue-800 text-sm">Licence Verified</p>
        <p className="text-blue-700 text-xs mt-1">ECRA, TSSA & Ontario trades confirmed active every visit</p>
      </div>
      <div className="bg-green-50 rounded-lg p-4 text-center">
        <ClipboardCheck className="mx-auto mb-2 text-green-600" size={28} />
        <p className="font-semibold text-green-800 text-sm">Code Compliant</p>
        <p className="text-green-700 text-xs mt-1">OBC compliance at every open-wall milestone stage</p>
      </div>
      <div className="bg-purple-50 rounded-lg p-4 text-center">
        <Scale className="mx-auto mb-2 text-purple-600" size={28} />
        <p className="font-semibold text-purple-800 text-sm">Legally Protected</p>
        <p className="text-purple-700 text-xs mt-1">Court-admissible reports & inspector testimony available</p>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">Who This Service Is For</h3>
      <ul className="space-y-2 text-gray-700">
        <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">→</span><span><strong>Homeowners managing a renovation</strong> — basement finishing, kitchen/bath gut, home addition, or structural work where unlicensed trades are a real risk.</span></li>
        <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">→</span><span><strong>Homeowners already in a dispute</strong> — work is deficient or stalled and you need documentation to withhold payment or take legal action.</span></li>
        <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">→</span><span><strong>Homeowners buying a recently renovated property</strong> — want to verify permits were pulled and work was done to code before closing.</span></li>
        <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">→</span><span><strong>Landlords and investors</strong> — managing renovation projects remotely where on-site verification is not practical.</span></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">Why Unlicensed Work Is a Serious Risk</h3>
      <p className="text-gray-700 mb-3">
        Ontario requires specific licences for electrical work (ECRA), gas and HVAC work (TSSA), and plumbing (Certificate of Qualification). Work performed by an unlicensed trade has two direct consequences for homeowners:
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-gray-700">
        <li><strong>Insurance is void.</strong> Homeowner policies explicitly exclude losses caused by unlicensed work. An electrical fire from unlicensed wiring is your financial loss, not your insurer's.</li>
        <li><strong>Resale is complicated.</strong> A home inspector or real estate lawyer will identify unpermitted or unlicensed work. Correcting it retroactively — opening walls, rewiring, re-plumbing — costs far more than doing it right the first time.</li>
      </ol>
    </div>

    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">Pricing</h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Inspection Visit</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Starting From</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="px-4 py-2">Single inspection visit</td><td className="px-4 py-2 font-semibold text-blue-700">$249</td></tr>
            <tr><td className="px-4 py-2">Rough-in + pre-drywall package (2 visits)</td><td className="px-4 py-2 font-semibold text-blue-700">$449</td></tr>
            <tr><td className="px-4 py-2">Full renovation package (4 visits)</td><td className="px-4 py-2 font-semibold text-blue-700">$849</td></tr>
            <tr><td className="px-4 py-2">Re-inspection (after corrections)</td><td className="px-4 py-2 font-semibold text-blue-700">$149</td></tr>
            <tr><td className="px-4 py-2">Court appearance / legal support</td><td className="px-4 py-2">Quoted per proceeding</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-2">Pricing varies with project size and travel distance. Contact us to discuss your specific project.</p>
    </div>

    <p className="text-gray-700">
      For projects involving materials or systems that may contain designated substances (asbestos, lead, silica), we also offer a{" "}
      <Link to="/services/designated-substance-survey" className="text-blue-600 underline">
        Designated Substance Survey
      </Link>{" "}
      under O.Reg 278/05 — legally required before renovation of any pre-1990 Ontario building involving demolition or disturbance of existing materials.
    </p>
  </div>
);

export default function ContractorOversight() {
  return (
    <ServicePageTemplate
      title="Forensic Renovation Inspection & Contractor Oversight"
      metaTitle="Forensic Renovation Inspection Ontario | ASADS"
      metaDescription="Forensic renovation inspection in Ontario. Verify contractor licences, OBC compliance & build court-ready evidence. Per-visit from $249. (647) 801-9311."
      heroTitle="Forensic Renovation Inspection Ontario — Verify Licences, Enforce Building Codes, Build Court-Ready Evidence"
      heroSubtitle={
        <>
          ASADS forensic renovation inspections place an independent inspector on your side at every critical stage — producing evidence-grade documentation that holds contractors accountable and stands up in court.
          <br />
          Also available:{" "}
          <Link to="/services/designated-substance-survey" className="text-blue-600 underline">
            Designated Substance Survey
          </Link>{" "}
          for pre-1990 properties and{" "}
          <Link to="/services/new-construction" className="text-blue-600 underline">
            New Construction Inspection
          </Link>{" "}
          for builder-managed projects.
        </>
      }
      icon={ShieldCheck}
      price="From $249/Visit"
      duration="1–2 Hours Per Visit"
      description={description}
      whatWeInspect={whatWeInspect}
      features={features}
      benefits={benefits}
      faqs={faqs}
      relatedServices={[
        { title: "New Construction Inspection", href: "/services/new-construction" },
        { title: "Designated Substance Survey", href: "/services/designated-substance-survey" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Commercial Inspection", href: "/services/commercial" },
      ]}
    />
  );
}
