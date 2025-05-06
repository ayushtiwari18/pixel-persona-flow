
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  initThreeJS,
  createStarfield,
  createPlanets,
  createAsteroidBelt,
  updatePlanets,
  animateCameraTo,
} from "./solarSystemUtils";

interface SolarSystemProps {
  showOrbits: boolean;
  autoRotate: boolean;
  setShowOrbits: (value: boolean) => void;
  setAutoRotate: (value: boolean) => void;
}

export default function SolarSystem({
  showOrbits,
  autoRotate,
  setShowOrbits,
  setAutoRotate,
}: SolarSystemProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<any>(null);
  const composerRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);
  const planetsRef = useRef<any[]>([]);
  const orbitPathsRef = useRef<THREE.Line[]>([]);
  const timeRef = useRef(0);
  const starsRef = useRef<THREE.Points | null>(null);
  const asteroidBeltRef = useRef<THREE.Mesh | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Three.js
    const { scene, camera, renderer, composer, controls } = initThreeJS(mountRef.current);
    
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    composerRef.current = composer;
    controlsRef.current = controls;

    // Create starfield
    starsRef.current = createStarfield(scene);

    // Create planets
    const { planetObjects, orbitPaths } = createPlanets(scene);
    planetsRef.current = planetObjects;
    orbitPathsRef.current = orbitPaths;

    // Create asteroid belt
    asteroidBeltRef.current = createAsteroidBelt(scene);

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01;

      // Update planets
      updatePlanets(planetsRef.current, timeRef.current, autoRotate);

      // Rotate asteroid belt
      if (asteroidBeltRef.current) {
        asteroidBeltRef.current.rotation.z += 0.001;
      }

      // Rotate stars slightly for subtle effect
      if (starsRef.current) {
        starsRef.current.rotation.x += 0.0001;
        starsRef.current.rotation.y += 0.0001;
      }

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Render scene with post-processing
      if (composerRef.current) {
        composerRef.current.render();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (
        !mountRef.current ||
        !cameraRef.current ||
        !rendererRef.current ||
        !composerRef.current
      )
        return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
      composerRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      // Dispose resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      // Clean up scene
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          const object = sceneRef.current.children[0];
          sceneRef.current.remove(object);
        }
      }
    };
  }, [autoRotate]);

  // Toggle orbit visibility
  useEffect(() => {
    orbitPathsRef.current.forEach((orbit) => {
      orbit.visible = showOrbits;
    });
  }, [showOrbits]);

  // Zoom to sun
  const handleZoomToSun = () => {
    if (!cameraRef.current || !sceneRef.current) return;

    const sun = sceneRef.current.getObjectByName("Sun");
    if (sun) {
      animateCameraTo(cameraRef.current, sun.position);
    }
  };

  return (
    <div ref={mountRef} className="absolute inset-0 z-0" />
  );
}
