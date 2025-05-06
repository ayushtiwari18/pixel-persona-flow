
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Certificate } from "@/types";

import CertificationsData from "../certifications/CertificationsData";
import CertificationCard from "../certifications/CertificationCard";
import CertificationPopup from "../certifications/CertificationPopup";

export default function CertificationsSection({
  limit = 3,
  certifications,
}: {
  limit?: number;
  certifications?: Certificate[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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

        <CertificationsData limit={limit} certifications={certifications}>
          {({ displayedCertifications, selectedCert, setSelectedCert, hasMore }) => (
            <>
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
              {limit && hasMore && (
                <div className="mt-12 text-center">
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/certifications">View All Certifications</Link>
                  </Button>
                </div>
              )}

              {/* Certificate Detail Popup */}
              <AnimatePresence>
                {selectedCert && (
                  <CertificationPopup
                    certification={selectedCert}
                    onClose={() => setSelectedCert(null)}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </CertificationsData>
      </div>
    </section>
  );
}
