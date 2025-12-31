import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ArrowRight,
  Phone,
  Share2,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { blogPostsData } from "@/data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const currentIndex = blogPostsData.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPostsData[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPostsData.length - 1 ? blogPostsData[currentIndex + 1] : null;
  const relatedPosts = blogPostsData
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <Layout>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://asads.ca/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
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
      <section className="py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                <div 
                  className="text-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
              </article>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Share this article:</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon" asChild>
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://asads.ca/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a 
                        href={`https://twitter.com/intent/tweet?url=https://asads.ca/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a 
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=https://asads.ca/blog/${post.slug}&title=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Post Navigation */}
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {prevPost && (
                  <Link 
                    to={`/blog/${prevPost.slug}`}
                    className="p-6 rounded-xl border border-border hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <ArrowLeft className="h-4 w-4" />
                      <span className="text-sm">Previous Article</span>
                    </div>
                    <p className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {prevPost.title}
                    </p>
                  </Link>
                )}
                {nextPost && (
                  <Link 
                    to={`/blog/${nextPost.slug}`}
                    className="p-6 rounded-xl border border-border hover:border-primary transition-colors group md:text-right"
                  >
                    <div className="flex items-center justify-end gap-2 text-muted-foreground mb-2">
                      <span className="text-sm">Next Article</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <p className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {nextPost.title}
                    </p>
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">
                      Need a Home Inspection?
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Our certified inspectors are ready to help you make informed property decisions.
                    </p>
                    <Button asChild className="w-full mb-3">
                      <Link to="/booking">Book Inspection</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="tel:+16478019311">
                        <Phone className="mr-2 h-4 w-4" />
                        (647) 801-9311
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold text-lg mb-4">
                        Related Articles
                      </h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <Link
                            key={relatedPost.slug}
                            to={`/blog/${relatedPost.slug}`}
                            className="block group"
                          >
                            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {relatedPost.readTime}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Ready to Get Your Home Inspected?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Book your professional home inspection today and make confident property decisions.
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
          </div>
        </div>
      </section>
    </Layout>
  );
}