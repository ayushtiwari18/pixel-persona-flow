
import React from "react";
import { motion } from "framer-motion";

type AboutHeaderProps = {
  isInView: boolean;
};

export default function AboutHeader({ isInView }: AboutHeaderProps) {
  return (
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
  );
}
