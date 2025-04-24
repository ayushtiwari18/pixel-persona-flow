import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/skills";

// Component to display a skill badge with improved hover effects
const SkillBadge = ({
  name,
  icon,
  index,
}: {
  name: string;
  icon: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-background rounded-lg p-4 shadow-sm border flex flex-col items-center hover:border-primary/50 hover:shadow-md transition-all duration-300"
    >
      <div className="h-14 w-14 mb-3 flex items-center justify-center">
        <span className="text-4xl">{getIconEmoji(icon)}</span>
      </div>
      <span className="text-sm font-medium text-center">{name}</span>
    </motion.div>
  );
};

// Helper function to get an emoji based on skill name/icon
function getIconEmoji(icon: string): string {
  const iconMap: Record<string, string> = {
    html5: "🌐",
    css3: "🎨",
    javascript: "📜",
    typescript: "🔷",
    react: "⚛️",
    nextjs: "▲",
    redux: "🔄",
    tailwind: "💨",
    sass: "💅",
    materialui: "📱",
    framer: "🎭",
    threejs: "🥽",
    nodejs: "🟢",
    express: "🚂",
    python: "🐍",
    django: "🦄",
    mongodb: "🍃",
    postgresql: "🐘",
    firebase: "🔥",
    graphql: "📊",
    api: "🔌",
    docker: "🐳",
    git: "📂",
    github: "🐙",
    vscode: "💻",
    figma: "🖌️",
    webpack: "📦",
    jest: "🃏",
    cypress: "🔍",
    npm: "📦",
    postman: "👨‍🚀",
    aws: "☁️",
  };

  return iconMap[icon] || "🔧";
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Group skills by category
  const frontendSkills = skills.filter(
    (skill) => skill.category === "frontend"
  );
  const backendSkills = skills.filter((skill) => skill.category === "backend");
  const toolsSkills = skills.filter((skill) => skill.category === "tools");

  // Animation variants for container and children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive collection of technologies and tools I've worked
            with throughout my career.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-16">
          {/* Frontend Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-8 border-l-4 border-primary pl-4 flex items-center"
            >
              <span className="mr-2">🎨</span> Frontend Development
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {frontendSkills.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-8 border-l-4 border-primary pl-4 flex items-center"
            >
              <span className="mr-2">⚙️</span> Backend Development
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {backendSkills.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-8 border-l-4 border-primary pl-4 flex items-center"
            >
              <span className="mr-2">🛠️</span> Tools & DevOps
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {toolsSkills.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
