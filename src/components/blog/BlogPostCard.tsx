
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BlogPost } from "@/types";

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

const BlogPostCard = ({ post, index }: BlogPostCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-md transition">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          <Link to={`/blog/${post.slug}`}>
            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm mb-3">
            {post.description.length > 100
              ? `${post.description.slice(0, 100)}...`
              : post.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-muted px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0">
          <Link
            to={`/blog/${post.slug}`}
            className="text-primary text-sm font-medium hover:underline"
          >
            Read more
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogPostCard;
