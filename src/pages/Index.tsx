import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SITE_URL } from "@/lib/seo";
import { 
  CheckCircle2, Shield, Clock, MapPin, Search, 
  Home, Zap, Droplets, Thermometer, Construction, 
  AlertTriangle, BadgeCheck, FileText, BarChart, Info
} from "lucide-react";

// 1. DATA: Cities and Regions for the SEO Grid
const gtaCities = [
  { name: "Toronto", regions: ["Downtown", "North York", "Etobicoke", "Scarborough"] },
  { name: "Peel Region", regions: ["Mississauga", "Brampton", "Caledon"] },
  { name: "York Region", regions: ["Vaughan", "Markham", "Richmond Hill", "Newmarket", "Aurora"] },
  { name: "Halton & Durham", regions: ["Oakville", "Burlington", "Pickering", "Oshawa", "Whitby"] }
];

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Toronto | Certified Same-Day Reports | ASADS GTA</title>
        <meta
          name="description"
          content="The GTA's most comprehensive property inspections. 2000+ point checks for buyers & sellers. Serving Toronto, Mississauga, Brampton & York Region. Same-day digital reports."
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
      </Helmet>

      {/* MODULE 1: HERO (High Impact / Conversion) */}
      <section className="relative bg-blue-800 py-24 text-white overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Comprehensive Home Inspections <br /> in Toronto & The GTA
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto opacity-90 font-light">
            Don’t leave your investment to chance. We provide <strong>licensed home inspection services</strong> 
            with <strong>same-day digital reports</strong> to help you buy or sell with 100% confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/booking/" className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all">
              Book Your Inspection
            </a>
            <a href="#services" className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      {/* MODULE 2: SERVICE PILLARS (Transactional SEO) */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Professional Property Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto italic">Expert assessments for every stage of the real estate transaction.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Service Item 1 */}
            <div className="group p-8 border rounded-3xl hover:border-blue-500 transition-all bg-gray-50 hover:bg-white shadow-sm hover:shadow-xl">
              <div className="bg-blue-100 p-4 rounded-2xl inline-block mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Home size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pre-Purchase Inspection</h3>
              <p className="text-gray-600 mb-6 text-sm">The gold standard for buyers. We perform a deep-dive <strong>structural home inspection</strong> to identify <strong>foundation cracks</strong>, <strong>roof leaks</strong>, and hidden <strong>water damage</strong>.</p>
              <a href="/services/pre-purchase/" className="font-bold text-blue-600 hover:text-blue-800">Learn More →</a>
            </div>

            {/* Service Item 2 */}
            <div className="group p-8 border rounded-3xl hover:border-blue-500 transition-all bg-gray-50 hover:bg-white shadow-sm hover:shadow-xl">
              <div className="bg-blue-100 p-4 rounded-2xl inline-block mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FileText size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pre-Listing Inspection</h3>
              <p className="text-gray-600 mb-6 text-sm">For <strong>home sellers in Toronto</strong> looking to avoid contract failures. Identify issues before the first offer and gain the upper hand in negotiations.</p>
              <a href="/services/pre-listing/" className="font-bold text-blue-600 hover:text-blue-800">Seller edge →</a>
            </div>

            {/* Service Item 3 */}
            <div className="group p-8 border rounded-3xl hover:border-blue-500 transition-all bg-gray-50 hover:bg-white shadow-sm hover:shadow-xl">
              <div className="bg-blue-100 p-4 rounded-2xl inline-block mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Construction size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">New Construction</h3>
              <p className="text-gray-600 mb-6 text-sm">Ensure your builder met the mark. We specialize in <strong>new construction home inspections</strong> and <strong>Tarion warranty</strong> assessments.</p>
              <a href="/services/new-construction/" className="font-bold text-blue-600 hover:text-blue-800">Check your build →</a>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 3: THE "WHY" (Pillar Content - 500+ Words) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Why Professional Inspections Matter in the GTA</h2>
          <div className="prose prose-lg prose-blue max-w-none text-gray-700">
            <p>
              Toronto's real estate market is unique. We deal with everything from century-old Victorian homes in <strong>Old Toronto</strong> 
              to brand new high-rise glass condos in the <strong>Entertainment District</strong>. Each property type comes with its own set of risks. 
              A <strong>certified home inspector</strong> understands these nuances.
            </p>
            <h3>1. The Risk of Older Infrastructure</h3>
            <p>
              In many established GTA neighborhoods, issues like <strong>knob and tube wiring</strong>, <strong>lead paint</strong>, 
              and <strong>clay sewer pipes</strong> are common. Our <strong>detailed electrical and plumbing home inspections</strong> 
              ensure you aren't walking into a money pit.
            </p>
            <h3>2. Modern Construction Defects</h3>
            <p>
              Even new builds have issues. From improper flashing that leads to <strong>attic moisture</strong> to poorly installed 
              HVAC systems, a <strong>licensed home inspector</strong> acts as your last line of defense before your warranty expires.
            </p>
            
          </div>
        </div>
      </section>

      {/* MODULE 4: RISK-FOCUSED SERVICES (Technical SEO) */}
      <section className="py-24 bg-white border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Health & Environmental Testing</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <AlertTriangle className="mx-auto text-red-600 mb-4" size={40} />
              <h4 className="font-bold mb-2">Mold Inspection</h4>
              <p className="text-xs text-gray-500">Professional air quality and moisture mapping to find <strong>water damage</strong> hidden in walls.</p>
            </div>
            <div className="text-center p-6">
              <Search className="mx-auto text-blue-600 mb-4" size={40} />
              <h4 className="font-bold mb-2">Radon Testing</h4>
              <p className="text-xs text-gray-500">Certified <strong>radon inspection</strong> to protect your family from this colorless, odorless carcinogen.</p>
            </div>
            <div className="text-center p-6">
              <BarChart className="mx-auto text-green-600 mb-4" size={40} />
              <h4 className="font-bold mb-2">Energy Audits</h4>
              <p className="text-xs text-gray-500">Thermal imaging to detect heat loss and improve <strong>energy efficiency</strong> in your property.</p>
            </div>
            <div className="text-center p-6">
              <Info className="mx-auto text-orange-600 mb-4" size={40} />
              <h4 className="font-bold mb-2">Sewer Scopes</h4>
              <p className="text-xs text-gray-500">Camera inspections of underground lateral lines to prevent <strong>sewer backup</strong> disasters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 5: THE CITY GRID (Local SEO Matrix) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Service Areas Across the GTA</h2>
          <div className="grid md:grid-cols-4 gap-12 bg-white p-12 rounded-3xl shadow-sm border">
            {gtaCities.map((item, idx) => (
              <div key={idx}>
                <h3 className="font-black text-blue-800 text-lg mb-4 border-b pb-2">{item.name}</h3>
                <ul className="space-y-2">
                  {item.regions.map((city, cIdx) => (
                    <li key={cIdx}>
                      <a href={`/locations/${city.toLowerCase().replace(' ', '-')}/`} className="text-gray-600 hover:text-blue-600 text-sm flex items-center gap-2">
                        <MapPin size={14} className="text-blue-400" />
                        Home Inspection in {city}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-500 text-sm">
            Don't see your town? We serve all smaller municipalities within a 100km radius of Toronto. <strong>Call us for availability.</strong>
          </p>
        </div>
      </section>

      {/* MODULE 6: FAQS (Authority & E-E-A-T) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Toronto Home Inspection FAQs</h2>
          <div className="space-y-10">
            <div>
              <h4 className="font-bold text-xl mb-2">How much is a home inspection in Toronto?</h4>
              <p className="text-gray-600">Standard <strong>home inspection costs</strong> usually fall between $450 and $600 for a single-family home. Condos start around $350. Pricing varies based on the size of the home and additional tests like mold or radon.</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2">What is included in a 200+ point inspection?</h4>
              <p className="text-gray-600">Our <strong>home inspection checklist</strong> covers everything from the <strong>roof condition</strong> and <strong>structural integrity</strong> to the <strong>electrical panel</strong>, <strong>HVAC efficiency</strong>, and <strong>plumbing water pressure</strong>.</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2">Do you offer same-day home inspection reports?</h4>
              <p className="text-gray-600">Yes. We understand that real estate moves fast. We deliver a comprehensive, digital <strong>same-day home inspection report</strong> with high-resolution photos and video findings.</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <CTASection
        title="Ready to Secure Your Investment?"
        description="Whether you are a first-time buyer or a seasoned seller, ASADS provides the most trusted home inspection services in the GTA."
        buttonText="Book Your Inspection Now"
        buttonUrl="/booking/"
      />
    </Layout>
  );
};

export default Index;
