import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Toronto",
    rating: 5,
    text: "ASADS was incredibly thorough with our pre-purchase inspection. They found issues we never would have noticed. The detailed report helped us negotiate $15,000 off the asking price!",
    service: "Pre-Purchase Inspection",
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Mississauga",
    rating: 5,
    text: "As a first-time home buyer, I was nervous about the process. The inspector took time to explain everything and even walked me through the house pointing out maintenance tips.",
    service: "Pre-Purchase Inspection",
  },
  {
    id: 3,
    name: "Jennifer L.",
    location: "Brampton",
    rating: 5,
    text: "Got my report within 24 hours with photos and clear explanations. Very professional service. Highly recommend to anyone buying a home in the GTA.",
    service: "Pre-Purchase Inspection",
  },
  {
    id: 4,
    name: "David K.",
    location: "Vaughan",
    rating: 5,
    text: "Used ASADS for a pre-listing inspection. It helped me address issues before listing and my house sold in 5 days! Worth every penny.",
    service: "Pre-Listing Inspection",
  },
  {
    id: 5,
    name: "Amanda R.",
    location: "Markham",
    rating: 5,
    text: "The thermal imaging inspection found a hidden water leak behind our bathroom wall. Saved us thousands in potential damage. Thank you ASADS!",
    service: "Thermal Imaging",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied homeowners who trusted ASADS for their inspection needs.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-2xl shadow-lg p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/10" />
            
            <div className="relative">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                "{current.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-heading font-semibold text-lg text-foreground">
                    {current.name}
                  </p>
                  <p className="text-muted-foreground">
                    {current.location} • {current.service}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    {currentIndex + 1} / {testimonials.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
