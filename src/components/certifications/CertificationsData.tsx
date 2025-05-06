
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { certifications as defaultCertifications } from "@/data/certifications";
import { Certificate } from "@/types";

type CertificationsDataProps = {
  limit?: number;
  certifications?: Certificate[];
  children: (props: {
    displayedCertifications: Certificate[];
    selectedCert: Certificate | null;
    setSelectedCert: React.Dispatch<React.SetStateAction<Certificate | null>>;
    hasMore: boolean;
    allCertifications: Certificate[];
  }) => React.ReactNode;
};

export default function CertificationsData({
  limit = 3,
  certifications,
  children,
}: CertificationsDataProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Fetch certifications from Supabase if not provided via props
  const { data: fetchedCertifications } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      if (certifications) return certifications;
      
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error("Error fetching certifications:", error);
        toast.error("Failed to load certifications");
        // Fallback to local data if Supabase query fails
        return defaultCertifications;
      }
      
      // Map Supabase data to our Certificate type
      return data.map((cert: any) => ({
        id: cert.id,
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        url: cert.url || undefined,
        image: cert.image || undefined,
        description: cert.description || undefined
      }));
    },
    enabled: !certifications // Only run query if certifications not provided via props
  });

  // Use provided certifications or fetched ones
  const displayCertifications = certifications || fetchedCertifications || defaultCertifications;

  // Sort certifications by date (newest first)
  const sortedCertifications = [...displayCertifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Limit the number of certifications displayed if needed
  const displayedCertifications = limit
    ? sortedCertifications.slice(0, limit)
    : sortedCertifications;

  return children({
    displayedCertifications,
    selectedCert,
    setSelectedCert,
    hasMore: sortedCertifications.length > limit,
    allCertifications: sortedCertifications
  });
}
