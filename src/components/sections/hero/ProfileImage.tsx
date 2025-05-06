
import { motion } from "framer-motion";
import { useState } from "react";

// Animation for the circular image
const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

// Animation variants for the pulsing glow effect
const glowVariants = {
  initial: {
    opacity: 0.7,
    scale: 1,
  },
  animate: {
    opacity: [0.7, 0.9, 0.7],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as "reverse",
      ease: "easeInOut",
    },
  },
};

export default function ProfileImage() {
  const [profileImage, setProfileImage] = useState("/api/placeholder/300/300");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={imageVariants}
      className="hidden lg:flex justify-center"
    >
      <div className="relative h-80 w-80">
        {/* Multiple glowing rings */}
        <motion.div
          className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-20 blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute inset-0 -m-3 rounded-full bg-gradient-to-r from-primary to-indigo-400 opacity-30 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Main circular container */}
        <motion.div
          className="relative z-10 h-full w-full rounded-full border-2 border-primary/30 bg-background/40 p-4 backdrop-blur-md"
          animate={{
            y: [0, -15, 0],
            transition: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          {/* Rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-300/30"
            animate={{ rotate: 360 }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner glowing border */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-primary/20 backdrop-blur-sm" />

          {/* Profile Image */}
          <div className="relative h-full w-full rounded-full overflow-hidden">
            <img
              src={profileImage}
              alt="Profile"
              className="h-full w-full object-cover"
              onError={() => setProfileImage("20241226_190337.jpg")}
            />

            {/* Overlay shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
