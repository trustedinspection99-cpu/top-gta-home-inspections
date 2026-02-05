import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SITE_URL } from "@/lib/seo";
import { 
  Home, Zap, Droplets, Thermometer, Construction, 
  FileText, ChevronRight, Flame, Microscope, 
  Radiation, Waves, Pipette, Search, ShieldCheck, 
  Target, Building2, Ruler, Bug, HardHat, Camera,
  Fan, ClipboardCheck, AlertOctagon
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>ASADS Home Inspection | Full-Spectrum Property Inspections Toronto</title>
        <meta name="description" content="Certified Home, WETT, Septic, Mold, Radon, and Well Water inspections. Full-spectrum property diagnostics across Toronto & GTA. Same-day reports." />
      </Helmet>

      {/* 1. HERO - ALL-IN-ONE POSITIONING */}
      <section className="relative bg-blue-700 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Every Inspection. <br /> One Trusted Partner.
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto opacity-95">
            From <strong>Pre-Purchase Audits</strong> and <strong>WETT Certifications</strong> to <strong>MOH Accredited Water Testing</strong>. 
            We provide the most comprehensive suite of property diagnostics in the GTA.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/booking" className="bg-white text-blue-700 px-8 py-4 rounded-md font-bold text-lg hover:shadow-lg transition-all">Book Full Suite</a>
            <a href="tel:6478019311" className="bg-transparent border-2 border-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-all">(647) 801-9311</a>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* 2. THE SERVICE MATRIX - ALL SERVICES COVERED */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900">Our Full Inspection Portfolio</h2>
          
          {/* CATEGORY: CORE REAL ESTATE */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-blue-600"></div>
              <h3 className="text-2xl font-bold uppercase tracking-wider text-gray-700">Real Estate & Structural</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Pre-Purchase", icon: Search, desc: "200+ point audit for buyers." },
                { title: "Pre-Listing", icon: FileText, desc: "Sellers disclosure reports." },
                { title: "New Construction", icon: Construction, desc: "Tarion warranty & PDI checks." },
                { title: "Condo/Fan-Coil", icon: Fan, desc: "High-rise mechanical specialists." },
                { title: "Commercial", icon: Building2, desc: "Building Condition Assessments (BCA)." },
                { title: "Thermal Imaging", icon: Camera, desc: "Infrared leak & heat loss detection." },
                { title: "Foundation/Structure", icon: Ruler, desc: "Detailed structural integrity scans." },
                { title: "RecallChek", icon: ClipboardCheck, desc: "Appliance safety recall monitoring." }
              ].map((s) => (
                <div key={s.title} className="bg-white p-6 rounded-xl border hover:border-blue-500 transition-all shadow-sm">
                  <s.icon className="text-blue-600 mb-3 h-8 w-8" />
                  <h4 className="font-bold text-gray-900 mb-1">{s.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORY: ENVIRONMENTAL & HEALTH */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-cyan-500"></div>
              <h3 className="text-2xl font-bold uppercase tracking-wider text-gray-700">Health & Environmental</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Well Water Testing", icon: Droplets, desc: "MOH Lab analysis for bacteria/nitrates." },
                { title: "Mold & Air Quality", icon: Microscope, desc: "Spore count & DNA air sampling." },
                { title: "Radon Gas", icon: Radiation, desc: "48hr digital toxicity monitoring." },
                { title: "Asbestos Sampling", icon: Pipette, desc: "Verified identification of hazmat." },
                { title: "Lead Paint Testing", icon: AlertOctagon, desc: "XRF & swab testing for older homes." },
                { title: "Air Allergen Prep", icon: Zap, desc: "VOC & particle concentration tests." },
                { title: "Sewer Scope", icon: Search, desc: "Lateral line video inspections." },
                { title: "Septic Evaluation", icon: Waves, desc: "Tank integrity & field performance." }
              ].map((s) => (
                <div key={s.title} className="bg-white p-6 rounded-xl border hover:border-cyan-500 transition-all shadow-sm">
                  <s.icon className="text-cyan-500 mb-3 h-8 w-8" />
                  <h4 className="font-bold text-gray-900 mb-1">{s.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORY: SPECIALIZED COMPLIANCE */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-orange-500"></div>
              <h3 className="text-2xl font-bold uppercase tracking-wider text-gray-700">Safety & Compliance</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "WETT Inspection", icon: Flame, desc: "Wood stove & fireplace insurance certs." },
                { title: "Pool & Spa", icon: Waves, desc: "Mechanical & safety barrier audits." },
                { title: "Pest/Termite", icon: Bug, desc: "Wood-destroying organism (WDO) checks." }
              ].map((s) => (
                <div key={s.title} className="bg-white p-6 rounded-xl border hover:border-orange-500 transition-all shadow-sm">
                  <s.icon className="text-orange-500 mb-3 h-8 w-8" />
                  <h4 className="font-bold text-gray-900 mb-1">{s.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTEGRATED PILLAR CONTENT */}
      <section className="py-24 bg-white border-t">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Unifying Urban Precision & Rural Safety</h2>
          
          <div className="prose prose-blue max-w-none text-gray-700">
            <p className="text-xl leading-relaxed">
              At ASADS, we don’t just "look" at homes; we diagnose properties using the full weight of Ontario’s health and safety standards. 
              Our inspections bridge the gap between <strong>Toronto’s high-density condo market</strong> and the <strong>complex environmental needs of GTA’s rural estates</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div>
                <h4 className="text-blue-800 font-bold text-xl mb-4">The Urban Core: Condos & Commercial</h4>
                <p className="text-sm">We specialize in Fan-Coil units, commercial roofing systems, and thermal imaging of building envelopes to ensure your investment is efficient and defect-free.</p>
              </div>
              <div>
                <h4 className="text-cyan-700 font-bold text-xl mb-4">The Rural Frontier: Septic & Well</h4>
                <p className="text-sm">We provide the "Triple Threat" rural inspection: Structural, Septic, and MOH-Accredited Well Water analysis. One visit, three certifications, zero closing delays.</p>
              </div>
            </div>
            
            

            <h3 className="text-2xl font-bold mt-16 mb-6">Why Bundle Your Services?</h3>
            <p>
              Financing and Insurance in Ontario are becoming more interconnected. A lender may require a <strong>Certificate of Potability</strong> for a well, 
              while your insurer demands a <strong>WETT certificate</strong> for the fireplace. By booking with ASADS, you consolidate your liability 
              and receive a unified report that satisfies all stakeholders simultaneously.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS GRID PRESERVED */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Service Areas Across the GTA</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", "Oakville", "Richmond Hill", "Burlington", "Pickering", "Oshawa", "Caledon", "King City", "Halton Hills", "Milton", "Whitby"].map((city) => (
              <a key={city} href={`/locations/${city.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-2 p-3 rounded-lg hover:bg-white/10 border border-white/10 text-sm justify-center transition-all">
                {city}
              </a>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
