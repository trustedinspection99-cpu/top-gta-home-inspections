import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, ArrowRight, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { SITE_URL } from "@/lib/seo";
import { blogPostsData } from "@/data/blogPosts";

const blogPosts = blogPostsData;

const categories = [
  "All Posts",
  "Buying Tips",
  "Selling Tips",
  "Inspection Insights",
  "Maintenance",
  "Health & Safety",
  "Technology",
  "City Guides",
];

export default function Blog() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Blog | Expert Tips & Guides | ASADS</title>
        <meta name="description" content="Expert home inspection tips, buying guides & maintenance advice for GTA homeowners. Common issues, inspection processes & protecting your investment." />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Home Inspection Blog | Expert Tips & Guides | ASADS" />
        <meta property="og:description" content="Expert home inspection tips, buying guides, and maintenance advice for GTA homeowners." />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
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
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Home Inspection Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert tips, industry insights, and helpful guides for homeowners in the Greater Toronto Area.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All Posts" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
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
                    {new Date(featuredPost.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
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

      {/* Blog Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
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
                </div>
                <div className="p-6">
                  <span className="text-primary text-sm font-medium">{post.category}</span>
                  <h3 className="font-heading text-xl font-semibold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-background border-t border-border/50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link>
            <span className="text-border">•</span>
            <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <span className="text-border">•</span>
            <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            <span className="text-border">•</span>
            <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">Service Areas</Link>
            <span className="text-border">•</span>
            <Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors">Book Online</Link>
            <span className="text-border">•</span>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Stay Informed
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscribe to our newsletter for the latest home inspection tips, industry news, and exclusive guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
