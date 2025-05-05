
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CertificationsSection from "@/components/sections/CertificationsSection";
import { supabase } from "@/integrations/supabase/client";
import { Certificate } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { certifications as localCertifications } from "@/data/certifications";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function CertificationsPage() {
  const { data: certifications, isLoading, error } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error("Error fetching certifications:", error);
        toast.error("Failed to load certifications");
        // Fallback to local data if Supabase query fails
        return localCertifications;
      }
      
      // Map Supabase data to our Certificate type
      return data.map(cert => ({
        id: cert.id,
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        url: cert.url || undefined,
        image: cert.image || undefined,
        description: cert.description || undefined
      }));
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
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Certifications</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Professional certifications and courses I've completed to enhance my skills.
              </p>
            </motion.div>
          </div>
        </section>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
            <p className="text-lg text-muted-foreground">Loading certifications...</p>
          </div>
        ) : error ? (
          <div className="container py-12 text-center">
            <p className="text-lg text-destructive">There was an error loading the certifications.</p>
          </div>
        ) : (
          <CertificationsSection certifications={certifications} limit={0} />
        )}
      </main>
      <Footer />
    </div>
  );
}
