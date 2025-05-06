
import { useState } from "react";
import SolarSystem from "./hero/SolarSystem";
import HeroContent from "./hero/HeroContent";
import ProfileImage from "./hero/ProfileImage";
import ScrollIndicator from "./hero/ScrollIndicator";
import SolarSystemControls from "./hero/SolarSystemControls";

export default function HeroSection() {
  // UI States
  const [showOrbits, setShowOrbits] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  // Toggle orbit visibility
  const handleToggleOrbits = () => {
    setShowOrbits(!showOrbits);
  };

  // Toggle rotation
  const handleToggleRotation = () => {
    setAutoRotate(!autoRotate);
  };

  // Zoom to sun handler - passed to SolarSystem component
  const handleZoomToSun = () => {
    // No implementation needed here as it's handled in SolarSystem component
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* 3D Solar System Background */}
      <SolarSystem 
        showOrbits={showOrbits} 
        autoRotate={autoRotate} 
        setShowOrbits={setShowOrbits}
        setAutoRotate={setAutoRotate}
      />

      {/* Content Overlay */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <HeroContent 
            onZoomToSun={handleZoomToSun} 
            onToggleOrbits={handleToggleOrbits} 
            showOrbits={showOrbits} 
          />

          {/* Right Column - Circular Profile Image */}
          <ProfileImage />
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <ScrollIndicator />

      {/* Solar System Controls */}
      <SolarSystemControls 
        showOrbits={showOrbits}
        autoRotate={autoRotate}
        onToggleOrbits={handleToggleOrbits}
        onToggleRotation={handleToggleRotation}
      />
    </section>
  );
}
