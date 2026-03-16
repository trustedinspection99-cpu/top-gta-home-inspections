import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Star, Quote, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { testimonialsData } from "@/data/testimonials";

const PAGE_SIZE = 24;

const SERVICE_FILTERS = [
  "All Reviews",
  "Pre-Purchase Inspection",
  "Pre-Listing Inspection",
  "New Construction Inspection",
  "Condo Inspection",
  "Mold Inspection",
  "Radon Testing",
  "WETT Inspection",
  "Thermal Imaging",
  "Asbestos Testing",
  "Lead Paint Testing",
  "Sewer Scope Inspection",
  "Air Quality Testing",
];

const stats = [
  { value: "2,500+", label: "Inspections Completed" },
  { value: "4.9", label: "Average Rating" },
  { value: "98%", label: "Would Recommend" },
  { value: "24hr", label: "Report Delivery" },
];

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("All Reviews");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = activeFilter === "All Reviews"
    ? testimonialsData
    : testimonialsData.filter(t => t.service === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const schemaReviews = testimonialsData.slice(0, 50);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.asads.ca/#localbusiness",
    "name": "ASADS Home Inspection",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "45 Duckworth Rd",
      "addressLocality": "Cambridge",
      "addressRegion": "ON",
      "postalCode": "N3H 0C1",
      "addressCountry": "CA"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "reviewCount": testimonialsData.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": schemaReviews.map(t => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "datePublished": new Date(Date.parse(t.date + " 1")).toISOString().split("T")[0],
      "reviewBody": t.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "itemReviewed": {
        "@type": "Service",
        "name": t.service,
        "provider": {
          "@type": "LocalBusiness",
          "name": "ASADS Home Inspection"
        }
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.asads.ca/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Testimonials",
        "item": "https://www.asads.ca/testimonials"
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Customer Testimonials | 500+ ASADS Home Inspection Reviews</title>
        <meta name="description" content="Read 500+ verified customer reviews from GTA homeowners who trusted ASADS. 4.9 stars across Toronto, Mississauga, Brampton, Hamilton & Ontario." />
        <link rel="canonical" href="https://www.asads.ca/testimonials" />
        <meta property="og:title" content="Customer Testimonials | 500+ ASADS Home Inspection Reviews" />
        <meta property="og:description" content="Read 500+ verified customer reviews from GTA homeowners who trusted ASADS for home inspections. 4.9 stars across Ontario." />
        <meta property="og:url" content="https://www.asads.ca/testimonials" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.asads.ca/images/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Customer Testimonials | 500+ ASADS Home Inspection Reviews" />
        <meta name="twitter:description" content="Read 500+ verified customer reviews from GTA homeowners. 4.9 stars across Ontario." />
        <meta name="twitter:image" content="https://www.asads.ca/images/og-default.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Customer Testimonials
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Over 500 verified reviews from homeowners and buyers across the GTA and Ontario who trusted ASADS for their property decisions.
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground">
              4.9 stars based on 500+ verified reviews
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {SERVICE_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Showing {visible.length} of {filtered.length} reviews
            {activeFilter !== "All Reviews" && ` for ${activeFilter}`}
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-lg transition-shadow relative"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                  {testimonial.rating < 5 && [...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="border-t pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        {testimonial.name}
                        {testimonial.verified && (
                          <CheckCircle className="h-4 w-4 text-secondary" />
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {testimonial.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">
                        {testimonial.service}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
              >
                Load More Reviews ({filtered.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-background border-t border-border/50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link>
            <span className="text-border">•</span>
            <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <span className="text-border">•</span>
            <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            <span className="text-border">•</span>
            <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">Service Areas</Link>
            <span className="text-border">•</span>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join 500+ satisfied homeowners who trusted ASADS for their home inspection needs across Ontario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/booking">Book Your Inspection</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
