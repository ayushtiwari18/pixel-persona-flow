import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ButtonOutline } from "@/components/ui/button-outline";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<(typeof projects)[0] | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Find project with matching id
    const foundProject = projects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      // Scroll to top on page load
      window.scrollTo(0, 0);
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <div className="container py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <div className="container py-20 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/4 mx-auto mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container py-12">
          <Link
            to="/projects"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24">
                <div className="bg-background rounded-lg overflow-hidden shadow-md border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto"
                  />
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  {project.githubUrl && (
                    <ButtonOutline asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        GitHub Repository
                      </a>
                    </ButtonOutline>
                  )}
                  {project.demoUrl && (
                    <Button asChild>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                      {project.title}
                    </h1>
                    {project.featured && (
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Completed on {formatDate(project.date)}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-3">Project Overview</h2>
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-3">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-muted px-3 py-1 rounded-md text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-3">Features</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Responsive design that works on all devices</li>
                    <li>Intuitive user interface with modern animations</li>
                    <li>Optimized performance for fast loading times</li>
                    <li>Comprehensive test coverage for reliability</li>
                    <li>Accessible design following WCAG guidelines</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-3">
                    Challenges & Solutions
                  </h2>
                  <p className="text-muted-foreground">
                    During development, we encountered challenges with
                    performance optimization and complex state management. These
                    were solved by implementing efficient data fetching
                    strategies and adopting a well-structured state management
                    approach using modern React patterns.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
