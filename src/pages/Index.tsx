import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SITE_URL } from "@/lib/seo";
import { 
  CheckCircle2, Shield, Clock, MapPin, Search, 
  Home, Zap, Droplets, Thermometer, Construction, 
  AlertTriangle, BadgeCheck, FileText, BarChart, Info,
  ChevronRight, Phone, Instagram, Facebook, Youtube, Twitter, Video
} from "lucide-react";

// --- ORIGINAL DATA & SCHEMAS PRESERVED ---
const homepageFaqs = [
  {
    question: "How much does a home inspection cost in Toronto?",
    answer: "Home inspection costs in Toronto typically range from $400-$600 for a standard single-family home. Condos usually cost $350-$450. Specialized inspections like asbestos, mold, or radon may have separate fees. Contact ASADS at (647) 801-9311 for a personalized quote.",
  },
  {
    question: "Who pays for a home inspection in Ontario?",
    answer: "In Ontario, the home buyer usually pays for a home inspection. Sellers may also arrange pre-listing inspections to identify issues before listing. Commercial and specialty inspections can be requested by property owners, managers, or investors.",
  },
  {
    question: "What does a home inspection include?",
    answer: "ASADS inspections cover structural components, roofing, electrical, plumbing, HVAC, insulation, windows, doors, and foundation. Specialty services include radon, mold, asbestos, WETT, and lead paint inspections.",
  },
  {
    question: "How long does a home inspection take?",
    answer: "Standard inspections typically take 2-3 hours for single-family homes, while condos and commercial properties vary based on size. Specialty inspections like asbestos or radon testing may add additional lab processing time.",
  },
  {
    question: "How to schedule an inspection?",
    answer: "Book online at asads.ca/booking/ or call (647) 801-9311. Same-day bookings are available for pre-purchase and pre-listing inspections.",
  },
];

// --- BREADCRUMB COMPONENT ---
const Breadcrumbs = ({ items }: { items: { label: string; href?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
    <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
    {items.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        <ChevronRight size={14} className="text-gray-400" />
        {item.href ? (
          <a href={item.href} className="hover:text-blue-600 transition-colors">{item.label}</a>
        ) : (
          <span className="font-medium text-blue-800">{item.label}</span>
        )}
      </div>
    ))}
  </nav>
);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": SITE_URL
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeInspector"],
  name: "ASADS Home Inspection",
  image: `${SITE_URL}/og-image.jpg`,
  url: `${SITE_URL}/`,
  telephone: "(647) 801-9311",
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
  geo: { "@type": "GeoCoordinates", latitude: 43.7, longitude: -79.42 },
  areaServed: ["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", "Oakville", "Burlington", "Pickering", "Oshawa"],
  sameAs: [
    "https://youtube.com/@asadshomeinspection",
    "https://www.instagram.com/asads_home_inspection",
    "https://x.com/AsadsInspection",
    "https://www.facebook.com/share/1ZhWQk97YY/",
    "https://www.tiktok.com/@asads_home_inspection",
  ],
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Toronto & GTA | Certified Same-Day Reports | ASADS</title>
        <meta name="description" content="Certified home inspections in Toronto & GTA. Pre-Purchase, Pre-Listing, Condo, and Commercial inspections with same-day digital reports. Call (647) 801-9311." />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb Row */}
      <div className="bg-gray-50 border-b">
        <Breadcrumbs items={[]} />
      </div>

      {/* 1. HERO */}
      <section className="relative bg-blue-700 py-24 text-white overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Trusted Home Inspections <br /> in Toronto & The GTA
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95">
            Get a <strong>200+ point inspection</strong> with a digital <strong>same-day report</strong>. 
            Protect your family and your investment with certified expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/booking/" className="bg-white text-blue-700 px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">Book Your Inspection</a>
            <a href="tel:6478019311" className="bg-transparent border-2 border-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-all">Call (647) 801-9311</a>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div><p className="text-4xl font-extrabold text-blue-600">2,000+</p><p className="text-gray-600 font-medium italic">Inspections Done</p></div>
                <div><p className="text-4xl font-extrabold text-blue-600">15+</p><p className="text-gray-600 font-medium italic">Years Experience</p></div>
                <div><p className="text-4xl font-extrabold text-blue-600">98%</p><p className="text-gray-600 font-medium italic">5-Star Reviews</p></div>
                <div><p className="text-4xl font-extrabold text-blue-600">24hr</p><p className="text-gray-600 font-medium italic">Report Delivery</p></div>
            </div>
        </div>
      </section>

      <TrustBadges />

      {/* 3. CORE SERVICES */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Professional Inspection Services</h2>
              <p className="text-gray-600">Comprehensive solutions for every property type in the GTA.</p>
            </div>
            <a href="/services/" className="text-blue-600 font-bold hover:underline mt-4 md:mt-0">View All Services →</a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-all">
              <Home className="text-blue-600 mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold mb-3">Pre-Purchase Inspection</h3>
              <p className="text-gray-600 text-sm mb-6">Complete evaluation before you buy. Identify <strong>foundation cracks</strong> and <strong>roof leaks</strong> to negotiate with confidence.</p>
              <a href="/services/pre-purchase/" className="text-blue-700 font-bold flex items-center gap-1">Details <ChevronRight size={16} /></a>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-all">
              <FileText className="text-blue-600 mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold mb-3">Pre-Listing Inspection</h3>
              <p className="text-gray-600 text-sm mb-6">Sell your home faster. Our <strong>pre-listing inspection</strong> identifies issues early to build buyer trust and avoid renegotiation.</p>
              <a href="/services/pre-listing/" className="text-blue-700 font-bold flex items-center gap-1">Seller Guide <ChevronRight size={16} /></a>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-all">
              <Construction className="text-blue-600 mb-4 h-10 w-10" />
              <h3 className="text-xl font-bold mb-3">New Construction</h3>
              <p className="text-gray-600 text-sm mb-6">Verify builder quality and catch <strong>structural defects</strong> before your final walkthrough or Tarion warranty expiry.</p>
              <a href="/services/new-construction/" className="text-blue-700 font-bold flex items-center gap-1">Warranty Check <ChevronRight size={16} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LONG-FORM PILLAR CONTENT (SEO Expansion) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 text-center">The Definitive Toronto Home Inspection Resource</h2>
          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-6">
                Choosing a <strong>certified home inspector in Toronto</strong> is the single most important step in protecting your financial future. 
                Whether you’re investing in a <strong>commercial inspection</strong> or a residential <strong>condo inspection</strong>, 
                our team provides the technical depth required by the modern GTA market.
            </p>
            
            <h3 className="text-2xl font-bold text-blue-800 mt-12 mb-4">Foundation Cracks & Structural Integrity</h3>
            <p>
                In Ontario, soil shifting due to the freeze-thaw cycle is common. We analyze <strong>foundation cracks</strong> to determine 
                if they are cosmetic or structural. A deep-dive <strong>structural home inspection</strong> can reveal issues with 
                load-bearing walls, joists, and beams that may not be apparent to the untrained eye.
            </p>

            <h3 className="text-2xl font-bold text-blue-800 mt-12 mb-4">Mechanical Systems: Electrical, Plumbing & HVAC</h3>
            <p>
                Older Toronto homes often contain <strong>knob and tube wiring</strong> or cast iron pipes. Our <strong>electrical inspection</strong> 
                ensures your panel is safe and compliant with modern insurance standards. We also test <strong>plumbing water pressure</strong> 
                and perform a thorough <strong>HVAC efficiency evaluation</strong> to ensure your system is prepared for peak seasons.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SOCIAL CONNECT */}
      <section className="py-16 bg-blue-50 border-y">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Follow Our Inspection Journeys</h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">Stay updated with tips on home maintenance and common inspection red flags.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://youtube.com/@asadshomeinspection" target="_blank" className="flex flex-col items-center gap-2 group">
              <div className="bg-white p-4 rounded-full shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all"><Youtube size={28} /></div>
              <span className="text-xs font-bold text-gray-500 group-hover:text-red-600">YouTube</span>
            </a>
            <a href="https://www.instagram.com/asads_home_inspection" target="_blank" className="flex flex-col items-center gap-2 group">
              <div className="bg-white p-4 rounded-full shadow-sm group-hover:bg-pink-600 group-hover:text-white transition-all"><Instagram size={28} /></div>
              <span className="text-xs font-bold text-gray-500 group-hover:text-pink-600">Instagram</span>
            </a>
            <a href="https://www.facebook.com/share/1ZhWQk97YY/" target="_blank" className="flex flex-col items-center gap-2 group">
              <div className="bg-white p-4 rounded-full shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all"><Facebook size={28} /></div>
              <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600">Facebook</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. SERVICE AREAS */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Service Areas Across the GTA</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", "Oakville", "Richmond Hill", "Burlington", "Pickering", "Oshawa", "Etobicoke", "North York", "Scarborough", "Milton", "Whitby"].map((city) => (
              <a key={city} href={`/locations/${city.toLowerCase().replace(' ', '-')}/`} className="flex items-center gap-2 p-3 rounded-lg hover:bg-white/10 border border-white/10 text-sm justify-center transition-all">
                <MapPin size={14} className="text-blue-400" /> {city}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="py-24 bg-gray-50 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {homepageFaqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-300 transition-all">
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <CTASection
        title="Schedule Your Inspection Today"
        description="Book online in minutes or call our certified team to secure your home inspection date."
        buttonText="Book Online Now"
        buttonUrl="/booking/"
      />
    </Layout>
  );
};

export default Index;
