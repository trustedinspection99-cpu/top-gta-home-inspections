import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const faqCategories = [
  {
    category: "General Questions",
    questions: [
      {
        question: "What is a home inspection?",
        answer: "A home inspection is a comprehensive, non-invasive examination of a property's visible and accessible systems and components. Our certified inspectors evaluate the condition of the home's structure, roof, electrical, plumbing, HVAC, and more. The goal is to identify any existing or potential issues that could affect the safety, functionality, or value of the property.",
      },
      {
        question: "How long does a home inspection take?",
        answer: "A typical home inspection takes 2-4 hours depending on the size and age of the property. Larger homes, older properties, or those with additional features (pools, separate buildings) may take longer. We recommend buyers attend the inspection to ask questions and learn about their potential new home.",
      },
      {
        question: "Should I attend the home inspection?",
        answer: "We strongly encourage you to attend! While it's not required, being present allows you to ask questions, see issues firsthand, and learn about home maintenance from our inspector. The walkthrough at the end of the inspection is especially valuable for first-time home buyers.",
      },
      {
        question: "When will I receive my inspection report?",
        answer: "We deliver detailed inspection reports within 24 hours of the inspection, often same-day. The report includes photos, descriptions of issues found, and recommendations. You'll receive it via email in a user-friendly digital format that's easy to share with your real estate agent.",
      },
    ],
  },
  {
    category: "Costs & Booking",
    questions: [
      {
        question: "How much does a home inspection cost?",
        answer: "Home inspection costs vary based on property size, age, and type. Standard single-family home inspections typically range from $400-$600. Condos are usually $350-$450. Additional services like radon testing, thermal imaging, or mold inspections have separate fees. Contact us for a personalized quote for your property.",
      },
      {
        question: "How do I book an inspection?",
        answer: "You can book online through our website, call us at (647) 801-9311, or email info@asads.ca. We offer flexible scheduling including weekends. Once booked, you'll receive a confirmation email with all the details and what to expect on inspection day.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, debit cards, e-transfer, and cash. Payment is due at the time of inspection unless other arrangements have been made. We can provide invoices for commercial inspections.",
      },
      {
        question: "Do you offer any discounts?",
        answer: "Yes! We offer discounts for multiple service packages (e.g., combining radon testing with your inspection), referrals, and repeat customers. We also have special rates for real estate professionals. Ask about our current promotions when booking.",
      },
    ],
  },
  {
    category: "The Inspection Process",
    questions: [
      {
        question: "What does a home inspection include?",
        answer: "Our comprehensive inspection covers: structural components (foundation, walls, roof), exterior (siding, windows, doors), roof and attic, plumbing systems, electrical systems, HVAC (heating, cooling, ventilation), interior components, insulation, and attached garages. We follow InterNACHI Standards of Practice.",
      },
      {
        question: "What is NOT included in a home inspection?",
        answer: "Standard inspections don't include: areas that are inaccessible or unsafe, items that require specialized testing (asbestos, lead paint, radon, mold), swimming pools or hot tubs, septic systems, wells, or outbuildings (unless specifically requested). These can be added as additional services.",
      },
      {
        question: "Can a home fail an inspection?",
        answer: "No, home inspections are not pass/fail examinations. Our job is to objectively report on the condition of the property. Every home has issues - even new construction. The report helps you understand what those issues are so you can make an informed decision about the purchase.",
      },
      {
        question: "What if major issues are found?",
        answer: "If significant issues are discovered, you have options: negotiate with the seller for repairs or price reduction, request specialized inspections for further evaluation, proceed with the purchase knowing the issues, or in some cases, walk away from the deal. We'll help you understand the severity of any issues found.",
      },
    ],
  },
  {
    category: "Specialized Inspections",
    questions: [
      {
        question: "What is thermal imaging inspection?",
        answer: "Thermal imaging uses infrared technology to detect temperature differences that may indicate hidden issues like water leaks, poor insulation, electrical hotspots, or pest infestations. It's a non-invasive way to see problems behind walls and ceilings that aren't visible to the naked eye.",
      },
      {
        question: "Why should I test for radon?",
        answer: "Radon is a naturally occurring radioactive gas that's the second leading cause of lung cancer. It seeps into homes from the ground and can accumulate to dangerous levels. Many areas of the GTA have elevated radon levels. Testing is the only way to know if your home has unsafe radon concentrations.",
      },
      {
        question: "When should I get a mold inspection?",
        answer: "Consider mold inspection if you notice musty odors, visible mold growth, water damage, or experience unexplained allergic symptoms. We recommend it after any water intrusion, for properties that have been vacant, or when buying an older home. Our inspectors identify mold presence and moisture sources.",
      },
      {
        question: "What is a WETT inspection?",
        answer: "WETT (Wood Energy Technology Transfer) inspection is required for homes with wood-burning appliances (fireplaces, wood stoves, pellet stoves). It ensures the installation meets safety standards and is often required by insurance companies. Our WETT-certified inspectors can provide this specialized assessment.",
      },
    ],
  },
  {
    category: "For Sellers",
    questions: [
      {
        question: "Should sellers get a pre-listing inspection?",
        answer: "Pre-listing inspections offer several advantages: identify and address issues before listing, accurate pricing, faster sales, fewer surprises during negotiations, and increased buyer confidence. Properties with pre-listing inspections often sell faster and closer to asking price.",
      },
      {
        question: "What if the buyer wants their own inspection?",
        answer: "Buyers often want their own inspection regardless of a pre-listing inspection - and that's okay! Your pre-listing inspection helps you prepare and demonstrates transparency. It can actually strengthen your negotiating position by showing you've been proactive about the property's condition.",
      },
    ],
  },
];

export default function FAQ() {
  // Generate FAQ schema from all categories
  const allFaqs = faqCategories.flatMap(category => category.questions);
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <title>FAQ | Home Inspection Questions | ASADS Home Inspection</title>
        <meta name="description" content="Find answers to frequently asked questions about home inspections in the Greater Toronto Area. Learn about costs, process, and what to expect." />
        <link rel="canonical" href="https://www.asads.ca/faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our home inspection services. Can't find what you're looking for? Contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.category} className="mb-12">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="bg-background border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our team is here to help. Reach out through any of these channels.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="tel:+16478019311"
                className="flex flex-col items-center p-6 bg-background rounded-xl border hover:border-primary transition-colors text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-muted-foreground">(647) 801-9311</p>
                <p className="text-sm text-muted-foreground mt-1">Mon-Sat 8am-6pm</p>
              </a>

              <a
                href="mailto:info@asads.ca"
                className="flex flex-col items-center p-6 bg-background rounded-xl border hover:border-primary transition-colors text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-muted-foreground">info@asads.ca</p>
                <p className="text-sm text-muted-foreground mt-1">Response within 24hrs</p>
              </a>

              <Link
                to="/contact"
                className="flex flex-col items-center p-6 bg-background rounded-xl border hover:border-primary transition-colors text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Contact Form</h3>
                <p className="text-muted-foreground">Send a message</p>
                <p className="text-sm text-muted-foreground mt-1">We'll get back to you</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-background border-t border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6 text-center">
              Learn More About Our Services
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/services/pre-purchase/" className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Pre-Purchase Inspection
              </Link>
              <Link to="/services/radon-testing/" className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Radon Testing
              </Link>
              <Link to="/services/mold-inspection/" className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Mold Inspection
              </Link>
              <Link to="/services/thermal-imaging/" className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Thermal Imaging
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <Link to="/services/" className="text-primary hover:underline">All Services</Link>
              <span className="text-border">•</span>
              <Link to="/pricing/" className="text-primary hover:underline">Pricing</Link>
              <span className="text-border">•</span>
              <Link to="/locations/" className="text-primary hover:underline">Service Areas</Link>
              <span className="text-border">•</span>
              <Link to="/about/" className="text-primary hover:underline">About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-6">
              Ready to Book Your Inspection?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Get peace of mind with a thorough home inspection from our certified professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/booking/">Book Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
                <Link to="/services/">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
