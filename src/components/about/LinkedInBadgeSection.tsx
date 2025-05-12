import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

// Creating a simple dark mode hook to replace the imported one
const useDarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check for system preference or stored preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  return { theme };
};

type LinkedInBadgeSectionProps = {
  isInView: boolean;
};

export default function LinkedInBadgeSection({
  isInView,
}: LinkedInBadgeSectionProps) {
  const { theme } = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Mount check to prevent SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle LinkedIn script loading
  useEffect(() => {
    if (!isMounted) return;

    // Remove any existing LinkedIn script to prevent duplicates
    const existingScript = document.getElementById("linkedin-badge-script");
    if (existingScript) {
      existingScript.remove();
    }

    // Create and append the LinkedIn script
    const script = document.createElement("script");
    script.id = "linkedin-badge-script";
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptToRemove = document.getElementById("linkedin-badge-script");
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [theme, isMounted]); // Re-run when theme changes or component mounts

  // Safe random ID for CSS
  const badgeId = React.useMemo(
    () =>
      typeof window !== "undefined"
        ? `badge-${Math.random().toString(36).slice(2, 11)}`
        : "badge-placeholder",
    []
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-background/50 rounded-xl p-6 shadow-sm border border-border/50"
    >
      <motion.h3
        variants={itemVariants}
        className="text-2xl font-bold mb-4 flex items-center"
      >
        <Linkedin className="mr-2 text-blue-500" size={24} />
        Connect With Me
      </motion.h3>

      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center"
      >
        <p className="text-muted-foreground mb-4 text-center">
          Let's connect professionally! Follow my career journey and reach out
          for collaborations.
        </p>

        {isMounted && (
          <div
            className={`badge-base LI-profile-badge ${
              theme === "dark" ? "dark-mode" : ""
            }`}
            data-locale="en_US"
            data-size="large"
            data-theme={theme === "dark" ? "dark" : "light"}
            data-type="HORIZONTAL"
            data-vanity="tiwariaayush"
            data-version="v1"
          >
            <a
              className="badge-base__link LI-simple-link"
              href="https://in.linkedin.com/in/tiwariaayush?trk=profile-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              
            </a>
          </div>
        )}

        {/* Custom CSS for better badge display */}
        {isMounted && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .badge-base {
              min-height: 220px;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 12px;
              background-color: transparent !important;
            }
            
            .LI-badge-container {
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 auto !important;
              background-color: ${
                theme === "dark" ? "rgb(17, 24, 39)" : "#ffffff"
              } !important;
              border-radius: 8px !important;
              overflow: hidden !important;
            }
            
            .LI-badge-container.horizontal {
              width: 100% !important;
            }
            
            .LI-profile-pic {
              width: 100px !important;
              height: 100px !important;
            }
            
            .LI-name {
              font-size: 18px !important;
              font-weight: 600 !important;
            }
            
            .LI-field {
              font-size: 14px !important;
            }
            
            .LI-badge-container-horizontal-dark {
              background-color: rgb(17, 24, 39) !important;
              border: 1px solid rgba(75, 85, 99, 0.3) !important;
            }
            
            .LI-badge-container iframe {
              width: 100% !important;
              height: 100% !important;
            }

            /* Make the badge use the full width */
            #badge-embed-${badgeId} {
              width: 100% !important;
              max-width: 100% !important;
            }
          `,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
