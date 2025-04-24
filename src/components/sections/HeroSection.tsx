import { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/button";
import { ButtonOutline } from "@/components/ui/button-outline";
import { useThree, Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";

// Enhanced particle field with glow and wave effects
function ParticlesField({ count = 1800 }) {
  const mesh = useRef<THREE.Points>(null);
  const particlesMaterial = useRef<THREE.PointsMaterial | null>(null);

  const particles = useMemo(() => {
    const temp = [];
    const sphereRadius = 3.0;

    // Create particles in a more interesting pattern - double sphere with connection trails
    for (let i = 0; i < count * 0.6; i++) {
      // Main sphere distribution
      const radius = sphereRadius * Math.pow(Math.random(), 0.5); // More concentration towards outer shell
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      temp.push({ x, y, z, size: 0.03 + Math.random() * 0.05 });
    }

    // Create a secondary cluster
    for (let i = 0; i < count * 0.4; i++) {
      const smallRadius = 1.2;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      const x = smallRadius * Math.sin(phi) * Math.cos(theta);
      const y = smallRadius * Math.sin(phi) * Math.sin(theta) + 0.5; // Offset slightly
      const z = smallRadius * Math.cos(phi) - 1.0; // Position in front

      temp.push({ x, y, z, size: 0.02 + Math.random() * 0.04 });
    }

    return temp;
  }, [count]);

  // Generate particle sizes
  const sizes = useMemo(() => {
    return new Float32Array(particles.map((p) => p.size));
  }, [particles]);

  // Animation with time
  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime();

      // Complex rotation pattern
      mesh.current.rotation.x = Math.sin(t * 0.15) * 0.2;
      mesh.current.rotation.y = Math.cos(t * 0.1) * 0.3;
      mesh.current.rotation.z = Math.sin(t * 0.05) * 0.1;

      // Wave-like pulsation through the particles
      if (particlesMaterial.current) {
        // Animate color between indigo and purple
        const r = 0.31 + Math.sin(t * 0.5) * 0.05;
        const g = 0.27 + Math.sin(t * 0.5) * 0.05;
        const b = 0.9 + Math.sin(t * 0.5) * 0.1;
        particlesMaterial.current.color = new THREE.Color(r, g, b);

        // Animate size and opacity
        particlesMaterial.current.size = 0.05 * (1 + 0.2 * Math.sin(t * 0.8));
        particlesMaterial.current.opacity = 0.7 + 0.3 * Math.sin(t * 0.5);
      }
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={particlesMaterial}
        size={0.05}
        color="#4f46e5"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Simplified glowing orbs that float around
function GlowingOrbs() {
  // Predefined positions and properties to avoid runtime errors with random values
  const orbConfigs = useMemo(
    () => [
      {
        position: [2, 1, -1],
        scale: 0.15,
        speed: 0.3,
        phase: 0,
        color: "#6366f1",
      },
      {
        position: [-2, -1, 1],
        scale: 0.2,
        speed: 0.5,
        phase: 2,
        color: "#818cf8",
      },
      {
        position: [1, -2, 0],
        scale: 0.12,
        speed: 0.4,
        phase: 4,
        color: "#4f46e5",
      },
      {
        position: [-1, 2, 1],
        scale: 0.18,
        speed: 0.25,
        phase: 1,
        color: "#a5b4fc",
      },
      {
        position: [0, 1.5, -1.5],
        scale: 0.14,
        speed: 0.35,
        phase: 3,
        color: "#4338ca",
      },
    ],
    []
  );

  return (
    <group>
      {orbConfigs.map((orb, i) => (
        <Orb
          key={i}
          position={orb.position}
          scale={orb.scale}
          speed={orb.speed}
          phase={orb.phase}
          color={orb.color}
        />
      ))}
    </group>
  );
}

function Orb({ position, scale, speed, phase, color }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      // Simplified orbital motion
      mesh.current.position.x = position[0] + Math.sin(t * speed + phase) * 1.5;
      mesh.current.position.y = position[1] + Math.cos(t * speed + phase) * 1.5;

      // Pulse size
      const pulseFactor = 1 + 0.2 * Math.sin(t * 2 + phase);
      mesh.current.scale.set(
        scale * pulseFactor,
        scale * pulseFactor,
        scale * pulseFactor
      );
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

// Simplified ring effect that's more reliable
function GlowingRing() {
  const ringRef = useRef<THREE.Object3D>(null);
  const geometry = useMemo(() => {
    // Create a circular ring
    const curve = new THREE.EllipseCurve(
      0,
      0, // center
      2.5,
      2.5, // x radius, y radius
      0,
      Math.PI * 2, // start angle, end angle
      false, // clockwise
      0 // rotation
    );

    // Get points from the curve
    const points = curve.getPoints(50);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime();

      // Simple rotation
      ringRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      ringRef.current.rotation.y = Math.sin(t * 0.1) * 0.3;

      // Pulse scale
      const scale = 1 + 0.1 * Math.sin(t * 0.5);
      ringRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#4f46e5", transparent: true, opacity: 0.4 }))} ref={ringRef} />
  );
}

function HeroCanvas() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 5]} intensity={1.5} />

      {/* Enhanced Particle System */}
      <ParticlesField count={2200} />

      {/* Additional Visual Elements */}
      <GlowingOrbs />
      <GlowingRing />

      {/* Let's remove the Environment component as it might be causing issues */}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export default function HeroSection() {
  const canvasRef = useRef();
  const [profileImage, setProfileImage] = useState(
    "/path/to/your/profile-image.jpg"
  );

  // Handle resize for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Update canvas size if needed
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Floating animations for the image
  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Enhanced Background Canvas with Depth Effect */}
      <div ref={canvasRef} className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]}>
          <HeroCanvas />
        </Canvas>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
                  {siteConfig.name}
                </motion.span>
              </h1>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-md"
                variants={contentVariants}
                custom={1.5}
              >
                {siteConfig.title}
              </motion.p>

              <div className="flex flex-wrap gap-4">
                <motion.div variants={contentVariants} custom={2}>
                  <Button
                    size="lg"
                    asChild
                    className="relative overflow-hidden group"
                  >
                    <Link to="/projects">
                      <span className="relative z-10">View Projects</span>
                      <motion.span
                        className="absolute inset-0 bg-indigo-700 opacity-0 group-hover:opacity-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div variants={contentVariants} custom={2.5}>
                  <ButtonOutline
                    size="lg"
                    asChild
                    className="group relative overflow-hidden"
                  >
                    <a
                      href={siteConfig.resume}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="relative z-10">Download Resume</span>
                      <motion.span
                        className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100"
                        initial={{ y: "100%" }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  </ButtonOutline>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Circular Profile Image with Enhanced Animations */}
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
                    onError={() => setProfileImage("/api/placeholder/300/300")}
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
          <span className="text-muted-foreground text-sm mb-2">
            Scroll down
          </span>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1 relative overflow-hidden">
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
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
