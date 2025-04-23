
import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/button";
import { ButtonOutline } from "@/components/ui/button-outline";
import { useThree, Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";

function ParticlesField({ count = 1500 }) {
  const mesh = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const temp = [];
    const sphereRadius = 2.5;
    
    // Create an array of particles positioned in a sphere
    for (let i = 0; i < count; i++) {
      // Create points in a spherical pattern
      const radius = sphereRadius * Math.random();
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push({ x, y, z });
    }
    return temp;
  }, [count]);

  // Animation with time
  useFrame(({ clock }) => {
    if (mesh.current) {
      // Rotate particles slowly
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
      mesh.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.1) * 0.2;
      
      // Pulse scale effect
      const scale = 1 + 0.03 * Math.sin(clock.getElapsedTime() * 0.8);
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4f46e5"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingText({ name }: { name: string }) {
  const textRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (textRef.current) {
      // Float up and down slightly
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      // Rotate subtly
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.25) * 0.1;
    }
  });

  return (
    <group ref={textRef} position={[0, 0, 0]}>
      <Text
        fontSize={0.5}
        color="#4f46e5"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

function HeroCanvas() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 5]} intensity={1.5} />
      <ParticlesField count={1800} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null);

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
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        delay: custom * 0.2,
        ease: "easeOut"
      }
    })
  };
  
  // Animation variants for the pulsing effect
  const pulseVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Canvas */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      >
        <Canvas>
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
                <motion.div
                  variants={contentVariants}
                  custom={2}
                >
                  <Button size="lg" asChild>
                    <Link to="/projects">View Projects</Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  variants={contentVariants}
                  custom={2.5}
                >
                  <ButtonOutline size="lg" asChild>
                    <a href={siteConfig.resume} target="_blank" rel="noreferrer">
                      Download Resume
                    </a>
                  </ButtonOutline>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative h-80 w-80">
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 opacity-20 blur-3xl"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
              <div className="relative z-10 h-full w-full rounded-full border-2 border-primary/20 bg-background/50 p-4 backdrop-blur-sm">
                <div className="h-full w-full rounded-full bg-muted flex items-center justify-center">
                  <span className="text-7xl">👋</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <motion.div 
          className="flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <span className="text-muted-foreground text-sm mb-2">Scroll down</span>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
