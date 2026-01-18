import { Hammer, ShieldAlert, FileCheck, HardHat, Ruler, Search } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function NewConstruction() {
  const pageTitle = "Tarion Warranty & New Construction Inspection Toronto | ASADS";
  const schemaDescription = "Don't trust the builder alone. Professional PDI, 30-Day, and 1-Year Tarion Warranty inspections for new GTA homes. We catch what the city misses.";

  return (
    <ServicePageTemplate
      title="New Construction & Tarion Warranty"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="New Doesn't Mean Perfect."
      heroSubtitle="From PDI walkthroughs to 1-Year Tarion deadlines, we identify builder shortcuts and structural defects before they become your financial burden."
      icon={Hammer}
      price="Warranty-Grade Protection"
      duration="3 - 5 Hours"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            In the rush to meet closing deadlines, builders often overlook critical details. Our **New Construction Audit** acts as your independent quality control, ensuring your new GTA home meets professional standards—not just the bare minimum code.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
              <ShieldAlert className="text-blue-600 mb-2" size={32} />
              <h4 className="font-bold text-blue-900">Tarion Experts</h4>
              <p className="text-xs text-blue-800">We speak the builder's language, documenting defects to fit Tarion's strict claim requirements.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
              <Search className="text-amber-600 mb-2" size={32} />
              <h4 className="font-bold text-amber-900">Hidden Defects</h4>
              <p className="text-xs text-amber-800">Using Thermal Imaging, we find missing insulation and HVAC leaks that a visual walk-through misses.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <FileCheck className="text-slate-600 mb-2" size={32} />
              <h4 className="font-bold text-slate-900">Priority Punch List</h4>
              <p className="text-xs text-slate-800">Receive a professional report ready to be attached directly to your PDI or Warranty forms.</p>
            </div>
          </div>

          <p>
            Whether it is a detached home in Oakville or a stacked townhouse in Vaughan, our inspectors deep-dive into the attic, mechanical room, and building envelope to protect your 7-year structural warranty.
          </p>
        </div>
      }
      whatWeInspect={[
        "Truss & Framing Integrity (Structural Audit)",
        "Attic Insulation Depth & Vapour Barrier Continuity",
        "Proper HRV/ERV Installation & Air Exchange Balance",
        "Exterior Grading & Sump Pump Discharge Performance",
        "Electrical Panel Labelling & GFCI/AFCI Safety",
        "Roofing Flashing & Ice/Water Shield Verification",
        "Windows, Doors & Weather-Stripping Seals",
        "Basement Foundation Walls (Thermal Moisture Scan)",
      ]}
      features={[
        {
          title: "Thermal Bypass Imaging",
          description: "We use infrared cameras to detect cold spots and missing insulation—the #1 cause of high energy bills and mold in new Ontario homes."
        },
        {
          title: "Tarion Form Preparation",
          description: "Our reports use the specific terminology required by Tarion, making it much harder for builders to deny your warranty claims."
        },
        {
          title: "HVAC & Ductwork Audit",
          description: "We check for unsealed ducts, restricted airflows, and improper furnace venting that can lead to premature system failure."
        },
        {
          title: "Grading & Drainage Analysis",
          description: "Builder grading often settles after the first year. We identify negative slopes early to prevent basement flooding."
        },
      ]}
      benefits={[
        "Independent, non-biased technical evaluation",
        "Ensure builder accountability before the final payment",
        "Comprehensive documentation for Tarion claims",
        "Identify missing insulation and thermal leaks",
        "Verify mechanical systems (HVAC, HRVs) are balanced",
        "Detailed photo evidence of all workmanship issues",
        "Peace of mind during the stressful PDI process",
        "Discounted 1-Year Warranty follow-ups",
      ]}
      faqs={[
        {
          question: "Why do I need an inspection if the City already inspected it?",
          answer: "Municipal inspectors only check for minimum Ontario Building Code (OBC) life-safety compliance. They do not check for quality of workmanship, attic insulation levels, thermal bypasses, or mechanical performance. We do."
        },
        {
          question: "When is the best time for a Tarion inspection?",
          answer: "There are three critical windows: 1. The Pre-Delivery Inspection (PDI) before you move in. 2. The 30-Day Form deadline. 3. The 1-Year Year-End Form. Missing these deadlines can cost you thousands in uncovered repairs."
        },
        {
          question: "What issues do you commonly find in new construction homes?",
          answer: "Common issues include missing attic insulation, unsealed HVAC ducts, improper grading causing water pooling, missing caulking around windows, and incomplete electrical labeling. These are often missed by municipal inspectors."
        },
        {
          question: "How much does a new construction inspection cost in Toronto?",
          answer: "New construction inspection pricing depends on the home size and type. Contact us at (647) 801-9311 for a personalized quote. We also offer discounted 1-Year warranty follow-up inspections."
        },
        {
          question: "Can you help with my Tarion warranty claim?",
          answer: "Yes. Our reports are specifically formatted to meet Tarion's documentation requirements, making it easier to file successful warranty claims and harder for builders to deny responsibility."
        },
      ]}
      relatedServices={[
        { title: "Condo Inspection", href: "/services/condo" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
      ]}
    />
  );
}
