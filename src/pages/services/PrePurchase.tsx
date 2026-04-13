 import { ReactNode } from "react";
 import { Link, useLocation } from "react-router-dom";
 import { Helmet } from "react-helmet-async";
 import { Layout } from "@/components/layout/Layout";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent } from "@/components/ui/card";
 import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
 import { HeroBookingSection } from "@/components/HeroBookingSection";
 import {
   Home,
   CheckCircle,
   Phone,
   Calendar,
   Clock,
   FileText,
   Shield,
   ArrowRight,
   MapPin,
   Thermometer,
   PhoneCall
 } from "lucide-react";
 import { locationData } from "@/data/locationData";

 // Featured locations for service pages internal linking
 const featuredLocations = locationData.map(loc => ({ name: loc.city, slug: loc.slug }));

 const title = "Pre-Purchase Home Inspection";
 const metaTitle = "Pre-Purchase Home Inspection Ontario | From $399 | ASADS";
 const metaDescription = "Certified pre-purchase home inspection Ontario from $399. 400-point checklist, thermal imaging, same-day digital report. GTA & Ontario — book today.";
 const price = "$399-$749";
 const duration = "2-4 Hours";

 const whatWeInspect = [
   "Structural Components & Foundation",
   "Roofing, Flashings & Attic Ventilation",
   "Plumbing Systems & Water Heater",
   "Electrical Systems & Panel",
   "HVAC Equipment & Ductwork",
   "Interior Finishes & Windows",
   "Exterior Envelope & Grading",
   "Basement & Crawl Space",
 ];
 
 const features = [
   {
     title: "InterNACHI Certified Inspectors",
     description: "Our inspectors meet the highest industry standards with ongoing education and training."
   },
   {
     title: "Thermal Imaging Available",
     description: "Optional infrared scanning reveals hidden moisture, insulation gaps, and electrical hotspots."
   },
   {
     title: "Negotiation-Ready Reports",
     description: "Detailed findings help you negotiate repairs or price adjustments with sellers."
   },
   {
     title: "Same-Day Digital Reports",
     description: "Receive your comprehensive inspection report within hours of completion."
   },
 ];
 
 const benefits = [
   "Licensed & Insured Inspectors",
   "Same-Day Report Delivery",
   "Thermal Imaging Available",
   "Lifetime Technical Support",
   "Detailed Photo Documentation",
   "Unbiased Third-Party Evaluation",
   "Intact Insurance Coverage",
   "Flexible Scheduling",
 ];
 
 const faqs = [
   {
     question: "How long does a pre-purchase home inspection take?",
     answer: "A thorough pre-purchase inspection typically requires two to four hours depending on property size, age, and complexity. Larger homes with finished basements, multiple HVAC systems, or older construction often need additional time to properly evaluate all components and systems."
   },
   {
     question: "Should I attend the home inspection?",
     answer: "We strongly encourage buyers to attend their inspection. Walking through the property with your inspector provides valuable insights you won't get from reading a report alone. You can ask questions in real-time, learn about maintenance requirements, and better understand the significance of any issues discovered."
   },
   {
     question: "What if the inspection reveals major problems?",
     answer: "Inspection findings give you negotiating power. You can request repairs from the seller, ask for a price reduction to cover repair costs, or in cases of severe defects, withdraw from the purchase if your offer includes an inspection condition. Our detailed reports help you make informed decisions about how to proceed."
   },
   {
     question: "Are home inspections required in Ontario?",
     answer: "Ontario law does not mandate home inspections for real estate transactions. However, most real estate professionals and mortgage lenders strongly recommend them. Many buyers include an inspection condition in their purchase offers to protect themselves from unexpected repair costs after closing."
   },
   {
     question: "What is not included in a standard pre-purchase inspection?",
     answer: "Standard inspections do not include invasive testing, environmental assessments, or specialized evaluations. We cannot test for radon, asbestos, mold, or lead paint without specific testing services. Pool and spa inspections, septic system evaluations, and WETT inspections for wood-burning appliances require separate appointments with certified specialists."
   },
   {
     question: "When should I schedule my pre-purchase inspection?",
     answer: "Schedule your inspection immediately after your offer is accepted and includes an inspection condition. Most purchase agreements allow five to seven business days for inspection completion. Contact us as soon as your offer is firm to secure your preferred date and ensure adequate time to review findings before your condition deadline."
   }
 ];
 
 const relatedServices = [
   { title: "Same-Day Inspection", href: "/services/same-day-home-inspection" },
   { title: "PDI Inspection", href: "/services/pdi-inspection" },
   { title: "Radon Testing", href: "/services/radon-testing" },
   { title: "WETT Inspection", href: "/services/wett" },
 ];
 
 export default function PrePurchase() {
   const location = useLocation();
   const serviceUrl = getCanonicalUrl(location.pathname);
 
   // Schema 1: LocalBusiness
   const localBusinessSchema = {
     "@context": "https://schema.org",
     "@type": "LocalBusiness",
     "name": "ASADS Home Inspection",
     "image": `${SITE_URL}/images/logo.png`,
     "@id": SITE_URL,
     "url": SITE_URL,
     "telephone": "+16478019311",
     "email": "info@asads.ca",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "45 Duckworth Rd",
       "addressLocality": "Cambridge",
       "addressRegion": "ON",
       "postalCode": "N3H 0C1",
       "addressCountry": "CA"
     },
     "geo": {
       "@type": "GeoCoordinates",
       "latitude": 43.3990,
       "longitude": -80.3271
     },
     "areaServed": [
       { "@type": "State", "name": "Ontario" },
       { "@type": "City", "name": "Toronto" },
       { "@type": "City", "name": "Mississauga" },
       { "@type": "City", "name": "Brampton" },
       { "@type": "City", "name": "Vaughan" }
     ],
     "openingHoursSpecification": {
       "@type": "OpeningHoursSpecification",
       "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
       "opens": "07:00",
       "closes": "22:00"
     },
     "priceRange": "$$"
   };

   // Schema 2: Service
   const serviceSchema = {
     "@context": "https://schema.org",
     "@type": "Service",
     "serviceType": "Pre-Purchase Home Inspection",
     "provider": {
       "@type": "LocalBusiness",
       "name": "ASADS Home Inspection",
       "telephone": "+16478019311",
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
         "name": "Ontario"
       }
     },
     "description": "Comprehensive pre-purchase home inspection services providing detailed assessments of property condition including structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, and interior finishes. Licensed inspectors deliver same-day reports with high-resolution photos.",
     "offers": {
       "@type": "Offer",
       "availability": "https://schema.org/InStock",
       "priceCurrency": "CAD",
       "priceRange": "$399-$749"
     },
     "category": "Home Inspection Services",
     "hasOfferCatalog": {
       "@type": "OfferCatalog",
       "name": "Home Inspection Services",
       "itemListElement": [
         {
           "@type": "Offer",
           "itemOffered": {
             "@type": "Service",
             "name": "Standard Pre-Purchase Inspection"
           }
         },
         {
           "@type": "Offer",
           "itemOffered": {
             "@type": "Service",
             "name": "Comprehensive Inspection with Thermal Imaging"
           }
         }
       ]
     }
   };
 
 
   // Schema 4: BreadcrumbList
   const breadcrumbSchema = {
     "@context": "https://schema.org",
     "@type": "BreadcrumbList",
     "itemListElement": [
       {
         "@type": "ListItem",
         "position": 1,
         "name": "Home",
         "item": getCanonicalUrl("/")
       },
       {
         "@type": "ListItem",
         "position": 2,
         "name": "Services",
         "item": getCanonicalUrl("/services")
       },
       {
         "@type": "ListItem",
         "position": 3,
         "name": "Pre-Purchase Home Inspection",
         "item": serviceUrl
       }
     ]
   };
 
   // Schema 5: Organization
   const organizationSchema = {
     "@context": "https://schema.org",
     "@type": "Organization",
     "name": "ASADS Home Inspection",
     "alternateName": "ASADS",
     "url": SITE_URL,
     "logo": `${SITE_URL}/images/logo.png`,
     "contactPoint": {
       "@type": "ContactPoint",
       "telephone": "+16478019311",
       "contactType": "customer service",
       "email": "info@asads.ca",
       "areaServed": "CA",
       "availableLanguage": ["English"]
     },
     "sameAs": [
       "https://www.facebook.com/share/1ZhWQk97YY/",
       "https://www.instagram.com/asads_home_inspection",
       "https://youtube.com/@asadshomeinspection",
       "https://x.com/AsadsInspection",
       "https://tiktok.com/@asads_home_inspection"
     ],
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "45 Duckworth Rd",
       "addressLocality": "Cambridge",
       "addressRegion": "ON",
       "postalCode": "N3H 0C1",
       "addressCountry": "CA"
     },
     "description": "ASADS Home Inspection provides professional home inspection services across Ontario. Certified inspectors specializing in pre-purchase, new construction, and specialized property assessments."
   };
 
   // Schema 6: WebPage
   const webPageSchema = {
     "@context": "https://schema.org",
     "@type": "WebPage",
     "name": metaTitle,
     "description": metaDescription,
     "url": serviceUrl,
     "inLanguage": "en-CA",
     "isPartOf": {
       "@type": "WebSite",
       "name": "ASADS Home Inspection",
       "url": SITE_URL
     },
     "mainEntity": {
       "@type": "Service",
       "serviceType": "Pre-Purchase Home Inspection"
     },
     "specialty": "Home Inspection Services",
     "about": {
       "@type": "Thing",
       "name": "Pre-Purchase Home Inspection",
       "description": "Comprehensive property evaluation before real estate purchase"
     }
   };
 
   // Schema 7: ProfessionalService
   const professionalServiceSchema = {
     "@context": "https://schema.org",
     "@type": "ProfessionalService",
     "name": "ASADS Home Inspection - Pre-Purchase Services",
     "image": `${SITE_URL}/images/services/pre-purchase-inspection.jpg`,
     "priceRange": "$399-$749",
     "telephone": "+16478019311",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "45 Duckworth Rd",
       "addressLocality": "Cambridge",
       "addressRegion": "ON",
       "postalCode": "N3H 0C1",
       "addressCountry": "CA"
     },
     "geo": {
       "@type": "GeoCoordinates",
       "latitude": 43.3990,
       "longitude": -80.3271
     },
     "url": serviceUrl,
     "paymentAccepted": "Cash, Credit Card, Debit, E-Transfer",
     "openingHours": "Mo-Su 07:00-22:00",
     "review": [
       {
         "@type": "Review",
         "author": {
           "@type": "Person",
           "name": "Sarah Thompson"
         },
         "datePublished": "2025-01-15",
         "reviewBody": "Extremely thorough inspection saved us from buying a home with major foundation issues. The inspector spent over 3 hours examining every detail and provided a comprehensive report same day.",
         "reviewRating": {
           "@type": "Rating",
           "ratingValue": 5,
           "bestRating": "5"
         }
       },
       {
         "@type": "Review",
         "author": {
           "@type": "Person",
           "name": "Michael Chen"
         },
         "datePublished": "2025-01-08",
         "reviewBody": "Professional service from start to finish. The inspector was patient with all my questions and explained everything in terms I could understand. Report was detailed with clear photos.",
         "reviewRating": {
           "@type": "Rating",
           "ratingValue": 5,
           "bestRating": "5"
         }
       }
     ],
     "hasOfferCatalog": {
       "@type": "OfferCatalog",
       "name": "Pre-Purchase Inspection Services",
       "itemListElement": [
         {
           "@type": "OfferCatalog",
           "name": "Standard Inspection",
           "itemListElement": [
             {
               "@type": "Offer",
               "itemOffered": {
                 "@type": "Service",
                 "name": "Complete Home Inspection (up to 2000 sq ft)",
                 "description": "Comprehensive evaluation of all major systems and components"
               },
               "price": "399",
               "priceCurrency": "CAD"
             },
             {
               "@type": "Offer",
               "itemOffered": {
                 "@type": "Service",
                 "name": "Large Home Inspection (2000-3500 sq ft)",
                 "description": "Extended inspection for larger properties"
               },
               "price": "550",
               "priceCurrency": "CAD"
             }
           ]
         },
         {
           "@type": "OfferCatalog",
           "name": "Enhanced Inspection",
           "itemListElement": [
             {
               "@type": "Offer",
               "itemOffered": {
                 "@type": "Service",
                 "name": "Inspection with Thermal Imaging",
                 "description": "Standard inspection plus infrared thermal scanning"
               },
               "price": "650",
               "priceCurrency": "CAD"
             }
           ]
         }
       ]
     }
   };
 
   return (
     <Layout>
       <Helmet>
         <title>{metaTitle}</title>
         <meta name="description" content={metaDescription} />
         <link rel="canonical" href={serviceUrl} />
         
         {/* Open Graph */}
         <meta property="og:site_name" content="ASADS Home Inspection" />
         <meta property="og:type" content="website" />
         <meta property="og:title" content={metaTitle} />
         <meta property="og:description" content={metaDescription} />
         <meta property="og:url" content={serviceUrl} />
         <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
         <meta property="og:image:width" content="1200" />
         <meta property="og:image:height" content="630" />
         <meta property="og:locale" content="en_CA" />
         
         {/* Twitter Card */}
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:site" content="@AsadsInspection" />
         <meta name="twitter:title" content={metaTitle} />
         <meta name="twitter:description" content={metaDescription} />
         <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />
         
         {/* Schema 1: LocalBusiness */}
         <script type="application/ld+json">
           {JSON.stringify(localBusinessSchema)}
         </script>
         
         {/* Schema 2: Service */}
         <script type="application/ld+json">
           {JSON.stringify(serviceSchema)}
         </script>
         
         {/* Schema 3: BreadcrumbList */}
         <script type="application/ld+json">
           {JSON.stringify(breadcrumbSchema)}
         </script>
         
         {/* Schema 5: Organization */}
         <script type="application/ld+json">
           {JSON.stringify(organizationSchema)}
         </script>
         
         {/* Schema 6: WebPage */}
         <script type="application/ld+json">
           {JSON.stringify(webPageSchema)}
         </script>
         
         {/* Schema 7: ProfessionalService */}
         <script type="application/ld+json">
           {JSON.stringify(professionalServiceSchema)}
         </script>
       </Helmet>
 
             <HeroBookingSection
        badge="ASADS Inspection Services · OAHI &amp; InterNACHI Certified"
        title="Pre-Purchase Home Inspection Ontario"
        subtitle="Know exactly what you're buying before you sign. Comprehensive pre-purchase home inspection — from $399, same-day digital reports."
        priceCards={[
          { label: "Pre-Purchase Inspection", price: "From $399" },
          { label: "Same-Day", price: "Digital Report" },
          { label: "Duration", price: duration },
        ]}
        defaultService="Pre-Purchase Home Inspection"
        formTitle="Book Pre-Purchase Inspection"
        ctaPrimary={{ text: "Book This Inspection", href: "/booking" }}
      />

      {/* Main Content */}
       <section className="py-16 md:py-24 bg-background">
         <div className="container">
           <div className="grid lg:grid-cols-3 gap-12">
             {/* Main Content */}
             <div className="lg:col-span-2 space-y-12">
               {/* Description */}
               <div className="prose prose-lg max-w-none">
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                   About Pre-Purchase Home Inspections
                 </h2>
                 <div className="text-muted-foreground space-y-4">
                   <p>
                     Purchasing a home represents one of the largest financial commitments most people make in their lifetime. A pre-purchase inspection provides critical information about the property's condition, revealing both obvious defects and hidden problems that could cost thousands to repair after you take possession.
                   </p>
                   <p>
                     Our certified inspectors examine every accessible component of the home, from the roof structure down to the foundation walls. This comprehensive evaluation identifies current issues, components nearing the end of their service life, and potential safety hazards that require immediate attention.
                   </p>
                   <p>
                     Armed with this knowledge, you can negotiate repairs, adjust your offer price, or walk away from a problem property before making a costly mistake.
                   </p>
 
                   <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">What a Pre-Purchase Inspection Covers</h3>
                   <p>
                     Every inspection follows the Standards of Practice established by the Ontario Association of Home Inspectors. Our evaluations examine all major home systems and structural components to give you a complete picture of the property's condition.
                   </p>
 
                   <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">Structural Components and Foundation</h4>
                   <p>
                     Foundation integrity directly affects your home's long-term stability and value. We examine basement walls for cracks, bowing, or water infiltration. Settlement patterns, support beam condition, and floor system integrity receive careful attention. In crawl spaces, we assess moisture levels, insulation, and vapor barriers that protect against rot and mold growth.
                   </p>
                   <p>
                     Load-bearing walls and posts must adequately support the structure above. We identify unauthorized modifications that compromise structural integrity, such as removed walls or cut joists that weaken floor systems. These issues often remain hidden behind finished surfaces until serious problems develop.
                   </p>
 
                   <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">Exterior Envelope and Roofing</h4>
                   <p>
                     Your home's exterior protects everything inside from Ontario's harsh weather conditions. We evaluate roofing materials for remaining service life, identifying worn shingles, damaged flashing, and inadequate ventilation that lead to premature failure. Attic inspections reveal insulation deficiencies and moisture problems that increase energy costs and promote mold growth.
                   </p>
                   <p>
                     Siding, trim, and window conditions tell us how well the home sheds water. Poor caulking, deteriorated wood, and improper installation allow moisture into wall cavities where it causes hidden damage. Grading around the foundation should slope away from the house to prevent water accumulation that damages basement walls and footings.
                   </p>
 
                   <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">Plumbing Systems and Water Heating</h4>
                   <p>
                     Water supply and drainage systems require proper installation and maintenance to function reliably. We test water pressure at multiple fixtures, checking for adequate flow and identifying pressure issues that indicate corroded pipes or undersized supply lines. Drainage performance reveals slow drains, improper venting, and fixture problems that require attention.
                   </p>
                   <p>
                     Older homes often contain outdated plumbing materials that present problems. Galvanized steel supply pipes corrode internally, reducing water pressure and quality. Polybutylene piping, installed in homes built during the 1980s and 1990s, tends to fail prematurely and leak. Cast iron drain lines develop rust holes after decades of use. We document these conditions so you understand replacement timing and costs.
                   </p>
                   <p>
                     Water heater age and condition affect both safety and efficiency. We verify proper temperature settings, pressure relief valve operation, and venting adequacy for combustion appliances. Sediment buildup, corrosion, and exceeded service life indicate replacement needs you should factor into your purchase decision.
                   </p>
 
                   <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">Electrical Systems and Safety</h4>
                   <p>
                     Electrical hazards present serious fire and shock risks that require immediate correction. Our inspectors evaluate service panel capacity, checking for overloaded circuits, double-tapped breakers, and improper modifications made by previous owners. Panel brands like Federal Pacific and Zinsco contain known defects that increase fire risk.
                   </p>
                   <p>
                     Throughout the home, we test outlets and switches for proper grounding and operation. Ground fault circuit interrupters protect bathrooms, kitchens, and exterior outlets from dangerous shock hazards. Arc fault circuit interrupters, now required by code in bedrooms, prevent fires caused by damaged wiring.
                   </p>
                   <p>
                     Older homes frequently contain outdated wiring that doesn't meet current safety standards. Knob and tube wiring, common in houses built before 1950, lacks grounding protection and cannot safely handle modern electrical loads. Aluminum branch wiring requires special connectors to prevent overheating and fires. We identify these conditions and recommend appropriate upgrades.
                   </p>
 
                   <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">Heating, Cooling and Ventilation</h4>
                   <p>
                     HVAC equipment represents a major expense when replacement becomes necessary. We operate heating systems regardless of season, checking for adequate output, proper combustion, and safe venting. Cracked heat exchangers in furnaces leak carbon monoxide into living spaces, creating a deadly hazard that requires immediate furnace replacement.
                   </p>
                   <p>
                     Air conditioning systems receive operational testing when outdoor temperatures permit. Refrigerant levels, compressor function, and airflow capacity determine cooling performance. Systems over fifteen years old often lack efficiency and reliability, even when still functioning.
                   </p>
                   <p>
                     Ductwork condition affects both efficiency and indoor air quality. We identify disconnected ducts, inadequate insulation, and undersized returns that reduce system performance. Proper duct sealing prevents conditioned air from escaping into attics and crawl spaces where it wastes energy.
                   </p>
 
                   <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">Interior Component Inspection</h4>
                   <p>
                     Inside the home, we examine walls, ceilings, and floors for signs of moisture damage, settlement, and structural movement. Cracks in drywall often indicate minor settling, but severe cracking suggests foundation problems or structural defects requiring engineering evaluation.
                   </p>
                   <p>
                     Window and door operation affects security, energy efficiency, and weatherproofing. We test all accessible windows for smooth operation and proper locking mechanisms. Damaged seals in thermal pane windows allow moisture between glass layers, creating condensation that blocks views and reduces insulation value.
                   </p>
                   <p>
                     Kitchens and bathrooms receive special attention due to their exposure to moisture. We test all fixtures, check for leaks under sinks, and examine caulking and grout that prevent water damage. Bathroom ventilation fans should exhaust to the exterior, not into attics where moisture promotes mold growth and rots structural components.
                   </p>
 
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                     <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                       <Thermometer className="text-primary mb-2" size={32} />
                       <h4 className="font-bold text-foreground">Thermal Imaging</h4>
                       <p className="text-xs text-muted-foreground">Optional infrared scanning to find hidden moisture.</p>
                     </div>
                     <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                       <Clock className="text-accent mb-2" size={32} />
                       <h4 className="font-bold text-foreground">Same-Day Report</h4>
                       <p className="text-xs text-muted-foreground">Digital reports delivered within hours of inspection.</p>
                     </div>
                     <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                       <PhoneCall className="text-primary mb-2" size={32} />
                       <h4 className="font-bold text-foreground">Lifetime Support</h4>
                       <p className="text-xs text-muted-foreground">Phone & email support for as long as you own the home.</p>
                     </div>
                   </div>
                   
                   <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Who Benefits from Pre-Purchase Inspections</h3>
                   <p>
                     First-time homebuyers especially benefit from professional inspections. Without experience evaluating properties, new buyers often overlook serious defects or fail to appreciate the significance of issues they observe. An inspection educates you about the home's systems and components while identifying problems that affect your purchase decision.
                   </p>
                   <p>
                     Seasoned property investors use inspections to accurately estimate repair costs and renovation requirements. Understanding the true condition of investment properties prevents unexpected expenses that destroy profit margins. Inspection findings support accurate property valuations and inform competitive offer prices.
                   </p>
                   <p>
                     Anyone purchasing an older home needs comprehensive inspection services. Houses built decades ago contain materials and construction methods that differ from modern standards. Original systems often exceed their expected service life, requiring replacement in the near future. Identifying these deferred maintenance items helps you budget appropriately for ownership costs.
                   </p>
 
                   <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Common Issues We Discover</h3>
                   <p>
                     Roof defects rank among the most frequent problems found during inspections. Worn shingles, damaged flashing around chimneys and vents, and inadequate attic ventilation shorten roof life and allow water infiltration. Many sellers defer roof replacement, leaving this expensive repair for the new owner.
                   </p>
                   <p>
                     Foundation and grading problems appear regularly in Ontario homes. Improper grading directs water toward foundations instead of away, causing basement moisture issues and hydrostatic pressure that cracks walls. French drains and sump pumps often malfunction due to poor maintenance, allowing groundwater to flood basements during heavy rain.
                   </p>
                   <p>
                     Electrical safety violations occur frequently in older homes and those where owners performed their own work. Missing GFCI protection in wet locations, reversed polarity at outlets, and overloaded circuits create shock and fire hazards. Outdated service panels lack capacity for modern electrical loads and require upgrades to support additional circuits.
                   </p>
                   <p>
                     Plumbing leaks frequently hide under sinks, around toilets, and in basement piping. Slow leaks cause extensive water damage over time, rotting floor structures and promoting mold growth. Drain line problems include improper slope, missing traps, and inadequate venting that allows sewer gases into living spaces.
                   </p>
                   <p>
                     Heating system deficiencies range from simple maintenance needs to dangerous equipment failures. Cracked heat exchangers, blocked chimneys, and improper venting create carbon monoxide hazards that threaten occupant safety. Many furnaces and boilers operate beyond their expected service life, requiring replacement in the near future.
                   </p>
 
                   <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The Inspection Process</h3>
                   <p>
                     Your inspection begins with a thorough exterior assessment. We examine the roof from ground level and through binoculars, identifying damaged or missing shingles, worn flashing, and gutter problems. When safely accessible, we walk the roof surface for a closer evaluation of its condition. Siding, trim, windows, and doors receive careful attention to identify moisture infiltration points and maintenance needs.
                   </p>
                   <p>
                     Inside the home, we work systematically through each room and level. Every outlet gets tested, all windows operate, and each door swings freely. We run water at fixtures, flush toilets, and operate appliances included in the sale. The inspection covers all accessible areas including basements, crawl spaces, and attics.
                   </p>
                   <p>
                     Mechanical systems receive operational testing during the inspection. We run the furnace through a heating cycle, activate the air conditioning system, and observe water heater operation. Electrical panels are opened to examine wiring, breakers, and connections. These tests reveal functional problems and safety hazards that require attention.
                   </p>
                   <p>
                     Throughout the inspection, we document conditions with detailed photographs. Images of defects, safety hazards, and areas of concern provide visual evidence that supports our findings. You'll receive these photos in your inspection report along with written descriptions explaining the significance of each issue.
                   </p>
 
                   <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Understanding Your Inspection Report</h3>
                   <p>
                     We deliver comprehensive reports within 24 hours of completing your inspection. Reports organize findings by system and component, describing the condition of each element we examined. Deficiencies receive clear explanations of the problem, why it matters, and recommended corrective actions.
                   </p>
                   <p>
                     Priority levels help you understand which issues require immediate attention and which items can wait. Safety hazards always demand prompt correction to protect occupants. Major system defects affect property value and should influence your purchase negotiations. Minor maintenance items can usually be addressed after closing on your schedule.
                   </p>
                   <p>
                     Repair recommendations remain general in nature since we cannot provide contractor estimates or specify exact solutions. Some problems have multiple acceptable repair methods, and costs vary based on contractor selection and material choices. We suggest consulting qualified specialists for detailed repair proposals on major defects.
                   </p>
                   <p>
                     Our reports include high-resolution photos showing the location and extent of each deficiency. Visual documentation proves especially valuable during negotiations with sellers or when obtaining repair quotes from contractors. Images help everyone involved understand exactly what requires attention and why.
                   </p>
 
                   <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">After the Inspection</h3>
                   <p>
                     Armed with inspection findings, you can make informed decisions about proceeding with your purchase. Many buyers request repairs from sellers, particularly for safety hazards and major system defects. Others negotiate price reductions to cover repair costs they'll address after closing. In cases of severe undisclosed problems, some buyers exercise their right to withdraw from the purchase.
                   </p>
                   <p>
                     Mortgage lenders may require corrections before approving your loan. Safety hazards and significant defects often must be resolved prior to closing. Your inspection report provides documentation lenders need to evaluate the property's condition and protect their investment.
                   </p>
                   <p>
                     Even when sellers agree to repairs, we recommend reinspections to verify work completion. Rushed repairs sometimes create new problems or fail to fully resolve original defects. A brief reinspection confirms proper correction of issues identified in your initial evaluation.
                   </p>
 
                   <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond the Basic Inspection</h3>
                   <p>
                     Some properties require specialized testing beyond our standard evaluation. <Link to="/services/radon-testing" className="text-primary hover:underline">Radon gas testing</Link> identifies this invisible health hazard that concentrates in basements and lower levels. Homes with wood-burning fireplaces and stoves need <Link to="/services/wett" className="text-primary hover:underline">WETT inspections</Link> to verify safe installation and proper clearances. <Link to="/services/mold-inspection" className="text-primary hover:underline">Mold and moisture assessments</Link> use specialized equipment to locate hidden water infiltration and fungal growth.
                   </p>
                   <p>
                     Older properties may contain hazardous materials like <Link to="/services/asbestos-testing" className="text-primary hover:underline">asbestos insulation</Link>, <Link to="/services/lead-paint-testing" className="text-primary hover:underline">lead paint</Link>, and contaminated soil. Environmental testing identifies these concerns and helps you understand remediation costs. <Link to="/services/well-water-testing" className="text-primary hover:underline">Well water quality testing</Link> proves essential for rural properties not connected to municipal water supplies.
                   </p>
                   <p>
                     We coordinate these specialized services with our standard inspections whenever possible. Scheduling multiple evaluations during your inspection period saves time and ensures comprehensive property assessment before you commit to purchase.
                   </p>
                 </div>
               </div>
 
               {/* City Links */}
               <div>
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                   Pre-Purchase Home Inspection by City
                 </h2>
                 <p className="text-muted-foreground mb-4">
                   We serve buyers throughout Ontario. Select your city for local pricing and availability:
                 </p>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                   {[
                     { name: 'Toronto', slug: 'toronto' },
                     { name: 'Mississauga', slug: 'mississauga' },
                     { name: 'Brampton', slug: 'brampton' },
                     { name: 'Markham', slug: 'markham' },
                     { name: 'Vaughan', slug: 'vaughan' },
                     { name: 'Richmond Hill', slug: 'richmond-hill' },
                     { name: 'Oakville', slug: 'oakville' },
                     { name: 'Burlington', slug: 'burlington' },
                     { name: 'Hamilton', slug: 'hamilton' },
                     { name: 'Kitchener', slug: 'kitchener' },
                     { name: 'Cambridge', slug: 'cambridge' },
                     { name: 'Barrie', slug: 'barrie' },
                   ].map((city) => (
                     <Link
                       key={city.slug}
                       to={"/services/pre-purchase/" + city.slug}
                       className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-foreground"
                     >
                       <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                       Pre-Purchase Inspection {city.name}
                     </Link>
                   ))}
                 </div>
               </div>

               {/* Pricing Table */}
               <div>
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                   Pre-Purchase Home Inspection Cost Ontario
                 </h2>
                 <div className="overflow-hidden rounded-lg border border-border">
                   <table className="w-full text-sm">
                     <thead className="bg-muted">
                       <tr>
                         <th className="text-left px-4 py-3 font-semibold text-foreground">Property Size</th>
                         <th className="text-right px-4 py-3 font-semibold text-foreground">Price</th>
                       </tr>
                     </thead>
                     <tbody>
                       {[
                         { size: "Up to 1,500 sq ft", price: "$399" },
                         { size: "1,500 – 2,500 sq ft", price: "$449" },
                         { size: "2,500 – 3,500 sq ft", price: "$499" },
                         { size: "3,500+ sq ft", price: "$549+" },
                       ].map((row, i) => (
                         <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                           <td className="px-4 py-3 text-foreground">{row.size}</td>
                           <td className="px-4 py-3 text-right font-semibold text-foreground">{row.price}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
                 <p className="text-sm text-muted-foreground mt-3">Thermal imaging included. Same-day digital report. Call <a href="tel:+16478019311" className="text-primary">(647) 801-9311</a> for a quote.</p>
               </div>

               {/* What We Inspect */}
               <div>
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                   What We Inspect
                 </h2>
                 <div className="grid sm:grid-cols-2 gap-4">
                   {whatWeInspect.map((item) => (
                     <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                       <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                       <span className="text-foreground">{item}</span>
                     </div>
                   ))}
                 </div>
               </div>
 
               {/* Features */}
               <div>
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                   Service Features
                 </h2>
                 <div className="grid gap-6">
                   {features.map((feature) => (
                     <Card key={feature.title} className="border-border/50">
                       <CardContent className="p-6">
                         <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                           {feature.title}
                         </h3>
                         <p className="text-muted-foreground">{feature.description}</p>
                       </CardContent>
                     </Card>
                   ))}
                 </div>
               </div>
 
               {/* FAQs */}
               <div>
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                   Frequently Asked Questions
                 </h2>
                 <div className="space-y-4">
                   {faqs.map((faq, index) => (
                     <div key={index} className="border border-border rounded-lg p-6">
                       <h3 className="font-heading font-semibold text-foreground mb-2">
                         {faq.question}
                       </h3>
                       <p className="text-muted-foreground">{faq.answer}</p>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
 
             {/* Sidebar */}
             <div className="space-y-6">
               {/* Benefits Card */}
               <Card className="border-border/50 sticky top-24">
                 <CardContent className="p-6">
                   <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                     Why Choose ASADS?
                   </h3>
                   <ul className="space-y-3">
                     {benefits.map((benefit) => (
                       <li key={benefit} className="flex items-start gap-3">
                         <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                         <span className="text-sm text-foreground">{benefit}</span>
                       </li>
                     ))}
                   </ul>
                   <div className="mt-6 pt-6 border-t border-border">
                     <Button asChild className="w-full" size="lg">
                       <Link to="/booking">Book Now</Link>
                     </Button>
                     <p className="text-center text-sm text-muted-foreground mt-3">
                       or call <a href="tel:+16478019311" className="text-primary hover:underline">(647) 801-9311</a>
                     </p>
                   </div>
                 </CardContent>
               </Card>
 
               {/* Related Services */}
               <Card className="border-border/50">
                 <CardContent className="p-6">
                   <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                     Related Services
                   </h3>
                   <ul className="space-y-3">
                     {relatedServices.map((service) => (
                       <li key={service.href}>
                         <Link 
                           to={normalizePath(service.href)}
                           className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                         >
                           <ArrowRight className="h-4 w-4" />
                           {service.title}
                         </Link>
                       </li>
                     ))}
                   </ul>
                 </CardContent>
               </Card>
             </div>
           </div>
         </div>
       </section>
 
       {/* Service Areas Section - Internal Linking */}
       <section className="py-12 bg-muted/30">
         <div className="container">
           <div className="text-center mb-8">
             <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
               Pre-Purchase Home Inspection — Ontario Service Areas
             </h2>
             <p className="text-muted-foreground">
               Licensed home inspectors for Toronto, GTA, and communities across Ontario
             </p>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
             {featuredLocations.map((loc) => (
               <Link
                 key={loc.slug}
                 to={`/services/pre-purchase/${loc.slug.replace('home-inspection-', '')}` }
                 className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-foreground"
               >
                 <MapPin className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                 {loc.name}
               </Link>
             ))}
           </div>
           <div className="text-center mt-6">
             <Link 
               to="/locations" 
               className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
             >
               View all service areas
               <ArrowRight className="h-4 w-4" aria-hidden="true" />
             </Link>
           </div>
         </div>
       </section>
 
       {/* CTA Section */}
       <section className="py-16 md:py-24 bg-primary text-primary-foreground">
         <div className="container">
           <div className="max-w-3xl mx-auto text-center">
             <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
               Ready to Book Your Pre-Purchase Inspection?
             </h2>
             <p className="text-xl text-primary-foreground/90 mb-8">
               Don't make the biggest purchase of your life without knowing what you're getting. Our detailed inspections reveal the true condition of your prospective home.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button asChild size="lg" variant="secondary">
                 <Link to="/booking">Book Online Now</Link>
               </Button>
               <Button
                 asChild
                 size="lg"
                 variant="outline"
                 className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
               >
                 <a href="tel:+16478019311">(647) 801-9311</a>
               </Button>
             </div>
             <p className="text-sm text-primary-foreground/60 mt-5">
               See also:{" "}
               <Link to="/sample-report" className="underline hover:text-primary-foreground">Sample report</Link>
               {" · "}
               <Link to="/our-promise" className="underline hover:text-primary-foreground">Our independence promise</Link>
               {" · "}
               <Link to="/for-first-time-buyers" className="underline hover:text-primary-foreground">First-time buyer guide</Link>
             </p>
           </div>
         </div>
       </section>
     </Layout>
   );
                         }
