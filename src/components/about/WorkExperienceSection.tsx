
import React from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

type WorkExperienceSectionProps = {
  isInView: boolean;
};

export default function WorkExperienceSection({ isInView }: WorkExperienceSectionProps) {
  // Card hover animation
  const cardHoverAnimation = {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 },
  };

  return (
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
  );
}
