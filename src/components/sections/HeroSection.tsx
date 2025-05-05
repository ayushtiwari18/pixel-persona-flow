import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

export default function SolarSystemHero() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const composerRef = useRef(null);
  const animationIdRef = useRef(null);
  const planetsRef = useRef([]);
  const orbitPathsRef = useRef([]);
  const timeRef = useRef(0);
  const starsRef = useRef(null);
  const asteroidBeltRef = useRef(null);

  // UI States
  const [showOrbits, setShowOrbits] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [profileImage, setProfileImage] = useState("/api/placeholder/300/300");

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      10000
    );
    camera.position.set(0, 200, 500);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Post-processing for glow effects
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      ),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    );

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 50;
    controls.maxDistance = 1000;
    controlsRef.current = controls;

    // Light sources
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Create starfield
    createStarfield();

    // Create planets
    createPlanets();

    // Create asteroid belt
    createAsteroidBelt();

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01;

      // Update planets
      updatePlanets();

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
  }, []);

  // Create starfield
  const createStarfield = () => {
    if (!sceneRef.current) return;

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      transparent: true,
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    sceneRef.current.add(stars);
    starsRef.current = stars;
  };

  // Planet data - simplified (scaled for better visualization)
  const planets = [
    {
      name: "Sun",
      size: 40,
      color: 0xffff00,
      orbitRadius: 0,
      orbitSpeed: 0,
      rotationSpeed: 0.002,
      emissive: true,
    },
    {
      name: "Mercury",
      size: 3.2,
      color: 0xaaaaaa,
      orbitRadius: 60,
      orbitSpeed: 1.6,
      rotationSpeed: 0.004,
    },
    {
      name: "Venus",
      size: 6,
      color: 0xe6a760,
      orbitRadius: 85,
      orbitSpeed: 1.17,
      rotationSpeed: 0.002,
    },
    {
      name: "Earth",
      size: 6.3,
      color: 0x6b93d6,
      orbitRadius: 120,
      orbitSpeed: 1,
      rotationSpeed: 0.02,
    },
    {
      name: "Mars",
      size: 3.4,
      color: 0xd5704e,
      orbitRadius: 180,
      orbitSpeed: 0.8,
      rotationSpeed: 0.018,
    },
    {
      name: "Jupiter",
      size: 22,
      color: 0xe0be95,
      orbitRadius: 250,
      orbitSpeed: 0.43,
      rotationSpeed: 0.04,
    },
    {
      name: "Saturn",
      size: 18.5,
      color: 0xe0d7a4,
      orbitRadius: 320,
      orbitSpeed: 0.32,
      rotationSpeed: 0.038,
      hasRing: true,
    },
    {
      name: "Uranus",
      size: 8,
      color: 0xa5f2f3,
      orbitRadius: 390,
      orbitSpeed: 0.23,
      rotationSpeed: 0.03,
    },
    {
      name: "Neptune",
      size: 7.7,
      color: 0x517cff,
      orbitRadius: 460,
      orbitSpeed: 0.18,
      rotationSpeed: 0.031,
    },
  ];

  // Create planets
  const createPlanets = () => {
    if (!sceneRef.current) return;

    const planetObjects = [];
    const orbitPaths = [];

    planets.forEach((planet) => {
      // Create planet geometry and material
      const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
      let material;

      if (planet.emissive) {
        material = new THREE.MeshStandardMaterial({
          color: planet.color,
          emissive: planet.color,
          emissiveIntensity: 2,
        });
      } else {
        material = new THREE.MeshPhongMaterial({
          color: planet.color,
          shininess: 10,
        });
      }

      // Create mesh
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = planet.name;

      if (planet.orbitRadius > 0) {
        // Position planets around the sun
        const planetOrbitAngle = Math.random() * Math.PI * 2;
        mesh.position.x = Math.cos(planetOrbitAngle) * planet.orbitRadius;
        mesh.position.z = Math.sin(planetOrbitAngle) * planet.orbitRadius;

        // Create orbit path
        const orbitGeometry = new THREE.BufferGeometry();
        const orbitPoints = [];
        const segments = 128;

        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          orbitPoints.push(
            Math.cos(angle) * planet.orbitRadius,
            0,
            Math.sin(angle) * planet.orbitRadius
          );
        }

        orbitGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(orbitPoints, 3)
        );
        const orbitMaterial = new THREE.LineBasicMaterial({
          color: 0xaaaaaa,
          transparent: true,
          opacity: 0.3,
          linewidth: 1,
        });

        const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        orbit.userData.isOrbit = true;
        sceneRef.current.add(orbit);
        orbitPaths.push(orbit);
      }

      sceneRef.current.add(mesh);
      planetObjects.push({
        mesh,
        orbitSpeed: planet.orbitSpeed,
        rotationSpeed: planet.rotationSpeed,
        orbitRadius: planet.orbitRadius,
      });

      // Create ring for Saturn
      if (planet.hasRing) {
        const ringGeometry = new THREE.RingGeometry(
          planet.size + 5,
          planet.size + 12,
          32
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0xe0d7a4,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 3;
        mesh.add(ring);
      }
    });

    planetsRef.current = planetObjects;
    orbitPathsRef.current = orbitPaths;
  };

  // Create asteroid belt
  const createAsteroidBelt = () => {
    if (!sceneRef.current) return;

    const asteroidGeometry = new THREE.TorusGeometry(240, 40, 16, 100);
    const asteroidMaterial = new THREE.MeshBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.2,
    });
    const asteroidBelt = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    asteroidBelt.rotation.x = Math.PI / 2;
    sceneRef.current.add(asteroidBelt);
    asteroidBeltRef.current = asteroidBelt;
  };

  // Update planets positions and rotations
  const updatePlanets = () => {
    if (!planetsRef.current) return;

    planetsRef.current.forEach((planet) => {
      if (planet.orbitRadius > 0) {
        planet.mesh.position.x =
          Math.cos(timeRef.current * planet.orbitSpeed) * planet.orbitRadius;
        planet.mesh.position.z =
          Math.sin(timeRef.current * planet.orbitSpeed) * planet.orbitRadius;
      }

      if (autoRotate) {
        planet.mesh.rotation.y += planet.rotationSpeed;
      }
    });
  };

  // Toggle orbit visibility
  const handleToggleOrbits = () => {
    setShowOrbits(!showOrbits);
    orbitPathsRef.current.forEach((orbit) => {
      orbit.visible = !showOrbits;
    });
  };

  // Toggle rotation
  const handleToggleRotation = () => {
    setAutoRotate(!autoRotate);
  };

  // Zoom to sun
  const handleZoomToSun = () => {
    if (!cameraRef.current || !controlsRef.current || !sceneRef.current) return;

    const sun = sceneRef.current.getObjectByName("Sun");
    if (sun) {
      animateCameraTo(sun.position, 1000);
    }
  };

  // Animate camera to position
  const animateCameraTo = (targetPosition, duration = 1000) => {
    if (!cameraRef.current) return;

    const startPosition = cameraRef.current.position.clone();
    const startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      cameraRef.current.position.lerpVectors(
        startPosition,
        new THREE.Vector3(
          targetPosition.x,
          targetPosition.y + 200,
          targetPosition.z + 300
        ),
        progress
      );

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    update();
  };

  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: custom * 0.2,
        ease: "easeOut",
      },
    }),
  };

  // Animation variants for the pulsing glow effect
  const glowVariants = {
    initial: {
      opacity: 0.7,
      scale: 1,
    },
    animate: {
      opacity: [0.7, 0.9, 0.7],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
        ease: "easeInOut",
      },
    },
  };

  // Animation for the circular image
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* 3D Solar System Background */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Content Overlay */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              custom={0}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                <motion.span
                  className="block"
                  variants={contentVariants}
                  custom={0.5}
                >
                  Hi, I'm
                </motion.span>
                <motion.span
                  className="block text-primary"
                  variants={contentVariants}
                  custom={1}
                >
                  Ayush Tiwari
                </motion.span>
              </h1>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-md"
                variants={contentVariants}
                custom={1.5}
              >
                Space Enthusiast & Web Developer
              </motion.p>

              <div className="flex flex-wrap gap-4">
                <motion.div variants={contentVariants} custom={2}>
                  <button
                    onClick={handleZoomToSun}
                    className="bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-md transition-all"
                  >
                    Explore the Solar System
                  </button>
                </motion.div>

                <motion.div variants={contentVariants} custom={2.5}>
                  <button
                    onClick={handleToggleOrbits}
                    className="bg-transparent border border-primary text-primary hover:bg-primary/10 py-2 px-4 rounded-md transition-all"
                  >
                    {showOrbits ? "Hide" : "Show"} Orbits
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Circular Profile Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={imageVariants}
            className="hidden lg:flex justify-center"
          >
            <div className="relative h-80 w-80">
              {/* Multiple glowing rings */}
              <motion.div
                className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-20 blur-3xl"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              />
              <motion.div
                className="absolute inset-0 -m-3 rounded-full bg-gradient-to-r from-primary to-indigo-400 opacity-30 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Main circular container */}
              <motion.div
                className="relative z-10 h-full w-full rounded-full border-2 border-primary/30 bg-background/40 p-4 backdrop-blur-md"
                animate={{
                  y: [0, -15, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Rotating ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-300/30"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Inner glowing border */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-primary/20 backdrop-blur-sm" />

                {/* Profile Image */}
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={() =>
                      setProfileImage(
                        "20241226_190337.jpg"
                      )
                    }
                  />

                  {/* Overlay shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 2,
        }}
      >
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <span className="text-muted-foreground text-xs mb-2">
            Scroll down
          </span>
          <div className="w-5 h-8 border-2 border-muted-foreground rounded-full flex justify-center p-1 relative overflow-hidden">
            {/* Glowing background effect */}
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-full"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="w-1 h-1 bg-primary rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Solar System Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <button
          onClick={handleToggleOrbits}
          className="px-2 py-1 text-xs bg-black/50 text-white border border-white/20 rounded hover:bg-black/70 backdrop-blur-md"
        >
          {showOrbits ? "Hide" : "Show"} Orbits
        </button>
        <button
          onClick={handleToggleRotation}
          className="px-2 py-1 text-xs bg-black/50 text-white border border-white/20 rounded hover:bg-black/70 backdrop-blur-md"
        >
          {autoRotate ? "Pause" : "Resume"} Rotation
        </button>
      </div>
    </section>
  );
}
