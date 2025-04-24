
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavbarLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

export function NavbarLink({ href, children, isActive }: NavbarLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
          layoutId="navbar-indicator"
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
    </Link>
  );
}
