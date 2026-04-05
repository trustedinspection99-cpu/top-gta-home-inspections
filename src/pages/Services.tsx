import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroBookingSection } from "@/components/HeroBookingSection";
import {
  Home,
  Building2,
  Hammer,
  Building,
  Factory,
  Radio,
  Droplets,
  ThermometerSun,
  Flame,
  Wind,
  ShieldAlert,
  ShieldCheck,
  FlaskConical,
  Waves,
  Eye,
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Star,
  Award,
  BadgeCheck,
  Zap,
  MapPin,
  Phone,
  Package,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const mainServices = [
  {
    icon: Home,
    title: "Pre-Purchase Home Inspection",
    description: "The most important step before buying. We assess 400+ points — foundation to roof — so you know exactly what you're buying before you sign.",
    href: "/services/pre-purchase",
    features: ["400+ point checklist", "Same-day digital report", "Thermal imaging option", "Negotiation-ready findings"],
    price: "From $399",
    popular: true,
  },
  {
    icon: Building2,
    title: "Pre-Listing Inspection",
    description: "Sell faster and for more. Find issues before buyers do, price confidently, and attract firm unconditional offers.",
    href: "/services/pre-listing",
    features: ["Identify deal-breakers early", "SPIS disclosure data", "Thermal imaging included", "Marketing-ready report"],
    price: "From $399",
    popular: false,
  },
  {
    icon: Hammer,
    title: "New Construction / PDI Inspection",
    description: "New doesn't mean perfect. We catch builder defects at PDI, 30-Day, and 1-Year Tarion warranty deadlines before coverage lapses.",
    href: "/services/new-construction",
    features: ["PDI + 30-Day + 1-Year stages", "Tarion warranty support", "Infrared included", "Builder defect documentation"],
    price: "From $449",
    popular: false,
  },
  {
    icon: Building,
    title: "Condo Inspection",
    description: "Specialized in-suite inspection — Kitec plumbing, fan coil units, balcony membranes, and everything the status certificate doesn't tell you.",
    href: "/services/condo",
    features: ["Kitec plumbing audit", "Fan coil & HVAC check", "Balcony & window seals", "HOA vs. owner liability map"],
    price: "From $299",
    popular: false,
  },
  {
    icon: Factory,
    title: "Commercial Inspection",
    description: "Institutional-grade property condition assessment for offices, retail, industrial, and multi-unit buildings across Ontario.",
    href: "/services/commercial",
    features: ["ASTM E2018-15 compliant", "CapEx lifecycle analysis", "MEP & life-safety systems", "Phase 1 ESA available"],
    price: "Custom Quote",
    popular: false,
  },
];

const specialtyServices = [
  { icon: Radio,         title: "Radon Testing",        description: "#1 cause of lung cancer in non-smokers. Long-term certified detector, Health Canada compliant report.",    href: "/services/radon-testing",       price: "From $499", duration: "2-visit service" },
  { icon: Droplets,      title: "Mold Inspection",       description: "Air sampling + visual inspection. AIHA-accredited lab results. We don't do remediation — fully independent.", href: "/services/mold-inspection",      price: "From $299", duration: "2–3 hrs" },
  { icon: ThermometerSun,title: "Thermal Imaging",       description: "FLIR infrared finds hidden moisture, insulation gaps, and electrical hotspots without opening a single wall. Included in all inspections.",  href: "/services/thermal-imaging",     price: "Included", duration: "Standalone quoted" },
  { icon: Flame,         title: "WETT Inspection",       description: "Required for home sales and insurance. Certified WETT inspection for fireplaces, wood stoves & inserts.",        href: "/services/wett",                price: "From $249", duration: "1–2 hrs" },
  { icon: Wind,          title: "Air Quality Testing",   description: "VOCs, CO2, particulates & allergens. AIHA-accredited lab. Residential & commercial. Written report.",             href: "/services/air-quality",         price: "From $299", duration: "2–4 hrs" },
  { icon: ShieldAlert,   title: "Asbestos Testing",      description: "Bulk sampling, O.Reg 278/05 compliant, accredited lab results. Pre-1990 homes & renovation projects.",           href: "/services/asbestos-testing",    price: "From $299", duration: "Lab 3–5 days" },
  { icon: FlaskConical,  title: "Lead Paint Testing",    description: "XRF screening and lab analysis. Essential for pre-1980 homes, renovations, and child safety.",                    href: "/services/lead-paint-testing",  price: "From $199", duration: "Lab 5–7 days" },
  { icon: Waves,         title: "Well Water Testing",    description: "MOH-certified test for E.coli, bacteria, nitrates & arsenic. Private wells, cottages & rural Ontario.",          href: "/services/well-water-testing",  price: "From $199", duration: "Lab 5–7 days" },
  { icon: Package,       title: "PDI Inspection",         description: "Independent pre-delivery inspection before Tarion closing. We catch builder deficiencies before you take possession.",                href: "/services/pdi-inspection",      price: "From $349", duration: "2–3 hrs" },
  { icon: Zap,           title: "Same-Day Inspection",    description: "Need an inspection today? Call before noon — inspector arrives same day. No rush surcharge. 106 Ontario cities, 7 days a week.",            href: "/services/same-day-home-inspection", price: "From $299", duration: "Same day" },
  { icon: ShieldCheck,   title: "Forensic Renovation Inspection", description: "Protect your renovation from contractor fraud. Licence verification, OBC compliance at every stage, and forensic-grade reports admissible in court.", href: "/services/contractor-oversight",     price: "From $249/Visit", duration: "Per visit" },
];

const trustItems = [
  { icon: Award,      label: "OAHI & InterNACHI", sub: "Certified inspectors" },
  { icon: Shield,     label: "Intact · $2M Liability", sub: "Fully insured" },
  { icon: FileText,   label: "Same-Day Reports",  sub: "Digital with photos" },
  { icon: Clock,      label: "7 Days a Week",     sub: "Flexible scheduling" },
  { icon: BadgeCheck, label: "15+ Years",         sub: "Serving Ontario" },
  { icon: Zap,        label: "Confirmed Instantly", sub: "No back-and-forth" },
];

const processSteps = [
  { step: "01", title: "Book Online", desc: "Select your service, pick a date, add your address. Takes 2 minutes." },
  { step: "02", title: "Inspection Day", desc: "Certified inspector on-site for 2–4 hrs. You're welcome to attend." },
  { step: "03", title: "Same-Day Report", desc: "Detailed digital report with photos and severity ratings emailed same day." },
  { step: "04", title: "We Explain Everything", desc: "Questions after reading? Call us — we're available to walk you through it." },
];

const cities = [
  { name: "Toronto",       slug: "home-inspection-toronto" },
  { name: "Mississauga",   slug: "home-inspection-mississauga" },
  { name: "Brampton",      slug: "home-inspection-brampton" },
  { name: "Vaughan",       slug: "home-inspection-vaughan" },
  { name: "Markham",       slug: "home-inspection-markham" },
  { name: "Oakville",      slug: "home-inspection-oakville" },
  { name: "Hamilton",      slug: "home-inspection-hamilton" },
  { name: "Burlington",    slug: "home-inspection-burlington" },
  { name: "Richmond Hill", slug: "home-inspection-richmond-hill" },
  { name: "Pickering",     slug: "home-inspection-pickering" },
  { name: "Oshawa",        slug: "home-inspection-oshawa" },
  { name: "Barrie",        slug: "home-inspection-barrie" },
  { name: "Kitchener",     slug: "home-inspection-kitchener" },
  { name: "Guelph",        slug: "home-inspection-guelph" },
  { name: "Whitby",        slug: "home-inspection-whitby" },
  { name: "Newmarket",     slug: "home-inspection-newmarket" },
  { name: "Ajax",          slug: "home-inspection-ajax" },
  { name: "Waterloo",      slug: "home-inspection-waterloo" },
  { name: "Cambridge",     slug: "home-inspection-cambridge" },
  { name: "Brantford",     slug: "home-inspection-brantford" },
  { name: "Aurora",        slug: "home-inspection-aurora" },
  { name: "Stouffville",   slug: "home-inspection-stouffville" },
  { name: "Milton",        slug: "home-inspection-milton" },
  { name: "Niagara Falls", slug: "home-inspection-niagara-falls" },
];

// ─── Schemas ──────────────────────────────────────────────────────────────────

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "ASADS Home Inspection Services",
  "description": "14 certified home inspection services for Ontario buyers, sellers & investors.",
  "url": "https://www.asads.ca/services",
  "numberOfItems": mainServices.length + specialtyServices.length,
  "itemListElement": [
    ...mainServices.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Service",
        "name": s.title,
        "description": s.description,
        "url": `https://www.asads.ca${s.href}`,
        "offers": { "@type": "Offer", "priceCurrency": "CAD", "price": s.price.replace(/[^0-9]/g, "") || "0" }
      }
    })),
    ...specialtyServices.map((s, i) => ({
      "@type": "ListItem",
      "position": mainServices.length + i + 1,
      "item": {
        "@type": "Service",
        "name": s.title,
        "description": s.description,
        "url": `https://www.asads.ca${s.href}`,
        "offers": { "@type": "Offer", "priceCurrency": "CAD", "price": s.price.replace(/[^0-9]/g, "") || "0" }
      }
    }))
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://www.asads.ca" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.asads.ca/services" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How long does a home inspection take in Ontario?", "acceptedAnswer": { "@type": "Answer", "text": "A standard pre-purchase home inspection takes 2–4 hours depending on the size and age of the property. Larger detached homes or properties with complex systems (in-ground pools, multiple HVAC units, crawl spaces) take longer. Condo inspections are typically 1.5–2 hours. You will receive your digital report within 24 hours of the inspection." } },
    { "@type": "Question", "name": "What is the difference between a home inspector and a building inspector?", "acceptedAnswer": { "@type": "Answer", "text": "A municipal building inspector checks that construction meets the Ontario Building Code at specific stages of construction — they are employed by the city, not the buyer. A certified home inspector is hired privately to assess the overall condition of a completed home. Home inspectors provide much broader assessments of workmanship quality, maintenance issues, and system performance that building inspectors do not cover." } },
    { "@type": "Question", "name": "Do I need a home inspection if the house is brand new?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — new construction inspections are especially important. Municipal inspectors only verify minimum code compliance at rough-in stages. They do not check insulation R-values, HVAC balancing, grading drainage, or workmanship quality. Our new construction inspections are timed to Tarion warranty deadlines (PDI, 30-Day, and 1-Year forms) to ensure defects are documented before your coverage lapses." } },
    { "@type": "Question", "name": "Is a home inspection required to buy a house in Ontario?", "acceptedAnswer": { "@type": "Answer", "text": "A home inspection is not legally required in Ontario, but it is strongly recommended. In competitive markets, buyers sometimes waive the inspection condition to strengthen offers — however, this removes your ability to negotiate defects or walk away from a problematic property. An inspection condition in your Agreement of Purchase and Sale gives you the right to cancel if the report reveals serious issues." } },
    { "@type": "Question", "name": "What does a home inspection NOT cover?", "acceptedAnswer": { "@type": "Answer", "text": "Standard home inspections are visual, non-invasive assessments. Inspectors do not open walls, lift flooring, or test for substances such as radon, mold, asbestos, or lead paint. If any of these are a concern, they require separate add-on tests. Inspectors also do not assess the value of the property, predict future failures with certainty, or provide contractor cost estimates — though we explain severity clearly so you can obtain accurate quotes." } },
    { "@type": "Question", "name": "How much does a home inspection cost in Ontario?", "acceptedAnswer": { "@type": "Answer", "text": "Home inspection costs in Ontario typically range from $399–$750 for a standard residential property, depending on size, age, and location. Condo inspections start from $299. Specialty add-ons such as radon testing, mold inspection, or asbestos testing are priced separately. See our full pricing page for transparent, itemized rates — no hidden fees." } },
  ]
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Services() {
  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Services Ontario | 14 Certified Services | ASADS</title>
        <meta name="description" content="14 certified home inspection services for Ontario buyers, sellers & investors. Pre-purchase from $399, condo from $299, radon, mold, asbestos & more. Same-day reports. Book online." />
        <link rel="canonical" href="https://www.asads.ca/services" />
        <meta property="og:title" content="Home Inspection Services Ontario | ASADS" />
        <meta property="og:description" content="14 certified home inspection services in Ontario. Pre-purchase, condo, commercial, radon, mold, asbestos & more. Same-day digital reports." />
        <meta property="og:url" content="https://www.asads.ca/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.asads.ca/images/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Inspection Services Ontario | ASADS" />
        <meta name="twitter:description" content="14 certified home inspection services in Ontario. Pre-purchase from $399. Same-day reports. Book online." />
        <meta name="twitter:image" content="https://www.asads.ca/images/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* 1. HERO */}
      <HeroBookingSection
        badge="OAHI & InterNACHI Certified · 14 Services · 106 Cities"
        title="Home Inspection Services in Ontario"
        subtitle={
          <>
            Every service you need — pre-purchase, condo, new construction, mold, radon, asbestos and more — from <strong className="text-white">one certified team</strong>. Serving 106 cities across the GTA and Ontario with <strong className="text-white">same-day digital reports</strong>.
          </>
        }
        priceCards={[
          { label: "Pre-Purchase", price: "From $399" },
          { label: "Condo", price: "From $299" },
          { label: "Radon Testing", price: "From $499" },
          { label: "Mold Inspection", price: "From $299" },
        ]}
        formTitle="Book Any Service"
        ctaPrimary={{ text: "See All Services Below", href: "#services" }}
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
              { value: "14",    label: "Inspection Services" },
              { value: "106",   label: "Cities Served" },
              { value: "2,000+",label: "Inspections Done" },
              { value: "OAHI",  label: "& InterNACHI Cert." },
              { value: "Intact",  label: "Insured" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-sm font-extrabold text-white">{item.value}</div>
                <div className="text-xs text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAIN INSPECTION SERVICES */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Core Inspection Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our five primary inspection types cover every stage of the real estate transaction — buying, selling, building, and investing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all flex flex-col ${service.popular ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-100"}`}>
                  {service.popular && (
                    <div className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-t-2xl text-center tracking-wide uppercase">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-snug">{service.title}</h3>
                        <span className="text-green-600 font-bold text-sm">{service.price}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>

                    <ul className="space-y-1.5 mb-6">
                      {service.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex gap-2">
                      <a
                        href="/booking"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-4 rounded-lg text-center transition-colors"
                      >
                        Book Now
                      </a>
                      <Link
                        to={service.href}
                        className="flex-1 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 text-sm font-medium py-2.5 px-4 rounded-lg text-center transition-colors"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bundle Card */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-6 text-white flex flex-col shadow-lg">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-bold mb-4 w-fit">
                <Package className="h-3.5 w-3.5" />
                Best Value Bundle
              </div>
              <h3 className="font-bold text-xl mb-2">Pre-Purchase + Mold + Radon</h3>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                Our most complete buyer package. A full home inspection, certified mold air sampling, and long-term radon test — everything you need before closing.
              </p>
              <ul className="space-y-1.5 mb-6">
                {[
                  "400-point home inspection",
                  "AIHA-certified mold air sampling",
                  "90-day Health Canada radon test",
                  "Single coordinated report",
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <p className="text-blue-200 text-xs mb-2">Call for bundle pricing</p>
                <a
                  href="tel:6478019311"
                  className="w-full bg-white text-blue-700 font-bold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  (647) 801-9311
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST STRIP */}
      <section className="py-10 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                  <p className="text-gray-500 text-xs">{item.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SPECIALTY TESTING */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Specialty Testing Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Add any specialty test to your inspection or book standalone. All tests use accredited labs with written reports.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {specialtyServices.map((service, index) => {
              const Icon = service.icon;
              const isLoneLastItem = index === specialtyServices.length - 1 && specialtyServices.length % 3 === 1;
              return (
                <div key={service.title} className={`bg-white rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all p-5 flex gap-4 ${isLoneLastItem ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
                  <div className="h-11 w-11 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">{service.title}</h3>
                      <span className="text-green-600 font-bold text-xs whitespace-nowrap">{service.price}</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />{service.duration}
                      </span>
                      <Link to={service.href} className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1">
                        Details <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-600">From booking to report in 4 steps — faster than you think.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, i) => (
              <div key={step.step} className="text-center">
                <div className="text-5xl font-black text-blue-100 mb-3">{step.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute mt-8 ml-full">
                    <ArrowRight className="h-5 w-5 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SERVICE AREAS */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Serving 106 Cities Across Ontario
            </h2>
            <p className="text-gray-500 text-sm">GTA, Hamilton, Niagara, Kitchener-Waterloo, Barrie & beyond</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/${city.slug}`}
                className="flex items-center gap-1.5 p-2.5 rounded-lg bg-white border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors text-xs text-gray-700 hover:text-blue-700"
              >
                <MapPin className="h-3 w-3 text-blue-400 flex-shrink-0" />
                {city.name}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/locations" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
              View all 106 service areas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Common Questions About Our Services
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "How long does a home inspection take in Ontario?",
                  a: "A standard pre-purchase home inspection takes 2–4 hours depending on the size and age of the property. Larger detached homes or properties with complex systems (in-ground pools, multiple HVAC units, crawl spaces) take longer. Condo inspections are typically 1.5–2 hours. You will receive your digital report within 24 hours of the inspection."
                },
                {
                  q: "What is the difference between a home inspector and a building inspector?",
                  a: "A municipal building inspector checks that construction meets the Ontario Building Code at specific stages of construction — they are employed by the city, not the buyer. A certified home inspector is hired privately to assess the overall condition of a completed home. Home inspectors provide much broader assessments of workmanship quality, maintenance issues, and system performance that building inspectors do not cover."
                },
                {
                  q: "Do I need a home inspection if the house is brand new?",
                  a: "Yes — new construction inspections are especially important. Municipal inspectors only verify minimum code compliance at rough-in stages. They do not check insulation R-values, HVAC balancing, grading drainage, or workmanship quality. Our new construction inspections are timed to Tarion warranty deadlines (PDI, 30-Day, and 1-Year forms) to ensure defects are documented before your coverage lapses."
                },
                {
                  q: "Is a home inspection required to buy a house in Ontario?",
                  a: "A home inspection is not legally required in Ontario, but it is strongly recommended. In competitive markets, buyers sometimes waive the inspection condition to strengthen offers — however, this removes your ability to negotiate defects or walk away from a problematic property. An inspection condition in your Agreement of Purchase and Sale gives you the right to cancel if the report reveals serious issues."
                },
                {
                  q: "What does a home inspection NOT cover?",
                  a: "Standard home inspections are visual, non-invasive assessments. Inspectors do not open walls, lift flooring, or test for substances such as radon, mold, asbestos, or lead paint. If any of these are a concern, they require separate add-on tests. Inspectors also do not assess the value of the property, predict future failures with certainty, or provide contractor cost estimates — though we explain severity clearly so you can obtain accurate quotes."
                },
                {
                  q: "How much does a home inspection cost in Ontario?",
                  a: "Home inspection costs in Ontario typically range from $399–$750 for a standard residential property, depending on size, age, and location. Condo inspections start from $299. Specialty add-ons such as radon testing, mold inspection, or asbestos testing are priced separately. See our full pricing page for transparent, itemized rates — no hidden fees."
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA — inline booking form */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Book?
              </h2>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                Choose your service from the form — or call us and we'll match you to the right inspection in under a minute.
              </p>
              <ul className="space-y-3">
                {[
                  "Same-day availability 7 days a week",
                  "Confirmed instantly — no waiting on callbacks",
                  "Same-day digital report with every inspection",
                  "Fully insured · OAHI & InterNACHI certified",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-blue-100 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a href="tel:6478019311" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Phone className="h-5 w-5" />
                  (647) 801-9311
                </a>
              </div>
            </div>

            {/* Embedded booking form */}
            <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-2xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Same-Day Availability</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">Book Any Service</h3>
              <p className="text-sm text-gray-500 mb-4">Confirmed instantly. We may call if a time adjustment is needed.</p>
              {/* Reuse HeroBookingSection's form by pointing to booking page — keeps it simple */}
              <div className="space-y-3">
                <a href="/booking" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg text-center transition-colors text-sm">
                  Open Full Booking Form →
                </a>
                <p className="text-center text-xs text-gray-400">or call <a href="tel:6478019311" className="text-blue-600 font-semibold">(647) 801-9311</a> — 7 days a week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
