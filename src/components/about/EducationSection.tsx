
import React from "react";
import { motion } from "framer-motion";
import { education } from "@/data/experience";

type EducationSectionProps = {
  isInView: boolean;
};

export default function EducationSection({ isInView }: EducationSectionProps) {
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
  );
}
