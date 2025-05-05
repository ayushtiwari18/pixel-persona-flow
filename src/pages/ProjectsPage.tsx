
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { projects as localProjects } from "@/data/projects";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
        // Fallback to local data if Supabase query fails
        return localProjects;
      }
      
      // Map Supabase data to our Project type
      return data.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        demoUrl: project.demourl || undefined,
        githubUrl: project.githuburl || undefined,
        technologies: project.technologies || [],
        category: project.category as "web" | "mobile" | "backend" | "machine-learning" | "other",
        featured: project.featured,
        date: project.date,
        submissionCount: project.submissioncount || undefined
      }));
    }
  });

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
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Projects</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A showcase of my work across various technologies and domains.
              </p>
            </motion.div>
          </div>
        </section>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
            <p className="text-lg text-muted-foreground">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="container py-12 text-center">
            <p className="text-lg text-destructive">There was an error loading the projects.</p>
          </div>
        ) : (
          <ProjectsSection projects={projects} />
        )}
      </main>
      <Footer />
    </div>
  );
}
