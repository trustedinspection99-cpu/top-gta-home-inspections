import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, ArrowRight, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

// Blog posts with proper slugs matching route expectations
const blogPosts = [
  {
    id: 1,
    slug: "first-time-home-buyer-inspection-guide",
    title: "First-Time Home Buyer's Complete Inspection Guide",
    excerpt: "Everything you need to know about home inspections before purchasing your first property in the GTA. Learn what inspectors look for and how to prepare.",
    category: "Buying Tips",
    author: "ASADS Team",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    featured: true,
    relatedService: "/services/pre-purchase/",
  },
  {
    id: 2,
    slug: "common-issues-toronto-homes",
    title: "10 Common Issues Found in Toronto Homes",
    excerpt: "Discover the most frequently found problems during home inspections in Toronto. From foundation cracks to outdated electrical systems.",
    category: "Inspection Insights",
    author: "ASADS Team",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=500&fit=crop",
    featured: false,
    relatedService: "/services/pre-purchase/",
  },
  {
    id: 3,
    slug: "pre-listing-inspection-benefits",
    title: "Why Sellers Should Get a Pre-Listing Inspection",
    excerpt: "Learn how a pre-listing inspection can help you sell your home faster and for a better price. Avoid surprises and build buyer confidence.",
    category: "Selling Tips",
    author: "ASADS Team",
    date: "2024-01-05",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&h=500&fit=crop",
    featured: false,
    relatedService: "/services/pre-listing/",
  },
  {
    id: 4,
    slug: "radon-testing-importance",
    title: "Radon Testing: What Every Homeowner Should Know",
    excerpt: "Radon is the second leading cause of lung cancer. Learn why radon testing is essential for your family's health and safety.",
    category: "Health & Safety",
    author: "ASADS Team",
    date: "2023-12-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    featured: false,
    relatedService: "/services/radon-testing/",
  },
  {
    id: 5,
    slug: "winter-home-maintenance-checklist",
    title: "Winter Home Maintenance Checklist for GTA Homeowners",
    excerpt: "Prepare your home for harsh Canadian winters with our comprehensive maintenance checklist. Prevent costly repairs and stay warm.",
    category: "Maintenance",
    author: "ASADS Team",
    date: "2023-12-20",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&h=500&fit=crop",
    featured: false,
    relatedService: "/services/thermal-imaging/",
  },
  {
    id: 6,
    slug: "thermal-imaging-benefits",
    title: "How Thermal Imaging Reveals Hidden Home Problems",
    excerpt: "Discover how infrared technology can detect issues invisible to the naked eye, from water leaks to insulation gaps.",
    category: "Technology",
    author: "ASADS Team",
    date: "2023-12-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop",
    featured: false,
    relatedService: "/services/thermal-imaging/",
  },
  {
    id: 7,
    slug: "what-to-expect-home-inspection",
    title: "Understanding Your Home Inspection Report: A Complete Guide",
    excerpt: "Learn how to read and interpret your home inspection report. Understand the difference between major concerns and minor issues.",
    category: "Buying Tips",
    author: "ASADS Team",
    date: "2023-12-10",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=500&fit=crop",
    featured: false,
    relatedService: "/services/pre-purchase/",
  },
  {
    id: 8,
    slug: "mold-prevention-tips",
    title: "Mold Prevention: Keep Your Home Safe and Healthy",
    excerpt: "Practical tips to prevent mold growth in your home. Learn about moisture control, ventilation, and early warning signs.",
    category: "Health & Safety",
    author: "ASADS Team",
    date: "2023-12-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=500&fit=crop",
    featured: false,
    relatedService: "/services/mold-inspection/",
  },
  {
    id: 9,
    slug: "new-construction-inspection-importance",
    title: "New Construction Inspections: Don't Skip This Crucial Step",
    excerpt: "Why you need a professional inspection even on brand new homes. Learn about builder deficiencies and Tarion warranty coverage.",
    category: "Buying Tips",
    author: "ASADS Team",
    date: "2023-11-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    featured: false,
    relatedService: "/services/new-construction/",
  },
  {
    id: 10,
    slug: "condo-inspection-checklist",
    title: "Condo Inspection: What's Included and What to Expect",
    excerpt: "Condo inspections differ from house inspections. Learn what's covered, the importance of status certificates, and common condo issues.",
    category: "Inspection Insights",
    author: "ASADS Team",
    date: "2023-11-20",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    featured: false,
    relatedService: "/services/condo/",
  },
];

const categories = [
  "All Posts",
  "Buying Tips",
  "Selling Tips",
  "Inspection Insights",
  "Maintenance",
  "Health & Safety",
  "Technology",
];

export default function Blog() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <Layout>
      {/* Hero Section */}
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
