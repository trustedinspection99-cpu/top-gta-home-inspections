import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  service?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    location: "Toronto",
    rating: 5,
    text: "ASADS did an incredibly thorough inspection of our first home. They found issues we never would have noticed and saved us thousands in potential repairs. Highly recommend!",
    date: "November 2024",
    service: "Pre-Purchase Inspection",
  },
  {
    name: "Michael T.",
    location: "Mississauga",
    rating: 5,
    text: "Professional, punctual, and extremely detailed. The report was comprehensive and easy to understand. Used them for both my home purchase and my parents' condo.",
    date: "October 2024",
    service: "Home Inspection",
  },
  {
    name: "Jennifer L.",
    location: "Brampton",
    rating: 5,
    text: "The radon testing service was eye-opening. They explained everything clearly and helped us understand our options. Great customer service from start to finish.",
    date: "September 2024",
    service: "Radon Testing",
  },
  {
    name: "David K.",
    location: "Vaughan",
    rating: 5,
    text: "As a real estate agent, I've worked with many inspectors. ASADS consistently provides the most thorough and professional service. My clients always appreciate their detailed reports.",
    date: "December 2024",
    service: "Multiple Services",
  },
  {
    name: "Amanda R.",
    location: "Markham",
    rating: 5,
    text: "Excellent pre-listing inspection. Helped us address issues before putting our house on the market. Sold quickly with no surprises during buyer's inspection!",
    date: "November 2024",
    service: "Pre-Listing Inspection",
  },
  {
    name: "Robert C.",
    location: "Oakville",
    rating: 5,
    text: "The thermal imaging inspection revealed hidden moisture issues we had no idea about. Their technology and expertise saved us from a potential mold nightmare.",
    date: "October 2024",
    service: "Thermal Imaging",
  },
  {
    name: "Lisa W.",
    location: "Richmond Hill",
    rating: 5,
    text: "Bought a 50-year-old home and was worried about hidden issues. The inspector was thorough, patient, and explained everything in terms I could understand.",
    date: "September 2024",
    service: "Pre-Purchase Inspection",
  },
];

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showService?: boolean;
}

export function TestimonialsCarousel({
  testimonials = defaultTestimonials,
  title = "What Our Clients Say",
  subtitle = "Join thousands of satisfied homeowners and real estate professionals who trust ASADS.",
  autoPlay = true,
  autoPlayInterval = 5000,
  showService = true,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {subtitle}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-border/50 trust-shadow">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-10 w-10 text-primary/20 mb-6" />
              <p className="text-lg md:text-xl mb-6 leading-relaxed">
                "{currentTestimonial.text}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-heading font-semibold">{currentTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.location} • {currentTestimonial.date}
                  </p>
                  {showService && currentTestimonial.service && (
                    <p className="text-sm text-primary mt-1">{currentTestimonial.service}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}