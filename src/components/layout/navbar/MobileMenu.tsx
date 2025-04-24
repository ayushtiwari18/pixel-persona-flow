
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";
import { Github, Linkedin, Twitter } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  navItems: Array<{ title: string; href: string }>;
  currentPath: string;
  onClose: () => void;
}

export function MobileMenu({ isOpen, navItems, currentPath, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="md:hidden"
    >
      <div className="container bg-background pb-6 pt-2">
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-4 py-2 text-base font-medium transition-colors",
                currentPath === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex items-center justify-center gap-4">
          {siteConfig.links.github && (
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {siteConfig.links.linkedin && (
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {siteConfig.links.twitter && (
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
