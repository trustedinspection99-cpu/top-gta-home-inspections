import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { OrphanLocationLinks } from "@/components/seo/OrphanLocationLinks";

const services = [
  { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
  { title: "Pre-Listing Inspection", href: "/services/pre-listing" },
  { title: "Condo Inspection", href: "/services/condo" },
  { title: "Commercial Inspection", href: "/services/commercial" },
  { title: "New Construction", href: "/services/new-construction" },
  { title: "Radon Testing", href: "/services/radon-testing" },
  { title: "Mold Inspection", href: "/services/mold-inspection" },
  { title: "Asbestos Testing", href: "/services/asbestos-testing" },
  { title: "Lead Paint Testing", href: "/services/lead-paint-testing" },
  { title: "Well Water Testing", href: "/services/well-water-testing" },
  { title: "Thermal Imaging", href: "/services/thermal-imaging" },
  { title: "Air Quality Testing", href: "/services/air-quality" },
  { title: "Sewer Scope", href: "/services/sewer-scope" },
  { title: "WETT Inspection", href: "/services/wett" },
];

const quickLinks = [
  { title: "About Us", href: "/about" },
  { title: "All Services", href: "/services" },
  { title: "Pricing", href: "/pricing" },
  { title: "Blog", href: "/blog" },
  { title: "FAQ", href: "/faq" },
  { title: "Testimonials", href: "/testimonials" },
  { title: "Book Online", href: "/booking" },
  { title: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        {/* Changed grid to 5 columns on large screens to fit Quick Links */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
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
            </p>
            <div className="flex gap-4">
               {/* Social icons (kept original SVG paths) */}
               <a href="https://www.facebook.com/share/1ZhWQk97YY/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/asads_home_inspection" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column (NEW: Fixes orphaned page SEO errors) */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link to={service.href} className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Service Areas</h3>
            <div className="space-y-4">
              <OrphanLocationLinks className="grid grid-cols-2 gap-x-6 gap-y-2" linkClassName="text-primary-foreground/80 hover:text-primary-foreground" />
              {/* FIXED: Using <Link> and relative path to prevent hard reload */}
              <Link to="/locations/" className="inline-block text-accent hover:text-accent/80 text-sm transition-colors font-medium">
                View All Areas →
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-accent" />
                <a href="tel:+16478019311" className="text-sm hover:text-accent transition-colors">(647) 801-9311</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-accent" />
                <a href="mailto:info@asads.ca" className="text-sm hover:text-accent transition-colors">info@asads.ca</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">© {currentYear} ASADS Home Inspection. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms/" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Terms of Service</Link>
            {/* FIXED: Changed from /privacy-policy/ to /privacy/ to match your canonical URL */}
            <Link to="/privacy/" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Privacy Policy</Link>
            <Link to="/sitemap/" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
