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
  { name: "Toronto", href: "/locations/home-inspection-toronto" },
  { name: "North York", href: "/locations/home-inspection-north-york" },
  { name: "Scarborough", href: "/locations/home-inspection-scarborough" },
  { name: "Etobicoke", href: "/locations/home-inspection-etobicoke" },
  { name: "East York", href: "/locations/home-inspection-east-york" },
  // Peel Region
  { name: "Mississauga", href: "/locations/home-inspection-mississauga" },
  { name: "Brampton", href: "/locations/home-inspection-brampton" },
  { name: "Caledon", href: "/locations/home-inspection-caledon" },
  { name: "Bolton", href: "/locations/home-inspection-bolton" },
  // York Region
  { name: "Vaughan", href: "/locations/home-inspection-vaughan" },
  { name: "Markham", href: "/locations/home-inspection-markham" },
  { name: "Richmond Hill", href: "/locations/home-inspection-richmond-hill" },
  { name: "Newmarket", href: "/locations/home-inspection-newmarket" },
  { name: "Aurora", href: "/locations/home-inspection-aurora" },
  { name: "King City", href: "/locations/home-inspection-king-city" },
  { name: "Stouffville", href: "/locations/home-inspection-stouffville" },
  { name: "Georgina", href: "/locations/home-inspection-georgina" },
  { name: "East Gwillimbury", href: "/locations/home-inspection-east-gwillimbury" },
  { name: "Keswick", href: "/locations/home-inspection-keswick" },
  { name: "Sutton", href: "/locations/home-inspection-sutton" },
  { name: "Woodbridge", href: "/locations/home-inspection-woodbridge" },
  { name: "Thornhill", href: "/locations/home-inspection-thornhill" },
  { name: "Maple", href: "/locations/home-inspection-maple" },
  { name: "Kleinburg", href: "/locations/home-inspection-kleinburg" },
  { name: "Concord", href: "/locations/home-inspection-concord" },
  { name: "Unionville", href: "/locations/home-inspection-unionville" },
  // Halton Region
  { name: "Oakville", href: "/locations/home-inspection-oakville" },
  { name: "Burlington", href: "/locations/home-inspection-burlington" },
  { name: "Milton", href: "/locations/home-inspection-milton" },
  { name: "Halton Hills", href: "/locations/home-inspection-halton-hills" },
  { name: "Georgetown", href: "/locations/home-inspection-georgetown" },
  { name: "Acton", href: "/locations/home-inspection-acton" },
  // Durham Region
  { name: "Oshawa", href: "/locations/home-inspection-oshawa" },
  { name: "Whitby", href: "/locations/home-inspection-whitby" },
  { name: "Ajax", href: "/locations/home-inspection-ajax" },
  { name: "Pickering", href: "/locations/home-inspection-pickering" },
  { name: "Clarington", href: "/locations/home-inspection-clarington" },
  { name: "Bowmanville", href: "/locations/home-inspection-bowmanville" },
  { name: "Uxbridge", href: "/locations/home-inspection-uxbridge" },
  { name: "Scugog", href: "/locations/home-inspection-scugog" },
  { name: "Port Perry", href: "/locations/home-inspection-port-perry" },
  { name: "Brock", href: "/locations/home-inspection-brock" },
  { name: "Beaverton", href: "/locations/home-inspection-beaverton" },
  { name: "Cannington", href: "/locations/home-inspection-cannington" },
  // Simcoe County
  { name: "Barrie", href: "/locations/home-inspection-barrie" },
  { name: "Orillia", href: "/locations/home-inspection-orillia" },
  { name: "Innisfil", href: "/locations/home-inspection-innisfil" },
  { name: "Bradford", href: "/locations/home-inspection-bradford" },
  { name: "Alliston", href: "/locations/home-inspection-alliston" },
  { name: "Collingwood", href: "/locations/home-inspection-collingwood" },
  { name: "Wasaga Beach", href: "/locations/home-inspection-wasaga-beach" },
  { name: "Midland", href: "/locations/home-inspection-midland" },
  { name: "Penetanguishene", href: "/locations/home-inspection-penetanguishene" },
  { name: "New Tecumseth", href: "/locations/home-inspection-new-tecumseth" },
  { name: "Essa", href: "/locations/home-inspection-essa" },
  { name: "Springwater", href: "/locations/home-inspection-springwater" },
  { name: "Clearview", href: "/locations/home-inspection-clearview" },
  { name: "Stayner", href: "/locations/home-inspection-stayner" },
  // Hamilton-Niagara
  { name: "Hamilton", href: "/locations/home-inspection-hamilton" },
  { name: "Stoney Creek", href: "/locations/home-inspection-stoney-creek" },
  { name: "Ancaster", href: "/locations/home-inspection-ancaster" },
  { name: "Dundas", href: "/locations/home-inspection-dundas" },
  { name: "Flamborough", href: "/locations/home-inspection-flamborough" },
  { name: "Grimsby", href: "/locations/home-inspection-grimsby" },
  { name: "Beamsville", href: "/locations/home-inspection-beamsville" },
  { name: "Lincoln", href: "/locations/home-inspection-lincoln" },
  { name: "St. Catharines", href: "/locations/home-inspection-st-catharines" },
  { name: "Niagara Falls", href: "/locations/home-inspection-niagara-falls" },
  { name: "Niagara-on-the-Lake", href: "/locations/home-inspection-niagara-on-the-lake" },
  { name: "Welland", href: "/locations/home-inspection-welland" },
  { name: "Fort Erie", href: "/locations/home-inspection-fort-erie" },
  { name: "Port Colborne", href: "/locations/home-inspection-port-colborne" },
  { name: "Thorold", href: "/locations/home-inspection-thorold" },
  // Waterloo Region
  { name: "Kitchener", href: "/locations/home-inspection-kitchener" },
  { name: "Waterloo", href: "/locations/home-inspection-waterloo" },
  { name: "Cambridge", href: "/locations/home-inspection-cambridge" },
  { name: "North Dumfries", href: "/locations/home-inspection-north-dumfries" },
  { name: "Wilmot", href: "/locations/home-inspection-wilmot" },
  { name: "Wellesley", href: "/locations/home-inspection-wellesley" },
  { name: "Woolwich", href: "/locations/home-inspection-woolwich" },
  // Wellington County
  { name: "Guelph", href: "/locations/home-inspection-guelph" },
  { name: "Guelph/Eramosa", href: "/locations/home-inspection-guelph-eramosa" },
  { name: "Puslinch", href: "/locations/home-inspection-puslinch" },
  { name: "Centre Wellington", href: "/locations/home-inspection-centre-wellington" },
  { name: "Mapleton", href: "/locations/home-inspection-mapleton" },
  { name: "Minto", href: "/locations/home-inspection-minto" },
  { name: "Wellington North", href: "/locations/home-inspection-wellington-north" },
  { name: "Erin", href: "/locations/home-inspection-erin" },
  // Dufferin County
  { name: "Orangeville", href: "/locations/home-inspection-orangeville" },
  { name: "Shelburne", href: "/locations/home-inspection-shelburne" },
  { name: "Mono", href: "/locations/home-inspection-mono" },
  // Peterborough & Northumberland
  { name: "Peterborough", href: "/locations/home-inspection-peterborough" },
  { name: "Cobourg", href: "/locations/home-inspection-cobourg" },
  // Brant County
  { name: "Brantford", href: "/locations/home-inspection-brantford" },
  { name: "Paris", href: "/locations/home-inspection-paris" },
  // Additional Niagara
  { name: "Pelham", href: "/locations/home-inspection-pelham" },
  { name: "Wainfleet", href: "/locations/home-inspection-wainfleet" },
  { name: "West Lincoln", href: "/locations/home-inspection-west-lincoln" },
  // Additional Simcoe
  { name: "Severn", href: "/locations/home-inspection-severn" },
  { name: "Tay Township", href: "/locations/home-inspection-tay-township" },
  { name: "Tiny Township", href: "/locations/home-inspection-tiny-township" },
  // Oxford County
  { name: "Ingersoll", href: "/locations/home-inspection-ingersoll" },
  { name: "Tillsonburg", href: "/locations/home-inspection-tillsonburg" },
  { name: "Woodstock", href: "/locations/home-inspection-woodstock" },
  // Middlesex County
  { name: "Adelaide Metcalfe", href: "/locations/home-inspection-adelaide-metcalfe" },
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