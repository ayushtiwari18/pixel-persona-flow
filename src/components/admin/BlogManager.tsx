
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { blogPosts } from "@/data/blog-posts";
import { BlogPost } from "@/types";
import { Plus, Trash, Edit } from "lucide-react";
import BlogPostEditor from "@/components/admin/BlogPostEditor";

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | undefined>(undefined);

  const handleAddBlog = () => {
    setCurrentBlog(undefined);
    setIsAddingBlog(true);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setIsEditingBlog(true);
  };

  const handleSaveBlog = (blog: BlogPost) => {
    // If we're editing an existing blog post
    if (currentBlog && currentBlog.id) {
      setPosts(posts.map(post => post.id === blog.id ? blog : post));
      toast.success(`Blog "${blog.title}" updated successfully!`);
    } 
    // If we're adding a new blog post
    else {
      setPosts([...posts, { ...blog, id: `blog-${Date.now()}` }]);
      toast.success(`Blog "${blog.title}" added successfully!`);
    }
    
    setIsAddingBlog(false);
    setIsEditingBlog(false);
  };

  const handleDeleteBlog = (blogId: string) => {
    setPosts(posts.filter(post => post.id !== blogId));
    toast.success(`Blog deleted successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <Button onClick={handleAddBlog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Post
        </Button>
      </div>

      <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Tags</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="p-4">{post.title}</td>
                  <td className="p-4">{post.date}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditBlog(post)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteBlog(post.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isAddingBlog || isEditingBlog} onOpenChange={() => {
        setIsAddingBlog(false);
        setIsEditingBlog(false);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddingBlog ? 'Add New Blog Post' : 'Edit Blog Post'}
            </DialogTitle>
          </DialogHeader>
          <BlogPostEditor 
            post={currentBlog}
            onSave={handleSaveBlog}
            onCancel={() => {
              setIsAddingBlog(false);
              setIsEditingBlog(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
