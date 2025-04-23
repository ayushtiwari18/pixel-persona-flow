
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { blogPosts } from "@/data/blog-posts";
import { BlogPost } from "@/types";
import { toast } from "sonner";

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogPostEditor = ({ post, onSave, onCancel }: BlogPostEditorProps) => {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [description, setDescription] = useState(post?.description || '');
  const [content, setContent] = useState(post?.content || '');
  const [coverImage, setCoverImage] = useState(post?.coverImage || '/placeholder.svg');
  const [date, setDate] = useState(post?.date || new Date().toISOString().split('T')[0]);
  const [readTime, setReadTime] = useState(post?.readTime?.toString() || '5');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!post) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !slug) {
      toast.error("Please fill all required fields");
      return;
    }

    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);
    
    const newPost: BlogPost = {
      id: post?.id || `post-${Date.now()}`,
      title,
      slug,
      description,
      content,
      coverImage,
      date,
      readTime: parseInt(readTime),
      tags: tagsArray,
    };

    onSave(newPost);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title*</label>
        <Input value={title} onChange={handleTitleChange} required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Slug*</label>
        <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description*</label>
        <Textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content (Markdown)*</label>
        <Textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          rows={15}
          required
          className="font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Cover Image URL</label>
          <Input 
            value={coverImage} 
            onChange={(e) => setCoverImage(e.target.value)} 
            placeholder="/placeholder.svg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Publication Date*</label>
          <Input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Reading Time (minutes)*</label>
          <Input 
            type="number" 
            value={readTime} 
            onChange={(e) => setReadTime(e.target.value)}
            min={1}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags (comma-separated)</label>
          <Input 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="React, JavaScript, Tutorial"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};

export default BlogPostEditor;
