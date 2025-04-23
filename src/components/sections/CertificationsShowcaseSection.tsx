
import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
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
};

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
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

export default function CertificationsShowcaseSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Dynamically import the JSON file at runtime
    import("@/data/certificates.json").then(mod => {
      setCertificates(mod.default || []);
    });
  }, []);

  if (!certificates.length) return null;

  const Card = ({ cert }: { cert: Certificate }) => (
    <motion.div
      className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-border"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <img
        src={cert.image}
        alt={cert.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {cert.title}
            <BadgeCheck size={18} className="text-primary" />
          </h3>
          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">
            {format(new Date(cert.date), "PPP")}
          </span>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary text-sm font-medium hover:underline"
            aria-label="Verify certification"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Verify
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="certifications" className="py-20 bg-muted/30 text-foreground">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.10 }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </motion.h2>

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
            {certificates.map(cert => (
              <SwiperSlide key={cert.id}>
                <Card cert={cert} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {certificates.map(cert => (
              <Card key={cert.id} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
