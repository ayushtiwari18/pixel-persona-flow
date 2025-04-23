
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { certifications } from "@/data/certifications";
import { formatDate } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CertificationCard = ({
  certification,
  index,
}: {
  certification: typeof certifications[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-background rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{certification.title}</h3>
          <span className="text-xs text-muted-foreground">
            {formatDate(certification.date)}
          </span>
        </div>
        <p className="text-primary font-medium mb-2">{certification.issuer}</p>
        {certification.description && (
          <p className="text-muted-foreground text-sm mb-4">
            {certification.description}
          </p>
        )}
        {certification.url && (
          <a
            href={certification.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            View Certificate <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function CertificationsSection({ limit = 3 }: { limit?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Sort certifications by date (newest first)
  const sortedCertifications = [...certifications].sort(
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
            Professional certifications and courses I've completed to enhance my skills.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCertifications.map((certification, index) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        {limit && certifications.length > limit && (
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/certifications">View All Certifications</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
