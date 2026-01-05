import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SITE_URL } from "@/lib/seo";

// Homepage FAQ schema for rich snippets
const homepageFaqs = [
  {
    question: "How much does a home inspection cost in Toronto?",
    answer: "Home inspection costs in Toronto typically range from $400-$600 for a standard single-family home, depending on size and age. Condos usually cost $350-$450. Contact ASADS at (647) 801-9311 for a personalized quote."
  },
  {
    question: "Who pays for a home inspection in Ontario?",
    answer: "In Ontario, the home buyer typically pays for the home inspection. It's an investment that protects you from costly surprises after purchase. Sellers may also pay for pre-listing inspections to identify issues before listing."
  },
  {
    question: "What does a home inspection include in Ontario?",
    answer: "A comprehensive Ontario home inspection covers structural components, roofing, electrical systems, plumbing, HVAC, insulation, windows, doors, and visible areas of the foundation. ASADS performs 200+ point inspections with same-day reports."
  },
  {
    question: "What is the biggest red flag in a home inspection?",
    answer: "Major red flags include foundation cracks, water damage/mold, faulty electrical (knob-and-tube wiring), roof damage, and structural issues. These can indicate expensive repairs and safety hazards that should be addressed before purchase."
  },
  {
    question: "What are the most common home inspection fails?",
    answer: "Common issues include improper grading/drainage, faulty wiring, plumbing leaks, roof damage, HVAC problems, and inadequate ventilation. In Toronto's older homes, knob-and-tube wiring and moisture issues are frequently found."
  },
  {
    question: "How long does a house inspection take in Ontario?",
    answer: "A typical home inspection takes 2-4 hours depending on property size and age. Larger homes or those with additional features may take longer. We recommend buyers attend to ask questions and learn about their potential home."
  },
  {
    question: "How do I schedule an inspection in Toronto?",
    answer: "You can schedule an ASADS home inspection online at asads.ca/booking or by calling (647) 801-9311. We offer flexible scheduling including weekends, with same-day reports available for most inspections."
  },
  {
    question: "What is the most important thing to look for in a home inspection?",
    answer: "Focus on major systems: structural integrity, roof condition, electrical safety, plumbing, and HVAC. These represent the largest potential repair costs. A qualified inspector will identify both immediate concerns and future maintenance needs."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": homepageFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Toronto & GTA | Certified Inspectors | ASADS</title>
        <meta name="description" content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections, and 15+ years experience. Book online or call (647) 801-9311." />
        <link rel="canonical" href={`${SITE_URL}/`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Home Inspection Toronto & GTA | ASADS" />
        <meta property="og:description" content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections. Book online or call (647) 801-9311." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content="Home Inspection Toronto & GTA | ASADS" />
        <meta name="twitter:description" content="Certified home inspections in Toronto & the GTA. Same-day reports, 200+ point inspections." />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <TrustBadges />
      <TestimonialsSection />
      
      <CTASection />
    </Layout>
  );
};

export default Index;
