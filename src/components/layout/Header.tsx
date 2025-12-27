import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const services = [
  { title: "Pre-Purchase Inspection", href: "/services/pre-purchase", description: "Complete inspection before you buy" },
  { title: "Pre-Listing Inspection", href: "/services/pre-listing", description: "Sell with confidence" },
  { title: "New Construction", href: "/services/new-construction", description: "Verify builder quality" },
  { title: "Condo Inspection", href: "/services/condo", description: "Specialized condo evaluations" },
  { title: "Commercial Inspection", href: "/services/commercial", description: "Business property assessments" },
];

const specialtyServices = [
  { title: "Radon Testing", href: "/services/radon-testing", description: "Protect your family from radon" },
  { title: "Mold Inspection", href: "/services/mold-inspection", description: "Identify hidden mold issues" },
  { title: "Thermal Imaging", href: "/services/thermal-imaging", description: "See beyond the surface" },
  { title: "WETT Inspection", href: "/services/wett", description: "Wood-burning safety checks" },
  { title: "Air Quality Testing", href: "/services/air-quality", description: "Ensure healthy indoor air" },
];

const locations = [
  { title: "Toronto", href: "/locations/toronto" },
  { title: "Mississauga", href: "/locations/mississauga" },
  { title: "Brampton", href: "/locations/brampton" },
  { title: "Vaughan", href: "/locations/vaughan" },
  { title: "Markham", href: "/locations/markham" },
  { title: "Richmond Hill", href: "/locations/richmond-hill" },
  { title: "Scarborough", href: "/locations/scarborough" },
  { title: "North York", href: "/locations/north-york" },
  { title: "Etobicoke", href: "/locations/etobicoke" },
  { title: "Oakville", href: "/locations/oakville" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-lg">
            AS
          </div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-xl text-foreground">ASADS</span>
            <span className="text-muted-foreground text-sm block -mt-1">Home Inspection</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                location.pathname === "/" && "bg-accent/50"
              )}>
                Home
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-heading font-semibold mb-2 text-sm text-muted-foreground">Main Services</h4>
                    {services.map((service) => (
                      <NavigationMenuLink key={service.href} asChild>
                        <Link
                          to={service.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{service.title}</div>
                          <p className="line-clamp-1 text-sm leading-snug text-muted-foreground">{service.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-2 text-sm text-muted-foreground">Specialty Services</h4>
                    {specialtyServices.map((service) => (
                      <NavigationMenuLink key={service.href} asChild>
                        <Link
                          to={service.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{service.title}</div>
                          <p className="line-clamp-1 text-sm leading-snug text-muted-foreground">{service.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Locations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-1 p-4 md:grid-cols-2">
                  {locations.map((loc) => (
                    <NavigationMenuLink key={loc.href} asChild>
                      <Link
                        to={loc.href}
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm font-medium"
                      >
                        {loc.title}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                  <NavigationMenuLink asChild>
                    <Link
                      to="/locations"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm font-medium text-primary"
                    >
                      View All Areas →
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/about" className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                location.pathname === "/about" && "bg-accent/50"
              )}>
                About
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/blog" className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                location.pathname.startsWith("/blog") && "bg-accent/50"
              )}>
                Blog
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/contact" className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                location.pathname === "/contact" && "bg-accent/50"
              )}>
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <a href="tel:+14165550123" className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="h-4 w-4" />
            (416) 555-0123
          </a>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/booking">Book Inspection</Link>
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container py-4 space-y-2">
            <Link to="/" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/services" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/locations" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Locations</Link>
            <Link to="/about" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/blog" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/contact" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="pt-4 border-t">
              <Button asChild className="w-full">
                <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>Book Inspection</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}