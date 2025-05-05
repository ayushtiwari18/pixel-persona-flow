
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HackathonCard } from "@/components/modules/Hackathons/HackathonCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { fetchHackathons } from "@/services/hackathonService";
import { LocalHackathon } from "@/types/hackathon";
import { hackathons as localHackathons } from "@/data/hackathons";

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState<LocalHackathon[]>(localHackathons);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHackathons = async () => {
      try {
        const data = await fetchHackathons();
        setHackathons(data);
      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      } finally {
        setLoading(false);
      }
    };

    getHackathons();
  }, []);

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

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
