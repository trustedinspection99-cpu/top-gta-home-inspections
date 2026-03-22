import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, dbUser } = useAuth();

  function portalLink() {
    if (!user) return "/login";
    if (dbUser?.role === "admin") return "/admin";
    if (dbUser?.role === "realtor") return "/realtor-dashboard";
    return "/dashboard";
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-lg">AS</div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-xl text-foreground">ASADS</span>
            <span className="text-muted-foreground text-sm block -mt-1">Home Inspection</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", location.pathname === "/" && "bg-accent/50")}>Home</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/services" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", location.pathname.startsWith("/services") && "bg-accent/50")}>Services</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/locations" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", location.pathname.startsWith("/locations") && "bg-accent/50")}>Locations</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/pricing" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", location.pathname === "/pricing" && "bg-accent/50")}>Pricing</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/about" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", location.pathname === "/about" && "bg-accent/50")}>About</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/blog" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", location.pathname.startsWith("/blog") && "bg-accent/50")}>Blog</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/testimonials" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", location.pathname === "/testimonials" && "bg-accent/50")}>Reviews</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/faq" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", location.pathname === "/faq" && "bg-accent/50")}>FAQ</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/contact" className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", location.pathname === "/contact" && "bg-accent/50")}>Contact</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <a href="tel:+16478019311" className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground" aria-label="Call (647) 801-9311">
            <Phone className="h-4 w-4" aria-hidden="true" /> (647) 801-9311
          </a>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/booking">Book Inspection</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex border-blue-300 text-blue-700 hover:bg-blue-50">
            <Link to={portalLink()} className="flex items-center gap-1.5">
              {user ? <LayoutDashboard className="h-3.5 w-3.5" /> : <LogIn className="h-3.5 w-3.5" />}
              {user ? "Portal" : "Sign In"}
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container py-4 space-y-2" aria-label="Mobile navigation">
            <Link to="/" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/services" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/locations" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Locations</Link>
            <Link to="/pricing" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/about" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/blog" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/testimonials" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
            <Link to="/faq" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            <Link to="/contact" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link to="/trusted-realtors" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Trusted Realtors</Link>
            <div className="pt-4 border-t space-y-2">
              <Button asChild className="w-full">
                <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>Book Inspection</Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-blue-300 text-blue-700">
                <Link to={portalLink()} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                  {user ? <LayoutDashboard className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                  {user ? "My Portal" : "Sign In"}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
