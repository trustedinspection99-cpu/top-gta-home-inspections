import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

const services = [
  { title: "Pre-Purchase Inspection", href: "/services/pre-purchase/" },
  { title: "Pre-Listing Inspection", href: "/services/pre-listing/" },
  { title: "Condo Inspection", href: "/services/condo/" },
  { title: "Commercial Inspection", href: "/services/commercial/" },
  { title: "New Construction", href: "/services/new-construction/" },
  { title: "Radon Testing", href: "/services/radon-testing/" },
  { title: "Mold Inspection", href: "/services/mold-inspection/" },
  { title: "Asbestos Testing", href: "/services/asbestos-testing/" },
  { title: "Lead Paint Testing", href: "/services/lead-paint-testing/" },
  { title: "Well Water Testing", href: "/services/well-water-testing/" },
  { title: "Thermal Imaging", href: "/services/thermal-imaging/" },
  { title: "Air Quality Testing", href: "/services/air-quality/" },
  { title: "Sewer Scope", href: "/services/sewer-scope/" },
  { title: "WETT Inspection", href: "/services/wett/" },
];

const locations = [
  { title: "Toronto", href: "/locations/toronto/" },
  { title: "Mississauga", href: "/locations/mississauga/" },
  { title: "Brampton", href: "/locations/brampton/" },
  { title: "Vaughan", href: "/locations/vaughan/" },
  { title: "Markham", href: "/locations/markham/" },
  { title: "Scarborough", href: "/locations/scarborough/" },
  { title: "North York", href: "/locations/north-york/" },
  { title: "Etobicoke", href: "/locations/etobicoke/" },
  { title: "Ajax", href: "/locations/ajax/" },
  { title: "Pickering", href: "/locations/pickering/" },
  { title: "Whitby", href: "/locations/whitby/" },
  { title: "Oshawa", href: "/locations/oshawa/" },
  { title: "Barrie", href: "/locations/barrie/" },
  { title: "Hamilton", href: "/locations/hamilton/" },
  { title: "Oakville", href: "/locations/oakville/" },
  { title: "Burlington", href: "/locations/burlington/" },
  { title: "Waterloo", href: "/locations/waterloo/" },
  { title: "Kitchener", href: "/locations/kitchener/" },
  { title: "Guelph", href: "/locations/guelph/" },
  { title: "Cambridge", href: "/locations/cambridge/" },
  { title: "St. Catharines", href: "/locations/st-catharines/" },
  { title: "Niagara Falls", href: "/locations/niagara-falls/" },
];

const quickLinks = [
  { title: "About Us", href: "/about/" },
  { title: "All Services", href: "/services/" },
  { title: "Pricing", href: "/pricing/" },
  { title: "Blog", href: "/blog/" },
  { title: "FAQ", href: "/faq/" },
  { title: "Testimonials", href: "/testimonials/" },
  { title: "Book Online", href: "/booking/" },
  { title: "Contact", href: "/contact/" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground text-primary font-heading font-bold text-lg">
                AS
              </div>
              <div>
                <span className="font-heading font-bold text-xl">ASADS</span>
                <span className="text-primary-foreground/80 text-sm block -mt-1">Home Inspection</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Professional home inspection services throughout the Greater Toronto Area. 
              Certified, experienced, and dedicated to protecting your investment.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link 
                    to={service.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.href}>
                  <Link 
                    to={location.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {location.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/locations/" 
                  className="text-accent hover:text-accent/80 text-sm transition-colors font-medium"
                >
                  View All Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-accent" />
                <div>
                  <a href="tel:+16478019311" className="text-sm hover:text-accent transition-colors">(647) 801-9311</a>
                  <p className="text-primary-foreground/60 text-xs">Call or Text</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-accent" />
                <a href="mailto:info@asads.ca" className="text-sm hover:text-accent transition-colors">info@asads.ca</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/80">Serving the Greater Toronto Area</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-accent" />
                <div className="text-sm text-primary-foreground/80">
                  <p>Mon-Fri: 8am - 6pm</p>
                  <p>Sat: 9am - 4pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} ASADS Home Inspection. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms/" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy-policy/" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/sitemap/" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
