import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Wrench, FileText, Info } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

const mainPages = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Locations", href: "/locations" },
  { name: "Blog", href: "/blog" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Pricing", href: "/pricing" },
  { name: "Book Online", href: "/booking" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms" },
];

const services = [
  { name: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
  { name: "Pre-Listing Inspection", href: "/services/pre-listing" },
  { name: "New Construction Inspection", href: "/services/new-construction" },
  { name: "Condo Inspection", href: "/services/condo" },
  { name: "Commercial Inspection", href: "/services/commercial" },
  { name: "Radon Testing", href: "/services/radon-testing" },
  { name: "Mold Inspection", href: "/services/mold-inspection" },
  { name: "Asbestos Testing", href: "/services/asbestos-testing" },
  { name: "Thermal Imaging", href: "/services/thermal-imaging" },
  { name: "WETT Inspection", href: "/services/wett" },
  { name: "Lead Paint Testing", href: "/services/lead-paint-testing" },
  { name: "Well Water Testing", href: "/services/well-water-testing" },
  { name: "Sewer Scope", href: "/services/sewer-scope" },
  { name: "Air Quality Testing", href: "/services/air-quality" },
];

const locations = [
  // Toronto & Surrounding
  { name: "Toronto", href: "/locations/toronto" },
  { name: "North York", href: "/locations/north-york" },
  { name: "Scarborough", href: "/locations/scarborough" },
  { name: "Etobicoke", href: "/locations/etobicoke" },
  { name: "East York", href: "/locations/east-york" },
  // Peel Region
  { name: "Mississauga", href: "/locations/mississauga" },
  { name: "Brampton", href: "/locations/brampton" },
  { name: "Caledon", href: "/locations/caledon" },
  { name: "Bolton", href: "/locations/bolton" },
  // York Region
  { name: "Vaughan", href: "/locations/vaughan" },
  { name: "Markham", href: "/locations/markham" },
  { name: "Richmond Hill", href: "/locations/richmond-hill" },
  { name: "Newmarket", href: "/locations/newmarket" },
  { name: "Aurora", href: "/locations/aurora" },
  { name: "King City", href: "/locations/king-city" },
  { name: "Stouffville", href: "/locations/stouffville" },
  { name: "Georgina", href: "/locations/georgina" },
  { name: "East Gwillimbury", href: "/locations/east-gwillimbury" },
  { name: "Keswick", href: "/locations/keswick" },
  { name: "Sutton", href: "/locations/sutton" },
  { name: "Woodbridge", href: "/locations/woodbridge" },
  { name: "Thornhill", href: "/locations/thornhill" },
  { name: "Maple", href: "/locations/maple" },
  { name: "Kleinburg", href: "/locations/kleinburg" },
  { name: "Concord", href: "/locations/concord" },
  { name: "Unionville", href: "/locations/unionville" },
  // Halton Region
  { name: "Oakville", href: "/locations/oakville" },
  { name: "Burlington", href: "/locations/burlington" },
  { name: "Milton", href: "/locations/milton" },
  { name: "Halton Hills", href: "/locations/halton-hills" },
  { name: "Georgetown", href: "/locations/georgetown" },
  { name: "Acton", href: "/locations/acton" },
  // Durham Region
  { name: "Oshawa", href: "/locations/oshawa" },
  { name: "Whitby", href: "/locations/whitby" },
  { name: "Ajax", href: "/locations/ajax" },
  { name: "Pickering", href: "/locations/pickering" },
  { name: "Clarington", href: "/locations/clarington" },
  { name: "Bowmanville", href: "/locations/bowmanville" },
  { name: "Uxbridge", href: "/locations/uxbridge" },
  { name: "Scugog", href: "/locations/scugog" },
  { name: "Port Perry", href: "/locations/port-perry" },
  { name: "Brock", href: "/locations/brock" },
  { name: "Beaverton", href: "/locations/beaverton" },
  { name: "Cannington", href: "/locations/cannington" },
  // Simcoe County
  { name: "Barrie", href: "/locations/barrie" },
  { name: "Orillia", href: "/locations/orillia" },
  { name: "Innisfil", href: "/locations/innisfil" },
  { name: "Bradford", href: "/locations/bradford" },
  { name: "Alliston", href: "/locations/alliston" },
  { name: "Collingwood", href: "/locations/collingwood" },
  { name: "Wasaga Beach", href: "/locations/wasaga-beach" },
  { name: "Midland", href: "/locations/midland" },
  { name: "Penetanguishene", href: "/locations/penetanguishene" },
  { name: "New Tecumseth", href: "/locations/new-tecumseth" },
  { name: "Essa", href: "/locations/essa" },
  { name: "Springwater", href: "/locations/springwater" },
  { name: "Clearview", href: "/locations/clearview" },
  { name: "Stayner", href: "/locations/stayner" },
  // Hamilton-Niagara
  { name: "Hamilton", href: "/locations/hamilton" },
  { name: "Stoney Creek", href: "/locations/stoney-creek" },
  { name: "Ancaster", href: "/locations/ancaster" },
  { name: "Dundas", href: "/locations/dundas" },
  { name: "Flamborough", href: "/locations/flamborough" },
  { name: "Grimsby", href: "/locations/grimsby" },
  { name: "Beamsville", href: "/locations/beamsville" },
  { name: "Lincoln", href: "/locations/lincoln" },
  { name: "St. Catharines", href: "/locations/st-catharines" },
  { name: "Niagara Falls", href: "/locations/niagara-falls" },
  { name: "Niagara-on-the-Lake", href: "/locations/niagara-on-the-lake" },
  { name: "Welland", href: "/locations/welland" },
  { name: "Fort Erie", href: "/locations/fort-erie" },
  { name: "Port Colborne", href: "/locations/port-colborne" },
  { name: "Thorold", href: "/locations/thorold" },
  // Waterloo Region
  { name: "Kitchener", href: "/locations/kitchener" },
  { name: "Waterloo", href: "/locations/waterloo" },
  { name: "Cambridge", href: "/locations/cambridge" },
  { name: "North Dumfries", href: "/locations/north-dumfries" },
  { name: "Wilmot", href: "/locations/wilmot" },
  { name: "Wellesley", href: "/locations/wellesley" },
  { name: "Woolwich", href: "/locations/woolwich" },
  // Wellington County
  { name: "Guelph", href: "/locations/guelph" },
  { name: "Guelph/Eramosa", href: "/locations/guelph-eramosa" },
  { name: "Puslinch", href: "/locations/puslinch" },
  { name: "Centre Wellington", href: "/locations/centre-wellington" },
  { name: "Mapleton", href: "/locations/mapleton" },
  { name: "Minto", href: "/locations/minto" },
  { name: "Wellington North", href: "/locations/wellington-north" },
  { name: "Erin", href: "/locations/erin" },
  // Dufferin County
  { name: "Orangeville", href: "/locations/orangeville" },
  { name: "Shelburne", href: "/locations/shelburne" },
  { name: "Mono", href: "/locations/mono" },
  // Peterborough & Northumberland
  { name: "Peterborough", href: "/locations/peterborough" },
  { name: "Cobourg", href: "/locations/cobourg" },
  // Brant County
  { name: "Brantford", href: "/locations/brantford" },
  { name: "Paris", href: "/locations/paris" },
  // Additional Niagara
  { name: "Pelham", href: "/locations/pelham" },
  { name: "Wainfleet", href: "/locations/wainfleet" },
  { name: "West Lincoln", href: "/locations/west-lincoln" },
  // Additional Simcoe
  { name: "Severn", href: "/locations/severn" },
  { name: "Tay Township", href: "/locations/tay-township" },
  { name: "Tiny Township", href: "/locations/tiny-township" },
  // Oxford County
  { name: "Ingersoll", href: "/locations/ingersoll" },
  { name: "Tillsonburg", href: "/locations/tillsonburg" },
  { name: "Woodstock", href: "/locations/woodstock" },
  // Middlesex County
  { name: "Adelaide Metcalfe", href: "/locations/adelaide-metcalfe" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "Sitemap", "item": `${SITE_URL}/sitemap` }
  ]
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/sitemap#webpage`,
  "name": "Sitemap | ASADS Home Inspection",
  "description": "Complete sitemap for ASADS Home Inspection. Find all our services, locations, and pages.",
  "url": `${SITE_URL}/sitemap`,
  "isPartOf": { "@id": `${SITE_URL}/#website` }
};

export default function Sitemap() {
  return (
    <Layout>
      <Helmet>
        <title>Sitemap | ASADS Home Inspection</title>
        <meta name="description" content="Complete sitemap for ASADS Home Inspection. Find all our services, locations, and pages." />
        <link rel="canonical" href={`${SITE_URL}/sitemap`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sitemap | ASADS Home Inspection" />
        <meta property="og:description" content="Complete sitemap for ASADS Home Inspection. Find all our services, locations, and pages." />
        <meta property="og:url" content={`${SITE_URL}/sitemap`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content="Sitemap | ASADS Home Inspection" />
        <meta name="twitter:description" content="Complete sitemap for ASADS Home Inspection. Find all our services, locations, and pages." />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />
        
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sitemap
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Browse all pages on our website to find the information you need.
            </p>

            <div className="grid gap-12">
              {/* Main Pages */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">Main Pages</h2>
                </div>
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {mainPages.map((page) => (
                    <li key={page.href}>
                      <Link
                        to={page.href}
                        className="block p-3 rounded-lg border bg-background hover:border-primary hover:bg-primary/5 transition-colors text-foreground"
                      >
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-secondary" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">Services ({services.length})</h2>
                </div>
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <li key={service.href}>
                      <Link
                        to={service.href}
                        className="block p-3 rounded-lg border bg-background hover:border-secondary hover:bg-secondary/5 transition-colors text-foreground"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Locations */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">Service Areas ({locations.length})</h2>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {locations.map((location) => (
                    <li key={location.href}>
                      <Link
                        to={location.href}
                        className="block p-2 rounded-lg border bg-background hover:border-accent hover:bg-accent/5 transition-colors text-sm text-foreground"
                      >
                        {location.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}