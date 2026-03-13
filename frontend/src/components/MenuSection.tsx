"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function MorphingDish({ scrollProgress }: { scrollProgress: any }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uColor1: { value: new THREE.Color("#00ffff") },
      uColor2: { value: new THREE.Color("#ff007f") },
    }),
    []
  );

  useMotionValueEvent(scrollProgress, "change", (latest: number) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uMorph.value = latest;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = latest * Math.PI * 4; // 2 full rotations
    }
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uMorph;

    void main() {
      vUv = uv;
      vNormal = normal;
      
      vec3 pos = position;
      // Spline/liquefy distortion based on uMorph
      float noise = sin(pos.x * 5.0 + uTime) * sin(pos.y * 5.0 + uTime) * uMorph;
      pos += normal * noise * 3.0;
      vPosition = pos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uMorph;
    uniform vec3 uColor1;
    uniform vec3 uColor2;

    void main() {
      float intensity = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
      vec3 glow = mix(uColor1, uColor2, vUv.y + sin(uTime + vUv.x * 10.0) * 0.5);
      
      // Add scanline effect
      float scanline = sin(vPosition.y * 50.0 - uTime * 10.0) * 0.1;
      
      vec3 finalColor = glow * (intensity + 0.5) + vec3(scanline);
      gl_FragColor = vec4(finalColor, 1.0 - uMorph * 0.7);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.8, 64, 100]} />
      <shaderMaterial 
        ref={materialRef} 
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader} 
        uniforms={uniforms} 
        transparent={true} 
        wireframe={false}
      />
    </mesh>
  );
}

export default function MenuSection() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Adjusted mapping based on typical viewport positions
  const morphProgress = useTransform(smoothProgress, [0.4, 0.8], [0, 1]);

  return (
    <div className="relative h-[200vh] bg-carbon w-full pt-32">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center overflow-hidden">
        <div className="flex-1 p-8 md:p-12 z-10 glass-panel m-4 md:m-10 rounded-2xl relative shadow-[0_0_30px_rgba(0,255,255,0.1)] border border-cyan/30 flex flex-col h-[70vh] md:h-auto max-h-[85vh]">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent animate-scanline" />
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta to-cyan uppercase tracking-widest mb-6 text-cyber-glitch shrink-0">
            Holo-Menu
          </h2>
          <div className="space-y-8 overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-cyan/20 pb-4">
            
            {/* Starters */}
            <div>
              <h3 className="text-sm font-mono tracking-widest text-cyan uppercase border-b border-cyan/30 pb-2 mb-4">Starters</h3>
              <div className="space-y-5">
                <div className="group cursor-pointer">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan transition-colors duration-300">
                    Edamame Glitch
                  </h4>
                  <p className="text-cyan/60 text-xs md:text-sm font-mono tracking-wider mt-1">
                    Steamed pods with digital sea salt and calm-inducing enzymes.
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-magenta transition-colors duration-300">
                    Neon Gyoza
                  </h4>
                  <p className="text-cyan/60 text-xs md:text-sm font-mono tracking-wider mt-1">
                    Spicy pork with magma chili oil. Promotes hyper-reactivity.
                  </p>
                </div>
              </div>
            </div>

            {/* Main */}
            <div>
              <h3 className="text-sm font-mono tracking-widest text-magenta uppercase border-b border-magenta/30 pb-2 mb-4">Main</h3>
              <div className="space-y-5">
                <div className="group cursor-pointer">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-magenta transition-colors duration-300">
                    Cyber-Bento
                  </h4>
                  <p className="text-cyan/60 text-xs md:text-sm font-mono tracking-wider mt-1">
                    Nutrient-dense omakase selection optimized for deep coding sessions.
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan transition-colors duration-300">
                    Udon.exe
                  </h4>
                  <p className="text-cyan/60 text-xs md:text-sm font-mono tracking-wider mt-1">
                    Thick noodles in high-voltage broth. 100% stamina boost.
                  </p>
                </div>
              </div>
            </div>

            {/* Synthetic Liquors */}
            <div>
              <h3 className="text-sm font-mono tracking-widest text-cyan uppercase border-b border-cyan/30 pb-2 mb-4">Synthetic Liquors</h3>
              <div className="space-y-5">
                <div className="group cursor-pointer">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan transition-colors duration-300">
                    Neuro-Gin
                  </h4>
                  <p className="text-cyan/60 text-xs md:text-sm font-mono tracking-wider mt-1">
                    Botanical AI-distilled spirit to align synaptic pathways.
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-magenta transition-colors duration-300">
                    Void Sake
                  </h4>
                  <p className="text-cyan/60 text-xs md:text-sm font-mono tracking-wider mt-1">
                    Served at absolute zero. Quiets the inner monologue.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <div className="flex-1 h-[60vh] md:h-full w-full relative -z-0">
          <Canvas camera={{ position: [0, 0, 7] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#ff007f" />
            <MorphingDish scrollProgress={morphProgress} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
