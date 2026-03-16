import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPostsData } from "@/data/blogPosts";
import { locationData } from "@/data/locationData";
import { getCanonicalUrl } from "@/lib/seo";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Phone,
  ArrowRight,
} from "lucide-react";

/** Deterministic hash for content variation */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], key: string): T {
  return arr[hash(key) % arr.length];
}

/** Generate a city-specific intro paragraph based on blog category */
function getCityIntro(category: string, city: string, blogTitle: string): string {
  const intros: Record<string, string[]> = {
    "Buying Tips": [
      `Buying a home in ${city} means navigating one of Ontario's most competitive real estate markets. Before you close on any property, the information in this guide is essential — ${city} buyers who skip proper due diligence regularly face costly surprises that an inspection would have caught.`,
      `${city} home buyers face unique challenges: older housing stock, varying neighbourhood conditions, and fast-moving market conditions that pressure buyers to waive protections. This guide helps ${city} buyers make confident, informed decisions.`,
      `In ${city}'s real estate market, knowledge is leverage. Whether you're looking in established neighbourhoods or newer subdivisions, understanding your inspection rights and what to look for in a ${city} home puts you in a stronger position.`,
    ],
    "Selling Tips": [
      `Selling in ${city}? The information in this guide directly applies to your situation. ${city} sellers who prepare properly — and understand what buyers' inspectors will flag — close faster and protect their asking price.`,
      `${city}'s real estate market rewards prepared sellers. Buyers in ${city} are increasingly sophisticated, and their inspectors are thorough. This guide helps you anticipate what will be found and how to handle it.`,
      `Whether you're in a high-demand ${city} neighbourhood or preparing a more modest property for sale, pre-listing preparation is the difference between a smooth close and a stressful renegotiation.`,
    ],
    "Mold & Air Quality": [
      `Mold is a persistent concern in ${city} homes — particularly in older basements, finished lower levels, and properties with any history of water intrusion. ${city}'s climate creates ideal conditions for mold growth during shoulder seasons when temperature differentials drive condensation.`,
      `${city} homeowners and buyers frequently encounter mold-related issues, especially in pre-1980 housing stock where vapour barriers and ventilation standards lagged behind modern requirements. This guide explains what to watch for and when to test.`,
      `Indoor air quality issues are among the most common findings in ${city} home inspections. Understanding the warning signs and when professional testing is warranted protects ${city} families from hidden health risks.`,
    ],
    "Electrical Safety": [
      `Electrical safety is a significant concern in ${city}'s older housing stock. Homes built before 1980 across ${city} frequently contain wiring types and panel configurations that Ontario insurers flag — and that buyers need to understand before closing.`,
      `${city} has a large inventory of pre-1970 homes where knob-and-tube wiring, aluminum branch circuits, and undersized electrical panels are common findings. This guide explains what these mean for buyers, sellers, and insurers in ${city}.`,
      `Understanding electrical risks in ${city} homes is essential — whether you're buying, selling, or renovating. Electrical deficiencies are among the most common inspection findings across ${city}'s residential neighbourhoods.`,
    ],
    "Structural": [
      `Foundation and structural concerns are among the most serious findings in any ${city} home inspection. ${city}'s clay-heavy soils, seasonal freeze-thaw cycles, and aging housing stock create conditions where structural issues develop over decades.`,
      `Structural deficiencies in ${city} homes range from minor settlement to serious foundation compromise. Understanding what inspectors look for — and what different findings mean — helps ${city} buyers and sellers make informed decisions.`,
      `${city} homes face structural challenges unique to Ontario's climate: frost heaving, hydrostatic pressure on basement walls, and soil movement from seasonal temperature swings. This guide explains what to expect and when to be concerned.`,
    ],
    "Plumbing": [
      `Plumbing issues are among the most common and costly findings in ${city} home inspections. ${city}'s diverse housing stock spans multiple plumbing eras — from galvanized supply lines in pre-war homes to KITEC orange plastic in late-1990s builds.`,
      `${city} buyers and homeowners regularly encounter plumbing concerns specific to the city's housing age range. Knowing which pipe materials are present in a ${city} home is critical to assessing future repair costs.`,
      `Whether you're inspecting a ${city} century home or a 2000s condo, plumbing systems require careful assessment. ${city} inspectors regularly find issues that have been actively leaking or slowly deteriorating for years without visible signs.`,
    ],
    "Maintenance": [
      `Maintaining a home in ${city} requires awareness of how Ontario's climate affects building systems. Seasonal extremes — from humid summers to freezing winters — create maintenance cycles that ${city} homeowners need to follow to protect their investment.`,
      `${city} homeowners who stay ahead of seasonal maintenance avoid the emergency repairs that catch unprepared owners off guard. This guide outlines what to prioritize and when to act based on ${city}'s climate patterns.`,
      `Regular maintenance is what separates ${city} homes that hold their value from those that deteriorate quickly. The inspection principles in this guide apply directly to proactive homeownership in ${city}.`,
    ],
    "Health & Safety": [
      `Health and safety concerns in ${city} homes — from radon gas to asbestos-containing materials — affect properties across the city regardless of neighbourhood or price point. ${city} homeowners deserve factual, actionable information on these risks.`,
      `${city}'s housing inventory includes a wide range of health hazard concerns depending on construction era. Pre-1990 homes in ${city} commonly contain multiple regulated substances that require professional assessment before renovation or purchase.`,
      `Protecting your family in a ${city} home means understanding the invisible risks that standard visual inspections won't reveal. This guide explains when professional testing is warranted and what ${city} regulations require.`,
    ],
    "Asbestos & Hazardous Materials": [
      `Asbestos and other hazardous materials are present in the majority of ${city} homes built before 1990. Understanding where these materials are found, when they're dangerous, and what Ontario regulations require is essential for ${city} homeowners and buyers.`,
      `${city} has a large stock of pre-1980 homes where asbestos-containing materials were used extensively in insulation, flooring, ceiling finishes, and pipe wrapping. This guide applies directly to property transactions and renovations in ${city}.`,
      `Hazardous material assessment is a standard part of due diligence for older ${city} properties. Whether buying, selling, or renovating, ${city} homeowners need to understand O.Reg 278/05 requirements and their obligations.`,
    ],
    "Inspection Technology": [
      `Modern inspection technology — including thermal imaging and air quality testing — is increasingly used in ${city} home inspections to find issues invisible to the naked eye. ${city} buyers who request these tools gain a significant advantage in due diligence.`,
      `${city} inspectors have access to tools that detect moisture, heat loss, and air quality issues behind finished surfaces. Understanding what these tools reveal is valuable for any ${city} buyer or homeowner making property decisions.`,
      `Advanced inspection methods are particularly valuable in ${city}'s older housing stock, where decades of modifications and deferred maintenance often hide problems inside walls and ceilings. This guide explains when to request these services.`,
    ],
    "Technology": [
      `Inspection technology is transforming how ${city} buyers and homeowners understand their properties. From FLIR thermal cameras to CCTV sewer scopes, modern tools reveal issues in ${city} homes that previous generations of buyers never had access to.`,
      `${city}'s home inspection industry has adopted diagnostic technology that makes assessments far more comprehensive than a decade ago. Understanding what these tools can and can't detect helps ${city} buyers set realistic expectations.`,
      `In ${city}'s competitive market, buyers who use advanced inspection technology make better decisions. This guide explains what's available and when these tools add real value to a ${city} home purchase.`,
    ],
    "Commercial": [
      `Commercial property due diligence in ${city} requires specialized inspection expertise. ${city}'s commercial real estate market spans retail plazas, office buildings, industrial units, and multi-residential properties — each with unique inspection requirements.`,
      `${city} commercial buyers and investors need inspection reports that address systems and components not found in residential properties. Understanding commercial inspection scope helps ${city} investors make sound acquisition decisions.`,
      `${city}'s commercial property market is active and competitive. Proper inspection due diligence before acquiring commercial real estate in ${city} protects buyers from inheriting costly deferred maintenance and regulatory compliance issues.`,
    ],
    "Inspection Insights": [
      `Understanding what home inspectors actually find in ${city} properties helps buyers and sellers set realistic expectations. ${city} inspection findings follow patterns tied to housing age, neighbourhood, and construction era.`,
      `${city} home inspection data reveals consistent patterns: older neighbourhoods have specific deficiency profiles, while newer builds have their own common issues. This guide helps ${city} buyers understand what to expect.`,
      `For ${city} homeowners and buyers, understanding inspection methodology — what's covered, what's not, and how to interpret findings — makes the difference between a useful inspection and a confusing one.`,
    ],
    "City Guides": [
      `This guide is particularly relevant to ${city} residents and buyers. ${city}'s housing market has unique characteristics — from its building age distribution to neighbourhood-specific issues — that make local inspection knowledge valuable.`,
      `${city} buyers benefit from understanding how local conditions affect home inspection findings. Soil types, historical building practices, and neighbourhood infrastructure in ${city} all influence what inspectors commonly find.`,
      `Whether you're new to ${city} or a long-time resident buying or selling, understanding ${city}-specific property concerns helps you make better decisions and ask better questions during your inspection.`,
    ],
  };

  const defaultIntros = [
    `This guide is directly relevant to ${city} homeowners and buyers. ${city}'s housing market — like all Ontario real estate — requires informed decision-making backed by professional inspection. The information here applies to properties across ${city} and surrounding communities.`,
    `${city} buyers and homeowners face the same challenges as buyers across Ontario: aging housing stock, time pressure to make decisions, and limited visibility into what's happening inside walls and under surfaces. This guide helps ${city} residents navigate those challenges.`,
    `Whether you're purchasing, selling, or maintaining a home in ${city}, the information in this guide is actionable and locally relevant. ASADS inspectors serve ${city} with same-day availability and certified reporting.`,
  ];

  const pool = intros[category] ?? defaultIntros;
  return pick(pool, `${blogTitle}-${city}`);
}

export default function BlogCityPage() {
  const { blogSlug, citySlug } = useParams<{ blogSlug: string; citySlug: string }>();

  const post = blogPostsData.find((p) => p.slug === blogSlug);
  // citySlug is the clean slug (e.g. "brampton"), location slug is "home-inspection-brampton"
  const location = locationData.find((l) => l.slug === `home-inspection-${citySlug}`);

  if (!post || !location) return <Navigate to="/blog" replace />;

  const city = location.city;
  const cityIntro = getCityIntro(post.category, city, post.title);
  const canonical = getCanonicalUrl(`/blog/${post.slug}/${citySlug}`);

  // Localized meta — inject city into title and desc
  const metaTitle = `${post.metaTitle} | ${city}, Ontario`;
  const metaDesc = `${post.metaDescription} Serving ${city} homeowners & buyers.`.slice(0, 160);

  const relatedPosts = blogPostsData
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metaTitle,
    description: metaDesc,
    image: { "@type": "ImageObject", url: post.image, width: 800, height: 500 },
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author, url: "https://www.asads.ca/about" },
    publisher: {
      "@type": "Organization",
      name: "ASADS Home Inspection",
      logo: { "@type": "ImageObject", url: "https://www.asads.ca/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: post.category,
    areaServed: city,
  };

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              View original article
            </Link>

            {/* City badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                <MapPin size={13} />
                {city}, Ontario
              </span>
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-5">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-6">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                width="800"
                height="450"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article + Sidebar */}
      <section className="py-10">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* City intro block */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-5 mb-8">
                <p className="text-sm font-semibold text-blue-700 mb-1 flex items-center gap-1.5">
                  <MapPin size={14} />
                  Reading this in {city}?
                </p>
                <p className="text-blue-900 text-sm leading-relaxed">{cityIntro}</p>
              </div>

              {/* Blog content */}
              <article className="prose prose-lg max-w-none">
                <div
                  className="text-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-10 pt-8 border-t border-border">
                  <h3 className="font-heading font-semibold text-lg mb-4">Related Articles</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.slug}
                        to={`/blog/${rp.slug}/${citySlug}`}
                        className="p-4 rounded-xl border border-border hover:border-primary transition-colors group"
                      >
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                          {rp.title}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <ArrowRight size={11} />
                          {city} edition
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* City CTA card */}
                <Card className="border-blue-100 bg-blue-50">
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold text-blue-600 mb-1 flex items-center gap-1">
                      <MapPin size={12} />
                      Serving {city}
                    </p>
                    <h3 className="font-heading font-semibold text-base mb-3">
                      Need a Home Inspection in {city}?
                    </h3>
                    <p className="text-muted-foreground text-xs mb-4">
                      ASADS certified inspectors serve {city} with same-day availability and digital reports.
                    </p>
                    <Button asChild className="w-full mb-2" size="sm">
                      <Link to="/booking">Book in {city}</Link>
                    </Button>
                    <Button variant="outline" className="w-full" size="sm" asChild>
                      <a href="tel:+16478019311">
                        <Phone className="mr-2 h-3 w-3" />
                        (647) 801-9311
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Location page link */}
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-heading font-semibold text-sm mb-3">
                      {city} Home Inspection Services
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      See all inspection services available in {city}.
                    </p>
                    <Link
                      to={`/locations/${location.slug}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <ArrowRight size={13} />
                      View {city} service area
                    </Link>
                  </CardContent>
                </Card>

                {/* Original article link */}
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-heading font-semibold text-sm mb-2">
                      Ontario-Wide Edition
                    </h3>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <ArrowRight size={13} />
                      Read the original article
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold mb-3">
              Book a Home Inspection in {city} Today
            </h2>
            <p className="text-primary-foreground/80 mb-7">
              Same-day availability · Certified inspectors · Digital report same day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Book Online</Link>
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
          </div>
        </div>
      </section>
    </Layout>
  );
}
