
import { motion } from "framer-motion";
import React from "react";

// Animation variants for content
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: custom * 0.2,
      ease: "easeOut",
    },
  }),
};

interface HeroContentProps {
  onZoomToSun: () => void;
  onToggleOrbits: () => void;
  showOrbits: boolean;
}

export default function HeroContent({ 
  onZoomToSun, 
  onToggleOrbits, 
  showOrbits 
}: HeroContentProps) {
  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={contentVariants}
        custom={0}
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
          <motion.span
            className="block"
            variants={contentVariants}
            custom={0.5}
          >
            Hi, I'm
          </motion.span>
          <motion.span
            className="block text-primary"
            variants={contentVariants}
            custom={1}
          >
            Ayush Tiwari
          </motion.span>
        </h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-md"
          variants={contentVariants}
          custom={1.5}
        >
          Space Enthusiast & Web Developer
        </motion.p>

        <div className="flex flex-wrap gap-4">
          <motion.div variants={contentVariants} custom={2}>
            <button
              onClick={onZoomToSun}
              className="bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-md transition-all"
            >
              Explore the Solar System
            </button>
          </motion.div>

          <motion.div variants={contentVariants} custom={2.5}>
            <button
              onClick={onToggleOrbits}
              className="bg-transparent border border-primary text-primary hover:bg-primary/10 py-2 px-4 rounded-md transition-all"
            >
              {showOrbits ? "Hide" : "Show"} Orbits
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
