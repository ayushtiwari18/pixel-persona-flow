
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, X, Award } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Certificate } from "@/types";

function useOutsideClick(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

type CertificationPopupProps = {
  certification: Certificate;
  onClose: () => void;
};

export default function CertificationPopup({
  certification,
  onClose,
}: CertificationPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideClick(popupRef, onClose);

  useEffect(() => {
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
}
