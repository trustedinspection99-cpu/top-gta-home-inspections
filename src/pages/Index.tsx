import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SITE_URL } from "@/lib/seo";
import { 
  CheckCircle2, Shield, Clock, MapPin, Search, Calendar,
  Home, Zap, Droplets, Thermometer, Construction, 
  AlertTriangle, BadgeCheck, FileText, BarChart, Info,
  ChevronRight, ChevronDown, Phone, Instagram, Facebook, Youtube, Twitter, Video,
  Award, Users, FileCheck, Building, ArrowRight, Star,
  DollarSign, Calculator, Download, BookOpen, CheckSquare,
  AlertCircle, Home as HomeIcon, BarChart3, Settings,
  Wind, FlaskConical, Droplet, Eye, Radio, Wrench,
  ThermometerSun, Waves, Factory, WavesIcon, ShieldAlert, HardHat
} from "lucide-react";

// --- ONTARIO-FOCUSED FAQS ---
const homepageFaqs = [
  {
    question: "How much does a home inspection cost in Ontario?",
    answer: "In Ontario, home inspection costs range from $400-$600 for single-family homes and $350-$450 for condos. Prices vary by property size, age, and location. ASADS offers transparent pricing with no hidden fees. Call (647) 801-9311 for an exact quote tailored to your Ontario property.",
  },
  {
    question: "What's included in a full home inspection in Ontario?",
    answer: "Our Ontario home inspections include 200+ points covering foundation, roof, electrical, plumbing, HVAC, insulation, windows, doors, and safety systems. We follow OAHI standards and include thermal imaging, moisture detection, and comprehensive digital reporting.",
  },
  {
    question: "Which home inspection services include radon testing in Ontario?",
    answer: "Radon testing is available as an add-on service with any inspection. Ontario has varying radon levels, especially in basements. We use certified long-term testing devices and provide Health Canada-compliant reports within 48-96 hours.",
  },
  {
    question: "What are the biggest red flags in Ontario home inspections?",
    answer: "Top red flags in Ontario: foundation cracks from freeze-thaw cycles, knob & tube wiring (insurance issues), aluminum wiring, asbestos in older homes, mold from poor ventilation, and outdated electrical panels. These are common in Ontario's aging housing stock.",
  },
  {
    question: "How do I book a certified home inspector in Toronto?",
    answer: "Book online instantly at asads.ca/booking for Toronto and GTA. Our certified OAHI inspectors are available 7 days a week with same-day booking options for urgent pre-purchase inspections throughout Ontario.",
  },
  {
    question: "Do you offer WETT inspections for wood stoves in Ontario?",
    answer: "Yes, we provide certified WETT inspections across Ontario to ensure wood-burning appliances meet safety standards and insurance requirements. This is essential for rural Ontario properties and homes with fireplaces.",
  },
  {
    question: "What specialty inspections are most common in Ontario?",
    answer: "Most requested Ontario specialty inspections: mold testing (especially in basements), asbestos testing (pre-1990 homes), radon testing, WETT certifications, and well water testing for rural properties.",
  },
  {
    question: "How long does a home inspection take in Ontario?",
    answer: "A typical home inspection takes 2.5 to 4 hours depending on the size, age, and condition of the property. A small condo may take 90 minutes while a large older home in Toronto's East York or Etobicoke could take 4+ hours. Add-on services like radon or mold testing add additional time.",
  },
  {
    question: "Can a home inspection be used to negotiate the purchase price?",
    answer: "Yes — this is one of the most valuable uses of an inspection report. Significant deficiencies like a failing furnace, roof leaks, or knob-and-tube wiring can be used to request a price reduction, seller repairs before closing, or a credit at closing. Your realtor can guide you through the negotiation using our report.",
  },
  {
    question: "Is a home inspection worth it for a newer home in Ontario?",
    answer: "Absolutely. Even homes built in the last 10 years can have construction deficiencies, improperly installed systems, moisture issues, or code violations. Many builders in Vaughan, Brampton, and Mississauga make shortcuts that only become apparent after a few years. An inspection on a newer home is just as important as on an older one.",
  },
  {
    question: "Do home inspectors check for mold in Ontario?",
    answer: "Standard home inspectors look for visible signs of mold and moisture damage during the inspection. If mold is suspected, we recommend a dedicated mold inspection with air and surface sampling. Ontario's humid summers make basement mold especially common — particularly in older Toronto-area homes with inadequate ventilation.",
  },
  {
    question: "What is a pre-listing inspection and do I need one as a seller?",
    answer: "A pre-listing inspection is a home inspection ordered by the seller before listing the property. It lets you identify and fix issues before buyers find them, price your home accurately, and provide transparency that builds buyer confidence. In Ontario's market, a pre-listing inspection can reduce conditional offers and speed up closing.",
  },
  {
    question: "Do you offer same-day home inspection reports?",
    answer: "Yes — same-day home inspection reports are standard at ASADS. We deliver detailed digital reports the same day as the inspection in the vast majority of cases. Reports include photographs, categorized findings, and maintenance recommendations formatted for sharing directly with your realtor or lawyer. Same-day inspection bookings are available 7 days a week across the GTA and Southern Ontario.",
  },
];

// --- YOUR ONTARIO SERVICES ---
const featuredServiceAreas = [
  { name: "Toronto",       slug: "home-inspection-toronto" },
  { name: "Mississauga",   slug: "home-inspection-mississauga" },
  { name: "Brampton",      slug: "home-inspection-brampton" },
  { name: "Vaughan",       slug: "home-inspection-vaughan" },
  { name: "Markham",       slug: "home-inspection-markham" },
  { name: "Hamilton",      slug: "home-inspection-hamilton" },
  { name: "Oakville",      slug: "home-inspection-oakville" },
  { name: "Barrie",        slug: "home-inspection-barrie" },
  { name: "Kitchener",     slug: "home-inspection-kitchener" },
  { name: "Oshawa",        slug: "home-inspection-oshawa" },
  { name: "Richmond Hill", slug: "home-inspection-richmond-hill" },
  { name: "Guelph",        slug: "home-inspection-guelph" },
];

// --- ONTARIO-SPECIFIC RED FLAGS ---
const ontarioRedFlags = [
  "Foundation Cracks (Freeze-Thaw Damage)",
  "Knob & Tube Wiring (Insurance Decline)",
  "Aluminum Wiring Hazards",
  "Asbestos in Pre-1990 Homes",
  "Basement Moisture & Mold",
  "Roof Ice Dam Damage",
  "Improper Attic Ventilation",
  "Poly-B Plumbing Pipes",
  "Oil Tank Concerns",
  "Wood Stove Safety Issues"
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ASADS Home Inspection",
  "image": `${SITE_URL}/images/og-default.jpg`,
  "url": SITE_URL,
  "telephone": "+16478019311",
  "priceRange": "$400-$600",
  "description": "Certified home inspector in Toronto, GTA & Ontario. OAHI-certified with 14 specialty inspection services including radon, mold, WETT & asbestos testing. Same-day digital reports.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "45 Duckworth Rd",
    "addressLocality": "Cambridge",
    "addressRegion": "ON",
    "postalCode": "N3H 0C1",
    "addressCountry": "CA"
  },
  "areaServed": {
    "@type": "State",
    "name": "Ontario",
    "addressCountry": "CA"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "reviewCount": 1500,
    "bestRating": "5"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.instagram.com/asadsinspection",
    "https://www.facebook.com/asadsinspection"
  ]
};

const Index = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', service: '', preferred_date: '', time_slot: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/mnjnzzoz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || 'Not specified',
          address: formData.city,
          preferred_date: formData.preferred_date || 'Flexible',
          preferred_time: formData.time_slot,
        }),
      });
      setFormStatus(res.ok ? 'sent' : 'error');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <Layout>
      <Helmet>
        <link rel="canonical" href="https://www.asads.ca/" />
        <title>Home Inspector Ontario | Home Inspection | ASADS</title>
        <meta name="description" content="Certified home inspection across Ontario from $399. OAHI & InterNACHI certified inspectors, same-day digital reports, 106 cities. Radon, mold, WETT & asbestos. Book online 24/7." />
        {/* Open Graph */}
        <meta property="og:title" content="Home Inspection Ontario | Certified Inspector | ASADS" />
        <meta property="og:description" content="Certified home inspection across Ontario from $399. OAHI & InterNACHI certified, same-day reports, 106 cities. Radon, mold, WETT & asbestos. Book online 24/7." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ASADS Home Inspection - Ontario Certified Home Inspector Services" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content="Home Inspection Ontario | Certified Inspector | ASADS" />
        <meta name="twitter:description" content="Certified home inspection across Ontario from $399. OAHI certified, same-day reports, 106 cities. Radon, mold, WETT & asbestos. Book 24/7." />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />
        
        {/* Additional Meta Tags */}
        <meta name="keywords" content="home inspector ontario, house inspection ontario, home inspection ontario, certified home inspector, home inspector near me, same day home inspection, home inspection GTA, home inspector toronto, mold inspection ontario, mold testing ontario, pre-listing home inspection ontario, home inspection cost ontario, WETT inspection ontario, PDI inspection ontario, asbestos testing ontario, radon testing ontario, commercial inspection ontario" />
        
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      {/* 1. ONTARIO-FOCUSED HERO */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=75&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/92 to-blue-800/88" />
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-700/30 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-blue-600">
                <Award className="h-4 w-4" />
                <span className="text-sm font-medium">OAHI Certified • Serving Ontario Since 2009</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-tight">
                Home Inspection Ontario
              </h1>

              {/* Stars — prominent, early */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-white text-lg">4.9</span>
                <span className="text-blue-200 text-sm">· 1,500+ verified client reviews · InterNACHI & OAHI certified</span>
              </div>

              <p className="text-lg mb-7 opacity-95 leading-relaxed">
                Book a trusted home inspection in Ontario. Certified inspectors, clear digital reports,
                fast scheduling, and calm guidance you can trust. Serving <strong className="text-white">106 cities</strong> across the GTA and Ontario.
              </p>

              {/* Price callout */}
              <div className="flex flex-wrap gap-3 mb-7">
                {[
                  { label: "Pre-Purchase Inspection", price: "From $399", href: "/services/pre-purchase" },
                  { label: "Pre-Listing Inspection", price: "From $399", href: "/services/pre-listing" },
                  { label: "Condo Inspection", price: "From $299", href: "/services/condo" },
                  { label: "New Construction / PDI", price: "From $449", href: "/services/new-construction" },
                ].map(s => (
                  <a key={s.label} href={s.href} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm hover:bg-white/20 transition-colors">
                    <span className="text-blue-200">{s.label} — </span>
                    <span className="font-bold text-green-300">{s.price}</span>
                  </a>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/booking" className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                  Book Your Inspection
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
                <a href="tel:6478019311" className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Phone size={20} />
                  (647) 801-9311
                </a>
              </div>
            </div>

            {/* Right: inline booking form */}
            <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-2xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Same-Day Availability</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-1">Book Your Inspection</h2>
              <p className="text-sm text-gray-500 mb-5">Your appointment is confirmed. Should any scheduling changes be required, we will contact you within 24 hours.</p>

              {formStatus === 'sent' ? (
                <div className="py-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    <p className="font-bold text-lg text-gray-900">Appointment Confirmed</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-200 text-sm mb-4">
                    {formData.service && (
                      <div className="flex justify-between px-4 py-2.5">
                        <span className="text-gray-500">Service</span>
                        <span className="font-medium text-gray-900 text-right max-w-[55%]">{formData.service}</span>
                      </div>
                    )}
                    {formData.city && (
                      <div className="flex justify-between px-4 py-2.5">
                        <span className="text-gray-500">Address</span>
                        <span className="font-medium text-gray-900 text-right max-w-[55%]">{formData.city}</span>
                      </div>
                    )}
                    {formData.preferred_date && (
                      <div className="flex justify-between px-4 py-2.5">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium text-gray-900">{formData.preferred_date}</span>
                      </div>
                    )}
                    {formData.time_slot && (
                      <div className="flex justify-between px-4 py-2.5">
                        <span className="text-gray-500">Time</span>
                        <span className="font-medium text-gray-900">{formData.time_slot}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs text-center">Should any scheduling changes be required, we will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Inspection Type *</label>
                    <select
                      required
                      value={formData.service}
                      onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select a service…</option>
                      <option>Pre-Purchase Home Inspection — From $399</option>
                      <option>Pre-Listing Inspection — From $399</option>
                      <option>Condo Inspection — From $299</option>
                      <option>New Construction / PDI — From $449</option>
                      <option>Mold Inspection & Testing — From $299</option>
                      <option>Radon Testing — From $499</option>
                      <option>Thermal Imaging — Included / Standalone Quoted</option>
                      <option>Sewer Scope — From $299</option>
                      <option>Asbestos Testing — From $299</option>
                      <option>WETT Inspection — From $249</option>
                      <option>Commercial Inspection</option>
                      <option>Air Quality Testing — From $299</option>
                      <option>Other / Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Property Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="123 Main St, Toronto, ON"
                      value={formData.city}
                      onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.preferred_date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setFormData(p => ({ ...p, preferred_date: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Preferred Time</label>
                      <select
                        value={formData.time_slot}
                        onChange={e => setFormData(p => ({ ...p, time_slot: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Any time</option>
                        <option>8:00 AM</option>
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(647) 555-0100"
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email * <span className="font-normal text-gray-400">(confirmation sent here)</span></label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-lg transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {formStatus === 'sending' ? 'Submitting…' : (
                      <><Calendar className="h-4 w-4" /> Book My Inspection</>
                    )}
                  </button>
                  {formStatus === 'error' && (
                    <p className="text-red-500 text-xs text-center">Something went wrong. Call us at (647) 801-9311.</p>
                  )}
                  <p className="text-xs text-gray-400 text-center">Booking confirmed · We'll reach out only if a scheduling change is required</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF BAR */}
      <section className="py-5 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
            {/* Rating block */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div>
                <span className="font-extrabold text-white text-sm">4.9/5</span>
                <span className="text-slate-400 text-xs ml-1">· 1,500+ reviews</span>
              </div>
            </div>
            {/* Stats */}
            {[
              { value: "2,000+", label: "Inspections Completed" },
              { value: "15+", label: "Years in Ontario" },
              { value: "106", label: "Cities Served" },
              { value: "OAHI & InterNACHI", label: "Certified" },
              { value: "Intact Insured", label: "Fully Covered" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-sm font-extrabold text-white">{item.value}</div>
                <div className="text-xs text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Certified Home Inspection Services in Ontario
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From standard pre-purchase inspections to 14 specialty services — all under one roof
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { name: "Pre-Purchase Inspection", icon: Home, href: "/services/pre-purchase", description: "Complete evaluation before buying — covers 200+ points across every major system." },
              { name: "Pre-Listing Inspection", icon: FileText, href: "/services/pre-listing", description: "Sellers: find and fix issues before buyers do. Price confidently, close faster." },
              { name: "New Construction", icon: Construction, href: "/services/new-construction", description: "Phase and final inspections for new builds — builders miss things, we find them." },
              { name: "Condo Inspection", icon: Building, href: "/services/condo", description: "Unit-level inspection covering everything inside your condo or apartment." },
              { name: "Radon Testing", icon: Radio, href: "/services/radon-testing", description: "Long-term radon detection for Ontario basements. Health Canada compliant reports." },
              { name: "Mold Inspection", icon: Droplets, href: "/services/mold-inspection", description: "Air quality and surface sampling — especially important in Ontario's humid climate." },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <a
                  key={index}
                  href={service.href}
                  className="bg-white rounded-xl border hover:shadow-md transition-all duration-300 p-6 group hover:border-blue-300 flex gap-4"
                >
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-lg group-hover:bg-blue-100 transition-colors h-fit">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{service.name}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Same-Day — full-width featured card */}
          <a
            href="/services/same-day-home-inspection"
            className="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-10 group hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
          >
            <div className="bg-white/20 p-4 rounded-xl shrink-0">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                <Zap className="h-3 w-3" /> Available Today
              </div>
              <h3 className="text-xl font-bold mb-1">Same-Day Home Inspection</h3>
              <p className="text-blue-100 text-sm">Call before noon — inspector arrives today. No rush surcharge. 7 days a week across Ontario.</p>
            </div>
            <div className="flex items-center gap-2 bg-white text-blue-700 font-bold px-5 py-3 rounded-lg shrink-0 group-hover:bg-gray-100 transition-colors">
              Book Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          <div className="text-center">
            <a href="/services" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all">
              See All 14 Inspection Services
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* 4. RED FLAGS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-5">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-bold">Ontario Home Buyers Alert</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Top Red Flags in Ontario Home Inspections
          </h2>
          <p className="text-gray-600 mb-6">
            Ontario's climate and aging housing stock create unique risks. These are the most common costly issues our inspectors find.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Foundation Cracks (Freeze-Thaw)", icon: AlertTriangle, color: "text-red-500 bg-red-50", border: "border-red-100" },
              { label: "Knob & Tube Wiring", icon: Zap, color: "text-orange-500 bg-orange-50", border: "border-orange-100" },
              { label: "Aluminum Wiring Hazards", icon: ShieldAlert, color: "text-yellow-600 bg-yellow-50", border: "border-yellow-100" },
              { label: "Asbestos in Pre-1990 Homes", icon: FlaskConical, color: "text-purple-500 bg-purple-50", border: "border-purple-100" },
              { label: "Basement Moisture & Mold", icon: Droplets, color: "text-blue-500 bg-blue-50", border: "border-blue-100" },
              { label: "Roof Ice Dam Damage", icon: Waves, color: "text-cyan-600 bg-cyan-50", border: "border-cyan-100" },
            ].map((flag, i) => {
              const Icon = flag.icon;
              return (
              <div key={i} className={`flex items-center gap-3 ${flag.color.split(' ')[1]} border ${flag.border} rounded-lg px-4 py-3`}>
                <div className={`${flag.color.split(' ')[0]} shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-gray-800 text-sm font-semibold leading-tight">{flag.label}</span>
              </div>
              );
            })}
          </div>
          <a href="/blog/common-issues-toronto-homes" className="inline-flex items-center gap-2 text-blue-700 font-bold hover:text-blue-800 text-sm">
            See all red flags + what they cost to fix
            <ArrowRight size={14} />
          </a>
        </div>
      </section>


      {/* LIFESTYLE / TRUST PHOTO SECTION */}
      <section className="py-0 bg-white">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-xl">
            {/* Photo */}
            <div className="relative min-h-[320px]">
              <img
                src="/images/thermal-inspection-opt.jpg"
                alt="Certified home inspector examining a property in Ontario"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Content */}
            <div className="bg-gray-900 text-white p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-bold px-3 py-1.5 rounded-full mb-5 w-fit">
                <HardHat className="h-4 w-4" /> OAHI Certified Inspector
              </div>
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                What Happens During Your Inspection?
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your inspector spends 2–4 hours examining every accessible system — roof, attic, foundation, electrical, plumbing, HVAC, and more. You're invited to walk through. Questions welcome.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "200+ point visual evaluation",
                  "Thermal imaging + moisture meters included",
                  "Digital report delivered within 24 hours",
                  "Plain-language summary — no jargon",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-200">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/booking" className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors w-fit">
                Book Your Inspection <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOME INSPECTOR NEAR ME */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-bold">Home Inspector Near Me</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Find the Best Home Inspector Near Me in Ontario
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                When you search for a <strong>home inspector near me</strong> in Ontario, you need more than just the closest available inspector — you need a certified professional who knows your local housing stock, understands Ontario building codes, and delivers a report you can actually act on. ASADS Home Inspection is one of Ontario's top-rated home inspection companies, serving over 100 cities and towns across the GTA and beyond.
              </p>
              <p>
                Whether you're buying a pre-war bungalow in East York, a new build in Vaughan, a century home in Cobourg, or a condo in downtown Mississauga, our certified inspectors have seen it all. We bring local knowledge to every inspection — understanding that a 1950s home in Scarborough has very different concerns than a 2015 townhouse in Brampton. That local expertise is what separates a great home inspector from a generic one.
              </p>
              <p>
                As one of the <strong>best home inspection companies near me</strong> for GTA residents, ASADS offers same-day bookings 7 days a week, comprehensive digital reports delivered within 24 hours, and 14 specialty services under one roof. No matter which Ontario city you're in, you can reach us at <a href="tel:6478019311" className="text-blue-700 font-semibold hover:underline">(647) 801-9311</a> or <a href="/booking" className="text-blue-700 font-semibold hover:underline">book online instantly</a>.
              </p>
              <p>
                Looking for a <strong>top home inspection company near me</strong> with verified reviews? ASADS has completed over 2,000 inspections across Ontario with a 4.9-star rating and 1,500+ verified client reviews. Our OAHI-certified inspectors carry full Intact insurance and use professional-grade equipment including thermal imaging cameras, moisture meters, and gas detectors on every inspection — not just on request.
              </p>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Same-Day Booking", desc: "Available 7 days a week across Ontario" },
                { label: "24-Hr Digital Report", desc: "Detailed photos, findings & recommendations" },
                { label: "OAHI Certified", desc: "Fully insured — Intact Insurance" },
              ].map((item, i) => (
                <div key={i} className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <div className="font-bold text-gray-900 mb-1">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE A CERTIFIED HOME INSPECTOR */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
              <BadgeCheck className="h-4 w-4" />
              <span className="text-sm font-bold">Why Certification Matters</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose a Certified Home Inspector in Ontario?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4 mb-10">
              <p>
                In Ontario, anyone can legally call themselves a home inspector — there is no mandatory provincial licensing. That means the difference between the <strong>best home inspector</strong> and an unqualified one comes down to their certifications, training, and track record. ASADS inspectors hold OAHI (Ontario Association of Home Inspectors) certification, which requires rigorous training, field experience, and ongoing education to maintain.
              </p>
              <p>
                A certified inspector follows a standardized methodology, carries professional liability insurance, and provides legally defensible reports. This matters enormously if deficiencies are discovered after closing — a certified inspection report is your documentation. An uncertified inspection from a non-credentialed individual offers you no such protection.
              </p>
              <p>
                ASADS has served Ontario homebuyers and sellers since 2009. In that time, we have developed deep expertise in Ontario's most common housing issues: knob and tube wiring in pre-1960 homes, aluminum wiring in 1970s properties, Kitec plumbing failures, ice dam damage in older attics, UFFI insulation, and foundation cracking from Ontario's freeze-thaw cycles. We find what other inspectors miss — and we explain it in plain language so you can make an informed decision.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "OAHI Certified Inspectors", desc: "Ontario's highest professional standard for home inspectors, requiring rigorous training and ongoing education." },
                { title: "Intact Insurance Coverage", desc: "Full Intact and liability coverage protects you if something is missed or misidentified during the inspection." },
                { title: "15+ Years in Ontario", desc: "Over a decade of inspecting Ontario homes means we know exactly what to look for in every property type and era." },
                { title: "200+ Point Inspection", desc: "Comprehensive evaluation of every major system and component including structure, electrical, plumbing, HVAC, and envelope." },
                { title: "Thermal Imaging Included", desc: "We include infrared scanning on every inspection at no extra charge — revealing hidden moisture, insulation gaps, and electrical hot spots." },
                { title: "Same-Day Reports", desc: "Receive your full digital report with photos, findings, and recommendations within 24 hours — often the same day." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-green-100 text-green-700 p-2 rounded-lg h-fit">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                    <div className="text-gray-600 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. HOW A HOME INSPECTION WORKS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How a Home Inspection Works in Ontario</h2>
              <p className="text-gray-600 text-lg">From booking to report — here's exactly what to expect</p>
            </div>
            <div className="space-y-6 mb-10">
              {[
                {
                  step: "01",
                  title: "Book Online or By Phone",
                  desc: "Schedule your inspection instantly online at asads.ca/booking or call (647) 801-9311. We offer same-day and next-day appointments 7 days a week across Ontario. Tell us the property address, type, and approximate square footage — that's all we need to get you booked."
                },
                {
                  step: "02",
                  title: "The Inspection Day (2.5 – 4 Hours)",
                  desc: "Your OAHI-certified inspector arrives on time and conducts a thorough top-to-bottom evaluation of the property. We inspect the roof, attic, foundation, structure, electrical panel, plumbing, HVAC, insulation, windows, doors, and all accessible areas. Thermal imaging and moisture scanning are included on every inspection. We encourage clients to attend — it's the best way to understand your future home."
                },
                {
                  step: "03",
                  title: "Digital Report Within 24 Hours",
                  desc: "Your detailed report is delivered by email — typically the same day or within 24 hours of inspection completion. Reports include categorized findings (major defects, safety issues, maintenance items), photographs of every concern, and plain-language explanations. Reports are formatted to share directly with your realtor, lawyer, or contractor."
                },
                {
                  step: "04",
                  title: "Post-Inspection Support",
                  desc: "Have questions after reading your report? Call or email us — we're happy to clarify findings, explain severity, or help you understand what a repair might involve. Our goal is to make sure you walk away fully informed, not just handed a document."
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 bg-gray-50 rounded-xl border">
                  <div className="text-4xl font-black text-blue-200 leading-none min-w-[3rem]">{item.step}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a href="/booking" className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all">
                Book Your Inspection Now
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. ONTARIO CITIES WE SERVE — TEXT */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Home Inspection Services Across Ontario
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4 mb-10">
              <p>
                ASADS provides certified home inspections across the Greater Toronto Area and throughout Ontario. Our primary service areas include <a href="/locations/home-inspection-toronto" className="text-blue-700 hover:underline font-medium">Toronto</a>, <a href="/locations/home-inspection-mississauga" className="text-blue-700 hover:underline font-medium">Mississauga</a>, <a href="/locations/home-inspection-brampton" className="text-blue-700 hover:underline font-medium">Brampton</a>, <a href="/locations/home-inspection-vaughan" className="text-blue-700 hover:underline font-medium">Vaughan</a>, <a href="/locations/home-inspection-markham" className="text-blue-700 hover:underline font-medium">Markham</a>, <a href="/locations/home-inspection-richmond-hill" className="text-blue-700 hover:underline font-medium">Richmond Hill</a>, <a href="/locations/home-inspection-pickering" className="text-blue-700 hover:underline font-medium">Pickering</a>, <a href="/locations/home-inspection-ajax" className="text-blue-700 hover:underline font-medium">Ajax</a>, <a href="/locations/home-inspection-whitby" className="text-blue-700 hover:underline font-medium">Whitby</a>, and <a href="/locations/home-inspection-oshawa" className="text-blue-700 hover:underline font-medium">Oshawa</a> across Durham Region.
              </p>
              <p>
                We also serve York Region communities including <a href="/locations/home-inspection-aurora" className="text-blue-700 hover:underline font-medium">Aurora</a>, <a href="/locations/home-inspection-newmarket" className="text-blue-700 hover:underline font-medium">Newmarket</a>, <a href="/locations/home-inspection-king-city" className="text-blue-700 hover:underline font-medium">King City</a>, <a href="/locations/home-inspection-stouffville" className="text-blue-700 hover:underline font-medium">Stouffville</a>, <a href="/locations/home-inspection-thornhill" className="text-blue-700 hover:underline font-medium">Thornhill</a>, <a href="/locations/home-inspection-kleinburg" className="text-blue-700 hover:underline font-medium">Kleinburg</a>, <a href="/locations/home-inspection-maple" className="text-blue-700 hover:underline font-medium">Maple</a>, and <a href="/locations/home-inspection-woodbridge" className="text-blue-700 hover:underline font-medium">Woodbridge</a>. Our coverage extends north to <a href="/locations/home-inspection-barrie" className="text-blue-700 hover:underline font-medium">Barrie</a>, <a href="/locations/home-inspection-orillia" className="text-blue-700 hover:underline font-medium">Orillia</a>, and <a href="/locations/home-inspection-peterborough" className="text-blue-700 hover:underline font-medium">Peterborough</a>, west to <a href="/locations/home-inspection-guelph" className="text-blue-700 hover:underline font-medium">Guelph</a>, <a href="/locations/home-inspection-kitchener" className="text-blue-700 hover:underline font-medium">Kitchener</a>, <a href="/locations/home-inspection-cambridge" className="text-blue-700 hover:underline font-medium">Cambridge</a>, and <a href="/locations/home-inspection-hamilton" className="text-blue-700 hover:underline font-medium">Hamilton</a>, and east to <a href="/locations/home-inspection-cobourg" className="text-blue-700 hover:underline font-medium">Cobourg</a> and beyond.
              </p>
              <p>
                Every city presents its own unique housing challenges. Older Peel Region homes often have aluminum wiring and aging HVAC systems. Durham Region properties frequently show foundation movement from clay soil. York Region new builds can have envelope and insulation deficiencies from rushed construction. No matter where your property is in Ontario, our inspectors bring city-specific knowledge backed by 15+ years of inspecting Ontario homes.
              </p>
              <p>
                Don't see your city listed? We serve over 100 Ontario communities. Call <a href="tel:6478019311" className="text-blue-700 font-semibold hover:underline">(647) 801-9311</a> to confirm coverage in your area or <a href="/locations" className="text-blue-700 font-semibold hover:underline">browse our full service area list</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. RECENT BLOG POSTS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ontario Home Inspection Resources</h2>
            <p className="text-gray-600 text-lg">Expert guides written by our certified inspectors</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {[
              {
                title: "First-Time Home Buyer's Complete Inspection Guide",
                excerpt: "Everything first-time buyers need to know about home inspections before purchasing in the GTA.",
                slug: "first-time-home-buyer-inspection-guide",
                category: "Buying Tips"
              },
              {
                title: "10 Common Issues Found in Toronto Homes",
                excerpt: "The most frequent deficiencies our inspectors find in Toronto and GTA properties — and what they cost to fix.",
                slug: "common-issues-toronto-homes",
                category: "Ontario Homes"
              },
              {
                title: "How to Negotiate After a Home Inspection",
                excerpt: "Use your inspection report to negotiate price reductions, credits, or repairs before closing.",
                slug: "negotiating-after-inspection",
                category: "Buying Tips"
              },
            ].map((post, i) => (
              <a key={i} href={`/blog/${post.slug}`} className="group border rounded-xl overflow-hidden hover:shadow-md transition-all">
                <div className="p-6">
                  <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {post.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                    Read Article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a href="/blog" className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-900 hover:text-white transition-all">
              View All Inspection Guides
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 13. ONTARIO FAQS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ontario Home Inspection FAQs
            </h2>
            <p className="text-gray-600 text-lg">
              Answers to common questions about home inspections in Ontario — <a href="/faq" className="text-blue-700 hover:underline font-medium">see all 100+ questions</a>
            </p>
          </div>
          
          <div className="space-y-4">
            {homepageFaqs.slice(0, 5).map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="font-bold text-lg text-gray-900">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="/faq" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all">
              View All 100+ Ontario Home Inspection FAQs
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 8. SOCIAL PROOF & TESTIMONIALS */}
      <TestimonialsSection />

      {/* ONTARIO SERVICE AREAS */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Home Inspector Near Me — Toronto, GTA & Ontario</h2>
            <p className="text-gray-300 text-lg">
              Certified home inspector serving Toronto, the GTA, and communities across Ontario
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
            {featuredServiceAreas.map((city) => (
              <a key={city.slug} href={`/locations/${city.slug}`} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all group">
                <MapPin className="h-5 w-5 text-blue-400 mx-auto mb-2 group-hover:text-blue-300" />
                <span className="font-medium group-hover:text-blue-300 transition-colors">{city.name}</span>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a href="/locations" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all">
              View All 106 Service Areas
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-bold">Same-Day Booking Available</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">
            Ready for Your Ontario Home Inspection?
          </h2>
          <p className="text-xl opacity-95 mb-10 max-w-2xl mx-auto">
            Book online now for certified home inspections across Ontario. 
            Same-day appointments available for urgent pre-purchase inspections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2">
              Book Ontario Inspection Online
              <ArrowRight size={20} />
            </a>
            <a href="tel:6478019311" className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Phone size={20} />
              Call (647) 801-9311
            </a>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>OAHI Certified Inspectors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>Serving All Ontario</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>14+ Specialty Services</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>Same-Day Digital Reports</span>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
