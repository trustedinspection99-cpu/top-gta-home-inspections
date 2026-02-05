import { Link } from "react-router-dom"; // Essential for navigation
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { 
  Home, Search, FileText, Construction, Fan, Building2, Camera, Ruler, 
  ClipboardCheck, Droplets, Microscope, Radiation, Pipette, AlertOctagon, 
  Waves, Flame, Bug, ChevronRight 
} from "lucide-react";

const Index = () => {
  // Navigation mapping to ensure clicks work
  const coreServices = [
    { title: "Pre-Purchase", icon: Search, desc: "200+ point audit for buyers.", href: "/services/pre-purchase" },
    { title: "Pre-Listing", icon: FileText, desc: "Sellers disclosure reports.", href: "/services/pre-listing" },
    { title: "New Construction", icon: Construction, desc: "Tarion warranty & PDI checks.", href: "/services/new-construction" },
    { title: "Condo/Fan-Coil", icon: Fan, desc: "High-rise mechanical specialists.", href: "/services/condo-inspection" },
    { title: "Commercial", icon: Building2, desc: "Building Condition Assessments (BCA).", href: "/services/commercial-inspection" },
    { title: "Thermal Imaging", icon: Camera, desc: "Infrared leak & heat loss detection.", href: "/services/thermal-imaging" },
    { title: "Foundation/Structure", icon: Ruler, desc: "Detailed structural integrity scans.", href: "/services/structural-inspection" },
    { title: "RecallChek", icon: ClipboardCheck, desc: "Appliance safety recall monitoring.", href: "/services/recall-chek" }
  ];

  const environmentalServices = [
    { title: "Well Water Testing", icon: Droplets, desc: "MOH Lab analysis for bacteria/nitrates.", href: "/services/well-water-testing" },
    { title: "Mold & Air Quality", icon: Microscope, desc: "Spore count & DNA air sampling.", href: "/services/mold-inspection" },
    { title: "Radon Gas", icon: Radiation, desc: "48hr digital toxicity monitoring.", href: "/services/radon-testing" },
    { title: "Asbestos Sampling", icon: Pipette, desc: "Verified identification of hazmat.", href: "/services/asbestos-testing" },
    { title: "Lead Paint Testing", icon: AlertOctagon, desc: "XRF & swab testing for older homes.", href: "/services/lead-testing" },
    { title: "Sewer Scope", icon: Search, desc: "Lateral line video inspections.", href: "/services/sewer-scope" },
    { title: "Septic Evaluation", icon: Waves, desc: "Tank integrity & field performance.", href: "/services/septic-inspection" }
  ];

  const safetyServices = [
    { title: "WETT Inspection", icon: Flame, desc: "Wood stove & fireplace insurance certs.", href: "/services/wett-inspection" },
    { title: "Pool & Spa", icon: Waves, desc: "Mechanical & safety barrier audits.", href: "/services/pool-inspection" },
    { title: "Pest/Termite", icon: Bug, desc: "Wood-destroying organism (WDO) checks.", href: "/services/pest-inspection" }
  ];

  return (
    <Layout>
      <Helmet>
        <title>ASADS Home Inspection | Full-Spectrum Property Inspections Toronto</title>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-blue-700 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Every Inspection. One Partner.</h1>
          <p className="text-xl mb-10 max-w-4xl mx-auto">
            MOH Accredited Water Testing, WETT Certifications, and Structural Audits across the GTA.
          </p>
          <Link to="/booking" className="bg-white text-blue-700 px-8 py-4 rounded-md font-bold text-lg inline-block">Book Now</Link>
        </div>
      </section>

      <TrustBadges />

      {/* Updated Service Matrix with Functional Links */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          
          {/* Section: Core Real Estate */}
          <h3 className="text-2xl font-bold mb-8 text-gray-700">Real Estate & Structural</h3>
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {coreServices.map((s) => (
              <Link key={s.title} to={s.href} className="group bg-white p-6 rounded-xl border hover:border-blue-500 transition-all shadow-sm">
                <s.icon className="text-blue-600 mb-3 h-8 w-8 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-gray-900 mb-1">{s.title}</h4>
                <p className="text-xs text-gray-500 mb-4">{s.desc}</p>
                <span className="text-blue-600 text-xs font-bold flex items-center group-hover:underline">
                  View Service <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>

          {/* Section: Environmental */}
          <h3 className="text-2xl font-bold mb-8 text-gray-700">Health & Environmental</h3>
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {environmentalServices.map((s) => (
              <Link key={s.title} to={s.href} className="group bg-white p-6 rounded-xl border hover:border-cyan-500 transition-all shadow-sm">
                <s.icon className="text-cyan-500 mb-3 h-8 w-8 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-gray-900 mb-1">{s.title}</h4>
                <p className="text-xs text-gray-500 mb-4">{s.desc}</p>
                <span className="text-cyan-600 text-xs font-bold flex items-center group-hover:underline">
                  View Service <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>

          {/* Section: Safety */}
          <h3 className="text-2xl font-bold mb-8 text-gray-700">Safety & Compliance</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {safetyServices.map((s) => (
              <Link key={s.title} to={s.href} className="group bg-white p-6 rounded-xl border hover:border-orange-500 transition-all shadow-sm">
                <s.icon className="text-orange-500 mb-3 h-8 w-8 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-gray-900 mb-1">{s.title}</h4>
                <p className="text-xs text-gray-500 mb-4">{s.desc}</p>
                <span className="text-orange-600 text-xs font-bold flex items-center group-hover:underline">
                  View Service <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Index;
