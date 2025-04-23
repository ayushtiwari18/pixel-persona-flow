
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const BlogPostCard = ({
  post,
  index,
  featured = false,
}: {
  post: typeof blogPosts[0];
  index: number;
  featured?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={`h-full overflow-hidden ${featured ? 'border-primary/50' : ''}`}>
        {featured && (
          <div className="relative">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </div>
          </div>
        )}
        <CardContent className={`${featured ? 'p-6' : 'p-5'}`}>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          <Link to={`/blog/${post.slug}`}>
            <h3 className={`font-bold hover:text-primary transition-colors ${featured ? 'text-xl mb-3' : 'text-lg mb-2'}`}>
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm">
            {post.description.length > (featured ? 150 : 100)
              ? `${post.description.slice(0, featured ? 150 : 100)}...`
              : post.description}
          </p>
        </CardContent>
        <CardFooter className={`flex justify-between items-center ${featured ? 'px-6 pb-6' : 'px-5 pb-5'}`}>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-muted px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-primary text-sm font-medium inline-flex items-center hover:underline"
          >
            Read <ArrowUpRight className="h-3 w-3 ml-1" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

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
            <BlogPostCard post={featuredPost} index={0} featured={true} />
          )}

          {/* Regular Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index + 1} />
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
