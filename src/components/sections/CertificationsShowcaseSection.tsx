import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ExternalLink, X, Calendar, Award } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Certificate = {
  id: string;
  image: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
  description?: string;
  skills?: string[];
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function update() {
      setIsMobile(window.innerWidth < 768);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobile;
}

function useOutsideClick(ref, callback) {
  useEffect(() => {
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

export default function CertificationsShowcaseSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const isMobile = useIsMobile();
  const popupRef = useRef(null);

  useOutsideClick(popupRef, () => setSelectedCert(null));

  useEffect(() => {
    // Dynamically import the JSON file at runtime
    import("@/data/certificates.json").then((mod) => {
      setCertificates(mod.default || []);
    });
  }, []);

  useEffect(() => {
    // Prevent scrolling when popup is open
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  if (!certificates.length) return null;

  const Card = ({ cert }: { cert: Certificate }) => (
    <motion.div
      className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-border cursor-pointer group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => setSelectedCert(cert)}
    >
      <div className="relative overflow-hidden">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-medium px-4 py-2 rounded-md bg-primary/80">
            View Details
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {cert.title}
            <BadgeCheck size={18} className="text-primary" />
          </h3>
          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {format(new Date(cert.date), "PPP")}
          </span>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary text-sm font-medium hover:underline"
            aria-label="Verify certification"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Verify
          </a>
        </div>
      </div>
    </motion.div>
  );

  const CertificatePopup = ({ cert }: { cert: Certificate }) => (
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
          onClick={() => setSelectedCert(null)}
          className="absolute top-4 right-4 bg-background/80 rounded-full p-1 hover:bg-muted transition-colors z-10"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        {/* Image side */}
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:hidden">
            <h2 className="text-white text-xl font-bold">{cert.title}</h2>
            <p className="text-white/90">{cert.issuer}</p>
          </div>
        </div>

        {/* Content side */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col h-full">
          <div className="hidden md:block mb-4">
            <h2 className="text-2xl font-bold">{cert.title}</h2>
            <p className="text-primary font-medium">{cert.issuer}</p>
          </div>

          <div className="mb-6 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">
              Issued on {format(new Date(cert.date), "PPP")}
            </span>
          </div>

          {cert.description && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                About this certification
              </h3>
              <p className="text-muted-foreground">{cert.description}</p>
            </div>
          )}

          {cert.skills && cert.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-border">
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
            >
              <Award className="mr-2 h-5 w-5" />
              Verify Certification
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="certifications" className="py-20 bg-muted/30 text-foreground">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Click on any certificate to view more details
        </motion.p>

        {isMobile ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {certificates.map((cert) => (
              <SwiperSlide key={cert.id}>
                <Card cert={cert} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <Card key={cert.id} cert={cert} />
            ))}
          </div>
        )}
      </div>

      {/* Certificate Detail Popup */}
      <AnimatePresence>
        {selectedCert && <CertificatePopup cert={selectedCert} />}
      </AnimatePresence>
    </section>
  );
}
