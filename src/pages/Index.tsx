import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SITE_URL } from "@/lib/seo";
import { CheckCircle2, Shield, Clock, MapPin } from "lucide-react";

// Homepage FAQ schema
const homepageFaqs = [
  {
    question: "How much does a home inspection cost in Toronto?",
    answer:
      "Home inspection costs in Toronto typically range from $400-$600 for a standard single-family home, depending on size and age. Condos usually cost $350-$450. Contact ASADS at (647) 801-9311 for a personalized quote.",
  },
  {
    question: "Who pays for a home inspection in Ontario?",
    answer:
      "In Ontario, the home buyer typically pays for the home inspection. Sellers may also pay for pre-listing inspections to identify issues before listing.",
  },
  {
    question: "What does a home inspection include in Ontario?",
    answer:
      "Covers structural components, roofing, electrical, plumbing, HVAC, insulation, windows, doors, and foundation. ASADS performs 200+ point inspections with same-day reports.",
  },
  {
    question: "Biggest red flags in a home inspection?",
    answer:
      "Foundation cracks, water damage/mold, faulty electrical, roof damage, structural issues.",
  },
  {
    question: "How long does a home inspection take?",
    answer: "Typically 2 to 3 hours depending on property size and age.",
  },
  {
    question: "How to schedule an inspection?",
    answer: "Book online at asads.ca/booking/ or call (647) 801-9311.",
  },
];

// Services structured data
const servicesSchema = [
  {
    name: "Pre-Purchase Inspection",
    description: "Complete evaluation before you buy. Identify issues and negotiate with confidence.",
    url: `${SITE_URL}/services/pre-purchase/`,
  },
  {
    name: "Pre-Listing Inspection",
    description: "Sell your home faster with a pre-listing inspection that builds buyer trust.",
    url: `${SITE_URL}/services/pre-listing/`,
  },
  {
    name: "New Construction",
    description: "Verify builder quality and catch defects before your final walkthrough.",
    url: `${SITE_URL}/services/new-construction/`,
  },
  {
    name: "Condo Inspection",
    description: "Specialized inspections for condos, townhomes, and stacked units.",
    url: `${SITE_URL}/services/condo/`,
  },
  {
    name: "Commercial Inspection",
    description: "Comprehensive assessments for commercial and investment properties.",
    url: `${SITE_URL}/services/commercial/`,
  },
  {
    name: "Specialty Services",
    description: "Radon Testing, Mold Inspection, Thermal Imaging, WETT Inspection, and more.",
    url: `${SITE_URL}/services/`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: servicesSchema.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.name,
    description: service.description,
    url: service.url,
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
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7,
    longitude: -79.42,
  },
  areaServed: ["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", "Oakville", "Richmond Hill"],
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
        <meta
          name="description"
          content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections, 15+ years experience. Specialized in Pre-purchase, Mold & WETT. Call (647) 801-9311."
        />
        <link rel="canonical" href={`${SITE_URL}/`} />

        {/* Social Meta */}
        <meta property="og:title" content="Home Inspection Toronto & GTA | ASADS" />
        <meta property="og:description" content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections. Call (647) 801-9311." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(servicesJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-blue-700 py-24 text-white overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Trusted Home Inspections <br /> in Toronto & The GTA
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Get a 200+ point inspection with a digital same-day report. Protect your family and your investment with certified expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/booking/" className="bg-white text-blue-700 px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-all">
              Book Your Inspection
            </a>
            <a href="tel:6478019311" className="bg-transparent border-2 border-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-all">
              Call (647) 801-9311
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-blue-600">2,000+</p>
              <p className="text-gray-600 font-medium">Inspections Done</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-blue-600">15+</p>
              <p className="text-gray-600 font-medium">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-blue-600">98%</p>
              <p className="text-gray-600 font-medium">5-Star Reviews</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-blue-600">24hr</p>
              <p className="text-gray-600 font-medium">Report Delivery</p>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Why Toronto Homeowners Trust ASADS</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Certified & Insured</h3>
              <p className="text-gray-600">InterNACHI certified inspectors carrying full errors and omissions insurance for your protection.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Same-Day Reports</h3>
              <p className="text-gray-600">Our digital reports are delivered within 24 hours, featuring high-res photos and repair priorities.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
              <CheckCircle2 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Advanced Tech</h3>
              <p className="text-gray-600">We use thermal imaging and moisture meters to find hidden issues that others might miss.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Professional Inspection Services</h2>
              <p className="text-gray-600 mt-2">Comprehensive solutions for every property type in the GTA.</p>
            </div>
            <a href="/services/" className="text-blue-600 font-bold hover:underline mt-4 md:mt-0">View All Services →</a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesSchema.map((service) => (
              <a
                key={service.name}
                href={service.url}
                className="group p-8 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-xl transition-all bg-white"
              >
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">{service.name}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Service Areas - SEO Boost */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <MapPin className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-6">Proudly Serving the Greater Toronto Area</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-10 text-lg">
            We provide residential and commercial inspections in <strong>Toronto, Mississauga, Brampton, Vaughan, Markham, Oakville, Burlington, Pickering, Oshawa, and beyond.</strong>
          </p>
          <a href="/locations/" className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md font-bold hover:bg-blue-600 hover:text-white transition-all">
            Find Your City
          </a>
        </div>
      </section>

      <CTASection />

      {/* Structured FAQ for Visual Display */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {homepageFaqs.map((faq, idx) => (
              <div key={idx} className="border-b pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden">
        {localBusinessSchema.sameAs.map((link) => (
          <a key={link} href={link} rel="me">{link}</a>
        ))}
      </section>
    </Layout>
  );
};

export default Index;
