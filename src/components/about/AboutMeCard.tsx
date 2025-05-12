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
        I'm Ayush Tiwari, a passionate full-stack developer and cybersecurity
        enthusiast currently pursuing B.Tech in Computer Science. I specialize
        in building scalable web applications using the MERN stack and enjoy
        solving real-world problems through technology.
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-muted-foreground mb-6 leading-relaxed"
      >
        I've interned with organizations like Nullclass and Cisco Networking
        Academy, where I worked on secure authentication systems, cloud
        infrastructure, and video streaming optimization. My projects span from
        sports management systems to interactive ocean literacy platforms.
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-muted-foreground leading-relaxed"
      >
        Outside of development, I love exploring creative tools like Blender and
        Figma, contributing to hackathons, and leading initiatives that blend
        education with innovation. I'm driven by curiosity, collaboration, and a
        desire to make technology more meaningful.
      </motion.p>
      
    </motion.div>
  );
}
