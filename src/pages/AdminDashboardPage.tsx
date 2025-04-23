
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog-posts";
import { certifications } from "@/data/certifications";
import { Link } from "react-router-dom";
import { Home, LogOut, Plus } from "lucide-react";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background shadow-sm border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              View Site
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-2">{projects.length}</h2>
              <p className="text-muted-foreground">Projects</p>
            </div>
            <div className="bg-background rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-2">{blogPosts.length}</h2>
              <p className="text-muted-foreground">Blog Posts</p>
            </div>
            <div className="bg-background rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-2">{certifications.length}</h2>
              <p className="text-muted-foreground">Certifications</p>
            </div>
          </div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Projects</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
              <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Featured</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-b">
                          <td className="p-4">{project.title}</td>
                          <td className="p-4 capitalize">{project.category}</td>
                          <td className="p-4">{project.date}</td>
                          <td className="p-4">{project.featured ? "Yes" : "No"}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm">
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
            </TabsContent>

            <TabsContent value="blog" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <Button>
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
                      {blogPosts.map((post) => (
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
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm">
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
            </TabsContent>

            <TabsContent value="certifications" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Certifications</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </div>
              <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Issuer</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certifications.map((cert) => (
                        <tr key={cert.id} className="border-b">
                          <td className="p-4">{cert.title}</td>
                          <td className="p-4">{cert.issuer}</td>
                          <td className="p-4">{cert.date}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm">
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
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-2xl font-bold">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
                  <h3 className="text-xl font-bold">Personal Information</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue="Jane Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue="Full Stack Developer & UI/UX Designer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-md"
                      defaultValue="contact@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      rows={5}
                      defaultValue="Full Stack Developer with a passion for creating beautiful, responsive, and user-friendly web applications."
                    />
                  </div>
                  <Button>Save Changes</Button>
                </div>
                
                <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
                  <h3 className="text-xl font-bold">Social Links</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub</label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-md"
                      defaultValue="https://github.com/janedeveloper"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn</label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-md"
                      defaultValue="https://linkedin.com/in/janedeveloper"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Twitter</label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-md"
                      defaultValue="https://twitter.com/janedeveloper"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Resume URL</label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-md"
                      defaultValue="/resume.pdf"
                    />
                  </div>
                  <Button>Update Social Links</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
