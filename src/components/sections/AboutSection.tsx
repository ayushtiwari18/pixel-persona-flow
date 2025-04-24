import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education, experiences } from "@/data/experience";
import { formatDate } from "@/lib/utils";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Card hover animation
  const cardHoverAnimation = {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 },
  };

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Full Stack Developer with a passion for creating beautiful,
            responsive, and user-friendly web applications.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={cardHoverAnimation}
            className="bg-background rounded-xl p-8 shadow-sm border transition-all duration-300"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-6 flex items-center"
            >
              <span className="mr-2 text-2xl">👨‍💻</span> A Bit About Me
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-6 leading-relaxed"
            >
              I'm a dedicated full-stack developer with over 7 years of
              experience creating web and mobile applications. My journey began
              with a curiosity about how websites work, which led me to pursue
              degrees in Computer Science.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-6 leading-relaxed"
            >
              Throughout my career, I've worked with various technologies and
              frameworks, always striving to stay at the forefront of web
              development. I'm particularly passionate about creating intuitive
              user interfaces and optimizing application performance.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed"
            >
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing my knowledge
              through blog posts and community discussions.
            </motion.p>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <span className="mr-2 text-2xl">🎓</span> Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    whileHover={cardHoverAnimation}
                    className="bg-background rounded-lg p-6 shadow-sm border transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                      <div>
                        <h4 className="font-bold text-lg">{edu.institution}</h4>
                        <p className="text-primary font-medium">
                          {edu.degree} in {edu.field}
                        </p>
                      </div>
                      <span className="text-sm bg-muted/50 px-3 py-1 rounded-full text-muted-foreground whitespace-nowrap">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                    <p className="text-muted-foreground mt-2 text-sm flex items-center">
                      <span className="mr-1">📍</span> {edu.location}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <span className="mr-2 text-2xl">💼</span> Work Experience
              </h3>
              <div className="relative pl-10 border-l-2 border-muted space-y-10">
                {experiences.slice(0, 3).map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    <div className="absolute -left-[45px] h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                      <span className="text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <motion.div
                      whileHover={cardHoverAnimation}
                      className="bg-background rounded-lg p-6 shadow-sm border transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                        <div>
                          <h4 className="font-bold text-lg">{exp.title}</h4>
                          <p className="text-primary font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-sm bg-muted/50 px-3 py-1 rounded-full text-muted-foreground whitespace-nowrap">
                          {exp.startDate.substring(0, 4)} -{" "}
                          {exp.endDate === "Present"
                            ? "Present"
                            : exp.endDate.substring(0, 4)}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs bg-muted px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
                <div className="absolute -bottom-4 -left-[24px]">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shadow-md">
                    <span className="text-muted-foreground text-xl">...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
