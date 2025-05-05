
import { supabase } from "@/integrations/supabase/client";
import { hackathons } from "@/data/hackathons";
import { SupabaseHackathon, mapSupabaseToLocalHackathon, LocalHackathon } from "@/types/hackathon";

// Fetch hackathons from Supabase
export const fetchHackathons = async (): Promise<LocalHackathon[]> => {
  try {
    // Query the hackathons table that we've created
    const { data, error } = await supabase
      .from('hackathons')
      .select('*') as { data: SupabaseHackathon[] | null, error: any };

    // If there's an error or no data, return local hackathons
    if (error || !data || data.length === 0) {
      console.log("Using local hackathon data");
      return hackathons;
    }

    // If we have data, map it to our local format
    return data.map(hackathon => mapSupabaseToLocalHackathon(hackathon));
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    return hackathons; // Fallback to local data
  }
};

// Fetch a limited number of hackathons for preview
export const fetchHackathonsPreview = async (limit: number): Promise<LocalHackathon[]> => {
  try {
    // Query the hackathons table with limit
    const { data, error } = await supabase
      .from('hackathons')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit) as { data: SupabaseHackathon[] | null, error: any };

    // If there's an error or no data, return local hackathons
    if (error || !data || data.length === 0) {
      console.log("Using local hackathon data for preview");
      return hackathons.slice(0, limit);
    }

    // If we have data, map it to our local format
    return data.map(hackathon => mapSupabaseToLocalHackathon(hackathon));
  } catch (error) {
    console.error("Error fetching hackathon preview:", error);
    return hackathons.slice(0, limit); // Fallback to local data
  }
};
