
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projects as defaultProjects } from "@/data/projects";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, BookOpen, Calendar, Code } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Project } from "@/types";

type Category =
  | "all"
  | "web"
  | "mobile"
  | "backend"
  | "machine-learning"
  | "other";

// Modal Animation Variants
const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, type: "spring", stiffness: 300 },
  },
  exit: { opacity: 0, y: 50, scale: 0.97, transition: { duration: 0.15 } },
};

// Project Card Component
const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="cursor-pointer bg-background rounded-lg overflow-hidden shadow-sm border group hover:shadow-lg transition-all duration-300"
      onClick={onClick}
      tabIndex={0}
      aria-label={`Open details for ${project.title}`}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {project.featured && (
          <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(project.date)}
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-xs bg-muted px-2 py-1 rounded-full transition-transform duration-300 hover:scale-105"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs bg-primary/10 px-2 py-1 rounded-full font-medium">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-muted">
          <div className="flex space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
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
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                aria-label="View live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
          {project.submissionCount ? (
            <div className="flex items-center text-xs text-muted-foreground">
              <BookOpen className="h-3 w-3 mr-1" />
              <span>{project.submissionCount}</span>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

// Modal/Dialog Content for Project Details
function ProjectDialog({
  open,
  project,
  onClose,
}: {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="w-full max-w-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
              style={{ outline: "none" }}
            >
              <div className="relative h-56 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <DialogTitle className="text-white text-2xl font-bold mb-1">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="text-white/90 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(project.date)}
                    {project.featured && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full ml-4">
                        Featured
                      </span>
                    )}
                  </DialogDescription>
                </div>
              </div>

              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" /> Overview
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Code className="h-5 w-5 mr-2" /> Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-muted px-3 py-1 rounded-full text-sm transition-transform hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
                  <div className="flex flex-wrap items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 bg-muted hover:bg-muted/80 px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 bg-primary/10 hover:bg-primary/20 px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    )}
                  </div>

                  {project.submissionCount ? (
                    <div className="text-sm text-muted-foreground flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>Submissions: {project.submissionCount}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              <DialogClose asChild>
                <Button variant="outline" className="mt-6 w-full">
                  Close
                </Button>
              </DialogClose>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

const CategoryFilter = ({
  category,
  activeCategory,
  onClick,
}: {
  category: { value: Category; label: string };
  activeCategory: Category;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
      activeCategory === category.value
        ? "bg-primary text-primary-foreground shadow-md"
        : "bg-muted text-muted-foreground hover:bg-muted/80"
    }`}
  >
    {category.label}
  </motion.button>
);

export default function ProjectsSection({ 
  limit = 6, 
  projects = defaultProjects 
}: { 
  limit?: number;
  projects?: Project[];
}) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter by category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Limit the number of projects displayed if needed
  const displayedProjects = limit
    ? filteredProjects.slice(0, limit)
    : filteredProjects;

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
            <span className="relative">
              Projects
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/40 rounded-full"></span>
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            A selection of projects I've worked on, showcasing my skills and
            experience in various technologies.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <CategoryFilter
                key={category.value}
                category={category}
                activeCategory={activeCategory}
                onClick={() => setActiveCategory(category.value)}
              />
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </motion.div>

        {/* Modal/Dialog for project details */}
        <ProjectDialog
          open={!!selectedProject}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* View All Button */}
        {limit && projects.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              asChild
              className="px-8 py-6 rounded-full text-base font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/projects">View All Projects</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
