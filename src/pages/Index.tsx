import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { 
  Search, FileText, Construction, Building2, Camera, 
  Droplets, Microscope, Radiation, Pipette, AlertOctagon, 
  Flame, ChevronRight 
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>ASADS Home Inspection | Professional Property Inspections Toronto</title>
        <meta name="description" content="Expert Home, WETT, Mold, Radon, and Well Water inspections across Toronto & GTA." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-blue-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Expert Inspections. Precision Results.</h1>
          <div className="flex justify-center gap-4">
            <Link to="/booking" className="bg-white text-blue-700 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-all">Book Now</Link>
            <a href="tel:6478019311" className="border-2 border-white px-8 py-3 rounded-md font-bold hover:bg-white/10 transition-all">Call Us</a>
          </div>
        </div>
      </section>

      <TrustBadges />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          
          {/* 1. Real Estate & Structural */}
          <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-blue-600 pl-4">Real Estate & Structural</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <ServiceCard title="Pre-Purchase" href="/services/pre-purchase" icon={<Search />} desc="200+ point audit for buyers." color="blue" />
            <ServiceCard title="Pre-Listing" href="/services/pre-listing" icon={<FileText />} desc="Sellers disclosure reports." color="blue" />
            <ServiceCard title="New Construction" href="/services/new-construction" icon={<Construction />} desc="Tarion warranty & PDI checks." color="blue" />
            {/* FIXED LINK FOR COMMERCIAL */}
            <ServiceCard title="Commercial" href="/services/commercial-inspection" icon={<Building2 />} desc="Building Condition Assessments (BCA)." color="blue" />
            <ServiceCard title="Thermal Imaging" href="/services/thermal-imaging" icon={<Camera />} desc="Infrared leak & heat loss detection." color="blue" />
          </div>

          {/* 2. Health & Environmental */}
          <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-cyan-500 pl-4">Health & Environmental</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <ServiceCard title="Well Water Testing" href="/services/well-water-testing" icon={<Droplets />} desc="MOH Lab analysis for bacteria/nitrates." color="cyan" />
            <ServiceCard title="Mold & Air Quality" href="/services/mold-inspection" icon={<Microscope />} desc="Spore count & DNA air sampling." color="cyan" />
            <ServiceCard title="Radon Gas" href="/services/radon-testing" icon={<Radiation />} desc="48hr digital toxicity monitoring." color="cyan" />
            <ServiceCard title="Asbestos Sampling" href="/services/asbestos-testing" icon={<AsbestosIcon />} desc="Verified identification of hazmat." color="cyan" />
            {/* FIXED LINK FOR LEAD PAINT */}
            <ServiceCard title="Lead Paint Testing" href="/services/lead-testing" icon={<AlertOctagon />} desc="XRF & swab testing for older homes." color="cyan" />
            {/* FIXED LINK FOR SEWER SCOPE */}
            <ServiceCard title="Sewer Scope" href="/services/sewer-scope" icon={<Search />} desc="Lateral line video inspections." color="cyan" />
          </div>

          {/* 3. Safety & Compliance */}
          <h2 className="text-2xl font-bold mb-8 text-gray-800 border-l-4 border-orange-500 pl-4">Safety & Compliance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* FIXED LINK FOR WETT */}
            <ServiceCard title="WETT Inspection" href="/services/wett-inspection" icon={<Flame />} desc="Wood stove & fireplace insurance certs." color="orange" />
          </div>

        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

// Helper component to ensure Link is always wrapping the entire card correctly
const ServiceCard = ({ title, href, icon, desc, color }: any) => {
  const colorMap: any = {
    blue: "text-blue-600 border-blue-600 hover:border-blue-500",
    cyan: "text-cyan-500 border-cyan-500 hover:border-cyan-500",
    orange: "text-orange-500 border-orange-500 hover:border-orange-500"
  };

  return (
    <Link to={href} className="group bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all block">
      <div className={`${colorMap[color]} mb-4 h-10 w-10 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{desc}</p>
      <div className={`${colorMap[color].split(' ')[0]} font-bold text-sm flex items-center group-hover:underline`}>
        View Service <ChevronRight size={14} className="ml-1" />
      </div>
    </Link>
  );
};

const AsbestosIcon = () => <Pipette />;

export default Index;
