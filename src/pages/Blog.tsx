import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, ArrowRight, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { SITE_URL } from "@/lib/seo";
import { blogPostsData } from "@/data/blogPosts";
import { HeroBookingSection } from "@/components/HeroBookingSection";
import { useState, useMemo } from "react";

const blogPosts = blogPostsData;

const categories = [
  "All Posts",
  "Buying Tips",
  "Selling Tips",
  "Inspection Insights",
  "Maintenance",
  "Health & Safety",
  "City Guides",
  "Mold & Air Quality",
  "Asbestos & Hazardous Materials",
];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [visibleCount, setVisibleCount] = useState(12);

  const featuredPost = blogPosts.find((post) => post.featured);

  const filteredPosts = useMemo(() => {
    const q = search.toLowerCase();
    return blogPosts.filter((post) => {
      if (post.featured) return false;
      const matchesCategory = activeCategory === "All Posts" || post.category === activeCategory;
      const matchesSearch = !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Blog | Expert Tips & Guides | ASADS</title>
        <meta name="description" content="Expert home inspection tips, buying guides & maintenance advice for GTA homeowners. Common issues, inspection processes & protecting your investment." />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:title" content="Home Inspection Blog | Expert Tips & Guides | ASADS" />
        <meta property="og:description" content="Expert home inspection tips, buying guides, and maintenance advice for GTA homeowners." />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content="Home Inspection Blog | Expert Tips & Guides | ASADS" />
        <meta name="twitter:description" content="Expert home inspection tips, buying guides, and maintenance advice for GTA homeowners." />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          "name": "ASADS Home Inspection Blog",
          "description": "Expert home inspection tips, buying guides, and maintenance advice for GTA homeowners.",
          "url": `${SITE_URL}/blog`,
          "publisher": {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            "name": "ASADS Home Inspection"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` }
          ]
        })}</script>
      </Helmet>

      <HeroBookingSection
        badge="Home Inspection Blog · GTA & Ontario · Expert Guides"
        title="Home Inspection Tips & Guides"
        subtitle="Expert advice for GTA homebuyers, sellers, and homeowners — from common defects to buying strategies and local market insights."
        priceCards={[
          { label: "Articles", price: `${blogPosts.length}+` },
          { label: "Categories", price: "10+" },
          { label: "City Guides", price: "15+" },
          { label: "Free", price: "Always" },
        ]}
        formTitle="Book Your Inspection"
        ctaPrimary={{ text: "Browse Articles Below", href: "#articles" }}
        defaultService="Pre-Purchase Home Inspection"
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div>
                <span className="text-primary font-medium">{featuredPost.category}</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Button asChild>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section id="articles" className="py-6 border-b bg-gray-50 sticky top-0 z-10 shadow-sm">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles…"
                className="pl-9 h-10 bg-white"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setVisibleCount(12); }}
              />
            </div>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(12); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {activeCategory === "All Posts" ? "All Articles" : activeCategory}
              <span className="ml-2 text-base font-normal text-muted-foreground">({filteredPosts.length})</span>
            </h2>
            {search && (
              <button onClick={() => setSearch("")} className="text-sm text-primary hover:underline">
                Clear search
              </button>
            )}
          </div>

          {visiblePosts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg mb-2">No articles found for "{search}"</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All Posts"); }} className="text-primary hover:underline text-sm">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visiblePosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-foreground mt-1 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount(v => v + 12)}
              >
                Load More Articles ({filteredPosts.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-background border-t border-border/50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/services"  className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link>
            <span className="text-border">•</span>
            <Link to="/pricing"   className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <span className="text-border">•</span>
            <Link to="/faq"       className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            <span className="text-border">•</span>
            <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">Service Areas</Link>
            <span className="text-border">•</span>
            <Link to="/booking"   className="text-muted-foreground hover:text-primary transition-colors">Book Online</Link>
            <span className="text-border">•</span>
            <Link to="/contact"   className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Inspection?</h2>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                Knowledge is the first step — let our certified inspectors put it into action for your property.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "OAHI & InterNACHI certified inspectors",
                  "Same-day digital reports with photos",
                  "Available 7 days a week",
                  "Fully insured — E&O + $2M liability",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-blue-100 text-sm">
                    <ArrowRight className="h-4 w-4 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="tel:6478019311" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
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
              <a href="/booking" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg text-center transition-colors text-sm">
                Open Full Booking Form →
              </a>
              <p className="text-center text-xs text-gray-400 mt-3">
                or call <a href="tel:6478019311" className="text-blue-600 font-semibold">(647) 801-9311</a> — 7 days a week
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
