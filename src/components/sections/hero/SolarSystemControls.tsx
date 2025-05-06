
interface SolarSystemControlsProps {
  showOrbits: boolean;
  autoRotate: boolean;
  onToggleOrbits: () => void;
  onToggleRotation: () => void;
}

export default function SolarSystemControls({
  showOrbits,
  autoRotate,
  onToggleOrbits,
  onToggleRotation,
}: SolarSystemControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
      <button
        onClick={onToggleOrbits}
        className="px-2 py-1 text-xs bg-black/50 text-white border border-white/20 rounded hover:bg-black/70 backdrop-blur-md"
      >
        {showOrbits ? "Hide" : "Show"} Orbits
      </button>
      <button
        onClick={onToggleRotation}
        className="px-2 py-1 text-xs bg-black/50 text-white border border-white/20 rounded hover:bg-black/70 backdrop-blur-md"
      >
        {autoRotate ? "Pause" : "Resume"} Rotation
      </button>
    </div>
  );
}
