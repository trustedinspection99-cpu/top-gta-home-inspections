import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SITE_URL } from "@/lib/seo";

// Homepage FAQ schema
const homepageFaqs = [
  {
    question: "How much does a home inspection cost in Toronto?",
    answer: "Home inspection costs in Toronto typically range from $400-$600 for a standard single-family home, depending on size and age. Condos usually cost $350-$450. Contact ASADS at (647) 801-9311 for a personalized quote."
  },
  {
    question: "Who pays for a home inspection in Ontario?",
    answer: "In Ontario, the home buyer typically pays for the home inspection. Sellers may also pay for pre-listing inspections to identify issues before listing."
  },
  {
    question: "What does a home inspection include in Ontario?",
    answer: "Covers structural components, roofing, electrical, plumbing, HVAC, insulation, windows, doors, and foundation. ASADS performs 200+ point inspections with same-day reports."
  },
  {
    question: "Biggest red flags in a home inspection?",
    answer: "Foundation cracks, water damage/mold, faulty electrical, roof damage, structural issues."
  },
  {
    question: "How long does a home inspection take?",
    answer: "Typically 2-4 hours depending on property size and age."
  },
  {
    question: "How to schedule an inspection?",
    answer: "Book online at asads.ca/booking or call (647) 801-9311."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": homepageFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
  }))
};

const Index = () => {
  return (
    <Layout>
      {/* Google Tag Manager (noscript) */}
      <noscript>{`<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NB43TTTB" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}</noscript>

      <Helmet>
        {/* Google Tag Manager */}
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NB43TTTB');`}
        </script>

        {/* Page Title & Meta */}
        <title>Home Inspection Toronto & GTA | Certified Inspectors | ASADS</title>
        <meta
          name="description"
          content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections, 15+ years experience. Book online or call (647) 801-9311."
        />
        <link rel="canonical" href={`${SITE_URL}/`} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Home Inspection Toronto & GTA | ASADS" />
        <meta
          property="og:description"
          content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections. Book online or call (647) 801-9311."
        />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />

        {/* Twitter/X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content="Home Inspection Toronto & GTA | ASADS" />
        <meta
          name="twitter:description"
          content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections."
        />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />

        {/* JSON-LD FAQ */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

        {/* Facebook Pixel */}
        <script>
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID');
          fbq('track', 'PageView');`}
        </script>
        <noscript>{`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1" />`}</noscript>
      </Helmet>

      {/* Hero Section */}
      <HeroSection
        h1="Protect Your Investment with Expert Home Inspections"
        subtitle="Comprehensive home inspection services throughout the Greater Toronto Area. Get detailed reports, expert insights, and peace of mind before you buy or sell."
        highlights={[
          "Certified & Insured Inspectors",
          "Same-Day Reports Available",
          "Serving All GTA Areas",
          "Book Your Inspection: (647) 801-9311"
        ]}
      />

      {/* Stats Section */}
      <StatsSection
        stats={[
          { h3: "2,000+", label: "Inspections Completed" },
          { h3: "10+", label: "Years Experience" },
          { h3: "98%", label: "Client Satisfaction" },
          { h3: "24hr", label: "Report Delivery" }
        ]}
      />

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
          "Satisfied Clients"
        ]}
      />

      {/* Services Overview */}
      <ServicesOverview
        services={[
          {
            h2: "Pre-Purchase Inspection",
            description: "Complete evaluation before you buy. Identify issues and negotiate with confidence.",
          },
          {
            h2: "Pre-Listing Inspection",
            description: "Sell your home faster with a pre-listing inspection that builds buyer trust.",
          },
          {
            h2: "New Construction",
            description: "Verify builder quality and catch defects before your final walkthrough.",
          },
          {
            h2: "Condo Inspection",
            description: "Specialized inspections for condos, townhomes, and stacked units.",
          },
          {
            h2: "Commercial Inspection",
            description: "Comprehensive assessments for commercial and investment properties.",
          },
          {
            h2: "Specialty Services",
            description: "Radon Testing, Mold Inspection, Thermal Imaging, Air Quality Testing, WETT Inspection, Asbestos Testing, Lead Paint Testing, Well Water Testing, Sewer Scope",
          }
        ]}
      />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Call to Action */}
      <CTASection />
    </Layout>
  );
};

export default Index;
