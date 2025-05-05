
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { certifications as defaultCertifications } from "@/data/certifications";
import { formatDate } from "@/lib/utils";
import { ExternalLink, Calendar, X, Award, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Certificate } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function useOutsideClick(ref, callback) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

const CertificationCard = ({
  certification,
  index,
  onClick,
}: {
  certification: Certificate;
  index: number;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-background rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            {certification.title}
            <BadgeCheck size={18} className="text-primary" />
          </h3>
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(certification.date)}
          </span>
        </div>
        <p className="text-primary font-medium mb-2">{certification.issuer}</p>
        {certification.description && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {certification.description}
          </p>
        )}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground/80 group-hover:text-primary transition-colors">
            Click for details
          </span>
          {certification.url && (
            <a
              href={certification.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Verify <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CertificationPopup = ({
  certification,
  onClose,
}: {
  certification: Certificate;
  onClose: () => void;
}) => {
  const popupRef = useRef(null);
  useOutsideClick(popupRef, onClose);

  React.useEffect(() => {
    // Prevent scrolling when popup is open
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-background rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-background/80 rounded-full p-1 hover:bg-muted transition-colors z-10"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        {/* Image side */}
        <div className="md:w-1/2 h-64 md:h-auto relative">
          {certification.image ? (
            <img
              src={certification.image}
              alt={certification.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Award size={80} className="text-muted-foreground/30" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:hidden">
            <h2 className="text-white text-xl font-bold">
              {certification.title}
            </h2>
            <p className="text-white/90">{certification.issuer}</p>
          </div>
        </div>

        {/* Content side */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col h-full">
          <div className="hidden md:block mb-4">
            <h2 className="text-2xl font-bold">{certification.title}</h2>
            <p className="text-primary font-medium">{certification.issuer}</p>
          </div>

          <div className="mb-6 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">
              Issued on {formatDate(certification.date)}
            </span>
          </div>

          {certification.description && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                About this certification
              </h3>
              <p className="text-muted-foreground">
                {certification.description}
              </p>
            </div>
          )}

          {certification.url && (
            <div className="mt-auto pt-4 border-t border-border">
              <a
                href={certification.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
              >
                <Award className="mr-2 h-5 w-5" />
                Verify Certification
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CertificationsSection({
  limit = 3,
  certifications,
}: {
  limit?: number;
  certifications?: Certificate[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
      return data.map(cert => ({
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

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Certifications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional certifications and courses I've completed to enhance my
            skills. Click on any certification to view details.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedCertifications.map((certification, index) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              index={index}
              onClick={() => setSelectedCert(certification)}
            />
          ))}
        </div>

        {/* View All Button */}
        {limit && displayCertifications.length > limit && (
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/certifications">View All Certifications</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Certificate Detail Popup */}
      <AnimatePresence>
        {selectedCert && (
          <CertificationPopup
            certification={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
