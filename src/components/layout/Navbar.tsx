
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import MobileMenu from "./navbar/MobileMenu";
import NavbarLink from "./navbar/NavbarLink";
import SocialLinks from "./navbar/SocialLinks";
import UserMenu from "./navbar/UserMenu";
import { useSiteConfigContext } from "@/components/SiteConfigProvider";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { config } = useSiteConfigContext();

  // Update scrolled state based on window scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    // Initialize scroll state
    handleScroll();

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up realtime subscription to navigation menu changes
  useEffect(() => {
    const channel = supabase
      .channel('navigation-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'navigation_items'
        },
        (payload) => {
          console.log('Navigation items changed:', payload);
          // Would re-fetch navigation from Supabase here
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 py-4 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className={`text-xl font-bold ${
            scrolled ? "text-foreground" : "text-foreground"
          } transition-colors`}
        >
          {config.name || "Portfolio"}
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          <NavbarLink to="/" isActive={location.pathname === "/"}>
            Home
          </NavbarLink>
          <NavbarLink to="/about" isActive={location.pathname === "/about"}>
            About
          </NavbarLink>
          <NavbarLink
            to="/projects"
            isActive={location.pathname.includes("/projects")}
          >
            Projects
          </NavbarLink>
          <NavbarLink
            to="/hackathons"
            isActive={location.pathname === "/hackathons"}
          >
            Hackathons
          </NavbarLink>
          <NavbarLink
            to="/certifications"
            isActive={location.pathname === "/certifications"}
          >
            Certifications
          </NavbarLink>
          <NavbarLink
            to="/coding-profile"
            isActive={location.pathname === "/coding-profile"}
          >
            Coding Profiles
          </NavbarLink>
          <NavbarLink
            to="/blog"
            isActive={location.pathname.includes("/blog")}
          >
            Blog
          </NavbarLink>
          <NavbarLink
            to="/contact"
            isActive={location.pathname === "/contact"}
          >
            Contact
          </NavbarLink>
        </div>

        <div className="flex items-center space-x-2">
          <SocialLinks />
          <ThemeToggle />
          {user && <UserMenu />}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
