
import { Hackathon as LocalHackathon } from "@/data/hackathons";

// Re-export the Hackathon type from data/hackathons
export type { LocalHackathon };

// Type for Supabase hackathon
export interface SupabaseHackathon {
  id: string;
  name: string;
  date: string;
  role: string;
  result: string;
  learnings: string[];
  image?: string;
}

// Function to convert Supabase hackathon to local hackathon format
export const mapSupabaseToLocalHackathon = (hackathon: SupabaseHackathon): LocalHackathon => {
  return {
    id: hackathon.id,
    name: hackathon.name,
    date: hackathon.date,
    role: hackathon.role,
    result: hackathon.result as "Winner" | "Finalist" | "Participant",
    learnings: hackathon.learnings || [],
    image: hackathon.image
  };
};
