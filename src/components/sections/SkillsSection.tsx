import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/skills";

// Helper function: Get Icons8 image URL based on skill name
function getIconEmoji(icon: string): string {
  const iconMap: Record<string, string> = {
    html5: "https://img.icons8.com/color/48/html-5.png",
    css3: "https://img.icons8.com/color/48/css3.png",
    javascript: "https://img.icons8.com/color/48/javascript--v1.png",
    typescript: "https://img.icons8.com/color/48/typescript.png",
    react: "https://img.icons8.com/plasticine/48/react.png",
    nextjs:
      "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
    redux: "https://img.icons8.com/color/48/redux.png",
    tailwind: "https://img.icons8.com/color/48/tailwindcss.png",
    sass: "https://img.icons8.com/color/48/sass.png",
    materialui: "https://img.icons8.com/color/48/material-ui.png",
    framer:
      "https://img.icons8.com/?size=100&id=G7NMjcZM9R01&format=png&color=000000",
    threejs:
      "https://img.icons8.com/?size=100&id=5hf4XRUvAyeP&format=png&color=000000",
    vite: "https://img.icons8.com/color/48/vite.png",
    nodejs: "https://img.icons8.com/color/48/nodejs.png",
    express:
      "https://img.icons8.com/?size=100&id=WNoJgbzDr3i2&format=png&color=000000",
    mongodb: "https://img.icons8.com/color/48/mongodb.png",
    postgresql: "https://img.icons8.com/color/48/postgreesql.png",
    mysql: "/icons/mysql.png",
    azure: "https://img.icons8.com/color/48/microsoft-azure.png",
    firebase: "https://img.icons8.com/color/48/firebase.png",
    graphql: "https://img.icons8.com/color/48/graphql.png",
    docker: "https://img.icons8.com/color/48/docker.png",
    git: "https://img.icons8.com/color/48/git.png",
    github: "https://img.icons8.com/ios-glyphs/48/github.png",
    vscode: "https://img.icons8.com/color/48/visual-studio-code-2019.png",
    figma: "https://img.icons8.com/color/48/figma--v1.png",
    webpack: "https://img.icons8.com/color/48/webpack.png",
    jest: "https://img.icons8.com/color/48/jest-can.png",
    cypress: "https://img.icons8.com/ios-filled/50/cypress.png",
    npm: "https://img.icons8.com/color/48/npm.png",
    postman:
      "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/postman-api-platform.png",
    aws: "https://img.icons8.com/color/48/amazon-web-services.png",
    jwt: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/jwt.png",
    oauth: "https://img.icons8.com/color/48/oauth.png",
    bcrypt: "https://img.icons8.com/ios-filled/50/lock-2.png",
    socketio:
      "/icons/socketio.png",
    sqlserver: "https://img.icons8.com/color/48/microsoft-sql-server.png",
    ssms: "https://img.icons8.com/color/48/sql.png",
    linux: "https://img.icons8.com/color/48/linux.png",
    nmap: "https://img.icons8.com/external-flat-icons-inmotus-design/67/external-nmap-programming-and-coding-flat-icons-inmotus-design.png",
    nessus:
      "https://img.icons8.com/external-flat-juicy-fish/60/external-cyber-security-security-flat-juicy-fish.png",
    openvas:
      "https://img.icons8.com/external-nawicon-flat-nawicon/64/external-scan-technology-nawicon-flat-nawicon.png",
    ldap: "https://img.icons8.com/color/48/database.png",
    radius: "https://img.icons8.com/color/48/wifi.png",
    rbac: "https://img.icons8.com/ios-filled/50/privacy.png",
    tls: "https://img.icons8.com/fluency/48/ssl.png",
    ssl: "https://img.icons8.com/color/48/ssl.png",
    vpn: "https://img.icons8.com/color/48/vpn.png",
    ids: "https://img.icons8.com/color/48/firewall.png",
    ips: "https://img.icons8.com/color/48/network-card.png",
    cisco: "https://img.icons8.com/color/48/cisco.png",
    python: "https://img.icons8.com/color/48/python--v1.png",
    java: "https://img.icons8.com/color/48/java-coffee-cup-logo.png",
    cplusplus: "https://img.icons8.com/color/48/c-plus-plus-logo.png",
    bootstrap:
      "https://img.icons8.com/?size=100&id=g9mmSxx3SwAI&format=png&color=000000",
    d3js: "https://img.icons8.com/?size=100&id=uWTZqDq36mIl&format=png&color=000000",
    p5js: "/icons/p5js.png",
    api: "https://img.icons8.com/?size=100&id=121837&format=png&color=000000",
  };

  return (
    iconMap[icon.toLowerCase()] || "https://img.icons8.com/ios/50/code.png"
  );
}

// Badge component with icon
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
        <img
          src={getIconEmoji(icon)}
          alt={`${name} icon`}
          className="h-12 w-12 object-contain"
        />
      </div>
      <span className="text-sm font-medium text-center">{name}</span>
    </motion.div>
  );
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const frontendSkills = skills.filter(
    (skill) => skill.category === "frontend"
  );
  const backendSkills = skills.filter((skill) => skill.category === "backend");
  const toolsSkills = skills.filter((skill) => skill.category === "tools");

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

          {/* Tools & DevOps */}
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
