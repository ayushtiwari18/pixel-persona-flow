
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CodingProfilesSection from "@/components/sections/CodingProfilesSection";

export default function CodingProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Coding Profiles</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                My activity and achievements across various coding platforms.
              </p>
            </motion.div>
          </div>
        </section>
        
        <CodingProfilesSection 
          githubUsername="janedeveloper"
          leetCodeUsername="janedeveloper"
        />
      </main>
      <Footer />
    </div>
  );
}
