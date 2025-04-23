
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogPostCard from "@/components/blog/BlogPostCard";

export default function BlogSection({ limit = 4 }: { limit?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get featured post and remaining posts
  const featuredPost = sortedPosts[0];
  const remainingPosts = sortedPosts.slice(1, limit);

  return (
    <section id="blog" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Latest Articles
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on development, design, and technology.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-8">
          {/* Featured Post */}
          {featuredPost && (
            <div className="bg-background border rounded-lg overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredPost.readTime} min read</span>
                    </div>
                  </div>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <h3 className="text-2xl font-bold hover:text-primary transition-colors mb-4">
                      {featuredPost.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-5">
                    {featuredPost.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featuredPost.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-muted px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="text-primary font-medium hover:underline"
                  >
                    Read more
                  </Link>
                </div>
                <div className="relative h-60 md:h-full bg-muted">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Featured
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* View All Button */}
          {limit && blogPosts.length > limit && (
            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link to="/blog" className="inline-flex items-center">
                  View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
