
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CodingProfilesSection from "@/components/sections/CodingProfilesSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function CodingProfilePage() {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['coding-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coding_profiles')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') { // Not found error
        console.error("Error fetching coding profiles:", error);
        return null;
      }
      
      return data;
    }
  });

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
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Coding Profiles
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                My activity and achievements across various coding platforms.
              </p>
            </motion.div>
          </div>
        </section>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
            <p className="text-lg text-muted-foreground">Loading coding profiles...</p>
          </div>
        ) : (
          <CodingProfilesSection
            githubUsername={profileData?.github_username || "ayushtiwari18"}
            leetCodeUsername={profileData?.leetcode_username || "_aayush03"}
            hackerRankUsername={profileData?.hackerrank_username || "ayushtiwari10201"}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
