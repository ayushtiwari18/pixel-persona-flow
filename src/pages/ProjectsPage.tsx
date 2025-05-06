
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsHeader from "@/components/projects/ProjectsHeader";
import ProjectsFetch from "@/components/projects/ProjectsFetch";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <ProjectsHeader />
        <ProjectsFetch />
      </main>
      <Footer />
    </div>
  );
}
