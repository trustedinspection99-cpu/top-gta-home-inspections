import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  Shield,
  Star,
  Search as SearchIcon,
  CheckCircle,
  FileText,
  Award,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { OrphanLocationLinks } from "@/components/seo/OrphanLocationLinks";
import { locationData } from "@/data/locationData";
import { HeroBookingSection } from "@/components/HeroBookingSection";

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

const getRegionList = () => {
  if (!Array.isArray(locationData)) return [];
  const groups = locationData.reduce((acc, loc) => {
    const regionName = loc.region || "Other Areas";
    if (!acc[regionName]) acc[regionName] = [];
    acc[regionName].push({
      city: loc.city,
      slug: loc.slug,
      href: `/locations/${loc.slug}`,
      popular: (loc as any).popular || false,
    });
    return acc;
  }, {} as Record<string, any[]>);
  return Object.entries(groups).map(([name, locations]) => ({ name, locations }));
};

const regionList = getRegionList();
const allLocations = locationData || [];
const allCityList = allLocations.map(loc => ({
  city: loc.city,
  slug: loc.slug,
  href: `/locations/${loc.slug}`,
  popular: (loc as any).popular || false,
  region: loc.region || "Other Areas",
}));

const featuredCities = [
  { name: "Toronto",       slug: "home-inspection-toronto",       tag: "Most Popular" },
  { name: "Mississauga",   slug: "home-inspection-mississauga",   tag: "" },
  { name: "Brampton",      slug: "home-inspection-brampton",      tag: "" },
  { name: "Vaughan",       slug: "home-inspection-vaughan",       tag: "" },
  { name: "Markham",       slug: "home-inspection-markham",       tag: "" },
  { name: "Oakville",      slug: "home-inspection-oakville",      tag: "" },
  { name: "Hamilton",      slug: "home-inspection-hamilton",      tag: "" },
  { name: "Barrie",        slug: "home-inspection-barrie",        tag: "" },
  { name: "Kitchener",     slug: "home-inspection-kitchener",     tag: "" },
  { name: "Guelph",        slug: "home-inspection-guelph",        tag: "" },
  { name: "Richmond Hill", slug: "home-inspection-richmond-hill", tag: "" },
  { name: "Oshawa",        slug: "home-inspection-oshawa",        tag: "" },
];

/* ─── Component ────────────────────────────────────────────────────────────── */

export default function Locations() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return allCityList;
    const query = searchQuery.toLowerCase();
    return allCityList.filter(loc => loc.city.toLowerCase().includes(query));
  }, [searchQuery]);

  const totalLocations = allLocations.length;

  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Service Areas Ontario | 106 Cities | ASADS</title>
        <meta name="description" content="ASADS certified home inspectors serve 106 cities across the GTA and Ontario — Toronto, Mississauga, Brampton, Hamilton, Barrie, Kitchener & more. Same-day reports. Book online." />
        <link rel="canonical" href="https://www.asads.ca/locations" />
        <meta property="og:title" content="Home Inspection Service Areas | 106 Cities in Ontario | ASADS" />
        <meta property="og:description" content="ASADS certified home inspectors serve 106 cities across the GTA and Ontario. Same-day digital reports. Book online or call (647) 801-9311." />
        <meta property="og:url" content="https://www.asads.ca/locations" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:image" content="https://www.asads.ca/images/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content="Home Inspection Service Areas | 106 Cities | ASADS" />
        <meta name="twitter:description" content="ASADS certified home inspectors serve 106 cities across Ontario. Same-day reports. Book online." />
        <meta name="twitter:image" content="https://www.asads.ca/images/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://www.asads.ca/#localbusiness",
          "name": "ASADS Home Inspection",
          "url": "https://www.asads.ca",
          "telephone": "+16478019311",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "45 Duckworth Rd",
            "addressLocality": "Cambridge",
            "addressRegion": "ON",
            "postalCode": "N3H 0C1",
            "addressCountry": "CA"
          },
          "areaServed": allLocations.map(loc => ({ "@type": "City", "name": loc.city }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home",          "item": "https://www.asads.ca" },
            { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": "https://www.asads.ca/locations" }
          ]
        })}</script>
      </Helmet>

      {/* 1. HERO */}
      <HeroBookingSection
        badge="106 Cities · GTA & Ontario · OAHI & InterNACHI Certified"
        title="Home Inspection Service Areas in Ontario"
        subtitle={
          <>
            ASADS certified home inspectors cover <strong className="text-white">106 cities</strong> across the Greater Toronto Area and Ontario — from Toronto and Mississauga to Barrie, Hamilton, Kitchener, and beyond. <strong className="text-white">Same-day digital reports</strong> delivered after every inspection.
          </>
        }
        priceCards={[
          { label: "Pre-Purchase",    price: "From $399" },
          { label: "Condo",          price: "From $299" },
          { label: "New Construction", price: "From $449" },
          { label: "Same-Day",       price: "Digital Report" },
        ]}
        formTitle="Book in Your City"
        ctaPrimary={{ text: "Find Your City Below", href: "#all-cities" }}
      />

      {/* 2. SOCIAL PROOF BAR */}
      <section className="py-5 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <div>
                <span className="font-extrabold text-white text-sm">4.9/5</span>
                <span className="text-slate-400 text-xs ml-1">· 1,500+ reviews</span>
              </div>
            </div>
            {[
              { value: "106",    label: "Cities Served" },
              { value: "2,000+", label: "Inspections Done" },
              { value: "14",     label: "Specialty Services" },
              { value: "OAHI",   label: "& InterNACHI Cert." },
              { value: "E&O",    label: "Insured" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-sm font-extrabold text-white">{item.value}</div>
                <div className="text-xs text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED CITIES */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Service Areas</h2>
            <p className="text-gray-500">Our most-booked cities — click any to see local inspection details, neighbourhoods & pricing.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/${city.slug}`}
                className="relative bg-white border border-gray-100 hover:border-blue-400 hover:shadow-md rounded-xl p-4 text-center transition-all group"
              >
                {city.tag && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                    {city.tag}
                  </span>
                )}
                <MapPin className="h-5 w-5 text-blue-500 mx-auto mb-2 group-hover:text-blue-700 transition-colors" />
                <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{city.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">Home Inspector</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEO CONTENT BLOCK */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Certified Home Inspectors Across Ontario
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4 text-sm">
              <p>
                ASADS Home Inspection is a mobile inspection company serving <strong>106 cities across Ontario</strong> — from the Greater Toronto Area (Toronto, Mississauga, Brampton, Vaughan, Markham) to the Hamilton-Niagara corridor, Kitchener-Waterloo-Cambridge, Barrie, Peterborough, and beyond. Every inspection is performed by <strong>OAHI-certified, InterNACHI-trained inspectors</strong> carrying full errors &amp; omissions and $2M liability insurance.
              </p>
              <p>
                Each city page includes local property insights — neighbourhood-specific building stock issues, common defects in that area's housing era, and proximity to environmental concerns — so your report is relevant to your specific location, not generic boilerplate. Whether you're buying in a 1960s Toronto semi or a 2023 Brampton new-build, our inspectors understand what to look for.
              </p>
              <p>
                Our <strong>14 specialty services</strong> — including radon testing, mold inspection, asbestos sampling, WETT, thermal imaging, sewer scope, and well water testing — are available in every city we serve, either bundled with a standard inspection or standalone.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {[
                { icon: Award,    label: "OAHI & InterNACHI Certified",  sub: "Licensed under Ontario's Home Inspection Act, 2017" },
                { icon: FileText, label: "Same-Day Digital Reports",      sub: "Photos, severity ratings, maintenance notes — same day" },
                { icon: Clock,    label: "7 Days a Week",                 sub: "Book online or call — confirmed instantly" },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <Icon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEARCH + ALL CITIES */}
      <section id="all-cities" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">All {totalLocations} Service Areas</h2>
            <p className="text-gray-500 text-sm">Search your city or browse the full list</p>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search your city or town…"
                className="pl-10 py-3 text-base bg-white border-gray-200 focus:border-blue-400 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {filteredCities.length} result{filteredCities.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
            )}
          </div>

          {/* Flat city grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 max-w-6xl mx-auto">
            {filteredCities.map((loc) => (
              <Link
                key={loc.slug}
                to={loc.href}
                className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-100 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all group text-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 group-hover:text-blue-600" />
                <span className="flex-1 truncate text-gray-700 group-hover:text-blue-700 font-medium">{loc.city}</span>
                {loc.popular && (
                  <span className="text-[9px] uppercase tracking-wider bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold flex-shrink-0">
                    Top
                  </span>
                )}
              </Link>
            ))}
          </div>

          {filteredCities.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No cities match "{searchQuery}". Call{" "}
              <a href="tel:6478019311" className="text-blue-600 font-semibold">(647) 801-9311</a>
              {" "}— we may still serve your area.
            </p>
          )}

          {!searchQuery && (
            <p className="text-center text-gray-400 text-sm mt-8">
              Don't see your city?{" "}
              <a href="tel:6478019311" className="text-blue-600 font-semibold hover:underline">
                Call (647) 801-9311
              </a>{" "}
              — we may still serve your area.
            </p>
          )}
        </div>
      </section>

      {/* 6. WHAT YOU GET ON EACH CITY PAGE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's on Each City Page</h2>
              <p className="text-gray-500 text-sm">Every location page is custom-built — not a template fill-in.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: MapPin,    label: "Local Property Insights",  desc: "Common defects specific to that city's housing stock and era" },
                { icon: Shield,    label: "Neighbourhood Coverage",   desc: "All neighbourhoods listed — we inspect every part of the city" },
                { icon: FileText,  label: "Same-Day Report Details",  desc: "What your report includes and how to read it" },
                { icon: CheckCircle, label: "14 Services Available",  desc: "Every specialty service is bookable in every city" },
                { icon: Star,      label: "Local Reviews",            desc: "Verified client feedback from buyers in your area" },
                { icon: Clock,     label: "Instant Booking",          desc: "Book directly on the city page — no phone tag required" },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <Icon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Book Your Inspection Today
              </h2>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                Available 7 days a week across all 106 cities. Confirmed instantly — no waiting on a callback.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Same-day availability 7 days a week",
                  "Same-day digital report after every inspection",
                  "OAHI & InterNACHI certified inspectors",
                  "Fully insured — E&O + $2M liability",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-blue-100 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="tel:6478019311"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5" />
                (647) 801-9311
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-2xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Same-Day Availability</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">Book Your Inspection</h3>
              <p className="text-sm text-gray-500 mb-5">Confirmed instantly. We may call if a time adjustment is needed.</p>
              <div className="space-y-3">
                <a
                  href="/booking"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg text-center transition-colors text-sm"
                >
                  Open Full Booking Form →
                </a>
                <p className="text-center text-xs text-gray-400">
                  or call{" "}
                  <a href="tel:6478019311" className="text-blue-600 font-semibold">(647) 801-9311</a>
                  {" "}— 7 days a week
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrphanLocationLinks />
    </Layout>
  );
}
