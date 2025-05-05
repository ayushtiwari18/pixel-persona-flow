
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HackathonCard } from "@/components/modules/Hackathons/HackathonCard";
import { hackathons as localHackathons } from "@/data/hackathons";
import { useState, useEffect } from "react";
import { fetchHackathonsPreview } from "@/services/hackathonService";
import { LocalHackathon } from "@/types/hackathon";

interface HackathonsPreviewProps {
  limit?: number;
}

export default function HackathonsPreview({ limit = 2 }: HackathonsPreviewProps) {
  const [hackathons, setHackathons] = useState<LocalHackathon[]>(localHackathons.slice(0, limit));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHackathonsPreview = async () => {
      try {
        const data = await fetchHackathonsPreview(limit);
        setHackathons(data);
      } catch (error) {
        console.error("Failed to fetch hackathons preview:", error);
      } finally {
        setLoading(false);
      }
    };

    getHackathonsPreview();
  }, [limit]);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-2">
              Hackathon Achievements
            </h2>
            <p className="text-muted-foreground">
              Check out my recent hackathon participations and achievements
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link to="/hackathons">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hackathons.map((hackathon) => (
              <HackathonCard
                key={hackathon.id}
                hackathon={hackathon}
                variant="preview"
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button asChild>
            <Link to="/hackathons">
              View All Hackathons
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
