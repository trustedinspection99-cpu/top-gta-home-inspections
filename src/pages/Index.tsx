import { Helmet } from "react-helmet-async";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SITE_URL } from "@/lib/seo";
import { FaHome, FaBuilding, FaTools, FaWarehouse, FaClipboardCheck, FaMicroscope } from "react-icons/fa";

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
    answer: "Typically 2-4 hours depending on property size and age.",
  },
  {
    question: "How to schedule an inspection?",
    answer: "Book online at asads.ca/booking or call (647) 801-9311.",
  },
];

// Services structured data
const servicesSchema = [
  {
    name: "Pre-Purchase Inspection",
    description:
      "Complete evaluation before you buy. Identify issues and negotiate with confidence.",
    url: `${SITE_URL}/services/pre-purchase-inspection/`,
    icon: <FaHome size={40} className="text-blue-600" />,
  },
  {
    name: "Pre-Listing Inspection",
    description:
      "Sell your home faster with a pre-listing inspection that builds buyer trust.",
    url: `${SITE_URL}/services/pre-listing-inspection/`,
    icon: <FaClipboardCheck size={40} className="text-blue-600" />,
  },
  {
    name: "New Construction",
    description:
      "Verify builder quality and catch defects before your final walkthrough.",
    url: `${SITE_URL}/services/new-construction-inspection/`,
    icon: <FaBuilding size={40} className="text-blue-600" />,
  },
  {
    name: "Condo Inspection",
    description:
      "Specialized inspections for condos, townhomes, and stacked units.",
    url: `${SITE_URL}/services/condo-inspection/`,
    icon: <FaTools size={40} className="text-blue-600" />,
  },
  {
    name: "Commercial Inspection",
    description:
      "Comprehensive assessments for commercial and investment properties.",
    url: `${SITE_URL}/services/commercial-inspection/`,
    icon: <FaWarehouse size={40} className="text-blue-600" />,
  },
  {
    name: "Specialty Services",
    description:
      "Radon Testing, Mold Inspection, Thermal Imaging, Air Quality Testing, WETT Inspection, Asbestos Testing, Lead Paint Testing, Well Water Testing, Sewer Scope",
    url: `${SITE_URL}/services/specialty-services/`,
    icon: <FaMicroscope size={40} className="text-blue-600" />,
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
  "@type": "LocalBusiness",
  name: "ASADS Home Inspection",
  image: `${SITE_URL}/og-image.jpg`,
  url: `${SITE_URL}/`,
  telephone: "(647) 801-9311",
  description:
    "Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections. Protect your investment before you buy or sell.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "Canada",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 43.7,
      longitude: -79.42,
    },
    geoRadius: 50,
  },
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
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NB43TTTB"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <Helmet>
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NB43TTTB');`}
        </script>

        <title>Home Inspection Toronto & GTA | Certified Inspectors | ASADS</title>
        <meta
          name="description"
          content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections, 15+ years experience. Book online or call (647) 801-9311."
        />
        <link rel="canonical" href={`${SITE_URL}/`} />

        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(servicesJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Protect Your Investment with Expert Home Inspections
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Comprehensive home inspection services throughout the Greater Toronto Area. Get detailed reports, expert insights, and peace of mind before you buy or sell.
        </p>
        <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-base mb-6">
          <li>✅ Certified & Insured Inspectors</li>
          <li>✅ Same-Day Reports Available</li>
          <li>✅ Serving All GTA Areas</li>
          <li>✅ Book Your Inspection: (647) 801-9311</li>
        </ul>
      </section>

      {/* Stats Section */}
      <section className="stats py-12 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">Our Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-2xl font-bold">2,000+</h3>
            <p>Inspections Completed</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">10+</h3>
            <p>Years Experience</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">98%</h3>
            <p>Client Satisfaction</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">24hr</h3>
            <p>Report Delivery</p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges
        badges={[
          "Licensed & Insured",
          "Full Coverage",
          "OAHI Certified",
          "Ontario Association",
          "InterNACHI Member",
          "International Standards",
          "5,000+ Inspections",
          "Satisfied Clients",
        ]}
      />

      {/* Services Section */}
      <section className="services py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Comprehensive Inspection Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {servicesSchema.map((service) => (
            <Link
              href={service.url}
              key={service.name}
              className="group block border rounded-lg p-6 bg-white hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out text-center"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">{service.name}</h3>
              <p className="text-gray-700">{service.description}</p>
              <span className="inline-block mt-4 text-blue-600 font-medium group-hover:underline">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Call to Action */}
      <CTASection />
    </Layout>
  );
};

export default Index;
