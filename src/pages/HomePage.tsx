
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import BlogSection from "@/components/sections/BlogSection";
import CodingProfilesSection from "@/components/sections/CodingProfilesSection";
import ContactSection from "@/components/sections/ContactSection";
import HackathonsPreview from "@/components/sections/HackathonsPreview";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection limit={6} />
        <HackathonsPreview limit={2} />
        <CertificationsSection limit={3} />
        <CodingProfilesSection
          githubUsername="ayushtiwari18"
          leetCodeUsername="_aayush03"
          hackerRankUsername="ayushtiwari10201"
        />
        <BlogSection limit={4} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
