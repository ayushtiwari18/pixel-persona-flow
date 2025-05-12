import { useRef } from "react";
import { useInView } from "framer-motion";

import AboutHeader from "../about/AboutHeader";
import AboutMeCard from "../about/AboutMeCard";
import LinkedInBadgeSection from "../about/LinkedInBadgeSection";
import EducationSection from "../about/EducationSection";
import WorkExperienceSection from "../about/WorkExperienceSection";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <AboutHeader isInView={isInView} />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-12">
            <AboutMeCard isInView={isInView} />
            <LinkedInBadgeSection isInView={isInView} />
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <EducationSection isInView={isInView} />
            <WorkExperienceSection isInView={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}
