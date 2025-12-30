import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 hero-gradient">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Schedule Your Inspection?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Book online in minutes or call us directly. We offer same-day reports and 
            flexible scheduling to meet your closing deadlines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/booking">
                Book Online Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <a href="tel:+14165550123">
                <Phone className="mr-2 h-5 w-5" />
                (647) 801 9311
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
