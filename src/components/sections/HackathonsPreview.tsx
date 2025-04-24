
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HackathonCard } from "@/components/modules/Hackathons/HackathonCard";
import { hackathons } from "@/data/hackathons";

interface HackathonsPreviewProps {
  limit?: number;
}

export default function HackathonsPreview({ limit = 2 }: HackathonsPreviewProps) {
  const recentHackathons = hackathons.slice(0, limit);

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentHackathons.map((hackathon) => (
            <HackathonCard
              key={hackathon.id}
              hackathon={hackathon}
              variant="preview"
            />
          ))}
        </div>

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
