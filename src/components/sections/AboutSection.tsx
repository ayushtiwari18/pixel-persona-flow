
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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Full Stack Developer with a passion for creating beautiful, responsive, and user-friendly web applications.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-background rounded-lg p-6 shadow-sm border"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6">
              A Bit About Me
            </motion.h3>
            <motion.p variants={itemVariants} className="text-muted-foreground mb-4">
              I'm a dedicated full-stack developer with over 7 years of experience creating web and mobile applications.
              My journey began with a curiosity about how websites work, which led me to pursue degrees in Computer Science.
            </motion.p>
            <motion.p variants={itemVariants} className="text-muted-foreground mb-4">
              Throughout my career, I've worked with various technologies and frameworks, always striving to stay 
              at the forefront of web development. I'm particularly passionate about creating intuitive user interfaces
              and optimizing application performance.
            </motion.p>
            <motion.p variants={itemVariants} className="text-muted-foreground">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or sharing my knowledge through blog posts and community discussions.
            </motion.p>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div 
                    key={index} 
                    className="bg-background rounded-lg p-4 shadow-sm border"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{edu.institution}</h4>
                        <p className="text-primary font-medium">
                          {edu.degree} in {edu.field}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-muted-foreground mt-2 text-sm">
                        {edu.description}
                      </p>
                    )}
                    <p className="text-muted-foreground mt-1 text-sm">
                      {edu.location}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
              <div className="relative pl-8 border-l-2 border-muted space-y-8">
                {experiences.slice(0, 3).map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[41px] h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div className="bg-background rounded-lg p-4 shadow-sm border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{exp.title}</h4>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {exp.startDate.substring(0, 4)} - {exp.endDate === 'Present' 
                          ? 'Present' 
                          : exp.endDate.substring(0, 4)}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-2 text-sm">
                        {exp.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="text-xs bg-muted px-2 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="absolute -bottom-4 -left-[19px]">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
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
