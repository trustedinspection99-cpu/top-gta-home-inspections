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
  ChevronRight, Phone, Instagram, Facebook, Youtube, Twitter, Video,
  Award, Users, FileCheck, Building, ArrowRight, Star,
  DollarSign, Calculator, Download, BookOpen, CheckSquare,
  AlertCircle, Home as HomeIcon, BarChart3, Settings,
  Wind, FlaskConical, Droplet, Eye, Radio, Wrench,
  ThermometerSun, Waves, Factory, WavesIcon, ShieldAlert
} from "lucide-react";

// --- ONTARIO-FOCUSED FAQS ---
const homepageFaqs = [
  {
    question: "How much does a home inspection cost in Ontario?",
    answer: "In Ontario, home inspection costs range from $400-$600 for single-family homes and $350-$450 for condos. Prices vary by property size, age, and location. ASADS offers transparent pricing with no hidden fees. Call (647) 801-9311 for an exact quote tailored to your Ontario property.",
  },
  {
    question: "What's included in a full home inspection in Ontario?",
    answer: "Our Ontario home inspections include 200+ points covering foundation, roof, electrical, plumbing, HVAC, insulation, windows, doors, and safety systems. We follow OAHI standards and include thermal imaging, moisture detection, and comprehensive digital reporting.",
  },
  {
    question: "Which home inspection services include radon testing in Ontario?",
    answer: "Radon testing is available as an add-on service with any inspection. Ontario has varying radon levels, especially in basements. We use certified long-term testing devices and provide Health Canada-compliant reports within 48-96 hours.",
  },
  {
    question: "What are the biggest red flags in Ontario home inspections?",
    answer: "Top red flags in Ontario: foundation cracks from freeze-thaw cycles, knob & tube wiring (insurance issues), aluminum wiring, asbestos in older homes, mold from poor ventilation, and outdated electrical panels. These are common in Ontario's aging housing stock.",
  },
  {
    question: "How do I book a certified home inspector in Toronto?",
    answer: "Book online instantly at asads.ca/booking for Toronto and GTA. Our certified OAHI inspectors are available 7 days a week with same-day booking options for urgent pre-purchase inspections throughout Ontario.",
  },
  {
    question: "Do you offer WETT inspections for wood stoves in Ontario?",
    answer: "Yes, we provide certified WETT inspections across Ontario to ensure wood-burning appliances meet safety standards and insurance requirements. This is essential for rural Ontario properties and homes with fireplaces.",
  },
  {
    question: "What specialty inspections are most common in Ontario?",
    answer: "Most requested Ontario specialty inspections: mold testing (especially in basements), asbestos testing (pre-1990 homes), radon testing, WETT certifications, and well water testing for rural properties.",
  },
];

// --- ONTARIO PRICING ---
const ontarioPricing = [
  { service: "Pre-Purchase Inspection", price: "$450-$650", details: "Single Family Home" },
  { service: "Condo Inspection", price: "$350-$475", details: "Apartment/Condo Unit" },
  { service: "Pre-Listing Inspection", price: "$400-$550", details: "Seller's Package" },
  { service: "New Construction", price: "$500-$700", details: "Phase & Final Inspections" },
  { service: "Commercial Inspection", price: "$600+", details: "Price per square foot" },
  { service: "Radon Testing", price: "$200-$300", details: "Add-on service" },
  { service: "Mold Testing", price: "$250-$400", details: "Air & surface samples" },
  { service: "WETT Inspection", price: "$200-$350", details: "Wood stove/fireplace" },
];

// --- YOUR ONTARIO SERVICES ---
const ontarioServices = [
  { name: "Pre-Purchase", icon: Home, href: "/services/pre-purchase", description: "Complete evaluation before buying" },
  { name: "Pre-Listing", icon: FileText, href: "/services/pre-listing", description: "Seller's inspection package" },
  { name: "Condo", icon: Building, href: "/services/condo", description: "Condo & apartment inspections" },
  { name: "Commercial", icon: Factory, href: "/services/commercial", description: "Commercial property inspections" },
  { name: "New Construction", icon: Construction, href: "/services/new-construction", description: "Phase & final inspections" },
  { name: "Radon Testing", icon: Radio, href: "/services/radon-testing", description: "Long-term radon detection" },
  { name: "Mold Inspection", icon: Droplets, href: "/services/mold-inspection", description: "Air quality & mold testing" },
  { name: "Asbestos Testing", icon: ShieldAlert, href: "/services/asbestos-testing", description: "Material sampling & analysis" },
  { name: "Air Quality", icon: Wind, href: "/services/air-quality", description: "Indoor air quality testing" },
  { name: "Lead Paint Testing", icon: FlaskConical, href: "/services/lead-paint-testing", description: "Lead detection services" },
  { name: "Sewer Scope", icon: Eye, href: "/services/sewer-scope", description: "Camera sewer line inspection" },
  { name: "Thermal Imaging", icon: ThermometerSun, href: "/services/thermal-imaging", description: "Infrared moisture detection" },
  { name: "WETT", icon: Zap, href: "/services/wett", description: "Wood energy technology transfer" },
  { name: "Well Water Testing", icon: WavesIcon, href: "/services/well-water-testing", description: "Water quality analysis" },
];

// --- ONTARIO-SPECIFIC RED FLAGS ---
const ontarioRedFlags = [
  "Foundation Cracks (Freeze-Thaw Damage)",
  "Knob & Tube Wiring (Insurance Decline)",
  "Aluminum Wiring Hazards",
  "Asbestos in Pre-1990 Homes",
  "Basement Moisture & Mold",
  "Roof Ice Dam Damage",
  "Improper Attic Ventilation",
  "Poly-B Plumbing Pipes",
  "Oil Tank Concerns",
  "Wood Stove Safety Issues"
];

// --- ONTARIO CITIES SERVED ---
const ontarioCities = [
  { name: "Toronto", slug: "home-inspection-toronto" },
  { name: "Mississauga", slug: "home-inspection-mississauga" },
  { name: "Brampton", slug: "home-inspection-brampton" },
  { name: "Vaughan", slug: "home-inspection-vaughan" },
  { name: "Markham", slug: "home-inspection-markham" },
  { name: "Oakville", slug: "home-inspection-oakville" },
  { name: "Richmond Hill", slug: "home-inspection-richmond-hill" },
  { name: "Burlington", slug: "home-inspection-burlington" },
  { name: "Pickering", slug: "home-inspection-pickering" },
  { name: "Oshawa", slug: "home-inspection-oshawa" },
  { name: "Hamilton", slug: "home-inspection-hamilton" },
  { name: "Kitchener", slug: "home-inspection-kitchener" },
  { name: "Waterloo", slug: "home-inspection-waterloo" },
  { name: "Guelph", slug: "home-inspection-guelph" },
  { name: "Cambridge", slug: "home-inspection-cambridge" },
  { name: "Barrie", slug: "home-inspection-barrie" },
  { name: "Whitby", slug: "home-inspection-whitby" },
  { name: "Aurora", slug: "home-inspection-aurora" },
  { name: "Newmarket", slug: "home-inspection-newmarket" },
  { name: "Brantford", slug: "home-inspection-brantford" },
];

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
  "@type": "HomeAndConstructionBusiness",
  "name": "ASADS Home Inspection",
  "image": `${SITE_URL}/images/og-default.jpg`,
  "url": SITE_URL,
  "telephone": "+16478019311",
  "priceRange": "$400-$600",
  "description": "Certified home inspector serving Toronto, GTA & Ontario with 14 specialty inspection services including radon, mold, WETT & asbestos testing.",
  "areaServed": {
    "@type": "State",
    "name": "Ontario",
    "addressCountry": "CA"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "501",
    "bestRating": "5"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.instagram.com/asadsinspection",
    "https://www.facebook.com/asadsinspection"
  ]
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Cost Ontario | Certified Home Inspector | ASADS</title>
        <meta name="description" content="Home inspection cost in Ontario: $400–$600. OAHI-certified home inspector serving Toronto & GTA with 14 specialty services. Same-day reports. Call (647) 801-9311." />
        {/* Open Graph */}
        <meta property="og:title" content="Home Inspection Cost Ontario | Certified Home Inspector | ASADS" />
        <meta property="og:description" content="How much does a home inspection cost in Ontario? $400–$600 for a certified OAHI inspection. 14 specialty services including radon, mold, WETT & asbestos. Book online." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ASADS Home Inspection - Ontario Certified Home Inspector Services" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content="Home Inspection Cost Ontario | Certified Inspector | ASADS" />
        <meta name="twitter:description" content="Home inspection cost in Ontario: $400–$600. OAHI-certified inspector serving Toronto & GTA. 14 specialty services. Book online." />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />
        
        {/* Additional Meta Tags */}
        <meta name="keywords" content="home inspection ontario, home inspection toronto, home inspection cost ontario, home inspection checklist, home inspection course ontario, radon testing ontario, mold inspection ontario, wett inspection ontario" />
        
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      {/* 1. ONTARIO-FOCUSED HERO */}
      <section className="relative bg-gradient-to-br from-blue-800 to-blue-900 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-700/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-600">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">OAHI Certified • Serving Ontario Since 2009</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Certified Home Inspector Ontario
            </h1>
            <p className="text-xl mb-10 opacity-95 leading-relaxed">
              Home inspection cost in Ontario starts at <strong className="text-white">$400–$600</strong>. Get a
              <strong className="text-white"> certified home inspection</strong> across Toronto & GTA with
              <strong className="text-white"> 14 specialty services</strong> including radon, mold & WETT. <strong className="text-white">Same-day digital reports.</strong>
            </p>
            
            {/* Quick Ontario Cost Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-white">$400-$600</div>
                  <div className="text-sm opacity-90">Standard Home Inspection</div>
                </div>
                <div className="text-center p-4 border-l border-r border-white/20">
                  <div className="text-3xl font-bold text-white">$350-$475</div>
                  <div className="text-sm opacity-90">Condo Inspection</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-white">14+</div>
                  <div className="text-sm opacity-90">Specialty Services</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/booking" className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                Book Ontario Inspection
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a href="tel:6478019311" className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Phone size={20} />
                Call (647) 801-9311
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ONTARIO STATS */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "2,000+", label: "Ontario Inspections", icon: <FileCheck className="h-8 w-8" /> },
              { value: "15+", label: "Years in Ontario", icon: <Award className="h-8 w-8" /> },
              { value: "98%", label: "Ontario Client Satisfaction", icon: <Star className="h-8 w-8" /> },
              { value: "24hr", label: "Report Delivery in Ontario", icon: <Clock className="h-8 w-8" /> },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="text-blue-600 mb-3">{stat.icon}</div>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* 3. COMPLETE ONTARIO SERVICES */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              14+ Certified Home Inspection Services in Ontario
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive inspection solutions for every Ontario property type and concern
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {ontarioServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <a 
                  key={index} 
                  href={service.href}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 p-6 group hover:border-blue-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-medium">
                        Learn More
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="text-center">
            <a href="/services" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all">
              Explore All Services
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* 4. ONTARIO-SPECIFIC RED FLAGS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-6">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-bold">Ontario Home Buyers Alert</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Top 10 Red Flags in Ontario Home Inspections
              </h2>
              <p className="text-gray-600 mb-8">
                Ontario's climate and aging housing stock present unique challenges. 
                Here are the most common and costly issues we find in properties across the province.
              </p>
              
              <div className="space-y-4">
                {ontarioRedFlags.map((flag, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-red-100 text-red-600 p-1 rounded">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <span className="text-gray-700">{flag}</span>
                  </div>
                ))}
              </div>
              
              <a href="/blog/common-issues-toronto-homes" className="inline-flex items-center gap-2 text-blue-700 font-bold mt-8 hover:text-blue-800">
                Read Ontario Red Flag Guide
                <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ontario Home Inspection Pricing</h3>
              <div className="space-y-4">
                {ontarioPricing.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg border">
                    <div>
                      <div className="font-bold text-gray-900">{item.service}</div>
                      <div className="text-sm text-gray-500">{item.details}</div>
                    </div>
                    <div className="text-xl font-bold text-blue-700">{item.price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-blue-600" />
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Final pricing depends on property size, age, and location. 
                    Contact us for exact quotes for your Ontario property.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPECIALTY SERVICES HIGHLIGHT */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ontario-Specific Specialty Inspections
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Address Ontario's unique property concerns with our certified specialty services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Radio className="h-8 w-8" />,
                title: "Radon Testing",
                description: "Essential for Ontario basements. Long-term testing with Health Canada compliance.",
                link: "/services/radon-testing"
              },
              {
                icon: <Droplets className="h-8 w-8" />,
                title: "Mold Inspection",
                description: "Common in Ontario's humid summers. Air quality and surface testing.",
                link: "/services/mold-inspection"
              },
              {
                icon: <ShieldAlert className="h-8 w-8" />,
                title: "Asbestos Testing",
                description: "Critical for pre-1990 Ontario homes. Material sampling and analysis.",
                link: "/services/asbestos-testing"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "WETT Inspection",
                description: "Required for wood stove insurance in rural Ontario properties.",
                link: "/services/wett"
              },
            ].map((service, index) => (
              <a 
                key={index} 
                href={service.link}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group"
              >
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg w-fit mb-4 group-hover:bg-blue-200 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ONTARIO SERVICE AREAS */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Home Inspector Near Me — Toronto, GTA & Ontario</h2>
            <p className="text-gray-300 text-lg">
              Certified home inspector serving Toronto, the GTA, and communities across Ontario
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
            {ontarioCities.map((city) => (
              <a key={city.slug} href={`/locations/${city.slug}`} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all group">
                <MapPin className="h-5 w-5 text-blue-400 mx-auto mb-2 group-hover:text-blue-300" />
                <span className="font-medium group-hover:text-blue-300 transition-colors">{city.name}</span>
              </a>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Plus all other Ontario cities and towns - call to confirm service in your area
            </p>
            <a href="tel:6478019311" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all">
              <Phone size={20} />
              Check Your Ontario Area
            </a>
          </div>
        </div>
      </section>

      {/* 7. ONTARIO FAQS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ontario Home Inspection FAQs
            </h2>
            <p className="text-gray-600 text-lg">
              Answers to common questions about home inspections in Ontario
            </p>
          </div>
          
          <div className="space-y-4">
            {homepageFaqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="font-bold text-lg text-gray-900">{faq.question}</h3>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="/faq" className="inline-flex items-center gap-2 text-blue-700 font-bold hover:text-blue-800">
              View All Ontario FAQs
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 8. SOCIAL PROOF & TESTIMONIALS */}
      <TestimonialsSection />

      {/* 9. ONTARIO BOOKING CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-bold">Same-Day Booking Available</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">
            Ready for Your Ontario Home Inspection?
          </h2>
          <p className="text-xl opacity-95 mb-10 max-w-2xl mx-auto">
            Book online now for certified home inspections across Ontario. 
            Same-day appointments available for urgent pre-purchase inspections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2">
              Book Ontario Inspection Online
              <ArrowRight size={20} />
            </a>
            <a href="tel:6478019311" className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Phone size={20} />
              Call (647) 801-9311
            </a>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>OAHI Certified Inspectors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>Serving All Ontario</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>14+ Specialty Services</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>Same-Day Digital Reports</span>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Index;
