import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SITE_URL } from "@/lib/seo";
import { CheckCircle2, Shield, Clock, MapPin } from "lucide-react";

// Expanded homepage FAQ schema including all services
const homepageFaqs = [
  {
    question: "How much does a home inspection cost in Toronto?",
    answer:
      "Home inspection costs in Toronto typically range from $400-$600 for a standard single-family home. Condos usually cost $350-$450. Specialized inspections like asbestos, mold, or radon may have separate fees. Contact ASADS at (647) 801-9311 for a personalized quote.",
  },
  {
    question: "Who pays for a home inspection in Ontario?",
    answer:
      "In Ontario, the home buyer usually pays for a home inspection. Sellers may also arrange pre-listing inspections to identify issues before listing. Commercial and specialty inspections can be requested by property owners, managers, or investors.",
  },
  {
    question: "What does a home inspection include?",
    answer:
      "ASADS inspections cover structural components, roofing, electrical, plumbing, HVAC, insulation, windows, doors, and foundation. Specialty services include radon, mold, asbestos, WETT, and lead paint inspections.",
  },
  {
    question: "How long does a home inspection take?",
    answer: "Standard inspections typically take 2-3 hours for single-family homes, while condos and commercial properties vary based on size. Specialty inspections like asbestos or radon testing may add additional lab processing time.",
  },
  {
    question: "How to schedule an inspection?",
    answer: "Book online at asads.ca/booking/ or call (647) 801-9311. Same-day bookings are available for pre-purchase and pre-listing inspections.",
  },
  {
    question: "What is included in a pre-listing inspection?",
    answer: "A pre-listing inspection identifies potential issues for sellers, including structural, mechanical, and safety concerns. Sellers get a detailed report to improve negotiations and avoid surprises during buyer inspections.",
  },
  {
    question: "Do you perform commercial and new construction inspections?",
    answer: "Yes. We inspect commercial properties, office buildings, multi-unit complexes, and new constructions to ensure code compliance, safety, and quality standards.",
  },
];

// Services structured data
const servicesSchema = [
  {
    name: "Pre-Purchase Inspection",
    description: "Full evaluation before buying. Detect hidden issues, foundation cracks, roof leaks, electrical or plumbing concerns. Protect your investment with a certified, same-day report.",
    url: `${SITE_URL}/services/pre-purchase/`,
  },
  {
    name: "Pre-Listing Inspection",
    description: "Seller-focused inspection identifying issues before listing. Helps avoid contract renegotiations, speed up sales, and improve buyer confidence.",
    url: `${SITE_URL}/services/pre-listing/`,
  },
  {
    name: "New Construction Inspection",
    description: "Inspect newly built or under-construction homes. Check for builder defects, code compliance, warranty issues, and structural integrity before closing.",
    url: `${SITE_URL}/services/new-construction/`,
  },
  {
    name: "Condo & Townhouse Inspection",
    description: "Specialized inspections for condos, townhomes, and stacked units. Includes common areas, mechanical systems, fire safety, and HOA considerations.",
    url: `${SITE_URL}/services/condo/`,
  },
  {
    name: "Commercial Inspection",
    description: "Comprehensive assessments for commercial and investment properties. Includes structural, electrical, plumbing, HVAC, occupancy permits, and code compliance.",
    url: `${SITE_URL}/services/commercial/`,
  },
  {
    name: "Specialty Services",
    description: "Radon testing, mold inspection, thermal imaging, WETT inspections, asbestos testing, termite inspection, and lead paint inspections. Address specific risks with expert guidance.",
    url: `${SITE_URL}/services/`,
  },
];

// JSON-LD for FAQ
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// JSON-LD for services
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

// Local business schema
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
  areaServed: [
    "Toronto",
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Oakville",
    "Richmond Hill",
    "Burlington",
    "Pickering",
    "Oshawa",
  ],
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
          content="Certified home inspections in Toronto & GTA. Pre-Purchase, Pre-Listing, Condo, Commercial, New Construction, and Specialty inspections. Call (647) 801-9311."
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:title" content="Home Inspection Toronto & GTA | ASADS" />
        <meta property="og:description" content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections. Call (647) 801-9311." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />

        {/* JSON-LD */}
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
            200+ point inspections with same-day digital reports. Protect your family and investment with certified expertise across Pre-Purchase, Pre-Listing, Condo, Commercial, and Specialty inspections.
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
              <p className="text-gray-600">We use thermal imaging, moisture meters, and lab-accredited tests to find hidden issues others might miss.</p>
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

          {/* Expanded Detailed Services */}
          <div className="space-y-16">
            {/* Pre-Purchase */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Pre-Purchase Home Inspection</h3>
              <p className="text-gray-700 mb-4">
                Protect your investment before buying. Our pre-purchase inspections cover <strong>structural integrity, roofing, electrical panels, plumbing systems, HVAC efficiency, foundation cracks, mold, asbestos, radon, and more</strong>. 
                Get same-day detailed reports, negotiation insights, and full documentation for lenders or insurance.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>200+ point inspection checklist tailored to your property type</li>
                <li>Certified home inspector near me with experience in older homes</li>
                <li>Detailed report with photos, recommendations, and repair priorities</li>
                <li>High-intent buyer support: inspection contingency, repair negotiation, risk mitigation</li>
              </ul>
            </div>

            {/* Pre-Listing */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Pre-Listing Home Inspection</h3>
              <p className="text-gray-700 mb-4">
                Sellers gain peace of mind and improve marketability. Our pre-listing inspections identify potential issues early, avoid renegotiation, and speed up sales. 
                Reports cover <strong>structural, mechanical, safety, roof, foundation, electrical, plumbing, and HVAC systems</strong>.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>High-intent phrases: "pre-listing inspection near me", "certified pre-listing inspector [city]"</li>
                <li>Checklists for older homes, condos, townhouses, and multi-family units</li>
                <li>Report ready before first buyer offer to avoid surprises</li>
                <li>Expert advice for repairs, safety compliance, and negotiation leverage</li>
              </ul>
            </div>

            {/* New Construction */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">New Construction Inspection</h3>
              <p className="text-gray-700 mb-4">
                Ensure your newly built home meets quality and safety standards. We inspect <strong>builder workmanship, code compliance, structural integrity, and finishing details</strong>. 
                Avoid post-closing defects and secure warranty coverage.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Check framing, roofing, plumbing, electrical, and HVAC installation</li>
                <li>Verify builder warranties and contract compliance</li>
                <li>Detailed photo reports for your records and lender requirements</li>
                <li>Identify hidden defects before final walkthrough and closing</li>
              </ul>
            </div>

            {/* Condo & Townhouse */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Condo & Townhouse Inspections</h3>
              <p className="text-gray-700 mb-4">
                Specialized inspections for <strong>condos, townhomes, and stacked units</strong>. Includes <strong>mechanical systems, shared utilities, fire safety, structural integrity, and HOA considerations</strong>.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Assess common areas, elevators, and building maintenance</li>
                <li>Evaluate plumbing, HVAC, and electrical for unit and shared systems</li>
                <li>Support for buyers, sellers, and property managers</li>
                <li>Comprehensive digital report with repair recommendations</li>
              </ul>
            </div>

            {/* Commercial Inspection */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Commercial Inspections</h3>
              <p className="text-gray-700 mb-4">
                Protect your commercial investments with detailed inspections. Covers <strong>structural, electrical, plumbing, HVAC, roofing, safety compliance, occupancy permits, and more</strong>.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Office, retail, industrial, and multi-tenant inspections</li>
                <li>Code compliance and risk assessments for liability reduction</li>
                <li>Detailed reports for leasing, insurance, or sale transactions</li>
                <li>Same-day reporting options available for urgent business needs</li>
              </ul>
            </div>

            {/* Specialty Services */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Specialty Inspections</h3>
              <p className="text-gray-700 mb-4">
                ASADS provides targeted inspections for <strong>mold, radon, asbestos, lead paint, WETT, termites, and energy efficiency</strong>. These services identify health risks, regulatory compliance issues, and structural hazards.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Radon and mold testing with lab-certified results</li>
                <li>Asbestos and lead sampling following Ontario regulations</li>
                <li>WETT inspections for wood heating systems to ensure safe operation</li>
                <li>Termite and pest inspections for early detection and prevention</li>
                <li>Energy efficiency audits to identify cost-saving upgrades</li>
                <li>Detailed reports with photos, risk levels, and actionable recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {homepageFaqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-xl mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Call to Action */}
      <CTASection
        title="Schedule Your Home Inspection Today"
        description="Protect your property and investment with a certified, trusted inspection in Toronto & the GTA. Same-day reports, expert guidance, and comprehensive assessments."
        buttonText="Book Now"
        buttonUrl="/booking/"
      />
    </Layout>
  );
};

export default Index;
