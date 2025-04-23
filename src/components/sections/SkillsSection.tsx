
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/skills";

// Component to display a skill badge
const SkillBadge = ({ 
  name, 
  icon, 
  index 
}: { 
  name: string; 
  icon: string; 
  index: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-background rounded-lg p-4 shadow-sm border flex flex-col items-center hover:border-primary/50 hover:shadow-md transition-all duration-300"
    >
      <div className="h-12 w-12 mb-3 flex items-center justify-center">
        <span className="text-3xl">{getIconEmoji(icon)}</span>
      </div>
      <span className="text-sm font-medium">{name}</span>
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
    aws: "☁️"
  };
  
  return iconMap[icon] || "🔧";
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Group skills by category
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const toolsSkills = skills.filter(skill => skill.category === 'tools');

  return (
    <section id="skills" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive collection of technologies and tools I've worked with throughout my career.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-12">
          {/* Frontend Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-6 border-l-4 border-primary pl-3"
            >
              Frontend Development
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {frontendSkills.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-bold mb-6 border-l-4 border-primary pl-3"
            >
              Backend Development
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {backendSkills.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold mb-6 border-l-4 border-primary pl-3"
            >
              Tools & DevOps
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {toolsSkills.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
