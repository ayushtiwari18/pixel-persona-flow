
import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Certificate } from "@/types";

type CertificationCardProps = {
  certification: Certificate;
  index: number;
  onClick: () => void;
};

export default function CertificationCard({
  certification,
  index,
  onClick,
}: CertificationCardProps) {
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
}
