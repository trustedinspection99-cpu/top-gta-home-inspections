import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Star, Quote, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Toronto",
    rating: 5,
    text: "ASADS was incredibly thorough with our pre-purchase inspection. They found issues we never would have noticed. The detailed report helped us negotiate $15,000 off the asking price!",
    service: "Pre-Purchase Inspection",
    date: "January 2024",
    verified: true,
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Mississauga",
    rating: 5,
    text: "As a first-time home buyer, I was nervous about the process. The inspector took time to explain everything and even walked me through the house pointing out maintenance tips. Exceptional service!",
    service: "Pre-Purchase Inspection",
    date: "January 2024",
    verified: true,
  },
  {
    id: 3,
    name: "Jennifer L.",
    location: "Brampton",
    rating: 5,
    text: "Got my report within 24 hours with photos and clear explanations. Very professional service. The report was so detailed and easy to understand. Highly recommend to anyone buying a home in the GTA.",
    service: "Pre-Purchase Inspection",
    date: "December 2023",
    verified: true,
  },
  {
    id: 4,
    name: "David K.",
    location: "Vaughan",
    rating: 5,
    text: "Used ASADS for a pre-listing inspection. It helped me address issues before listing and my house sold in 5 days! The investment paid for itself many times over. Worth every penny.",
    service: "Pre-Listing Inspection",
    date: "December 2023",
    verified: true,
  },
  {
    id: 5,
    name: "Amanda R.",
    location: "Markham",
    rating: 5,
    text: "The thermal imaging inspection found a hidden water leak behind our bathroom wall. Saved us thousands in potential damage. Thank you ASADS! The technology they use is impressive.",
    service: "Thermal Imaging",
    date: "November 2023",
    verified: true,
  },
  {
    id: 6,
    name: "Robert C.",
    location: "Richmond Hill",
    rating: 5,
    text: "Professional, punctual, and incredibly knowledgeable. The inspector answered all my questions and helped me understand the condition of my potential new home. Would use again without hesitation.",
    service: "Pre-Purchase Inspection",
    date: "November 2023",
    verified: true,
  },
  {
    id: 7,
    name: "Emily W.",
    location: "Oakville",
    rating: 5,
    text: "We hired ASADS for a new construction inspection and they found several deficiencies that the builder had missed. Their attention to detail saved us from major headaches down the road.",
    service: "New Construction Inspection",
    date: "October 2023",
    verified: true,
  },
  {
    id: 8,
    name: "James P.",
    location: "Burlington",
    rating: 5,
    text: "The radon testing service was quick and informative. They explained the results clearly and provided recommendations. Very happy with the service and professionalism.",
    service: "Radon Testing",
    date: "October 2023",
    verified: true,
  },
  {
    id: 9,
    name: "Lisa H.",
    location: "Ajax",
    rating: 5,
    text: "ASADS inspected our condo before purchase. They were thorough and found HVAC issues that weren't disclosed. Their expertise in condo inspections is unmatched in the GTA.",
    service: "Condo Inspection",
    date: "September 2023",
    verified: true,
  },
  {
    id: 10,
    name: "Thomas B.",
    location: "Pickering",
    rating: 5,
    text: "Excellent commercial property inspection. The detailed report was exactly what we needed for our due diligence. Professional team with great communication throughout.",
    service: "Commercial Inspection",
    date: "September 2023",
    verified: true,
  },
  {
    id: 11,
    name: "Nancy G.",
    location: "Whitby",
    rating: 5,
    text: "Had ASADS do a mold inspection after noticing a musty smell. They identified the source and provided clear remediation recommendations. Fast, professional, and thorough.",
    service: "Mold Inspection",
    date: "August 2023",
    verified: true,
  },
  {
    id: 12,
    name: "Kevin S.",
    location: "Milton",
    rating: 5,
    text: "Best investment we made during our home buying process. The inspector was friendly, knowledgeable, and patient with all our questions. The report was delivered same day!",
    service: "Pre-Purchase Inspection",
    date: "August 2023",
    verified: true,
  },
];

const stats = [
  { value: "5,000+", label: "Inspections Completed" },
  { value: "4.9", label: "Average Rating" },
  { value: "98%", label: "Would Recommend" },
  { value: "24hr", label: "Report Delivery" },
];

export default function Testimonials() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://asads.ca/#localbusiness",
    "name": "ASADS Home Inspection",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": testimonials.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "datePublished": new Date(Date.parse(t.date)).toISOString().split('T')[0],
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
        "item": "https://asads.ca/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Testimonials",
        "item": "https://asads.ca/testimonials"
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Customer Testimonials | ASADS Home Inspection Reviews</title>
        <meta name="description" content="Read verified customer reviews and testimonials from homeowners across the GTA who trusted ASADS for their home inspection needs." />
        <link rel="canonical" href="https://asads.ca/testimonials" />
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
              Don't just take our word for it. See what our clients say about their experience with ASADS Home Inspection.
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground">
              Based on 500+ verified reviews
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

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
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
              Join thousands of satisfied homeowners who trusted ASADS for their home inspection needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Book Your Inspection</Link>
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
