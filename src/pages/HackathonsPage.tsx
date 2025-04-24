
import { motion } from "framer-motion";
import { HackathonCard } from "@/components/modules/Hackathons/HackathonCard";
import { hackathons } from "@/data/hackathons";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HackathonsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mb-12 text-center"
            >
              <h1 className="text-4xl font-bold tracking-tighter mb-4">
                Hackathon Achievements
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore my journey through various hackathons and the valuable experiences gained along the way
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hackathons.map((hackathon, index) => (
                <motion.div
                  key={hackathon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <HackathonCard hackathon={hackathon} variant="full" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
