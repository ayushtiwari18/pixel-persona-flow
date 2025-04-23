
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import BlogSection from "@/components/sections/BlogSection";
import CodingProfileSection from "@/components/sections/CodingProfileSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection limit={6} />
        <CertificationsSection limit={3} />
        <CodingProfileSection />
        <BlogSection limit={4} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
