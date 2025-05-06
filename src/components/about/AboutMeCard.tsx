
import React from "react";
import { motion } from "framer-motion";

type AboutMeCardProps = {
  isInView: boolean;
};

export default function AboutMeCard({ isInView }: AboutMeCardProps) {
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
  );
}
