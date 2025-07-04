
import { motion } from "framer-motion";

export default function ProjectsHeader() {
  return (
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
  );
}
