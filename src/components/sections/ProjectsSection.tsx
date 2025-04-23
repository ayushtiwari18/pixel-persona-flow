
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

type Category = 'all' | 'web' | 'mobile' | 'backend' | 'machine-learning' | 'other';

// Modal Animation Variants
const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, type: "spring" }
  },
  exit: { opacity: 0, y: 50, scale: 0.97, transition: { duration: 0.15 } }
};

// Project Card Component
const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="cursor-pointer bg-background rounded-lg overflow-hidden shadow-sm border group hover:shadow-lg transition-all duration-300"
      onClick={onClick}
      tabIndex={0}
      aria-label={`Open details for ${project.title}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {project.featured && (
          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl">{project.title}</h3>
          <span className="text-xs text-muted-foreground">
            {formatDate(project.date)}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          {project.description.length > 120
            ? `${project.description.slice(0, 120)}...`
            : project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="text-xs bg-muted px-2 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs bg-muted px-2 py-1 rounded-md">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View GitHub repository"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {project.submissionCount
              ? `Submissions: ${project.submissionCount}`
              : ""}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Modal/Dialog Content for Project Details
function ProjectDialog({ open, project, onClose }: { open: boolean; project: typeof projects[0] | null; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      {project && (
        <DialogContent className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
                style={{ outline: 'none' }}
              >
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between gap-2">
                    <span>{project.title}</span>
                    {project.featured && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded ml-4">
                        Featured
                      </span>
                    )}
                  </DialogTitle>
                  <DialogDescription className="my-2 text-muted-foreground">{formatDate(project.date)}</DialogDescription>
                </DialogHeader>
                <div className="my-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full rounded-lg mb-6 object-cover max-h-56"
                  />
                  <div className="mb-3">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="mb-3">
                    <h3 className="font-medium mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-muted px-3 py-1 rounded-md text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Details & Links</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-blue-600 text-xs hover:underline"
                        >
                          <Github className="h-4 w-4" /> GitHub
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-green-600 text-xs hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </a>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground"><strong>Submissions:</strong> {project.submissionCount ?? "—"}</p>
                    </div>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button variant="outline" className="mt-2 w-full">Close</Button>
                </DialogClose>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default function ProjectsSection({ limit = 6 }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Filter by category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Limit the number of projects displayed if needed
  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  // Categories for filter
  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web" },
    { value: "mobile", label: "Mobile" },
    { value: "backend", label: "Backend" },
    { value: "machine-learning", label: "ML/AI" },
    { value: "other", label: "Other" },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects I've worked on, showcasing my skills and experience in various technologies.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === category.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Modal/Dialog for project details */}
        <ProjectDialog
          open={!!selectedProject}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* View All Button */}
        {limit && projects.length > limit && (
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
