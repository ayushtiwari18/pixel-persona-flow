
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Clock, Search } from "lucide-react";
import BlogPostCard from "@/components/blog/BlogPostCard";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap((post) => post.tags))
  ).sort();

  // Filter posts based on search query and selected tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">My Blog</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Thoughts, insights, and tutorials on web development and design.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 mb-10">
              <div className="w-full md:w-3/4">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {sortedPosts.length === 0 ? (
                  <div className="text-center py-20">
                    <h3 className="text-xl font-medium mb-2">No articles found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {sortedPosts.map((post, index) => (
                      <BlogPostCard 
                        key={post.id} 
                        post={post} 
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/4">
                <div className="bg-background p-6 rounded-lg shadow-sm border sticky top-20">
                  <h3 className="font-bold text-lg mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedTag(null)}
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        selectedTag === null
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      All Posts ({blogPosts.length})
                    </button>
                    {allTags.map((tag) => {
                      const count = blogPosts.filter((post) =>
                        post.tags.includes(tag)
                      ).length;
                      return (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                          className={`block w-full text-left px-3 py-2 rounded-md ${
                            tag === selectedTag
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {tag} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
